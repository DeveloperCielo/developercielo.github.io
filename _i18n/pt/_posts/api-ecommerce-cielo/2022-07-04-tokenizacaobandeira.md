---
layout: tutorial
title: Tokenização de Bandeira – Mandate Visa
description: Tokenização de Bandeira – Regra Visa
search: true
translated: true
toc_footers: true
categories: tutorial
sort_order: 8
tags:
  - 1. API E-commerce
---

<aside class="warning"> O conteúdo deste manual foi descontinuado e não é atualizado desde 14/08/2024. Acesse o novo portal.</aside>

# As documentações da API E-commerce Cielo estão em um novo portal

[![Novo portal de desenvolvedores e-commerce Braspag e Cielo]({{ site.baseurl_root }}/images/apicieloecommerce/novo-docs.cielo.com.br.png)](https://docs.cielo.com.br/ecommerce-cielo/docs/tokenizacao-mandate-visa)

Acesse o novo portal de desenvolvedores E-commerce **[docs.cielo.com.br](https://docs.cielo.com.br)**.

> **Atenção**: O conteúdo desta página está sendo descontinuado e não receberá atualizações a partir de 14/08/2024. Visite a nova documentação em [docs.cielo.br](https://docs.cielo.com.br/ecommerce-cielo/docs/tokenizacao-mandate-visa).

--------------------------------------------------------------------------------------------------------------------------

<aside class="warning"> O conteúdo a seguir não é atualizado desde 14/08/2024.</aside>

# Tokenização de Bandeira – Regra Visa

**O que é essa nova regra?**

Com o objetivo de aumentar a segurança online por meio da adoção do token de bandeira (*network token*), a Visa irá começar a cobrar de forma incremental 0,05% sobre o valor de toda transação online aprovada com o cartão aberto (PAN) a partir de fevereiro de 2024.

A seguir, explicamos um pouco do que é a **tokenização de bandeira**, benefícios e quais opções a Cielo oferece para que os clientes possam se adequar à nova regra.

**O que é a tokenização de bandeira e quais os benefícios?**

Algumas bandeiras possuem uma solução de tokenização que oferece o armazenamento de cartões em cofres na própria bandeira, de forma criptografada. Esse serviço tem o intuito de melhorar a segurança e qualidade das informações de cartão trafegadas, o que acarreta possíveis aumentos na performance de aprovação pelos bancos emissores. Veja todos os benefícios:

* **Mais segurança:** além da criação de um código (token ou DPAN) para substituir a informação do cartão aberto (PAN), as bandeiras também emitem os criptogramas, que funcionam como uma senha ou assinatura da bandeira, única para aquele cartão naquele estabelecimento;
* **Atualização automática de cartões:** quando um novo cartão é emitido no lugar do cartão anterior, ou quando a data de expiração de um cartão muda, os bancos enviam essas informações para a base da bandeira, e a bandeira automaticamente atualiza os tokens com as novas informações. Ou seja, não há necessidade de nenhuma ação por parte do estabelecimento - dependendo da bandeira pode haver custos relacionados à atualização do token;
* **Maior performance de aprovação:** por conta da maior segurança no processo e com os dados de cartão sempre atualizados, os tokens de bandeira tendem a aumentar a chance de aprovação das transações.

## Quais são as opções para adequação à regra?

A Cielo oferece as opções abaixo para que a loja se prepare e evite as cobranças da bandeira. Confira a seguir:

### Opção 1: Tokenização Transparente Cielo

Com o objetivo de reduzir esse impacto financeiro para nossos clientes, a Cielo desenvolveu uma solução própria que irá tokenizar todas as transações elegíveis automaticamente.

> **Produtos Elegíveis**: API E-commerce Cielo, API 1.5 (legado), Link de Pagamento e Checkout Cielo.

**Como funciona?**

Quando uma transação online com o cartão aberto (PAN) for recebida em nossa API, a Cielo irá criar um token para aquele cartão. Dessa forma, a transação será recebida pela bandeira Visa já com o token, evitando a cobrança da taxa de 0,05%.

**O token ficará armazenado nos sistemas da Cielo?**

Sim, na Tokenização Transparente Cielo o token de bandeira será armazenado no sistema da Cielo, para que na próxima transação não seja necessário gerar um novo token para o mesmo cartão.

**Quais transações são elegíveis?**

Uma vez que hoje no mercado ainda existem cartões com BINs (primeiros 6 a 8 dígitos do cartão) não elegíveis ao token, não será possível atendermos 100% das transações Visa. Segundo a bandeira, aproximadamente 90% dos BINs Visa já são elegíveis.

**Quais são os custos envolvidos na solução?**

Neste momento a Cielo não irá cobrar pela solução, de forma a propiciar a experiência da tokenização para nossos clientes e mitigar o custo da taxa de 0,05% sobre o valor da transação. Futuramente este tema poderá ser reavaliado.

**Preciso fazer alguma modificação na integração ou solicitar a funcionalidade para a Cielo?**

Não, para a tokenização transparente não há necessidade de nenhuma integração adicional para o cliente Cielo. A solução foi habilitada em fases iniciadas em setembro de 2023 para todos os nossos clientes.

**Qual o impacto dessa solução para clientes que já utilizam a tokenização de bandeira?**

Caso você já esteja usando a tokenização de bandeira, a Cielo irá identificar que a transação já foi tokenizada com a bandeira Visa, e irá seguir para autorização com os dados já fornecidos.

**O que acontece em caso de indisponibilidade do token?**

Em caso de *timeout* ou indisponibilidade da bandeira ou do emissor que impeça o provisionamento do token/criptograma para o cartão, a Cielo irá enviar a transação para autorização com o número do cartão (PAN), a fim de evitar perda de vendas para nossos clientes.

Se preferir, você também pode optar por outras opções para fazer a gestão do token de bandeira por conta própria, caso use a API E-commerce Cielo. Vamos conhecer melhor essas opções a seguir.

### Opção 2: Integração Facilitada

Nessa opção, o seu estabelecimento se integra com a funcionalidade de tokenização convencional da Cielo, que cria um token de bandeira. Dessa forma, os estabelecimentos sempre terão um único token para aquele cartão, mas a Cielo terá os tokens e criptogramas das bandeiras armazenados de forma segura e com uma integração única.

> **Bandeiras Disponíveis:** Visa

> **Produtos Elegíveis:** API E-commerce Cielo.

**Como obter essa funcionalidade:**

Entre em contato com a gente pelo e-mail: cieloecommerce@cielo.com.br e solicite a habilitação.

**Quais transações são elegíveis?**

Uma vez que hoje no mercado ainda existam cartões com BINs (primeiros 6 a 8 dígitos do cartão) não elegíveis ao token, não será possível atendermos 100% das transações Visa. Segundo a bandeira, aproximadamente 90% dos BINs Visa já são elegíveis.

**Essa solução tem custo adicional?**

A solução não tem custos adicionais para clientes API E-commerce Cielo, basta entrar em contato para solicitar a habilitação.

> **Saiba mais sobre a Integração Facilitada em [Tokenização de bandeira](https://developercielo.github.io/manual/cielo-ecommerce#tokeniza%C3%A7%C3%A3o-de-bandeira){:target="_blank"}**

### Opção 3: integração externa

Se o seu estabelecimento usa um gateway ou outro parceiro que já oferece a solução de token de bandeira, você pode realizar a integração para que a bandeira receba os dados do token.

> **Bandeiras Disponíveis:** Visa, Master e Elo.<br>
> *Para a integração externa, a Cielo está preparada para receber os dados de token das três bandeiras, mas é necessário avaliar se a bandeira oferece o produto*.

> **Produtos Elegíveis:** 
API E-commerce Cielo e API 1.5 (legado).

**Como obter essa funcionalidade?**

É necessário realizar a habilitação junto ao seu parceiro, e garantir que este esteja integrado com nossa API para enviar os campos necessários.

**Quais transações são elegíveis?**

Uma vez que hoje no mercado ainda existam cartões com BINs (primeiros 6 a 8 dígitos do cartão) não elegíveis ao token, não será possível atendermos 100% das transações Visa. Segundo a bandeira, aproximadamente 90% dos BINs Visa já são elegíveis

**Essa solução tem custo adicional?**

A solução não tem custos adicionais para clientes API E-commerce Cielo ou API 1.5 (legado), basta entrar em contato para solicitar a habilitação junto ao seu parceiro.

# Dúvidas?

Caso tenha dúvidas, envie um e-mail para: cieloecommerce@cielo.com.br

Ou, se preferir, entre em contato com a gente pela Central de Atendimento:

* Capitais e regiões metropolitanas: (11) 4002-5472
* Demais localidades: 0800 570 8472
