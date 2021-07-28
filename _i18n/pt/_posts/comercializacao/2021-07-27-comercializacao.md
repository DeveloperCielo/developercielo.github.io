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
