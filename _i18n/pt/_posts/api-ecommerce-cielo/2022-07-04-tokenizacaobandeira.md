---
layout: tutorial
title: Tokenização de Bandeira – Mandate Visa
description: Tokenização de Bandeira – Regra Visa
search: true
translated: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - API Pagamento
  - Tokenização Bandeira
  - Checkout
  - Webservice 1.5
  - Link de Pagamento
---

# Tokenização de Bandeira – Regra Visa

**Do que se trata essa nova regra da bandeira Visa?** A bandeira Visa, a partir de agosto/22, irá começar a cobrar 0,05% sobre o valor de toda transação online que não for tokenizada, ou seja, sobre toda transação que for enviada para a bandeira com o cartão aberto (PAN) não tokenizado.

Abaixo explicamos um pouco do que é a tokenização de bandeira, benefícios, e quais opções a Cielo oferece para os clientes poderem se adequar ao mandate.

**O que é a tokenização de bandeira e quais os benefícios?** Algumas bandeiras possuem uma solução de tokenização que oferece o armazenamento de cartões em cofres na própria bandeira, de forma criptografada. Essa tokenização de bandeira tem o intuito de melhorar a segurança e qualidade das informações de cartão trafegadas, o
que acarreta possíveis aumentos na conversão de aprovação pelos bancos emissores. Veja todos os benefícios:

**Maior segurança:** Além da criação de um código (token ou DPAN) para substituir a informação do cartão, as bandeiras também emitem os criptogramas, que funcionam como uma senha ou assinatura da bandeira, única para aquele cartão naquele estabelecimento.

**Atualização automática de cartões:** Quando um novo cartão é emitido no lugar do cartão anterior, ou quando a data de expiração de um cartão muda, os bancos enviam essas informações para a base da bandeira, e a bandeira automaticamente atualiza os tokens com as novas informações. Ou seja, não tem necessidade de nenhuma ação por parte do estabelecimento.

**Maior conversão de aprovação:** Por conta da maior segurança com os tokens das bandeiras, os bancos emissores se sentem mais seguros em aprovar as transações.Além disso, com os dados de cartão atualizados automaticamente, mais vendas que poderiam ser negadas por dados de cartão desatualizados podem ser aprovadas

## Quais são as opções para adequação à regra?

A Cielo oferece as opções abaixo para que se preparem e evitem as cobranças da bandeira. Confira abaixo:

### Opção 1 – Tokenizador Cielo

Com o objetivo de reduzir esse impacto financeiro para nossos clientes, a Cielo desenvolveu uma solução interna que irá tokenizar todas as transações elegíveis automaticamente.

**Como funciona?** A Cielo irá tokenizar todas as transações elegíveis de forma transparente.Quando uma transação online for recebida em nossa API com o cartão aberto (PAN), a Cielo irá criar um token para aquele cartão. Dessa forma, a transação será recebida pela bandeira Visa já com o token, evitando a cobrança da taxa de 0,05%.

**O token ficará armazenado nos sistemas da Cielo?** Sim, a Cielo vai armazenar esse token de bandeira em seu sistema, para que na próxima transação não seja necessário gerar um novo token para o mesmo cartão.

**Quais transações são elegíveis?** Uma vez que hoje no mercado ainda existam cartões com BINs (primeiros 6 dígitos do cartão) não tokenizáveis, não será possível atendermos 100% das transações Visa. A Visa informou para a Cielo que aproximadamente 95% dos BINs Visa são elegíveis, e que haverá incidência de cobrança sobre os 5% não elegíveis. Sendo que, a Cielo irá repassar esses custos de operações com BINSs não elegíveis ao cliente.

**Produtos Elegíveis:** API E-commerce Cielo, API 1.5, Super Link e Checkout Cielo.

**Preciso fazer alguma modificação na integração ou solicitar a funcionalidade para a Cielo?** Não. A Cielo fará a ativação na data determinada, para você e todos os clientes, semcustos adicionais.

**Quando a Cielo irá ligar essa solução para todos os clientes?** Está previsto para que a comecemos a subir para uma parte dos clientes após a primeira quinzena de julho/22, e que até 31/07/2022 a Cielo já tenha ligado essa solução para todos os clientes da base. Essa solução funcionará por tempo indeterminado.

