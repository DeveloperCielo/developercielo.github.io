---
layout: manual
title: Cartão Protegido Braspag
description: Integração técnica Tokenização Braspag
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

# Introdução ao Cartão Protegido

A plataforma do **CARTÃO PROTEGIDO** é uma armazenadora segura de cartões de crédito. Os dados nela armazenados seguem as normas PCI, que garante a integridade das informações dos cartões armazenados.
<br><br>
O gateway PAGADOR (BRASPAG) está integrado ao **CARTÃO PROTEGIDO**, facilitando o envio e processamento de transações de cartão de crédito via token.

## Sobre o Produto

Enquanto produto, o CARTÃO PROTEGIDO, por ser uma solução para resolver o problema de armazenamento seguro de dados de cartão de crédito, pode ser utilizado para diversos fins, como:

* **Compra com 1 clique**: A “compra com 1 clique” permite que um pagamento online, via cartão de crédito, seja feito pulando a etapa de preenchimento dos dados para pagamento ou até mesmo de todo o processo do carrinho de compras, pois os dados do cartão já foram previamente informados pelo comprador em compras passadas e serão replicados em futuras compras mediante sua autorizaçãol.
* **Cobrança Recorrente**: Estabelecimentos que já possuam uma solução interna de gerenciamento de recorrências podem utilizar a plataforma apenas para a parte sensível: armazenar os dados de cartão de crédito e processar via PAGADOR, as cobranças nas Adquirentes utilizando apenas o token. (Não é obrigatório que a transação seja processada via Pagador)
* **Re-tentativa de envio de transação (venda)**: Para estabelecimentos que represam os dados da venda para passar num segundo momento, sendo para retentar o envio de uma transação de cartão de crédito para uma Adquirente ou para fazer algum procedimento interno antes de autorizar a venda (validação de estoque, análise de fraude), a plataforma atende perfeitamente esta finalidade. O estabelecimento precisa conhecer e manipular apenas um token, mantendo-se aderente com as regras de segurança da indústria de cartões de crédito.
* Ou para qualquer outra finalidade, onde se faça necessário armazenar dados de um cartão de crédito de forma segura, mesmo que temporariamente

## Sobre este manual

Este manual tem como objetivo orientar o desenvolvedor da loja sobre a integração com a plataforma **CARTÃO PROTEGIDO**, descrevendo as funcionalidades existentes e os métodos a serem utilizados, listando informações a serem enviadas e recebidas e provendo exemplos. 

<aside class="warning">Para receber a URL de Produção, solicite à nossa equipe de implantação através da ferramenta Suporte.</aside>

## Sobre a Integração

Nas seções abaixo, estão graficamente representados, os fluxos do processo de venda. Existem 3 maneiras de integrar o produto:

* Diretamente pela plataforma do CARTÃO PROTEGIDO;
* Via plataforma PAGADOR, utilizando Webservice;
* Via plataforma PAGADOR, utilizando Post de Dados.

Os dados necessários para armazenar um cartão de crédito na plataforma são: CPF do Cliente, Nome do Cliente, Nome do Portador, Número do Cartão e Data de Validade. O código de segurança não é armazenado (vide seção Código de
Segurança).

<aside class="notice">A plataforma do CARTÃO PROTEGIDO armazena de forma segura, 100% PCI Compliance, os dados dos cartões de crédito.</aside>

<aside class="warning">Para garantir uma maior segurança, apenas os IP’s previamente cadastrados do Estabelecimento poderão consultar um número de cartão ou autorizar uma transação utilizando a chave do Cartão Protegido (JustClickKey).</aside>

<aside class="notice">Como a autorização de uma transação é via PAGADOR, todas as funcionalidades de confirmação da transação - Segundo Post (post de confirmação), e Terceiro Post (sonda) - permanecem funcionando da mesma forma. </aside>

# **PARÂMETRO** JustClickAlias

