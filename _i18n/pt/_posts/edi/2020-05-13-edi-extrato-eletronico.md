---
layout: tutorial
title: EDI - Extrato Eletrônico
description: Instruções EDI
search: true
translated: true
toc_footers: true
categories: tutorial
sort_order: 7
tags:
  - 6. EDI Cielo
---

# EXTRATO ELETRÔNICO v15

**Documentação**

[CIELO_Extrato_Eletronico_Manual_Versao_15.8](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/CIELOExtratoEletronico-Manual-Versao_15.8.pdf)

* Versão produtiva: **15.7**
* Próxima atualização: **02/07/2024 para a versão 15.8**
  
**Arquivos de teste**

[Arquivos de Teste](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/Arquivos_Testes.zip)

[15.7 Reserva Financeira-Financial Reserve](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/15-7-Reserva-Financeira-Financial-Reserve_.zip)

[15.8 Atualização de negociações-Receivable negotiation update](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/15-8-Atualizacao-de-negociacoes-Receivable-negotiation-update.zip)

**Últimas atualizações**

* Versão: 15.7 – Demonstração da Reserva financeira
  * Alterações no arquivo CIELO03 Captura/Previsão, no tópico TIPOLOGIA DOS ARQUIVOS (FORMATO E ESTRUTURA)
  * Inclusão do novo tipo de Registro R – Reserva Financeira, no tópico TIPOS DE REGISTROS E ESTRUTURA
  * Inclusão do item RESERVA FINANCEIRA no tópico CONCEITOS FINANCEIROS
* Versão: 15.8 – Novas regras de atualização na demonstração de lançamentos relacionados à Negociações de Recebíveis
  * Inclusão do item Novas regras de atualização na demonstração de lançamentos relacionados à Negociações de Recebíveis no tópico CONCILIAÇÃO ATRAVÉS DO EXTRATO ELETRÔNICO.

# Introdução

Essa API possibilita o registro de grupos e mantém seu registro para receber arquivos EDI (Electronic Data Interchange).

# Descrição do Produto

O Extrato Eletrônico é um produto disponibilizado pela Cielo aos clientes que necessitam de automatização no processo de conciliação. Nele, as informações são transmitidas de forma padronizada sem intervenção manual por meio do canal SFG (Sterling File Gateway), proporcionando agilidade e segurança no tráfego das informações. Ao lado, macrofluxo do serviço.

## Benefícios

- Permite a realização da conciliação contábil e financeira de forma automatizada
- Maior agilidade e eficiência operacional
- Integração com a automação comercial de vendas
- Segurança no recebiento das informações
- Atendimento Especializado

# Fluxo de Concessão

## Passo 1 - Login

1 - O parceiro redireciona o cliente para `{cielo-login-url}`. <br>
2 - O cliente entra com suas credenciais e clica em `Entrar`. <br>
3 - A Cielo mostra os termos de autorização e o cliente aprova este acesso clicando em `Permitir Acesso`. <br>
4 - A Cielo redireciona o cliente para o parceiro novamente em `{partner-call-back-url}`. <br>

![Login e Concessão de Acesso](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo1_login1.jpg)

> O que é base-login-url?

https://`{base-login-url}`?response_type=code
&`client_id={client_id}`
&`redirect_uri={redirect_uri}`
&`scope={scope}`
&`state={state}`

**Homologação:** https://digitalhml.hdevelo.com.br/oauth/?mode=redirect&client_id=`{client_id}`&redirect_uri=`{redirect_uri}`&state=STATE_INFO&scope=profile_read,transaction_read

**Produção:** https://minhaconta2.cielo.com.br/oauth/?mode=redirect&client_id=`{client_id}`&redirect_uri=`{redirect_uri}`&state=STATE_INFO&scope=profile_read,transaction_read

- **base-login-url:** URL base que muda por ambiente
- **response_type:** O valor deve ser fixo "code"
- **client_id:** Identificador do cliente, será enviado pela Cielo em tempo de projeto
- **redirect_uri:** URL do parceiro para a Cielo redirecionar o usuário quando o processo de login terminar, ou se der algum erro no processo
- **scope:** Uma lista separada por vírgula das APIs que o parceiro deseja acessar, os possiveis escopos serão enviados por API.
- **state:** Um valor que o cliente deseja receber no retorno para manter o estado entre a requisição e o retorno

