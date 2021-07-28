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
      *  Disponibilizar credenciais para API e-commerce 3.0
        * As condições comerciais serão aplicadas conforme o ramo de atividade do cliente, podendo envolver MDR
        * Aplicável apenas para clientes que não tenham nenhum cadastro na Cielo de API e-commerce 3.0
