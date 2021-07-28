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
