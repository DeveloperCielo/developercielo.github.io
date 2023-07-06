---
layout: tutorial
title: Tutorial Checkout e Super Link
description: Tutorial do backoffice Checkout e Super Link e tutorial de criação do link
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Checkout
---

# Tutorial do Backoffice Checkout e Super Link

## Sobre este tutorial

Este tutorial tem como objetivo auxiliar o lojista na utilização dos produtos Checkout e Super Link backoffice do site Cielo. Neste tutorial você vai aprender a:

* Configurar a sua loja no Checkout ou Super Link, desde a aparência da sua página de pagamento do até os meios de pagamento que irá disponibilizar aos seus clientes e opções de captura;
* Criar links de pagamento;
* Visualizar o dashboard que apresenta o total de vendas e os gráficos do volume financeiro e volume transacional da sua loja;
* Visualizar as transações (pedidos) da sua loja;
* Acessar relatórios de gestão;
* Acessar o manual de desenvolvedores e FAQ.

> Qualquer cliente Checkout e Super Link pode realizar as configurações, acompanhar relatórios e criar links de pagamento pelo site Cielo, mesmo se já use esses serviços pelo app Cielo Gestão ou pelas integrações com as APIs.

> Para integrar com as APIs acesse o manual para desenvolvedores da [API do Checkout Cielo](https://developercielo.github.io/manual/checkout-cielo){:target="_blank"} ou da [API do Super Link](https://developercielo.github.io/manual/linkdepagamentos5){:target="_blank"}.

## Acessando o backoffice Checkout e Super Link

O acesso ao painel administrativo ou backoffice é feito dentro do site Cielo. O acesso pode ser feito por meio do CPF, N° do estabelecimento (EC) ou e-mail do seu cadastro de e-commerce na Cielo.

![Login Backoffice Cielo]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/1login.png)

Após o preenchimento do CPF/e-mail/N° do EC, o site irá solicitar a sua senha. Em caso de primeiro acesso, será necessário ter realizado o processo de Identidade Digital conforme as orientações que foram enviadas para seu e-mai

![Senha Backoffice Cielo]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/2-login.png)

> Após logar no site Cielo, localize o menu **E-commerce** e depois a sessão **Super Link** ou **Checkout Cielo**. No menu superior da página, certifique-se de que está selecionado o **número de estabelecimento (EC)** correto para o produto desejado. Caso esteja no EC incorreto, realize a troca para o EC de E-commerce correspondente ao produto que deseja utilizar.

![Vendas online]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/3-menu-ecommerce.png)

## Abas do Backoffice

O backoffice **Super Link** ou **Checkout Cielo** é um painel com seis abas distintas que permitem a configuração de sua loja e a utilização dos produtos contratados.

![Abas do Backoffice]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/4-9-12-30-backoffice.png)

Cada aba tem um objetivo diferente. A tabela abaixo demonstra o objetivo de cada tela.

| Aba                    | Descrição    |
| ---------------------- |------------------------------ |
| **Dashboard**          | Aba inicial que apresenta informações sobre o volume transacionado em sua loja online, o volume financeiro e alertas.                             |
| **Pedidos**            | Essa aba apresenta a lista de transações realizadas em seu estabelecimento. Aqui é possível pesquisar um determinado pedido ou transação.                                            |
| **Links de Pagamento** | É onde você poderá criar e salvar os links de pagamentos da sua loja. **Se a sua loja usa o Checkout Cielo, não é necessário usar a aba **Link de Pagamento**.|
| **Relatórios**         | Nesta aba é possível gerar seis tipos de relatórios: <br>Relatório financeiro<br>Detalhado de vendas<br>Listagem de clientes<br>Extrato de Cobrança<br>Relatório de Recorrência<br>Pedidos de Recorrência    |
| **Suporte**            | Links para os manuais de utilização do produto e Perguntas Frequetes (FAQ). |
| **Configurações**      | Aba onde você deve fazer as configurações da sua loja e dos seus dados cadastrais.|

### Dashboard

Aba inicial que apresenta informações sobre o volume transacionado em sua loja online, o volume financeiro e alertas.

* **Alertas**: indica se há pedidos a expirar na data atual;
* **Volume financeiro e transacional**: são gráficos interativos que demonstram em porcentagem e em valores totais a participação de cada meio de pagamento no total de transações realizadas e o volume total de acordo com o status das transações.

