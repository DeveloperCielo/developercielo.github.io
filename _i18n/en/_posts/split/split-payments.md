---
layout: manual
title: Split Payments
description: Split Payments Integration Manual
search: true
toc_footers: false
categories: manual
sort_order: 3
hub_visible: false
tags:
  - Marketplace Solutions
---

# Split Payments

## Introduction

**Split Payments** enables transaction division of a transaction between different participants of a sale.

Frequently used on Marketplaces, where **the cart is composed of products from different suppliers, and the total amount of the sale must be shared**.

| **Participants** | **Description** |
|-----------|---------- |
| **Marketplace** | Responsible for the cart.<br> Has agreement with **Subordinates**, that supply cart products.<br> Establish the rates to be discounted on the sale of each **Subordinate**.<br> It may participate in a sale providing its products. |
| **Subordinate** | It is the supplier of products in the cart.<br> Receives part of the amount of the sale, less the rates agreed with the **Marketplace**. |
| **Cielo** | Responsible for the transaction flow.<br> Establishes the rates discounted on the total amount of the sale.<br> Is in charge of settling payments to **Subordinates** and **Marketplace**.|

The Marketplace integrates with Cielo, informing the transaction and how it should split between the participants. This split can happen at the moment of capture or later (known as post transactional split), as long as it happens within a pre-established time limit.

Once the transaction has captured, Cielo computes and pays the amount intended to each participant, within the established time limit for each product (payment scheme\*).

> **Payment Scheme**: Settlement time-limit according to product (credit or debit) and brand. <br>
> **Credit**: First installment in up to 31 days, remaining installments in each 30 days <br>
> **Debit**: In up to 2 business days.

To be able to use Split Payments, the Marketplace and its Subordinates must enroll at Cielo. After this process, both Marketplace and its Subordinates will have a unique identifier, known as **MerchantId (MID)** and must be used on transaction split requests.

Must be provided on the transaction split request:

* The **Subordinates' IDs**.
* The **participation amount ​​of each Subordinate**. The sum must be equal to the total amount of the transaction.
* **Rates** applied on the amount of each Subordinate. These rates must be negotiated in advance between the Marketplace and the Subordinate.

The Marketplace can also be a participant on transaction split. Informing the Marketplace ID gives it the role of Subordinate. It may happen when the Marketplace has its products on cart.

### Rates

The rates are established between the participants. It may be a **MDR(%)** and/or a **Fixed Fee(BRL)** and must be defined during the onboarding process.

These rates may be sent at transactional (capture) or post-transactional time. Otherwise, the rates agreed in advance between the participants will be used.

> **MDR (*Merchant Discount Rate*):** Percentage to be deducted from the amount of a transaction, defined by product (Credit / Debit), brand and installment range. <br>
> **Fixed Fee:** The amount, in cents, to be charged for each captured transaction. 

#### Cielo

The mediator and Marketplace will agree on an MDR and a Fixed Fee to deduct from the total value of each transaction.

The Marketplace, knowing these rates, will also negotiate an MDR and a Fixed Fee with each Subordinate. These values must include the MDR and fee agreed with Mediator.

The fixed fee agreed between Marketplace and Mediator is not deducted from the total amount of the transaction. That fee is deducted directly from the total amount the Marketplace will receive from the Mediator. The MDR, on the other hand, is part of the transaction split calculation since the MDR between Marketplace and its Subordinates includes the MDR between Marketplace and Mediator.

> **Cost to the Marketplace:** MDR of Mediator(%) + Fixed Fee(BRL)

#### Marketplace

The Marketplace is responsible for establishing the rates that will be charged from its Subordinates. That established MRD must be greater than or equal to the MDR agreed between Mediator and Marketplace. Optionally, a fixed fee can also be defined.

> **Cost to the Subordinate:** MDR of Marketplace(%) + Fixed Fee(BRL), where MDR of Marketplace(%) includes MDR of Mediator(%).

#### Example

A transaction of **BRL 100.00**, made by a **Marketplace** with the participation of **Subordinate 01**.

