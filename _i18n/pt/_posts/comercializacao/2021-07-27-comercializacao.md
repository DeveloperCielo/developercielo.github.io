---
layout: tutorial
title:  Commercialization API
description: Commercialization API - Portal de Desenvolvedor
search: true
translated: true
toc_footers: true
categories: tutorial
sort_order: 7
tags:
  - Commercialization Cielo
---

# Introdução

O objetivo desta API é possibilitar e flexibilizar, aos parceiros e canais, a comercialização de quaisquer produtos e serviços da Cielo.
Este manual irá guiar o desenvolvedor com o passo a passo da integração com a API de Comercialização da Cielo, além de possuir algumas dicas
e pontos de atenção importantes.

# Funcionalidades contempladas atualmente na API:

* 1. Consulta de ramos de atividade permitidos (aplicável apenas a Pessoa Física)
  * No caso de PJ, consideraremos o ramo declarado na receita federal (CNAE Primário)
* 2. Consulta de bancos permitidos para liquidação
* 3. Consulta de tipos de negócio e respectivos filtros de oferta:
  * a. Exemplos de filtros de ofertas:
    * i. Faturamento Mensal
    * ii. Ramo de atividade (apenas PF)
    * iii. CEP Comercial
    * iv. Indicador de Receba Rápido (RR)
    * Caso seja escolhido receber ofertas com Receba Rápido, será necessário informar um indicador adicional:Indicador de Liquidação via Cartão Pré-Pago. Esse campo irá influenciar, principalmente, na geração de ofertas do tipo D0 ou D2.

# Glossário

* **MDR (Merchant Discount Rate)** é a taxa que os estabelecimentos pagam para as credenciadoras de cartão de crédito para que eles possam aceitar pagamentos via cartão de crédito ou débito;
* **MCC (Merchant Category Code)** é um número de quatro dígitos registrado na ISO 18245 para serviços financeiros de varejo. O MCC é utilizado para classificar o negócio pelo tipo fornecido de bens ou serviços;
* **RR (Receba Rápido)** é uma taxa que os estabelecimentos pagam para receber suas vendas antes do fluxo padrão de liquidação;
* **Payout method (Método de liquidação)** é o meio como o estabelecimento irá receber as vendas realizadas pela solução de captura contratada. Atualmente, o cliente pode optar entre recebimento em seu domicílio bancário ou em por meio de um cartão pré-pago/conta digital;
* **Settlement timing (Prazo de liquidação)** é a quantidade de dias para o recebimento das vendas com cartão de crédito realizadas pelo estabelecimento. O prazo padrão é de 30 dias para crédito a vista e para crédito parcelado conforme parcelamento, a redução deste prazo se dá através da contratação do serviço "Receba Rápido" (antecipationRate). Exemplos: a) se o prazo de liquidação for "D30", o cliente receberá as vendas conforme parcelamento escolhido (prazo padrão); b) se o prazo de liquidação for "D0", o cliente receberá as vendas de débito e crédito em até 1 dia a contar da data da transação; c) se o prazo de liquidação for "D2", o cliente receberá as vendas de débito e crédito em até 2 dias a contar da data da transação;
* **Total payment volume (Valor de faturamento mensal)** é o valor mensal em reais que o estabelecimento estima transacionar por meio de uma solução de captura;
* **Intermediary (Intermediário)** é a pessoa que possui permissão prévia para negociar em nome do cliente ou prospect e que realizou a solicitação do produto ou serviço;
* **Recurring Payments (Pagamentos recorrentes)** é uma modalidade de cobrança, comumente associado à contratação de serviços, onde o cliente autoriza que o estabelecimento realize cobranças periódicas em seu cartão por um período de tempo pré-determinado;
* **Payments Facilitators (Facilitadores de pagamentos ou Subadquirentes)** são intermediários que fornecem os serviços de processamento e liquidação financeira, para receber os pagamentos em cartão. Utilizado principalmente por estabelecimento de e-commerce;
* **Merchants ou ECs** são os estabelecimentos comerciais cadastrados na Cielo; Canal de comercialização é a ferramenta pelo qual o estabelecimento poderá realizar a contratação de produtos e serviços na Cielo. Exemplos: Site da Cielo, App de clientes, App da área comercial;
* **Parceiro** é a entidade ou agente externo que está autorizado e facilita a comercialização de produtos e serviços da Cielo;
* **Webhook** é um recurso usado na internet para que uma ferramenta (ou aplicativo) se comunique com outra ferramenta, fornecendo dados em tempo real sempre que um evento acontecer. Desta forma os dois sistemas realizam troca de informações sem que nenhuma ação externa precise ser realizada.

# Característica da API

A solução API foi desenvolvida com a tecnologia REST, que é padrão de mercado e independe da tecnologia utilizada por nossos clientes. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação, tais como:
* ASP
* Net
* Java
* PHP
* Ruby
* Python

> Não deve ser enviado no formato XML.

Entre outras características, os atributos que mais se destacam na plataforma Cielo de Comercialização Unificada:

* **Simplicidade**: o protocolo utilizado é puramente o HTTPS.
* **Credenciais de acesso**: o parceiro e/ou canal receberá credenciais de acesso (cliente ID e client Secret), disponibilizado pela Cielo, e deverá informar em toda solicitação.
Segurança: a troca de informações se dá sempre entre o Servidor do parceiro/canal e da Cielo.

# Ambientes Disponíveis