<aside class="warning">Por padrão, transações de crédito expiram em 15 dias. Após esse perido, elas não podem ser capturadas.</aside>

![DashBoard]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/5-dashboard.png)

### Pedidos

Esta aba apresenta a listagem de transações realizadas no Checkout Cielo ou no Super Link. Aqui é possível pesquisar um determinado pedido da seguinte forma:

* **Preenchendo um dos filtros possíveis**: data inicial e final, valor mínimo e máximo do pedido, data de vencimento do boleto, identificador da transação, número do pedido, número do boleto, CPF ou CNPJ do cliente ou nome do cliente;
* **Selecionando o meio de pagamento desejado**: você pode habilitar ou desabilitar o meio de pagamento para busca;
* **Selecionando o status do pagamento**: você pode, por exemplo, selecionar apenas as transações com status **Pago**.

O resultado da busca será uma lista de transações que pode ser exportada como uma planilha de Excel.

**Lista de Pedidos**

![Pedidos]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/6-busca-pedido.png)

**Detalhes dos Pedidos**

![Detalhes do Pedido]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/7a-pedido.png)

![Detalhes do Pedido]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/7b-pedido.png)

### Links de Pagamento

> Se você é cliente Checkout Cielo, pule para a aba [Relatórios](https://developercielo.github.io/tutorial/tutorial-checkout-link#relat%C3%B3rios).

Esta aba apresenta todos os links de pagamentos criados pela sua loja. Esses links podem ser utilizados de diferentes maneiras para proporcionar um maior volume de vendas.

> Para saber mais sobre links de pagamentos veja o [Tutorial Link de Pagamento](https://developercielo.github.io/tutorial/checkout-tutoriais#Tutorial-LinkdePagamentos)

No menu Link de Pagamentos, existem as áreas: **Cadastrar de Link de Pagamentos** e **Listar Links de Pagamentos Cadastrados**.

#### Listar Link de pagamentos Cadastrados

![Produtos cadastrados]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/8a-listar-links.png)

Clicando no **Título** ou **SKU** do produto, você irá visualizar a página de informações do link de pagamento criado, onde todas as características do link são informadas. Para editar um link, é necessário apenas apertar no ícone amarelo do lápis.

#### Criar de Link de Pagamento

Nessa página é possível gerar seus links de pagamento com base no tipo de produto. Você pode gerar links de pagamento pra cinco tipos de produtos diferentes: Material Físico, Digital, Serviço, Recorrência e Pagamentos:

* **Material físico**: produtos físicos que necessitam ser entregues pela loja, como roupas e brinquedos; essa opção permite a cobrança do valor de frete em um campo separado;
* **Digital**: bens digitais vendidos pela internet. Ex.: software, jogos, músicas etc.;
* **Serviço**: serviços a serem prestados. Ex.: serviços de delivery, projetos e orçamentos;
* **Recorrência**: transações que se repetem em um determinado intervalo de tempo. Ex.: assinaturas e mensalidades;
* **Pagamentos**: pagamentos unicos ou transferência de valores. Ex: quitação de dividas.

![Cadastrar Link de pagamentos]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/9-tipo-de-produto.png)

<aside class="notice">Material físico exige que um tipo de frete seja cadastrado.</aside>

<aside class="notice">O campo “SoftDescriptor” permite que a loja insira uma mensagem que será exibida na fatura do cartão de crédito do comprador. Essa funcionalidade é indicada para lojas que tem o nome fantasia muito diferente em relação a razão social.</aside>

<aside class="notice">A mensagem inclusa no campo “SoftDescriptor” deve ser limitada a 13 letras e não pode conter espaços.</aside>

Após gerar um link de pagamento, a seguinte tela será exibida:

![Detalhes do produto]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/13-31-sharelink.png)

O link de pagamento pode ser compartilhado de três formas:

1. Copiando a URL do link;
2. Implementando o botão **Pague com segurança** em uma página da sua loja;
3. Compartilhando o QR Code do link.

Confira no vídeo o passo a passo de como gerar um link:

