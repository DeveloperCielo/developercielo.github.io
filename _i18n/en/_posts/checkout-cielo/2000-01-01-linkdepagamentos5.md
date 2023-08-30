---
layout: manual
title: Link de Pagamento API
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

# Link de Pagamento Cielo

# About this documentation

This manual will guide the developer in the integration with Link de Pagamento Cielo API. By integrating the Link de Pagamento API, you will be able to:

* Set up your store and customize your payment links;
* Create and edit payment links via API;
* Receive payment notifications;
* Consult payments.

> You can also use Link de Pagamento through the [Cielo website](https://www.cielo.com.br/){:target="_blank"} or through the [Cielo Gestão](https://play.google.com/store/apps/details?id=br.com.mobicare.cielo&hl=pt_BR&gl=US){:target="_blank"} app.

# About Link de Pagamento Cielo

**Link de Pagamento** allows you to send a **payment link for an order** to your customers via social media or any other channel you prefer. When opening the payment link, the shopper will see a page customized with your store logo and payment options.

You can sell different types of products:

* **Physical Material**: Any physical product that needs delivery via shipping, such as clothing, electronics, cosmetics, furniture, etc;
* **Digital**: any digital product that does not need to be shipped, such as online media or games, software, etc.;
* **Service**: any service that does not require shipping, such as maintenance and delivery services or dental appointments, among others;
* **Payment**: single payments;
* **Recurrence**: sales that are repeated within a certain period, such as gym membership or language classes.

## How to create a Link de Pagamento?

You can create a Link de Pagamento through the Cielo website, the Cielo Gestão app or through the Link de Pagamento API. In this manual, we will talk about the integration of the Link de Pagamento API.

## Who can use Link de Pagamento?

Any store that wants to sell online can create a payment link and share this link through social media. You don't need to have an e-commerce to use Link de Pagamento.

# Link de Pagamento API

**Link de Pagamento API** is a REST API that allows **creating, editing and querying payment links**. The main advantage of the API is that it allows stores to create payment links (via buttons or QR Codes) through their own systems and share the Link de Pagamento with their customers, without the need to access the Cielo website.

The following image represents the general flow of how the Link de Pagamento API works:

![Imagem Fluxo Geral Super Link Ingles]({{ site.baseurl_root }}/images/checkout/superlink/link-fluxo-en.png)

1. The merchant sends a payment link creation request to the Link de Pagamento API;
2. Link de Pagamento API returns a payment link URL and a link ID;
3. The merchant shares the payment link with the shopper;
4. The shopper makes the payment;
5. Cielo (as the acquirer) authorizes the payment and sends confirmation to Link de Pagamento;
6. The Link de Pagamento API sends a transaction completion notification or status change notification to the store. If desired, the merchant can develop a process for sending a confirmation email to the shopper (not available through the Link de Pagamento API).

## Payment methods and brands

With Link de Pagamento you can sell your products and services using the main payment methods, such as credit and debit cards or digital wallets

| PAYMENT METHOD | BRANDS AND PROVIDERS|
|---|---|
|Credit card (in cash or in installments)| Visa, Mastercard, Elo, Diners, Hipercard, JCB, American Express, Aura and Discover|
|Debit card | Visa, Mastercard and Elo|
|Digital wallets | QR Code Pay (credit and debit)|
|Pix | Cielo|

# Quick Start

To start your integration with the Link de Pagamento API, you will need:

1. Request the [establishment number (EC) for the Link de Pagamento](https://developercielo.github.io/en/manual/linkdepagamentos5#enabling-the-establishment-number-(ec)-for-the-super-link);
2. Configure the [store settings](https://developercielo.github.io/en/manual/linkdepagamentos5#setting-up-your-store) (customization of the page, choosing payment methods and a contract with the Post Office, if there is one);
3. Set up a [notification and status change URL](https://developercielo.github.io/en/manual/linkdepagamentos5#4.-configure-your-store%E2%80%99s-return,-notification,-and-status-change-urls) for your store;
4. Get the [API access credentials](https://developercielo.github.io/en/manual/linkdepagamentos5#obtaining-the-credentials) (`ClientId` and `Client Secret`);
5. Request an access token via API using the [credentials](https://developercielo.github.io/en/manual/linkdepagamentos5#obtaining-the-access-token);
6. With the token, [create a payment link](https://developercielo.github.io/en/manual/linkdepagamentos5#creating-a-link);
7. When there is a payment attempt on the link, you will receive a [notification](https://developercielo.github.io/en/manual/linkdepagamentos5#transaction-completion-notification)* with all data filled in at checkout;
8. If the transaction changes status, you will receive a [notification](https://developercielo.github.io/en/manual/linkdepagamentos5#status-change-notification)* of the status change;
9. To perform tests, use Link de Pagamento's [Test Mode](https://developercielo.github.io/en/manual/linkdepagamentos5#test-mode).

*_If you have configured the notification URL._

# Merchant Settings

Before setting up, you need to enable Link de Pagamento for your store.

## Enabling the establishment number (EC) for the Link de Pagamento

* **If you are not yet a Cielo client or if you only use the POS terminal**, go to the [Cielo website](https://www.cielo.com.br/){:target="_blank"} to enable the establishment number (EC) for the Link de Pagamento;
* **If you are already a Cielo E-commerce client**, contact your commercial manager or Cielo Support.

## Setting up your store

**Access the Store Settings on the Cielo website**

Go to the [Cielo website](https://minhaconta2.cielo.com.br/login/){:target="_blank"} and login. Go to **E-commerce** > **Link de Pagamento** > **Configurações** > **Configurações da loja**.

### 1. Customize the appearance of the payment page

Insert your store logo image and choose a background color. Click **Salvar**.

![Aparência da Página de Pagemento]({{ site.baseurl_root }}/images/checkout/superlink/superlink-aparencia-pagina-pagamento.png)

### 2. Set up sending the checkout confirmation email to the shopper

If you don't want your end customer to receive an order completion email after payment, disable this option. Then click on **Salvar**.

![E-mail de finalização para o comprador]({{ site.baseurl_root }}/images/checkout/superlink/superlink-email-finalizacao.png)

### 3. Define the desired payment methods

Select the payment methods you would like to make available to your customers. For credit card, also choose the maximum number of installments allowed. Then click **Salvar**.

![Meios de Pagamento Ativos]({{ site.baseurl_root }}/images/checkout/superlink/superlink-meios-de-pagamento.png)

<aside class="notice">These settings apply to all links created in your store.</aside>

> **Warning**<br>
> * To use boleto, request authorization to the E-commerce Support;
> * The number of installments chosen by payment methods must be the same as that shown in your Cielo registration. Consult the E-commerce Support if you have any questions.

>**Enabling Pix on the Cielo portal**<br>
> To use **Pix**, your **registration must be enabled with the Pix payment method**. To confirm the qualification, access the [Cielo portal](https://www.cielo.com.br/){:target="_blank"} and click on **Meu Cadastro** > **Authorizações** > **Pix**.<br>
> If Pix is not enabled in your registration, the adding screen will be displayed if your establishment (EC) is eligible; after completing the Pix adding process, it will be possible to use Pix at Checkout Cielo.<br>
> ![Adesão ao Pix]({{ site.baseurl_root }}/images/apicieloecommerce/adesao-pix.png)

For more details see the [Link de Pagamento and Checkout Cielo tutorial](https://developercielo.github.io/tutorial/checkout-tutoriais){:target="_blank"}.

### 4. Configure your store's return, notification, and status change URLs

You will be asked to fill in the return, notification, and status change URLs. URLs must be created and defined by the merchant. Then click on **Salvar**.

![URLs de Notificação]({{ site.baseurl_root }}/images/checkout/superlink/superlink-urls-notificacao.png)

* **Return URL**: after completing the payment, the shopper can be redirected to a web page defined by the store. No data is exchanged or sent to this URL and its configuration is optional;
* **[Notification URL](https://developercielo.github.io/en/manual/linkdepagamentos5#transaction-completion-notification)**: is the URL through which you will receive the notification with all the cart data when the transaction is completed;
* **[Status Change URL](https://developercielo.github.io/en/manual/linkdepagamentos5#status-change-notification)**: is the URL through which you will receive notification when an order has its status changed. The status change notification does not contain cart data, only order identification data.

### 5. Configure Capture and Antifraude

When accessing your store's settings, look for the Antifraude and automatic capture section. Select the desired option:

* *Nunca fazer a Captura Automática* (Never do the Automatic Capture);
* *Sempre fazer Captura Automática* (Always do Automatic Capture);
* *Somente fazer captura Automática das transações de Baixo Risco no Antifraude.* (Only automatically capture Low Risk transactions in Antifraude)

![Configuração de captura e Antifraude]({{ site.baseurl_root }}/images/checkout/superlink/superlink-captura-e-antifraude.png)

### 6. Configure Correios shipping options

If your store works with the delivery of **physical products** (those that need shipping), enter your Correios login and password and select the desired services, such as the types of Sedex and PAC.

If your store works with digital materials, services or payments, that is, sales that do not require shipping, skip this step.

![Configuração do Frete Correios]({{ site.baseurl_root }}/images/checkout/superlink/superlink-configuracao-frete-correios.png)

### Default settings

If you don't fill in the Store Settings, Link de Pagamento will default to the following:

* The option of sending e-mail to the shopper will be turned on;
* The option to accept international cards will be on;
* The minimum installment amount will be R$5.00;
* Credit and debit payment methods will have 12 installments enabled (if your Cielo registration allows it);
* The QR Code Credit payment method will have an installment enabled;
* The ticket will not have a defined minimum value or discount (zeroed);
* The **Always do Automatic Capture** option will only be enabled for transactions that are not considered high risk;
* Correios shipping login will be disabled.

# Test Mode

## Sandbox

As it is a non-financial request, the Link de Pagamento API does not have a Sandbox to test the creation of links. Links must be created from the production environment. Accreditation can be done through the cielo website or through the ecommerce center.

**Suporte Cielo E-commerce**

cieloecommerce@cielo.com.br

+55 11 4002-5472

0800 570 8472

Financial tests can be performed by activating the test mode in your store settings.

## Enabling Test Mode

Test mode can be activated in the Settings tab by enabling the Test Mode checkbox. Test mode will only start when the selection is saved.

![Modo Teste Ativo selecionado]({{ site.baseurl_root }}/images/checkout/superlink/superlink-modotesteativo.png)

When the option is saved, a red stripe will appear at the top of the screen. It will be displayed on all Link de Pagamento screens.

This stripe indicates that your store is now operating in a test environment, that is, all transactions carried out in this mode will be considered as a test.

![Modo Teste Ativo Tarja Vermelha]({{ site.baseurl_root }}/images/checkout/superlink/superlink-modoteste-tarjavermelha.png)

## Test Transactions

All transactions carried out in test mode will be displayed as normal transactions on the Cielo Checkout Orders tab, however, they will be marked as test transactions and will not be counted together with transactions carried out outside the test environment.

![Lista de Transações no Modo Teste]({{ site.baseurl_root }}/images/checkout/superlink/superlink-transacoes-modoteste.png)

These transactions will have the test symbol differentiating them from your other transactions. They can be captured or canceled using the same procedures as for real transactions.

> **WARNING**: When opening your store for sales to your customers, make sure Test Mode is disabled.<br>
> Transactions carried out in Test Mode can be finalized normally, but will not be deducted from the customer's card and cannot be “transferred” to the standard sales environment.

## How to make a transaction on test mode

After activating test mode, transactions are carried out normally. The creation of the link can be done using the same parameters as in the production environment, however, the payment methods to be used will be simulated methods.

To carry out test transactions with different payment methods, follow these rules:

### Credit or debit card transactions

To test credit or debit cards, it is necessary to use a card that follows the Luhn algorithm and has the final number corresponding to the desired authorization status of the card (see details in the table below).

**Credit or debit card authorization status**

|DESIRED STATUS OF THE TRANSACTION | CARDS FOR CARRYING OUT THE TESTS|
|---|---|
|Authorized |Cards ending from 0 to 4.<br>E.g.:<br>XXXXXXXXXXXXXXX0<br>XXXXXXXXXXXXXXX1<br>XXXXXXXXXXXXXXX2<br>XXXXXXXXXXXXXXX3<br>XXXXXXXXXXXXXXX4|
|Not Authorized | Cards ending from 5 to 9.<br>E.g.:<br>XXXXXXXXXXXXXXX5<br>XXXXXXXXXXXXXXX6<br>XXXXXXXXXXXXXXX7<br>XXXXXXXXXXXXXXX8<br>XXXXXXXXXXXXXXX9|

**Example**: 5404434242930100 = **Authorized**

### Boleto

Simply carry out the purchase process normally without any changes to the procedure. The boleto generated in test mode will always be a simulated boleto.

# Endpoints

The endpoints for integration with Link de Pagamento are presented in the following table:

|API| URL | DESCRIPTION|
|---|---|---|
|Cielo OAUTH2 Server | https://cieloecommerce.cielo.com.br/api/public/v2/token | Authentication|
|Link de Pagamento API | https://cieloecommerce.cielo.com.br/api/public/v1/products/| Creation, consultation and deletion of payment links.|
|Transactional Control API | https://cieloecommerce.cielo.com.br/api/public/v2/orders/ | Transaction querying.|

> Important: The Link de Pagamento API does not have a sandbox, but you can create test links by activating Test Mode on the Cielo website.

Transactions created with Test Mode enabled can be queried by the Transactional Control API.

# Cielo OAUTH Authentication

Cielo OAUTH is an authentication process for Cielo APIs related to e-commerce. Cielo OAUTH uses the **[OAUTH2](https://oauth.net/2/){:target="_blank"}** protocol as security, in which it is first necessary to obtain an access token using your credentials and then send it to the Link de Pagamento API.

To use Cielo OAUTH the following credentials are required:

| PROPERTY       | DESCRIPTION                                                        | TYPE   |
| -------------- | ------------------------------------------------------------------ | ------ |
| `ClientId`     | Key identifier provided by CIELO                                   | guid   |
| `ClientSecret` | Key that validates the ClientID. Provided by Cielo with `ClientID` | string |

> To generate the `Client ID` and `Client Secret`, see Obtaining the Credentials topic below.

## Obtaining the credentials

To obtain the `ClientId` and `ClientSecret` credentials for authentication in the Link de Pagamento API, follow the steps below:

1. After receiving the establishment number (EC) with Link de Pagamento enabled, access the [Cielo website](https://minhaconta2.cielo.com.br/login/){:target="_blank"} and log in;
2. Go to the **Ecommerce** tab > **Link de Pagamento** > **Configurações** > **Dados Cadastrais**;
3. In the **Contato técnico** section, fill in the contact details of the person responsible for receiving the keys to your store. *ATTENTION: only enter the data of the person who can actually have access to the keys to your store, which are confidential information for each establishment*;
4. Click on **Gerar Credenciais de Acessos às APIs**;
5. You will receive an email with the credentials

## Obtaining the access token

To gain access to Cielo services that use **Cielo Oauth**, you will need to obtain an access token, as per the steps below:

1. Concatenate the `Client Id` and `Client Secret`, `**ClientId:ClientSecret**`
2. Encode the result in **Base64**
3. Send the token creation request, using the HTTP POST method.

**Concatenation Example**

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

The response will contain the `access_token`, which should be used in Link de Pagamento API requests.

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
| `Token_type`   | Will always be `bearer` type                        | text  |
| `Expires_in`   | Token lifetime in seconds. Approximately 20 minutes | int    |

> The token returned (`access_token`) must be used in every request to the Link de Pagamento API as an authorization key. The `access_token` has a validity of 20 minutes (1200 seconds) and it is necessary to generate a new token every time the validity expires.

# Payment Link

## Creating a Link

To create a payment link, send a POST with product or service data.

### Request

<aside class="request"><span class="method post">POST</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/</span></aside>

Header: `Authorization:` `Bearer {access_token}`

```json
{
  "type": "Digital",
  "name": "Pedido",
  "description": "teste description",
  "price": "1000000",
  "weight": 2000000,
  "expirationDate": "2027-06-19",
  "maxNumberOfInstallments": "1",
  "quantity": 2,
  "sku": "teste",
  "shipping": {
    "type": "WithoutShipping",
    "name": "teste",
    "price": "1000000000"
  },
  "recurrent": {
    "interval": "Monthly",
    "endDate": "2024-02-06"
  },
  "softDescriptor": "Pedido1234"
}
```

**Product data**

|PROPERTY | DESCRIPTION | TYPE | SIZE | REQUIRED|
|---|---|---|---|---|
|`type`|Type of sale to be carried out through the payment link:<br>Asset – Physical Material<br>Digital – Digital Product<br>Service – Service<br>Payment – Simple Payments<br>Recurrent – Recurrent Payment|String|255|Yes|
|`name`|Product name|String|128|Yes|
|`description`|Product description that will be displayed on the payment screen if the show_description option is true. It is allowed to use the pipe character `|` if you want to break the line when presenting the description on the payment screen.|String|512|No|
|`showDescription`|Flag indicating whether or not the description should be displayed on the payment screen.|String|–|No|
|`price`|Product value in cents.|Int|1000000|Yes|
|`expirationDate`|Link expiration date. If a date is informed, the link becomes unavailable on the informed date. If no date is informed, the link does not expire.|String (YYYY-MM-DD)|10|No|
|`weight`|Product weight in grams.|String|2000000|No|
|`softDescriptor`|Description to be presented on the cardholder's credit card statement.|String|13|No|
|`maxNumberOfInstallments`|Maximum number of installments that the shopper can select on the payment screen. If not informed, the store settings will be used. Attention: do not send this field if the product type (`type`) is equal to “Recurrent”.|int|up to 2 characters (1 to 12 installments)|No|
|`quantity`|Number of transactions remaining until the link stops working.|int|2|No|
|`sku`|Product identification code.|String|32|No|

> Inside `description` you can use the pipe character `|` if you need to break the line when presenting the description on the payment link screen.

**Shipping data**

The data that must be filled in regarding shipping are in the `shipping` node.

|PROPERTY|DESCRIPTION|TYPE|SIZE|REQUIRED|
|---|---|---|---|---|
|`shipping.name`|Shipping name. Mandatory for shipping type “FixedAmount”.|string|128|Yes|
|`shipping.price`|The shipping price. Mandatory for shipping type “FixedAmount”.|int|100000|Yes|
|`shipping.originZipCode`|ZIP code of origin of the order. Mandatory for “Correios” shipping. It must only contain numbers.|string|8|No|
|`shipping.type`|Shipping type. Correios – Delivery by courier.<br>FixedAmount – Fixed Amount<br>Free - Free<br>WithoutShippingPickUp – No delivery with pick up at the store<br>WithoutShipping – No delivery<br>If the type of product chosen is “Asset” , the allowed types of shipping are: “Correios, FixedAmount or Free”.<br>If the chosen product type is “Digital” or “Service”, the allowed types of shipping are: “WithoutShipping, WithoutShippingPickUp”.<br>If the type of product chosen is “Recurrent” the type of shipping allowed is: “WithoutShipping”.|string|255|Yes|

**Recurrence data**

The `recurrent` node contains payment recurrence information. It can be informed if the product type (`type`) is “Recurrent”.

|PROPERTY|DESCRIPTION|TYPE|SIZE|REQUIRED|
|---|---|---|---|---|
|`recurrent.interval`|Recurrence billing interval.<br>“Monthly”<br>“Bimonthly”<br>“Quarterly”<br>“SemiAnnual”<br>“Annual”|string|128|No*<br>If not sent, the monthly interval will be considered.|
|`recurrrent.endDate`|Recurrence end date. If not sent, the recurrence ends only if cancelled.|YYYY-MM-DD format.|string|10|No|

### Response

The response will return the payment link in the `shortUrl` field and the `id` of the link, which can be used to query, update or delete the link.

`“HTTP Status”: 201 – Created`

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
  "recurrent": {
    "interval": "Monthly",
    "endDate": "2024-02-06"
  },
  "softDescriptor": "Nome da Loja",
  "expirationDate": "2024-06-30T00:00:00",
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

The data returned in the response includes all data sent in the request and additional data regarding the creation of the link.

|PROPERTY|TYPE|DESCRIPTION|
|---|---|---|
|`id`|guid|Unique identifier of the payment link. It can be used to query, update or delete the link.|
|`shortUrl`|string|Represents the payment link that, when opened in a browser, will display the Cielo Checkout screen.|
|`links`|object|It presents the available and possible operations (RESTful hypermedia) to be performed after creating or updating the link.|

## Querying a Link

To consult an existing link, just perform a GET informing the `id` of the link.

> **Important**: The query response contains the link itself (`shortUrl`) and the same data returned when creating the link.<br>
> **The link is not the transaction yet**. A transaction will only be initiated when the shopper attempts payment and may or may not be authorized.<br>
> To query a transaction, see the section [Transaction Query](https://developercielo.github.io/en/manual/linkdepagamentos5#transaction-query).

### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside> 

Header: `Authorization`: `Bearer {access_token}`

### Response

`HTTP Status: 200 – OK`

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
  "expirationDate": "2024-06-30",
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

|PROPERTY|TYPE|DESCRIPTION|
|---|---|---|
|`id`|guid|Unique identifier of the payment link. It can be used to consult, update or delete the link.|
|`shortUrl`|string|Represents the payment link that, when opened in a browser, will display the Cielo Checkout screen.|
|`links`|object|It presents the available and possible operations (RESTful hypermedia) to be performed after creating or updating the link.|

## Updating a Link

To update an existing link, just make a `PUT` request, informing the `id` of the link.

> You can update a link to change the payment method, insert a new item in the order, change the order description or change the type of recurrence, for example.

### Request

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

Header: `Authorization`: `Bearer {access_token}`

```json
{
  "Type": "Asset",
  "name": "Pedido ABC",
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "price": 9000,
  "expirationDate": "2024-06-30",
  "weight": 4700,
  "sku": "abc123456",  
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

`HTTP Status: 200 – OK`

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "showDescription": false,
  "sku": "abc123456",
  "price": 9000,
  "weight": 4700,
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2024-06-30",
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

|PROPERTY|TYPE|DESCRIPTION|
|---|---|---|
|`id`|guid|Unique identifier of the payment link. It can be used to consult, update or delete the link.|
|`shortUrl`|string|Represents the payment link that, when opened in a browser, will display the Cielo Checkout screen.|
|`links`|object|It presents the available and possible operations (RESTful hypermedia) to be performed after creating or updating the link.|

> Attention: The query response contains the same data returned when creating the link.

## Deleting a Link

To delete an existing link just perform a DELETE informing the `Id` of the link.

### Request

<aside class="request"><span class="method delete">DELETE</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

Header: `Authorization`: `Bearer {access_token}`

### Response

`HTTP Status: 204 – No Content`

# Transaction notifications

The transactional notification process takes place in two steps, which are transaction completion notification and status change notification.

|STEP|TYPE OF URL*|DESCRIPTION|CONTENT|FORMAT|
|---|---|---|---|---|
|**Transaction completion notification**|`Notification URL`|It is sent after the shopper clicks Finalize, generating the transaction. This notification is sent only when the transaction is completed, regardless of whether there has been a change in status, that is, it does not mean that the transaction has been paid.|Contains all sale data.|POST or JSON|
|**Status change notification**|`Change Status URL`|It is sent when the transaction status changes.<br>The status can be changed from “Pendente (Pending)” to “Pago (Paid)”, “Cancelada (Cancelled)” or “Não finalizada (Not Completed)”, among others. See the complete list of statuses in the [Payment_status] table.|Contains the order identification data (it does not have the cart data).|POST|

*Notifications are sent to the URLs defined by the establishment in [**Store Settings**] and contain data on transactions carried out through the Link de Pagamento.

It is worth noting that Link de Pagamento notifies only when a transaction is considered finalized, that is, the shopper has filled in all the details on the payment screen and clicked on **Finalize**.

**Example**: *The shopper accesses the payment link and chooses to pay via Pix. When you click Finalize, Link de Pagamento generates the Pix key and sends the transaction completion notification to the store, which will have the status “Pendente (Pending)”. When the shopper makes the payment via Pix, the transaction will have the status “Pago (Paid)” and Link de Pagamento will send the status change notification.*

## Notification features

Notification URLs are webhooks that can receive a notification via POST or via JSON:

|TYPE|DESCRIPTION|
|----|---|
|**POST**|Notification where the store is passive.|
|**JSON**|Notification where the store performs a query.|

**Format of notifications**

In notifications supported by the Link de Pagamento API, the format sent is *Form Data*, broken down by the `Content-Type` header 'x-www-form-urlencoded'.

**Expected return**

The store's server must return `HTTPStatus = 200 (OK)` to the Link de Pagamento API, indicating that the notification was successfully received and processed.

> **IMPORTANT**: If the registered URL returns an error or is unavailable, three new attempts will be made, with an interval of one hour between each POST.

If the notification is not received, it is possible to manually request a resend in **Detalhes do Pedido** (Order details), by clicking on the arrow icon.

## Transaction completion notification

It is the notification sent to the Notification URL and can be in POST or JSON format.

### Notification via POST

Contains all transaction data, including `merchant_order_number` and `checkout_cielo_order_number`, which can be used to [query a transaction](https://developercielo.github.io/en/manual/linkdepagamentos5#transaction-query).

**Example:**

```json
order_number: "40e00eefbf094763a147af713fa07ece",
amount: "5000",
checkout_cielo_order_number: "b9ab1956738d45cc88edf51d7d03b13e",
created_date: "02/02/2023 17:01:35", 
customer_name: "nome do cliente", 
customer_phone: "2222222222", 
customer_identity: "12312312344", 
customer_email: "nome@email.com.br", 
shipping_type: "5", 
shipping_price: "0", 
payment_method_type: "6", 
payment_installments: "1", 
payment_status: "1", 
test_transaction: "False", 
product_id: "0f48e580-d0a2-4e3b-a748-6704927f1725", 
product_type: "3", 
product_description: "123", 
nsu: "00339922"
```

See the description of transaction details in the [Notification Content](https://developercielo.github.io/en/manual/linkdepagamentos5#notification-content) section.

### Notification via JSON

Notification via JSON is a safer and more flexible method to perform a query on Link de Pagamento Cielo. In this mode, the store receives the `MerchantId` and the `MerchantOrderNumber` and a URL to perform a query (GET) against the Link de Pagamento Cielo database and access transaction details.

**Notification content via JSON**

```json
MerchantId: "799g0de8-89c3-5d17-c670-6b29d7f00175", 
MerchantOrderNumber: "1db9226geg8b54e6b2972e9b745b89c7", 
Url: "https://cieloecommerce.cielo.com.br/api/public/v1/orders/799g0de8-89c3-5d17-c670-6b29d7f00175 /1db9226geg8b54e6b2972e9b745b89c7"
```

|PROPERTY|DESCRIPTION|TYPE|
|---|---|---|
|`URL`|URL with the necessary data to perform the transaction data search.|String|
|`MerchantId`|Store identifier in Link de Pagamento; appears on the Cielo website in the menu Configuração > Dados Cadastrais.|Alphanumeric (guid)|
|`MerchantOrderNumber`|Store order number; if not sent, Link de Pagamento will generate a number, which will be viewed by the Consumer.|Alphanumeric|

*The store's server must send the return `HTTP Status = 200 (OK)` to the Link de Pagamento API, indicating that the notification was received and processed successfully.*

**Example of a query to the URL returned via JSON**

**Response**

```json
{
    "order_number": "1db9226geg8b54e6b2972e9b745b89c7",
    "amount": 101,
    "discount_amount": 0,
    "checkout_cielo_order_number": "65930e7460bd4a849502ed14d7be6c03",
    "created_date": "10-03-2023 14:38:56",
    "customer_name": "Test Test",
    "customer_phone": "11987654321",
    "customer_identity": "445556667",
    "customer_email": "shopper@email.com.br",
    "shipping_type": 1,
    "shipping_name": "Motoboy",
    "shipping_price": 1,
    "shipping_address_zipcode": "06455-030",
    "shipping_address_district": "Alphaville",
    "shipping_address_city": "Barueri",
    "shipping_address_state": "SP",
    "shipping_address_line1": "Alameda Xingu",
    "shipping_address_line2": "Apto 25",
    "shipping_address_number": "512",
    "payment_method_type": 1,
    "payment_method_brand": 1,
    "payment_maskedcreditcard": "482852******6856",
    "payment_installments": 1,
    "payment_status": 3,
    "tid": "10558590697J62OH9BPB",
    "test_transaction": "False"
}
```

See the description of the sale details in the [Notification Content](https://developercielo.github.io/en/manual/linkdepagamentos5#notification-content) section.

### Notification Content

Both in the notification via POST or via JSON, the content of the returned data is the same. All returned fields are described below, as well as their definitions and sizes:

|PROPERTY|DESCRIPTION|TYPE|MAXIMUM SIZE|
|---|---|---|---|
|`checkout_cielo_order_number`|Unique identifier generated by Link de Pagamento.|Alphanumeric|32|
|`amount`|Unit price of the product, in cents (ex: R$ 1.00 = 100).|Number|10|
|`order_number`|Order number sent by the store.|Alphanumeric|32|
|`created_date`|Order creation date - dd-MM-yyyy HH:mm:ss|Alphanumeric|20|
|`customer_name`|Consumer name. If sent, this value is already filled in on the Link de Pagamento.|Alphanumeric|289|
|`customer_identity`|Consumer identification (CPF or CNPJ) If sent, this value is already filled in on the Link de Pagamento Cielo screen.|Alphanumeric|14|
|`customer_email`|Consumer email. If sent, this value is already filled in on the Link de Pagamento Cielo screen.|Alphanumeric|64|
|`customer_phone`|Consumer phone number. If sent, this value is already filled in on the Link de Pagamento Cielo screen.|Number|11|
|`discount_amount`|Discount amount provided (only sent if there is a discount).|Number|10|
|`shipping_type`|Shipping method.|Number|1|
|`shipping_name`|Shipping name.|Alphanumeric|128|
|`shipping_price`|Value of the shipping service, in cents (ex: R$ 10.00 = 1000).|Number|10|
|`shipping_address_zipcode`|Delivery address zip code.|Number|8|
|`shipping_address_district`|Delivery address neighborhood.|Text|64|
|`shipping_address_city`|Delivery address city.|Alphanumeric|64|
|`shipping_address_state`|Delivery address state.|Alphanumeric|64|
|`shipping_address_line1`|Delivery address.|Alphanumeric|256|
|`shipping_address_line2`|Delivery address add-on.|Alphanumeric|14
|`shipping_address_number`|Delivery address number|Number|8
|`payment_method_type`|Payment method type code.|Number|1
|`payment_method_brand`|Brand (only for transactions with a credit card payment method).|Number|1|
|`payment_method_bank`|Issuing bank (For Boleto and Automatic Debit transactions).|Number|1|
|`payment_maskedcreditcard`|Masked Card (Only for transactions with a credit card payment method).|Alphanumeric|20|
|`payment_installments`|Number of installments.|Number|1|
|`payment_antifrauderesult`|Status of credit card transactions in Antifraude|Number|1|
|`payment_boletonumber`|Generated boleto number.|String|1|
|`payment_boletoexpirationdate`|Expiration date for transactions carried out with boleto.|Number|10|
|`payment_status`|Transaction status.|Number|1|
|`tid`|TransactionId Cielo generated at the time of transaction authorization.|Alphanumeric|20|
|`test_transaction`|Indicates whether the transaction was generated with Test Mode enabled.|Boolean|32
|`product_id`|Payment Button/Link Identifier that generated the transaction.|Alphanumeric|32|
|`product_type`|Type of Button that generated the order (See ProductID table).|Alphanumeric|32|
|`product_sku`|Product identifier registration in the payment link.|Text|16|
|`product_max_number_of_installments`|Number of installments allowed by merchants for the payment link.|Number|2|
|`product_expiration_date`|Payment Button/Link Expiration Date.|Alphanumeric|12|
|`product_quantity`|Number of transactions remaining until the link stops working.|Alphanumeric|2|
|`product_description`|Payment link description registered by the merchant.|Text|256|
|`nsu`|NSU - Transaction unique sequential number.|Alphanumeric|6|
|`authorization_code`|Authorization code.|Alphanumeric|8|

#### Types of productID

|TYPE OF PAYMENT LINK|ENUN|
|---|---|
|Physical material|1|
|Digital|2|
|Service|3|
|Payment|4|
|Recurrence|5|

#### Payment_status

Link de Pagamento has its own status, different from the Cielo website or the Cielo E-commerce API. See the complete list below.

|VALUE|STATUS DA TRANSAÇÃO|TRANSACTION STATUS|PAYMENT METHOD|DESCRIPTION|
|---|---|---|---|---|
|1|Pendente|Pending|For all payment methods.|Indicates that the payment is still being processed; NOTE: Boleto - Indicates that the boleto status has not been changed by the merchant|
|2|Pago|Paid|For all payment methods.|Transaction was captured and money will be deposited into account.|
|3|Negado|Denied|Credit card only.|Transaction not authorized by the person responsible for the payment method.|
|4|Expirado|Expired|Credit cards and boleto.|Transaction is no longer valid for capture - 15 days after Authorization.|
|5|Cancelado|Voided|Credit cards only. |Transaction was canceled by the merchant|
|6|Não Finalizado|NotFinalized|For all payment methods.|Payment Waiting Status - May indicate error or processing failure. Contact Cielo Support.|
|7|Autorizado|Authorized|Credit card only.|Transaction authorized by the card issuer. It must be captured for the money to be deposited in an account.|
|8|Chargeback|Chargeback|Credit card only.|Transaction canceled by the shopper with the card issuer. Money will not be deposited into an account.|

> **Note**: For order inquiries, the `payment.status` field will be returned in text format, always in English (Transaction Status column).

#### Payment_antifrauderesult

Antifraude has the concept of Status and SubStatus, where the first represents the risk level that a transaction has of being a fraud, and the second, additional information about the transaction.

|VALUE|ANTIFRAUDE STATUS|SUBSTATUS|DESCRIPTION|
|---|---|---|---|
|1|Low Risk|Low Risk|Low risk of being a fraudulent transaction.|
|2|High Risk|High Risk|High risk of being a fraudulent transaction. Canceled automatically.|
|4|Not finalized|Not finalized|It was not possible to finalize the query.|
|N/A|N/A|Not applicable|Debit card transaction that was authenticated by 3DS 2.0, therefore not eligible for Antifraude review.|
|N/A|N/A|N/A|Unanalyzable payment method such as boleto, Pix, QR Code, and credit card transaction that was denied by the issuer.|
|N/A|N/A|Recurrence transaction|For recurrence cases, after the first paid transaction, the next transactions of a recurrence are not analyzed by the anti-fraud. Only the first transaction is analyzed.|

#### Payment_method_type

Link de Pagamento allows only one type of Boleto per establishment, so the notification does not return if the provider used was Bradesco or Banco do Brasil, as only one of them will be active in the affiliation.

|VALUE|DESCRIPTION|
|---|---|
|1|CreditCard|
|2|Boleto|
|4|DebitCard|
|5|QrCode|
|6|Pix|
|7|QrCodeDebit|

> **Note**: For queries the Type is returned in the `Payment.Type` field and is filled with the literal value (`Description`).

#### Payment_method_brand

It's the brand of the card.

|VALUE|DESCRIPTION|
|---|---|
|1|Visa|
|2|Master|
|3|AmericanExpress|
|4|Diners|
|5|Elo|
|6|Aura|
|7|JCB|
|8|Discover|
|9|HiperCard|

In queries, the card brand is returned in the `Payment.Brand` field and is filled with the literal value.

#### Payment_method_bank

|VALUE|DESCRIPTION|
|---|---|
|1|Banco do Brasil|
|2|Bradesco|

#### Shipping_type

|VALOR|DESCRIPTION|
|---|---|
|1|Correios|
|2|Fixed shipping|
|3|Free shipping|
|4|Pick up at hand/store|
|5|No shipping charge (digital services or products)|

## Status change notification

It is sent to the status change URL and contains the `checkout_cielo_order_number`, the new status and some transaction data.

To find out more details about the transaction, make a query using `checkout_cielo_order_number`.

The status change notification format is POST (form data).

```json
checkout_cielo_order_number: "b918afea483d4c6c8615d8a8e19803c1",
amount: "134",
order_number: "024f77ac98cb493b86d8c818eb6e79cd",
payment_status: "3",
test_transaction: "False",
brand: "Visa",
nsu: "000001",
authorization_code: "01234567"
```

|PARAMETER|DESCRIPTION|FIELD TYPE|MAXIMUM SIZE|
|---|---|---|---|
|`checkout_cielo_order_number`| Unique identifier generated by Link de Pagamento Cielo. | Alphanumeric | 32 |
|`amount`|Unit price of the product, in cents (eg: R$ 1.00 = 100)|Number|10|
|`order_number`|Order number sent by the store.|Alphanumeric|32|
|`payment_method_brand`|Brand - only for transactions with a credit card payment method. [Complete List](https://developercielo.github.io/en/manual/linkdepagamentos5#payment_method_brand)|Number|20|
|`payment_status`|Status of the transaction. [Complete List](https://developercielo.github.io/en/manual/linkdepagamentos5#status-and-codes)|Number|1|
|`test_transaction`|Indicates if the transaction was generated with Test Mode enabled.|Boolean|32|
|`nsu`|NSU - Transaction unique sequential number.|Alphanumeric|6|
|`authorization_code`|Authorization code.|Alphanumeric|8|

# Transaction Query

The query of transactions via API can be done up to 45 days after the sale has been made.

The control of orders originating from a payment link can be done through the **Transactional Control API**. Querying orders can be done in three different ways:

* By `order_number`;
* By `checkout_cielo_order_number`;
* By `id` of the payment link.

## By order_number

Querying transactions by `order_number` returns a list of transactions with the same number of orders; this occurs because the Link de Pagamento does not prevent the duplication of `order_number`s by the store. The response will return the `checkout_cielo_order_number`, which should be used when querying a specific transaction.

### Request

To query a transaction by `order_number`, do a `GET`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/merchantOrderNumber/{ordernumber}</span></aside>

### Response

``` json
[
    {
        "$id": "1",
        "checkoutOrderNumber": "a58995ce24fd4f1cb025701e95a51478",
        "createdDate": "2023-03-30T12:09:33.57",
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
        "createdDate": "2023-03-30T12:05:41.317",
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
|`$id`|Node id.|Number|-|Example: 1|
| `checkoutOrderNumber` | Order code generated by Link de Pagamento Cielo. | Text | 32 | Example: a58995ce24fd4f1cb025701e95a51478 |
|`createdDate`|Order creation date |Date|-|YYYY-MM-DDTHH:mm:SS.ss|
|`links.$id`|Node id.|Number|-|Example: 1|
|`links.method`|Method for consuming the operation.|Text|10|Examples: GET, POST or PUT.|
|`links.rel`|Relationship for consumption of the operation.|Text|10|Example: self|
|`links.href`|Endpoint for consumption of the operation.|Text|512|Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e|

## By Checkout_Cielo_Order_Number

### Request

To query a transaction via `Checkout Cielo Order_Number`, just do a `GET`.

Header: `Authorization`: `Bearer {access_token}`

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

### Response

``` json
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
            "street": "Alameda Xingu", 
            "number": "512", 
            "complement": "21 andar", 
            "district": "Alphaville", 
            "city": "Barueri", 
            "state": "SP" 
        } 
    }, 
    "payment": { 
        "status": "Paid", 
        "tid": "10127355487AK2C3EOTB",
        "nsu": "149111",
        "authorizationCode": "294551",
        "numberOfPayments": 1,
        "createdDate": "2023-03-02T14:29:43.767",
        "finishedDate": "2023-03-02T14:29:46.117",
        "cardMaskedNumber": "123456******2007",
        "brand": "Visa",
        "type": "creditCard",
        "errorcode": "00",
        "antifraud": { 
            "antifraudeResult": 1,
            "description": "Risco Baixo" 
        } 
    }, 
    "customer": { 
        "identity": "12345678911", 
        "fullName": "Nome do comprador", 
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

|PROPERTY|Type|Size|Description|Format|
|---|---|---|---|---|
|`merchantId`|GUID|36|Id of the Store at Link de Pagamento Cielo. | Example: c89fdfbb-dbe2-4e77-806a-6d75cd397dac |
|`orderNumber`|Text|32|Store order number.|Example: 123456|
|`softDescriptor`|Text|13|Name of the store displayed on the shopper's invoice. No special characters or spaces.|Example: `Store_ABC_1234`|
|`cart.discount.type`|Text|10|Type of discount applied.|Possible values: Amount or Percent|
|`cart.discount.value`|Number|18|Amount or percentage of discount applied.|Example: If `discount.type` is Amount, then 1000 = R$10.00. If `discount.type` is Percent, the value will be between 0 and 100.|
|`cart.items.name`|Text|128|Item name in cart.|Example: Order ABC|
|`cart.items.sku`|Text|32|Product identifier.|Will exist if given, eg abc123456789|
|`cart.items.weight`|Number|10|Product weight.|Will exist if given, eg 2|
|`cart.items.description`|Text|256|Description of the item in the cart.|Example: 50 pens - R$30.00|
|`cart.items.unitPrice`|Number|18|Unit price of the product in cents|Example: R$ 1.00 = 100|
|`cart.items.quantity`|Number|9|Quantity of the item in the cart.|Example: 1|
|`cart.items.type`|Text|255|Type of item in cart|`Asset`<br>`Digital`<br>`Service`<br>`Payment`|
|`shipping.type`|Number|36|Shipping method.|Example: 1|
|`shipping.services.name`|Text|128|Shipping method.|Example: Main House|
|`shipping.services.price`|Number|10|Value of the shipping service, in cents.|Example: R$ 10.00 = 1000|
|`shipping.services.deadline`|Numeric|10|Delivery time for order in days|Example: 10|
|`shipping.services.carrier`|Numeric|1|Delivery type code, follows the Shipping_Type table|Example: 1|
|`shipping.address.street`|Text|256|Delivery address.|Example: Rua João da Silva|
|`shipping.address.number`|Number|8|Shipping address number.|Example: 123|
|`shipping.address.complement`|Text|64|Shipping address complement.|Example: Home|
|`shipping.address.district`|Text|64|Delivery address district.|Example: Alphaville|
|`shipping.address.city`|Text|64|Shipping address city.|Example: São Paulo|
|`shipping.address.state`|Text|2|Shipping address state.|Example: SP|
|`Payment.status`|Text|10|Transaction status|Example: Paid [Complete List](https://developercielo.github.io/en/manual/linkdepagamentos5#payment_status)|
|`Payment.tid`|Text|32|Cielo TID generated at the time of transaction authorization.|Example: 10127355487AK2C3EOTB|
|`Payment.nsu`|Text|6|NSU Cielo generated at the time of transaction authorization.|Example: 123456|
|`Payment.authorizationCode`|Text|3|Authorization code.|Example: 456789|
|`Payment.numberOfPayments`|Number|6|Number of Installments.|Example: 123456|
|`Payment.createdDate`|Text|22|Transaction creation date.|Example: YYYY-MM-DDTHH:mm:SS.ss|
|`Payment.finishedDate`|Text|22|Transaction completion date.|Example: YYYY-MM-DDTHH:mm:SS.ss|
|`Payment.cardMaskedNumber`|Text|19|Masked card number.|Example: 123456******2007|
|`Payment.brand`|Text|10|Card's brand.|Example: Visa [Complete List](https://developercielo.github.io/en/manual/linkdepagamentos5#payment_method_brand)|
|`Payment.antifraud.antifraudeResult`|Number|1|Antifraude status|Example: 1|
|`Payment.antifraud.description`|Text|256|Description of the Antifraude status|Example: Merchant chose not to perform the anti-fraud analysis|
|`Payment.type`|Text|11|Type of payment method|Example: CreditCard [complete list](https://developercielo.github.io/en/manual/linkdepagamentos5#payment_method_type)|
|`Payment.errorcode`|Number|2|Return code|Example: 00, 51, 57, etc [complete list](https://developercielo.github.io/en/manual/linkdepagamentos5#abecs-return-codes)|
|`Customer.Identity`|Number|14|CPF or CNPJ of shopper.Example: 12345678909|
|`Customer.FullName`|Text|256|Shopper's full name.|Example: Fulano da Silva|
|`Customer.Email`|Text|64|Shopper's email.|Example: example@email.com.br|
|`Customer.Phone`|Number|11|Shopper's phone.|Example: 11123456789|

## By id of the Link de Pagamento

### Request

To query a transaction by `id`, just do a `GET`.

Header: `Authorization`: `Bearer {access_token}`

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}/payments</span></aside>

### Resposta

``` json
{
   "$id": "1",
   "productId": "9487e3a9-f204-4188-96c5-a5a3013b2517",
   "createdDate": "2023-02-11T10:35:04.947",
   "orders": [
       {
           "$id": "2",
           "orderNumber": "b74df3e3c1ac49ccb7ad89fde2d787f7",
           "createdDate": "2023-02-11T10:37:23.447",
           "payment": {
               "$id": "3",
               "price": 11500,
               "numberOfPayments": 6,
               "createdDate": "2023-02-11T10:37:23.447",
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`$id`|Node id.|Number|-|Example: 1|
|`productId`|Payment link id.|GUID|36|Example: 9487e3a9-f204-4188-96c5-a5a3013b2517|
|`createdDate`|Payment link creation date.|Date|-|YYYY-MM-DDTHH:mm:SS.ss|
|`orders.$id`|Node id.|Number|-|Example: 1|
|`orders.orderNumber`|Order ID generated by Link de Pagamento Cielo.|Text|32|Example: b74df3e3c1ac49ccb7ad89fde2d787f7|
|`orders.createdDate`|Order creation date.|Date|-|YYYY-MM-DDTHH:mm:SS.ss|
|`orders.payment.$id`|Node id.|Number|-|Example: 1|
|`orders.payment.price`|Amount of the order, without punctuation.|Number|-|Example: BRL 1.00 = 100|
|`orders.payment.numberOfPayments`|Number of installments.|-|Example: 3|
|`orders.payment.createdDate`|Transaction (payment) date.|Date|-|YYYY-MM-DDTHH:mm:SS.ss|
|`orders.payment.status`|Transaction Status.|Text|-|Example: Denied [Complete List](https://developercielo.github.io/en/manual/linkdepagamentos5#payment_status)|
|`links.$id`|Node id.|Number|-|Example: 1|
|`links.method`|Method for consuming the operation.|Text|10|Examples: GET, POST, PUT|
|`links.rel`|Relationship for consumption of the operation.|Text|10|Example: self|
|`links.href`|Endpoint for consumption of the operation.|Text|512|Example: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e|

To carry out queries via the Transactional Control API on Link de Pagamento Cielo, it is required that the merchant has configured one of the two notification models:

* Transaction Notification URL via **POST** or
* Transaction Notification URL via **JSON**.

It is required to have provided a transaction notification URL as the transaction query data will be sent in the notification content.

The `Checkout_Cielo_Order_Number` is only generated when the payment is completed on the transactional screen. It is only sent by the Notification URL and not by the Transactional screen creation Response.

# Status and Codes

**Link de Pagamento** has its own status, different from the Cielo website or the API Cielo E-commerce. See the full list below.

|VALUE|TRANSACTION STATUS|PAYMENT METHOD|DESCRIPTION|
|---|---|---|---|
|1|Pending|Boleto, Pix and QR Code|Indicates that the payment is still being processed or is pending an action from the shopper.<br>Example: a boleto transaction with *Pending* status indicates that the boleto has not had its status changed by the shopper.|
|2|Paid|All payment methods|The transaction has been captured and the money will be deposited into the account.|
|3|Denied|Credit and debit cards|Transaction not authorized by the person responsible for the payment method.|
|4|Expired|Credit and debit cards and boleto|**Credit and debit card:** the transaction is no longer valid for capture 15 days after authorization.<br>**Boleto:** the boleto expires after the expiration date set by the Cielo E-commerce Support team as requested by the establishment.|
|5|Canceled|Credit and debit cards|Transaction canceled by the store.|
|6|Not Finalized|All payment methods|Payment awaiting new Status. May indicate error or processing failure. Contact Cielo E-commerce Support.|
|7|Authorized|Credit and debit cards|Transaction authorized by the card issuer. It must be captured for the money to be deposited into the account (by default, the transaction can be captured up to 15 days after authorization).|

## Card Brands Retry Program

When a shopper tries to make a card purchase on e-commerce, the transaction may be denied due to several reasons. The **next attempts to complete the transaction** using the **same card** are called **retrying**.

**How retrying works**

The denied transactions were classified as **irreversible** (never retry) and **reversible** (retry allowed).

The card brands determine if they will charge a fee for retrying and how many retry attemps are allowed before applying charges. The merchants who do not follow the card brand rules will be penalized by charging fees for exceeded transactions.

> Please refer to [Card Brands Retry Program manual](https://developercielo.github.io/en/tutorial/programa-retentativa-bandeiras){:target="_blank"} to see each card brand rules.

# ABECS return codes

The Brazilian Association of Credit Card and Services Companies (ABECS) establishes as of July 15, 2020, the standardization of the return codes for denied sales authorizations for both the in store and and e-commerce payment solutions of the Brazilian market.

> Please refer to [ABECS Return Codes table](https://developercielo.github.io/en/tutorial/abecs-e-outros-codigos){:target="_blank"} to get the complete list of return codes.

## Antifraude Status

|  Field  | Definition             |
| :-----: | ---------------------- |
| **0** | N \ A                  |
| **1** | Low risk               |
| **2** | High Risk              |
| **3** | Not finalized          |
| **4** | Moderate risk          |
| **5** | Authenticated          |
| **6** | Not hired              |
| **7** | Dismissed              |
| **8** | Not Applicable         |
| **9** | Recurrence Transaction |
