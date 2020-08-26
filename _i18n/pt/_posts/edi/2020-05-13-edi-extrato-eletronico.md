---
layout: tutorial
title:  EDI - Extrato Eletrônico
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

* Permite a realização da conciliação contábil e financeira de forma automatizada
* Maior agilidade e eficiência operacional
* Integração com a automação comercial de vendas
* Segurança no recebiento das informações
* Atendimento Especializado

# Fluxo de Concessão 

## Passo 1 - Login

1 - O parceiro redireciona o cliente para `{cielo-login-url}`. <br>
2 - O cliente entra com suas credenciais e clica em `Entrar`. <br>
3 - A Cielo mostra os termos de autorização e o cliente aprova este acesso clicando em `Permitir Acesso`. <br>
4 - A Cielo redireciona o cliente para o parceiro novamente em `{partner-call-back-url}`. <br>

![Login e Concessão de Acesso](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo1_login1.jpg) 

> O que é cielo-login-url?

https://`{base-login-url}`?response_type=code
&`client_id={client_id}`
&`redirect_uri={redirect_uri}`
&`scope={scope}`
&`state={state}`

* **base-login-url:** URL base que muda por ambiente, serão enviadas em tempo de projeto
* **response_type:** O valor deve ser fixo "code"
* **client_id:** Identificador do cliente, será enviado pela Cielo em tempo de projeto
* **redirect_uri:** URL do parceiro para a Cielo redirecionar o usuário quando o processo de login terminar, ou se der algum erro no processo
* **scope:** Uma lista separada por vírgula das APIs que o parceiro deseja acessar, os possiveis escopos serão enviados por API.
* **state:** Um valor que o cliente deseja receber no retorno para manter o estado entre a requisição e o retorno

> O que é partner-callback-url?

https://`{partner-callback-url}`?code=`{code}`&state=`{state}`

* **partner-callback-url:** A URL do parceiro que será redirecionado quando o processo de login terminar.
* **code:** O authorization code gerado pela Cielo. Com esse código o parceiro vai poder trocar por um access_token para fazer chamadas em nome do cliente.
* **state:** O mesmo valor que o parceiro enviou na requisição.

## Passo 2 – Requisitando um Access Token

* O serviço do parceiro solicita um `access_token`.
* A Cielo retorna um `acess_token`,  um `refresh_token` e um `expiration_time`.

### Request

> **POST** {cielo-api-base-url}/consent/v1/oauth/access-token
>
>| Key | Value |
>|---|---|
>| **Authorization** | Base64 (client_id do parceiro concatenado com “:” e o client_secret  codificado em base64) |

```

curl --location --request POST 'https://{cielo-api-base-url}/consent/v1/oauth/access-token' \
--header 'Basic64'
--header 'Content-Type: application/json' \
--data-raw '{
    "grant_type": "authorization_code",
    "code": "{}"
}'

```

### Response

```

{
"access_token": "{access_token}",
"refresh_token": "{refresh_token}",
"token_type": "access_token",
"expires_in": {expiration_time}
}

```

|Propriedade|Descrição|
|---|---|
|`access_token`|O access_token para chamar as APIs da Cielo.|
|`refresh_token`|Quando o access_token expirar o parceiro pode solicitar um novo access_token usando este refresh_token.|
|`expiration_time`|O tempo de expiração do access_token em milisgundos.|

### Observações

* O authorization_code precisa ser trocado por um access_token em menos de 10 minutos.
* Este tipo de  access_token é mandatório para chamar as APIs que retornam dados sensíveis dos clientes.
* O parceiro precisa armazenar o access_token e o refresh_token em um lugar seguro.
* Quando o access_token expirar o parceiro não conseguirá mais chamas as APIs até que solicite um novo acess_token usando o fluxo de refresh_token.
* O acess_token gerado nesse fluxo será único por cliente da Cielo, pois precisa obrigatoriamente a aprovação do cliente.
* O parceiro NÃO consegue gerar um access_token sem o consentimento do cliente.
* O parceiro NÃO consegue usar o authorization code, recebido no primeiro passo, mais de uma vez.

## Passo 3 - Chamando as APIs

Neste momento parceiro vai conseguir chamar as APIs da Cielo sem a necessidade da aprovação do cliente, pois esta já foi concedida.

A única exigência para chamar as APIs da Cielo é enviar o seguinte header HTTP:
**Authorization: Bearer {access_token}**
Em todas as chamadas para as APIs.

* O access_token foi obtido no Segundo passo

## Passo 3.1 - Atualizando um Access Token

> 1. O serviço do parceiro chama o serviço de `refresh_token`.
> 2. A Cielo retorna um `access_token` novo, um `refresh_token` novo e um novo `expiration_time`.

O dados de resposta serão os mesmos do passo 2 quando o parceiro solicita um acess_token, porém todos os dados retornados são novos e precisam ser armazenados no lugar dos antigos.

### Request

```

curl --location --request POST 'https://{cielo-api-base-url}/consent/v1/oauth/access-token' \
--header 'Basic64'
--header 'Content-Type: application/json' \
--data-raw '{
    "grant_type": "refresh_token",
    "refresh_token": "{}"
}'

```

