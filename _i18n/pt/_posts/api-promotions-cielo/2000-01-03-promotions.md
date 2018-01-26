---
layout: manual
title: Manual de Integração
description: Techinical specification for integrations using Promotions APIs wich includes resources and access to functions to store and return data related to the Cielo´s promotions.
search: true
categories: manual
sort_order: 1
tags:
  - Cielo Promo
language_tabs:
  shell: cURL
---

# Visão geral - Promotions

Documentação técnica para orientar o desenvolvedor de como realizar uma integração junto à Cielo para o processo de divulgação de ofertas e promoções dos estabelecimentos comerciais que utilizam o Cielo Promo.

## Público-alvo

API Restrita/Privada, necessário liberação interna para utilização, disponível apenas para colaboradores Cielo. Desenvolvedores e integradores parceiros que possuem conhecimentos em integração utilizando APIs REST e que queiram integrar o seu sistema / aplicativo mobile com as funcionalidades da API promotions da Cielo.

## O que é

APIs que permitem a divulgação das Promoções (descontos e brindes) em estabelecimentos que possuem o Cielo Promo nas plataformas dos Parceiros.

## Como funciona

Descrição dos verbos HTTP comuns as APIs:

| Método    | Descrição                                |
| --------- | ---------------------------------------- |
| **POST**  | O método HTTP `POST` é utilizado na criação dos recursos ou no envio de informações que serão processadas Por exemplo, criação de uma transação |
| **GET**   | O método HTTP `GET` é utilizado para consultas de recursos já existentes Por exemplo, consulta de transações |
| **PUT**   | O método HTTP `PUT` é utilizado substituir recursos, executando uma atualização completa |
| **PATCH** | O método HTTP `PATCH` é utilizado atualizar recursos, executando uma atualização parcial dos dados |

### Diagrama de utilização demostrando o funcionamento da solução

Fluxo de autenticação e autorização a ser executado para utilizar os recursos da API:

![Fluxo]({{ site.baseurl_root }}/images/apicielopromotions/fluxoautenticacao.png)

### Diagrama de utilização demostrando os passos para o uso da API

Passo 1: Chamar recurso /login para obter a página de autenticação e autorização

![Passo1]({{ site.baseurl_root }}/images/apicielopromotions/passo1.png)

Passo 2: Com o response do passo 1, renderizar o HTML na aplicação para iteração com usuário

![Passo2]({{ site.baseurl_root }}/images/apicielopromotions/passo2.png)

Passo 3: Após a execução do login, obter através do callback o código de autorização

![Passo3]({{ site.baseurl_root }}/images/apicielopromotions/passo3.png)

Passo 4: Com o código de autorização, chamar o recurso /access-token para gerar o access_token necessário para executar as chamadas aos recursos da API

![Passo4]({{ site.baseurl_root }}/images/apicielopromotions/passo4.png)

Passo 5: Com a resposta, guardar o access_token (tempo de expiração) e o refresh_token (para regerar o access_token)

## Endpoints (Sandbox e Produção)

Ambiente Produção

