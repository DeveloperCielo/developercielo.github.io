---
layout: manual
title: Manual de Integração
description: Integracao Cielo Credenciamento
search: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API credenciamento Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Visão geral

O objetivo desta documentação é orientar o desenvolvedor sobre como fazer a integração junto à Cielo, para o processo de credenciamento, informando todos os passos, acesso aos recursos disponíveis e como tratar erros e validações necessário.

## Público-alvo

***API Restrita/Privada, necessário liberação interna para utilização, disponível apenas para colaboradores Cielo.*** Qualquer dúvida entre em contato através do e-mail: customer.support@sensedia.com

## O que é

Credenciamento é o processo de afiliação de novos clientes, conhecidos como Estabelecimentos Comerciais. O fluxo de credenciamento é iniciado através da API, segue para um fluxo interno e posteriormente o novo cliente receberá a liberação para operar autorizações e capturas através de um canal lógico, POS / ecommerce / mobile.

## Como funciona

Para integrar a API de credenciamento (afiliação) é necessário integrar as chamadas utilizando os verbos POST e GET do padrão Rest.

| Método   | Descrição                                |
| -------- | ---------------------------------------- |
| **POST** | O método HTTP `POST` é utilizado na criação dos recursos ou no envio de informações que serão processadas Por exemplo, criação de uma transação |
| **GET**  | O método HTTP `GET` é utilizado para consultas de recursos já existentes Por exemplo, consulta de transações |

É necessário validar dados de cadastro:
- Dados pessoais
- Domicilio bancário 
- Endereço
- Código MCC

Esses dados irão compor as informações necessárias para criar uma proposta de credenciamento, essa proposta é submetida via POST para o recurso /merchants.

## Diagrama de utilização demostrando o funcionamento da solução

## Diagrama de utilização demostrando os passos para o uso da API

![Credenciamento]({{ site.baseurl_root }}/images/credenciamento/credenciamentobr.png)

## Endpoints (Sandbox e Produção)

Ambiente Produção

