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
  - EDI Cielo
---

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
| `expiration_time` | O tempo de expiração do access_token em milisgundos.                                                    |

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
| `expiration_time` | O tempo de expiração do access_token em milisgundos.                                                    |

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

# Tipos de Extrato Eletrônico

## Tabela A - Tipos de Arquivo

| Tipo de Arquivo                   | Informação                                                                                                                                                                                                                                | Tipo de Registro                                                                                                                                                                              | Objetivo                                                                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **03 Vendas com Plano Parcelado** | Vendas concluídas (capturadas) no dia anterior, ajustes e transações rejeitadas, com a previsão de pagamento. Todo o plano parcelado da venda realizada no dia anterior.                                                                  | 0 - Header <br> 1 - Detalhe RO (com a primeira parcela) <br> 2 - Detalhe CV <br> 1 - Detalhe RO (previsão da segunda parcela em diante) <br> 3 - Operação de Recebíveis <br> 9 - Trailer <br> | Conferir se todas as vendas realizadas foram recebidas pela Cielo e as previsões de pagamento.                                                      |
| **04 Pagamentos**                 | Valores pagos na conta-corrente no dia do envio do Extrato: detalha os ROs e ajustes compensados no dia. <br> Transações compensadas, já antecipadas ou cedidas anteriormente e pagamentos de parcelas em aberto.                         | 0 - Header <br> 1 - Detalhe RO <br> 2 - Detalhe CV <br> 3 - Operação de Recebíveis <br> 9 - Trailer <br>                                                                                      | Conferir origem do pagamento recebido (tipo de venda, bandeira e cliente/estabelecimento que efetuou a venda).<br>Conciliação com a conta corrente. |
| **09 Saldo em Aberto**            | Valores a receber com a Cielo, contemplando as transações realizadas, capturadas e processadas, vendas a débito, crédito e parceladas ainda não liquidadas no movimento fechado no mês anterior. O arquivo é disponibilizado mensalmente. | 0 - Header <br> 1 - Detalhe RO <br> 3 - Operação de Recebíveis <br> 9 - Trailer                                                                                                               | Atualizar a previsão futura de recebimentos. Não deve ser utilizado para conciliação.                                                               |
| **15 Negociação de Recebíveis**   | Operação de negociação de recebíveis realizada no dia anterior.                                                                                                                                                                           | 0 - Header <br> A - Resumo Negociação de Recebíveis <br> B - Detalhe Negociação de Recebíveis <br> C - Conta de Recebimento <br> 9 - Trailer                                                  | Conferir as negociações que foram realizadas.                                                                                                       |
| **16 Transações PIX**             | Vendas (transferências) e Ajustes (devoluções) realizados no dia anterior                                                                                                                                                                 | 0 - Header <br> 8 - Detalhe Transação PIX <br> 9 - Trailer                                                                                                                                    | Conferir as transações que foram realizadas na modalidade PIX.                                                                                      |

É possível solicitar o recebimento dos seguintes tipos de arquivos (exclusivo transações Alelo):

| Tipo de Arquivo                        | Informação                                                                                                                                                                                                                               | Tipo de Registro                                                                                                                                                                                                                                         | Objetivo                                                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **10 Antecipação de Recebíveis Alelo** | Operação de ARV realizada pela Alelo no dia anterior ao envio do arquivo e respectivo detalhe dos ROs e CVs que foram antecipados.                                                                                                       | 0 - Header <br> 5 - Detalhe de ARV <br> 6 - Detalhe ROs antecipados <br> 2 - Detalhe CV <br> 7 - Detalhe dos débitos de ROs Antecipados <br> 2 - Detalhe CV <br> 9 - Trailer <br> Obs.: Será demonstrado o registro tipo 5 para cada operação realizada. | Atualizar o fluxo de caixa, considerando os valores já recebidos através da antecipação.                       |
| **12 Vendas Alelo**                    | Vendas concluídas (capturadas) no dia anterior, ajustes e transações rejeitadas, com a previsão de pagamento.                                                                                                                            | 0 - Header <br> 6 - Detalhe ROs <br> 2 - Detalhe CV V <br> 9 - Trailer                                                                                                                                                                                   | Conferir se todas as vendas realizadas foram recebidas e as previsões de pagamento.                            |
| **13 Pagamentos Alelo**                | Valores pagos em conta no dia do envio do Extrato: detalha os ROs e ajustes compensados no dia. <br> Transações compensadas, já antecipadas ou cedidas anteriormente e pagamentos de parcelas em aberto                                  | 0 - Header <br> 6 - Detalhe ROs <br> 2 - Detalhe CV V <br> 9 - Trailer                                                                                                                                                                                   | Conferir origem do pagamento recebido (tipo de venda, bandeira e cliente/estabelecimento que efetuou a venda). |
| **14 Saldo em Aberto Alelo**           | Valores a receber Alelo, contemplando as transações realizadas, capturadas e processadas, vendas a débito, crédito e parceladas ainda não liquidadas no movimento fechado no mês anterior. <br> O arquivo é disponibilizado mensalmente. | 0 - Header <br> 6 - Detalhe ROs <br> 9 - Trailer                                                                                                                                                                                                         | Conferir origem do pagamento recebido (tipo de venda, bandeira e cliente/estabelecimento que efetuou a venda). |

## Layouts dos Tipos de Registros

### Tabela B - Registro 0 - Header

Identifica o cabeçalho de cada arquivo por matriz de extrato eletrônico\*

| Inicio | Fim | Tamanho | Tipo     | Descrição                                                                                              | Edição dos Dados                                                        |
| ------ | --- | ------- | -------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 001    | 001 | 1       | Num.     | Tipo de registro                                                                                       | Constante 0 : identifica o tipo de registro header (início do arquivo). |
| 002    | 011 | 10      | Num.     | Estabelecimento Matriz Número do estabelecimento matriz de extrato eletrônico.                         |
| 012    | 019 | 8       | Num.     | Data de processamento AAAAMMDD data em que o arquivo foi gerado.                                       |
| 020    | 027 | 8       | Num.     | Período inicial AAAAMMDD período inicial.                                                              |
| 028    | 035 | 8       | Num.     | Período final AAAAMMDD período final.                                                                  |
| 036    | 042 | 7       | Num.     | Sequência Número sequencial do arquivo. Nos casos de recuperação, este dado será enviado como 9999999. |
| 043    | 047 | 5       | Alfa.    | Empresa adquirente Constante Cielo.                                                                    |
| 048    | 049 | 2       | Num.     | Opção de extrato Vide Tabela I.                                                                        |
| 050    | 050 | 1       | Alfa.    | Transmissão Cielo.                                                                                     |
| 051    | 070 | 20      | Alfanum. | Caixa Postal Caixa postal.                                                                             |
| 071    | 073 | 3       | Num.     | Versão Layout Constante 013.                                                                           |
| 074    | 250 | 177     | Alfanum. | Uso Cielo Em Branco. Reservado para Cielo.                                                             |

- **(\*)** cadastro que permite a inclusão de todos os estabelecimentos controlados pelo cliente, independente do tipo de pagamento (centralizado, descentralizado, individual). Todos os números de estabelecimento (número do cliente na Cielo) devem ser informados no formulário de cadastro.

### Registro 1 - Detalhe do Resumo de Operações (RO)

Grupo de vendas, ajustes ou cobrança de serviços. Permite identificar a origem dos lançamentos e as ações de manutenção.

