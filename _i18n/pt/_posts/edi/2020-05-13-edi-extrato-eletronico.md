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
    "code": "{}"
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
|Sandbox|https://api2.cielo.com.br/sandbox/edi-api/v2/|
|Homologação|https://apihom-cielo.sensedia.com/edi-api/v2/|

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
>| **externalID** |Valor gerado pelo cliente para evitar solicitação duplicada. Esse valor pode ser usado para obter solicitação. Não use o mesmo valor para novas solicitações.|

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
|`status`|Endereço de e-mail do cliente||||
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
>| **externalID** |Valor gerado pelo cliente para evitar solicitação duplicada. Esse valor pode ser usado para obter solicitação. Não use o mesmo valor para novas solicitações.|
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
>| **externalID** |Valor gerado pelo cliente para evitar solicitação duplicada. Esse valor pode ser usado para obter solicitação. Não use o mesmo valor para novas solicitações.|

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
>| **externalID** |Valor gerado pelo cliente para evitar solicitação duplicada. Esse valor pode ser usado para obter solicitação. Não use o mesmo valor para novas solicitações.|
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
>| **externalID** |Valor gerado pelo cliente para evitar solicitação duplicada. Esse valor pode ser usado para obter solicitação. Não use o mesmo valor para novas solicitações.|
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

# Tipos de Extrato Eletrônico

## Tabela A - Tipos de Arquivo

|Tipo de Arquivo|Informação|Tipo de Registro|Objetivo|
|---|---|---|---|
|**03 Vendas com Plano Parcelado**|Vendas concluídas (capturadas) no dia anterior, ajustes e transações rejeitadas, com a previsão de  pagamento. Todo o plano parcelado da venda realizada no dia anterior.| 0 - Header <br> 1 - Detalhe RO (com a primeira parcela) <br> 2 - Detalhe CV <br> 1 - Detalhe RO (previsão da segunda parcela em diante) <br> 9 - Trailer <br> |Conferir se todas as vendas realizadas foram recebidas pela Cielo e as previsões de pagamento.|
|**04 Pagamentos**| Valores pagos na conta-corrente no dia do envio do Extrato: detalha os ROs e ajustes compensados no dia. <br> Transações compensadas, já antecipadas ou cedidas anteriormente e pagamentos de parcelas em aberto.| 0 - Header <br> 1 - Detalhe RO <br> 2 - Detalhe CV <br> 9 - Trailer <br> |Conferir origem do pagamento recebido (tipo de venda, bandeira e cliente/estabelecimento que efetuou a venda).<br>Conciliação com a conta corrente. |
|**06 Antecipação de Recebíveis Cielo**|Operação de ARV realizada pela Cielo no dia anterior ao envio do arquivo e respectivo detalhe dos ROs e CVs que foram antecipados.| 0 - Header <br> 5 - Detalhe de ARV <br> 6 - Detalhe ROs antecipados <br> 2 - Detalhe CV <br> 7 - Detalhe dos débitos de ROs Antecipados <br> 2 - Detalhe CV <br> 9 - Trailer <br> Obs.: Será demonstrado o registro tipo 5 para cada operação realizada. |Atualizar o fluxo de caixa, considerando os valores já recebidos através da antecipação.| 
|**07 Cessão de Recebíveis**|Operação de cessão realizada no banco Bradesco no dia anterior ao envio do arquivo e respectivo detalhe dos ROs cedidos. <br> Não é demonstrada a condição comercial negociada ou parcela cedida| 0 - Header <br> 5 - Detalhe de ARV <br> 6 -  Detalhe ROs antecipados 9 - Trailer <br> Obs.: Será demonstrado o registro tipo 5 para cada operação realizada. |Atualizar o fluxo de caixa, considerando os valores já recebidos através da operação de cessão.|
|**09 Saldo em Aberto**|Valores a receber com a Cielo, contemplando as transações realizadas, capturadas e processadas, vendas a débito, crédito e parceladas ainda não liquidadas no movimento fechado no mês anterior. O arquivo é disponibilizado mensalmente.| 0 - Header <br> 1 - Detalhe RO <br> 9 - Trailer |Atualizar a previsão futura de recebimentos. Este extrato é o analítico da Carta Saldo (Carta de Circularização) encaminhado para fins de auditoria. Não deve ser utilizado para conciliação. |
|**10 Antecipação de Recebíveis Alelo**|Operação de ARV realizada pela Alelo no dia anterior ao envio do arquivo e respectivo detalhe dos ROs e CVs que foram antecipados.|0 - Header <br> 5 - Detalhe de ARV <br> 6 - Detalhe ROs antecipados <br> 2 - Detalhe CV <br> 7 - Detalhe dos débitos de ROs Antecipados <br> 2 - Detalhe CV <br> 9 - Trailer <br> Obs.: Será demonstrado o registro tipo 5 para cada operação realizada. |Atualizar o fluxo de caixa, considerando os valores já recebidos através da antecipação.|

## Layouts dos Tipos de Registros

### Tabela B - Registro 0 - Header

