---
layout: manual
title: Intagration Manual
description: Integração técnica via API
search: true
translated: true
categories: manual
Order: 1
tags:
  - Checkout Cielo
language_tabs:
  json: JSON
---

# About Checkout Cielo.

**Checkout Cielo** is a solution that aggregates multiple payment processing services in which the consumer is directed to a secure online payment page from Cielo.
The Cielo payments page provides a high level of confidence, following PCI security standards.

The great advantage of Checkout Cielo is the range of services aggregated in a secure transactional screen with only one technical integration via the API REST.

Checkout has the following Features:

|Feature|Description|
|---|---|
|**Transactional screen**|Checkout Cielo has its own transactional screen, with an optimized layout, shortening the steps to pay for your transactions. |
|**Buyer Registration**|The Checkout Cielo has the ability to save cards and payment data from buyers, allowing for future purchases that the data already are filled at the transactional screen|
|**1-click buy**|With the registered buyer, Checkout allows the purchase to be completed quickly, using the buyer's preferred payment and address data|
|**Recurrence**|Checkout Cielo has the Scheduled Recurrence available in the API Cielo Ecommerce. <br> The merchant just needs to define that a transaction must be repeated, that Checkout will run it again within the defined range|
|**Anti fraud**|Checkout already has an integration with CyberSource Anti Fraud, enabling analysis of credit transactions without additional integration|
|**Means of payment**|Checkout Cielo has a wide range of payment means: <br> **Credit cards** <br> **Debit card**<br>**Online Debit**<br>**Bradesco e Banco do Brasil Bank slip**|
|**Simplified Backoffice**|Checkout Cielo Backoffice has a simplified and dynamic layout that allows a fast and comfortable browsing so that the Merchant can follow the sales without difficulty|
|**Integration with Button and QR Code**|Without technical integration or programming, Checkout provides an integration that makes it possible to create an order generator link with only onde product registration inside the Backoffice Checkout.|
|**Integration with E-commerce Platforms**|. It has integration with Terra Virtual Store and other platforms, already present in the main e-commerce platforms of the Brazilian market|
|**Transactional reports**|Within Backoffice, it is possible to generate transactional reports that make it easy to manage your sales: <br> **Recurrence Report** <br> **Buyer Report**<br>**Sales statement**<br>**Sales report**|

Checkout Cielo is a functionality indicated for:

* **Websites with Shopping carts**: when there is a "shopping cart" to be sent, i.e. in case the consumer browse the website and choose 1 or more products in order to finalize the purchase.
* **Sales via Social networks**: With the ability to generate a link or QR Code to take the buyer to the transactional screen, Checkout is indicated to make sales via social networks in a simplified way, without the need of technical integration.

## Checkout Cielo Means of payment

The current version of Checkout Cielo supports the following payment means:

**Credit card**

|Issuer|Credit card cash payment|Installment credit Store|Debit|Voucher|
|---|---|---|---|---|
|Visa|Yes|Yes|Yes|No|
|MasterCard|Yes|Yes|Yes|No|
|American Express|Yes|Yes|No|No|
|Elo|Yes|Yes|No|No|
|Diners Club|Yes|Yes|No|No|
|Discover|Yes|No|No|No|
|JCB|Yes|Yes|No|No|
|Aura|Yes|Yes|No|No|

**NOTE**: Checkout Cielo maximum limit of installments is 12X.

**Debit card**

|Issuer|Bank|
|---|---|
|Visa|Bradesco<br>Banco do Brasil<br>HSBC<br>Santander<br>Itaú<br>BRB<br>Safra<br>Banco da Amazônia<br>Sicredi<br>Banco do Espirito Santo<br>Banco do Nordeste<br>Mercantil|
|Mastercard|Banco do Brasil<br>Santander<br>Itaú<br>BRB<br>Sicredi<br>Bancoob<br>CitiBank|

**Bank slip**

|Bank|Type|
|---|---|
|Bradesco|Not registered|
|Bradesco|SPS registered|
|Banco do Brasil|Not registered|

**Online Debit**

|Bank|
|---|
|Bradesco|
|Banco do Brasil|

## Prerequisites for Integration.

Checkout Cielo has a list of basic requirements to make the integration process successful.
Below we list points that must be ready before integration:

1. The store register must be **active** with Cielo, having at least one type of **payment PLAN** linked to the account.

2. A suitable **timeout** must be defined in the HTTP requests with Cielo; we recommend 30 seconds.

3. The Root certificate of the certifying entity (CA) of our Web Service must be registered in the Truststore to be used. Because our certifier is widely accepted in the market, it is likely that it is already registered in the Truststore of the operating system itself. See the section [Extended Validation Certificate](#extended-validation-certificate) for more information.

4. The Checkout works efficiently only in supported browsers:

|Browser|Version|
|---|---|
|Chrome|V40.0 or later|
|FireFox|V34.0.5 or later|
|Internet Explorer|10 or higher|
|Safari (MAC/iOS)|7 or later|
|Opera|V26 or later|

**NOTE**: For buyers and merchants to get the best experience from Checkout Cielo, we recommend downloading the latest version of the browsers mentioned above.

Check out this [**web site**](http://browsehappy.com/) to view the latest versions of browsers.

**Note:** old browsers may deny access to Checkout Cielo and some features will not work as intended. Newer browsers also offer better encryption and privacy features.

If a feature still does not work as expected:

* Try using another browser as a temporary solution for the problem.
* If you use Internet Explorer, try disabling compatibility mode.

If you have tried these solutions but still experience problems, please contact us at [Cielo Support](#cielo-support) and provide the following information:

* A general explanation of the problem.
* The browser and version being used.
* The operating system and version used on the computer.
* A screenshot of the problem.

# Extended Validation Certificate

## What is SSL Certificate?

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

Normally, the browser automatically updates the Certificate. If it does not and the client contacts, the following steps must be informed:

#### Step 1:

Save the three files below into a new folder, or into a folder that can be easily remembered, as it will be used later:

* [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
* [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
* [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

#### Step 2:

In “Internet Explorer”, click on “Tools” menu and go to “Internet Options”:

![Install IE]({{ site.baseurl }}/images/certificado-instalar-ie-1.jpg)

In “Firefox”, click on “Open Menu” menu and go to “Advanced” and “Options”:

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-1.jpg)

In “Chrome”, click on “Customize and Control Google Chrome” and go to “Settings” and “Show advanced settings ... “Change Proxy Settings and “Content” and Certificates:

![Install GC]({{ site.baseurl }}/images/certificado-instalar-gc-1.jpg)

#### Step 3:

In Internet Explorer, under “Certificates”, click on “Import”.

![Install IE]({{ site.baseurl }}/images/certificado-instalar-ie-2.jpg)

In Firefox, click on “View Certificates”, click on “Import”

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-2.jpg)

In Chrome, click on “Manage Certificates”, click on “Import”

![Install GC]({{ site.baseurl }}/images/certificado-instalar-gc-2.jpg)

#### Step 4:

In Internet Explorer and Chrome “Certificate Import Wizard”, click on “Next”.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-3.jpg)

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-4.jpg)

In Firefox “Servers Tab”, click on “Import”

![Install FF]({{ site.baseurl }}/images/certificado-instalar-ff-3.jpg)

#### Step 5:

In Chrome and Internet Explorer “Certificate Import Wizard”, click on “Search”, look for the folder where the files are and select the file “cieloecommerce.cielo.com.br.crt, click on “Open” and then “Next”.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-5.jpg)

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-6.jpg)

#### Step 6:

Select the desired option: add the Certificate in a default folder or search for the folder of your choice.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-7.jpg)

#### Step 7:

Click on “Finish”.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-8.jpg)

#### Step 8:

Click on “Ok” to complete the import.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">In Firefox there is no Successfull Import message, it only completes the import.</aside>

The Certificate may be viewed in the default tab “Other People” or at the one chosen by the customer.

![Install IE and GC]({{ site.baseurl }}/images/certificado-instalar-ie-gc-10.jpg)

#### Step 9:

Repeat the same procedure for the 3 sent files.

# Integrating Checkout Cielo

This documentation describes all the features of the API Checkout Cielo integration, technical parameters and especially the examples of codes to facilitate their development.

There are two ways to achieve integration:

|Type|Description|
|---|---|
|`API`|An Integration via API allows the merchant to send the web site **"Shopping cart"** with all the data that he wants to display on the transactional screen. <br> In this type of integration the merchant has more control over how the order will be generated.|
|`Botão / QR Code / Link`|Within the Checkout Cielo Backoffice, it is possible to register a product or group of products that will generate a Link capable of creating multiple payment screens. This template is used for payments by social networks, promotional campaigns or Sales via QR Code. In this category the merchant has less control over how the orders will be presented or generated on the transactional screen|

