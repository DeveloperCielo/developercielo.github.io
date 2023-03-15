---
layout: manual
title: Google Pay integration spec
description: Integração técnica Cielo 3.0
search: true
translated: true
categories: manual
tags:
  - E-Wallet
language_tabs:
  json: JSON
---

# Google Pay ™

Google Pay is a e-wallet. It allows shoppers to make payments in e-commerce stores and apps using their credit and debit cards stored in their Google Account and Android devices in a safe and easy way.

# Requirements

1. Agree to Google’s terms of service
2. Integrate Google Pay into your app ([https://developers.google.com/pay/api/android/overview](https://developers.google.com/pay/api/android/overview))
3. Contrat the Cielo 3.0 as payment acquier
4. Integrate Cielo 3.0 API REST ([https://developercielo.github.io/manual/cielo-ecommerce](https://developercielo.github.io/manual/cielo-ecommerce))

# Step 1: Integrating Google Pay into you Android app

## Action 1 - Configure your project

[https://developers.google.com/pay/api/android/guides/setup](https://developers.google.com/pay/api/android/guides/setup)

In these steps, the following points should be observed:

- Project Configuration
- Modify your _Manifest_

## Action 2 - Google Pay Implementation

To integrate Google Play into your app, follow all the steps in the Google Pay documentation:

[https://developers.google.com/pay/api/android/guides/tutorial](https://developers.google.com/pay/api/android/guides/tutorial)

For the correct integration of Google Play using Cielo's payment API, it is necessary to observe the following points:

### Gateway Definition

In the "_Step 2: Choose a payment tokenization method_", follow the "GATEWAY" integration model and send the "type" as " **PAYMENT_GATEWAY**" and " **gateway**" as " **cielo**", according to the example:

```json
private static JSONObject getTokenizationSpecification() {
  JSONObject tokenizationSpecification = new JSONObject();
  tokenizationSpecification.put("type", "PAYMENT_GATEWAY");
  tokenizationSpecification.put(
      "parameters",
      new JSONObject()
          .put("gateway", "cielo")
          .put("gatewayMerchantId", "MerchantId"));
  return tokenizationSpecification;
}
```

To the field " **gatewayMerchantId**", send your merchant identification provided by Cielo. The merchant identification is formated as XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX (i.e. GUID(36)).

### Definition of brands

In the "_Step 3: Define supported payment card networks_", use these brands: "VISA", "MASTERCARD", "AMEX", "DISCOVER" E "JCB"

### Definition of environment

In the "_Step 5: Create a PaymentsClient instance_", use the vaue "WalletConstants.ENVIRONMENT_TEST" for test purpose.

### Definition of shopping data

In the "_Step 7: Create a PaymentDataRequest object_", use the value "BRL" for " **currencyCode**". The field " **merchantName**" is the name that shopper will see during Google Pay payment process, then, the recomendation is the use of friendly name.

### Payment Data Recovery

In the "_Step 9: Handle the response object_", the "Activity.RESULT_OK" event is described, which is returned a object with all the payment data, including payment tokens.

The _PaymentData_ contains the object _PaymentMethodToken_. To get this object, use the **getPaymentMethodToken()** method.

(to see more details: [https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentData](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentData))

After getting the PaymentMethodToken, you shold get the _string_ that contains the payment tokens. To get the string, use the **GetToken()** method from _PaymentMethodToken_ object.

(to see more details: [https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentMethodToken](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentMethodToken))

The string obtained will be similar as follows:

```json
{
  "protocolVersion": "ECv1",
  "signature": "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "signedMessage": "{\"encryptedMessage\":
  \"ZW5jcnlwdGVkTWVzc2FnZQ==\",\"ephemeralPublicKey\":
  \"ZXBoZW1lcmFsUHVibGljS2V5\",\"tag\": \"c2lnbmF0dXJl\"}"
}
```

| **Body**      | **Type** | **Description** |
| ------------- | -------- | --------------- |
| signedMessage | string   | Signed message. |
| signature     | string   | Signature.      |

(to see more details: [https://developers.google.com/pay/api/android/guides/resources/payment-data-cryptography](https://developers.google.com/pay/api/android/guides/resources/payment-data-cryptography))

Keep the values "_signedMessage_" and "_signature_". They will be requested in the Cielo's authorization process in the next step (Step 2: Authorization with Google Pay)

# Step 2: Authorization with Google Pay

The authorization with the Google Pay token must be performed as the same way as a standard authorization for a credit card, but providing token in place of the open card data, as following example:

## Request

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    (…)
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "Wallet": {
      "Type": "AndroidPay",
      "WalletKey": "{\"encryptedMessage\": \"ZW5jcnlwdGVkTWVzc2FnZQ==\",\"ephemeralPublicKey\": \"ZXBoZW1lcmFsUHVibGljS2V5\",\"tag\": \"c2lnbmF0dXJl\"}",
      "AdditionalData": {
        "Signature": "ZXBoZW1lcmFsUHVibGljS2V5"
      }
    }
  }
}
```

| **Header**  | **Type**   | **Description**                                                                                    |
| ----------- | ---------- | -------------------------------------------------------------------------------------------------- |
| MerchantID  | GUID(36)   | Merchant's merchant ID. For Sandbox environment, use fecd2b61-3f0e-4e49-8b4f-eb382fa4da56          |
| MerchantKey | String(24) | Merchant's merchant API Key. For Sandbox environment, use WSCIKUJBVHFPPPAWFPJGRYXRDNGQTMZAGBJSZZBV |

| **Body**                                | **Type**               | **Description**                                                                                                                                                                  |
| --------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MerchantOrderId                         | String (50)            | Order identification number                                                                                                                                                      |
| Customer                                | Node with shopper data | See [https://developercielo.github.io/manual/cielo-ecommerce#transa%C3%A7%C3%A3o-completa](https://developercielo.github.io/manual/cielo-ecommerce#transa%C3%A7%C3%A3o-completa) |
| Payment.Type                            | String (100)           | Payment method type. Possible values: "CreditCard" ou "DebitCard"                                                                                                                |
| Payment.Amount                          | Número (15)            | Transaction amount in cents                                                                                                                                                      |
| Payment.Installments                    | Número (2)             | Number of installments                                                                                                                                                           |
| Payment.Wallet.Type                     | String (15)            | Wallet provider name. For Google Pay, use "AndroidPay"                                                                                                                           |
| Payment.Wallet.WalletKey                | String                 | Provide the "signedMessage" received from Google Pay                                                                                                                             |
| Payment.Wallet.AdditionalData.Signature | String                 | Provide the "signature" received from Google Pay                                                                                                                                 |

For more information: [https://developercielo.github.io/manual/cielo-ecommerce](https://developercielo.github.io/manual/cielo-ecommerce)

## Response

Vide [https://developercielo.github.io/manual/cielo-ecommerce#resposta](https://developercielo.github.io/manual/cielo-ecommerce#resposta)

# Step 3: Requesting production access

## Action 1 - Branding Guideline

Check the all the branding guidelines to help you implement Google Pay within your apps. The guideline is available at: [https://developers.google.com/pay/api/android/guides/brand-guidelines](https://developers.google.com/pay/api/android/guides/brand-guidelines)

## Action 2 - Checklist and Request production access

Ensure if all the checklist item was completed. When you are ready, request the production access to deploy your app in production environment. The checklist is available at: [https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)