Este parâmetro tem por finalidade facilitar o armazenamento, por parte do cliente, de informações referentes a um Cartão Protegido. O cliente poderá, no momento do salvamento do cartão, criar um Alias (apelido) que identificará esse cartão na Plataforma CARTÃO PROTEGIDO. Outra vantagem, é o fato desse Alias poder ser associado a um novo JustClickKey, o que facilitaria a troca de um cartão quando, por exemplo, a validade deste expirar. Para isso, o lojista deveria indicar que o JustClickKey está desabilitado. Dessa forma, o Alias associado a ele ficaria liberado para ser utilizado com um novo JustClickKey.

## Forma Correta de Associação

Um Alias pode ser associado a um novo Token, desde que antes seja desassociado do Token antigo, conforme indicado no exemplo abaixo:

|Merchant Id|JustClickKey (Token)|Alias|Enabled|
|-----------|--------------------|-----|-------|
|LOJA A|Token 1|XPTO|0|
|LOJA A|Token 2|XPTO|0|
|LOJA A|Token 3|XPTO|1|

<aside class="notice">Obs.: A desassociação ocorrerá após a execução do método InvalidateCreditCard </aside>

## Forma de Associação Não Aceita

Um Alias pode ser associado a um novo Token, desde que antes seja desassociado do Token antigo, no exemplo abaixo está indicada uma forma que não permitiria essa associação, pois o Alias só estará liberado para uma nova associação
desde que esteja desvinculado de um determinado Token:

|Merchant Id|JustClickKey (Token)|Alias|Enabled|
|-----------|--------------------|-----|-------|
|LOJA A|Token 1|XPTO|1|
|LOJA A|Token 2|XPTO|1|
|LOJA A|Token 3|XPTO|1|

# FLUXO DE AUTORIZAÇÃO VIA PLATAFORMA CARTÃO PROTEGIDO

Abaixo está representado o fluxo de uma requisição para salvar um cartão de um cliente durante uma venda, seguido de outro fluxo onde o mesmo cliente realiza uma compra via CARTÃO PROTEGIDO.

Com a permissão do cliente para salvar seu cartão, o estabelecimento deve:

1. Enviar a tentativa de autorização da compra em questão via Gateway. Processo padrão que já acontece hoje
2. Receber o resultado da autorização
3. Enviar os dados do cartão para armazenamento no CARTÃO PROTEGIDO
4. Receber a “JustClickKey”, que é a chave que vai representar a dupla “cartão de crédito-cliente” para futuras “compras com 1 clique”, e armazená-la.

Quando o cliente voltar ao site para fazer uma nova compra e se logar, o site pode apresentar a opção de “compra com 1 clique”, e o fluxo será:

1. Chamar a autorização da transação direto pela plataforma do CARTÃO PROTEGIDO, passando a “JustClickKey” e/ou “JustClickAlias” do cliente e, opcionalmente, o CVV (vide seção Código de Segurança)
2. Receber o resultado da autorização

<img src="/images/autorizacaocomopcaosalvarcartao.PNG">

# FLUXO DE AUTORIZAÇÃO VIA PAGADOR

Abaixo estão representados os fluxos de uma requisição para salvar um cartão de um cliente durante uma venda e de uma compra via CARTÃO PROTEGIDO, ambas utilizando a integração PAGADOR/CARTÃO PROTEGIDO

## AUTORIZAÇÃO COM OPÇÃO SALVAR CARTÃO

<img src="/images/pgautorizacaocomopcaosalvarcartao.PNG">

1. Enviar a tentativa de autorização da compra em questão via PAGADOR, contendo o parâmetro SaveCreditCard;
2. O PAGADOR envia os dados de cartão de crédito para a plataforma CARTÃO PROTEGIDO, à fim de armazenar esses dados;
3. CARTÃO PROTEGIDO envia resposta do armazenamento dos dados do cartão ao PAGADOR;
4. Como resultado, o PAGADOR envia resposta da autorização e do armazenamento, ao cliente;

## AUTORIZAÇÃO COM CARTÃO JÁ SALVO

<img src="/images/pgautorizacaocomcartaosalvo.PNG">

1. Enviar a tentativa de autorização da compra em questão via PAGADOR, contendo o parâmetro CredicardToken;
2. O PAGADOR envia os dados de cartão de crédito para a plataforma CARTÃO PROTEGIDO, à fim de recuperar os dados previamente salvos do cartão;
3. CARTÃO PROTEGIDO envia resposta dos dados do cartão ao PAGADOR;
4. Como resultado, o PAGADOR envia resposta da autorização ao cliente;

