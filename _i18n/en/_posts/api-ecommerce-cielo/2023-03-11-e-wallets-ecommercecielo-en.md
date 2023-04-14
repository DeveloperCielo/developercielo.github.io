---
layout: manual
title: E-wallets Manual
description: E-wallets integration
search: true
translated: true
categories: manual
sort_order: 3
tags:
  - API Payment
language_tabs:
  json: JSON
  shell: cURL
---

# E-wallet (digital wallet)

E-wallets are electronic safes (repositories) of cards and payment data for the physical and e-commerce customers. Digital wallets allow a customer to register their payment details, making the purchase process more convenient and secure.

<aside class="warning">To use wallets in the API E-commerce Cielo, the merchant must have the wallets integrated in his checkout.</aside>

Contact the provider of your choice for further information on how to contract the service.

## Available E-wallets

API E-commerce Cielo supports the following digital wallets:

- [_Apple Pay_](https://www.apple.com/br/apple-pay/){:target="\_blank"}
- [_Samsung Pay_](https://www.samsung.com.br/samsungpay/){:target="\_blank"}
- [_Google Pay_](https://pay.google.com/intl/pt-BR_br/about/){:target="\_blank"}
- [_Masterpass_](https://masterpass.com/pt-br/){:target="\_blank"}

<aside class="warning">When the “Wallet” node is sent in the request, the “CreditCard” node becomes optional.</aside>
<aside class="warning">When the "Wallet" node is sent in the request, for the debit card it is necessary to send the "DebitCard" node containing the "ReturnUrl".</aside>

## E-wallet Integration

See below the representation of a standard **transactional flow** in the integration of an e-wallet:

![Fluxo E-wallets EN]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/e-wallets-cielo-en.jpg)

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "Exemplo Wallet Padrão",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "Currency": "BRL",
    "Payment.Capture": "false",
    "Wallet": {
      "Type": "TIPO DE WALLET",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
      "AdditionalData": {
        "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
      }
    }
  }
}
```

```shell
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId": "2014111708",
   "Customer": {
      "Name": "Exemplo Wallet Padrão",
      "Identity": "11225468954",
      "IdentityType": "CPF"
   },
   "Payment": {
      "Type": "CreditCard",
      "Amount": 100,
      "Installments": 1,
      "Currency": "BRL",
      "Payment.Capture": "false",
      "Wallet": {
         "Type": "TIPO DE WALLET",
         "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
         "AdditionalData": {
            "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
         }
      }
   }
}
```

| Property                                | Description                                                                                                                                                                               | Type   | Size | Required            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------- |
| `MerchantId`                               | Merchant identifier at Cielo                                                                                                                                                         | GUID   | 36      | Yes (sent in _header_) |
| `MerchantKey`                              | Public key for dual authentication at Cielo.                                                                                                                                         | Text  | 40      | Yes (sent in _header_) |
| `RequestId`                                | Request identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                  | GUID   | 36      | No (send in _header_) |
| `MerchantOrderId`                          | Order ID number.                                                                                                                                                      | Text  | 50      | Yes                     |
| `Customer.Name`                            | Customer's name.                                                                                                                                                                      | Text  | 255     | No                     |
| `Customer.Status`                          | Customer's registration status ("NEW" / "EXISTING").                                                                                                                           | Text  | 255     | No                     |
| `Payment.Type`                             | Payment method type.                                                                                                                                                              | Text  | 100     | Yes                     |
| `Payment.Amount`                           | Order amount in cents.                                                                                                                                                           | Number | 15      | Yes                     |
| `Payment.Installments`                     | Number of installments.                                                                                                                                                                     | Number | 2       | Yes                     |
|`Payment.Capture`|Indicates whether the authorization will use automatic capture (“true”) or not (“false”). If "false", a capture request must be sent - please, check with the acquirer if pre-authorization is available. |Boolean| - |No (default “false”)|
| `Wallet.Type`                              | Wallet type: "ApplePay" / "SamsungPay" / "GooglePay" / "Masterpass".                                                                                              | Text  | --      | Yes                     |
| `Wallet.WalletKey`                         | Cryptographic key that identifies stores in wallets. Consult the table [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey) for more information. | Text  | --      | Yes                     |
| `Wallet.AdditionalData.EphemeralPublicKey` | Token returned by wallet. Must be submitted in **ApplePay** integrations.                                                                                                              | Text  | --      | Yes                     |
| `Wallet.AdditionalData.CaptureCode`        | Code informed by **Masterpass** to the merchant.                                                                                                                                        | Text  | --      | Yes                     |
| `Wallet.AdditionalData.Signature`          | Token returned by wallet. Must be submitted in **GooglePay** integrations.                                                                                                             | Text  | --      | Yes                     |

#### WalletKey

WalletKey is the identifier used by Cielo to decrypt the payloads returned by an e-wallet.

The `WalletKey` formats that must be sent to the API E-commerce Cielo are:

|Wallet|Example|
|----------------|----------------|
|_Apple Pay_|9zcCAciwoTS+qBx8jWb++64eHT2QZTWBs6qMVJ0GO+AqpcDVkxGPNpOR/D1bv5AZ62+5lKvucati0+eu7hdilwUYT3n5swkHuIzX2KO80Apx/SkhoVM5dqgyKrak5VD2/drcGh9xqEanWkyd7wl200sYj4QUMbeLhyaY7bCdnnpKDJgpOY6J883fX3TiHoZorb/QlEEOpvYcbcFYs3ELZ7QVtjxyrO2LmPsIkz2BgNm5f+JaJUSAOectahgLZnZR+easdhghrsa/E9A6DwjMd0fDYnxjj0bQDfaZpBPeGGPFLu5YYn1IDc|.|
|_Samsung Pay_|eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-fdafddfa-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ|.|
|_Google Pay_|{\"encryptedMessage\":\"0mXBb94Cy9JZhMuwtrBhMjXb8pDslrNsN5KhcEqnowOINqJgjXHD36KcCuzpQQ4cDAe64ZLmk2N3UBGXsN9hMMyeMakXlidVmteE+QMaNZIor048oJqlUIFPD54B/ic8zCdqq3xnefUmyKQe0I03x57TcEA9xAT/E4x3rYfyqLFUAEtu2lT0GwTdwgrsT8pKoTldHIgP+wVNTjrKvJrB4xM/Bhn6JfcSmOzFyI6w37mBU71/TK761nYOSxt7z1bNWSLZ4b8xBu1dlRgen2BSlqdafuQjV3UZjr6ubSvaJ8NiCh5FD/X013kAwLuLALMS2uAFS9j8cZ6R6zNIi13fK6Fe4ACbFTHwLzSNZjQiaRDb6MlMnY8/amncPIOXzpirb5ScIz8EZUL05xd+3YWVTVfpqgFo1eaaS+wZdUyRG0QEgOsr6eLBoH8d5lfV9Rx6XdioorUuT7s1Yqc0OJZO+fhBt6X0izE9hBGTexdZyg\\u003d\\u003d\",\"ephemeralPublicKey\":\"BMdwrkJeEgCOtLevYsN3MbdP8xbOItXiTejoB6vXy0Kn0ZM10jy4Aasd6jTSxtoxoTpFydLhj5kzoOhbw2OzZu0\\u003d\",\"tag\":\"yAQIjWZ0VuCC7SWyYwc4eXOzpSUKhZduF9ip0Ji+Gj8\\u003d\"}|.|
|_Masterpass_|a561da1c18a89cfdafas875f9d43fc46cd9bf3e1|.|

#### EphemeralPublicKey

This is the `EphemeralPublicKey` format to be sent to API E-commerce Cielo:

|Wallet|Example|
|----------------|----------------------------------------------------------------------------------------------------------------------------------|
|_Apple Pay_|`MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoedz1NqI6hs9hEO6dBsnn0X0xp5/DKj3gXirjEqxNIJ8JyhGxVB3ITd0E+6uG4W6Evt+kugG8gOhCBrdUU6JwQ==`|

#### Signature

`Signature` format that must be sent to the API E-commerce Cielo:

|Wallet|Example|
|----------------|----------------------------------------------------------------------------------------------------------------------------------|
|_Google Pay_|`MEUCIQCGQLOmwxe5eFMSuTcr4EcwSZu35fB0KlCWcVop6ZxxhgIgbdtNHThSlynOopfxMIxkDs0cLh2NFh5es+J5uDmaViA=`|

### Responses

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******1521",
      "Holder": "BJORN IRONSIDE",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "TIPO DE WALLET",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
      "Eci": 0,
      "AdditionalData": {
        "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
      }
    },
    "SoftDescriptor": "123456789ABCD",
    "Amount": 100,
    "ReceivedDate": "2018-03-19 16:08:16",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
      }
    ]
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "[Guest]"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "453211******1521",
            "Holder": "BJORN IRONSIDE",
            "ExpirationDate": "08/2020",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "0319040817883",
        "ProofOfSale": "817883",
        "AuthorizationCode": "027795",
        "Wallet": {
            "Type": "TIPO DE WALLET",
            "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
            "Eci": 0,
            "AdditionalData": {
                "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
            },
        },
        "SoftDescriptor": "123456789ABCD",
        "Amount": 100,
        "ReceivedDate": "2018-03-19 16:08:16",
        "Status": 1,
        "IsSplitted": false,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "4",
        "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
        "Type": "CreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

| Property                         | Description                                                                                                                                                                              | Type  | Size | Format                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                                                                                | Text | 6       | Alphanumeric text                                                                                                   |
| `Tid`                               | Transaction ID in the acquirer.                                                                                                                                                         | Text | 20      | Alphanumeric text                                                                                                   |
| `AuthorizationCode`                 | Authorization code.                                                                                                                                                                 | Text | 6       | Alphanumeric text                                                                                                   |
| `SoftDescriptor`                    | Text to be printed on the bearer bank statement. Available for VISA/MASTER only - no special characters allowed.                                                         | Text | 13      | Alphanumeric text                                                                                                   |
| `PaymentId`                         | Order identifier field.                                                                                                                                                         | GUID  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                 |
| `ECI`                               | _Electronic Commerce Indicator_. Represents how secure a transaction is.                                                                                                             | Text | 2       | E.g.: 7                                                                                                               |
| `Status`                            | Transaction status.                                                                                                                                                                   | Byte  | 2       | E.g.: 1                                                                                                               |
| `ReturnCode`                        | Return code from the acquirer.                                                                                                                                                      | Text | 32      | Alphanmeric text.                                                                                                   |
| `ReturnMessage`                     | Return message from the acquirer.                                                                                                                                                   | Text | --      | Alphanumeric text.                                                                                                   |
| `Type`                              | Wallet type: "ApplePay" / "SamsungPay" / "GooglePay" / "Masterpass".                                                                                             | Text | --      | Alphanumeric text                                                                                                   |
| `WalletKey`                         | Cryptographic key that identifies stores in wallets. Consult the table [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey) for more information | Text | --      | See table [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey)                   |
| `AdditionalData.EphemeralPublicKey` | Token returned by the wallet. Must be submitted in **ApplePay** integrations.                                                                                                              | Text | --      | See table [EphemeralPublicKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#ephemeralpublickey) |
| `AdditionalData.CaptureCode`        | Code informed by **Masterpass** to the merchant.                                                                                                                                       | Text | --      | 3                                                                                                                    |
| `AdditionalData.Signature`          | Token returned by wallet. Must be submitted in **GooglePay** integrations.                                                                                                             | Text | --      | See table [Signature](https://developercielo.github.io/manual/e-wallets-ecommercecielo#signature)                   |

# Integration examples

Here are some examples of integration with the main e-wallets available on the market.

# Apple Pay ™

Apple Pay is a virtual wallet. It allows the shopper to make payments in e-commerce stores and apps using, in a practical and safe way, their credit and debit cards stored in their Apple accounts and devices.

## Prerequisites

In order to use Apple Pay, your store must be previously registered in the AppleID program. In addition to that, you must also:

1. Enroll your store through [this URL](https://developer.apple.com/programs/enroll/){:target="_blank"}, following all steps required by Apple.
2. Follow the procedure set out in this document, in order to complete your integration with Apple.
3. Hire API E-commerce Cielo;
4. Hire Cielo 3.0 as the acquirer;
5. Integrate with [API E-commerce Cielo](https://developercielo.github.io/en/manual/cielo-ecommerce).

## PART 1: Configuring the Merchant Identifier

In this initial step, you will need to create a **merchant identifier** for your store. Once created, the merchant identifier must be sent to Cielo in a request for a **".CSR" certificate**. The ".CSR" certificate created by Cielo must be used to create a new certificate with Apple, the **".CER" certificate**, which will serve as a follow-up to the second stage of the process.

### Step 1 - Create a Merchant Identifier

The merchant identifier must be created through the [Apple Developer](https://developer.apple.com/account/resources){:target="_blank"} website as follows:

1. In the **"Certificates, Identifiers & Profiles"** section, select **"Identifiers"** in the side menu, and then click the `(+)` button next to the title:
![Step1.1]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay01.png)
2. Select the **"Merchant IDs"** option and then click `Continue`:
![Step1.2]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay02.png)
3. Enter a value in the **"Description"** and **"Identifier"** fields, following your specifications, and click `Continue`:
![Step1.3]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay03.png)
4. To finish, click on `Register`:
![Step1.4]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay04.png)

### Step 2 - Request the ".CSR" Certificate

To request Cielo to generate the certificate in ".CSR" format, contact our [Support Team](https://devcielo.zendesk.com/hc/pt-br#suporte){:target=" \_blank"} and enter:

1. The **Merchant Identifier** created in "Step 1";
2. The **Merchant ID** of your Cielo store in production.

Our team will return with the ".CSR" file within 48 business hours.

### Step 3 - Create a ".CER" Certificate

1. In the **"Certificates, Identifier & Profiles"** section, select **"Identifiers"** on the side menu.
2. Use the filter on the top right corner (**"App IDs"**), to locate the **"Merchant IDs"** item:
![Step2.1]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay05.png)
3. Select the recently created identifier:
![Step2.2]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay06.png)
4. In the **"Apple Pay Payment Processing Certificate"** block, click the `Create Certificate` button right after the short description:
![Step2.3]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay07.png)
5. Choose **"No"** in **"Edit or Configure Merchant ID"**:
![Step2.4]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay08.png)
6. In the dialog box, click `Choose File` and choose the ".CSR" certificate sent by Cielo:
![Step2.5]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay09.png)
7. Click `Continue`:
![Step2.6]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay10.png)
8. Click `Download` and save the ".CER" file:
![Step2.7]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay11.png)

For more details on the process, access Apple's [Developer Account Help](https://help.apple.com/developer-account/#/devb2e62b839){:target="_blank"}.

## PART 2: Integrating with Apple Pay

Most of the process of enabling the "Pay with Apple Pay" button in your app or site is performed during your wallet integration. For that reason, we recommend you to follow the instructions available in the [Apple Developer Documentation](https://developer.apple.com/documentation){:target="_blank"} website for Apple's self-service implementation.

At the end of the process performed in the Apple API, you will receive a JSON containing two important fields that will be used in "PART 3": the `paymentData.data` and the `ephemeralPublicKey.header.EphemeralPublicKey` fields.

```json
{
  "applePayData": {
    "paymentData": {
      "version": "EC_v1",
      "data": "as01vRj+n9crY2vome7zc+u7Tz0+qg2La/8IUHpJIjFN6ThhUqLnSrskQHTrEbcYPiMksFK0+ddo9sZu70uJQJH1I+44N6PrVhilNDem97vOXq2VYDXiVJ27F/Q9wGQDgZBeGcZ6Pml9SIelHqUauBcQoOatrlnWPUL8kbdpT8WqgzXyaCh7oeTz=z6++rp/ofjvSjnGtOqAUsnrzvw4uzkcyKUSsfROdJ6B/Xzgu/T9fMIr5UxXD2DPF1SNh3ydEJABKz4HFjDW7ObvbQeua4GYxJdpQLpI3NgUbJy91E/LOyb/+PcCtO+0=a41tBrfnTTF9qsPuCIw8HWIEEKSRofn27NTofxev/i+nHEfqEtqNrN/epIvhzceD/gDiGetfiLKMzf94ARmpWUAMC==",
      "signature": "(…)",
      "header": {
        "ephemeralPublicKey": "MFkwEwZJKoZIzj0CAQYIKo12zj0DAQcDQgAEo+ReGClSmQ4hDJD1yh9nci3V4l7kPm2AQtKZMMvuNS0iK5sn/1A9l3kw1B1xCqOycZmnPSng7p5hpTvrei1BCA==",
        "publicKeyHash": "KXN06+BtJu6yEfF9zDhr7f4M/2HwVybnx0FGfC520gB=",
        "transactionId": "71c5b61c3791546e94d2b4893a6c69aaac2ab86b5c113c83a7d89057906a9b5f"
      }
    },
    "paymentMethod": {
      "displayName": "MasterCard 1212",
      "network": "MasterCard",
      "type": "credit"
    },
    "transactionIdentifier": "81C5B61C3791646E94D2B4893A6C69BBBC2AB86B5C363C83A7D89057906A9BAC"
  },
  "x_document": "24562608994",
  "x_name": "João da Silva"
}
```

### Important Note 

<aside class="warning">During Apple's implementation, there will be a reference to the ".CER" certificate, generated during STEP 1, to encrypt the data while communicating with Apple. In the integration flow DO NOT implement the process of decrypting the data returned by Apple as this work is done by the API E-commerce Cielo.</aside>

## PART 3: Integration with API E-commerce Cielo (decryption and authorization)

Authorization with the Apple Pay token happens in the same way as standard credit card authorization. However, instead of providing card details openly, the token received by Apple Pay must be provided, as in the example below:

### Request

```json
{
   "MerchantOrderId": "2017051002",
   "Customer": {
     (…)
   },
   "Payment": {
      "Type": "CreditCard",
      "Amount": 1000,
      "Installments": 1,
      "Currency": "BRL",
      "Wallet": {
         "Type": "ApplePay",
         "WalletKey":"['paymentData.data']",
         "AdditionalData": {
            "EphemeralPublicKey": "['ephemeralPublicKey.header.EphemeralPublicKey']"
         }
      }
   }
}
```

| Header Parameters | Description                                      | Type and Size |
| -------------------- | ---------------------------------------------- | -------------- |
| `MerchantId`         | Store ID in API E-commerce Cielo. | GUID (36)      |
| `MerchantKey`        | API key in API E-commerce Cielo.      | String (24)    |

| Parameter                                          | Description                                                                                                   | Type and Size                                                                                                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MerchantOrderId`                                  | Order ID number.                                                                          | String (50)                                                                                                                                                              |
| `Customer`                                         | Node with customer's data.                                                                                  | Refer to [API E-commerce Cielo](https://developercielo.github.io/en/manual/cielo-ecommerce#creating-a-credit-transaction){:target="\_blank"}. |
| `Payment.Type`                                     | Payment method type. Possibilities: "CreditCard" / "DebitCard".                                      | String (100)                                                                                                                                                             |
| `Payment.Amount`                                   | Order amount in cents.                                                                               | Number (15)                                                                                                                                                              |
| `Payment.Installments`                             | Number of installments.                                                                                         | Number (2)                                                                                                                                                               |
| `Payment.Wallet.Type`                              | Name of payment method provider. For Apple Pay transactions, use "ApplePay".                       | String (15)                                                                                                                                                              |
| `Payment.Wallet.WalletKey`                         | Fill with the `paymentData.data` parameter value returned by Apple Pay.                             | String                                                                                                                                                                   |
| `Payment.Wallet.AdditionalData.EphemeralPublicKey` | Fill with the `ephemeralPublicKey.header.EphemeralPublicKey` parameter value returned by Apple Pay. | String                                                                                                                                                                   |

