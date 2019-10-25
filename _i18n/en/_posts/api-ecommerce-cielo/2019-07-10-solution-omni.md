---
layout: manual
title: Integration Manual Omni Solution
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Payment
language_tabs:
  json: JSON
  shell: cURL
---

# Overview - API Omni Solution

# Proposal

Enable the integration of business partners/sub-purchasers with Cielo for transactions with non-present cards (typed transactions) and gift cards in Chip and black stripe modalities.

# Glossary

|ID|Description|
|BC|PINPad Shared Library|
|DUKPT|(Devired Unique Key Per Transaction) Encryption method used at Cielo|
|PIN|Card password|
|BDK|(Base Derived Key) Sub key to be installed on the HSM|
|HSM|(Hardware Security Module) Server for digital key generation, storage, management and cryptographic functionality|
|OAUTH2|Authentication protocol used in APIs|

# Prerequisites

For the integration, it is necessary that the business partner/sub-purchaser capture solution must have the following components:

* Shared library for PINPad or proprietary library certified with the brands.
* DUKPT encryption keys implemented for PIN.
* Make your BDK available for installation on HSM Cielo.

HSM Cielo is parameterized to a KSN as follows:

* **KSI -** Key identification number
* **DID –** Device ID
* **TC –** Transaction Counter

In the key register is only inserted the KSI that has 5 numeric characters and the key, as the example below:

**FFFFF**030331234500012

<aside class="warning">Note.: The F’s must be filled in automatically by the Capture Solution.</aside>

# Authentication

Authentication is a necessary operation to obtain the token that will be used in other API calls.

|Security scheme type:|OAuth2|
|clientCredentials OAuth Flow|**Token URL:** https://authsandbox.braspag.com.br/oauth2/token<br><br>**Scopes:**<br><br>* `Administrator` - Admin everything<br><br>* `AnalyticsApiOverview` - See the analytics<br><br>* `AdminBackoffice` - Use the backoffice|

# Payment

When a payment is created (201 - Created), you should review the Status (Payment.Status) in the response to make sure that the payment was successfully generated or if there was any failure.

| SandBox                                             | Production                                    |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Credit card typed sales without password

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
