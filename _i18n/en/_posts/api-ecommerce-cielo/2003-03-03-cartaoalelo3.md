---
layout: manual
title: Alelo Cards
description: Manual integração para Pilotos
translated: true
toc_footers: true
categories: manual
sort_order: 3
tags:
  - API Payment
language_tabs:
  json: JSON
  shell: cURL
---

# Alelo Cards

To create a sale that will use Alelo card, you need to make a `POST` for the Payment feature using the technical contract of a `Debit Card` sale.

> For more information on debit card integration via the Cielo Ecommerce API, access the [Integration Manual](https://developercielo.github.io/en/manual/cielo-ecommerce#creating-a-simplified-sale)

**OBS:** In ALELO Card transactions, the following parameters must have static configurations

| Parameter              | ALELO Standard        |
| ---------------------- | --------------------- |
| `Payment.Authenticate` | **FALSE** or not sent |
| `DebitCard.Brand`      | Must be sent as ELO   |

### Requisition

Production EndPoints

> **Transaction requisition**: https://api.cieloecommerce.cielo.com.br/ > **Transaction query**: https://apiquery.cieloecommerce.cielo.com.br/

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2014121201",
   "Customer":{
      "Name":"Comprador Cartão de Alelo"
   },
   "Payment":{
     "Type":"DebitCard",
     "Authenticate":false,
     "Amount":50,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{
         "CardNumber":"5080540487508044",
         "Holder":"Comprador Cartão de Alelo",
         "ExpirationDate":"07/2029",
         "SecurityCode":"841",
         "brand": "Elo"
     }
   }
}

--verbose
```

| Property                   | Description                                                                              | Type    | Size | Mandatory          |
| -------------------------- | ---------------------------------------------------------------------------------------- | ------- | ---- | ------------------ |
| `MerchantId`               | Store identifier in Cielo eCommerce API.                                                 | Guid    | 36   | Yes                |
| `MerchantKey`              | Public Key for Double Authentication on the Cielo eCommerce API.                         | Text    | 40   | Yes                |
| `RequestId`                | Request identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid    | 36   | No                 |
| `MerchantOrderId`          | Order ID number.                                                                         | Text    | 50   | Yes                |
| `Customer.Name`            | Buyer's name.                                                                            | Text    | 255  | No                 |
| `Customer.Status`          | Buyer registration status on the store (NEW / EXISTING) - Used by the fraud analysis.    | Text    | 255  | No                 |
| `Payment.Authenticate`     | Defines whether the buyer will be directed to the issuing bank for card authentication   | Boolean |      | No (Default false) |
| `Payment.Type`             | Payment method Type.                                                                     | Text    | 100  | Yes                |
| `Payment.Amount`           | Order value (sent in cents).                                                             | Number  | 15   | Yes                |
| `Payment.ReturnUrl`        | Merchant return URL.                                                                     | Text    | 1024 | Yes                |
| `Payment.ReturnUrl`        | URI to where the user will be redirected after payment.                                  | Text    | 1024 | Yes                |
| `DebitCard.CardNumber`     | Buyer's Card Number.                                                                     | Text    | 19   | Yes                |
| `DebitCard.Holder`         | Buyer's name printed on the card.                                                        | Text    | 25   | No                 |
| `DebitCard.ExpirationDate` | Expiration date printed on the card.                                                     | Text    | 7    | Yes                |
| `DebitCard.SecurityCode`   | Security code printed on the back of the card.                                           | Text    | 4    | **Yes**            |

### Response

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de Alelo"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "508054******8044",
            "Holder": "Comprador Cartão de Alelo",
            "ExpirationDate": "07/2029",
            "SaveCard": false,
            "Brand": "Elo"
        },
        "Provider": "Cielo",
        "AuthorizationCode": "803247",
        "Eci": "7",
        "Tid": "107703563079N41O9DJB",
        "ProofOfSale": "770857",
        "Authenticate": false,
        "Recurrent": false,
        "Amount": 50,
        "ReceivedDate": "2018-01-30 15:00:24",
        "CapturedAmount": 50,
        "CapturedDate": "2018-01-30 15:00:25",
        "ReturnUrl": "http://www.cielo.com.br",
        "Status": 2,
        "IsSplitted": false,
        "ReturnMessage": "Transacao capturada com sucesso",
        "ReturnCode": "00",
        "PaymentId": "f8504766-4ae4-4a1f-811f-035964b6c4ee",
        "Type": "DebitCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/f8504766-4ae4-4a1f-811f-035964b6c4ee"
            }
        ]
    }
}
```

| Property            | Description                                                                               | Type | Size | Format                               |
| ------------------- | ----------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `AuthenticationUrl` | URL to which the Merchant must redirect the Client for the Debit flow.                    | Text | 56   | Authentication Url                   |
| `Tid`               | Transaction ID on the acquirer.                                                           | Text | 20   | Alphanumeric text                    |
| `PaymentId`         | Order ID Field.                                                                           | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`         | Merchant return URL. URL to where the merchant will be redirected at the end of the flow. | Text | 1024 | http://www.urllogista.com.br         |
| `Status`            | Transaction status.                                                                       | Byte | ---  | 0                                    |
| `ReturnCode`        | Acquiring return code.                                                                    | Text | 32   | Alphanumeric text                    |
