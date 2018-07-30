---
layout: manual
title: Manual de Integração
description: Integração Técnica via XML
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - Webservice 1.5
language_tabs:
  xml: XML
---

# Integração Webservice 1.5

<aside class="warning">O Webservice 1.5 foi descontinuado. O documento abaixo existe como base de conhecimento para clientes ja integrados. Novos cadastros não serão realizados pelo atendimento Cielo</aside>

> Para novas integrações, veja [API Cielo E-commerce](https://developercielo.github.io/manual/cielo-ecommerce)

O objetivo desta documentação é orientar o desenvolvedor sobre como integrar com a solução Webservice da Cielo, descrevendo as funcionalidades, os métodos a serem utilizados, listando informações a serem enviadas e recebidas, e provendo exemplos.

O mecanismo de integração com o Cielo eCommerce é simples, de modo que apenas conhecimentos intermediários em linguagem de programação para Web, requisições HTTP/HTTPS e manipulação de arquivos XML, são necessários para implantar a solução Cielo eCommerce com sucesso. É importante destacar para utilizar essa plataforma, o website deve estar em confirmidade com regras de segurança ou utilizar a certificação PCI. Para dúvidas sobre segurança web, favor encaminhar email para: [Segurança Web](mailto:e-seg@cielo.com.br).

Após a conclusão do credenciamento e recebimento das instruções é preciso desenvolver a integração utilizando como guia este manual. Assim que a integração estiver concluída, é necessário preencher completamente o formulário de homologação e enviá-lo para o Suporte Web do Cielo eCommerce que informará ao estabelecimento a chave de segurança.

Por fim, após o término do desenvolvimento, é preciso dar início à homologação junto à Cielo
para iniciar a operação no ambiente de produção.

<aside class="notice">Veja a seção <a href="#testes-e-homologação">Homologação</a> para instruções sobre o processo de homologação</aside>

## Suporte Cielo

Após a leitura deste manual, caso ainda persistam dúvidas (técnicas ou não), a Cielo disponibiliza o suporte técnico 24 horas por dia, 7 dias por semana em idiomas (Português e Inglês), nos seguintes contatos:

* +55 4002-9700 – *Capitais e Regiões Metropolitanas*
* +55 0800-570-1700 – *Demais Localidades*
* +55 11 2860-1348 – *Internacionais*
  * Opção 1 – *Suporte técnico;*
  * Opção 2 – *Credenciamento eCommerce.*
* Email: [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)

## Glossário

Para facilitar o entendimento, listamos abaixo um pequeno glossário com os principais termos relacionados ao eCommerce, ao mercado de cartões e adquirencia:

* **Autenticação**: processo para assegurar que o comprador é realmente aquele quem diz ser (portador legítimo), geralmente ocorre no banco emissor com uso de um token digital ou cartão com chaves de segurança.
* **Autorização**: processo para verificar se uma compra pode ou não ser realizada com um cartão. Nesse momento, são feitas diversas verificações com o cartão e com o portador (ex.: adimplência, bloqueios, etc.) É também neste momento que o limite do cartão é sensibilizado com o valor da transação.
* **Cancelamento**: processo para cancelar uma compra realizada com cartão.
* **Captura**: processo que confirma uma autorização que foi realizada previamente. Somente após a captura, é que o portador do cartão poderá visualizá-la em seu extrato ou fatura.
* **Chave de acesso**: é um código de segurança específico de cada loja, gerado pela Cielo, usada para realizar a autenticação e comunicação em todas as mensagens trocadas com a Cielo. Também conhecido como chave de produção e key data.
* **Comprador**: é o aquele que efetua compra na loja virtual.
* **Emissor (ou banco emissor)**: É a instituição financeira que emite o cartão de crédito, débito ou voucher.
* **Estabelecimento comercial ou EC**: Entidade que responde pela loja virtual.
* **Gateway de pagamentos**: Empresa responsável pelo integração técnica e processamento das transações.
* **Número de credenciamento**: é um número identificador que o lojista recebe após seu credenciamento junto à Cielo.
* **Portador**: é a pessoa que tem o porte do cartão no momento da venda.
* **SecureCode**: programa internacional da Mastercard para possibilitar a autenticação do comprador no momento de uma compra em ambiente eCommerce.
* **TID (Transaction Identifier)**: código composto por 20 caracteres que identificada unicamente uma transação Cielo eCommerce.
* **Transação**: é o pedido de compra do portador do cartão na Cielo.
* **VBV (Verified by Visa)**: Programa internacional da Visa que possibilita a autenticação do comprador no momento de uma compra em ambiente eCommerce.

<aside class="notice">Acesse http://www.mastercard.com.br/securecode para mais detalhes sobre o SecureCode.</aside>

<aside class="notice">Acesse http://www.verifiedbyvisa.com.br para mais detalhes sobre o VBV.</aside>

## Produtos e Bandeiras suportadas

A versão atual do Webservice Cielo possui suporte às seguintes bandeiras e produtos:

|Bandeira|Crédito à vista|Crédito parcelado Loja|Débito|Voucher|
|---|---|---|---|---|
|Visa|Sim|Sim|Sim|*Não*|
|Master Card|Sim|Sim|Sim|*Não*|
|American Express|Sim|Sim|*Não*|*Não*|
|Elo|Sim|Sim|*Não*|*Não*|
|Diners Club|Sim|Sim|*Não*|*Não*|
|Discover|Sim|*Não*|*Não*|*Não*|
|JCB|Sim|Sim|*Não*|*Não*|
|Aura|Sim|Sim|*Não*|*Não*|
|Hipercard|Sim|Sim|*Não*|*Não*|

# Certificado Extended Validation

## O que é Certificado SSL?

O Certificado SSL para servidor web oferece autenticidade e integridade dos dados de um web site, proporcionando aos clientes das lojas virtuais a garantia de que estão realmente acessando o site que desejam, e não uma um site fraudador.

Empresas especializadas são responsáveis por fazer a validação do domínio e, dependendo do tipo de certificado, também da entidade detentora do domínio.

### Internet Explorer:

![Certificado EV Internet Explorer]({{ site.baseurl_root }}/images/certificado-ie.jpg)

### Firefox

![Certificado EV Firefox]({{ site.baseurl_root }}/images/certificado-firefox.jpg)

### Google Chrome

![Certificado EV Google Chrome]({{ site.baseurl_root }}/images/certificado-chrome.jpg)

## O que é Certificado EV SSL?

O Certificado EV foi lançado no mercado recentemente e garante um nível de segurança maior para os clientes das lojas virtuais.

Trata-se de um certificado de maior confiança e quando o https for acessado a barra de endereço ficará verde, dando mais confiabilidade aos visitantes do site.

## Como instalar o Certificado Extended Validation no servidor da Loja?

Basta instalar os três arquivos a seguir na Trustedstore do servidor. A Cielo não oferece suporte para a instalação do Certificado. Caso não esteja seguro sobre como realizar a instalação do Certificado EV, então você deverá ser contatado o suporte do fornecedor do seu servidor.

* [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
* [Certificado Intermediária 1]({{ site.baseurl }}/attachment/intermediate1.crt)
* [Certificado Intermediária 2]({{ site.baseurl }}/attachment/intermediate2.crt)
* [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/serversertificate.crt)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning">A Cielo não oferece suporte para a instalação do Certificado.</aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

#### 1o Passo:

Salvar os arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

* [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
* [Certificado Intermediária 1]({{ site.baseurl }}/attachment/intermediate1.crt)
* [Certificado Intermediária 2]({{ site.baseurl }}/attachment/intermediate2.crt)
* [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/servercertificate.crt)

#### 2o Passo:

No “Internet Explorer”, clique no menu “Ferramentas” e acesse as “Opções da Internet”:

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-1.jpg)

No “Firefox”, clique no menu “Abrir Menu” e acesse “Avançado” e “Opções”:

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-1.jpg)

No “Chrome”, clique no “Personalizar e Controlar o Google Chrome” e acesse “Configurações” e “Mostrar configurações avançadas... “Alterar Configurações de Proxy e “Conteúdo” e Certificados:

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-1.jpg)

#### 3o Passo:

No Internet Explorer, em “Certificados”, clique em “Importar”.

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-2.jpg)

No Firefox clique em “Ver Certificados”, clique em “Importar”

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-2.jpg)

No Chrome clique em “Gerenciar Certificados”, clique em “Importar”

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-2.jpg)

#### 4o Passo:

No Internet Explorer e Chrome “Assistente para Importação de Certificados”, clique em “Avançar”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-3.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-4.jpg)

No Firefox “Aba Servidores ”, clique em “Importar”

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-3.jpg)

#### 5o Passo:

No Chrome e Internet Explorer “Assistente para Importação de Certificados”, clique em “Procurar”, procure a pasta onde estão os arquivos e selecione o arquivo “ecommerce.cielo.com.br.crt, clique em “Abrir” e em seguida “Avançar”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-5.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-6.jpg)

#### 6o Passo:

Selecionar a opção desejada: adicionar o Certificado em uma pasta padrão ou procurar a pasta de sua escolha.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-7.jpg)

#### 7o Passo:

Clique em “Concluir”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-8.jpg)

#### 8o Passo:

Clique em “Ok” para concluir a importação.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">No Firefox não consta a mensagem de Importação com Êxito, apenas conclui a importação.</aside>

O Certificado poderá ser visualizado na aba padrão “Outras Pessoas” ou na escolhida pelo cliente.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-10.jpg)

#### 9o Passo:

Repita o mesmo procedimento para os 3 arquivos enviados.

## Dúvidas

Em caso de dúvidas em qualquer etapa ou outras informações técnicas, entre em contato com o Suporte Web do Cielo e-Commerce nos seguintes canais:

* **Email:** [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)
* **Capitais:** 4002-9700
* **Demais Cidades:** 0800 570 1700

Horário de atendimento: 24h por dia, 7 dias por semana.

# Visão Geral

Neste manual será apresentado uma visão geral do Cielo eCommerce e o mecanismo tecnológico no formato de integração Webservice (chamado nas versões anteriores de Buy Page Loja).

