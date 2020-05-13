---
layout: tutorial
title:  EDI - Extrato Eletrônico
description: Instruções EDI
toc_footers: true
categories: tutorial
sort_order: 7
tags:
  - EDI Cielo
---

# Introdução

# Ambiente

# Operações

## **POST** Registers

### Request

> **POST** {{host}}/edi/registers
>
> **Headers**
>
>| Key | Value |
>|---|---|
>| **externalID** | |

```

{
  "mainMerchantId": "9999111222",
  "merchants": [
    "9999111111",
    "9999111333"
  ],
  "merchantEMail": "customer@customer.com",
  "type": [
    "SELL"
  ]
}

```

## Responses

```

{
  "legalEntityNumber": 1234567890,
  "mainMerchantId": 2008983,
  "registerID": 12345,
  "merchants": [
    823958412384701,
    679809436576210
  ],
  "type": [
    "SELL"
  ],
  "status": "PROCESSING"
}

```