> O que é partner-callback-url?

https://`{partner-callback-url}`?code=`{code}`&state=`{state}`

- **partner-callback-url:** A URL do parceiro que será redirecionado quando o processo de login terminar.
- **code:** O authorization code gerado pela Cielo. Com esse código o parceiro vai poder trocar por um access_token para fazer chamadas em nome do cliente.
- **state:** O mesmo valor que o parceiro enviou na requisição.

## Passo 2 – Requisitando um Access Token

- O serviço do parceiro solicita um `access_token`.
- A Cielo retorna um `acess_token`, um `refresh_token` e um `expiration_time`.

### Request

> **POST** {cielo-api-base-url}/consent/v1/oauth/access-token
>
> | Key               | Value                                                                                            |
> | ----------------- | ------------------------------------------------------------------------------------------------ |
> | **Authorization** | Basic _Base64(client_id e client_secret do parceiro concatenado com “:” e codificado em base64)_ |

```shell
curl --location --request POST 'https://{cielo-api-base-url}/consent/v1/oauth/access-token' \
--header 'Basic Basic64'
--header 'Content-Type: application/json' \
--data-raw '{
    "grant_type": "authorization_code",
    "code": "{}"
}'
--verbose
```

### Response

```json
{
"access_token": "{access_token}",
"refresh_token": "{refresh_token}",
"token_type": "access_token",
"expires_in": {expiration_time}
}
```

| Propriedade       | Descrição                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `access_token`    | O access_token para chamar as APIs da Cielo.                                                            |
| `refresh_token`   | Quando o access_token expirar o parceiro pode solicitar um novo access_token usando este refresh_token. |
| `expiration_time` | O tempo de expiração do access_token em segundos.                                                    |

### Observações

- O authorization_code precisa ser trocado por um access_token em menos de 10 minutos.
- Este tipo de access_token é mandatório para chamar as APIs que retornam dados sensíveis dos clientes.
- O parceiro precisa armazenar o access_token e o refresh_token em um lugar seguro.
- Quando o access_token expirar o parceiro não conseguirá mais chamas as APIs até que solicite um novo acess_token usando o fluxo de refresh_token.
- O acess_token gerado nesse fluxo será único por cliente da Cielo, pois precisa obrigatoriamente a aprovação do cliente.
- O parceiro NÃO consegue gerar um access_token sem o consentimento do cliente.
- O parceiro NÃO consegue usar o authorization code, recebido no primeiro passo, mais de uma vez.

## Passo 3 - Chamando as APIs

Neste momento parceiro vai conseguir chamar as APIs da Cielo sem a necessidade da aprovação do cliente, pois esta já foi concedida.

A única exigência para chamar as APIs da Cielo é enviar o seguinte header HTTP:
**Authorization: Bearer {access_token}**
Em todas as chamadas para as APIs.

- O access_token foi obtido no Segundo passo

## Passo 3.1 - Atualizando um Access Token

> 1. O serviço do parceiro chama o serviço de `refresh_token`.
> 2. A Cielo retorna um `access_token` novo, um `refresh_token` novo e um novo `expiration_time`.

O dados de resposta serão os mesmos do passo 2 quando o parceiro solicita um acess_token, porém todos os dados retornados são novos e precisam ser armazenados no lugar dos antigos.

### Request

```shell
curl --location --request POST 'https://{cielo-api-base-url}/consent/v1/oauth/access-token' \
--header 'Basic Basic64'
--header 'Content-Type: application/json' \
--data-raw '{
    "grant_type": "refresh_token",
    "refresh_token": "{}"
}'
--verbose
```

Um ponto de atenção na requisição pois agora o parceiro precisa enviar o `grant_type` como `refresh_token` e no campo `refresh_token` deve ser enviado um `refresh_token` válido (e não mais um access_token).

### Response

```json
{
"access_token": "{access_token}",
"refresh_token": "{refresh_token}",
"token_type": "access_token",
"expires_in": {expiration_time}
}
```