![SplitSample001](https://braspag.github.io/images/braspag/split/ensplit001.png)

In this example, assume the following agreements:

**Mediator rates**: 2% MDR + BRL 0.10 fixed fee.  
**Marketplace rates**: 3.5% MDR (2% from MDR of Mediator) + 0.30 fixed fee.

After the split, the following schedule events will happen:

**Subordinate**:  
Credit: BRL 96.20 [Deducting the MDR and the fixed fee agreed with Marketplace]

**Marketplace**:  
Credit: BRL 1.80 [MDR applied on Subordinate's amount deducting the MDR of Mediator]
Deductions: BRL 0.10 [Fixed fee agreed with Mediator]

**Mediator**:  
Credit: BRL 2.00 [MDR applied on the trasaction total amount]
Credit: BRL 0.10 [Fixed fee agreed with Marketplace]

### Brands

Split Payments supports the following brands:

* Visa
* MasterCard 
* Elo
* Amex
* Hipercard
* Diners
* Discover

## Environments

Split Payments is part of Cielo e-commerce API. Transactional operations still are performed by Cielo API. Only a few changes are required to use the Split Payments.
For more information about the Cielo E-Commerce API, see the [Integration Guide](https://developercielo.github.io/manual/cielo-ecommerce){:target="_blank"} of the platform.

### Sandbox

* **Cielo e-commerce API**: https://apisandbox.cieloecommerce.cielo.com.br/
* **Cielo e-commerce query API**: https://apiquerysandbox.cieloecommerce.cielo.com.br/
* **Split API**: https://splitsandbox.cieloecommerce.cielo.com.br/
* **Cielo OAUTH2 Server**: https://authsandbox.cieloecommerce.cielo.com.br/

### Production

* **Cielo e-commerce API**: https://api.cieloecommerce.cielo.com.br/
* **Cielo e-commerce query API**: https://apiquery.cieloecommerce.cielo.com.br/
* **Split API**: https://split.cieloecommerce.cielo.com.br/
* **Cielo OAUTH2 Server**: https://auth.cieloecommerce.cielo.com.br/

## Authentication

The Split Payments uses as security the [OAUTH2](https://oauth.net/2/){: target="_blank"} protocol. Because of that, Cielo e-Commerce API and the Split API require an access token.

To get an access token:

1. Concatenate the ClientId and ClientSecret: `ClientId:ClientSecret`.
2. Encode the concatenation result in Base64.
3. Perform a request to the authorization server:

**Request**  

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{oauth2-server}/oauth2/token</span></aside>

``` shell
x-www-form-urlencoded
--header "Authorization: Basic {base64}"  
--header "Content-Type: application/x-www-form-urlencoded"  
grant_type=client_credentials
```

**Response**

```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbG.....WE1igNAQRuHAs",
    "token_type": "bearer",
    "expires_in": 1199
}
```

> ClientId is the same used in integration with the Cielo E-Commerce API, known as MerchantId. The Mediator provides the ClientSecret.

The token in the response body (access_token) must be used in any request to the Cielo e-Commerce API or the Split API as an authorization key. It is valid for 20 minutes. A new token must be created when it expires.

## Integration

### Authorization  

The authorization of a transaction in Split Payments must be performed through the Cielo E-Commerce API following the same contracts described in the platform docs.

However, to indicate that the transaction sent is a Split Payments transaction, you must modify the payment type used, as follows:

|                         | **Credit Card**        | **Debit Card**        |
|-------------------------|------------------------|-----------------------|
| **Regular Transaction** | CreditCard             | DebitCard             |
| **Split Transaction**   | SplittedCreditCard     | SplittedDebitCard     |

Example:

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{cielo-ecommerce-api}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Buyer"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Installments":1,
     "SoftDescriptor":"Marketplace",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Test Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

**Response**

```json
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "Buyer"
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
            "Holder": "Test Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1209111409162",
        "ProofOfSale": "1409162",
        "AuthorizationCode": "359143",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-09 23:14:06",
        "Status": 1,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "4",
        "PaymentId": "56b0abb3-c3e8-4383-bffd-d99ef81b13a5",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA"
    }
}
```

By informing a payment type related to Split, the Cielo e-Commerce API automatically identifies the transaction as referring to the Split Payments and performs its transactional flow.

If the transaction sent is set for automatic capture, the node containing the split rules must also be sent. Otherwise, the transaction will be split between Mediator and Marketplace. Subsequently, Marketplace can send new split rules to the transaction through Split API, as long as it is within the allowed time period.

**Example 1)**  

Transaction of **BRL 100.00**, with automatic capture, without the split rules node.

**Mediator Rates**: 2% MDR + BRL 0.10 of Fixed fee.

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{cielo-ecommerce-api}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Buyer"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Capture":true,
     "Installments":1,
     "SoftDescriptor":"Marketplace",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Test Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

**Response**

```json
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "Buyer"
    },
    "Payment": {
        "SplitPayments": [
            {
                "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                "Amount": 10000,
                "Fares": {
                    "Mdr": 2,
                    "Fee": 0
                },
                "Splits": [
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 10000
                    }
                ]
            }
        ],
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Test Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1209112426777",
        "ProofOfSale": "20171209112426777",
        "AuthorizationCode": "650711",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-09 23:24:24",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-09 23:24:26",
        "Status": 2,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "728e4d86-1806-4a1d-89b1-8139ff0769aa",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA"
    }
}
```

In this case, Marketplace receives the amount of the transaction, deducting the MDR agreed with Mediator. As previously stated, the fixed fee agreed between Marketplace and Mediator is computed directly on the schedule of both parties.

![SplitSample002](https://braspag.github.io/images/braspag/split/ensplit002.png)

**Example 2)**  

Transaction of **BRL 100.00**, with the split rules node.

**Mediator Rates**: 2% MDR + BRL 0.10 of fixed fee.  
**Marketplace Rates to Subordinate 01**: 5% MDR (2% from MDR of Mediator included) + 0.30 of fixed fee.
**Marketplace Rates to Subordinate 02**: 4% MDR (2% from MDR of Mediator included) + 0.15 of fixed fee. 

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{cielo-ecommerce-api}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
  "MerchantOrderId":"2014111701",
  "Customer":{
      "Name":"Buyer"
   },
  "Payment":{
      "Type":"SplittedCreditCard",
      "Amount":10000,
      "Installments":1,
      "SoftDescriptor":"Marketplace",
      "Capture": true,
      "CreditCard":{
          "CardNumber":"4551870000000181",
          "Holder":"Test Holder",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Visa"
      },
      "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
              "Mdr": 5,
              "Fee": 30
            }
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 4000,
            "Fares": {
              "Mdr": 4,
              "Fee": 15
            }
        }
    ]
  }
}
```

**Response**

```json
{
    "MerchantOrderId": "2014111701",
    "Customer": {
        "Name": "Buyer"
    },
    "Payment": {
        "SplitPayments": [
            {
                "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                "Amount": 6000,
                "Fares": {
                    "Mdr": 5,
                    "Fee": 30
                },
                "Splits": [
                    {
                        "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                        "Amount": 5670
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 330
                    }
                ]
            },
            {
                "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                "Amount": 4000,
                "Fares": {
                    "Mdr": 4,
                    "Fee": 15
                },
                "Splits": [
                    {
                        "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                        "Amount": 3825
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 175
                    }
                ]
            }
        ],
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "455187******0181",
            "Holder": "Test Holder",
            "ExpirationDate": "12/2021",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1210031135775",
        "ProofOfSale": "20171210031135775",
        "AuthorizationCode": "605861",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-10 15:11:34",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-10 15:11:35",
        "Status": 2,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "ef7a7cf9-b66b-4772-b022-052bdcf3e9b0",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA"
    }
}
```

These are how the splits happened and how the schedules of each participant were set.

![SplitSample003](https://braspag.github.io/images/braspag/split/ensplit003.png)

### Split Models

Split Payments provides two models for dividing the transaction between the participants:

| Type                         | Description                                                                                                                        |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Transactional Split**      | The **Marketplace** sends the split rules on capture or on authorization (when capture is automatic).                              |
| **Post-transactional Split** | The **Marketplace** sends the split rules after the transaction capture.

> In Split Payments, the split is performed only for captured transactions. The split rules are only considered for authorizations with automatic capture or during the transaction capture. If informed at the time of authorization without automatic capture, the split rules will be ignored.

#### Transactional

At Transactional Split is required that the Marketplace sends an additional node at the Cielo E-Commerce API integration with the transaction division rules, according with previous examples.

```json
"SplitPayments":[
    {
        "SubordinateMerchantId" :"MID Subordinate 01",
        "Amount":10000,
        "Fares":{
            "Mdr":5,
            "Fee":0
        }
    }
]
```

| Property                             | Description                                                                                               | Type    | Size | Required |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|-------------|
| `SplitPayments.SubordinateMerchantId`   | **Subordinate** **MerchantId** (Identifier).                                                      | Guid    | 36      | Yes         |
| `SplitPayments.Amount`                  | **Subordinate**'s part of transaction, in cents (BRL).             | Integer | -       | Yes         |
| `SplitPayments.Fares.Mdr`               | **Marketplace MDR(%)** to be discounted from **Subordinate**'s part of transaction..     | Decimal | -       | No         |
| `SplitPayments.Fares.Fee`               | **Fixed Fee (BRL)**, in cents, to be discounted from **Subordinate**'s part of transaction. | Integer | -       | No         |

As response, Cielo E-Commerce API returns a node containing the transaction split rules used and the amounts to be paid to Marketplace and its Subordinates:

```json
"SplitPayments": [
    {
        "SubordinateMerchantId": "Subordinate 01 MID",
        "Amount": 10000,
        "Fares": {
            "Mdr": 5,
            "Fee": 0
        },
        "Splits": [                
            {
                "MerchantId": "Marketplace MID",
                "Amount": 500,
            },
            {
                "MerchantId": "Subordinate 01 MID",
                "Amount": 9500,
            }
        ]
    }
]
```

| Property                                  | Description                                                                                   | Type   | Size | Required |
|----------------------------------------------|---------------------------------------------------------------------------------------------|--------|---------|-------------|
| `SplitPayments.Splits.SubordinateMerchantId` | **Subordinate**'s or **Marketplace**'s **MerchantId** (Identifier).                       | Guid   | 36      | Yes         |
| `SplitPayments.Splits.Amount`                | Result of the calculation of the transaction part to be paid to the **Subordinate** or **Marketplace**, with fares already discounted (MDR and Fixed Fees) | Integer | -      | Yes         |

**Example 3)**  

Transaction with a total amount of **BRL 100.00** with split rules node and Marketplace as part of the sale.

**Cielo Fees**: 2% MDR + BRL 0.30 of Fixed Fee.  
**Marketplace Fees agreed with Subordinate 01**: 5% MDR (2% from MDR of Cielo included) + 0.30 of fixed fee.  
**Marketplace Fees agreed with Subordinate 02**: 4% MDR (2% from MDR of Cielo included) + 0.15 of fixed fee.  

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
  "MerchantOrderId":"2014111701",
  "Customer":{
      "Name":"Buyer"
   },
  "Payment":{
      "Type":"SplittedCreditCard",
      "Amount":10000,
      "Installments":1,
      "SoftDescriptor":"Marketplace",
      "Capture": true,
      "CreditCard":{
          "CardNumber":"4551870000000181",
          "Holder":"Test Holder",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Visa"
      },
      "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 4500,
            "Fares": {
              "Mdr": 5,
              "Fee": 30
            }
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 3000,
            "Fares": {
              "Mdr": 4,
              "Fee": 15
            }
        },
        {
            "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
            "Amount": 2500
        }
    ]
  }
}
```

