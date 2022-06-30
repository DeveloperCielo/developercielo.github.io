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

# Overview - API Cielo E-commerce 

The purpose of this documentation is to guide the developer on how to integrate with Cielo's API Cielo eCommerce, describing the features, methods to be used, listing information to be sent and received, and providing examples.

The integration mechanism with Cielo E-commerce is simple, so only intermediate knowledge in Web programming language, HTTP/HTTPS requests and JSON file manipulation are required to successfully deploy the Cielo e-Commerce solution.

In this manual, you will find the reference on all operations available on API REST of API Cielo eCommerce. These operations must be performed using its specific key (Merchant ID and Merchant Key) in the respective environment endpoints

|                 | SandBox                                             | Production                                    |
|:----------------|:---------------------------------------------------:|:---------------------------------------------:|
| **Requests**    | https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |
| **Queries**     | https://apiquerysandbox.cieloecommerce.cielo.com.br | https://apiquery.cieloecommerce.cielo.com.br/ |

To perform an operation, combine the base URL of the environment with the URL of the desired operation and send it using the HTTP verb as described in the operation.

## Solution features

The API Cielo eCommerce solution of the Cielo eCommerce platform was developed with REST technology, which is market standard and also independent of the technology used by our customers. In this way, it is possible to integrate using the most varied programming languages, such as: 

* ASP
* Net
* Java
* PHP
* Ruby
* Python

> To get examples in these languages, see our conversion tutorial [**Postman Tutorial**](https://developercielo.github.io/Tutorial//Postman)

Among other features, the attributes that stand out most in the Cielo eCommerce platform:

* **No proprietary apps**: it is not necessary to install applications in the virtual shop environment under no circumstances.
* **Simplicity**: the protocol used is purely the HTTPS.
* **Ease of testing**: the Cielo platform offers a publicly accessible Sandbox environment, which allows the developer to create a test account without the need for accreditation, making it easier and faster to start integration.
* **Credentials**: the handling of the customers's credentials (affiliation number and access key) traffics in the header of the HTTP request of the message.
* **Safety**: the information exchange always takes place between the Store Server and Cielo Server, that is, without the buyer's browser.
* **Multiplatform**: the integration is performed through Web Service REST.

## Architecture

Integration is performed through services provided as Web Services. The model employed is quite simple: There are two URLs (endpoint), a specific one for operations that cause side effects - such as authorization, capture and cancellation of transactions, and a specific URL for operations that do not cause side effects, such as transaction searching. These two URLs will receive the HTTP messages through the POST, GET or PUT methods. Each message type must be sent to a feature identified through the path.

| Method   | Description                                                                                                                                           |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **POST** | The `POST` HTTP method is used in the creation of features or in sending information that will be processed. For example, creation of a transaction. |
| **PUT**  | The`PUT` HTTP method is used to update an already existing feature. For example, capture or canceltation of a previously authorized transaction.     |
| **GET**  | The `GET` HTTP method is used for querying already existing features. For example, transaction query.                                                |

|                             | Methods            | SandBox                                             | Production                                    |
|-----------------------------|--------------------|-----------------------------------------------------|-----------------------------------------------|
| **Transaction request**     | **POST** / **PUT** | https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |
| **Queries**                 | **GET**            | https://apiquerysandbox.cieloecommerce.cielo.com.br | https://apiquery.cieloecommerce.cielo.com.br/ |

## Glossary

In order to facilitate the understanding, we have listed below a short glossary with the main terms related to eCommerce and also to card and acquiring market:

|Term|Description|
|---|---|
|**Authentication**|process to ensure that the buyer is actually the one who claims to be (lawful carrier), usually occurs at the issuing bank using a digital token or card with security keys.|
|**Authorization**|process to check whether a purchase can or not be realized with a card. At this point, several checks are done with the card and the carrier (e.g., timely payments, card locks, etc.). It is also at this point that the card limit is sensitized with the transaction value.|
|**Cancellation**|process to cancel a purchase made with card.|
|**Capture**|process that confirms an authorization that was previously made. It is only after the capture that the card carrier will be able to view it on their bank statement or invoice.|
|**Access key**|it is a store-specific security code, generated by Cielo, which is used to perform the authentication and communication on all messages exchanged with Cielo. Also known as production key and key data.|
|**Buyer**|is the one who effects purchase at the virtual store.|
|**Issuer (or issuing bank)**|It is the financial institution that issues the credit card, debit card or voucher.|
|**Commercial establishment or CE**|Entity that responds by the virtual store.|
|**Payment Gateway**|Company responsible for technical integration and transaction processing.|
|**Accreditation number**|is an identifier number that the merchant receives after their accreditation with Cielo.|
|**Carrier**|is the person who carries the card at the time of sale.|
|**SecureCode**|Mastercard international program to enable buyer authentication at the time of purchase in eCommerce environment.|
|**TID (Transaction Identifier)**|code consisting of 20 characters that identifies only one Cielo eCommerce transaction.|
|**Transaction**|is the purchase order of the card carrier in Cielo.|
|**VBV (Verified by Visa)**|Visa international program that enables buyer authentication at the time of purchase in eCommerce environment.|

## Products and Supported Issuers

The current version of Cielo Webservice supports the following issuers and products:

| Issuer           | Demand credit | Installment credit Store | Debit | Voucher |
|------------------|---------------|--------------------------|-------|---------|
| Visa             | Yes           | Yes                      | Yes   | *No*    |
| Master Card      | Yes           | Yes                      | Yes   | *No*    |
| American Express | Yes           | Yes                      | *No*  | *No*    |
| Elo              | Yes           | Yes                      | *No*  | *No*    |
| Diners Club      | Yes           | Yes                      | *No*  | *No*    |
| Discover         | Yes           | *No*                     | *No*  | *No*    |
| JCB              | Yes           | Yes                      | *No*  | *No*    |
| Aura             | Yes           | Yes                      | *No*  | *No*    |
| Hipercard        | Yes           | Yes                      | *No*  | *No*    |

> Cards that was issued abroad do not have permission to pay in installments.

## Latest Implementations

### Payment Facilitators

All E-Commerce customers who are **Payment Facilitators, as required by the Card Networks and Central Bank** must submit new fields in **transactional messaging**. Cielo will transmit the information to the Card Networks through transactional messaging at the time of authorization.

The new fields are contained within the Payment Facilitator node. In addition to the fields of this new node, facilitators will also have to send the softdescriptor field of the payment node. Below is an example of sending and reply.

#### Request

```json
{
   "MerchantOrderId":"2222222222",
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
      "DeliveryAddress":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      }
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":157000,
      "Currency":"BRL",
      "Country":"BRA",
      "Provider":"Cielo",
      "ServiceTaxAmount":0,
      "Installments":1,
      "Interest":"ByMerchant",
      "Capture":false,
      "Authenticate":false,
      "Recurrent":false,
      "SoftDescriptor":"123456789ABCD",
      "CreditCard":{
         "CardNumber":"4024007197692931",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa"
      },
      "PaymentFacilitator":{
         "EstablishmentCode":"1234",
         "SubEstablishment":{
            "EstablishmentCode":"1234",
            "Identity":"11111111000100",
            "Mcc":"1234",
            "Address":"Alameda Grajau, 512",
            "City":"Barueri",
            "State":"SP",
            "CountryCode":"076",
            "PostalCode":"06455914",
            "PhoneNumber":"1155855585"
         }
      }
   }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|PaymentFacilitator.EstablishmentCode|Number|11|Required for facilitators|Facilitator's establishment code. “Facilitator ID” (Registration of the facilitator with the card brands)|
|PaymentFacilitator.SubEstablishment.EstablishmentCode|Number|15|Required for facilitators|Sub Merchant establishment code. “Sub-Merchant ID” (Registration of sub-accredited with the facilitator)|
|PaymentFacilitator.SubEstablishment.Identity|Number|14|Required for facilitators|CNPJ or CPF of the sub-merchant.|
|PaymentFacilitator.SubEstablishment.Mcc|Number|4|Required for facilitators|MCC do sub Merchant.|
|PaymentFacilitator.SubEstablishment.Address|Alphanumeric|22|Required for facilitators|Sub Merchant Address.|
|PaymentFacilitator.SubEstablishment.City|Alphanumeric|13|Required for facilitators|City of the sub Merchant.|
|PaymentFacilitator.SubEstablishment.State|Alphanumeric|2|Required for facilitators|State do sub Merchant.|
|PaymentFacilitator.SubEstablishment.PostalCode|Number|9|Required for facilitators|Sub Merchant Postcode.|
|PaymentFacilitator.SubEstablishment.CountryCode|Number|3|Required for facilitators|Sub-merchant country code based on ISO 3166.<br>Ex: Brazil's ISO 3166 code is 076. [Complete list online](https://www.iso.org/obp/ui/#search/code/)|
|PaymentFacilitator.SubEstablishment.PhoneNumber|Number|13|Required for facilitators|Sub Merchant Phone Number.|
|Payment.Softdescriptor|Text|13|Required for facilitators|Text printed on buyer bank invoice. Must be completed according to the data of the sub Merchant.|

<aside class="warning"><b>Attention: Fields mustn't be sent with spacing to the left. Subject to rejection in the settlement of transactions.</b></aside>

#### Response

```json
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
      "DeliveryAddress":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      }
   },
   "Payment":{
      "ServiceTaxAmount":0,
      "Installments":1,
      "Interest":0,
      "Capture":false,
      "Authenticate":false,
      "Recurrent":false,
      "CreditCard":{
         "CardNumber":"402400******2931",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2021",
         "SaveCard":false,
         "Brand":"Visa"
      },
      "Tid":"1223092935684",
      "ProofOfSale":"2935684",
      "AuthorizationCode":"065158",
      "SoftDescriptor":"123456789ABCD",
      "Provider":"Simulado",
      "IsQrCode":false,
      "PaymentFacilitator":{
         "EstablishmentCode":"1234",
         "SubEstablishment":{
            "EstablishmentCode":"1234",
            "Identity":"11111111000100",
            "Mcc":"1234",
            "Address":"Alameda Grajau, 512",
            "City":"Barueri",
            "State":"SP",
            "CountryCode":"076",
            "PostalCode":"06455914",
            "PhoneNumber":"1155855585"
         }
      },
      "Amount":157000,
      "ReceivedDate":"2019-12-23 09:29:34",
      "Status":1,
      "IsSplitted":false,
      "ReturnMessage":"Operation Successful",
      "ReturnCode":"4",
      "PaymentId":"365c3a0d-fd86-480b-9279-4ba3da21333c",
      "Type":"CreditCard",
      "Currency":"BRL",
      "Country":"BRA",
      "Links":[
         {
            "Method":"GET",
            "Rel":"self",
            "Href":"https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c"
         },
         {
            "Method":"PUT",
            "Rel":"capture",
            "Href":"https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/capture"
         },
         {
            "Method":"PUT",
            "Rel":"void",
            "Href":"https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/void"
         }
      ]
   }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|PaymentFacilitator.EstablishmentCode|Number|11|Required for facilitators|Facilitator's establishment code. “Facilitator ID” (Registration of the facilitator with the card brands)|
|PaymentFacilitator.SubEstablishment.EstablishmentCode|Number|15|Required for facilitators|Sub Merchant establishment code. “Sub-Merchant ID” (Registration of sub-accredited with the facilitator)|
|PaymentFacilitator.SubEstablishment.Identity|Number|14|Required for facilitators|CNPJ or CPF of the sub-merchant.|
|PaymentFacilitator.SubEstablishment.Mcc|Number|4|Required for facilitators|MCC do sub Merchant.|
|PaymentFacilitator.SubEstablishment.Address|Alphanumeric|22|Required for facilitators|Sub Merchant Address.|
|PaymentFacilitator.SubEstablishment.City|Alphanumeric|13|Required for facilitators|City of the sub Merchant.|
|PaymentFacilitator.SubEstablishment.State|Alphanumeric|2|Required for facilitators|State do sub Merchant.|
|PaymentFacilitator.SubEstablishment.PostalCode|Number|9|Required for facilitators|Sub Merchant Postcode.|
|PaymentFacilitator.SubEstablishment.CountryCode|Number|3|Required for facilitators|Sub-merchant country code based on ISO 3166.<br>Ex: Brazil's ISO 3166 code is 076. [Complete list online](https://www.iso.org/obp/ui/#search/code/)|
|PaymentFacilitator.SubEstablishment.PhoneNumber|Number|13|Required for facilitators|Sub Merchant Phone Number.|
|Payment.Softdescriptor|Text|13|Required for facilitators|Text printed on buyer bank invoice. Must be completed according to the data of the sub Merchant.|

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
        "IsCustomerBillPaymentService":true,
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

|Property                      | Type    | Size    | Required    | Description                                                                              |
|------------------------------|---------|---------|-------------|------------------------------------------------------------------------------------------|
| IsCustomerBillPaymentService | Boolean | ---     | No         | True ou false. Indicates whether it's a CBPS (Consumer Bill Payment Service) transaction |
| Wallet.AdditionalData.Mcc | String (number) | ---     | Yes, for CBPS transactions        | Establishment MCC (EC) allowed for CBPS transactions |

# Extended Validation Certificate

## What is the SSL Certificate?

The SSL Certificate for web server offers authenticity and integrity of web site data, giving customers of virtual stores the guarantee that they are actually accessing the web site they want, not a fraudster web site.

Specialized companies are responsible for domain validating and, depending on the type of certificate, they are also responsible for the validation of the entity that owns the domain.

### Internet Explorer:

![EV Internet Explorer Certificate]({{ site.baseurl }}/images/certificado-ie.jpg)

### Firefox

![EV Firefox Certificate]({{ site.baseurl }}/images/certificado-firefox.jpg)

### Google Chrome

![EV Google Chrome Certificate]({{ site.baseurl }}/images/certificado-chrome.jpg)

## What is EV SSL Certificate?

The EV Certificate has been recently released on market and ensures a higher level of security for virtual stores customers.

It is a certificate of greater confidence and when https is accessed the address bar will turn green, giving more reliability for site visitors.

## How to install the Extended Validation Certificate on the Store server?

Just install the following three files in the server Trustedstore. Cielo does not offer support to the installation of the Certificate. If you are unsure about how to install the EV Certificate, then you should contact your server vendor support.