Para informações sobre a integração no formato do Checkout Cielo (chamado nas versões anteriores de Buy Page Cielo ou Solução Integrada) acesse: [https://www.cielo.com.br/eCommerce](https://www.cielo.com.br/eCommerce).

Para todo pedido de compra, a meta é efetivá-la em uma venda. Uma venda com cartão pode ser caracterizado em uma transação autorizada e capturada.

<aside class="warning">Uma transação autorizada somente gera o crédito para o lojista se ela for capturada (ou confirmada).</aside>

## Características da solução

A solução Webservice da plataforma Cielo eCommerce foi desenvolvida com tecnologia XML, que é padrão de mercado e independe da tecnologia utilizada por nossos clientes. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação, tais como: ASP, ASP. Net, Java, PHP, Ruby, Python, etc.

Entre outras características, os atributos que mais se destacam na plataforma Cielo eCommerce:

* **Ausência de aplicativos proprietários**: não é necessário instalar aplicativos no ambiente da loja virtual em nenhuma hipótese.
* **Simplicidade**: o protocolo utilizado é puramente o HTTPS, sem necessidade do uso de SOAP.
* **Facilidade de credenciamento**: o tratamento das credenciais do cliente (número de afiliação e chave de acesso) trafega na mensagem, em campos comuns do XML, sem necessidade de atributos especiais, como por exemplo, SOAP Header.
* **Segurança**: a troca de informações se dá sempre entre o Servidor da Loja e da Cielo, ou seja, sem o browser do comprador.
* **Multiplataforma**: a integração é realizada através de Web Service, em um único Endpoint.

## Considerações sobre a integração

* Todas as requisições a Web Service da Cielo devem conter o nó de autenticação do lojista, composto pelo número de credenciamento e chave de acesso.
* O cadastro da loja deve estar ativo junto à Cielo.
* Deve-se definir um timeout adequado nas requisições HTTP à Cielo; recomendamos 30 segundos.
* O certificado Root da entidade certificadora (CA) de nosso Web Service deve estar cadastrado na Truststore a ser utilizada. Como nossa certificadora é de ampla aceitação no mercado, é provável que ela já esteja registrada na Truststore do próprio sistema operacional.
* Disponibilizamos no kit de integração o arquivo eCommerce.xsd para facilitar a validação das restrições de formato, tamanho dos campos, tipos e domínios de dados.
* Em todas as mensagens a data/hora deverá seguir o formato: `aaaa-MM-ddTHH24:mm:ss`. Exemplo: 2011-12-21T11:32:45.
* Os valores monetários são sempre tratados como valores inteiros, sem representação das casas decimais, sendo que os dois últimos dígitos são considerados como os centavos. Exemplo: R$ 1.286,87 é representado como 128687; R$ 1,00 é representado como 100.

<aside class="notice">Veja a seção Certificado Digital para informações sobre os certificados Cielo</aside>

## Arquitetura

A integração é realizada através de serviços disponibilizados como Web Services. O modelo empregado é bastante simples: há uma única URL (endpoint) que recebe os POSTs via HTTPs e, dependendo do formato do XML enviado, uma determinada operação é realizada.

A chamada ao Web Service é resumida por:

* A mensagem em formato XML, definida de acordo com a funcionalidade.
* O destino (ambiente de teste ou de produção).
* O retorno em formato XML, que pode ser: `<transacao/>`, `<retorno-token>` ou `<erro/>`.

``` xml
POST /servicos/ecommwsec.do HTTP/1.1
Host: eCommerce.cielo.com.br
Content-Type: application/x-www-form-urlencoded
Content-Length: length
mensagem=<?xml version="1.0" encoding="ISO-8859-1"?><requisicao-captura id="3e22bdd0-2017-4756-80b7-35a532e6c973" versao="1.2.1"><tid>10069930690101012005</tid><dados-ec><numero>1006993069</numero><chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave></dados-ec><valor>3880</valor></requisicao-captura>
```

## Transação

O elemento central do Cielo eCommerce é a transação, criada a partir de uma requisição HTTP ao Webservice da Cielo. A identificação única de uma transação na Cielo é feita através do campo TID, que está presente no retorno das mensagens de autorização. Esse campo é essencial para realizar consultas, capturas e cancelamentos.

A partir da criação de uma transação, ela pode assumir os seguintes status:

![status transações]({{ site.baseurl_root }}/images/status.png)

As transições de status podem ser realizadas através da troca de mensagens entre a loja e a Cielo, ou de forma automática, por exemplo, quando o prazo para a captura de transação autorizada expirar.

# Criando transações

Todas as transações no Cielo eCommerce iniciam-se através de um POST (HTTPS) ao Web Service da Cielo com uma mensagem XML `<requisicao-transacao>`, cujo conjunto de TAGS determinam as configurações de uma transação.

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <indicador>1</indicador>
    <codigo-seguranca>973</codigo-seguranca>
    <token/>
  </dados-portador>
  <dados-pedido>
    <numero>178148599</numero>
    <valor>1000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <taxa-embarque/>
    <soft-descriptor/>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>A</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>1</autorizar>
  <capturar>false</capturar>
  <campo-livre>Informações extras</campo-livre>
  <bin>455187</bin>
  <gerar-token>false</gerar-token>
  <avs>
  <![CDATA[
    <dados-avs>
      <endereco>Rua Teste AVS</endereco>
      <complemento>Casa</complemento>
      <numero>123</numero>
      <bairro>Vila AVS</bairro>
      <cep>12345-123</cep>
      <cpf>11111111111</cpf>
    </dados-avs>
  ]]>
  </avs>
</requisicao-transacao>

```

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### raiz

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|[dados-ec](#dados-ec)|n/a|Sim|n/a|Dados do estabelecimento comercial|
|[dados-portador](#dados-portador)|n/a|Sim|n/a|Dados do cartão|
|[dados-pedido](#dados-pedido)|n/a|Sim|n/a|Dados do pedido|
|[forma-pagamento](#forma-pagamento)|n/a|Sim|n/a|Forma de pagamento|
|url-retorno|Alfanumérico|Sim|1..1024|URL da página de retorno. É para essa página que a Cielo vai direcionar o browser ao fim da autenticação ou da autorização. Não é obrigatório apenas para autorização direta, porém o campo dever ser inserido como `null`.|
|capturar|Boolean|Sim|n/a|`true` ou `false`. Define se a transação será automaticamente capturada caso seja autorizada.|
|campo-livre|Alfanumérico|Opcional|0..128|Campo livre disponível para o Estabelecimento.|
|bin|Numérico|Opcional|6|Seis primeiros números do cartão.|
|gerar-token|Boolean|Opcional|n/a|`true` ou `false`. Define se a transação atual deve gerar um token associado ao cartão.|
|avs#avs|Alfanumérico|Opcional|n/a|String contendo um bloco XML, encapsulado pelo `CDATA`, contendo as informações necessárias para realizar a consulta ao serviço.|

### dados-ec

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|numero|Numérico|Sim|1..20|Número de afiliação da loja com a Cielo.|
|chave|AlfaNumérico|Sim|1..100|Chave de acesso da loja atribuída pela Cielo.|

### dados-portador

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|numero|Numérico|Sim|19|Número do cartão.|
|validade|Numérico|Sim|6|Validade do cartão no formato aaaamm. Exemplo: 201212 (dez/2012).|
|indicador|Numérico|Sim|1|Indicador sobre o envio do Código de segurança: **0** – não informado, **1** – informado, **2** – ilegível, **9** – inexistente|
|codigo-seguranca|Numérico|Condicional|3..4|Obrigatório se o indicador for **1**|
|nome-portador|Alfanumérico|Opcional|0..50|Nome como impresso no cartão|
|token|Alfanumérico|Condicional|0..100|Token que deve ser utilizado em substituição aos dados do cartão para uma autorização direta ou uma transação recorrente. Não é permitido o envio do token junto com os dados do cartão na mesma transação.|

### dados-pedido

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|numero|Alfanumérico|Sim|1..20|Número do pedido da loja. **Recomenda-se que seja um valor único por pedido.**|
|valor|Numérico|Sim|1..12|Valor a ser cobrado pelo pedido (já deve incluir valoresde frete, embrulho, custos extras, taxa de embarque, etc). Esse valor é o que será debitado do consumidor.|
|moeda|Numérico|Sim|3|Código numérico da moeda na norma ISO 4217. **Para o Real, o código é 986**.|
|data-hora|Alfanumérico|Sim|19|Data hora do pedido. **Formato**: `aaaa-MM-ddTHH24:mm:ss`|
|descricao|Alfanumérico|Opcional|0..1024|Descrição do pedido|
|idioma|Alfanumérico|Opcional|2|Idioma do pedido: PT (português), EN (inglês) ou ES (espanhol). Com base nessa informação é definida a língua a ser utilizada nas telas da Cielo. **Caso não seja enviado, o sistema assumirá “PT”**.|
|taxa-embarque|Numérico|Opcional|1..9|Montante do valor da autorização que deve ser destinado à taxa de embarque.|
|soft-descriptor|Alfanumérico|Opcional|0..13|Texto de até 13 caracteres que será exibido na fatura do portador, após o nome do Estabelecimento Comercial.|

<aside class="notice">O cadastro do cliente está habilitado para transacionar apenas com a moeda REAL, caso necessite de mais informações, contate a central de relacionamento, seu gerente comercial ou o Suporte Web Cielo eCommerce.</aside>

### forma-pagamento

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|bandeira|Alfanumérico|Sim|n/a|Nome da bandeira (minúsculo): “visa”, “mastercard”, “diners”, “discover”, “elo”, “amex”, “jcb”, “aura”, “hipercard”|
|produto|Alfanumérico|Sim|1|Código do produto: **1** – Crédito à Vista, **2** – Parcelado loja, **A** – Débito.|
|parcelas|Numérico|Sim|1..2|Número de parcelas. **Para crédito à vista ou débito, utilizar 1.**|

<aside class="warning">O valor resultante da divisão do valor do pedido pelo número de parcelas não deve ser inferior a R$ 5,00. Para transações Visa, a autorização será negada. Para transações MasterCard, Elo, Diners, Discover, Aura e JCB, a transação que for aprovada, terá seu plano parcelado alterado para à vista. Para evitar reclamações, permita apenas transações parceladas com a parcela mínima acima de R$ 5,00.</aside>

## Fluxos de integração e redirecionamentos

Após a transação ter sido criada, o fluxo de navegação pode ser direcionado ao ambiente da Cielo caso o lojista solicite a autenticação na mensagem XML.

Nessa situação, o sistema do lojista deve obter o valor da TAG <url-autenticacao> do XML de retorno para realizar um redirect no browser do cliente e dar continuidade ao processo. O redirecionamento deve ser realizado em modo Full Screen. Ou seja, não há mais suporte a abertura de pop up. Dessa forma, a partir da tela de checkout deve ser realizado um redirecionamento à URL retornada na criação da transação.

<aside class="notice">Esse redirecionamento pode ser através de um Http Redirect (como no código da Loja Exemplo) ou através de um Javascript.</aside>

Após o processo de autenticação, o fluxo é devolvido ao lojista através da informação presente na TAG <url-retorno>, enviada na primeira requisição para a Cielo.

O diagrama abaixo facilita a visualização do fluxo completo de navegação:

![fluxo]({{ site.baseurl_root }}/images/fluxo.png)

<aside class="notice">Geralmente, a URL de retorno segue o seguinte formato: https://minhaloja.com.br/pedido?id=12345678. Essa página deve utilizar o número do pedido para buscar internamente o TID que foi retornado pela Cielo. Com esta informação, a página deve realizar uma requisição de Consulta via TID ao Web Service da Cielo e interpretar o resultado para exibir ao cliente</aside>

Por outro lado, quando não há autenticação, não existe troca de contextos ou redirects, e a integração é mais simples:

![fluxo-simples]({{ site.baseurl_root }}/images/fluxo-simples.png)

## Tipos de retorno

Há três tipos de retorno que podem ser gerados na resposta do Web Service:

1. `<transacao>`
2. `<retorno-token>`
3. `<erro>`

Para as operações relacionadas a uma transação (consultas, autorização, captura e cancelamento), a resposta, em caso de sucesso, é sempre um XML do tipo `<transacao>`. No caso de uma requisição exclusiva para criação de token, a resposta esperada é `<retorno-token>`.

O exemplo ao lado ilustra a forma mais reduzida de uma mensagem de retorno tipo `<transacao>`. Basicamente, ela é composta pelos dados do pedido e dados da configuração da transação.

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao versao="1.3.0" id="af32f93c-5e9c-4f44-9478-ccc5aca9319e" xmlns="http://ecommerce.cbmp.com.br">
    <tid>100699306908642F1001</tid>
    <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
    <dados-pedido>
        <numero>2132385784</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2013-02-18T16:51:30.852-03:00</data-hora>
        <descricao>[origem:0:0:0:0:0:0:0:1]</descricao>
        <idioma>PT</idioma>
        <taxa-embarque>0</taxa-embarque>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <status>4</status>
    <autenticacao>
        <codigo>4</codigo>
        <mensagem>Transacao sem autenticacao</mensagem>
        <data-hora>2013-02-18T16:51:31.158-03:00</data-hora>
        <valor>1000</valor>
        <eci>7</eci>
    </autenticacao>
    <autorizacao>
        <codigo>4</codigo>
        <mensagem>Transação autorizada</mensagem>
        <data-hora>2013-02-18T16:51:31.460-03:00</data-hora>
        <valor>1000</valor>
        <lr>00</lr>
        <arp>123456</arp>
        <nsu>549935</nsu>
    </autorizacao>
</transacao>
```

As informações mais importantes são:

* **TID**: é o elo entre o pedido de compra da loja virtual e a transação na Cielo.
* **URL de autenticação**: aponta à página que dá início à autenticação (quando solicitada).
* **Status**: é a informação base para a loja controlar a transação.

A tabela abaixo detalha as TAGS do XML básico de retorno, identificado pelo nó raiz `<transação>`:

|Elemento|Tipo|Tamanho|Descrição|
|---|---|---|---|
|tid|Alfanumérico|1..40|Identificador da transação|
|dados-pedido|Idêntico ao nó enviado pela loja na criação da transação.|
|forma-pagamento|Idêntico ao nó enviado pela loja na criação da transação.|
|status|Numérico|12|Código de status da transação. Veja o apêndice para a lista de status|
|url-autenticacao|Alfanumérico|1..256|URL de redirecionamento à Cielo.|

Por fim, há outro tipo de retorno que é empregado toda vez que uma requisição não pode ser executada, seja porque era inválida ou por ter ocorrido falha no seu processamento. Nesse cenário o nó raiz do XML de resposta é do tipo `<erro>`.

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<erro xmlns="http://ecommerce.cbmp.com.br">
  <codigo>001</codigo>
  <mensagem><![CDATA[O XML informado nao e valido:- string value '' does not match pattern for type of valor element in DadosPedido in namespace http://ecommerce.cbmp. com.br: '<xml-fragment/>]]>
  </mensagem>
</erro>
```

Quando a transação é inválida, podemos classificar os erros em dois tipos:

* **Erros sintáticos**: ocorrem quando a mensagem XML não respeita as regras definidas no arquivo eCommerce.xsd. Por exemplo, uma letra em um campo numérico, ou a ausência de um valor obrigatório;
* **Erros semânticos**: ocorrem quando uma requisição solicita uma operação não suportada para determinada transação. Por exemplo, tentar capturar uma transação não autorizada, ou ainda, cancelar uma transação já cancelada.

<aside class="notice">As mensagens de erro sempre trazem informações adicionais que facilitam o troubleshooting. A tabela que consta no item “Anexos - 6.2. Catálogo de Erros” possui a lista completa com os códigos de erros e suas descrições que devem ser consideradas no desenvolvimento da integração.</aside>

## Autenticação e nível de segurança

Dependendo da bandeira escolhida, as transações na plataforma Cielo eCommerce podem ser configuradas para serem autenticadas no banco emissor do cartão (portador), a fim de garantir o nível maior de segurança ao lojista. A autenticação não é feita automaticamente entre sistemas, deste modo é necessário que o comprador interaja no processo, conforme será visto a seguir.

Ela acontece sempre no site do banco (Internet Banking), utilizando mecanismos e tecnologias independentes da Cielo. Dessa forma, é possível que o banco utilize token eletrônico e senha, enquanto outro utilize os cartões de senhas ou CPF para autenticar uma transação.

Conforme mostrado anteriormente, a mecânica do redirecionamento é obtida através da tag `<url-autenticacao>` que é retornada pela Cielo no XML <transação> no momento da solicitação de autorização ao Web Service.

A autenticação é obrigatória para transações de débito e opcional para o crédito. Atualmente somente Visa e MasterCard suportam essa funcionalidade e consequentemente, somente essas duas bandeiras possuem o produto débito.

<aside class="notice">Consulte os produtos e bandeiras suportadas no item 1.6 Produtos e Bandeiras suportadas.</aside>

Quando há autenticação, o fluxo de execução da autorização acaba sendo feito em duas etapas, conforme mostrado no diagrama abaixo:

![fluxo-autenticacao]({{ site.baseurl_root }}/images/fluxo-autenticacao.png)

1. fecharPedido() – acontece quando o portador do cartão finaliza o pedido e dá início ao pagamento da compra
  1. criarTransacao(autenticada) – o sistema do lojista envia uma requisição XML `<requisicao-transacao>` solicitando uma transação autenticada, ou seja, a TAG <autorizar> será 0, 1 ou 2. Em seguida, a Cielo informará no XML de retorno o campo <url-autenticacao> com o endereço que o portador deverá ser redirecionado.
2. acessar(url-atenticacao) – o browser do portador é redirecionado ao ambiente da Cielo. Assim que a página da Cielo é acessada, automaticamente ela já é direcionada para o banco emissor (3.1). Esse redirect é tão rápido que é praticamente imperceptível.
3. autenticar(token, cpf) – o portador estará no ambiente do banco e utilizará algum mecanismo provido pelo próprio emissor para realizar a autenticação da transação (geralmente token, cartão de bingo, cpf, assinatura eletrônica, etc).
  1. resultadoAutenticacao() – o banco emissor redireciona o fluxo para a Cielo com o resultado da autenticação. A partir daí, o fluxo volta ao normal, conforme disposto no item “2.3 Arquitetura de integração”.
    1.processar() – o sistema da Cielo processa o retorno da autenticação e submete á autorização e, opcionalmente, à captura automática.
    2. enviarRedirect(url-retorno) – o sistema da Cielo envia um redirect ao browser do cliente para o endereço especificado na URL de retorno, fornecida na primeira requisição (`<requisicao-transacao>`)
      1. acessar(url-retorno) – o browser do portador acessar a URL no ambiente da loja, onde recomendamos que exista uma requisição de consulta via TID ao Web Service da Cielo.

### Observações

* Somente o primeiro redirecionamento (1.2: enviarRedirect()) é de responsabilidade da loja virtual.
* O comprador é redirecionado ao site do Banco Emissor somente se a autenticação estiver disponível. Caso contrário, a transação prosseguirá à autorização automaticamente (exceto se foi apenas solicitada autenticação).

<aside class="notice">Consulte os produtos e bandeiras suportadas no item 1.6 Produtos e Bandeiras suportadas.</aside>

Os pré-requisitos para que uma transação seja autenticada estão relacionados abaixo:

* Banco e Bandeira devem ser participantes do programa de autenticação;
* O BIN do cartão deve ser participante do programa de autenticação;
* A configuração da <requisicao-transacao>//<autorizar> deve ser 0, 1 ou 2.

Observando o diagrama da seção [Transação](#transação), é possível observar que todas as transações passarão pelo status “Autenticada” ou “Não autenticada”. Por consequência, todas receberão o nó `<autenticacao>` no XML de resposta ao lojista. Abaixo, o XML com o nó de autenticação:

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao versao="1.3.0" id="5e445904-963e-4fa1-95cd-55ef88c289cc" xmlns="http://ecommerce.cbmp.com.br">
    <tid>10069930690864281001</tid>
    <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
    <dados-pedido>
        <numero>1739114311</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2013-02-18T15:06:27.523-03:00</data-hora>
        <descricao>[origem:172.16.34.66]</descricao>
        <idioma>PT</idioma>
        <taxa-embarque>0</taxa-embarque>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <status>6</status>
    <autenticacao>
        <codigo>6</codigo>
        <mensagem>Transacao sem autenticacao</mensagem>
        <data-hora>2013-02-18T15:06:28.013-03:00</data-hora>
        <valor>1000</valor>
        <eci>7</eci>
    </autenticacao>
    <autorizacao>
        <codigo>6</codigo>
        <mensagem>Transação autorizada</mensagem>
        <data-hora>2013-02-18T15:06:28.807-03:00</data-hora>
        <valor>1000</valor>
        <lr>00</lr>
        <arp>123456</arp>
        <nsu>549928</nsu>
    </autorizacao>
    <captura>
        <codigo>6</codigo>
        <mensagem>Transacao capturada com sucesso</mensagem>
        <data-hora>2013-02-18T15:08:23.031-03:00</data-hora>
        <valor>1000</valor>
    </captura>
</transacao>
```

Os campos apenas do nó `<autenticacao>` estão listados na tabela abaixo:

|Elemento|Tipo|Tamanho|Descrição|
|---|---|---|---|
|codigo|Numérico|1.2|Código do processamento|
|mensagem|Alfanumérico|1..100|Detalhe do processamento|
|data-hora|Alfanumérico|19|Data e hora do processamento|
|valor|Numérico|1..12|Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos.|
|eci|Numérico|2|Nível de segurança.|

O campo ECI (Eletronic Commerce Indicator) representa o quão segura é uma transação. Esse valor deve ser levado em consideração pelo lojista para decidir sobre a captura da transação.

<aside class="warning">O indicador ECI é muito importante, pois é ele que determina as regras de Chargeback.</aside>

> A transação autenticada passa por uma validação do emissor e da bandeira, em momento de autorização, podendo refletir na alteração do ECI (Eletronic Commerce Indicator), que é utilizado para determinar quem será o responsável em caso de chargeback nas modalidades fraude.

# Catálogo de códigos de resposta

## Códigos de Autorização LR

A seguir estão os códigos de resposta que respondem por 99% dos retornos gerados no processo de autorização. Os demais códigos existentes não estão listados pois ocorrem raramente ou em casos específicos. Para estes casos deve-se assumir que eles não são passíveis de retentativa.

Caso tenha uma quantidade elevada de códigos de retorno que não está listado abaixo, entre em contato com o Suporte Web Cielo eCommerce.

<aside class="warning">As descrições abaixo são exclusivas para uso interno do estabelecimento comercial e não devem ser divulgadas para o portador do cartão.</aside>

<aside class="notice">Exceto os códigos AA, AC e GA, todos os outros são gerados pelos emissores/bandeiras.</aside>

|Código Resposta|Definição|Significado|Ação|Permite Retentativa|
|---|---|---|---|---|
|00|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Não|
|000|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Não|
|01|Transação não autorizada. Transação referida.|Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|02|Transação não autorizada. Transação referida.|Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|03|Transação não permitida. Erro no cadastramento do código do estabelecimento no arquivo de configuração do TEF|Transação não permitida. Estabelecimento inválido. Entre com contato com a Cielo.|Não foi possível processar a transação. Entre com contato com a Loja Virtual.|Não|
|04|Transação não autorizada. Cartão bloqueado pelo banco emissor.|Transação não autorizada. Cartão bloqueado pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|05|Transação não autorizada. Cartão inadimplente (Do not honor).|Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|06|Transação não autorizada. Cartão cancelado.|Transação não autorizada. Não foi possível processar a transação. Cartão cancelado permanentemente pelo banco emissor.|Não foi possível processar a transação. Entre em contato com seu banco emissor.|Não|
|07|Transação negada. Reter cartão condição especial|Transação não autorizada por regras do banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor|Não|
|08|Transação não autorizada. Código de segurança inválido.|Transação não autorizada. Código de segurança inválido. Oriente o portador a corrigir os dados e tentar novamente.|Transação não autorizada. Dados incorretos. Reveja os dados e informe novamente.|Não|
|11|Transação autorizada com sucesso para cartão emitido no exterior|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Não|
|12|Transação inválida, erro no cartão.|Não foi possível processar a transação. Solicite ao portador que verifique os dados do cartão e tente novamente.|Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.|Não|
|13|Transação não permitida. Valor da transação Inválido.|Transação não permitida. Valor inválido. Solicite ao portador que reveja os dados e novamente. Se o erro persistir, entre em contato com a Cielo.|Transação não autorizada. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|14|Transação não autorizada. Cartão Inválido|Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor, dados incorretos ou tentativas de testes de cartão. Use o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo. Consulte https://www.cielo.com.br/desenvolvedores para implantar o Algoritmo de Lhum.|Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.|Não|
|15|Banco emissor indisponível ou inexistente.|Transação não autorizada. Banco emissor indisponível.|Não foi possível processar a transação. Entre em contato com seu banco emissor.|Não|
|19|Refaça a transação ou tente novamente mais tarde.|Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir entre em contato com a loja virtual.|Sim|
|21|Cancelamento não efetuado. Transação não localizada.|Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|22|Parcelamento inválido. Número de parcelas inválidas.|Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|23|Transação não autorizada. Valor da prestação inválido.|Não foi possível processar a transação. Valor da prestação inválido. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Valor da prestação inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|24|Quantidade de parcelas inválido.|Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|25|Pedido de autorização não enviou número do cartão|Não foi possível processar a transação. Solicitação de autorização não enviou o número do cartão. Se o erro persistir, verifique a comunicação entre loja virtual e Cielo.|Não foi possível processar a transação. reveja os dados informados e tente novamente. Persistindo o erro, entrar em contato com a loja virtual.|Sim|
|28|Arquivo temporariamente indisponível.|Não foi possível processar a transação. Arquivo temporariamente indisponível. Reveja a comunicação entre Loja Virtual e Cielo. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Entre com contato com a Loja Virtual.|Sim|
|30|Transação não autorizada. Decline Message|Não foi possível processar a transação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação com a Cielo esta sendo feita corretamente.|Não foi possível processar a transação. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|39|Transação não autorizada. Erro no banco emissor.|Transação não autorizada. Erro no banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|41|Transação não autorizada. Cartão bloqueado por perda.|Transação não autorizada. Cartão bloqueado por perda.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|43|Transação não autorizada. Cartão bloqueado por roubo.|Transação não autorizada. Cartão bloqueado por roubo.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|51|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|52|Cartão com dígito de controle inválido.|Não foi possível processar a transação. Cartão com dígito de controle inválido.|Transação não autorizada. Reveja os dados informados e tente novamente.|Não|
|53|Transação não permitida. Cartão poupança inválido|Transação não permitida. Cartão poupança inválido.|Não foi possível processar a transação. Entre em contato com seu banco emissor.|Não|
|54|Transação não autorizada. Cartão vencido|Transação não autorizada. Cartão vencido.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|55|Transação não autorizada. Senha inválida|Transação não autorizada. Senha inválida.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|57|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|58|Transação não permitida. Opção de pagamento inválida.|Transação não permitida. Opção de pagamento inválida. Reveja se a opção de pagamento escolhida está habilitada no cadastro|Transação não autorizada. Entre em contato com sua loja virtual.|Não|
|59|Transação não autorizada. Suspeita de fraude.|Transação não autorizada. Suspeita de fraude.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|60|Transação não autorizada.|Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.|Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.|Sim|
|61|Banco emissor indisponível.|Transação não autorizada. Banco emissor indisponível.|Transação não autorizada. Tente novamente. Se o erro persistir, entre em contato com seu banco emissor.|Sim|
|62|Transação não autorizada. Cartão restrito para uso doméstico|Transação não autorizada. Cartão restrito para uso doméstico.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|63|Transação não autorizada. Violação de segurança|Transação não autorizada. Violação de segurança.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|64|Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.|Não|
|65|Transação não autorizada. Excedida a quantidade de transações para o cartão.|Transação não autorizada. Excedida a quantidade de transações para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|67|Transação não autorizada. Cartão bloqueado para compras hoje.|Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.|Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.|Sim|
|70|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|72|Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.|Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente. Se o erro persistir, entre em contato com a Cielo.|Cancelamento não efetuado. Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Não|
|74|Transação não autorizada. A senha está vencida.|Transação não autorizada. A senha está vencida.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|75|Senha bloqueada. Excedeu tentativas de cartão.|Transação não autorizada.|Sua Transação não pode ser processada. Entre em contato com o Emissor do seu cartão.|Não|
|76|Cancelamento não efetuado. Banco emissor não localizou a transação original|Cancelamento não efetuado. Banco emissor não localizou a transação original|Cancelamento não efetuado. Entre em contato com a loja virtual.|Não|
|77|Cancelamento não efetuado. Não foi localizado a transação original|Cancelamento não efetuado. Não foi localizado a transação original|Cancelamento não efetuado. Entre em contato com a loja virtual.|Não|
|78|Transação não autorizada. Cartão bloqueado primeiro uso.|Transação não autorizada. Cartão bloqueado primeiro uso. Solicite ao portador que desbloqueie o cartão diretamente com seu banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor e solicite o desbloqueio do cartão.|Não|
|80|Transação não autorizada. Divergencia na data de transação/pagamento.|Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|82|Transação não autorizada. Cartão inválido.|Transação não autorizada. Cartão Inválido. Solicite ao portador que reveja os dados e tente novamente.|Transação não autorizada. Refazer a transação confirmando os dados. Se o erro persistir, entre em contato com seu banco emissor.|Não|
|83|Transação não autorizada. Erro no controle de senhas|Transação não autorizada. Erro no controle de senhas|Transação não autorizada. Refazer a transação confirmando os dados. Se o erro persistir, entre em contato com seu banco emissor.|Não|
|85|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|86|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|89|Erro na transação.|Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.|Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.|Sim|
|90|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|91|Transação não autorizada. Banco emissor temporariamente indisponível.|Transação não autorizada. Banco emissor temporariamente indisponível.|Transação não autorizada. Banco emissor temporariamente indisponível. Entre em contato com seu banco emissor.|Sim|
|92|Transação não autorizada. Tempo de comunicação excedido.|Transação não autorizada. Tempo de comunicação excedido.|Transação não autorizada. Comunicação temporariamente indisponível. Entre em contato com a loja virtual.|Sim|
|93|Transação não autorizada. Violação de regra - Possível erro no cadastro.|Transação não autorizada. Violação de regra - Possível erro no cadastro.|Sua transação não pode ser processada. Entre em contato com a loja virtual.|Não|
|96|Falha no processamento.|Não foi possível processar a transação. Falha no sistema da Cielo. Se o erro persistir, entre em contato com a Cielo.|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Sim|
|97|Valor não permitido para essa transação.|Transação não autorizada. Valor não permitido para essa transação.|Transação não autorizada. Valor não permitido para essa transação.|Não|
|98|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Sim|
|99|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde.  Pode ser erro no SITEF, favor verificar !|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Sim|
|999|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde.  Pode ser erro no SITEF, favor verificar !|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Sim|
|AA|Tempo Excedido|Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.|Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.|Sim|
|AC|Transação não permitida. Cartão de débito sendo usado com crédito. Use a função débito.|Transação não permitida. Cartão de débito sendo usado com crédito. Solicite ao portador que selecione a opção de pagamento Cartão de Débito.|Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de débito.|Não|
|AE|Tente Mais Tarde|Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.|Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.|Sim|
|AF|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|AG|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|AH|Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.|Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.|Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.|Não|
|AI|Transação não autorizada. Autenticação não foi realizada.|Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)|Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.|Não|
|AJ|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label.|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação.|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual.|Não|
|AV|Transação não autorizada. Dados Inválidos|Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.|Falha na validação dos dados. Reveja os dados informados e tente novamente.|Sim|
|BD|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|BL|Transação não autorizada. Limite diário excedido.|Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.|Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.|Sim|
|BM|Transação não autorizada. Cartão Inválido|Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.|Transação não autorizada. Cartão inválido.  Refaça a transação confirmando os dados informados.|Não|
|BN|Transação não autorizada. Cartão ou conta bloqueado.|Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com  seu banco emissor.|Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com  seu banco emissor.|Não|
|BO|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.|Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.|Sim|
|BP|Transação não autorizada. Conta corrente inexistente.|Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.|Não|
|BV|Transação não autorizada. Cartão vencido|Transação não autorizada. Cartão vencido.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|CF|Transação não autorizada.C79:J79 Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|CG|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DA|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DF|Transação não permitida. Falha no cartão ou cartão inválido.|Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco|Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco|Sim|
|DM|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|DQ|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DS|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|EB|Transação não autorizada. Limite diário excedido.|Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.|Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.|Sim|
|EE|Transação não permitida. Valor da parcela inferior ao mínimo permitido.|Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.|Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.|Não|
|EK|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir significa que o lojista não possui essa modalidade de pagamento habilitada. Entre em contato com a Cielo e solicite a habilitação dessa modalidade.|Transação não autorizada. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Loja Virtual.|Sim|
|FA|Transação não autorizada.|Transação não autorizada AmEx.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|FC|Transação não autorizada. Ligue Emissor|Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|FD|Transação negada. Reter cartão condição especial|Transação não autorizada por regras do banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor|Não|
|FE|Transação não autorizada. Divergencia na data de transação/pagamento.|Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|FF|Cancelamento OK|Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.|Transação de cancelamento autorizada com sucesso|Não|
|FG|Transação não autorizada. Ligue AmEx.|Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.|Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090|Não|
|FG|Ligue 08007285090|Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.|Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090|Não|
|GA|Aguarde Contato|Transação não autorizada. Referida pelo Lynx Online de forma preventiva. A Cielo entrará em contato com o lojista sobre esse caso.|Transação não autorizada. Entre em contato com o lojista.|Não|
|GD|Transação não permitida.|Transação não permitida. Transação não é possível ser processada no estabelecimento. Entre em contato com a Cielo para obter mais detalhes.|Transação não permitida. Entre em contato com a loja virtual.|Não|
|HJ|Transação não permitida. Código da operação inválido.|Transação não permitida. Código da operação Coban inválido.|Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.|Não|
|IA|Transação não permitida. Indicador da operação inválido.|Transação não permitida. Indicador da operação Coban inválido.|Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.|Não|
|JB|Transação não permitida. Valor da operação inválido.|Transação não permitida. Valor da operação Coban inválido.|Transação não permitida. Valor da operação Coban inválido. Entre em contato com o lojista.|Não|
|KA|Transação não permitida. Falha na validação dos dados.|Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.|Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|KB|Transação não permitida. Selecionado a opção incorrente.|Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.|Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|KE|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.|Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.|Não|
|N7|Transação não autorizada. Código de segurança inválido.|Transação não autorizada. Código de segurança inválido. Oriente o portador corrigir os dados e tentar novamente.|Transação não autorizada. Reveja os dados e informe novamente.|Não|
|R1|Transação não autorizada. Cartão inadimplente (Do not honor).|Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.|Transação não autorizada. Entre em contato com seu banco emissor.|Sim|
|U3|Transação não permitida. Falha na validação dos dados.|Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.|Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|

## Códigos de Erros

Os erros que podem ser apresentados na mensagem XML, através da TAG `<erro>`, estão dispostos a seguir:

### Tabela de erros de integração

|Código|Mensagem|Descrição|Ação|
|---|---|---|---|
|1|Mensagem inválida|A mensagem XML está fora do formato especificado pelo arquivo eCommerce.xsd|Revisar as informações enviadas na mensagem XML frente às especificações|
|2|Credenciais inválidas|Impossibilidade de autenticar uma requisição daloja virtual.|Verificar se o número de credenciamento e a chave estão corretos|
|3|Transação inexistente|Não existe transação para o identificador informado|Rever a aplicação|
|8|Código de Segurança Inválido|O código de segurança informado na mensagem é inválido.|Revisar as informações de cartão enviadas na mensagem XML|
|10|Inconsistência no envio do cartão|A transação, com ou sem cartão, está divergente com a permissão de envio dessa informação|Rever se o cadastro da loja permite o envio do cartão ou não|
|11|Modalidade não habilitada|A transação está configurada com uma modalidade de pagamento não habilitada para a loja|Rever a modalidade de pagamento solicitada|
|12|Número de parcelas inválido|O número de parcelas solicitado ultrapassa o máximo permitido|Rever a forma de pagamento|
|13|Flag de autorização automática|Flag de autorização automática incompatível com a inválida forma de pagamento solicitada|Rever as regras de utilização da flag|
|14|Autorização Direta inválida|A solicitação de Autorização Direta está inválida|Rever as regras de utilização da Autorização Direta|
|15|Autorização Direta sem Cartão|A solicitação de Autorização Direta está sem cartão|Rever as regras de utilização da Autorização Direta|
|16|Identificador, TID, inválido|O TID fornecido está duplicado|Rever a aplicação|
|17|Código de segurança ausente|O código de segurança do cartão não foi enviado (essa informação é sempre obrigatória para Amex)|Rever a aplicação|
|18|Indicador de código de segurança inconsistente|Uso incorreto do indicador de código de segurança|Revisar as informações de cartão enviadas na mensagem XML|
|19|URL de Retorno não fornecida|A URL de Retorno é obrigatória, exceto para recorrência e autorização direta.|Revisar as informações enviadas na mensagem XML|
|20|Status não permite autorização|Não é permitido realizar autorização para o status da transação|Rever as regras de autorização|
|21|Prazo de autorização vencido|Não é permitido realizar autorização, pois o prazo está vencido|Rever as regras de autorização|
|22|Número de parcelas inválido|Não é permitido realizar autorização para este número de parcelas|Rever as regras de autorização|
|25|Encaminhamento a autorização não permitido|O resultado da Autenticação da transação não permite a solicitação de Autorização|Rever as regras de autorização|
|30|Status inválido para captura|O status da transação não permite captura|Rever as regras de captura|
|31|Prazo de captura vencido|A captura não pode ser realizada, pois o prazo para captura está vencido|Rever as regras de captura|
|32|Valor de captura inválido|O valor solicitado para captura não é válido|Rever as regras de captura|
|33|Falha ao capturar|Não foi possível realizar a captura|Realizar nova tentativa. Persistindo, entrar em contato com o Suporte eCommerce e informar o TID da transação.|
|34|Valor da taxa de embarque obrigatório|O valor da taxa de embarque é obrigatório se a captura for parcial e a autorização tiver sido feita com taxa de embarque.|Envie novamente a requisição de captura com a tag .|
|35|Bandeira inválida para utilização da Taxa de Embarque|A bandeira utilizada na transação não tem suporte à taxa de embarque.|Remova a taxa de embarque ou utilize um cartão que suporte esta funcionalidade: Visa ou Mastercard.|
|36|Produto inválido para utilização da Taxa de Embarque|O produto escolhido não tem suporte à taxa de embarque.|Altere o produto.|
|40|Prazo de cancelamento vencido|O cancelamento não pode ser realizado, pois o prazo está vencido|Rever as regras de cancelamento.|
|42|Falha ao cancelar|Não foi possível realizar o cancelamento|Realizar nova tentativa. Persistindo, entrar em contato com o Suporte eCommerce e informar o TID da transação.|
|43|Valor de cancelamento é maior que valor autorizado.|O valor que está tentando cancelar supera o valor total capturado da transação.|Revisar o valor do cancelamento parcial, pois não pode ser maior que o valor capturado da transação.|
|51|Recorrência Inválida|As configurações da transação não permitem que a transação recorrente seja efetuada com sucesso.|Verifique se escolheu “Crédito à vista”; Verifique se está enviando somente o token ou somente o cartão de crédito|
|52|Token Inválido|O token fornecido na requisição de autorização não é válido ou está bloqueado.|Verifique se o Token está correto. Persistindo, entrar em contato com o Suporte.|
|53|Recorrência não habilitada|O cadastro do lojista não permite o envio de transações recorrentes.|Entre em contato com suporte para saber como habilitar a recorrência no cadastro.|
|54|Transação com Token inválida|As configurações da transação não permitem que a autorização direta com uso de Token seja efetuada com sucesso.|Verifique se escolheu “Crédito à vista”; Verifique se está enviando somente o token ou somente o cartão de crédito.|
|55|Número do cartão não fornecido|Foi solicitado criação de Token, porém o número do cartão de crédito não foi fornecido.|Revisar as informações enviadas na mensagem XML frente às especificações|
|56|Validade do cartão não fornecido|Foi solicitado criação de Token, porém a validade do cartão de crédito não foi fornecida.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|57|Erro inesperado gerando Token|Falha no sistema ocorrida no momento da geração do Token.|Tentar novamente. Persistindo, entrar em contato com o Suporte.|
|61|Transação Recorrente Inválida|As configurações da transação recorrente estão inválidas.|Verifique se o produto é Crédito à vista, se o token ou o cartão foram enviados na mensagem.|
|77|XID não fornecido|Foi solicitado uma autorização com autenticação externa, porém o campo XID não foi fornecido.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|78|CAVV não fornecido|Foi solicitado uma autorização com autenticação externa, porém o campo CAVV não foi fornecido.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|86|XID e CAVV não fornecidos|Foi solicitado uma autorização com autenticação externa, porém os campos CAVV e XID não foram fornecidos.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|87|CAVV com tamanho divergente|Foi solicitado uma autorização com autenticação externa, porém o campo CAVV possue um tamanho divergente.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|88|XID com tamanho divergente|Foi solicitado uma autorização com autenticação externa, porém o campo XID possue um tamanho divergente.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|89|ECI com tamanho divergente|Foi solicitado uma autorização com autenticação externa, porém o campo ECI possue um tamanho divergente.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|90|ECI inválido|Foi solicitado uma autorização com autenticação externa, porém o campo ECI possue um valor inválido.|Revisar as informações enviadas na mensagem XML frente às especificações.|
|95|Erro interno de autenticação|Falha no sistema|Persistindo, entrar em contato com o Suporte e informar o TID da transação.|
|97|Sistema indisponível|Falha no sistema|Persistindo, entrar em contato com o Suporte.|
|98|Timeout|A aplicação não respondeu dentro do tempo esperado.|Consultar a transação e avaliar o status antes de submeter a transação. Persistindo, entrar em contato com o Suporte.|
|99|Erro inesperado|Falha no sistema|Persistindo, entrar em contato com o Suporte e informar o TID da transação.|
|475|Timeout de Cancelamento|A aplicação não respondeu dentro do tempo esperado.|Realizar uma nova tentativa após alguns segundos. Persistindo, entrar em contato com o Suporte.|

## Status das transações

|Status|Código|
|---|---|
|Transação Criada|0|
|Transação em Andamento|1|
|Transação Autenticada|2|
|Transação não Autenticada|3|
|Transação Autorizada|4|
|Transação não Autorizada|5|
|Transação Capturada|6|
|Transação Cancelada|9|
|Transação em Autenticação|10|
|Transação em Cancelamento|12|

## ECI

|Resultado da Autenticação|Visa|Mastercard|Aura|Demais|
|---|---|---|---|---|
|Portador autenticado com sucesso.|5|2|n/d|n/d|
|Portador não fez autenticação, pois o emissor não forneceu mecanismos de autenticação.|6|1|n/d|n/d|
|Portador não se autenticou com sucesso, pois ocorreu um erro técnico inesperado.|7|1|n/d|n/d|
|Portador não se autenticou com sucesso.|7|0|n/d|n/d|
|A loja optou por autorizar sem passar pela autenticação.|7|0|0|7|

# Operações e configurações

## Criação da Transação de Autorização

A requisição de autorização é a principal operação do Cielo eCommerce, pois é através dela que uma venda pode ser concretizada e finalizar o processo de venda. A autorização possui uma série de configurações que podem ser customizadas, além de funcionalidades que agregam valor ao lojista e seus consumidores.

<aside class="notice">Para os códigos de resposta da autorização consulte o Catálogo de Códigos de Resposta da Autorização (LR)</aside>

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

## Autorização Direta

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <indicador>1</indicador>
    <codigo-seguranca>973</codigo-seguranca>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>3</autorizar>
  <capturar>false</capturar>
</requisicao-transacao>
```

A autorização direta caracteriza-se por ser uma transação onde não há a autenticação do portador, seja por opção (e risco) do lojista, seja porque a bandeira ou emissor não tem suporte. A autorização direta pode ser feita de duas formas: tradicional (com os dados do cartão) ou através de um token.

### Tradicional

* **Objetivo** - Submeter uma transação direta com o uso de um cartão de crédito.
* **Regras**
  * O cadastro da loja virtual deve estar habilitado para envio dos dados do cartão.
  * Enviar a TAG `<autorizar>` com o valor “3”.
  * Somente válido para Crédito.
  * O lojista deve estar atento às regras para envio do cartão.
  * Na autorização direta, o nível de segurança da transação (ECI) é definido como:
    * “7” para Visa, Diners, Discover, Elo e JCB.
    * “0” para Mastercard, Aura e Hipercard.

## Autorização Recorrente

``` XML
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <indicador>1</indicador>
    <codigo-seguranca>973</codigo-seguranca>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>4</autorizar>
  <capturar>false</capturar>
</requisicao-transacao>
```

A autorização recorrente pode ser feita de duas formas: através do envio de um token previamente cadastrado, ou através de um cartão. A transação recorrente é praticamente igual à transação tradicional, as mudanças consistem nas regras que o emissor e a bandeira utilizam para autorizar ou negar uma transação. Outra diferença está relacionada ao Renova Fácil.

<aside class="notice">Para saber se sua loja é elegível a utilizar a autorização recorrente, consulte nossa central de relacionamento ou o Suporte Web Cielo eCommerce.</aside>

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### Autorização recorrente com Cartão

* **Objetivo** - Submeter uma transação recorrente com o uso de um cartão de crédito.
* **Regras**
  * Enviar a TAG `<autorizar>` com o valor “4”.
  * Somente válido para crédito à vista.

### Renova Fácil

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="d35b67189442">
  <tid>10069930690362461001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <!-- ... -->
  </forma-pagamento>
  <status>5</status>
  <!-- ... -->
  <autorizacao>
    <codigo>5</codigo>
    <mensagem>Autorização negada</mensagem>
    <data-hora>2011-12-09T10:58:45.847-02:00</data-hora>
    <valor>1000</valor>
    <lr>57</lr>
    <nsu>221766</nsu>
  </autorizacao>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <codigo-seguranca/>
  </dados-portador>
</transacao>
```

Essa funcionalidade facilita a identificação de um cartão que tenha sido substituído por outro no banco emissor. Dessa forma, quando uma transação recorrente é submetida ao Web Service e a Cielo identifica que o cartão utilizado está desatualizado, o sistema terá o seguinte comportamento:

1. Caso a transação recorrente tenha sido enviada através de um cartão, sua autorização será negada e serão retornados os dados do novo cartão, conforme o diagrama abaixo:

![remova fácil]({{ site.baseurl_root }}/images/remova-facil.png)

<aside class="notice">O Renova Fácil só está disponível para transações recorrentes. A efetividade do Renova Fácil depende do uso correto das transações recorrentes devidamente sinalizadas como tal. Consulte os bancos e bandeiras participantes com o Suporte Web Cielo eCommerce.</aside>

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### Autorização de uma transação previamente gerada

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-autorizacao-tid id="a387cb68-b33a-4113-b7c4-9b7dfde871ec" versao="1.3.0">
    <tid>100699306908642E1001</tid>
    <dados-ec>
        <numero>1006993069</numero>
        <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave>
    </dados-ec>
</requisicao-autorizacao-tid>
```

Para os estabelecimentos utilizando o processo de autenticação, é possível solicitar a autorização
das transações que pararam após a execução deste processo. A mensagem para performar tal operação
é a “requisicao-autorizacao-tid” como descrita abaixo:

<aside class="notice">Requisições para transações que não foram submetidas ao processo de autenticação ou foram interrompidas, pois o portador errou a senha não serão aceitas.</aside>

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|tid|Alfanumérico|Sim|20|Identificador da transação|
|dados-ec.numero|Numérico|Sim|1..20|Número de afiliação da loja com a Cielo.|
|dados-ec.chave|Alfanumérico|Sim|1..100|Chave de acesso da loja atribuída pela Cielo.|

## Transação com Token

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-token id="8fc889c7-004f-42f1-963a-31aa26f75e5c" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <nome-portador>FULANO DA SILVA</nome-portador>
  </dados-portador>
</requisicao-token>
```

* **Objetivo** - Solicitar a criação de um token associada a um cartão de crédito, para viabilizar o envio de transações sem o cartão.
* **Regras**
  * O Token é único para um determinado [Cartão + Estabelecimento Comercial]. Dessa forma, um cartão pode estar “tokenizado” em mais de uma loja e em cada uma possuirá códigos diferentes.
  * Caso seja enviada mais de uma solicitação com os mesmos dados, o token retornado será sempre o mesmo.
  * A criação do token é independente do resultado da autorização (aprovada/negada).

<aside class="warning">A transação feita via token não isenta o lojista do envio da informação de bandeira, portanto é necessário que o sistema do lojista (ou gateway) que armazenará os tokens também armazene a bandeira do cartão que foi tokenizado.</aside>

<aside class="notice">Um token não utilizado por mais de um ano será automaticamente removido do banco de dados da Cielo. É possível realizar o bloqueio de um token específico para que este não seja mais usado. O bloqueio do token deve ser solicitado ao Suporte Web Cielo eCommerce.</aside>

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|dados-ec.numero|Numérico|Sim|1..20|Número de afiliação da loja com a Cielo.|
|dados-ec.chave|Alfanumérico|Sim|1..100|Chave de acesso da loja atribuída pela Cielo.|
|daods-portador|n/a|Opcional|n/a|Nó com os dados do cartão.|
|dados-portador.numero|Numérico|Sim|19|Número do cartão|
|dados-portador.validade|Numérico|Sim|6|Validade do cartão no formato aaaamm. Exemplo: 201212 (dez/2012).|
|dados-portador.nome-portador|Alfanumérico|Opcional|0..50|Nome impresso no cartão|

### Retorno

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<retorno-token xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="57239017">
  <token>
    <dados-token>
      <codigo-token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</codigo-token>
      <status>1</status>
      <numero-cartao-truncado>455187******0183</numero-cartao-truncado>
    </dados-token>
  </token>
</retorno-token>
```

O retorno será do tipo <retorno-token> quando a solicitação tenha sido concluída com sucesso, ou <erro> em caso de fracasso.

|Elemento|Tipo|Tamanho|Descrição|
|---|---|---|---|
|codigo-token|Alfanumérico|100|Código do token gerado|
|status|Numérico|1|Status do Token: **0** – Bloqueado, **1** – Desbloqueado|
|numero-cartao-truncado|Alfanumérico|1..16|Número do cartão truncado.|

### Autorização Direta via Token

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</token>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>3</autorizar>
  <capturar>true</capturar>
</requisicao-transacao>
```

* **Objetico** - Submeter uma transação direta (sem autenticação) com o uso de um token previamente cadastrado
* **Regras**
  * Enviar a TAG `<autorizar>` com o valor “3”.
  * O token deve estar desbloqueado.
  * Válido somente para crédito.

### Autorização recorrente com Token

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</token>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>4</autorizar>
  <capturar>true</capturar>
</requisicao-transacao>

```

* **Objetivo** - Submeter uma transação recorrente com o uso de um token previamente cadastrado.
* **Regras**
  * Enviar a TAG `<autorizar>` com o valor “4”.
  * O token deve estar desbloqueado.
  * Somente válido para crédito à vista.

### Renova Fácil com Token

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="d35b67189442">
  <tid>10069930690362461001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <!-- ... -->
  </forma-pagamento>
  <status>5</status>
  <!-- ... -->
  <autorizacao>
    <codigo>5</codigo>
    <mensagem>Autorização negada</mensagem>
    <data-hora>2011-12-09T10:58:45.847-02:00</data-hora>
    <valor>1000</valor>
    <lr>57</lr>
    <nsu>221766</nsu>
  </autorizacao>
  <token>
    <dados-token>
      <codigo-token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</codigo-token>
      <status>1</status>
      <numero-cartao-truncado>455187******0183</numero-cartao-truncado>
    </dados-token>
  </token>
</transacao>
```

Essa funcionalidade facilita a identificação de um cartão que tenha sido substituído por outro no banco emissor. Dessa forma, quando uma transação recorrente é submetida ao Web Service e a Cielo identifica que o cartão utilizado está desatualizado, o sistema terá o seguinte comportamento:

1. Caso a transação recorrente tenha sido enviada através de um token, sua autorização será negada e será retornado um novo token para ser utilizado, conforme o diagrama abaixo:

![remova fácil com token]({{ site.baseurl_root }}/images/remova-facil-token.png)

### Geração de Token

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.0">
  <!-- ... -->
  <gerar-token>true</gerar-token>
</requisicao-transacao>
```

<aside class="warning">este serviço adicional está sujeito a cobrança a partir do momento em que a geração de token é solicitada.</aside>

* **Objetivo** - Além da mensagem específica para criação de um token, descrita em Transação com Token, é possível aproveitar uma requisição de autorização para solicitar a geração do token, acrescentando a informação `<gerar-token>` no nó de requisição de transação.
* **Regras**
  * Caso um cartão seja submetido mais de uma vez pelo mesmo lojista, o Token gerado será sempre o mesmo.

## Funcionalidades Agregadas

### Autenticação e Transações com Cartões de Débito

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>A</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <!-- ... -->
  <autorizar>1</autorizar>
</requisicao-transacao>
```

A autenticação da transação garantirá uma segurança extra ao lojista contra Chargebacks, porém, conforme apresentando no capítulo “2.5 – Autenticação e nível de segurança”, nem todas as bandeiras e emissores disponibilizam esse tipo de serviço.

O produto débito obrigatoriamente exige uma transação autenticada, caso contrário, a transação não é autorizada.

* **Objetivo** - Tornar elegível uma transação para autenticação.
* **Regras**
  * Enviar a flag <autorizar> de acordo com o domínio abaixo, para tentar:
    * 0 – Somente autenticar a transação.
    * 1 – Submeter à autorização somente se a transação for autenticada.
    * 2 – Submeter à autorização se a transação for autenticada ou não.
  * Para débito, enviar o produto “A” no XML.
  * A solicitação da autorização de uma transação que foi somente autenticada pode ser feita em até 90 dias após a data inicial.

<aside class="notice">Tendo em vista que a autenticação não depende exclusivamente desta flag, recomendamos sempre verificar o campo eci para verificar o resultado da autenticação.</aside>

### Permite que o lojista envie um texto (Soft Descriptor)

``` xml
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <dados-pedido>
    <numero>178148599</numero>
    <valor>1000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>soft-descriptor</soft-descriptor>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

* **Objetivo** - Permite que o lojista envie um texto de até 13 caracteres que será impresso na fatura do portador, ao lado da identificação da loja, respeitando o comprimento das bandeiras:
  * **Visa**: 25 caracteres
  * **Mastercard**: 22 caracteres
* **Regras**
  * Tamanho máximo: 13 caracteres.
  * Disponível apenas para as bandeiras Visa e MasterCard.
  * Uso exclusivo de caracteres simples.

<aside class="notice">Para conhecer e/ou alterar o nome da loja que será impresso na fatura do portador entre em contato com nossa central de relacionamento</aside>

### Captura Automática

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <capturar>true</capturar>
  <!-- ... -->
</requisicao-transacao>
```

* **Objetivo** - A captura automática permite que uma requisição de autorização seja capturada imediatamente após sua aprovação. Dessa forma, não é preciso realizar uma `<requisicao-captura>`.
* **Regras**
  * Somente autorizações aprovadas serão capturadas automaticamente.

### Taxa de embarque

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <dados-pedido>
    <numero>178148599</numero>
    <valor>10000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>softdescriptor</soft-descriptor>
    <taxa-embarque>1000</taxa-embarque>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

* **Objetivo** A taxa de embarque é um campo informativo que define o montante do total da transação (informado na tag dados-pedido//valor) que deve ser destinado ao pagamento da taxa à Infraero.
  * O valor da taxa de embarque não é acumulado ao valor da autorização. Por exemplo, em uma venda de passagem aérea de R$ 200,00 com taxa de embarque de R$ 25,00 deve-se enviar o campo `<valor>22500</valor>` e `<taxa-embarque>2500</taxa-embarque>`.
* **Regras**
  * Disponível apenas para as bandeiras Visa e Mastercard.
  * O valor da taxa de embarque não é somado ao valor da autorização, ou seja, é apenas informativo.

<aside class="notice">Existem regras específicas para a requisição de captura com taxa de embarque, disponíveis no item Captura Total e Parcial.</aside>

### AVS (Address Verification Service)

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <dados-pedido>
    <numero>178148599</numero>
    <valor>10000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>softdescriptor</soft-descriptor>
    <taxa-embarque>1000</taxa-embarque>
    <avs>
  <![CDATA[
      <dados-avs>
        <endereco>Rua Teste AVS</endereco>
        <complemento>Casa</complemento>
        <numero>123</numero>
        <bairro>Vila AVS</bairro>
        <cep>12345-123</cep>
        <dados-avs>11111111111</dados-avs>
      </dados-avs>
  ]]>
    </avs>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

* **Objetivo** - O AVS é um serviço para transações de cartão não presente onde é realizada uma validação cadastral através do batimento dos dados numéricos do endereço informado pelo portador (endereço de entrega da fatura) na loja virtual, com os dados cadastrais do emissor.
  * O AVS é um serviço que auxilia na redução do risco de não reconhecimento de compras online. É uma ferramenta que o estabelecimento utilizará para a análise de suas vendas, antes de decidir pela captura da transação e a entrega do produto ou serviço.
* **Regras**
  * Disponível apenas para as bandeiras Visa, Mastercard e AmEx.
  * Produtos permitidos: somente crédito.
  * O retorno da consulta ao AVS é separado em dois itens: CEP e endereço.
  * Cada um deles pode ter os seguintes valores:
    * C – Confere;
    * N – Não confere;
    * I – Indisponível;
    * T – Temporariamente indisponível;
    * X – Serviço não suportado para esta Bandeira.
    * E - Dados enviados incorretos. Verificar se todos os campos foram enviados
  * O nó contendo o XML do AVS deve estar encapsulado pelo termo “CDATA”, para evitar problemas com o parser da requisição.
  * É necessário que todos os campos contidos no nó AVS sejam preenchidos.
  * Quando o campo não for aplicável (exemplo: complemento), a tag deve ser enviada preenchia com NULL ou N/A
  * Necessário habilitar a opção do AVS no cadastro. Para habilitar a opção AVS no cadastro ou consultar os bancos participantes, entre em contato com o Suporte Web Cielo eCommerce.

<aside class="warning">Conforme contrato, este serviço adicional está sujeito a cobrança a partir do momento em que a consulta de AVS for solicitada. Para maiores informações, favor entrar em contato com a central de atendimento, seu gerente de contas ou o Suporte Web Cielo eCommerce.</aside>

## Consulta

A operação de consulta é essencial na integração, pois ela que garantirá a situação atual de uma transação. Ela deve ser executada ao término do processo de autorização, no momento em que a Loja Virtual recebe o fluxo de execução na URL informada na primeira requisição (através da TAG <url-retorno>). O E-commerce pode levar até 25 segundos para processar completamente uma transação.

### Consulta por TID

* **Objetivo** - Realizar a consulta de uma transação através do TID informado.
* **Regras**
  * Somente transações dos últimos 365 dias estão disponíveis.
  * Não há mudança de status da transação.

#### Requisição

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-consulta id="6fcf758e-bc60-4d6a-acf4-496593a40441" versao="1.2.1">
  <tid>100699306903609A1001</tid>
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3
    </chave>
  </dados-ec>
</requisicao-consulta>
```

|TAG|Tipo|Obrig.|Tam.|Descrição|
|---|---|---|---|---|
|dados-ec.numero|Numérico|Sim|1..20|Número de afiliação da loja com a Cielo.|
|dados-ec.chave|Alfanumérico|Sim|1..100|Chave de acesso da loja atribuída pela Cielo.|
|Tid|Alfanumérico|Sim|1..40|Identificador da transação|

### Consulta por Número do Pedido

* **Objetivo** - Realizar a consulta de uma transação através do número do pedido, fornecido pela loja no momento da requisição de transação.
* **Regras**:
  * Somente transações dos últimos 365 dias estão disponíveis.
  * Caso seja encontrada mais de uma transação para o mesmo número do pedido, a Cielo enviará a transação mais recente.
  * Não há mudança de status da transação.

<aside class="notice"><strong>INFORMAÇÃO</strong>: A consulta por Número do Pedido deve ser usada apenas como contingência à Consulta por TID, pois esta pode não garantir unicidade da transação, tendo em vista que este campo é enviado pela loja virtual e apenas acatado pela Cielo.</aside>

#### Requisição

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<requisicao-consulta-chsec id="a51489b1-93d5-437f-bb4f-5b932fade248" versao="1.2.1">
  <numero-pedido>1663784368</numero-pedido>
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3
    </chave>
  </dados-ec>
</requisicao-consulta-chsec>
```

|TAG|Tipo|Obrig.|Tam.|Descrição|
|---|---|---|---|---|
|dados-ec.numero|Numérico|Sim|1..20|Número de afiliação da loja com a Cielo.|
|dados-ec.chave|Alfanumérico|Sim|1..100|Chave de acesso da loja atribuída pela Cielo.|
|Numero|Alfanumérico|Sim|1..20|Número do pedido associado a uma transação.|

## Captura

Uma transação autorizada somente gera o crédito para o estabelecimento comercial caso ela seja capturada. Por isso, **toda venda que o lojista queira efetivar será preciso realizar a captura (ou confirmação) da transação**.

Para vendas na modalidade de Crédito, essa confirmação pode ocorrer em dois momentos:

* Imediatamente após a autorização (captura total);
* Posterior à autorização (captura total ou parcial).

No primeiro caso, não é necessário enviar uma requisição de captura, pois ela é feita automaticamente pela Cielo após a autorização da transação. Para tanto, é preciso configurar a requisição de transação definindo-se o valor “true” para a TAG `<capturar>`, conforme visto na seção “Criando uma transação”.

Já no segundo caso, é preciso fazer uma “captura posterior”, através de uma nova requisição ao Webservice da Cielo para confirmar a transação e receber o valor da venda.

<aside class="warning">O prazo máximo para realizar a captura posterior é de 5 dias corridos após a data da autorização. Por exemplo, se uma autorização ocorreu em 10/12 às 15h20m45s, o limite para captura será às 15h20m45s do dia 15/12.</aside>

<aside class="notice">Na modalidade de débito não existe essa opção: toda transação de débito autorizada é capturada automaticamente.</aside>

### Captura Total e Parcial

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-captura id="adbc9961-8a39-452b-b7fd-15b44b464a97" versao="1.3.0">
    <tid>10069930690864281001</tid>
    <dados-ec>
        <numero>1006993069</numero>
        <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave>
    </dados-ec>
    <valor>1000</valor>
    <taxa-embarque>0</taxa-embarque>
</requisicao-captura>
```

* **Objetivo** - Realizar a captura total e parcial de uma transação previamente autorizada.
* **Regras**
  * Disponível somente para transações dentro do prazo máximo de captura.
  * Caso o valor não seja informado, o sistema assumirá a captura do valor total.
  * O valor da captura deve ser menor ou igual ao valor da autorização.
  * Em caso de falha, novas tentativas de captura poderão ser feitas.
  * Em caso de sucesso, o status é alterado para “6 – Capturada”.
  * **Transações com Taxa de embarque:**
    * Na requisição de captura, o valor da taxa de embarque indica o montante do total que será capturado que deve ser destinado a esse fim.
    * Obrigatório caso seja captura parcial.
    * Caso a captura seja total, o sistema irá considerar o valor da taxa de embarque informado no requisição de autorização (`<requisicao-transacao>`).

### Retorno

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="0378c8cf4d">
  <tid>10069930690360EF1001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <!-- ... -->
  <captura>
    <codigo>6</codigo>
    <mensagem>Transacao capturada com sucesso</mensagem>
    <data-hora>2011-12-08T14:23:08.779-02:00</data-hora>
    <valor>900</valor>
    <taxa-embarque>900</taxa-embarque>
  </captura>
</transacao>
```

Os campos do nó <captura> estão detalhados a seguir:

|Elemento|Tipo|Tamanho|Descrição|
|---|---|---|---|
|captura|Nó com dados da captura caso tenha passado por essa etapa.|
|captura.codigo|Numérico|1..2|Código do processamento|
|captura.mensagem|Alfanumérico|1..100|Detalhe do processamento.|
|captura.datahora|Alfanumérico|19|Data hora do processamento.|
|captura.valor|Numérico|1..12|Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos.|
|captura.taxa-embarque|Numérico|1..9|Montante declarado como taxa de embarque que foi capturado.|

## Cancelamento

O cancelamento é utilizado quando o lojista decide não efetivar um pedido de compra, seja por insuficiência de estoque, por desistência da compra pelo consumidor, ou qualquer outro motivo. Seu uso faz-se necessário principalmente se a transação estiver capturada, pois haverá débito na fatura do portador, caso ela não seja cancelada.

<aside class="notice">Se a transação estiver apenas autorizada e a loja queira cancelá-la, o pedido de cancelamento não é necessário, pois após o prazo de captura expirar, ela será cancelada automaticamente pelo sistema.</aside>

### Cancelamento Total e Parcial

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-cancelamento id="39d36eb6-5ae9-4308-89a1-455d299460c0" versao="1.3.0">
    <tid>100699306908642E1001</tid>
    <dados-ec>
        <numero>1006993069</numero>
        <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave>
    </dados-ec>
    <valor>0</valor>
</requisicao-cancelamento>
```

* **Objetivo** - Realizar o cancelamento do valor total ou parcial de uma transação.
* **Regras**
  * O cancelamento total é válido tanto para transações capturadas, como autorizadas; o parcial é válido apenas para as capturadas.
  * O prazo de cancelamento é de até 300 dias para a modalidade crédito e D+0 para débito.
  * O cancelamento total, quando realizado com sucesso, altera o status da transação para “9 – Cancelada”, enquanto que o parcial não altera o status da transação, mantendo-a como “6 – Capturada”.
  * Em caso de cancelamento na versão 1.6.1 (esta versão é exclusiva para cancelamento), o status de cancelamento parcial será diferente, ou seja: se cancelado com sucesso, retorna status 9; caso ocorra um erro no cancelamento parcial, o código de status será 6. Estas regras aplicam-se apenas para o cancelamento parcial.
  * Caso a TAG `<valor>` não seja fornecida, o sistema assumirá um cancelamento total.
  * O cancelamento parcial está disponível para todas as bandeiras suportadas no e-Commerce.
  * Para a modalidade débito, não existe a possibilidade de efetuar cancelamento parcial.
  * **Transações com Taxa de embarque:**
    * Transações capturadas com o mesmo valor da autorização (ou seja, captura total) possuem o mesmo tratamento para cancelamentos parciais e totais, pois o valor da taxa de embarque é cancelado integralmente.

|Elemento|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|tid|Alfanumérico|Sim|1..40|Identificador da transação.|
|dados-ec.numero|Numérico|Sim|1..10|Número de credenciamento da loja com a Cielo.|
|dados-ec.chave|Alfanumérico|Sim|1..100|Chave de acesso da loja atribuída pela Cielo.|
|valor|Numérico|Opcional|1..12|Valor a ser cancelado. **Caso não seja informado, será um cancelamento total.**|

#### Retorno

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="2c18f00a-3ff6-4c85-8865-a4fde599b2b2">
  <tid>100699306903613E1001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <!-- ... -->
  <cancelamentos>
    <cancelamento>
      <codigo>9</codigo>
      <mensagem>Transacao cancelada com sucesso</mensagem>
      <data-hora>2011-12-08T16:46:35.109-02:00</data-hora>
      <valor>1000</valor>
    </cancelamento>
  </cancelamentos>
</transacao>
```

<aside class="notice">Os cancelamentos (parciais ou totais) das transações com taxa de embarque e captura parcial não serão acatadas automaticamente pelo sistema.</aside>

# Processamento em lote

O Processamento em Lote permite que sejam transmitidas em uma única chamada um conjunto
com várias transações, essas transações serão processadas e disponibilizadas através de um arquivo de
retorno no formato XML.

## O que é o Processamento em Lote

O Processamento em Lote é baseado em um arquivo XML, o qual deve conter uma lista com as transações que compõem o lote, estas transações não devem exigir autenticação, pois será executada diretamente pela Cielo, após a geração do arquivo pelo Estabelecimento Comercial, deve ser enviado para Cielo utilizando o protocolo HTTPS.

Após o recebimento do arquivo, é feita uma pré-validação pela Cielo e o mesmo entra em uma fila para processamento, sendo que este processo é agendado para ser executado de hora em hora.

No momento da pré-validação arquivo poderá ser rejeitado, caso seja enviado em branco ou com formatação inválida.

<aside class="notice">Após o prazo de doze horas o Estabelecimento Comercial poderá solicitar o download do arquivo de retorno.</aside>

## Integração

### Regras

Processamento em Lote deverá seguir as seguintes regras:

<aside class="warning">O lote deverá respeitar os limites informados abaixo. Caso não sejam respeitados, o arquivo será rejeitado.</aside>

1 - O XML para processamento em lote está definido através do "ecm-lote.xsd" que possui dependência com o ecommerce.xsd.
2 - O arquivo deverá respeitar o limite de 20MB (aprox.: 27.000 transações).
3 - O processamento em lote suporta os mesmos tipos de operações do transacional online. Veja a tabela em anexo. 

<br> 
Os dados do Estabelecimento Comercial serão informados uma única vez dentro do lote, ou seja, o pacote de transações pertence exclusivamente ao Estabelecimento informado no arquivo.
<br>
O lote a ser gerado deverá conter uma ou mais transações do mesmo tipo de operação, caso mais de um tipo seja enviado no lote, o arquivo será rejeitado.
<br>

4 - A nomenclatura do arquivo deverá respeitar a regra abaixo e conter a seguinte estrutura e tamanhos de campo:

Exemplo: `ECOMM_1006993069_02_20121002_0000000086.xml`

* a) Prefixo – obrigatoriamente deve iniciar com “ECOMM”;
* b) N.o Afiliação EC – número de afiliação do Estabelecimento Comercial, com a Cielo, deverá conter dez dígitos;
* c) Tipo de operação – deverá conter dois dígitos e para o código do tipo de operação vide tabela acima;
* d) Data de geração do arquivo – data em que o arquivo foi gerado, deve ser no formato yyyymmdd;
* e) Numero do lote – número do lote deverá ser sequencial e conter dez dígitos preenchidos com zeros à esquerda;
* f) Extensão do arquivo – deve ser XML obrigatoriamente.

