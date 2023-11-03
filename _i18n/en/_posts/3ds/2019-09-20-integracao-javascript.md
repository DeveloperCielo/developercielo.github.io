---
layout: manual
title: 2.1. Javascript Integration
description: Technical documentation to guide the developer to integrate with 3DS 2.0
search: true
translated: true
categories: manual
sort_order: 2
tags:
  - 2. 3DS 2.0 Authentication
language_tabs:
  json: JSON
  shell: cURL
---

# What is 3DS 2.0?

For more details about the 3DS 2.0, see: [https://developercielo.github.io/en/manual/3ds](https://developercielo.github.io/en/manual/3ds)

# STEP 1. Access Token Request

The solution is composed by the access token request via the API and authentication request via Java Script.

| Environment    | Endpoint                          | Authorization                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SANDBOX**    | https://mpisandbox.braspag.com.br | **Basic _(Authorization)_**<br><br>The Authorization must be generated concatenating "ClientID", colon character (":") and "ClientSecret"<br><br>Ex. dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e:D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=<br><br>after this, encode the result in base 64. <br>Then, this will generate an alphanumeric code that will be used in the access token request. For test purposes, use the following data:<br><br>ClientID: **dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e**<br>ClientSecret: **D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=** |
| ---            | ---                               |
| **PRODUCTION** | https://mpi.braspag.com.br        | Please contact our support team to generate the "ClientID" and "ClientSecret" after integrating on sandbox environment.                                                                                                                                                                                                                                                                                                                                                                                                                                         |

## Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/auth/token</span></aside>

```json
{
  "EstablishmentCode": "1006993069",
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

| **Parameter**     | **Description**                       | **Type**     | **Size** |
| ----------------- | ------------------------------------- | ------------ | -------- |
| EstablishmentCode | Cielo E-commerce 3.0 affiliation code | Numeric      | 10       |
| MerchantName      | Merchant Name as registered on Cielo  | Alphanumeric | Max 25   |
| MCC               | Merchant category code                | Numeric      | 4        |

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

| **Parameter** | **Description**                                | **Type**     |
| ------------- | ---------------------------------------------- | ------------ |
| access_token  | Token required to continue with authentication | Alphanumeric |
| token_type    | Fixed &quot;Bearer&quot;                       | Alphanumeric |
| expires_in    | Token expiration time (minutes)                | Numeric      |

# STEP 2. Script implementation

This step contains the _script_ and the mapping of _classes_ implementation responsable to comunicate with the authentication platform from brands and issuers. The example below shows the basic implementation. It is recommended that the snippet is placed at the end of the checkout HTML code:

> To download the code, [Click here](https://github.com/DeveloperCielo/developercielo.github.io/blob/docs/_i18n/pt/_posts/emv3ds/exemplo.html)

![Script Example 3DS 2.0](https://developercielo.github.io/images/exemplo-html.jpg)

## Description of Events

The events are actions that the script considers as a response for following the authentication process, but do not indicate if the transaction was successfully authenticated.

The ECI (E-commerce Indicator) is what indicates if the transaction was authenticated or not and the liability in case of chargeback. In order to sumbit a transaction for authorization, please consider the ECI value and use the events only as a complemenatry information for decision-making.

<aside class="warning">Submitting a non-authenticated transaction for authorization is allowed; however, the liability shift in case of chargeback remains with the merchant.</aside>

| **Event**          | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onReady            | This is triggered when the script is completely loaded, which includes validation of the access token, indicating that the checkout is ready to initiate authentication process                                                                                                                                                                                                                                                                                                                        |
| onSuccess          | It is triggered when the card is elegible and the authentication process is successfully finished. In this case, the variables CAVV, XID and ECI are returned. These data must be sent in together with the authorization request. In this scenario, if the transaction is authorized, the liability shift is transferred to the issuer.                                                                                                                                                               |
| onFailure          | It is triggered when the card is elegible but the authentication process failed for some reason. In this case, only ECI variable is returned. If the merchant decide to proceed with the authorization, the ECI must also be sent in the request. In this scenario if the transaction is authorized, the liability shift remains with the merchant.                                                                                                                                                    |
| onUnenrolled       | It is triggered when the card is not elegible, in other words, the cardholder and/or issuer does not support the authentication program. In this case, guide the shopper to check with the issuer if the card is enabled to perform authentication in e-commerce. Only the ECI variable is returned. If the merchant decides to proceed with the authorization, the ECI must be sent together with the authorization. If the transaction is authorized, the liability shift remains with the merchant. |
| onDisabled         | It is triggered when the merchant chooses not to submit the cardholder to the authentication process. (&quot;bpmpi_auth&quot; class set as false). In this scenario, if the transaction is authorized, the liability shift remains with the merchant.                                                                                                                                                                                                                                                  |
| onError            | It is triggered when the authentication process receives a systemic error. In this scenario, if the transaction is authorized, the liability shift remains with the merchant.                                                                                                                                                                                                                                                                                                                          |
| onUnsupportedBrand | It is triggered when the card scheme is not supported by 3DS 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Description of Request Parameters

| **Parameter** | **Description**                                                                                                                                | **Type**                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Environment   | Indicates the environment to be used (Sandbox or Production)                                                                                   | String <br>**SDB** – _Sandbox (test environment)_ **PRD** – _Production (production environment)_ |
| Debug         | Boolean that identifies if debug mode is activated. When sent as true, the platform will generate the report on the browser's debug mechanism. | Boolean <br>_true<br>false_                                                                       |

**NOTE!**

The JavaScript file must be saved in the server where the merchant application is hosted. To download the file on Sandbox environment, access:

[https://bit.ly/2CSOp2n](https://bit.ly/2CSOp2n)

Output Description

| **Output**    | **Description**                                                       | **Type**     | **Size**                                            |
| ------------- | --------------------------------------------------------------------- | ------------ | --------------------------------------------------- |
| Cavv          | Authentication signature                                              | Text         | -                                                   |
| Xid           | Authentication request ID                                             | Text         | -                                                   |
| Eci           | E-commerce indicator code, which represents the authentication result | Numeric      | Max 2                                               |
| Version       | 3DS applied version                                                   | Numeric      | 1<br> **1.0** = _3DS 1.0;_ <br>**2.0** = _3DS 2.0;_ |
| ReferenceId   | Authentication request ID                                             | GUID         | 36                                                  |
| ReturnCode    | Authentication return code                                            | Alphanumeric | Max 5                                               |
| ReturnMessage | Authentication result message                                         | Alphanumeric | Variable                                            |

# STEP 3. Mapping Classes

Classes that must be mapped in your HTML code.

Once the class is mapped to it's given field, the script is able to retrieve the value contained in the field and submit it to compose the authentication request.

<aside class="warning">The higher amount of fields parametrized, the higher is the chance of having a transparent authentication, since the issuer will have more data for the risk analysis.</aside>

<aside class="notice">The # character indicated in the field must be replaced by the number representing the item index. <br> Example: bpmpi_item_1_productName' represents the first item of the cart.</aside>

|**Data Category**|**Field**|**Description**|**Type/Size**|**Required**|
|-|-|-|-|-|
|Parameterization|`bpmpi_auth`|Boolean indicating whether or not the transaction is submitted to the authentication process.|Boolean: <br>true - submit to authentication<br>false - don't subit to authentication|Yes|
|Parameterization|`bpmpi_auth_notifyonly`|Boolean indicating whether the card transaction will be submitted in "notification only" mode. In this mode, the authentication process will not be triggered, however, the data will be submitted to the flag. **VALID ONLY FOR MASTERCARD CARDS**|Boolean: <br>true - notification only mode;<br>false - authentication mode|No|
|Parameterization|`bpmpi_auth_suppresschallenge`|Boolean that indicates if ignore or not the challenge. If the challenge is ignored, the liability will keep with the merchant.|Boolean: <br>true – ignore challenge <br>false – perform challenge| Yes|
|Parameterization|`bpmpi_accesstoken`|Token generated by Access Token API (step 1)|Alphanumeric (variable)|Yes|
|Order|`bpmpi_ordernumber`|Merchant order number|Alphanumeric [max 50 positions]|Yes|
|Order|`bpmpi_currency`|Currency code|Fixed "BRL"|Yes|
|Order|`bpmpi_totalamount`|Total transaction amount (cents)|Numeric [max 15 positions]|Yes|
|Order|`bpmpi_installments`|Number of Installments|Numeric [max 2 positions]|Yes|
|Order|`bpmpi_paymentmethod`|Card type to be authenticated. If the card has both functions, it is necessary to specify the transaction type.|Credit - Credit Card<br>Debit - Debit Card|Yes|
|Order|`bpmpi_cardnumber`|Card number|Numeric [max 19 positions]|Yes|
|Order|`bpmpi_cardexpirationmonth`|Card expiration month|Numeric [max 2 positions]|Yes|
|Order|`bpmpi_cardexpirationyear`|Card expiration year|Numeric [max 4 positions]|Yes|
|Order|`bpmpi_cardalias`|Card alias|Alphanumeric [max 128 positions]|No|
|Order|`bpmpi_default_card`|Indicates whether it is a standard customer card in the e-commerce|Boolean<br>true - yes<br>false - no|No|
|Order|`bpmpi_recurring_enddate`|End date of recurrency|Text (AAAA-MM-DD)|No|
|Order|`bpmpi_recurring_frequency`|Frequency of recurrency|Number<br>1 - Monthly<br>2 - Bimonthly<br>3 - Quarterly<br>4 - Four Monthly<br>6 - Semester<br>12 - Annual|No|
|Order|`bpmpi_recurring_originalpurchasedate`|Date of first transaction that orignated the recurrency|Text (AAAA-MM-DD)|No|
|Order Description|`bpmpi_order_recurrence`|Indicates whether it is an order that generates future recurrences|Boolean<br>true<br>false|No|
|Order Description|`bpmpi_order_productcode`|Product Type|**PHY**: purchase Goods<br>**CHA**: Check acceptance<br>**ACF**: Account financing<br>**QCT**: Quasi-Cash Transaction <br>**PAL**: Prepaid Activation and Load<br>|Yes|
|Order Description|`bpmpi_order_countlast24hours`|Number of orders placed by same customer in the last 24 hours|Numeric [max 3 positions]|No|
|Order Description|`bpmpi_order_countlast6months`|Number of orders placed by same customer in the last 6 months|Numeric [max 4 positions]|No|
|Order Description|`bpmpi_order_countlast1year`|Number of orders placed by same customer in the last year|Numeric [max 3 positions]|No|
|Order Description|`bpmpi_order_cardattemptslast24hours`|Number of orders placed with the same card in the last 24 hours|Numeric [max 3 positions]|No|
|Order Description|`bpmpi_order_marketingoptin`|Indicates whether the shopper accepted to receive marketing offers|Boolean<br>true - yes<br>false - no|No|
|Order Description|`bpmpi_order_marketingsource`|Identifies the origin of the marketing campaign|Alphanumeric [max 40 positions]|No|
|Order Description|`bpmpi_transaction_mode`|Identifies the channel from which the transaction originates|M: MOTO<br>R: Varejo<br>S: E-Commerce<br>P: Mobile<br>T: Tablet|No|
|Order Description|`bpmpi_merchant_url`|Address of the e-commerce's web site|Alphanumeric [max 100 positions] Example: http://www.exemplo.com.br|Yes|
|Prepaid cards|`bpmpi_giftcard_amount`|The total purchase amount for prepaid gift cards in rounded value|Numeric [max 15 positions],<br> example: R$125,54 = 12554|No|
|Prepaid|`bpmpi_giftcard_currency`|Transaction currency code paid with prepaid type card|Fixed "BRL"|No|
|Billing Address|`bpmpi_billto_customerid`|Identifies the CPF/CNPJ of customer|Numeric [11 to 14 positions]<br>99999999999999|No|
|Billing Address|`bpmpi_billto_contactname`|Billing address contact name|Alphanumeric [max 120 positions]|No|
|Billing Address|`bpmpi_billto_phonenumber`|Billing address phone number|Numeric [max 15 positions], in the format: 5511999999999|No|
|Billing Address|`bpmpi_billto_email`|Billing address contact email|Alphanumeric [max 255 positions], in the format [name@example.com](mailto:name@example.com)|No|
|Billing Address|`bpmpi_billto_street1`|Street address and billing address number|Alphanumeric [max 60 positions]|No|
|Billing Address|`bpmpi_billto_street2`|Neighborhood and complement billing address|Alphanumeric [max 60 positions]|No|
|Billing Address|`bpmpi_billto_city`|Billing address city|Alphanumeric [max 50 positions]|No|
|Billing Address|`bpmpi_billto_state`|Billing address state|Text [2 positions]|No|
|Billing Address|`bpmpi_billto_zipcode`|Billing address zip code|Alphanumeric [max 8 positions], in the format: 99999999|No|
|Billing Address|`bpmpi_billto_country`|Billing address country|Text [2 positions] e.g., BR|No|
|Delivery Address|`bpmpi_shipto_sameasbillto`|Indicates it is the same address provided on the billing address|Boolean<br>true<br>false|No|
|Delivery Address|`bpmpi_shipto_addressee`|Shipping address contact name|Alphanumeric [max 60 positions]|No|
|Delivery Address|`bpmpi_shipTo_phonenumber`|Delivery address phone number|Numeric [max 15 positions], in the format: 5511999999999|No|
|Delivery Address|`bpmpi_shipTo_email`|Delivery address contact email|Alphanumeric [max 255 positions], in the format [name@example.com](mailto:name@example.com)|No|
|Delivery Address|`bpmpi_shipTo_street1`|Street address and delivery address number|Alphanumeric [max 60 positions]|No|
|Delivery Address|`bpmpi_shipTo_street2`|Neighborhood and complement delivery address|Alphanumeric [max 60 positions]|No|
|Delivery Address|`bpmpi_shipTo_city`|Delivery address city|Alphanumeric [max 50 positions]|No|
|Delivery Address|`bpmpi_shipTo_state`|Accuracy of delivery address state|string [2 positions]|No|
|Delivery Address|`bpmpi_shipto_zipcode`|Delivery address zip code|Alphanumeric [max 2 positions], in the format: 99999999|No|
|Delivery Address|`bpmpi_shipto_country`|Delivery address country|Text [2 positions], e.g., BR|No|
|Delivery Address|`bpmpi_shipTo_shippingmethod`|Shipping method type|lowcost<br>sameday<br>oneday<br>twoday<br>threeday<br>pickup<br>other|No|
|Delivery Address|`bpmpi_shipto_firstusagedate`| Indicates the date of first use of the delivery address|Text<br>AAAA-MM-DD - criation date|No|
|Shopping Cart|`bpmpi_cart_#_description`|Item description|Alphanumeric [max 255 positions]|No|
|Shopping Cart|`bpmpi_cart_#_name`|Item name|Alphanumeric [max 255 positions]|No|
|Shopping Cart|`bpmpi_cart_#_sku`|Item SKU|Alphanumeric [max 255 positions]|No|
|Shopping Cart|`bpmpi_cart_#_quantity`|Cart item quantity|Numeric [max 10 positions]|No|
|Shopping Cart|`bpmpi_cart_#_unitprice`|Unit value of the cart item (cents)|Numeric [max 10 positions]|No|
|User|`bpmpi_useraccount_guest`|Indicates whether the customer is not logged (guest)|Boolean<br>true - yes<br>false - no|No|
|User|`bpmpi_useraccount_createddate`|Indicates the account creation date|String<br>AAAA-MM-DD - creation date|No|
|User|`bpmpi_useraccount_changeddate`|Indicates the last change date of shopper's account|String<br>AAAA-MM-DD - last alteration date|No|
|User|`bpmpi_useraccount_passwordchangeddate`|Indicates the date when the shopper's account password changed|Text<br>AAAA-MM-DD - date of the last password change|No|
|User|`bpmpi_useraccount_authenticationmethod`|Shopper's authentication method|01 - _No authentication_<br>02 - _Store login_<br>03 - _Login with federated ID_<br>04 - _Login with FIDO authenticator_|No|
|User|`bpmpi_useraccount_authenticationprotocol`|Data that represents the login protocol carried out in the store|Alphanumeric [max 2048 positions]|No|
|User|`bpmpi_useraccount_authenticationtimestamp`|The date and time the store was logged in|String [max 19 positions]_YYYY-MM-ddTHH:mm:ss_|No|
|User|`bpmpi_merchant_newcustomer`|Indicates whether the consumer is a new or existing customer with the merchant|Boolean<br>true – yes<br>false – no|No|
|Device|`bpmpi_device_ipaddress`|IP address of the shopper's machine|Alphanumeric [max 45 positions]|Conditional - required for Visa only|
|Device|`bpmpi_device_#_fingerprint`|Id returned by Device Fingerprint|Alphanumeric [no limit]|No|
|Device|`bpmpi_device_#_provider`|Device Fingerprint provider name| Alphanumeric [max 32 positions] cardinal<br>inauth<br>threatmetrix|No|
|Airlines|`bpmpi_airline_travelleg_#_carrier`|IATA code for the stretch|Alphanumeric [2 positions]|No|
|Airlines|`bpmpi_airline_travelleg_#_departuredate`|Departure date|String<br>AAAA-MM-DD|No|
|Airlines|`bpmpi_airline_travelleg_#_origin`|IATA code from origin airport|Alphanumeric [5 positions]|No|
|Airlines|`bpmpi_airline_travelleg_#_destination`|IATA code from destination airport|Alphanumeric [5 positions]|No|
|Airlines|`bpmpi_airline_passenger_#_name`|Passenger name|Alphanumeric [max 60 positions]|No|
|Airlines|`bpmpi_airline_passenger_#_ticketprice`|Ticket price (cents)|Numeric [max 15 positions],<br>example:R$125,54 = 12554|No|
|Airlines|`bpmpi_airline_numberofpassengers`|Passenger number|Numeric [3 positions]|No|
|Airlines|`bpmpi_airline_billto_passportcountry`|Code of the country that emitted the passport (ISO Standard Country Codes)|Text [2 positions]|No|
|Airlines|`bpmpi_airline_billto_passportnumber`|Passport number|Alphanumeric [40 positions]|No|
|Merchant|`bpmpi_mdd1`|Extra data defined by the merchant|Alphanumeric [max 255 positions]|No|
|Merchant|`bpmpi_mdd2`|Extra data defined by the merchant|Alphanumeric [max 255 positions]|No|
|Merchant|`bpmpi_mdd3`|Extra data defined by the merchant|Alphanumeric [max 255 positions]|No|
|Merchant|`bpmpi_mdd4`|Extra data defined by the merchant|Alphanumeric [max 255 positions]|No|
|Merchant|`bpmpi_mdd5`|Extra data defined by the merchant|Alphanumeric [max 255 positions]|No|

# STEP 4. Implementing authentication request

The &quot;**bpmpi_Authenticate()**&quot; event must be requested when finishing the checkout(finishing the order). Example:

&lt;input type=&quot;button&quot;onclick=&quot;bpmpi_authenticate()&quot; /&gt;

# Card Numbers for test Purpose

Use the **test** cards below to simulate different scenarios in the **SANDBOX** environment

## Test Cards with Challenge

| **CARD**                                                 | **FLAG**              | **RESULT** | **DESCRIPTION**                                                |
| -------------------------------------------------------- | --------------------- | ---------- | -------------------------------------------------------------- |
| 4000000000001091<br>5200000000001096<br>6505050000001091 | VISA<br>MASTER<br>ELO | SUCCESS    | Challenge authentication and bearer authenticated successfully |
| 4000000000001109<br>5200000000001104<br>6505050000001109 | VISA<br>MASTER<br>ELO | FAILURE    | Challenged authentication and bearer authenticated failed      |
| 4000000000001117<br>5200000000001112<br>6505050000001117 | VISA<br>MASTER<br>ELO | UNENROLLED | Challenge authentication currently unavailable                 |
| 4000000000001125<br>5200000000001120<br>6505050000001125 | VISA<br>MASTER<br>ELO | UNENROLLED | System error during authentication step                        |

## No Challenge Test Cards

| **CARD**                                                 | **FLAG**              | **RESULT** | **DESCRIPTION**                                                   |
| -------------------------------------------------------- | --------------------- | ---------- | ----------------------------------------------------------------- |
| 4000000000001000<br>5200000000001005<br>6505050000001000 | VISA<br>MASTER<br>ELO | SUCCESS    | Unchallenged authentication and bearer successfully authenticated |
| 4000000000001018<br>5200000000001013<br>6505050000001018 | VISA<br>MASTER<br>ELO | FAILURE    | Unchallenged authentication and bearer authenticated failed       |

## Authorization with Authentication

After authentication is completed, submit to the authorization procedure, sending the authentication data in the model of quot;external authentication&quot; (node **ExternalAuthentication** ).
See more details at: [https://developercielo.github.io/en/manual/autorizacao-com-autenticacao](https://developercielo.github.io/en/manual/autorizacao-com-autenticacao)

# Last updates

To view the latest manual updates, [click here](https://github.com/DeveloperCielo/developercielo.github.io/commits/docs/_i18n/en/_posts/3ds/2019-09-20-integracao-javascript.md)
