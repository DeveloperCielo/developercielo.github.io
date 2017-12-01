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

O objetivo desta documentação é orientar o desenvolvedor sobre como integrar com a API de Credenciamento da Cielo, descrevendo as funcionalidades, fluxo de execução e métodos a serem utilizados

Nesse manual você encontrará a referência sobre todas as operações disponíveis na API REST de Credenciamento Estas operações devem ser executadas utilizando sua chave específica (Merchant ID e Merchant Key) nos respectivos endpoints dos ambientes:

## O que é

Credenciamento é o processo de afiliação de novos clientes, que serão conhecidos como Estabelecimentos Comerciais e poderão se afiliar à Cielo e solicitar um equipamente lógico (POS / Terminal Lógico) ou site web (ecommerce) ou até mesmo através do cielo app (mobile), permitindo que os mesmos iniciem suas transações de pagamento.

## Como funciona

A integração é realizada através da operação de POST para o recurso /merchants. Para executar o post corretamente, deve seguir o padrão REST enviando todos os necessários (listados posteriormente).

É possível realizar consultas, através do método GET para obter informações necessárias que irão auxiliar e informar resultados da operação de POST.

| Método   | Descrição                                |
| -------- | ---------------------------------------- |
| **POST** | O método HTTP `POST` é utilizado na criação dos recursos ou no envio de informações que serão processadas Por exemplo, criação de uma transação |
| **GET**  | O método HTTP `GET` é utilizado para consultas de recursos já existentes Por exemplo, consulta de transações |

## Público-alvo

Integradores que desejam criar novos canais de credenciamento, seja de forma online através da web ou aplicativos mobile

## Diagrama de utilização demostrando o funcionamento da solução

## Diagrama de utilização demostrando os passos para o uso da API

![Credenciamento]({{ site.baseurl_root }}/images/credenciamento/credenciamentobr.png)

# API Docs

## Endpoints (Sandbox e Produção)

Ambiente Produção

