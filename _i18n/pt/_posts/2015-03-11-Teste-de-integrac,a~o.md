---
layout: manual
title: Teste de Documentação
description: MD criado para testar regras e possibilidades de edição do novo manual
search: true
translated: true
categories: manual
tags:
  - Testes
language_tabs:
  json: JSON
  shell: SHELL

---

> Código com Tab

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

> Tabela

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

# Nivel 1

11111111111111111111

## Nivel 2

2222222222222222222

### Nivel 3

333333333333333333

#### Nivel 4

4444444444444444444

> Teste de Mensagem de destaque

<aside class="request"><span class="method post">POST</span><span class="endpoint">/1/sales</span></aside>
<aside class="request"><span class="method put">PUT</span><span class="endpoint">/1/sales</span></aside>
<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/sales</span></aside>
Notice
<aside class="notice"><strong>Notice</strong> Nesta modalide o portador do cartão é direcionado para o ambiente de autenticação do banco emissor do cartão onde será solicitada a inclusão da senha do cartão</aside>
Warning
<aside class="warning"><strong>Warning</strong> A Cielo não oferece suporte para instalação do certificado</aside>

```
{
Código:"AAAAAA",
}
```

`Código`
