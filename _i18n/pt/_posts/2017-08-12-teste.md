---
layout: manual
title: Manual de integração
description: Integração técnica Gateway Braspag
search: true
categories: manual
translated: true
tags:
  - Pagador
language_tabs:
  json: JSON
---

# Introduction to Pagador API

The purpose of this documentation is to guide the developer about how to integrate with the Pagador API, the Braspag's payment gateway, describing the services available with sample requests and responses.

All operations require specific credentials (Merchant ID and Merchant Key) to access each environment: ** Sandbox **, ** Test** and ** Production **. To perform an operation, combine the base endpoint of the environment with the endpoint of the desired operation and send the correct HTTP VERB as described in the operation.

## Environments

### Sandbox Environment

Try our APIs for free!

|Information|Description|
|---|---|
|API Credentials|Access here [Sandbox Registration](https://cadastrosandbox.braspag.com.br/) and register for free.<BR>You will receive a `MerchantId` and a `MerchantKey`,<BR> necessary to access the APIs|
|Transactional Endpoint|https://apisandbox.braspag.com.br/|
|Query Endpoint|https://apiquerysandbox.braspag.com.br/|

### Test Environment

Use this environment to validate the integration!

|Information|Description|
|---|---|
|API Credentials|Envie um email para comercial@braspag.com.br para mais informações sobre a Braspag e sobre como podemos ajudar no seu negócio!|
|Transactional Endpoint|https://apihomolog.braspag.com.br/|
|Query Endpoint|https://apiqueryhomolog.braspag.com.br/|

### Production Environment

Ready to GoLive!

|Information|Description|
|---|---|
|API Credentials|Envie um email para comercial@braspag.com.br para mais informações sobre a Braspag e sobre como podemos ajudar no seu negócio!|
|Transactional Endpoint|https://api.braspag.com.br/|
|Query Endpoint|https://apiquery.braspag.com.br/|

## Braspag's Support Team

<aside class="notice">Braspag offers high availability support (Monday to Friday, from 9AM to 7PM, 24x7), emergency contact, and online support portal. We have a team that can help you in Portuguese, English or Spanish.</aside>

* Online Support: [Braspag's Online Support](http://suporte.braspag.com.br/)
* E-mail: [suporte@braspag.com.br](mailto:suporte@braspag.com.br)
* Support Contact: (11)2184-0550

## About API

The API Pagador was developed with REST technology, which is current market standard and is compatible with any technology used by marketers. It is possible to integrate using several programming languages, such as: ASP, ASP. Net, Java, PHP, Ruby, Python, among others.

Main benefits:

* **No proprietary application**: no need to install any applications in your environment
* **Simplicity**: the protocol used is purely HTTPS
* **Ease to test**: The Braspag platform offers a publicly accessible Sandbox environment that allows the developer to create a test account without the need for accreditation, making it easier and faster to start the integration process
* **Credentials**: Your Merchant ID and Merchant Key must be provided in the HTTP header
* **Security**: The communication is between your Server and Braspag's Server
* **Multiplatform**: the REST technology allows communication with any platform

## Architecture

Integration is performed through services provided as Web Services: There are two URLs (endpoints). One of them is used to authorization, capture and cancellation process, and the second one is a specific URL for consult operations These two URLs will receive the HTTP messages through the POST, GET, or PUT methods. Each message type must be sent to correct endpoint combined with the path that represents that specific operation.

* **POST** - The HTTP POST method is used to creation of a resource.
* **PUT** - The HTTP PUT method is used to update an existing resource. For example, capture or cancel a previously authorized transaction.
* **GET** - O método HTTP GET é utilizado para consultas de recursos já existentes. Por exemplo, consulta de transações.

# Credit Card Payments

For the better use of all the features available in our API, first of all, it is important to know the concepts involved in processing a credit card transaction.

* **Authorization**: Authorization (or pre-authorization) is an operation responsable for a credit card payment. The pre-authorization confirms the cardholder’s ability to pay, ensuring that the customer's credit card account is in good standing with sufficient funds to complete the purchase.
* **Capture**: After authorization process, you submit the transaction in a capture/settlement request that your processor uses to initiate a funds transfer between the customer's credit card account and your checking account. Usually, the time limit to make a capture process is up to 5 days.
* **Automatic Capture**: This process combines the authorization and capture process in one request. 

<aside class="warning">An authorized transaction is only fulfilled if it is captured.</aside>

* **Void (Cancel)**: A void will cancel the transfer of funds from the customer to the merchant.
* **Refund**: A refund transfers funds from your merchant account to the customer’s account. 

Below we have the list of acquirers that support refund transaction:

|Acquirer|Deadline for Refund Request|
|---|---|
|Cielo|300 days|
|Rede|Komerci tecnology: 90 days; eRede tecnology: 60 days|
|Getnet|90 days|
|Transbank|90 days|
|Global Payments|--|
|First Data|--|
|Banorte|--|
|Credibanco|--|

<aside class="warning">Please, check if the acquirer supports Void or Refund operation before development</aside>

* **Authentication**: This process submits the cardholder to an authentication flow, in order to check if he is the same person that making this purchase.
* **Cartão Protegido (Tokenization)**: It is a platform that allows secure storage of credit card data. This data is transformed into an encrypted code called "token", which will be stored in a database. Using this, the merchant can offer features such as "Buy with 1 click", always preserving integrity and confidentiality of information.
* **Fraud Prevention**: It is a fraud prevention system that provides a deep risk analysis of online transactions. This process is completely transparent to the cardholder. According to the pre-established rules, the request can be automatically accepted, rejected or sent to the manual analysis.

## Basic Credit Card Payments

Example of a simple credit card transaction jsut with mandatory data. Some features, such as Automatic Capture, Authentication, Fraud Prevention, Velocity and more require additional data. In this case, please consult specific section in this manual.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051001",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051001",
   "Customer":{
      "Name": "Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051001",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "2539492",
    "AcquirerTransactionId": "0510042539492",
    "AuthorizationCode": "759497",
    "PaymentId": "f8078b32-be17-4c35-b164-ad74c3cd0725",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-10 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/void"
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
  "MerchantOrderId": "2017051001",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "2539492",
    "AcquirerTransactionId": "0510042539492",
    "AuthorizationCode": "759497",
    "PaymentId": "f8078b32-be17-4c35-b164-ad74c3cd0725",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-10 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|

## Credit Card Payments with Customer's Data

This is an example with customer's data, capture behavior, authentication option and extra datas (merchant's customized data).

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2017051002",
   "Customer":{  
      "Name": "Customer's Name",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"comprador@braspag.com.br",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA",
       "District":"Alphaville"
      },
     "DeliveryAddress": {
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
   "Payment":{  
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "ServiceTaxAmount":0,
     "Currency":"BRL",
     "Country":"BRA",
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,    
     "Recurrent": false,
     "SoftDescriptor":"Mensagem",
     "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExtraDataCollection":[{
         "Name":"NomeDoCampo",
         "Value":"ValorDoCampo"
     }]
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2017051002",
   "Customer":{  
      "Name": "Customer's Name",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"comprador@braspag.com.br",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA",
       "District":"Alphaville"
      },
     "DeliveryAddress": {
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
   "Payment":{  
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "ServiceTaxAmount":0,
     "Currency":"BRL",
     "Country":"BRA",
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,    
     "Recurrent": false,
     "SoftDescriptor":"Mensagem",
     "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExtraDataCollection":[{
         "Name":"NomeDoCampo",
         "Value":"ValorDoCampo"
     }]
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Customer.Identity`|Text|14 |No|Customer's RG, CPF or CNPJ| 
|`Customer.IdentityType`|Text|255|No|Customer Identification Type  (CPF or CNPJ)|
|`Customer.Email`|Text|255|No|Customer's e-mail address|
|`Customer.Birthdate`|Date|10|No|Customer's birth date YYYY-MM-DD|
|`Customer.Address.Street`|Text|255|No|Customer's main contact address|
|`Customer.Address.Number`|Text|15|No|Customer's main contact address building number|
|`Customer.Address.Complement`|Text|50|No|Customer's main contact address additional data|
|`Customer.Address.ZipCode`|Text|9|No|Customer's main contact address ZIP code|
|`Customer.Address.City`|Text|50|No|Customer's main contact address' City|
|`Customer.Address.State`|Text|2|No|Customer's main contact address' State|
|`Customer.Address.Country`|Text|35|No|Customer's main contact address' Country|
|`Customer.Address.District`|Text|50 |No|Customer's main contact address' district name |
|`Customer.DeliveryAddress.Street`|Text|255|No|Customer's delivery address|
|`Customer.DeliveryAddress.Number`|Text|15|No|Customer's delivery address building number|
|`Customer.DeliveryAddress.Complement`|Text|50|No|Customer's delivery address additional data|
|`Customer.DeliveryAddress.ZipCode`|Text|9|No|Customer's delivery address ZIP code|
|`Customer.DeliveryAddress.City`|Text|50|No|Customer's delivery address' City|
|`Customer.DeliveryAddress.State`|Text|2|No|Customer's delivery address' State|
|`Customer.DeliveryAddress.Country`|Text|35|No|Customer's delivery address' Country|
|`Customer.DeliveryAddress.District`|Text|50 |No|Customer's delivery address' district name |
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.ServiceTaxAmount`|Number|15|Yes|Service Tax Amount to be added to the total amount of transaction|
|`Payment.Currency`|Text|3|No|Currency Code (BRL / USD / MXN / COP / CLP / ARS / PEN / EUR / PYN / UYU / VEB / VEF / GBP)|
|`Payment.Country`|Text|3|No|Country Code|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.Interest`|Text|10|No|Installment Type - if by merchant (ByMerchant) and if by Issuer (ByIssuer)|
|`Payment.Capture`|Boolean|---|No (Default false)|If automatic capture behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.Authenticate`|Boolean|---|No (Default false)|If authentication behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.Recurrent`|Boolean|---|No (Default false)|If recurrent behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.SoftDescriptor`|Text|13|No|Message that will be presented into cardholder's billing|
|`Payment.ExtraDataCollection.Name`|Text|50|No|Extra Data field's name|
|`Payment.ExtraDataCollection.Value`|Text|1024|No|Extra Data field's value|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder's name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Card's Expiration Date|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|
|`CreditCard.SaveCard`|Boolean|---|No (Default false)|If the card must be saved, then true. Else false.|

### Response

```json
{
  "MerchantOrderId": "2017051002",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@braspag.com.br",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
    },
    "DeliveryAddress": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
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
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "20170510053219433",
    "AcquirerTransactionId": "0510053219433",
    "AuthorizationCode": "936403",
    "SoftDescriptor": "Mensagem",
    "VelocityAnalysis": {
      "Id": "c374099e-c474-4916-9f5c-f2598fec2925",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "c374099e-c474-4916-9f5c-f2598fec2925",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-10 17:32:19",
    "CapturedAmount": 10000,
    "CapturedDate": "2017-05-10 17:32:19",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ExtraDataCollection": [
      {
        "Name": "NomeDoCampo",
        "Value": "ValorDoCampo"
      }
    ],
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 2,
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/c374099e-c474-4916-9f5c-f2598fec2925"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/c374099e-c474-4916-9f5c-f2598fec2925/void"
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
  "MerchantOrderId": "2017051002",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@braspag.com.br",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
    },
    "DeliveryAddress": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
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
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "20170510053219433",
    "AcquirerTransactionId": "0510053219433",
    "AuthorizationCode": "936403",
    "SoftDescriptor": "Mensagem",
    "VelocityAnalysis": {
      "Id": "c374099e-c474-4916-9f5c-f2598fec2925",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "c374099e-c474-4916-9f5c-f2598fec2925",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-10 17:32:19",
    "CapturedAmount": 10000,
    "CapturedDate": "2017-05-10 17:32:19",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ExtraDataCollection": [
      {
        "Name": "NomeDoCampo",
        "Value": "ValorDoCampo"
      }
    ],
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 2,
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/c374099e-c474-4916-9f5c-f2598fec2925"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/c374099e-c474-4916-9f5c-f2598fec2925/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`CapturedDate`|Data em que a transação foi capturada a transação|Text|19|YYYY-MM-DD HH:mm:SS|
|`CapturedAmount`|Valor capturado (sem pontuação)|Number|15|100 equivale a R$ 1,00|
|`ECI`|Eletronic Commerce Indicator. Representa o resultado da autenticação|Text|2|Exemplos: 5|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|

## Card Payment with Authentication

When a transaction is submitted to an authentication process, the customer is redirected to the issuer's environment, where it must perform a confirmation of its data. When the validation is successfully validated, the "liability" of the transaction is transfered to the bank. In case of dispute, the bank will be responsible for chageback.

<aside class="notice"><strong>Authantication:</strong>The cardholder is redirected to the authentication environment of the card issuing bank where the card password is required. Applicable only to Cielo's payent methods.</aside>

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2017051101",
   "Customer":{  
      "Name": "Customer's Name"
   },
   "Payment":{  
      "Provider":"Cielo",
     "Type":"CreditCard",
      "Amount":10000, 
     "Capture":true,
      "Installments":1,
      "Authenticate":true,
      "ReturnUrl":"http://www.braspag.com.br",
      "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2015",
         "SecurityCode":"123",
         "Brand":"Visa"
      }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2017051101",
   "Customer":{  
      "Name": "Customer's Name"
   },
   "Payment":{  
      "Provider":"Cielo",
     "Type":"CreditCard",
      "Amount":10000,   
     "Capture":true,
      "Installments":1,
      "Authenticate":true,
      "ReturnUrl":"http://www.braspag.com.br",
      "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2015",
         "SecurityCode":"123",
         "Brand":"Visa"
      }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.Authenticate`|Boolean|---|No (Default false)|If authentication behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.ReturnUrl`|Text|1024|Yes (whe Authenticate is true)|URL to redirect the customer when the authetication process is finalized|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051101",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": true,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2015",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "AuthenticationUrl": "https://qasecommerce.cielo.com.br/web/index.cbmp?id=9e61c78c0b0ca3e5db41fa7e31585eab",
    "AcquirerTransactionId": "10069930690009D2A47A",
    "ReturnUrl": "http://www.braspag.com.br",
    "PaymentId": "b125109f-681b-4338-8450-f3e38bc71b32",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 11:09:49",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ReasonCode": 9,
    "ReasonMessage": "Waiting",
    "Status": 0,
    "ProviderReturnCode": "0",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/b125109f-681b-4338-8450-f3e38bc71b32"
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
  "MerchantOrderId": "2017051101",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": true,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2015",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "AuthenticationUrl": "https://qasecommerce.cielo.com.br/web/index.cbmp?id=9e61c78c0b0ca3e5db41fa7e31585eab",
    "AcquirerTransactionId": "10069930690009D2A47A",
    "ReturnUrl": "http://www.braspag.com.br",
    "PaymentId": "b125109f-681b-4338-8450-f3e38bc71b32",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 11:09:49",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ReasonCode": 9,
    "ReasonMessage": "Waiting",
    "Status": 0,
    "ProviderReturnCode": "0",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/b125109f-681b-4338-8450-f3e38bc71b32"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|
|`AuthenticationUrl`|URL to redirect the customer when the authetication process is finalized|Text|256|https://qasecommerce.cielo.com.br/web/index.cbmp?id=5f177203bf524c78982ad28f7ece5f08|

## Card Payment with External Authentication

When a transaction is submitted to an external authentication process, the customer is redirected to the issuer's environment, where it must perform a confirmation of its data. When the validation is successfully validated, the "liability" of the transaction is transfered to the bank. In case of dispute, the bank will be responsible for chageback.

<aside class="notice"><strong>Authantication:</strong>The cardholder is redirected to the authentication environment of the card issuing bank where the card password is required. Applicable to Cielo, Global Payments and Banorte's payent methods.</aside>

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2017051101",
   "Customer":{  
      "Name": "Customer's Name"
   },
   "Payment":{  
      "Provider":"Cielo",
     "Type":"CreditCard",
      "Amount":10000,    
      "Capture":true,     
      "Installments":1,
      "Authenticate":true,
      "ReturnUrl":"http://www.braspag.com.br",
      "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2015",
         "SecurityCode":"123",
         "Brand":"Visa"
      },
     "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2017051101",
   "Customer":{  
      "Name": "Customer's Name"
   },
   "Payment":{  
      "Provider":"Cielo",
     "Type":"CreditCard",
      "Amount":10000, 
      "Capture":true,     
      "Installments":1,
      "Authenticate":true,
      "ReturnUrl":"http://www.braspag.com.br",
      "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2015",
         "SecurityCode":"123",
         "Brand":"Visa"
      },
     "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.Authenticate`|Boolean|---|No (Default false)|If authentication behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.ReturnUrl`|Text|1024|Yes (whe Authenticate is true)|URL to redirect the customer when the authetication process is finalized|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|
|`Payment.ExternalAuthentication.Cavv`|Text|28|Yes|The value Cavv is returned by authentication provider|
|`Payment.ExternalAuthentication.Xid`|Text|28|Yes|The value Xid is returned by authentication provider|
|`Payment.ExternalAuthentication.Eci`|Number|1|Yes|The value Eci is returned by authentication provider|

### Response

```json
{
  "MerchantOrderId": "2017051101",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": true,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2015",
      "SaveCard": false,
      "Brand": "Visa"
    },
   "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
     },
    "AuthenticationUrl": "https://qasecommerce.cielo.com.br/web/index.cbmp?id=9e61c78c0b0ca3e5db41fa7e31585eab",
    "AcquirerTransactionId": "10069930690009D2A47A",
    "ReturnUrl": "http://www.braspag.com.br",
    "PaymentId": "b125109f-681b-4338-8450-f3e38bc71b32",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 11:09:49",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ReasonCode": 9,
    "ReasonMessage": "Waiting",
    "Status": 0,
    "ProviderReturnCode": "0",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/b125109f-681b-4338-8450-f3e38bc71b32"
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
  "MerchantOrderId": "2017051101",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": true,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2015",
      "SaveCard": false,
      "Brand": "Visa"
    },
   "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
     },
    "AuthenticationUrl": "https://qasecommerce.cielo.com.br/web/index.cbmp?id=9e61c78c0b0ca3e5db41fa7e31585eab",
    "AcquirerTransactionId": "10069930690009D2A47A",
    "ReturnUrl": "http://www.braspag.com.br",
    "PaymentId": "b125109f-681b-4338-8450-f3e38bc71b32",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 11:09:49",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ReasonCode": 9,
    "ReasonMessage": "Waiting",
    "Status": 0,
    "ProviderReturnCode": "0",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/b125109f-681b-4338-8450-f3e38bc71b32"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|
|`AuthenticationUrl`|URL to redirect the customer when the authetication process is finalized|Text|256|https://qasecommerce.cielo.com.br/web/index.cbmp?id=5f177203bf524c78982ad28f7ece5f08|

## Credit Card Payment with Fraud Prevention

The Fraud Prevention requires the "FraudAnalysis" node filled. 

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2017051102",
   "Customer":{  
      "Name": "Customer's Name",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"comprador@braspag.com.br",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA",
       "District":"Alphaville"
      },
     "DeliveryAddress": {
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
   "Payment":{  
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "ServiceTaxAmount":0,
     "Currency":"BRL",
     "Country":"BRA",
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,    
     "Recurrent": false,
     "SoftDescriptor":"Mensagem",
     "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "FraudAnalysis":{
       "Sequence":"AnalyseFirst",
       "SequenceCriteria":"Always",
       "CaptureOnLowRisk":false,
       "VoidOnHighRisk":false,       
       "FingerPrintId":"074c1ee676ed4998ab66491013c565e2",    
      "Browser":{
       "CookiesAccepted":false,
       "Email":"comprador@braspag.com.br",
       "HostName":"Teste",
       "IpAddress":"127.0.0.1",
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
            "Sku":"20170511",
            "UnitPrice":10000,
            "Risk":"High",
            "TimeHedge":"Normal",
            "Type":"AdultContent",
            "VelocityHedge":"High",
            "Passenger":{
            "Email":"comprador@braspag.com.br",
            "Identity":"1234567890",
            "Name": "Customer's Name",
            "Rating":"Adult",
            "Phone":"999994444",
            "Status":"Accepted"
         }
           }]
       },
       "MerchantDefinedFields":[{
         "Id":95,
         "Value":"Dado Definido pela Loja"
      }],
      "Shipping":{
         "Addressee":"Alameda Xingu, 512",
         "Method":"LowCost",
         "Phone":"1121840540"
      },
      "Travel":{
         "DepartureTime":"2020-01-01",
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

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2017051102",
   "Customer":{  
      "Name": "Customer's Name",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"comprador@braspag.com.br",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA",
       "District":"Alphaville"
      },
     "DeliveryAddress": {
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
   "Payment":{  
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "ServiceTaxAmount":0,
     "Currency":"BRL",
     "Country":"BRA",
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,    
     "Recurrent": false,
     "SoftDescriptor":"Mensagem",
     "CreditCard":{  
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "FraudAnalysis":{
       "Sequence":"AnalyseFirst",
       "SequenceCriteria":"Always",
       "CaptureOnLowRisk":false,
       "VoidOnHighRisk":false,       
       "FingerPrintId":"074c1ee676ed4998ab66491013c565e2",    
      "Browser":{
       "CookiesAccepted":false,
       "Email":"comprador@braspag.com.br",
       "HostName":"Teste",
       "IpAddress":"127.0.0.1",
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
            "Sku":"20170511",
            "UnitPrice":10000,
            "Risk":"High",
            "TimeHedge":"Normal",
            "Type":"AdultContent",
            "VelocityHedge":"High",
            "Passenger":{
            "Email":"comprador@braspag.com.br",
            "Identity":"1234567890",
            "Name": "Customer's Name",
            "Rating":"Adult",
            "Phone":"999994444",
            "Status":"Accepted"
         }
           }]
       },
       "MerchantDefinedFields":[{
         "Id":95,
         "Value":"Dado Definido pela Loja"
      }],
      "Shipping":{
         "Addressee":"Alameda Xingu, 512",
         "Method":"LowCost",
         "Phone":"1121840540"
      },
      "Travel":{
         "DepartureTime":"2020-01-01",
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
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Customer.Identity`|Text|14 |No|Customer's RG, CPF or CNPJ| 
|`Customer.IdentityType`|Text|255|No|Customer Identification Type  (CPF or CNPJ)|
|`Customer.Email`|Text|255|No|Customer's e-mail address|
|`Customer.Birthdate`|Date|10|No|Customer's birth date YYYY-MM-DD|
|`Customer.Address.Street`|Text|255|No|Customer's main contact address|
|`Customer.Address.Number`|Text|15|No|Customer's main contact address building number|
|`Customer.Address.Complement`|Text|50|No|Customer's main contact address' additional data|
|`Customer.Address.ZipCode`|Text|9|No|Customer's main contact address ZIP code|
|`Customer.Address.City`|Text|50|No|Customer's main contact address' City|
|`Customer.Address.State`|Text|2|No|Customer's main contact address' State|
|`Customer.Address.Country`|Text|35|No|Customer's main contact address' Country|
|`Customer.Address.District`|Text|50 |No|Customer's main contact address' district name |
|`Customer.DeliveryAddress.Street`|Text|255|No|Customer's delivery address|
|`Customer.DeliveryAddress.Number`|Text|15|No|Customer's delivery address building number|
|`Customer.DeliveryAddress.Complement`|Text|50|No|Customer's delivery address additional data|
|`Customer.DeliveryAddress.ZipCode`|Text|9|No|Customer's delivery address ZIP code|
|`Customer.DeliveryAddress.City`|Text|50|No|Customer's delivery address' City|
|`Customer.DeliveryAddress.State`|Text|2|No|Customer's delivery address' State|
|`Customer.DeliveryAddress.Country`|Text|35|No|Customer's delivery address' Country|
|`Customer.DeliveryAddress.District`|Text|50 |No|Customer's delivery address' district name |
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.ServiceTaxAmount`|Number|15|Yes|Service Tax Amount to be added to the total amount of transaction|
|`Payment.Currency`|Text|3|No|Currency Code (BRL / USD / MXN / COP / CLP / ARS / PEN / EUR / PYN / UYU / VEB / VEF / GBP)|
|`Payment.Country`|Text|3|No|Country Code|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.Interest`|Text|10|No|Installment Type - if by merchant (ByMerchant) and if by Issuer (ByIssuer)|
|`Payment.Capture`|Boolean|---|No (Default false)|If automatic capture behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.Authenticate`|Boolean|---|No (Default false)|If authentication behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.Recurrent`|Boolean|---|No (Default false)|If recurrent behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.SoftDescriptor`|Text|13|No|Message that will be presented into cardholder's billing|
|`Payment.ExtraDataCollection.Name`|Text|50|No|Extra Data field's name|
|`Payment.ExtraDataCollection.Value`|Text|1024|No|Extra Data field's value|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder's name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Card's Expiration Date|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|
|`CreditCard.SaveCard`|Boolean|---|No (Default false)|If the card must be saved, then true. Else false.|
|`FraudAnalysis.Sequence`|Text|14|Yes|Possible values:<UL><LI>AnalyseFirst</LI><LI>AuthorizeFirst</LI></UL>|
|`FraudAnalysis.SequenceCriteria`|Text|9|Yes|Flow criteria.<BR><UL><LI>OnSuccess - on success of chosen sequence</LI><LI>Always - analyse independently the result of chosen sequence</LI></UL>|
|`FraudAnalysis.CaptureOnLowRisk`|Boolean|---|No|When true, the capture process will occur automaticlly when the fraud risk is low (Accept). In case of hight risk or review state, the flow will be the default. To use this flow, the Sequence must be "AuthorizeFirst"|
|`FraudAnalysis.VoidOnHighRisk`|Boolean|---|No|When true, the void process will occur automaticlly when the fraud risk is hiht (Reject). In case of low risk or review state, the flow will be the default. To use this flow, the Sequence must be "AuthorizeFirst|
|`FraudAnalysis.FingerPrintId`|Text|50|Yes|The id that indentifies the user’s browser. This ID must be used in the SESSIONID field in the script|
|`FraudAnalysis.Browser.CookiesAccepted`|Boolean|---|Yes|Boolean to determine if the client’s browser accepts cookies|
|`FraudAnalysis.Browser.Email`|Text|100|No|E-mail address registered in the client’s browser|
|`FraudAnalysis.Browser.HostName`|Text|60|No|Hostname where the customer was before entering the store site|
|`FraudAnalysis.Browser.IpAddress`|Text|15|Yes|Client’s IP Address. It is strongly recommended to send this field|
|`FraudAnalysis.Browser.Type`|Text|40|No|Browser’s name used by the customer|
|`FraudAnalysis.Cart.IsGift`|Boolean|---|No|Boolean indicates if the order is a gift or not|
|`FraudAnalysis.Cart.ReturnsAccepted`|Boolean|---|No|Boolean that defines if returns are accepted for the request|
|`FraudAnalysis.Items.GiftCategory`|Text|9|No|Field that will evaluate the billing address and delivery to different cities, states or countries<BR><UL><LI>Yes (In case of divergence between billing and delivery addresses, mark as low risk)</LI><LI>No (In case of divergence between billing and delivery addresses, mark as hight risk)</LI><LI>Off (Ignores risk analysis for divergent addresses)</LI></UL>|
|`FraudAnalysis.Items.HostHedge`|Text||No|Importance level of the e-mail and customer IP addresses for risk level<BR><UL><LI>Low (low importance)</LI><LI>Normal (medium importace)</LI><LI>High (very important)</LI><LI>Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.NonSensicalHedge`|Text|6|No|Level of tests performed on the customer's data with applications received meaningless <BR><UL><LI>Low (low importance)</LI><LI>Normal (medium importance)</LI><LI>High (very important)</LI><LI>Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.ObscenitiesHedge`|Text|6|No|Obscenity level of requests received<BR><UL><LI>Low (low importance)</LI><LI>Normal (medium importance)</LI><LI>High (very important)</LI><LI>Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.PhoneHedge`|Text|6|No|Level of testing carried out with phone numbers <BR><UL><LI>Low (Low importance)</LI><LI>Normal (medium importance)</LI><LI>High (very important)</LI><LI>Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.Name`|Text|255|Yes|Product's Name|
|`FraudAnalysis.Items.Quantity`|Number|15|Yes|Iten's quantity|
|`FraudAnalysis.Items.Sku`|Text|255|Yes|Product's SKU Code|
|`FraudAnalysis.Items.UnitPrice`|Number|15|Yes|Unit Price|
|`FraudAnalysis.Items.Risk`|Text|6|No|Product risk level <BR><UL><LI>Low (lowr risk)</LI><LI>Normal (medium risk)</LI><LI>High (hight risk)</LI></UL>|
|`FraudAnalysis.Items.TimeHedge`|Text||No|Importance level of customer order per time of day <BR><UL><LI>Low (lowr risk)</LI><LI>Normal (medium risk)</LI><LI>High (hight risk)</LI><Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.Type`|Text||No|Product Type<BR><UL><LI>AdultContent</LI><LI>Coupon</LI><LI>Default</LI><LI>EletronicGood</LI><LI>EletronicSoftware</LI><LI>GiftCertificate</LI><LI>HandlingOnly</LI><LI>Service</LI><LI>ShippingAndHandling</LI><LI>ShippingOnly</LI><LI>Subscription</LI></UL>|
|`FraudAnalysis.Items.VelocityHedge`|Text|6|No|Importance level of customer purchase frequency<BR><UL><LI>Low (low relevance for last 15 minutes)</LI><LI>Normal (medium relevance for last 15 minutes)</LI><LI>High (hight relevance for last 15 minutes)</LI><LI>Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.Passenger.Email`|Text|255|No|Passagen's E-mail Address|
|`FraudAnalysis.Items.Passenger.Identity`|Text|32|No|Passenger Id to whom the ticket was issued|
|`FraudAnalysis.Items.Passenger.Name`|Text|120|No|Passenger name|
|`FraudAnalysis.Items.Passenger.Rating`|Text||No|Passenger classification<BR><UL><LI>Adult</LI><LI>Child</LI><LI>Infant</LI><LI>Youth</LI><LI>Student)</LI><LI>SeniorCitizen</LI><LI>Military</LI></UL>|
|`FraudAnalysis.Items.Passenger.Phone`|Text|15|No|Passenger phone number. For applications outside the US, CyberSource recommends to include the country code 552133665599 (Country Code 55, City Code 21, phone number 33665599)|
|`FraudAnalysis.Items.Passenger.Status`|Text|32|No|CAirline ranking. One can use values such as Gold or Platinum|
|`FraudAnalysis.MerchantDefinedFields.Id`|Text|---|Sim (se aplicável)|Id of the additional information|
|`FraudAnalysis.MerchantDefinedFields.Value`|Text|255|Sim (se aplicável)|Value of the additional information|
|`FraudAnalysis.Shipping.Addressee`|Text|255|No|Delivery recipient’s name|
|`FraudAnalysis.Shipping.Method`|Text||No|Shippint type<BR><UL><LI>SameDay</LI><LI>OneDay</LI><LI>TwoDay</LI><LI>ThreeDay</LI><LI>LowCost(</LI><LI>Pickup</LI><LI>Other</LI><LI>None</LI></UL>|
|`FraudAnalysis.Shipping.Phone`|Text|15|No|Delivery recipient’s phone. Ex. 552133665599 (Country Code 55, City Code 21, phone number 33665599)|
|`FraudAnalysis.Travel.DepartureTime`|DateTime|23|No|Date, hour and minute of flight departure AAAA-MM-DD HH:mm:SS|
|`FraudAnalysis.Travel.JourneyType`|Text|32|No|Trip type. Ex. "Só Ida", "Só Volta", "Ida e Volta"|
|`FraudAnalysis.Travel.Route`|Text|255|No|Route trip. Concatenation of flight connections in ORIG1- DEST1 format|
|`FraudAnalysis.Travel.Legs.Destination`|Text|3|No|Airport code of the destination|
|`FraudAnalysis.Travel.Legs.Origin`|Text|3|No|Airport code of the origin|

### Response

```json
{
  "MerchantOrderId": "2017051102",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@braspag.com.br",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
    },
    "DeliveryAddress": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
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
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "SoftDescriptor": "Mensagem",
   "FraudAnalysis": {
            "Sequence": "AnalyseFirst",
            "SequenceCriteria": "Always",
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
            "CaptureOnLowRisk": false,
            "VoidOnHighRisk": false,
            "FraudAnalysisReasonCode": 100,
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
    "PaymentId": "4219584b-6d23-49f0-a24c-2b677bc60df8",
    "Type": "CreditCard",
    "Amount": 10000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 16,
    "ReasonMessage": "AbortedByFraud",
    "Status": 13,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/4219584b-6d23-49f0-a24c-2b677bc60df8"
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
  "MerchantOrderId": "2017051102",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@braspag.com.br",
    "Birthdate": "1991-01-02",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
    },
    "DeliveryAddress": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
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
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "SoftDescriptor": "Mensagem",
   "FraudAnalysis": {
            "Sequence": "AnalyseFirst",
            "SequenceCriteria": "Always",
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
            "CaptureOnLowRisk": false,
            "VoidOnHighRisk": false,
            "FraudAnalysisReasonCode": 100,
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
    "PaymentId": "4219584b-6d23-49f0-a24c-2b677bc60df8",
    "Type": "CreditCard",
    "Amount": 10000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 16,
    "ReasonMessage": "AbortedByFraud",
    "Status": 13,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/4219584b-6d23-49f0-a24c-2b677bc60df8"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`SoftDescriptor`|Text que será impresso na fatura do portador|Text|13|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|
|`FraudAnalysis.Id`|Indentificação da Transação no Antifraud|Text|300|Alphanumeric Text|
|`FraudAnalysis.Status`|Transaction Status|Byte|3|Ex.: 500|
|`FraudAnalysis.FraudAnalysisReasonCode`|Analysis Reason Code|Byte|---|<UL><LI>100 - Successful operation</LI>
<LI>101 - There are one or more missed requests fields. Possible action: See the fields that are missing in AntiFraudResponse list.MissingFieldCollection. Resend the request with complete information</LI>
<LI>102 - One or more request fields contain invalid data. Possible action: See the invalid fields in AntiFraudResponse list.InvalidFieldCollection. Resubmit the request with the correct information</LI>
<LI>150 - Failure in the general system. Possible action: wait a few minutes and try resending the request</LI>
<LI>151 - The request was received, but time-out occurred on the server.This error does not include time-out between the client and the server. Possible action: wait a few minutes and try resending the request</LI>
<LI>152 The request was received, but was time-out. Possible action: wait a few minutes and resubmit the request</LI>
<LI>202 - Fraud Prevention refused the request because the card has expired. You can also receive this code if the expiration date does not coincide with the date on issuing bank file. If payment processor allows emission credits for expired cards, CyberSource does not limit this functionality. Possible action: Request a card or other method of payment</LI>
<LI>231 The account number is invalid. Possible action: Request a card or other method of payment</LI>
<LI>234 - There is a problem with the merchant setup. Possible action: Do not click. Please contact customer support to correct the configuration problem</LI>
<LI>400 A fraud score exceeds its limit. Possible action: Review the customer’s request</LI>
<LI>480 The request was scheduled for review by Decision Manager</LI>
<LI>481 - The request was rejected by Manager decision</LI></UL>|
|`FraudAnalysis.ReplyData.AddressInfoCode`|Codes that identifies the error in Addresses|Text|255|Ex: COR-BA^MM-BIN<br /><UL><LI>COR-BA - The billing address can be normalized</LI>
<LI>COR-SA - The delivery address can be normalized</LI>
<LI>INTL-BA - The billing country is outside the US
<LI>INTL-SA - Delivery country is outside the US
<LI>MIL-USA - This is a military address in the US
<LI>MM-A - billing and shipping addresses use different street names</LI>
<LI>MM-BIN - The BIN card (the first six digits number) does not match the country</LI>
<LI>MM-C - The billing and delivery addresses use different cities</LI>
<LI>MM-CO - The billing and delivery addresses use different countries</LI>
<LI>MM-ST - The billing and delivery addresses use different states</LI>
<LI>MM-Z - The billing and delivery addresses use different zip codes</LI>
<LI>UNV-ADDR - The address is unverifiable</LI></UL>|
|`FraudAnalysis.ReplyData.FactorCode`|Codes that identifies the score level of an order|Text|100|Ex: B^D^R^Z<br /><UL><LI>A - Excessive Change of Address.The customer has changed the billing address two or more times in the last six months.</LI>
<LI>B - BIN card or risk authorization. Risk factors are related to credit card and BIN / or card authorization checks.</LI>
<LI>C - High numbers of credit cards.The customer has used more than six numbers of credit cards in the past six months.</LI>
<LI>D - Impact of the e-mail address.The customer uses a free email provider or e-mail address is risky.</LI>
<LI>E - Positive list. The customer is in its positive list.</LI>
<LI>F - Negative list. The account number, address, email address or IP address for this purpose appears in its negative list.</LI>
<LI>G - geolocation inconsistencies.The email client domain, phone number, billing address, shipping address or IP address is suspect.</LI>
<LI>H - excessive name changes.The customer changed its name twice or more in the past six months.</LI>
<LI>I - Internet inconsistencies.The IP address and e-mail domain are not consistent with the billing address.</LI>
<LI>N - Entrance meaningless.The customer name and address fields contain meaningless words or language.</LI>
<LI>The - obscenities.Customer data contains obscene words.</LI>
<LI>P - morphing identity. Various amounts of an identity element are attached to a different value of an identity element. For example, various telephone numbers are connected to a single account number.</LI>
<LI>Q - Inconsistencies phone. The customer’s phone number is suspect.</LI>
<LI>R - risky Order.The transaction, the customer and the merchant show information correlated high risk.</LI>
<LI>T - Time Coverage. The client is attempting a purchase outside the expected time.</LI>
<LI>U - unverifiable address. The billing address or delivery can not be verified.</LI>
<LI>V - Velocity.The account number was used many times in the last 15 minutes.</LI>
<LI>W - marked as suspect. The billing address and delivery is similar to an address previously marked suspect.</LI>
<LI>Y - The address, city, state or country of billing and shipping addresses do not correlate.</LI>
<LI>Z - Invalid value. As the request it contains an unexpected value, a default value has been replaced. Although the transaction can still be processed, examine the application carefully to detect abnormalities.</LI></UL>|
|`FraudAnalysis.ReplyData.Score`|Order's total risk score|Number|---|Number|
|`FraudAnalysis.ReplyData.BinCountry`|Country Code|Text|2|us|
|`FraudAnalysis.ReplyData.CardIssuer`|Issuer's name|Text|128|Bradesco|
|`FraudAnalysis.ReplyData.CardScheme`|Card Brand|Text|20|<ul><li>MaestroInternational - Maestro International</li><li>MaestroUkDomestic - Maestro UK Domestic</li><li>MastercardCredit - MasterCard Credit</li><li>MastercardDebit - MasterCard Debit</li><li>VisaCredit - Visa Credit</li><li>VisaDebit - Visa Debit</li><li>VisaElectron - Visa Electron</li></ul>|
|`FraudAnalysis.ReplyData.HostSeverity`|Risk level of the buyer’s e-mail domain, 0-5, where 0 is unlimited risk and 5 is the highest risk|Number|---|5|
|`FraudAnalysis.ReplyData.InternetInfoCode`|Sequence of codes that indicate that there is an excessive change in the buyer’s identity. The codes are concatenated using the ^.|Text|255|Ex: <br /><LI>MORPH-B - The same billing address has been used several times with multiple client identities</LI>
<LI>MORPH-C - The same account number has been used several times with multiple client identities</LI>
<LI>MORPH-E - The same e-mail address has been used several times with multiple client identities
<LI>MORPH I - The same IP address has been used multiple times with multiple clients identities</LI>
<LI>MORPH-P - The same phone number has been used several times with multiple client identities</LI>
<LI>MORPH-S - The same delivery address has been used multiple times with multiple clients identities</LI>|
|`FraudAnalysis.ReplyData.IpRoutingMethod`|IP routing type used by the computer|Text|---|<ul><li>Anonymizer</li><li>AolBased</li><li>CacheProxy</li><li>Fixed</li><li>InternationalProxy</li><li>MobileGateway</li><li>Pop</li><li>RegionalProxy</li><li>Satellite</li><li>SuperPop</li></ul>|
|`FraudAnalysis.ReplyData.ScoreModelUsed`|Name score of model used|Text|20|Ex: default_lac|
|`FraudAnalysis.ReplyData.CasePriority`|If the merchant is subscriber Enhanced Case Management, you receive this value with the level of priority, with 1 being the highest and 5 the lowest|Number|---|3|

## Credit Card Payment with ReD Shield Fraud Prevention

The Fraud Prevention requires the "FraudAnalysis" node filled. 

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
    "MerchantOrderId": "201411170314344356",
    "Customer": {
        "Name": "Customer's Name",
        "Identity": "46286005030",
        "IdentityType": "CPF",
        "Email": "comprador_teste@live.com",
        "Birthdate": "1986-08-01",
        "WorkPhone": "552121544788",
        "Mobile": "5521995760078",
        "Phone": "552125553669",
        "Address": {
            "Street": "Rua Teste",
            "Number": "500",
            "Complement": "AP 205",
            "District": "Tijuca",
            "ZipCode": "21002320",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR"
        },
        "DeliveryAddress": {
            "Street": "Av Marechal Camara",
            "Number": "160",
            "Complement": "Sala 934",
            "District": "Centro",
            "ZipCode": "20020080",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "Comment": "Ao lado do banco Santander"
        },
        "Status": "New"
    },
    "Payment": {
        "Type": "CreditCard",
        "Amount": 15700,
      "Capture":true,
        "Provider": "Simulado",
        "Installments": 1,
        "CreditCard": {
            "CardNumber": "****6310",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "SecurityCode": "***",
            "Brand": "visa"
        },
        "FraudAnalysis": {
            "Sequence": "AnalyseFirst",
            "SequenceCriteria": "Always",
            "Provider": "RedShield",
            "CaptureOnLowRisk": true,
            "VoidOnHighRisk": true,
            "TotalOrderAmount": 16700,
            "OrderDate": "2016-12-09T19:16:38",
            "IsRetryTransaction": false,
            "FingerPrintId": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
            "Browser": {
                "IpAddress": "187.32.163.105"
            },
            "Cart": {
                "Items": [{
                    "Name": "Product's name",
                    "Sku": "201411170235",
                    "UnitPrice": 10950,
                    "OriginalPrice": 11490,
                    "Quantity": 1,
                    "MerchantItemId": "45584",
                    "GiftMessage": "Gift message",
                    "Description": "product description",
                    "ShippingInstructions": "Proximo ao 546",
                    "ShippingMethod": "SameDay",
                    "ShippingTrackingNumber": "123456",
                    "Passenger": {
                        "Name": "Passenger's name",
                        "Identity": "1234567891",
                        "Status": "Platinum",
                        "Rating": "Student",
                        "Email": "passageiro_teste1@live.com",
                        "Phone": "55999993333",
                        "DateOfBirth": "1988-01-06"
                    }
                }, {
                    "Name": "Nome do produto",
                    "Sku": "20141117023",
                    "UnitPrice": 10950,
                    "OriginalPrice": 11490,
                    "Quantity": 2,
                    "MerchantItemId": "45585",
                    "GiftMessage": "Gift message",
                    "Description": "Product description",
                    "ShippingInstructions": "Proximo ao 160",
                    "ShippingMethod": "NextDay",
                    "ShippingTrackingNumber": "654321",
                    "Passenger": {
                        "Name": "Passageiro Teste2",
                        "Identity": "1234567892",
                        "Status": "Gold",
                        "Rating": "Adult",
                        "Email": "passageiro_teste2@live.com",
                        "Phone": "5521999994444",
                        "DateOfBirth": "1958-07-06"
                    }
                }]
            },
            "MerchantDefinedFields": [{
                "Id": "95",
                "Value": "Definido pelo cliente junto ao provedor"
            }, {
                "Id": "96",
                "Value": "Definido pelo cliente junto ao provedor"
            }],
            "Shipping": {
                "Addressee": "Destinatario Teste",
                "Email": "destinatario_teste@live.com",
                "Method": "LowCost",
                "Phone": "5521995950277"
            },
            "CustomConfiguration": {
                "MerchantWebsite": "http://www.test.com"
            },
            "Travel": {
                "Route": "GIG-CGH-EZE",
                "DepartureTime": "2016-12-10T15:10:15",
                "JourneyType": "OneWayTrip",
                "Legs": [{
                    "Origin": "GIG",
                    "Destination": "CGH"
                }, {
                    "Origin": "CGH",
                    "Destination": "EZE"
                }]
            }
        }
    }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "201411170314344356",
    "Customer": {
        "Name": "Customer's Name",
        "Identity": "46286005030",
        "IdentityType": "CPF",
        "Email": "comprador_teste@live.com",
        "Birthdate": "1986-08-01",
        "WorkPhone": "552121544788",
        "Mobile": "5521995760078",
        "Phone": "552125553669",
        "Address": {
            "Street": "Rua Teste",
            "Number": "500",
            "Complement": "AP 205",
            "District": "Tijuca",
            "ZipCode": "21002320",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR"
        },
        "DeliveryAddress": {
            "Street": "Av Marechal Camara",
            "Number": "160",
            "Complement": "Sala 934",
            "District": "Centro",
            "ZipCode": "20020080",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "Comment": "Ao lado do banco Santander"
        },
        "Status": "New"
    },
    "Payment": {
        "Type": "CreditCard",
        "Amount": 15700,
      "Capture":true,
        "Provider": "Simulado",
        "Installments": 1,
        "CreditCard": {
            "CardNumber": "****6310",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "SecurityCode": "***",
            "Brand": "visa"
        },
        "FraudAnalysis": {
            "Sequence": "AnalyseFirst",
            "SequenceCriteria": "Always",
            "Provider": "RedShield",
            "CaptureOnLowRisk": true,
            "VoidOnHighRisk": true,
            "TotalOrderAmount": 16700,
            "OrderDate": "2016-12-09T19:16:38",
            "IsRetryTransaction": false,
            "FingerPrintId": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
            "Browser": {
                "IpAddress": "187.32.163.105"
            },
            "Cart": {
                "Items": [{
                    "Name": "Product's name",
                    "Sku": "201411170235",
                    "UnitPrice": 10950,
                    "OriginalPrice": 11490,
                    "Quantity": 1,
                    "MerchantItemId": "45584",
                    "GiftMessage": "Gift message",
                    "Description": "product description",
                    "ShippingInstructions": "Proximo ao 546",
                    "ShippingMethod": "SameDay",
                    "ShippingTrackingNumber": "123456",
                    "Passenger": {
                        "Name": "Passenger's name",
                        "Identity": "1234567891",
                        "Status": "Platinum",
                        "Rating": "Student",
                        "Email": "passageiro_teste1@live.com",
                        "Phone": "55999993333",
                        "DateOfBirth": "1988-01-06"
                    }
                }, {
                    "Name": "Nome do produto",
                    "Sku": "20141117023",
                    "UnitPrice": 10950,
                    "OriginalPrice": 11490,
                    "Quantity": 2,
                    "MerchantItemId": "45585",
                    "GiftMessage": "Gift message",
                    "Description": "Product description",
                    "ShippingInstructions": "Proximo ao 160",
                    "ShippingMethod": "NextDay",
                    "ShippingTrackingNumber": "654321",
                    "Passenger": {
                        "Name": "Passageiro Teste2",
                        "Identity": "1234567892",
                        "Status": "Gold",
                        "Rating": "Adult",
                        "Email": "passageiro_teste2@live.com",
                        "Phone": "5521999994444",
                        "DateOfBirth": "1958-07-06"
                    }
                }]
            },
            "MerchantDefinedFields": [{
                "Id": "95",
                "Value": "Definido pelo cliente junto ao provedor"
            }, {
                "Id": "96",
                "Value": "Definido pelo cliente junto ao provedor"
            }],
            "Shipping": {
                "Addressee": "Destinatario Teste",
                "Email": "destinatario_teste@live.com",
                "Method": "LowCost",
                "Phone": "5521995950277"
            },
            "CustomConfiguration": {
                "MerchantWebsite": "http://www.test.com"
            },
            "Travel": {
                "Route": "GIG-CGH-EZE",
                "DepartureTime": "2016-12-10T15:10:15",
                "JourneyType": "OneWayTrip",
                "Legs": [{
                    "Origin": "GIG",
                    "Destination": "CGH"
                }, {
                    "Origin": "CGH",
                    "Destination": "EZE"
                }]
            }
        }
    }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|61|Yes|Customer's Name|
|`Customer.Identity`|Number|14|Yes|Customer's RG, CPF or CNPJ| 
|`Customer.IdentityType`|Text|25|Yes|Customer Identification Type (CPF or CNPJ)|
|`Customer.Email`|Text|60|Yes|Customer's e-mail address|
|`Customer.Birthdate`|Date|10|No|Customer's birth date YYYY-MM-DD|
|`Customer.WorkPhone`|Number|19|No|Customer's work phone|
|`Customer.Mobile`|Number|19|No|Customer's mobile phone|
|`Customer.Phone`|Number|19|No|Customer's phone|
|`Customer.Address.Street`|Text|24|Yes|Customer's main contact address|
|`Customer.Address.Number`|Text|5|Yes|Customer's main contact address building number|
|`Customer.Address.Complement`|Text|14|Yes|Customer's main contact address' additional data|
|`Customer.Address.District`|Text|15|Yes|Customer's main contact address' district name|
|`Customer.Address.ZipCode`|Text|9|Yes|Customer's main contact address ZIP code|
|`Customer.Address.City`|Text|20|Yes|Customer's main contact address' City|
|`Customer.Address.State`|Text|2|Yes|Customer's main contact address' State|
|`Customer.Address.Country`|Text|2|Yes|Customer's main contact address' Country|
|`Customer.DeliveryAddress.Street`|Text|24|Yes|Customer's delivery address|
|`Customer.DeliveryAddress.Number`|Text|5|Yes|Customer's delivery address building number|
|`Customer.DeliveryAddress.Complement`|Text|14|No|Customer's delivery address additional data|
|`Customer.DeliveryAddress.District`|Text|15|Yes|Customer's delivery address' district name|
|`Customer.DeliveryAddress.ZipCode`|Text|9|Yes|Customer's delivery address ZIP code|
|`Customer.DeliveryAddress.City`|Text|20|Yes|Customer's delivery address' City|
|`Customer.DeliveryAddress.State`|Text|2|Yes|Customer's delivery address' State|
|`Customer.DeliveryAddress.Country`|Text|2|Yes|Customer's delivery address' Country|
|`Customer.Status`|Text|8|No|Customer status. New -> Customer never bought in the store, it means a new customer. Existing -> Customer already bought in the store.|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Sim|Card's brand|
|`Payment.Interest`|Text|10|No|Installment Type - if by merchant (ByMerchant) and if by Issuer (ByIssuer)|
|`Payment.Capture`Boolean|---|No (Default false)|If automatic capture behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.Authenticate`Boolean|---|No (Default false)|If authentication behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.Recurrent`Boolean|---|No (Default false)|If recurrent behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|
|`Payment.SoftDescriptor`|Text|13|No|Message that will be presented into cardholder's billing|
|`Payment.ExtraDataCollection.Name`|Text|50|No|Extra Data field's name|
|`Payment.ExtraDataCollection.Value`|Text|1024|No|Extra Data field's value|
|`CreditCard.SaveCard`Boolean|---|No (Default false)|If the card must be saved, then true. Else false|
|`FraudAnalysis.Sequence`|Text|14|Yes|Possible values:<UL><LI>AnalyseFirst</LI><LI>AuthorizeFirst</LI></UL>|
|`FraudAnalysis.SequenceCriteria`|Text|9|Yes|Flow criteria.<BR><UL><LI>OnSuccess - on success of chosen sequence</LI><LI>Always - analyse independently the result of chosen sequence</LI></UL>|
|`FraudAnalysis.Provider`|Text|15|Yes|Fraud Prevention provider's name (Ex.: RedShield, Cybersource, etc)|
|`FraudAnalysis.CaptureOnLowRisk`Boolean|---|When true, the capture process will occur automaticlly when the fraud risk is low (Accept). In case of hight risk or review state, the flow will be the default. To use this flow, the Sequence must be "AuthorizeFirst"|
|`FraudAnalysis.VoidOnHighRisk`Boolean|---|No|When true, the void process will occur automaticlly when the fraud risk is hiht (Reject). In case of low risk or review state, the flow will be the default. To use this flow, the Sequence must be "AuthorizeFirst|
|`FraudAnalysis.TotalOrderAmount`|Number|15|Yes|Total order amount|
|`FraudAnalysis.OrderDate`|Datetime|---|Yes|Order date|
|`FraudAnalysis.IsRetryTransaction`Boolean|---|No|Identifies a new fraud analysis attempt. This field must be "true" when the return code is equal to BP900 (this code means there was a timeout between Braspag and Fraud Prevention Provider). Applies only to provider ReDShield)|
|`FraudAnalysis.FingerPrintId`|Text|6005|Yes|The id that indentifies the user’s browser. This ID must be used in the SESSIONID field in the script|
|`FraudAnalysis.Browser.IpAddress`|Text|15|Yes|Client’s IP Address. It is strongly recommended to send this field|
|`Cart.Items[n].Name`|Text|50|Yes|Product's name|
|`Cart.Items[n].Sku`|Text|12|Yes|Product identifier code|
|`Cart.Items[n].UnitPrice`|Number|15|Yes|Product unit price|
|`Cart.Items[n].OriginalPrice`|Number|50|Yes|Original price|
|`Cart.Items[n].Quantity`|Number|15|Yes|Number of products|
|`Cart.Items[n].MerchantItemId`|Text|30|No|Product identifier|
|`Cart.Items[n].GiftMessage`|Text|160|No|Gift message|
|`Cart.Items[n].Description`|Text|76|No|Product description|
|`Cart.Items[n].ShippingInstructions`|Text|160|No|Product delivery instructions|
|`Cart.Items[n].ShippingMethod`|Text|27|No|Shipping Method. Ex.: SameDay = Same day delivery method, NextDay = Delivery method the next day, TwoDay = Delivery method in two days, ThreeDay = Delivery method in three days, LowCost = Low cost delivery method, Pickup = Pickup store, CarrierDesignatedByCustomer = Customer designated delivery method, International = International delivery method, Military = Military delivery method, Other = Another type of delivery method, None = No delivery method, because it is a service or subscription|
|`Cart.Items[n].ShippingTrackingNumber`|Text|19|No|Shipping tracking number|
|`Cart.Items[n].Passenger.Name`|Text|61|Yes|Passenger's name|
|`Cart.Items[n].Passenger.Identity`|Number|14|Yes|Passenger's RG, CPF or CNPJ|
|`Cart.Items[n].Passenger.IdentityType`|Number|14|Yes|Passenger identification type  (CPF or CNPJ)|
|`Cart.Items[n].Passenger.Status`|Text|15|No|Airline classification. Ex.: Gold, Platinum|
|`Cart.Items[n].Passenger.Rating`|Text|15|Yes|Passenger classification|
|`Cart.Items[n].Passenger.Email`|Text|60|Yes|Passenger email|
|`Cart.Items[n].Passenger.Phone`|Number|14|No|Passenger phone|
|`Cart.Items[n].Passenger.DateOfBirth`|Date|10|No|Passenger's birth date|
|`FraudAnalysis.MerchantDefinedFields.Id`|Text|---|No|Additional information id|
|`FraudAnalysis.MerchantDefinedFields.Value`|Text|255|No|Additional information field values|
|`FraudAnalysis.Items.GiftCategory`|Text|9|No|Yes - In case of conflict between billing and delivery addresses, mark as low risk. No - In case of conflict between billing and delivery addresses, mark as high risk. Off - Ignores risk assessment for conflicting addresses|
|`FraudAnalysis.Items.HostHedge`|Text|9|No|Low - Low significance of email and IP address in risk assessment. Normal - Medium significance of email and IP address in risk assessment. High - High significance of email and IP address in risk assessment.
Off Email and IP address do not impact risk assessment|
|`FraudAnalysis.Items.NonSensicalHedge`|Text|6|No|Low - Low significance of the purchaser's order verification in risk
assessment. Normal - Medium significance of the purchaser's order verification in risk assessment. High - High significance of the purchaser's order verification in risk assessment. Off - Purchaser's order verification does not affect risk assessment.|
|`FraudAnalysis.Items.ObscenitiesHedge`|Text|6|No|Low - Low significance of the purchaser's order obscenities verification in risk assessment. Normal - Medium significance of the purchaser's order obscenities verification
in risk assessment. High - High significance of the purchaser's order obscenities verification in risk assessment. Off - Purchaser's order obscenities verification does not affect risk assessment|
|`FraudAnalysis.Items.PhoneHedge`|Text|6|No|Low - Low significance of tests performed with the phone numbers. Normal - Medium significance of tests performed with the phone numbers. High - High significance of tests performed with the phone numbers. Off - Tests with phone numbers do not affect risk assessment|
|`FraudAnalysis.Items.Name`|Text|255|Yes|Product's name|
|`FraudAnalysis.Items.Quantity`|Number|15|Yes|Iten's quantity|
|`FraudAnalysis.Items.Sku`|Text|255|Yes|Product's SKU Code|
|`FraudAnalysis.Items.UnitPrice`|Number|15|Yes|Unit Price|
|`FraudAnalysis.Items.Risk`|Text|6|No|Product risk level <BR><UL><LI>Low (lowr risk)</LI><LI>Normal (medium risk)</LI><LI>High (hight risk)</LI></UL>|
|`FraudAnalysis.Items.TimeHedge`|Text||No|Importance level of customer order per time of day <BR><UL><LI>Low (lowr risk)</LI><LI>Normal (medium risk)</LI><LI>High (hight risk)</LI><Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.Type`|Text||No|Product Type<BR><UL><LI>AdultContent</LI><LI>Coupon</LI><LI>Default</LI><LI>EletronicGood</LI><LI>EletronicSoftware</LI><LI>GiftCertificate</LI><LI>HandlingOnly</LI><LI>Service</LI><LI>ShippingAndHandling</LI><LI>ShippingOnly</LI><LI>Subscription</LI></UL>|
|`FraudAnalysis.Items.VelocityHedge`|Text|6|No|Importance level of customer purchase frequency<BR><UL><LI>Low (low relevance for last 15 minutes)</LI><LI>Normal (medium relevance for last 15 minutes)</LI><LI>High (hight relevance for last 15 minutes)</LI><LI>Off (ignore this criteria)</LI></UL>|
|`FraudAnalysis.Items.Passenger.Email`|Text|255|No|Passagen's E-mail Address|
|`FraudAnalysis.Items.Passenger.Identity`|Text|32|No|Passenger Id to whom the ticket was issued|
|`FraudAnalysis.Items.Passenger.Name`|Text|120|No|Passenger's name|
|`FraudAnalysis.Items.Passenger.Rating`|Text||No|Passenger classification<BR><UL><LI>Adult</LI><LI>Child</LI><LI>Infant</LI><LI>Youth</LI><LI>Student)</LI><LI>SeniorCitizen</LI><LI>Military</LI></UL>|
|`FraudAnalysis.Items.Passenger.Phone`|Text|15|No|Delivery recipient’s phone. Ex. 552133665599 (Country Code 55, City Code 21, phone number 33665599)|
|`FraudAnalysis.Items.Passenger.Status`|Text|32|No|Airline ranking. One can use values such as Gold or Platinum|
|`FraudAnalysis.Shipping.Addressee`|Text|61|No|Delivery recipient’s name|
|`FraudAnalysis.Shipping.Email`|Text|60|No|Delivery recipient’s email|
|`FraudAnalysis.Shipping.Method`|Text|16|No|Shippint type<BR><UL><LI>SameDay</LI><LI>OneDay</LI><LI>TwoDay</LI><LI>ThreeDay</LI><LI>LowCost(</LI><LI>Pickup</LI><LI>Other</LI><LI>None</LI></UL>|
|`FraudAnalysis.Shipping.Phone`|Text|15|No|Delivery recipient’s phone. Ex. 552133665599 (Country Code 55, City Code 21, phone number 33665599)|
|`FraudAnalysis.CustomConfiguration.MerchantWebsite`|Text|60|No|Merchant website|
|`FraudAnalysis.Travel.Route`|Text|255|No|Route trip. Concatenation of flight connections in ORIG1- DEST1 format|
|`FraudAnalysis.Travel.DepartureTime`|DateTime|23|No|Date, hour and minute of flight departure AAAA-MM-DD HH:mm:SS|
|`FraudAnalysis.Travel.JourneyType`|Text|32|No|Trip type. Ex. "Só Ida", "Só Volta", "Ida e Volta"|
|`FraudAnalysis.Travel.Legs.Origin`|Text|3|No|Airport code of the origin|
|`FraudAnalysis.Travel.Legs.Destination`|Text|3|No|Airport code of the destination|

### Response

```json
{
    "MerchantOrderId": "201411170314344356",
    "Customer": {
        "Name": "Comprador Teste",
        "Identity": "46286005030",
        "IdentityType": "CPF",
        "Email": "comprador_teste@live.com",
        "Phone": "552125553669",
        "Birthdate": "1986-08-01",
        "Address": {
            "Street": "Rua Teste",
            "Number": "500",
            "Complement": "AP 205",
            "ZipCode": "21002320",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "District": "Tijuca"
        },
        "DeliveryAddress": {
            "Street": "Av Marechal Camara",
            "Number": "160",
            "Complement": "Sala 934",
            "ZipCode": "20020080",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "District": "Centro",
            "Comment": "Ao lado do banco Santander"
        },
        "Status": "New",
        "WorkPhone": "552121544788",
        "Mobile": "5521995760078"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "471622******6310",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "2110886",
        "AcquirerTransactionId": "0619022110886",
        "AuthorizationCode": "595071",
        "FraudAnalysis": {
            "Sequence": "AnalyseFirst",
            "SequenceCriteria": "Always",
            "FingerPrintId": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
            "Provider": "RedShield",
            "CaptureOnLowRisk": true,
            "VoidOnHighRisk": true,
            "TotalOrderAmount": 16700,
            "IsRetryTransaction": false,
            "CustomConfiguration": {
                "RiskAmount": 0,
                "MerchantWebsite": "http://www.test.com"
            },
            "MerchantDefinedFields": [{
                "Id": "95",
                "Value": "Definido pelo cliente junto ao provedor"
            }, {
                "Id": "96",
                "Value": "Definido pelo cliente junto ao provedor"
            }],
            "Cart": {
                "IsGift": false,
                "ReturnsAccepted": false,
                "Items": [{
                    "Type": "Undefined",
                    "Name": "Nome do produto",
                    "Risk": "Undefined",
                    "Sku": "201411170235",
                    "UnitPrice": 10950,
                    "Quantity": 1,
                    "HostHedge": "Undefined",
                    "NonSensicalHedge": "Undefined",
                    "ObscenitiesHedge": "Undefined",
                    "PhoneHedge": "Undefined",
                    "TimeHedge": "Undefined",
                    "VelocityHedge": "Undefined",
                    "GiftCategory": "Undefined",
                    "Passenger": {
                        "Name": "Passageiro Teste1",
                        "Identity": "1234567891",
                        "Status": "Platinum",
                        "Rating": "Student",
                        "Email": "passageiro_teste1@live.com",
                        "Phone": "55999993333",
                        "DateOfBirth": "1988-01-06"
                    },
                    "OriginalPrice": 11490,
                    "Description": "Descricao do produto",
                    "Weight": 0,
                    "GiftMessage": "Mensagem para presente",
                    "ShippingInstructions": "Proximo ao 546",
                    "ShippingMethod": "SameDay",
                    "ShippingTrackingNumber": "123456",
                    "CartType": 0,
                    "MerchantItemId": "45584"
                }, {
                    "Type": "Undefined",
                    "Name": "Nome do produto",
                    "Risk": "Undefined",
                    "Sku": "20141117023",
                    "UnitPrice": 10950,
                    "Quantity": 2,
                    "HostHedge": "Undefined",
                    "NonSensicalHedge": "Undefined",
                    "ObscenitiesHedge": "Undefined",
                    "PhoneHedge": "Undefined",
                    "TimeHedge": "Undefined",
                    "VelocityHedge": "Undefined",
                    "GiftCategory": "Undefined",
                    "Passenger": {
                        "Name": "Passageiro Teste2",
                        "Identity": "1234567892",
                        "Status": "Gold",
                        "Rating": "Adult",
                        "Email": "passageiro_teste2@live.com",
                        "Phone": "5521999994444",
                        "DateOfBirth": "1958-07-06"
                    },
                    "OriginalPrice": 11490,
                    "Description": "Descricao do produto",
                    "Weight": 0,
                    "GiftMessage": "Mensagem para presente",
                    "ShippingInstructions": "Proximo ao 160",
                    "ShippingMethod": "NextDay",
                    "ShippingTrackingNumber": "654321",
                    "CartType": 0,
                    "MerchantItemId": "45585"
                }]
            },
            "Travel": {
                "Route": "GIG-CGH-EZE",
                "DepartureTime": "2016-12-10T15:10:15",
                "JourneyType": "OneWayTrip",
                "Legs": [{
                    "Destination": "CGH",
                    "Origin": "GIG"
                }, {
                    "Destination": "EZE",
                    "Origin": "CGH"
                }]
            },
            "Browser": {
                "CookiesAccepted": false,
                "IpAddress": "187.32.163.105"
            },
            "Shipping": {
                "Addressee": "Destinatario Teste",
                "Phone": "5521995950277",
                "Method": "LowCost",
                "Email": "destinatario_teste@live.com"
            },
            "Id": "a97eb2ae-1355-e711-93ff-000d3ac03bed",
            "Status": 0,
            "StatusDescription": "Unknown",
            "ReplyData": {
                "FactorCode": "200.300.404",
                "ReturnMessage": "invalid or missing parameter"
            }
        },
        "PaymentId": "949e33e4-d410-4212-b111-d9c8fdc0580d",
        "Type": "CreditCard",
        "Amount": 15700,
        "ReceivedDate": "2017-06-19 14:21:07",
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ReasonCode": 0,
        "ReasonMessage": "Successful",
        "Status": 1,
        "ProviderReturnCode": "4",
        "ProviderReturnMessage": "Operation Successful",
        "Links": [{
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerydev.braspag.com.br/v2/sales/949e33e4-d410-4212-b111-d9c8fdc0580d"
        }, {
            "Method": "PUT",
            "Rel": "capture",
            "Href": "https://apidev.braspag.com.br/v2/sales/949e33e4-d410-4212-b111-d9c8fdc0580d/capture"
        }, {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apidev.braspag.com.br/v2/sales/949e33e4-d410-4212-b111-d9c8fdc0580d/void"
        }]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "201411170314344356",
    "Customer": {
        "Name": "Comprador Teste",
        "Identity": "46286005030",
        "IdentityType": "CPF",
        "Email": "comprador_teste@live.com",
        "Phone": "552125553669",
        "Birthdate": "1986-08-01",
        "Address": {
            "Street": "Rua Teste",
            "Number": "500",
            "Complement": "AP 205",
            "ZipCode": "21002320",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "District": "Tijuca"
        },
        "DeliveryAddress": {
            "Street": "Av Marechal Camara",
            "Number": "160",
            "Complement": "Sala 934",
            "ZipCode": "20020080",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "District": "Centro",
            "Comment": "Ao lado do banco Santander"
        },
        "Status": "New",
        "WorkPhone": "552121544788",
        "Mobile": "5521995760078"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "471622******6310",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "2110886",
        "AcquirerTransactionId": "0619022110886",
        "AuthorizationCode": "595071",
        "FraudAnalysis": {
            "Sequence": "AnalyseFirst",
            "SequenceCriteria": "Always",
            "FingerPrintId": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
            "Provider": "RedShield",
            "CaptureOnLowRisk": true,
            "VoidOnHighRisk": true,
            "TotalOrderAmount": 16700,
            "IsRetryTransaction": false,
            "CustomConfiguration": {
                "RiskAmount": 0,
                "MerchantWebsite": "http://www.test.com"
            },
            "MerchantDefinedFields": [{
                "Id": "95",
                "Value": "Definido pelo cliente junto ao provedor"
            }, {
                "Id": "96",
                "Value": "Definido pelo cliente junto ao provedor"
            }],
            "Cart": {
                "IsGift": false,
                "ReturnsAccepted": false,
                "Items": [{
                    "Type": "Undefined",
                    "Name": "Nome do produto",
                    "Risk": "Undefined",
                    "Sku": "201411170235",
                    "UnitPrice": 10950,
                    "Quantity": 1,
                    "HostHedge": "Undefined",
                    "NonSensicalHedge": "Undefined",
                    "ObscenitiesHedge": "Undefined",
                    "PhoneHedge": "Undefined",
                    "TimeHedge": "Undefined",
                    "VelocityHedge": "Undefined",
                    "GiftCategory": "Undefined",
                    "Passenger": {
                        "Name": "Passageiro Teste1",
                        "Identity": "1234567891",
                        "Status": "Platinum",
                        "Rating": "Student",
                        "Email": "passageiro_teste1@live.com",
                        "Phone": "55999993333",
                        "DateOfBirth": "1988-01-06"
                    },
                    "OriginalPrice": 11490,
                    "Description": "Descricao do produto",
                    "Weight": 0,
                    "GiftMessage": "Mensagem para presente",
                    "ShippingInstructions": "Proximo ao 546",
                    "ShippingMethod": "SameDay",
                    "ShippingTrackingNumber": "123456",
                    "CartType": 0,
                    "MerchantItemId": "45584"
                }, {
                    "Type": "Undefined",
                    "Name": "Nome do produto",
                    "Risk": "Undefined",
                    "Sku": "20141117023",
                    "UnitPrice": 10950,
                    "Quantity": 2,
                    "HostHedge": "Undefined",
                    "NonSensicalHedge": "Undefined",
                    "ObscenitiesHedge": "Undefined",
                    "PhoneHedge": "Undefined",
                    "TimeHedge": "Undefined",
                    "VelocityHedge": "Undefined",
                    "GiftCategory": "Undefined",
                    "Passenger": {
                        "Name": "Passageiro Teste2",
                        "Identity": "1234567892",
                        "Status": "Gold",
                        "Rating": "Adult",
                        "Email": "passageiro_teste2@live.com",
                        "Phone": "5521999994444",
                        "DateOfBirth": "1958-07-06"
                    },
                    "OriginalPrice": 11490,
                    "Description": "Descricao do produto",
                    "Weight": 0,
                    "GiftMessage": "Mensagem para presente",
                    "ShippingInstructions": "Proximo ao 160",
                    "ShippingMethod": "NextDay",
                    "ShippingTrackingNumber": "654321",
                    "CartType": 0,
                    "MerchantItemId": "45585"
                }]
            },
            "Travel": {
                "Route": "GIG-CGH-EZE",
                "DepartureTime": "2016-12-10T15:10:15",
                "JourneyType": "OneWayTrip",
                "Legs": [{
                    "Destination": "CGH",
                    "Origin": "GIG"
                }, {
                    "Destination": "EZE",
                    "Origin": "CGH"
                }]
            },
            "Browser": {
                "CookiesAccepted": false,
                "IpAddress": "187.32.163.105"
            },
            "Shipping": {
                "Addressee": "Destinatario Teste",
                "Phone": "5521995950277",
                "Method": "LowCost",
                "Email": "destinatario_teste@live.com"
            },
            "Id": "a97eb2ae-1355-e711-93ff-000d3ac03bed",
            "Status": 0,
            "StatusDescription": "Unknown",
            "ReplyData": {
                "FactorCode": "200.300.404",
                "ReturnMessage": "invalid or missing parameter"
            }
        },
        "PaymentId": "949e33e4-d410-4212-b111-d9c8fdc0580d",
        "Type": "CreditCard",
        "Amount": 15700,
        "ReceivedDate": "2017-06-19 14:21:07",
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ReasonCode": 0,
        "ReasonMessage": "Successful",
        "Status": 1,
        "ProviderReturnCode": "4",
        "ProviderReturnMessage": "Operation Successful",
        "Links": [{
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerydev.braspag.com.br/v2/sales/949e33e4-d410-4212-b111-d9c8fdc0580d"
        }, {
            "Method": "PUT",
            "Rel": "capture",
            "Href": "https://apidev.braspag.com.br/v2/sales/949e33e4-d410-4212-b111-d9c8fdc0580d/capture"
        }, {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apidev.braspag.com.br/v2/sales/949e33e4-d410-4212-b111-d9c8fdc0580d/void"
        }]
    }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`SoftDescriptor`|Texto que será impresso na fatura do portador|Text|13|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|
|`FraudAnalysis.Id`|Indentificação da Transação no Antifraud|Text|300|Alphanumeric Text|
|`FraudAnalysis.Status`|Transaction Status|Byte|3|Ex.: 500|
|`FraudAnalysis.ReplyData.FactorCode`|Codes that identifies the score level of an order|Text|100|Ex: B^D^R^Z<br /><UL><LI>A - Excessive Change of Address.The customer has changed the billing address two or more times in the last six months.</LI>
<LI>B - BIN card or risk authorization. Risk factors are related to credit card and BIN / or card authorization checks.</LI>
<LI>C - High numbers of credit cards.The customer has used more than six numbers of credit cards in the past six months.</LI>
<LI>D - Impact of the e-mail address.The customer uses a free email provider or e-mail address is risky.</LI>
<LI>E - Positive list. The customer is in its positive list.</LI>
<LI>F - Negative list. The account number, address, email address or IP address for this purpose appears in its negative list.</LI>
<LI>G - geolocation inconsistencies.The email client domain, phone number, billing address, shipping address or IP address is suspect.</LI>
<LI>H - excessive name changes.The customer changed its name twice or more in the past six months.</LI>
<LI>I - Internet inconsistencies.The IP address and e-mail domain are not consistent with the billing address.</LI>
<LI>N - Entrance meaningless.The customer name and address fields contain meaningless words or language.</LI>
<LI>The - obscenities.Customer data contains obscene words.</LI>
<LI>P - morphing identity. Various amounts of an identity element are attached to a different value of an identity element. For example, various telephone numbers are connected to a single account number.</LI>
<LI>Q - Inconsistencies phone. The customer’s phone number is suspect.</LI>
<LI>R - risky Order.The transaction, the customer and the merchant show information correlated high risk.</LI>
<LI>T - Time Coverage. The client is attempting a purchase outside the expected time.</LI>
<LI>U - unverifiable address. The billing address or delivery can not be verified.</LI>
<LI>V - Velocity.The account number was used many times in the last 15 minutes.</LI>
<LI>W - marked as suspect. The billing address and delivery is similar to an address previously marked suspect.</LI>
<LI>Y - The address, city, state or country of billing and shipping addresses do not correlate.</LI>
<LI>Z - Invalid value. As the request it contains an unexpected value, a default value has been replaced. Although the transaction can still be processed, examine the application carefully to detect abnormalities.</LI></UL>|

## Saving a Credit Card

Using the "Cartão Protegido), it is possible to save a card in the form of a Token. This token can be provided in place of the card data in a transaction from the same customer. It is important to note that due to security issues, the CVV (Security Code) never be tokenized.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051104",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":true,
       "Alias": "Cliente1"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051104",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":true,
       "Alias": "Cliente1"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|
|`CreditCard.SaveCard`|Boolean|10|No|No (Default false)|If the card must be saved, then true. Else false.|
|`CreditCard.Alias`|Text|64|Não|Alias (Nickname) of the credit card|

### Response

```json
{
  "MerchantOrderId": "2017051104",
  "Customer": {
    "Name": "Customer's Name"
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
      "ExpirationDate": "12/2021",
      "SaveCard": true,
      "CardToken": "250e7c7c-5501-4a7c-aa42-a33d7ad61167",
      "Brand": "Visa",
     "Alias": "Cliente1"
    },
    "ProofOfSale": "3519928",
    "AcquirerTransactionId": "0511023519928",
    "AuthorizationCode": "536934",
    "PaymentId": "3af00b2d-dbd0-42d6-a669-d4937f0881da",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 14:35:19",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/3af00b2d-dbd0-42d6-a669-d4937f0881da"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/3af00b2d-dbd0-42d6-a669-d4937f0881da/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/3af00b2d-dbd0-42d6-a669-d4937f0881da/void"
      }
    ]
  }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "MerchantOrderId": "2017051104",
  "Customer": {
    "Name": "Customer's Name"
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
      "ExpirationDate": "12/2021",
      "SaveCard": true,
      "CardToken": "250e7c7c-5501-4a7c-aa42-a33d7ad61167",
      "Brand": "Visa",
     "Alias": "Cliente1"
    },
    "ProofOfSale": "3519928",
    "AcquirerTransactionId": "0511023519928",
    "AuthorizationCode": "536934",
    "PaymentId": "3af00b2d-dbd0-42d6-a669-d4937f0881da",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 14:35:19",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/3af00b2d-dbd0-42d6-a669-d4937f0881da"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/3af00b2d-dbd0-42d6-a669-d4937f0881da/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/3af00b2d-dbd0-42d6-a669-d4937f0881da/void"
      }
    ]
  }
}
--verbose
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|
|`CreditCard.CardToken`|Token no Cartão Protegido que representa os dados do cartão|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Credit Card Payment with Token

This is an example of how to use the previously saved Card Token to create a new transaction. For security reasons, a Card Token has not stored the Security Code. In this case, you need to request this information from the customer for each new transaction (except in cases of recurring transactions).

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051105",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardToken":"250e7c7c-5501-4a7c-aa42-a33d7ad61167",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051105",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardToken":"250e7c7c-5501-4a7c-aa42-a33d7ad61167",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardToken`|Token no Cartão Protegido que representa os dados do cartão|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051105",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "250e7c7c-5501-4a7c-aa42-a33d7ad61167",
      "Brand": "Visa"
    },
    "ProofOfSale": "124305",
    "AcquirerTransactionId": "0511030124305",
    "AuthorizationCode": "065964",
    "PaymentId": "23cd8bf5-2251-4991-9042-533ff5608788",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 15:01:24",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/void"
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
  "MerchantOrderId": "2017051105",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "250e7c7c-5501-4a7c-aa42-a33d7ad61167",
      "Brand": "Visa"
    },
    "ProofOfSale": "124305",
    "AcquirerTransactionId": "0511030124305",
    "AuthorizationCode": "065964",
    "PaymentId": "23cd8bf5-2251-4991-9042-533ff5608788",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 15:01:24",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|

## Credit Card Payment with Alias

This is an example of how to use the previously saved Alias to create a new transaction. For security reasons, a Alias has not stored the Security Code. In this case, you need to request this information from the customer for each new transaction (except in cases of recurring transactions).

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051105",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "Alias":"Cliente1",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051105",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "Alias":"Cliente1",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardToken`|Token no Cartão Protegido que representa os dados do cartão|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|
|`CreditCard.Alias`|Text|64|Não|Alias (Nickname) of the credit card|

### Response

```json
{
  "MerchantOrderId": "2017051105",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "Alias":"Cliente1",
      "Brand": "Visa"
    },
    "ProofOfSale": "124305",
    "AcquirerTransactionId": "0511030124305",
    "AuthorizationCode": "065964",
    "PaymentId": "23cd8bf5-2251-4991-9042-533ff5608788",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 15:01:24",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/void"
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
  "MerchantOrderId": "2017051105",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "Alias":"Cliente1",
      "Brand": "Visa"
    },
    "ProofOfSale": "124305",
    "AcquirerTransactionId": "0511030124305",
    "AuthorizationCode": "065964",
    "PaymentId": "23cd8bf5-2251-4991-9042-533ff5608788",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 15:01:24",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/23cd8bf5-2251-4991-9042-533ff5608788/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|

## Capture Operation

A pre-authorized transaction requires a "Capture" operation to confirm the transaction. Here's the example.

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/sales/{PaymentId}/capture</span></aside>

```

```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/sales/{PaymentId}/capture?amount=xxx&serviceTaxAmount=xxx"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`PaymentId`|Braspag's Transaction ID|Guid|36|Yes|
|`Amount`|Amount to be captured (in cents). Check if the acquirer supports partial capture|Number|15|No|
|`ServiceTaxAmount`|Service Tax Amount to be added to the total amount of transaction|Number|15|No|

### Response

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReasonCode": "6",
    "ProviderReasonMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.braspag.com.br/v2/sales/{PaymentId}/void"
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
    "ProviderReasonCode": "6",
    "ProviderReasonMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.braspag.com.br/v2/sales/{PaymentId}/void"
        }
    ]
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction's Status. | Byte | --- | 2|
|`ReasonCode`|Código de retorno da adquirente. | Texto | 32 | Texto alfanumérico |
|`ReasonMessage`|Mensagem de retorno da adquirente. | Texto | 512 | Texto alfanumérico |

## Void/Refund Operation

To void or refund a transaction, follow the example bellow

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/sales/{PaymentId}/void?amount=xxx</span></aside>

```

```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/sales/{PaymentId}/void?amount=xxx"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`PaymentId`|Braspag's Transaction ID. |Guid |36 |Yes|
|`Amount`|Amount to be voided or refunded (in cents)|Number|15 |No|

### Response

```json
{
    "Status": 10,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReasonCode": "9",
    "ProviderReasonMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
        }
    ]
}
```

```shell
{
    "Status": 10,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReasonCode": "9",
    "ProviderReasonMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
        }
    ]
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`Status`|Transaction's Status|Byte|---|10|
|`ReasonCode`|Operation's return code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's return Message|Text|512|Alphanumeric Text|

