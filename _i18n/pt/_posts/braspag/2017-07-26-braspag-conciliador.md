---
layout: manual
title: Conciliador
description: Integração técnica
search: true
translated: true
categories: manual
tags:
  - Documentos Braspag
language_tabs:
  json: JSON
---

# Arquivos Fluxo de Caixa 2.0 - XML

## Introdução

Este manual tem como objetivo orientar o desenvolvimento do Arquivo de Fluxo de Caixa da plataforma conciliador no formato XML, e a extração do seu conteúdo através do Webservice

## Legenda para os tipos de formato 

| Descritor | Significado                                     | Exemplo                            |
|-----------|-------------------------------------------------|------------------------------------|
| N         | Um ou mais algarismos (0 a 9)                   | 243                                |
| A         | Um ou mais caracteres alfanuméricos             | Texto                              |
| {N}       | Um  único algarismo (0 a 9)                     | 2                                  |
| {A}       | Identificador Único Global (GUID)1              | B                                  |
| G         | Hora em campo data/hora (0 a 23)                | 4749e676-2507-442da1c6c25c08e2d2af |
| DT        | Data e hora, representados no formato ISO 86012 | 2015-06-09T10:08:19.1748259-03:00  |
| D         | Data, representada no formato ISO 86012         | 2015-06-09                         |


1. Um Identificador Único Global ou GUID (do inglês, Globally Unique IDentifier) é um tipo especial de identificador utilizado em aplicações de software para providenciar um número de referência padrão mundial. Como, por exemplo, em uma definição de referência interna para um tipo de ponto de acesso em uma aplicação de software ou para a criação de chaves únicas em um banco de dados. O número total de chaves únicas (2128 ou ~3.4×1038) é tão grande que a probabilidade do mesmo número se repetir é muito pequena. Considerando que o Universo Observável contém 5x1022 estrelas, cada estrela poderia ter ~6.8×1015 dos seus próprios GUIDs. Caso seu sistema não reconheça o formato GUID, poderá trata-lo como texto.

2. O formato ISO 8601 é o formato de data padrão existente na recomendação oficial para Schemas XML 
(http://www.w3.org/TR/xmlschema-2/#dateTime). Ele consiste na representação da data no formato yyyy-MM-dd. Caso o campo também tenha a informação de hora, a data vem seguida da letra “T” para separa-la da hora, no formato HH:mm:ss:mmmmmmm, seguida finalmente pela diferença de fuso horário. Para mais informações da ISO 8601 podem ser consultadas em http://en.wikipedia.org/wiki/ISO_8601.   