<aside class="notice">Note que toda a comunicação é feita pelo estabelecimento através da plataforma PAGADOR. Para obter todas as informações sobre os métodos dos Webserivces e seus parâmetros, assim como aqueles da integração via Post, solicite os devidos manuais da plataforma PAGADOR.</aside>

## AUTORIZAÇÃO VIA POST

Abaixo, fluxo de autorização via Post. Mostrando uma transação onde o cliente possui a chave gerada pelo Cartão Protegido e outra onde essa chave ainda irá ser criada e enviada ao cliente (CredicardToken).

<img src="/images/pgautorizacaopost.PNG">

<aside class="warning">O parâmetro “CreditCardToken” retornado pelo PAGADOR é a própria “JustClickKey” do CARTÃO PROTEGIDO.</aside>

# CÓDIGO DE SEGURANÇA (CVV)

O código de segurança é obrigatório para que uma autorização, em compras não presenciais, seja aceita pelo banco emissor do cartão. Ele é mais um mecanismo de segurança no processo anti-fraude, onde busca-se validar que a pessoa que está utilizando o cartão seja de fato a dona dele. Por isso, as regras da indústria de cartões (PCI) permitem que se armazene o número do cartão e a validade, mas nunca o código de segurança. Este deve ser sempre solicitado no ato da compra para validação. Sendo a BRASPAG uma empresa PCI compliance, ela não armazena o código de segurança, que deverá ser solicitado pelo estabelecimento no ato da confirmação da venda via CARTÃO PROTEGIDO, caso seja obrigatório o uso da Adquirente em questão.

Estabelecimentos que possuem o modelo de negócio baseado em recorrência, como, por exemplo, assinaturas de serviços, já possuem afiliação liberada para uso sem CVV.

<aside class="notice">Esta condição de recorrência é concedida exclusivamente pelas Adquirentes, não dependendo da BRASPAG.</aside>

# DICAS DE IMPLEMENTAÇÃO

## IMPLEMENTANDO JUSTCLICKSHOP (COMPRA COM 1 CLIQUE)

Para fazer uma venda através de um clique, é necessário que o estabelecimento já possua uma autorização, fornecida pelo cliente, para poder armazenar os dados de seu cartão de crédito. Desta forma, nas próximas compras ele pode optar por fazer o pagamento com o cartão de crédito previamente salvo. Concedida a autorização para o armazenamento, basta que o estabelecimento envie os dados do cartão para a plataforma do CARTÃO PROTEGIDO, recebendo como resposta uma chave que representa a dupla “cartão de crédito-cliente”. Para cada cartão distinto que o cliente autorize o armazenamento, o CARTÃO PROTEGIDO fornecerá uma chave também distinta.

Nas próximas vendas para este cliente, o estabelecimento poderá oferecer a “compra com 1 clique” como forma de pagamento. Isto pode ser feito através de um botão de “comprar com um clique” no produto/ serviço selecionado, ou como mais um meio de pagamento no processo de finalização do carrinho de compras. Para processar uma venda via “compra com 1 clique”, basta que seja passado para a plataforma do CARTÃO PROTEGIDO a chave previamente fornecida que identifique o “cartão de crédito-cliente” e, dependendo de qual serviço do CARTÃO PROTEGIDO o estabelecimento opte por utilizar, a plataforma irá:

* Devolver os dados do cartão para o estabelecimento autorizar a transação;
* Autorizar direto a transação na Operadora via PAGADOR (sendo este o mais indicado, por garantir maior segurança dos dados).

### BOAS PRÁTICAS

Salvar o número do cartão mascarado para apresentar ao cliente qual cartão ele tem habilitado para “a compra com 1 clique” no site;