[![Gerar Super Link]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/video-superlink.png)](https://www.youtube.com/watch?v=GWKYSdgSko8){:target="_blank"}

### Relatórios

Nesta aba é possível gerar os seguintes tipos de relatórios:

* Relatório financeiro;
* Relatório detalhado de vendas;
* Listagem de clientes;
* Extrato de Cobrança;
* Relatório de Recorrência;
* Pedidos de recorrência.

#### Relatório Financeiro

Esse relatório apresenta as vendas pagas em um período de até 90 dias separadas por meio de pagamento. Selecione o período e tipo de pagamento e clique em **Buscar**.

![Relatório financeiro]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/10-relfinanceiro.png)

#### Relatório detalhado de vendas

Esse relatório apresenta as informações detalhadas de cada venda (pedidos com status Pago), como o valor de cada pedido e os dados sobre o produto e o comprador.

<aside class="notice">Pedidos realizados no Modo de teste não são apresentados nesse relatório, mesmo que estejam com o status Pago.</aside>

![Relatório detalhado de vendas]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/11-relvendas.png)

#### Listagem de clientes

A listagem de clientes gera um arquivo Excel com os dados dos clientes que realizaram compras em sua loja.

Os dados apresentados são:

| Dados do Comprador                               | Dados de entrega ou cobrança |
| :----------------:                               | :-------------------------: |
|        Nome<br>E-mail<br>Telefone<br>CPF/CNPJ | Endereço<br>Número<br>Complemento<br>Bairro<br>Cidade<br>Estado<br>CEP           |

#### Extrato de cobrança

A lista do valor cobrado pelos serviços oferecidos pela Cielo será apresentada neste relatório, caso existe alguma cobrança à parte da taxa para seu estabelecimento. Todos os dados dos planos e custos transacionais serão apresentados aqui:

![Extrato de cobrança]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/19-extratocobranca.png)

#### Relatório de Recorrência

Nesse relatório é possível pesquisar o conjunto de recorrência e suas transações com base em seu ID ou por Status e Intervalo de recorrência.

![Relatório de Recorrências]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/35-relrecorrencia.png)

Ao clicar no **+** a tela de **Detalhes da Recorrência** vai abrir:

![Detalhes da Recorrência]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/16-recorrencia.png)

Os **Detalhes da Recorrência** informam o carrinho e o histórico de transações agendadas. Clique **+Detalhes** para consultar a tela de detalhes de Pedidos (ver aba [**Pedidos**]())

Em Relatório de Recorrência também é possível realizar três tipos de modificações na recorrência:

* **Desativar a Recorrência**: encerra o processo de cobrança automática. A desativação não pode ser desfeita;
* **Alterar o Intervalo**:  modifica o intervalo atual da recorrência para uma das outras opções (bimestral, semestral ou anual);
* **Alterar o dia de agendamento**: modifica o dia em que a transação de recorrência ocorrerá.

### Suporte

Aqui você encontra os links para os seguintes materiais de suporte: Manual do Desenvolvedor, Tutorial do Lojista, página de FAQ, e a página do portal de desenvolvedores.

![Dúvidas]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/14-suporte.png)

* **Manual do Desenvolvedor**: contém os procedimentos e diretrizes de integração da API do Checkout Cielo à sua loja virtual;
* **FAQ**: perguntas frequentes a respeito do Checkout Cielo. Contém informações sobre questões comerciais, técnicas, operacionais e sobre o modo de teste;
* **Tutorial do Lojista**: tem como objetivo auxiliar o lojista na utilização dos produtos Checkout e Super Link, incluindo gestão de vendas e configurações de loja na Cielo;
* **Portal de desenvolvedores**: direciona para a página principal do portal Desenvolvedores Cielo, que contém as documentações técnicas de integração de todos os produtos Cielo.

### Configurações da Loja

É onde você vai definir as diversas opções do Checkout e/ou Super Link Cielo. Essa área é dividida em quatro partes diferentes: **Exibição**, **Pagamentos**, **Antifraude** e **Frete de Correios & Serviços**.

#### Exibição

Aqui é possivel personalizar a sua página de pagamento com o logo da sua loja e escolhendo uma cor de fundo. A cor de fundo pode ser definida digitando um código RGB ou selecionando uma cor na caixa de opções.

![Configuração Exibição]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/20-configuracoes-loja-aparencia.png)

<aside class="notice">O logo da sua loja será exibido na página de pagamento do Checkout ou Super Link.</aside>

#### Pagamentos

Nesta tela é possível alterar as seguintes configurações:

