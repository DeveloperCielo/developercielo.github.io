---
layout: faq
title: Perguntas frequentes do Checkout Cielo
description: Respostas para perguntas frequentes feitas pelos desenvolvedores durante a integração com o Checkout Cielo
search: true
categories: faq
tags:
  - Checkout Cielo
toc_footers:
  - <a href='/Checkout-Cielo/'>Integração com Checkout Cielo</a>
  - <a href='/Checkout-Backoffice/'>Backoffice Cielo</a>
---

# Qual a diferença entre o tipo de Integração usada no CHECKOUT CIELO?

O CHECKOUT CIELO utiliza integração via POST e é possível configurá-la de duas formas:

* **Integração via Carrinho de Compras** - usada quando houver um “carrinho de compras” a ser enviado, ou seja, no caso do consumidor navegar pelo site e escolher 1 ou mais produtos para adicionar a um carrinho e depois finalizar a transação.
* **Integração via Botão** - usada sempre que não houver um “carrinho de compras” em sua loja ou quando se deseja associar uma compra rápida/direta a um produto. Cada produto cadastrado gera um “botão de compra” único que permite personalização. Exemplo: um hotsite uma promoção que leva o comprador diretamente para a etapa de pagamento (página do Checkout Cielo).

# Como eu crio o Botão?

O Botão é criado no momento de inclusão de um novo produto. Para isso, acesse o [Backoffice Checkout Cielo](/Checkout-Backoffice/), no menu Produtos/Cadastrar Produtos.

# Quais informações eu preciso para montar o POST?

Os dados a serem preenchidos no POST são:

* Dados do Pedido
* Carrinho de Compras
* Dados de Frete
* Dados do Consumidor

Todas as informações para auxiliar nesse processo, encontram-se no Manual de Integração Checkout Cielo.

# Posso enviar um e-mail marketing como forma de cobrança?

Sim, por meio da Integração via Botão é possível enviar um e-mail marketing, ou uma cobrança por e-mail, adicionando ao HTML do e-mail, o botão referente ao produto/serviço ofertado.

# Para que serve a URL de retorno?

Ao finalizar a compra, o consumidor tem a opção de voltar ao site do lojista ou ser direcionado para a página que o lojista desejar.  A função dessas URL é conduzir automaticamente o consumidor para a página definida nesta opção.

# Para que serve a URL de Notificação?

Ao finalizar uma transação, é enviado um POST com todos os dados da venda para a URL de Notificação, previamente cadastrada no BackOffice. O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houver alteração do status da transação.

Dessa maneira os dados do pedido ficam atualizados no [Backoffice Checkout Cielo](/Checkout-Backoffice/) e também no backoffice da loja/plataforma.

# Para que serve a URL de Mudança de Status?

Ela define para onde será enviado o POST indicando a alteração de status de uma transação, ou seja, quando um pedido tiver seu status alterado, será enviando um POST para a URL de Mudança de Status, previamente cadastrada no BackOffice. O POST de mudança de status não contém dados do carrinho, apenas dados de identificação do pedido.

# Onde é feito o cadastro dessas URLs?

No [Backoffice Checkout Cielo](/Checkout-Backoffice/), no menu Configurações/Configurações da loja.

# Qual a diferença entre o  Erro OPSSS antes e depois da exibição da tela do Checkout Cielo?

* **Antes da exibição da tela de Checkout** - significa que houve algum dado errado no envio da transação. Dados obrigatórios podem estar faltando ou o formato é invalido. Aqui o lojista sempre vai receber um e-mail informando o motivo do erro.
    * Para esses, é exibido um código (os mesmos dos manuais) dentro do pedido no Backoffice Checkout Cielo.
* **Depois da Exibição da tela de Checkout (quando a venda é finalizada)** - significa que há algum impedimento de cadastro que limita a venda. Coisas como afiliação bloqueada, erro nos dados salvos no cadastro ou até problemas no próprio checkout.

# Qual a relação entre os tipos de produtos e os tipos de fretes?

O tipo de produto a ser vendido no Checkout Cielo influencia diretamente o tipo de frete e a informação a ser enviada para o processamento da transação.

O tipo de frete a ser utilizado dependerá do tipo de produto que a sua loja comercializa. No Checkout Cielo você pode comercializar 3 tipos de produtos:

* Material Físico
* Bens Digitais
* Serviços

Os tipos de frete que podem ser usados são:

* Correios
* Frete Fixo
* Frete Grátis
* Sem Frete (Retirada em mãos)
* Sem cobrança de frete (usado para Bens Digitais ou Serviços)

Produtos (categoria Material Físico) necessitam da habilitação de algum tipo de frete para serem enviados. Nesse caso, é obrigatória a inclusão de informações como do peso do produto (CART_1_WEIGHT), CEP de origem (CART_1_ZIPCODE) e CEP de entrega (SHIPPING_ZIPCODE), para o cálculo do frete.

As categorias “Bens digitais” ou “Serviços” não necessitam desse tipo de informação.

Para compreender a diferença entre os parâmetros do POST em relação a frete e tipos de produtos, compare os exemplos de post abaixo. Para mais informações, acesse o [Manual de Integração Checkout Cielo](/Checkout-Cielo/).

## Parâmetros obrigatórios

|Material físico|Bens Digitais / Serviço|
|--------|---------------|
|`MERCHANT_ID`|`MERCHANT_ID`|
|`ORDER_NUMBER`|`ORDER_NUMBER`|
|`SHIPPING_TYPE`: 1, 2 ou 3|`SHIPPING_TYPE`: 5|
|`SOFT_DESCRIPTOR`|SOFT_DESCRIPTOR|
|`CART_1_NAME`|`CART_1_NAME`|
|`CART_1_UNITPRICE`|`CART_1_UNITPRICE`|
|`CART_1_QUANTITY`|`CART_1_QUANTITY`|
|`CART_1_WEIGHT`|`CART_1_TYPE`: 2 ou 3 **(Obrigatorio)**|
|`CART_1_ZIPCODE`|`CART_1_TYPE`: 1 **(Obrigatorio)**|
|`CUSTOMER_NAME`|`CUSTOMER_IDENTITY`|
|`SHIPPING_1_NAME`|`CUSTOMER_EMAIL`|
|`SHIPPING_1_PRICE`|`CUSTOMER_PHONE`|

# O que é o modo de teste CHECKOUT CIELO?

É um ambiente de testes, onde é possível simular todas as ações sem precisar alterar sua integração. É um ambiente de teste onde é possível simular vendas e outras ações de teste (como cancelamentos, capturas e chargebacks).

# Como é ativado o modo de teste Checkout Cielo?

No Backoffice Cielo Checkout, aba Configurações Pagamentos Modo de Teste é possível habilitar ou desabilitado o Modo de teste. Quando esse modo estiver ativo, uma grande faixa vermelha será exibida na parte superior de todas as telas do Checkout Cielo (Backoffice Checkout e Tela de pagamento).

No Modo de teste o lojista ou desenvolvedor pode realizar testes de transações e de integração.

# O modo de teste tem algum custo adicional?

Não, para utiliza-lo não há taxas. O modo de teste é disponibilizado no momento da liberação da sua conta.