* [https://api.cielo.com.br/promotions/v1](https://api.cielo.com.br/promotions/v1)

Ambiente Sandbox

* [https://api.cielo.com.br/sandbox/promotions/v1](https://api.cielo.com.br/sandbox/promotions/v1)

## HTTP Header

Todas as chamadas da API necessitam que as informações abaixo estejam presentes no Header na requisição:

**Client-Id**: Identificação de acesso Sua geração ocorre no momento da criação pelo painel do desenvolvedor Seu valor pode ser visualizado na coluna “Client ID”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”

**Access-Token**:Identificação do token de acesso, que armazena as regras de acesso permitidas ao Client ID Sua geração ocorre no momento da criação do Client ID pelo painel do desenvolvedor Seu valor pode ser visualizado clicando em “detalhes” na coluna “Access Tokens”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”

## HTTP Status Code

| Código | Erro                  | Descrição                                |
| ------ | --------------------- | ---------------------------------------- |
| 200    | OK                    | Operação realizada com sucesso           |
| 201    | Created               | A solicitação foi realizada, resultando na criação de um novo recurso |
| 204    | Empty                 | Operação realizada com sucesso, mas nenhuma resposta foi retornada |
| 400    | Bad Request           | A requisição possui parâmetro(s) inválido(s) |
| 401    | Unauthorized          | O token de acesso não foi informado ou não possui acesso às APIs |
| 403    | Forbidden             | O acesso ao recurso foi negado           |
| 404    | Not Found             | O recurso informado no request não foi encontrado |
| 413    | Request is to Large   | A requisição está ultrapassando o limite permitido para o perfil do seu token de acesso |
| 422    | Unprocessable Entity  | A requisição possui parâmetros obrigatórios não informados |
| 429    | Too Many Requests     | O consumidor estourou o limite de requisições por tempo |
| 500    | Internal Server Error | Erro não esperado; algoestá quebrado na API |

# API Docs

## Fidelidade 

### Obtendo HTML da página de LOGIN

<aside class="request"><span class="method get">GET</span><span class="endpoint">/login</span></aside>

***`REQUEST`***

|     Nome     | Localização |  Tipo  |                Descrição                 | Obrigatório |
| :----------: | :---------: | :----: | :--------------------------------------: | :---------: |
|  client_id   |    query    | string |  Client ID fornecido para a aplicação.   |     Sim     |
| redirect_url |    query    | string | Redirect URL fornecida para receber o callback. |     Sim     |
|     name     |    query    | string |             Nome do portador             |     Sim     |
|     cpf      |    query    | string |             CPF do portador              |     Sim     |
|  birthdate   |    query    | string |      Data de nascimento do portador      |     Sim     |
|    email     |    query    | string |            E-mail do portador            |     Sim     |

***Response***

| Codigo |           Descrição           |                  Model                   |
| ------ | :---------------------------: | :--------------------------------------: |
| 301    | Login Screen URL Redirection. | `Header: {"Location":{"description":"Login screen URL + client_id + redirect_url","type":"string"}}` |
| 400    |         Bad Request.          | `{"description":"Error full description.","type":"string"}` |
| 401    |         Unauthorized.         | `{"description":"Error full description.","type":"string"}` |
| 403    |          Forbidden.           | `{"description":"Error full description.","type":"string"}` |
| 404    |          Not Found.           | `{"description":"Error full description.","type":"string"}` |
| 422    |     Unprocessable Entity.     | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |    Internal Server Error.     | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |         Bad Gateway.          | `{"description":"Error full description.","type":"string"}` |
| 504    |       Gateway Timeout.        | `{"description":"Error full description.","type":"string"}` |

### Obtendo HTML da página de cadastro de cartões

<aside class="request"><span class="method get">GET</span><span class="endpoint">/cards</span></aside>

***`REQUEST`***

| Nome         | Localização |  Tipo  |                Descrição                 | Obrigatório |
| ------------ | :---------: | :----: | :--------------------------------------: | :---------: |
| client_id    |    query    | string |  Client ID fornecido para a aplicação.   |     Sim     |
| access_token |    query    | string |               Access Token               |     Sim     |
| redirect_url |    query    | string | Redirect URL fornecida para receber o callback. |     Sim     |

***Response***

| Codigo |                Descrição                 |                  Model                   |
| ------ | :--------------------------------------: | :--------------------------------------: |
| 301    | URL redirection of the registration screen. | `Header: {"Location":{"description":"Card screen URL + client_id + redirect_url","type":"string"}}` |
| 400    |               Bad Request.               | `{"description":"Error full description.","type":"string"}` |
| 401    |              Unauthorized.               | `{"description":"Error full description.","type":"string"}` |
| 403    |                Forbidden.                | `{"description":"Error full description.","type":"string"}` |
| 404    |                Not Found.                | `{"description":"Error full description.","type":"string"}` |
| 422    |          Unprocessable Entity.           | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |          Internal Server Error.          | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |               Bad Gateway.               | `{"description":"Error full description.","type":"string"}` |
| 504    |             Gateway Timeout.             | `{"description":"Error full description.","type":"string"}` |

### Retorna os dados do portador

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me</span></aside>

***`REQUEST`***

|     Nome     | Localização |  Tipo  |               Descrição               | Obrigatório |
| :----------: | :---------: | :----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string | Client ID fornecido para a aplicação. |     Sim     |
| access_token |   header    | string |             Access Token              |     Sim     |

***`RESPONSE`***

| Codigo |       Descrição        |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 200    |        Success         | `{"allOf":[ { "type":"object", "properties":{ "devices":{ "type":"array", "items":{ "id": { "type": "integer", "description": "Device identifier." }, "type": { "type": "string", "enum": [ "ANDROID", "IOS" ] } } } } },{ "id": { "type": "integer", "format": "int64", "description": "Card holder identifier." }, "birthdate": { "type": "string", "format": "date-time", "description": "Date of birth. The card holder must be at least 10 years old." }, "document": { "type": "string", "description": "Card holder document number.", "maxLength": 11 }, "email": { "type": "string", "description": "Card holder e-mail.", "maxLength": 100 }, "gender": { "type": "string", "description": "Card holder gender (F/M).", "enum": [ "FEMALE", "MALE" ] }, "name": { "type": "string", "description": "name.", "maxLength": 100 }, "phone": { "areaCode": { "type": "integer", "format": "int32" }, "phoneNumber": { "type": "integer", "format": "int32" } } } ]}` |
| 400    |      Bad Request.      | `{"description":"Error full description.","type":"string"}` |
| 401    |     Unauthorized.      | `{"description":"Error full description.","type":"string"}` |
| 403    |       Forbidden.       | `{"description":"Error full description.","type":"string"}` |
| 404    |       Not Found.       | `{"description":"Error full description.","type":"string"}` |
| 412    |  Precondition Failed.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"description":"Error full description.","type":"string"}` |
| 504    |    Gateway Timeout.    | `{"description":"Error full description.","type":"string"}` |

### Retorna lista de cartões do portador

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me/cards</span></aside>

***`REQUEST`***

|     Nome     | Localização |  Tipo   |               Descrição               | Obrigatório |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| access_token |   header    | string  |             Access token              |     Sim     |
|   _offset    |    query    | integer |   Registro inicial a ser retornado    |     Sim     |
|    _limit    |    query    | integer |    Quantidade limite de registros     |     Sim     |
|   _expand    |    query    | string  |  Expande o relacionamento no retorno  |     Não     |

***`RESPONSE`***

| Codigo |         Descrição         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 200    |            OK.            | `{"type":"object","properties":{"id":{"type":"number","format":"int64","description":"Card idenfifier."},"nickname":{"type":"string","description":"Card nickname."},"brand":{"type":"string","description":"Card brand."},"maskedPan":{"type":"string","description":"4 last digits."},"type":{"type": "string", "enum": [ "DEBIT", "CREDIT", "MULTIPLE" ]},"status":{"type": "string", "enum": [ "STRONG", "WEAK" ]},"partners":{"type":"array","items":{"allOf": [ { "type": "object", "properties": { "statusAssociation": { "description": "Requested association status.", "type": "boolean" } } }, { "id": { "type": "number", "format": "int64", "description": "Partner identifier." }, "name": { "type": "string", "description": "Partner name." }, "description": { "type": "string", "description": "Partner description." }, "term": { "type": "string", "description": "Partner accept term URL." }, "associationType": { "type": "string", "description": "Type of association released to partner.", "enum": [ "AUTOMATIC", "MANUAL" ] } } ]}}}}` |
| 400    |       Bad Request.        | `{"description":"Error full description.","type":"string"}` |
| 401    |       Unauthorized.       | `{"description":"Error full description.","type":"string"}` |
| 403    |        Forbidden.         | `{"description":"Error full description.","type":"string"}` |
| 404    |        Not Found.         | `{"description":"Error full description.","type":"string"}` |
| 405    |    Method Not Allowed.    | `{"description":"Error full description.","type":"string"}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"description":"Error full description.","type":"string"}` |
| 415    |  Unsupported Media Type.  | `{"description":"Error full description.","type":"string"}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"description":"Error full description.","type":"string"}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"description":"Error full description.","type":"string"}` |
| 504    |     Gateway Timeout.      | `{"description":"Error full description.","type":"string"}` |

### Retorna lista de transações positivadas de um portador

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me/transactions</span></aside>

***`REQUEST`***

|     Nome     | Localização |  Tipo   |               Descrição               | Obrigatório |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| access_token |   header    | string  |    Access token provided at login.    |     Sim     |
|   _offset    |    query    | integer |   Registro inicial a ser retornado    |     Sim     |
|    _limit    |    query    | integer |    Quantidade limite de registros     |     Sim     |
|  start_date  |    query    | string  |       Data Inicial (ISO 8601).        |     Sim     |
|   end_date   |    query    | string  |        Data Final (ISO 8601).         |     Sim     |

***`RESPONSE`***

| Codigo |       Descrição        |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 200    |          OK.           | `{"allOf":[{"type":"object","properties":{"transactionCancelled":{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Transaction Identifier." }, "commercialEstablishment": { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } } }, "productPrimary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "productSecondary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "containsPromotions": { "type": "boolean", "description": "Flag that identifies whether it contains promotion."},"transactionUndone":{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Transaction Identifier." }, "commercialEstablishment": { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } } }, "productPrimary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "productSecondary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "containsPromotions": { "type": "boolean", "description": "Flag that identifies whether it contains promotion."}}},{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Transaction Identifier." }, "commercialEstablishment": { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } } }, "productPrimary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "productSecondary": { "type": "object", "properties": { "id": { "type": "integer", "description": "Product identifier." }, "description": { "type": "string", "description": "Product name." } } }, "containsPromotions": { "type": "boolean", "description": "Flag that identifies whether it contains promotion."}]}` |
| 400    |      Bad Request.      | `{"description":"Error full description.","type":"string"}` |
| 401    |     Unauthorized.      | `{"description":"Error full description.","type":"string"}` |
| 403    |       Forbidden.       | `{"description":"Error full description.","type":"string"}` |
| 404    |       Not Found.       | `{"description":"Error full description.","type":"string"}` |
| 412    |  Precondition Failed.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"description":"Error full description.","type":"string"}` |
| 504    |    Gateway Timeout.    | `{"description":"Error full description.","type":"string"}` |