* Ativar ou desativar o Modo Teste;
* Configurar o tipo e URLs de retorno, notificação e mudança de status;
* Valores mínimos de parcelas e descontos;
* Habilitar autenticação 3DS 2.0;
* Ativar ou desativar o aceite de cartões de crédito internacionais;
* Ativar ou desativar os meios de pagamento desejados.

![Configuração Exibição]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/21-configuracoes-loja-completo.png)

##### Modo de Teste Checkout Cielo

O modo de teste é uma ferramenta que permite testar a integração do Checkout ou Super Link. Com o modo teste, você pode criar páginas ou links de pagamento de teste e simular cenários para testar diferentes meios de pagamento.

O modo de teste pode ser ativado marcando a caixa de seleção **Modo de Teste**.

![Ativando Modo de teste]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/22-modo-teste-ativo.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do Backoffice e na página de pagamento do Checkout Cielo ou Super Link.

A tarja vermelha indica que a sua loja está operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

**Tela do backoffice com o modo de teste ativo**

![Modo de teste backoffice]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/22-modo-teste-ativo.png)

**Tela transacional com o modo de teste ativo**

![Modo Teste Ativo Tarja Vermelha]({{ site.baseurl_root }}/images/checkout/superlink/superlink-modoteste-tarjavermelha.png)

##### Tipos de URLs

* **URL de Retorno**: ao finalizar a transação o comprador poderá ser redirecionado para uma página definida pela loja. Ao clicar no botão **Voltar** na tela de comprovante de vendas, o comprador será direcionando para a URL de retorno previamente cadastrada no BackOffice;

* **URL de Notificação**: é a **notificação de finalização da transação**. É enviada após o comprador clicar em **Finalizar**, gerando a transação. Essa notificação é enviada apenas no momento que a transação é finalizada, independentemente se houve alteração do status, ou seja, não significa que a transação foi paga;

  > A URL de notificação é um webhook que pode receber uma notificação via POST (a loja recebe a notificação de forma passiva) ou via JSON (a loja recebe a notificação para realizar uma consulta).

* **URL de Mudança de Status**: é a **notificação de mudança de status**. É enviada quando há mudança de status na transação. O status pode ser alterado de “Pendente” para “Pago”, “Cancelada” ou “Não Finalizada”, entre outros. Veja a lista completa de status na tabela [Payment_status](). Esse tipo de notificação não contém dados do carrinho, apenas dados de identificação do pedido.

> A URL de mudança de status é um webhook que pode receber uma notificação via POST.

![URLs de Notificação]({{ site.baseurl_root }}/images/checkout/superlink/superlink-urls-notificacao.png)

Na tela de pedidos, dentro de cada transação, há a opção de reenvio da notificação de mudança de status. Basta clicar nos botões azuis, indicados na imagem:

![Detalhes do pedido]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/37-detalhes-pedido.jpg)

> Para mais informações sobre as notificações visite o manual de integração da [API do Checkout](https://developercielo.github.io/manual/checkout-cielo#notifica%C3%A7%C3%B5es-de-pagamento){:target="_blank"} ou da [API do Super Link](https://developercielo.github.io/manual/linkdepagamentos5#notifica%C3%A7%C3%B5es-da-transa%C3%A7%C3%A3o){:target="_blank"}.

##### Valores Mínimos e Descontos

Você pode configurar quatro tipos de valores mínimos e descontos por meios de pagamento:

[Valor minimo parcela]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/38-valor-minimo-parcela.png)

| Tipo     | Descrição   |
| ---------| ----------- |
| **Valor mínimo da parcela**    | Caso o valor da parcela da compra seja inferior ao minimo, a página de pagamento exibirá apenas a parcela superior ao mínimo <br> **Ex.:** se a parcela mínima for de R$5,00, em uma compra de R$10,00 não será exibida a opção de parcelamento em três vezes, apenas em duas vezes. |
| **Valor mínimo para pagamento com boleto**  | Valor mínimo para que a opção de pagamento em boleto seja exibida.     |
| **Desconto para pagamento com boleto**   | Define um valor em porcentagem para desconto caso o boleto seja o meio de pagamento escolhido.  |

<aside class="notice">O meio de pagamento débito online foi descontinuado.</aside>