**Response**

```json
{
    "MerchantOrderId": "2014111701",
    "Customer": {
        "Name": "Buyer"
    },
    "Payment": {
        "SplitPayments": [
            {
                "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                "Amount": 4500,
                "Fares": {
                    "Mdr": 5,
                    "Fee": 30
                },
                "Splits": [
                    {
                        "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                        "Amount": 4245
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 255
                    }
                ]
            },
            {
                "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                "Amount": 3000,
                "Fares": {
                    "Mdr": 4,
                    "Fee": 15
                },
                "Splits": [
                    {
                        "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                        "Amount": 2865
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 135
                    }
                ]
            },
            {
                "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                "Amount": 2500,
                "Fares": {
                    "Mdr": 2,
                    "Fee": 0
                },
                "Splits": [
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 2500
                    }
                ]
            }
        ],
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "455187******0181",
            "Holder": "Test Holder",
            "ExpirationDate": "12/2021",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1210035540764",
        "ProofOfSale": "20171210035540764",
        "AuthorizationCode": "859182",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-10 15:55:38",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-10 15:55:40",
        "Status": 2,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "34895364-e269-47ad-b779-7e122ed40a9a",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA"
    }
}
```

In the example, the Marketplace is a participant in the sale, hence its not necessary to inform the rates to be discounted from the Marketplace's part in the transaction. The Split Payments system identifies the Marketplace's part using its MerchantId (identifier) and perform the calculations utilizing the agreed rates and fees.