Identifica o cabeçalho de cada arquivo por matriz de extrato eletrônico*

|Inicio|Fim|Tamanho|Tipo|Descrição|Edição dos Dados|
|---|---|---|---|---|---|
|001|001|1|Num.|Tipo de registro|Constante 0 : identifica o tipo de registro header (início do arquivo).|
|002|011|10|Num.|Estabelecimento Matriz Número do estabelecimento matriz de extrato eletrônico.|
|012|019|8|Num.|Data de processamento AAAAMMDD data em que o arquivo foi gerado.|
|020|027|8|Num.|Período inicial AAAAMMDD período inicial.|
|028|035|8|Num.|Período final AAAAMMDD período final.|
|036|042|7|Num.|Sequência Número sequencial do arquivo. Nos casos de recuperação, este dado será enviado como 9999999.|
|043|047|5|Alfa.|Empresa adquirente Constante Cielo.|
|048|049|2|Num.|Opção de extrato Vide Tabela I.|
|050|050|1|Alfa.|Transmissão Cielo.|
|051|070|20|Alfanum.|Caixa Postal Caixa postal.|
|071|073|3|Num.|Versão Layout Constante 013.|
|074|250|177|Alfanum.|Uso Cielo Em Branco. Reservado para Cielo.|

* **(*)** cadastro que permite a inclusão de todos os estabelecimentos controlados pelo cliente, independente do tipo de pagamento (centralizado, descentralizado, individual). Todos os números de estabelecimento (número do cliente na Cielo) devem ser informados no formulário de cadastro.

### Registro 1 - Detalhe do Resumo de Operações (RO)

Grupo de vendas, ajustes ou cobrança de serviços. Permite identificar a origem dos lançamentos e as ações de manutenção.