## Mensagens

### Mensagem de Upload de Arquivo

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<retorno-upload-lote xmlns="http://ecommerce.cbmp.com.br ">
    <data-envio>2012-10-08T09:38:04.284-03:00</data-envio>
    <data-retorno>2012-10-09T09:38:04.284-03:00</data-retorno>
    <mensagem>Seu lote está válido para processamento. Favor aguardar o determinado para retorno.</mensagem>
</retorno-upload-lote>
```

Após a geração do arquivo, o Estabelecimento Comercial deverá efetuar o seu upload através do protocolo HTTPS, utilizando o método POST, na seguinte URL [http://ecommerce.cbmp.com.br/lote/ecommwsecLoteUpload.do](http://ecommerce.cbmp.com.br/lote/ecommwsecLoteUpload.do).

Após o envio, o Estabelecimento Comercial receberá o seguinte XML de retorno:

### Mensagem de Solicitação de Download de Retorno

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<requisicao-download-retorno-lote versao="Versao da msg" id=“session id”>
   <dados-ec>
   <numero>1006993069 </numero>
   <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
   </dados-ec>
   <numero-lote>0000000086</numero-lote>
</requisicao-download-retorno-lote>
```

O Estabelecimento Comercial poderá solicitar o download do arquivo de retorno, após doze horas no mínimo, montando a seguinte mensagem:

