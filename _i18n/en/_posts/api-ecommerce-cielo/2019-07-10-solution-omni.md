---
layout: manual
title: Manual de Integração Solução Omni
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# Overview  - Omni Solution API  

# Goal

Enable the integration of business partners/sub-acquire with Cielo for transactions with non-gift cards (typed transactions) and gift cards in Chip and Tarja modalities.

# Glossary

|ID|Description|
|BC|PINPad Shared Library|
|DUKPT|(Devired Unique Key Per Transaction) Encryption method used at Cielo|
|PIN|Card password|
|BDK|(Base Derived Key) Sub key to be installed on HSM|
|HSM|(Hardware Security Module) Server for digital key generation, storage, management and digital key encryptions functionality.|
|OAUTH2|Authentication protocol used in APIs|

# Prerequisites

For the integration, the business partner/sub-acquire capture solution must have the following components:

* Shared Library for PINPad or proprietary library certified with flags.
* DUKPT encryption keys implemented for PIN.
* Provide your BDK installation on HSM Cielo;

Key Format required by Cielo:

HSM Cielo is parameterized to a KSN as follows:

* **KSI -** Key identification number
* **DID –** Device ID
* **TC –** Transaction Counter

In the key register is only inserted the KSI that has 5 numeric characters and the key, as the example below:

**FFFFF**030331234500012

<aside class="warning">Note: The F's must be filled in automatically by the Capture Solution..</aside>

# Authentication

The authentication is a necessary operation to obtain the token that will be used in other API calls.

|Security scheme type:|OAuth2|
|clientCredentials OAuth Flow|**URL Token:** https://authsandbox.braspag.com.br/oauth2/token<br><br>**Scopes:**<br><br>* `Administrator` - Admin everything<br><br>* `AnalyticsApiOverview` - See the analytics<br><br>* `AdminBackoffice` - Use the backoffice|

# Payment

When a payment is created (201 - Created), you should review the Status (Payment.Status) in the response to make sure that the payment was successfully generated or failed.

| SandBox                                             | Production                                      |
|:---------------------------------------------------:|:---------------------------------------------:|
| https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |

## Credit card sale without password

### Request