* (https://api.cielo.com.br/affiliate)

Ambiente Sandbox

* (https://api.cielo.com.br/sandbox/affiliate)

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
| 500    | Internal Server Error | Erro não esperado; algo está quebrado na API |

## Recursos

### Criação de proposta comercial para credenciamento

Merchants é a representação da entidade de estabelecimento comercial para a execução do fluxo de credenciamento de um novo cliente

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v1/merchants</span></aside>

```shell
curl -X POST \
  https://apicielocombr/sandbox/affiliate/v1/merchants \
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

### Request

| Propriedade                          | Tipo    | Valores                                  | Descrição                                |
| ------------------------------------ | ------- | ---------------------------------------- | ---------------------------------------- |
| `agribusiness`                       | Boolean | true, false                              | ?                                        |
| `username`                           | Texto   | any                                      | Nome do usuário                          |
| `Terminalscode`                      | Texto   | ENUM: POS_PORTABLE, POS_DIALED_LINE, POS_BROADBAND, MOBILE_WITH_SCANNER, MOBILE_WITHOUT_SCANNER, ECOMMERCE_CHECKOUT, ECOMMERCE_V3, LIO_BASIC, LIO_PLUS, LIO_BASIC_V2, LIO_PLUS_V2, POS_WIFI | Identificador do terminal solicitado para o credenciamento |
| `TerminalsnumberOfEquipaments`       | Número  | any                                      | Quantidade de equipamentos               |
| `TerminalsecommercePlan`             | Número  | any                                      | Número do plano para um credenciamento ecommerce |
| `TerminalspaymentByLink`             | Boolean | true, false                              | Credenciamento será feito para pagamento utilizando link online |
| `TerminalstelephoneCompanies`        | Texto   | "VIVO", "CLARO", "TIM", "OI"             | Companhia de telefonia escolhida para compor o equipamento POS |
| `TerminalsbusinessHours`             | Texto   | any                                      | Horário comercial                        |
| `TerminalsautoService`               | Boolean | true, false                              | ?                                        |
| `CustomerdocumentType`               | Texto   | F, J                                     | Indicador do tipo de documento (F - física / J - jurídica) |
| `CustomerdocumentNumber`             | Número  | any                                      | Número do documento                      |
| `Customername`                       | Text    | any                                      | Nome do cliente                          |
| `CustomercompanyName`                | Texto   | any                                      | Nome da empresa                          |
| `Customermei`                        | Boolean | true, false                              | Indicador se é pessoa jurídica MEI (Micro empreendedor individual) |
| `CustomerstateEnrollment`            | Texto   | any                                      | ?                                        |
| `Customermcc`                        | Texto   | Sim                                      | ?                                        |
| `CustomeraccountsbankCode`           | Número  | any                                      | Código do banco                          |
| `CustomeraccountsbankBranch`         | Número  | any                                      | Número da agência                        |
| `CustomeraccountsaccountNumber`      | Número  | any                                      | Número da conta corrente                 |
| `Customeraccountstype`               | Número  | ENUM: CHECKING_ACCOUNT_CIELO, CHECKING_ACCOUNT, SAVINGS_ACCOUNT, PREPAID_CARD | Tipo da conta corrente                   |
| `CustomertradingName`                | Texto   | any                                      | ?                                        |
| `CustomercontactName`                | Texto   | any                                      | Nome do contato                          |
| `CustomercontactEmail`               | Texto   | any                                      | E-mail do contato                        |
| `CustomerphoneNumberstype`           | Texto   | ENUM: HOME_PHONE, COMMERCIAL_PHONE, CELL_PHONE, MESSAGE_PHONE, FAX | Tipo do telefone                         |
| `CustomerphoneNumbersddd`            | Número  | any                                      | Código DDD                               |
| `CustomerphoneNumbersnumber`         | Número  | any                                      | Número do telefone                       |
| `Customeraddressestype`              | Texto   | ENUM: HOME_ADDRESS, COMMERCIAL_ADDRESS, MAIL_ADDRESS, SUPPLY_ADDRESS | Tipo do endereço                         |
| `CustomeraddressespostalCode`        | Número  | any                                      | Número do CEP                            |
| `Customeraddressesaddress`           | Texto   | any                                      | Endereço (Rua/Avenida/Travessa/etc)      |
| `Customeraddressesnumber`            | Número  | any                                      | Número                                   |
| `Customeraddressesadd`               | Texto   | any                                      | ?                                        |
| `Customeraddressesneighborhood`      | Texto   | any                                      | Bairro                                   |
| `Customeraddressescity`              | Texto   | any                                      | Cidade                                   |
| `Customeraddressesstate`             | Texto   | any                                      | Estado                                   |
| `Customeraddressescountry`           | Texto   | any                                      | País                                     |
| `Customerownersname`                 | Texto   | any                                      | Nome do proprietário                     |
| `CustomerownersdocumentNumber`       | Número  | any                                      | Número do documento                      |
| `CustomerownersbirthDate`            | Data    | any                                      | Data de aniversário                      |
| `CustomerownersphoneNumberstype`     | Texto   | ENUM: HOME_PHONE, COMMERCIAL_PHONE, CELL_PHONE, MESSAGE_PHONE, FAX | Tipo do telefone                         |
| `CustomerownersphoneNumbersddd`      | Número  | any                                      | Código DDD                               |
| `CustomerownersphoneNumbersnumber`   | Número  | any                                      | Número do telefone                       |
| `CustomeraffiliatorCode`             | Número  | any                                      | Código de afiliação                      |
| `CustomeraverageRevenue`             | Número  | any                                      | ?                                        |
| `CustomercieloPlanCode`              | Número  | ENUM: DEFAULT, CONTROL                   | Código de plano cielo (comercial)        |
| `CustomeramountOfDaysForliquidation` | Número  | any                                      | Quantidade de dias para liquidação       |
| `CustomerpaymentType`                | Texto   | ENUM: IN_CASH, FINANCED                  | Tipo de pagamento                        |
| `CustomerarvTax`                     | Texto   | any                                      | Taxa de antecipação                      |

### Response

| Propriedade      | Tipo   | Valores | Descrição                                |
| ---------------- | ------ | ------- | ---------------------------------------- |
| `merchantNumber` | Número | any     | Número do EC (Estabelecimento comercial) |
| `proposalNumber` | Número | any     | Número da proposta comercial que foi criada |

### Consulta terminal lógico (equipamento)

Terminal referencia a solução captura que retorna a identificação do terminal lógico quando associado a um estabelecimento comercial

<aside class="request"><span class="method post">GET</span> <span class="endpoint">/v1/terminals</span></aside>

```shell
curl -X GET \
  'https://apidevcielocombr/sandbox/affiliate/v1/terminals?proposalNumber=12345' \
  -H 'cache-control: no-cache' \
  -H 'client_id: LTwVuZSfW1iyQDxyOQRYJSrHyFaowzlnFmofCAmUsmmSzER4rZ' \
  -H 'content-type: application/json'
```

#### Requisição

| Propriedade      | Tipo   | Valores | Descrição                                |
| ---------------- | ------ | ------- | ---------------------------------------- |
| `proposalNumber` | Número | any     | Número da proposta comercial que foi criada |

#### Resposta

| Propriedade | Tipo   | Valores | Descrição                                |
| ----------- | ------ | ------- | ---------------------------------------- |
| `code`      | Número | any     | Número do terminal lógico que foi associado ao credenciado (Estabelecimento Comercial) |
| `digit`     | Número | any     | Digito validado do terminal lógico       |
