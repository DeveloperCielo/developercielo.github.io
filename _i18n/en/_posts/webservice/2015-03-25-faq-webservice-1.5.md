---
layout: faq
title: FAQ
description: Answers to common questions about the Webservice 1.5
search: true
toc_footers: true
categories: faq
sort_order: 3
tags:
  - Webservice 1.5
---

# Frequent questions

<aside class="warning">The Webservice 1.5 was discontinued. The document below exists based on the knowledge for already integrated customers. New registers won't be performed by the Cielo attendance</aside>

> For new integrations, check [Cielo E-commerce API](https://developercielo.github.io/manual/cielo-ecommerce)

## How does a solution from the Webservice 1.5 from Cielo work??

The **Webservice** solution from the Cielo e-Commerce platform was developed as an XML technology, that is a market standard and does not depend on the technology used by our customers. Thus, being possible to integrate using the most varied programming languages, such as: ASP, ASP. Net, Java, PHP, Ruby, Python, etc.

## Do I need any proprietary software, like DLLs, to perform the integration?

No. the absence of proprietary applications is one of the solution's characteristics: It is not required to install apps on the virtual store **under any circumstances**.

## What kind of content is sent through the integration??

The integration is used through services available such as Web Services. The model used is very simple: there's a single URL (endpoint) that gets the POSTs via HTTPs and, depending on the XML format sent, a given operation is performed.

## How does the Webservice from Cielo know that the requisition is from my store?

All Web Services requisitions from Cielo **must have an authentication node from the retailer**, composed by the accreditation number and access key provided by Cielo at the moment of the affiliation.

# Questions about Integration

## What is an integration?

The key element from Cielo e-Commerce is a transaction, created from an HTTP requisition of the Cielo Webservice. The unique identification of a transaction on Cielo is made through the **TID** field, that is present on the return of the authorization messages . This field is essential for performing queries, captures and cancellations.

## What kinds of error can occur during the integration?

When the transaction is invalid, we can classify the error in two types:

* **Syntactic error**: They occur when the XML message does not respect the rules set on the ecommerce.xsd. file. a letter and a numeric field, or the absence of a mandatory value;
* **Semantic error**: They occur when a requisition requests a non supported operetation for a given transaction. For example, try to capture a non authorized transaction, or yet, cancelling an already canceled transaction..

The error messages always bring additional information that make the troubleshooting easier.

## How do I perform a direct transaction?

The direct authorization is characterized by being a transaction where there's no holder authentication, be that for the option (and risk) of the retailer, or because the card brand or issuing bank do not have support. The direct authorization can be done in two ways: traditional (with card data) or through a token.

## How do I perform a recurring authorization?

The recurring authorization can be performed in two different ways: through the send of a token previously registered, or through a card. The recurring transaction is practically equal to the traditional, the changes consist on the rules that the issuer and the card brand use to authorize or decline a transaction. Another difference is related to the Easy Renew.

## Is it possible to perform a capture in a moment after the authorization?

An authorized transaction only generates credit for a commercial establishment in case it is captured. For this reason, all sales that the retailer wants to effect, it will be required to perform the transaction capture (or confirmation).

For sales on the Credit modality, this confirmation can occur in two moments:

* Immediately after the authorization (total capture);
* Posterior to the authorization (total or partial capture).

In the first case, it is not required to send a capture requisition, because it is made automatically by Cielo after the transaction authorization. For such, it is required to configure the transaction requisition setting the value "true" for the TAG <capture>, as seen on the section "Creating a transaction".

In the second case, it is required to perform a "posterior capture", through a new requisition to the Cielo Webservice to confirm the transaction and receive the sale amount.

<aside class="warning"><strong>Attention!</strong>: This option is not present on the credit modality: all debit transaction authorized is capture automatically.</aside>

## Is it possible to cancel a transaction?

The cancellation is used when the shopkeeper decides not to effect a purchase order, either due to insufficient inventory, withdrawal of the purchase by the consumer, or any other reason. Its use is mainly necessary if the transaction is captured, because there will be debit in the holder's invoice, if not canceled.

<aside class="notice">If the transaction is only authorized and the store wants to cancel it, the cancellation order won't be necessary, because after the capture period, it'll be automatically canceled by the system.</aside>

## Is there any environment to test the integration?

The integration tests must be performed before the homologation starts, during the development (codification) of the solution. For that, it must be considered the following environment as Endpoint of the Webservice: [https://qasecommerce.cielo.com.br/servicos/ecommwsec.do](https://qasecommerce.cielo.com.br/servicos/ecommwsec.do)

To make the development easier, we've made available two keys to tests, one for each integration modality. Based on the initial configurations made during your accreditation, choose the correct data to perform the tests:

|Commercial establishment number |Key tests                                                  |
|--------------------------------|------------------------------------------------------------------|
|`1006993069`                    |`25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3`|

<aside class="notice">The tests environment must only be used by the establishments for tests listed on the board above. The use of original data from the establishment will generate transactions that can't be traced, generating incorrect results. On the tests environment, use the credentials for tests, on the production environment, use original data from the establishment.</aside>

## Is there any rule for cards reading?

The read of the card data on the own environment is controlled by the rules defined by the security program imposed by the card brands.

For Visa, this program is known as AIS (Account Information Security) PCI. For more information. access: [https://www.cielo.com.br](https://www.cielo.com.br) > Services > Security Services > AIS – Account Information Security, or contact us.

For Mastercard, the security program is the SDP (Site Data Protection) PCI. For more information. access: [http://www.mastercard.com/us/sdp/index.html](http://www.mastercard.com/us/sdp/index.html), or contact us.

Furthermore, when attending the requisites, at the moment of the E-commerce accreditation, the choice by card reading on the own store must be mentioned.
