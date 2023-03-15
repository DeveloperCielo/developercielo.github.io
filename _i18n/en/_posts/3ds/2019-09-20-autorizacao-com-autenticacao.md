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
| Payment.Authenticate                       | Boolean which defines whether the buyer will be directed to the issuing Bank for card authentication | Boolean                    | Yes, for authentication to be performed it is required to send as `true` |
| Payment.ExternalAuthentication.Cavv        | Signature that is returned in authentication success scenarios                                       | Text                       | Yes, when authentication was a success                                   |
| Payment.ExternalAuthentication.Xid         | XID returned in authentication process                                                               | Text                       | Yes, when the 3DS version is &quot;1&quot;                               |
| Payment.ExternalAuthentication.Eci         | E-Commerce Indicator returned in authentication process                                              | Numeric [1 character]      | Yes                                                                      |
| Payment.ExternalAuthentication.Version     | 3DS version used in authentication process                                                           | Alphanumeric [1 character] | Yes, when the 3DS version is &quot;2&quot;                               |
| Payment.ExternalAuthentication.ReferenceId | RequestID returned in authentication process                                                         | GUID [36 characters]       | Yes, when the 3DS version is &quot;2&quot;                               |

### Response

See more: [https://developercielo.github.io/en/manual/cielo-ecommerce#response](https://developercielo.github.io/en/manual/cielo-ecommerce#response)

# Authorization with Authentication (Webservice 1.5)

See example below, describing the submission of the Cielo 1.5 API authorization request authentication data.

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/servicos/ecommwsec.do</span></aside>

### Request

```json
<?xml version="1.0" encoding="UTF-8"?>
<requisicao-transacao xmlns="http://ecommerce.cbmp.com.br" id="1" versao="1.2.1">
   <dados-ec>
   (...)
   </dados-ec>
   <dados-portador>
   (...)
   </dados-portador>
   <dados-pedido>
   (...)
   </dados-pedido>
   <forma-pagamento>
   (...)
   </forma-pagamento>
   <autorizar>3</autorizar>
   <capturar>true</capturar>
   <gerar-token>false</gerar-token>
   <dados-autenticacao-mpi-externa>
      <cavv>A901234A5678A0123A567A90120=</cavv>
      <xid>A90123A45678A0123A567A90123</xid>
      <eci>3</eci>
      <versao>1</versao>
      <dstid>3</dstid>
   </dados-autenticacao-mpi-externa>
</requisicao-transacao>
```

| **Field** | **Description**                                                | **Type/Size**              | **Required**                               |
| --------- | -------------------------------------------------------------- | -------------------------- | ------------------------------------------ |
| cavv      | Signature that is returned in authentication success scenarios | Text                       | Yes, when authentication was a success     |
| xid       | XID returned in authentication process                         | Text                       | Yes, when the 3DS version is &quot;1&quot; |
| eci       | E-Commerce Indicator returned in authentication process        | Numeric [1 character]      | Yes                                        |
| versao    | 3DS version used in authentication process                     | Alphanumeric [1 character] | Yes, when the 3DS version is &quot;2&quot; |
| dstid     | RequestID returned in authentication process                   | GUID [36 characters]       | Yes, when the 3DS version is &quot;2&quot; |

### Response

See more: [https://developercielo.github.io/en/manual/webservice-1-5#return-types](https://developercielo.github.io/en/manual/webservice-1-5#return-types)

# ECI Table

| **Brand**  | **ECI**                      | **Transaction Meaning**                                                                                       |
| ---------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Visa       | 06                           | Authenticated by the brand - risk of chargeback is from the issuer                                            |
| Visa       | 05                           | Authenticated by the issuer – risk of chargeback is from the issuer                                           |
| Visa       | Different from 05 and 06     | Not authenticated – risk of chargeback remains with the establishment                                         |
| Mastercard | 01                           | Authenticated by the brand - risk of chargeback is from the issuer                                            |
| Mastercard | 02                           | Authenticated by the issuer – risk of chargeback is from the issuer                                           |
| Mastercard | 04                           | Not authenticated, transaction characterized as Data Only - risk of chargeback remains with the establishment |
| Mastercard | Different from 01, 02 and 04 | Not authenticated – risk of chargeback remains with the establishment                                         |