Um ponto de atenção na requisição pois agora o parceiro precisa enviar o `grant_type` como `refresh_token` e no campo `refresh_token` deve ser enviado um `refresh_token` válido (e não mais um access_token).

### Response

```

{
"access_token": "{access_token}",
"refresh_token": "{refresh_token}",
"token_type": "access_token",
"expires_in": {expiration_time}
}

```

|Propriedade|Descrição|
|---|---|
|`access_token`|O access_token para chamar as APIs da Cielo.|
|`refresh_token`|Quando o access_token expirar o parceiro pode solicitar um novo access_token usando este refresh_token.|
|`expiration_time`|O tempo de expiração do access_token em milisgundos.|

## Erros

Caso ocorra algum erro do lado Cielo o cliente será redirecionado para a URL de call-back do parceiro com o parâmetro error na URL, por exemplo https://{partner-callback-url}?error={error}.

Possíveis valores para {error}:

* **lid_request:** A requisição está faltando algum parâmetro obrigatório, ou esta com algum parâmetro inválido, ou qualquer outra possibilidade que faça a URL ficar incorreta.
* **unauthorized_client:** O parceiro não está autorizado a fazer uma requisição usando este método.
* **access_denied:** O dono do recurso ou o servidor de autorização negou a requisição.
* **unsupported_response_type:** O servidor de autorização não suporta obter um authorization code usando este método.
* **invalid_scope:** O escopo é invalido, desconhecido ou malformado.
* **server_error:** O servidor de autorização encontrou uma condição inesperada e não consegue concluir esta requisição. ( Este erro é necessário porque não é possível retornar um HTTP status code 500 Internal Server Error via redirecionamento HTTP)
* **temporarily_unavailable:** O servidor de autorização não consegue tratar a requisição devido a uma sobrecarga temporária ou está em manutenção. (Este erro é necessário pois não é possível retornar um HTTP Status 503 Service Unavailable para o parceiro  via redirecionamento HTTP)

> Opcionalmente pode ser retornado um outro parâmetros `error_description` com um detalhe do erro, apenas um texto simples.

## Observação

* Todos os tokens (access_token e refresh_token) devem ser armazenados em um local seguro.
* O parceiro precisam iniciar um novo fluxo de concessão se perderem os tokens ou ambos expirarem (O refresh_token tem expiração de 90 dias a partir da geração).
* Caso gere um novo refresh_token este tem mais 90 dias a partir da geração para expirar.
* O parceiro precisa iniciar um novo fluxo de concessão para cada cliente da Cielo que o parceiro deseja consultar os dados.

# Ambiente

|Ambiente|Endereço|
|---|---|
|Sandbox|https://api2.cielo.com.br/sandbox/|
|Homologação|https://apihom-cielo.sensedia.com/|

# Collection

Dispobilizamos as Collections utiizadas para realizar as todas operações da API. Será necessário configurar a URL e as credenciais.

[Download das Collections](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ONBOARDING_EDI_CIELO_PARA_CONCILIADORAS.postman_collection.zip)

# Operações

## **POST** Registrar merchantID

Registre o ID do lojista(apenas um, uma lista ou todos), com base no número da entidade.

### Request

> **POST** {{host}}/edi/registers
>
> **Headers**
>
>| Key | Value |
>|---|---|
>| **Authorization** |Bearer + access_token|

```

{
  "mainMerchantId": "9999111222",
  "merchants": [
    "9999111111",
    "9999111333"
  ],
  "merchantEMail": "customer@customer.com",
  "type": [
    "SELL"
  ]
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`mainMerchantId`|ID principal do cliente.|String|||
|`merchants`|Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]||||
|`merchantEMail`|Endereço de e-mail do cliente||||
|`type`|Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO||||

### Response

```

{
  "legalEntityNumber": 1234567890,
  "mainMerchantId": 2008983,
  "registerID": 12345,
  "merchants": [
    823958412384701,
    679809436576210
  ],
  "type": [
    "SELL"
  ],
  "status": "PROCESSING"
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`legalEntityNumber`|Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho).|String|8||
|`mainMerchantId`|ID principal do cliente.|String|||
|`registerID`|ID do registro. O mesmo fornecido por /edi/registers|String|||
|`merchants`|Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]||||
|`type`|Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO||||
|`status`|Status de registro. Se concluído, os arquivos serão fornecidos no dia seguinte||||

## **GET** Consultar o Status do Registro

Recupere o status de registro do EDI.

### Response

> **GET** {{host}}/edi/registers/{registerID}
>
> **Headers**
>
>| Key | Value |
>|---|---|
>|**Authorization**| Bearer + access_token|
>| **registerID** |Valor usado para recuperar o status do registro.|