## Integration flow

During the integration with Checkout Cielo, a sequence of information exchange and redirects will be executed so that a transaction is created and executed.
See the flow below:

**Checkout Cielo integration flow** - Sequential diagram
![Checkout Cielo integration flow]({{ site.baseurl }}/images/Checkout/fluxobasico.svg)

**Checkout Cielo integration flow** - Flowchart
![Checkout Cielo integration flow]({{ site.baseurl }}/images/Checkout/fluxocheckoutbasico.png)

After the card carrier (custumer) select their purchases and hit the "Buy" button of a shop already integrated with Checkout Cielo, the flow in this order:

1. The Cielo API returns the **CheckoutURL**, which is the URL of the transactional screen assembled based on the data sent by the Merchant/Button.
2. The store redirects the customer to the URL returned by Cielo. The screen shown is part of the **Cielo safe payment environment**.
3. The carrier chooses: Means of payment , freight type and delivery address on the transactional screen
4. Checkout Cielo redirects the customer to the **Return URL** chosen by the store, configured in Backoffice Checkout Cielo or sent by the integration via API.
5. If the store has a **notification URL**, it will be notified about the status of the transaction.
5. The store notifies the customer that the process has been completed and that he will receive more information about the purchase and payment by e-mail.
7. The store processes the purchase order using the notification POST data and, if the transaction is authorized, releases the order.

**NOTE:** The Checkout Cielo does not notify buyers about purchasing status, only the merchant does. This is because it allows the merchant to decide when and how to inform their customers about the delivery deadline and shipping process

## Checkout Cielo test mode

Checkout Cielo test mode is a tool that allows to test the integration of your web site with the platform. With the test mode, you can perform transactions as you evolve with integration, and you can simulate scenarios to test different means of payment.

### Activating test mode.

The test mode can be activated in the  **Settings** tab, where there is a checkbox that, when checked, enable the Checkout Cielo test mode. The test mode will only start when the selection is saved.

![Activating test mode]({{ site.baseurl }}/images/Checkout/tm01.png)

When the option is saved, a red stripe appears at the top of the screen. It will be displayed on all the screens of the Backoffice Cielo Checkout and on the Checkout Cielo transaction screen.

This stripe indicates that your Checkout Cielo store is now operating in a test environment, i.e. any transaction performed in that mode will be considered as a test.

|Backoffice|Transacional|
|---|---|
|![Red stripe - Backoffice]({{ site.baseurl }}/images/Checkout/tmbackoffice.png)|![Red stripe - Transacional]({{ site.baseurl }}/images/Checkout/tmtransacional.png)|

### How to transact in Test Mode.