<aside class="warning">Se o valor da compra for inferior ao valor mínimo da parcela, caso não haja outro meio de pagamento disponível, não haverá opção para o comprador, obrigando-o a retornar à loja e criar um carrinho com o valor acima do mínimo. Para evitar essa situação sugerimos:<br /><br><ul><li>Caso sua loja não tenha outros meios de pagamento, informe ao comprador sobre o valor mínimo do boleto.<br /><br></li><li>Adquira outros meios de pagamento, como cartões de crédito.</li></ul></aside>

<aside class="warning">O valor mínimo do boleto não funciona em caso de descontos definidos pela loja. Caso a loja defina o valor mínimo de boleto como R$100,00 e um desconto de 10%, será gerado um boleto de R$90,00 (inferior ao mínimo).</aside>

**Sobre o valor mínimo:**

**Exemplo**: caso o valor mínimo de parcelamento seja de R$10,00, uma compra de R$100,00 poderá ser parcelada em no máximo 10 vezes, mesmo que na configuração da loja esteja habilitado o parcelamento em 12 vezes.

> * O número máximo de parcelamento da loja depende do limite definido no cadastro do seu estabelecimento na Cielo. Por padrão toda afiliação é liberada com limite de 12 parcelas;
> * O valor mínimo de parcelamento é obrigatoriamente R$5,00.

##### Autenticação

Todas as transações de cartão de débito são automaticamente submetidas à autenticação.

Já para as transações de crédito, você pode habilitar a autenticação, se desejar, em **Habilitar autenticação 3DS 2.0 para transações de cartão de crédito**.

> * A autenticação de cartões de crédito ocorre somente para cartões Visa, Mastercard e Elo.

<aside class="warning"><b>Sobre Autenticação de transações:</b> O checkbox obriga todos os cartões Visa, Master e Elo a serem direcionados ao ambiente bancário do 3DS para validação de segurança.</aside>

##### Meios de pagamentos ativos

Selecione os meios de pagamento que deseja disponibilizar no momento do pagamento. Para desabilitar um meio de pagamento, basta desmarcar a caixa de seleção. Lembre-se de sempre salvar após alterar alguma configuração.

![Meios de Pagamento Ativos]({{ site.baseurl_root }}/images/checkout/superlink/superlink-meios-de-pagamento.png)

O parcelamento é definido por bandeira de cartão. O número de parcelas máximas disponibilizadas para cada cartão é definida pela loja.

O Checkout e o Super Link Cielo permitem parcelamento em até 12 vezes sem juros. O número de parcelas exibidas no transacional depende do valor mínimo para parcelamento configurado pela loja.

#### Antifraude e Captura Automática

Aqui é possivel definir a automação dos processos de captura e cancelamento de pedidos com base no resultado da análise de fraude.

* **Sempre fazer Captura Automática**: todas as transações de cartão serão capturadas automaticamente após a autorização do banco, incluindo as com resultado de baixo e médio risco do Antifraude. Não inclui as transações de alto risco, que serão canceladas automaticamente;
* **Nunca fazer captura automática**: a loja vai precisar fazer a captura manual, incluindo transações autenticadas pelo 3ds;
* **Somente fazer captura automática das transações de baixo risco do Antifraude**: todas as transações de cartão que foram autorizadas pelo banco e que o Antifraude resultou em Baixo Risco serão capturadas automaticamente. As transações classificadas como médio risco ficarão pendentes de captura manual pelo lojista, incluindo transações autenticadas pelo 3ds. As transações de alto risco serão canceladas automaticamente.

![Configuração de captura e Antifraude]({{ site.baseurl_root }}/images/checkout/superlink/superlink-captura-e-antifraude.png)

##### Tabela de status do Antifraude

| Status Antifraude | Substatus                | Descrição                                                                       |
| ----------------- | ------------------------ | ------------------------------------------------------------------------------- |
| Baixo Risco       | Baixo Risco              | Baixo risco de ser uma transação fraudulenta                                    |
| Médio Risco       | Médio Risco              | Médio risco de ser uma transação fraudulenta                                    |
| Alto Risco         | Alto Risco | Alto risco de ser uma transação fraudulenta.|
| Não finalizado    | Não finalizado           | Não foi possível finalizar a consulta                                           |
| N/A               | Autenticado              | Transações autenticadas pelo banco                                              |
| N/A               | Não aplicável            | Meio de pagamento não analisável como cartões de débito, boleto e débito online |
| N/A               | Transação de recorrência | Transação de crédito seja posterior a transação de agendamento                  |
| N/A               | Transação negada         | Venda a crédito foi negada                                                      |