| Inicio | Fim | Tamanho | Tipo     | Descrição                           | Edição dos Dados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | --- | ------- | -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| 001    | 001 | 1       | Num.     | Tipo de registro                    | Constante 1 - Identifica o tipo de registro detalhe do RO.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 002    | 011 | 10      | Num.     | Estabelecimento                     | Submissor Número do estabelecimento e/ou filial onde a venda foi realizada.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 012    | 018 | 7       | Num.     | Número do RO                        | Número do resumo de operação. Contêm informações referentes a um grupo de vendas realizadas em uma determinada data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 019    | 020 | 2       | Num.     | Parcela                             | No caso de venda parcelada, será formatado com o número da parcela que está sendo liberada na data do envio do arquivo. No caso de venda à vista, será formatado com brancos.                                                                                                                                                                                                                                                                                                                                                                                                        |
| 021    | 021 | 1       | Alfa     | Filler                              | `"/"` - Para vendas parceladas. <br> `"a"` - aceleração das parcelas. <br> `" "` - demais situações.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 022    | 023 | 2       | Alfanum. | Plano                               | No caso de venda parcelada, será formatado com o maior número de parcelas encontradas naquele grupo de vendas. Se o RO tiver vendas em 03, 04 ou 06 parcelas, será preenchido com 06. Se for uma aceleração de parcelas, será formatado com a maior parcela acelerada.<br> Exemplo: (posições 019 a 023) <br> 02A02 indica a aceleração da parcela 02 até a 02, ou seja, somente uma parcela. <br> 03A08 indica a aceleração da parcela 03 até a parcela 08 do plano da venda, ou seja, foram aceleradas 06 parcelas. <br> No caso de venda à vista, será formatado com brancos.<br> |
| 024    | 025 | 2       | Num.     | Tipo de Transação                   | Código que identifica a transação vide Tabela II.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 026    | 031 | 6       | Num.     | Data de apresentação                | AAMMDD Data em que o RO foi transmitido para a Cielo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 032    | 037 | 6       | Num.     | Data prevista de pagamento          | AAMMDD Data prevista de pagamento. Na recuperação, pode ser atualizada após o processamento da transação ou ajuste.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 038    | 043 | 6       | Num.     | Data de vencimento original         | AAMMDD Data de vencimento original.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 044    | 044 | 1       | Alfa     | Sinal do valor bruto                | `+` - identifica valor a crédito. <br> `-` - identifica valor a débito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 045    | 057 | 13      | Num.     | Valor bruto `(*)`                   | Somatória dos valores de venda.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 058    | 058 | 1       | Alfa     | Sinal da taxa administrativa        | `+` - identifica valor a crédito. <br> `-` - identifica valor a débito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 059    | 071 | 13      | Num.     | Valor da taxa administrativa `(*)`  | Valor da taxa administrativa descontada sobre as vendas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 072    | 072 | 1       | Alfa     | Sinal do valor rejeitado            | `+` identifica valor a crédito.<br> `-` - identifica valor a débito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 073    | 085 | 13      | Num.     | Valor rejeitado `(*)`               | Se houver rejeição, será preenchido com a somatória das transações rejeitadas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 086    | 086 | 1       | Alfa     | Sinal do valor líquido              | `+` identifica o valor a crédito. <br> `-` - identifica o valor a débito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 087    | 099 | 13      | Num.     | Valor líquido `(*)`                 | Valor das vendas descontado o valor da taxa administrativa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 100    | 103 | 4       | Alfanum. | Banco                               | Código do banco no qual os valores foram depositados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 104    | 108 | 5       | Alfanum. | Agência                             | Código da agência na qual os valores foram depositados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 109    | 122 | 14      | Alfanum. | Conta-corrente / poupança           | Conta-corrente / poupança na qual os valores foram depositados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 123    | 124 | 2       | Num.     | Status do pagamento                 | Identifica a situação em que se encontram os créditos enviados ao banco vide Tabela III. Na recuperação, o status é atualizado de acordo com o envio e retorno de confirmação de pagamento por parte do banco.                                                                                                                                                                                                                                                                                                                                                                       |
| 125    | 130 | 6       | Num.     | Quantidade de CVs aceitos           | Quantidades de vendas aceitas no RO.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 131    | 131 | 1       | Alfanum. | Indicador Receba Rápido             | “S” – Sim, possui Receba Rápido; <br> “N” – Não possui Receba Rápido                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 132    | 132 | 1       | Alfanum. | Indicador Taxa Mínima               | “S” – Sim, possui CVs com Taxa Mínima aplicada; <br> “N” – Não possui CVs com Taxa Mínima aplicada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | .   |
| 133    | 138 | 6       | Num.     | Quantidades de CVs rejeitados       | Quantidade de vendas rejeitadas no RO.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 139    | 139 | 1       | Alfa     | Identificador de revenda/aceleração | Identifica as ocorrências de manutenção em transações parceladas na loja: <br>`R` - Revenda <br>`A` - Aceleração <br> `""` - Brancos (nenhuma ocorrência).                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 140    | 145 | 6       | Num.     | Data de captura da transação        | AAMMDD - Data em que a transação foi capturada pela Cielo. Na recuperação, pode ser atualizada após o processamento da transação ou ajuste.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 146    | 147 | 2       | Alfanum. | Origem do ajuste                    | Identifica o tipo de ajuste vide Tabela V. Preenchido se o tipo de transação for: <br> 02 Ajuste crédito <br> 03 Ajuste débito <br> 04 Ajuste aluguel                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 148    | 160 | 13      | Num.     | Valor complementar                  | Valor do saque quando o produto for igual a 36 ou valor do Agro Electron para transações dos produtos 22 23 ou 25 apresentados na Tabela IV.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 161    | 161 | 1       | Alfa     | Identificador de Antecipação        | Identificador de antecipação do RO:<br> `" "` - Não antecipado;<br> `"A"` - Antecipado Cielo ou Alelo;<br> `C` - Antecipado no banco - Cessão de Recebíveis.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 162    | 170 | 9       | Num.     | Número da operação de Antecipação   | Identifica o número da operação de Antecipação apresentada no registro tipo 5 campo 12 ao 20, associada ao RO antecipado na Cielo/Alelo ou cedido no banco.<br> Conterá zeros, caso o RO não tenha sido antecipado.                                                                                                                                                                                                                                                                                                                                                                  |
| 171    | 171 | 1       | Alfa     | Sinal do valor Bruto antecipado     | `+` identifica valor a crédito. `-` - identifica valor a débito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 172    | 184 | 13      | Num.     | Valor Bruto Antecipado `(*)`        | Valor bruto antecipado, fornecido quando o RO for antecipado/cedido. Será preenchido com zeros quando não houver antecipação.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 185    | 187 | 3       | Num.     | Bandeira                            | Código da Bandeira vide tabela VI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 188    | 209 | 22      | Num.     | Número Único do RO                  | Número Único de identificação do RO formatado da seguinte forma: <br>Primeira parte (fixa) 15 posições fixas: identifica o resumo mantendo o seu histórico na Cielo; <br> Segunda parte (variável) 07 posições variáveis: Identifica as alterações realizadas no RO.                                                                                                                                                                                                                                                                                                                 |
| 210    | 213 | 4       | Num.     | Taxa Administrativa `(*)`           | Percentual de taxa administrativa aplicado no valor da transação.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 214    | 218 | 5       | Num.     | Tarifa Administrativa `(*)`         | Tarifa cobrada por transação.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 219    | 222 | 4       | Num.     | Taxa Receba Rápido `(*)`            | Percentual de taxa receba rápido aplicado no valor da transação. Este campo é informativo e está somado à taxa administrativa nas posições 210 a 213.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 223    | 224 | 2       | Num.     | Meio de Captura                     | Vide tabela VII. Caso a venda tenha sido reprocessada, o sistema enviará o meio de captura 06: Meio de captura manual. Neste caso, desconsiderar o valor informado no número lógico do terminal.                                                                                                                                                                                                                                                                                                                                                                                     |
| 225    | 232 | 8       | Alfanum. | Número lógico do terminal           | Número lógico do terminal onde foi efetuada a venda. Quando o meio de captura for igual a 06, desconsiderar o número lógico do terminal, pois este será um número interno da Cielo.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 233    | 235 | 3       | Num.     | Código do Produto                   | Código que identifica o produto vide Tabela IV.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 236    | 245 | 10      | Num.     | Matriz de Pagamento                 | Estabelecimento matriz de pagamento.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 246    | 246 | 1       | Alfa     | Reenvio de Pagamento                | `S` - identifica que este resumo está sendo reenviado no extrato. Desconsiderar o pagamento enviado anteriormente. `N` - não refere-se à reenvio de pagamento.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 247    | 247 | 1       | Alfa     | Conceito aplicado                   | Identifica o conceito aplicado no resumo apresentado: <br>`" "` - Antigo <br> `"N"` - Novo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 248    | 249 | 2       | Alfanum. | Grupo de Cartões                    | Identifica o grupo de cartões conforme abaixo: <br> 00 - Serviço não atribuído <br> 01 - Cartão emitido no Brasil <br> 02 - Cartão emitido no exterior <br> 03 - MDR por Tipo de Cartão - Inicial <br> 04 - MDR por Tipo de Cartão - Intermediário 05 - MDR por Tipo de Cartão - Superior                                                                                                                                                                                                                                                                                            |
| 250    | 250 | 1       | Alfanum. | Indicador Saldo em Aberto           | “D” saldo débito / “R” saldo rotativo / “P” saldo parcelado. Este campo é preenchido somente nos arquivos CIELO09 – Saldo em Aberto e CIELO14 – Saldo em Aberto Alelo. “Brancos” para demais tipos de arquivos.                                                                                                                                                                                                                                                                                                                                                                      |

