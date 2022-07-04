---
layout: manual
title: Manual de Integração Cielo Conecta
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Cielo Conecta
language_tabs:
  json: JSON
  shell: cURL
---

# Visão geral - API Cielo Conecta Cielo

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
* Para soluções de pagamento que utilizam Pinpad externo (conexão Bluetooth ou cabo), é obrigatório o uso de criptografia WKPAN para dados. Clientes desse tipo de solução precisam apresentar certificado PCI DSS e PA DSS

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

> **URL**: https://authsandbox.cieloecommerce.cielo.com.br

|Security scheme type:|OAuth2|
|clientCredentials OAuth Flow|**Username:** ClientId<br><br>**Password:** ClientSecret<br>**Scopes:**<br><br>* `PhysicalCieloMaster` - Cadastrar de Lojas e Terminais<br><br>* `PhysicalCieloTransactional` - Transacionar e consultar<br><br>* Se não solicitar um escopo ele é atribuido por padrão|

Para testes em sandbox você pode gerar uma credencial a qualquer momento através do site abaixo.

> **URL**: https://omnichannelcadastrosandbox.cieloecommerce.cielo.com.br/

## Criar Token

> **POST** https://authsandbox.cieloecommerce.cielo.com.br/oauth2/token
>
>| Key | Value |
>|---|---|
>|**AUTHORIZATION** |*Username{Auth_ClientId}*|
>|**AUTHORIZATION** |*Password{Auth_ClientSecret}*|
>|**HEADERS** |*Content-Type text/plain*|
>|**BODY** |*grant_type client_credentials*|
>|**scope** |*{scope}*|

### Request

```shell
curl --location --request POST 'https://authsandbox.cieloecommerce.cielo.com.br/oauth2/token' \
--header 'Content-Type: text/plain' \
--header 'Authorization: Basic {base64(ClientId:ClientSecret)}' \
--data-urlencode 'grant_type=client_credentials'
```

### Response

```json
{
  "access_token": "{Auth_AccessToken}",
  "token_type": "bearer",
  "expires_in": 86399
}
```

# Baixa de parâmetros

Essa operação é necessária para que o parceiro de negócio / Subadquirente receba todas as tabelas de parâmetros necessários para que a solução de captura possa efetuar as transações via chamada de API. Essa informação será recebida através de API e deverá ser instalada na BC.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://parametersdownloadsandbox.cieloecommerce.cielo.com.br/api/v0.1      | https://parametersdownload.cieloecommerce.cielo.com.br/api/v0.1      |

**Simular respostas:**

Para simular uma resposta especifica utilize o campo TerminalId, onde de acordo com os quatro ultimos digitos finais do valor informado é possivel receber uma resposta conforme a tabela abaixo:

|TerminalId(ultimos digitos)|---|Retorno simulado|Exemplo do valor do TerminalId|
|---|---|---|---|
|0404|TERMINAL INEXISTENTE|71990404|---|
|Demais valores|SUCESSO|82990566|---|

## Inicialização

Solicita as tabelas e parametros para operação do terminal

### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/initialization/{SubordinatedMerchantId}/{TerminalId}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|String|---|Sim|Identificador da loja|
|`TerminalId`|String|---|Sim|Identificador do terminal|

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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
      "PostdatedSaleGuaranteeType": "DoNotAllowSalesWithGuarantee",
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
      "AllowOnlineAuthorizationTransactionRequest": true,
      "AllowExtendedCardHolderName": true,
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
|`Acquirer.IntervalInDaysForSendingTechnicalParameter`|Integer|---|Não|intervalo em dias de envio da Baixa Técnica, sendo:<br><br> 0 - nunca enviar<br><br>1 a 99 - intervalo em dias, exemplo: 30 = enviar a<br><br>cada 30 dias.|
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
|`Bins.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`Products.PostdatedSaleGuaranteeType`|String|---|---|Tipo de Garantia para o Pré-datado. <br><br>Admite os seguintes valores <br><br>00 – Não permite tratamento de Garantia (Venda Garantida); <br><br>05 – Permite transações Pré-datadas Garantidas; <br><br>07 – Permite transações Pré-datadas Garantidas e Sem Garantia.|
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
|`Emv.AllowOnlineAuthorizationTransactionRequest`|Booleano|---|---|---|
|`Emv.AllowExtendedCardHolderName`|Booleano|---|---|---|
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
|`Parameters.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`Issuers.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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

## Inicialização com baixa tecnica

Solicita as tabelas e parametros para operação do terminal.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/initialization/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|String(Guid)|36|Sim|Identificador da loja|
|`TerminalId`|String|---|Sim|Identificador do terminal|
|`TechnicalParameter`|Object|---|Não|Objeto com os parametros da baixa tecnica|
|`TechnicalParameter.KernelEmvVersion`|String|---|Sim|Versão kernel EMV com contato|
|`TechnicalParameter.ContactlessModuleVersion`|String|---|Sim|Versão kernel EMV contactless|
|`TechnicalParameter.KernelPayPassVersion`|String|---|Sim|Versão kernel contactless Mastercard PayPass / MCL|
|`TechnicalParameter.KernelContactlessPayWaveVersion`|String|---|Sim|Versão kernel contactless Visa PayWave|
|`TechnicalParameter.HardwareModel`|String|---|Sim|Modelo do pinpad|
|`TechnicalParameter.ManufacturerName`|String|---|Sim|Nome do fabricante do pinpad|
|`TechnicalParameter.FirmwareVersion`|String|---|Sim|Versão do firmware|
|`TechnicalParameter.BasicLibVersion`|String|---|Sim|versão da aplicação básica|
|`TechnicalParameter.SpecificationVersion`|String|---|Sim|Versão da especificação|
|`TechnicalParameter.AcquirerVersion`|String|---|Sim|Versão da rede adquirente|
|`TechnicalParameter.SimCardNumber`|String|---|Sim|Número do SIM Card que é utilizado no pelo terminal|
|`TechnicalParameter.PaymentAppVersion`|String|---|Sim|Versão do App de pagamentos. No caso do SDK android será versão do PaymentsApp. Já no caso do SDK PhAST será a versão da TEF Sueite.|
|`TechnicalParameter.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`TechnicalParameter.PhysicalCharacteristics`|String|---|Sim|Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule,<br><br> PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br><br> Sem PIN-pad = WithoutPinPad;<br><br> PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br><br> PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br><br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br><br> PIN-pad não homologado = NotCertifiedPinPad;<br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato =PinpadWithChipReaderWithSamAndContactless.<br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`TechnicalParameter.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

```json
{
    "SubordinatedMerchantId": "{{SubordinatedMerchantId}}",
    "TerminalId": "12345678",
    "TechnicalParameter": {
        "KernelEmvVersion": "v653",
        "ContactlessModuleVersion": "v553",
        "KernelPayPassVersion": "553",
        "KernelContactlessPayWaveVersion": "553",
        "HardwareModel": "S920",
        "ManufacturerName": "PAX",
        "FirmwareVersion": "2.4.149",
        "BasicLibVersion": "001.41 200617",
        "SpecificationVersion": "1.08",
        "AcquirerVersion": "001.41 200617",
        "SimCardNumber": "123",
        "PaymentAppVersion": "abc",
        "PhysicalCharacteristics": "PinPadWithChipReaderWithoutSamAndContactless",
        "ReturnDataInfo": "00",
        "SerialNumber": "0820471929"
    }
}
```

### Resposta

```json
{
  "MerchantId": "000002",
  "TerminalId": "12345678",
  "Acquirer": {
    "EnableContaclessCardReader": true,
    "LockAppFunctionsExceptInitialization": true,
    "HasChipReader": true,
    "HasMagneticTrackReader": true,
    "HasKeyboard": true,
    "IntervalInDaysForSendingTechnicalParameter": 10
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
      "PostdatedSaleGuaranteeType": "DoNotAllowSalesWithGuarantee",
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
      "AllowOnlineAuthorizationTransactionRequest": true,
      "AllowExtendedCardHolderName": true,
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
|`Acquirer.IntervalInDaysForSendingTechnicalParameter`|Integer|---|Não|intervalo em dias de envio da Baixa Técnica, sendo:<br><br> 0 - nunca enviar<br><br>1 a 99 - intervalo em dias, exemplo: 30 = enviar a<br><br>cada 30 dias.|
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
|`Bins.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`Products.PostdatedSaleGuaranteeType`|String|---|---|Tipo de Garantia para o Pré-datado. <br><br>Admite os seguintes valores <br><br>00 – Não permite tratamento de Garantia (Venda Garantida); <br><br>05 – Permite transações Pré-datadas Garantidas; <br><br>07 – Permite transações Pré-datadas Garantidas e Sem Garantia.|
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
|`Emv.AllowOnlineAuthorizationTransactionRequest`|Booleano|---|---|---|
|`Emv.AllowExtendedCardHolderName`|Booleano|---|---|---|
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
|`Parameters.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`Issuers.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`AidParameters`|String|---|Sim|Tabela de parametros para configuração da biblioteca compartilhada.|
|`PublicKeys`|String|---|Sim|Tabela de chaves para configuração da biblioteca compartilhada.|
|`InitializationVersion`|Integer int64|---|Sim|Versão da inicialização utilizada para controle de atualização dos parametros pelo terminal.|

## Inicialização (loja padrão)

Solicita as tabelas e parametros para operação do terminal. Como não foi informado o `SubordinatedMerchantId`, será assumida a loja principal do facilitador, isto é, a loja que tem o ID igual ao `ClientId` usado para a autenticação. Esta loja é criada automaticamente durante o processo de cadastro do facilitador executado pela Cielo.

### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/initialization/{TerminalId}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`TerminalId`|String|---|Sim|Identificador do terminal|

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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
      "PostdatedSaleGuaranteeType": "DoNotAllowSalesWithGuarantee",
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
      "AllowOnlineAuthorizationTransactionRequest": true,
      "AllowExtendedCardHolderName": true,
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
      "MaskCardNumberUsingFirst6AndLast4Digits": true,
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
|`Acquirer.IntervalInDaysForSendingTechnicalParameter`|Integer|---|Não|intervalo em dias de envio da Baixa Técnica, sendo:<br><br> 0 - nunca enviar<br><br>1 a 99 - intervalo em dias, exemplo: 30 = enviar a<br><br>cada 30 dias.|
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
|`Bins.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`Products.PostdatedSaleGuaranteeType`|String|---|---|Tipo de Garantia para o Pré-datado. <br><br>Admite os seguintes valores <br><br>00 – Não permite tratamento de Garantia (Venda Garantida); <br><br>05 – Permite transações Pré-datadas Garantidas; <br><br>07 – Permite transações Pré-datadas Garantidas e Sem Garantia.|
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
|`Emv.AllowOnlineAuthorizationTransactionRequest`|Booleano|---|---|---|
|`Emv.AllowExtendedCardHolderName`|Booleano|---|---|---|
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
|`Parameters.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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
|`Issuers.MaskCardNumberUsingFirst6AndLast4Digits`|Booleano|---|---|Imprimir os 6 primeiros e os 4 últimos dígitos do cartão.|
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

# Pagamentos

## Fluxo de pagamento

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

**Simular respostas:**

Para simular alguma resposta especifica utilize o campo `Amount`, onde de acordo com o valor dos centavos informado nesse campo é possivel receber uma resposta conforme descrito na tabela abaixo:

|Amount (valor dos centavos)|Retorno simulado do Pagamento|Exemplo de valor simulado|
|---|---|---|
|10|Aprovado|5010 = R$50,10|
|11|Negado|20011 = R$200,11|
|12|Timeout|3512 = R$35,12|
|19|Erro|1019 = R$10,19|

## Autorização

Quando um pagamento é criado (201 - Created), deve-se analisar o Status (Payment.Status) na resposta para certificar-se que o pagamento foi gerado com sucesso ou se houve alguma falha.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Crédito Digitado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "1596226820548",
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
      "CardNumber": "1234567812345678",
      "ExpirationDate": "12/2020",
      "SecurityCodeStatus": "Collected",
      "SecurityCode": 1230,
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "Typed",
      "AuthenticationMethod": "NoPassword",
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|15|Sim|Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|Não|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|15|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`| Booleano|---|Não|Default:false/Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|2|Sim|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros.|
|`Payment.Interest`|String|10|Não|Default: ByMerchant<br><br>Enum: ByMerchant, ByIssuer<br><br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer |---|Sim|Código do produto identificado através do bin do cartão.|
|`Payment.CreditCard.CardNumber`|String|19|Sim| Número do cartão (PAN)|
|`Payment.CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão.<br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`Payment.CreditCard.SecurityCodeStatus`|String|---|Sim|Enum: Collected Unreadable Nonexistent<br><br>Status da coleta de código de segurança (CVV)|
|`Payment.CreditCard.SecurityCode`|String|4|Sim|Código de segurança (CVV)|
|`Payment.CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`Payment.CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId no objeto BinEntry da baixa de parametros.|
|`Payment.CreditCard.InputMode`|String|---|Sim|Enum: Typed MagStripe Emv<br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br><br>“02” - Moedeiro VISA Cash sobre TIBC v3<br><br>“03” – EMV com contato<br><br>“04” - Easy-Entry sobre TIBC v1<br><br>“05” - Chip sem contato simulando tarja<br><br>“06” - EMV sem contato.|
|`Payment.CreditCard.AuthenticationMethod`|String|---|Sim|Enum: NoPassword OnlineAuthentication OfflineAuthentication<br><br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br><br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br><br>1 - Sem senha = “NoPassword”;<br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|
|`Payment.CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|Não|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry.|
|`Payment.CreditCard.SaveCard`|Booleano|---|Não| Identifica se vai salvar/tokenizar o cartão.|
|`Payment.CreditCard.IsFallback`|Booleano|---|Não|Identifica se é uma transação de fallback.|
|`Payment.PinPadInformation.TerminalId`|String|8|Sim|Número Lógico definido no Concentrador Cielo.|
|`Payment.PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`Payment.PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br><br>Sem PIN-pad = WithoutPinPad;<br><br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br><br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br><br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`Payment.PinPadInformation.ReturnDataInfo`|String`|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
        "MerchantName": "Estabelecimento",
        "MerchantAddress": "Rua Sem Saida, 0",
        "MerchantCity": "Cidade",
        "MerchantState": "WA",
        "MerchantCode": 1234567890123456,
        "Terminal": 12345678,
        "Nsu": 123456,
        "Date": "01/01/20",
        "Hour": "01:01",
        "IssuerName": "NOME DO EMISSOR",
        "CardNumber": 5432123454321234,
        "TransactionType": "VENDA A CREDITO",
        "AuthorizationCode": 123456,
        "TransactionMode": "ONL",
        "InputMethod": "X",
        "Value": "1,23",
        "SoftDescriptor": "Simulado"
      },
        "RecurrentPayment": {
        "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
        "ReasonCode": 0,
        "ReasonMessage": "Successful",
        "NextRecurrency": "2019-12-01",
        "EndDate": "2019-12-01",
        "Interval": 6
      },
        "SplitPayments": [
        {
           "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
           "Amount": 100,
           "Fares": {
              "Mdr": 5,
              "Fee": 0
           }
        },
        {
           "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
           "Amount": 80,
           "Fares": {
           "Mdr": 3,
           "Fee": 1
        }
        }
      ],
        "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---||---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---||---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Payment.Currency`|String|---|---|Default: "BRL" / Value: "BRL" / Moeda (Preencher com “BRL”).|
|`Payment.Country`|String|---|---|Default: "BRA" / Value: "BRA" / País (Preencher com “BRA”).|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito Digitado com Recorrência

#### Requisição

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
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "RecurrentPayment": {
      "EndDate": "2019-12-01",
      "Interval": "SemiAnual"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|15|Sim|Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal.|
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|Não|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|15|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`| Booleano|---|Não|Default:false/Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|2|Sim|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros.|
|`Payment.Interest`|String|10|Não|Default: ByMerchant<br><br>Enum: ByMerchant, ByIssuer<br><br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer |---|Sim|Código do produto identificado através do bin do cartão.|
|`Payment.CreditCard.CardNumber`|String|19|Sim| Número do cartão (PAN)|
|`Payment.CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão.<br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`Payment.CreditCard.SecurityCodeStatus`|String|---|Sim|Enum: Collected Unreadable Nonexistent<br><br>Status da coleta de código de segurança (CVV)|
|`Payment.CreditCard.SecurityCode`|String|4|Sim|Código de segurança (CVV)|
|`Payment.CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`Payment.CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId no objeto BinEntry da baixa de parametros.|
|`Payment.CreditCard.InputMode`|String|---|Sim|Enum: Typed MagStripe Emv<br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br><br>“02” - Moedeiro VISA Cash sobre TIBC v3<br><br>“03” – EMV com contato<br><br>“04” - Easy-Entry sobre TIBC v1<br><br>“05” - Chip sem contato simulando tarja<br><br>“06” - EMV sem contato.|
|`Payment.CreditCard.AuthenticationMethod`|String|---|Sim|Enum: NoPassword OnlineAuthentication OfflineAuthentication<br><br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br><br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br><br>1 - Sem senha = “NoPassword”;<br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|
|`Payment.CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|Não|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry.|
|`Payment.CreditCard.SaveCard`|Booleano|---|Não| Identifica se vai salvar/tokenizar o cartão.|
|`Payment.CreditCard.IsFallback`|Booleano|---|Não|Identifica se é uma transação de fallback.|
|`Payment.PinPadInformation.TerminalId`|String|8|Sim|Número Lógico definido no Concentrador Cielo.|
|`Payment.PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`Payment.PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br><br>Sem PIN-pad = WithoutPinPad;<br><br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br><br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br><br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`Payment.PinPadInformation.ReturnDataInfo`|String`|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "RecurrentPayment": {
      "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2019-12-01",
      "EndDate": "2019-12-01",
      "Interval": 6
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ],
    "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|---|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---||---|
|`Address.Number`|String|---|---||---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---||---|
|`Address.City`|String|---|---||---|
|`Address.State`|String|---|---||---|
|`Address.Country`|String|---|---||---|
|`DeliveryAddress.Street`|String|---|---||---|
|`DeliveryAddress.Number`|String|---|---||---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---||---|
|`DeliveryAddress.City`|String|---|---||---|
|`DeliveryAddress.State`|String|---|---||---|
|`DeliveryAddress.Country`|String|---|---||---|
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
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito Digitado com dados de Comprador

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150001",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
  },
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
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|15|Sim|Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal.|
|`Customer.Name`|String|255|Não|Nome do comprador|
|`Customer.Identity`|String|14|Não|Numero do cpf ou cnpj do cliente|
|`Customer.IdentityType`|String|255|Não|Tipo de documento de identificação do comprador (CPF ou CNPJ)|
|`Customer.Email`|String|255|Não|Email do comprador|
|`Customer.Birthday`|String|10|Não|Data de nascimento do comprador no formato AAAA-MM-DD|
|`Customer.Address.Street`|String|255|Não|Endereço de contato do comprador|
|`Customer.Address.Number`|String|15|Não|Número do endereço de contato do comprador|
|`Customer.Address.Complement`|String|50|Não|Complemento do endereço de contato do comprador|
|`Customer.Address.ZipCode`|String|9|Não|CEP do endereço de contato do comprador|
|`Customer.Address.City`|String|50|Não|Cidade do endereço de contato do comprador|
|`Customer.Address.State`|String|2|Não|Estado do endereço de contato do comprador|
|`Customer.Address.Country`|String|35|Não|País do endereço de contato do comprador|
|`Customer.DeliveryAddress.Street`|String|255|Não|Endereço de entrega do comprador|
|`Customer.DeliveryAddress.Number`|String|15|Não|Número do endereço de entrega|
|`Customer.DeliveryAddress.Complement`|String|50|Não|Complemento do endereço de entrega|
|`Customer.DeliveryAddress.ZipCode`|String|9|Não|CEP do endereço de entrega|
|`Customer.DeliveryAddress.City`|String|50|Não|Cidade do endereço de entrega|
|`Customer.DeliveryAddress.State`|String|2|Não|Estado do endereço de entrega|
|`Customer.DeliveryAddress.Country`|String|35|Não|País do endereço de entrega|
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|Não|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|15|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`|Booleano|---|Não|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|2| Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros.|
|`Payment.Interest`|String | 10|Não|Default: ByMerchant<br><br>Enum: ByMerchant, ByIssuer<br><br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`Payment.CreditCard.CardNumber`|String|19|Sim|Número do cartão (PAN)|
|`Payment.CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão.<br><br> Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
|`Payment.CreditCard.SecurityCodeStatus`|String|---|Sim|Enum: Collected Unreadable Nonexistent<br><br>Status da coleta de código de segurança (CVV)|
|`Payment.CreditCard.SecurityCode`|String|4|Sim|Código de segurança (CVV) |
|`Payment.CreditCard.BrandId`|Integer|---|Sim |Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
|`Payment.CreditCard.IssuerId`|Integer|---|Sim |Código do emissor obtido através do campo IssuerId no objeto BinEntry da baixa de parametros. |
|`Payment.CreditCard.InputMode`|String|--- |Sim |Enum: Typed MagStripe Emv<br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br> “00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
|`Payment.CreditCard.AuthenticationMethod`|String|---|Sim| Enum: NoPassword OnlineAuthentication OfflineAuthentication<br><br>Método de autenticação<br><br> - Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”.|
|`Payment.CreditCard.TruncateCardNumberWhenPrinting `|Booleano|---|Não|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry. |
|`Payment.CreditCard.SaveCard `|Booleano |---|Não|Identifica se vai salvar/tokenizar o cartão.|
|`Payment.CreditCard.IsFallback`|Booleano|---|Não| Identifica se é uma transação de fallback.|
|`Payment.PinPadInformation.TerminalId `|String|8|Sim|Número Lógico definido no Concentrador Cielo.|
|`Payment.PinPadInformation.SerialNumber`|String|---| Sim | Número de Série do Equipamento.|
|`Payment.PinPadInformation.PhysicalCharacteristics `|String|---|Sim|Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br><br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule; <br><br> PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`Payment.PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "RecurrentPayment": {
      "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2019-12-01",
      "EndDate": "2019-12-01",
      "Interval": 6
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ],
    "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---||---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
||`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito digitado com cartão criptografado

#### Requisição

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
      "CardNumber": "EncryptedCardNumber",
      "EncryptedCardData": {
          "EncryptionType": "DUKPT3DES",
          "CardNumberKSN": "KSNforCardNumber"
      },
      "ExpirationDate": "12/2020",
      "SecurityCodeStatus": "Collected",
      "SecurityCode": 1230,
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "Typed",
      "AuthenticationMethod": "NoPassword",
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|15|Sim|Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.SoftDescriptor`|String |13|Não|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String |date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|15|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`|Booleano|---|Não|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|2|Sim|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|10|Não|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`CreditCard.CardNumber`|String|---|Sim|Número do cartão (PAN) criptografado|
|`CreditCard.EncryptedCardData.EncryptionType`|String|---|Sim|Tipo de encriptação utilizada<br><br>Enum:<br><br>"DukptDes" = 1,<br><br>"MasterKey" = 2 <br<br>"Dukpt3Des" = 3,<br><br>"Dukpt3DesCBC" = 4|
|`CreditCard.EncryptedCardData.CardNumberKSN`|String|---|---|Identificador KSN da criptografia do número do cartão|
|`CreditCard.EncryptedCardData.IsDataInTLVFormat`|Bool|---|Não|Identifica se os dados criptografados estão no formato TLV (tag / length / value).|
|`CreditCard.EncryptedCardData.InitializationVector`|String|---|Sim|Vetor de inicialização da encryptação|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão.<br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.SecurityCodeStatus`|String|---|Sim|Enum: Collected Unreadable Nonexistent<br><br>Status da coleta de código de segurança (CVV)|
|`CreditCard.SecurityCode`|String|4|Sim|Código de segurança (CVV)|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: Typed MagStripe Emv<br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função<br><br> PP_GetCard da BC.<br><br>“00” – Magnético<br><br>“01” - Moedeiro VISA Cash sobre TIBC v1<br><br>“02” - Moedeiro VISA Cash sobre TIBC v3<br><br>“03” – EMV com contato<br><br>“04” - Easy-Entry sobre TIBC v1<br><br>“05” - Chip sem contato simulando tarja<br><br>“06” - EMV sem contato.<br><br>|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: NoPassword OnlineAuthentication OfflineAuthentication<br><br>Método de autenticação<br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code;<br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br><br>1 - Sem senha = “NoPassword”;<br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no confParamOp03 presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|8|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: WithoutPinPad PinPadWithoutChipReader PinPadWithChipReaderWithoutSamModule<br><br> PinPadWithChipReaderWithSamModule NotCertifiedPinPad PinPadWithChipReaderWithoutSamAndContactless<br><br>PinPadWithChipReaderWithSamModuleAndContactless<br><br>SemPIN-pad = WithoutPinPad;PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br><br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br><br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br><br>PIN-pad não homologado = NotCertifiedPinPad;<br><br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br><br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br><br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
    "MerchantAcquirerId": "0010000244470001",
    "TerminalAcquirerId": "71000027",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---|Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: ByMerchant<br><br>Enum: ByMerchant ByIssuer<br><br>Tipo de Parcelamento:<br><br>- Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br><br>- Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão.Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no confParamOp03 presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: Typed MagStripe Emv<br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br><br>“00” – Magnético<br><br>“01” - Moedeiro VISA Cash sobre TIBC v1<br><br>“02” - Moedeiro VISA Cash sobre TIBC v3<br><br>“03” – EMV com contato<br><br>“04” - Easy-Entry sobre TIBC v1<br><br>“05” - Chip sem contato simulando tarja<br><br>|“06” - EMV sem contato.
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|-|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount|Integer`|(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|String|-|---|---|
|`Payment.ConfirmationStatus`|-|---|---|---|
|`Payment.InitializationVersion`|-|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|String|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: “BRL” / Value: “BRL” / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: “BRA” / Value: “BRA” / País (Preencher com “BRA”)|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito digitado com Split

#### Requisição

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
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ]
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.CreditCard.CardNumber` | String | 19 | Sim | Número do cartão (PAN) |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.SecurityCodeStatus` | String | — | Sim | Enum: Collected Unreadable Nonexistent<br>Status da coleta de código de segurança (CVV) |
| `Payment.CreditCard.SecurityCode` | String | 4 | Sim | Código de segurança (CVV) |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId no objeto BinEntry da baixa de parametros. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed MagStripe Emv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.TruncateCardNumberWhenPrinting` | Booleano | — | Não | Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry. |
| `Payment.CreditCard.SaveCard` | Booleano | — | Não | Identifica se vai salvar/tokenizar o cartão. |
| `Payment.CreditCard.IsFallback` | Booleano | — | Não | Identifica se é uma transação de fallback. |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.SplitPayments.SubordinateMerchantId` | String (Guid) | 36 | Não | Identificador do Seller na Cielo. |
| `Payment.SplitPayments.Amount` | Integer | 15 | Não | Total da venda do Seller específico. R$ 100,00 = 10000 |
| `Payment.SplitPayments.Fares.Mdr` | Decimal | 3,2 | Não | Taxa aplicada pela loja Master sobre o Seller para desconto |
| `Payment.SplitPayments.Fares.Fee` | Integer | 15 | Não | Tarifa aplicada pela loja Master sobre o Seller para desconto |

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
    "IsSplitted": true,
    "ReturnCode": 0,
    "ReturnMessage": "Successful",
    "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "MerchantAcquirerId": "0010000244470001",
    "TerminalAcquirerId": "71000027",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ]
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.ServiceTaxAmount` | Integer | 15 | Não | Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização. |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.Amount` | Integer(int64) | — | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.ReceivedDate` | String (DateTime) | — | Sim | Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS" |
| `Payment.CapturedAmount` | Integer | 15 | Sim | Valor capturado, sem pontuação. 100 equivale a R$ 1,00 |
| `Payment.CapturedDate` | String (DateTime) | - | Não | Data da captura |
| `Payment.Provider` | String | 15 | Sim | Nome do provedor do meio de pagamento |
| `Payment.ConfirmationStatus` | Integer | 2 | Não | Status da confirmação. 0 = Pendente 1 = Confirmado 2 = Desfeito |
| `Payment.InitializationVersion` | Integer int16 | — | Sim | Número de versão dos parametros baixados na inicialização do equipamento. |
| `Payment.Status` | Integer | 2 | Sim | Status da transação 0 = Não Finalizado 1 = Autorizado 2 = Pago 3 = Negado 10 = Cancelado 13 = Abortado |
| `Payment.IsSplitted` | Booleano | — | Não | Indica se o pagamento tem split ou não. Default: false |
| `Payment.ReturnCode` | String | 3 | Sim | Código de erro/resposta da transação da Adquirência. |
| `Payment.ReturnMessage` | String | — | Sim | Mensagem de erro/resposta da transação da Adquirência. |
| `Payment.PaymentId` | String (Guid) | 36 | Sim | Código do Pagamento |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.Currency` | String | 3 | Não | Default: “BRL” / Value: “BRL” / Moeda (Preencher com “BRL”) |
| `Payment.Country` | String | 3 | Não | Default: “BRA” / Value: “BRA” / País (Preencher com “BRA”) |
| `Payment.CreditCard.CardNumber` | String | 19 | Sim | Número do cartão |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.SecurityCodeStatus` | String | — | Sim | Enum: Collected Unreadable Nonexistent<br>Status da coleta de código de segurança (CVV) |
| `Payment.CreditCard.SecurityCode` | String | 4 | Sim | retorno com valor mascarado |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.CreditCard.TruncateCardNumberWhenPrinting` | Booleano | — | Não | Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed MagStripe Emv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword, OnlineAuthentication, OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.BrandInformation.Type` | String | _ | Não | Tipo de venda. |
| `Payment.CreditCard.BrandInformation.Name` | String | — | Não | Nome da bandeira do cartão. |
| `Payment.CreditCard.SaveCard` | Booleano | — | Não | Identifica se vai salvar/tokenizar o cartão |
| `Payment.CreditCard.IsFallback` | Booleano | — | Não | Identifica se é uma transação de fallback. |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad PinPadWithoutChipReader PinPadWithChipReaderWithoutSamModule PinPadWithChipReaderWithSamModule NotCertifiedPinPad PinPadWithChipReaderWithoutSamAndContactless PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.Receipt.MerchantName` | String | — | Sim | Nome da loja |
| `Payment.Receipt.MerchantAddress` | String | — | Sim | Endereço da loja |
| `Payment.Receipt.MerchantCity` | String | — | Sim | Cidade da loja |
| `Payment.Receipt.MerchantState` | String | — | Sim | Estado da loja |
| `Payment.Receipt.MerchantCode` | String | — | Sim | Codigo de identificação da loja |
| `Payment.Receipt.Terminal` | String | 8 | Sim | Identificação do Terminal |
| `Payment.Receipt.Nsu` | String | — | Sim | Numero de identificação da transação Cielo |
| `Payment.Receipt.Date` | String | — | Sim | Data da transação |
| `Payment.Receipt.Hour` | String | — | Sim | Horario da transação |
| `Payment.Receipt.IssuerName` | String | — | Sim | Nome do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.Receipt.CardNumber` | String | — | Sim | Número do cartão |
| `Payment.Receipt.CardHolder` | String | — | Não | Nome do titular do cartão. |
| `Payment.Receipt.Brand` | String | — | Sim | Bandeira do cartão |
| `Payment.Receipt.TransactionType` | String | — | Sim | Tipo de transação |
| `Payment.Receipt.AuthorizationCode` | String | — | Sim | Código da autorização |
| `Payment.Receipt.TransactionMode` | String | — | Sim | Modo da transação |
| `Payment.Receipt.InputMethod` | String | — | Sim | Metodo de entrada |
| `Payment.Receipt.Value` | String | — | Sim | Valor do pagamento |
| `Payment.Receipt.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Links` | Array[Object] | - | Não | links de navegação. |
| `Payment.Links.Method` | String | - | Sim | Metodo do link de navegação. |
| `Payment.Links.Rel` | String | - | Sim | Links de retorno para navegação. |
| `Payment.Links.Href` | String | - | Sim | Endereço do links de navegação. |
| `Payment.PrintMessage` | Array[Object] | - | Não | Dados para impressão. |
| `Payment.PrintMessage.Position` | String | - | Sim | Posição para impressão. |
| `Payment.PrintMessage.Message` | String | - | Sim | Mensagem para impressão. |
| `Payment.ReceiptInformation` | Array[Object] | - | Não | Dados do recibo. |
| `Payment.ReceiptInformation.Field` | String | - | Sim | Nome do campo do recibo. |
| `Payment.ReceiptInformation.Label` | String | - | Sim | Titulo do campo do recibo. |
| `Payment.ReceiptInformation.Content` | String | - | Sim | conteúdo do campo do recibo. |
| `Payment.SplitPayments.SubordinateMerchantId` | String (Guid) | 36 | Não | Identificador do Seller na Cielo. |
| `Payment.SplitPayments.Amount` | Integer | 15 | Não | Total da venda do Seller específico. R$ 100,00 = 10000 |
| `Payment.SplitPayments.Fares.Mdr` | Decimal | 3,2 | Não | Taxa aplicada pela loja Master sobre o Seller para desconto |
| `Payment.SplitPayments.Fares.Fee` | Integer | 15 | Não | Tarifa aplicada pela loja Master sobre o Seller para desconto |
| `Payment.SplitErrors.Code` | String | — | Não | Código de erro/resposta da transação do Split |
| `Payment.SplitErrors.Message` | String | — | Não | Mensagem de erro/resposta da transação do Split |

### Crédito digitado com dados do facilitador

#### Requisição

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
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
    },
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00"
    },
    "PaymentFacilitator": {
      "EstablishmentCode": "12345678901",
      "SubEstablishment": {
        "EstablishmentCode": "123456789012345",
        "Mcc": "1234",
        "Address": "1234567890abcdefghji12",
        "City": "1234567890abc",
        "State": "ab",
        "PostalCode": "123456789",
        "PhoneNumber": "1234567890123",
        "CountryCode": "076",
        "DocumentType": "Cpf",
        "DocumentNumber": "12345678901"
      }
    }
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Não | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.PinBlock.EncryptedPinBlock` | String | — | Não | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.CreditCard.PinBlock.EncryptionType` | String | — | Não | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.CreditCard.PinBlock.KsnIdentification` | String | — | Não | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Não | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Não | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Não | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Não | Retorno da função PP_GetInfo() da biblioteca compartilhada |

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
    "MerchantAcquirerId": "0010000244470001",
    "TerminalAcquirerId": "71000027",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "PaymentFacilitator": {
      "EstablishmentCode": "12345678901",
      "SubEstablishment": {
        "EstablishmentCode": "123456789012345",
        "Mcc": "1234",
        "Address": "1234567890abcdefghji12",
        "City": "1234567890abc",
        "State": "ab",
        "PostalCode": "123456789",
        "PhoneNumber": "1234567890123",
        "CountryCode": "076",
        "DocumentType": "Cpf",
        "DocumentNumber": "12345678901"
      }
    }
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Customer.Name` | String | 255 | Não | Nome do comprador |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.ReceivedDate` | String (DateTime) | — | Sim | Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS" |
| `Payment.CapturedAmount` | Integer | 15 | Sim | Valor capturado, sem pontuação. 100 equivale a R$ 1,00 |
| `InitializationVersion` | Integer int16 | — | Sim | Número de versão dos parametros baixados na inicialização do equipamento. |
| `Payment.ConfirmationStatus` | Integer | 2 | Não | Status da confirmação. 0 = Pendente 1 = Confirmado 2 = Desfeito |
| `Payment.Status` | Integer | 2 | Sim | Status da transação 0 = Não Finalizado 1 = Autorizado 2 = Pago 3 = Negado 10 = Cancelado 13 = Abortado |
| `Payment.ReturnCode` | String | 3 | Sim | Código de erro/resposta da transação da Adquirência. |
| `Payment.ReturnMessage` | String | — | Sim | Mensagem de erro/resposta da transação da Adquirência. |
| `Payment.PaymentId` | String (Guid) | 36 | Sim | Código do Pagamento |
| `Payment.SoftDescriptor` | String | 13 | — | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.PinBlock.EncryptedPinBlock` | String | — | Sim | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.CreditCard.PinBlock.EncryptionType` | String | — | Sim | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.CreditCard.PinBlock.KsnIdentification` | String | — | Sim | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Não | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Não | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Não | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Não | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.Receipt.MerchantName` | String | — | Sim | Nome da loja |
| `Payment.Receipt.MerchantAddress` | String | — | Sim | Endereço da loja |
| `Payment.Receipt.MerchantCity` | String | — | Sim | Cidade da loja |
| `Payment.Receipt.MerchantState` | String | — | Sim | Estado da loja |
| `Payment.Receipt.MerchantCode` | String | — | Sim | Codigo de identificação da loja |
| `Payment.Receipt.Terminal` | String | 8 | Sim | Identificação do Terminal |
| `Payment.Receipt.Nsu` | String | — | Sim | Numero de identificação da transação Cielo |
| `Payment.Receipt.Date` | String | — | Sim | Data da transação |
| `Payment.Receipt.Hour` | String | — | Sim | Horario da transação |
| `Payment.Receipt.IssuerName` | String | — | Sim | Nome do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.Receipt.CardHolder` | String | — | Não | Nome do titular do cartão. |
| `Payment.Receipt.CardNumber` | String | — | Sim | Número do cartão |
| `Payment.Receipt.Brand` | String | — | Sim | Bandeira do cartão |
| `Payment.Receipt.TransactionType` | String | — | Sim | Tipo de transação |
| `Payment.Receipt.AuthorizationCode` | String | — | Sim | Código da autorização |
| `Payment.Receipt.TransactionMode` | String | — | Sim | Modo da transação |
| `Payment.Receipt.InputMethod` | String | — | Sim | Metodo de entrada |
| `Payment.Receipt.Value` | String | — | Sim | Valor do pagamento |
| `Payment.Receipt.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Links` | Array[Object] | - | Não | links de navegação. |
| `Payment.Links.Method` | String | - | Sim | Metodo do link de navegação. |
| `Payment.Links.Rel` | String | - | Sim | Links de retorno para navegação. |
| `Payment.Links.Href` | String | - | Sim | Endereço do links de navegação. |
| `Payment.PrintMessage` | Array[Object] | - | Não | Dados para impressão. |
| `Payment.PrintMessage.Position` | String | - | Sim | Posição para impressão. |
| `Payment.PrintMessage.Message` | String | - | Sim | Mensagem para impressão. |
| `Payment.ReceiptInformation` | Array[Object] | - | Não | Dados do recibo. |
| `Payment.ReceiptInformation.Field` | String | - | Sim | Nome do campo do recibo. |
| `Payment.ReceiptInformation.Label` | String | - | Sim | Titulo do campo do recibo. |
| `Payment.ReceiptInformation.Content` | String | - | Sim | conteúdo do campo do recibo. |

### Crédito digitado com tokenização de cartão

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "201904150001",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
  },
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
      "TruncateCardNumberWhenPrinting": true,
      "SaveCard": false,
      "IsFallback": false
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

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Customer.Name` | String | 255 | Não | Nome do comprador |
| `Customer.Identity` | String | 14 | Não | Numero do cpf ou cnpj do cliente |
| `Customer.IdentityType` | String | 255 | Não | Tipo de documento de identificação do comprador (CPF ou CNPJ) |
| `Customer.Email` | String | 255 | Não | Email do comprador |
| `Customer.Birthday` | String | 10 | Não | Data de nascimento do comprador no formato AAAA-MM-DD |
| `Customer.Address.Street` | String | 255 | Não | Endereço de contato do comprador |
| `Customer.Address.Number` | String | 15 | Não | Número do endereço de contato do comprador |
| `Customer.Address.Complement` | String | 50 | Não | Complemento do endereço de contato do comprador |
| `Customer.Address.ZipCode` | String | 9 | Não | CEP do endereço de contato do comprador |
| `Customer.Address.City` | String | 50 | Não | Cidade do endereço de contato do comprador |
| `Customer.Address.State` | String | 2 | Não | Estado do endereço de contato do comprador |
| `Customer.Address.Country` | String | 35 | Não | País do endereço de contato do comprador |
| `Customer.DeliveryAddress.Street` | String | 255 | Não | Endereço de entrega do comprador |
| `Customer.DeliveryAddress.Number` | String | 15 | Não | Número do endereço de entrega |
| `Customer.DeliveryAddress.Complement` | String | 50 | Não | Complemento do endereço de entrega |
| `Customer.DeliveryAddress.ZipCode` | String | 9 | Não | CEP do endereço de entrega |
| `Customer.DeliveryAddress.City` | String | 50 | Não | Cidade do endereço de entrega |
| `Customer.DeliveryAddress.State` | String | 2 | Não | Estado do endereço de entrega |
| `Customer.DeliveryAddress.Country` | String | 35 | Não | País do endereço de entrega |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.CreditCard.CardNumber` | String | 19 | Sim | Número do cartão (PAN) |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.SecurityCodeStatus` | String | — | Sim | Enum: Collected Unreadable Nonexistent<br>Status da coleta de código de segurança (CVV) |
| `Payment.CreditCard.SecurityCode` | String | 4 | Sim | Código de segurança (CVV) |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId no objeto BinEntry da baixa de parametros. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed MagStripe Emv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.TruncateCardNumberWhenPrinting` | Booleano | — | Não | Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry. |
| `Payment.CreditCard.SaveCard` | Booleano | — | Não | Identifica se vai salvar/tokenizar o cartão. |
| `Payment.CreditCard.IsFallback` | Booleano | — | Não | Identifica se é uma transação de fallback. |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
    "MerchantAcquirerId": "0010000244470001",
    "TerminalAcquirerId": "71000027",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "DELETE",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702"
      },
      {
        "Method": "PUT",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation"
      }
    ],
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "Transação autorizada"
      },
      {
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    }
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.ServiceTaxAmount` | Integer | 15 | Não | Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização. |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.Amount` | Integer(int64) | — | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.ReceivedDate` | String (DateTime) | — | Sim | Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS" |
| `Payment.CapturedAmount` | Integer | 15 | Sim | Valor capturado, sem pontuação. 100 equivale a R$ 1,00 |
| `Payment.CapturedDate` | String (DateTime) | - | Não | Data da captura |
| `Payment.Provider` | String | 15 | Sim | Nome do provedor do meio de pagamento |
| `Payment.ConfirmationStatus` | Integer | 2 | Não | Status da confirmação. 0 = Pendente 1 = Confirmado 2 = Desfeito |
| `Payment.InitializationVersion` | Integer int16 | — | Sim | Número de versão dos parametros baixados na inicialização do equipamento. |
| `Payment.Status` | Integer | 2 | Sim | Status da transação 0 = Não Finalizado 1 = Autorizado 2 = Pago 3 = Negado 10 = Cancelado 13 = Abortado |
| `Payment.IsSplitted` | Booleano | — | Não | Indica se o pagamento tem split ou não. Default: false |
| `Payment.ReturnCode` | String | 3 | Sim | Código de erro/resposta da transação da Adquirência. |
| `Payment.ReturnMessage` | String | — | Sim | Mensagem de erro/resposta da transação da Adquirência. |
| `Payment.PaymentId` | String (Guid) | 36 | Sim | Código do Pagamento |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.Currency` | String | 3 | Não | Default: “BRL” / Value: “BRL” / Moeda (Preencher com “BRL”) |
| `Payment.Country` | String | 3 | Não | Default: “BRA” / Value: “BRA” / País (Preencher com “BRA”) |
| `Payment.CreditCard.CardNumber` | String | 19 | Sim | Número do cartão |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.SecurityCodeStatus` | String | — | Sim | Enum: Collected Unreadable Nonexistent<br>Status da coleta de código de segurança (CVV) |
| `Payment.CreditCard.SecurityCode` | String | 4 | Sim | retorno com valor mascarado |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.CreditCard.TruncateCardNumberWhenPrinting` | Booleano | — | Não | Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed MagStripe Emv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword, OnlineAuthentication, OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.BrandInformation.Type` | String | _ | Não | Tipo de venda. |
| `Payment.CreditCard.BrandInformation.Name` | String | — | Não | Nome da bandeira do cartão. |
| `Payment.CreditCard.SaveCard` | Booleano | — | Não | Identifica se vai salvar/tokenizar o cartão |
| `Payment.CreditCard.IsFallback` | Booleano | — | Não | Identifica se é uma transação de fallback. |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad PinPadWithoutChipReader PinPadWithChipReaderWithoutSamModule PinPadWithChipReaderWithSamModule NotCertifiedPinPad PinPadWithChipReaderWithoutSamAndContactless PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.Receipt.MerchantName` | String | — | Sim | Nome da loja |
| `Payment.Receipt.MerchantAddress` | String | — | Sim | Endereço da loja |
| `Payment.Receipt.MerchantCity` | String | — | Sim | Cidade da loja |
| `Payment.Receipt.MerchantState` | String | — | Sim | Estado da loja |
| `Payment.Receipt.MerchantCode` | String | — | Sim | Codigo de identificação da loja |
| `Payment.Receipt.Terminal` | String | 8 | Sim | Identificação do Terminal |
| `Payment.Receipt.Nsu` | String | — | Sim | Numero de identificação da transação Cielo |
| `Payment.Receipt.Date` | String | — | Sim | Data da transação |
| `Payment.Receipt.Hour` | String | — | Sim | Horario da transação |
| `Payment.Receipt.IssuerName` | String | — | Sim | Nome do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.Receipt.CardNumber` | String | — | Sim | Número do cartão |
| `Payment.Receipt.CardHolder` | String | — | Não | Nome do titular do cartão. |
| `Payment.Receipt.Brand` | String | — | Sim | Bandeira do cartão |
| `Payment.Receipt.TransactionType` | String | — | Sim | Tipo de transação |
| `Payment.Receipt.AuthorizationCode` | String | — | Sim | Código da autorização |
| `Payment.Receipt.TransactionMode` | String | — | Sim | Modo da transação |
| `Payment.Receipt.InputMethod` | String | — | Sim | Metodo de entrada |
| `Payment.Receipt.Value` | String | — | Sim | Valor do pagamento |
| `Payment.Receipt.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Links` | Array[Object] | - | Não | links de navegação. |
| `Payment.Links.Method` | String | - | Sim | Metodo do link de navegação. |
| `Payment.Links.Rel` | String | - | Sim | Links de retorno para navegação. |
| `Payment.Links.Href` | String | - | Sim | Endereço do links de navegação. |
| `Payment.PrintMessage` | Array[Object] | - | Não | Dados para impressão. |
| `Payment.PrintMessage.Position` | String | - | Sim | Posição para impressão. |
| `Payment.PrintMessage.Message` | String | - | Sim | Mensagem para impressão. |
| `Payment.ReceiptInformation` | Array[Object] | - | Não | Dados do recibo. |
| `Payment.ReceiptInformation.Field` | String | - | Sim | Nome do campo do recibo. |
| `Payment.ReceiptInformation.Label` | String | - | Sim | Titulo do campo do recibo. |
| `Payment.ReceiptInformation.Content` | String | - | Sim | conteúdo do campo do recibo. |
| `Customer.Name` | String | 255 | Não | Nome do comprador |
| `Customer.Identity` | String | 14 | Não | Numero do cpf ou cnpj do cliente |
| `Customer.IdentityType` | String | 255 | Não | Tipo de documento de identificação do comprador (CPF ou CNPJ) |
| `Customer.Email` | String | 255 | Não | Email do comprador |
| `Customer.Birthday` | String | 10 | Não | Data de nascimento do comprador no formato AAAA-MM-DD |
| `Customer.Address.Street` | String | 255 | Não | Endereço de contato do comprador |
| `Customer.Address.Number` | String | 15 | Não | Número do endereço de contato do comprador |
| `Customer.Address.Complement` | String | 50 | Não | Complemento do endereço de contato do comprador |
| `Customer.Address.ZipCode` | String | 9 | Não | CEP do endereço de contato do comprador |
| `Customer.Address.City` | String | 50 | Não | Cidade do endereço de contato do comprador |
| `Customer.Address.State` | String | 2 | Não | Estado do endereço de contato do comprador |
| `Customer.Address.Country` | String | 35 | Não | País do endereço de contato do comprador |
| `Customer.DeliveryAddress.Street` | String | 255 | Não | Endereço de entrega do comprador |
| `Customer.DeliveryAddress.Number` | String | 15 | Não | Número do endereço de entrega |
| `Customer.DeliveryAddress.Complement` | String | 50 | Não | Complemento do endereço de entrega |
| `Customer.DeliveryAddress.ZipCode` | String | 9 | Não | CEP do endereço de entrega |
| `Customer.DeliveryAddress.City` | String | 50 | Não | Cidade do endereço de entrega |
| `Customer.DeliveryAddress.State` | String | 2 | Não | Estado do endereço de entrega |
| `Customer.DeliveryAddress.Country` | String | 35 | Não | País do endereço de entrega |

### Crédito por tarja e senha

#### Requisição

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
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "MagStripe",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
      "TrackTwoData": "0123456789012345=012345678901234",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      }
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

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Não | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv, ContactlessEmv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.PinBlock.EncryptedPinBlock` | String | — | Não | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.CreditCard.PinBlock.EncryptionType` | String | — | Não | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.CreditCard.PinBlock.KsnIdentification` | String | — | Não | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |

#### Resposta

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
            "InputMode": "MagStripe",
            "AuthenticationMethod": "OnlineAuthentication",
            "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
            "TrackTwoData": "0123456789012345=012345678901234",
            "SaveCard": false,
            "IsFallback": false,
            "BrandInformation": {
                "Type": "VENDA A DEBITO",
                "Name": "VISA"
            },            
        },
        "PinPadInformation": {
            "TerminalId": "10000001",
            "SerialNumber": "ABC123",
            "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
            "ReturnDataInfo": "00"
        },
        "Amount": 15798,
        "ReceivedDate": "2019-04-15T12:00:00Z",
        "CapturedAmount": 15798,
        "CapturedDate": "2019-04-15T12:00:00Z",
        "Provider": "Cielo",
        "Status": 2,
        "ReturnCode": 0,
        "ReturnMessage": "Successful",
        "PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
        "Type": "PhysicalCreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "PaymentDateTime": "2021-09-16T11:42:57.555Z",
        "ServiceTaxAmount": 0,
        "SoftDescriptor": "Transação API",
        "ProductId": 80,
        "AuthorizationCode": "425871",
        "ProofOfSale": "284537",
        "InitializationVersion": 0,
        "ConfirmationStatus": 0,
        "OfflinePaymentType": "Online",
        "MerchantAcquirerId": "0011110225820001",
        "TerminalAcquirerId": "41168548",
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
                "Position": "Middle",
                "Message": "Informação adicional"
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
                "Content": "Estabelecimento"
            },
            {
                "Field": "MERCHANT_ADDRESS",
                "Label": "ENDEREÇO DO ESTABELECIMENTO",
                "Content": "Rua Sem Saida, 0"
            },
            {
                "Field": "MERCHANT_CITY",
                "Label": "CIDADE DO ESTABELECIMENTO",
                "Content": "Cidade"
            },
            {
                "Field": "MERCHANT_STATE",
                "Label": "ESTADO DO ESTABELECIMENTO",
                "Content": "WA"
            },
            {
                "Field": "MERCHANT_CODE",
                "Label": "COD.ESTAB.",
                "Content": 1234567890123456
            },
            {
                "Field": "TERMINAL",
                "Label": "POS",
                "Content": 12345678
            },
            {
                "Field": "NSU",
                "Label": "DOC",
                "Content": 123456
            },
            {
                "Field": "DATE",
                "Label": "DATA",
                "Content": "01/01/20"
            },
            {
                "Field": "HOUR",
                "Label": "HORA",
                "Content": "01:01"
            },
            {
                "Field": "ISSUER_NAME",
                "Label": "EMISSOR",
                "Content": "NOME DO EMISSOR"
            },
            {
                "Field": "CARD_NUMBER",
                "Label": "CARTÃO",
                "Content": 5432123454321234
            },
            {
                "Field": "TRANSACTION_TYPE",
                "Label": "TIPO DE TRANSAÇÃO",
                "Content": "VENDA A CREDITO"
            },
            {
                "Field": "AUTHORIZATION_CODE",
                "Label": "AUTORIZAÇÃO",
                "Content": 123456
            },
            {
                "Field": "TRANSACTION_MODE",
                "Label": "MODO DA TRANSAÇÃO",
                "Content": "ONL"
            },
            {
                "Field": "INPUT_METHOD",
                "Label": "MODO DE ENTRADA",
                "Content": "X"
            },
            {
                "Field": "VALUE",
                "Label": "VALOR",
                "Content": "1,23"
            },
            {
                "Field": "SOFT_DESCRIPTOR",
                "Label": "SOFT DESCRIPTOR",
                "Content": "Simulado"
            }
        ],
        "Receipt": {
            "MerchantName": "Estabelecimento",
            "MerchantAddress": "Rua Sem Saida, 0",
            "MerchantCity": "Cidade",
            "MerchantState": "WA",
            "MerchantCode": 1234567890123456,
            "Terminal": 12345678,
            "Nsu": 123456,
            "Date": "01/01/20",
            "Hour": "01:01",
            "IssuerName": "NOME DO EMISSOR",
            "CardNumber": 5432123454321234,
            "TransactionType": "VENDA A CREDITO",
            "AuthorizationCode": 123456,
            "CardHolder": "holder",
            "TransactionMode": "ONL",
            "InputMethod": "X",
            "Value": "1,23",
            "SoftDescriptor": "Simulado"
        }
    }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Customer.Name` | String | 255 | Não | Nome do comprador |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.ReceivedDate` | String (DateTime) | — | Sim | Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS" |
| `Payment.CapturedAmount` | Integer | 15 | Sim | Valor capturado, sem pontuação. 100 equivale a R$ 1,00 |
| `Payment.CapturedDate` | Datetime |  | Não | Data da captura do pagamento |
| `Payment.Provider` | String | 15 | Sim | Nome do provedor do meio de pagamento |
| `Payment.InitializationVersion` | Integer int16 | — | Sim | Número de versão dos parametros baixados na inicialização do equipamento. |
| `Payment.ConfirmationStatus` | Integer | 2 | Não | Status da confirmação. 0 = Pendente 1 = Confirmado 2 = Desfeito |
| `Payment.Status` | Integer | 2 | Sim | Status da transação 0 = Não Finalizado 1 = Autorizado 2 = Pago 3 = Negado 10 = Cancelado 13 = Abortado |
| `Payment.ReturnCode` | String | 3 | Sim | Código de erro/resposta da transação da Adquirência. |
| `Payment.ReturnMessage` | String | — | Sim | Mensagem de erro/resposta da transação da Adquirência. |
| `Payment.PaymentId` | String (Guid) | 36 | Sim | Código do Pagamento |
| `Payment.PaymentDateTime` | Datetime | - | Sim | Data do pagamento |
| `Payment.ServiceTaxAmount` | Decimal | - | Não | Taxa de serviço |
| `Payment.AuthorizationCode` | String | - | Sim | Cõdigo da autorização |
| `Payment.ProofOfSale` | String | - | Sim | NSU |
| `Payment.SubordinatedMerchantId` | Guid | 36 | — | Identificador da loja subordinada. |
| `Payment.OfflinePaymentType` | String | - | Não | Tipo de pagamento. |
| `Payment.MerchantAcquirerId` | String | - | Não | Identificador da loja. |
| `Payment.TerminalAcquirerId` | String | - | Não | Terminal da loja. |
| `Payment.Currency` | String | 3 | Sim | Moeda. |
| `Payment.Country` | String | 3 | Sim | Pais. |
| `Payment.IsSplitted` | Booleano | - | Não | Indica se o pagamento tem split ou não. Default: false. |
| `Payment.CreditCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.CreditCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.CreditCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.CreditCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv, ContactlessEmv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.CreditCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.CreditCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.CreditCard.PinBlock.EncryptedPinBlock` | String | — | Sim | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.CreditCard.PinBlock.EncryptionType` | String | — | Sim | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.CreditCard.PinBlock.KsnIdentification` | String | — | Sim | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.CreditCard.BrandInformation.Type` | String | — | Sim | Tipo da bandeira |
| `Payment.CreditCard.BrandInformation.Name` | String | — | Sim | Nome da bandeira |
| `Payment.CreditCard.BrandInformation.Description` | String | — | Sim | Descrição da bandeira |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.Receipt.MerchantName` | String | — | Sim | Nome da loja |
| `Payment.Receipt.MerchantAddress` | String | — | Sim | Endereço da loja |
| `Payment.Receipt.MerchantCity` | String | — | Sim | Cidade da loja |
| `Payment.Receipt.MerchantState` | String | — | Sim | Estado da loja |
| `Payment.Receipt.MerchantCode` | String | — | Sim | Codigo de identificação da loja |
| `Payment.Receipt.Terminal` | String | 8 | Sim | Identificação do Terminal |
| `Payment.Receipt.Nsu` | String | — | Sim | Numero de identificação da transação Cielo |
| `Payment.Receipt.Date` | String | — | Sim | Data da transação |
| `Payment.Receipt.Hour` | String | — | Sim | Horario da transação |
| `Payment.Receipt.IssuerName` | String | — | Sim | Nome do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.Receipt.CardHolder` | String | — | Não | Nome do titular do cartão. |
| `Payment.Receipt.CardNumber` | String | — | Sim | Número do cartão |
| `Payment.Receipt.Brand` | String | — | Sim | Bandeira do cartão |
| `Payment.Receipt.TransactionType` | String | — | Sim | Tipo de transação |
| `Payment.Receipt.AuthorizationCode` | String | — | Sim | Código da autorização |
| `Payment.Receipt.TransactionMode` | String | — | Sim | Modo da transação |
| `Payment.Receipt.InputMethod` | String | — | Sim | Metodo de entrada |
| `Payment.Receipt.Value` | String | — | Sim | Valor do pagamento |
| `Payment.Receipt.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Links` | Array[Object] | - | Não | links de navegação. |
| `Payment.Links.Method` | String | - | Sim | Metodo do link de navegação. |
| `Payment.Links.Rel` | String | - | Sim | Links de retorno para navegação. |
| `Payment.Links.Href` | String | - | Sim | Endereço do links de navegação. |
| `Payment.PrintMessage` | Array[Object] | - | Não | Dados para impressão. |
| `Payment.PrintMessage.Position` | String | - | Sim | Posição para impressão. |
| `Payment.PrintMessage.Message` | String | - | Sim | Mensagem para impressão. |
| `Payment.ReceiptInformation` | Array[Object] | - | Não | Dados do recibo. |
| `Payment.ReceiptInformation.Field` | String | - | Sim | Nome do campo do recibo. |
| `Payment.ReceiptInformation.Label` | String | - | Sim | Titulo do campo do recibo. |
| `Payment.ReceiptInformation.Content` | String | - | Sim | conteúdo do campo do recibo. |

