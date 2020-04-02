---
layout: manual
title: Manual de Integração Solução Omni
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
sort_order: 10
tags:
  - API Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# Visão geral - API Solução Omni

# Objetivo

Possibilitar a integração de parceiros de negócio/Subadquirentes com a Cielo para transações com cartões não-presentes (transações digitadas) e cartões presentes nas modalidades Chip e Tarja.

# Glossário

|ID|Descrição|
|BC|Biblioteca Compartilhada para PINPad|
|DUKPT|(Devired Unique Key Per Transaction) Método de criptografia utilizado na Cielo|
|PIN|Senha do cartão|
|BDK|(Base Derived Key) Chave do Sub a ser instalada no HSM|
|HSM|(Hardware Security Module) Servidor para geração, armazenamento, gerenciamento e funcionalidades criptográficas de chaves digitais|
|OAUTH2|Protocolo de autenticação utilizado nas APIs|

# Pré-requisitos

Para a integração é necessário que a solução de captura do parceiro de negócio/Subadquirente possua os seguintes componentes:

* Biblioteca Compartilhada para PINPad ou biblioteca proprietária certificada com as bandeiras.
* Chaves de Criptografia DUKPT implementada para PIN.
* Disponibilizar sua BDK para instalação no HSM Cielo.

Formato da Chave exigida pela Cielo:

O HSM Cielo está parametrizado para um KSN da seguinte forma:

* **KSI -** Número de identificação da Chave
* **DID –** Device ID
* **TC –** Transaction Counter

No cadastro da chave somente é inserido o KSI que possui 5 caracteres numéricos e a chave, conforme exemplo abaixo:

**FFFFF**030331234500012

<aside class="warning">Obs.: Os F’s devem ser preenchidos automaticamente pela Solução de Captura.</aside>

# Autenticação

A autenticação é uma operação necessária para obtenção do token que será utilizado nas demais chamadas de APIs.

|Security scheme type:|OAuth2|
|clientCredentials OAuth Flow|**Token URL:** https://authsandbox.braspag.com.br/oauth2/token<br><br>**Scopes:**<br><br>* `Administrator` - Admin everything<br><br>* `AnalyticsApiOverview` - See the analytics<br><br>* `AdminBackoffice` - Use the backoffice|

| SandBox                                                          |
|:----------------------------------------------------------------:|
| https://authsandbox.cieloecommerce.cielo.com.br/oauth2/token     |

# Pagamento