* Opcionalmente, também salvar a data de validade, para ativamente comunicar ao cliente que o cartão que ele tem armazenado expirou e sugerir a troca;
* Apenas salvar o cartão na plataforma do CARTÃO PROTEGIDO caso ele tenha sido autorizado com sucesso na última compra do cliente;
* Segurança do login e senha dos usuarios do site – senhas muito fracas são facilmente descobertas e o fraudador consegue fazer uma compra mesmo sem ter o cartão (no caso de não solicitação do CVV pelo site);
* Controlar variáveis de sessão para evitar que o usuário (login do cliente) permaneça logado no site e outra pessoa acesse depois fazendo “compras via 1 clique” com este login (ex: usuários conectados em lan houses).

## IMPLEMENTANDO COBRANÇA RECORRENTE

Para cada pedido a ser cobrado com recorrência de cartão de crédito, o estabelecimento deve salvar os dados do cartão de crédito na plataforma do Cartão Protegido e receber a chave (JustClickKey) que representa aquele “pedido-cartão”. Chegado o dia da cobrança da recorrência, basta que o método de autorização de cartão seja chamado, passando os dados para pagamento e, ao invés dos dados do cartão (número + data de validade), a chave que o representa (JustClickKey ou JustClickAlias).

Se houver necessidade de troca de cartão para determinado pedido, basta que este novo cartão seja salvo no CARTÃO PROTEGIDO, e a nova chave gerada seja associada ao pedido na plataforma do estabelecimento. Não há necessidade de cancelamento/ exclusão do cartão na plataforma.

Se houver a necessidade de associar um Alias já existente a um novo JustClickKey, basta desabilitar o JustClickKey antigo para deixar o Alias associado a ele, liberado para uma nova associação.

Se o estabelecimento optar por não processar a autorização da transação pela integração PAGADOR/CARTÃO PROTEGIDO, é fundamental que em nenhum momento o número do cartão seja gravado (persistido em banco ou em seção do browser) para que a segurança das informações seja mantida.

# MÉTODOS DO CARTÃO PROTEGIDO

Abaixo estão representados os fluxos dos webmethods da plataforma do CARTÃO PROTEGIDO, para execução dos procedimentos via webservice descritos nas seções anteriores.

## SALVANDO um cartão de crédito

O método SaveCreditCard recebe o objeto SaveCreditCardRequest e deve ser chamado para salvar os dados de uma cartão de crédito e receber a chave identificadora (token) da dupla “cartão de crédito-cliente” para futuras autorizações via “compra com 1 clique”. Não se deve informar RequestId repetidos para essa operação, pois essa informação será necessária para recuperar o JustClickKey na utilização do método GetJustClickKey().

<img src="/images/savecreditcard.PNG">

### Requisição

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|MerchantKey|Guid|Chave da loja JustClick|Sim|
|CustomerIdentification|string| CPF do comprador|Não|
|CustomerName|string|Nome do comprador|Sim|
|CardHolder|string|Nome do Portador do cartão de crédito|Sim|
|CardNumber|string|Número do cartão de crédito|Sim|
|CardExpiration|string|Validade do cartão de crédito. Formato: mm/yyyy|Sim|
|JustClickAlias|string|Alias (Apelido) do cartão de crédito|Não|
|RequestId|Guid|Identificador da requisição enviada|Sim|
|Version|string|Versão do método. Padrão: 2.0|Não|

### Resposta

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|JustClickKey|Guid|Token (Chave identificadora) que representa o cartão de crédito|Sim|
|CorrelationId|Guid|Identificador da resposta recebida, que será o próprio “RequestId” enviado no objeto de request|Sim|
|Success|bool|Indicador de sucesso no fluxo da operação (true ou false). No caso de FALSE, significa que a requisição não foi concluída com êxito e portanto todos os demais parâmetros de retorno podem ser ignorados|Não|
|ErrorReportCollection|List<ErrorReport>|Lista de erros/validações gerados no fluxo da operação. Vide seção “Mapa de Erros”|Não|

## RECUPERAÇÃO do número do Cartão de Crédito, com retorno Mascarado

O método GetMaskedCreditCard recebe o objeto GetMaskedCreditCardRequest, e deve ser chamado para consultar os dados de um cartão de crédito de forma PCI Compliance, ou seja, apenas o número mascarado do cartão é retornado no método GetMaskedCreditCardResponse, juntamente com as demais informações não sensíveis. 

<img src="/images/getcreditcard.PNG">