Você pode visualizar o status do antifraude acessando o detalhe da compra, na aba Pedidos e clicando em **+**.

![Status Antifraude]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/7a-pedido.png)

#### Frete de Correios & Serviços

Nesta área você configura as opções de frete disponíveis em sua Loja. Na seção Informações sobre Frete há uma explicação mais detalhada sobre os tipos de fretes disponíveis no Checkout e no Super Link.

Na área de fretes de Correios há uma calculadora de frete para consultas (essa calculadora dá o valor de frete de cada tipo de frete cadastrado para um determinado peso e localidade).

![Frete Correios]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/28-frete.png)

# Tutorial do Super Link

## Criando o Link de Pagamento

Confira no vídeo a seguir o passo a passo de como gerar um link de pagamento pelo site Cielo:

[![Gerar Super Link]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/video-superlink.png)](https://www.youtube.com/watch?v=GWKYSdgSko8){:target="_blank"}

**Compartilhando de um link de pagamento:**

Você compartilhar o link de pagamento de três formas:

1. Copiando a URL do link;
2. Implementando o botão **Pague com segurança** em uma página da sua loja;
3. Compartilhando o QR Code do link.

|Exemplo|Método| Descrição|
|---|---|---|
| ![Botão]({{ site.baseurl_root }}/images/checkout/botao.png)   | **Botão**  | É um código HTML que ao ser colado em um site, vai direcionar o comprador à pagina de pagamento do link - ideal para uso em *hotsites* ou *e-mail marketing* |
| ![QRCODE]({{ site.baseurl_root }}/images/checkout/qrcode.png) | **QR Code** | Código interpretável por smartphones e tablets - ideal para uso em *marketing impresso* ou *digital*  |
| `"https://cielolink.com.br/3oZmZki`                                       |  **Link**  | É um link compartilhável, ideal para uso em **redes sociais** ou **aplicativos de mensagens**    |

O link de pagamento pode ser utilizado em diferentes cenários, como por exemplo:

* Realizar vendas online sem precisar de um site, usando apenas as redes sociais e aplicativos de mensagens, entre outros;
* Associar uma compra rápida direta a um produto como uma promoção numa homepage pulando a etapa do carrinho;
* Enviar um e-mail marketing, ou uma cobrança via e-mail;
* Adicionar o botão (HTML) referente ao produto/serviço a ser comprado/pago;
* Realizar envio de pagamentos por aplicativos mobile;
* Sempre que você desejar disponibilizar uma venda rápida.

## Características do link de pagamento

Cada link de pagamento possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrados. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter à compra na página de pagamento, pois o Super Link vai buscar todos os dados do produto no sistema.

| Característica                   | Explicação   |
| -------------------------------- | ------------ |
| **Específico**                   | Cada link gerado serve somente para um determinado produto ou valor definidos no momento de criação do link de pagamento.<br>**Exemplo**: Você vai criar criar um link para vender uma camisa; se o comprador desejar duas camisas, ele precisará pagar o link duas vezes, ou você deverá criar um link com o valor de duas camisas. |
| **Número do Pedido do Super Link** | O link não permite o cadastro do número de pedido loja. A Cielo vai criar a página de pagamento e gerar um número de pedido (um `GUID`) único. A loja vai receber esse número de pedido após o pagamento ser efetuado no link.|
| **Criação de pedidos**           | Ao gerar um link, você pode definir uma quantidade limite de pagamentos aceitos nesse link. Por ezemplo, se definir o limite de três pagamentos, só serão aceitos três pagamentos/pedidos nesse link. Se não preencher um número, o link aceitará pagamentos indefinidamente."   |

## Criando um link de pagamento

Você pode criar um link de pagamento por diferentes canais: site Cielo, App Cielo Gestão ou API do Super Link. Nesse material iremos falar da criação de link via [site Cielo](https://www.cielo.com.br/){:target="_blank"}.

Você pode gerar links de pagamento pra cinco tipos de produtos diferentes:

* **Material físico**: produtos físicos que necessitam ser entregues pela loja, como roupas e brinquedos; essa opção permite a cobrança do valor de frete em um campo separado;
* **Digital**: bens digitais vendidos pela internet. Ex.: software, jogos, músicas etc.;
* **Serviço**: serviços a serem prestados. Ex.: serviços de delivery, projetos e orçamentos;
* **Recorrência**: transações que se repetem em um determinado intervalo de tempo. Ex.: assinaturas e mensalidades;
* **Pagamentos**: pagamentos unicos ou transferência de valores. Ex: quitação de dividas.

![Cadastrar Link de pagamentos]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/9-tipo-de-produto.png)

**Confira a tela de geração de um link no site Cielo**

![criar Link de pagamentos]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/4-9-12-30-backoffice.png)

