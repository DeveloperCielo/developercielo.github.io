---
layout: tutorial
title: Commercialization API
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

- **1.Consulta de ramos de atividade permitidos (aplicável apenas a Pessoa Física)**
  - No caso de PJ, consideraremos o ramo declarado na receita federal (CNAE Primário)
- **2.Consulta de bancos permitidos para liquidação**
- **3.Consulta de tipos de negócio e respectivos filtros de oferta:**
  - a.Exemplos de filtros de ofertas:
    - i.Faturamento Mensal
    - ii.Ramo de atividade (apenas PF)
    - iii.CEP Comercial
    - iv.Indicador de Receba Rápido (RR)
      - Caso seja escolhido receber ofertas com Receba Rápido, será necessário informar um indicador adicional:Indicador de Liquidação via Cartão Pré-Pago. Esse campo irá influenciar, principalmente, na geração de ofertas do tipo D0 ou D2.
    - v.Indicador de meta de faturamento
    - vi.entre outros
  - b.Exemplos de tipos de negócio:
    - i.Pagamentos com máquina de cartão
    - ii.Pagamentos por meios digitais
      - 1.Pagamentos para vendas pontuais e através de redes sociais
      - 2.Pagamentos para sua loja virtual
      - 3.Pagamentos para seu e-commerce customizado
    - iii.entre outros
- **4.Disponibilização de ofertas ao canal**
  - a.O canal irá receber ofertas conforme filtros e tipo de negócio escolhido
  - b.Tipos de negócio:
    - i.Pagamentos com máquina de cartão
      - Disponibilizar uma máquina de cartão com cobrança de aluguel
        - 1.Catálogo com 3 ofertas, conforme perfil do cliente (p. exemplo faturamento e ramo de atividade),podendo envolver MDR, RR, valor do aluguel, meta de faturamento e modelo de maquina de cartão
        - 2.Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de maquina de cartão comcobrança de aluguel
    - ii.Pagamentos por meios digitais
      - 1.Pagamentos para vendas pontuais e através de redes sociais
        - Disponibilizar credenciais para geração de link de pagamento
          - a.Catálogo com planos de benefício (emissão de boleto e consulta antifraude): gratuito, inicial,mega e especial
          - b.As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendo envolver MDR e valor do plano de benefício
          - c.Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de link de pagamento
      - 2.Pagamentos para sua loja virtual
        - Disponibilizar credenciais para API de checkout
          - a.Catálogo com planos de benefício (emissão de boleto e consulta antifraude): gratuito, inicial,mega e especial
          - b. As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendo envolver MDR e valor do plano de benefício
          - c. Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de API Checkout
      - 3.Pagamentos para seu e-commerce customizado
        - Disponibilizar credenciais para API e-commerce 3.0
          - a.As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendoenvolver MDR
          - b.Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de API e-commerce 3.0
- **5.Criação de pedido com base em uma oferta escolhida**
  - a.Deverão ser enviadas as informações cadastrais do cliente junto com a oferta escolhida
  - b.As informações passarão por validações cadastrais regulatórias e de negócio.
  - c.É preciso que algumas consistências sejam levadas em consideração no envio das informações para que o pedido possa ser criado com sucesso:
    - i.Geral:
      - É necessários que todos os campos obrigatórios sejam enviados e estejam com os formatos esperados.
    - ii.Dados principais - CPF/CNPJ
      - Não serão aceitos pedidos com CPF/CNPJ distintos daqueles enviados no momento da consulta da oferta.
    - iii.Oferta:
      - É necessário que o ID da oferta enviado seja equivalente aos IDs disponibilizados anteriormente.
    - iv.Dados de Pagamento:
      - 1.Se a oferta escolhida for com o tipo de recebimento em D0, a escolha para o método de pagamento das vendas deverá ser de Conta Digital.
        - Para Conta Digital, existem restrições de Natureza Jurídica (clientes PJ).
      - 2.Se a oferta escolhida for com o tipo de recebimento em D2 ou sem antecipação de recebíveis, a escolha para o método de pagamento das vendas deverá ser de Domicílio Bancário.
    - v.Endereços
      - 1.O estabelecimento a ser credenciado poderá escolher por uma opção de entrega distinta do endereço comercial. Para isto, o endereço de entrega deverá ser contemplado no campo “deliveryData”.
      - 2.Não serão aceitos pedidos com CEP comercial distinto daqueles enviados no momento da consulta da oferta.
    - vi.Telefones
      - É obrigatório enviar pelo menos um telefone do tipo celular