![SplitSample004](https://braspag.github.io/images/braspag/split/ensplit004.png)

#### Post-Transactional

In this model the Marketplace can send the transaction split rules after it is captured.

For transactions made with **Credit Card**, when the Marketplace has a standard payout scheme, the post-transactional split can be made within a period of **20 days** after the transaction. In the case the Marketplace owns a personalized scheme, the period must be negotiated between the Marketplace and Cielo.

For transactions made with **Debit Card**, if the Marketplace chooses, the post-transactional split can be made within a period of **1 day**.

> The period of post-transactional split can be changed by Cielo.

**Request**  

<aside class="request"><span class="method post">PUT</span> <span class="endpoint">{api-split}/api/transactions/{PaymentId}/split</span></aside>

```json
--header "Authorization: Bearer {access_token}"
[
    {
        "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
        "Amount": 6000,
        "Fares": {
            "Mdr": 5,
            "Fee": 30
        }
    },
    {
        "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
        "Amount":4000,
        "Fares":{
            "Mdr":4,
            "Fee":15
        }
    }
]
```

**Response**

```json
{
    "PaymentId": "c96bf94c-b213-44a7-9ea3-0ee2865dc57e",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            },
            "Splits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Amount": 5670
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 330
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 4000,
            "Fares": {
                "Mdr": 4,
                "Fee": 15
            },
            "Splits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Amount": 3825
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 175
                }
            ]
        }
    ]
}
```

Post-Transactional Split node at the contract, both in the request and in the response, is the same as the Transactional Split, previously presented.

> The Marketplace can split the transaction more than once, since it is in the allowed period.

### Query

To query a transaction, use the API Cielo E-Commerce query service.

**Request**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{api-cielo-ecommerce-consulta}/1/sales/{PaymentId}</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
    "MerchantOrderId": "2014111701",
    "IsSplitted": true,
    "Customer": {
        "Name": "Buyer",
        "Address": {}
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0181",
            "Holder": "Test Holder",
            "ExpirationDate": "12/2021",
            "Brand": "Visa"
        },
        "ProofOfSale": "20171210061821319",
        "Tid": "1210061821319",
        "AuthorizationCode": "379918",
        "PaymentId": "507821c5-7067-49ff-928f-a3eb1e256148",
        "Type": "SplittedCreditCard",
        "Amount": 10000,
        "ReceivedDate": "2017-12-10 18:18:18",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-10 18:18:21",
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "Status": 2,
        "SplitPayments": [
            {
                "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                "Amount": 6000,
                "Fares": {
                    "Mdr": 5,
                    "Fee": 30
                },
                "Splits": [
                    {
                        "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                        "Amount": 5670
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 330
                    }
                ]
            },
            {
                "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                "Amount": 4000,
                "Fares": {
                    "Mdr": 4,
                    "Fee": 15
                },
                "Splits": [
                    {
                        "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                        "Amount": 3825
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 175
                    }
                ]
            }
        ]
    }
}
```

### Capture

At capturing a Split Payments transaction, the transaction split rules must be informed. If the rules are not informed, it is assumed that all the transaction amount is from the Marketplace.

#### Total Capture

When performing a total capture of a transaction, the sum of all the amounts of each participant must equals the total amount of the transaction that was sent at the moment of authorization.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
    "SplitPayments":[
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            }
        },
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
}
```

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            },
            "Splits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Amount": 5670
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 330
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 4000,
            "Fares": {
                "Mdr": 4,
                "Fee": 15
            },
            "Splits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Amount": 3825
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 175
                }
            ]
        }
    ]
}
```

#### Partial Capture

When performing a partial capture of a transaction, the sum of the amount of each participant should equals the total amount captured.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture?amount={amount}</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

The following example captures partially the amount of BRL 80.00 of a transaction with the authorized value of BRL 100.00.

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture?amount=8000</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
    "SplitPayments":[
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 5000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            }
        },
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount":3000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
}
```

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 5000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            },
            "Splits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Amount": 4720
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 280
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 3000,
            "Fares": {
                "Mdr": 4,
                "Fee": 15
            },
            "Splits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Amount": 2865
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 135
                }
            ]
        }
    ]
}
```

As previously explained, if a full or partial capture is performed without informing the split rules, Split interprets that the entire amount is destined for the Marketplace itself.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture?amount=8000</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
            "Amount": 8000,
            "Fares": {
                "Mdr": 2,
                "Fee": 0
            },
            "Splits": [
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 8000
                }
            ]
        }
    ]
}
```

### Void

To void a Split Payments transaction, the Marketplace must inform, to a partial void, what is the amount to be voided to each transaction participant. To perform a total void, this information is not required, because, in this case, the total amount of each participant will be voided.

#### Total Void

When performing a total void of a transaction, the total amount of the transaction will be voided and, thereafter, each amount and commission of each participant.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/void</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "Status": 10,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "VoidSplitPayments": [
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount": 4000,
            "VoidedSplits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "VoidedAmount": 3825
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 175
                }
            ]
        },
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "VoidedAmount": 6000,
            "VoidedSplits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "VoidedAmount": 5670
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 330
                }
            ]
        }
    ]
}
```

#### Partial Void

In the partial void, the sum of the voided amounts for each subordinate shall be equal to the amount of the partial void.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/void?amount={amount}</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

In the following example the amount to be voided is BRL 25.00 of a transaction with a total amount of BRL 100.00.

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce/1/sales/{PaymentId}/void?amount=2500</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "VoidedAmount": 1500
        },
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount":1000
        }
     ]
}
```

