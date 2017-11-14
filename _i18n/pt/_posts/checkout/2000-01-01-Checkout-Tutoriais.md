---
layout: tutorial
title: Tutoriais
description: 
search: true
categories: tutorial
tags:
  - Checkout Cielo
toc_footers:
  - <a href='/Checkout-Cielo/'>Integração com Checkout Cielo</a>
---

# Tutorial Backoffice 

O objetivo deste documento é orientar o lojista sobre como acessar a manipular o Backoffice do Checkout Cielo. 

## Acessando o Backoffice

Para acessar o Backoffice do Checkout Cielo, é necessário que o lojista **[realize login no Site Cielo](https://www.cielo.com.br/minha-conta)**, inserindo sua Afiliação (Nº de estabelecimento) e Usuário:

![Login Backoffice Cielo](/images/Checkout/TutorialCheckout/checkout-login.png)

Em seguida é necessário incluir sua Senha:

![Senha Backoffice Cielo](/images/Checkout/TutorialCheckout/checkout-login-senha.png)

Na área de “Vendas Online” basta clicar em Checkout Cielo.

![Vendas online](/images/Checkout/TutorialCheckout/checkout-vendas-online.png)

Caso o site principal da Cielo não esteja disponível, basta acessar a URL [https://cieloecommerce.cielo.com.br/backoffice](https://cieloecommerce.cielo.com.br/backoffice) e inserir seu e-mail de cadastro e senha.

[!Checkout Cielo](/images/Checkout/TutorialCheckout/checkout-cielo.png)

## Abas do Backoffice Checkout Cielo

O Backoffice é formado por 6 Abas diferentes de administração do Checkout Cielo. Elas são:

| Aba                    | Descrição                                                                                                                                                                                        |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **DashBoard**          | Pagina inicial onde são apresentadas informações sobre a sua conta e sobre o volume e tipo de transações realizadas em sua loja.                                                                 |
| **Pedidos**            | Nessa pagina fica contida toda a listagem de transações realizadas no Checkout Cielo. Aqui é possivel pesquisar um determinado pedido ou transação.                                              |
| **Link de Pagamentos** | Nessa pagina são listados todos os Botões/Links cadastrados no Checkout Cielo                                                                                                                    |
| **Relatórios**         | Nesta pagina é possível gerar 05 tipos de relatórios: <BR>“Relatório financeiro"<BR>“Detalhado de vendas”<BR>“Listagem de clientes”<BR>* “Extrato de Cobrança”<BR>“Relatório de Recorrência”<BR> |
| **Manuais**            | Nesta página constam os manuais do Checkout Cielo, assim como a pagina de FAQ e de “Duvidas”, onde o lojista pode entrar em contato com a equipe de suporte Checkout Cielo.                      |
| **Configurações**      | Pagina onde é possivel fazer alterações nas configurações da Loja , dos seus dados cadastrais e Alterar sua Senha.                                                                               |

## Aba DashBoard

Aba inicial onde são apresentadas informações sobre a sua conta e sobre o volume e tipo de transações que sua loja vem realizando via o Checkout Cielo.

### Tipos de informações

Nessa tela você encontra 2 tipos de informações.

* **Alertas** – Indica se há pedidos a expirar na data presente.
* **Volume financeiro e transacional** - São gráficos interativos que demonstram em porcentagem e em valores totais, qual a participação de cada meio de pagamento no total de transações realizadas e o volume total de acordo com o status das transações.

<aside class="warning">Por padrão, transações de crédito expiram em 15 dias. Após esse perido, elas não podem ser capturadas.</aside>

![DashBoard](/images/Checkout/TutorialCheckout/checkout-dashboard.png)

## Aba Pedidos

Nessa aba fica contida toda a listagem de transações realizadas no Checkout Cielo. Aqui é possivel pesquisar um determinado pedido, via um determinado parametro de busca nos campos ou desmarcando os “checkbox” dos “Meios de pagamento” ou “Status de pagamento” e apertando o botão “Buscar”.
O resultado da pesquisa é exposto em forma de uma listagem de transações que pode ser exportada como uma planilha de Excel.

Listagem de Pedidos

![Pedidos](/images/Checkout/TutorialCheckout/checkout-pedidos.png)

Detalhes dos Pedidos

![Detalhes do Pedido](/images/Checkout/TutorialCheckout/checkout-pedidos-detalhes.png)

## Aba Link de Pagamento

Nessa Aba são listados todos os produtos cadastrados no Checkout Cielo. Tambem é possivel fazer uma busca pelo nome do produto nesta pagina.  A lista de produtos pode ser exportada no formato Excel.

No menu Produtos, há também outras duas áreas: **Cadastrar de produtos** e **Listar Produtos Cadastrados**.

### Listar Link de pagamentos Cadastrados

![Produtos cadastrados](/images/Checkout/TutorialCheckout/checkout-listar-link-de-pagamentos.png)

Clicando no Titulo ou SKU do produto, você será redirecionado a página de informações de Produto, onde todas as caracteristicas do produto são informadas e onde você pode definir o padrão do Botão (caso a sua integração seja com base no Botão Checkout Cielo) a ser usado na venda desse produto. A integração via Botão é melhor explicada no item [Uso do botão Checkout Cielo “Comprar“](#uso-do-botão-checkout-cielo-comprar).

![Detalhes do produto](/images/Checkout/TutorialCheckout/checkout-detalhes-Link-de-pagamentos.png)

### Cadastrar de Link de Pagamentos

Nessa pagina é possivel cadastrar seus produtos com base no tipo de produto em si. O Checkout Cielo considera 3 tipos de produtos: Material Fisico, Digital e  Serviço.

* **Material Fisico** – Produtos Fisicos que necessitam ser enviados pelos lojistas. Ex: Roupas, Brinquedos, etc.
* **Digital** –  Bens digitais vendidos pela internet. Ex: Software, Jogos, Musicas, etc.
* **Serviço** – Serviços a serem prestados. Ex:  Entrega delivery, projetos e orçamentos.
* **Recorrência** - Transações que se repetem em um determinado intervalo de tempo EX: Assinaturas, mensalidades etc
* **Pagamentos** - Pagamentos unicos ou transferência de valores Ex: quitação de dividas etc

![Cadastrar Link de pagamentos](/images/Checkout/TutorialCheckout/checkout-cadastrar-link-de-pagamentos.png)

<aside class="notice">Material Fisico exige que um <strong>tipo de frete</strong> seja cadastrado. </aside>

<aside class="notice">O campo <strong>“SoftDescriptor”</strong> permite que lojista insira uma mensagem que será exibida na fatura do cartão de crédito do comprador. Essa funcionalidade é indicada para lojas que tem o nome fantasia muito diferente em relação a Razão social.</aside>

<aside class="notice">A mensagem inclusa no campo “SoftDescriptor” deve ser limitada a 13 letras e não pode conter espaços.</aside>

<aside class="notice">O cadastro de produtos não é obrigatório para lojistas que utilizem a integração via carrinho</aside>

## Aba Relatórios

Nesta pagina é possível gerar 05 tipos de relatórios:  “Relatório financeiro”, “Detalhado de vendas”, “Listagem de clientes”, “Extrato de Cobrança” e “Relatório de Recorrência”.

### Relatorio Financeiro

Esse relatorio apresenta as vendas pagas em um determinado periodo de tempo, sendo separadas por meio de pagamento. Selecionando o periodo e  tipo de pagamento, após pressionar “Buscar” o resultado será apresentado.

![Relatório financeiro](/images/Checkout/TutorialCheckout/checkout-relatorio-financeiro.png)

### Relatório detalhado de vendas.

Esse relatorio informa o valor de cada pedido assim como dados sobre o produto e o comprador. O relatorio somente informa dados dos pedidos considerados com status “PAGO”.

<aside class="notice">Pedidos realizados no <strong>Modo de teste</strong> não são apresentados nesse relatório, mesmo que estejam com o status “PAGO”</aside>

![Relatório detalhado de vendas](/images/Checkout/TutorialCheckout/checkout-relatorio-detalhado-vendas.png)

### Listagem de clientes

A listagem de clientes gera um arquivo excel contendo os dados dos clientes que realizaram compras  em sua loja.

#### Os dados apresentados são:

1. Nome
2. E-mail
3. Telefone
4. CPF
5. Endereço (como descrito pelo cliente ou como retornado pela informação do CEP)
6. Numero
7. Complemento (se houver)
8. Bairro
9. Cidade
10. Estado
11. CEP

### Extrato de cobrança

A lista do valor cobrado pelos serviços oferecidos pela Cielo será apresentada neste relatório. Todos os dados dos planos e custos transacionais serão apresentados aqui:

![Extrato de cobrança](/images/Checkout/TutorialCheckout/checkout-extrato-cobranca.png)

### Relatório de Recorrência

Nesse relatório é possível pesquisar o conjunto de recorrência e suas transações com base em seu ID ou por Status / Intervalo de ocorrência.

![Relatório de Recorrências](/images/Checkout/TutorialCheckout/checkout-relatorio-recorrencia.png)

Ao clicar no “+” é aberto a tela de Detalhes da recorrência:

![Detalhes da Recorrência](/images/Checkout/TutorialCheckout/checkout-detalhes-da-recorrencia.png)

Os Detalhes da recorrência informam o carrinho e o histórico de transações agendadas. Ao clicar em “+Detalhes” o lojista é direcionado a tela de detalhes de Pedidos (Ver item “PEDIDOS”)

## Aba Manuais

Nesta página constam os manuais do Checkout Cielo, assim como a pagina de FAQ e de “Duvidas”, onde o lojista pode entrar em contato com a equipe de suporte Checkout Cielo.

![Dúvidas](/images/Checkout/TutorialCheckout/checkout-suporte.png)

Nessa pagina é possivel entrar em contato a respeito de duvidas Operacionais, tecnicas e Comerciais  e ter acesso aos documentos técnicos e de suporte do Checkout Cielo.

* **Manual do Desenvolvedor** – Contém os procedimentos e diretrizes de integração do Checkout Cielo ao seu site.
* **Tutorial do Lojista** – Principal fonte de informação sobre a utilização do Checkout Cielo do ponto de vista do Lojista
* **FAQ** – Perguntas mais comuns a respeito do Checkout Cielo. Contem informações sobre questões Comerciais, Técnicas, Operacionais e sobre o Modo de teste.

## Aba Configurações da Loja

Nesta pagina é possivel fazer configurações em diferentes mecanismos dentro do Checkout Cielo. Essa área é dividida em 4 partes diferentes: Exibição, Pagamentos, Antifraude, Frete de Correios & serviços.

### Exibição

Aqui é possivel alterar o logo do meio de pagamento disponível em sua loja e a cor de fundo do site via o uso da caixa de opções ou digitando o código relativo a cor escolhida (As cores estão no padrão RGB).

![Configuração Exibição](/images/Checkout/TutorialCheckout/checkout-configuracoes-loja.png)

<aside class="notice">O logo de sua loja será exibido na tela de Checkout centralizado.</aside>

### Pagamentos

Nesta tela é possivel alterar as configurações dos meios de pagamento disponiveis em sua loja , os definindo como ativos ou não, e configurar a URL de retorno, notificação e Mudança de Status.

![Configuração Exibição](/images/Checkout/TutorialCheckout/checkout-configuracoes-pagamento.png)

#### URLs principais do Checkout Cielo

As URL’s devem ser cadastradas pelo próprio lojista no seu Backoffice, na aba “configurações  Configurações da loja”.

* **URL de Retorno** - Ao finalizar a transação o comprador final poderá ser redirecionado para a URL de retorno. Ao clicar no botão “VOLTAR”  na tela de comprovante de vendas, o comprador será direcionando para a URL de retorno previamente cadastrada no BackOffice.
* **URL de Notificação** - Ao finalizar uma transação é enviado um post com todos os dados da venda para a URL de Notificação, previamente cadastrada no BackOffice. O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do status da transação.
* **URL de Mudança de Status** - Quando um pedido tiver seu status alterado, será enviando um post para a URL de Mudança de Status, previamente cadastrada no BackOffice. O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido.

Na tela de pedidos, dentro de cada transação, há a opção de reenvio do POST de mudança de status.  Basta clicar nos botões azuis, marcados na imagem abaixo:

![Detalhes do pedido](/images/Checkout/TutorialCheckout/checkout-detalhe-pedidos.png)

<aside class="notice">Os Lojistas da “Loja Virtual Terra Cielo” possuem URL’s de notificação, mudança de Status e Retorno atualizadas automaticamente. Para esses lojistas, não é necessário alterar as URL’s citadas.</aside>

### Meus meios de pagamento ativos

#### Cartões de crédito e Parcelamento

Basta marcar a caixa de seleção do cartão que deseja disponibilizar no momento do pagamento. Para desabilita-lo, basta desmarcar a caixa de seleção.

O parcelamento é definido por bandeira de cartão. O numero de parcelas maximas disponibilizadas para cada cartão passa a ser definida pelo Lojista. O Checkout Cielo permite parcelamento até 12 vezes sem juros. Há a opção de definir um valor minimo de parcelamento. O valor definido faz com que independentemente do valor da compra, o comprador somente possa fazer parcelamentos com valor acima do Valor Minimo

**Exemplo**: Caso o valor minimo de parcelamento seja de R$10,00, uma compra de R$100,00 poderá ser parcelada máximo em 10x, mesmo que na configuração da loja o parcelamento em 12x esteja habilitado.

<aside class="warning">O numero máximo de parcelamento da loja depende do limite definido na Afiliação. Por padrão toda afiliação é liberada com limite de 12 parcelas.</aside>

<aside class="warning">O Valor mínimo de parcelamento é obrigatoriamente R$5,00.</aside>

<aside class="warning">A autenticação de cartões de crédito ocorre somente para cartões Visa e Mastercard. Essa função deve estar habilitada em sua afiliação.</aside>

#### Desconto para Boletos e débito online

É possivel realizar oferecer descontos nos meios de pagamento boleto e débito online. Esse desconto pode ser definido de duas maneiras.

* **Via Backoffice**: Basta selecionar o valor em (%) que o meio de pagamento virá a oferecer.
* **Via POST**: é possivel enviar o no POST do carrinho um parametro contendo o desconto (%)  que o meio de pagamento virá a oferecer.

#### Valor Minimo de boleto

É possivel definir um valor minimo para que o boleto seja apresentado. **Compras em valor inferior ao definido não tem o boleto disponibilizado na tela de checkout**.

<aside class="warning">Se valor da compra for inferior, caso não haja outro meio de pagamento disponivel, não haverá opção para o comprador, obrigando-o a retornar a loja criar um carrinho com o valor acima do minimo. Para evitar essa situação sugerimos:<br /><ul><li>Caso sua loja não tenha outros meios de pagamento, informe ao comprador sobre o valor minimo do boleto.</li><li>Adquira outros meios de pagamento como Cartões de crédito (procedimento realizado pelo Checkout Cielo) ou débito online.</li></ul></aside>

<aside class="warning">O valor minimo do boleto não funciona em caso de descontos definidos pelo lojista. Caso o lojista defina valor minimo de boleto de R$100,00 e um desconto de 10%,  será gerado um boleto de R$90,00 (inferior ao minimo)</aside>

### Antifraude e Captura Automática

Aqui é possivel definir a automação dos processos de captura e cancelamento de pedidos com base no resultado da analise de antifraude e definir o valor mínimo inicial que uma transação deve ter para ser analisada.

<aside class="notice">Se o lojista não tem habilitado o antifraude em seu contrato junto a Cielo ou não enviar no POST a solicitação de analise de fraude, a captura automática não será executada caso esteja configurada para ser efetuada com base no status da analise de risco. Caberá ao lojista a captura manual do pedido.</aside>

![Anti fraude](/images/Checkout/TutorialCheckout/checkout-anti-fraude.png)

Campo valor mínimo de analise AF:

![Valor mínimo anti fraude](/images/Checkout/TutorialCheckout/checkout-anti-fraude-valor-minimo.png)

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

![Status Antifraude](/images/Checkout/TutorialCheckout/checkout-status-antifraude.png)

### Frete de Correios & Serviços

Nesta área você configura as opções de frete disponiveis em sua Loja. Na seção [Informações sobre Frete](#informações-sobre-frete) há uma explicação mais detalhada sobre os tipos de fretes disponiveis no Checkout Cielo. Há tambem na área de fretes de Correiros, uma calculadora de frete para consultas (essa calculadora dá o valor de frete de cada tipo de frete cadastrado para um determinado peso e localidade)

![Frete Correios](/images/Checkout/TutorialCheckout/checkout-frete-correios.png)

### Dados Cadastrais

Nesta seção, ficam listados os dados da loja cadastrada e do Lojista.

![Dados cadastrais](/images/Checkout/TutorialCheckout/checkout-dados-cadastrais.png)

### Alterar sua Senha

Aqui é possivel alterar a senha de acesso ao Checkout Cielo.

![Alterar senha](/images/Checkout/TutorialCheckout/checkout-alterar-senha.png)