| Propriedade       | Descrição                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `access_token`    | O access_token para chamar as APIs da Cielo.                                                            |
| `refresh_token`   | Quando o access_token expirar o parceiro pode solicitar um novo access_token usando este refresh_token. |
| `expiration_time` | O tempo de expiração do access_token em segundos.                                                       |

## Erros

Caso ocorra algum erro do lado Cielo o cliente será redirecionado para a URL de call-back do parceiro com o parâmetro error na URL, por exemplo https://{partner-callback-url}?error={error}.

Possíveis valores para {error}:

- **lid_request:** A requisição está faltando algum parâmetro obrigatório, ou esta com algum parâmetro inválido, ou qualquer outra possibilidade que faça a URL ficar incorreta.
- **unauthorized_client:** O parceiro não está autorizado a fazer uma requisição usando este método.
- **access_denied:** O dono do recurso ou o servidor de autorização negou a requisição.
- **unsupported_response_type:** O servidor de autorização não suporta obter um authorization code usando este método.
- **invalid_scope:** O escopo é invalido, desconhecido ou malformado.
- **server_error:** O servidor de autorização encontrou uma condição inesperada e não consegue concluir esta requisição. ( Este erro é necessário porque não é possível retornar um HTTP status code 500 Internal Server Error via redirecionamento HTTP)
- **temporarily_unavailable:** O servidor de autorização não consegue tratar a requisição devido a uma sobrecarga temporária ou está em manutenção. (Este erro é necessário pois não é possível retornar um HTTP Status 503 Service Unavailable para o parceiro via redirecionamento HTTP)

> Opcionalmente pode ser retornado um outro parâmetros `error_description` com um detalhe do erro, apenas um texto simples.

## Observação

- Todos os tokens (access_token e refresh_token) devem ser armazenados em um local seguro.
- O parceiro precisam iniciar um novo fluxo de concessão se perderem os tokens ou ambos expirarem (O refresh_token tem expiração de 90 dias a partir da geração).
- Caso gere um novo refresh_token este tem mais 90 dias a partir da geração para expirar.
- O parceiro precisa iniciar um novo fluxo de concessão para cada cliente da Cielo que o parceiro deseja consultar os dados.

# Ambiente

| Ambiente    | Endereço                           |
| ----------- | ---------------------------------- |
| Sandbox     | https://api2.cielo.com.br/sandbox/ |
| Homologação | https://apihom-cielo.sensedia.com/ |
| Produção    | https://api2.cielo.com.br/         |

# Collection

Dispobilizamos as Collections utiizadas para realizar as todas operações da API. Será necessário configurar a URL e as credenciais.

[Download das Collections](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ONBOARDING_EDI_CIELO_PARA_CONCILIADORAS.postman_collection.zip)

# Operações

## **GET** Consulta a Lista de Filiais

Executa a lista de clientes abaixo do access_token informado. O filtro pode ser usado para listar apenas aqueles disponíveis ou indisponíveis. Indisponível significa que a filial já participa de outro registro. Nos serviços de registro e edição, há validação para permitir que apenas aqueles disponíveis sejam informados.

### Response

> **GET** {{host}} /merchantgroup
>
> **Headers**
>
> | Key | Value             |
> | --- | ----------------- | --------------------- |
> |     | **Authorization** | Bearer + access_token |

```json
{
  "legalEntityNumber": "string",
  "branches": [
    {
      "merchantID": "9999111222",
      "legalEntityNumber": "01234567890",
      "businessName": "V",
      "status": "UNAVAILABLE"
    }
  ]
}
```

| Propriedade         | Descrição                                                                                                                                                                                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `legalEntityNumber` | Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho). | String | 8       |             |
| `branches`          | Lista de Filiais                                                                                                                                                                                                                                                       |        |         |             |
| `businessName`      | Nome da empresa                                                                                                                                                                                                                                                        |        |         |             |
| `status`            | Filial disponível ou Indisponível                                                                                                                                                                                                                                      |        |         |             |

## **GET** Consultar configurações existentes.

Retorna configurações existentes agrupadas por mainMerchantID.

### Response

> **GET** {{host}}/mainmerchants
>
> **Headers**
>
> | Key               | Value                 |
> | ----------------- | --------------------- |
> | **Authorization** | Bearer + access_token |

