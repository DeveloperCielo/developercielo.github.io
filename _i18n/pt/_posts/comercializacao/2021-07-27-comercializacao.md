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

* Consulta de ramos de atividade permitidos (aplicável apenas a Pessoa Física)
* No caso de PJ, consideraremos o ramo declarado na receita federal (CNAE Primário)
* Consulta de bancos permitidos para liquidação
* Consulta de tipos de negócio e respectivos filtros de oferta:
  * Exemplos de filtros de ofertas:
    * Faturamento Mensal
    * Ramo de atividade (apenas PF)
    * CEP Comercial
    * Indicador de Receba Rápido (RR)
    * Indicador de meta de faturamento
    * entre outros
* Exemplos de tipos de negócio:
  * Pagamentos com máquina de cartão
  * Pagamentos por meios digitais
    * Pagamentos para vendas pontuais e através de redes sociais
    * Pagamentos para sua loja virtual
    * Pagamentos para seu e-commerce customizado
    * entre outros
* Disponibilização de ofertas ao canal
  * O canal irá receber ofertas conforme filtros e tipo de negócio escolhido
  * Tipos de negócio:
    * Pagamentos com máquina de cartão
      * Disponibilizar uma máquina de cartão com cobrança de aluguel
        * Catálogo com 3 ofertas, conforme perfil do cliente (p. exemplo faturamento e ramo de atividade), podendo envolver MDR, RR, valor do aluguel, meta de faturamento e modelo de maquina de cartão
        * Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de maquina de cartão com cobrança de aluguel
    * Pagamentos por meios digitais
      * Pagamentos para vendas pontuais e através de redes sociais
        * Disponibilizar credenciais para geração de link de pagamento
          * Catálogo com planos de benefício (emissão de boleto e consulta antifraude): gratuito, inicial,mega e especial
          * As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendo envolver MDR e valor do plano de benefício
          * Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de link de pagamento
    * Pagamentos para sua loja virtual
      * Disponibilizar credenciais para API de checkout
        * Catálogo com planos de benefício (emissão de boleto e consulta antifraude): gratuito, inicial,mega e especial
        * As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendoenvolver MDR e valor do plano de benefício
        * Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de API Checkout
    * Pagamentos para seu e-commerce customizado
      * Disponibilizar credenciais para API e-commerce 3.0
        * As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendo envolver MDR
        * Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de API e-commerce 3.0
* Criação de pedido com base em uma oferta escolhida
  * Deverão ser enviadas as informações cadastrais do cliente junto com a oferta escolhida
* Consulta de pedido
* Tracking de pedido
* Coleta de consentimento
* Notificações de alterações de status do pedido via webhook

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