### Débito por tarja e senha

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "1596226820548",
  "Payment": {
    "Type": "PhysicalDebitCard",
    "SoftDescriptor": "Transação API",
    "PaymentDateTime": "2020-01-08T11:00:00",
    "Amount": 100,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "ProductId": 2,
    "DebitCard": {
      "ExpirationDate": "12/2020",
      "SecurityCodeStatus": "Nonexistent",
      "BrandId": 1,
      "IssuerId": 2,
      "InputMode": "MagStripe",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
      "TrackTwoData": "0123456789012345=012345678901234",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
    },
    "PinPadInformation": {
      "PhysicalCharacteristics": "PinPadWithChipReaderWithoutSamAndContactless",
      "ReturnDataInfo": "00",
      "SerialNumber": "0820471929",
      "TerminalId": "12345678"
    }
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.DebitCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.DebitCard.SecurityCodeStatus` | String | - | Sim | Sim Enum: Collected Unreadable Nonexistent Status da coleta de código de segurança (CVV) |
| `Payment.DebitCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.DebitCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.DebitCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv,ContactlessEmv <br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.DebitCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.DebitCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.DebitCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.DebitCard.PinBlock.EncryptedPinBlock` | String | — | Sim | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.DebitCard.PinBlock.EncryptionType` | String | — | Sim | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.DebitCard.PinBlock.KsnIdentification` | String | — | Sim | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |

#### Resposta

```json
{
  "MerchantOrderId": "1633353893294",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "DebitCard": {
      "ExpirationDate": "07/2007",
      "SecurityCodeStatus": "Nonexistent",
      "BrandId": 1,
      "IssuerId": 1001,
      "TruncateCardNumberWhenPrinting": false,
      "InputMode": "MagStripe",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "C4984108238141017^TESTE CO ROMEU ^99995012693100184000000",
      "TrackTwoData": "*************************************",
      "IsFallback": false,
      "BrandInformation": {
        "Type": "VENDA A DEBITO",
        "Name": "VISA"
      },
      "SaveCard": false
    },
    "Amount": 700,
    "ReceivedDate": "2021-10-04T13:24:53Z",
    "CapturedAmount": 700,
    "CapturedDate": "2021-10-04T13:24:54Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 334564",
    "ReturnCode": "000",
    "PaymentId": "5949fcce-e773-4bbc-af88-06aef78280c5",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/5949fcce-e773-4bbc-af88-06aef78280c5"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/5949fcce-e773-4bbc-af88-06aef78280c5/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/5949fcce-e773-4bbc-af88-06aef78280c5"
      }
    ],
    "PaymentDateTime": "2021-10-04T10:24:54.213Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 2,
    "PinPadInformation": {
      "TerminalId": "00000001",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Braspag Testes"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Alameda Xingu, 512"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "BARUERI"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "SP"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "0010255016990001"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "42001000"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "677541"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "04/10/21"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "10:24"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "CIELO#VISA CREDITO"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "TESTE CO ROMEU "
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": "498410-1017"
      },
      {
        "Field": "BRAND",
        "Label": "BANDEIRA",
        "Content": "VISA"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A DEBITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "334564"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "D"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "7,00"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Description"
      }
    ],
    "Receipt": {
      "MerchantName": "Braspag Testes",
      "MerchantAddress": "Alameda Xingu, 512",
      "MerchantCity": "BARUERI",
      "MerchantState": "SP",
      "MerchantCode": "0010255016990001",
      "Terminal": "42001000",
      "Nsu": "677541",
      "Date": "04/10/21",
      "Hour": "10:24",
      "IssuerName": "CIELO#VISA CREDITO",
      "CardHolder": "TESTE CO ROMEU ",
      "CardNumber": "498410-1017",
      "Brand": "VISA",
      "TransactionType": "VENDA A DEBITO",
      "AuthorizationCode": "334564",
      "TransactionMode": "ONL",
      "InputMethod": "D",
      "Value": "7,00",
      "SoftDescriptor": "Description"
    },
    "AuthorizationCode": "334564",
    "ProofOfSale": "677541",
    "InitializationVersion": 0,
    "ConfirmationStatus": 0,
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "OfflinePaymentType": "Online",
    "MerchantAcquirerId": "0010255016990001",
    "TerminalAcquirerId": "42001000"
  }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Customer.Name` | String | 255 | Não | Nome do comprador |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.DebitCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.DebitCard.SecurityCodeStatus` | String | - | Sim | Sim Enum: Collected Unreadable Nonexistent Status da coleta de código de segurança (CVV) |
