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

# Proposal

This manual will guide the developer in the integration with Cielo's Super Link API. After performing the described integrations, it will be possible to:

1. Create and edit Payment Links via API
2. Receive payment notifications
3. Consult payments
4. Set up your store properly

# About the Super Link

The Payment Link API allows the merchant to create, edit and consult payment links.
Its main objective is to allow stores to create payment links (Buttons or QR Codes), through their own systems, without the need to access the Backoffice and share with their customers.

> **Attention**:
>
> The payments link is not a **ORDER/TRANSACTION** URL. It is a "cart" that can be reused over and over again. <br>
> To receive notifications about transactions originating from Payment Links, **MANDATORY** is required to register the **Notification URL** in the Checkout backoffice. <br>
> The query of transactions carried out through Super Link can be done through the **Transactional Control API *. <br>

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

|Backoffice|Transactional|
|---|---|
|![Red stripe - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png)|![Red stripe - Transactional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png)

## Transacting in Test Mode

# Cielo OAUTH

Cielo OAUTH is an authentication process used in Cielo APIs that are correlated to E-commerce products. It uses the **[OAUTH2](https://oauth.net/2/)** protocol, where it is first necessary to obtain an access token, using its credentials, which should then be sent to the CieloOAuth API

> To get the `ClientID` and` ClientSecret`, see the topic of Obtaining Credentials.

To use Cielo Oauth you need the following credentials:

| PROPERTY       | DESCRIPTION                                                  | TIPO   |
| -------------- | ------------------------------------------------------------ | ------ |
| `ClientId`     | Key identifier provided by CIELO                             | guid   |
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

| Field                     | Format                                                       |
| ------------------------- | ------------------------------------------------------------ |
| **ClientId**              | b521b6b2-b9b4-4a30-881d-3b63dece0006                         |
| **ClientSecret**          | 08Qkje79NwWRx5BdgNJsIkBuITt5cIVO                             |
| **ClientId:ClientSecret** | _b521b6b2-b9b4-4a30-881d-3b63dece0006:08Qkje79NwWRx5BdgNJsIkBuITt5cIVO_ |
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
  "access_token":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6Ik1ldUNoZWNrb3V0IE1hc3RlciBLZXkiLCJjbGllbnRfaWQiOiJjODlmZGasdasdasdmUyLTRlNzctODA2YS02ZDc1Y2QzOTdkYWMiLCJzY29wZXMiOiJ7XCJTY29wZVwiOlwiQ2hlY2tvdXRBcGlcIixcIkNsYWltc1wiOltdfSIsInJvbGUiOiJasdasdasd291dEFwaSIsImlzc47I6Imh0dHBzOi8vYXV0aGhvbasdasdnJhc3BhZy5jb20uYnIiLCJhdWQiOiJVVlF4Y1VBMmNTSjFma1EzSVVFbk9pSTNkbTl0ZmasdsadQjVKVVV1UVdnPSIsImV4cCI6MTQ5Nzk5NjY3NywibmJmIjoxNDk3OTEwMjc3fQ.ozj4xnH9PA3dji-ARPSbI7Nakn9dw5I8w6myBRkF-uA",
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

| PROPERTY                  | DESCRIPTION                                                  | TYPE   | SIZE       | REQUIRED |
| ------------------------- | ------------------------------------------------------------ | ------ | ---------- | -------- |
| `name`                    | Product name                                                 | String | 128        | YES      |
| `description`             | Description of the product that will be displayed on the Checkout screen if the `show_description` option is true. | String | 512        |          |
| `showDescription`         | Flag indicating whether or not the description should be displayed on the Checkout screen | String | --         | No       |
| `price`                   | Product price in **cents**                                   | Int    | 1000000    | YES      |
| `expirationDate`          | Link expiration date. If a date is entered, the link becomes unavailable on the given date. If no date is entered, the link will not expire. | String | YYYY-MM-DD | No       |
| `weight`                  | Product weight in **grams**                                  | String | 2000000    | No       |
| `softDescriptor`          | Description to be displayed on the bearer's credit card invoice. | String | 13         | No       |
| `maxNumberOfInstallments` | Maximum number of installments that the buyer can select on the Checkout screen. If not informed, the store settings in Checkout Cielo will be used. | int    | 2          | No       |
| `quantity`                | Number of transactions remaining until the link stops working | Int | 2 | No |
| `type`                    | Type of sale to be made through the payment link:<br><br>**Asset** – Physical Material<br>**Digital** – Digital Product<br>**Service** – Service<br>**Payment** – Simple Payments<br>**Recurrent** – Recurrent Payment | String | 255        | YES      |

> Within `Description` You can use the pipe character`|`if it is desirable to break the line when displaying the description on the Checkout screen

**Shipping Information**

| PROPERTY                 | DESCRIÇÃO                                                    | TYPE   | SIZE   | REQUIRED |
| ------------------------ | ------------------------------------------------------------ | ------ | ------ | -------- |
| **shipping**             | Node containing product delivery information                 |        |        |          |
| `shipping.name`          | Shipping name. **Required for the shipping type “FixedAmount”** | string | 128    | Yes      |
| `shipping.price`         | Shipping price. **Required for the shipping type “FixedAmount”** | int    | 100000 | Yes      |
| `shipping.originZipCode` | Order origin zip code. Required for the shipping type “Correios”. Must contain only numbers | string | 8      | No       |
| `shipping.type`          | Shipping type.<br>**Correios** – Deliver by correios<br>**FixedAmount** – Fixed amount<br>**Free** - Free<br>**WithoutShippingPickUp** – Without shipping pick up<br>**WithoutShipping** – Without shipping<br><br>If the chosen product type is “**Asset**”, the allowed shipping types are: _**“Correios, FixedAmount or Free”**_.<br><br>If the chosen product type is “**Digital**” ou “**Service**”, the allowed shipping types are: _**“WithoutShipping, WithoutShippingPickUp”**_.<br><br>If the chosen product type is “**Recurrent**” the allowed shipping type is: _**“WithoutShipping”**_. | string | 255    | Yes      |

**Dados da Recorrência**

| PROPERTY             | DESCRIPTION                                                  | TYPE   | SIZE | REQUIRED |
| -------------------- | ------------------------------------------------------------ | ------ | ---- | -------- |
| **recurrent**        | Node containing information on the recurrence of payment. May be informed if the product type is “Recurrent” |        |      |          |
| `recurrent.interval` | Recurrence Charge Interval.<br><br>**Monthly** - Monthly<br>**Bimonthly** - Bimonthly<br>**Quarterly** - Quarterly<br>**SemiAnnual** - Semi Annual<br>**Annual** – Annual<br> | string | 128  | No       |
| `recurrrent.endDate` | Recurrence charge end date. If not informed the recurrence will not end, the charging will happen according to the interval selected indefinitely. | string | 128  | No       |

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
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

The data returned in the response includes all data sent in the request and additional data regarding link creation.

| PROPERTY   | TYPE   | DESCRIPTION                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| `id`       | guid   | Unique identifier of the payment link. Can be used to query, update or delete the link. |
| `shortUrl` | string | Represents the payment link that, when opened in a browser, will display the Checkout Cielo screen. |
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
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        " https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

| PROPERTY   | TYPE   | DESCRIPTION                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| `id`       | guid   | Unique identifier of the payment link. Can be used to query, update, or delete the link. |
| `shortUrl` | string | Represents the payment link that, when opened in a browser, will display the Checkout Cielo screen. |
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
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
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
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
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
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

| PROPRIEDADE | TIPO   | DESCRIÇÃO                                                    |
| ----------- | ------ | ------------------------------------------------------------ |
| `id`        | guid   | Unique identifier of the payment link. Can be used to query, update, or delete the link. |
| `shortUrl`  | string | Represents the payment link that, when opened in a browser, will display the Checkout Cielo screen. |
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

|Type|Description|
|---|---|
|`POST`| Notification where the merchant is passive. Two `HTTP POST` are triggered, one informing sales data and the other transaction status change|
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

``` json
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`$id`|node id|Numeric|-|Example: 1|
|`checkoutOrderNumber`|Order code generated by Cielo Checkout|Text|32|Example: a58995ce24fd4f1cb025701e95a51478|
|`createdDate`|Order creation date |Date|-|AAAA-MM-DDTHH:mm:SS.ss|
|`links.$id`|node id|Numeric|-|Example: 1|
|`links.method`|Operation method|Text|10|Exmeples: GET, POST, PUT|
|`links.rel`|Operation consumption relation|Text|10|Example: self|
|`links.href`|Endpoint for consumption of the operation|Text|512|Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e|

## Por Checkout_Cielo_Order_Number

### Request

To check a transaction through `Checkout_Cielo_Order_Number`, just perform a` GET`.

>**Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

### Response

## Por ID do link de pagamento

### Request

### Response
