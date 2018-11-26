---
layout: manual
title: Silent Order POST
description: Manual integração técnica Silent Order POST
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API e-Commerce Cielo
language_tabs:
  shell: cURL
---

# Silent Order Post

Integração que a Cielo oferece aos lojistas, onde os dados de pagamentos são trafegue de forma segura, mantendo o controle total sobre a experiência de Ckeckout.

Esse método possibilita o envio dos dados do pagamento do seu cliente final de forma segura diretamente em nosso sistema. Os campos de pagamento são guardados do lado da Cielo, que conta com a certificação PCI DSS 3.2.

É ideal para lojistas que exigem um alto nível de segurança, sem perder a identidade de sua página. Esse método permite um alto nível de personalização na sua página de checkout.

# Características

* Captura de dados de pagamento diretamente para os sistemas da Cielo por meio dos campos hospedados na sua página através de um script (javascript).
* Compatibilidade com todos os meios de pagamentos disponibilizados ao Gateway (Nacional e Internacional)
* Autenticação do comprador (disponível)
* Redução do escopo de PCI DSS
* Mantenha controle total sobre a experiência de check-out e elementos de gestão da sua marca.

# Fluxo de Autorização

## Fluxo Padrão de Autorização

![Fluxo Padrão](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo-padrao-de-autorizacao.jpg)

É preciso que o estabelecimento seja **PCI Compliance** (PCI = Regras de segurança para manipular os dados do cartão)

## Fluxo de Autorização com Silent Order POST

![Fluxo Padrão](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo-de-autorizacao-com-sop.jpg)

O servidor **não trafega os dados do cartão** abertamente.

# Fluxo Transacional

![Fluxo Silent Order Post]({{ site.baseurl_root }}/images/fluxo-silent-order-post-cielo.jpg)

# Integração

**PASSO 1**

O cliente acaba o checkout, e vai para o processamento do pagamento.

**PASSO 2**

a) O estabelecimento deverá solicitar um ticket (server to server) enviando um POST para a seguinte URL:

**SANDBOX:**
**https://transactionsandbox.pagador.com.br/post/api/public/v1/accesstoken?merchantid={mid_loja}**

**PRODUÇÃO:**
**https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid={mid}**

Exemplo: https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid=00000000-0000-0000-0000-000000000000

## Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v1/accesstoken?merchantid={mid_loja}</span></aside>

```shell
curl
--request POST "https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid=00000000-0000-0000-0000-000000000000"
--header "Content-Type: application/json"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|-----------|---------|----|-------|-----------|
|`mid_loja`|Identificador da loja na API |Guid |36 |Sim|

## Resposta

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "AccessToken": "NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==",
    "Issued": "2018-07-23T11:09:32",
    "ExpiresIn": "2018-07-23T11:29:32"
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|-----------|---------|----|-------|-------|
|`MerchantId`|Identificador da loja na API |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`AccessToken`|Token de Acesso|Texto|--|NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==|
|`Issued`|Data e hora da geração |Texto|--|AAAA-MM-DDTHH:MM:SS|
|`ExpiresIn`|Data e hora da expiração |Texto|--|AAAA-MM-DDTHH:MM:SS|

b) Para uso este recurso, por questões de segurança, obrigatoriamente será requerido do lado da Cielo, **no mínimo um IP válido do estabelecimento**. Caso contrário a requisição não será autorizada (**HTTP 401 NotAuthorized**).

**PASSO 3**

a) Como resposta, o estabelecimento receberá um json (HTTP 201 Created) contendo entre outras informações o ticket (AccessToken), como por exemplo:

![Response Ticket]({{ site.baseurl_root }}/images/response-ticket-silent-order-post-cielo.jpg)

Por questões de segurança, este ticket dará permissão para o estabelecimento salvar apenas 1 cartão dentro de um prazo de já estipulado na resposta, através do atributo ExpiresIn (por padrão, 20 minutos). O que acontecer primeiro invalidará esse mesmo ticket para um uso futuro.

**PASSO 4 ao 6**

a) O estabelecimento deverá fazer o download de um script fornecido pela Cielo, e anexá-lo a sua página de checkout. Esse script permitirá à Cielo processar todas as informações de cartão sem intervenção do estabelecimento.
O download poderá ser realizado a partir da seguinte URL: 

**SANDBOX:**
**https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js**

**PRODUÇÃO:**
**https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js**

b) O estabelecimento deverá decorar seus inputs do formulário com as seguintes classes:

* Para o portador do cartão de crédito/débito: **bp-sop-cardholdername** 
* Para o número do cartão de crédito/débito: **bp-sop-cardnumber** 
* Para a validade do cartão de crédito/débito: **bp-sop-cardexpirationdate** 
* Para o código de segurança do cartão de crédito/débito: **bp-sop-cardcvvc**

c) O script fornecido pela Cielo fornece três eventos para manipulação e tratamento por parte do estabelecimento. São eles: **onSuccess** (onde será retornado o **“PaymentToken”** após processar os dados do cartão), **onError** (caso haja algum erro no consumo dos serviços da Cielo) e **onInvalid** (onde será retornado o resultado da validação dos inputs).

* Na validação dos inputs, o estabelecimento poderá utilizar toda a camada de validação sobre os dados de cartão realizada pela Cielo e assim simplificar o tratamento no seu formulário de checkout. As mensagens retornadas no resultado da validação são disponibilizadas nas seguintes linguagens: português (default), inglês e espanhol.

* O **PaymentToken** será o token que representará todos os dados de cartão fornecido pelo comprador. O mesmo será utilizado pelo estabelecimento para não haver necessidade de tratar e processar dados de cartão do seu lado.

**Por questões de segurança esse PaymentToken poderá ser usado apenas para 1 autorização na Cielo 3.0. Após o processamento do mesmo, este será invalidado.**

Exemplo de setup a ser realizado pelo estabelecimento na página de checkout:

![Pagina Checkout]({{ site.baseurl_root }}/images/html-silent-order-post.jpg)