- **6.Consulta de pedido**
- **7.Tracking de pedido**
- **8.Coleta de consentimento**
  - a.Processo obrigatório para canais cadastrados como auto afiliação.
  - b.O momento ideal para realizar a consulta de documentos para opt-in é após o envio do pedido dado que todos os dadoscadastrais já estarão coletados.
- **9.Notificações de alterações de status do pedido via webhook**

# Glossário

- **MDR (Merchant Discount Rate)** é a taxa que os estabelecimentos pagam para as credenciadoras de cartão de crédito para que eles possam aceitar pagamentos via cartão de crédito ou débito;
- **MCC (Merchant Category Code)** é um número de quatro dígitos registrado na ISO 18245 para serviços financeiros de varejo. O MCC é utilizado para classificar o negócio pelo tipo fornecido de bens ou serviços;
- **RR (Receba Rápido)** é uma taxa que os estabelecimentos pagam para receber suas vendas antes do fluxo padrão de liquidação;
- **Payout method (Método de liquidação)** é o meio como o estabelecimento irá receber as vendas realizadas pela solução de captura contratada. Atualmente, o cliente pode optar entre recebimento em seu domicílio bancário ou em por meio de um cartão pré-pago/conta digital;
- **Settlement timing (Prazo de liquidação)** é a quantidade de dias para o recebimento das vendas com cartão de crédito realizadas pelo estabelecimento. O prazo padrão é de 30 dias para crédito a vista e para crédito parcelado conforme parcelamento, a redução deste prazo se dá através da contratação do serviço "Receba Rápido" (antecipationRate). Exemplos: a) se o prazo de liquidação for "D30", o cliente receberá as vendas conforme parcelamento escolhido (prazo padrão); b) se o prazo de liquidação for "D0", o cliente receberá as vendas de débito e crédito em até 1 dia a contar da data da transação; c) se o prazo de liquidação for "D2", o cliente receberá as vendas de débito e crédito em até 2 dias a contar da data da transação;
- **Total payment volume (Valor de faturamento mensal)** é o valor mensal em reais que o estabelecimento estima transacionar por meio de uma solução de captura;
- **Intermediary (Intermediário)** é a pessoa que possui permissão prévia para negociar em nome do cliente ou prospect e que realizou a solicitação do produto ou serviço;
- **Recurring Payments (Pagamentos recorrentes)** é uma modalidade de cobrança, comumente associado à contratação de serviços, onde o cliente autoriza que o estabelecimento realize cobranças periódicas em seu cartão por um período de tempo pré-determinado;
- **Payments Facilitators (Facilitadores de pagamentos ou Subadquirentes)** são intermediários que fornecem os serviços de processamento e liquidação financeira, para receber os pagamentos em cartão. Utilizado principalmente por estabelecimento de e-commerce;
- **Merchants ou ECs** são os estabelecimentos comerciais cadastrados na Cielo; Canal de comercialização é a ferramenta pelo qual o estabelecimento poderá realizar a contratação de produtos e serviços na Cielo. Exemplos: Site da Cielo, App de clientes, App da área comercial;
- **Parceiro** é a entidade ou agente externo que está autorizado e facilita a comercialização de produtos e serviços da Cielo;
- **Webhook** é um recurso usado na internet para que uma ferramenta (ou aplicativo) se comunique com outra ferramenta, fornecendo dados em tempo real sempre que um evento acontecer. Desta forma os dois sistemas realizam troca de informações sem que nenhuma ação externa precise ser realizada.

# Característica da API

A solução API foi desenvolvida com a tecnologia REST, que é padrão de mercado e independe da tecnologia utilizada por nossos clientes. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação, tais como:

- ASP
- Net
- Java
- PHP
- Ruby
- Python

> Não deve ser enviado no formato XML.

Entre outras características, os atributos que mais se destacam na plataforma Cielo de Comercialização Unificada:

- **Simplicidade:** o protocolo utilizado é puramente o HTTPS.
- **Credenciais de acesso:** o parceiro e/ou canal receberá credenciais de acesso (cliente ID e client Secret), disponibilizado pela Cielo, e deverá informar em toda solicitação.
  Segurança: a troca de informações se dá sempre entre o Servidor do parceiro/canal e da Cielo.
- **Segurança:** a troca de informações se dá sempre entre o Servidor do parceiro/canal e da Cielo.

# Ambientes Disponíveis

Para utilizar as APIs, as requisições devem ser executadas utilizando as respectivas credenciais dos ambientes de Labs, Sandbox e Produção.