## Credit Card Payment with Velocity Check

Velocity Check is a part of fraud prevention system that specifically analyzes the concept of "velocity". It analyzes the frequency of elements such as Card Number, CPF, ZIP code, etc. The feature must be contracted separately, and later enabled in your Merchant ID. When Velocity is active, the transaction response will bring a specific node called "Velocity", with the analysis details.

In case of rejection by Velocity, the ProviderReasonCode will be BP171 - Rejected by fraud risk (velocity, com ReasonCode 16 - AbortedByFraud)

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/sales/{PaymentId}/void?amount=xxx</span></aside>

```json
{
   "MerchantOrderId":"2017051202",
   "Customer":{
      "Name": "Customer's Name",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"comprador@braspag.com.br",
      "IpAdress":"127.0.01",
      "Address":{  
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA"
      },
     "DeliveryAddress": {
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA"
       }
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2027",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/sales/{PaymentId}/void?amount=xxx"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
{
   "MerchantOrderId":"2017051202",
   "Customer":{
      "Name": "Customer's Name",
      "Identity":"12345678909",
      "IdentityType":"CPF",
      "Email":"comprador@braspag.com.br",
      "IpAdress":"127.0.01",
      "Address":{  
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA"
      },
     "DeliveryAddress": {
         "Street":"Alameda Xingu",
         "Number":"512",
         "Complement":"27 andar",
         "ZipCode":"12345987",
         "City":"São Paulo",
         "State":"SP",
         "Country":"BRA"
       }
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2027",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Customer.Identity`|Text|14 |Yes|Customer's RG, CPF or CNPJ| 
|`Customer.IdentityType`|Text|255|Yes|Customer Identification Type  (CPF or CNPJ)|
|`Customer.Email`|Text|255|Yes|Customer's e-mail address|
|`Customer.IpAddress`|Text|255|Yes|Customer's IP Address|
|`Customer.Address.Street`|Text|255|No|Customer's main contact address|
|`Customer.Address.Number`|Text|15|No|Customer's main contact address building number|
|`Customer.Address.Complement`|Text|50|No|Customer's main contact address additional data|
|`Customer.Address.ZipCode`|Text|9|Yes|Customer's main contact address ZIP code|
|`Customer.Address.City`|Text|50|No|Customer's main contact address' City|
|`Customer.Address.State`|Text|2|No|Customer's main contact address' State|
|`Customer.Address.Country`|Text|35|No|Customer's main contact address' Country|
|`Customer.Address.District`|Text|50 |No|Customer's main contact address' district name |
|`Customer.DeliveryAddress.Street`|Text|255|No|Customer's delivery address|
|`Customer.DeliveryAddress.Number`|Text|15|No|Customer's delivery address building number|
|`Customer.DeliveryAddress.Complement`|Text|50|No|Customer's delivery address additional data|
|`Customer.DeliveryAddress.ZipCode`|Text|9|No|Customer's delivery address ZIP code|
|`Customer.DeliveryAddress.City`|Text|50|No|Customer's delivery address' City|
|`Customer.DeliveryAddress.State`|Text|2|No|Customer's delivery address' State|
|`Customer.DeliveryAddress.Country`|Text|35|No|Customer's delivery address' Country|
|`Customer.DeliveryAddress.District`|Text|50 |No|Customer's delivery address' district name |
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051202",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@braspag.com.br",
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
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/2d5e0463-47be-4964-b8ac-622a16a2b6c4"
      }
    ]
  }
}
```

```shell
{
  "MerchantOrderId": "2017051202",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@braspag.com.br",
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
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/2d5e0463-47be-4964-b8ac-622a16a2b6c4"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`VelocityAnalysis.Id`|Velocity Identification ID|GUID|36|
|`VelocityAnalysis.ResultMessage`|Accept ou Reject|Text|25|
|`VelocityAnalysis.Score`|100|Number|10|
|`VelocityAnalysis.RejectReasons.RuleId`|Reject Reason Code|Number|10|
|`VelocityAnalysis.RejectReasons.Message`|Description of Rejection|Text|512|

## Credit Card Payment with "Renova Fácil"

The "Renova Fácil" is a feature developed by CIELO and the banks, in order to increasing an authorization conversion rate, identifying expired cards and returning the corresponding new card. Issuing banks that support this feature: Bradesco, Banco do Brasil, Santander, Panamericano, Citibank

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/sales/{PaymentId}/void?amount=xxx</span></aside>

```json
{
   "MerchantOrderId":"2017051201",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000183",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2016",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/sales/{PaymentId}/void?amount=xxx"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
{
   "MerchantOrderId":"2017051201",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
    "Capture":true,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000183",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2016",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051201",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0183",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2016",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "AcquirerTransactionId": "0512105630844",
    "NewCard": {
      "CardNumber": "4551870000512353",
      "Holder": "Nome do Portador",
      "ExpirationDate": "05/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "PaymentId": "ca81c3c9-2dfa-4e6e-9c77-37e33a77ac84",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-12 10:56:30",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 15,
    "ReasonMessage": "CardExpired",
    "Status": 3,
    "ProviderReturnCode": "57",
    "ProviderReturnMessage": "Card Expired",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/ca81c3c9-2dfa-4e6e-9c77-37e33a77ac84"
      }
    ]
  }
}
```

```shell
{
  "MerchantOrderId": "2017051201",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0183",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2016",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "AcquirerTransactionId": "0512105630844",
    "NewCard": {
      "CardNumber": "4551870000512353",
      "Holder": "Nome do Portador",
      "ExpirationDate": "05/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "PaymentId": "ca81c3c9-2dfa-4e6e-9c77-37e33a77ac84",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-12 10:56:30",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 15,
    "ReasonMessage": "CardExpired",
    "Status": 3,
    "ProviderReturnCode": "57",
    "ProviderReturnMessage": "Card Expired",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/ca81c3c9-2dfa-4e6e-9c77-37e33a77ac84"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`NewCard.CardNumber`|Novo Credit Card number|Text|16|
|`NewCard.Holder`|Nome do portador impresso no novo cartão|Text|25|
|`NewCard.ExpirationDate`|Data de validade impresso no novo cartão|Text|7|
|`NewCard.SecurityCode`|Código de segurança impresso no verso do novo cartão|Text|4|
|`NewCard.Brand`|Bandeira do novo cartão|Text|10|

# Debit Card Payment

## Creating a transaction

To create a debit card transaction, you must request just linke a credit card transaction, however, it is mandatory to submit it to the authentication process. Currently, only "Cielo" or "Cielo30" providers support this kind of transaction using Pagador.
### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051107",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Cielo",
     "Type":"DebitCard",
     "Amount":10000,
     "Installments":1,
     "ReturnUrl":"http://www.braspag.com.br",
     "DebitCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051107",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Cielo",
     "Type":"DebitCard",
     "Amount":10000,
     "Installments":1,
     "ReturnUrl":"http://www.braspag.com.br",
     "DebitCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name. Currently, only "Cielo" or "Cielo30" providers support this kind of transaction using Pagador|
|`Payment.Type`|Text|100|Yes|Payment Method's Type. In this case, DebitCard|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.ReturnUrl`|URL para onde o usuário será redirecionado após o fim do pagamento|Text|1024 |Yes|
|`DebitCard.CardNumber`|Text|16|Yes|Credit Card number|
|`DebitCard.Holder`|Text|25|Yes|Cardholder name|
|`DebitCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`DebitCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`DebitCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051107",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "DebitCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "AuthenticationUrl": "https://qasecommerce.cielo.com.br/web/index.cbmp?id=13fda1da8e3d90d3d0c9df8820b96a7f",
    "AcquirerTransactionId": "10069930690009D366FA",
    "PaymentId": "21423fa4-6bcf-448a-97e0-e683fa2581ba",
    "Type": "DebitCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 15:19:58",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ReturnUrl": "http://www.braspag.com.br",
    "ReasonCode": 9,
    "ReasonMessage": "Waiting",
    "Status": 0,
    "ProviderReturnCode": "0",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/21423fa4-6bcf-448a-97e0-e683fa2581ba"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/21423fa4-6bcf-448a-97e0-e683fa2581ba/void"
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
  "MerchantOrderId": "2017051107",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "DebitCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "AuthenticationUrl": "https://qasecommerce.cielo.com.br/web/index.cbmp?id=13fda1da8e3d90d3d0c9df8820b96a7f",
    "AcquirerTransactionId": "10069930690009D366FA",
    "PaymentId": "21423fa4-6bcf-448a-97e0-e683fa2581ba",
    "Type": "DebitCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 15:19:58",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ReturnUrl": "http://www.braspag.com.br",
    "ReasonCode": 9,
    "ReasonMessage": "Waiting",
    "Status": 0,
    "ProviderReturnCode": "0",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/21423fa4-6bcf-448a-97e0-e683fa2581ba"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/21423fa4-6bcf-448a-97e0-e683fa2581ba/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Status`|Transaction's Status|Byte|2|1|
|`ProviderReturnCode`|Acquirer or Bank’s return code.|Text|32|57|
|`ProviderReturnMessage`|Acquirer or Issuer’s return message|Text|32|57||Text|512|Transação Aprovada|
|`AuthenticationUrl`|Authentication URL to be sent to the customer|Text|56|https://qasecommerce.cielo.com.br/web/index.cbmp?id=13fda1da8e3d90d3d0c9df8820b96a7f|

# Electronic Transfer Payments
   
## Creating a transaction

To create an electronic transfer payment (known as Online Debit as well), it is necessary make a POST as presented below.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
    "MerchantOrderId":"2017051109",
    "Customer":
    {  
        "Name": "Customer's Name",
        "Identity": "12345678909",
        "IdentityType": "CPF",
        "Email": "comprador@braspag.com.br",
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
        "ReturnUrl":"http://www.braspag.com.br"
    }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
    "MerchantOrderId":"2017051109",
    "Customer":
    {  
        "Name": "Customer's Name",
        "Identity": "12345678909",
        "IdentityType": "CPF",
        "Email": "comprador@braspag.com.br",
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
        "ReturnUrl":"http://www.braspag.com.br"
    }
}
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Merchant Order ID|Text|50|Yes|
|`Customer.Name`|Customer's Name|Text|255|Yes|
|`Customer.Identity`|Yes|Customer's RG, CPF or CNPJ|Text|14|
|`Customer.IdentityType`|Customer Identification Type  (CPF or CNPJ)|Text|255|No|
|`Customer.Email`|Customer's e-mail address|Text|255|No|
|`Customer.Address.Street`|Customer's main contact address||Text|255|No|
|`Customer.Address.Number`|Customer's main contact address building number|Text|15|No|
|`Customer.Address.Complement`|Customer's main contact address additional data|Text|50|No|
|`Customer.Address.ZipCode`|Customer's main contact address ZIP code|Text|9|No|
|`Customer.Address.City`|Customer's main contact address' City|Text|50|No|
|`Customer.Address.State`|Customer's main contact address' State|Text|2|No|
|`Customer.Address.Country`|Customer's main contact address' Country||Text|35|No|
|`Customer.Address.District`|Customer's main contact address' district name|Text|50|No|
|`Payment.Type`|Payment Method's Type|Text|100|Yes|
|`Payment.Amount`|Transaction Amount (must be sent in cents)|Number|15|Yes|
|`Payment.Provider`|Payment Method Provider's name|Text|15|---|

