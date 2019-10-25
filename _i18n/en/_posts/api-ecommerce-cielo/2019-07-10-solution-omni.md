---
layout: manual
title: Integration Manual Omni Solution
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Payment
language_tabs:
  json: JSON
  shell: cURL
---

# Overview - API Omni Solution

# Proposal

Enable the integration of business partners/sub-purchasers with Cielo for transactions with non-present cards (typed transactions) and gift cards in Chip and black stripe modalities.

# Glossary

|ID|Description|
|BC|PINPad Shared Library|
|DUKPT|(Devired Unique Key Per Transaction) Encryption method used at Cielo|
|PIN|Card password|
|BDK|(Base Derived Key) Sub key to be installed on the HSM|
|HSM|(Hardware Security Module) Server for digital key generation, storage, management and cryptographic functionality|
|OAUTH2|Authentication protocol used in APIs|

# Prerequisites

For the integration, it is necessary that the business partner/sub-purchaser capture solution must have the following components:

* Shared library for PINPad or proprietary library certified with the brands.
* DUKPT encryption keys implemented for PIN.
* Make your BDK available for installation on HSM Cielo.

HSM Cielo is parameterized to a KSN as follows:

* **KSI -** Key identification number
* **DID –** Device ID
* **TC –** Transaction Counter

In the key register is only inserted the KSI that has 5 numeric characters and the key, as the example below:

**FFFFF**030331234500012

<aside class="warning">Note.: The F’s must be filled in automatically by the Capture Solution.</aside>

# Authentication
