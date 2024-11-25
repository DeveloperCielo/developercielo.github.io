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

**Melhorias no Extrato Eletrônico v15.10**

- **Atualização no arquivo de Negociação de Recebíveis Cielo (NRC)**:
  - Inclusão do campo **"Taxa efetiva da negociação"** nos registros tipo "A".  
    _Esse campo proporciona mais transparência ao processo de conciliação das operações efetuadas pelo cliente._
  - Inclusão do campo **"Valor de desconto"** nos registros tipo "B".  
    _Esse campo oferece visibilidade da diferença entre o valor bruto e o valor líquido._

- **Atualização nos arquivos de venda e pagamento**:
  - Inclusão do **CNPJ** que efetuou a negociação de recebíveis nos registros tipo "E".  
    _Esse campo detalha a origem da negociação realizada pelo cliente._
  - Equalização do domicílio bancário nos arquivos de pagamento.  
    _Isso garante uma visualização consistente entre os registros de detalhe e a consolidação do saldo das URs._

- **Atualização de tabelas de domínio**:
  - Revisão da **Tabela IX** do manual.

**Data de implantação: 24/10/2024**

**Documentação**

[CIELO_Extrato_Eletronico_Manual_Versao_15.10](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/CIELO_Extrato_Eletronico_Manual_Versao_15.10.rar)

[Arquivos de Teste v15.10](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/Arquivosdetesteversao15_10.zip)

[Tabelas de ajuste V15.10](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/v15_10-Tabela-IX-EDIv15PT-EN_2.xlsx)

**Melhorias no Extrato Eletrônico v15.11**

* Ajuste na informação enviada na posição 557 a 565 dos registros tipo "E": Este campo será dividido em duas posições distintas, sendo:
  *  557 a 560: Uso Cielo (Campo reservado para uso Cielo)
  * 561 a 565: Código modalidade de precificação de taxa
* Inclusão de nova tabela de domínio: Tabela XI – Tipo de precificação

Importante: Este campo novo é um campo novo para a conciliação, não indica que a sua taxa foi alterada.

**Data de implantação: 14/01/2025**

**Documentação**

[CIELO_Extrato_Eletronico_Manual_Versao_15.11](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/CIELO_Extrato_Eletronico_Manual_Versao_15-11.pdf)

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

[Download das Collections](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/ctools/ONBOARDING_EDI_CIELO_PARA_CONCILIADORAS.postman_collection.zip)

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
    "BALANCE",
    "NRC"
  ],
  "ediStatus": "AVAILABLE"
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
| `type`           | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, BALANCE e NRC                                     |        |         |             |

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
| `type`              | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, BALANCE e NRC                                                                                                                                           |        |         |             |
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
| `type`              | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, BALANCE e NRC                                                                                                                                            |        |         |             |

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
| `type`           | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, BALANCE e NRC                                     |        |         |             |

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
| `type`              | Representa o estado dos tipos de arquivo EDI. Pelo menos um desses arquivos é necessário: SELL, PAYMENT, BALANCE e NRC                                                                                                                                            |        |         |             |

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

Com isso, será necessário efetuar um novo GET para saber se você pode ou não vincular essa cadeia de merchant a sua conciliadora, que nesse caso é o GET /mainmerchants, se você obter o status "available" no campo "ediStatus", significa que você poderá fazer a duplicação de matriz via API.

> **GET** {{host}}/mainmerchants

```json
[
  {
    "registerID": "38724",
    "mainMerchantID": "2006907071",
    "merchants": ["2006907071"],
    "type": ["SELL", "BALANCE"],
    "ediStatus": "AVAILABLE"
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
  "type": ["SELL", "PAYMENT"]
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