### Response

```json
{
    "MerchantOrderId": "2017051109",
    "Customer": {
        "Name": "Customer's Name",
        "Identity": "12345678909",
        "IdentityType": "CPF",
        "Email": "comprador@braspag.com.br",
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
    "Payment": {
        "Url": "https://xxx.xxxxxxx.xxx.xx/post/EletronicTransfer/Redirect/{PaymentId}",
        "PaymentId": "765548b6-c4b8-4e2c-b9b9-6458dbd5da0a",
        "Type": "EletronicTransfer",
        "Amount": 10000,
        "ReceivedDate": "2015-06-25 09:37:55",
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco",
        "ReturnUrl": "http://www.braspag.com.br",
        "ReasonCode": 0,
        "ReasonMessage": "Successful",
        "Status": 0,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
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
    "MerchantOrderId": "2017051109",
    "Customer": {
        "Name": "Comprador Teste",
    },
    "Payment": {
        "Url": "https://xxx.xxxxxxx.xxx.xx/post/EletronicTransfer/Redirect/{PaymentId}",
        "PaymentId": "765548b6-c4b8-4e2c-b9b9-6458dbd5da0a",
        "Type": "EletronicTransfer",
        "Amount": 10000,
        "ReceivedDate": "2015-06-25 09:37:55",
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco",
        "ReturnUrl": "http://www.braspag.com.br",
        "ReasonCode": 0,
        "ReasonMessage": "Successful",
        "Status": 0,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
            }
        ]
    }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Url`|Authentication URL to be sent to the customer|Text|256|URL|
