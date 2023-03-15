---
layout: manual
title: Super Link API
description: Technical integration through API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 2
tags:
  - Checkout Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# About this documentation

This documentation will guide the developer in the integration with Cielo's Super Link API. After performing the described integrations, it will be possible to:

1. Create and edit Payment Links via API
2. Receive payment notifications
3. Consult payments
4. Set up your store properly

# About Super Link

The Payment Link API allows the merchant to create, edit and consult payment links.
Its main objective is to allow stores to create payment links (Buttons or QR Codes), through their own systems, without the need to access the Backoffice and share with their customers.

> **Attention**:
>
> The payments link is not a **ORDER/TRANSACTION** URL. It is a "cart" that can be reused over and over again. <br>
> To receive notifications about transactions originating from Payment Links, **MANDATORY** is required to register the **Notification URL** in the Checkout backoffice. <br>
> The query of transactions carried out through Super Link can be done through the \*_Transactional Control API _. <br>

# Test Mode

## Sandbox

As it is a non-financial request, the Super Link API does not have a Sandbox to test the creation of links. Links must be created from the production environment. Accreditation can be done through the cielo website or through the ecommerce center.

<aside class="warning"><b>Central Contacts:<br>
credenciamentoecommerce@cielo.com.br<br>
+55 11 4002-9700<br>
0800-570-1700
</b></aside>

Financial tests can be performed by activating the test mode in your store settings.

## Enabling Test Mode

The test mode can be activated in the **Settings** tab, where there is a checkbox, which, when checked, will enable the test mode of Checkout Cielo. The mode will only start when the selection is saved.

![Enabling Test Mode]({{ site.baseurl_root }}/images/checkout/tm01.png)

When the option is saved, a red stripe will appear at the top of the screen. It will be displayed on all Backoffice Cielo Checkout and on the transactional screen for Checkout Cielo.

This label indicates that your Checkout Cielo store is now operating in a test environment, that is, the entire transaction carried out in this mode will be considered as a test.

| Backoffice                                                                           | Transactional                                                                             |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| ![Red stripe - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png) | ![Red stripe - Transactional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png) |

## Transacting in Test Mode

# Cielo OAUTH