Para solicitar credenciais, entre em contato com o ponto focal do time comercial da Cielo e informe para quais ambientes são necessárias credenciais. Será necessário informar o nome e e-mail da pessoa ou caixa de e-mail do grupo de pessoas que precisam receber essa credencial para o acesso à API. Esse mesmo e-mail deverá ser utilizado para a criação de uma nova conta em nosso portal de desenvolvedores (https://desenvolvedores.cielo.com.br/api-portal/ ). Para verificar qual foi a credencial gerada, acesse a conta criada e verifique o seu o Client-Id.

| Ambiente     | Descrição                                                                                                                                                                        | Endpoint                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Labs**     | Destinado à realização de testes com parceiros e demais canais da Cielo. Utiliza mocks para simular o retorno das operações. As operações não são executadas em ambientes reais. | https://api2.cielo.com.br/labs/commercialization-api/v1    |
| **Sandbox**  | Destinado à realização de testes com parceiros e demais canaisda Cielo. As operações são executadas em ambiente real, porém não produtivo.                                       | https://api2.cielo.com.br/sandbox/commercialization-api/v1 |
| **Produção** | É o ambiente transacional integrado ao ambiente da Cielo. As operações realizadas nesse ambiente são reais e não podem ser desfeitas.                                            | https://api2.cielo.com.br/commercialization-api/v1         |

# Autenticação

Para realizar qualquer acesso às APIs será necessário obter um token de segurança a partir de autenticação oAuth, utilizando o `client_id` e `client_secret`. Este token de segurança deverá ser enviado no header das demais operações, e deve ser renovado periodicamente.

Segue um exemplo de requisição de obtenção do token de segurança:

## Request

**Authorization Basic Base64(`client_id` e `client_secret` concatenado com ":" e codificado em base64)**

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
  "expires_in": "{expiration_time}"
}
```

# Utilização

A API de comercialização foi modelada com base nos conceitos de ofertas e pedidos. Atendendo a esses conceitos básicos, é permitido que o canal seja flexível para oferecer uma experiência diferenciada ao usuário. As necessidades de interação com o cliente serão detalhadas a seguir:

## 1 - Consulta e apresentação de ofertas para um cliente ou prospect

O canal deverá utilizar a operação `GET /offers` para obter as ofertas disponíveis para determinado estabelecimento. Uma oferta irá conter toda alista de serviços e produtos com suas respectivas condições. Caberá ao canal coletar as informações de entrada para a consulta e com o retorno,apresentar as condições de cada oferta para que o usuário possa escolher entre uma delas.

### Dados de entrada

Para que seja possível direcionar a melhor oferta para o cliente, alguns dados de entrada são obrigatórios para essa operação, e deverão serobtidos pelo canal junto ao cliente, prospect ou intermediador:

- `taxId`: CPF ou CNPJ do estabelecimento;
- `businessTypeCode`: É o código do tipo de negócio pelo qual o estabelecimento está interessado. A lista completa de tipos de negócio pode ser consultada pela operação `GET /business-types`

- Exemplo de um tipo de negócio:

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

- `dealType`: É o tipo de modalidade de negociação de um produto. Opções disponíveis:
  - **LENDING** (comodato);
  - **RENT**(aluguel);
  - **SALE**(venda);
- `totalPaymentValue`: É o valor de faturamento mensal estimado em reais;
- `zipCode`: É o CEP do endereço do estabelecimento;
- `merchantCategoryCode`: É o código do ramo de atividade do estabelecimento. O canal poderá acessar a lista de todos os ramos de atividades permitidos para pessoas físicas pela operação `GET /merchant-category-codes`. Essa informação será obrigatória apenas para pessoa física, visto que para pessoa jurídica será coletada a informação cadastrada na Receita Federal (CNAE Primário);

Cada tipo de negócio também possui filtros adicionais (`filters`). Caso sejam informados, poderão direcionar uma oferta mais personalizada para o cliente.

Exemplo: Se enviarmos os query params abaixo, a API irá filtrar ofertas com o serviço “Receba Rápido” e com “Meta por faturamento”:
/v1/offers?filter=`RECEBA_RAPIDO`&filter=`META_POR_FATURAMENTO`

> Todos os campos são de preenchimento obrigatório para solicitações de pessoa jurídica (exceto o zipCode e merchantCategoryCode) e pessoa física vinculadas aos tipos de negócio pagamento com máquina de cartão e pagamento digital.

### Dados saida

Ao executar a operação, deverá ser retornada uma lista de ofertas com os seguintes campos:

<aside class="warning"><b>Consulte o ponto focal da Cielo para verificar qual o limite mínimo de faturamento de cada modalidade/dealtype para liberação/recebimento
de oferta. Não serão todos os clientes, principalmente com faturamento baixo, que terão ofertas para qualquer modalidade/dealtype.</b></aside>

- `offerId`: identificador da oferta
- `expirationDate`: data de expiração da oferta
- `description`: descrição da oferta
- `registrationRequired`: indica que o canal deverá solicitar os dados cadastrais ao cliente e submetê-los ao na criação do pedido (`POST
/order`)
- `items`: listados os princiais produtos e serviços ofertados, com a seguinte estrutura:
- `itemId`: identificador do item
- `name`: nome do item
- `imageUrl`: url da imagem do produto ou serviço
- `allowedPayoutMethods`: tipos de domicílios permitidos para a liquidação
- `mandatoryConfiguration`: lista dos campos de configuração obrigatórias para o item (a serem informados no momento da criação
  do pedido)
- `dealStatus`: status de contratação de cada item (principais e adicionais). Essa informação poderá ser utilizada para comunicação mais assertiva ao cliente/agente credenciador.
  - Abaixo opções:
    - NEW (contratação de novo produto ou serviço)
    - UPDATE (cliente já possui o produto ou serviço e sofrerá alterações caso aceite a oferta)
    - REMOVAL (cliente já possui o produto ou serviço, mas será removido/substituido caso aceite a oferta)
    - NO_CHANGES (cliente já possui o produto ou serviço e não sofrerá alterações caso aceite a oferta)
- `additionalItems`: lista de itens adicionais e complementares da oferta/item principal (herda a mesma estrutura de um item)
- `conditions`: lista de condições de contratação do item. Existem diferentes possibilidades de formato da condição, para informar a forma de cobrança, tempo de vigência, limites, etc. Seguem alguns Exemplos de condições:

- Valor de faturamento mínimo (`minimumTotalPaymentVolume`): Para ofertas baseadas em meta de faturamento, esta condição pode informar o limite para que a condição seja aplicada:

```json
[
{
"description":"Cobrança de aluguel com atingimento de
meta de faturamento",
"monthlyPayment": 0,
"minimumTotalPaymentVolume": 10000
},
{
"description":"Cobrança de aluguel sem atingimento de
meta de faturamento",
"monthlyPayment": 123.45
}
]
```

- Cobrança de taxa (`rate`): valor que será cobrado de forma unitária

```json
[
{
"description":"Cobrança de taxa de antecipação sobre
vendas",
"rate":2.01
}
]
```

- Cobrança mensal (`monthlyPayment`): valor que será cobrado mensalmente durante a validade do contrato/oferta

```json
[
  {
    "description": "Cobrança de aluguel",
    "monthlyPayment": 100.01
  }
]
```

- Pagamento único (`price`): valor que será cobrado uma única vez e após aceite da oferta

```json
[
  {
    "description": "Pagamento único",
    "price": 1234.01
  }
]
```

- Lista de taxas MDR (`mdr`): taxa/MDR, por bandeira e tipo de produto (débito, crédito a vista e crédito parcelado), que será cobrado em cada transação

```json
[
{
"description":"Cobrança de taxas sobre as vendas por
bandeira e tipo de transação",
"mdr":[
{
"brand":{
"code":"01",
"name":"Visa"
},
"rates":[
{
"transactionProfile":"DEBIT",
"rate":2.01
},
{
"transactionProfile":"CREDIT_IN_CASH",
"rate":2.01
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":3,
"rate":2.22
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":6,
"rate":2.45
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":12,
"rate":2.49
}
]
},
{

"brand":{
"code":"02",
"name":"MasterCard"
},
"rates":[
{
"transactionProfile":"DEBIT",
"rate":2.01
},
{
"transactionProfile":"CREDIT_IN_CASH",
"rate":2.01
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":3,
"rate":2.22
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":6,
"rate":2.45
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":12,
"rate":2.49
}
]
}
]
}
]
```

- Lista de taxas segmentadas de antecipação (`anticipationRates`): taxas, por bandeira/brand, produto/transactionProfile (crédito a vista e crédito parcelado) e número de parcela/installments, referente a antecipação do recebimento do cliente em seu domicílio

```json
[
{
"description":"Cobrança de taxas de antecipação sobre
vendas",
"anticipationRates":[
{
"brand":{
"code":"01",
"name":"Visa"
},
"rates":[
{

"transactionProfile":"DEBIT",
"rate":2.01
},
{
"transactionProfile":"CREDIT_IN_CASH",
"rate":2.01
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":3,
"rate":2.22
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":6,
"rate":2.45
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":12,
"rate":2.49
}
]
},
{
"brand":{
"code":"02",
"name":"MasterCard"
},
"rates":[
{
"transactionProfile":"DEBIT",
"rate":2.01
},
{
"transactionProfile":"CREDIT_IN_CASH",
"rate":2.01
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":3,
"rate":2.22
},
{
"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":6,
"rate":2.45
},
{

"transactionProfile":"
CREDIT_IN_INSTALLMENTS",
"installments":12,
"rate":2.49
}
]
}
]
}
]
```

- Quantidade de dias para liquidação (`settlementTiming`): quantidade de dias que o cliente receberá suas venda em seu domicílio

> Sempre que o campo `settlementTiming` for retornado em uma oferta, será cobrada uma taxa referente a antecipação do prazo de
> recebimento (campo `anticipationRates`).

<aside class="warning"><b>Quando o campo `settlementTiming` não constar na oferta, o cliente receberá no prazo padrão e conforme parcelamento, ou seja, venda
parcelada em 3x, receberá em 30/60/90 dias.</b></aside>

```json
[
  {
    "description": "Taxa de Receba Rápido",
    "rate": 2.1,
    "settlementTiming": 2,
    "conditionDuration": 12
  }
]
```

- Quantidade em meses de duração da condição (`conditionDuration`): prazo de duração da oferta, em meses, após aceite e efetivação

```json
[
  {
    "description": "Taxa de Receba Rápido",
    "settlementTiming": 2,
    "conditionDuration": 12
  }
]
```

## 2 - Criação de pedido a partir de uma oferta

O canal precisará coletar a oferta escolhida pelo cliente e, também os dados cadastrais e configurações adicionais de cada serviço que consta na oferta.

A operação `POST /orders` deverá ser utilizada para criar o pedido.

### Dados de Entrada:

Após a escolha da oferta, o canal precisará coletar as informações necessárias para a criação do pedido. Parte das informações que o canal deverá solicitar são informados no próprio payload da oferta.

No header da requisição deverão ser informados os seguintes dados:

`externalId`: é o identificação da requisição de criação do pedido, deve ser um único para cada pedido, e gerado e controlado peloconsumidor da API. Será utilizado para controle de idempotência.
`intermediaryId`: é o identificador da pessoa que negocia a comercialização em nome do prospect ou cliente.

O body da requisição contém as seguintes informações

`offerId`: id da oferta escolhida (recebido na etapa 1 - consulta de ofertas);
`itemsConfiguration`: lista de configurações dos itens da oferta escolhida. Verificar o campo `mandatoryConfiguration` da oferta para identificar quais informações são necessárias.

Exemplo:

No item abaixo que consta na oferta escolhida, é solicitado o campo `payoutData` (dados de liquidação):

```json
"itemId":"2d4e212f-545f-4d97-a07a-0bb01a9b3345",
"name":"Vendas com máquina de cartão de crédito e débito",
"mandatoryConfiguration":[
"payoutData"
],
...
```

Dessa forma, devemos formatar o campo `itemsConfiguration` com o campo solicitado:

```json
"itemsConfiguration": [
{
"itemId": "2d4e212f-545f-4d97-a07a-0bb01a9b3345",
"payoutData": {
"payoutMethod": "BANK_ACCOUNT",
"targetBankAccount": {
"bankNumber": "237",
"bankBranchNumber": "12249",
"accountNumber": "14623-7",
"accountType": "CHECKING"
}
}
}
...
]
```

**Possíveis tipos de configuração:Possíveis tipos de configuração:**

- `websiteUrl`: URL do site (e-commerce)
- `isMerchantProcessRecurringPayments`: indica se o estabelecimento utilizará o serviço para processar pagamentos recorrentes com seus clientes
- `isMerchantPaymentsFacilitator`: indica se o estabelecimento utilizará o serviço para atuação como facilitador de pagamentos.
- `payoutData`: são os dados necessários para liquidação (recebimento das vendas) conforme tipo de domicílio identificado na ofertas (allowed `PayoutMethods`). Atualmente a Cielo permite o recebimento por meio de um domicílio bancário ou cartão pré-pago

> Caso na oferta venha a opção `BANK_ACCOUNT`, deverá ser consumido o serviço `GET/payout-eligible-banks` para escolha do domicílio bancários mais adequado ao cliente.

<aside class="warning"><b>Caso na oferta venha apenas a opção `PREPAID_CARD`, não será necessário consumir o serviço de domicílio bancário. Se enviado um domicílio bancário, o pedido será rejeitado pela Cielo.</b></aside>

<aside class="warning"><b>Caso na oferta venha apenas a opção `BANK_ACCOUNT`, não poderá ser enviado domicílio cartão pré-pago, caso contrário o pedido será
rejeitado pela Cielo.</b></aside>

- Exemplo para recebimento em domicílio bancário:

```json
"payoutData": {
"payoutMethod": "BANK_ACCOUNT",
"targetBankAccount": {
"bankNumber": "237",
"bankBranchNumber": "12249",
"accountNumber": "14623-7",
"accountType": "CHECKING"
}
}
```

- Exemplo para recebimento em cartão pré-pago:

```json
"payoutData": {
"payoutMethod": "PREPAID_CARD"
}
```

- `deliveryData`: informações sobre entrega / logística
  - Existem 2 opções:
    - In Person: entrega da maquina de imediato pelo agente credenciador mediante aprovação do credenciamento. Neste cenário não teria necessidade de informa o endereço de entrega;
    - Courier Service: entrega da máquina no domicílio do cliente/lojista mediante aprovação do credenciamento. Neste cenário, é obrigatório informar o endereço de entrega.

> Consulte o ponto focal da Cielo para verificar quais perfis de entrega que serão utilizados

- Exemplo In Person:

```json
"deliveryData": {
"deliveryType": "IN_PERSON"
}
```

- Exemplo Courier Service:

```json
"deliveryData": {
"deliveryType": "COURIER_SERVICE",
"deliveryAddress": {
"name": "Paulista",
"type": "Avenida",
"number": "1200",
"extraLine": "Apto 251",
"neighborhood": "Jardins",
"city": "Sao Paulo",
"state": "SP",
"country": "BR",
"zipCode": "01539010"
}
}
```

- `registrationData`: grupo de informações com os dados cadastrais do cliente. É obrigatório se na oferta escolhida o campo `registrationRequired` estiver como `true`.

<aside class="warning"><b>O parceiro/canal deverá garantir que o formato/informações abaixo tenha validação no formulário/APP e que sejam enviadas corretamente (passível de rejeição):<br><br>
  
1. CPF/CNPJ Cliente: ser o mesmo informado na oferta;<br>
2. CPF Proprietário (apenas PJ): ter obrigatoriamente 11 dígitos;<br>
3. Inscrição estadual: apenas dado numérico e, em caso de isenção, deixar o campo em branco;<br>
4. Nome Proprietário/Nome da Mãe: ter ao menos 2 nomes;<br>
5. Data de nascimento: cliente deverá ser maior de 18 anos;<br>
6. Email: deve ser um email válido e atendendo a expressão regular ^(("[\w-\s]+")|([\w-]+(?:.[\w-]+))|("[\w-\s]+")([\w-]+(?:.[\w-]+)))(@((?:[\w-]+.)*\w[\w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$)|(@[?((25[0-5].|2[0-4][0-9].|1[0-9]{2}.|[0-9]{1,2}.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}).){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})]?$)<br>
a. Exemplo: teste@cielo.com.br ou teste@cielo.com<br>
b. Email do proprietário: não tem preenchimento obrigatório, porém, se enviado, deverá seguir as validações acima<br>
c. Email da companhia: tem preenchimento obrigatório e será validado conforme regras acima<br>
7. Telefone: garantir o preenchimento de todas as informações (DDD e número) e atender às seguintes regras:<br>
a. Será limitado a 1 número de telefone do tipo celular (mobilePhone = true) e 1 número de telefone do tipo comercial/fixo(mobilePhone = false);<br>
b. É obrigatório o envio de número do tipo celular (mobilePhone = true), atendendo aos requisitos:<br>
i. O número deverá conter 9 dígitos e iniciar com 9 | Expressão regular sugerida para validação do campo no formulário: ^[9]{1}[0-9]{8}$.</b></aside>

- Exemplo de Pessoa Física:

```json
"registrationData": {
"individual": {
"taxId": "34013415020",
"fullName": "Joaquim Antônio da Cunha Pavão",
"birthDate": "1976-09-09",
"motherName": "Maria Dolores Antônio da Cunha",
"email": "myname@company.com"
},
"phones": [
{
"countryCode": 55,
"areaCode": 11,
"number": 918273645,
"mobilePhone": true
}
],
"address": {
"name": "Paulista",
"type": "Avenida",
"number": "1200",
"extraLine": "Apto 251",
"neighborhood": "Jardins",
"city": "Sao Paulo",
"state": "SP",
"country": "BR",
"zipCode": "01539010"
}
}
```

- Exemplo de Pessoa Jurídica:

```json
"registrationData": {
"company": {
"taxId": "60957392000103",
"companyName": "Green Burguers",
"stateRegistration": "347213796222",
"email": "mycompany@company.com",
"companyOwners": [
{
"taxId": "34013415020",
"fullName": "Joaquim Antônio da Cunha Pavão",
"birthDate": "1976-09-09",
"motherName": "Maria Dolores Antônio da Cunha",
"email": "myname@company.com"
}
]
},
"phones": [
{
"countryCode": 55,
"areaCode": 11,
"number": 918273645,
"mobilePhone": true
}
],
"address": {
"name": "Paulista",
"type": "Avenida",
"number": "1200",
"extraLine": "Apto 251",
"neighborhood": "Jardins",
"city": "Sao Paulo",
"state": "SP",
"country": "BR",
"zipCode": "01539010"
}
}
```

## 3- Coleta e registro de consentimento

Para canais de autoatendimento, após a criação do pedido, será necessário realizar a coleta do consentimento do cliente nos termos e no contrato (p. exemplo: política de privacidade, termo de credenciamento, entre outros). Utilize a operação `GET /agreements` para listar todos os aceites e termos que devem ser coletados e utilize a operação `POST /agreements` para registrar.

<aside class="warning"><b>Para canais de autoatendimento, o pedido não será concluído até o envio do consentimento.<br>Consulte seu ponto focal da Cielo para verificar qual o perfil do canal.</b></aside>

> **Observação:** Nos canais operados por um intermediador, a coleta do consentimento será feita em um momento posterior, e diretamente pelo cliente, por meio de outro canal (como por exemplo a área logada do Site da Cielo).<br>Além disso, terá limitação no compartilhamento de informação após a conclusão do pedido, visto que não houve o OPTIN/consentimento nos termos e contratos. Por exemplo: não será compartilhado, via API, as chaves de acesso dos cadastros de e-commerce. Essa
> informação será enviada diretamente por email ao cliente.

## 4- Tracking e informações do pedido

A API de comercialização provê 2 mecanismos para que o canal possa informar o cliente, prospect ou intermediador do andamento do pedido:

### Notificações via webhook

O parceiro deverá implementar um webhook para receber notificações assíncronas de atualizações de status do pedido.

- **Estrutura dos eventos**

| Campo             | Tipo     | Obrigatório | Descrição                                                                                                                                                                         |
| ----------------- | -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventType`       | enum     | S           | Identificador do evento. Nesse caso os valores possíveis são: order-status-change. Caso o valor for healthcheck, o endpoint deverá responder HTTP 200 indicando que está on-line. |
| `eventCreateDate` | datetime | S           | Data de criação do evento                                                                                                                                                         |
| `eventDetails`    | Objeto   | N           | Este objeto contém detalhes do evento.                                                                                                                                            |

