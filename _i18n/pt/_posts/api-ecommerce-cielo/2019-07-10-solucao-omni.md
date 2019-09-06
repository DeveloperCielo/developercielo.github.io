---
layout: manual
title: Manual de Integração Solução Omni
description: API para integração de vendas no físico e OnLine
search: true
translated: false
toc_footers: true
categories: manual
sort_order: 1
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
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|Texto|---|---|---|
|`Payment.SoftDescriptor`|Texto|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|Texto|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`CreditCard.CardNumber`|---|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.SecurityCodeStatus`|Texto|---|---|---|
|`CreditCard.SecurityCode`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.IssuerId`|---|---|---|---|
|`CreditCard.InputMode`|Texto|---|---|---|
|`CreditCard.AuthenticationMethod`|Texto|---|---|---|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|Texto|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|Texto|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

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
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|Texto|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|Texto|---|---|---|
|`Payment.Capture`|Texto|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.IssuerId`|---|---|---|---|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|---|
|`CreditCard.InputMode`|Texto|---|---|---|
|`CreditCard.AuthenticationMethod`|Texto|---|---|---|
|`CreditCard.EmvData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|Texto|---|---|---|
|`PinBlock.KsnIdentification`|Texto|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|Texto|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|Texto|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|Texto|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|Texto|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Booleano|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|Texto|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|Texto|---|---|---|
|`Payment.Currency`|---|---|---|---|
|`Payment.Country`|Texto|---|---|---|

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
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.SecurityCodeStatus`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.IssuerId`|---|---|---|---|
|`CreditCard.InputMode`|---|---|---|---|
|`CreditCard.AuthenticationMethod`|---|---|---|---|
|`CreditCard.TrackOneData`|---|---|---|---|
|`CreditCard.TrackTwoData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`CreditCard.PanSequenceNumber`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

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
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
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
|`CreditCard.PanSequenceNumber`|---|---|---|---|
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
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`DebitCard.ExpirationDate`|---|---|---|---|
|`DebitCard.SecurityCodeStatus`|---|---|---|---|
|`DebitCard.BrandId`|---|---|---|---|
|`DebitCard.IssuerId`|---|---|---|---|
|`DebitCard.InputMode`|---|---|---|---|
|`DebitCard.AuthenticationMethod`|---|---|---|---|
|`DebitCard.TrackOneData`|---|---|---|---|
|`DebitCard.TrackTwoData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`DebitCard.PanSequenceNumber`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

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
|`CreditCard.PanSequenceNumber`|---|---|---|---|
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
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.InputMode`|---|---|---|---|
|`CreditCard.AuthenticationMethod`|---|---|---|---|
|`CreditCard.EmvData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`CreditCard.PanSequenceNumber`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

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
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
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
|`CreditCard.PanSequenceNumber`|---|---|---|---|
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
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`DebitCard.ExpirationDate`|---|---|---|---|
|`DebitCard.BrandId`|---|---|---|---|
|`DebitCard.IssuerId`|---|---|---|---|
|`DebitCard.InputMode`|---|---|---|---|
|`DebitCard.AuthenticationMethod`|---|---|---|---|
|`DebitCard.EmvData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`DebitCard.PanSequenceNumber`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

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
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
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
|`CreditCard.PanSequenceNumber`|---|---|---|---|
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
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`VoucherCard.ExpirationDatev`|---|---|---|---|
|`VoucherCard.BrandId`|---|---|---|---|
|`VoucherCard.IssuerId`|---|---|---|---|
|`VoucherCard.InputMode`|---|---|---|---|
|`VoucherCard.AuthenticationMethod`|---|---|---|---|
|`VoucherCard.EmvData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|---|---|---|---|
|`PinBlock.KsnIdentification`|---|---|---|---|
|`VoucherCard.PanSequenceNumber`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

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
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
|`Payment.Capture`|---|---|---|---|
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
|`CreditCard.PanSequenceNumber`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`EmvData`|---|---|---|---|
|`IssuerScriptResults`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`MerchantVoidId`|---|---|---|---|
|`MerchantVoidDate`|---|---|---|---|
|`Card.InputMode`|---|---|---|---|
|`Card.CardNumber`|---|---|---|---|

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
|`VoidId`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`MerchantVoidId`|---|---|---|---|
|`MerchantVoidDate`|---|---|---|---|
|`Card.InputMode`|---|---|---|---|
|`Card.TrackOneData`|---|---|---|---|
|`Card.TrackTwoData`|---|---|---|---|

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
|`VoidId`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|

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
|`EmvData`|---|---|---|---|
|`IssuerScriptsResults`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|

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
|`EmvData`|---|---|---|---|
|`IssuerScriptsResults`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

