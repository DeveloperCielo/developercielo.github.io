---
layout: faq
title: FAQ
description: Answers to common questions about the Checkout
search: true
toc_footers: true
categories: faq
sort_order: 3
tags:
  - Cielo Checkout
---

# Questions about the integration

## What’s the difference between the integration type used on CIELO CHECKOUT?

CIELO CHECKOUT uses integration via POST and it is possible to configure it in two ways:

* **Integration via Shopping Cart** - used when there’s a “shopping cart” to be sent, that is, in case the consumer navigates through the website and chooses 1 or more products to add to a cart and then finish the transaction.
* **Integration via Button** - Always used when there`s no ”shopping cart” in your store or when it is desired to associate a fast/direct purchase to a product. Each registered product generates an unique ”buy button” that allows customization. Example: a hotsite, a promotion that takes the buyer directly to the payment stage (Cielo Checkout page).

## How do I create the Button?

The Button is created at the inclusion moment of a new product. For that, access the [Backoffice Checkout Cielo]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}), on the Products/Register Products menu.

## What information do I need to mount the POST?

The data to be filled on the POST are:

* Order Data
* Shopping Cart
* Freight Data
* Consumer Data

All the information to assist in this process, can be found on the Cielo Checkout Integration Manual.

## Can I send an e-mail marketing as a charge method?

Yes, through Integration via Button it is possible to send an e-mail marketing, or a charge via e-mail, adding to the e-mail HTML, the button referring to the product/offered service.

## What is the Return URL for?

When finishing the purchase, the consumer has the option to go back on the retailer`s website or be directed to the page that the retailer desires. The function of these URL is to automatically conduct the consumer to a defined page on this option.

# Questions about notification

## What is the Notification URL for?

When finishing a transaction, a POST is sent with all sale data to the previously registered Notification URL on the BackOffice. The Notification POST is sent only at the moment that the transaction is finished, regardless if there’s transaction status alteration.

Thus, the order data remain updated on the [Backoffice Checkout Cielo]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) and also on the store/platform backoffice.

## What is the Status Change URL for??

It defines where the POST will be send indicating the transaction status alteration, that is, when an order has it’s status altered, a POST will be sent to the Status Change URL, previously registered on the BackOffice. The status change POST does not have cart data, only order identification data.

## Where is the URL register made?

At the [Backoffice Checkout Cielo]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}), on the Configuration/store configuration menu.

## What is the difference between OPSSS Error before and after the Cielo Checkout screen exhibition?

**Before the Checkout screen exhibition** - it means that there was a wrong data on the transaction send. Mandatory data can be missing or the format is invalid. Here, the retailer will always receive an email informing the error reason..

* To these, it's displayed a code (the same of the manuals) inside the order on the Cielo Checkout BackOffice.

**After the Checkout screen exhibition (when the sale is finished)** - means that there’s a register impediment that limits the sale. Things like blocked affiliation, error on the saved data on the register or even problems on the own checkout.

# Questions about Freight 

## What is the relation between the products kind and freight kind?

The kind of product to be sold on the Cielo Checkout influences directly on the kind of freight and the information can be send to the transaction processing.

The kind of freight to be used will depend on the kind of product that your store markets. On Cielo Checkout you can market 3 kinds of products:

* Physical Material
* Digital Goods
* Services

The kinds of freight that can be used are:

* Courier
* Fixed freight 
* No shipping 
* No shipping (withdrawal in hands)
* No shipping charge (used to Digital Goods or Services)

Products (Physical Material category) need the habilitation of some kind of freight in order to be sent. In this case, it is mandatory the inclusion of information such as product weight (CART_1_WEIGHT), origin zip code (CART_1_ZIPCODE) and addressee zip code (SHIPPING_ZIPCODE), for the freight calculation.

The “Digital Goods” or “Services” categories do not need this kind of information..

To understand the POST difference between these parameters in relation to the freight and kinds of products, compare the POST examples below. For more information, access the [Manual de Integração Checkout Cielo]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-cielo %}).

### Mandatory parameters 

|Physical material|Digital Goods / Service|
|---|---|
|`MERCHANT_ID`|`MERCHANT_ID`|
|`ORDER_NUMBER`|`ORDER_NUMBER`|
|`SHIPPING_TYPE`: 1, 2 ou 3|`SHIPPING_TYPE`: 5|
|`SOFT_DESCRIPTOR`|SOFT_DESCRIPTOR|
|`CART_1_NAME`|`CART_1_NAME`|
|`CART_1_UNITPRICE`|`CART_1_UNITPRICE`|
|`CART_1_QUANTITY`|`CART_1_QUANTITY`|
|`CART_1_WEIGHT`|`CART_1_TYPE`: 2 ou 3 **(Mandatory)**|
|`CART_1_ZIPCODE`|`CART_1_TYPE`: 1 **(Mandatory)**|
|`CUSTOMER_NAME`|`CUSTOMER_IDENTITY`|
|`SHIPPING_1_NAME`|`CUSTOMER_EMAIL`|
|`SHIPPING_1_PRICE`|`CUSTOMER_PHONE`|

# Questions about the Test Mode 

## What is the CIELO CHECKOUT test mode?

It’s a test environment, where it is possible to simulate all actions without needing to change your integration. It`s an environment where it is possible to simulate sales and other test actions  (like cancelling, captures and chargebacks).

## How is the Test Mode activated on Cielo Checkout?

On the Cielo Checkout Backoffice, Configuration tab Payments Test Mode It is possible to enable or disable the Test Mode. When this mode is active, a big red stripe will be displayed on the superior part of every Cielo Checkout screen (Backoffice and Payment screen).

On Test Mode, the retailer or developer can perform transaction and integration tests.

## Does the Test Mode have any additional cost??

No, there are no taxes to use it. Test Mode is provided at the moment of your account liberation.
