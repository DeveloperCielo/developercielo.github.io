---
layout: manual
title: Manual de Integração
description: Techinical specification for integrations using Promotions APIs wich includes resources and access to functions to store and return data related to the Cielo´s promotions.
search: true
categories: manual
sort_order: 1
tags:
  - API Cielo Promotions
language_tabs:
  json: JSON
  shell: cURL
---
# Visão Geral

Documentação técnica para orientar os desenvolvedores e parceiros durante a integração de suas aplicações com a API de promoções e ofertas da Cielo para os estabelecimentos comerciais que utilizam o Cielo Promo.
## Público-alvo

API Restrita/Privada, necessário liberação interna para utilização, disponível apenas para colaboradores Cielo. Desenvolvedores e integradores parceiros que possuem conhecimentos em integração utilizando APIs REST e que queiram integrar o seu sistema / aplicativo mobile com as funcionalidades da API promotions da Cielo.
## O que é

APIs que permitem a divulgação das Promoções (descontos e brindes) em estabelecimentos que possuem o Cielo Promo nas plataformas dos Parceiros.
## Como funciona

Descrição dos verbos HTTP comuns as APIs:

| Método   | Descrição                                |
| -------- | ---------------------------------------- |
| **POST** | O método HTTP `POST` é utilizado na criação dos recursos ou no envio de informações que serão processadas Por exemplo, criação de uma transação |
| **GET**  | O método HTTP `GET` é utilizado para consultas de recursos já existentes Por exemplo, consulta de transações |
| **PUT**  | O método HTTP `PUT` é utilizado substituir recursos, executando uma atualização completa |
| **PATCH**  | O método HTTP `PATCH` é utilizado atualizar recursos, executando uma atualização parcial dos dados |
### Diagrama de utilização demostrando o funcionamento da solução
### Diagrama de utilização demostrando os passos para o uso da API
## Endpoints (Sandbox e Produção)

Ambiente Produção

* [https://api.cielo.com.br/promotions/v1](https://api.cielo.com.br/promotions/v1)

Ambiente Sandbox

* [https://api.cielo.com.br/sandbox/promotions/v1](https://api.cielo.com.br/sandbox/promotions/v1)
## HTTP Header

Todas as chamadas da API necessitam que as informações abaixo estejam presentes no Header na requisição:

**Client-Id**: Identificação de acesso Sua geração ocorre no momento da criação pelo painel do desenvolvedor Seu valor pode ser visualizado na coluna “Client ID”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”

**Access-Token**:Identificação do token de acesso, que armazena as regras de acesso permitidas ao Client ID Sua geração ocorre no momento da criação do Client ID pelo painel do desenvolvedor Seu valor pode ser visualizado clicando em “detalhes” na coluna “Access Tokens”, dentro do menu “Desenvolvedor” -> “Client ID Cadastrados”
## HTTP Status Code

| Código | Erro                  | Descrição                                |
| ------ | --------------------- | ---------------------------------------- |
| 200    | OK                    | Operação realizada com sucesso           |
| 201    | Created               | A solicitação foi realizada, resultando na criação de um novo recurso |
| 204    | Empty                 | Operação realizada com sucesso, mas nenhuma resposta foi retornada |
| 400    | Bad Request           | A requisição possui parâmetro(s) inválido(s) |
| 401    | Unauthorized          | O token de acesso não foi informado ou não possui acesso às APIs |
| 403    | Forbidden             | O acesso ao recurso foi negado           |
| 404    | Not Found             | O recurso informado no request não foi encontrado |
| 413    | Request is to Large   | A requisição está ultrapassando o limite permitido para o perfil do seu token de acesso |
| 422    | Unprocessable Entity  | A requisição possui parâmetros obrigatórios não informados |
| 429    | Too Many Requests     | O consumidor estourou o limite de requisições por tempo |
| 500    | Internal Server Error | Erro não esperado; algoestá quebrado na API |
