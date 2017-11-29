---
layout: manual
title: Manual de integração
description: Manual integração técnica via API
search: true
translated: true
categories: manual
tags:
  - API Credenciamento Cielo
language_tabs:
  json: JSON
  shell: cURL
  php: php
  java: java
  csharp: c#
  javascript: javascript
---

# Visão geral

O objetivo desta documentação é orientar o desenvolvedor sobre como integrar com a **API de Credenciamento da Cielo**, descrevendo as funcionalidades, fluxo de execução e métodos a serem utilizados.

Nesse manual você encontrará a referência sobre todas as operações disponíveis na API REST de Credenciamento. Estas operações devem ser executadas utilizando sua chave específica (Merchant ID e Merchant Key) nos respectivos endpoints dos ambientes:

## O que é

Credenciamento é o processo de afiliação de novo cliente na Cielo (Estabelecimento Comercial).

## Como funciona

A integração é realizada através de serviços disponibilizados como Web Services. O modelo empregado é bastante simples: Existem duas URLs (endpoint), uma específica operações que causam efeitos colaterais - como autorização, captura e cancelamento de transações, e uma URL específica para operações que não causam efeitos colaterais, como pesquisa de transações. Essas duas URLs receberão as mensagens HTTP através dos métodos POST, GET ou PUT. Cada tipo de mensagem deve ser enviada para um recurso identificado através do path.

|Método|Descrição|
|---|---|
|**POST**|O método HTTP `POST` é utilizado na criação dos recursos ou no envio de informações que serão processadas. Por exemplo, criação de uma transação.|
|**PUT**|O método HTTP `PUT` é utilizado para atualização de um recurso já existente. Por exemplo, captura ou cancelamento de uma transação previamente autorizada.|
|**GET**|O método HTTP `GET` é utilizado para consultas de recursos já existentes. Por exemplo, consulta de transações.|

## Público-alvo

Integradores que desejam criar novos canais de credenciamento, seja de forma online através da web ou aplicativos mobile.

# Diagrama de utilização demostrando o funcionamento da solução

# Diagrama de utilização demostrando os passos para o uso da API

# Documentação Técnica

## Swagger 2.0

Acesse o swagger através do link: aqui!!!

## API Docs

### Endpoints (Sandbox e Produção)

Ambiente Produção

* https://api.cielo.com.br/affiliate

Ambiente Sandbox

* https://api.cielo.com.br/sandbox/affiliate

### Instruções para uso: realizar chamadas, autenticação.

### HTTP Header

Todas as chamadas da API de Credenciamento necessitam que as informações abaixo estejam presentes no Header na requisição:

**Client-Id**: Identificação de acesso. Sua geração ocorre no momento da criação pelo painel do desenvolvedor. Seu valor pode ser visualizado na coluna “Client ID”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”.

**Access-Token**:Identificação do token de acesso, que armazena as regras de acesso permitidas ao Client ID. Sua geração ocorre no momento da criação do Client ID pelo painel do desenvolvedor. Seu valor pode ser visualizado clicando em “detalhes” na coluna “Access Tokens”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”.

**Merchant-Id**: Token que identifica o estabelecimento comercial dentro do servidor Order Manager da Cielo LIO. Sua geração ocorre durante o processo de cadastro do Client ID. Seu valor pode ser visualizado na coluna “Merchant ID”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”.

### HTTP Status Code

| Código | Erro                  | Descrição                                                                                |
|--------|-----------------------|------------------------------------------------------------------------------------------|
| 200    | OK                    | Operação realizada com sucesso.                                                          |
| 201    | Created               | A solicitação foi realizada, resultando na criação de um novo recurso.                   |
| 204    | Empty                 | Operação realizada com sucesso, mas nenhuma resposta foi retornada.                      |
| 400    | Bad Request           | A requisição possui parâmetro(s) inválido(s).                                            |
| 401    | Unauthorized          | O token de acesso não foi informado ou não possui acesso às APIs.                        |
| 403    | Forbidden             | O acesso ao recurso foi negado.                                                          |
| 404    | Not Found             | O recurso informado no request não foi encontrado.                                       |
| 413    | Request is to Large   | A requisição está ultrapassando o limite permitido para o perfil do seu token de acesso. |
| 422    | Unprocessable Entity  | A requisição possui parâmetros obrigatórios não informados.                              |
| 429    | Too Many Requests     | O consumidor estourou o limite de requisições por tempo.                                 |
| 500    | Internal Server Error | Erro não esperado; algo está quebrado na API                                             |