- Exemplos de eventos:

Após o canal enviar o pedido, será enviado um dos eventos abaixo:

- `order-created`: informará se o pedido foi aceito pela Cielo

```json
{
   "eventType":"order-created",
   "eventCreateDate":"2019-04-25T09:27:54.783Z",
   "eventDetails":{
      "eventId":"162d8827-ae23-471b-bfa6-2ec7064e40f",
      "externalId":"uk4231y412hjh2134u12h",
      "orderId":"194492435235",
      "newStatus":"CRIADO"
   }
```

- `order-rejected`: informará se o pedido foi rejeitado pela Cielo e o(s) seu(s) respectivo(s) motivo(s)

```json
{
   "eventType":"order-created",
   "eventCreateDate":"2019-04-25T09:27:54.783Z",
   "eventDetails":{
      "eventId":"162d8827-ae23-471b-bfa6-2ec7064e40f",
      "externalId":"uk4231y412hjh2134u12h",
      "reasons":[
         {
            "code":1,
            "message":"example reason"
         }
      ]
   }
```

Se o pedido for aceito (`order-created`), o canal poderá acompanhar o tracking do pedido através do evento:

- `order-updated`: informará o andamento/detalhes das etapas do pedido

```json
{
  "eventType": "order-updated",
  "eventCreateDate": "2019-04-25T09:27:54.783Z",
  "eventDetails": {
    "eventId": "162d8827-ae23-471b-bfa6-2ec7064e40f",
    "externalId": "uk4231y412hjh2134u12h",
    "orderId": "194492435235",
    "newStatus": "INSUCESSO",
    "reasons": [
      {
        "code": 123,
        "description": "Domicilio bancário inválido"
      }
    ],
    "merchantId": "2323232323",
    "merchantKey": "kwfmkmfkmfkfw",
    "clientId": "kwfmkmfkmfkfw",
    "clientSecret": "afmladfm",
    "logicalNumbers": ["314431-1", "314431-2"]
  }
}
```

