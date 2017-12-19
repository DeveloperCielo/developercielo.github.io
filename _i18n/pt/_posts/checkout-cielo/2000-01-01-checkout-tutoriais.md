---
layout: tutorial
title: Tutoriais
description:
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Checkout Cielo
---

# Tutorial - Backoffice

O objetivo deste documento é orientar o lojista sobre como acessar a manipular o Backoffice do Checkout Cielo.

## Acessando o Backoffice

Para acessar o Backoffice do Checkout Cielo, é necessário que o lojista **[realize login no Site Cielo](https://www.cielo.com.br/minha-conta)**, inserindo sua Afiliação (Nº de estabelecimento) e Usuário:

![Login Backoffice Cielo]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-login.png)

Em seguida é necessário incluir sua Senha:

![Senha Backoffice Cielo]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-login-senha.png)

Na área de “Vendas Online” basta clicar em Checkout Cielo.

![Vendas online]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-vendas-online.png)

Caso o site principal da Cielo não esteja disponível, basta acessar a URL [https://cieloecommerce.cielo.com.br/backoffice](https://cieloecommerce.cielo.com.br/backoffice) e inserir seu e-mail de cadastro e senha.

[!Checkout Cielo]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-cielo.png)

## Abas do Backoffice Checkout Cielo

O Backoffice é formado por 6 Abas diferentes de administração do Checkout Cielo. Elas são:

| Aba                    | Descrição                                                                                                                                                                                        |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **DashBoard**          | Pagina inicial onde são apresentadas informações sobre a sua conta e sobre o volume e tipo de transações realizadas em sua loja.                                                                 |
| **Pedidos**            | Nessa pagina fica contida toda a listagem de transações realizadas no Checkout Cielo. Aqui é possivel pesquisar um determinado pedido ou transação.                                              |
| **Link de Pagamentos** | Nessa pagina são listados todos os Botões/Links cadastrados no Checkout Cielo                                                                                                                    |
| **Relatórios**         | Nesta pagina é possível gerar 05 tipos de relatórios: <br>“Relatório financeiro"<br>“Detalhado de vendas”<br>“Listagem de clientes”<br>* “Extrato de Cobrança”<br>“Relatório de Recorrência”|
| **Manuais**            | Nesta página constam os manuais do Checkout Cielo, assim como a pagina de FAQ e de “Duvidas”, onde o lojista pode entrar em contato com a equipe de suporte Checkout Cielo.                      |
| **Configurações**      | Pagina onde é possivel fazer alterações nas configurações da Loja , dos seus dados cadastrais e Alterar sua Senha.                                                                               |

## Aba DashBoard

Aba inicial onde são apresentadas informações sobre a sua conta e sobre o volume e tipo de transações que sua loja vem realizando via o Checkout Cielo.

### Tipos de informações

Nessa tela você encontra 2 tipos de informações.

* **Alertas** – Indica se há pedidos a expirar na data presente.
* **Volume financeiro e transacional** - São gráficos interativos que demonstram em porcentagem e em valores totais, qual a participação de cada meio de pagamento no total de transações realizadas e o volume total de acordo com o status das transações.

<aside class="warning">Por padrão, transações de crédito expiram em 15 dias. Após esse perido, elas não podem ser capturadas.</aside>

![DashBoard]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-dashboard.png)

## Aba Pedidos

Nessa aba fica contida toda a listagem de transações realizadas no Checkout Cielo. Aqui é possivel pesquisar um determinado pedido, via um determinado parametro de busca nos campos ou desmarcando os “checkbox” dos “Meios de pagamento” ou “Status de pagamento” e apertando o botão “Buscar”.
O resultado da pesquisa é exposto em forma de uma listagem de transações que pode ser exportada como uma planilha de Excel.

Listagem de Pedidos

![Pedidos]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-pedidos.png)

Detalhes dos Pedidos

![Detalhes do Pedido]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-pedidos-detalhes.png)

## Aba Link de Pagamento