|`Status`|Transaction's Status|Byte|2|1|

# Boleto Payment

## Creating a Boleto without registration

To create a boleto without registration payment (known as "Boleto sem Registro" as well), it is necessary make a POST as presented below.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
    "MerchantOrderId":"2017051110",
    "Customer":
    {  
        "Name": "Customer's Name"     
    },
    "Payment":
    {  
        "Provider":"Simulado",
      "Type":"Boleto",
        "Amount":10000,
      "Assignor": "Braspag Tecnologia de Pagamento Ltda",
        "Demonstrative": "Texto para Demonstrativo",
        "ExpirationDate": "2017-12-31",
        "Identification": "01234567000189",
        "Instructions": "Aceitar somente até a data de vencimento"      
    }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
    "MerchantOrderId":"2017051110",
    "Customer":
    {  
        "Name": "Customer's Name"     
    },
    "Payment":
    {  
        "Provider":"Simulado",
      "Type":"Boleto",
        "Amount":10000,
      "Assignor": "Braspag Tecnologia de Pagamento Ltda",
        "Demonstrative": "Texto para Demonstrativo",
        "ExpirationDate": "2017-12-31",
        "Identification": "01234567000189",
        "Instructions": "Aceitar somente até a data de vencimento"
    }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name de Boleto|