| `Payment.DebitCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.DebitCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.DebitCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv, ContactlessEmv<br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.DebitCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.DebitCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.DebitCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.DebitCard.PinBlock.EncryptedPinBlock` | String | — | Sim | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.DebitCard.PinBlock.EncryptionType` | String | — | Sim | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.DebitCard.PinBlock.KsnIdentification` | String | — | Sim | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.DebitCard.BrandInformation.Type` | String | — | Sim | Tipo da bandeira |
| `Payment.DebitCard.BrandInformation.Name` | String | — | Sim | Nome da bandeira |
| `Payment.DebitCard.BrandInformation.Description` | String | — | Sim | Descrição da bandeira |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.ReceivedDate` | String (DateTime) | — | Sim | Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS" |
| `Payment.CapturedAmount` | Integer | 15 | Sim | Valor capturado, sem pontuação. 100 equivale a R$ 1,00 |
| `Payment.CapturedDate` | Datetime |  | Não | Data da captura do pagamento |
| `Payment.Provider` | String | 15 | Sim | Nome do provedor do meio de pagamento |
| `Payment.InitializationVersion` | Integer int16 | — | Sim | Número de versão dos parametros baixados na inicialização do equipamento. |
| `Payment.ConfirmationStatus` | Integer | 2 | Não | Status da confirmação. 0 = Pendente 1 = Confirmado 2 = Desfeito |
| `Payment.Status` | Integer | 2 | Sim | Status da transação 0 = Não Finalizado 1 = Autorizado 2 = Pago 3 = Negado 10 = Cancelado 13 = Abortado |
| `Payment.ReturnCode` | String | 3 | Sim | Código de erro/resposta da transação da Adquirência. |
| `Payment.ReturnMessage` | String | — | Sim | Mensagem de erro/resposta da transação da Adquirência. |
| `Payment.PaymentId` | String (Guid) | 36 | Sim | Código do Pagamento |
| `Payment.PaymentDateTime` | Datetime | - | Sim | Data do pagamento |
| `Payment.ServiceTaxAmount` | Decimal | - | Não | Taxa de serviço |
| `Payment.AuthorizationCode` | String | - | Sim | Cõdigo da autorização |
| `Payment.ProofOfSale` | String | - | Sim | NSU |
| `Payment.SubordinatedMerchantId` | Guid | 36 | — | Identificador da loja subordinada. |
| `Payment.OfflinePaymentType` | String | - | Não | Tipo de pagamento. |
| `Payment.MerchantAcquirerId` | String | - | Não | Identificador da loja. |
| `Payment.TerminalAcquirerId` | String | - | Não | Terminal da loja. |
| `Payment.Currency` | String | 3 | Sim | Moeda. |
| `Payment.Country` | String | 3 | Sim | Pais. |
| `Payment.IsSplitted` | Booleano | - | Não | Indica se o pagamento tem split ou não. Default: false. |
| `Payment.Receipt.MerchantName` | String | — | Sim | Nome da loja |
| `Payment.Receipt.MerchantAddress` | String | — | Sim | Endereço da loja |
| `Payment.Receipt.MerchantCity` | String | — | Sim | Cidade da loja |
| `Payment.Receipt.MerchantState` | String | — | Sim | Estado da loja |
| `Payment.Receipt.MerchantCode` | String | — | Sim | Codigo de identificação da loja |
| `Payment.Receipt.Terminal` | String | 8 | Sim | Identificação do Terminal |
| `Payment.Receipt.Nsu` | String | — | Sim | Numero de identificação da transação Cielo |
| `Payment.Receipt.Date` | String | — | Sim | Data da transação |
| `Payment.Receipt.Hour` | String | — | Sim | Horario da transação |
| `Payment.Receipt.IssuerName` | String | — | Sim | Nome do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.Receipt.CardHolder` | String | — | Não | Nome do titular do cartão. |
| `Payment.Receipt.CardNumber` | String | — | Sim | Número do cartão |
| `Payment.Receipt.Brand` | String | — | Sim | Bandeira do cartão |
| `Payment.Receipt.TransactionType` | String | — | Sim | Tipo de transação |
| `Payment.Receipt.AuthorizationCode` | String | — | Sim | Código da autorização |
| `Payment.Receipt.TransactionMode` | String | — | Sim | Modo da transação |
| `Payment.Receipt.InputMethod` | String | — | Sim | Metodo de entrada |
| `Payment.Receipt.Value` | String | — | Sim | Valor do pagamento |
| `Payment.Receipt.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Links` | Array[Object] | - | Não | links de navegação. |
| `Payment.Links.Method` | String | - | Sim | Metodo do link de navegação. |
| `Payment.Links.Rel` | String | - | Sim | Links de retorno para navegação. |
| `Payment.Links.Href` | String | - | Sim | Endereço do links de navegação. |
| `Payment.PrintMessage` | Array[Object] | - | Não | Dados para impressão. |
| `Payment.PrintMessage.Position` | String | - | Sim | Posição para impressão. |
| `Payment.PrintMessage.Message` | String | - | Sim | Mensagem para impressão. |
| `Payment.ReceiptInformation` | Array[Object] | - | Não | Dados do recibo. |
| `Payment.ReceiptInformation.Field` | String | - | Sim | Nome do campo do recibo. |
| `Payment.ReceiptInformation.Label` | String | - | Sim | Titulo do campo do recibo. |
| `Payment.ReceiptInformation.Content` | String | - | Sim | conteúdo do campo do recibo. |

### Débito por tarja com cartão criptografado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
    "MerchantOrderId": "1596226820548",
    "Payment": {
        "Type": "PhysicalDebitCard",
        "SoftDescriptor": "Description",
        "PaymentDateTime": "2020-07-31T20:20:20.548Z",
        "Amount": 700,
        "ProductId": 2,
        "DebitCard": {
            "ExpirationDate": "{{Card_ExpirationDate}}",
            "SecurityCodeStatus": "Nonexistent",
            "BrandId": 1,
            "IssuerId": 2501,
            "InputMode": "MagStripe",
            "AuthenticationMethod": "OnlineAuthentication",
            "TrackOneData": "{{Card_TrackOneData}}",
            "TrackTwoData": "{{Card_TrackTwoData}}",
            "PinBlock": {
                "EncryptedPinBlock": "2280F6BDFD0C038D",
                "EncryptionType": "Dukpt3Des",
                "KsnIdentification": "fffff9999900522000d6"
            },
            "EncryptedCardData": {
                "EncryptionType": "DUKPT3DES",
                "TrackOneDataKSN": "KSNforTrackOneData",
                "TrackTwoDataKSN": "KSNforTrackTwoData"
            }
        },
        "PinPadInformation": {
            "TerminalId": "12345678",
            "SerialNumber": "6C651996",
            "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
            "ReturnDataInfo": "00"
        }
    }
}
```

| Propriedade | Tipo | Tamanho | Obrigatório | Descrição |
|---|---|---|---|---|
| `MerchantOrderId` | String | 15 | Sim | Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. |
| `Customer.Name` | String | 255 | Não | Nome do comprador |
| `Payment.Type` | String | — | Sim | Value: PhysicalCreditCard / Tipo da Transação |
| `Payment.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.PaymentDateTime` | String | date-time | Sim | Data e Hora da captura da transação |
| `Payment.Amount` | Integer(int64) | 15 | Sim | Valor da transação (1079 = R$10,79) |
| `Payment.Capture` | Booleano | — | Não | Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização. |
| `Payment.Installments` | Integer | 2 | Sim | Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros. |
| `Payment.Interest` | String | 10 | Não | Default: ByMerchant<br>Enum: ByMerchant, ByIssuer<br>Tipo de Parcelamento:<br>- Se os campos AllowFinancingByStore presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado.<br>- Se os campos AllowFinancingByCreditCardCompany presente nos objetos IssuerEntry, BinEntry e ProductEntry da baixa de parametros estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”. |
| `Payment.ProductId` | Integer | — | Sim | Código do produto identificado através do bin do cartão. |
| `Payment.DebitCard.ExpirationDate` | String | MM/yyyy | Sim | Data de validade do cartão.<br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação. |
| `Payment.DebitCard.SecurityCodeStatus` | String | - | Sim | Sim Enum: Collected Unreadable Nonexistent Status da coleta de código de segurança (CVV) |
| `Payment.DebitCard.BrandId` | Integer | — | Sim | Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE. |
| `Payment.DebitCard.IssuerId` | Integer | — | Sim | Código do emissor obtido através do campo IssuerId da BIN TABLE. |
| `Payment.DebitCard.InputMode` | String | — | Sim | Enum: Typed, MagStripe, Emv, ContactlessEmv <br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br>“00” – Magnético<br>“01” - Moedeiro VISA Cash sobre TIBC v1<br>“02” - Moedeiro VISA Cash sobre TIBC v3<br>“03” – EMV com contato<br>“04” - Easy-Entry sobre TIBC v1<br>“05” - Chip sem contato simulando tarja<br>“06” - EMV sem contato. |
| `Payment.DebitCard.AuthenticationMethod` | String | — | Sim | Enum: NoPassword OnlineAuthentication OfflineAuthentication<br>Método de autenticação<br>- Se o cartão foi lido a partir da digitação verificar o campo RequiresPasswordExceptForEMVCard dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1;<br>- Se o cartão foi lido a partir da trilha verificar o campo RequiresPassword dos objetos BinEntry, ParameterEntry e IssuerEntry da baixa de parametros. Se todos estiverem habilitados deve ser capturada a senha, se algum estiver desabilitado a captura da senha vai depender do último dígito do service code;<br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2.<br>1 - Sem senha = “NoPassword”;<br>2 - Senha online = “Online Authentication”;<br>3 - Senha off-line = “Offline Authentication”. |
| `Payment.DebitCard.TrackOneData` | String | — | Sim | Dados da trilha 1<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.DebitCard.TrackTwoData` | String | — | Não | Dados da trilha 2<br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação |
| `Payment.DebitCard.PinBlock.EncryptedPinBlock` | String | — | Sim | PINBlock Criptografado - Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022; - Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin(). |
| `Payment.DebitCard.PinBlock.EncryptionType` | String | — | Sim | Tipo de Criptografia Enum: "DukptDes" "Dukpt3Des" "MasterKey" |
| `Payment.DebitCard.PinBlock.KsnIdentification` | String | — | Sim | Identificação do KSN - Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042; - Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin(). |
| `Payment.DebitCard.BrandInformation.Type` | String | — | Sim | Tipo da bandeira |
| `Payment.DebitCard.BrandInformation.Name` | String | — | Sim | Nome da bandeira |
| `Payment.DebitCard.BrandInformation.Description` | String | — | Sim | Descrição da bandeira |
| `Payment.PinPadInformation.TerminalId` | String | 8 | Sim | Número Lógico definido no Concentrador Cielo. |
| `Payment.PinPadInformation.SerialNumber` | String | — | Sim | Número de Série do Equipamento. |
| `Payment.PinPadInformation.PhysicalCharacteristics` | String | — | Sim | Enum: WithoutPinPad, PinPadWithoutChipReader, PinPadWithChipReaderWithoutSamModule, PinPadWithChipReaderWithSamModule, NotCertifiedPinPad, PinPadWithChipReaderWithoutSamAndContactless, PinPadWithChipReaderWithSamModuleAndContactless<br>Sem PIN-pad = WithoutPinPad;<br>PIN-pad sem leitor de Chip = PinpadWithoutChipReader;<br>PIN-pad com leitor de Chip sem módulo SAM = PinPadWithChipReaderWithoutSamModule;<br>PIN-pad com leitor de Chip com módulo SAM = PinPadWithChipReaderWithSamModule;<br>PIN-pad não homologado = NotCertifiedPinPad;<br>PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = PinpadWithChipReaderWithoutSamAndContactless;<br>PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = PinpadWithChipReaderWithSamAndContactless.<br>Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC. |
| `Payment.PinPadInformation.ReturnDataInfo` | String | — | Sim | Retorno da função PP_GetInfo() da biblioteca compartilhada |
| `Payment.ReceivedDate` | String (DateTime) | — | Sim | Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS" |
| `Payment.CapturedAmount` | Integer | 15 | Sim | Valor capturado, sem pontuação. 100 equivale a R$ 1,00 |
| `Payment.CapturedDate` | Datetime |  | Não | Data da captura do pagamento |
| `Payment.Provider` | String | 15 | Sim | Nome do provedor do meio de pagamento |
| `Payment.InitializationVersion` | Integer int16 | — | Sim | Número de versão dos parametros baixados na inicialização do equipamento. |
| `Payment.ConfirmationStatus` | Integer | 2 | Não | Status da confirmação. 0 = Pendente 1 = Confirmado 2 = Desfeito |
| `Payment.Status` | Integer | 2 | Sim | Status da transação 0 = Não Finalizado 1 = Autorizado 2 = Pago 3 = Negado 10 = Cancelado 13 = Abortado |
| `Payment.ReturnCode` | String | 3 | Sim | Código de erro/resposta da transação da Adquirência. |
| `Payment.ReturnMessage` | String | — | Sim | Mensagem de erro/resposta da transação da Adquirência. |
| `Payment.PaymentId` | String (Guid) | 36 | Sim | Código do Pagamento |
| `Payment.PaymentDateTime` | Datetime | - | Sim | Data do pagamento |
| `Payment.ServiceTaxAmount` | Decimal | - | Não | Taxa de serviço |
| `Payment.AuthorizationCode` | String | - | Sim | Cõdigo da autorização |
| `Payment.ProofOfSale` | String | - | Sim | NSU |
| `Payment.SubordinatedMerchantId` | Guid | 36 | — | Identificador da loja subordinada. |
| `Payment.OfflinePaymentType` | String | - | Não | Tipo de pagamento. |
| `Payment.MerchantAcquirerId` | String | - | Não | Identificador da loja. |
| `Payment.TerminalAcquirerId` | String | - | Não | Terminal da loja. |
| `Payment.Currency` | String | 3 | Sim | Moeda. |
| `Payment.Country` | String | 3 | Sim | Pais. |
| `Payment.IsSplitted` | Booleano | - | Não | Indica se o pagamento tem split ou não. Default: false. |
| `Payment.Receipt.MerchantName` | String | — | Sim | Nome da loja |
| `Payment.Receipt.MerchantAddress` | String | — | Sim | Endereço da loja |
| `Payment.Receipt.MerchantCity` | String | — | Sim | Cidade da loja |
| `Payment.Receipt.MerchantState` | String | — | Sim | Estado da loja |
| `Payment.Receipt.MerchantCode` | String | — | Sim | Codigo de identificação da loja |
| `Payment.Receipt.Terminal` | String | 8 | Sim | Identificação do Terminal |
| `Payment.Receipt.Nsu` | String | — | Sim | Numero de identificação da transação Cielo |
| `Payment.Receipt.Date` | String | — | Sim | Data da transação |
| `Payment.Receipt.Hour` | String | — | Sim | Horario da transação |
| `Payment.Receipt.IssuerName` | String | — | Sim | Nome do emissor obtido através do campo IssuerId no objeto BinEntry. |
| `Payment.Receipt.CardHolder` | String | — | Não | Nome do titular do cartão. |
| `Payment.Receipt.CardNumber` | String | — | Sim | Número do cartão |
| `Payment.Receipt.Brand` | String | — | Sim | Bandeira do cartão |
| `Payment.Receipt.TransactionType` | String | — | Sim | Tipo de transação |
| `Payment.Receipt.AuthorizationCode` | String | — | Sim | Código da autorização |
| `Payment.Receipt.TransactionMode` | String | — | Sim | Modo da transação |
| `Payment.Receipt.InputMethod` | String | — | Sim | Metodo de entrada |
| `Payment.Receipt.Value` | String | — | Sim | Valor do pagamento |
| `Payment.Receipt.SoftDescriptor` | String | 13 | Não | Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura. |
| `Payment.Links` | Array[Object] | - | Não | links de navegação. |
| `Payment.Links.Method` | String | - | Sim | Metodo do link de navegação. |
| `Payment.Links.Rel` | String | - | Sim | Links de retorno para navegação. |
| `Payment.Links.Href` | String | - | Sim | Endereço do links de navegação. |
| `Payment.PrintMessage` | Array[Object] | - | Não | Dados para impressão. |
| `Payment.PrintMessage.Position` | String | - | Sim | Posição para impressão. |
| `Payment.PrintMessage.Message` | String | - | Sim | Mensagem para impressão. |
| `Payment.ReceiptInformation` | Array[Object] | - | Não | Dados do recibo. |
| `Payment.ReceiptInformation.Field` | String | - | Sim | Nome do campo do recibo. |
| `Payment.ReceiptInformation.Label` | String | - | Sim | Titulo do campo do recibo. |
| `Payment.ReceiptInformation.Content` | String | - | Sim | conteúdo do campo do recibo. |

#### Resposta

```json
{
  "MerchantOrderId": "1633353893294",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "DebitCard": {
      "ExpirationDate": "07/2007",
      "SecurityCodeStatus": "Nonexistent",
      "BrandId": 1,
      "IssuerId": 1001,
      "TruncateCardNumberWhenPrinting": false,
      "InputMode": "MagStripe",
      "AuthenticationMethod": "NoPassword",
      "TrackOneData": "C4984108238141017^TESTE CO ROMEU ^99995012693100184000000",
      "TrackTwoData": "*************************************",
      "IsFallback": false,
      "BrandInformation": {
        "Type": "VENDA A DEBITO",
        "Name": "VISA"
      },
      "EncryptedCardData": {
        "EncryptionType": "DUKPT3DES",
        "TrackOneDataKSN": "KSNforTrackOneData",
        "TrackTwoDataKSN": "KSNforTrackTwoData"
      },
      "SaveCard": false
    },
    "Amount": 700,
    "ReceivedDate": "2021-10-04T13:24:53Z",
    "CapturedAmount": 700,
    "CapturedDate": "2021-10-04T13:24:54Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 334564",
    "ReturnCode": "000",
    "PaymentId": "5949fcce-e773-4bbc-af88-06aef78280c5",
    "Type": "PhysicalDebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/5949fcce-e773-4bbc-af88-06aef78280c5"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/5949fcce-e773-4bbc-af88-06aef78280c5/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/5949fcce-e773-4bbc-af88-06aef78280c5"
      }
    ],
    "PaymentDateTime": "2021-10-04T10:24:54.213Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 2,
    "PinPadInformation": {
      "TerminalId": "00000001",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "Braspag Testes"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Alameda Xingu, 512"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "BARUERI"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "SP"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "0010255016990001"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "42001000"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "677541"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "04/10/21"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "10:24"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "CIELO#VISA CREDITO"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "TESTE CO ROMEU "
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": "498410-1017"
      },
      {
        "Field": "BRAND",
        "Label": "BANDEIRA",
        "Content": "VISA"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A DEBITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "334564"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "D"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "7,00"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Description"
      }
    ],
    "Receipt": {
      "MerchantName": "Braspag Testes",
      "MerchantAddress": "Alameda Xingu, 512",
      "MerchantCity": "BARUERI",
      "MerchantState": "SP",
      "MerchantCode": "0010255016990001",
      "Terminal": "42001000",
      "Nsu": "677541",
      "Date": "04/10/21",
      "Hour": "10:24",
      "IssuerName": "CIELO#VISA CREDITO",
      "CardHolder": "TESTE CO ROMEU ",
      "CardNumber": "498410-1017",
      "Brand": "VISA",
      "TransactionType": "VENDA A DEBITO",
      "AuthorizationCode": "334564",
      "TransactionMode": "ONL",
      "InputMethod": "D",
      "Value": "7,00",
      "SoftDescriptor": "Description"
    },
    "AuthorizationCode": "334564",
    "ProofOfSale": "677541",
    "InitializationVersion": 0,
    "ConfirmationStatus": 0,
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "OfflinePaymentType": "Online",
    "MerchantAcquirerId": "0010255016990001",
    "TerminalAcquirerId": "42001000"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`DebitCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`DebitCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`DebitCard.IssuerId`|Integer|---|Sim|Código do emissor obtido através do campo IssuerId da BIN TABLE.|
|`DebitCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no `confParamOp03` presente nas tabelas BIN TABLE, PARAMETER TABLE e ISSUER TABLE.|
|`CreditCard.InputMode`|String|---|Sim|Enum: Typed MagStripe Emv, ContactlessEmv <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC.<br><br>“00” – Magnético<br><br>“01” - Moedeiro VISA Cash sobre TIBC v1<br><br>“02” - Moedeiro VISA Cash sobre TIBC v3<br><br>“03” – EMV com contato<br><br>“04” - Easy-Entry sobre TIBC v1<br><br>“05” - Chip sem contato simulando tarja<br><br>|“06” - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC.|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|String|---|---|---|
|`PinBlock.KsnIdentification`|String|---|---|---|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId|Integer`|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.PhysicalCharacteristics`|String|-|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`Payment.Amount|Integer`|(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
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
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.Currency`|String|---|---|Default: “BRL” / Value: “BRL” / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|---|---|Default: “BRA” / Value: “BRA” / País (Preencher com “BRA”)|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito por chip com senha online

#### Requisição

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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "RecurrentPayment": {
      "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2019-12-01",
      "EndDate": "2019-12-01",
      "Interval": 6
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ],
    "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito por chip com envio da baixa tecnica

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
    "MerchantOrderId": "1596226820548",
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
            "AuthenticationMethod": "OnlineAuthentication",
            "TrackTwoData": "0123456789012345=012345678901234",
            "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
            "PinBlock": {
                "EncryptedPinBlock": "2280F6BDFD0C038D",
                "EncryptionType": "Dukpt3Des",
                "KsnIdentification": "1231vg31fv231313123"
            },
            "PanSequenceNumber": 123,
            "SaveCard": false,
            "IsFallback": false
        },
        "PinPadInformation": {
            "TerminalId": "10000001",
            "SerialNumber": "ABC123",
            "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
            "ReturnDataInfo": "00",
            "TechnicalParameter": {
                "KernelEmvVersion": "v653",
                "ContactlessModuleVersion": "v553",
                "KernelPayPassVersion": "553",
                "KernelContactlessPayWaveVersion": "553",
                "HardwareModel": "S920",
                "ManufacturerName": "PAX",
                "FirmwareVersion": "2.4.149",
                "BasicLibVersion": "001.41 200617",
                "SpecificationVersion": "1.08",
                "AcquirerVersion": "001.41 200617",
                "SimCardNumber": "123",
                "PaymentAppVersion": "123",
                "PrintedLines": 99                      
            }
        }
    }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`|Booleano|---|Não|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|2|Sim|Deault: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany, MaximumNumberOfInstallmentsWhenFinancingByStore, MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto ProductEntry da baixa de parametros.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|---|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|CreditCard.IssuerId|Integer|---|Sim|Código do emissor obtido através do campo IssuerId no objeto BinEntry da baixa de parametros.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`CreditCard.PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`CreditCard.PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`CreditCard.PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`PinPadInformation.TechnicalParameter`|Object|---|Não|Objeto com os parametros da baixa tecnica|
|`PinPadInformation.TechnicalParameter.KernelEmvVersion`|String|---|Sim|Versão kernel EMV com contato|
|`PinPadInformation.TechnicalParameter.ContactlessModuleVersion`|String|---|Sim|Versão kernel EMV contactless|
|`PinPadInformation.TechnicalParameter.KernelPayPassVersion`|String|---|Sim|Versão kernel contactless Mastercard PayPass / MCL|
|`PinPadInformation.TechnicalParameter.KernelContactlessPayWaveVersion`|String|---|Sim|Versão kernel contactless Visa PayWave|
|`PinPadInformation.TechnicalParameter.HardwareModel`|String|---|Sim|Modelo do pinpad|
|`PinPadInformation.TechnicalParameter.ManufacturerName`|String|---|Sim|Nome do fabricante do pinpad|
|`PinPadInformation.TechnicalParameter.FirmwareVersion`|String|---|Sim|Versão do firmware|
|`PinPadInformation.TechnicalParameter.BasicLibVersion`|String|---|Sim|versão da aplicação básica|
|`PinPadInformation.TechnicalParameter.SpecificationVersion`|String|---|Sim|Versão da especificação|
|`PinPadInformation.TechnicalParameter.AcquirerVersion`|String|---|Sim|Versão da rede adquirente|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo"
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
    },
    "PaymentDateTime": "2019-04-15T12:00:00Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "10000001",
      "SerialNumber": "ABC123",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",
      "ReturnDataInfo": "00",
      "TechnicalParameter": {
        "KernelEmvVersion": "v653",
        "ContactlessModuleVersion": "v553",
        "KernelPayPassVersion": "553",
        "KernelContactlessPayWaveVersion": "553",
        "HardwareModel": "S920",
        "ManufacturerName": "PAX",
        "FirmwareVersion": "2.4.149",
        "BasicLibVersion": "001.41 200617",
        "SpecificationVersion": "1.08",
        "AcquirerVersion": "001.41 200617",
        "SimCardNumber": "123",
        "PaymentAppVersion": "123",
        "PrintedLines": 99
      }
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|15|Sim|Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal.|
|`Customer.Name`|String|255|Não|Nome do comprador|
|`Customer.Identity`|String|14|Não|Numero do cpf ou cnpj do cliente|
|`Customer.IdentityType`|String|255|Não|Tipo de documento de identificação do comprador (CPF ou CNPJ)|
|`Customer.Email`|String|255|Não|Email do comprador|
|`Customer.Birthday`|String|10|Não|Data de nascimento do comprador no formato AAAA-MM-DD|
|`Address.Street`|String|255|Não|Endereço de contato do comprador|
|`Address.Number`|String|15|Não|Número do endereço de contato do comprador|
|`Address.Complement`|String|50|Não|Complemento do endereço de contato do comprador|
|`Address.ZipCode`|String|9|Não|CEP do endereço de entrega|
|`Address.City`|String|50|Não|Cidade do endereço de entrega|
|`Address.State`|String|2|Não|-|Estado do endereço de entrega|
|`Address.Country`|String|35|Não|País do endereço de entrega|
|`Payment.Installments`|Integer|2|Sim|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos<br><br>MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany,br><br>  MaximumNumberOfInstallmentsWhenFinancingByStore,br><br>  MaximumNumberOfinstallmentsForSaleAndCDCQuery e MinimumNumberOfInstallmentsWhenFinancingByStore da objeto<br><br>ProductEntry da baixa de parametros.|
|`Payment.Interest`|String|10|Não|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.Capture`|Booleano|—|Não|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`CreditCard.ExpirationDate`|String|MM/yyyy|Sim|Data de validade do cartão. <br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação.|
|`CreditCard.BrandId`|Integer|—|Sim|Identificação da bandeira obtida através do campo BrandId da PRODUCT TABLE.|
|`CreditCard.IssuerId`|Integer|—|Sim|Código do emissor obtido através do campo IssuerId no objeto BinEntry.|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|—|Não|Indica se o número do cartão será truncado no momento da impressão do comprovante. A solução de captura deve tomar essa decisão com base no campo AllowPrintingPartialCardNumberInReceipt presente nos objetos BinEntry, ParameterEntry e IssuerEntry.|
|`CreditCard.InputMode`|String|—|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.AuthenticationMethod`|String|---|Sim|Enum: `NoPassword` `OnlineAuthentication` `OfflineAuthentication` <br><br>Método de autenticação <br><br>- Se o cartão foi lido a partir da digitação verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, a senha deve ser capturada e o authenticationMethod assume valor 2. Caso contrário, assume valor 1; <br><br>- Se o cartão foi lido a partir da trilha verificar o bit 3 do atributo confParamOp04 das tabelas binTable, parameterTable e issuerTable. Se todos estiverem habilitados, deve ser verificado o bit 2 do mesmo campo. Se este estiver com valor 1 deve ser capturada a senha. Se estiver com valor 0 a captura da senha vai depender do último dígito do service code; <br><br>- Se o cartão foi lido através do chip EMV, o authenticationMethod será preenchido com base no retorno da função PP_GoOnChip(). No resultado PP_GoOnChip(), onde se o campo da posição 003 do retorno da PP_GoOnChip() estiver com valor 1 indica que o pin foi validado off-line, o authenticationMethod será 3. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valor 0, o authenticationMethod será 1. Se o campo da posição 003 e o campo da posição 006 do retorno da PP_GoOnChip() estiverem com valores 0 e 1 respectivamente, o authenticationMethod será 2. <br><br>1 - Sem senha = “NoPassword”; <br><br>2 - Senha online = “Online Authentication”; <br><br>3 - Senha off-line = “Offline Authentication”.|
|`CreditCard.EmvData`|String|---|Sim|Dados da transação EMV <br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|Sim|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|Não|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|Não|Identifica se é uma transação de fallback.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.ServiceTaxAmount`|Integer|15|Não|Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.|
|`Payment.SoftDescriptor`|String|13|Não|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`PinPadInformation.TerminalId`|String|8|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`PinPadInformation.TechnicalParameter`|Object|—|Não|Objeto com os parametros da baixa tecnica|
|`PinPadInformation.TechnicalParameter.KernelEmvVersion`|String|—|Sim|Versão kernel EMV com contato|
|`PinPadInformation.TechnicalParameter.ContactlessModuleVersion`|String|---|Sim|Versão kernel EMV contactless|
|`PinPadInformation.TechnicalParameter.KernelPayPassVersion`|String|---|Sim|Versão kernel contactless Mastercard PayPass / MCL|
|`PinPadInformation.TechnicalParameter.KernelContactlessPayWaveVersion`|String|---|Sim|Versão kernel contactless Visa PayWave|
|`PinPadInformation.TechnicalParameter.HardwareModel`|String|---|Sim|Modelo do pinpad|
|`PinPadInformation.TechnicalParameter.ManufacturerName`|String|---Sim|Nome do fabricante do pinpad|
|`PinPadInformation.TechnicalParameter.FirmwareVersion`|String|---|Sim|Versão do firmware|
|`PinPadInformation.TechnicalParameter.BasicLibVersion`|String|---|Sim|versão da aplicação básica|
|`PinPadInformation.TechnicalParameter.SpecificationVersion`|String|---|Sim|Versão da especificação|
|`PinPadInformation.TechnicalParameter.AcquirerVersion`|String|---|Sim|Versão da rede adquirente|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.ReceivedDate`|String (DateTime)|---|Sim|Data em que a transação foi recebida. Formato "AAAA-MM-DD HH:mm:SS"|
|`Payment.CapturedAmount`|Integer|15|Sim|Valor capturado, sem pontuação. 100 equivale a R$ 1,00|
|`Payment.Provider`|String|15|Sim|Nome do provedor do meio de pagamento|
|`Payment.ConfirmationStatus`|Integer|2|Não|Status da confirmação.<br><br>0 = Pendente<br><br>1 = Confirmado<br><br>2 = Desfeito|
|`InitializationVersion`|Integer| int16|---|Sim|Número de versão dos parametros baixados na inicialização do equipamento.|
|`Payment.EmvResponseData`|String|---|Sim|Dados da transação EMV Obtidos através do comando PP_GoOnChip na BC|
|`Payment.Status`|Integer|2|Sim|Status da transação<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`Payment.IsSplitted`|Booleano|---|Não|Indica se o pagamento tem split ou não. Default: false|
|`Payment.ReturnCode`|String|3|Sim|Código de erro/resposta da transação da Adquirência.|
|`Payment.ReturnMessag`|String|---|Sim|Mensagem de erro/resposta da transação da Adquirência.|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.PaymentId`|String(Guid)|36|Sim|Código do Pagamento|
|`Payment.Type`|String|---|Sim|Value: PhysicalCreditCard / Tipo da Transação|
|`Payment.Currency`|String|3|Não|Default: “BRL” / Value: “BRL” / Moeda (Preencher com “BRL”)|
|`Payment.Country`|String|3|Não|Default: “BRA” / Value: “BRA” / País (Preencher com “BRA”)|
|`Receipt.MerchantName`|String|---|Sim|Nome da loja|
|`Receipt.MerchantAddress`|String|---|Sim|Endereço da loja|
|`Receipt.MerchantCity`|String|---|Sim|Cidade da loja|
|`Receipt.MerchantState`|String|---|Sim|Estado da loja|
|`Receipt.MerchantCode`|String|---|Sim|Codigo de identificação da loja|
|`Receipt.Terminal`|String|8|Sim|Identificação do Terminal|
|`Receipt.NsuString`|---|Sim|Numero de identificação da transação Cielo|
|`Receipt.Date`|String|---|Sim|Data da transação|
|`Receipt.Hour`|String|---|Sim|Horario da transação|
|`Receipt.IssuerName`|String|---|Sim|Nome do emissor obtido através do campo IssuerId no objeto BinEntry.|
|`Receipt.CardNumber`|String|---|Sim|Número do cartão|
|`Receipt.TransactionType`|String|---|Sim|Tipo de transação|
|`Receipt.AuthorizationCode`|String|---|Sim|Código da autorização|
|`Receipt.TransactionMode`|String|---|Sim|Modo da transação|
|`Receipt.InputMethod`|String|---|Sim|Metodo de entrada|
|`Receipt.Value`|String|---|Sim|Valor do pagamento|
|`Receipt.SoftDescriptor`|String|13|Não|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`RecurrentPayment.RecurrentPaymentId`|String (Guid)|36|Não|ID que representa a recorrência, utilizada para consultas e alterações futuras.|
|`RecurrentPayment.ReasonCode`|String|---|Não|Codigo de erro/resposta da recorrencia|
|`RecurrentPayment.ReasonMessage`|String|---|Não|Mensagem de erro/resposta da recorrencia|
|`RecurrentPayment.NextRecurrency`|String (Date)|10|Não|Data de quando acontecerá a próxima recorrência. Formato "YYYY-MM-DD"|
|`RecurrentPayment.EndDate`|String|10|Não|Data para término da recorrência.|
|`RecurrentPayment.Interval`|String|10|Não|Intervalo da recorrência. Não utilizar em conjunto com DailyInterval. Monthly (default) / Bimonthly / Quarterly / SemiAnnual Annual|
|`SplitPayments.SubordinateMerchantId`|String (Guid)|36|Não|Identificador do Seller na Cielo.|
|`SplitPayments.Amount`|Integer|15|Não|Total da venda do Seller específico. R$ 100,00 = 10000|
|`SplitPayments.Fares.Mdr`|Decimal|3,2|Não|Taxa aplicada pela loja Master sobre o Seller para desconto|
|`SplitPayments.Fares.Fee`|Integer|15|Não|Tarifa aplicada pela loja Master sobre o Seller para desconto|
|`SplitErrors.Code`|String|---|Não|Código de erro/resposta da transação do Split|
|`SplitErrors.Message`|String|---|Não|Mensagem de erro/resposta da transação do Split|

### Crédito por chip com cartão criptografado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
  "MerchantOrderId": "1596226820548",
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
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackTwoData": "0123456789012345=012345678901234",
      "EncryptedCardData": {
          "EncryptionType": "DUKPT3DES",
          "TrackTwoDataKSN": "KSNforTrackTwoData"
      },
      "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "1231vg31fv231313123"
      },
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "RecurrentPayment": {
      "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2019-12-01",
      "EndDate": "2019-12-01",
      "Interval": 6
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ],
    "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Débito por chip e senha online

#### Requisição

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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`DebitCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`DebitrCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`DebitCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "RecurrentPayment": {
      "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2019-12-01",
      "EndDate": "2019-12-01",
      "Interval": 6
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ],
    "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---||---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`DebitCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`DebitCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Voucher por chip e senha online