Nesta aba são apresentados todos os links de pagamentos criados. Esses links podem ser utilizados de diferentes maneiras para proporcionar um maior volume de vendas.

Para saber mais sobre links de pagamentos veja:

* **[Integração via Botão/Link de pagamentos](https://developercielo.github.io/manual/checkout-cielo#integração-por-botão)**
* **[Tutorial - Link de pagamentos](https://developercielo.github.io/tutorial/checkout-tutoriais#Tutorial-LinkdePagamentos)**

No menu Link de Pagamentos, existem as áreas: **Cadastrar de Link de Pagamentos** e **Listar Links de Pagamentos Cadastrados**.

### Listar Link de pagamentos Cadastrados

![Produtos cadastrados]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-listar-link-de-pagamentos.png)

Clicando no Titulo ou SKU do produto, você será redirecionado a página de informações de Produto, onde todas as características do produto são informadas e onde você pode definir o padrão do Botão (caso a sua integração seja com base no Botão Checkout Cielo) a ser usado na venda desse produto.

A integração via Botão é melhor explicada no item **[Integração via Botão/Link de pagamentos](https://developercielo.github.io/manual/checkout-cielo#integração-por-botão)**.

### Cadastrar de Link de Pagamentos

Nessa pagina é possível cadastrar seus produtos com base no tipo de produto em si. Cada produto cadastrado vai gerar um Link de pagamentos diferente
O Checkout Cielo considera 5 tipos de produtos: Material Físico, Digital, Serviço, Recorrência e Pagamentos.

* **Material Fisico** – Produtos Fisicos que necessitam ser enviados pelos lojistas. Ex: Roupas, Brinquedos, etc.
* **Digital** –  Bens digitais vendidos pela internet. Ex: Software, Jogos, Musicas, etc.
* **Serviço** – Serviços a serem prestados. Ex:  Entrega delivery, projetos e orçamentos.
* **Recorrência** - Transações que se repetem em um determinado intervalo de tempo EX: Assinaturas, mensalidades etc
* **Pagamentos** - Pagamentos unicos ou transferência de valores Ex: quitação de dividas etc

![Cadastrar Link de pagamentos]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-cadastrar-link-de-pagamentos.png)

<aside class="notice">Material Físico exige que um tipo de frete seja cadastrado. </aside>

<aside class="notice">O campo “SoftDescriptor” permite que lojista insira uma mensagem que será exibida na fatura do cartão de crédito do comprador. Essa funcionalidade é indicada para lojas que tem o nome fantasia muito diferente em relação a Razão social.</aside>

<aside class="notice">A mensagem inclusa no campo “SoftDescriptor” deve ser limitada a *13 letras *e não pode conter espaços.</aside>

<aside class="notice">O cadastro de produtos não é obrigatório para lojistas que utilizem a integração via carrinho</aside>

Após realizar o cadastro do produto/Link de pagamento, a seguinte loja será exibida:

![Detalhes do produto]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-detalhes-link-de-pagamentos.png)

O Link de pagamentos é exibido de **3 maneiras:**

* **Botão** - Será criado um código HTML como o abaixo:

``` html
<form method='post' action='https://cieloecommerce.cielo.com.br/transactional/Checkout/BuyNow' target='blank'>
    <input type='hidden' name='id' value=00000000-0000-0000-000000000000/><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br /BackOffice/Content{{ site.baseurl_root }}/images/botao_comprar_3.jpg' />
</form>
```

**Exemplo de um botão Funcional:**

<form method='post' action='https://cieloecommerce.cielo.com.br/transactionalvnext/order/buynow' target='blank'><input type='hidden' name='id' value='937874c6-a4d7-477e-9272-a4cb8b0c5f79' /><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br/backoffice/Content/img/buttons/button-5-1.png'/></form>

* **QR CODE E LINK** - O link e o QRCODE tem o mesmo comportamento do botão, levando a mesma tela transacional.

|QR Code|Link|
|---|---|
|<img src='data:image/jpeg;base64,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'>|`http://bit.ly/2tRkSxZ`|

