---
layout: manual
title: Manual de Integração
description: Manual integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Cielo Promotions
language_tabs:
  json: JSON
  shell: cURL
---

# Visão geral - API Cielo eCommerce

O objetivo desta documentação é orientar o desenvolvedor sobre como integrar com a **API Cielo eCommerce da Cielo**, descrevendo as funcionalidades, os métodos a serem utilizados, listando informações a serem enviadas e recebidas, e provendo exemplos.

O mecanismo de integração com o Cielo eCommerce é simples, de modo que apenas conhecimentos intermediários em linguagem de programação para Web, requisições HTTP/HTTPS e manipulação de arquivos JSON, são necessários para implantar a solução Cielo eCommerce com sucesso.

Nesse manual você encontrará a referência sobre todas as operações disponíveis na API REST da API Cielo eCommerce. Estas operações devem ser executadas utilizando sua chave específica (Merchant ID e Merchant Key) nos respectivos endpoints dos ambientes:

Ambiente Produção

* **Requisição de transação**: https://api.cieloecommerce.cielo.com.br/
* **Consulta transação**: https://apiquery.cieloecommerce.cielo.com.br/

Ambiente Sandbox

* **Requisição de transação**: https://apisandbox.cieloecommerce.cielo.com.br
* **Consulta transação**: https://apiquerysandbox.cieloecommerce.cielo.com.br

Para executar uma operação, combine a URL base do ambiente com a URL da operação desejada e envie utilizando o verbo HTTP conforme descrito na operação.

## Características da solução

A solução API Cielo eCommerce da plataforma Cielo eCommerce foi desenvolvida com a tecnologia REST, que é padrão de mercado e independe da tecnologia utilizada por nossos clientes. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação, tais como: ASP, ASP. Net, Java, PHP, Ruby, Python, etc.
