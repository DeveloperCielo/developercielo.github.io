---
layout: manual
title: Manual de Integração
description:
search: true
translated: true
categories: manual
tags:
  - Documentos Teste
language_tabs:
  json: JSON
  shell: cURL

---

# Nivel 1

Este é o primeiro nivel de informação. Ele é usado para abranger um grande tópico a ser destrinchado adiante.
Evite criar varios topicos neste nivel para que o menu lateral não gere um Rollout em telas de baixa resolução

**exemplo**: 

1. Meio de Pagamentos

## Nivel 2

Este é o segundo nivel de informação. É neste nivel de dados que a maior parte das topicos serão divididos. Use este nivel para iniciar a especificação de topicos mais abrangentes

**exemplo**: 

1. Meio de Pagamentos
2. Cartão de Crédito

### Nivel 3

Este é o Terceiro nivel de informação. Foque este nivel em explicações diretas sobre features

**exemplo**: 

1. Meio de Pagamentos
2. Cartão de Crédito
3. Recorrencia

#### Nivel 4

Este é o Quarto nivel de informação. Foque este nivel exemplos ou pontos a ser destacado

**exemplo**: 

1. Meio de Pagamentos
2. Cartão de Crédito
3. Recorrencia
4. Request/Response

# Tipos de destaque de texto:

No novo layout existem mais tipos de destaque de texto do que na versão anterior. Abaixo exemplos de como esses destaques funcionam e seus códigos

## Destaque de ENDPOINT

Cada tipo de ENDPOINT é destacavél por um `<ASIDE>`

|Tipo    |Código                                                                                                          |
|--------|----------------------------------------------------------------------------------------------------------------|
|**POST**| `<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>` |
|**GET** | `<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/</span></aside>`   |
|**PUT** | `<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/</span></aside>`   |

Como eles são apresentados

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/</span></aside>

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/</span></aside> 

## Destaque de TEXTOS

O novo layout contem os mesmo tipos de destque de texto providos nas versões anteriores,todos baseados em Markdown
Abaixo alguns exemplos e indicações de Regras:

|Tipo    |Descrição | OBS                                                                                                         |
|--------|----------|----------------------------------------------------------------------------------------------------------------|
|**Markdown**|Este documento utiliza o Markdown baseado na versão GITHUB| XXXXXX|
|**Notice** |Este exemplo cria uma caixa de texto azul. Markdown não funciona em seu interior| `<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/</span></aside>`   |
|**Warning** Este exemplo cria uma caixa de texto Vermelha. Markdown não funciona em seu interior| `<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/</span></aside>`   |