### Response

```json
{
    "MerchantOrderId": "2017051002",
    "Customer": {(…)
    },
    "Payment": {
        (…)
        "CreditCard": {
            (…)
        },
        (…)
        "Wallet": {
            "Type": "ApplePay",
            "WalletKey": "as01vRj+n9crY2vome7zc+u7Tz0+qg2La/8IUHpJIjFN6ThhUqLnSrskQHTrEbcYPiMksFK0+ddo9sZu70uJQJH1I+44N6PrVhilNDem97vOXq2VYDXiVJ27F/Q9wGQDgZBeGcZ6Pml9SIelHqUauBcQoOatrlnWPUL8kbdpT8WqgzXyaCh7oeTz=z6++rp/ofjvSjnGtOqAUsnrzvw4uzkcyKUSsfROdJ6B/Xzgu/T9fMIr5UxXD2DPF1SNh3ydEJABKz4HFjDW7ObvbQeua4GYxJdpQLpI3NgUbJy91E/LOyb/+PcCtO+0=a41tBrfnTTF9qsPuCIw8HWIEEKSRofn27NTofxev/i+nHEfqEtqNrN/epIvhzceD/gDiGetfiLKMzf94ARmpWUAMC==",
            "AdditionalData": {
                "EphemeralPublicKey": "MFkwEwZJKoZIzj0CAQYIKo12zj0DAQcDQgAEo+ReGClSmQ4hDJD1yh9nci3V4l7kPm2AQtKZMMvuNS0iK5sn/1A9l3kw1B1xCqOycZmnPSng7p5hpTvrei1BCA=="
            }
        },
        (…)
        "Links": [
            (…)
        ]
    }
}
```

