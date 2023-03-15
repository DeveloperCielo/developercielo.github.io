---
layout: manual
title: Api de Controle Transacional
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 3
tags:
  - Checkout
language_tabs:
  json: JSON
  shell: cURL
---

# Cielo OAUTH

O Cielo OAUTH é um processo de autenticação utilizado em APIs Cielo que são correlacionadas a produtos E-commerce. Ele utiliza como segurança o protocolo **[OAUTH2](https://oauth.net/2/)**, onde é necessário primeiramente obter um token de acesso, utlizando suas credenciais, que deverá posteriormente ser enviado à API CieloOAuth

<aside class="notice">Para gerar o ClientID e o ClientSecret, consulte o tópico de Obter Credenciais.</aside>

Para utilizar o Cielo Oauth são necessarias as seguintes credenciais:

| PROPRIEDADE    | DESCRIÇÃO                                                            | TIPO   |
| -------------- | -------------------------------------------------------------------- | ------ |
| `ClientId`     | Identificador chave fornecido pela CIELO                             | guid   |
| `ClientSecret` | Chave que valida o ClientID. Fornecida pela Cielo junto ao`ClientID` | string |

## Obter Credenciais

Para obter as credênciais no Checkout Cielo, basta seguir o fluxo abaixo:

1. Acessar o site Cielo
2. Checkout
3. Configurações
4. Dados da loja
5. Gerar chaves da API

## Token de acesso

Para obter acesso a serviços Cielo que utilizam o `Cielo Oauth`, será necessário obter um token de acesso, conforme os passos abaixo:

1. Concatenar o ClientId e o ClientSecret, **ClientId:ClientSecret**
2. Codificar o resultado em **Base64**
3. Enviar uma requisição, utilizando o método HTTP POST

### Concatenação

| Campo                     | Formato                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| **ClientId**              | b521b6b2-b9b4-4a30-881d-3b63dece0006                                                             |
| **ClientSecret**          | 08Qkje79NwWRx5BdgNJsIkBuITt5cIVO                                                                 |
| **ClientId:ClientSecret** | _b521b6b2-b9b4-4a30-881d-3b63dece0006:08Qkje79NwWRx5BdgNJsIkBuITt5cIVO_                          |
| **Base64**                | _YjUyMWI2YjItYjliNC00YTMwLTg4MWQtM2I2M2RlY2UwMDA2OiAwOFFramU3OU53V1J4NUJkZ05Kc0lrQnVJVHQ1Y0lWTw_ |

### Request

O Request dever ser enviado apenas no Header da requisição.

<aside class="request"><span class="method post">POST</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/token</span></aside>

```json
x-www-form-urlencoded
--header "Authorization: Basic {base64}"
--header "Content-Type: application/x-www-form-urlencoded"
grant_type=client_credentials
```

### Response

O response possuirá o Token utilizado para novas requisições em Serviços Cielo

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6Ik1ldUNoZWNrb3V0IE1hc3RlciBLZXkiLCJjbGllbnRfaWQiOiJjODlmZGasdasdasdmUyLTRlNzctODA2YS02ZDc1Y2QzOTdkYWMiLCJzY29wZXMiOiJ7XCJTY29wZVwiOlwiQ2hlY2tvdXRBcGlcIixcIkNsYWltc1wiOltdfSIsInJvbGUiOiJasdasdasd291dEFwaSIsImlzc47I6Imh0dHBzOi8vYXV0aGhvbasdasdnJhc3BhZy5jb20uYnIiLCJhdWQiOiJVVlF4Y1VBMmNTSjFma1EzSVVFbk9pSTNkbTl0ZmasdsadQjVKVVV1UVdnPSIsImV4cCI6MTQ5Nzk5NjY3NywibmJmIjoxNDk3OTEwMjc3fQ.ozj4xnH9PA3dji-ARPSbI7Nakn9dw5I8w6myBRkF-uA",
  "token_type": "bearer",
  "expires_in": 1199
}
```

| PROPRIEDADE    | DESCRIÇÃO                                                 | TIPO   |
| -------------- | --------------------------------------------------------- | ------ |
| `Access_token` | Utilizado para acesso aos serviços da API                 | string |
| `Token_type`   | Sempre será do tipo `bearer`                              | texto  |
| `Expires_in`   | Validade do token em segundos. Aproximadamente 20 minutos | int    |

<aside class="notice">O token retornado (access_token) deverá ser utilizado em toda requisição como uma chave de autorização, destacando que este possui uma validade de 20 minutos (1200 segundos) e após esse intervalo, será necessário obter um novo token para acesso aos serviços Cielo. </aside>

# Controle transacional

A **API de Controle Transacional** permite ao lojista modificar o status de os pedidos sem acessar o Backoffice do Checkout Cielo.

As operações possíveis de serem realizadas são:

- **Consulta** – consultar uma transação
- **Captura** – capturar uma transação com valor total/Parcial
- **Cancelamento** – cancelar uma transação com valor total/Parcial

Seu principal objetivo é permitir que lojas e plataformas possam automatizar as operações através de seus próprios sistemas.

<aside class="notice">**Endpoint Central** https://cieloecommerce.cielo.com.br/api/public/v2/orders/</aside>

## Autenticação

O Processo de autenticação na API do link de pagamento é o **[Cielo OAUTH](https://docscielo.github.io/Pilots/manual/controletransacional4#cielo-oauth)**

## Pré-requisitos

Para realizar o controle transacional no Checkout Cielo é OBRIGATÓRIO que a loja possua um dos dois modelos de notificação abaixo configurado:

- URL de Notificação via **POST**
- URL de Notificação via **JSON**

<br>

A notificação é obrigatorio pois todos os comandos da API (Consulta / Captura / Cancelamento) usam o identificador único da transação, chamado de `Checkout_Cielo_Order_Number`.

O `Checkout_Cielo_Order_Number` é gerado apenas quando o pagamento é _finalizado na tela transacional_. Ele é enviado apenas pela _URL de Notificação_ e não pelo Response da criação da tela transacional.

## Consultas

A consulta de transações via API pode ser feita até 45 dias após a venda ter sido realizada.

### Por Merchant_Order_Number

A consulta de transações por `Merchant_Order_Number` retorna uma lista de transações com o mesmo número de pedidos, isso ocorre pois o Checkout Cielo não impede a duplicação de OrderNumbers por parte do lojista.
O response possuirá o `Checkout_Cielo_Order_Number` que deverá ser usado na consulta de uma transação em especifico.

#### Request

Para consultar uma transação pelo `Merchant_Order_Number`, basta realizar um `GET`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/merchantOrderNumber/{merchantordernumber}</span></aside>

#### Response

```json
[
  {
    "$id": "1",
    "checkoutOrderNumber": "a58995ce24fd4f1cb025701e95a51478",
    "createdDate": "2018-04-30T12:09:33.57",
    "links": [
      {
        "$id": "2",
        "method": "GET",
        "rel": "self",
        "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a58995ce24fd4f1cb025701e95a51478"
      }
    ]
  },
  {
    "$id": "3",
    "checkoutOrderNumber": "438f3391860a4bedbae9a868180dda6e",
    "createdDate": "2018-04-30T12:05:41.317",
    "links": [
      {
        "$id": "4",
        "method": "GET",
        "rel": "self",
        "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e"
      }
    ]
  }
]
```

| Property              | Description                                 | Type     | Size | Format                                                                                             |
| --------------------- | ------------------------------------------- | -------- | ---- | -------------------------------------------------------------------------------------------------- |
| `$id`                 | id do nó                                    | Numérico | -    | Exemplo: 1                                                                                         |
| `checkoutOrderNumber` | Código de pedido gerado pelo Checkout Cielo | Texto    | 32   | Exmeplo: a58995ce24fd4f1cb025701e95a51478                                                          |
| `createdDate`         | Data de criação do pedido                   | Data     | -    | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `links.$id`           | Id do nó                                    | Numérico | -    | Exemplo: 1                                                                                         |
| `links.method`        | Método para consumo da operação             | Texto    | 10   | Exmeplos: GET, POST, PUT                                                                           |
| `links.rel`           | Relação para consumo da operação            | Texto    | 10   | Exemplo: self                                                                                      |
| `links.href`          | Endpoint para consumo da operação           | Texto    | 512  | Exemplo: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e |

### Por Checkout_Cielo_Order_Number

#### Request

Para consultar uma transação pelo `Checkout_Cielo_Order_Number`, basta realizar um `GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

