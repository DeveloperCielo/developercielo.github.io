---
layout: manual
title: Integration Manual eCommerce Cielo
description: The purpose of this documentation is to guide the developer on how to integrate with Cielo's API Cielo e-Commerce.
search: true
translated: true
categories: manual
sort_order: 2
tags:
  - API Payment
language_tabs:
  json: JSON
  shell: cURL
---

# API E-commerce Cielo

# Overview

The purpose of this documentation is to guide the developer on how to integrate with API E-commerce Cielo, describing the features, methods to be used, listing information to be sent and received, and providing examples.

We recommend intermediate knowledge in Web programming language, HTTP/HTTPS requests and JSON file manipulation are required to successfully deploy the E-commerce Cielo solution.

In this guide, you will find information on all operations available on API REST of API E-commerce Cielo. These operations must be performed using its specific key (Merchant ID and Merchant Key) in the respective environment endpoints

|              |                       SandBox                       |                  Production                   |
| :----------- | :-------------------------------------------------: | :-------------------------------------------: |
| **Requests** |   https://apisandbox.cieloecommerce.cielo.com.br    |   https://api.cieloecommerce.cielo.com.br/    |
| **Queries**  | https://apiquerysandbox.cieloecommerce.cielo.com.br | https://apiquery.cieloecommerce.cielo.com.br/ |

To perform an operation, combine the base URL of the environment with the URL of the desired operation and send it using the HTTP verb as described in the operation.

## Solution features

The API E-commerce Cielo solution of the E-commerce Cielo platform was developed with REST technology, which is market standard and also independent of the technology used by our customers. In this way, it is possible to integrate using the most varied programming languages.

> To get examples in these languages, see our conversion tutorial [**Postman Tutorial**](https://developercielo.github.io/en/tutorial/postman){:target="\_blank"}

Among other features, the attributes that stand out most in the Cielo e-commerce platform:

- **No proprietary apps**: it is not necessary to install applications in the virtual shop environment.
- **Simplicity**: the only protocol used is HTTPS.
- **Easy testing**: the Cielo platform offers a publicly accessible Sandbox environment, which allows the developer to create a test account without the need for accreditation, making it easier and faster to start integration.
- **Credentials**: the handling of the customers's credentials (affiliation number and access key) traffics in the header of the HTTP request of the message.
- **Safety**: the information exchange always takes place between the Store Server and Cielo Server, without the shopper's browser.
- **Multiplatform**: the integration is performed through Web Service REST.

## Architecture

The model employed for the integration is quite simple since there are two URLs (endpoints):

- Requests URL: for operations that cause side effects - such as authorization, capture and cancellation of transactions
- Queries URL: for operations that do not cause side effects, such as transaction searching.

To execute an operation:

1. Combine the base URL of the environment with the URL of the desired operation.
2. Send the request to the URL using the adequate HTTP method.

| Method   | Description                                                                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POST** | The `POST` HTTP method is used in the creation of features or in sending information that will be processed. For example, creation of a transaction. |
| **PUT**  | The`PUT` HTTP method is used to update an already existing feature. For example, capture or cancelation of a previously authorized transaction.      |
| **GET**  | The `GET` HTTP method is used for querying already existing features. For example, transaction query.                                                |

Every operation requires the access keys `MerchantId`and `MerchantKey` that should be sent in the header of the request. When you make a request you will get a code back, showing if it was successful or not.

## Glossary

In order to make it easier to understand, we have listed below a short glossary with the main terms related to e-commerce and also to card and acquiring market:

| Term                               | Description                                                                                                                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Authentication**                 | Process to ensure that the shopper is actually who they claim to be (lawful carrier), usually occurs at the issuing bank using a digital token or card with security keys.                                                                                                     |
| **Authorization**                  | Process to check whether a purchase can or not be made with a card. At this point, several verifications are done with the card and the carrier (e.g., timely payments, card locks, etc.). It is also at this point that the card limit is checked with the transaction value. |
| **Cancellation**                   | Process to cancel a purchase made with a card.                                                                                                                                                                                                                                 |
| **Capture**                        | Process that confirms an authorization that was previously made. It is only after the capture that the card carrier will be able to view it on their bank statement or invoice.                                                                                                |
| **Shopper**                        | It is the one who makes the purchase at the virtual store.                                                                                                                                                                                                                     |
| **Issuer (or issuing bank)**       | It is the financial institution that issues the credit card, debit card or voucher.                                                                                                                                                                                            |
| **Commercial establishment or CE** | Entity that responds by the virtual store.                                                                                                                                                                                                                                     |
| **Payment Gateway**                | Company responsible for technical integration and transaction processing.                                                                                                                                                                                                      |
| **Carrier**                        | It is the person who carries the card at the time of sale.                                                                                                                                                                                                                     |
| **TID (Transaction Identifier)**   | Code consisting of 20 characters that identifies a E-commerce Cielo transaction.                                                                                                                                                                                               |

## Products and Supported Brands

The current version of Cielo Webservice supports the following issuers and products:

| Issuer           | Demand credit | Installment credit Store | Debit | Voucher | International |
| ---------------- | ------------- | ------------------------ | ----- | ------- | ------------- |
| Visa             | Yes           | Yes                      | Yes   | _No_    | Yes           |
| Master Card      | Yes           | Yes                      | Yes   | _No_    | Yes           |
| American Express | Yes           | Yes                      | _No_  | _No_    | Yes           |
| Elo              | Yes           | Yes                      | _No_  | _No_    | Yes           |
| Diners Club      | Yes           | Yes                      | _No_  | _No_    | Yes           |
| Discover         | Yes           | _No_                     | _No_  | _No_    | Yes           |
| JCB              | Yes           | Yes                      | _No_  | _No_    | Yes           |
| Aura             | Yes           | Yes                      | _No_  | _No_    | Yes           |
| Hipercard        | Yes           | Yes                      | _No_  | _No_    | _No_          |

<aside class="warning">Cards that were issued abroad do not have permission to pay in installments.</aside>

## Cielo Support

If you have any questions, feel free to contact us through our e-mail: **cieloecommerce@cielo.com.br**

# Extended Validation Certificate

## What is the SSL Certificate?

The SSL Certificate for web servers confirms the authenticity and integrity of the website data, giving customers of virtual stores the guarantee that they are actually accessing the website they want, not a fraudulent website.

Specialized companies are responsible for validating the domain and, depending on the type of certificate, they are also responsible for the validation of the entity that owns the domain.

### Internet Explorer:

![EV Internet Explorer Certificate]({{ site.baseurl }}/images/certificado-ie.jpg)

### Firefox

![EV Firefox Certificate]({{ site.baseurl }}/images/certificado-firefox.jpg)

### Google Chrome

![EV Google Chrome Certificate]({{ site.baseurl }}/images/certificado-chrome.jpg)

## What is EV SSL Certificate?

The EV Certificate ensures a higher level of security for virtual stores customers.

It is a more trustworthy certificate and when HTTPS is accessed the address bar will turn green, showing more reliability for users.

## How to install the Extended Validation Certificate on the Store server?

You just have to install the following files in the server Trustedstore. Cielo does not offer support to the installation of the Certificate. If you are unsure about how to install the EV Certificate, then you should contact your server vendor support.

- [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
- [Intermediate certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
- [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/cieloecommerce.cert-2021-2022.zip)

## Step-by-Step for Installation

### Installation on the Virtual Store Server

The step-by-step of the EV Certificate installation must contact your server vendor support.

<aside class="warning">Cielo does not offer support for the installation of the Certificate.</aside>

### Client Access to Virtual Store

Usually, the browser automatically updates the Certificate. If it does not and the client reaches out, the following steps must be informed:

**Step 1:**

Save these files below into a new folder, or into a folder that can be easily accessed, as it will be used later:

- [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
- [Intermediate certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
- [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

**Step 2:**

In “Internet Explorer”, click on “Tools” and go to “Internet Options”:

![Install IE]({{ site.baseurl }}/images/certificado-instalar-ie-1.jpg)

In “Firefox”, click on “Open Menu” and go to “Advanced” and “Options”:

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-1.jpg)

In Google Chrome, click on "Control Google Chrome” and go to “Settings” and “Show advanced settings..." “Change Proxy Settings and “Content” and Certificates:

![Install GC]({{ site.baseurl }}/images/certificado-instalar-gc-1.jpg)

**Step 3:**

In Internet Explorer, under “Certificates”, click on “Import.”

![Install IE]({{ site.baseurl }}/images/certificado-instalar-ie-2.jpg)

In Firefox, click on “View Certificates”, click on “Import”

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-2.jpg)

In Chrome, click on “Manage Certificates”, click on “Import”

![Install GC]({{ site.baseurl }}/images/certificado-instalar-gc-2.jpg)

**Step 4:**

In Internet Explorer and Chrome “Certificate Import Wizard”, click on “Next”.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-3.jpg)

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-4.jpg)

In Firefox “Servers Tab”, click on “Import”

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-3.jpg)

**Step 5:**

In Chrome and Internet Explorer “Certificate Import Wizard”, click on “Search”, look for the folder where the files are and select the file “cieloecommerce.cielo.com.br.crt, click on “Open” and then “Next”.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-5.jpg)

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-6.jpg)

**Step 6:**

Select the desired option: add the Certificate in a default folder or search for the folder of your choice.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-7.jpg)

**Step 7:**

Click on “Finish”.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-8.jpg)

**Step 8:**

Click on “Ok” to complete the import.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">In Firefox there is no Successfull Import message, it only completes the import.</aside>

The Certificate may be viewed in the default tab “Other People” or at the one chosen by the customer.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-10.jpg)

**Step 9:**

Repeat the same procedure for the 3 sent files.

# Sandbox and Tools

## About Sandbox

To facilitate testing during integration, Cielo offers a Sandbox environment that allows simuation of the API messages. The Sandbox environment is programmed to give you responses for every feature available on API E-commerce Cielo

| INFORMATION           | URL                                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test account register | `MerchantId` and `MerchantKey` obtained after creating your testing account on [**Sandbox Registration**](https://cadastrosandbox.cieloecommerce.cielo.com.br/){:target="\_blank"} |
| Requests URL          | https://apisandbox.cieloecommerce.cielo.com.br                                                                                                                                     |
| Queries URL           | https://apiquerysandbox.cieloecommerce.cielo.com.br                                                                                                                                |

**Perks of using Sandbox**

- No affiliation is required to use Sandbox Cielo.
- Just access the [**Sandbox Registration**](https://cadastrosandbox.cieloecommerce.cielo.com.br/){:target="\_blank"} create an account.

## Integration Tool

You can use **Postman** to test your integration. Postman is an API Client that makes it easier for developers to create, share, test, and document APIs. This is done by allowing users to create and save simple and complex HTTP requests, as well as read their responses.

We suggest developers to access our [**Tutorial**](https://developercielo.github.io/en/tutorial/postman){:target="\_blank"} about the tool to better understand all the advantages it offers.

### Collection

> **Importation link**: [https://www.postman.com/collections/7313fe78130211f5f009](https://www.postman.com/collections/7313fe78130211f5f009){:target="\_blank"}

| Environment | Endpoints                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Sandbox     | **Request**: https://apisandbox.cieloecommerce.cielo.com.br <br> **Query**: https://apiquerysandbox.cieloecommerce.cielo.com.br/ |
| Production  | **Request**: https://api.cieloecommerce.cielo.com.br/ <br> **Query**: https://apiquery.cieloecommerce.cielo.com.br/              |

### Environment

Download the [**Environment Production and Sandbox**](https://github.com/DeveloperCielo/developercielo.github.io/blob/docs/attachment/postman/apicielo2021.rar){:target="\_blank"} file and replace MerchantID and MerchantKeys by your store's information.

## Credit card - Sandbox

In Sandbox, it is necessary to use the `Provider` as **SIMULATED**

With this payment method it is possible to simulate the flows of:

- Authorization
- Capture
- Cancellation.
- Consultation

For best use of the Simulated Payment Methods, we are providing **test cards** in the table below.

To make better use of a simulated payment, you can create a fake card number using a generator online or choosing random numbers. For either option, the first 15 digits can be random, but the last one should correspond to the transaction status you want to test.

The information of **Security Code (CVV)** and validity may be random, keeping the format - CVV (3 digits) Validity (MM/YYYY).

<aside class="notice"><strong>Tokenization:</strong> Transactions in sandbox environment involving tokenization did not work based on test cards. Every card saved at the tokenization is treated as a real card, so it is not used in the simulation process.</aside>
<aside class="notice">To simulate a successful authorization of a Zeroauth request in Sandbox, you have to send the request using a card number starting with 5, disregarding the issuer. For example: **5XXX.XXXX.XXXX.XXX4**.</aside>
<aside class="notice">The <code>status</code> of the transactions are defined by the final digits of each card, as well as the <code>ReturnCode</code>.</aside>

| Final card digit                                                  | Transaction Status   | Return Code | Return Message                  |
| ----------------------------------------------------------------- | -------------------- | ----------- | ------------------------------- |
| XXXX.XXXX.XXXX.XXX0<br>XXXX.XXXX.XXXX.XXX1<br>XXXX.XXXX.XXXX.XXX4 | Authorized           | 4/6         | Peration performed successfully |
| XXXX.XXXX.XXXX.XXX2                                               | Not Authorized       | 05          | Not Authorized                  |
| XXXX.XXXX.XXXX.XXX3                                               | Not Authorized       | 57          | Expired Card                    |
| XXXX.XXXX.XXXX.XXX5                                               | Not Authorized       | 78          | Locked Card                     |
| XXXX.XXXX.XXXX.XXX6                                               | Not Authorized       | 99          | Time Out                        |
| XXXX.XXXX.XXXX.XXX7                                               | Not Authorized       | 77          | Canceled Card                   |
| XXXX.XXXX.XXXX.XXX8                                               | Not Authorized       | 70          | Problems with the Credit Card   |
| XXXX.XXXX.XXXX.XXX9                                               | Random Authorization | 4 a 99      | Operation Successful / Time Out |

The test card **4024.0071.5376.3191**, for example, would simulated a sueccesfull transaction.

<aside class="notice"><strong>Warning:</strong> The  environment evaluates the format and end of the card, if an actual card is sent, the result of the operation will be identical to that described in the test cards table.</aside>

<aside class="Warning"><strong>Warning:</strong> Sandbox return codes are not the same as the ones available in production. </aside>

**To check the return codes in Production,** check [API Codes](https://developercielo.github.io/en/manual/cielo-ecommerce#api-codes){:target="\_blank"}

## Debit card - Sandbox

With this payment method, it is possible to simulate the flows of:

- Authorization;
- Cancellation;
- Consultation.
  <br/>

The debit transaction needs to be authenticated:

- **Authentication via 3DS 2.0**: learn to simulation the authentication 3DS 2.0 in Sandbox in the [3DS documentation](https://developercielo.github.io/en/manual/3ds){:target="\_blank"}
- **Authentication URL**: it's being discontinued. In this type of authentication, the debit card transactional flow works by getting an Authentication URL from the transaction response. On the authentication screen, the chosen option defines the status of the transaction.
  <br/>

| Option             | Status       |
| ------------------ | ------------ |
| Authenticated      | Authorized   |
| Not Authenticated  | Denied       |
| Do not use the URL | Not Finished |

<aside class="notice"><strong>Online Transfer</strong> The same behavior of debit card in Sandbox is valid for debit card.</aside>

## Other payment methods - Sandbox

Other payment methods don't have simulated specific data or cards like the credit card. Below we specify any existing differences:

| Payment Method      | Orientations for Sandbox                                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boleto              | To send a boleto transaction in the Sandbox environmnet you should put the `Provider` as **Simulado**.<br>There is no bank validation. The bank slip behaves as a bank slip without registration.       |
| Alelo               | Use the same values from the request at the Production environment for [Alelo Cards](https://developercielo.github.io/en/manual/cielo-ecommerce#alelo-cards){:target="\_blank"}                         |
| QR Code             | Use the same values from the resquest at the Production environment for [QR Code](https://developercielo.github.io/en/manual/cielo-ecommerce#qr-code){:target="\_blank"} There is no bank conciliation. |
| Carnê               | Use the same values from the request at the Production environmnet for [Carnê Transaction](https://developercielo.github.io/en/manual/cielo-ecommerce#carn%C3%AA-transaction){:target="\_blank"}        |
| Electronic Transfer | The `Provider` useed should be **"Simulado"** <br><br> The redirecting URL for the bank environment will be a screen for you to choose the status of the authentication.                                |

## Renova Fácil – Sandbox

To simulate a transaction with return for a new card, updated by our service [Renova Fácil](https://developercielo.github.io/en/manual/cielo-ecommerce#renew-easy){:target="\_blank"}, follow the instructions below.

In the authorization request, besides the fields already mentioned for the used method of payment, you need the send the following:

- In the field `CreditCard.CardNumber`: send a card with 3 as the final digit, which simulates an expired card.
- In the field `CreditCard.ExpirationDate`: send an expiration date that has passed.
- Send the field `Payment.Recurrent` as true, to mark the transaction as recurring.

## Consulta BIN - Sandbox

A card's BIN code is the first six digits of the card number. At the Consulta BIN simulation in the Sandbox environment, each one of the six digits will determine a simulated result.

It is possible to test different card numbers and observe the expected return according to the different options.

A card's BIN code should return the card brand, the type of card, the nationality, if it is a corporate card, the return of the BIN analysis and the card issuer. To know more, read the [Consulta BIN](https://developercielo.github.io/en/manual/cielo-ecommerce#bin-checker){:target="\_blank"} section of this guide.

| Digit     | Meaning                  | Return                                                                                                                                                                                                                        |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1st digit | Brand.                   | If it's '**3**' it returns "**AMEX**"<br>If it's '**5**' it returns "**MASTERCARD**"<br>If it's '**6**' it returns "**DISCOVER**"<br>Every other number returns "**VISA**".                                                   |
| 2nd digit | Type of card             | If it's '**3**' it returns "**Débito**"<br>If it's '**5**' it returns "**Crédito**"<br>If it's '**7**' it returns "**Crédito**" and it returns the `Prepaid` field as "**true**"<br> Any other number returns "**Múltiplo**". |
| 3rd digit | Card nationality         | If it's '**1**' it returns "**true**" (national card)<br>Every other number other than '**1**' returns "**false**" (international card).                                                                                      |
| 4th digit | If it's a corporate card | If it's '**1**' it returns "**true**" (it is a corporate card)<br>Every other number other than '**1**' returns "**false**" (not a corporate card).                                                                           |
| 5th digit | Analysis return          | If it's '**2**' it returns "**01 - Bandeira não suportada**"<br>If it's '**3**' it returns "**02 - Voucher - Não suportado na consulta de bins**"<br>Every other number returns "**00 - Analise autorizada**"                 |
| 6th digit | Issuing bank             | If it's '**1**' it returns "**104**" and "**Caixa**"<br>If it's '**2**' it returns "**001**" and "**Banco do Brasil**"<br>Every other number returns "**237**" e "**Bradesco**"                                               |

**Example**

A card with the number **4110110012341234** will return the following data:

![Consulta BIN Sandbox]({{ site.baseurl_root }}/images/apicieloecommerce/consultabin-sdbx-cielo.png)

### Request

<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/cardBin/`BIN`</span></aside>

```shell
curl
--request GET https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/411011
--header "Content-Type: application/json"
--data-binary
--verbose
```

### Response

```json
{
  "Status": "00",
  "Provider": "VISA",
  "CardType": "Multiplo",
  "ForeignCard": false,
  "CorporateCard": false,
  "Issuer": "Banco do Brasil",
  "IssuerCode": "001"
}
```

```shell
curl
{
    "Status": "00",
    "Provider": "VISA",
    "CardType": "Multiplo",
    "ForeignCard": false,
    "CorporateCard": false,
    "Issuer": "Banco do Brasil",
    "IssuerCode": "001"
}
--verbose
```

# Payment Methods

## Credit and Debit Cards

### Credit Cards

To enjoy all the features available in our API, it is important that you first understand the concepts around processing a credit card transaction.

| Concept            | Description                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authorization**  | The authorization (or pre-authorization) is the main operation in the eCommerce, because through it, the sale can be finished. Pre-authorization only sensitizes the customer's limit, but still does not generate charge for the consumer.                       |
| **Capture**        | When making a pre-authorization, it is necessary to confirm it, so that the charge is effected to the card carrier. It is through this operation a pre-authorization is effected, and it can be executed normally within 5 days after the pre-authorization date. |
| **Cancellation**   | The cancellation is necessary when, for some reason, a sale will not be effected anymore.                                                                                                                                                                         |
| **Authentication** | The authentication process makes it possible to effective a sale, which will pass through the authentication process of the card issuing bank, then providing more security for the sale and transferring the risk of fraud to the bank.                          |

<aside class="warning">IMPORTANT: The order identification number (MerchantOrderId) does not change, remaining the same throughout the transactional flow. However, an additional number can be generated for the order and used during the transaction. This number will only be different in case of adaptation to the acquirer's rules or in case there are repeated order identification numbers (MerchantOrderId). For reconciliation purposes, use TransactionId.</aside>

#### Creating a credit transaction

To create a credit card transaction, you need to send a request using the `POST` method to the Payment feature, as shown. This example covers all the possible fields you can send; check which fields are required in the request property table.

> The transaction **capture** can be **authomatic** or **posterior**. For an authomatic capure, send the `Payment.Capture` field in the request as “true”. For a posterior capture, send the field as "false" and, later, do the [capture request](https://developercielo.github.io/en/manual/cielo-ecommerce#consult-capture-cancel){:target="\_blank"}.

<aside class="notice"><strong>Warning:</strong> It is not possible to carry out a transaction with its value as (`Amount`) 0.</aside>

<aside class="notice"><strong>Warning:</strong> In the request header, use Content-Type application/json .</aside>

##### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "Billing": {
      "Street": "Rua Neturno",
      "Number": "12345",
      "Complement": "Sala 123",
      "Neighborhood": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BR",
      "ZipCode": "20080123"
    }
  },
  "Payment": {
    "Currency": "BRL",
    "Country": "BRA",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": "false",
    "Recurrent": "false",
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "SaveCard": "false",
      "Brand": "Visa",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "Type": "CreditCard",
    "Amount": 15700,
    "AirlineData": {
      "TicketNumber": "AR988983"
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
   "MerchantOrderId":"2014111701",
   "Customer":{
      "Name":"Comprador crédito completo",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
   },
   "Payment":{
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "Recurrent":"false",
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true,
     "Type":"CreditCard",
     "Amount":15700,
     "AirlineData":{
         "TicketNumber":"AR988983"
     }
   }
}
--verbose
```

| Property                              | Type         | Size | Required           | Description                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | ------------ | ---- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`                          | Guid         | 36   | Yes                | Store identifier in Cielo.                                                                                                                                                                                                                                                                                 |
| `MerchantKey`                         | Text         | 40   | Yes                | Public Key for Double Authentication in Cielo.                                                                                                                                                                                                                                                             |
| `Content-Type`                        | Header       | 40   | Yes                | application/json (required).                                                                                                                                                                                                                                                                               |
| `RequestId`                           | Guid         | 36   | No                 | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                                                                                                                                                   |
| `MerchantOrderId`                     | Text         | 50   | Yes                | Order ID number.                                                                                                                                                                                                                                                                                           |
| `Customer.Name`                       | Text         | 255  | No                 | Customer's name                                                                                                                                                                                                                                                                                            |
| `Customer.Status`                     | Text         | 255  | No                 | The customer's registration status on the store. (NEW / EXISTING)                                                                                                                                                                                                                                          |
| `Customer.Identity`                   | Text         | 14   | No                 | Customer's RG, CPF or CNPJ.                                                                                                                                                                                                                                                                                |
| `Customer.IdentityType`               | Text         | 255  | No                 | Customer's type of identification (CPF/CNPJ).                                                                                                                                                                                                                                                              |
| `Customer.Email`                      | Text         | 255  | No                 | Customer's e-mail                                                                                                                                                                                                                                                                                          |
| `Customer.Birthdate`                  | Date         | 10   | No                 | Customer's birth date                                                                                                                                                                                                                                                                                      |
| `Customer.Address.Street`             | Text         | 255  | No                 | Customer's address.                                                                                                                                                                                                                                                                                        |
| `Customer.Address.Number`             | Text         | 15   | No                 | Customer's address number.                                                                                                                                                                                                                                                                                 |
| `Customer.Address.Complement`         | Text         | 50   | No                 | Customer's address complement.                                                                                                                                                                                                                                                                             |
| `Customer.Address.ZipCode`            | Text         | 9    | No                 | Customer's Zip Code                                                                                                                                                                                                                                                                                        |
| `Customer.Address.City`               | Text         | 50   | No                 | Customer's address' city.                                                                                                                                                                                                                                                                                  |
| `Customer.Address.State`              | Text         | 2    | No                 | Customer's address' state.                                                                                                                                                                                                                                                                                 |
| `Customer.Address.Country`            | Text         | 35   | No                 | Customer's address' country.                                                                                                                                                                                                                                                                               |
| `Customer.DeliveryAddress.Street`     | Text         | 255  | No                 | Customer's delivery address.                                                                                                                                                                                                                                                                               |
| `Customer.Address.Number`             | Text         | 15   | No                 | Customer's delivery address number.                                                                                                                                                                                                                                                                        |
| `Customer.DeliveryAddress.Complement` | Text         | 50   | No                 | Customer's delivery address complement.                                                                                                                                                                                                                                                                    |
| `Customer.DeliveryAddress.ZipCode`    | Text         | 9    | No                 | Customer's delivery address Zip Code.                                                                                                                                                                                                                                                                      |
| `Customer.DeliveryAddress.City`       | Text         | 50   | No                 | Customer's delivery address city.                                                                                                                                                                                                                                                                          |
| `Customer.DeliveryAddress.State`      | Text         | 2    | No                 | Customer's delivery address state.                                                                                                                                                                                                                                                                         |
| `Customer.DeliveryAddress.Country`    | Text         | 35   | No                 | Customer's delivery address country.                                                                                                                                                                                                                                                                       |
| `Customer.Billing.Street`             | string       | 24   | No                 | Customer's billing address.                                                                                                                                                                                                                                                                                |
| `Customer.Billing.Number`             | string       | 5    | No                 | Customer's billing address number.                                                                                                                                                                                                                                                                         |
| `Customer.Billing.Complement`         | string       | 14   | No                 | Customer's billing address complement.                                                                                                                                                                                                                                                                     |
| `Customer.Billing.Neighborhood`       | string       | 15   | No                 | Customer's billing address neighborhood.                                                                                                                                                                                                                                                                   |
| `Customer.Billing.City`               | string       | 20   | No                 | Customer's billing address city.                                                                                                                                                                                                                                                                           |
| `Customer.Billing.State`              | string       | 2    | No                 | Customer's billing address state.                                                                                                                                                                                                                                                                          |
| `Customer.Billing.Country`            | string       | 2    | No                 | Customer's billing address country. More information at [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui){:target="\_blank"}                                                                                                                                                                    |
| `Customer.Billing.ZipCode`            | string       | 9    | No                 | Customer's billing address Zip Code.                                                                                                                                                                                                                                                                       |
| `Payment.Type`                        | Text         | 100  | Yes                | Type of the Payment Method.                                                                                                                                                                                                                                                                                |
| `Payment.Amount`                      | Núumber      | 15   | Yes                | Order Amount (to be sent in cents).                                                                                                                                                                                                                                                                        |
| `Payment.Currency`                    | Text         | 3    | No                 | Currency in which the payment will be made (BRL).                                                                                                                                                                                                                                                          |
| `Payment.Country`                     | Text         | 3    | No                 | Country in which the payment will be made                                                                                                                                                                                                                                                                  |
| `Payment.Provider`                    | Text         | 15   | ---                | Defines the behavior for the payment method/NÃO OBRIGATÓRIO PARA CRÉDITO.                                                                                                                                                                                                                                  |
| `Payment.ServiceTaxAmount`            | Number       | 15   | No                 | Appliable only to airline companies. Order amounth that will be destined to service tax. PS.: This amount is not added to the authorization amount.                                                                                                                                                        |
| `Payment.SoftDescriptor`              | Text         | 13   | No                 | The store's name that will be on the shopper's bank invoice. Does not allow special characters.                                                                                                                                                                                                            |
| `Payment.Installments`                | Number       | 2    | Yes                | Number of installments.                                                                                                                                                                                                                                                                                    |
| `Payment.Interest`                    | Text         | 10   | No                 | Type of installments - Store (ByMerchant) or Card (ByIssuer).                                                                                                                                                                                                                                              |
| `Payment.Capture`                     | Boolean      | ---  | No (Default false) | Boolean that identifies if the authorization should be done by **Authomatic capture (true)** or **posterior capture (false)**.                                                                                                                                                                             |
| `Payment.Authenticate`                | Boolean      | ---  | No (Default false) | Defines if the shopper will be directed to the issuing bank for a card authetication.                                                                                                                                                                                                                      |
| `Payment.Recurrent`                   | Boolean      | -    | No                 | Indicates if the transaction is recurring ("true") or not ("false"). The value "true" won't originate a new recurrence, it will only allow a transaction without the need to send the security code. `Authenticate` should be "false" if `Recurrent` is "true".                                            |
| `Payment.IsCryptocurrencyNegotiation` | Boolean      | -    | No (default false) | Should be send as "true" if the transaction is to sell or buy criptocurrency.                                                                                                                                                                                                                              |
| `Payment.AirlineData.TicketNumber`    | Alphanumeric | 13   | No                 | Inform the number of the main airline ticket of the transaction.                                                                                                                                                                                                                                           |
| `CreditCard.CardNumber`               | Text         | 19   | Yes                | Shopper's card number.                                                                                                                                                                                                                                                                                     |
| `CreditCard.Holder`                   | Text         | 25   | No                 | Name of the shopper that's printed on the card. Does not accept special characters.                                                                                                                                                                                                                        |
| `CreditCard.ExpirationDate`           | Text         | 7    | Yes                | Expiration date printed on the card. Example: MM/AAAA.                                                                                                                                                                                                                                                     |
| `CreditCard.SecurityCode`             | Text         | 4    | No                 | Security code printed on the back of the card.                                                                                                                                                                                                                                                             |
| `CreditCard.SaveCard`                 | Boolean      | ---  | No (Default false) | Boolean that identifies if the card will be saved to generate a `CardToken`.                                                                                                                                                                                                                               |
| `CreditCard.Brand`                    | Text         | 10   | Yes                | Card brand. Possible values:Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.                                                                                                                                                                                               |
| `CreditCard.CardOnFile.Usage`         | Text         | -    | No                 | **First** if the card was stored and it's your first use.<br>**Used** if the card was stored and has been used for another transaction before.                                                                                                                                                             |
| `CreditCard.CardOnFile.Reason`        | Text         | -    | Conditional        | Indicates the motive for card storage, if the "Usage" field is "Used". <br> **Recurring** - Programmed recurring transaction (e.g. Subscriptions). <br> **Unscheduled** - Recurring transaction with no fixed date (e.g. service apps) <br>**Installments** - Installments through recurring transactions. |

##### Response

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "Billing": {
      "Street": "Rua Neturno",
      "Number": "12345",
      "Complement": "Sala 123",
      "Neighborhood": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BR",
      "ZipCode": "20080123"
    }
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "CreditCard": {
      "CardNumber": "455187******0183",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa",
      "PaymentAccountReference": "92745135160550440006111072222",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "TryAutomaticCancellation": true,
    "ProofOfSale": "674532",
    "Tid": "0305020554239",
    "AuthorizationCode": "123456",
    "SoftDescriptor": "123456789ABCD",
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 15700,
    "CapturedAmount": 15700,
    "Country": "BRA",
    "AirlineData": {
      "TicketNumber": "AR988983"
    },
    "ExtraDataCollection": [],
    "Status": 2,
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Payment.MerchantAdviceCode": "1",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
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
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito completo",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
        },
        "IsCryptoCurrencyNegotiation": true,
        "TryAutomaticCancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Payment.MerchantAdviceCode":"1",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
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

| Property                             | Description                                                                                                                                                                                                                                                                                                                                                                               | Type        | Size | Format                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---- | ------------------------------------ |
| `ProofOfSale`                        | Authorization number, identical to NSU.                                                                                                                                                                                                                                                                                                                                                   | Text        | 6    | Alphanumeric text                    |
| `Tid`                                | Transaction Id on the acquirer.                                                                                                                                                                                                                                                                                                                                                           | Text        | 20   | Alphanumeric text                    |
| `AuthorizationCode`                  | Authorization code.                                                                                                                                                                                                                                                                                                                                                                       | Text        | 6    | Alphanumeric text                    |
| `SoftDescriptor`                     | Text that will be printed on the carrier’s bank invoice. Does not allow special characters.                                                                                                                                                                                                                                                                                               | Text        | 13   | Alphanumeric text                    |
| `PaymentId`                          | Payment ID number, needed for future operations like Consulting, Capture and Cancellation.                                                                                                                                                                                                                                                                                                | Guid        | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                                | Eletronic Commerce Indicator. Indicates how safe a transaction is.                                                                                                                                                                                                                                                                                                                        | Text        | 2    | Examples: 7                          |
| `Status`                             | Transaction status.                                                                                                                                                                                                                                                                                                                                                                       | Byte        | ---  | 2                                    |
| `ReturnCode`                         | Acquiring return code.                                                                                                                                                                                                                                                                                                                                                                    | Text        | 32   | Alphanumeric text                    |
| `ReturnMessage`                      | Acquiring return message.                                                                                                                                                                                                                                                                                                                                                                 | Text        | 512  | Alphanumeric text                    |
| `Payment.MerchantAdviceCode`         | Card brand's return code that defines the period for transaction submission retry. _Valid only for Mastercard_.                                                                                                                                                                                                                                                                           | Text        | 2    | Number                               |
| `TryAutomaticCancellation`           | In case of error during authorization (status “Not Finished - 0”), the response will include the “tryautomaticcancellation” field as “true”. In this case, the transaction will be automatically queried, and if it has been authorized successfully, it will be canceled automatically. This feature must be enabled for establishment. To enable, please contact our technical support. | Boolean     | -    | true ou false                        |
| `CreditCard.PaymentAccountReference` | PAR (payment account reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the card brand doesn’t send the information the field will not be returned.                                                                                                            | Alphanumber | 29   | ---                                  |

### Debit cards

This payment method is automatically released along to the Cielo’s affiliation.

Every debit transaction should be authenticated by demand of the issuing banks and card brands, to ensure better safety.

To authenticate a debit transaction, we use the EMV 3DS 2.0 protocol; this protocol is a script integrated to your e-commerce that verifies the identity of the shopper while keeping a positive shopping experience and reducing the risk of fraud.

To integrate the authentication method, check the [3DS 2.0 documentation](https://developercielo.github.io/en/manual/3ds){:target="\_blank"}.

<aside class="warning">WARNING: Cielo doesn't offer the first version of the authentication protocol (3DS 1.0), since card brands and issuers are discontinuing this option.</aside>

> **Debit without authentication**: or “debit without password”, can only be done when the e-commerce has the issuing bank's authorization to dismiss the authentication. In case you have that permission, send the field `Authenticate` as "false" in the standard request for debit card.

#### Creating a debit transaction

To sell with a debit card, you should request using the POST method. The example below shows the minimum necessary fields that should be sent for the authorization.

> In the standard debit transaction (with authentication), send `Authenticate` = "true".

##### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014121201",
  "Customer": {
    "Name": "Comprador Cartão de débito"
  },
  "Payment": {
    "Type": "DebitCard",
    "Authenticate": true,
    "Amount": 15700,
    "DebitCard": {
      "CardNumber": "5551870000000181",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "Brand": "Master"
    },
    "ExternalAuthentication": {
      "Cavv": "AAABB2gHA1B5EFNjWQcDAAAAAAB=",
      "Xid": "Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
      "Eci": "5",
      "Version": "2",
      "ReferenceID": "a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
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
   "MerchantOrderId":"2014121201",
   "Customer":{
      "Name":"Comprador Cartão de débito"
   },
   "Payment":{
      "Type":"DebitCard",
      "Authenticate":true,
      "Amount":15700,
      "DebitCard":{
         "CardNumber":"5551870000000181",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Master"
      },
      "ExternalAuthentication":{
         "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
         "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
         "Eci":"5",
         "Version":"2",
         "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
      }
   }
}
--verbose
```

| Property                                     | Description                                                                                     | Type    | Size | Required           |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------- | ---- | ------------------ |
| `MerchantId`                                 | Store identifier in API Cielo eCommerce.                                                        | Guid    | 36   | Yes                |
| `MerchantKey`                                | Public Key for Double Authentication in API Cielo eCommerce.                                    | Text    | 40   | Yes                |
| `RequestId`                                  | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.        | Guid    | 36   | No                 |
| `MerchantOrderId`                            | Order Identifier Field at the Store.                                                            | Text    | 50   | Yes                |
| `Customer.Name`                              | Shopper’s name.                                                                                 | Text    | 255  | No                 |
| `Customer.Status`                            | Shopper registration status in store (NEW / EXISTING) - Used for fraud analysis                 | Text    | 255  | No                 |
| `Payment.Type`                               | Type of the Payment Method.                                                                     | Text    | 100  | Yes                |
| `Payment.Amount`                             | Order Amount (to be sent in cents).                                                             | Number  | 15   | Yes                |
| `Payment.Authenticate`                       | Defines if the shopper will be directed to the issuing bank for the authentication of the card. | Boolean | ---  | Yes                |
| `Payment.ReturnUrl`                          | URL to where the user will be redirected after payment.                                         | Text    | 1024 | Yes                |
| `Payment.IsCryptocurrencyNegotiation`        | Should be send as "true" if the transaction is to sell or buy criptocurrency.                   | Boolean | -    | No (default false) |
| `DebitCard.CardNumber`                       | Customer's card number.                                                                         | Text    | 19   | Yes                |
| `DebitCard.Holder`                           | Customer's name printed on the card.                                                            | Text    | 25   | No                 |
| `DebitCard.ExpirationDate`                   | Expiration date printed on the card.                                                            | Text    | 7    | Yes                |
| `DebitCard.SecurityCode`                     | Security code printed on the back of the card.                                                  | Text    | 4    | No                 |
| `DebitCard.Brand`                            | Card brand.                                                                                     | Text    | 10   | Yes                |
| `Payment.ExternalAuthentication.Eci`         | E-Commerce Indicator returned on the authentication process.                                    | Number  | 1    | Yes                |
| `Payment.ExternalAuthentication.ReferenceId` | `RequestID` returned on the authentication process.                                             | GUID    | 36   | Yes                |

##### Response

```json
{
  "MerchantOrderId": "2014121201",
  "Customer": {
    "Name": "Comprador Cartão de débito"
  },
  "Payment": {
    "DebitCard": {
      "CardNumber": "555187******0181",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Master",
      "PaymentAccountReference": "IC722LCXBROSHBPIBK7B44MBXO5HF"
    },
    "Provider": "Simulado",
    "AuthorizationCode": "635288",
    "Tid": "0826104754051",
    "ProofOfSale": "132471",
    "Authenticate": true,
    "ExternalAuthentication": {
      "Cavv": "AAABB2gHA1B5EFNjWQcDAAAAAAB=",
      "Xid": "Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
      "Eci": "5",
      "Version": "2",
      "ReferenceId": "a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
    },
    "Recurrent": false,
    "Amount": 15700,
    "ReceivedDate": "2022-08-26 10:47:53",
    "CapturedAmount": 15700,
    "CapturedDate": "2022-08-26 10:47:54",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "PaymentId": "21c9a3e7-23c2-420b-b12d-b514ef271c85",
    "Type": "DebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/21c9a3e7-23c2-420b-b12d-b514ef271c85"
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
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de débito"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "555187******0181",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Master",
            "PaymentAccountReference": "IC722LCXBROSHBPIBK7B44MBXO5HF"
        },
        "Provider": "Simulado",
        "AuthorizationCode": "635288",
        "Tid": "0826104754051",
        "ProofOfSale": "132471",
        "Authenticate": true,
        "ExternalAuthentication": {
            "Cavv": "AAABB2gHA1B5EFNjWQcDAAAAAAB=",
            "Xid": "Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
            "Eci": "5",
            "Version": "2",
            "ReferenceId": "a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
        },
        "Recurrent": false,
        "Amount": 15700,
        "ReceivedDate": "2022-08-26 10:47:53",
        "CapturedAmount": 15700,
        "CapturedDate": "2022-08-26 10:47:54",
        "Status": 2,
        "IsSplitted": false,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "21c9a3e7-23c2-420b-b12d-b514ef271c85",
        "Type": "DebitCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/21c9a3e7-23c2-420b-b12d-b514ef271c85"
            }
        ]
    }
}
```

| Property                            | Description                                                                                                                                                                                                                                                                    | Type         | Size | Format                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ---- | ------------------------------------ |
| `AuthenticationUrl`                 | URL to where the store should redirect the shopper for the debit flow.                                                                                                                                                                                                         | Text         | 56   | Authentication URL                   |
| `Tid`                               | Transaction Id on the acquirer.                                                                                                                                                                                                                                                | Text         | 20   | Alphanumeric text                    |
| `PaymentId`                         | Payment ID number, needed for future operations like Consulting, Capture and Cancellation.                                                                                                                                                                                     | Guid         | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`                         | Return URL for the store. URL where the store will be redirected after the flow.                                                                                                                                                                                               | Text         | 1024 | http://www.urllogista.com.br         |
| `Status`                            | Transaction status.                                                                                                                                                                                                                                                            | Byte         | ---  | 0                                    |
| `ReturnCode`                        | Acquiring return code.                                                                                                                                                                                                                                                         | Text         | 32   | Alphanumeric text                    |
| `Payment.MerchantAdviceCode`        | Brand's return code that defines the period for transaction submission retry._Válido only for Mastercard_                                                                                                                                                                      | Text         | 2    | Number                               |
| `DebitCard.PaymentAccountReference` | PAR (payment account reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the card brand doesn’t send the information the field will not be returned. | Alphanumeric | 29   | -                                    |

### Authenticating a transaction

Cielo offers 3DS 2.0 as a service, which is a transaction authenticating protocol. Authentication is optional for credit cards and required for debit cards, by demand of issuing banks and card brands.

To integrate the authentication to your transactions:

1. **Integrate the 3DS 2.0 script** to your payment page, as instructed on the [3DS guide](https://developercielo.github.io/en/manual/3ds){:target="\_blank"};
2. In the **transaction request** of credit or debit, **send the aditional node** `ExternalAuthentication`, as the following examples.

<aside class="notice">The 3DS 1.0 authentication is being discontinued by the card brands. New integrations should follow the 3DS 2.0 protocol.</aside>

#### Credit card with authentication

##### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "Billing": {
      "Street": "Rua Neturno",
      "Number": "12345",
      "Complement": "Sala 123",
      "Neighborhood": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BR",
      "ZipCode": "20080123"
    }
  },
  "Payment": {
    "Currency": "BRL",
    "Country": "BRA",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": "false",
    "Recurrent": "false",
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "SaveCard": "false",
      "Brand": "Visa",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "Type": "CreditCard",
    "Amount": 15700,
    "AirlineData": {
      "TicketNumber": "AR988983"
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
   "MerchantOrderId":"2014111701",
   "Customer":{
      "Name":"Comprador crédito completo",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
   },
   "Payment":{
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "Recurrent":"false",
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true,
     "Type":"CreditCard",
     "Amount":15700,
     "AirlineData":{
         "TicketNumber":"AR988983"
     }
   }
}
--verbose
```

| Propriedade                           | Tipo         | Tamanho | Obrigatório        | Descrição                                                                                                                                                                                                                                                                                                  |
| ------------------------------------- | ------------ | ------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`                          | Guid         | 36      | Yes                | Store identifier in Cielo.                                                                                                                                                                                                                                                                                 |
| `MerchantKey`                         | Text         | 40      | Yes                | Public Key for Double Authentication in Cielo.                                                                                                                                                                                                                                                             |
| `Content-Type`                        | Header       | 40      | Yes                | application/json (required).                                                                                                                                                                                                                                                                               |
| `RequestId`                           | Guid         | 36      | No                 | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                                                                                                                                                   |
| `MerchantOrderId`                     | Text         | 50      | Yes                | Order ID number.                                                                                                                                                                                                                                                                                           |
| `Customer.Name`                       | Text         | 255     | No                 | Customer's name                                                                                                                                                                                                                                                                                            |
| `Customer.Status`                     | Text         | 255     | No                 | The customer's registration status on the store. (NEW / EXISTING)                                                                                                                                                                                                                                          |
| `Customer.Identity`                   | Text         | 14      | No                 | Customer's RG, CPF or CNPJ.                                                                                                                                                                                                                                                                                |
| `Customer.IdentityType`               | Text         | 255     | No                 | Customer's type of identification (CPF/CNPJ).                                                                                                                                                                                                                                                              |
| `Customer.Email`                      | Text         | 255     | No                 | Customer's e-mail                                                                                                                                                                                                                                                                                          |
| `Customer.Birthdate`                  | Date         | 10      | No                 | Customer's birth date                                                                                                                                                                                                                                                                                      |
| `Customer.Address.Street`             | Text         | 255     | No                 | Customer's address.                                                                                                                                                                                                                                                                                        |
| `Customer.Address.Number`             | Text         | 15      | No                 | Customer's address number.                                                                                                                                                                                                                                                                                 |
| `Customer.Address.Complement`         | Text         | 50      | No                 | Customer's address complement.                                                                                                                                                                                                                                                                             |
| `Customer.Address.ZipCode`            | Text         | 9       | No                 | Customer's Zip Code                                                                                                                                                                                                                                                                                        |
| `Customer.Address.City`               | Text         | 50      | No                 | Customer's address' city.                                                                                                                                                                                                                                                                                  |
| `Customer.Address.State`              | Text         | 2       | No                 | Customer's address' state.                                                                                                                                                                                                                                                                                 |
| `Customer.Address.Country`            | Text         | 35      | No                 | Customer's address' country.                                                                                                                                                                                                                                                                               |
| `Customer.DeliveryAddress.Street`     | Text         | 255     | No                 | Customer's delivery address.                                                                                                                                                                                                                                                                               |
| `Customer.Address.Number`             | Text         | 15      | No                 | Customer's delivery address number.                                                                                                                                                                                                                                                                        |
| `Customer.DeliveryAddress.Complement` | Text         | 50      | No                 | Customer's delivery address complement.                                                                                                                                                                                                                                                                    |
| `Customer.DeliveryAddress.ZipCode`    | Text         | 9       | No                 | Customer's delivery address Zip Code.                                                                                                                                                                                                                                                                      |
| `Customer.DeliveryAddress.City`       | Text         | 50      | No                 | Customer's delivery address city.                                                                                                                                                                                                                                                                          |
| `Customer.DeliveryAddress.State`      | Text         | 2       | No                 | Customer's delivery address state.                                                                                                                                                                                                                                                                         |
| `Customer.DeliveryAddress.Country`    | Text         | 35      | No                 | Customer's delivery address country.                                                                                                                                                                                                                                                                       |
| `Payment.Type`                        | Text         | 100     | Yes                | Type of the Payment Method.                                                                                                                                                                                                                                                                                |
| `Payment.Amount`                      | Núumber      | 15      | Yes                | Order Amount (to be sent in cents).                                                                                                                                                                                                                                                                        |
| `Payment.Currency`                    | Text         | 3       | No                 | Currency in which the payment will be made (BRL).                                                                                                                                                                                                                                                          |
| `Payment.Country`                     | Text         | 3       | No                 | Country in which the payment will be made                                                                                                                                                                                                                                                                  |
| `Payment.Provider`                    | Text         | 15      | ---                | Defines the behavior for the payment method/NÃO OBRIGATÓRIO PARA CRÉDITO.                                                                                                                                                                                                                                  |
| `Payment.ServiceTaxAmount`            | Number       | 15      | No                 | Appliable only to airline companies. Order amounth that will be destined to service tax. PS.: This amount is not added to the authorization amount.                                                                                                                                                        |
| `Payment.SoftDescriptor`              | Text         | 13      | No                 | The store's name that will be on the shopper's bank invoice. Does not allow special characters.                                                                                                                                                                                                            |
| `Payment.Installments`                | Number       | 2       | Yes                | Number of installments.                                                                                                                                                                                                                                                                                    |
| `Payment.Interest`                    | Text         | 10      | No                 | Type of installments - Store (ByMerchant) or Card (ByIssuer).                                                                                                                                                                                                                                              |
| `Payment.Capture`                     | Boolean      | ---     | No (Default false) | Boolean that identifies if the authorization should be done by **Authomatic capture (true)** or **posterior capture (false)**.                                                                                                                                                                             |
| `Payment.Authenticate`                | Boolean      | ---     | No (Default false) | Defines if the shopper will be directed to the issuing bank for a card authetication.                                                                                                                                                                                                                      |
| `Payment.Recurrent`                   | Boolean      | -       | No                 | Indicates if the transaction is recurring ("true") or not ("false"). The value "true" won't originate a new recurrence, it will only allow a transaction without the need to send the security code. `Authenticate` should be "false" if `Recurrent` is "true".                                            |
| `Payment.IsCryptocurrencyNegotiation` | Boolean      | -       | No (default false) | Should be send as "true" if the transaction is to sell or buy criptocurrency.                                                                                                                                                                                                                              |
| `Payment.AirlineData.TicketNumber`    | Alphanumeric | 13      | No                 | Inform the number of the main airline ticket of the transaction.                                                                                                                                                                                                                                           |
| `CreditCard.CardNumber`               | Text         | 19      | Yes                | Shopper's card number.                                                                                                                                                                                                                                                                                     |
| `CreditCard.Holder`                   | Text         | 25      | No                 | Name of the shopper that's printed on the card. Does not accept special characters.                                                                                                                                                                                                                        |
| `CreditCard.ExpirationDate`           | Text         | 7       | Yes                | Expiration date printed on the card. Example: MM/AAAA.                                                                                                                                                                                                                                                     |
| `CreditCard.SecurityCode`             | Text         | 4       | No                 | Security code printed on the back of the card.                                                                                                                                                                                                                                                             |
| `CreditCard.SaveCard`                 | Boolean      | ---     | No (Default false) | Boolean that identifies if the card will be saved to generate a `CardToken`.                                                                                                                                                                                                                               |
| `CreditCard.Brand`                    | Text         | 10      | Yes                | Card brand. Possible values:Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.                                                                                                                                                                                               |
| `CreditCard.CardOnFile.Usage`         | Text         | -       | No                 | **First** if the card was stored and it's your first use.<br>**Used** if the card was stored and has been used for another transaction before.                                                                                                                                                             |
| `CreditCard.CardOnFile.Reason`        | Text         | -       | Conditional        | Indicates the motive for card storage, if the "Usage" field is "Used". <br> **Recurring** - Programmed recurring transaction (e.g. Subscriptions). <br> **Unscheduled** - Recurring transaction with no fixed date (e.g. service apps) <br>**Installments** - Installments through recurring transactions. |

##### Response

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "Billing": {
      "Street": "Rua Neturno",
      "Number": "12345",
      "Complement": "Sala 123",
      "Neighborhood": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BR",
      "ZipCode": "20080123"
    }
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "CreditCard": {
      "CardNumber": "455187******0183",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa",
      "PaymentAccountReference": "92745135160550440006111072222",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "TryAutomaticCancellation": true,
    "ProofOfSale": "674532",
    "Tid": "0305020554239",
    "AuthorizationCode": "123456",
    "SoftDescriptor": "123456789ABCD",
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 15700,
    "CapturedAmount": 15700,
    "Country": "BRA",
    "AirlineData": {
      "TicketNumber": "AR988983"
    },
    "ExtraDataCollection": [],
    "Status": 2,
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Payment.MerchantAdviceCode": "1",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
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
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito completo",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
        },
        "IsCryptoCurrencyNegotiation": true,
        "TryAutomaticCancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Payment.MerchantAdviceCode":"1",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
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

| Propriedade                          | Descrição                                                                                                                                                                                                                                                                                                                                                                                 | Tipo        | Tamanho | Formato                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- | ------------------------------------ |
| `ProofOfSale`                        | Authorization number, identical to NSU.                                                                                                                                                                                                                                                                                                                                                   | Text        | 6       | Alphanumeric text                    |
| `Tid`                                | Transaction Id on the acquirer.                                                                                                                                                                                                                                                                                                                                                           | Text        | 20      | Alphanumeric text                    |
| `AuthorizationCode`                  | Authorization code.                                                                                                                                                                                                                                                                                                                                                                       | Text        | 6       | Alphanumeric text                    |
| `SoftDescriptor`                     | Text that will be printed on the carrier’s bank invoice. Does not allow special characters.                                                                                                                                                                                                                                                                                               | Text        | 13      | Alphanumeric text                    |
| `PaymentId`                          | Payment ID number, needed for future operations like Consulting, Capture and Cancellation.                                                                                                                                                                                                                                                                                                | Guid        | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                                | Eletronic Commerce Indicator. Indicates how safe a transaction is.                                                                                                                                                                                                                                                                                                                        | Text        | 2       | Exemples: 7                          |
| `Status`                             | Transaction status.                                                                                                                                                                                                                                                                                                                                                                       | Byte        | ---     | 2                                    |
| `ReturnCode`                         | Acquiring return code.                                                                                                                                                                                                                                                                                                                                                                    | Text        | 32      | Alphanumeric text                    |
| `ReturnMessage`                      | Acquiring return message.                                                                                                                                                                                                                                                                                                                                                                 | Text        | 512     | Alphanumeric text                    |
| `Payment.MerchantAdviceCode`         | Card brand's return code that defines the period for transaction submission retry. _Valid only for Mastercard_.                                                                                                                                                                                                                                                                           | Text        | 2       | Number                               |
| `TryAutomaticCancellation`           | In case of error during authorization (status “Not Finished - 0”), the response will include the “tryautomaticcancellation” field as “true”. In this case, the transaction will be automatically queried, and if it has been authorized successfully, it will be canceled automatically. This feature must be enabled for establishment. To enable, please contact our technical support. | Boolean     | -       | true ou false                        |
| `CreditCard.PaymentAccountReference` | PAR (payment account reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the card brand doesn’t send the information the field will not be returned.                                                                                                            | Alphanumber | 29      | ---                                  |

#### Debit card with authentication

The debit transaction with authentication is the standard for this payment method. Follow the integration steps at the [3DS guide](https://developercielo.github.io/en/manual/3ds){:target="\_blank"} and send the request as shown in [Creating a debit transaction](https://developercielo.github.io/en/manual/cielo-ecommerce#creating-a-debit-transaction){:target="\_blank"}.

#### External MPI

The Merchant plug-in, known as MPI, is a service that allows you to make the call for authentication, integrated and certified with card brands for 3DS authentication processing. Cielo allows the store owner the 3DS integration through the Internal MPI or the External MPI.

- **Internal MPI**: it is a service already integrated to 3DS Cielo, without needing to integrate or hire.

- **External MPI**: used when your e-commerce hires a MPI solution, without Cielo's participation. No matter the 3DS version hired, follow the [Authorization with Authentication guide](https://developercielo.github.io/en/manual/autorizacao-com-autenticacao){:target="\_blank"}.

## Alelo Cards

To create a sale that will use an Alelo card, it's necessary to make a **POST** to the Payment resource using the technical contract for a **Debit Card** sale.

**NOTE:** In ALELO Card transactions, the following parameters must have static settings.

- `Payment.Authenticate` should be as **false** or not be sent;
- `DebitCard.Brand` should be as **Elo**.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014121201",
  "Customer": {
    "Name": "Comprador Cartão de Alelo"
  },
  "Payment": {
    "Type": "DebitCard",
    "Authenticate": false,
    "Amount": 50,
    "ReturnUrl": "http://www.cielo.com.br",
    "DebitCard": {
      "CardNumber": "5080540487508044",
      "Holder": "Comprador Cartão de Alelo",
      "ExpirationDate": "07/2029",
      "SecurityCode": "841",
      "brand": "Elo"
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

| Property                 | Description                                                                                 | Type    | Size | Required          |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------- | ---- | ----------------- |
| `MerchantId`             | Store identifier in the Cielo eCommerce API.                                                | Guid    | 36   | Yes               |
| `MerchantKey`            | Public Key for Dual Authentication in the Cielo eCommerce API.                              | Text    | 40   | Yes               |
| `RequestId`              | Request identifier, used when the merchant uses different servers for each GET / POST / PUT | Guid    | 36   | No                |
| `MerchantOrderId`        | Order identification number.                                                                | Text    | 50   | Yes               |
| `Customer.Name`          | Shopper Name.                                                                               | Text    | 255  | No                |
| `Customer.Status`        | Shopper registration status at the store (NEW / EXISTING) - Used for fraud analysis.        | Text    | 255  | No                |
| `Payment.Authenticate`   | Defines whether the shopper will be directed to the issuing bank for card authentication    | Boolean | ---  | No (Defaul false) |
| `Payment.Type`           | Type of Payment Method                                                                      | Text    | 100  | Yes               |
| `Payment.Amount`         | Order Amount (to be sent in cents).                                                         | Numeric | 15   | Yes               |
| `Payment.ReturnUrl`      | Merchant return URL.                                                                        | Text    | 1024 | Yes               |
| `Payment.ReturnUrl`      | URL where the user will be redirected after payment is completed                            | Text    | 1024 | Yes               |
| `DebitCard.CardNumber`   | Shopper's Card Number.                                                                      | Text    | 19   | Yes               |
| `DebitCard.Holder`       | Shopper's name printed on card.                                                             | Text    | 25   | Yes               |
| `DebitCard.SecurityCode` | Security code printed on the back of the card.                                              | Text    | 4    | Yes               |
| `DebitCard.Brand`        | Card brand. Needs to be sent as "Elo"                                                       | Text    | 10   | Yes               |

### Response

```json
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

| Property            | Description                                                                              | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `AuthenticationUrl` | URL to which the Merchant must redirect the Customer to the Debit flow.                  | Text | 56   | Authentication URL                   |
| `Tid`               | Transaction ID at the acquirer.                                                          | Text | 20   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier field.                                                                  | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`         | Merchant return URL. URL where the shopkeeper will be redirected at the end of the flow. | Text | 1024 | http://www.urllojista.com.br         |
| `Status`            | Transaction Status                                                                       | Byte | ---  | 0                                    |
| `ReturnCode`        | Acquisition return code.                                                                 | Text | 32   | Alphanumeric text                    |

## Pix

For **Pix**, the transmission for the payment order and the availability of funds for the receiver happens in real time, 24 hours a day and without the need of intermediaries. It is a payment method that allows fast and low cost transactions.

Get to know the cycle of a **Pix** transaction:

| STEPS | RESPONSABILITY | DESCRIPTION                                                                              | TRANSACTION STATUS |
| ----- | -------------- | ---------------------------------------------------------------------------------------- | ------------------ |
| 1     | Store          | Generating the QR Code.                                                                  | 12 - Pending       |
| 2     | Shopper        | Paying through the QR Code.                                                              | 2 - Paid           |
| 3     | Store          | Getting notified of the payment confirmation.                                            | 2 - Paid           |
| 4     | Store          | Consulting the transaction status.                                                       | 2 - Paid           |
| 5     | Store          | Releasing the order.                                                                     | 2 - Paid           |
| 6     | Store          | If it's necessary, requesting the Pix transaction devolution (similar to a card refund). | 2 - Paid           |
| 7     | Store          | Getting notified of the payment refund.                                                  | 11 - Refunded      |
| 8     | Store          | Consulting the transaction status.                                                       | 11 - Refunded      |

> **WARNING**:<br/> > <br/>
>
> - To enable Pix for the Sandbox environment, get in touch with our E-commerce support e-mail: *cieloecommerce@cielo.com.br*;<br/> > <br/>
> - Before using Pix in production, certify that Pix is allowed in your account. To confirm, you just have to access [portal Cielo](https://www.cielo.com.br/){:target="\_blank"} in the logged in area go to **Meu Cadastro** > **Autorizações** > **PIX** > <br/> > ![Geração do QR Code Pix]({{ site.baseurl_root }}/images/apicieloecommerce/adesao-pix.png)

### Creating a transaction with Pix QR Code

To generate a Pix QR Code through API E-commerce Cielo, you have to follow these steps.

The required field `Payment.Type` should be sent as "Pix". In the response, the Pix QR Code image _code base64_ will be returned and you should make it available to the shopper.

Check the _transactional flow_ for generating a Pix QR Code:

![Geração do QR Code Pix]({{ site.baseurl_root }}/images/apicieloecommerce/geracao-qr-code-pix-en.png)

The shopper uses app that can do Pix transactions to read the QR Code and makes the payment. This step has no participation of the store or API E-commerce Cielo, as shown on the flow:

![Pagamento Pix]({{ site.baseurl_root }}/images/apicieloecommerce/pagamento-pix-en.png)

See the request and response examples for Pix QR Code generating:

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2020102601",
  "Customer": {
    "Name": "Nome do Pagador",
    "Identity": "12345678909",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "Pix",
    "Amount": 100
  }
}
```

```shell
--request POST "https://(...)/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2020102601",
   "Customer":{
      "Name":"Nome do Pagador",
      "Identity":"CPF",
      "IdentityType":"12345678909"
   },
   "Payment":{
      "Type":"Pix",
      "Amount":100
   }
}
--verbose
```

| PROPERTY                | DESCRIPTION                         | TYPE   | SIZE | REQUIRED |
| ----------------------- | ----------------------------------- | ------ | ---- | -------- |
| `MerchantOrderId`       | Order Id number.                    | Text   | 50   | Yes      |
| `Customer.Name`         | Shopper name.                       | Text   | 255  | Yes      |
| `Customer.Identity`     | Shopper's ID number (CPF/CNPJ)      | Text   | 14   | Yes      |
| `Customer.IdentityType` | Shopper's type of ID (CPF or CNPJ). | Text   | 255  | Yes      |
| `Payment.Type`          | Payment type. In this case, "Pix".  | Text   | -    | Yes      |
| `Payment.Amount`        | Payment value amount in cents.      | Number | 15   | Yes      |

#### Response

```json
{
   "MerchantOrderId":"2020102601",
   "Customer":{
      "Name":"Nome do Pagador"
   },
   "Payment":{
      (...)
      "Paymentid":"1997be4d-694a-472e-98f0-e7f4b4c8f1e7",
      "Type":"Pix",
      "AcquirerTransactionId":"86c200c7-7cdf-4375-92dd-1f62dfa846ad",
         "ProofOfSale":"123456",
      "QrcodeBase64Image":"rfhviy64ak+zse18cwcmtg==[...]",
      "QrCodeString":"00020101021226880014br.gov.bcb.pix2566qrcodes-h.cielo.com.br/pix-qr/d05b1a34-ec52-4201-ba1e-d3cc2a43162552040000530398654041.005802BR5918Merchant Teste HML6009Sao Paulo62120508000101296304031C",
      "Amount":100,
      "ReceivedDate":"2020-10-15 18:53:20",
      "Status":12,
      "ReturnCode":"0",
      "ReturnMessage":"Pix gerado com sucesso",
      (...)
   }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2020102601",
   "Customer":{
      "Name":"Nome do Pagador"
   },
   "Payment":{
      (...)
      "PaymentId":"1997be4d-694a-472e-98f0-e7f4b4c8f1e7",
      "Type":"Pix",
      "AcquirerTransactionId":"86c200c7-7cdf-4375-92dd-1f62dfa846ad",
         "ProofOfSale":"123456",
      "QrcodeBase64Image":"rfhviy64ak+zse18cwcmtg==[...]",
      "QrCodeString":"00020101021226880014br.gov.bcb.pix2566qrcodes-h.cielo.com.br/pix-qr/d05b1a34-ec52-4201-ba1e-d3cc2a43162552040000530398654041.005802BR5918Merchant Teste HML6009Sao Paulo62120508000101296304031C",
      "Amount":100,
      "ReceivedDate":"2020-10-15 18:53:20",
      "Status":12,
      "ReturnCode":"0",
      "ReturnMessage":"Pix gerado com sucesso",
      (...)
   }
}
--verbose
```

| PROPERTY                        | DESCRIPTION                                                                                                                                                                                                        | TYPE   | SIZE     | FORMAT                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | -------- | ------------------------------------ |
| `Payment.PaymentId`             | Payment ID number.                                                                                                                                                                                                 | GUID   | 40       | Text                                 |
| `Payment.AcquirerTransactionId` | Transaction Id for the provider of the payment methods.                                                                                                                                                            | GUID   | 36       | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `Payment.ProofOfSale`           | NSU Pix.                                                                                                                                                                                                           | Texto  | 20       | Alphanumeric Text                    |
| `Payment.QrcodeBase64Image`     | Base64 code for the QR Code image.                                                                                                                                                                                 | Text   | -        | Text                                 |
| `Payment.QrCodeString`          | Codified text for the shopper to copy and paste in the internet banking field for mobile payments.                                                                                                                 | Text   | Variable | Alphanumeric Text                    |
| `Payment.Status`                | Transaction status. In case of success, the inital status is "12" (_Pending_). See the [transaction status list](https://braspag.github.io//en/manual/braspag-pagador#transaction-status-list){:target="\_blank"}. | Number | -        | 12                                   |
| `Payment.ReturnCode`            | Code returned by the provider of the payment method.                                                                                                                                                               | Text   | 32       | 0                                    |
| `Payment.ReturnMessage`         | Message returned by the provider of the payment method.                                                                                                                                                            | Text   | 512      | "Pix successfully generated"         |

### Requesting Pix refund

If your store needs to cancel a pix transaction, it's possible to ask for a **refund**. It's important to point out that the refund is not immediate and it needs to be approved by the Pix provider. When it is approved, your store will get [notified](https://developercielo.github.io/en/manual/cielo-ecommerce#notification-post){:target="\_blank"}.<br/>

> **Warning:**<br/>
>
> - The refund will only happen if there are funds available;<br/>
> - The deadline for cancellation is 90 days.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=xxx</span></aside>

```shell
--request PUT "https://(...)/sales/{PaymentId}/void?Amount=xxx"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

| PROPERTY      | DESCRIPTION                                                                                        | TYPE   | SIZE | REQUIRED |
| ------------- | -------------------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`  | Store identifier in Cielo.                                                                         | GUID   | 36   | Yes      |
| `MerchantKey` | Public Key for Double Authentication in Cielo.                                                     | Text   | 40   | Yes      |
| `RequestId`   | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.           | GUID   | 36   | No       |
| `PaymentId`   | Payment ID number.                                                                                 | GUID   | 36   | Yes      |
| `Amount`      | Amount to be cancelled/refunded in cents. Check if the acquirer supports cancellations or refunds. | Number | 15   | No       |

#### Response

```json
{
  "Status": 12,
  "ReasonCode": 0,
  "ReasonMessage": "Successful",
  "ReturnCode": "0",
  "ReturnMessage": "Reembolso solicitado com sucesso",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://(...)/sales/{PaymentId}"
    }
  ]
}
```

```shell
{
   "Status": 12,
   "ReasonCode": 0,
   "ReasonMessage": "Successful",
   "ReturnCode": "0",
   "ReturnMessage": "Reembolso solicitado com sucesso",
   "Links": [
      {
         "Method": "GET",
         "Rel": "self",
         "Href": "https://(...)/sales/{PaymentId}"
      }
   ]
}
```

| PROPERTY        | DESCRIPTION              | TYPE | SIZE | FORMAT            |
| --------------- | ------------------------ | ---- | ---- | ----------------- |
| `Status`        | Transaction status.      | Byte | 2    | Ex.: "1"          |
| `ReasonCode`    | Acquirer return code.    | Text | 32   | Alphanumeric text |
| `ReasonMessage` | Acquirer return message. | Text | 512  | Alphanumeric text |

## Boleto

To make a Boleto transaction, you first need to hire this service at the bank. After you do that, you need to set it up according to our [Boleto guide](https://developercielo.github.io/tutorial/manual-boleto){:target="\_blank"}.

> Banco do Brasil boletos don't have the automatic conciliation service.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Teste Boleto",
    "Identity": "1234567890",
    "Address": {
      "Street": "Avenida Marechal Câmara",
      "Number": "160",
      "Complement": "Sala 934",
      "ZipCode": "22750012",
      "District": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "Billing": {
      "Street": "Avenida Marechal Câmara",
      "Number": "160",
      "Complement": "Sala 934",
      "Neighborhood": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BR",
      "ZipCode": "22750012"
    }
  },
  "Payment": {
    "Type": "Boleto",
    "Amount": 15700,
    "Provider": "Bradesco2",
    "Address": "Rua Teste",
    "BoletoNumber": "123",
    "Assignor": "Empresa Teste",
    "Demonstrative": "Desmonstrative Teste",
    "ExpirationDate": "2020-12-31",
    "Identification": "11884926754",
    "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia."
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
    "MerchantOrderId":"2014111706",
    "Customer":
    {
        "Name":"Comprador Teste Boleto",
        "Identity": "1234567890",
        "Address":
        {
          "Street": "Avenida Marechal Câmara",
          "Number": "160",
          "Complement": "Sala 934",
          "ZipCode" : "22750012",
          "District": "Centro",
          "City": "Rio de Janeiro",
          "State" : "RJ",
          "Country": "BRA"
        },
        "Billing": {
           "Street": "Avenida Marechal Câmara",
           "Number": "160",
           "Complement": "Sala 934",
           "Neighborhood": "Centro",
           "City": "Rio de Janeiro",
           "State": "RJ",
           "Country": "BR",
           "ZipCode": "22750012"
  },
    },
    "Payment":
    {
        "Type":"Boleto",
        "Amount":15700,
        "Provider":"Bradesco2",
        "Address": "Rua Teste",
        "BoletoNumber": "123",
        "Assignor": "Empresa Teste",
        "Demonstrative": "Desmonstrative Teste",
        "ExpirationDate": "2020-12-31",
        "Identification": "11884926754",
        "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia."
    }
}
--verbose
```

| Property                        | Description                                                                             | Type   | Size                                | Required                                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`                    | Store identifier in API Cielo eCommerce.                                                | Guid   | 36                                  | Yes                                                                                                                                     |
| `MerchantKey`                   | Public Key for Double Authentication in API Cielo eCommerce.                            | Text   | 40                                  | Yes                                                                                                                                     |
| `RequestId`                     | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT | Guid   | 36                                  | No                                                                                                                                      |
| `MerchantOrderId`               | Order ID number.                                                                        | Text   | Bradesco: 27<BR>Banco do Brasil: 50 | Yes                                                                                                                                     |
| `Customer.Name`                 | Buyer's name.                                                                           | Text   | Bradesco: 34<BR>Banco do Brasil: 60 | No                                                                                                                                      |
| `Customer.Status`               | Buyer registration status in store(NEW / EXISTING) - Used by fraud analysis             | Text   | 255                                 | No                                                                                                                                      |
| `Customer.Address.ZipCode`      | Buyer's address zip code.                                                               | Text   | 9                                   | Yes                                                                                                                                     |
| `Customer.Address.Country`      | Buyer's address country.                                                                | Text   | 35                                  | Yes                                                                                                                                     |
| `Customer.Address.State`        | Buyer's address state.                                                                  | Text   | 2                                   | Yes                                                                                                                                     |
| `Customer.Address.City`         | Buyer's address city.                                                                   | Text   | Bradesco: 50<BR>Banco do Brasil: 18 | Yes                                                                                                                                     |
| `Customer.Address.District`     | Buyer's neighborhood.                                                                   | Text   | 50                                  | Yes                                                                                                                                     |
| `Customer.Address.Street`       | Buyer's address.                                                                        | Text   | 255                                 | Yes                                                                                                                                     |
| `Customer.Address.Number`       | Buyer's address number.                                                                 | Text   | 15                                  | Yes                                                                                                                                     |
| `Customer.Billing.Street`       | string                                                                                  | 24     | No                                  | Customer's billing address.                                                                                                             |
| `Customer.Billing.Number`       | string                                                                                  | 5      | No                                  | Customer's billing address number.                                                                                                      |
| `Customer.Billing.Complement`   | string                                                                                  | 14     | No                                  | Customer's billing address complement.                                                                                                  |
| `Customer.Billing.Neighborhood` | string                                                                                  | 15     | No                                  | Customer's billing address neighborhood.                                                                                                |
| `Customer.Billing.City`         | string                                                                                  | 20     | No                                  | Customer's billing address city.                                                                                                        |
| `Customer.Billing.State`        | string                                                                                  | 2      | No                                  | Customer's billing address state.                                                                                                       |
| `Customer.Billing.Country`      | string                                                                                  | 2      | No                                  | Customer's billing address country. More information at [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui){:target="\_blank"} |
| `Customer.Billing.ZipCode`      | string                                                                                  | 9      | No                                  | Customer's billing address Zip Code.                                                                                                    |
| `Payment.Type`                  | Type of the Payment Method.                                                             | Text   | 100                                 | Yes                                                                                                                                     |
| `Payment.Amount`                | Order Amount (to be sent in cents).                                                     | Number | 15                                  | Yes                                                                                                                                     |
| `Payment.Provider`              | Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.             | Text   | 15                                  | Yes                                                                                                                                     |
| `Payment.Adress`                | Transferor's address.                                                                   | Text   | 255                                 | No                                                                                                                                      |
| `Payment.BoletoNumber`          | Bank slip number sent by the merchant. Used to count issued bank slips ("OurNumber").   | Text   | Bradesco: 11<BR>Banco do Brasil: 9  | No                                                                                                                                      |
| `Payment.Assignor`              | Transferor's name.                                                                      | Text   | 200                                 | No                                                                                                                                      |
| `Payment.Demonstrative`         | Demonstration text.                                                                     | Text   | 450                                 | No                                                                                                                                      |
| `Payment.ExpirationDate`        | Bank slip expiration date.                                                              | Date   | 10                                  | No                                                                                                                                      |
| `Payment.Identification`        | Identification document of the Transferor.                                              | Text   | 14                                  | No                                                                                                                                      |
| `Payment.Instructions`          | Bank slip instructions.                                                                 | Text   | 450                                 | No                                                                                                                                      |

### Response

For the boleto transaction response, API E-commerce Cielo will send the boleto URL and the bar code, which the e-commerce should display to the shopper.

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Boleto Completo",
    "Address": {
      "Street": "Av Marechal Camara",
      "Number": "160",
      "ZipCode": "22750012",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA",
      "District": "Centro"
    },
    "Billing": {
      "Street": "Avenida Marechal Câmara",
      "Number": "160",
      "Complement": "Sala 934",
      "Neighborhood": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BR",
      "ZipCode": "22750012"
    }
  },
  "Payment": {
    "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia.",
    "ExpirationDate": "2015-01-05",
    "Url": "https://apisandbox.cieloecommerce.cielo.com.br/post/pagador/reenvia.asp/a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
    "Number": "123-2",
    "BarCodeNumber": "00096629900000157000494250000000012300656560",
    "DigitableLine": "00090.49420 50000.000013 23006.565602 6 62990000015700",
    "Assignor": "Empresa Teste",
    "Address": "Rua Teste",
    "Identification": "11884926754",
    "PaymentId": "a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
    "Type": "Boleto",
    "Amount": 15700,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Bradesco2",
    "ExtraDataCollection": [],
    "Status": 1,
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
    "MerchantOrderId": "2014111706",
    "Customer":
    {
        "Name": "Comprador Boleto Completo",
        "Address":
        {
        "Street": "Av Marechal Camara",
        "Number": "160",
        "ZipCode": "22750012",
        "City": "Rio de Janeiro",
        "State": "RJ",
        "Country": "BRA",
        "District": "Centro"
        },
      "Billing": {
         "Street": "Avenida Marechal Câmara",
         "Number": "160",
         "Complement": "Sala 934",
         "Neighborhood": "Centro",
         "City": "Rio de Janeiro",
         "State": "RJ",
         "Country": "BR",
         "ZipCode": "22750012"
    },
    "Payment":
    {
        "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia.",
        "ExpirationDate": "2015-01-05",
        "Url": "https://apisandbox.cieloecommerce.cielo.com.br/post/pagador/reenvia.asp/a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
        "Number": "123-2",
        "BarCodeNumber": "00096629900000157000494250000000012300656560",
        "DigitableLine": "00090.49420 50000.000013 23006.565602 6 62990000015700",
        "Assignor": "Empresa Teste",
        "Address": "Rua Teste",
        "Identification": "11884926754",
        "PaymentId": "a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
        "Type": "Boleto",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco2",
        "ExtraDataCollection": [],
        "Status": 1,
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

| Property         | Description                                | Type   | Size | Format                                                                        |
| ---------------- | ------------------------------------------ | ------ | ---- | ----------------------------------------------------------------------------- |
| `PaymentId`      | Order Identifier Field.                    | Guid   | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                          |
| `Instructions`   | Bank slip instructions.                    | Text   | 450  | e.g.: Accept only until the due date, after that date interest of 1% per day. |
| `ExpirationDate` | Expiration date.                           | Text   | 10   | 2014-12-25                                                                    |
| `Url`            | Generated Bank slip Url.                   | string | 256  | e.g.:https://.../pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d     |
| `Number`         | "OurNumber" generated.                     | Text   | 50   | e.g.: 1000000012-8                                                            |
| `BarCodeNumber`  | Barcode numerical representation.          | Text   | 44   | e.g.: 00091628800000157000494250100000001200656560                            |
| `DigitableLine`  | Digitable line.                            | Text   | 256  | e.g.: 00090.49420 50100.000004 12006.565605 1 62880000015700                  |
| `Assignor`       | Transferor's name.                         | Text   | 256  | e.g.: Test Store                                                              |
| `Address`        | Transferor's address.                      | Text   | 256  | e.g.: 160 Test Avenue                                                         |
| `Identification` | Identification document of the Transferor. | Text   | 14   | CPF or CNPJ of the Transferor without the special characters (., /, -)        |
| `Status`         | Transaction Status.                        | Byte   | ---  | 1                                                                             |

### Additional Rules

Number of characters per field and Provider:

**Bradesco**

| Property                      | Notes                                                    | Size      |
| ----------------------------- | -------------------------------------------------------- | --------- |
| `Provider`                    | N/a                                                      | Bradesco2 |
| `MerchantOrderId`             | Only letters, numbers, and characters like "\_" and "$". | 27        |
| `Payment.BoletoNumber`        | The value is validated by the bank.                      | 11        |
| `Customer.Name`               | The API Cielo truncates automatically.                   | 34        |
| `Customer.Address.Street`     | The value is validated by API Cielo.                     | 70        |
| `Customer.Address.Number`     | The value is validated by API Cielo.                     | 10        |
| `Customer.Address.Complement` | The value is validated by API Cielo.                     | 20        |
| `Customer.Address.District`   | The value is validated by API Cielo.                     | 50        |
| `Customer.Address.City`       | The value is validated by API Cielo.                     | 50        |
| `Payment.Instructions`        | N/a                                                      | 255       |
| `Payment.Demonstrative`       | N/a                                                      | 255       |

**Banco do Brasil**

| Property                      | Notes                                                                                                                                                                                                                                                                                                                                 | Size                                                                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Provider`                    | N/a                                                                                                                                                                                                                                                                                                                                   | BancoDoBrasil2                                                                                                                                                     |
| `MerchantOrderId`             | Not sent to the bank.                                                                                                                                                                                                                                                                                                                 | 50                                                                                                                                                                 |
| `Payment.BoletoNumber`        | When sent above 9 positions, the API Cielo truncates automatically, considering the last 9 digits.                                                                                                                                                                                                                                    | 9                                                                                                                                                                  |
| `Customer.Name`               | **Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words. | 60                                                                                                                                                                 |
| `Customer.Address.Street`     | **Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words. | The fields `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` should total 60 characters at maximum. |
| `Customer.Address.Number`     | **Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words. | The fields `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` should total 60 characters at maximum. |
| `Customer.Address.Complement` | **Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words. | The fields `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` should total 60 characters at maximum. |
| `Customer.Address.District`   | **Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words. | The fields `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` should total 60 characters at maximum. |
| `Customer.Address.City`       | **Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words. | 18                                                                                                                                                                 |
| `Payment.Instructions`        | N/a                                                                                                                                                                                                                                                                                                                                   | 255                                                                                                                                                                |

## E-wallet

### What are e-wallets?

They are card repositories and payment data for online consumers. The digital wallets allow a consumer to register their payment data, then speeding up the purchase process in qualified stores in their purchases by having only one registration.

> To use wallets in the API E-commerce Cielo, the merchant must have the wallets integrated in their checkout.

For more information, we suggest that you contact the technical department of the wallet that you wish to implement.

#### Wallets Available

The API E-commerce Cielo is integrated with:

| Wallet                                                                |
| --------------------------------------------------------------------- |
| [_Apple Pay_](https://www.apple.com/br/apple-pay/)                    |
| [_VisaCheckout_](https://vaidevisa.visa.com.br/site/visa-checkout)    |
| [_MasterPass_](https://masterpass.com/pt-br/)                         |
| [_Samsung Pay_](https://www.samsung.com.br/samsungpay/)               |
| [_Google Pay_](https://developercielo.github.io/en/manual/google-pay) |

<aside class="notice"><strong>Warning:</strong> When the “Wallet” node is sent in the request, the “CreditCard” node becomes optional.</aside>

<aside class="notice"><strong>Warning:</strong> For debit card, when the “Wallet” node is sent in the request, the “DebitCard” node will be needed containing the “ReturnUrl”.</aside>

<aside class="notice"><strong>Warning:</strong>  Due to the need of using ephemeral keys to carry out credit operations, the Recurrence is not available for Wallets transactions </aside>

### Base integration

E-wallets on API E-commerce Cielo have two ways to be used.

1. **Decryption** - When the merchant sends the data from the wallet so that API E-commerce Cielo performs the card processing
2. **Card sending** - When the store searches the card, and send its own to the API E-commerce Cielo for processing

#### Components

##### Walletkey

The WalletKey is the identifier used by Cielo to decrypt payloads returned by the Wallet. It used only in integrations in the formed `Decryption`
Each Wallet has a `WalletKeys` format.

| Wallet           | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **VisaCheckout** | `1140814777695873901`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Apple Pay**    | `9zcCAciwoTS+qBx8jWb++64eHT2QZTWBs6qMVJ0GO+AqpcDVkxGPNpOR/D1bv5AZ62+5lKvucati0+eu7hdilwUYT3n5swkHuIzX2KO80Apx/SkhoVM5dqgyKrak5VD2/drcGh9xqEanWkyd7wl200sYj4QUMbeLhyaY7bCdnnpKDJgpOY6J883fX3TiHoZorb/QlEEOpvYcbcFYs3ELZ7QVtjxyrO2LmPsIkz2BgNm5f+JaJUSAOectahgLZnZR+sRXTDtqLOJQAprs0MNTkPzF95nXGKCCnPV2mfR7z8FHcP7AGqO7aTLBGJLgxFOnRKaFnYlY2E9uTPBbB5JjZywlLIWsPKur5G4m1/E9A6DwjMd0fDYnxjj0bQDfaZpBPeGGPFLu5YYn1IDc`                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Samsung Pay**  | `eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-LldMArSoG59x6i0BbI7jttqxyAdcriSy8q_77VAp3854P9kekjj54RKLrP6APDIr46DI97kjG9E99ONXImnEyamHj95ZH_AW8lvkfa09KAr4537RM8GEXyZoys2vfIW8zqjjicZ8EKIpAixNlmrFJu6-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ` |

> **Note:**
> The Wallet MasterPass does not have `WalletKey`
> The `WalletKey` Apple Pay can be obtained inside the `DATA` field of the Apple payload

##### EphemeralPublicKey

The `EphemeralPublicKey` is the key used by Cielo to decrypt payloads containing `WalletKeys` sent by the merchant. It is used only in integrations in the formed `Decryption`
Each Wallet has an `EphemeralPublicKey` format.

| Wallet      | Example                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _Apple Pay_ | `MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoedz1NqI6hs9hEO6dBsnn0X0xp5/DKj3gXirjEqxNIJ8JyhGxVB3ITd0E+6uG4W6Evt+kugG8gOhCBrdUU6JwQ==` |

> _VisaCheckout_ / _MasterPass_ / _SamsungPay_ **do not have** EphemeralPublicKey

#### Decryption

##### Request

```json
-- Decryption
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

| Property                                   | Type   | Size | Required | Description                                                                                        |
| ------------------------------------------ | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------- |
| `MerchantId`                               | Guid   | 36   | Sim      | Store identifier in Cielo.                                                                         |
| `MerchantKey`                              | Texto  | 40   | Sim      | Public Key for Double Authentication in Cielo.                                                     |
| `RequestId`                                | Guid   | 36   | Não      | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.           |
| `MerchantOrderId`                          | Texto  | 50   | Sim      | Order ID number.                                                                                   |
| `Customer.Name`                            | Texto  | 255  | Não      | Buyer's name.                                                                                      |
| `Customer.Status`                          | Texto  | 255  | Não      | Buyer registration status in store (NEW / EXISTING).                                               |
| `Payment.Type`                             | Texto  | 100  | Sim      | Type of the Payment Method..                                                                       |
| `Payment.Amount`                           | Número | 15   | Sim      | Order Amount (to be sent in cents).                                                                |
| `Payment.Installments`                     | Número | 2    | Sim      | Number of installments.                                                                            |
| `CreditCard.CardNumber.`                   | Texto  | 19   | Sim      | Buyer's Card Number.                                                                               |
| `CreditCard.SecurityCode`                  | Texto  | 4    | Não      | Security code printed on back of card - See Annex.                                                 |
| `CreditCard.Brand`                         | Texto  | 10   | Sim      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).      |
| `Wallet.Type`                              | Texto  | 255  | Sim      | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `SamsungPay`                             |
| `Wallet.Walletkey`                         | Texto  | 255  | Sim      | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information |
| `Wallet.AdditionalData.EphemeralPublicKey` | Texto  | 255  | Sim      | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`               |
| `Wallet.AdditionalData.capturecode`        | Texto  | 255  | Sim      | Code informed by MasterPass to the merchant                                                        |

##### Response

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
            "Holder": "Leonardo Romano",
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
            "Eci": 0
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

| Property                            | Description                                                                                                                  | Type | Size | Format                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                          | Text | 255  | Alphanumeric text                    |
| `AdditionalData.capturecode`        | Code informed by `MasterPass` to the merchant                                                                                | Text | 255  | 3                                    |
| `Walletkey`                         | Cryptographic key that identifies stores in the Wallets - See the WalletKey table for more information                       | Text | 255  | See `WalletKey` table                |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                         | Text | 255  | See `EphemeralPublicKey` table       |

#### Sending the card

##### Request

```json
-- Sending the card
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

| Property                  | Type   | Size | Required | Description                                                                                                                                                                                 |
| ------------------------- | ------ | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36   | Yes      | Store identifier in Cielo.                                                                                                                                                                  |
| `MerchantKey`             | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                                                                                                              |
| `RequestId`               | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                                    |
| `MerchantOrderId`         | Text   | 50   | Yes      | Order ID number.                                                                                                                                                                            |
| `Customer.Name`           | Text   | 255  | No       | Buyer's name.                                                                                                                                                                               |
| `Customer.Status`         | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING).                                                                                                                                        |
| `Payment.Type`            | Text   | 100  | Yes      | Type of the Payment Method..                                                                                                                                                                |
| `Payment.Amount`          | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                                                                                                                         |
| `Payment.Installments`    | Number | 2    | Yes      | Number of installments.                                                                                                                                                                     |
| `CreditCard.CardNumber.`  | Text   | 19   | Yes      | Buyer's Card Number.                                                                                                                                                                        |
| `CreditCard.SecurityCode` | Text   | 4    | No       | Security code printed on back of card - See Annex.                                                                                                                                          |
| `CreditCard.Brand`        | Text   | 10   | Yes      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                                               |
| `Wallet.Type`             | Text   | 255  | Yes      | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                                                                                         |
| `Wallet.Walletkey`        | Text   | 255  | Yes      | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information                                                                                          |
| `Wallet.ECI`              | Text   | 3    | Yes      | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction. |
| `Wallet.CAVV`             | Text   | 255  | Yes      | Validation field returned by Wallet and used as the authorization basis                                                                                                                     |

##### Response

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

| Property                     | Description                                                                                                                  | Type | Size | Format                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`                | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`                        | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode`          | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`             | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`                  | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                        | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Exemplos: 7                          |
| `Status`                     | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`                 | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`              | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`                       | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                          | Text | 255  | Alphanumeric text                    |
| `Walletkey`                  | Cryptographic key that identifies stores in the Wallets - See the WalletKey table for more information                       | Text | 255  | Ver tabela `WalletKey`               |
| `AdditionalData.capturecode` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                         | Text | 255  | 3                                    |

### Apple Pay

#### Prerequisites

To use Apple Pay in the **Decryption** format, it is necessary that the store is already registered with Apple and has a `MerchantIdentifier`. The **Decryption** integration requires the merchant to manually upload a **CSR certificate in the PEM format** provided by Cielo. Contact the Cielo customer service team to obtain the Certificate.

##### MerchantIdentifier

To get the `MerchantIdentifier` perform the following steps:

1. Log in [**Apple Developer**](https://developer.apple.com/)
2. Select [**Certificates, IDs & Profiles**](https://developer.apple.com/library/content/ApplePay_Guide/Configuration.html)
3. Inside the area "Identifiers" click on "Merchant IDs"
4. Click on **+** in the right corner, below "Registering a Merchant ID"
5. Set the MerchantID description and identifier. Example: "merchant.com.CIELO.merchantAccount"
6. Click on "continue" and verify that the information entered is correct.
7. End the process.

> The `MerchantIdentifier` must be sent to Cielo for the creation of a CSR Certificate in PEM format.

##### CSR Certificate

After sending the `MerchantIdentifier` to the Cielo service team, the store will receive a extension certificate of `PEM` and should follow the following steps:

1. Log in [**Apple Developer**](https://developer.apple.com/)
2. Select [**Certificates, IDs & Profiles**](https://developer.apple.com/library/content/ApplePay_Guide/Configuration.html)
3. Perform the certificate upload
4. End the process.

> The PEM Certificate contains the CSR code requested by Apple. <br>
> Format of a Certificate `.PEM`

-

> -----BEGIN CERTIFICATE REQUEST-----<BR>
> MIHwMIGYAgEAMDgxCzAJBgNVBAYTAkJSMRAwDgYDVQQKDAdicmFzcGFnMRcwFQYD<BR>
> VQQDDA5icmFzcGFnLmNvbS5icjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABBIP<BR>
> ULN00aAwYW+sfTettoIl8l9YrDCkF1HEiI9PgwLcM4jCkIAvnrKZ3loLWDi4J8Jh<BR>
> ML01OuTohYS46lqF6p4wCgYIKoZIzj0EAwIDRwAwRAIgWLAPtSWKQ3sJYLc6jmWa<BR>
> RNWCoNR2XBQZKdg5bIGNYpYCIHSLsQVSK8taL7dGirOBxXiOqtUA9hWxn0g1Mf3U<BR>
> VKeU<BR>
> -----END CERTIFICATE REQUEST-----<BR>

#### Decryption

In the model below, we demonstrate how to use the Apple Pay Cielo integration by sending the WalletKey + EphemeralPublicKey returned by Apple via Payload

##### Request

Request Sample _Apple Pay_

> It is necessary that the store already has a registration and an Apple Pay integration, otherwise it will not be possible to integrate with the API

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
    "Amount": 1100,
    "Provider": "Cielo",
    "Installments": 1,
    "Currency": "BRL",
    "Wallet": {
      "Type": "ApplePay",
      "WalletKey": "9zcCAciwoTS+qBx8jWb++64eHT2QZTWBs6qMVJ0GO+AqpcDVkxGPNpOR/D1bv5AZ62+5lKvucati0+eu7hdilwUYT3n5swkHuIzX2KO80Apx/SkhoVM5dqgyKrak5VD2/drcGh9xqEanWkyd7wl200sYj4QUMbeLhyaY7bCdnnpKDJgpOY6J883fX3TiHoZorb/QlEEOpvYcbcFYs3ELZ7QVtjxyrO2LmPsIkz2BgNm5f+JaJUSAOectahgLZnZR+sRXTDtqLOJQAprs0MNTkPzF95nXGKCCnPV2mfR7z8FHcP7AGqO7aTLBGJLgxFOnRKaFnYlY2E9uTPBbB5JjZywlLIWsPKur5G4m1/E9A6DwjMd0fDYnxjj0bQDfaZpBPeGGPFLu5YYn1IDc",
      "AdditionalData": {
        "EphemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoedz1NqI6hs9hEO6dBsnn0X0xp5/DKj3gXirjEqxNIJ8JyhGxVB3ITd0E+6uG4W6Evt+kugG8gOhCBrdUU6JwQ=="
      }
    }
  }
}
```

| Property                                   | Type   | Size | Required | Description                                                                                        |
| ------------------------------------------ | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------- |
| `MerchantId`                               | Guid   | 36   | Yes      | Store identifier in Cielo.                                                                         |
| `MerchantKey`                              | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                     |
| `RequestId`                                | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.           |
| `MerchantOrderId`                          | Text   | 50   | Yes      | Order ID number.                                                                                   |
| `Customer.Name`                            | Text   | 255  | No       | Buyer's name.                                                                                      |
| `Customer.Status`                          | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING).                                               |
| `Payment.Type`                             | Text   | 100  | Yes      | Type of the Payment Method..                                                                       |
| `Payment.Amount`                           | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                                |
| `Payment.Installments`                     | Number | 2    | Yes      | Number of installments.                                                                            |
| `CreditCard.CardNumber.`                   | Text   | 19   | Yes      | Buyer's Card Number.                                                                               |
| `CreditCard.SecurityCode`                  | Text   | 4    | No       | Security code printed on back of card - See Annex.                                                 |
| `CreditCard.Brand`                         | Text   | 10   | Yes      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).      |
| `Wallet.Type`                              | Text   | 255  | Yes      | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                |
| `Wallet.Walletkey`                         | Text   | 255  | Yes      | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information |
| `Wallet.AdditionalData.EphemeralPublicKey` | Text   | 255  | Yes      | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`               |
| `Wallet.AdditionalData.capturecode`        | Text   | 255  | Yes      | Code informed by MasterPass to the merchant                                                        |

##### Response

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
            "Holder": "Leonardo Romano",
            "ExpirationDate": "08/2020",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "0319040817883",
        "ProofOfSale": "817883",
        "AuthorizationCode": "027795",
        "Wallet": {
            "Type": "ApplePay",
            "WalletKey": "9zcCAciwoTS+qBx8jWb++64eHT2QZTWBs6qMVJ0GO+AqpcDVkxGPNpOR/D1bv5AZ62+5lKvucati0+eu7hdilwUYT3n5swkHuIzX2KO80Apx/SkhoVM5dqgyKrak5VD2/drcGh9xqEanWkyd7wl200sYj4QUMbeLhyaY7bCdnnpKDJgpOY6J883fX3TiHoZorb/QlEEOpvYcbcFYs3ELZ7QVtjxyrO2LmPsIkz2BgNm5f+JaJUSAOectahgLZnZR+sRXTDtqLOJQAprs0MNTkPzF95nXGKCCnPV2mfR7z8FHcP7AGqO7aTLBGJLgxFOnRKaFnYlY2E9uTPBbB5JjZywlLIWsPKur5G4m1/E9A6DwjMd0fDYnxjj0bQDfaZpBPeGGPFLu5YYn1IDc",
            "Eci": 0
            "AdditionalData": {
                "EphemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoedz1NqI6hs9hEO6dBsnn0X0xp5/DKj3gXirjEqxNIJ8JyhGxVB3ITd0E+6uG4W6Evt+kugG8gOhCBrdUU6JwQ=="
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

| Property                            | Description                                                                                                                  | Type | Size | Required                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type: `ApplePay` / `VisaCheckout`/ `Masterpass`                                                         | Text | 255  | Alphanumeric text                    |
| `Walletkey`                         | Encryption key that identifies stores in Wallets - See WalletKey table for more information                                  | Text | 255  | See `WalletKey` table                |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                         | Text | 255  | See `EphemeralPublicKey` table       |
| `AdditionalData.capturecode`        | ode informed by MasterPass to the merchant                                                                                   | Text | 255  | 3                                    |

#### Sending the card

In the model below, we demonstrate how Apple Pay can be used with sending the card open, without the need for WalletKey.

##### Request

In this model, the merchant only informs that the transaction is from an Apple Pay Wallet and sends the ECI and CAVV data provided by APPLE

- **CAVV** - can be extracted from the `onlinePaymentCryptogram` field returned by Apple in payload
- **ECI** - can be extracted from the `eciIndicator` field returned by Apple in payload

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
    "Amount": 1100,
    "Provider": "Cielo",
    "Installments": 1,
    "CreditCard": {
      "CardNumber": "4532********6521",
      "Holder": "Exemplo Wallet Padrão",
      "ExpirationDate": "12/2021",
      "SecurityCode": "123",
      "Brand": "Master"
    },
    "Currency": "BRL",
    "Wallet": {
      "Type": "ApplePay",
      "Eci": "7",
      "Cavv": "AM1mbqehL24XAAa0J04CAoABFA=="
    }
  }
}
```

| Property                  | Type   | Size | Required | Description                                                                                                                                                                                 |
| ------------------------- | ------ | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36   | Yes      | Store identifier in Cielo.                                                                                                                                                                  |
| `MerchantKey`             | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                                                                                                              |
| `RequestId`               | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                                    |
| `MerchantOrderId`         | Text   | 50   | Yes      | Order ID number.                                                                                                                                                                            |
| `Customer.Name`           | Text   | 255  | No       | Buyer's name.                                                                                                                                                                               |
| `Customer.Status`         | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING).                                                                                                                                        |
| `Payment.Type`            | Text   | 100  | Yes      | Type of the Payment Method.                                                                                                                                                                 |
| `Payment.Amount`          | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                                                                                                                         |
| `Payment.Installments`    | Number | 2    | Yes      | Number of installments.                                                                                                                                                                     |
| `CreditCard.CardNumber.`  | Text   | 19   | Yes      | Buyer's Card Number.                                                                                                                                                                        |
| `CreditCard.SecurityCode` | Text   | 4    | No       | Security code printed on back of card - See Annex.                                                                                                                                          |
| `CreditCard.Brand`        | Text   | 10   | Yes      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                                               |
| `Wallet.Type`             | Text   | 255  | Yes      | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                                                                                         |
| `Wallet.Walletkey`        | Text   | 255  | Yes      | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information                                                                                          |
| `Wallet.ECI`              | Text   | 3    | Yes      | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction. |
| `Wallet.CAVV`             | Text   | 255  | Yes      | Validation field returned by Wallet and used as the authorization basis                                                                                                                     |

##### Response

```json
{
  "MerchantOrderId": "6242-642-723",
  "Customer": {
    "Name": "Exemplo Wallet Padrão",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453265******6521",
      "Holder": "Exemplo Wallet Padrão",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "10447480687BVV8COCRB",
    "ProofOfSale": "457033",
    "Provider": "Cielo",
    "Eci": "7",
    "Wallet": {
      "Type": "ApplePay",
      "Cavv": "AM1mbqehL24XAAa0J04CAoABFA==",
      "Eci": 7
    },
    "VelocityAnalysis": {
      "Id": "98652f2c-bdfd-47b9-8673-77b80a6fe705",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "Amount": 1100,
    "ReceivedDate": "2018-04-18 16:27:22",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "98652f2c-bdfd-47b9-8673-77b80a6fe705",
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

| Property                            | Description                                                                                                                                          | Type | Size | Format                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                                              | Text | 6    | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                                                      | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                                                  | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters                         | Text | 13   | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                                              | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                                                | Text | 2    | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                                                  | Byte | ---  | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                                            | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                                         | Text | 512  | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type: `ApplePay` / `VisaCheckout`/ `Masterpass`                                                                                 | Text | 255  | Alphanumeric text                    |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                                                 | Text | 255  | See `EphemeralPublicKey` table       |
| `AdditionalData.capturecode`        | ode informed by MasterPass to the merchant                                                                                                           | Text | 255  | 3                                    |
| `ECI`                               | The Electronic Commerce Indicator (ECI) indicates the security of a transaction. Must be taken into account by the merchant to decide on the capture | Text | 3    | 2                                    |
| `CAVV`                              | Validation field returned by Wallet and used as the authorization basis                                                                              | Text | 255  | --                                   |

### VisaCheckout

#### Decryption

In the model presented below, we demonstrate how to use the integration VisaCheckout Cielo by sending the WalletKey returned by Visa via Payload

> `Walletkey` is the `CallID` parameter returned by VisaCheckout

##### Request

Default request sample _VisaCheckout_

> It is necessary that the store already has a VisaCheckout integration and registration, otherwise it will not be possible to integrate with the API

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "Comprador Teste"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "SecurityCode": "123"
    },
    "Wallet": {
      "Type": "VisaCheckout",
      "WalletKey": "1140814777695873901"
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
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador Teste"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "SecurityCode":"123",
            },
     "Wallet":{
         "Type":"VisaCheckout",
         "WalletKey":"1140814777695873901"
  }
  }
}

--verbose
```

| Property                  | Type   | Size | Required | Description                                                                              |
| ------------------------- | ------ | ---- | -------- | ---------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36   | Yes      | Store identifier in Cielo.                                                               |
| `MerchantKey`             | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                           |
| `RequestId`               | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. |
| `MerchantOrderId`         | Text   | 50   | Yes      | Order ID number.                                                                         |
| `Customer.Name`           | Text   | 255  | No       | Buyer's name.                                                                            |
| `Customer.Status`         | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING)                                      |
| `Payment.Type`            | Text   | 100  | Yes      | Type of the Payment Method.                                                              |
| `Payment.Amount`          | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                      |
| `Payment.Installments`    | Number | 2    | Yes      | Number of Installments.                                                                  |
| `Payment.ReturnUrl`       | Text   | 1024 | ---      | Required for debit card                                                                  |
| `CreditCard.SecurityCode` | Text   | 4    | No       | Security code printed on back of card - See Annex.                                       |
| `Wallet.Type`             | Text   | 255  | Yes      | indicates the wallet type: "VisaCheckout" or "Masterpass"                                |
| `Wallet.Walletkey`        | Text   | 255  | ---      | Cryptographic key sent by VisaCheckout. Required if TYPE = "Visa Checkout"               |

##### Response

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "comprador VisaCheckout"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "Tid": "0915052340115",
    "Provider": "Simulado",
    "Wallet": {
      "Type": "VisaCheckout",
      "WalletKey": "1140814777695873901",
      "Eci": 0
    },
    "PaymentId": "efdb3338-9c8f-445a-8836-2cc93d8beacf",
    "Type": "CreditCard",
    "Amount": 15700,
    "ReceivedDate": "2016-09-15 17:23:39",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "77",
    "ReturnMessage": "Card Canceled",
    "Status": 3,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/efdb3338-9c8f-445a-8836-2cc93d8beacf"
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
    "Name": "comprador VisaCheckout"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "Tid": "0915052340115",
    "Provider": "Simulado",
    "Wallet": {
      "Type": "VisaCheckout",
      "WalletKey": "1140814777695873901",
      "Eci": 0
    },
    "PaymentId": "efdb3338-9c8f-445a-8836-2cc93d8beacf",
    "Type": "CreditCard",
    "Amount": 15700,
    "ReceivedDate": "2016-09-15 17:23:39",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "77",
    "ReturnMessage": "Card Canceled",
    "Status": 3,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/efdb3338-9c8f-445a-8836-2cc93d8beacf"
      }
    ]
  }
}
```

| Property            | Description                                                                                                                  | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`              | indicates the wallet type: "VisaCheckout" or "Masterpass"                                                                    | Text | 255  | Yes                                  |
| `Walletkey`         | Cryptographic key sent by VisaCheckout                                                                                       | Text | 255  | ---                                  |

#### Sending the card

In the model below, we demonstrate how VisaCheckout can be used with the sending of the open card without a WalletKey.

##### Request

In this model, the merchant only informs that the transaction is from Wallet VisaCheckout and sends the ECI and CAVV data provided by Visa

- **ECI** - returned by Visa on the payload as `DSC_ECI`

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "Comprador Teste"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "Wallet": {
      "Type": "VisaCheckout"
    },
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador Teste"
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "SoftDescriptor":"123456789ABCD",
      "Wallet":{
      "Type":"VisaCheckout"
 },
      "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "Brand":"Visa"
    },
  },
}
--verbose
```

| Property                    | Type   | Size | Required | Description                                                                                    |
| --------------------------- | ------ | ---- | -------- | ---------------------------------------------------------------------------------------------- |
| `MerchantId`                | Guid   | 36   | Yes      | Store identifier in Cielo.                                                                     |
| `MerchantKey`               | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                 |
| `RequestId`                 | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.       |
| `MerchantOrderId`           | Text   | 50   | Yes      | Order ID number.                                                                               |
| `Customer.Name`             | Text   | 255  | No       | Buyer's name.                                                                                  |
| `Customer.Status`           | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING)                                            |
| `Payment.Type`              | Text   | 100  | Yes      | Type of the Payment Method.                                                                    |
| `Payment.Amount`            | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                            |
| `Payment.Installments`      | Number | 2    | Yes      | Number of Installments.                                                                        |
| `Payment.ReturnUrl`         | Text   | 1024 | ---      | Required for debit card                                                                        |
| `CreditCard.CardNumber`     | Text   | 19   | Yes      | Buyer's Card Number.                                                                           |
| `CreditCard.Holder`         | Text   | 25   | No       | Buyer's name printed on card.                                                                  |
| `CreditCard.ExpirationDate` | Text   | 7    | Yes      | Expiry date printed on card.                                                                   |
| `CreditCard.SecurityCode`   | Text   | 4    | No       | Security code printed on back of card - See Annex.                                             |
| `CreditCard.Brand`          | Text   | 10   | Yes      | Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper). |
| `CreditCard.SecurityCode`   | Text   | 4    | No       | Security code printed on back of card - See Annex.                                             |
| `Wallet.Type`               | Text   | 255  | Yes      | indicates the wallet type: "VisaCheckout" or "Masterpass"                                      |

##### Response

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Visa Checkout"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "CreditCard": {
      "CardNumber": "455187******0183",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "674532",
    "Tid": "0305023644309",
    "AuthorizationCode": "123456",
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 15700,
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 1,
    "ReturnCode": "4",
    "ReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Visa Checkout"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "Tid": "0305023644309",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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

| Property            | Description                                                                                                                  | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`              | indicates the wallet type: "VisaCheckout" or "Masterpass"                                                                    | Text | 255  | Yes                                  |

### MasterPass

#### Sending the card

> Wallet MasterPass has integration only in the format `Sending card`.

To use the wallet [**Masterpass**](https://developer.mastercard.com/product/masterpass) it is necessary that the store is already registered with Mastercard, and integrated the search of card data of the platform.

##### Request

Request Sample _Masterpass_

> It is necessary that the store already has a Masterpass integration and registration, otherwise it will not be possible to integrate with the API

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "Comprador MasterPass"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "CreditCard": {
      "CardNumber": "4532117080573703",
      "Brand": "Visa",
      "SecurityCode": "023"
    },
    "Wallet": {
      "Type": "MasterPass",
      "AdditionalData": {
        "CaptureCode": "103"
      }
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
   "MerchantOrderId":"2014111708",
   "Customer":{
      "Name":"Comprador MasterPass"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "CreditCard":{
               "CardNumber": "4532117080573703",
               "Brand": "Visa",
         "SecurityCode":"023"
     },
     "Wallet":{
         "Type":"MasterPass",
         "AdditionalData":{
               "CaptureCode": "103"
         }
     }
   }
}

--verbose
```

| Property                  | Type   | Size | Required | Description                                                                              |
| ------------------------- | ------ | ---- | -------- | ---------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36   | Yes      | Store identifier in Cielo.                                                               |
| `MerchantKey`             | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                           |
| `RequestId`               | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. |
| `MerchantOrderId`         | Text   | 50   | Yes      | Order ID number.                                                                         |
| `Customer.Name`           | Text   | 255  | No       | Buyer's name.                                                                            |
| `Customer.Status`         | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING)                                      |
| `Payment.Type`            | Text   | 100  | Yes      | Type of the Payment Method.                                                              |
| `Payment.Amount`          | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                      |
| `Payment.Installments`    | Number | 2    | Yes      | Number of Installments.                                                                  |
| `CreditCard.CardNumber.`  | Text   | 19   | Yes      | Buyer's Card Number                                                                      |
| `CreditCard.SecurityCode` | Text   | 4    | No       | Security code printed on back of card - See Annex.                                       |
| `Wallet.Type`             | Text   | 255  | Yes      | indicates the wallet type: "VisaCheckout" or "Masterpass"                                |
| `Wallet.AdditionalData`   | ---    | ---  | ---      | Instance for extra data reported by MasterPass. Required only if TYPE = "MasterPass"     |
| `Wallet.capturecode`      | Text   | 255  | Yes      | Code reported by MasterPass to the merchant                                              |

##### Response

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
    "Provider": "Simulado",
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
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/689da793-fc99-4900-89f1-9e7fdaa06ef8"
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
    "Provider": "Simulado",
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
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/689da793-fc99-4900-89f1-9e7fdaa06ef8"
      }
    ]
  }
}
```

| Property            | Description                                                                                                                  | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`              | indicates the wallet type: "VisaCheckout" or "Masterpass"                                                                    | Text | 255  | Yes                                  |
| `Capturecode`       | Code reported by MasterPass to the merchant                                                                                  | Text | 255  | Yes                                  |

### Samsung Pay

#### Prerequisites

To use Samsung **Decryption** format, it is necessary that the store is already registered with [**Samsung**](https://pay.samsung.com/developers) platform. The **Decryption** integration requires the merchant to manually upload a CSR certificate in the PEM format provided by Cielo. Contact the Cielo customer service team to obtain the Certificate.

##### CSR Certificate

After registering with SamsungPay, the store should request a certificate of extension `PEM` to the team of Cielo products. With the certificate, you should follow the following steps:

1. Log in [**Samsung**](https://pay.samsung.com/developers)
2. Select [**My Projects**](https://pay.samsung.com/developers/projects/prdnsvc) para criar serviço
3. Perform the certificate upload
4. End the process.

> The PEM Certificate contains the CSR code requested by Samsung. <br>
> Format of a Certificate `.PEM`

--

> -----BEGIN CERTIFICATE REQUEST-----
> MIICezCCAWMCAQAwODELMAkGA1UEBhMCQlIxEDAOBgNVBAoMB2JyYXNwYWcxFzAV<br>
> BgNVBAMMDmJyYXNwYWcuY29tLmJyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB<br>
> CgKCAQEApsk94DAhdgvgUgGT/fufNkofB2AeX/sPXRT0mm92DM8XgbyWw6FgsE2T<br>
> 3SFi5WmYwDo12tVjAydUCRzMc6HDIrLBFJsfHgrZWLlf9QIPLZFW/zA9+qZLP+VW<br>
> nGyGBil+rgNhylXfDGjCvUMJ5bSLbcC2oC1HGO613HsJrbsB96sE107RkFhDEChD<br>
> 9fZi3MoD2lCwVjbAu/zDatoloxy8Bc02HqlK4sVZuPUzFIZ9gg19G/QU6WI2ompv<br>
> akkhc07xS8QIU/XuzMV5KdpCs/mlRH1QQICSHdviu2UKbKlM9KWqpBOeLwGsQ59P<br>
> mQVb5bPgdAix8KvBAWAi8pcdgjWiIwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBh<br>
> 4XwAmQabopYgJgb+8UwIV+LbWKszwXVUq9nYfiDN0OT4KguilfNQQMHvULlHVahJ<br>
> ibiRsuFfkmEkvGkrUm1IMCHjwZjDzJmbB/7VwqHzq5HJ9pa9Dt6xRO7psCycSE4N<br>
> m+iQs18muHWkzPFouBw+HDVgD8NJZS0mPKSnOmdWpajUHkpDsXY+XctLI2n6NAc3<br>
> sy65A6ljFGpjdHG+aJc7TjzjSBpNXyY5bys5zGF44wgOKq/md5nMp6IeqYAZ+D1N<br>
> aWvYpwra9kiVLR3742JWgF7P25rCdpwzXO9KiD9T8VxYnEZeFli+LQXb7c6UJjHl<br>
> /mYyDuIyBIna9ij0Ygff<br>
> -----END CERTIFICATE REQUEST-----<br>",

#### Decryption

In the model below, we demonstrate how to use the SamsungPay Cielo integration by sending the WalletKey + EphemeralPublicKey returned by Samsung via Payload

##### Request

Request Sample _SamsungPay_

> It is necessary that the store already has a registration and a SamsungPay integration, otherwise it will not be possible to integrate with the API

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
    "Provider": "Cielo",
    "Installments": 1,
    "Currency": "BRL",
    "Wallet": {
      "Type": "SamsungPay",
      "WalletKey": "eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-LldMArSoG59x6i0BbI7jttqxyAdcriSy8q_77VAp3854P9kekjj54RKLrP6APDIr46DI97kjG9E99ONXImnEyamHj95ZH_AW8lvkfa09KAr4537RM8GEXyZoys2vfIW8zqjjicZ8EKIpAixNlmrFJu6-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ"
    }
  }
}
```

| Property                                   | Type   | Size | Required | Description                                                                                            |
| ------------------------------------------ | ------ | ---- | -------- | ------------------------------------------------------------------------------------------------------ |
| `MerchantId`                               | Guid   | 36   | Yes      | Store identifier in Cielo.                                                                             |
| `MerchantKey`                              | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                         |
| `RequestId`                                | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.               |
| `MerchantOrderId`                          | Text   | 50   | Yes      | Order ID number.                                                                                       |
| `Customer.Name`                            | Text   | 255  | No       | Buyer's name.                                                                                          |
| `Customer.Status`                          | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING).                                                   |
| `Payment.Type`                             | Text   | 100  | Yes      | Type of the Payment Method.                                                                            |
| `Payment.Amount`                           | Número | 15   | Yes      | Order Amount (to be sent in cents).                                                                    |
| `Payment.Installments`                     | Número | 2    | Yes      | Number of installments.                                                                                |
| `CreditCard.CardNumber.`                   | Text   | 19   | Yes      | Buyer's Card Number.                                                                                   |
| `CreditCard.SecurityCode`                  | Text   | 4    | No       | Security code printed on back of card - See Annex.                                                     |
| `CreditCard.Brand`                         | Text   | 10   | Yes      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).          |
| `Wallet.Type`                              | Text   | 255  | Yes      | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                    |
| `Wallet.Walletkey`                         | Text   | 255  | Yes      | Cryptographic key that identifies stores in the Wallets - See the WalletKey table for more information |
| `Wallet.AdditionalData.EphemeralPublicKey` | Text   | 255  | Yes      | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                   |
| `Wallet.AdditionalData.capturecode`        | Text   | 255  | Yes      | Code informed by `MasterPass` to the merchant                                                          |

##### Response

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
      "Holder": "Leonardo Romano",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "SamsungPay",
      "WalletKey": "eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-LldMArSoG59x6i0BbI7jttqxyAdcriSy8q_77VAp3854P9kekjj54RKLrP6APDIr46DI97kjG9E99ONXImnEyamHj95ZH_AW8lvkfa09KAr4537RM8GEXyZoys2vfIW8zqjjicZ8EKIpAixNlmrFJu6-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ",
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

| Property                            | Description                                                                                                                  | Type | Size | Format                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                          | Text | 255  | Alphanumeric text                    |
| `Walletkey`                         | Cryptographic key that identifies stores in the Wallets - See the WalletKey table for more information                       | Text | 255  | See `WalletKey` table                |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                         | Text | 255  | See `EphemeralPublicKey` table       |
| `AdditionalData.capturecode`        | Code informed by `MasterPass` to the merchant                                                                                | Text | 255  | 3                                    |

#### Sending the card

In the model below, we demonstrate how SamsungPay can be used with sending the card open, without the need for WalletKey.

##### Request

In this model, the merchant only informs that the transaction is from an SamsungPay and sends the ECI and CAVV data provided by Samsung

- **CAVV** - can be extracted from the `Cryptogram` field returned by Apple Samsung in payload
- **ECI** - returned by Samsung Pay in the payload field `eci_indicator`

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
    "Amount": 1100,
    "Provider": "Cielo",
    "Installments": 1,
    "CreditCard": {
      "CardNumber": "4532********6521",
      "Holder": "Exemplo Wallet Padrão",
      "ExpirationDate": "12/2021",
      "SecurityCode": "123",
      "Brand": "Master"
    },
    "Currency": "BRL",
    "Wallet": {
      "Type": "SamsungPay",
      "Eci": "7",
      "Cavv": "AM1mbqehL24XAAa0J04CAoABFA=="
    }
  }
}
```

| Property                  | Type   | Size | Required | Description                                                                                                                                                                                 |
| ------------------------- | ------ | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36   | Yes      | Store identifier in Cielo.                                                                                                                                                                  |
| `MerchantKey`             | Text   | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                                                                                                              |
| `RequestId`               | Guid   | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                                                                    |
| `MerchantOrderId`         | Text   | 50   | Yes      | Order ID number.                                                                                                                                                                            |
| `Customer.Name`           | Text   | 255  | No       | Buyer's name.                                                                                                                                                                               |
| `Customer.Status`         | Text   | 255  | No       | Buyer registration status in store (NEW / EXISTING).                                                                                                                                        |
| `Payment.Type`            | Text   | 100  | Yes      | Type of the Payment Method.                                                                                                                                                                 |
| `Payment.Amount`          | Number | 15   | Yes      | Order Amount (to be sent in cents).                                                                                                                                                         |
| `Payment.Installments`    | Number | 2    | Yes      | Number of installments.                                                                                                                                                                     |
| `CreditCard.CardNumber.`  | Text   | 19   | Yes      | Buyer's Card Number.                                                                                                                                                                        |
| `CreditCard.SecurityCode` | Text   | 4    | No       | Security code printed on back of card - See Annex.                                                                                                                                          |
| `CreditCard.Brand`        | Text   | 10   | Yes      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                                               |
| `Wallet.Type`             | Text   | 255  | Yes      | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                                                                                         |
| `Wallet.Walletkey`        | Text   | 255  | Yes      | Cryptographic key that identifies stores in the Wallets - See the WalletKey table for more information                                                                                      |
| `Wallet.ECI`              | Text   | 3    | Yes      | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction. |
| `Wallet.CAVV`             | Text   | 255  | Yes      | Validation field returned by Wallet and used as the authorization basis                                                                                                                     |

##### Response

```json
{
  "MerchantOrderId": "6242-642-723",
  "Customer": {
    "Name": "Exemplo Wallet Padrão",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453265******6521",
      "Holder": "Exemplo Wallet Padrão",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "10447480687BVV8COCRB",
    "ProofOfSale": "457033",
    "Provider": "Cielo",
    "Eci": "7",
    "Wallet": {
      "Type": "Samsung",
      "Cavv": "AM1mbqehL24XAAa0J04CAoABFA==",
      "Eci": 7
    },
    "VelocityAnalysis": {
      "Id": "98652f2c-bdfd-47b9-8673-77b80a6fe705",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "Amount": 1100,
    "ReceivedDate": "2018-04-18 16:27:22",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "98652f2c-bdfd-47b9-8673-77b80a6fe705",
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

| Property                            | Description                                                                                                                                                                                 | Type | Size | Format                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                                                                                     | Text | 6    | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                                                                                             | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                                                                                         | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters                                                                | Text | 13   | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                                                                                     | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                                                                                       | Text | 2    | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                                                                                         | Byte | ---  | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                                                                                   | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                                                                                | Text | 512  | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                                                                                         | Text | 255  | Alphanumeric text                    |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                                                                                        | Text | 255  | See `EphemeralPublicKey` table       |
| `AdditionalData.capturecode`        | Code informed by `MasterPass` to the merchant                                                                                                                                               | Text | 255  | 3                                    |
| `ECI`                               | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction. | Text | 3    | 2                                    |
| `CAVV`                              | Validation field returned by Wallet and used as the authorization basis                                                                                                                     | Text | 255  | --                                   |

## QR Code

### Credit card via QR Code - Sandbox

To test a successful authorization scenario via QR Code, use the card **4551.8700.0000.0183**.

The card verification code and expiration date can be random, but they should follow this format:

- CVV with 3 digits;
- Date in the _MM/YYYY_ format.

### Generating a QR Code via API

To create a transaction that will use a credit card, you need to send a request using the `POST` method to the Payment resource, as the example shows. This example includes the minimum necessary fields to be sent for the authorization.

<aside class="notice"><strong>Warning:</strong> It is not possible to make a transaction with the value (`Amount`) 0.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2019010101",
  "Customer": {
    "Name": "QRCode Test"
  },
  "Payment": {
    "Type": "qrcode",
    "Amount": 100,
    "Installments": 1,
    "Capture": false,
    "Modality": "Credit"
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
   "MerchantOrderId":"2019010101",
   "Customer":{
      "Name":"QRCode Test"
   },
   "Payment":{
     "Type":"qrcode",
     "Amount":100,
     "Installments":1,
     "Capture":false,
     "Modality": "Credit"
   }
}
--verbose
```

| PROPERTY               | TYPE    | SIZE | REQUIRED | DESCRIPTION                                                                                                  |
| ---------------------- | ------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `MerchantId`           | Guid    | 36   | Yes      | Store identifier in Cielo.                                                                                   |
| `MerchantKey`          | Text    | 40   | Yes      | Public Key for Double Authentication in Cielo.                                                               |
| `Content-Type`         | Header  | 40   | Yes      | application/json (required).                                                                                 |
| `RequestId`            | Guid    | 36   | No       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                     |
| `MerchantOrderId`      | Text    | 50   | Yes      | Order ID number.                                                                                             |
| `Customer.Name`        | Text    | 255  | No       | Shopper's name                                                                                               |
| `Payment.Type`         | Text    | 100  | Yes      | Type of payment method. Send **qrcode** for a QR Code transaction.                                           |
| `Payment.Amount`       | Number  | 15   | Yes      | Order amount (to be sent in cents).                                                                          |
| `Payment.Installments` | Number  | 2    | Yes      | Number of installments.                                                                                      |
| `Payment.Capture`      | Boolean | -    | No       | Send as **true** for the capture to be authomatic.                                                           |
| `Payment.Modality`     | Text    | 10   | No       | Indicates if the payment will be made with credit or debit. Possible values: "Credit" (standard) or "Debit". |

#### Response

```json
{
  "MerchantOrderId": "2019010101",
  "Customer": {
    "Name": "QRCode Test"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "Provider": "Cielo",
    "Amount": 100,
    "ReceivedDate": "2019-01-02 10:14:29",
    "Status": 12,
    "IsSplitted": false,
    "QrCode": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAQ1klEQVR42u3de6hlVR(...)",
    "ReturnMessage": "QRCode gerado com sucesso",
    "PaymentId": "5d7e8fd3-70b6-4a88-9660-e064d72fdcdd",
    "Type": "qrcode",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/5d7e8fd3-70b6-4a88-9660-e064d72fdcdd"
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
    "MerchantOrderId": "2019010101",
    "Customer": {
        "Name": "QRCode Test"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "Provider": "Cielo",
        "Amount": 100,
        "ReceivedDate": "2019-01-02 10:14:29",
        "Status": 12,
        "IsSplitted": false,
        "QrCodeBase64Image": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAQ1klEQVR42u3de6hlVR(...)",
        "ReturnMessage": "QRCode gerado com sucesso",
        "PaymentId": "5d7e8fd3-70b6-4a88-9660-e064d72fdcdd",
        "Type": "qrcode",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/5d7e8fd3-70b6-4a88-9660-e064d72fdcdd"
            }
        ]
    }
}
```

| PROPERTY            | DESCRIPTION                                                                                                                                                                                     | TYPE | SIZE     | FORMAT                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ------------------------------------ |
| `QrCodeBase64Image` | QR Code codified in base 64. The image can be shown on the page using a HTML code like this:<br><pre lang="html">&lt;img src=&quot;data:image/png;base64, image_code_in_base_64&quot;&gt;</pre> | Text | variable | Alphanumeric text                    |
| `PaymentId`         | Payment ID number.                                                                                                                                                                              | Guid | 36       | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `Status`            | Transaction status. For QR code transactions, the initial status is 12 (Pending).                                                                                                               | Byte | ---      | 2                                    |
| `ReturnCode`        | Acquirer return code.                                                                                                                                                                           | Text | 32       | Alphanumeric text                    |
| `ReturnMessage`     | Acquirer return message.                                                                                                                                                                        | Text | 512      | Alphanumeric text                    |

## Carnê

**Carnê** is a **debit transaction** used to pay an account.

> Carnê is a payment method available for MasterCard, Visa and Elo.

This payment method can be used by merchats who **issue their own booklets and Private Label card invoices**. It allows the **separation of sales** related to **product purchases and payment for services**, making it easier to report values to Tax Authorities.

Like any other debit transaction on our E-commerce, the carnê transactions need to be authenticated via the 3DS 2.0 protocol. Find more information about the authentication protocol on the [**3DS 2.0 guide**](https://developercielo.github.io/en/manual/3ds){:target="\_blank"}.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111704",
  "Customer": {
    "Name": "Comprador Carnet simples"
  },
  "Payment": {
    "Provider": "CieloSandbox",
    "Authenticate": true,
    "Installments": 1,
    "Amount": 100,
    "Type": "DebitCard",
    "SoftDescriptor": "123456789ABCD",
    "DebitCard": {
      "ExpirationDate": "05/2024",
      "CardNumber": "1234567891234567",
      "Holder": "Test Holder",
      "Brand": "Visa",
      "SecurityCode": "123",
      "CardOnFile": {
        "Reason": "Unscheduled",
        "Usage": "first"
      }
    },
    "ExternalAuthentication": {
      "Eci": "05",
      "Cavv": "AAABAWFlmQAAAABjRWWZEEFgFz+=",
      "Xid": "blNhMmtMUWg4RDFoV2JaM1RRbjA="
    },
    "iscarnetransaction": true
  }
}
```

| Property                     | Type    | Size | Required           | Description                                                                            |
| ---------------------------- | ------- | ---- | ------------------ | -------------------------------------------------------------------------------------- |
| `Payment.IsCarneTransaction` | Boolean | ---  | No (default false) | Must be sent with a value of “true” in the case of a Carnê service payment transaction |

## Specific Implementations

### Quasi cash

Quasi Cash transactions are refer to purchases of currencies in online gaming, lottery tickets and more. Only a few MCCs (Merchant Category Codes) can process this type of transaction. Contact the Cielo team to know if your business fits in this category.

E-commerce clients that use Quasi Cash should use a debit or credit transaction request and send it in adding the `QuasiCash` tag as follows:

```json
"Payment":{
   "Currency":"BRL",
   "Country":"BRA",
   "ServiceTaxAmount":0,
   "Installments":1,
   "Interest":"ByMerchant",
   "Capture":true,
   "Authenticate":false,
   "SoftDescriptor":"123456789ABCD",
   "QuasiCash":true,
   "Type":"CreditCard",
   "Amount":15700,
   "CreditCard":{
      "CardNumber":"1234123412341231",
      "Holder":"Teste Holder",
      "ExpirationDate":"12/2030",
      "SecurityCode":"123",
      "SaveCard":"false",
      "Brand":"Visa",
      "CardOnFile":{
         "Usage":"Used",
         "Reason":"Unscheduled"
   }
```

| Property    | Description                          | Value             | Format  | Size | Required |
| ----------- | ------------------------------------ | ----------------- | ------- | ---- | -------- |
| `QuasiCash` | Identifies a Quasi Cash transaction. | "true" ou "false" | Boolean | -    | No       |

### Payment Facilitators

All E-Commerce customers who are **Payment Facilitators, as required by the Card Networks and Central Bank** must submit new fields in **transactional messaging**. Cielo will send the information to the Card Networks through transactional messaging at the time of authorization.

The new fields are contained within the Payment Facilitator node. In addition to the fields of this new node, facilitators will also have to send the `SoftDescriptor` field of the `Payment` node.

> **Warning:** If the card brands identify that the required data wasn't sent in the transactional messaging, they will fine Cielo and these fines will be forwarded to the Facilitator responsible for sending the data.

#### Request

```json
{
  "MerchantOrderId": "2222222222",
  "Customer": {
    "Name": "Comprador Teste",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    }
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 157000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "4024007197692931",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2021",
      "SecurityCode": "123",
      "SaveCard": "false",
      "Brand": "Visa"
    },
    "PaymentFacilitator": {
      "EstablishmentCode": "1234",
      "SubEstablishment": {
        "EstablishmentCode": "1234",
        "Identity": "11111111000100",
        "Mcc": "1234",
        "Address": "Alameda Grajau, 512",
        "City": "Barueri",
        "State": "SP",
        "CountryCode": "076",
        "PostalCode": "06455914",
        "PhoneNumber": "1155855585"
      }
    }
  }
}
```

| Property                                              | Type         | Size | Required                  | Description                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------ | ---- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PaymentFacilitator.EstablishmentCode                  | Number       | 11   | Required for facilitators | Facilitator's establishment code. “Facilitator ID” (Registration of the facilitator with the card brands).<br>The code is different depending on the brand, varying even the size of the field:<br>MasterCard –06 digits<br>Visa –08 digits<br>ELO –from 04 to 05 digits<br>Hipercard –06 digits<br>For other brands, like Amex and JCB, the field can be filled in by "0" zeros. |
| PaymentFacilitator.SubEstablishment.EstablishmentCode | Number       | 15   | Required for facilitators | Sub Merchant establishment code. “Sub-Merchant ID” (Registration of sub-accredited with the facilitator)                                                                                                                                                                                                                                                                          |
| PaymentFacilitator.SubEstablishment.Identity          | Number       | 14   | Required for facilitators | CNPJ or CPF of the sub-merchant.                                                                                                                                                                                                                                                                                                                                                  |
| PaymentFacilitator.SubEstablishment.Mcc               | Number       | 4    | Required for facilitators | MCC do sub Merchant.                                                                                                                                                                                                                                                                                                                                                              |
| PaymentFacilitator.SubEstablishment.Address           | Alphanumeric | 22   | Required for facilitators | Sub Merchant Address.                                                                                                                                                                                                                                                                                                                                                             |
| PaymentFacilitator.SubEstablishment.City              | Alphanumeric | 13   | Required for facilitators | City of the sub Merchant.                                                                                                                                                                                                                                                                                                                                                         |
| PaymentFacilitator.SubEstablishment.State             | Alphanumeric | 2    | Required for facilitators | State do sub Merchant.                                                                                                                                                                                                                                                                                                                                                            |
| PaymentFacilitator.SubEstablishment.PostalCode        | Number       | 9    | Required for facilitators | Sub Merchant Postcode.                                                                                                                                                                                                                                                                                                                                                            |
| PaymentFacilitator.SubEstablishment.CountryCode       | Number       | 3    | Required for facilitators | Sub-merchant country code based on ISO 3166.<br>Ex: Brazil's ISO 3166 code is 076. [Complete list online](https://www.iso.org/obp/ui/#search/code/)                                                                                                                                                                                                                               |
| PaymentFacilitator.SubEstablishment.PhoneNumber       | Number       | 13   | Required for facilitators | Sub Merchant Phone Number.                                                                                                                                                                                                                                                                                                                                                        |
| Payment.Softdescriptor                                | Text         | 13   | Required for facilitators | Text printed on buyer bank invoice. Must be completed according to the data of the sub Merchant.                                                                                                                                                                                                                                                                                  |

<aside class="warning"><b>Attention: Fields mustn't be sent with spacing to the left. It can cause rejection in the settlement of transactions.</b></aside>

#### Response

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador Teste",
    "Identity": "11225468954",
    "IdentityType": "CPF",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    }
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "402400******2931",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "1223092935684",
    "ProofOfSale": "2935684",
    "AuthorizationCode": "065158",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Simulado",
    "IsQrCode": false,
    "PaymentFacilitator": {
      "EstablishmentCode": "1234",
      "SubEstablishment": {
        "EstablishmentCode": "1234",
        "Identity": "11111111000100",
        "Mcc": "1234",
        "Address": "Alameda Grajau, 512",
        "City": "Barueri",
        "State": "SP",
        "CountryCode": "076",
        "PostalCode": "06455914",
        "PhoneNumber": "1155855585"
      }
    },
    "Amount": 157000,
    "ReceivedDate": "2019-12-23 09:29:34",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "365c3a0d-fd86-480b-9279-4ba3da21333c",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/void"
      }
    ]
  }
}
```

| Property                                              | Type         | Size | Required                  | Description                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------ | ---- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PaymentFacilitator.EstablishmentCode                  | Number       | 11   | Required for facilitators | Facilitator's establishment code. “Facilitator ID” (Registration of the facilitator with the card brands).<br>The code is different depending on the brand, varying even the size of the field:<br>MasterCard –06 digits<br>Visa –08 digits<br>ELO –from 04 to 05 digits<br>Hipercard –06 digits<br>For other brands, like Amex and JCB, the field can be filled in by "0" zeros. |
| PaymentFacilitator.SubEstablishment.EstablishmentCode | Number       | 15   | Required for facilitators | Sub Merchant establishment code. “Sub-Merchant ID” (Registration of sub-accredited with the facilitator)                                                                                                                                                                                                                                                                          |
| PaymentFacilitator.SubEstablishment.Identity          | Number       | 14   | Required for facilitators | CNPJ or CPF of the sub-merchant.                                                                                                                                                                                                                                                                                                                                                  |
| PaymentFacilitator.SubEstablishment.Mcc               | Number       | 4    | Required for facilitators | MCC do sub Merchant.                                                                                                                                                                                                                                                                                                                                                              |
| PaymentFacilitator.SubEstablishment.Address           | Alphanumeric | 22   | Required for facilitators | Sub Merchant Address.                                                                                                                                                                                                                                                                                                                                                             |
| PaymentFacilitator.SubEstablishment.City              | Alphanumeric | 13   | Required for facilitators | City of the sub Merchant.                                                                                                                                                                                                                                                                                                                                                         |
| PaymentFacilitator.SubEstablishment.State             | Alphanumeric | 2    | Required for facilitators | State do sub Merchant.                                                                                                                                                                                                                                                                                                                                                            |
| PaymentFacilitator.SubEstablishment.PostalCode        | Number       | 9    | Required for facilitators | Sub Merchant Postcode.                                                                                                                                                                                                                                                                                                                                                            |
| PaymentFacilitator.SubEstablishment.CountryCode       | Number       | 3    | Required for facilitators | Sub-merchant country code based on ISO 3166.<br>Ex: Brazil's ISO 3166 code is 076. [Complete list online](https://www.iso.org/obp/ui/#search/code/)                                                                                                                                                                                                                               |
| PaymentFacilitator.SubEstablishment.PhoneNumber       | Number       | 13   | Required for facilitators | Sub Merchant Phone Number.                                                                                                                                                                                                                                                                                                                                                        |
| Payment.Softdescriptor                                | Text         | 13   | Required for facilitators | Text printed on buyer bank invoice. Must be completed according to the data of the sub Merchant.                                                                                                                                                                                                                                                                                  |

### CBPS Transactions

Entities that operate as CBPS (in Portuguese, Bill Payment Service for Consumers) are companies that offer consolidated bill payment services to the cardholder. CBPS Marking is a Visa-specific option and provides more visibility and accuracy in transactions.

Establishments that operate with this service must be registered with Visa and to operate as such, they must send some additional information through messenger, which is required by the brand. See below:

#### Request

```json
{
  "merchantorderid": "123456ABCD1234",
  "customer": {
    "name": "João das Contas accept",
    "mobile": "5521923455678"
  },
  "payment": {
    "type": "CreditCard",
    "amount": 100,
    "installments": 1,
    "IsCustomerBillPaymentService": true,
    "capture": false,
    "authenticate": false,
    "recurrent": false,
    "provider": "CieloSandbox",
    "creditcard": {
      "cardnumber": "4532110000001234",
      "holder": "Teste Holder",
      "expirationdate": "12/2022",
      "securitycode": "123",
      "brand": "jcb",
      "savecard": true
    },
    "Wallet": {
      "AdditionalData": {
        "Mcc": "1234"
      }
    }
  }
}
```

| Property                     | Type            | Size | Required                   | Description                                                                              |
| ---------------------------- | --------------- | ---- | -------------------------- | ---------------------------------------------------------------------------------------- |
| IsCustomerBillPaymentService | Boolean         | ---  | No                         | True ou false. Indicates whether it's a CBPS (Consumer Bill Payment Service) transaction |
| Wallet.AdditionalData.Mcc    | String (number) | ---  | Yes, for CBPS transactions | Establishment MCC (EC) allowed for CBPS transactions                                     |

### SDWO Transactions

A SDWO (Staged Digital Wallet Operators) company offers e-wallet services, allowing the shopper to pay for a product or service through their own platform, with registered credit or debit cards or generating a QR Code.

To make transactions as a SDWO, the store needs to register it with the card brands. To do that, contact your commercial manager at Cielo for more information.

When the transactions at a SDWO e-commerce are made with a credit or debit card (not by QR Code), additional data is required so the card brands can identify this type of transaction. See the specifications below:

> Besides the specific fields, for SDWO transactions it's required for you to send the Soft Descriptor (`Payment.SoftDescriptor`) and the shopper's CPF or CNPJ (`Customer.Identity` and `Customer.IdentityType`). See more details on the request fields table.

To run tests, you need to follow the [Sandbox and tools](https://developercielo.github.io/en/manual/cielo-ecommerce#sandbox-and-tools){:target="\_blank"}.

Merchant's MCC in a SDWO transaction should use ABECS (Associação Brasileira das Empresas de Cartões de crédito e Serviços) table to check the equivalence between CNAEs to industry's MCCs.

**Warning:** The SDWO category is only available for Visa/Elo debit and credit and Mastercard credit. It also works with foreign cards.

#### Request

```json
{
  "MerchantOrderId": "2012345678",
  "Customer": {
    "Name": "Comprador Carteira",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "CARTEIRA*NOMELOJA",
    "CreditCard": {
      "CardNumber": "4532110000001234",
      "Brand": "Visa",
      "SecurityCode": "123"
    },
    "Wallet": {
      "PlatformOperator": "ABC",
      "AdditionalData": {
        "Mcc": "1234"
      }
    }
  }
}
```

| Property                    | Type            | Size | Required                  | Description                                                                                                                                                                                  |
| --------------------------- | --------------- | ---- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Wallet.PlatformOperator`   | String (text)   | 3    | Yes for SDWO transactions | Acronym for the wallet that's registered in Cielo (check with you commercial manager at Cielo)                                                                                               |
| `Wallet.AdditionalData.Mcc` | String (number) | 4    | Yes for SDWO transactions | Merchant's MCC (for purchase transactions); E-wallet's MCC (for credit supply transactions in the wallet, if applicable – in which the cash in markup also seen in this session is required) |
| `Customer.Identity`         | Text            | 14   | Yes for SDWO transactions | Shopper's CPF or CNPJ number                                                                                                                                                                 |
| `Customer.IdentityType`     | Text            | 255  | Yes for SDWO transactions | Shopper ID Type (CPF/CNPJ).                                                                                                                                                                  |
| `SoftDescriptor`            | Text            | 13   | Yes for SDWO transactions | Text that will be printed on the shopper's bank invoice.<br> Does not allow special characters.<br>Needs to include **Wallet name\*merchant name**.                                          |

### Cash In Transactions

A Cash In transaction is when you add credit to a digital wallet. The merchants that operate this type of transaction should be registered as na E-Wallet along with the card brands and should be registered with one of the following **MCCs**: **6540** ou **6051**.
In addition, you have to send some addictional data in the transaction, to that the brands can identify this type of transaction. See the specifications below:

> In addition to the specific fields of this payment method, for Cash In transactions, it i salso required to send the Soft Descriptor (`Payment.SoftDescriptor`) and the CPF or CNPJ of the shopper (`Customer.Identity` and `Customer.IdentityType`). In case of Cash In, the Soft Descriptor field should be filled in with **name of e-wallet\*name of shopper**. See more details on the request fields table.

**Warning:** The Cash In category is only accepted for the following types and brands: Visa/Mastercard – credit; Elo – debit and credit. Does not work with foreign cards.

#### Request

```json
{
  "MerchantOrderId": "2012345678",
  "Customer": {
    "Name": "Comprador Carteira",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "CARTEIRA*NOMEPORTADOR",
    "CreditCard": {
      "CardNumber": "4532110000001234",
      "Brand": "Visa",
      "SecurityCode": "123"
    },
    "Wallet": {
      "PlatformOperator": "ABC",
      "AdditionalData": {
        "CashIn": "true"
      }
    }
  }
}
```

| Property                    | Type          | Size                           | Required                                           | Description                                                                                                                                         |
| --------------------------- | ------------- | ------------------------------ | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Wallet.PlatformOperator`   | String (text) | 3                              | Yes for Cash In transactions                       | Acronym for the wallet that's registered in Cielo (check with you commercial manager at Cielo)                                                      |
| Wallet.AdditionalData.CshIn | String (text) | - Yes for Cash In transactions | Enviar como “True” se for uma transação de Cash In |
| `Customer.Identity`         | Text          | 14                             | Yes for Cash In transactions                       | Shopper’s CPF or CNPJ number.                                                                                                                       |
| `Customer.IdentityType`     | Text          | 255                            | Yes for Cash In transactions                       | Shopper ID Type (CPF/CNPJ).                                                                                                                         |
| `SoftDescriptor`            | Text          | 13                             | Yes for Cash In transactions                       | Text that will be printed on the shopper's bank invoice.<br> Does not allow special characters.<br>Needs to include **Wallet name\*merchant name**. |

# Tokenization of cards

_What is the **tokenization** of cards?_

It is encryption that allows for secure credit card data storage. This data is transformed into an encrypted code called a “token”, which can be stored in a database. With the tokenization of cards, the merchant will be able to offer features like "1-click buy" and "Retry transaction sending", always preserving the integrity and the confidentiality of the information.

## Creating a tokenized card before authorization

To save a card without authorizing a transaction, simply make a tokenization request with the card data.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/card/</span></aside>

```json
{
  "CustomerName": "Comprador Teste Cielo",
  "CardNumber": "4532117080573700",
  "Holder": "Comprador T Cielo",
  "ExpirationDate": "12/2030",
  "Brand": "Visa"
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/card/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "CustomerName": "Comprador Teste Cielo",
    "CardNumber":"4532117080573700",
    "Holder":"Comprador T Cielo",
    "ExpirationDate":"12/2030",
    "Brand":"Visa"
}
--verbose
```

| Property         | Type | Size | Required | Description                                                               |
| ---------------- | ---- | ---- | -------- | ------------------------------------------------------------------------- |
| `Name`           | Text | 255  | Yes      | Shopper's name.                                                           |
| `CardNumber`     | Text | 16   | Yes      | Shopper's Card Number.                                                    |
| `Holder`         | Text | 25   | Yes      | Shopper's name printed on card.                                           |
| `ExpirationDate` | Text | 7    | Yes      | Expiry date printed on card.                                              |
| `Brand`          | Text | 10   | Yes      | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover). |

### Response

```json
{
  "CardToken": "db62dc71-d07b-4745-9969-42697b988ccb",
  "Links": {
    "Method": "GET",
    "Rel": "self",
    "Href": "https://apiquerydev.cieloecommerce.cielo.com.br/1/card/db62dc71-d07b-4745-9969-42697b988ccb"
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "CardToken": "db62dc71-d07b-4745-9969-42697b988ccb",
  "Links": {
    "Method": "GET",
    "Rel": "self",
    "Href": "https://apiquerydev.cieloecommerce.cielo.com.br/1/card/db62dc71-d07b-4745-9969-42697b988ccb"}
}
```

| Property    | Description                | Type | Size | Format                               |
| ----------- | -------------------------- | ---- | ---- | ------------------------------------ |
| `Cardtoken` | Card identification token. | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## Creating a tokenized card during an authorization

To save a card as a token during a credit card transaction authorization, send the standard request for [credit transaction](https://developercielo.github.io/en/manual/cielo-ecommerce#credit-and-debit-cards){:target="\_blank"} and send the `SaveCard` field as "true".

The response will return with the card token on the `CardToken` field.

## Tokenization by card brands

SoSome card brands have a tokenization solution that offers the storage of cards in safes at the brand itself, in an encrypted form. This brand tokenization is intended to improve the security and quality of card information transmitted, which leads to possible increases in the conversion of approval by issuing banks. See all the benefits:

- **Increased security:** In addition to creating a code (token or DPAN) to replace the card information, the brands also issue cryptograms, which function as a password or signature of the brand, unique to that card at that establishment.
- **Automatic Card Update:** When a new card is issued in place of the previous card, or when a card's expiration date changes, banks send this information to the brand's base, and the brand automatically updates the tokens with the new information. That is, there is no need for any action on the part of the establishment.
- **Higher approval conversion:** Due to the greater security with the flags' tokens, issuing banks feel more secure in approving transactions. Plus, with card data automatically updated, more sales that could be denied by outdated card data can be approved.

**How does it work?**

The participating brands provide APIs for receiving and storing the card securely for acquirers, gateways and partners, with the creation of a exclusive token for that card at that establishment.

Cielo provides these services to customers in two ways:

- **Simple Integration:** The establishment integrates with Cielo's conventional tokenization functionality, which performs the tokenization of the brand behind it, and links these two tokens in Cielo's vault. In this way, merchants will always have a single token for that card, but Cielo will have the brand's tokens and cryptograms internally. To see how the integration with Cielo's conventional tokenization is like, go back to the [Card Tokenization](https://developercielo.github.io/en/manual/cielo-ecommerce#tokenization-of-cards){:target="\_blank"} menu
- Available Brands: Visa;

> To obtain this functionality, contact our E-commerce support channel and request them to enable the card brand token service: cieloecommerce@cielo.com.br

- **External Integration:** if the merchant uses a gateway or another partner that already offers the flag token solution, Cielo has the fields for the token information to be sent in the transaction, so that in the processing the brand receives the token data. See more details on the request below.
- Available brands: Visa, Master and Elo.

Check below the fields to be sent in the transaction if the option chosen is external integration:

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador Teste",
    "Email": "compradorteste@teste.com",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Rua Teste",
      "Number": "123",
      "Complement": "AP 123",
      "ZipCode": "12345987",
      "City": "Rio de Janeiro",
      "State": "RJ",
      "Country": "BRA"
    }
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Currency": "BRL",
    "Country": "BRA",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "Cryptogram": "abcdefghijklmnopqrstuvw==",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "SaveCard": "true",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014111701",
   "Customer":{
      "Name":"Comprador Teste",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "Cryptogram":"abcdefghijklmnopqrstuvw==",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
     }
   }
}
--verbose
```

| Property                            | Type    | Size | Required           | Description                                                                                                                           |
| ----------------------------------- | ------- | ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Payment.CreditCard.CardNumber`     | Text    | 19   | Yes                | Token generated by the brand (DPAN). The indication that the `CardNumber` must be filled with the DPAN in case of brand tokenization. |
| `Payment.CreditCard.Holder`         | Text    | 25   | No                 | Shopper's name printed on card.                                                                                                       |
| `Payment.CreditCard.Cryptogram`     | Text    | 28   | No                 | Cryptogram generated by the card brand.                                                                                               |
| `Payment.CreditCard.ExpirationDate` | Text    | 7    | Yes                | Expiry date of token generated by brand.                                                                                              |
| `Payment.CreditCard.SecurityCode`   | Text    | 4    | No                 | Security code printed on back of card - See Annex.                                                                                    |
| `Payment.CreditCard.SaveCard`       | Boolean | ---  | No (Default false) | Boolean that identifies whether the card will be saved to generate the CardToken.                                                     |
| `Payment.CreditCard.Brand`          | Text    | 10   | Yes                | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                         |

### Response

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": true,
            "CardToken": "d37bf475-307d-47be-b50a-8dcc38c5056c",
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
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
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": true,
            "CardToken": "d37bf475-307d-47be-b50a-8dcc38c5056c"
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

| Property            | Description                                                                                                                  | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`         | Payment ID number.                                                                                                           | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`        | Return code from the Acquirer.                                                                                               | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`     | Return message from the Acquirer.                                                                                            | Text | 512  | Alphanumeric text                    |
| `Cardtoken`         | Card identification token.                                                                                                   | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## Creating a sale with Tokenized Card

To create a tokenized credit card sale, submit a credit transaction requisition with `CardToken` as the following example.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Teste"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
      "SecurityCode": "262",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014111706",
   "Customer":{
      "Name":"Comprador Teste"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":100,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardToken":"6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
         "SecurityCode":"262",
         "Brand":"Visa"
     }
   }
}
--verbose
```

| Property                  | Description                            | Type | Size | Required |
| ------------------------- | -------------------------------------- | ---- | ---- | -------- |
| `CreditCard.CardToken`    | Card identification token.             | Guid | 36   | Yes      |
| `CreditCard.SecurityCode` | Security code printed on back of card. | Text | 4    | No       |
| `CreditCard.Brand`        | Card brand.                            | Text | 10   | Yes      |

### Response

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Teste"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
      "Brand": "Visa"
    },
    "ProofOfSale": "5036294",
    "Tid": "0310025036294",
    "AuthorizationCode": "319285",
    "SoftDescriptor": "123456789ABCD",
    "PaymentId": "c3ec8ec4-1ed5-4f8d-afc3-19b18e5962a8",
    "Type": "CreditCard",
    "Amount": 100,
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "SaveCard": false,
            "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
            "Brand": "Visa"
        },
        "ProofOfSale": "5036294",
        "Tid": "0310025036294",
        "AuthorizationCode": "319285",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "c3ec8ec4-1ed5-4f8d-afc3-19b18e5962a8",
        "Type": "CreditCard",
        "Amount": 100,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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

| Property            | Description                                                                                                                  | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                    | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                 | Text | 512  | Alphanumeric texto                   |

## Creating a sale with Tokenized Card in 1.5

<aside class="warning">This integration aims to serve customers who are migrating from API 1.5 to API 3.0.</aside>

To create a credit card sale with a 1.5 token, it is necessary to make a POST to the Payment resource as shown in the example.

For use in Sandbox, it is possible to simulate authorized or denied transactions via test tokens:

| Status     | Token                                                            |
| ---------- | ---------------------------------------------------------------- |
| Authorized | 6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA |
| Declined   | 6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeB |

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador token 1.5"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "CreditCard": {
      "CardToken": "6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014111706",
   "Customer":{
      "Name":"Comprador token 1.5"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":100,
     "Installments":1,
     "CreditCard":{
        "CardToken":"6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
        "Brand":"Visa"
     }
   }
}
--verbose
```

| Property               | Description                                                                             | Type   | Size | Required |
| ---------------------- | --------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`           | Merchant identifier in API E-commerce Cielo.                                            | Guid   | 36   | Yes      |
| `MerchantKey`          | Public Key for Double Authentication in API E-commerce Cielo.                           | Text   | 40   | Yes      |
| `RequestId`            | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT | Guid   | 36   | No       |
| `MerchantOrderId`      | Order ID number.                                                                        | Text   | 50   | Yes      |
| `Customer.Name`        | Shopper's name.                                                                         | Text   | 255  | No       |
| `Customer.Status`      | Shopper registration status in store (NEW / EXISTING) - Used by fraud analysis          | Text   | 255  | No       |
| `Payment.Type`         | Type of payment method.                                                                 | Text   | 100  | Yes      |
| `Payment.Amount`       | Order Amount (to be sent in cents).                                                     | Number | 15   | Yes      |
| `Payment.Installments` | Number of Installments.                                                                 | Number | 2    | Yes      |
| `CreditCard.CardToken` | Card identification token.                                                              | Guid   | 300  | Yes      |
| `CreditCard.Brand`     | Card brand.                                                                             | Text   | 10   | Yes      |

### Response

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador token 1.5"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
      "Brand": "Visa"
    },
    "Tid": "0307050140148",
    "ProofOfSale": "140148",
    "AuthorizationCode": "045189",
    "Provider": "Simulado",
    "PaymentId": "8c14cdcf-d5a9-46b0-b040-c0d054cd8f76",
    "Type": "CreditCard",
    "Amount": 100,
    "ReceivedDate": "2017-03-07 17:01:40",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "4",
    "ReturnMessage": "Operation Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/void"
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
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador token 1.5"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
      "Brand": "Visa"
    },
    "Tid": "0307050140148",
    "ProofOfSale": "140148",
    "AuthorizationCode": "045189",
    "Provider": "Simulado",
    "PaymentId": "8c14cdcf-d5a9-46b0-b040-c0d054cd8f76",
    "Type": "CreditCard",
    "Amount": 100,
    "ReceivedDate": "2017-03-07 17:01:40",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "4",
    "ReturnMessage": "Operation Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/void"
      }
    ]
  }
}

```

| Property            | Description                                                                                                                  | Type | Size | Format                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ------------------------------------ |
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                      | Text | 6    | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                              | Text | 20   | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                          | Text | 6    | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text | 13   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier Field.                                                                                                      | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                        | Text | 2    | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                          | Byte | ---  | 2                                    |
| `ReturnCode`        | Return code from acquirer.                                                                                                   | Text | 32   | Alphanumeric text                    |
| `ReturnMessage`     | Return message from acquirer.                                                                                                | Text | 512  | Alphanumeric text                    |

# Recurring Payments

Recurring payments are credit card transactions that repeat themselves after a certain period of time.

This type of payment is usually used for **subscriptions**, where the shopper wants to be automatically charged but doesn't want to re-enter the card details.

## Types of recurrences

API E-commerce Cielo works with two types of Recurrences:

- **Merchant Recurrence** - When the **merchant** creates its own repeat purchase intelligence and stores the card data;
- **Scheduled Recurrence** - When **Cielo** is responsible for the repetition intelligence and storage of card data.

### Merchant Recurrence

In this format, the merchant is responsible for creating intelligence to:

| Intelligence                           | Description                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Save transaction data**              | The merchant will need to store the transaction and payment data.                                  |
| **Create transactional repetition**    | The merchant must sent a new transaction whenever it needs an authorization.                       |
| **Procedure for declined transaction** | If one of the transactions is declined, it will be up to the store to "retry" a new authorization. |

> In all instances, the scheduled recurrence is a default transaction for Cielo, its only difference being the need to send an additional parameter that defines it as **Merchant Recurrence**:<br/> > <br/> > **Parameter:** `Payment.Recurrent`= `True`

![Flow recorrência própria]({{ site.baseurl }}/images/apicieloecommerce/recorrencia-cielo-rec-propria-en.png)

#### Merchant Recurrence example

This is an example of how API E-commerce Cielo allows the use of external recurrence systems in your transactions.

Merchant recurrence is a configuration of the API E-commerce Cielo that allows a merchant to use an internal recurrence system specific to their business needs.

In this model, the merchant's system is responsible for defining the period, the transactional data, and, when necessary, sending us the recurrence transaction.

**Merchant Recurence + Tokenized Card**

A gym called Cleverfit has a specific billing system, where the client is charged every fifteen days, but never on weekends.

As a highly customized model, _CleverFit_ has its own recurrence system, using the API E-commerce Cielo via two mechanisms:

1. **Merchant Recurrence** - _CleverFit_ sends the transaction data as a normal sale, but the API identifies it as a recurrence and applies differential authorization rules to the order.
2. **Tokenized Card** - _CleverFit_ keeps cards stored in a tokenized form at Cielo, according to security rules, avoiding storing card data in their system.

_CleverFit_ sends the transaction every fifteen days to the API E-commerce Cielo, using the tokens saved in the API itself and opting for Merchant Recurrence, which changes the authorization rules to suit its billing model.

### Scheduled Recurrence

In this model, Cielo is responsible for the intelligence necessary to perform a recurrence automatically.

The **Scheduled Recurrence** allows the merchant to create a base transaction that, when sent to the API E-commerce Cielo, will be saved and executed following the rules defined by the merchant.

In this model, the API performs and allows:

| Advantages                   | Description                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Saves transactional data** | Save transaction data, thus creating a model of what the next recurrences will look like.                                                    |
| **Automates the recurrence** | Without the need for merchant action, the API creates future transactions according to the store's definitions.                              |
| **Allows updating of data**  | If necessary, the API allows modifications in the transaction information (such as shopper data) or recurrence cycle (such as billing date). |

The Scheduled Recurrence has two request flows; the difference is in the `AuthorizeNow` parameter.

**When the first transaction must be authorized at the time of scheduling, please send `AuthorizeNow` as "true".**

![Flow da primeira transação na hora do agendamento]({{ site.baseurl }}/images/apicieloecommerce/recorrencia-cielo-rec-programada-primeiratransacao-en.png)

\*If Post Notification was enabled by the merchant.

**When the first transaction must be authorized after scheduling, send `AuthorizeNow` as "false"; in this case, also send the `StartDate` parameter.**

![Flow da transação posterior ao agendamento]({{ site.baseurl }}/images/apicieloecommerce/recorrencia-cielo-rec-programada-agendamento-en.png)

\*To schedule the transaction needs the `RecurrentPayment` node, the transaction date and the `AuthorizeNow` field as "false".<br/>
\*\*If Post Notification was enabled by the merchant.

See the example of the snippet with the `RecurrentPayment` node, which must be inserted in a credit transaction.

```json
"RecurrentPayment":
{
       "AuthorizeNow":"False",
       "StartDate":"2019-06-01"
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
}
```

Where can we define the data as:

| Parameters     | Description                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthorizeNow` | Defines the time a recurrence will be created. If it is sent as `True`, it is created at the time of authorization, if sent as false `False`, the recurrence will be suspended until the date chosen to be initiated. |
| `StartDate`    | Defines the date on which the Scheduled Recurrence transaction will be authorized.                                                                                                                                    |
| `EndDate`      | Defines the date the Scheduled Recurrence will end. If it is not sent, the Recurrence will be executed until it is canceled by the merchant.                                                                          |
| `Interval`     | Recurrence interval.<br /><ul><li>Monthly </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual </li></ul>                                                                                        |

> When a transaction is sent to the API E-commerce Cielo with the Scheduled Recurrence node (`RecurrentPayment`), the recurrence process becomes effective when the transaction is considered **AUTHORIZED**. From that point on, the transaction will occur within the interval defined by the merchant.

Important features of **Scheduled Recurrence**:

| Information        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Creation**       | The first transaction is called **"Scheduling Transaction"**, all subsequent transactions will be copies of the first transaction. It does not need to be captured for the recurrence to be created, it just needs to be **AUTHORIZED**                                                                                                                                                                                                                                                                                                                                                                                          |
| **Capture**        | Scheduled Recurrence transactions do not need to be captured. After the first transaction, all recurrence transactions are automatically captured by the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Identification** | Scheduled Recurrence transactions generate two types of identification:<br>**`PaymentId`**: Identifies a transaction. It is the same identifier as the other transactions in the API <br>**`RecurrentPaymentId`**: Identifies recurrence order. A RecurrentPaymentID has many PaymentId's linked to it. This is the variable used to Cancel a Scheduled Recurrence.                                                                                                                                                                                                                                                              |
| **Consulting**     | To consult, just use one of two types of identification:<br>**`PaymentId`**: Used to consult A TRANSACTION WITHIN THE RECURRENCE <br>**`RecurrentPaymentId`**: Used to consult THE RECURRENCE.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Canceling**      | A Scheduled Recurrence can be canceled in two ways: <br><br>**Merchant**: When the merchant requests the canceling of the recurrence. You can't cancel transactions already finalized before the recurrence cancelation order. <br>**By invalid card**: If the API identifies that a saved card is invalid (e.g.: Expired) the recurrence will be canceled and will not be repeated until the merchant updates the payment method. <br> **NOTE:** Canceling transactions within the recurrence does not end the scheduling of future transactions. Only the Cancellation using the **RecurrentPaymentID** ends future schedules. |

**RecurrentPaymentID Structure**

![Estrutura do RecurrentPaymentID]({{ site.baseurl }}/images/apicieloecommerce/recorrencia-cielo-rec-prog-identificacao-en.png)

#### Scheduled Recurrence example

This is an example of how to use API E-commerce Cielo recurrences to increase your sales:

Recurrence is the process of saving a transaction and repeating it at a predefined time interval. Ideal for subscription model.

Cielo' Scheduled Recurrence has the following characteristics:

- **Scheduled intervals:** monthly, bimonthly, quarterly, semi-annual and annual;
- **Expiry date:** allows you to define whether the recurrence has an end date;
- **Retentative:** if a transaction is declined, we will retry the transaction up to 4 times;
- **Update:** allows you to change recurrence data, such as value, interval.

**Monthly and annual recurrence**

Musicfy offers an online subscription service where their customers pay to be able to access a music library and listen to them via streaming.

To capture as many customers as possible, they offer two payment methods:

- Monthly for R$19,90;
- Annual (with discount) for R$180,00.

How do they bill their customers monthly or yearly?

Musicfy uses API E-commerce Cielo's Scheduled Recurrence.

When creating a transaction, _Musicfy_ informs the client that the order in question will be repeated monthly or annually and that there is no end date for the billing.

What are the advantages of using scheduled recurrence for _MusicFy_?

1. **Practicality:** The monthly charge is automatic, so MusicFy does not have to worry about building a billing system.

2. **Usability:** The subscription value can be updated without having to redo the transaction. A month can be canceled or the recurrence can have a delay (the 30-day free model) with only one setting.

3. **Safety:** _MusicFy_ does not need to store sensitive card and shopper data.

4. **Conversion:** Cielo's Scheduled Recurrence has an automatic retry system. If one of the transactions is denied, it will be retried up to four times, seeking to achieve authorization.

## Creating Recurrences

### Creating a Merchant Recurrence

To create a recurring sale in which recurrence and interval process will be performed by the store itself, just make a POST as in the example.

The request follows the structure of a standard credit transaction, but the `Payment.Recurrent` parameter must be `true`; otherwise, the transaction will be denied.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec propria"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "Recurrent": true,
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014113245231706",
   "Customer":{
      "Name":"Comprador rec propria"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "Recurrent": true,
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

| Property                    | Description                                                                                                                  | Type    | Size | Required |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- | ---- | -------- |
| `MerchantId`                | Merchant identifier in API E-commerce Cielo.                                                                                 | Guid    | 6    | Yes      |
| `MerchantKey`               | Public Key for Double Authentication in API E-commerce Cielo.                                                                | Text    | 40   | Yes      |
| `RequestId`                 | Request identifier, used when the merchant uses different servers for each GET/POST/PUT.                                     | Guid    | 36   | No       |
| `MerchantOrderId`           | Order ID number.                                                                                                             | Text    | 50   | Yes      |
| `Customer.Name`             | Shopper's name.                                                                                                              | Text    | 255  | Yes      |
| `Payment.Type`              | Type of the Payment Method.                                                                                                  | Text    | 100  | Yes      |
| `Payment.Amount`            | Order Amount (to be sent in cents).                                                                                          | Number  | 15   | Yes      |
| `Payment.Installments`      | Number of Installments.                                                                                                      | Number  | 2    | Yes      |
| `Payment.SoftDescriptor`    | Text that will be printed on the shopper's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text    | 13   | No       |
| `Payment.Recurrent`         | Marking of an unscheduled recurrence transaction                                                                             | Boolean | 5    | No       |
| `CreditCard.CardNumber`     | Shopper's Card Number.                                                                                                       | Text    | 19   | Yes      |
| `CreditCard.Holder`         | Shopper's name printed on card.                                                                                              | Text    | 25   | No       |
| `CreditCard.ExpirationDate` | Expiration date printed on card.                                                                                             | Text    | 7    | Yes      |
| `CreditCard.SecurityCode`   | Security code printed on back of card.                                                                                       | Text    | 4    | No       |
| `CreditCard.Brand`          | Card brand.                                                                                                                  | Text    | 10   | Yes      |

#### Response

```json
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec propria"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": true,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
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
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec propria"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": true,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

| Property                    | Description                                                                                                                  | Type    | Size | Required |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- | ---- | -------- |
| `MerchantId`                | Store identifier in API E-commerce Cielo.                                                                                    | Guid    | 6    | Yes      |
| `MerchantKey`               | Public Key for Double Authentication in API E-commerce Cielo.                                                                | Text    | 40   | Yes      |
| `RequestId`                 | Request identifier, used when the merchant uses different servers for each GET/POST/PUT.                                     | Guid    | 36   | No       |
| `MerchantOrderId`           | Order ID number.                                                                                                             | Text    | 50   | Yes      |
| `Customer.Name`             | Shopper's name.                                                                                                              | Text    | 255  | No       |
| `Payment.Type`              | Type of the Payment Method.                                                                                                  | Text    | 100  | Yes      |
| `Payment.Amount`            | Order Amount (to be sent in cents).                                                                                          | Number  | 15   | Yes      |
| `Payment.Installments`      | Number of Installments.                                                                                                      | Number  | 2    | Yes      |
| `Payment.SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text    | 13   | No       |
| `Payment.Recurrent`         | Marking of an unscheduled recurrence transaction                                                                             | Boolean | 5    | No       |
| `CreditCard.CardNumber`     | Shopper's Card Number.                                                                                                       | Text    | 19   | Yes      |
| `CreditCard.Holder`         | Shopper's name printed on card.                                                                                              | Text    | 25   | No       |
| `CreditCard.ExpirationDate` | Expiration date printed on card.                                                                                             | Text    | 7    | Yes      |
| `CreditCard.SecurityCode`   | Security code printed on back of card.                                                                                       | Text    | 4    | No       |
| `CreditCard.Brand`          | Card brand.                                                                                                                  | Text    | 10   | Yes      |

### Creating a Scheduled Recurrence

To create a recurring sale in which the first recurrence is authorized with the credit card payment method, just make a POST as in the example.

<aside class="notice"><strong>Warning:</strong> In this recurrence mode, the first transaction must be captured (`AuthorizeNow` = "true"). All subsequent transactions will be captured automatically.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec programada"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "RecurrentPayment": {
      "AuthorizeNow": "true",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual"
    },
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014113245231706",
   "Customer":{
      "Name":"Comprador rec programada"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
     },
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

| Property                                | Description                                                                                                                             | Type    | Size | Required |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- | -------- |
| `MerchantId`                            | Store identifier in API E-commerce Cielo.                                                                                               | Guid    | 6    | Yes      |
| `MerchantKey`                           | Public Key for Double Authentication in API E-commerce Cielo.                                                                           | Text    | 40   | Yes      |
| `RequestId`                             | Request identifier, used when the merchant uses different servers for each GET/POST/PUT.                                                | Guid    | 36   | No       |
| `MerchantOrderId`                       | Order ID number.                                                                                                                        | Text    | 50   | Yes      |
| `Customer.Name`                         | Shopper's name.                                                                                                                         | Text    | 255  | Yes      |
| `Payment.Type`                          | Type of the Payment Method.                                                                                                             | Text    | 100  | Yes      |
| `Payment.Amount`                        | Order Amount (to be sent in cents).                                                                                                     | Number  | 15   | Yes      |
| `Payment.Installments`                  | Number of Installments.                                                                                                                 | Number  | 2    | Yes      |
| `Payment.SoftDescriptor`                | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters            | Text    | 13   | No       |
| `Payment.RecurrentPayment.EndDate`      | End date for recurrence.                                                                                                                | Text    | 10   | No       |
| `Payment.RecurrentPayment.Interval`     | Recurrence interval.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> | Text    | 10   | No       |
| `Payment.RecurrentPayment.AuthorizeNow` | Boolean to know if the first recurrence is going to be Authorized or not.                                                               | Boolean | ---  | Yes      |
| `CreditCard.CardNumber`                 | Shopper's Card Number.                                                                                                                  | Text    | 19   | Yes      |
| `CreditCard.Holder`                     | Shopper's name printed on card.                                                                                                         | Text    | 25   | No       |
| `CreditCard.ExpirationDate`             | Expiration date printed on card.                                                                                                        | Text    | 7    | Yes      |
| `CreditCard.SecurityCode`               | Security code printed on back of card.                                                                                                  | Text    | 4    | No       |
| `CreditCard.Brand`                      | Card brand.                                                                                                                             | Text    | 10   | Yes      |

#### Response

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec programada"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "123412******1231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "3827556",
    "Tid": "0504043827555",
    "AuthorizationCode": "149867",
    "SoftDescriptor": "123456789ABCD",
    "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
    "Type": "CreditCard",
    "Amount": 1500,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ExtraDataCollection": [],
    "Status": 1,
    "ReturnCode": "4",
    "ReturnMessage": "Operation Successful",
    "RecurrentPayment": {
      "RecurrentPaymentId": "61e5bd30-ec11-44b3-ba0a-56fbbc8274c5",
      "NextRecurrency": "2015-11-04",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual",
      "Link": {
        "Method": "GET",
        "Rel": "recurrentPayment",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
      },
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
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
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec programada"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "RecurrentPayment": {
            "RecurrentPaymentId": "61e5bd30-ec11-44b3-ba0a-56fbbc8274c5",
            "NextRecurrency": "2015-11-04",
            "EndDate": "2019-12-01",
            "Interval": "SemiAnnual",
            "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

| Property             | Description                                                               | Type    | Size | Format                                                                                             |
| -------------------- | ------------------------------------------------------------------------- | ------- | ---- | -------------------------------------------------------------------------------------------------- |
| `RecurrentPaymentId` | Next recurrence Identifier field.                                         | Guid    | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                               |
| `NextRecurrency`     | Date of next recurrence.                                                  | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `EndDate`            | End date of recurrence.                                                   | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `Interval`           | Interval between recurrences.                                             | Text    | 10   | <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
| `AuthorizeNow`       | Boolean to know if the first recurrence is about to be Authorized or not. | Boolean | ---  | true ou false                                                                                      |

## Scheduling a Scheduled Recurrence

To create a recurring sale in which the first recurrence will not be authorized on the same date with the credit card payment method, just make a POST as in the example.

Unlike the previous recurrence, this example does not authorize immediately, it schedules a future authorization. To schedule the first transaction in the series of recurrences, send the `AuthorizeNow` parameter as “false” and add the `StartDate` parameter.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec programada"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "RecurrentPayment": {
      "AuthorizeNow": "false",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual",
      "StartDate": "2015-06-01"
    },
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014113245231706",
   "Customer":{
      "Name":"Comprador rec programada"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"false",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual",
       "StartDate":"2015-06-01"
     },
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

| Property                              | Description                                                                              | Type | Size | Required |
| ------------------------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`                          | Store identifier in API E-commerce.                                                      | Guid | 36   | Yes      |
| `MerchantKey`                         | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes      |
| `RequestId`                           | Request identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No       |
| `RecurrentPaymentId`                  | Recurrence identification number.                                                        | Text | 50   | Yes      |
| `Customer.Name`                       | Shopper's name.                                                                          | Text | 255  | No       |
| `Customer.Status`                     | Shopper registration status in store (NEW / EXISTING) - Used by fraud analysis           | Text | 255  | No       |
| `Customer.Email`                      | Shopper's e-mail.                                                                        | Text | 255  | No       |
| `Customer.Birthdate`                  | Shopper's date of birth.                                                                 | Date | 10   | No       |
| `Customer.Identity`                   | Shopper's RG, CPF or CNPJ number.                                                        | Text | 14   | No       |
| `Customer.Address.Street`             | Shopper's address.                                                                       | Text | 255  | No       |
| `Customer.Address.Number`             | Shopper's address number.                                                                | Text | 15   | No       |
| `Customer.Address.Complement`         | Shopper's address complement.                                                            | Text | 50   | No       |
| `Customer.Address.ZipCode`            | Shopper's address zip code.                                                              | Text | 9    | No       |
| `Customer.Address.City`               | Shopper's address city.                                                                  | Text | 50   | No       |
| `Customer.Address.State`              | Shopper's address state.                                                                 | Text | 2    | No       |
| `Customer.Address.Country`            | Shopper's address country.                                                               | Text | 35   | No       |
| `Customer.Address.District`           | Shopper's neighborhood.                                                                  | Text | 50   | No       |
| `Customer.DeliveryAddress.Street`     | Shopper's address.                                                                       | Text | 255  | No       |
| `Customer.DeliveryAddress.Number`     | Shopper's address number.                                                                | Text | 15   | No       |
| `Customer.DeliveryAddress.Complement` | Shopper's address complement.                                                            | Text | 50   | No       |
| `Customer.DeliveryAddress.ZipCode`    | Shopper's address zip code.                                                              | Text | 9    | No       |
| `Customer.DeliveryAddress.City`       | Shopper's address city.                                                                  | Text | 50   | No       |
| `Customer.DeliveryAddress.State`      | Shopper's address state.                                                                 | Text | 2    | No       |
| `Customer.DeliveryAddress.Country`    | Shopper's address country.                                                               | Text | 35   | No       |
| `Customer.DeliveryAddress.District`   | Shopper's neighborhood.                                                                  | Text | 50   | No       |

### Response

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec programada"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "123412******1231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "SoftDescriptor": "123456789ABCD",
    "Type": "CreditCard",
    "Amount": 1500,
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 20,
    "RecurrentPayment": {
      "RecurrentPaymentId": "0d2ff85e-594c-47b9-ad27-bb645a103db4",
      "NextRecurrency": "2015-06-01",
      "StartDate": "2015-06-01",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual",
      "Link": {
        "Method": "GET",
        "Rel": "recurrentPayment",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{PaymentId}"
      },
      "AuthorizeNow": false
    }
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec programada"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "SoftDescriptor":"123456789ABCD",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ExtraDataCollection": [],
        "Status": 20,
        "RecurrentPayment": {
            "RecurrentPaymentId": "0d2ff85e-594c-47b9-ad27-bb645a103db4",
            "NextRecurrency": "2015-06-01",
            "StartDate": "2015-06-01",
            "EndDate": "2019-12-01",
            "Interval": "SemiAnnual",
            "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{PaymentId}"
            },
            "AuthorizeNow": false
        }
    }
}
```

| Property             | Description                                                               | Type    | Size | Format                                                                                             |
| -------------------- | ------------------------------------------------------------------------- | ------- | ---- | -------------------------------------------------------------------------------------------------- |
| `RecurrentPaymentId` | Next recurrence Identifier field.                                         | Guid    | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                               |
| `NextRecurrency`     | Date of next recurrence.                                                  | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `StartDate`          | Start date of recurrence.                                                 | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `EndDate`            | End date of recurrence.                                                   | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `Interval`           | Interval between recurrences.                                             | Text    | 10   | <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
| `AuthorizeNow`       | Boolean to know if the first recurrence is about to be Authorized or not. | Boolean | ---  | true ou false                                                                                      |

## Modifying Recurrences

### Modifying shopper data

To change the shopper's data for the recurrent transactions, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Customer</span></aside>

```json
{
  "Name": "Customer",
  "Email": "customer@teste.com",
  "Birthdate": "1999-12-12",
  "Identity": "22658954236",
  "IdentityType": "CPF",
  "Address": {
    "Street": "Rua Teste",
    "Number": "174",
    "Complement": "AP 201",
    "ZipCode": "21241140",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BRA"
  },
  "DeliveryAddress": {
    "Street": "Outra Rua Teste",
    "Number": "123",
    "Complement": "AP 111",
    "ZipCode": "21241111",
    "City": "Qualquer Lugar",
    "State": "QL",
    "Country": "BRA",
    "District": "Teste"
  }
}
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Customer"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
      "Name":"Customer",
      "Email":"customer@teste.com",
      "Birthdate":"1999-12-12",
      "Identity":"22658954236",
      "IdentityType":"CPF",
      "Address":{
         "Street":"Rua Teste",
         "Number":"174",
         "Complement":"AP 201",
         "ZipCode":"21241140",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
      "DeliveryAddress":{
         "Street":"Outra Rua Teste",
         "Number":"123",
         "Complement":"AP 111",
         "ZipCode":"21241111",
         "City":"Qualquer Lugar",
         "State":"QL",
         "Country":"BRA",
        "District":"Teste"
      }
   }
--verbose
```

| Property                              | Description                                                                              | Type | Size | Required                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | --------------------------------------- |
| `MerchantId`                          | Store identifier in API E-commerce Cielo.                                                | Guid | 36   | Yes                                     |
| `MerchantKey`                         | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes                                     |
| `RequestId`                           | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No                                      |
| `RecurrentPaymentId`                  | Recurrence identification number.                                                        | Text | 50   | Yes                                     |
| `Customer.Name`                       | Shopper's name.                                                                          | Text | 255  | No                                      |
| `Customer.Status`                     | Shopper registration status in store (NEW / EXISTING) - Used by fraud analysis           | Text | 255  | No                                      |
| `Customer.Email`                      | Shopper's e-mail.                                                                        | Text | 255  | No                                      |
| `Customer.Birthdate`                  | Shopper's date of birth.                                                                 | Date | 10   | No                                      |
| `Customer.Identity`                   | Shopper's RG, CPF or CNPJ number.                                                        | Text | 14   | No                                      |
| `Customer.IdentityType`               | Text                                                                                     | 255  | No   | Type of shopper ID document (CFP/CNPJ). |
| `Customer.Address.Street`             | Shopper's address.                                                                       | Text | 255  | No                                      |
| `Customer.Address.Number`             | Shopper's address number.                                                                | Text | 15   | No                                      |
| `Customer.Address.Complement`         | Shopper's address complement.                                                            | Text | 50   | No                                      |
| `Customer.Address.ZipCode`            | Shopper's address zip code.                                                              | Text | 9    | No                                      |
| `Customer.Address.City`               | Shopper's address city.                                                                  | Text | 50   | No                                      |
| `Customer.Address.State`              | Shopper's address state.                                                                 | Text | 2    | No                                      |
| `Customer.Address.Country`            | Shopper's address country.                                                               | Text | 35   | No                                      |
| `Customer.Address.District`           | Shopper's neighborhood.                                                                  | Text | 50   | No                                      |
| `Customer.DeliveryAddress.Street`     | Shopper's address.                                                                       | Text | 255  | No                                      |
| `Customer.DeliveryAddress.Number`     | Shopper's address number.                                                                | Text | 15   | No                                      |
| `Customer.DeliveryAddress.Complement` | Shopper's address complement.                                                            | Text | 50   | No                                      |
| `Customer.DeliveryAddress.ZipCode`    | Shopper's address zip code.                                                              | Text | 9    | No                                      |
| `Customer.DeliveryAddress.City`       | Shopper's address city.                                                                  | Text | 50   | No                                      |
| `Customer.DeliveryAddress.State`      | Shopper's address state.                                                                 | Text | 2    | No                                      |
| `Customer.DeliveryAddress.Country`    | Shopper's address country.                                                               | Text | 35   | No                                      |
| `Customer.DeliveryAddress.District`   | Shopper's neighborhood.                                                                  | Text | 50   | No                                      |

#### Response

```shell

HTTP Status 200

```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Modifying end date of Recurrence

To change the end date of the Recurrence, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/EndDate</span></aside>

```json
"2021-01-09"
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/EndDate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
"2021-01-09"
--verbose
```

| Property             | Description                                                                              | Type | Size | Required |
| -------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                | Guid | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No       |
| `RecurrentPaymentId` | Recurrence identification number.                                                        | Text | 50   | Yes      |
| `EndDate`            | End date for recurrence.                                                                 | Text | 10   | Yes      |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Modifying Recurrence interval

To change the Recurrence Interval, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Interval</span></aside>

```json
6
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Interval"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
6
--verbose
```

| Property             | Description                                                                                                             | Type   | Size | Request |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------ | ---- | ------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                                               | Guid   | 36   | Yes     |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                                                           | Text   | 40   | Yes     |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                | Guid   | 36   | No      |
| `RecurrentPaymentId` | Recurrence identification number.                                                                                       | Text   | 50   | Yes     |
| `Interval`           | Recurrence interval. <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> | Number | 2    | Yes     |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Modify day of Recurrence

To modify the day of recurrence, just do a PUT as in the example.

When changing the day of recurrence, consider the following rules for executing the update in the API:

1. If the new day entered is after the current day, we will update the day of the recurrence with effect on the next recurrence.
   Ex.: Today is May 5 and the next recurrence is May 25. When updated to the 10th, the next recurrence date will be the on May 10.

2. If the new day entered is before the current day, we will update the day of the recurrence, but this will only take effect after the next recurrence is successfully executed.
   Ex.: Today is May 5 and the next recurrence is May 25. When updated to the 3rd, the date of the next recurrence will remain on May 25. After its execution, the next recurrence will be scheduled for June 3.

3. If the new day entered is before the current day, but the next recurrence is in another month, we will update the day of the recurrence with effect on the next recurrence.
   Ex.: Today is May 5 and the next recurrence is September 25. When updated to the 3rd, the date of the next recurrence will be September 3.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay</span></aside>

```json
16
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
16
--verbose
```

| Property             | Description                                                                              | Type   | Size | Required |
| -------------------- | ---------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                | Guid   | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                            | Text   | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid   | 36   | No       |
| `RecurrentPaymentId` | Recurrence identification number.                                                        | Text   | 50   | Yes      |
| `RecurrencyDay`      | Recurrence day.                                                                          | Number | 2    | Yes      |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Modifying the Recurrence value

To modify the value of the recurrence, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Amount</span></aside>

```json
156
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Amount"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
156
--verbose
```

| Property             | Description                                                                              | Type   | Size | Required |
| -------------------- | ---------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                | Guid   | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                            | Text   | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid   | 36   | No       |
| `RecurrentPaymentId` | Recurrence identification number.                                                        | Text   | 50   | Yes      |
| `Payment.Amount`     | Order Value in cents; 156 equals R$ 1,56.                                                | Number | 15   | Yes      |

<aside class="warning">This change only affects the payment date of the next recurrence.</aside>

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Modifying date of next payment

To change the date of the next payment, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate</span></aside>

```json
"2016-06-15"
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
"2016-06-15"
--verbose
```

| Property             | Description                                                                              | Type | Size | Required |
| -------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                | Guid | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No       |
| `RecurrentPaymentId` | Recurrence identification number.                                                        | Text | 50   | Yes      |
| `NextPaymentDate`    | Payment date of the next recurrence.                                                     | Text | 10   | Yes      |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Modifying Recurrence payment data

To change the payment data of the recurrence, just do a PUT as in the example.

<aside class="notice"><strong>Warning:</strong> This change affects all `Payment` node data. So to keep the previous data you must inform the fields that will not be changed with the same values ​​that were already saved.</aside>

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Payment</span></aside>

```json
{
  "Type": "CreditCard",
  "Amount": "123",
  "Installments": 3,
  "Country": "USA",
  "Currency": "BRL",
  "SoftDescriptor": "123456789ABCD",
  "CreditCard": {
    "Brand": "Master",
    "Holder": "Teset card",
    "CardNumber": "1234123412341232",
    "ExpirationDate": "12/2030"
  }
}
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Payment"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "Type":"CreditCard",
   "Amount":"123",
   "Installments":3,
   "Country":"USA",
   "Currency":"BRL",
   "SoftDescriptor":"123456789ABCD",
   "CreditCard":{
      "Brand":"Master",
      "Holder":"Teset card",
      "CardNumber":"1234123412341232",
      "ExpirationDate":"12/2030"
   }
}
--verbose
```

| Property                    | Description                                                                                                                  | Type   | Size | Required |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`                | Store identifier in API E-commerce Cielo.                                                                                    | Guid   | 36   | Yes      |
| `MerchantKey`               | Public Key for Double Authentication in API E-commerce Cielo.                                                                | Text   | 40   | Yes      |
| `RequestId`                 | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                                     | Guid   | 36   | No       |
| `RecurrentPaymentId`        | Recurrence identification number.                                                                                            | Text   | 50   | Yes      |
| `Payment.Type`              | Type of the Payment Method.                                                                                                  | Text   | 100  | Yes      |
| `Payment.Amount`            | Order Amount (to be sent in cents).                                                                                          | Number | 15   | Yes      |
| `Payment.Installments`      | Number of Installments.                                                                                                      | Number | 2    | Yes      |
| `Payment.SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters | Text   | 13   | No       |
| `CreditCard.CardNumber`     | Shopper's Card Number.                                                                                                       | Text   | 16   | Yes      |
| `CreditCard.Holder`         | Shopper's name printed on card.                                                                                              | Text   | 25   | No       |
| `CreditCard.ExpirationDate` | Expiry date printed on card.                                                                                                 | Text   | 7    | Yes      |
| `CreditCard.SecurityCode`   | Security code printed on back of card                                                                                        | Text   | 4    | No       |
| `CreditCard.Brand`          | Card brand.                                                                                                                  | Text   | 10   | Yes      |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Disabling a Recurrent Order

To disable a recurrent order, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Deactivate</span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Deactivate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Property             | Description                                                                              | Type | Size | Required |
| -------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                | Guid | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No       |
| `RecurrentPaymentId` | Recurrence identification number.                                                        | Text | 50   | Yes      |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

### Rehabilitating a Recurrent Order

To rehabilitate a recurring order, just do a PUT as in the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Reactivate</span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Reactivate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Property             | Description                                                                              | Type | Size | Required |
| -------------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                                | Guid | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No       |
| `RecurrentPaymentId` | Recurrence identification number.                                                        | Text | 50   | Yes      |

#### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code) for the list with all HTTP status codes possibly returned by the API.

## Renova Fácil

Renova Fácil is a service developed by Cielo together with issuers. The objective of the service is to increase the conversion rate of recurring transactions with credit and debit cards.

By identifying expired cards at the time of the transaction, the transaction is authorized with the new card. The API then returns the updated card data so that the merchant stores the new card.

<aside class="notice">To use Renova Fácil, you have to to enable the service at Cielo. No extra information is sent in the authorization request, however the response will include the `NewCard` node, both for credit and debit transactions.</aside>

Below is an example of a response to a credit transaction.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador Renova facil"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "RecurrentPayment": {
      "AuthorizeNow": "true",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual"
    },
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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
   "MerchantOrderId":"2014113245231706",
   "Customer":{
      "Name":"Comprador Renova facil"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
     },
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

| Property                                | Description                                                                                                                             | Type    | Size | Required |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- | -------- |
| `MerchantId`                            | Store identifier in API E-commerce Cielo.                                                                                               | Guid    | 6    | Yes      |
| `MerchantKey`                           | Public Key for Double Authentication in API E-commerce Cielo.                                                                           | Text    | 40   | Yes      |
| `RequestId`                             | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT                                                 | Guid    | 36   | No       |
| `MerchantOrderId`                       | Order ID number.                                                                                                                        | Text    | 50   | Yes      |
| `Customer.Name`                         | Shopper's name.                                                                                                                         | Text    | 255  | No       |
| `Customer.Status`                       | Shopper's registration status in store (NEW / EXISTING) - Used by fraud analysis                                                        | Text    | 255  | No       |
| `Payment.Type`                          | Type of the Payment Method.                                                                                                             | Text    | 100  | Yes      |
| `Payment.Amount`                        | Order Amount (to be sent in cents).                                                                                                     | Number  | 15   | Yes      |
| `Payment.Installments`                  | Number of Installments.                                                                                                                 | Number  | 2    | Yes      |
| `Payment.SoftDescriptor`                | Text that will be printed on the shopper's bank invoice - Available only for VISA/MASTER - does not allow special characters            | Text    | 13   | No       |
| `Payment.RecurrentPayment.EndDate`      | End date for recurrence.                                                                                                                | Text    | 10   | No       |
| `Payment.RecurrentPayment.Interval`     | Recurrence interval.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> | Text    | 10   | No       |
| `Payment.RecurrentPayment.AuthorizeNow` | Boolean to know if the first recurrence is about to be Authorized or not.                                                               | Boolean | ---  | Yes      |
| `CreditCard.CardNumber`                 | Shopper's Card Number.                                                                                                                  | Text    | 19   | Yes      |
| `CreditCard.Holder`                     | Shopper's name printed on card.                                                                                                         | Text    | 25   | No       |
| `CreditCard.ExpirationDate`             | Expiry date printed on card.                                                                                                            | Text    | 7    | Yes      |
| `CreditCard.SecurityCode`               | Security code printed on back of card.                                                                                                  | Text    | 4    | No       |
| `CreditCard.Brand`                      | Card brand.                                                                                                                             | Text    | 10   | Yes      |

### Response

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador  Renova facil"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "123412******1231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "10447480685P4611AQ9B",
    "ProofOfSale": "087001",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Cielo",
    "Eci": "0",
    "NewCard": {
      "CardNumber": "40000000000000000",
      "ExpirationDate": "10/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "VelocityAnalysis": {
      "Id": "94f06657-c715-45d2-a563-63f7dbb19e08",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "94f06657-c715-45d2-a563-63f7dbb19e08",
    "Type": "CreditCard",
    "Amount": 1500,
    "ReceivedDate": "2016-12-26 14:14:21",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "KA",
    "ReturnMessage": "Autorizacao negada",
    "Status": 3,
    "RecurrentPayment": {
      "ReasonCode": 7,
      "ReasonMessage": "Declined",
      "EndDate": "2019-12-01",
      "Interval": 6,
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/94f06657-c715-45d2-a563-63f7dbb19e08"
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
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador  Renova facil"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "123412******1231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "10447480685P4611AQ9B",
    "ProofOfSale": "087001",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Cielo",
    "Eci": "0",
 "NewCard": {
       "CardNumber": "40000000000000000",
       "ExpirationDate": "10/2020",
       "SaveCard": false,
        "Brand": "Visa"
    },
    "VelocityAnalysis": {
      "Id": "94f06657-c715-45d2-a563-63f7dbb19e08",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "94f06657-c715-45d2-a563-63f7dbb19e08",
    "Type": "CreditCard",
    "Amount": 1500,
    "ReceivedDate": "2016-12-26 14:14:21",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "KA",
    "ReturnMessage": "Autorizacao negada",
    "Status": 3,
    "RecurrentPayment": {
      "ReasonCode": 7,
      "ReasonMessage": "Declined",
      "EndDate": "2019-12-01",
      "Interval": 6,
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/94f06657-c715-45d2-a563-63f7dbb19e08"
      }
    ]
  }
}
```

| Property             | Description                                                               | Type    | Size | Format                                                                                             |
| -------------------- | ------------------------------------------------------------------------- | ------- | ---- | -------------------------------------------------------------------------------------------------- |
| `RecurrentPaymentId` | Next recurrence Identifier field.                                         | Guid    | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                               |
| `NextRecurrency`     | Date of next recurrence.                                                  | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `EndDate`            | End date of recurrence.                                                   | Text    | 7    | 12/2030 (MM/YYYY)                                                                                  |
| `Interval`           | Interval between recurrences.                                             | Text    | 10   | <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
| `AuthorizeNow`       | Boolean to know if the first recurrence is about to be Authorized or not. | Boolean | ---  | true ou false                                                                                      |

| Property                 | Description                                                            | Type    | Size | Required |
| ------------------------ | ---------------------------------------------------------------------- | ------- | ---- | -------- |
| `NewCard.CardNumber`     | Shopper's new card number.                                             | Text    | 16   | Yes      |
| `NewCard.ExpirationDate` | New expiry date of the card.                                           | Text    | 7    | Yes      |
| `NewCard.Brand`          | Card brand.                                                            | Text    | 10   | Yes      |
| `NewCard.SaveCard`       | Identifies whether the card generated Cardtoken during the transaction | Boolean | ---  | Yes      |

### Card Brands and Issuers Enabled

Card Brands and Issuers that are already with Renova Fácil enabled:

| Issuers           | VISA | MASTER | ELO |
| ----------------- | ---- | ------ | --- |
| `BRADESCO`        | Yes  | Yes    | Yes |
| `BANCO DO BRASIL` | Yes  | ---    | --- |
| `SANTANDER`       | Yes  | ---    | --- |
| `CITI`            | Yes  | ---    | --- |
| `BANCO PAN`       | Yes  | ---    | --- |

# Queries, Capture and Cancellation

## Getting details on transactions

### Searching for a transaction via PaymentId

To get details on a credit card transaction via PaymentId, follow the request example below.

<aside class="notice">Only transactions made within the last three months are eligible for queries.</aside>

#### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/{PaymentId}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Property      | Description                                                                              | Type | Size | Required |
| ------------- | ---------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`  | Store identifier in API E-commerce Cielo.                                                | Guid | 36   | Yes      |
| `MerchantKey` | Public Key for Double Authentication in API E-commerce Cielo.                            | Text | 40   | Yes      |
| `RequestId`   | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid | 36   | No       |
| `PaymentId`   | Payment identification number.                                                           | Text | 36   | Yes      |

#### Response

```json
}
"MerchantOrderId": "2014111706",
"AcquirerOrderId": "202202231037440D1BD0",
"Customer": {
    "Name": "Comprador Teste",
    "Address": {}
},
"Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "CreditCard": {
        "CardNumber": "455187******0183",
        "Holder": "Teste Holder",
        "ExpirationDate": "12/2030",
        "SaveCard": false,
        "Brand": "Visa",
        "PaymentAccountReference":"92745135160550440006111072222"
    },
    "ProofOfSale": "674532",
    "Tid": "0223103744208",
    "AuthorizationCode": "123456",
    "Chargebacks": [
        {
            "Amount": 10000,
            "CaseNumber": "123456",
            "Date": "2022-06-04",
            "ReasonCode": "104",
            "ReasonMessage": "Outras Fraudes - Cartao Ausente",
            "Status": "Received",
            "RawData": "Client did not participate and did not authorize transaction"
        }
    ],
    "FraudAlert": {
        "Date": "2022-05-20",
        "ReasonMessage": "Uso Ind Numeração",
        "IncomingChargeback": false
    },
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2022-07-29 17:16:21",
    "CapturedAmount": 9000,
    "CapturedDate": "2022-07-29 17:16:22",
    "VoidedAmount": 1000,
    "VoidedDate": "2022-05-15 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 1,
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "capture",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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
    "MerchantOrderId": "2014111706",
    "AcquirerOrderId": "202202231037440D1BD0",
    "Customer": {
        "Name": "Comprador Teste",
        "Address": {}
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222"
        },
        "ProofOfSale": "674532",
        "Tid": "0223103744208",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 10000,
        "ReceivedDate": "2022-07-29 17:16:21",
        "CapturedAmount": 9000,
        "CapturedDate": "2022-07-29 17:16:22",
        "VoidedAmount": 1000,
        "VoidedDate": "2022-05-15 16:25:38",
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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

|Property|Description|Type|Size|Format|
|`MerchantOrderId`|Order identification number.|Text|50|Text alphanumeric|
|`AcquirerOrderId`|Transaction Id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols.|Text|50|Text alphanumeric|
|`AuthorizationCode`|Authorization code.|Text|6|Text alphanumeric|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status.|Byte|2|-|
|`Customer.Name`|Shopper name.|Text|255|-|
|`Customer.Status`|Shopper registration status in the store (NEW / EXISTING).|Text|255|-|
|`Payment.ProofOfSale`|Authorization number, identical to NSU.|Text|6|Text alphanumeric|
|`Payment.Tid`|Transaction Id in the payment method provider.|Text|40|Text alphanumeric|
|`Payment.Type`|Type of payment method.|Text|100|-|
|`Payment.Amount`|Order Amount (to be shipped in cents).|Number|15|-|
|`Payment.ReceivedDate`|Date when the transaction was received.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.CapturedAmount`|Captured value.|Number|15|10000|
|`Payment.CapturedDate`|Capture date.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.VoidedAmount`|Canceled/refunded amount, in cents.|Number|15|10000|
|`Payment.VoidedDate`|Date of cancellation/chargeback.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.Provider`|Defines behavior of the means of payment (see files attached)/NOT MANDATORY FOR CREDIT.|Text|15|-|
|`CreditCard.CardNumber`|Shopper's Card Number|Text|19|-|
|`CreditCard.Holder`|Shopper's name printed on card|Text|25|-|
|`CreditCard.ExpirationDate`|Expiration date printed on card.|Text|7|-|
|`CreditCard.SecurityCode`|Security code printed on the back of the card.|Text|4|-|
|`CreditCard.Brand`|Card brand.|Text|10|-|
|`CreditCard.PaymentAccountReference`|PAR (Payment Account Reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to E-commerce Cielo customers. If the brand does not send the information, the field will not be returned.|Number|29|-|

### Searching for a transaction via TId

To get details on a credit card transaction using the TId number, follow the request example..

<aside class="notice">Only transactions made within the last three months are eligible for queries.</aside>

#### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/acquirerTid/{TID}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/acquirerTid/{TID}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Property          | Description                                                                                               | Type | Size | Required |
| ----------------- | --------------------------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`      | Store identifier in API E-commerce Cielo.                                                                 | Guid | 36   | Yes      |
| `MerchantKey`     | Public Key for Double Authentication in API E-commerce Cielo.                                             | Text | 40   | Yes      |
| `RequestId`       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                  | Guid | 36   | No       |
| `AcquirerOrderId` | Transaction Id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols. | Text | 50   | Yes      |
| `TId`             | Payment identification number at the acquirer.                                                            | Text | 36   | Sim      |

#### Response

```json
}
"MerchantOrderId": "2014111706",
"AcquirerOrderId": "202202231037440D1BD0",
"Customer": {
    "Name": "Comprador Teste",
    "Address": {}
},
"Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "CreditCard": {
        "CardNumber": "455187******0183",
        "Holder": "Teste Holder",
        "ExpirationDate": "12/2030",
        "SaveCard": false,
        "Brand": "Visa",
        "PaymentAccountReference":"92745135160550440006111072222"
    },
    "ProofOfSale": "674532",
    "Tid": "0223103744208",
    "AuthorizationCode": "123456",
    "Chargebacks": [
        {
            "Amount": 10000,
            "CaseNumber": "123456",
            "Date": "2022-06-04",
            "ReasonCode": "104",
            "ReasonMessage": "Outras Fraudes - Cartao Ausente",
            "Status": "Received",
            "RawData": "Client did not participate and did not authorize transaction"
        }
    ],
    "FraudAlert": {
        "Date": "2022-05-20",
        "ReasonMessage": "Uso Ind Numeração",
        "IncomingChargeback": false
    },
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2022-07-29 17:16:21",
    "CapturedAmount": 9000,
    "CapturedDate": "2022-07-29 17:16:22",
    "VoidedAmount": 1000,
    "VoidedDate": "2022-05-15 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 1,
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "capture",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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
    "MerchantOrderId": "2014111706",
    "AcquirerOrderId": "202202231037440D1BD0",
    "Customer": {
        "Name": "Comprador Teste",
        "Address": {}
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222"
        },
        "ProofOfSale": "674532",
        "Tid": "0223103744208",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 10000,
        "ReceivedDate": "2022-07-29 17:16:21",
        "CapturedAmount": 9000,
        "CapturedDate": "2022-07-29 17:16:22",
        "VoidedAmount": 1000,
        "VoidedDate": "2022-05-15 16:25:38",
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
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

|Property|Description|Type|Size|Format|
|`MerchantOrderId`|Order identification number.|Text|50|Alphanumeric|
|`AcquirerOrderId`|Transaction Id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols.|Text|50|Alphanumeric|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status.|Byte|2|-|
|`Customer.Name`|Shopper name.|Text|255|-|
|`Customer.Status`|Shopper registration status in the store (NEW / EXISTING).|Text|255|-|
|`Payment.ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric|
|`Payment.Tid`|Transaction Id in the payment method provider.|Text|40|Alphanumeric|
|`Payment.Type`|Type of payment method.|Text|100|-|
|`Payment.Amount`|Order Amount (to be shipped in cents).|Number|15|-|
|`Payment.ReceivedDate`|Date when the transaction was received.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.CapturedAmount`|Captured value.|Number|15|10000|
|`Payment.CapturedDate`|Capture date.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.VoidedAmount`|Canceled/refunded amount, in cents.|Number|15|10000|
|`Payment.VoidedDate`|Date of cancellation/chargeback.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.Provider`|Defines behavior of the means of payment (see files attached)/NOT MANDATORY FOR CREDIT.|Text|15|-|
|`CreditCard.CardNumber`|Shopper's Card Number|Text|19|-|
|`CreditCard.Holder`|Shopper's name printed on card|Text|25|-|
|`CreditCard.ExpirationDate`|Expiration date printed on card.|Text|7|-|
|`CreditCard.SecurityCode`|Security code printed on the back of the card.|Text|4|-|
|`CreditCard.Brand`|Card brand.|Text|10|-|
|`CreditCard.PaymentAccountReference`|PAR (Payment Account Reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to E-commerce Cielo customers. If the brand does not send the information, the field will not be returned.|Number|29|-|

### Searhing for a transaction via MerchandOrderID

For some merchants, the `MerchantOrderId` may have multiple transactions. The query for `MerchantOrderId` returns the `PaymentId` of all transactions associated with a `MerchantOrderId`.

Considering this, it is possible to query details of each transaction by [searching with `PaymentId`](https://developercielo.github.io/en/manual/cielo-ecommerce#searching-for-a-transaction-via-paymentid){:target="\_blank"}

#### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales?merchantOrderId={merchantOrderId}</span></aside>

```shell
curls
--request GET " https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales?merchantOrderId={merchantOrderId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Property          | Description                                                                             | Type | Size | Required |
| ----------------- | --------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`      | Store identifier in API E-commerce Cielo.                                               | Guid | 36   | Yes      |
| `MerchantKey`     | Public Key for Double Authentication in API E-commerce Cielo.                           | Text | 40   | Yes      |
| `RequestId`       | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT | Guid | 36   | No       |
| `MerchantOrderId` | Order Identifier Field at the Store.                                                    | Text | 36   | Yes      |

#### Response

```json
{
  "Payment": [
    {
      "PaymentId": "5fb4d606-bb63-4423-a683-c966e15399e8",
      "ReceveidDate": "2015-04-06T10:13:39.42"
    },
    {
      "PaymentId": "6c1d45c3-a95f-49c1-a626-1e9373feecc2",
      "ReceveidDate": "2014-12-19T20:23:28.847"
    }
  ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Payment": [
        {
            "PaymentId": "5fb4d606-bb63-4423-a683-c966e15399e8",
            "ReceveidDate": "2015-04-06T10:13:39.42"
        },
        {
            "PaymentId": "6c1d45c3-a95f-49c1-a626-1e9373feecc2",
            "ReceveidDate": "2014-12-19T20:23:28.847"
        }
    ]
}
```

| Property    | Description             | Type | Size | Format                               |
| ----------- | ----------------------- | ---- | ---- | ------------------------------------ |
| `PaymentId` | Order Identifier Field. | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

### Searching for recurrence information

The Recurrence query provides data on the scheduling and on the process of repeating transactions. The Recurrence query does not return data about the transactions themselves.

For information about each transaction, [search via PaymentId](https://developercielo.github.io/en/manual/cielo-ecommerce#searching-for-a-transaction-via-paymentid){:target="\_blank"}

#### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Property             | Description                                                                             | Type | Size | Required |
| -------------------- | --------------------------------------------------------------------------------------- | ---- | ---- | -------- |
| `MerchantId`         | Store identifier in API E-commerce Cielo.                                               | Guid | 36   | Yes      |
| `MerchantKey`        | Public Key for Double Authentication in API E-commerce Cielo.                           | Text | 40   | Yes      |
| `RequestId`          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT | Guid | 36   | No       |
| `RecurrentPaymentId` | Recurrence Identifier Field.                                                            | Text | 36   | Yes      |

#### Response

```json
{
  "Customer": {
    "Name": "Fulano da Silva"
  },
  "RecurrentPayment": {
    "RecurrentPaymentId": "c30f5c78-fca2-459c-9f3c-9c4b41b09048",
    "NextRecurrency": "2017-06-07",
    "StartDate": "2017-04-07",
    "EndDate": "2017-02-27",
    "Interval": "Bimonthly",
    "Amount": 15000,
    "Country": "BRA",
    "CreateDate": "2017-04-07T00:00:00",
    "Currency": "BRL",
    "CurrentRecurrencyTry": 1,
    "Provider": "Simulado",
    "RecurrencyDay": 7,
    "SuccessfulRecurrences": 0,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/c30f5c78-fca2-459c-9f3c-9c4b41b09048"
      }
    ],
    "RecurrentTransactions": [
      {
        "PaymentId": "f70948a8-f1dd-4b93-a4ad-90428bcbdb84",
        "PaymentNumber": 0,
        "TryNumber": 1
      }
    ],
    "Status": 1
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Customer": {
        "Name": "Fulano da Silva"
    },
    "RecurrentPayment": {
        "RecurrentPaymentId": "c30f5c78-fca2-459c-9f3c-9c4b41b09048",
        "NextRecurrency": "2017-06-07",
        "StartDate": "2017-04-07",
        "EndDate": "2017-02-27",
        "Interval": "Bimonthly",
        "Amount": 15000,
        "Country": "BRA",
        "CreateDate": "2017-04-07T00:00:00",
        "Currency": "BRL",
        "CurrentRecurrencyTry": 1,
        "Provider": "Simulado",
        "RecurrencyDay": 7,
        "SuccessfulRecurrences": 0,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/c30f5c78-fca2-459c-9f3c-9c4b41b09048"
            }
        ],
        "RecurrentTransactions": [
            {
                "PaymentId": "f70948a8-f1dd-4b93-a4ad-90428bcbdb84",
                "PaymentNumber": 0,
                "TryNumber": 1
            }
        ],
        "Status": 1
    }
}
```

| Property                                   | Description                                                | Type   | Size | Format                                                                                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `RecurrentPaymentId`                       | Next recurrence Identifier field.                          | Guid   | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                                                         |
| `NextRecurrency`                           | Date of next recurrence.                                   | Text   | 7    | 12/2030 (MM/YYYY)                                                                                                                                            |
| `StartDate`                                | Start date of recurrence.                                  | Text   | 7    | 12/2030 (MM/YYYY)                                                                                                                                            |
| `EndDate`                                  | End date of recurrence.                                    | Text   | 7    | 12/2030 (MM/YYYY)                                                                                                                                            |
| `Interval`                                 | Interval between recurrences.                              | Text   | 10   | <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>                                                           |
| `CurrentRecurrencyTry `                    | Indicates the number of attempts of the current recurrence | Number | 1    | 1                                                                                                                                                            |
| `OrderNumber`                              | Order identification at the store                          | Text   | 50   | 2017051101                                                                                                                                                   |
| `Status`                                   | Recurrent order status                                     | Number | 1    | <br>_1_ - Active <br>_2_ - Finished <br>_3_- Deactivated by the Merchant <br> _4_ - Disabled by number of retries <br> _5_ - Disabled by expired credit card |
| `RecurrencyDay`                            | Recurrence day                                             | Number | 2    | 22                                                                                                                                                           |
| `SuccessfulRecurrences`                    | Successful amount of recurrence                            | Number | 2    | 5                                                                                                                                                            |
| `RecurrentTransactions.RecurrentPaymentId` | Recurrence Id                                              | Guid   | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                                                         |
| `RecurrentTransactions.TransactionId`      | Payment ID of the transaction generated on recurrence      | Guid   | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                                                         |
| `RecurrentTransactions.PaymentNumber`      | Number of Recurrence. The first one is zero                | Number | 2    | 3                                                                                                                                                            |
| `RecurrentTransactions.TryNumber`          | Number of current attempt at the specific recurrence       | Number | 2    | 1                                                                                                                                                            |

## Capture

The **capture** is an exclusive procedure for credit card transactions. There are two types of capture:

- Automatic capture: it is requested in the same [credit transaction authorization request]() sending the `Payment.Capture` as "true".
- Post capture: it is requested after sending the authorization request for the credit transaction.
  <br/>
  <br/>
  **In this section, we present the guidelines for doing the _post capture_**.

When carrying out a capture, the merchant confirms that the amount authorized on the card may be charged by the financial institution issuing the card.

**Important**:

- The capture executes the charge of the card;
- Capture includes the sale value on the shopper's invoice;
- The merchant only pays Cielo for captured transactions.

<aside class="notice"><strong>Warning:</strong> The capture is a process with a default deadline of 15 days. Check your Cielo registration to confirm the limit enabled for your affiliation. After this period, it is not possible to capture the transaction. If the transaction is not captured, the authorization will expire and so the cardholder's card will not be charged and the limit will be released.</aside>

### Partial or total capture

You can capture a partial amount or the total amount of the transaction.

**Partial capture** is the act of capturing a value less than the authorized value. This capture model can only occur once per transaction.

**After capture, it is not possible to perform additional captures in the same order.**

#### Request

*For **partial capture**, send the `Amount` field in the capture request with the value you want to capture;
*For **total capture**, do not send the `Amount` field. The total value of the authorization will be considered.

<aside class="warning">The `ServiceTaxAmount` field is unique to airlines.</aside>
<br/>
<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount={Valor}"</span></aside>

```json

https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture

```

```shell
curl
--request PUT "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

| Property           | Description                                                                                                                                                                            | Type   | Size | Required |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`       | Store identifier in API E-commerce Cielo.                                                                                                                                              | Guid   | 36   | Yes      |
| `MerchantKey`      | Public Key for Double Authentication in API E-commerce Cielo.                                                                                                                          | Text   | 40   | Yes      |
| `RequestId`        | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT                                                                                                | Guid   | 36   | No       |
| `PaymentId`        | Order Identifier Field.                                                                                                                                                                | Guid   | 36   | Yes      |
| `Amount`           | Order Amount (to be sent in cents).                                                                                                                                                    | Number | 15   | No       |
| `ServiceTaxAmount` | Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value. | Number | 15   | No       |

#### Response

```json
{
  "Status": 2,
  "Tid": "0719094510712",
  "ProofOfSale": "4510712",
  "AuthorizationCode": "693066",
  "ReturnCode": "6",
  "ReturnMessage": "Operation Successful",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
    },
    {
      "Method": "PUT",
      "Rel": "void",
      "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
    }
  ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Status": 2,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
```

| Property            | Description                             | Type | Size | Format       |
| ------------------- | --------------------------------------- | ---- | ---- | ------------ |
| `Status`            | Transaction Status.                     | Byte | ---  | 2            |
| `ProofOfSale`       | Authorization number, identical to NSU. | Text | 6    | Alphanumeric |
| `Tid`               | Transaction Id on the acquirer.         | Text | 20   | Alphanumeric |
| `AuthorizationCode` | Authorization code.                     | Text | 6    | Alphanumeric |
| `ReturnCode`        | Return code of acquirer.                | Text | 32   | Alphanumeric |
| `ReturnMessage`     | Return message of acquirer.             | Text | 512  | Alphanumeric |

<aside class="notice"><strong>Boarding tax capture</strong> To capture the *boarding tax*, simply add the value of the ServiveTaxAmount to be captured</aside>

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount=xxx</span></aside>
## Canceling a transaction

Cancellation is a feature that allows the merchant to reverse a purchase order. Cancellation can occur due to insufficient stock or due to withdrawal of the purchase by the consumer, among other reasons.

In the API E-commerce Cielo it is possible to make the cancellation request for **debit and credit cards**.

- For **authorized and uncaptured transactions** (transactional status = 1), cancellation may be requested before the transaction is automatically rolled back.

- For **captured transactions** (transactional status = 2), cancellation can be requested 1 day after the capture and up to 360 days after the sale is authorized. The approval of this cancellation order is subject to the assessment of the balance in the merchant's financial agenda at the time of the request and the approval of the bank issuing the card used in the transaction.

For cancellation requests of the same transaction, it is necessary to wait a period of 5 seconds between one request and another, so that the balance inquiry, reserve the amount in the financial agenda and awareness of the balance can be carried out, thus avoiding duplicate cancellations. This rule applies to total and partial cancellations. To identify that cancellation requests are from the same transaction, we consider the EC number, cancellation authorization number, date of sale, sale amount, and NSU.

> It is important to point out that, in order to make any cancellation request, it is necessary that the merchant has sufficient balance in the transaction and in the agenda.

### Total cancellation

You can cancel a sale via `PaymentId` or `MerchantOrderId` (order number).

<aside class="notice"><strong>Attention:</strong> Cancellation by MerchantOrderId always affects the newest transaction, so if there are orders with a duplicate order number, only the current order will be cancelled. The previous order cannot be canceled by this method.</aside>

#### Request

**Cancellation via PaymentId**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=xxx</span></aside>

ou

**Cancellation via MerchantOrderId**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/OrderId/{MerchantOrderId}/void?amount=xxx</span></aside>

The following example displays the cancellation request via `PaymentId`.

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

| Property      | Description                                                                              | Type   | Size | Required |
| ------------- | ---------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`  | Store identifier in API E-commerce Cielo                                                 | Guid   | 36   | Yes      |
| `MerchantKey` | Public Key for Double Authentication in API E-commerce Cielo.                            | Text   | 40   | Yes      |
| `RequestId`   | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT. | Guid   | 36   | No       |
| `PaymentId`   | Payment ID number.                                                                       | Guid   | 36   | Yes      |
| `Amount`      | Order Amount (to be sent in cents).                                                      | Number | 15   | No       |

#### Response

```json
{
  "Status": 10,
  "Tid": "0719094510712",
  "ProofOfSale": "4510712",
  "AuthorizationCode": "693066",
  "ReturnCode": "9",
  "ReturnMessage": "Operation Successful",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
    }
  ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Status": 10,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReturnCode": "9",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        }
    ]
}
```

| Property            | Description                             | Type | Size | Format       |
| ------------------- | --------------------------------------- | ---- | ---- | ------------ |
| `Status`            | Transaction Status.                     | Byte | ---  | 2            |
| `ProofOfSale`       | Authorization number, identical to NSU. | Text | 6    | Alphanumeric |
| `Tid`               | Transaction Id on the acquirer.         | Text | 20   | Alphanumeric |
| `AuthorizationCode` | Authorization code.                     | Text | 6    | Alphanumeric |
| `ReturnCode`        | Return code of acquirer.                | Text | 32   | Alphanumeric |
| `ReturnMessage`     | Return message of acquirer.             | Text | 512  | Alphanumeric |

### Partial cancellation

**Partial cancellation** is the act of canceling an amount less than the total amount that was authorized and captured. This cancellation model can occur numerous times, until the full amount of the transaction is canceled.

> **Partial cancellation** is only available for **captured transactions**.

<aside class="notice"><strong>Attention:</strong> The API returns the sum of the total of partial cancellations, that is, if you make three partial cancellations of R$10.00, the API will present in the response a total of R$30.00 canceled.</aside>

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=XXX </span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void?amount=XXX"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

| Property      | Description                                                                             | Type   | Size | Required |
| ------------- | --------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `MerchantId`  | Store identifier in API E-commerce Cielo.                                               | Guid   | 36   | Yes      |
| `MerchantKey` | Public Key for Double Authentication in API E-commerce Cielo.                           | Text   | 40   | Yes      |
| `RequestId`   | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT | Guid   | 36   | No       |
| `PaymentId`   | Order Identifier Field.                                                                 | Guid   | 36   | Yes      |
| `Amount`      | Order Amount (to be sent in cents).                                                     | Number | 15   | No       |

#### Response

```json
{
  "Status": 2,
  "Tid": "0719094510712",
  "ProofOfSale": "4510712",
  "AuthorizationCode": "693066",
  "ReasonCode": 0,
  "ReasonMessage": "Successful",
  "ProviderReturnCode": "0",
  "ProviderReturnMessage": "Operation Successful",
  "ReturnCode": "0",
  "ReturnMessage": "Operation Successful",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8"
    },
    {
      "Method": "PUT",
      "Rel": "void",
      "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8/void"
    }
  ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Status": 2,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8/void"
        }
    ]
}
```

| Property                | Description                             | Type | Size | Format       |
| ----------------------- | --------------------------------------- | ---- | ---- | ------------ |
| `Status`                | Transaction Status.                     | Byte | ---  | 2            |
| `ProofOfSale`           | Authorization number, identical to NSU. | Text | 6    | Alphanumeric |
| `Tid`                   | Transaction Id on the acquirer.         | Text | 20   | Alphanumeric |
| `AuthorizationCode`     | Authorization code.                     | Text | 6    | Alphanumeric |
| `ReturnCode`            | Return code of acquirer.                | Text | 32   | Alphanumeric |
| `ReturnMessage`         | Return message of acquirer.             | Text | 512  | Alphanumeric |
| `ProviderReturnCode`    | Provider return code.                   | Text | 32   | Alphanumeric |
| `ProviderReturnMessage` | Provider return message.                | Text | 512  | Alphanumeric |

<aside class="notice"><strong>Cancellation of Boarding Tax</strong>: To cancel the *boarding tax*, simply add the value of the ServiveTaxAmount to be canceled</aside>

```
https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/void?amount={Valor}&serviceTaxAmount=xxx
```

### Cancellation Return Codes

| RETURN CODE | DESCRIPTION |
| 6 | Partial cancellation request successfully approved |
| 9 | Total cancellation request successfully approved |
| 72 | Error: Insufficient merchant balance for sale cancellation |
| 77 | Error: Original sale not found for cancellation |
| 100 | Error: Payment method and/or flag do not allow cancellation |
| 101 | Error: Requested cancellation amount above the allowed cancellation deadline |
| 102 | Error: Requested cancellation above the original transaction amount |
| 103 | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 104 | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 105 | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 106 | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 107 | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 108 | Error: Merchant Number (EC) not found. Please check the number sent |
| 475 | Processing failed. Please try again |

### Cancellation via Cielo website

It is possible to carry out both the total cancellation and the partial cancellation via the Cielo website.

# Notification Post

**Notification Post** is a **webhook** that sends notifications about changes in transaction status or recurring order creation.

During your cielo registration, you must set up an endpoint for Cielo to send notifications and you can also configure the events for which you want to receive notifications.

### Notified Events

Events that can be notified by payment method are:

| Payment Method          | Events that can be notified             |
| ----------------------- | --------------------------------------- |
| **Credit Card**         | Capture;<br/>Cancellation;<br/>Queries. |
| **Debit Card**          | Capture;<br/>Queries.                   |
| **Boleto**              | Conciliation;<br/>Manual cancellation   |
| **Electronic transfer** | Confirmed transers.                     |

Notification also occurs at events related to **Cielo Scheduled Recurrence**:

| Recurrence Events                                                       |
| ----------------------------------------------------------------------- |
| Disabled when reaching maximum number of attempts (denied transactions) |
| Rehabilitation                                                          |
| Finalized / Completion date reached                                     |
| Deactivation                                                            |
| Creation of the recurring order recurrence transaction.                 |

> Events are only notified when you request this type of notification from Cielo Support.

### Notification Endpoint

You must report an endpoint (`PAYMENT STATUS URL`) to Cielo Support for the Notification Post to run.

Characteristics of `Payment Status URL`

- Must be **static**;
- Limit of 255 characters.

Characteristics of **Post notification**

- It is sent every 30 minutes;
- In the event of a failure, three retries are made.

> To increase security, you can register header return information for your endpoint. With this, your endpoint will only accept the notification if Cielo sends the header.

To set up the header information, please inform Cielo Support of the following:

- `KEY` - Parameter name
- `VALUE` - Static value to be returned

You can register up to 3 types of return information in the header.

> The **merchant should return** in response to the notification: **HTTP Status Code 200 OK**.

The content of the notification will consist of three fields:

- `RecurrentPaymentId`: identifier that represents a set of recurring transactions;
- `PaymentId`: payment identification number;
- `ChangeType`: specifies the type of notification.

Using this data you can identify the transaction via `PaymentId` or `RecurrentPaymentId` and the change that ocurred. After the notification, you can get more details about the transaction by [Searching for a transaction via PaymentId](https://developercielo.github.io/en/manual/cielo-ecommerce#searching-for-a-transaction-via-paymentid){:target="\_blank"} or by [Searching for recurrence information](https://developercielo.github.io/en/manual/cielo-ecommerce#searching-for-recurrence-information){:target="\_blank"}

Here's an example of the Notification Post content:

```json
{
  "RecurrentPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "PaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "ChangeType": "2"
}
```

```shell
curl
--header "key: value"
{
   "RecurrentPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "PaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "ChangeType": "2"
}
```

| Property             | Description                                                                            | Type   | Size | Required |
| -------------------- | -------------------------------------------------------------------------------------- | ------ | ---- | -------- |
| `RecurrentPaymentId` | Identifier representing the Recurring request (only applicable for ChangeType 2 or 4). | GUID   | 36   | No       |
| `PaymentId`          | Payment identification number.                                                         | GUID   | 36   | Yes      |
| `ChangeType`         | Specifies the type of notification.                                                    | Number | 1    | Yes      |

### ChangeType table

| ChangeType | Description                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1          | Payment status change.                                                                                                                                              |
| 2          | Recurrence created.                                                                                                                                                 |
| 3          | Antifraude status change. Exclusive for customers integrated with Antifraude.                                                                                       |
| 4          | Recurring payment status change (eg automatic deactivation).                                                                                                        |
| 5          | Cancellation denied.                                                                                                                                                |
| 7          | Chargeback notification. Exclusive for customers integrated with [Risk Notification API](https://braspag.github.io//en/manual/risknotification){:target="\_blank"}. |
| 8          | Fraud alert.                                                                                                                                                        |

# BIN Query

**BIN Query** is a **card data search** service, whether credit or debit, which identifies card characteristics based on the first digits and returns information that allows you to validate the data filled in on the checkout screen.

- **Card Brand:** brand name;
- **Card Type:** credit, debit or multiple (credit and debit);
- **Card Nationality:** foreign or national (Brazil);
- **Card:** whether or not the card is corporate;
- **Issuing Bank:** code and name;
- **Prepaid card:** whether or not the card is prepaid.

This information allows you to take actions at the time of payment to improve the store's conversion rates.

<aside class="warning">BIN Query must be enabled by Cielo Support Team. Contact them to enable the service.</aside>

## Use Case

Based on the result of the BIN Query, you can develop functionalities in your checkout to improve usability for shoppers and, thus, help in the recovery of carts and in the best conversion of your store.

**1. Avoid errors related to the brand or the type of card**:

- The BIN query returns the **correct** brand of the card once it is associated with the BINS base of the brands; this is a much safer method than relying on algorithms on forms;

- At your store checkout, you can create a message to let the customer know if they are using a debit card when they should actually be using a credit card.

**2. Offer online cart recovery**

You can develop a flow at your checkout so that, if a card entered on the payment screen is multiple (credit and debit), your store can retain the card data and, if the credit transaction fails, automatically offer the shopper a debit transaction with the same card.

**3. Warn about international or prepaid cards**

The BIN query may indicate an attempt to use an international or prepaid card. If your store does not want to accept international or prepaid card payments, you can configure your checkout to inform the shopper that the store does not accept the card entered.

## Integration

### Request

A `GET` request must be sent containing the BIN to be checked:

<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/cardBin/`BIN`</span></aside>

| Field | Description                                    |
| ----- | ---------------------------------------------- |
| `BIN` | It's the first six or nine digits of the card. |

```json
https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/420020
```

### Response

```json
{
    "Status": "00",
    "Provider": "MASTERCARD",
    "CardType": "Crédito",
    "ForeignCard": true,
    "CorporateCard": true,
    "Issuer": "Bradesco",
    "IssuerCode": "237"
    "Prepaid":true
}
```

| Parameter       | Type    | Size          | Description                                                                                                                                                       |
| --------------- | ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Status`        | Text    | 2             | BIN Check status response: <br><br> 00 – Analysis authorized <br> 01 – Brand not supported<br> 02 – Card not supported for BIN Check<br> 73 – Blocked Affiliation |
| `Provider`      | Text    | 255           | Card Brand                                                                                                                                                        |
| `CardType`      | Text    | 20            | Card Type: <br><br> Credit <br> Debit <br>Multiple                                                                                                                |
| `ForeignCard`   | Boolean | -             | If card was issued abroad (False/True)                                                                                                                            |
| `CorporateCard` | Boolean | -             | If card is coporate (False/True)                                                                                                                                  |
| `Issuer`        | Text    | 255           | Card issuer's name                                                                                                                                                |
| `IssuerCode`    | Text    | 255           | Card issuer's code                                                                                                                                                |
| `Prepaid`       | Boolean | True ou False | Returns "True" if the card is prepaid.                                                                                                                            |

> **NOTE**: On testing environment (SANDBOX), the returned data is simulated, so they are not valid BIN Check results. Only fields and format must be considered. For real identification of the BIN Check, production environment must be used.

# Velocity

## What is Velocity

Velocity is a type of fraud prevention mechanism that specifically analyzes the concept of **"speed x transactional data"**. It analyzes how often certain data is used and whether that data is inscribed in a list of behaviors succeptible to security actions.

For merchants operating in the e-commerce market and eventually receiving fraudulent transactions, Velocity is a product that will identify behaviors suspect of fraud. The tool is intended to assist in fraud analysis at a much lower cost than a more traditional market tool.

It is an ally in the evaluation of suspect buying behaviors, because the calculations will be based on `traceability elements`.

The Velocity offers 4 types of functionalities to validate transactional data:

| Functionality         | Description                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Velocity safety rules | The Merchant defines a set of security rules that will evaluate if certain transactional data is repeated in a suspicious time interval           |
| Quarantine            | Creation of a list of data that will be analyzed for a determined period of time before being considered valid or fraudulent                      |
| BlackList             | Creation of a list of data that, when identified, prevents the transaction from being executed, avoiding the creation of a fraudulent transaction |
| Whitelist             | Creation of a list of data that, when identified, allows the transaction to be executed, even if there are security rules in action               |

The functionality must be contracted separately, and later enabled in your store by the Cielo Ecommerce Support team via Admin 3.0

## Integration

Velocity works by analyzing data sent in the standard Cielo Ecommerce API integration. It is not necessary to add any additional node to the store integration for the creation of the sale, but it will be necessary to change the way the data is received `Response`.

When Velocity is active, the transaction response will bring a specific node called "Velocity" with the details of the analysis.

```json
{
  "MerchantOrderId": "2017051202",
  "Customer": {
    "Name": "Nome do Comprador",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@cielo.com.br",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2027",
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "VelocityAnalysis": {
      "Id": "2d5e0463-47be-4964-b8ac-622a16a2b6c4",
      "ResultMessage": "Reject",
      "Score": 100,
      "RejectReasons": [
        {
          "RuleId": 49,
          "Message": "Bloqueado pela regra CardNumber. Name: Máximo de 3 Hits de Cartão em 1 dia. HitsQuantity: 3. HitsTimeRangeInSeconds: 1440. ExpirationBlockTimeInSeconds: 1440"
        }
      ]
    },
    "PaymentId": "2d5e0463-47be-4964-b8ac-622a16a2b6c4",
    "Type": "CreditCard",
    "Amount": 10000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 16,
    "ReasonMessage": "AbortedByFraud",
    "Status": 0,
    "ProviderReturnCode": "BP171",
    "ProviderReturnMessage": "Rejected by fraud risk (velocity)",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/2d5e0463-47be-4964-b8ac-622a16a2b6c4"
      }
    ]
  }
}
```

| Property                                 | Description                           | Type   | Size |
| ---------------------------------------- | ------------------------------------- | ------ | ---- |
| `VelocityAnalysis.Id`                    | Performed analysis identifier         | GUID   | 36   |
| `VelocityAnalysis.ResultMessage`         | Accept ou Reject                      | Text   | 25   |
| `VelocityAnalysis.Score`                 | 100                                   | Number | 10   |
| `VelocityAnalysis.RejectReasons.RuleId`  | Code of the rule that rejected        | Number | 10   |
| `VelocityAnalysis.RejectReasons.Message` | Description of the rule that rejected | Text   | 512  |

# Zero Auth

**Zero Auth** is a Cielo tool that allows you to check whether a card is valid for making a purchase before the order is finalized. Zero Auth simulates an authorization without affecting the credit limit or alerting the cardholder about the test.

> Zero Auth does not inform the limit or characteristics of the card or the holder, it only simulates a Cielo authorization.

Zero Auth is the correct way to validate cards according to the recommendations of brands and banks. Before the creation of Zero Auth, stores used to create low-value transactions, such as one real or one dollar, and then cancel them; It is important to know that this practice is now penalized by the brands.

> **Attention:** In the event of transactions with a value different from _zero_ and less than _one dollar_, followed by cancellation of the transaction, the brands will apply fees to Cielo, which will be passed on to the establishments that are in non-compliance. Mastercard, for example, is charging a fee of R$0.21 cents per transaction.

**Zero Auth** validates **open or tokenized cards** (sending the `CardToken` created in the API E-commerce Cielo).

**Supported brands**

Zero Auth supports **Visa, Master** and **Elo** for both credit and debit cards.

If other brands are sent, there will be an error with the return "**57-Invalid Brand**".

## Integration

To perform a Zero Auth query, the merchant must send a `POST` request to the API E-commerce Cielo, simulating a transaction.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/zeroauth</span></aside>

Validating an open card requires a different technical contract than validating a tokenized card. Check out the example requests:

#### Open card

```json
{
  "CardNumber": "1234123412341231",
  "Holder": "Alexsander Rosa",
  "ExpirationDate": "12/2021",
  "SecurityCode": "123",
  "SaveCard": "false",
  "Brand": "Visa",
  "CardOnFile": {
    "Usage": "First",
    "Reason": "Recurring"
  }
}
```

| Field            | Description                                                                                                                                                                                                                                                                               | Type    | Contact Us | Required    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------- | ----------- |
| `CardType`       | Defines the type of card used: <br> <br> _CreditCard_ <br> _DebitCard_ <br> <br> If not sent, CreditCard as default                                                                                                                                                                       | Text    | 255        | Yes         |
| `CardNumber`     | Card Number                                                                                                                                                                                                                                                                               | Text    | 16         | Yes         |
| `Holder`         | Buyer's name, printed on the card.                                                                                                                                                                                                                                                        | Text    | 25         | Yes         |
| `ExpirationDate` | Expiration date.                                                                                                                                                                                                                                                                          | Text    | 7          | Yes         |
| `SecurityCode`   | Card Security code .                                                                                                                                                                                                                                                                      | Text    | 4          | Yes         |
| `SaveCard`       | Defines if the card must be tokenized                                                                                                                                                                                                                                                     | Boolean | ---        | Yes         |
| `Brand`          | Card Brand:<br> Visa <br> Master <br> ELO                                                                                                                                                                                                                                                 | Text    | 10         | Yes         |
| `CardToken`      | Card Token 3.0                                                                                                                                                                                                                                                                            | GUID    | 36         | Conditional |
| `Usage`          | **First** if the credentials have been stored and they will be used for the first time.<br>**Used** if the credentials have been stored and they were previously used.                                                                                                                    | Text    | ---        | No          |
| `Reason`         | Indicates the purpose of storing cards, if the "Usage" field is "Used".<BR>**Recurring** - Scheduled recurring purchase (eg subscriptions)<br>**Unscheduled** - Recurring purchase without scheduling (eg service applications)<br>**Installments** - Installment through recurrence<br>. | Text    | ---        | Conditional |

#### Tokenized cards

```json
{
  "CardToken": "23712c39-bb08-4030-86b3-490a223a8cc9",
  "SaveCard": "false",
  "Brand": "Visa"
}
```

| Field       | Description                           | Type | Size | Required |
| ----------- | ------------------------------------- | ---- | ---- | -------- |
| `Brand`     | Card Brand: Visa <br> Master <br> ELO | Text | 10   | not      |
| `CardToken` | Tokenized Card 3.0                    | GUID | 36   | yes      |

### Response

The response always returns whether the card can currently be authorized. This information only means that the _card is valid for transactioning_, but does not indicate that a certain value will be authorized.

The fields returned in the response depend on the validation result. The following table presents all possible fields; after the table, check out the examples of each type of response.

| Field                 | Description                                                                                                                                                                                                                                                                                  | Type    | Size |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | :--: |
| `Valid`               | Card Status: <br> **True ** - Valid Card <BR> **False** - Invalid Card                                                                                                                                                                                                                       | Boolean | ---  |
| `ReturnCode`          | Return code                                                                                                                                                                                                                                                                                  | Text    |  2   |
| `ReturnMessage`       | Return message                                                                                                                                                                                                                                                                               | Text    | 255  |
| `IssuerTransactionId` | Issuer authentication identifier for recurring debit transactions. This field must be sent in subsequent transactions of the first transaction in the self-recurrence model. In the programmed recurrence model, Cielo will be responsible for sending the field in subsequent transactions. | Text    |  15  |

#### POSITIVE - Valid Card

```json
{
  "Valid": true,
  "ReturnCode": "00",
  "ReturnMessage": "Transacao autorizada",
  "IssuerTransactionId": "580027442382078"
}
```

> See [Return codes](https://developercielo.github.io/en/manual/cielo-ecommerce#api-codes){:target="\_blank"} to see the return codes descriptions.
> The return code **00 represents success in Zero Auth**, the other codes are defined according to the documentation above.

#### NEGATIVE - Invalid Card

```json
{
  "Valid": false,
  "ReturnCode": "57",
  "ReturnMessage": "Autorizacao negada",
  "IssuerTransactionId": "580027442382078"
}
```

#### NEGATIVE - Invalid Card - Brand not Supported

```json
{
  "Code": 57,
  "Message": "Bandeira inválida"
}
```

#### NEGATIVE - Registration Restriction

```json
{
  "Code": 389,
  "Message": "Restrição Cadastral"
}
```

If there is an error in the flow and it is not possible to validate the card, the service will return the following errors:

- _500 – Internal Server Error_
- _400 – Bad Request_

# Silent Order Post

Integration that Cielo offers to merchants, where the payment data is safely traced, while maintaining full control over the Ckeckout experience.

This method allows you to send payment data from your final customer securely directly to our system. Payment fields are stored on Cielo's side, that counts on with the PCI DSS 3.2 certified.

It is ideal for merchants who require a high level of security without losing the identity of your page. This method allows a high level of customization on your checkout page.

## Characteristics

- It captures payment data directly to Cielo's systems through the fields hosted on your page through a script (javascript).
- Compatibility with all payment methods available to the Gateway (National and International)
- Buyer Authentication (available)
- Reducing the scope of the PCI DSS
- Keep the full control over the checkout experience and brand management elements.

## Authorization Flow

### Standard Authorization Flow

![Authorization_Flow](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-padrao-de-autorizacao_2_en.png)

The establishment must be **PCI Compliance** (PCI = Security Rules to manipulate card data)

### Authorization Flow with Silent Order POST

![Authorization_Flow_POST](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-de-autorizacao-com-sop_1_en.png)

The server **does not pass the card data** openly.

## Transactional Flow

![Transactional_Flow](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-silent-order-post-cielo_-_3_en.png)

## Integration

### STEP 1

The shopper finishes the checkout, and goes to payment processing.

### STEP 2. Getting Access Token OAuth2

When the shopper accesses the checkout, the merchant must generate the AccessToken from Cielo Authentication API (OAuth). On success, the API will return an AccessToken that must be populated in the script to load on the page.

To request AccessToken, send a request (POST) to the following endpoint in the server-to-server template:

| Environment    | base URL + endpoint                             | Authorization      |
| -------------- | ----------------------------------------------- | ------------------ |
| **SANDBOX**    | https://authsandbox.braspag.com.br/oauth2/token | "Basic _{base64}_" |
| **PRODUCTION** | https://auth.braspag.com.br/oauth2/token        | "Basic _{base64}_" |

How to obtain the Base64 value:

1. Concatenate "ClientId" and "ClientSecret" (`ClientId:ClientSecret`).
2. Code the result in base64.
3. Send a request to the authorization server with the alphanumeric code you just created.

> To request your "ClientID" and "ClientSecret", please send an email to cieloecommerce@cielo.com.br with the following:

- MerchantId;
- Describe that you need the credentials "ClientID" e o "ClientSecret" to use Silent Order Post.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">oauth2/token</span></aside>

```shell
--request POST "https://authsandbox.braspag.com.br/oauth2/token"
--header "Authorization: Basic {base64}"
--header "Content-Type: application/x-www-form-urlencoded"
--data-binary "grant_type=client_credentials"
```

| Parameters      | Format                              | Where to send |
| --------------- | ----------------------------------- | ------------- |
| `Authorization` | "Basic _{base64}_"                  | Header.       |
| `Content-Type`  | "application/x-www-form-urlencoded" | Header.       |
| `grant_type`    | "client_credentials"                | Body.         |

#### Response

```json
{
  "access_token": "faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw",
  "token_type": "bearer",
  "expires_in": 599
}
```

```shell
{
  "access_token": "faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw",
  "token_type": "bearer",
  "expires_in": 599
}
```

| Response Properties | Description                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `access_token`      | The requested authentication token, that will be used in the next step.                  |
| `token_type`        | Indicates the token type value.                                                          |
| `expires_in`        | Access Token expiration, in seconds. When the token expires, you must request a new one. |

### STEP 3. Getting the SOP AccessToken

After obtaining AccessToken OAuth2, you should send a new request (POST) to the following URL:

| Environment | base URL + endpoint                                                      |
| ----------- | ------------------------------------------------------------------------ |
| Sandbox     | https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken |
| Production  | https://transaction.pagador.com.br/post/api/public/v2/accesstoken        |

#### Request

```shell
--request POST "https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken"
--header "Content-Type: application/json"
--header "MerchantId: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
--header "Authorization: Bearer faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw"
--data-binary
--verbose
```

| Properties      | Description                     | Type | Size | Mandatory? |
| --------------- | ------------------------------- | ---- | ---- | ---------- |
| `MerchantId`    | Merchant identifier at Pagador. | GUID | 36   | Yes        |
| `Authorization` | Bearer [AccessToken OAuth2]     | Text | 36   | Yes        |

#### Response

As a response, you will receive a JSON ("HTTP 201 Created") with the SOP AccessToken and some other data.

```json
{
  "MerchantId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "AccessToken": "MzA5YWIxNmQtYWIzZi00YmM2LWEwN2QtYTg2OTZjZjQxN2NkMDIzODk5MjI3Mg==",
  "Issued": "2021-05-05T08:50:04",
  "ExpiresIn": "2021-05-05T09:10:04"
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AccessToken": "MzA5YWIxNmQtYWIzZi00YmM2LWEwN2QtYTg2OTZjZjQxN2NkMDIzODk5MjI3Mg==",
    "Issued": "2021-05-05T08:50:04",
    "ExpiresIn": "2021-05-05T09:10:04"
}
```

| Properties    | Description                                                                                                                                                                                                                                                                                        | Type  | Size | Format                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---- | ---------------------------------------------------------------- |
| `MerchantId`  | Merchant identifier at Pagador.                                                                                                                                                                                                                                                                    | Guid  | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                             |
| `AccessToken` | AccessToken SOP. For safety reasons, this token will allow the merchant to save only one card within the deadline determined in the response, through the attribute _Expires In_. The default is 20 minutes. Whatever happens first will invalidate the token to prevent it from being used again. | Texto | --   | NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ== |
| `Issued`      | Token creation date and hour.                                                                                                                                                                                                                                                                      | Texto | --   | AAAA-MM-DDTHH:MM:SS                                              |
| `ExpiresIn`   | Token expiration date and hour.                                                                                                                                                                                                                                                                    | Texto | --   | AAAA-MM-DDTHH:MM:SS                                              |

> To see the legacy authentication process, which used the MerchantId and shopper IP address to create the `AccessToken`, [click here](https://developercielo.github.io/en/manual/cielo-ecommerce#legacy-authentication).

### STEP 4

a) The establishment should download a script provided by Cielo, and attach it to its checkout page. This script will allow Cielo to process all the card information without intervention of the establishment.
The download can be made from the following URL:

**SANDBOX:**
**https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js**

**PRODUCTION:**
**https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js**

b) The establishment should customize its inputs of the form with the following classes:

- For the credit/debit card holder: **bp-sop-cardholdername**
- For credit/debit card number: **bp-sop-cardnumber**
- For credit/debit card validity: **bp-sop-cardexpirationdate**
- For credit/debit card security code: **bp-sop-cardcvvc**

**SETTING PARAMETERS**

**Script Parameters**

| Property         | Description                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessToken`    | Access Token obtained via Authentication API                                                                                                                   |
| `environment`    | **sandbox** or **production**                                                                                                                                  |
| `language`       | **PT** or **EN** or **ES**                                                                                                                                     |
| `enableTokenize` | **true** if you want to save the card directly on your vault in the Cartão Protegido (returns a 'cardToken' instead of a 'paymentToken'). **false** otherwise. |
| `cvvRequired`    | "false" (sets CVV as not mandatory) / "true" (sets CVV as mandatory).                                                                                          |

**Script Response**

| Property       | Description                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `PaymentToken` | Payment Token in GUID format (36)                                                                                      |
| `CardToken`    | Permanent token to be used on a payment request on a GUID format (36) Obs.: Only works if 'enableTokenize' is **true** |

c) The script provided by Cielo provides three events for manipulation and treatment on the establishment side. They are: **onSuccess** (where **PaymentToken** will be returned after processing the card data), **onError** (if there is any error in the consumption of Cielo services) and **onInvalid** (where the result of the validation of the inputs will be returned).

- In the input validation, the establishment can use the entire layer of validation on the card data made by Cielo and then simplify the treatment on your checkout form. The messages returned in the validation result are available in the following languages: portuguese (default), english and spanish.

- The _PaymentToken_ will be the token that will represent all the card data provided by the buyer. The same will be used by the establishment so there is no need to process and process card data on its side.

```json
},
    "Payment": {
    "Type": "CreditCard",
    "Amount": 1400,
    "Installments": 1,
        "CreditCard": {
        "PaymentToken": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "Brand": "MASTER"
        }
    }
}
```

**For security reasons this PaymentToken can only be used for 1 authorization in Cielo 3.0. After processing, it will be invalidated.**

Example of setup to be performed by the establishment on the checkout page:

![Pagina Checkout]({{ site.baseurl_root }}/images/html-silent-order-post.jpg)

## Legacy Authentication

**STEP 1**

The shopper finishes the checkout, and goes to the payment processing.

**STEP 2**

a) The merchant must request a ticket (server to server) sending a POST to the following URL:

**SANDBOX:**
**https://transactionsandbox.pagador.com.br/post/api/public/v1/accesstoken?merchantid={mid_loja}**

**PRODUCTION:**
**https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid={mid}**

Example: https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid=00000000-0000-0000-0000-000000000000

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v1/accesstoken?merchantid={mid_loja}</span></aside>

```shell
curl
--request POST "https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid=00000000-0000-0000-0000-000000000000"
--header "Content-Type: application/json"
--data-binary
--verbose
```

| Property   | Description          | Type | Size | Required |
| ---------- | -------------------- | ---- | ---- | -------- |
| `mid_loja` | API store identifier | Guid | 36   | Yes      |

### Response

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "AccessToken": "NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==",
    "Issued": "2018-07-23T11:09:32",
    "ExpiresIn": "2018-07-23T11:29:32"
}
```

| Property      | Description                 | Type | Size | Format                                                           |
| ------------- | --------------------------- | ---- | ---- | ---------------------------------------------------------------- |
| `MerchantId`  | Store identifier in Cielo   | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                             |
| `AccessToken` | Access token                | Text | --   | NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ== |
| `Issued`      | Date and time generation    | Text | --   | AAAA-MM-DDTHH:MM:SS                                              |
| `ExpiresIn`   | Date and time of expiration | Text | --   | AAAA-MM-DDTHH:MM:SS                                              |

b) In order to use this resource, for security reasons, it will be obligatory on the Cielo's behalf, **at least one valid IP of the establishment.** Otherwise the request will not be authorized (HTTP 401 NotAuthorized).

**STEP 3**

a) In response, the establishment will receive a json (HTTP 201 Created) containing among other information, the ticket (AccessToken), such as:

![Response Ticket]({{ site.baseurl_root }}/images/response-ticket-silent-order-post-cielo.jpg)

For security reasons, this ticket will allow the establishment to save only 1 card within a deadline already stipulated in the response, using the ExpiresIn attribute (by default, 20 minutes). Whatever happens first will invalidate this same ticket for future use.

Continue to STEP 4 above.

# API codes

## About codes

API Cielo e-commerce has 4 types of returned codes that represent different moments of the transaction.

Below we explain them in the order in which they can occur:

| Code                 | Description                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTTP Status Code** | They are standard HTTP codes. It report if the information sent to the API is **actually being successful in reaching our ENDPOINTs**. If values other than 200 or 201 are appearing, there is some impediment with the comunication with the API<br> _Returned at time of API request_                                                                                                   |
| **API Errors**       | These codes are responses to **content validation of sent data**. If they are appearing, our API calls have been identified and are being validated. If this code is appearing, the request contains errors (e.g. size/conditions/registration errors) that prevent the creation of the transaction<br>_Returned at time of API request_                                                  |
| **Status**           | After the transaction is created, these codes will be returned, informing the transaction status at that moment (e.g. `Authorized` >` Captured` > `Canceled`)<br>_Returned in the `Status` field _                                                                                                                                                                                        |
| **Sales Return**     | Formed by a **Return code** and a **message**, these codes indicate the **reason** of a given `Status` within a transaction. They indicate, for example, whether a transaction with declined `status` was not authorized because of a negative balance at the issuing bank. <br>_Returned in the `ReturnCode` and` ReturnMessage` fields_<br> _They occur only in Credit and Debit cards_ |

**NOTE**: In the old **Webservice 1.5 Cielo**, the `ReturnCode` was considered as _Transaction Status_. In the **API CIELO ECOMMERCE**, the `Status` field has its own codes, thus, the **field to be considered as the basis for identifying the status of a transaction**

## HTTP Status Code

| HTTP Status Code | Description           |
| ---------------- | --------------------- |
| 200              | OK (Capture/Void/Get) |
| 201              | OK (Authorization)    |
| 400              | Bad Request           |
| 404              | Resource Not Found    |
| 500              | Internal Server Error |

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

- **Irreversible: Never retry.**

It means, for example, that the card was canceled for use, has been lost or stolen, there is confirmed fraud, the transaction is not allowed for that product, indicating that there are no circumstances in which the issuer would grant an approval. Any authorization attempt that has previously received an irreversible refusal without any changes in the message will not be successful.

- **Reversible: Retry allowed.**

It means that the issuer can approve, but cannot do so now, possibly due to a system issue (down) or lack of limit, suspected fraud or exceeded number of password attempts. These are temporary opt-out decisions made by the issuer that may change over time.
The Visa, Mastercard, Elo and Hipercard brands adjusted their rules to limit the number of authorization attempts for a denied transaction. These changes provide for the charging of fees for excessive attempts. Below are the rules for each brand.

### Mastercard

The Mastercard brand has the Transaction Processing Excellence (TPE) program, which includes two categories:

- **Excessive Attempts** – monitors the attempts of denied transactions, in card present and not present environments. Valid for both reversible and irreversible denial codes.

- **Merchant Advice Code Transaction Excellence (MAC)**– monitors transaction retries that are denied, in card-not-present environments that are irreversible. Billing only on (MAC) 03 and 21.

**1. Excessive Attempts**

These are charges made when the merchant exceeds the rules for retrying transactions.

The brand also performs monitoring for any approved nominal value authorization, with subsequent reversal for transactions below 1 unit of whole currency or the equivalent of US$ 1.

Monitoring is applied to retry transactions for denied and approved purchases, carried out in a present and non-present card environment.

| Categories                        | Codes                                                                                                                                  | Validity                 | Domestic Rate | International Rate | When Occurs                 | Retry Allowed                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------- | ------------------ | --------------------------- | ------------------------------ |
| Card present and Card not present | Any denial code that is not assigned to MAC 03 and 21. And also MAC codes if you do not respect the "Excessive Attempts" limits        | Until 01/31/2023         | BRL 2.00      | -                  | From the 11th retry onwards | Retry allowed within 24 hours. |
| Card present and Card not present | Any denial code that is not assigned to MAC 03 and 21. And also the MAC codes if you do not respect the limits of "Excessive Attempts" | New rule from 02/01/2023 | R $2.00       | -                  | From the 8th retry onwards  | Retry allowed within 24 hours. |

- All payment transactions using the same card and the same merchant number will be considered as retries;
- Mastercard has extended the effective date to **01/02/2023** regarding the new program rules **(Excessive Attempts)** previously scheduled for the beginning of 01/11/2022. These are the changes:

- 1. The excess considered in the program will occur from the eighth attempt within the calculation month. The amount charged has changed.
- 2. Mastercard is also introducing a limit of 35 failed attempts on the same card and merchant number per continuous 30-day period. Even if the shopper does not exceed the limit of 7 retries in a 24-hour period, but exceeds the monthly limit, the charge will be applied

> Note: The current rule of the Excessive Attempts program is valid until 01/31/2023, where only 10 attempts to approve the same transaction are allowed (on the same card, and same merchant number), with retry allowed after 24 hours.

**2. Merchant Advice Code Transaction Excellence (MAC)**

These are charges made when the establishment re-attempts to send authorization for irreversible response codes with the same valid card for a card not present.

Within this retry program, there are programs that are specifically designed for the **“Do not try this transaction again”** scenario. For these cases, Mastercard identifies transactions with the following values: MAC 03 and MAC 21, for example.

The MAC program accepts a few values, however **only MACs 03 and 21 have a specific charge**. The other MACs do not fall under this MAC 03/21 charge.

The other MAC codes: 01, 02, 04, 24, 25, 26, 27, 28, 29 and 30 aren't included the MAC billing program but are included in the Excessive Attempts program billing if you exceed the limits.

Since **10/14/2022** Mastercard has introduced new MAC codes 24, 25, 26, 27, 28, 29 and 30, when an issuer declines a transaction with the response code 51 (Insufficient Funds) followed by one of the MACs below, for the merchant to take the best action.

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

**Categorization of Mastercard returns**

Mastercard may consolidate some issuer response codes, which often may not indicate to the merchant whether or not to retry, into 3 codes for Mastercard exclusive use:

- 79 (Life cycle)
- 82 (Politics)
- 83 (Fraud/Security)

The original codes will be replaced by the Merchant Advice Code (MAC), which will accompany codes 79, 82 and 83 to determine whether or not the transaction can be re-attempted.

**For example:**

| When                                                                      | Then                                                             | And the response code                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| The issuer declines the transaction using response code 54 (Expired Card) | Mastercard will replace code 54 with code 79 (Lifecycle Decline) | Accompany appropriate Merchant Advice Code (MAC) |

**MAC 03 and MAC 21 retry program**

** Method of calculation: **

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
- After an approved transaction, the counter is reset.

**Fees**: When you exceed the attempt limits established by the brand, a fee will be charged for each transaction that exceeds it.

- Domestic: USD 0.10 + 13.83% Tax
- Foreign: USD 0.25 + 13.83% Tax

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

In category 1, EC is charged from the 2nd attempt to (same establishment and same card) **retry not allowed.**

Category 3 comprises the group of codes for accounting for 10,001 transactions, after the EC reaches 10,000 retries with this group of codes, any transaction will be accounted for independently of the card.

**Example:** We had 10,000 transactions denied in a CE with category 3 codes, if transaction 10,001 is in code 14 or in any category 3 group code, it will be charged regardless of the card.

### ELO

**What is it?**

This is a program instituted by ELO that generates charges when the merchant exceeds the rules for retrying transactions with the same card.

**Forms of Calculation**

- Retries: all payment transactions on the same card, validity, value, Merchant ID (MID) - within 30 days
- Accounted codes: all negatives​
- Excess: from the 16th retry in the month​\*
- Fee: BRL 0.80 (eighty cents) per retry, starting from the 16th
- Excess accounting: It is based on Elo's internal controls. 1st to last calendar day of the month

**Effective date: August 1, 2022**

**List of refusal codes:**

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

- ASI transactions: these are Account Status Inquiry transactions, that is, transactions carried out to query the status of a card (check that it is active). For this purpose, financial transactions should not be used, but specific transactions.​

- Attempts per day (item 2): consider for purposes of Hipercard's Retry program from 00:00 to 23:59​

- Reference month (item 3): for purposes of the Hipercard Retry program, consider the 01st to the 30th or 31st of the month in which the transaction took place. The charge will be sent after the close of the subsequent month.​

- Transaction codes considered irreversible by the issuer were categorized by the ABECS payments and self-regulation industry, through current Regulation 21. Return codes (ABECS)

- Codes not mentioned in the ABECS manual are considered reversible.

**Effective date: September 15, 2022**

### Other brands

**Reversible codes:** New attempts will be allowed for the same customer and card. There is no limit and pre-established period;

> **Important: you should follow the guidance received in the response to the transaction denied, before making a new attempt.**

**Irreversible Codes:** Authorizations will not be allowed for the same card or establishment, after receiving the 1st refusal response from the issuer.

## Return codes ABECS

To access the Card Brands Retry Program, access this [Link](https://developercielo.github.io/en/manual/cielo-ecommerce#card-brands-retry-program)

The Brazilian Association of Credit Card and Services Companies (ABECS) establishes as of July 15, 2020, the standardization of the return code of refused sales authorizations for both the physical payment and e-commerce solutions of the Brazilian market .

This normative measure seeks to bring benefits to the entire payment market, providing greater transparency in the understanding of the reason for the refusal of transactions, in addition to enabling greater assertiveness in the adoption of sales retentive strategies.

Cielo informs its customers that it's prepared to process transactions following this new market standard, below is the table of codes standardized by ABECS.

<aside class="notice">The AMEX flag codes have undergone a to/from in order to maintain two digits. We reinforce that this measure does not change the reasons for return.</aside>

| Message                                                                     | Code Type    | ELO                        | VISA                       | MASTERCARD/HIPER           | AMEX                       | AMEX - From/To Cielo       | Message POS/Ecommerce                                    |
| --------------------------------------------------------------------------- | ------------ | -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------------------------------------- |
| GENERIC                                                                     | REVERSIBLE   | 05                         | 05                         | 05                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                 |
| INSUFFICIENT BALANCE/LIMIT                                                  | REVERSIBLE   | 51                         | 51                         | 51                         | 116                        | A5                         | NOT ALLOWED                                              |
| INSUFFICIENT BALANCE/LIMIT                                                  | REVERSIBLE   | 51                         | 51                         | 51                         | 121                        | A5                         | NOT ALLOWED                                              |
| INVALID PASSWORD                                                            | REVERSIBLE   | 55                         | 55 ou 86                   | 55                         | 117                        | A6                         | INVALID PASSWORD                                         |
| TRANSACTION NOT ALLOWED FOR CARD                                            | REVERSIBLE   | 57                         | 57                         | 57                         | 200                        | FD                         | TRANSACTION NOT ALLOWED FOR CARD                         |
| CARD NUMBER DOESN'T BELONG TO THE ISSUER \| INVALID CARD NUMBER             | IRREVERSIBLE | 14 ou 56                   | 06                         | 14 ou 01                   | 122                        | 08                         | CHECK THE CARD DATA                                      |
| SECURITY BREACH                                                             | IRREVERSIBLE | 63                         | 06                         | 14                         | 122                        | 08                         | CHECK THE CARD DATA                                      |
| SUSPECTED FRAUD                                                             | REVERSIBLE   | 59                         | 59                         | 63                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                 |
| INVALID MERCHANT                                                            | IRREVERSIBLE | 58                         | 03                         | 03                         | 109                        | DA                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| REDOING THE TRANSACTION (ISSUER REQUESTS RETENTATIVE)                       | REVERSIBLE   | 4                          | WITHOUT CORRESPONDING CODE | SE                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | REDOING THE TRANSACTION                                  |
| CONSULT ACCREDITATOR                                                        | REVERSIBLE   | 6                          | WITHOUT CORRESPONDING CODE | SE                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | MERCHANT, CONTACT THE PURCHASER                          |
| PROBLEM IN THE PURCHASER                                                    | IRREVERSIBLE | 19                         | 19                         | 30                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD ERROR - DON'T TRY AGAIN                             |
| CARD ERROR                                                                  | IRREVERSIBLE | 12                         | 06                         | WITHOUT CORRESPONDING CODE | 115                        | A2                         | CHECK THE CARD DATA                                      |
| FORMAT ERROR (MESSAGE)                                                      | IRREVERSIBLE | 30                         | 12                         | 30                         | 181                        | A3                         | CARD ERROR - DON'T TRY AGAIN                             |
| VALUE OF THE INVALID TRANSACTION                                            | IRREVERSIBLE | 13                         | 13                         | 13                         | 110                        | JB                         | TRANSACTION VALUE NOT ALLOWED - DON'T TRY AGAIN          |
| VALUE OF INVALID PARCEL                                                     | IRREVERSIBLE | 23                         | WITHOUT CORRESPONDING CODE | 12                         | 115                        | A2                         | INVALID INSTALLMENT - DON'T TRY AGAIN                    |
| PASSWORD ATTEMPTS EXCEEDED \| SHOPPING                                      | REVERSIBLE   | 38                         | 75                         | 75                         | 106                        | A4                         | PASSWORD TRYING EXCEEDED. CONTACT YOUR CARD CENTER       |
| LOST CARD                                                                   | IRREVERSIBLE | 41                         | 41                         | 41                         | 200                        | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| STOLEN CARD                                                                 | IRREVERSIBLE | 43                         | 43                         | 43                         | 200                        | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| EXPIRED CARD / INVALID EXPIRATION DATE                                      | IRREVERSIBLE | 54                         | 06                         | 54                         | 101                        | BV                         | CHECK THE CARD DATA                                      |
| TRANSACTION NOT ALLOWED \| TERMINAL CAPACITY                                | IRREVERSIBLE | 57                         | 58                         | 58                         | 116                        | A5                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| EXCESS VALUE \| WITHDRAW                                                    | REVERSIBLE   | 61                         | 61 ou N4                   | 61                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | EXCEEDED VALUE. CONTACT YOUR CARD CENTER                 |
| DOMESTIC CARD - INTERNATIONAL TRANSACTION                                   | IRREVERSIBLE | 62                         | 62                         | 62                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD DOESN'T ALLOW INTERNATIONAL TRANSACTION             |
| MINIMUM TRANSACTION VALUE INVALID                                           | IRREVERSIBLE | 64                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION VALUE NOT ALLOWED - DON'T TRY AGAIN          |
| AMOUNT OF WITHDRAWALS EXCEEDED                                              | REVERSIBLE   | 65                         | 65                         | 65                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | AMOUNT OF WITHDRAWALS EXCEEDED. CONTACT YOUR CARD CENTER |
| PASSWORD EXPIRED / PASSWORD CRYPTOGRAPHY ERROR                              | IRREVERSIBLE | 74                         | 74 ou 81                   | 88                         | 180                        | A7                         | INVALID PASSWORD - DON'T TRY AGAIN                       |
| PASSWORD ATTEMPTS EXCEEDED \| WITHDRAW                                      | REVERSIBLE   | 75                         | 75                         | 75                         | 106                        | A4                         | PASSWORD TRYING EXCEEDED. CONTACT YOUR CARD CENTER       |
| INVALID OR NON-EXISTING DESTINATION ACCOUNT                                 | IRREVERSIBLE | 76                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID DESTINATION ACCOUNT - DON'T TRY AGAIN            |
| ACCOUNT INVALID OR NON-EXISTING                                             | IRREVERSIBLE | 77                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID ORIGIN ACCOUNT - DON'T TRY AGAIN                 |
| NEW CARD WITHOUT UNLOCKING                                                  | REVERSIBLE   | 78                         | 78                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | UNLOCK THE CARD                                          |
| INVALID CARD (cryptogram)                                                   | IRREVERSIBLE | 82                         | 82                         | 88                         | 180                        | A7                         | CARD ERROR - DON'T TRY AGAIN                             |
| EMITTER OUT OF AIR                                                          | REVERSIBLE   | 91                         | 91                         | 91                         | 912                        | A1                         | COMMUNICATION FAILURE - TRY LATER                        |
| SYSTEM FAILURE                                                              | REVERSIBLE   | 96                         | 96                         | 96                         | 911                        | AE                         | COMMUNICATION FAILURE - TRY LATER                        |
| DIFFERENCE - PRE-AUTHORIZATION                                              | IRREVERSIBLE | 99                         | N8                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | DIFFERENT VALUE OF PRE-AUTHORIZATION - DON'T TRY AGAIN   |
| INCORRECT FUNCTION (DEBIT)                                                  | IRREVERSIBLE | AB                         | 52 ou 53                   | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | USE CREDIT FUNCTION                                      |
| INCORRECT FUNCTION (CREDIT)                                                 | IRREVERSIBLE | AC                         | 39                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | USE DEBIT FUNCTION                                       |
| PASSWORD EXCHANGE / UNLOCKING                                               | IRREVERSIBLE | P5                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID PASSWORD - DON'T TRY AGAIN                       |
| NEW PASSWORD NOT ACCEPTED                                                   | REVERSIBLE   | P6                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID PASSWORD USE THE NEW PASSWORD                    |
| COLLECT CARD (THERE IS NO FRAUD)                                            | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 04                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| DYNAMIC KEY CHANGE ERROR                                                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 06                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD ERROR - DON'T TRY AGAIN                             |
| CONFIRMED FRAUD                                                             | IRREVERSIBLE | 57                         | 07                         | 04                         | 200                        | FD                         | TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN       |
| ISSUER NOT LOCATED - INCORRECT BIN                                          | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 15                         | 15                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID CARD DATA - DON'T TRY AGAIN                      |
| (buyer’s negative) FAILURE TO COMPLY WITH THE LAWS OF ANTE MONEY LAUNDERING | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 64                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| INVALID REVERSION                                                           | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 76                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| NOT LOCATED BY ROUTER                                                       | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 92                         | 92                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| TRANSACTION DENIED FOR INFRINGEMENT OF LAW                                  | IRREVERSIBLE | 57                         | 93                         | 57                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN       |
| DUPLICATE DATE OF TRACING DATE                                              | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 94                         | 94                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| SURCHARGE NOT SUPPORTED                                                     | REVERSIBLE   | WITHOUT CORRESPONDING CODE | B1                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                 |
| SURCHARGE NOT SUPPORTED BY THE DEBIT NETWORK                                | REVERSIBLE   | WITHOUT CORRESPONDING CODE | B2                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                 |
| FORCE STIP                                                                  | REVERSIBLE   | WITHOUT CORRESPONDING CODE | N0                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                 |
| WITHDRAWAL NOT AVAILABLE                                                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | N3                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHDRAWAL NOT AVAILABLE - DON'T TRY AGAIN               |
| RECURRENT PAYMENT SUSPENSION FOR A SERVICE                                  | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R0                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN   |
| RECURRENT PAYMENT SUSPENSION FOR ALL SERVICES                               | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R1                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN   |
| TRANSACTION NOT QUALIFIED FOR VISA PIN                                      | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R2                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN       |
| SUSPENSION OF ALL AUTHORIZATION ORDERS                                      | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R3                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN   |
| IT'S NOT POSSIBLE TO LOCATE THE REGISTRATION IN THE FILE                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | 25                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| FILE NOT AVAILABLE FOR UPDATE                                               | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | 28                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |

### Other return codes

| Response Code | Definitio                                                                                                                                             | Meaning                                                                                                                                                                                                                                                                        | Action                                                                                                                                                                                                 | Allows Retry                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| 00            | Successfully authorized transaction.                                                                                                                  | Successfully authorized transaction.                                                                                                                                                                                                                                           | Successfully authorized transaction.                                                                                                                                                                   | No                                                                                                             |
| 02            | Unauthorized transaction. Referred transaction.                                                                                                       | Unauthorized transaction. Referred (suspected fraud) by the issuing bank.                                                                                                                                                                                                      | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | No                                                                                                             |
| 09            | Transaction partially canceled successfully.                                                                                                          | Transaction partially canceled successfully.                                                                                                                                                                                                                                   | Transaction partially canceled successfully.                                                                                                                                                           | No                                                                                                             |
| 11            | Successfully authorized transaction for card issued abroad                                                                                            | Successfully authorized transaction.                                                                                                                                                                                                                                           | Successfully authorized transaction.                                                                                                                                                                   | No                                                                                                             |
| 21            | Cancellation not done. Non-localized transaction.                                                                                                     | Cancellation was not processed. If the error persists, contact Cielo.                                                                                                                                                                                                          | Cancellation was not processed. Try again later. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| 22            | Invalid installment. Invalid number of installments.                                                                                                  | Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.                                                                                                                                                                           | Could not process transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.                                                     | No                                                                                                             |
| 24            | Invalid number of installments.                                                                                                                       | Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.                                                                                                                                                                           | Could not process transaction. Invalid number of installments. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.                                    | No                                                                                                             |
| 60            | Unauthorized transaction.                                                                                                                             | Unauthorized transaction. Try again. If the error persists the carrier should contact the issuing bank.                                                                                                                                                                        | Could not process transaction. Try again later. If the error persists, contact your issuing bank.                                                                                                      | Only 4 times in 16 days.                                                                                       |
| 67            | Unauthorized transaction. Card locked for shopping today.                                                                                             | Unauthorized transaction. Card locked for shopping today. Blocking may be due to excessive invalid attempts. Card will be automatically unlocked at midnight.                                                                                                                  | Unauthorized transaction. Card locked temporarily. Contact your issuing bank.                                                                                                                          | From the following day, only 4 times in 16 days.                                                               |
| 70            | Unauthorized transaction. Limit exceeded/no balance.                                                                                                  | Unauthorized transaction. Limit exceeded/no balance.                                                                                                                                                                                                                           | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | From the following day, only 4 times in 16 days.                                                               |
| 72            | Cancellation not done. Not enough available balance for cancellation.                                                                                 | Cancellation not done. Not enough available balance for cancellation. If the error persists, contact Cielo.                                                                                                                                                                    | Cancellation not done. Try again later. If the error persists, contact the virtual store..                                                                                                             | No                                                                                                             |
| 79            | Transaction not allowed / Mastercard                                                                                                                  | Unauthorized transaction. Unable to process transaction due to error related to cardholder. Ask the bearer to contact the issuing bank.                                                                                                                                        | Contact your bank                                                                                                                                                                                      | No                                                                                                             |
| 80            | Unauthorized transaction. Divergence on transaction/payment date.                                                                                     | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                      | Unauthorized transaction. Redo the transaction confirming data.                                                                                                                                        | No                                                                                                             |
| 82            | Transaction not allowed / Mastercard                                                                                                                  | Transaction not authorized due to issuer rules. Instruct the cardholder to contact the issuing bank.                                                                                                                                                                           | Contact your bank                                                                                                                                                                                      | No                                                                                                             |
| 83            | Transaction not allowed / Mastercard                                                                                                                  | Unauthorized transaction. Suspicion of fraud by the issuing bank.                                                                                                                                                                                                              | Contact your bank                                                                                                                                                                                      | No                                                                                                             |
| 85            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| 89            | Transaction error.                                                                                                                                    | Unauthorized transaction. Transaction error. The carrier must try again and if the error persists, contact the issuing bank.                                                                                                                                                   | Unauthorized transaction. Transaction error. Try again and if the error persists, contact your issuing bank.                                                                                           | Only 4 times in 16 days.                                                                                       |
| 90            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| 97            | Value not allowed for this transaction.                                                                                                               | Unauthorized transaction. Value not allowed for this transaction.                                                                                                                                                                                                              | Unauthorized transaction. Value not allowed for this transaction.                                                                                                                                      | No                                                                                                             |
| 98            | System/communication unavailable.                                                                                                                     | There was no request response within the set time.                                                                                                                                                                                                                             | The transaction may have been processed. To confirm, check the transaction by the store order number and evaluate whether it was actually processed.                                                   | Retry only after reviewing the original transaction by the order number and confirm that it was not processed. |
| 475           | Cancellation Timeout                                                                                                                                  | The application did't respond within the expected time.                                                                                                                                                                                                                        | Try again after a few seconds. If you persist, contact Support.                                                                                                                                        | No                                                                                                             |
| 999           | System/communication unavailable.                                                                                                                     | Unauthorized transaction. Issuer system without communication. Try later. Can be error in SITEF, please check!                                                                                                                                                                 | Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.                                                                                              | From the following day, only 4 times in 16 days.                                                               |
| AA            | Time Exceeded                                                                                                                                         | Time exceeded in communication with the issuing bank. Orient the carrier to try again, if the error persists it will be necessary for the carrier to contact their issuing bank.                                                                                               | Time exceeded in their communication with the issuing bank, try again later. If the error persists, contact your bank.                                                                                 | Only 4 times in 16 days.                                                                                       |
| AF            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| AG            | Transaction not allowed. Operation failure.                                                                                                           | Transaction not allowed. There was an error in processing. Ask the cardholder to re-enter the card data, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo..                                              | Transaction not allowed. Enter the card details again. If the error persists, contact the virtual store                                                                                                | No                                                                                                             |
| AH            | Transaction not allowed. Credit card being used as debit. Use the credit function.                                                                    | Transaction not allowed. Credit card being used as debit. Ask the carrier to select the Credit Card payment option.                                                                                                                                                            | Unauthorized transaction. Try again by selecting the credit card payment option.                                                                                                                       | No                                                                                                             |
| AI            | Unauthorized transaction. Authentication was not performed.                                                                                           | Unauthorized transaction. Authentication was not performed. The carrier did not complete the authentication. Ask the carrier to review the data and try again. If the error persists, contact Cielo informing the BIN (6 first digits of the card)                             | Unauthorized transaction. Authentication failed. Try again and correctly enter the requested data. If the error persists, contact the merchant.                                                        | No                                                                                                             |
| AJ            | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again by selecting the Private Label option. | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Ask the carrier to try again by selecting the Private Label option. If not available the Private Label option check in Cielo if your establishment allows this operation. | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again and select the Private Label option. In case of a new error, contact the virtual store. | No                                                                                                             |
| AV            | Unauthorized transaction. Invalid data                                                                                                                | Validation of transaction data failed. Guide the carrier to review the data and try again.                                                                                                                                                                                     | Data validation failed. Review the reported data and try again.                                                                                                                                        | Only 4 times in 16 days.                                                                                       |
| BD            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| BL            | Unauthorized transaction. Daily limit exceeded.                                                                                                       | Unauthorized transaction. Daily limit exceeded. Ask the carrier to contact their issuing bank.                                                                                                                                                                                 | Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.                                                                                                                             | From the following day, only 4 times in 16 days.                                                               |
| BM            | Unauthorized transaction. Invalid card                                                                                                                | Unauthorized transaction. Invalid card. It may be card locking at the issuing bank or incorrect data. Try to use the Lhum Algorithm (Mod 10) to avoid unauthorized transactions for this reason.                                                                               | Unauthorized transaction. Invalid card. Redo the transaction confirming the reported data.                                                                                                             | No                                                                                                             |
| BN            | Unauthorized transaction. Card or account locked.                                                                                                     | Unauthorized transaction. Carrier's card or account is locked. Ask the carrier to contact their issuing bank.                                                                                                                                                                  | Unauthorized transaction. Carrier's card or account is locked. Contact your issuing bank.                                                                                                              | No                                                                                                             |
| BO            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if the error persists, contact the issuing bank.                                                                                                                             | Transaction not allowed. There was a processing error. Re-enter card data, if error persists, contact issuing bank.                                                                                    | Only 4 times in 16 days.                                                                                       |
| BP            | Unauthorized transaction. Non-existent checking account.                                                                                              | Unauthorized transaction. The transaction could not be processed due to an error related to the carrier's card or account. Ask the carrier to contact the issuing bank.                                                                                                        | Unauthorized transaction. Could not process the transaction due to an error related to the carrier's card or account. Contact the issuing bank.                                                        | No                                                                                                             |
| BP176         | Transaction not allowed.                                                                                                                              | Partner should check if the onboarding process has been completed successfully.                                                                                                                                                                                                | Partner should check if the onboarding process has been completed successfully.                                                                                                                        | ---                                                                                                            |
| C1            | Transaction not allowed. Card can't process debit transactions.                                                                                       | Change the payment method or card used.                                                                                                                                                                                                                                        | Change the payment method or card used.                                                                                                                                                                | No                                                                                                             |
| C2            | Transaction not allowed.                                                                                                                              | Incorrect data. Please review the data on the payment screen.                                                                                                                                                                                                                  | Incorrect data. Please review the data on the payment screen.                                                                                                                                          | No                                                                                                             |
| C3            | Transaction not allowed.                                                                                                                              | Invalid period for this type of transaction.                                                                                                                                                                                                                                   | Invalid period for this type of transaction.                                                                                                                                                           | No                                                                                                             |
| CF            | Unauthorized transaction.C79:J79 Data validation failed.                                                                                              | Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.                                                                                                                                                                                 | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                            | No                                                                                                             |
| CG            | Unauthorized transaction. Data validation failed.                                                                                                     | Unauthorized transaction. Data validation faileds. Ask the carrier to contact the issuing bank.                                                                                                                                                                                | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                            | No                                                                                                             |
| DF            | Transaction not allowed. Invalid card or card failure.                                                                                                | Transaction not allowed. Invalid card or card failure. Ask the carrier to re-enter the card data, if the error persists, contact the bank                                                                                                                                      | Transaction not allowed. Invalid card or card failure. Re-enter card data, if error persists, contact bank                                                                                             | Only 4 times in 16 days.                                                                                       |
| DM            | Unauthorized transaction. Limit exceeded/no balance.                                                                                                  | Unauthorized transaction. Limit exceeded/no balance.                                                                                                                                                                                                                           | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | From the following day, only 4 times in 16 days.                                                               |
| DQ            | Unauthorized transaction. Data validation failed.                                                                                                     | Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.                                                                                                                                                                                 | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                            | No                                                                                                             |
| DS            | Transaction not allowed for the card                                                                                                                  | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | Only 4 times in 16 days.                                                                                       |
| EB            | Number of installments greater than Allowed.                                                                                                          | Unauthorized transaction. Contact Cielo and check if the registration has released installments.                                                                                                                                                                               | Unauthorized transaction. Contact Cielo and check if the registration has been released in installments.                                                                                               | Yes                                                                                                            |
| EE            | Transaction not allowed. Installment value below the minimum allowed.                                                                                 | Transaction not allowed. Installment value below the minimum allowed. It is not permitted installments lower than R$5,00. It is necessary to revise the calculation for installments.                                                                                          | Transaction not allowed. Installment value is below the minimum allowed. Contact the virtual store.                                                                                                    | No                                                                                                             |
| EK            | Transaction not allowed for the card                                                                                                                  | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | Only 4 times in 16 days.                                                                                       |
| FC            | Unauthorized transaction. Call the Issuer                                                                                                             | Unauthorized transaction. Guide the carrier to contact the issuing bank.                                                                                                                                                                                                       | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | No                                                                                                             |
| FE            | Unauthorized transaction. Divergence on transaction/payment date.                                                                                     | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                      | Unauthorized transaction. Redo the transaction confirming data.                                                                                                                                        | No                                                                                                             |
| FF            | Cancellation OK                                                                                                                                       | Cancellation transaction authorized successfully. WARNING: This return is for cases of cancellations and not for cases of authorizations.                                                                                                                                      | Transação de cancelamento autorizada com sucesso                                                                                                                                                       | No                                                                                                             |
| FG            | Unauthorized transaction. Call AmEx 08007285090.                                                                                                      | Unauthorized transaction. Guide the carrier to contact AmEx Call Center.                                                                                                                                                                                                       | Unauthorized transaction. Contact the AmEx Call Center at the phone number 08007285090                                                                                                                 | No                                                                                                             |
| GA            | Wait for contact                                                                                                                                      | Unauthorized transaction. Referred by Lynx Online in a preventive way.                                                                                                                                                                                                         | Unauthorized transaction. Contact the merchant.                                                                                                                                                        | No                                                                                                             |
| GD            | Transaction not allowed.                                                                                                                              | Transaction can not be processed in the establishment. Contact Cielo for more details.                                                                                                                                                                                         | Transaction not allowed. Contact the virtual store                                                                                                                                                     | No                                                                                                             |
| HJ            | Transaction not allowed. Invalid operation code.                                                                                                      | Transaction not allowed. Invalid Coban operation code.                                                                                                                                                                                                                         | Transaction not allowed. Invalid Coban operation code. Contact the merchant.                                                                                                                           | No                                                                                                             |
| IA            | Transaction not allowed. Invalid operation indicator.                                                                                                 | Transaction not allowed. Invalid Coban operation indicator.                                                                                                                                                                                                                    | Transaction not allowed. Invalid Coban operation indicator. Contact the merchant.                                                                                                                      | No                                                                                                             |
| KA            | Transaction not allowed. Data validation failed.                                                                                                      | Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                             | Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.                                             | No                                                                                                             |
| KB            | Transaction not allowed. Incurred option selected.                                                                                                    | Transaction not allowed. Wrong option selected. Ask the carrier to review the data and try again. If the error persists, the communication between virtual store and Cielo must be checked.                                                                                    | Transaction not allowed. Wrong option selected. Try again. If the error persists, contact the Virtual Store.                                                                                           | No                                                                                                             |
| KE            | Unauthorized transaction. Data validation failed.                                                                                                     | Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the carrier.                                                                                                                                                  | Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the virtual store.                                                                                           | No                                                                                                             |
| N7            | Unauthorized transaction. Invalid security code.                                                                                                      | Unauthorized transaction. Invalid security code. Guide the carrier to correct the data and try again.                                                                                                                                                                          | Unauthorized transaction. Review the data and enter again.                                                                                                                                             | No                                                                                                             |
| U3            | Transaction not allowed. Data validation failed.                                                                                                      | Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                             | Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.                                             | No                                                                                                             |
| BR            | Unauthorized transaction. Account closed                                                                                                              | The bearer's account is closed. Ask the bearer to contact your issuing bank.                                                                                                                                                                                                   | The bearer's account is closed. Ask the bearer to contact your issuing bank.                                                                                                                           | No                                                                                                             |
| 46            | Unauthorized transaction. Account closed                                                                                                              | The bearer's account is closed. Ask the bearer to contact your issuing bank.                                                                                                                                                                                                   | The bearer's account is closed. Ask the bearer to contact your issuing bank.                                                                                                                           | No                                                                                                             |
| 6P            | Unauthorized transaction. Invalid data                                                                                                                | Transaction data validation failed. Instruct the holder to review the data and try again.                                                                                                                                                                                      | Data validation failed. Review the data entered and try again.                                                                                                                                         | Only 4 times in 16 days.                                                                                       |

## Status transactional

| Code | Status               | Means of payment | Description                                              |
| ---- | -------------------- | ---------------- | -------------------------------------------------------- |
| 0    | **NotFinished**      | ALL              | Waiting for status update                                |
| 1    | **Authorized**       | ALL              | Payment apt to be captured or defined as paid            |
| 2    | **PaymentConfirmed** | ALL              | Confirmed and finalized payment                          |
| 3    | **Declined**         | CC + CD + TF     | Payment declined by Authorizer                           |
| 10   | **Voided**           | ALL              | Canceled payment                                         |
| 11   | **Refunded**         | CC + CD          | Payment canceled after 11:59 pm on the authorization day |
| 12   | **Pending**          | ALL              | Waiting for financial institution status                 |
| 13   | **Aborted**          | ALL              | Payment canceled due to processing failure               |
| 20   | **Scheduled**        | CC               | Scheduled recurrence                                     |

-

| Payment method | Description         |
| -------------- | ------------------- |
| **ALL**        | All                 |
| **CC**         | Credit Card         |
| **CD**         | Debit Card          |
| **TF**         | Electronic Transfer |
| **BOL**        | Bank slip           |

## Integration errors

> **API Errors** - These codes are the responses to **validation of the content of the data sent**. <br>
> If this code is displayed, the request contains errors (e.g: size/conditions/registration errors) which prevent the creation of the transaction <BR><BR>_Returned at the time of request to the API_

```json
[
  {
    "Code": 126,
    "Message": "Credit Card Expiration Date is invalid"
  }
]
```

### API Error Codes

Codes returned in case of error, identifying the reason for the error and its respective messages.

| Code | Message                                                                                                        | Description                                                                                      |
| ---- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 0    | Internal error                                                                                                 | Sent data exceeds field size                                                                     |
| 100  | RequestId is required                                                                                          | Sent field is empty or invalid                                                                   |
| 101  | MerchantId is required                                                                                         | Sent field is empty or invalid                                                                   |
| 102  | Payment Type is required                                                                                       | Sent field is empty or invalid                                                                   |
| 103  | Payment Type can only contain letters                                                                          | Special characters not allowed                                                                   |
| 104  | Customer Identity is required                                                                                  | Sent field is empty or invalid                                                                   |
| 105  | Customer Name is required                                                                                      | Sent field is empty or invalid                                                                   |
| 106  | Transaction ID is required                                                                                     | Sent field is empty or invalid                                                                   |
| 107  | OrderId is invalid or does not exists                                                                          | Sent field exceeds size or contains special characters                                           |
| 108  | Amount must be greater or equal to zero                                                                        | Transaction value must be greater than "0"                                                       |
| 109  | Payment Currency is required                                                                                   | Sent field is empty or invalid                                                                   |
| 110  | Invalid Payment Currency                                                                                       | Sent field is empty or invalid                                                                   |
| 111  | Payment Country is required                                                                                    | Sent field is empty or invalid                                                                   |
| 112  | Invalid Payment Country                                                                                        | Sent field is empty or invalid                                                                   |
| 113  | Invalid Payment Code                                                                                           | Sent field is empty or invalid                                                                   |
| 114  | The provided MerchantId is not in correct format                                                               | The sent MerchantId is not a GUID                                                                |
| 115  | The provided MerchantId was not found                                                                          | MerchantID does not exist or belongs to another environment (e.g. Sandbox)                       |
| 116  | The provided MerchantId is blocked                                                                             | Locked store, contact Cielo support                                                              |
| 117  | Credit Card Holder is required                                                                                 | Sent field is empty or invalid                                                                   |
| 118  | Credit Card Number is required                                                                                 | Sent field is empty or invalid                                                                   |
| 119  | At least one Payment is required                                                                               | "Payment" node not sent                                                                          |
| 120  | Request IP not allowed. Check your IP White List                                                               | IP blocked for security reasons                                                                  |
| 121  | Customer is required                                                                                           | "Customer" node not sent                                                                         |
| 122  | MerchantOrderId is required                                                                                    | Sent field is empty or invalid                                                                   |
| 123  | Installments must be greater or equal to one                                                                   | Number of installments must be greater than 1                                                    |
| 124  | Credit Card is Required                                                                                        | Sent field is empty or invalid                                                                   |
| 125  | Credit Card Expiration Date is required                                                                        | Sent field is empty or invalid                                                                   |
| 126  | Credit Card Expiration Date is invalid                                                                         | Sent field is empty or invalid                                                                   |
| 127  | You must provide CreditCard Number                                                                             | Credit card number is required                                                                   |
| 128  | Card Number length exceeded                                                                                    | Card number greater than 16 digits                                                               |
| 129  | Affiliation not found                                                                                          | Payment means not linked to store or invalid Provider                                            |
| 130  | Could not get Credit Card                                                                                      | ---                                                                                              |
| 131  | MerchantKey is required                                                                                        | Sent field is empty or invalid                                                                   |
| 132  | MerchantKey is invalid                                                                                         | Sent Merchantkey is not a valid one                                                              |
| 133  | Provider is not supported for this Payment Type                                                                | Sent Provider does not exist                                                                     |
| 134  | FingerPrint length exceeded                                                                                    | Sent data exceeds field size                                                                     |
| 135  | MerchantDefinedFieldValue length exceeded                                                                      | Sent data exceeds field size                                                                     |
| 136  | ItemDataName length exceeded                                                                                   | Sent data exceeds field size                                                                     |
| 137  | ItemDataSKU length exceeded                                                                                    | Sent data exceeds field size                                                                     |
| 138  | PassengerDataName length exceeded                                                                              | Sent data exceeds field size                                                                     |
| 139  | PassengerDataStatus length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 140  | PassengerDataEmail length exceeded                                                                             | Sent data exceeds field size                                                                     |
| 141  | PassengerDataPhone length exceeded                                                                             | Sent data exceeds field size                                                                     |
| 142  | TravelDataRoute length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 143  | TravelDataJourneyType length exceeded                                                                          | Sent data exceeds field size                                                                     |
| 144  | TravelLegDataDestination length exceeded                                                                       | Sent data exceeds field size                                                                     |
| 145  | TravelLegDataOrigin length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 146  | SecurityCode length exceeded                                                                                   | Sent data exceeds field size                                                                     |
| 147  | Address Street length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 148  | Address Number length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 149  | Address Complement length exceeded                                                                             | Sent data exceeds field size                                                                     |
| 150  | Address ZipCode length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 151  | Address City length exceeded                                                                                   | Sent data exceeds field size                                                                     |
| 152  | Address State length exceeded                                                                                  | Sent data exceeds field size                                                                     |
| 153  | Address Country length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 154  | Address District length exceeded                                                                               | Sent data exceeds field size                                                                     |
| 155  | Customer Name length exceeded                                                                                  | Sent data exceeds field size                                                                     |
| 156  | Customer Identity length exceeded                                                                              | Sent data exceeds field size                                                                     |
| 157  | Customer IdentityType length exceeded                                                                          | Sent data exceeds field size                                                                     |
| 158  | Customer Email length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 159  | ExtraData Name length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 160  | ExtraData Value length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 161  | Boleto Instructions length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 162  | Boleto Demostrative length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 163  | Return Url is required                                                                                         | Return URL is not valid - No pagination or extensions are accepted (e.g. .PHP) in the return URL |
| 166  | AuthorizeNow is required                                                                                       | ---                                                                                              |
| 167  | Antifraud not configured                                                                                       | Antifraud not linked to the merchant's registry                                                  |
| 168  | Recurrent Payment not found                                                                                    | Recurrence not found                                                                             |
| 169  | Recurrent Payment is not active                                                                                | Recurrence is not active. Paralyzed execution                                                    |
| 170  | Protected Card not configured                                                                                  | Protected card not linked to merchant's registry                                                 |
| 171  | Affiliation data not sent                                                                                      | Order processing failed - Contact Cielo support                                                  |
| 172  | Credential Code is required                                                                                    | Failed to validate the sent credentials                                                          |
| 173  | Payment method is not enabled                                                                                  | Means of payment not linked to the merchant's registry                                           |
| 174  | Card Number is required                                                                                        | Sent field is empty or invalid                                                                   |
| 175  | EAN is required                                                                                                | Sent field is empty or invalid                                                                   |
| 176  | Payment Currency is not supported                                                                              | Sent field is empty or invalid                                                                   |
| 177  | Card Number is invalid                                                                                         | Sent field is empty or invalid                                                                   |
| 178  | EAN is invalid                                                                                                 | Sent field is empty or invalid                                                                   |
| 179  | The max number of installments allowed for recurring payment is 1                                              | Sent field is empty or invalid                                                                   |
| 180  | The provided Card PaymentToken was not found                                                                   | Protected Card Token not found                                                                   |
| 181  | The MerchantIdJustClick is not configured                                                                      | Protected Card Token locked                                                                      |
| 182  | Brand is required                                                                                              | Card issuer not sent                                                                             |
| 183  | Invalid customer bithdate                                                                                      | Invalid or future date of birth                                                                  |
| 184  | Request could not be empty                                                                                     | Failure of the request format. Check the sent code                                               |
| 185  | Brand is not supported by selected provider                                                                    | Card issuer not supported by API Cielo                                                           |
| 186  | The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments) | Payment means does not support the sent command                                                  |
| 187  | ExtraData Collection contains one or more duplicated names                                                     | ---                                                                                              |
| 193  | Split Amount must be greater than zero                                                                         | Value for SPLIT realization must be greater than 0                                               |
| 194  | Split Establishment is Required                                                                                | SPLIT not enabled for store registration                                                         |
| 195  | The PlataformId is required                                                                                    | Platforms validated not sent                                                                     |
| 196  | DeliveryAddress is required                                                                                    | Required field not sent                                                                          |
| 197  | Street is required                                                                                             | Required field not sent                                                                          |
| 198  | Number is required                                                                                             | Required field not sent                                                                          |
| 199  | ZipCode is required                                                                                            | Required field not sent                                                                          |
| 200  | City is required                                                                                               | Required field not sent                                                                          |
| 201  | State is required                                                                                              | Required field not sent                                                                          |
| 202  | District is required                                                                                           | Required field not sent                                                                          |
| 203  | Cart item Name is required                                                                                     | Required field not sent                                                                          |
| 204  | Cart item Quantity is required                                                                                 | Required field not sent                                                                          |
| 205  | Cart item type is required                                                                                     | Required field not sent                                                                          |
| 206  | Cart item name length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 207  | Cart item description length exceeded                                                                          | Sent data exceeds field size                                                                     |
| 208  | Cart item sku length exceeded                                                                                  | Sent data exceeds field size                                                                     |
| 209  | Shipping addressee sku length exceeded                                                                         | Sent data exceeds field size                                                                     |
| 210  | Shipping data cannot be null                                                                                   | Required field not sent                                                                          |
| 211  | WalletKey is invalid                                                                                           | Invalid Visa Checkout data                                                                       |
| 212  | Merchant Wallet Configuration not found                                                                        | Sent Wallet data is not valid                                                                    |
| 213  | Credit Card Number is invalid                                                                                  | Sent credit card is invalid                                                                      |
| 214  | Credit Card Holder Must Have Only Letters                                                                      | Card carrier must not contain special characters                                                 |
| 215  | Agency is required in Boleto Credential                                                                        | Required field not sent                                                                          |
| 216  | Customer IP address is invalid                                                                                 | IP blocked for security reasons                                                                  |
| 300  | MerchantId was not found                                                                                       | ---                                                                                              |
| 301  | Request IP is not allowed                                                                                      | ---                                                                                              |
| 302  | Sent MerchantOrderId is duplicated                                                                             | ---                                                                                              |
| 303  | Sent OrderId does not exist                                                                                    | ---                                                                                              |
| 304  | Customer Identity is required                                                                                  | ---                                                                                              |
| 306  | Merchant is blocked                                                                                            | ---                                                                                              |
| 307  | Transaction not found                                                                                          | Transaction not found or does not exist in the environment.                                      |
| 308  | Transaction not available to capture                                                                           | Transaction can not be captured - Contact Cielo support                                          |
| 309  | Transaction not available to void                                                                              | Transaction can not be canceled - Contact Cielo support                                          |
| 310  | Payment method doest not support this operation                                                                | Sent command not supported by payment means                                                      |
| 311  | Refund is not enabled for this merchant                                                                        | Cancellation after 24 hours not released to the merchant                                         |
| 312  | Transaction not available to refund                                                                            | Transaction does not allow cancellation after 24 hours                                           |
| 313  | Recurrent Payment not found                                                                                    | Recurrent transaction not found or not available in the environment                              |
| 314  | Invalid Integration                                                                                            | ---                                                                                              |
| 315  | Cannot change NextRecurrency with pending payment                                                              | ---                                                                                              |
| 316  | Cannot set NextRecurrency to past date                                                                         | It is not allowed to change the recurrence date to a past date                                   |
| 317  | Invalid Recurrency Day                                                                                         | ---                                                                                              |
| 318  | No transaction found                                                                                           | ---                                                                                              |
| 319  | Smart recurrency is not enabled                                                                                | Recurrence not linked to the merchant's registration                                             |
| 320  | Can not Update Affiliation Because this Recurrency not Affiliation saved                                       | ---                                                                                              |
| 321  | Can not set EndDate to before next recurrency.                                                                 | ---                                                                                              |
| 322  | Zero Dollar Auth is not enabled                                                                                | Zero Dollar not linked to the merchant's registration                                            |
| 323  | Bin Query is not enabled                                                                                       | Bins query not linked to the merchant's registration                                             |

### Return Reason Codes

| Reason Code | Reason Message               |
| ----------- | ---------------------------- |
| 0           | Successful                   |
| 1           | AffiliationNotFound          |
| 2           | IssuficientFunds             |
| 3           | CouldNotGetCreditCard        |
| 4           | ConnectionWithAcquirerFailed |
| 5           | InvalidTransactionType       |
| 6           | InvalidPaymentPlan           |
| 7           | Denied                       |
| 8           | Scheduled                    |
| 9           | Waiting                      |
| 10          | Authenticated                |
| 11          | NotAuthenticated             |
| 12          | ProblemsWithCreditCard       |
| 13          | CardCanceled                 |
| 14          | BlockedCreditCard            |
| 15          | CardExpired                  |
| 16          | AbortedByFraud               |
| 17          | CouldNotAntifraud            |
| 18          | TryAgain                     |
| 19          | InvalidAmount                |
| 20          | ProblemsWithIssuer           |
| 21          | InvalidCardNumber            |
| 22          | TimeOut                      |
| 23          | CartaoProtegidoIsNotEnabled  |
| 24          | PaymentMethodIsNotEnabled    |
| 98          | InvalidRequest               |
| 99          | InternalError                |

# Annexes

## Affiliate Settings.

Some transaction types require that their Affiliation is properly set up with Cielo. We suggest that, by default, you validate with our call center if your affiliation is able to transact in any of the scenarios below:

| Scenario                                  |
| ----------------------------------------- |
| Recurrence                                |
| Transaction without CVV                   |
| Customizing the validity of a transaction |

## List of Providers

| Means of payment           | Provider                       |
| -------------------------- | ------------------------------ |
| Credit card                | `Cielo`                        |
| Debit card                 | `Cielo`                        |
| Bank slip - Not registered | `Bradesco` / `BancodoBrasil`   |
| Bank slip - Registered     | `Bradesco2` / `BancodoBrasil2` |
| Electronic Transfer        | `Bradesco` / `BancodoBrasil`   |

## Types of means of payment

| MEANS OF PAYMENT    | PAYMENT.TYPE      |
| ------------------- | ----------------- |
| Credit card         | CreditCard        |
| Debit cardo         | DebitCard         |
| Bank slip           | Bank slip         |
| Electronic Transfer | EletronicTransfer |

## Soft Descriptor

It allows the merchant to send a supplementary text that will be printed on the buyer's invoice along with the identification of the store name that appears in Cielo register.

**Rules**

- Maximum field size: 13 characters.
- Available only for Visa and MasterCard issuers.
- Can not contain special characters.

To know and/or change the name of the store that is registered, contact the Cielo relationship center.

# Questions and Support

If you have any questions or any other technical information, contact Cielo e-Commerce Web Support at the following channels:

- **E-mail:** [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)
- **Capitals:** 4002-9700
- **Other Cities:** 0800 570 1700

## Status transactional

| Code | Status               | Means of payment | Description                                              |
| ---- | -------------------- | ---------------- | -------------------------------------------------------- |
| 0    | **NotFinished**      | ALL              | Waiting for status update                                |
| 1    | **Authorized**       | ALL              | Payment apt to be captured or defined as paid            |
| 2    | **PaymentConfirmed** | ALL              | Confirmed and finalized payment                          |
| 3    | **Declined**         | CC + CD + TF     | Payment declined by Authorizer                           |
| 10   | **Voided**           | ALL              | Canceled payment                                         |
| 11   | **Refunded**         | CC + CD          | Payment canceled after 11:59 pm on the authorization day |
| 12   | **Pending**          | ALL              | Waiting for financial institution status                 |
| 13   | **Aborted**          | ALL              | Payment canceled due to processing failure               |
| 20   | **Scheduled**        | CC               | Scheduled recurrence                                     |

-

| Payment method | Description         |
| -------------- | ------------------- |
| **ALL**        | All                 |
| **CC**         | Credit Card         |
| **CD**         | Debit Card          |
| **TF**         | Electronic Transfer |
| **BOL**        | Bank slip           |

## Integration errors

> **API Errors** - These codes are the responses to **validation of the content of the data sent**. <br>
> If this code is displayed, the request contains errors (e.g: size/conditions/registration errors) which prevent the creation of the transaction <BR><BR>_Returned at the time of request to the API_

```json
[
  {
    "Code": 126,
    "Message": "Credit Card Expiration Date is invalid"
  }
]
```

### API Error Codes

Codes returned in case of error, identifying the reason for the error and its respective messages.

| Code | Message                                                                                                        | Description                                                                                      |
| ---- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 0    | Internal error                                                                                                 | Sent data exceeds field size                                                                     |
| 100  | RequestId is required                                                                                          | Sent field is empty or invalid                                                                   |
| 101  | MerchantId is required                                                                                         | Sent field is empty or invalid                                                                   |
| 102  | Payment Type is required                                                                                       | Sent field is empty or invalid                                                                   |
| 103  | Payment Type can only contain letters                                                                          | Special characters not allowed                                                                   |
| 104  | Customer Identity is required                                                                                  | Sent field is empty or invalid                                                                   |
| 105  | Customer Name is required                                                                                      | Sent field is empty or invalid                                                                   |
| 106  | Transaction ID is required                                                                                     | Sent field is empty or invalid                                                                   |
| 107  | OrderId is invalid or does not exists                                                                          | Sent field exceeds size or contains special characters                                           |
| 108  | Amount must be greater or equal to zero                                                                        | Transaction value must be greater than "0"                                                       |
| 109  | Payment Currency is required                                                                                   | Sent field is empty or invalid                                                                   |
| 110  | Invalid Payment Currency                                                                                       | Sent field is empty or invalid                                                                   |
| 111  | Payment Country is required                                                                                    | Sent field is empty or invalid                                                                   |
| 112  | Invalid Payment Country                                                                                        | Sent field is empty or invalid                                                                   |
| 113  | Invalid Payment Code                                                                                           | Sent field is empty or invalid                                                                   |
| 114  | The provided MerchantId is not in correct format                                                               | The sent MerchantId is not a GUID                                                                |
| 115  | The provided MerchantId was not found                                                                          | MerchantID does not exist or belongs to another environment (e.g. Sandbox)                       |
| 116  | The provided MerchantId is blocked                                                                             | Locked store, contact Cielo support                                                              |
| 117  | Credit Card Holder is required                                                                                 | Sent field is empty or invalid                                                                   |
| 118  | Credit Card Number is required                                                                                 | Sent field is empty or invalid                                                                   |
| 119  | At least one Payment is required                                                                               | "Payment" node not sent                                                                          |
| 120  | Request IP not allowed. Check your IP White List                                                               | IP blocked for security reasons                                                                  |
| 121  | Customer is required                                                                                           | "Customer" node not sent                                                                         |
| 122  | MerchantOrderId is required                                                                                    | Sent field is empty or invalid                                                                   |
| 123  | Installments must be greater or equal to one                                                                   | Number of installments must be greater than 1                                                    |
| 124  | Credit Card is Required                                                                                        | Sent field is empty or invalid                                                                   |
| 125  | Credit Card Expiration Date is required                                                                        | Sent field is empty or invalid                                                                   |
| 126  | Credit Card Expiration Date is invalid                                                                         | Sent field is empty or invalid                                                                   |
| 127  | You must provide CreditCard Number                                                                             | Credit card number is required                                                                   |
| 128  | Card Number length exceeded                                                                                    | Card number greater than 16 digits                                                               |
| 129  | Affiliation not found                                                                                          | Payment means not linked to store or invalid Provider                                            |
| 130  | Could not get Credit Card                                                                                      | ---                                                                                              |
| 131  | MerchantKey is required                                                                                        | Sent field is empty or invalid                                                                   |
| 132  | MerchantKey is invalid                                                                                         | Sent Merchantkey is not a valid one                                                              |
| 133  | Provider is not supported for this Payment Type                                                                | Sent Provider does not exist                                                                     |
| 134  | FingerPrint length exceeded                                                                                    | Sent data exceeds field size                                                                     |
| 135  | MerchantDefinedFieldValue length exceeded                                                                      | Sent data exceeds field size                                                                     |
| 136  | ItemDataName length exceeded                                                                                   | Sent data exceeds field size                                                                     |
| 137  | ItemDataSKU length exceeded                                                                                    | Sent data exceeds field size                                                                     |
| 138  | PassengerDataName length exceeded                                                                              | Sent data exceeds field size                                                                     |
| 139  | PassengerDataStatus length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 140  | PassengerDataEmail length exceeded                                                                             | Sent data exceeds field size                                                                     |
| 141  | PassengerDataPhone length exceeded                                                                             | Sent data exceeds field size                                                                     |
| 142  | TravelDataRoute length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 143  | TravelDataJourneyType length exceeded                                                                          | Sent data exceeds field size                                                                     |
| 144  | TravelLegDataDestination length exceeded                                                                       | Sent data exceeds field size                                                                     |
| 145  | TravelLegDataOrigin length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 146  | SecurityCode length exceeded                                                                                   | Sent data exceeds field size                                                                     |
| 147  | Address Street length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 148  | Address Number length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 149  | Address Complement length exceeded                                                                             | Sent data exceeds field size                                                                     |
| 150  | Address ZipCode length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 151  | Address City length exceeded                                                                                   | Sent data exceeds field size                                                                     |
| 152  | Address State length exceeded                                                                                  | Sent data exceeds field size                                                                     |
| 153  | Address Country length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 154  | Address District length exceeded                                                                               | Sent data exceeds field size                                                                     |
| 155  | Customer Name length exceeded                                                                                  | Sent data exceeds field size                                                                     |
| 156  | Customer Identity length exceeded                                                                              | Sent data exceeds field size                                                                     |
| 157  | Customer IdentityType length exceeded                                                                          | Sent data exceeds field size                                                                     |
| 158  | Customer Email length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 159  | ExtraData Name length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 160  | ExtraData Value length exceeded                                                                                | Sent data exceeds field size                                                                     |
| 161  | Boleto Instructions length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 162  | Boleto Demostrative length exceeded                                                                            | Sent data exceeds field size                                                                     |
| 163  | Return Url is required                                                                                         | Return URL is not valid - No pagination or extensions are accepted (e.g. .PHP) in the return URL |
| 166  | AuthorizeNow is required                                                                                       | ---                                                                                              |
| 167  | Antifraud not configured                                                                                       | Antifraud not linked to the merchant's registry                                                  |
| 168  | Recurrent Payment not found                                                                                    | Recurrence not found                                                                             |
| 169  | Recurrent Payment is not active                                                                                | Recurrence is not active. Paralyzed execution                                                    |
| 170  | Protected Card not configured                                                                                  | Protected card not linked to merchant's registry                                                 |
| 171  | Affiliation data not sent                                                                                      | Order processing failed - Contact Cielo support                                                  |
| 172  | Credential Code is required                                                                                    | Failed to validate the sent credentials                                                          |
| 173  | Payment method is not enabled                                                                                  | Means of payment not linked to the merchant's registry                                           |
| 174  | Card Number is required                                                                                        | Sent field is empty or invalid                                                                   |
| 175  | EAN is required                                                                                                | Sent field is empty or invalid                                                                   |
| 176  | Payment Currency is not supported                                                                              | Sent field is empty or invalid                                                                   |
| 177  | Card Number is invalid                                                                                         | Sent field is empty or invalid                                                                   |
| 178  | EAN is invalid                                                                                                 | Sent field is empty or invalid                                                                   |
| 179  | The max number of installments allowed for recurring payment is 1                                              | Sent field is empty or invalid                                                                   |
| 180  | The provided Card PaymentToken was not found                                                                   | Protected Card Token not found                                                                   |
| 181  | The MerchantIdJustClick is not configured                                                                      | Protected Card Token locked                                                                      |
| 182  | Brand is required                                                                                              | Card issuer not sent                                                                             |
| 183  | Invalid customer bithdate                                                                                      | Invalid or future date of birth                                                                  |
| 184  | Request could not be empty                                                                                     | Failure of the request format. Check the sent code                                               |
| 185  | Brand is not supported by selected provider                                                                    | Card issuer not supported by API Cielo                                                           |
| 186  | The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments) | Payment means does not support the sent command                                                  |
| 187  | ExtraData Collection contains one or more duplicated names                                                     | ---                                                                                              |
| 193  | Split Amount must be greater than zero                                                                         | Value for SPLIT realization must be greater than 0                                               |
| 194  | Split Establishment is Required                                                                                | SPLIT not enabled for store registration                                                         |
| 195  | The PlataformId is required                                                                                    | Platforms validated not sent                                                                     |
| 196  | DeliveryAddress is required                                                                                    | Required field not sent                                                                          |
| 197  | Street is required                                                                                             | Required field not sent                                                                          |
| 198  | Number is required                                                                                             | Required field not sent                                                                          |
| 199  | ZipCode is required                                                                                            | Required field not sent                                                                          |
| 200  | City is required                                                                                               | Required field not sent                                                                          |
| 201  | State is required                                                                                              | Required field not sent                                                                          |
| 202  | District is required                                                                                           | Required field not sent                                                                          |
| 203  | Cart item Name is required                                                                                     | Required field not sent                                                                          |
| 204  | Cart item Quantity is required                                                                                 | Required field not sent                                                                          |
| 205  | Cart item type is required                                                                                     | Required field not sent                                                                          |
| 206  | Cart item name length exceeded                                                                                 | Sent data exceeds field size                                                                     |
| 207  | Cart item description length exceeded                                                                          | Sent data exceeds field size                                                                     |
| 208  | Cart item sku length exceeded                                                                                  | Sent data exceeds field size                                                                     |
| 209  | Shipping addressee sku length exceeded                                                                         | Sent data exceeds field size                                                                     |
| 210  | Shipping data cannot be null                                                                                   | Required field not sent                                                                          |
| 211  | WalletKey is invalid                                                                                           | Invalid Visa Checkout data                                                                       |
| 212  | Merchant Wallet Configuration not found                                                                        | Sent Wallet data is not valid                                                                    |
| 213  | Credit Card Number is invalid                                                                                  | Sent credit card is invalid                                                                      |
| 214  | Credit Card Holder Must Have Only Letters                                                                      | Card carrier must not contain special characters                                                 |
| 215  | Agency is required in Boleto Credential                                                                        | Required field not sent                                                                          |
| 216  | Customer IP address is invalid                                                                                 | IP blocked for security reasons                                                                  |
| 300  | MerchantId was not found                                                                                       | ---                                                                                              |
| 301  | Request IP is not allowed                                                                                      | ---                                                                                              |
| 302  | Sent MerchantOrderId is duplicated                                                                             | ---                                                                                              |
| 303  | Sent OrderId does not exist                                                                                    | ---                                                                                              |
| 304  | Customer Identity is required                                                                                  | ---                                                                                              |
| 306  | Merchant is blocked                                                                                            | ---                                                                                              |
| 307  | Transaction not found                                                                                          | Transaction not found or does not exist in the environment.                                      |
| 308  | Transaction not available to capture                                                                           | Transaction can not be captured - Contact Cielo support                                          |
| 309  | Transaction not available to void                                                                              | Transaction can not be canceled - Contact Cielo support                                          |
| 310  | Payment method doest not support this operation                                                                | Sent command not supported by payment means                                                      |
| 311  | Refund is not enabled for this merchant                                                                        | Cancellation after 24 hours not released to the merchant                                         |
| 312  | Transaction not available to refund                                                                            | Transaction does not allow cancellation after 24 hours                                           |
| 313  | Recurrent Payment not found                                                                                    | Recurrent transaction not found or not available in the environment                              |
| 314  | Invalid Integration                                                                                            | ---                                                                                              |
| 315  | Cannot change NextRecurrency with pending payment                                                              | ---                                                                                              |
| 316  | Cannot set NextRecurrency to past date                                                                         | It is not allowed to change the recurrence date to a past date                                   |
| 317  | Invalid Recurrency Day                                                                                         | ---                                                                                              |
| 318  | No transaction found                                                                                           | ---                                                                                              |
| 319  | Smart recurrency is not enabled                                                                                | Recurrence not linked to the merchant's registration                                             |
| 320  | Can not Update Affiliation Because this Recurrency not Affiliation saved                                       | ---                                                                                              |
| 321  | Can not set EndDate to before next recurrency.                                                                 | ---                                                                                              |
| 322  | Zero Dollar Auth is not enabled                                                                                | Zero Dollar not linked to the merchant's registration                                            |
| 323  | Bin Query is not enabled                                                                                       | Bins query not linked to the merchant's registration                                             |

### Return Reason Codes

| Reason Code | Reason Message               |
| ----------- | ---------------------------- |
| 0           | Successful                   |
| 1           | AffiliationNotFound          |
| 2           | IssuficientFunds             |
| 3           | CouldNotGetCreditCard        |
| 4           | ConnectionWithAcquirerFailed |
| 5           | InvalidTransactionType       |
| 6           | InvalidPaymentPlan           |
| 7           | Denied                       |
| 8           | Scheduled                    |
| 9           | Waiting                      |
| 10          | Authenticated                |
| 11          | NotAuthenticated             |
| 12          | ProblemsWithCreditCard       |
| 13          | CardCanceled                 |
| 14          | BlockedCreditCard            |
| 15          | CardExpired                  |
| 16          | AbortedByFraud               |
| 17          | CouldNotAntifraud            |
| 18          | TryAgain                     |
| 19          | InvalidAmount                |
| 20          | ProblemsWithIssuer           |
| 21          | InvalidCardNumber            |
| 22          | TimeOut                      |
| 23          | CartaoProtegidoIsNotEnabled  |
| 24          | PaymentMethodIsNotEnabled    |
| 98          | InvalidRequest               |
| 99          | InternalError                |

# Annexes

## Affiliate Settings.

Some transaction types require that their Affiliation is properly set up with Cielo. We suggest that, by default, you validate with our call center if your affiliation is able to transact in any of the scenarios below:

| Scenario                                  |
| ----------------------------------------- |
| Recurrence                                |
| Transaction without CVV                   |
| Customizing the validity of a transaction |

## List of Providers

| Means of payment           | Provider                       |
| -------------------------- | ------------------------------ |
| Credit card                | `Cielo`                        |
| Debit card                 | `Cielo`                        |
| Bank slip - Not registered | `Bradesco` / `BancodoBrasil`   |
| Bank slip - Registered     | `Bradesco2` / `BancodoBrasil2` |
| Electronic Transfer        | `Bradesco` / `BancodoBrasil`   |

## Types of means of payment

| MEANS OF PAYMENT    | PAYMENT.TYPE      |
| ------------------- | ----------------- |
| Credit card         | CreditCard        |
| Debit cardo         | DebitCard         |
| Bank slip           | Bank slip         |
| Electronic Transfer | EletronicTransfer |

## Merchant Defined Data

The table below lists all possible codes to be sent in the MerchantDefinedData parameter and respective type of information that must be filled in.

| ID      | Data                                          | Description                                                                                                                                                                                                                      | Type   |
| ------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1       | Customer logged in                            | If the final customer logged in on the site to buy, send: their login. If the customer made a purchase as a visitor, send: "Guest". If the sale was made direct by a third party, an agent for example, do not send the field    | String |
| 2       | Customer of the establishment since: #days    | Number of days                                                                                                                                                                                                                   | Number |
| 3       | Purchase Made in (installments)               | Number of installments                                                                                                                                                                                                           | Number |
| 4       | Sales Channel                                 | Values: "Call Center" = purchase by phone <br> "Web" = purchase by web <br> "Portal" = an agent making the purchase for the customer <br> "Kiosk" = Purchases in kiosks <br> "Mobile" = Purchases made on smartphones or tablets | String |
| 5       | Coupon Code/Discount                          | If the buyer is to use coupon, send the coupon code                                                                                                                                                                              | String |
| 6       | Last purchase made                            | MM DD YYYY                                                                                                                                                                                                                       | Date   |
| 7       | Affiliation                                   | Name or code of dealer or broker                                                                                                                                                                                                 | String |
| 8       | Attempts to Purchase                          | Number of times tried to make the order payment. Different attempted credit cards and/or other means of payments attempted. For the same order.                                                                                  | Number |
| 9       | Customer will withdraw the product in a Store | Values: "YES", "NO" In the case of an agency, if you are going to withdraw any voucher and/or ticket physically                                                                                                                  | String |
| 10      | Payment made by third party                   | Values: "YES", "NO" Whether or not the payer is present on the trip or package                                                                                                                                                   | String |
| 11      | Hotel Category                                | Values: 1, 2, 3, 4, 5 How many stars has the hotel                                                                                                                                                                               | Number |
| 12      | Hotel Check-in date                           | MM DD YYYY                                                                                                                                                                                                                       | Date   |
| 13      | Hotel Check-out date                          | MM DD YYYY                                                                                                                                                                                                                       | Date   |
| 14      | Travel/Package                                | Values: "National", "International", "National/International"                                                                                                                                                                    | String |
| 15      | Name of Airline/Car Rental/Hotel              | Send the name of each company, separated by "/"                                                                                                                                                                                  | String |
| 16      | PNR                                           | Send the reservation PNR number. When there is a change in the reservation for this PNR with anticipation of the flight date, it is important to do a new analysis of fraud by sending this PNR again.                           | String |
| 17      | There was anticipation of reservation?        | Values: "YES", "NO" Indicate whether the flight was remarked to a date earlier than the original. It is also important to send the PNR field                                                                                     | String |
| 18      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 19      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 20      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 21      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 22      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 23      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 24      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 25      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 26      | Credit Card Bin                               | Send the bin - 6 first digits of the card                                                                                                                                                                                        | String |
| 27      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 28      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 29      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 30      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 31      | Number of Credit Cards exchanges              | Number of times the buyer has exchanged the credit card to make the payment of the order                                                                                                                                         | Number |
| 32      | E-mail pasted or typed                        | Values: "Typed", "Pasted" Report whether the e-mail address was typed or pasted into the field                                                                                                                                   | String |
| 33      | Card Number pasted or typed                   | Values: "Typed", "Pasted" Report whether the credit card number was typed or pasted into the field                                                                                                                               | String |
| 34      | E-mail confirmed                              | If there is an e-mail confirmation routine for account activation. Values: "YES". In case of negative, do not send the MDD                                                                                                       | String |
| 35      | Customer type (local or tourist)              | Values: "Local", "Tourist". Do not send the MDD in the case of not having this information                                                                                                                                       | String |
| 36      | Use gift card at purchase ($)                 | Report if Gift Card was used (Gift Card) at purchase. Values: "YES". In case of negative, do not send the MDD                                                                                                                    | String |
| 37      | Shipping method                               | Values: "Sedex", "Sedex 10", "1 Day", "2 Days", "Motoboy", "Same Day", etc. If there is no shipping, do not send the MDD                                                                                                         | String |
| 38      | Caller ID number                              | Inform the identified phone number, with DDD                                                                                                                                                                                     | String |
| 39      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 40      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 41 a 95 | Free Field                                    | The fields are reserved for sending merchant data, according to the business rule.                                                                                                                                               | String |
| 96      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 97      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 98      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 99      | (reserved)                                    |                                                                                                                                                                                                                                  |        |
| 100     | Document                                      | Document (CPF, RG, etc.)                                                                                                                                                                                                         | String |

## Fraud Analysis Values

### FraudAnalysis.status

| Field         | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| Started       | Transaction received by Cielo.                                      |
| Accept        | Transaction accepted after fraud analysis.                          |
| Review        | Transaction under review after fraud analysis.                      |
| Reject        | Transaction rejected after fraud analysis.                          |
| Unfinished    | Transaction not finalized due to some internal error in the system. |
| Pendent       | Transaction waiting for analysis                                    |
| ProviderError | Transaction with error in antifraud provider.                       |

### FraudAnalysis.Items.GiftCategory

| Field | Description                                                                       |
| ----- | --------------------------------------------------------------------------------- |
| Yes   | In case of divergence between billing and delivery addresses, mark as small risk. |
| No    | In case of divergence between billing and delivery addresses, mark as high risk.  |
| Off   | Ignores risk analysis for divergent addresses.                                    |

### FraudAnalysis.Items.HostHedge

| Field  | Description                                                   |
| ------ | ------------------------------------------------------------- |
| Low    | Low importance of e-mail and IP address in risk analysis.     |
| Normal | Average importance of e-mail and IP address in risk analysis. |
| High   | High importance of e-mail and IP address in risk analysis.    |
| Off    | E-mail and IP address do not affect the risk analysis.        |

### FraudAnalysis.Items.NonSensicalHedge

| Field  | Description                                                                             |
| ------ | --------------------------------------------------------------------------------------- |
| Low    | Low importance of the verification made on the buyer's order, in the risk analysis.     |
| Normal | Average importance of the verification made on the buyer's order, in the risk analysis. |
| High   | High importance of the verification made on the buyer's order, in the risk analysis.    |
| Off    | Verification of buyer's order does not affect risk analysis.                            |

### FraudAnalysis.Items.ObscenitiesHedge

| Field  | Description                                                                            |
| ------ | -------------------------------------------------------------------------------------- |
| Low    | Low importance of obscenities verification of buyer's order, in the risk analysis.     |
| Normal | Average importance of obscenities verification of buyer's order, in the risk analysis. |
| High   | High importance of obscenities verification of buyer's order, in the risk analysis.    |
| Off    | Obscenity verification of buyer's order does not affect risk analysis.                 |

### FraudAnalysis.Items.PhoneHedge

| Field  | Description                                                   |
| ------ | ------------------------------------------------------------- |
| Low    | Low importance on tests performed with telephone numbers.     |
| Normal | Average importance on tests performed with telephone numbers. |
| High   | High importance on tests performed with telephone numbers.    |
| Off    | Phone number tests do not affect risk analysis.               |

### FraudAnalysis.Items.Risk

| Field  | Description                                                 |
| ------ | ----------------------------------------------------------- |
| Low    | The product has a history of few chargebacks.               |
| Normal | The product has a history of chargebacks considered normal. |
| High   | Product has an above average chargeback history.            |

### FraudAnalysis.Items.TimeHedge

| Field  | Description                                                                              |
| ------ | ---------------------------------------------------------------------------------------- |
| Low    | Low importance of the time of day when the purchase was made, for the risk analysis.     |
| Normal | Average importance of the time of day when the purchase was made, for the risk analysis. |
| High   | High importance of the time of day when the purchase was made, for the risk analysis.    |
| Off    | Purchase time does not affect risk analysis.                                             |

### FraudAnalysis.Items.Type

| Field | Description    |
| ----- | -------------- |
| CN    | Business buyer |
| CP    | Private buyer  |

### FraudAnalysis.Items.VelocityHedge

| Field  | Description                                                                                |
| ------ | ------------------------------------------------------------------------------------------ |
| Low    | Low importance on the number of purchases made by the customer in the last 15 minutes.     |
| Normal | Average importance on the number of purchases made by the customer in the last 15 minutes. |
| High   | High importance on the number of purchases made by the customer in the last 15 minutes.    |
| Off    | The frequency of purchases made by the customer does not affect the fraud analysis.        |

### FraudAnalysis.Items.Passenger.Rating

| Field         | Description         |
| ------------- | ------------------- |
| Adult         | Adult passenger.    |
| Child         | Child passenger.    |
| Infant        | Infant passenger.   |
| Youth         | Teenage passenger.  |
| Student       | Student passenger.  |
| SeniorCitizen | Elderly passenger.  |
| Military      | Military passenger. |

### FraudAnalysis.Shipping.Method

| Field    |
| -------- |
| None     |
| SameDay  |
| OneDay   |
| TwoDay   |
| ThreeDay |
| LowCost  |
| Pickup   |
| Other    |

## Values List - Payment.Chargebacks[n].Status

| Value               | Description                                                                                                                                                  |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Received            | Chargeback received from acquirer                                                                                                                            |
| AcceptedByMerchant  | Chargeback accepted by establishment. In this case the establishment understands that it has indeed suffered a chargeback and will not hold the contestation |
| ContestedByMerchant | Chargeback contested by establishment. In this case the establishment has sent the necessary documents to try to reverse the chargeback                      |

## Service Tax Amount - BOARDING FEE

**The boarding fee** (servicetaxamount) is an information field that defines the total amount of the transaction that should be used to pay the fee to Infraero. The value of the boarding fee is not accumulated at the value of the authorization.

- _e.g._: In an airline ticket sale of R$200,00 with boarding fee of R$25,00, the field `Payment.ServiceTaxAmount` must be sent as 2500

**Rules**

- Available only for Visa, Mastercard and Amex issuers.
- The value of the boarding fee is not added to the value of the authorization, i.e. it is only informative.

There are specific rules for the requisition of capture with boarding fee, available in the item Total and Partial Capture.

## Soft Descriptor

It allows the merchant to send a supplementary text that will be printed on the buyer's invoice along with the identification of the store name that appears in Cielo register.

**Rules**

- Maximum field size: 13 characters.
- Available only for Visa and MasterCard issuers.
- Can not contain special characters.

To know and/or change the name of the store that is registered, contact the Cielo relationship center.

# Questions and Support

If you have any questions or any other technical information, contact Cielo e-Commerce Web Support at the following channels:

- **E-mail:** [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)
- **Capitals:** 4002-9700
- **Other Cities:** 0800 570 1700

Opening hours: 24 hours a day, 7 days a week.