### Recursos

#### Merchants

Merchants é a representação da entidade de estabelecimento comercial para a execução do fluxo de credenciamento de um novo cliente.

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v1/merchants</span></aside>

```shell
curl -X POST \
  https://api.cielo.com.br/sandbox/affiliate/v1/merchants \
  -H 'cache-control: no-cache' \
  -H 'client_id: LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ' \
  -H 'content-type: application/json' \
  -d '{
    "agribusiness": false,
    "solutions": {
        "code": 18,
		"numberOfEquipaments": 1,
		"ecommercePlan": 0,
		"telephoneCompanies": "VIVO"
	},
	"customer": {
		"documentType": "F",
		"documentNumber": 35947512017,
		"name": "nome",
		"companyName": "nome",
		"mei": false,
		"stateEnrollment": 0,
		"mcc": 8021,
		"accounts": {
			"bankCode": 341,
			"bankBranch": "1475",
			"accountNumber": "132997",
			"type": "CHECKING_ACCOUNT_CIELO"
		},
		"tradingName": "Vendinha 47599041079",
		"contactName": "Cliente teste",
		"contactEmail": "teste_47599041079@teste.com.br",
		"phoneNumbers": {
			"type": "CELL_PHONE",
			"ddd": 11,
			"number": 988995623
		},
		"addresses": {
			"type": "COMMERCIAL_ADDRESS",
			"postalCode": 13327371,
			"address": "Rua Santa Luzia",
			"number": "52",
			"add": "casa",
			"neighborhood": "Nova Era",
			"city": "Salto",
			"state": "SP",
			"country": "Brasil"
		},
		"owners": {
			"name": "Cliente 14452619010",
			"documentNumber": 11264316488,
			"birthDate": "1989-02-08",
			"phoneNumbers": {
				"type": "CELL_PHONE",
				"ddd": 11,
				"number": 998561234
			},
			"affiliatorCode": "123456789",
			"averageRevenue": 150,
			"cieloPlanCode": 1,
			"amountOfDaysForliquidation": 1
		}
	}
}'
```

```json
{
	"agribusiness": false,
	"solutions": {
		"code": 18,
		"numberOfEquipaments": 1,
		"ecommercePlan": 0,
		"telephoneCompanies": "VIVO"
	},
	"customer": {
		"documentType": "F",
		"documentNumber": 35947512017,
		"name": "nome",
		"companyName": "nome",
		"mei": false,
		"stateEnrollment": 0,
		"mcc": 8021,
		"accounts": {
			"bankCode": 341,
			"bankBranch": "1475",
			"accountNumber": "132997",
			"type": "CHECKING_ACCOUNT_CIELO"
		},
		"tradingName": "Vendinha 47599041079",
		"contactName": "Cliente teste",
		"contactEmail": "teste_47599041079@teste.com.br",
		"phoneNumbers": {
			"type": "CELL_PHONE",
			"ddd": 11,
			"number": 988995623
		},
		"addresses": {
			"type": "COMMERCIAL_ADDRESS",
			"postalCode": 13327371,
			"address": "Rua Santa Luzia",
			"number": "52",
			"add": "casa",
			"neighborhood": "Nova Era",
			"city": "Salto",
			"state": "SP",
			"country": "Brasil"
		},
		"owners": {
			"name": "Cliente 14452619010",
			"documentNumber": 11264316488,
			"birthDate": "1989-02-08",
			"phoneNumbers": {
				"type": "CELL_PHONE",
				"ddd": 11,
				"number": 998561234
			},
			"affiliatorCode": "123456789",
			"averageRevenue": 150,
			"cieloPlanCode": 1,
			"amountOfDaysForliquidation": 1
		}
	}
}
```