Performing transactions in test mode occurs normally. Transaction information is sent via POST or API, using the parameters as described in the [Integration by API](#integration-by-api) topic, however, the payment means to be used are simulated media.

To perform test transactions with different payment means, follow these rules:

**A - Transactions with Credit cards:**

To test credit cards it is necessary for two important data to be defined, the authorization status of the card and the return of the fraud analysis.

**Credit Card Authorization Status**

|Transaction Status|Cards for conducting tests|Return Code|Return message|
|---|---|---|---|
|Authorized|0000.0000.0000.0001 / 0000.0000.0000.0004|4|Operation performed successfully|
|Not Authorized|0000.0000.0000.0002|2|Not Authorized|
|Not Authorized|0000.0000.0000.0007|77|Canceled Card|
|Not Authorized|0000.0000.0000.0008|70|Problems with Credit Card|
|Not Authorized|0000.0000.0000.0005|78|Locked Card|
|Not Authorized|0000.0000.0000.0003|57|Expired Card|
|Not Authorized|0000.0000.0000.0006|99|Time Out|

**Example:** 540443424293010 **7** = **Authorized**

**B - Bank slip**

Just carry out the purchase process normally with no change in procedure.
The bank slip generated in test mode will always be a simulated bank slip.

**C - Online debit**

It is necessary to inform the status of online Debit transaction to be returned the desired status. This process occurs as in the credit card anti-fraud described above, with the change of the name of the buyer.

**Debit Status**

|Customer last name|Status|
|---|---|
|Paid|Paid|
|Any name.|Not authorized|

* **Example:** Unauthorized Status.
* **Customer name:** Maria Pereira

**D - Test Transactions**

All transactions performed in test mode will be displayed as normal transactions in the Checkout Cielo Orders tab, however, they will be marked as test transactions and will not be accounted for in conjunction with transactions performed outside of the test environment.

![Test Transactions]({{ site.baseurl }}/images/checkout-cielo-modo-teste-transacoes-de-teste.png)

These transactions will have the test symbol differentiating them from their other transactions. They can be captured or canceled using the same procedures of the actual transactions.

![Test Transactions]({{ site.baseurl }}/images/checkout-cielo-modo-teste-transacoes-de-teste-cancelamento.png)

<aside class="notice">It is very important that when releasing your store to perfomr sales to your customers that **it is not in test mode**. Transactions performed in this environment may be finished normally, but **they will not be discounted from the customer's card** and they can not be “transferred” to the standard sales environment.</aside>

## SDKs and POSTMAN

Checkout Cielo has a unique test POSTMAN collection with all the parameters and options described in this manual.
Just access our [Tutorial](https://developercielo.github.io/Tutorial//Postman) for information on using the tool.

In postman it is possible to create examples of its integration in:

* PHP
* RUBY
* C#
* JAVA
* PYTHON
* SHELL

## Integration by API

This type of integration must be used whenever there is a “shopping cart” to be sent, i.e. in case the customer browses the web site and choose 1 or more products to add to a cart and then finalize the sale.

If you do not have a shopping cart implemented, see the Checkout Cielo **Integration via Button** section.

Below, it is demonstrated how the purchase flow occurs in the integration via API:

![Integration Via API]({{site.baseurl_root}}images/Checkout/intapi.png)

### Creating the Cart

In integration via API, the transactional screen is "assembled" with bases in sent data that form a **Shopping cart**.
These data are separated into the following "main nodes":

|Node|Description|
|---|---|
|`Cart`|Contains data of the products to be sold.|
|`Shipping`|Contains data of the type of freight to be charged. Is influenced by the `Cart` node|
|`Payment`|Contains information that influences the amount charged. **Does not contain information about payment means**|
|`Customer`|Has buyer's data. Not required in the integration, but required on the payments screen. We suggest it to be sent to expedite the purchase process|
|`Options`|Controls Checkout optional features. Node not required|

After sending cart data, Checkout will send a Response containing one **LINK to the payment screen**

**IMPORTANT**: A call to the API Checkout **DOES NOT CREATE A TRANSACTION**. The returned Link is just a "preorder" indicating that a transactional screen is ready to be used. The Transaction is created only when the buyer clicks on "FINALIZE"

### Request

Endpoint is the URL to where requests with the cart data will be sent. All requests must be sent using the HTTP POST method, for the endpoint:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/orders</span></aside>

**Example of a requisition**

```json
{  
   "OrderNumber":"Pedido01",
   "SoftDescriptor":"Exemplo",
   "Cart":{  
      "Discount":{  
         "Type":"Percent",
         "Value":0
      },
      "Items":[  
         {  
            "Name":"Produto01",
            "Description":"ProdutoExemplo01",
            "UnitPrice":100,
            "Quantity":1,
            "Type":"Asset",
            "Sku":"ABC001",
            "Weight":500
         },
        ]
   },
   "Shipping":{  
      "SourceZipCode":"20020080",
      "TargetZipCode":"21911130",
      "Type":"FixedAmount",
      "Services":[  
         {  
            "Name":"Motoboy",
            "Price":1,
            "Deadline":15,
            "Carrier":null
         },
         {  
            "Name":"UPS Express",
            "Price":1,
            "Deadline":2,
            "Carrier":null
         }
      ],
      "Address":{  
         "Street":"Rua Cambui",
         "Number":"92",
         "Complement":"Apto 201",
         "District":"Freguesia",
         "City":"Rio de Janeiro",
         "State":"RJ"
      }
   },
   "Payment":{  
      "BoletoDiscount":15,
      "DebitDiscount":10,
      "Installments":null,
      "MaxNumberOfInstallments": null
   },
   "Customer":{  
      "Identity":"84261300206",
      "FullName":"Test de Test",
      "Email":"test@cielo.com.br",
      "Phone":"21987654321"
   },
   "Options":{  
     "AntifraudEnabled":true,
     "ReturnUrl": "http://www.cielo.com.br"
   },
   "Settings":null
}
```

**Header**

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`MerchantId`|Guid|Yes|36|Unique store identifier. **Format:** 00000000-0000-0000-0000-000000000000|
|`Content-type`|Alphanumeric|Yes|n/a|Type of message content to be sent. **Use:** "application/json"|

**Header and Authentication** - All requests sent to Cielo must be authenticated by the store. Authentication consists of sending `MerchantID`, which is the unique store identifier provided by Cielo after store affiliation. Store authentication should be done by sending the `MerchandId` HTTP header field, as shown below and beside:

**Body - Detailed**

|Field|Type|Required|Size|Description|Conditional|
|---|---|---|---|---|---|
|`OrderNumber`|Alphanumeric|Optional|64|Store order number.||
|`SoftDescriptor`|Alphanumeric|Optional|13|Text displayed on buyer's invoice. No special characters or spaces. e.g.: `Loja_ABC_1234`||
|`Cart.Discount.Type`|Alphanumeric|Conditional|255|Discount type to be applied: `Amount` or `Percent`.|Required in case of Cart.Discount.Value is greater than or equal to zero.|
|`Cart.Discount.Value`|Numeric|Condicional|18|Discount amount to be applied: Value or Percentage|Required in case of Cart.Discount.Type is `Amount` or `Percent`.|
|`Cart.Items.Name`|Alphanumeric|Yes|128|Item name in cart.||
|`Cart.Items.Description`|Alphanumeric|Optional|256|Item description in cart.||
|`Cart.Items.UnitPrice`|Numeric|Yes|18|Unit price of the product in cents. e.g.: R$ 1,00 = 100||
|`Cart.Items.Quantity`|Numeric|Yes|9|Item quantity in cart.||
|`Cart.Items.Type`|Alphanumeric|Yes|255|Item type in cart: <br>`Asset`<br>`Digital`<br>`Service`<br>`Payment`||
|`Cart.Items.Sku`|Alphanumeric|Optional|32|Item Sku in cart.||
|`Cart.Items.Weight`|Numeric|Conditional|9|Weight in grams of item in cart.|Required in case of Shipping.Type is "Post office".|
|`Payment.BoletoDiscount`|Numeric|Conditional|3|Discount, in percentage, for payments to be performed with bank slip.||
|`Payment.DebitDiscount`|Numeric|Conditional|3|Discount, in percentage, for payments to be perfomed with online debit.||
|`FirstInstallmentDiscount`|Numeric|Conditional|3|Discount, in percentage, for payments to be performed with credit card cash payment.||
|`MaxNumberOfInstallments`|Numeric|Conditional|2|Sets maximum value of installments displayed in transactional, ignoring Backoffice setup||
|`Customer.Identity`|Numeric|Conditional|14|buyer's CPF or CNPJ.|Not required in API, but mandatory in the transactional screen|
|`Customer.FullName`|Alphanumeric|Conditional|288|Buyer full name.|Not required in API, but mandatory in the transactional screen|
|`Customer.Email`|Alphanumeric|Conditional|64|Buyer's e-mail.|Not required in API, but mandatory in the transactional screen|
|`Customer.Phone`|Numeric|Conditional|11|Buyer's phone number.|Not required in API, but mandatory in the transactional screen|
|`Options.AntifraudEnabled`|Boolean|Conditional|n/a|Enable or not the fraud analysis for the order: true or false.||
|`Options.ReturnUrl`|Strin|Conditional|255|Sets to which url the buyer will be sent after completing the purchase.|A fixed URL can be registered in Backoffice Checkout|

### Responses

Due to its sale flow being divided into two stages, the first being the creation of the transactional screen and the second being the finalization of the payment; The Checkout has two replies to a transaction:

* **Response - Transactional screen** - It is the Response returned with data to send the buyer to the transactional screen
* **Response - Transaction Finished** - Contains data on the result of the transaction, after the buyer clicks "Finish" on the transaction screen. **It is returned only via Notification**

**Transaction Result/Status:** To get the transaction status return, it is necessary to set a NOTIFICATION URL. See the notification session for more information..

**Response - Transactional screen**

There are only two response options in API integration: Success / Error

**Success**:
In case of success, the response will be the content of the Request plus the Link that directs the transactional screen

> **SUCCESS**

```Json
{
    "Settings": {
        "CheckoutUrl": "https://cieloecommerce.cielo.com.br/transacional/order/index?id=123",
        "Profile": "CheckoutCielo",
        "Version": 1
    }
}
```

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`CheckoutUrl`|String|Yes|255|Transactional screen URL. The Buyer **must be directed to this environment to finalize the transaction**|
|`Profile`|String|Yes|16|Merchant profile: “CheckoutCielo” fixed.|
|`Version`|String|Yes|1|Order creation service version (version: 1).|

**Error**:
In case of error, the message below will be returned.

> **ERROR**

```json
{
    "message":"An error has occurred."
}
```

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`Message`|String|Yes|254|Error descriptive message|

**Important** - Checkout Cielo has no numbered errors, just a generic message. See the section "Identifying Integration Errors" for more information.

### Additional Features

In the following items, the behavior of some of the API integration features will be explained. These features have rules specific to use and are not available for integration via Button.

* **Types of "Discount"**
* **Types of "Freight"**

#### Types of "Discount"

Checkout Cielo allows the merchant to apply specific discounts for both cart and payment means.
The discounts available at Checkout Cielo are:

|Discount|Application|Description|
|---|---|---|
|`Cart`|API|When sent, it applies the discount on the entire cart, regardless of the means of payment|
|`Bank slip`|API and Backoffice|When sent, the discount is applied only if the Bank slip is the chosen payment means|
|`Online Debit`|API and Backoffice|When sent, the discount is applied only if the Online debit is the chosen payment means|
|`Cash payment`|API|When sent, the discount is applied when cash payment on Credit Card is the chosen payment means|

<aside class="notice">discounts can be sent in the API or defined in the Backoffice. If a Discount Value is sent in the API, this value will be considered, even if the Backoffice has another registered value </aside>

**Cart**

To send a Discount on the `Cart` just send the node below inside the `Cart` node

```json
      {
       "Discount": {  
         "Type":"Percent",
         "Value":0
       },
      }
```

|Field|Type|Required|Size|Description|Conditional|
|---|---|---|---|---|---|
|`Cart.Discount.Type`|Alphanumeric|Conditional|255|Discount type to be applied: `Amount` or `Percent`.|Required in case of Cart.Discount.Value is greater than or equal to zero.|
|`Cart.Discount.Value`|Numeric|Conditional|18|Discount amount to be applied: Value or Percentage|Required in case of Cart.Discount.Type is `Amount` or `Percent`.|

Below, how the effect of the discount is displayed in the Cart:

|Percentage|Value|
|---|---|
|![Percentage]({{ site.baseurl }}/images/Checkout/checkout-discount-percent.png)|![Value]({{ site.baseurl }}/images/Checkout/checkout-discount-amount.png)|

**Bank slip & Online Debit**

To send a Discount on the `Bank slip` and `Online debit` just send inside the Payment node the fields below:

```json
      {
      "Payment": {  
        "BoletoDiscount":15,
        "DebitDiscount":10,
        "FirstInstallmentDiscount":90
        },
      }
```

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`Payment.BoletoDiscount`|Numeric|Conditional|3|Discount, in percentage, for payments to be performed with bank slip.|
|`Payment.DebitDiscount`|Numeric|Conditional|3|Discount, in percentage, for payments to be perfomed with online debit.|
|`Payment.FirstInstallmentDiscount`|Numeric|Conditional|3|Discount, in percent, for cash payments on credit card|

Below, how the effect of the discount is displayed in the Cart:

|Transactional screen|
|---|
|![Means of payment]({{ site.baseurl }}/images/Checkout/checkout-discount-mp.png)|

#### Types of "Freight"

Checkout Cielo has different types of freight.

|Field|Description|
|---|---|
|`FixedAmount`|Fixed value sent by the merchant. Used if the Merchant has a delivery method of his own|
|`Free`|Do not perform freight calculation and displays on the transactional screen "Free Shipping"|
|`WithoutShippingPickUp`|Considered "Withdrawal at the store"|
|`WithoutShipping`|No freight charge (applicable for digital products and services).|
|`Post office`|Uses the post office API to perform the cost calculation. The value of the calculation will depend on the used contract (Chosen in the Backoffice of the checkout) and on the type of integration for calculation: **Shipping with Volume** or **Shipping without Volume**|

 Below, how each option is demonstrated on the transactional screen

|Type of freight|Transactional|
|---|---|
|`FixedAmount`|![FixedAmount]({{ site.baseurl }}/images/Checkout/fixedamount.png)|
|`Free`|![Free]({{ site.baseurl }}/images/Checkout/free.png)|
|`WithoutShippingPickUp`|![WithoutShippingPickUp]({{ site.baseurl }}/images/Checkout/withoutshippingpickup.png)|
|`WithoutShipping`|![WithoutShipping]({{ site.baseurl }}/images/Checkout/withoutshippingpickup.png)|
|`Post office`|![Post office]({{ site.baseurl }}/images/Checkout/correios.png)|

 **NOTE:** The options for multiple freights in the category `Post office` should be selected within the Backoffice Cielo.        

The nodes that compound the freight information below:

* **Shipping** - Base node. It is equired on integration via API. It defines the types of freight to be used

|Field|Type|Required|Size|Description|Conditional|
|---|---|---|---|---|---|
|`Shipping.Type`|Alphanumeric|Yes|255|Freight type: <br>`Post office`<br>`FixedAmount`<br>`Free`<br>`WithoutShippingPickUp`<br>`WithoutShipping`||
|`Shipping.SourceZipCode`|Numeric|Conditional|8|Shopping cart origin zip code.|Obrigatório caso Shipping.Type for "Correios".|
|`Shipping.TargetZipCode`|Numeric|Optional|8|Buyer's delivery address zip code.||

**Shipping.Address** - Delivery address information. **Not required in API contract, but mandatory on transactional screen**. We suggest this data to be sent, if it has already been collected within the store environment.

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`Shipping.Address.Street`|Alphanumeric|Yes|256|Street, avenue, lane, etc., from buyer's delivery address.|
|`Shipping.Address.Number`|Alphanumeric|Yes|8|Buyer's delivery address number.|
|`Shipping.Address.Complement`|Alphanumeric|Optional|14|Buyer's delivery address complement.|
|`Shipping.Address.District`|Alphanumeric|Yes|64|Buyer's delivery address neighborhood.|
|`Shipping.Address.City`|Alphanumeric|Yes|64|Buyer's delivery address city.|
|`Shipping.Address.State`|Alphanumeric|Yes|2|Buyer's delivery address state (UF).|

**Shipping.Services**

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
`Shipping.Services.Name`|Alphanumeric|Yes|128|Freight service name.|
`Shipping.Services.Price`|Numeric|Yes|18|Price of freight service in cents. e.g.: R$ 1,00 = 100.|
`Shipping.Services.Deadline`|Numeric|Conditional|9|Delivery time (in days).|

The Post Office Freight can be calculated in 2 ways:

* **Shipping with Volume** - Uses the post office API, but requires the store to send the dimensions of the package to be shipped with the goods
* **Freight without Volume** - Uses the Post Office API, but only considers cart weight as the basis for calculating the delivery.

To use volumetric freight, just send the `Shipping.Measures` node, following the integration rules via API REST.

**Shipping.Measures**

|Field|Type|Required|Size|Description|Conditional|
|---|---|---|---|---|---|
|`Shipping.Package`|Alphanumeric|Required|Integer|Type of package: <br>`BOX`- Box <br> `ROL` - Cylinder or ENVELOPE||
|`Shipping.Lenght`|Numeric|Required|Integer|Package length||
|`Shipping.Height`|Numeric|Conditional|Integer|Package height|Required in case of Shipping.Package as BOX|
|`Shipping.Width`|Numeric|Conditional|Integer|Package width.|Required in case of Shipping.Package as BOX or ENVELOPE|
|`Shipping.Diameter`|Numeric|Conditional|Integer|Package diameter.|Required in case of Shipping.Package as ROL|

To carry out the calculation of freight via Post Office, it is necessary to respect the measures defined by the contract used by the merchant. For more information on dimensions and weights allowed, we suggest that you validate the store agreement at the link below:

[Limits and dimensions for post office deliveries](http://www.correios.com.br/para-voce/precisa-de-ajuda/limites-de-dimensoes-e-de-peso)

### Identifying Integration Errors

Due to the Cielo checkout structure, where the buyer is redirected to a separate environment to complete the transaction, there are possibilities for errors and integration failures at different times of the payment flow.
During integration it is important to
There are two types of errors that may occur during the integration process with Checkout Cielo. They are:

|Type of freight|Transactional|
|---|---|
|**Transactional pre-screen**|It means that there was some wrong data in sending the transaction. Required data may be missing or in invalid format. Here the merchant will always receive an e-mail stating what went wrong|
|**Transactional post-screen**|It means that there is some register impediment that limits the sale. Things like membership blocked, error in data saved in the register or even problems in the checkout itself|

If any errors occur after the transaction is completed, contact Cielo Support.

## Integration by BUTTON

**Integration via Button, QR CODE or LINK** is a purchase method used whenever there is no “shopping cart” in your store.
This type of integration is accomplished through the registration of a set of items to be sold on the backoffice of Checkout Cielo.

The generates one of the 3 different types of access methods to the **same transactional screen**:

|Method|Name|Description|
|---|:--:|---|
|![Button]({{ site.baseurl }}/images/Checkout/botao.png)|**Button**|It is an HTML code that when pasted into a website, will direct the buyer to the transactional screen - Ideal for use in **hotSites** or **Marketing E-mail**|
|![QRCODE]({{ site.baseurl }}/images/Checkout/qrcode.png)|**QRCODE**|Code interpretable by Smartphones and Tablets - Ideal for use in **Printed Marketing** or **Digital**|
|`http://bit.ly/2tRkSxZ`|**LINK**|is a shareable link, ideal for use in **Social networks** or **Messengers Mobile**|

This integration model is used to:

* Associate a direct quick purchase to a product as a promotion on a homepage by jumping the cart step.
* Send an e-mail marketing, or a charge via e-mail.
* Add the button (HTML) for the product/service to be purchased/paid.
* Perform payments sending by mobile applications
* Whenever you want to provide a quick sale.

To use this feature, it is necessary to register the product you want to sell, their information, and then just copy the source code generated for this button. The inclusion of products is done within the Backoffice Cielo Checkout, in the Products/Register Product menu.

### Button Features

Each button has a unique code that only allows to buy that particular product in the conditions of price and registered freight. Therefore, a fraudster can not change any of this information when submitting to the purchase, because Checkout Cielo will collect all the product data in the register of the Backoffice Cielo Checkout, and will be worth the register data.

|Feature|Explanation|
|---|---|
|**Specific**|Each generated button only suits for a particular product or group of products. The quantity and volume of products sold is defined in the Button register, and it is not possible to change the quantity in the transactional screen <br>**Example:** It will be necessary to create a button to sell 1 shirt. If the buyer desires 3 shirts, he will need to use the button 2X or The merchant should create a button with 2 shirts|
|**Checkout Order Number**|The button does not allow the register of the Merchant's order number. Since Cielo will trigger its own Checkout, a unique order number (a `GUID`) will be generated. The Merchant will receive this order number as a link to the performed sale|
|**Creation of orders**|One button generates multiple independent orders, i.e. it is not possible to limit the number of orders generated by a button, QRCODE or created Link. Button is a method of calling the API Checkout. Each time it is triggered, a new request is performed to the API, thus creating a new order|

 **Below, the payment flow via Button:**

![Button Checkout Cielo Integration Flow]({{ site.baseurl }}/images/Checkout/intbt.png)

### Creating the Button

To use this feature, it is necessary to register the product you want to sell, their information, and then just copy the source code generated for this button. The inclusion of products is done within the Backoffice Cielo Checkout, in the Products/Register Product menu.

**Registration Screen:**

![Button Registration]({{ site.baseurl }}/images/Checkout/btcadastro.png)

**Registered Button:**

![Button Registration]({{ site.baseurl }}/images/Checkout/btcadastro2.png)

Below the list of items that must be registered for the button creation:

|Fields|Description|Minimum Size|Maximum size|Required|
|---|---|---|---|---|
|`Product Type`|Indicate whether you are selling a Material, a Service or a Digital Good. For Digital goods, the Freight type option will not be displayed.|n/a|n/a|Yes|
|`SKU`|Product identification code|1|50|No|
|`Title`|Product Title|1|50|Yes|
|`Description`|Product description|1|255|Yes|
|`Price`|Order total value **in cents** (e.g.: R$1,00 =100).|11|14|Yes|
|`Freight`|Choose from one of the Freight options (Post Office, Fixed Freight, Free Shipping, Store Pickup, No Charge).|n/a|n/a|Yes|
|`Zip Code of Origin`|This field only appears for Post Office Freight type, must be filled with the Zip Code from where the goods will be shipped for freight calculation purposes.|9|9|Yes|
|`Weight(kg)`|This field only appears for Post Office Freight type, must be filled with the product weight in kg for freight calculation purposes|n/a|n/a|Yes|
|`Cost of Freight`|This field only appears for Fixed Freight freight type, and must be filled with the amount that the merchant specifies for their products.|n/a|n/a|Yes|
|`Shipping method`|This field only appears for Product Type equal to Physical Material and Type of Freight equal to Fixed Freight.|n/a|n/a|Yes|
|`URL`|This field only appears for Product Type equal to Digital.|n/a|n/a|Yes|

### Example of Button:

Below it is possible to see how the registration of a button generates the 3 methods to access the transactional screen.

> **Button** - An HTML code like the one below will be created.:

```
<form method='post' action='https://cieloecommerce.cielo.com.br/transactional/Checkout/BuyNow' target='blank'><input type='hidden' name='id' value=00000000-0000-0000-000000000000/><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br /BackOffice/Contentimages/botao_comprar_3.jpg' />
</form>
```

**Example of a Functional Button:**

<form method='post' action='https://cieloecommerce.cielo.com.br/transactionalvnext/order/buynow' target='blank'><input type='hidden' name='id' value='937874c6-a4d7-477e-9272-a4cb8b0c5f79' /><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br/backoffice/Content/img/buttons/button-5-1.png'/></form>

* **QR CODE AND LINK** - The link and the QRCODE has the same behavior as the button, leading to the same transactional screen.

|QR Code|Link|
|---|---|
|<img src='data:image/jpeg;base64,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'>|`http://bit.ly/2tRkSxZ`|

Adding the button to your HTML page you should copy the HTML code of the created button and put it in on the HTML code of your web site, as shown in the example below.

<aside class="notice">The code must be inserted within the appropriate area in your HTML.</aside>

Each button has a unique code that only allows to buy that particular product in the conditions of price and registered freight. Therefore, a fraudster can not change any of this information when submitting the purchase, because Checkout Cielo will collect all product data in the register of the Backoffice Cielo Checkout, and the register data will be valid.

#### Use case

Here's an example of how to use the link tool / Qr code / Payment button to boost your sales!

For ease of reading, let's name these options as "LQB".

First, let us explain the differences between these 3 options. They are 3 ways to access our payment screen without necessarily a technical integration with APIs etc.

* **Link** - is a shortened url that can be sent via social networks. Very practical for access via computers!
* **QR Code** - is an image that when read by a device with QR code reader (an APP on the cell phone for example), takes the buyer to the payment screen. Great for printed advertising!
* **Button** - is an Image embedded in HTML code to use in a web site. Very good if you own a web site, but does not want to deal with creating carts or payment streams. Put on your web site and that's all, the button takes the buyers to the payments screen

The LQB is available when you register a cart in Checkout Cielo's backoffice.
Just follow the path below:

Merchant access on Cielo web site > Online Sales > Checkout Cielo > ABA: Products >. Register products

That's it! After registering you already have a LQB waiting to be used!

Here's an example of use:

* Link + Recurrence:

The PagBras company holds a birthday party with their employees every month, watered by soft drinks and snacks, provided by the company itself, which they say are very good!

One day the employees decided to carry out a "crowdfunding" and contribute monthly to make the variety of snacks and drinks bigger, so they could do theme parties such as Christmas, for example.

What did they do? Being an attuned company that did not want to use a little box every month to collect the monthly contribution, one of the employees created a recurrence via LQB, and in a company Facebook group, posted the payments link.

Today, employees contribute monthly without having to remember to pay, once the Checkout Cielo Recurrence performs a new billing transaction every month!

## Flows Means of payment

### Credit card

Checkout Cielo allows the use of Credit Cards of the main national and international issuers. This means of payment is automatically released with Cielo affiliation, and can be used initially with the Checkout integration.

Credit card transactions will be included in the Backoffice Cielo Checkout as PENDING, AUTHORIZED, PAID, DECLINED, EXPIRED OR CHARGEBACK depending on the result of the authorization with the Bank.

**Credit Card** Order of Status:

|Order|Status|Explanation|
|---|---|---|
|1|**PENDING**|Original status. The transaction is occurring, awaiting response from the authorization process|
|2|**AUTHORIZED / DECLINED**|Result of the authorization process. <br>**AUTHORIZED** - Credit was reserved for purchase <br> **DECLINED** - Card not authorized by the issuer to continue the transaction|
|3|**PAID**|It occurs after capture. Indicates that the credit booked on the card will be deposited in the merchant's account|
|N/A|**EXPIRED**|Occurs if the transaction is not captured within 15 days after authorization. In this situation the transaction is lost.|
|N/A|**CHARGEBACK**|Not automatic status. If the merchant is notified of ChargeBack, he can mark this transaction as lost.<br> This Status is only a markup, not affecting payment processes|

**Warning - International Cards:** Checkout Cielo accepts cards issued outside Brazil, however these cards do not have the ability to pay installment sales. This is a limitation imposed by the issuing bank.

**Warning - EXPIRED TRANSACTIONS:** By default, Checkout Cielo stores have 15 days to capture the Credit transaction. If not captured, these transactions will be LOST.

### Fraud Analysis

Credit transactions **“AUTHORIZED”** will be sent for analysis of the anti-fraud tool if the `Options.AntifraudEnabled` parameter is defined as `TRUE`.
Anti-Fraud has the concept of `Status` and `SubStatus`, where the first represents the level of risk that a transaction has to be a fraud, and the second, additional information about the transaction.
The analysis shall indicate a degree of *RISK**, specified by the `Status`, for the sale in question.
This degree of risk is what should guide the merchant's decision to capture or cancel the sale.

|Anti-Fraud Status|Substatus|description|
|---|---|---|
|`Low risk`|Low risk|Low risk of being a fraudulent transaction|
|`Medium Risk`|Medium Risk|Medium risk of being a fraudulent transaction|
|`High risk`|High risk|High risk of being a fraudulent transaction|
|`Not finished`|Not finished|Could not complete the query|
|`N/A`|Authenticated|Transactions authenticated by the bank - **They are not analyzable by AF**|
|`N/A`|AF Not hired|Anti-fraud not allowed in merchant's plan - **They are not analyzable by AF**|
|`N/A`|AF Dispensed|Anti-fraud dispensed via contract or lower than the minimum value of antifrade parameterized backoffice in the merchant|
|`N/A`|Not applicable|Non-analyzable means of payment such as debit cards, bank slip and online debit|
|`N/A`|Recurrence transaction|credit transaction is later than the scheduled transaction. **Only Scheduling is analyzed**|
|`N/A`|Transaction declined|Credit sale has been declined - **They are not analyzable by AF**|

The analysis will be displayed in the “Order Details”, as below:

![Risk analysis]({{ site.baseurl }}/images/checkout-cielo-analise-risco.png)

You can view the anti-fraud status by going to the purchase detail in the Orders tab and clicking on (+)

![Anti-fraud Status]({{ site.baseurl }}/images/checkout-status-antifraude.png)

### Debit card

Checkout Cielo allows the use of MasterCard and Visa Debit cards. This means of payment is automatically released with Cielo affiliation and can be used initially with the Checkout integration.

Supported Banks:

|Mastercard|Visa|
|---|---|
|Bradesco|Bradesco|
|Banco do Brasil|Banco do Brasil|
|Santander|Santander|
|Itaú|Itaú|
|CitiBank|CitiBank|
|BRB|N/A|
|Caixa|N/A|
|BancooB|N/A|

**NOTE:** Cards not belonging to these banks will have their authorizations declined.

Upon accessing the transaction screen, the buyer will obtain by the payment via Debit Card, and will be redirected to the banking environment for Authentication and Authorization.

Debit card transactions will be included in the Backoffice Cielo Checkout as PENDING, PAID, UNAUTHORIZED or NOT FINISHED, depending on the result of the authorization with the Bank.

**Debit card** - Order of Status

1. **Pending** - Original status. The transaction is occurring, awaiting response from the bank to send the buyer to the authentication environment
2. **Not finished** - Intermediate status. At this point Checkout Cielo expects the Bank to confirm the status of the authentication and transaction. If the buyer leaves the bank environment, the status does not change.
3. **Paid** - Buyer successfully completed debit card payment.
4. **Not authorized** - The Buyer did not present an account balance to finalize the transaction.

**NOTE**: The **Cancell** option within the backoffice, will modify the status of the PAID/NOT PAID transaction to CANCELED, but will have no effect on the banking movement. It will be up to the merchant to return the value to the buyer

### Bank slip

Checkout Cielo allows the use of Bradesco (Wallet 26 and SPS) and Banco do Brasil Bank slips (Wallet 18).
This means of payment must be registered by Cielo Support to be made available in Backoffice Checkout.

Supported Banks:

|Mastercard|Visa|
|---|---|
|Bradesco|Bradesco|
|Banco do Brasil|Banco do Brasil|
|Santander|Santander|
|Itaú|Itaú|
|CitiBank|CitiBank|
|BRB|N/A|
|Caixa|N/A|
|BancooB|N/A|

**NOTE:** Cards not belonging to these banks will have their authorizations declined.

Upon accessing the transaction screen, the buyer will obtain by the payment via Debit Card, and will be redirected to the banking environment for Authentication and Authorization.

Debit card transactions will be included in the Backoffice Cielo Checkout as PENDING, PAID, UNAUTHORIZED or NOT FINISHED, depending on the result of the authorization with the Bank.

**Debit card** - Order of Status

1. **Pending** - Original status. The transaction is occurring, awaiting response from the bank to send the buyer to the authentication environment
2. **Not Finished** - Intermediate status. At this point, the Checkout Cielo expects the Bank to confirm the status of the authentication and transaction. If the buyer leaves the bank environment, the status does not change.
3. **Paid** - Buyer successfully completed debit card payment.
4. **Not Authorized** - The Buyer did not present an account balance to finalize the transaction.

**NOTE**: The **Cancel** option within the backoffice, will modify the status of the PAID/NOT PAID transaction to CANCELED, but will have no effect on the banking movement. It will be up to the merchant to return the value to the buyer

### Online Debit

Checkout Cielo allows the use of Online Debit (Transfer between bank accounts) for buyers who have accounts at Bradesco and Banco do Brasil banks.
This means of payment is released via registration with Support Cielo.

Upon accessing the transaction screen, the buyer will obtain by the payment via Online debit, and will be redirected to the banking environment for Authentication and Authorization.

Online debit transactions will be included in the Backoffice Cielo Checkout as PENDING, PAID, UNAUTHORIZED or NOT FINISHED, depending on the result of the authorization with the Bank.

**Online debit** - Order of Status

* **Pending** - Original status. The transaction is occurring, awaiting response from the bank to send the buyer to the authentication environment
* **Not Finished** - Intermediate status. At this point, the Checkout Cielo expects the Bank to confirm the status of the authentication and transaction. If the buyer leaves the bank environment, the status does not change.
* **Paid** - Buyer successfully completed debit payment.
* **Not Authorized** - The Buyer did not present an account balance to finalize the transaction.

**NOTE**: The **Cancel** option within the backoffice, will modify the status of the PAID/NOT PAID transaction to CANCELED, but will have no effect on the banking movement. It will be up to the merchant to return the value to the buyer

# Payment Notifications

The process of transactional notification in Checkout Cielo occurs via the inclusion of an URL to where will be directed the data of the transactions performed on the platform.
Note that Checkout only notifies when a transaction is considered completed i.e. the buyer has filled in all the payment screen data and clicked "Finish".

## Types of notification

Checkout Cielo has two types of notifications that the merchant can use according to their needs:

|Type|Description|
|---|---|
|`POST`|Notification where the merchant is passive. Two `POST HTTP` are triggered, one informing sales data and another the change of Transaction Status|
|`JSON`|Notification where the merchant performs a query. One `POST` containing information for conducting a query (`GET`) the checkout transactions|

To use both models, the merchant will need to access Cielo Backoffice and configure both the `NOTIFICATION URL` and the `STATUS CHANGE URL`.

## Notification URL Types

Checkout has 3 types of URLs that can impact the notification process.

|Type|Description|Note|
|---|---|---|
|`Return URL`|Web page to where the buyer will be redirected at the end of the purchase. <br>No data is exchanged or sent to this URL.<br> This URL only takes the buyer, after completing the purchase, to a page set by the store.|If the Merchant wishes, he can configure this page to be sensitized by traffic, thus identifying that the transaction has been completed in Checkout Cielo <br> Can be sent via API - See "Integration via API"|
|`Notification URL`|At the end of a transaction, an HTTP POST with all the sales data is sent to the Notification URL.<br> The notification POST is only sent at the time the transaction is finalized, regardless of whether the transaction status changed**|Used in the Notification via `POST` and` JSON`|
|`Status Change URL`|When an order has its status changed, a HTTP post will be sent to the Status Change URL.<br> The status change POST does not contain cart data, only order identification data|Used only in Notification via `POST`|

**NOTE:** If a `Return URL` is sent to the API, it will have priority over the URL registered in the Backoffice / In the integration Cielo `via Button`, you can only use the return URL option via backoffice.

**URL Features**

All 3 URLs must have the following features:

* Must be static URLs
* Must have less than 255 characters
* Special characters are not supported

**Setting up URLs**

1. Just access within the **Backoffice** the **Settings** Tabs
2. At **Store Settings**, go to the **Payments** session
3. Register the URLs and choose the type of Notification you want

![URLS registration]({{ site.baseurl }}/images/Checkout/urls.png)

## Notification: POST

Notification via POST is based on sending a `POST HTTP` when a transaction is performed. It is performed in two steps:

1. `NOTIFICATION POST` - Occurs when the transaction is finalized. This POST has all the order data, including the initial STATUS of the transaction.
2. `STATUS CHANGE POST` - Occurs when a transaction has its STATUS changed - **e.g.:** "Authorized" > > > "Paid"

This flow is used by stores that do not yet perform transactions via API.

Below the Flow of a POST Notification

![N.POST Flow]({{ site.baseurl }}/images/Checkout/npost.png)

**Return expected to send notification:** `HttpStatus = 200 (OK)` - Post received and processed successfully

**IMPORTANT** If the registered `Notification URL` returns any error/is unavailable, **3 retries, with an interval of 1 hour between each POST* will be performed.

If the POST is not received, it is possible to resend it manually, just access the order in question by the Backoffice and click on the Sending icon:

![Resending of notification]({{ site.baseurl }}/images/Checkout/reenvipost.png)

See description of notification items in the session **"NOTIFICATION POST content"**

## Notification: JSON

Notification via JSON is a more secure and flexible method for the merchant to conduct a query in Chekcout Cielo.
This notification mode is based on a `POST JSON`, where the merchant receives credentials so that a query (`GET`) can be performed with the Checkout Cielo database.

It is performed in two steps:

1. `NOTIFICATION POST` - Occurs when the transaction is finalized. It has the necessary Credentials transactional queries.
2. `TRANSACTIONAL QUERY` - With the query credentials, the merchant searches for sale data with Checkout Cielo

In JSON Notification, there is no difference between the `Notification POST` and `Status Change`. Whenever something occurs in the transaction, the merchant will receive a `Notification POST`

Below the Flow of a JSON Notification (Transaction Creation + Status Change)

![N.JSON Flow]({{ site.baseurl }}/images/Checkout/njson.png)

**JSON NOTIFICATION POST content:**

|Parameter|Description|Field Type|
|---|---|---|
|`URL`|URL with the data needed to perform the transaction data search.|String|
|`MerchantId`|Store identifier at Checkout Cielo; in the Backoffice in the Setup/Register Data menu.|Alphanumeric (GUID)|
|`MerchantOrderNumber`|Store order number; if it is not sent, Checkout Cielo will generate a number, which will be viewed by the Customer.|Alphanumeric|

**Example of a query:**

**REQUEST**

```html
--HEADER: MerchantID
 GET https://cieloecommerce.cielo.com.br/api/public/v1/orders/{merchantId}/{merchantOrderNumber}
```

**RESPONSE**

```json
{
    "order_number": "Pedido01",
    "amount": 101,
    "discount_amount": 0,
    "checkout_cielo_order_number": "65930e7460bd4a849502ed14d7be6c03",
    "created_date": "12/09/2017 14:38:56",
    "customer_name": "Test Test",
    "customer_phone": "21987654321",
    "customer_identity": "84261300206",
    "customer_email": "test@cielo.com.br",
    "shipping_type": 1,
    "shipping_name": "Motoboy",
    "shipping_price": 1,
    "shipping_address_zipcode": "21911130",
    "shipping_address_district": "Freguesia",
    "shipping_address_city": "Rio de Janeiro",
    "shipping_address_state": "RJ",
    "shipping_address_line1": "Rua Cambui",
    "shipping_address_line2": "Apto 201",
    "shipping_address_number": "92",
    "payment_method_type": 1,
    "payment_method_brand": 1,
    "payment_maskedcreditcard": "471612******7044",
    "payment_installments": 1,
    "payment_status": 3,
    "tid": "10447480686J51OH8BPB",
    "test_transaction": "False"
}

```

See description of notification items in the session **"NOTIFICATION POST content"**

**Return expected to send notification:** `HttpStatus = 200 (OK)` - Post received and processed successfully

**IMPORTANT** If the registered `Notification URL` returns any error/is unavailable, **3 new attempts, with an interval of 1 hour between each POST* will be made.

If the POST is not received, it is possible to resend it manually, just access the order in question by the Backoffice and click on the Sending icon:

![Notification resending]({{ site.baseurl }}/images/Checkout/reenvipost.png)

## Notification Content

In either HTTP POST or JSON POST Notification, the content of the returned data is the same.
Below are described all the returned fields, as well as their definitions and sizes:

**NOTIFICATION POST content:**

|Parameter|Description|Field Type|Maximum size|
|---|---|---|---|
|`checkout_cielo_order_number`|Unique identifier generated by CHECKOUT CIELO|Alphanumeric|32|
|`amount`|Unit price of the product, in cents (e.g.: R$ 1,00 = 100)|Numeric|10|
|`order_number`|Order number sent by store|Alphanumeric|32|
|`created_date`|Date of order creation - `dd/MM/yyyy HH:mm:ss`|Alphanumeric|20|
|`customer_name`|Name of the customer. If sent, this value is already filled in the CHECKOUT CIELO screen|Alphanumeric|289|
|`customer_identity`|Customer identification (CPF or CNPJ) If sent, this value is already filled in the CHECKOUT CIELO screen|Alphanumeric|14|
|`customer_email`|Customer e-mail. If sent, this value is already filled in the CHECKOUT CIELO screen|Alphanumeric|64|
|`customer_phone`|Customer phone number. If sent, this value is already filled in the CHECKOUT CIELO screen|Numeric|11|
|`discount_amount`|Discount amount provided (sent only if there was a discount)|Numeric|10|
|`shipping_type`|Freight mode|Numeric|1|
|`shipping_name`|Freight name|Alphanumeric|128|
|`shipping_price`|Value of the freight service, in cents (e.g.: R$ 10,00 = 1000)|Numeric|10|
|`shipping_address_zipcode`|Delivery address zip code|Numeric|8|
|`shipping_address_district`|Delivery address neighborhood|Text|64|
|`shipping_address_city`|Delivery address city|Alphanumeric|64|
|`shipping_address_state`|Delivery address state|Alphanumeric|64|
|`shipping_address_line1`|Delivery address|Alphanumeric|256|
|`shipping_address_line2`|Delivery address complement|Alphanumeric|14|
|`shipping_address_number`|Delivery address number|Numeric|8|
|`payment_method_type`|Payment means type code|Numeric|1|
|`payment_method_brand`|Issuer (only for transactions with credit card payment means)|Numeric|1|
|`payment_method_bank`|Issuer bank (For Automatic Debit and Bank slip transactions)|Numeric|1|
|`payment_maskedcredicard`|Masked Card (Only for transactions with credit card payment means)|Alphanumeric|20|
|`payment_installments`|Number of installments|Numeric|1|
|`payment_antifrauderesult`|Status of Credit Card Transactions in Anti-Fraud|Numeric|1|
|`payment_boletonumber`|Number of bank slip generated|String|1|
|`payment_boletoexpirationdate`|Due date for transactions made with bank slip|Numeric|10|
|`payment_status`|Transaction status|Numeric|1|
|`tid`|TID Cielo generated at the time of transaction authorization|Alphanumeric|32|
|`test_transaction`|Indicates whether the transaction was generated with 'Test Mode' enabled|Boolean|32|

**Payment_status**

Checkout has a status of its own, different from the CIELO WEB SITE or the API Cielo e-Commerce. See below the complete list.

|Value|Transaction status|Means of Payment|Description|
|---|---|---|---|
|1|`Pending`|For all means of payment|Indicates payment is still being processed; NOTE: Bank slip - Indicates that the bank slip did not have status changed by the merchant|
|2|`Paid`|For all means of payment|Transaction captured and money will be deposited into account.|
|3|`Declined`|Credit Card only|Transaction not authorized by the party responsible for the payment means|
|4|`Expired`|Credit Cards and Bank slip|Transaction no longer valid for capture - **15 days post Authorization**|
|5|`Canceled`|For credit cards|Transaction was canceled by the merchant|
|6|`Not Finished`|All means of payment|Payment waiting Status - May indicate error or processing failure. Contact Cielo Support|
|7|`Authorized`|Credit Card only|Transaction authorized by the card issuer. Must be captured for money to be deposited into account|
|8|`Chargeback`|Credit Card only|Transaction canceled by the customer with the card issuer. Money will not be deposited into account.|

**Payment_antifrauderesult**

Antifraud has the concept of `Status` and `SubStatus`, where the first represents the level of risk that a transaction has to be a fraud, and the second, an additional information about the transaction.

|Value|Anti-Fraud Status|Substatus|description|
|---|---|---|---|
|1|`Low risk`|Low risk|Low risk of being a fraudulent transaction|
|3|`Medium Risk`|Medium Risk|Medium risk of being a fraudulent transaction|
|2|`High risk`|High risk|High risk of being a fraudulent transaction|
|4|`Not finished`|Not finished|Could not end query|
|N/A|`N/A`|Authenticated|Transactions authenticated by the bank - **Not analyzable by AF**|
|N/A|`N/A`|AF Not hired|Anti-Fraud not enabled on the merchant's plan - **Not analyzable by AF**|
|N/A|`N/A`|AF Dispensed|Anti-fraud dispensed via contract or lower than the minimum value of anti-fraud parameterized backoffice in the merchant|
|N/A|`N/A`|Not applicable|Non-analyzable payment means such as debit cards, bank slip and online debit|
|N/A|`N/A`|Recurrence transaction|Credit transaction is after than the scheduled transaction. **Only Scheduling is analyzed**|
|N/A|`N/A`|Transaction declined|Sale by credit was declined - **Not analyzable by AF**|

**Payment_method_type**

Checkout allows only one type of `Bank slip` or `Online Debit` per merchant, so it is not returned if the method used is Bradesco or Banco do Brasil, since only one of them will be activated in the affiliation.

|Value|Description|
|---|---|
|1|Credit card|
|2|Bank slip|
|3|Online Debit|
|4|Debit card|

**Payment_method_brand**

|Value|Description|
|---|---|
|1|Visa|
|2|Mastercad|
|3|AmericanExpress|
|4|Diners|
|5|Elo|
|6|Aura|
|7|JCB|

**Payment_method_bank**

|Value|Description|
|---|---|
|1|Banco do Brasil|
|2|Bradesco|

**Shipping_type**

|Value|Description|
|---|---|
|1|Post office|
|2|Fixed freight|
|3|Free shipping|
|4|Withdraw in store|
|5|No freight charge (digital services or products)|

# Checkout Cielo installments

## Type of Installment

Checkout Cielo allows the merchant to carry out credit transactions by installments up to 12 times.
There are two methods of installment:

* **Installment via backoffice** - is the default installment method of Checkout. Each issuer has a installment configuration up to 12x. The Value of the Cart (Products + Freight) is equally divided by the number of parcels.
* **Installment via API** - The Merchant limits the number of installments to be displayed in the backoffice

**NOTE:** Checkout is limited to 12x installments, even if your Cielo affiliation supports higher values. If the value presented in your backoffice is lower than 12, contact Cielo Support and check the configuration of your Affiliation.

## Installment via backoffice

In this mode, the merchant controls the maximum limit of installments that the store will perform by Backoffice Checkout. The installments Value is defined by accessing the **Settings** tab and changing the session **Payments**

 ![Installments Selection]({{ site.baseurl }}/images/Checkout/parcelamento.png)

**NOTE:** The Check Box must be marked for the payment means to be displayed on the transactional screen.

**Features**

* Available in Checkout Cielo integrations via API or Button;
* The total value of the items in the cart is summed and divided by the amount of installments of the merchant;
* The value of the purchase is always the same regardless of the number of parcels chosen by the buyer (There is no Interest charge);
* The value of the freight is added to the value of the installment;
* The “in cash” option is always available to the buyer.
* All transactions will have the same installment options.

## Installment via API

In this option, the merchant can configure the amount of parcels per sale, specified via API request at the time of sending the transaction.
Checkout calculates the installments by considering total value and limit of installments sent via API.

**WARNING:** In this installment option, the number of installments desired should be lower than the amount that is registered in the backoffice Checkout.

**Features**

* The merchant sends the maximum number of installments he wants to display to the buyer.
* The value of the freight is added to the value of the installment.

The Installment via API is performed by sending the `MaxNumberOfInstallments` field inside the Payment node. This will force Checkout to recalculate the installment value.
Below is an example of the Node

```json
"Payment": {
  "MaxNumberOfInstallments": 3
}
```

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`MaxNumberOfInstallments`|Numeric|Conditional|2|Sets maximum value of installments displayed in transactional, ignoring Backoffice configuration|

# Checkout Cielo Recurrence

Recurrence is a process of automatic scheduling of credit transactions, that is, it is a transaction that will be repeated automatically, without the need of the buyer to access the transactional screen, according to the rules defined at the time of the scheduling.

<aside class="notice">If one of the transactions is not authorized, Checkout Cielo performs the retentative automatically; for details on automatic retentative, see section <a href="#retry-of-recurrences">Retry of Recurrences</a>.</aside>

Recurrent transactions are ideal for business models that involve the **concept of subscription, plan or monthly fee** in its form of **charge**.
Some business examples are:

* Schools
* Gyms
* Publishers
* Hosting services

**Difference between recurrent and installment transactions:**

|Type|Description|
|---|---|
|**Installment**|This is a **transaction divided into several months**. <br>The total value of the sale compromises the limit of the buyer's credit card regardless of the value of the initial installment.<br> The merchant receives the sale value in installments and does not take the plunge of one of the installments being declined.<br> **e.g.**: Sale of R$1.000,00 installment in 2x. Although the buyer pays only R$500.00 in the first installment, the amount of the credit limit consumed is the integral, that is, R$1,000.00. If the card limit is lower or the amount is not released, the R$1,000.00 transaction will be declined|
|**Recurrent**|They are **different transactions performed on the same card at previously scheduled times**.<br> The first sale schedules future sales from a pre-defined time interval.<br>  At each interval there will be a charge on the credit card. <br> The recurring payment blocks from the card limit only the value debited on the date of the first recurring sale and from the total value of the sale.<br> **e.g.**: Sale of R$1,000.00 on 01/15/2015, with monthly recurrence and final date on 06/01/2015. Every day of 15 there will be a new charge of R$1,000.00 on the buyer's card, repeating until 05/15/2015, the last valid date before the end date.|

## Recurrence by API

A recurring transaction in Checkout Cielo has two settings: `Interval` and `Closing date`.

* **Interval** – repeat pattern and time interval between each transaction. This time interval between transactions can be: Monthly, Bimonthly, Quarterly, Biannual and Annual.
* **Closing date** – Date that the recurrence process no longer occurs.

```json
"Payment": {
        "RecurrentPayment": {
            "Interval": "Monthly",
            "EndDate": "2018-12-31"
        }
```

**Payment.RecurrentPayment**

|Field|Type|Required|Size|Description|
|---|---|---|---|---|
|`Payment.RecurrentPayment.Interval`|Alphanumeric|Yes|10|Interval between each recurrence transaction|
|`Payment.RecurrentPayment.EndDate`|YYYY-MM-DD|No|255|Date where the Recurrence will end; If not sent the recurrence ends only if canceled|

|Interval|Description|
|---|---|
|`Monthly`|Monthly|
|`Bimonthly`|Bimonthly|
|`Quarterly`|Quarterly|
|`SemiAnnual`|SemiAnnual|
|`Annual`|Annual|

The buyer's credit card data is securely stored within Checkout Cielo, allowing it to be re-used in a recurring transaction. This data is not accessed by the merchant and this intelligence is controlled by Checkout Cielo.

Except the `Payment` object that contains a new element specific to the recurrence called `RecurrentPayment`, all other objects are equal to the integration with the Cart.

> REQUEST

```json
{
    "OrderNumber": "12344",
    "SoftDescriptor": "Nome que aparecerá na fatura",
    "Cart": {
        "Discount": {
            "Type": "Percent",
            "Value": 10
        },
        "Items": [
            {
                "Name": "Nome do produto",
                "Description": "Descrição do produto",
                "UnitPrice": 100,
                "Quantity": 2,
                "Type": "Asset",
                "Sku": "Sku do item no carrinho",
                "Weight": 200
            }
        ]
    },
    "Shipping": {
        "Type": "Correios",
        "SourceZipCode": "14400000",
        "TargetZipCode": "11000000",
        "Address": {
            "Street": "Endereço de entrega",
            "Number": "123",
            "Complement": "",
            "District": "Bairro da entrega",
            "City": "Cidade de entrega",
            "State": "SP"
        },
        "Services": [
            {
                "Name": "Serviço de frete",
                "Price": 123,
                "Deadline": 15
            }
        ]
    },
    "Payment": {
        "BoletoDiscount": 0,
        "DebitDiscount": 0,
        "RecurrentPayment": {
            "Interval": "Monthly",
            "EndDate": "2015-12-31"
        }
    },
    "Customer": {
        "Identity": 11111111111,
        "FullName": "Fulano Comprador da Silva",
        "Email": "fulano@email.com",
        "Phone": "11999999999"
    },
    "Options": {
        "AntifraudEnabled": false
    }
}
```

**Example**: Physical goods

If the product type is `Physical Goods`, the **API requires the sending of the type of freight**.
If there is a recurrence node in the technical contract, the `WithoutShipping` type is mandatory, otherwise the following response will be displayed:

> RESPONSE

```json
{
    "message": "The request is invalid.",
    "modelState": {
        "[Shipping.Type]": [
            "[Shipping.Type] pedidos com recorrência devem possuir o Shipping.Type 'WithoutShipping'."
        ]
    }
}
```

**IMPORTANT:** The Recurrence is created only if the transaction is **AUTHORIZED**. Whether or not captured, once authorized, the recurrence process starts.

## Recurrence by Button

One way to perform recurrence within Checkout is to create a recurring button.

Just register the product, including a billing interval and a closing date (Optional), as in the example below:

![Recurrence button]({{ site.baseurl }}/images/checkout-botao-recorrencia.png)

**WARNING:** If a button is used after the registered “End Date”, the transaction will present an error displaying **Oppss** on the transaction screen. The Date can be edited in the editing screen of the button within “Product Details”

## Retry of Recurrences

If one of the recurrence transactions is not authorized, Checkout Cielo performs the retry automatically, sending a new transaction, considering:

* **Time interval between attempts:** 1 day
* **Number of retries:** 3 (three), one per day, for 3 consecutive days from the day following the unauthorized original transaction.

**NOTE**: This process aims to maintain a positive response to the authorization process, preventing the merchant from losing the sale. The Retry Process generates duplicate orders within the Backoffice because the original order, the one declined, will be displayed in the Orders list, along with the new authorized transaction

**WARNING:**The retry rule can not be modified by the merchant.

## Querying transactions

Recurrence transactions are available in Backoffice Checkout Cielo like the other sales of your store in the "ORDERS" tab (see image below).

The first transaction of the recurrence is a normal transaction, following the rules and preferences defined by the merchant in the Backoffice.

**WARNING:** The value and charge date of the recurring transactions will always be the same as the initial transaction. Scheduling starts automatically from the date the first transaction is authorized.

![Querying transactions]({{ site.baseurl }}/images/checkout-consulta-recorrencia.png)

This screen shows the date that the 1st recurrence transaction was authorized and should be captured manually. **The other recurrence transactions will always be captured automatically**, regardless of whether the first transaction was captured or canceled. If the Customer has configured Automatic Capture, the recurrence capture will also be automatic.

**WARNING:** Only the 1st transaction is subjected to anti-fraud analysis

## Cancellation of Recurrence in Checkout Cielo.

Recurrence cancellation occurs within Checkout Cielo's Backoffice, also on the "ORDERS" tab. Just:

1. Access a recurrence transaction (marked with the “Recurring” symbol)
2. Enter Details (the “+” symbol)

![Recurrence order]({{ site.baseurl }}/images/checkout-cancelar-recorrencia.png)

![Recurrence cancellation]({{ site.baseurl }}/images/Checkout/pedidoreccance.png)

Recurrence detail screen

In the above screen, there are two Cancel options by buttons:

* **Cancel** – Cancels the transaction, without canceling future recurrence transactions.
* **Cancel Recurrence** - Cancels the scheduling of future transactions, ending the recurrence. It does not cancel the current transaction or those that have already occurred. These need to be canceled manually.

**WARNING:**
* The Recurrence occurs only for Credit Cards and for products like “SERVICE” and “DIGITAL GOODS”.
* Recurrence is initiated at the time of AUTHORIZATION, NOT AT THE CAPTURE. If the recurrence does not have a date to be finalized, it will automatically repeat itself until it is manually canceled.
* Your Cielo affiliation must be enabled to transact without CVV or In recurrence, otherwise all recurring transactions will be declined.

## Recurrence Edition

Checkout Cielo allows the merchant to modify 3 recurrence data:

* **Activation** - A recurrence can be enabled or disabled. e.g.: Suspension of a signature for a period of 3 months; Just set the Recurrence as inactive.
* **Interval** - It is possible to modify the execution interval.
* **Occurrence day** - It is possible to modify the execution date of the recurring transaction.

The update is done exclusively via Backoffice Cielo.

# Cielo Support

After reading this manual, if any doubts remain (technical or not), Cielo provides technical support 24 hours a day, 7 days a week in languages (Portuguese and English), in the following contacts:

* +55 4002-9700 – *Capitals and Metropolitan Regions*
* +55 0800-570-1700 – *Other Locations*
* +55 11 2860-1348 – *International*
  * Option 1 – *Technical support;*
  * Option 2 – *E-commerce Accreditation.*
* E-mail: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