## Aba Relatórios

Nesta pagina é possível gerar 05 tipos de relatórios:  “Relatório financeiro”, “Detalhado de vendas”, “Listagem de clientes”, “Extrato de Cobrança” e “Relatório de Recorrência”.

### Relatório Financeiro

Esse relatorio apresenta as vendas pagas em um determinado periodo de tempo, sendo separadas por meio de pagamento. Selecionando o periodo e  tipo de pagamento, após pressionar “Buscar” o resultado será apresentado.

![Relatório financeiro]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-relatorio-financeiro.png)

### Relatório detalhado de vendas.

Esse relatorio informa o valor de cada pedido assim como dados sobre o produto e o comprador. O relatorio somente informa dados dos pedidos considerados com status **“PAGO”**.

<aside class="notice">Pedidos realizados no Modo de teste não são apresentados nesse relatório, mesmo que estejam com o status “PAGO”</aside>

![Relatório detalhado de vendas]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-relatorio-detalhado-vendas.png)

### Listagem de clientes

A listagem de clientes gera um arquivo excel contendo os dados dos clientes que realizaram compras  em sua loja.

#### Os dados apresentados são:

| Dados do Comprador | Dados de entrega ou Billing|
|:------------------:|:--------------------------:|
|        Nome        |          Endereço          |
|       E-mail       |           Numero           |
|      Telefone      |         Complemento        |
|      CPF/CNPJ      |           Bairro           |
|                    |           Cidade           |
|                    |           Estado           |
|                    |             CEP            |

### Extrato de cobrança

A lista do valor cobrado pelos serviços oferecidos pela Cielo será apresentada neste relatório. Todos os dados dos planos e custos transacionais serão apresentados aqui:

![Extrato de cobrança]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-extrato-cobranca.png)

### Relatório de Recorrência

Nesse relatório é possível pesquisar o conjunto de recorrência e suas transações com base em seu ID ou por Status e Intervalo de ocorrência.

![Relatório de Recorrências]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-relatorio-recorrencia.png)

Ao clicar no “+” é aberto a tela de Detalhes da recorrência:

![Detalhes da Recorrência]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-detalhes-da-recorrencia.png)

Os Detalhes da recorrência informam o carrinho e o histórico de transações agendadas. Ao clicar em “+Detalhes” o lojista é direcionado a tela de detalhes de Pedidos (Ver item “PEDIDOS”)

Tambem é possível realizar 3 tipos de modificações na recorrência:

* **Desativar a Recorrência** - Encerra o processo de cobrança automática. Desativação não pode ser desfeito.
* **Alterar o Intervalo** - Muda o Intervalo atual da recorrência para uma das outras opções (Bimestral, semestral e anual)
* **Alterar o dia de agendamento** - Modifica o dia em que a transação de recorrência ocorrerá.

## Aba Manuais

Nesta página constam os manuais do Checkout Cielo, assim como a pagina de FAQ e de “Duvidas”, onde o lojista pode entrar em contato com a equipe de suporte Checkout Cielo.

![Dúvidas]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-suporte.png)

Nessa pagina é possivel entrar em contato a respeito de duvidas Operacionais, tecnicas e Comerciais  e ter acesso aos documentos técnicos e de suporte do Checkout Cielo.

* **Manual do Desenvolvedor** – Contém os procedimentos e diretrizes de integração do Checkout Cielo ao seu site.
* **FAQ** – Perguntas mais comuns a respeito do Checkout Cielo. Contem informações sobre questões Comerciais, Técnicas, Operacionais e sobre o Modo de teste.

## Aba Configurações da Loja

Nesta pagina é possivel fazer configurações em diferentes mecanismos dentro do Checkout Cielo. Essa área é dividida em 4 partes diferentes: Exibição, Pagamentos, Antifraude, Frete de Correios & serviços.

### Exibição

Aqui é possivel alterar o logo do meio de pagamento disponível em sua loja e a cor de fundo do site via o uso da caixa de opções ou digitando o código relativo a cor escolhida (As cores estão no padrão RGB).

