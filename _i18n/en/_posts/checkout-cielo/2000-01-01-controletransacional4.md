---
layout: manual
title: Transactional Control Api
description: Technical integration via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 4
tags:
  - Checkout Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Cielo OAUTH

Cielo OAUTH is an authentication process used in Cielo APIs that are correlated to E-commerce products. It uses the **[OAUTH2](https://oauth.net/2/)** protocol, where it is first necessary to obtain an access token, using its credentials, which should then be sent to the CieloOAuth API.

> To get the `ClientID` and `ClientSecret`, contact the Cielo Products team. Credentials are released only to selected merchants.

To use Cielo Oauth you need the following credentials:

| PROPERTY       | DESCRIPTION                                                            | TYPE   |
| -------------- | ---------------------------------------------------------------------- | ------ |
| `ClientId`     | Key identifier provided by CIELO                                       | guid   |
| `ClientSecret` | Key that validates the ClientID. Provided by Cielo with the `ClientID` | string |

## Access token

To gain access to Cielo services that use `Cielo Oauth`, you will need to obtain an access token, according to the steps below:

1. Concatenate the _ClientId_ and _ClientSecret_, **ClientId: ClientSecret**
2. Encode the result in **Base64**
3. Submit a request using the HTTP POST method

### Concatenation

| Field                     | Format                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| **ClientId**              | b521b6b2-b9b4-4a30-881d-3b63dece0006                                                             |
| **ClientSecret**          | 08Qkje79NwWRx5BdgNJsIkBuITt5cIVO                                                                 |
| **ClientId:ClientSecret** | _b521b6b2-b9b4-4a30-881d-3b63dece0006:08Qkje79NwWRx5BdgNJsIkBuITt5cIVO_                          |
| **Base64**                | _YjUyMWI2YjItYjliNC00YTMwLTg4MWQtM2I2M2RlY2UwMDA2OiAwOFFramU3OU53V1J4NUJkZ05Kc0lrQnVJVHQ1Y0lWTw_ |

### Request

Request must be sent only in the Request Header.

<aside class="request"><span class="method post">POST</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/token</span></aside>

```json
x-www-form-urlencoded
--header "Authorization: Basic {base64}"
--header "Content-Type: application/x-www-form-urlencoded"
grant_type=client_credentials
```

### Response

The response will have the Token used for new requests in Cielo Services

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6Ik1ldUNoZWNrb3V0IE1hc3RlciBLZXkiLCJjbGllbnRfaWQiOiJjODlmZGasdasdasdmUyLTRlNzctODA2YS02ZDc1Y2QzOTdkYWMiLCJzY29wZXMiOiJ7XCJTY29wZVwiOlwiQ2hlY2tvdXRBcGlcIixcIkNsYWltc1wiOltdfSIsInJvbGUiOiJasdasdasd291dEFwaSIsImlzc47I6Imh0dHBzOi8vYXV0aGhvbasdasdnJhc3BhZy5jb20uYnIiLCJhdWQiOiJVVlF4Y1VBMmNTSjFma1EzSVVFbk9pSTNkbTl0ZmasdsadQjVKVVV1UVdnPSIsImV4cCI6MTQ5Nzk5NjY3NywibmJmIjoxNDk3OTEwMjc3fQ.ozj4xnH9PA3dji-ARPSbI7Nakn9dw5I8w6myBRkF-uA",
  "token_type": "bearer",
  "expires_in": 1199
}
```

| PROPERTY       | DESCRIPTION                                         | TYPE   |
| -------------- | --------------------------------------------------- | ------ |
| `Access_token` | Used to access the API services                     | string |
| `Token_type`   | Will always be of the `bearer` type                 | text   |
| `Expires_in`   | Token lifetime in seconds. Approximately 20 minutes | int    |

> The returned token (access_token) must be used in every request as an authorization key, emphasizing that it has a lifetime of 20 minutes (1200 seconds) and after this interval, it will be necessary to obtain a new token to access Cielo services.

# Transactional control

The **Transactional Control API** allows the merchant to modify the status of orders without accessing the Checkout Cielo Backoffice.

The possible operations are:

- **Query** – Search a transaction
- **Capture** – capturar uma transação com valor total/Parcial
- **Cancellation** – cancelar uma transação com valor total/Parcial

Its main goal is to enable stores and platforms to automate operations through their own systems.

> **Central Endpoint** https://cieloecommerce.cielo.com.br/api/public/v2/orders/

## Authentication

The Payment Link API Authentication Process is the **[Cielo OAUTH](https://docscielo.github.io/Pilots/manual/controletransacional4#cielo-oauth)**

## Prerequisites

In order to carry out the transaction control in Checkout Cielo it is MANDATORY that the store has one of the two notification templates configured below:

- Notification URL via **POST**
- Notification URL via **JSON**

<br>

Notification is required because all API commands (Query / Capture / Cancellation) use the unique identifier of the transaction, called `Checkout_Cielo_Order_Number`.

The `Checkout_Cielo_Order_Number` is only generated when payment is _completed on the transactional screen_. It is sent only by the _Notification URL_ and not by the Transactional Screen Creation Response.

## Query transaction

Consultation of transactions via API can be done up to 45 days after the sale has been made.

### By Merchant_Order_Number

Querying transactions by `Merchant_Order_Number` returns a list of transactions with the same number of orders. This is because Checkout Cielo does not prevent the duplication of OrderNumbers by the merchant.
The response will have the `Checkout_Cielo_Order_Number` that should be used to query a specific transaction.

#### Request

To query a transaction by `Merchant_Order_Number`, just perform a `GET`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/merchantOrderNumber/{merchantordernumber}</span></aside>

> **Header:** Authorization: Bearer {access_token}

#### Response

> "HTTP Status": 200 – OK

```json
[
  {
    "$id": "1",
    "checkoutOrderNumber": "a58995ce24fd4f1cb025701e95a51478",
    "createdDate": "2018-04-30T12:09:33.57",
    "links": [
      {
        "$id": "2",
        "method": "GET",
        "rel": "self",
        "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a58995ce24fd4f1cb025701e95a51478"
      }
    ]
  },
  {
    "$id": "3",
    "checkoutOrderNumber": "438f3391860a4bedbae9a868180dda6e",
    "createdDate": "2018-04-30T12:05:41.317",
    "links": [
      {
        "$id": "4",
        "method": "GET",
        "rel": "self",
        "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e"
      }
    ]
  }
]
```

| Property              | Description                              | Type    | Size | Format                                                                                             |
| --------------------- | ---------------------------------------- | ------- | ---- | -------------------------------------------------------------------------------------------------- |
| `$id`                 | Node's ID                                | Numeric | -    | Example: 1                                                                                         |
| `checkoutOrderNumber` | Order number generated by Checkout Cielo | Text    | 32   | Exmeplo: a58995ce24fd4f1cb025701e95a51478                                                          |
| `createdDate`         | Order's creation date                    | Data    | -    | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `links.$id`           | Node's ID                                | Numeric | -    | Example: 1                                                                                         |
| `links.method`        | method's name                            | Text    | 10   | Exmeplos: GET, POST, PUT                                                                           |
| `links.rel`           | relation's type                          | Text    | 10   | Example: self                                                                                      |
| `links.href`          | Operation's endpoint                     | Text    | 512  | Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e |

### By Checkout_Cielo_Order_Number

#### Request

To query a transaction by `Checkout_Cielo_Order_Number`, just perform `GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