### Obtém dados de um cartão

<aside class="request"><span class="method get">GET</span><span class="endpoint">/me/cards/{card_id}</span></aside>

***`REQUEST`***

|     Nome     | Localização |  Tipo   |               Descrição               | Obrigatório |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| access_token |   header    | string  |             Access token              |     Sim     |
|   card_id    |    path     | integer |       ID do cartão do portador        |     Sim     |
|   _expand    |    query    | string  |  Expande o relacionamento no retorno  |     Não     |

***`RESPONSE`***

| Codigo |       Descrição        |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 200    |          Ok.           | `{"type":"object","properties":{"id":{"type":"number","format":"int64","description":"Card idenfifier."},"nickname":{"type":"string","description":"Card nickname."},"brand":{"type":"string","description":"Card brand."},"maskedPan":{"type":"string","description":"4 last digits."},"type":{"type": "string", "enum": [ "DEBIT", "CREDIT", "MULTIPLE" ]},"status":{"type": "string", "enum": [ "STRONG", "WEAK" ]},"partners":{"allOf": [ { "type": "object", "properties": { "statusAssociation": { "description": "Requested association status.", "type": "boolean" } } }, { "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Partner identifier." }, "name": { "type": "string", "description": "Partner name." }, "description": { "type": "string", "description": "Partner description." }, "term": { "type": "string", "description": "Partner accept term URL." }, "associationType": { "type": "string", "description": "Type of association released to partner.", "enum": [ "AUTOMATIC", "MANUAL" ] } } } ]}}}}` |
| 400    |      Bad Request.      | `{"type":"string","description":"Error full description."}` |
| 401    |     Unauthorized.      | `{"type":"string","description":"Error full description."}` |
| 403    |       Forbidden.       | `{"type":"string","description":"Error full description."}` |
| 404    |       Not Found.       | `{"type":"string","description":"Error full description."}` |
| 412    |  Precondition Failed.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"type":"string","description":"Error full description."}` |
| 504    |    Gateway Timeout.    | `{"type":"string","description":"Error full description."}` |

### Retorna lista dos estabelecimentos comerciais

<aside class="request"><span class="method get">GET</span><span class="endpoint">/commercial-establishments</span></aside>

***`REQUEST`***

|   Nome    | Localização |  Tipo  |               Descrição               | Obrigatório |
| :-------: | :---------: | :----: | :-----------------------------------: | :---------: |
| client_id |   header    | string | Client ID fornecido para a aplicação. |     Sim     |
|   cnpj    |    query    | string |                 CNPJ                  |     Não     |
|    cpf    |    query    | string |                  CPF                  |     Não     |

***`RESPONSE`***

| Codigo |            Descrição            |                  Model                   |
| ------ | :-----------------------------: | :--------------------------------------: |
| 200    | Commercial Establishments List. | `{"type":"object","properties":{"id":{"type":"number","format":"int64","description":"Commercial establishment identifier."},"fictitiousName":{"type":"string","description":"Fantasy name."},"businessActivity":{"type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } }}}}` |
| 400    |          Bad Request.           | `{"description":"Error full description.","type":"string"}` |
| 401    |          Unauthorized.          | `{"description":"Error full description.","type":"string"}` |
| 403    |           Forbidden.            | `{"description":"Error full description.","type":"string"}` |
| 404    |           Not Found.            | `{"description":"Error full description.","type":"string"}` |
| 422    |      Unprocessable Entity.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |     Internal Server Error.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |          Bad Gateway.           | `{"description":"Error full description.","type":"string"}` |
| 504    |        Gateway Timeout.         | `{"description":"Error full description.","type":"string"}` |

### Retorna a subscrição do Estabelecimento Comercial a uma promoção

<aside class="request"><span class="method get">GET</span><span class="endpoint">/commercial-establishments/{commercial_establishment_id}/subscriptions/{subscription_id}</span></aside>

***`REQUEST`***

|            Nome             | Localização |  Tipo   |               Descrição               | Obrigatório |
| :-------------------------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|          client_id          |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| commercial_establishment_id |    path     | integer |    ID do estabelecimento comercial    |     Sim     |
|       subscription_id       |    path     | integer |           ID da subscrição            |     Sim     |

***`RESPONSE`***

| Codigo |            Descrição            |                  Model                   |
| ------ | :-----------------------------: | :--------------------------------------: |
| 200    | Commercial establishments list. | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"ID da promoção."},"status":{ "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "description": "Subscription status identifier" }, "description": { "type": "string", "description": "ubscription status description" } }},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"processingDate":{"type":"string","format":"date","description":"Processing date - ISO8601."}}}` |
| 400    |          Bad Request.           | `{"description":"Error full description.","type":"string"}` |
| 401    |          Unauthorized.          | `{"description":"Error full description.","type":"string"}` |
| 403    |           Forbidden.            | `{"description":"Error full description.","type":"string"}` |
| 404    |           Not Found.            | `{"description":"Error full description.","type":"string"}` |
| 422    |      Unprocessable Entity.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |     Internal Server Error.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |          Bad Gateway.           | `{"description":"Error full description.","type":"string"}` |
| 504    |        Gateway Timeout.         | `{"description":"Error full description.","type":"string"}` |

### Retorna a lista das subscrições aceitas e processadas para um Estabelecimento Comercial

<aside class="request"><span class="method get">GET</span><span class="endpoint">/commercial-establishments/{commercial_establishment_id}/subscriptions</span></aside>

***`REQUEST`***

|            Nome             | Localização |  Tipo   |               Descrição               | Obrigatório |
| :-------------------------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|          client_id          |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| commercial_establishment_id |    path     | integer |    ID do estabelecimento comercial    |     Sim     |

***`RESPONSE`***

| Codigo |            Descrição             |                  Model                   |
| ------ | :------------------------------: | :--------------------------------------: |
| 200    | Commercial establishments list*. | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"ID da promoção."},"status":{ "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "description": "Subscription status identifier" }, "description": { "type": "string", "description": "ubscription status description" } }},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"processingDate":{"type":"string","format":"date","description":"Processing date - ISO8601."}}}` |
| 400    |           Bad Request.           | `{"description":"Error full description.","type":"string"}` |
| 401    |          Unauthorized.           | `{"description":"Error full description.","type":"string"}` |
| 403    |            Forbidden.            | `{"description":"Error full description.","type":"string"}` |
| 404    |            Not Found.            | `{"description":"Error full description.","type":"string"}` |
| 422    |      Unprocessable Entity.       | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |      Internal Server Error.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |           Bad Gateway.           | `{"description":"Error full description.","type":"string"}` |
| 504    |         Gateway Timeout.         | `{"description":"Error full description.","type":"string"}` |

### Envia um pedido de subscrição a uma promoção para um Estabelecimento Comercial

<aside class="request"><span class="method post">POST</span><span class="endpoint">/commercial-establishments/{commercial_establishment_id}/subscriptions</span></aside>

***`REQUEST`***

|            Nome             | Localização |  Tipo   |                Descrição                 | Obrigatório |
| :-------------------------: | :---------: | :-----: | :--------------------------------------: | :---------: |
|          client_id          |   header    | string  |  Client ID fornecido para a aplicação.   |     Sim     |
| commercial_establishment_id |    path     | integer |      ID do estabelecimento comerial      |     Sim     |
|        subscription         |    body     | object  |  { "promotionID" : 0, "action" : "S" }   |     Sim     |
|  subscription.promotionID   |    body     | integer |              ID da promoção              |     Sim     |
|     subscription.action     |    body     | string  | Tipo da ação:                                             S - subscribe / U - unsubscribe |     Sim     |

***`RESPONSE`***

| Codigo |           Descrição            |                  Model                   |
| ------ | :----------------------------: | :--------------------------------------: |
| 202    | Subscription request accepted. | `Header: {"Location":{"description":"Location for request status query","type":"string"}}` |
| 400    |          Bad Request.          | `{"description":"Error full description.","type":"string"}` |
| 401    |         Unauthorized.          | `{"description":"Error full description.","type":"string"}` |
| 403    |           Forbidden.           | `{"description":"Error full description.","type":"string"}` |
| 404    |           Not Found.           | `{"description":"Error full description.","type":"string"}` |
| 422    |     Unprocessable Entity.      | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |     Internal Server Error.     | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |          Bad Gateway.          | `{"description":"Error full description.","type":"string"}` |
| 504    |        Gateway Timeout.        | `{"description":"Error full description.","type":"string"}` |

### Atualiza o status de um subscrição

<aside class="request"><span class="method patch">PATCH</span><span class="endpoint">/subscriptions/{subscription_id}</span></aside>

***`REQUEST`***

|           Nome           | Localização |  Tipo   |                Descrição                 | Obrigatório |
| :----------------------: | :---------: | :-----: | :--------------------------------------: | :---------: |
|        client_id         |   header    | string  |  Client ID fornecido para a aplicação.   |     Sim     |
|     subscription_id      |    path     | integer | Commercial establishment subscription identifier to a promotion. |     Sim     |
|       subscription       |    body     | object  |  { "promotionID" : 0, "action" : "S" }   |     Sim     |
| subscription.promotionID |    body     | integer |              ID da promoção              |     Sim     |
|   subscription.action    |    body     | string  | Tipo da ação:                                                   S - subscribe / U - unsubscribe |     Sim     |

***`RESPONSE`***

| Codigo |       Descrição        |                  Model                   |
| ------ | :--------------------: | :--------------------------------------: |
| 204    |      No Content.       | `{"description":"Error full description.","type":"string"}` |
| 400    |      Bad Request.      | `{"description":"Error full description.","type":"string"}` |
| 401    |     Unauthorized.      | `{"description":"Error full description.","type":"string"}` |
| 403    |       Forbidden.       | `{"description":"Error full description.","type":"string"}` |
| 404    |       Not Found.       | `{"description":"Error full description.","type":"string"}` |
| 422    | Unprocessable Entity.  | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    | Internal Server Error. | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |      Bad Gateway.      | `{"description":"Error full description.","type":"string"}` |
| 504    |    Gateway Timeout.    | `{"description":"Error full description.","type":"string"}` |

### Obtém a lista de subscrições não processadas

<aside class="request"><span class="method get">GET</span><span class="endpoint">/subscriptions/queue</span></aside>

***`REQUEST`***

|   Nome    | Localização |  Tipo  |               Descrição               | Obrigatório |
| :-------: | :---------: | :----: | :-----------------------------------: | :---------: |
| client_id |   header    | string | Client ID fornecido para a aplicação. |     Sim     |

***`RESPONSE`***

| Codigo |             Descrição              |                  Model                   |
| ------ | :--------------------------------: | :--------------------------------------: |
| 200    | List of unprocessed subscriptions. | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"Promotion identifier."},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]}}}` |
| 400    |            Bad Request.            | `{"description":"Error full description.","type":"string"}` |
| 401    |           Unauthorized.            | `{"description":"Error full description.","type":"string"}` |
| 403    |             Forbidden.             | `{"description":"Error full description.","type":"string"}` |
| 404    |             Not Found.             | `{"description":"Error full description.","type":"string"}` |
| 422    |       Unprocessable Entity.        | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |       Internal Server Error.       | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |            Bad Gateway.            | `{"description":"Error full description.","type":"string"}` |
| 504    |          Gateway Timeout.          | `{"description":"Error full description.","type":"string"}` |

### Obtém o status de uma subscrição não procesada

<aside class="request"><span class="method get">GET</span><span class="endpoint">/subscriptions/{subscription_id}/queue</span></aside>

***`REQUEST`***

|      Nome       | Localização |  Tipo   |               Descrição               | Obrigatório |
| :-------------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|    client_id    |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| subscription_id |    path     | integer |           ID da subscrição            |     Sim     |

***`RESPONSE`***

| Codigo |                Descrição                 |                  Model                   |
| ------ | :--------------------------------------: | :--------------------------------------: |
| 200    |           Queue request data.            | `{"type":"object","properties":{"id":{"type":"integer","format":"int64","description":"Subscription identifier."},"promotionId":{"type":"integer","format":"int64","description":"Promotion identifier."},"subscriptionDate":{"type":"string","format":"date","description":"Subscription date - ISO8601."},"action":{"type":"string","description":"Action to be taken when subscribing.","enum":["S","U"]}}}` |
| 303    | Request processed. Redirect to the correct location. | `Header: {"Location":{"description":"Location of subscription creation.","type":"string"}}` |
| 400    |               Bad Request.               | `{"description":"Error full description.","type":"string"}` |
| 401    |              Unauthorized.               | `{"description":"Error full description.","type":"string"}` |
| 403    |                Forbidden.                | `{"description":"Error full description.","type":"string"}` |
| 404    |                Not Found.                | `{"description":"Error full description.","type":"string"}` |
| 422    |          Unprocessable Entity.           | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 500    |          Internal Server Error.          | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |               Bad Gateway.               | `{"description":"Error full description.","type":"string"}` |
| 504    |             Gateway Timeout.             | `{"description":"Error full description.","type":"string"}` |

### Atualiza o ACCESS_TOKEN a partir do refresh_token

<aside class="request"><span class="method post">POST</span><span class="endpoint">/refresh-token</span></aside>

***`REQUEST`***

|        Nome        | Localização |  Tipo  |                Descrição                 | Obrigatório |
| :----------------: | :---------: | :----: | :--------------------------------------: | :---------: |
|     client_id      |   header    | string |  Client ID fornecido para a aplicação.   |     Sim     |
|   authorization    |   header    | string | Código de autorização correspondente a concatenação do client_id + client_secret convertido para Base 64. |     Sim     |
|      refresh       |    body     | object | { "grant_type":"string" , "code": "string" } |     Sim     |
| refresh.grant_type |    body     | string | Tipo do request, ex. grant_type = refresh_token |     Sim     |
|    refresh.code    |    body     | string |         Código do refresh_token          |     Sim     |

***`RESPONSE`***

| Codigo |         Descrição         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 201    |         Created.          | `{"type":"object","properties":{"access_token":{"type":"string","description":"Access Token"},"refresh_token":{"type":"string","description":"Refresh Token"},"token_type":{"type":"string","description":"Token Type"},"expires_in":{"type":"integer","description":"Expires in"}}}` |
| 400    |       Bad Request.        | `{"description":"Error full description.","type":"string"}` |
| 401    |       Unauthorized.       | `{"description":"Error full description.","type":"string"}` |
| 403    |        Forbidden.         | `{"description":"Error full description.","type":"string"}` |
| 404    |        Not Found.         | `{"description":"Error full description.","type":"string"}` |
| 405    |    Method Not Allowed.    | `{"description":"Error full description.","type":"string"}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"description":"Error full description.","type":"string"}` |
| 415    |  Unsupported Media Type.  | `{"description":"Error full description.","type":"string"}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"description":"Error full description.","type":"string"}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"description":"Error full description.","type":"string"}` |
| 504    |     Gateway Timeout.      | `{"description":"Error full description.","type":"string"}` |

### Obtém o ACCESS_TOKEN

<aside class="request"><span class="method post">POST</span><span class="endpoint">/access-token</span></aside>

***`REQUEST`***

| Nome             | Localização |  Tipo  |                Descrição                 | Obrigatório |
| ---------------- | :---------: | :----: | :--------------------------------------: | ----------- |
| client_id        |   header    | string |  Client ID fornecido para a aplicação.   | Sim         |
| authorization    |   header    | string | Código de autorização correspondente a concatenação do client_id + client_secret convertido para Base 64. | Sim         |
| grant            |    body     | object | { "grant_type":"string" , "code": "string" } | Sim         |
| grant.grant_type |    body     | string | Tipo do request, ex. grant_type = authorization_code | Sim         |
| grant.code       |    body     | string |       Código do authorization_code       |             |

***`RESPONSE`***

| Codigo |         Descrição         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 201    |         Created.          | `{"type":"object","properties":{"access_token":{"type":"string","description":"Access Token"},"refresh_token":{"type":"string","description":"Refresh Token"},"token_type":{"type":"string","description":"Token Type"},"expires_in":{"type":"integer","description":"Expires in"}}}` |
| 400    |       Bad Request.        | `{"description":"Error full description.","type":"string"}` |
| 401    |       Unauthorized.       | `{"description":"Error full description.","type":"string"}` |
| 403    |        Forbidden.         | `{"description":"Error full description.","type":"string"}` |
| 404    |        Not Found.         | `{"description":"Error full description.","type":"string"}` |
| 405    |    Method Not Allowed.    | `{"description":"Error full description.","type":"string"}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"description":"Error full description.","type":"string"}` |
| 415    |  Unsupported Media Type.  | `{"description":"Error full description.","type":"string"}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"description":"Error full description.","type":"string"}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"description":"Error full description.","type":"string"}` |
| 504    |     Gateway Timeout.      | `{"description":"Error full description.","type":"string"}` |

## Promoções

### Obtém lista de promoções

<aside class="request"><span class="method get">GET</span><span class="endpoint">/promotions</span></aside>

***`REQUEST`***

|   Nome    | Localização |  Tipo   |                Descrição                 | Obrigatório |
| :-------: | :---------: | :-----: | :--------------------------------------: | :---------: |
| client_id |   header    | string  |  Client ID fornecido para a aplicação.   |     Sim     |
| latitude  |    query    | number  |                 Latitude                 |     Sim     |
| longitude |    query    | number  |                Longitude                 |     Sim     |
|  radius   |    query    | integer |                   Raio                   |     Sim     |
|  active   |    query    | boolean | Indicador para campanha ativa / não ativa |     Não     |
|   type    |    query    | string  | Tipo da Campanha. Ex: A – RFM Amount; B – Event Birthday; E – Event Day; F – RFM Frequency; G – Generic; P – RFM Punch; R – Event Recurring Hour/Day; X – RFM Recency; W – Event Welcome; |     Não     |
|  _offset  |    query    | integer |     Registro inicial a ser retornado     |     Sim     |
|  _limit   |    query    | integer | Quantidade de registros a serem retornados |     Sim     |
|   _sort   |    query    | string  |     Define a ordenação do resultado      |     Não     |

***`RESPONSE`***

| Codigo |         Descrição         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 200    |            OK.            | `{"allOf":[{"type":"object","properties":{"commercialEstablishment":{ "type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } }}}},{"type": "object", "properties": { "id": { "type": "integer", "description": "Campaign identifier in the PROMO database." }, "active": { "type": "boolean", "description": "Field that identifies whether the campaign is active." }, "endDate": { "type": "string", "format": "date", "description": "End date (ISO 8601)." }, "startDate": { "type": "string", "format": "date", "description": "Start date (ISO 8601)." }, "title": { "type": "string", "description": "Promotional Campaign Title." }, "description": { "type": "string", "description": "Promotional Campaign Description." }, "transactionDays": { "type": "string", "description": "Transaction Days." }, "campaignModel": { "type": "string", "description": "Campaign model." }, "premium": { "type": "string", "description": "Campaign Prize." }, "campaignType": { "type": "string", "description": "Tipo da Campanha. Ex: A – RFM Amount; B – Event Birthday; E – Event Day; F – RFM Frequency; G – Generic; P – RFM Punch; R – Event Recurring Hour/Day; X – RFM Recency; W – Event Welcome;", "enum": [ "A", "B", "E", "F", "G", "P", "R", "X", "W" ] }, "validityRedemption": { "type": "string", "format": "date", "description": "Validity of the redemption." }, "shareable": { "type": "boolean", "description": "Field that identifies whether the campaign can be shared." } }}]}` |
| 400    |       Bad Request.        | `{"type":"string","description":"Error full description."}` |
| 401    |       Unauthorized.       | `{"type":"string","description":"Error full description."}` |
| 403    |        Forbidden.         | `{"type":"string","description":"Error full description."}` |
| 404    |        Not Found.         | `{"type":"string","description":"Error full description."}` |
| 405    |    Method Not Allowed.    | `{"type":"string","description":"Error full description."}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"type":"string","description":"Error full description."}` |
| 415    |  Unsupported Media Type.  | `{"type":"string","description":"Error full description."}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"type":"string","description":"Error full description."}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"type":"string","description":"Error full description."}` |
| 504    |     Gateway Timeout.      | `{"type":"string","description":"Error full description."}` |

### Obtém uma promoção específica

<aside class="request"><span class="method get">GET</span><span class="endpoint">/promotions/{promotion_id}</span></aside>

***`REQUEST`***

|     Nome     | Localização |  Tipo   |               Descrição               | Obrigatório |
| :----------: | :---------: | :-----: | :-----------------------------------: | :---------: |
|  client_id   |   header    | string  | Client ID fornecido para a aplicação. |     Sim     |
| promotion_id |    path     | integer |            ID da promoção             |     Sim     |

***`RESPONSE`***

| Codigo |         Descrição         |                  Model                   |
| ------ | :-----------------------: | :--------------------------------------: |
| 200    |            OK.            | `{"allOf":[{"type":"object","properties":{"commercialEstablishment":{"type": "object", "properties": { "id": { "type": "number", "format": "int64", "description": "Commercial establishment identifier." }, "fictitiousName": { "type": "string", "description": "Fantasy name." }, "businessActivity": { "type": "object", "properties": { "id": { "type": "integer", "description": "Business activity identifier." } } } }}}},{ "type": "object", "properties": { "id": { "type": "integer", "description": "Campaign identifier in the PROMO database." }, "active": { "type": "boolean", "description": "Field that identifies whether the campaign is active." }, "endDate": { "type": "string", "format": "date", "description": "End date (ISO 8601)." }, "startDate": { "type": "string", "format": "date", "description": "Start date (ISO 8601)." }, "title": { "type": "string", "description": "Promotional Campaign Title." }, "description": { "type": "string", "description": "Promotional Campaign Description." }, "transactionDays": { "type": "string", "description": "Transaction Days." }, "campaignModel": { "type": "string", "description": "Campaign model." }, "premium": { "type": "string", "description": "Campaign Prize." }, "campaignType": { "type": "string", "description": "Tipo da Campanha. Ex: A – RFM Amount; B – Event Birthday; E – Event Day; F – RFM Frequency; G – Generic; P – RFM Punch; R – Event Recurring Hour/Day; X – RFM Recency; W – Event Welcome;", "enum": [ "A", "B", "E", "F", "G", "P", "R", "X", "W" ] }, "validityRedemption": { "type": "string", "format": "date", "description": "Validity of the redemption." }, "shareable": { "type": "boolean", "description": "Field that identifies whether the campaign can be shared." }}]}` |
| 400    |       Bad Request.        | `{"type":"string","description":"Error full description."}` |
| 401    |       Unauthorized.       | `{"type":"string","description":"Error full description."}` |
| 403    |        Forbidden.         | `{"type":"string","description":"Error full description."}` |
| 404    |        Not Found.         | `{"type":"string","description":"Error full description."}` |
| 405    |    Method Not Allowed.    | `{"type":"string","description":"Error full description."}` |
| 412    |   Precondition Failed.    | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 413    | Request Entity Too Large. | `{"type":"string","description":"Error full description."}` |
| 415    |  Unsupported Media Type.  | `{"type":"string","description":"Error full description."}` |
| 422    |   Unprocessable Entity.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 429    |    Too Many Requests.     | `{"type":"string","description":"Error full description."}` |
| 500    |  Internal Server Error.   | `{"properties":{"code":{"type":"string","description":"Error code."},"description":{"type":"string","description":"Error full description."}}}` |
| 502    |       Bad Gateway.        | `{"type":"string","description":"Error full description."}` |
| 504    |     Gateway Timeout.      | `{"type":"string","description":"Error full description."}` |