Cielo OAUTH is an authentication process used in Cielo APIs that are correlated to E-commerce products. It uses the **[OAUTH2](https://oauth.net/2/)** protocol, where it is first necessary to obtain an access token, using its credentials, which should then be sent to the CieloOAuth API

> To get the `ClientID` and` ClientSecret`, see the topic of Obtaining Credentials.

To use Cielo Oauth you need the following credentials:

| PROPERTY       | DESCRIPTION                                                        | TIPO   |
| -------------- | ------------------------------------------------------------------ | ------ |
| `ClientId`     | Key identifier provided by CIELO                                   | guid   |
| `ClientSecret` | Key that validates the ClientID. Provided by Cielo with `ClientID` | string |

## Get Credentials

To obtain the credentials in Checkout Cielo, just follow the flow below:

1. Access the Cielo website
2. Super Link
3. Configurações
4. Dados da loja
5. Gerar chaves da API

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

Request must be sent only in the request Header.

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
| `Access_token` | Used to access API services                         | string |
| `Token_type`   | Will always be `bearer` type                        | texto  |
| `Expires_in`   | Token lifetime in seconds. Approximately 20 minutes | int    |

> The returned token (access_token) must be used in every request as an authorization key, emphasizing that it has a validity of 20 minutes (1200 seconds) and after this interval, it will be necessary to obtain a new token to access Cielo services.

# Payment Link

The **Payment Link API** allows the merchant to create, edit and query payment links.

Its main goal is to allow stores to create payment links (Buttons or QR Codes) through their own systems, without the need to access Checkout Cielo's Backoffice and share with their customers.

> **Attention**:
>
> - The payments link is not a **REQUEST / TRANSACTION** URL. It is a "cart" that can be reused countless times.
> - To receive notifications about transactions originating from Payment Links, the registration of the **Notification URL** in the Checkout backoffice is **REQUIRED**.

## Authentication

The Payment Link API Authentication Process is the **[Cielo OAUTH](https://docscielo.github.io/Pilots/manual/linkdepagamentos5#cielo-oauth)**

## Create Link

### Request

To create Checkout payments link, simply send a POST with the Link data to the endpoint:

<aside class="request"><span class="method post">POST</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/</span></aside>

> Header: `Authorization: Bearer {access_token}`

```json
{
  "Type": "Digital",
  "name": "Pedido",
  "description": "teste description",
  "price": "1000000",
  "weight": 2000000,
  "ExpirationDate": "2037-06-19",
  "maxNumberOfInstallments": "1",
  "quantity": 2,
  "Sku": "teste",
  "shipping": {
    "type": "WithoutShipping",
    "name": "teste",
    "price": "1000000000"
  },
  "SoftDescriptor": "Pedido1234"
}
```

**Dados do produto**

| PROPERTY                  | DESCRIPTION                                                                                                                                                                                                            | TYPE   | SIZE       | REQUIRED |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------- | -------- |
| `name`                    | Product name                                                                                                                                                                                                           | String | 128        | YES      |
| `description`             | Description of the product that will be displayed on the Checkout screen if the `show_description` option is true.                                                                                                     | String | 512        |          |
| `showDescription`         | Flag indicating whether or not the description should be displayed on the Checkout screen                                                                                                                              | String | --         | No       |
| `price`                   | Product price in **cents**                                                                                                                                                                                             | Int    | 1000000    | YES      |
| `expirationDate`          | Link expiration date. If a date is entered, the link becomes unavailable on the given date. If no date is entered, the link will not expire.                                                                           | String | YYYY-MM-DD | No       |
| `weight`                  | Product weight in **grams**                                                                                                                                                                                            | String | 2000000    | No       |
| `softDescriptor`          | Description to be displayed on the bearer's credit card invoice.                                                                                                                                                       | String | 13         | No       |
| `maxNumberOfInstallments` | Maximum number of installments that the buyer can select on the Checkout screen. If not informed, the store settings in Checkout Cielo will be used.                                                                   | int    | 2          | No       |
| `quantity`                | Number of transactions remaining until the link stops working                                                                                                                                                          | Int    | 2          | No       |
| `type`                    | Type of sale to be made through the payment link:<br><br>**Asset** – Physical Material<br>**Digital** – Digital Product<br>**Service** – Service<br>**Payment** – Simple Payments<br>**Recurrent** – Recurrent Payment | String | 255        | YES      |

> Within `Description` You can use the pipe character`|`if it is desirable to break the line when displaying the description on the Checkout screen

**Shipping Information**

| PROPERTY                 | DESCRIÇÃO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | TYPE   | SIZE   | REQUIRED |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | -------- |
| **shipping**             | Node containing product delivery information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |        |        |          |
| `shipping.name`          | Shipping name. **Required for the shipping type “FixedAmount”**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | string | 128    | Yes      |
| `shipping.price`         | Shipping price. **Required for the shipping type “FixedAmount”**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | int    | 100000 | Yes      |
| `shipping.originZipCode` | Order origin zip code. Required for the shipping type “Correios”. Must contain only numbers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | string | 8      | No       |
| `shipping.type`          | Shipping type.<br>**Correios** – Deliver by correios<br>**FixedAmount** – Fixed amount<br>**Free** - Free<br>**WithoutShippingPickUp** – Without shipping pick up<br>**WithoutShipping** – Without shipping<br><br>If the chosen product type is “**Asset**”, the allowed shipping types are: _**“Correios, FixedAmount or Free”**_.<br><br>If the chosen product type is “**Digital**” ou “**Service**”, the allowed shipping types are: _**“WithoutShipping, WithoutShippingPickUp”**_.<br><br>If the chosen product type is “**Recurrent**” the allowed shipping type is: _**“WithoutShipping”**_. | string | 255    | Yes      |

**Dados da Recorrência**

| PROPERTY             | DESCRIPTION                                                                                                                                                                   | TYPE   | SIZE | REQUIRED |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| **recurrent**        | Node containing information on the recurrence of payment. May be informed if the product type is “Recurrent”                                                                  |        |      |          |
| `recurrent.interval` | Recurrence Charge Interval.<br><br>**Monthly** - Monthly<br>**Bimonthly** - Bimonthly<br>**Quarterly** - Quarterly<br>**SemiAnnual** - Semi Annual<br>**Annual** – Annual<br> | string | 128  | No       |
| `recurrrent.endDate` | Recurrence charge end date. If not informed the recurrence will not end, the charging will happen according to the interval selected indefinitely.                            | string | 128  | No       |

### Response

> "HTTP Status": 201 – Created

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00",
  "showDescription": false,
  "price": 8000,
  "weight": 4500,
  "shipping": {
    "type": "Correios",
    "originZipcode": "06455030"
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2017-06-30T00:00:00",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

The data returned in the response includes all data sent in the request and additional data regarding link creation.

| PROPERTY   | TYPE   | DESCRIPTION                                                                                                        |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `id`       | guid   | Unique identifier of the payment link. Can be used to query, update or delete the link.                            |
| `shortUrl` | string | Represents the payment link that, when opened in a browser, will display the Checkout Cielo screen.                |
| `links`    | object | Displays the available and possible operations (RESTful hypermedia) to be performed after link creation or update. |

## Query Link

### Request

To query an existing link, simply perform a `GET` informing the link `ID`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

> **Header:** Authorization: Bearer {access_token}

### Response

> HTTP Status: 200 – OK

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00",
  "showDescription": false,
  "price": 8000,
  "weight": 4500,
  "shipping": {
    "type": "Correios",
    "originZipcode": "06455030"
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2017-06-30",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href": " https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

| PROPERTY   | TYPE   | DESCRIPTION                                                                                                        |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `id`       | guid   | Unique identifier of the payment link. Can be used to query, update, or delete the link.                           |
| `shortUrl` | string | Represents the payment link that, when opened in a browser, will display the Checkout Cielo screen.                |
| `links`    | object | Displays the available and possible operations (RESTful hypermedia) to be performed after link creation or update. |

> **OBS**: The query Response contains the same data returned on link creation.

## Update Link

### Request

To update an existing link, simply perform a `GET` informing the link `ID`.

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

> **Header**: Authorization: Bearer {access_token}

```json
{
  "Type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "price": 9000,
  "expirationDate": "2017-06-30",
  "weight": 4700,
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "SoftDescriptor": "Pedido1234",
  "maxNumberOfInstallments": 2
}
```

### Response

> HTTP Status: 200 – OK

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "showDescription": false,
  "price": 9000,
  "weight": 4700,
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2017-06-30",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

| PROPRIEDADE | TIPO   | DESCRIÇÃO                                                                                                          |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `id`        | guid   | Unique identifier of the payment link. Can be used to query, update, or delete the link.                           |
| `shortUrl`  | string | Represents the payment link that, when opened in a browser, will display the Checkout Cielo screen.                |
| `links`     | object | Displays the available and possible operations (RESTful hypermedia) to be performed after link creation or update. |

> **OBS**: The query Response contains the same data returned on link creation.

## Excluir Link

### Request

To delete an existing link, simply perform a `GET` informing the link `ID`.

<aside class="request"><span class="method delete">DELETE</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

> **Header:** Authorization: Bearer {access_token}

### Response

> HTTP Status: 204 – No Content

# Payment Notifications

The transactional notification process in Checkout Cielo takes place via the inclusion of a URL to which data from transactions carried out on the platform will be directed. It is worth mentioning that Checkout notifies you only when a transaction is considered finalized, that is, the buyer has filled in all the data on the payment screen and clicked on “Finalize”.

## Notification Types

Cielo Checkout has two types of notifications that the shopkeeper can use according to his needs:

| Type   | Description                                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | Notification where the merchant is passive. Two `HTTP POST` are triggered, one informing sales data and the other transaction status change    |
| `JSON` | Notification where the merchant makes an appointment. A `POST` containing information for making a query (`GET`) for the checkout transactions |

To use both models, the merchant will need to access the Cielo Backoffice and configure both the `NOTIFICATION URL` and the` STATUS CHANGE URL`.

# Transactional Control

Consultation of transactions via API can be done up to 45 days after the sale has been made.

The control of orders originating from a payment link can be done through the transactional control API. The order inquiry can be done in 3 different ways:

## Por Merchant_Order_Number

The query for transactions by `Merchant_Order_Number` returns a list of transactions with the same number of orders, this is because the Checkout Cielo does not prevent the duplication of OrderNumbers by the merchant. The response will have the `Checkout_Cielo_Order_Number` that should be used to query a specific transaction.

### Request

To consult a transaction through `Merchant_Order_Number`, just perform a` GET`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/merchantOrderNumber/{merchantordernumber}</span></aside>

### Response

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

| Property              | Description                               | Type    | Size | Format                                                                                             |
| --------------------- | ----------------------------------------- | ------- | ---- | -------------------------------------------------------------------------------------------------- |
| `$id`                 | node id                                   | Numeric | -    | Example: 1                                                                                         |
| `checkoutOrderNumber` | Order code generated by Cielo Checkout    | Text    | 32   | Example: a58995ce24fd4f1cb025701e95a51478                                                          |
| `createdDate`         | Order creation date                       | Date    | -    | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `links.$id`           | node id                                   | Numeric | -    | Example: 1                                                                                         |
| `links.method`        | Operation method                          | Text    | 10   | Exmeples: GET, POST, PUT                                                                           |
| `links.rel`           | Operation consumption relation            | Text    | 10   | Example: self                                                                                      |
| `links.href`          | Endpoint for consumption of the operation | Text    | 512  | Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e |

## Por Checkout_Cielo_Order_Number

### Request

To check a transaction through `Checkout_Cielo_Order_Number`, just perform a` GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

### Response

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
    "type": "creditCard",
    "errorcode": "00",
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

| Field                                | Type    | Size | Description                                                            | Format                                                                                                                        |
| ------------------------------------ | ------- | ---- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `merchantId`                         | GUID    | 36   | Checkout merchant Id                                                   | Example: c89fdfbb-dbe2-4e77-806a-6d75cd397dac                                                                                 |
| `orderNumber`                        | Text    | 32   | Merchant order number.                                                 | Example: 123456                                                                                                               |
| `softDescriptor`                     | Text    | 13   | Text displayed on the buyer's invoice. No special characters or spaces | Example: `Merchant_ABC_1234`                                                                                                  |
| `cart.items.name`                    | Text    | 128  | Cart item name.                                                        | Example: Pedido ABC                                                                                                           |
| `cart.items.description`             | Text    | 256  | Cart item description.                                                 | Example: 50 canetas - R$30,00                                                                                                 |
| `cart.items.unitPrice`               | Numeric | 18   | Unit price of the product in cents                                     | Example: R$ 1,00 = 100                                                                                                        |
| `cart.items.quantity`                | Numeric | 9    | Quantity of the item in the cart.                                      | Example: 1                                                                                                                    |
| `cart.items.type`                    | Text    | 255  | Type of item in cart                                                   | `Asset`<br>`Digital`<br>`Service`<br>`Payment`                                                                                |
| `shipping.type`                      | Numeric | 36   | Shipping type                                                          | Example: 1                                                                                                                    |
| `shipping.services.name`             | Text    | 128  | Shipping method                                                        | Example: Casa Principal                                                                                                       |
| `shipping.services.price`            | Numeric | 10   | Shipping service value, in cents                                       | Example: R$ 10,00 = 1000                                                                                                      |
| `shipping.address.street`            | Text    | 256  | Delivery address                                                       | Example: Rua João da Silva                                                                                                    |
| `shipping.address.number`            | Numeric | 8    | Delivery address number                                                | Example: 123                                                                                                                  |
| `shipping.address.complement`        | Text    | 64   | Complement of delivery address                                         | Example: Casa                                                                                                                 |
| `shipping.address.district`          | Text    | 64   | Neighborhood of delivery address                                       | Example: Alphaville                                                                                                           |
| `shipping.address.city`              | Text    | 64   | City of delivery address                                               | Example: São Paulo                                                                                                            |
| `shipping.address.state`             | Text    | 2    | Delivery address state                                                 | Example: SP                                                                                                                   |
| `Payment.status`                     | Text    | 10   | Transaction status                                                     | Example: Paid [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status)                      |
| `Payment.tid`                        | Text    | 32   | Cielo TID generated at the time of the transaction authorization       | Example: 10127355487AK2C3EOTB                                                                                                 |
| `Payment.nsu`                        | Text    | 6    | NSU Cielo generated at the time of authorization of the transaction    | Example: 123456                                                                                                               |
| `Payment.authorizationCode`          | Text    | 3    | Authorization code.                                                    | Example: 456789                                                                                                               |
| `Payment.numberOfPayments`           | Numeric | 6    | Number of installments.                                                | Example: 123456                                                                                                               |
| `Payment.createdDate`                | Text    | 22   | Transaction creation date                                              | Example: AAAA-MM-DDTHH:mm:SS.ss                                                                                               |
| `Payment.finishedDate`               | Text    | 22   | Transaction end date                                                   | Example: AAAA-MM-DDTHH:mm:SS.ss                                                                                               |
| `Payment.cardMaskedNumber`           | Text    | 19   | Masked card number                                                     | Example: 123456\*\*\*\*2007                                                                                                   |
| `Payment.brand`                      | Text    | 10   | Card brand                                                             | Example: Visa [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_brand)                |
| `Payment.antifraud.antifraudeResult` | Numeric | 1    | Anti-fraud status                                                      | Example: 1                                                                                                                    |
| `Payment.antifraud.description`      | Text    | 256  | Description of anti-fraud status                                       | Example: Merchant chose not to perform anti-fraud analysis                                                                    |
| `Payment.type`                       | Text    | 11   | Type of payment method                                                 | Example: CreditCard [full list](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_type)                |
| `Payment.errocode`                   | Numeric | 2    | Return code                                                            | Example: 00, 51, 57, etc [full list](https://developercielo.github.io/manual/linkdepagamentos5#c%C3%B3digos-de-retorno-abecs) |
| `Customer.Identity`                  | Numeric | 14   | CPF or CNPJ of the buyer.                                              | Example: 12345678909                                                                                                          |
| `Customer.FullName`                  | Text    | 256  | Buyer's full name.                                                     | Example: Fulano da Silva                                                                                                      |
| `Customer.Email`                     | Text    | 64   | Buyer's email.                                                         | Example: example@email.com.br                                                                                                 |
| `Customer.Phone`                     | Numeric | 11   | Buyer's phone.                                                         | Example: 11123456789                                                                                                          |

## Por ID do link de pagamento

### Request

To check a transaction through `id`, just perform a` GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}/payments</span></aside>

### Response

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

| Property                          | Description                               | Type    | Size       | Format                                                                                                |
| --------------------------------- | ----------------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `$id`                             | Node id                                   | Numeric | -          | Example: 1                                                                                            |
| `productId`                       | Payment link ID                           | GUID    | 36         | Example: 9487e3a9-f204-4188-96c5-a5a3013b2517                                                         |
| `createdDate`                     | Payment link creation date                | Data    | -          | AAAA-MM-DDTHH:mm:SS.ss                                                                                |
| `orders.$id`                      | Node id                                   | Numeric | -          | Example: 1                                                                                            |
| `orders.orderNumber`              | Order Id generated by Checkout Cielo      | Texto   | 32         | Example: b74df3e3c1ac49ccb7ad89fde2d787f7                                                             |
| `orders.createdDate`              | Order creation date                       | Data    | -          | AAAA-MM-DDTHH:mm:SS.ss                                                                                |
| `orders.payment.$id`              | Node id                                   | Numeric | -          | Example: 1                                                                                            |
| `orders.payment.price`            | Order amount, without punctuation         | Numeric | -          | Example: R$ 1,00 = 100                                                                                |
| `orders.payment.numberOfPayments` | Number of installments                    | -       | Example: 3 |
| `orders.payment.createdDate`      | Transaction date (payment)                | Data    | -          | AAAA-MM-DDTHH:mm:SS.ss                                                                                |
| `orders.payment.status`           | Transaction Status                        | Texto   | -          | Example: Denied [full list](https://developercielo.github.io/manual/linkdepagamentos5#payment_status) |
| `links.$id`                       | Node id                                   | Numeric | -          | Example: 1                                                                                            |
| `links.method`                    | Operation consumption method              | Texto   | 10         | Example: GET, POST, PUT                                                                               |
| `links.rel`                       | Operation consumption relation            | Texto   | 10         | Example: self                                                                                         |
| `links.href`                      | Endpoint for consumption of the operation | Texto   | 512        | Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e    |

To perform transactional control at Checkout Cielo it is MANDATORY that the merchant has one of the two notification templates configured below:

1. Notification URL via **POST**
2. Notification URL via **JSON**

Notification is mandatory because all API commands (Consult / Capture / Cancel) use the unique transaction identifier, called `Checkout_Cielo_Order_Number`.

The `Checkout_Cielo_Order_Number` is generated only when the payment is finalized on the transactional screen. It is sent only by the Notification URL and not by the Response of creating the transactional screen.

# Merchant Settings

Your store settings can be made within the Cielo website. In this environment you have access to several options, among them:

1. Key generation to use the API;
2. Configuration of logo and background color of the payment screen;
3. Modification of payment methods;
4. Return URL’s configuration;
5. Other actions;

For more details see the tutorial Super Link and Checkout Cielo.

# Self-fraud

This topic will teach you how to create an integration between Super Link Cielo and an own / third party anti-fraud.

## Prerequisites

1. Integration with Super Link APIs;
2. Subsequent capture of transactions;
3. Negotiation with Anti-Fraud provider;

## Simplified flowchart

![Fluxograma simplificado Antifraude próprios]({{ site.baseurl_root }}/images/checkout/fluxogramasimplificadoantifraude.png)

### Integration step by step

1. Create the links via the Super Link API. Links can be created directly via API calls. The default request and response are found in the manual payment link topic. [Click here](https://developercielo.github.io/manual/linkdepagamentos5#link-de-pagamento) to learn more.

2. Send the link to the cardholder to make the payment. The payment link must be sent through social networks for the payment to be made. The sale/transaction only starts after filling in the payment screen.

3. Receive payment details via Notification Post. The payment confirmation is sent via Webhook to a URL of the merchant's choice. See how to set up a URL to receive the notification [here](https://developercielo.github.io/manual/linkdepagamentos5#tipos-de-url-de-notifica%C3%A7%C3%A3o).
   The information returned via the Notification Post can be found in the topic [Content of the notification](https://developercielo.github.io/manual/linkdepagamentos5#conteúd-da-notificação).

4. Send the payment details to the contracted Anti-Fraud. The information returned in the Notification Post must be sent to your Anti-Fraud. If necessary you can enrich the information returned with registration information of the customer who is executing that payment. Consult your Anti-Fraud provider to find out which fields can be submitted for analysis. Cielo does not participate in sending this information. All questions related to the integration process between the Merchant and Anti-Fraud should be sent to the Support of the anti-fraud provider.

5. Capture or cancel sales. According to the return of your anti-fraud provider, capture or cancel the sale. Sales capture and cancellation can be done via the transactional control API. See how to make the transactional control of your sales [here](https://developercielo.github.io/manual/controletransacional4#capturar-transa%C3%A7%C3%A3o).

# Status and Codes

Checkout has its own Status, different from CIELO SITE or Cielo ecommerce API. See the full list below.

| Value | Transaction status | Payment method             | Description                                                                                                                                 |
| ----- | ------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `Pending`          | For all the payment method | Indicates that the payment is still being processed; OBS: Boleto - Indicates that the boleto has not had its status changed by the merchant |
| 2     | `Paid`             | For all the payment method | Transaction captured and the money will be deposited in an account.                                                                         |
| 3     | `Denied`           | Credit Card Only           | Transaction not authorized by the person responsible for the payment method                                                                 |
| 4     | `Expired`          | Credit Cards and Boleto    | Transaction is no longer valid for capture - ** 15 days after Authorization **                                                              |
| 5     | `Canceled`         | For credit cards           | Transaction was canceled by the merchant                                                                                                    |
| 6     | `Not finished`     | For all the payment method | Payment waiting for Status - May indicate error or processing failure. Contact Cielo Support                                                |
| 7     | `Authorized`       | Credit Card Only           | Transaction authorized by the card issuer. Must be captured in order for the money to be deposited in an account                            |
| 8     | `Chargeback`       | Credit Card Only           | Transaction canceled by the consumer with the card issuer. Money will not be deposited into an account.                                     |

## Card Brands Retry Program

**What are transaction retries?**

When a shopper tries to make a card purchase at your business, a transaction can be declined due to a number of factors. The next attempts to complete the transaction using the same card is retrying.

**What has changed?**

Each card brand defines the amount that will be charged for retrying. The number of times a transaction will be retried also varies by brand.

**Are transaction retries allowed in e-commerce?**

Card brands define different rules for present and non-present card transactions, like in online sales.

**What is the impact for the merchant?**

Merchants who do not follow the rules will be penalized by charging fees for exceeded transactions, in accordance with each brand program.

Aiming to improve the shopping experience, the payment methods industry, together with ABECS, promoted the standardization of the response codes for rejected transactions made by card.

Attempts are classified as:

> - <p>&#10060; **Irreversible: never retry**</p><br>
>   It means, for example, that the card was canceled for use, has been lost or stolen, there is confirmed fraud, the transaction is not allowed for that product, indicating that there are no circumstances in which the issuer would grant an approval. Any authorization attempt that has previously received an irreversible refusal without any changes in the message will not be successful.
>   <br>
>   <br>
> - <p>&#9989; **Reversible: retry allowed**</p><br>
>   It means that the issuer can approve, but cannot do so now, possibly due to a system issue (down) or lack of limit, suspected fraud or exceeded number of password attempts. These are temporary opt-out decisions made by the issuer that may change over time.
>   The Visa, Mastercard, Elo and Hipercard brands adjusted their rules to limit the number of authorization attempts for a denied transaction. These changes provide for the charging of fees for excessive attempts. Below are the rules for each brand.

### Mastercard

The Mastercard brand has the Transaction Processing Excellence (TPE) program, which includes two categories:

- **Excessive Attempts**: monitors the attempts of denied transactions, in card present and not present environments. Valid for both reversible and irreversible denial codes.

- **Merchant Advice Code Transaction Excellence (MAC)**: monitors transaction retries that are denied, in card-not-present environments that are irreversible. Billing only on (MAC) 03 and 21.

#### 1. Excessive Attempts

These are charges made when the merchant exceeds the rules for retrying transactions.

The brand also performs monitoring for any approved nominal value authorization, with subsequent reversal for transactions below 1 unit of whole currency or the equivalent of US$ 1.

Monitoring is applied to retry transactions for denied and approved purchases, carried out in a present and non-present card environment.

**Table: Excessive Attempts**

| Categories                        | Codes                                                                                                                                  | Validity                 | Domestic Rate | International Rate | When Occurs                 | Retry Allowed                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------- | ------------------ | --------------------------- | ------------------------------ |
| Card present and Card not present | Any denial code that is not assigned to MAC 03 and 21. And also MAC codes if you do not respect the "Excessive Attempts" limits        | Until 01/31/2023         | BRL 2.00      | -                  | From the 11th retry onwards | Retry allowed within 24 hours. |
| Card present and Card not present | Any denial code that is not assigned to MAC 03 and 21. And also the MAC codes if you do not respect the limits of "Excessive Attempts" | New rule from 02/01/2023 | R $2.00       | -                  | From the 8th retry onwards  | Retry allowed within 24 hours. |

- All payment transactions using the same card and the same merchant number will be considered as retries.
- Mastercard has extended the effective date to **01/02/2023** regarding the new program rules **(Excessive Attempts)** previously scheduled for the beginning of 01/11/2022. These are the changes:
  1. The excess considered in the program will occur from the eighth attempt within the calculation month. The amount charged has changed.
  2. Mastercard is also introducing a limit of 35 failed attempts on the same card and merchant number per continuous 30-day period. Even if the shopper does not exceed the limit of 7 retries in a 24-hour period, but exceeds the monthly limit, the charge will be applied

> **Note**: The current rule of the Excessive Attempts program is valid until 01/31/2023 (see Table Excessive Attempts), where only 10 attempts to approve the same transaction are allowed (on the same card, and same merchant number), with retry allowed after 24 hours.

#### 2. Merchant Advice Code Transaction Excellence (MAC)

These are charges made when the establishment re-attempts to send authorization for irreversible response codes with the same valid card for a card not present.

Within this retry program, there are programs that are specifically designed for the **“Do not try this transaction again”** scenario. For these cases, Mastercard identifies transactions with the following values: MAC 03 and MAC 21, for example.

The MAC program accepts a few values, however **only MACs 03 and 21 have a specific charge**. The other MACs do not fall under this MAC 03/21 charge.

The other MAC codes: 01, 02, 04, 24, 25, 26, 27, 28, 29 and 30 aren't included the MAC billing program but are included in the Excessive Attempts program billing if you exceed the limits.

Since **10/14/2022** Mastercard has introduced new MAC codes 24, 25, 26, 27, 28, 29 and 30, when an issuer declines a transaction with the response code 51 (Insufficient Funds) followed by one of the MACs below, for the merchant to take the best action.

**Table: MACs**

| MAC | Description                                      | Note                                                                                                                                                     |
| --- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | New account information available (ABU)          | Need to update the data of the account being used in the transaction, using the ABU, for example.                                                        |
| 02  | Cannot be approved at this time, try again later | Must retry the transaction after 72 hours or try the transaction with a different payment method.                                                        |
| 03  | Retry is not allowed                             | Must seek another method of guaranteeing payment, avoiding unnecessary costs of multiple authorization requests that will continue to result in declines |
| 04  | Token requirements not met for this model token  | Need to review the token requirements, as they were not met for the model token sent in the transaction                                                  |
| 21  | Plan cancelled                                   | Customer cancels plan and even after cancellation, the establishment continues to send purchase authorization request.                                   |
| 24  | Try again after 1 hour                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 25  | Try again after 24 hours                         | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 26  | Try again after 2 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 27  | Try again after 4 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 28  | Try again after 6 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 29  | Try again after 8 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 30  | Try again after 10 days                          | Only valid for response code 51 (Insufficient Funds)                                                                                                     |

Some return codes will no longer be sent:

- 04 (Capture Card)
- 14 (Invalid card number)
- 41 (Lost Card)
- 43 (Stolen Card)
- 54 (Expired Card)
- 57 (Transaction Not Allowed)
- 62 (Card Restricted)
- 63 (Security Breach)
  <br>
  <br>

**Categorization of Mastercard returns**

Mastercard may consolidate some issuer response codes, which often may not indicate to the merchant whether or not to retry, into 3 codes for Mastercard exclusive use:

- **79** (Life cycle)
- **82** (Politics)
- **83** (Fraud/Security)
  <br>
  <br>

The original codes will be replaced by the Merchant Advice Code (MAC), which will accompany codes 79, 82 and 83 to determine whether or not the transaction can be re-attempted.

**For example:**

| When                                                                      | Then                                                             | And the response code                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| The issuer declines the transaction using response code 54 (Expired Card) | Mastercard will replace code 54 with code 79 (Lifecycle Decline) | Accompany appropriate Merchant Advice Code (MAC) |

**MAC 03 and MAC 21 retry program**

**Method of calculation:**

- Card not present transactions will be considered;
- All payment transactions using the same card and merchant number are considered retries;
- Retries in the MAC program with values ​​MAC 03 and MAC 21 count;
- Valid for any response code,
- The excess accounted for in the program will occur from the 1st attempt within the calculation month;
- The counter is reset after a period of 30 days;
- Retries may be charged for MACs 03/21 and Excessive Attempts if you exceed the limit for each program;
- Currently, the tariff value of BRL 1.25 is applied and this value will change from January 1, 2023, as shown on the table;

**Table of values:**

| Number of retries     | Rule                                                            |
| --------------------- | --------------------------------------------------------------- |
| As of the 1st attempt | BRL 2.50 (two reais and fifty cents) per attempt, as of the 1st |

### Visa

**What is it?**

A program instituted by the Visa Brand that generates charges when the merchant exceeds the retry rules.

- Valid for transactions with a present card and a non-present card;
- **Reversible codes:** Allows up to 15 attempts to approve the same transaction (same card, same establishment and amount) within 30 days. After the initial 30 days (from the 1st attempt), any retry will be charged.
- **Irreversible codes:** Only 01 attempt to approve the same transaction is allowed (same card, same establishment), the 2nd attempt will be charged.
  \*After an approved transaction, the counter is reset.

> **Fees**: When you exceed the attempt limits established by the brand, a fee will be charged for each transaction that exceeds it.<br> ><br>
>
> - **Domestic**: USD 0.10 + 13.83% Tax.<br>
> - **Foreign**: USD 0.25 + 13.83% Tax.
>   <br>
>   <br>

Authorization rules already in force. Fee charges apply from April 2021.

**Visa has grouped return codes into 4 Categories.**

**Category 1 - Issuer will never approve.**

For this category, it indicates that the card was canceled or never existed or that the non-approval is the result of a permanent restriction or error condition that will prevent future approval.

**Category 2 - Issuer cannot approve at this time.**

Indicates that the denial is the result of a temporary condition such as credit risk, issuer speed controls, or other card restrictions that may allow a retry transaction to be approved. In some cases, denial requires action by the shopper or issuer to remove the restriction before an approval can be obtained.

**Category 3 - Data Quality/Review Data.**

When a data error is identified by the issuer, this transaction is declined accordingly. Merchants must revalidate payment data before retrying. Merchants and Acquirers should monitor these negative codes due to potential exposure to fraud.

> Attention: Category 3 has, in addition to the limits considered in category 2, a different limit, where it is cumulative. An establishment can carry out up to 10,000 transactions in a period of 30 days (in this case, considering only the establishment number and denial codes). If you exceed the limit, all category 3 declined transactions will be charged.

**Category 4 - Generic Response Codes.**

Category 4 includes all other decline response codes, many of which provide little or no value to Acquirers/Merchants as part of their retry strategy. Issuer usage should remain minimal.

Most non-approval conditions have descriptive response codes in Categories 1, 2, and 3 to indicate the reason for denying. However, there may be circumstances where there is no response code value for a specific denial condition. Issuers may use other response code values ​​defined in the VisaNet Technical Specifications; however, usage should remain minimal.

Issuers should use response codes that more accurately reflect the reason for denials. Categories 1 (issuer never approves), 2 (issuer cannot approve at this time), and 3 (Data Quality) should be used, and issuers should limit the use of Category 4 (Generic Response Code) to transactions where none another value applies. The Generic Response Code Fee is charged to ensure that no more than the regionally approved percentage of the issuer's total denials are categorized as Category 4. Issuers exceeding the regionally defined threshold will receive the Generic Response Code Fee per base of transaction for each decline in excess of the defined limit.

**Table with rules and refusal codes.**

![Tabela Retentativa Visa]({{ site.baseurl }}/images/apicieloecommerce/retentativa-visa-en.png)

**Note:** Response code 14 appears in categories 1 and 3, but the accounting is as follows:

- In category 1, EC is charged from the 2nd attempt to the same establishment and same card: **retry not allowed.**

- Category 3 comprises the group of codes for accounting for 10,001 transactions, after the EC reaches 10,000 retries with this group of codes, any transaction will be accounted for independently of the card.

**Example:** We had 10,000 transactions denied in a CE with category 3 codes, if transaction 10,001 is in code 14 or in any category 3 group code, it will be charged regardless of the card.

### ELO

**What is it?**

This is a program instituted by ELO that generates charges when the merchant exceeds the rules for retrying transactions with the same card.

**Forms of Calculation**

- **Retries**: all payment transactions on the same card, validity, value, Merchant ID (MID) - within 30 days
- **Accounted codes**: all negatives
- **Excess**: from the 16th retry in the month\*
- **Fee**: BRL 0.80 (eighty cents) per retry, starting from the 16th
- **Excess accounting**: It is based on Elo's internal controls. 1st to last calendar day of the month
  <br>
  <br>

<aside class="notice">Effective date: August 1, 2022.</aside>

**List of Elo refusal codes:**

The response codes below are listed according to the brand's authorization manual.

| CODES       | DESCRIPTION                                 | WHEN THE ISSUER SHOULD USE THE RESPONSE CODE                                                                                                                                                                                                                                                                                                                                                                                                            | RETRY        |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 4           | REDO THE TRANSACTION                        | This code must be used by the Issuer to request that the owner of the card/EC perform the transaction again if the issuer detects failure in capturing the transaction information or if it is necessary to update the password, denying the 1st transaction                                                                                                                                                                                            | Reversible   |
| 5           | GENERICAL                                   | The brand may use this code for other dealings (generic).                                                                                                                                                                                                                                                                                                                                                                                               | Reversible   |
| 6           | CONSULT ACQUIRER                            | This reason must be used by the Acquirer when it identifies internal problems that do not require changes in the message for the transaction to follow the correct flow.                                                                                                                                                                                                                                                                                | Reversible   |
| 12          | CARD ERROR                                  | - This code must be used by the Issuer when it identifies a failure in the CAVV validation of 3DS or tokenized transactions.<br>- This code must be used by the issuer when it identifies an incorrect/invalid service code for cards <br>- This code must be used by the issuer for problems identified in the token<br>- This code must be used to deny reversals and reversal notices where the original transaction is not located by the issuer.   | Irreversible |
| 13          | INVALID TRANSACTION AMOUNT                  | - This code must be used by the issuer when it identifies that the transaction amount is invalid according to the issuer's parameters.                                                                                                                                                                                                                                                                                                                  | Irreversible |
| 14          | INVALID CARD NUMBER                         | - This code must be used by the issuer for invalid/incorrect card number.<br>- The brand may use this code for other dealings.                                                                                                                                                                                                                                                                                                                          | Irreversible |
| 19          | ACQUIRER PROBLEMS                           | - This code must be used by the acquirer when it identifies internal problems that require changes in the message so that the transaction follows the correct flow.                                                                                                                                                                                                                                                                                     | Irreversible |
| 23          | INVALID INSTALLMENT AMOUNT                  | - This code must be used by the issuer when the installment amount is outside the limit established. This code must be used when the issuer does not accept the Elo Parcelado Loja product (product 072) with the number of installments less than 12.                                                                                                                                                                                                  | Irreversible |
| 30          | MESSAGE FORMAT ERROR                        | - This code must be used by the issuer when it identifies a format error in the message (mandatory field, domains, formats, size not present or different from the specification).                                                                                                                                                                                                                                                                      | Irreversible |
| 38          | PURCHASE/EXCEEDED PASSWORD ATTEMPTS         | - This code must be used by the issuer when the number of permitted password attempts is exceeded (used only for purchases).                                                                                                                                                                                                                                                                                                                            | Reversible   |
| 41          | LOST CARD                                   | - This code must be used by the issuer for a card with definitive blocking for the reason "LOST".                                                                                                                                                                                                                                                                                                                                                       | Irreversible |
| 43          | STOLEN CARD                                 | - This code must be used by the issuer for a card with definitive blocking for the reason "STOLEN".                                                                                                                                                                                                                                                                                                                                                     | Irreversible |
| 51          | LIMIT/INSUFFICIENT BALANCE                  | - This code must be used by the issuer for a card that is temporarily without enough balance or limit to carry out the transaction.<br>- Withdrawal/advance 2 without track 2<br>- Purchase with change not supported.<br>- Address verification not supported (only when process code is "13" with no purchase value). \* Card account verification not supported (only when process code is "18" with no purchase amount).                            | Reversible   |
| 54          | CARD EXPIRATION DATE                        | - This code must be used by the issuer for a physical card or token with validity/expired or invalid.                                                                                                                                                                                                                                                                                                                                                   | Irreversible |
| 55          | INVALID PASSWORD / NOT SENT                 | - This code must be used by the Issuer when the password typed by the customer does not match, it's invalid/incorrect.<br>- This code must be used by the issuer when the password is not sent in the message and is required for transaction approval.                                                                                                                                                                                                 | Reversible   |
| 56          | WITHOUT CARD REGISTRATION                   | <br>1. Card number does not belong to the issuer<br>2. Card number is not valid                                                                                                                                                                                                                                                                                                                                                                         | Irreversible |
| 57          | TRANSACTION NOT ALLOWED FOR THIS CARD       | - This code must be used by the Issuer when the card is definitively blocked, except for blocking for loss and theft that already have specific codes (eg death, confirmed fraud, definitive cancellation at the customer's request , etc).<br>- This code must be used for products and services not supported by the card issuer.<br>- This code can be used for invalid/suspended/inactive token.<br>- This code must be used to negate the fallback |
| input mode. | Irreversible                                |
| 58          | INVALID MERCHANT                            | - This code must be used by the Issuer when the merchant's MCC is not registered to obtain a token from the Issuer.                                                                                                                                                                                                                                                                                                                                     | Irreversible |
| 59          | FRAUD SUSPECT                               | - This code must be used by the issuer when prevention rules suspect fraud, requiring contact between the cardholder and the issuer to release the card and carry out a new transaction.<br>- This code must be entered used by the issuer to deny transactions due to the absence of the travel notice that must be carried out by the cardholder before traveling abroad or in some cases before carrying out transactions on international websites. | Reversible   |
| 61          | MAXIMUM WITHDRAWAL/PURCHASE VALUE EXCEEDED  | - This code must be used by the Issuer when the withdrawal/purchase amount exceeds the limit allowed by it.                                                                                                                                                                                                                                                                                                                                             | Reversible   |
| 62          | TEMPORARY BILLING BLOCK                     | - This code must be used by the issuer for cards with temporary billing block.                                                                                                                                                                                                                                                                                                                                                                          | Reversible   |
| 63          | SECURITY VIOLATION                          | - This code must be used by the Issuer when the card security code (CVE2) is incorrect/invalid or invalid MST (token).                                                                                                                                                                                                                                                                                                                                  | Irreversible |
| 64          | MINIMUM TRANSACTION AMOUNT - INVALID        | - This code must be used by the issuer when the transaction amount is below the minimum allowed by the Issuer                                                                                                                                                                                                                                                                                                                                           | Irreversible |
| 65          | QUALITY OF WITHDRAWALS EXCEEDED             | - This code must be used by the issuer when the withdrawal quantity limit is exceeded                                                                                                                                                                                                                                                                                                                                                                   | Reversible   |
| 75          | WITHDRAWAL/ PASSWORD ATTEMPTS EXCEEDED      | - This code must be used by the Issuer when the number of password attempts stipulated by the Issuer is exceeded (used only for withdrawls)                                                                                                                                                                                                                                                                                                             | Reversible   |
| 76          | INVALID OR NON-EXISTENT DESTINATION ACCOUNT | - This code must be used by the issuer when the account "PARA" (destination) in BIT 3 is invalid or non-existent and exclusively for Funds Transfer transactions                                                                                                                                                                                                                                                                                        | Irreversible |
| 77          | INVALID OR NON-EXISTENT ORIGINAL ACCOUNT    | - This code must be used by the issuer when the "DE" (origin) account in BIT 3 is invalid or non-existent and exclusively for Funds Transfer transactions.                                                                                                                                                                                                                                                                                              | Irreversible |
| 78          | NEW CARD WITHOUT UNLOCKING / CARD BLOCKED   | - This code must be used by the issuer when the new card has not yet been unlocked (activated) by the cardholder with the Issuer or when the cardholder, through autonomy, wishes to temporarily block the card through the issuer application.                                                                                                                                                                                                         | Reversible   |
| 82          | INVALID CARD (internal data)                | - This code must be used by the issuer when the card's internal data does not match (eg invalid cryptogram, invalid ATC etc.)                                                                                                                                                                                                                                                                                                                           | Irreversible |
| 83          | IT IS NOT POSSIBLE TO VALIDATE THE PASSWORD | - This code must be used by the Issuer and will be used by Elo when it is not possible to validate or decrypt the password.                                                                                                                                                                                                                                                                                                                             | Irreversible |
| 91          | ISSUER OUT OF AIR                           | - This code will be used by the brand when the issuer is temporarily unavailable to authorize the transaction or the issuer's response was not received within the established time.                                                                                                                                                                                                                                                                    | Reversible   |
| 96          | SYSTEM FAILURE                              | - This code will be used by the brand or the issuer due to problems processing the transaction.                                                                                                                                                                                                                                                                                                                                                         | Reversible   |
| AB          | INCORRECT FUNCTION (DEBIT)                  | - This code will be used by the issuer to signal the establishment that it requested authorization in the debit function, but the card does not have this function active.                                                                                                                                                                                                                                                                              | Irreversible |
| AC          | INCORRECT FUNCTION (CREDIT)                 | - This code will be used by the Issuer to signal the establishment that he requested authorization in the credit function, but the card does not have this function active.                                                                                                                                                                                                                                                                             | Irreversible |
| FM          | USE THE CHIP                                | - This code will be used by the issuer to inform the merchant that the contactless transaction will not be successful and that the cardholder must use the chip (contact).                                                                                                                                                                                                                                                                              | Irreversible |
| P5          | PASSWORD CHANGE / UNLOCKING FAILURE         | - This code will be used by the issuer when there is a password change or unlocking failure.                                                                                                                                                                                                                                                                                                                                                            | Irreversible |
| P6          | NEW PASSWORD NOT ACCEPTED                   | - This code will be used by the issuer when the new password chosen by the customer does not meet the minimum criteria established by the Issuer.                                                                                                                                                                                                                                                                                                       | Reversible   |

### Hipercard

**What is it?**

Charges made when a merchant exceeds the Retry rules for denied transactions with the same card, same date or monthly period, same amount and same number of merchant, as follows:

| Program                               | Gift Card – CP                                                                                                                                 | Card not present – ​​CNP                                                                                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Excessive Retries​                    | BRL 1.85 per retries from the 9th denied response - same card and same day (item 2)                                                            | R$ 1.85 per retries from the 9th denied response - same card and same month of reference (item 3)                                                             |
| **ASI Transaction Retry** (Zero Auth) | BRL 0.15 per ASI Transaction Retry after issuer refusal - same card, same day (item 2)                                                         | BRL 0.15 per ASI Transaction Retry after negative from the issuer - same card and same reference month (item 3)                                               |
| Irreversible transaction retry        | 0.03% of the transaction value per retry​<br>Minimum BRL 0.15<br>Maximum BRL 0.80<br>Same card and same day after reply with irreversible code | 0.03% of the transaction amount per retry​<br>Minimum BRL 0.15<br>Maximum BRL 0.80<br>Same card and same month after response with irreversible code (item 3) |

**Rules:**

1. **ASI transactions**: these are Account Status Inquiry transactions, that is, transactions carried out to query the status of a card (check that it is active). For this purpose, financial transactions should not be used, but specific transactions.​
2. **Attempts per day (item 2)**: consider for purposes of Hipercard's Retry program from 00:00 to 23:59​
3. **Reference month (item 3)**: for purposes of the Hipercard Retry program, consider the 01st to the 30th or 31st of the month in which the transaction took place. The charge will be sent after the close of the subsequent month.​
4. **Transaction codes** considered **irreversible by the issuer** were categorized by the ABECS payments and self-regulation industry, through current Regulation 21. See [Return codes (ABECS)](https://developercielo.github.io/en/manual/cielo-ecommerce#return-codes-abecs).
5. **Codes not mentioned in the ABECS manual are considered reversible**.

<aside class="notice">Effective date: September 15, 2022.</aside>

### Other brands

- **Reversible codes:** New attempts will be allowed for the same customer and card. There is no limit and pre-established period;

> **Important: you should follow the guidance received in the response to the transaction denied, before making a new attempt.**

- **Irreversible Codes:** Authorizations will not be allowed for the same card or establishment, after receiving the 1st refusal response from the issuer.

## ABECS return codes

Go to [Card Brands Retry Program](https://developercielo.github.io/en/manual/linkdepagamentos5#card-brands-retry-program) to know more about the card brands rules for retrying transactions.

The Brazilian Association of Credit Card and Services Companies (ABECS) establishes as of July 15, 2020 the standardization of the return code of refused sales authorizations for both the physical payment and e-commerce solutions of the Brazilian market .

This normative measure seeks to bring benefits to the entire payments market, providing greater transparency in understanding the reason for refusal of transactions, in addition to enabling greater assertiveness in the adoption of sales retry strategies.

Cielo informs its customers that it is prepared to process transactions following this new market standard, as follows the table of codes standardized by ABECS.

<aside class="notice">The AMEX brand codes have undergone a to/from in order to maintain two digits. We reinforce that this measure does not change the reasons for return.</aside>

| Message                                                                     | Code Type    | ELO                        | VISA                       | MASTERCARD/HIPER           | AMEX                       | AMEX - from/to Cielo       | Message POS/Ecommerce                                       |
| --------------------------------------------------------------------------- | ------------ | -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- | ----------------------------------------------------------- |
| GENERIC                                                                     | REVERSIBLE   | 05                         | 05                         | 05                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                    |
| INSUFFICIENT BALANCE/LIMIT                                                  | REVERSIBLE   | 51                         | 51                         | 51                         | 116                        | A5                         | NOT ALLOWED                                                 |
| INVALID PASSWORD                                                            | REVERSIBLE   | 55                         | 55 ou 86                   | 55                         | 117                        | A6                         | INVALID PASSWORD                                            |
| TRANSACTION NOT ALLOWED FOR THE CARD                                        | REVERSIBLE   | 57                         | 57                         | 57                         | 200                        | FD                         | TRANSACTION NOT ALLOWED FOR CARD                            |
| CARD NUMBER DOES NOT BELONG TO THE ISSUER \| INVALID CARD NUMBER            | IRREVERSIBLE | 14 ou 56                   | 06                         | 14 ou 01                   | 122                        | 08                         | CHECK THE CARD DATA                                         |
| SECURITY BREACH                                                             | IRREVERSIBLE | 63                         | 06                         | 14                         | 122                        | 08                         | CHECK THE CARD DATA                                         |
| SUSPECTED FRAUD                                                             | REVERSIBLE   | 59                         | 59                         | 63                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                    |
| INVALID MERCHANT                                                            | IRREVERSIBLE | 58                         | SEM CÓDIGO CORRESPONDENTE  | 03                         | 109                        | DA                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN                  |
| INVALID MERCHANT                                                            | REVERSIBLE   | WITHOUT CORRESPONDING CODE | 03                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED                                     |
| REDO TRANSACTION (ISSUER REQUESTS RETENTATIVE)                              | REVERSIBLE   | 4                          | WITHOUT CORRESPONDING CODE | SE                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | REDO TRANSACTION                                            |
| CONSULT ACCREDITATOR                                                        | REVERSIBLE   | 6                          | WITHOUT CORRESPONDING CODE | SE                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | MERCHANT, CONTACT THE PURCHASER                             |
| PROBLEM IN THE PURCHASER                                                    | IRREVERSIBLE | 19                         | 19                         | 30                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD ERROR – DO NOT TRY AGAIN                               |
| CARD ERROR                                                                  | IRREVERSIBLE | 12                         | 06                         | WITHOUT CORRESPONDING CODE | 115                        | A2                         | CHECK THE CARD DATA                                         |
| FORMAT ERROR (MESSAGE)                                                      | IRREVERSIBLE | 30                         | 12                         | 30                         | 181                        | A3                         | CARD ERROR - DO NOT TRY AGAIN                               |
| INVALID TRANSACTION VALUE                                                   | IRREVERSIBLE | 13                         | 13                         | 13                         | 110                        | JB                         | TRANSACTION VALUE NOT ALLOWED - DO NOT TRY AGAIN            |
| INVALID INSTALMENTS VALUE                                                   | IRREVERSIBLE | 23                         | WITHOUT CORRESPONDING CODE | 12                         | 115                        | A2                         | INVALID INSTALMENTS - DO NOT TRY AGAIN                      |
| PASSWORD ATTEMPTS EXCEEDED \| PURCHASES                                     | REVERSIBLE   | 38                         | 75                         | 75                         | 106                        | A4                         | PASSWORD ATTEMPTS EXCEEDED. CONTACT YOUR CARD CENTER        |
| LOST CARD                                                                   | IRREVERSIBLE | 41                         | 41                         | 41                         | 200                        | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN                  |
| STOLEN CARD                                                                 | IRREVERSIBLE | 43                         | 43                         | 43                         | 200                        | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN                  |
| CARD EXPIRED / DT INVALID EXPIRATION                                        | IRREVERSIBLE | 54                         | 06                         | 54                         | 101                        | BV                         | CHECK THE CARD DATA                                         |
| TRANSACTION NOT ALLOWED \| TERMINAL CAPACITY                                | IRREVERSIBLE | 57                         | 58                         | 58                         | 116                        | A5                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN                  |
| EXCESS VALUE \| WITHDRAW                                                    | REVERSIBLE   | 61                         | 61 ou N4                   | 61                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | EXCESS VALUE. CONTACT YOUR CARD CENTER                      |
| DOMESTIC CARD - INTERNATIONAL TRANSACTION                                   | IRREVERSIBLE | 62                         | SEM CÓDIGO CORRESPONDENTE  | 62                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD DOES NOT ALLOW INTERNATIONAL TRANSACTION               |
| DOMESTIC CARD - INTERNATIONAL TRANSACTION                                   | REVERSIBLE   | WITHOUT CORRESPONDING CODE | 62                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD DOES NOT ALLOW INTERNATIONAL TRANSACTION               |
| MINIMUM VALUE OF INVALID TRANSACTION                                        | IRREVERSIBLE | 64                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION VALUE NOT ALLOWED - DO NOT TRY AGAIN            |
| AMOUNT OF WITHDRAWALS EXCEEDED                                              | REVERSIBLE   | 65                         | 65                         | 65                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | AMOUNT OF WITHDRAWALS EXCEEDED. CONTACT YOUR CARD CENTER    |
| PASSWORD EXPIRED / PASSWORD ENCRYPTION ERROR                                | IRREVERSIBLE | 74                         | 74 ou 81                   | 88                         | 180                        | A7                         | INVALID PASSWORD - DO NOT TRY AGAIN                         |
| PASSWORD ATTEMPTS EXCEEDED \| WITHDRAW                                      | REVERSIBLE   | 75                         | 75                         | 75                         | 106                        | A4                         | PASSWORD ATTEMPTS EXCEEDED. CONTACT YOUR CARD CENTRAL       |
| INVALID OR NON-EXISTENT DESTINATION ACCOUNT                                 | IRREVERSIBLE | 76                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID DESTINATION ACCOUNT - DO NOT TRY AGAIN              |
| INVALID OR NON-EXISTENT ORIGIN ACCOUNT                                      | IRREVERSIBLE | 77                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID ORIGIN ACCOUNT - DO NOT TRY AGAIN                   |
| NEW CARD WITHOUT UNLOCKING                                                  | REVERSIBLE   | 78                         | 78                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | UNLOCK THE CARD                                             |
| INVALID CARD (cryptogram)                                                   | IRREVERSIBLE | 82                         | 82                         | 88                         | 180                        | A7                         | CARD ERROR - DO NOT TRY AGAIN                               |
| ISSUER OUT OF AIR                                                           | REVERSIBLE   | 91                         | 91                         | 91                         | 912                        | A1                         | COMMUNICATION FAILED - TRY LATER                            |
| SYSTEM FAILURE                                                              | REVERSIBLE   | 96                         | 96                         | 96                         | 911                        | AE                         | COMMUNICATION FAILED - TRY LATER                            |
| DIFFERENCE - PRE AUTHORIZATION                                              | IRREVERSIBLE | 99                         | N8                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | DIFFERENT VALUE OF PRE-AUTHORIZATION - DO NOT TRY AGAIN     |
| INCORRECT FUNCTION (DEBIT)                                                  | IRREVERSIBLE | AB                         | 52 ou 53                   | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | USE CREDIT FUNCTION                                         |
| INCORRECT FUNCTION (CREDIT)                                                 | IRREVERSIBLE | AC                         | 39                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | USE DEBIT FUNCTION                                          |
| PASSWORD CHANGE / UNLOCK                                                    | IRREVERSIBLE | P5                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID PASSWORD - DO NOT TRY AGAIN                         |
| NEW PASSWORD NOT ACCEPTED                                                   | REVERSIBLE   | P6                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID PASSWORD USE NEW PASSWORD                           |
| COLLECT CARD (NO FRAUD)                                                     | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 04                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |
| ERROR DUE TO DYNAMIC KEY CHANGE                                             | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 06                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD ERROR - DO NOT TRY AGAIN                               |
| CONFIRMED FRAUD                                                             | IRREVERSIBLE | 57                         | 07                         | 04                         | 200                        | FD                         | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE |
| ISSUER NOT LOCATED - INCORRECT BIN                                          | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 15                         | 15                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID CARD DATA - DO NOT TRY AGAIN                        |
| (buyer’s negative) FAILURE TO COMPLY WITH THE LAWS OF ANTE MONEY LAUNDERING | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 64                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |
| INVALID REVERSAL                                                            | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 76                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |
| NOT LOCATED BY ROUTER                                                       | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 92                         | 92                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |
| TRANSACTION DENIED FOR INFRINGEMENT OF LAW                                  | IRREVERSIBLE | 57                         | WITHOUT CORRESPONDING CODE | 57                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD - DO NOT TRY AGAIN         |
| TRANSACTION DENIED FOR INFRINGEMENT OF LAW                                  | REVERSIBLE   | WITHOUT CORRESPONDING CODE | 93                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD                            |
| VALUE OF TRACING DATA DUPLICATE                                             | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 94                         | 94                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |
| SURCHARGE NOT SUPPORTED                                                     | REVERSIBLE   | WITHOUT CORRESPONDING CODE | B1                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                    |
| SURCHARGE NOT SUPPORTED BY DEBIT NETWORK                                    | REVERSIBLE   | WITHOUT CORRESPONDING CODE | B2                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                    |
| FORÇAR STIP                                                                 | REVERSIBLE   | WITHOUT CORRESPONDING CODE | N0                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                    |
| WITHDRAWAL NOT AVAILABLE                                                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | N3                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHDRAWAL NOT AVAILABLE - DO NOT TRY AGAIN                 |
| RECURRING PAYMENT SUSPENSION FOR A SERVICE                                  | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R0                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING PAYMENT SUSPENDED FOR SERVICE - DO NOT TRY AGAIN  |
| RECURRENT PAYMENT SUSPENSION FOR ALL SERVICE                                | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R1                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING PAYMENT SUSPENDED FOR SERVICE - DO NOT TRY AGAIN  |
| TRANSACTION NOT ELIGIBLE FOR VISA PIN                                       | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R2                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD - DO NOT TRY AGAIN         |
| SUSPENSION OF ALL AUTHORIZATION ORDERS                                      | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R3                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING PAYMENT SUSPENDED FOR SERVICE - DO NOT TRY AGAIN  |
| CANNOT FIND THE RECORD IN THE FILE                                          | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | 25                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |
| FILE NOT AVAILABLE FOR UPDATE                                               | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | 28                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DO NOT TRY AGAIN                 |

### Other return codes

| Response Code | Definition                                                                                                                                                   | Meaning                                                                                                                                                                                                                                                                             | Action                                                                                                                                                                                                       | Allows Retry                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| 00            | Transaction authorized successfully.                                                                                                                         | Transaction authorized successfully.                                                                                                                                                                                                                                                | Transação autorizada com sucesso.                                                                                                                                                                            | No                                               |
| 02            | Unauthorized transaction. Referred transaction.                                                                                                              | Unauthorized transaction. Referred (suspected fraud) by the issuing bank.                                                                                                                                                                                                           | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                         | No                                               |
| 09            | Transaction canceled partially successfully.                                                                                                                 | Transaction canceled partially successfully.                                                                                                                                                                                                                                        | Transaction canceled partially successfully.                                                                                                                                                                 | No                                               |
| 11            | Successfully authorized transaction for card issued abroad                                                                                                   | Successfully authorized transaction.                                                                                                                                                                                                                                                | Successfully authorized transaction.                                                                                                                                                                         | No                                               |
| 21            | Cancellation not made. Transaction not found.                                                                                                                | Unable to process cancellation. If the error persists, contact Cielo.                                                                                                                                                                                                               | Unable to process cancellation. Try again later. If the error persists, contact the virtual store.                                                                                                           | No                                               |
| 22            | Invalid installment. Number of invalid installments.                                                                                                         | Unable to process transaction. Number of invalid installments. If the error persists, contact Cielo.                                                                                                                                                                                | The transaction could not be processed. Invalid value. Redo the transaction confirming the data entered. If the error persists, contact the virtual store.                                                   | No                                               |
| 24            | Invalid amount of installments.                                                                                                                              | Unable to process the transaction. Invalid amount of installments. If the error persists, contact Cielo.                                                                                                                                                                            | The transaction could not be processed. Invalid amount of installments. Redo the transaction confirming the data entered. If the error persists, contact the virtual store.                                  | No                                               |
| 60            | Unauthorized transaction.                                                                                                                                    | Unauthorized transaction. Try again. If the error persists, the holder must contact the issuing bank.                                                                                                                                                                               | Unable to process transaction. Try again later. If the error persists, contact your issuing bank.                                                                                                            | Only 4 times in 16 days.                         |
| 67            | Unauthorized transaction. Card blocked for purchases today.                                                                                                  | Unauthorized transaction. Card blocked for purchases today. Blocking may have occurred due to too many invalid attempts. The card will automatically unlock at midnight.                                                                                                            | Transaction not authorized. Card temporarily blocked. Contact your issuing bank.                                                                                                                             | From the next day, only 4 times in 16 days.      |
| 70            | Unauthorized transaction. Limit exceeded/no balance.                                                                                                         | Unauthorized transaction. Limit exceeded/no balance.                                                                                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                         | From the following day, only 4 times in 16 days. |
| 72            | Cancellation not made. Insufficient balance available for cancellation.                                                                                      | Cancellation not made. Insufficient balance available for cancellation. If the error persists, contact Cielo.                                                                                                                                                                       | Cancellation not made. Try again later. If the error persists, contact the online store.                                                                                                                     | No                                               |
| 79            | Transaction not allowed / Mastercard                                                                                                                         | Unauthorized transaction. Unable to process transaction due to error related to cardholder. Ask the bearer to contact the issuing bank.                                                                                                                                             | Contact your bank                                                                                                                                                                                            | No                                               |
| 80            | Unauthorized transaction. Divergence on transaction/payment date.                                                                                            | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                           | Unauthorized transaction. Redo the transaction confirming data.                                                                                                                                              | No                                               |
| 82            | Transaction not allowed / Mastercard                                                                                                                         | Transaction not authorized due to issuer rules. Instruct the cardholder to contact the issuing bank.                                                                                                                                                                                | Contact your bank                                                                                                                                                                                            | No                                               |
| 83            | Transaction not allowed / Mastercard                                                                                                                         | Unauthorized transaction. Suspicion of fraud by the issuing bank.                                                                                                                                                                                                                   | Contact your bank                                                                                                                                                                                            | No                                               |
| 85            | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error in the processing. Ask the cardholder to re-enter the card details, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo.                                             | Transaction not allowed. Enter the card details again. If the error persists, contact the online store.                                                                                                      | No                                               |
| 89            | Transaction error.                                                                                                                                           | Unauthorized transaction. Transaction error. The holder must try again and if the error persists, contact the issuing bank.                                                                                                                                                         | Transaction not authorized. Transaction error. Please try again and if the error persists, contact your issuing bank.                                                                                        | Only 4 times in 16 days.                         |
| 90            | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error in the processing. Ask the cardholder to re-enter the card details, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo.                                             | Transaction not allowed. Enter the card details again. If the error persists, contact the online store.                                                                                                      | No                                               |
| 97            | Value not allowed for this transaction.                                                                                                                      | Transaction not authorized. Amount not allowed for this transaction.                                                                                                                                                                                                                | Unauthorized transaction. Amount not allowed for this transaction.                                                                                                                                           | No                                               |
| 98            | System/communication unavailable.                                                                                                                            | Transaction not authorized. Sender system without communication. If general, check SITEF, GATEWAY and/or Connectivity.                                                                                                                                                              | Your Transaction cannot be processed, Please try again later. If the error persists, contact the webshop.                                                                                                    | Only 4 times in 16 days.                         |
| 475           | Cancellation Timeout                                                                                                                                         | The application did not respond within the expected time.                                                                                                                                                                                                                           | Retry after a few seconds. Persisting, contact Support.                                                                                                                                                      | No                                               |
| 999           | System/communication unavailable.                                                                                                                            | Transaction not authorized. Sender system without communication. Try later. It may be error in SITEF, please check !                                                                                                                                                                | Your Transaction cannot be processed, Please try again later. If the error persists, contact the online store.                                                                                               | From the next day, only 4 times in 16 days.      |
| AA            | Time Exceeded                                                                                                                                                | Time exceeded in communicating with the issuing bank. Instruct the holder to try again, if the error persists it will be necessary for the holder to contact his issuing bank.                                                                                                      | Timeout in your communication with the issuing bank, try again later. If the error persists, contact your bank.                                                                                              | Only 4 times in 16 days.                         |
| AF            | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error in the processing. Ask the cardholder to re-enter the card details, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo.                                             | Transaction not allowed. Enter the card details again. If the error persists, contact the online store.                                                                                                      | No                                               |
| AG            | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error in the processing. Ask the cardholder to re-enter the card details, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo.                                             | Transaction not allowed. Enter the card details again. If the error persists, contact the online store.                                                                                                      | No                                               |
| AH            | Transaction not allowed. Credit card being used with debit. Use credit function.                                                                             | Transaction not allowed. Credit card being used with debit. Ask the cardholder to select the payment option Credit Card.                                                                                                                                                            | Unauthorized transaction. Please try again by selecting the credit card payment option.                                                                                                                      | No                                               |
| AI            | Unauthorized transaction. Authentication was not performed.                                                                                                  | Unauthorized transaction. Authentication has not been performed. The holder has not completed authentication. Ask the carrier to review the data and try again. If the error persists, contact Cielo informing the BIN (6 first digits of the card)                                 | Unauthorized transaction. Authentication was not successful. Please try again and correctly enter the requested data. If the error persists, contact the retailer.                                           | No                                               |
| AJ            | Transaction not allowed. Credit or debit transaction in an operation that only allows Private Label. Please try again by selecting the Private Label option. | Transaction not allowed. Credit or debit transaction in an operation that only allows Private Label. Ask the holder to try again by selecting the Private Label option. If the Private Label option is not available, check with Cielo if your establishment allows this operation. | Transaction not allowed. Credit or debit transaction in an operation that only allows Private Label. Please try again and select the Private Label option. In case of a new error, contact the online store. | No                                               |
| AV            | Unauthorized transaction. Invalid Data                                                                                                                       | Transaction data validation failed. Instruct the holder to review the data and try again.                                                                                                                                                                                           | Data validation failed. Please review the data entered and try again.                                                                                                                                        | Only 4 times in 16 days.                         |
| BD            | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error in the processing. Ask the cardholder to re-enter the card details, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo.                                             | Transaction not allowed. Enter the card details again. If the error persists, contact the online store.                                                                                                      | No                                               |
| BL            | Unauthorized transaction. Daily limit exceeded.                                                                                                              | Unauthorized transaction. Daily limit exceeded. Ask the bearer to contact your issuing bank.                                                                                                                                                                                        | Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.                                                                                                                                   | From the next day, only 4 times in 16 days.      |
| BM            | Unauthorized transaction. Invalid Card                                                                                                                       | Transaction not authorized. Invalid card. It could be card blocking at the issuing bank or incorrect data. Try using Lhum's Algorithm (Mod 10) to prevent unauthorized transactions for this reason.                                                                                | Unauthorized transaction. Invalid card. Redo the transaction confirming the data entered.                                                                                                                    | No                                               |
| BN            | Unauthorized transaction. Blocked card or account.                                                                                                           | Unauthorized transaction. The card or account of the holder is blocked. Ask the bearer to contact your issuing bank.                                                                                                                                                                | Unauthorized transaction. The card or account of the holder is blocked. Please contact your issuing bank.                                                                                                    | No                                               |
| BO            | Transaction not allowed. Operation failed.                                                                                                                   | Transaction not allowed. There was an error in processing. Ask the cardholder to re-enter the card details, if the error persists, contact the issuing bank.                                                                                                                        | Transaction not allowed. There was an error in processing. Re-enter the card details, if the error persists, contact the issuing bank.                                                                       | Only 4 times in 16 days.                         |
| BP            | Unauthorized transaction. Non-existent checking account.                                                                                                     | Unauthorized transaction. Unable to process the transaction due to an error related to the card or account of the holder. Ask the bearer to contact the issuing bank.                                                                                                               | Unauthorized transaction. Unable to process the transaction due to an error related to the card or account of the holder. Please contact the issuing bank.                                                   | No                                               |
| BP176         | Transaction not allowed.                                                                                                                                     | Partner must check if the integration process completed successfully.                                                                                                                                                                                                               | Partner must check if the integration process completed successfully.                                                                                                                                        | ---                                              |
| C1            | Transaction not allowed. Card cannot process debit transactions.                                                                                             | Change the method of payment or the card used.                                                                                                                                                                                                                                      | Change the method of payment or the card used.                                                                                                                                                               | No                                               |
| C2            | Transaction not allowed.                                                                                                                                     | Incorrect data. Please review the data filled in on the payment screen.                                                                                                                                                                                                             | Incorrect data. Please review the data filled in on the payment screen.                                                                                                                                      | No                                               |
| C3            | Transaction not allowed.                                                                                                                                     | Invalid period for this transaction type.                                                                                                                                                                                                                                           | Invalid period for this transaction type.                                                                                                                                                                    | No                                               |
| CF            | Transaction not authorized.C79:J79 Data validation failed.                                                                                                   | Transaction not authorized. Data validation failed. Ask the bearer to contact the issuing bank.                                                                                                                                                                                     | Unauthorized transaction. Data validation failed. Please contact the issuing bank.                                                                                                                           | No                                               |
| CG            | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Ask the bearer to contact the issuing bank.                                                                                                                                                                                       | Unauthorized transaction. Data validation failed. Please contact the issuing bank.                                                                                                                           | No                                               |
| DF            | Transaction not allowed. Card failure or invalid card.                                                                                                       | Transaction not allowed. Card failure or invalid card. Ask the cardholder to re-enter the card details, if the error persists, contact the bank                                                                                                                                     | Transaction not allowed. Card failure or invalid card. Re-enter card details, if error persists, contact bank                                                                                                | Only 4 times in 16 days.                         |
| DM            | Unauthorized transaction. Limit exceeded/no balance.                                                                                                         | Transaction not authorized. Limit exceeded/no balance.                                                                                                                                                                                                                              | Transaction not authorized. Contact your issuing bank.                                                                                                                                                       | From the next day, only 4 times in 16 days.      |
| DQ            | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Ask the bearer to contact the issuing bank.                                                                                                                                                                                       | Unauthorized transaction. Data validation failed. Please contact the issuing bank.                                                                                                                           | No                                               |
| DQ            | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Ask the bearer to contact the issuing bank.                                                                                                                                                                                       | Unauthorized transaction. Data validation failed. Please contact the issuing bank.                                                                                                                           | No                                               |
| DS            | Transaction not allowed for card                                                                                                                             | Transaction not authorized. Transaction not allowed for card.                                                                                                                                                                                                                       | Transaction not authorized. Contact your issuing bank.                                                                                                                                                       | Only 4 times in 16 days.                         |
| EB            | Number of installments greater than Allowed.                                                                                                                 | Unauthorized transaction. Contact Cielo and check if the registration has released installments.                                                                                                                                                                                    | Unauthorized transaction. Contact Cielo and check if the registration has been released in installments.                                                                                                     | Yes                                              |
| EE            | Transaction not allowed. Amount of the installment less than the minimum allowed.                                                                            | Transaction not allowed. Portion value less than the minimum allowed. Installments less than R$5.00 are not allowed. It is necessary to review the calculation for installments.                                                                                                    | Transaction not allowed. The amount of the installment is below the minimum allowed. Contact the virtual store.                                                                                              | No                                               |
| EK            | Transaction not allowed for card                                                                                                                             | Transaction not authorized. Transaction not allowed for card.                                                                                                                                                                                                                       | Transaction not authorized. Contact your issuing bank.                                                                                                                                                       | Only 4 times in 16 days.                         |
| FC            | Unauthorized transaction. Call Issuer                                                                                                                        | Transaction not authorized. Instruct the cardholder to contact the issuing bank.                                                                                                                                                                                                    | Unauthorized transaction. Please contact your issuing bank.                                                                                                                                                  | No                                               |
| FE            | Unauthorized transaction. Differences in transaction/payment date.                                                                                           | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                           | Unauthorized transaction. Redo the transaction confirming the data.                                                                                                                                          | No                                               |
| FF            | Cancellation OK                                                                                                                                              | Cancel transaction authorized successfully. ATTENTION: This return is for cases of cancellations and not for cases of authorizations.                                                                                                                                               | Cancellation transaction authorized successfully                                                                                                                                                             | No                                               |
| FG            | Unauthorized transaction. Call AmEx 08007285090.                                                                                                             | Transaction not authorized. Direct the cardholder to contact the AmEx Service Center.                                                                                                                                                                                               | Unauthorized transaction. Contact the AmEx Service Center on 08007285090                                                                                                                                     | No                                               |
| GA            | Wait for Contact                                                                                                                                             | Unauthorized transaction. Referred by Lynx Online preventively.                                                                                                                                                                                                                     | Unauthorized transaction. Contact the shopkeeper.                                                                                                                                                            | No                                               |
| GD            | Transaction not allowed.                                                                                                                                     | Transaction not allowed. Contact Cielo.                                                                                                                                                                                                                                             | Transaction not allowed. Contact Cielo.                                                                                                                                                                      | ---                                              |
| HJ            | Transaction not allowed. Invalid operation code.                                                                                                             | Transaction not allowed. Coban operation code invalid.                                                                                                                                                                                                                              | Transaction not allowed. Invalid Coban operation code. Contact the shopkeeper.                                                                                                                               | No                                               |
| IA            | Transaction not allowed. Invalid operation indicator.                                                                                                        | Transaction not allowed. Coban operation indicator invalid.                                                                                                                                                                                                                         | Transaction not allowed. Invalid Coban Operation Indicator. Contact the shopkeeper.                                                                                                                          | No                                               |
| KA            | Transaction not allowed. Data validation failed.                                                                                                             | Transaction not allowed. Data validation failed. Ask the carrier to review the data and try again. If the error persists, check the communication between the virtual store and Cielo.                                                                                              | Transaction not allowed. Data validation failed. review the data entered and try again. If the error persists, contact the Virtual Store.                                                                    | No                                               |
| KB            | Transaction not allowed. Incurring option selected.                                                                                                          | Transaction not allowed. Wrong option selected. Ask the carrier to review the data and try again. If the error persists, the communication between the virtual store and Cielo must be checked.                                                                                     | Transaction not allowed. Wrong option selected. Try again. If the error persists, contact the Virtual Store.                                                                                                 | No                                               |
| KE            | Unauthorized transaction. Data validation failed.                                                                                                            | Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the holder.                                                                                                                                                        | Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the virtual store.                                                                                                 | No                                               |
| N7            | Unauthorized transaction. Invalid security code.                                                                                                             | Transaction not authorized. Security code is invalid. Direct the cardholder to correct the data and try again.                                                                                                                                                                      | Unauthorized transaction. Review the data and enter again.                                                                                                                                                   | No                                               |
| U3            | Transaction not allowed. Data validation failed.                                                                                                             | Transaction not allowed. Data validation failed. Ask the carrier to review the data and try again. If the error persists, check the communication between the virtual store and Cielo.                                                                                              | Transaction not allowed. Data validation failed. review the data entered and try again. If the error persists, contact the Virtual Store.                                                                    | No                                               |

## Anti-Fraud Status

|  Field  | Definition             |
| :-----: | ---------------------- |
| ** 0 ** | N \ A                  |
| ** 1 ** | Low risk               |
| ** 2 ** | High Risk              |
| ** 3 ** | Not finalized          |
| ** 4 ** | Moderate risk          |
| ** 5 ** | Authenticated          |
| ** 6 ** | Not hired              |
| ** 7 ** | Dismissed              |
| ** 8 ** | Not Applicable         |
| ** 9 ** | Recurrence Transaction |
