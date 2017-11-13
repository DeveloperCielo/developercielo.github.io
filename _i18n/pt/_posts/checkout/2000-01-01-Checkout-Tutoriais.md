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

# Backoffice Cielo

O objetivo deste documento é orientar o lojista sobre como vender com o Checkout Cielo. Descrevendo as funcionalidades, os métodos a serem utilizados, listando informações necessárias e provendo exemplos.

## Visão Geral

Para acessar o Backoffice do Checkout Cielo, é necessário que o lojista **[realize login no Site Cielo](https://www.cielo.com.br/minha-conta)**, inserindo sua Afiliação (Nº de estabelecimento) e Usuário:

![Login Backoffice Cielo](/images/checkout-login.png)

Em seguida é necessário incluir sua Senha:

![Senha Backoffice Cielo](/Public/images/bkocheckout/checkout-login-senha.png)

Na área de “Vendas Online” basta clicar em Checkout Cielo.

![Vendas online](/images/checkout-vendas-online.png)

Caso o site principal da Cielo não esteja disponível, basta acessar a URL [https://cieloecommerce.cielo.com.br/backoffice](https://cieloecommerce.cielo.com.br/backoffice) e inserir seu e-mail de cadastro e senha.

[!Checkout Cielo](/images/checkout-cielo.png)

## Páginas do Backoffice Cielo

O Backoffice é formado por 6 paginas diferentes de administração do Checkout Cielo. Elas são:

1. [DashBoard](#dashboard) - Pagina inicial onde são apresentadas informações sobre a sua conta e sobre o volume e tipo de transações que sua loja vem realizando via o Checkout Cielo.
2. [Pedidos](#pedidos) - Nessa pagina fica contida toda a listagem de transações realizadas por um determinado periodo de tempo no Checkout Cielo. Nessa pagina é possivel pesquisar um determinado pedido , via a colocação de um determinado parametro de busca nos campos la existentes ou desmarcando os “checkbox” dos **“Meios de pagamento”** ou **“Status de pagamento”** e apertando o botão **“Buscar”**.
3. [Produtos](#produtos) - Nessa pagina são listados todos os produtos cadastrados no Checkout Cielo. Tambem é possivel fazer uma busca pelo nome do produto nesta pagina.  A lista de produtos pode ser exportada no formato Excel.
4. [Relatórios](#relatórios) - Nesta pagina é possível gerar 05 tipos de relatórios:
    * “Relatório financeiro”,
    * “Detalhado de vendas”,
    * “Listagem de clientes”,
    * “Extrato de Cobrança” e
    * “Relatório de Recorrência”.
5. [Manuais](#maniais) - Nesta página constam os manuais do Checkout Cielo, assim como a pagina de FAQ e de “Duvidas”, onde o lojista pode entrar em contato com a equipe de suporte Checkout Cielo.
6. [Configurações](#configurações) - Pagina onde é possivel fazer alterações nas configurações da Loja , dos seus dados cadastrais e Alterar sua Senha.

# DashBoard

Pagina inicial onde são apresentadas informações sobre a sua conta e sobre o volume e tipo de transações que sua loja vem realizando via o Checkout Cielo.

## Tipos de informações

Nessa tela você encontra 2 tipos de informações.

* **Alertas** – Indica se há pedidos  a expirar na data presente.
* **Volume financeiro e transacional** - São gráficos interativos que demonstram em porcentagem ( e em valores totais) qual a participação de cada meio de pagamento no total de transações realizadas e o volume total de acordo com o status das transações.

![DashBoard](/images/checkout-dashboard.png)

# Pedidos

Nessa pagina fica contida toda a listagem de transações realizadas por um determinado periodo de tempo no Checkout Cielo. Nessa pagina é possivel pesquisar um determinado pedido , via a colocação de um determinado parametro de busca nos campos la existentes ou desmarcando os “checkbox” dos “Meios de pagamento” ou “Status de pagamento” e apertando o botão “Buscar”.

O resultado da pesquisa é exposta em forma de uma listagem  de operações. Essa listagem pode ser exportada como forma de excel.

![Pedidos](/images/checkout-pedidos.png)

# Produtos

Nessa pagina são listados todos os produtos cadastrados no Checkout Cielo. Tambem é possivel fazer uma busca pelo nome do produto nesta pagina.  A lista de produtos pode ser exportada no formato Excel.

No menu Produtos, há também outras duas áreas: **Cadastrar de produtos** e **Listar Produtos Cadastrados**.

## Listar Produtos Cadastrados

![Produtos cadastrados](/images/checkout-listar-produtos.png)

Clicando no Titulo ou SKU do produto, você será redirecionado a página de informações de Produto, onde todas as caracteristicas do produto são informadas e onde você pode definir o padrão do Botão (caso a sua integração seja com base no Botão Checkout Cielo) a ser usado na venda desse produto. A integração via Botão é melhor explicada no item [Uso do botão Checkout Cielo “Comprar“](#uso-do-botão-checkout-cielo-comprar).

![Detalhes do produto](/images/checkout-detalhes-produto.png)

## Cadastrar de Produtos

Nessa pagina é possivel cadastrar seus produtos com base no tipo de produto em si. O Checkout Cielo considera 3 tipos de produtos: Material Fisico, Digital e  Serviço.

* **Material Fisico** – Produtos Fisicos que necessitam ser enviados pelos lojistas. Ex: Roupas, Brinquedos, etc.
* **Digital** –  Bens digitais vendidos pela internet. Ex: Software, Jogos, Musicas, etc.
* **Serviço** – Serviços a serem prestados. Ex:  Entrega delivery, projetos e orçamentos.

![Cadastrar produtos](/images/checkout-cadastrar-produtos.png)

<aside class="notice">Material Fisico exige que um <strong>tipo de frete</strong> seja cadastrado. </aside>

<aside class="notice">O campo <strong>“SoftDescriptor”</strong> permite que lojista insira uma mensagem que será exibida na fatura do cartão de crédito do comprador. Essa funcionalidade é indicada para lojas que tem o nome fantasia muito diferente em relação a Razão social.</aside>

<aside class="notice">A mensagem inclusa no campo “SoftDescriptor” deve ser limitada a 13 letras e não pode conter espaços.</aside>

<aside class="notice">O cadastro de produtos não é obrigatório para lojistas que utilizem a integração via carrinho</aside>

# Relatórios

Nesta pagina é possível gerar 05 tipos de relatórios:  “Relatório financeiro”, “Detalhado de vendas”, “Listagem de clientes”, “Extrato de Cobrança” e “Relatório de Recorrência”.

## Relatorio Financeiro

Esse relatorio apresenta as vendas pagas em um determinado periodo de tempo, sendo separadas por meio de pagamento. Selecionando o periodo e  tipo de pagamento, após pressionar “Buscar” o resultado será apresentado.

![Relatório financeiro](/images/checkout-relatorio-financeiro.png)

## Relatório detalhado de vendas.

Esse relatorio informa o valor de cada pedido assim como dados sobre o produto e o comprador. O relatorio somente informa dados dos pedidos considerados com status “PAGO”.

<aside class="notice">Pedidos realizados no <strong>Modo de teste</strong> não são apresentados nesse relatório, mesmo que estejam com o status “PAGO”</aside>

![Relatório detalhado de vendas](/images/checkout-relatorio-detalhado-vendas.png)

## Listagem de clientes

A listagem de clientes gera um arquivo excel contendo os dados dos clientes que realizaram compras  em sua loja.

### Os dados apresentados são:

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

## Extrato de cobrança

A lista do valor cobrado pelos serviços oferecidos pela Cielo será apresentada neste relatório. Todos os dados dos planos e custos transacionais serão apresentados aqui:

![Extrato de cobrança](/images/checkout-extrato-cobranca.png)

## Relatório de Recorrência

Nesse relatório é possível pesquisar o conjunto de recorrência e suas transações com base em seu ID ou por Status / Intervalo de ocorrência.

![Relatório de Recorrências](/images/checkout-relatorio-recorrencia.png)

Ao clicar no “+” é aberto a tela de Detalhes da recorrência:

![Detalhes da Recorrência](/images/checkout-detalhes-da-recorrencia.png)

Os Detalhes da recorrência informam o carrinho e o histórico de transações agendadas. Ao clicar em “+Detalhes” o lojista é direcionado a tela de detalhes de Pedidos (Ver item “PEDIDOS”)

# Manuais

Nesta página constam os manuais do Checkout Cielo, assim como a pagina de FAQ e de “Duvidas”, onde o lojista pode entrar em contato com a equipe de suporte Checkout Cielo.

![Dúvidas](/images/checkout-suporte.png)

Nessa pagina é possivel entrar em contato a respeito de duvidas Operacionais, tecnicas e Comerciais  e ter acesso aos documentos técnicos e de suporte do Checkout Cielo.

* **Manual do Desenvolvedor** – Contém os procedimentos e diretrizes de integração do Checkout Cielo ao seu site.
* **Tutorial do Lojista** – Principal fonte de informação sobre a utilização do Checkout Cielo do ponto de vista do Lojista
* **FAQ** – Perguntas mais comuns a respeito do Checkout Cielo. Contem informações sobre questões Comerciais, Técnicas, Operacionais e sobre o Modo de teste.

# Configurações da Loja

Nesta pagina é possivel fazer configurações em diferentes mecanismos dentro do Checkout Cielo. Essa área é dividida em 4 partes diferentes: Exibição, Pagamentos, Antifraude, Frete de Correios & serviços.

## Exibição

Aqui é possivel alterar o logo do meio de pagamento disponível em sua loja e a cor de fundo do site via o uso da caixa de opções ou digitando o código relativo a cor escolhida (As cores estão no padrão RGB).

![Configuração Exibição](/images/checkout-configuracoes-loja.png)

<aside class="notice">O logo de sua loja será exibido na tela de Checkout centralizado.</aside>

## Pagamentos

Nesta tela é possivel alterar as configurações dos meios de pagamento disponiveis em sua loja , os definindo como ativos ou não, e configurar a URL de retorno, notificação e Mudança de Status.

![Configuração Exibição](/images/checkout-configuracoes-pagamento.png)

### Cartões de crédito e Parcelamento

Basta marcar a caixa de seleção do cartão que deseja disponibilizar no momento do pagamento. Para desabilita-lo, basta desmarcar a caixa de seleção.

O parcelamento é definido por bandeira de cartão. O numero de parcelas maximas disponibilizadas para cada cartão passa a ser definida pelo Lojista. O Checkout Cielo permite parcelamento até 12 vezes sem juros. Há a opção de definir um valor minimo de parcelamento. O valor definido faz com que independentemente do valor da compra, o comprador somente possa fazer parcelamentos com valor acima do Valor Minimo

**Exemplo**: Caso o valor minimo de parcelamento seja de R$10,00, uma compra de R$100,00 poderá ser parcelada máximo em 10x, mesmo que na configuração da loja o parcelamento em 12x esteja habilitado.

<aside class="warning">O numero máximo de parcelamento da loja depende do limite definido na Afiliação. Por padrão toda afiliação é liberada com limite de 12 parcelas.</aside>

<aside class="warning">O Valor mínimo de parcelamento é obrigatoriamente R$5,00.</aside>

<aside class="warning">A autenticação de cartões de crédito ocorre somente para cartões Visa e Mastercard. Essa função deve estar habilitada em sua afiliação.</aside>

### URLs principais do Checkout Cielo

As URL’s devem ser cadastradas pelo próprio lojista no seu Backoffice, na aba “configurações  Configurações da loja”.

* **URL de Retorno** - Ao finalizar a transação o comprador final poderá ser redirecionado para a URL de retorno. Ao clicar no botão “VOLTAR”  na tela de comprovante de vendas, o comprador será direcionando para a URL de retorno previamente cadastrada no BackOffice.
* **URL de Notificação** - Ao finalizar uma transação é enviado um post com todos os dados da venda para a URL de Notificação, previamente cadastrada no BackOffice. O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do status da transação.
* **URL de Mudança de Status** - Quando um pedido tiver seu status alterado, será enviando um post para a URL de Mudança de Status, previamente cadastrada no BackOffice. O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido.

Na tela de pedidos, dentro de cada transação, há a opção de reenvio do POST de mudança de status.  Basta clicar nos botões azuis, marcados na imagem abaixo:

![Detalhes do pedido](/images/checkout-detalhe-pedidos.png)

<aside class="notice">Os Lojistas da “Loja Virtual Terra Cielo” possuem URL’s de notificação, mudança de Status e Retorno atualizadas automaticamente. Para esses lojistas, não é necessário alterar as URL’s citadas.</aside>

### Desconto para Boletos e débito online

É possivel realizar oferecer descontos nos meios de pagamento boleto e débito online. Esse desconto pode ser definido de duas maneiras.

* **Via Backoffice**: Basta selecionar o valor em (%) que o meio de pagamento virá a oferecer.
* **Via POST**: é possivel enviar o no POST do carrinho um parametro contendo o desconto (%)  que o meio de pagamento virá a oferecer.

### Valor Minimo de boleto

É possivel definir um valor minimo para que o boleto seja apresentado. **Compras em valor inferior ao definido não tem o boleto disponibilizado na tela de checkout**.

<aside class="warning">Se valor da compra for inferior, caso não haja outro meio de pagamento disponivel, não haverá opção para o comprador, obrigando-o a retornar a loja criar um carrinho com o valor acima do minimo. Para evitar essa situação sugerimos:<br /><ul><li>Caso sua loja não tenha outros meios de pagamento, informe ao comprador sobre o valor minimo do boleto.</li><li>Adquira outros meios de pagamento como Cartões de crédito (procedimento realizado pelo Checkout Cielo) ou débito online.</li></ul></aside>

<aside class="warning">O valor minimo do boleto não funciona em caso de descontos definidos pelo lojista. Caso o lojista defina valor minimo de boleto de R$100,00 e um desconto de 10%,  será gerado um boleto de R$90,00 (inferior ao minimo)</aside>

### Antifraude

Aqui é possivel definir a automação dos processos de captura e cancelamento de pedidos com base no resultado da analise de antifraude e definir o valor mínimo inicial que uma transação deve ter para ser analisada.

<aside class="notice">Se o lojista não tem habilitado o antifraude em seu contrato junto a Cielo ou não enviar no POST a solicitação de analise de fraude, a captura automática não será executada caso esteja configurada para ser efetuada com base no status da analise de risco. Caberá ao lojista a captura manual do pedido.</aside>

![Anti fraude](/images/checkout-anti-fraude.png)

Campo valor mínimo de analise AF:

![Valor mínimo anti fraude](/images/checkout-anti-fraude-valor-minimo.png)

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

![Status Antifraude](/images/checkout-status-antifraude.png)

### Frete de Correios & Serviços

Nesta área você configura as opções de frete disponiveis em sua Loja. Na seção [Informações sobre Frete](#informações-sobre-frete) há uma explicação mais detalhada sobre os tipos de fretes disponiveis no Checkout Cielo. Há tambem na área de fretes de Correiros, uma calculadora de frete para consultas (essa calculadora dá o valor de frete de cada tipo de frete cadastrado para um determinado peso e localidade)

![Frete Correios](/images/checkout-frete-correios.png)

### Dados Cadastrais

Nesta seção, ficam listados os dados da loja cadastrada e do Lojista.

![Dados cadastrais](/images/checkout-dados-cadastrais.png)

### Alterar sua Senha

Aqui é possivel alterar a senha de acesso ao Checkout Cielo.

![Alterar senha](/images/checkout-alterar-senha.png)

# Uso do botão Checkout Cielo Comprar

Integração via Botão é um método de compra usada sempre que não houver um “carrinho de compras” em sua loja ou quando se deseja associar uma compra rápida direta a um produto, como uma promoção numa homepage pulando a etapa do carrinho.

A integração via botão também pode ser usada para enviar um e-mail marketing, ou uma cobrança via e-mail, ou seja, adicionando o botão (HTML) referente ao produto/serviço a ser comprado/pago. Ou sempre que desejar disponibilizar uma venda rápida.

Para utilizar este recurso, é necessário cadastrar o produto que deseja vender, suas informações, e depois simplesmente copiar o código fonte gerado para este botão. A inclusão dos produtos é feita dentro do Backoffice, no menu de Produtos/Cadastrar Produto.

## Características do Botão:

* Cada botão gerado serve somente para um determinado produto.
* O preço do produto não pode ser alterado na tela de Checkout
* Não é necessário o desenvolvimento de um carrinho
* O cadastro do produto é obrigatório para a criação do botão.

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter à compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do Backoffice, e valerão os dados do cadastro.

# Meios de Pagamento

Nesta seção são explicados os meios de pagamento utilizados pelo Checkout Cielo, assim como esses funcionam e a maneira como esses são controlados no backoffice.

## Boleto

Todo boleto gerado (emitido) aparece com o status de “PENDENTE” no Relatório de Pedidos. Sua troca de status vai depender de ações manuais do proprio lojista.

### Possiveis Status do Boleto

* **PENDENTE** – boleto emitido pelo processo de transação. Status continua até alteração manual pelo lojista.
* **PAGO** – Status usado quando o botão "Conciliar” é ativado pelo lojista. Esse status pode ser revertido para pendente utiliando o Botão “Desfazer conciliação”.
* **EXPIRADO** – Status ativo após 10 dias da criação do boleto, caso esse não tenha sito conciliado nesse periodo. Boletos com status “EXPIRADO” podem ser conciliados.

### Conciliando um Boleto:

Cabe ao lojista através de uma Conciliação Manual com seu extrato bancário, confirmar o pagamento do mesmo.

![Conciliando um boleto](/images/checkout-cielo-conciliar-boleto.png)

Para realizar a Conciliação você deve:

1. Acessar o relatório de pedidos no Backoffice;
2. Filtrar os pedidos por Meio de Pagamento “Boleto” e status “PENDENTE” e identificar o boleto em questão pelo Valor;
3. Clicar no sinal de + no final da linha para acessar a página de “Detalhes”;
4. Clicar no botão de “Confirmar Pagamento” e informar a data de pagamento, para seu futuro controle;

O pedido passa para status PAGO.
O Comprador também verá o pedido como PAGO no “Backoffice do Comprador”

### Desfazendo a conciliação (pagamento) de um Boleto:

Caso a conciliação tenha sido feito errada, basta:

1. Encontrar o Pedido;
2. Entrar no seu detalhe e clicar no botão “Desfazer Pagamento”;
3. O Pedido voltará para o Status de “PENDENTE”.

### Boletos Expirados:

Se o boleto não for conciliado dentro de um prazo de 10 dias após seu vencimento, seu Status será alterado para “EXPIRADO”, para um melhor controle dos boletos vencidos. Boletos EXPIRADOS podem ser conciliados.

![Boleto](/images/checkout-cielo-boleto.png)

<aside class="notice">Validade do Boleto – Caso o boleto expire em um dia não útil, como Sábado, ele será valido até o próximo dia útil.</aside>

### Fluxo de dados do Boleto

![Fluxo Boleto](/images/checkout-fluxo-boleto.png)

## Cartão de Crédito

O Checkout Cielo aceita as principais bandeiras de crédito do Brasil e do mundo. São elas: Visa, MasterCard, American Express (Amex), Elo, Diners, Discover, JCB e Aura.

### Recebendo uma Venda de Cartão de Crédito

Pedidos por meio de cartão de crédito serão incluídos no [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) como **“AUTORIZADO”** ou **“NÃO AUTORIZADO”**, dependendo do resultado da autorização na Cielo. Caso haja algum problema no processamento deste pedido (consumidor fechou a tela, por exemplo), ele constará como **“NÃO FINALIZADO”**.

### Análise de Fraude

Pedidos **“AUTORIZADOS”** serão enviados online, ou seja, no ato da venda, para análise da ferramenta de antifraude, quando  este desenvolvimento estiver devidamente padronizado na integração. O resultado desta análise será traduzido no campo **“Indicação AF”** no Relatório de Pedido, para cada pedido.

Esta análise indicará um **“BAIXO RISCO”** ou “ALTO RISCO” para a venda em questão. Esta sugestão é o que deve guiar a decisão de se confirmar  ou cancelar a venda. A analise será apresentada no “Detalhes do Pedido”, como abaixo:

![Análise de risco](/images/checkout-cielo-analise-risco.png)

## Recorrência de Crédito no Checkout Cielo

A Recorrência é um processo de agendamento automático de transações de crédito, ou seja, é uma transação que se repetirá automaticamente, sem a necessidade do comprador acessar a tela transacional, de acordo com as regras definidas no momento do agendamento.

Transações recorrentes são ideais para modelos de negócios que envolvam o conceito de assinatura ou para transações que se repetem, mas não devem ocupar o limite de crédito do comprador.

Diferença entre transações recorrentes e parceladas:

* **Parceladas**: Se trata de uma transação dividida em “N” meses. O valor integração da transação ocupa o limite de crédito do comprador independente do valor da parcela inicial (ver exemplo). O lojista recebe o valor da venda parceladamente e não corre o risco de uma das parcelas ser negada.

**EX01**: Venda de R$1000, parcelado em 2 vezes. Apesar de o comprador pagar apenas R$500,00 na primeira parcela, o valor do limite de crédito consumido em janeiro é o integral, R$1000,00. Se o limite do cartão for inferior a R$1000,00 a transação será negada
<BR>
* **Recorrentes**: São transações diferentes realizadas no mesmo cartão em momentos previamente agendados. A primeira transação agenda as futuras vendas a partir de um intervalo X (ver exemplo).  A cada “X” intervalos haverá a cobrança no cartão de crédito. Uma venda pode ser dividida em “N” Recorrências de maneira a não ocupar o limite de crédito de um comprador (ver exemplo 02)

<BR>
**EX02**: Venda de R$1000 em 15/01/2015, com recorrência Mensal e data final em 01/06/2015. Todos no dia 15/02 haverá uma nova cobrança de R$1000, no cartão do comprador, se repetindo até 15/05, ultima data valida antes da data final.
**EX03**: Venda de R$1000 em 15/01/2015, com recorrência Mensal com pagamentos de em “2 vezes”.  A loja pode ter a inteligência de mandar ao Checkout uma transação de R$500,00 em janeiro com intervalo mensal data de encerramento 15/02/2015. Nessa situação, o limite ocupado no cartão do comprador será de R$500,00 fatura inicial, evitando o risco apresentado no Exemplo 01  

Uma transação de recorrência no Checkout Cielo possui duas configurações: “Intervalo” e “Data de encerramento”.

* **Intervalo** – Padrão de repetição e intervalo de tempo entre cada transação (Mensal, Bimestral, Trimestral, Semestral e Anual)
* **Data de encerramento** – Data que o processo de recorrência deixa de ocorrer.

Os dados do cartão de crédito do comprador ficam armazenados de forma segura dentro do Checkout Cielo, permitindo sua reutilização em uma transação recorrente. Esses dados não são acessados pelo lojista.

As transações de Recorrência ficam disponíveis no Backoffice como as outras vendas de sua loja na aba “PEDIDOS”.
A primeira transação da recorrência é uma transação normal, seguindo as regras e preferencias definidas pelo lojista no backoffice. As transações posteriores são capturadas automaticamente.

### Botão de Recorrência.

Uma maneira de realizar a recorrência dentro do Checkout é criar um botão recorrente.
Basta cadastrar o produto, incluindo um intervalo de cobrança e uma data para encerramento (Opcional), como no exemplo abaixo:

![Botão Recorrência](/images/checkout-botao-recorrencia.png)

<aside class="warning">Caso um botão seja utilizado após a “Data final” cadastrada, a transação apresentará um erro exibindo “Oppss” na tela transacional. Data pode ser editada na tela de edição do botão dentro de “Detalhes do Produto”</aside>

### Cancelamento de Recorrência no Checkout Cielo.

O cancelamento da recorrência ocorre dentro do Backoffice do Checkout Cielo, na Aba Pedidos.  Basta acessar uma transação de recorrência (marcada com o símbolo “Recorrente”), entrar em detalhes (o símbolo de “+”)

![Minhas vendas](/images/checkout-minhas-vendas.png)

Selecione uma das duas opções abaixo:

![Cancelar Recorrência](/images/checkout-cancelar-recorrencia.png)

Tipos de Cancelamento:

* **Cancelar** – Cancela a transação em questão, sem afetar as futuras transações de recorrência.
* **Cancelar Recorrência** - Cancela o agendamento de futuras transações como um todo, encerrando a recorrência. Não cancela a transação atual nem as que já ocorreram.

<aside class="warning">A Recorrência ocorre somente para Cartões de crédito e para produtos tipo “SERVIÇO” e “BENS DIGITAIS”.</aside>
<aside class="warning">A Recorrência é iniciada no momento da AUTORIZAÇAO, NÃO NA CAPTURA.</aside>
<aside class="warning">Se a recorrência não tiver uma data para ser finalizada, ela se repetirá automaticamente até ser cancelada manualmente.</aside>
<aside class="warning">A Recorrência deve ser habilitada em sua Afiliação, caso contrario, as transações agendadas serão negadas.</aside>

### Fluxo do Cartão de Crédito

![Fluxo de crédito](/images/checkout-fluxo-credito.png)

## Cartão de débito

O Checkout Cielo aceita as principais bandeiras de cartão de débito do mercado: Visa e MasterCard. As transações de cartão de débito possuem como participantes os bancos emissores, que por sua vez usam dos mesmos recursos para transações online (token, cartão de senhas e etc) para o processo de autenticação. Consulte a relação de emissores participantes no Suporte Cielo e-Commerce.

* **E-mail**: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
* **Telefones**:
    * **Capitais**: (sem DDD) 4002.9700
    * **Demais Localidades**: 0800.570.1700
    * **Do exterior**: +55 (11) 2860.1348

A autenticação da transação garantirá uma segurança extra ao lojista contra contestações dos consumidores (chargeback). O produto débito obrigatoriamente exige uma transação autenticada, caso contrário, a transação não é autorizada. A autenticação é obrigatória para transações de débito e opcional para o crédito.

### Passo a passo da transação de cartão de débito:

1. Cliente acessa o internet banking
2. Digita a senha do cartão
3. Banco confirma a senha
4. Transação realizada

### Débito Online

Pedidos vendidos por meio de Débito online serão incluídos no [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) como PENDENTE, PAGO, NÃO AUTORIZADO ou NÃO FINALIZADO, dependendo do resultado da autorização junto ao Banco.

* **Pendente** - Corresponde quando o comprador ao finalizar o pedido e não obtem resposta por parte do Banco, ou seja, não conseguir nem carregar a página do Banco para inserir os dados para o Débito.
* **Pago** - Corresponde quando o comprador conseguir realizar o pagamento do débito com sucesso.
* **Não Autorizado** - Apresentado para o Lojista quando o comprador tentar realizar uma transação via débito e não ter saldo para a transação.
* **Não Finalizado** - Apresentado para o Lojista caso o comprador tenha algum problema para finalizar o pagamento do meio Débito, seja fechando a janela do banco ou simplesmente nem chegando à tela do banco.

### Fluxo Débito Online

![Fluxo Débito Online](/images/checkout-fluxo-debito.png)

## Diferença entre estorno e cancelamento

* **Cancelamento:** é feito no mesmo dia da captura, devolvendo o limite ao cartão do comprador em até 72h conforme regras do banco emissor do cartão. Não é apresentado na fatura do comprador;
* **Estorno:** a partir do dia seguinte da captura, o valor é “devolvido” na fatura do comprador em até 300 dias. É apresentado na fatura do comprador.

## Captura/Cancelamento Automático

<aside class="notice">Veja a diferença entre cancelamento e estorno em <a href="#diferença-entre-estorno-e-cancelamento">Diferença entre estorno e cancelamento</a></aside>

### Captura automática

As vendas **“AUTORIZADAS”**, e com **“BAIXO RISCO”** na ferramenta de  antifraude poderão ser **CAPTURADAS** automaticamente pelo sistema. Para isso é preciso configurar no o [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/). Após essa configuração, o status apresentado será **“PAGO”**. Esta venda será então confirmada (capturada) na Cielo.

![Cancelamento e captura automático](/images/checkout-cielo-cancelamento-captura-automatico.png)

### Cancelamento Automático

As vendas “AUTORIZADAS”, e com “ALTO RISCO”  na ferramenta de  antifraude poderão ser CANCELADAS automaticamente pelo sistema. Para isso é preciso configurar no o [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/). Após essa configuração, o status apresentado será “CANCELADO”. Esta venda será então cancelada (desfeita) na Cielo.

![Cancelamento e captura automático](/images/checkout-cielo-cancelamento-captura-automatico.png)

<aside class="warning">Atenção! Você tem a opção de escolher a melhor integração para o seu negócio, a captura/cancelamento manual ou automático é feito diretamente pelo seu Backoffice.</aside>

![Cancelamento e captura automáticos](/images/checkout-cielo-anti-fraude-cancelamento-captura.png)

## Captura/Cancelamento manual

<aside class="notice">Veja a diferença entre cancelamento e estorno em <a href="#diferença-entre-estorno-e-cancelamento">Diferença entre estorno e cancelamento</a></aside>

As vendas **“AUTORIZADAS”** aguardam uma decisão de confirmação ou cancelamento. E esta decisão deve vir em conformidade com a análise de fraude, caso esta funcionalidade esteja devidamente parametrizada na integração.

A confirmação da venda deve ser feita pelo botão **CAPTURAR**, na aba  **“Pedidos”**, no [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/). Após a confirmação, o status mudará para **“PAGO”**. Esta venda será então confirmada (capturada) na Cielo.

Já o  cancelamento deve ser feito pelo botão **CANCELAR** na mesma seção No [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/). Após o cancelamento, o status mudará para **“CANCELADO”**. Esta venda será então cancelada (desfeita) na Cielo.

<aside class="warning">Atenção! Você tem até 5 dias pra confirmar a venda! Caso isso não seja feito ela não será mais válida na Cielo, e o limite reservado para sua loja/venda será liberado. Este é um procedimento padrão para todas as lojas.</aside>

<aside class="warning">Quando o prazo de confirmação da venda autorizada expira, os pedidos passarão automaticamente para o status “EXPIRADO”. Isso acontecerá no sexto dia após a data de autorização (data da venda)</aside>

## Estorno de Venda

Caso a venda já tenha sido confirmada (status PAGO) ela pode ser ainda, futuramente, estornada. Para isso, basta clicar no botão no Detalhe do Pedido.

### Vendas de Cartões de Crédito Expiradas

Quando o prazo de confirmação da venda autorizada expira, os pedidos passarão automaticamente para o status “EXPIRADO”. Isso acontecerá no sexto dia após a data de autorização (data da venda)

## Chargeback

O consumidor (comprador) pode por algum motivo cancelar a compra diretamente com o banco emissor do cartão de crédito. Caso isso ocorra  o lojista receberá da Cielo um aviso de Chargeback de “Não Reconhecimento de compra” ou caso tenha havido uma compra com cartão fraudado, você recebera um aviso de Chargeback por “Fraude”.

![Chargeback](/images/checkout-cielo-chargeback.png)

Essa comunicação não é feita via o [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/), mas sim pelo extrato de venda da Cielo, destacada como um ajuste financeiro. O extrato de vendas está disponivel no site da Cielo [www.cielo.com.br na aba “Acessar Minha conta”](https://www.cielo.com.br/minha-conta).

![Acessar minha conta](/images/acessar-minha-conta.png)

Após esse recebimento, no próprio site da Cielo  é possivel acessar o [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) e sinalizar o pedido como tendo recebido um Chargeback, pra seu melhor controle. Basta entrar no Detalhe do Pedido e clicar no botão “ChargeBack”, e seu status passará a ser “CHARGEBACK”.

## Frete

O Checkout Cielo suporta diferentes tipos de frete, que podem ser utilizados de maneira diferenciada de acordo com as opções oferecidas em sua loja. As opções disponíveis são:

* Correios
* Frete Fixo
* Frete Grátis
* Sem Frete

A maneira e o tipo de frete que ficará ativo em sua loja é configurado no Backoffice do Checkout Cielo. Devido ao aspecto mais técnico, sugerimos que as configurações de frete sejam feitas pelo desenvolvedor. Diferentes métodos de cálculo de frete:

### Cálculo de frete próprio

É possível selecionar 1 ou mais opções de frete. Elas serão apresentadas ao consumidor de acordo com a sua escolha entre as opções disponíveis. O valor selecionado pelo consumidor será adicionado ao valor total da compra.

### Contrato próprio com os Correios

* O Checkout Cielo usará este número de contrato para fazer o cálculo de frete, utilizando assim a tabela de frete que você possui acordada junto aos Correios. Desse modo, o checkout apresentará todas as opções de frete dos Correios (Sedex, Sedex 10, Sedex. Hoje e PAC, entre outras) para o consumidor escolher, de acordo com o CEP de destino digitado. O valor selecionado pelo Consumidor será adicionado ao valor total da compra.
* Usar o cálculo de frete dos Correios do Checkout Cielo. O Checkout Cielo apresentará todas as opções de frete dos Correios (Sedex, Sedex 10, Sedex Hoje e PAC, entre outras) para o consumidor escolher, de acordo com o CEP de destino digitado. O valor selecionado pelo consumidor será adicionado ao valor total da compra.
* Seleção do Frete no carrinho e não no Checkout Cielo. O Checkout Cielo apresentará somente a tela de escolha do meio de pagamento para o consumidor. O valor do frete já estará embutido no valor final

<aside class="notice">O consumidor não poderá alterar o endereço de entrega na tela do Checkout Cielo</aside>
