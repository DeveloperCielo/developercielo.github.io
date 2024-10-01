---
layout: redirect
redirect: https://docs.cielo.com.br/link/reference/consultar-transa%C3%A7%C3%A3o
title: API de Controle Transacional
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 3
tags:
  - 2. Checkout e Link de Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

<aside class="warning"> O conteúdo deste manual foi descontinuado e não é atualizado desde 14/08/2024. Acesse o novo portal.</aside>

# As documentações do Link de Pagamento e Checkout Cielo estão em um novo portal

[![Novo portal de desenvolvedores e-commerce Braspag e Cielo]({{ site.baseurl_root }}/images/apicieloecommerce/novo-docs.cielo.com.br.png)](https://docs.cielo.com.br/link/docs/checkout-e-link-cielo)

Acesse o novo portal de desenvolvedores E-commerce **[docs.cielo.com.br](https://docs.cielo.com.br)**.

> **Atenção**: O conteúdo desta página está sendo descontinuado e não receberá atualizações a partir de 14/08/2024. Visite a nova documentação em [docs.cielo.br](https://docs.cielo.com.br/checkout-e-link-cielo).

--------------------------------------------------------------------------------------------------------------------------

<aside class="warning"> O conteúdo a seguir não é atualizado desde 14/08/2024.</aside>

# Cielo OAUTH

O Cielo OAUTH é um processo de autenticação utilizado em APIs Cielo que são correlacionadas a produtos E-commerce. Ele utiliza como segurança o protocolo [OAUTH2](https://oauth.net/2/), onde é necessário primeiramente obter um token de acesso, utlizando suas credenciais, que deverá posteriormente ser enviado à API CieloOAuth

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

### Códigos de retorno ABECS

A Associação Brasileira das Empresas de Cartão de Crédito e Serviços (ABECS) é responsável pela padronização do **código de retorno das autorizações de vendas negadas** tanto para as soluções pagamento do mundo físico quanto de e-commerce do mercado brasileiro.

> Para ver a relação completa dos códigos de retorno das transações negadas, acesse a tabela [Códigos de retorno ABECS](https://developercielo.github.io/tutorial/abecs-e-outros-codigos){:target="_blank"}.

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