- `healthcheck`: utilizado para verificar a disponibilidade do serviço do canal para envio dos eventos. Em caso de falha, será suspenso o envio das
  notificações até estabilização; posterior a isso, serão enviadas todas as informações represadas.

```json
{
  "eventType": "healthcheck",
  "eventCreateDate": "2019-04-25T09:27:54.783Z"
}
```

**Consulta de pedido**

O canal poderá utilizar a operação GET /orders para consultar todas as informações do pedido como status, etapas, eventos, alterações de status e seus respectivos itens.

### Tracking do pedido e do item

O tracking contém as informações de andamento do pedido ou do item do pedido. As informações retornadas no tracking são listadas abaixo:

- `currentStatus`: Status atual do pedido ou do item

```json
"currentStatus":{
   "statusCode":5,
   "statusMessage":"Sucesso"
}
```

- `events`: Lista de eventos relevantes que demarcam uma mudança de status e de etapa. Todo evento pode possuir uma data e hora de
  ocorrência (`occurrenceTime`), status anterior (`previousStatus`), status posterior (`nextStatus`), etapa anterior (`previousStep`) e etapa posterior (
  `nextStep`)

```json
"events":[
   {
      "occurenceTime":"2012-04-23T18:25:43.511Z",
      "description":"Pedido criado",
      "nextStatus":{
         "statusCode":1,
         "statusMessage":"Em validação"
      },
      "nextStep":{
         "stepId":1,
         "description":"Validação"
      }
   },
   {
      "occurenceTime":"2012-04-23T18:26:43.511Z",
      "description":"Validação concluída",
      "previousStatus":{
         "statusCode":1,
         "statusMessage":"Em validação"
      },
      "nextStatus":{
         "statusCode":2,
         "statusMessage":"Aguardando pagamento"
      },
      "previousStep":{
         "stepId":1,
         "description":"Validação"
      },
      "nextStep":{
         "stepId":2,
         "description":"Pagamento"
      }
   },
   {
      "occurenceTime":"2012-04-23T18:26:43.511Z",
      "description":"Pagamento realizado",
      "previousStatus":{
         "statusCode":2,
         "statusMessage":"Aguardando pagamento"
      },
      "nextStatus":{
         "statusCode":3,
         "statusMessage":"Em atualização de cadastro"
      },
      "previousStep":{
         "stepId":2,
         "description":"Pagamento"
      },
      "nextStep":{
         "stepId":3,
         "description":"Cadastro"
      }
   },
   {
      "occurenceTime":"2012-04-23T18:27:43.511Z",
      "description":"Cadastro concluído",
      "previousStatus":{
         "statusCode":3,
         "statusMessage":"Em atualização de cadastro"
      },
      "nextStatus":{
         "statusCode":4,
         "statusMessage":"Em processamento"
      },
      "previousStep":{
         "stepId":3,
         "description":"Cadastro"
      },
      "nextStep":{
         "stepId":4,
         "description":"Processamento"
      }
   },
   {
      "occurenceTime":"2012-04-23T18:28:43.511Z",
      "description":"Processamento concluído",
      "previousStatus":{
         "statusCode":4,
         "statusMessage":"Em processamento"
      },
      "nextStatus":{
         "statusCode":5,
         "statusMessage":"Sucesso"
      },
      "previousStep":{
         "stepId":4,
         "description":"Cadastro"
      }
   }
]
```

- `steps`: Lista de etapas que o pedido ou item executou ou irá executar, com seus respectivos status atual (`status`) e sequência (`sequence`)

```json
"steps":[
   {
      "stepId":1,
      "description":"Validação",
      "sequence":1,
      "status":{
         "statusCode":5,
         "statusMessage":"Sucesso"
      }
   },
   {
      "stepId":2,
      "description":"Pagamento",
      "sequence":1,
      "status":{
         "statusCode":5,
         "statusMessage":"Sucesso"
      }
   },
   {
      "stepId":3,
      "description":"Cadastro",
      "sequence":1,
      "status":{
         "statusCode":5,
         "statusMessage":"Sucesso"
      }
   },
   {
      "stepId":4,
      "description":"Processamento",
      "sequence":1,
      "status":{
         "statusCode":5,
         "statusMessage":"Sucesso"
      }
   }
]
```
