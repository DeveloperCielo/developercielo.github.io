---
layout: manual
title: Manual de Integração Solução Omni
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# Overview  - Omni Solution API  

# Objective

Enable the integration of business partners/sub-acquire with Cielo for transactions with non-gift cards (typed transactions) and gift cards in Chip and Tarja modalities.

# Glossary

|ID|Description|
|BC|PINPad Shared Library|
|DUKPT|(Devired Unique Key Per Transaction) Encryption method used at Cielo|
|PIN|Card password|
|BDK|(Base Derived Key) Sub key to be installed on HSM|
|HSM|(Hardware Security Module) Server for digital key generation, storage, management and digital key encryptions functionality.|
|OAUTH2|Authentication protocol used in APIs|

# Prerequisites

For the integration, the business partner/sub-acquire capture solution must have the following components:

* Shared Library for PINPad or proprietary library certified with flags.
* DUKPT encryption keys implemented for PIN.
* Provide your BDK installation on HSM Cielo;

Key Format required by Cielo:

HSM Cielo is parameterized to a KSN as follows:

* **KSI -** Key identification number
* **DID –** Device ID
* **TC –** Transaction Counter

<br>

In the key register is only inserted the KSI that has 5 numeric characters and the key, as the example below:

**FFFFF**030331234500012

<aside class="warning">Note: The F's must be filled in automatically by the Capture Solution..</aside>

# Authentication

The authentication is a necessary operation to obtain the token that will be used in other API calls.

|Security scheme type:|OAuth2|
|clientCredentials OAuth Flow|**URL Token:** https://authsandbox.braspag.com.br/oauth2/token<br><br>**Scopes:**<br><br>* `Administrator` - Admin everything<br><br>* `AnalyticsApiOverview` - See the analytics<br><br>* `AdminBackoffice` - Use the backoffice|

# Payment

When a payment is created (201 - Created), you should review the Status (Payment.Status) in the response to make sure that the payment was successfully generated or failed.

| SandBox                                             | Production                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Credit card typed sale without password

### Request

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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|Text|---|---|---|
|`Payment.SoftDescriptor`|Text|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|Text|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`CreditCard.CardNumber`|---|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.SecurityCodeStatus`|Text|---|---|---|
|`CreditCard.SecurityCode`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.IssuerId`|---|---|---|---|
|`CreditCard.InputMode`|Text|---|---|---|
|`CreditCard.AuthenticationMethod`|Text|---|---|---|
|`CreditCard.TruncateCardNumberWhenPrinting`|Boolean|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|Text|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|Text|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

### Response

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
    ]
  }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|---|---|---|---|
|`Customer.Name`|Text|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|Text|---|---|---|
|`CreditCard.ExpirationDate`|---|---|---|---|
|`CreditCard.BrandId`|---|---|---|---|
|`CreditCard.IssuerId`|---|---|---|---|
|`CreditCard.TruncateCardNumberWhenPrinting`|Booleano|---|---|---|
|`CreditCard.InputMode`|Text|---|---|---|
|`CreditCard.AuthenticationMethod`|Text|---|---|---|
|`CreditCard.EmvData`|---|---|---|---|
|`PinBlock.EncryptedPinBlock`|---|---|---|---|
|`PinBlock.EncryptionType`|Text|---|---|---|
|`PinBlock.KsnIdentification`|Text|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.ServiceTaxAmount`|---|---|---|---|
|`Payment.SoftDescriptor`|Text|---|---|---|
|`Payment.ProductId`|---|---|---|---|
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|Text|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|Text|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.ReceivedDate`|---|---|---|---|
|`Payment.CapturedAmount`|---|---|---|---|
|`Payment.Provider`|Text|---|---|---|
|`Payment.ConfirmationStatus`|---|---|---|---|
|`Payment.InitializationVersion`|---|---|---|---|
|`Payment.EmvResponseData`|---|---|---|---|
|`Payment.Status`|---|---|---|---|
|`Payment.IsSplitted`|Boolean|---|---|---|
|`Payment.ReturnCode`|---|---|---|---|
|`Payment.ReturnMessage`|Text|---|---|---|
|`Payment.PaymentId`|---|---|---|---|
|`Payment.Type`|Text|---|---|---|
|`Payment.Currency`|---|---|---|---|
|`Payment.Country`|Text|---|---|---|

## Credit card sale with magnetic tarja reading and password

### Request

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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
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
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

### Response

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
    ]
  }
}
```

|Property|Type|Size|Required|Description|
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

## Debit card sale with magnetic tarja reading and password

### Request

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
      }
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

|Property|Type|Size|Required|Description|
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
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

### Response

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
    ]
  }
}
```

|Property|Type|Size|Required|Description|
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

## Credit card sales with online password with EMV

### Request

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
      }
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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantOrderId`|---|---|---|---|
|`Payment.Type`|---|---|---|---|
|`Payment.SoftDescriptor`|---|---|---|---|
|`Payment.PaymentDateTime`|---|---|---|---|
|`Payment.Amount`|---|---|---|---|
|`Payment.Installments`|---|---|---|---|
|`Payment.Interest`|---|---|---|---|
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
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

### Response

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
    ]
  }
}
```

|Property|Type|Size|Required|Description|
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

## Debit card sale with EMV and online password

### Request

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
      }
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

|Property|Type|Size|Required|Description|
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
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

### Response

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
    ]
  }
}
```

|Property|Type|Size|Required|Description|
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

## Sale with meal ticket (voucher card) with EMV and online password

### Request

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
      }
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

|Property|Type|Size|Required|Description|
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
|`PinPadInformation.TerminalId`|---|---|---|---|
|`PinPadInformation.SerialNumber`|---|---|---|---|
|`PinPadInformation.PhysicalCharacteristics`|---|---|---|---|
|`PinPadInformation.ReturnDataInfo`|---|---|---|---|

### Response

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
    ]
  }
}
```

|Property|Type|Size|Required|Description|
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

# Confirmation

When the payment returns successful and can be confirmed.

This operation requires the PaymentId received on the return of payment, beyond the data of the EmvData, if the payment was made through Chip.

Verification is only required for payments made through POS.

| SandBox                                             | Production                                    |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Payment confirmation using a card typed

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/physicalSales/{PaymentId}/confirmation</span></aside>

```json
null
```

### Response

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

|Property|Type|Size|Required|Description|
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

# Desfazimento

## Desfaz um pagamento

O pagamente retornou com sucesso e pode ser desfeito.

Deve-se solicitar o desfazimento através do PaymentId recebido no retorno do pagamento. 

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/{PaymentId}</span></aside>

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

## Desfaz um pagamento

Quando o pagamente não retornar, o mesmo deve ser desfeito.

Para solicitar o desfazimento é necessário informar o MerchantOrderId enviado no pagamento.

| SandBox                                             | Produção                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

### Requisição

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/1/physicalSales/orderId/{MerchantOrderId}</span></aside>

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
      "IntEmvConctactRiskMaxPercent": 0
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