```json
{
  "registerID": "38724",
  "mainMerchantID": "2006907071",
  "merchants": ["2006907071"],
  "type": [
    "SELL",
    "PAYMENT",
    "ANTECIPATION_CIELO",
    "ASSIGNMENT",
    "BALANCE",
    "ANTECIPATION_ALELO",
    "NRC",
    "PIX"
  ],
  "editStatus": "AVAILABLE"
}
```

## **POST** Registrar merchantID

Registre o ID do lojista(apenas um, uma lista ou todos), com base no número da entidade.

<aside class="warning"><b>Importante! A partir de 22/04/2024, como parte das ações relacionadas à Migração do Extrato Eletrônico da versão 14 para a versão 15, a API de Registro do Extrato (Registrar merchantID - POST /registers) será desabilitada. Qualquer nova ativação deverá ser realizada pelo time de Atendimento EDI diretamente na versão 15. </aside>

### Request

> **POST** {{host}}/registers
>
> **Headers**
>
> | Key               | Value                 |
> | ----------------- | --------------------- |
> | **Authorization** | Bearer + access_token |

```json
{
  "mainMerchantId": "9999111222",
  "merchants": ["9999111111", "9999111333"],
  "merchantEMail": "customer@customer.com",
  "type": ["SELL"]
}
```

| Propriedade      | Descrição                                                                                                                                                       | Tipo   | Tamanho | Obrigatório |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `mainMerchantId` | ID principal do cliente.                                                                                                                                        | String |         |             |
| `merchants`      | Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"] |        |         |             |
| `merchantEMail`  | Endereço de e-mail do cliente                                                                                                                                   |        |         |             |
| `type`           | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO                                     |        |         |             |

### Response

```json
{
  "legalEntityNumber": 1234567890,
  "mainMerchantId": 2008983,
  "registerID": 12345,
  "merchants": [823958412384701, 679809436576210],
  "type": ["SELL"],
  "status": "PROCESSING"
}
```

| Propriedade         | Descrição                                                                                                                                                                                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `legalEntityNumber` | Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho). | String | 8       |             |
| `mainMerchantId`    | ID principal do cliente.                                                                                                                                                                                                                                               | String |         |             |
| `registerID`        | ID do registro. O mesmo fornecido por /edi/registers                                                                                                                                                                                                                   | String |         |             |
| `merchants`         | Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]                                                                                                        |        |         |             |
| `type`              | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO                                                                                                                                            |        |         |             |
| `status`            | Status de registro. Se concluído, os arquivos serão fornecidos no dia seguinte                                                                                                                                                                                         |        |         |             |

## **GET** Consultar o Status do Registro

Recupere o status de registro do EDI.

### Response

> **GET** {{host}}/registers/{registerID}
>
> **Headers**
>
> | Key               | Value                                            |
> | ----------------- | ------------------------------------------------ |
> | **Authorization** | Bearer + access_token                            |
> | **registerID**    | Valor usado para recuperar o status do registro. |

```json
{
  "legalEntityNumber": "01234567890",
  "registerID": 12345,
  "merchants": [9999222111, 9999222222],
  "status": "PROCESSING"
}
```

| Propriedade         | Descrição                                                                                                                                                                                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `legalEntityNumber` | Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho). | String | 8       |             |
| `registerID`        | ID do registro. O mesmo fornecido por /edi/registers                                                                                                                                                                                                                   | String |         |             |
| `merchants`         | Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]                                                                                                        |        |         |             |
| `status`            | Status de registro. Se concluído, os arquivos serão fornecidos no dia seguinte                                                                                                                                                                                         |        |         |             |

## **GET** Consulta o Registro do merchantID

Consulte o MerchantID com base no registerID ou no mainMerchantID.

### Response

> **GET** {{host}}/edi?registerID={{register_id}}&mainMerchantID={{main_merchant_id}}
>
> **Headers**
>
> | Key                | Value                                                                                                                                                                     |
> | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | **Authorization**  | Bearer + access_token                                                                                                                                                     |
> | **registerID**     | O registerID é fornecido pela operação /edi/registers ao se registrar. Pode ser usado no lugar de mainMerchantID, se preferir (apenas um precisa ser informado).          |
> | **mainMerchantID** | A maneira mais comum de recuperar um registro EDI na empresa. Pode ser usado em vez de registerID, principalmente em casos de registro não realizados por /edi/registers. |