### Registro 2 - Detalhe do Comprovante de Venda (CV)

Detalhe das vendas ou ajustes agrupados em um RO.
Conforme regras de segurança, todos os registros que possuírem número de cartão apresentarão o número truncado.

|001|001|1| Num.| Tipo de registro| Constante `"2"` identifica o tipo de registro de detalhe do Comprovante de Venda (CV).|
|002|011|10| Num.| Estabelecimento Submissor| Número do estabelecimento e/ou filial onde a venda foi realizada.|
|012|018|7| Num.| Número do RO| Número do resumo de operação. Contêm informações referentes a um grupo de vendas realizadas em uma determinada data.|
|019|037|19| Alfanum.| Número do cartão truncado| Número do cartão truncado: número do cartão que efetuou a compra com número truncado. Conterá zeros para compras via mobile payment ou comércio eletrônico, sendo para o último opcional.|
|038|045|8| Num.| Data da venda/ajuste| AAAAMMDD Data em que a venda ou o ajuste foi realizado.|
|046|046|1|Alfa.|Sinal do valor da compra ou valor da parcela| `"+"` - identifica valor a crédito. `"-"` - identifica valor a débito.|
|047|059|13|Num.|Valor da compra ou valor da parcela `(*)`| Valor da compra ou da parcela que foi liberada, no caso de venda parcelada na loja.|
|060|061|2|Num.|Parcela| No caso de venda parcelada, será formatado com o número da parcela que está sendo liberada. No caso de venda à vista, será formatado com zeros.|
|062|063|2|Num.|Total de parcelas| Número total de parcelas da venda. No caso de venda à vista, será formatado com zeros.|
|064|066|3|Num.|Motivo da rejeição| Vide Tabela VIII, caso não possua rejeição o campo é formatado em branco.|
|067|072|6|Alfanum.|Código de autorização| Código de autorização da transação. Este número não é único e pode se repetir. Para efeito de conciliação deverá ser combinado com outras chaves.|
|073|092|20|Alfanum.|TID| Identificação da transação realizada no comércio eletrônico|
|093|098|6|Alfanum.|NSU/DOC| Número sequencial, também conhecido como DOC (número do documento), que identifica a transação no dia em que ela foi realizada. Este número não é único e pode se repetir. Caso a venda tenha sido reprocessada, o NSU pode ser alterado.|
|099|111|13|Num.|Valor Complementar `(*)`| Valor da transação de Saque com cartão de Débito ou Agro Electron de acordo com indicador de produto do RO.|
|112|113|2|Num.|Dig Cartão| Número de dígitos do cartão.|
|114|126|13|Num.|Valor total da venda| Valor total da venda no caso de Parcelado Loja.|
|127|139|13|Num.|Valor da próxima parcela| Valor da próxima parcela no caso de Parcelado Loja.|
|140|148|9|Alfanum.|Número da Nota Fiscal| Número da nota fiscal para estabelecimentos que capturam esta informação na máquina. Quando não disponível será formatado com zeros.|
|149|150|2|Alfanum.|Tipo de Cartão| Código do tipo de cartão vide tabela XI.|
|151|152|2|Alfanum.|Grupo de Cartões| Código do grupo de cartões vide tabela X.|
|153|160|8|Alfanum.|Número lógico do terminal| Número lógico do terminal onde foi efetuada a venda. Quando o Meio de Captura for 06, desconsiderar esta informação.|
|161|162|2|Alfa| Identificador de taxa de embarque ou valor de entrada| Identificação da transação referente à taxa de embarque ou valor de entrada: <br> TX - Taxa de embarque; <br> VE - Valor da entrada; <br> Brancos - para demais tipos de transação.|
|163|182|20|Alfanum.|Referência/código do pedido|Referência ou código do pedido informado em uma transação de comércio eletrônico. <br> Quando não disponível, será formatado com brancos.|
|183|188|6|Num.|Hora da transação|Hora da transação apresentada no formado HHMMSS. <br> Essa informação será gerada somente nos registros de venda do arquivo de venda com CV original. <br> Nos demais casos, o campo será formatado com zeros.|
|189|217|29|Num.|Número único da transação|Número Único que identifica cada transação.|
|218|218|1|Alfa|Indicador Cielo Promo|Identificador do Produto Cielo Promo = "S". <br> Identifica que a venda participou de campanha na Plataforma Promocional. <br> Caso contrário, será formatado com brancos.|
|219|220|2|Num.|Modo de Entrada do Cartão|Identifica o modo de entrada do cartão. Vide Tabela IX.|
|221|235|15|Alfanum.|Código da Venda |dentifica o código da venda. (somente conceito novo).|
|236|250|15|Alfanum.|Código Interno do Ajuste|Identifica o código de agrupamento dos ajustes. (somente conceito novo).|

### Registro 3 - Operação de recebíveis

Permite identificar a origem das operações realizadas com os recebíveis.

