---
layout: manual
title: API Super Link
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 2
tags:
  - Checkout Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Cielo OAUTH

O Cielo OAUTH é um processo de autenticação utilizado em APIs Cielo que são correlacionadas a produtos E-commerce. Ele utiliza como segurança o protocolo **[OAUTH2](https://oauth.net/2/)**, onde é necessário primeiramente obter um token de acesso, utlizando suas credenciais, que deverá posteriormente ser enviado à API CieloOAuth

> Para gerar o `ClientID` e o `ClientSecret`, consulte o tópico de Obter Credenciais.

Para utilizar o Cielo Oauth são necessarias as seguintes credenciais:

| PROPRIEDADE    | DESCRIÇÃO                                                             | TIPO   |
| -------------- | --------------------------------------------------------------------- | ------ |
| `ClientId`     | Identificador chave fornecido pela CIELO                              | guid   |
| `ClientSecret` | Chave que valida o ClientID. Fornecida pela Cielo junto ao `ClientID` | string |

## Obter Credenciais

Para obter as credênciais no Checkout Cielo, basta seguir o fluxo abaixo:

1. Acessar o site Cielo
2. Super Link
3. Configurações
4. Dados da loja
5. Gerar chaves da API

## Token de acesso

Para obter acesso a serviços Cielo que utilizam o `Cielo Oauth`, será necessário obter um token de acesso, conforme os passos abaixo:

1. Concatenar o _ClientId_ e o _ClientSecret_, **ClientId:ClientSecret**
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
  "access_token":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6Ik1ldUNoZWNrb3V0IE1hc3RlciBLZXkiLCJjbGllbnRfaWQiOiJjODlmZGasdasdasdmUyLTRlNzctODA2YS02ZDc1Y2QzOTdkYWMiLCJzY29wZXMiOiJ7XCJTY29wZVwiOlwiQ2hlY2tvdXRBcGlcIixcIkNsYWltc1wiOltdfSIsInJvbGUiOiJasdasdasd291dEFwaSIsImlzc47I6Imh0dHBzOi8vYXV0aGhvbasdasdnJhc3BhZy5jb20uYnIiLCJhdWQiOiJVVlF4Y1VBMmNTSjFma1EzSVVFbk9pSTNkbTl0ZmasdsadQjVKVVV1UVdnPSIsImV4cCI6MTQ5Nzk5NjY3NywibmJmIjoxNDk3OTEwMjc3fQ.ozj4xnH9PA3dji-ARPSbI7Nakn9dw5I8w6myBRkF-uA",
  "token_type": "bearer",
  "expires_in": 1199
}
```

| PROPRIEDADE    | DESCRIÇÃO                                                 | TIPO   |
| -------------- | --------------------------------------------------------- | ------ |
| `Access_token` | Utilizado para acesso aos serviços da API                 | string |
| `Token_type`   | Sempre será do tipo `bearer`                              | texto  |
| `Expires_in`   | Validade do token em segundos. Aproximadamente 20 minutos | int    |

> O token retornado (access_token) deverá ser utilizado em toda requisição como uma chave de autorização, destacando que este possui uma validade de 20 minutos (1200 segundos) e após esse intervalo, será necessário obter um novo token para acesso aos serviços Cielo.

# Link de Pagamento

A **API Link de Pagamentos** permite ao lojista criar, editar e consultar links de pagamentos.

Seu principal objetivo é permitir que lojas possam criar links de pagamento (Botões ou QR Codes), através de seus próprios sistemas, sem a necessidade de acessar o Backoffice do Checkout Cielo e compartilhar com seus clientes.

> **Atenção**:
>
> * O link de pagamentos não é uma URL DE **PEDIDO/TRANSAÇÃO**. Ele é um "carrinho" que pode ser reutilizado inúmeras vezes.
> * Para receber notificações sobre transações originadas de Links de pagamento é **OBRIGATÓRIO** o cadastro da **URL de Notificação** no backoffice do Checkout.

## Autenticação

O Processo de autenticação na API do link de pagamento é o **[Cielo OAUTH](https://docscielo.github.io/Pilots/manual/linkdepagamentos5#cielo-oauth)**

## Criar Link

### Request

Para criar link de pagamentos Checkout, basta enviar realizar um POST com os dados do Link ao endpoint:

<aside class="request"><span class="method post">POST</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/</span></aside>

> Header: `Authorization: Bearer {access_token}`

```json
{
  "Type": "Digital",
  "name": "Pedido",
  "description": "teste description",
  "price": "1000000",
  "weight": 2000000,
  "ExpirationDate": "2037-06-19",
  "maxNumberOfInstallments": "1",
  "quantity": 2,
  "Sku": "teste",
  "shipping": {
    "type": "WithoutShipping",
    "name": "teste",
    "price": "1000000000"
  },
  "SoftDescriptor": "Pedido1234"
}
```

**Dados do produto**

| PROPRIEDADE               | DESCRIÇÃO                                                                                                                                                                                                                             | TIPO   | TAMANHO    | OBRIGATÓRIO |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------- | ----------- |
| `name`                    | Nome do produto                                                                                                                                                                                                                       | String | 128        | SIM         |
| `description`             | Descrição do produto que será exibida na tela de Checkout caso a opção `show_description` seja verdadeira.                                                                                                                            | String | 512        |             |
| `showDescription`         | Flag indicando se a descrição deve ou não ser exibida na tela de Checkout                                                                                                                                                             | String | --         | Não         |
| `price`                   | Valor do produto em **centavos**                                                                                                                                                                                                      | Int    | 1000000    | SIM         |
| `expirationDate`          | Data de expiração do link. Caso uma data senha informada, o link se torna indisponível na data informada. Se nenhuma data for informada, o link não expira.                                                                           | String | YYYY-MM-DD | Não         |
| `weight`                  | Peso do produto em **gramas**                                                                                                                                                                                                         | String | 2000000    | Não         |
| `softDescriptor`          | Descrição a ser apresentada na fatura do cartão de crédito do portador.                                                                                                                                                               | String | 13         | Não         |
| `maxNumberOfInstallments` | Número máximo de parcelas que o comprador pode selecionar na tela de Checkout.Se não informado será utilizada as configurações da loja no Checkout Cielo.                                                                             | int    | 2          | Não         |
| `type`                    | Tipo de venda a ser realizada através do link de pagamento: <br><br>**Asset** – Material Físico<br>**Digital** – Produto Digital<br>**Service** – Serviço<br>**Payment** – Pagamentos Simples<br>**Recurrent** – Pagamento Recorrente | String | 255        | SIM         |

> Dentro de `Description` Pode-se utilizar o caracter pipe `|` caso seja desejável quebrar a linha ao apresentar a descrição na tela de Checkout

**Dados do Frete**

| PROPRIEDADE              | DESCRIÇÃO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | TIPO   | TAMANHO | OBRIGATÓRIO |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| **shipping**             | Nó contendo informações de entrega do produto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |        |         |             |
| `shipping.name`          | Nome do frete. **Obrigatório para frete tipo “FixedAmount”**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | string | 128     | Sim         |
| `shipping.price`         | O valor do frete. **Obrigatório para frete tipo “FixedAmount”**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | int    | 100000  | Sim         |
| `shipping.originZipCode` | Cep de origem da encomenda. Obrigatório para frete tipo “Correios”. Deve conter apenas números                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | string | 8       | Não         |
| `shipping.type`          | Tipo de frete.<br>**Correios** – Entrega pelos correios<br>**FixedAmount** – Valor Fixo<br>**Free** - Grátis<br>**WithoutShippingPickUp** – Sem entrega com retirada na loja<br>**WithoutShipping** – Sem entrega<br><br>Se o tipo de produto escolhido for “**Asset**”, os tipos permitidos de frete são: _**“Correios, FixedAmount ou Free”**_.<br><br>Se o tipo produto escolhido for “**Digital**” ou “**Service**”, os tipos permitidos de frete são: _**“WithoutShipping, WithoutShippingPickUp”**_.<br><br>Se o tipo produto escolhido for “**Recurrent**” o tipo de frete permitido é: _**“WithoutShipping”**_. | string | 255     | Sim         |

**Dados da Recorrência**

| PROPRIEDADE          | DESCRIÇÃO                                                                                                                                                                           | TIPO   | TAMANHO | OBRIGATÓRIO |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| **recurrent**        | Nó contendo informações da recorrência do pagamento.Pode ser informado caso o tipo do produto seja “Recurrent”                                                                      |        |         |             |
| `recurrent.interval` | Intervalo de cobrança da recorrência.<br><br>**Monthly** - Mensal<br>**Bimonthly** - Bimensal<br>**Quarterly** - Trimestral<br>**SemiAnnual** - Semestral<br>**Annual** – Anual<br> | string | 128     | Não         |
| `recurrrent.endDate` | Data de término da recorrência. Se não informado a recorrência não terá fim, a cobrança será realizada de acordo com o intervalo selecionado indefinidamente.                       | string | 128     | Não         |

### Response

> "HTTP Status": 201 – Created

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00",
  "showDescription": false,
  "price": 8000,
  "weight": 4500,
  "shipping": {
    "type": "Correios",
    "originZipcode": "06455030"
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2017-06-30T00:00:00",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

Os dados retornados na resposta contemplam todos os enviados na requisição e dados adicionais referentes a criação do link.

| PROPRIEDADE | TIPO   | DESCRIÇÃO                                                                                                                     |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `id`        | guid   | Identificador único do link de pagamento.Pode ser utilizado para consultar, atualizar ou excluir o link.                      |
| `shortUrl`  | string | Representa o link de pagamento que ao ser aberto, em um browser, apresentará a tela do Checkout Cielo.                        |
| `links`     | object | Apresenta as operações disponíveis e possíveis (RESTful hypermedia) de serem efetuadas após a criação ou atualização do link. |

## Consultar Link

### Request

Para consultar um link existente basta realizar um `GET` informando o `ID` do link.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

> **Header:** Authorization: Bearer {access_token}

### Response

> HTTP Status: 200 – OK

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00",
  "showDescription": false,
  "price": 8000,
  "weight": 4500,
  "shipping": {
    "type": "Correios",
    "originZipcode": "06455030"
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2017-06-30",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        " https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

| PROPRIEDADE | TIPO   | DESCRIÇÃO                                                                                                                     |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `id`        | guid   | Identificador único do link de pagamento.Pode ser utilizado para consultar, atualizar ou excluir o link.                      |
| `shortUrl`  | string | Representa o link de pagamento que ao ser aberto, em um browser, apresentará a tela do Checkout Cielo.                        |
| `links`     | object | Apresenta as operações disponíveis e possíveis (RESTful hypermedia) de serem efetuadas após a criação ou atualização do link. |

> **OBS**: O Response da consulta contem os mesmos dados retornados na criação do link.

## Atualizar Link

### Request

Para Atualizar um link existente basta realizar um `GET` informando o `ID` do link.

<aside class="request"><span class="method put">PUT</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

> **Header**: Authorization: Bearer {access_token}

```json
{
  "Type": "Asset",
  "name": "Pedido ABC",
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "price": 9000,
  "expirationDate": "2017-06-30",
  "weight": 4700,
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "SoftDescriptor": "Pedido1234",
  "maxNumberOfInstallments": 2
}
```

### Response

> HTTP Status: 200 – OK

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "showDescription": false,
  "price": 9000,
  "weight": 4700,
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2017-06-30",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

| PROPRIEDADE | TIPO   | DESCRIÇÃO                                                                                                                     |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `id`        | guid   | Identificador único do link de pagamento.Pode ser utilizado para consultar, atualizar ou excluir o link.                      |
| `shortUrl`  | string | Representa o link de pagamento que ao ser aberto, em um browser, apresentará a tela do Checkout Cielo.                        |
| `links`     | object | Apresenta as operações disponíveis e possíveis (RESTful hypermedia) de serem efetuadas após a criação ou atualização do link. |

> **OBS**: O Response da consulta contem os mesmos dados retornados na criação do link.

## Excluir Link

### Request

Para excluir um link existente basta realizar um `DELETE` informando o `ID` do link.

<aside class="request"><span class="method delete">DELETE</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

> **Header:** Authorization: Bearer {access_token}

### Response

> HTTP Status: 204 – No Content

## Códigos de Status HTTP

| CÓDIGO                          | DESCRIÇÃO                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **200 - OK**                    | Tudo funcionou corretamente.                                                                               |
| **400 – Bad Request**           | A requisição não foi aceita. Algum parâmetro não foi informado ou foi informado incorretamente.            |
| **401 - Unauthorized**          | O token de acesso enviado no header da requisição não é válido.                                            |
| **404 – Not Found**             | O recurso sendo acessado não existe. Ocorre ao tentar atualizar, consultar ou excluir um link inexistente. |
| **500 – Internal Server Error** | Ocorreu um erro no sistema.                                                                                |