```json
{
  "legalEntityNumer": "12314314",
  "mainMerchantId": 9999111222,
  "registerID": 12345,
  "merchants": [9999111111, 9999111333],
  "type": ["SELL"],
  "acknowledge": "COMPLETED"
}
```

| Propriedade         | Descrição                                                                                                                                                                                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `legalEntityNumber` | Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho). | String | 8       |             |
| `mainMerchantId`    | ID principal do cliente.                                                                                                                                                                                                                                               | String |         |             |
| `registerID`        | ID do registro. O mesmo fornecido por /edi/registers                                                                                                                                                                                                                   | String |         |             |
| `merchants`         | Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]                                                                                                        |        |         |             |
| `type`              | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO                                                                                                                                            |        |         |             |

## **PUT** Atualizar o Registro do merchantID

Atualize o merchantID com base no registerID ou mainMerchantID.

### Request

> **PUT** {{host}}/edi
>
> **Headers**
>
> | Key               | Value                 |
> | ----------------- | --------------------- |
> | **Authorization** | Bearer + access_token |

```json
{
  "registerID": "string",
  "mainMerchantId": "9999222333",
  "merchants": ["9999222111", "9999222222"],
  "type": ["SELL"]
}
```

| Propriedade      | Descrição                                                                                                                                                       | Tipo   | Tamanho | Obrigatório |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `registerID`     | ID do registro. O mesmo fornecido por /edi/registers                                                                                                            | String |         |             |
| `mainMerchantId` | ID principal do cliente.                                                                                                                                        | String |         |             |
| `merchants`      | Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"] |        |         |             |
| `type`           | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO                                     |        |         |             |

### Response

```json
{
  "legalEntityNumber": "01234567890",
  "mainMerchantId": 9999111222,
  "registerID": 12345,
  "merchants": [9999222333, 9999111222],
  "type": ["SELL"]
}
```

| Propriedade         | Descrição                                                                                                                                                                                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `legalEntityNumber` | Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho). | String | 8       |             |
| `mainMerchantId`    | ID principal do cliente.                                                                                                                                                                                                                                               | String |         |             |
| `registerID`        | ID do registro. O mesmo fornecido por /edi/registers                                                                                                                                                                                                                   | String |         |             |
| `merchants`         | Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]                                                                                                        |        |         |             |
| `type`              | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO                                                                                                                                            |        |         |             |

<aside class="warning"><b>Importante!<br>Esta funcionalidade realiza a atualização do registro do Extrato e atribui ao Conciliador, portanto:<br>1 - Se a matriz possui, por exemplo, 10 estabelecimentos e for realizada a chamada informando apenas 3 estabelecimentos, o registro será atualizado mantendo apenas os 3 que foram informados e excluindo o registro dos 7 pré-existentes.<br>
2 - O mesmo comportamento acima ocorre com relação a atualização de tipos de extratos</b></aside>

## **DELETE** Excluir o Registro do merchantID

Consulte o MerchantID com base no registerID ou no mainMerchantID.

### Response

> **DELETE** {{host}}/edi
>
> **Headers**
>
> | Key                | Value                                                                                                                                                                     |
> | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | **Authorization**  | Bearer + access_token                                                                                                                                                     |
> | **registerID**     | O registerID é fornecido pela operação /edi/registers ao se registrar. Pode ser usado no lugar de mainMerchantID, se preferir (apenas um precisa ser informado).          |
> | **mainMerchantID** | A maneira mais comum de recuperar um registro EDI na empresa. Pode ser usado em vez de registerID, principalmente em casos de registro não realizados por /edi/registers. |

```json
{
  "legalEntityNumer": "12314314",
  "mainMerchantId": 9999111222,
  "registerID": 12345,
  "acknowledge": "COMPLETED"
}
```