![Configuração Exibição]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-configuracoes-loja.png)

<aside class="notice">O logo de sua loja será exibido na tela de Checkout centralizado.</aside>

### Pagamentos

Nesta tela é possível alterar as configurações dos meios de pagamento disponíveis em sua loja, os definindo como ativos ou não, e configurar a URL de retorno, notificação e Mudança de Status.

![Configuração Exibição]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-configuracoes-pagamento.png)

#### Modo de Teste Checkout Cielo

O modo de teste Checkout Cielo é uma ferramenta que permite testar a integração do seu site. Com o modo teste, você pode realizar transações a medida que evolui com a integração e consegue simular cenários para testar diferentes meios de pagamento.

O modo de teste pode ser ativado marcando a caixa de seleção:

![Ativando Modo de teste]({{ site.baseurl_root }}/images/checkout/tm01.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do Backoffice e na tela transacional do Checkout Cielo.

Essa tarja indica que a sua loja Checkout Cielo está agora operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

|Backoffice|Transacional|
|---|---|
|![Tarja vermelha - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png)|![Tarja vermelha - Transacional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png)|

#### Tipos de Notificação

Checkout Cielo possui dois tipos de notificações que o lojista pode utilizar de acordo com suas necessidades:

|Tipo|Descrição|
|---|---|
|`POST`|Notificação onde o lojista é passivo. Dois `POST HTTP` são disparados, um informando dados da venda e outra mudança de Status da transação|
|`JSON`|Notificação onde o lojista realiza uma consulta. Um `POST` contendo informações para a realização de uma consulta (`GET`) as transações checkout|

Para utilizar ambos os modelos, o lojista necessitará acessar o Backoffice cielo e configurar tanto a `URL de NOTIFICAÇÃO` quando a `URL de MUDANÇA de STATUS`.

Para mais informações sobre o modelo de notificação visite o **[Manual de integração](https://developercielo.github.io/manual/checkout-cielo#notificações-de-pagamento)**

#### URLs principais do Checkout Cielo

As URL’s descritas nesta área da aba tem a função de meios de comunicação entre o Checkout e o sistema do lojista integrando. Abaixo a descrição de cada uma das URLs

* **URL de Retorno** - Ao finalizar a transação o comprador final poderá ser redirecionado para a URL de retorno. Ao clicar no botão “VOLTAR”  na tela de comprovante de vendas, o comprador será direcionando para a URL de retorno previamente cadastrada no BackOffice.

* **URL de Notificação** - Ao finalizar uma transação é enviado um post com todos os dados da venda para a URL de Notificação, previamente cadastrada no BackOffice. O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do status da transação.

* **URL de Mudança de Status** - Quando um pedido tiver seu status alterado, será enviando um post para a URL de Mudança de Status, previamente cadastrada no BackOffice. O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido.

Na tela de pedidos, dentro de cada transação, há a opção de reenvio do POST de mudança de status.  Basta clicar nos botões azuis, marcados na imagem abaixo:

![Detalhes do pedido]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-detalhe-pedidos.png)

<aside class="notice">Os Lojistas da “Loja Virtual Terra Cielo” possuem URL’s de notificação, mudança de Status e Retorno atualizadas automaticamente. Para esses lojistas, não é necessário alterar as URL’s citadas.</aside>

Para mais informações sobre as URLs de notificação do Checkout visite o **[Manual de integração](https://developercielo.github.io/manual/checkout-cielo#notificações-de-pagamento)**

#### Valores Mínimos e Descontos

Nesta parte da aba de configurações é possível configurar 4 valores mínimos e descontos por meios de pagamento:

![Valor minimo parcela]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-configuracoes-de-valores-minimos.png)

| Tipo | Descrição|
|-----|------|
|**Valor minimo parcela**| Caso o valor da parcela da compra seja inferior ao minimo, o Checkout exibirá apenas a parcela superior ao minimo <br> **EX:** Parcela minima de R$5,00, Em uma compra de R$10, não será exibida a opção de parcelamento em 3X, apenas em 2X|
|**Valor mínimo para pagamento com boleto**|Valor minimo para que a opção de pagamento em boleto seja Exibida|
|**Desconto para pagamento com boleto**| Define um valor % para desconto caso o Boleto seja o meio de pagamento escolhido|
|**Desconto para pagamento com débito online**|Define um valor % para desconto caso o Débito online seja o meio de pagamento escolhido|

<aside class="warning">Se valor da compra for inferior, caso não haja outro meio de pagamento disponivel, não haverá opção para o comprador, obrigando-o a retornar a loja criar um carrinho com o valor acima do minimo. Para evitar essa situação sugerimos:<br /><br><ul><li>Caso sua loja não tenha outros meios de pagamento, informe ao comprador sobre o valor minimo do boleto.</li><li>Adquira outros meios de pagamento como Cartões de crédito (procedimento realizado pelo Checkout Cielo) ou débito online.</li></ul></aside>

<aside class="warning">O valor minimo do boleto não funciona em caso de descontos definidos pelo lojista. Caso o lojista defina valor minimo de boleto de R$100,00 e um desconto de 10%,  será gerado um boleto de R$90,00 (inferior ao minimo)</aside>

**Sobre Valor Minimo:**

**Exemplo**: Caso o valor minimo de parcelamento seja de R$10,00, uma compra de R$100,00 poderá ser parcelada máximo em 10x, mesmo que na configuração da loja o parcelamento em 12x esteja habilitado.

<aside class="warning">O numero máximo de parcelamento da loja depende do limite definido na Afiliação. Por padrão toda afiliação é liberada com limite de 12 parcelas.</aside>

<aside class="warning">O Valor mínimo de parcelamento é obrigatoriamente R$5,00.</aside>

<aside class="warning">A autenticação de cartões de crédito ocorre somente para cartões Visa e Mastercard. Essa função deve estar habilitada em sua afiliação.</aside>

#### Meios de pagamentos Ativos

Basta marcar a caixa de seleção do cartão que deseja disponibilizar no momento do pagamento. Para desabilita-lo, basta desmarcar a caixa de seleção.

![Configurando meios de pagamento]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-cards.png)