### Requisição

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|MerchantKey|Guid|Chave da loja JustClick|Sim|
|JustClickKey|Guid|Token que representa o cartão de crédito|Sim|
|JustClickAlias|string|Alias (Apelido) do cartão de crédito|Não|
|RequestId|Guid|Identificador da requisição enviada|Não|
|Version|string|Versão do método. Padrão: 2.0|Não|

### Resposta

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|CardHolder|string|Portador do cartão de crédito|Sim|
|CardExpiration|string|Validade do cartão de crédito. Formato: mm/yyyy|Sim|
|MaskedCardNumber|string|Número do cartão de crédito mascarado|Sim|
|CorrelationId|Guid|Identificador da resposta recebida, que será o próprio|Não|
|RequestId|Guid|enviado no objeto de request|Não|
|Success|bool|Indicador de sucesso no fluxo da operação (true ou false). No caso de FALSE, significa que a requisição não foi concluída com êxito e portanto todos os demais parâmetros de retorno podem ser ignorados|Não|
|ErrorReportCollection|List<ErrorReport>|Lista de erros/validações gerados no fluxo da operação. Vide seção “Mapa de Erros”|Não|

## RECUPERANDO informações sobre o Cartão de Crédito

O método GetCreditCard recebe o objeto GetCreditCardRequest, e deve ser chamado para consultar os dados de um cartão de crédito, incluindo o número aberto do cartão. Em geral, esse método será utilizado apenas quando se desejar autorizar a transação via outra plataforma que não o PAGADOR. Este método deve ser usado com muito cuidado por ter informações sensíveis.

<img src="/images/getcreditcardraw.PNG">

### Requisição

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|MerchantKey|Guid|Chave da loja JustClick|Sim|
|JustClickKey|Guid|Token que representa o cartão de crédito|Sim|
|JustClickAlias|string|Alias (Apelido) do cartão de crédito|Não|
|RequestId|Guid|Identificador da requisição enviada|Não|
|Version|string|Versão do método. Padrão: 2.0|Não|

### Resposta

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|CardHolder|string|Portador do cartão de crédito|Sim|
|CardNumber|string|Número do cartão de crédito aberto|Sim|
|CardExpiration|string|Validade do cartão de crédito. Formato: mm/yyyy|Sim|
|MaskedCardNumber|string|Número do cartão de crédito mascarado|Sim|
|CorrelationId|Guid|Identificador da resposta recebida, que será o próprio “RequestId” enviado no objeto de request|Não|
|RequestId|Guid|enviado no objeto de request|Não|
|Success|bool|Indicador de sucesso no fluxo da operação (true ou false). No caso de FALSE, significa que a requisição não foi concluída com êxito e portanto todos os demais parâmetros de retorno podem ser ignorados|Não|
|ErrorReportCollection|List<ErrorReport>|Lista de erros/validações gerados no fluxo da operação. Vide seção “Mapa de Erros”|Não|

## RECUPERANDO uma JustClickKey

O método GetJustClickKey recebe o objeto GetJustClickKeyRequest, e deve ser chamado para consultar uma JustClickKey. Em geral, esse método será utilizado apenas quando o lojista, por algum motivo, perder a JustClickKey
de um usuário. Por questões de segurança, ao utilizar esse método 5 (cinco) vezes consecutivas passando um ‘SaveCreditCardRequestId’ inválido, a loja ficará impossibilitada de utilizar o método até que entre em contato com o suporte da Braspag para efetuar a liberação.

<img src="/images/getjustclickkey.PNG">

### Requisição

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|MerchantKey|Guid|Chave da loja JustClick|Sim|
|SaveCreditCardRequestId|Guid|Identificador da requisição ao método SaveCreditCard (parâmetro “RequestId”) que resultou no armazenamento do cartão de crédito na plataforma do Cartão Protegido.|Sim|
|RequestId|Guid|Identificador da requisição enviada|Não|
|Version|string|Versão do método. Padrão: 2.0|Não|