| Propriedade         | Descrição                                                                                                                                                                                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `legalEntityNumber` | Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho). | String | 8       |             |
| `mainMerchantId`    | ID principal do cliente.                                                                                                                                                                                                                                               | String |         |             |
| `registerID`        | ID do registro. O mesmo fornecido por /edi/registers                                                                                                                                                                                                                   | String |         |             |
| `acknowledge`       |                                                                                                                                                                                                                                                                        |        |         |             |

# Duplicação de Matriz

A duplicação de registro funciona com base no retorno do GET /merchantgroup, se retornar "unavailable" significa que esse merchant já possui vínculo com alguma conciliadora.

> **GET** {{host}}/merchantgroup

```json
{
  "legalEntityNumber": "67625512",
  "branches": [
    {
      "merchantID": "2006907071",
      "legalEntityNumber": "67.625.512/0001-14",
      "businessName": "MERCHANTI",
      "status": "UNAVAILABLE"
    }
  ]
}
```

Com isso, será necessário efetuar um novo GET para saber se você pode ou não vincular essa cadeia de merchant a sua conciliadora, que nesse caso é o GET /mainmerchants, se você obter o status "available" no campo "editStatus", significa que você poderá fazer a duplicação de matriz via API.

> **GET** {{host}}/mainmerchants

```json
[
  {
    "registerID": "38724",
    "mainMerchantID": "2006907071",
    "merchants": ["2006907071"],
    "type": ["SELL", "ASSIGNMENT", "BALANCE"],
    "editStatus": "AVAILABLE"
  }
]
```

> GET /mainmerchants pode retornar mais de um objeto, com isso, se o objeto estiver como "available", será necessário efetuar uma chamada de PUT para cada objeto. Os objetos que retornarem “unavailable”, será necessário solicitar a duplicação manual através do edi@cielo.com.br (lembrando que isso representa apenas 10% dos casos, após a implementação da duplicação através do método PUT).

Com isso, deverá ser feita uma chamada de PUT /edi no qual, irá fazer a duplicação da matriz.

> **PUT** {{host}}/edi

```json
{
  "mainMerchantID": "2006907071",
  "registerID": "38724",
  "merchants": ["2006907071"],
  "type": ["SELL", "ASSIGNMENT"]
}
```

> O header de todas essas requisições permanecem da mesma forma, deve ser informado o Authorization, como nas demais chamadas desta API.
> Com base no retorno do GET /mainmerchants, será necessário informar o registerID, mainMerchantID e as filiais no array de merchants da chamada de PUT.

<aside class="warning"><b> Observação: Caso do retorno do GET /merchantgroup (1ºPASSO) seja "available" significa que esse merchant está disponível para registro, com isso, é necessário fazer a chamada de POST /registers.</b></aside>

# Transmissão e Reenvio de arquivo