|Inicio|Fim|Tamanho|Tipo|Descrição|Edição dos Dados|
|---|---|---|---|---|---|
|001|001|1|Num.|Tipo de registro|Constante 1 - Identifica o tipo de registro detalhe do RO.|
|002|011|10|Num.|Estabelecimento|Submissor Número do estabelecimento e/ou filial onde a venda foi realizada.|
|012|018|7|Num.|Número do RO|Número do resumo de operação. Contêm informações referentes a um grupo de vendas realizadas em uma determinada data.|
|019|020|2|Num.|Parcela| No caso de venda parcelada, será formatado com o número da parcela que está sendo liberada na data do envio do arquivo. No caso de venda à vista, será formatado com brancos.|
|021|021|1|Alfa|Filler|`"/"` - Para vendas parceladas. <br> `"a"` - aceleração das parcelas. <br> `" "` - demais situações.|
|022|023|2|Alfanum.|Plano| No caso de venda parcelada, será formatado com o maior número de parcelas encontradas naquele grupo de vendas. Se o RO tiver vendas em 03, 04 ou 06 parcelas, será preenchido com 06. Se for uma aceleração de parcelas, será formatado com a maior parcela acelerada.<br> Exemplo: (posições 019 a 023) <br> 02A02 indica a aceleração da parcela 02 até a 02, ou seja, somente uma parcela. <br> 03A08 indica a aceleração da parcela 03 até a parcela 08 do plano da venda, ou seja, foram aceleradas 06 parcelas. <br> No caso de venda à vista, será formatado com brancos.<br>|
|024|025|2|Num.|Tipo de Transação|Código que identifica a transação vide Tabela II.|
|026|031|6|Num.|Data de apresentação|AAMMDD Data em que o RO foi transmitido para a Cielo.|
|032|037|6|Num.|Data prevista de pagamento|AAMMDD Data prevista de pagamento. Na recuperação, pode ser atualizada após o processamento da transação ou ajuste.|
|038|043|6|Num.|Data de envio ao banco|AAMMDD Data em que o arquivo de pagamento foi enviado ao banco. Na recuperação, pode ser atualizada após o processamento da transação ou ajuste.|
|044|044|1|Alfa|Sinal do valor bruto|`+` - identifica valor a crédito. <br> `-` - identifica valor a débito.|
|045|057|13|Num.|Valor bruto `(*)`| Somatória dos valores de venda.|
|058|058|1|Alfa|Sinal da taxa administrativa|`+` - identifica valor a crédito. <br> `-` - identifica valor a débito.|
|059|071|13|Num.|Valor da taxa administrativa `(*)`|Valor da taxa administrativa descontada sobre as vendas.|
|072|072|1|Alfa|Sinal do valor rejeitado| `+` identifica valor a crédito.<br> `-` - identifica valor a débito.
|073|085|13|Num.|Valor rejeitado `(*)`| Se houver rejeição, será preenchido com a somatória das transações rejeitadas.
|086|086|1|Alfa|Sinal do valor líquido| `+` identifica o valor a crédito. <br> `-` - identifica o valor a débito.
|087|099|13|Num.|Valor líquido `(*)`| Valor das vendas descontado o valor da taxa administrativa.
|100|103|4|Alfanum.|Banco|Código do banco no qual os valores foram depositados.
|104|108|5|Alfanum.|Agência|Código da agência na qual os valores foram depositados.
|109|122|14|Alfanum.|Conta-corrente / poupança|Conta-corrente / poupança na qual os valores foram depositados.
|123|124|2|Num.|Status do pagamento| Identifica a situação em que se encontram os créditos enviados ao banco vide Tabela III. Na recuperação, o status é atualizado de acordo com o envio e retorno de confirmação de pagamento por parte do banco.|
|125|130|6|Num.|Quantidade de CVs aceitos|Quantidades de vendas aceitas no RO.|
|131|132|2|Num.|Código do Produto (Desconsiderar)|A partir de 01/03/2014, o Identificador do produto passou a ser enviado nas posições 233-235 com três caracteres.|
|133|138|6|Num.|Quantidades de CVs rejeitados|Quantidade de vendas rejeitadas no RO.|
|139|139|1|Alfa|Identificador de revenda/aceleração|Identifica as ocorrências de manutenção em transações parceladas na loja: <br>`R` - Revenda <br>`A` - Aceleração <br> `""` - Brancos (nenhuma ocorrência).
|140|145|6|Num.|Data de captura da transação|AAMMDD - Data em que a transação foi capturada pela Cielo. Na recuperação, pode ser atualizada após o processamento da transação ou ajuste.|
|146|147|2|Alfanum.|Origem do ajuste|Identifica o tipo de ajuste vide Tabela V. Preenchido se o tipo de transação for: <br> 02 Ajuste crédito <br> 03 Ajuste débito <br> 04 Ajuste aluguel|
|148|160|13|Num.|Valor complementar|Valor do saque quando o produto for igual a 36 ou valor do Agro Electron para transações dos produtos 22 23 ou 25 apresentados na Tabela IV.|
|161|161|1|Alfa|Identificador de Antecipação Identificador de antecipação do RO:<br> `" "` - Não antecipado;<br> `"A"` - Antecipado Cielo ou Alelo;<br> `C` - Antecipado no banco - Cessão de Recebíveis.|
|162|170|9|Num.|Número da operação de Antecipação|Identifica o número da operação de Antecipação apresentada no registro tipo 5 campo 12 ao 20, associada ao RO antecipado na Cielo/Alelo ou cedido no banco.<br> Conterá zeros, caso o RO não tenha sido antecipado.|
|171|171|1|Alfa|Sinal do valor Bruto antecipado| `+` identifica valor a crédito. `-` - identifica valor a débito.|
|172|184|13|Num.| Valor Bruto Antecipado `(*)`| Valor bruto antecipado, fornecido quando o RO for antecipado/cedido. Será preenchido com zeros quando não houver antecipação.|
|185|187|3|Num.|Bandeira| Código da Bandeira vide tabela VI.|
|188|209|22|Num.|Número Único do RO| Número Único de identificação do RO formatado da seguinte forma: <br>Primeira parte (fixa) 15 posições fixas: identifica o resumo mantendo o seu histórico na Cielo; <br> Segunda parte (variável) 07 posições variáveis: Identifica as alterações realizadas no RO.|
|210|213|4|Num.|Taxa Administrativa `(*)`| Percentual de taxa administrativa aplicado no valor da transação.|
|214|218|5|Num.|Tarifa Administrativa `(*)`| Tarifa cobrada por transação.|
|219|222|4|Num.|Taxa de Garantia `(*)`| Percentual de desconto aplicado sobre transações Electron Pré-Datado.|
|223|224|2|Num.|Meio de Captura|Vide tabela VII. Caso a venda tenha sido reprocessada, o sistema enviará o meio de captura 06: Meio de captura manual. Neste caso, desconsiderar o valor informado no número lógico do terminal.|
|225|232|8|Alfanum.|Número lógico do terminal|Número lógico do terminal onde foi efetuada a venda. Quando o meio de captura for igual a 06, desconsiderar o número lógico do terminal, pois este será um número interno da Cielo.|
|233|235|3|Num.|Código do Produto|Código que identifica o produto vide Tabela IV.|
|236|245|10|Num.| Matriz de Pagamento|Estabelecimento matriz de pagamento.|
|246|246|1|Alfa|Reenvio de Pagamento|`S` - identifica que este resumo está sendo reenviado no extrato. Desconsiderar o pagamento enviado anteriormente. `N` - não refere-se à reenvio de pagamento.
|247|247|1|Alfa|Conceito aplicado|Identifica o conceito aplicado no resumo apresentado: <br>`" "` - Antigo <br> `"N"` - Novo|
|248|249|2|Alfanum.|Grupo de Cartões| Identifica o grupo de cartões conforme abaixo: <br> - Brancos. Serviço não atribuído <br> 01 - Cartão emitido no Brasil <br> 02 - Cartão emitido no exterior <br> 03 - MDR por Tipo de Cartão - Inicial <br> 04 - MDR por Tipo de Cartão - Intermediário 05 - MDR por Tipo de Cartão - Superior|
|250|250|1|Alfanum.|Uso Cielo|Em Branco. Reservado para Cielo.|