### Resposta

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|JustClickKey|Guid|Token que representa o cartão de crédito|Sim|
|CorrelationId|Guid|Identificador da resposta recebida, que será o próprio “RequestId” enviado no objeto de request|Não|
|Success|bool|Indicador de sucesso no fluxo da operação (true ou false). No caso de FALSE, significa que a requisição não foi concluída com êxito e portanto todos os demais parâmetros de retorno podem ser ignorados|Não|
|ErrorReportCollection|List<ErrorReport>|Lista de erros/validações gerados no fluxo da operação. Vide seção “Mapa de Erros”|Não|

## Invalidando um Cartão de Crédito

O método InvalidateCreditCard recebe o objeto InvalidateCreditCardRequest, e deve ser chamado para invalidar um cartão de crédito. Um cartão inválido não pode ser utilizado numa autorização do PAGADOR

<img src="/images/invalidatecreditcard.PNG">

### Requisição

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|MerchantKey|Guid|Chave da loja JustClick|Sim|
|JustClickKey|Guid|Token que representa o cartão de crédito|Sim|
|JustClickAlias|string|Alias (Apelido) do cartão de crédito|Não|
|RequestId|Guid|Identificador da requisição enviada|Não|
|Version|string|Versão do método. Padrão: 2.0|Não|

### Resposta

|Parâmetros|Tipo|Descrição|Obrigatório?|
|----------|----|---------|------------|
|CorrelationId|Guid|Identificador da resposta recebida, que será o próprio “RequestId” enviado no objeto de request|Não|
|Success|bool|Indicador de sucesso no fluxo da operação (true ou false). No caso de FALSE, significa que a requisição não foi concluída com êxito e portanto todos os demais parâmetros de retorno podem ser ignorados|Não|
|ErrorReportCollection|List<ErrorReport>|Lista de erros/validações gerados no fluxo da operação. Vide seção “Mapa de Erros”|Não|

## Detalhes importantes no consumo dos métodos

* **“RequestID”/ “CorrelationID”**: No envio do objeto de Request, deve ser enviado no parâmetro “RequestID” um guid qualquer que funcionará como uma chave identificadora daquela requisição. Após processamento do Request em questão, o objeto de Response será montado com o devido resultado e o parâmetro “CorrelationID” conterá o mesmo guid enviado no Request (“RequestID”). Desta forma é possível se certificar de qual Request o objeto Response é
proveniente;

* **“Success”**: Todo objeto de Response possui o parâmetro “Success” que indica se a requisição foi processada com sucesso ou não pela aplicação. Quando o retorno do “Sucess” for FALSE significa que houve falha no recebimento e/ou processamento, ou seja, o método não conseguiu executar a função a qual ele se propõe. Assim, este deve ser o primeiro parâmetro a ser checado no retorno de uma requisição. Sendo FALSE, todo o processamento subsequente
deve ser abortado e o erro analisado e tratado.

* **“ErrorReportCollection”**: Todo objeto de Response possui o parâmetro “ErrorReportCollection” que conterá o(s) erro(s) ocorrido(s) no processamento, ou seja, quando o parâmetro “Sucess” for FALSE. Erro de processamento pode ser devido a um parâmetro incorreto ou a falta de um parâmetro esperado.

# MAPA DE ERROS

Abaixo segue a lista dos possíveis erros retornado pelos métodos no campo “ErrorReportCollection”

|Código|Mensagem|
|------|--------|
|701|Merchant key can not be null|
|702|Merchant key is not valid|
|703|JustClick key can not be null|
|704|JustClick key is not valid|
|705|Customer name can not be null|
|706|Card holder can not be null|
|707|Card number can not be null|
|709|Card expiration can not be null|
|710|Card expiration is not valid (Format: MM/yyyy)|
|720|Merchant JustClick not found|
|724|Credit card not exists for merchant|
|731|Invalid IP address|
|732|SaveCreditCardRequestId can not be null|
|733|SaveCreditCardRequestId not found for this Merchant|
|734|Numbers of attempts to Recovery JustClickKey exceeded|
|735|Save Credit Card Request Id Already Exists|
|747|Empty Request|
|749|JustClickAlias Already Exists|
|750|Extra Data Name Is Not Valid|
|751|JustClickAlias Is Not Filled|
|752|Data Collection Can Not Be Empty|
|753|JustClickAlias Is Mandatory|
|799|Undefined error|
