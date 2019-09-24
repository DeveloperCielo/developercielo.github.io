---
layout: manual
title: 2.2. SDK Android
description: Technical documentation to guide the developer to integrate with 3DS 2.0
search: true
translated: true
categories: manual
sort_order: 3
tags:
  - 3DS 2.0 Authentication
language_tabs:
  json: JSON
---

# What is 3DS 2.0?

For more details about the 3DS 2.0, see: [https://developercielo.github.io/en/manual/emv3ds](https://developercielo.github.io/en/manual/emv3ds)

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

| **Parameter** | **Description** | **Type** |
| --- | --- | --- |
| access\_token | Token required to continue with authentication | Alphanumeric |
| token\_type | Fixed &quot;Bearer&quot; | Alphanumeric |
| expires\_in | Token expiration time (minutes) | Numeric |

# STEP 2 - Using SDK

To use the SDK you need to copy and paste the Braspag3dsSdk file into app libs:

```kotlin
braspag3ds-1.0-release.aar
```

Then change in (gradle:app)

```kotlin
dependecies{

  implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
  
  ...
}
```

Then it's necessary to pass to the client side (APP) the *access_token* generated in the previous step:

```kotlin
val braspag3dsSdk = Braspag3ds(
                       accessToken = “<Access_Token>“,
                       environment = Environment.SANDBOX
                   )
```

Then you must use the method `authenticate`, informing the buyer details and the *callback* that will receive the response:

```kotlin
braspag3dsSdk.authenticate(
           orderData = OrderData(
               orderNumber = ORDER_NUMBER,
               currencyCode = CURRENCY_BRL,
               totalAmount = TOTAL_AMOUNT,
               paymentMethod = PaymentMethod.credit,
               transactionMode = TransactionMode.eCommerce,
               installments = 3,
               merchantUrl = “https://www.exemplo.com.br”
           ),
           cardData = CardData(
               number = selectedCard,
               expirationMonth = EXPIRATION_MONTH,
               expirationYear = EXPIRATION_YEAR
           ),
           authOptions = OptionsData(
               notifyOnly = notifyOnly,
               suppressChallenge = suppressChallenge
           ),
           shipToData = ShipToData(
               sameAsBillTo = true,
               addressee = “Rua Jose Joao, 666",
               city = “Jundiaí“,
               country = “BR”,
               email = “josejoao@gmail.com”,
               state = “SP”,
               shippingMethod = “lowcost”,
               zipCode = “13306270”
           ),
           recurringData = RecurringData(
               frequency = RecurringFrequency.MONTHLY
           ),
           userData = UserData(
               newCustomer = false,
               authenticationMethod = AuthenticationMethod.noAuthentication
           ),
           activity = activity,
           callback = callback
       )
   }                 
  }
```

## Method input parameters *authenticate*

| **Parameter** | **Type** | **Description** | **Required** |
| --- | --- | -- | -- |
| orderData | OrderData | Payment order data | Yes |
| cardData | CardData | Card data | Yes |
| authOptions | OptionsData? | Additional settings to the 3DS process | No |
| billToData | BillToData? | Carrier billing data | No |
| shipToData | ShipToData? | Delivery data | No |
| cart | [CartItemData]? | Array with cart items | No |
| deviceData | [DeviceData]? | Additional settings to the 3DS process | No |
| userData | UserData? | User data in your store | No |
| airlineData | AirlineData? | Airline Data | No |
| mdd | MddData? | Extra data sent by the seller | No |
| recurringData | RecurringData? | Recurring data | No |
| deviceIpAddress | String? | Device IP address | No |

## Callback status description

| **Status** | **Description** | 
| --- | --- |
| success | It's returned when the card is eligible and the authentication process has been successfully completed. In this case, the CAVV, XID, and ECI variables will be returned. This data must be sent in the request at the time of authorization. In this scenario, if the transaction is authorized, the liability shift is transferred to the issuer.|
| unenrolled | It's returned when the card is not eligible, that is the holder and/or issuer doesn't participate in the authentication program. In this case, only the ECI variable will be returned. If there is a decision to proceed with the authorization anyway, the ECI must be sent at the time of the request. In this scenario, if the transaction is authorized, the liability shift remains with the establishment.|
| failure | It's returned when the card is eligible but has not had the authentication process failed for some reason. In this case, only the ECI variable will be returned. If there is a decision to proceed with the authorization anyway, the ECI must be sent at the time of the request. In this scenario, if the transaction is authorized, the liability shift remains with the establishment.|
| error | It's returned when the authentication process received a systemic error. In this scenario, if the transaction is authorized, the liability shift remains with the establishment.|
| unsupportedBrand | Returns when card banner is not supported by 3DS 2.0 |

## Description of the fields of *AuthenticationResponse*

| **Output** | **Description** | **Type/Size** |
| --- | --- | --- |
| cavv | Data representing authentication signature | Alphanumeric [28 characters] |
| xid | ID representing authentication request | Alphanumeric [28 characters] |
| eci | E-commerce indicator code, which represents the result of authentication | Numeric [to 2 characters] |
| version | 3DS version applied | Numeric [1 character]1 – 3DS 1.02 – 3DS 2.0 |
| referenceID | ID representing the authentication request | GUID [36 characters] |
| returnCode | Authentication request return code | Alphanumeric [to 5 characters] |
| returnMessage | Authentication request return message | Alphanumeric [variable] |

# Detailing of requisition objects

For facilitate of use only what the merchant needs to send, The request is separated into several objects with well-defined data context as the table of authenticate input parameters shows. Below we will detail each of the objects used.

<aside class="warning">The greater the number of parameterized fields, the greater the chance of having transparent authentication, because the issuer will have greater subsidy for risk analysis.</aside>

## OptionsData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| notifyonly | Boolean indicating whether the card transaction will be submitted in "notification only" mode. In this mode, the authentication process will not be triggered, but, the data will be flagged. **VALID ONLY FOR MASTERCARD CARDS** | Boolean: <br>true – notification only mode; <br>false – authentication mode | No |
| suppresschallenge | Boolean indicating whether or not to ignore the challenge when it exists. If a transaction authorized after ignoring the challenge, liability remains with the establishment.  | Boolean: <br>true – ignore challenges if any; <br>false – present challenge if there is | No |

## OrderData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| orderNumber | Order code at merchant | Alphanumeric [to 50 characters] | Yes |
| currencyCode | Currency code | Fixo &quot;BRL&quot; | Yes |
| totalAmount | Total transaction amount, sent in cents | Numeric [to 15 characters] | Yes |
| paymentMethod | Type of card to be authenticated. In the case of a multiple card, you must specify either Credit or Debit | *PaymentMethod* <br><br>CREDIT – Credit Card<br>DEBIT – Debit Card | Yes |
| installments | Number of transaction quota | Numeric [to 2 characters] | Yes |
| recurrence | Indicates if it is an order that generates future recurrences | Boolean<br>true<br>false | No |
| productCode | Purchase Type | *ProductCode*<br><br> HOTEL: Hotel<br>FINANCEACCOUNT: Account financing<br>CHECKACCEPTANCE: Check acceptance<br>DIGITALGOODS: Digital Goods<br>CASHDISPENSER: Cash dispenser<br>FUEL: Fuel<br>RETAIL: Retail<br>LUXURYGOODS: Luxury goods<br>RECHARGE: Recharge<br>GOODSPURCHASE: Purchase of goods<br>QUASIMONEYTRANSACTION: Quasi-money transaction<br>CARRENTAL: Car rental<br>RESTAURANT: Restaurant<br>SERVICES: Services<br>OTHER: Other<br>TURISM: Turism | No |
| countLast24Hours | Quantity of orders placed by this buyer in the last 24h | Numeric [to 3 characters] | No |
| countLast6Months | Quantity of orders placed by this buyer in the last 6 months | Numeric [to 4 characters] | No |
| countLast1Year | Quantity of orders placed by this buyer in the last year | Numeric [to 3 characters] | No |
| cardAttemptsLast24Hours | Number of same card transactions in last 24h | Numeric [to 3 characters] | No |
| marketingOptIn | Indicates whether the buyer has agreed to receive marketing offers. | Boolean<br>true – yes<br>false – no  | No |
| marketingSource | Identifies the source of the marketing campaign. | Alphanumeric [to 40 characters] | No |
| transactionMode | Identifies the channel that originated the transaction.. | M: MOTO<br>R: Retail<br>S: E-Commerce<br>P: Mobile<br>T: Tablet | No |
| merchantUrl | Merchant website address | Alphanumeric [100] Example: http://www.exemplo.com.br | Yes |

## CardData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| number | Card number | Numeric [to 19 characters] | Yes |
| expirationMonth | Card expiration month | Numeric [2 characters] | Yes |
| cardexpirationYear | Card expiration year | Numeric [4 characters] | Yes | 
| cardAlias | Card alias | Alphanumeric [to 128 characters] | No |
| defaultCard | Indicates if it is a standard store customer card | Boolean<br>true - Yes<br>false - No | No |

## BillToData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| customerId | Identify the buyer CPF/CNPJ | Numeric [11 to 14 characters]<br>99999999999999 | No |
| contactName| Billing address contact name | Alphanumeric [to 120 characters] | Yes |
| phoneNumber | Billing address contact phone | Numeric [to 15 characters], in the format: 5511999999999 | Yes |
| email | Billing address contact email | Alphanumeric [to 255 characters], in the format [nome@exemplo.com](mailto:nome@exemplo.com) | Yes |
| street1 | Billing address and address number | Alphanumeric [to 60 characters] | Yes |
| street2 | Billing second address and neighborhood | Alphanumeric [to 60 characters] | Yes |
| city | Billing address city | Alphanumeric [to 50 characters] | Yes |
| state | Billing address state initials | Text [2 characters] | Yes |
| zipCode | Billing address zip | Alphanumeric [to 8 characters], in the format: 99999999 | Yes |
| country | Billing address country | Text [2 characters] Ex. BR | Yes |

## ShipToData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| sameAsBillTo | Indicates whether to use the same address provided for billing address | Boolean<br>true<br>false | No |
| addressee | Shipping address contact name | Alphanumeric [to 60 characters] | No |
| phoneNumber | Shipping address contact phone | Numeric [to 15 characters], in the format: 5511999999999 | No |
| email | Shipping contact email | Alphanumeric [to 255 characters], in the format [nome@exemplo.com](mailto:nome@exemplo.com) | No |
| street1 | Shipping address and address number | Alphanumeric [to 60 characters] | No |
| street2 | Shipping second address and neighborhood | Alphanumeric [to 60 characters] | No | 
| city | Shipping address city | Alphanumeric [to 50 characters] | No |
| state | Shipping address state initials | Text [2 characters] | No | 
| zipCode | Shipping address zip | Alphanumeric [to 8 characters], in the format: 99999999 | No |
| country | Shipping address country | Text [2 characters] Ex. BR | No |
| shippingMethod | Shipping method type | *ShippingMethodEnum*<br><br>LOWCOST: Low cost<br>SAMEDAY: same day shipping<br>ONEDAY: next day shipping<br>TWODAY: shipping in two days<br>THREEDAY: shipping in three days<br>PICKUP: pick up in store<br>OTHER: Other <br>NONE: no shipping | No |
| firstUsageDate | Indicates the date when the shipping address was first used | Text<br>YYYY-MM-DD – creation date  | No |

## CartItemData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| description | Item description | Alphanumeric [to 255 characters] | No |
| name | Item name | Alphanumeric [to 255 characters] | Yes |
| sku | Item SKU | Alphanumeric [to 255 characters] | No |
| quantity| Item quantity in cart | Numeric [to 10 characters] | No |
| unitprice | Cart item unit value in cents | Numeric [to 10 characters] | No |

## DeviceData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| fingerprint | Id returned by Device Finger Print | Alphanumeric [without limitation] | No |
| provider | Device Finger Print Provider Name | Alphanumeric [to 32 characters] cardinal<br>inauth<br>threatmetrix| No |

## UserData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| guest | Indicates whether the buyer is a non-signed buyer (guest)| Boolean<br>true – yes<br>false – no  | No |
| createdDate | Indicates the date when the buyer account was created | Text<br>YYYY-MM-DD – creation date | No |
| changedDate | Indicates the date when the buyer account was last updated | Text<br>YYYY-MM-DD – date of last update | No |
| passwordChangedDate | Indicates the date when the buyer account password was changed | Text<br>AAAA-MM-DD – date of last password change  | No |
| authenticationMethod | Store buyer authentication method | *AuthenticationMethod* <br> NOAUTHENTICATION - There was no authentication<br>OWNSTORELOGIN - Own store login<br>FEDERATEDLOGIN - Federated ID login<br>FIDOAUTHENTICATOR - Login with FIDO authenticator | No |
| authenticationProtocol | Data representing the store login protocol | Alphanumeric [to 2048 characters] | No |
| authenticationTimestamp | The date and time the store was logged in | Text [19 characters] _YYYY-MM-ddTHH:mm:SS_ | No |
| newCustomer | Identifies if a new buyer in the store | Boolean<br>true – yes<br>false – no  | No |

## AirlineData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| numberOfPassengers | Number of passengers | Numeric [3 characters] | No |
| billToPassportCountry | Passport country code (ISO Standard Country Codes) | Text [2 characters] | No |
| billtoPassportNumber | Passport number | Alphanumeric [40 characters] | No |
| travelLeg | Stretch of the trip | TravelLeg | No |
| passenger | Passenger data | Passenger | No |

## TravelLeg

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| carrier | IATA code for the stretch | Alphanumeric [2 characters] | No |
| departureDate | Departure date | Text<br>YYYY-MM-DD | No |
| origin | IATA code of origin airport | Alphanumeric [5 characters] | No |
| destination | IATA code of destination airport | Alphanumeric [5 characters] | No |

## Passenger

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| name | Passenger name | Alphanumeric [to 60 characters] | No |
| ticketPrice | The value of the ticket in cents | Numeric [to 15 characters],<br>example: R$ 125,54 = 12554 | No |

## MDD

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| mdd1 | Extra data set by the seller | Alphanumeric [to 255 characters] | No |
| mdd2 | Extra data set by the seller | Alphanumeric [to 255 characters] | No |
| mdd3 | Extra data set by the seller | Alphanumeric [to 255 characters] | No |
| mdd4 | Extra data set by the seller | Alphanumeric [to 255 characters] | No |
| mdd5 | Extra data set by the seller | Alphanumeric [to 255 characters] | No |

## RecurringData

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| endDate | Identify recurrence end date | Text (YYYY-MM-DD) | No |
| frequency | Indicates recurrence frequency | *RecurringFrequencyEnum* <br><br>MONTHLYBIMONTHLY<br>QUARTERLY<br>TRIANNUAL<br>SEMIANNUAL<br>YEARLY| No |
| originalPurchaseDate | Identifies the date of the 1st transaction that originated the recurrence. | Text (YYYY-MM-DD) | No |

## Other parameters

| **Parameter** | **Description** | **Type/Size** | **Required** |
| --- | --- | --- | --- |
| ipAddress | IP address of buyer's machine | Alphanumeric [to 45 characters] | No |

# Test Cards

Use the **test** cards below to simulate various scenarios in the **SANDBOX** environment.

| **Card** | **Result** | **Description** |
| --- | --- | --- |
| 4000000000001000 | SUCCESS | Silent and carrier authentication successfully authenticated |
| 4000000000001018 | FAILURE | Silent and carrier authentication ended in failure |
| 4000000000001034 | UNENROLLED | Card not eligible for authentication |
| 4000000000001091 | SUCCESS | Challenging and carrier authentication successfully authenticated |
| 4000000000001117 | UNENROLLED | Challenge authentication and ineligible card |
| 4000000000001109 | FAILURE | Challenging and carrier authentication failed authentication |

## Authorization with Authentication

After authentication is completed, submit to the authorization procedure, sending the authentication data in the model of quot;external authentication&quot; (node **ExternalAuthentication** ).
See more details at: [https://developercielo.github.io/manual/autorizacao-com-autenticacao](https://developercielo.github.io/manual/autorizacao-com-autenticacao)

# Last updates

To view the latest manual updates, [click here](https://github.com/DeveloperCielo/developercielo.github.io/commits/docs/_i18n/en/_posts/emv3ds/2019-09-20-integracao-javascript.md)