O parcelamento é definido por bandeira de cartão. O numero de parcelas maximas disponibilizadas para cada cartão passa a ser definida pelo Lojista.

O Checkout Cielo permite parcelamento até 12 vezes sem juros. O numero de parcelas exibidas no transacional depende do valor minimo para parcelamento configurado pela Loja

<aside class="warning"><b>Sobre Autenticação de transações:</b> O checkbox obriga todos os cartões Visa e Master a serem direcionados ao ambiente bancário para validação de segurança,. Só deve ser ativado caso a Afiliação Cielo esteja preparada para realizar esse fluxo, caso contrario as transações serão negadas automaticamente</aside>

### Antifraude e Captura Automática

Aqui é possivel definir a automação dos processos de captura e cancelamento de pedidos com base no resultado da analise de antifraude e definir o valor mínimo inicial que uma transação deve ter para ser analisada.

<aside class="notice">Se o lojista não tem habilitado o antifraude em seu contrato junto a Cielo ou não enviar no POST a solicitação de analise de fraude, a captura automática não será executada caso esteja configurada para ser efetuada com base no status da analise de risco. Caberá ao lojista a captura manual do pedido.</aside>

![Anti fraude]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-anti-fraude.png)

Campo valor mínimo de analise AF:

![Valor mínimo anti fraude]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-anti-fraude-valor-minimo.png)

#### Tabela de status do Antifraude