A tabela abaixo detalha as TAGS do XML que podem ser enviadas na mensagem para definir as configurações da transação para o Processamento em Lote:

|Elemento|Tipo|Obrigatoriedade|Tamanho|Descrição|
|--------|----|---------------|-------|---------|
|data-envio|n/a|n/a|n/a|Data e horário de envio da mensagem de upload de arquivo pelo Estabelecimento Comercial|
|data-retorno|n/a|n/a|n/a|Data e horário que a Cielo respondeu para o Estabelecimento Comercial o recebimento do arquivo|
|mensagem|n/a|n/a|n/a|Mensagem de resposta enviado pela Cielo|
|numero-lote|N|Sim|1..10|Número do lote que foi solicitado o upload|

Ao receber esta mensagem, a plataforma Cielo eCommerce verificará se o lote está processado e o se o arquivo está gerado no outbox, com as validações positivas, o arquivo de retorno é devolvido para o Estabelecimento Comercial, caso contrário, será retornado um XML cuja mensagem informa em qual etapa o processo está pendente.

Caso o arquivo tenha sido gerado, porem não está no outbox, pode ter ocorrido limpeza do storage, neste caso, automaticamente, ocorre um evento que solicita a segunda via do arquivo. O Estabelecimento Comercial será informado através de uma mensagem XML retorno, que uma nova requisição deverá ser feita mais tarde, para que um novo arquivo seja gerado.