```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\r\n\t\"agribusiness\": false,\r\n\t\"solutions\": {\r\n\t\t\"code\": 18,\r\n\t\t\"numberOfEquipaments\": 1,\r\n\t\t\"ecommercePlan\": 0,\r\n\t\t\"telephoneCompanies\": \"VIVO\"\r\n\t},\r\n\t\"customer\": {\r\n\t\t\"documentType\": \"F\",\r\n\t\t\"documentNumber\": 35947512017,\r\n\t\t\"name\": \"nome\",\r\n\t\t\"companyName\": \"nome\",\r\n\t\t\"mei\": false,\r\n\t\t\"stateEnrollment\": 0,\r\n\t\t\"mcc\": 8021,\r\n\t\t\"accounts\": {\r\n\t\t\t\"bankCode\": 341,\r\n\t\t\t\"bankBranch\": \"1475\",\r\n\t\t\t\"accountNumber\": \"132997\",\r\n\t\t\t\"type\": \"CHECKING_ACCOUNT_CIELO\"\r\n\t\t},\r\n\t\t\"tradingName\": \"Vendinha 47599041079\",\r\n\t\t\"contactName\": \"Cliente teste\",\r\n\t\t\"contactEmail\": \"teste_47599041079@teste.com.br\",\r\n\t\t\"phoneNumbers\": {\r\n\t\t\t\"type\": \"CELL_PHONE\",\r\n\t\t\t\"ddd\": 11,\r\n\t\t\t\"number\": 988995623\r\n\t\t},\r\n\t\t\"addresses\": {\r\n\t\t\t\"type\": \"COMMERCIAL_ADDRESS\",\r\n\t\t\t\"postalCode\": 13327371,\r\n\t\t\t\"address\": \"Rua Santa Luzia\",\r\n\t\t\t\"number\": \"52\",\r\n\t\t\t\"add\": \"casa\",\r\n\t\t\t\"neighborhood\": \"Nova Era\",\r\n\t\t\t\"city\": \"Salto\",\r\n\t\t\t\"state\": \"SP\",\r\n\t\t\t\"country\": \"Brasil\"\r\n\t\t},\r\n\t\t\"owners\": {\r\n\t\t\t\"name\": \"Cliente 14452619010\",\r\n\t\t\t\"documentNumber\": 11264316488,\r\n\t\t\t\"birthDate\": \"1989-02-08\",\r\n\t\t\t\"phoneNumbers\": {\r\n\t\t\t\t\"type\": \"CELL_PHONE\",\r\n\t\t\t\t\"ddd\": 11,\r\n\t\t\t\t\"number\": 998561234\r\n\t\t\t},\r\n\t\t\t\"affiliatorCode\": \"123456789\",\r\n\t\t\t\"averageRevenue\": 150,\r\n\t\t\t\"cieloPlanCode\": 1,\r\n\t\t\t\"amountOfDaysForliquidation\": 1\r\n\t\t}\r\n\t}\r\n}");
Request request = new Request.Builder()
  .url("https://apidev.cielo.com.br/sandbox/affiliate/v1/merchants")
  .post(body)
  .addHeader("content-type", "application/json")
  .addHeader("client_id", "LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ")
  .build();

Response response = client.newCall(request).execute();
```