Quando um pagamento é criado (201 - Created), deve-se analisar o Status (Payment.Status) na resposta para certificar-se que o pagamento foi gerado com sucesso ou se houve alguma falha.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Venda com cartão de crédito digitado e sem senha

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150001",
  "Payment": {
    "Type": "PhysicalCreditCard",
    "SoftDescriptor": "Description",
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "Amount": 15798,
    "Installments": 1,
    "Capture": true,
    "Interest": "ByMerchant",
    "ProductId": 1,
    "CreditCard": {
      "CardNumber": 1234567812345678,
      "ExpirationDate": "12/2020",
      "SecurityCodeStatus": "Collected",
      "SecurityCode": 1230,
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "Typed",
      "AuthenticationMethod": "NoPassword",
      "TruncateCardNumberWhenPrinting": true
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`CreditCard.CardNumber`|String|19|---|Número do cartão (PAN)|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.SecurityCodeStatus`|String|---|---|Enum: `Collected` `Unreadable` `Nonexistent` <br><br> Status da coleta de código de segurança (CVV)|
|`CreditCard.SecurityCode`|String|3 ou 4|---|Código de segurança (CVV)|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "Amount": 15798,
    "ReceivedDate": "2019-04-15T12:00:00Z",
    "CapturedAmount": 15798,
    "Provider": "Cielo",
    "ConfirmationStatus": 0,
    "InitializationVersion": 1558708320029,
    "EmvResponseData": "123456789ABCD1345DEA",
    "Status": 2,
    "IsSplitted": false,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Bottom",
        "Message": "Obrigado e volte sempre!"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Cielo"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "São Paulo"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Customer.Name`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / País (Preencher com “BRA”)|

## Venda com cartão de crédito com leitura de tarja e senha

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150002",
  "Payment": {
    "Type": "PhysicalCreditCard",
    "SoftDescriptor": "Description",
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "Amount": 15798,
    "Installments": 1,
    "Capture": true,
    "Interest": "ByMerchant",
    "ProductId": 1,
    "CreditCard": {
      "ExpirationDate": "12/2020",
      "SecurityCodeStatus": "Nonexistent",
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "MagStripe",
      "AuthenticationMethod": "OnlinePassword",
      "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
      "TrackTwoData": "0123456789012345=012345678901234",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.SecurityCodeStatus`|String|---|---|Enum: `Collected` `Unreadable` `Nonexistent` <br><br> Status da coleta de código de segurança (CVV)|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.TrackOneData`|String|---|---|Dados da trilha 1 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`CreditCard.TrackTwoData`|String|---|---|Dados da trilha 2 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "Amount": 15798,
    "ReceivedDate": "2019-04-15T12:00:00Z",
    "CapturedAmount": 15798,
    "Provider": "Cielo",
    "ConfirmationStatus": 0,
    "InitializationVersion": 1558708320029,
    "EmvResponseData": "123456789ABCD1345DEA",
    "Status": 2,
    "IsSplitted": false,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Bottom",
        "Message": "Obrigado e volte sempre!"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Cielo"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "São Paulo"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Customer.Name`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / País (Preencher com “BRA”)|

## Venda com cartão de débito com leitura de tarja e senha

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150003",
  "Payment": {
    "Type": "PhysicalDebitCard",
    "SoftDescriptor": "Description",
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "Amount": 15798,
    "ProductId": 1,
    "DebitCard": {
      "ExpirationDate": "12/2020",
      "SecurityCodeStatus": "Nonexistent",
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "MagStripe",
      "AuthenticationMethod": "OnlinePassword",
      "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
      "TrackTwoData": "0123456789012345=012345678901234",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`DebitCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`DebitCard.SecurityCodeStatus`|String|---|---|Enum: `Collected` `Unreadable` `Nonexistent` <br><br> Status da coleta de código de segurança (CVV)|
|`DebitCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`DebitCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`DebitCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`DebitCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`DebitCard.TrackOneData`|String|---|---|Dados da trilha 1 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`DebitCard.TrackTwoData`|String|---|---|Dados da trilha 2 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`DebitCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "DebitCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "Amount": 15798,
    "ReceivedDate": "2019-04-15T12:00:00Z",
    "CapturedAmount": 15798,
    "Provider": "Cielo",
    "ConfirmationStatus": 0,
    "InitializationVersion": 1558708320029,
    "EmvResponseData": "123456789ABCD1345DEA",
    "Status": 2,
    "IsSplitted": false,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Bottom",
        "Message": "Obrigado e volte sempre!"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Cielo"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "São Paulo"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Customer.Name`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`DebitCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`DebitCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`DebitCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`DebitCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`DebitCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`DebitCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`DebitCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`DebitCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / País (Preencher com “BRA”)|

## Venda com cartão de crédito com EMV com senha online

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150004",
  "Payment": {
    "Type": "PhysicalCreditCard",
    "SoftDescriptor": "Description",
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "Amount": 15798,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "ProductId": 1,
    "CreditCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlinePassword",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "Amount": 15798,
    "ReceivedDate": "2019-04-15T12:00:00Z",
    "CapturedAmount": 15798,
    "Provider": "Cielo",
    "ConfirmationStatus": 0,
    "InitializationVersion": 1558708320029,
    "EmvResponseData": "123456789ABCD1345DEA",
    "Status": 2,
    "IsSplitted": false,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Bottom",
        "Message": "Obrigado e volte sempre!"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Cielo"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "São Paulo"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Customer.Name`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / País (Preencher com “BRA”)|

## Venda com cartão de débito com EMV e senha online

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150005",
  "Payment": {
    "Type": "PhysicalDebitCard",
    "SoftDescriptor": "Description",
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "Amount": 15798,
    "ProductId": 1,
    "DebitCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlinePassword",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`DebitCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`DebitCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`DebitCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`DebitCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`DebitCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`DebitCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`DebitCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "DebitCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "Amount": 15798,
    "ReceivedDate": "2019-04-15T12:00:00Z",
    "CapturedAmount": 15798,
    "Provider": "Cielo",
    "ConfirmationStatus": 0,
    "InitializationVersion": 1558708320029,
    "EmvResponseData": "123456789ABCD1345DEA",
    "Status": 2,
    "IsSplitted": false,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Bottom",
        "Message": "Obrigado e volte sempre!"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Cielo"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "São Paulo"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Customer.Name`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`DebitCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`DebitCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`DebitCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`DebitCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`DebitCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`DebitCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`DebitCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`DebitCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / País (Preencher com “BRA”)|

## Venda com vale alimentação (cartão de voucher) com EMV e senha online

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150005",
  "Payment": {
    "Type": "PhysicalVoucherCard",
    "SoftDescriptor": "Description",
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "Amount": 15798,
    "ProductId": 1,
    "VoucherCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlinePassword",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`VoucherCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`VoucherCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`VoucherCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`VoucherCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja "06" - EMV sem contato.|
|`VoucherCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`VoucherCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`VoucherCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "VoucherCard": {
      "ExpirationDate": "12/2020",
      "BrandId": 1,
      "IssuerId": 2,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "Amount": 15798,
    "ReceivedDate": "2019-04-15T12:00:00Z",
    "CapturedAmount": 15798,
    "Provider": "Cielo",
    "ConfirmationStatus": 0,
    "InitializationVersion": 1558708320029,
    "EmvResponseData": "123456789ABCD1345DEA",
    "Status": 2,
    "IsSplitted": false,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Bottom",
        "Message": "Obrigado e volte sempre!"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Cielo"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "São Paulo"
      }
    ]
  }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Document number automatically generated by the terminal and incremented by 1 for each transaction made at the terminal.|
|`Customer.Name`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Number of Installments: Ranges from 2 to 99 for financing transaction. The attributes maxOfPayments1, maxOfPayments2, maxOfPayments3, and minValOfPayments of the productTable table must be checked.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Installment Type: <br><br> - If bit 6 of the confParamOp05 attribute present in the issuerTable and binTable tables and bit 6 of the confParamOp03 attribute of the productTable table are all enabled indicates that the interest-free installment type can be made. <br><br> - If bit 7 of the confParamOp05 attribute, present in the issuerTable and binTable tables and bit 7 of the confParamOp03 attribute of the productTable table are all enabled, it indicates that the interest installment type can be made. No interest = “ByMerchant”; With interest = “ByIssuer”.|
|`Payment.Capture`|Boolean|---|---|Default: false / Boolean that identifies that the authorization must be with auto capture. Authorization without automatic capture is also known as pre-authorization.|
|`VoucherCard.ExpirationDate`|String|MM/yyyy|Yes|Card Expiration Date. <br><br>Data obtained through the command PP_GetCard in BC at the time of the transaction capture.|
|`VoucherCard.BrandId`|Integer|---|Yes|Brand identification obtained through the BrandId field from the PRODUCT TABLE.|
|`VoucherCard.IssuerId`|Integer|---|Yes|Issuer code obtained through IssuerId field from the BIN TABLE.|
|`VoucherCard.TruncateCardNumberWhenPrinting`|Boolean|---|---|Indicates whether the card number will be truncated at the time the voucher is printed. The capture solution must make this decision based on `confParamOp03` present in the BIN TABLE, PARAMETER TABLE and ISSUER TABLE tables.|
|`VoucherCard.InputMode`|String|---|Yes|Enum: `Typed` `MagStripe` `Emv` <br><br>Identification of card capture mode in the transaction. This information must be obtained through the return of BC’s PP_GetCard function. <br><br>"00" – Magnetic <br><br>"01" - VISA Cash Coin on TIBC v1 <br><br>"02" - VISA Cash Coin on TIBC v3 <br><br>"03" – EMV with contact <br><br>"04" - Easy Entry on TIBC v1 <br><br>"05" - Contactless chip simulating the black stripe <br><br> "06" - Contactless EMV.|
|`VoucherCard.AuthenticationMethod`|String|---|Yes|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Authentication method <br><br>- If the card was read from typing, check bit 3 of the confParamOp04 attribute of the binTable, parameterTable and issuerTable tables. If all are enabled, the password must be captured and authenticationMethod assumes value 2. Otherwise, assume value 1; <br><br>-If the card was read from the track, check bit 3 of the confParamOp04 attribute of the binTable, parameterTable and issuerTable tables. If all are enabled, then check bit 2 of the same field. If this value is 1, the password must be captured. If it is set to 0, password capture will depend on the last digit of the service code; <br><br>- If the card was read through the EMV chip, the authenticationMethod will be populated based on the return of the PP_GoOnChip function(). No resultado PP_GoOnChip(), where if the field of position 003 of the return from PP_GoOnChip () and if the position field 003 of the return from PP_GoOnChip() value 1 indicates the the pin has been validated offline, the authenticationMethod will be 3. If the position field 003 and the position field 006 of the return from PP_GoOnChip () are with the value set to 0, the authenticationMethod will be 1. If the position field 003 and the position field 006 of the return from PP_GoOnChip() are with values ​​0 and 1 respectively, the authenticationMethod will be 2. <br><br>1 - No password = “NoPassword”; <br><br>2 - Online password = “Online Authentication”; <br><br>3 - Offline password = “Offline Authentication”.|
|`VoucherCard.EmvData`|String|---|---|EMV Transaction Data <br><br> Obtained through PP_GoOnChip Command in BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`VoucherCard.PanSequenceNumber`|Number|---|---|Card sequential number, used to identify the additional card checking account. Mandatory for transactions with EMV Chip Cards that have PAN Sequence Number (Tag 5F34).|
|`Payment.PaymentDateTime`|String|date-time|Yes|Transaction capture Date and Time|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identification of the establishment (short name) to be printed and identified on the invoice.|
|`Payment.ProductId`|Integer|---|Yes|Product code identified via card bin.|
|`PinPadInformation.TerminalId`|String|---|Yes|Logic Number defined at the Cielo Concentrator.|
|`PinPadInformation.SerialNumber`|String|---|Yes|Equipment’s serial number.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Yes|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> No PIN-pad = `WithoutPinPad`; <br><br> PIN-pad without Chip reader = `PinpadWithoutChipReader`; <br><br>PIN-Pad with Chip reader without SAM Module = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-Pad with Chip reader with SAM Module = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad not homologated = `NotCertifiedPinPad`; <br><br> PIN-Pad with Chip reader without SAM and Contactless Card = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-Pad with Chip reader with SAM and Contactless Card = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Note: In case the application cannot inform the above data, such information must be obtained through the return BC's PP_GetInfo() function.|
|`PinPadInformation.ReturnDataInfo`|String|---|Yes|Return of shared library PP_GetInfo() function.|
|`Payment.Amount`|Integer(int64)|---|Yes|Transaction amount (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Boolean|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Yes|Value: `PhysicalCreditCard` / Transaction type|
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Currency (Fill with “BRL”)|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / Country (Fill with “BRA”)|

## Fluxo de pagamento (Biblioteca Compartilhada)

**Exemplo fluxo (Biblioteca Compartilhada):**

|ID|Descrição do Fluxo|
|---|---|
| 1 | Inserção do valor da transação (campo `Amount` do request da transação) |
| 2 | Recuperar Data/Hora da transação (campo `PaymentDateTime` do request da transação) |
| 3 | Seleção do tipo de pagamento (débito, crédito, voucher...) (campo `Type` do request da transação) |
| 4 | Chamada do PP_StartGetCard passando os valores: |
| 4.1 | Identificador da rede adquirente (Cielo `03`) |
| 4.2 | Tipo de aplicação (relacionado ao item 3) |
| 4.3 | Valor inicial da transação (item 1) |
| 4.4 | Data da transação (item 2) |
| 4.5 | Hora da transação (item 2) |
| 5 | Caso tenha sido utilizado um cartão com chip, recuperar o aid através da tag 4F no retorno da PP_getCard. |
| 6 | Seleção de produtos (campo "ProductId" do request da transação): 

**Transações com chip:**

|ID|Descrição do Fluxo|
|---|---|
|1| Realizar a busca na tabela "Emv" pelo AID do cartão (campo `Aid`) e selecionar os produtos associados através do campo `ProductIds` |
|2| Nos produtos associados, recuperar aqueles que possuem o mesmo `ProductType` (tabela `Products`) que iniciado na transação (DÉBITO, CRÉDITO..) e o mesmo fluxo do host (campo `HostFlow`) que os definido pela Cielo. |

**Transações com tarja/digitada:**

|ID|Descrição do Fluxo|
|---|---|
| 1 | Ao recuperar o pan do cartão, buscar na tabela `Bins` um que o bin esteja entre os valores `InitialBin` e `FinalBin` (considerar sempre a faixa de Bins mais específica) e recuperar o produto associado no campo `ProductId`; 
| 2 | Recuperar os produtos que tem o mesmo `ProductType` (tabela `Products`) que iniciado na transação (DÉBITO, CRÉDITO...) e o mesmo fluxo do host (campo `HostFlow`) que os definido pela Cielo.

# Baixa de parâmetros

Essa operação é necessária para que o parceiro de negócio / Subadquirente receba todas as tabelas de parâmetros necessários para que a solução de captura possa efetuar as transações via chamada de API. Essa informação será recebida através de API e deverá ser instalada na BC

## Inicialização de um terminal

Solicita as tabelas e parametros para operação do terminal

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://parametersdownloadsandbox.cieloecommerce.cielo.com.br/api/v0.1      | https://parametersdownload.cieloecommerce.cielo.com.br/api/v0.1      |

### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/initialization/{TerminalId}</span></aside>

### Resposta

```json
{
  "MerchantId": "string",
  "TerminalId": "string",
  "Acquirer": {
    "EnableContaclessCardReader": true,
    "LockAppFunctionsExceptInitialization": true,
    "HasChipReader": true,
    "HasMagneticTrackReader": true,
    "HasKeyboard": true
  },
  "Merchant": {
    "MerchantId": "string",
    "NetworkName": "string",
    "MerchantName": "string",
    "MerchantAddress": "string",
    "NationalId": "string"
  },
  "Bins": [
    {
      "InitialBin": "string",
      "FinalBin": "string",
      "ProductId": 0,
      "Type": 0,
      "AllowFallbackWhenChipReadingFails": true,
      "AllowChargingMoedeiroFromCash": true,
      "AllowPurchaseWithCompreESaque": true,
      "AllowOfflineFunctionExceptForEMVCard": true,
      "AllowTypingCardNumber": true,
      "MaskCardNumberUsingLast4Digits": true,
      "MaskCardNumberUsingFirst6AndLas4Digits": true,
      "AllowPrintCardHolderBalance": true,
      "AllowDisplayCardHolderBalance": true,
      "AllowPrintingPartialCardNumberInReceipt": true,
      "RestrictSaleWithDuplicateValueWhenPostdated": true,
      "RestrictSaleWithDuplicateValue": true,
      "RequiresPassword": true,
      "InterpretsLastDigitOfSecurityCode": true,
      "RequiresPasswordExceptForEMVCard": true,
      "EnableAdditionalSecurityCodeOptions_Unreadable_NoCode": true,
      "RequiresSecurityCodeWhenMagneticTrackIsRead": true,
      "RequiresSecurityCodeWhenCardNumberIsTyped": true,
      "RequiresTypingLast4Digits": true,
      "AllowCaptureOfFirstInstallmentValue": true,
      "AllowCaptureOfDownpaymentValue": true,
      "AllowGuaranteeHandling": true,
      "AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery": true,
      "AllowPostdating": true,
      "AllowCDCSale": true,
      "AllowFinancingByStore": true,
      "AllowFinancingByCreditCardCompany": true,
      "ValidateCardTrack1": true,
      "DoNotValidateCardModule10": true,
      "CheckExpiryDateWhenCardNumberIsTyped": true,
      "CheckExpiryDateWhenMagneticTrackIsRead": true,
      "IssuerId": 0
    }
  ],
  "Products": [
    {
      "ProductId": 0,
      "ProductName": "string",
      "ProductType": 0,
      "BrandId": "string",
      "AllowTransactionWithContactlessCard": true,
      "IsFinancialProduct": true,
      "AllowOfflineAuthorizationForEMVCard": true,
      "AllowReprintReceipt": true,
      "AllowPrintReceipt": true,
      "AllowOfflineAuthorizationForContactlessCard": true,
      "AllowCancel": true,
      "AllowUndo": true,
      "AllowCaptureOfFirstInstallmentValue": true,
      "AllowCaptureOfDownpaymentValue": true,
      "AllowGuaranteeHandling": true,
      "AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery": true,
      "AllowPostdating": true,
      "AllowCDCSale": true,
      "AllowFinancingByStore": true,
      "AllowFinancingByCreditCardCompany": true,
      "MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany": 0,
      "MaximumNumberOfInstallmentsWhenFinancingByStore": 0,
      "MaximumNumberOfinstallmentsForSaleAndCDCQuery": 0,
      "MinimumNumberOfInstallmentsWhenFinancingByStore": 0,
      "SaleGuaranteeType": "string",
      "PostdatedDayCountLimit": 0,
      "FirstInstallmentDayCountLimit": 0
    }
  ],
  "Emv": [
    {
      "Aid": "string",
      "TagsFirst": "string",
      "TagsSecond": "string",
      "IdxRecord": 0,
      "Type": 0,
      "RCodeFirst": "string",
      "RCodeSecond": "string",
      "InvalidateFunctionIfCardIsOnBlacklist": true,
      "RequireBINToBeInCardRangeTable": true,
      "StoreTransactionsRejectedByTerminalAppAndSendToHost": true,
      "NatEmvConctactRiskFloorLimit": 0,
      "NatEmvConctactRiskMinValue": 0,
      "NatEmvConctactRiskMinPercent": 0,
      "NatEmvConctactRiskMaxPercent": 0,
      "IntEmvConctactRiskFloorLimit": 0,
      "IntEmvConctactRiskMinValue": 0,
      "IntEmvConctactRiskMinPercent": 0,
      "IntEmvConctactRiskMaxPercent": 0,
      "ProductIds": [
         0
      ]
    }
  ],
  "Parameters": [
    {
      "Currency": "string",
      "AllowFallbackWhenChipReadingFails": true,
      "AllowChargingMoedeiroFromCash": true,
      "AllowPurchaseWithCompreESaque": true,
      "AllowOfflineFunctionExceptForEMVCard": true,
      "AllowTypingCardNumber": true,
      "MaskCardNumberUsingLast4Digits": true,
      "MaskCardNumberUsingFirst6AndLas4Digits": true,
      "AllowPrintCardHolderBalance": true,
      "AllowDisplayCardHolderBalance": true,
      "AllowPrintingPartialCardNumberInReceipt": true,
      "RestrictSaleWithDuplicateValueWhenPostdated": true,
      "RestrictSaleWithDuplicateValue": true,
      "RequiresPassword": true,
      "InterpretsLastDigitOfSecurityCode": true,
      "RequiresPasswordExceptForEMVCard": true,
      "EnableAdditionalSecurityCodeOptions_Unreadable_NoCode": true,
      "RequiresSecurityCodeWhenMagneticTrackIsRead": true,
      "RequiresSecurityCodeWhenCardNumberIsTyped": true,
      "RequiresTypingLast4Digits": true,
      "CapturesServiceFee": true,
      "AllowCancellationWithValueGreaterThanTheValueOfTheSale": true,
      "CaptureBoardingFee": true
    }
  ],
  "Issuers": [
    {
      "IssuerId": 0,
      "IssuerName": "string",
      "AllowFallbackWhenChipReadingFails": true,
      "AllowChargingMoedeiroFromCash": true,
      "AllowPurchaseWithCompreESaque": true,
      "AllowOfflineFunctionExceptForEMVCard": true,
      "AllowTypingCardNumber": true,
      "MaskCardNumberUsingLast4Digits": true,
      "MaskCardNumberUsingFirst6AndLas4Digits": true,
      "AllowPrintCardHolderBalance": true,
      "AllowDisplayCardHolderBalance": true,
      "Option03BiAllowPrintingPartialCardNumberInReceipt07": true,
      "RestrictSaleWithDuplicateValueWhenPostdated": true,
      "RestrictSaleWithDuplicateValue": true,
      "RequiresPassword": true,
      "InterpretsLastDigitOfSecurityCode": true,
      "RequiresPasswordExceptForEMVCard": true,
      "EnableAdditionalSecurityCodeOptions_Unreadable_NoCode": true,
      "RequiresSecurityCodeWhenMagneticTrackIsRead": true,
      "RequiresSecurityCodeWhenCardNumberIsTyped": true,
      "RequiresTypingLast4Digits": true,
      "AllowCaptureOfFirstInstallmentValue": true,
      "AllowCaptureOfDownpaymentValue": true,
      "AllowGuaranteeHandling": true,
      "AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery": true,
      "AllowPostdating": true,
      "AllowCDCSale": true,
      "AllowFinancingByStore": true,
      "AllowFinancingByCreditCardCompany": true,
      "RequiresChipReader": true,
      "RequiresPinpad": true,
      "LimitDayforReversal": 0,
      "LimitValueforReversal": "string",
      "LimitPercentforReversal": 0,
      "IssuerNameForDisplay": "string",
      "IssuerNameForPrint": "string"
    }
  ],
  "AidParameters": "string",
  "PublicKeys": "string",
  "InitializationVersion": 1558708320029
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantId`|String|---|---|Identificador da loja|
|`TerminalId`|String|---|---|Identificador do terminal|
|`Acquirer.EnableContaclessCardReader`|Booleano|---|---|Habilita Leitora Cartão Sem Contato|
|`Acquirer.LockAppFunctionsExceptInitialization`|Booleano|---|---|Bloquear as funções do aplicativo, com exceção da Inicialização|
|`Acquirer.HasChipReader`|Booleano|---|---|Indica que tem leitora de Chip-Card|
|`Acquirer.HasMagneticTrackReader`|Booleano|---|---|Indica que tem leitor da trilha magnética|
|`Acquirer.HasKeyboard`|Booleano|---|---|Indica que tem teclado para digitação|
|`Merchant.MerchantId`|String|---|---|Código do Lojista na PayStore, definido no momento da criação do lojista.|
|`Merchant.NetworkName`|String|---|---|Nome da rede da sub-adquirente cadastrado pelo Gestor da PayStore.|
|`Merchant.MerchantName`|String|---|---|Nome fantasia do lojista, definido no momento da criação do mesmo no portal da PayStore.|
|`Merchant.MerchantAddress`|String|---|---|Endereço do lojista obtido a partir da digitação do CEP momento da criação do mesmo no portal da PayStore.|
|`Merchant.NationalId`|String|---|---|CPF ou CNPJ, definido no momento da criação do Lojista no portal da PayStore.|
|`Bins.InitialBin`|String|---|---|Início do range de BIN’s.|
|`Bins.FinalBin`|String|---|---|Final do range de BIN’s.|
|`Bins.ProductId`|Integer int32|---|---|Chave estrangeira de “PRODUCT TABLE”.|
|`Bins.Type`|Integer int32|---|---|Admite os seguintes valores <br><br>0 - ESPECÍFICO <br><br>1 – GENERICO.|
|`Bins.AllowFallbackWhenChipReadingFails`|Booleano|---|---|Permite fallback se houver erro na leitura do Chip.|
|`Bins.AllowChargingMoedeiroFromCash`|Booleano|---|---|Permite carga de moedeiro a partir de dinheiro em espécie.|
|`Bins.AllowPurchaseWithCompreESaque`|Booleano|---|---|Permite venda com Compre & Saque.|
|`Bins.AllowOfflineFunctionExceptForEMVCard`|Booleano|---|---|Permite função offline, exceto cartão EMV.|
|`Bins.AllowTypingCardNumber`|Booleano|---|---|Permite digitação do número do cartão.|
|`Bins.MaskCardNumberUsingLast4Digits`|Booleano|---|---|Imprimir apenas os 4 últimos dígitos do cartão.|
|`Bins.MaskCardNumberUsingFirst6AndLas4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
|`Bins.AllowPrintCardHolderBalance`|Booleano|---|---|Permite imprimir o saldo do portador.|
|`Bins.AllowDisplayCardHolderBalance`|Booleano|---|---|Permite exibir no display o saldo do portador.|
|`Bins.AllowPrintingPartialCardNumberInReceipt`|Booleano|---|---|Permite impressão parcial do número do cartão no comprovante das transações.|
|`Bins.RestrictSaleWithDuplicateValueWhenPostdated`|Booleano|---|---|Impede venda com valor duplicado para prédatamento.|
|`Bins.RestrictSaleWithDuplicateValueWhenPostdated`|Booleano|---|---|Impede venda com valor duplicado.|
|`Bins.RequiresPassword`|Booleano|---|---|Solicita senha.|
|`Bins.InterpretsLastDigitOfSecurityCode`|Booleano|---|---|Interpreta último dígito do Código de Serviço.|
|`Bins.RequiresPasswordExceptForEMVCard`|Booleano|---|---|Solicita senha, exceto cartão EMV.|
|`Bins.EnableAdditionalSecurityCodeOptions_Unreadable_NoCode`|Booleano|---|---|Habilita opções “Ilegível” e “Não Possui” para Código de Segurança.|
|`Bins.RequiresSecurityCodeWhenMagneticTrackIsRead`|Booleano|---|---|Solicita Código de Segurança na leitura de trilha.|
|`Bins.RequiresSecurityCodeWhenCardNumberIsTyped`|Booleano|---|---|Solicita Código de Segurança para cartão digitado.|
|`Bins.RequiresTypingLast4Digits`|Booleano|---|---|Solicita digitação dos últimos 4 dígitos.|
|`Bins.AllowCaptureOfFirstInstallmentValue`|Booleano|---|---|Permite captura do valor da primeira parcela.|
|`Bins.AllowCaptureOfDownpaymentValue`|Booleano|---|---|Permite captura do valor de entrada.|
|`Bins.AllowGuaranteeHandling`|Booleano|---|---|Permite tratamento de garantia.|
|`Bins.AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery`|Booleano|---|---|Permite pré-datar a primeira parcela para venda e consulta CDC.|
|`Bins.AllowPostdating`|Booleano|---|---|Permite pré-datamento.|
|`Bins.AllowCDCSale`|Booleano|---|---|Permite venda CDC.|
|`Bins.AllowFinancingByStore`|Booleano|---|---|Permite financiamento pela Loja.|
|`Bins.AllowFinancingByCreditCardCompany`|Booleano|---|---|Permite financiamento pela Administradora.|
|`Bins.ValidateCardTrack1`|Booleano|---|---|Verifica Trilha 1 do cartão.|
|`Bins.DoNotValidateCardModule10`|Booleano|---|---|Não validar o Módulo 10 do cartão.|
|`Bins.CheckExpiryDateWhenCardNumberIsTyped`|Booleano|---|---|Verifica data de validade do cartão digitado.|
|`Bins.CheckExpiryDateWhenMagneticTrackIsRead`|Booleano|---|---|Verifica data de validade da trilha.|
|`Bins.IssuerId`|Integer int32|---|---|Chave estrangeira de “ISSUER TABLE”.|
|`Products.ProductId`|Integer int32|---|---|Identificador do produto.|
|`Products.ProductName`|String|---|---|Nome do produto.|
|`Products.ProductType`|Integer int32|---|---|Admite os seguintes valores <br><br>0 - CREDITO <br><br>1 – DEBITO|
|`Products.BrandId`|String|---|---|Identificador da bandeira do cartão.|
|`Products.AllowTransactionWithContactlessCard`|Booleano|---|---|Permite Transação com Cartão Sem Contato.|
|`Products.IsFinancialProduct`|Booleano|---|---|Produto Financeiro.|
|`Products.AllowOfflineAuthorizationForEMVCard`|Booleano|---|---|Permite Autorização Offline EMV.|
|`Products.AllowReprintReceipt`|Booleano|---|---|Permite Reimpressão do comprovante.|
|`Products.AllowPrintReceipt`|Booleano|---|---|Permite Impressão do comprovante.|
|`Products.AllowOfflineAuthorizationForContactlessCard`|Booleano|---|---|Permite Autorização Offline para Cartão Sem Contato.|
|`Products.AllowCancel`|Booleano|---|---|Permite Cancelamento.|
|`Products.AllowUndo`|Booleano|---|---|Permite Desfazimento.|
|`Products.AllowCaptureOfFirstInstallmentValue`|Booleano|---|---|Permite captura do valor da primeira parcela.|
|`Products.AllowCaptureOfDownpaymentValue`|Booleano|---|---|Permite captura do valor de entrada.|
|`Products.AllowGuaranteeHandling`|Booleano|---|---|Permite tratamento de garantia.|
|`Products.AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery`|Booleano|---|---|Permite pré-datar a primeira parcela para venda e consulta CDC.|
|`Products.AllowPostdating`|Booleano|---|---|Permite pré-datamento.|
|`Products.AllowCDCSale`|Booleano|---|---|Permite venda CDC.|
|`Products.AllowFinancingByStore`|Booleano|---|---|Permite financiamento pela Loja.|
|`Products.AllowFinancingByCreditCardCompany`|Booleano|---|---|Permite financiamento pela Administradora.|
|`Products.MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany`|Integer int32|---|---|Número máximo de parcelas para financiamento ADM.|
|`Products.MaximumNumberOfInstallmentsWhenFinancingByStore`|Integer int32|---|---|Número máximo de parcelas para financiamento Loja.|
|`Products.MaximumNumberOfinstallmentsForSaleAndCDCQuery`|Integer int32|---|---|Número máximo de parcelas para venda e consulta CDC.|
|`Products.MinimumNumberOfInstallmentsWhenFinancingByStore`|Integer int64|---|---|Valor mínimo de parcelas para financiamento Loja.|
|`Products.SaleGuaranteeType`|String|---|---|Tipo de Garantia para o Pré-datado. <br><br>Admite os seguintes valores <br><br>00 – Não permite tratamento de Garantia (Venda Garantida); <br><br>05 – Permite transações Pré-datadas Garantidas; <br><br>07 – Permite transações Pré-datadas Garantidas e Sem Garantia.|
|`Products.PostdatedDayCountLimit`|Integer int32|---|---|Limite máximo em dias para pré-datar a partir da data atual. <br><br>00 – Não aceita. <br><br>XX - Pré-datado.|
|`Products.FirstInstallmentDayCountLimit`|Integer int32|---|---|Limite da data de primeira parcela. <br><br>00 – Não aceita. <br><br>XX - Limite de dias.|
|`Emv.Aid`|String|---|---|Identificador da aplicação EMV.|
|`Emv.TagsFirst`|String|---|---|Conjunto de tags obrigatórias enviadas o 1º Generate AC.|
|`Emv.TagsSecond`|String|---|---|Conjunto de tags obrigatórias enviadas o 2º Generate AC.|
|`Emv.IdxRecord`|Integer int32|---|---|---|
|`Emv.Type`|Integer int32|---|---|Admite os seguintes valores <br><br>0 - CREDITO <br><br>1 – DEBITO|
|`Emv.RCodeFirst`|String|---|---|---|
|`Emv.RCodeSecond`|String|---|---|---|
|`Emv.InvalidateFunctionIfCardIsOnBlacklist`|Booleano|---|---|Invalida a função se o cartão consta na Lista Negra.|
|`Emv.RequireBINToBeInCardRangeTable`|Booleano|---|---|Obriga que o BIN esteja na tabela de Range de Cartões (tipo 2B).|
|`Emv.StoreTransactionsRejectedByTerminalAppAndSendToHost`|Booleano|---|---|Armazena e envia para o Host as transações rejeitadas pelo aplicativo do terminal.|
|`Emv.NatEmvConctactRiskFloorLimit`|Integer int32|---|---|Valor máximo de verificação para autorização offline das transações. As transações realizadas com a leitura do Chip EMV e com valor acima do “Floor limit”, deverão ser autorizadas no modo online.|
|`Emv.NatEmvConctactRiskMinValue`|Integer int32|---|---|Valor mínimo para o cálculo de seleção aleatória para autorização offline. Conforme processo definido na Especificação EMV.|
|`Emv.NatEmvConctactRiskMinPercent`|Integer int32|---|---|Porcentagem mínima para seleção aleatória. Utilizar apenas o conteúdo do último byte.|
|`Emv.NatEmvConctactRiskMaxPercent`|Integer int32|---|---|Porcentagem máxima para seleção aleatória. Utilizar apenas o conteúdo do último byte.|
|`Emv.IntEmvConctactRiskFloorLimit`|Integer int32|---|---|Valor máximo de verificação para autorização offline das transações. As transações realizadas com a leitura do Chip EMV e com valor acima do “Floor limit”, deverão ser autorizadas no modo online.|
|`Emv.IntEmvConctactRiskMinValue`|Integer int32|---|---|Valor mínimo para o cálculo de seleção aleatória para autorização offline. Conforme processo definido na Especificação EMV.|
|`Emv.IntEmvConctactRiskMinPercent`|Integer int32|---|---|Porcentagem mínima para seleção aleatória. Utilizar apenas o conteúdo do último byte.|
|`Emv.IntEmvConctactRiskMaxPercent`|Integer int32|---|---|Porcentagem máxima para seleção aleatória. Utilizar apenas o conteúdo do último byte.|
|`Emv.ProductIds`|Array of integers int32|---|---|Produtos habilitados para esta aplicação EMV.|
|`Parameters.Currency`|String|---|---|---|
|`Parameters.AllowFallbackWhenChipReadingFails`|Booleano|---|---|Permite fallback se houver erro na leitura do Chip.|
|`Parameters.AllowChargingMoedeiroFromCash`|Booleano|---|---|Permite carga de moedeiro a partir de dinheiro em espécie.|
|`Parameters.AllowPurchaseWithCompreESaque`|Booleano|---|---|Permite venda com Compre & Saque.|
|`Parameters.AllowOfflineFunctionExceptForEMVCard`|Booleano|---|---|Permite função offline, exceto cartão EMV.|
|`Parameters.AllowTypingCardNumber`|Booleano|---|---|Permite entrada manual do número do cartão.|
|`Parameters.MaskCardNumberUsingLast4Digits`|Booleano|---|---|Imprimir apenas os 4 últimos dígitos do cartão.|
|`Parameters.MaskCardNumberUsingFirst6AndLas4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
|`Parameters.AllowPrintCardHolderBalance`|Booleano|---|---|Permite imprimir o saldo do portador.|
|`Parameters.AllowDisplayCardHolderBalance`|Booleano|---|---|Permite exibir no display o saldo do portador.|
|`Parameters.AllowPrintingPartialCardNumberInReceipt`|Booleano|---|---|Permite impressão parcial do número do cartão no comprovante das transações.|
|`Parameters.RestrictSaleWithDuplicateValueWhenPostdated`|Booleano|---|---|Impede venda com valor duplicado para pré-datamento.|
|`Parameters.RestrictSaleWithDuplicateValue`|Booleano|---|---|Impede venda com valor duplicado.|
|`Parameters.RequiresPassword`|Booleano|---|---|Solicita senha.|
|`Parameters.InterpretsLastDigitOfSecurityCode`|Booleano|---|---|Interpreta último dígito do Código de Serviço.|
|`Parameters.RequiresPasswordExceptForEMVCard`|Booleano|---|---|Solicita senha, exceto cartão EMV.|
|`Parameters.EnableAdditionalSecurityCodeOptions_Unreadable_NoCode`|Booleano|---|---|Habilita opções “Ilegível” e “Não Possui” para Código de Segurança.|
|`Parameters.RequiresSecurityCodeWhenMagneticTrackIsRead`|Booleano|---|---|Solicita Código de Segurança na leitura de trilha.|
|`Parameters.RequiresSecurityCodeWhenCardNumberIsTyped`|Booleano|---|---|Solicita Código de Segurança para cartão digitado.|
|`Parameters.RequiresTypingLast4Digits`|Booleano|---|---|Solicita digitação dos últimos 4 dígitos.|
|`Parameters.CapturesServiceFee`|Booleano|---|---|Captura Taxa de Serviço.|
|`Parameters.AllowCancellationWithValueGreaterThanTheValueOfTheSale`|Booleano|---|---|Permite valor do Cancelamento maior que o valor da venda original.|
|`Parameters.CaptureBoardingFee`|Booleano|---|---|Captura Taxa de Embarque.|
|`Issuers.IssuerId`|integer int32|---|---|Identificador do emissor.|
|`Issuers.IssuerName`|String|---|---|Nome do emissor.|
|`Issuers.AllowFallbackWhenChipReadingFails`|Booleano|---|---|Permite fallback se houver erro na leitura do Chip.|
|`Issuers.AllowChargingMoedeiroFromCash`|Booleano|---|---|Permite fallback se houver erro na leitura do Chip.|
|`Issuers.AllowPurchaseWithCompreESaque`|Booleano|---|---|Permite venda com Compre & Saque.|
|`Issuers.AllowOfflineFunctionExceptForEMVCard`|Booleano|---|---|Permite função offline, exceto cartão EMV.|
|`Issuers.AllowTypingCardNumber`|Booleano|---|---|Permite digitação do número do cartão.|
|`Issuers.MaskCardNumberUsingLast4Digits`|Booleano|---|---|Imprimir apenas os 4 últimos dígitos do cartão.|
|`Issuers.MaskCardNumberUsingFirst6AndLas4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
|`Issuers.AllowPrintCardHolderBalance`|Booleano|---|---|Permite imprimir o saldo do portador.|
|`Issuers.AllowDisplayCardHolderBalance`|Booleano|---|---|Permite exibir no display o saldo do portador.|
|`Issuers.Option03BiAllowPrintingPartialCardNumberInReceipt07`|Booleano|---|---|Permite impressão parcial do número do cartão no comprovante das transações.|
|`Issuers.RestrictSaleWithDuplicateValueWhenPostdated`|Booleano|---|---|Impede venda com valor duplicado para pré-datamento.|
|`Issuers.RestrictSaleWithDuplicateValue`|Booleano|---|---|Impede venda com valor duplicado.|
|`Issuers.RequiresPassword`|Booleano|---|---|Solicita senha.|
|`Issuers.InterpretsLastDigitOfSecurityCode`|Booleano|---|---|Interpreta último dígito do Código de Serviço.|
|`Issuers.RequiresPasswordExceptForEMVCard`|Booleano|---|---|Solicita senha, exceto cartão EMV.|
|`Issuers.EnableAdditionalSecurityCodeOptions_Unreadable_NoCode`|Booleano|---|---|Habilita opções “Ilegível” e “Não Possui” para Código de Segurança.|
|`Issuers.RequiresSecurityCodeWhenMagneticTrackIsRead`|Booleano|---|---|Solicita Código de Segurança na leitura de trilha.|
|`Issuers.RequiresSecurityCodeWhenCardNumberIsTyped`|Booleano|---|---|Solicita Código de Segurança para cartão digitado.|
|`Issuers.RequiresTypingLast4Digits`|Booleano|---|---|Solicita digitação dos últimos 4 dígitos.|
|`Issuers.AllowCaptureOfFirstInstallmentValue`|Booleano|---|---|Permite captura do valor da primeira parcela.|
|`Issuers.AllowCaptureOfDownpaymentValue`|Booleano|---|---|Permite captura do valor de entrada.|
|`Issuers.AllowGuaranteeHandling`|Booleano|---|---|Permite tratamento de garantia.|
|`Issuers.AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery`|Booleano|---|---|Permite pré-datar a primeira parcela para venda e consulta CDC.|
|`Issuers.AllowPostdating`|Booleano|---|---|Permite pré-datamento.|
|`Issuers.AllowCDCSale`|Booleano|---|---|Permite venda CDC.|
|`Issuers.AllowFinancingByStore`|Booleano|---|---|Permite financiamento pela Loja.|
|`Issuers.AllowFinancingByCreditCardCompany`|Booleano|---|---|Permite financiamento pela Administradora.|
|`Issuers.RequiresChipReader`|Booleano|---|---|Exige a existência de Leitor de Chip.|
|`Issuers.RequiresPinpad`|Booleano|---|---|Exige a existência de PIN-pad.|
|`Issuers.LimitDayforReversal`|integer int32|---|---|Data limite em dias para permitir Cancelamento.|
|`Issuers.LimitValueforReversal`|String|---|---|Valor máximo para Cancelamento.|
|`Issuers.LimitPercentforReversal`|integer int64|---|---|Percentual máximo para Cancelamento.|
|`Issuers.IssuerNameForDisplay`|String|---|---|Nome do Issuer para o Display.|
|`Issuers.IssuerNameForPrint`|String|---|---|Nome do Issuer para Impressão.|
|`AidParameters`|---|---|---|---|
|`PublicKeys`|---|---|---|---|
|`InitializationVersion`|---|---|---|---|

# Confirmação

Quando o pagamento retornar sucesso e pode ser confirmado.

Esta operação requer o PaymentId recebido no retorno do pagamento, além dos dados EmvData se o pagamento foi realizado atráves de Chip.

A confirmação somente é necessária para pagamentos feitos através do POS.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Confirmação de pagamento usando cartão digitado

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/confirmation</span></aside>

```json
null
```

### Resposta

```json
{
  "ConfirmationStatus": 1,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Successful",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    },
    {
      "Method": "POST",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência|

## Confirmação de pagamento usando cartão EMV

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/confirmation</span></aside>

```json
{
  "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
  "IssuerScriptResults": "0000"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`EmvData`|String|---|---|Dados da transação EMV <br><br>Dados obtidos através do comando PP_GoOnChip na BC|
|`IssuerScriptResults`|String|---|---|Resultado dos scripts EMV do emissor|

### Resposta

```json
{
  "ConfirmationStatus": 1,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Successful",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    },
    {
      "Method": "POST",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência|

# Cancelamento

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Cancelamento de pagamento com cartão digitado

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

```json
{
  "MerchantVoidId": 2019042204,
  "MerchantVoidDate": "2019-04-15T12:00:00Z",
  "Card": {
    "InputMode": "Typed",
    "CardNumber": 1234567812345678
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal|
|`MerchantVoidDate`|String|---|Sim|Data do cancelamento.|
|`Card.InputMode`|---|---|---|---|
|`Card.CardNumber`|String|---|---|Número do cartão <br><br>Requerido quando a transação for digitada.|

### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "Status": 10,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    },
    {
      "Method": "POST",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids"
    },
    {
      "Method": "DELETE",
      "Rel": "reverse",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids/e5c889ea-5719-4e1a-a2da-f4f50d5bd7ca"
    },
    {
      "Method": "PUT",
      "Rel": "confirm",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids/e5c889ea-5719-4e1a-a2da-f4f50d5bd7ca/confirmation"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`VoidId`|String - uuid|---|---|Identificador do cancelamento|
|`Status`|Integer int16|---|---|Status do cancelamento. <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Negado <br><br>3 = Confirmado <br><br>4 = Desfeito|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|

## Cancelamento de pagamento com cartão presente

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

```json
{
  "MerchantVoidId": 2019042204,
  "MerchantVoidDate": "2019-04-15T12:00:00Z",
  "Card": {
    "InputMode": "MagStripe",
    "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
    "TrackTwoData": "0123456789012345=012345678901234"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal|
|`MerchantVoidDate`|String|---|Sim|Data do cancelamento.|
|`Card.InputMode`|---|---|---|---|
|`Card.TrackOneData`|String|---|---|Dados da trilha 1 <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.TrackTwoData`|String|---|---|Dados da trilha 2 <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação|

### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "Status": 10,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    },
    {
      "Method": "POST",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids"
    },
    {
      "Method": "DELETE",
      "Rel": "reverse",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids/e5c889ea-5719-4e1a-a2da-f4f50d5bd7ca"
    },
    {
      "Method": "PUT",
      "Rel": "confirm",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/voids/e5c889ea-5719-4e1a-a2da-f4f50d5bd7ca/confirmation"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`VoidId`|String - uuid|---|---|Identificador do cancelamento|
|`Status`|Integer int16|---|---|Status do cancelamento. <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Negado <br><br>3 = Confirmado <br><br>4 = Desfeito|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|

# Desfazimento

## Desfazimento de pagamento de cartão digitado.

O pagamento retornou com sucesso e pode ser desfeito.

Deve-se solicitar o desfazimento através do PaymentId recebido no retorno do pagamento. 

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}</span></aside>

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/undo</span></aside>

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|

## Desfazimento de pagamento de cartão EMV.

O pagamento retornou com sucesso e pode ser desfeito.

Deve-se solicitar o desfazimento através do PaymentId recebido no retorno do pagamento. 

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}</span></aside>

```json
{
  "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
  "IssuerScriptsResults": "0000"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`EmvData`|String|---|---|Dados da transação EMV <br><br>Dados obtidos através do comando PP_GoOnChip na BC|
|`IssuerScriptsResults`|String|---|---|Resultado dos scripts EMV do emissor|

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/undo</span></aside>

```json
{
  "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
  "IssuerScriptsResults": "0000"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`EmvData`|String|---|---|Dados da transação EMV <br><br>Dados obtidos através do comando PP_GoOnChip na BC|
|`IssuerScriptsResults`|String|---|---|Resultado dos scripts EMV do emissor|

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|

## Desfazimento de pagamento de cartão digitado

Quando o pagamento não retornar, o mesmo deve ser desfeito.

Para solicitar o desfazimento é necessário informar o MerchantOrderId enviado no pagamento.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}</span></aside>

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}/undo</span></aside>

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|

## Desfazimento de pagamento de cartão EMV

Quando o pagamento não retornar, o mesmo deve ser desfeito.

Para solicitar o desfazimento é necessário informar o MerchantOrderId enviado no pagamento.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}</span></aside>

```json
{
  "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
  "IssuerScriptsResults": "0000"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`EmvData`|String|---|---|Dados da transação EMV <br><br>Dados obtidos através do comando PP_GoOnChip na BC|
|`IssuerScriptsResults`|String|---|---|Resultado dos scripts EMV do emissor|

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}/undo</span></aside>

```json
{
  "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
  "IssuerScriptsResults": "0000"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`EmvData`|String|---|---|Dados da transação EMV <br><br>Dados obtidos através do comando PP_GoOnChip na BC|
|`IssuerScriptsResults`|String|---|---|Resultado dos scripts EMV do emissor|

### Resposta

```json
{
  "ConfirmationStatus": 2,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`ConfirmationStatus`|Integer int16|---|---|Status da confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|

# Desfazimento de cancelamento

## Desfaz um cancelamento

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/{VoidId}</span></aside>

### Resposta

```json
{
  "CancellationStatus": 4,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/fffef2e6-15ef-4493-869f-62ea285fbfde"
    },
    {
      "Method": "POST",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/fffef2e6-15ef-4493-869f-62ea285fbfde/voids"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento. <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Negado <br><br>3 = Confirmado <br><br>4 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|---|---|---|Mensagem de erro/resposta da transação da Adquirência.|

## Desfaz um cancelamento

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/merchantVoidId/{MerchantVoidId}</span></aside>

### Resposta

```json
{
  "CancellationStatus": 4,
  "Status": 2,
  "ReturnCode": 0,
  "ReturnMessage": "Success",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/fffef2e6-15ef-4493-869f-62ea285fbfde"
    },
    {
      "Method": "POST",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/physicalSales/fffef2e6-15ef-4493-869f-62ea285fbfde/voids"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento. <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Negado <br><br>3 = Confirmado <br><br>4 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|---|---|---|Mensagem de erro/resposta da transação da Adquirência.|

# Lojas

Essa operação permite o cadastro de lojas e terminais , viabilizando modelos de negócios onde o facilitador necessite segmentar sua operação.

## Merchant

### POST Merchant - Requisição

Cria um novo merchant.

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/merchants</span></aside>

```json
{
  "Address": {
    "ZipCode": "string",
    "Street": "string",
    "Number": "string",
    "Complement": "string"
  },
  "TradeName": "string",
  "CompanyName": "string",
  "Email": "string",
  "PhoneNumber": "string",
  "Mcc": 0,
  "DocumentNumber": "string",
  "DocumentType": "Cpf",
  "Owner": {
    "Name": "string",
    "Email": "string",
    "PhoneNumber": "string",
    "MessengerPhone": "string",
    "Gender": "Other"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`TradeName`|String|---|---|---|
|`CompanyName`|String|---|---|---|
|`Email`|String|---|---|---|
|`PhoneNumber`|String|---|---|---|
|`Mcc`|String|---|---|---|
|`DocumentNumber`|String|---|---|---|
|`DocumentType`|String|---|---|Enum: `Cpf` `Cnpj`|
|`Owner.Name`|String|---|---|---|
|`Owner.Email`|String|---|---|---|
|`Owner.PhoneNumber`|String|---|---|---|
|`Owner.MessengerPhone`|String|---|---|---|
|`Owner.Gender`|String|---|---|Enum: `Other` `Male` `Female`|

### GET Merchant - Resposta

Efetua a busca do merchant pelo seu ID.

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/merchants/{subordinatedMerchantId}</span></aside>

```json
{
  "Merchant": {
    "SubordinatedMerchantId": "string",
    "Owner": {
      "Name": "string",
      "Email": "string",
      "PhoneNumber": "string",
      "MessengerPhone": "string",
      "Gender": "Other"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|---|---|---|---|
|`Owner.Name`|String|---|---|---|
|`Owner.Email`|String|---|---|---|
|`Owner.PhoneNumber`|String|---|---|---|
|`Owner.MessengerPhone`|String|---|---|---|
|`Owner.Gender`|String|---|---|Enum: `Other` `Male` `Female`|

### PUT Merchant - Requisição

Faz alteração do merchant pelo seu ID.

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/merchants/{subordinatedMerchantId}</span></aside>

```json
{
  "Address": {
    "ZipCode": "string",
    "Street": "string",
    "Number": "string",
    "Complement": "string"
  },
  "TradeName": "string",
  "CompanyName": "string",
  "Email": "string",
  "PhoneNumber": "string",
  "Mcc": 0,
  "DocumentNumber": "string",
  "DocumentType": "Cpf"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`TradeName`|String|---|---|---|
|`CompanyName`|String|---|---|---|
|`Email`|String|---|---|---|
|`PhoneNumber`|String|---|---|---|
|`Mcc`|String|---|---|---|
|`DocumentNumber`|String|---|---|---|
|`DocumentType`|String|---|---|Enum: `Cpf` `Cnpj`|

## Terminal

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/terminals</span></aside>

```json
{
  "TerminalBaseModel": {
    "CommunicationType": "string",
    "EquipmentModel": 0,
    "EquipmentSerialNumber": "string",
    "TerminalId": "string"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`TerminalBaseModel.CommunicationType`|String|---|---|---|
|`TerminalBaseModel.EquipmentModel`|Integer|---|---|---|
|`TerminalBaseModel.EquipmentSerialNumber`|String|---|---|---|
|`TerminalBaseModel.TerminalId`|String|---|---|---|

### Resposta

```json
{
  "Terminal": {
    "CommunicationType": "string",
    "EquipmentModel": 0,
    "EquipmentSerialNumber": "string",
    "TerminalId": "string",
    "SubordinatedMerchantId": "string"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`TerminalBaseModel.CommunicationType`|String|---|---|---|
|`TerminalBaseModel.EquipmentModel`|Integer|---|---|---|
|`TerminalBaseModel.EquipmentSerialNumber`|String|---|---|---|
|`TerminalBaseModel.TerminalId`|String|---|---|---|
|`Terminal.SubordinatedMerchantId`|String uuid|---|---|---|
