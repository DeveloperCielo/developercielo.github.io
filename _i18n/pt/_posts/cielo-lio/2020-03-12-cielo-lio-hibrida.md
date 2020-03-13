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

# Integração Híbrida Pagamento 

O processo de integração híbrida é um pouco diferente da integração com o SDK. É necessário definir um contrato de resposta com a LIO para que a mesma possa responder após o fluxo de pagamento/cancelamento/impressão. Esse contrato deve ser definido no manifest.xml da aplicação conforme o exemplo abaixo:

```html
<activity android:name=".ResponseActivity">    
<intent-filter>
   <action android:name="android.intent.action.VIEW" />
   <category android:name="android.intent.category.DEFAULT" />
   <data            
      android:host="response"           
      android:scheme="order" />
</intent-filter>
</activity>
```

Os nomes “response” e “order” podem ser substituídos pelo que fizer sentido no seu aplicativo. Lembrando que na hora de fazer a chamada de pagamento, você deve informar os mesmos nomes para receber o callback da LIO. Para realizar o pedido de pagamento é preciso criar um json seguindo o formato definido abaixo e converte-lo para BASE64:
