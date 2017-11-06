---
layout: manual
title: Manual API Cielo eCommerce
description: Manual integração técnica via API
search: true
translated: true
categories: manual
tags:
  - API Cielo
language_tabs:
  json: JSON
  shell: cURL
toc_footers:
  - <a href='/Guia-D-migracao-1.5x3.0/'>Guia de migração API 1.5</a>
  - <a href='/API-3.0-FAQ/'>FAQ API CIELO</a>
  - <a href='/Tutorial-Backoffice-3.0/'>Tutorial Backoffice 3.0</a>
  - <a href='/Habilitacao-meios-de-pagamento/'>Tutorial Boleto / Débito online</a>
  - <a href='/Boas-praticas-de-ecommerce/'>Boas práticas de eCommerce</a>
---

# Pagamentos com Cartão de Crédito

**Para que você possa disfrutar de todos os recursos disponíveis em nossa API, é importante que antes você conheça os conceitos envolvidos no processamento de uma transação de cartão de crédito.**

## Criando uma transação simples

*Para* criar uma transação que utilizará cartão de crédito, é necessário enviar uma requisição utilizando o método `POST` para o recurso Payment, conforme o exemplo. Esse exemplo contempla o mínimo de campos necessários a serem enviados para a autorização.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

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

| Propriedade                 | Tipo   | Tamanho | Obrigatório | Descrição                                                                                              |
|-----------------------------|--------|---------|-------------|--------------------------------------------------------------------------------------------------------|
| `MerchantId`                | Guid   | 36      | Sim         | Identificador da loja na Cielo.                                                                        |
| `MerchantKey`               | Texto  | 40      | Sim         | Chave Publica para Autenticação Dupla na Cielo.                                                        |
| `RequestId`                 | Guid   | 36      | Não         | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT. |
| `MerchantOrderId`           | Texto  | 50      | Sim         | Numero de identificação do Pedido.                                                                     |
| `Customer.Name`             | Texto  | 255     | Não         | Nome do Comprador.                                                                                     |
| `Customer.Status`           | Texto  | 255     | Não         | Status de cadastro do comprador na loja (NEW / EXISTING)                                               |
| `Payment.Type`              | Texto  | 100     | Sim         | Tipo do Meio de Pagamento.                                                                             |
| `Payment.Amount`            | Número | 15      | Sim         | Valor do Pedido (ser enviado em centavos).                                                             |
| `Payment.Provider`          | Texto  | 15      | ---         | Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.                    |
| `Payment.Installments`      | Número | 2       | Sim         | Número de Parcelas.                                                                                    |
| `CreditCard.CardNumber`     | Texto  | 19      | Sim         | Número do Cartão do Comprador.                                                                         |
| `CreditCard.Holder`         | Texto  | 25      | Não         | Nome do Comprador impresso no cartão.                                                                  |
| `CreditCard.ExpirationDate` | Texto  | 7       | Sim         | Data de validade impresso no cartão.                                                                   |
| `CreditCard.SecurityCode`   | Texto  | 4       | Não         | Código de segurança impresso no verso do cartão - Ver Anexo.                                           |
| `CreditCard.Brand`          | Texto  | 10      | Sim         | Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover).                      |