Para receber o Extrato Eletrônico, é necessário que o cliente entre em contato com o Atendimento EDI e preencha o formulário de cadastro. Os arquivos serão disponibilizados na caixa postal diariamente, exceto o arquivo de saldo em aberto que será enviado mensalmente.
Quando não houver movimento, o arquivo será enviado somente com o `"Header"` e o `"Trailer"`.
Caso ocorra alguma inconsistência na transmissão do(s) arquivo(s), o cliente deverá informar à Cielo, contatando o Atendimento EDI (edi@cielo.com.br

## Reenvio de Arquivos

Em caso de perda do arquivo ou não recebimento, a Cielo disponibilizará na caixa postal o mesmo arquivo enviado diariamente (arquivo backup). O cliente poderá contatar o Atendimento EDI para solicitar o reenvio

## Recuperação de Arquivos

- Permite a recuperação de um movimento anterior, atualizando o status dos lançamentos.
- Os arquivos são disponibilizados separadamente do arquivo diário.
- Não disponível para o Extrato de Saldo em Aberto (09).
- A solicitação deve ser encaminhada para o Atendimento EDI.

# Conceitos Financeiros/Glossário

**Ajuste:** lançamento financeiro à crédito ou a débito realizado para regularizar uma cobrança indevida, cancelar uma venda ou repassar um chargeback para o cliente.

**Alteração do Plano Parcelado:** ocorre quando o portador solicita ao cliente uma alteração no plano parcelado contratado no início, como cancelamento total ou parcial da venda e alteração na quantidade ou valor de parcelas.

**Antecipação de Recebíveis (ARV):** serviço oferecido ao cliente afiliado à Cielo ou Alelo que deseja antecipar o recebimento de suas vendas crédito à vista e parceladas.

**Cadeia de Pagamento Centralizado:** é um grupo de clientes com a mesma raiz de CNPJ, regras de travas e antecipação, domicílio bancário e as mesmas condições comerciais de comissão e prazo. Uma cadeia possui apenas uma matriz, escolhida pelo cliente, onde estão cadastrados todos os produtos e taxas aplicados nas filiais.

**Cessão de Recebíveis:** operação de antecipação dos recebíveis realizada no domicílio bancário, disponível para o banco Bradesco.

**Chargeback:** devolução da transação pelo banco emissor, por contestação do portador.

**Cessão:** operação de antecipação de pagamentos efetuadacom a Cielo ou com o mercado. Registros de contrapartida de operações feitas com o mercado dentro dos arquivos de venda, dependem do envio dos dados por parte do financiador a Cielo em tempo hábil. Operações enviadas de forma tardia não serão
demonstradas nos arquivos de venda, sendo necessário solicitar o reprocessamento dos extratos aos canais de atendimento.

**Data da Venda:** dia em que a venda foi realizada pelo cliente Cielo. No caso de clientes que operam com soluções ecommerce, esta é a data na qual o portador realizou a compra no site e não a data na qual foi feita a confirmação da venda pelo cliente Cielo.

**Data da Apresentação:** dia em que a venda foi submetida para processamento na Cielo, podendo ser um sábado, domingo ou feriado. Essa é a data base para o cálculo da programação de pagamento e pode ser diferente da data da venda, de acordo com o tipo de solução de captura utilizado.

**Data da Captura:** data em que a transação foi capturada no sistema Cielo. Para clientes Cielo que operam com soluções e-commerce, esta é a data na qual a transação foi confirmada pelo cliente.

**Data do Envio ao Banco:** data em que o arquivo de pagamento (crédito ou débito) foi enviado para o banco de domicílio do cliente.

**Data do Pagamento:** dia do efetivo pagamento do valor na conta-corrente do cliente, considerando o prazo de pagamento acordado. Caso a data calculada não seja dia útil, o pagamento será realizado no primeiro dia útil posterior. Inicialmente, após a captura da venda, é informada a data prevista de pagamento, que poderá ser postergada no caso do valor ser utilizado para compensar a cobrança de algum débito proveniente de cancelamento de venda, chargeback ou cobrança de serviços. O pagamento também poderá ser antecipado caso o cliente realize uma operação de antecipação.

**Matriz de Extrato:** cadastro que permite a inclusão de todos os estabelecimentos controlados pelo cliente, independente do tipo de pagamento (centralizado ou individual).

**Gravame**: operação de crédito no modelo de garantiaefetuada com um agente financiador. Não acarreta a antecipação da data de pagamento dos valores, apenas a troca de titularidade do recebedor.

**Número Único da Transação:** é atribuido pela Cielo e identifica cada transação de forma única, permitindo que a conciliação das ações de ajustes e antecipação de recebíveis realizadas tanto no RO quanto no CV sejam conciliadas por essa chave, Para isso, a solução de conciliação deverá usar somente as partes fixas do número único, seguindo esta composição.

| Partes | Composição                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| 1      | 15 posições fixas que identificam o resumo de operações (RO) de forma única, mantendo o histórico na Cielo.      |
| 2      | 07 posições variáveis. Identificam as alterações realizadas no RO.                                               |
| 3      | 04 posições fixas que identificam o Comprovante de Venda (CV) dentro de um RO mantendo o seu histórico na Cielo. |
| 4      | 03 posições variáveis. Elas identificam as alterações realizadas no CV.                                          |

**Parcelado Loja Arredondamento do Valor da Parcela:** é sempre realizado na 1ª parcela e ocorre nos casos em que o resultado da divisão do valor da venda pela quantidade de parcelas for uma dízima periódica. Neste caso, a 1ª parcela será maior do que as demais.

**Parcelado Loja - Prazo:** no extrato de Vendas com Plano Parcelado, todas as parcelas serão enviadas com a data de apresentação original. No entanto, no extrato de pagamentos, será demonstrada a data de liberação da respectiva parcela. O cálculo da data de pagamento de todas as parcelas tem como base a data da apresentação da 1ª parcela e possui uma lógica diferente para transações de cada uma das bandeiras, conforme abaixo:

VISA, ELO, DINERS e demais bandeiras: As parcelas serão liberadas mensalmente no mesmo dia da 1ª parcela, não importando se o dia é útil ou não. Desta forma, uma venda em 04 parcelas apresentada em 10/01/2015 terá o seguinte plano de liberação (prazo de pagamento: 30 dias):

| Parcela | Data da apresentação | Data de depósito (Liberação da Parcela) | Data de pagamento |
| ------- | -------------------- | --------------------------------------- | ----------------- |
| 01/04   | 10/01/2015           | 10/01/2015                              | 09/02/2015        |
| 02/04   | 10/01/2015           | 10/02/2015                              | 12/03/2015        |
| 03/04   | 10/01/2015           | 10/03/2015                              | 09/04/2015        |
| 04/04   | 10/01/2015           | 10/04/2015                              | 11/05/2015        |

A única exceção para a regra acima ocorre quando o dia não existir no mês de liberação da parcela. Exemplo: venda cuja 1ª parcela foi apresentada em 31/01/2015. Como não existe dia 31 no mês de fevereiro, a parcela deste mês será apresentada no último dia do mês, ou seja, 28/02/2015.

MASTERCARD: a data de apresentação da 1ª parcela também será a data base para liberação de todas as parcelas do plano, no entanto, as parcelas futuras serão sempre 30 dias após apresentação da primeira parcela, mantendo essa lógica até a conclusão do plano. No exemplo da venda apresentada em 10/01/2015 utilizado anteriormente, notamos que as parcelas serão liberadas em 30, 60, 90 após a apresentação da primeira parcela (prazo de pagamento: 30 dias):

| Parcela | Data da apresentação | Data de depósito (Liberação da Parcela) | Data de pagamento |
| ------- | -------------------- | --------------------------------------- | ----------------- |
| 01/04   | 10/01/2015           | 10/01/2015                              | 09/02/2015        |
| 02/04   | 10/01/2015           | 09/02/2015                              | 11/03/2015        |
| 03/04   | 10/01/2015           | 11/03/2015                              | 10/04/2015        |
| 04/04   | 10/01/2015           | 10/04/2015                              | 11/05/2015        |

**Rejeição de Transação:** ocorre quando o cliente ou a venda não possuem os atributos necessários para o correto processamento e agendamento do pagamento.

**Revenda:** ocorre quando existe uma alteração no plano de pagamento de uma venda parcelada, seja na quantidade de parcelas, ou no valor total da transação.

**Solução de Captura:** equipamento e/ou software de processamento de dados (POS, PDV, e-commerce, mobile payment, EDI etc.) que se conecta à rede Cielo para autorização e captura de transações.

**Resumo de Operações (RO):** o número do RO identifica um agrupamento de vendas em determinada data. Tem 7 posições e será formatado conforme abaixo.

| Posição                                 | Descrição                         | Edição de dados                                                                                                             |
| --------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1                                       | Tipo de produto                   | 0 - crédito à vista <br> 3 - parcelado emissor <br> 4 - parcelado loja <br> 5 - cartão de débito <br> 6 - parcelado cliente |
| 2 e 3                                   | Ano que a transação foi realizada | AA                                                                                                                          |
| 4 e 5                                   | Mês que a transação foi realizada | MM                                                                                                                          |
| 6 e 7 Dia que a transação foi realizada | DD                                |

**Saldo em Aberto:** compreende todos os lançamentos à receber com a Cielo. Devem ser considerados os pagamentos da Cielo não realizados no passado devido à cancelamentos e contestações.

**Tipos de cadastro:** com o cadastro por Grupo Comercial, que utiliza a raiz de CNPJ, todos os novos estabelecimentos da raiz são automaticamente inclusos no extrato eletrônico, evitando perdas de informações.

![Níveis Extrato Eletrênico](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/niveis_extrato_eletronico.png)