|001|001|1|Num.|Tipo de registro|Constante `"5"` identifica o tipo de registro que apresenta as informações de uma operação de antecipação.|
|002|011|10|Num.|Estabelecimento de pagamento ou submissão|Número do estabelecimento.|
|012|031|20|Alfanum.|Código Operação|Código Operação|
|032|045|14|Alfanum.|CPF / CNPJ Titular|Número do CPF/CNPJ do titular.|
|046|059|14|Alfanum.|CPF / CNPJ Recebedor|Número do CPF / CNPJ Recebedor.|
|060|073|14|Alfanum.|CPF / CNPJ Titular Conta|Número do CPF/CNPJ do titular da conta.|
|074|081|8|Num.|Data de Pagamento|AAAAMMDD – Data de pagamento.|
|082|089|8|Num.|Data de vencimento original|AAAAMMDD – Data de vencimento original.|
|090|091|2|Alfanum.|Tipo de Operação| “CE” – cessão <br> “GR” – gravame|
|092|094|3|Alfanum.|Bandeira| Código da bandeira – vide tabela VI.|
|095|097|3|Alfanum.|Tipo de liquidação| “000” – não identificado <br> “001” – crédito <br> “002” – débito|
|098|098|1|Alfanum.|Sinal do valor da Operação|“+” identifica valor a crédito. <br> “-” identifica valor a débito.|
|099|115|17|Num.|Valor da operação\*|Valor da operação.|
|116|118|3|Num.|Código da moeda|“986” – real <br> “840” – dolar|
|119|122|4|Alfanum.|Banco|Código do banco.|
|123|127|5|Alfanum.|Agência|Código da agência.|
|128|141|14|Alfanum.|Conta|Código da conta.|
|142|250|109|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

### Registro 5 - Detalhe da Operação de Antecipação Alelo

Apresenta a operação de antecipação Alelo realizada no dia anterior à geração do arquivo.

|001|001|1|Num.|Tipo de registro|Constante `"5"` identifica o tipo de registro que apresenta as informações de uma operação de antecipação.|
|002|011|10|Num.|Estabelecimento de pagamento ou submissão|Número do estabelecimento.|
|012|020|9|Num.|Número da operação de Antecipação|Número da operação de Antecipação, também apresentado no registro tipo 1 na data de liquidação do RO.|
|021|028|8|Num.|Data de crédito da operação|AAAAMMDD Data de pagamento da operação.|
|029|029|1|Alfa|Sinal do valor bruto da antecipação à vista.|`"+"` - identifica valor positivo. <br> `"-"` - identifica valor negativo.|
|030|042|13|Num.|Valor bruto da antecipação à vista|Valor bruto da antecipação de agenda à vista. <br> O valor bruto da antecipação corresponde à soma dos valores lîquidos originais dos ROs antecipados dessa agenda.|
|043|043|1|Alfa|Sinal do valor bruto da antecipação parcelado.|`"+"` - identifica valor positivo. <br> `"-"` - identifica valor negativo.|
|044|056|13|Num.|Valor bruto da antecipação parcelado|Valor bruto da antecipação da agenda do parcelado. <br> O valor da antecipação corresponde à soma dos valores líquidos originais dos ROs antecipados dessa agenda.|
|057|057|1|Alfa|Sinal do valor bruto da antecipação Eléctron Pré-Datado| `"+"` - identifica valor positivo. <br>`"-"` - identifica valor negativo.
|058|070|13|Num.|Valor bruto da antecipação Eléctron Pré-Datado.|Valor bruto da antecipação da agenda do Electron Pré-Datado. <br> O valor bruto da antecipação corresponde à soma dos valores líquidos originais dos ROs antecipados dessa agenda.
|071|071|1|Alfa|Sinal do valor bruto da antecipação| `"+"` - identifica valor positivo.<br> `"-"` - identifica valor negativo.|
|072|084|13|Num.|Valor bruto da antecipação| O valor bruto da antecipação corresponde à soma dos valores líquidos originais dos ROs antecipados.|
|085|085|1|Alfa|Sinal do valor líquido da antecipação à vista| `"+"` - identifica valor positivo. <br> `"-"` - identifica valor negativo.|
|086|098|13|Num.|Valor líquido da antecipação à vista| Valor líquido da antecipação da agenda à vista.|
|099|099|1|Alfa|Sinal do valor líquido da antecipação parcelado| `"+"` - identifica valor positivo. <br> `"-"` - - identifica valor negativo.|
|100|112|13|Num.|Valor líquido da antecipação parcelado|Valor líquido da antecipação da agenda do parcelado.|
|113|113|1|Alfa|Sinal do valor líquido da antecipação PréDatado| `"+"` - identifica valor positivo. <br> `"+"` - identifica valor negativo.|
|114|126|13|Num.|Valor líquido da antecipação Pré-Datado| Valor líquido da antecipação da agenda do Electron Pré-Datado.|
|127|127|1|Alfa|Sinal do valor líquido da antecipação| `"+"` - identifica valor positivo. <br> `"-"` - identifica valor negativo.|
|128|140|13|Num.|Valor líquido da antecipação| Valor líquido da antecipação das agendas à vista, parcelado e Electron Pré-Datado.|
|141|145|5|Num.|Taxa de desconto da antecipação `(*)`| Taxa de desconto comercial da antecipação.|
|146|149|4|Alfanum.|Banco| Código do banco no qual os valores foram depositados.|
|150|154|5|Alfanum.|Agência| Código da agência na qual os valores foram depositados.|
|155|168|14|Alfanum.|Conta-corrente / poupança| Conta-corrente / poupança na qual os valores foram depositados.|
|169|169|1|Alfa|Sinal do valor líquido da antecipação total| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.
|170|182|13|Num.|Valor líquido da antecipação total| Valor líquido da antecipação total (deduzido a taxa e tarifa).|
|183|183|1|Alfa|Sinal do valor da tarifa| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|184|192|9|Num.|Tarifa| Valor da tarifa cobrada por operação. Se não houver cobrança de tarifa, o campo será preenchido em branco.|
|193|250|58|Alfanum.|Uso Cielo| Em Branco. Reservado para Cielo.|

### Registro 6 - Detalhe dos ROs Antecipados Alelo

Apresenta o detalhamento da operação de Antecipação demonstrando os ROs antecipados Alelo.

|001|001|1|Num.|Tipo de registro|Constante 6 identifica o tipo de registro que apresenta as informações de um RO que foi antecipado.|
|002|011|10|Num.|Estabelecimento Submissor|Número do estabelecimento e/ou filial onde a venda foi realizada.|
|012|020|9|Num.|Número da operação de antecipação|Número da operação de antecipação.|
|021|028|8|Num.|Data de vencimento do RO|AAAAMMDD Data de vencimento original do RO que foi antecipado.|
|029|035|7|Num.|Número do RO antecipado|Número do RO antecipado.|
|036|037|2|Num.|Parcela antecipada|Número da parcela antecipada no caso de RO parcelado, se RO de venda à vista, será formatado com zeros.|
|038|039|2|Num.|Total de parcelas|Quantidade de parcelas do RO. No caso de RO de venda à vista, será formatado com zeros.|
|040|040|1|Alfa|Sinal do valor bruto original do RO| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|041|053|13|Num.|Valor bruto original do RO `(*)`| Valor bruto original do RO.|
|054|054|1|Alfa|Sinal do valor líquido original do RO| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|055|067|13|Num.|Valor líquido original do RO `(*)`| Valor líquido Original do RO.|
|068|068|1|Num.|Sinal do valor bruto da antecipação do RO| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|069|081|13|Num.|Valor bruto da antecipação do RO `(*)`| Valor líquido original do RO, exceto se houver débitos programados para este RO.|
|082|082|1|Alfa|Sinal do valor líquido da antecipação do RO| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|083|095|13|Num.|Valor líquido da antecipação do RO `(*)`| Valor pago ao estabelecimento descontada a taxa de desconto comercial da antecipação.|
|096|098|3|Num.|Bandeira|Código da Bandeira vide Tabela VI.|
|099|120|22|Num.|Número Único do RO|Número Único de identificação do RO formatado da seguinte forma: <br> Primeira parte (fixa) - 15 posições fixas: identifica o resumo mantendo o seu histórico na Cielo; <br> Segunda parte (variável) - 07 posições variáveis: para uso da Cielo. Identifica as alterações realizadas no RO.|
|121|121|1|Alfanum.|Identificador de RO de ajuste antecipado| `S` considerar ajuste antecipado. <br> Campo preenchido somente quando os ROs de ajustes forem efetivamente antecipados. (somente conceito novo).|
|122|250|129|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