## Anexo

### Tipos de operações do transacional online

| Tipo de operação | Código |
|------------------|--------|
|Autorização|02|
|Cancelamento|03|
|Captura|04|
|Tokenização|05|
|Consulta|06|
|ConsultaChSeq|07|
|AutorizaçãoTid|08|

### Códigos de resposta

Os erros que podem ser apresentados na mensagem XML, através da TAG <erro>, estão dispostos a seguir:

|Código|Erro|Descrição|Ação|
|------|----|---------|----|
|071|Inconsistência no formato do arquivo|Lote inválido, arquivo não é um XML com formato inválido|Rever a formatação do arquivo|
|072|Este arquivo já foi enviado para processamento|Lote duplicado, já existe um lote com o mesmo numero para o EC|Rever a sequência numérica dos lotes|
|073|Tipo de transação inválido|Mais de um único tipo de operação no lote|Rever os tipos de transações que estão contemplados no lote|
|074|Arquivo inexistente|Arquivo não consta na plataforma Cielo eCommerce|Rever informações do arquivo enviado anteriormente|
|075|Formatação do XML inválida|Erro de parse do arquivo, formatação do xml no arquivo inválida|Rever a formatação do xml|
|076|Nomenclatura incorreta|Nomenclatura do arquivo incorreta|Rever estrutura do nome do arquivo|
|079|Erro inesperado|Falha no Sistema|Persistindo, entrar em contato com o Suporte.|
|080|Inconsistência no conteúdo e nomenclatura|Tipos diferentes de operações presentes no conteúdo arquivo e na nomenclatura|Rever conteúdo e nomenclatura do arquivo|
|081|Lote em processamento|Lote ainda não processado|Enviar nova requisição mais tarde|
|082|Arquivo expirado|Arquivo de lote expirado|Enviar nova requisição mais tarde|
|083|Numero de lote inválido|Numero de lote inválido|Rever número de lote|
|084|Número de EC Inválido|Número de EC Inválido|Rever número do EC|
|085|Credenciais inválidas|Credenciais inválidas|Rever credenciais|

