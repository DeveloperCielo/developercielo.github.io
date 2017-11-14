---
layout: manual
title: Manual de integração
description: Integração técnica via API
search: true
translated: true
categories: manual
Order: 1
tags:
  - Cielo LIO
language_tabs:
  json: JSON
---

# Bem-vindo a Cielo!

Nessa documentação você tem acesso a todas as informações sobre as plataformas de desenvolvimento da Cielo bem como suas principais funcionalidades para integrar com seu negócio.

O objetivo dessa documentação é facilitar o processo de desenvolvimento e integração com a Cielo

Caso você deseje ser cliente Cielo e possuir uma de nossas soluções de pagamento, acesse https://www.cielo.com.br/seja-nosso-cliente/ e escolha a solução ideal para você vender muito mais.

##Arquitetura

A plataforma Cielo LIO consiste em:

Dispositivo de ponto de venda baseado em Android.

* Uma loja de aplicativos (Cielo Store) para os desenvolvedores publicarem seus aplicativos e os disponibilizarem para os estabelecimentos comerciais.
* Uma plataforma com arquitetura em nuvem e APIs REST que permite a integração com parceiros. Acesse Documentação da Integração Remota
* Um SDK para desenvolvimento em Android, de forma que aplicativos de parceiros possam se integrar com as funcionalidades de pagamento da Cielo LIO. Acesse * Documentação da Integração Local

O objetivo da Cielo LIO é fornecer uma plataforma de controle e gestão de negócios que vai além de um sistema de pagamentos tradicional. Essa plataforma suporta aplicativos desenvolvidos para sistema Android, incentivando desenvolvedores parceiros a criar aplicativos especializados para determinados segmentos (restaurantes, vestuário, cosméticos, combustível e outros) e, assim, permitindo que esses estabelecimentos escolham o aplicativo que melhor se adapte ao modelo de negócio da empresa.

Quer conhecer mais sobre o produto Cielo LIO? Acesse: *[http://cielolio.com.br](http://cielolio.com.br)*

### Modelos de integração com a plataforma Cielo LIO

**Integração Remota | Cielo LIO Order Manager**

Conjunto de APIs que permitem que o cliente continue utilizando sua solução de PDV/Automação Comercial com todas as funcionalidades. No momento de realizar o pagamento, ocorre a integração com o gerenciador de pedidos (Order Manager) da Cielo LIO, de forma rápida, simples e segura.

**Integração Local | Cielo LIO Order Manager SDK**

A Cielo disponibiliza um SDK com base na Cielo LIO Order Manager API que permite ao desenvolvedor e parceiro Cielo LIO integrar em sua aplicação as funcionalidades de pagamento do Order Manager da Cielo LIO