#### Response

```json
{
  "merchantId": "c89fdfbb-dbe2-4e77-806a-6d75cd397dac",
  "orderNumber": "054f5b509f7149d6aec3b4023a6a2957",
  "softDescriptor": "Pedido1234",
  "cart": {
    "items": [
      {
        "name": "Pedido ABC",
        "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
        "unitPrice": 9000,
        "quantity": 1,
        "type": "1"
      }
    ]
  },
  "shipping": {
    "type": "FixedAmount",
    "services": [
      {
        "name": "Entrega Rápida",
        "price": 2000
      }
    ],
    "address": {
      "street": "Estrada Caetano Monteiro",
      "number": "391A",
      "complement": "BL 10 AP 208",
      "district": "Badu",
      "city": "Niterói",
      "state": "RJ"
    }
  },
  "payment": {
    "status": "Paid",
    "tid": "10127355487AK2C3EOTB",
    "nsu": "149111",
    "authorizationCode": "294551",
    "numberOfPayments": 1,
    "createdDate": "2018-03-02T14:29:43.767",
    "finishedDate": "2018-03-02T14:29:46.117",
    "cardMaskedNumber": "123456******2007",
    "brand": "Visa",
    "type": "creditCard",
    "errorcode": "00",
    "antifraud": {
      "antifraudeResult": 0,
      "description": "Lojista optou não realizar a análise do antifraude."
    }
  },
  "customer": {
    "identity": "12345678911",
    "fullName": "Fulano da Silva",
    "email": "exemplo@email.com.br",
    "phone": "11123456789"
  },
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/054f5b509f7149d6aec3b4023a6a2957"
    },
    {
      "method": "PUT",
      "rel": "void",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/054f5b509f7149d6aec3b4023a6a2957/void"
    }
  ]
}
```