The wallet authorization response will have the same fields presented in the documentation of [API E-commerce Cielo](https://developercielo.github.io/en/manual/cielo-ecommerce#response34){:target="\_blank"}, however with the addition of the `Payment.Wallet` node repeating the same fields used in the authorization, as described above.

# Google Pay ™

Google Pay is an e-wallet that allows shoppers to make payments in e-commerce stores and apps using their credit and debit cards stored in their Google Accounts and Android devices in a safe and easy way.

## Prerequisites

In order to use Google Pay, your store must be previously registered and integrated with Google Pay. In addition to that, you must also:

1. Agree to Google’s terms of service;
2. Follow the steps in this documentation to thoroughly [integrate Google Pay](https://developers.google.com/pay/api/android/overview){:target="_blank"} into your app;
3. Hire API E-commerce Cielo;
4. Hire Cielo 3.0 as the acquirer;
5. Integrate with [API E-commerce Cielo](https://developercielo.github.io/en/manual/cielo-ecommerce){:target="_blank"}.

## PART 1: Integrating Google Pay

In this initial step, must set up your project and implement Google Pay in your Android application.

### Step 1 - Configure your Project

To set up your project, follow the instructions described in the [Google Pay Setup Guide](https://developers.google.com/pay/api/android/guides/setup).<br>
In this step, you must **add dependencies** either by importing the library from Google Play Services or choosing the APIs you want to compile. And then, to enable Google Pay in your Android application, you will have to **modify the _"AndroidManifest.xml"_** file of your project according to the instructions given on the page.

### Step 2 - Implement Google Pay

To integrate Google Play into your app, follow all the steps described in the [Google Pay Tutorial Guide](https://developers.google.com/pay/api/android/guides/tutorial){:target="_blank"}.

For the correct integration of Google Pay via Cielo, it is necessary to pay attention to the points below:

#### Gateway Definition

In step _"Step 2: Request a payment token for your payment provider"_, follow the model indicated as "GATEWAY" and assign the value "PAYMENT_GATEWAY" to the `type` parameter and the value "cielo" to the `gateway` parameter, according to the given example:

```json
private static JSONObject getTokenizationSpecification() {
  JSONObject tokenizationSpecification = new JSONObject();
  tokenizationSpecification.put("type", "PAYMENT_GATEWAY");
  tokenizationSpecification.put(
      "parameters",
      new JSONObject()
          .put("gateway", "cielo")
          .put("gatewayMerchantId", "exampleMerchantId"));
  return tokenizationSpecification;
}
```

Fill in the `gatewayMerchantId` parameter with your store's identifier, generated by the gateway. The store identifier follows the format "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" (type _GUID_ / size _36_).

#### Card brands definition

In _"Step 3: Define supported payment card networks"_, configure according to the flags accepted by the _wallet_.

#### Environment definition

In _"Step 5: Create a PaymentsClient instance"_, use the value "WalletConstants.ENVIRONMENT_TEST" for the test environment.

#### Shopping Data definition

In *"Step 7: Create a PaymentDataRequest object"*, use the "BRL" value for the `currencyCode` parameter. The `merchantName` field is the name that the shopper will see throughout the Google Pay payment process. Thus, the use of a recognizable friendly name is recommended.

#### Payment data recovery

In *"Step 9: Handle the response object"*, the `Activity.RESULT_OK` event is described, in which an object is returned with all the payment data, including payment tokens.

From the `PaymentData`, the `PaymentMethodToken` object is obtained, by calling the `getPaymentMethodToken()` method. [Click here](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentData){:target="_blank"} for more information.

Next, you must get the _string_ that contains payment tokens from the `GetToken()` method of the `PaymentMethodToken` object. [Click here](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentMethodToken){:target="_blank"} for more information.

The _string_ obtained in the previous step has a structure like the one shown below. [Click here](https://developers.google.com/pay/api/android/guides/resources/payment-data-cryptography){:target="_blank"} for more information.

```json
{
  "protocolVersion": "ECv1",
  "signature": "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "signedMessage": "{\"encryptedMessage\":
  \"ZW5jcnlwdGVkTWVzc2FnZQ==\",\"ephemeralPublicKey\":
  \"ZXBoZW1lcmFsUHVibGljS2V5\",\"tag\": \"c2lnbmF0dXJl\"}"
}
```

| Parameter       | Type   | Description               |
| --------------- | ------ | ----------------------- |
| `signedMessage` | string | Signed message.      |
| `signature`     | string | Message signature. |

Save the `signedMessage` and `signature` data, which will be required for authorization via the API E-commerce Cielo in STEP 2, described below.

## PART 2: Authorization with Token

Authorization with the Google Pay token happens in the same way as standard credit card authorization. However, instead of providing card details openly, the token received by Google Pay must be provided, as shown in the example:

### Request

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

| Header Parameters | Description                                                                                                | Type and Size |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| `MerchantId`         | Store identifier at Cielo 3.0. For the Sandbox environment, use 63D6ACCB-2734-4236-AB5D-843A9DAC44C7. | GUID (36)      |
| `MerchantKey`        | API key for Cielo 3.0. For the Sandbox environment, use ZCVHDJWKTGOZXADDYJFURIDIKHEMRYQAQDYEJMQK.    | String (24)    |

| Parameters                                 | Description                                                                                | Type and size                                                                                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MerchantOrderId`                         | Order identification number.                                                       | String (50)                                                                                                                                                              |
| `Customer`                                | Node with the shopper's data.                                                               | Refer to [API E-commerce Cielo](https://developercielo.github.io/en/manual/cielo-ecommerce#creating-a-credit-transaction){:target="\_blank"}. |
| `Payment.Type`                            | Payment method type. Possible values: "CreditCard" / "DebitCard".                   | String (100)                                                                                                                                                             |
| `Payment.Amount`                          | Transaction amount in cents.                                                            | Number (15)                                                                                                                                                              |
| `Payment.Installments`                    | Number of installments.                                                                      | Number (2)                                                                                                                                                               |
| `Payment.Wallet.Type`                     | allet provider name. For Google Pay, use "AndroidPay". | String (15)                                                                                                                                                              |
| `Payment.Wallet.WalletKey`                | Provide the `signedMessage` received from Google Pay.            | String                                                                                                                                                                   |
| `Payment.Wallet.AdditionalData.Signature` | Provide the `signature` received from Google Pay.                | String                                                                                                                                                                   |

For further information, refer to [API E-commerce Cielo](https://developercielo.github.io/en/manual/cielo-ecommerce#creating-a-credit-transaction){:target="_blank"}.

The wallet authorization response will have the same fields presented in our [API E-commerce Cielo documentation](https://developercielo.github.io/en/manual/cielo-ecommerce#response34){:target="_blank"}, however with the addition of the `Payment.Wallet` node repeating the same fields used in the authorization, as described above.

## PART 3: Production Data Request

In order to complete the process, first **validate the steps** performed in PARTS 1 and 2. Then, **request your access credentials** for deployment.

### Step 1 - Branding Guideline

Verify whether the [branding guidelines](https://developers.google.com/pay/api/android/guides/brand-guidelines){:target="_blank"} have been thoroughly followed.

### Step 2 - Checklist and Credentials Request

Check that all items in the [integration checklist](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist){:target="_blank"} have been attended. After everything is validated, request your access credentials for the production environment.

# Masterpass ™

To use Masterpass, it is necessary to contract the service by contacting Mastercard directly, selecting Cielo as _service provider_.

## Request

Example of a standard Masterpass request:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "Comprador Masterpass"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "Wallet": {
      "Type": "Masterpass",
      "WalletKey": "a561da1c18a89cfdafas875f9d43fc46cd9bf3e1",
      "AdditionalData": {
        "CaptureCode": "103"
      }
    }
  }
}
```

```shell
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2014111708",
   "Customer":{
      "Name":"Comprador Masterpass"
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "Wallet":{
         "Type":"Masterpass",
         "WalletKey":"a561da1c18a89cfdafas875f9d43fc46cd9bf3e1",
         "AdditionalData":{
            "CaptureCode": "103"
         }
      }
   }
}
```

| Property             | Description                                                                                                                                                                                | Type   | Size | Required?            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------- |
| `MerchantId`            | Store identifier at Cielo.                                                                                                                                                          | GUID   | 36      | Yes (sent in _header_) |
| `MerchantKey`           | Public key for dual authentication at Cielo.                                                                                                                                          | Text  | 40      | Yes (sent in _header_) |
| `RequestId`             | equest identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                   | GUID   | 36      | No (sent in _header_) |
| `MerchantOrderId`       | Order ID number.                                                                                                                                                       | Text  | 50      | Yes                     |
| `Customer.Name`         | Customer's name.                                                                                                                                                                       | Text  | 255     | No                     |
| `Customer.Status`       | Customer's registration status ("NEW" / "EXISTING").                                                                                                                            | Text  | 255     | No                     |
| `Payment.Type`          | Payment method type.                                                                                                                                                               | Text  | 100     | Yes                     |
| `Payment.Amount`        | Order amount in cents.                                                                                                                                                            | Number | 15      | Yes                     |
| `Payment.Installments`  | Number of installments.                                                                                                                                                                      | Number | 2       | Yes                     |
| `Wallet.Type`           | Wallet type: "Masterpass".                                                                                                                                                          | Text  | 255     | Yes                     |
| `Wallet.WalletKey`      | Cryptographic key representing card data. Consult the table [WalletKey](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"} for more information. | Text  | 255     | Yes                     |
| `Wallet.AdditionalData` | Instance for extra data reported by **Masterpass**. Note: Required only for `Wallet.Type` "Masterpass"                                                                     | ---    | ---     | ---                     |
| `Wallet.CaptureCode`    | Code informed by **Masterpass** to the merchant.                                                                                                                                         | Text  | 255     | Yes                     |

## Response

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "comprador Masterpass"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******3703",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2016",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0915052536103",
    "Wallet": {
      "Type": "Masterpass",
      "Eci": 0,
      "AdditionalData": {
        "CaptureCode": "103"
      }
    },
    "PaymentId": "689da793-fc99-4900-89f1-9e7fdaa06ef8",
    "Type": "CreditCard",
    "Amount": 15700,
    "ReceivedDate": "2016-09-15 17:25:35",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "57",
    "ReturnMessage": "Card Expired",
    "Status": 3,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      }
    ]
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "comprador Masterpass"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******3703",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2016",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0915052536103",
    "Wallet": {
      "Type": "Masterpass",
      "Eci": 0,
      "AdditionalData": {
        "CaptureCode": "103"
      }
    },
    "PaymentId": "689da793-fc99-4900-89f1-9e7fdaa06ef8",
    "Type": "CreditCard",
    "Amount": 15700,
    "ReceivedDate": "2016-09-15 17:25:35",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "57",
    "ReturnMessage": "Card Expired",
    "Status": 3,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      }
    ]
  }
}
```

| Property         | Description                                                                                                                           | Type  | Size | Format                              |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                             | Text | 6       | Alphanumeric                   |
| `Tid`               | Transaction ID in the acquirer.                                                                                           | Text | 20      | Alphanumeric                   |
| `AuthorizationCode` | Authorization code.                                                                                                              | Text | 6       | Alphanumeric                   |
| `SoftDescriptor`    | Text to be printed on bearer's invoice. Note: Does not allow special characters. Available for VISA/MASTER only.| Text | 13      | Alphanumeric                   |
| `PaymentId`         | Order identifier field.                                                                                                      | GUID  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | _Electronic Commerce Indicator_. Represents how secure a transaction is.                                                          | Text | 2       | E.g.: 7                               |
| `Status`            | Transaction status.                                                                                                                | Byte  | 2       | E.g.: 1                               |
| `ReturnCode`        | Return code from the acquirer.                                                                                                   | Text | 32      | Alphanumeric                   |
| `ReturnMessage`     | Return message from the acquirer.                                                                                                 | Text | 512     | Alphanumeric                   |
| `Type`              | Wallet type: "Masterpass".                                                                                    | Text | 255     | Yes                                  |
| `CaptureCode`       | Code informed by **Masterpass** to the merchant.                                                                                    | Text | 255     | Yes                                  |

# Samsung Pay™

Below is the prerequisite for using Samsung Pay and also an example of a request to make it available in your store.

<aside class="warning">The store must already have Samsung Pay registration and integration, otherwise it will not be possible to integrate with the API.</aside>

## Request

Example of a standard Samsung Pay request:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "6242-642-723",
  "Customer": {
    "Name": "Exemplo Wallet Padrão",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1,
    "Installments": 1,
    "Currency": "BRL",
    "Wallet": {
      "Type": "SamsungPay",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET"
    }
  }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"6242-642-723",
   "Customer":{
      "Name":"Exemplo Wallet Padrão",
      "Identity":"11225468954",
      "IdentityType":"CPF"
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":1,
      "Installments":1,
      "Currency":"BRL",
      "Wallet":{
         "Type":"SamsungPay",
         "WalletKey":"IDENTIFICADOR DA LOJA NA WALLET"
      }
   }
}
```

| Property            | Description                                                                                                                                                                                | Type   | Size | Required            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------- |
| `MerchantId`           | Store identifier at Cielo.                                                                                                                                                          | GUID   | 36      | Yes (sent in _header_) |
| `MerchantKey`          | Public key for dual authentication at Cielo.                                                                                                                                          | Text  | 40      | Yes (sent in _header_) |
| `RequestId`            | Request identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                   | GUID   | 36      | No (sent in _header_) |
| `MerchantOrderId`      | Order ID number.                                                                                                                                                       | Text  | 50      | Yes                     |
| `Customer.Name`        | Customer's name.                                                                                                                                                                       | Text  | 255     | No                     |
| `Customer.Status`      | Customer's registration status ("NEW" / "EXISTING").                                                                                                                            | Text  | 255     | No                     |
| `Payment.Type`         | Payment method type.                                                                                                                                                               | Text  | 100     | Yes                     |
| `Payment.Amount`       | Order amount in cents.                                                                                                                                                            | Number | 15      | Yes                     |
| `Payment.Installments` | Number of installments.                                                                                                                                                                      | Number | 2       | Yes                     |
| `Wallet.Type`          | Wallet type: "SamsungPay".                                                                                               | Text  | 255     | Yes                     |
| `Wallet.WalletKey`     | Cryptographic key representing card data. Consult the table [WalletKey](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"} for more information. | Text  | 255     | Yes                     |

## Response

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******1521",
      "Holder": "BJORN IRONSIDE",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "SamsungPay",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
      "Eci": 0
    },
    "SoftDescriptor": "123456789ABCD",
    "Amount": 100,
    "ReceivedDate": "2018-03-19 16:08:16",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
      }
    ]
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "[Guest]"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "453211******1521",
            "Holder": "BJORN IRONSIDE",
            "ExpirationDate": "08/2020",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "0319040817883",
        "ProofOfSale": "817883",
        "AuthorizationCode": "027795",
        "Wallet": {
            "Type": "SamsungPay",
            "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
            "Eci": 0
        },
        "SoftDescriptor": "123456789ABCD",
        "Amount": 100,
        "ReceivedDate": "2018-03-19 16:08:16",
        "Status": 1,
        "IsSplitted": false,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "4",
        "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
        "Type": "CreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