|`Payment.Type`|Text|100|Yes|Payment Method's Type. No caso "Boleto"|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.BoletoNumber`|Text|50 |No|Boleto Identification Number ("Nosso Número"). If this fiel is filled, it will override the configured value.|
|`Payment.Assignor`|Text|200|No|Assignor's name. If this fiel is filled, it will override the configured value|
|`Payment.Demonstrative`|Text|450|No|Demonstrative message. If this fiel is filled, it will override the configured value.|
|`Payment.ExpirationDate`|Date |10 |No|Days to expiration. If this fiel is filled, it will override the configured value.|
|`Payment.Identification`|Text|14 |No|Merchant's CNPJ. If this fiel is filled, it will override the configured value.|
|`Payment.Instructions`|Text|450|No|Instruction Message. If this fiel is filled, it will override the configured value.|

### Response

```json
{
  "MerchantOrderId": "2017051110",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "Instructions": "Aceitar somente até a data de vencimento.",
    "ExpirationDate": "2017-12-31",
    "Demonstrative": "Desmonstrative Teste",
    "Url": "https://homologacao.pagador.com.br/post/pagador/reenvia.asp/f892e7bb-e27f-4e81-b23d-036f8ee272a9",
    "BoletoNumber": "2633-2",
    "BarCodeNumber": "00092739000000100000494250000000263300656560",
    "DigitableLine": "00090.49420 50000.000260 33006.565601 2 73900000010000",
    "Assignor": "Empresa Teste",
    "Address": "Av. Brigadeiro Faria Lima, 160, Av. Brigadeiro Faria Lima",
    "Identification": "12346578909",
    "PaymentId": "f892e7bb-e27f-4e81-b23d-036f8ee272a9",
    "Type": "Boleto",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 16:25:36",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/f892e7bb-e27f-4e81-b23d-036f8ee272a9"
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
  "MerchantOrderId": "2017051110",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "Instructions": "Aceitar somente até a data de vencimento.",
    "ExpirationDate": "2017-12-31",
    "Demonstrative": "Desmonstrative Teste",
    "Url": "https://homologacao.pagador.com.br/post/pagador/reenvia.asp/f892e7bb-e27f-4e81-b23d-036f8ee272a9",
    "BoletoNumber": "2633-2",
    "BarCodeNumber": "00092739000000100000494250000000263300656560",
    "DigitableLine": "00090.49420 50000.000260 33006.565601 2 73900000010000",
    "Assignor": "Empresa Teste",
    "Address": "Av. Brigadeiro Faria Lima, 160, Av. Brigadeiro Faria Lima",
    "Identification": "12346578909",
    "PaymentId": "f892e7bb-e27f-4e81-b23d-036f8ee272a9",
    "Type": "Boleto",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 16:25:36",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/f892e7bb-e27f-4e81-b23d-036f8ee272a9"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Braspag's Transaction ID. |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`ExpirationDate`|Data de expiração. |Text|10 |2014-12-25 |
|`Url`|URL do Boleto gerado |string |256 |https://.../pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d |
|`Number`|"NossoNumero" gerado. |Text|50 |1000000012-8 |
|`BarCodeNumber`|Representação numérica do código de barras. |Text|44 |00091628800000157000494250100000001200656560 |
|`DigitableLine`|Linha digitável. |Text|256 |00090.49420 50100.000004 12006.565605 1 62880000015700 |
|`Address`|Endereço do Loja cadastrada no banco|Text|256 |Av. Teste, 160 |
|`Status`|Transaction's Status. |Byte |--- |1|

## Creating a Registered Boleto Payment

To create a registered boleto payment (known as "Boleto Registrado" as well), it is necessary make a POST as presented below.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{  
    "MerchantOrderId":"2017051113",
    "Customer":
    {  
        "Name": "Customer's Name",
        "Identity":"12345678909",
      "IdentityType":"CPF",
      "Address":{  
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
        "Provider":"Simulado",
      "Type":"Boleto",
        "Amount":10000,
        "Assignor": "Empresa Teste",
        "Demonstrative": "Desmonstrative Teste",
        "ExpirationDate": "2017-12-31",
        "Identification": "12346578909",
        "Instructions": "Aceitar somente até a data de vencimento."      
    }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
    "MerchantOrderId":"2017051113",
    "Customer":
    {  
        "Name": "Customer's Name",
        "Identity":"12345678909",
      "IdentityType":"CPF",
      "Address":{  
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
        "Provider":"Simulado",
      "Type":"Boleto",
        "Amount":10000,
        "Assignor": "Empresa Teste",
        "Demonstrative": "Desmonstrative Teste",
        "ExpirationDate": "2017-12-31",
        "Identification": "12346578909",
        "Instructions": "Aceitar somente até a data de vencimento."      
    }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|See the table below|Yes|Customer's Name|
|`Customer.Identity`|Text|14 |No|Customer's RG, CPF or CNPJ| 
|`Customer.IdentityType`|Text|See the table below|No|Customer Identification Type  (CPF or CNPJ)|
|`Customer.Address.Street`|Text|See the table below|No|Customer's main contact address|
|`Customer.Address.Number`|Text|See the table below|No|Customer's main contact address building number|
|`Customer.Address.Complement`|Text|See the table below|No|Customer's main contact address additional data|
|`Customer.Address.ZipCode`|Text|9|No|Customer's main contact address ZIP code|
|`Customer.Address.City`|Text|See the table below|No|Customer's main contact address' City|
|`Customer.Address.State`|Text|2|No|Customer's main contact address' State|
|`Customer.Address.Country`|Text|35|No|Customer's main contact address' Country|
|`Customer.Address.District`|Text|See the table below|No|Customer's main contact address' district name |
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name de Boleto|
|`Payment.Type`|Text|100|Yes|Payment Method's Type. In this case, "Boleto"|
|`Payment.Amount`|Number|15|Yes|Valor do Pedido (deve ser enviado em centavos)|
|`Payment.BoletoNumber`|Text|See the table below|No|Boleto Identification Number ("Nosso Número"). If this fiel is filled, it overrides the configured value.|
|`Payment.Assignor`|Text|200|No|Assignor's name. If this fiel is filled, it will override the configured value|
|`Payment.Demonstrative`|Text|See the table below|No|Demonstrative message. If this fiel is filled, it will override the configured value.|
|`Payment.ExpirationDate`|Date |10 |No|Days to expiration. If this fiel is filled, it will override the configured value.|
|`Payment.Identification`|Text|14 |No|Merchant's CNPJ. If this fiel is filled, it will override the configured value.|
|`Payment.Instructions`|Text|See the table below|No|Instruction Message. If this fiel is filled, it will override the configured value.|

### Fields max length specification for each bank

|Property|Bradesco|BancoBanco do Brasil|Itaú|Santander|Caixa Econômica|Citibank|
|---|---|---|---|---|---|---|
|Provider|Bradesco2|BancoDoBrasil2|ItauShopline|Santander2|Caixa2|Citibank2|
|`MerchantOrderId`|27 (OBS 1)|50 (OBS 1)|8|50 (OBS 1)|11 (OBS 1)|10 (OBS 1)|
|`Payment.BoletoNumber`|11 (OBS 2)|9 (OBS 2)|8 (OBS 1)|13 (OBS 2)|14 (OBS 2)|11 (OBS 2)|
|`Customer.Name`|34 (OBS 3)|60 (OBS,3)|30|40 (OBS 3)|40 (OBS 3)|50 (OBS 3)|
|`Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District`|Street: 70 (OBS 4); Number: 10 (OBS 4); Complement: 20 (OBS 4); District: 50 (OBS 4)|These fields must have up to 60 characters|Street, Number e Complement must have up to 40 characters;  District: 15|Street, Number e Complement must have up to 40 characters (OBS 3); District: 15 (OBS 3)|Street, Number e Complement must have up to 40 characters (OBS 3); District: 15 (OBS 3)|Street, Number e Complement must have up to 40 characters (OBS 3); District: 50 (OBS 3)|
|`Customer.Address.City`|50 (OBS 4)|18 (OBS 3)|15|30 (OBS 3)|15 (OBS 3)|50 (OBS 4)|
|`Payment.Instructions`|450|450|this field is not sent to the bank|450|450|450|
|`Payment.Demonstrative`|255|this field is not sent to the bank|this field is not sent to the bank|255|255|255|
|>>>>>>>>>>>>>>>>>>>>>>|||||||
|Additional Obsrevations:|OBS 1: alphabets, numbers e characters like "_" and "$"|OBS 1: this field is not sent to the bank|OBS geral: the Pagador truncates the fields automatically|OBS 1: this field is not sent to the bank|OBS 1: when the value is greater than 11 digits, the Pagador will generate a number based on configured number in the admin panel|General OBS: the Pagador does not validate the fields, but the Bank truncates the fields automatically|
||OBS 2: the bank validates the limit|OBS 2: the value is truncated when pass 9 digits, considering the last 9 positions|OBS 1: the "nosso número" alwats will be the same value as "Order ID", and pagador validates the limit|OBS 2: the bank validates the limit|OBS 2: start with "14" + 14 digits + verification digit generates automatically. When greater than 14 digits, the Pagador truncate the value considering the last 14 digits|OBS 1: when greather than the max limit, the Pagador generates a incremental number configured in the admin panel|
||OBS 3: the Pagador truncate automatically|OBS 3: accepted characteres: alphabets A a Z (CAPS LOCK); special characters: (-), ('), without space between these characters; Correct Examples: D'EL-REI, D'ALCORTIVO, SANT'ANA. Incorrect Examples: D'EL - REI; you can use one space between two words||OBS 3: the Pagador validates the limit|OBS 3: the Pagador validates the limit|OBS 2: when the value is greater than limit, the Pagador generates one randomic number|
||OBS 4: the Pagador validates the limit|||||OBS 3: te Pagador removes the special characters 
|||||||OBS 4: this field is not sent to the bank|

### Response

```json
{
  "MerchantOrderId": "2017051113",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Address": {
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
    "Instructions": "Aceitar somente até a data de vencimento.",
    "ExpirationDate": "2017-12-31",
    "Demonstrative": "Desmonstrative Teste",
    "Url": "https://homologacao.pagador.com.br/post/pagador/reenvia.asp/d24b0aa4-21c9-449d-b85c-6279333f070f",
    "BoletoNumber": "2634-0",
    "BarCodeNumber": "00091739000000100000494250000000263400656560",
    "DigitableLine": "00090.49420 50000.000260 34006.565609 1 73900000010000",
    "Assignor": "Empresa Teste",
    "Address": "Av. Brigadeiro Faria Lima, 160",
    "Identification": "12346578909",
    "PaymentId": "d24b0aa4-21c9-449d-b85c-6279333f070f",
    "Type": "Boleto",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 16:42:55",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/d24b0aa4-21c9-449d-b85c-6279333f070f"
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
  "MerchantOrderId": "2017051113",
  "Customer": {
    "Name": "Customer's Name",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA",
     "District":"Alphaville"
    }
  },
  "Payment": {
    "Instructions": "Aceitar somente até a data de vencimento.",
    "ExpirationDate": "2017-12-31",
    "Demonstrative": "Desmonstrative Teste",
    "Url": "https://homologacao.pagador.com.br/post/pagador/reenvia.asp/d24b0aa4-21c9-449d-b85c-6279333f070f",
    "BoletoNumber": "2634-0",
    "BarCodeNumber": "00091739000000100000494250000000263400656560",
    "DigitableLine": "00090.49420 50000.000260 34006.565609 1 73900000010000",
    "Assignor": "Empresa Teste",
    "Address": "Av. Brigadeiro Faria Lima, 160",
    "Identification": "12346578909",
    "PaymentId": "d24b0aa4-21c9-449d-b85c-6279333f070f",
    "Type": "Boleto",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 16:42:55",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/d24b0aa4-21c9-449d-b85c-6279333f070f"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`PaymentId`|Braspag's Transaction ID. |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`ExpirationDate`|Data de expiração. |Text|10 |2014-12-25 |
|`Url`|URL do Boleto gerado |string |256 |https://.../pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d |
|`Number`|Boleto Identification Number ("NossoNumero")|Text|50 |1000000012-8 |
|`BarCodeNumber`|Barcode number|Text|44 |00091628800000157000494250100000001200656560 |
|`DigitableLine`|Formatted Barcode number|Text|256 |00090.49420 50100.000004 12006.565605 1 62880000015700 |
|`Address`|Merchant's Address|Text|256 |Av. Teste, 160 |
|`Status`|Transaction's Status. |Byte |--- |1|

# Recurring Payment Transaction

* **Recurring Payments**: Recurrent Payments is an indispensable feature for merchants that need to regularly charge for your products / services. It is widely used for magazine subscriptions, monthly fees, software licenses, etc. The merchant will have many options to set the rules according to their business, because all parameterization is configurable, such as: periodicity, start and end date, number of attempts, interval between them, etc.

## Authorize a transaction and schedule future recurrences

In this example, the credit card transaction is submitted to authorization, and if it is approved, the recurrence is scheduled following the configured rules. A recurring transaction can not be created with installments.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051113",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-31",
       "Interval":"Monthly"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051113",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-31",
       "Interval":"Monthly"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.RecurrentPayment.EndDate`|Text|10 |No|Recurrence end date|
|`Payment.RecurrentPayment.Interval`|Text|10 |No|Interval between recurrences<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
|`Payment.RecurrentPayment.AuthorizeNow`|Boolean|--- |Yes|If set true, the transaction will be authorized at the same time of request. If false, it will be just a scheduled transaction|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051113",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "5646418",
    "AcquirerTransactionId": "0511045646418",
    "AuthorizationCode": "100024",
    "PaymentId": "067f73ce-62fb-4d76-871d-0bcbb88fbd22",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 16:56:46",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "RecurrentPayment": {
      "RecurrentPaymentId": "808d3631-47ca-43b4-97f5-bd29ab06c271",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2017-06-11",
      "EndDate": "2019-12-31",
      "Interval": "Monthly",
      "Link": {
        "Method": "GET",
        "Rel": "recurrentPayment",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/808d3631-47ca-43b4-97f5-bd29ab06c271"
      },
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/067f73ce-62fb-4d76-871d-0bcbb88fbd22"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/067f73ce-62fb-4d76-871d-0bcbb88fbd22/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/067f73ce-62fb-4d76-871d-0bcbb88fbd22/void"
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
  "MerchantOrderId": "2017051113",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "ProofOfSale": "5646418",
    "AcquirerTransactionId": "0511045646418",
    "AuthorizationCode": "100024",
    "PaymentId": "067f73ce-62fb-4d76-871d-0bcbb88fbd22",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-11 16:56:46",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Status": 1,
    "ProviderReturnCode": "4",
    "ProviderReturnMessage": "Operation Successful",
    "RecurrentPayment": {
      "RecurrentPaymentId": "808d3631-47ca-43b4-97f5-bd29ab06c271",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2017-06-11",
      "EndDate": "2019-12-31",
      "Interval": "Monthly",
      "Link": {
        "Method": "GET",
        "Rel": "recurrentPayment",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/808d3631-47ca-43b4-97f5-bd29ab06c271"
      },
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/067f73ce-62fb-4d76-871d-0bcbb88fbd22"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/067f73ce-62fb-4d76-871d-0bcbb88fbd22/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/067f73ce-62fb-4d76-871d-0bcbb88fbd22/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Recurrent Payment ID used to further queries |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`NextRecurrency`|The next payment date|Text|7 |05/2019 (MM/YYYY) |
|`EndDate`|Recurrency end date |Text|7 |05/2019 (MM/YYYY) |
|`Interval`|Recurrency Interval |Text|10 |<ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
|`AuthorizeNow`|If set true, the transaction will be authorized at the same time of request. If false, it will be just a scheduled transactionBoolean |--- |true ou false |

## Scheduling a Recurrent Payment

This example does not immediately authorize, but only schedules a future authorization. When this authorization is successful, then the all future recurrences will be scheduled.

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/sales/</span></aside>

```json
{
   "MerchantOrderId":"2017051114",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "RecurrentPayment":{
       "AuthorizeNow":"false",
       "StartDate":"2017-12-31",
       "EndDate":"2019-12-31",
       "Interval":"Monthly"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.braspag.com.br/v2/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2017051114",
   "Customer":{
      "Name":"Customer's Name"
   },
   "Payment":{
     "Provider":"Simulado",
     "Type":"CreditCard",
     "Amount":10000,
     "Installments":1,
     "CreditCard":{
         "CardNumber":"4551870000000181",
         "Holder":"Cardholder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "RecurrentPayment":{
       "AuthorizeNow":"false",
       "StartDate":"2017-12-31",
       "EndDate":"2019-12-31",
       "Interval":"Monthly"
     }
   }
}
--verbose
```

|Property|Type|Size|Mandatory|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Yes|Merchant Identifier|
|`MerchantKey`|Text|40|Yes|Merchant Key need to access the API|
|`RequestId`|Guid|36|No|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|
|`MerchantOrderId`|Text|50|Yes|Merchant Order ID|
|`Customer.Name`|Text|255|Yes|Customer's Name|
|`Payment.Provider`|Text|15|Yes|Payment Method Provider's name|
|`Payment.Type`|Text|100|Yes|Payment Method's Type|
|`Payment.Amount`|Number|15|Yes|Transaction Amount (must be sent in cents)|
|`Payment.Installments`|Number|2|Yes|Number of Installments|
|`Payment.RecurrentPayment.StartDate`|Text|10 |No|Recurrency start date|
|`Payment.RecurrentPayment.EndDate`|Text|10 |No|Recurrency end date|
|`Payment.RecurrentPayment.Interval`|Text|10 |No|Interval between recurrencies.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
|`Payment.RecurrentPayment.AuthorizeNow`Boolean |--- |Yes|If set true, the transaction will be authorized at the same time of request. If false, it will be just a scheduled transaction|
|`CreditCard.CardNumber`|Text|16|Yes|Credit Card number|
|`CreditCard.Holder`|Text|25|Yes|Cardholder name|
|`CreditCard.ExpirationDate`|Text|7|Yes|Expiration Date (MM/YYYY)|
|`CreditCard.SecurityCode`|Text|4|Yes|Security Code (CVV2)|
|`CreditCard.Brand`|Text|10|Yes|Card's Brand|

### Response

```json
{
  "MerchantOrderId": "2017051114",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "Type": "CreditCard",
    "Amount": 10000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "Status": 20,
    "RecurrentPayment": {
      "RecurrentPaymentId": "32703035-7dfb-4369-ac53-34c7ff7b84e8",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2017-12-31",
      "StartDate": "2017-12-31",
      "EndDate": "2019-12-31",
      "Interval": "Monthly",
      "Link": {
        "Method": "GET",
        "Rel": "recurrentPayment",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/32703035-7dfb-4369-ac53-34c7ff7b84e8"
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
  "MerchantOrderId": "2017051114",
  "Customer": {
    "Name": "Customer's Name"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "Type": "CreditCard",
    "Amount": 10000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "Status": 20,
    "RecurrentPayment": {
      "RecurrentPaymentId": "32703035-7dfb-4369-ac53-34c7ff7b84e8",
      "ReasonCode": 0,
      "ReasonMessage": "Successful",
      "NextRecurrency": "2017-12-31",
      "StartDate": "2017-12-31",
      "EndDate": "2019-12-31",
      "Interval": "Monthly",
      "Link": {
        "Method": "GET",
        "Rel": "recurrentPayment",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/32703035-7dfb-4369-ac53-34c7ff7b84e8"
      },
      "AuthorizeNow": false
    }
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Recurrent Payment ID used to further queries |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`NextRecurrency`|The next payment date|Text|7 |05/2019 (MM/YYYY) |
|`StartDate`|Recurrency start date |Text|7 |05/2019 (MM/YYYY) |
|`EndDate`|Recurrency end date |Text|7 |05/2019 (MM/YYYY) |
|`Interval`|Interval between recurrences |Text|10 |<ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> |
|`AuthorizeNow`|If set true, the transaction will be authorized at the same time of request. If false, it will be just a scheduled transactionBoolean |--- |true ou false |

## Change customer's data

Follow the example below to change only customer's data of a recurrent payment

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/Customer</span></aside>

```json
{  
   "Name":"Outro Customer's Name",
   "Email":"outrocomprador@braspag.com.br",
   "Birthdate":"1999-12-12",
   "Identity":"0987654321",
   "IdentityType":"CPF",
   "Address":{  
      "Street":"Avenida Brigadeiro Faria Lima",
      "Number":"1500",
      "Complement":"AP 201",
      "ZipCode":"05426200",
      "City":"São Paulo",
      "State":"SP",
      "Country":"BRA",
      "District":"Pinheiros"
   },
   "DeliveryAddress":{  
      "Street":"Avenida Brigadeiro Faria Lima",
      "Number":"1500",
      "Complement":"AP 201",
      "ZipCode":"05426200",
      "City":"São Paulo",
      "State":"SP",
      "Country":"BRA",
      "District":"Pinheiros"
   }
}
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/Customer"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "Name":"Outro Customer's Name",
   "Email":"outrocomprador@braspag.com.br",
   "Birthdate":"1999-12-12",
   "Identity":"0987654321",
   "IdentityType":"CPF",
   "Address":{  
      "Street":"Avenida Brigadeiro Faria Lima",
      "Number":"1500",
      "Complement":"AP 201",
      "ZipCode":"05426200",
      "City":"São Paulo",
      "State":"SP",
      "Country":"BRA",
      "District":"Pinheiros"
   },
   "DeliveryAddress":{  
      "Street":"Avenida Brigadeiro Faria Lima",
      "Number":"1500",
      "Complement":"AP 201",
      "ZipCode":"05426200",
      "City":"São Paulo",
      "State":"SP",
      "Country":"BRA",
      "District":"Pinheiros"
   }
}
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Number de identificação da Recorrência. |Text|50 |Yes|
|`MerchantOrderId`|Merchant Order ID|Text|50|Yes|
|`Customer.Name`|Customer's Name|Text|255|Yes|
|`Customer.Identity`|No|Customer's RG, CPF or CNPJ|Text|14|
|`Customer.IdentityType`|Customer Identification Type  (CPF or CNPJ)|Text|255|No|
|`Customer.Email`|Customer's e-mail address|Text|255|No|
|`Customer.Birthdate`|Customer's birth date |Date |10 |No|
|`Customer.Address.Street`|Customer's main contact address||Text|255|No|
|`Customer.Address.Number`|Customer's main contact address building number|Text|15|No|
|`Customer.Address.Complement`|Customer's main contact address additional data|Text|50|No|
|`Customer.Address.ZipCode`|Customer's main contact address ZIP code|Text|9|No|
|`Customer.Address.City`|Customer's main contact address' City|Text|50|No|
|`Customer.Address.State`|Customer's main contact address' State|Text|2|No|
|`Customer.Address.Country`|Customer's main contact address' Country||Text|35|No|
|`Customer.Address.District`|Customer's main contact address' district name|Text|50|No|
|`Customer.DeliveryAddress.Street`|Customer's delivery address|Text|255 |No|
|`Customer.DeliveryAddress.Number`|Customer's delivery address' building number|Text|15 |No|
|`Customer.DeliveryAddress.Complement`|Customer's delivery address' additional data|Text|50 |No|
|`Customer.DeliveryAddress.ZipCode`|Customer's delivery address' zip code |Text|9 |No|
|`Customer.DeliveryAddress.City`|Customer's delivery address' city|Text|50 |No|
|`Customer.DeliveryAddress.State`|Customer's delivery address' state|Text|2 |No|
|`Customer.DeliveryAddress.Country`|Customer's delivery address' country|Text|35 |No|
|`Customer.DeliveryAddress.District`|Customer's delivery address' district|Text|50 |No|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Change recurrency end date

To change the end date, follow the example below

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/EndDate</span></aside>

```json
"2021-01-09"
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/EndDate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
"2021-01-09"
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`EndDate`|Recurrency end date|Text|10 |Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Chage the recurrency interval

To Chage the recurrency interval, follow the example bellow

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/Interval</span></aside>

```json
6
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/Interval"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
6
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`Interval`|Interval between recurrencies. <ul><li>Monthly</li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|Number|2 |Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Change the recurrency day

To change Change the recurrency day, follow the example bellow

<aside class="notice"><strong>Examples:</strong>
<BR><BR>If the new day informed is greater than the present day, the system will update the recurrence day in effect at the next recurrence.
Ex:<BR>
Today: Sep 5th<BR>
Current next scheduled recurrence date: Sep 25th <BR>
New recurrence day: 10<BR>
New next scheduled recurrence date: Sep 10th <BR>
<BR><BR>
If the new day informed is less than the present day and next recurrence will be in the current month, the system will update the recurrence day after the next execution of recurrence.<BR>
Ex:<BR>
Today: Sep 5th<BR>
Current next scheduled recurrence date: Sep 25th <BR>
New recurrence day: 2<BR>
Next scheduled recurrence date: Sep 25th<BR>
Next scheduled recurrence date: Oct 2th <BR>
<BR><BR>
If the new day informed is less than the present day and next recurrence will be in diferent month, the new recurrence day will be updated, in effect at the next recurrence.<BR>
Today: Sep 5th<BR>
Current next scheduled recurrence date: Oct 25th <BR>
New recurrence day: 2<BR>
New Next scheduled recurrence date: Oct 2th <BR>
</aside>

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay</span></aside>

```json
16
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
16
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`RecurrencyDay`|Recurrency Day|Number|2 |Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Change the transaction's amount of a recurrency transaction

To Change the transaction's amount of a recurrency transaction, follow the example bellow

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/Amount</span></aside>

```json
156
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/Amount"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
156
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`Payment.Amount`|Transaction Amount (in cents): 156 corresponds to R$ 1,56|Number|15|Yes|

<aside class="warning">This change will affect from the next recurrency date</aside>

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Change the next payment date

To Change the next payment date, follow the example bellow. This operation change only the next's payment date and will not affect further recurrencies.

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate</span></aside>

```json
"2017-06-15"
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
"2016-06-15"
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`NextPaymentDate`|Recurrency Next Payment Date|Text|10 |Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Change the payment data

To Change the payment data, such as Credit Card number, follow the example bellow

<aside class="notice"><strong>Attention:</strong> This operation changes onlu "Payment" node, and other informatios such as recurrency rules and customer's dada, will not be affected</aside>

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/Payment</span></aside>

```json
{  
   "Type":"CreditCard",
   "Amount":"20000",
   "Installments":3,
   "Country":"USA",
   "Currency":"USD",
   "SoftDescriptor":"Mensagem",
   "Provider":"Simulado",
   "CreditCard":{  
      "Brand":"Master",
      "Holder":"Cardholder",
      "CardNumber":"4111111111111111",
      "ExpirationDate":"05/2019"
   }
}
```

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/Payment"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "Provider":"Simulado",
   "Type":"CreditCard",
   "Amount":"20000",
   "Installments":3,
   "Country":"USA",
   "Currency":"USD",
   "SoftDescriptor":"Mensagem",
   "CreditCard":{  
      "Brand":"Master",
      "Holder":"Cardholder",
      "CardNumber":"4111111111111111",
      "ExpirationDate":"05/2019"
   }
}
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`Payment.Provider`|Payment Method Provider's name|Text|15|Yes|
|`Payment.Type`|Payment Method's Type. |Text|100|Yes|
|`Payment.Amount`|Transaction Amount (must be sent in cents)|Number|15 |Yes|
|`Payment.Installments`|Number of Installments|Number|2 |Yes|
|`Payment.SoftDescriptor`|Message that will be presented into cardholder's billing|Text|13|No|
|`CreditCard.CardNumber`|Credit Card number|Text|16|Yes|
|`CreditCard.Holder`|Cardholder name|Text|25|Yes|
|`CreditCard.ExpirationDate`|Card's Expiration Date|Text|7 |Yes|
|`CreditCard.SecurityCode`|Security Code (CVV2)|Text|4 |Yes|
|`CreditCard.Brand`|Card's Brand|Text|10|Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Deactivate a Recurrency Payment

To Deactivate a Recurrency Payment, follow the example bellow

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/Deactivate</span></aside>

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/Deactivate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

## Reactivate a Recurrency Payment

To Reactivate a Recurrency Payment, follow the example bellow

### Request

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}/Reactivate</span></aside>

```shell
curl
--request PUT "https://apisandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}/Reactivate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|

### Response

```shell
HTTP Status 200
```

See [HTTP Status Code](#http-status-code). This list contains all the HTTP Status code that could be returned from API

# Queries

## Query a transaction using PaymentID

To query a transaction, follow the example bellow

### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/v2/sales/{PaymentId}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.braspag.com.br/v2/sales/{PaymentId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`PaymentId`|Transaction's Payment ID|Text|50 |Yes|

### Response

```json
{
  "MerchantOrderId": "2017051001",
  "Customer": {
    "Name": "Customer's Name",
    "Address": {}
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "Brand": "Visa"
    },
    "ProofOfSale": "2539492",
    "AcquirerTransactionId": "0510042539492",
    "AuthorizationCode": "759497",
    "VelocityAnalysis": {
      "Id": "f8078b32-be17-4c35-b164-ad74c3cd0725",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "f8078b32-be17-4c35-b164-ad74c3cd0725",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-10 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/void"
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
  "MerchantOrderId": "2017051001",
  "Customer": {
    "Name": "Customer's Name",
    "Address": {}
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true
    "Authenticate": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2021",
      "Brand": "Visa"
    },
    "ProofOfSale": "2539492",
    "AcquirerTransactionId": "0510042539492",
    "AuthorizationCode": "759497",
    "PaymentId": "f8078b32-be17-4c35-b164-ad74c3cd0725",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2017-05-10 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 0,
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.braspag.com.br/v2/sales/f8078b32-be17-4c35-b164-ad74c3cd0725/void"
      }
    ]
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`MerchantOrderId`|Merchant Order ID|Text|50|Alphanumeric Text|
|`Customer.Name`|Customer's Name|Text|255|Alphanumeric Text|
|`Customer.Identity`|Customer's RG, CPF or CNPJ|Text|14 |Alphanumeric Text|
|`Customer.IdentityType`|Customer Identification Type  (CPF or CNPJ)|Text|255|CPF ou CNPJ|
|`Customer.Email`|Customer's e-mail address|Text|255|Alphanumeric Text|
|`Customer.Birthdate`|Customer's birth date YYYY-MM-DD|Date|10|formato AAAA-MM-DD|
|`Customer.Address.Street`|Customer's main contact address|Text|255|Alphanumeric Text|
|`Customer.Address.Number`|Customer's main contact address building number|Text|15|Alphanumeric Text|
|`Customer.Address.Complement`|Customer's main contact address additional data|Text|50|Alphanumeric Text|
|`Customer.Address.ZipCode`|Customer's main contact address ZIP code|Text|9|Alphanumeric Text|
|`Customer.Address.City`|Customer's main contact address' City|Text|50|Alphanumeric Text|
|`Customer.Address.State`|Customer's main contact address' State|Text|2|Alphanumeric Text|
|`Customer.Address.Country`|Customer's main contact address' Country|Text|35|Alphanumeric Text|
|`Customer.Address.District`|Customer's main contact address' district name |Text|50 |Alphanumeric Text|
|`Customer.DeliveryAddress.Street`|Customer's delivery address|Text|255|Alphanumeric Text|
|`Customer.DeliveryAddress.Number`|Customer's delivery address building number|Text|15|Alphanumeric Text|
|`Customer.DeliveryAddress.Complement`|Customer's delivery address additional data|Text|50|Alphanumeric Text|
|`Customer.DeliveryAddress.ZipCode`|Customer's delivery address ZIP code|Text|9|Alphanumeric Text|
|`Customer.DeliveryAddress.City`|Customer's delivery address' City|Text|50|Alphanumeric Text|
|`Customer.DeliveryAddress.State`|Customer's delivery address' State|Text|2|Alphanumeric Text|
|`Customer.DeliveryAddress.Country`|Customer's delivery address' Country|Text|35|Alphanumeric Text|
|`Customer.DeliveryAddress.District`|Customer's delivery address' district name |Text|50 |Alphanumeric Text|
|`Payment.Provider`|Payment Method Provider's name|Text|15|Payment Method Provider's name|
|`Payment.Type`|Payment Method's Type|Text|100|Ex. CreditCard|
|`Payment.Amount`|Transaction Amount (must be sent in cents)|Number|15|10000|
|`Payment.ServiceTaxAmount`|Service Tax Amount to be added to the total amount of transaction|Number|15|10000|
|`Payment.Currency`|Currency Code|Text|3|BRL / USD / MXN / COP / CLP / ARS / PEN / EUR / PYN / UYU / VEB / VEF / GBP|
|`Payment.Country`|Country Code|Text|3|BRA|
|`Payment.Installments`|Number of Installments|Number|2|6|
|`Payment.Interest`|Installment Type|Text|10|if by merchant (ByMerchant) and if by Issuer (ByIssuer)|
|`Payment.Capture`|If automatic capture behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|Boolean|--- (Default false)|Boolean|
|`Payment.Authenticate`|If authentication behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|Boolean|--- (Default false)|Boolean|
|`Payment.Recurrent`|If recurrent behavior is required, send true. Else, false. Check with the Acquirer if this feature is supported|Boolean|--- (Default false)|Boolean|
|`Payment.SoftDescriptor`|Text que será impresso na fatura do portador|Text|13|Alphanumeric Text|
|`Payment.ExtraDataCollection.Name`|Extra Data field's name|Text|50|Alphanumeric Text|
|`Payment.ExtraDataCollection.Value`|Extra Data field's value|Text|1024|Alphanumeric Text|
|`Payment.AcquirerTransactionId`|Provider's Transaction ID|Text|40|Alphanumeric Text|
|`Payment.ProofOfSale`|Provider's Proof of Sale Code|Text|20|Alphanumeric Text|
|`Payment.AuthorizationCode`|Provider's Authorization Code|Text|300|Alphanumeric Text|
|`Payment.PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Payment.ReceivedDate`|Transaction's received date|Text|19|YYYY-MM-DD HH:mm:SS|
|`Payment.ReasonCode`|Operation's Reason Code|Text|32|Alphanumeric Text|
|`Payment.ReasonMessage`|Operation's Reason Message|Text|512|Alphanumeric Text|
|`Payment.Status`|Transaction's Status|Byte|2|1|
|`Payment.ProviderReturnCode`|Acquirer or Bank’s return code|Text|32|57|
|`Payment.ProviderReturnMessage`|Acquirer or Bank’s return message|Text|512|Transação Aprovada|
|`CreditCard.CardNumber`|Credit Card number|Text|16|
|`CreditCard.Holder`|Cardholder's name|Text|25|
|`CreditCard.ExpirationDate`|Card's Expiration Date|Text|7|
|`CreditCard.SecurityCode`|Security Code (CVV2)|Text|4|
|`CreditCard.Brand`|Card's Brand|Text|10|
|`CreditCard.SaveCard`|If the card must be saved, then true. Else false.|Boolean|--- (Default false)|

## Query by Merchant's order ID

This query returns a list of Braspag's Transaction ID corresponding to merchant's order ID.

### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/v2/sales?merchantOrderId={merchantOrderId}</span></aside>

```shell
curls
--request GET "https://apiquerysandbox.braspag.com.brv2/sales?merchantOrderId={merchantOrderId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`MerchantOrderId`|Braspag's Transaction ID|Text|36 |Yes|

### Response

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
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "Payments": [
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
|`PaymentId`|Braspag's Transaction ID|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Query a Recurring Transaction

To Query a Recurring Transaction, follow the example bellow

### Request

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/v2/RecurrentPayment/{RecurrentPaymentId}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/{RecurrentPaymentId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`MerchantId`|Merchant Identifier|Guid|3|Yes|
|`MerchantKey`|Merchant Key need to access the API|Text|40|Yes|
|`RequestId`|Request Identifier defined by merchant, applicable to any operation GET/POST/PUT|Guid|36|No|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|

### Response

```json
{
  "Customer": {
    "Name": "Customer's Name"
  },
  "RecurrentPayment": {
    "Installments": 1,
    "RecurrentPaymentId": "f5a83c14-0254-4e73-bdd3-9afba1007266",
    "NextRecurrency": "2017-06-11",
    "StartDate": "2017-05-11",
    "EndDate": "2019-12-31",
    "Interval": "Monthly",
    "Amount": 10000,
    "Country": "BRA",
    "CreateDate": "2017-05-11T00:00:00",
    "Currency": "BRL",
    "CurrentRecurrencyTry": 1,
    "OrderNumber": "2017051120",
    "Provider": "Simulado",
    "RecurrencyDay": 11,
    "SuccessfulRecurrences": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/f5a83c14-0254-4e73-bdd3-9afba1007266"
      }
    ],
    "RecurrentTransactions": [
      {
        "PaymentNumber": 0,
        "RecurrentPaymentId": "f5a83c14-0254-4e73-bdd3-9afba1007266",
        "TransactionId": "cd694ffb-c0c4-47db-9390-737df70a2012",
        "TryNumber": 1,
        "Links": [
          {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/cd694ffb-c0c4-47db-9390-737df70a2012"
          }
        ]
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
    "Name": "Customer's Name"
  },
  "RecurrentPayment": {
    "Installments": 1,
    "RecurrentPaymentId": "f5a83c14-0254-4e73-bdd3-9afba1007266",
    "NextRecurrency": "2017-06-11",
    "StartDate": "2017-05-11",
    "EndDate": "2019-12-31",
    "Interval": "Monthly",
    "Amount": 10000,
    "Country": "BRA",
    "CreateDate": "2017-05-11T00:00:00",
    "Currency": "BRL",
    "CurrentRecurrencyTry": 1,
    "OrderNumber": "2017051120",
    "Provider": "Simulado",
    "RecurrencyDay": 11,
    "SuccessfulRecurrences": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.braspag.com.br/v2/RecurrentPayment/f5a83c14-0254-4e73-bdd3-9afba1007266"
      }
    ],
    "RecurrentTransactions": [
      {
        "PaymentNumber": 0,
        "RecurrentPaymentId": "f5a83c14-0254-4e73-bdd3-9afba1007266",
        "TransactionId": "cd694ffb-c0c4-47db-9390-737df70a2012",
        "TryNumber": 1,
        "Links": [
          {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.braspag.com.br/v2/sales/cd694ffb-c0c4-47db-9390-737df70a2012"
          }
        ]
      }
    ],
    "Status": 1
  }
}
```

|Property|Description|Type|Size|Format|
|---|---|---|---|---|
|`RecurrentPaymentId`|Recurrent Payment ID used to further queries |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`NextRecurrency`|The next payment date|Text|7 |05/2019 (MM/YYYY) |
|`StartDate`|Recurrency start date |Text|7 |05/2019 (MM/YYYY) |
|`EndDate`|Recurrency end date |Text|7 |05/2019 (MM/YYYY) |
|`Interval`|Interval between recurrences |Text|10 |
|`CurrentRecurrencyTry`|Indentify the number of attempts |Number|1|1|
|`OrderNumber`|Merchant's order number|Text|50 |2017051101|
|`Status`|Recurrence Status|Number|1 |<UL><LI>1 - Active</LI><LI>2 - Finished</LI><LI>3,4,5 - Disabled</LI></UL> |
|`RecurrencyDay`|Recurrent Day|Number|2 |22 |
|`SuccessfulRecurrences`|Number of successful recurrences|Number|2 |5|
|`RecurrentTransactions.RecurrentPaymentId`|Recurrence ID to further queries|Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`RecurrentTransactions.TransactionId`|Transaction ID at Braspag|Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
|`RecurrentTransactions.PaymentNumber`|The number of recurrence. The first one is zero|Number|2 |3 |
|`RecurrentTransactions.TryNumber`|Number of attenpts |Number|2 |1 |

# Notification POST

To receive the notification POSTs, the merchant must have a URL configurated at Braspag. After this configuration, the Braspag will notify the Merchant sending a simple POST as presented bellow

Braspag is waiting: HTTP Status Code 200 OK

The Braspag will make 3 tentatives to send a notification. It stops notifying when receive code 200. After 3 tentatives, there will no more tentatives.

```json
{
   "RecurrentPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "PaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "ChangeType": "2"
}
```

|Property|Description|Type|Size|Mandatory|
|---|---|---|---|---|
|`RecurrentPaymentId`|Recurrent Payment ID for further queries|Text|50 |Yes|
|`PaymentId`|Identificador que representa a transação|GUID|36|Yes|
|`ChangeType`|Type of notification. See bellow| Número | 1 |Yes|

|ChangeType|Descrição|
|---|---|
|1|Transaction's Status changing|
|2|New recurrency transaction created|
|3|Fraud Analysis' Status changing|
|4|Recurring Payment's Status changing (Ex. in case of automatic desactivation)|
|5|Refund Denied (applicable justo for Rede)|

# Appends

## Provider's List

### Credit Card Payments Provider

|Provider|Brand|
|---|---|
|Simulado|---|
|Cielo|Visa, Master, Amex, Elo, Aura, Jcb, Diners, Discover|
|Cielo30 (Cielo 3.0)|Visa, Master, Amex, Elo, Aura, Jcb, Diners, Discover|
|Redecard (Komerci)|Visa, Master, Hipercard, Hiper, Diners|
|Rede (e-Rede)|Visa, Master, Hipercard, Hiper, Diners|
|RedeSitef|Visa, Master, Hipercard, Diners|
|CieloSitef|Visa, Master, Amex, Elo, Aura, Jcb, Diners, Discover|
|SantanderSitef|Visa, Master|
|Banorte|Visa, Master, Carnet|
|Getnet|Visa, Master|
|FirstData|Visa, Master, Cabal|
|GlobalPayments|Visa, Master|
|DMCard|---|

### Debit Card Payments Provider

|Provider|Brand|
|---|---|
|Cielo|Visa, Master|
|Cielo30 (Cielo 3.0)|Visa, Master|
|Getnet|Visa, Master|
|FirstData|Visa, Master|
|GlobalPayments|Visa, Master|

### Boleto without Registration Payments Provider

|Provider|
|---|
|Simulado, Bradesco, BancoDoBrasil, CitiBank, Itau, Caixa, Santander|

### Registered Boleto Payments Provider

|Provider|
|---|
|Bradesco2, BancoDoBrasil2, ItauShopline, Santander2, Caixa2, CitiBank2|

### Electronic Transfer Payments Provider (Online Debit)

|Provider|
|---|
|Bradesco, BancoDoBrasil, SafetyPay, Itau|

## Transaction's Status

|Code|Status|Description|
|---|---|---|
|0|NotFinished|Failed Transaction due to conectivity problem|
|1|Authorized|Transaction Authorized, Boleto Generated|
|2|PaymentConfirmed|Transaction Captured, Boleto Paid|
|3|Denied|Denied credit/debit card transaction, denied electronic transfer transaction|
|10|Voided|voided transaction|
|11|Refunded|Refunded credit/debit card transaction, Refunded electronic transfer transaction|
|12|Pending|Waiting the final status (ex. electronic transfer, offline refund, manual fraud prevention analysis)|
|13|Aborted|Transaction aborted because of some reason (ex; rejected by velocity)|
|20|Scheduled|Credit Card|Scheduled Recurrency Payment|

## Fraud Analysis' Status

|Code|Description|
|---|---|
|500|Started|
|501|Accept|
|502|Review|
|503|Reject|
|504|Pendent|
|505|Unfinished|
|506|Aborted|

## HTTP Status Code List

|HTTP Status Code|Description|
|---|---|
|200|OK|
|400|Bad Request|
|404|Resource Not Found|
|500|Internal Server Error|

## Recurrency Payment Status List

|Code|Description|
|---|---|
|1|Active|
|2|Finished|
|3|DisabledByMerchant|
|4|DisabledMaxAttempts|
|5|DisabledExpiredCreditCard|

## ReasonCode/ReasonMessage List

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

## API Error Code List

|Code|Message|
|---|---|
|0|Internal error|
|100|RequestId is required|
|101|MerchantId is required|
|102|Payment Type is required|
|103|Payment Type can only contain letters|
|104|Customer Identity is required|
|105|Customer Name is required|
|106|Transaction ID is required|
|107|OrderId is invalid or does not exists|
|108|Amount must be greater or equal to zero|
|109|Payment Currency is required|
|110|Invalid Payment Currency|
|111|Payment Country is required|
|112|Invalid Payment Country|
|113|Invalid Payment Code|
|114|The provided MerchantId is not in correct format|
|115|The provided MerchantId was not found|
|116|The provided MerchantId is blocked|
|117|Credit Card Holder is required|
|118|Credit Card Number is required|
|119|At least one Payment is required|
|120|Request IP not allowed. Check your IP White List|
|121|Customer is required|
|122|MerchantOrderId is required|
|123|Installments must be greater or equal to one|
|124|Credit Card is Required|
|125|Credit Card Expiration Date is required|
|126|Credit Card Expiration Date is invalid|
|127|You must provide CreditCard Number|
|128|Card Number length exceeded|
|129|Affiliation not found|
|130|Could not get Credit Card|
|131|MerchantKey is required|
|132|MerchantKey is invalid|
|133|Provider is not supported for this Payment Type|
|134|FingerPrint length exceeded|
|135|MerchantDefinedFieldValue length exceeded|
|136|ItemDataName length exceeded|
|137|ItemDataSKU length exceeded|
|138|PassengerDataName length exceeded|
|139|PassengerDataStatus length exceeded|
|140|PassengerDataEmail length exceeded|
|141|PassengerDataPhone length exceeded|
|142|TravelDataRoute length exceeded|
|143|TravelDataJourneyType length exceeded|
|144|TravelLegDataDestination length exceeded|
|145|TravelLegDataOrigin length exceeded|
|146|SecurityCode length exceeded|
|147|Address Street length exceeded|
|148|Address Number length exceeded|
|149|Address Complement length exceeded|
|150|Address ZipCode length exceeded|
|151|Address City length exceeded|
|152|Address State length exceeded|
|153|Address Country length exceeded|
|154|Address District length exceeded|
|155|Customer Name length exceeded|
|156|Customer Identity length exceeded|
|157|Customer IdentityType length exceeded|
|158|Customer Email length exceeded|
|159|ExtraData Name length exceeded|
|160|ExtraData Value length exceeded|
|161|Boleto Instructions length exceeded|
|162|Boleto Demostrative length exceeded|
|163|Return Url is required|
|166|AuthorizeNow is required|
|167|Antifraud not configured|
|168|Recurrent Payment not found|
|169|Recurrent Payment is not active|
|170|Cartão Protegido not configured|
|171|Affiliation data not sent|
|172|Credential Code is required|
|173|Payment method is not enabled|
|174|Card Number is required|
|175|EAN is required|
|176|Payment Currency is not supported|
|177|Card Number is invalid|
|178|EAN is invalid|
|179|The max number of installments allowed for recurring payment is 1|
|180|The provided Card PaymentToken was not found|
|181|The MerchantIdJustClick is not configured|
|182|Brand is required|
|183|Invalid customer bithdate|
|184|Request could not be empty|
|185|Brand is not supported by selected provider|
|186|The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments)|
|187|ExtraData Collection contains one or more duplicated names|
|188|Avs with CPF invalid|
|189|Avs with length of street exceeded|
|190|Avs with length of number exceeded|
|190|Avs with length of complement exceeded|
|191|Avs with length of district exceeded|
|192|Avs with zip code invalid|
|193|Split Amount must be greater than zero|
|194|Split Establishment is Required|
|195|The PlataformId is required|
|196|DeliveryAddress is required|
|197|Street is required|
|198|Number is required|
|199|ZipCode is required|
|200|City is required|
|201|State is required|
|202|District is required|
|203|Cart item Name is required|
|204|Cart item Quantity is required|
|205|Cart item type is required|
|206|Cart item name length exceeded|
|207|Cart item description length exceeded|
|208|Cart item sku length exceeded|
|209|Shipping addressee sku length exceeded|
|210|Shipping data cannot be null|
|211|WalletKey is invalid|
|212|Merchant Wallet Configuration not found|
|213|Credit Card Number is invalid|
|214|Credit Card Holder Must Have Only Letters|
|215|Agency is required in Boleto Credential|
|216|Customer IP address is invalid|
|300|MerchantId was not found|
|301|Request IP is not allowed|
|302|Sent MerchantOrderId is duplicated|
|303|Sent OrderId does not exist|
|304|Customer Identity is required|
|306|Merchant is blocked|
|307|Transaction not found|
|308|Transaction not available to capture|
|309|Transaction not available to void|
|310|Payment method doest not support this operation|
|311|Refund is not enabled for this merchant|
|312|Transaction not available to refund|
|313|Recurrent Payment not found|
|314|Invalid Integration|
|315|Cannot change NextRecurrency with pending payment|
|316|Cannot set NextRecurrency to past date|
|317|Invalid Recurrency Day|
|318|No transaction found|
|319|Smart recurrency is not enabled|
|320|Can not Update Affiliation Because this Recurrency not Affiliation saved|
|321|Can not set EndDate to before next recurrency|
|322|Zero Dollar Auth is not enabled|
|323|Bin Query is not enabled|

## Mock ("Simulado") Payment Method

The "Simulado" is a payment method that emulates the use of credit card payment. With this payment method is possible to simulate all the Authorization, Capture and Cancellation streams. For better use of Mock Payment Method, we are providing test cards on the table below. The status of the transaction will be as the use of each card.

|Status to Simulate|Credit Card Number|Return Code|Return Message|
|---|---|---|---|
|Autorizado (authorized)|0000.0000.0000.0001 / 0000.0000.0000.0004|4|Operação realizada com sucesso|
|Não Autorizado (denied)|0000.0000.0000.0002|2|Não Autorizada|
|Autorização Aleatória (random)|0000.0000.0000.0009|4 / 99|Operation Successful / Time Out|
|Não Autorizado (denied)|0000.0000.0000.0007|77|Cartão Cancelado (cancelled card)|
|Não Autorizado (dedied)|0000.0000.0000.0008|70|Problemas com o Cartão de Crédito (invalid card)|
|Não Autorizado (dedied)|0000.0000.0000.0005|78|Cartão Bloqueado (blocked card)|
|Não Autorizado (dedied)|0000.0000.0000.0003|57|Cartão Expirado (expired card)|
|Não Autorizado (dedied)|0000.0000.0000.0006|99|Time Out (timeout)|

The CVV2 (security code) can be any random number. The expiry date must be greater than current date.

## Device Finger Print

You will need to add a 1-pixel image, which is not visible on the screen, and 2 scripts in the tag <Body> from your checkout page. Make sure that all process will take 10 seconds (rendering the code to submiiting process)

OBS: If this process is not concluded successfully, the result might not be pricise.

Scripts
Place the code segments above the </ Body> tag to ensure that a Web page is rendered correctly. Never add code segments into visible HTML elements. Code segments need to be loaded before the customer completes the purchase order, otherwise an error will be generated.

Replacing the variables
Copy the codes bellow, and replace the variables with correct values.

Domain: 
** Testing ** - fix value: h.online-metrix.net (Fingerprint's DNS Address)
** Production ** - use your own address that must redirect to h.online-metrix.net
‹org id›: Brsapag will provide you
‹merchant ID›: Brsapag will provide you
‹session ID›: use the same value used for “DeviceFingerprintID”

###PNG image

```html
‹p style="background:url(https://h.online-metrix.net/fp/clear.png?org_id=‹org ID›&session_id=‹merchant id›‹session ID›&m=1)"›‹/p›
‹img src="https://h.online-metrix.net/fp/clear.png?org_id=‹org ID›&session_id=‹merchant id›‹session ID›&m=2" alt=""›
```

```html
<!-- EXEMPLO -->
‹p style="background:url(https://h.online-metrix.net/fp/clear.png?org_id=sample_orgID&session_id=sample_merchantIDsample_sessionID&m=1)"›‹/p›
‹img src="https://h.online-metrix.net/fp/clear.png?org_id=sample_orgID&session_\id=sample_merchantIDsample_sessionID&m=2" alt=""›
```

###Flash code

```html
‹object type="application/x-shockwave-flash" data="https://h.online-metrix.net/fp/fp.swf?org_id=‹org ID›&session_id=‹merchant id›‹session ID›" width="1" height="1"id="thm_fp"›
‹param name="movie" value="https://h.online-metrix.net/fp/fp.swf?org_id=‹orgID›&session_id=‹merchant id›‹session ID›" /›
‹div›‹/div›
‹/object› 
```

```html
<!-- EXEMPLO -->
‹object type="application/x-shockwave-flash" data="https://h.online-metrix.net/fp/fp.swf?org_id=sample_orgID&session_id=sample_merchantIDsample_sessionID"width="1" height="1" id="thm_fp"›
‹param name="movie" value="https://h.online-metrix.net/fp/fp.swf?org_id=sample_orgID&session_id=sample_merchantIDsample_sessionID" /›
‹div›‹/div›
‹/object› 
```

###JavaScript code

```html
‹script src="https://h.online-metrix.net/fp/check.js?org_id=‹org ID›&session_
id=‹merchant id›‹session ID›" type="text/javascript"›
‹/script› 
```

```html
<!-- EXEMPLO -->
‹script src="https://h.online-metrix.net/fp/check.js?org_id=‹org ID›&session_
id=‹merchant id›‹session ID›" type="text/javascript"›
‹/script› 
```

#FAQ

|Questions|Answeres|Theme|
|---|---|---|
|What is the difference between Status, ReasonCode and ProviderReturnCode?|The answer is:<BR><UL><LI>Status: represents the current status of the transaction.</LI><LI>ReasonCode: represents the status of the request.</LI><LI>ProviderReturnCode: represents the response code from the acquirer or bank.</LI></UL>For example, an authorization request may have a return with ReasonCode = 0 (Sucessfull), ie the request has been successfully completed, but the Status may be 0-Denied, for having the transaction not authorized by the buyer, ProviderReturnCode 57 (one of Cielo's denied codes)|Integration|