### Arquivo ECM-LOTE.XSD

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns="http://ecommerce.cbmp.com.br"
    targetNamespace="http://ecommerce.cbmp.com.br"
    elementFormDefault="qualified">

    <xsd:include schemaLocation="ecm-ec.xsd"></xsd:include>


    <xsd:simpleType name="numeroLoteType">
        <xsd:restriction base="xsd:int">
            <xsd:minExclusive value="0"></xsd:minExclusive>

            <xsd:maxInclusive value="999999999"></xsd:maxInclusive>
        </xsd:restriction>
    </xsd:simpleType>



    <xsd:element name="requisicao-lote" type="RequisicaoLote"></xsd:element>

    <xsd:element name="retorno-lote" type="RetornoLote"></xsd:element>

    <xsd:complexType name="RequisicaoLote">
        <xsd:sequence>
            <xsd:element name="dados-ec" type="DadosEc"
                maxOccurs="1" minOccurs="1">
            </xsd:element>
            <xsd:element name="numero-lote" type="numeroLoteType"
                maxOccurs="1" minOccurs="1">
            </xsd:element>            
            <xsd:element name="tipo-operacao" minOccurs="1" maxOccurs="1">
                <xsd:annotation>
                    <xsd:documentation>
                        2: Autorização 3:Cancelamento 4:Captura 5:Tokenização 6:Consulta 7:ConsultaChSec 8:AutorizacaoTid
                    </xsd:documentation>
                </xsd:annotation>
                <xsd:simpleType>
                    <xsd:restriction base="xsd:string">
                        <xsd:pattern value="(2|3|4|5|6|7|8)"></xsd:pattern>                        
                    </xsd:restriction>
                </xsd:simpleType>
            </xsd:element>
            <xsd:element name="lista-requisicoes"
                type="ListaRequisicoesLote" maxOccurs="unbounded"
                minOccurs="1">
            </xsd:element>

        </xsd:sequence>
    </xsd:complexType>

    <xsd:complexType name="RetornoLote">
        <xsd:sequence>
            <xsd:element name="dados-ec" type="DadosEc"></xsd:element>
            <xsd:element name="numero-lote" type="numeroLoteType"></xsd:element>
            <xsd:element name="lista" type="ListaRetornoLote"></xsd:element>
        </xsd:sequence>
    </xsd:complexType>
    
    <xsd:complexType name="ListaRequisicoesLote">
        <xsd:sequence>
            <xsd:element name="requisicao-transacao"
                type="RequisicaoNovaTransacao" maxOccurs="unbounded"
                minOccurs="0">
            </xsd:element>
            <xsd:element name="requisicao-token" type="RequisicaoToken"
                maxOccurs="unbounded" minOccurs="0">
            </xsd:element>
            <xsd:element name="requisicao-consulta"
                type="RequisicaoConsulta" maxOccurs="unbounded" minOccurs="0">
            </xsd:element>
            <xsd:element name="requisicao-cancelamento"
                type="RequisicaoCancelamento" maxOccurs="unbounded"
                minOccurs="0">
            </xsd:element>
            <xsd:element name="requisicao-captura"
                type="RequisicaoCaptura" maxOccurs="unbounded" minOccurs="0">
            </xsd:element>

            <xsd:element name="requisicao-consulta-chsec"
                type="RequisicaoConsultaChSec" maxOccurs="unbounded"
                minOccurs="0">
            </xsd:element>
            <xsd:element name="requisicao-autorizacao-tid"
                type="RequisicaoAutorizacaoTid" maxOccurs="unbounded" minOccurs="0">
            </xsd:element>
        </xsd:sequence>
    </xsd:complexType>

    <xsd:complexType name="ListaRetornoLote">
        <xsd:sequence>
            <xsd:element name="transacao" type="Retorno" maxOccurs="unbounded" minOccurs="0"></xsd:element>
            <xsd:element name="retorno-token" type="RetornoToken" maxOccurs="unbounded" minOccurs="0"></xsd:element>
            <xsd:element name="erro" type="RequisicaoErro" maxOccurs="unbounded" minOccurs="0"></xsd:element>
        </xsd:sequence>
    </xsd:complexType>

    <xsd:complexType name="RequisicaoDownloadRetornoLote">
        <xsd:complexContent>
            <xsd:extension base="Mensagem">
                <xsd:sequence>
                    <xsd:element name="dados-ec" type="DadosEc" maxOccurs="1" minOccurs="1"></xsd:element>
                    <xsd:element name="numero-lote" type="numeroLoteType" maxOccurs="1" minOccurs="1"></xsd:element>
                </xsd:sequence>
            </xsd:extension>
        </xsd:complexContent>
    </xsd:complexType>

    <xsd:complexType name="RetornoDownloadLote">
        <xsd:sequence>
            <xsd:element name="erro" type="RequisicaoErro" maxOccurs="1"
                minOccurs="0">
            </xsd:element>
            <xsd:element name="arquivo" type="xsd:string" maxOccurs="1"
                minOccurs="0">
            </xsd:element>
            <xsd:element name="mensagem" type="xsd:string" maxOccurs="1" minOccurs="0"></xsd:element>
        </xsd:sequence>
    </xsd:complexType>

    <xsd:element name="requisicao-download-retorno-lote"
        type="RequisicaoDownloadRetornoLote">
    </xsd:element>

    <xsd:element name="retorno-download-lote"
        type="RetornoDownloadLote">
    </xsd:element>
    
    <xsd:complexType name="RetornoUploadLote">
        <xsd:sequence>
            <xsd:element name="data-envio" type="xsd:dateTime" maxOccurs="1" minOccurs="1"></xsd:element>
            <xsd:element name="data-retorno" type="xsd:dateTime" maxOccurs="1" minOccurs="1"></xsd:element>            
            <xsd:element name="mensagem" type="xsd:string" maxOccurs="1" minOccurs="1"></xsd:element>            
        </xsd:sequence>
    </xsd:complexType>

    <xsd:element name="retorno-upload-lote" type="RetornoUploadLote"></xsd:element>