* [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
* [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
* [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/cieloecommerce.cert-2021-2022.zip)

## Step-by-Step for Installation

### Installation on the Virtual Store Server

The step-by-step of the EV Certificate installation must contact your server vendor support.

<aside class="warning">Cielo does not offer support for the installation of the Certificate.</aside>

### Client Access to Virtual Store

Usually, the browser automatically updates the Certificate. If it does not and the client contacts, the following steps must be informed:

**Step 1:**

Save the three files below into a new folder, or into a folder that can be easily remembered, as it will be used later:

* [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
* [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
* [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

**Step 2:**

In “Internet Explorer”, click on “Tools” menu and go to “Internet Options”:

![Install IE]({{ site.baseurl }}/images/certificado-instalar-ie-1.jpg)

In “Firefox”, click on “Open Menu” menu and go to “Advanced” and “Options”:

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-1.jpg)

Control Google Chrome” and go to “Settings” and “Show advanced settings... “Change Proxy Settings and “Content” and Certificates:

![Install GC]({{ site.baseurl }}/images/certificado-instalar-gc-1.jpg)

**Step 3:**

In Internet Explorer, under “Certificates”, click on “Import.”

![Install IE]({{ site.baseurl }}/images/certificado-instalar-ie-2.jpg)

In Firefox, click on “View Certificates”, click on “Import”

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-2.jpg)

In Chrome, click on “Manage Certificates”, click on “Import”v

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

To facilitate testing during integration, Cielo offers a Sandbox environment that is composed by two areas:

1. Test account register
2. Transactional Endpoints
  * **Request**: https://apisandbox.cieloecommerce.cielo.com.br
  * **Query**: https://apiquerysandbox.cieloecommerce.cielo.com.br

**Advantages of using the Sandbox**

* No affiliation is required to use Sandbox Cielo.
* Just access the [**Sandbox Registration**](https://cadastrosandbox.cieloecommerce.cielo.com.br/) create an account.
* with the registration you will receive a `MerchantId` and a `MerchantKey`, which are the credentials required for the API methods

## Integration Tool: POSTMAN

**Postman** is an API Client that makes it easier for developers to create, share, test, and document APIs. This is done by allowing users to create and save simple and complex HTTP requests, as well as read their responses.

Cielo offers complete collections of its integrations via Postamn, which facilitates the integration process with the API Cielo.

We suggest developers to access our [**Tutorial**](https://developercielo.github.io/Tutorial//Postman) about the tool to better understand all the advantages it offers.

## Credit card - Sandbox

In sandbox, it is necessary to use the `Provider` as **SIMULATED**

The Simulated is a configuration that emulates the use of payments with Credit Card.
With this payment method it is possible to simulate the flows of:

* Authorization
* Capture
* Cancellation.

For best use of the Simulated Payment Methods, we are providing **test cards** in the table below.

<aside class="notice">The <code>status</code> of the transactions are defined by the FINALS of each card, as well as the <code>ReturnCode</code>.</aside>

|Transaction Status|Card End|Return Code|Return message|
|---|---|---|---|
|Authorized|0000.0000.0000.0001<br>0000.0000.0000.0004|4/6|Operation performed successfully|
|Not Authorized|0000.0000.0000.0002|05|Not Authorized|
|Not Authorized|0000.0000.0000.0003|57|Expired Card|
|Not Authorized|0000.0000.0000.0005|78|Locked Card|
|Not Authorized|0000.0000.0000.0006|99|Time Out|
|Not Authorized|0000.0000.0000.0007|77|Canceled Card||
|Not Authorized|0000.0000.0000.0008|70|Problems with the Credit Card|
|Random Authorization|0000.0000.0000.0009|99|Operation Successful / Time Out|

Example of a Test card - 4024.0071.5376.3191

The information of **Security Code (CVV)** and validity may be random, keeping the format - CVV (3 digits) Validity (MM/YYYY).

<aside class="notice"><strong>Warning:</strong> The **sandbox** environment evaluates the format and end of the card, if an actual card is sent, the result of the operation will be identical to that described in the test cards table.</aside>

<aside class="notice"><strong>Tokenization:</strong> Transactions in sandbox environment involving tokenization did not work based on test cards. Every card saved at the tokenization is treated as a real card, so it is not used in the simulation process.</aside>

<aside class="Warning"><strong>Warning:</strong> Sandbox return codes are not the same as the ones available in production. </aside>

## Debit card - Sandbox

Debit cards do not have simulated cards or specific data, such as in the case of a credit card.

The transactional flow of the Debit card works with the Response of the transaction by returning an *AUTHENTICATION URL* . In the authentication screen, the chosen option defines the status of the transaction.

|Option|Status|
|---|---|
|Authenticated|Authorized|
|Not Authenticate|Declined|
|Do not use the URL|Not Finished|

<aside class="notice"><strong>Online Transfer:</strong> The same behavior of the Debit card in Sanbox is valid for debit card</aside>

## Other methods of payment - Sandbox

Other methods of payment do not have simulated specific data or cards, as in the case of credit card.
Below we specify any existing differences:

|Payment method|Differences|
|---|---|
|Bank slip|There is no bank validation. The bank slip behaves as a bank slip without registration|
|Debit cardo|The `provider` used must be **SIMULATED** <br> The redirection URL for the bank environment will actually be a screen for choosing the authentication status|
|Online transfer|The `provider` used must be **SIMULATED** <br> The redirection URL for the bank environment will actually be a screen for choosing the authentication status|

# Payment Methods

## Credit Card

To enjoy all the features available in our API, it is important that you first understand the concepts around processing a credit card transaction.

|Concept|Description|
|---|---|
|**Authorization**|The authorization (or pre-authorization) is the main operation in the eCommerce, because through it, the sale can be finished. Pre-authorization only sensitizes the customer's limit, but still does not generate charge for the consumer.|
|**Capture**|When making a pre-authorization, it is necessary to confirm it, so that the charge is effected to the card carrier. It is through this operation a pre-authorization is effected, and it can be executed normally within 5 days after the pre-authorization date.|
|**Cancellation**|The cancellation is necessary when, for some reason, a sale will not be effected anymore.|
|**Authentication**|The authentication process makes it possible to effective a sale, which will pass through the authentication process of the card issuing bank, then providing more security for the sale and transferring the risk of fraud to the bank.|
|**Protected Card**|It is a platform that allows secure storage of credit card sensitive data. This data are transformed into an encrypted code named “token”, which can be stored in a database. In the platform, the store can offer features like “1 Click Buying” and “Retry transaction sending”, always preserving integrity and confidentiality of information.|
|**Recurrent**|The Smart Recurrence is an indispensable feature for establishments that regularly need to charge for their products/services. It is widely used for magazine subscriptions, monthly fees, software licenses, among others. The merchants will count with differentiated features to model their charging according to their business, as all parameterization is configurable, such as: periodicity, start and end date, number of attempts, interval between them, among others.|

<aside class="warning">IMPORTANT: The order identification number (MerchantOrderId) does not change, remaining the same throughout the transactional flow. However, an additional number can be generated for the order and used during the transaction. This number will only be different in case of adaptation to the acquirer's rules or in case there are repeated order identification numbers (MerchantOrderId). For reconciliation purposes, use tid.</aside>

### Creating a simple transaction

To create a transaction that will use a credit card, it is necessary to send a request using the `POST` method to the Payment feature, as shown. This example covers the minimum of fields required to be submitted for authorization.

<aside class="notice"><strong>Warning:</strong> It is not possible to carry out a transaction with its value as (`Amount`) 0.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true
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
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true
   }
}
--verbose
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Installments`|Number|2|Yes|Number of installments.|
|`Payment.SoftDescriptor`|Text|13|No|Text printed on buyer's bank invoice - Available only for VISA/MASTER - does not allow special characters - See Attachment|
|`Payment.IsCryptocurrencyNegotiation`|Boolean|-|No (default false)|Send true if the transaction refers to the sell of the cryptocurrency|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on the card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Attachment.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|
|`CreditCard.CardOnFile.Usage`|Text|-|No|**First** if the credentials have been stored and they will be used for the first time.<br>**Used** if the credentials have been stored and they were previously used.|
|`CreditCard.CardOnFile.Reason`|Text|-|Conditional|Indicates the purpose of credential storage, case the value of field "Usage" is "Used" <br>**Recurring** - Scheduled recurring<br>**Unscheduled** - Unscheduled recurring<br>**Installments** - Installments Transaction|

#### Response

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito simples"
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
            "CardOnFile":{
               "Usage": "Used",
               "Reason": "Unscheduled"
            }
        },
        "IsCryptoCurrencyNegotiation": true,
        "tryautomaticcancellation":true,
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
        "Name": "Comprador crédito simples"
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
            "CardOnFile":{
               "Usage": "Used",
               "Reason": "Unscheduled"
            }
        },
        "IsCryptoCurrencyNegotiation": true,
        "tryautomaticcancellation":true,
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text printed on the buyer's bank invoice - Available only for VISA/MASTER - does not allow special characters - See Attachment|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|
|`tryautomaticcancellation`|In case of error during authorization (status "Not Finished - 0"), the response will include the "tryautomaticcancellation" field as "true". In this case, the transaction will be automatically queried, and if it has been authorized successfully, it will be canceled automatically. This feature must be enabled for establishment. To enable, please contact our technical support. |Boolean|-|true or false|

### Creating a complete transaction

To create a transaction that will use a credit card, it is necessary to send a request using the `POST` method to the Payment feature as shown. This example covers all the possible fields that can be sent.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador crédito completo",
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
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
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
        }
   },
   "Payment":{  
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
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
            "Reason": "Unscheduled"
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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Customer.Identity`|Text|14|No|Customer's RG, CPF or CNPJ number.|
|`Customer.IdentityType`|Text|255|No|Type of buyer ID document (CFP/CNPJ).|
|`Customer.Email`|Text|255|No|Buyer's e-mail.|
|`Customer.Birthdate`|Date|10|No|Buyer's date of birth.|
|`Customer.Address.Street`|Text|255|No|Buyer's address.|
|`Customer.Address.Number`|Text|15|No|Buyer's address number.|
|`Customer.Address.Complement`|Text|50|No|Buyer's address complement.br|
|`Customer.Address.ZipCode`|Text|9|No|Buyer's address zip code.|
|`Customer.Address.City`|Text|50|No|Buyer's address city.|
|`Customer.Address.State`|Text|2|No|Buyer's address state.|
|`Customer.Address.Country`|Text|35|No|Buyer's address country.|
|`Customer.DeliveryAddress.Street`|Text|255|No|Buyer's address.|
|`Customer.Address.Number`|Text|15|No|Buyer's address number.|
|`Customer.DeliveryAddress.Complement`|Text|50|No|Buyer's address complement.|
|`Customer.DeliveryAddress.ZipCode`|Text|9|No|Buyer's address zip code.|
|`Customer.DeliveryAddress.City`|Text|50|No|Buyer's address city.|
|`Customer.DeliveryAddress.State`|Text|2|No|Buyer's address state.|
|`Customer.DeliveryAddress.Country`|Text|35|No|Buyer's address country.|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Currency`|Text|3|No|Currency in which payment will be made (BRL).|
|`Payment.Country`|Text|3|No|Country where payment will be made.|
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.ServiceTaxAmount`|Number|15|No|Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value.|
|`Payment.SoftDescriptor`|Text|13|No|Text printed on the buyer's bank invoice - Only available for VISA/MASTER - does not allow special characters - See Annex|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Interest`|Text|10|No|Type of installment - Store (ByMerchant) or Card (ByIssuer).|
|`Payment.Capture`|Boolean|---|No (Default false)|Boolean that identifies that the authorization should be with automatic capture.|
|`Payment.Authenticate`|Booleano|---|No (Default false)|Defines whether the buyer will be directed to the Issuing bank for card authentication|
|`Payment.IsCryptocurrencyNegotiation`|Boolean|-|No (default false)|Send true if the transaction refers to the sell of the cryptocurrency|
|`Payment.AirlineData.TicketNumber`|alphanumeric|13|No|Enter the primary airline ticket number of the transaction.|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.SaveCard`|Boolean|---|No (Default false)|Boolean that identifies whether the card will be saved to generate the CardToken.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|
|`CreditCard.CardOnFile.Usage`|Text|-|No|**First** if the credentials have been stored and they will be used for the first time.<br>**Used** if the credentials have been stored and they were previously used.|
|`CreditCard.CardOnFile.Reason`|Text|-|Conditional|Indicates the purpose of credential storage, case the value of field "Usage" is "Used" <br>**Recurring** - Scheduled recurring<br>**Unscheduled** - Unscheduled recurring<br>**Installments** - Installments Transaction|

#### Response

```json
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
            "PaymentAccountReference":"92745135160550440006111072222",
            "CardOnFile":{
               "Usage": "Used",
               "Reason": "Unscheduled"
           }
        },
        "IsCryptoCurrencyNegotiation": true,
        "tryautomaticcancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "AirlineData":{
            "TicketNumber": "AR988983"
        },
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
            "PaymentAccountReference":"92745135160550440006111072222",
            "CardOnFile":{
               "Usage": "Used",
               "Reason": "Unscheduled"
            }
        },
        "IsCryptoCurrencyNegotiation": true,
        "tryautomaticcancellation":true,
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric texto|
|`tryautomaticcancellation`|In case of error during authorization (status "Not Finished - 0"), the response will include the "tryautomaticcancellation" field as "true". In this case, the transaction will be automatically queried, and if it has been authorized successfully, it will be canceled automatically. This feature must be enabled for establishment. To enable, please contact our technical support. |Boolean|-|true or false|
|`Payment.PaymentAccountReference`|The PAR (payment account reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the Card Networks doesn't send the information the field will not be returned.|Number|29|---|

<aside class="warning">Attention: Authorization returns are subject to the insertion of new fields from Card Networks/issuers. Integrate them to predict this type of behavior by properly using object serialization and deserialization techniques.</aside>

### Creating a authenticated transaction

To create a transaction with authentication that will use a credit card, it is necessary to submit a request using the `POST` method for the Payment feature as shown.

<aside class="notice"><strong>Authentication:</strong> In this mode, the card carrier is directed to the authentication environment of the card issuing bank where the inclusion of the card password will be requested.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
 "MerchantOrderId":"2014111903",
 "Customer":{
  "Name":"Comprador crédito autenticação"
 },
 "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "Authenticate":true,
     "SoftDescriptor":"123456789ABCD",
     "ReturnUrl":"https://www.cielo.com.br",
     "CreditCard":{
        "CardNumber":"1234123412341231",
        "Holder":"Teste Holder",
        "ExpirationDate":"12/2030",
        "SecurityCode":"123",
        "Brand":"Visa",
        "CardOnFile":{
           "Usage": "Used",
           "Reason": "Unscheduled"
        }
     },
     "IsCryptoCurrencyNegotiation": true
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
   "MerchantOrderId":"2014111903",
   "Customer":{  
      "Name":"Comprador crédito autenticação"
   },
   "Payment":{  
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "Authenticate":true,
      "ReturnUrl":"http://www.cielo.com.br",
      "SoftDescriptor":"123456789ABCD",
      "CreditCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
         }
      },
      "IsCryptoCurrencyNegotiation": true
   }
}
--verbose
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Authenticate`|Boolean|---|No (Default false)|Defines whether the buyer will be directed to the Issuing bank for card authentication|
|`Payment.IsCryptocurrencyNegotiation`|Boolean|-|No (default false)|Send true if the transaction refers to the sell of the cryptocurrency|
|`CreditCard.CardNumber.`|Text|19|Yes|Buyer's Card Number|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|
|`CreditCard.CardOnFile.Usage`|Text|-|No|**First** if the credentials have been stored and they will be used for the first time.<br>**Used** if the credentials have been stored and they were previously used.|
|`CreditCard.CardOnFile.Reason`|Text|-|Conditional|Indicates the purpose of credential storage, case the value of field "Usage" is "Used" <br>**Recurring** - Scheduled recurring<br>**Unscheduled** - Unscheduled recurring<br>**Installments** - Installments Transaction|

#### Response

```json
{
 "MerchantOrderId":"2014111903",
 "Customer":
 {
  "Name":"Credit buyer authentication"
 },
 "Payment":
 {
  "ServiceTaxAmount":0,
  "Installments":1,
  "Interest":"ByMerchant",
  "Capture":false,
  "Authenticate":true,
  "CreditCard":
  {
   "CardNumber":"123412******1112",
   "Holder":"Test Holder",
   "ExpirationDate":"12/2030",
   "SaveCard":false,
   "Brand":"Visa",
   "CardOnFile":{
       "Usage": "Used",
        "Reason": "Unscheduled"
    }
  },
  "IsCryptoCurrencyNegotiation": true,
  "AuthenticationUrl":"https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?id=c5158c1c7b475fdb91a7ad7cc094e7fe",
  "Tid": "1006993069257E521001",
  "SoftDescriptor":"123456789ABCD",
  "PaymentId":"f2dbd5df-c2ee-482f-ab1b-7fee039108c0",
  "Type":"CreditCard",
  "Amount":15700,
  "Currency":"BRL",
  "Country":"BRA",
  "ExtraDataCollection":[],
  "Status":0,
        "ReturnCode": "0",
  "Links":
  [
   {
    "Method":"GET",
    "Rel":"self",
    "Href":"https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{Paymentid}"
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
 "MerchantOrderId":"2014111903",
 "Customer":
 {
  "Name":"Comprador crédito autenticação"
 },
 "Payment":
 {
  "ServiceTaxAmount":0,
  "Installments":1,
  "Interest":"ByMerchant",
  "Capture":false,
  "Authenticate":true,
  "CreditCard":
  {
   "CardNumber":"123412******1112",
   "Holder":"Teste Holder",
   "ExpirationDate":"12/2030",
   "SaveCard":false,
   "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
         }
  },
  "IsCryptoCurrencyNegotiation": true,
  "AuthenticationUrl":"https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?id=c5158c1c7b475fdb91a7ad7cc094e7fe",
  "Tid": "1006993069257E521001",
  "SoftDescriptor":"123456789ABCD",
  "PaymentId":"f2dbd5df-c2ee-482f-ab1b-7fee039108c0",
  "Type":"CreditCard",
  "Amount":15700,
  "Currency":"BRL",
  "Country":"BRA",
  "ExtraDataCollection":[],
  "Status":0,
        "ReturnCode": "0",
  "Links":
  [
   {
    "Method":"GET",
    "Rel":"self",
    "Href":"https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{Paymentid}"
   }
  ]
 }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric texto|

#### ECI (E-commerce Indicator)

E-Commerce Indicator (ECI) is returned in the authentication process.
This code is an indicator of what exactly occurred in the transaction authentication process.
Por meio do ECI, pode-se verificar se a transação foi autenticada e quem foi o agente responsável por aquela autenticação, conforme tabela abaixo:
Through the ECI, it's possible to verify if the transaction was authenticated and who was the agent responsible for that authentication, as shown in the table below:

| **Brands**   | **ECI**                    | **Transaction Meaning**                                                                                     |
| ---------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Visa       | 05                           | Authenticated by the Issuing Bank – risk of chargeback becomes of the Issuing bank                          |
| Visa       | 06                           | Authenticated by the Brand – risk of chargeback becomes of the Issuing bank                                 |
| Visa       | Different from 05 and 06     | Unauthenticated – risk of chargeback remains with the establishment                                         |
| Mastercard | 01                           | Authenticated by the Brand – risk of chargeback becomes of the Issuing bank                                 |
| Mastercard | 02                           | Authenticated by the Issuing Bank – risk of chargeback becomes of the Issuing bank                          |
| Mastercard | 04                           | Unauthenticated, transaction characterized as Data Only – risk of chargeback remains with the establishment |
| Mastercard | Different from 01, 02 and 04 | Unauthenticated – risk of chargeback remains with the establishment                                         |
| Elo        | 05                           | Authenticated by the Issuing Bank – risk of chargeback becomes of the Issuing bank                          |
| Elo        | 06                           | Authenticated by the Brand – risk of chargeback becomes of the Issuing bank                                 |
| Elo        | 07                           | Unauthenticated – risk of chargeback remains with the establishment                                         |

## Debit Card

This payment method is automatically released along to the Cielo's affiliation and can be used with the following brands and banks:

| MASTERCARD      | VISA            |
|-----------------|-----------------|
| Bradesco        | Bradesco        |
| Banco do Brasil | Banco do Brasil |
| Santander       | Santander       |
| Itaú            | Itaú            |
| CitiBank        | CitiBank        |
| BRB             | N/A             |
| Caixa           | N/A             |
| BancooB         | N/A             |

### Debit Authentication - 3DS 1.0

As a market rule, all the online debit card transactions must be authenticated through a protocol called 3DS, obligatorily. Currently, there are 2 versions: 3DS 1.0 and 3DS 2.0.

In the version 1, the carrier will be directed to the banking environment, where it will be challenged by the card issuer, typing the password and completing the authentication. This version is not compatible with mobile devices and the challenge will happen in 100% of the cases. There is the possibility of not authenticating debit transactions in e-Commerce, which is known as "Debt without password", however, it is up to the card issuing banks to approve this model, because **the permission is not granted by Cielo**.

Authentication is a process that is mandatory for eCommerce debit transactions, but, it can also be used for credit transactions. It's up to the merchant to authenticate credit transactions in e-Commerce.
Recently, the new version of 3DS 2.0 was release by the brands in the market, allowing Cielo and issuers to develop this solution, that is already available for integration. The tendency is to be increasingly used, considering its many improvements and benefits. To learn about 3DS 2.0, access [https://developercielo.github.io/en/manual/3ds](https://developercielo.github.io/en/manual/3ds).

#### MPI – Merchant Plug-in

Merchant plug-in, known as MPI, is a service that allows to perform the authentication call, integrated and certificated with brands for the 3DS authentication processing. Cielo allows the merchant to integrate to the 3DS 1.0 or 2.0 through Internal MPI or External MPI.

* Internal MPI: service already integrated with 3DS Cielo solution, without the need for additional integration and/or hiring. In case of using the Internal MPI for 3DS 1.0 go to the step “[Default Transaction](https://developercielo.github.io/en/manual/cielo-ecommerce#default-transaction)”.

* External MPI: service hired by the merchant, without the interference from Cielo. It is very used when the merchant already has a contracted MPI supplier. In case of using the external MPI for the 3DS 1.0, follow the next step “External Authentication 3DS 1.0”.

#### External Authentication - MPI 3DS 1.0

Considering the choice to authenticate with 3DS 1.0 using a contracted MPI service/provider(External MPI), Cielo is prepared to receive this information in authorization.

##### Creating a sale with external authentication

To create a credit or debit card sale containing external authentication data, you must send a request using the `POST` method for the Payment feature as the example.

###### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
    "MerchantOrderId":"2014111903",
    "Customer":
    {
        "Name":"Comprador crédito autenticação",
        "Identity":"12345678912",
        "IdentityType":"cpf"
    },
    "Payment":
    {
        "Type":"CreditCard",
        "Amount":15700,
        "Installments":1,
        "Authenticate":true,
        "SoftDescriptor":"123456789ABCD",
        "ReturnUrl":"https://www.cielo.com.br",
        "CreditCard":
        {
            "CardNumber":"1234123412341231",
            "Holder":"Teste Holder",
            "ExpirationDate":"12/2030",
            "SecurityCode":"123",
            "Brand":"Visa"
        },
        "ExternalAuthentication":
        {
            "Cavv":"123456789",
            "Xid":"987654321",
            "Eci":"5"
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
   "MerchantOrderId":"2014111903",
   "Customer":{  
      "Name":"Comprador crédito autenticação",
      "Identity":"12345678912",
      "IdentityType":"cpf"
   },
   "Payment":{  
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "Authenticate":true,
      "ReturnUrl":"http://www.cielo.com.br",
      "SoftDescriptor":"123456789ABCD",
      "CreditCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
      },
      "ExternalAuthentication":{
         "Cavv":"123456789",
         "Xid":"987654321",
         "Eci":"5"
      }
   }
}
--verbose
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in API Cielo eCommerce.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in API Cielo eCommerce.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer’s name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Authenticate`|Boolean|---|No (Default false) | Indicates whether the transaction must be authenticated (true) or not (false). Even for externally authenticated transactions (authentication provider of your choice), this field must be sent with a "True" value, and on the ExternalAuthentication node, you must send the data returned by the chosen external authentication mechanism (XID, CAVV and ECI).|
|`Payment.ExternalAuthentication.Cavv`|Text|-|Yes|The Cavv value is returned by the authentication mechanism.|
|`Payment.ExternalAuthentication.Xid`|Text|-|Yes|The Xid value is returned by the authentication mechanism.|
|`Payment.ExternalAuthentication.Eci`|Number|1|Yes|The Eci value is returned by the authentication mechanism.|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer’s Card Number.|
|`CreditCard.Holder`|Text|25|No|NBuyer’s name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|

###### Response

```json
{
    "MerchantOrderId":"2014111903",
    "Customer":
    {
        "Name":"Comprador crédito autenticação",
        "Identity":"12345678912",
        "IdentityType":"cpf"
    },
    "Payment":
    {
        "ServiceTaxAmount":0,
        "Installments":1,
        "Interest":"ByMerchant",
        "Capture":false,
        "Authenticate":true,
        "CreditCard":
        {
            "CardNumber":"123412******1112",
            "Holder":"Teste Holder",
            "ExpirationDate":"12/2030",
            "SaveCard":false,
            "Brand":"Visa"
        },
        "AuthenticationUrl":"https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?id=c5158c1c7b475fdb91a7ad7cc094e7fe",
        "Tid": "1006993069257E521001",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId":"f2dbd5df-c2ee-482f-ab1b-7fee039108c0",
        "Type":"CreditCard",
        "Amount":15700,
        "Currency":"BRL",
        "Country":"BRA",
        "ExtraDataCollection":[],
        "Status":0,
        "ReturnCode":"0",
        "ReturnMessage":"Transacao autorizada"
        "ExternalAuthentication":
        {  
            "Cavv":"123456789",
            "Xid":"987654321",
            "Eci":"5"
        },
        "Links":
        [
            {
                "Method":"GET",
                "Rel":"self",
                "Href":"https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{Paymentid}"
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
    "MerchantOrderId":"2014111903",
    "Customer":
    {
        "Name":"Comprador crédito autenticação",
        "Identity":"12345678912",
        "IdentityType":"cpf"
    },
    "Payment":
    {
        "ServiceTaxAmount":0,
        "Installments":1,
        "Interest":"ByMerchant",
        "Capture":false,
        "Authenticate":true,
        "CreditCard":
        {
            "CardNumber":"123412******1112",
            "Holder":"Teste Holder",
            "ExpirationDate":"12/2030",
            "SaveCard":false,
            "Brand":"Visa"
        },
        "AuthenticationUrl":"https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?id=c5158c1c7b475fdb91a7ad7cc094e7fe",
        "Tid": "1006993069257E521001",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId":"f2dbd5df-c2ee-482f-ab1b-7fee039108c0",
        "Type":"CreditCard",
        "Amount":15700,
        "Currency":"BRL",
        "Country":"BRA",
        "ExtraDataCollection":[],
        "Status":0,
        "ReturnCode": "0",
        "ReturnMessage":"Transacao autorizada",
        "ExternalAuthentication":
        {  
            "Cavv":"123456789",
            "Xid":"987654321",
            "Eci":"5"
        },
        "Links":
        [
            {
                "Method":"GET",
                "Rel":"self",
                "Href":"https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{Paymentid}"
            }
        ]
    }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text that will be printed on the carrier’s bank invoice - Available only for VISA/MASTER - does not allow special 
characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|CReturn code of Acquiring.|Text|32|Alphanumeric texto|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|

### Default Transaction

To create a sale that will use a debit card, you must do a POST for the Payment resource as example.

> To perform a transaction without authentication, simply send `Authenticate = FALSE`

The example includes the minimum number of fields required to be submitted for authorization.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014121201",
   "Customer":{  
      "Name":"Comprador Cartão de débito"
   },
   "Payment":{  
     "Type":"DebitCard",
     "Authenticate": true,
     "Amount":15700,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "IsCryptoCurrencyNegotiation": true
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
     "Authenticate": true,
     "Amount":15700,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "IsCryptoCurrencyNegotiation": true
   }
}
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Authenticate`|Defines whether the buyer will be directed to the issuing bank for card authentication.|Boolean|---|Yes (Default TRUE)|
|`Payment.ReturnUrl`|URI to where the user will be redirected after payment ends|Text|1024|Yes|
|`Payment.IsCryptocurrencyNegotiation`|Send true if the transaction refers to the sell of the cryptocurrency|Boolean|-|No (default false)|
|`DebitCard.CardNumber`|Buyer's Card Number.|Text|19|Yes|
|`DebitCard.Holder`|Buyer's name printed on card.|Text|25|No|
|`DebitCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`DebitCard.SecurityCode`|Security code printed on back of card.|Text|4|No|
|`DebitCard.Brand`|Card issuer.|Text|10|Yes|

<aside class="warning">Debit cards, by default, must have `Authenticate` as TRUE </aside>

#### Response

```json
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de débito"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "453211******3703",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "IsCryptoCurrencyNegotiation": true,
        "AuthenticationUrl": "https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?{PaymentId}",
        "Tid": "1006993069207A31A001",
        "PaymentId": "0309f44f-fe5a-4de1-ba39-984f456130bd",
        "Type": "DebitCard",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 0,
        "ReturnCode": "0",
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
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de débito"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "453211******3703",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "IsCryptoCurrencyNegotiation": true,
        "AuthenticationUrl": "https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?{PaymentId}",
        "Tid": "1006993069207A31A001",
        "PaymentId": "0309f44f-fe5a-4de1-ba39-984f456130bd",
        "Type": "DebitCard",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 0,
        "ReturnCode": "0",
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AuthenticationUrl`|URL to which the Merchant must redirect the Customer to the Debit flow.|Text|56|Authentication Url|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReturnUrl`|Merchant's return Url . URL to where the merchant will be redirected at the end of the flow.|Text|1024|http://www.urllojista.com.br|
|`Status`|Transaction Status.|Byte|---|0|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|

## Alelo Cards

To create a sale that will use an Alelo card, it's necessary to make a **POST** to the Payment resource using the technical contract for a **Debit Card** sale.

**NOTE:** In ALELO Card transactions, the following parameters must have static settings.

| Parameter              | ALELO Default         |
|------------------------|-----------------------|
| `Payment.Authenticate` | **FALSE** or not sent |
| `DebitCard.Brand`      | Must be sent as ELO   |

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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
|--------------------------|---------------------------------------------------------------------------------------------|---------|------|-------------------|
|`MerchantId`              | Store identifier in the Cielo eCommerce API.                                                | Guid    | 36   | Yes               |
|`MerchantKey`             | Public Key for Dual Authentication in the Cielo eCommerce API.                              | Text    | 40   | Yes               |
|`RequestId`               | Request identifier, used when the merchant uses different servers for each GET / POST / PUT | Guid    | 36   | No                |
|`MerchantOrderId`         | Order identification number.                                                                | Text    | 50   | Yes               |
|`Customer.Name`           | Buyer Name.                                                                                 | Text    | 255  | No                |
|`Customer.Status`         | Buyer registration status at the store (NEW / EXISTING) - Used for fraud analysis.          | Text    | 255  | No                |
|`Payment.Authenticate`    | Defines whether the buyer will be directed to the issuing bank for card authentication      | Boolean | ---  | No (Defaul false) |
|`Payment.Type`            | Type of Payment Method                                                                      | Text    | 100  | Yes               |
|`Payment.Amount`          | Order Amount (to be sent in cents).                                                         | Numeric | 15   | Yes               |
|`Payment.ReturnUrl`       | Merchant return URL.                                                                        | Text    | 1024 | Yes               |
|`Payment.ReturnUrl`       | URL where the user will be redirected after payment is completed                            | Text    | 1024 | Yes               |
|`DebitCard.CardNumber`    | Buyer Card Number.                                                                          | Text    | 19   | Yes               |
|`DebitCard.Holder`        | Buyer's name printed on card.                                                               | Text    | 25   | Yes               |
|`DebitCard.SecurityCode`  | Security code printed on the back of the card.                                              | Text    | 4    | Yes               |

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
|---------------------|------------------------------------------------------------------------------------------|------|------|--------------------------------------|
| `AuthenticationUrl` | URL to which the Merchant must redirect the Customer to the Debit flow.                  | Text | 56   | Authentication URL                   |
| `Tid`               | Transaction ID at the acquirer.                                                          | Text | 20   | Alphanumeric text                    |
| `PaymentId`         | Order Identifier field.                                                                  | Guid | 36   | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`         | Merchant return URL. URL where the shopkeeper will be redirected at the end of the flow. | Text | 1024 | http://www.urllogista.com.br         |
| `Status`            | Transaction Status                                                                       | Byte | ---  | 0                                    |
| `ReturnCode`        | Acquisition return code.                                                                 | Text | 32   | Alphanumeric text                    | 

## Electronic Transfer

### Creating a simple transaction

To create an electronic transfer sale, it is necessary to make a POST for the Payment feature as shown. This example includes the minimum number of fields required to be sent for authorization.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
    "MerchantOrderId":"2017051109",
    "Customer":
    {  
        "Name":"Nome do Comprador",
        "Identity": "12345678909",
        "IdentityType": "CPF",
        "Email": "comprador@cielo.com.br",
        "Address":
        {
             "Street":"Alameda Xingu",
             "Number":"512",
             "Complement":"27 andar",
             "ZipCode":"12345987",
             "City":"São Paulo",
             "State":"SP",
             "Country":"BRA",
             "District":"Alphaville"
         }
  },
    "Payment":
    {  
        "Provider":"Bradesco",
        "Type":"EletronicTransfer",
        "Amount":10000,
        "ReturnUrl":"http://www.cielo.com.br"
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
    "MerchantOrderId":"2017051109",
    "Customer":
    {  
        "Name":"Nome do Comprador",
        "Identity": "12345678909",
        "IdentityType": "CPF",
        "Email": "comprador@cielo.com.br",
        "Address":
        {
             "Street":"Alameda Xingu",
             "Number":"512",
             "Complement":"27 andar",
             "ZipCode":"12345987",
             "City":"São Paulo",
             "State":"SP",
             "Country":"BRA",
             "District":"Alphaville"
         }
  },
    "Payment":
    {  
        "Provider":"Bradesco",
        "Type":"EletronicTransfer",
        "Amount":10000,
        "ReturnUrl":"http://www.cielo.com.br"
    }
}
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Identity`|Buyer's RG, CPF or CNPJ number|14|Yes|Text|
|`Customer.IdentityType`|Type of identification document of the buyer (CPF or CNPJ)|255|No|Text|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Customer.Email`|Buyer's e-mail|255|No|Text|
|`Customer.Address.Street`|Buyer's contact address|255|No|Text|
|`Customer.Address.Number`|Buyer's contact address number|15|No|Text|
|`Customer.Address.Complement`|Buyer's contact address add-on|50|No|Text|
|`Customer.Address.ZipCode`|Buyer's contact address ZIP Code|9|No|Text|
|`Customer.Address.City`|Buyer's contact address city|50|No|Text|
|`Customer.Address.State`|Buyer's contact address state|2|No|Text|
|`Customer.Address.Country`|Buyer's contact address country|35|No|Text|
|`Customer.Address.District`|Buyer's contact address neighborhood|35|No|Text|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Provider`|Defines behavior of the payment method ([See Annex](https://developercielo.github.io/Webservice-3.0/#anexos))/NOT REQUIRED FOR CREDIT.|Text|15|---|

#### Response

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Transferência Eletronica",
    },
    "Payment": {
        "Url": "https://xxx.xxxxxxx.xxx.xx/post/EletronicTransfer/Redirect/{PaymentId}",
        "PaymentId": "765548b6-c4b8-4e2c-b9b9-6458dbd5da0a",
        "Type": "EletronicTransfer",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco",
        "ExtraDataCollection": [],
        "Status": 0,
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
    "Customer": {
        "Name": "Comprador Transferência Eletronica",
    },
    "Payment": {
        "Url": "https://xxx.xxxxxxx.xxx.xx/post/EletronicTransfer/Redirect/{PaymentId}",
        "PaymentId": "765548b6-c4b8-4e2c-b9b9-6458dbd5da0a",
        "Type": "EletronicTransfer",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco",
        "ExtraDataCollection": [],
        "Status": 0,
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Url`|URL to which the Merchant must redirect the Customer to the Electronic Transfer flow.|Text|256|Authentication Url|
|`Status`|Transaction Status.|Byte|---|0|

## Bank slip

### Creating a Bank slip sale

To create a sale whose form of payment is bank slip, just do a POST as the example.

**NOTE:** The API supports registered and unregistered bank slips, with the provider being the differentiator between them. We suggest that you validate with your bank what type of bank slip that is supported by your wallet. The API only accepts **Bradesco** and **Banco do Brasil** bank slips

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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
        }
    },
    "Payment":
    {  
        "Type":"Boleto",
        "Amount":15700,
        "Provider":"INCLUIR PROVIDER",
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
        }
    },
    "Payment":
    {  
        "Type":"Boleto",
        "Amount":15700,
        "Provider":"INCLUIR PROVIDER",
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|Bradesco: 27<BR>Banco do Brasil: 50|Yes|
|`Customer.Name`|Buyer's name.|Text|Bradesco: 34<BR>Banco do Brasil: 60|No|
|`Customer.Status`|Buyer registration status in store(NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Customer.Address.ZipCode`|Buyer's address zip code.|Text|9|Yes|
|`Customer.Address.Country`|Buyer's address country.|Text|35|Yes|
|`Customer.Address.State`|Buyer's address state.|Text|2|Yes|
|`Customer.Address.City`|Buyer's address city.|Text|Bradesco: 50<BR>Banco do Brasil: 18|Yes|
|`Customer.Address.District`|Buyer's neighborhood.|Text|50|Yes|
|`Customer.Address.Street`|Buyer's address.|Text|255|Yes|
|`Customer.Address.Number`|Buyer's address number.|Text|15|Yes|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Provider`|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|Text|15|Yes|
|`Payment.Adress`|Transferor's address.|Text|255|No|
|`Payment.BoletoNumber`|Bank slip number sent by the merchant. Used to count issued bank slips ("OurNumber").|Text|Bradesco: 11<BR>Banco do Brasil: 9|No|
|`Payment.Assignor`|Transferor's name.|Text|200|No|
|`Payment.Demonstrative`|Demonstration text.|Text|450|No|
|`Payment.ExpirationDate`|Bank slip expiration date.|Date|10|No|
|`Payment.Identification`|Identification document of the Transferor.|Text|14|No|
|`Payment.Instructions`|Bank slip instructions.|Text|450|No|

#### Response

```json
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
  }
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
        "Provider": "Bradesco",
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
        "Address": {}
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
        "Provider": "Bradesco",
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Instructions`|Bank slip instructions.|Text|450|e.g.: Accept only until the due date, after that date interest of 1% per day.|
|`ExpirationDate`|Expiration date.|Text|10|2014-12-25|
|`Url`|Generated Bank slip Url.|string|256|e.g.:https://.../pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d|
|`Number`|"OurNumber" generated.|Text|50|e.g.: 1000000012-8|
|`BarCodeNumber`|Barcode numerical representation.|Text|44|e.g.: 00091628800000157000494250100000001200656560|
|`DigitableLine`|Digitable line.|Text|256|e.g.: 00090.49420 50100.000004 12006.565605 1 62880000015700|
|`Assignor`|Transferor's name.|Text|256|e.g.: Test Store|
|`Address`|Transferor's address.|Text|256|e.g.: 160 Test Avenue|
|`Identification`|Identification document of the Transferor.|Text|14|CPF or CNPJ of the Transferor without the special characters (., /, -)|
|`Status`|Transaction Status.|Byte|---|1|

### Additional Rules

Number of characters per field and Provider:

|Property|Notes|Bradesco|Banco do Brasil|
|---|---|---|---|
|`Provider`|N/A|Bradesco2|BancoDoBrasil2|
|`MerchantOrderId`|NOTE 1|27|50|
|`Payment.BoletoNumber`|NOTE 2|11|9|
|`Customer.Name`|NOTE 3|34|60|
|`Customer.Address.Street`|NOTE 4|70|NOTE 3 / See comment|
|`Customer.Address.Number`|NOTE 4|10|NOTE 3 / See comment|
|`Customer.Address.Complement`|NOTE 4|20|NOTE 3 / See comment|
|`Customer.Address.District`|NOTE 4|50|NOTE 3 / See comment|
|`Customer.Address.City`|N/A|50 - NOTE 4|18 - NOTE 3|
|`Payment.Instructions`|N/A|450|450|
|`Payment.Demonstrative`|N/A|255|Not sent to banco do Brasil|

> **Banco Do Brasil Comment**: The fields `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` must total up to 60 characters.

|Notes|Bradesco|Banco do Brasil|
|---|---|---|
|**NOTE 1:**|Only letters, numbers and characters like "_" and "$"|Not sent to the bank|
|**NOTE 2:**|The value is persisted in the bank|When sent above 9 positions, the API Cielo truncates automatically, considering the last 9 digits|
|**NOTE 3:**|The API Cielo truncates automatically|**Valid characters:** <br> Letters from A to Z - CAPITAL LETTERS <br> **Special characters:** hyphen (-) and apostrophe (') <br> When used, it can not contain spaces between letters; <br><br> **Correct examples**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<br> **Incorrect examples**: D'EL - REI; at most one blank space between words|
|**NOTE 4:**|The value is persisted in the API Cielo|N/A|

## API QR Code via API E-Commerce

The purpose of this documentation is to guide the developer on how to integrate with Cielo’s API Cielo eCommerce to create payment QRCode, describing the features, methods to be used, listing information to be sent and received, and providing examples.

The integration mechanism with Cielo e-Commerce is simple, so only intermediate knowledge in Web programming language, HTTP/HTTPS requests and JSON file manipulation are required to successfully deploy the Cielo e-Commerce solution.

In this manual, you will find the reference on all operations available on API REST of API Cielo eCommerce. These operations must be performed using its specific key (Merchant ID and Merchant Key) in the respective environment endpoints:

Production Environment

* **Transaction request** https://api.cieloecommerce.cielo.com.br/
* **Transaction query:** https://apiquery.cieloecommerce.cielo.com.br/

Sandbox Environment

* **Transaction request** https://apisandbox.cieloecommerce.cielo.com.br
* **Transaction query:**  https://apiquerysandbox.cieloecommerce.cielo.com.br

To perform an operation, combine the base URL of the environment with the URL of the desired operation and send it using the HTTP verb as described in the operation.

### Architecture

Integration is performed through services provided as Web Services. The model adopted is quite simple: There are two URLs (endpoint), one specific an operation that causes sides effects - such as authorization, capture and cancellation of transactions, and the o specific URL for operations that do not cause side effects, such as transaction searching. These two URLs will receive the HTTP messages through the POST, GET or PUT methods. Each message type must be sent to a feature identified through the path.

|METHOD|DESCRIPTION|
|---|---|
|**POST**|The `POST` HTTP method is used in the creation of features or in sending information that will be processed. For example, creation of a transaction.|
|**PUT**|The `PUT` HTTP method is used to update an already existing feature. For example, capture or cancellation of a previously authorized transaction.|
|**GET**|The `GET` HTTP method is used for querying already existing features. For example, transaction query.|

### Products and supported issuer

QR Code  payment supports the following issuers and products:

| ISSUER           | DEMAND CREDIT   | INSTALLMENT CREDIT STORE | DEBIT |
|------------------|-----------------|--------------------------|--------|
| Visa             | Yes             | Yes                      | *No*  |
| Master Card      | Yes             | Yes                      | *No*  |
| American Express | Yes             | Yes                      | *No*  |
| Elo              | Yes             | Yes                      | *No*  |
| Diners Club      | Yes             | Yes                      | *No*  |
| Discover         | Yes             | *No*                     | *No*  |
| JCB              | Yes             | Yes                      | *No*  |
| Aura             | Yes             | Yes                      | *No*  |
| Hipercard        | Yes             | Yes                      | *No*  |

### Sandbox and tools for QR Code

#### About Sandbox

To facilitate testing during integration, Cielo offers a Sandbox environment that is composed by two areas:

1. Test account register
2. Transactional Endpoints

|**Request**| https://apisandbox.cieloecommerce.cielo.com.br     |
| **Query** | https://apiquerysandbox.cieloecommerce.cielo.com.br|

**Advantages of using the Sandbox**

* No affiliation is required to use Sandbox Cielo..
* Just acess the [**Sandbox Registration**](https://cadastrosandbox.cieloecommerce.cielo.com.br/) to create an account.
* After registering you will receive a MerchantId and a MerchantKey, which are the credentials required for the API methods.

#### Integration Tool: POSTMAN

**Postman** is an API Client that makes it easier for developers to create, share, test, and document APIs. This is done by allowing users to create and save simple and complex HTTP requests, as well as read their responses.

Cielo offers complete collections of its integrations via Postamn, which facilitates the integration process with the API Cielo.

We suggest developers to access our [**Tutorial**](https://developercielo.github.io/tutorial/postman) about the tool to better understand all the advantages that it offers.

#### Credit Card - Sandbox

To successfully test the authorization scenario using QRCode, we provided an example card that can be use to test it 4551.8700.0000.0183

The **Security Code (CVV)** and expiry date information can be random, but must be kept the format, for exemplo: CVV (3 digits) expiry date (MM/YYYY).

### Creating a QRCode via API

To create a transaction that will use a credit card, it is necessary to send a request using the POST method to the Payment feature, as shown. This example covers the minimum of fields required to be submitted for authorization.

<aside class="notice"><strong>Warning:</strong> It is not possible to carry out a transaction with its value as (`Amount`) 0.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2019010101",
   "Customer":{  
      "Name":"QRCode Test"
   },
   "Payment":{
     "Type":"qrcode",
     "Amount":100,
     "Installments":1,
     "Capture":false
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
     "Capture":false
   }
}
--verbose
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer’s name.|
|`Payment.Type`|Text|100|Yes|Payment type. Send **qrcode** for the QRCode transaction.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Installments`|Number|2|Yes|Number of installments.|
|`Payment.Capture`|Boolean|-|No|Send **true** for a auto-capture transaction.|

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
        "ReturnMessage": "QRCode successfully created",
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
        "ReturnMessage": "QRCode successfully created",
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`QrCodeBase64Image`|QRCode encoded in 64. For example, the image may be displayed on the page using the HTML code like this:<br><pre lang="html">&lt;img src=&quot;data:image/png;base64,image_code_in_the_64_base&quot;&gt;</pre>|Text|variable|Alphanumeric text|
|`PaymentId`|Order Identifier Field, required for future operations, such as Query, Capture and Cancellation.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status. In the case of creating a QR Code payment transaction, the initial status is 12 (Pending).|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Texto|32|Alphanumeric text|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Alphanumeric text|

### Consult  - PaymentID

To consult a credit card sale, it is necessary to do a GET for the Payment feature as the example

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Payment identification number.|Text|36|Yes|
|`AcquirerOrderId`|Transaction id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols.|Text|50|Yes|
|`Tid`|Payment identification number at the acquirer.|Text|36|Yes|

#### Response

```json
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
|`AcquirerOrderId`|Transaction id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols.|Text|50|Text alphanumeric|
|`AuthorizationCode`|authorization code.|Text|6|Text alphanumeric|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status.|Byte|2|-|
|`Customer.Name`|Nome do Comprador|Text|255|-|
|`Customer.Status`|Buyer registration status in the store (NEW / EXISTING)|Text|255|-|
|`Payment.ProofOfSale`|Authorization number, identical to NSU.|Text|6|Text alphanumeric|
|`Payment.Tid`|Transaction ID in the payment method provider.|Text|40|Text alphanumeric|
|`Payment.Type`|Type of Payment |Text|100|-|
|`Payment.Amount`|Order Amount (to be shipped in cents)|Number|15|-|
|`Payment.ReceivedDate`|Date the transaction was received.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.CapturedAmount`|Captured value.|Number|15|10000|
|`Payment.CapturedDate`|Capture date|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.VoidedAmount`|Canceled/refunded amount, in cents.|Number|15|10000|
|`Payment.VoidedDate`|Date of cancellation/chargeback|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.Provider`|Defines behavior of the means of payment (see Annex)/NOT MANDATORY FOR CREDIT|Text|15|—|
|`CreditCard.CardNumber`|Buyer's Card Number|Text|19|-|
|`CreditCard.Holder`|Buyer's name printed on card|Text|25|-|
|`CreditCard.ExpirationDate`|Expiration date printed on card|Text|7|-|
|`CreditCard.SecurityCode`|Security code printed on the back of the card See attached|Text|4|-|
|`CreditCard.Brand`|Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper)|Text|10|-|
|`CreditCard.PaymentAccountReference`|PAR(payment account reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the flag does not send the information, the field will not be returned.|Number|29|-|

### Consult - MerchandOrderID

It is not possible to consult a payment for the identifier sent by store (MerchantOrderId), but you can get all the
PaymentIds associated with the identifier.

To consult a sale by store identifier, it is necessary to make a GET for the sales resource as the example.

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order Identifier Field at the Store.|Text|36|Yes|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

### Capture 

The **Capture** is an exclusive step for Credit Card transactions.

When making a capture, the merchant confirms that the authorized value on the card may be charged by the financial institution issuing the card.

What the capture generates:

* It performs the card charge
* It includes the value of the sale on the buyer’s invoice
* Only captured transactions are paid by Cielo to the merchant

<aside class="notice"><strong>Warning: </strong> The capture is a deadline process. Check in your Cielo registering what is the enabled limit for your affiliation. After this period, it is not possible to perform the transaction Capture</aside>

<aside class="notice"><strong>Warning: </strong>Partial capture available for credit transactions only</aside>

#### Request - Partial Capture

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}</span></aside>

```json

https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture?amount={Valor}

```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture?amount={Valor}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Order Identifier Field.|Guid|36|Yes|
|`Amount`|Order Amount (to be sent in cents).|Number|15|No|
|`ServiceTaxAmount`|Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value.|Number|15|No|

#### Response

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3/void"
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
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3/void"
        }
    ]
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ReasonCode`|Operation return code.|Text|32|Alphanumeric text|
|`ReasonMessage`|Operation return message.|Text|512|Alphanumeric text|
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

<aside class="notice"><strong>Capture of Boarding fee</strong> To carry out the capture of *boarding fee*, just add the ServiveTaxAmount value to be captured </aside>

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount=xxx</span></aside>

#### Response

```json
{
    "Status": 2,
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ReasonCode`|Operation return code.|Text|32|Alphanumeric text|
|`ReasonMessage`|Operation return message.|Text|512|Alphanumeric text|
|`ReturnCode`|Return code of acquirer.||Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

### Canceling

**Canceling** is an operation responsible for canceling total or partial of an authorized or captured value.

Just do a `POST` sending the value to be canceled.

<aside class="notice"><strong>Warning:</strong> Partial cancellation is only available for *CAPTURED* credit transactions </aside>

<aside class="notice"><strong>Warning:</strong>The return of the API adds up to the total of partial cancellations, that is, if 3 cancellations of $10.00 are made, the API will present in its return a total of $30.00 canceled</aside>

#### Request - Cancellation

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Identifier that represents the transaction.|Guid|36|Yes|
|`Amount`|Order Amount (to be sent in cents)..|Number|15|No|

#### Response

```json
{
    "Status": 2,
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ReasonCode`|Operation return code.|Text|32|Alphanumeric text|
|`ReasonMessage`|Operation return message.|Text|512|Alphanumeric text|
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

<aside class="notice"><strong>Cancellation of Boarding Fee</strong>To cancel the *boarding fee*, just add the value of ServiveTaxAmount to be canceled</aside>

```
https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/void?amount={Valor}&serviceTaxAmount=xxx
```

## Carnê Transaction

Carnê is a debit transaction used to pay an account. This modality can be used by customers who <strong>issue their own booklets and Private Label card invoices </strong>. The Carnê product allows the <strong>separation of sales</strong> related to <strong>product purchases and payment for services</strong>, facilitating the reporting of values to the Tax Authorities.

Like any e-commerce debit transaction, Carnê transactions need to be authenticated via the 3DS 2.0 protocol. More information regarding the authentication protocol can be obtained [**click here**](https://developercielo.github.io/manual/3ds#autentica%C3%A7%C3%A3o-3ds-2.0).

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador Carnet simples"
   },
   "Payment":{
      "Type":"DebitCard",
      "Provider":"CieloSandbox",
      "Amount":15700,
      "Installments":1,
      "Authenticate":true,
      "SoftDescriptor":"123456789ABCD",
      "DebitCard":{
         "CardNumber":"4551870000000183",
         "Holder":"Test Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
      },
      "ExternalAuthentication":{
         "Cavv":"123456789",
         "Xid":"987654321",
         "Eci":"5"
      },
      "IsCryptoCurrencyNegotiation":true,
      "IsCarneTransaction":true
   }
}
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`Payment.IsCarneTransaction`|Boolean|---|No (default false)|Must be sent with a value of “true” in the case of a Carnê service payment transaction|

## Integration Errors

In case of integration errors in any of the payment methods, a "response" will be returned containing an error code and a description.

### Example

The expiry date of the card have values that are not allowed as "08 / A020" and not "08/2020", the answer will be:

``` json
[
    {
        "Code": 126,
        "Message": "Credit Card Expiration Date is invalid"
    }
]
```

| Property    | Description                                                                                                                            |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `Code`      | API error code. [See the code list](https://developercielo.github.io/en/manual/cielo-ecommerce#api-error-codes)                        |
| `Message`   | Error description. [See the code list](https://developercielo.github.io/en/manual/cielo-ecommerce#api-error-codes)                     |

# Consult - Capture - Cancel

## Consulting Transactions

### Consult - PaymentID

To consult a credit card sale, it is necessary to do a GET for the Payment feature as the example.

<aside class="notice">Only transactions sent on the last three months are eligible for queries</aside>

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Payment identification number.|Text|36|Yes|
|`AcquirerOrderId`|Transaction id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols.|Text|50|Yes|
|`Tid`|Payment identification number at the acquirer.|Text|36|Yes|

#### Response

```json
{
"MerchantOrderId": "2014111706",
"AcquirerOrderId": "202202231037440D1BD0",
"Customer": {
    "Name": "Buyer Teste",
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
        "Name": "Buyer Teste",
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
|`AcquirerOrderId`|Transaction id sent to the authorizer if the MerchantOrderId is longer than 20 characters or has symbols|Text|50|Text alphanumeric|
|`AuthorizationCode`|authorization code.|Text|6|Text alphanumeric|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status.|Byte|2|-|
|`Customer.Name`|Nome do Comprador|Text|255|-|
|`Customer.Status`|Buyer registration status in the store (NEW / EXISTING)|Text|255|-|
|`Payment.ProofOfSale`|Authorization number, identical to NSU|Text|6|Text alphanumeric|
|`Payment.Tid`|Transaction ID in the payment method provider|Text|40|Text alphanumeric|
|`Payment.Type`|Type of Payment |Text|100|-|
|`Payment.Amount`|Order Amount (to be shipped in cents)|Number|15|-|
|`Payment.ReceivedDate`|Date the transaction was received.|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.CapturedAmount`|Captured value.|Number|15|10000|
|`Payment.CapturedDate`|Capture date|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.VoidedAmount`|Canceled/refunded amount, in cents.|Number|15|10000|
|`Payment.VoidedDate`|Date of cancellation/chargeback|Text|19|AAAA-MM-DD HH:mm:SS|
|`Payment.Provider`|Defines behavior of the means of payment (see Annex)/NOT MANDATORY FOR CREDIT|Text|15|-|
|`CreditCard.CardNumber`|Buyer's Card Number|Text|19|-|
|`CreditCard.Holder`|Buyer's name printed on card|Text|25|-|
|`CreditCard.ExpirationDate`|Expiration date printed on card|Text|7|-|
|`CreditCard.SecurityCode`|Security code printed on the back of the card See attached|Text|4|-|
|`CreditCard.Brand`|Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper)|Text|10|-|
|`CreditCard.PaymentAccountReference`|PAR(payment account reference) is the number that associates different tokens to the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the flag does not send the information, the field will not be returned.|Number|29|-|

### Consult - MerchandOrderID

It is not possible to directly query a payment by the identifier sent by the store (MerchantOrderId), but it is possible to get all PaymentIds associated with the identifier.

To check a sale by store identifier, you need to make a GET for the sales feature as the example.

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order Identifier Field at the Store.|Text|36|Yes|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

### Consulting a Recurrence

To consult a credit card Recurrence, it is necessary to do a `GET` as shown in the example.

**The Recurrence Query brings data about the scheduling and transaction process that are repeated. They do not return data about transactions itself. To do this, a `GET` must be performed in the transaction (Available in" Consulting sales)**

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence Identifier Field.|Text|36|Yes|

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
        "Status": 1,
        "IssuerTransactionId": "009295034362939"
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
        "Status": 1,
        "IssuerTransactionId": "009295034362939"
    }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Next recurrence Identifier field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Date of next recurrence.|Text|7|12/2030 (MM/YYYY)|
|`StartDate`|Start date of recurrence.|Text|7|12/2030 (MM/YYYY)|
|`EndDate`|End date of recurrence.|Text|7|12/2030 (MM/YYYY)|
|`Interval`|Interval between recurrences.|Text|10|<ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|
|`CurrentRecurrencyTry `|Indicates the number of attempts of the current recurrence|Number|1|1|
|`OrderNumber`|Order identification at the store|Text|50|2017051101|
|`Status`|Recurrent order status|Number|1|<br>*1* - Active <br>*2* - Finished <br>*3*- Deactivated by the Merchant <br> *4* - Disabled by number of retries <br> *5* - Disabled by expired credit card|
|`RecurrencyDay`|Recurrence day|Number|2|22|
|`SuccessfulRecurrences`|Successful amount of recurrence|Number|2|5|
|`RecurrentTransactions.RecurrentPaymentId`|Recurrence Id|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`RecurrentTransactions.TransactionId`|Payment ID of the transaction generated on recurrence|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`RecurrentTransactions.PaymentNumber`|Number of Recurrence. The first one is zero|Number|2|3|
|`RecurrentTransactions.TryNumber`|Number of current attempt at the specific recurrence|Number|2|1|
|`Payment.IssuerTransactionId`|Issuer authentication ID for recurring debit transactions. This field must be sent in subsequent transactions of the first transaction in the recurrence model itself. In the scheduled recurrence model, Cielo will be responsible for sending the field in subsequent transactions.|Text|15|---|

**Warning:** The `IssuerTransactionId` field can also be obtained by querying the first transaction of the recurrence. See details on how to make an appointment [**here**](https://developercielo.github.io/en/manual/cielo-ecommerce#consulting-transactions).

## Capture

The **Capture** is an exclusive step for Credit Card transactions.

When making a capture, the merchant confirms that the authorized value on the card may be charged by the financial institution issuing the card.

What the capture generates:

* It performs the card charge
* It includes the value of the sale on the buyer's invoice
* Only captured transactions are paid by Cielo to the merchant

<aside class="notice"><strong>Warning:</strong> Capture is a process with a deadline. Check in without Cielo registering what is the enabled limit for your affiliation. After this period, it is not possible to perform the transaction Capture</aside>

### Total capture

To capture a sale that uses a credit card, it is necessary to do a PUT for the Payment feature as the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/capture</span></aside>

```json

https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture

```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Order Identifier Field.|Guid|36|Yes|
|`Amount`|Order Amount (to be sent in cents).|Number|15|No|
|`ServiceTaxAmount`|Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value.|Number|15|No|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|

### Partial Capture

The **partial Capture** is the act of capturing a value less than the authorized value. This capture model can occur only once per transaction.

**After capture, it is not possible to make additional captures in the same order.**

Just do a `POST` sending the value to be captured.

<aside class="notice"><strong>Warning:</strong> Partial capture available for credit transactions only</aside>

#### Request - Partial Capture

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}</span></aside>

```json

https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture?amount={Valor}

```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture?amount={Valor}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Order Identifier Field.|Guid|36|Yes|
|`Amount`|Order Amount (to be sent in cents).|Number|15|No|
|`ServiceTaxAmount`|Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value.|Number|15|No|

#### Response

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3/void"
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
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3/void"
        }
    ]
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ReasonCode`|Operation return code.|Text|32|Alphanumeric texto|
|`ReasonMessage`|Operation return message.|Text|512|Alphanumeric texto|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric texto|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

<aside class="notice"><strong>Capture of Boarding fee</strong> To carry out the capture of *boarding fee*, just add the ServiveTaxAmount value to be captured</aside>

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount=xxx</span></aside>

#### Response

```json
{
    "Status": 2,
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ReasonCode`|Operation return code.|Text|32|Alphanumeric texto|
|`ReasonMessage`|Operation return message.|Text|512|Alphanumeric texto|
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

### Capture Via Backoffice

It is possible to carry out both the total capture and the partial capture via The Backoffice Cielo.

Access our [**Tutorial**](https://developercielo.github.io/en/tutorial/tutoriais-3-0)  for more informations

## Canceling a sale

Cancellation is a feature that allows the merchant to cancel a purchase order, either due to insufficient stock, due to the consumer withdrawing from the purchase, or any other reason.

In the Cielo e-commerce API, it's possible to request cancellation for debit and credit cards.

For authorized and non-captured transactions (transactional status = 1), cancellation can be requested before the transaction is automatically undone.

For captured transactions (transactional status = 2), it's possible to make the cancellation request **1 day after the capture** and within a period of **up to 360 days** after the sale authorization. The approval of this cancellation order is susceptible to the assessment of the balance in the merchant's financial agenda at the time of the requisition and the approval of the bank issuing the card used in the transaction.
  
For cancellation requests for the same transaction, it is necessary to wait a period of 5 seconds between one request and another, so that the balance inquiry is carried out, the amount is reserved in the financial agenda and the balance is sensitized. Thus avoiding duplicate cancellation. This rule applies to total and/or partial cancellations.

To identify that cancellation requests are from the same transaction, we consider the EC number, cancellation authorization number, date of sale, sale amount, and NSU.

It is important to note that in order to make any cancellation request, it is necessary that the establishment has sufficient balance in the transaction/on the schedule

### Canceling a sale via API

Cancellation process via API is available only for credit and debit card.

Each payment method suffer different impacts when a cancellation order (VOID) is executed.

### Total cancellation

To cancel a sale that uses a credit card, it is necessary to do a PUT for the Payment feature. Cancellation can be made via PaymentID or MerchantOrderId (order number).

<aside class="notice"><strong>Warning:</strong> Cancellation by MerchantOrderId always affects the newest transaction, i.e. if there are orders with duplicate order number, only the most current one will be canceled. The previous order can not be canceled by this method</aside>

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=xxx</span></aside>

or

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/OrderId/{MerchantOrderId}/void?amount=xxx</span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Order Identifier Field.|Guid|36|Yes|
|`Amount`|Order Amount (to be sent in cents).|Number|15|No|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|

### Partial cancellation

The **partial cancellation** is the act of canceling a value less than the total authorized/captured value. This cancellation model can occur countless times, until the total value of the transaction is canceled.

 Just do a `POST` sending the value to be canceled.

<aside class="notice"><strong>Warning:</strong> Partial cancellation available only for *CAPTURED* credit transactions</aside>

<aside class="notice"><strong>Warning:</strong> The return of the API adds up to the total of partial cancellations, that is, if 3 cancellations of $10.00 are made, the API will present in its return a total of $30.00 canceled</aside>

#### Request - partial cancellation

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`PaymentId`|Order Identifier Field.|Guid|36|Yes|
|`Amount`|Order Amount (to be sent in cents).|Number|15|No|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction Status.|Byte|---|2|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

<aside class="notice"><strong>Cancellation of Boarding Fee</strong> To cancel the *boarding fee*, just add the value of ServiveTaxAmount to be canceled</aside>

```
https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/void?amount={Valor}&serviceTaxAmount=xxx
```

### Cancellation Return Codes

| RETURN CODE | DESCRIPTION                                                                      |
| 6           | Partial cancellation request successfully approved                               |
| 9           | Total cancellation request successfully approved                                 |
| 72          | Error: Insufficient merchant balance for sale cancellation                       |
| 77          | Error: Original sale not found for cancellation                                  |
| 100         | Error: Payment method and/or flag do not allow cancellation                      |
| 101         | Error: Requested cancellation amount above the allowed cancellation deadline     |
| 102         | Error: Requested cancellation above the original transaction amount              |
| 103         | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 104         | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 105         | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 106         | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 107         | Cadastral Restriction. Cancellation not allowed. Contact the Cancellation Center |
| 108         | Error: Merchant Number (EC) not found. Please check the number sent              |
| 475         | Processing failed. Please try again  

### Cancellation via Backoffice

Cancellation via Backoffice is the only option to perform cancellation of bank slip and Online Debit transactions.
It is possible to carry out both the total cancellation and the partial cancellation via The Backoffice Cielo.

Effects on the payment method

|Payment method|Description|Deadline|Cielo participation|
|---|---|---|---|
|Electronic Transfer|Cancellation only in API. The return of the value is made by the merchant himself|Defined by the merchant|No|

Access our [**Tutorial**](https://developercielo.github.io/en/tutorial/tutoriais-3-0)  for more informations

## Notification Post

### About the POST

The Cielo e-commerce API offers a transactional notification system where the Merchant provides an endpoint that will receive a notification via 'POST'

The notification content will be formed by 3 fields:

* `RecurrentPaymentId`- Identifier that represents a set of recurring transactions
* `PaymentId`- Identifier that represents a transaction
* `ChangeType` - Specifies the type of notification

With the content above, the merchant can identify the transaction (via `PaymentId` or `RecurrentPaymentId`) and the change suffered by it. With `PaymentId` it is possible to make a consult to the transactional base of the Cielo E-commerce API.

The Notification Post is sent based on a selection of predefined events in the Cielo E-commerce API register. These events are registered by the Cielo support team, when requested by the merchant.

### Notified Events

The events that can be notified are:

|Payment method|Event|
|---|---|
|Credit card|Capture|
|Credit card|Cancellation|
|Credit card|Survey|
|Bank slip|Conciliation|
|Bank slip|Manual Cancellation|
|Electronic transfer|Confirmed|

**About the Debit card:**  We do not notify Debit card transactions. We suggest creating a RETURN URL, where the buyer will be sent if the transaction is completed in the bank environment. When this URL is triggered, our suggestion is for a `GET` to be run by searching for order information in the API Cielo.

Notification also occurs in events related to **Scheduled Recurrence Cielo**.

| Recurrence Events                                                        |
|--------------------------------------------------------------------------|
| Disabled when reaching maximum number of attempts (transactions denied) |
| Rehabilitation                                                           |
| Completed / End date reached                                             |
| Deactivation                                                             |

### Notification Endpoint

An `URL Status Payment` must be registered by Cielo Support, so that the notification POST is executed.

Features of the `URL Status Payment`

* Must be **static**
* 255 characters limit.

**Notification Post** Characteristics

* It is shot every 30 minutes
* In case of failure, 3 new attempts will be made. If all 3 attempts fail, new submissions will not occur.

It is possible to register an information to return the request header. Just contact Cielo Support and inform the items below

* `KEY` - Parameter name 
* `VALUE` - Static value to be returned

You may register up to 3 types of return information in the header

```json
{
   "RecurrentPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "PaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "ChangeType": "2"
}
```

The store **must** return in response to notification: **HTTP Status Code 200 OK**

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`RecurrentPaymentId`|Identifier that represents the Recurring order (applicable only to ChangeType 2 or 4)|GUID|36|No|
|`PaymentId`|Identifier that represents the transaction|GUID|36|Yes|
|`ChangeType`|Specifies the type of notification. See table below|Number|1|Yes|

|ChangeType|Description|
|---|---|
|1|Payment status change|
|2|Recurrence created|
|3|AntiFraud status change|
|4|Recurring payment status change (Ex. automatic deactivation)|
|5|cancellation declined|
|7|Chargeback notification <br/> More details [Risk Notification](https://braspag.github.io//en/manual/risknotification)|

# Velocity

## What is Velocity

Velocity is a type of fraud prevention mechanism that specifically analyzes the concept of **"speed x transactional data"**. It analyzes how often certain data is used and whether that data is inscribed in a list of behaviors succeptible to security actions.

For merchants operating in the e-commerce market and eventually receiving fraudulent transactions, Velocity is a product that will identify behaviors suspect of fraud. The tool is intended to assist in fraud analysis at a much lower cost than a more traditional market tool.

It is an ally in the evaluation of suspect buying behaviors, because the calculations will be based on `traceability elements`.

The Velocity offers 4 types of functionalities to validate transactional data:

| Functionality         | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Velocity safety rules | The Merchant defines a set of security rules that will evaluate if certain transactional data is repeated in a suspicious time interval |
| Quarantine            | Creation of a list of data that will be analyzed for a determined period of time before being considered valid or fraudulent |
| BlackList             | Creation of a list of data that, when identified, prevents the transaction from being executed, avoiding the creation of a fraudulent transaction |
| Whitelist             | Creation of a list of data that, when identified, allows the transaction to be executed, even if there are security rules in action |

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
          "Message": "Bloqueado pela regra CardNumber. Name: Máximo de 3 Hits de Cartão em 1 dia. HitsQuantity: 3\. HitsTimeRangeInSeconds: 1440\. ExpirationBlockTimeInSeconds: 1440"
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

# Recurring Payments

Recurring payments are transactions that must be repeated after a certain period of time.

These are payments normally found on **signatures**, where the buyer wants to be automatically charged but doesn't want to re-enter the card details.

## Types of recurrences

The API Cielo Ecommerce works with two types of Recurrence that have different behaviors.

* **Own Recurrence** - When repetition intelligence and recurrence card data become under responsibility the of the merchant
* **Scheduled Recurrence** - When the intelligence of repetition and recurrence card data become under the responsibility of **Cielo**

### Own Recurrence

In this model, the merchant is responsible for creating the necessary intelligence to:

|Intelligence|Description|
|---|---|
|**Save transaction data**|The store will need to store the transaction and payment data|
|**Create transactional repetition**|The store must sent a new transaction whenever it needs an Authorization|
|**Behavior for declined transaction**|If one of the transactions is declined, it will be up to the store to "retry" a new authorization|

In all instances, the scheduled recurrence is a default transaction for Cielo, its only difference being the need to send an additional parameter that defines it as **Own Recurrence**

**Parameter:** `Payment.Recurrent`= `True`

#### Use case

This is an example of how the API Cielo Ecommerce allows the use of external systems of recurrence in their transactions

The own recurrence is a configuration of the API Cielo Ecommerce that allows a merchant to use an internal recurrence system specific to their business needs.
In this model, the merchant' system is in charge of defining the period, the transactional data, and when necessary, send us the sale of recurrence.

**See an example in use:**

* Own recurrence + Tokenized Card

The CleverFit academy has a differentiated billing system, where tuition is charged every fifteen days, but never on weekends.

As a highly customized model, CleverFit has its own recurrence system, using the API Cielo Ecommerce via two mechanisms:

1. **Own Recurrence** - CleverFit sends the transaction data as a normal sale, but the API identifies it as a recurrence and applies differential authorization rules to the order.
1. **Tokenized Card** - CleverFit keeps your cards secure via tokenization, reducing the risk of securing transactional data in your system.

CleverFit sends the transaction every fifteen days to the API Cielo Ecommerce, using the Tokens saved in the API itself and opting for Own Recurrence, which changes the authorization rule to suit its charge model

### Scheduled Recurrence

In this model, Cielo is responsible for the intelligence necessary to perform a recurrence automatically.

The **Scheduled Recurrence** allows the merchant to create a base transaction, which when sent to the API Cielo Ecommerce, will be saved and executed following the rules defined by the merchant.

In this model, the API performs and allows:

|Advantages|Description|
|---|---|
|**Saves transactional data**|Saves transaction data, thus creating a model of how the next Recurrences will be|
|**Automates the recurrence**|Without store action, the API creates future transactions according to the merchant' settings|
|**Allows updating of data**|If necessary, the API allows changes of the transaction information or the recurrence cycle|

The Scheduled Recurrence is formed by a simple transactional structure. The Merchant shall inform in the transaction the following data:

``` json
"RecurrentPayment":
{
       "AuthorizeNow":"False",
       "StartDate":"2019-06-01"
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
}
```

Where can we define the data as:

|Parameters|Description|
|---|---|
|`AuthorizeNow`|Defines the time a recurrence will be created. If it is sent as `True`, it is created at the time of authorization, if `False`, the recurrence will be suspended until the date chosen to be initiated.|
|`StartDate`|Defines the date on which Scheduled Recurrence transaction will be authorized|
|`EndDate`|Defines the date the Scheduled Recurrence will end. If it is not sent, the Recurrence will be executed until it is canceled by the merchant|
|`Interval`|Recurrence interval.<br /><ul><li>Monthly - Mensal </li><li>Bimonthly - Bimestral </li><li>Quarterly - Trimestral </li><li>SemiAnnual - Semestral </li><li>Annual - Anual </li></ul>|

When a transaction is sent to the API Cielo Ecommerce with the Scheduled Recurrence node, the recurrence process becomes effective when the transaction is considered **AUTHORIZED**.

From that point on, it will occur within the interval defined by the merchant.

Important features of **Scheduled Recurrence**:

|Information|Description|
|---|---|
|**Creation**|The first transaction is called **"Scheduling Transaction"**, all subsequent transactions will be copies of the first transaction. It does not need to be captured for the recurrence to be created, just be **AUTHORIZED**|
|**Capture**|Scheduled Recurrence transactions do not need to be captured. After the first transaction, all recurrence transactions are automatically captured by the API|
|**Identification**|Scheduled Recurrence transactions generate two types of identification:<br>**PAYMENTID**: Identify 1 transaction. It is the same identifier of the other transactions in the API    <br>**RECURRENTPAYMENTID**: Identifies recurrence Order. A RecurrentPaymentID has innumerable PaymentID linked to it. This is the variable used to Cancel a Scheduled Recurrence|
|**Consulting**|To consult, just use one of two types of identification:<br>**PAYMENTID**: Used to consult A TRANSACTION WITHIN THE RECURRENCE    <br>**RECURRENTPAYMENTID**: Used to consult THE RECURRENCE.|
|**Cancellation**|A Scheduled Recurrence can be canceled in two ways: <br>**Merchant**: It requests the cancellation of the recurrence. Do not cancel transactions already finalized before the recurrence cancellation order.  <br>**By invalid card**: If the API identifies that a saved card is invalid (e.g.: Expired) the recurrence will be canceled and will not be repeated until the merchant updates the payment method. <br> **NOTE:** Canceling transactions within the recurrence does not end the scheduling of future transactions. Only the Cancellation using the **RecurrentPaymentID** ends future schedules.

**RecurrentPaymentID Structure**

![]({{site.baseurl_root }}/images/apicieloecommerce/recpaymentid.png)

**Scheduled Recurrence flow**

![Recprog_EN](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxosrecprog_ingles.png)

#### Use case 

This is an example of how to use API Cielo Ecommerce's recurrences to increase your sales:

Recurrence is the process of saving a transaction and repeating it at a predefined time interval. Ideal for subscription model.

The Cielo' scheduled recurrence has the following characteristics:

* **Scheduled intervals:** Monthly, bimonthly, quarterly, semi-annual and annual
* **Expiry date:** Enables to define whether the recurrence will end
* **Retentative:** if a transaction is declined, we will retry the transaction up to 4x
* **Update:** Allows you to change recurrence data, such as value, interval.

See an example in use:

* **Monthly and annual recurrence**

The Musicfy company offers an online subscription service where their customers pay to be able to access a music library and listen to them via streaming.

To capture the maximum of customers, they offer 2 ways of payment:

* Monthly for R$19,90
* Annual (with discount) for R$180,00

How do they perform the monthly or annual billing of their customers?

MusicFy uses API Cielo Ecommerce Scheduled Recurrence.

When creating a transaction, Musicfy informs that the order in question must be repeated monthly or annually and that there is no end date for the charge.

What are the advantages of using scheduled recurrence for MusicFy?:

1. **Facility:** Monthly charge is automatic, so MusicFy does not have to worry about building a billing system.

2. **Usability:** The subscription value can be updated without the need to redo the transaction. A month can be canceled or the recurrence can have a delay (the 30-day free model) with only one setting.

3. **Safety:** It is not necessary to store sensitive card and buyer data at the store.

4. **Conversion:** The scheduled recurrence of Cielo has an automatic retentative system. If one of the transactions is declined, it will be retried up to 4 times, seeking to obtain the authorization.

## Creating Recurrences

### Creating an OWN RECURRENCE

To create a recurring sale whose recurrence and interval processes will be executed by the store itself, just do a POST as the example.

The `Payment.Recurrent` parameter must be `true`, otherwise the transaction will be declined.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|6|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|Yes|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`Payment.SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|No|
|`Payment.Recurrent`|marking an unscheduled recurrence transaction|boolean|5|No|
|`CreditCard.CardNumber`|Buyer's Card Number.|Text|19|Yes|
|`CreditCard.Holder`|Buyer's name printed on card.|Text|25|No|
|`CreditCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card.|Text|4|No|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|6|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`Payment.SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|No|
|`Payment.Recurrent`|marking an unscheduled recurrence transaction|boolean|5|No|
|`CreditCard.CardNumber`|Buyer's Card Number.|Text|19|Yes|
|`CreditCard.Holder`|Buyer's name printed on card.|Text|25|No|
|`CreditCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card.|Text|4|No|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

### Creating a SCHEDULED RECURRENCE

To create a recurring sale whose first recurrence is authorized with the form of payment as credit card, just do a POST as the example.

<aside class="notice"><strong>Warning:</strong> In this recurrence mode, the first transaction must be of captured. All subsequent transactions will be automatically captured.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|6|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|Yes|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`Payment.SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|No|
|`Payment.RecurrentPayment.EndDate`|End date for recurrence.|Text|10|No|
|`Payment.RecurrentPayment.Interval`|Recurrence interval.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|Text|10|No|
|`Payment.RecurrentPayment.AuthorizeNow`|Boolean to know if the first recurrence is about to be Authorized or not.|Boolean|---|Yes|
|`CreditCard.CardNumber`|Buyer's Card Number.|Text|19|Yes|
|`CreditCard.Holder`|Buyer's name printed on card.|Text|25|No|
|`CreditCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card.|Text|4|No|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Next recurrence Identifier field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Date of next recurrence.|Text|7|12/2030 (MM/YYYY)|
|`EndDate`|End date of recurrence.|Text|7|12/2030 (MM/YYYY)|
|`Interval`|Interval between recurrences.|Text|10|<ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|
|`AuthorizeNow`|Boolean to know if the first recurrence is about to be Authorized or not.|Boolean|---|true ou false|

## Scheduling a Scheduled Recurrence

To create a recurring sale whose first recurrence will not be authorized on the same date with the form of payment as credit card, just do a POST as the example.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Customer.Email`|Buyer's e-mail.|Text|255|No|
|`Customer.Birthdate`|Buyer's date of birth.|Date|10|No|
|`Customer.Identity`|Customer's RG, CPF or CNPJ number.|Text|14|No|
|`Customer.Address.Street`|Buyer's address.|Text|255|No|
|`Customer.Address.Number`|Buyer's address number.|Text|15|No|
|`Customer.Address.Complement`|Buyer's address complement.|Text|50|No|
|`Customer.Address.ZipCode`|Buyer's address zip code.|Text|9|No|
|`Customer.Address.City`|Buyer's address city.|Text|50|No|
|`Customer.Address.State`|Buyer's address state.|Text|2|No|
|`Customer.Address.Country`|Buyer's address country.|Text|35|No|
|`Customer.Address.District`|Buyer's neighborhood.|Text|50|No|
|`Customer.DeliveryAddress.Street`|Buyer's address.|Text|255|No|
|`Customer.DeliveryAddress.Number`|Buyer's address number.|Text|15|No|
|`Customer.DeliveryAddress.Complement`|Buyer's address complement.|Text|50|No|
|`Customer.DeliveryAddress.ZipCode`|Buyer's address zip code.|Text|9|No|
|`Customer.DeliveryAddress.City`|Buyer's address city.|Text|50|No|
|`Customer.DeliveryAddress.State`|Buyer's address state.|Text|2|No|
|`Customer.DeliveryAddress.Country`|Buyer's address country.|Text|35|No|
|`Customer.DeliveryAddress.District`|Buyer's neighborhood.|Text|50|No|

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
        "SoftDescriptor":"123456789ABCD",
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Next recurrence Identifier field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Date of next recurrence.|Text|7|12/2030 (MM/YYYY)|
|`StartDate`|Start date of recurrence.|Text|7|12/2030 (MM/YYYY)|
|`EndDate`|End date of recurrence.|Text|7|12/2030 (MM/YYYY)|
|`Interval`|Interval between recurrences.|Text|10|<ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|
|`AuthorizeNow`|Boolean to know if the first recurrence is about to be Authorized or not.|Boolean|---|true ou false|

## Modifying Recurrences

### Modifying buyer data

To change the Recurrence buyer's data, just do a Put as the example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Customer</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Customer.Email`|Buyer's e-mail.|Text|255|No|
|`Customer.Birthdate`|Buyer's date of birth.|Date|10|No|
|`Customer.Identity`|Customer's RG, CPF or CNPJ number.|Text|14|No|
|`Customer.IdentityType`|Text|255|No|Type of buyer ID document (CFP/CNPJ).|
|`Customer.Address.Street`|Buyer's address.|Text|255|No|
|`Customer.Address.Number`|Buyer's address number.|Text|15|No|
|`Customer.Address.Complement`|Buyer's address complement.|Text|50|No|
|`Customer.Address.ZipCode`|Buyer's address zip code.|Text|9|No|
|`Customer.Address.City`|Buyer's address city.|Text|50|No|
|`Customer.Address.State`|Buyer's address state.|Text|2|No|
|`Customer.Address.Country`|Buyer's address country.|Text|35|No|
|`Customer.Address.District`|Buyer's neighborhood.|Text|50|No|
|`Customer.DeliveryAddress.Street`|Buyer's address.|Text|255|No|
|`Customer.DeliveryAddress.Number`|Buyer's address number.|Text|15|No|
|`Customer.DeliveryAddress.Complement`|Buyer's address complement.|Text|50|No|
|`Customer.DeliveryAddress.ZipCode`|Buyer's address zip code.|Text|9|No|
|`Customer.DeliveryAddress.City`|Buyer's address city.|Text|50|No|
|`Customer.DeliveryAddress.State`|Buyer's address state.|Text|2|No|
|`Customer.DeliveryAddress.Country`|Buyer's address country.|Text|35|No|
|`Customer.DeliveryAddress.District`|Buyer's neighborhood.|Text|50|No|

#### Response

```shell
HTTP Status 200
```

See the annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Modifying end date of Recurrence

To change the end date of the Recurrence, just do a Put as the example.

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`EndDate`|End date for recurrence.|Text|10|Yes|

#### Response

```shell
HTTP Status 200
```

See the annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Modifying Recurrence interval

To change the Recurrence Interval, just do a Put according to the example.

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

|Property|Description|Type|Size|Request|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`Interval`|Recurrence interval. <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|Number|2|Yes|

#### Response

```shell
HTTP Status 200
```

See the annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Modify day of Recurrence

To modify the day of recurrence, just do a Put as the example.

<aside class="notice"><strong>Rule:</strong> If the new day informed is after the current day, we will update the recurrence day with effect on the next recurrence. E.g.: Today is day 5, and the next recurrence is day 05/25. When I upgrade to day 10, the date of the next recurrence will be day 05/10. If the new day reported is before the current day, we will update the recurrence day, but this will only take effect after the next recurrence is successfully performed. E.g.: Today is day 5, and the next recurrence is day 05/25. When I upgrade to day 3, the date of the next recurrence will remain on 05/25, and after it performs, the next one will be scheduled for day 06/03. If the new informed day is before the current day, but the next recurrence is in another month, we will update the recurrence day with effect on the next recurrence. E.g.: Today is day 5, and the next recurrence is day 09/25. When I upgrade to day 3, the next recurrence date will be 09/03</aside>

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`RecurrencyDay`|Recurrence day.|Number|2|Yes|

#### Response

```shell
HTTP Status 200
```

See the Annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Modifying the Recurrence value

To modify the value of the recurrence, just do a Put as example.

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Amount</span></aside>

```json
156
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Amount"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
156
--verbose
```

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`Payment.Amount`|Order Value in cents: 156 equals R$ 1,56|Number|15|Yes|

<aside class="warning">This change only affects the payment date of the next recurrence.</aside>

#### Response

```shell
HTTP Status 200
```

See the Annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Modifying date of next Payment

To change the date of the next Payment, just do a Put as the example.

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`NextPaymentDate`|Payment date of the next recurrence.|Text|10|Yes|

#### Response

```shell
HTTP Status 200
```

See the Annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Modifying Recurrence Payment data

To change the payment data of the Recurrence, just do a Put as the example.

<aside class="notice"><strong>Warning:</strong> This change affects all data in the Payment node. So to keep the previous data you must inform the fields that will not change with the same values that were already saved.</aside>

#### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Payment</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`Payment.SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|No|
|`CreditCard.CardNumber`|Buyer's Card Number.|Text|16|Yes|
|`CreditCard.Holder`|Buyer's name printed on card.|Text|25|No|
|`CreditCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card|Text|4|No|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

#### Response

```shell
HTTP Status 200
```

See the Annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Disabling a Recurrent Order

To disable a recurrent order, just do a Put as the example.

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|

#### Response

```shell
HTTP Status 200
```

See the Annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

### Rehabilitating a Recurrent Order

To Rehabilitate a recurring order, just do a Put as the example.

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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrence identification number.|Text|50|Yes|

#### Response

```shell
HTTP Status 200
```

See the Annex [HTTP Status Code](#http-status-code) to the list with all HTTP status codes possibly returned by the API.

## Renew easy

The use of this feature allows the automatic replacement of an expired card .
That way, when a transaction with recurrent markup is submitted to the API and Cielo identifies that the used card has been replaced, its authorization will be declined and the new card data will be returned as the example.

<aside class="notice"><strong>Warning:</strong> It is necessary to request enabling this feature in the register  </aside>

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|6|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`Payment.SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|No|
|`Payment.RecurrentPayment.EndDate`|End date for recurrence.|Text|10|No|
|`Payment.RecurrentPayment.Interval`|Recurrence interval.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|Text|10|No|
|`Payment.RecurrentPayment.AuthorizeNow`|Boolean to know if the first recurrence is about to be Authorized or not.|Boolean|---|Yes|
|`CreditCard.CardNumber`|Buyer's Card Number.|Text|19|Yes|
|`CreditCard.Holder`|Buyer's name printed on card.|Text|25|No|
|`CreditCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card.|Text|4|No|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Next recurrence Identifier field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Date of next recurrence.|Text|7|12/2030 (MM/YYYY)|
|`EndDate`|End date of recurrence.|Text|7|12/2030 (MM/YYYY)|
|`Interval`|Interval between recurrences.|Text|10|<ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|
|`AuthorizeNow`|Boolean to know if the first recurrence is about to be Authorized or not.|Boolean|---|true ou false|

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`NewCard.CardNumber`|New Buyer Card number.|Text|16|Yes|
|`NewCard.ExpirationDate`|new expiry date of the card.|Text|7|Yes|
|`NewCard.Brand`|Card issuer.|Text|10|Yes|
|`NewCard.SaveCard`|Identifies whether the card generated Cardtoken during the transaction|Boolean|---|Yes|

### Card Brands and Issuers Enabled

Card Brands and Issuers that are already with Renew easy enabled:

|Issuers|VISA|MASTER|ELO|
|---|---|---|---|
|`BRADESCO`|Yes|Yes|Yes|
|`BANCO DO BRASIL`|Yes|---|---|
|`SANTADER`|Yes|---|---|
|`CITI`|Yes|---|---|
|`BANCO PAN`|Yes|---|---|

# Tokenization of cards

## What is Tokenization of Cards:

It is a platform that allows secure storage of sensitive credit card data. This data is transformed into an encrypted code called a “token”, which can be stored in a database. With the platform, the store will be able to offer features like "1-click buy" and "Retry transaction sending", always preserving the integrity and the confidentiality of the information.

## Creating a Tokenized Card

To save a card without authorizing it, just perform a post with the card data.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/card/</span></aside>

```json
{
    "CustomerName": "Comprador Teste Cielo",
    "CardNumber":"4532117080573700",
    "Holder":"Comprador T Cielo",
    "ExpirationDate":"12/2030",
    "Brand":"Visa"
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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`Name`|Text|255|Yes|Buyer's name.|
|`CardNumber`|Text|16|Yes|Buyer's Card Number.|
|`Holder`|Text|25|Yes|Buyer's name printed on card.|
|`ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover).|

### Response

```json
{
  "CardToken": "db62dc71-d07b-4745-9969-42697b988ccb",
  "Links": {
    "Method": "GET",
    "Rel": "self",
    "Href": "https://apiquerydev.cieloecommerce.cielo.com.br/1/card/db62dc71-d07b-4745-9969-42697b988ccb"}
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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Cardtoken`|Card identification token.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Creating a Tokenized Card during an authorization

To save a card by creating its token, just send a sales creation standard request by sending SaveCard as "true". The response will return the card Token.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador Teste",
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
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
  "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
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
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Customer.Identity`|Text|14|No|Customer's RG, CPF or CNPJ number.|
|`Customer.IdentityType`|Text|255|No|Type of buyer ID document (CFP/CNPJ).|
|`Customer.Email`|Text|255|No|Buyer's e-mail.|
|`Customer.Birthdate`|Date|10|No|Buyer's date of birth.|
|`Customer.Address.Street`|Text|255|No|Buyer's address.|
|`Customer.Address.Number`|Text|15|No|Buyer's address number.|
|`Customer.Address.Complement`|Text|50|No|Buyer's address complement.br|
|`Customer.Address.ZipCode`|Text|9|No|Buyer's address zip code.|
|`Customer.Address.City`|Text|50|No|Buyer's address city.|
|`Customer.Address.State`|Text|2|No|Buyer's address state.|
|`Customer.Address.Country`|Text|35|No|Buyer's address country.|
|`Customer.DeliveryAddress.Street`|Text|255|No|Buyer's address.|
|`Customer.Address.Number`|Text|15|No|Buyer's address number.|
|`Customer.DeliveryAddress.Complement`|Text|50|No|Buyer's address complement.|
|`Customer.DeliveryAddress.ZipCode`|Text|9|No|Buyer's address zip code.|
|`Customer.DeliveryAddress.City`|Text|50|No|Buyer's address city.|
|`Customer.DeliveryAddress.State`|Text|2|No|Buyer's address state.|
|`Customer.DeliveryAddress.Country`|Text|35|No|Buyer's address country.|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Currency`|Text|3|No|Currency in which payment will be made (BRL).|
|`Payment.Country`|Text|3|No|Country where payment will be made.|
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Interest`|Text|10|No|Type of installment - Store (ByMerchant) or Card (ByIssuer).|
|`Payment.Capture`|Boolean|---|No (Default false)|Boolean that identifies that the authorization should be with automatic capture.|
|`Payment.Authenticate`|Boolean|---|No (Default false)|Defines whether the buyer will be directed to the Issuing bank for card authentication|
|`Payment.ServiceTaxAmount`|Number|15|No|Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value.|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.SaveCard`|Boolean|---|No (Default false)|Boolean that identifies whether the card will be saved to generate the CardToken.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Campo Identificador do Pedido.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|
|`Cardtoken`|Card identification token.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Tokenization by Card Networks

Some brands have a tokenization solution that offers the storage of cards in safes in the same brand in an encrypted form. This brand tokenization is intended to improve the quality of ID card information, which may allow for increased approval conversion by issuing banks. See all the benefits:
  
* **Increased security:** In addition to creating a code (token or DPAN) to replace the card information, the brands also issue cryptograms, which work like a password or signature of the brand, unique to that card at that establishment.
* **Automatic Card Update:** When a new card is issued in place of the previous card, or when a card's expiration date changes, banks send this information to the brand's database, and the brand automatically updates the tokens with the new information. That is, there is no need for any action on the part of the establishment.
* **Higher approval conversion:** Due to the greater security with brand tokens, issuing banks feel more secure in approving transactions. Plus, with card data automatically updated, more sales that could be denied by outdated card data can be approved.

**How it works ?**
  
The participating brands make APIs available to acquirers, gateways and partners to securely receive and store the card, with the creation of a unique and exclusive token for that card at that establishment.
  
Cielo provides these services to customers in two ways:
  
* **Simple Integration:** The merchant integrates with Cielo's conventional tokenization functionality, which calls the card brand tken API from behind, and connect these two tokens in Cielo's vault. In this way, merchants will always have a single token for that card, but Cielo will have in house the tokens and cryptograms of the brands.
* Available Brands: Visa;
* Eligible Products: E-Commerce API 3.0 and 1.5.
* To obtain this functionality, contact our ecommerce support channel and request them to enable the card brand token service: cieloecommerce@cielo.com.br

* **External Integration:** If the merchant uses a gateway or another partner that already offers the card brand token service, Cielo already has the Fields in our APIs to receive the token information, needed to be sent in the transaction. Then, the transaction will be sent to the card brand with the token data.
* Available brands: Visa, Master and Elo.
* For the External Integration, Cielo is prepared to receive token data from the three brands above, but it is necessary to check whether the brand offers the product on the market.
* Eligible Products: E-Commerce API 3.0 and 1.5.

Check below the fields to be sent in the transaction if the option chosen is the integration from the outside:

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador Teste",
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
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
  "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",,
         "Cryptogram":"abcdefghijklmnopqrstuvw==",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
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
         "CardNumber":"4551870000000183",,
         "Cryptogram":"abcdefghijklmnopqrstuvw==",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Customer.Identity`|Text|14|No|Customer's RG, CPF or CNPJ number.|
|`Customer.IdentityType`|Text|255|No|Type of buyer ID document (CFP/CNPJ).|
|`Customer.Email`|Text|255|No|Buyer's e-mail.|
|`Customer.Birthdate`|Date|10|No|Buyer's date of birth.|
|`Customer.Address.Street`|Text|255|No|Buyer's address.|
|`Customer.Address.Number`|Text|15|No|Buyer's address number.|
|`Customer.Address.Complement`|Text|50|No|Buyer's address complement.br|
|`Customer.Address.ZipCode`|Text|9|No|Buyer's address zip code.|
|`Customer.Address.City`|Text|50|No|Buyer's address city.|
|`Customer.Address.State`|Text|2|No|Buyer's address state.|
|`Customer.Address.Country`|Text|35|No|Buyer's address country.|
|`Customer.DeliveryAddress.Street`|Text|255|No|Buyer's address.|
|`Customer.Address.Number`|Text|15|No|Buyer's address number.|
|`Customer.DeliveryAddress.Complement`|Text|50|No|Buyer's address complement.|
|`Customer.DeliveryAddress.ZipCode`|Text|9|No|Buyer's address zip code.|
|`Customer.DeliveryAddress.City`|Text|50|No|Buyer's address city.|
|`Customer.DeliveryAddress.State`|Text|2|No|Buyer's address state.|
|`Customer.DeliveryAddress.Country`|Text|35|No|Buyer's address country.|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Currency`|Text|3|No|Currency in which payment will be made (BRL).|
|`Payment.Country`|Text|3|No|Country where payment will be made.|
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Interest`|Text|10|No|Type of installment - Store (ByMerchant) or Card (ByIssuer).|
|`Payment.Capture`|Boolean|---|No (Default false)|Boolean that identifies that the authorization should be with automatic capture.|
|`Payment.Authenticate`|Boolean|---|No (Default false)|Defines whether the buyer will be directed to the Issuing bank for card authentication|
|`Payment.ServiceTaxAmount`|Number|15|No|Applicable to airlines companies only. Amount of the authorization value/amount that should be allocated to the service fee. Note: This value is not added to the authorization value.|
|`Payment.CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number. The indication that CardNumber must be completed with DPAN for Card Networks tokenization.|
|`Payment.CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`Payment.CreditCard.Cryptogram`|Text|28|No|Cryptogram generated by the Card Networks.|
|`Payment.CreditCard.ExpirationDate`|Text|7|Yes|Expiry date of token generated by flag.|
|`Payment.CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`Payment.CreditCard.SaveCard`|Boolean|---|No (Default false)|Boolean that identifies whether the card will be saved to generate the CardToken.|
|`Payment.CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Campo Identificador do Pedido.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|
|`Cardtoken`|Card identification token.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Creating a sale with Tokenized Card

To create a credit card sale with protected card token, it is necessary to do a POST for the Payment feature as the example.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`Payment.SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|No|
|`Payment.ReturnUrl`|URI to which the user will be redirected after payment ends|Text|1024|Yes when Authenticate = true|
|`CreditCard.CardToken`|Card identification token.|Guid|36|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card.|Text|4|No|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric texto|

## Creating a sale with Tokenized Card in 1.5

To create a credit card sale with webservice 1.5 token, it is necessary to do a POST for the Payment feature as the example.

For use in Sandbox, it is possible to simulate authorized or declined transactions via test tokens:

|Status|Token|
|---|---|
|Authorized|6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA|
|Declined|6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeB|

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Description|Type|Size|Required|
|---|---|---|---|---|
|`MerchantId`|Store identifier in API Cielo eCommerce.|Guid|36|Yes|
|`MerchantKey`|Public Key for Double Authentication in API Cielo eCommerce.|Text|40|Yes|
|`RequestId`|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Order ID number.|Text|50|Yes|
|`Customer.Name`|Buyer's name.|Text|255|No|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING) - Used by fraud analysis|Text|255|No|
|`Payment.Type`|Type of the Payment Method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`CreditCard.CardToken`|Card identification token.|Guid|300|Yes|
|`CreditCard.Brand`|Card issuer.|Text|10|Yes|

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|

# BIN Checker

The “**BIN Checker**” is **credit or debit card data search service**, which returns to the Cielo e-Commerce API merchant information that allows you to validate the data entered on the checkout screen. The service return the following data on the card:

* **Card Brand:** Brand Name
* **Card Type:** Credit, Debit or Multiple (Credit and Debit)
* **Card Nationality:** Foreign or National (Brazil)
* **Card:** Whether or not the card is corporate
* **Issuing Bank:** Code and Name
* **Prepaid card:** yes or no

This information makes it possible to take some actions on the checkout and increase the conversion rate.

<aside class="warning">BIN Check must be enabled by Cielo Support Team. Contact them to enable the service.</aside>

## Use Case

See an use case example: **BIN Checker + cart recovery**

A marketplace called Submersible has a range of payment methods available for its stores to offer to the buyer, but even with all that supply available, it continues with a low conversion rate.

Knowing the Bin checker of the Cielo Ecommerce API, how could it prevent the loss of carts?

It can apply the bin checker bins and 3 scenarios!

1. Prevent errors with card type
2. Offer online car recovery
3. Alert about international cards
4. Prevent errors with card type

The Submersible can use the bins checker in the cart to identify 2 of the major errors in completing payment forms:

* **Wrong issuer** and confuse credit card with debit ○ Wrong issuer: When filling out the payment form, it is possible to conduct a checker and set the correct issuer. This is a much safer method than based on algorithms in the form, since the base of the bins are checked is that of the card issuing Card Networks.

* **Card confusion:** When filling out the payment form, it is possible to conduct a check and notify the consumer if it is using a debit card when in fact he should use a debit card.

<br>

**Offer a cart recovery online**

* The Submersible can use the bins query in the cart to offer a new means of payment if the transaction fails on the first attempt.

* When running a query at the time of filling out the payment form, if the card is multiple (Credit and Debit), the Submersible may retain the data on the card, and if the credit transaction fails, it can automatically offer the consumer a debit transaction with the same card.

**Alert about international cards**
The Submersible can use the bin checker in the cart to alert international buyers, that if the card is not enabled to transact in Brazil, the transaction will be denied.

## Integration

### Request

A `GET` request must be sent containing the BIN to be checked:

<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/cardBin/`BIN`</span></aside>

|Field|Description|
|-----|---------|
|`BIN`|First 9 digits of the payment card<br>_To simulate the request obtaining `ForeignCard=false` result, the third digit must be 1 and the fifth must not be 2 or 3.<br>Examples:001040, 501010, 401050_ |

``` json
https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/420020
```

### Response

``` json
{
    "Status": "00",
    "Provider": "VISA",
    "CardType": "Crédito",
    "ForeignCard": true,
    "CorporateCard": true,
    "Issuer": "Bradesco",
    "IssuerCode": "237"
    "Prepaid":true
}
```

| Parameter     | Type  | Size | Description                                                                                                                                                       |
|---------------|-------|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Status`      | Text  | 2    | BIN Check status response: <br><br> 00 – Analysis authorized <br> 01 – Brand not supported<br> 02 – Card not supported for BIN Check<br> 73 – Blocked Affiliation |
| `Provider`    | Text  | 255  | Card Brand                                                                                                                                                        |
| `CardType`    | Text  | 20   | Card Type : <br><br> Crédito <br> Débito <br>Multiplo                                                                                                              |
| `ForeingCard` | Boolean  | -  | If card was issued abroad (False/True)                                                                                                                            |
| `CorporateCard` | Boolean | -     | If card is coporate type (False/True)                                                                                                                                             |
| `Issuer` | Text | 255     | Card issuer's name                                                                                                                                        |
| `IssuerCode` | Text | 255     | Card issuer's code                                                                                                                                           |
| `Prepaid` | Boolean | True ou False | Returns "True" if the card is prepaid.|

> **NOTE**: On testing environment (SANDBOX), the returned data is simulated, so they are not valid BIN Check results. Only fields and format must be considered. For real identification of the BIN Check, production environment must be used.

# Zero Auth

**Zero Auth** is a Credit Card validation tool. It allows the merchant to know whether or not the card is valid before sending it for authorization, anticipating the reason for a possible non-authorization.

**Zero Auth** can be used in 2 ways:

1. **Standard** - Sending a standard card without tokenization or additional analysis
2. **Using the "Cardtoken"** - Sending a TOKEN 3.0 for analysis

It is important to note that Zero Auth **does not return or analyze** the following items:

1. Card credit limit
2. Information about the holder
3. Does not trigger the banking base (SMS notification)

Zero Auth supports the following Card Networks/Card Brands:

* **Visa**
* **MasterCard**
* **Elo**

> If other Brand (Card Network Name) is sent, the error **57-Bandeira inválida** will be displayed.

## Use case

This is an example of how to use zero auth to improve your sales conversion.

Zero Auth is a tool from Cielo that allows you to check if a card is valid before the order is finalized. It does this by simulating an authorization, but without affecting the credit limit or alerting the card holders about the test.

It does not inform the limit or characteristics of the card or carrier, but simulates a Cielo authorization, validating data such as:

1. If the card is valid with the issuing bank
2. If the card has limit available
3. If the card works in Brazil
4. If the card number is correct
5. If the CVV is valid

Zero Auth also works with tokenized cards in Api Cielo Ecommerce.

Here's an example of usage:

**Zero auth as card validator**

A Streaming company called FlixNet has a subscription service, where in addition to making a recurrence, it has saved cards and receives new subscriptions daily. All of these steps require that transactions be performed to gain access to the tool, which raises the cost of FlixNet if transactions are not authorized.

How could the company reduce its cost? Validating the card before sending it to authorized.

FlixNet uses Zero Auth at 2 different times:

* **Registration:** it must be included a card to get 30 days free in the first month.
The problem is that at the end of this period, if the card is invalid, the new register exists, but it does not work, because the saved card is invalid. FlixNet solved this problem by testing the card with Zero Auth at the time of registration, then, they already know if the card is valid and release the creation of the account. If the card is not accepted, FlixNet may suggest the use of another card.

* **Recurrence:** every month, before you charge the Subscription, Flixnet tests the card with zero auth, then, knowing if it will be authorized or not. This helps FlixNet predict which cards will be denied, already triggering the subscriber to update the registration before the payday.

## Integration

In order to use Zero Auth, the merchant must send a `POST` request to the Cielo Ecommerce API, simulating a transaction. `POST` should be done at the following URLs:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://api.cieloecommerce.cielo.com.br/1/zeroauth</span></aside>

Each type of validation requires a different technical contract. They will result in differentiated responses

### Request

#### Standard

``` json
{
    "CardNumber":"1234123412341231",
    "Holder":"Alexsander Rosa",
    "ExpirationDate":"12/2021",
    "SecurityCode":"123",
    "SaveCard":"false",
    "Brand":"Visa",
    "CardOnFile":{
       "Usage":"First",
       "Reason":"Recurring"
    }
}
```

Below the fields returned after validation:

| Field              | Description                                                                                                                                                                                                              | Type      | Contact Us | Required       |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|------------|----------------|
| `CardType`         | Defines the type of card used: <br> <br> *CreditCard* <br> *DebitCard* <br> <br> If not sent, CreditCard as default                                                                                                      | Text      | 255        | Yes            |
| `CardNumber`       | Card Number                                                                                                                                                                                                              | Text      | 16         | Yes            |
| `Holder`           | Buyer's name, printed on the card.                                                                                                                                                                                       | Text      | 25         | Yes            |
| `ExpirationDate`   | Expiration date.                                                                                                                                                                                                         | Text      | 7          | Yes            |
| `SecurityCode`     | Card Security code .                                                                                                                                                                                                     | Text      | 4          | Yes            |
| `SaveCard`         | Defines if the card must be tokenized                                                                                                                                                                                    | Boolean   | ---        | Yes            |
| `Brand`            | Card Brand:<br> Visa <br> Master <br> ELO                                                                                                                                                                                    | Text      | 10         | Yes            |
| `CardToken`        | Card Token 3.0                                                                                                                                                                                                           | GUID      | 36         | Conditional    |
| `Usage`            | **First** if the credentials have been stored and they will be used for the first time.<br>**Used** if the credentials have been stored and they were previously used.                                                   | Text   | ---     | No         |
| `Reason`           | Indicates the purpose of credential storage, case the value of field "Usage" is "Used" <br>**Recurring** - Scheduled recurring<br>**Unscheduled** - Unscheduled recurring<br>**Installments** - Installments Transaction | Text   | ---     | Conditional |

#### Using CardToken

``` json
{
  "CardToken":"23712c39-bb08-4030-86b3-490a223a8cc9",
  "SaveCard":"false",
  "Brand":"Visa"
}
```

Below is the list of Requisition fields:

| Field              | Description                                                                                                               | Type      | Contact Us | Required       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|-----------|------------|----------------|
| `Brand`            | Card Brand: Visa <br> Master <br> ELO                                                                                     | Text      | 10         | not            |
| `CardToken`        | Tokenized Card 3.0                                                                                                            | GUID      | 36         | yes |

### Response

The response always returns if the card can be authorized at the moment. This information only means that _the card is valid to transact_, but does not necessarily indicate that a certain value will be authorized.

Below the fields returned after validation:

| Field                 | Description                                                                        | Type      | Contact Us |
| --------------------- | ------------------------------- -------------------------------------------------- | --------- | : -------: |
| `Valid`               | Card Status: <br> **True ** - Valid Card <BR> **False** - Invalid Card             | Boolean   | ---        |
| `ReturnCode`          | Return code                                                                        | Text      | 2          |
| `ReturnMessage`       | Return message                                                                     | Text      | 255        |
| `IssuerTransactionId` | Issuer authentication ID for recurring debit transactions. This field must be sent in subsequent transactions of the first transaction in the recurrence model itself. In the scheduled recurrence model, Cielo will be responsible for sending the field in subsequent transactions. | Text   | 15      |

#### POSITIVE - Valid Card

``` json
{
        "Valid": true,
        "ReturnCode": “00”,
        "ReturnMessage", “Transacao autorizada”,
        "IssuerTransactionId": "580027442382078"
}
```

> See [**Integration Manual**](https://developercielo.github.io/en/manual/cielo-ecommerce) for more information about Return Codes.
> The return code **"00" represents success in Zero Auth**, the other codes are defined according to the above documentation.

#### NEGATIVE - Invalid Card

``` json
{
       "Valid": false,
       "ReturnCode": "57",
       "ReturnMessage": "Autorizacao negada",
       "IssuerTransactionId": "580027442382078"
}
```

#### NEGATIVE - Invalid Card - Brand not Supported

``` json
  {    
      "Code": 57,     
      "Message": "Bandeira inválida"   
  }
```

#### NEGATIVE - Restriction Cadastral

``` json
  {    
      "Code": 389,     
      "Message": "Restrição Cadastral"   
  }
```

If there is any error in the flow, where it is not possible to validate the card, the service will return error:

* 500 - Internal Server Error
* 400 - Bad Request

# Silent Order Post

Integration that Cielo offers to merchants, where the payment data is safely traced, while maintaining full control over the Ckeckout experience.

This method allows you to send payment data from your final customer securely directly to our system. Payment fields are stored on Cielo's side, that counts on with the PCI DSS 3.2 certified.

It is ideal for merchants who require a high level of security without losing the identity of your page. This method allows a high level of customization on your checkout page.

## Characteristics

* It captures payment data directly to Cielo's systems through the fields hosted on your page through a script (javascript).
* Compatibility with all payment methods available to the Gateway (National and International)
* Buyer Authentication (available)
* Reducing the scope of the PCI DSS
* Keep the full control over the checkout experience and brand management elements.

## Authorization Flow

### Standard Authorization Flow

![Authorization_Flow]( https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-padrao-de-autorizacao_2_en.png)

The establishment must be **PCI Compliance** (PCI = Security Rules to manipulate card data)

### Authorization Flow with Silent Order POST

![Authorization_Flow_POST]( https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-de-autorizacao-com-sop_1_en.png)

The server **does not pass the card data** openly.

## Transactional Flow

![Transactional_Flow]( https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-silent-order-post-cielo_-_3_en.png)

## Integration

### STEP 1

The shopper finishes the checkout, and goes to payment processing.

### STEP 2. Getting Access Token OAuth2

When the shopper accesses the checkout, the merchant must generate the AccessToken from Cielo Authentication API (OAuth). On success, the API will return an AccessToken that must be populated in the script to load on the page.

To request AccessToken, send a request (POST) to the following endpoint in the server-to-server template:

|Environment | base URL + endpoint | Authorization |
|---|---|---|
| **SANDBOX** | https://authsandbox.braspag.com.br/oauth2/token | "Basic *{base64}*"|
| **PRODUCTION** | https://auth.braspag.com.br/oauth2/token |"Basic *{base64}*"|

How to obtain the Base64 value:

1. Concatenate "ClientId" and "ClientSecret" (`ClientId:ClientSecret`). 
2. Code the result in base64.
3. Send a request to the authorization server with the alphanumeric code you just created.

> To request your "ClientID" and "ClientSecret", please send an email to cieloecommerce@cielo.com.br with the following:
* MerchantId;
* Describe that you need the credentials "ClientID" e o "ClientSecret" to use Silent Order Post.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">oauth2/token</span></aside>

``` shell
--request POST "https://authsandbox.braspag.com.br/oauth2/token"
--header "Authorization: Basic {base64}"
--header "Content-Type: application/x-www-form-urlencoded" 
--data-binary "grant_type=client_credentials"
```

|Parameters|Format|Where to send|
|---|---|---|
|`Authorization`|"Basic *{base64}*"|Header.|
|`Content-Type`|"application/x-www-form-urlencoded"|Header.|
|`grant_type`|"client_credentials"|Body.|

#### Response

``` json
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

|Response Properties|Description|
|---|---|
|`access_token`|The requested authentication token, that will be used in the next step.|
|`token_type`|Indicates the token type value.|
|`expires_in`|Access Token expiration, in seconds. When the token expires, you must request a new one.|

### STEP 3. Getting the SOP AccessToken

After obtaining AccessToken OAuth2, you should send a new request (POST) to the following URL:

| Environment | base URL + endpoint|
| --- | --- |
| Sandbox | https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken|
| Production | https://transaction.pagador.com.br/post/api/public/v2/accesstoken|

#### Request

```shell
--request POST "https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken"
--header "Content-Type: application/json"
--header "MerchantId: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
--header "Authorization: Bearer faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw"
--data-binary
--verbose
```

|Properties|Description|Type|Size|Mandatory?|
|-----------|---------|----|-------|-----------|
|`MerchantId`|Merchant identifier at Pagador.|GUID |36 |Yes|
|`Authorization`|Bearer [AccessToken OAuth2]|Text |36 |Yes|

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

|Properties|Description|Type|Size|Format|
|-----------|---------|----|-------|-------|
|`MerchantId`|Merchant identifier at Pagador. |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`AccessToken`|AccessToken SOP. For safety reasons, this token will allow the merchant to save only one card within the deadline determined in the response, through the attribute *Expires In*. The default is 20 minutes. Whatever happens first will invalidate the token to prevent it from being used again.|Texto|--|NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==|
|`Issued`|Token creation date and hour. |Texto|--|AAAA-MM-DDTHH:MM:SS|
|`ExpiresIn`|Token expiration date and hour. |Texto|--|AAAA-MM-DDTHH:MM:SS|

>To see the legacy authentication process, which used the MerchantId and shopper IP address to create the `AccessToken`, [click here](https://developercielo.github.io/en/manual/cielo-ecommerce#legacy-authentication).

### STEP 4

a) The establishment should download a script provided by Cielo, and attach it to its checkout page. This script will allow Cielo to process all the card information without intervention of the establishment.
The download can be made from the following URL:

**SANDBOX:**
**https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js**

**PRODUCTION:**
**https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js**

b) The establishment should customize its inputs of the form with the following classes:

* For the credit/debit card holder: **bp-sop-cardholdername**
* For credit/debit card number: **bp-sop-cardnumber**
* For credit/debit card validity: **bp-sop-cardexpirationdate**
* For credit/debit card security code: **bp-sop-cardcvvc**

**SETTING PARAMETERS**

**Script Parameters**

|Property|Description|
|-----------|---------|
|`accessToken`|Access Token obtained via Authentication API|
|`environment`|**sandbox** or **production**|
|`language`|**PT** or **EN** or **ES**|
|`enableTokenize`| **true** if you want to save the card directly on your vault in the Cartão Protegido (returns a 'cardToken' instead of a 'paymentToken'). **false** otherwise.|
|`cvvRequired`| "false" (sets CVV as not mandatory) / "true" (sets CVV as mandatory). |

**Script Response**

|Property|Description|
|-----------|---------|
|`PaymentToken`|Payment Token in GUID format (36)|
|`CardToken`| Permanent token to be used on a payment request on a GUID format (36) Obs.: Only works if 'enableTokenize' is **true**|

c) The script provided by Cielo provides three events for manipulation and treatment on the establishment side. They are: **onSuccess** (where **PaymentToken** will be returned after processing the card data), **onError** (if there is any error in the consumption of Cielo services) and **onInvalid** (where the result of the validation of the inputs will be returned).

* In the input validation, the establishment can use the entire layer of validation on the card data made by Cielo and then simplify the treatment on your checkout form. The messages returned in the validation result are available in the following languages: portuguese (default), english and spanish.

* The *PaymentToken* will be the token that will represent all the card data provided by the buyer. The same will be used by the establishment so there is no need to process and process card data on its side.

``` json
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

|Property|Description|Type|Size|Required|
|-----------|---------|----|-------|-----------|
|`mid_loja`|API store identifier |Guid |36 |Yes|

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

|Property|Description|Type|Size|Format|
|-----------|---------|----|-------|-------|
|`MerchantId`|Store identifier in Cielo |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`AccessToken`|Access token |Text|--|NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==|
|`Issued`|Date and time generation |Text|--|AAAA-MM-DDTHH:MM:SS|
|`ExpiresIn`|Date and time of expiration |Text|--|AAAA-MM-DDTHH:MM:SS|

b) In order to use this resource, for security reasons, it will be obligatory on the Cielo's behalf, **at least one valid IP of the establishment.** Otherwise the request will not be authorized (HTTP 401 NotAuthorized).

**STEP 3**

a) In response, the establishment will receive a json (HTTP 201 Created) containing among other information, the ticket (AccessToken), such as:

![Response Ticket]({{ site.baseurl_root }}/images/response-ticket-silent-order-post-cielo.jpg)

For security reasons, this ticket will allow the establishment to save only 1 card within a deadline already stipulated in the response, using the ExpiresIn attribute (by default, 20 minutes). Whatever happens first will invalidate this same ticket for future use.

Continue to STEP 4 above.

# Wallet

## What are Wallets

They are card repositories and payment data for online consumers. The digital wallets allow a consumer to register their payment data, then speeding up the purchase process in qualified stores in their purchases by having only one registration.

> To use wallets in the API Cielo eCommerce, the merchant must have the wallets integrated in their checkout. 

For more information, we suggest that you contact the technical department of the wallet that you wish to implement.

### Wallets Available

The Cielo Ecommerce API is integrated with:

| Wallet                                                                | 
|-----------------------------------------------------------------------|
| [*Apple Pay*](https://www.apple.com/br/apple-pay/)                    |
| [*VisaCheckout*](https://vaidevisa.visa.com.br/site/visa-checkout)    | 
| [*MasterPass*](https://masterpass.com/pt-br/)                         | 
| [*Samsung Pay*](https://www.samsung.com.br/samsungpay/)               |
| [*Google Pay*](https://developercielo.github.io/en/manual/google-pay) |

<aside class="notice"><strong>Warning:</strong> When the “Wallet” node is sent in the request, the “CreditCard” node becomes optional.</aside>

<aside class="notice"><strong>Warning:</strong> For debit card, when the “Wallet” node is sent in the request, the “DebitCard” node will be needed containing the “ReturnUrl”.</aside>

<aside class="notice"><strong>Warning:</strong>  Due to the need of using ephemeral keys to carry out credit operations, the Recurrence is not available for Wallets transactions </aside>

## Base integration

The wallets on Api Cielo E-commerce have two ways to be used.

1. **Decryption** - When the merchant sends the data from the wallet so that API Cielo e-commerce performs the card processing
2. **Card sending** - When the store searches the card, and send its own to the API Cielo e-commerce for processing

### Components

#### Walletkey

The WalletKey is the identifier used by Cielo to decrypt payloads returned by the Wallet. It used only in integrations in the formed `Decryption` 
Each Wallet has a `WalletKeys` format.

| Wallet         | Example        |
|----------------|----------------|
| **VisaCheckout** | `1140814777695873901`   |
| **Apple Pay**    | `9zcCAciwoTS+qBx8jWb++64eHT2QZTWBs6qMVJ0GO+AqpcDVkxGPNpOR/D1bv5AZ62+5lKvucati0+eu7hdilwUYT3n5swkHuIzX2KO80Apx/SkhoVM5dqgyKrak5VD2/drcGh9xqEanWkyd7wl200sYj4QUMbeLhyaY7bCdnnpKDJgpOY6J883fX3TiHoZorb/QlEEOpvYcbcFYs3ELZ7QVtjxyrO2LmPsIkz2BgNm5f+JaJUSAOectahgLZnZR+sRXTDtqLOJQAprs0MNTkPzF95nXGKCCnPV2mfR7z8FHcP7AGqO7aTLBGJLgxFOnRKaFnYlY2E9uTPBbB5JjZywlLIWsPKur5G4m1/E9A6DwjMd0fDYnxjj0bQDfaZpBPeGGPFLu5YYn1IDc`   |
| **Samsung Pay**  | `eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-LldMArSoG59x6i0BbI7jttqxyAdcriSy8q_77VAp3854P9kekjj54RKLrP6APDIr46DI97kjG9E99ONXImnEyamHj95ZH_AW8lvkfa09KAr4537RM8GEXyZoys2vfIW8zqjjicZ8EKIpAixNlmrFJu6-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ`   |

> **Note:**
> The Wallet MasterPass does not have `WalletKey`
> The `WalletKey` Apple Pay can be obtained inside the `DATA` field of the Apple payload

#### EphemeralPublicKey

The `EphemeralPublicKey` is the key used by Cielo to decrypt payloads containing `WalletKeys` sent by the merchant. It is used only in integrations in the formed `Decryption`
Each Wallet has an `EphemeralPublicKey` format.

| Wallet       | Example                                                                                                                          |
|----------------|----------------------------------------------------------------------------------------------------------------------------------|
| *Apple Pay*    | `MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoedz1NqI6hs9hEO6dBsnn0X0xp5/DKj3gXirjEqxNIJ8JyhGxVB3ITd0E+6uG4W6Evt+kugG8gOhCBrdUU6JwQ==`   |

> *VisaCheckout* / *MasterPass* / *SamsungPay* **do not have** EphemeralPublicKey

### Decryption

#### Request

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

| Property                   | Type   | Size    | Required    | Description                                                                                             |
|----------------------------|--------|---------|-------------|---------------------------------------------------------------------------------------------------------|
| `MerchantId`               | Guid   | 36      | Sim         | Store identifier in Cielo.                                                                              |
| `MerchantKey`              | Texto  | 40      | Sim         | Public Key for Double Authentication in Cielo.                                                          |
| `RequestId`                | Guid   | 36      | Não         | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                |
| `MerchantOrderId`          | Texto  | 50      | Sim         | Order ID number.                                                                                        |
| `Customer.Name`            | Texto  | 255     | Não         | Buyer's name.                                                                                           |
| `Customer.Status`          | Texto  | 255     | Não         | Buyer registration status in store (NEW / EXISTING).                                                    |
| `Payment.Type`             | Texto  | 100     | Sim         | Type of the Payment Method..                                                                            |
| `Payment.Amount`           | Número | 15      | Sim         | Order Amount (to be sent in cents).                                                                     |
| `Payment.Installments`     | Número | 2       | Sim         | Number of installments.                                                                                 |
| `CreditCard.CardNumber.`   | Texto  | 19      | Sim         | Buyer's Card Number.                                                                                    |
| `CreditCard.SecurityCode`  | Texto  | 4       | Não         | Security code printed on back of card - See Annex.                                                      |
| `CreditCard.Brand`         |Texto   |10       |Sim          | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).           |
| `Wallet.Type`              | Texto  | 255     | Sim         | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `SamsungPay`                                 |
| `Wallet.Walletkey`         | Texto  | 255     | Sim         | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information      |
| `Wallet.AdditionalData.EphemeralPublicKey`| Texto  | 255    | Sim  | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`             |
| `Wallet.AdditionalData.capturecode`       | Texto  | 255    | Sim  | Code informed by MasterPass to the merchant                                                      |                                                      

#### Response

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

| Property            | Description                                                                                                                    | Type  | Size    | Format                               |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                        | Text  | 6       | Alphanumeric text                   |
| `Tid`               | Transaction Id on the acquirer.                                                                                                | Text  | 20      | Alphanumeric text                   |
| `AuthorizationCode` | Authorization code.                                                                                                            | Text  | 6       | Alphanumeric text                   |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters   | Text  | 13      | Alphanumeric text                   |
| `PaymentId`         | Order Identifier Field.                                                                                                        | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                          | Text  | 2       | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                            | Byte  | ---     | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                      | Text  | 32      | Alphanumeric text                   |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                   | Text  | 512     | Alphanumeric text                   |
| `Type`              | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                      | Text  | 255     | Alphanumeric text                   |
| `AdditionalData.capturecode` | Code informed by `MasterPass` to the merchant                                                                   | Text  | 255     | 3                                   | 
| `Walletkey`         | Cryptographic key  that identifies stores in the Wallets - See the WalletKey table for more information                            | Text  | 255     | See `WalletKey` table               |       
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                         | Text | 255      | See `EphemeralPublicKey` table      | 

### Sending the card

#### Request

``` json
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

| Property                   | Type   | Size    | Required    | Description                                                                                             |
|----------------------------|--------|---------|-------------|---------------------------------------------------------------------------------------------------------|
| `MerchantId`               | Guid   | 36      | Yes         | Store identifier in Cielo.                                                                              |
| `MerchantKey`              | Text   | 40      | Yes         | Public Key for Double Authentication in Cielo.                                                          |
| `RequestId`                | Guid   | 36      | No          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                |
| `MerchantOrderId`          | Text   | 50      | Yes         | Order ID number.                                                                                        |
| `Customer.Name`            | Text   | 255     | No          | Buyer's name.                                                                                           |
| `Customer.Status`          | Text   | 255     | No          | Buyer registration status in store (NEW / EXISTING).                                                    |
| `Payment.Type`             | Text   | 100     | Yes         | Type of the Payment Method..                                                                            |
| `Payment.Amount`           | Number | 15      | Yes         | Order Amount (to be sent in cents).                                                                     |
| `Payment.Installments`     | Number | 2       | Yes         | Number of installments.                                                                                 |
| `CreditCard.CardNumber.`   | Text   | 19      | Yes         | Buyer's Card Number.                                                                                    |
| `CreditCard.SecurityCode`  | Text   | 4       | No          | Security code printed on back of card - See Annex.                                                      |
| `CreditCard.Brand`         | Text   |10       | Yes         | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).       |
| `Wallet.Type`              | Text   | 255     | Yes         | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                    |
| `Wallet.Walletkey`         | Text   | 255     | Yes         | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information      |
| `Wallet.ECI`               | Text   | 3       | Yes         | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction.|
| `Wallet.CAVV`              | Text   | 255     | Yes         | Validation field returned by Wallet and used as the authorization basis                           | 

#### Response

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

| Property            | Description                                                                                                                    | Type  | Size    | Format                               |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                        | Text | 6       | Alphanumeric text                     |
| `Tid`               | Transaction Id on the acquirer.                                                                                                | Text | 20      | Alphanumeric text                     |
| `AuthorizationCode` | Authorization code.                                                                                                            | Text | 6       | Alphanumeric text                     |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters   | Text | 13      | Alphanumeric text                     |
| `PaymentId`         | Order Identifier Field.                                                                                                        | Guid | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                          | Text | 2       | Exemplos: 7                           |
| `Status`            | Transaction Status.                                                                                                            | Byte | ---     | 2                                     |
| `ReturnCode`        | Return code of Acquiring.                                                                                                      | Text | 32      | Alphanumeric text                     |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                   | Text | 512     | Alphanumeric text                     |
| `Type`              | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                           | Text | 255     | Alphanumeric text                     |
| `Walletkey`         | Cryptographic key  that identifies stores in the Wallets - See the WalletKey table for more information                        | Text | 255     | Ver tabela `WalletKey`                |       
| `AdditionalData.capturecode`| Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                   | Text | 255     | 3                                     | 

## Apple Pay

### Prerequisites

To use Apple Pay in the **Decryption** format, it is necessary that the store is already registered with Apple and has a `MerchantIdentifier`. The **Decryption** integration requires the merchant to manually upload a **CSR certificate in the PEM format** provided by Cielo. Contact the Cielo customer service team to obtain the Certificate.

#### MerchantIdentifier

To get the `MerchantIdentifier` perform the following steps:

1. Log in [**Apple Developer**](https://developer.apple.com/)
2. Select [**Certificates, IDs & Profiles**](https://developer.apple.com/library/content/ApplePay_Guide/Configuration.html)
3. Inside the area "Identifiers" click on "Merchant IDs"
4. Click on **+** in the right corner, below "Registering a Merchant ID"
5. Set the MerchantID description and identifier. Example: "merchant.com.CIELO.merchantAccount"
6. Click on "continue" and verify that the information entered is correct.
7. End the process.

> The `MerchantIdentifier` must be sent to Cielo for the creation of a CSR Certificate in PEM format.

#### CSR Certificate

After sending the `MerchantIdentifier` to the Cielo service team, the store will receive a extension certificate of `PEM` and should follow the following steps:

1. Log in [**Apple Developer**](https://developer.apple.com/)
2. Select [**Certificates, IDs & Profiles**](https://developer.apple.com/library/content/ApplePay_Guide/Configuration.html)
3. Perform the certificate upload 
7. End the process.

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

### Decryption

In the model below, we demonstrate how to use the Apple Pay Cielo integration by sending the WalletKey + EphemeralPublicKey returned by Apple via Payload

#### Request

Request Sample *Apple Pay*

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

| Property                   | Type   | Size    | Required    | Description                                                                                             |
|----------------------------|--------|---------|-------------|---------------------------------------------------------------------------------------------------------|
| `MerchantId`               | Guid   | 36      | Yes         | Store identifier in Cielo.                                                                              |
| `MerchantKey`              | Text   | 40      | Yes         | Public Key for Double Authentication in Cielo.                                                          |
| `RequestId`                | Guid   | 36      | No          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                |
| `MerchantOrderId`          | Text   | 50      | Yes         | Order ID number.                                                                                        |
| `Customer.Name`            | Text   | 255     | No          | Buyer's name.                                                                                           |
| `Customer.Status`          | Text   | 255     | No          | Buyer registration status in store (NEW / EXISTING).                                                    |
| `Payment.Type`             | Text   | 100     | Yes         | Type of the Payment Method..                                                                            |
| `Payment.Amount`           | Number | 15      | Yes         | Order Amount (to be sent in cents).                                                                     |
| `Payment.Installments`     | Number | 2       | Yes         | Number of installments.                                                                                 |
| `CreditCard.CardNumber.`   | Text   | 19      | Yes         | Buyer's Card Number.                                                                                    |
| `CreditCard.SecurityCode`  | Text   | 4       | No          | Security code printed on back of card - See Annex.                                                      |
| `CreditCard.Brand`         |Text    |10       |Yes          | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).       |
| `Wallet.Type`              | Text   | 255     | Yes         | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                    |
| `Wallet.Walletkey`         | Text   | 255     | Yes         | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information      |
| `Wallet.AdditionalData.EphemeralPublicKey`| Text  | 255    | Yes  | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`              |
| `Wallet.AdditionalData.capturecode`       | Text  | 255    | Yes  |  Code informed by MasterPass to the merchant                                                      | 

#### Response

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

| Property            | Description                                                                                                                    | Type  | Size    | Required                             |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                        | Text  | 6       | Alphanumeric text                     |
| `Tid`               | Transaction Id on the acquirer.                                                                                                | Text  | 20      | Alphanumeric text                     |
| `AuthorizationCode` | Authorization code.                                                                                                            | Text  | 6       | Alphanumeric text                     |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters   | Text  | 13      | Alphanumeric text                     |
| `PaymentId`         | Order Identifier Field.                                                                                                        | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                          | Text  | 2       | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                            | Byte  | ---     | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                      | Text  | 32      | Alphanumeric text                     |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                   | Text  | 512     | Alphanumeric text                     |
| `Type`              | Indicates the wallet type: `ApplePay` / `VisaCheckout`/ `Masterpass`                                                           | Text  | 255     | Alphanumeric text                     |
| `Walletkey`         | Encryption key that identifies stores in Wallets - See WalletKey table for more information                                    | Text  | 255     | See `WalletKey` table                |       
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                           | Text  | 255     | See `EphemeralPublicKey` table       |  
| `AdditionalData.capturecode`        | ode informed by MasterPass to the merchant                                                                     | Text  | 255     | 3                                    | 

### Sending the card

In the model below, we demonstrate how Apple Pay can be used with sending the card open, without the need for WalletKey.

#### Request

In this model, the merchant only informs that the transaction is from an Apple Pay Wallet and sends the ECI and CAVV data provided by APPLE

* **CAVV** - can be extracted from the `onlinePaymentCryptogram` field returned by Apple in payload
* **ECI** - can be extracted from the `eciIndicator` field returned by Apple in payload

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
      "CardNumber":"4532********6521",
      "Holder":"Exemplo Wallet Padrão",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Master"
    },
    "Currency": "BRL",
    "Wallet": {
      "Type": "ApplePay",
      "Eci":"7",
      "Cavv":"AM1mbqehL24XAAa0J04CAoABFA=="
    }
  }
}
```

| Property                   | Type   | Size    | Required    | Description                                                                                             |
|----------------------------|--------|---------|-------------|---------------------------------------------------------------------------------------------------------|
| `MerchantId`               | Guid   | 36      | Yes         | Store identifier in Cielo.                                                                              |
| `MerchantKey`              | Text   | 40      | Yes         | Public Key for Double Authentication in Cielo.                                                          |
| `RequestId`                | Guid   | 36      | No          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                |
| `MerchantOrderId`          | Text   | 50      | Yes         | Order ID number.                                                                                        |
| `Customer.Name`            | Text   | 255     | No          | Buyer's name.                                                                                           |
| `Customer.Status`          | Text   | 255     | No          | Buyer registration status in store (NEW / EXISTING).                                                    |
| `Payment.Type`             | Text   | 100     | Yes         | Type of the Payment Method.                                                                             |
| `Payment.Amount`           | Number | 15      | Yes         | Order Amount (to be sent in cents).                                                                     |
| `Payment.Installments`     | Number | 2       | Yes         | Number of installments.                                                                                 |
| `CreditCard.CardNumber.`   | Text   | 19      | Yes         | Buyer's Card Number.                                                                                    |
| `CreditCard.SecurityCode`  | Text   | 4       | No          | Security code printed on back of card - See Annex.                                                      |
| `CreditCard.Brand`         | Text    |10      | Yes         | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).       |
| `Wallet.Type`              | Text   | 255     | Yes         | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                    |
| `Wallet.Walletkey`         | Text   | 255     | Yes         | Cryptographic key that identifies stores in Wallets - See the WalletKey table for more information      |
| `Wallet.ECI`               | Text   | 3       | Yes         | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction.|
| `Wallet.CAVV`              | Text   | 255     | Yes         | Validation field returned by Wallet and used as the authorization basis                           | 

#### Response

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

| Property                            | Description                                                                                                                                          | Type  | Size    | Format                               |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                                              | Text  | 6       | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                                                      | Text  | 20      | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                                                  | Text  | 6       | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters                         | Text  | 13      | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                                              | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                                                | Text  | 2       | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                                                  | Byte  | ---     | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                                            | Text  | 32      | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                                         | Text  | 512     | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type: `ApplePay` / `VisaCheckout`/ `Masterpass`                                                                                 | Text  | 255     | Alphanumeric text                    |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                                                 | Text  | 255     | See `EphemeralPublicKey` table       |
| `AdditionalData.capturecode`        | ode informed by MasterPass to the merchant                                                                                                           | Text  | 255     | 3                                    |
| `ECI`                               | The Electronic Commerce Indicator (ECI) indicates the security of a transaction. Must be taken into account by the merchant to decide on the capture | Text  | 3       | 2                                    |
| `CAVV`                              | Validation field returned by Wallet and used as the authorization basis                                                                              | Text  | 255     | --                                   |

## VisaCheckout

### Decryption

In the model presented below, we demonstrate how to use the integration VisaCheckout Cielo by sending the WalletKey returned by Visa via Payload

> `Walletkey` is the `CallID` parameter returned by VisaCheckout

#### Request

Default request sample *VisaCheckout*

> It is necessary that the store already has a VisaCheckout integration and registration, otherwise it will not be possible to integrate with the API

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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
         "SecurityCode":"123"
      },
      "Wallet":{  
         "Type":"VisaCheckout",
         "WalletKey":"1140814777695873901"
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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.ReturnUrl`|Text|1024|---|Required for debit card|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`Wallet.Type`|Text|255|Yes|indicates the wallet type: "VisaCheckout" or "Masterpass"|
|`Wallet.Walletkey`|Text|255|---|Cryptographic key sent by VisaCheckout. Required if TYPE =  "Visa Checkout"|

#### Response

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|
|`Type`|indicates the wallet type: "VisaCheckout" or "Masterpass"|Text|255|Yes|
|`Walletkey`|Cryptographic key sent by VisaCheckout|Text|255|---|

### Sending the card

In the model below, we demonstrate how VisaCheckout can be used with the sending of the open card without a WalletKey.

#### Request

In this model, the merchant only informs that the transaction is from Wallet VisaCheckout and sends the ECI and CAVV data provided by Visa

* **ECI** - returned by Visa on the payload as `DSC_ECI`

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.ReturnUrl`|Text|1024|---|Required for debit card|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`Wallet.Type`|Text|255|Yes|indicates the wallet type: "VisaCheckout" or "Masterpass"|

#### Response

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|
|`Type`|indicates the wallet type: "VisaCheckout" or "Masterpass"|Text|255|Yes|

## MasterPass

### Sending the card

> Wallet MasterPass has integration only in the format `Sending card`.

To use the wallet [**Masterpass**](https://developer.mastercard.com/product/masterpass) it is necessary that the store is already registered with Mastercard, and integrated the search of card data of the platform.

#### Request

Request Sample *Masterpass*

> It is necessary that the store already has a Masterpass integration and registration, otherwise it will not be possible to integrate with the API

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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

|Property|Type|Size|Required|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Store identifier in Cielo.|
|`MerchantKey`|Text|40|Yes|Public Key for Double Authentication in Cielo.|
|`RequestId`|Guid|36|No|Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.|
|`MerchantOrderId`|Text|50|Yes|Order ID number.|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`CreditCard.CardNumber.`|Text|19|Yes|Buyer's Card Number|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`Wallet.Type`|Text|255|Yes|indicates the wallet type: "VisaCheckout" or "Masterpass"|
|`Wallet.AdditionalData`|---|---|---|Instance for extra data reported by MasterPass. Required only if TYPE = "MasterPass"|
|`Wallet.capturecode`|Text|255|Yes|Code reported by MasterPass to the merchant|

#### Response

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

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric text|
|`Tid`|Transaction Id on the acquirer.|Text|20|Alphanumeric text|
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric text|
|`Type`|indicates the wallet type: "VisaCheckout" or "Masterpass"|Text|255|Yes|
|`Capturecode`|Code reported by MasterPass to the merchant|Text|255|Yes|

## Samsung Pay

### Prerequisites

To use Samsung **Decryption** format, it is necessary that the store is already registered with [**Samsung**](https://pay.samsung.com/developers) platform. The **Decryption** integration requires the merchant to manually upload a CSR certificate in the PEM format provided by Cielo. Contact the Cielo customer service team to obtain the Certificate.

#### CSR Certificate

After registering with SamsungPay, the store should request a certificate of extension `PEM` to the  team of Cielo products. With the certificate, you should follow the following steps:

1. Log in [**Samsung**](https://pay.samsung.com/developers)
2. Select [**My Projects**](https://pay.samsung.com/developers/projects/prdnsvc) para criar serviço
3. Perform the certificate upload
7. End the process.

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

### Decryption

In the model below, we demonstrate how to use the SamsungPay Cielo integration by sending the WalletKey + EphemeralPublicKey returned by Samsung via Payload

#### Request

Request Sample *SamsungPay*

> It is necessary that the store already has a registration and a SamsungPay integration, otherwise it will not be possible to integrate with the API

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
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
     "Provider":"Cielo",
     "Installments":1,
     "Currency":"BRL",
     "Wallet":{
       "Type":"SamsungPay",
       "WalletKey":"eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-LldMArSoG59x6i0BbI7jttqxyAdcriSy8q_77VAp3854P9kekjj54RKLrP6APDIr46DI97kjG9E99ONXImnEyamHj95ZH_AW8lvkfa09KAr4537RM8GEXyZoys2vfIW8zqjjicZ8EKIpAixNlmrFJu6-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ"
    }
  }
}

```

| Property                   | Type   | Size    | Required    | Description                                                                                             |
|----------------------------|--------|---------|-------------|---------------------------------------------------------------------------------------------------------|
| `MerchantId`               | Guid   | 36      | Yes         | Store identifier in Cielo.                                                                              |
| `MerchantKey`              | Text   | 40      | Yes         | Public Key for Double Authentication in Cielo.                                                          |
| `RequestId`                | Guid   | 36      | No          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                |
| `MerchantOrderId`          | Text   | 50      | Yes         | Order ID number.                                                                                        |
| `Customer.Name`            | Text   | 255     | No          | Buyer's name.                                                                                           |
| `Customer.Status`          | Text   | 255     | No          | Buyer registration status in store (NEW / EXISTING).                                                    |
| `Payment.Type`             | Text   | 100     | Yes         | Type of the Payment Method.                                                                             |
| `Payment.Amount`           | Número | 15      | Yes         | Order Amount (to be sent in cents).                                                                     |
| `Payment.Installments`     | Número | 2       | Yes         | Number of installments.                                                                                 |
| `CreditCard.CardNumber.`   | Text   | 19      | Yes         | Buyer's Card Number.                                                                                    |
| `CreditCard.SecurityCode`  | Text   | 4       | No          | Security code printed on back of card - See Annex.                                                      |
| `CreditCard.Brand`         | Text   | 10      | Yes         | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).       |
| `Wallet.Type`              | Text   | 255     | Yes         | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                    |
| `Wallet.Walletkey`         | Text   | 255     | Yes         | Cryptographic key  that identifies stores in the Wallets - See the WalletKey table for more information       |
| `Wallet.AdditionalData.EphemeralPublicKey`| Text  | 255    | Yes  | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`              |
| `Wallet.AdditionalData.capturecode`       | Text  | 255    | Yes  | Code informed by `MasterPass` to the merchant                                                     | 

#### Response

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

| Property            | Description                                                                                                                    | Type  | Size    | Format                               |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `ProofOfSale`       | Authorization number, identical to NSU.                                                                                        | Text  | 6       | Alphanumeric text                    |
| `Tid`               | Transaction Id on the acquirer.                                                                                                | Text  | 20      | Alphanumeric text                    |
| `AuthorizationCode` | Authorization code.                                                                                                            | Text  | 6       | Alphanumeric text                    |
| `SoftDescriptor`    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters   | Text  | 13      | Alphanumeric text                    |
| `PaymentId`         | Order Identifier Field.                                                                                                        | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                          | Text  | 2       | Examples: 7                          |
| `Status`            | Transaction Status.                                                                                                            | Byte  | ---     | 2                                    |
| `ReturnCode`        | Return code of Acquiring.                                                                                                      | Text  | 32      | Alphanumeric text                    |
| `ReturnMessage`     | Return message of Acquiring.                                                                                                   | Text  | 512     | Alphanumeric text                    |
| `Type`              | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                           | Text  | 255     | Alphanumeric text                    |
| `Walletkey`         |  Cryptographic key  that identifies stores in the Wallets - See the WalletKey table for more information                       | Text  | 255     | See `WalletKey` table                |       
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                           | Text  | 255     | See `EphemeralPublicKey` table      |  
| `AdditionalData.capturecode`        | Code informed by `MasterPass` to the merchant                                                                  | Text  | 255     | 3                                    | 

### Sending the card

In the model below, we demonstrate how SamsungPay can be used with sending the card open, without the need for WalletKey.

#### Request

In this model, the merchant only informs that the transaction is from an SamsungPay and sends the ECI and CAVV data provided by Samsung

* **CAVV** - can be extracted from the `Cryptogram` field returned by Apple Samsung in payload
* **ECI** - returned by Samsung Pay in the payload field `eci_indicator` 

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
      "CardNumber":"4532********6521",
      "Holder":"Exemplo Wallet Padrão",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Master"
    },
    "Currency": "BRL",
    "Wallet": {
      "Type": "SamsungPay",
      "Eci":"7",
      "Cavv":"AM1mbqehL24XAAa0J04CAoABFA=="
    }
  }
}
```

| Property                   | Type   | Size    | Required    | Description                                                                                             |
|----------------------------|--------|---------|-------------|---------------------------------------------------------------------------------------------------------|
| `MerchantId`               | Guid   | 36      | Yes         | Store identifier in Cielo.                                                                              |
| `MerchantKey`              | Text   | 40      | Yes         | Public Key for Double Authentication in Cielo.                                                          |
| `RequestId`                | Guid   | 36      | No          | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT.                |
| `MerchantOrderId`          | Text   | 50      | Yes         | Order ID number.                                                                                        |
| `Customer.Name`            | Text   | 255     | No          | Buyer's name.                                                                                           |
| `Customer.Status`          | Text   | 255     | No          | Buyer registration status in store (NEW / EXISTING).                                                    |
| `Payment.Type`             | Text   | 100     | Yes         | Type of the Payment Method.                                                                             |
| `Payment.Amount`           | Number | 15      | Yes         | Order Amount (to be sent in cents).                                                                     |
| `Payment.Installments`     | Number | 2       | Yes         | Number of installments.                                                                                 |
| `CreditCard.CardNumber.`   | Text   | 19      | Yes         | Buyer's Card Number.                                                                                    |
| `CreditCard.SecurityCode`  | Text   | 4       | No          | Security code printed on back of card - See Annex.                                                      |
| `CreditCard.Brand`         | Text   |10       |Yes          | Card brand (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).       |
| `Wallet.Type`              | Text   | 255     | Yes         | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                    |
| `Wallet.Walletkey`         | Text   | 255     | Yes         | Cryptographic key  that identifies stores in the Wallets - See the WalletKey table for more information |
| `Wallet.ECI`               | Text   | 3       | Yes         | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction. |
| `Wallet.CAVV`              | Text   | 255     | Yes         | Validation field returned by Wallet and used as the authorization basis                                 | 

#### Response

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

| Property                            | Description                                                                                                                                  | Type  | Size    | Format                               |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `ProofOfSale`                       | Authorization number, identical to NSU.                                                                                                      | Text | 6       | Alphanumeric text                    |
| `Tid`                               | Transaction Id on the acquirer.                                                                                                              | Text | 20      | Alphanumeric text                    |
| `AuthorizationCode`                 | Authorization code.                                                                                                                          | Text | 6       | Alphanumeric text                    |
| `SoftDescriptor`                    | Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters                 | Text | 13      | Alphanumeric text                    |
| `PaymentId`                         | Order Identifier Field.                                                                                                                      | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                               | Eletronic Commerce Indicator. Represents how secure a transaction is.                                                                        | Text | 2       | Examples: 7                          |
| `Status`                            | Transaction Status.                                                                                                                          | Byte  | ---     | 2                                    |
| `ReturnCode`                        | Return code of Acquiring.                                                                                                                    | Text | 32      | Alphanumeric text                    |
| `ReturnMessage`                     | Return message of Acquiring.                                                                                                                 | Text | 512     | Alphanumeric text                    |
| `Type`                              | Indicates the wallet type:  `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                                         | Text | 255     | Alphanumeric text                    |
| `AdditionalData.EphemeralPublicKey` | Key returned by Wallet for decryption. Must be submitted in Integrations: `ApplePay`                                                         | Text | 255     | See `EphemeralPublicKey` table       |
| `AdditionalData.capturecode`        | Code informed by `MasterPass` to the merchant                                                                                                | Text | 255     | 3                                    |
| `ECI`                               | The ECI (Electronic Commerce Indicator) represents how secure a transaction is. This amount should be taken into consideration by the merchant to decide on the capture of the transaction. | Text | 3       | 2                                    |
| `CAVV`                              | Validation field returned by Wallet and used as the authorization basis                                                                      | Text | 255     | --                                   |

# API codes

## About codes

API Cielo e-commerce has 4 types of returned codes that represent different moments of the transaction.

Below we explain them in the order in which they can occur:

|Code|Description|
|---|---|
|**HTTP Status Code**|They are standard HTTP codes. It report if the information sent to the API is **actually being successful in reaching our ENDPOINTs**. If values other than 200 or 201 are appearing, there is some impediment with the comunication with the API<br> *Returned at time of API request*|
|**API Errors**|These codes are responses to **content validation of sent data**. If they are appearing, our API calls have been identified and are being validated. If this code is appearing, the request contains errors (e.g. size/conditions/registration errors) that prevent the creation of the transaction<br>*Returned at time of API request*|
|**Status**|After the transaction is created, these codes will be returned, informing the transaction status at that moment (e.g. `Authorized` >` Captured` > `Canceled`)<br>*Returned in the `Status` field *|
|**Sales Return**|Formed by a **Return code** and a **message**, these codes indicate the **reason** of a given `Status` within a transaction. They indicate, for example, whether a transaction with declined `status` was not authorized because of a negative balance at the issuing bank. <br>*Returned in the `ReturnCode` and` ReturnMessage` fields*<br> *They occur only in Credit and Debit cards*|

**NOTE**: In the old **Webservice 1.5 Cielo**, the `ReturnCode` was considered as *Transaction Status*. In the **API CIELO ECOMMERCE**, the `Status` field has its own codes, thus, the **field to be considered as the basis for identifying the status of a transaction**

## HTTP Status Code

|HTTP Status Code|Description|
|---|---|
|200|OK (Capture/Void/Get) |
|201|OK (Authorization) |
|400|Bad Request|
|404|Resource Not Found|
|500|Internal Server Error|

## Return codes ABECS

The Brazilian Association of Credit Card and Services Companies (ABECS) establishes as of July 15, 2020, the standardization of the return code of refused sales authorizations for both the physical payment and e-commerce solutions of the Brazilian market .

This normative measure seeks to bring benefits to the entire payment market, providing greater transparency in the understanding of the reason for the refusal of transactions, in addition to enabling greater assertiveness in the adoption of sales retentive strategies.

Cielo informs its customers that it's prepared to process transactions following this new market standard, below is the table of codes standardized by ABECS.

<aside class="notice">The AMEX flag codes have undergone a to/from in order to maintain two digits. We reinforce that this measure does not change the reasons for return.</aside>

| Message                                                                     | Code Type    | ELO                        | VISA                       | MASTERCARD/HIPER           | AMEX                       | AMEX - From/To Cielo       | Message POS/Ecommerce                                    |
|-----------------------------------------------------------------------------|--------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------------------------------------|
| GENERIC                                                                     | REVERSIBLE   | 05                         | 05                         | 05                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                 |   
| INSUFFICIENT BALANCE/LIMIT                                                  | REVERSIBLE   | 51                         | 51                         | 51                         | 116                        | A5                         | NOT ALLOWED                                              |
| INSUFFICIENT BALANCE/LIMIT                                                  | REVERSIBLE   | 51                         | 51                         | 51                         | 121                        | A5                         | NOT ALLOWED                                              |
| INVALID PASSWORD                                                            | REVERSIBLE   | 55                         | 55 ou 86                   | 55                         | 117                        | A6                         | INVALID PASSWORD                                         |
| TRANSACTION NOT ALLOWED FOR CARD                                            | REVERSIBLE | 57                         | 57                         | 57                         | 200                        | FD                         | TRANSACTION NOT ALLOWED FOR CARD      |
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
| STOLEN CARD                                                                 | IRREVERSIBLE | 43                         | 43                         | 43                          | 200                       | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
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

| Response Code   | Definitio                                     | Meaning                                                                     | Action                                                            | Allows Retry |
|-----------------|-----------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------|
|00               |Successfully authorized transaction.|Successfully authorized transaction.|Successfully authorized transaction.|No|
|02|Unauthorized transaction. Referred transaction.|Unauthorized transaction. Referred (suspected fraud) by the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|09|Transaction partially canceled successfully.| Transaction partially canceled successfully.| Transaction partially canceled successfully.| No |
|11|Successfully authorized transaction for card issued abroad|Successfully authorized transaction.|Successfully authorized transaction.|No|
|21|Cancellation not done. Non-localized transaction.|Cancellation was not processed. If the error persists, contact Cielo.|Cancellation was not processed. Try again later. If the error persists, contact the virtual store.|No|
|22|Invalid installment. Invalid number of installments.|Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.|Could not process transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|24|Invalid number of installments.|Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.|Could not process transaction. Invalid number of installments. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|60|Unauthorized transaction.|Unauthorized transaction. Try again. If the error persists the carrier should contact the issuing bank.|Could not process transaction. Try again later. If the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|67|Unauthorized transaction. Card locked for shopping today.|Unauthorized transaction. Card locked for shopping today. Blocking may be due to excessive invalid attempts. Card will be automatically unlocked at midnight.|Unauthorized transaction. Card locked temporarily. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|70|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|72|Cancellation not done. Not enough available balance for cancellation.|Cancellation not done. Not enough available balance for cancellation. If the error persists, contact Cielo.|Cancellation not done. Try again later. If the error persists, contact the virtual store..|No|
| 79 | Transaction not allowed / Mastercard | Unauthorized transaction. Unable to process transaction due to error related to cardholder. Ask the bearer to contact the issuing bank. | Contact your bank | No |
|80|Unauthorized transaction. Divergence on transaction/payment date.|Unauthorized transaction. Invalid transaction date or first payment date.|Unauthorized transaction. Redo the transaction confirming data.|No|
| 82 | Transaction not allowed / Mastercard | Transaction not authorized due to issuer rules. Instruct the cardholder to contact the issuing bank. | Contact your bank | No|
| 83 | Transaction not allowed / Mastercard | Unauthorized transaction. Suspicion of fraud by the issuing bank.| Contact your bank | No |
|85|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|89|Transaction error.|Unauthorized transaction. Transaction error. The carrier must try again and if the error persists, contact the issuing bank.|Unauthorized transaction. Transaction error. Try again and if the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|90|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|97|Value not allowed for this transaction.|Unauthorized transaction. Value not allowed for this transaction.|Unauthorized transaction. Value not allowed for this transaction.|No|
|98|System/communication unavailable.|There was no request response within the set time.|The transaction may have been processed. To confirm, check the transaction by the store order number and evaluate whether it was actually processed.|Retry only after reviewing the original transaction by the order number and confirm that it was not processed.|
|475|Cancellation Timeout|The application did't respond within the expected time.|Try again after a few seconds. If you persist, contact Support.|No|
|999|System/communication unavailable.|Unauthorized transaction. Issuer system without communication. Try later. Can be error in SITEF, please check!|Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.|From the following day, only 4 times in 16 days.|
|AA|Time Exceeded|Time exceeded in communication with the issuing bank. Orient the carrier to try again, if the error persists it will be necessary for the carrier to contact their issuing bank.|Time exceeded in their communication with the issuing bank, try again later. If the error persists, contact your bank.|Only 4 times in 16 days.|
|AF|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|AG|Transaction not allowed. Operation failure.|Transaction not allowed. There was an error in processing. Ask the cardholder to re-enter the card data, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo..|Transaction not allowed. Enter the card details again. If the error persists, contact the virtual store|No|
|AH|Transaction not allowed. Credit card being used as debit. Use the credit function.|Transaction not allowed. Credit card being used as debit. Ask the carrier to select the Credit Card payment option.|Unauthorized transaction. Try again by selecting the credit card payment option.|No|
|AI|Unauthorized transaction. Authentication was not performed.|Unauthorized transaction. Authentication was not performed. The carrier did not complete the authentication. Ask the carrier to review the data and try again. If the error persists, contact Cielo informing the BIN (6 first digits of the card)|Unauthorized transaction. Authentication failed. Try again and correctly enter the requested data. If the error persists, contact the merchant.|No|
|AJ|Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again by selecting the Private Label option.|Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Ask the carrier to try again by selecting the Private Label option. If not available the Private Label option check in Cielo if your establishment allows this operation.|Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again and select the Private Label option. In case of a new error, contact the virtual store.|No|
|AV|Unauthorized transaction. Invalid data|Validation of transaction data failed. Guide the carrier to review the data and try again.|Data validation failed. Review the reported data and try again.|Only 4 times in 16 days.|
|BD|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|BL|Unauthorized transaction. Daily limit exceeded.|Unauthorized transaction. Daily limit exceeded. Ask the carrier to contact their issuing bank.|Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|BM|Unauthorized transaction. Invalid card|Unauthorized transaction. Invalid card. It may be card locking at the issuing bank or incorrect data. Try to use the Lhum Algorithm (Mod 10) to avoid unauthorized transactions for this reason.|Unauthorized transaction. Invalid card. Redo the transaction confirming the reported data.|No|
|BN|Unauthorized transaction. Card or account locked.|Unauthorized transaction. Carrier's card or account is locked. Ask the carrier to contact their issuing bank.|Unauthorized transaction. Carrier's card or account is locked. Contact your issuing bank.|No|
|BO|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if the error persists, contact the issuing bank.|Transaction not allowed. There was a processing error. Re-enter card data, if error persists, contact issuing bank.|Only 4 times in 16 days.|
|BP|Unauthorized transaction. Non-existent checking account.|Unauthorized transaction. The transaction could not be processed due to an error related to the carrier's card or account. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Could not process the transaction due to an error related to the carrier's card or account. Contact the issuing bank.|No|
|BP176|Transaction not allowed.|Partner should check if the onboarding process has been completed successfully.|Partner should check if the onboarding process has been completed successfully.|---|
|C1|Transaction not allowed. Card can't process debit transactions.|Change the payment method or card used.|Change the payment method or card used.|No|
|C2|Transaction not allowed.|Incorrect data. Please review the data on the payment screen.|Incorrect data. Please review the data on the payment screen.|No|
|C3|Transaction not allowed.|Invalid period for this type of transaction.|Invalid period for this type of transaction.|No|
|CF|Unauthorized transaction.C79:J79 Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|CG|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation faileds. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DF|Transaction not allowed. Invalid card or card failure.|Transaction not allowed. Invalid card or card failure. Ask the carrier to re-enter the card data, if the error persists, contact the bank|Transaction not allowed. Invalid card or card failure. Re-enter card data, if error persists, contact bank|Only 4 times in 16 days.|
|DM|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|DQ|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DS|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|EB|Number of installments greater than Allowed.|Unauthorized transaction. Contact Cielo and check if the registration has released installments.|Unauthorized transaction. Contact Cielo and check if the registration has been released in installments.|Yes|
|EE|Transaction not allowed. Installment value below the minimum allowed.|Transaction not allowed. Installment value below the minimum allowed. It is not permitted installments lower than R$5,00. It is necessary to revise the calculation for installments.|Transaction not allowed. Installment value is below the minimum allowed. Contact the virtual store.|No|
|EK|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|FC|Unauthorized transaction. Call the Issuer|Unauthorized transaction. Guide the carrier to contact the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|FE|Unauthorized transaction. Divergence on transaction/payment date.|Unauthorized transaction. Invalid transaction date or first payment date.|Unauthorized transaction. Redo the transaction confirming data.|No|
|FF|Cancellation OK|Cancellation transaction authorized successfully. WARNING: This return is for cases of cancellations and not for cases of authorizations.|Transação de cancelamento autorizada com sucesso|No|
|FG|Unauthorized transaction. Call AmEx 08007285090.|Unauthorized transaction. Guide the carrier to contact AmEx Call Center.|Unauthorized transaction. Contact the AmEx Call Center at the phone number 08007285090|No|
|GA|Wait for contact|Unauthorized transaction. Referred by Lynx Online in a preventive way.|Unauthorized transaction. Contact the merchant.|No|
|GD|Transaction not allowed.|Transaction can not be processed in the establishment. Contact Cielo for more details.|Transaction not allowed. Contact the virtual store|No|
|HJ|Transaction not allowed. Invalid operation code.|Transaction not allowed. Invalid Coban operation code.|Transaction not allowed. Invalid Coban operation code. Contact the merchant.|No|
|IA|Transaction not allowed. Invalid operation indicator.|Transaction not allowed. Invalid Coban operation indicator.|Transaction not allowed. Invalid Coban operation indicator. Contact the merchant.|No|
|KA|Transaction not allowed. Data validation failed.|Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.|Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.|No|
|KB|Transaction not allowed. Incurred option selected.|Transaction not allowed. Wrong option selected. Ask the carrier to review the data and try again. If the error persists, the communication between virtual store and Cielo must be checked.|Transaction not allowed. Wrong option selected. Try again. If the error persists, contact the Virtual Store.|No|
|KE|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the carrier.|Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the virtual store.|No|
|N7|Unauthorized transaction. Invalid security code.|Unauthorized transaction. Invalid security code. Guide the carrier to correct the data and try again.|Unauthorized transaction. Review the data and enter again.|No|
|U3|Transaction not allowed. Data validation failed.|Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.|Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.|No|
|BR|Unauthorized transaction. Account closed|The bearer's account is closed. Ask the bearer to contact your issuing bank.|The bearer's account is closed. Ask the bearer to contact your issuing bank.|No|
|46|Unauthorized transaction. Account closed|The bearer's account is closed. Ask the bearer to contact your issuing bank.|The bearer's account is closed. Ask the bearer to contact your issuing bank.|No|
|6P|Unauthorized transaction. Invalid data|Transaction data validation failed. Instruct the holder to review the data and try again.|Data validation failed. Review the data entered and try again.|Only 4 times in 16 days.|

## Status transactional

|Code|Status|Means of payment|Description|
|---|---|---|---|
|0|**NotFinished**|ALL|Waiting for status update|
|1|**Authorized**|ALL|Payment apt to be captured or defined as paid|
|2|**PaymentConfirmed**|ALL|Confirmed and finalized payment|
|3|**Declined**|CC + CD + TF|Payment declined by Authorizer|
|10|**Voided**|ALL|Canceled payment|
|11|**Refunded**|CC + CD|Payment canceled after 11:59 pm on the authorization day|
|12|**Pending**|ALL|Waiting for financial institution status|
|13|**Aborted**|ALL|Payment canceled due to processing failure|
|20|**Scheduled**|CC|Scheduled recurrence|

-

|Payment method|Description|
|---|---|
|**ALL**|All|
|**CC**|Credit Card|
|**CD**|Debit Card|
|**TF**|Electronic Transfer|
|**BOL**|Bank slip|

## Integration errors

> **API Errors** - These codes are the responses to **validation of the content of the data sent**. <br>
> If this code is displayed, the request contains errors (e.g: size/conditions/registration errors) which prevent the creation of the transaction <BR><BR>*Returned at the time of request to the API*

``` json
[
    {
        "Code": 126,
        "Message": "Credit Card Expiration Date is invalid"
    }
]
```

### API Error Codes

Codes returned in case of error, identifying the reason for the error and its respective messages.

|Code|Message|Description|
|---|---|---|
|0|Internal error|Sent data exceeds field size|
|100|RequestId is required|Sent field is empty or invalid|
|101|MerchantId is required|Sent field is empty or invalid|
|102|Payment Type is required|Sent field is empty or invalid|
|103|Payment Type can only contain letters|Special characters not allowed|
|104|Customer Identity is required|Sent field is empty or invalid|
|105|Customer Name is required|Sent field is empty or invalid|
|106|Transaction ID is required|Sent field is empty or invalid|
|107|OrderId is invalid or does not exists|Sent field exceeds size or contains special characters|
|108|Amount must be greater or equal to zero|Transaction value must be greater than "0"|
|109|Payment Currency is required|Sent field is empty or invalid|
|110|Invalid Payment Currency|Sent field is empty or invalid|
|111|Payment Country is required|Sent field is empty or invalid|
|112|Invalid Payment Country|Sent field is empty or invalid|
|113|Invalid Payment Code|Sent field is empty or invalid|
|114|The provided MerchantId is not in correct format|The sent MerchantId is not a GUID|
|115|The provided MerchantId was not found|MerchantID does not exist or belongs to another environment (e.g. Sandbox)|
|116|The provided MerchantId is blocked|Locked store, contact Cielo support|
|117|Credit Card Holder is required|Sent field is empty or invalid|
|118|Credit Card Number is required|Sent field is empty or invalid|
|119|At least one Payment is required|"Payment" node not sent|
|120|Request IP not allowed. Check your IP White List|IP blocked for security reasons|
|121|Customer is required|"Customer" node not sent|
|122|MerchantOrderId is required|Sent field is empty or invalid|
|123|Installments must be greater or equal to one|Number of installments must be greater than 1|
|124|Credit Card is Required|Sent field is empty or invalid|
|125|Credit Card Expiration Date is required|Sent field is empty or invalid|
|126|Credit Card Expiration Date is invalid|Sent field is empty or invalid|
|127|You must provide CreditCard Number|Credit card number is required|
|128|Card Number length exceeded|Card number greater than 16 digits|
|129|Affiliation not found|Payment means not linked to store or invalid Provider|
|130|Could not get Credit Card|---|
|131|MerchantKey is required|Sent field is empty or invalid|
|132|MerchantKey is invalid|Sent Merchantkey is not a valid one|
|133|Provider is not supported for this Payment Type|Sent Provider does not exist|
|134|FingerPrint length exceeded|Sent data exceeds field size|
|135|MerchantDefinedFieldValue length exceeded|Sent data exceeds field size|
|136|ItemDataName length exceeded|Sent data exceeds field size|
|137|ItemDataSKU length exceeded|Sent data exceeds field size|
|138|PassengerDataName length exceeded|Sent data exceeds field size|
|139|PassengerDataStatus length exceeded|Sent data exceeds field size|
|140|PassengerDataEmail length exceeded|Sent data exceeds field size|
|141|PassengerDataPhone length exceeded|Sent data exceeds field size|
|142|TravelDataRoute length exceeded|Sent data exceeds field size|
|143|TravelDataJourneyType length exceeded|Sent data exceeds field size|
|144|TravelLegDataDestination length exceeded|Sent data exceeds field size|
|145|TravelLegDataOrigin length exceeded|Sent data exceeds field size|
|146|SecurityCode length exceeded|Sent data exceeds field size|
|147|Address Street length exceeded|Sent data exceeds field size|
|148|Address Number length exceeded|Sent data exceeds field size|
|149|Address Complement length exceeded|Sent data exceeds field size|
|150|Address ZipCode length exceeded|Sent data exceeds field size|
|151|Address City length exceeded|Sent data exceeds field size|
|152|Address State length exceeded|Sent data exceeds field size|
|153|Address Country length exceeded|Sent data exceeds field size|
|154|Address District length exceeded|Sent data exceeds field size|
|155|Customer Name length exceeded|Sent data exceeds field size|
|156|Customer Identity length exceeded|Sent data exceeds field size|
|157|Customer IdentityType length exceeded|Sent data exceeds field size|
|158|Customer Email length exceeded|Sent data exceeds field size|
|159|ExtraData Name length exceeded|Sent data exceeds field size|
|160|ExtraData Value length exceeded|Sent data exceeds field size|
|161|Boleto Instructions length exceeded|Sent data exceeds field size|
|162|Boleto Demostrative length exceeded|Sent data exceeds field size|
|163|Return Url is required|Return URL is not valid - No pagination or extensions are accepted (e.g. .PHP) in the return URL|
|166|AuthorizeNow is required|---|
|167|Antifraud not configured|Antifraud not linked to the merchant's registry|
|168|Recurrent Payment not found|Recurrence not found|
|169|Recurrent Payment is not active|Recurrence is not active. Paralyzed execution|
|170|Protected Card not configured|Protected card not linked to merchant's registry|
|171|Affiliation data not sent|Order processing failed - Contact Cielo support|
|172|Credential Code is required|Failed to validate the sent credentials|
|173|Payment method is not enabled|Means of payment not linked to the merchant's registry|
|174|Card Number is required|Sent field is empty or invalid|
|175|EAN is required|Sent field is empty or invalid|
|176|Payment Currency is not supported|Sent field is empty or invalid|
|177|Card Number is invalid|Sent field is empty or invalid|
|178|EAN is invalid|Sent field is empty or invalid|
|179|The max number of installments allowed for recurring payment is 1|Sent field is empty or invalid|
|180|The provided Card PaymentToken was not found|Protected Card Token not found|
|181|The MerchantIdJustClick is not configured|Protected Card Token locked|
|182|Brand is required|Card issuer not sent|
|183|Invalid customer bithdate|Invalid or future date of birth|
|184|Request could not be empty|Failure of the request format. Check the sent code|
|185|Brand is not supported by selected provider|Card issuer not supported by API Cielo|
|186|The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments)|Payment means does not support the sent command|
|187|ExtraData Collection contains one or more duplicated names|---|
|193|Split Amount must be greater than zero|Value for SPLIT realization must be greater than 0|
|194|Split Establishment is Required|SPLIT not enabled for store registration|
|195|The PlataformId is required|Platforms validated not sent|
|196|DeliveryAddress is required|Required field not sent|
|197|Street is required|Required field not sent|
|198|Number is required|Required field not sent|
|199|ZipCode is required|Required field not sent|
|200|City is required|Required field not sent|
|201|State is required|Required field not sent|
|202|District is required|Required field not sent|
|203|Cart item Name is required|Required field not sent|
|204|Cart item Quantity is required|Required field not sent|
|205|Cart item type is required|Required field not sent|
|206|Cart item name length exceeded|Sent data exceeds field size|
|207|Cart item description length exceeded|Sent data exceeds field size|
|208|Cart item sku length exceeded|Sent data exceeds field size|
|209|Shipping addressee sku length exceeded|Sent data exceeds field size|
|210|Shipping data cannot be null|Required field not sent|
|211|WalletKey is invalid|Invalid Visa Checkout data|
|212|Merchant Wallet Configuration not found|Sent Wallet data is not valid|
|213|Credit Card Number is invalid|Sent credit card is invalid|
|214|Credit Card Holder Must Have Only Letters|Card carrier must not contain special characters|
|215|Agency is required in Boleto Credential|Required field not sent|
|216|Customer IP address is invalid|IP blocked for security reasons|
|300|MerchantId was not found|---|
|301|Request IP is not allowed|---|
|302|Sent MerchantOrderId is duplicated|---|
|303|Sent OrderId does not exist|---|
|304|Customer Identity is required|---|
|306|Merchant is blocked|---|
|307|Transaction not found|Transaction not found or does not exist in the environment.|
|308|Transaction not available to capture|Transaction can not be captured - Contact Cielo support|
|309|Transaction not available to void|Transaction can not be canceled - Contact Cielo support|
|310|Payment method doest not support this operation|Sent command not supported by payment means|
|311|Refund is not enabled for this merchant|Cancellation after 24 hours not released to the merchant|
|312|Transaction not available to refund|Transaction does not allow cancellation after 24 hours|
|313|Recurrent Payment not found|Recurrent transaction not found or not available in the environment|
|314|Invalid Integration|---|
|315|Cannot change NextRecurrency with pending payment|---|
|316|Cannot set NextRecurrency to past date|It is not allowed to change the recurrence date to a past date|
|317|Invalid Recurrency Day|---|
|318|No transaction found|---|
|319|Smart recurrency is not enabled|Recurrence not linked to the merchant's registration|
|320|Can not Update Affiliation Because this Recurrency not Affiliation saved|---|
|321|Can not set EndDate to before next recurrency.|---|
|322|Zero Dollar Auth is not enabled|Zero Dollar not linked to the merchant's registration|
|323|Bin Query is not enabled|Bins query not linked to the merchant's registration|

### Return Reason Codes

|Reason Code|Reason Message|
|---|---|
|0|Successful|
|1|AffiliationNotFound|
|2|IssuficientFunds|
|3|CouldNotGetCreditCard|
|4|ConnectionWithAcquirerFailed|
|5|InvalidTransactionType|
|6|InvalidPaymentPlan|
|7|Denied|
|8|Scheduled|
|9|Waiting|
|10|Authenticated|
|11|NotAuthenticated|
|12|ProblemsWithCreditCard|
|13|CardCanceled|
|14|BlockedCreditCard|
|15|CardExpired|
|16|AbortedByFraud|
|17|CouldNotAntifraud|
|18|TryAgain|
|19|InvalidAmount|
|20|ProblemsWithIssuer|
|21|InvalidCardNumber|
|22|TimeOut|
|23|CartaoProtegidoIsNotEnabled|
|24|PaymentMethodIsNotEnabled|
|98|InvalidRequest|
|99|InternalError|

# Annexes

## Affiliate Settings.

Some transaction types require that their Affiliation is properly set up with Cielo. We suggest that, by default, you validate with our call center if your affiliation is able to transact in any of the scenarios below:

|Scenario|
|---|
|Recurrence|
|Transaction without CVV|
|Customizing the validity of a transaction|

## List of Providers

|Means of payment|Provider|
|---|---|
|Credit card|`Cielo`|
|Debit card|`Cielo`|
|Bank slip - Not registered|`Bradesco`  /  `BancodoBrasil`|
|Bank slip - Registered|`Bradesco2` /  `BancodoBrasil2`|
|Electronic Transfer|`Bradesco`  /  `BancodoBrasil`|

## Types of means of payment

|MEANS OF PAYMENT|PAYMENT.TYPE|
|---|---|
|Credit card|CreditCard|
|Debit cardo|DebitCard|
|Bank slip|Bank slip|
|Electronic Transfer|EletronicTransfer|

## Soft Descriptor

It allows the merchant to send a supplementary text that will be printed on the buyer's invoice along with the identification of the store name that appears in Cielo register.

**Rules**
* Maximum field size: 13 characters.
* Available only for Visa and MasterCard issuers.
* Can not contain special characters.

To know and/or change the name of the store that is registered, contact the Cielo relationship center.

# Questions and Support

If you have any questions or any other technical information, contact Cielo e-Commerce Web Support at the following channels:

* **E-mail:** [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)
* **Capitals:** 4002-9700
* **Other Cities:** 0800 570 1700

## Status transactional

|Code|Status|Means of payment|Description|
|---|---|---|---|
|0|**NotFinished**|ALL|Waiting for status update|
|1|**Authorized**|ALL|Payment apt to be captured or defined as paid|
|2|**PaymentConfirmed**|ALL|Confirmed and finalized payment|
|3|**Declined**|CC + CD + TF|Payment declined by Authorizer|
|10|**Voided**|ALL|Canceled payment|
|11|**Refunded**|CC + CD|Payment canceled after 11:59 pm on the authorization day|
|12|**Pending**|ALL|Waiting for financial institution status|
|13|**Aborted**|ALL|Payment canceled due to processing failure|
|20|**Scheduled**|CC|Scheduled recurrence|

-

|Payment method|Description|
|---|---|
|**ALL**|All|
|**CC**|Credit Card|
|**CD**|Debit Card|
|**TF**|Electronic Transfer|
|**BOL**|Bank slip|

## Integration errors

> **API Errors** - These codes are the responses to **validation of the content of the data sent**. <br>
> If this code is displayed, the request contains errors (e.g: size/conditions/registration errors) which prevent the creation of the transaction <BR><BR>*Returned at the time of request to the API*

``` json
[
    {
        "Code": 126,
        "Message": "Credit Card Expiration Date is invalid"
    }
]
```

### API Error Codes

Codes returned in case of error, identifying the reason for the error and its respective messages.

|Code|Message|Description|
|---|---|---|
|0|Internal error|Sent data exceeds field size|
|100|RequestId is required|Sent field is empty or invalid|
|101|MerchantId is required|Sent field is empty or invalid|
|102|Payment Type is required|Sent field is empty or invalid|
|103|Payment Type can only contain letters|Special characters not allowed|
|104|Customer Identity is required|Sent field is empty or invalid|
|105|Customer Name is required|Sent field is empty or invalid|
|106|Transaction ID is required|Sent field is empty or invalid|
|107|OrderId is invalid or does not exists|Sent field exceeds size or contains special characters|
|108|Amount must be greater or equal to zero|Transaction value must be greater than "0"|
|109|Payment Currency is required|Sent field is empty or invalid|
|110|Invalid Payment Currency|Sent field is empty or invalid|
|111|Payment Country is required|Sent field is empty or invalid|
|112|Invalid Payment Country|Sent field is empty or invalid|
|113|Invalid Payment Code|Sent field is empty or invalid|
|114|The provided MerchantId is not in correct format|The sent MerchantId is not a GUID|
|115|The provided MerchantId was not found|MerchantID does not exist or belongs to another environment (e.g. Sandbox)|
|116|The provided MerchantId is blocked|Locked store, contact Cielo support|
|117|Credit Card Holder is required|Sent field is empty or invalid|
|118|Credit Card Number is required|Sent field is empty or invalid|
|119|At least one Payment is required|"Payment" node not sent|
|120|Request IP not allowed. Check your IP White List|IP blocked for security reasons|
|121|Customer is required|"Customer" node not sent|
|122|MerchantOrderId is required|Sent field is empty or invalid|
|123|Installments must be greater or equal to one|Number of installments must be greater than 1|
|124|Credit Card is Required|Sent field is empty or invalid|
|125|Credit Card Expiration Date is required|Sent field is empty or invalid|
|126|Credit Card Expiration Date is invalid|Sent field is empty or invalid|
|127|You must provide CreditCard Number|Credit card number is required|
|128|Card Number length exceeded|Card number greater than 16 digits|
|129|Affiliation not found|Payment means not linked to store or invalid Provider|
|130|Could not get Credit Card|---|
|131|MerchantKey is required|Sent field is empty or invalid|
|132|MerchantKey is invalid|Sent Merchantkey is not a valid one|
|133|Provider is not supported for this Payment Type|Sent Provider does not exist|
|134|FingerPrint length exceeded|Sent data exceeds field size|
|135|MerchantDefinedFieldValue length exceeded|Sent data exceeds field size|
|136|ItemDataName length exceeded|Sent data exceeds field size|
|137|ItemDataSKU length exceeded|Sent data exceeds field size|
|138|PassengerDataName length exceeded|Sent data exceeds field size|
|139|PassengerDataStatus length exceeded|Sent data exceeds field size|
|140|PassengerDataEmail length exceeded|Sent data exceeds field size|
|141|PassengerDataPhone length exceeded|Sent data exceeds field size|
|142|TravelDataRoute length exceeded|Sent data exceeds field size|
|143|TravelDataJourneyType length exceeded|Sent data exceeds field size|
|144|TravelLegDataDestination length exceeded|Sent data exceeds field size|
|145|TravelLegDataOrigin length exceeded|Sent data exceeds field size|
|146|SecurityCode length exceeded|Sent data exceeds field size|
|147|Address Street length exceeded|Sent data exceeds field size|
|148|Address Number length exceeded|Sent data exceeds field size|
|149|Address Complement length exceeded|Sent data exceeds field size|
|150|Address ZipCode length exceeded|Sent data exceeds field size|
|151|Address City length exceeded|Sent data exceeds field size|
|152|Address State length exceeded|Sent data exceeds field size|
|153|Address Country length exceeded|Sent data exceeds field size|
|154|Address District length exceeded|Sent data exceeds field size|
|155|Customer Name length exceeded|Sent data exceeds field size|
|156|Customer Identity length exceeded|Sent data exceeds field size|
|157|Customer IdentityType length exceeded|Sent data exceeds field size|
|158|Customer Email length exceeded|Sent data exceeds field size|
|159|ExtraData Name length exceeded|Sent data exceeds field size|
|160|ExtraData Value length exceeded|Sent data exceeds field size|
|161|Boleto Instructions length exceeded|Sent data exceeds field size|
|162|Boleto Demostrative length exceeded|Sent data exceeds field size|
|163|Return Url is required|Return URL is not valid - No pagination or extensions are accepted (e.g. .PHP) in the return URL|
|166|AuthorizeNow is required|---|
|167|Antifraud not configured|Antifraud not linked to the merchant's registry|
|168|Recurrent Payment not found|Recurrence not found|
|169|Recurrent Payment is not active|Recurrence is not active. Paralyzed execution|
|170|Protected Card not configured|Protected card not linked to merchant's registry|
|171|Affiliation data not sent|Order processing failed - Contact Cielo support|
|172|Credential Code is required|Failed to validate the sent credentials|
|173|Payment method is not enabled|Means of payment not linked to the merchant's registry|
|174|Card Number is required|Sent field is empty or invalid|
|175|EAN is required|Sent field is empty or invalid|
|176|Payment Currency is not supported|Sent field is empty or invalid|
|177|Card Number is invalid|Sent field is empty or invalid|
|178|EAN is invalid|Sent field is empty or invalid|
|179|The max number of installments allowed for recurring payment is 1|Sent field is empty or invalid|
|180|The provided Card PaymentToken was not found|Protected Card Token not found|
|181|The MerchantIdJustClick is not configured|Protected Card Token locked|
|182|Brand is required|Card issuer not sent|
|183|Invalid customer bithdate|Invalid or future date of birth|
|184|Request could not be empty|Failure of the request format. Check the sent code|
|185|Brand is not supported by selected provider|Card issuer not supported by API Cielo|
|186|The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments)|Payment means does not support the sent command|
|187|ExtraData Collection contains one or more duplicated names|---|
|193|Split Amount must be greater than zero|Value for SPLIT realization must be greater than 0|
|194|Split Establishment is Required|SPLIT not enabled for store registration|
|195|The PlataformId is required|Platforms validated not sent|
|196|DeliveryAddress is required|Required field not sent|
|197|Street is required|Required field not sent|
|198|Number is required|Required field not sent|
|199|ZipCode is required|Required field not sent|
|200|City is required|Required field not sent|
|201|State is required|Required field not sent|
|202|District is required|Required field not sent|
|203|Cart item Name is required|Required field not sent|
|204|Cart item Quantity is required|Required field not sent|
|205|Cart item type is required|Required field not sent|
|206|Cart item name length exceeded|Sent data exceeds field size|
|207|Cart item description length exceeded|Sent data exceeds field size|
|208|Cart item sku length exceeded|Sent data exceeds field size|
|209|Shipping addressee sku length exceeded|Sent data exceeds field size|
|210|Shipping data cannot be null|Required field not sent|
|211|WalletKey is invalid|Invalid Visa Checkout data|
|212|Merchant Wallet Configuration not found|Sent Wallet data is not valid|
|213|Credit Card Number is invalid|Sent credit card is invalid|
|214|Credit Card Holder Must Have Only Letters|Card carrier must not contain special characters|
|215|Agency is required in Boleto Credential|Required field not sent|
|216|Customer IP address is invalid|IP blocked for security reasons|
|300|MerchantId was not found|---|
|301|Request IP is not allowed|---|
|302|Sent MerchantOrderId is duplicated|---|
|303|Sent OrderId does not exist|---|
|304|Customer Identity is required|---|
|306|Merchant is blocked|---|
|307|Transaction not found|Transaction not found or does not exist in the environment.|
|308|Transaction not available to capture|Transaction can not be captured - Contact Cielo support|
|309|Transaction not available to void|Transaction can not be canceled - Contact Cielo support|
|310|Payment method doest not support this operation|Sent command not supported by payment means|
|311|Refund is not enabled for this merchant|Cancellation after 24 hours not released to the merchant|
|312|Transaction not available to refund|Transaction does not allow cancellation after 24 hours|
|313|Recurrent Payment not found|Recurrent transaction not found or not available in the environment|
|314|Invalid Integration|---|
|315|Cannot change NextRecurrency with pending payment|---|
|316|Cannot set NextRecurrency to past date|It is not allowed to change the recurrence date to a past date|
|317|Invalid Recurrency Day|---|
|318|No transaction found|---|
|319|Smart recurrency is not enabled|Recurrence not linked to the merchant's registration|
|320|Can not Update Affiliation Because this Recurrency not Affiliation saved|---|
|321|Can not set EndDate to before next recurrency.|---|
|322|Zero Dollar Auth is not enabled|Zero Dollar not linked to the merchant's registration|
|323|Bin Query is not enabled|Bins query not linked to the merchant's registration|

### Return Reason Codes

|Reason Code|Reason Message|
|---|---|
|0|Successful|
|1|AffiliationNotFound|
|2|IssuficientFunds|
|3|CouldNotGetCreditCard|
|4|ConnectionWithAcquirerFailed|
|5|InvalidTransactionType|
|6|InvalidPaymentPlan|
|7|Denied|
|8|Scheduled|
|9|Waiting|
|10|Authenticated|
|11|NotAuthenticated|
|12|ProblemsWithCreditCard|
|13|CardCanceled|
|14|BlockedCreditCard|
|15|CardExpired|
|16|AbortedByFraud|
|17|CouldNotAntifraud|
|18|TryAgain|
|19|InvalidAmount|
|20|ProblemsWithIssuer|
|21|InvalidCardNumber|
|22|TimeOut|
|23|CartaoProtegidoIsNotEnabled|
|24|PaymentMethodIsNotEnabled|
|98|InvalidRequest|
|99|InternalError|

# Annexes

## Affiliate Settings.

Some transaction types require that their Affiliation is properly set up with Cielo. We suggest that, by default, you validate with our call center if your affiliation is able to transact in any of the scenarios below:

|Scenario|
|---|
|Recurrence|
|Transaction without CVV|
|Customizing the validity of a transaction|

## List of Providers

|Means of payment|Provider|
|---|---|
|Credit card|`Cielo`|
|Debit card|`Cielo`|
|Bank slip - Not registered|`Bradesco`  /  `BancodoBrasil`|
|Bank slip - Registered|`Bradesco2` /  `BancodoBrasil2`|
|Electronic Transfer|`Bradesco`  /  `BancodoBrasil`|

## Types of means of payment

|MEANS OF PAYMENT|PAYMENT.TYPE|
|---|---|
|Credit card|CreditCard|
|Debit cardo|DebitCard|
|Bank slip|Bank slip|
|Electronic Transfer|EletronicTransfer|

## Merchant Defined Data

The table below lists all possible codes to be sent in the MerchantDefinedData parameter and respective type of information that must be filled in.

|ID|Data|Description|Type|
|---|---|---|---|
|1|Customer logged in|If the final customer logged in on the site to buy, send: their login. If the customer made a purchase as a visitor, send: "Guest". If the sale was made direct by a third party, an agent for example, do not send the field|String|
|2|Customer of the establishment since: #days|Number of days|Number|
|3|Purchase Made in (installments)|Number of installments|Number|
|4|Sales Channel|Values: "Call Center" = purchase by phone <br> "Web" = purchase by  web <br> "Portal" = an agent making the purchase for the customer <br> "Kiosk" = Purchases in kiosks <br> "Mobile" = Purchases made on smartphones or tablets|String|
|5|Coupon Code/Discount|If the buyer is to use coupon, send the coupon code|String|
|6|Last purchase made|MM DD YYYY|Date|
|7|Affiliation|Name or code of dealer or broker|String|
|8|Attempts to Purchase|Number of times tried to make the order payment. Different attempted credit cards and/or other means of payments attempted. For the same order.|Number|
|9|Customer will withdraw the product in a Store|Values: "YES", "NO" In the case of an agency, if you are going to withdraw any voucher and/or ticket physically|String|
|10|Payment made by third party|Values: "YES", "NO" Whether or not the payer is present on the trip or package|String|
|11|Hotel Category|Values: 1, 2, 3, 4, 5 How many stars has the hotel|Number|
|12|Hotel Check-in date|MM DD YYYY|Date|
|13|Hotel Check-out date|MM DD YYYY|Date|
|14|Travel/Package|Values: "National", "International", "National/International"|String|
|15|Name of Airline/Car Rental/Hotel|Send the name of each company, separated by "/"|String|
|16|PNR|Send the reservation PNR number. When there is a change in the reservation for this PNR with anticipation of the flight date, it is important to do a new analysis of fraud by sending this PNR again.|String|
|17|There was anticipation of reservation?|Values: "YES", "NO" Indicate whether the flight was remarked to a date earlier than the original. It is also important to send the PNR field|String|
|18|(reserved)|||
|19|(reserved)|||
|20|(reserved)|||
|21|(reserved)|||
|22|(reserved)|||
|23|(reserved)|||
|24|(reserved)|||
|25|(reserved)|||
|26|Credit Card Bin|Send the bin - 6 first digits of the card|String|
|27|(reserved)|||
|28|(reserved)|||
|29|(reserved)|||
|30|(reserved)|||
|31|Number of Credit Cards exchanges|Number of times the buyer has exchanged the credit card to make the payment of the order|Number|
|32|E-mail pasted or typed|Values: "Typed", "Pasted" Report whether the e-mail address was typed or pasted into the field|String|
|33|Card Number pasted or typed|Values: "Typed", "Pasted" Report whether the credit card number was typed or pasted into the field|String|
|34|E-mail confirmed|If there is an e-mail confirmation routine for account activation. Values: "YES". In case of negative, do not send the MDD|String|
|35|Customer type (local or tourist)|Values: "Local", "Tourist". Do not send the MDD in the case of not having this information|String|
|36|Use gift card at purchase ($)|Report if Gift Card was used (Gift Card) at purchase. Values: "YES". In case of negative, do not send the MDD|String|
|37|Shipping method|Values: "Sedex", "Sedex 10", "1 Day", "2 Days", "Motoboy", "Same Day", etc. If there is no shipping, do not send the MDD|String|
|38|Caller ID number|Inform the identified phone number, with DDD|String|
|39|(reserved)|||
|40|(reserved)|||
|41 a 95|Free Field|The fields are reserved for sending merchant data, according to the business rule.|String|
|96|(reserved)|||
|97|(reserved)|||
|98|(reserved)|||
|99|(reserved)|||
|100|Document|Document (CPF, RG, etc.)|String|

## Fraud Analysis Values

### FraudAnalysis.status

|Field|Description|
|---|---|
|Started|Transaction received by Cielo.|
|Accept|Transaction accepted after fraud analysis.|
|Review|Transaction under review after fraud analysis.|
|Reject|Transaction rejected after fraud analysis.|
|Unfinished|Transaction not finalized due to some internal error in the system.|
|Pendent|Transaction waiting for analysis|
|ProviderError|Transaction with error in antifraud provider.|

### FraudAnalysis.Items.GiftCategory

|Field|Description|
|---|---|
|Yes|In case of divergence between billing and delivery addresses, mark as small risk.|
|No|In case of divergence between billing and delivery addresses, mark as high risk.|
|Off|Ignores risk analysis for divergent addresses.|

### FraudAnalysis.Items.HostHedge

|Field|Description|
|---|---|
|Low|Low importance of e-mail and IP address in risk analysis.|
|Normal|Average importance of e-mail and IP address in risk analysis.|
|High|High importance of e-mail and IP address in risk analysis.|
|Off|E-mail and IP address do not affect the risk analysis.|

### FraudAnalysis.Items.NonSensicalHedge

|Field|Description|
|---|---|
|Low|Low importance of the verification made on the buyer's order, in the risk analysis.|
|Normal|Average importance of the verification made on the buyer's order, in the risk analysis.|
|High|High importance of the verification made on the buyer's order, in the risk analysis.|
|Off|Verification of buyer's order does not affect risk analysis.|

### FraudAnalysis.Items.ObscenitiesHedge

|Field|Description|
|---|---|
|Low|Low importance of obscenities verification of buyer's order, in the risk analysis.|
|Normal|Average importance of obscenities verification of buyer's order, in the risk analysis.|
|High|High importance of obscenities verification of buyer's order, in the risk analysis.|
|Off|Obscenity verification of buyer's order does not affect risk analysis.|

### FraudAnalysis.Items.PhoneHedge

|Field|Description|
|---|---|
|Low|Low importance on tests performed with telephone numbers.|
|Normal|Average importance on tests performed with telephone numbers.|
|High|High importance on tests performed with telephone numbers.|
|Off|Phone number tests do not affect risk analysis.|

### FraudAnalysis.Items.Risk

|Field|Description|
|---|---|
|Low|The product has a history of few chargebacks.|
|Normal|The product has a history of chargebacks considered normal.|
|High|Product has an above average chargeback history.|

### FraudAnalysis.Items.TimeHedge

|Field|Description|
|---|---|
|Low|Low importance of the time of day when the purchase was made, for the risk analysis.|
|Normal|Average importance of the time of day when the purchase was made, for the risk analysis.|
|High|High importance of the time of day when the purchase was made, for the risk analysis.|
|Off|Purchase time does not affect risk analysis.|

### FraudAnalysis.Items.Type 

|Field|Description|
|---|---|
|CN|Business buyer|
|CP|Private buyer|

### FraudAnalysis.Items.VelocityHedge

|Field|Description|
|---|---|
|Low|Low importance on the number of purchases made by the customer in the last 15 minutes.|
|Normal|Average importance on the number of purchases made by the customer in the last 15 minutes.|
|High|High importance on the number of purchases made by the customer in the last 15 minutes.|
|Off|The frequency of purchases made by the customer does not affect the fraud analysis.|

### FraudAnalysis.Items.Passenger.Rating

|Field|Description|
|---|---|
|Adult|Adult passenger.|
|Child|Child passenger.|
|Infant|Infant passenger.|
|Youth|Teenage passenger.|
|Student|Student passenger.|
|SeniorCitizen|Elderly passenger.|
|Military|Military passenger.|

### FraudAnalysis.Shipping.Method

|Field|
|---|
|None|
|SameDay|
|OneDay|
|TwoDay|
|ThreeDay|
|LowCost|
|Pickup|
|Other|

## Values List - Payment.Chargebacks[n].Status

|Value|Description|
|:-|:-|
|Received|Chargeback received from acquirer|
|AcceptedByMerchant|Chargeback accepted by establishment. In this case the establishment understands that it has indeed suffered a chargeback and will not hold the contestation|
|ContestedByMerchant|Chargeback contested by establishment. In this case the establishment has sent the necessary documents to try to reverse the chargeback|

## Service Tax Amount - BOARDING FEE

**The boarding fee** (servicetaxamount) is an information field that defines the total amount of the transaction that should be used to pay the fee to Infraero. The value of the boarding fee is not accumulated at the value of the authorization.

* *e.g.*: In an airline ticket sale of R$200,00 with boarding fee of R$25,00, the field `Payment.ServiceTaxAmount` must be sent as 2500

**Rules**

* Available only for Visa, Mastercard and Amex issuers.
* The value of the boarding fee is not added to the value of the authorization, i.e. it is only informative.

There are specific rules for the requisition of capture with boarding fee, available in the item Total and Partial Capture.

## Soft Descriptor

It allows the merchant to send a supplementary text that will be printed on the buyer's invoice along with the identification of the store name that appears in Cielo register.

**Rules**
* Maximum field size: 13 characters.
* Available only for Visa and MasterCard issuers.
* Can not contain special characters.

To know and/or change the name of the store that is registered, contact the Cielo relationship center.

# Questions and Support

If you have any questions or any other technical information, contact Cielo e-Commerce Web Support at the following channels:

* **E-mail:** [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)
* **Capitals:** 4002-9700
* **Other Cities:** 0800 570 1700

Opening hours: 24 hours a day, 7 days a week.