| Campo                                | Tipo     | Tamanho | Descrição                                                                 | Formato                                                                                                                                |
| ------------------------------------ | -------- | ------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `merchantId`                         | GUID     | 36      | Id da Loja no Checkout                                                    | Exemplo: c89fdfbb-dbe2-4e77-806a-6d75cd397dac                                                                                          |
| `orderNumber`                        | Texto    | 32      | Número do pedido da loja.                                                 | Exemplo: 123456                                                                                                                        |
| `softDescriptor`                     | Texto    | 13      | Texto exibido na fatura do comprador. Sem caracteres especiais ou espaços | Exemplo: `Loja_ABC_1234`                                                                                                               |
| `cart.items.name`                    | Texto    | 128     | Nome do item no carrinho.                                                 | Exemplo: Pedido ABC                                                                                                                    |
| `cart.items.description`             | Texto    | 256     | Descrição do item no carrinho.                                            | Exemplo: 50 canetas - R$30,00                                                                                                          |
| `cart.items.unitPrice`               | Numérico | 18      | Preço unitário do produto em centavos                                     | Exemplo: R$ 1,00 = 100                                                                                                                 |
| `cart.items.quantity`                | Numérico | 9       | Quantidade do item no carrinho.                                           | Exemplo: 1                                                                                                                             |
| `cart.items.type`                    | Texto    | 255     | Tipo do item no carrinho                                                  | `Asset`<br>`Digital`<br>`Service`<br>`Payment`                                                                                         |
| `shipping.type`                      | Numérico | 36      | Modalidade de frete                                                       | Exemplo: 1                                                                                                                             |
| `shipping.services.name`             | Texto    | 128     | Modalidade de frete                                                       | Exemplo: Casa Principal                                                                                                                |
| `shipping.services.price`            | Numérico | 10      | Valor do serviço de frete, em centavos                                    | Exemplo: R$ 10,00 = 1000                                                                                                               |
| `shipping.address.street`            | Texto    | 256     | Endereço de entrega                                                       | Exemplo: Rua João da Silva                                                                                                             |
| `shipping.address.number`            | Numérico | 8       | Número do endereço de entrega                                             | Exemplo: 123                                                                                                                           |
| `shipping.address.complement`        | Texto    | 64      | Complemento do endereço de entrega                                        | Exemplo: Casa                                                                                                                          |
| `shipping.address.district`          | Texto    | 64      | Bairro do endereço de entrega                                             | Exemplo: Alphaville                                                                                                                    |
| `shipping.address.city`              | Texto    | 64      | Cidade do endereço de entrega                                             | Exemplo: São Paulo                                                                                                                     |
| `shipping.address.state`             | Texto    | 2       | Estado de endereço de entrega                                             | Exemplo: SP                                                                                                                            |
| `Payment.status`                     | Texto    | 10      | Status da transação                                                       | Exemplo: Paid [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status)                               |
| `Payment.tid`                        | Texto    | 32      | TID Cielo gerado no momento da autorização da transação                   | Exemplo: 10127355487AK2C3EOTB                                                                                                          |
| `Payment.nsu`                        | Texto    | 6       | NSU Cielo gerado no momento da autorização da transação                   | Exemplo: 123456                                                                                                                        |
| `Payment.authorizationCode`          | Texto    | 3       | Código de autorização.                                                    | Exemplo: 456789                                                                                                                        |
| `Payment.numberOfPayments`           | Numérico | 6       | Número de Parcelas.                                                       | Exemplo: 123456                                                                                                                        |
| `Payment.createdDate`                | Texto    | 22      | Data de criação da transação                                              | Exemplo: AAAA-MM-DDTHH:mm:SS.ss                                                                                                        |
| `Payment.finishedDate`               | Texto    | 22      | Data de finalização da transação                                          | Exemplo: AAAA-MM-DDTHH:mm:SS.ss                                                                                                        |
| `Payment.cardMaskedNumber`           | Texto    | 19      | Número do cartão mascarado                                                | Exemplo: 123456**\*\***2007                                                                                                            |
| `Payment.brand`                      | Texto    | 10      | Bandeira do cartão                                                        | Exemplo: Visa                                                                                                                          |
| `Payment.antifraud.antifraudeResult` | Numeric  | 1       | Status do antifraude                                                      | Exemplo: 1                                                                                                                             |
| `Payment.antifraud.description`      | Texto    | 256     | Descrição do status do antifraude                                         | Exemplo: Lojista optou não realizar a análise do antifraude                                                                            |
| `Payment.type`                       | Texto    | 11      | Tipo de meio de pagamento                                                 | Exemplo: CreditCard [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_type)                    |
| `Payment.errocode`                   | Numérico | 2       | Código de retorno                                                         | Exemplo: 00, 51, 57, etc [Lista Completa](<https://developercielo.github.io/manual/linkdepagamentos5#c%C3%B3digos-de-retorno-(abecs)>) |
| `Customer.Identity`                  | Numérico | 14      | CPF ou CNPJ do comprador.                                                 | Exemplo: 12345678909                                                                                                                   |
| `Customer.FullName`                  | Texto    | 256     | Nome completo do comprador.                                               | Exemplo: Fulano da Silva                                                                                                               |
| `Customer.Email`                     | Texto    | 64      | Email do comprador.                                                       | Exemplo: exemplo@email.com.br                                                                                                          |
| `Customer.Phone`                     | Numérico | 11      | Telefone do comprador.                                                    | Exemplo: 11123456789                                                                                                                   |

### Por ID do link de pagamento

#### Request

Para consultar uma transação pelo `id`, basta realizar um `GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}/payments</span></aside>

#### Response

```json
{
  "$id": "1",
  "productId": "9487e3a9-f204-4188-96c5-a5a3013b2517",
  "createdDate": "2019-07-11T10:35:04.947",
  "orders": [
    {
      "$id": "2",
      "orderNumber": "b74df3e3c1ac49ccb7ad89fde2d787f7",
      "createdDate": "2019-07-11T10:37:23.447",
      "payment": {
        "$id": "3",
        "price": 11500,
        "numberOfPayments": 6,
        "createdDate": "2019-07-11T10:37:23.447",
        "status": "Denied"
      },
      "links": [
        {
          "$id": "4",
          "method": "GET",
          "rel": "self",
          "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/b74df3e3c1ac49ccb7ad89fde2d787f7"
        }
      ]
    }
  ]
}
```

| Property                          | Description                          | Type     | Size            | Format                                                                                             |
| --------------------------------- | ------------------------------------ | -------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `$id`                             | id do nó                             | Numérico | -               | Exemplo: 1                                                                                         |
| `productId`                       | ID do link de pagamento              | GUID     | 36              | Exmeplo: 9487e3a9-f204-4188-96c5-a5a3013b2517                                                      |
| `createdDate`                     | Data de criação do link de pagamento | Data     | -               | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `orders.$id`                      | Id do nó                             | Numérico | -               | Exemplo: 1                                                                                         |
| `orders.orderNumber`              | Id pedido gerado pelo Checkout Cielo | Texto    | 32              | Exemplo: b74df3e3c1ac49ccb7ad89fde2d787f7                                                          |
| `orders.createdDate`              | Data de criação do pedido            | Data     | -               | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `orders.payment.$id`              | Id do nó                             | Numérico | -               | Exemplo: 1                                                                                         |
| `orders.payment.price`            | Valor da pedido, sem pontuação       | Numérico | -               | Exemplo: R$ 1,00 = 100                                                                             |
| `orders.payment.numberOfPayments` | Número de parcelas                   | -        | Exemplo: 3      |
| `orders.payment.createdDate`      | Data da transação (pagamento)        | Data     | -               | AAAA-MM-DDTHH:mm:SS.ss                                                                             |
| `orders.payment.status`           | Status da Transação                  | Texto    | Exemplo: Denied |
| `links.$id`                       | Id do nó                             | Numérico | -               | Exemplo: 1                                                                                         |
| `links.method`                    | Método para consumo da operação      | Texto    | 10              | Exmeplos: GET, POST, PUT                                                                           |
| `links.rel`                       | Relação para consumo da operação     | Texto    | 10              | Exemplo: self                                                                                      |
| `links.href`                      | Endpoint para consumo da operação    | Texto    | 512             | Exemplo: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e |

## Capturar transação

### Request

Para capturar uma transação pelo `Checkout_Cielo_Order_Number`, basta realizar um `PUT`.

> **Header:** Authorization: Bearer {access_token}

**Captura Total**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/capture</span></aside>

**Captura Parcial**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/capture?amount={Valor}</span></aside>

<aside class="notice">**OBS**: A captura parcial pode ser realizada apenas 1 vez e é exclusiva para cartão de crédito.</aside>

### Response

```json
{
  "success": true,
  "status": 2,
  "returnCode": "6",
  "returnMessage": "Operation Successful",
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96"
    },
    {
      "method": "PUT",
      "rel": "void",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96/void"
    }
  ]
}
```

| PROPRIEDADE -   | DESCRIÇÃO                                                                                                                                                               | TIPO    | TAMANHO |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| `success`       | Define o status do processo de atualização                                                                                                                              | Boolean |         |
| `status`        | Status da transação no Checkout - [STATUS](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos)                                               | int     | 2       |
| `returnCode`    | Código de explicação o motivo de transações negadas ou autorizadas - [Tabela de códigos](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos) | String  | 2       |
| `returnMessage` | Mensagem que explica o motivo de transações negadas ou autorizadas - [Tabela de códigos](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos) | String  | 255     |

## Cancelar transação

### Request

Para cancelar uma transação pelo `Checkout_Cielo_Order_Number`, basta realizar um `PUT`.

Para as solicitações de cancelamento da mesma transação, é necessário aguardar um período de 5 segundos entre uma solicitação e outra, para que seja realizada a consulta de saldo, reserva do valor na agenda financeira e sensibilizado o saldo. Evitando assim duplicidade de cancelamento. Esta regra vale para cancelamentos totais e/ou parciais.

Para identificar que as solicitações de cancelamento são da mesma transação, consideramos o número do EC, número da autorização de cancelamento, data da venda, valor da venda e NSU.

Importante salientar que para realizar qualquer solicitação de cancelamento, é necessário que o estabelecimento possua saldo suficiente na transação/em agenda.

> **Header:** Authorization: Bearer {access_token}

**Cancelamento total**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/void</span></aside>

**Camcelamento Parcial**

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/`{checkout_cielo_order_number}`/void?amount={Valor}</span></aside>

**OBS**: O cancelamento parcial pode ser realizada apenas após a captura. O cancelamento parcial pode ser realizado inumeras vezes até que o valor total seja cancelado.

### Response

```json
{
  "success": true,
  "status": 2,
  "returnCode": "6",
  "returnMessage": "Operation Successful",
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96"
    },
    {
      "method": "PUT",
      "rel": "void",
      "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a9d517d81fb24b98b2d16eae2744be96/void"
    }
  ]
}
```

| PROPRIEDADE -   | DESCRIÇÃO                                                                                                                                                               | TIPO    | TAMANHO |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| `success`       | Define o status do processo de atualização                                                                                                                              | Boolean |         |
| `status`        | Status da transação no Checkout - [STATUS](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos)                                               | int     | 2       |
| `returnCode`    | Código de explicação o motivo de transações negadas ou autorizadas - [Tabela de códigos](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos) | String  | 2       |
| `returnMessage` | Mensagem que explica o motivo de transações negadas ou autorizadas - [Tabela de códigos](https://docscielo.github.io/Pilots/manual/appcielo-link#status-e-c%C3%B3digos) | String  | 255     |

## Status e Códigos

### Status transacionais

O Checkout possui um Status próprios, diferente do SITE CIELO ou da API Cielo ecommerce. Veja abaixo a lista completa.

| Valor | Status de transação | Meios de pagamento               | Descrição                                                                                                                     |
| ----- | ------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1     | `Pendente`          | Para todos os meios de pagamento | Indica que o pagamento ainda está sendo processado; OBS: Boleto - Indica que o boleto não teve o status alterado pelo lojista |
| 2     | `Pago`              | Para todos os meios de pagamento | Transação capturada e o dinheiro será depositado em conta.                                                                    |
| 3     | `Negado`            | Somente para Cartão Crédito      | Transação não autorizada pelo responsável do meio de pagamento                                                                |
| 4     | `Expirado`          | Cartões de Crédito e Boleto      | Transação deixa de ser válida para captura - **15 dias pós Autorização**                                                      |
| 5     | `Cancelado`         | Para cartões de crédito          | Transação foi cancelada pelo lojista                                                                                          |
| 6     | `Não Finalizado`    | Todos os meios de pagamento      | Pagamento esperando Status - Pode indicar erro ou falha de processamento. Entre em contato com o Suporte cielo                |
| 7     | `Autorizado`        | somente para Cartão de Crédito   | Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta                  |
| 8     | `Chargeback`        | somente para Cartão de Crédito   | Transação cancelada pelo consumidor junto ao emissor do cartão. O Dinheiro não será depositado em conta.                      |

### Códigos de Retorno

Códigos emitidos pelos emissores dos cartões de crédito e débito explicando o motivo de uma transação ser autorizada ou não.

| Código Resposta | Definição                                                                                                                                                     | Significado                                                                                                                                                                                                                                                                                                         | Ação                                                                                                                                                                                                                      | Permite Retentativa                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 00              | Transação autorizada com sucesso.                                                                                                                             | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                                   | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 000             | Transação autorizada com sucesso.                                                                                                                             | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                                   | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 01              | Transação não autorizada. Transação referida.                                                                                                                 | Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.                                                                                                                                                                                                                                         | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 02              | Transação não autorizada. Transação referida.                                                                                                                 | Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.                                                                                                                                                                                                                                         | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 03              | Transação não permitida. Erro no cadastramento do código do estabelecimento no arquivo de configuração do TEF                                                 | Transação não permitida. Estabelecimento inválido. Entre com contato com a Cielo.                                                                                                                                                                                                                                   | Não foi possível processar a transação. Entre com contato com a Loja Virtual.                                                                                                                                             | Não                                                  |
| 04              | Transação não autorizada. Cartão bloqueado pelo banco emissor.                                                                                                | Transação não autorizada. Cartão bloqueado pelo banco emissor.                                                                                                                                                                                                                                                      | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 05              | Transação não autorizada. Cartão inadimplente (Do not honor).                                                                                                 | Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.                                                                                                                                                                             | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| 06              | Transação não autorizada. Cartão cancelado.                                                                                                                   | Transação não autorizada. Não foi possível processar a transação. Cartão cancelado permanentemente pelo banco emissor.                                                                                                                                                                                              | Não foi possível processar a transação. Entre em contato com seu banco emissor.                                                                                                                                           | Não                                                  |
| 07              | Transação negada. Reter cartão condição especial                                                                                                              | Transação não autorizada por regras do banco emissor.                                                                                                                                                                                                                                                               | Transação não autorizada. Entre em contato com seu banco emissor                                                                                                                                                          | Não                                                  |
| 08              | Transação não autorizada. Código de segurança inválido.                                                                                                       | Transação não autorizada. Código de segurança inválido. Oriente o portador a corrigir os dados e tentar novamente.                                                                                                                                                                                                  | Transação não autorizada. Dados incorretos. Reveja os dados e informe novamente.                                                                                                                                          | Não                                                  |
| 11              | Transação autorizada com sucesso para cartão emitido no exterior                                                                                              | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                                   | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 12              | Transação inválida, erro no cartão.                                                                                                                           | Não foi possível processar a transação. Solicite ao portador que verifique os dados do cartão e tente novamente.                                                                                                                                                                                                    | Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.                                                                        | Não                                                  |
| 13              | Transação não permitida. Valor da transação Inválido.                                                                                                         | Transação não permitida. Valor inválido. Solicite ao portador que reveja os dados e novamente. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                   | Transação não autorizada. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                                                  | Não                                                  |
| 14              | Transação não autorizada. Cartão Inválido                                                                                                                     | Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor, dados incorretos ou tentativas de testes de cartão. Use o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo. Consulte www.cielo.com.br/desenvolvedores para implantar o Algoritmo de Lhum. | Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.                                                                        | Não                                                  |
| 15              | Banco emissor indisponível ou inexistente.                                                                                                                    | Transação não autorizada. Banco emissor indisponível.                                                                                                                                                                                                                                                               | Não foi possível processar a transação. Entre em contato com seu banco emissor.                                                                                                                                           | Não                                                  |
| 19              | Refaça a transação ou tente novamente mais tarde.                                                                                                             | Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                        | Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir entre em contato com a loja virtual.                                                                        | Apenas 4 vezes em 16 dias.                           |
| 21              | Cancelamento não efetuado. Transação não localizada.                                                                                                          | Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                                                       | Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.                                                                                          | Não                                                  |
| 22              | Parcelamento inválido. Número de parcelas inválidas.                                                                                                          | Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                            | Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                                    | Não                                                  |
| 23              | Transação não autorizada. Valor da prestação inválido.                                                                                                        | Não foi possível processar a transação. Valor da prestação inválido. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                             | Não foi possível processar a transação. Valor da prestação inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                       | Não                                                  |
| 24              | Quantidade de parcelas inválido.                                                                                                                              | Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                         | Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                   | Não                                                  |
| 25              | Pedido de autorização não enviou número do cartão                                                                                                             | Não foi possível processar a transação. Solicitação de autorização não enviou o número do cartão. Se o erro persistir, verifique a comunicação entre loja virtual e Cielo.                                                                                                                                          | Não foi possível processar a transação. reveja os dados informados e tente novamente. Persistindo o erro, entrar em contato com a loja virtual.                                                                           | Apenas 4 vezes em 16 dias.                           |
| 28              | Arquivo temporariamente indisponível.                                                                                                                         | Não foi possível processar a transação. Arquivo temporariamente indisponível. Reveja a comunicação entre Loja Virtual e Cielo. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                   | Não foi possível processar a transação. Entre com contato com a Loja Virtual.                                                                                                                                             | Apenas 4 vezes em 16 dias.                           |
| 30              | Transação não autorizada. Decline Message                                                                                                                     | Não foi possível processar a transação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação com a Cielo esta sendo feita corretamente                                                                                                                           | Não foi possível processar a transação. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a loja                                                                                               | Não                                                  |
| 39              | Transação não autorizada. Erro no banco emissor.                                                                                                              | Transação não autorizada. Erro no banco emissor.                                                                                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 41              | Transação não autorizada. Cartão bloqueado por perda.                                                                                                         | Transação não autorizada. Cartão bloqueado por perda.                                                                                                                                                                                                                                                               | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 43              | Transação não autorizada. Cartão bloqueado por roubo.                                                                                                         | Transação não autorizada. Cartão bloqueado por roubo.                                                                                                                                                                                                                                                               | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 51              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                                | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 52              | Cartão com dígito de controle inválido.                                                                                                                       | Não foi possível processar a transação. Cartão com dígito de controle inválido.                                                                                                                                                                                                                                     | Transação não autorizada. Reveja os dados informados e tente novamente.                                                                                                                                                   | Não                                                  |
| 53              | Transação não permitida. Cartão poupança inválido                                                                                                             | Transação não permitida. Cartão poupança inválido.                                                                                                                                                                                                                                                                  | Não foi possível processar a transação. Entre em contato com seu banco emissor.                                                                                                                                           | Não                                                  |
| 54              | Transação não autorizada. Cartão vencido                                                                                                                      | Transação não autorizada. Cartão vencido.                                                                                                                                                                                                                                                                           | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| 55              | Transação não autorizada. Senha inválida                                                                                                                      | Transação não autorizada. Senha inválida.                                                                                                                                                                                                                                                                           | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 57              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| 58              | Transação não permitida. Opção de pagamento inválida.                                                                                                         | Transação não permitida. Opção de pagamento inválida. Reveja se a opção de pagamento escolhida está habilitada no cadastro                                                                                                                                                                                          | Transação não autorizada. Entre em contato com sua loja virtual.                                                                                                                                                          | Não                                                  |
| 59              | Transação não autorizada. Suspeita de fraude.                                                                                                                 | Transação não autorizada. Suspeita de fraude.                                                                                                                                                                                                                                                                       | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 60              | Transação não autorizada.                                                                                                                                     | Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.                                                                                                                                                                                               | Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.                                                                                          | Apenas 4 vezes em 16 dias.                           |
| 61              | Banco emissor indisponível.                                                                                                                                   | Transação não autorizada. Banco emissor indisponível.                                                                                                                                                                                                                                                               | Transação não autorizada. Tente novamente. Se o erro persistir, entre em contato com seu banco emissor.                                                                                                                   | Apenas 4 vezes em 16 dias.                           |
| 62              | Transação não autorizada. Cartão restrito para uso doméstico                                                                                                  | Transação não autorizada. Cartão restrito para uso doméstico.                                                                                                                                                                                                                                                       | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 63              | Transação não autorizada. Violação de segurança                                                                                                               | Transação não autorizada. Violação de segurança.                                                                                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 64              | Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.                                                                                  | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                                                                                                                   | Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.                                                                                                                                              | Não                                                  |
| 65              | Transação não autorizada. Excedida a quantidade de transações para o cartão.                                                                                  | Transação não autorizada. Excedida a quantidade de transações para o cartão.                                                                                                                                                                                                                                        | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| 67              | Transação não autorizada. Cartão bloqueado para compras hoje.                                                                                                 | Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.                                                                                                                              | Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.                                                                                                                       | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 70              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                                | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 72              | Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.                                                                                   | Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                      | Cancelamento não efetuado. Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                                          | Não                                                  |
| 74              | Transação não autorizada. A senha está vencida.                                                                                                               | Transação não autorizada. A senha está vencida.                                                                                                                                                                                                                                                                     | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 75              | Senha bloqueada. Excedeu tentativas de cartão.                                                                                                                | Transação não autorizada.                                                                                                                                                                                                                                                                                           | Sua Transação não pode ser processada. Entre em contato com o Emissor do seu cartão.                                                                                                                                      | Não                                                  |
| 76              | Cancelamento não efetuado. Banco emissor não localizou a transação original                                                                                   | Cancelamento não efetuado. Banco emissor não localizou a transação original                                                                                                                                                                                                                                         | Cancelamento não efetuado. Entre em contato com a loja virtual.                                                                                                                                                           | Não                                                  |
| 77              | Cancelamento não efetuado. Não foi localizado a transação original                                                                                            | Cancelamento não efetuado. Não foi localizado a transação original                                                                                                                                                                                                                                                  | Cancelamento não efetuado. Entre em contato com a loja virtual.                                                                                                                                                           | Não                                                  |
| 78              | Transação não autorizada. Cartão bloqueado primeiro uso.                                                                                                      | Transação não autorizada. Cartão bloqueado primeiro uso. Solicite ao portador que desbloqueie o cartão diretamente com seu banco emissor.                                                                                                                                                                           | Transação não autorizada. Entre em contato com seu banco emissor e solicite o desbloqueio do cartão.                                                                                                                      | Não                                                  |
| 80              | Transação não autorizada. Divergencia na data de transação/pagamento.                                                                                         | Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.                                                                                                                                                                                                                                 | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| 82              | Transação não autorizada. Cartão inválido.                                                                                                                    | Transação não autorizada. Cartão Inválido. Solicite ao portador que reveja os dados e tente novamente.                                                                                                                                                                                                              | Transação não autorizada. Refazer a transação confirmando os dados. Se o erro persistir, entre em contato com seu banco emissor.                                                                                          | Não                                                  |
| 83              | Transação não autorizada. Erro no controle de senhas                                                                                                          | Transação não autorizada. Erro no controle de senhas                                                                                                                                                                                                                                                                | Transação não autorizada. Refazer a transação confirmando os dados. Se o erro persistir, entre em contato com seu banco emissor.                                                                                          | Não                                                  |
| 85              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                                   | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 86              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                                   | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 89              | Erro na transação.                                                                                                                                            | Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.                                                                                                                                                                         | Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.                                                                                               | Apenas 4 vezes em 16 dias.                           |
| 90              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                                   | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 91              | Transação não autorizada. Banco emissor temporariamente indisponível.                                                                                         | Transação não autorizada. Banco emissor temporariamente indisponível.                                                                                                                                                                                                                                               | Transação não autorizada. Banco emissor temporariamente indisponível. Entre em contato com seu banco emissor.                                                                                                             | Apenas 4 vezes em 16 dias.                           |
| 92              | Transação não autorizada. Tempo de comunicação excedido.                                                                                                      | Transação não autorizada. Tempo de comunicação excedido.                                                                                                                                                                                                                                                            | Transação não autorizada. Comunicação temporariamente indisponível. Entre em contato com a loja virtual.                                                                                                                  | Apenas 4 vezes em 16 dias.                           |
| 93              | Transação não autorizada. Violação de regra - Possível erro no cadastro.                                                                                      | Transação não autorizada. Violação de regra - Possível erro no cadastro.                                                                                                                                                                                                                                            | Sua transação não pode ser processada. Entre em contato com a loja virtual.                                                                                                                                               | Não                                                  |
| 96              | Falha no processamento.                                                                                                                                       | Não foi possível processar a transação. Falha no sistema da Cielo. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                               | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | Apenas 4 vezes em 16 dias.                           |
| 97              | Valor não permitido para essa transação.                                                                                                                      | Transação não autorizada. Valor não permitido para essa transação.                                                                                                                                                                                                                                                  | Transação não autorizada. Valor não permitido para essa transação.                                                                                                                                                        | Não                                                  |
| 98              | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.                                                                                                                                                                                            | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | Apenas 4 vezes em 16 dias.                           |
| 99              | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde. Pode ser erro no SITEF, favor verificar !                                                                                                                                                                                           | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 999             | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde. Pode ser erro no SITEF, favor verificar !                                                                                                                                                                                           | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| AA              | Tempo Excedido                                                                                                                                                | Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.                                                                                                                                             | Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.                                                                                   | Apenas 4 vezes em 16 dias.                           |
| AC              | Transação não permitida. Cartão de débito sendo usado com crédito. Use a função débito.                                                                       | Transação não permitida. Cartão de débito sendo usado com crédito. Solicite ao portador que selecione a opção de pagamento Cartão de Débito.                                                                                                                                                                        | Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de débito.                                                                                                                             | Não                                                  |
| AE              | Tente Mais Tarde                                                                                                                                              | Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.                                                                                                                                             | Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.                                                                                   | Apenas 4 vezes em 16 dias.                           |
| AF              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                                   | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| AG              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                                   | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| AH              | Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.                                                                      | Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.                                                                                                                                                                       | Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.                                                                                                                            | Não                                                  |
| AI              | Transação não autorizada. Autenticação não foi realizada.                                                                                                     | Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)                                                    | Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.                                    | Não                                                  |
| AJ              | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label. | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação.              | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual. | Não                                                  |
| AV              | Transação não autorizada. Dados Inválidos                                                                                                                     | Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.                                                                                                                                                                                                                  | Falha na validação dos dados. Reveja os dados informados e tente novamente.                                                                                                                                               | Apenas 4 vezes em 16 dias.                           |
| BD              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                                   | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| BL              | Transação não autorizada. Limite diário excedido.                                                                                                             | Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                                                  | Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.                                                                                                                                 | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| BM              | Transação não autorizada. Cartão Inválido                                                                                                                     | Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.                                                                                                        | Transação não autorizada. Cartão inválido. Refaça a transação confirmando os dados informados.                                                                                                                            | Não                                                  |
| BN              | Transação não autorizada. Cartão ou conta bloqueado.                                                                                                          | Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                          | Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com seu banco emissor.                                                                                                         | Não                                                  |
| BO              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.                                                                                                                                   | Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.                                                                  | Apenas 4 vezes em 16 dias.                           |
| BP              | Transação não autorizada. Conta corrente inexistente.                                                                                                         | Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                 | Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.                                                                | Não                                                  |
| BV              | Transação não autorizada. Cartão vencido                                                                                                                      | Transação não autorizada. Cartão vencido.                                                                                                                                                                                                                                                                           | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| CF              | Transação não autorizada.C79:J79 Falha na validação dos dados.                                                                                                | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                              | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| CG              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                              | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DA              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                              | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DF              | Transação não permitida. Falha no cartão ou cartão inválido.                                                                                                  | Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco                                                                                                                                        | Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco                                                                       | Apenas 4 vezes em 16 dias.                           |
| DM              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                                | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| DQ              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                              | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DS              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| EB              | Transação não autorizada. Limite diário excedido.                                                                                                             | Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                                                  | Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.                                                                                                                                 | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| EE              | Transação não permitida. Valor da parcela inferior ao mínimo permitido.                                                                                       | Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.                                                                                                                                                      | Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.                                                                                                         | Não                                                  |
| EK              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| FA              | Transação não autorizada.                                                                                                                                     | Transação não autorizada AmEx.                                                                                                                                                                                                                                                                                      | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| FC              | Transação não autorizada. Ligue Emissor                                                                                                                       | Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.                                                                                                                                                                                                                               | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| FD              | Transação negada. Reter cartão condição especial                                                                                                              | Transação não autorizada por regras do banco emissor.                                                                                                                                                                                                                                                               | Transação não autorizada. Entre em contato com seu banco emissor                                                                                                                                                          | Não                                                  |
| FE              | Transação não autorizada. Divergencia na data de transação/pagamento.                                                                                         | Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.                                                                                                                                                                                                                                 | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| FF              | Cancelamento OK                                                                                                                                               | Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.                                                                                                                                                                             | Transação de cancelamento autorizada com sucesso                                                                                                                                                                          | Não                                                  |
| FG              | Transação não autorizada. Ligue AmEx.                                                                                                                         | Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.                                                                                                                                                                                                                 | Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090                                                                                                                      | Não                                                  |
| FG              | Ligue 08007285090                                                                                                                                             | Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.                                                                                                                                                                                                                 | Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090                                                                                                                      | Não                                                  |
| GA              | Aguarde Contato                                                                                                                                               | Transação não autorizada. Referida pelo Lynx Online de forma preventiva. A Cielo entrará em contato com o lojista sobre esse caso.                                                                                                                                                                                  | Transação não autorizada. Entre em contato com o lojista.                                                                                                                                                                 | Não                                                  |
| HJ              | Transação não permitida. Código da operação inválido.                                                                                                         | Transação não permitida. Código da operação Coban inválido.                                                                                                                                                                                                                                                         | Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.                                                                                                                               | Não                                                  |
| IA              | Transação não permitida. Indicador da operação inválido.                                                                                                      | Transação não permitida. Indicador da operação Coban inválido.                                                                                                                                                                                                                                                      | Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.                                                                                                                            | Não                                                  |
| JB              | Transação não permitida. Valor da operação inválido.                                                                                                          | Transação não permitida. Valor da operação Coban inválido.                                                                                                                                                                                                                                                          | Transação não permitida. Valor da operação Coban inválido. Entre em contato com o lojista.                                                                                                                                | Não                                                  |
| KA              | Transação não permitida. Falha na validação dos dados.                                                                                                        | Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.                                                                                                                | Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                   | Não                                                  |
| KB              | Transação não permitida. Selecionado a opção incorrente.                                                                                                      | Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.                                                                                                               | Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                                                         | Não                                                  |
| KE              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.                                                                                                                                                                     | Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.                                                                                       | Não                                                  |
| N7              | Transação não autorizada. Código de segurança inválido.                                                                                                       | Transação não autorizada. Código de segurança inválido. Oriente o portador corrigir os dados e tentar novamente.                                                                                                                                                                                                    | Transação não autorizada. Reveja os dados e informe novamente.                                                                                                                                                            | Não                                                  |
| R1              | Transação não autorizada. Cartão inadimplente (Do not honor).                                                                                                 | Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.                                                                                                                                                                             | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| U3              | Transação não permitida. Falha na validação dos dados.                                                                                                        | Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.                                                                                                                | Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                   | Não                                                  |
| GD              | Transação não permitida                                                                                                                                       | Transação não permitida                                                                                                                                                                                                                                                                                             | Transação não é possível ser processada no estabelecimento. Entre em contato com a Cielo para obter mais detalhes Transação                                                                                               | Não                                                  |
| BP171           | Rejeitado por risco de Fraude                                                                                                                                 | Transação rejeitada por risco de fraude                                                                                                                                                                                                                                                                             | Transação rejeitada por risco de fraude                                                                                                                                                                                   | Nâo                                                  |

### Status do Antifraude

| Campo | Definição                |
| :---: | ------------------------ |
| **0** | N\A                      |
| **1** | Risco baixo              |
| **2** | Risco Alto               |
| **3** | Não finalizada           |
| **4** | Risco Moderado           |
| **5** | Autenticado              |
| **6** | Não contratado           |
| **7** | Dispensado               |
| **8** | Não Aplicavel            |
| **9** | Transaçõe de Recorrência |