**Qual o impacto dessa solução para clientes que já utilizam a tokenização de bandeira?** Caso você já esteja usando a tokenização de bandeira, a Cielo irá verificar que a transação já foi tokenizada com a bandeira Visa, e não será necessário criar um novo token pra essa transação/cartão.

<aside class="notice">No momento da tokenização com a Visa, caso haja algum problema sistêmico ou timeout da bandeira ou do emissor, não sendo possível que a Cielo consiga tokenizar o cartão para seguir com a transação, a Cielo irá enviar a transação para autorização sem o token, para evitar que haja perda de vendas. Por conta disso, poderá existir a incidência do custo por parte da Visa sobre essa transação enviada sem o token, no mesmo formato ao aplicado para bins não elegíveis, sendo que, a Cielo irá repassar esse custo ao cliente, como comentado anteriormente.</aside>

Se preferir, você também pode optar por outras opções para fazer a gestão do token de bandeira por conta própria. Vamos conhecer melhor essas opções a seguir.

<aside class="warning"><strong>IMPORTANTE:</strong> As próximas duas opções se encontram disponíveis somente para clientes API E-commerce Cielo e API 1.5. Para clientes Super Link e Checkout, está disponível somente a primeira opção: Tokenizador Cielo.</aside>

### Opção 2 - Integração Facilitada

Nessa opção, o seu estabelecimento se integra com a funcionalidade de tokenização convencional da Cielo, que também cria um token de bandeira. Dessa forma, os estabelecimentos sempre terão um único token para aquele cartão, mas a Cielo terá os tokens e criptogramas das bandeiras armazenados de forma segura.

**Bandeiras Disponíveis:** Visa

**Produtos Elegíveis:** API E-commerce Cielo e API 1.5.

**Como obter essa funcionalidade:** Entre em contato com a gente pelo e-mail: cieloecommerce@cielo.com.br e solicite a habilitação.

**Quais transações são elegíveis?** Uma vez que hoje no mercado ainda existam cartões com BINs (primeiros 6 dígitos do cartão) não tokenizáveis, não será possível atendermos 100% das transações Visa. A Visa informou para a Cielo que aproximadamente 95% dos BINs Visa são elegíveis, e que haverá incidência de cobrança sobre os 5% não elegíveis. Portanto, a Cielo irá repassar esse custo ao cliente.

**Essa solução tem custo adicional?** A solução não tem custos adicionais para clientes API E-commerce Cielo ou API 1.5, basta entrar em contato para solicitar a habilitação.

> **Para saber mais sobre a Integração Facilitada** [Clique aqui](https://developercielo.github.io/manual/cielo-ecommerce#tokeniza%C3%A7%C3%A3o-de-
> bandeira)

### Opção 3 - Integração por fora

Se o seu estabelecimento usa um gateway ou outro parceiro que já oferece a solução de token de bandeira, você pode realizar a integração para que a bandeira receba os dados do token.

**Bandeiras Disponíveis:** Visa, Master e Elo (para a Integração por Fora, a Cielo está preparada para receber os dados de Token das três bandeiras, mas é necessário avaliar se a bandeira oferece o produto).

**Produtos Elegíveis:** API E-commerce Cielo e API 1.5.

**Como obter essa funcionalidade:** É necessário realizar a habilitação junto ao seu parceiro, e garantir que este esteja integrado com nossa API para enviar os campos necessários.

**Quais transações são elegíveis?** Uma vez que hoje no mercado ainda existam cartões com BINs (primeiros 6 dígitos do cartão) não tokenizáveis, não será possível atendermos 100% das transações Visa. A Visa informou para a Cielo que aproximadamente 95% dos BINs Visa são elegíveis, e que haverá incidência de cobrança sobre os 5% não elegíveis. Portanto, a Cielo irá repassar esse custo ao cliente.

**Essa solução tem custo adicional?** A solução não tem custos adicionais para clientes API E-commerce Cielo ou API 1.5, basta entrar em contato para solicitar a habilitação junto ao seu parceiro.

> **Para saber mais sobre a Integração por fora**, [Clique aqui](https://developercielo.github.io/manual/cielo-ecommerce#tokeniza%C3%A7%C3%A3o-de-bandeira)

# Dúvidas ?

Caso tenha dúvidas sobre as soluções de tokenização, envie um e-mail para: **cieloecommerce@cielo.com.br**

Ou, se preferir, entre em contato com a gente pela Central de atendimento:

Capitais e regiões metropolitanas: (11) 4002 9700
Demais localidades: 0800 570 1700
