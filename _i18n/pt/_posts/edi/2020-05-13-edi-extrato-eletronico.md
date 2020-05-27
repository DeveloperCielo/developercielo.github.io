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

## Passo 2 – Requisitando um Access Token

## Passo 3 – Chamando as APIs

# Ambiente

|Ambiente|Endereço|
|---|---|
|Sandbox|https://api2.cielo.com.br/sandbox/edi-api/v2/|
|Homologação|https://apihom-cielo.sensedia.com/edi-api/v2/|

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
