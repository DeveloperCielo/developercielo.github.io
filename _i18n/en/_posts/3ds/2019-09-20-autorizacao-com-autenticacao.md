---
layout: manual
title: 3. Authorization with Authentication
description: Technical Integration Manual 3DS 2.0
search: true
translated: true
categories: manual
sort_order: 5
tags:
  - 3DS 2.0 Authentication
language_tabs:
  json: JSON
  shell: cURL
---

# Authorization with Authentication (API 3.0)

After authentication is completed, submit to the authorization procedure, sending the authentication data in the model of quot;external authentication&quot; (node **ExternalAuthentication** ).
This procedure is also valid for establishments that performed authentication outside Cielo (External MPI).

See example below, describing the sending of Cielo 3.0 API authorization request authentication data:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales</span></aside>

### Request

```json
{
   "MerchantOrderId":"2017051002",
   "Customer":
   {
     (...)
   },
   "Payment":
   {
     (...)
     "Authenticate":true,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
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
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--header "MerchantKey: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--data-binary
--verbose
{
   "MerchantOrderId":"2017051002",
   "Customer":
   {
     (...)
   },
   "Payment":
   {
     (...)
     "Authenticate":true,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
       "Version":"2",
       "ReferenceId":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
     }
   }
}
```

| **Field**                                  | **Description**                                                                                      | **Type/Size**              | **Required**                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------ |
| `Payment.Authenticate`                       | Boolean which defines whether the buyer will be directed to the issuing Bank for card authentication | Boolean                    | Yes, for authentication to be performed it is required to send as `true` |
| `Payment.ExternalAuthentication.Cavv`        | Signature that is returned in authentication success scenarios                                       | Text                       | Yes, when authentication was a success                                   |
| `Payment.ExternalAuthentication.Xid`         | XID returned in authentication process                                                               | Text                       | Yes, when the 3DS version is &quot;1&quot;                               |
| `Payment.ExternalAuthentication.Eci`         | E-Commerce Indicator returned in authentication process                                              | Numeric [1 character]      | Yes                                                                      |
| `Payment.ExternalAuthentication.Version`     | 3DS version used in authentication process                                                           | Alphanumeric [1 character] | Yes, when the 3DS version is &quot;2&quot;                               |
| `Payment.ExternalAuthentication.ReferenceId` | RequestID returned in authentication process                                                         | GUID [36 characters]       | Yes, when the 3DS version is &quot;2&quot;                               |

### Response

See [Cielo E-commerce API](https://developercielo.github.io/en/manual/cielo-ecommerce#response){:target="_blank"} for the response.

# Authorization for Data Only Transactions

After the authentication step in Data Only model is completed (field `bpmpi_auth_notifyonly` set as "true"), the transaction undergoes the authorization process by sending the authentication data in the “external authentication” model (node `ExternalAuthentication`).
See example below, describing the submission of authentication data from the Pagador API authorization request, using POST:

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales</span></aside>

```json
{  
   "MerchantOrderId":"2017051002",
   "Customer":
   {  
     (...)
   },
   "Payment":
   {  
     (...)
     "Authenticate":false,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{  
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2027",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Eci":"4",
       "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6",
       "dataonly":true
     }
   }
}
```

```shell
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--header "MerchantKey: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--data-binary
--verbose
{  
   "MerchantOrderId":"2017051002",
   "Customer":
   {  
     (...)
   },
   "Payment":
   {  
     (...)
     "Authenticate":false,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{  
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2027",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Eci":"4",
       "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6",
       "dataonly":true
     }
   }
}
```

| **FIELD** | **DESCRIPTION** | **TYPE/SIZE** | **REQUIRED** |
| --- | --- | --- | --- |
|`Payment.Authenticate`|Defines if the buyer will be directed to the issuing Bank for card authentication|Boolean (true or false)|Yes. For Data Only transactions the value must be "false"| 
|`Payment.ExternalAuthentication.Eci`|*E-commerce Indicator* returned in authentication process|Numeric [1 position]|Yes|
|`Payment.ExternalAuthentication.ReferenceId`|RequestID returned in authentication process|GUID [36 positions]|Yes|
|`Payment.ExternalAuthentication.DataOnly`|Defines if transaction is *Data Only*|Boolean (true or false)|Yes. For Data Only transactions the value must be "true"|

### Response

See [Cielo E-commerce API](https://developercielo.github.io/manual/cielo-ecommerce#resposta42){:target="_blank"} for detailed examples of Authorization with Authentication response.

# ECI Table

The Electronic Commerce Indicator (ECI) is a code returned by the card brands indicating the 3DS card holder authentication result. The table below presents the ECI codes corresponding to each brand and the authentication result.

> The ECI value received during authentication must later be sent in the authorization request in the parameter `Payment.ExternalAuthentication.Eci`.

|Mastercard                 |Visa                |Elo                  |Amex                |Authentication Result|Transaction was authenticated?|
|---------------------------|--------------------|---------------------|--------------------|-------------------------|--------------------------|
| 02                        |05                  |05                   |05                  |Authenticated by the issuer – chargeback liability is held by the issuer.|Yes|
| 01                        |06                  |06                   |06                  |Authenticated by the card brand – chargeback liability is held by the issue.|Yes|
| Different from 01, 02 or 04  |Different from 05 or 06|Different from 05 or 06 |Different from 05 or 06| Non-authenticated – chargeback liability is held by the merchant.|No|
| 04                        |-                   |-                    |-                   |Non-authenticated, *Data Only* transaction – chargeback liability is held by the merchant|No|