|Status Antifraude|Substatus|Descrição|
|---|---|---|
|Baixo Risco|Baixo Risco|Baixo risco de ser uma transação fraudulenta|
|Médio Risco|Médio Risco|Médio risco de ser uma transação fraudulenta|
|Não finalizado|Não finalizado|Não foi possível finalizar a consulta|
|N/A|Autenticado|Transações autenticadas pelo banco|
|N/A|AF Não contratado|Antifraude não habilitado no plano do lojista|
|N/A|AF Dispensado|Antifraude dispensado via contrato ou inferior ao valor mínimo de antifrade parametrizado backoffice no lojista|
|N/A|Não aplicável|Meio de pagamento não analisável como cartões de débito, boleto e débito online|
|N/A|Transação de recorrência|Transação de crédito seja posterior a transação de agendamento|
|N/A|Transação negada|Venda a crédito foi negada|

Você pode visualizar o status do antifraude acessando o detalhe da compra, na aba Pedidos e clicando no (+)

![Status Antifraude]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-status-antifraude.png)

### Frete de Correios & Serviços

Nesta área você configura as opções de frete disponiveis em sua Loja. Na seção Informações sobre Frete há uma explicação mais detalhada sobre os tipos de fretes disponiveis no Checkout Cielo. Há tambem na área de fretes de Correiros, uma calculadora de frete para consultas (essa calculadora dá o valor de frete de cada tipo de frete cadastrado para um determinado peso e localidade)

![Frete Correios]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-frete-correios.png)

# Tutorial - Link de Pagamentos

## Sobre o Link de Pagamento

**O Botão, QR CODE ou LINK** é um método de compra usada sempre que não houver um “carrinho de compras” em sua loja.
Esse tipo de integração é realizado via o cadastro de um conjunto de itens a ser vendido on backoffice do Checkout Cielo.

O botão gera um do 3 tipos diferentes de métodos de acesso a **mesma tela transacional**:

|Método|Nome|Descrição|
|---|:--:|---|
|![Botão]({{ site.baseurl_root }}/images/checkout/botao.png)|**Botão**|É um código HTML que ao ser colado em um site, vai direcionar o comprador a tela transacional - Ideal para uso em **hotSites** ou **E-mail Marketing**|
|![QRCODE]({{ site.baseurl_root }}/images/checkout/qrcode.png)|**QRCODE**|Código interpretável por Smartphones e Tablets - Ideal para uso em **Marketing impressos** ou **Digital**|
|`http://bit.ly/2tRkSxZ`|**LINK**|é um link compartilhável, ideal para uso em **Redes Sociais** ou **Messengers Mobile**|

Este modelo de integração é utilizado para:

* Associar uma compra rápida direta a um produto como uma promoção numa homepage pulando a etapa do carrinho.
* Enviar um e-mail marketing, ou uma cobrança via e-mail.
* Adicionar o botão (HTML) referente ao produto/serviço a ser comprado/pago.
* Realizar envio de pagamentos por aplicativos mobile
* Sempre que se deseja disponibilizar uma venda rápida.

Para utilizar este recurso, é necessário cadastrar o produto que se deseja vender, suas informações, e depois simplesmente copiar o código fonte gerado para este botão.

## Características do Botão

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter à compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro no Backoffice Cielo Checkout.

|Característica|Explicação|
|---|---|
|**Específico**|Cada botão gerado serve somente para um determinado produto ou grupo de produtos. A quantidade e volume de produtos vendido é definido no cadastro do Botão, não sendo possível altera a quantidade na tela transacional <br>**Exemplo:** Será necessário criar Um botão para vender 1 camisa. Se o comprador desejar 2 camisas, ele precisará usar o botão 2X ou O lojista deverá criar um botão com 2 camisas|
|**Número do Pedido do Checkout**|O botão não permite o cadastro do número de pedido do Lojista. Como será a Cielo a acionar o próprio Checkout, será gerado um número de pedido (um `GUID`) único. O Lojista receberá esse número de pedido como link a venda realizada|
|**Criação de pedidos**|Um botão gera vários pedidos independentes, ou seja, para limitar a quantidade de pedidos gerados por um botão, QRCODE ou Link criado, é necessario definir uma quantidade minimas de itens em "estoque" no momento de cadastro. O Botão é um método de chamadas à API Checkout. Cada vez que ele é acionado, uma nova requisição é feita a API, criando assim um novo pedido|