#### Response

```json
{
  "merchantId": "c89fdfbb-dbe2-4e77-806a-6d75cd397dac",
  "orderNumber": "054f5b509f7149d6aec3b4023a6a2957",
  "softDescriptor": "Pedido1234",
  "cart": {
    "items": [
      {
        "name": "Pedido ABC",
        "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
        "unitPrice": 9000,
        "quantity": 1,
        "type": "1"
      }
    ]
  },
  "shipping": {
    "type": "FixedAmount",
    "services": [
      {
        "name": "Entrega Rápida",
        "price": 2000
      }
    ],
    "address": {
      "street": "Estrada Caetano Monteiro",
      "number": "391A",
      "complement": "BL 10 AP 208",
      "district": "Badu",
      "city": "Niterói",
      "state": "RJ"
    }
  },
  "payment": {
    "status": "Paid",
    "tid": "10127355487AK2C3EOTB",
    "nsu": "149111",
    "authorizationCode": "294551",
    "numberOfPayments": 1,
    "createdDate": "2018-03-02T14:29:43.767",
    "finishedDate": "2018-03-02T14:29:46.117",
    "cardMaskedNumber": "123456******2007",
    "brand": "Visa",
    "antifraud": {
      "antifraudeResult": 0,
      "description": "Lojista optou não realizar a análise do antifraude."
    }
  },
  "customer": {
    "identity": "12345678911",
    "fullName": "Fulano da Silva",
    "email": "exemplo@email.com.br",
    "phone": "11123456789"
  },
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/054f5b509f7149d6aec3b4023a6a2957"
    },
    {
      "method": "PUT",
      "rel": "void",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/054f5b509f7149d6aec3b4023a6a2957/void"
    }
  ]
}
```

| Campo                                | Tipo    | Tamanho | Descrição                                                                                                    | Formato                                                     |
| ------------------------------------ | ------- | ------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `merchantId`                         | GUID    | 36      | Merchant's ID                                                                                                | Example: c89fdfbb-dbe2-4e77-806a-6d75cd397dac               |
| `orderNumber`                        | Text    | 32      | Order's ID                                                                                                   | Example: 123456                                             |
| `softDescriptor`                     | Text    | 13      | Text printed on the buyer’s bank invoice - Only available for VISA/MASTER - does not allow special character | Example: `Loja_ABC_1234`                                    |
| `cart.items.name`                    | Text    | 128     | Cart item's name                                                                                             | Example: Pedido ABC                                         |
| `cart.items.description`             | Text    | 256     | Cart item's description.                                                                                     | Example: 50 canetas - R$30,00                               |
| `cart.items.unitPrice`               | Numeric | 18      | Cart item's amount                                                                                           | Example: R$ 1,00 = 100                                      |
| `cart.items.quantity`                | Numeric | 9       | Cart item's quantity                                                                                         | Example: 1                                                  |
| `cart.items.type`                    | Text    | 255     | Cart item's type                                                                                             | `Asset`<br>`Digital`<br>`Service`<br>`Payment`              |
| `shipping.type`                      | Numeric | 36      | Shipping method type                                                                                         | Example: 1                                                  |
| `shipping.services.name`             | Text    | 128     | Shipping method name                                                                                         | Example: Casa Principal                                     |
| `shipping.services.price`            | Numeric | 10      | Shipping method amount                                                                                       | Example: R$ 10,00 = 1000                                    |
| `shipping.address.street`            | Text    | 256     | Shipping adress street name                                                                                  | Example: Rua João da Silva                                  |
| `shipping.address.number`            | Numeric | 8       | Shipping adress street number                                                                                | Example: 123                                                |
| `shipping.address.complement`        | Text    | 64      | Shipping adress street complement                                                                            | Example: Casa                                               |
| `shipping.address.district`          | Text    | 64      | Bairro do endereço de entrega                                                                                | Example: Alphaville                                         |
| `shipping.address.city`              | Text    | 64      | Shipping adress city                                                                                         | Example: São Paulo                                          |
| `shipping.address.state`             | Text    | 2       | Shipping adress state                                                                                        | Example: SP                                                 |
| `Payment.status`                     | Text    | 10      | Payment status                                                                                               | Example: Paid                                               |
| `Payment.tid`                        | Text    | 32      | Transaction ID                                                                                               | Example: 10127355487AK2C3EOTB                               |
| `Payment.nsu`                        | Text    | 6       | Transaction NSU                                                                                              | Example: 123456                                             |
| `Payment.authorizationCode`          | Text    | 3       | Authorization Code                                                                                           | Example: 456789                                             |
| `Payment.numberOfPayments`           | Numeric | 6       | Number of installments                                                                                       | Example: 123456                                             |
| `Payment.createdDate`                | Text    | 22      | Transaction created date                                                                                     | Example: AAAA-MM-DDTHH:mm:SS.ss                             |
| `Payment.finishedDate`               | Text    | 22      | Transaction finished date                                                                                    | Example: AAAA-MM-DDTHH:mm:SS.ss                             |
| `Payment.cardMaskedNumber`           | Text    | 19      | Masked card number                                                                                           | Example: 123456**\*\***2007                                 |
| `Payment.brand`                      | Text    | 10      | Card scheme name                                                                                             | Example: Visa                                               |
| `Payment.antifraud.antifraudeResult` | Numeric | 1       | Antifraud status                                                                                             | Example: 1                                                  |
| `Payment.antifraud.description`      | Text    | 256     | Antifraud status description                                                                                 | Example: Lojista optou não realizar a análise do antifraude |
| `Customer.Identity`                  | Numeric | 14      | Buyer's CPF or CNPJ                                                                                          | Example: 12345678909                                        |
| `Customer.FullName`                  | Text    | 256     | Buyer's name                                                                                                 | Example: Fulano da Silva                                    |
| `Customer.Email`                     | Text    | 64      | Buyer's email address                                                                                        | Example: Example@email.com.br                               |
| `Customer.Phone`                     | Numeric | 11      | Buyer's phone number                                                                                         | Example: 11123456789                                        |

