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
  - Link de Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# Objetivo

Este manual irá guiar o desenvolvedor na integração com a **API Super Link** da Cielo. Após realizar as integrações descritas será possível:

- Criar e editar Links de Pagamento via API;
- Receber notificações de pagamentos;
- Consultar pagamentos;
- Configurar a sua loja da maneira adequada.

# Sobre o Super Link

A API Link de Pagamentos permite ao lojista criar, editar e consultar links de pagamentos.
Seu principal objetivo é permitir que lojas possam criar links de pagamento (Botões ou QR Codes), através de seus próprios sistemas, sem a necessidade de acessar o Backoffice e compartilhar com seus clientes.

> **Atenção**:
>
> O link de pagamentos não é uma URL DE **PEDIDO/TRANSAÇÃO**. Ele é um "carrinho" que pode ser reutilizado inúmeras vezes.<br>
> Para receber notificações sobre transações originadas de Links de pagamento é **OBRIGATÓRIO** o cadastro da **URL de Notificação** no backoffice do Checkout.<br>
> A consulta de transações realizadas através do Super Link pode ser feita através da **API de controle transacional**.<br>

# Modo teste

## Sandbox

Por se tratar de uma chamada não financeira, a API de Super Link não possui um Sand Box para testar a criação de links. Os Links devem ser criados a partir de um cadastro de produção. O credenciamento pode ser feito através do site Cielo pelo próprio cliente ou por meio de uma solicitação do Gestor comercial do estabelecimento.

<aside class="warning"><b>Suporte:<br>
cieloecommerce@cielo.com.br<br>
+55 11 4002-9700<br>
0800-570-1700
</b></aside>

Os testes financeiros podem ser executados a partir da ativação do modo teste nas configuração da sua loja.

## Ativação do Modo de Teste

O modo de teste pode ser ativado na aba **Configurações**, onde existe um caixa de seleção, que quando marcada, habilitará o modo de teste do Checkout Cielo. O modo somente se iniciará quando a seleção for salva.

![Ativando Modo de teste]({{ site.baseurl_root }}/images/checkout/tm01.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) e na tela transacional do Checkout Cielo.

Essa tarja indica que a sua loja Checkout Cielo está agora operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

| Backoffice                                                                               | Transacional                                                                                 |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![Tarja vermelha - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png) | ![Tarja vermelha - Transacional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png) |

## Como transacionar no Modo de teste

