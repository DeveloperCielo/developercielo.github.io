---
layout: manual
title: Manual de integração Hibrida
description: Integração Técnica via API
search: true
translated: true
categories: manual
sort_order: 3
tags:
  - Cielo LIO
---

## Integração Híbrida Pagamento 
 
O processo de integração híbrida é um pouco diferente da integração com o SDK. É necessário definir um contrato de resposta com a LIO 
para que a mesma possa responder após o fluxo de pagamento/cancelamento/impressão. Esse contrato deve ser definido no manifest.xml da 
aplicação conforme o exemplo abaixo:
