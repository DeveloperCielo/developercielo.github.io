---
layout: manual
title: POS-Virtual Braspag
description: Como utilizar o POS-Virtual Braspag
search: true
translated: true
categories: manual
tags:
  - Documentos Braspag
language_tabs:
  json: JSON
toc_footers:
  - <a href='/Habilitacao-meios-de-pagamento/'>Manual de Boleto e débito online</a>
  - <a href='/Checkout-Backoffice/'>Backoffice Cielo (Acesso lojista)</a>
  - <a href='/Checkout-FAQ/'>FAQ</a>
---

# Criar Grupos

É necessário criar pelo menos um grupo para que as vendas sejam realizadas no POS Virtual. O grupo determina quais são as pemissões que um determinado operador possui. 

Para criar um grupo, acesse Configurações > Grupos, e preencha corretamente os campos identificados abaixo:

![]({{ site.baseurl_root }}/images/braspag/criargrupos.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Nome|Nome do grupo|SIM|
|Permissões|selecione as permissões que este grupo poderá ter|SIM|

A lista de permissões são:

|Permissão|
|---------|
|Alterar data da próxima cobrança da recorrência|
|Alterar data fim da recorrência|
|Alterar dia da recorrência|
|Alterar periodicidade da recorrência|
|Alterar valor da recorrência|
|Ativar/Desativar pedido de recorrência|
|Cancelar Transação|
|Cancelar Transação via Relatório|
|Cancelar Transaç&ões De Todos Usuários|
|Capturar Transação|
|Capturar Transação via Relatório|
|Criar Transação|
|Estornar Transação via Relatório|
|Visualizar Pedidos de Recorrência|
|Visualizar suas Transaç&ões|
|Visualizar Transaç&ões Recorrentes|

# Criar Operadores

Através do usuário "gerente", é possível criar usuários operadores, que terão permissão para realizar novas vendas. 

Acesse Configurações > Operadores, e preencha corretamente o forumulário abaixo. Assim que os dados forem submetidos, um e-mail com as instruções será enviado no endereço cadastrado.

![]({{ site.baseurl_root }}/images/braspag/cadastraroperador.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Usuário|username a ser utilizado para acessar o POS|SIM|
|Nome|Nome do operador|SIM|
|E-mail|E-mail do operador|SIM|
|Grupo|Grupo de permissão que o operador pertence|SIM| 
|Lojas|Lojas para as quais o operador fará as vendas|SIM| 

# Realizar Venda

Para a criação de um novo pedido, o usuário deverá acessar a tela através do menu:  POS Virtual -> Realizar Venda

![]({{ site.baseurl_root }}/images/braspag/menucriarpedido.png)

## Passo a Passo 

A tela de criação de um novo pedido pelo POS Virtual é dividida em blocos com campos que são obrigatórios e não obrigatórios. 
 
Alguns blocos são opcionais de serem exibidos na tela, e para os mesmos ficarem disponíveis é necessário configurá-los no momento do setup do seu POS Virtual. 
 
A seguir iremos explicar passo a passo quais os blocos disponíveis com seus campos e a obrigatoriedade de cada campo referente ao bloco que pertence. 

### Dados do Pedido 

Neste passo é possível informar os dados do pedido. 
O campo de e-mail é opcional, e pode ser configurado para ser exibido na tela de criação de um novo pedido no momento do setup do seu POS Virtual. 
Abaixo a descrição e obrigatoriedade de cada campo. 

![]({{ site.baseurl_root }}/images/braspag/camposdadosdopedido.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Número do Pedido|Identificador do pedido da loja|SIM|
|Nome|Nome do cliente|SIM|
|CPF/CNPJ||CPF/CNPJ do cliente|SIM|
|E-mail||E-mail do cliente|NÃO| 

### Endereço de Entrega 

Neste passo é possível informar os dados do endereço de entrega do pedido. 
Os campos com os dados de endereço de entrega são opcionais, e podem ser configurados para serem exibidos na tela de criação de um novo pedido no momento do setup do seu POS Virtual.  
Abaixo a descrição e obrigatoriedade de cada campo.  

![]({{ site.baseurl_root }}/images/braspag/camposdadosendereco.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Rua|Nome da rua do endereço de entrega do cliente|NÃO|
|Número|Número do endereço de entrega do cliente|NÃO|
|Complemento|Complemento do endereço de entrega do cliente|NÃO|
|Cidade|Cidade do endereço de entrega do cliente|NÃO|
|Estado|Estado do endereço de entrega do cliente|NÃO|
|Bairro|Bairro do endereço de entrega do cliente|NÃO|
|CEP|CEP do endereço de entrega do cliente|NÃO|
|País|País do endereço de entrega do cliente|NÃO| 

### Dados da Recorrência 

Neste passo é possível informar os dados do pedido criando uma recorrência com umas das 3 opções: 

* Agendar para uma data futura 
* Cobrar agora e agendar as demais recorrências para o mesmo dia 
* Cobrar agora e agendar as demais recorrências para um dia diferente 
 
Os campos com os dados para criação de um pedido de recorrência são opcionais, e podem ser configurados para serem exibidos na tela de criação de um novo pedido no momento do setup do seu POS Virtual. 

Para cada opção de recorrência abaixo os campos têm comportamentos de obrigatoriedades 
diferentes. 

*Opção 1: Agendar para uma data futura*

Nesta opção uma recorrência será agendada de acordo com as informações fornecidas nos campos exibidos abaixo. Neste caso o cliente só será cobrado quando a primeira recorrência ocorrer, ou seja, no dia da data início informada.

O fim de uma recorrência dependerá da data fim informada, caso não seja informada nenhuma data, a mesma tem o perfil de uma recorrência “infinita”. 
 
![]({{ site.baseurl_root }}/images/braspag/dadosdarecorrencia1.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Intervalo|Intervalo da recorrência Obs.: por padrão Mensal|SIM|
|Data Início|Data para início da recorrência|SIM|
|Data Fim|Data para término da recorrência|NÃO|

*Opção 2: Cobrar agora e agendar as demais recorrências para o mesmo dia*

Nesta opção uma recorrência será criada e a primeira recorrência será cobrada de imediato.  As demais recorrências sempre irão ocorrer no mesmo dia da data de início da recorrência.

O fim de uma recorrência dependerá da data fim informada, caso não seja informada nenhuma data, a mesma tem o perfil de uma recorrência “infinita”. 

![]({{ site.baseurl_root }}/images/braspag/dadosdarecorrencia2.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Intervalo|Intervalo da recorrência Obs.: por padrão Mensal|SIM 
|Data Início|Data para início da recorrência Obs.: Não é possível alterar|SIM 
|Dia das demais recorrências|Dia em que as demais recorrências irão acontecer. Ex.: a próxima neste exemplo será em 02/10/2016. Obs.: Não é possível alterar|SIM|
|Data Fim|Data para término da recorrência|NÃO|

*Opção 3: Cobrar agora e agendar as demais recorrências para um dia diferente*

Nesta opção uma recorrência será criada e a primeira recorrência será cobrada de imediato.  As demais recorrências sempre irão ocorrer no dia definido para o campo “Dia das demais recorrências”. 

O fim de uma recorrência dependerá da data fim informada, caso não seja informada nenhuma data, a mesma tem o perfil de uma recorrência “infinita”. 

![]({{ site.baseurl_root }}/images/braspag/dadosdarecorrencia3.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Intervalo|Intervalo da recorrência Obs.: por padrão Mensal|SIM| 
|Data Início|Data para início da recorrência Obs.: Não é possível alterar|SIM|
|Dia das demais recorrências|Dia em que as demais recorrências irão acontecer. Ex.: a próxima poderá ser em 15/10/2016 por exemplo|SIM|
|Data Fim|Data para término da recorrência|NÃO|

### Endereço de Cobrança 

Neste passo é possível informar os dados do endereço de cobrança do pedido. 

Os campos com os dados de endereço de cobrança são opcionais, e podem ser configurados para serem exibidos na tela de criação de um novo pedido no momento do setup do seu POS Virtual. 

![]({{ site.baseurl_root }}/images/braspag/camposdadosenderecocobranca.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Rua|Nome da rua do endereço de cobrança do cliente|NÃO| 
|Número|Número do endereço de cobrança do cliente|NÃO|
|Complemento|Complemento do endereço de cobrança do cliente|NÃO|
|Cidade|Cidade do endereço de cobrança do cliente|NÃO|
|Estado |Estado do endereço de cobrança do cliente|NÃO|
|Bairro|Bairro do endereço de cobrança do cliente|NÃO|
|CEP|CEP do endereço de cobrança do cliente|NÃO|
|País|País do endereço de cobrança do cliente|NÃO|

### Dados de Pagamento 

Neste passo é possível informar os dados do pagamento do pedido. 

Para o campo meio de pagamento, as bandeiras estarão disponíveis de acordo com as opções de meios de pagamentos configurados para o seu POS Virtual. 

![]({{ site.baseurl_root }}/images/braspag/dadospagamento.png)

|Campo|Descrição|Obrigatório?|
|-----|---------|------------|
|Meio de Pagamento|Bandeira do cartão de crédito|SIM|
|Portador|Nome do portador do cartão de crédito|SIM|
|Número do cartão|Número do cartão de crédito do cliente|SIM|
|Código de Segurança|Código de segurança do cartão de crédito|SIM|
|Validade|Validade do cartão de crédito|SIM|
|Valor|Valor do pedido|SIM|
|Número de Parcelas|Quantidade de parcelas do pedido Obs.: Caso seja um pedido de recorrência, este campo não é obrigatório e o mesmo é ocultado na tela|SIM|

## Pagar ou Limpar 

Através do botão “Pagar”, o pedido será criado de acordo com os dados preenchidos nos campos citados acima. 

Caso o seu POS Virtual esteja configurado com a opção de “captura automática”, ao clicar em pagar, o pedido será autorizado e capturado imediatamente. Caso contrário, o pedido será somente autorizado e através da opção “capturar” em “Ações” na lista de pedidos, será possível realizar a captura do pedido.  

O botão “limpar”, limpa todos os campos da tela de criação de um novo pedido. 

![]({{ site.baseurl_root }}/images/braspag/btnpagarlimpar.png)

# Lista de pedidos

Conforme imagem abaixo, nesta sessão serão exibidos todos os pedidos realizados pelo operador: 

![]({{ site.baseurl_root }}/images/braspag/listapedidos.png)

Acima da lista de pedidos, existem duas legendas com informações dos totais. Estas representam o valor total pago e o valor total pendente de captura. 

* Total pago - valor total de pedidos capturados na lista de pedidos 
* Total pendente de captura - valor total de pedidos que foram apenas autorizados, ou seja, estão passíveis de serem capturados 

A coluna “Ações” possui links onde o usuário poderá tomar a ação desejada, que são: 

## Capturar 

Esta ação ficará disponível para o usuário caso o seu POS Virtual no momento do setup não desejar que a forma de pagamento seja com captura automática, ou seja, ao realizar o passo 7 clicando no botão “Pagar”, o pedido será autorizado apenas, necessitando da ação de clicar no link “Capturar” do usuário para mudar o status de “Não Pago” para “Pago”. Para esta opção, no momento do setup do seu POS Virtual, é possível escolher por captura parcial ou total.

### Captura Parcial

É a ação de capturar um determinado valor menor que o valor autorizado. Ex.:

* Transação autorizada de R$ 100,00 
* Captura parcial de R$ 50,00 

Caso a opção seja por captura parcial no setup do seu POS Virtual, o usuário ao clicar no link “Capturar”, a tela abaixo será exibida, deixando assim o usuário escolher o valor a ser capturado. 

![]({{ site.baseurl_root }}/images/braspag/capturar.png)

<aside class="notice)Obs.: A ação de capturar só poderá ocorrer uma única vez, então caso seja realizada uma captura parcial conforme exemplo acima, os outros R$ 50,00 restantes não poderá ser mais capturado, disponibilizando novamente esses R$ 50,00 no limite do cliente. </aside>

### Captura Total

É a ação de capturar o valor total autorizado. Ex.: 

* Transação autorizada de R$ 100,00 
* Captura total de R$ 100,00

<aside class="notice)Obs.: Caso no momento do setup do seu POS Virtual a configuração seja de pagamento com captura automática, o link “Capturar” não será exibido como uma das possíveis ações a serem tomadas na lista de pedidos, e ao realizar o passo 7 clicando no botão “Pagar”, o pedido será autorizado e capturado no mesmo instante. </aside>

## Cancelar 

Esta ação poderá ser tomada para o usuário cancelar um pedido, sendo assim o limite do cliente ficará disponível novamente em seu cartão. 

Será exibida uma tela de confirmação do cancelamento conforme imagem abaixo: 

![]({{ site.baseurl_root }}/images/braspag/cancelar.png)

## Imprimir 

Esta ação poderá ser tomada para o usuário imprimir um comprovante com os dados do pedido.

A impressão terá os detalhes do pedido conforme imagem abaixo: 

![]({{ site.baseurl_root }}/images/braspag/imprimir.png)