### Registro 7 - Detalhe dos Débitos de ROs Antecipados

Apresenta os débitos compensados nas datas antecipadas.

|001|001|1|Num.|Tipo de registro|Constante 7 identifica o tipo de registro que apresenta as informações de um RO que foi antecipado.|
|002|011|10|Num.|Estabelecimento Submissor|Número do estabelecimento e/ou filial onde a venda foi realizada.|
|012|033|22|Num.|Número Único do RO original da venda|Número único do RO original da venda.|
|034|040|7|Num.|Número do RO antecipado|Número do RO da venda original.|
|041|048|8|Num.|Data de pagamento do RO antecipado|AAAAMMDD Data de Pagamento do RO Antecipado.|
|049|049|1|Alfa|Sinal do valor do RO antecipado|`"+"` - identifica valor positivo.`"-"` - identifica valor negativo.|
|050|062|13|Num.|Valor do RO antecipado|Valor do RO antecipado.|
|063|084|22|Num.|Nº Único do RO da venda que originou o ajuste|Número único do RO da venda que originou o ajuste.|
|085|091|7|Num.|Nº do RO de ajuste a débito|Número do RO que apresenta os valores retidos para a operação de antecipação.|
|092|099|8|Num.|Data de pagamento do ajuste|AAAAMMDD.|
|100|100|1|Alfa|Sinal do valor do ajuste a débito|`"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|101|113|13|Num.|Valor do ajuste a débito|Valor total do débito.|
|114|114|1|Alfa|Sinal do valor compensado| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|115|127|13|Num.|Valor compensado| Valor compensado do RO antecipado.|
|128|128|1|Alfa|Sinal do saldo do RO antecipado| `"+"` identifica valor positivo. `"-"` - identifica valor negativo.|
|129|141|13|Num.|Valor do saldo do RO antecipado| Resultado do total de débito valor compensado.|
|142|250|109|Alfanum.| Uso Cielo| Em Branco. Reservado para Cielo.|

### Registro 8 - Detalhe Transação PIX

Apresenta as transações realizadas na modalidade PIX.

|001|001|1|Num.|Tipo de registro|Constante 7 identifica o tipo de registro que apresenta as informações de um RO que foi antecipado.|
|002|011|10|Num.|Estabelecimento Submissor|Número do estabelecimento e/ou filial onde a venda foi realizada.|
|012|013|2|Num.|Tipo de transação|Código que identifica a transação – vide Tabela II.|
|014|019|6|Num.|Data da transação|AAMMDD – Data em que a transação foi realizada.|
|020|025|6|Num.|Hora da transação|Hora da transação apresentada no formato HHMMSS.|
|026|061|36|Alfanum.|ID PIX Código que identifica a transação PIX.|
|062|067|6|Alfanum.|NSU/DOC| Número sequencial, também conhecido como DOC (número do documento), que identifica a transação no dia em que ela foi realizada. Este número não é único e pode se repetir. Caso a venda tenha sido reprocessada, o NSU pode ser alterado.|
|068|073|6|Num.|Data de pagamento|AAMMDD – Data de pagamento. No reprocessamento, pode ser atualizada após o processamento da transação ou ajuste.|
|074|074|1|Alfa|Sinal do valor bruto|`“+”` identifica valor a crédito. <br>`“-”` identifica valor a débito.|
|075|087|13|Num.| Valor bruto `(*)`| Valor bruto da transação.|
|088|088|1|Alfa| Sinal da taxa administrativa| “+” identifica valor a crédito. <br> `“-”` identifica valor a débito.|
|089|101|13|Num.| Valor da taxa administrativa `(*)`| Valor da taxa administrativa descontada sobre a transação.|
|102|102|1|Alfa| Sinal do valor líquido| `“+”` identifica o valor a crédito. <br> `“-”` identifica o valor a débito.|
|103|115|13|Num.| Valor líquido `(*)`|Valor da transação descontado a taxa|
|116|119|4|Alfanum.|Banco|Código do banco no qual os valores foram depositados.|
|120|124|5|Alfanum.|Agência|Código da agência na qual os valores foram depositados.|
|125|144|20|Alfanum.|Conta|Conta na qual os valores foram depositados.|
|145|150|6|Num.|Data de captura da transação|AAMMDD - Data em que a transação foi capturada pela Cielo. No reprocessamento, pode ser atualizada após o processamento da transação ou ajuste.|
|151|154|4|Num.|Taxa Administrativa `(*)`|Percentual de taxa administrativa aplicado no valor da transação.|
|155|159|5|Num.|Tarifa Administrativa `(*)`|Tarifa cobrada por transação.|
|160|161|2|Num.|Meio de Captura| Vide tabela VII. Caso a venda tenha sido reprocessada, o sistema enviará o meio de captura 06: Meio de captura manual. Neste caso, desconsiderar o valor informado no número lógico do terminal.|
|162|169|8|Alfanum.|Número lógico do terminal|Número lógico do terminal onde foi efetuada a venda. Quando o meio de captura for igual a 06, desconsiderar o número lógico do terminal, pois este será um número interno da Cielo.|
|170|175|6|Num.|Data da transação original|AAMMDD – Data em que a transação original foi realizada.|
|176|181|6|Num.|Hora da transação original|Hora da transação original apresentada no formato HHMMSS.|
|182|217|36|Alfanum.|ID PIX original|Código que identifica a transação PIX original.|
|218|219|2|Alfanum.|Indicativo troco/saque|"TR"-Troco <br> "SQ"-Saque <br> " "-Venda|
|220|250|31|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

### Registro A - Resumo Negociação de Recebíveis

Permite conferir as negociações que foram realizadas.

|001|001|1|Num.|Tipo de registro|Constante “A” – identifica o tipo de registro.|
|002|007|6|Num.|Data da negociação|AAMMDD – Data da negociação.|
|008|013|6|Num.|Data de Pagamento|AAMMDD – Data de pagamento.|
|014|027|14|Alfanum.|CPF / CNPJ|Número do CPF/CNPJ.|
|028|030|3|Num.| Prazo médio|Prazo médio.|
|031|035|5|Num.|Taxa Nominal `(**)`|Taxa nominal.|
|036|036|1|Alfa|Sinal do valor bruto|`“+”` identifica valor a crédito. <br> `“-”` identifica valor a débito.|
|037|049|13|Num.|Valor bruto `(*)`|Valor bruto.|
|050|050|1|Alfa|Sinal do valor líquido|`“+”` identifica valor a crédito. <br> `“-”` identifica valor a débito.|
|051|063|13|Num.|Valor líquido `(*)`|Valor líquido.|
|064|083|20|Alfanum.|Código da Operação|Código da Operação.|
|084|250|167Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

### Registro B - Detalhe Negociação de Recebíveis

Permite conferir o detalhe das negociações que foram realizadas.

|001|001|1|Num.|Tipo de registro|Constante “B” – identifica o tipo de registro.|
|002|007|6|Num.|Data da negociação|AAMMDD – Data da negociação.|
|008|013|6|Num.|Data de vencimento original|AAMMDD – Data de vencimento original.|
|014|027|14|Alfanum.|CPF / CNPJ|Número do CPF/CNPJ.|
|028|030|3|Num.|Bandeira|Código da Bandeira – vide tabela VI.|
|031|033|3|Num.|Tipo de liquidação|“000” – não identificado <br> “001” – crédito <br> “002” – débito|
|034|034|1|Alfa|Sinal do valor bruto|“+” identifica valor a crédito. <br> “-” identifica valor a débito.|
|035|047|13|Num.|Valor bruto `(*)`| Valor bruto.
|048|048|1|Alfa|Sinal do valor líquido| “+” identifica valor a crédito. <br> “-” identifica valor a débito.|
|049|061|13|Num.|Valor líquido `(*)`| Valor líquido.|
|062|066|5|Num.|Taxa efetiva `(**)`| Taxa efetiva.|
|067|116|50|Alfanum.|Instituição Financeira Instituição financeira.|
|117|250|134|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

### Registro C - Conta de Recebimento

|001|001|1|Num.|Tipo de registro|Constante “C” – identifica o tipo de registro.|
|002|005|4|Alfanum.|Banco|Código do banco no qual os valores foram depositados.|
|006|010|5|Alfanum.|Agência|Código da agência na qual os valores foram depositados.|
|011|030|20|Alfanum.|Conta|Conta na qual os valores foram depositados.|
|031|031|1|Alfa|Sinal Valor depositado.|
|032|044|13|Num.|Valor depositado `(*)`|Valor depositado.|
|045|250|206|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

### Registro 9 - Trailer

Indica o final do arquivo.

|001|001|1|Num.|Tipo de registro|Constante Identifica o tipo de registro de detalhe trailer (final do arquivo).|
|002|012|11|Num.|Total de registro|Número total de registros, os quais não incluem header e trailer.|
|013|013|1|Alfa|Sinal Valor Líquido da soma de todos os CVs| `"+"` - identifica valor positivo. `"-"` - identifica valor negativo.|
|014|030|17|Num.|Valor Líquido da soma de todos os CVs| Valor Líquido da soma de todos os CVs.|
|031|041|11|Num.|Quantidade total de CVs| Quantidade total de CVs.|
|042|042|1|Alfa|Sinal Valor Bruto da soma de todos os ROs| `“+”` identifica valor positivo. `“-”` identifica valor negativo|
|043|059|17|Num.|Valor Bruto da soma de todos os ROs | Valor Bruto da soma de todos os ROs|Valor Bruto da soma de todos os ROs.|
|060|060|1|Alfa.|Sinal Valor Bruto Antecipado da soma de todos os ROs| `“+”` identifica valor positivo. `“-”` identifica valor negativo.|
|061|077|17|Num|Valor Bruto Antecipado da soma de todos os ROs | Valor Bruto Antecipado da soma de todos os ROs.|
|078|078|1|Alfa.|Sinal soma de Valores Negociados| `“+”` identifica valor positivo. `“-”` identifica valor negativo.|
|079|095|17|Alfa.|Soma de Valores Negociados| Soma de Valores Negociados.|
|096|250|155|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|

Observação: os campos reservados para a Cielo poderão ser utilizados para a inclusão de novas informações. Também poderá ser necessário incluir novos tipos de registros. Por conta disso, sugerimos que a solução de conciliação despreze os registros não relacionados nesta especificação.

## Tabelas

### Tabela I - Opção de Extrato

| Codigo | Descrição                       |
| ------ | ------------------------------- |
| 03     | Vendas com Plano Parcelado      |
| 04     | Pagamentos                      |
| 09     | Saldo em Aberto                 |
| 10     | Antecipação de Recebíveis Alelo |
| 12     | Vendas Alelo                    |
| 13     | Pagamentos Alelo                |
| 14     | Saldo em Aberto Alelo           |
| 15     | Negociação de Recebíveis        |
| 16     | Transações PIX                  |

### Tabela II - Tipo de Transação

| Codigo | Descrição        |
| ------ | ---------------- |
| 01     | Venda            |
| 02     | Ajuste a Crédito |
| 03     | Ajuste a Débito  |
| 04     | Plano Cielo      |
| 05     | Reagendamento    |

### Tabela III - Status do Pagamento

| Código | Descrição                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 00     | **Agendado:** identifica a captura de uma transação e informa a previsão de pagamento. A data prevista poderá ser alterada.          |
| 01     | **Pago:** identifica que o pagamento foi realizado pelo banco domicílio.                                                             |
| 02     | **Enviado para o Banco:** identifica que a Cielo solicitou o pagamento/cobrança para o banco domicílio, porém não houve confirmação. |
| 03     | **A Confirmar:** identifica que a Cielo solicitou o pagamento/cobrança para o banco domicílio, porém ainda não houve confirmação.    |

Quando um valor a crédito estiver em processo de compensação com um valor a débito, ambos serão enviados no arquivo de pagamento na data da compensação, posterior a data prevista de pagamento. O status enviado para o banco poder ser novamente apresentado no extrato de pagamento, quando o banco domicílio devolver uma ordem de crédito (reenvio de pagamento)

### Tabela IV - Código do Produto

| Código | Descrição                              |
| ------ | -------------------------------------- |
| 001    | Agiplan crédito à vista                |
| 002    | Agiplan parcelado loja                 |
| 003    | Banescard crédito à vista              |
| 004    | Banescard parcelado loja               |
| 005    | Esplanada crédito à vista              |
| 006    | Credz crédito à vista                  |
| 007    | Esplanada parcelado loja               |
| 008    | Credz parcelado loja                   |
| 009    | Elo Crediário                          |
| 010    | Mastercard crédito à vista             |
| 011    | Maestro                                |
| 012    | Mastercard parcelado loja              |
| 013    | Elo Construcard                        |
| 014    | Elo Agro Débito                        |
| 015    | Elo Agro Custeio                       |
| 016    | Elo Agro Investimento                  |
| 017    | Elo Agro Custeio + Débito              |
| 018    | Elo Agro Investimento + Débito         |
| 019    | Discover crédito à vista               |
| 020    | Diners crédito à vista                 |
| 021    | Diners parcelado loja                  |
| 022    | Visa Agro Custeio + Débito             |
| 023    | Visa Agro Investimento + Débito        |
| 024    | FCO Investimento                       |
| 025    | Agro Electron                          |
| 026    | Agro Custeio                           |
| 027    | Agro Investimento                      |
| 028    | Visa FCO Giro                          |
| 029    | Visa crediário no crédito              |
| 030    | Visa parcelado cliente                 |
| 033    | JCB crédito a vista                    |
| 036    | Visa Saque com cartão de Débito        |
| 037    | Flex Car Visa Vale                     |
| 038    | Credsystem crédito à vista             |
| 039    | Credsystem parcelado loja              |
| 040    | Visa crédito à vista                   |
| 041    | Visa Electron Débito à vista           |
| 042    | Visa Pedágio                           |
| 043    | Visa parcelado loja                    |
| 044    | Visa Electron Pré-Datado               |
| 045    | Alelo Refeição                         |
| 046    | Alelo Alimentação                      |
| 058    | Alelo Multibenefícios                  |
| 059    | Alelo Auto                             |
| 060    | Sorocred débito à vista                |
| 061    | Sorocred crédito à vista               |
| 062    | Sorocred parcelado loja                |
| 064    | Visa Crediário                         |
| 065    | Alelo Refeição                         |
| 066    | Alelo Alimentação                      |
| 067    | Visa Capital de Giro                   |
| 068    | Visa Crédito Imobiliário               |
| 069    | Alelo Cultura                          |
| 070    | Elo crédito a vista                    |
| 071    | Elo débito à vista                     |
| 072    | Elo parcelado loja                     |
| 079    | Pagamento Carnê Visa Electron          |
| 080    | Visa Crédito Conversor de Moeda        |
| 081    | Mastercard Crédito Especializado `(*)` |
| 082    | Amex crédito à vista                   |
| 083    | Amex parcelado loja                    |
| 084    | Amex parcelado banco                   |
| 089    | Elo Crédito Imobiliário                |
| 091    | Elo Crédito Especializado `(*)`        |
| 094    | Banescard Débito                       |
| 096    | Cabal crédito à vista                  |
| 097    | Cabal débito à vista                   |
| 098    | Cabal parcelado loja                   |
| 161    | Hiper crédito à vista                  |
| 162    | Hiper débito à vista                   |
| 163    | Hiper parcelado loja                   |
| 164    | Hipercard crédito à vista              |
| 165    | Hipercard parcelado loja               |
| 200    | Verdecard crédito a vista              |
| 201    | Verdecard parcelado loja               |
| 202    | Nutricash Alimentação                  |
| 203    | Nutricash Refeição                     |
| 204    | Nutricash Multibenefícios              |
| 205    | Nutricash Combustível                  |
| 206    | Ben Alimentação                        |
| 207    | Ben Refeição                           |
| 314    | Ourocard Agro débito                   |
| 315    | Ourocard Agro custeio                  |
| 316    | Ourocard Agro investimento             |
| 317    | Ourocard Agro custeio + débito         |
| 318    | Ourocard Agro investimento + débito    |
| 321    | Mastercard crediário no crédito        |
| 322    | Mastercard parcelado cliente           |
| 324    | Elo parcelado cliente                  |
| 330    | Elo crediário no crédito               |
| 342    | Mastercard Pedágio                     |
| 377    | Elo Carnê                              |
| 378    | Mastercard Carnê                       |
| 380    | Mastercard Crédito Conversor de Moeda  |
| 433    | JCB parcelado loja                     |

### Tabela V - Origem do Ajuste

|Código|Descrição|Tipo Ajuste| |
|---|---|---| |
|01|Acerto de correção monetária| Acerto |
|02|Acerto de data de Pagamento| Acerto |
|03|Acerto de taxa de comissão| Acerto |
|04|Acerto de valores não processados| Acerto |
|05|Acerto de valores não recebidos| Acerto |
|06|Acerto de valores não reconhecidos| Acerto |
|07|Acerto de valores negociados| Acerto |
|08|Acerto de valores processados indevidamente| Acerto |
|09|Acerto de lançamento não compensado em conta-corrente| Acerto |
|10|Acerto referente valores contestados| Acerto/Chargeback |
|12|Acertos diversos| Acerto |
|13|Acordo de cobrança| Acerto |
|14|Acordo jurídico| Acerto |
|15|Multa do Programa de Bandeira (Master Card)| Acerto/Chargeback |
|16|Bloqueio de valor por ordem judicial| Bloqueio |
|17|Cancelamento da venda| Cancelamento |
|18|Cobrança de tarifa Operacional| Cobrança |
|19|Valor Mensalidade Farol| Acerto / Cobrança |
|20|Cobrança Plano Cielo| Cobrança |
|21|Contrato de caução| Acerto |
|22|Crédito de devolução do cancelamento banco emissor| Acerto/Cancelamento |
|23|Crédito EC referente contestação portador| Acerto/Chargeback |
|24|Crédito por cancelamento rejeitado Cielo| Acerto/Chargeback |
|25|Processamento do débito duplicado Visa Pedágio| Acerto |
|26|Débito por venda realizada sem a leitura do chip| Acerto |
|27|Débito por venda rejeitada no sistema Cielo| Acerto |
|28|Consumidor não reconhece a compra| Acerto/Chargeback |
|29|Estorno de acordo jurídico| Acerto |
|30|Estorno de contrato de caução| Acerto |
|31|Estorno de acordo de cobrança| Acerto |
|32|Estorno de bloqueio de valor por ordem judicial| Acerto |
|33|Estorno de cancelamento de venda| Acerto |
|34|Estorno de cobrança de tarifa operacional| Acerto |
|35|Estorno de cobrança mensal Lynx Comércio| Acerto |
|36|Estorno de cobrança Plano Cielo| Acerto |
|37|Estorno de débito venda sem a leitura do Chip| Acerto |
|38|Estorno de incentivo comercial| Acerto |
|39|Multa do Programa de Bandeira (Visa)| Acerto/Chargeback |
|40|Estorno de rejeição ARV| Acerto |
|41|Estorno de reversão de duplicidade do pagamento - ARV| Acerto |
|42|Estorno de tarifa de cadastro| Acerto |
|43|Estorno de extrato papel| Acerto |
|44|Estorno de processamento duplicado de débito - Visa Pedágio| Acerto |
|45|Incentivo comercial| Acerto |
|46|Incentivo por venda de Recarga| Acerto |
|47|Regularização de rejeição ARV| Acerto |
|48|Reversão de duplicidade do pagamento - ARV| Acerto |
|49|Tarifa de cadastro| Cobrança |
|50|Tarifa de extrato no papel| Cobrança |
|51|Aceleração de débito de antecipação| Acerto |
|52|Descumprimento de contrato| Acerto/Chargeback |
|53|Venda recorrente cancelada pelo consumidor| Acerto/Chargeback |
|54|Consumidor não reconhece a compra| Acerto/Chargeback |
|55|Cartão com validade vencida| Acerto/Chargeback |
|56|Tarifa por retentativa de transações (Master Card)| Acerto |
|57|Mercadoria com defeito ou diferente da descrição| Acerto/Chargeback |
|58|Transação irregular| Acerto/Chargeback |
|59|Mercadoria não foi entregue| Acerto/Chargeback |
|60|Serviços não prestados| Acerto/Chargeback |
|61|Venda sem código de autorização| Acerto/Chargeback |
|62|Número de cartão inválido| Acerto/Chargeback |
|63|Cópia do comprovante / documento inválido| Acerto/Chargeback |
|65|Comprovante / documento ilegível| Acerto/Chargeback |
|66|Venda sem leitura de chip| Acerto/Chargeback |
|67|Venda em outra moeda| Acerto/Chargeback |
|68|Venda processada incorretamente| Acerto/Chargeback |
|69|Venda cancelada| Acerto/Chargeback |
|70|Crédito em duplicidade| Acerto/Chargeback |
|71|Documentos não recebidos| Acerto/Chargeback |
|72|Pagamento realizado por outros| meios Acerto/Chargeback |
|73|Equipamento perdido / roubado| Acerto/Cobrança |
|77|Multa por excesso de chargeback| Acerto/Chargeback |
|78|Serviços Score| Cobrança |
|79|Reagendamento do débito de antecipação| Acerto |
|80|Ajuste do débito de cessão| Acerto |
|81|Cielo e-Commerce| Acerto/Cobrança |
|85|Cielo Controle (Excedente)| Acerto/Cobrança |
|86|Cielo Controle (Franquia)| Acerto/Cobrança |
|89|Débito/crédito compensação de cancelamento de transação em operação de Penhora | Acerto |
|90|Débito/crédito compensação de valores| Acerto |
|91|Estorno debito/crédito de cessão| Acerto |
|92|Estorno débito/crédito de gravame| Acerto |
|93|Meliuz |Acerto/Cobrança |
|94|Débito/crédito compensação cancelamento de transação em operação de Cessão | Acerto |
|95|Débito/crédito de penhora| Acerto |
|96|Estorno de crédito/débito de penhora| Acerto |
|97|Débito/crédito compensação cancelamento em operação| Acerto |
|98|Débito/crédito compensação cancelamento de transação em operação de gravame | Acerto |
|99|Tarifa por retentativa de transações (Visa) |Acerto |

### Tabela VI - Bandeira

|Código|Descrição| |
|---|---| |
|001|Visa |
|002|Mastercard |
|003|Amex |
|006|Sorocred |
|007|Elo |
|009|Diners |
|011|Agiplan |
|015|Banescard |
|023|Cabal |
|029|Credsystem |
|035|Esplanada |
|040|Hipercard |
|060|Jcb |
|064|Credz |
|072|Hiper |
|075|Ourocard |

### Tabela VII - Meio de Captura

| Código | Descrição                                                        |
| ------ | ---------------------------------------------------------------- |
| 00     | LIO                                                              |
| 01     | POS (Point of Sale)                                              |
| 02     | PDV (Ponto de Venda) ou TEF (Transferência Eletrônica de Fundos) |
| 03     | e-Commerce (Comércio Eletrônico)                                 |
| 04     | EDI (Troca Eletrônica de Dados)                                  |
| 05     | ADP/BSP (Empresa Capturadora) ou Reprocessamento                 |
| 06     | Manual                                                           |
| 07     | URA/CVA                                                          |
| 08     | Mobile                                                           |
| 09     | Moedeiro Eletrônico em Rede                                      |
| 99     | Não identificado                                                 |

### Tabela VIII - Motivo da Rejeição

| Código | Descrição                                                |
| ------ | -------------------------------------------------------- |
| 002    | Cartão inválido                                          |
| 023    | Outros erros                                             |
| 024    | Tipo cartão inválido                                     |
| 031    | Transação de saque com cartão Electron valor zerado      |
| 039    | Banco emissor inválido                                   |
| 044    | Data da transação inválida                               |
| 045    | Código de autorização inválido                           |
| 055    | Número de parcelas inválido                              |
| 056    | Transação financiada para estabelecimento não autorizado |
| 057    | Cartão em boletim protetor                               |
| 061    | Número de cartão inválido                                |
| 066    | Transação não autorizada                                 |
| 067    | Transação não autorizada                                 |
| 069    | Transação não autorizada                                 |
| 070    | Transação não autorizada                                 |
| 071    | Transação não autorizada                                 |
| 072    | Transação não autorizada                                 |
| 073    | Transação inválida                                       |
| 074    | Valor de transação inválido                              |
| 075    | Número de cartão inválido                                |
| 077    | Transação não autorizada                                 |
| 078    | Transação não autorizada                                 |
| 079    | Transação não autorizada                                 |
| 080    | Transação não autorizada                                 |
| 081    | Cartão vencido                                           |
| 082    | Transação não autorizada                                 |
| 083    | Transação não autorizada                                 |
| 084    | Transação não autorizada                                 |
| 086    | Transação não autorizada                                 |
| 091    | Transação não autorizada                                 |
| 092    | Banco emissor sem comunicação                            |
| 093    | Desbalanceamento no plano parcelado                      |
| 094    | Venda parcelada para cartão emitido no exterior          |
| 097    | Valor de parcela menor do que o permitido                |
| 099    | Banco emissor inválido                                   |
| 100    | Transação não autorizada                                 |
| 101    | Transação duplicada                                      |
| 102    | Transação duplicada                                      |
| 124    | BIN não cadastrado                                       |
| 126    | Transação de saque com cartão Electron inválida          |
| 128    | Transação de saque com cartão Electron inválida          |
| 129    | Transação de saque com cartão Electron inválida          |
| 130    | Transação de saque com cartão Electron inválida          |
| 133    | Transação de saque com cartão Electron inválida          |
| 134    | Transação de saque com cartão Electron inválida          |
| 140    | Estabelecimento não e-commerce                           |
| 141    | Cartão travel transação inválida                         |
| 143    | Venda em dólar inválido                                  |
| 145    | Estabelecimento inválido para distribuição               |
| 147    | Parcelado emissor não habilitado                         |
| 150    | Estabelecimento não financeiro                           |

### Tabela IX - Modo de Entrada do Cartão

| Código | Descrição                                                            |
| ------ | -------------------------------------------------------------------- |
| 00     | Reentrada manual                                                     |
| 01     | Digitada                                                             |
| 02     | Trilha magnética                                                     |
| 03     | Código de barra                                                      |
| 04     | OCR (tecnologia que processa uma imagem e extrai os textos escritos) |
| 05     | Chip online                                                          |
| 06     | Trilha                                                               |
| 07     | Contactless                                                          |
| 81     | Digitada                                                             |
| 90     | Trilha                                                               |
| 91     | Contactless emulando tarja                                           |
| 95     | Chip offline                                                         |
| 99     | Tap on Phone                                                         |

### Tabela X - Grupo de Cartões

| Código                                    | Descrição |
| ----------------------------------------- | --------- |
| 00 Serviço não atribuído                  |
| 01 Cartão emitido no Brasil               |
| 02 Cartão emitido no Exterior             |
| 03 MDR por Tipo de Cartão - Inicial       |
| 04 MDR por Tipo de Cartão - Intermediário |
| 05 MDR por Tipo de Cartão - Superior      |

### Tabela XI - Tipo de Cartão

| Código | Descrição                       |
| ------ | ------------------------------- |
| 00     | Serviço não atribuído           |
| 01     | Visa Classic                    |
| 02     | Visa Empresarial                |
| 03     | Visa Gold                       |
| 04     | Visa Platinum                   |
| 05     | Visa Infinite                   |
| 06     | Visa Corporate                  |
| 07     | Visa Electron                   |
| 08     | Visa Compras                    |
| 09     | Master Platinum                 |
| 10     | Master Standard                 |
| 11     | Master Gold                     |
| 12     | Master Pré-Pago                 |
| 13     | Master Black                    |
| 14     | Master Corporativo              |
| 15     | Master Cartão Viagem            |
| 16     | Master Cartão Benefício         |
| 17     | Master World                    |
| 18     | Master Agro                     |
| 19     | Elo Bndes                       |
| 20     | Elo Classic                     |
| 21     | Elo Empresarial                 |
| 22     | Elo Insumos                     |
| 23     | Elo Corporativo                 |
| 24     | Elo Mais                        |
| 25     | Elo Grafite                     |
| 26     | Elo Nanquim                     |
| 27     | Elo Pré Pagos Geral / Gift Card |
| 28     | Elo Vale Cultura                |
| 29     | Elo Nacional PJ Empresarial     |
| 30     | Elo Compras                     |
| 31     | Elo Viagem                      |
| 32     | Elo Premiação Inc de Vendas PJ  |

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

# Importante

> Observação: as atualizações citadas abaixo, estarão disponíveis a partir do dia 07 de junho de 2021.

[Manual de Extrato Eletrônico](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/CIELO_Extrato_Eletronico_-_Manual_-_Versao_14_.pdf)

[Electronic Statement Manual - English version](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/CIELO_Electronic_Statement_-_English_-_Version_14_1.pdf)

[Atualização de Layout EE - Registro de Recebíveis + PIX](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Atualizacao_layout_EE_-_Registro_de_Recebiveis_PIX_0.pdf)

[Arquivos de teste – Comunicado 09/12/2022](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Arquivos_de_teste_-_Comunicado_09122022.rar)