| Property         | Description                                                                                                                                                                                         | Type  | Size | Format                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `ProofOfSale`       | Authorization number, identical to the NSU.                                                                                                                                                           | Text | 6       | Alphanumeric                                                                                                  |
| `Tid`               | Transaction ID on the acquirer.                                                                                                                                                         | Text | 20      | Alphanumeric                                                                                                  |
| `AuthorizationCode` | Authorization code.                                                                                                                                                                            | Text | 6       | Alphanumeric                                                                                                  |
| `SoftDescriptor`    | Text to be printed on the bearer's bank statement. Note: Does not allow special characters. Available for VISA/MASTER only.                                                               | Text | 13      | Alphanumeric                                                                                                  |
| `PaymentId`         | Order identifier field.                                                                                                                                                                    | GUID  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                |
| `ECI`               | _Electronic Commerce Indicator_. Represents how secure a transaction is.                                                                                                                        | Text | 2       | E.g.: 7                                                                                                              |
| `Status`            | Transaction status.                                                                                                                                                                              | Byte  | 2       | E.g.: 1                                                                                                              |
| `ReturnCode`        | Return code from the acquirer.                                                                                                                                                                 | Text | 32      | Alphanumeric                                                                                                  |
| `ReturnMessage`     | Return message from acquirer.                                                                                                                                                               | Text | 512     | Alphanumeric                                                                                                  |
| `Type`              | Wallet type: "SamsungPay"                                                                                                     | Text | 255     | Alphanumeric                                                                                                  |
| `WalletKey`         | Cryptographic key representing card data. Consult the table [WalletKey](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"} for more information. | Text | 255     | Refer to [WalletKey](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"}. |