## Desfazimento de pagamento de cartão digitado

Quando o pagamento não retornar, o mesmo deve ser desfeito.

Para solicitar o desfazimento é necessário informar o MerchantOrderId enviado no pagamento.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`EmvData`|---|---|---|---|
|`IssuerScriptsResults`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`EmvData`|---|---|---|---|
|`IssuerScriptsResults`|---|---|---|---|

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
|`ConfirmationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

# Desfazimento de cancelamento

Desfaz um cancelamento

## Desfaz um cancelamento

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}/voids/{VoidId}</span></aside>

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
|`CancellationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`CancellationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

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
|`CancellationStatus`|---|---|---|---|
|`Status`|---|---|---|---|
|`ReturnCode`|---|---|---|---|
|`ReturnMessage`|---|---|---|---|

# Baixa de parâmetros

Essa operação é necessária para que o parceiro de negócio / Subadquirente receba todas as tabelas de parâmetros necessários para que a solução de captura possa efetuar as transações via chamada de API. Essa informação será recebida através de API e deverá ser instalada na BC

## Inicialização de um terminal

Solicita as tabelas e parametros para operação do terminal

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://parametersdownloadsandbox.cieloecommerce.cielo.com.br/api/v0.1      | https://parametersdownload.cieloecommerce.cielo.com.br/api/v0.1      |

### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/initialization/{TerminalId}</span></aside>

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
|`MerchantId`|---|---|---|---|
|`TerminalId`|---|---|---|---|
|`Acquirer.EnableContaclessCardReader`|---|---|---|---|
|`Acquirer.LockAppFunctionsExceptInitialization`|---|---|---|---|
|`Acquirer.HasChipReader`|---|---|---|---|
|`Acquirer.HasMagneticTrackReader`|---|---|---|---|
|`Acquirer.HasKeyboard`|---|---|---|---|
|`Merchant.MerchantId`|---|---|---|---|
|`Merchant.NetworkName`|---|---|---|---|
|`Merchant.MerchantName`|---|---|---|---|
|`Merchant.MerchantAddress`|---|---|---|---|
|`Merchant.NationalId`|---|---|---|---|
|`Bins.InitialBin`|---|---|---|---|
|`Bins.FinalBin`|---|---|---|---|
|`Bins.ProductId`|---|---|---|---|
|`Bins.Type`|---|---|---|---|
|`Bins.AllowFallbackWhenChipReadingFails`|---|---|---|---|
|`Bins.AllowChargingMoedeiroFromCash`|---|---|---|---|
|`Bins.AllowPurchaseWithCompreESaque`|---|---|---|---|
|`Bins.AllowOfflineFunctionExceptForEMVCard`|---|---|---|---|
|`Bins.AllowTypingCardNumber`|---|---|---|---|
|`Bins.MaskCardNumberUsingLast4Digits`|---|---|---|---|
|`Bins.MaskCardNumberUsingFirst6AndLas4Digits`|---|---|---|---|
|`Bins.AllowPrintCardHolderBalance`|---|---|---|---|
|`Bins.AllowDisplayCardHolderBalance`|---|---|---|---|
|`Bins.AllowPrintingPartialCardNumberInReceipt`|---|---|---|---|
|`Bins.RestrictSaleWithDuplicateValueWhenPostdated`|---|---|---|---|
|`Bins.RestrictSaleWithDuplicateValueWhenPostdated`|---|---|---|---|
|`Bins.RequiresPassword`|---|---|---|---|
|`Bins.InterpretsLastDigitOfSecurityCode`|---|---|---|---|
|`Bins.RequiresPasswordExceptForEMVCard`|---|---|---|---|
|`Bins.EnableAdditionalSecurityCodeOptions_Unreadable_NoCode`|---|---|---|---|
|`Bins.RequiresSecurityCodeWhenMagneticTrackIsRead`|---|---|---|---|
|`Bins.RequiresSecurityCodeWhenCardNumberIsTyped`|---|---|---|---|
|`Bins.RequiresTypingLast4Digits`|---|---|---|---|
|`Bins.AllowCaptureOfFirstInstallmentValue`|---|---|---|---|
|`Bins.AllowCaptureOfDownpaymentValue`|---|---|---|---|
|`Bins.AllowGuaranteeHandling`|---|---|---|---|
|`Bins.AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery`|---|---|---|---|
|`Bins.AllowPostdating`|---|---|---|---|
|`Bins.AllowCDCSale`|---|---|---|---|
|`Bins.AllowFinancingByStore`|---|---|---|---|
|`Bins.AllowFinancingByCreditCardCompany`|---|---|---|---|
|`Bins.ValidateCardTrack1`|---|---|---|---|
|`Bins.DoNotValidateCardModule10`|---|---|---|---|
|`Bins.CheckExpiryDateWhenCardNumberIsTyped`|---|---|---|---|
|`Bins.CheckExpiryDateWhenMagneticTrackIsRead`|---|---|---|---|
|`Bins.IssuerId`|---|---|---|---|
|`Products.ProductId`|---|---|---|---|
|`Products.ProductName`|---|---|---|---|
|`Products.ProductType`|---|---|---|---|
|`Products.BrandId`|---|---|---|---|
|`Products.AllowTransactionWithContactlessCard`|---|---|---|---|
|`Products.IsFinancialProduct`|---|---|---|---|
|`Products.AllowOfflineAuthorizationForEMVCard`|---|---|---|---|
|`Products.AllowReprintReceipt`|---|---|---|---|
|`Products.AllowPrintReceipt`|---|---|---|---|
|`Products.AllowOfflineAuthorizationForContactlessCard`|---|---|---|---|
|`Products.AllowCancel`|---|---|---|---|
|`Products.AllowUndo`|---|---|---|---|
|`Products.AllowCaptureOfFirstInstallmentValue`|---|---|---|---|
|`Products.AllowCaptureOfDownpaymentValue`|---|---|---|---|
|`Products.AllowGuaranteeHandling`|---|---|---|---|
|`Products.AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery`|---|---|---|---|
|`Products.AllowPostdating`|---|---|---|---|
|`Products.AllowCDCSale`|---|---|---|---|
|`Products.AllowFinancingByStore`|---|---|---|---|
|`Products.AllowFinancingByCreditCardCompany`|---|---|---|---|
|`Products.MaximumNumberOfInstallmentsWhenFinancingByCreditCardCompany`|---|---|---|---|
|`Products.MaximumNumberOfInstallmentsWhenFinancingByStore`|---|---|---|---|
|`Products.MaximumNumberOfinstallmentsForSaleAndCDCQuery`|---|---|---|---|
|`Products.MinimumNumberOfInstallmentsWhenFinancingByStore`|---|---|---|---|
|`Products.SaleGuaranteeType`|---|---|---|---|
|`Products.PostdatedDayCountLimit`|---|---|---|---|
|`Products.FirstInstallmentDayCountLimit`|---|---|---|---|
|`Emv.Aid`|---|---|---|---|
|`Emv.TagsFirst`|---|---|---|---|
|`Emv.TagsSecond`|---|---|---|---|
|`Emv.IdxRecord`|---|---|---|---|
|`Emv.Type`|---|---|---|---|
|`Emv.RCodeFirst`|---|---|---|---|
|`Emv.RCodeSecond`|---|---|---|---|
|`Emv.InvalidateFunctionIfCardIsOnBlacklist`|---|---|---|---|
|`Emv.RequireBINToBeInCardRangeTable`|---|---|---|---|
|`Emv.StoreTransactionsRejectedByTerminalAppAndSendToHost`|---|---|---|---|
|`Emv.NatEmvConctactRiskFloorLimit`|---|---|---|---|
|`Emv.NatEmvConctactRiskMinValue`|---|---|---|---|
|`Emv.NatEmvConctactRiskMinPercent`|---|---|---|---|
|`Emv.NatEmvConctactRiskMaxPercent`|---|---|---|---|
|`Emv.IntEmvConctactRiskFloorLimit`|---|---|---|---|
|`Emv.IntEmvConctactRiskMinValue`|---|---|---|---|
|`Emv.IntEmvConctactRiskMinPercent`|---|---|---|---|
|`Emv.IntEmvConctactRiskMaxPercent`|---|---|---|---|
|`Emv.ProductIds`|---|---|---|---|
|`Parameters.Currency`|---|---|---|---|
|`Parameters.AllowFallbackWhenChipReadingFails`|---|---|---|---|
|`Parameters.AllowChargingMoedeiroFromCash`|---|---|---|---|
|`Parameters.AllowPurchaseWithCompreESaque`|---|---|---|---|
|`Parameters.AllowOfflineFunctionExceptForEMVCard`|---|---|---|---|
|`Parameters.AllowTypingCardNumber`|---|---|---|---|
|`Parameters.MaskCardNumberUsingLast4Digits`|---|---|---|---|
|`Parameters.MaskCardNumberUsingFirst6AndLas4Digits`|---|---|---|---|
|`Parameters.AllowPrintCardHolderBalance`|---|---|---|---|
|`Parameters.AllowDisplayCardHolderBalance`|---|---|---|---|
|`Parameters.AllowPrintingPartialCardNumberInReceipt`|---|---|---|---|
|`Parameters.RestrictSaleWithDuplicateValueWhenPostdated`|---|---|---|---|
|`Parameters.RestrictSaleWithDuplicateValue`|---|---|---|---|
|`Parameters.RequiresPassword`|---|---|---|---|
|`Parameters.InterpretsLastDigitOfSecurityCode`|---|---|---|---|
|`Parameters.RequiresPasswordExceptForEMVCard`|---|---|---|---|
|`Parameters.EnableAdditionalSecurityCodeOptions_Unreadable_NoCode`|---|---|---|---|
|`Parameters.RequiresSecurityCodeWhenMagneticTrackIsRead`|---|---|---|---|
|`Parameters.RequiresSecurityCodeWhenCardNumberIsTyped`|---|---|---|---|
|`Parameters.RequiresTypingLast4Digits`|---|---|---|---|
|`Parameters.CapturesServiceFee`|---|---|---|---|
|`Parameters.AllowCancellationWithValueGreaterThanTheValueOfTheSale`|---|---|---|---|
|`Parameters.CaptureBoardingFee`|---|---|---|---|
|`Issuers.IssuerId`|---|---|---|---|
|`Issuers.IssuerName`|---|---|---|---|
|`Issuers.AllowFallbackWhenChipReadingFails`|---|---|---|---|
|`Issuers.AllowChargingMoedeiroFromCash`|---|---|---|---|
|`Issuers.AllowPurchaseWithCompreESaque`|---|---|---|---|
|`Issuers.AllowOfflineFunctionExceptForEMVCard`|---|---|---|---|
|`Issuers.AllowTypingCardNumber`|---|---|---|---|
|`Issuers.MaskCardNumberUsingLast4Digits`|---|---|---|---|
|`Issuers.MaskCardNumberUsingFirst6AndLas4Digits`|---|---|---|---|
|`Issuers.AllowPrintCardHolderBalance`|---|---|---|---|
|`Issuers.AllowDisplayCardHolderBalance`|---|---|---|---|
|`Issuers.Option03BiAllowPrintingPartialCardNumberInReceipt07`|---|---|---|---|
|`Issuers.RestrictSaleWithDuplicateValueWhenPostdated`|---|---|---|---|
|`Issuers.RestrictSaleWithDuplicateValue`|---|---|---|---|
|`Issuers.RequiresPassword`|---|---|---|---|
|`Issuers.InterpretsLastDigitOfSecurityCode`|---|---|---|---|
|`Issuers.RequiresPasswordExceptForEMVCard`|---|---|---|---|
|`Issuers.EnableAdditionalSecurityCodeOptions_Unreadable_NoCode`|---|---|---|---|
|`Issuers.RequiresSecurityCodeWhenMagneticTrackIsRead`|---|---|---|---|
|`Issuers.RequiresSecurityCodeWhenCardNumberIsTyped`|---|---|---|---|
|`Issuers.RequiresTypingLast4Digits`|---|---|---|---|
|`Issuers.AllowCaptureOfFirstInstallmentValue`|---|---|---|---|
|`Issuers.AllowCaptureOfDownpaymentValue`|---|---|---|---|
|`Issuers.AllowGuaranteeHandling`|---|---|---|---|
|`Issuers.AllowPostdatingTheFirstInstallmentForSaleAndCDCQuery`|---|---|---|---|
|`Issuers.AllowPostdating`|---|---|---|---|
|`Issuers.AllowCDCSale`|---|---|---|---|
|`Issuers.AllowFinancingByStore`|---|---|---|---|
|`Issuers.AllowFinancingByCreditCardCompany`|---|---|---|---|
|`Issuers.RequiresChipReader`|---|---|---|---|
|`Issuers.RequiresPinpad`|---|---|---|---|
|`Issuers.LimitDayforReversal`|---|---|---|---|
|`Issuers.LimitValueforReversal`|---|---|---|---|
|`Issuers.LimitPercentforReversal`|---|---|---|---|
|`Issuers.IssuerNameForDisplay`|---|---|---|---|
|`Issuers.IssuerNameForPrint`|---|---|---|---|
|`AidParameters`|---|---|---|---|
|`PublicKeys`|---|---|---|---|
|`InitializationVersion`|---|---|---|---|

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
|`Address.ZipCode`|---|---|---|---|
|`Address.Street`|---|---|---|---|
|`Address.Number`|---|---|---|---|
|`Address.Number`|---|---|---|---|
|`TradeName`|---|---|---|---|
|`CompanyName`|---|---|---|---|
|`Email`|---|---|---|---|
|`PhoneNumber`|---|---|---|---|
|`Mcc`|---|---|---|---|
|`DocumentNumber`|---|---|---|---|
|`DocumentType`|---|---|---|---|
|`Owner.Name`|---|---|---|---|
|`Owner.Email`|---|---|---|---|
|`Owner.PhoneNumber`|---|---|---|---|
|`Owner.MessengerPhone`|---|---|---|---|
|`Owner.Gender`|---|---|---|---|

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
|`Owner.Name`|---|---|---|---|
|`Owner.Email`|---|---|---|---|
|`Owner.PhoneNumber`|---|---|---|---|
|`Owner.MessengerPhone`|---|---|---|---|
|`Owner.Gender`|---|---|---|---|

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
|`Address.ZipCode`|---|---|---|---|
|`Address.Street`|---|---|---|---|
|`Address.Number`|---|---|---|---|
|`Address.Complement`|---|---|---|---|
|`TradeName`|---|---|---|---|
|`CompanyName`|---|---|---|---|
|`Email`|---|---|---|---|
|`PhoneNumber`|---|---|---|---|
|`Mcc`|---|---|---|---|
|`DocumentNumber`|---|---|---|---|

## Terminal

Cria um novo terminal.

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
|`TerminalBaseModel.CommunicationType`|---|---|---|---|
|`TerminalBaseModel.EquipmentModel`|---|---|---|---|
|`TerminalBaseModel.EquipmentSerialNumber`|---|---|---|---|
|`TerminalBaseModel.TerminalId`|---|---|---|---|

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
|`Terminal.CommunicationType`|---|---|---|---|
|`Terminal.EquipmentModel`|---|---|---|---|
|`Terminal.EquipmentSerialNumber`|---|---|---|---|
|`Terminal.TerminalId`|---|---|---|---|
|`Terminal.SubordinatedMerchantId`|---|---|---|---|