Para utilizar as APIs, as requisições devem ser executadas utilizando as respectivas credenciais dos ambientes de Labs, Sandbox e Produção.

Para solicitar credenciais, entre em contato com o ponto focal do time comercial da Cielo e informe para quais ambientes são necessárias credenciais. Será necessário informar o nome e e-mail da pessoa ou caixa de e-mail do grupo de pessoas que precisam receber essa credencial para o acesso à API. Esse mesmo e-mail deverá ser utilizado para a criação de uma nova conta em nosso portal de desenvolvedores (https://desenvolvedores.cielo.com.br/api-portal/ ). Para verificar qual foi a credencial gerada, acesse a conta criada e verifique o seu o Client-Id.

|Ambiente|Descrição|Endpoint|
|---|---|---|
|**Labs**|Destinado à realização de testes com parceiros e demais canais da Cielo. Utiliza mocks para simular o retorno das operações. As operações não são executadas em ambientes reais.|https://api2.cielo.com.br/labs/commercialization-api/v1|
|**Sandbox**|Destinado à realização de testes com parceiros e demais canaisda Cielo. As operações são executadas em ambiente real, porém não produtivo.|https://api2.cielo.com.br/sandbox/commercialization-api/v1|
|**Produção**|É o ambiente transacional integrado ao ambiente da Cielo. As operações realizadas nesse ambiente são reais e não podem ser desfeitas.|https://api2.cielo.com.br/commercialization-api/v1|

# Autenticação

Para realizar qualquer acesso às APIs será necessário obter um token de segurança a partir de autenticação oAuth, utilizando o **client_id** e **client_secret**. Este token de segurança deverá ser enviado no header das demais operações, e deve ser renovado periodicamente.

Segue um exemplo de requisição de obtenção do token de segurança:

## Request

**Authorization Basic Base64(client_id e client_secret concatenado com ":" e codificado em base64)**

```json
curl --location --request POST 'https://api2.cielo.com.br/v2/oauth/token'
\
--header 'Authorization: Basic base64 \
--header 'Content-Type: text/plain' \
--data-raw '{"grant_type": "client_credentials"}'
```

## Respose

```json
{
"access_token": "{access_token}",
"refresh_token": "{refresh_token}",
"token_type": "access_token",
"expires_in": {expiration_time}
}
```

# Utilização

A API de comercialização foi modelada com base nos conceitos de ofertas e pedidos. Atendendo a esses conceitos básicos, é permitido que o canal seja flexível para oferecer uma experiência diferenciada ao usuário. As necessidades de interação com o cliente serão detalhadas a seguir:

## Consulta e apresentação de ofertas para um cliente ou prospect

O canal deverá utilizar a operação **GET /offers** para obter as ofertas disponíveis para determinado estabelecimento. Uma oferta irá conter toda alista de serviços e produtos com suas respectivas condições. Caberá ao canal coletar as informações de entrada para a consulta e com o retorno,apresentar as condições de cada oferta para que o usuário possa escolher entre uma delas.

### Dados de entrada:

Para que seja possível direcionar a melhor oferta para o cliente, alguns dados de entrada são obrigatórios para essa operação, e deverão serobtidos pelo canal junto ao cliente, prospect ou intermediador:

* `taxId`: CPF ou CNPJ do estabelecimento;
* `businessTypeCode`: É o código do tipo de negócio pelo qual o estabelecimento está interessado. A lista completa de tipos de negócio pode ser consultada pela operação **GET /business-types** 

* Exemplo de um tipo de negócio:

```json
{
"code": "CARD_MACHINE_PAYMENTS",
"description": "Pagamento por meio de máquina de cartão",
"mandatoryFields": [
"taxId",
"dealTypeFilter",
"totalPaymentVolume",
"zipCode",
"merchantCategoryCode"
],
"filters": [
{
"code": "RECEBA_RAPIDO",
"description": "Ofertas com Receba Rápido"
},
{
"code": "META_FATURAMENTO",
"description": "Ofertas com meta de faturamento mensal"
}
]
}
```

Cada tipo de negócio pode possuir campos específicos obrigatórios (mandatoryFields) que devem ser também coletados para possibilitar a consulta de ofertas. Segue abaixo a relação dos possíveis campos obrigatórios que podem ser solicitados de acordo com o tipo de negócio escolhido:

* `dealType`: É o tipo de modalidade de negociação de um produto. Opções disponíveis:
  * **LENDING** (comodato);
  * **RENT**(aluguel);
  * **SALE**(venda);
* `totalPaymentValue`: É o valor de faturamento mensal estimado em reais;

* `zipCode`: É o CEP do endereço do estabelecimento;
* `merchantCategoryCode`: É o código do ramo de atividade do estabelecimento. O canal poderá acessar a lista de todos os ramos de atividades permitidos para pessoas físicas pela operação **GET /merchant-category-codes**. Essa informação será obrigatória apenas para pessoa física, visto que para pessoa jurídica será coletada a informação cadastrada na Receita Federal (CNAE Primário); 
 
Cada tipo de negócio também possui filtros adicionais (**filters**). Caso sejam informados, poderão direcionar uma oferta mais personalizada para o cliente.

Exemplo: Se enviarmos os query params abaixo, a API irá filtrar ofertas com o serviço “Receba Rápido” e com “Meta por faturamento”:
/v1/offers?filter=**RECEBA_RAPIDO**&filter=**META_POR_FATURAMENTO**
