---
layout: redirect
redirect: https://docs.cielo.com.br/link-en/reference/get-transaction-order_number
title: Transactional Control Api
description: Technical integration via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 4
tags:
  - 3. Checkout and Link de Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

<aside class="warning"> The content on this page is being discontinued and will not receive updates after 09/04/2024. Please visit the new documentation.</aside>

# The documentation for Checkout Cielo is now on a new portal

[![new e-commerce developers portal for Cielo and Braspag]({{ site.baseurl_root }}/images/apicieloecommerce/new-doc-cielo.com.br.png)](https://docs.cielo.com.br/english)

Access the new E-commerce developers portal at **[docs.cielo.com.br](https://docs.cielo.com.br/english)**.

> **Warning**: The content on this page is being discontinued and will not receive updates after 09/04/2024. Please visit the new documentation at [docs.cielo.br](https://docs.cielo.com.br/link-en/docs/link-and-checkout).

--------------------------------------------------------------------------------------------------------------------------

<aside class="warning"> The following content has not been updated since 09/04/2024.</aside>

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

### ABECS return codes

The Brazilian Association of Credit Card and Services Companies (ABECS) establishes as of July 15, 2020, the standardization of the return codes for denied sales authorizations for both the in store and and e-commerce payment solutions of the Brazilian market.

> Please refer to [ABECS Return Codes table](https://developercielo.github.io/en/tutorial/abecs-e-outros-codigos){:target="_blank"} to get the complete list of return codes.

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
