---
layout: manual
title: Integration manual
description: Techinical specification for integrations using Promotions APIs wich includes features and access to functions to store and return data related to the Cielo´s promotions.
search: true
categories: manual
sort_order: 1
tags:
  - Cielo Promo
language_tabs:
  shell: cURL
---

# Overview - Promotions

Technical documentation to guide the developer on how to perform an integration along Cielo for the offers divulgation process and commercial establishments that use Cielo Promo promotions.

## Target Audience

Restrict/Private API, it is required the internal releasing for usage, only available to Cielo collaborators. Developers and partner integrators that have the knowledge in integration using REST APIs and that wish to integrate your system/mobile application with Cielo promotions API functionalities. 

## What is it?

APIs that allow the Promotions (discounts and gifts) divulgation in establishments that have Cielo Promo on the Partners platforms.

## How it works

Description of the HTTP verbs commom to the APIs:

| Method    | Description                                |
| --------- | ---------------------------------------- |
| **POST**  | The HTTP `POST` method is used on the creation of the features or on the send of information that will be processed. For example, creation of a transaction |
| **GET**   | The HTTP `GET` method is used for already existing feature queries. For example, transactions query |
| **PUT**   | The HTTP `PUT` method is used to replace features, performing a full update |
| **PATCH** | The HTTP `PATCH` is used to update features, performing a data partial update |

### Usage Diagram demonstrating the operation of the solution

Authentication flux and authorization to be performed to use the API features:

![Flux]({{ site.baseurl_root }}/images/apicielopromotions/fluxoautenticacao.png)

### Usage Diagram demonstrating the steps to the API usage

Step 1: Call feature /login to get the authentication and authorization page

![Step1]({{ site.baseurl_root }}/images/apicielopromotions/passo1.png)

Step 2: With the step 1 response, render the HTML on the application for the integration with the user

![Step2]({{ site.baseurl_root }}/images/apicielopromotions/passo2.png)

Step 3: After the login execution, get through callback, the authorization code

![Step3]({{ site.baseurl_root }}/images/apicielopromotions/passo3.png)

Step 4: With the authorization code, call the /access-token feature to generate the access_token required to perform the call to the API features

![Step4]({{ site.baseurl_root }}/images/apicielopromotions/passo4.png)

Step 5: With the asnwer, keep the access_token (expiring time) and the refresh_token (to generate the access_token)

## Endpoints (Sandbox and Production)

Production Environment 