**Após preencher os campos e gerar um link, aparecerá uma tela de resumo com as informações, assim como com o código para usar o botão ou o QR Code do link.**

![Compartilhar Link]({{ site.baseurl_root }}/images/checkout/13-31-sharelink.png)

Abaixo a listagem de itens que devem ser cadastrados para a criação do link:

| Campos            | Descrição  | Obrigatório |
| ----------------- | ---------- | ----------- |
| `Tipo do Produto` | Indique se está vendendo material físico, digital, serviço, recorrência ou pagamento. A opção de frete só será apresentada no tipo *material físico*.     | Sim         |
| `SKU`             | Código de identificação do produto   |  Não         |
| `Nome do produto`          | Nome do Produto   | Sim         |
| `Descrição`       | Descrição do Produto  | 1            | 255          | Sim         |
| `Preço`           | Valor total do pedido **em reais**. |  Sim         |
| `Frete`           | Escolher dentre uma das opções de frete (*Correios, Frete Fixo* ou *Frete Grátis*).  | Condicional*         |
| `CEP de Origem`   | Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o CEP de onde vai partir a mercadoria para fins de cálculo de frete. | Condicional*         |
| `Peso(kg)`        | Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o peso do produto em kg para fins de cálculo de frete                 | Condicional*         |
| `Valor do Frete`  | Esse campo só aparece para o frete tipo Frete Fixo, e deve ser preenchido com o valor que o lojista especificar para seus produtos.   | Condicional*         |
| `Nome do frete utilizado` | Esse campo só aparece para Tipo Produto igual a Material Físico e Tipo de Frete igual a Frete Fixo.    | Condicional*         |
| `Quantidade`      | Define a quantidade maxima de pedidos que o Botão pode gerar. Se não definido, o botão poderá gerar um numero infinito de pedidos      | Não         |
|`Data de expiração`|Data e hora limite pro link funcionar e aceitar pagamentos (escolha a data e hora no calendário)| Não|
|`Soft Descriptor`|Personalização do nome da loja que aparece na fatura (máximo de 13 caracteres)| Não|
|`Máximo de parcelas`| Definição de um número máximo de parcelas para o link (até 12). A opção padrão reflete o que está na configuração da loja no Super Link/Checkout| Não|
|`Intervalo da recorrência`|Quando o tipo for recorrente. É o intervalo de tempo pra cobrança do valor de forma automática. As opções são mensal, bimestral, trimestral, semestral, anual.|Condicional**|
|`Data final da recorrência`|Quando o tipo for recorrente. É a data limite para cobrança automática da recorrência.|Condicional**|

*Envio obrigatório caso o tipo de produto seja **material físico**.
**Envio obrigatório caso a transação seja recorrente.

**Adicionando o botão na sua página, você deve copiar o código HTML do botão criado e inclui-lo no HTML de seu site, conforme o exemplo:**

```xml
- **Botão**: o Super Link irá criar um código HTML como o abaixo: 

<form method='post' action='https://cieloecommerce.cielo.com.br/transactional/Checkout/BuyNow' target='blank'> 

    <input type='hidden' name='id' value=00000000-0000-0000-000000000000/><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br /BackOffice/Content{{ site.baseurl_root }}/images/botao_comprar_3.jpg' /> 

</form> 

```

**Exemplo de um botão funcional:** 

<form method='post' action='https://cieloecommerce.cielo.com.br/transactionalvnext/order/buynow' target='blank'><input type='hidden' name='id' value='937874c6-a4d7-477e-9272-a4cb8b0c5f79' /><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br/backoffice/Content/img/buttons/button-5-1.png'/></form>
```

<aside class="notice">O código deve ser inserido dentro da área adequada no seu HTML.</aside>

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter a compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do Backoffice Cielo Checkout, e valerão os dados do cadastro.