```php
$request = new HttpRequest();
$request->setUrl('https://apidev.cielo.com.br/sandbox/affiliate/v1/merchants');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'client_id' => 'LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ',
  'content-type' => 'application/json'
));

$request->setBody('{
	"agribusiness": false,
	"solutions": {
		"code": 18,
		"numberOfEquipaments": 1,
		"ecommercePlan": 0,
		"telephoneCompanies": "VIVO"
	},
	"customer": {
		"documentType": "F",
		"documentNumber": 35947512017,
		"name": "nome",
		"companyName": "nome",
		"mei": false,
		"stateEnrollment": 0,
		"mcc": 8021,
		"accounts": {
			"bankCode": 341,
			"bankBranch": "1475",
			"accountNumber": "132997",
			"type": "CHECKING_ACCOUNT_CIELO"
		},
		"tradingName": "Vendinha 47599041079",
		"contactName": "Cliente teste",
		"contactEmail": "teste_47599041079@teste.com.br",
		"phoneNumbers": {
			"type": "CELL_PHONE",
			"ddd": 11,
			"number": 988995623
		},
		"addresses": {
			"type": "COMMERCIAL_ADDRESS",
			"postalCode": 13327371,
			"address": "Rua Santa Luzia",
			"number": "52",
			"add": "casa",
			"neighborhood": "Nova Era",
			"city": "Salto",
			"state": "SP",
			"country": "Brasil"
		},
		"owners": {
			"name": "Cliente 14452619010",
			"documentNumber": 11264316488,
			"birthDate": "1989-02-08",
			"phoneNumbers": {
				"type": "CELL_PHONE",
				"ddd": 11,
				"number": 998561234
			},
			"affiliatorCode": "123456789",
			"averageRevenue": 150,
			"cieloPlanCode": 1,
			"amountOfDaysForliquidation": 1
		}
	}
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

```csharp
var client = new RestClient("https://apidev.cielo.com.br/sandbox/affiliate/v1/merchants");
var request = new RestRequest(Method.POST);
request.AddHeader("client_id", "LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ");
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\r\n\t\"agribusiness\": false,\r\n\t\"solutions\": {\r\n\t\t\"code\": 18,\r\n\t\t\"numberOfEquipaments\": 1,\r\n\t\t\"ecommercePlan\": 0,\r\n\t\t\"telephoneCompanies\": \"VIVO\"\r\n\t},\r\n\t\"customer\": {\r\n\t\t\"documentType\": \"F\",\r\n\t\t\"documentNumber\": 35947512017,\r\n\t\t\"name\": \"nome\",\r\n\t\t\"companyName\": \"nome\",\r\n\t\t\"mei\": false,\r\n\t\t\"stateEnrollment\": 0,\r\n\t\t\"mcc\": 8021,\r\n\t\t\"accounts\": {\r\n\t\t\t\"bankCode\": 341,\r\n\t\t\t\"bankBranch\": \"1475\",\r\n\t\t\t\"accountNumber\": \"132997\",\r\n\t\t\t\"type\": \"CHECKING_ACCOUNT_CIELO\"\r\n\t\t},\r\n\t\t\"tradingName\": \"Vendinha 47599041079\",\r\n\t\t\"contactName\": \"Cliente teste\",\r\n\t\t\"contactEmail\": \"teste_47599041079@teste.com.br\",\r\n\t\t\"phoneNumbers\": {\r\n\t\t\t\"type\": \"CELL_PHONE\",\r\n\t\t\t\"ddd\": 11,\r\n\t\t\t\"number\": 988995623\r\n\t\t},\r\n\t\t\"addresses\": {\r\n\t\t\t\"type\": \"COMMERCIAL_ADDRESS\",\r\n\t\t\t\"postalCode\": 13327371,\r\n\t\t\t\"address\": \"Rua Santa Luzia\",\r\n\t\t\t\"number\": \"52\",\r\n\t\t\t\"add\": \"casa\",\r\n\t\t\t\"neighborhood\": \"Nova Era\",\r\n\t\t\t\"city\": \"Salto\",\r\n\t\t\t\"state\": \"SP\",\r\n\t\t\t\"country\": \"Brasil\"\r\n\t\t},\r\n\t\t\"owners\": {\r\n\t\t\t\"name\": \"Cliente 14452619010\",\r\n\t\t\t\"documentNumber\": 11264316488,\r\n\t\t\t\"birthDate\": \"1989-02-08\",\r\n\t\t\t\"phoneNumbers\": {\r\n\t\t\t\t\"type\": \"CELL_PHONE\",\r\n\t\t\t\t\"ddd\": 11,\r\n\t\t\t\t\"number\": 998561234\r\n\t\t\t},\r\n\t\t\t\"affiliatorCode\": \"123456789\",\r\n\t\t\t\"averageRevenue\": 150,\r\n\t\t\t\"cieloPlanCode\": 1,\r\n\t\t\t\"amountOfDaysForliquidation\": 1\r\n\t\t}\r\n\t}\r\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://apidev.cielo.com.br/sandbox/affiliate/v1/merchants',
  headers: 
   { client_id: 'LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ',
     'content-type': 'application/json' },
  body: 
   { agribusiness: false,
     solutions: 
      { code: 18,
        numberOfEquipaments: 1,
        ecommercePlan: 0,
        telephoneCompanies: 'VIVO' },
     customer: 
      { documentType: 'F',
        documentNumber: 35947512017,
        name: 'nome',
        companyName: 'nome',
        mei: false,
        stateEnrollment: 0,
        mcc: 8021,
        accounts: 
         { bankCode: 341,
           bankBranch: '1475',
           accountNumber: '132997',
           type: 'CHECKING_ACCOUNT_CIELO' },
        tradingName: 'Vendinha 47599041079',
        contactName: 'Cliente teste',
        contactEmail: 'teste_47599041079@teste.com.br',
        phoneNumbers: { type: 'CELL_PHONE', ddd: 11, number: 988995623 },
        addresses: 
         { type: 'COMMERCIAL_ADDRESS',
           postalCode: 13327371,
           address: 'Rua Santa Luzia',
           number: '52',
           add: 'casa',
           neighborhood: 'Nova Era',
           city: 'Salto',
           state: 'SP',
           country: 'Brasil' },
        owners: 
         { name: 'Cliente 14452619010',
           documentNumber: 11264316488,
           birthDate: '1989-02-08',
           phoneNumbers: { type: 'CELL_PHONE', ddd: 11, number: 998561234 },
           affiliatorCode: '123456789',
           averageRevenue: 150,
           cieloPlanCode: 1,
           amountOfDaysForliquidation: 1 } } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```
#### Request

#### Response

#### Terminals

Terminal referencia a solução captura que retorna a identificação do terminal lógico quando associado a um estabelecimento comercial.

<aside class="request"><span class="method post">GET</span> <span class="endpoint">/v1/terminals</span></aside>

```shell
curl -X GET \
  'https://apidev.cielo.com.br/sandbox/affiliate/v1/terminals?proposalNumber=12345' \
  -H 'cache-control: no-cache' \
  -H 'client_id: LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ' \
  -H 'content-type: application/json'
```

```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://apidev.cielo.com.br/sandbox/affiliate/v1/terminals?proposalNumber=12345")
  .get()
  .addHeader("content-type", "application/json")
  .addHeader("client_id", "LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ")
  .build();

Response response = client.newCall(request).execute();
```

```php
$request = new HttpRequest();
$request->setUrl('https://apidev.cielo.com.br/sandbox/affiliate/v1/terminals');
$request->setMethod(HTTP_METH_GET);

$request->setQueryData(array(
  'proposalNumber' => '12345'
));

$request->setHeaders(array(
  'client_id' => 'LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ',
  'content-type' => 'application/json'
));

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

```csharp
var client = new RestClient("https://apidev.cielo.com.br/sandbox/affiliate/v1/terminals?proposalNumber=12345");
var request = new RestRequest(Method.GET);
request.AddHeader("client_id", "LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ");
request.AddHeader("content-type", "application/json");
IRestResponse response = client.Execute(request);
```

```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://apidev.cielo.com.br/sandbox/affiliate/v1/terminals',
  qs: { proposalNumber: '12345' },
  headers: 
   { client_id: 'LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

# SDKs (Opcional)

# Vídeo demonstrando utilização da API(Opcional)

# Cases com parceiros (Opcional)