* [https://api.cielo.com.br/promotions/v1](https://api.cielo.com.br/promotions/v1)

Sandbox Environment

* [https://api.cielo.com.br/sandbox/promotions/v1](https://api.cielo.com.br/sandbox/promotions/v1)

## HTTP Header

All API calls require that the informations below are present on the Header on requisition:

**Client-Id**: Access identification. Its generation occurs at the moment of the creation by the developer panel. Its value can be visualized on the "Client ID" column, within the "Developer" menu -> "Registered Client ID)

**Access-Token**:Access Token identification, that stores the access rules allowed to the Cliend ID. Its generation occurs at the moment of the Client ID creation by the developer panel. Its value can be visualized by clickin on "details" on the "Access Tokens" column, within the "Developer" menu -> "Registered Client ID"

## HTTP Status Code

| Code | Error                  | Description                               |
| ------ | --------------------- | ---------------------------------------- |
| 200    | OK                    | Operation performed successfully           |
| 201    | Created               | The solicitation was made, resulting in the creation of a new feature |
| 204    | Empty                 | Operation performed successfully, but no answer was returned |
| 400    | Bad Request           | The requisition has invalid parameter(s) |
| 401    | Unauthorized          | The access token was not informed or does not have access to the APIs |
| 403    | Forbidden             | The access to the feature was denied           |
| 404    | Not Found             | The informed feature on the request was not found |
| 413    | Request is to Large   | The requisition is surpassing the limit allowed to your token's profile de acesso |
| 422    | Unprocessable Entity  | The requisition has mandatory parameters not informed |
| 429    | Too Many Requests     | The consumer broke the limit of requests per time|
| 500    | Internal Server Error | Not expected error; something is broken on the API |

# Docs API 

## Fidelity 

### Getting HTML from LOGIN page

<aside class="request"><span class="method get">GET</span><span class="endpoint">/login</span></aside>

***`REQUEST`***

|     Name     | Location    |  Kind  |                Description                 | Mandatory |
| :----------: | :---------: | :----: | :--------------------------------------: | :---------: |
|  client_id   |    query    | string |  Redirect URL provided for the application.     |     Yes     |
| redirect_url |    query    | string | Redirect URL fornecida para receber o callback. |     Yes     |
|     name     |    query    | string |            Holder's name                 |     Yes     |
|     cpf      |    query    | string |            Holder's CPF                  |     Yes     |
|  birthdate   |    query    | string |         Holder's birth date              |     Yes     |
|    e-mail    |    query    | string |            Holder's e-mail               |     Yes     |

***Response***

| Code |           Description          |                  Model                   |
| ------ | :---------------------------: | :--------------------------------------: |
| 301    | Login Screen URL Redirection. | `Header: {"Location":{"description":"Login screen URL + client_id + redirect_url","type":"string"}}` |
| 400    |         Bad Request.          | `{"description":"Error full description.","type":"string"}` |
| 401    |         Unauthorized.         | `{"description":"Error full description.","type":"string"}` |
| 403    |          Forbidden.           | `{"description":"Error full description.","type":"string"}` |
| 404    |          Not Found.           | `{"description":"Error full description.","type":"string"}` |
| 422    |     Unprocessable Entity.     | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |    Internal Server Error.     | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |         Bad Gateway.          | `{"description":"Error full description.","type":"string"}` |
| 504    |       Gateway Timeout.        | `{"description":"Error full description.","type":"string"}` |

### Getting the HTML from the card register page 

<aside class="request"><span class="method get">GET</span><span class="endpoint">/cards</span></aside>

***`REQUEST`***

| Name         | Location    |  Kind  |                Description                 | Mandatory |
| ------------ | :---------: | :----: | :--------------------------------------: | :---------: |
| client_id    |    query    | string |  Client ID provided for the application.   |     Yes     |
| access_token |    query    | string |               Access Token               |     Yes     |
| redirect_url |    query    | string | Redirect URL provided to receive the callback. |     Yes     |

***Response***

| Code |                Description                 |                  Model                   |
| ------ | :--------------------------------------: | :--------------------------------------: |
| 301    | URL redirection of the registration screen. | `Header: {"Location":{"description":"Card screen URL + client_id + redirect_url","type":"string"}}` |
| 400    |               Bad Request.               | `{"description":"Error full description.","type":"string"}` |
| 401    |              Unauthorized.               | `{"description":"Error full description.","type":"string"}` |
| 403    |                Forbidden.                | `{"description":"Error full description.","type":"string"}` |
| 404    |                Not Found.                | `{"description":"Error full description.","type":"string"}` |
| 422    |          Unprocessable Entity.           | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |          Internal Server Error.          | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |               Bad Gateway.               | `{"description":"Error full description.","type":"string"}` |
| 504    |             Gateway Timeout.             | `{"description":"Error full description.","type":"string"}` |

### Returns the holder's data

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me</span></aside>

***`REQUEST`***

|     Name     | Location    |  Kind  |               Description             | Mandatory   |
| :----------: | :---------: | :----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string | Client ID provided for the application. |     Yes     |
| access_token |   header    | string |             Access Token              |     Yes     |

***`RESPONSE`***

| Code   |       Description      |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 200    |        Success         | `{"allOf":[ { "type":"object", "properties":{ "devices":{ "type":"array", "items":{ "id": { "type": "integer", "description": "Device identifier." }, "type": { "type": "string", "enum": [ "ANDROID", "IOS" ] } } } } },{ "id": { "type": "integer", "format": "int64", "description": "Card holder identifier." }, "birthdate": { "type": "string", "format": "date-time", "description": "Date of birth. The card holder must be at least 10 years old." }, "document": { "type": "string", "description": "Card holder document number.", "maxLength": 11 }, "email": { "type": "string", "description": "Card holder e-mail.", "maxLength": 100 }, "gender": { "type": "string", "description": "Card holder gender (F/M).", "enum": [ "FEMALE", "MALE" ] }, "name": { "type": "string", "description": "name.", "maxLength": 100 }, "phone": { "areaCode": { "type": "integer", "format": "int32" }, "phoneNumber": { "type": "integer", "format": "int32" } } } ]}` |
| 400    |      Bad Request.      | `{"description":"Error full description.","type":"string"}` |
| 401    |     Unauthorized.      | `{"description":"Error full description.","type":"string"}` |
| 403    |       Forbidden.       | `{"description":"Error full description.","type":"string"}` |
| 404    |       Not Found.       | `{"description":"Error full description.","type":"string"}` |
| 412    |  Precondition Failed.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"description":"Error full description.","type":"string"}` |
| 504    |    Gateway Timeout.    | `{"description":"Error full description.","type":"string"}` |

### Returns the card holder's list

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me/cards</span></aside>

***`REQUEST`***

|     Name     | Location    |  Kind   |               Description             | Mandatory   |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID provided for the application. |     Yes     |
| access_token |   header    | string  |             Access token              |     Yes     |
|   _offset    |    query    | integer |   Initial register to be returned     |     Yes     |
|    _limit    |    query    | integer |    Limit amount of registers          |     Yes     |
|   _expand    |    query    | string  |  Expands the relationship on return   |      No     |

***`RESPONSE`***

| Code   |         Description       |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 200    |            OK.            | `{"type":"object","properties":{"id":{"type":"number","format":"int64","description":"Card idenfifier."},"nickname":{"type":"string","description":"Card nickname."},"brand":{"type":"string","description":"Card brand."},"maskedPan":{"type":"string","description":"4 last digits."},"type":{"type": "string", "enum": [ "DEBIT", "CREDIT", "MULTIPLE" ]},"status":{"type": "string", "enum": [ "STRONG", "WEAK" ]},"partners":{"type":"array","items":{"allOf": [ { "type": "object", "properties": { "statusAssociation": { "description": "Requested association status.", "type": "boolean" } } }, { "id": { "type": "number", "format": "int64", "description": "Partner identifier." }, "name": { "type": "string", "description": "Partner name." }, "description": { "type": "string", "description": "Partner description." }, "term": { "type": "string", "description": "Partner accept term URL." }, "associationType": { "type": "string", "description": "Type of association released to partner.", "enum": [ "AUTOMATIC", "MANUAL" ] } } ]}}}}` |
| 400    |       Bad Request.        | `{"description":"Error full description.","type":"string"}` |
| 401    |       Unauthorized.       | `{"description":"Error full description.","type":"string"}` |
| 403    |        Forbidden.         | `{"description":"Error full description.","type":"string"}` |
| 404    |        Not Found.         | `{"description":"Error full description.","type":"string"}` |
| 405    |    Method Not Allowed.    | `{"description":"Error full description.","type":"string"}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"description":"Error full description.","type":"string"}` |
| 415    |  Unsupported Media Type.  | `{"description":"Error full description.","type":"string"}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"description":"Error full description.","type":"string"}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"description":"Error full description.","type":"string"}` |
| 504    |     Gateway Timeout.      | `{"description":"Error full description.","type":"string"}` |

### Returns the list of positivated transaction from a holder

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me/transactions</span></aside>

***`REQUEST`***

|     Name     | Location    |  Kind   |               Description             | Mandatory   |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID provided for the application. |     Yes     |
| access_token |   header    | string  |    Access token provided at login.    |     Yes     |
|   _offset    |    query    | integer |   Initial register to be returned     |     Yes     |
|    _limit    |    query    | integer |    Limit amount of registers          |     Yes     |
|  start_date  |    query    | string  |       Initial Date (ISO 8601).        |     Yes     |
|   end_date   |    query    | string  |        Final Date (ISO 8601).         |     Yes     |

***`RESPONSE`***

| Code   |       Description        |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 200    |          OK.           | `{"allOf":[{"type":"object","properties":{"transactionCancelled":{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Transaction Identifier." }, "commercialEstablishment": { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } } }, "productPrimary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "productSecondary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "containsPromotions": { "type": "boolean", "description": "Flag that identifies whether it contains promotion."},"transactionUndone":{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Transaction Identifier." }, "commercialEstablishment": { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } } }, "productPrimary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "productSecondary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "containsPromotions": { "type": "boolean", "description": "Flag that identifies whether it contains promotion."}}},{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Transaction Identifier." }, "commercialEstablishment": { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } } }, "productPrimary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "productSecondary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "containsPromotions": { "type": "boolean", "description": "Flag that identifies whether it contains promotion."}]}` |
| 400    |      Bad Request.      | `{"description":"Error full description.","type":"string"}` |
| 401    |     Unauthorized.      | `{"description":"Error full description.","type":"string"}` |
| 403    |       Forbidden.       | `{"description":"Error full description.","type":"string"}` |
| 404    |       Not Found.       | `{"description":"Error full description.","type":"string"}` |
| 412    |  Precondition Failed.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"description":"Error full description.","type":"string"}` |
| 504    |    Gateway Timeout.    | `{"description":"Error full description.","type":"string"}` |

### Gets data from a card

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me/cards/{card_id}</span></aside>

***`REQUEST`***

|     Name     |  Location   |  Kind   |               Description               | Mandatory |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID provided for the application. |     Yes     |
| access_token |   header    | string  |             Access token                |     Yes     |
|   card_id    |    path     | integer |       Holder's card ID                  |     Yes     |
|   _expand    |    query    | string  |  Expands the relationship on return     |      No     |

***`RESPONSE`***

| Code   |       Description      |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 200    |          Ok.           | `{"type":"object","properties":{"id":{"type":"number","format":"int64","description":"Card idenfifier."},"nickname":{"type":"string","description":"Card nickname."},"brand":{"type":"string","description":"Card brand."},"maskedPan":{"type":"string","description":"4 last digits."},"type":{"type": "string", "enum": [ "DEBIT", "CREDIT", "MULTIPLE" ]},"status":{"type": "string", "enum": [ "STRONG", "WEAK" ]},"partners":{"allOf": [ { "type": "object", "properties": { "statusAssociation": { "description": "Requested association status.", "type": "boolean" } } }, { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Partner identifier." }, "name": { "type": "string", "description": "Partner name." }, "description": { "type": "string", "description": "Partner description." }, "term": { "type": "string", "description": "Partner accept term URL." }, "associationType": { "type": "string", "description": "Type of association released to partner.", "enum": [ "AUTOMATIC", "MANUAL" ] } } } ]}}}}` |
| 400    |      Bad Request.      | `{"type":"string","description":"Error full description."}` |
| 401    |     Unauthorized.      | `{"type":"string","description":"Error full description."}` |
| 403    |       Forbidden.       | `{"type":"string","description":"Error full description."}` |
| 404    |       Not Found.       | `{"type":"string","description":"Error full description."}` |
| 412    |  Precondition Failed.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"type":"string","description":"Error full description."}` |
| 504    |    Gateway Timeout.    | `{"type":"string","description":"Error full description."}` |

### Returns the list of commercial establishments

<aside class="request"><span class="method get">GET</span><span class="endpoint">/commercial-establishments</span></aside>

***`REQUEST`***

|   Name    | Location    |  Kind  |               Description             |   Mandatory |
| :-------: | :---------: | :----: | :-----------------------------------: | :---------: |
| client_id |   header    | string | Client ID provided for the application. |     Yes     |
|   cnpj    |    query    | string |                 CNPJ                  |      No     |
|    cpf    |    query    | string |                  CPF                  |      No     |

***`RESPONSE`***

| Code   |            Description            |                  Model                   |
| ------ | :-----------------------------: | :--------------------------------------: |
| 200    | Commercial Establishments List. | `{"type":"object","properties":{"id":{"type":"number","format":"int64","description":"Commercial establishment identifier."},"fictitiousName":{"type":"string","description":"Fantasy name."},"businessActivity":{"type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } }}}}` |
| 400    |          Bad Request.           | `{"description":"Error full description.","type":"string"}` |
| 401    |          Unauthorized.          | `{"description":"Error full description.","type":"string"}` |
| 403    |           Forbidden.            | `{"description":"Error full description.","type":"string"}` |
| 404    |           Not Found.            | `{"description":"Error full description.","type":"string"}` |
| 422    |      Unprocessable Entity.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |     Internal Server Error.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |          Bad Gateway.           | `{"description":"Error full description.","type":"string"}` |
| 504    |        Gateway Timeout.         | `{"description":"Error full description.","type":"string"}` |

### Returns the Commercial Establishment subscription to a promotion

<aside class="request"><span class="method get">GET</span><span class="endpoint">/commercial-establishments/{commercial_establishment_id}/subscriptions/{subscription_id}</span></aside>

***`REQUEST`***

|            Name             |  Location   |  Kind   |               Description             | Mandatory   |
| :-------------------------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|          client_id          |   header    | string  | Client ID provided for the application. |     Yes     |
| commercial_establishment_id |    path     | integer |    commercial establishment ID      |     Yes     |
|       subscription_id       |    path     | integer |           subscription ID           |     Yes     |

***`RESPONSE`***

| Code   |            Description            |                  Model                   |
| ------ | :-----------------------------: | :--------------------------------------: |
| 200    | Commercial establishments list. | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"ID da promoção."},"status":{ "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "description": "Subscription status identifier" }, "description": { "type": "string", "description": "ubscription status description" } }},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"processingDate":{"type":"string","format":"date","description":"Processing date - ISO8601."}}}` |
| 400    |          Bad Request.           | `{"description":"Error full description.","type":"string"}` |
| 401    |          Unauthorized.          | `{"description":"Error full description.","type":"string"}` |
| 403    |           Forbidden.            | `{"description":"Error full description.","type":"string"}` |
| 404    |           Not Found.            | `{"description":"Error full description.","type":"string"}` |
| 422    |      Unprocessable Entity.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |     Internal Server Error.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |          Bad Gateway.           | `{"description":"Error full description.","type":"string"}` |
| 504    |        Gateway Timeout.         | `{"description":"Error full description.","type":"string"}` |

### Retorna a lista das subscrições aceitas e processadas para um Estabelecimento Comercial

<aside class="request"><span class="method get">GET</span><span class="endpoint">/commercial-establishments/{commercial_establishment_id}/subscriptions</span></aside>

***`REQUEST`***

|            Name             | Location    |  Kind   |               Description             | Mandatory |
| :-------------------------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|          client_id          |   header    | string  | Client ID provided for the application. |     Yes     |
| commercial_establishment_id |    path     | integer |     commercial establishment ID         |     Yes     |

***`RESPONSE`***

| Code   |            Description           |                  Model                   |
| ------ | :------------------------------: | :--------------------------------------: |
| 200    | Commercial establishments list*. | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"ID da promoção."},"status":{ "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "description": "Subscription status identifier" }, "description": { "type": "string", "description": "ubscription status description" } }},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"processingDate":{"type":"string","format":"date","description":"Processing date - ISO8601."}}}` |
| 400    |           Bad Request.           | `{"description":"Error full description.","type":"string"}` |
| 401    |          Unauthorized.           | `{"description":"Error full description.","type":"string"}` |
| 403    |            Forbidden.            | `{"description":"Error full description.","type":"string"}` |
| 404    |            Not Found.            | `{"description":"Error full description.","type":"string"}` |
| 422    |      Unprocessable Entity.       | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |      Internal Server Error.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |           Bad Gateway.           | `{"description":"Error full description.","type":"string"}` |
| 504    |         Gateway Timeout.         | `{"description":"Error full description.","type":"string"}` |

### Sends a subscription request to a promotion for a Commercial Establishment

<aside class="request"><span class="method post">POST</span><span class="endpoint">/commercial-establishments/{commercial_establishment_id}/subscriptions</span></aside>

***`REQUEST`***

|            Name             | Location    |  Kind   |                Description              |  Mandatory   |
| :-------------------------: | :---------: | :-----: | :--------------------------------------: | :---------: |
|          client_id          |   header    | string  |  Client ID provided for the application.   |     Yes   |
| commercial_establishment_id |    path     | integer |      commercial establishment ID       |     Yes     |
|        subscription         |    body     | object  |  { "promotionID" : 0, "action" : "S" }   |     Yes     |
|  subscription.promotionID   |    body     | integer |              promotion ID             |     Yes     |
|     subscription.action     |    body     | string  | Action kind:                                             S - subscribe / U - unsubscribe |     Yes     |

***`RESPONSE`***

| Code   |           Description          |                  Model                   |
| ------ | :----------------------------: | :--------------------------------------: |
| 202    | Subscription request accepted. | `Header: {"Location":{"description":"Location for request status query","type":"string"}}` |
| 400    |          Bad Request.          | `{"description":"Error full description.","type":"string"}` |
| 401    |         Unauthorized.          | `{"description":"Error full description.","type":"string"}` |
| 403    |           Forbidden.           | `{"description":"Error full description.","type":"string"}` |
| 404    |           Not Found.           | `{"description":"Error full description.","type":"string"}` |
| 422    |     Unprocessable Entity.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |     Internal Server Error.     | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |          Bad Gateway.          | `{"description":"Error full description.","type":"string"}` |
| 504    |        Gateway Timeout.        | `{"description":"Error full description.","type":"string"}` |

### Updates the status of a subscription

<aside class="request"><span class="method patch">PATCH</span><span class="endpoint">/subscriptions/{subscription_id}</span></aside>

***`REQUEST`***

|           Name           | Location    |  Kind   |                Description               | Mandatory   |
| :----------------------: | :---------: | :-----: | :--------------------------------------: | :---------: |
|        client_id         |   header    | string  |  Client ID provided for the application.   |     Yes     |
|     subscription_id      |    path     | integer | Commercial establishment subscription identifier to a promotion. |     Yes       |
|       subscription       |    body     | object  |  { "promotionID" : 0, "action" : "S" }   |     Yes     |
| subscription.promotionID |    body     | integer |             promotion ID                 |     Yes     |
|   subscription.action    |    body     | string  | Action kind:                                                   S - subscribe / U - unsubscribe |     Yes     |

***`RESPONSE`***

| Code   |       Description        |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 204    |      No Content.       | `{"description":"Error full description.","type":"string"}` |
| 400    |      Bad Request.      | `{"description":"Error full description.","type":"string"}` |
| 401    |     Unauthorized.      | `{"description":"Error full description.","type":"string"}` |
| 403    |       Forbidden.       | `{"description":"Error full description.","type":"string"}` |
| 404    |       Not Found.       | `{"description":"Error full description.","type":"string"}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"description":"Error full description.","type":"string"}` |
| 504    |    Gateway Timeout.    | `{"description":"Error full description.","type":"string"}` |

### Gets a list of non processed subscriptions

<aside class="request"><span class="method get">GET</span><span class="endpoint">/subscriptions/queue</span></aside>

***`REQUEST`***

|   Name    | Location    |  Kind  |               Description             |  Mandatory  |
| :-------: | :---------: | :----: | :-----------------------------------: | :---------: |
| client_id |   header    | string | Client ID provided for the application. |     Yes     |

***`RESPONSE`***

| Code   |             Description            |                  Model                   |
| ------ | :--------------------------------: | :--------------------------------------: |
| 200    | List of unprocessed subscriptions. | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"Promotion identifier."},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]}}}` |
| 400    |            Bad Request.            | `{"description":"Error full description.","type":"string"}` |
| 401    |           Unauthorized.            | `{"description":"Error full description.","type":"string"}` |
| 403    |             Forbidden.             | `{"description":"Error full description.","type":"string"}` |
| 404    |             Not Found.             | `{"description":"Error full description.","type":"string"}` |
| 422    |       Unprocessable Entity.        | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |       Internal Server Error.       | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |            Bad Gateway.            | `{"description":"Error full description.","type":"string"}` |
| 504    |          Gateway Timeout.          | `{"description":"Error full description.","type":"string"}` |

### Gets the status of non processed subscriptions

<aside class="request"><span class="method get">GET</span><span class="endpoint">/subscriptions/{subscription_id}/queue</span></aside>

***`REQUEST`***

|      Name       | Location    |  Kind   |               Description             |  Mandatory  |
| :-------------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|    client_id    |   header    | string  | Client ID provided for the application. |     Yes     |
| subscription_id |    path     | integer |           subscription ID               |     Yes     |

***`RESPONSE`***

| Code   |                Description               |                  Model                   |
| ------ | :--------------------------------------: | :--------------------------------------: |
| 200    |           Queue request data.            | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"Promotion identifier."},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]}}}` |
| 303    | Request processed. Redirect to the correct location. | `Header: {"Location":{"description":"Location of subscription creation.","type":"string"}}` |
| 400    |               Bad Request.               | `{"description":"Error full description.","type":"string"}` |
| 401    |              Unauthorized.               | `{"description":"Error full description.","type":"string"}` |
| 403    |                Forbidden.                | `{"description":"Error full description.","type":"string"}` |
| 404    |                Not Found.                | `{"description":"Error full description.","type":"string"}` |
| 422    |          Unprocessable Entity.           | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |          Internal Server Error.          | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |               Bad Gateway.               | `{"description":"Error full description.","type":"string"}` |
| 504    |             Gateway Timeout.             | `{"description":"Error full description.","type":"string"}` |

### Updates the ACCESS_TOKEN from the refresh_token

<aside class="request"><span class="method post">POST</span><span class="endpoint">/refresh-token</span></aside>

***`REQUEST`***

|        Name        | Location    |  Kind  |                Description               | Mandatory   |
| :----------------: | :---------: | :----: | :--------------------------------------: | :---------: |
|     client_id      |   header    | string |  Client ID provided for the application.   |     Yes     |
|   authorization    |   header    | string | Authorization code correspondent to the client_id + client_secret concatenation converted to Base 64. |     Yes     |
|      refresh       |    body     | object | { "grant_type":"string" , "code": "string" } |     Yes     |
| refresh.grant_type |    body     | string | Tipo do request, ex. grant_type = refresh_token |     Yes     |
|    refresh.code    |    body     | string |         refresh_token code                      |     Yes     |

***`RESPONSE`***

| Code   |         Description       |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 201    |         Created.          | `{"type":"object","properties":{"access_token":{"type":"string","description":"Access Token"},"refresh_token":{"type":"string","description":"Refresh Token"},"token_type":{"type":"string","description":"Token Type"},"expires_in":{"type":"integer","description":"Expires in"}}}` |
| 400    |       Bad Request.        | `{"description":"Error full description.","type":"string"}` |
| 401    |       Unauthorized.       | `{"description":"Error full description.","type":"string"}` |
| 403    |        Forbidden.         | `{"description":"Error full description.","type":"string"}` |
| 404    |        Not Found.         | `{"description":"Error full description.","type":"string"}` |
| 405    |    Method Not Allowed.    | `{"description":"Error full description.","type":"string"}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"description":"Error full description.","type":"string"}` |
| 415    |  Unsupported Media Type.  | `{"description":"Error full description.","type":"string"}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"description":"Error full description.","type":"string"}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"description":"Error full description.","type":"string"}` |
| 504    |     Gateway Timeout.      | `{"description":"Error full description.","type":"string"}` |

### Gets the ACCESS_TOKEN

<aside class="request"><span class="method post">POST</span><span class="endpoint">/access-token</span></aside>

***`REQUEST`***

| Name             | Location    |  Kind  |                Description               |   Mandatory |
| ---------------- | :---------: | :----: | :--------------------------------------: | ----------- |
| client_id        |   header    | string |  Client ID provided for the application.   | Yes         |
| authorization    |   header    | string | authorization code correspondent to the client_id + client_secret concatenation converted to Base 64. | Yes         |
| grant            |    body     | object | { "grant_type":"string" , "code": "string" } | Yes         |
| grant.grant_type |    body     | string | Request type, example: grant_type = authorization_code | Yes    |
| grant.code       |    body     | string |       authorization_code code           |             |

***`RESPONSE`***

| Codigo |         Description         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 201    |         Created.          | `{"type":"object","properties":{"access_token":{"type":"string","description":"Access Token"},"refresh_token":{"type":"string","description":"Refresh Token"},"token_type":{"type":"string","description":"Token Type"},"expires_in":{"type":"integer","description":"Expires in"}}}` |
| 400    |       Bad Request.        | `{"description":"Error full description.","type":"string"}` |
| 401    |       Unauthorized.       | `{"description":"Error full description.","type":"string"}` |
| 403    |        Forbidden.         | `{"description":"Error full description.","type":"string"}` |
| 404    |        Not Found.         | `{"description":"Error full description.","type":"string"}` |
| 405    |    Method Not Allowed.    | `{"description":"Error full description.","type":"string"}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"description":"Error full description.","type":"string"}` |
| 415    |  Unsupported Media Type.  | `{"description":"Error full description.","type":"string"}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"description":"Error full description.","type":"string"}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"description":"Error full description.","type":"string"}` |
| 504    |     Gateway Timeout.      | `{"description":"Error full description.","type":"string"}` |

## Promotions

### Gets a list of promotions

<aside class="request"><span class="method get">GET</span><span class="endpoint">/promotions</span></aside>

***`REQUEST`***

|   Name    | Location    |  Kind   |                Description                 | Mandatory |
| :-------: | :---------: | :-----: | :--------------------------------------: | :---------: |
| client_id |   header    | string  |  Client ID provided for the application.   |     Yes     |
| latitude  |    query    | number  |                 Latitude                 |     Yes     |
| longitude |    query    | number  |                Longitude                 |     Yes     |
|  radius   |    query    | integer |                 Radius                   |     Yes     |
|  active   |    query    | boolean | Indicator for active campaign / not active |     No     |
|   type    |    query    | string  | Kind of campaign. Example: A – RFM Amount; B – Event Birthday; E – Event Day; F – RFM Frequency; G – Generic; P – RFM Punch; R – Event Recurring Hour/Day; X – RFM Recency; W – Event Welcome; |     Não     |
|  _offset  |    query    | integer |     Initial reigster to be returned     |     Yes     |
|  _limit   |    query    | integer | Limit amount of registers to be returned |     Yes     |
|   _sort   |    query    | string  |     Sets the result ordination           |     No     |

***`RESPONSE`***

| Code |         Description         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 200    |            OK.            | `{"allOf":[{"type":"object","properties":{"commercialEstablishment":{ "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } }}}},{"type": "object", "properties": { "id": { "type": "integer", "description": "Campaign identifier in the PROMO database." }, "active": { "type": "boolean", "description": "Field that identifies whether the campaign is active." }, "endDate": { "type": "string", "format": "date", "description": "End date (ISO 8601)." }, "startDate": { "type": "string", "format": "date", "description": "Start date (ISO 8601)." }, "title": { "type": "string", "description": "Promotional Campaign Title." }, "description": { "type": "string", "description": "Promotional Campaign Description." }, "transactionDays": { "type": "string", "description": "Transaction Days." }, "campaignModel": { "type": "string", "description": "Campaign model." }, "premium": { "type": "string", "description": "Campaign Prize." }, "campaignType": { "type": "string", "description": "Tipo da Campanha. Ex: A – RFM Amount; B – Event Birthday; E – Event Day; F – RFM Frequency; G – Generic; P – RFM Punch; R – Event Recurring Hour/Day; X – RFM Recency; W – Event Welcome;", "enum": [ "A", "B", "E", "F", "G", "P", "R", "X", "W" ] }, "validityRedemption": { "type": "string", "format": "date", "description": "Validity of the redemption." }, "shareable": { "type": "boolean", "description": "Field that identifies whether the campaign can be shared." } }}]}` |
| 400    |       Bad Request.        | `{"type":"string","description":"Error full description."}` |
| 401    |       Unauthorized.       | `{"type":"string","description":"Error full description."}` |
| 403    |        Forbidden.         | `{"type":"string","description":"Error full description."}` |
| 404    |        Not Found.         | `{"type":"string","description":"Error full description."}` |
| 405    |    Method Not Allowed.    | `{"type":"string","description":"Error full description."}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"type":"string","description":"Error full description."}` |
| 415    |  Unsupported Media Type.  | `{"type":"string","description":"Error full description."}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"type":"string","description":"Error full description."}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"type":"string","description":"Error full description."}` |
| 504    |     Gateway Timeout.      | `{"type":"string","description":"Error full description."}` |

### Gets a specific promotion

<aside class="request"><span class="method get">GET</span><span class="endpoint">/promotions/{promotion_id}</span></aside>

***`REQUEST`***

|     Name     | Location    |  Kind   |               Description             | Mandatory   |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID provided for the application. |     Yes     |
| promotion_id |    path     | integer |            promotion ID                 |     Yes     |

***`RESPONSE`***

| Code   |         Description       |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 200    |            OK.            | `{"allOf":[{"type":"object","properties":{"commercialEstablishment":{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } }}}},{ "type": "object", "properties": { "id": { "type": "integer", "description": "Campaign identifier in the PROMO database." }, "active": { "type": "boolean", "description": "Field that identifies whether the campaign is active." }, "endDate": { "type": "string", "format": "date", "description": "End date (ISO 8601)." }, "startDate": { "type": "string", "format": "date", "description": "Start date (ISO 8601)." }, "title": { "type": "string", "description": "Promotional Campaign Title." }, "description": { "type": "string", "description": "Promotional Campaign Description." }, "transactionDays": { "type": "string", "description": "Transaction Days." }, "campaignModel": { "type": "string", "description": "Campaign model." }, "premium": { "type": "string", "description": "Campaign Prize." }, "campaignType": { "type": "string", "description": "Tipo da Campanha. Ex: A – RFM Amount; B – Event Birthday; E – Event Day; F – RFM Frequency; G – Generic; P – RFM Punch; R – Event Recurring Hour/Day; X – RFM Recency; W – Event Welcome;", "enum": [ "A", "B", "E", "F", "G", "P", "R", "X", "W" ] }, "validityRedemption": { "type": "string", "format": "date", "description": "Validity of the redemption." }, "shareable": { "type": "boolean", "description": "Field that identifies whether the campaign can be shared." }}]}` |
| 400    |       Bad Request.        | `{"type":"string","description":"Error full description."}` |
| 401    |       Unauthorized.       | `{"type":"string","description":"Error full description."}` |
| 403    |        Forbidden.         | `{"type":"string","description":"Error full description."}` |
| 404    |        Not Found.         | `{"type":"string","description":"Error full description."}` |
| 405    |    Method Not Allowed.    | `{"type":"string","description":"Error full description."}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"type":"string","description":"Error full description."}` |
| 415    |  Unsupported Media Type.  | `{"type":"string","description":"Error full description."}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"type":"string","description":"Error full description."}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"type":"string","description":"Error full description."}` |
| 504    |     Gateway Timeout.      | `{"type":"string","description":"Error full description."}` |