#### Fluxo do Link de Pagamento

![Fluxo de integração Checkout Cielo Botão]({{ site.baseurl_root }}/images/checkout/intbt.png)

## Criando Um Link de pagamentos

Para utilizar este recurso, é necessário cadastrar o produto que se deseja vender, suas informações, e depois simplesmente copiar o código fonte gerado para este botão. A inclusão dos produtos é feita dentro do [Backoffice Cielo Checkout](https://developercielo.github.io/tutorial/checkout-tutoriais#cadastrar-de-link-de-pagamentos), no menu de Produtos/Cadastrar Produto.

É possivel criar 5 tipos diferentes de link de Pagamentos:

* **Material Fisico** – Produtos Fisicos que necessitam ser enviados pelos lojistas. Ex: Roupas, Brinquedos, etc.
* **Digital** –  Bens digitais vendidos pela internet. Ex: Software, Jogos, Musicas, etc.
* **Serviço** – Serviços a serem prestados. Ex:  Entrega delivery, projetos e orçamentos.
* **Recorrência** - Transações que se repetem em um determinado intervalo de tempo EX: Assinaturas, mensalidades etc
* **Pagamentos** - Pagamentos unicos ou transferência de valores Ex: quitação de dividas etc

**Tela de Cadastro**

![Cadastro de Botão]({{ site.baseurl_root }}/images/checkout/btcadastro.png)

**Botão Cadastrado:**

![Cadastro de Botão]({{ site.baseurl_root }}/images/checkout/btcadastro2.png)

Abaixo a listagem de itens que devem ser cadastrados para a criação do botão:

| Campos            | Descrição                                                                                                                                      | Tamanho Min. | Tamanho Máx. | Obrigatório |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------|-------------|
| `Tipo do Produto` | Indique se está vendendo um bem Material, um Serviço ou um bem Digital. Para bens Digitais, não será apresentada a opção de tipo de Frete.     | n/a          | n/a          | Sim         |
| `SKU`             | Código de identificação do produto                                                                                                             | 1            | 50           | Não         |
| `Título`          | Titulo do Produto                                                                                                                              | 1            | 50           | Sim         |
| `Descrição`       | Descrição do Produto                                                                                                                           | 1            | 255          | Sim         |
| `Preço`           | Valor total do pedido **em centavos** (ex.: R$1,00 =100).                                                                                      | 11           | 14           | Sim         |
| `Frete`           | Escolher dentre uma das opções de Frete (Correios, Frete Fixo, Frete Grátis, Retirar na loja, Sem Cobrança).                                   | n/a          | n/a          | Sim         |
| `CEP de Origem`   | Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o CEP de onde vai partir a mercadoria para fins de cálculo de frete. | 9            | 9            | Sim         |
| `Peso(kg)`        | Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o peso do produto em kg para fins de cálculo de frete                | n/a          | n/a          | Sim         |
| `Valor do Frete`  | Esse campo só aparece para o frete tipo Frete Fixo, e deve ser preenchido com o valor que o lojista especificar para seus produtos.            | n/a          | n/a          | Sim         |
| `Método de envio` | Esse campo só aparece para Tipo Produto igual a Material Físico e Tipo de Frete igual a Frete Fixo.                                            | n/a          | n/a          | Sim         |
| `URL`             | Esse campo só aparece para Tipo Produto igual a Digital.                                                                                       | n/a          | n/a          | Sim         |
| `Quantidade`      | Define a quantidade maxima de pedidos que o Botão pode gerar. Se não definido, o botão poderá gerar um numero infinito de pedidos              | n/a          | n/a          | Não         |

**Adicionando o botão na sua página, você deve copiar o código HTML do botão criado e inclui-lo no HTML de seu site, conforme o exemplo abaixo.**

<aside class="notice">O código deve ser inserido dentro da área adequada no seu HTML.</aside>

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter a compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do Backoffice Cielo Checkout, e valerão os dados do cadastro.
