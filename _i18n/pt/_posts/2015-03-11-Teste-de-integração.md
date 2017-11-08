---
layout: manual
title: Teste de Integração
description: MD criado para testar regras e possibilidades de edição do novo manual
search: true
translated: true
categories: manual
tags:
  - Documentos Teste
language_tabs:
  json: JSON
  shell: cURL

---

# Nível 1

11111111111111111111

## Nivel 2

2222222222222222222

### Nivel 3

333333333333333333

#### Nivel 4

4444444444444444444

> Teste de Mensagem de destaque

Destaque de código `Código`

|Funcionalidade|Descrição|
|---|---|
|**Tela transacional**|O Checkout Cielo possui uma tela transacional própria, com um layout otimizado, encurtando os passos no pagamento de suas transações. `Código`|
|`Tela transacional`|O Checkout Cielo possui uma tela transacional própria, com um layout otimizado, encurtando os passos no pagamento de suas transações. `Código`|
|`Tela transacional`|O Checkout Cielo possui uma tela transacional própria, com um layout otimizado, encurtando os passos no pagamento de suas transações. `Código`|

# Nível A

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014111703",
   "Customer":{  
      "Name":"Comprador crédito simples"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
--verbose
```