```

{
  "legalEntityNumber": "01234567890",
  "registerID": 12345,
  "merchants": [
    9999222111,
    9999222222
  ],
  "status": "PROCESSING"
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`legalEntityNumber`|Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho).|String|8||
|`registerID`|ID do registro. O mesmo fornecido por /edi/registers|String|||
|`merchants`|Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]||||
|`status`|Status de registro. Se concluído, os arquivos serão fornecidos no dia seguinte||||

## **GET** Consulta o Registro do merchantID

Consulte o MerchantID com base no registerID ou no mainMerchantID.

### Response

> **GET** {{host}}/edi
>
> **Headers**
>
>| Key | Value |
>|---|---|
>|**Authorization**| Bearer + access_token|
>| **registerID** |O registerID é fornecido pela operação /edi/registers ao se registrar. Pode ser usado no lugar de mainMerchantID, se preferir (apenas um precisa ser informado).|
>| **mainMerchantID** |A maneira mais comum de recuperar um registro EDI na empresa. Pode ser usado em vez de registerID, principalmente em casos de registro não realizados por /edi/registers.|

```

{
  "legalEntityNumer": "12314314",
  "mainMerchantId": 9999111222,
  "registerID": 12345,
  "merchants": [
    9999111111,
    9999111333
  ],
  "type": [
    "SELL"
  ],
  "acknowledge": "COMPLETED"
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`legalEntityNumber`|Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho).|String|8||
|`mainMerchantId`|ID principal do cliente.|String|||
|`registerID`|ID do registro. O mesmo fornecido por /edi/registers|String|||
|`merchants`|Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]||||
|`type`|Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO||||

## **PUT** Atualizar o Registro do merchantID

Atualize o merchantID com base no registerID ou mainMerchantID.

### Request

> **PUT** {{host}}/edi
>
> **Headers**
>
>| Key | Value |
>|---|---|
>|**Authorization**| Bearer + access_token|

```

{
  "registerID": "string",
  "mainMerchantId": "9999222333",
  "merchants": [
    "9999222111",
    "9999222222"
  ],
  "type": [
    "SELL"
  ]
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`registerID`|ID do registro. O mesmo fornecido por /edi/registers|String|||
|`mainMerchantId`|ID principal do cliente.|String|||
|`merchants`|Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]||||
|`type`|Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO||||

### Response

```

{
  "legalEntityNumber": "01234567890",
  "mainMerchantId": 9999111222,
  "registerID": 12345,
  "merchants": [
    9999222333,
    9999111222
  ],
  "type": [
    "SELL"
  ]
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`legalEntityNumber`|Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho).|String|8||
|`mainMerchantId`|ID principal do cliente.|String|||
|`registerID`|ID do registro. O mesmo fornecido por /edi/registers|String|||
|`merchants`|Representa o estado da lista de códigos do comerciante (todos os clientes do grupo serão considerados se omitidos). Exemplo: Lista ["9999111111", "9999111333"]||||
|`type`|Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, ANTECIPATION_CIELO||||

## **DELETE** Excluir o Registro do merchantID

Consulte o MerchantID com base no registerID ou no mainMerchantID.

### Response

> **DELETE** {{host}}/edi
>
> **Headers**
>
>| Key | Value |
>|---|---|
>|**Authorization**| Bearer + access_token|
>| **registerID** |O registerID é fornecido pela operação /edi/registers ao se registrar. Pode ser usado no lugar de mainMerchantID, se preferir (apenas um precisa ser informado).|
>| **mainMerchantID** |A maneira mais comum de recuperar um registro EDI na empresa. Pode ser usado em vez de registerID, principalmente em casos de registro não realizados por /edi/registers.|

```

{
  "legalEntityNumer": "12314314",
  "mainMerchantId": 9999111222,
  "registerID": 12345,
  "acknowledge": "COMPLETED"
}

```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`legalEntityNumber`|Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho).|String|8||
|`mainMerchantId`|ID principal do cliente.|String|||
|`registerID`|ID do registro. O mesmo fornecido por /edi/registers|String|||
|`acknowledge`|||||

## **GET** Consulta a Lista de Filiais

Executa a lista de clientes abaixo do access_token informado. O filtro pode ser usado para listar apenas aqueles disponíveis ou indisponíveis. Indisponível significa que a filial já participa de outro registro. Nos serviços de registro e edição, há validação para permitir que apenas aqueles disponíveis sejam informados.

### Response

> **GET** {{host}}/edi/merchantgroup
>
> **Headers**
>
>| Key | Value |
>|---|---|
>| |**Authorization**| Bearer + access_token|
>| **registerID** |O registerID é fornecido pela operação /edi/registers ao se registrar. Pode ser usado no lugar de mainMerchantID, se preferir (apenas um precisa ser informado).|
>| **mainMerchantID** |A maneira mais comum de recuperar um registro EDI na empresa. Pode ser usado em vez de registerID, principalmente em casos de registro não realizados por /edi/registers.|

```

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

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`legalEntityNumber`|Número de entidade brasileiro. Para uma pessoa jurídica, a raiz (primeiros 8 dígitos) do documento CNPJ deve ser informada. No caso de uma pessoa, todo o documento CPF deve ser informado (11 dígitos, são necessários zeros à esquerda para completar esse tamanho).|String|8||
|`branches`|Lista de Filiais||||
|`businessName`|Nome da empresa||||
|`status`|Filial disponível ou Indisponível||||
