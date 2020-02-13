---
layout: manual
title: 2.1. Javascript Integration
description: Technical documentation to guide the developer to integrate with 3DS 2.0
search: true
translated: true
categories: manual
sort_order: 2
tags:
  - 3DS 2.0 Authentication
language_tabs:
  json: JSON
  shell: cURL
---

# What is 3DS 2.0?

For more details about the 3DS 2.0, see: [https://developercielo.github.io/en/manual/3ds](https://developercielo.github.io/en/manual/3ds)

# STEP 1. Access Token Request

The solution is composed by the access token request via the API and authentication request via Java Script.

|Environment | Endpoint | Authorization |
|---|---|---|
| **SANDBOX** | https://mpisandbox.braspag.com.br | **Basic _(Authorization)_**<br><br>The Authorization must be generated concatenating "ClientID", colon character (":") and "ClientSecret"<br><br>Ex. dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e:D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=<br><br>after this, encode the result in base 64. <br>Then, this will generate an alphanumeric code that will be used in the access token request. For test purposes, use the following data:<br><br>ClientID: **dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e**<br>ClientSecret: **D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=**|
| --- | --- |
| **PRODUCTION** | https://mpi.braspag.com.br | Please contact our support team to generate the "ClientID" and "ClientSecret" after integrating on sandbox environment. |

## Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/auth/token</span></aside>

```json
{
     "EstablishmentCode":"1006993069",
     "MerchantName": "Loja Exemplo Ltda",
     "MCC": "5912"
}
```

```shell
curl
--request POST "https://mpisandbox.braspag.com.br/v2/auth/token"
--header "Content-Type: application/json"
--header "Authorization: Basic xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--data-binary
--verbose
{
     "EstablishmentCode":"1006993069",
     "MerchantName": "Loja Exemplo Ltda",
     "MCC": "5912"
}
```

| **Parameter** | **Description** | **Type** | **Size** |
| --- | --- | --- | --- |
| EstablishmentCode | Cielo E-commerce 3.0 affiliation code | Numeric | 10 |
| MerchantName | Merchant Name as registered on Cielo | Alphanumeric | Max 25 |
| MCC | Merchant category code | Numeric | 4 |

## Response

```json
{
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6IlFBXzNEU19BdXRoZW50aWNhdG9yIiwiY2xpZW50X2lkIjoiZGJhM2E4ZGItZmE1NC00MGUwLThiYWItN2JmYjliNmYyZTJlIiwic2NvcGVzIjoie1wiU2NvcGVcIjpcIjNEU0F1dGhlbnRpY2F0b3JcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudE5hbWVcIixcIlZhbHVlc1wiOFwiVmFsdWVzXCI6W1wiNTU1NVwiXX0se1wiTmFtZVwiOlwiUmVmZXJlbmNlSWRcIixcIlZhbHVlc1wiOltcImY3MjE1YmQ3LWM0OTQtNGQ5Yi1NzEyfQ.daMqXko3dZOV0TzNFQ2vSsVSKqOsrwuswg7RB82ecAASSSSSSSSSSSSFFFFFFFFFFFFFGGGGGGGGGGGGGGGGGGGGGGGG",
      "token_type": "barear",
      "expires_in": "2018-07-23T11:29:32"
}
```

```shell
--header "Content-Type: application/json"
--data-binary
{
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6IlFBXzNEU19BdXRoZW50aWNhdG9yIiwiY2xpZW50X2lkIjoiZGJhM2E4ZGItZmE1NC00MGUwLThiYWItN2JmYjliNmYyZTJlIiwic2NvcGVzIjoie1wiU2NvcGVcIjpcIjNEU0F1dGhlbnRpY2F0b3JcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudE5hbWVcIixcIlZhbHVlc1wiOFwiVmFsdWVzXCI6W1wiNTU1NVwiXX0se1wiTmFtZVwiOlwiUmVmZXJlbmNlSWRcIixcIlZhbHVlc1wiOltcImY3MjE1YmQ3LWM0OTQtNGQ5Yi1NzEyfQ.daMqXko3dZOV0TzNFQ2vSsVSKqOsrwuswg7RB82ecAASSSSSSSSSSSSFFFFFFFFFFFFFGGGGGGGGGGGGGGGGGGGGGGGG",
      "token_type": "barear",
      "expires_in": "2018-07-23T11:29:32"
}
```

| **Parameter** | **Description** | **Type** |
| --- | --- | --- |
| access\_token | Token required to continue with authentication | Alphanumeric |
| token\_type | Fixed &quot;Bearer&quot; | Alphanumeric |
| expires\_in | Token expiration time (minutes) | Numeric |

# STEP 2. Script implementation

This step contains the _script_ and the mapping of _classes_ implementation responsable to comunicate with the authentication platform from brands and issuers. The example below shows the basic implementation. It is recommended that the snippet is placed at the end of the checkout HTML code: 

To download the code, [Click here](https://github.com/DeveloperCielo/developercielo.github.io/blob/docs/_i18n/pt/_posts/emv3ds/exemplo.html)

![Script Example 3DS 2.0](https://developercielo.github.io/images/exemplo-html.jpg)

Events Description

| **Event** | **Description** |
| --- | --- |
| onReady | This is triggered when the script is completely loaded, which includes validation of the access token, indicating that the checkout is ready to initiate authentication process |
| onSuccess | It is triggered when the card is elegible and the authentication process is successfully finished. In this case, the variables CAVV, XID and ECI are returned. These data must be sent in together with the authorization request. In this scenario, if the transaction is authorized, the liability shift is transferred to the issuer.|
| onFailure | It is triggered when the card is elegible but the authentication process failed for some reason. In this case, only ECI variable is returned. If the merchant decide to proceed with the authorization, the ECI must also be sent in the request. In this scenario if the transaction is authorized, the liability shift remains with the merchant.|
| onUnenrolled | It is triggered when the card is not elegible, in other words, the cardholder and/or issuer does not support the authentication program. In this case, only ECI variable is returned. If the merchant decides to proceed with the authorization, the ECI must be sent together with the authorization. If the transaction is authorized, the liability shift remains with the merchant.|
| onDisabled | It is triggered when the merchant chooses not to submit the cardholder to the authentication process. (&quot;bpmpi\_auth&quot; class set as false). In this scenario, if the transaction is authorized, the liability shift remains with the merchant.|
| onError | It is triggered when the authentication process receives a systemic error. In this scenario, if the transaction is authorized, the liability shift remains with the merchant.|
| onUnsupportedBrand |It is triggered when the card scheme is not supported by 3DS 2.0|

Request Parameters Description

| **Parameter** | **Description** | **Type** |
| --- | --- | --- |
| Environment | Indicates the environment to be used (Sandbox or Production)| String <br>**SDB** – _Sandbox (test environment)_ **PRD** – _Production (production environment)_ |
| Debug | Boolean that identifies if debug mode is activated. When sent as true, the platform will generate the report on the browser's debug mechanism.| Boolean <br>_true<br>false_ |

**NOTE!**

The JavaScript file must be saved in the server where the merchant application is hosted. To download the file on Sandbox environment, access: 

[https://bit.ly/2CSOp2n](https://bit.ly/2CSOp2n)

Output Description

| **Output** | **Description** | **Type** | **Size** |
| --- | --- | --- | --- |
| Cavv | Authentication signature | Alphanumeric | 28 |
| Xid | Authentication request ID | Alphanumeric | 28 |
| Eci | E-commerce indicator code, which represents the authentication result | Numeric | Max 2 |
| Version | 3DS applied version | Numeric | 1<br> **1.0** = _3DS 1.0;_ <br>**2.0** = _3DS 2.0;_ |
| ReferenceId | Authentication request ID | GUID |36 |
| ReturnCode | Authentication return code | Alphanumeric |Max 5 |
| ReturnMessage | Authentication result message | Alphanumeric | Variable |

# STEP 3. Mapping Classes

Classes that must be mapped in your HTML code.

Once the class is mapped to it's given field, the script is able to retrieve the value contained in the field and submit it to compose the authentication request. 

<aside class="warning">The higher amount of fields parametrized, the higher is the chance of having a transparent authentication, since the issuer will have more data for the risk analysis.</aside>

<aside class="notice">The # character indicated in the field must be replaced by the number representing the item index. <br> Example: bpmpi_item_1_productName' represents the first item of the cart.</aside>

| **Parameterization Data** | **Description** | **Type/Size** | **Mandatory** |
| --- | --- | --- | --- | --- | --- |
| bpmpi_auth | Boolean that indicates if the transaction will be submitted to authentication process | Boolean<br>true - authenticate;<br>false - not authenticate/1 | Yes |
| bpmpi_auth_notifyonly | Boolean that indicates if the transaction will be submitted to notify mode. In this mode, the authentication process will not be performed. **VALID JUST FOR MASTERCARD** | Boolean: <br>true – notify mode; <br>false – authentication mode | Yes |
| bpmpi_auth_suppresschallenge | Boolean that indicates if ignore or not the challenge. If the challenge is ignored, the liability will keep with the merchant.  | Boolean: <br>true – ignore challenge <br>false – perform challenge | Yes |
| bpmpi_accesstoken | Token generated by Access Token API (step 1) | Alphanumeric/Variable | Yes |

| **Order data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---|
| bpmpi_ordernumber | Merchant order number | Alphanumeric | Max 50 | Yes| Yes |
| bpmpi_currency | Currency code | Fixed &quot;BRL&quot; | 3 | Yes| Yes |
| bpmpi_totalamount | Total transaction amount (cents) | Numeric| Max 15 | Yes | Yes |
| bpmpi_installments | Number of Installments | Numeric| Yes | Yes |
| bpmpi_paymentmethod | Card type to be authenticated. If the card has both functions, it is necessary to specify the transaction type. | String<br>Credit – _Credit card_<br>Debit – _Debit card_ | Max 6 | Yes| Yes|
| bpmpi_cardnumber | Card number | Numeric | Max 19 | Yes| Yes |
| bpmpi_cardexpirationmonth | Card expiration month | Numeric | 2 | Yes| Yes|
| bpmpi_cardexpirationyear | Card expiration year| Numeric | 4 | Yes| Yes |
| bpmpi_cardalias | Card alias | Alphanumeric| Max 128 | No | Yes |
| bpmpi_default_card | Customer default card | Boolean | <br>_true_<br>_false_ | No | Yes|
| bpmpi_recurring_enddate | End date of recurrency | Text (AAAA-MM-DD) | No | No |
| bpmpi_recurring_frequency | Frequency of recurrency | Number<br>1 - Monthy<br>2 - Bimonthly<br>3 - Quarterly<br>4 - Four Monthly<br>6 - Semester<br>12 - Annual| No | No |
| bpmpi_recurring_originalpurchasedate | Date of first transaction that orignated the recurrency | Text (AAAA-MM-DD) | No | No |

| **Order Description Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---|
| bpmpi_order_recurrence | Indicates if it is a recurrency order | Boolean | <br>_true_<br>_false_ | No | Yes |
| bpmpi_order_productcode | Product Type | **PHY**: purchase Goods<br>**CHA**: Check acceptance<br>**ACF**: Account financing<br>**QCT**: Quasi-Cash Transaction <br>**PAL**: Prepaid Activation and Load<br>| Yes |
| bpmpi_order_countlast24hours | Number of orders placed by same customer in the last 24 hours | Numeric | Max 3 | No | Yes |
| bpmpi_order_countlast6months | Number of orders placed by same customer in the last 6 months | Numeric |Max 4 | No | Yes |
| bpmpi_order_countlast1year | Number of orders placed by same customer in the last year | Numeric |Max 3 | No | Yes |
| bpmpi_order_cardattemptslast24hours | Number of orders placed with the same card in the last 24 hours | Numeric | Max 3 | No | Yes |
| bpmpi_order_marketingoptin | Indicates whether the buyer accepted to receive marketing offers | Boolean| <br>true<br>false  | No | Yes |
| bpmpi_order_marketingsource | Identifica a origem da campanha de marketing | Alphanumeric |Max 40 | No | Yes |
| bpmpi_transaction_mode | Identifies the channel from which the transaction originates | M: MOTO<br>R: Varejo<br>S: E-Commerce<br>P: Mobile<br>T: Tablet | No | Yes |
| bpmpi_merchant_url | Address of your company’s web site | Alphanumeric [100] Ex: http://www.exemplo.com.br  | No | Yes |

| **Gift Card (prepaid) Specific Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | --- |
| bpmpi_giftcard_amount | The total value of the purchase for prepaid gift cards in rounded value | Numeric | Max 15<br>_Example: R$ 125,54 = 12554_ | No | Yes |
| bpmpi_giftcard_currency | Transaction currency code paid with prepaid type card | String | Fixed &quot;BRL&quot; | No | Yes |

| **Billing Address Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- |  ---|
| bpmpi_billto_customerid | Identifies the CPF/CNPJ of customer| Numeric [11 to 14]<br>99999999999999 | No | Yes |
| bpmpi_billTo_contactname | Billing address contact name | Alphanumeric | Max 120 | No | Yes |
| bpmpi_billTo_phonenumber | Billing address phone number | Numeric |Max 15<br>_Format: 5511999999999_ | No | Yes |
| bpmpi_billTo_email | Billing address contact email | Alphanumeric |Max 255<br>_Format: [nome@exemplo.com](mailto:nome@exemplo.com)_ | No | Yes |
| bpmpi_billTo_street1 | Street Address and Billing Address Number | Alphanumeric |Max 60 | No | Yes |
| bpmpi_billTo_street2 | Neighborhood and complement billing address | Alphanumeric |Max 60 | No | Yes |
| bpmpi_billTo_city | Billing address city | Alphanumeric |Max 50 | No | Yes |
| bpmpi_billTo_state | Accuracy of billing address state | String | 2 | No | Yes |
| bpmpi_billto_zipcode | Billing address zip code | Alphanumeric | Max 8<br>_Format: 99999999_ | No | Yes |
| bpmpi_billto_country | Billing country for the account | String [2] Ex. BR | No | Yes |

| **Delivery Address Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---|
| bpmpi_shipto_sameasbillto | Indicates it is the same address provided on the billing address | Boolean | <br>_true<br>false_ | No | Yes |
| bpmpi_shipTo_addressee | Shipping address contact name | Alphanumeric | Max 60 | No | Yes |
| bpmpi_shipTo_phonenumber | Delivery address phone number | Numeric | Max 15<br>_Format: 5511999999999_ | No | Yes |
| bpmpi_shipTo_email | Delivery address contact email | Alphanumeric | Max 255<br>_Format [nome@exemplo.com](mailto:nome@exemplo.com)_ | No | Yes |
| bpmpi_shipTo_street1 | Street Address and Delivery Address Number | Alphanumeric | Max 60 | No | Yes |
| bpmpi_shipTo_street2 | Neighborhood and complement delivery address | Alphanumeric | Max 60 | No | Yes |
| bpmpi_shipTo_city | Delivery address city | Alphanumeric | Max 50 | No | Yes |
| bpmpi_shipTo_state | Accuracy of delivery address state | String | 2 | No | Yes |
| bpmpi_shipto_zipcode | Delivery address zip code | Numeric | 8<br>_Format: 99999999_ | No | Yes |
| bpmpi_shipto_country | Shipping country for the account | String [2] Ex. BR | No | Yes |
| bpmpi_shipTo_shippingmethod | Shipping Method Type | String | lowcost<br>sameday<br>oneday<br>twoday<br>threeday<br>pickup<br>other | No | Yes |
| bpmpi_shipto_firstusagedate | Indicates the date of first use of the delivery address | String | <br>_AAAA-MM-DD<br>Creation Date_ | No | Yes |

| **Shopping Cart Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---| 
| bpmpi_cart_#_description | Item description | Alphanumeric | Max 255 | No | Yes |
| bpmpi_cart_#_name | Item name | Alphanumeric |Max 255 | No | Yes |
| bpmpi_cart_#_sku | Item SKU | Alphanumeric | Max 255 | No | Yes |
| bpmpi_cart_#_quantity| Item quantity in cart | Numeric | Max 10 | No | Yes |
| bpmpi_cart_#_unitprice | Unit value of the cart item (cents) | Numeric | Max 10 | No | Yes |

| **User Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | --- |
| bpmpi_useraccount_guest | Indicates whether the customer is not logged (guest)| Boolean | _true<br>false_ | No | Yes |
| bpmpi_useraccount_createddate | Indicates the account creation date | String | _AAAA-MM-DD_  | No | Yes |
| bpmpi_useraccount_changeddate | Indicates the last chage date of customer's account | String | _AAAA-MM-DD_ | No | Yes |
| bpmpi_useraccount_passwordchangeddate | Indicates the date when the customer's account password changed | String | _AAAA-MM-DD_  | No | Yes |
| bpmpi_useraccount_authenticationmethod | Customer's Authentication Method | String | 01 - _No authentication_<br>02 - _Store login_<br>03 - _Login with federated ID_<br>04 - _Login with FIDO authenticator_ | No | Yes |
| bpmpi_useraccount_authenticationprotocol | In-store login protocol | Alphanumeric | Max 2048 | No | Yes |
| bpmpi_useraccount_authenticationtimestamp | Date and time the store was logged in | String | 19<br>_YYYY-MM-ddTHH:mm:ss_ | No | Yes |
| bpmpi_merchant_newcustomer | Indicates whether the consumer is a new or existing customer with the merchant | Boolean<br>true – yes<br>false – no  | No | Yes |

| **Device Data (from purchase)** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---| 
| bpmpi_device_ipaddress | Customer's IP Address | Alphanumeric | Max 45 | No | Yes |
| bpmpi_device_#_fingerprint | Id returned by Device Finger Print | Alphanumeric | [without limitation] | No | Yes |
| bpmpi_device_#_provider | Device Finger Print Provider Name | Alphanumeric | Max 32| _cardinal<br>inauth<br>threatmetrix_ | No | Yes |

| **Specific Airlines Data** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---| 
| bpmpi_airline_travelleg_#_carrier | IATA code for the stretch | Alphanumeric | 2 | No | Yes |
| bpmpi_airline_travelleg_#_departuredate | Departure date | String | _AAAA-MM-DD_ | No | Yes |
| bpmpi_airline_travelleg_#_origin | IATA code from origin airport | Alphanumeric | 5 | No | Yes |
| bpmpi_airline_travelleg_#_destination | IATA code from destination airport | Alphanumeric | 5 | No | Yes |
| bpmpi_airline_passenger_#_name| Passenger name | Alphanumeric | Max 60 | No | Yes |
| bpmpi_airline_passenger_#_ticketprice | Ticket price (cents) | Numeric | Max 15<br>_Exemple: R$ 125,54 = 12554_ | No | Yes |
| bpmpi_airline_numberofpassengers | Number of passengers | Numeric | 3 | No | Yes |
| bpmpi_airline_billto_passportcountry | Passport Issuer Country Code (ISO Standard Country Codes) | String | 2 | No | Yes |
| bpmpi_airline_billto_passportnumber | Passport number | Alphanumeric | 40 | No | Yes |

| **Merchant Extra Data (if necessary)** | **Description** | **Type** | **Size** | **Mandatory to challenge authentication** | **Mandatory to silent authentication (without challenge)** |
| --- | --- | --- | --- | --- | ---| 
| bpmpi_mdd1 | Extra data set by the merchant | Alphanumeric | Max 255 | No | No |
| bpmpi_mdd2 | Extra data set by the merchant | Alphanumeric | Max 255 | No | No |
| bpmpi_mdd3 | Extra data set by the merchant | Alphanumeric | Max 255 | No | No |
| bpmpi_mdd4 | Extra data set by the merchant | Alphanumeric | Max 255 | No | No |
| bpmpi_mdd5 | Extra data set by the merchant | Alphanumeric | Max 255 | No | No |

# STEP 4. Implementing authentication request 

The &quot;**bpmpi\_Authenticate()**&quot; event must be requested when finishing the checkout(finishing the order). Example:

&lt;input type=&quot;button&quot;onclick=&quot;bpmpi_authenticate()&quot; /&gt;

# Card Numbers for test Purpose

Use the **test** cards below to simulate different scenarios in the **SANDBOX** environment

| **Card** | **Result** | **Description** |
| 4000000000001000 | SUCCESS | Silent Authentication successfully authenticated |
| 4000000000001018 | FAILURE | Failed Silent Authentication |
| 4000000000001034 | UNENROLLED | Card not enrolled |
| 4000000000001091 | SUCCESS | Authentication with challenge successfully authenticated |
| 4000000000001117 | UNENROLLED | Authentication with challenge and card not enrolled |
| 4000000000001109 | FAILURE | Failed Authentication with challenge |

## Authorization with Authentication

After authentication is completed, submit to the authorization procedure, sending the authentication data in the model of quot;external authentication&quot; (node **ExternalAuthentication** ).
See more details at: [https://developercielo.github.io/en/manual/autorizacao-com-autenticacao](https://developercielo.github.io/en/manual/autorizacao-com-autenticacao)

# Last updates

To view the latest manual updates, [click here](https://github.com/DeveloperCielo/developercielo.github.io/commits/docs/_i18n/en/_posts/3ds/2019-09-20-integracao-javascript.md)