</xsd:schema>
```

# Testes e Homologação

## Endpoint

Os testes de integração deverão ser realizados antes do início da homologação, durante o desenvolvimento (codificação) da solução. Para isso, deve-se considerar o seguinte ambiente como EndPoint do Webservice: [https://qaseCommerce.cielo.com.br/servicos/ecommwsec.do](https://qaseCommerce.cielo.com.br/servicos/ecommwsec.do)

<aside class="warning">Toda a conexão aos serviços da Cielo deve ser feita através das URL’s divulgadas neste manual. A Cielo desaconselha fortemente a conexão direta via IP, uma vez que estes podem variar sem aviso prévio.</aside>

## Dados para testes

A massa de dados para realizar os testes neste ambiente está disposta na tabela abaixo:

| Bandeira   | Autenticação | Número do cartão de teste | Validade | Código de segurança - CVC |
|------------|--------------|---------------------------|----------|---------------------------|
| Visa       | Sim          | 4012001037141112          | 05/2018  | 123                       |
| Mastercard | Sim          | 5453010000066167          | 05/2018  | 123                       |
| Visa       | Não          | 4012001038443335          | 05/2018  | 123                       |
| Mastercard | Não          | 5453010000066167          | 05/2018  | 123                       |
| Amex       | Não          | 376449047333005           | 05/2018  | 1234                      |
| Diners     | Não          | 36490102462661            | 05/2017  | 123                       |
| Elo        | Não          | 6362970000457013          | 05/2018  | 123                       |
| Discover   | Não          | 6011020000245045          | 05/2018  | 123                       |
| JCB        | Não          | 3566007770004971          | 05/2018  | 123                       |
| Aura       | Não          | 5078601912345600019       | 05/2018  | 123                       |

## Chave de testes

Para facilitar o desenvolvimento disponibilizamos duas chaves para testes, uma para cada modalidade de integração. Com base nas configurações iniciais feitas durante o seu credenciamento, escolha os dados corretos para realizar os testes:

|Número estabelecimento comercial|Chave de testes|
|---|---|
|1006993069|25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3|

<aside class="warning">O valor do pedido além de seguir o formato sem pontos ou vírgulas decimais, deve terminar em “00”, caso contrário, a autorização será sempre negada. Exemplo: R$ 15,00 deve ser formatado como “1500”.</aside>

<aside class="notice">O ambiente de testes só deve ser utilizado pelos estabelecimentos de testes listados no quadro acima. O uso de dados originais do estabelecimento gerará transações não possíveis de rastreamento, gerando resultados incorretos. No ambiente de testes, use as credenciais para testes, no ambiente de produção, use os dados originais do estabelecimento.</aside>

Após a conclusão do desenvolvimento, a etapa de Homologação garantirá que a implementação foi adequada e a solução do Cliente está apta para interagir no ambiente produtivo da Cielo. Ela sempre acontece depois que o desenvolvimento foi finalizado e testado. É composta pelas seguintes etapas:

![fluxo testes]({{ site.baseurl_root }}/images/fluxo-testes.png)

1. Finalização do Cadastro: nesta etapa o Cliente deve enviar um email para [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br), solicitando a Chave de Produção. A mensagem deve conter as
seguintes informações, que irão completar o cadastro:
  * URL Definitiva do site (ambiente de produção).
  * Nome da empresa responsável pelo desenvolvimento da integração.
  * Nome e e-mail do técnico (desenvolvedor) responsável pela integração.
  * Número de credenciamento (junto à Cielo) da loja virtual.
  * Razão social e nome fantasia da loja virtual.
  * Um usuário e senha na loja virtual para efetuar compras de testes.
  * URL do logotipo da loja no formato GIF e tamanho de 112X25 pixels.

<aside class="notice">A imagem do logotipo deve estar hospedada em ambiente seguro (HTTPS), caso contrário o consumidor receberá notificações de segurança que podem culminar no abandono da compra.</aside>

Em resposta, a Cielo retornará uma chave válida no ambiente de produção. Logo, a loja está habilitada a realizar seus testes nesse ambiente. Inicia-se a segunda etapa. É importante que testes sejam realizados para cobrir os seguintes tópicos:

* Interação com o Webservice: testes com a conexão utilizada.
* Integração visual: a ida e a volta do fluxo a Cielo (fluxos alternativos devem ser
* considerados).
* Aplicação correta da marca da bandeira.
* Modalidades de pagamento: testes com as combinações possíveis de pagamento.

Neste momento, deve-se considerar o ambiente: [https://ecommerce.cielo.com.br/servicos/ecommwsec.do](https://ecommerce.cielo.com.br/servicos/ecommwsec.do)

<aside class="notice">A integração da loja virtual deverá ser feita sempre através da URL acima e não por IP.</aside>

Os testes em produção devem ser feitos com cartões de propriedade da Loja ou cujo portador tenha autorizado seu uso, uma vez que neste ambiente existe compromisso financeiro sobre as transações realizadas.

Ao término, uma nova solicitação deve ser enviada para cieloeCommerce@cielo.com.br, para que a Cielo realize a homologação de fato. Um conjunto de testes será executado aprovar e negar transações. O resultado “HOMOLOGADO” é enviado por e-mail. Caso haja algum ponto que não permite a conclusão da homologação, a informação será igualmente enviada por email solicitando as correções necessárias.

# Considerações Finais

## Regras para leitura do cartão na loja

A leitura dos dados do cartão no ambiente próprio é controlada por regras definidas pelo programa de segurança imposto pelas bandeiras de cartões.

Para a Visa, esse programa é o conhecido como AIS (Account Information Security) PCI. Para maiores informações acesse: [https://www.cielo.com.br](https://www.cielo.com.br) > Serviços > Serviços de Segurança > AIS – Programa de Segurança da Informação , ou entre em contato conosco.

Para a Mastercard o programa de segurança é o SDP (Site Data Protection) PCI. Para maiores informações acesse: [http://www.mastercard.com/us/sdp/index.html](http://www.mastercard.com/us/sdp/index.html), ou entre em contato conosco.

Ademais, atendidos os requisitos, no momento do credenciamento eCommerce deve ser mencionada a escolha por leitura do cartão na própria loja.

## Certificado digital

Em alguns ambientes é preciso extrair o Certificado Digital que a aplicação do Cielo eCommerce utiliza para ser instalado na Trustedstore do cliente, especialmente em ambientes Java e PHP.

Para obter o certificado, abra um browser e acesse [http://ecommerce.cielo.com.br](http://ecommerce.cielo.com.br) e clique no ícone que exibe as informações sobre o certificado:

**Google Chrome**:

![Certificado no Google Chrome]({{ site.baseurl_root }}/images/certificado-chrome.png)

**Mozilla Firefox**:

![Certificado no Mozilla Firefox]({{ site.baseurl_root }}/images/certificado-firefox.png)

**Internet Explorer**:

![Certificado no Internet Explorer]({{ site.baseurl_root }}/images/certificado-ie.png)

Programa **Verified by Visa** (Visa)

Programa internacional da Visa para possibilitar a autenticação do comprador no momento de uma compra em ambiente eCommerce. Visite [http://www.verifiedbyvisa.com.br/](http://www.verifiedbyvisa.com.br/) para maiores informações.

Programa **Secure Code** (Mastercard)

Programa internacional da Mastercard para possibilitar a autenticação do comprador no momento de uma compra em ambiente eCommerce. Visite [http://www.mastercard.com/securecode](http://www.mastercard.com/securecode) para maiores informações.
