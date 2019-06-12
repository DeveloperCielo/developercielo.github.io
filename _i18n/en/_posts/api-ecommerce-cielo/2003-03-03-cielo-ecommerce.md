---
layout: manual
title: Integration Manual
description: The purpose of this documentation is to guide the developer on how to integrate with Cielo's API Cielo e-Commerce.
search: true
translated: true
categories: manual
tags:
  - API e-Commerce Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Overview - API Cielo eCommerce

The purpose of this documentation is to guide the developer on how to integrate with Cielo's API Cielo eCommerce, describing the features, methods to be used, listing information to be sent and received, and providing examples.

The integration mechanism with Cielo e-Commerce is simple, so only intermediate knowledge in Web programming language, HTTP/HTTPS requests and JSON file manipulation are required to successfully deploy the Cielo e-Commerce solution.

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
* [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

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
|**Anti fraud**|It is a fraud prevention platform that provides a detailed risk analysis of online purchases. Each transaction is submitted to more than 260 rules, besides the specific rules of each segment, and generate a risk recommendation in approximately two seconds. This process is completely transparent to the card carrier. According to the pre-established criteria, the order can be automatically accepted, rejected or sent to manual analysis.|
|**Recurrent**|The Smart Recurrence is an indispensable feature for establishments that regularly need to charge for their products/services. It is widely used for magazine subscriptions, monthly fees, software licenses, among others. The merchants will count with differentiated features to model their charging according to their business, as all parameterization is configurable, such as: periodicity, start and end date, number of attempts, interval between them, among others.|

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
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Installments`|Number|2|Yes|Number of installments.|
|`Payment.SoftDescriptor`|Text|13|No|Text printed on buyer's bank invoice - Available only for VISA/MASTER - does not allow special characters - See Attachment|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on the card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Attachment.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|
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
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
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
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
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
|`Payment.ServiceTaxAmount`|Number|15|No|[See Annex](https://developercielo.github.io/Webservice-3.0/#anexos)|
|`Payment.SoftDescriptor`|Text|13|No|Text printed on the buyer's bank invoice - Only available for VISA/MASTER - does not allow special characters - See Annex|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Interest`|Text|10|No|Type of installment - Store (ByMerchant) or Card (ByIssuer).|
|`Payment.Capture`|Boolean|---|No (Default false)|Boolean that identifies that the authorization should be with automatic capture.|
|`Payment.Authenticate`|Booleano|---|No (Default false)|Defines whether the buyer will be directed to the Issuing bank for card authentication|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.SaveCard`|Boolean|---|No (Default false)|Boolean that identifies whether the card will be saved to generate the CardToken.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|
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
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
         }
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
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
         }
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
|`SoftDescriptor`|Text that will be printed on the carrier's bank invoice - Available only for VISA/MASTER - does not allow special characters|Text|13|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Represents how secure a transaction is.|Text|2|Examples: 7|
|`Status`|Transaction Status.|Byte|---|2|
|`ReturnCode`|Return code of Acquiring.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of Acquiring.|Text|512|Alphanumeric texto|

### Creating a authenticated transaction

To create a transaction with authentication that will use a credit card, it is necessary to submit a request using the `POST` method for the Payment feature as shown.

<aside class="notice"><strong>Authentication:</strong> In this mode, the card carrier is directed to the authentication environment of the card issuing bank where the inclusion of the card password will be requested.</aside>

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
 "MerchantOrderId":"2014111903",
 "Customer":
 {
  "Name":"Comprador crédito autenticação"
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
      "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason": "Unscheduled"
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
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`Payment.Authenticate`|Boolean|---|No (Default false)|Defines whether the buyer will be directed to the Issuing bank for card authentication|
|`CreditCard.CardNumber.`|Text|19|Yes|Buyer's Card Number|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|
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

### Debit Authentication

Debit Card by standard requires the carrier to be directed to the Banking environment, where the password and data reported by the store will be evaluated. There is the option of not authenticating debit transactions, but it is necessary for the card issuing bank to allow such transaction. This isn't a permission granted by Cielo, the seller must activate the bank and request permission

In debit card transactions without authentication, there is a limitation of banks:

| Brand      | Banks                              |
|------------|------------------------------------|
| Visa       | Bradesco / Banco do Brasil         |
| MasterCard | Santander / Banco do Brasil        |
| Elo        | Bradesco / Banco do Brasil         |

### Standard Transaction

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
     "Authenticate": true,
     "Amount":15700,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
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
|`Payment.Authenticate`|Defines whether the buyer will be directed to the issuing bank for card authentication.|Boolean|---|Yes (Default TRUE)|
|`Payment.ReturnUrl`|URI to where the user will be redirected after payment ends|Text|1024|Yes|
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

## Electronic Transfer

### Creating a simple transaction

To create an electronic transfer sale, it is necessary to make a POST for the Payment feature as shown. This example includes the minimum number of fields required to be sent for authorization.

#### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
    "MerchantOrderId":"2014111706",
    "Customer":
    {  
        "Name":"Comprador Transferência Eletronica"
    },
    "Payment":
    {  
        "Type":"EletronicTransfer",
        "Amount":15700,
        "Provider":"Bradesco",
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
    "MerchantOrderId":"2014111706",
    "Customer":
    {  
        "Name":"Comprador Transferência Eletronica"
    },
    "Payment":
    {  
        "Type":"EletronicTransfer",
        "Amount":15700,
        "Provider":"Bradesco",
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
|`QrCodeBase64Image`|QRCode encoded in 64. For example, the image may be displayed on the page using the HTML code like this:<br> <code>&lt;img src="data:image/png;base64,{image code in the 64 base}"&gt;</code>|Text|variable|Alphanumeric text|
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

#### Response

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Buyer test",
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
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "qrcode",
        "Amount": 15700,
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
        "Name": "Teste Holder",
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
            "Holder": "Test Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
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
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status.|Byte|---|2|
|`Customer.Name`|Buyer’s name|No|Text|255|
|`Customer.Status`|Buyer registration status in store (NEW / EXISTING)|Text|255|No|
|`Payment.Type`|Payment method.|Text|100|Yes|
|`Payment.Amount`|Order Amount (to be sent in cents).|Number|15|Yes|
|`Payment.Provider`|Defines behavior of the payment method (See Annex) / NOT REQUIRED FOR CREDIT.|Text|15|---|
|`Payment.Installments`|Number of Installments.|Number|2|Yes|
|`CreditCard.CardNumber`|Buyer’s Card Number.|Text|19|Yes|
|`CreditCard.Holder`|Buyer’s name printed on card.|Text|25|No|
|`CreditCard.ExpirationDate`|Expiry date printed on card.|Text|7|Yes|
|`CreditCard.SecurityCode`|Security code printed on back of card - See Annex.|Text|4|No|
|`CreditCard.Brand`|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|Text|10|No|

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
|`ServiceTaxAmount`|[See Annex](https://developercielo.github.io/manual/cielo-ecommerce#service-tax-amount-taxa-de-embarque)|Number|15|No|

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
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

<aside class="notice"><strong>Cancellation of Boarding Fee</strong>To cancel the *boarding fee*, just add the value of ServiveTaxAmount to be canceled</aside>

```
https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/void?amount={Valor}&serviceTaxAmount=xxx
```

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

#### Response

```json
{
    "MerchantOrderId": "2014111706",
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
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
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
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
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
|`AuthorizationCode`|Authorization code.|Text|6|Alphanumeric text|
|`PaymentId`|Order Identifier Field.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Transaction Status.|Byte|---|2|
|`Customer.Name`|Text|255|No|Buyer's name.|
|`Customer.Status`|Text|255|No|Buyer registration status in store (NEW / EXISTING)|
|`Payment.Type`|Text|100|Yes|Type of the Payment Method.|
|`Payment.Amount`|Number|15|Yes|Order Amount (to be sent in cents).|
|`Payment.Provider`|Text|15|---|Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.|
|`Payment.Installments`|Number|2|Yes|Number of Installments.|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|

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
|`ServiceTaxAmount`|[See Annex](https://developercielo.github.io/en/manual/cielo-ecommerce#service-tax-amount-boarding-fee)|Number|15|No|

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
|`ServiceTaxAmount`|[See Annex](https://developercielo.github.io/en/manual/cielo-ecommerce#service-tax-amount-boarding-fee)|Number|15|No|

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
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric texto|
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
|`ReturnCode`|Return code of acquirer.|Text|32|Alphanumeric text|
|`ReturnMessage`|Return message of acquirer.|Text|512|Alphanumeric text|
|`ProviderReturnCode`|Provider return code.|Text|32|Alphanumeric text|
|`ProviderReturnMessage`|Provider return message.|Text|512|Alphanumeric text|

### Capture Via Backoffice

It is possible to carry out both the total capture and the partial capture via The Backoffice Cielo.

Access our [**Tutorial**](https://developercielo.github.io/en/tutorial/tutoriais-3-0)  for more informations

## Canceling a sale

### Canceling a sale via API

Cancellation process via API is available only for credit and debit card.

Each payment method suffer different impacts when a cancellation order (VOID) is executed.

|Payment method|Description|Deadline|Cielo participation|
|---|---|---|---|
|Credit card|Cielo returns the value via bank credit|300 days after authorization|Yes|
|Debit card|Cancellation only in API. The return of the value is made by the merchant himself|300 days after authorization|No|

NOTE: Partial cancellations are only available for Credit Card.

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

# External Authentication

The authentication process makes it possible to make a sale (credit or debit) that will go through the authentication process of the bank issuing the card, then bringing more security for the sales and transferring to the bank, the risk of fraud. This authentication process can be done together or separate from the authorization, and for cases where the merchant chooses to perform authentication to an external provider (of its choice), we are prepared to receive the authorization already with the authentication result.

## Creating a sale with external authentication

To create a credit or debit card sale containing external authentication data, you must send a request using the `POST` method for the Payment feature as the example.

### Request

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
|`Payment.ExternalAuthentication.Cavv`|Text|28|Yes|The Cavv value is returned by the authentication mechanism.|
|`Payment.ExternalAuthentication.Xid`|Text|28|Yes|The Xid value is returned by the authentication mechanism.|
|`Payment.ExternalAuthentication.Eci`|Number|1|Yes|The Eci value is returned by the authentication mechanism.|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer’s Card Number.|
|`CreditCard.Holder`|Text|25|No|NBuyer’s name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|

### Response

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

# Fraud Analysis (AF)

The Cielo e-commerce API offers an online transaction fraud risk analysis service. Cielo joins risk analysis companies, such as CyberSource, which performs validation of transactional data and purchase history data of the card holder. This analysis returns risk factors and allows the merchant to make the decision whether to continue the sale.

<aside class="warning">The fraud analysis offered by Cielo rate the risk of a transaction but does not link the result of the analysis to ChargeBacks coverage. Cielo does not make "guaranteed" transactions</aside>

To use AF, it is necessary that the service be activated with Cielo. There are 3 types of fraud analysis settings available:

|Type|Description|Provider|
|-|-|-|
|**SuperMID without BPO**|Analysis rules are defined by Cielo <BR> It is not possible to customize the rules in the provider <BR> There is no dedicated risk analyst|CyberSource|
|**SuperMID with BPO**|Analysis rules are defined by Cielo <BR> It is not possible to customize the rules in the supplier <BR> Dedicated risk analyst contracted by the merchant with the provider|CyberSource|
|**Hierarchy or Enterprise**|The merchant has a contract directly with the provider of the AF, with specific rules for analysis. Cielo must configure the credentials provided by the AF Provider in the Cielo E-commerce API|CyberSource|

> Fraud Analysis is available only for credit card transactions.

## Integration

To create a credit card sale and fraud analysis, , it is necessary to do a POST for the Payment feature as the example.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"201411173454307",
   "Customer":{  
      "Name":"Comprador crédito AF",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"compradorteste@live.com",
      "Birthdate":"1991-01-02",
      "Mobile":"5521995760078",
      "Phone":"552125553669",
      "Address":{  
         "Street":"Rua Júpter",
         "Number":"174",
         "Complement":"AP 201",
         "ZipCode":"21241140",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BR",
         "District":"Alphaville"
      },
      "DeliveryAddress":{  
         "Street":"Rua Júpter",
         "Number":"174",
         "Complement":"AP 201",
         "ZipCode":"21241140",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BR",
         "District":"Alphaville"
      },
      "BillingAddress":{
         "Street":"Rua Júpter",
         "Number":"174",
         "Complement":"AP 201",
         "ZipCode":"21241140",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BR",
         "District":"Alphaville"
      }
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":100,
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":false,
     "Authenticate":false,
     "SoftDescriptor":"Mensagem",
     "CreditCard":{  
         "CardNumber":"4024007197692931",
         "Holder":"Teste accept",
         "ExpirationDate":"12/2030",
         "SecurityCode":"023",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "FraudAnalysis":{
       "Provider":"cybersource",
       "Sequence":"AuthorizeFirst",
       "SequenceCriteria":"OnSuccess",
       "CaptureOnLowRisk":false,
       "VoidOnHighRisk":false,
       "TotalOrderAmount":10000,
       "FingerPrintId":"074c1ee676ed4998ab66491013c565e2",
       "Browser":{
         "CookiesAccepted":false,
         "Email":"compradorteste@live.com",
         "HostName":"Teste",
         "IpAddress":"200.190.150.350",
         "Type":"Chrome"
        },
       "Cart":{
         "IsGift":false,
         "ReturnsAccepted":true,
         "Items":[{
           "GiftCategory":"Undefined",
           "HostHedge":"Off",
           "NonSensicalHedge":"Off",
           "ObscenitiesHedge":"Off",
           "PhoneHedge":"Off",
           "Name":"ItemTeste",
           "Quantity":1,
           "Sku":"201411170235134521346",
           "UnitPrice":123,
           "Risk":"High",
           "TimeHedge":"Normal",
           "Type":"AdultContent",
           "VelocityHedge":"High",
           "Passenger":{
             "Email":"compradorteste@live.com",
             "Identity":"1234567890",
             "Name":"Comprador accept",
             "Rating":"Adult",
             "Phone":"999994444",
             "Status":"Accepted"
            }
           }]
       },
       "MerchantDefinedFields":[{
            "Id":95,
            "Value":"Eu defini isso"
        }],
        "Shipping":{
            "Addressee":"Sr Comprador Teste",
            "Method":"LowCost",
            "Phone":"21114740"
        },
        "Travel":{
            "DepartureTime":"2010-01-02",
            "JourneyType":"Ida",
            "Route":"MAO-RJO",
          "Legs":[{
                "Destination":"GYN",
                "Origin":"VCP"
          }]
        }
     }
  }
}
```

| Property                                      |  Type    | Size    | Required            | Description                                                                                                                       |
|-----------------------------------------------|----------|---------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `MerchantId`                                  | Guid     | 36      | Yes                 | Store identifier in API Cielo eCommerce.                                                                                          |
| `MerchantKey`                                 | Text     | 40      | Yes                 | Public Key for Double Authentication in API Cielo eCommerce.                                                                      |
| `RequestId`                                   | Guid     | 36      | No                  | Request Identifier, used when the merchant uses different servers for each GET/POST/PUT                                           |
| `MerchantOrderId`                             | Text     | 50      | Yes                 | Order ID number.                                                                                                                  |
| `Customer.Name`                               | Text     | 255     | Yes                 | Buyer’s name.                                                                                                                     |
| `Customer.Identity`                           | Text     | 14      | Yes                 | Buyer’s RG, CPF or CNPJ number.                                                                                                   |
| `Customer.IdentityType`                       | Text     | 24      | Yes                 | Type of buyer ID document (CFP/CNPJ).                                                                                             |
| `Customer.Status`                             | Text     | 255     | No                  | Buyer registration status in store (NEW / EXISTING).                                                                              |
| `Customer.Email`                              | Text     | 255     | No                  | Buyer’s e-mail.                                                                                                                   |
| `Customer.Birthdate`                          | Date     | 10      | No                  | Buyer's date of birth in YYYY-MM-DD format.                                                                                       |
| `Customer.Address.Street`                     | Text     | 54      | No                  | Buyer's address.                                                                                                                  |
| `Customer.Address.Number`                     | Text     | 5       | No                  | Buyer's address number.                                                                                                           |
| `Customer.Address.Complement`                 | Text     | 14      | No                  | Buyer's address complement.                                                                                                       |
| `Customer.Address.ZipCode`                    | Text     | 9       | No                  | Buyer's address zip code.                                                                                                         |
| `Customer.Address.City`                       | Text     | 50      | No                  | Buyer's address city.                                                                                                             |
| `Customer.Address.State`                      | Text     | 2       | No                  | Buyer's address state.                                                                                                            |
| `Customer.Address.Country`                    | Text     | 2       | No                  | Buyer's address country.                                                                                                          |
| `Customer.Address.District`                   | Text     | 45      | No                  | Buyer's neighborhood.                                                                                                             |
| `Customer.DeliveryAddress.Street`             | Text     | 54      | No                  | Buyer's address.                                                                                                                  |
| `Customer.DeliveryAddress.Number`             | Text     | 5       | No                  | Buyer's address number.                                                                                                           |
| `Customer.DeliveryAddress.Complement`         | Text     | 14      | No                  | Buyer's address complement.                                                                                                       |
| `Customer.DeliveryAddress.ZipCode`            | Text     | 9       | No                  | Buyer's address zip code.                                                                                                         |
| `Customer.DeliveryAddress.City`               | Text     | 50      | No                  | Buyer's address city.                                                                                                             |
| `Customer.DeliveryAddress.State`              | Text     | 2       | No                  | Buyer's address state.                                                                                                            |
| `Customer.DeliveryAddress.Country`            | Text     | 2       | No                  | Buyer's address country.                                                                                                          |
| `Customer.DeliveryAddress.District`           | Text     | 45      | No                  | Buyer's neighborhood.                                                                                                             |
| `Customer.BillingAddress.Street`              | Text     | 54      | No                  | Buyer's address.                                                                                                                  |
| `Customer.BillingAddress.Number`              | Text     | 5       | No                  | Buyer's address number.                                                                                                           |
| `Customer.BillingAddress.Complement`          | Text     | 14      | No                  | Buyer's address complement.                                                                                                       |
| `Customer.BillingAddress.ZipCode`             | Text     | 9       | No                  | Buyer's address zip code.                                                                                                         |
| `Customer.BillingAddress.City`                | Text     | 50      | No                  | Buyer's address city.                                                                                                             |
| `Customer.BillingAddress.State`               | Text     | 2       | No                  | Buyer's address state.                                                                                                            |
| `Customer.BillingAddress.Country`             | Text     | 2       | No                  | Buyer's address country.                                                                                                          |
| `Customer.BillingAddress.District`            | Text     | 45      | No                  | Buyer's neighborhood.                                                                                                             |
| `Payment.Provider`                            | Text     | 15      | ---                 | Defines behavior of the payment method (see Annex)/NOT REQUIRED FOR CREDIT.                                                     |
| `Payment.Type`                                | Text     | 100     | Yes                 | Type of the payment method.                                                                                                       |
| `Payment.Amount`                              | Number   | 15      | Yes                 | Order Amount (to be sent in cents).                                                                                               |
| `Payment.Currency`                            | Text     | 3       | No                  | Currency in which payment will be made (BRL).                                                                                     |
| `Payment.Country`                             | Text     | 3       | No                  | Country where payment will be made.                                                                                               |
| `Payment.ServiceTaxAmount`                    | Number   | 15      | Yes                 | The total of the amount of the authorization to be allocated to the service charge. See Annex                                     |
| `Payment.Installments`                        | Number   | 2       | Yes                 | Number of Installments.                                                                                                           |
| `Payment.Interest`                            | Text     | 10      | No                  | Type of installment - Store (ByMerchant) or Card (ByIssuer).                                                                      |
| `Payment.Capture`                             | Boolean  | ---     | No                  | Boolean that identifies that the authorization should be with automatic capture.                                                  |
| `Payment.Authenticate`                        | Boolean  | ---     | No                  | Defines whether the buyer will be directed to the Issuing bank for card authentication                                            |
| `Payment.SoftDescriptor`                      | Text     | 13      | No                  | Text that will be printed on the carrier’s bank invoice - Available only for VISA/MASTER - does not allow special characters.     |
| `CreditCard.CardNumber`                       | Text     | 16      | Yes                 | Buyer’s Card Number.                                                                                                              |
| `CreditCard.Holder`                           | Text     | 25      | Yes                 | Buyer’s name printed on card.                                                                                                     |
| `CreditCard.ExpirationDate`                   | Text     | 7       | Yes                 | Expiry date printed on card.                                                                                                      |
| `CreditCard.SecurityCode`                     | Text     | 4       | Yes                 | Security code printed on back of card - See Annex.                                                                                |
| `CreditCard.SaveCard`                         | Boolean  | ---     | No                  | Boolean that identifies whether the card will be saved to generate the CardToken.                                                 |
| `CreditCard.Brand`                            | Text     | 10      | Yes                 | Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).                                            |
| `CreditCard.SaveCard`                         | Boolean  | ---     | No (Default false)  | Boolean that identifies whether the card will be saved to generate the CardToken.                                                 |
| `FraudAnalysis.Provider`                      | Text     | 14      | Yes                 | Fixed "cybersource"                                                                                                               |
| `FraudAnalysis.Sequence`                      | Text     | 14      | Yes                 | Flow type to perform the fraud analysis. First Analyze (AnalyzeFirst) or First Authorization (AuthorizeFirst)                     |
| `FraudAnalysis.SequenceCriteria`              | Text     | 9       | Yes                 | Flow criterion. **OnSuccess** - Only performs the analysis if it succeeds in the transaction. **Always** - Always perform the analysis.|
| `FraudAnalysis.CaptureOnLowRisk`              | Boolean  | ---     | No                  | When true, the authorization must be with automatic capture when the risk of fraud is considered to be low (Accept). In cases of Reject or Review, the flow stays the same, then, the capture will happen according to the value specified in the "Capture" parameter. To use this parameter, the sequence of the risk analysis flow must be "AuthorizeFirst". Because it depends on the risk analysis report, this parameter will only take effect when the Anti-Fraud service is hired. |
| `FraudAnalysis.VoidOnHighRisk`                | Boolean  | ---     | No                  | When true, the repayment of payment should happen automatically when the risk of fraud is considered high (Reject). In cases of Accept or Review, the flow remains the same, the, the repayment of payment must be done manually. To use this parameter, the sequence of the risk analysis flow must be "AuthorizeFirst". Because it depends on the risk analysis report, this parameter will only take effect when the Anti-Fraud service is hired. |
| `FraudAnalysis.TotalOrderAmount`              | Number   | 15      | Yes                 | Order Amount.                                                                                                                     |
| `FraudAnalysis.FingerPrintId`                 | Text     | 50      | Yes                 | Identifier used to cross information obtained by the internet browser with the data sent for analysis. This same value must be passed in the SESSIONID variable of the DeviceFingerPrint script. |
| `FraudAnalysis.Browser.CookiesAccepted`       | Boolean  | ---     | Yes                 | Boolean to identify if the client browser accepts cookies.                                                                        |
| `FraudAnalysis.Browser.Email`                 | Text     | 100     | No                  | E-mail registered in the buyer's browser.                                                                                         |
| `FraudAnalysis.Browser.HostName`              | Text     | 60      | No                  | Host name where the buyer was before entering the store's website.                                                                |
| `FraudAnalysis.Browser.IpAddress`             | Text     | 15      | Yes                 | IP address of the buyer. We strongly recommend sending this field.                                                                |
| `FraudAnalysis.Browser.Type`                  | Text     | 40      | No                  | Browser's name used by the buyer.                                                                                                 |
| `FraudAnalysis.Cart.IsGift`                   | Boolean  | ---     | No                  | Boolean that indicates whether the order is for gift or No.                                                                           |
| `FraudAnalysis.Cart.ReturnsAccepted`          | Boolean  | ---     | No                  | Boolean that defines whether returns are accepted for the order.                                                                      |
| `FraudAnalysis.Cart.Items.GiftCategory`       | Text     | 9       | No                  |Field that will evaluate the billing and delivery addresses for different cities, states or countries.<br> _“Yes”_ (In case of divergence between billing and delivery addresses, mark as small risk) <br>_“No”_ (In case of divergence between billing and delivery addresses, high risk mark)<br> _“Off”_ (Ignores risk analysis for divergent addresses)|
| `FraudAnalysis.Cart.Items.HostHedge`          | Text     | ---     | No                  | Level of importance of the e-mail and IP addresses of the clients at risk of scoring. <br> _"Low"_ (Low importance of e-mail and IP address in risk analysis) <br> _"Normal"_ (Average importance of the e-mail and IP address in risk analysis) <br> _"High"_ (High importance of the email and IP address in risk analysis) <br>_“Off”_(Email and IP address do not affect the risk analysis) |
| `FraudAnalysis.Cart.Items.NonSensicalHedge`   | Text     | 6       | No                  | Level of the tests performed on the buyer's data with nonsense orders <br> _"Low"_ (Low importance of the verification made on the buyer's order, in the risk analysis) <br> _ "Normal" _ (Average importance of the verification made on the request of the buyer, in the risk analysis) <br> _ "High" (High importance of the verification made on the request of the buyer, in the risk analysis) <br> _ "Off" _ (Verification of buyer's request Does not affect risk analysis)|
| `FraudAnalysis.Cart.Items.ObscenitiesHedge`   | Text     | 6       | No                  | Level of obscenity of the received orders. <br> _"Low"_ (Low importance of obscene verification of buyer's order in risk analysis) <br> _"Normal"_ (Average importance of obscene verification of buyer's order in risk analysis) <br> _"High"_ (High importance of obscene verification of buyer's order in risk analysis) <br> _"Off"_ (Obscenity check at buyer's order does not affect risk analysis) |
| `FraudAnalysis.Cart.Items.PhoneHedge`         | Text     | 6       | No                  | Level of tests performed on phone numbers. <br>_"Low"_ (Low importance on the tests performed with phone numbers) <br> _"Normal"_ (Average importance on tests performed with telephone numbers) <br> _"High"_ (High importance on the tests performed with phone numbers) <br> _"Off"_ (Phone numbers tests do not affect risk analysis)|
| `FraudAnalysis.Cart.Items.Name`               | Text     | 255     | Yes                 | Product's name.                                                                                                                 |
| `FraudAnalysis.Cart.Items.Quantity`           | Number   | 15      | Yes                 | Product's amount to be purchased.                                                                                           |
| `FraudAnalysis.Cart.Items.Sku`                | Text     | 255     | Yes                 | Merchant code identifier of the product.                                                                                     |
| `FraudAnalysis.Cart.Items.UnitPrice`          | Number   | 15      | Yes                 | Unit price of the product.                                                                                                      |
| `FraudAnalysis.Cart.Items.Risk`               | Text     | 6       | No                  | Product risk level. <br> Low (The product has a history of few chargebacks) <br> Normal (The product has a history of chargebacks considered normal) <br> High (The product has a history above average of chargebacks) |
| `FraudAnalysis.Cart.Items.TimeHedge`          | Text     | -       | No                  | Level of importance of the time of the day of the customer's order. <br> Low (Low importance on the time of day when the purchase was made, for the risk analysis) <br> Normal (Average importance on the time of day when the purchase was made, for the risk analysis) <br> High (High importance on the time of the day the purchase was made, for the risk analysis) <br> Off (Purchase time does not affect risk analysis) |
| `FraudAnalysis.Cart.Items.Type`               | Text     | -       | No                  | Type of product. <br>AdultContent(Adult content) <br>Coupon(Promotional code) <br> Default (Default option for analysis in CyberSource when no other value is selected) <br> EletronicGood (Electronic product) <br>EletronicSoftware (Software distributed electronically via download) <br> GiftCertificate (Gift voucher) <br> HandlingOnly (Installation fee or handling) <br>ShippingOnly (Freight) <br>Subscription (Subscription)|
| `FraudAnalysis.Cart.Items.VelocityHedge`      | Text     | 6       | No                  | Customer purchase frequency importance level. <br> Low (Low importance in the number of purchases made by the customer in the last 15 minutes) <br>Normal (Average importance in the number of purchases made by the customer in the last 15 minutes) <br>High (High importance in the number of purchases made by the customer in the last 15 minutes) <br> Off (The frequency of purchases made by the customer does not affect fraud analysis)|
| `FraudAnalysis.Cart.Items.Passenger.Email`    | Text     | 255     | No                  | Passenger's e-mail. |
| `FraudAnalysis.Cart.Items.Passenger.Identity` | Text     | 32      | No                  | Passenger's id to who the check-in was issued.                                                                                  |
| `FraudAnalysis.Cart.Items.Passenger.Name`     | Text     | 120     | No                  | Passenger's name.                                                                                                               |
| `FraudAnalysis.Cart.Items.Passenger.Rating`   | Text     | -       | No                  | Passenger's classification. <br>Field Values: "Adult" (Adult passenger) <br>"Child" (Child passenger) <br> "Infant" (Child Passenger) <br>"Youth" (Teenage passenger) <br>"Student" (Student passenger) <br>"SeniorCitizen" (Old passenger) <br>"Military" (Military passenger)|
| `FraudAnalysis.Cart.Items.Passenger.Phone`    | Text     | 15      | No                  | Passenger phone number. For orders outside the U.S., CyberSource recommends that you include the country code. 552133665599 (Ex. Country Code 55, City Code 21, Phone 33665599) |
| `FraudAnalysis.Cart.Items.Passenger.Status`   | Text     | 32      | No                  | Airline classification. You can use values ​​such as Gold or Platinum. |
| `FraudAnalysis.MerchantDefinedFields.Id`      | Text     | ---     | Yes (if applicable) | Id of the additional information to send.                                                                                  |
| `FraudAnalysis.MerchantDefinedFields.Value`   | Text     | 255     | Yes (if applicable) | Value of the additional information to send.                                                                              |
| `FraudAnalysis.Shipping.Addressee`            | Text     | 255     | No                  | Delivery recipient name                                                                                               |
| `FraudAnalysis.Shipping.Method`               | Text     | -       | No                  | Type of product delivery service. <br>"SameDay" (Same day delivery service) <br> "OneDay" (Night or next day delivery service) <br>"TwoDay" (Two-Day Delivery Service) <br>“ThreeDay” (Three delivery service)<br> "LowCost" (Low cost delivery service) <br>"Pickup" (Product withdrawn from the store) <br> "Other" (Other delivery method) <br> "None" (No delivery service, as it is a service or subscription) |
| `FraudAnalysis.Shipping.Phone`                | Text     | 15      | No                  |Phone number of the delivery recipient. Ex. 552133665599 (Country Code 55, City Code 21, Phone 33665599) |
| `FraudAnalysis.Travel.JourneyType`            | Text     | 32      | Yes, if the Travel node is sent.| Trip type                                                                                                  |
| `FraudAnalysis.Travel.DepartureTime`          | DateTime | 23      | No                  | Date, hour and minute of flight departure. Ex: "2018-01-09 18:00:00"                                                               |
| `FraudAnalysis.Travel.Passengers.Name`        | Text     | 120     | Yes, if the Travel node is sent.| Passenger's name.                                                                                                |
| `FraudAnalysis.Travel.Passengers.Identity`    | Text     | 32      | Yes, if the Travel node is sent.| RG, CPF or CNPJ of the passenger.                                                                       |
| `FraudAnalysis.Travel.Passengers.Status`      | Text     | 32      | Yes, if the Travel node is sent.| Airline Classification. Field values: "Gold", "Platinum".                                     |
| `FraudAnalysis.Travel.Passengers.Rating`      | Text     | 15      | Yes, if the Travel node is sent.| Passenger's classification. <br>Field Values: "Adult" (Adult passenger) <br>"Child" (Child passenger) <br> "Infant" (Child Passenger) <br>"Youth" (Teenage passenger) "Student" (Student passenger) <br>"SeniorCitizen" (Old passenger) <br>"Military" (Military passenger)|
| `FraudAnalysis.Travel.Passengers.Email`       | Text     | 255     | Yes, if the Travel node is sent.| Passenger's e-mail.                                                                                              |
| `FraudAnalysis.Travel.Passengers.Phone`       | Text     | 15      | No                  | Passenger phone number. For orders outside the U.S., CyberSource recommends that you include the country code. 552133665599 (Ex. Country Code 55, City Code 21, Phone 33665599) |
| `FraudAnalysis.Travel.Passengers.TravelLegs.Origin`|Text| 3       | Yes, if the Travel node is sent.| Departure airport code.                                                                 |
| `FraudAnalysis.Travel.Passengers.TravelLegs.Destination`|Text| 3  | Yes, if the Travel node is sent.| Arrival airport code.                                                                |

### Response

```json
{
    "MerchantOrderId":"201411173454307",
    "Customer": {
        "Name":"Comprador crédito AF",
        "Identity":"12345678909",
        "IdentityType":"CPF",
        "Email":"compradorteste@live.com",
        "Birthdate":"1991-01-02",
        "Phone": "552125553669",
        "Address": {
            "Street":"Rua Júpter",
            "Number":"174",
            "Complement":"AP 201",
            "ZipCode":"21241140",
            "City":"Rio de Janeiro",
            "State":"RJ",
            "Country":"BRA",
            "District":"Alphaville"
        },
        "DeliveryAddress": {
            "Street":"Rua Júpter",
            "Number":"174",
            "Complement":"AP 201",
            "ZipCode":"21241140",
            "City":"Rio de Janeiro",
            "State":"RJ",
            "Country":"BRA",
            "District":"Alphaville"
        },
        "BillingAddress": {
            "Street":"Rua Júpter",
            "Number":"174",
            "Complement":"AP 201",
            "ZipCode":"21241140",
            "City":"Rio de Janeiro",
            "State":"RJ",
            "Country":"BRA",
            "District":"Alphaville"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "402400******2931",
            "Holder": "Teste accept",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "492115",
        "Tid": "10069930692606D31001",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "FraudAnalysis": {
        "Provider":"cybersource",
            "Sequence": "AuthorizeFirst",
            "SequenceCriteria": "OnSuccess",
            "FingerPrintId": "074c1ee676ed4998ab66491013c565e2",
            "MerchantDefinedFields": [
                {
                    "Id": 95,
                    "Value": "Eu defini isso"
                }
            ],
            "Cart": {
                "IsGift": false,
                "ReturnsAccepted": true,
                "Items": [
                    {
                        "Type": "AdultContent",
                        "Name": "ItemTeste",
                        "Risk": "High",
                        "Sku": "201411170235134521346",
                        "UnitPrice": 123,
                        "Quantity": 1,
                        "HostHedge": "Off",
                        "NonSensicalHedge": "Off",
                        "ObscenitiesHedge": "Off",
                        "PhoneHedge": "Off",
                        "TimeHedge": "Normal",
                        "VelocityHedge": "High",
                        "GiftCategory": "Undefined",
                        "Passenger": {
                            "Name": "Comprador accept",
                            "Identity": "1234567890",
                            "Status": "Accepted",
                            "Rating": "Adult",
                            "Email": "compradorteste@live.com",
                            "Phone": "999994444"
                        }
                    }
                ]
            },
            "Travel": {
                "Route": "MAO-RJO",
                "DepartureTime": "2010-01-02T00:00:00",
                "JourneyType": "Ida",
                "Legs": [
                    {
                        "Destination": "GYN",
                        "Origin": "VCP"
                    }
                ]
            },
            "Browser": {
                "HostName": "Teste",
                "CookiesAccepted": false,
                "Email": "compradorteste@live.com",
                "Type": "Chrome",
                "IpAddress": "200.190.150.350"
            },
            "Shipping": {
                "Addressee": "Sr Comprador Teste",
                "Phone": "21114740",
                "Method": "LowCost"
            },
            "Id": "0e4d0a3c-e424-4fa5-a573-4eabbd44da42",
            "Status": 1,
            "ReplyData": {
                "AddressInfoCode": "COR-BA^MM-BIN",
                "FactorCode": "B^D^R^Z",
                "Score": 42,
                "BinCountry": "us",
                "CardIssuer": "FIA CARD SERVICES, N.A.",
                "CardScheme": "VisaCredit",
                "HostSeverity": 1,
                "InternetInfoCode": "FREE-EM^RISK-EM",
                "IpRoutingMethod": "Undefined",
                "ScoreModelUsed": "default_lac",
                "CasePriority": 3
            }
        },
        "PaymentId": "04096cfb-3f0a-4ece-946c-3b7dc5d38f19",
        "Type": "CreditCard",
        "Amount": 100,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Transação autorizada",
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

| Property                  | Description                                                                                                                                        | Type   | Size    | Format                                              |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|--------|---------|-----------------------------------------------------|
| `ProofOfSale`             | Authorization number, identical to NSU.                                                                                                            | Text   | 6       | Alphanumeric text                                  |
| `Tid`                     | Transaction Id on the acquirer.                                                                                                                    | Text   | 20      | Alphanumeric text                                  |
| `AuthorizationCode`       | Authorization code.                                                                                                                                | Text   | 6       | Alphanumeric text                                  |
| `SoftDescriptor`          | Text that will be printed on the carrier’s bank invoice - Available only for VISA/MASTER - does not allow special characters                       | Text   | 13      | Alphanumeric text                                  |
| `PaymentId`               | Order Identifier Field.                                                                                                                            | Guid   | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                |
| `Id`                      | Identification of the Transaction in the antifraud.                                                                                                | Text   | 300     | Alphanumeric text                                  |
| `Status`                  | Transaction Status.                                                                                                                                | Byte   | ---     | 2                                                   |
| `Score`                   | Total score calculated for the order. Goes from 0 the 100 - The higher, the greater the risk.                                                      | Number | ---     | Number                                              |
| `BinCountry`              | Initials of the country of origin of the purchase.                                                                                                 | Text   | 2       | us                                                  |
| `CardIssuer`              | Name of the bank or issuer of the card.                                                                                                            | Text   | 128     | Bradesco                                            |
| `ScoreModelUsed`          | Name of the used score model.                                                                                                                      | Text   | 20      | Ex: default_lac                                     |
| `CasePriority`            | If the merchant is subscribe to Enhanced Case Management, it receives this value with the priority level, with 1 being the highest and 5 being the lowest. | Number | ---     | 3                                                   |
| `ReturnCode`              | Return code of acquiring.                                                                                                                          | Text   | 32      | Alphanumeric text                                  |
| `ReturnMessage`           | Return message of Acquiring.                                                                                                                       | Text   | 512     | Alphanumeric text                                  |
| `HostSeverity`            | Risk level of the buyer's e-mail domain, from 0 to 5, where 0 is undetermined risk and 5 represents the highest risk.                              | Number | ---     | 5                                                   |
| `CardScheme`              | Issuer type                                                                                                                                        | Text   | 20      | Ver Tabela **CardScheme**                           |
| `InternetInfoCode`        | Sequence of codes that indicate that there is an excessive change of buyer identities. The codes are concatenated using the ^ character.           | Text   | 255     | Ver tabela **InternetInfoCode**                     |
| `FraudAnalysisReasonCode` | Analysis result.                                                                                                                                   | Byte   | ---     | Ver tabela **FraudAnalysisReasonCode**              |
| `AddressInfoCode`         | Combination of codes indicating error in the billing address and / or delivery. The codes are concatenated using the ^ character.                  | Text   | 255     | Ex: COR-BA^MM-BIN -> Ver tabela **AddressInfoCode** |
| `FactorCode`              | Combination of codes that indicate the order's score. The codes are concatenated using the ^ character.                                            | Text   | 100     | Ex: B^D^R^Z -  Ver tabela **FactorCode**            |
| `IpRoutingMethod`         | Type of IP routing used by the computer.|Text|---|<BR>Anonymizer<BR>AolBased<BR>CacheProxy<BR>Fixed<BR>InternationalProxy<BR>MobileGateway<BR>Pop<BR>RegionalProxy<BR>Satellite<BR>SuperPop<BR>|

## AF Tables

### Status do AF

> The status below are displayed in the Backoffice of the Cielo E-Commerce API, inside the Cielo website

|Field|Description|
|---|---|
|Started|Transaction received by Cielo.|
|Accept|Transaction accepted after fraud analysis.|
|Review|Transaction under review after fraud analysis.|
|Reject|Transaction rejected after fraud analysis.|
|Unfinished|Transaction not finalized due to some internal error in the system.|
|Pendent|Transaction waiting for analysis|
|ProviderError|Transaction with error in antifraud provider.|

### FraudAnalysis.Items

#### GiftCategory

|Field|Description|
|---|---|
|Yes|In case of divergence between billing and delivery addresses, mark as small risk.|
|No|In case of divergence between billing and delivery addresses, mark as high risk.|
|Off|Ignores risk analysis for divergent addresses.|

#### HostHedge

|Field|Description|
|---|---|
|Low|Low importance of e-mail and IP address in risk analysis.|
|Normal|Average importance of e-mail and IP address in risk analysis.|
|High|High importance of e-mail and IP address in risk analysis.|
|Off|E-mail and IP address do not affect the risk analysis.|

#### NonSensicalHedge

|Field|Description|
|---|---|
|Low|Low importance of the verification made on the buyer's order, in the risk analysis.|
|Normal|Average importance of the verification made on the buyer's order, in the risk analysis.|
|High|High importance of the verification made on the buyer's order, in the risk analysis.|
|Off|Verification of buyer's order does not affect risk analysis.|

### FraudAnalysis.Cart

#### ObscenitiesHedge

|Field|Description|
|---|---|
|Low|Low importance of obscenities verification of buyer's order, in the risk analysis.|
|Normal|Average importance of obscenities verification of buyer's order, in the risk analysis.|
|High|High importance of obscenities verification of buyer's order, in the risk analysis.|
|Off|Obscenity verification of buyer's order does not affect risk analysis.|

#### PhoneHedge

|Field|Description|
|---|---|
|Low|Low importance on tests performed with telephone numbers.|
|Normal|Average importance on tests performed with telephone numbers.|
|High|High importance on tests performed with telephone numbers.|
|Off|Phone number tests do not affect risk analysis.|

#### Risk

|Field|Description|
|---|---|
|Low|The product has a history of few chargebacks.|
|Normal|The product has a history of chargebacks considered normal.|
|High|Product has an above average chargeback history.|

#### TimeHedge

|Field|Description|
|---|---|
|Low|Low importance of the time of day when the purchase was made, for the risk analysis.|
|Normal|Average importance of the time of day when the purchase was made, for the risk analysis.|
|High|High importance of the time of day when the purchase was made, for the risk analysis.|
|Off|Purchase time does not affect risk analysis.|

#### Type

|Field|Description|
|---|---|
|CN|Private buyer|
|CP|Business buyer|

#### VelocityHedge

|Field|Description|
|---|---|
|Low|Low importance on the number of purchases made by the customer in the last 15 minutes.|
|Normal|Average importance on the number of purchases made by the customer in the last 15 minutes.|
|High|High importance on the number of purchases made by the customer in the last 15 minutes.|
|Off|The frequency of purchases made by the customer does not affect the fraud analysis.|

#### Rating

|Field|Description|
|---|---|
|Adult|Adult passenger.|
|Child|Child passenger.|
|Infant|Infant passenger.|
|Youth|Teenage passenger.|
|Student|Student passenger.|
|SeniorCitizen|Elderly passenger.|
|Military|Military passenger.|

### FraudAnalysis.Shipping

#### Method

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

### FraudAnalysis.ReplyData

#### CardScheme

| Issuer type            | Description           |
|------------------------|-----------------------|
| `MaestroInternational` | International Maestro |
| `MaestroUkDomestic`    | Domestic UK Maestro   |
| `MastercardCredit`     | Credit MasterCard     |
| `MastercardDebit`      | Debit MasterCard      |
| `VisaCredit`           | Credit Visa           |
| `VisaDebit`            | Debit Visa            |
| `VisaElectron`         | Visa Electron         |

#### AddressInfoCode

| Type       | Description                                                                         |
|------------|-------------------------------------------------------------------------------------|
| `COR-BA`   | The billing address can be normalized                                               |
| `COR-SA`   | The delivery address can be normalized                                              |
| `INTL-SA`  | The delivery country is out side of the U.S                                         |
| `MIL-USA`  | This is a military address in the U.S.                                              |
| `MM-A`     | Billing and delivery addresses use different street names                           |
| `MM-BIN`   | The BIN of the card (the first six digits of the number) does not match the country |
| `MM-C`     | Billing and delivery addresses use different cities                                 |
| `MM-CO`    | Billing and delivery addresses use different countries                              |
| `MM-ST`    | Billing and delivery addresses use different states                                 |
| `MM-Z`     | Billing and delivery addresses use different postal codes                           |
| `UNV-ADDR` | The address is unverifiable                                                         |

#### InternetInfoCode

|Type|Description|
|---------|----------------------------------------------------------------------------------------------------|
|`MORPH-B`|The same billing address has been used multiple times with multiple customer identities|
|`MORPH-C`|The same account number has been used multiple times with multiple client identities|
|`MORPH-E`|The same e-mail address has been used multiple times with multiple customer identities|
|`MORPH-I`|The same IP address has been used multiple times with multiple customer identities|
|`MORPH-P`|The same phone number has been used multiple times with multiple customer identities|
|`MORPH-S`|The same delivery address has been used multiple times with multiple customer identities|

#### FraudAnalysisReasonCode

| Type  | Description                                                                                                                                                                                                                                                                                                                                               |
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `100` | Operation successful.                                                                                                                                                                                                                                                                                                                                     |
| `101` | The request is missing one or more required fields. Possible action: See the missing fields in the AntiFraudResponse.MissingFieldCollection list. Resend the request with the complete information.                                                                                                                                                       |
| `102` | One or more of the fields in the request contain invalid data. Possible action: View the invalid fields in the AntiFraudResponse.InvalidFieldCollection list. Resend the order with the correct information.                                                                                                                                              |
| `150` | General system failure. Possible action: Wait a few minutes and try resending the request.                                                                                                                                                                                                                                                                |
| `151` | The request was received, but a time-out occurred on the server. This error does not include time-out between the client and the server. Possible action: Wait a few minutes and try resending the request.                                                                                                                                               |
| `152` | The request was received, but a time-out occurred. Possible action: Wait a few minutes and resubmit the request.                                                                                                                                                                                                                                          | 
| `202` | Fraud Prevention declined the request because the card has expired. You can also receive this code if the expiry date does not match the date on file of the issuing bank. If the payment processor allows you to issue credits to expired cards, CyberSource does not allow this functionality. Possible action: Request a card or other form of payment.|
| `231` | The account number is invalid. Possible action: Request a card or other payment method.|                                                                                                                                                                                                                                                                  |
| `234` | There is a problem with the merchant configuration. Possible action: Do not send the request. Get in touch with the Customer Support to correct the configuration problem.                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                    |
| `400` | The fraud rate exceeds its limit. Possible action: Review the customer's request.                                                                                                                                                                                                                                                                         |
| `480` | The request has been marked for review by the Decision Manager.                                                                                                                                                                                                                                                                                           |
| `481` | The request was rejected by the Decision Manager.                                                                                                                                                                                                                                                                                                         |

#### FactorCode

| Type | Description                                                                                                                                                                                  |                          
|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|                                                                                                                                                                                                    
| `A`  | Excessive address change. The customer has changed the billing address two or more times in the last six months.                                                                             |
| `B`  | BIN of the card or risk authorization. Risk factors are related to credit card BIN and / or card authorization checks.                                                                       |
| `C`  | Elevated credit card numbers. The customer has used more than six credit card numbers in the last six months.                                                                                |      
| `D`  | Impact of email address. The customer uses a free email provider or the email address is risky.                                                                                              |        
| `E`  | Positive list. The customer is on your positive list.                                                                                                                                        |                       
| `F`  | Negative list. The account number, address, e-mail, or IP address for this purpose appears on your negative list.                                                                            |                
| `G`  | Geolocation inconsistencies. The email client's domain, phone number, billing address, shipping address, or IP address is suspect.                                                           |
| `H`  | Excessive name changes. The customer has changed the name two or more times in the last six months.                                                                                          |                            
| `I`  | Internet inconsistencies. The IP address and email domain are not consistent with the billing address.                                                                                       |            
| `N`  | Meaningless entrance. The client name and the address fields contain nonsense words or language.                                                                                             |                   
| `O`  | Obscenities. Customer data contains obscene words.                                                                                                                                           |                  
| `P`  | Morphing identity. Multiple values ​​of an identity element are linked to a value of a different identity element. For example, multiple phone numbers are linked to a single account number.  |
| `Q`  | Phone inconsistencies. The customer's phone number is suspect.                                                                                                                               |            
| `R`  | Risky order. The transaction, the customer, and the merchant show correlated risk information.                                                                                               |           
| `T`  | Coverage Time. The customer is attempting an order outside of the expected time.                                                                                                             |                           
| `U`  | Unverifiable address. The billing or delivery address can not be verified.                                                                                                                   |        
| `V`  | Velocity. The account number has been used many times in the last 15 minutes.                                                                                                                |                          
| `W`  | Marked as suspect. The billing or delivery address is similar to an address previously marked as suspicious.                                                                                 |    
| `Z`  | Invalid value. The request contains an unexpected value, a default value has been replaced. Although the transaction can still be processed, examine the request carefully for any anomalies.|

## Device FingerPrint

### What is D.FingerPrint

The Device FingerPrint is a javascript that once installed at the store checkout captures browsing data and information about the equipment used in the purchase. This information is used by AF to identify buyer non-standard purchases.

### Configuring FingerPrint

It will be necessary to add two tags, the _script_ inside the _head_ tag for a correct performance and the _noscript_ inside the _body_ tag, so that the data collection of the device is performed even if the Javascript of the browser is disabled.

> **IMPORTANT:** If the 2 code segments are not placed on the checkout page, the results may not be accurate.

#### Domain

|Environment|Description|
|-|-|
|**Testing**| Use **h.online-metrix.net**,which is the DNS of the fingerprint server, as shown in the HTML example below|
|**Production**| Change the domain to a local URL, and configure your web server to redirect this URL to**h.online-metrix.net**|

#### Variables

| Variable               | Description                                                                                     | SuperMID                              | Hierarchy                                 |
|------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------|-------------------------------------------|
| **ProviderOrgId**      | Sandbox = 1snn5n9w<br>Production = k8vif92e                                                     | Use default value `k8vif92e`          | Data provided exclusively by CyberSource  |
| **ProviderMerchantId** | Identificador da sua loja na Cybersource. Caso não possua, entre em contato com a Cielo         | Use o valor padrão `cielo_webservice` | Data provided exclusively by CyberSource  |
| **ProviderIdentifier** | Identifier used to cross information obtained from the buyer's device.This same identifier must be assigned to the field `Customer.BrowserFingerprint` which will be sent at the request of the analysis. <br>Example: 123456789<br> Note: This identifier can be any value or order number, but must be unique for 48 hours. Defined by store | Defined by store |

> **Note:** The result of the concatenation between the field `ProviderMerchantId` and `ProviderIdentifier`, dmust be assigned to the field session_id of the  scripts that will be included on the checkout page.

![]({{ site.baseurl_root }}/images/apicieloecommerce/exemploscriptdfp.png)

> **IMPORTANT:** Be sure to copy all data correctly and have replaced the variables correctly by their values.

#### Configuring your Web Server

All objects refer to h.online-metrix.net,which is the DNS of the fingerprint server. When you are ready for production, you must change the server name to a local URL, and configure a URL redirection on your web server to h.online-metrix.net.

> **IMPORTANT:** If you do not complete this section, you will not receive correct results, and the fingerprint provider's domain (URL) will be visible, and your consumer is more likely to block it.

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

These are payments normally found on **signatures**, where the buyer wants to be automatically charged but does not want to re-enter the credit card details.

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

In all instances, the scheduled recurrence is a standard transaction for Cielo, its only difference being the need to send an additional parameter that defines it as **Own Recurrence**

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

<aside class="notice"><strong>Warning:</strong> In this recurrence mode, the first transaction must be

 of. All subsequent transactions will be automatically captured.</aside>

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
|`Payment.ServiceTaxAmount`|Number|15|No|[See Annex](https://developercielo.github.io/Webservice-3.0/#anexos)|
|`CreditCard.CardNumber`|Text|19|Yes|Buyer's Card Number.|
|`CreditCard.Holder`|Text|25|No|Buyer's name printed on card.|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiry date printed on card.|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`CreditCard.SaveCard`|Boolean|---|No (Default false)|Boolean that identifies whether the card will be saved to generate the CardToken.|
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|

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
|`ProofOfSale`|Authorization number, identical to NSU.|Text|6|Alphanumeric texto|
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

The BIN Checker is credit or debit card data search service, that Cielo Ecommerce merchants can use to validate whether the screen filled data on the card is valid. The service return the following data on the card:

* **Card Brand**
* **Card Type:**Credit, Debit or Multiple (Credit and Debit)
* **Card Nationality:** Foreign or national (Brazil)

This information makes it possible to take some actions on the checkout and increase the conversion rate.

<aside class="warning">BIN Check must be enabled by Cielo Support Team. Contact them to enable the service.</aside>

## Use Case

See an use case example: **BIN Checker + cart recovery**

Knowing the Bin checker of the Cielo Ecommerce API, how could it prevent the loss of carts?

It can apply the bin checker bins and 3 scenarios!

1. Prevent errors with card type
2. Offer online car recovery
3. Alert about international cards
4. Prevent errors with card type

The Submersible can use the bins checker in the cart to identify 2 of the major errors in completing payment forms:

* **Wrong issuer** and confuse credit card with debit ○ Wrong issuer: When filling out the payment form, it is possible to conduct a checker and set the correct issuer. This is a much safer method than based on algorithms in the form, since the base of the bins are checked is that of the card issuing flag.

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
|`BIN`|First 6 digits of the payment card<br>_To simulate the request obtaining `ForeignCard=false` result, the third digit must be 1 and the fifth must not be 2 or 3.<br>Examples:001040, 501010, 401050_ |

``` json
https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/420020
```

### Response

``` json
{
"Status": "00",
"Provider": "Visa",
"CardType": "Credit",
"ForeignCard": "true"
}
```

| Parameter     | Type  | Size | Description                                                                                                                                                       |
|---------------|-------|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Status`      | Text  | 2    | BIN Check status response: <br><br> 00 – Analysis authorized <br> 01 – Brand not supported<br> 02 – Card not supported for BIN Check<br> 73 – Blocked Affiliation |
| `Provider`    | Text  | 255  | Card Brand                                                                                                                                                        |
| `CardType`    | Text  | 20   | Card Type : <br><br> Credit <br> Debit <br>Multiple                                                                                                               |
| `ForeingCard` | Text  | 255  | If card was issued abroad (False/True)                                                                                                                            |

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

Zero Auth supports the following flags/Card Brands:

* **Visa**
* **MasterCard**
* **Elo**

> If other flags/Brand are sent, the error **57-Bandeira inválida** will be displayed.

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

## Integration

In order to use Zero Auth, the merchant must send a `POST` request to the Cielo Ecommerce API, simulating a transaction. `POST` should be done at the following URLs:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://`api`.cieloecommerce.cielo.com.br/1/`zeroauth`</span></aside>

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
    "Brand":"Visa"
}
```

Below the fields returned after validation:

| Field              | Description                                                                                                               | Type      | Contact Us | Required       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|-----------|------------|----------------|
| `CardType`         | Defines the type of card used: <br> <br> *CreditCard* <br> *DebitCard* <br> <br> If not sent, CreditCard as default       | Text      | 255        | Yes             |
| `CardNumber`       | Card Number                                                                                                               | Text      | 16         | Yes            |
| `Holder`           | Buyer's name, printed on the card.                                                                                        | Text      | 25         | Yes             |
| `ExpirationDate`   | Expiration date.                                                                                                          | Text      | 7          | Yes            |
| `SecurityCode`     | Card Security code .                                                                                                      | Text      | 4          | Yes             |
| `SaveCard`         | Defines if the card must be tokenized                                                                                     | Boolean   | ---        | Yes             |
| `Brand`            | Card Brand: Visa <br> Master <br> ELO                                                                                     | Text      | 10         | Yes             |
| `CardToken`      | Card Token 3.0                                                                                               | GUID    | 36      | Conditional |

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

| Parameter       | Description                                                                     | Type    | Size    |
|-----------------|---------------------------------------------------------------------------------|---------|:-------:|
| `Valid`         | Card Status:<br> **True** - Valid card <BR>**False** – Invalid Card             | Boolean | ---     |
| `ReturnCode`    | Return code                                                                     | Text    | 2       |
| `ReturnMessage` | Return message                                                                  | Text    | 255     |
  
#### POSITIVE - Valid Card

``` json
{
        "Valid": true,
        "ReturnCode": “00”,
        "ReturnMessage", “Transacao autorizada”
}
```

| Field             | Description                                                                        | Type      | Contact Us |
| ----------------- | ------------------------------- -------------------------------------------------- | --------- | : -------: |
| `Valid`           | Card Status: <br> **True ** - Valid Card <BR> **False** - Invalid Card             | Boolean   | ---        |
| `ReturnCode`      | Return code                                                                        | text      | 2          |
| `ReturnMessage`   | Return message                                                                     | text      | 255        |

> See [**Integration Manual**](https://developercielo.github.io/en/manual/cielo-ecommerce) for more information about Return Codes.
> The return code **"00" represents success in Zero Auth**, the other codes are defined according to the above documentation.

#### NEGATIVE - Invalid Card

``` json
{
       "Valid": false,
       "ReturnCode": "57",
       "ReturnMessage": "Autorizacao negada"
}
```

#### NEGATIVE - Invalid Card - Brand not Supported

``` json
  {    
      "Code": 57,     
      "Message": "Bandeira inválida"   
  }
```

If there is any error in the flow, where it is not possible to validate the card, the service will return error:

* 500 - Internal Server Error

# Wallet

## What are Wallets

They are repositories of cards and payment data for online consumers. The digital wallets allow a consumer to register their payment data, thus streamlining the purchase process in authorized stores in their purchases for having only one registration.
To use wallets in the API Cielo eCommerce, the merchant must have the wallets integrated in their checkout. For more information, we suggest that you contact the technical department of the wallet that you wish to implement.

API Cielo eCommerce supports two payment wallets: VisaCheckout and Masterpass.

<aside class="notice"><strong>Warning:</strong> When the “Wallet” node is sent in the request, the “CreditCard” node becomes optional.</aside>

<aside class="notice"><strong>Warning:</strong> For debit card, when the “Wallet” node is sent in the request, the “DebitCard” node will be needed containing the “ReturnUrl”.</aside>

<aside class="notice"><strong>Warning:</strong>  For Visa Chekcout, the Wallet node can be sent only with the "Type", thus marking the transaction as being from wallet. In this context, the credit card must be sent. </aside>

## How to perform transaction with VisaCheckout

It is possible to carry out a transaction with VisaCheckout in two ways:

1. Without sending card data
2. Sending card data

### Request - Without Card data

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

### Response

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

### Request - With Card data

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
|`CreditCard.Brand`|Text|10|Yes|Card issuer (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard).|
|`CreditCard.SecurityCode`|Text|4|No|Security code printed on back of card - See Annex.|
|`Wallet.Type`|Text|255|Yes|indicates the wallet type: "VisaCheckout" or "Masterpass"|

### Response

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

## How to perform transaction with MasterPass

To use Masterpass it is necessary to contact directly with the Mastercard site: https://masterpass.com/pt-br/ e solicitar as credenciais.
More information and complete integration, you can find in the link: https://developer.mastercard.com/product/masterpass “

### Request

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

### Response

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

## Status

|Code|Status|Means of payment|Description|
|---|---|---|---|
|0|NotFinished|ALL|Waiting for status update|
|1|Authorized|ALL|Payment apt to be captured or defined as paid|
|2|PaymentConfirmed|ALL|Confirmed and finalized payment|
|3|Declined|CC + CD + TF|Payment declined by Authorizer|
|10|Voided|ALL|Canceled payment|
|11|Refunded|CC + CD|Payment canceled after 11:59 pm on the authorization day|
|12|Pending|ALL|Waiting for financial institution status|
|13|Aborted|ALL|Payment canceled due to processing failure|
|20|Scheduled|CC|Scheduled recurrence|

-

|Means of payment|Description|
|---|---|
|**ALL**|All|
|**CC**|Credit Card|
|**CD**|Debit Card|
|**TF**|Electronic Transfer|
|**BOL**|Bank slip|

## API Error Codes

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

## Sales Return Codes

|Response Code|Definition|Meaning|Action|Allows Retry|
|---|---|---|---|---|
|00|Successfully authorized transaction.|Successfully authorized transaction.|Successfully authorized transaction.|No|
|000|Successfully authorized transaction.|Successfully authorized transaction.|Successfully authorized transaction.|No|
|01|Unauthorized transaction. Referred transaction.|Unauthorized transaction. Referred (suspected fraud) by the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|02|Unauthorized transaction. Referred transaction.|Unauthorized transaction. Referred (suspected fraud) by the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|03|Transaction not allowed. Error in registering the establishment code in the TEF configuration file|Transaction not allowed. Invalid establishment. Contact Cielo.|Could not process transaction. Contact the Virtual Store.|No|
|04|Unauthorized transaction. Card blocked by issuing bank.|Unauthorized transaction. Card blocked by issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|05|Unauthorized transaction. Defaulting card (Do not honor).|Unauthorized transaction. Could not process transaction. Issue related to security, defaults or carrier limit.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|06|Unauthorized transaction. Card canceled.|Unauthorized transaction. Could not process transaction. Card permanently canceled by issuing bank.|Could not process transaction. Contact your issuing bank.|No|
|07|Transaction declined. Hold special condition card|Transaction not authorized by issuing bank rules.|Unauthorized transaction. Contact your issuing bank|No|
|08|Unauthorized transaction. Invalid security code.|Unauthorized transaction. Invalid security code. Orient the carrier to correct the data and try again.|Unauthorized transaction. Incorrect data. Review the data and enter again.|No|
|11|Successfully authorized transaction for card issued abroad|Successfully authorized transaction.|Successfully authorized transaction.|No|
|12|Invalid transaction, card error.|Could not process transaction. Ask the carrier to check the card data and try again.|Could not process transaction. Review the reported data and try again. If the error persists, contact your issuing bank.|No|
|13|Transaction not allowed. Invalid transaction value.|Transaction not allowed. Invalid value. Ask the carrier to review the data and try again. If the error persists, contact Cielo.|Unauthorized transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|14|Unauthorized transaction. Invalid Card|Unauthorized transaction. Invalid Card. It may be card locking at the issuing bank, incorrect data or card testing attempts. Use the Lhum Algorithm (Mod 10) to avoid unauthorized transactions for this reason. See www.cielo.com.br/desenvolvedores to deploy the Lhum Algorithm.|Could not process transaction. Review the reported data and try again. If the error persists, contact your issuing bank.|No|
|15|Issuing bank unavailable or non-existent.|Unauthorized transaction. Issuing bank unavailable.|Could not process transaction. Contact your issuing bank.|No|
|19|Redo the transaction or try again later.|Could not process transaction. Redo the transaction or try again later. If the error persists, contact Cielo.|Could not process transaction. Redo the transaction or try again later. If the error persists, contact the virtual store.|Only 4 times in 16 days.|
|21|Cancellation not done. Non-localized transaction.|Cancellation was not processed. If the error persists, contact Cielo.|Cancellation was not processed. Try again later. If the error persists, contact the virtual store.|No|
|22|Invalid installment. Invalid number of installments.|Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.|Could not process transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|23|Unauthorized transaction. Invalid installment value.|Could not process transaction. Invalid installment value. If the error persists, contact Cielo.|Could not process transaction. Invalid installment value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|24|Invalid number of installments.|Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.|Could not process transaction. Invalid number of installments. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|25|Request for authorization did not send card number|Could not process transaction. Request for authorization did not send the card number. If the error persists, check the communication between virtual store and Cielo.|Could not process transaction. Review the reported data and try again. If the error persists, contact the virtual store.|Only 4 times in 16 days.|
|28|File temporarily unavailable.|Could not process transaction. File temporarily unavailable. Review the communication between Virtual Store and Cielo. If the error persists, contact Cielo.|Could not process transaction. Contact the Virtual Store.|Only 4 times in 16 days.|
|30|Unauthorized transaction. Decline Message|Could not process transaction. Ask the carrier to review the data and try again. If the error persists, check that communication with Cielo is being made correctly.|Could not process transaction. Review the data and try again. If the error persists, contact the store.|No|
|39|Unauthorized transaction. Error at the issuing bank.|Unauthorized transaction. Error at the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|41|Unauthorized transaction. Card locked for loss.|Unauthorized transaction. Card locked for loss.|Unauthorized transaction. Contact your issuing bank.|No|
|43|Unauthorized transaction. Card locked for theft.|Unauthorized transaction. Card locked for theft.|Unauthorized transaction. Contact your issuing bank.|No|
|51|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|52|Card with invalid control digit.|Could not process transaction. Card with invalid control digit.|Unauthorized transaction. Review the reported data and try again.|No|
|53|Transaction not allowed. Invalid Savings card|Transaction not allowed. Invalid Savings card.|Could not process transaction. Contact your issuing bank.|No|
|54|Unauthorized transaction. Expired card|Unauthorized transaction. Expired card.|Unauthorized transaction. Redo the transaction confirming data.|No|
|55|Unauthorized transaction. Invalid password|Unauthorized transaction. Invalid password.|Unauthorized transaction. Contact your issuing bank.|No|
|57|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|58|Transaction not allowed. Invalid payment option.|Transaction not allowed. Invalid payment option. Review if the chosen payment option is enabled in the register|Unauthorized transaction. Contact your virtual store.|No|
|59|Unauthorized transaction. Suspected fraud.|Unauthorized transaction. Suspected fraud.|Unauthorized transaction. Contact your issuing bank.|No|
|60|Unauthorized transaction.|Unauthorized transaction. Try again. If the error persists the carrier should contact the issuing bank.|Could not process transaction. Try again later. If the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|61|Issuing bank unavailable.|Unauthorized transaction. Issuing bank unavailable.|Unauthorized transaction. Try again. If the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|62|Unauthorized transaction. Card restricted for home use|Unauthorized transaction. Card restricted for home use.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|63|Unauthorized transaction. Security breach|Unauthorized transaction. Security breach.|Unauthorized transaction. Contact your issuing bank.|No|
|64|Unauthorized transaction. Value below the minimum required by the issuing bank.|Unauthorized transaction. Contact your issuing bank.|Unauthorized transaction. Value below the minimum required by the issuing bank.|No|
|65|Unauthorized transaction. Exceeded the number of transactions for the card.|Unauthorized transaction. Exceeded the number of transactions for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|67|Unauthorized transaction. Card locked for shopping today.|Unauthorized transaction. Card locked for shopping today. Blocking may be due to excessive invalid attempts. Card will be automatically unlocked at midnight.|Unauthorized transaction. Card locked temporarily. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|70|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|72|Cancellation not done. Not enough available balance for cancellation.|Cancellation not done. Not enough available balance for cancellation. If the error persists, contact Cielo.|Cancellation not done. Try again later. If the error persists, contact the virtual store..|No|
|74|Unauthorized transaction. The password is expired.|Unauthorized transaction. The password is expired.|Unauthorized transaction. Contact your issuing bank.|No|
|75|Password locked. Exceeded card attempts.|Unauthorized transaction.|Your Transaction can not be processed. Contact your card issuer.|No|
|76|Cancellation not done. Issuer bank did not locate the original transaction|Cancellation not done. Issuer bank did not locate the original transaction|Cancellation not done. Contact the virtual store.|No|
|77|Cancellation not done. The original transaction was not found|Cancellation not done. The original transaction was not found|Cancellation not done. Contact the virtual store.|No|
|78|Unauthorized transaction. Locked card first use.|Unauthorized transaction. Locked card first use. Ask the carrier to unblock the card directly from their issuing bank.|Unauthorized transaction. Contact your issuing bank and request that the card to be unlocked.|No|
|80|Unauthorized transaction. Divergence on transaction/payment date.|Unauthorized transaction. Invalid transaction date or first payment date.|Unauthorized transaction. Redo the transaction confirming data.|No|
|82|Unauthorized transaction. Invalid card.|Unauthorized transaction. Invalid card. Ask the carrier to review the data and try again.|Unauthorized transaction. Redo the transaction confirming data. If the error persists, contact your issuing bank.|No|
|83|Unauthorized transaction. Error in password control|Unauthorized transaction. Error in password control|Unauthorized transaction. Redo the transaction confirming data. If the error persists, contact your issuing bank.|No|
|85|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|86|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|89|Transaction error.|Unauthorized transaction. Transaction error. The carrier must try again and if the error persists, contact the issuing bank.|Unauthorized transaction. Transaction error. Try again and if the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|90|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|91|Unauthorized transaction. Issuing bank temporarily unavailable.|Unauthorized transaction. Issuing bank temporarily unavailable.|Unauthorized transaction. Issuing bank temporarily unavailable. Contact your issuing bank.|Only 4 times in 16 days.|
|92|Unauthorized transaction. Communication time exceeded.|Unauthorized transaction. Communication time exceeded.|Unauthorized transaction. Temporarily unavailable communication. Contact the virtual store.|Only 4 times in 16 days.|
|93|Unauthorized transaction. Rule violation - Possible error in register.|Unauthorized transaction. Rule violation - Possible error in register.|Your transaction can not be processed. Contact the virtual store.|No|
|96|Processing failed.|Could not process transaction. Failure in Cielo's system. If the error persists, contact Cielo.|Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.|Only 4 times in 16 days.|
|97|Value not allowed for this transaction.|Unauthorized transaction. Value not allowed for this transaction.|Unauthorized transaction. Value not allowed for this transaction.|No|
|98|System/communication unavailable.|There was no request response within the set time.|The transaction may have been processed. To confirm, check the transaction by the store order number and evaluate whether it was actually processed.|Retry only after reviewing the original transaction by the order number and confirm that it was not processed.|
|99|System/communication unavailable.|Unauthorized transaction. Issuer system without communication. Try later. Can be error in SITEF, please check!|Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.|From the following day, only 4 times in 16 days.|
|999|System/communication unavailable.|Unauthorized transaction. Issuer system without communication. Try later. Can be error in SITEF, please check!|Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.|From the following day, only 4 times in 16 days.|
|AA|Time Exceeded|Time exceeded in communication with the issuing bank. Orient the carrier to try again, if the error persists it will be necessary for the carrier to contact their issuing bank.|Time exceeded in their communication with the issuing bank, try again later. If the error persists, contact your bank.|Only 4 times in 16 days.|
|AC|Transaction not allowed. Debit card being used as credit. Use the debit function.|Transaction not allowed. Debit card being used as credit. Ask the carrier to select the Debit Card payment option.|Unauthorized transaction. Try again by selecting the debit card payment option.|No|
|AE|Try later|Time exceeded in communication with the issuing bank. Orient the carrier to try again, if the error persists it will be necessary for the carrier to contact their issuing bank.|Time exceeded in their communication with the issuing bank, try again later. If the error persists, contact your bank.|Only 4 times in 16 days.|
|AF|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|AG|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
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
|BV|Unauthorized transaction. Expired card|Unauthorized transaction. Expired card.|Unauthorized transaction. Redo the transaction confirming data.|No|
|CF|Unauthorized transaction.C79:J79 Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|CG|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation faileds. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DA|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DF|Transaction not allowed. Invalid card or card failure.|Transaction not allowed. Invalid card or card failure. Ask the carrier to re-enter the card data, if the error persists, contact the bank|Transaction not allowed. Invalid card or card failure. Re-enter card data, if error persists, contact bank|Only 4 times in 16 days.|
|DM|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|DQ|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DS|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|EB|Unauthorized transaction. Daily limit exceeded.|Unauthorized transaction. Daily limit exceeded. Ask the carrier to contact their issuing bank.|Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.|A partir do dia seguinte, only 4 times in 16 days.|
|EE|Transaction not allowed. Installment value below the minimum allowed.|Transaction not allowed. Installment value below the minimum allowed. It is not permitted installments lower than R$5,00. It is necessary to revise the calculation for installments.|Transaction not allowed. Installment value is below the minimum allowed. Contact the virtual store.|No|
|EK|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|FA|Unauthorized transaction.|AmEx unauthorized transaction.|Unauthorized transaction. Contact your issuing bank.|No|
|FC|Unauthorized transaction. Call the Issuer|Unauthorized transaction. Guide the carrier to contact the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|FD|Transaction declined. Hold special condition card|Transaction not authorized by issuing bank rules.|Unauthorized transaction. Contact your issuing bank|No|
|FE|Unauthorized transaction. Divergence on transaction/payment date.|Unauthorized transaction. Invalid transaction date or first payment date.|Unauthorized transaction. Redo the transaction confirming data.|No|
|FF|Cancellation OK|Cancellation transaction authorized successfully. WARNING: This return is for cases of cancellations and not for cases of authorizations.|Transação de cancelamento autorizada com sucesso|No|
|FG|Unauthorized transaction. Call AmEx.|Unauthorized transaction. Guide the carrier to contact AmEx Call Center.|Unauthorized transaction. Contact the AmEx Call Center at the phone number 08007285090|No|
|FG|Call 08007285090|Unauthorized transaction. Guide the carrier to contact AmEx Call Center.|Unauthorized transaction. Contact the AmEx Call Center at the phone number 08007285090|No|
|GA|Wait for contact|Unauthorized transaction. Referred by Lynx Online in a preventive way.|Unauthorized transaction. Contact the merchant.|No|
|HJ|Transaction not allowed. Invalid operation code.|Transaction not allowed. Invalid Coban operation code.|Transaction not allowed. Invalid Coban operation code. Contact the merchant.|No|
|IA|Transaction not allowed. Invalid operation indicator.|Transaction not allowed. Invalid Coban operation indicator.|Transaction not allowed. Invalid Coban operation indicator. Contact the merchant.|No|
|JB|Transaction not allowed. Invalid operation value.|Transaction not allowed. Invalid Coban operation value.|Transaction not allowed. Invalid Coban operation value. Contact the merchant.|No|
|KA|Transaction not allowed. Data validation failed.|Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.|Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.|No|
|KB|Transaction not allowed. Incurred option selected.|Transaction not allowed. Wrong option selected. Ask the carrier to review the data and try again. If the error persists, the communication between virtual store and Cielo must be checked.|Transaction not allowed. Wrong option selected. Try again. If the error persists, contact the Virtual Store.|No|
|KE|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the carrier.|Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the virtual store.|No|
|N7|Unauthorized transaction. Invalid security code.|Unauthorized transaction. Invalid security code. Guide the carrier to correct the data and try again.|Unauthorized transaction. Review the data and enter again.|No|
|R1|Unauthorized transaction. Default card (Do not honor).|Unauthorized transaction. Could not process transaction. Issue related to security, default or carrier limit.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|U3|Transaction not allowed. Data validation failed.|Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.|Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.|No|
|GD|Transaction not allowed|Transaction not allowed|Transaction can not be processed in the establishment. Contact Cielo for more details..|Transaction not allowed. Contact the virtual store|No|

**Warning**: There are similar return codes, but with different meanings such as "**6** - Captured" and the "**06** - Canceled Card". These codes are only informative of the processing system. **Only the field `STATUS` should be considered as the current transaction situation**

## Capture Return Codes

|Return Code|Return Message|Meaning|
|---|---|---|
|6|Transacao capturada com sucesso|Transaction successfully captured|
|001|Mensagem inválida|Operation failed. Invalid request|
|002|Credenciais inválidas|Operation failed. Invalid credentials|
|003|Transação inexistente|Operation failed. Transaction not found|
|030|O status da transacao nao permite captura|Operation failed. Transaction not found|
|031|Prazo de captura vencido|Operation failed. Transaction is expired for capture|
|032|Valor de captura invalido|Operation failed. Capture amount is invalid|
|033|Falha ao capturar|Operation failed. Server error for capture|
|097|Sistema indisponível|Service unavailable|
|098|Timeout|Operation failed. Operation timed out|
|099|Erro inesperado|Operation failed|

## Void/Refund Return Codes

|Return Code|Return Message|Meaning|
|---|---|---|
|9|Transacao desfeita|Transaction successfully |
|9|Transacao cancelada com sucesso|Transaction successfully refunded|
|9|Cancelamento parcial realizado com sucesso|Transaction successfully refunded (partially)|
|4|Nao foi possivel cancelar a Transacao|Void operation failed|
|6|Nao foi possivel cancelar a Transacao|Refund operation failed|
|001|Mensagem inválida|Operation failed. Invalid request|
|002|Credenciais inválidas|Operation failed. Invalid credentials|
|003|Transação inexistente|Operation failed. Transaction not found|
|040|Prazo de cancelamento vencido|Operation failed. Transaction is expired for refund|
|041|Status nao permite cancelamento|Operation failed. Current status not allowed for refund|
|042|Falha ao cancelar|Operation failed. Server error for refund|
|043|Valor de cancelamento é maior que valor autorizado.|Operation failed. Refund amount must be equals or less then authorized amount|
|097|Sistema indisponível|Operation failed. Service unavailable|
|098|Timeout|Operation failed. Operation timed out|
|475|Tempo esgotado|Operation failed. Operation timed out|
|845|Status nao permite cancelar|Operation failed. Invalid status for refund|
|099|Erro inesperado|Operation failed|

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
|CN|Private buyer|
|CP|Business buyer|

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
