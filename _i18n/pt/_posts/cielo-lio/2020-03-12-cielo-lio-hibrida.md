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

```json
{
"accessToken":"Seu Access-token",
"clientID":"Seu Client-id",
"email": "emaildocliente@email.com",
"installments":0,
"items":[
{
"name":"Geral",
"quantity":1,
"sku":"10",
"unitOfMeasure":"unidade",
"unitPrice":10
}
],
"paymentCode":"DEBITO_AVISTA",
"value":"10"
}
```

Como explicado anteriormente, é preciso definir o contrato de resposta **(host** e **scheme**), aqui será utilizado essa configuração no parâmetro **urlCallback**. A chamada de pagamento deve ser feita da seguinte forma:

```java
var base64 = getBase64(jsonString) 
var checkoutUri = "lio://payment?request=$base64&urlCallback=order://response"
```

Após preparar a URI basta realizar a chamada de **intent** do android utilizando o comando específico da linguagem híbrida.

```java
var intent = Intent(Intent.ACTION_VIEW, Uri.parse(checkoutUri)) 
intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP) 
startActivity(intent) 
```