| Property                                 | Description                                                                                               | Type    | Size | Required |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|-------------|
| `VoidSplitPayments.SubordinateMerchantId`   | **Subordinate MerchantId** (Identifier).                                                      | Guid    | 36      | Yes         |
| `VoidedAmount.Amount`                       | Total or part of the **Subordinate**'s amount to be voided, in cents.                      | Integer | -       | Yes         |

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "VoidSplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "VoidedAmount": 1500,
            "VoidedSplits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "VoidedAmount": 1417
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 83
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount": 1000,
            "VoidedSplits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "VoidedAmount": 956
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 44
                }
            ]
        }
    ]
}
```

It is not required to inform all Subordinates in the partial void. It is possible to inform only the subordinates that there if the intention to void the total amount ou just a partial amount. In the example before, the second subordinate could be informed, as shown below:

```json
{
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount":1000
        }
     ]
}
```

> By partially voiding the part of a subordinate, the Fixed Fee the Marketplace charges is voided proportionally.

## Financial Schedule

In the Split Payments, the Mediator is responsible for transferring the payout amounts (settlement) to each participant of a sale.

The Mediator will generate a financial schedule that can be consulted at any time by Marketplace and Subordinates.

The schedule is composed of Credit and Debit events generated according to the operations performed and the agreed payment scheme.

Credit events:

| Id | Event                          | Description                                                                                             |
|----|--------------------------------|---------------------------------------------------------------------------------------------------------|
| 1  | `Credit`                       | Credit of installments of a transaction.                                                                |
| 3  | `FeeCredit`                    | Fixed Rate credit agreed between Marketplace and Mediator.                                              |
| 5  | `RefundCredit`                 | Credit caused by a cancellation.                                                                        |
| 7  | `ChargebackCredit`             | Credit caused by a chargeback.                                                                          |
| 9  | `UndoChargebackCredit`         | Credit to undo a chargeback.                                                                            |
| 11 | `AntiFraudFeeCredit`           | Credit related to an anti-fraud transaction.                                                            |
| 13 | `AntiFraudFeeWithReviewCredit` | Credit related to an anti-fraud transaction with a manual review.                                       |
| 15 | `AdjustmentCredit`             | Credit as an adjustment.                                                                                |
| 17 | `ChargebackReversalCredit`     | Credit related to a chargeback reversion.                                                               |
| 19 | `AnticipationCredit`           | Credit related to anticipation.                                                                         |
| 20 | `AnticipationCommissionCredit` | Credit related to an anticipation commission.                                                           |

Debit events:

| Id | Event                         | Description                                                                                             |
|----|-------------------------------|---------------------------------------------------------------------------------------------------------|
| 2  | `Debit`                       | Debit of installments of a transaction.                                                                 |
| 4  | `FeeDebit`                    | Fixed Rate debit agreed between Marketplace and Mediator.                                               |
| 6  | `RefundDebit`                 | Debit caused by a cancellation.                                                                         |
| 8  | `ChargebackDebit`             | Debit caused by a chargeback.                                                                           |
| 10 | `UndoChargebackDebit`         | Debit to undo a chargeback.                                                                             |
| 12 | `AntiFraudFeeDebit`           | Debit related to an anti-fraud transaction.                                                             |
| 14 | `AntiFraudFeeWithReviewDebit` | Debit related to an anti-fraud transaction with a manual review.                                        |
| 16 | `AdjustmentDebit`             | Debit as an adjustment.                                                                                 |
| 18 | `ChargebackReversalDebit`     | Debit related to a chargeback reversion.                                                                |
| 22 | `AnticipationCommissionDebit` | Debit related to an anticipation commission.                                                            |

An event may be in one of the following statuses in the financial schedule:

* **Scheduled**
* **Pending**: Waiting for settlement confirmation.
* **Settled**
* **Error**: Settlement error at Financial Institution.
* **WaitingForAdjustementDebit**: Waiting for associated debit adjustment settlement.
* **Anticipated**: Anticipated event.

### Event Search

Split API provides an endpoint to discover the pending amount a merchant has to receive within a period.

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{split-api}/schedule-api/events?initialForecastedDate={initialDate}&finalForecastedDate={finalDate}&pageIndex={pageIndex}&pageSize={pageSize}&eventStatus={eventStatus}&merchantIds={merchantId}</span></aside>

| Parameter                  | Description                                                                                                | Type    | Format     | Required    | Default value         |
|----------------------------|----------------------------------------------------------------------------------------------------------- |---------|------------|-------------|-----------------------|
| `InitialForecastedDate`    | Filters by the forecasted initial payment date.                                                            | Date    | YYYY-MM-DD | No          | CurrentDate           |
| `FinalForecastedDate`      | Filters by the forecasted final payment date.                                                              | Date    | YYYY-MM-DD | No          | InitialForecastedDate |
| `InitialPaymentDate`       | Filters by the initial payment date.                                                                       | Date    | YYYY-MM-DD | No          | -                     |
| `FinalPaymentDate`         | Filters by the final payment date.                                                                         | Date    | YYYY-MM-DD | No          | InitialPaymentDate    |
| `PageIndex`                | Selected page.                                                                                             | Int     | -          | No          | 1                     |
| `PageSize`                 | Page size. Accepted values: 25, 50, 100.                                                                   | Int     | -          | No          | 25                    |
| `EventStatus`              | Filters by event status [Scheduled - Pending - Settled - Error - WaitingForAdjustmentDebit - Anticipated]. | String  | -          | No          | All statuses          |
| `IncludeAllSubordinates`   | Includes all subordinates in the response.                                                                 | Boolean | -          | No          | false                 | 
| `MerchantIds`              | Filters by Merchant IDs.                                                                                   | Guid    | -          | No          | -                     |

**Resquest**

**By forecasted payment date**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{split-api}/schedule-api/events?initialForecastedDate=2017-12-01&finalForecastedDate=2018-12-31&merchantIds=e4db3e1b-985f-4e33-80cf-a19d559f0f60&merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

**Por payment date**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{split-api}/schedule-api/events?initialPaymentDate=2018-08-22&finalPaymentDate=2018-08-31&merchantIds=e4db3e1b-985f-4e33-80cf-a19d559f0f60&merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"
```

