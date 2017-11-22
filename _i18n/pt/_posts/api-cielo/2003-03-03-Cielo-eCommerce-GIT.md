---
layout: manual
title: Teste
description: Manual integração técnica via API
search: true
translated: true
categories: manual
tags:
  - API e-Commerce Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Teste

```java
    PaymentListener paymentListener = new PaymentListener() {
                @Override
                public void onStart() {
                Log.d("MinhaApp", "O pagamento começou.");
                }
                
                @Override
                public void onPayment(@NotNull Order order) {
                Log.d("MinhaApp", "Um pagamento foi realizado.");
                } 
                
                @Override public void onCancel() {
                Log.d("MinhaApp", "A operação foi cancelada.");
                } 
                
                @Override public void onError(@NotNull PaymentError paymentError) {
                Log.d("MinhaApp", "Houve um erro no pagamento.");
                }
    }; 
    
    String orderId = order.getId();
    
    long value = order.getPrice();
    
    orderManager.checkoutOrder(orderId, value, paymentListener);
```