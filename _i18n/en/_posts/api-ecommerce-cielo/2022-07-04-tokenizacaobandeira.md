---
layout: redirect
redirect: https://docs.cielo.com.br/ecommerce-cielo-en/docs/network-tokenization
title: Network Tokenization – Mandate Visa
description: Network Tokenization – Mandate Visa
search: true
translated: true
toc_footers: true
categories: tutorial
sort_order: 5
tags:
  - 1. API E-commerce
  - 3. Checkout and Link de Pagamento
---

<aside class="warning"> The content on this page is being discontinued and will not receive updates after 09/16/2024. Please visit the new documentation.</aside>

# The documentation for API Cielo E-commerce is now on a new portal

[![new e-commerce developers portal for Cielo and Braspag]({{ site.baseurl_root }}/images/apicieloecommerce/new-doc-cielo.com.br.png)](https://docs.cielo.com.br/english)

Access the new E-commerce developers portal at **[docs.cielo.com.br](https://docs.cielo.com.br/english)**.

> **Warning**: The content on this page is being discontinued and will not receive updates after 09/16/2024. Please visit the new documentation at [docs.cielo.br](https://docs.cielo.com.br/ecommerce-cielo-en/docs/what-is-card-tokenization).

--------------------------------------------------------------------------------------------------------------------------

<aside class="warning"> The following content has not been updated since 09/16/2024.</aside>

# Network tokenization – Visa Mandate

**What is the Visa mandate about tokenization?**

As of February, 2024, Visa will charge an additional fee of 0.05% over the online transaction amount when the transaction is sent with sensitive card data (PAN). The goal is to improve online security through the adoption of the network token.

The network token is digital identifier string unique for a card and a merchant that stores and replaces sensitive card data along the transaction flow.

In this manual, we explain about network tokenization, benefits and which options Cielo offers for our clients so that they can be compliant with the mandate.

**What is a network token and what are the benefits?**

Network tokenization is the storage of tokenized card data in a network token vault.
The goal is to improve security and quality of card information traffic, which may result in increase in approval performance by the issuers. See all the benefits:

* **Improved security**: in addition to creating a token (DPAN) that replaces card (PAN) information, the card brands also create the *cryptogram*, which function as a password or signature of the brand, unique for both the card and the merchant.
* **Automatic card update**: when a new card is issued in place of a previous card, or when the expiration date changes, the issuer sends the new card data to the card brand and the brand automatically updates the network tokens with the new data. This process does not require any action from the merchant, but fees related to token update may be applied depending on the card brand.
* **Performance improvement**: since the network tokenization process improves security and assures that card data is always updated, the transaction approval rates can also increase.

## How to comply with the mandate?

Cielo offers the following options so that the merchant can prepare and avoid additional charges from the card brand:

* **[Transparent tokenization](https://developercielo.github.io/en/tutorial/tokenizacaobandeira#option-1-transparent-tokenization)**
* **[Facilitated integration](https://developercielo.github.io/en/tutorial/tokenizacaobandeira#option-2-facilitated-integration)**
* **[External integration](https://developercielo.github.io/en/tutorial/tokenizacaobandeira#option-3-external-integration)**

## Option 1: transparent tokenization

In an effort to reduce financial impact in our clients, Cielo developed a solution that will automatically tokenize all eligible transactions.

> **Eligible products**: API E-commerce Cielo, API 1.5 (deprecated), Link de Pagamento and Checkout Cielo.

**How does it work?**

When the merchant sends an online transaction with card data (PAN) to our APIs, Cielo will automatically create a token for that card so that Visa will receive the tokenized card data, thus avoiding the 0.05% fee.

**Will the token be saved in Cielo systems?**

Yes, in transparent tokenization the network token will be saved in Cielo systems, so that in the next transaction it will not be necessary to create a new token for the same card.

**Which transactions are eligible for tokenization?**

According to Visa, approximately 90% of card BINs (first six to eight card digits) are already eligible for tokenization, hence Cielo is not able to tokenize 100% of Visa transactions.

**What are the costs for transparent tokenization?**

Currently, Cielo is not charging for transparent tokenization in order to enable the tokenization experience for our clients and to avoid the 0.05% fee over the transaction amount. Cielo may start charging for this service at any point in the future.

**Is it necessary to modify my API integration or to request this feature for Cielo?**

No. For transparent tokenization no additional integrations are required and the feature is being enabled for all of our clients in stages since September, 2023.

**What is the impact of transparent tokenization for merchants who already use network tokenization?**

If you are already using network tokenization, Cielo will identify the transaction as tokenized by Visa and will send it for authorization with the previously provided data.

**What happens if the token is unavailable?**

If there is a *timeout* or if the card brand/issuer are unavailable and the token/cryptogram is not provided, Cielo will proceed with the transaction using the card data (PAN), in order to prevent our clients from losing sales.

Merchants can also opt to manage the network token on their own. Continue reading for further information.

## Option 2: facilitated integration

In this option, the merchant integrates with Cielo tokenization service, which will create a network token. Thus, merchant will only have one token for a card, but Cielo will have the tokens and cryptograms safely stored and with only one integration.

> **Available card brands:** Visa.

> **Eligible Products:** API E-commerce Cielo.

**How to obtain this feature?**

Send us an email at *cieloecommerce@cielo.com.br* and ask to enable tokenization using facilitated integration.

**Which transactions are eligible for tokenization?**

According to Visa, approximately 90% of card BINs (first six to eight card digits) are already eligible for tokenization, hence Cielo is not able to tokenize 100% of Visa transactions.

**What are the costs?**

Cielo does not charge any additional fee for merchants integrated with API E-commerce Cielo.

> Get more information on facilitated integration on [Network Tokenization](https://developercielo.github.io/en/manual/cielo-ecommerce#network-tokenization){:target="_blank"}

## Option 3: external integration

If the merchant uses a gateway or other any other partner that already provides the network token, it is possible to integrate so that the brand will receive the token information.

> **Available brands:** Visa, Master and Elo.<br>
> *For external integration, Cielo is prepared to receive network token from Visa, Mastercard and Elo, but you must verify if the brand is offering tokenization*.

> **Eligible products:** API E-commerce Cielo and API 1.5 (deprecated).

**How to obtain this feature?**

The merchant must enable the feature with their gateway/partner and assure that such gateway/partner is integrated with API E-commerce Cielo in order to send the required parameters.

**Which transactions are eligible for tokenization?**

According to Visa, approximately 90% of card BINs (first six to eight card digits) are already eligible for tokenization, hence Cielo is not able to tokenize 100% of Visa transactions.

**What are the costs?**

Cielo does not charge any additional fee for merchants integrated with API E-commerce Cielo or API 1.5.

# Support

Send us an email at *cieloecommerce@cielo.com.br*.