### By Payment Link ID

#### Request

To query a transaction by `id`, just perform `GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}/payments</span></aside>

#### Response

```json
{
  "$id": "1",
  "productId": "9487e3a9-f204-4188-96c5-a5a3013b2517",
  "createdDate": "2019-07-11T10:35:04.947",
  "orders": [
    {
      "$id": "2",
      "orderNumber": "b74df3e3c1ac49ccb7ad89fde2d787f7",
      "createdDate": "2019-07-11T10:37:23.447",
      "payment": {
        "$id": "3",
        "price": 11500,
        "numberOfPayments": 6,
        "createdDate": "2019-07-11T10:37:23.447",
        "status": "Denied"
      },
      "links": [
        {
          "$id": "4",
          "method": "GET",
          "rel": "self",
          "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/b74df3e3c1ac49ccb7ad89fde2d787f7"
        }
      ]
    }
  ]
}
```

| Property                          | Description                              | Type    | Size            | Format                                                                                             |
| --------------------------------- | ---------------------------------------- | ------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `$id`                             | Node's ID                                | Numeric | -               | Example: 1                                                                                         |
| `productId`                       | Payment Link ID                          | GUID    | 36              | Exmeplo: 9487e3a9-f204-4188-96c5-a5a3013b2517                                                      |
| `createdDate`                     | Payment Link creation date               | Date    | -               | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `orders.$id`                      | Node's ID                                | Numeric | -               | Example: 1                                                                                         |
| `orders.orderNumber`              | Order number generated by Checkout Cielo | Text    | 32              | Example: b74df3e3c1ac49ccb7ad89fde2d787f7                                                          |
| `orders.createdDate`              | Order creation date                      | Date    | -               | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `orders.payment.$id`              | Node's ID                                | Numeric | -               | Example: 1                                                                                         |
| `orders.payment.price`            | Transaction amount                       | Numeric | -               | Example: R$ 1,00 = 100                                                                             |
| `orders.payment.numberOfPayments` | Number of installments                   | -       | Example: 3      |
| `orders.payment.createdDate`      | Transaction creation date                | Date    | -               | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `orders.payment.status`           | Transaction status                       | Text    | Example: Denied |
| `links.$id`                       | Node's ID                                | Numeric | -               | Example: 1                                                                                         |
| `links.method`                    | method's name                            | Text    | 10              | Exmeplos: GET, POST, PUT                                                                           |
| `links.rel`                       | relation's type                          | Text    | 10              | Example: self                                                                                      |
| `links.href`                      | Operation's endpoint                     | Text    | 512             | Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e |

## Capture transaction

### Request

To capture a transaction by `Checkout_Cielo_Order_Number`, just perform a `PUT`.

**Total Capture**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/capture</span></aside>

**Partial Capture**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/capture?amount={Valor}</span></aside>

**OBS**: Partial capture can only be performed once and is exclusive to credit card.

> **Header:** Authorization: Bearer {access_token}

### Response

> HTTP Status: 200 – OK

```json
{
  "success": true,
  "status": 2,
  "returnCode": "6",
  "returnMessage": "Operation Successful",
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96"
    },
    {
      "method": "PUT",
      "rel": "void",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96/void"
    }
  ]
}
```

| PROPERTY        | DESCRIPTION                                                                                                                                                       | TYPE    | SIZE |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| `success`       | Sets the status of the update process                                                                                                                             | Boolean |      |
| `status`        | Checkout transaction status - [STATUS](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos)                                             | int     | 2    |
| `returnCode`    | Code explaining the reason for denied or authorized transactions - [Code table](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos)    | String  | 2    |
| `returnMessage` | Message explaining the reason for denied or authorized transactions - [Code table](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos) | String  | 255  |

## Cancel transaction

### Request

To cancel a transaction by `Checkout_Cielo_Order_Number`, just perform a `PUT`.

For cancellation requests for the same transaction, it is necessary to wait a period of 5 seconds between one request and another, so that the balance inquiry is carried out, the amount is reserved in the financial agenda and the balance is sensitized. Thus avoiding duplicate cancellation. This rule applies to total and/or partial cancellations.

To identify that cancellation requests are from the same transaction, we consider the EC number, cancellation authorization number, date of sale, sale amount, and NSU.

It is important to note that in order to make any cancellation request, it is necessary that the establishment has sufficient balance in the transaction/on the schedule

**Total Cancellation**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/void</span></aside>

**Partial Cancellation**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/void?amount={Valor}</span></aside>

**OBS**: The partial cancellation can be performed only after the capture. Partial cancellation can be performed countless times until the total amount is canceled.

> **Header:** Authorization: Bearer {access_token}

### Response

> HTTP Status: 200 – OK

```json
{
  "success": true,
  "status": 2,
  "returnCode": "6",
  "returnMessage": "Operation Successful",
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96"
    },
    {
      "method": "PUT",
      "rel": "void",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96/void"
    }
  ]
}
```

| PROPERTY        | DESCRIPTION                                                                                                                                                       | TYPE    | SIZE |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| `success`       | Sets the status of the update process                                                                                                                             | Boolean |      |
| `status`        | Checkout transaction status - [STATUS](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos)                                             | int     | 2    |
| `returnCode`    | Code explaining the reason for denied or authorized transactions - [Code table](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos)    | String  | 2    |
| `returnMessage` | Message explaining the reason for denied or authorized transactions - [Code table](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos) | String  | 255  |

## Status and Codes

### Transactional status

The Checkout has its own Status, Unlike the CIELO SITE or the Cielo ecommerce API. Check the complete list below.

| Value | Transaction Status | Payment methods              | Description                                                                                                               |
| ----- | ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1     | `Pending`          | For every payment method     | The payment is still being processed; OBS: Payment slip - The payment slip didn't have its status altered by the merchant |
| 2     | `Payed`            | For every payment method     | Transaction captured and money will be deposited into account.                                                            |
| 3     | `Denied`           | Credit card only             | Transaction not authorized by the person responsible for the payment method                                               |
| 4     | `Expired`          | Credit card and payment slip | Transaction no longer valid for capture - **15 days after Authorization**                                                 |
| 5     | `Canceled`         | Credit card only             | Transaction canceled by the merchant                                                                                      |
| 6     | `Not Finished`     | For every payment method     | Payment waiting for status - May indicate error or processing failure. Contact CieloSupport                               |
| 7     | `Authorized`       | Credit card only             | Transaction authorized by the card issuer. Must be captured for the money to be deposited into account                    |
| 8     | `Chargeback`       | Credit card only             | Transaction canceled by the consumer with the card issuer. Money will not be deposited into account.                      |

### Return codes

Codes issued by credit and debit card issuers explaining the reason a transaction is authorized or not.

| Answer Code | Definition                                                                                                                                                   | Meaning                                                                                                                                                                                                                                                                                      | Action                                                                                                                                                                                                              | Allows Retry                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 00          | Transaction successfully authorized.                                                                                                                         | Transaction successfully authorized.                                                                                                                                                                                                                                                         | Transaction successfully authorized.                                                                                                                                                                                | No                                          |
| 000         | Transaction successfully authorized.                                                                                                                         | Transaction successfully authorized.                                                                                                                                                                                                                                                         | Transaction successfully authorized.                                                                                                                                                                                | No                                          |
| 01          | Unauthorized transaction. Referred transaction.                                                                                                              | Unauthorized transaction. Referred (suspected of fraud) by the issuing bank.                                                                                                                                                                                                                 | Transaction not authorized. Contact your issuing bank.                                                                                                                                                              | No                                          |
| 02          | Unauthorized transaction. Referred transaction.                                                                                                              | Unauthorized transaction. Referred (suspected of fraud) by the issuing bank.                                                                                                                                                                                                                 | Transaction not authorized. Contact your issuing bank.                                                                                                                                                              | No                                          |
| 03          | Transaction not allowed. Error registering establishment code in the EFT configuration file                                                                  | Transaction not allowed. Invalid establishment. Contact Cielo.                                                                                                                                                                                                                               | The transaction could not be processed. Contact the Virtual Store.                                                                                                                                                  | No                                          |
| 04          | Unauthorized transaction. Card blocked by issuing bank.                                                                                                      | Unauthorized transaction. Card blocked by issuing bank.                                                                                                                                                                                                                                      | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 05          | Unauthorized transaction. Delinquent card (Do not honor).                                                                                                    | Unauthorized transaction. The transaction could not be processed. Issue related to security, delinquency or cardholder limit.                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | Only 4 times in 16 days.                    |
| 06          | Unauthorized transaction. Canceled card.                                                                                                                     | Unauthorized transaction. The transaction could not be processed. Card permanently canceled by issuing bank.                                                                                                                                                                                 | The transaction could not be processed. Contact your issuing bank.                                                                                                                                                  | No                                          |
| 07          | Transaction denied. Hold card special condition                                                                                                              | Unauthorized transaction by issuing bank's rules.                                                                                                                                                                                                                                            | Unauthorized transaction. Contact your issuing bank                                                                                                                                                                 | No                                          |
| 08          | Unauthorized transaction. Invalid security code.                                                                                                             | Unauthorized transaction. Invalid security code. Guide the cardholder to correct the data and try again.                                                                                                                                                                                     | Unauthorized transaction. Invalid data. Correct data and inform again.                                                                                                                                              | No                                          |
| 11          | Successfully authorized transaction for card issued abroad                                                                                                   | Transaction successfully authorized.                                                                                                                                                                                                                                                         | Transaction successfully authorized.                                                                                                                                                                                | No                                          |
| 12          | Invalid transaction, card error.                                                                                                                             | The transaction could not be processed. Ask the cardholder to check the card details and try again.                                                                                                                                                                                          | The transaction could not be processed. review the reported data and try again. If the error persists, contact your issuing bank.                                                                                   | No                                          |
| 13          | Transaction not allowed. Invalid transaction value.                                                                                                          | Transaction not allowed. Invalid value. Ask the cardholder to review the data and try again. If the error persists, contact Cielo.                                                                                                                                                           | Unauthorized transaction. Invalid value. Redo the transaction and confir the reported data. If the error persists, contact the virtual store.                                                                       | No                                          |
| 14          | Unauthorized transaction. Invalid card                                                                                                                       | Unauthorized transaction. Invalid card. The problem may be card blocked at the issuing bank, incorrect data or card testing attempts. Use the Lhum Algorithm (Mod 10) to prevent unauthorized transactions for this reason. Access www.cielo.com.br/developers to deploy the Lhum Algorithm. | The transaction could not be processed. review the reported data and try again. If the error persists, please contact your issuing bank.                                                                            | No                                          |
| 15          | Issuing bank unavailable or non-existent.                                                                                                                    | Unauthorized transaction. Issuing bank unavailable.                                                                                                                                                                                                                                          | The transaction could not be processed. Contact your issuing bank.                                                                                                                                                  | No                                          |
| 19          | Redo the transaction or try again later.                                                                                                                     | The transaction could not be processed. Please redo the transaction or try again later. If the error persists, contact Cielo.                                                                                                                                                                | The transaction could not be processed. Please redo the transaction or try again later. If the error persists, contact the virtual store.                                                                           | Only 4 times in 16 days.                    |
| 21          | Cancellation not done. transaction not found.                                                                                                                | Cancellation was not processed. If the error persists, contact Cielo.                                                                                                                                                                                                                        | The cancellation could not be processed. Please try again later. If the error persists, contact the virtual store.                                                                                                  | No                                          |
| 22          | Invalid installment. Invalid number of installments.                                                                                                         | The transaction could not be processed. Invalid number of installments. If the error persists, contact Cielo.                                                                                                                                                                                | The transaction could not be processed. Invalid value. Redo the transaction and confirm the reported data. If the error persists, contact the virtual store.                                                        | No                                          |
| 23          | Unauthorized transaction. Invalid installment amount.                                                                                                        | The transaction could not be processed. Invalid installment amount. If the error persists, contact Cielo.                                                                                                                                                                                    | The transaction could not be processed. Invalid installment value. Redo the transaction and confirm the reported data. If the error persists, contact the virtual store.                                            | No                                          |
| 24          | Invalid amount of installment.                                                                                                                               | The transaction could not be processed. Invalid amount of installments. If the error persists, contact Cielo.                                                                                                                                                                                | The transaction could not be processed. Invalid amount of installment. Redo the transaction and confirm the reported data. If the error persists, contact the virtual store.                                        | No                                          |
| 25          | Authorization request did not send card number                                                                                                               | The transaction could not be processed. Authorization Request did not send the card number. If the error persists, check the communication between the virtual store and Cielo.                                                                                                              | The transaction could not be processed. review the reported data and try again. If the error persists, contact the virtual store.                                                                                   | Only 4 times in 16 days.                    |
| 28          | File temporarily unavailable.                                                                                                                                | The transaction could not be processed. File temporarily unavailable. Review the communication between Virtual Store and Cielo. If the error persists, contact Cielo.                                                                                                                        | The transaction could not be processed. Contact the Virtual Store.                                                                                                                                                  | Only 4 times in 16 days.                    |
| 30          | Unauthorized transaction. Decline Message                                                                                                                    | The transaction could not be processed. Ask the card holder to review the data and try again. If the error persists check if the communication with Cielo is being made correctly.                                                                                                           | The transaction could not be processed. Review the data and try again. If the error persists, contact the store.                                                                                                    | No                                          |
| 39          | Unauthorized transaction. Issuing bank error.                                                                                                                | Unauthorized transaction. Issuing bank error.                                                                                                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 41          | Unauthorized transaction. Card blocked by loss.                                                                                                              | Unauthorized transaction. Card blocked by loss.                                                                                                                                                                                                                                              | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 43          | Unauthorized transaction. Card blocked by stealing.                                                                                                          | Unauthorized transaction. Card blocked by stealing.                                                                                                                                                                                                                                          | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 51          | Unauthorized transaction. Limit exceeded / no balance.                                                                                                       | Unauthorized transaction. Limit exceeded / no balance.                                                                                                                                                                                                                                       | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | From the next day, only 4 times in 16 days. |
| 52          | Card with invalid check digit.                                                                                                                               | The transaction could not be processed. Card with invalid check digit.                                                                                                                                                                                                                       | Unauthorized transaction. Review the reported data and try again.                                                                                                                                                   | No                                          |
| 53          | Transaction not allowed. Invalid Savings Card                                                                                                                | Transaction not allowed. Invalid Savings Card.                                                                                                                                                                                                                                               | The transaction could not be processed. Contact your issuing bank.                                                                                                                                                  | No                                          |
| 54          | Unauthorized transaction. Expired card                                                                                                                       | Unauthorized transaction. Expired card.                                                                                                                                                                                                                                                      | Unauthorized transaction. Confirm the data and redo the transaction.                                                                                                                                                | No                                          |
| 55          | Unauthorized transaction. Invalid password                                                                                                                   | Unauthorized transaction. Invalid password.                                                                                                                                                                                                                                                  | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 57          | Transaction not allowed for the card                                                                                                                         | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                              | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | Only 4 times in 16 days.                    |
| 58          | Transaction not allowed. Invalid payment method.                                                                                                             | Transaction not allowed. Invalid payment method. Check if the payment option you selected is enabled in the registration                                                                                                                                                                     | Unauthorized transaction. Contact your virtual store.                                                                                                                                                               | No                                          |
| 59          | Unauthorized transaction. Suspect of fraud.                                                                                                                  | Unauthorized transaction. Suspect of fraud.                                                                                                                                                                                                                                                  | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 60          | Unauthorized transaction.                                                                                                                                    | Unauthorized transaction. Try again. If the error persists, the card holder must contact the issuing bank.                                                                                                                                                                                   | The transaction could not be processed. Try again later. If the error persists, please contact your issuing bank..                                                                                                  | Only 4 times in 16 days.                    |
| 61          | Unavailable issuing bank.                                                                                                                                    | Unauthorized transaction. Unavailable issuing bank.                                                                                                                                                                                                                                          | Unauthorized transaction. Try again. If the error persists, please contact your issuing bank.                                                                                                                       | Only 4 times in 16 days.                    |
| 62          | Unauthorized transaction. Card restricted to home use                                                                                                        | Unauthorized transaction. Card restricted to home use.                                                                                                                                                                                                                                       | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | From the next day, only 4 times in 16 days. |
| 63          | Unauthorized transaction. Security breach                                                                                                                    | Unauthorized transaction. Security breach.                                                                                                                                                                                                                                                   | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 64          | Unauthorized transaction. Value below the minimum required by the issuing bank.                                                                              | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                                                                                         | Unauthorized transaction. Value below the minimum required by the issuing bank.                                                                                                                                     | No                                          |
| 65          | Unauthorized transaction. Exceeded the number of transactions for the card.                                                                                  | Unauthorized transaction. Exceeded the number of transactions for the card.                                                                                                                                                                                                                  | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | Only 4 times in 16 days.                    |
| 67          | Unauthorized transaction. Card blocked for shopping today.                                                                                                   | Unauthorized transaction. Card blocked for shopping today. Blocking may have occurred because of excess of invalid attempts. Card will be automatically unlocked at midnight.                                                                                                                | Unauthorized transaction. Card temporarily blocked. Contact your issuing bank.                                                                                                                                      | From the next day, only 4 times in 16 days. |
| 70          | Unauthorized transaction. Limit exceeded / no balance.                                                                                                       | Unauthorized transaction. Limit exceeded / no balance.                                                                                                                                                                                                                                       | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | From the next day, only 4 times in 16 days. |
| 72          | Cancellation not done. Insufficient balance available for cancellation.                                                                                      | Cancellation not done. Insufficient balance available for cancellation. If the error persists, contact Cielo.                                                                                                                                                                                | Cancellation not done. Try again later. If the error persists, contact the virtual store.                                                                                                                           | No                                          |
| 74          | Unauthorized transaction. Password expired.                                                                                                                  | Unauthorized transaction. Password expired.                                                                                                                                                                                                                                                  | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| 75          | Blocked password. Exceeded card attempts.                                                                                                                    | Unauthorized transaction.                                                                                                                                                                                                                                                                    | Your Transaction can not be processed. Contact your card issuer.                                                                                                                                                    | No                                          |
| 76          | Cancellation not done. Issuing bank did not locate the original transaction                                                                                  | Cancellation not done. Issuing bank did not locate the original transaction                                                                                                                                                                                                                  | Cancellation not done. Contact the virtual store.                                                                                                                                                                   | No                                          |
| 77          | Cancellation not done. Original transaction not found                                                                                                        | Cancellation not done. Original transaction not found                                                                                                                                                                                                                                        | Cancellation not done. Contact the virtual store.                                                                                                                                                                   | No                                          |
| 78          | Unauthorized transaction. Blocked card first use.                                                                                                            | Unauthorized transaction. Blocked card first use. Ask the card holder to unblock the card directly from their issuing bank.                                                                                                                                                                  | Unauthorized transaction. Please contact your issuing bank and request card unlocking.                                                                                                                              | No                                          |
| 80          | Unauthorized transaction. Divergence on transaction / payment date.                                                                                          | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                                    | Unauthorized transaction. Confirm the data and redo the transaction.                                                                                                                                                | No                                          |
| 82          | Unauthorized transaction. Invalid card.                                                                                                                      | Unauthorized transaction. Invalid Card. Ask the card holder to review the data and try again.                                                                                                                                                                                                | Unauthorized transaction. Confirm the data and redo the transation. If the error persists, contact your issuing bank.                                                                                               | No                                          |
| 83          | Unauthorized transaction. Error in password control                                                                                                          | Unauthorized transaction. Error in password control                                                                                                                                                                                                                                          | Unauthorized transaction. Confirm the data and redo the transation. If the error persists, contact your issuing bank.                                                                                               | No                                          |
| 85          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was a processing error. Ask the card holder to re-enter the card data, if the error persists there may be a problem in the merchant terminal, in which case the merchant should contact Cielo.                                                                | Transaction not allowed. Please enter the card data again. If the error persists, contact the virtual store.                                                                                                        | No                                          |
| 86          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was a processing error. Ask the card holder to re-enter the card data, if the error persists there may be a problem in the merchant terminal, in which case the merchant should contact Cielo.                                                                | Transaction not allowed. Please enter the card data again. If the error persists, contact the virtual store.                                                                                                        | No                                          |
| 89          | Transaction error.                                                                                                                                           | Unauthorized transaction. Transaction error. The bearer should try again and if the error persists, contact the issuing bank.                                                                                                                                                                | Unauthorized transaction. Transaction error. The bearer should try again and if the error persists, contact the issuing bank.                                                                                       | Only 4 times in 16 days.                    |
| 90          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was a processing error. Ask the card holder to re-enter the card data, if the error persists there may be a problem in the merchant terminal, in which case the merchant should contact Cielo.                                                                | Transaction not allowed. Please enter the card data again. If the error persists, contact the virtual store.                                                                                                        | No                                          |
| 91          | Unauthorized transaction. Issuing bank temporarily unavailable.                                                                                              | Unauthorized transaction. Issuing bank temporarily unavailable.                                                                                                                                                                                                                              | Unauthorized transaction. Issuing bank temporarily unavailable. Contact your issuing bank.                                                                                                                          | Only 4 times in 16 days.                    |
| 92          | Unauthorized transaction. Communication time exceeded.                                                                                                       | Unauthorized transaction. Communication time exceeded.                                                                                                                                                                                                                                       | Unauthorized transaction. Communication temporarily unavailable. Contact the virtual store.                                                                                                                         | Only 4 times in 16 days.                    |
| 93          | Unauthorized transaction. Rule violation - Possible registration error.                                                                                      | Unauthorized transaction. Rule violation - Possible registration error.                                                                                                                                                                                                                      | Your transaction can not be processed. Contact the online store.                                                                                                                                                    | No                                          |
| 96          | Processing failed.                                                                                                                                           | The transaction could not be processed. Failure in Cielo's system. If the error persists, contact Cielo.                                                                                                                                                                                     | Your Transaction can not be processed, please try again later. If the error persists, contact the virtual store.                                                                                                    | Only 4 times in 16 days.                    |
| 97          | Value not allowed for this transaction                                                                                                                       | Unauthorized transaction. Value not allowed for this transaction.                                                                                                                                                                                                                            | Unauthorized transaction. Value not allowed for this transaction.                                                                                                                                                   | No                                          |
| 98          | System / communication unavailable.                                                                                                                          | Unauthorized transaction. Issuer system without communication. If general, check SITEF, GATEWAY and / or Connectivity.                                                                                                                                                                       | Your Transaction can not be processed, please try again later. If the error persists, contact the virtual store..                                                                                                   | Only 4 times in 16 days.                    |
| 99          | System / communication unavailable.                                                                                                                          | Unauthorized transaction. Issuer system without communication. Try again later. It may be an error on SITEF, please check!                                                                                                                                                                   | Your Transaction can not be processed, please try again later. If the error persists, contact the virtual store.                                                                                                    | From the next day, only 4 times in 16 days. |
| 999         | System / communication unavailable.                                                                                                                          | Unauthorized transaction. Issuer system without communication. Try again later. It may be an error on SITEF, please check!                                                                                                                                                                   | Your Transaction can not be processed, please try again later. If the error persists, contact the virtual store.                                                                                                    | From the next day, only 4 times in 16 days. |
| AA          | Time Exceeded                                                                                                                                                | Time exceeded when communicating with the issuing bank. Ask the card holder to try again, if the error persists it will be necessary for the card holder to contact his issuing bank.                                                                                                        | Time exceeded when communicating with the issuing bank. Ask the card holder to try again, if the error persists it will be necessary for the card holder to contact his issuing bank.                               | Only 4 times in 16 days.                    |
| AC          | Transaction not allowed. Debit card being used with credit. Use the debit function.                                                                          | Transaction not allowed. Debit card being used with credit. Ask the card holder to select the Debit Card payment option.                                                                                                                                                                     | Unauthorized transaction. Select the debit card payment option and try again.                                                                                                                                       | No                                          |
| AE          | Try again later                                                                                                                                              | Time exceeded when communicating with the issuing bank. Ask the card holder to try again, if the error persists it will be necessary for the card holder to contact his issuing bank.                                                                                                        | Time exceeded when communicating with the issuing bank, try again later. If the error persists, contact your bank..                                                                                                 | Only 4 times in 16 days.                    |
| AF          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was a processing error. Ask the card holder to re-enter the card data, if the error persists there may be a problem in the merchant terminal, in which case the merchant should contact Cielo.                                                                | Transaction not allowed. Please enter the card data again. If the error persists, contact the virtual store.                                                                                                        | No                                          |
| AG          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was a processing error. Ask the card holder to re-enter the card data, if the error persists there may be a problem in the merchant terminal, in which case the merchant should contact Cielo.                                                                | Transaction not allowed. Please enter the card data again. If the error persists, contact the virtual store.                                                                                                        | No                                          |
| AH          | Transaction not allowed. Credit card being used with debit. Use the credit function.                                                                         | Transaction not allowed. Credit card being used with debit. Ask the card holder to select the Credit Card payment option.                                                                                                                                                                    | Unauthorized transaction. Select the credit card payment option and try again.                                                                                                                                      | No                                          |
| AI          | Unauthorized transaction. Authentication was not performed.                                                                                                  | Unauthorized transaction. Authentication was not performed. The card holder has not completed authentication. Ask the card holder to review the data and try again. If the error persists, contact Cielo informing the BIN (6 first digits of the card)                                      | Unauthorized transaction. Authentication failed. Please try again and enter the requested data correctly. If the error persists, contact the merchant.                                                              | No                                          |
| AJ          | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Please try again by selecting the Private Label option. | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Ask the card holder to try again by selecting the Private Label option. If you do not have the Private Label option check if your establishment allows this operation with Cielo.       | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Please try again and select the Private Label option. In case of a new error please contact the virtual store. | No                                          |
| AV          | Unauthorized transaction. Invalid data                                                                                                                       | Validation of transaction data failed. Ask the card holder to review the data and try again.                                                                                                                                                                                                 | Data validation failed. Review the reported data and try again.                                                                                                                                                     | Only 4 times in 16 days.                    |
| BD          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was a processing error. Ask the card holder to re-enter the card data, if the error persists there may be a problem in the merchant terminal, in which case the merchant should contact Cielo.                                                                | Transaction not allowed. Please enter the card data again. If the error persists, contact the virtual store.                                                                                                        | No                                          |
| BL          | Unauthorized transaction. Daily limit exceeded.                                                                                                              | Unauthorized transaction. Daily limit exceeded. Ask the card holder to contact the issuing bank.                                                                                                                                                                                             | Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.                                                                                                                                          | From the next day, only 4 times in 16 days. |
| BM          | Unauthorized transaction. Invalid Card                                                                                                                       | Unauthorized transaction. Invalid card. The problem may be card blocked at the issuing bank or incorrect data. Try to use the Lhum Algorithm (Mod 10) to avoid unauthorized transactions for this reason.                                                                                    | Unauthorized transaction. Invalid card. Confirm the reported data and redo the transaction.                                                                                                                         | No                                          |
| BN          | Unauthorized transaction. Blocked card or account.                                                                                                           | Unauthorized transaction. The card holder's card or account is blocked. Ask the card holder to contact the issuing bank.                                                                                                                                                                     | Unauthorized transaction. The card holder's card or account is blocked. Contact your issuing bank.                                                                                                                  | No                                          |
| BO          | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error processing. Ask the card holder to re-enter the card data, if the error persists, contact the issuing bank.                                                                                                                                      | Transaction not allowed. There was a processing error. Re-enter card data, if the error persists, contact issuing bank.                                                                                             | Only 4 times in 16 days.                    |
| BP          | Unauthorized transaction. Non-existent checking account.                                                                                                     | Unauthorized transaction. It was not possible to process the transaction due to an error related to the holder's card or account. Ask the card holder to contact the issuing bank.                                                                                                           | Unauthorized transaction. It was not possible to process the transaction due to an error related to the holder's card or account. Contact the issuing bank.                                                         | No                                          |
| BV          | Unauthorized transaction. Expired card.                                                                                                                      | Unauthorized transaction. Expired card.                                                                                                                                                                                                                                                      | Unauthorized transaction. Confirm the data and redo the transaction.                                                                                                                                                | No                                          |
| CF          | Unauthorized transaction. C79: J79 Data validation failed.                                                                                                   | Unauthorized transaction. Data validation failed. Ask the card holder to contact the issuing bank.                                                                                                                                                                                           | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                                         | No                                          |
| CG          | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Ask the card holder to contact the issuing bank.                                                                                                                                                                                           | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                                         | No                                          |
| DA          | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Ask the card holder to contact the issuing bank.                                                                                                                                                                                           | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                                         | No                                          |
| DF          | Transaction not allowed. Invalid card or card failure.                                                                                                       | Transaction not allowed. Invalid card or card failure. Ask the card holder to re-enter the card data, if the error persists, contact the bank                                                                                                                                                | Transaction not allowed. Invalid card or card failure. Re-enter card data, if error persists, contact bank                                                                                                          | Only 4 times in 16 days.                    |
| DM          | Unauthorized transaction. Limit exceeded / no balance.                                                                                                       | Unauthorized transaction. Limit exceeded / no balance.                                                                                                                                                                                                                                       | Transaction not allowed. Contact your issuing bank.                                                                                                                                                                 | From the next day, only 4 times in 16 days. |
| DQ          | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Ask the card holder to contact the issuing bank.                                                                                                                                                                                           | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                                         | No                                          |
| DS          | Transaction not allowed for the card                                                                                                                         | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                              | Unauthorized transaction. Data validation failed. Contact your issuing bank.                                                                                                                                        | Only 4 times in 16 days.                    |
| EB          | Unauthorized transaction. Daily limit exceeded.                                                                                                              | Unauthorized transaction. Daily limit exceeded. Ask the card holder to contact the issuing bank.                                                                                                                                                                                             | Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.                                                                                                                                          | From the next day, only 4 times in 16 days. |
| EE          | Transaction not allowed. installment value below the minimum allowed.                                                                                        | Transaction not allowed. installment value below the minimum allowed. installments below R$ 5,00 are not allowed. Installmente calculation review needed.                                                                                                                                    | Transaction not allowed. installment value below the minimum allowed. Contact the virtual store.                                                                                                                    | No                                          |
| EK          | Transaction not allowed for the card                                                                                                                         | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                              | Unauthorized transaction. Data validation failed. Contact your issuing bank.                                                                                                                                        | Only 4 times in 16 days.                    |
| FA          | Unauthorized transaction.                                                                                                                                    | Unauthorized transaction AmEx.                                                                                                                                                                                                                                                               | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | No                                          |
| FC          | Unauthorized transaction. Call issuer                                                                                                                        | Unauthorized transaction. Ask card holder to contact issuing bank.                                                                                                                                                                                                                           | Unauthorized transaction. Conctact your issuing bank.                                                                                                                                                               | No                                          |
| FD          | Transaction denied. Hold card special condition                                                                                                              | Transaction not authorized by issuing bank rules.                                                                                                                                                                                                                                            | Unauthorized transaction. Conctact your issuing bank                                                                                                                                                                | No                                          |
| FE          | Unauthorized transaction. Divergence on transaction / payment date.                                                                                          | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                                    | Unauthorized transaction. Confirm data and redo the transaction.                                                                                                                                                    | No                                          |
| FF          | Cancellation OK                                                                                                                                              | Cancellation transaction authorized successfully. ATTENTION: This return is for cases of cancellations and not for cases of authorizations.                                                                                                                                                  | Successfully authorized cancellation transaction                                                                                                                                                                    | No                                          |
| FG          | Unauthorized transaction. Call AmEx.                                                                                                                         | Unauthorized transaction. Ask the card holder to contact the AmEx Call Center.                                                                                                                                                                                                               | Unauthorized transaction. Contact the AmEx Call Center on the number: 08007285090                                                                                                                                   | No                                          |
| FG          | Call 08007285090                                                                                                                                             | Unauthorized transaction. Ask the card holder to contact the AmEx Call Center.                                                                                                                                                                                                               | Unauthorized transaction. Contact the AmEx Call Center on the number: 08007285090                                                                                                                                   | No                                          |
| GA          | Wait for Contact                                                                                                                                             | Unauthorized transaction. Referred by Lynx Online in a preventive way. Cielo will contact the merchant about this case.                                                                                                                                                                      | Unauthorized transaction. Contact the merchant.                                                                                                                                                                     | No                                          |
| HJ          | Transaction not allowed. Invalid operation code.                                                                                                             | Transaction not allowed. Invalid Coban operation code.                                                                                                                                                                                                                                       | Transaction not allowed. Invalid operation code. Contact the merchant.                                                                                                                                              | No                                          |
| IA          | Transaction not allowed. Invalid operation indicator.                                                                                                        | Transaction not allowed. Invalid Coban operation indicator.                                                                                                                                                                                                                                  | Transaction not allowed. Invalid operation indicator. Contact the merchant.                                                                                                                                         | No                                          |
| JB          | Transaction not allowed. Invalid operation value.                                                                                                            | Transaction not allowed. Invalid Coban operation value.                                                                                                                                                                                                                                      | Transaction not allowed. Invalid operation value. Contact the merchant.                                                                                                                                             | No                                          |
| KA          | Transaction not allowed. Data validation failed.                                                                                                             | Transaction not allowed. There was a failure in data validation. Ask the card holder to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                                       | Transaction not allowed. There was a failure in data validation. review the reported data and try again. If the error persists contact the Virtual Store.                                                           | No                                          |
| KB          | Transaction not allowed. Incurred option selected.                                                                                                           | Transaction not allowed. Wrong option selected. Ask the card holder to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                                                        | Transaction not allowed. Wrong option selected. Try again. If the error persists contact the Virtual Store.                                                                                                         | No                                          |
| KE          | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the card holder.                                                                                                                                                            | Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the Virtual Store.                                                                                                        | No                                          |
| N7          | Unauthorized transaction. security code is invalid.                                                                                                          | Unauthorized transaction. Security code is invalid. Ask the card holder to correct the data and try again.                                                                                                                                                                                   | Unauthorized transaction. Please review the data and report again.                                                                                                                                                  | No                                          |
| R1          | Unauthorized transaction. Delinquent card (Do not honor).                                                                                                    | Unauthorized transaction. The transaction could not be processed. Issue related to security, defaults or card holder's limit.                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                                | Only 4 times in 16 days.                    |
| U3          | Unauthorized transaction. Data validation failed.                                                                                                            | Transaction not allowed. There was a failure in data validation. Ask the card holder to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                                       | Transaction not allowed. There was a failure in data validation. review the reported data and try again. If the error persists contact the Virtual Store.                                                           | No                                          |
| GD          | Transaction not allowed                                                                                                                                      | Transaction not allowed                                                                                                                                                                                                                                                                      | The transaction can not be processed at the establishment. Contact Cielo for more transaction details                                                                                                               | No                                          |

### Antifraud's status list

| Field | Definition              |
| :---: | ----------------------- |
| **0** | N\A                     |
| **1** | Low Risk                |
| **2** | High Risk               |
| **3** | Not Finished            |
| **4** | Moderated Risk          |
| **5** | Authenticated           |
| **6** | Not Hired               |
| **7** | Dispensed               |
| **8** | Not applicable          |
| **9** | Recurrence Transactions |