#### Requisição

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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`VoucherCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`VoucherCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`VoucherCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "20180204",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthday": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
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
      "PanSequenceNumber": 123,
      "SaveCard": false,
      "IsFallback": false
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
        "Position": "Middle",
        "Message": "Informação adicional"
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    },
    "RecurrentPayment": {
      "RecurrentPaymentId": "a6b719fa-a8df-ab11-4e1a-f4e50d5bd702",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2019-12-01",
      "EndDate": "2019-12-01",
      "Interval": 6
    },
    "SplitPayments": [
      {
        "SubordinateMerchantId": "491daf20-35f2-4379-874c-e7552ae8dc10",
        "Amount": 100,
        "Fares": {
          "Mdr": 5,
          "Fee": 0
        }
      },
      {
        "SubordinateMerchantId": "7e2846be-4e80-4f86-8ca9-eb35db6aea00",
        "Amount": 80,
        "Fares": {
          "Mdr": 3,
          "Fee": 1
        }
      }
    ],
    "SplitErrors": [
      {
        "Code": 326,
        "Message": "SubordinatePayment amount must be greater than zero"
      }
    ]
  }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---||---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`VoucherCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`VoucherCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito a vista com QRCode

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "SubordinatedMerchantId": "{Auth_ClientId}",
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Description",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 200,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "CreditCard": {
         "InputMode": "QRCode",
         "QRCodeData": "180313001B1D4349",
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         }
      },
      "PinPadInformation": {
         "TerminalId": "12345678",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Payment.Type`|String|---|Sim|Value: `PhysicalCreditCard` / Tipo da Transação|
|`Payment.SoftDescriptor`|String|13|---|Identificação do estabelecimento (nome reduzido) a ser impresso e identificado na fatura.|
|`Payment.PaymentDateTime`|String|date-time|Sim|Data e Hora da captura da transação|
|`Payment.Amount`|Integer(int64)|---|Sim|Valor da transação (1079 = R$10,79)|
|`Payment.Capture`|Booleano|---|---|Default: false / Booleano que identifica que a autorização deve ser com captura automática. A autorização sem captura automática é conhecida também como pré-autorização.|
|`Payment.Installments`|Integer|---|---|Default: 1 / Quantidade de Parcelas: Varia de 2 a 99 para transação de financiamento. Deve ser verificado os atributos maxOfPayments1, maxOfPayments2, maxOfPayments3 e minValOfPayments da tabela productTable.|
|`Payment.Interest`|String|---|---|Default: `ByMerchant` <br><br> Enum: `ByMerchant` `ByIssuer` <br><br> Tipo de Parcelamento: <br><br> - Se o bit 6 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 6 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento sem juros pode ser efetuado. <br><br> - Se o bit 7 do atributo confParamOp05, presente nas tabelas issuerTable e binTable e bit 7 do atributo confParamOp03 da tabela productTable estiverem todos habilitados indica que o tipo de parcelamento com juros pode ser efetuado. Sem juros = “ByMerchant”; Com juros = “ByIssuer”.|
|`Payment.ProductId`|Integer|---|Sim|Código do produto identificado através do bin do cartão.|
|`CreditCard.InputMode`|String|---|Sim|Enum: `Typed` `MagStripe` `Emv` <br><br>Identificação do modo de captura do cartão na transação. Essa informação deve ser obtida através do retorno da função PP_GetCard da BC. <br><br>"00" – Magnético <br><br>"01" - Moedeiro VISA Cash sobre TIBC v1 <br><br>"02" - Moedeiro VISA Cash sobre TIBC v3 <br><br>"03" – EMV com contato <br><br>"04" - Easy-Entry sobre TIBC v1 <br><br>"05" - Chip sem contato simulando tarja <br><br> "06" - EMV sem contato.|
|`CreditCard.QRCodeData`|String|---|Sim|QRCodeData|
|`CreditCard.PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`CreditCard.PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`CreditCard.PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "1593196763217",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "BrandId": 0,
      "IssuerId": 0,
      "TruncateCardNumberWhenPrinting": false,
      "InputMode": "QRCode",
      "EmvData": "",
      "IsFallback": false,
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "fffff9999900522000d6"
      },
      "BrandInformation": {
        "Type": "fwxueo?k}e",
        "Name": "|pqbb?t~",
        "Description": "?gqcoumet?~l}m?u?~grqusz?c|tmi"
      },
      "SaveCard": false,
      "QrCodeData": "180313001B1D4349"
    },
    "Amount": 200,
    "ReceivedDate": "2020-06-26T18:39:23Z",
    "CapturedAmount": 200,
    "CapturedDate": "2020-06-26T18:39:24Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 775251",
    "ReturnCode": "000",
    "PaymentId": "cc0ff29e-875b-4155-9600-789704a290af",
    "Type": "PhysicalCreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/cc0ff29e-875b-4155-9600-789704a290af"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/cc0ff29e-875b-4155-9600-789704a290af/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/cc0ff29e-875b-4155-9600-789704a290af"
      }
    ],
    "PaymentDateTime": "2020-06-26T18:39:23.217Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "42004558",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "it}?awz?ga"
      },
      {
        "Position": "Middle",
        "Message": "??a?yux{p~"
      },
      {
        "Position": "Bottom",
        "Message": "l~uzd}e{lq"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "fxwjkqxebkfi{bnny|dl}~}l|gxh"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "lbbp?upuz??w}l{?{bqvzh?vml{jqpsdhg?s"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "yz}w}{?rryv?nagjwq}?lrrecii{ual}wpz"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "23585155"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "ny?bdc|ncopzmw?a~dou}h?b?"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "114075"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "53391876948611"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "?eugn?iyf{knjvmsjkl"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "59108"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "rlrqipne}?vd"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "gi}?kso|xz|mrhpk?j?g~k?qsdpj?jmlolwyg?eellui~zszfdew?"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "?f"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "6/26/2020"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "3:39 PM"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "200"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "}al"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO"
      }
    ],
    "Receipt": {
      "MerchantName": "fxwjkqxebkfi{bnny|dl}~}",
      "MerchantCity": "lbbp?upuz??w}l{?{bqvzh?vml{wthg?s",
      "InputMethod": "yz}w}{?rryv?nagjwq}?lrr~mf~~db??tu?ean{o~ecii{ual}wpz",
      "Terminal": "23585155",
      "IssuerName": "ny?bdclrry|ncopzmw?a~dou}h?b?",
      "Nsu": "114075",
      "MerchantCode": "53391876948611",
      "MerchantAddress": "?eugn?iyf{knjvmvx~vfkpiskjkuf?sh?",
      "AuthorizationCode": "59108",
      "CardHolder": "rlrhr?tj?zyml|qipne}?vd",
      "TransactionType": "gi}?kso|xz|mrhpk?j?g~k?qx?h}dq|whg??wyg?eellui~zszfdew?",
      "MerchantState": "?f",
      "Date": "6/26/2020",
      "Hour": "3:39 PM",
      "Value": "200",
      "TransactionMode": "}al",
      "CardNumber": null
    },
    "AuthorizationCode": "775251",
    "ProofOfSale": "325230",
    "InitializationVersion": 1593196200000,
    "ConfirmationStatus": 0,
    "EmvResponseData": "331657110",
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "OfflinePaymentType": "Online"
  }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---||---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---|---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---|---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`VoucherCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`VoucherCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Crédito Offline

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Description",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 300,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "OfflinePaymentType": "OfflineWithoutAttemptOnline",
      "CreditCard": {
         "InputMode": "Emv",
         "BrandId": 1,
         "IssuerId": 401,
         "TruncateCardNumberWhenPrinting": true,
         "ExpirationDate": "12/2020",
         "PanSequenceNumber": 1,
         "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
         "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
         "TrackTwoData": "0123456789012345=012345678901234",
         "AuthenticationMethod": "OnlineAuthentication",
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         }
      },
      "PinPadInformation": {
         "TerminalId": "12345678",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|

#### Resposta

```json
{
  "MerchantOrderId": "1593196632858",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2021",
      "BrandId": 1,
      "IssuerId": 401,
      "TruncateCardNumberWhenPrinting": true,
      "PanSequenceNumber": 1,
      "InputMode": "Emv",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "B3764 361234 56006^NOME NOME NOME NOME NOME N^0905060640431",
      "TrackTwoData": "1111222233334444=09050606404312376450",
      "EmvData": "",
      "IsFallback": false,
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "fffff9999900522000d6"
      },
      "BrandInformation": {
        "Type": "aq?t?{zgk",
        "Name": "f?b}wbrxa}",
        "Description": "zmhm|mhpxh?s{mphntbv|~?wvr~tp"
      },
      "SaveCard": false
    },
    "Amount": 300,
    "ReceivedDate": "2020-06-26T18:37:12Z",
    "CapturedAmount": 300,
    "CapturedDate": "2020-06-26T18:37:13Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 075551",
    "ReturnCode": "000",
    "PaymentId": "ef7530c9-ace3-4143-a7d2-c80ff70c9e93",
    "Type": "PhysicalCreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/ef7530c9-ace3-4143-a7d2-c80ff70c9e93"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/ef7530c9-ace3-4143-a7d2-c80ff70c9e93/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/ef7530c9-ace3-4143-a7d2-c80ff70c9e93"
      }
    ],
    "PaymentDateTime": "2020-06-26T18:37:12.858Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "42004558",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "yglxgftc{w"
      },
      {
        "Position": "Middle",
        "Message": "aji~?n?ckp"
      },
      {
        "Position": "Bottom",
        "Message": "uyai?|?{s?"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "ipwa~jpkp"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "odw{piu~?x{"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "oq?p{nket|"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "56712930"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "j~qaw"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "415858"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "13112148245096"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "wcjh~qf?gzjjv?"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "41101"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "obl}oh|q|b?xr??"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "gtfph?bwh?"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "rc"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "6/26/2020"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "3:37 PM"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "300"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "dug"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO"
      }
    ],
    "Receipt": {
      "MerchantName": "ipwa~jpkpg~ee?h",
      "MerchantCity": "odw{piu~?x{wcd{xu?kr",
      "InputMethod": "oq?p{nket|skqp{v?dyfyvlmekabfr~",
      "Terminal": "56712930",
      "IssuerName": "j~qaw{ydyslbiv{e{a?caw??lgcqs?el",
      "Nsu": "415858",
      "MerchantCode": "13112148245096",
      "MerchantAddress": "wcjh~qf?gzjjv?sx{fr~a?|nld?{?i?zwjclx|pbq?n???z~o~xl??zso??~uwleqldoc|ubnp",
      "AuthorizationCode": "41101",
      "CardHolder": "obl}oh|q|b?xr?uoiuzjr",
      "TransactionType": "gtfph?bwh?hkd|k??ypva?}?vi?gq",
      "MerchantState": "rc",
      "Date": "6/26/2020",
      "Hour": "3:37 PM",
      "Value": "300",
      "TransactionMode": "dug",
      "CardNumber": null
    },
    "AuthorizationCode": "075551",
    "ProofOfSale": "441836",
    "InitializationVersion": 1593196200000,
    "ConfirmationStatus": 0,
    "EmvResponseData": "956648280",
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "OfflinePaymentType": "OfflineWithoutAttemptOnline"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### MassTransit - MTT

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Description",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 100,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "CreditCard": {
         "InputMode": "ContactlessEmv",
         "BrandId": 1,
         "IssuerId": 401,
         "TruncateCardNumberWhenPrinting": true,
         "ExpirationDate": "12/2020",
         "PanSequenceNumber": 1,
         "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
         "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
         "TrackTwoData": "0123456789012345=012345678901234",
         "AuthenticationMethod": "OnlineAuthentication",
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         }
      },
      "PinPadInformation": {
         "TerminalId": "12345678",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      },
      "MassTransit": {
         "IsDebtRecovery": false,
         "FirstTravelDate": "2018-01-01 04:12"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`MassTransit.IsDebtRecovery`|Booleano|—|Sim|Identifica de a operação é de recuperação de pagamento.|
|`MassTransit.FirstTravelDate`|String|date-time|Sim|Data da primeira viagem|

#### Resposta

```json
{
  "MerchantOrderId": "1593196457169",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2021",
      "BrandId": 1,
      "IssuerId": 401,
      "TruncateCardNumberWhenPrinting": true,
      "PanSequenceNumber": 1,
      "InputMode": "ContactlessEmv",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "B3764 361234 56006^NOME NOME NOME NOME NOME N^0905060640431",
      "TrackTwoData": "1111222233334444=09050606404312376450",
      "EmvData": "",
      "IsFallback": false,
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "fffff9999900522000d6"
      },
      "BrandInformation": {
        "Type": "?ywqhiw",
        "Name": "s{mn{u?lvy",
        "Description": "ovhfsq?l?s?{bfewz"
      },
      "SaveCard": false
    },
    "Amount": 100,
    "ReceivedDate": "2020-06-26T18:34:17Z",
    "CapturedAmount": 100,
    "CapturedDate": "2020-06-26T18:34:17Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 627553",
    "ReturnCode": "000",
    "PaymentId": "014b6fae-e4bb-4ce6-830e-28ff502beeec",
    "Type": "PhysicalCreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/014b6fae-e4bb-4ce6-830e-28ff502beeec"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/014b6fae-e4bb-4ce6-830e-28ff502beeec/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/014b6fae-e4bb-4ce6-830e-28ff502beeec"
      }
    ],
    "PaymentDateTime": "2020-06-26T18:34:17.169Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "42004558",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "jajrxy~z??"
      },
      {
        "Position": "Middle",
        "Message": "t?bp~?hor?"
      },
      {
        "Position": "Bottom",
        "Message": "qtgapip?fj"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "km}}?k??a|pn?vnqdlv?{|krogvnfeerb?olnme}uxog~"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "mukn?wcggd?l?xevoehq??cld{rrcfmfhqfa{uqv?jq?jwkjzz}yp?lke{ynh?"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "xa|{dpxsdcqqh|nmy{le?bd?s?uqgrny?"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "94183614"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "|k|et|vembaqw~wyegjmtu?szb?b?mmgdnhgm?g"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "860163"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "95802805227896"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "fod?do?kqyuettwj{rme}thyxqfzfl}sq"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "18786"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "h}vmlaqzndfg~?hp}xue?|ld|qc?zlu|"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "awmi}m?nljsfm{y{sxz{pdxmq?|grozte??zseg|j??x?ir}b"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "it"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "6/26/2020"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "3:34 PM"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "100"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "a}d"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO"
      }
    ],
    "Receipt": {
      "MerchantName": "km}}?k??a|pn?vnqdlv?{|krogvnfefrb?olnme}uxog~",
      "MerchantCity": "mukn?wcg?fxmhjgc}eyq{gd?jzz}yp?lke{ynh?",
      "InputMethod": "xa|{dpsgtbd?s?uqgrny?",
      "Terminal": "94183614",
      "IssuerName": "|k|et|vembaqw~wyegjmta~?b?mmgdnhgm?g",
      "Nsu": "860163",
      "MerchantCode": "95802805227896",
      "MerchantAddress": "fod?do?kqyuettwj{rme}q??vqky~eqloiapucahpwehrfmr??sjs~?yodnxdkqlhjzkthyxqfzfl}sq",
      "AuthorizationCode": "18786",
      "CardHolder": "h}vmlaqzndfg~?hpb?x|ld|qc?zlu|",
      "TransactionType": "?~ewv?nljsfm{y{sxz{pdxmq?|grozte??zseg|j??x?ir}b",
      "MerchantState": "it",
      "Date": "6/26/2020",
      "Hour": "3:34 PM",
      "Value": "100",
      "TransactionMode": "a}d",
      "CardNumber": null
    },
    "AuthorizationCode": "627553",
    "ProofOfSale": "289216",
    "InitializationVersion": 1593196200000,
    "ConfirmationStatus": 0,
    "EmvResponseData": "016522017",
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "MassTransit": {
      "IsDebtRecovery": false,
      "IsKnownValue": false,
      "FirstTravelDate": "2018-01-01T04:12:00",
      "ApprovedByThreshold": false
    },
    "OfflinePaymentType": "Online"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### MassTransit - KFT

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Description",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 300,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "CreditCard": {
         "InputMode": "ContactlessEmv",
         "BrandId": 1,
         "IssuerId": 401,
         "TruncateCardNumberWhenPrinting": true,
         "ExpirationDate": "12/2020",
         "PanSequenceNumber": 1,
         "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
         "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
         "TrackTwoData": "0123456789012345=012345678901234",
         "AuthenticationMethod": "OnlineAuthentication",
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         }
      },
      "PinPadInformation": {
         "TerminalId": "12345678",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      },
      "MassTransit": {
         "IsDebtRecovery": false,
         "IsKnownValue": true,
         "FirstTravelDate": "2018-01-01 04:12"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`MassTransit.IsDebtRecovery`|Booleano|—|Sim|Identifica de a operação é de recuperação de pagamento.|
|`MassTransit.FirstTravelDate`|String|date-time|Sim|Data da primeira viagem|
|`MassTransit.IsKnownValue`|Booleano|-|Sim|Indica que a operação é de valor conhecido|

#### Resposta

```json
{
  "MerchantOrderId": "1593194474343",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2021",
      "BrandId": 1,
      "IssuerId": 401,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "ContactlessEmv",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "B3764 361234 56006^NOME NOME NOME NOME NOME N^0905060640431",
      "TrackTwoData": "1111222233334444=09050606404312376450",
      "EmvData": "",
      "IsFallback": false,
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "fffff9999900522000d6"
      },
      "BrandInformation": {
        "Type": "y|vtdz?pqw",
        "Name": "ytuaflq}nw",
        "Description": "rbgbjn?glw?s}dur?xhkn?uekk?pw"
      },
      "SaveCard": false
    },
    "Amount": 300,
    "ReceivedDate": "2020-06-26T18:01:14Z",
    "CapturedAmount": 300,
    "CapturedDate": "2020-06-26T18:01:14Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 198585",
    "ReturnCode": "000",
    "PaymentId": "1ba69380-81da-430e-8ed0-7df92f26dbaf",
    "Type": "PhysicalCreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf"
      }
    ],
    "PaymentDateTime": "2020-06-26T18:01:14.343Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "42004558",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "qtkmo|}"
      },
      {
        "Position": "Middle",
        "Message": "?jpmosh?ab"
      },
      {
        "Position": "Bottom",
        "Message": "rs?~xtdrco"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "?zpb{dxp?{?rc"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "?n?pwz~zmv{jotz?j"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "wwixrfxdbllme~ojjyudxhxepaplczjif?i?xj~"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "10082375"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "e|?hi?lqjlqkelmmtb"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "167371"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "08756937855064"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "se{gs}rqxnptxx~mggppql"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "51544"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "|v}ly|z~dtjtd{?ky}sccgozvp?|?g??qv~?"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "dhkok?yeill?supi{}tov?~?}ozfgvzyk~t"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "r?"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "6/26/2020"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "3:01 PM"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "300"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "e?j"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO"
      }
    ],
    "Receipt": {
      "MerchantName": "?zpxp?{?rc",
      "MerchantCity": "?n?pwz~zmjotz?j",
      "InputMethod": "wwixrfxdbllme~ojjy?lysmu?qoeq?uwxepaplczjif?i?xj~",
      "Terminal": "10082375",
      "IssuerName": "e|?hi?lqjlqhdnzelmmtb",
      "Nsu": "167371",
      "MerchantCode": "08756937855064",
      "MerchantAddress": "se{gs}rqxnpt~sq~pfqt{myctc?ggppql",
      "AuthorizationCode": "51544",
      "CardHolder": "|v}ly|z~dtjtd{?ky}sccgozvp?|ofj|tx?sg??qv~?",
      "TransactionType": "dhkok?yeill?supi{}tov?~?}on?tt",
      "MerchantState": "r?",
      "Date": "6/26/2020",
      "Hour": "3:01 PM",
      "Value": "300",
      "TransactionMode": "e?j",
      "CardNumber": null
    },
    "AuthorizationCode": "198585",
    "ProofOfSale": "915916",
    "InitializationVersion": 1593194400000,
    "ConfirmationStatus": 0,
    "EmvResponseData": "147988740",
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "MassTransit": {
      "IsDebtRecovery": false,
      "IsKnownValue": true,
      "FirstTravelDate": "2018-01-01T04:12:00"
    },
    "OfflinePaymentType": "Online"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### MassTransit - AVR

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Description",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 0,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "CreditCard": {
         "InputMode": "ContactlessEmv",
         "BrandId": 1,
         "IssuerId": 401,
         "TruncateCardNumberWhenPrinting": true,
         "ExpirationDate": "12/2020",
         "PanSequenceNumber": 1,
         "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
         "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
         "TrackTwoData": "0123456789012345=012345678901234",
         "AuthenticationMethod": "OnlineAuthentication",
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         }
      },
      "PinPadInformation": {
         "TerminalId": "12345678",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      },
      "MassTransit": {
         "IsDebtRecovery": false,
         "FirstTravelDate": "2018-01-01 04:12"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`MassTransit.IsDebtRecovery`|Booleano|—|Sim|Identifica de a operação é de recuperação de pagamento.|
|`MassTransit.FirstTravelDate`|String|date-time|Sim|Data da primeira viagem|

#### Resposta

```json
{
  "MerchantOrderId": "1593194474343",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2021",
      "BrandId": 1,
      "IssuerId": 401,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "ContactlessEmv",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "B3764 361234 56006^NOME NOME NOME NOME NOME N^0905060640431",
      "TrackTwoData": "1111222233334444=09050606404312376450",
      "EmvData": "",
      "IsFallback": false,
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "fffff9999900522000d6"
      },
      "BrandInformation": {
        "Type": "y|vtdz?pqw",
        "Name": "ytuaflq}nw",
        "Description": "rbgbjn?glw?s}dur?xhkn?uekk?pw"
      },
      "SaveCard": false
    },
    "Amount": 300,
    "ReceivedDate": "2020-06-26T18:01:14Z",
    "CapturedAmount": 300,
    "CapturedDate": "2020-06-26T18:01:14Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 198585",
    "ReturnCode": "000",
    "PaymentId": "1ba69380-81da-430e-8ed0-7df92f26dbaf",
    "Type": "PhysicalCreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf"
      }
    ],
    "PaymentDateTime": "2020-06-26T18:01:14.343Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "42004558",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "qtkmo|}"
      },
      {
        "Position": "Middle",
        "Message": "?jpmosh?ab"
      },
      {
        "Position": "Bottom",
        "Message": "rs?~xtdrco"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "?zpb{dxp?{?rc"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "?n?pwz~zmv{jotz?j"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "wwixrfxdbllme~ojjyudxhxepaplczjif?i?xj~"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "10082375"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "e|?hi?lqjlqkelmmtb"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "167371"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "08756937855064"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "se{gs}rqxnptxx~mggppql"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "51544"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "|v}ly|z~dtjtd{?ky}sccgozvp?|?g??qv~?"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "dhkok?yeill?supi{}tov?~?}ozfgvzyk~t"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "r?"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "6/26/2020"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "3:01 PM"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "300"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "e?j"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO"
      }
    ],
    "Receipt": {
      "MerchantName": "?zpxp?{?rc",
      "MerchantCity": "?n?pwz~zmjotz?j",
      "InputMethod": "wwixrfxdbllme~ojjy?lysmu?qoeq?uwxepaplczjif?i?xj~",
      "Terminal": "10082375",
      "IssuerName": "e|?hi?lqjlqhdnzelmmtb",
      "Nsu": "167371",
      "MerchantCode": "08756937855064",
      "MerchantAddress": "se{gs}rqxnpt~sq~pfqt{myctc?ggppql",
      "AuthorizationCode": "51544",
      "CardHolder": "|v}ly|z~dtjtd{?ky}sccgozvp?|ofj|tx?sg??qv~?",
      "TransactionType": "dhkok?yeill?supi{}tov?~?}on?tt",
      "MerchantState": "r?",
      "Date": "6/26/2020",
      "Hour": "3:01 PM",
      "Value": "300",
      "TransactionMode": "e?j",
      "CardNumber": null
    },
    "AuthorizationCode": "198585",
    "ProofOfSale": "915916",
    "InitializationVersion": 1593194400000,
    "ConfirmationStatus": 0,
    "EmvResponseData": "147988740",
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "MassTransit": {
      "IsDebtRecovery": false,
      "IsKnownValue": true,
      "FirstTravelDate": "2018-01-01T04:12:00"
    },
    "OfflinePaymentType": "Online"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Debt Recovery - MTT/KFT

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "SubordinatedMerchantId": "{Auth_ClientId}",
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Transação API",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 100,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "CreditCard": {
         "CardToken": "{{CardToken}}",
         "ExpirationDate": "12/2020",
         "SecurityCodeStatus": "Collected",
         "SecurityCode": "{{SecurityCode}}",
         "BrandId": 1,
         "IssuerId": 401,
         "InputMode": "Typed",
         "AuthenticationMethod": "NoPassword",
         "TruncateCardNumberWhenPrinting": true,
         "SaveCard": false
      },
      "PinPadInformation": {
         "PhysicalCharacteristics": "PinPadWithChipReaderWithoutSamAndContactless",
         "ReturnDataInfo": "00",
         "SerialNumber": "0820471929",
         "TerminalId": "12345678"
      },
      "MassTransit": {
         "IsDebtRecovery": true,
         "ISKnownValue": false,
         "FirstTravelDate": "2018-01-01 04:12",
         "PaymentId": "53f4b75e-b20e-46e8-bf2e-07db03c17aef"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`MassTransit.IsDebtRecovery`|Booleano|—|Sim|Identifica de a operação é de recuperação de pagamento.|
|`MassTransit.FirstTravelDate`|String|date-time|Sim|Data da primeira viagem|
|`MassTransit.IsKnownValue`|Booleano|-|Sim|Indica que a operação é de valor conhecido|
|`MassTransit.PaymentId`|String|-|Sim|Identificador do pagamento a ser recuperado|

#### Resposta

```json
{
  "MerchantOrderId": "1593194474343",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "CreditCard": {
      "ExpirationDate": "12/2021",
      "BrandId": 1,
      "IssuerId": 401,
      "TruncateCardNumberWhenPrinting": true,
      "InputMode": "ContactlessEmv",
      "AuthenticationMethod": "OnlineAuthentication",
      "TrackOneData": "B3764 361234 56006^NOME NOME NOME NOME NOME N^0905060640431",
      "TrackTwoData": "1111222233334444=09050606404312376450",
      "EmvData": "",
      "IsFallback": false,
      "PinBlock": {
        "EncryptedPinBlock": "2280F6BDFD0C038D",
        "EncryptionType": "Dukpt3Des",
        "KsnIdentification": "fffff9999900522000d6"
      },
      "BrandInformation": {
        "Type": "y|vtdz?pqw",
        "Name": "ytuaflq}nw",
        "Description": "rbgbjn?glw?s}dur?xhkn?uekk?pw"
      },
      "SaveCard": false
    },
    "Amount": 300,
    "ReceivedDate": "2020-06-26T18:01:14Z",
    "CapturedAmount": 300,
    "CapturedDate": "2020-06-26T18:01:14Z",
    "Provider": "Cielo",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "APROVADA 198585",
    "ReturnCode": "000",
    "PaymentId": "1ba69380-81da-430e-8ed0-7df92f26dbaf",
    "Type": "PhysicalCreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf"
      },
      {
        "Method": "PUT",
        "Rel": "confirm",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf/confirmation"
      },
      {
        "Method": "DELETE",
        "Rel": "reverse",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/1ba69380-81da-430e-8ed0-7df92f26dbaf"
      }
    ],
    "PaymentDateTime": "2020-06-26T18:01:14.343Z",
    "ServiceTaxAmount": 0,
    "SoftDescriptor": "Description",
    "ProductId": 1,
    "PinPadInformation": {
      "TerminalId": "42004558",
      "SerialNumber": "6C651996",
      "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
      "ReturnDataInfo": "00"
    },
    "PrintMessage": [
      {
        "Position": "Top",
        "Message": "qtkmo|}"
      },
      {
        "Position": "Middle",
        "Message": "?jpmosh?ab"
      },
      {
        "Position": "Bottom",
        "Message": "rs?~xtdrco"
      }
    ],
    "ReceiptInformation": [
      {
        "Field": "MERCHANT_NAME",
        "Label": "NOME DO ESTABELECIMENTO",
        "Content": "?zpb{dxp?{?rc"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "?n?pwz~zmv{jotz?j"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "wwixrfxdbllme~ojjyudxhxepaplczjif?i?xj~"
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": "10082375"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "e|?hi?lqjlqkelmmtb"
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": "167371"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": "08756937855064"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "se{gs}rqxnptxx~mggppql"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": "51544"
      },
      {
        "Field": "CARD_HOLDER",
        "Label": "NOME DO CLIENTE",
        "Content": "|v}ly|z~dtjtd{?ky}sccgozvp?|?g??qv~?"
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "dhkok?yeill?supi{}tov?~?}ozfgvzyk~t"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "r?"
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "6/26/2020"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "3:01 PM"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "300"
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "e?j"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO"
      }
    ],
    "Receipt": {
      "MerchantName": "?zpxp?{?rc",
      "MerchantCity": "?n?pwz~zmjotz?j",
      "InputMethod": "wwixrfxdbllme~ojjy?lysmu?qoeq?uwxepaplczjif?i?xj~",
      "Terminal": "10082375",
      "IssuerName": "e|?hi?lqjlqhdnzelmmtb",
      "Nsu": "167371",
      "MerchantCode": "08756937855064",
      "MerchantAddress": "se{gs}rqxnpt~sq~pfqt{myctc?ggppql",
      "AuthorizationCode": "51544",
      "CardHolder": "|v}ly|z~dtjtd{?ky}sccgozvp?|ofj|tx?sg??qv~?",
      "TransactionType": "dhkok?yeill?supi{}tov?~?}on?tt",
      "MerchantState": "r?",
      "Date": "6/26/2020",
      "Hour": "3:01 PM",
      "Value": "300",
      "TransactionMode": "e?j",
      "CardNumber": null
    },
    "AuthorizationCode": "198585",
    "ProofOfSale": "915916",
    "InitializationVersion": 1593194400000,
    "ConfirmationStatus": 0,
    "EmvResponseData": "147988740",
    "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
    "MassTransit": {
      "IsDebtRecovery": false,
      "IsKnownValue": true,
      "FirstTravelDate": "2018-01-01T04:12:00"
    },
    "OfflinePaymentType": "Online"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