**Response**

```json
{
    "PageCount": 1,
    "PageSize": 25,
    "PageIndex": 1,
    "Schedules": [
        {
            "Id": "b579fafb-8271-4a1d-a657-00e5fd9b9f83",
            "PaymentId": "069ee5ef-ce7a-43ce-a9af-022f652e115a",
            "MerchantId": "ea4db25a-f981-4849-87ff-026897e006c6",
            "ForecastedDate": "2018-08-22",
            "Installments": 10,
            "InstallmentAmount": 9255,
            "InstallmentNumber": 6,
            "Event": 1,
            "EventDescription": "Credit",
            "EventStatus": "Settled",
            "SourceId": "e3efe82f-1eee-4c28-bb9f-8054fcd4ca3f",
            "Mdr": 3.2,
            "Commission": false
        },
        {
            "Id": "2f110f0d-82c9-4a1f-8df5-08203348d160",
            "PaymentId": "069ee5ef-ce7a-43ce-a9af-022f652e115a",
            "MerchantId": "ea4db25a-f981-4849-87ff-026897e006c6",
            "ForecastedDate": "2018-08-22",
            "Installments": 10,
            "InstallmentAmount": 9255,
            "InstallmentNumber": 9,
            "Event": 1,
            "EventDescription": "Credit",
            "EventStatus": "Settled",
            "SourceId": "e3efe82f-1eee-4c28-bb9f-8054fcd4ca3f",
            "Mdr": 3.2,
            "Commission": false
        },
        {
            "Id": "01d9b78f-b287-4376-a5e4-12d91cde1938",
            "PaymentId": "069ee5ef-ce7a-43ce-a9af-022f652e115a",
            "MerchantId": "ea4db25a-f981-4849-87ff-026897e006c6",
            "ForecastedDate": "2018-08-22",
            "Installments": 10,
            "InstallmentAmount": 9255,
            "InstallmentNumber": 2,
            "Event": 1,
            "EventDescription": "Credit",
            "EventStatus": "Settled",
            "SourceId": "e3efe82f-1eee-4c28-bb9f-8054fcd4ca3f",
            "Mdr": 3.2,
            "Commission": false
        },
        {
            "Id": "e30760d7-01e2-4b2b-9a43-2b252fcfbd84",
            "PaymentId": "069ee5ef-ce7a-43ce-a9af-022f652e115a",
            "MerchantId": "ea4db25a-f981-4849-87ff-026897e006c6",
            "ForecastedDate": "2018-08-22",
            "Installments": 10,
            "InstallmentAmount": 9262,
            "InstallmentNumber": 10,
            "Event": 1,
            "EventDescription": "Credit",
            "EventStatus": "Settled",
            "SourceId": "e3efe82f-1eee-4c28-bb9f-8054fcd4ca3f",
            "Mdr": 3.2,
            "Commission": false
        },
        {
            "Id": "90ea1e11-568f-49ee-bc3f-7ab2a225a1e1",
            "PaymentId": "069ee5ef-ce7a-43ce-a9af-022f652e115a",
            "MerchantId": "ea4db25a-f981-4849-87ff-026897e006c6",
            "ForecastedDate": "2018-08-22",
            "Installments": 10,
            "InstallmentAmount": 9255,
            "InstallmentNumber": 1,
            "Event": 1,
            "EventDescription": "Credit",
            "EventStatus": "Settled",
            "SourceId": "e3efe82f-1eee-4c28-bb9f-8054fcd4ca3f",
            "Mdr": 3.2,
            "Commission": false
        }
    ]
}
```

| Property                          | Description                                                                                             | Type    | Size    |
|-----------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `Schedules[].Id`                  | Event ID on financial schedule.                                                                         | Guid    | 36      |
| `Schedules[].PaymentId`           | Transaction ID.                                                                                         | Guid    | 36      |
| `Schedules[].MerchantId`          | Merchant ID.                                                                                            | Guid    | 36      |
| `Schedules[].PaymentDate`         | Settlement date. This property is available only when the payment has finished (EventStatus = Settled). | Date    | -       |
| `Schedules[].ForecastedDate`      | Forecasted settlement date.                                                                             | Date    | -       |
| `Schedules[].Installments`        | Number of installments of a transaction.                                                                | Int     | -       |
| `Schedules[].InstallmentAmount`   | Value in cents of the installment to be settled.                                                        | Int     | -       |
| `Schedules[].InstallmentNumber`   | Installment to be settled.                                                                              | Int     | -       |
| `Schedules[].Event`               | Event ID.                                                                                               | Int     | -       |
| `Schedules[].EventDescription`    | Event description.                                                                                      | String  | -       |
| `Schedules[].EventStatus`         | Event status. [Scheduled - Pending - Settled - Error - WaitingForAdjustementDebit]                      | String  | -       |

### Fetching Transaction