A realização de transações no modo de teste ocorre de forma normal. As informações da transação são enviadas via POST ou API, utilizando os parâmetros como descrito no tópico [Integração por API](https://developercielo.github.io/manual/checkout-cielo#integra%C3%A7%C3%A3o-por-api), entretanto, os meios de pagamentos a serem usados serão meios simulados.

Para realizar transações de teste com diferentes meios de pagamento, siga as seguintes regras:

**A - Transações com Cartão de crédito:**

Para testar cartões de crédito é necessário que dois dados importantes sejam definidos, o status da autorização do cartão e o retorno da analise de fraude.

**Status da Autorização do Cartão de Crédito**

| Status da Transação | Cartões para realização dos testes        |
| ------------------- | ----------------------------------------- |
| Autorizado          | 0000.0000.0000.0000 / 0000.0000.0000.0004 |
| Não Autorizado      | 0000.0000.0000.0005 / 0000.0000.0000.0009 |

**Exemplo:** 540443424293010**0** = **Autorizado**

**B - Boleto Bancário**

Basta realizar o processo de compra normalmente sem nenhuma alteração no procedimento.
O boleto gerado no modo de teste sempre será um boleto simulado.

**C - Debito online**

É necessário informa o status da transação de Debito online para que seja retornado o status desejado. Esse processo ocorre como no antifraude do cartão de crédito descrito acima, com a alteração do nome do comprador.

**Status do Débito**

| Sobre nome do cliente | Status         |
| --------------------- | -------------- |
| Pago                  | Pago           |
| Qualquer nome.        | Não autorizado |

- **Exemplo:** Status não Autorizado.
- **Nome do Cliente:** Maria Pereira

**D - Transações de teste**

Todas as transações realizadas no modo de teste serão exibidas como transações normais na aba Pedidos do Checkout Cielo, entretanto, elas serão marcadas como transações de teste e não serão contabilizadas em conjunto com as transações realizadas fora do ambiente de teste.

![Transações de teste]({{ site.baseurl_root }}/images/checkout-cielo-modo-teste-transacoes-de-teste.png)

Essas transações terão o símbolo de teste as diferenciando de suas outras transações. Elas podem ser capturadas ou canceladas utilizando os mesmos procedimentos das transações reais.

![Transações de teste]({{ site.baseurl_root }}/images/checkout-cielo-modo-teste-transacoes-de-teste-cancelamento.png)

<aside class="notice">É muito importante que ao liberar sua loja para a realização de vendas para seus clientes que **ela não esteja em modo de teste**. Transações realizadas nesse ambiente poderão ser finalizadas normalmente, mas **não serão descontadas do cartão do cliente** e não poderão ser “transferidas” para o ambiente de venda padrão.</aside>

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

> O token retornado (access_token) deverá ser utilizado em toda requisição como uma chave de autorização, destacando que este possui uma validade de 20 minutos (1200 segundos) e após esse intervalo, será necessário obter um novo token para acesso aos serviços Cielo.

# Link de Pagamento

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
| `quantity`                | Número de transações restantes até que o link deixe de funcionar                                                                                                                                                                      | int    | 2          | Não         |
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
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
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
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href": " https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
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
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
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
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
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
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href": "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
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

# Notificações de Pagamento

O processo de notificação transacional no Checkout Cielo ocorre via a inclusão de uma URL para onde serão direcionados dados das transações realizadas na plataforma.
Vale destacar que o Checkout realiza a notificação somente quando uma transação é considerada finalizada ou seja, o comprador preencheu todos os dados da tela de pagamento e clicou em "Finalizar".

## Tipos de notificação

O Checkout Cielo possui dois tipos de notificações que o lojista pode utilizar de acordo com suas necessidades:

| Tipo   | Descrição                                                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | Notificação onde o lojista é passivo. Dois `POST HTTP` são disparados, um informando dados da venda e outra mudança de Status da transação       |
| `JSON` | Notificação onde o lojista realiza uma consulta. Um `POST` contendo informações para a realização de uma consulta (`GET`) as transações checkout |

Para utilizar ambos os modelos, o lojista necessitará acessar o Backoffice cielo e configurar tanto a `URL de NOTIFICAÇÃO` quando a `URL de MUDANÇA de STATUS`.

### Tipos de URL de Notificação

O Checkout possui 3 tipos de URL que podem impactar o processo de notificação.

| Tipo                       | Descrição                                                                                                                                                                                                                                                    | Observação                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `URL de Retorno`           | Página web na qual o comprador será redirecionado ao fim da compra. <br>Nenhum dado é trocado ou enviado para essa URL.<br> Essa URL apenas leva o comprador, após finalizar a compra, a uma página definida pela loja.                                      | Caso o Lojista deseje, ele pode configurar essa página para ser sensibilizada por tráfego, assim identificando que a transação foi finalizada no Checkout Cielo <br> Pode ser enviada via API - Ver "Integração por API" |
| `URL de Notificação`       | Ao finalizar uma transação é enviado um POST HTTP com todos os dados da venda para a URL de Notificação.<br> O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do **status da transação** | Utilizada na Notificação via `POST`e `JSON`                                                                                                                                                                              |
| `URL de Mudança de Status` | Quando um pedido tiver seu status alterado, será enviando um post HTTP para a URL de Mudança de Status.<br> O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido                                                | Utilizada somente na Notificação via `POST`                                                                                                                                                                              |

**OBS:** Caso uma `URL de retorno` seja enviada vai API, ela terá prioridade sobre a URL cadastrada no Backoffice / Na integração Checkout Cielo `via Botão`, só é possível usar a opção de URL de retorno via backoffice.

**Características das URLs**

Todas as 3 URLs devem possuir as seguintes características:

- Devem ser URLs estáticas
- Devem possuir menos de 255 caracteres
- Caracteres especiais não são suportados

**Configurando as URLs**

1. Basta acessar dentro do **Backoffice** as Abas **Configurações**
2. Em **Configurações da Loja**, Vá a sessão de **Pagamentos**
3. Cadastre as URLS e escolhe o tipo de Notificação desejado

![Cadastro de URLS]({{ site.baseurl_root }}/images/checkout/urls.png)

### Notificação: POST

A notificação via POST é baseada no envio de um `POST HTTP` quando uma transação é realizada. Ela é realizada em duas etapas:

1. `POST de NOTIFICAÇÃO` - Ocorre quando a transação é finalizada. Esse POST possui todos os dados do pedido, incluindo o STATUS inicial da transação.
2. `POST de MUDANÇA DE STATUS` - Ocorre quando uma transação possui seu STATUS alterado - **EX:** "Autorizado" > > > "Pago"

Este fluxo é utilizado por lojas que ainda não realizam transações via API.

Abaixo o Fluxo de uma Notificação POST

![Fluxo N.POST]({{ site.baseurl_root }}/images/checkout/npost.png)

**Retorno aguardado para o envio da notificação:** `HttpStatus = 200 (OK)` - Post recebido e processado com sucesso

**IMPORTANTE** Se a `URL de Notificação` cadastrada retornar algum erro/estiver indisponível, serão realizadas \*_3 novas tentativas, com intervalo de 1 hora entre cada POST_.

Caso o POST não seja recebido, é possível reenvia-lo manualmente, basta acessar o pedido em questão pelo Backoffice e clicar no Ícone de envio:

![Reenvio de notificação]({{ site.baseurl_root }}/images/checkout/reenvipost.png)

Veja a descrição dos itens de notificação na sessão **"Conteúdo do POST de NOTIFICAÇÃO"**

### Notificação: JSON

A notificação vai JSON é um método mais seguro e flexível para o lojista de realizar uma consulta no Chekcout Cielo.
Essa modalidade de notificação é baseada em um `POST JSON`, onde o lojista recebe credenciais para que uma consulta (`GET`) possa ser realizado junto a base de dados Checkout Cielo.

Ela é realizada em duas etapas:

1. `POST de NOTIFICAÇÃO` - Ocorre quando a transação é finalizada. Possui as Credenciais necessárias consultas transacionais.
2. `CONSULTA TRANSACIONAL` - Com as credenciais de consulta, o lojista busca dados da venda junto ao Checkout Cielo

Na Notificação de JSON, não há diferença entre o `POST de Notificação` e `Mudança de Status`. Sempre que algo ocorrer na transação, o lojista receberá um `POST de Notificação`

Abaixo o Fluxo de uma Notificação JSON (Criação da transação + Mudança de status)

![Fluxo N.JSON]({{ site.baseurl_root }}/images/checkout/njson.png)

#### Conteúdo do POST de NOTIFICAÇÃO JSON:

| Parâmetro             | Descrição                                                                                                              | Tipo do Campo       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `URL`                 | URL com os dados necessários para realizar a busca dos dados da transação.                                             | String              |
| `MerchantId`          | Identificador da loja no Checkout Cielo; consta no Backoffice no menu Configuração/Dados Cadastrais.                   | Alfanumérico (GUID) |
| `MerchantOrderNumber` | Número do pedido da loja; se não for enviado, o Checkout Cielo gerará um número, que será visualizado pelo Consumidor. | Alfanumérico        |

**Exemplo de uma consulta:**

#### Request

```shell
curl
--request GET https://cieloecommerce.cielo.com.br/api/public/v1/orders/{merchantId}/{merchantOrderNumber}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Propriedade  | Descrição             | Tipo | Tamanho | Obrigatório |
| ------------ | --------------------- | ---- | ------- | ----------- |
| `MerchantId` | Identificador da loja | Guid | 36      | Sim         |

#### Response

```json
{
  "order_number": "Pedido01",
  "amount": 101,
  "discount_amount": 0,
  "checkout_cielo_order_number": "65930e7460bd4a849502ed14d7be6c03",
  "created_date": "12-09-2017 14:38:56",
  "customer_name": "Test Test",
  "customer_phone": "21987654321",
  "customer_identity": "84261300206",
  "customer_email": "test@cielo.com.br",
  "shipping_type": 1,
  "shipping_name": "Motoboy",
  "shipping_price": 1,
  "shipping_address_zipcode": "21911130",
  "shipping_address_district": "Freguesia",
  "shipping_address_city": "Rio de Janeiro",
  "shipping_address_state": "RJ",
  "shipping_address_line1": "Rua Cambui",
  "shipping_address_line2": "Apto 201",
  "shipping_address_number": "92",
  "payment_method_type": 1,
  "payment_method_brand": 1,
  "payment_maskedcreditcard": "471612******7044",
  "payment_installments": 1,
  "payment_status": 3,
  "tid": "10447480686J51OH8BPB",
  "test_transaction": "False"
}
```

Veja a descrição dos itens de notificação na sessão **"Conteúdo do POST de NOTIFICAÇÃO"**

**Retorno aguardado para o envio da notificação:** `HttpStatus = 200 (OK)` - Post recebido e processado com sucesso

**IMPORTANTE** Se a `URL de Notificação` cadastrada retornar algum erro/estiver indisponível, serão realizadas \*_3 novas tentativas, com intervalo de 1 hora entre cada POST_.

Caso o POST não seja recebido, é possível reenvia-lo manualmente, basta acessar o pedido em questão pelo Backoffice e clicar no Ícone de envio:

![Reenvio de notificação]({{ site.baseurl_root }}/images/checkout/reenvipost.png)

### Conteúdo da Notificação

Tanto na Notificação via POST HTTP ou POST JSON, o conteúdo dos dados retornados é o mesmo.
Abaixo são descritos todos os campos retornados, assim como suas definições e tamanhos:

#### Conteúdo do POST de NOTIFICAÇÃO:

| Parâmetro                            | Descrição                                                                                                    | Tipo do campo | Tamanho máximo |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------- | -------------- |
| `checkout_cielo_order_number`        | Identificador único gerado pelo CHECKOUT CIELO                                                               | Alfanumérico  | 32             |
| `amount`                             | Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)                                                   | Numérico      | 10             |
| `order_number`                       | Número do pedido enviado pela loja                                                                           | Alfanumérico  | 32             |
| `created_date`                       | Data da criação do pedido - `dd-MM-yyyy HH:mm:ss`                                                            | Alfanumérico  | 20             |
| `customer_name`                      | Nome do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO                       | Alfanumérico  | 289            |
| `customer_identity`                  | Identificação do consumidor (CPF ou CNPJ) Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO | Alfanumérico  | 14             |
| `customer_email`                     | E-mail do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO                     | Alfanumérico  | 64             |
| `customer_phone`                     | Telefone do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO                   | Numérico      | 11             |
| `discount_amount`                    | Valor do desconto fornecido (enviado somente se houver desconto)                                             | Numérico      | 10             |
| `shipping_type`                      | Modalidade de frete                                                                                          | Numérico      | 1              |
| `shipping_name`                      | Nome do frete                                                                                                | Alfanumérico  | 128            |
| `shipping_price`                     | Valor do serviço de frete, em centavos (ex: R$ 10,00 = 1000)                                                 | Numérico      | 10             |
| `shipping_address_zipcode`           | CEP do endereço de entrega                                                                                   | Numérico      | 8              |
| `shipping_address_district`          | Bairro do endereço de entrega                                                                                | Texto         | 64             |
| `shipping_address_city`              | Cidade do endereço de entrega                                                                                | Alfanumérico  | 64             |
| `shipping_address_state`             | Estado de endereço de entrega                                                                                | Alfanumérico  | 64             |
| `shipping_address_line1`             | Endereço de entrega                                                                                          | Alfanumérico  | 256            |
| `shipping_address_line2`             | Complemento do endereço de entrega                                                                           | Alfanumérico  | 14             |
| `shipping_address_number`            | Número do endereço de entrega                                                                                | Numérico      | 8              |
| `payment_method_type`                | Cód. do tipo de meio de pagamento                                                                            | Numérico      | 1              |
| `payment_method_brand`               | Bandeira (somente para transações com meio de pagamento cartão de crédito)                                   | Numérico      | 1              |
| `payment_method_bank`                | Banco emissor (Para transações de Boleto e Débito Automático)                                                | Numérico      | 1              |
| `payment_maskedcreditcard`           | Cartão Mascarado (Somente para transações com meio de pagamento cartão de crédito)                           | Alfanumérico  | 20             |
| `payment_installments`               | Número de parcelas                                                                                           | Numérico      | 1              |
| `payment_antifrauderesult`           | Status das transações de cartão de Crédito no Antifraude                                                     | Numérico      | 1              |
| `payment_boletonumber`               | número do boleto gerado                                                                                      | String        | 1              |
| `payment_boletoexpirationdate`       | Data de vencimento para transações realizadas com boleto bancário                                            | Numérico      | 10             |
| `payment_status`                     | Status da transação                                                                                          | Numérico      | 1              |
| `tid`                                | TID Cielo gerado no momento da autorização da transação                                                      | Alfanumérico  | 20             |
| `test_transaction`                   | Indica se a transação foi gerada com o `Modo de teste` ativado                                               | Boolean       | 32             |
| `product_id`                         | Identificador do Botão/Link de pagamento que gerou a transação                                               | Alfanumérico  | 32             |
| `product_type`                       | Tipo de Botão que gerou o pedido (Ver tabela de ProductID)                                                   | Alfanumérico  | 32             |
| `product_sku`                        | Identificador do produto cadastro no link de pagamento                                                       | texto         | 16             |
| `product_max_number_of_installments` | Numero de parcelas liberado pelo lojistas para o link de pagamento                                           | Numérico      | 2              |
| `product_expiration_date`            | Data de validade do botão/Link de pagamento                                                                  | Alfanumérico  | 12             |
| `product_quantity`                   | Numero de transações restantes até que o link deixe de funcionar                                             | Alfanumérico  | 2              |
| `product_description`                | Descrição do link de pagamentos registrada pelo lojista                                                      | texto         | 256            |
| `nsu`                                | NSU - Número sequencial único da transação.                                                                  | Alfanumérico  | 6              |
| `authorization_code`                 | Código de autorização.                                                                                       | Alfanumérico  | 8              |

#### Tipos de productID

| Tipo de Link de pagamento | Enun |
| ------------------------- | ---- |
| Material físico           | 1    |
| Digital                   | 2    |
| Serviço                   | 3    |
| Pagamento                 | 4    |
| Recorrência               | 5    |

#### Payment_status

O Checkout possui um Status próprios, diferente do SITE CIELO ou da API Cielo ecommerce. Veja abaixo a lista completa.

| Valor | Status de transação | Transaction Status | Meios de pagamento               | Descrição                                                                                                                     |
| ----- | ------------------- | ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1     | `Pendente`          | Pending            | Para todos os meios de pagamento | Indica que o pagamento ainda está sendo processado; OBS: Boleto - Indica que o boleto não teve o status alterado pelo lojista |
| 2     | `Pago`              | Paid               | Para todos os meios de pagamento | Transação capturada e o dinheiro será depositado em conta.                                                                    |
| 3     | `Negado`            | Denied             | Somente para Cartão Crédito      | Transação não autorizada pelo responsável do meio de pagamento                                                                |
| 4     | `Expirado`          | Expired            | Cartões de Crédito e Boleto      | Transação deixa de ser válida para captura - **15 dias pós Autorização**                                                      |
| 5     | `Cancelado`         | Voided             | Para cartões de crédito          | Transação foi cancelada pelo lojista                                                                                          |
| 6     | `Não Finalizado`    | NotFinalized       | Todos os meios de pagamento      | Pagamento esperando Status - Pode indicar erro ou falha de processamento. Entre em contato com o Suporte cielo                |
| 7     | `Autorizado`        | Authorized         | somente para Cartão de Crédito   | Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta                  |
| 8     | `Chargeback`        | Chargeback         | somente para Cartão de Crédito   | Transação cancelada pelo consumidor junto ao emissor do cartão. O Dinheiro não será depositado em conta.                      |

Obs: Para consultas de pedido, o campo payment.status será retornado no formato texto, sempre em inglês (coluna Transaction Status).

#### Payment_antifrauderesult

O Antifraude possui o conceito de `Status` e `SubStatus`, onde o primeiro representa o nível de risco que uma transação possui de ser uma fraude, e o segundo, uma informação adicional sobre a transação.

| Valor | Status 'raude    | Substatus                | Descrição                                                                                                       |
| ----- | ---------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| 1     | `Baixo Risco`    | Baixo Risco              | Baixo risco de ser uma transação fraudulenta                                                                    |
| 3     | `Médio Risco`    | Médio Risco              | Médio risco de ser uma transação fraudulenta                                                                    |
| 2     | `Alto Risco`     | Alto Risco               | Alto risco de ser uma transação fraudulenta                                                                     |
| 4     | `Não finalizado` | Não finalizado           | Não foi possível finalizar a consulta                                                                           |
| N/A   | `N/A`            | Autenticado              | Transações autenticadas pelo banco - **Não são analisaveis pelo AF**                                            |
| N/A   | `N/A`            | AF Não contratado        | Antifraude não habilitado no plano do lojista - **Não são analisaveis pelo AF**                                 |
| N/A   | `N/A`            | AF Dispensado            | Antifraude dispensado via contrato ou inferior ao valor mínimo de antifrade parametrizado backoffice no lojista |
| N/A   | `N/A`            | Não aplicável            | Meio de pagamento não analisável como cartões de débito, boleto e débito online                                 |
| N/A   | `N/A`            | Transação de recorrência | Transação de crédito seja posterior a transação de agendamento. **Somente o Agendamento é analisado**           |
| N/A   | `N/A`            | Transação negada         | Venda a crédito foi negada - **Não são analisaveis pelo AF**                                                    |

#### Payment_method_type

O Checkout permite apenas um tipo de `Boleto` ou `Débito Online` por lojista, sendo assim não é retornado se o método usado foi Bradesco ou Banco do Brasil, pois apenas um deles estará ativado na afiliação.

| Valor | Descrição         | Description |
| ----- | ----------------- | ----------- |
| 1     | Cartão de Crédito | CreditCard  |
| 2     | Boleto Bancário   | Boleto      |
| 3     | Débito Online     | OnlineDebit |
| 4     | Cartão de Débito  | DebitCard   |
| 5     | QR Code           | QrCode      |
| 6     | Pix               | Pix         |

OBS: Para consultas o Type é retornado no campo Payment.Type e vem preenchida com o valor literal (Description)

#### Payment_method_brand

| Valor | Descrição       |
| ----- | --------------- |
| 1     | Visa            |
| 2     | Master          |
| 3     | AmericanExpress |
| 4     | Diners          |
| 5     | Elo             |
| 6     | Aura            |
| 7     | JCB             |
| 8     | Discover        |
| 9     | HiperCard       |

Para consultas a Brand é retornado no campo Payment.Brand e vem preenchida com o valor literal.

#### Payment_method_bank

| Valor | Descrição       |
| ----- | --------------- |
| 1     | Banco do Brasil |
| 2     | Bradesco        |

#### Shipping_type

| Valor | Descrição                                             |
| ----- | ----------------------------------------------------- |
| 1     | Correios                                              |
| 2     | Frete fixo                                            |
| 3     | Frete grátis                                          |
| 4     | Retirar em mãos/loja                                  |
| 5     | Sem cobrança de frete (serviços ou produtos digitais) |

#### Mudança de status

| Parâmetro                     | Descrição                                                                                                                                                                  | Tipo do Campo | Tamanho Máximo |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- |
| `checkout_cielo_order_number` | Identificador único gerado pelo CHECKOUT CIELO                                                                                                                             | Alfanumérico  | 32             |
| `amount`                      | Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)                                                                                                                 | Numérico      | 10             |
| `order_number`                | Número do pedido enviado pela loja                                                                                                                                         | Alfanumérico  | 32             |
| `payment_method_brand`        | Bandeira- somente para transações com meio de pagamento cartão de crédito.[Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_brand) | Numérico      | 1              |
| `payment_status`              | Status da transação.[Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status)                                                             | Numérico      | 1              |
| `test_transaction`            | Indica se a transação foi gerada com o Modo de teste ativado                                                                                                               | Boolean       | 32             |
| `nsu`                         | NSU - Número sequencial único da transação.                                                                                                                                | Alfanumérico  | 6              |
| `authorization_code`          | Código de autorização.                                                                                                                                                     | Alfanumérico  | 8              |

# Controle Transacional

A consulta de transações via API pode ser feita até 45 dias após a venda ter sido realizada.

O controle dos pedidos oriundos de link de pagamento pode ser feito por meio da API de controle transacional. A consulta de pedidos pode ser feita de 3 formas distintas:

## Por Merchant_Order_Number

A consulta de transações por `Merchant_Order_Number` retorna uma lista de transações com o mesmo número de pedidos, isso ocorre pois o Checkout Cielo não impede a duplicação de OrderNumbers por parte do lojista.
O response possuirá o `Checkout_Cielo_Order_Number` que deverá ser usado na consulta de uma transação em especifico.

### Request

Para consultar uma transação pelo `Merchant_Order_Number`, basta realizar um `GET`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/merchantOrderNumber/{merchantordernumber}</span></aside>

### Response

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

## Por Checkout_Cielo_Order_Number

### Request

Para consultar uma transação pelo `Checkout_Cielo_Order_Number`, basta realizar um `GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

### Response

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

| Campo                                | Tipo     | Tamanho | Descrição                                                                 | Formato                                                                                                                            |
| ------------------------------------ | -------- | ------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `merchantId`                         | GUID     | 36      | Id da Loja no Checkout                                                    | Exemplo: c89fdfbb-dbe2-4e77-806a-6d75cd397dac                                                                                      |
| `orderNumber`                        | Texto    | 32      | Número do pedido da loja.                                                 | Exemplo: 123456                                                                                                                    |
| `softDescriptor`                     | Texto    | 13      | Texto exibido na fatura do comprador. Sem caracteres especiais ou espaços | Exemplo: `Loja_ABC_1234`                                                                                                           |
| `cart.items.name`                    | Texto    | 128     | Nome do item no carrinho.                                                 | Exemplo: Pedido ABC                                                                                                                |
| `cart.items.description`             | Texto    | 256     | Descrição do item no carrinho.                                            | Exemplo: 50 canetas - R$30,00                                                                                                      |
| `cart.items.unitPrice`               | Numérico | 18      | Preço unitário do produto em centavos                                     | Exemplo: R$ 1,00 = 100                                                                                                             |
| `cart.items.quantity`                | Numérico | 9       | Quantidade do item no carrinho.                                           | Exemplo: 1                                                                                                                         |
| `cart.items.type`                    | Texto    | 255     | Tipo do item no carrinho                                                  | `Asset`<br>`Digital`<br>`Service`<br>`Payment`                                                                                     |
| `shipping.type`                      | Numérico | 36      | Modalidade de frete                                                       | Exemplo: 1                                                                                                                         |
| `shipping.services.name`             | Texto    | 128     | Modalidade de frete                                                       | Exemplo: Casa Principal                                                                                                            |
| `shipping.services.price`            | Numérico | 10      | Valor do serviço de frete, em centavos                                    | Exemplo: R$ 10,00 = 1000                                                                                                           |
| `shipping.address.street`            | Texto    | 256     | Endereço de entrega                                                       | Exemplo: Rua João da Silva                                                                                                         |
| `shipping.address.number`            | Numérico | 8       | Número do endereço de entrega                                             | Exemplo: 123                                                                                                                       |
| `shipping.address.complement`        | Texto    | 64      | Complemento do endereço de entrega                                        | Exemplo: Casa                                                                                                                      |
| `shipping.address.district`          | Texto    | 64      | Bairro do endereço de entrega                                             | Exemplo: Alphaville                                                                                                                |
| `shipping.address.city`              | Texto    | 64      | Cidade do endereço de entrega                                             | Exemplo: São Paulo                                                                                                                 |
| `shipping.address.state`             | Texto    | 2       | Estado de endereço de entrega                                             | Exemplo: SP                                                                                                                        |
| `Payment.status`                     | Texto    | 10      | Status da transação                                                       | Exemplo: Paid [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status)                           |
| `Payment.tid`                        | Texto    | 32      | TID Cielo gerado no momento da autorização da transação                   | Exemplo: 10127355487AK2C3EOTB                                                                                                      |
| `Payment.nsu`                        | Texto    | 6       | NSU Cielo gerado no momento da autorização da transação                   | Exemplo: 123456                                                                                                                    |
| `Payment.authorizationCode`          | Texto    | 3       | Código de autorização.                                                    | Exemplo: 456789                                                                                                                    |
| `Payment.numberOfPayments`           | Numérico | 6       | Número de Parcelas.                                                       | Exemplo: 123456                                                                                                                    |
| `Payment.createdDate`                | Texto    | 22      | Data de criação da transação                                              | Exemplo: AAAA-MM-DDTHH:mm:SS.ss                                                                                                    |
| `Payment.finishedDate`               | Texto    | 22      | Data de finalização da transação                                          | Exemplo: AAAA-MM-DDTHH:mm:SS.ss                                                                                                    |
| `Payment.cardMaskedNumber`           | Texto    | 19      | Número do cartão mascarado                                                | Exemplo: 123456**\*\***2007                                                                                                        |
| `Payment.brand`                      | Texto    | 10      | Bandeira do cartão                                                        | Exemplo: Visa [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_brand)                     |
| `Payment.antifraud.antifraudeResult` | Numeric  | 1       | Status do antifraude                                                      | Exemplo: 1                                                                                                                         |
| `Payment.antifraud.description`      | Texto    | 256     | Descrição do status do antifraude                                         | Exemplo: Lojista optou não realizar a análise do antifraude                                                                        |
| `Payment.type`                       | Texto    | 11      | Tipo de meio de pagamento                                                 | Exemplo: CreditCard [lista completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_type)                |
| `Payment.errocode`                   | Numérico | 2       | Código de retorno                                                         | Exemplo: 00, 51, 57, etc [lista completa](https://developercielo.github.io/manual/linkdepagamentos5#c%C3%B3digos-de-retorno-abecs) |
| `Customer.Identity`                  | Numérico | 14      | CPF ou CNPJ do comprador.                                                 | Exemplo: 12345678909                                                                                                               |
| `Customer.FullName`                  | Texto    | 256     | Nome completo do comprador.                                               | Exemplo: Fulano da Silva                                                                                                           |
| `Customer.Email`                     | Texto    | 64      | Email do comprador.                                                       | Exemplo: exemplo@email.com.br                                                                                                      |
| `Customer.Phone`                     | Numérico | 11      | Telefone do comprador.                                                    | Exemplo: 11123456789                                                                                                               |

## Por ID do link de pagamento

### Request

Para consultar uma transação pelo `id`, basta realizar um `GET`.

> **Header:** Authorization: Bearer {access_token}

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}/payments</span></aside>

### Response

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

| Property                          | Description                          | Type     | Size       | Format                                                                                                     |
| --------------------------------- | ------------------------------------ | -------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `$id`                             | id do nó                             | Numérico | -          | Exemplo: 1                                                                                                 |
| `productId`                       | ID do link de pagamento              | GUID     | 36         | Exmeplo: 9487e3a9-f204-4188-96c5-a5a3013b2517                                                              |
| `createdDate`                     | Data de criação do link de pagamento | Data     | -          | AAAA-MM-DDTHH:mm:SS.ss                                                                                     |
| `orders.$id`                      | Id do nó                             | Numérico | -          | Exemplo: 1                                                                                                 |
| `orders.orderNumber`              | Id pedido gerado pelo Checkout Cielo | Texto    | 32         | Exemplo: b74df3e3c1ac49ccb7ad89fde2d787f7                                                                  |
| `orders.createdDate`              | Data de criação do pedido            | Data     | -          | AAAA-MM-DDTHH:mm:SS.ss                                                                                     |
| `orders.payment.$id`              | Id do nó                             | Numérico | -          | Exemplo: 1                                                                                                 |
| `orders.payment.price`            | Valor da pedido, sem pontuação       | Numérico | -          | Exemplo: R$ 1,00 = 100                                                                                     |
| `orders.payment.numberOfPayments` | Número de parcelas                   | -        | Exemplo: 3 |
| `orders.payment.createdDate`      | Data da transação (pagamento)        | Data     | -          | AAAA-MM-DDTHH:mm:SS.ss                                                                                     |
| `orders.payment.status`           | Status da Transação                  | Texto    | -          | Exemplo: Denied [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status) |
| `links.$id`                       | Id do nó                             | Numérico | -          | Exemplo: 1                                                                                                 |
| `links.method`                    | Método para consumo da operação      | Texto    | 10         | Exmeplos: GET, POST, PUT                                                                                   |
| `links.rel`                       | Relação para consumo da operação     | Texto    | 10         | Exemplo: self                                                                                              |
| `links.href`                      | Endpoint para consumo da operação    | Texto    | 512        | Exemplo: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e         |

Para realizar o controle transacional no Checkout Cielo é OBRIGATÓRIO que a loja possua um dos dois modelos de notificação abaixo configurado:

- URL de Notificação via **POST**
- URL de Notificação via **JSON**

A notificação é obrigatório pois todos os comandos da API (Consulta / Captura / Cancelamento) usam o identificador único da transação, chamado de `Checkout_Cielo_Order_Number`.

O `Checkout_Cielo_Order_Number` é gerado apenas quando o pagamento é finalizado na tela transacional. Ele é enviado apenas pela URL de Notificação e não pelo Response da criação da tela transacional.

# Configurações da loja

As configurações de sua loja podem ser feitas dentro do site Cielo. Neste ambiente você tem acesso a diversas opções, dentre elas:

- Geração das chaves para utilização da API;
- Configuração de logo e cor de fundo da tela de pagamento;
- Modificação dos métodos de pagamento;
- Configuração de URL’s de retorno;
- Outras ações;

Para maiores detalhes veja o tutorial Super Link e Checkout Cielo.

# Antifraude próprio

Este tópico irá ensinar como criar uma integração entre o Super Link Cielo e um antifraude próprio/terceiro de mercado.

## Pré requisitos

1. Integração com APIs de Super Link;
2. Captura Posterior das transações;
3. Negociação com provedor de Antifraude;

## Fluxograma simplificado

![Fluxograma simplificado Antifraude próprios]({{ site.baseurl_root }}/images/checkout/fluxogramasimplificadoantifraude.png)

### Passo a passo de integração

1. Crie os links via API de Super Link
   Os links podem ser criados diretamente via chamadas de API. O request e o response padrão são encontrados no tópico link de pagamento do manual. [Clique aqui](https://developercielo.github.io/manual/linkdepagamentos5#link-de-pagamento) para saber mais.

2. Envie o link para o portador do cartão realizar o pagamento
   O link de pagamento deve ser enviado pelas redes sociais para que seja realizado o pagamento. A venda/transação só começa a partir do preenchimento da tela de pagamento.

3. Receba os dados de pagamento via Post de notificação
   A confirmação de pagamento é enviada via Webhook para uma URL da escolha do lojista. Veja como configurar uma URL para receber a notificação [aqui](https://developercielo.github.io/manual/linkdepagamentos5#tipos-de-url-de-notifica%C3%A7%C3%A3o).
   As informações retornadas via Post de notificação podem ser encontradas no tópico [Conteúdo da notificação](https://developercielo.github.io/manual/linkdepagamentos5#conteúdo-da-notificação).

4. Envie os dados de pagamento para o Antifraude contratado
   As informações retornadas no Post de notificação devem ser enviadas para seu Antifraude. Caso necessário você pode enriquecer as informações retornadas com informações cadastrais do cliente que está executando aquele pagamento.
   Consulte seu provedor de Antifraude para saber quais campos podem ser enviados para análise.
   A Cielo não participa do envio dessas informações. Todas as dúvidas relacionadas ao processo de integração entre Lojista e Antifraude devem ser envidas para o Suporte do provedor de antifraude.

5. Capture ou cancele as vendas
   De acordo com o retorno de seu provedor de antifraude capture ou cancele a venda. A captura e o cancelamento de vendas podem ser feitos via API de controle transacional. Veja como fazer o controle transacional de suas vendas [aqui](https://developercielo.github.io/manual/controletransacional4#capturar-transa%C3%A7%C3%A3o).

# Status e Códigos

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

## Programa de Retentativa das Bandeiras

**O que são retentativas?**

Quando uma pessoa tenta fazer uma compra com cartão na sua loja, a transação pode ser negada devido a uma série de fatores. As tentativas seguintes de concluir a transação usando o mesmo cartão é o que chamamos de retentativa.

**O que mudou?**

Cada bandeira de cartão define os valores que serão cobrados por retentativa. A quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira.

**E no e-commerce?**

As bandeiras de cartão definem regras diferentes para transações com cartão presente e não presente, como no caso das vendas feitas pela internet.

**Qual o impacto para a loja?**

Os e-commerces que não seguirem as regras serão penalizados com a cobrança de tarifas por transações excedidas, de acordo com o programa de cada bandeira.

Visando melhorar a experiência de compra, o mercado de meios de pagamento, em conjunto com a ABECS, promoveu a padronização nos códigos de respostas das transações recusadas feitas por cartão. As tentativas foram classificadas em dois tipos:

> - <p>&#10060; **Irreversível: nunca realizar retentativa**</p><br>
>   <br>
>   Significa, por exemplo, que o cartão está cancelado para uso, foi perdido ou roubado, há uma fraude confirmada ou a transação não é permitida para aquele produto, indicando que não há circunstâncias nas quais o emissor concederia uma aprovação. Qualquer tentativa de autorização que, após uma recusa **irreversível**, não tenha alterado nenhum campo da mensageria, não obterá sucesso.<br>
>   <br>
> - <p>&#9989; **Reversível: permitido realizar retentativa**</p><br>
>   <br>
>   Significa que o emissor pode aprovar a transação, mas não pode fazê-lo agora, possivelmente devido a um problema do sistema (inoperante) ou falta de limite, suspeita de fraude ou excesso de número de tentativas de digitação da senha. São decisões de recusas temporárias tomadas pelo emissor que podem mudar com o tempo.

As bandeiras Visa, Mastercard, Elo e Hipercard ajustaram suas regras para limitar a quantidade de tentativas de autorização para uma transação negada. Essas mudanças preveem a cobrança de tarifas para o excesso de tentativas. Confira a seguir as regras de cada bandeira.

### Mastercard

A bandeira Mastercard possui o programa Transaction Processing Excellence (TPE), que engloba duas categorias:

**1. Excessive Attempts**: monitora as retentativas de transações negadas nos ambientes de cartão presente e cartão não presente. Válido tanto para códigos de negadas reversíveis quanto irreversíveis.

**2. Merchant Advice Code Transaction Excellence (MAC)**: monitora as retentativas de transações negadas, nos ambientes de cartão não presente e que são irreversíveis. Haverá cobrança somente nos MACs 03 e 21.

#### 1. Excessive Attempts

São cobranças efetuadas quando o estabelecimento comercial excede as regras de retentativas de transações.

A bandeira também realiza o monitoramento para qualquer autorização de valor nominal, aprovada, com estorno subsequente para transações abaixo de 1 unidade de moeda inteira ou o equivalente a US$ 1.

O monitoramento é aplicado para as retentativas de transações de compras negadas e aprovadas, realizadas em ambiente de cartão presente e cartão não presente.

**Tabela Excessive Attempts**

| Categorias                            | Códigos                                                                                                                                         | Vigência                          | Tarifa Doméstica | Tarifa Internacional | Quando Ocorre            | Permitido Retentar         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------- | -------------------- | ------------------------ | -------------------------- |
| Cartão presente e cartão não presente | Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts" | Até 31/01/2023                    | R$ 2,00          | -                    | A partir 11ª retentativa | Permitido retentar em 24h. |
| Cartão presente e cartão não presente | Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts" | Nova regra a partir de 01/02/2023 | R$ 2,00          | -                    | A partir 8ª retentativa  | Permitido retentar em 24h. |

- Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, e mesmo número de estabelecimento;
- A Mastercard prorrogou a data de vigência para o dia **01/02/2023** referente as novas regras do programa **(Excessive Attempts)** antes prevista para início do dia 01/11/2022. Confira as mudanças:

1. O excesso considerado no programa ocorrerá a partir da oitava retentativa dentro do mês de apuração; os valores cobrados sofreram alteração.
2. E a Mastercard também está introduzindo um limite de 35 tentativas negadas no mesmo cartão e mesmo número de estabelecimento por período contínuo de 30 dias. Mesmo se a loja não ultrapassar o limite de sete retentativas no período de 24h, mas ultrapassar a quantidade do limite mensal, a cobrança será aplicada.

> Obs: A regra vigente do programa Excessive Attempts é válida até 31/01/2023 (tabela Excessive Attempts), permitindo apenas 10 tentativas de aprovar uma mesma transação (no mesmo cartão, e mesmo número de estabelecimento), e é permitido retentar após 24h.

#### 2. Merchant Advice Code Transaction Excellence (MAC)

São cobranças efetuadas quando o estabelecimento comercial realiza retentativa de envio de autorização para códigos de respostas irreversíveis com um mesmo cartão valido para cartão não presente.

Dentro desse programa de retentativas, há programas que se destinam especificamente ao cenário de **“Não tente esta transação novamente”**. Para esses casos, a Mastercard identifica as transações com os valores MAC 03 e MAC 21, por exemplo.

O programa MAC comporta alguns valores, porém **somente os MACs 03 e 21 possuem uma cobrança específica**. Os demais MACs não se enquadram nessa cobrança.

Os outros códigos MAC (01, 02, 04, 24, 25, 26, 27, 28, 29 e 30) não entram no programa de cobrança do MAC mas entram na cobrança do programa Excessive Attempts, caso exceda os limites.

Desde **14/10/2022** a Mastercard introduziu novos códigos MAC (24, 25, 26, 27, 28, 29 e 30) quando um emissor recusa uma transação com o código de resposta 51 (insuficiência de fundos) seguido de um dos MAC da tabela a seguir, para que o comerciante tome a melhor ação.

**Tabela com toda relação de MACs**

| MAC | Descrição                                                | Observação                                                                                                                                               |
| --- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Informações da nova conta disponíveis (ABU)              | Necessidade de realizar atualização dos dados da conta que está sendo utilizada na transação, usando o ABU, por exemplo.                                 |
| 02  | Não pode aprovar no momento, tente depois                | Tente novamente a transação após 72 horas ou tente a transação com um método de pagamento diferente.                                                     |
| 03  | Não é permitido retentar                                 | Busque outro meio de garantir o pagamento, evitando custos desnecessários de várias solicitações de autorização que continuarão a resultar em declínios. |
| 04  | Requisitos de token não atendidos para este token modelo | Há necessidade de revisar os requisitos de token, pois os requisitos não foram atendidos para este token modelo enviado na transação.                    |
| 21  | Plano cancelado                                          | Comprador realiza cancelamento de plano e mesmo após o cancelamento, estabelecimento continua enviando solicitação de autorização de compra.             |
| 24  | Tente novamente após 1 hora                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 25  | Tente novamente após 24 horas                            | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 26  | Tente novamente após 2 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 27  | Tente novamente após 4 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 28  | Tente novamente após 6 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 29  | Tente novamente após 8 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 30  | Tente novamente após 10 dias                             | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |

Além disso, alguns códigos de retorno deixarão de ser enviados:

- 04 (Cartão de Captura)
- 14 (Número de cartão inválido)
- 41 (Cartão Perdido)
- 43 (Cartão Roubado)
- 54 (Cartão Expirado)
- 57 (Transação Não Permitida)
- 62 (Cartão Restrito)
- 63 (Violação de Segurança)
  <br>
  <br>

**Categorização de retornos Mastercard**

A Mastercard poderá consolidar alguns códigos de respostas dos emissores, que muitas vezes não indicam ao comerciante se pode ou não retentar, em três códigos de uso exclusivo Mastercard:

- **79** (Ciclo de vida);
- **82** (Política);
- **83** (Fraude/ Segurança).
  <br>
  <br>

Os códigos originais serão substituídos pelo Merchant Advice Code (MAC), que acompanharão os códigos 79, 82 e 83 para determinar se a transação pode ou não ser retentada.

**Por exemplo:**

|                                     Quando                                     |                                      Então                                       |            E o código de resposta             |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :-------------------------------------------: |
| O emissor recusar a transação usando o código de resposta 54 (Cartão Expirado) | A Mastercard substituirá o código 54 para o código 79 (recusa por ciclo de vida) | Acompanha o devido Merchant Advice Code (MAC) |

**Programa de retentativas MAC 03 e MAC 21**

**Forma de apuração:**

- Serão consideradas as transações de cartão não presente;
- São consideradas como retentativas todas as transações de pagamento no mesmo cartão e mesmo número de estabelecimento;
- São contabilizadas as retentativas no programa MAC com os valores MAC 03 e MAC 21;
- Valido para qualquer código de resposta;
- O excesso contabilizado no programa ocorrerá a partir da 1ª retentativa dentro do mês de apuração;
- O contador é zerado após o período de 30 dias;
- As retentativas podem ser cobradas nos MACs 03/21 e no Excessive Attempts caso ultrapasse o limite de cada programa;
- Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de 01 de janeiro de 2023, como listado a seguir.
  <br>
  <br>

**Tabela de valores:**

| Número de retentativa    | Regra                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| A partir 1ª rententativa | R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª retentativa. |

### Visa

**O que é?**

Um programa instituído pela bandeira Visa que gera cobranças quando o estabelecimento comercial excede as regras de retentativas.

- Válido para transações com cartão presente e cartão não presente;
- **Códigos reversíveis:** são permitidas até 15 tentativas de aprovar uma mesma transação (mesmo cartão, mesmo estabelecimento e valor) no período de 30 dias. Após os 30 dias iniciais (a contar da primeira tentativa), qualquer retentativa será cobrada;
- **Códigos irreversíveis:** é permitido apenas UMA tentativa de aprovar uma mesma transação (mesmo cartão, mesmo estabelecimento), na segunda tentativa será cobrado;
- Após uma transação ser aprovada, o contador é zerado.
  <br>

> **Tarifas**: Ao ultrapassar os limites de tentativas estabelecidos pela bandeira, haverá uma cobrança de tarifa para cada transação excedente.<br> > <br>
>
> - **Doméstico**: USD 0,10 + 13,83% de imposto;
> - **Estrangeiro**: USD 0,25 + 13,83% de imposto
>   <br>
>   <br>

Regras de autorização já vigentes. A cobrança de tarifas é aplicada desde abril de 2021.

**A Visa agrupou os códigos de retorno em quatro categorias:**

- **Categoria 1: emissor nunca aprovará**

Para essa categoria, indica que o cartão foi cancelado ou nunca existiu ou que a negativa é resultado de uma restrição permanente ou condição de erro que impedirá uma aprovação futura.

- **Categoria 2: emissor não pode aprovar neste momento**

Indicam que a negativa é resultado de uma condição temporária tal como risco de crédito, controles de velocidade do emissor ou outras restrições do cartão que podem permitir uma retentativa da transação ser aprovada. Em alguns casos, a negativa requer uma ação do portador ou emissor para remover a restrição antes que uma aprovação possa ser obtida.

- **Categoria 3: qualidade de dados/revisar dados**

Quando um erro de dados é identificado pelo emissor essa transação é declinada como consequência. Os estabelecimentos devem revalidar dados de pagamentos antes de retentar. Estabelecimentos e Credenciadores devem monitorar estes códigos de negativas devido a exposição potencial a fraudes.

> **Atenção**: A categoria 3 tem, além dos limites considerados na categoria 2, um limite diferente que é cumulativo. Um estabelecimento pode realizar até 10.000 transações em um período de 30 dias (neste caso considerando apenas o número do estabelecimento e códigos de negadas). Se ultrapassar o limite, todas as transações recusadas por categoria 3 serão tarifadas.

- **Categoria 4: códigos de respostas genéricos**

A categoria 4 inclui todos os outros códigos de resposta de recusa, muitos dos quais fornecem pouco ou nenhum valor para Adquirentes/Comerciantes como parte de sua estratégia de nova tentativa. O uso do emissor deve permanecer mínimo.

A maioria das condições de recusa tem códigos de resposta descritivos nas Categorias 1, 2 e 3 para indicar o motivo da recusa. No entanto, pode haver circunstâncias em que não haja valor de código de resposta para uma condição de declínio específica. Emissores pode usar outros valores de códigos de resposta definidos nas Especificações Técnicas VisaNet; no entanto, o uso deve permanecer mínimo.

Os emissores devem usar códigos de resposta que reflitam com mais precisão o motivo das recusas. Categorias 1 (o emissor nunca aprovar), 2 (o emissor não pode aprovar neste momento) e 3 (qualidade dos dados) devem ser usados, e os emissores devem limitar o uso de Categoria 4 (Código de Resposta Genérico) para transações onde nenhum outro valor se aplica. A taxa do Código de Resposta Genérico é cobrada para garantir que não mais do que a porcentagem aprovada regionalmente do total de recusas do emissor sejam categorizadas como Categoria 4. Os emissores que excederem o limite definido regionalmente receberão a Taxa de Código de Resposta Genérica por base de transação para cada declínio em excesso do limite definido.

**Tabela com as regras e códigos de recusa:**

![VISA](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/retentativa_visa.png)

**Observação:** O código de resposta 14 aparece nas categorias 1 e 3 porém a contabilização é a seguinte:

- Na categoria 1 o EC é tarifado a partir da 2ª tentativa para o (mesmo estabelecimento e mesmo cartão) **não permitido retentar.**

- Na categoria 3 compõe o grupo de códigos para contabilização das 10.001 transações, após o EC atingir 10.000 retentativas com o este grupo de códigos, qualquer transação será contabilizada independente do cartão.

**Exemplo:** Tivemos 10.000 transações negadas em um EC com os códigos de categoria 3, se a transação 10.001 for no código 14 ou em qualquer código do grupo de categoria 3 ele será tarifado independente do cartão.

### Elo

**O que é?**

Trata-se de um programa instituído pela bandeira ELO que gera cobranças quando o estabelecimento comercial excede as regras de retentativas de transações com um mesmo cartão.

**Formas de Apuração**

- **Retentativas**: todas transações de pagamento no mesmo cartão, validade, valor e Merchant ID (MID) dentro de 30 dias;
- **Códigos contabilizados**: todos de negativas​;
- **Excesso**: a partir da 16ª retentativa no mês​\*;
- **Tarifa**: R$ 0,80 (oitenta centavos) por retentativa, a partir da 16ª;
- **Contabilização do excesso**: é baseada nos controles internos da Elo. 1º ao último dia corrido do mês.
  <br>
  <br>

<aside class="notice">Início de vigência: 1º de agosto de 2022.</aside>

**Relação de códigos de recusa Elo:**

Os códigos de respostas abaixo estão listados conforme manual de autorização da bandeira.

| CÓDIGOS | DESCRIÇÃO                                      | QUANDOO EMISSOR DEVE UTILIZAR O CÓDIGO DE RESPOSTA                                                                                                                                                                                                                                                                                                                                                                                                                                                           | RETENTATIVA  |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| 4       | REFAZER A TRANSAÇÃO                            | Esse código deve ser usado pelo Emissor para solicitar que o portador/EC realize novamente a transação caso ele (Emissor) detecte falha na captura das informações da transação ou caso seja necessário atualização da senha negando a 1ª transação                                                                                                                                                                                                                                                          | Reversível   |
| 5       | GENÉRICA                                       | A Bandeira poderá utilizar esse código para outras tratativas (genérica).                                                                                                                                                                                                                                                                                                                                                                                                                                    | Reversível   |
| 6       | CONSULTAR CREDENCIADOR                         | Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que não necessitem de mudanças na mensageria para que a transação siga o fluxo correto.                                                                                                                                                                                                                                                                                                                           | Reversível   |
| 12      | ERRO NO CARTÃO                                 | - Esse código deve ser usado pelo Emissor quando ele identificar falha na validação do CAVV de transações 3DS ou tokenizada.<br>- Esse código deve ser usado pelo Emissor quando identificar CÓDIGO DE SERVIÇO incorreto/inválido para cartões físicos.<br>- Esse código deve ser usado pelo Emissor para problemas identificados no TOKEN<br>- Este código deve ser utilizado para negar reversões e avisos de reversão onde a transação original não é localizada pelo Emissor.                            | Irreversível |
| 13      | VALOR DA TRANSAÇÃO INVÁLIDA                    | - Esse código deve ser usado pelo Emissor quando identificar que o valor da transação é inválido de acordo com os parâmetros do Emissor.                                                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 14      | NÚMERO DO CARTÃO INVÁLIDA                      | - Esse código deve ser utilizado pelo Emissor para Nº DO CARTÃO INVÁLIDO/INCORRETO.<br>- A Bandeira poderá utilizar esse código para outras tratativas.                                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| 19      | PROBLEMAS ADQUIRENTE                           | - Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que necessitem de mudanças na mensageria para que a transação siga o fluxo correto.                                                                                                                                                                                                                                                                                                                             | Irreversível |
| 23      | VALOR DA PARCELA INVÁLIDO                      | - Esse código deve ser utilizado pelo Emissor quando o VALOR DA PARCELA ESTÁ FORA DOS LIMITES estabelecidos por ele. Esse código deve ser utilizado quando o emissor não aceitar o produto Elo Parcelado Loja (produto 072) com o número de parceladas menor que 12.                                                                                                                                                                                                                                         | Irreversível |
| 30      | ERRO DE FORMATO DA MENSAGEM                    | - Esse código deve ser usado pelo Emissor quando ele identificar ERRO DE FORMATO NA MENSAGERIA (campo obrigatório, domínios, formatos, tamanho não presentes ou divergentes da especificação).                                                                                                                                                                                                                                                                                                               | Irreversível |
| 38      | COMPRA/EXCEDIDAS TENTATIVAS SENHA              | - Esse código deve ser utilizado pelo Emissor quando for EXCEDIDO O Nº DE TENTATIVAS PERMITIDAS DE DIGITAÇÃO DA SENHA (utilizado apenas para compras).                                                                                                                                                                                                                                                                                                                                                       | Reversível   |
| 41      | CARTÃO PERDIDO                                 | - Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "PERDA".                                                                                                                                                                                                                                                                                                                                                                                                       | Irreversível |
| 43      | CARTÃO ROUBADO                                 | - Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "ROUBO".                                                                                                                                                                                                                                                                                                                                                                                                       | Irreversível |
| 51      | LIMITE/SALDO INSUFICIENTE                      | - Esse código deve ser utilizado pelo Emissor para CARTÃO que está TEMPORARIAMENTE SEM SALDO OU LIMITE SUFICIENTE para realizar a transação.<br>- Saque/advance 2 sem trilha 2<br>- Compra com Troco não suportada.<br>- Verificação de endereço não suportada (somente quando o código de processo for "13" sem valor de compra). \* Verificação de conta de cartão não suportada (somente quando o código de processo for "18" sem valor de compra).                                                       | Reversível   |
| 54      | DATA DE VALIDADE DO CARTÃO                     | - Esse código deve ser utilizado pelo Emissor para CARTÃO FÍSICO ou TOKEN COM VALIDADE / EXPIRAÇÃO VENCIDA ou INVÁLIDA.                                                                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| 55      | SENHA INVÁLIDA / NÃO ENVIADA                   | - Esse código deve ser utilizado pelo Emissor quando a SENHA DIGITADA PELO CLIENTE NÃO CONFERE, ESTÁ INVÁLIDA/INCORRETA.<br>- Esse código deve ser utilizado pelo Emissor quando a SENHA NÃO FOR ENVIADA NA MENSAGERIA E A MESMA É EXIGIDA PARA APROVAÇÃO DA TRANSAÇÃO.                                                                                                                                                                                                                                      | Reversível   |
| 56      | SEM REGISTRO DO CARTÃO                         | <br>1. Nº do cartão não pertence ao Emissor<br>2. Nº do cartão não é válido                                                                                                                                                                                                                                                                                                                                                                                                                                  | Irreversível |
| 57      | TRANSAÇÃO NÃO PERMITIDA PARA ESSE CARTÃO       | - Esse código deve ser utilizado pelo Emissor quando o cartão estiver com BLOQUEIO DEFINITIVO, exceto bloqueio perda e roubo que já possuem códigos específicos (ex: falecimento, fraude confirmada, cancelamento definitivo a pedido do cliente, etc).<br>- Esse código deve ser utilizado para PRODUTOS E SERVIÇOS NÃO SUPORTADOS pelo emissor do cartão.<br>- Esse código pode ser usado para TOKEN INVÁLIDO / SUSPENSO / INATIVO.<br>- Esse código deve ser usado para negar o modo de entrada FALLBACK. | Irreversível |
| 58      | COMERCIANTE INVÁLIDO                           | - Esse código deve ser utilizado pelo Emissor quando o MCC do estabelecimento não estiver cadastrado para obtenção de token junto ao Emissor.                                                                                                                                                                                                                                                                                                                                                                | Irreversível |
| 59      | SUSPEITA DE FRAUDE                             | - Esse código deve ser utilizado pelo Emissor quando regras de prevenção SUSPEITAM DE FRAUDE, sendo necessário o contato do portador com o Emissor para liberação do cartão e realização de nova transação.<br>- Esse código deve ser utilizado pelo Emissor para negar transações por ausência do AVISO VIAGEM que deve ser realizado pelo portador do cartão antes de viagens ao exterior ou em alguns casos antes de realizar transações em sites internacionais.                                         | Reversível   |
| 61      | VALOR MÁXIMO SAQUE/COMPRAS EXCEDIDO            | - Esse código deve ser utilizado pelo Emissor quando o valor do saque/compras exceder o limite permitido por ele.                                                                                                                                                                                                                                                                                                                                                                                            | Reversível   |
| 62      | BLOQUEIO TEMPORÁRIO DE COBRANÇA                | - Esse código deve ser utilizado pelo Emissor para cartões com BLOQUEIO TEMPORÁRIO DE COBRANÇA.                                                                                                                                                                                                                                                                                                                                                                                                              | Reversível   |
| 63      | VIOLAÇÃO DE SEGURANÇA                          | - Esse código deve ser utilizado pelo Emissor quando o CÓDIGO DE SEGURANÇA DO CARTÃO (CVE2) estiver INCORRETO / INVÁLIDO ou MST inválido (token).                                                                                                                                                                                                                                                                                                                                                            | Irreversível |
| 64      | VALOR MÍNIMO DA TRANSAÇÃO - INVÁLIDO           | - Esse código deve ser utilizado pelo Emissor quando o VALOR DA TRANSAÇÃO ESTIVER ABAIXO DO MÍNIMO permitido pelo Emissor                                                                                                                                                                                                                                                                                                                                                                                    | Irreversível |
| 65      | QUANTIDADE DE SAQUES EXCEDIDOS                 | - Esse código deve ser utilizado pelo Emissor quando o limite de quantidade de saques estiver excedido                                                                                                                                                                                                                                                                                                                                                                                                       | Reversível   |
| 75      | SAQUE/ EXCEDIDAS TENTATIVAS SENHA              | - Esse código deve ser utilizado pelo Emissor quando for excedida a quantidade de tentativas de digitação de senha estipuladas pelo Emissor (utilizado apenas para SAQUES)                                                                                                                                                                                                                                                                                                                                   | Reversível   |
| 76      | CONTA DESTINO INVÁLIDA OU INEXISTENTE          | - Esse código deve ser utilizado pelo Emissor quando conta "PARA" (destino) no BIT 3 é inválida ou inexistente e exclusivamente para transações de Transferência de Fundos                                                                                                                                                                                                                                                                                                                                   | Irreversível |
| 77      | CONTA ORIGEM INVÁLIDA OU INEXISTENTE           | - Esse código deve ser utilizado pelo Emissor quando conta "DE" (origem) no BIT 3 é inválida ou inexistente e exclusivamente para transações de Transferência de Fundos.                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 78      | CARTÃO NOVO SEM DESBLOQUEIO / CARTÃO BLOQUEADO | - Esse código deve ser utilizado pelo Emissor quando o cartão novo ainda não foi desbloqueado (ativado) pelo portador junto ao Emissor ou quando o Portador, mediante autonomia, desejar bloquear temporariamente o cartão através do aplicativo do Emissor.                                                                                                                                                                                                                                                 | Reversível   |
| 82      | CARTÃO INVÁLIDO (dados internos)               | - Esse código deve ser utilizado pelo Emissor quando dados internos do cartão não conferem (ex: criptograma inválido, ATC inválido etc.)                                                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 83      | NÃO É POSSÍVEL VALIDAR A SENHA                 | - Esse código deve ser utilizado pelo Emissor e será utilizado pela Elo quando não for possível validar ou descriptografar a senha.                                                                                                                                                                                                                                                                                                                                                                          | Irreversível |
| 91      | EMISSOR FORA DO AR                             | - Esse código será utilizado pela Bandeira quando o Emissor está temporariamente indisponível para autorizar a transação ou não foi recebida a resposta do Emissor no tempo estabelecido.                                                                                                                                                                                                                                                                                                                    | Reversível   |
| 96      | FALHA DO SISTEMA                               | - Esse código será utilizado pela Bandeira ou pelo Emissor por problemas no processamento da transação.                                                                                                                                                                                                                                                                                                                                                                                                      | Reversível   |
| AB      | FUNÇÃO INCORRETA (DÉBITO)                      | - Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função DÉBITO, mas o cartão não possui essa função ativa.                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| AC      | FUNÇÃO INCORRETA (CRÉDITO)                     | - Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função CRÉDITO, mas o cartão não possui essa função ativa.                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| FM      | UTILIZAR O CHIP                                | - Esse código será utilizado pelo Emissor para informar ao estabelecimento que a transação contactless não terá sucesso e que o portador deve utilizar o chip (contato).                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| P5      | TROCA DE SENHA / FALHA NO DESBLOQUEIO          | - Esse código será utilizado pelo Emissor quando ocorreu falha na troca de senha ou falha no desbloqueio.                                                                                                                                                                                                                                                                                                                                                                                                    | Irreversível |
| P6      | NOVA SENHA NÃO ACEITA                          | - Esse código será utilizado pelo Emissor quando a nova senha que o cliente escolheu não atende os critérios mínimos estabelecidos pelo Emissor.                                                                                                                                                                                                                                                                                                                                                             | Reversível   |

### Hipercard

**O que é?**

Cobranças efetuadas quando um Estabelecimento Comercial excede as regras de retentativas de transações negadas com um mesmo cartão, mesma data ou período mensal, mesmo valor e mesmo número de Estabelecimento Comercial, conforme abaixo:

| Programa                                     | Cartão Presente                                                                                                                                   | Cartão não presente                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Excesso de Retentativa                       | R$ 1,85 por retentativa a partir da 9ª resposta negada – mesmo cartão e mesmo dia (regra 2)                                                       | R$ 1,85 por Retentativas a partir da 9ª resposta negada – mesmo cartão e mesmo mês de referência (regra 3)                                                  |
| Retentativa de transação **ASI** (Zero Auth) | R$ 0,15 por retentativa de transação ASI após negativa do emissor – mesmo cartão e mesmo dia (item 2)                                             | R$ 0,15 por retentativa de transação ASI após negativa do emissor – mesmo cartão e mesmo mês de referência (regra 3)                                        |
| Retentativa de transação irreversível        | 0,03% do valor da transação por retentativa<br>Mínimo R$ 0,15<br>Máximo R$ 0,80<br>Mesmo cartão e mesmo dia após resposta com código irreversível | 0,03% do valor da transação por retentativa<br>Mínimo R$ 0,15<br>Máximo R$ 0,80<br>Mesmo cartão e mesmo mês após resposta com código irreversível (regra 3) |

**Regras:**

1. **Transações ASI**: são transações Account Status Inquiry, ou seja, são as transações efetuadas para consultar o status de um cartão (verificar se está ativo). Para esse fim, não devem ser usadas transações financeiras e sim transações específicas;
2. **Tentativas por dia**: considerar para efeito do programa de Retentativas da Hipercard de 00h00 a 23h59;
3. **Mês de referência**: considerar para efeito do programa de Retentativas da Hipercard dia 01 a 30 ou 31 do mês em que ocorreu a transação. A cobrança será enviada após o fechamento do mês subsequente;
4. **Os códigos de transações** consideradas **irreversíveis pelo emissor** foram categorizados pela indústria de pagamentos e autorregulação da ABECS, por meio do Normativo 21 vigente. Veja os [Códigos de retorno (ABECS)](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-de-retorno-abecs){:target="\_blank"};
5. **Os códigos não citados no manual da ABECS são considerados como reversíveis**.

<aside class="notice">Início de vigência: 15 de setembro de 2022.</aside>

### Demais bandeiras

- **Códigos reversíveis:** serão permitidas novas retentativas para o mesmo cliente e cartão. Não há limite e período pré-estabelecido;

> **Importante**: antes de realizar uma nova tentativa, siga a orientação recebida na resposta da transação negada.

- **Códigos Irreversíveis:** não serão permitidas autorizações para o mesmo cartão ou estabelecimento, depois de receber 1ª resposta de recusa do emissor.

## Códigos de retorno ABECS

Para acessar o programa de retentativa das bandeira acesse esse [Link](https://developercielo.github.io/manual/linkdepagamentos5#programa-de-retentativa-das-bandeiras)

A Associação Brasileira das Empresas de Cartão de Crédito e Serviços (ABECS) estabelece a partir do dia 15 de Julho de 2020 a padronização do código de retorno das autorizações de vendas recusadas tanto para as soluções pagamento do mundo físico e e-commerce do mercado brasileiro.

Essa medida normativa busca trazer benefícios para todo o mercado de pagamentos, proporcionando maior transparência no entendimento do motivo de recusa das transações, além de possibilitar maior assertividade na adoção de estratégias de retentativas de vendas.

A Cielo informa seus clientes que está preparada para processar as transações seguindo esse novo padrão do mercado, segue abaixo a tabela de códigos padronizados pela ABECS.

<aside class="notice">Os códigos da bandeira AMEX sofreram um de/para de modo a manter dois dígitos. Reforçamos que essa medida não altera os motivos de retorno.</aside>

| Mensagem                                                       | Tipo de Código | ELO                       | VISA                      | MASTERCARD/HIPER          | AMEX                      | AMEX - De/Para Cielo      | Mensagem POS/Ecommerce                                               | Houve alteração da ABECS em 2022?                             |
| -------------------------------------------------------------- | -------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | --- |
| GENÉRICA                                                       | REVERSÍVEL     | 5                         | 5                         | 5                         | 100                       | FA                        | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| SALDO/LIMITE INSUFICIENTE                                      | REVERSÍVEL     | 51                        | 51                        | 51                        | 116                       | A5                        | NÃO AUTORIZADA                                                       | Não                                                           |
| SALDO/LIMITE INSUFICIENTE                                      | REVERSÍVEL     | 51                        | 51                        | 51                        | 121                       | A5                        | NÃO AUTORIZADA                                                       | Somente na nossa Documentação                                 |
| SENHA INVÁLIDA                                                 | REVERSÍVEL     | 55                        | 55 ou 86                  | 55                        | 117                       | A6                        | SENHA INVÁLIDA                                                       | Não                                                           |
| TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO                          | REVERSÍVEL     | -                         | 57                        | 57                        | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO                                | Sim                                                           |
| TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO                          | IREVERSÍVEL    | 57                        | -                         | -                         | -                         | -                         | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Novo                                                          |
| NÚMERO CARTÃO NÃO PERTENCE AO EMISSOR / NÚMERO CARTÃO INVÁLIDO | IRREVERSÍVEL   | 14 ou 56                  | 14                        | 14 ou 01                  | 122                       | 8                         | VERIFIQUE OS DADOS DO CARTÃO                                         | Sim                                                           |
| VIOLAÇÃO DE SEGURANÇA                                          | IRREVERSÍVEL   | 63                        | 63                        | -                         | 122                       | 8                         | VERIFIQUE OS DADOS DO CARTÃO                                         | Sim                                                           |
| VIOLAÇÃO DE SEGURANÇA                                          | REVERSÍVEL     | -                         | -                         | 63                        | -                         | -                         | VERIFIQUE OS DADOS DO CARTÃO                                         | Novo                                                          |
| SUSPEITA DE FRAUDE                                             | REVERSÍVEL     | 59                        | 59                        | 63                        | 100                       | FA                        | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| COMERCIANTE INVÁLIDO                                           | IRREVERSÍVEL   | 58                        | 3                         | 3                         | 109                       | DA                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Sim                                                           |
| REFAZER A TRANSAÇÃO (EMISSOR SOLICITA RETENTATIVA)             | REVERSÍVEL     | 4                         | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | REFAZER A TRANSAÇÃO                                                  | Sim                                                           |
| CONSULTAR CREDENCIADOR                                         | REVERSÍVEL     | 6                         | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | LOJISTA, CONTATE O ADQUIRENTE                                        | Sim                                                           |
| PROBLEMA NO ADQUIRENTE                                         | IRREVERSÍVEL   | 19                        | 19                        | 30                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | ERRO NO CARTÃO – NÃO TENTE NOVAMENTE                                 | Não                                                           |
| ERRO NO CARTÃO                                                 | IRREVERSÍVEL   | 12                        | 6                         | SEM CÓDIGO CORRESPONDENTE | 115                       | A2                        | VERIFIQUE OS DADOS DO CARTÃO                                         | Não                                                           |
| ERRO DE FORMATO (MENSAGERIA)                                   | IRREVERSÍVEL   | 30                        | 12                        | 30                        | 181                       | A3                        | ERRO NO CARTÃO - NÃO TENTE NOVAMENTE                                 | Não                                                           |
| VALOR DA TRANSAÇÃO INVÁLIDA                                    | IRREVERSÍVEL   | 13                        | 13                        | 13                        | 110                       | JB                        | VALOR DA TRANSAÇÃO NÃO PERMITIDO - NÃO TENTE NOVAMENTE               | Não                                                           |
| VALOR DA PARCELA INVÁLIDA                                      | IRREVERSÍVEL   | 23                        | SEM CÓDIGO CORRESPONDENTE | 12                        | 115                       | A2                        | PARCELAMENTO INVÁLIDO - NÃO TENTE NOVAMENTE                          | Não                                                           |
| EXCEDIDAS TENTATIVAS DE SENHA / COMPRAS                        | REVERSÍVEL     | 38                        | 75                        | 75                        | 106                       | A4                        | EXCEDIDAS TENTATIVAS DE SENHA.CONTATE A CENTRAL DO SEU CARTÃO        | Não                                                           |
| CARTÃO PERDIDO                                                 | IRREVERSÍVEL   | 41                        | 41                        | 41                        | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Não                                                           |
| CARTÃO ROUBADO                                                 | IRREVERSÍVEL   | 43                        | 43                        | 43                        | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Não                                                           |
| CARTÃO VENCIDO / DT EXPIRAÇÃO INVÁLIDA                         | IRREVERSÍVEL   | 54                        | 54                        | 54                        | 101                       | BV                        | VERIFIQUE OS DADOS DO CARTÃO                                         | Sim                                                           |
| TRANSAÇÃO NÃO PERMITIDA CAPACIDADE DO TERMINAL                 | IRREVERSÍVEL   | 57                        | 58                        | 58                        | 116                       | A5                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Não                                                           |
| VALOR EXCESSO / SAQUE                                          | REVERSÍVEL     | 61                        | 61 ou N4                  | 61                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | VALOR EXCEDIDO. CONTATE A CENTRAL DO SEU CARTÃO                      | Não                                                           |
| BLOQUEIO TEMPORÁRIO (EX: INADIMPLÊNCIA)                        | REVERSÍVEL     | 62                        | 62                        | 57                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Novo                                                          |
| CARTÃO DOMÉSTICO - TRANSAÇÃO INTERNACIONAL                     | IRREVERSÍVEL   | 62                        | SEM CÓDIGO CORRESPONDENTE | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CARTÃO NÃO PERMITE TRANSAÇÃO INTERNACIONAL                           | Somente na nossa Documentação                                 |
| CARTÃO DOMÉSTICO - TRANSAÇÃO INTERNACIONAL                     | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CARTÃO NÃO PERMITE TRANSAÇÃO INTERNACIONAL                           | Somente na nossa Documentação                                 |
| VALOR MÍNIMO DA TRANSAÇÃO INVÁLIDO                             | IRREVERSÍVEL   | 64                        | SEM CÓDIGO CORRESPONDENTE | 13                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | VALOR DA TRANSAÇÃO NÃO PERMITIDO - NÃO TENTE NOVAMENTE               | Sim                                                           |
| QUANT. DE SAQUES EXCEDIDO                                      | REVERSÍVEL     | 65                        | 65                        | 65                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | QUANTIDADE DE SAQUES EXCEDIDA. CONTATE A CENTRAL DO SEU CARTÃO       | Não                                                           |
| SENHA VENCIDA / ERRO DE CRIPTOGRAFIA DE SENHA                  | IRREVERSÍVEL   | 83                        | 74 ou 81                  | 88                        | 180                       | A7                        | SENHA INVÁLIDA - NÃO TENTE NOVAMENTE                                 | Sim                                                           |
| EXCEDIDAS TENTATIVAS DE SENHA                                  | SAQUE          | REVERSÍVEL                | 75                        | 75                        | 75                        | 106                       | A4                                                                   | EXCEDIDAS TENTATIVAS DE SENHA.CONTATE A CENTRAL DO SEU CARTÃO | Não |
| CONTA DESTINO INVÁLIDA OU INEXISTENTE                          | IRREVERSÍVEL   | 76                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTA DESTINO INVÁLIDA - NÃO TENTE NOVAMENTE                         | Não                                                           |
| CONTA ORIGEM INVÁLIDA OU INEXISTENTE                           | IRREVERSÍVEL   | 77                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTA ORIGEM INVÁLIDA - NÃO TENTE NOVAMENTE                          | Não                                                           |
| CARTÃO NOVO SEM DESBLOQUEIO                                    | REVERSÍVEL     | 78                        | -                         | 57                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | DESBLOQUEIE O CARTÃO                                                 | Sim                                                           |
| CARTÃO NOVO SEM DESBLOQUEIO                                    | IRREVERSÍVEL   | -                         | 78                        | -                         | -                         | -                         | DESBLOQUEIE O CARTÃO                                                 | Novo                                                          |
| CARTÃO INVÁLIDO (criptograma)                                  | IRREVERSÍVEL   | 82                        | 82                        | 88                        | 180                       | A7                        | ERRO NO CARTÃO - NÃO TENTE NOVAMENTE                                 | Não                                                           |
| EMISSOR FORA DO AR                                             | REVERSÍVEL     | 91                        | 91                        | 91                        | 912                       | A1                        | FALHA DE COMUNICAÇÃO - TENTE MAIS TARDE                              | Não                                                           |
| FALHA DO SISTEMA                                               | REVERSÍVEL     | 96                        | 96                        | 96                        | 911                       | AE                        | FALHA DE COMUNICAÇÃO - TENTE MAIS TARDE                              | Não                                                           |
| DIFERENÇA - PRÉ AUTORIZAÇÃO                                    | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | N8                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | VALOR DIFERENTE DA PRÉ AUTORIZAÇÃO - NÃO TENTE NOVAMENTE             | Sim                                                           |
| FUNÇÃO INCORRETA (DÉBITO)                                      | IRREVERSÍVEL   | AB                        | 52 ou 53                  | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | UTILIZE FUNÇÃO CRÉDITO                                               | Não                                                           |
| FUNÇÃO INCORRETA (CRÉDITO)                                     | IRREVERSÍVEL   | AC                        | 39                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | UTILIZE FUNÇÃO DÉBITO                                                | Não                                                           |
| TROCA DE SENHA / DESBLOQUEIO                                   | IRREVERSÍVEL   | P5                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SENHA INVÁLIDA - NÃO TENTE NOVAMENTE                                 | Não                                                           |
| NOVA SENHA NÃO ACEITA                                          | REVERSÍVEL     | P6                        | SEM CÓDIGO CORRESPONDENTE | 55                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SENHA INVÁLIDA UTILIZE A NOVA SENHA                                  | Sim                                                           |
| RECOLHER CARTÃO (NÃO HÁ FRAUDE)                                | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 4                         | 4                         | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Sim                                                           |
| ERRO POR MUDANÇA DE CHAVE DINÂMICA                             | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | N7                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | ERRO NO CARTÃO - NÃO TENTE NOVAMENTE                                 | Sim                                                           |
| FRAUDE CONFIRMADA                                              | IRREVERSÍVEL   | 57                        | 7                         | 4                         | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Não                                                           |
| EMISSOR Ñ LOCALIZADO - BIN INCORRETO (negativa do adquirente)  | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 15                        | 15                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | DADOS DO CARTÃO INVÁLIDO - NÃO TENTE NOVAMENTE                       | Não                                                           |
| NÃO CUMPRIMENTO PELAS LEIS DE ANTE LAVAGEM DE DINHEIRO         | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 64                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Não                                                           |
| REVERSÃO INVÁLIDA                                              | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 76                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Não                                                           |
| NÃO LOCALIZADO PELO ROTEADOR                                   | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 92                        | 92                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Não                                                           |
| TRANSAÇÃO NEGADA POR INFRAÇÃO DE LEI                           | IRREVERSÍVEL   | 57                        | 93                        | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Sim                                                           |
| VALOR DO TRACING DATA DUPLICADO                                | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 94                        | 94                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTENOVAMENTE                 | Não                                                           |
| SURCHARGE NÃO SUPORTADO                                        | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | B1                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| SURCHARGE NÃO SUPORTADO PELA REDE DE DÉBITO                    | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | B2                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| FORÇAR STIP                                                    | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | N0                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| SAQUE NÃO DISPONÍVEL                                           | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | N3                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SAQUE NÃO DISPONÍVEL - NÃO TENTE NOVAMENTE                           | Não                                                           |
| SUSPENSÃO DE PAGAMENTO RECORRENTE PARA UM SERVIÇO              | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R0                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE | Não                                                           |
| SUSPENSÃO DE PAGAMENTO RECORRENTE PARA TODOS SERVIÇO           | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R1                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE | Não                                                           |
| TRANSAÇÃO NÃO QUALIFICADA PARA VISA PIN                        | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R2                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Não                                                           |
| SUSPENSÃO DE TODAS AS ORDENS DE AUTORIZAÇÃO                    | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R3                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE | Não                                                           |
| NÃO É POSSÍVEL LOCALIZAR O REGISTRO NO ARQUIVO                 | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Sim                                                           |
| ARQUIVO NÃO DISPONÍVEL PARA ATUALIZAÇÃO                        | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Sim                                                           |
| CONTA ENCERRADA                                                | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 46                        | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Novo                                                          |
| FALHA VALIDAÇÃO DE ID                                          | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 6P                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | FALHA NA VERIFICAÇÃO DO ID                                           | Novo                                                          |
| UTILIZAR O CHIP                                                | IRREVERSÍVEL   | FM                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | UTILIZE O CHIP                                                       | Novo                                                          |

### Outros códigos de retorno

| Código Resposta | Definição                                                                                                                                                     | Significado                                                                                                                                                                                                                                                                                            | Ação                                                                                                                                                                                                                      | Permite Retentativa                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 0               | Transação autorizada com sucesso.                                                                                                                             | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                      | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 2               | Transação não autorizada. Transação referida.                                                                                                                 | Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.                                                                                                                                                                                                                            | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 9               | Transação cancelada parcialmente com sucesso.                                                                                                                 | Transação cancelada parcialmente com sucesso                                                                                                                                                                                                                                                           | Transação cancelada parcialmente com sucesso                                                                                                                                                                              | Não                                                  |
| 11              | Transação autorizada com sucesso para cartão emitido no exterior                                                                                              | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                      | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 21              | Cancelamento não efetuado. Transação não localizada.                                                                                                          | Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                                          | Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.                                                                                          | Não                                                  |
| 22              | Parcelamento inválido. Número de parcelas inválidas.                                                                                                          | Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                               | Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                                    | Não                                                  |
| 24              | Quantidade de parcelas inválido.                                                                                                                              | Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                            | Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                   | Não                                                  |
| 60              | Transação não autorizada.                                                                                                                                     | Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.                                                                                                                                                                                  | Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.                                                                                          | Apenas 4 vezes em 16 dias.                           |
| 67              | Transação não autorizada. Cartão bloqueado para compras hoje.                                                                                                 | Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.                                                                                                                 | Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.                                                                                                                       | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 70              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                   | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 72              | Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.                                                                                   | Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                         | Cancelamento não efetuado. Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                                          | Não                                                  |
| 79              | TRANSAÇÃO MASTERCARD NÃO PERMITIDA PARA O CARTÃO                                                                                                              | Transação não autorizada. Não é possível processar a transação devido a erro relacionado ao cartão do portador. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                         | Entre em contato com o seu banco                                                                                                                                                                                          | Não                                                  |
| 80              | Transação não autorizada. Divergencia na data de transação/pagamento.                                                                                         | Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.                                                                                                                                                                                                                    | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| 82              | TRANSAÇÃO MASTERCARD NÃO AUTORIZADA. LIGUE PARA O EMISSOR                                                                                                     | Transação não autorizada devido a regras do emissor. Oriente o portador a entrar em contato com o banco emissor.                                                                                                                                                                                       | Entre em contato com o seu banco                                                                                                                                                                                          | Não                                                  |
| 83              | TRANSAÇÃO MASTERCARD SUSPEITA DE FRAUDE                                                                                                                       | Transação não autorizada. Suspeita de fraude pelo banco emissor.                                                                                                                                                                                                                                       | Entre em contato com o seu banco                                                                                                                                                                                          | Não                                                  |
| 85              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 89              | Erro na transação.                                                                                                                                            | Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.                                                                                                                                                            | Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.                                                                                               | Apenas 4 vezes em 16 dias.                           |
| 90              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 97              | Valor não permitido para essa transação.                                                                                                                      | Transação não autorizada. Valor não permitido para essa transação.                                                                                                                                                                                                                                     | Transação não autorizada. Valor não permitido para essa transação.                                                                                                                                                        | Não                                                  |
| 98              | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.                                                                                                                                                                               | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | Apenas 4 vezes em 16 dias.                           |
| 475             | Timeout de Cancelamento                                                                                                                                       | A aplicação não respondeu dentro do tempo esperado.                                                                                                                                                                                                                                                    | Realizar uma nova tentativa após alguns segundos. Persistindo, entrar em contato com o Suporte.                                                                                                                           | Não                                                  |
| 999             | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde. Pode ser erro no SITEF, favor verificar !                                                                                                                                                                              | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| AA              | Tempo Excedido                                                                                                                                                | Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.                                                                                                                                | Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.                                                                                   | Apenas 4 vezes em 16 dias.                           |
| AF              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| AG              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| AH              | Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.                                                                      | Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.                                                                                                                                                          | Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.                                                                                                                            | Não                                                  |
| AI              | Transação não autorizada. Autenticação não foi realizada.                                                                                                     | Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)                                       | Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.                                    | Não                                                  |
| AJ              | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label. | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação. | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual. | Não                                                  |
| AV              | Transação não autorizada. Dados Inválidos                                                                                                                     | Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.                                                                                                                                                                                                     | Falha na validação dos dados. Reveja os dados informados e tente novamente.                                                                                                                                               | Apenas 4 vezes em 16 dias.                           |
| BD              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| BL              | Transação não autorizada. Limite diário excedido.                                                                                                             | Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                                     | Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.                                                                                                                                 | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| BM              | Transação não autorizada. Cartão Inválido                                                                                                                     | Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.                                                                                           | Transação não autorizada. Cartão inválido. Refaça a transação confirmando os dados informados.                                                                                                                            | Não                                                  |
| BN              | Transação não autorizada. Cartão ou conta bloqueado.                                                                                                          | Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                             | Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com seu banco emissor.                                                                                                         | Não                                                  |
| BO              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.                                                                                                                      | Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.                                                                  | Apenas 4 vezes em 16 dias.                           |
| BP              | Transação não autorizada. Conta corrente inexistente.                                                                                                         | Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                    | Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.                                                                | Não                                                  |
| BP176           | Transação não permitida.                                                                                                                                      | Parceiro deve checar se o processo de integração foi concluído com sucesso.                                                                                                                                                                                                                            | Parceiro deve checar se o processo de integração foi concluído com sucesso.                                                                                                                                               | —                                                    |
| BR              | Transação não autorizada. Conta encerrada                                                                                                                     | A conta do portador está encerrada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                                                   | A conta do portador está encerrada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                      | Não                                                  |
| C1              | Transação não permitida. Cartão não pode processar transações de débito.                                                                                      | Troque a modalidade de pagamento ou o cartão utilizado.                                                                                                                                                                                                                                                | Troque a modalidade de pagamento ou o cartão utilizado.                                                                                                                                                                   | Não                                                  |
| C2              | Transação não permitida.                                                                                                                                      | Dados incorretos. Favor rever os dados preenchidos na tela de pagamento.                                                                                                                                                                                                                               | Dados incorretos. Favor rever os dados preenchidos na tela de pagamento.                                                                                                                                                  | Não                                                  |
| C3              | Transação não permitida.                                                                                                                                      | Período inválido para este tipo de transação.                                                                                                                                                                                                                                                          | Período inválido para este tipo de transação.                                                                                                                                                                             | Não                                                  |
| CF              | Transação não autorizada.C79:J79 Falha na validação dos dados.                                                                                                | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                 | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| CG              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                 | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DF              | Transação não permitida. Falha no cartão ou cartão inválido.                                                                                                  | Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco                                                                                                                           | Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco                                                                       | Apenas 4 vezes em 16 dias.                           |
| DM              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                   | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| DQ              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                 | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DS              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                       | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| EB              | Número de parcelas maior que o Permitido.                                                                                                                     | Transação não autorizada. Entre em contato com a Cielo e verifique se o cadastro possui parcelamento liberado.                                                                                                                                                                                         | Transação não autorizada. Entre em contato com a Cielo e verifique se o cadastro possui parcelamento liberado.                                                                                                            | Sim                                                  |
| EE              | Transação não permitida. Valor da parcela inferior ao mínimo permitido.                                                                                       | Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.                                                                                                                                         | Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.                                                                                                         | Não                                                  |
| EK              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                       | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| FC              | Transação não autorizada. Ligue Emissor                                                                                                                       | Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.                                                                                                                                                                                                                  | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| FE              | Transação não autorizada. Divergencia na data de transação/pagamento.                                                                                         | Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.                                                                                                                                                                                                                    | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| FF              | Cancelamento OK                                                                                                                                               | Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.                                                                                                                                                                | Transação de cancelamento autorizada com sucesso                                                                                                                                                                          | Não                                                  |
| FG              | Transação não autorizada. Ligue AmEx 08007285090.                                                                                                             | Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090                                                                                                                      | Não                                                  |
| GA              | Aguarde Contato                                                                                                                                               | Transação não autorizada. Referida pelo Lynx Online de forma preventiva.                                                                                                                                                                                                                               | Transação não autorizada. lojista deve aguardar contato por parte da Cielo                                                                                                                                                | Não                                                  |
| GF              | Transação negada.                                                                                                                                             | Transação não autorizada, verifique se o IP informado está liberado para processar a transação                                                                                                                                                                                                         | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | Não                                                  |
| GD              | Transação não permitida.                                                                                                                                      | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                                                                                                 | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | —                                                    |
| GT              | Transação negada.                                                                                                                                             | Ataque de força bruta.                                                                                                                                                                                                                                                                                 | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | Não                                                  |
| GK              | Transação negada.                                                                                                                                             | Bloqueio temporário por ataque de força bruta.                                                                                                                                                                                                                                                         | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | Não                                                  |
| HJ              | Transação não permitida. Código da operação inválido.                                                                                                         | Transação não permitida. Código da operação Coban inválido.                                                                                                                                                                                                                                            | Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.                                                                                                                               | Não                                                  |
| IA              | Transação não permitida. Indicador da operação inválido.                                                                                                      | Transação não permitida. Indicador da operação Coban inválido.                                                                                                                                                                                                                                         | Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.                                                                                                                            | Não                                                  |
| KA              | Transação não permitida. Falha na validação dos dados.                                                                                                        | Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.                                                                                                   | Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                   | Não                                                  |
| KB              | Transação não permitida. Selecionado a opção incorrente.                                                                                                      | Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.                                                                                                  | Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                                                         | Não                                                  |
| KE              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.                                                                                                                                                        | Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.                                                                                       | Não                                                  |
| NR              | Transação não permitida.                                                                                                                                      | Transação não permitida.                                                                                                                                                                                                                                                                               | Transação não permitida. Retentar a transação após 30 dias                                                                                                                                                                | Retentar a transação após 30 dias.                   |
| RP              | Transação não permitida.                                                                                                                                      | Transação não permitida.                                                                                                                                                                                                                                                                               | Transação não permitida. Retentar a transação após 72h                                                                                                                                                                    | Retentar a transação após 72 horas.                  |
| SC              | Transação não permitida.                                                                                                                                      | Transação não permitida. Pagamento recorrente, serviço cancelado. Não retentar.                                                                                                                                                                                                                        | Transação não permitida. Pagamento recorrente, serviço cancelado. Não retentar.                                                                                                                                           | Não.                                                 |
| U3              | Transação não permitida. Falha na validação dos dados.                                                                                                        | Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.                                                                                                   | Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                   | Não                                                  |
| 6P              | Transação não autorizada. Dados Inválidos                                                                                                                     | Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.                                                                                                                                                                                                     | Falha na validação dos dados. Reveja os dados informados e tente novamente.                                                                                                                                               | Apenas 4 vezes em 16 dias.                           |

## Status do Antifraude

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