### Debt Recovery EMV - MTT/KFT

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/</span></aside>

```json
{
   "MerchantOrderId": "1596226820548",
   "Payment": {
      "Type": "PhysicalCreditCard",
      "SoftDescriptor": "Description",
      "PaymentDateTime": "2020-07-31T20:20:20.548Z",
      "Amount": 300,
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "ProductId": 1,
      "CreditCard": {
         "InputMode": "ContactlessEmv",
         "BrandId": 1,
         "IssuerId": 401,
         "TruncateCardNumberWhenPrinting": true,
         "ExpirationDate": "12/2020",
         "PanSequenceNumber": 1,
         "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
         "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
         "TrackTwoData": "0123456789012345=012345678901234",
         "AuthenticationMethod": "OnlineAuthentication",
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         }
      },
      "PinPadInformation": {
         "TerminalId": "12345678",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      },
      "MassTransit": {
         "IsDebtRecovery": true,
         "IsKnownValue": true,
         "FirstTravelDate": "2018-01-01 04:12"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
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
|`CreditCard.EmvData`|String|---|---|Dados da transação EMV<br><br>Obtidos através do comando PP_GoOnChip na BC|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"<br><br>Somente obrigatório nos casos de captura de senha online.|
|`PinBlock.KsnIdentification`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().<br><br>Somente obrigatório nos casos de captura de senha online.|
|`CreditCard.PanSequenceNumber`|Number|---|---|Número sequencial do cartão, utilizado para identificar a conta corrente do cartão adicional. Mandatório para transações com cartões Chip EMV e que possuam PAN Sequence Number (Tag 5F34).|
|`CreditCard.SaveCard`|Booleano|---|---|Identifica se vai salvar/tokenizar o cartão.|
|`CreditCard.IsFallback`|Booleano|---|---|Identifica se é uma transação de fallback.|
|`PinPadInformation.TerminalId`|String|---|Sim|Número Lógico definido no Concentrador Cielo.|
|`PinPadInformation.SerialNumber`|String|---|Sim|Número de Série do Equipamento.|
|`PinPadInformation.PhysicalCharacteristics`|String|---|Sim|Enum: `WithoutPinPad` `PinPadWithoutChipReader` `PinPadWithChipReaderWithoutSamModule` `PinPadWithChipReaderWithSamModule` `NotCertifiedPinPad` `PinPadWithChipReaderWithoutSamAndContactless` `PinPadWithChipReaderWithSamModuleAndContactless` <br><br> Sem PIN-pad = `WithoutPinPad`; <br><br> PIN-pad sem leitor de Chip = `PinpadWithoutChipReader`; <br><br>PIN-pad com leitor de Chip sem módulo SAM = `PinPadWithChipReaderWithoutSamModule`; <br><br> PIN-pad com leitor de Chip com módulo SAM = `PinPadWithChipReaderWithSamModule`; <br><br> PIN-pad não homologado = `NotCertifiedPinPad`; <br><br> PIN-pad com leitor de Chip sem SAM e Cartão Sem Contato = `PinpadWithChipReaderWithoutSamAndContactless`; <br><br> PIN-pad com leitor de Chip com SAM e Cartão Sem Contato = `PinpadWithChipReaderWithSamAndContactless`. <br><br><br> Obs. Caso a aplicação não consiga informar os dados acima, deve obter tais informações através do retorno da função PP_GetInfo() da BC.|
|`PinPadInformation.ReturnDataInfo`|String|---|Sim|Retorno da função PP_GetInfo() da biblioteca compartilhada|
|`MassTransit.FirstTravelDate`|String|date-time|Sim|Data da primeira viagem|
|`MassTransit.IsKnownValue`|Booleano|-|Sim|Indica que a operação é de valor conhecido|
|`MassTransit.PaymentId`|String|-|Sim|Identificador do pagamento a ser recuperado|
|`MassTransit.IsDebtRecovery`|Booleano|—|Sim|Identifica de a operação é de recuperação de pagamento.|

#### Resposta

```json
{
   "MerchantOrderId": "1593196287377",
   "Customer": {
      "Name": "[Guest]"
   },
   "Payment": {
      "Installments": 1,
      "Interest": "ByMerchant",
      "Capture": true,
      "CreditCard": {
         "ExpirationDate": "12/2021",
         "BrandId": 1,
         "IssuerId": 401,
         "TruncateCardNumberWhenPrinting": true,
         "InputMode": "ContactlessEmv",
         "AuthenticationMethod": "OnlineAuthentication",
         "TrackOneData": "B3764 361234 56006^NOME NOME NOME NOME NOME N^0905060640431",
         "TrackTwoData": "1111222233334444=09050606404312376450",
         "EmvData": "",
         "IsFallback": false,
         "PinBlock": {
            "EncryptedPinBlock": "2280F6BDFD0C038D",
            "EncryptionType": "Dukpt3Des",
            "KsnIdentification": "fffff9999900522000d6"
         },
         "BrandInformation": {
            "Type": "c?s?jue?qz",
            "Name": "h?mbs{zxcc",
            "Description": "aleegncacoiqxl?qyc"
         },
         "SaveCard": false
      },
      "Amount": 300,
      "ReceivedDate": "2020-06-26T18:31:27Z",
      "CapturedAmount": 300,
      "CapturedDate": "2020-06-26T18:31:27Z",
      "Provider": "Cielo",
      "Status": 2,
      "IsSplitted": false,
      "ReturnMessage": "APROVADA 382242",
      "ReturnCode": "000",
      "PaymentId": "6a9e8136-3d63-4f60-8a23-394782c485e3",
      "Type": "PhysicalCreditCard",
      "Currency": "BRL",
      "Country": "BRA",
      "Links": [
         {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/physicalSales/6a9e8136-3d63-4f60-8a23-394782c485e3"
         },
         {
            "Method": "PUT",
            "Rel": "confirm",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/6a9e8136-3d63-4f60-8a23-394782c485e3/confirmation"
         },
         {
            "Method": "DELETE",
            "Rel": "reverse",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales/6a9e8136-3d63-4f60-8a23-394782c485e3"
         }
      ],
      "PaymentDateTime": "2020-06-26T18:31:27.377Z",
      "ServiceTaxAmount": 0,
      "SoftDescriptor": "Description",
      "ProductId": 1,
      "PinPadInformation": {
         "TerminalId": "42004558",
         "SerialNumber": "6C651996",
         "PhysicalCharacteristics": "PinPadWithChipReaderWithSamModuleAndContactless",
         "ReturnDataInfo": "00"
      },
      "PrintMessage": [
         {
            "Position": "Top",
            "Message": "f??nzfbgks"
         },
         {
            "Position": "Middle",
            "Message": "s?kn?fcemf"
         },
         {
            "Position": "Bottom",
            "Message": "}zk}zet|?l"
         }
      ],
      "ReceiptInformation": [
         {
            "Field": "MERCHANT_NAME",
            "Label": "NOME DO ESTABELECIMENTO",
            "Content": "gtevvj~a?otlubavsxm"
         },
         {
            "Field": "MERCHANT_CITY",
            "Label": "CIDADE DO ESTABELECIMENTO",
            "Content": "??dors|yk?elu"
         },
         {
            "Field": "INPUT_METHOD",
            "Label": "MODO DE ENTRADA",
            "Content": "?uhtrrrc~pe?rudlt?l}c?|w?phds|v"
         },
         {
            "Field": "TERMINAL",
            "Label": "POS",
            "Content": "54206393"
         },
         {
            "Field": "ISSUER_NAME",
            "Label": "EMISSOR",
            "Content": "qpqm?pf{kpefzfu{"
         },
         {
            "Field": "NSU",
            "Label": "DOC",
            "Content": "729860"
         },
         {
            "Field": "MERCHANT_CODE",
            "Label": "COD.ESTAB.",
            "Content": "03388928143200"
         },
         {
            "Field": "MERCHANT_ADDRESS",
            "Label": "ENDEREÇO DO ESTABELECIMENTO",
            "Content": "hqqdy|fxb?ltdakwm{c?vjj??w?nxwo?nltm"
         },
         {
            "Field": "AUTHORIZATION_CODE",
            "Label": "AUTORIZAÇÃO",
            "Content": "76715"
         },
         {
            "Field": "CARD_HOLDER",
            "Label": "NOME DO CLIENTE",
            "Content": "~zm?wfk|ecbn?~cdb{xyvba?g?mankfa?"
         },
         {
            "Field": "TRANSACTION_TYPE",
            "Label": "TIPO DE TRANSAÇÃO",
            "Content": "?kx|uh?p??cohiakmvgcm??cmucjl"
         },
         {
            "Field": "MERCHANT_STATE",
            "Label": "ESTADO DO ESTABELECIMENTO",
            "Content": "xo"
         },
         {
            "Field": "DATE",
            "Label": "DATA",
            "Content": "6/26/2020"
         },
         {
            "Field": "HOUR",
            "Label": "HORA",
            "Content": "3:31 PM"
         },
         {
            "Field": "VALUE",
            "Label": "VALOR",
            "Content": "300"
         },
         {
            "Field": "TRANSACTION_MODE",
            "Label": "MODO DA TRANSAÇÃO",
            "Content": "prt"
         },
         {
            "Field": "CARD_NUMBER",
            "Label": "CARTÃO"
         }
      ],
      "Receipt": {
         "MerchantName": "gtevvj~a?otlubavsxmhxmfetnpcct?k?m",
         "MerchantCity": "??dors|yk?eluwv{?h",
         "InputMethod": "?uhtrrrc~pe?rudlt?l}c?|w?phds|vyv{nj?wrpe",
         "Terminal": "54206393",
         "IssuerName": "qpqm?pf{kpefzfu??u~ftpssck|o??a|??b",
         "Nsu": "729860",
         "MerchantCode": "03388928143200",
         "MerchantAddress": "hqqdy|fxb?ltdakwm{c?vjj??w?nxwo?nltm|?g?",
         "AuthorizationCode": "76715",
         "CardHolder": "~zm?wfk|ecbn?~cdb{xyvba?g?mankfa??{|~?",
         "TransactionType": "?kx|uh?p??cohiakmvgcm??cmucjlcg{xmyrwvjyecefi?",
         "MerchantState": "xo",
         "Date": "6/26/2020",
         "Hour": "3:31 PM",
         "Value": "300",
         "TransactionMode": "prt",
         "CardNumber": null
      },
      "AuthorizationCode": "382242",
      "ProofOfSale": "876502",
      "InitializationVersion": 1593196200000,
      "ConfirmationStatus": 0,
      "EmvResponseData": "290293329",
      "SubordinatedMerchantId": "b99a463f-88db-442a-b5fa-982187b68f5c",
      "MassTransit": {
         "IsDebtRecovery": true,
         "IsKnownValue": true,
         "FirstTravelDate": "2018-01-01T04:12:00"
      },
      "OfflinePaymentType": "Online"
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|---|---| Número do documento gerado automaticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|
|`Customer.Name`|String|---|---|---|
|`Customer.Identity`|---|---|---|---|
|`Customer.IdentityType`|---|---|---|---|
|`Customer.Email`|---|---|---|---|
|`Customer.Birthday`|---|---|---|---|
|`Address.Street`|String|---|---|---|
|`Address.Number`|String|---|---|---|
|`Address.Complement`|String|---|---||---|
|`Address.ZipCode`|String|---|---|---|
|`Address.City`|String|---|---|---|
|`Address.State`|String|---|---|---|
|`Address.Country`|String|---|---|---|
|`DeliveryAddress.Street`|String|---|---|---|
|`DeliveryAddress.Number`|String|---|---|---|
|`DeliveryAddress.Complement`|String|---|---||---|
|`DeliveryAddress.ZipCode`|String|---|---|---|
|`DeliveryAddress.City`|String|---|---|---|
|`DeliveryAddress.State`|String|---|---|---|
|`DeliveryAddress.Country`|String|---|---|---|
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
|`CreditCard.SaveCard`|---|---|---|---|
|`CreditCard.IsFallback`|---|---|---|---|
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
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|
|`RecurrentPayment.RecurrentPaymentId`|---|---|---|---|
|`RecurrentPayment.ReasonCode`|---|---|---|---|
|`RecurrentPayment.ReasonMessage`|---|---|---|---|
|`RecurrentPayment.NextRecurrency`|---|---|---|---|
|`RecurrentPayment.EndDate`|---|---|---|---|
|`RecurrentPayment.Interval`|---|---|---|---|
|`SplitPayments.SubordinateMerchantId`|---|---|---|---|
|`SplitPayments.Amount`|---|---|---|---|
|`SplitPayments.Fares.Mdr`|---|---|---|---|
|`SplitPayments.Fares.Fee`|---|---|---|---|
|`SplitErrors.Code`|---|---|---|---|
|`SplitErrors.Message`|---|---|---|---|

## Desfazimento

Em casos de timeout ou retorno com erro que não deixe claro a negativa da transação deve-se solicitar o desfazimento do pagamento. Outras situações como por exemplo a não impressão do comprovante no POS também podem gerar a necessidade desta operação.

|**URL**|https://apisandbox.cieloecommerce.cielo.com.br/1/physicalSales|
|**Scope:**|PhysicalCieloTransactional|

**Simular respostas**:

Para simular alguma resposta especifica utilize o campo Amount, onde de acordo com o valor dos centavos informado nesse campo é possivel receber uma resposta conforme descrito na tabela abaixo:

|Amount (valor dos centados)|Retorno simulado do Desfazimento|Exemplo de valor simulado|
|---|---|---|
|20|Aprovado|5020 = R$50,20|
|21|Negado|20021 = R$200,21|
|22|Timeout|3522 = R$35,22|
|29|Erro|1029 = R$10,29|

### Desfazimento por PaymentId

Quando o pagamento retorna ele devolve o PaymentId em seu corpo e este é o melhor identificador do pagamento e pode ser utilizado para solicitar seu desfazimento.

#### Cartao digitado.

O pagamento retornou com sucesso e pode ser desfeito.

Deve-se solicitar o desfazimento através do PaymentId recebido no retorno do pagamento. 

##### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/undo</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

##### Resposta

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
|`ReasonCode`|Integer(int16)|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

#### Cartao com chip

O pagamento retornou com sucesso e pode ser desfeito.

Deve-se solicitar o desfazimento através do PaymentId recebido no retorno do pagamento. 

##### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/undo</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

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

##### Resposta

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
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado<br <br><br>13 = Abortado|
|`ReasonCode`|Integer(int16)|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Desfazimento por OrderId

Em casos onde não foi possível receber a resposta do pagamento e portanto não temos o PaymentId. Nesta situação existe a possibilidade de solicitar o desfazimento pelo número identificado no pagamento como MerchantOrderId.

#### Cartão digitado

Quando o pagamento não retornar, o mesmo deve ser desfeito.

Para solicitar o desfazimento é necessário informar o MerchantOrderId enviado no pagamento.

##### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}/undo</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|—|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos|

##### Resposta

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
|`ReasonCode`|Integer(int16)|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

#### Cartão com chip

Quando o pagamento não retornar, o mesmo deve ser desfeito.

Para solicitar o desfazimento é necessário informar o MerchantOrderId enviado no pagamento.

##### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}/undo</span></aside>

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|String|—|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal. Aceita apenas valores numéricos de 1 a 15 dígitos.|

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

##### Resposta

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
|`ReasonCode`|Integer(int16)|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

## Confirmação

Quando o pagamento retornar sucesso e pode ser confirmado.

Esta operação requer o PaymentId recebido no retorno do pagamento, além dos dados EmvData se o pagamento foi realizado atráves de Chip.

A confirmação somente é necessária para pagamentos feitos através do POS.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

**Simular Respostas:**

Para simular alguma resposta especifica utilize o campo Amount, onde de acordo com o valor dos centavos informado nesse campo é possivel receber uma resposta conforme descrito na tabela abaixo:

|Amount(valor dos centados)|Retorno simulado da Confirmação|Exemplo de valor simulado|
|---|---|---|
|20|Aprovado|5020 = R$50,20|
|21|Negado|20021 = R$200,21|
|22|Timeout|3522 = R$35,22|
|29|Erro|1029 = R$10,29|

Também é possivel simular respostas de uma confirmação de autorização negada. Para deixar claro esse fluxo segue os passos abaixo:
1 - Cliente faz uma requisição de autorização e recebe a resposta de autorização negada;
2 - Cliente faz uma requisição de confirmação para essa autorização negada e recebe a resposta simulada.

Para simular respostas de uma confirmação de autorização negada, segue a tabela abaixo:

|Amount(valor dos centados)|Retorno simulado da Confirmação|Exemplo de valor simulado|
|---|---|---|
|30|Aprovado|5030 = R$50,30|
|31|Negado|20031 = R$200,31|
|32|Timeout|3532 = R$35,32|
|39|Erro|1039 = R$10,39|

### Cartao Digitado

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/confirmation</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

```json
{}
```

#### Resposta

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
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Cartao com chip

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/confirmation</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

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

#### Resposta

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
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

## Consultas

### Consulta de Pagamento

### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/physicalSales/{PaymentId}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String|uuid|—|Sim|Código do Pagamento|

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
      }
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
        "Content": "Estabelecimento"
      },
      {
        "Field": "MERCHANT_ADDRESS",
        "Label": "ENDEREÇO DO ESTABELECIMENTO",
        "Content": "Rua Sem Saida, 0"
      },
      {
        "Field": "MERCHANT_CITY",
        "Label": "CIDADE DO ESTABELECIMENTO",
        "Content": "Cidade"
      },
      {
        "Field": "MERCHANT_STATE",
        "Label": "ESTADO DO ESTABELECIMENTO",
        "Content": "WA"
      },
      {
        "Field": "MERCHANT_CODE",
        "Label": "COD.ESTAB.",
        "Content": 1234567890123456
      },
      {
        "Field": "TERMINAL",
        "Label": "POS",
        "Content": 12345678
      },
      {
        "Field": "NSU",
        "Label": "DOC",
        "Content": 123456
      },
      {
        "Field": "DATE",
        "Label": "DATA",
        "Content": "01/01/20"
      },
      {
        "Field": "HOUR",
        "Label": "HORA",
        "Content": "01:01"
      },
      {
        "Field": "ISSUER_NAME",
        "Label": "EMISSOR",
        "Content": "NOME DO EMISSOR"
      },
      {
        "Field": "CARD_NUMBER",
        "Label": "CARTÃO",
        "Content": 5432123454321234
      },
      {
        "Field": "TRANSACTION_TYPE",
        "Label": "TIPO DE TRANSAÇÃO",
        "Content": "VENDA A CREDITO"
      },
      {
        "Field": "AUTHORIZATION_CODE",
        "Label": "AUTORIZAÇÃO",
        "Content": 123456
      },
      {
        "Field": "TRANSACTION_MODE",
        "Label": "MODO DA TRANSAÇÃO",
        "Content": "ONL"
      },
      {
        "Field": "INPUT_METHOD",
        "Label": "MODO DE ENTRADA",
        "Content": "X"
      },
      {
        "Field": "VALUE",
        "Label": "VALOR",
        "Content": "1,23"
      },
      {
        "Field": "SOFT_DESCRIPTOR",
        "Label": "SOFT DESCRIPTOR",
        "Content": "Simulado"
      }
    ],
    "Receipt": {
      "MerchantName": "Estabelecimento",
      "MerchantAddress": "Rua Sem Saida, 0",
      "MerchantCity": "Cidade",
      "MerchantState": "WA",
      "MerchantCode": 1234567890123456,
      "Terminal": 12345678,
      "Nsu": 123456,
      "Date": "01/01/20",
      "Hour": "01:01",
      "IssuerName": "NOME DO EMISSOR",
      "CardNumber": 5432123454321234,
      "TransactionType": "VENDA A CREDITO",
      "AuthorizationCode": 123456,
      "TransactionMode": "ONL",
      "InputMethod": "X",
      "Value": "1,23",
      "SoftDescriptor": "Simulado"
    }
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.IssuerId`|---|---|---|---|
|`CreditCard.TruncateCardNumberWhenPrinting`|---|---|---|---|
|`CreditCard.InputMode`|---|---|---|---|
|`CreditCard.AuthenticationMethod`|---|---|---|---|
|`CreditCard.EmvData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|---|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|---|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|---|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.Currency`|---|---|---|---|
|`Payment.Country`|---|---|---|---|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.Value`|---|---|---|---|
|`Receipt.SoftDescriptor`|---|---|---|---|

### Cancelamento

Consulta um cancelamento

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/{VoidId}</span></aside>

#### Resposta

```json
{
  "VoidId": "a4bc7892-b455-4cd1-b902-c791802cd72b",
  "CancellationStatus": 1,
  "Status": 10
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`VoidId`|---|---|---|---|
|`CancellationStatus`|---|---|---|---|
|`Status`|---|---|---|---|

# Cancelamento

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

**Simular respostas:**

Para simular alguma resposta especifica utilize o campo Amount, onde de acordo com o valor dos centavos informado nesse campo é possivel receber uma resposta conforme descrito na tabela abaixo:

|Amount (valor dos centados)|Retorno simulado do Cancelamento|Exemplo de valor simulado|
|40|Aprovado|5040 = R$50,40|
|41|Negado|20041 = R$200,41|
|42|Timeout|3542 = R$35,42|
|49|Erro|1049 = R$10,49|

## Cancelamento de Pagamento

### Cartao Digitado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

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
|`Card.InputMode`|---|---|---|Enum: "Typed", "MagStripe", "Emv", "ContactlessMagStripe", "ContactlessEmv"|
|`Card.CardNumber`|String|---|---|Número do cartão <br><br>Requerido quando a transação for digitada.|
|`Card.ExpirationDate`|String|---|Sim|Data de expiração do cartão.|

#### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "InitializationVersion": 1558708320029,
  "PrintMessage": [
    {
      "Position": "Top",
      "Message": "Transação autorizada"
    },
    {
      "Position": "Middle",
      "Message": "Informação adicional"
    },
    {
      "Position": "Bottom",
      "Message": "Obrigado e volte sempre!"
    }
  ],
  "Receipt": {
    "MerchantName": "Estabelecimento",
    "MerchantAddress": "Rua Sem Saida, 0",
    "MerchantCity": "Cidade",
    "MerchantState": "WA",
    "MerchantCode": 549798965249,
    "Terminal": 12345678,
    "Nsu": 123456,
    "Date": "01/01/20",
    "Hour": 720,
    "IssuerName": "VISA  PROD-I",
    "CardNumber": 1111222233334444,
    "TransactionType": "CANCELAMENTO DE TRANSACAO",
    "AuthorizationCode": 123456,
    "TransactionMode": "ONL",
    "InputMethod": "C",
    "CancelValue": "3,00",
    "OriginalTransactonData": "DADOS DO PAGAMENTO ORIGNAL",
    "OriginalTransactonType": "VENDA A CREDITO",
    "OriginalTransactonNsu": 5349,
    "OriginalTransactonAuthCode": 543210,
    "OriginalTransactionDate": "01/01/20",
    "OriginalTransactionHour": 720,
    "OrignalTransactionValue": "3,00",
    "OrignalTransactionCardHolder": "NOME NOME NOME NOME NOME N",
    "OriginalTransactionMode": "ONL",
    "OriginalInputMethod": "C"
  },  
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
|`InitializationVersion`|Integer int16|---|---|Número de versão dos parametros baixados na inicialização do equipamento.|
|`PrintMessage.Position`|String|---|---|Default: "Top"<br><br>Enum: "Top", "Middle", "Bottom"<br><br>Posição da mensagem no comprovante:<br><br>Top - Início do comprovante, antes do código do estabelecimento<br><br>Middle - Meio do comprovante, após a descrição dos valores<br><br>Bottom - Final do comprovante|
|`PrintMessage.Message`|String|---|---|Indica a mensagem que deve ser impressa no comprovante de acordo com a posição indicada no campo Position|
|`Status`|Integerint16|---|---|Status da transação.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Negado<br><br>3 = Confirmado<br><br>4 = Desfeito|
|`ReasonCode`|Integer int16|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.CancelValue`|---|---|---|---|
|`Receipt.OriginalTransactonData`|---|---|---|---|
|`Receipt.OriginalTransactonType`|---|---|---|---|
|`Receipt.OriginalTransactonNsu`|---|---|---|---|
|`Receipt.OriginalTransactonAuthCode`|---|---|---|---|
|`Receipt.OriginalTransactionDate`|---|---|---|---|
|`Receipt.OriginalTransactionHour`|---|---|---|---|
|`Receipt.OrignalTransactionValue`|---|---|---|---|
|`Receipt.OrignalTransactionCardHolder`|---|---|---|---|
|`Receipt.OriginalTransactionMode`|---|---|---|---|
|`Receipt.OriginalInputMethod`|---|---|---|---|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Cartão digitado com cartão criptografado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

```json
{
  "MerchantVoidId": 2019042204,
  "MerchantVoidDate": "2019-04-15T12:00:00Z",
  "Card": {
    "InputMode": "Typed",
    "CardNumber": 1234567812345678,
    "ExpirationDate": "12/2020"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal|
|`MerchantVoidDate`|String|---|Sim|Data do cancelamento.|
|`Card.InputMode`|String|---|Sim|Enum: "Typed", "MagStripe", "Emv", "ContactlessMagStripe", "ContactlessEmv"|
|`Card.CardNumber`|String|---|Sim|Número do cartão<br><br>Requerido quando a transação for digitada.|
|`Card.EncryptedCardData.EncryptionType`|String|---|Sim|Tipo de encriptação utilizada<br><br>Enum:<br><br>"DukptDes" = 1,<br><br>"MasterKey" = 2,<br><br>"Dukpt3Des" = 3|
|`Card.EncryptedCardData.CardNumberKSN`|String|---|---|Identificador KSN da criptografia do número do cartão
|`Card.EncryptedCardData.IsDataInTLVFormat`|Bool|---|Não|Identifica se os dados criptografados estão no formato TLV (tag / length / value).|
|`Card.EncryptedCardData.InitializationVector`|String|---|Sim|Vetor de inicialização da encryptação|
|`Card.ExpirationDate|String`|---|Sim|Data de expiração do cartão.|

#### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "InitializationVersion": 1558708320029,
  "PrintMessage": [
    {
      "Position": "Top",
      "Message": "Transação autorizada"
    },
    {
      "Position": "Middle",
      "Message": "Informação adicional"
    },
    {
      "Position": "Bottom",
      "Message": "Obrigado e volte sempre!"
    }
  ],
  "Receipt": {
    "MerchantName": "Estabelecimento",
    "MerchantAddress": "Rua Sem Saida, 0",
    "MerchantCity": "Cidade",
    "MerchantState": "WA",
    "MerchantCode": 549798965249,
    "Terminal": 12345678,
    "Nsu": 123456,
    "Date": "01/01/20",
    "Hour": 720,
    "IssuerName": "VISA  PROD-I",
    "CardNumber": 1111222233334444,
    "TransactionType": "CANCELAMENTO DE TRANSACAO",
    "AuthorizationCode": 123456,
    "TransactionMode": "ONL",
    "InputMethod": "C",
    "CancelValue": "3,00",
    "OriginalTransactonData": "DADOS DO PAGAMENTO ORIGNAL",
    "OriginalTransactonType": "VENDA A CREDITO",
    "OriginalTransactonNsu": 5349,
    "OriginalTransactonAuthCode": 543210,
    "OriginalTransactionDate": "01/01/20",
    "OriginalTransactionHour": 720,
    "OrignalTransactionValue": "3,00",
    "OrignalTransactionCardHolder": "NOME NOME NOME NOME NOME N",
    "OriginalTransactionMode": "ONL",
    "OriginalInputMethod": "C"
  },
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
|`InitializationVersion`|Integer int16|---|---|Número de versão dos parametros baixados na inicialização do equipamento.|
|`PrintMessage.Position`|String|---|---|Default: "Top"<br><br>Enum: "Top", "Middle", "Bottom"<br><br>Posição da mensagem no comprovante:<br><br>Top - Início do comprovante, antes do código do estabelecimento<br><br>Middle - Meio do comprovante, após a descrição dos valores<br><br>Bottom - Final do comprovante|
|`PrintMessage.Message`|String|---|---|Indica a mensagem que deve ser impressa no comprovante de acordo com a posição indicada no campo Position|
|`Status`|Integerint16|---|---|Status da transação.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Negado<br><br>3 = Confirmado<br><br>4 = Desfeito|
|`ReasonCode`|Integer int16|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.CancelValue`|---|---|---|---|
|`Receipt.OriginalTransactonData`|---|---|---|---|
|`Receipt.OriginalTransactonType`|---|---|---|---|
|`Receipt.OriginalTransactonNsu`|---|---|---|---|
|`Receipt.OriginalTransactonAuthCode`|---|---|---|---|
|`Receipt.OriginalTransactionDate`|---|---|---|---|
|`Receipt.OriginalTransactionHour`|---|---|---|---|
|`Receipt.OrignalTransactionValue`|---|---|---|---|
|`Receipt.OrignalTransactionCardHolder`|---|---|---|---|
|`Receipt.OriginalTransactionMode`|---|---|---|---|
|`Receipt.OriginalInputMethod`|---|---|---|---|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Cartão por tarja

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

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
|`Card.InputMode`|String|---|Sim|Enum: "Typed", "MagStripe", "Emv", "ContactlessMagStripe", "ContactlessEmv"|
|`Card.TrackOneData`|String|---|Sim|Dados da trilha 1<br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.TrackTwoData`|String|---|Sim|Dados da trilha 2<br><br>Dado obtido através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.AuthenticationMethod`|String|---|Não|Enum: "NoPassword", "OnlineAuthentication", "OfflineAuthentication"<br><br>Método de autenticação<br><br>1 - Sem senha “NoPassword” <br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|

#### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "InitializationVersion": 1558708320029,
  "PrintMessage": [
    {
      "Position": "Top",
      "Message": "Transação autorizada"
    },
    {
      "Position": "Middle",
      "Message": "Informação adicional"
    },
    {
      "Position": "Bottom",
      "Message": "Obrigado e volte sempre!"
    }
  ],
  "Receipt": {
    "MerchantName": "Estabelecimento",
    "MerchantAddress": "Rua Sem Saida, 0",
    "MerchantCity": "Cidade",
    "MerchantState": "WA",
    "MerchantCode": 549798965249,
    "Terminal": 12345678,
    "Nsu": 123456,
    "Date": "01/01/20",
    "Hour": 720,
    "IssuerName": "VISA  PROD-I",
    "CardNumber": 1111222233334444,
    "TransactionType": "CANCELAMENTO DE TRANSACAO",
    "AuthorizationCode": 123456,
    "TransactionMode": "ONL",
    "InputMethod": "C",
    "CancelValue": "3,00",
    "OriginalTransactonData": "DADOS DO PAGAMENTO ORIGNAL",
    "OriginalTransactonType": "VENDA A CREDITO",
    "OriginalTransactonNsu": 5349,
    "OriginalTransactonAuthCode": 543210,
    "OriginalTransactionDate": "01/01/20",
    "OriginalTransactionHour": 720,
    "OrignalTransactionValue": "3,00",
    "OrignalTransactionCardHolder": "NOME NOME NOME NOME NOME N",
    "OriginalTransactionMode": "ONL",
    "OriginalInputMethod": "C"
  },
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
|`InitializationVersion`|Integer int16|---|---|Número de versão dos parametros baixados na inicialização do equipamento.|
|`PrintMessage.Position`|String|---|---|Default: "Top"<br><br>Enum: "Top", "Middle", "Bottom"<br><br>Posição da mensagem no comprovante:<br><br>Top - Início do comprovante, antes do código do estabelecimento<br><br>Middle - Meio do comprovante, após a descrição dos valores<br><br>Bottom - Final do comprovante|
|`PrintMessage.Message`|String|---|---|Indica a mensagem que deve ser impressa no comprovante de acordo com a posição indicada no campo Position|
|`Status`|Integerint16|---|---|Status da transação.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Negado<br><br>3 = Confirmado<br><br>4 = Desfeito|
|`ReasonCode`|Integer int16|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.CancelValue`|---|---|---|---|
|`Receipt.OriginalTransactonData`|---|---|---|---|
|`Receipt.OriginalTransactonType`|---|---|---|---|
|`Receipt.OriginalTransactonNsu`|---|---|---|---|
|`Receipt.OriginalTransactonAuthCode`|---|---|---|---|
|`Receipt.OriginalTransactionDate`|---|---|---|---|
|`Receipt.OriginalTransactionHour`|---|---|---|---|
|`Receipt.OrignalTransactionValue`|---|---|---|---|
|`Receipt.OrignalTransactionCardHolder`|---|---|---|---|
|`Receipt.OriginalTransactionMode`|---|---|---|---|
|`Receipt.OriginalInputMethod`|---|---|---|---|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Cartão por tarja com cartão criptografado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

```json
{
   "MerchantVoidId": 2019042204,
   "MerchantVoidDate": "2019-04-15T12:00:00Z",
   "Card": {
      "InputMode": "MagStripe",
      "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
      "TrackTwoData": "0123456789012345=012345678901234",
      "EncryptedCardData": {
         "EncryptionType": "DUKPT3DES",
         "TrackOneDataKSN": "KSNforTrackOneData",
         "TrackTwoDataKSN": "KSNforTrackTwoData"
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal|
|`MerchantVoidDate`|String|---|Sim|Data do cancelamento.|
|`Card.InputMode`|String|---|Sim|Enum: "Typed", "MagStripe", "Emv", "ContactlessMagStripe", "ContactlessEmv"|
|`Card.TrackOneData`|String|---|---|Dados da trilha 1 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.TrackTwoData`|String|---|---|Dados da trilha 2 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.EncryptedCardData.EncryptionType`|String|---|Sim|Tipo de encriptação utilizada<br><br>Enum:<br><br>"DukptDes" = 1,<br><br>"MasterKey" = 2 <br<br>"Dukpt3Des" = 3,<br><br>"Dukpt3DesCBC" = 4|
|`Card.EncryptedCardData.TrackOneDataKSN`|String|---|---|Identificador KSN da criptografia da trilha 1 do cartão|
|`Card.EncryptedCardData.TrackTwoDataKSN`|String|---|---|Identificador KSN da criptografia da trilha 2 do cartão|
|`Card.EncryptedCardData.IsDataInTLVFormat`|Booleano|---|Não Identifica se os dados criptografados estão no formato TLV (tag / length / value).|
|`Card.EncryptedCardData.InitializationVector`|String|---|Sim|Vetor de inicialização da encryptação|
|`Card.AuthenticationMethod`|String|---|Sim|Enum: "NoPassword", , "OnlineAuthentication", "OfflineAuthentication"<br><br>Método de autenticação<br><br>1 - Sem senha = “NoPassword”;<br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|

#### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "InitializationVersion": 1558708320029,
  "PrintMessage": [
    {
      "Position": "Top",
      "Message": "Transação autorizada"
    },
    {
      "Position": "Middle",
      "Message": "Informação adicional"
    },
    {
      "Position": "Bottom",
      "Message": "Obrigado e volte sempre!"
    }
  ],
  "Receipt": {
    "MerchantName": "Estabelecimento",
    "MerchantAddress": "Rua Sem Saida, 0",
    "MerchantCity": "Cidade",
    "MerchantState": "WA",
    "MerchantCode": 549798965249,
    "Terminal": 12345678,
    "Nsu": 123456,
    "Date": "01/01/20",
    "Hour": 720,
    "IssuerName": "VISA  PROD-I",
    "CardNumber": 1111222233334444,
    "TransactionType": "CANCELAMENTO DE TRANSACAO",
    "AuthorizationCode": 123456,
    "TransactionMode": "ONL",
    "InputMethod": "C",
    "CancelValue": "3,00",
    "OriginalTransactonData": "DADOS DO PAGAMENTO ORIGNAL",
    "OriginalTransactonType": "VENDA A CREDITO",
    "OriginalTransactonNsu": 5349,
    "OriginalTransactonAuthCode": 543210,
    "OriginalTransactionDate": "01/01/20",
    "OriginalTransactionHour": 720,
    "OrignalTransactionValue": "3,00",
    "OrignalTransactionCardHolder": "NOME NOME NOME NOME NOME N",
    "OriginalTransactionMode": "ONL",
    "OriginalInputMethod": "C"
  },
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
|`InitializationVersion`|Integer int16|---|---|Número de versão dos parametros baixados na inicialização do equipamento.|
|`PrintMessage.Position`|String|---|---|Default: "Top"<br><br>Enum: "Top", "Middle", "Bottom"<br><br>Posição da mensagem no comprovante:<br><br>Top - Início do comprovante, antes do código do estabelecimento<br><br>Middle - Meio do comprovante, após a descrição dos valores<br><br>Bottom - Final do comprovante|
|`PrintMessage.Message`|String|---|---|Indica a mensagem que deve ser impressa no comprovante de acordo com a posição indicada no campo Position|
|`Status`|Integerint16|---|---|Status da transação.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Negado<br><br>3 = Confirmado<br><br>4 = Desfeito|
|`ReasonCode`|Integer int16|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.CancelValue`|---|---|---|---|
|`Receipt.OriginalTransactonData`|---|---|---|---|
|`Receipt.OriginalTransactonType`|---|---|---|---|
|`Receipt.OriginalTransactonNsu`|---|---|---|---|
|`Receipt.OriginalTransactonAuthCode`|---|---|---|---|
|`Receipt.OriginalTransactionDate`|---|---|---|---|
|`Receipt.OriginalTransactionHour`|---|---|---|---|
|`Receipt.OrignalTransactionValue`|---|---|---|---|
|`Receipt.OrignalTransactionCardHolder`|---|---|---|---|
|`Receipt.OriginalTransactionMode`|---|---|---|---|
|`Receipt.OriginalInputMethod`|---|---|---|---|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Cartão por chip

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

```json
{
  "MerchantVoidId": 2019042204,
  "MerchantVoidDate": "2019-04-15T12:00:00Z",
  "Card": {
    "InputMode": "MagStripe",
    "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
    "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
    "TrackTwoData": "0123456789012345=012345678901234"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal|
|`MerchantVoidDate`|String|---|Sim|Data do cancelamento.|
|`Card.InputMode`|String|---|Sim|Enum: "Typed", "MagStripe", "Emv", "ContactlessMagStripe", "ContactlessEmv"|
|`Card.TrackOneData`|String|---|---|Dados da trilha 1 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.TrackTwoData`|String|---|---|Dados da trilha 2 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.EmvData`|String|---|---|Dados de cancelamento EMV|
|`Card.AuthenticationMethod`|String|---|Sim|Enum: "NoPassword", , "OnlineAuthentication", "OfflineAuthentication"<br><br>Método de autenticação<br><br>1 - Sem senha = “NoPassword”;<br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`Card.EncryptedCardData.EncryptionType`|String|---|Sim|Tipo de encriptação utilizada<br><br>Enum:<br><br>"DukptDes" = 1,<br><br>"MasterKey" = 2 <br<br>"Dukpt3Des" = 3,<br><br>"Dukpt3DesCBC" = 4|
|`PinBlock.EmvData`|String|—|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|

#### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "InitializationVersion": 1558708320029,
  "PrintMessage": [
    {
      "Position": "Top",
      "Message": "Transação autorizada"
    },
    {
      "Position": "Middle",
      "Message": "Informação adicional"
    },
    {
      "Position": "Bottom",
      "Message": "Obrigado e volte sempre!"
    }
  ],
  "Receipt": {
    "MerchantName": "Estabelecimento",
    "MerchantAddress": "Rua Sem Saida, 0",
    "MerchantCity": "Cidade",
    "MerchantState": "WA",
    "MerchantCode": 549798965249,
    "Terminal": 12345678,
    "Nsu": 123456,
    "Date": "01/01/20",
    "Hour": 720,
    "IssuerName": "VISA  PROD-I",
    "CardNumber": 1111222233334444,
    "TransactionType": "CANCELAMENTO DE TRANSACAO",
    "AuthorizationCode": 123456,
    "TransactionMode": "ONL",
    "InputMethod": "C",
    "CancelValue": "3,00",
    "OriginalTransactonData": "DADOS DO PAGAMENTO ORIGNAL",
    "OriginalTransactonType": "VENDA A CREDITO",
    "OriginalTransactonNsu": 5349,
    "OriginalTransactonAuthCode": 543210,
    "OriginalTransactionDate": "01/01/20",
    "OriginalTransactionHour": 720,
    "OrignalTransactionValue": "3,00",
    "OrignalTransactionCardHolder": "NOME NOME NOME NOME NOME N",
    "OriginalTransactionMode": "ONL",
    "OriginalInputMethod": "C"
  },
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
|`InitializationVersion`|Integer int16|---|---|Número de versão dos parametros baixados na inicialização do equipamento.|
|`PrintMessage.Position`|String|---|---|Default: "Top"<br><br>Enum: "Top", "Middle", "Bottom"<br><br>Posição da mensagem no comprovante:<br><br>Top - Início do comprovante, antes do código do estabelecimento<br><br>Middle - Meio do comprovante, após a descrição dos valores<br><br>Bottom - Final do comprovante|
|`PrintMessage.Message`|String|---|---|Indica a mensagem que deve ser impressa no comprovante de acordo com a posição indicada no campo Position|
|`Status`|Integerint16|---|---|Status da transação.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Negado<br><br>3 = Confirmado<br><br>4 = Desfeito|
|`ReasonCode`|Integer int16|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.CancelValue`|---|---|---|---|
|`Receipt.OriginalTransactonData`|---|---|---|---|
|`Receipt.OriginalTransactonType`|---|---|---|---|
|`Receipt.OriginalTransactonNsu`|---|---|---|---|
|`Receipt.OriginalTransactonAuthCode`|---|---|---|---|
|`Receipt.OriginalTransactionDate`|---|---|---|---|
|`Receipt.OriginalTransactionHour`|---|---|---|---|
|`Receipt.OrignalTransactionValue`|---|---|---|---|
|`Receipt.OrignalTransactionCardHolder`|---|---|---|---|
|`Receipt.OriginalTransactionMode`|---|---|---|---|
|`Receipt.OriginalInputMethod`|---|---|---|---|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

### Cartão por chip com cartão criptografado

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String uuid|---|Sim|Código do Pagamento|

```json
{
  "MerchantVoidId": 2019042204,
  "MerchantVoidDate": "2019-04-15T12:00:00Z",
  "Card": {
    "InputMode": "MagStripe",
    "EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",
    "TrackOneData": "A1234567890123456^FULANO OLIVEIRA SA ^12345678901234567890123",
    "TrackTwoData": "0123456789012345=012345678901234"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 acada transação realizada no terminal|
|`MerchantVoidDate`|String|---|Sim|Data do cancelamento.|
|`Card.InputMode`|String|---|Sim|Enum: "Typed", "MagStripe", "Emv", "ContactlessMagStripe", "ContactlessEmv"|
|`Card.EmvData`|String|---|---|Dados de cancelamento EMV|
|`Card.TrackTwoData`|String|---|---|Dados da trilha 2 <br><br>Obtidos através do comando PP_GetCard na BC no momento da captura da transação|
|`Card.EncryptedCardData.EncryptionType`|String|---|Sim|Tipo de encriptação utilizada<br><br>Enum:<br><br>"DukptDes" = 1,<br><br>"MasterKey" = 2 <br<br>"Dukpt3Des" = 3 <br<br>"Dukpt3DesCBC" = 4|
|`Card.EncryptedCardData.TrackTwoDataKSN`|String|---|---|Identificador KSN da criptografia da trilha 2 do cartão|
|`Card.EncryptedCardData.IsDataInTLVFormat`|Bool|---|Não|Identifica se os dados criptografados estão no formato TLV (tag / length / value).|
|`Card.EncryptedCardData.InitializationVector`|String|---|Sim|Vetor de inicialização da encryptação|
|`Card.AuthenticationMethod`|String|---|Sim|Enum: "NoPassword", "OnlineAuthentication", "OfflineAuthentication"<br><br>Método de autenticação<br><br>1 - Sem senha = “NoPassword”;<br><br>2 - Senha online = “Online Authentication”;<br><br>3 - Senha off-line = “Offline Authentication”.|
|`PinBlock.EncryptedPinBlock`|String|---|Sim|PINBlock Criptografado<br><br>- Para transações EMV, esse campo é obtido através do retorno da função PP_GoOnChip(), mais especificamente das posições 007 até a posição 022;<br><br>- Para transações digitadas e com tarja magnética, verificar as posições 001 até 016 do retorno da função PP_GetPin().|
|`PinBlock.EncryptionType`|String|---|Sim|Tipo de Criptografia<br><br>Enum:<br><br>"DukptDes"<br><br>"Dukpt3Des"<br><br>"MasterKey"|
|`PinBlock.EmvData`|String|---|Sim|Identificação do KSN<br><br>- Para transações EMV esse campo é obtido através do retorno da função PP_GoOnChip() nas posições 023 até 042;<br><br>-Para transações digitadas e com tarja magnética, verificar as posições 017 até 036 do retorno da função PP_GetPin().|

#### Resposta

```json
{
  "VoidId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",
  "InitializationVersion": 1558708320029,
  "PrintMessage": [
    {
      "Position": "Top",
      "Message": "Transação autorizada"
    },
    {
      "Position": "Middle",
      "Message": "Informação adicional"
    },
    {
      "Position": "Bottom",
      "Message": "Obrigado e volte sempre!"
    }
  ],
  "Receipt": {
    "MerchantName": "Estabelecimento",
    "MerchantAddress": "Rua Sem Saida, 0",
    "MerchantCity": "Cidade",
    "MerchantState": "WA",
    "MerchantCode": 549798965249,
    "Terminal": 12345678,
    "Nsu": 123456,
    "Date": "01/01/20",
    "Hour": 720,
    "IssuerName": "VISA  PROD-I",
    "CardNumber": 1111222233334444,
    "TransactionType": "CANCELAMENTO DE TRANSACAO",
    "AuthorizationCode": 123456,
    "TransactionMode": "ONL",
    "InputMethod": "C",
    "CancelValue": "3,00",
    "OriginalTransactonData": "DADOS DO PAGAMENTO ORIGNAL",
    "OriginalTransactonType": "VENDA A CREDITO",
    "OriginalTransactonNsu": 5349,
    "OriginalTransactonAuthCode": 543210,
    "OriginalTransactionDate": "01/01/20",
    "OriginalTransactionHour": 720,
    "OrignalTransactionValue": "3,00",
    "OrignalTransactionCardHolder": "NOME NOME NOME NOME NOME N",
    "OriginalTransactionMode": "ONL",
    "OriginalInputMethod": "C"
  },
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
|`InitializationVersion`|Integer int16|---|---|Número de versão dos parametros baixados na inicialização do equipamento.|
|`PrintMessage.Position`|String|---|---|Default: "Top"<br><br>Enum: "Top", "Middle", "Bottom"<br><br>Posição da mensagem no comprovante:<br><br>Top - Início do comprovante, antes do código do estabelecimento<br><br>Middle - Meio do comprovante, após a descrição dos valores<br><br>Bottom - Final do comprovante|
|`PrintMessage.Message`|String|---|---|Indica a mensagem que deve ser impressa no comprovante de acordo com a posição indicada no campo Position|
|`Status`|Integerint16|---|---|Status da transação.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Pago<br><br>3 = Negado<br><br>10 = Cancelado<br><br>13 = Abortado|
|`CancellationStatus`|Integer int16|---|---|Status do cancelamento.<br><br>0 = Não Finalizado<br><br>1 = Autorizado<br><br>2 = Negado<br><br>3 = Confirmado<br><br>4 = Desfeito|
|`ReasonCode`|Integer int16|---|---|Código de referência para análises.|
|`ReasonMessage`|String|---|---|Mensagem explicativa para análise.|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|---|Mensagem de erro/resposta da transação da Adquirência.|
|`Receipt.MerchantName`|---|---|---|---|
|`Receipt.MerchantAddress`|---|---|---|---|
|`Receipt.MerchantCity`|---|---|---|---|
|`Receipt.MerchantState`|---|---|---|---|
|`Receipt.MerchantCode`|---|---|---|---|
|`Receipt.Terminal`|---|---|---|---|
|`Receipt.Nsu`|---|---|---|---|
|`Receipt.Date`|---|---|---|---|
|`Receipt.Hour`|---|---|---|---|
|`Receipt.IssuerName`|---|---|---|---|
|`Receipt.CardNumber`|---|---|---|---|
|`Receipt.TransactionType`|---|---|---|---|
|`Receipt.AuthorizationCode`|---|---|---|---|
|`Receipt.TransactionMode`|---|---|---|---|
|`Receipt.InputMethod`|---|---|---|---|
|`Receipt.CancelValue`|---|---|---|---|
|`Receipt.OriginalTransactonData`|---|---|---|---|
|`Receipt.OriginalTransactonType`|---|---|---|---|
|`Receipt.OriginalTransactonNsu`|---|---|---|---|
|`Receipt.OriginalTransactonAuthCode`|---|---|---|---|
|`Receipt.OriginalTransactionDate`|---|---|---|---|
|`Receipt.OriginalTransactionHour`|---|---|---|---|
|`Receipt.OrignalTransactionValue`|---|---|---|---|
|`Receipt.OrignalTransactionCardHolder`|---|---|---|---|
|`Receipt.OriginalTransactionMode`|---|---|---|---|
|`Receipt.OriginalInputMethod`|---|---|---|---|
|`Links.Method`|String|---|---|Enum: "POST", "GET", "PUT".<br><br>Método HTTP a ser utilizado na operação.|
|`Links.Rel`|String|---|---|Enum: "self", "cancel", "confirm".<br><br>Referência da operação.|
|`Links.Href`|String|---|---|Endereço de URL de chamada da API|

## Desfazimento de cancelamento

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

**Simular respostas:**

Para simular alguma resposta especifica utilize o campo Amount, onde de acordo com o valor dos centavos informado nesse campo é possivel receber uma resposta conforme descrito na tabela abaixo:

|Amount (valor dos centados)|Retorno simulado do Cancelamento|Exemplo de valor simulado|
|50|Aprovado|5050 = R$50,50|
|51|Negado|20051 = R$200,51|
|52|Timeout|3552 = R$35,52|
|59|Erro|1059 = R$10,59|

### Desfaz por MerchantVoidId

#### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/merchantVoidId/{MerchantVoidId}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String guid|36|Sim|Código do Pagamento|
|`MerchantVoidId`|String|---|Sim|Número do documento gerado automáticamente pelo terminal e incrementado de 1 a cada transação realizada no terminal|

#### Resposta

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
|`ConfirmationStatuss`|Integer|2|Sim|Status do confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer int16|---|---|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|---|---|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|---|---|---|Mensagem de erro/resposta da transação da Adquirência.|

### Desfaz por VoidId

#### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/{VoidId}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String guid|36|Sim|Código do Pagamento|
|`VoidId`|String guid|36|Sim|Identificador do cancelamento a ser desfeito|

#### Resposta

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
|`CancellationStatus`|Integer|2|Sim|Status do cancelamento. <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Negado <br><br>3 = Confirmado <br><br>4 = Desfeito|
|`ConfirmationStatuss`|Integer|2|Sim|Status do confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer|2|Sim|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|3|Sim|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|Sim|Mensagem de erro/resposta da transação da Adquirência.|

## Confirmação de Cancelamento

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

**Simular respostas:**

Para simular alguma resposta especifica utilize o campo Amount, onde de acordo com o valor dos centavos informado nesse campo é possivel receber uma resposta conforme descrito na tabela abaixo:

|Amount (valor dos centados)|Retorno simulado do Cancelamento|Exemplo de valor simulado|
|50|Aprovado|5050 = R$50,50|
|51|Negado|20051 = R$200,51|
|52|Timeout|3552 = R$35,52|
|59|Erro|1059 = R$10,59|

### Confirma

#### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/{VoidId}/confirmation</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String guid|36|Sim|Código do Pagamento|
|`VoidId`|String guid|36|Sim|Identificador do cancelamento a ser desfeito|

#### Resposta

```json
{
  "CancellationStatus": 4,
  "ConfirmatinoStatus": 1,
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
|`CancellationStatus`|Integer|2|Sim|Status do cancelamento. <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Negado <br><br>3 = Confirmado <br><br>4 = Desfeito|
|`ConfirmationStatuss`|Integer|2|Sim|Status do confirmação. <br><br>0 = Pendente <br><br>1 = Confirmado <br><br>2 = Desfeito|
|`Status`|Integer|2|Sim|Status da transação <br><br>0 = Não Finalizado <br><br>1 = Autorizado <br><br>2 = Pago <br><br>3 = Negado <br><br>10 = Cancelado <br><br>13 = Abortado|
|`ReturnCode`|String|3|Sim|Código de erro/resposta da transação da Adquirência.|
|`ReturnMessage`|String|---|Sim|Mensagem de erro/resposta da transação da Adquirência.|

## Consultas

### Consulta de Cancelamento

Consulta um cancelamento

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apiquerysandbox.cieloecommerce.cielo.com.br     | https://apiquery.cieloecommerce.cielo.com.br      |

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/{VoidId}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`PaymentId`|String guid|36|Sim|Código do Pagamento|
|`VoidId`|String guid|36|Sim|Identificador do cancelamento a ser desfeito|

#### Resposta

```json
{
  "VoidId": "a4bc7892-b455-4cd1-b902-c791802cd72b",
  "CancellationStatus": 1,
  "Status": 10
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`VoidId`|String guid|36|Sim|Identificador do cancelamento a ser desfeito|
|`CancellationStatus`|Integer|2|Sim|Status do cancelamento. <br><br>0 = NotFinished  <br><br>1 = Authorized  <br><br>2 = Denied  <br><br>3 = Confirmed  <br><br>4 = Reversed |
|`Status`|Integer|2|Sim|Status da transação.<br><br>NotFinished = 0,<br><br>Authorized = 1,<br><br>PaymentConfirmed = 2,<br><br>Denied = 3,<br><br>Voided = 10,<br><br>Refunded = 11,<br><br>Pending = 12,<br><br>Aborted = 13,<br><br>Scheduled = 20|

# Lojas

Essa operação permite o cadastro de lojas e terminais , viabilizando modelos de negócios onde o facilitador necessite segmentar sua operação.

## Loja

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://merchantapisandbox.cieloecommerce.cielo.com.br      | https://merchantapi.cieloecommerce.cielo.com.br      |

**TABELA MCC:**

|MCC|Descrição|
|---|---|
|742|VETERINARIA|
|744|Carefree Resorts|
|763|COOPERATIVA AGRÍCOLA|
|780|SERVIÇOS DE PAISAGISMO E HORTICULTURA|
|1520|EMPREITEIROS EM GERAL - COMERCIAL E RESIDENCIAL|
|1711|PREST. DE SERV. PARA AR COND., ENCANAMENTO E AQUEC.|
|1731|ELETRICISTAS E SERVIÇOS ELÉTRICOS|
|1740|PEDREIROS E SERVIÇOS DE INSTALAÇÃO|
|1750|MARCENEIROS E SERVIÇOS DE CARPINTARIA|
|1761|METALURGICOS|
|1771|EMPREITEIO PARA SERVIÇOS ESPECIALIZADO
|1799|DEMAIS SVS DE REFORMA E CONSTRUÇÃO NÃO-CLASSIFICADOS|
|2741|EDITORAS - PUBLICAÇÕES E IMPRESSÕES|
|2791|TYPESETTING, PLATE MAKING AND RELATED SERVICES|
|2842|SERVIÇOS DE LIMPEZA E POLIMENTO|
|3000|UNITED AIRLINES|
|3001|AMERICAN AIRLINES|
|3002|PAN AMERICAN|
|3003|EUROFLY AIRLINES|
|3004|DRAGON AIRLINES|
|3005|BRITISH AIRWAYS|
|3006|JAPAN AIRLINES|
|3007|AIR FRANCE|
|3008|LUFTHANSA|
|3009|AIR CANADA|
|3010|KLM (ROYAL DUTCH AIRLINES)|
|3011|AEROFLOT|
|3012|QANTAS|
|3013|ALITALIA|
|3014|SAUDI ARABIAN AIRLINES|
|3015|SWISS INTERNATIONAL AIRLINES|
|3016|SAS|
|3017|SOUTH AFRICAN AIRWAYS|
|3018|VARIG|
|3020|AIR-INDIA|
|3021|AIR ALGERIE|
|3022|PHILIPPINE AIRLINES|
|3023|MEXICANA|
|3024|PAKISTAN INTERNATIONAL|
|3025|AIR NEW ZEALAND|
|3026|EMIRATES AIRLINES|
|3027|UTA INTERAIR|
|3028|AIR MALTA|
|3029|SN BRUSSELS AIRLINES|
|3030|AEROLINEAS ARGENTINAS|
|3031|OLYMPIC AIRWAYS|
|3032|EL AL|
|3033|ANSETT AIRLINES|
|3034|ETIHAD AIRWAYS|
|3035|TAP (PORTUGAL)|
|3036|VASP|
|3037|EGYPTAIR|
|3038|KUWAIT AIRWAYS|
|3039|AVIANCA|
|3040|GULF AIR (BAHRAIN)|
|3041|BALKAN-BULGARIAN AIRLINES|
|3042|FINNAIR|
|3043|AER LINGUS|
|3044|AIR LANKA|
|3045|NIGERIA AIRWAYS|
|3046|CRUZEIRO DO SUL (BRAZIL)|
|3047|THY (TURKEY)|
|3048|ROYAL AIR MAROC|
|3049|TUNIS AIR|
|3050|ICELANDAIR|
|3051|AUSTRIAN AIRLINES|
|3052|LAN CHILE|
|3053|AVIACO (SPAIN)|
|3054|LADECO (CHILE)|
|3055|LAB (BOLIVIA)|
|3056|JET AIRWAYS|
|3057|VIRGIN AMERICA|
|3058|DELTA|
|3059|DBA AIRLINES|
|3060|NORTHWEST|
|3061|CONTINENTAL|
|3062|HAPAG-LLOYD EXPRESS AIRLINES|
|3063|U.S. AIRWAYS|
|3064|ADRIA AIRWAYS|
|3065|AIRINTER|
|3066|SOUTHWEST|
|3067|VANGUARD AIRLINES|
|3068|AIR ASTANA|
|3069|AIR EUROPE|
|3070|PSA|
|3071|AIR BRITISH COLUMBIA|
|3073|AIR CAL|
|3075|SINGAPORE AIRLINES|
|3076|AEROMEXICO|
|3077|THAI AIRWAYS|
|3078|CHINA AIRLINES|
|3079|JETSTAR AIRWAYS|
|3082|KOREAN AIRLINES|
|3083|AIR AFRIQUE|
|3084|EVA AIRWAYS|
|3085|MIDWEST EXPRESS AIRLINES|
|3087|METRO AIRLINES|
|3088|CROATIA AIRLINES|
|3089|TRANSAERO|
|3090|UNI AIRWAYS CORPORATION|
|3094|ZAMBIA AIRWAYS|
|3096|AIR ZIMBABWE|
|3097|SPANAIR|
|3098|ASIANA AIRLINES|
|3099|CATHAY PACIFIC|
|3100|MALAYSIAN AIRLINE|
|3102|IBERIA|
|3103|GARUDA (INDONESIA)|
|3106|BRAATHENS S.A.F.E. (NORWAY)|
|3111|BRITISH MIDLAND|
|3112|WINDWARD ISLAND|
|3117|VIASA|
|3125|TAN|
|3127|TACA INTERNATIONAL|
|3129|SURINAM AIRWAYS|
|3130|SUNWORLD INTERNATIONAL|
|3131|VLM AIRLINES|
|3132|FRONTIER AIRLINES|
|3136|QATAR AIRWAYS|
|3144|VIRGIN ATLANTIC|
|3146|LUXAIR|
|3148|AIR LITTORAL SA|
|3151|AIR ZAIRE|
|3156|GO FLY LTD|
|3159|PBA|
|3161|ALL NIPPON AIRWAYS|
|3164|NORONTAIR|
|3167|AEROCONTINENTE|
|3171|CANADIAN AIRLINES INTERNATIONAL|
|3172|NATIONAIR|
|3174|JETBLUE AIRWAYS|
|3175|MIDDLE EAST AIR|
|3177|AIRTRAN AIRWAYS|
|3178|MESA AIR|
|3180|WESTJET AIRLINES|
|3181|MALEV|
|3182|LOT (POLAND)|
|3183|OMAN AVIATION SERVICES|
|3184|LIAT|
|3185|LAV (VENEZUELA)|
|3186|LAP (PARAGUAY)|
|3187|LACSA (COSTA RICA)|
|3188|VIRGIN EXPRESS|
|3190|JUGOSLAV AIR|
|3191|ISLAND AIRLINES|
|3193|INDIAN AIRLINES|
|3196|HAWAIIAN AIR|
|3197|HAVASU AIRLINES|
|3200|GUYANA AIRWAYS|
|3203|GOLDEN PACIFIC AIR|
|3204|FREEDOM AIR|
|3206|CHINA EASTERN AIRLINES|
|3211|NORWEGIAN AIR SHUTTLE|
|3212|DOMINICANA|
|3213|MALMO AVIATION|
|3217|CSA|
|3219|COPA|
|3220|COMPANIA FAUCETT|
|3221|TRANSPORTES AEROS MILITARES ECUATORIANOS|
|3222|COMMAND AIRWAYS|
|3226|SKYWAYS AIR|
|3228|CAYMAN AIRWAYS|
|3229|SAETA—SOCIAEDAD ECUATORIANOS DE TRANSPORTES AEREOS|
|3231|SAHSA—SERVICIO AEREO DE HONDURAS|
|3234|CARIBBEAN AIRLINES|
|3236|AIR ARABIA AIRLINE|
|3238|BEMIDJI AIRLINES|
|3239|BAR HARBOR AIRLINES|
|3240|BAHAMASAIR|
|3241|AVIATECA (GUATEMALA)|
|3242|AVENSA|
|3243|AUSTRIAN AIR SERVICE|
|3245|EASYJET AIRLINES|
|3246|RYANAIR|
|3247|GOL AIRLINES|
|3248|TAM AIRLINES|
|3252|ALM|
|3256|ALASKA AIRLINES|
|3260|SPIRIT AIRLINES|
|3261|AIR CHINA|
|3263|AERO SERVICO CARABOBO|
|3266|AIR SEYCHELLES|
|3267|AIR PANAMA|
|3280|AIR JAMAICA|
|3282|AIR DJIBOUTI|
|3285|AEROPERU|
|3286|AEROLINEAS NICARAGUENSIS|
|3287|AERO COACH AVIATION|
|3292|CYPRUS AIRWAYS|
|3293|ECUATORIANA|
|3294|ETHIOPIAN AIRLINES|
|3295|KENYA AIRWAYS|
|3296|AIR BERLIN|
|3297|TAROM ROMANIAN AIR TRANSPORT|
|3298|AIR MAURITIUS|
|3299|WIDEROE’S FLYVESELSKAP|
|3351|AFFILIATED AUTO RENTAL|
|3352|AMERICAN INTL RENT-A-CAR|
|3353|BROOKS RENT-A-CAR|
|3354|ACTION AUTO RENTAL|
|3355|SIXT CAR RENTAL|
|3357|HERTZ RENT A CAR|
|3359|PAYLESS CAR RENTAL|
|3360|SNAPPY CAR RENTAL|
|3361|AIRWAYS RENT-A-CAR|
|3362|ALTRA AUTO RENTAL|
|3364|AGENCY RENT-A-CAR|
|3366|BUDGET RENT A CAR|
|3368|HOLIDAY RENT-A-CAR|
|3370|RENT-A-WRECK|
|3374|ACCENT RENT-A-CAR|
|3376|AJAX RENT-A-CAR|
|3380|TRIANGLE RENT-A-CAR|
|3381|EUROP CAR|
|3385|TROPICAL RENT-A-CAR|
|3386|SHOWCASE RENTAL CARS|
|3387|ALAMO RENT-A-CAR|
|3388|MERCHANTS RENT-A-CAR|
|3389|AVIS RENT A CAR|
|3390|DOLLAR RENT-A-CAR|
|3391|EUROPE BY CAR|
|3393|NATIONAL CAR RENTAL|
|3394|KEMWELL GROUP RENT-A-CAR|
|3395|THRIFTY CAR RENTAL|
|3396|TILDEN RENT-A-CAR|
|3398|ECONO-CAR RENT-A-CAR|
|3400|AUTO HOST CAR RENTALS|
|3405|ENTERPRISE RENT-A-CAR|
|3409|GENERAL RENT-A-CAR|
|3412|A-1 RENT-A-CAR|
|3420|ANSA INTL RENT-A-CAR|
|3421|ALLSTATE RENT-A-CAR|
|3423|AVCAR RENT-A-CAR|
|3425|AUTOMATE RENT-A-CAR|
|3427|AVON RENT-A-CAR|
|3428|CAREY RENT-A-CAR|
|3429|INSURANCE RENT-A-CAR|
|3430|MAJOR RENT-A-CAR|
|3431|REPLACEMENT RENT-A-CAR|
|3432|RESERVE RENT-A-CAR|
|3433|UGLY DUCKLING RENT-A-CAR|
|3434|USA RENT-A-CAR|
|3435|VALUE RENT-A-CAR|
|3436|AUTOHANSA RENT-A-CAR|
|3438|INTERENT RENT-A-CAR|
|3439|MILLEVILLE RENT-A-CAR|
|3441|ADVANTAGE RENT-A-CAR|
|3501|HOLIDAY INNS|
|3502|BEST WESTERN HOTELS|
|3503|SHERATON HOTELS|
|3504|HILTON HOTELS|
|3505|FORTE HOTELS|
|3506|GOLDEN TULIP HOTELS|
|3507|FRIENDSHIP INNS|
|3508|QUALITY INNS|
|3509|MARRIOTT|
|3510|DAYS INN|
|3511|ARABELLA HOTELS|
|3512|INTER-CONTINENTAL HOTELS|
|3513|WESTIN|
|3514|AMERISUITES|
|3515|RODEWAY INNS|
|3516|LA QUINTA MOTOR INNS|
|3517|AMERICANA HOTELS|
|3518|SOL HOTELS|
|3519|PULLMAN INTERNATIONAL HOTELS|
|3520|MERIDIEN HOTELS|
|3521|ROYAL LAHAINA RESORTS|
|3522|TOKYO HOTEL|
|3523|PENINSULA HOTEL|
|3524|WELCOMGROUP HOTELS|
|3525|DUNFEY HOTELS|
|3526|PRINCE HOTELS|
|3527|DOWNTOWNER-PASSPORT HOTEL|
|3528|RED LION INNS|
|3529|CP HOTELS|
|3530|RENAISSANCE HOTELS|
|3531|KAUAI COCONUT BEACH RESORT|
|3532|ROYAL KONA RESORT|
|3533|HOTEL IBIS|
|3534|SOUTHERN PACIFIC HOTELS|
|3535|HILTON INTERNATIONALS|
|3536|AMFAC HOTELS|
|3537|ANA HOTEL|
|3538|CONCORDE HOTELS|
|3539|SUMMERFIELD SUITES HOTELS|
|3540|IBEROTEL HOTELS|
|3541|HOTEL OKURA|
|3542|ROYAL HOTELS|
|3543|FOUR SEASONS HOTELS|
|3544|CIGA HOTELS|
|3545|SHANGRI-LA INTERNATIONAL|
|3546|HOTEL SIERRA|
|3547|Breakers Resort|
|3548|HOTEIS MELIA|
|3549|AUBERGE DES GOVERNEURS|
|3550|REGAL 8 INNS|
|3551|MIRAGE HOTEL AND CASINO|
|3552|COAST HOTELS|
|3553|PARK INNS INTERNATIONAL|
|3554|PINEHURST RESORT|
|3555|TREASURE ISLAND HOTEL AND CASINO|
|3556|BARTON CREEK RESORT|
|3557|MANHATTAN EAST SUITE HOTELS|
|3558|JOLLY HOTELS|
|3559|CANDLEWOOD SUITES|
|3560|ALADDIN RESORT AND CASINO|
|3561|GOLDEN NUGGET|
|3562|COMFORT INNS|
|3563|JOURNEY’S END MOTELS|
|3564|SAM’S TOWN HOTEL AND CASINO|
|3565|RELAX INNS|
|3566|GARDEN PLACE HOTEL|
|3567|SOHO GRAND HOTEL|
|3568|LADBROKE HOTELS|
|3569|TRIBECA GRAND HOTEL|
|3570|FORUM HOTELS|
|3571|GRAND WAILEA RESORT|
|3572|MIYAKO HOTELS|
|3573|SANDMAN HOTELS|
|3574|VENTURE INNS|
|3575|VAGABOND HOTELS|
|3576|LA QUINTA RESORT|
|3577|MANDARIN ORIENTAL HOTEL|
|3578|FRANKENMUTH BAVARIAN|
|3579|HOTEL MERCURE|
|3580|HOTEL DEL CORONADO|
|3581|DELTA HOTEL|
|3582|CALIFORNIA HOTEL AND CASINO|
|3583|RADISSON BLU|
|3584|PRINCESS HOTELS INTERNATIONAL|
|3585|HUNGAR HOTELS|
|3586|SOKOS HOTELS|
|3587|DORAL HOTELS|
|3588|HELMSLEY HOTELS|
|3589|DORAL GOLF RESORT|
|3590|FAIRMONT HOTELS|
|3591|SONESTA HOTELS|
|3592|OMNI HOTELS|
|3593|CUNARD HOTELS|
|3594|ARIZONA BILTMORE|
|3595|HOSPITALITY INNS|
|3596|WYNN LAS VEGAS|
|3597|RIVERSIDE RESORT HOTEL AND CASINO|
|3598|REGENT INTERNATIONAL HOTELS|
|3599|PANNONIA HOTELS|
|3600|SADDLEBROOK RESORT TAMPA|
|3601|TRADEWINDS RESORTS|
|3602|HUDSON HOTEL|
|3603|NOAH’S HOTELS|
|3604|HILTON GARDEN INN|
|3605|Jurys Doyle Hotel Group|
|3606|Jefferson Hotel|
|3607|FONTAINEBLEAU RESORTS|
|3608|GAYLORD OPRYLAND|
|3609|GAYLORD PALMS|
|3610|Gaylord Texan|
|3611|C Mon Inn|
|3612|MOEVENPICK HOTELS|
|3613|MICROTEL INNS & SUITES|
|3614|AMERICINN|
|3615|TRAVELODGE|
|3616|Hermitage Hotel|
|3617|AMERICA’S BEST VALUE INN|
|3618|GREAT WOLF|
|3619|ALOFT|
|3620|BINION’S HORSESHOE CLUB|
|3621|EXTENDED STAY|
|3622|MERLIN HOTELS|
|3623|DORINT HOTELS|
|3624|LADY LUCK HOTEL AND CASINO|
|3625|HOTEL UNIVERSALE|
|3626|STUDIO PLUS|
|3627|EXTENDED STAY AMERICA|
|3628|EXCALIBUR HOTEL AND CASINO|
|3629|DAN HOTELS|
|3630|EXTENDED STAY DELUXE|
|3631|SLEEP INN|
|3632|THE PHOENICIAN|
|3633|RANK HOTELS|
|3634|SWISSOTEL|
|3635|RESO HOTELS|
|3636|SAROVA HOTELS|
|3637|RAMADA INNS|
|3638|HOWARD JOHNSON|
|3639|MOUNT CHARLOTTE THISTLE|
|3640|HYATT HOTELS|
|3641|SOFITEL HOTELS|
|3642|NOVOTEL HOTELS|
|3643|STEIGENBERGER HOTELS|
|3644|ECONO LODGES|
|3645|QUEENS MOAT HOUSES|
|3646|SWALLOW HOTELS|
|3647|HUSA HOTELS|
|3648|DE VERE HOTELS|
|3649|RADISSON HOTELS|
|3650|RED ROOF INNS|
|3651|IMPERIAL LONDON HOTEL|
|3652|EMBASSY HOTELS|
|3653|PENTA HOTELS|
|3654|LOEWS HOTELS|
|3655|SCANDIC HOTELS|
|3656|SARA HOTELS|
|3657|OBEROI HOTELS|
|3658|NEW OTANI HOTELS|
|3659|TAJ HOTELS INTERNATIONAL|
|3660|KNIGHTS INNS|
|3661|METROPOLE HOTELS|
|3662|CIRCUS CIRCUS HOTEL AND CASINO|
|3663|HOTELES EL PRESIDENTE|
|3664|FLAG INN|
|3665|HAMPTON INNS|
|3666|STAKIS HOTELS|
|3667|LUXOR HOTEL AND CASINO|
|3668|MARITIM HOTELS|
|3669|ELDORADO HOTEL AND CASINO|
|3670|ARCADE HOTELS|
|3671|ARCTIA HOTELS|
|3672|CAMPANILE HOTELS|
|3673|IBUSZ HOTELS|
|3674|RANTASIPI HOTELS|
|3675|INTERHOTEL CEDOK|
|3676|MONTE CARLO HOTEL AND CASINO|
|3677|CLIMAT DE FRANCE HOTELS|
|3678|CUMULUS HOTELS|
|3679|SILVER LEGACY HOTEL AND CASINO|
|3680|HOTEIS OTHAN|
|3681|ADAMS MARK HOTELS|
|3682|SAHARA HOTEL AND CASINO|
|3683|BRADBURY SUITES|
|3684|BUDGET HOST INNS|
|3685|BUDGETEL INNS|
|3686|SUSSE CHALET|
|3687|CLARION HOTELS|
|3688|COMPRI HOTELS|
|3689|CONSORT HOTELS|
|3690|COURTYARD BY MARRIOTT|
|3691|DILLON INNS|
|3692|DOUBLETREE HOTELS|
|3693|DRURY INNS|
|3694|ECONOMY INNS OF AMERICA|
|3695|EMBASSY SUITES|
|3696|EXEL INNS|
|3697|FAIRFIELD HOTELS|
|3698|HARLEY HOTELS|
|3699|MIDWAY MOTOR LODGE|
|3700|MOTEL 6|
|3701|LA MANSION DEL RIO|
|3702|Registry Hotels|
|3703|RESIDENCE INNS|
|3704|ROYCE HOTELS|
|3705|SANDMAN INNS|
|3706|SHILO INNS|
|3707|SHONEY’S INNS|
|3708|VIRGIN RIVER HOTEL AND CASINO|
|3709|SUPER 8 MOTELS|
|3710|THE RITZ-CARLTON|
|3711|FLAG INNS (AUSTRALIA)|
|3712|BUFFALO BILL’S HOTEL AND CASINO|
|3713|QUALITY PACIFIC HOTEL|
|3714|FOUR SEASONS HOTEL (AUSTRALIA)|
|3715|FAIRFIELD INN|
|3716|CARLTON HOTELS|
|3717|CITY LODGE HOTELS|
|3718|KAROS HOTELS|
|3719|PROTEA HOTELS|
|3720|SOUTHERN SUN HOTELS|
|3721|HILTON CONRAD HOTELS|
|3722|WYNDHAM|
|3723|RICA HOTELS|
|3724|INTER NOR HOTELS|
|3725|SEA PINES RESORT|
|3726|RIO SUITES|
|3727|BROADMOOR HOTEL|
|3728|BALLY’S HOTEL AND CASINO|
|3729|JOHN ASCUAGA’S NUGGET|
|3730|MGM GRAND HOTEL|
|3731|HARRAH’S HOTELS AND CASINOS|
|3732|OPRYLAND HOTEL|
|3733|Boca Raton Resort|
|3734|HARVEY/BRISTOL HOTELS|
|3735|MASTERS ECONOMY INNS|
|3736|COLORADO BELLE/EDGEWATER RESORT|
|3737|RIVIERA HOTEL AND CASINO|
|3738|TROPICANA RESORT & CASINO|
|3739|WOODSIDE HOTELS & RESORTS|
|3740|TOWNEPLACE SUITES|
|3741|MILLENNIUM HOTELS|
|3742|CLUB MED|
|3743|BILTMORE HOTEL & SUITES|
|3744|CAREFREE RESORTS|
|3745|ST. REGIS HOTEL|
|3746|THE ELIOT HOTEL|
|3747|CLUBCORP/CLUBRESORTS|
|3748|WELLESLEY INNS|
|3749|THE BEVERLY HILLS HOTEL|
|3750|CROWNE PLAZA HOTELS|
|3751|HOMEWOOD SUITES|
|3752|PEABODY HOTELS|
|3753|GREENBRIAR RESORTS|
|3754|AMELIA ISLAND PLANTATION|
|3755|THE HOMESTEAD|
|3757|CANYON RANCH|
|3758|KAHALA MANDARIN ORIENTAL HOTEL|
|3759|THE ORCHID AT MAUNA LANI|
|3760|HALEKULANI HOTEL/WAIKIKI PARC|
|3761|PRIMADONNA HOTEL AND CASINO|
|3762|WHISKEY PETE’S HOTEL AND CASINO|
|3763|CHATEAU ELAN WINERY AND RESORT|
|3764|BEAU RIVAGE HOTEL AND CASINO|
|3765|BELLAGIO|
|3766|FREMONT HOTEL AND CASINO|
|3767|MAIN STREET STATION HOTEL AND CASINO|
|3768|SILVER STAR HOTEL AND CASINO|
|3769|STRATOSPHERE HOTEL AND CASINO|
|3770|SPRINGHILL SUITES|
|3771|CAESAR’S HOTEL AND CASINO|
|3772|NEMACOLIN WOODLANDS|
|3773|THE VENETIAN RESORT HOTEL CASINO|
|3774|NEW YORK-NEW YORK HOTEL AND CASINO|
|3775|SANDS RESORT|
|3776|NEVELE GRAND RESORT AND COUNTRY CLUB|
|3777|MANDALAY BAY RESORT|
|3778|FOUR POINTS HOTELS|
|3779|W HOTELS|
|3780|DISNEY RESORTS|
|3781|PATRICIA GRAND RESORT HOTELS|
|3782|ROSEN HOTELS AND RESORTS|
|3783|TOWN AND COUNTRY RESORT & CONVENTION CENTER|
|3784|FIRST HOSPITALITY HOTELS|
|3785|OUTRIGGER HOTELS AND RESORTS|
|3786|OHANA HOTELS OF HAWAII|
|3787|CARIBE ROYALE RESORTS|
|3788|ALA MOANA HOTEL|
|3789|SMUGGLER’S NOTCH RESORT|
|3790|RAFFLES HOTELS|
|3791|STAYBRIDGE SUITES|
|3792|CLARIDGE CASINO HOTEL|
|3793|FLAMINGO HOTELS|
|3794|GRAND CASINO HOTELS|
|3795|PARIS LAS VEGAS HOTEL|
|3796|PEPPERMILL HOTEL CASINO|
|3797|ATLANTIC CITY HILTON RESORTS|
|3798|EMBASSY VACATION RESORT|
|3799|HALE KOA HOTEL|
|3800|HOMESTEAD SUITES|
|3801|WILDERNESS HOTEL AND RESORT|
|3802|THE PALACE HOTEL|
|3803|The Wigwam Golf Resort and Spa|
|3804|The Diplomat Country Club and Spa|
|3805|The Atlantic|
|3806|Princeville Resort|
|3807|ELEMENT|
|3808|LXR|
|3809|Settle Inn|
|3810|La Costa Resort|
|3811|PREMIER INN|
|3812|HYATT PLACE|
|3813|HOTEL INDIGO|
|3814|THE ROOSEVELT HOTEL NY|
|3815|NICKELODEON FAMILY SUITES BY HOLIDAY INN|
|3817|Affinia|
|3818|MAINSTAY SUITES|
|3819|OXFORD SUITES|
|3820|JUMEIRAH ESSEX HOUSE|
|3821|CARIBE ROYALE|
|3822|Crossland|
|3823|GRAND SIERRA RESORT|
|3824|ARIA|
|3825|VDARA|
|3826|AUTOGRAPH|
|3827|GALT HOUSE|
|3828|COSMOPOLITAN OF LAS VEGAS|
|3829|COUNTRY INN BY CARLSON|
|3830|PARK PLAZA HOTEL|
|3831|WALDORF|
|4011|TRANSPORTE FERROVIÁRIO DE CARGA|
|4111|TRANSPORTE LOCAL DE PASSAGEIROS, INCLUINDO BALSAS|
|4112|TRANSPORTE DE PASSAGEIROS EM TREM (LONGA DISTÂNCIA)|
|4119|AMBULANCIAS|
|4121|LIMUSINES E TÁXIS (TAXICABS AND LIMOUSINES)|
|4131|COMPANHIAS DE ONIBUS|
|4214|TRANSPORTE DE CARGA RODOVIÁRIO E ARMAZENAMENTO|
|4215|CORREIOS - AÉREO, TERRESTRE E TRANSITÓRIOS|
|4225|ARMAZENAM. PROD AGRÍCOLAS,MERCAD REFRIGERADAS,BENS DOMÉSTICO|
|4411|LINHAS DE CRUZEROS (CRUISE LINES)|
|4457|ALUGUEL E ARRENDAMENTO DE BARCOS, ESQUIS E IATES|
|4468|MARINAS, SERVIÇOS E FORNECEDORES|
|4511|OUTRAS CIAS AÉREAS|
|4582|AEROPORTOS E SERVIÇOS LIGADOS A AERONAVES|
|4722|AGÊNCIAS DE VIAGENS (TRAVEL AGENCIES)|
|4723|AGÊNCIAS DE VIAGEM TUI (TUI TRAVEL AGENCY)|
|4784|PEDÁGIOS|
|4789|SERVIÇOS DE TRANSPORTE|
|4812|TELEFONES E EQUIPAMENTOS DE TELECOMUN.|
|4813|SERVIÇOS DE TELEC.- CHAM. LOCAIS E LONGA DISTÂNCIA|
|4814|SERVIÇOS DE TELECOMUNICAÇÃO|
|4816|REDES DE COMPUTADORES / SERVIÇOS DE INFORMAÇÃO|
|4821|TELEGRAFO|
|4829|ORDENS DE PAGAMENTO POR TRANSFERÊNCIA BANCÁRIA|
|4899|SERVIÇOS DE TV A CABO/PAGA (CABLE/PAY TV SERVICES)|
|4900|UTILID./ELEC/GAS/AGUÁ/SANI (UT../ELEC/GAS/H2O/SANI)|
|5013|ATACADISTAS E DISTRIBUIDORES DE ACESSÓRIOS DE VEÍCULOS|
|5021|MÓVEIS PARA ESCRITÓRIOS (COMMERCIAL FURNITURE)|
|5039|MATERIAL PARA CONSTRUÇÃO E AFINS (CONST. MAT. - DEF)|
|5044|A/D DE EQUIPAMENTOS DE FOTOGRAFIA, CÓPIA E MICROFILME|
|5045|COMPUTADORES, EQUIPAMENTOS E SOFTWARES|
|5046|A/D DE MÁQUINAS E EQUIPAMENTOS PARA EC|
|5047|A/D DE EQUIPAMENTO HOSPITALARES, MÉDICOS E OFTÁLMICOS|
|5051|CENTROS DE SERVIÇOS DE METAIS (METAL SERVICE CENTERS)|
|5065|LOJA ARTIGOS ELETRÔNICOS|
|5072|EQUIP./DISTRIB. DE HARDWARE (HARDWARE EQUIP.SUPPLIES)|
|5074|EQUIP. DE AQUECIMENTO/ENCANAMENTO (PLUMB./HEAT. E.)|
|5085|A/D DE SUPRIMENTOS INDUSTRIAIS (NÃO CLASSIFICADO EM OUTRO)|
|5094|JOALHERIA, PEDRAS PRECIOSAS, METAIS|
|5099|ATACADISTAS E DISTRIBUIDORES DE MERCADORIAS DURÁVEIS|
|5111|A/D DE ARTIGOS DE PAPELARIA E SUPRIMENTOS PARA ESCRITÓRIO|
|5122|FARMACEUTICOS/DROGAS (DRUGS/DRUGGISTS SUNDRIES)|
|5131|A/D DE TECIDOS E PRODUTOS DE ARMARINHO|
|5137|ATACADISTAS E DISTRIBUIDORES DE ROUPAS|
|5139|ATACADISTAS E DISTRIBUIDORES DE CALÇADOS|
|5169|A/D DE PRODUTOS QUIMICOS E SEMELHANTES (N CLASSIF. EM OUTRO)|
|5172|PRODUTOS DE PETRÓLEO (PETROLEUM/PETROLEUM PRODUCTS)|
|5192|ATAC. E DISTRIB. DE LIVROS, PERIÓDICOS E JORNAIS|
|5193|ATACADISTAS E DISTRIBUIDORES DE FLORES, PLANTAS E SEMENTES|
|5198|PINTURA, POLIMENTO E SUPRIM. (PAN.,VARN. & SUPPLIES)|
|5199|A/D DE MERCADORIAS NÃO DURÁVEIS (NÃO CLASSIF. EM OUTRO)|
|5200|LOJAS DE MATERIAL DE CONSTRUÇÃO (PEQUENO/MÉDIO PORTE)|
|5211|LOJAS DE MATERIAL DE CONSTRUÇÃO-PRODUTOS BRUTOS (EX: TIJOLO)|
|5231|LOJAS DE VIDROS, TINTAS E PAPÉIS DE PAREDE|
|5251|VENDA DE EQUIPAMENTOS, INCLUINDO DE FERRAGEM|
|5261|JARDINAGEM|
|5271|CORRETORES DE RESIDÊNCIAS MÓVEIS|
|5300|VENDA POR ATACADO (WHOLESALE CLUBS)|
|5309|DUTY FREE STORES|
|5310|LOJAS DE DESCONTO|
|5311|LOJAS DE DEPARTAMENTOS (DEPARTMENT STORES)|
|5331|LOJAS DE VARIEDADES|
|5399|LOJA MERCADORIAS GERAIS|
|5411|MERCEARIAS/SUPERMERCADOS (GROCERY STORES/SUPERM.)|
|5422|AÇOGUEIRO (FREEZER/MEAT LOCKERS)|
|5441|LOJA DE DOCES|
|5451|LOJA DE PRODUTOS DE LACTICÍNIOS (DAIRY PROD. STORES)|
|5462|CONFEITARIAS (BAKERIES)|
|5499|LOJA DE ALIMENTOS VARIADOS (MISC FOOD S. - DEFAULT)|
|5511|VENDA DE CARROS E CAMINHÕES (NOVOS E USADOS)|
|5521|VENDA DE CARROS USADOS|
|5531|Lojas de Automóveis, Lojas de Acessórios Domésticos|
|5532|LOJA DE PNEUS|
|5533|LOJA DE PEÇAS E ACESSÓRIOS DE CARROS|
|5541|ESTAÇÕES DE SERVIÇOS (SERVICE STATIONS)|
|5551|VENDA DE BARCOS MOTORIZADOS|
|5561|ARTIGOS PARA ACAMPAMENTO|
|5571|LOJAS DE MOTOCICLETAS E ACESSÓRIOS|
|5592|VENDA DE TRAILLERS|
|5598|CONSECIONÁRIA DE SNOWMOBILE|
|5599|SERVIÇOS GERIAS PARA CARROS|
|5611|ARTIGOS MASCULINOS|
|5621|LOJA DE ROUPAS FEMININAS "PRONTA PARA USAR"|
|5631|ACESSORIOS FEMININOS E LINGERIES|
|5641|ARTIGOS PARA CRIANÇAS E BEBÊS|
|5651|ROUPAS MASCULINAS, FEMININAS E INFANTIS|
|5655|ROUPA ESPORTIVA|
|5661|LOJAS DE SAPATOS|
|5681|LOJA DE PELES|
|5691|OJA ROUPA UNISSEX|
|5697|COSTUREIRAS E ALFAIATES|
|5698|LOJAS DE PERUCA|
|5699|SERVIÇOS GERIAS PARA VESTIMENTA|
|5712|LOJA DE MÓVEIS|
|5713|Loja de Pisos|
|5714|LOJA DE ESTOFADOS (DRAPERY & UPHOLSTERY STORES)|
|5718|LAREIRAS E ACESSÓRIOS (FIREPLACES & ACCESSORIES)|
|5719|LOJA DE MÓVEIS ESPECIALIZADA (HOME FURNISHING SPEC.)|
|5722|LOJAS DE ELETRODOMÉSTICOS|
|5732|LOJA DE ELETRÔNICOS|
|5733|LOJA INSTRUMENTO MUSICAIS|
|5734|LOJA DE SOFTWARE|
|5735|LOJAS DE DISCOS|
|5811|DISTRIBUIÇÃO E PRODUÇÃO DE ALIMENTOS|
|5812|RESTAURANTES|
|5813|BARES, PUBS E CASA NOTURNAS|
|5814|LANCHONETES DE COMIDAS RÁPIDAS (FAST FOOD)|
|5815|Produtos Digitais - De comunicação social audiovisual, incluindo Livros, Filmes e Música|
|5816|Pordutos Digitais - Jogos|
|5817|Produtos Digitais - Aplicativos de Software (Exceto Jogos)|
|5818|Produtos Digitais - Diversas Categorias|
|5912|FARMÁCIAS (DRUG STORES & PHARMACIES)|
|5921|CERVEJAS, VINHOS E LICORES (STORE/BEER/WINE/LIQUOR)|
|5931|LOJAS DE ARTIGOS DE SEGUNDA MÃO / BRECHÓS|
|5932|LOJA DE ANTIGUIDADES (ANTIQUE SHOPS)|
|5933|LOJAS DE PENHORES|
|5935|DEMOLIÇÕES, SUCATAS, DESMANCHES DE AUTOMÓVEIS|
|5937|L. DE REPRODUÇÃO DE ANTIQUIDADES (ANT.REPROD. STORES)|
|5940|LOJA DE BICICLETAS - VENDAS E SERVIÇOS|
|5941|SERVIÇOS GERAIS PARA ESPORTES|
|5942|LIVRARIAS|
|5943|PAPELARIAS|
|5944|JOALHERIA (JEWERLY STORE)|
|5945|LOJA DE BRINQUEDOS|
|5946|LOJA DE FOTOGRAFIA|
|5947|LOJA DE PRESENTES|
|5948|ARTIGOS DE COURO|
|5949|ARMARINHOS E LOJAS DE TECIDO|
|5950|LOJA DE COPOS/CRISTAIS (GLASSWARE/CRYSTAL STORES)|
|5960|MARK.DIRETO DE SEGUROS (DIR. MARKET. INSURANCE SVC)|
|5962|SERV. DIRETOS DE VIAGENS (D. MKTG-TRAV. RELATED ARR)|
|5963|VENDA DIRETA (DIRECT SELL/DOOR-TO-DOOR)|
|5964|CATALOGO DE COMERCIOS (CATALOG MERCHANT)|
|5965|CATÁLOGO DE VAREJO (COMB.CATALOG & RETAIL)|
|5966|MARKETING DIRETO-SAÍDA (OUTB. TELEMARKETING M.)|
|5967|MARKETING DIRETO - ENTRADA (INB. TELEMARKETING M.)|
|5968|ASSINATURA COMERCIAL (CONTINUITY/SUBSCRIP. MERCHANT)|
|5969|OUTROS VENDEDORES DE MARKETING DIRETO|
|5970|PRODUTOS ARTESANAIS|
|5971|GALERIA DE ARTE (ART DEALERS & GALLERIES)|
|5972|LOJA DE MOEDAS E SELOS|
|5973|LOJA DE BENS RELIGIOSOS|
|5975|APARELHOS AUDITIVOS - VENDAS E SERVIÇOS|
|5976|BENS ORTOPÉDICOS - PRÓTESES|
|5977|LOJA DE COSMÉTICOS|
|5978|MÁQUINAS DE ESCREVER - VENDA, ALUGUEL E SERVIÇOS|
|5983|REVENDEDORES DE COMBUSTÍVEIS (FUEL DEALERS)|
|5992|FLORICULTURA|
|5993|TABACARIA|
|5994|BANCA DE JORNAL E PROVEDOR DE NOTÍCIAS|
|5995|PET SHOP|
|5996|PISCINAS E BANHEIRAS - SERVIÇOS, SUPRIMENTOS E VENDAS|
|5997|NAVALHA ELÉTRICA - VENDA E SERVIÇOS|
|5998|LOJAS DE BARRACAS E TOLDOS|
|5999|LOJAS ESPECIALIZADAS NÃO LISTADAS ANTERIOMENTE|
|6010|BANCOS / LOJAS DE POUPANÇA E INST. FINANCEIRA|
|6011|INSTIUIÇÃO FINANCEIRA - CAIXA ELETRÔNICO|
|6012|INSTIUIÇÃO FINANCEIRA - AGÊNCIAS E SERVIÇOS|
|6050|Similar a Dinheiro (Quase Cash) - Instituição Financeira Cliente|
|6051|CASAS DE CÂMBIO|
|6211|CORRETORES DE IMÓVEIS (SECURITIES BROKERS/DEALERS)|
|6300|VENDA DE SEGUROS(INSURANCE SALES/UNDERWRITE)|
|6513|CORRETOR DE IMÓVEIS (ALUGUEL)|
|6532|PAGTOS DE TRANSAÇÕES DE INST.FINANCEIRAS|
|6533|PAGTOS DE TRANSAÇÕES COMERCIAIS|
|7011|HOTEIS (HOTELS/MOTELS/RESORTS)|
|7012|TEMPO COMPARTILHADO (TIMESHARE)|
|7032|ACAMPAMENTOS RECREATIVOS E DEPORTIVOS|
|7033|SERVIÇOS DE ACAMPAMENTOS|
|7210|LAVANDARIA, LIMPEZA E SERVIÇOS DE VESTUÁRIO|
|7211|LAVANDERIA - FAMILIAR E COMERCIAL|
|7216|LAVANDERIA TINTURARIA|
|7217|LIMPEZA DE TAPETES E ESTOFADOS|
|7221|ESTÚDIOS DE FOTOGRAFIA|
|7230|SALAO DE BELEZA / BARBEARIA / DEPILAÇÃO / MANICURE|
|7251|LOJA/REPARO DE SAPATOS|
|7261|SERVIÇO FUNERÁRIO|
|7273|SERVIÇO DE ENCONTROS E ACOMPANHANTE|
|7276|SERVIÇOS DE PREP. IMPOST. DE RENDA (TAX PREP. SVCS)|
|7277|S. DE ACONSELHAMENTO DE DÍVIDAS, CASAMENTO E PESSOAL|
|7278|CLUBES DE COMPRAS|
|7296|ALUGUEL DE ROUPAS - FANTASIAS, UNIFORMES E ROUPAS SOCIAIS|
|7297|CENTRO DE SAUNAS E MASSAGENS|
|7298|CLÍNICAS DE ESTÉTICA FACIAL / CORPORAL|
|7299|OUTROS SERVIÇOS PESSOAIS|
|7311|PUBLICIDADES|
|7321|AGÊNCIAS DE ANÁLISE DE CRÉDITO DE CONSUMIDORES|
|7333|SERVIÇOS DE IMPRESSÃO E ARTE GRÁFICA|
|7338|COPIADORAS E FOTOCOPIADORAS|
|7339|SERVIÇO DE SECRETARIADO E ESTENOGRAFIA|
|7342|DEDETIZAÇÃO E DESINFECÇÃO|
|7343|SERVIÇO DE EXTERMINIO E DESINFETAÇÃO|
|7349|SERVIÇO LIMPEZA E MANUTENÇÃO|
|7361|AGÊNCIAS DE EMPREGO|
|7372|SERVIÇOS DE PROGRAMAÇÃO DE COMPUTADORES E PROCESS. DE DADOS|
|7375|SERVIÇO DE RECUPERAÇÃO DE INFORMAÇÃO|
|7379|COMPUTADORES: CONCERTOS E REPAROS|
|7392|CONSULTORIA EMPRESARIAL E SERVIÇOS DE RELAÇÕES PÚBLICAS|
|7393|AGÊNCIAS DE DETETIVES, PROTECÇÃO E DE SEGURANÇA|
|7394|ALUGUEL DE EQUIPAMENTO E MOBÍLIA DE ESCRITÓRIOS|
|7395|LABORATÓRIOS FOTOGRÁFICOS|
|7399|SERVIÇOS DE NEGÓCIOS|
|7511|PARADA DE CAMINHÕES (TRUCK STOP)|
|7512|ALUGUEL DE AUTOMÓVEIS (AUTOMOBILE RENTAL AGENCY)|
|7513|ALUGUEL DE CAMINHÕES (TRUCK/UTILITY TRAILER RENTALS)|
|7519|ALUGUEL DE MOTOR HOME (MOTOR HOME/RV RENTALS)|
|7523|ESTACIONAMENTOS E GARAGENS DE CARRO|
|7531|FUNILARIAS E PINTURA AUTOMOTIVA|
|7534|BORRACHARIAS|
|7535|LOJAS DE PINTURA DE AUTTOMÓVEIS|
|7538|SERVIÇOS PARA CARROS (NÃO CONCESIONARIA)|
|7542|LAVA JATO|
|7549|GUINCHO|
|7622|CONSERTO DE EQUIP. AUDIO E TV|
|7623|CONSERTO DE AR CONDICIONADO|
|7629|CONSERTO DE ELETRONICOS|
|7631|CONSERTO DE RELÓGIOS E JÓIAS|
|7641|RESTAURAÇÃO DE MÓVEIS (FURNITURE REPAIR)|
|7692|SERRALHEIROS E SOLDADORES|
|7699|LOJA DE CONSERTOS GERAIS E SERVIÇOS RELACIONADOS|
|7829|PRODUTORES E DISTRIBUIDORES DE FILMES|
|7832|CINEMAS, PRODUÇÕES CINEMATOGRÁFICAS|
|7841|LOJAS DE VIDEOS|
|7911|DANÇA (ESTUDIOS, ESCOLAS E SALÕES)|
|7922|TEATROS, PRODUC. TEATR. E ESPECTAC.|
|7929|BANDAS,ORQUESTRAS,ARTISTAS DIVERSOS(N CLASSIFICADO EM OUTRO)|
|7932|BARES DE SINUCA|
|7933|BOLICHE|
|7941|QUADRAS DE ESPORTE / PROPAGANDA ESPORTIVA|
|7991|ATRAÇÕES TURÍSTICAS E EXPOSIÇÕES|
|7992|AULAS DE GOLF PUBLICA|
|7993|FORNECEDORES DE MÁQUINAS DE VIDEOGAME OU JOGOS|
|7994|LOJAS DE DIVERSÃO / VIDEO GAME / LAN HOUSE / CIBER CAFÉ|
|7995|CASSINOS, LOTERIAS E JOGOS DE AZAR|
|7996|PARQUE DE DIVERSAO, CIRCO E AFINS|
|7997|ACADEMIAS / CLUBES|
|7998|AQUÁRIOS E ZOOLÓGICOS|
|7999|SERVIÇOS DE RECREAÇÃO E FESTAS|
|8011|MÉDICOS (CLÍNICAS E CONSULTÓRIOS)|
|8021|DENTISTAS E ORTODONTISTAS (CLÍNICAS E CONSULTÓRIOS)|
|8031|OSTEOPATAS|
|8041|QUIROPRAXIA|
|8042|OFTAMOLOGISTA E OPTOMETRISTAS|
|8043|OPTICIANS, OPTICAL GOODS, AND EYEGLASSES|
|8049|TRATAMENTOS PODIÁTRICOS|
|8050|CASAS DE REPOUSO, CLÍN. DE RECUPERAÇÃO E ENFERMAGEM|
|8062|HOSPITAIS|
|8071|ANALISES CLÍNICAS MÉDICAS E DENTAIS|
|8099|MEDICINA EM GERAL E PRATICANTES DE SERVIÇOS DE SAÚDE|
|8111|SERVIÇOS JURÍDICOS - ADVOGADOS|
|8211|EDUCAÇÃO PRIMÁRIA E SECUNDÁRIA (ELEM./SEC.S.)|
|8220|UNIVERSIDADES E FACULDADES (COLLEGES/UNIV/JC/PROF.)|
|8241|EDUACAÇÃO A DISTÂNCIA (CORRESPONDENCE SCHOOLS)|
|8244|ESCOLA DE COMÉRCIOS E SECRETARIADO (BUS./SEC. SCHOOL)|
|8249|ESCOLA DE NEGÓCIOS/VOCAÇÕES (TRADE/VOCATIONS S.)|
|8299|COLEGIOS (SCHOOLS)|
|8351|SERVIÇOS DE CUIDADOS DE CRIANÇAS (CHILD CARE SVCS)|
|8398|ORGANIZAÇÕES DE SERVIÇOS BENEFICENTES E SOCIAIS|
|8641|ASSOCIAÇÕES CÍVICAS E SOCIAIS|
|8651|ORGANIZAÇÕES POLITICAS|
|8661|ORGANIZAÇÕES RELIGIOSAS|
|8675|ASSOCIAÇÃO DE CARROS|
|8699|ORG. SIND., ASSOC. CULT. E OTRS ASSOC. NÃO CLASSIF.|
|8734|LABORATÓRIOS DE TESTE (PARA TESTES NÃO MÉDICOS)|
|8911|ARQUIRETURA, ENGENHARIA E AGRIMENSURA|
|8931|CONTABILIDADE, AUDITORIA E SERVIÇOS DE CONTABILIDADE|
|8999|OUTROS SERVIÇOS PROFISSIONAIS DE ESPECIALIZADOS|
|9211|PENSÃO ALIMENTÍCIA (COURT COSTS/ALIMONY/SUPPORT)|
|9222|MULTAS (FINES)|
|9223|PAGAMENTOS DE TÍTULOS E FINANÇAS (BAIL AND BOND P.)|
|9311|PAGAMENTOS DE IMPOSTOS (TAX PAYMENTS)|
|9399|SERVIÇOS GOVERNAMENTAIS (GOVT SERV - DEFAULT)|
|9402|POSTAGENS (POSTAGE STAMPS)|
|9405|COMPRAS GOVERNAMENTAIS (INTRA-GOVERNMENT PURCHASES)|
|9406|Loteria de Propriedade do Governo (Países Específicos|
|9950|DEPART. DE COMPRAS (INTRA- COMPANY PURCHASES)|

### Criar nova Loja

Cria um novo merchant.

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/merchants</span></aside>

```json
{
   "Owner":{
      "Name":"teste",
      "Email":"teste123@mail.com.br",
      "PhoneNumber":"11900000000",
      "MessengerPhone":"11900000000",
      "DocumentNumber":"33572628099"
   },
   "Address":{
      "ZipCode":"58015260",
      "Street":"",
      "Number":"123",
      "Complement":""
   },
   "TradeName":"TradeName",
   "CompanyName":"CompanyName",
   "Email":"teste@email.com.br",
   "PhoneNumber":"11900000099",
   "Mcc":26,
   "DocumentNumber":"07399049000199",
   "DocumentType":"Cnpj"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|String(Guid)|36|---|O ID que a loja subordinada deve assumir.|
|`Address.ZipCode`|String|9|Sim|CEP|
|`Address.Street`|String|120|Não|Localização|
|`Address.Number`|String|9|Sim|Número do endereço|
|`Address.Complement`|String|120|Não|Complemento do endereço|
|`TradeName`|String|35|Sim|Nome fantasia|
|`CompanyName`|String|35|Não|Razão social. Obrigatório quando o DocumentType for "Cnpj" - Pessoa Jurídica|
|`Email`|String|45|Sim|Endereço de email da loja|
|`PhoneNumber`|String|4|Sim|Telefone da loja|
|`Mcc`|Integer|4|Sim|Ramo de Atividade (MCC), obtido através de consultar ramos de atividade na tabela MCC.|
|`DocumentNumber`|String|20|Sim|CPF ou CNPJ da Loja|
|`DocumentType`|String|4|Sim|Enum: `Cpf` `Cnpj`|
|`SoftDescriptor`|String|13|Não|Descrição da fatura|
|`Owner.Name`|String|50|Sim|Nome do proprietario|
|`Owner.Email`|String|45|Sim|Email do proprietário|
|`Owner.PhoneNumber`|String|30|Sim|Telefone do proprietário|
|`Owner.MessengerPhone`|String|30|Sim|Whatsapp do proprietário|

#### Resposta

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|String(Guid)|36|---|O ID que a loja subordinada deve assumir.|
|`Address.ZipCode`|String|9|Sim|CEP|
|`Address.Street`|String|120|Não|Localização|
|`Address.Number`|String|9|Sim|Número do endereço|
|`Address.Complement`|String|120|Não|Complemento do endereço|
|`TradeName`|String|35|Sim|Nome fantasia|
|`CompanyName`|String|35|Não|Razão social. Obrigatório quando o DocumentType for "Cnpj" - Pessoa Jurídica|
|`Email`|String|45|Sim|Endereço de email da loja|
|`PhoneNumber`|String|4|Sim|Telefone da loja|
|`Mcc`|Integer|4|Sim|Ramo de Atividade (MCC), obtido através de consultar ramos de atividade na tabela MCC.|
|`DocumentNumber`|String|20|Sim|CPF ou CNPJ da Loja|
|`DocumentType`|String|4|Sim|Enum: `Cpf` `Cnpj`|
|`SoftDescriptor`|String|13|Não|Descrição da fatura|
|`Owner.Name`|String|50|Sim|Nome do proprietario|
|`Owner.Email`|String|45|Sim|Email do proprietário|
|`Owner.PhoneNumber`|String|30|Sim|Telefone do proprietário|
|`Owner.MessengerPhone`|String|30|Sim|Whatsapp do proprietário|

### Consulta Loja

Encontra uma loja subordinada pelo seu ID.

#### Resposta

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/merchants/{subordinatedMerchantId}</span></aside>

```json
{
   "Merchant":{
      "SubordinatedMerchantId":"string",
      "Owner":{
         "Name":"string",
         "Email":"string",
         "PhoneNumber":"string",
         "MessengerPhone":"string",
         "DocumentNumber":"string"
      },
      "SoftDescriptor":"description 1",
      "MerchantGroup":[
         {
            "Name":"New Merchant",
            "SubAcquirer":"SubAquirer",
            "Origin":"123",
            "Id":"123"
         }
      ],
      "MerchantGroupNames":[
         "name1",
         "name2"
      ]
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|String(Guid)|36|---|O ID que a loja subordinada deve assumir.|
|`Address.ZipCode`|String|9|Sim|CEP|
|`Address.Street`|String|120|Não|Localização|
|`Address.Number`|String|9|Sim|Número do endereço|
|`Address.Complement`|String|120|Não|Complemento do endereço|
|`TradeName`|String|35|Sim|Nome fantasia|
|`CompanyName`|String|35|Não|Razão social. Obrigatório quando o DocumentType for "Cnpj" - Pessoa Jurídica|
|`Email`|String|45|Sim|Endereço de email da loja|
|`PhoneNumber`|String|4|Sim|Telefone da loja|
|`Mcc`|Integer|4|Sim|Ramo de Atividade (MCC), obtido através de consultar ramos de atividade na tabela MCC.|
|`DocumentNumber`|String|20|Sim|CPF ou CNPJ da Loja|
|`DocumentType`|String|4|Sim|Enum: `Cpf` `Cnpj`|
|`SoftDescriptor`|String|13|Não|Descrição da fatura|
|`Owner.Name`|String|50|Sim|Nome do proprietario|
|`Owner.Email`|String|45|Sim|Email do proprietário|
|`Owner.PhoneNumber`|String|30|Sim|Telefone do proprietário|
|`Owner.MessengerPhone`|String|30|Sim|Whatsapp do proprietário|
|`MerchantGroup`|array[String]|---|Não|Lista de objetos do tipo MerchantGroup|
|`MerchantGroup.Name`|string|---|Sim|Nome do grupo|
|`MerchantGroup.SubAcquirer`|string|---|Sim|Subadquirente|
|`MerchantGroup.Origin`|string|---|Sim|Origem|
|`MerchantGroup.Id`|string|---|Sim|Id do grupo do Lojista|
|`MerchantGroupName`|array[string]|---|Não|Lista de nomes dos grupos do Lojista|

### Consulta paginada de Lojas

Consulta Lojas de forma paginada

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/merchants/paged?{documentnumber}&{email}&{pageSize}&{page}</span></aside>

**Query Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`email`|String|45|Sim|O email de cadastro da Loja|
|`DocumentNumber`|String|15|Não|Número da documentacao da Loja/Lojista. CPF ou CNPJ sem máscara|
|`pageSize`|Integer|3|Não|Número de itens por página. Máximo de 100 por página.|
|`page`|Integer|---|Não|Retorna os registros da página informada. Deve ser utilizado quando a quantidade de páginas

```json
{
  "Page": 1,
  "TotalPages": 1,
  "TotalElements": 2,
  "Content": [
    {
      "Owner": {
        "Name": "nome sobrenome",
        "Email": "owner@email.com",
        "PhoneNumber": "1234567",
        "MessengerPhone": "1234567"
      },
      "SubordinatedMerchantId": "12345678-1234-1234-1234-123456789012",
      "Address": {
        "ZipCode": "999999",
        "Street": "endereco",
        "Number": "123",
        "Complement": ""
      },
      "TradeName": "nome descricao",
      "CompanyName": "nome da loja",
      "Email": "loja@email.com.br",
      "PhoneNumber": "1234567",
      "Mcc": 412,
      "DocumentNumber": "1234567",
      "SoftDescriptor": "description 1",
      "DocumentType": "Cpf",
      "MerchantGroup": [
        {
          "Name": "grupo",
          "SubAcquirer": "SubAquirer",
          "Origin": "123",
          "Id": "123"
        }
      ],
      "MerchantGroupNames": [
        "name1",
        "name2"
      ]
    },
    {
      "Owner": {
        "Name": "nome sobrenome",
        "Email": "owner@email.com",
        "PhoneNumber": "1234567",
        "MessengerPhone": "1234567"
      },
      "SubordinatedMerchantId": "12345678-1234-1234-1234-123456789012",
      "Address": {
        "ZipCode": "999999",
        "Street": "endereco",
        "Number": "123",
        "Complement": ""
      },
      "TradeName": "nome descricao",
      "CompanyName": "nome da loja",
      "Email": "loja@email.com",
      "PhoneNumber": "1234567",
      "Mcc": 412,
      "DocumentNumber": "1234567",
      "DocumentType": "Cpf",
      "SoftDescriptor": "description 2",
      "MerchantGroup": [
        {
          "Name": "grupo",
          "SubAcquirer": "SubAquirer",
          "Origin": "123",
          "Id": "123"
        }
      ],
      "MerchantGroupNames": [
        "name1",
        "name2"
      ]
    }
  ],
  "Size": 10
}
```

#### Resposta

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Page`|Integer|---|Sim|Número da página atual|
|`TotalPages`|Integer|---|Sim|Quantidade total de páginas|
|`TotalElements`|Integer|---|Sim|Quantidade total de itens encontrados|
|`Size`|Integer|---|Sim|Quantidade de itens por página|
|`Content.SubordinatedMerchantId`|String (Guid)|36|Não ID que a loja subordinada deve assumir.|
|`Content.Address.ZipCode`|String|9|Sim|CEP|
|`Content.Address.Street`|String|120|Não|Localização|
|`Content.Address.Number`|String|9|Sim|Número do endereço|
|`Content.Address.Complement`|String|120|Não|Complemento do endereço|
|`Content.TradeName`|String|35|Sim|Nome|fantasia|
|`Content.CompanyName`|String|35|Não|Razão social. Obrigatório quando o DocumentType for "Cnpj" - Pessoa Jurídica|
|`Content.Email`|String|45|Sim|Endereço de email da loja|
|`Content.PhoneNumber`|String|30|Sim|Telefone da loja|
|`Content.Mcc`|Integer|4|Sim|Ramo de Atividade (MCC), obtido através de consultar ramos de atividade na tabela MCC.|
|`Content.DocumentNumber`|String|20|Sim|CPF ou CNPJ da Loja|
|`Content.DocumentType`|String|4|Sim|Enum: "Cpf" ou "Cnpj"|
|`Content.SoftDescriptor`|String|13|Não|Descrição da fatura|
|`Content.Owner.Name`|String|50|Sim|Nome do proprietario|
|`Content.Owner.Email`|String|45|Sim|Email do proprietário|
|`Content.Owner.PhoneNumber`|String|30|Sim|Telefone do proprietário|
|`Content.Owner.MessengerPhone`|String|30|Sim|Whatsapp do proprietário|
|`Content.MerchantGroup`|array[String]|---|Não|Lista de objetos do tipo MerchantGroup|
|`Content.MerchantGroup.Name`|string|---|Sim|Nome do grupo|
|`Content.MerchantGroup.SubAcquirer`|string|---|Sim|Subadquirente|
|`Content.MerchantGroup.Origin`|string|---|Sim|Origem|
|`Content.MerchantGroup.Id`|string|---|Sim|Id do grupo do Lojista|
|`Content.MerchantGroupName`|array[string]|---|Não|Lista de nomes dos grupos do Lojista|

### Atualiza uma Loja

Salva alterações em na loja subordinado com o ID especificado.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/merchants/{subordinatedMerchantId}</span></aside>

```json
{
   "Address":{
      "ZipCode":"58015260",
      "Street":"",
      "Number":"123",
      "Complement":""
   },
   "TradeName":"TradeName",
   "CompanyName":"CompanyName",
   "Email":"teste@email.com.br",
   "PhoneNumber":"11900000099",
   "Mcc":26,
   "DocumentNumber":"07399049000199",
   "DocumentType":"Cnpj"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Address.ZipCode`|String|9|Sim|CEP|
|`Address.Street`|String|120|Não|Localização|
|`Address.Number`|String|9|Sim|Número do endereço|
|`Address.Complement`|String|120|Não|Complemento do endereço|
|`TradeName`|String|35|Sim|Nome fantasia|
|`CompanyName`|String|35|Não|Razão social. Obrigatório quando o DocumentType for "Cnpj" - Pessoa Jurídica|
|`Email`|String|45|Sim|Endereço de email da loja|
|`PhoneNumber`|String|4|Sim|Telefone da loja|
|`Mcc`|Integer|4|Sim|Ramo de Atividade (MCC), obtido através de consultar ramos de atividade na tabela MCC.|
|`DocumentNumber`|String|20|Sim|CPF ou CNPJ da Loja|
|`DocumentType`|String|4|Sim|Enum: `Cpf` `Cnpj`|
|`SoftDescriptor`|String|13|Não|Descrição da fatura|

## Terminal

**Atenção:** É necessário ter um terminal ID para cada terminal físico (equipamento) cadastrado na plataforma. Exemplo: Se o lojista possui 5 terminais físicos (equipamentos), ele deve ter 5 terminais ID.

Nosso sistema impede que o mesmo Terminal faça mais de um pagamento simultâneo. Caso um terminal ID esteja associado a mais de um equipamento, pagamentos efetuados por esse mesmo terminal poderão ser rejeitados.

Lembramos que os dados informados no cadastro de Loja/Terminal/Equipamento são de responsabilidade do cliente.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://merchantapisandbox.cieloecommerce.cielo.com.br      | https://merchantapi.cieloecommerce.cielo.com.br      |

### Criar Terminal sem Equipamento

Salva alterações em na loja subordinado com o ID especificado.

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/terminals</span></aside>

```json
{
   "SubordinatedMerchantId":"{{SubordinatedMerchantId}}",
   "CommunicationType":"S920_WIFI",
   "SkipEquipment":true,
   "TerminalId":"12345678"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`CommunicationType`|String|---|Sim|Perfil de Comunicação|
|`TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|
|`SkipEquipment`|boolean|---|Não|Default:false. Se não desejar informar o equipamento ao terminal|

#### Resposta

```json
{
   "Terminal":{
      "SubordinatedMerchantId":"cb7c0ca4-54e7-43fa-ab79-aab33662a41a",
      "SkipEquipment":true,
      "CommunicationType":"PERFIL_PADRAO",
      "TerminalId":"abcde001",
      "AcquirerIds":[
         
      ]
   },
   "Activation":{
      "Token":"vEVOvnSl",
      "CreateDate":"2021-06-04T16:04:41.5438878-03:00",
      "ExpireDate":"2021-06-04T17:04:41.5439834-03:00"
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Terminal.CommunicationType`|String|---Sim|Perfil de Comunicação|
|`Terminal.TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`Terminal.SubordinatedMerchantId`|String (Guid)36|Sim|ID da loja subordinada vinculada ao terminal|
|`Terminal.SkipEquipment`|boolean|---|Sim|Default: false<br><br>Se não desejar informar o equipamento relacionado ao terminal|
|`Terminal.AcquirerIds`|Array of integers|---|---|Lista de identifcadores de adquirentes configurados no terminal. Cielo = 4.|
|`Activation.Token`|String|---|Sim|Token de ativação de terminal|
|`Activation.CreateDate`|String (DateTime)|---|Sim|Data da geração do token|
|`Activation.ExpireDate`|String (DateTime)|---|Sim|Data da expiração do token|

### Criar Terminal com Equipamento

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/terminals</span></aside>

```json
{
   "SubordinatedMerchantId":"{{SubordinatedMerchantId}}",
   "CommunicationType":"S920_WIFI",
   "EquipmentModel":1,
   "EquipmentSerialNumber":"abc123",
   "TerminalId":"12345678"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`CommunicationType`|String|---|Sim|Perfil de Comunicação|
|`EquipmentModel`|Integer|---|Sim|Modelo do equipamento previamente cadastrado. Campo obrigatorio quando EquipmentSerialNumber é informado|
|`EquipmentSerialNumber`|String|---|Sim|Número serial do equipamento previamente cadastrado. Campo obrigatorio quando EquipmentModel é informado|
|`TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|
|`SkipEquipment`|boolean|---|Não|Default:false. Se não desejar informar o equipamento ao terminal|

#### Resposta

```json
{
  "Terminal": {
    "SubordinatedMerchantId": "cb7c0ca4-54e7-43fa-ab79-aab33662a41a",
    "SkipEquipment": false,
    "CommunicationType": "S920_WIFI",
    "EquipmentModel": 1,
    "EquipmentSerialNumber": "01020i",
    "TerminalId": "abcd000i",
    "AcquirerIds": []
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Terminal.CommunicationType`|String|---Sim|Perfil de Comunicação|
|`Terminal.EquipmentModel`|Integer|---|Sim|Modelo do equipamento previamente cadastrado. Campo obrigatorio quando EquipmentSerialNumber é informado|
|`Terminal.EquipmentSerialNumber`|String|---|Sim|Número serial do equipamento previamente cadastrado. Campo obrigatorio quando EquipmentModel é informado|
|`Terminal.TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`Terminal.SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|
|`Terminal.SkipEquipment`|boolean|---|Sim|Default: false<br><br>Se não desejar informar o equipamento relacionado ao terminal.|
|`Terminal.AcquirerIds`|Array of integers|---|---|Lista de identifcadores de adquirentes configurados no terminal. Cielo = 4.|

### Desabilita um Terminal

Desabilita um terminal removendo o vínculo com um equipamento físico.

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/terminals/disable</span></aside>

```json
{
  "SubordinatedMerchantId": "{{SubordinatedMerchantId}}",
  "TerminalId": "12345678"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|
|`TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|

### Criar Token de ativação

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/terminals/token</span></aside>

```json
{
   "SubordinatedMerchantId":"{{SubordinatedMerchantId}}",
   "TerminalId":"12345678"
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|

#### Resposta

```json
{
  "TerminalId": "abcd000j",
  "SubordinatedMerchantId": "cb7c0ca4-54e7-43fa-ab79-aab33662a41a",
  "Activation": {
    "Token": "vEVOvnSl",
    "CreateDate": "2017-11-28T12:12:06.088-02:00",
    "ExpireDate": "2017-11-28T13:12:06.088-02:00"
  }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Terminal.TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`SubordinatedMerchantId`|String (Guid)|36|Não|ID da loja subordinada vinculada ao terminal|
|`Activation.Token`|String|---|Sim|Token de ativação de terminal|
|`Activation.CreateDate`|String (Date-time)|---|Sim|Data da geração do token|
|`Activation.ExpireDate`|String (Date-time)|---|Sim|Data da expiração do token|

### Consulta Terminais

Consulta terminais de forma paginada

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/terminals?page=13&pageSize=10&subordinatedMerchantId={SubordinatedMerchantId}</span></aside>

```json
{
   "SubordinatedMerchantId":"{{SubordinatedMerchantId}}",
   "TerminalId":"12345678"
}
```

**Query Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`TerminalId`|String|8|Sim|Identificação do Terminal Lógico na PayStore. Identificação única para o mesmo Lojista.|
|`SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|
|`pageSize`|Integer|3|Não|Tamanho da página (Máximo = 100 registros por página)|
|`page`|Integer|---|Não|Retorna os registros da página informada. Deve ser utilizado quando a quantidade de páginas na resposta for maior que 1. Página inicial: 1|

#### Resposta

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Page`|Integer|---|Sim|Número da página atual|
|`TotalPages`|Integer|---|Sim|Quantidade total de páginas|
|`TotalElements`|Integer|---|Sim|Quantidade total de itens encontrados|
|`Size`|Integer|3|Sim|Quantidade de itens por página|
|`Content.SubordinatedMerchantId`|String (Guid)|36|Sim|ID da loja subordinada vinculada ao terminal|
|`Content.TerminalId`|String|8|Sim|ID do terminal|
|`Content.Status`|String|---|Sim|Estado atual do terminal|
|`Content.EquipmentSerialNumber`|String|---|Não|Número de série do equipamento vinculado a este terminal|
|`Content.EquipmentModelName`|String|---|Sim|Nome do equipamento vinculado a este terminal|
|`Content.EquipmentModelManufacturer`|String|---|Não|Nome do fabricante do equipamento vinculado a este terminal|
|`Content.EquipmentModelType`|String|---|Não|Tipo do equipamento vinculado a este terminal|
|`Content.CommunicationType`|String|---|Não|Perfil de comunicação do equipamento vinculado a este terminal|
|`Content.TefConfigs.TefAcquirer`|String|1|Sim|Identificado do adquirente (4 = Cielo) para o terminal|
|`Content.TefConfigs.TefTerminal`|String|---|Não|Número utilizado pelo adquirente para identificar o terminal|
|`Content.TefConfigs.MerchantConfig.TefAcquirer`|String|---|Não|Identificado do adquirente (4 = Cielo) para o merchant|
|`Content.TefConfigs.MerchantConfig.SpecificId`|String|---|Não|Número do estabelecimento no adquirente|
|`Content.TefConfigs.MerchantConfig.Enabled`|Boolean|---|Não|Indica se o lojista está habilitado no cliente|
|`Content.TefConfigs.MerchantConfig.Priority`|Integer|---|Não|Prioridade do Adquirente (1 é o valor com maior prioridade)|

## Equipamento

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://merchantapisandbox.cieloecommerce.cielo.com.br      | https://merchantapi.cieloecommerce.cielo.com.br      |

### Consulta Equipamento

Fornece os dados de um equipamento, a partir do modelo do equipamento e de seu número serial.

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/equipments/{modelId}/{serialNumber}</span></aside>

**Path Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`modelId`|integer|---|Sim|Código de identificação do modelo do equipamento.|
|`serialNumber`|String (Guid)|---|Sim|Número serial do equipamento.|

```json
{
   "SubordinatedMerchantId":"{{SubordinatedMerchantId}}",
   "TerminalId":"12345678"
}
```

#### Resposta

```json
{
  "Model": 0,
  "SerialNumber": "string",
  "ModelName": "string",
  "ModelManufacturer": "string",
  "ModelType": "string"
}
```

|`Model`|integer2|Sim|Código do Equipamento.|
|`SerialNumber`|string|---|Sim|Número serial do equipamento.|
|`ModelName`|string|---|Sim|Modelo do equipamento.|
|`ModelManufacturer`|string|---|Não|Modelo do equipamento.|
|`ModelType`|string|---|Não|Tipo do equipamento.|

### Consulta paginada de Equipamentos

Fornece os dados, de forma paginada, de equipamentos cadastrados no sistema

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/equipments/paged?pageSize=10&page=1</span></aside>

**Query Parameters:**

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`pageSize`|Integer|3|Não|Tamanho da página (Máximo = 100 registros por página).|
|`page`|Integer|---|Não|Retorna os registros da página informada. Deve ser utilizado quando a quantidade de páginas na resposta for maior que 1. Página inicial: 1|

#### Resposta

```json
{
  "Page": 0,
  "TotalPages": 0,
  "TotalElements": 0,
  "Size": 0,
  "Equipments": [
    {
      "Model": 0,
      "SerialNumber": "string",
      "ModelName": "string",
      "ModelManufacturer": "string",
      "ModelType": "string"
    }
  ]
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Page`|Integer|---|Sim|Número da página atual|
|`TotalPages`|Integer|---|Sim|Quantidade total de páginas|
|`TotalElements`|Integer|---|Sim|Quantidade total de itens encontrados|
|`Size`|Integer|3|Sim|Quantidade de itens por página|
|`Equipments.Model`|integer|2|Sim|Código do Equipamento.|
|`Equipments.SerialNumber`|string|---|Sim|Número serial do equipamento.|
|`Equipments.ModelName`|string|---|Sim|Modelo do equipamento.|
|`Equipments.ModelManufacturer`|string|---|Não|Modelo do equipamento.|
|`Equipments.ModelType`|string|---|Não|Tipo do equipamento.|