Split Payments provides an interface to query the financial schedule of multiple or a specific transaction.

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{split-api}/schedule-api/transactions?initialCaptureDate={initialDate}&finalCaptureDate={finalDate}&pageIndex={pageIndex}&pageSize={pageSize}&eventStatus={eventStatus}&merchantIds={merchantId}</span></aside>

| Parameter                  | Description                                                                    | Type    | Format     | Required    | Default value         |
|----------------------------|--------------------------------------------------------------------------------|---------|------------|-------------|-----------------------|
| `InitialCaptureDate`       | Filters by the initial capture date.                                           | Date    | YYYY-MM-DD | No          | -                     |
| `FinalCaptureDate`         | Filters by the final capture date.                                             | Date    | YYYY-MM-DD | No          | InitialCaptureDate    |
| `PageIndex`                | Selected page.                                                                 | Int     | -          | No          | 1                     |
| `PageSize`                 | Page size. Accepted values: 25, 50, 100.                                       | Int     | -          | No          | 25                    |
| `EventStatus`              | Filters by event status [Scheduled - Pending - Settled - Error - Anticipated]. | String  | -          | No          | All statuses          |
| `IncludeAllSubordinates`   | Includes all subordinates in the response.                                     | Boolean | -          | No          | false                 | 
| `MerchantIds`              | Filters by Merchant IDs.                                                       | Guid    | -          | No          | -                     |

To search for multiple merchants, repeat the "merchantIds" parameter. If this parameter is no set, it will be considered the merchant used for authentication to the Split API.

**Request**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{split-api}/schedule-api/transactions?initialCaptureDate=2017-12-01&finalCaptureDate=2017-12-31&merchantIds=e4db3e1b-985f-4e33-80cf-a19d559f0f60&merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "PageCount": 1,
    "PageSize": 25,
    "PageIndex": 1,
    "Transactions": [
        {
            "PaymentId": "24afaaaf-f2a1-40a5-bb25-f914fa623c4c",
            "CapturedDate": "2017-12-01",
            "Schedules": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "ForecastedDate": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 24357,
                    "InstallmentNumber": 1,
                    "Event": "Credit",
                    "EventDescription": "Credit",
                    "EventStatus": "Scheduled"
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "ForecastedDate": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 1450,
                    "InstallmentNumber": 1,
                    "Event": "Credit",
                    "EventDescription": "Credit",
                    "EventStatus": "Scheduled"
                },
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "ForecastedDate": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 38480,
                    "InstallmentNumber": 1,
                    "Event": "Credit",
                    "EventDescription": "Credit",
                    "EventStatus": "Scheduled"
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "ForecastedDate": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 5,
                    "InstallmentNumber": 1,
                    "Event": "FeeDebit",
                    "EventDescription": "FeeDebit",
                    "EventStatus": "Scheduled"
                },
            ]
        }
    ]
}
```

| Property                                         | Description                                                                                             | Type    | Size    |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `Transactions[].PaymentId`                       | Transaction ID.                                                                                         | Guid    | 36      |
| `Transactions[].CaptureDate`                     | Capture date.                                                                                           | Date    | -       |
| `Transactions[].Schedules[].MerchantId`          | Merchant ID.                                                                                            | Guid    | 36      |
| `Transactions[].Schedules[].PaymentDate`         | Settlement date. This property is available only when the payment has finished (EventStatus = Settled). | Date    | -       |
| `Transactions[].Schedules[].ForecastedDate`      | Forecasted settlement date.                                                                             | Date    | -       |
| `Transactions[].Schedules[].Installments`        | Number of installments of a transaction.                                                                | Int     | -       |
| `Transactions[].Schedules[].InstallmentsAmount`  | Value in cents of the installment to be settled.                                                        | Int     | -       |
| `Transactions[].Schedules[].InstallmentNumber`   | Installment to be settled.                                                                              | Int     | -       |
| `Transactions[].Schedules[].Event`               | Event ID.                                                                                               | Int     | -       |
| `Transactions[].Schedules[].EventDescription`    | Event description.                                                                                      | String  | -       |
| `Transactions[].Schedules[].EventStatus`         | Event status. [Scheduled - Pending - Settled - Error - Anticipated]                                     | String  | -       |

To search for the schedule of a specific transaction, use the transaction ID in the request.

In this case, the MerchantIds and EventStatus filters can be used.

**Request**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{split-api}/schedule-api/transactions/{PaymentId}?merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

```shell
x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"
```

**Response**

```json
{
    "PageCount": 1,
    "PageSize": 25,
    "PageIndex": 1,
    "Transactions": [
        {
            "PaymentId": "cd2309d3-3fec-4816-aec7-bcb6d51a0988",
            "CapturedDate": "2017-12-11",
            "Schedules": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "ForecastedDate": "2018-01-11",
                    "Installments": 1,
                    "InstallmentAmount": 5790,
                    "InstallmentNumber": 1,
                    "Event": 1,
                    "EventDescription": "Credit",
                    "EventStatus": "Scheduled"
                },
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "ForecastedDate": "2018-01-11",
                    "Installments": 1,
                    "InstallmentAmount": 3790,
                    "InstallmentNumber": 1,
                    "Event": 1,
                    "EventDescription": "Credit",
                    "EventStatus": "Scheduled"
                }
            ]
        }
    ]
}
```

### Adjustments

Split Payments allows credit and debit adjustments on the Subordinates' schedules.

An adjustment will only be settled if the participant being debited has a positive balance on the date scheduled for performing the adjustment. Otherwise, the adjustment settlement will be postponed for both parties until the participant being debited has a positive balance to cover the adjustment amount.

**Example:** The Marketplace makes an adjustment to debit BRL 100.00 from Subordinate A, with a forecasted date of collection on 10/17/2018.

**Case 1)** Subordinate has positive balance on the forecasted date provided.

![SplitSampleadjustment001](https://braspag.github.io/images/braspag/split/adjustment001.png)

The amounts ​​up to 10/16/2018 were normally settled.

Since the subordinate had BRL 150.00 to receive on 10/17/2018, the adjustment was posted to the financial schedule on the stated date informed, and the Subordinate will receive BRL 50.00 due to the adjustment debit.

The participant to be credited will have the credit on the same date of the debit confirmation, that is, it will receive BRL 150.00 on 10/17/2018.

**Caso 2)** Subordinate does not have positive balance on the forecasted date provided.

![SplitSampleadjustment002](https://braspag.github.io/images/braspag/split/adjustment002.png)

The amounts ​​up to 10/16/2018 were normally settled.

The Subordinate had to receive only BRL 60.00 on 10/17/2018, and it does not cover the value of the adjustment to be debited from it.

In this case, subordinate payments will be withheld until it has enough balance to cover the adjustment, which occurs on 10/19/2018, where the accumulated retained amount is BRL 130.00. The subordinate will receive BRL 30.00 then.

The participant to be credited will have the credit on the same date of the debit confirmation, that is, it will receive BRL 150.00 on 10/19/2018.

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{split-api}/adjustment-api/adjustments/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
--header "Accept: application/json"
{
    "merchantIdToDebit": "EA4DB25A-F981-4849-87FF-026897E006C6",
    "merchantIdToCredit": "44F68284-27CF-43CB-9D14-1B1EE3F36838",
    "forecastedDate": "2018-09-17",
    "amount": 1000,
    "description": "Penalty for failure to comply with the estimated shipping date for order XYZ",
    "transactionId": "717A0BD0-3D92-43DB-9D1E-9B82DFAFA392"
}
```