# Authorization with decrypted card

If the merchant decrypts the payload received from the wallet and sends it to the API E-commerce Cielo for processing and authorization, they must use the following request model:

## Request

```json
-- Envio de cartão
{
  "MerchantOrderId": "6242-642-723",
  "Customer": {
    "Name": "Guilherme Gama",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1100,
    "Provider": "Cielo",
    "Installments": 1,
    "CreditCard": {
      "CardNumber":"4532********6521",
      "Holder":"Guilherme Gama",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Master"
    },
    "Wallet": {
      "Type": "Tipo de wallet",
      "Eci":"7",
      "Cavv":"AM1mbqehL24XAAa0J04CAoABFA=="
    }
  }
}
```

| Property               | Type   | Size | Required | Description                                                                                                                                                                         |
| ------------------------- | ------ | ------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36      | Yes         | Store identifier atCielo.                                                                                                                                                    |
| `MerchantKey`             | Text  | 40      | Yes         | Public key for dual authentication at Cielo.                                                                                                                                   |
| `RequestId`               | Guid   | 36      | No         | Request identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                            |
| `MerchantOrderId`         | Text  | 50      | Yes         | Order ID number.                                                                                                                                                |
| `Customer.Name`           | Text  | 255     | No         | Customer's name.                                                                                                                                                                |
| `Customer.Status`         | Text  | 255     | No         | Customer's registration status ("NEW" / "EXISTING").                                                                                                                          |
| `Payment.Type`            | Text  | 100     | Yes         | Payment method type.                                                                                                                                                        |
| `Payment.Amount`          | Number | 15      | Yes         | Order amount in cents.                                                                                                                                        |
| `Payment.Installments`    | Number | 2       | Yes         | Number of installments.                                                                                                                                                               |
| `CreditCard.CardNumber.`  | Text  | 19      | Yes         | Customer's card number                                                                                                                                                     |
| `CreditCard.SecurityCode` | Texto  | 4       | Não         | Security code printed on the back of the card.                                                                                                                      |
| `CreditCard.Brand`        | Text  | 10      | Yes         | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                            |
| `Wallet.Type`             | Text  | 255     | Yes         | Wallet type: `AndroidPay` / `ApplePay` / `SamsungPay`                                                                                                          |
| `Wallet.Walletkey`        | Text  | 255     | Yes         | Cryptographic key representing card data. Consult the table [WalletKey](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"} for more information.                                                                                |
| `Wallet.Eci`              | Text  | 3       | Yes         | The ECI (Electronic Commerce Indicator) represents how safe a transaction is. This value must be taken into account by the merchant when deciding on capturing the transaction. |
| `Wallet.Cavv`             | Text  | 255     | Yes         | Validation field returned by Wallet and used as authorization basis.                                                                                                     |

## Response

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******1521",
      "Holder": "Gama Gama",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "TIPO DE WALLET",
      "Eci": 0
    },
    "SoftDescriptor": "123456789ABCD",
    "Amount": 100,
    "ReceivedDate": "2018-03-19 16:08:16",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491/void"
      }
    ]
  }
}
```

| Property                  | Description                                                                                                                      | Type  | Size | Format                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | ------------------------------------ |
| `ProofOfSale`                | Authorization number, identical to NSU.                                                                                        | Text | 6       | Alphanumeric                  |
| `Tid`                        | Transaction ID in the acquirer.                                                                                                 | Text | 20      | Alphanumeric                   |
| `AuthorizationCode`          | Authorization code.                                                                                                         | Text | 6       | Alphanumeric                   |
| `SoftDescriptor`             | Text to be printed on customer's invoice. Note: Does not allow special characters. Available for VISA/MASTER only. | Text | 13      | Alphanumeric                   |
| `PaymentId`                  | Order identifier field.                                                                                                 | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                        | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2       | E.g.: 7                          |
| `Status`                     | Transaction status.                                                                                                           | Byte  | ---     | 2                                    |
| `ReturnCode`                 | Return code from acquirer.                                                                                              | Text | 32      | Alphanumeric                   |
| `ReturnMessage`              | Return message from acquirer.                                                                                            | Text | 512     | Alphanumeric                   |
| `Type`                       | Wallet type: `Masterpass` / `ApplePay` / `SamsungPay`                                       | Text | 255     | Alphanumeric                   |
| `Walletkey`                  | Cryptographic key representing card data. Consult the table [WalletKey](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"} for more information.                              | Text | 255     | Check the [WalletKey table](https://developercielo.github.io/en/manual/cielo-ecommerce#walletkey){:target="_blank"}               |
| `AdditionalData.capturecode` | Code passed to merchant by Masterpass.                                                                                  | Text | 255     | 3                                    |

# Annexes

## Transaction Status List

List of statuses returned by the API:

| Code | Payment status | Payment method                                                        | Description                                                                                                                                                                                                                                                                                                                                                                              |
| ------ | ------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | NotFinished         | All                                                                    | **Failed to process the payment**.<br>Possible causes: incorrect data, error in the request, acquirer _timeout_, some processing instability.<br>In case of debit transaction, the buyer may have abandoned the purchase.                                                                                                                                            |
| 1      | Authorized          | All                                                                    | **Payment methods able to be captured or paid (boleto)**.<br>For a boleto transaction, it means that the boleto was successfully generated.<br>For a card transaction, it means that there was approval by the issuing bank. However, this does not mean that the transaction has been completed - for this, a second step is required, capturing the transaction or making the payment. |
| 2      | PaymentConfirmed    | All                                                                    | Payment confirmed and completed.                                                                                                                                                                                                                                                                                                                                                     |
| 3      | Denied              | Credit and debit cards (electronic transfer) and e-wallets. | **Payment denied by authorizer**. <br>Possible causes: insufficient limit, lack of payment on the card, unavailable brand, blocking due to fraud, among others.<br>To find out the real reason for the denial, it is necessary to look at the return code generated during the transaction.                                                                                                    |
| 10     | Voided              | All, except boleto                                                    | **Payment canceled**.<br>It is the suspension of the transaction, exempting from fees or amounts charged. Pre-authorized transactions can be canceled even after 23:59 on the authorization date. Captured transactions can be canceled up to 11:59 pm on the same day of authorization, after which time the amount will be reversed.                                                     |
| 11     | Refunded            | Credit and debit cards and e-wallets.                                 | **Payment cancelled/reversed**.<br>Means that the cancellation of the transaction was requested, which may occur from 0:00 am on the day after the creation of the transaction. Regardless of the amount, it is only possible to make one reversal request per transaction. This can happen due to incorrect data or at the request of the shopper.                                  |
| 12     | Pending             | Credit and debit cards (electronic transfer), e-wallets and pix. | **Awaiting return from financial institution**. <br>Means that the transaction was sent to Cielo in the pre-authorization process, awaiting a response from the issuing bank to validate it.                                                                                                                                                                                        |
| 13     | Aborted             | All                                                                    | **Payment canceled due to processing failure**.<br>Means that the transaction was canceled due to processing failure. It can also be aborted if Anti-Fraud denies the transaction before authorization.                                                                                                                                                                         |
| 20     | Scheduled           |Credit card and e-wallets.                                           | **Scheduled recurrence**.<br>Means that the transaction will have a scheduled recurrence, that is, the purchase amount will be collected on the day it was scheduled by the store.                                                                                                                                                                                                                  |