* [https://api.cielo.com.br/affiliate](https://api.cielo.com.br/affiliate)

Ambiente Sandbox

* [https://api.cielo.com.br/affiliate/sandbox](https://api.cielo.com.br/sandbox/affiliate)

## Instruções para uso: realizar chamadas, autenticação

## HTTP Header

Todas as chamadas da API de Credenciamento necessitam que as informações abaixo estejam presentes no Header na requisição:

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

## Criação de proposta comercial para credenciamento

Merchants é a representação da entidade de estabelecimento comercial para a execução do fluxo de credenciamento de um novo cliente

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v1/merchants</span></aside>

```shell
curl -X POST \
  https://apicielocombr/sandbox/affiliate/v1/merchants \
  -H 'client_id: <your_client_id>' \
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
        "contactEmail": "teste_47599041079@testecombr",
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
        "contactEmail": "teste_47599041079@testecombr",
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

***Request***

`HEADERS`

------

| Parâmetro    | Valor            |
| ------------ | ---------------- |
| client_id    | <your_client_id> |
| Content-Type | application/json |

`CORPO`

| Propriedade                          |  Tipo   |                 Valores                  | Descrição                                |
| ------------------------------------ | :-----: | :--------------------------------------: | ---------------------------------------- |
| `agribusiness`                       | Boolean |               true, false                | ?                                        |
| `username`                           | String  |                   any                    | Nome do usuário                          |
| `Terminalscode`                      | String  | `POS_PORTABLE, POS_DIALED_LINE, POS_BROADBAND, MOBILE_WITH_SCANNER, MOBILE_WITHOUT_SCANNER, ECOMMERCE_CHECKOUT, ECOMMERCE_V3, LIO_BASIC, LIO_PLUS, LIO_BASIC_V2, LIO_PLUS_V2, POS_WIFI` | Identificador do terminal solicitado para o credenciamento |
| `TerminalsnumberOfEquipaments`       | Number  |                   any                    | Quantidade de equipamentos               |
| `TerminalsecommercePlan`             | Number  |                   any                    | Number do plano para um credenciamento ecommerce |
| `TerminalspaymentByLink`             | Boolean |               true, false                | Credenciamento será feito para pagamento utilizando link online |
| `TerminalstelephoneCompanies`        | String  |          `VIVO, CLARO, TIM, OI`          | Companhia de telefonia escolhida para compor o equipamento POS |
| `TerminalsbusinessHours`             | String  |                   any                    | Horário comercial                        |
| `TerminalsautoService`               | Boolean |               true, false                | ?                                        |
| `CustomerdocumentType`               | String  |                  `F, J`                  | Indicador do tipo de documento (F - física / J - jurídica) |
| `CustomerdocumentNumber`             | Number  |                   any                    | Number do documento                      |
| `Customername`                       |  Text   |                   any                    | Nome do cliente                          |
| `CustomercompanyName`                | String  |                   any                    | Nome da empresa                          |
| `Customermei`                        | Boolean |               true, false                | Indicador se é pessoa jurídica MEI (Micro empreendedor individual) |
| `CustomerstateEnrollment`            | String  |                   any                    | ?                                        |
| `Customermcc`                        | String  |                   Sim                    | ?                                        |
| `CustomeraccountsbankCode`           | Number  |                   any                    | Código do banco                          |
| `CustomeraccountsbankBranch`         | Number  |                   any                    | Number da agência                        |
| `CustomeraccountsaccountNumber`      | Number  |                   any                    | Number da conta corrente                 |
| `Customeraccountstype`               | Number  | `CHECKING_ACCOUNT_CIELO, CHECKING_ACCOUNT, SAVINGS_ACCOUNT, PREPAID_CARD` | Tipo da conta corrente                   |
| `CustomertradingName`                | String  |                   any                    | ?                                        |
| `CustomercontactName`                | String  |                   any                    | Nome do contato                          |
| `CustomercontactEmail`               | String  |                   any                    | E-mail do contato                        |
| `CustomerphoneNumberstype`           | String  | `HOME_PHONE, COMMERCIAL_PHONE, CELL_PHONE, MESSAGE_PHONE, FAX` | Tipo do telefone                         |
| `CustomerphoneNumbersddd`            | Number  |                   any                    | Código DDD                               |
| `CustomerphoneNumbersnumber`         | Number  |                   any                    | Number do telefone                       |
| `Customeraddressestype`              | String  | `HOME_ADDRESS, COMMERCIAL_ADDRESS, MAIL_ADDRESS, SUPPLY_ADDRESS` | Tipo do endereço                         |
| `CustomeraddressespostalCode`        | Number  |                   any                    | Number do CEP                            |
| `Customeraddressesaddress`           | String  |                   any                    | Endereço (Rua/Avenida/Travessa/etc)      |
| `Customeraddressesnumber`            | Number  |                   any                    | Number                                   |
| `Customeraddressesadd`               | String  |                   any                    | ?                                        |
| `Customeraddressesneighborhood`      | String  |                   any                    | Bairro                                   |
| `Customeraddressescity`              | String  |                   any                    | Cidade                                   |
| `Customeraddressesstate`             | String  |                   any                    | Estado                                   |
| `Customeraddressescountry`           | String  |                   any                    | País                                     |
| `Customerownersname`                 | String  |                   any                    | Nome do proprietário                     |
| `CustomerownersdocumentNumber`       | Number  |                   any                    | Number do documento                      |
| `CustomerownersbirthDate`            |  Data   |                   any                    | Data de aniversário                      |
| `CustomerownersphoneNumberstype`     | String  | `HOME_PHONE, COMMERCIAL_PHONE, CELL_PHONE, MESSAGE_PHONE, FAX` | Tipo do telefone                         |
| `CustomerownersphoneNumbersddd`      | Number  |                   any                    | Código DDD                               |
| `CustomerownersphoneNumbersnumber`   | Number  |                   any                    | Number do telefone                       |
| `CustomeraffiliatorCode`             | Number  |                   any                    | Código de afiliação                      |
| `CustomeraverageRevenue`             | Number  |                   any                    | ?                                        |
| `CustomercieloPlanCode`              | Number  |            `DEFAULT, CONTROL`            | Código de plano cielo (comercial)        |
| `CustomeramountOfDaysForliquidation` | Number  |                   any                    | Quantidade de dias para liquidação       |
| `CustomerpaymentType`                | String  |           `IN_CASH, FINANCED`            | Tipo de pagamento                        |
| `CustomerarvTax`                     | String  |                   any                    | Taxa de antecipação                      |

***Response***

| Propriedade      |  Tipo  | Valores | Descrição                                |
| ---------------- | :----: | :-----: | ---------------------------------------- |
| `merchantNumber` | Number |   any   | Number do EC (Estabelecimento comercial) |
| `proposalNumber` | Number |   any   | Number da proposta comercial que foi criada |

## Consulta terminal lógico (equipamento)

Consulta o terminal que faz referência à solução captura que retorna a identificação do terminal lógico quando associado a um estabelecimento comercial

<aside class="request"><span class="method post">GET</span> <span class="endpoint">/v1/terminals</span></aside>

```shell
curl -X GET \
  'https://apidevcielocombr/sandbox/affiliate/v1/terminals?proposalNumber=12345' \
  -H 'client_id: <your_client_id>' \
  -H 'content-type: application/json'
```

***Request***

`HEADERS`

------

| Parâmetro    | Valor            |
| ------------ | ---------------- |
| client_id    | <your_client_id> |
| Content-Type | application/json |

`PARÂMETROS`

------

| Propriedade      |  Tipo  | Valores | Descrição                                |
| ---------------- | :----: | :-----: | ---------------------------------------- |
| `proposalNumber` | Number |   any   | Number da proposta comercial que foi criada |

***Response***

| Propriedade     |  Tipo  | Valores | Descrição                                |
| --------------- | :----: | :-----: | ---------------------------------------- |
| `logicalNumber` | String |   any   | Number do terminal lógico que foi associado ao credenciado (Estabelecimento Comercial) |
| `digit`         | String |   any   | Digito validado do terminal lógico       |

## Consulta bancos habilitados para realizar o credenciamento

Consulta a lista de bancos habilitados para realizar o processo de credenciamento. Essa consulta permite realizar uma validação para verificar quais bancos estão cadastrados junto a Cielo para serem utilizados no processo de credenciamento.

<aside class="request"><span class="method post">GET</span> <span class="endpoint">/v1/banks</span></aside>

```shell
curl -X GET \
  'https://apidevcielocombr/sandbox/affiliate/v1/banks' \
  -H 'client_id: <your_client_id>' \
  -H 'content-type: application/json'
```

***Request***

`HEADERS`

------

| Parâmetro    | Valor            |
| ------------ | ---------------- |
| client_id    | <your_client_id> |
| Content-Type | application/json |

***Response***

| Propriedade |  Tipo  | Valores | Descrição        |
| ----------- | :----: | :-----: | ---------------- |
| `code`      | String |   any   | Código do banco. |
| `name`      | String |   any   | Nome do banco.   |

## Listagem de endereços habilitados para credenciamento

Consulta os endereços disponíveis para credenciamento a partir do CEP. É feita uma validação na base de endereços consultando o CEP enviado por parâmetro.

```shell
curl -X GET \
  'https://apidev.cielo.com.br/sandbox/affiliate/v1/addresses?postal_code=04552000' \
  -H 'Content-Type: application/json' \
  -H 'client_id: <your_client_id>'
```

***Request***

`HEADERS`

------

| Parâmetro    | Valor            |
| ------------ | ---------------- |
| client_id    | <your_client_id> |
| Content-Type | application/json |

`PARÂMETROS`

| Propriedade   |  Tipo  | Valores | Descrição     |
| ------------- | :----: | :-----: | ------------- |
| `postal_code` | String |   any   | Número do CEP |

***Response***

| Propriedade    |  Tipo  | Valores | Descrição     |
| -------------- | :----: | :-----: | ------------- |
| `postalCode`   | Number |   any   | Número do CEP |
| `address`      | String |   any   | Endereço      |
| `add`          | String |   any   | ??            |
| `neighborhood` | String |   any   | Bairro        |
| `city`         | String |   any   | Cidade        |
| `state`        | String |   any   | Estado        |
| `country`      | String |   any   | País          |

## Listagem de categorias (MCC) habilitados para credenciamento

Consulta as categorias de afiliações diponíveis para o credenciamento via API.

```shell
curl -X GET \
  'https://apidev.cielo.com.br/sandbox/affiliate/v1/merchant-categories?customer_type=F' \
  -H 'Content-Type: application/json' \
  -H 'client_id: <your_client_id>'
```

***Request***

`HEADERS`

------

| Parâmetro    | Valor            |
| ------------ | ---------------- |
| client_id    | <your_client_id> |
| Content-Type | application/json |

`PARÂMETROS`

| Propriedade     |  Tipo  | Valores | Descrição                                |
| --------------- | :----: | :-----: | ---------------------------------------- |
| `customer_type` | String | F ou J  | Tipo de cadastro. (F - pessoa fisica; J - pessoa juridica) |

***Response***

| Propriedade   |  Tipo  | Valores | Descrição        |
| ------------- | :----: | :-----: | ---------------- |
| `code`        | String |   any   | Código do MCC    |
| `description` | String |   any   | Descrição do MCC |