| Property             | Description                                                       | Type    | Size | Required |
|----------------------|-------------------------------------------------------------------|---------|------|----------| 
| `merchantIdToDebit`  | Merchant where the amount will be debited.                        | Guid    | 36   | Yes      |
| `merchantIdToCredit` | Merchant where the amount will be credited.                       | Int     | -    | Yes      |
| `forecastedDate`     | Forecasted date to post the adjustment on the financial schedule. | String  | -    | Yes      |
| `amount`             | Adjustment amount, in cents.                                      | Int     | -    | Yes      |
| `description`        | Adjustment description.                                           | String  | 500  | Yes      |
| `transactionId`      | Transaction ID where the adjustment is being posted.              | Guid    | -    | No       |

<aside class="warning">The merchants provided on properties `merchantIdToDebit` `merchantIdToCredit` must be participants of the transaction.</aside>

**Response**

```json
-- 201 - Created
{
    "id": "68465ddd-451a-4194-abca-be1ed71fb2ea",
    "merchantIdToDebit": "EA4DB25A-F981-4849-87FF-026897E006C6",
    "merchantIdToCredit": "44F68284-27CF-43CB-9D14-1B1EE3F36838",
    "forecastedDate": "2018-09-19",
    "amount": 1000,
    "description": "Penalty for failure to comply with the estimated shipping date for order XYZ",
    "transactionId": "717A0BD0-3D92-43DB-9D1E-9B82DFAFA392",
    "status": "Created"
}
```

| Property | Description                                                      | Type    | Size    | Required    |
|----------|------------------------------------------------------------------|---------|---------|-------------| 
| `id`     | Adjustment ID                                                    | Guid    | 36      | -           |
| `status` | Adjustment status [Created - Scheduled - Processed - Canceled ]. | String  | -       | -           |

## Chargeback

In Split Payments, the Marketplace can choose whether it will assume the chargeback or pass it on to its Subordinates, as long as it has previously agreed between the participants.

If the Marketplace chooses to pass it on to the Subordinates, the Total Chargeback is automatically posted on their schedule. Otherwise, it will be posted on the Marketplace schedule,  like a partial chargeback.

The Split API provides an endpoint where the Marketplace can define how to split the chargeback amount among subordinates, case it is a Partial Chargeback.

In the example below there was a Partial Chargeback of BRL 60.00 on a transaction with a captured amount of BRL 100.00.

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{split-api}/api/chargebacks/{ChargebackId}/splits</span></aside>

```json
[
  {
    "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
    "ChargebackAmount": 4000
  },
  {
    "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
    "ChargebackAmount": 2000
  }
]

```

| Property                | Description                                                         | Type    | Size    |
|-------------------------|---------------------------------------------------------------------|---------|---------|
| `SubordinateMerchantId` | Subordinate ID.                                                     | Guid    | 36      |
| `ChargebackAmount`      | Chargeback amount that must be passed to the Subordinate, in cents. | Int | -       |

**Response**

```json
{
    "ChargebackSplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "ChargebackAmount": 4000,
            "ChargebackSplits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "ChargebackAmount": 3780
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "ChargebackAmount": 220
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "ChargebackAmount": 2000,
            "ChargebackSplits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "ChargebackAmount": 1912
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "ChargebackAmount": 88
                }
            ]
        }
    ]
}
```

> The Marketplace has one day, from the date of the chargeback confirmation, to inform how it wants to split the chargeback amounts to the subordinates.

| Property                                   | Description                                                   | Type    | Size    |
|--------------------------------------------|---------------------------------------------------------------|---------|---------|
| `ChargebackSplitPayments.ChargebackSplits` | List containing the split of chargeback for each participant. | Guid    | 36      |

## Notification

To be notified about the status of a transaction, use the Cielo E-Commerce API [notification service](https://developercielo.github.io/manual/cielo-ecommerce#post-de-notificação).