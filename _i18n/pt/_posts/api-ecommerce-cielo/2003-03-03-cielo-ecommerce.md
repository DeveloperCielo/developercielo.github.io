---
layout: manual
title: Manual de Integração API e-commerce Cielo
description: Manual integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 2
tags:
  - API Pagamento
language_tabs:
  json: JSON
  shell: cURL
  
---

# API E-commerce Cielo

# Visão geral

O objetivo desta documentação é orientar sobre a integração da **API e-commerce Cielo**, descrevendo as funcionalidades, os métodos HTTP, listando informações a serem enviadas e recebidas e provendo exemplos.

**Conhecimentos necessários**: recomendamos conhecimentos intermediários em linguagem de programação para web, requisições HTTP/HTTPS e manipulação de arquivos JSON.

Para executar as operações da API e-commerce Cielo você deverá usar sua chave específica (`Merchant ID` e `Merchant Key`) nos respectivos endpoints dos ambientes:

|                 | Sandbox                                             | Produção                                      |
|:----------------|:---------------------------------------------------:|:---------------------------------------------:|
| **Transacional** | https://apisandbox.cieloecommerce.cielo.com.br      | https://api.cieloecommerce.cielo.com.br/      |
| **Consultas**   | https://apiquerysandbox.cieloecommerce.cielo.com.br | https://apiquery.cieloecommerce.cielo.com.br/ |

Para executar uma operação, combine a URL base do ambiente com a URL da operação desejada e envie utilizando o verbo HTTP conforme descrito na operação.

> [Faça o download do tutorial]({{ site.baseurl }}/attachment/merchantid-merchantkey-cielo.pdf){:target="_blank"} para saber como gerar seu **MerchantId** e **MerchantKey** no [portal da Cielo](https://www.cielo.com.br/){:target="_blank"}.

## Características da solução

A solução **API e-commerce Cielo** foi desenvolvida com a tecnologia REST, que é padrão de mercado e independe da tecnologia utilizada pelo seu e-commerce. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação.

Para obter exemplos dessas linguagens, veja nosso [**Tutorial de conversão Postman**](https://developercielo.github.io/tutorial/postman){:target="_blank"}.

Entre outras características, os atributos que mais se destacam na plataforma API e-commerce Cielo:

* **Ausência de aplicativos proprietários**: não é necessário instalar aplicativos no ambiente da loja virtual em nenhuma hipótese.
* **Simplicidade**: o protocolo utilizado é puramente o HTTPS.
* **Facilidade de testes**: a plataforma Cielo oferece um ambiente Sandbox publicamente acessível, que permite ao desenvolvedor a criação de uma conta de testes sem a necessidade de credenciamento, facilitando e agilizando o início da integração.
* **Credenciais**: o tratamento das credenciais do cliente, número de afiliação (`MerchantId`)e chave de acesso`(MerchantKey`) trafega no cabeçalho da requisição HTTP da mensagem.
* **Segurança**: a troca de informações se dá sempre entre o Servidor da Loja e da Cielo, ou seja, sem o browser do comprador.
* **Multiplataforma**: a integração é realizada através de Web Service REST.

## Arquitetura da integração

O modelo empregado na integração das APIs é simples e se baseia na utilização de duas URLs:
* URL transacional - específica para operações como autorização, captura e cancelamento de transações.
* URL de consulta - para operações consultivas, como uma pesquisa de transações.

<br/>Para executar uma operação:

1. Combine a **base** da URL do ambiente com o **_endpoint_** da operação desejada. Ex.: https://api.braspag.com.br/*v2/sales/*.
2. Envie a requisição para a URL utilizando o método HTTP adequado à operação.

|Método HTTP|Descrição|
|---|---|
|**GET**|Retorna recursos já existentes, ex.: consulta de transações.|
|**POST**|Cria um novo recurso, ex.: criação de uma transação.|
|**PUT**|Atualiza um recurso existente, ex.: captura ou cancelamento de uma transação previamente autorizada.|

Todas a operações requerem as credenciais de acesso **"Merchant ID"** e **"Merchant Key"**, que devem ser enviadas no cabeçalho (*header*) da requisição.<br>
<br>Cada envio de requisição irá retornar um código de [Status HTTP](https://braspag.github.io//manual/braspag-pagador?json#lista-de-http-status-code), indicando se ela foi realizada com sucesso ou não.

## Glossário 

Para facilitar o entendimento, listamos abaixo um pequeno glossário com os principais termos relacionados ao eCommerce, ao mercado de cartões e adquirencia:

|Termo|Descrição|
|---|---|
|**Autenticação**|processo para assegurar que o comprador é realmente aquele quem diz ser (portador legítimo), geralmente ocorre no banco emissor com uso de um token digital ou cartão com chaves de segurança.|
|**Autorização**|processo para verificar se uma compra pode ou não ser realizada com um cartão. Nesse momento, são feitas diversas verificações com o cartão e com o portador (ex.: adimplência, bloqueios, etc.) É também neste momento que o limite do cartão é sensibilizado com o valor da transação.|
|**Cancelamento**|processo para cancelar uma compra realizada com cartão.|
|**Captura**|processo que confirma uma autorização que foi realizada previamente. Somente após a captura, é que o portador do cartão poderá visualizá-la em seu extrato ou fatura.|
|**Comprador**|É aquele que efetua compra na loja virtual.|
|**Emissor (ou banco emissor)**|É a instituição financeira que emite o cartão de crédito, débito ou voucher.|
|**Estabelecimento comercial ou EC**|É o número de dez posições que identifica o cadastro da loja na Cielo.|
|**Gateway de pagamentos**|Empresa responsável pelo integração técnica e processamento das transações.|
|**Portador**|É a pessoa que tem o porte do cartão no momento da venda.|
|**TID (Transaction Identifier)**|código composto por 20 caracteres que identificada unicamente uma transação e-commerce Cielo.|

## Produtos e Bandeiras suportadas 

A versão atual da API e-commerce Cielo possui suporte às seguintes bandeiras e produtos:

| Bandeira         | Crédito à vista | Crédito parcelado Loja | Débito | Voucher | Internacional |
|------------------|-----------------|------------------------|--------|---------|---------------|
| Visa             | Sim             | Sim                    | Sim    | *Não*   | Sim           |
| Master Card      | Sim             | Sim                    | Sim    | *Não*   | Sim           |
| American Express | Sim             | Sim                    | *Não*  | *Não*   | Sim           |
| Elo              | Sim             | Sim                    | *Não*  | *Não*   | Sim           |
| Diners Club      | Sim             | Sim                    | *Não*  | *Não*   | Sim           |
| Discover         | Sim             | Não                    | *Não*  | *Não*   | Sim           |
| JCB              | Sim             | Sim                    | *Não*  | *Não*   | Sim           |
| Aura             | Sim             | Sim                    | *Não*  | *Não*   | Sim           |
| Hipercard        | Sim             | Sim                    | *Não*  | *Não*   | *Não*         |

<aside class="warning">Cartões emitidos no exterior não possuem permissão de parcelamento.</aside>

# Certificados e segurança

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

## Como instalar o **Certificado Extended Validation** no servidor da Loja?

Basta instalar os três arquivos a seguir na Trustedstore do servidor. A Cielo não oferece suporte para a instalação do Certificado. Caso não esteja seguro sobre como realizar a instalação do Certificado EV, então você deverá ser contatado o suporte do fornecedor do seu servidor.

* [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
* [Certificado Intermediária]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/cieloecommerce.cert-2021-2022.zip)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning"><b>A Cielo não oferece suporte para a instalação do Certificado.</b></aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

**1o Passo:**

Salvar os três arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

* [Certificado Raiz]({{ site.baseurl_root }}/attachment/Root.crt)
* [Certificado Intermediária]({{ site.baseurl_root }}/attachment/intermediate1.crt)
* [Certificado E-Commerce Cielo]({{ site.baseurl_root }}/attachment/intermediate2.cer)

**2o Passo:**

No “Internet Explorer”, clique no menu “Ferramentas” e acesse as “Opções da Internet”:

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-1.jpg)

No “Firefox”, clique no menu “Abrir Menu” e acesse “Avançado” e “Opções”:

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-1.jpg)

No “Chrome”, clique no “Personalizar e Controlar o Google Chrome” e acesse “Configurações” e “Mostrar configurações avançadas... “Alterar Configurações de Proxy e “Conteúdo” e Certificados:

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-1.jpg)

**3o Passo:**

No Internet Explorer, em “Certificados”, clique em “Importar”.

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-2.jpg)

No Firefox clique em “Ver Certificados”, clique em “Importar”

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-2.jpg)

No Chrome clique em “Gerenciar Certificados”, clique em “Importar”

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-2.jpg)

**4o Passo:**

No Internet Explorer e Chrome “Assistente para Importação de Certificados”, clique em “Avançar”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-3.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-4.jpg)

No Firefox “Aba Servidores ”, clique em “Importar”

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-3.jpg)

**5o Passo:**

No Chrome e Internet Explorer “Assistente para Importação de Certificados”, clique em “Procurar”, procure a pasta onde estão os arquivos e selecione o arquivo “cieloecommerce.cielo.com.br.crt, clique em “Abrir” e em seguida “Avançar”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-5.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-6.jpg)

**6o Passo:**

Selecionar a opção desejada: adicionar o Certificado em uma pasta padrão ou procurar a pasta de sua escolha.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-7.jpg)

**7o Passo:**

Clique em “Concluir”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-8.jpg)

**8o Passo:**

Clique em “Ok” para concluir a importação.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">No Firefox não consta a mensagem de Importação com Êxito, apenas conclui a importação.</aside>

O Certificado poderá ser visualizado na aba padrão “Outras Pessoas” ou na escolhida pelo cliente.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-10.jpg)

**9o Passo:**

Repita o mesmo procedimento para os 3 arquivos enviados.

# Sandbox e Ferramentas

## Sobre o Sandbox

Para facilitar os testes durante a integração, a Cielo oferece um ambiente Sandbox que permite simular as mensagerias da API. O ambiente Sandbox está programado com respostas preparadas para todas as funcionalidades previstas na API Cielo E-commerce.

|INFORMAÇÃO|URL|
|---|---|
|Credenciais de acesso|`MerchantId` e `MerchantKey` obtidos após criação da conta de testes em [**Cadastro do Sandbox**](https://cadastrosandbox.cieloecommerce.cielo.com.br/){:target="_blank"}|
|Base da URL transacional|https://apisandbox.cieloecommerce.cielo.com.br|
|Base da URL para consultas|https://apiquerysandbox.cieloecommerce.cielo.com.br|

**Vantagens de utilizar o Sandbox**

* Não é necessário uma afiliação para utilizar o Sandbox Cielo.
* Basta acessar o [**Cadastro do Sandbox**](https://cadastrosandbox.cieloecommerce.cielo.com.br/){:target="_blank"} para criar uma conta.

## Ferramenta para Integração

Você pode usar o Postman para testar a sua integração, usando a collection da API e-commerce Cielo.

### Collection

> **Link de importação**: [https://www.postman.com/collections/7313fe78130211f5f009](https://www.postman.com/collections/7313fe78130211f5f009){:target="_blank"}

|Ambiente|Endpoints|
|---|---|
|Sandbox|**Envio de transação**:  https://apisandbox.cieloecommerce.cielo.com.br <br> **Consulta transação**: https://apiquerysandbox.cieloecommerce.cielo.com.br/|
|Produção|**Envio de transação**: https://api.cieloecommerce.cielo.com.br/ <br> **Consulta transação**: https://apiquery.cieloecommerce.cielo.com.br/|

### Environment

Faça download do arquivo [**Environment Produção e Sandbox**](https://github.com/DeveloperCielo/developercielo.github.io/blob/docs/attachment/postman/apicielo2021.rar){:target="_blank"} e substitua os MerchantIDs e MerchantKeys pelos os da sua Loja.

## Cartão de crédito - Sandbox

Com esse meio de pagamento é possível simular os fluxos de:

* Autorização;
* Captura parcial e total;
* Cancelamento;
* Consulta.<br/>

Para melhor aproveitar o meio de pagamento Simulado, você pode criar um número de cartão usando um gerador de cartões da internet ou escolhendo números aleatórios; para qualquer opção, os 15 primeiros dígitos do cartão podem ser aleatórios e o último dígito deve ser o número correspondente ao status da transação que deseja testar.

As informações de **Cód.Segurança (CVV)** e validade podem ser aleatórias, mantendo o CVV com 3 dígitos e a validade no formato MM/YYYY. 

<aside class="notice">Tokenização: Se o objetivo for testar uma transação na API Cielo E-commerce salvando o número do cartão, recomendamos usar um gerador de cartões para atender a regra do mod10 (Algoritimo de Luhn), que é empregada nos ambientes Sandbox e de Produção.</aside>
<br/>
<aside class="notice">Para simular um cenário de autorização com sucesso de uma solicitação de Zeroauth no sandbox, é necessário enviar a requisição com um número de cartão iniciado com o dígito 5, independente da bandeira (exemplo: **5XXX.XXXX.XXXX.XXX4**).</aside>
<br/>
<aside class="notice">Os <code>status</code> das transações são definidos pelos FINAIS de cada cartão, assim como o <code>ReturnCode</code>.</aside>

|Final do Cartão      | Status da Transação   | Código de Retorno  | Mensagem de Retorno               |
|---------------------|-----------------------|--------------------|-----------------------------------|
| XXXX.XXXX.XXXX.XXX0<br>XXXX.XXXX.XXXX.XXX1<br>XXXX.XXXX.XXXX.XXX4 | Autorizado            |  4/6      | Operação realizada com sucesso    |
| XXXX.XXXX.XXXX.XXX2 | Não Autorizado        |  05                | Não Autorizada                    |
| XXXX.XXXX.XXXX.XXX3 | Não Autorizado        |  57                | Cartão Expirado                   |
| XXXX.XXXX.XXXX.XXX5 | Não Autorizado        |  78                | Cartão Bloqueado                  |
| XXXX.XXXX.XXXX.XXX6 | Não Autorizado        |  99                | Time Out                          |
| XXXX.XXXX.XXXX.XXX7 | Não Autorizado        |  77                | Cartão Cancelado                  |
| XXXX.XXXX.XXXX.XXX8 | Não Autorizado        |  70                | Problemas com o Cartão de Crédito |
| XXXX.XXXX.XXXX.XXX9 | Autorização Aleatória |  4 a 99            | Operation Successful / Time Out   |

O cartão de teste **4024.0071.5376.3191**, por exemplo, irá simular o status autorizado.

<aside class="notice"><strong>Atenção:</strong> O ambiente de sandbox avalia o formato e o final do cartão. Caso um cartão real seja enviado, o resultado da operação será idêntico ao descrito na tabela de cartões de teste.</aside>
<br/>
<aside class="warning">Atenção: Os códigos de retorno em Sandbox não são os mesmos disponiveis em produção.</aside>

**Para consultar os retornos em Produção**, veja os [Códigos da API](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-da-api).

## Cartão de débito - Sandbox

Com esse meio de pagamento é possível simular os fluxos de: 

* Autorização;
* Cancelamento;
* Consulta.
<br/>
A transação de débito precisa passar por uma autenticação:

* **Autenticação via 3DS 2.0**: aprenda a simular a autenticação 3DS 2.0 em sandbox na [documentação do 3DS](https://developercielo.github.io/manual/3ds); 
* **URL de Autenticação**: está sendo descontinuada. Nesse tipo de autenticação, o fluxo transacional do cartão de débito funciona com a Resposta da transação retornando uma URL de Autenticação. Na tela de autenticação a opção escolhida define o status da transação:
<br/>

|Opção|Status|
|---|---|
|Autenticado|Autorizado|
|Não Autenticado|Negado|
|Não usar a URL|Não Finalizado|

<aside class="notice"><strong>Transferência Online:</strong> O mesmo comportamento do Cartão de débito em Sandbox é valido para cartão de débito</aside>

## Outros meios de pagamento - Sandbox

Outros meios de pagamento não possuem cartões ou dados específicos simulados, como no caso do cartão de crédito.
Abaixo especificamos qualquer diferença existente:

|Meio de pagamento|Orientações para Sandbox|
|---|---|
|Boleto|Para enviar uma transação de boleto no ambiente sandbox você deve colocar o `Provider` como **"Simulado"**.<br>Não há validação bancária. O boleto se comporta como um boleto sem registro.|
|Alelo|Use os mesmos valores da requisição do ambiente de produção para [Cartões Alelo](https://developercielo.github.io/manual/cielo-ecommerce#cart%C3%B5es-alelo).|
|QR Code| Use os mesmos valores da requisição do ambiente de produção para [QR Code](https://developercielo.github.io/manual/cielo-ecommerce#qr-code). Não tem a conciliação bancária.|
|Carnê|Use os mesmos valores da requisição do ambiente de produção para [Carnê](https://developercielo.github.io/manual/cielo-ecommerce#carn%C3%AA).|
|Transferência eletrônica|O `Provider` utilizado deve ser **"Simulado"** <br><br> A URL de redirecionamento para o ambiente do banco será uma tela para escolher o estado da autenticação.|

## Renova Fácil – Sandbox

Para simular uma transação com retorno de um novo cartão, atualizado pelo nosso serviço [Renova Fácil]({{ site.baseurl }}https://developercielo.github.io/manual/cielo-ecommerce#renova-f%C3%A1cil){:target="_blank"}, siga as orientações abaixo. Para saber mais como funciona a funcionalidade, acesse o menu “Recorrência” e depois “Renova Fácil”.

Na requisição de autorização, além dos campos já previstos para o meio de pagamento utilizado, é necessário enviar os seguintes:

* No campo `CreditCard.CardNumber`: enviar um cartão com o número final sendo 3 (que simula um cenário de cartão vencido, vide tabela de cartões simulados presente na documentação).
* No campo `CreditCard.ExpirationDate`: enviar uma data de validade já vencida.
* Mandar o campo `Payment.Recurrent` preenchido como true, para marcar a transação como recorrente.

## Consulta BIN - Sandbox

O BIN de um cartão é composto pelos seis primeiros dígitos. Na simulação da Consulta BIN em ambiente sandbox, cada um dos seis primeiros dígitos vai reger um resultado simulado. 

É possível montar uma numeração de cartão para teste e observar o retorno esperado de acordo com diferentes cenários.

O BIN de um cartão retorna a bandeira, o tipo, a nacionalidade, se o cartão é corporativo ou não, o retorno da análise de BIN e o emissor do cartão. Para saber mais, leia a seção [**Consulta BIN**](https://developercielo.github.io/manual/cielo-ecommerce#consulta-bin) neste mesmo manual.

|   Dígito  | O que indica                             | Retorno |
|-----------|------------------------------------------|---------|
| 1º dígito | Bandeira.                       | Se for '**3**' retorna "**AMEX**"<br>Se for '**5**' retorna "**MASTERCARD**"<br>Se for '**6**' retorna "**DISCOVER**"<br>Qualquer outro número retorna "**VISA**".|
| 2º dígito | Tipo do cartão.                 | Se for '**3**' retorna "**Débito**"<br>Se for '**5**' retorna "**Crédito**"<br>Se for '**7**' retorna "**Crédito**" e retorna o campo `Prepaid`como "**true**"<br>Qualquer outro número retorna"**Múltiplo**".|
| 3º dígito | Nacionalidade do cartão.        | Se for '**1**' retorna "**true**" (cartão nacional)<br>Qualquer número diferente de '**1**' retorna "**false**" (cartão internacional).|
| 4º dígito | Se o cartão é corporativo ou não. | Se for '**1**' retorna "**true**" (é cartão corporativo)<br>Qualquer número diferente de '**1**' retorna "**false**" (não é cartão corporativo).|
| 5º dígito | Retorno da análise.             | Se for '**2**' retorna "**01 - Bandeira não suportada**"<br>Se for '**3**' retorna "**02 - Voucher - Não suportado na consulta de bins**"<br>Qualquer outro número retorna "**00 - Analise autorizada**"|
| 6º dígito | Banco emissor.                  | Se for '**1**' retorna "**104**" e "**Caixa**"<br>Se for '**2**' retorna "**001**" e "**Banco do Brasil**"<br>Qualquer outro número retorna "**237**" e "**Bradesco**"|

**Exemplo** 

O cartão com a numeração **4110110012341234** irá retornar os seguintes dados: 

![Consulta BIN Sandbox]({{ site.baseurl_root }}/images/apicieloecommerce/consultabin-sdbx-cielo.png)

### Requisição

<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/cardBin/`BIN`</span></aside>

```shell
curl
--request GET https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/411011
--header "Content-Type: application/json"
--data-binary
--verbose
```

### Resposta

```json
{
    "Status": "00",
    "Provider": "VISA",
    "CardType": "Multiplo",
    "ForeignCard": false,
    "CorporateCard": false,
    "Issuer": "Banco do Brasil",
    "IssuerCode": "001"
}
```

```shell
curl
{
    "Status": "00",
    "Provider": "VISA", 
    "CardType": "Multiplo",
    "ForeignCard": false,
    "CorporateCard": false,
    "Issuer": "Banco do Brasil",
    "IssuerCode": "001"
}
--verbose
```

# Meios de Pagamento

## Cartões de crédito e débito

### Cartão de Crédito

Para que você possa disfrutar de todos os recursos disponíveis em nossa API, é importante que antes você conheça os conceitos envolvidos no processamento de uma transação de cartão de crédito.

|Conceito|Descrição|
|---|---|
|**Autenticação**|É um processo de verificação do portador do cartão realizado pelo banco emissor para trazer mais segurança para a venda e possibilitando que a risco de fraude fique para o emissor.|
|**Autorização**|Etapa em que a Cielo faz a conexão com o sistema do banco emissor e da bandeira para aprovar uma transação de cartão. A pré-autorização apenas sensibiliza o limite do cliente, mas ainda não gera cobrança para o consumidor. Para efetivação da cobrança é necessária a ocorrência da captura.|
|**Captura**|Após a autorização, para que a venda seja concretizada e a cobrança seja efetivada no cartão, ocorre o movimento de captura.|
|**Cancelamento**|O cancelamento acontece quando o estabelecimento não quer mais prosseguir com uma transação. Esse movimento pode ser realizado tanto para transações autorizadas quanto para capturadas.|

<aside class="warning">IMPORTANTE: O número de identificação do pedido (MerchantOrderId) não sofre alteração, se mantendo o mesmo ao longo de todo o fluxo transacional. Contudo, um número adicional pode ser gerado para o pedido e utilizado durante a transação. Esse número só será diferente em caso de adequação a regras da adquirente ou em caso de números de identificação do pedido (MerchantOrderId) repetidos. Para fins de conciliação, é necessário usar o TransactionId.</aside>

#### Criando uma transação de crédito

Para criar uma transação de cartão de crédito, envie uma requisição utilizando o método `POST` conforme o exemplo a seguir. Esse exemplo contempla todos os campos possíveis que você pode enviar na requisição; consulte quais campos são ou não obrigatórios na tabela de propriedades da requisição.

> A **captura** da transação da crédito pode ser **automática** ou **posterior**. Para captura automática, envie o campo `Payment.Capture` na requisição como “true”. Para captura posterior, envie o campo como "false" e, posteriormente, faça a [requisição de captura](https://developercielo.github.io/manual/cielo-ecommerce#captura).

<aside class="notice"><strong>Atenção:</strong> Não é possivel realizar uma transação com valor (`Amount`) 0.</aside>

<aside class="notice"><strong>Atenção:</strong> No header da requisição, use o Content-Type application/json .</aside>

Saiba como realizar uma transação de crédito com autenticação em [Autenticando uma Transação](https://developercielo.github.io/manual/cielo-ecommerce#cart%C3%A3o-de-cr%C3%A9dito-com-autentica%C3%A7%C3%A3o).

##### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador crédito completo",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
   },
   "Payment":{  
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":"false",
     "Payment.Recurrent":"false",
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true,
     "Type":"CreditCard",
     "Amount":15700,
     "AirlineData":{
         "TicketNumber":"AR988983"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador crédito completo",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
   },
   "Payment":{  
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "Payment.Recurrent":"false",
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true,
     "Type":"CreditCard",
     "Amount":15700,
     "AirlineData":{
         "TicketNumber":"AR988983"
     }
   }
}
--verbose
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Sim|Identificador da loja na Cielo.|
|`MerchantKey`|Texto|40|Sim|Chave Publica para Autenticação Dupla na Cielo.|
|`Content-Type`|Header|40|Sim|application/json (obrigatório o envio deste).|
|`RequestId`|Guid|36|Não|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.|
|`MerchantOrderId`|Texto|50|Sim|Numero de identificação do Pedido.|
|`Customer.Name`|Texto|255|Não|Nome do Comprador.|
|`Customer.Status`|Texto|255|Não|Status de cadastro do comprador na loja (NEW / EXISTING)|
|`Customer.Identity`|Texto|14|Não|Número do RG, CPF ou CNPJ do Cliente.|
|`Customer.IdentityType`|Texto|255|Não|Tipo de documento de identificação do comprador (CFP/CNPJ).|
|`Customer.Email`|Texto|255|Não|Email do Comprador.|
|`Customer.Birthdate`|Date|10|Não|Data de nascimento do Comprador.|
|`Customer.Address.Street`|Texto|255|Não|Endereço do Comprador.|
|`Customer.Address.Number`|Texto|15|Não|Número do endereço do Comprador.|
|`Customer.Address.Complement`|Texto|50|Não|Complemento do endereço do Comprador.br|
|`Customer.Address.ZipCode`|Texto|9|Não|CEP do endereço do Comprador.|
|`Customer.Address.City`|Texto|50|Não|Cidade do endereço do Comprador.|
|`Customer.Address.State`|Texto|2|Não|Estado do endereço do Comprador.|
|`Customer.Address.Country`|Texto|35|Não|Pais do endereço do Comprador.|
|`Customer.DeliveryAddress.Street`|Texto|255|Não|Endereço do Comprador.|
|`Customer.Address.Number`|Texto|15|Não|Número do endereço do Comprador.|
|`Customer.DeliveryAddress.Complement`|Texto|50|Não|Complemento do endereço do Comprador.|
|`Customer.DeliveryAddress.ZipCode`|Texto|9|Não|CEP do endereço do Comprador.|
|`Customer.DeliveryAddress.City`|Texto|50|Não|Cidade do endereço do Comprador.|
|`Customer.DeliveryAddress.State`|Texto|2|Não|Estado do endereço do Comprador.|
|`Customer.DeliveryAddress.Country`|Texto|35|Não|País do endereço do Comprador.|
|`Customer.Billing.Street`|string|24|não|Logradouro do endereço de cobrança|
|`Customer.Billing.Number`|string|5|não|Número do endereço de cobrança|
|`Customer.Billing.Complement`|string|14|não|Complemento do endereço de cobrança|
|`Customer.Billing.Neighborhood`|string|15|não|Bairro do endereço de cobrança|
|`Customer.Billing.City`|string|20|não |Cidade do endereço de cobrança|
|`Customer.Billing.State`|string|2|não|Estado do endereço de cobrança|
|`Customer.Billing.Country`|string|2|não| País do endereço de cobrança. Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui){:target="_blank"}|
|`Customer.Billing.ZipCode`|string|9|não|Código postal do endereço de cobrança|
|`Payment.Type`|Texto|100|Sim|Tipo do Meio de Pagamento.|
|`Payment.Amount`|Número|15|Sim|Valor do Pedido (ser enviado em centavos).|
|`Payment.Currency`|Texto|3|Não|Moeda na qual o pagamento será feito (BRL).|
|`Payment.Country`|Texto|3|Não|Pais na qual o pagamento será feito.|
|`Payment.Provider`|Texto|15|---|Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.|
|`Payment.ServiceTaxAmount`|Número|15|Não|Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.|
|`Payment.SoftDescriptor`|Texto|13|Não|O complemento do nome da loja que aparecerá na fatura do cartão. Não permite caracteres especiais.|
|`Payment.Installments`|Número|2|Sim|Número de Parcelas.|
|`Payment.Interest`|Texto|10|Não|Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).|
|`Payment.Capture`|Booleano|---|Não (Default false)|Booleano que identifica que a autorização deve ser com **captura automática (true)** ou **[captura posterior](https://developercielo.github.io/manual/cielo-ecommerce#captura) (false)**.|
|`Payment.Authenticate`|Booleano|---|Não (Default false)|Define se o comprador será direcionado ao Banco emissor para autenticação do cartão|
|`Payment.Recurrent`|Booleano|-|Não|Indica se a transação é do tipo recorrente (“true”) ou não (“false”). O valor “true” não originará uma nova recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. Authenticate deve ser “false” quando Recurrent é “true”.|
|`Payment.IsCryptocurrencyNegotiation`|Booleano|-|Não (default false)|Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda|
|`Payment.AirlineData.TicketNumber`|alfanumérico|13|Não|Informar o número do principal bilhete aéreo da transação.|
|`CreditCard.CardNumber`|Texto|19|Sim|Número do Cartão do Comprador.|
|`CreditCard.Holder`|Texto|25|Não|Nome do Comprador impresso no cartão. Não aceita caracteres especiais ou acentuação.|
|`CreditCard.ExpirationDate`|Texto|7|Sim|Data de validade impressa no cartão. Ex. MM/AAAA.|
|`CreditCard.SecurityCode`|Texto|4|Não|Código de segurança impresso no verso do cartão.|
|`CreditCard.SaveCard`|Booleano|---|Não (Default false)|Booleano que identifica se o cartão será salvo para gerar o CardToken.|
|`CreditCard.Brand`|Texto|10|Sim|Bandeira do cartão. Valores possíveis: Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.       |
|`CreditCard.CardOnFile.Usage`|Texto|-|Não|**First** se o cartão foi armazenado e é seu primeiro uso.<br>**Used** se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação|
|`CreditCard.CardOnFile.Reason`|Texto|-|Condicional|Indica o propósito de armazenamento de cartões, caso o campo "Usage" for "Used".<BR>**Recurring** - Compra recorrente programada (ex. assinaturas)<br>**Unscheduled** - Compra recorrente sem agendamento (ex. aplicativos de serviços)<br>**Installments** - Parcelamento através da recorrência.|

##### Resposta

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito completo",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
        },
        "IsCryptoCurrencyNegotiation": true,
        "TryAutomaticCancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "AirlineData":{
            "TicketNumber": "AR988983"
        },
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito completo",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
        },
        "IsCryptoCurrencyNegotiation": true,
        "TryAutomaticCancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Tid`|Id da transação na adquirente.|Texto|20|Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
|`SoftDescriptor`|Texto impresso na fatura bancaria do portador. Não permite caracteres especiais.|Texto|13|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Representa o quão segura é uma transação.|Texto|2|Exemplos: 7|
|`Status`|Status da Transação.|Byte|---|2|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Texto alfanumérico|
|`TryAutomaticCancellation`|Caso ocorra algum erro durante a autorização (status Não Finalizada - "0"), a resposta incluirá o campo “TryAutomaticCancellation” como true. Neste caso, a transação será consultada automaticamente, e caso tenha sido autorizada será cancelada automaticamente. Esta funcionalidade deverá estar habilitada para loja. Para habilitar, entre em contato com o nosso suporte técnico. |Booleano|-|true ou false|
|`Payment.PaymentAccountReference`|O PAR (Payment Account Reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado.|Numérico|29|---|

<aside class="warning">Atenção: Os retornos de autorização estão sujeitos a inserção de novos campos advindos das bandeiras/emissores. Faça sua integração de forma a prever este tipo de comportamento utilizando adequadamente as técnicas de serialização e deserialização de objetos.</aside>

### Cartão de Débito

Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo.

Todas as transações de débito devem ser autenticadas por exigência dos bancos emissores e bandeiras, com o objetivo de promover maior segurança. 

Para autenticar uma transação de débito, usamos o protocolo EMV 3DS 2.0; esse protocolo é um script integrado ao seu e-commerce que verifica a identidade do portador do cartão enquanto mantém uma boa experiência de compra ao consumidor e reduz o risco de fraude.

Para integrar o método de autenticação, consulte a [documentação do 3DS 2.0](https://developercielo.github.io/manual/3ds){:target="_blank"}.

<aside class="warning">IMPORTANTE: A Cielo não disponibiliza mais a primeira versão do protocolo de autenticação (3DS 1.0) já que as bandeiras e emissores estão descontinuando essa solução.</aside>

> **Débito sem autenticação**: ou “débito sem senha”, só pode ser realizada quando o e-commerce tem autorização do banco emissor para dispensa da autenticação. Caso você tenha essa permissão, envie o campo `Authenticate` como "false" na requisição padrão de cartão de débito.

#### Criando uma transação de débito

Para criar uma venda com cartão de débito, chame o método POST conforme o exemplo a seguir. O exemplo contempla o mínimo de campos necessários que devem ser enviados para a autorização.

> Na transação de débito padrão (com autenticação), envie `Authenticate` = "true".

##### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014121201",
   "Customer":{  
      "Name":"Comprador Cartão de débito"
   },
   "Payment":{  
     "Type":"DebitCard",
     "Authenticate": true,
     "Amount":15700,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014121201",
   "Customer":{  
      "Name":"Comprador Cartão de débito"
   },
   "Payment":{  
     "Type":"DebitCard",
     "Authenticate": true,
     "Amount":15700,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
}
--verbose
```

| Propriedade                | Descrição                                                                                             | Tipo     | Tamanho | Obrigatório        |
|----------------------------|-------------------------------------------------------------------------------------------------------|----------|---------|--------------------|
| `MerchantId`               | Identificador da loja na API Cielo eCommerce.                                                         | Guid     | 36      | Sim                |
| `MerchantKey`              | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto    | 40      | Sim                |
| `RequestId`                | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid     | 36      | Não                |
| `MerchantOrderId`          | Numero de identificação do Pedido.                                                                    | Texto    | 50      | Sim                |
| `Customer.Name`            | Nome do Comprador.                                                                                    | Texto    | 255     | Não                |
| `Customer.Status`          | Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude           | Texto    | 255     | Não                |
| `Payment.Type`             | Tipo do Meio de Pagamento.                                                                            | Texto    | 100     | Sim                |
| `Payment.Amount`           | Valor do Pedido (ser enviado em centavos).                                                            | Número   | 15      | Sim                |
| `Payment.Authenticate`     | Define se o comprador será direcionado ao Banco emissor para autenticação do cartão                   | Booleano | ---     | Sim (Default TRUE) |
| `Payment.ReturnUrl`        | URI para onde o usuário será redirecionado após o fim do pagamento                                    | Texto    | 1024    | Sim                |
|`Payment.IsCryptocurrencyNegotiation`|Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda|Booleano|-|Não (default false)|
| `DebitCard.CardNumber`     | Número do Cartão do Comprador.                                                                        | Texto    | 19      | Sim                |
| `DebitCard.Holder`         | Nome do Comprador impresso no cartão.                                                                 | Texto    | 25      | Não                |
| `DebitCard.ExpirationDate` | Data de validade impresso no cartão.                                                                  | Texto    | 7       | Sim                |
| `DebitCard.SecurityCode`   | Código de segurança impresso no verso do cartão.                                                      | Texto    | 4       | Não                |
| `DebitCard.Brand`          | Bandeira do cartão.                                                                                   | Texto    | 10      | Sim                |

##### Resposta

```json
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de débito"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "453211******3703",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "IsCryptoCurrencyNegotiation": true,
        "AuthenticationUrl": "https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?{PaymentId}",
        "Tid": "1006993069207A31A001",
        "PaymentId": "0309f44f-fe5a-4de1-ba39-984f456130bd",
        "Type": "DebitCard",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 0,
        "ReturnCode": "0",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de débito"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "453211******3703",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "IsCryptoCurrencyNegotiation": true,
        "AuthenticationUrl": "https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?{PaymentId}",
        "Tid": "1006993069207A31A001",
        "PaymentId": "0309f44f-fe5a-4de1-ba39-984f456130bd",
        "Type": "DebitCard",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 0,
        "ReturnCode": "0",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`AuthenticationUrl`|URL para qual o Lojista deve redirecionar o Cliente para o fluxo de Débito.|Texto|56|Url de Autenticação|
|`Tid`|Id da transação na adquirente.|Texto|20|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ReturnUrl`|Url de retorno do lojista. URL para onde o lojista vai ser redirecionado no final do fluxo.|Texto|1024|http://www.urllogista.com.br|
|`Status`|Status da Transação.|Byte|---|0|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|

### Autenticando uma transação

A Cielo oferece o serviço do 3DS 2.0, um protocolo de autenticação de transações. A autenticação é opcional para transações de cartão de crédito, e obrigatória para cartão de débito, por determinação das bandeiras e emissores.

Para integrar a autenticação às suas transações:

1. **Integre o script do 3DS 2.0** na sua página de pagamento, conforme [manual do 3DS](https://developercielo.github.io/manual/3ds){:target="_blank"};
2. Na **requisição das transações** de crédito ou débito, **envie o nó adicional** `ExternalAuthentication`, conforme exemplos a seguir.

<aside class="notice">A autenticação via 3DS 1.0 está sendo descontinuada pelas bandeiras. As novas integrações devem seguir o protocolo 3DS 2.0.</aside>

#### Cartão de crédito com autenticação

##### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador crédito completo",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
   },
   "Payment":{  
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":"false",
     "Payment.Recurrent":"false",
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true,
     "Type":"CreditCard",
     "Amount":15700,
     "AirlineData":{
         "TicketNumber":"AR988983"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador crédito completo",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
   },
   "Payment":{  
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "Payment.Recurrent":"false",
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true,
     "Type":"CreditCard",
     "Amount":15700,
     "AirlineData":{
         "TicketNumber":"AR988983"
     }
   }
}
--verbose
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Sim|Identificador da loja na Cielo.|
|`MerchantKey`|Texto|40|Sim|Chave Publica para Autenticação Dupla na Cielo.|
|`Content-Type`|Header|40|Sim|application/json (obrigatório o envio deste).|
|`RequestId`|Guid|36|Não|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.|
|`MerchantOrderId`|Texto|50|Sim|Numero de identificação do Pedido.|
|`Customer.Name`|Texto|255|Não|Nome do Comprador.|
|`Customer.Status`|Texto|255|Não|Status de cadastro do comprador na loja (NEW / EXISTING)|
|`Customer.Identity`|Texto|14|Não|Número do RG, CPF ou CNPJ do Cliente.|
|`Customer.IdentityType`|Texto|255|Não|Tipo de documento de identificação do comprador (CFP/CNPJ).|
|`Customer.Email`|Texto|255|Não|Email do Comprador.|
|`Customer.Birthdate`|Date|10|Não|Data de nascimento do Comprador.|
|`Customer.Address.Street`|Texto|255|Não|Endereço do Comprador.|
|`Customer.Address.Number`|Texto|15|Não|Número do endereço do Comprador.|
|`Customer.Address.Complement`|Texto|50|Não|Complemento do endereço do Comprador.br|
|`Customer.Address.ZipCode`|Texto|9|Não|CEP do endereço do Comprador.|
|`Customer.Address.City`|Texto|50|Não|Cidade do endereço do Comprador.|
|`Customer.Address.State`|Texto|2|Não|Estado do endereço do Comprador.|
|`Customer.Address.Country`|Texto|35|Não|Pais do endereço do Comprador.|
|`Customer.DeliveryAddress.Street`|Texto|255|Não|Endereço do Comprador.|
|`Customer.Address.Number`|Texto|15|Não|Número do endereço do Comprador.|
|`Customer.DeliveryAddress.Complement`|Texto|50|Não|Complemento do endereço do Comprador.|
|`Customer.DeliveryAddress.ZipCode`|Texto|9|Não|CEP do endereço do Comprador.|
|`Customer.DeliveryAddress.City`|Texto|50|Não|Cidade do endereço do Comprador.|
|`Customer.DeliveryAddress.State`|Texto|2|Não|Estado do endereço do Comprador.|
|`Customer.DeliveryAddress.Country`|Texto|35|Não|País do endereço do Comprador.|
|`Payment.Type`|Texto|100|Sim|Tipo do Meio de Pagamento.|
|`Payment.Amount`|Número|15|Sim|Valor do Pedido (ser enviado em centavos).|
|`Payment.Currency`|Texto|3|Não|Moeda na qual o pagamento será feito (BRL).|
|`Payment.Country`|Texto|3|Não|Pais na qual o pagamento será feito.|
|`Payment.Provider`|Texto|15|---|Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.|
|`Payment.ServiceTaxAmount`|Número|15|Não|Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.|
|`Payment.SoftDescriptor`|Texto|13|Não|O complemento do nome da loja que aparecerá na fatura do cartão. Não permite caracteres especiais.|
|`Payment.Installments`|Número|2|Sim|Número de Parcelas.|
|`Payment.Interest`|Texto|10|Não|Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).|
|`Payment.Capture`|Booleano|---|Não (Default false)|Booleano que identifica que a autorização deve ser com captura automática.|
|`Payment.Authenticate`|Booleano|---|Não (Default false)|Define se o comprador será direcionado ao Banco emissor para autenticação do cartão|
|`Payment.Recurrent`|Booleano|-|Não|Indica se a transação é do tipo recorrente (“true”) ou não (“false”). O valor “true” não originará uma nova recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. Authenticate deve ser “false” quando Recurrent é “true”.|
|`Payment.IsCryptocurrencyNegotiation`|Booleano|-|Não (default false)|Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda|
|`Payment.AirlineData.TicketNumber`|alfanumérico|13|Não|Informar o número do principal bilhete aéreo da transação.|
|`CreditCard.CardNumber`|Texto|19|Sim|Número do Cartão do Comprador.|
|`CreditCard.Holder`|Texto|25|Não|Nome do Comprador impresso no cartão. Não aceita caracteres especiais ou acentuação.|
|`CreditCard.ExpirationDate`|Texto|7|Sim|Data de validade impressa no cartão. Ex. MM/AAAA.|
|`CreditCard.SecurityCode`|Texto|4|Não|Código de segurança impresso no verso do cartão.|
|`CreditCard.SaveCard`|Booleano|---|Não (Default false)|Booleano que identifica se o cartão será salvo para gerar o CardToken.|
|`CreditCard.Brand`|Texto|10|Sim|Bandeira do cartão. Valores possíveis: Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.       |
|`CreditCard.CardOnFile.Usage`|Texto|-|Não|**First** se o cartão foi armazenado e é seu primeiro uso.<br>**Used** se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação|
|`CreditCard.CardOnFile.Reason`|Texto|-|Condicional|Indica o propósito de armazenamento de cartões, caso o campo "Usage" for "Used".<BR>**Recurring** - Compra recorrente programada (ex. assinaturas)<br>**Unscheduled** - Compra recorrente sem agendamento (ex. aplicativos de serviços)<br>**Installments** - Parcelamento através da recorrência.|

##### Resposta

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito completo",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
        },
        "IsCryptoCurrencyNegotiation": true,
        "TryAutomaticCancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "AirlineData":{
            "TicketNumber": "AR988983"
        },
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito completo",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "Billing": {
            "Street": "Rua Neturno",
            "Number": "12345",
            "Complement": "Sala 123",
            "Neighborhood": "Centro",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BR",
            "ZipCode": "20080123"
  },
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
        },
        "IsCryptoCurrencyNegotiation": true,
        "TryAutomaticCancellation":true,
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Tid`|Id da transação na adquirente.|Texto|20|Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
|`SoftDescriptor`|Texto impresso na fatura bancaria do portador. Não permite caracteres especiais.|Texto|13|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Representa o quão segura é uma transação.|Texto|2|Exemplos: 7|
|`Status`|Status da Transação.|Byte|---|2|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Texto alfanumérico|
|`TryAutomaticCancellation`|Caso ocorra algum erro durante a autorização (status Não Finalizada - "0"), a resposta incluirá o campo “TryAutomaticCancellation” como true. Neste caso, a transação será consultada automaticamente, e caso tenha sido autorizada será cancelada automaticamente. Esta funcionalidade deverá estar habilitada para loja. Para habilitar, entre em contato com o nosso suporte técnico. |Booleano|-|true ou false|
|`Payment.PaymentAccountReference`|O PAR (Payment Account Reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado.|Numérico|29|---|

#### Cartão de débito com autenticação

A transação de débito com autenticação é o padrão para esse meio de pagamento. Siga os passos de integração do [manual do 3DS](https://developercielo.github.io/manual/3ds){:target="_blank"} e envie a requisição conforme apresentada em [Criando uma Transação de Débito](https://developercielo.github.io/manual/cielo-ecommerce#criando-uma-transa%C3%A7%C3%A3o-de-d%C3%A9bito).

#### MPI Externo

O Merchant plug-in, conhecido por MPI, é um serviço que permite a realização da chamada de autenticação, integrado e certificado com bandeiras para processamento de autenticação de 3DS. A Cielo permite ao lojista a integração do 3DS através do MPI Interno ou do MPI Externo.

* **MPI Interno**: serviço já integrado a solução de 3DS Cielo, sem necessidade de integração e/ou contratação adicional. Em caso de utilização de MPI Interno para o 3DS 1.0 siga para a etapa "[Transação Padrão](https://developercielo.github.io/manual/cielo-ecommerce#transa%C3%A7%C3%A3o-padr%C3%A3o)"

* **MPI Externo**: usado quando o seu e-commerce contrata uma solução de MPI, sem participação da Cielo. Independente da versão do 3DS contratada, siga as orientações do manual [3. Autorização com Autenticação](https://developercielo.github.io/manual/autorizacao-com-autenticacao){:target="_blank"} para a integração.

## Cartões Alelo

Para criar uma venda que utilizará cartão de Alelo, é use a mesma requisição de uma venda de **cartão de débito**.

**OBS:** Em transações de Cartão ALELO, os seguintes parâmetros devem possuir configurações estáticas: 

* `Payment.Authenticate` precisa estar como **`false`"** ou não ser enviado;
* `DebitCard.Brand` precisa ser enviada como **"Elo"**.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014121201",
   "Customer":{  
      "Name":"Comprador Cartão de Alelo"
   },
   "Payment":{  
     "Type":"DebitCard",
     "Authenticate":false,
     "Amount":50,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"5080540487508044",
         "Holder":"Comprador Cartão de Alelo",
         "ExpirationDate":"07/2029",
         "SecurityCode":"841",
         "brand": "Elo"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014121201",
   "Customer":{  
      "Name":"Comprador Cartão de Alelo"
   },
   "Payment":{  
     "Type":"DebitCard",
     "Authenticate":false,
     "Amount":50,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"5080540487508044",
         "Holder":"Comprador Cartão de Alelo",
         "ExpirationDate":"07/2029",
         "SecurityCode":"841",
         "brand": "Elo"
     }
   }
}
 
--verbose
```

|Propriedade               |Descrição                                                                                             |Tipo     |Tamanho|Obrigatório        |
|--------------------------|------------------------------------------------------------------------------------------------------|---------|-------|-------------------|
|`MerchantId`              | Identificador da loja na API Cielo eCommerce.                                                        | Guid    | 36    | Sim               |
|`MerchantKey`             | Chave Pública para Autenticação Dupla na API Cielo eCommerce.                                        | Texto   | 40    | Sim               |
|`RequestId`               | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT| Guid    | 36    | Não               |
|`MerchantOrderId`         | Número de identificação do Pedido.                                                                   | Texto   | 50    | Sim               |
|`Customer.Name`           | Nome do Comprador.                                                                                   | Texto   | 255   | Não               |
|`Payment.Authenticate`    | Define se o comprador será direcionado ao Banco emissor para autenticação do cartão. **Valor possível: "false"** ou não enviar.                  | Booleano| ---   | Não (default ="false")|
|`Payment.Type`            | Tipo do Meio de Pagamento                                                                            | Texto   | 100   | Sim               |
|`Payment.Amount`          | Valor do Pedido (ser enviado em centavos).                                                           | Número  | 15    | Sim               |
|`Payment.ReturnUrl`       | URL de retorno do lojista.                                                                           | Texto   | 1024  | Sim               |
|`Payment.ReturnUrl`       | URL para onde o usuário será redirecionado após o fim do pagamento                                   | Texto   | 1024  | Sim               |
|`DebitCard.CardNumber`    | Número do cartão do comprador.                                                                       | Texto   | 19    | Sim               |
|`DebitCard.Holder`        | Nome do comprador impresso no cartão.                                                                | Texto   | 25    | Sim               |
|`DebitCard.ExpirationDate`| Data de validade impressa no cartão. Ex. MM/AAAA.                                                    | Texto   | 7    | Sim               |
|`DebitCard.SecurityCode`  | Código de segurança impresso no verso do cartão.                                                     | Texto   | 4     | Sim               |
|`DebitCard.Brand`  | Bandeira do cartão. Precisa ser enviada como "ELO".                                                         | Texto   | 10     | Sim               |

### Resposta

```json
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de Alelo"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "508054******8044",
            "Holder": "Comprador Cartão de Alelo",
            "ExpirationDate": "07/2029",
            "SaveCard": false,
            "Brand": "Elo"
        },
        "Provider": "Cielo",
        "AuthorizationCode": "803247",
        "Eci": "7",
        "Tid": "107703563079N41O9DJB",
        "ProofOfSale": "770857",
        "Authenticate": false,
        "Recurrent": false,
        "Amount": 50,
        "ReceivedDate": "2018-01-30 15:00:24",
        "CapturedAmount": 50,
        "CapturedDate": "2018-01-30 15:00:25",
        "ReturnUrl": "http://www.cielo.com.br",
        "Status": 2,
        "IsSplitted": false,
        "ReturnMessage": "Transacao capturada com sucesso",
        "ReturnCode": "00",
        "PaymentId": "f8504766-4ae4-4a1f-811f-035964b6c4ee",
        "Type": "DebitCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/f8504766-4ae4-4a1f-811f-035964b6c4ee"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de Alelo"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "508054******8044",
            "Holder": "Comprador Cartão de Alelo",
            "ExpirationDate": "07/2029",
            "SaveCard": false,
            "Brand": "Elo"
        },
        "Provider": "Cielo",
        "AuthorizationCode": "803247",
        "Eci": "7",
        "Tid": "107703563079N41O9DJB",
        "ProofOfSale": "770857",
        "Authenticate": false,
        "Recurrent": false,
        "Amount": 50,
        "ReceivedDate": "2018-01-30 15:00:24",
        "CapturedAmount": 50,
        "CapturedDate": "2018-01-30 15:00:25",
        "ReturnUrl": "http://www.cielo.com.br",
        "Status": 2,
        "IsSplitted": false,
        "ReturnMessage": "Transacao capturada com sucesso",
        "ReturnCode": "00",
        "PaymentId": "f8504766-4ae4-4a1f-811f-035964b6c4ee",
        "Type": "DebitCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/f8504766-4ae4-4a1f-811f-035964b6c4ee"
            }
        ]
    }
}
```

| Propriedade         | Descrição                                                                                   | Tipo  | Tamanho | Formato                              |
|---------------------|---------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `Tid`               | ID da transação na adquirente.                                                              | Texto | 20      | Texto alfanumérico                   |
| `PaymentId`         | Campo Identificador do Pedido.                                                              | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`         | URL de retorno do lojista. URL para onde o lojista vai ser redirecionado no final do fluxo. | Texto | 1024    | http://www.urllogista.com.br         |
| `Status`            | Status da Transação                                                                         | Byte  | ---     | 0                                    |
| `ReturnCode`        | Código de retorno da Adquirência.                                                           | Texto | 32      | Texto alfanumérico                   | 

## Boleto

Para transacionar por boleto, você precisa primeiro contratar esse serviço com o banco. Em seguida, configure o meio de pagamento boleto de acordo com as orientações do manual [Boletos](https://developercielo.github.io/tutorial/manual-boleto){:target="_blank"}.

> **Observação:** Os boletos do Banco do Brasil não possuem o serviço de conciliação automática.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
    "MerchantOrderId":"2014111706",
    "Customer":
    {  
        "Name":"Comprador Teste Boleto",
        "Identity": "1234567890",
        "Address":
        {
          "Street": "Avenida Marechal Câmara",
          "Number": "160",    
          "Complement": "Sala 934",
          "ZipCode" : "22750012",
          "District": "Centro",
          "City": "Rio de Janeiro",
          "State" : "RJ",
          "Country": "BRA"
        },
        "Billing": {
           "Street": "Avenida Marechal Câmara",
           "Number": "160",
           "Complement": "Sala 934",
           "Neighborhood": "Centro",
           "City": "Rio de Janeiro",
           "State": "RJ",
           "Country": "BR",
           "ZipCode": "22750012"
  },
    },
    "Payment":
    {  
        "Type":"Boleto",
        "Amount":15700,
        "Provider":"Bradesco2",
        "Address": "Rua Teste",
        "BoletoNumber": "123",
        "Assignor": "Empresa Teste",
        "Demonstrative": "Desmonstrative Teste",
        "ExpirationDate": "2020-12-31",
        "Identification": "11884926754",
        "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia."
    }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
    "MerchantOrderId":"2014111706",
    "Customer":
    {  
        "Name":"Comprador Teste Boleto",
        "Identity": "1234567890",
        "Address":
        {
          "Street": "Avenida Marechal Câmara",
          "Number": "160",    
          "Complement": "Sala 934",
          "ZipCode" : "22750012",
          "District": "Centro",
          "City": "Rio de Janeiro",
          "State" : "RJ",
          "Country": "BRA"
        },
        "Billing": {
           "Street": "Avenida Marechal Câmara",
           "Number": "160",
           "Complement": "Sala 934",
           "Neighborhood": "Centro",
           "City": "Rio de Janeiro",
           "State": "RJ",
           "Country": "BR",
           "ZipCode": "22750012"
  },
    },
    "Payment":
    {  
        "Type":"Boleto",
        "Amount":15700,
        "Provider":"Bradesco2",
        "Address": "Rua Teste",
        "BoletoNumber": "123",
        "Assignor": "Empresa Teste",
        "Demonstrative": "Desmonstrative Teste",
        "ExpirationDate": "2020-12-31",
        "Identification": "11884926754",
        "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia."
    }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Numero de identificação do Pedido.|Texto|Bradesco: 27<BR>Banco do Brasil: 50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|Bradesco: 34<BR>Banco do Brasil: 60|Não|
|`Customer.Status`|Status de cadastro do comprador na loja(NEW / EXISTING) - Utilizado pela análise de fraude|Texto|255|Não|
|`Customer.Address.ZipCode`|CEP do endereço do Comprador.|Texto|9|Sim|
|`Customer.Address.Country`|Pais do endereço do Comprador.|Texto|35|Sim|
|`Customer.Address.State`|Estado do endereço do Comprador.|Texto|2|Sim|
|`Customer.Address.City`|Cidade do endereço do Comprador.|Texto|Bradesco: 50<BR>Banco do Brasil: 18|Sim|
|`Customer.Address.District`|Bairro do Comprador.|Texto|50|Sim|
|`Customer.Address.Street`|Endereço do Comprador.|Texto|255|Sim|
|`Customer.Address.Number`|Número do endereço do Comprador.|Texto|15|Sim|
|`Customer.Billing.Street`|Logradouro do endereço de cobrança|string|24|não|
|`Customer.Billing.Number`|Número do endereço de cobrança|string|5|não|
|`Customer.Billing.Complement`|Complemento do endereço de cobrança|string|14|não|
|`Customer.Billing.Neighborhood`|Bairro do endereço de cobrança|string|15|não|
|`Customer.Billing.City`|Cidade do endereço de cobranças|tring|20|não |
|`Customer.Billing.State`|Estado do endereço de cobrança|string|2|não|
|`Customer.Billing.Country`|País do endereço de cobrança. Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui){:target="_blank"}|string|2|não|
|`Customer.Billing.ZipCode`|Código postal do endereço de cobrança|string|9|não|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Provider`|Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO. Valores possíveis: "Bradesco2" ou "BancoDoBrasil2"|Texto|15|Sim|
|`Payment.Address`|Endereço do Cedente.|Texto|255|Não|
|`Payment.BoletoNumber`|Número do Boleto enviado pelo lojista. Usado para contar boletos emitidos ("NossoNumero").|Texto|Bradesco: 11<BR>Banco do Brasil: 9|Não|
|`Payment.Assignor`|Nome do Cedente.|Texto|200|Não|
|`Payment.Demonstrative`|Texto de Demonstrativo.|Texto|255|Não|
|`Payment.ExpirationDate`|Data de expiração do Boleto. Ex. 2020-12-31 |Date|10|Não|
|`Payment.Identification`|Documento de identificação do Cedente.|Texto|14|Não|
|`Payment.Instructions`|Instruções do Boleto.|Texto|255|Não|

### Resposta

Na resposta da transação de boleto, a API Cielo E-commerce vai enviar a URL do boleto e o código de barras, que o e-commerce deverá exibir para o comprador.

```json
{
    "MerchantOrderId": "2014111706",
    "Customer":
    {
        "Name": "Comprador Boleto Completo",
        "Address":
        {
        "Street": "Av Marechal Camara",
        "Number": "160",
        "ZipCode": "22750012",
        "City": "Rio de Janeiro",
        "State": "RJ",
        "Country": "BRA",
        "District": "Centro"
        },
      "Billing": {
         "Street": "Avenida Marechal Câmara",
         "Number": "160",
         "Complement": "Sala 934",
         "Neighborhood": "Centro",
         "City": "Rio de Janeiro",
         "State": "RJ",
         "Country": "BR",
         "ZipCode": "22750012"
  },
    },
    "Payment":
    {
        "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia.",
        "ExpirationDate": "2015-01-05",
        "Url": "https://apisandbox.cieloecommerce.cielo.com.br/post/pagador/reenvia.asp/a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
        "Number": "123-2",
        "BarCodeNumber": "00096629900000157000494250000000012300656560",
        "DigitableLine": "00090.49420 50000.000013 23006.565602 6 62990000015700",
        "Assignor": "Empresa Teste",
        "Address": "Rua Teste",
        "Identification": "11884926754",
        "PaymentId": "a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
        "Type": "Boleto",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco2",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111706",
    "Customer":
    {
        "Name": "Comprador Boleto Completo",
        "Address":
        {
        "Street": "Av Marechal Camara",
        "Number": "160",
        "ZipCode": "22750012",
        "City": "Rio de Janeiro",
        "State": "RJ",
        "Country": "BRA",
        "District": "Centro"
        },
      "Billing": {
         "Street": "Avenida Marechal Câmara",
         "Number": "160",
         "Complement": "Sala 934",
         "Neighborhood": "Centro",
         "City": "Rio de Janeiro",
         "State": "RJ",
         "Country": "BR",
         "ZipCode": "22750012"
    },
    "Payment":
    {
        "Instructions": "Aceitar somente até a data de vencimento, após essa data juros de 1% dia.",
        "ExpirationDate": "2015-01-05",
        "Url": "https://apisandbox.cieloecommerce.cielo.com.br/post/pagador/reenvia.asp/a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
        "Number": "123-2",
        "BarCodeNumber": "00096629900000157000494250000000012300656560",
        "DigitableLine": "00090.49420 50000.000013 23006.565602 6 62990000015700",
        "Assignor": "Empresa Teste",
        "Address": "Rua Teste",
        "Identification": "11884926754",
        "PaymentId": "a5f3181d-c2e2-4df9-a5b4-d8f6edf6bd51",
        "Type": "Boleto",
        "Amount": 15700,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Bradesco2",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Instructions`|Instruções do Boleto.|Texto|255|Ex: Aceitar somente até a data de vencimento, após essa data juros de 1% dia.|
|`ExpirationDate`|Data de expiração.|Texto|10|2014-12-25|
|`Url`|Url do Boleto gerado.|string|256|Ex:https://.../pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d|
|`Number`|"NossoNumero" gerado.|Texto|50|Ex: 1000000012-8|
|`BarCodeNumber`|Representação numérica do código de barras.|Texto|44|Ex: 00091628800000157000494250100000001200656560|
|`DigitableLine`|Linha digitável.|Texto|256|Ex: 00090.49420 50100.000004 12006.565605 1 62880000015700|
|`Assignor`|Nome do Cedente.|Texto|256|Ex: Loja Teste|
|`Address`|Endereço do Cedente.|Texto|256|Ex: Av. Teste, 160|
|`Identification`|Documento de identificação do Cedente.|Texto|14|CPF ou CNPJ do Cedente sem os caracteres especiais (., /, -)|
|`Status`|Status da Transação.|Byte|---|1|

### Regras Adicionais

Quantidade de caracteres por campo e Provider:

**Bradesco**

|Propriedade|Observações|Tamanho|
|---|---|---|
|`Provider`|N/a|Bradesco2|
|`MerchantOrderId`|Apenas Letras, números e caracteres como "_" e "$".|27|
|`Payment.BoletoNumber`|O dado é validado pelo banco.|11|
|`Customer.Name`|A API Cielo trunca automaticamente.|34|
|`Customer.Address.Street`|O dado é validado pela API Cielo.|70|
|`Customer.Address.Number`|O dado é validado pela API Cielo.|10|
|`Customer.Address.Complement`|O dado é validado pela API Cielo.|20|
|`Customer.Address.District`|O dado é validado pela API Cielo.|50|
|`Customer.Address.City`|N/a|50 - O dado é validado pela API Cielo.|
|`Payment.Instructions`|N/a|255|
|`Payment.Demonstrative`|N/a|255|

**Banco do Brasil**

|Propriedade|Observações|Tamanho|
|---|---|---|
|`Provider`|N/a|BancoDoBrasil2|
|`MerchantOrderId`|Não é enviado ao banco.|50|
|`Payment.BoletoNumber`|Quando enviado acima de 9 posições, a API Cielo trunca automaticamente, considerando os últimos 9 dígitos.|9|
|`Customer.Name`|**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras.|60|
|`Customer.Address.Street`|**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras| Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres.|
|`Customer.Address.Number`|**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras| Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres.|
|`Customer.Address.Complement`|**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras| Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres.|
|`Customer.Address.District`|**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras| Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres.|
|`Customer.Address.City`|<br>**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras.|18 caracteres|
|`Payment.Instructions`|N/a|255|

## E-wallets

**O que são e-wallets?**

As *e-wallets*, ou carteiras digitais, são repositórios de cartões e dados de pagamentos para consumidores online. As e-wallets permitem que um consumidor realize o cadastro de seus dados de pagamento na carteira, tornando o processo de compra mais conveniente e seguro.

> Para utilizar e-wallets na API Cielo E-commerce, o lojista deverá ter as **e-wallets integradas em seu checkout**.

Entre em contato com o provedor de sua preferência para maiores informações sobre como contratar o serviço.

### E-wallets disponíveis

A API Cielo E-commerce possui suporte para as seguintes carteiras digitais:

* [*Apple Pay*](https://www.apple.com/br/apple-pay/){:target="_blank"}
* [*VisaCheckout*](https://vaidevisa.visa.com.br/site/visa-checkout){:target="_blank"} 
* [*MasterPass*](https://masterpass.com/pt-br/){:target="_blank"} 
* [*Samsung Pay*](https://www.samsung.com.br/samsungpay/){:target="_blank"} 
* [*Google Pay*](https://pay.google.com/intl/pt-BR_br/about/){:target="_blank"}

<aside class="notice"><strong>Atenção:</strong> Quando o nó “Wallet” for enviado na requisição, o nó “CreditCard” passa a ser opcional.</aside>

<aside class="notice"><strong>Atenção:</strong> Para o cartão de débito, quando for enviado na requisição o nó “Wallet”, será necessário o nó “DebitCard” contendo a “ReturnUrl”.</aside>

<aside class="notice"><strong>Atenção:</strong>  Devido a necessidade de utilização de chaves efêmeras para realizar operações de crédito, a Recorrência não está disponível para transações de e-wallets. </aside>

### Integração da E-Wallet

Consulte nosso [manual E-Wallets](https://developercielo.github.io/manual/e-wallets-ecommercecielo){:target="_blank"} e saiba mais detalhes sobre a integração desse meio de pagamento em seu checkout.

Com a e-wallet já totalmente integrada, o seu fluxo transacional de pagamento será o seguinte:

![Fluxo E-wallets]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/e-wallets-cielo-100.png)

## QR Code

### Cartão de crédito via QR Code - Sandbox

Para testar o cenário de autorização com sucesso via QRCode, utilize o cartão **4551.8700.0000.0183**

As informações de **Cód.Segurança (CVV)** e validade podem ser aleatórias, mantendo o formato:

* CVV com 3 dígitos;
* Validade no formato *MM/YYYY*.

### Gerando um QR Code via API

Para criar uma transação que utilizará cartão de crédito, é necessário enviar uma requisição utilizando o método `POST` para o recurso Payment, conforme o exemplo. Esse exemplo contempla o mínimo de campos necessários a serem enviados para a autorização.

<aside class="notice"><strong>Atenção:</strong> Não é possivel realizar uma transação com valor (`Amount`) 0.</aside>

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2019010101",
   "Customer":{  
      "Name":"QRCode Test"
   },
   "Payment":{
     "Type":"qrcode",
     "Amount":100,
     "Installments":1,
     "Capture":false
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2019010101",
   "Customer":{  
      "Name":"QRCode Test"
   },
   "Payment":{
     "Type":"qrcode",
     "Amount":100,
     "Installments":1,
     "Capture":false
   }
}
--verbose
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`MerchantId`|Guid|36|Sim|Identificador da loja na Cielo.|
|`MerchantKey`|Texto|40|Sim|Chave Publica para Autenticação Dupla na Cielo.|
|`Content-Type`|Header|40|Sim|application/json (obrigatório o envio deste).|
|`RequestId`|Guid|36|Não|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.|
|`MerchantOrderId`|Texto|50|Sim|Numero de identificação do Pedido.|
|`Customer.Name`|Texto|255|Não|Nome do Comprador.|
|`Payment.Type`|Texto|100|Sim|Tipo do Meio de Pagamento. Enviar **qrcode** para uma transação de QRCode.|
|`Payment.Amount`|Número|15|Sim|Valor do Pedido (ser enviado em centavos).|
|`Payment.Installments`|Número|2|Sim|Número de Parcelas.|
|`Payment.Capture`|Booleano|-|Não|Enviar **true** para uma trasação de captura automática.|

#### Resposta

```json
{
    "MerchantOrderId": "2019010101",
    "Customer": {
        "Name": "QRCode Test"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "Provider": "Cielo",
        "Amount": 100,
        "ReceivedDate": "2019-01-02 10:14:29",
        "Status": 12,
        "IsSplitted": false,
        "QrCode": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAQ1klEQVR42u3de6hlVR(...)",
        "ReturnMessage": "QRCode gerado com sucesso",
        "PaymentId": "5d7e8fd3-70b6-4a88-9660-e064d72fdcdd",
        "Type": "qrcode",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/5d7e8fd3-70b6-4a88-9660-e064d72fdcdd"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2019010101",
    "Customer": {
        "Name": "QRCode Test"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "Provider": "Cielo",
        "Amount": 100,
        "ReceivedDate": "2019-01-02 10:14:29",
        "Status": 12,
        "IsSplitted": false,
        "QrCodeBase64Image": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAQ1klEQVR42u3de6hlVR(...)",
        "ReturnMessage": "QRCode gerado com sucesso",
        "PaymentId": "5d7e8fd3-70b6-4a88-9660-e064d72fdcdd",
        "Type": "qrcode",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/5d7e8fd3-70b6-4a88-9660-e064d72fdcdd"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`QrCodeBase64Image`|QRCode codificado na base 64. Por exemplo, a imagem poderá ser apresentada na página utilizando o código HTML como este:<br><pre lang="html">&lt;img src=&quot;data:image/png;base64, código_da_imagem_na_base_64&quot;&gt;</pre>|Texto|variável|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Status da Transação. No caso de uma transação de geração de QRCode de pagamento, o status inicial é 12 (Pending).|Byte|---|2|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Texto alfanumérico|

## Carnê

O **carnê** é uma **transação de débito** utilizada para efetuar o pagamento de uma conta.

> O carnê é um meio de pagamento válido para as bandeiras MasterCard, Visa e Elo.

Essa modalidade pode ser utilizada por lojistas que **emitem carnês próprios e faturas de cartões Private Label**. O produto carnê permite a **separação das vendas** relacionadas à **compra de produtos e pagamento de serviços**, facilitando reporte de valores junto ao Fisco.

Como qualquer transação de débito no e-commerce, as transações de carnê precisam ser autenticadas via protocolo 3DS 2.0. Obtenha mais informações sobre o protocolo de autenticação no [**manual do 3DS 2.0**](https://developercielo.github.io/manual/3ds#autentica%C3%A7%C3%A3o-3ds-2.0){:target="_blank"}.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
   "MerchantOrderId":"2014111704",
   "Customer":{
      "Name":"Comprador Carnet simples"
   },
   "Payment":{
      "Provider":"CieloSandbox",
      "Authenticate":true,
      "Installments":1,
      "Amount":100,
      "Type":"DebitCard",
      "SoftDescriptor":"123456789ABCD",
      "DebitCard":{
         "ExpirationDate":"05/2024",
         "CardNumber":"1234567891234567",
         "Holder":"Test Holder",
         "Brand":"Visa",
         "SecurityCode":"123",
         "CardOnFile":{
            "Reason":"Unscheduled",
            "Usage":"first"
         }
      },
      "ExternalAuthentication":{
         "Eci":"05",
         "Cavv":"AAABAWFlmQAAAABjRWWZEEFgFz+=",
         "Xid":"blNhMmtMUWg4RDFoV2JaM1RRbjA="
      },
      "iscarnetransaction":true
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Payment.IsCarneTransaction`|Booleano|---|Não (default false)|Deve ser enviado com valor “true” caso se trate de uma transação de pagamento de serviço do tipo Carnê|

## Implementações específicas

### Quasi cash

Transações Quasi Cash são aquelas transações referentes a compras de fichas para jogos online, compras de bilhete de lotéricas ou relacionados. Apenas alguns MCCs (Códigos de categoria de atuação) que podem processar transações desse modelo. Consulte o time Cielo para entender se o seu negócio entra nesse modelo. 
 
Todos os clientes de E-commerce que transacionarem quasi cash, devem usar a requisição de uma transação de débito e/ou crédito (dependendo do tipo de pagamento escolhido) e encaminhar adicionalmente a tag QuasiCash conforme exemplo a seguir:

```json
"Payment":{
   "Currency":"BRL",
   "Country":"BRA",
   "ServiceTaxAmount":0,
   "Installments":1,
   "Interest":"ByMerchant",
   "Capture":true,
   "Authenticate":false,
   "SoftDescriptor":"123456789ABCD",
   "QuasiCash":true,
   "Type":"CreditCard",
   "Amount":15700,
   "CreditCard":{
      "CardNumber":"1234123412341231",
      "Holder":"Teste Holder",
      "ExpirationDate":"12/2030",
      "SecurityCode":"123",
      "SaveCard":"false",
      "Brand":"Visa",
      "CardOnFile":{
         "Usage":"Used",
         "Reason":"Unscheduled"
   }    
```

|Parâmetro  | Descrição|Valor|Formato|Tamanho|Obrigatório|
|-----------|----------|-----|-------|-------|-----------|
|`QuasiCash`| Identifica uma transação de quase cash.|"true" ou "false"|Booleano|-|Não|

### Facilitadores de Pagamento

Todos os clientes de E-Commerce que são **Facilitadores de Pagamento**, por **obrigatoriedade das bandeiras e do Banco Central** devem enviar campos específicos na **mensageria transacional**.  A Cielo transmitirá as informações para as bandeiras por meio da mensageria transacional no momento da autorização.

Os campos específicos estão contidos dentro do nó `PaymentFacilitator`. Além dos campos deste nó, os facilitadores também precisam enviar obrigatoriamente o campo `SoftDescriptor` do nó `Payment`. Veja a seguir o exemplo do envio e da resposta.

> **Atenção:** As bandeiras, ao identificarem inconformidade devido ao não envio dos dados obrigatórios na mensageria transacional, aplicarão multas à Cielo as quais serão repassadas ao Facilitador responsável pelo envio dos dados transacionais.

#### Requisição

```json
{
   "MerchantOrderId":"2222222222",
   "Customer":{
      "Name":"Comprador Teste",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
      "DeliveryAddress":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      }
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":157000,
      "Currency":"BRL",
      "Country":"BRA",
      "Provider":"Cielo",
      "ServiceTaxAmount":0,
      "Installments":1,
      "Interest":"ByMerchant",
      "Capture":false,
      "Authenticate":false,
      "Recurrent":false,
      "SoftDescriptor":"123456789ABCD",
      "CreditCard":{
         "CardNumber":"4024007197692931",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "SaveCard":"false",
         "Brand":"Visa"
      },
      "PaymentFacilitator":{
         "EstablishmentCode":"1234",
         "SubEstablishment":{
            "EstablishmentCode":"1234",
            "Identity":"11111111000100",
            "Mcc":"1234",
            "Address":"Alameda Grajau, 512",
            "City":"Barueri",
            "State":"SP",
            "CountryCode":"076",
            "PostalCode":"06455914",
            "PhoneNumber":"1155855585"
         }
      }
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|PaymentFacilitator.EstablishmentCode|Numérico|11|Obrigatório para facilitadores|Código do estabelecimento do Facilitador. "Facilitator ID” (Cadastro do facilitador com as bandeiras)<br>O código é diferente por bandeira, podendo variar inclusive o tamanho do campo:<br>Bandeira Mastercard –06 dígitos<br>Bandeira Visa –08 dígitos<br>Bandeira ELO –de 04 à 05 dígitos<br>Bandeira Hipercard –06 dígitos<br>Para demais bandeiras, como Amex e JCB, o campo pode ser preenchido com “0” zeros.|
|PaymentFacilitator.SubEstablishment.EstablishmentCode|Numérico|15|Obrigatório para facilitadores|Código do estabelecimento do sub Merchant. “Sub-Merchant ID” (Cadastro do subcredenciado com o facilitador)|
|PaymentFacilitator.SubEstablishment.Identity|Numérico|14|Obrigatório para facilitadores|CNPJ ou CPF do sub-merchant.|
|PaymentFacilitator.SubEstablishment.Mcc|Numérico|4|Obrigatório para facilitadores|MCC do sub Merchant.|
|PaymentFacilitator.SubEstablishment.Address|Alfanumérico|22|Obrigatório para facilitadores|Endereço do sub Merchant.|
|PaymentFacilitator.SubEstablishment.City|Alfanumérico|13|Obrigatório para facilitadores|Cidade do sub Merchant.|
|PaymentFacilitator.SubEstablishment.State|Alfanumérico|2|Obrigatório para facilitadores|Estado do sub Merchant.|
|PaymentFacilitator.SubEstablishment.PostalCode|Numérico|9|Obrigatório para facilitadores|Código postal do sub Merchant.|
|PaymentFacilitator.SubEstablishment.CountryCode|Numérico|3|Obrigatório para facilitadores|Código país do sub-merchant com base no ISO 3166<br>Ex: código ISO 3166 do Brasil é o 076. [Lista completa online](https://www.iso.org/obp/ui/#search/code/).|
|PaymentFacilitator.SubEstablishment.PhoneNumber|Numérico|13|Obrigatório para facilitadores|Número de telefone do sub Merchant.|
|Payment.Softdescriptor|Texto|13|Obrigatório para facilitadores|Texto impresso na fatura bancaria comprador. Deve ser preenchido de acordo com os dados do sub Merchant.|

<aside class="warning"><b>Atenção: Os campos não devem ser enviados com espaçamento a esquerda. Sujeito a rejeição na liquidação das transações.</b></aside>

#### Resposta

```json
{
   "MerchantOrderId":"2014111701",
   "Customer":{
      "Name":"Comprador Teste",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
      "DeliveryAddress":{
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      }
   },
   "Payment":{
      "ServiceTaxAmount":0,
      "Installments":1,
      "Interest":0,
      "Capture":false,
      "Authenticate":false,
      "Recurrent":false,
      "CreditCard":{
         "CardNumber":"402400******2931",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2021",
         "SaveCard":false,
         "Brand":"Visa"
      },
      "Tid":"1223092935684",
      "ProofOfSale":"2935684",
      "AuthorizationCode":"065158",
      "SoftDescriptor":"123456789ABCD",
      "Provider":"Simulado",
      "IsQrCode":false,
      "PaymentFacilitator":{
         "EstablishmentCode":"1234",
         "SubEstablishment":{
            "EstablishmentCode":"1234",
            "Identity":"11111111000100",
            "Mcc":"1234",
            "Address":"Alameda Grajau, 512",
            "City":"Barueri",
            "State":"SP",
            "CountryCode":"076",
            "PostalCode":"06455914",
            "PhoneNumber":"1155855585"
         }
      },
      "Amount":157000,
      "ReceivedDate":"2019-12-23 09:29:34",
      "Status":1,
      "IsSplitted":false,
      "ReturnMessage":"Operation Successful",
      "ReturnCode":"4",
      "PaymentId":"365c3a0d-fd86-480b-9279-4ba3da21333c",
      "Type":"CreditCard",
      "Currency":"BRL",
      "Country":"BRA",
      "Links":[
         {
            "Method":"GET",
            "Rel":"self",
            "Href":"https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c"
         },
         {
            "Method":"PUT",
            "Rel":"capture",
            "Href":"https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/capture"
         },
         {
            "Method":"PUT",
            "Rel":"void",
            "Href":"https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/void"
         }
      ]
   }
}
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|PaymentFacilitator.EstablishmentCode|Numérico|11|Obrigatório para facilitadores|Código do estabelecimento do Facilitador. "Facilitator ID” (Cadastro do facilitador com as bandeiras)<br>O código é diferente por bandeira, podendo variar inclusive o tamanho do campo:<br>Bandeira Mastercard –06 dígitos<br>Bandeira Visa –08 dígitos<br>Bandeira ELO –de 04 à 05 dígitos<br>Bandeira Hipercard –06 dígitos<br>Para demais bandeiras, como Amex e JCB, o campo pode ser preenchido com “0” zeros.|
|PaymentFacilitator.SubEstablishment.EstablishmentCode|Numérico|15|Obrigatório para facilitadores|Código do estabelecimento do sub Merchant. “Sub-Merchant ID” (Cadastro do subcredenciado com o facilitador)|
|PaymentFacilitator.SubEstablishment.Identity|Numérico|14|Obrigatório para facilitadores|CNPJ ou CPF do sub-merchant.|
|PaymentFacilitator.SubEstablishment.Mcc|Numérico|4|Obrigatório para facilitadores|MCC do sub Merchant.|
|PaymentFacilitator.SubEstablishment.Address|Alfanumérico|22|Obrigatório para facilitadores|Endereço do sub Merchant.|
|PaymentFacilitator.SubEstablishment.City|Alfanumérico|13|Obrigatório para facilitadores|Cidade do sub Merchant.|
|PaymentFacilitator.SubEstablishment.State|Alfanumérico|2|Obrigatório para facilitadores|Estado do sub Merchant.|
|PaymentFacilitator.SubEstablishment.PostalCode|Numérico|9|Obrigatório para facilitadores|Código postal do sub Merchant.|
|PaymentFacilitator.SubEstablishment.CountryCode|Numérico|3|Obrigatório para facilitadores|Código país do sub-merchant com base no ISO 3166.<br>Ex: código ISO 3166 do Brasil é o 076. [Lista completa online](https://www.iso.org/obp/ui/#search/code/)|
|PaymentFacilitator.SubEstablishment.PhoneNumber|Numérico|13|Obrigatório para facilitadores|Número de telefone do sub Merchant.|
|Payment.Softdescriptor|Texto|13|Obrigatório para facilitadores|Texto impresso na fatura bancaria comprador. Deve ser preenchido de acordo com os dados do sub Merchant.|

### Transações CBPS

Entidades que operam como CBPS (em português, Serviço de Pagamento de Contas para Consumidores) são empresas que oferecem serviços consolidados de pagamento de contas ao portador de cartão. A Marcação de CBPS é uma opção específica para a bandeira Visa e fornece mais visibilidade e precisão nas transações.

Os estabelecimentos que operam com esse serviço devem ser registrados junto a Visa e para operar como tal, devem enviar algumas informações adicionais através da mensageria, que são exigidas pela bandeira. Veja abaixo:

#### Requisição

```json
{
    "merchantorderid": "123456ABCD1234",
    "customer": {
        "name": "João das Contas accept",
        "mobile": "5521923455678"
    },
    "payment": {
        "type": "CreditCard",
        "amount": 100,
        "installments": 1,
        "IsCustomerBillPaymentService":true,
        "capture": false,
        "authenticate": false,
        "recurrent": false,
        "provider": "CieloSandbox",
        "creditcard": {
            "cardnumber": "4532110000001234",
            "holder": "Teste Holder",
            "expirationdate": "12/2022",
            "securitycode": "123",
            "brand": "jcb",
            "savecard": true
        },
        "Wallet": {
            "AdditionalData": {
                "Mcc": "1234"
            }
        }
    }
}
```

|Propriedade                   |Tipo     | Tamanho | Obrigatório | Descrição                                                                                        |
|------------------------------|---------|---------|-------------|--------------------------------------------------------------------------------------------------|
| IsCustomerBillPaymentService | Boolean | ---     | Não         | True ou false. Indica se é uma transação CBPS (Serviço de Pagamento de Contas para Consumidores) |
| Wallet.AdditionalData.Mcc | String (numérico) | 4     | Sim, para transações de CBPS| MCC do estabelecimento (EC) permitido para transações de CBPS|

### Transações SDWO

Se categoriza como uma SDWO (Staged Digital Wallet Operators) uma empresa que oferece serviços de carteira digital/wallet, ou seja, que permite que o portador pague a aquisição de um produto ou serviço por meio de sua própria plataforma, seja com cadastro de cartões de crédito ou debito, ou geração de QR code.

Para transacionar como SDWO, o estabelecimento precisa se registrar junto as bandeiras. Para isso, procure seu gestor comercial Cielo para mais informações.

No caso de transações de e-commerce de uma SDWO com cartão de crédito ou débito (não originadas por um QR Code), é necessário que a carteira mande alguns dados adicionais na transação, para que as bandeiras possam identificar e diferenciar esse tipo de transação. Veja abaixo as especificações:

> Além dos campos específicos dessa modalidade, para transações SDWO também é obrigatório o envio do Soft Descriptor (campo `Payment.SoftDescriptor`) e CPF ou CNPJ do portador (campo `Customer.Identity` e campo `Customer.IdentityType`). Confira mais detalhes desses campos na tabela de campos da requisição.
  
Para efetuar testes, é necessário apenas seguir as orientações do menu [Sandbox e ferramentas](https://developercielo.github.io/manual/cielo-ecommerce#sandbox-e-ferramentas)

Para enviar o MCC do varejista na transação de SDWO, a orientação do mercado é utilizar a tabela da ABECS (Associação Brasileira das Empresas de cartões de crédito e Serviços) que realiza o de-para de CNAEs para os MCCS de toda a indústria. Essa tabela é atualizada constantemente e está disponível online no site da Abecs no seguinte link: [ABECS](https://www.abecs.org.br/consulta-mcc-individual)

**Importante:** A marcação de SDWO é apenas aceita para as seguintes modalidades e bandeiras: Visa/Elo- crédito e débito; Mastercard - apenas crédito. Aceita cartões estrangeiros.

#### Requisição

```json
{
   "MerchantOrderId":"2012345678",
   "Customer":{
      "Name":"Comprador Carteira",
      "Identity":"11225468954",
      "IdentityType":"CPF",
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "SoftDescriptor":"CARTEIRA*NOMELOJA",
      "CreditCard":{
         "CardNumber":"4532110000001234",
         "Brand":"Visa",
         "SecurityCode":"123"
      },
      "Wallet":{
"PlatformOperator":"ABC",
     "AdditionalData": {
        "Mcc": "1234"
     }
      }
   }
}
```

|Propriedade                   |Tipo     | Tamanho | Obrigatório | Descrição                                                                                        |
|------------------------------|---------|---------|-------------|--------------------------------------------------------------------------------------------------|
| `Wallet.PlatformOperator` | String (texto)| 3     | Sim, para transações de SDWO|Sigla da carteira que está cadastrada aqui na Cielo como carteira digital (verificar sua sigla com seu gestor comercial) |
| `Wallet.AdditionalData.Mcc` | String (numérico) | 4     | Sim, para transações de SDWO|MCC do varejista subjacente (pra transações de compra); MCC da carteira digital (para transações de abastecimento de crédito na carteira caso aplicável – no qual é necessária a marcação de cash in também vista nessa sessão)|
|`Customer.Identity`|Texto|14|Sim, para transações de SDWO|Número do CPF ou CNPJ do comprador.|
|`Customer.IdentityType`|Texto|255|Sim, para transações de SDWO|Tipo de documento de identificação do comprador (CPF/CNPJ).|
|`SoftDescriptor`|Texto|13|Sim, para transações de SDWO|Texto que será impresso na fatura bancária do portador.<br> Não permite caracteres especiais.<br>Necessário preencher com **Nome da carteira*nome do lojista**.|

### Transações Cash In

Uma transação do tipo Cash In é uma operação de adição de créditos em uma carteira digital. Os estabelecimentos que operam com esse tipo de transação devem ser registrados como carteira digital junto as bandeiras e devem estar cadastrados com um dos seguintes **MCCs (Códigos de categoria do estabelecimento)**: **6540** ou **6051**.

Além disso, precisam enviar alguns dados adicionais na transação, para que as bandeiras possam identificar e diferenciar esse tipo de transação. Veja as especificações:

> Além dos campos específicos dessa modalidade, para transações Cash In também é obrigatório o envio do Soft Descriptor (campo `Payment.SoftDescriptor`) e CPF ou CNPJ do portador (campo `Customer.Identity` e campo `Customer.IdentityType`). No caso de Cash In, o campo do Soft Descriptor precisa ser preenchido com **nome da carteira*nome do portador**. Confira mais detalhes na tabela de campos da requisição.

**Importante:** A marcação de Cash In é apenas aceita para as seguintes modalidades e bandeiras: Visa/Mastercard só crédito; Elo débito e crédito. Não é aceita para cartão estrangeiro.

#### Requisição

```json
{

   "MerchantOrderId":"2012345678",
   "Customer":{
      "Name":"Comprador Carteira",
      "Identity":"11225468954",
      "IdentityType":"CPF",
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "SoftDescriptor":"CARTEIRA*NOMEPORTADOR",
      "CreditCard":{
         "CardNumber":"4532110000001234",
         "Brand":"Visa",
         "SecurityCode":"123"
      },
      "Wallet":{
"PlatformOperator":"ABC",
     "AdditionalData": {
       "CashIn": "true"
     }
      }
   }
}

```

|Propriedade                   |Tipo     | Tamanho | Obrigatório | Descrição                                                                                        |
|------------------------------|---------|---------|-------------|--------------------------------------------------------------------------------------------------|
| Wallet.PlatformOperator | String (texto)| 3     | Sim, para transações de Cash In|Sigla da carteira que está cadastrada aqui na Cielo como carteira digital (verificar sua sigla com seu gestor comercial) |
| Wallet.AdditionalData.CshIn | String (texto) | -     | Sim, para transações de Cash In|Enviar como “True” se for uma transação de Cash In|
|`Customer.Identity`|Texto|14|Sim, para transações de Cash In|Número do CPF ou CNPJ do comprador.|
|`Customer.IdentityType`|Texto|255|Sim, para transações de Cash In|Tipo de documento de identificação do comprador (CPF/CNPJ).|
|`SoftDescriptor`|Texto|13|Sim, para transações de Cash In|Texto que será impresso na fatura bancária do portador.<br> Não permite caracteres especiais.<br>Necessário preencher com **Nome da carteira*nome do portador**.|

# Consulta - Captura - Cancelamento

## Consulta de transações 

### Consulta por PaymentId

Para consultar uma venda de cartão de crédito via PaymentId, siga a requisição de exemplo a seguir.

<aside class="notice">São elegíveis para a consulta apenas transações dentro dos últimos três meses.</aside>

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/{PaymentId}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API e-commerce Cielo.|Guid|36|Sim|
|`MerchantKey`|Chave pública para Autenticação Dupla na API e-commerce Cielo.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Texto|36|Sim|

#### Resposta

```json
}
"MerchantOrderId": "2014111706",
"AcquirerOrderId": "202202231037440D1BD0",
"Customer": {
    "Name": "Comprador Teste",
    "Address": {}
},
"Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "CreditCard": {
        "CardNumber": "455187******0183",
        "Holder": "Teste Holder",
        "ExpirationDate": "12/2030",
        "SaveCard": false,
        "Brand": "Visa",
        "PaymentAccountReference":"92745135160550440006111072222"
    },
    "ProofOfSale": "674532",
    "Tid": "0223103744208",
    "AuthorizationCode": "123456",
    "Chargebacks": [
        {
            "Amount": 10000,
            "CaseNumber": "123456",
            "Date": "2022-06-04",
            "ReasonCode": "104",
            "ReasonMessage": "Outras Fraudes - Cartao Ausente",
            "Status": "Received",
            "RawData": "Client did not participate and did not authorize transaction"
        }
    ],
    "FraudAlert": {
        "Date": "2022-05-20",
        "ReasonMessage": "Uso Ind Numeração",
        "IncomingChargeback": false
    },
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2022-07-29 17:16:21",
    "CapturedAmount": 9000,
    "CapturedDate": "2022-07-29 17:16:22",
    "VoidedAmount": 1000,
    "VoidedDate": "2022-05-15 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 1,
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "capture",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111706",
    "AcquirerOrderId": "202202231037440D1BD0",
    "Customer": {
        "Name": "Comprador Teste",
        "Address": {}
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222"
        },
        "ProofOfSale": "674532",
        "Tid": "0223103744208",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 10000,
        "ReceivedDate": "2022-07-29 17:16:21",
        "CapturedAmount": 9000,
        "CapturedDate": "2022-07-29 17:16:22",
        "VoidedAmount": 1000,
        "VoidedDate": "2022-05-15 16:25:38",
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`MerchantOrderId`| Número de identificação do pedido.|Texto|50|Texto alfanumérico|
|`AcquirerOrderId` | Id da transação enviado ao autorizador, caso o MerchantOrderId seja maior que 20 caracteres ou tenha símbolos. | Texto | 50   | Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
|`PaymentId`|Campo Identificador do Pedido.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Status da Transação.|Byte|---|2|
|`Customer.Name`|Texto|255|Não|Nome do Comprador.|
|`Customer.Status`|Texto|255|Não|Status de cadastro do comprador na loja (NEW / EXISTING)|
|`Payment.ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Payment.Tid` | Id da transação no provedor do meio de pagamento. | Texto | 40 | Texto alfanumérico|
|`Payment.Type`|Texto|100|Sim|Tipo do Meio de Pagamento.|
|`Payment.Amount`|Número|15|Sim|Valor do Pedido (ser enviado em centavos).|
|`Payment.ReceivedDate`|Data em que a transação foi recebida.|Texto|19|AAAA-MM-DD HH:mm:SS|
|`Payment.CapturedAmount`|Valor capturado.|Número|15|10000|
|`Payment.CapturedDate`|Data da captura.|Texto|19|AAAA-MM-DD HH:mm:SS|
|`Payment.VoidedAmount`|Valor cancelado/estornado, em centavos.|Número|15|10000|
|`Payment.VoidedDate`|Data do cancelamento/estorno.|Texto|19|AAAA-MM-DD HH:mm:SS|
|`Payment.Provider`|Texto|15|---|Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.|
|`CreditCard.CardNumber`|Texto|19|Sim|Número do Cartão do Comprador.|
|`CreditCard.Holder`|Texto|25|Não|Nome do Comprador impresso no cartão.|
|`CreditCard.ExpirationDate`|Texto|7|Sim|Data de validade impresso no cartão.|
|`CreditCard.SecurityCode`|Texto|4|Não|Código de segurança impresso no verso do cartão - Ver Anexo.|
|`CreditCard.Brand`|Texto|10|Sim|Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|
|`CreditCard.PaymentAccountReference`|Numérico|29|Não|O PAR(payment account reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado.|

### Consulta por TId

Para consultar uma venda através do número de referência único da transação na adquirente (TId), execute um GET conforme descrito a seguir.

<aside class="notice">São elegíveis para a consulta apenas transações dentro dos últimos três meses.</aside>

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales/acquirerTid/{TID}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/acquirerTid/{TID}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API e-commerce Cielo.|Guid|36|Sim|
|`MerchantKey`|Chave pública para Autenticação Dupla na API e-commerce Cielo.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`AcquirerOrderId`|Id da transação enviado ao autorizador, caso o MerchantOrderId seja maior que 20 caracteres ou tenha símbolos. | Texto | 50   | Sim|
|`Tid`|Numero de identificação do pagamento na adquirente.|Texto|36|Sim|

#### Resposta

```json
}
"MerchantOrderId": "2014111706",
"AcquirerOrderId": "202202231037440D1BD0",
"Customer": {
    "Name": "Comprador Teste",
    "Address": {}
},
"Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "CreditCard": {
        "CardNumber": "455187******0183",
        "Holder": "Teste Holder",
        "ExpirationDate": "12/2030",
        "SaveCard": false,
        "Brand": "Visa",
        "PaymentAccountReference":"92745135160550440006111072222"
    },
    "ProofOfSale": "674532",
    "Tid": "0223103744208",
    "AuthorizationCode": "123456",
    "Chargebacks": [
        {
            "Amount": 10000,
            "CaseNumber": "123456",
            "Date": "2022-06-04",
            "ReasonCode": "104",
            "ReasonMessage": "Outras Fraudes - Cartao Ausente",
            "Status": "Received",
            "RawData": "Client did not participate and did not authorize transaction"
        }
    ],
    "FraudAlert": {
        "Date": "2022-05-20",
        "ReasonMessage": "Uso Ind Numeração",
        "IncomingChargeback": false
    },
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 10000,
    "ReceivedDate": "2022-07-29 17:16:21",
    "CapturedAmount": 9000,
    "CapturedDate": "2022-07-29 17:16:22",
    "VoidedAmount": 1000,
    "VoidedDate": "2022-05-15 16:25:38",
    "Currency": "BRL",
    "Country": "BRA",
    "ExtraDataCollection": [],
    "Status": 1,
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "capture",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111706",
    "AcquirerOrderId": "202202231037440D1BD0",
    "Customer": {
        "Name": "Comprador Teste",
        "Address": {}
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa",
            "PaymentAccountReference":"92745135160550440006111072222"
        },
        "ProofOfSale": "674532",
        "Tid": "0223103744208",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 10000,
        "ReceivedDate": "2022-07-29 17:16:21",
        "CapturedAmount": 9000,
        "CapturedDate": "2022-07-29 17:16:22",
        "VoidedAmount": 1000,
        "VoidedDate": "2022-05-15 16:25:38",
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`MerchantOrderId`| Número de identificação do pedido.|Texto|50|Texto alfanumérico|
|`AcquirerOrderId` | Id da transação enviado ao autorizador, caso o MerchantOrderId seja maior que 20 caracteres ou tenha símbolos. | Texto | 50   | Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento..|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`Status`|Status da Transação.|Byte|---|2|
|`Customer.Name`|Texto|255|Não|Nome do Comprador.|
|`Customer.Status`|Texto|255|Não|Status de cadastro do comprador na loja (NEW / EXISTING)|
|`Payment.ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Payment.Tid` | Id da transação no provedor do meio de pagamento. | Texto | 40 | Texto alfanumérico|
|`Payment.Type`|Texto|100|Sim|Tipo do Meio de Pagamento.|
|`Payment.Amount`|Número|15|Sim|Valor do Pedido (ser enviado em centavos).|
|`Payment.ReceivedDate`|Data em que a transação foi recebida.|Texto|19|AAAA-MM-DD HH:mm:SS|
|`Payment.CapturedAmount`|Valor capturado.|Número|15|10000|
|`Payment.CapturedDate`|Data da captura.|Texto|19|AAAA-MM-DD HH:mm:SS|
|`Payment.VoidedAmount`|Valor cancelado/estornado, em centavos.|Número|15|10000|
|`Payment.VoidedDate`|Data do cancelamento/estorno.|Texto|19|AAAA-MM-DD HH:mm:SS|
|`Payment.Provider`|Texto|15|---|Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.|
|`CreditCard.CardNumber`|Texto|19|Sim|Número do Cartão do Comprador.|
|`CreditCard.Holder`|Texto|25|Não|Nome do Comprador impresso no cartão.|
|`CreditCard.ExpirationDate`|Texto|7|Sim|Data de validade impresso no cartão.|
|`CreditCard.SecurityCode`|Texto|4|Não|Código de segurança impresso no verso do cartão - Ver Anexo.|
|`CreditCard.Brand`|Texto|10|Sim|Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|
|`CreditCard.PaymentAccountReference`|Numérico|29|Não|O PAR(payment account reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado.|

### Consulta por MerchandOrderId

Para alguns estabelecimentos, o `MerchantOrderId` pode ter várias transações. A consulta por `MerchantOrderId` retorna o `PaymentId` de todas as transações associadas a um `MerchantOrderId`.

A partir disso, é possível consultar detalhes de cada transação pela [consulta por `PaymentId`](https://developercielo.github.io/manual/cielo-ecommerce#consulta-por-paymentid).

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/sales?merchantOrderId={merchantOrderId}</span></aside>

```shell
curls
--request GET " https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales?merchantOrderId={merchantOrderId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Campo identificador do pedido na loja.|Texto|36|Sim|

#### Resposta

```json
{
    "Payment": [
        {
            "PaymentId": "5fb4d606-bb63-4423-a683-c966e15399e8",
            "ReceveidDate": "2015-04-06T10:13:39.42"
        },
        {
            "PaymentId": "6c1d45c3-a95f-49c1-a626-1e9373feecc2",
            "ReceveidDate": "2014-12-19T20:23:28.847"
        }
    ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Payment": [
        {
            "PaymentId": "5fb4d606-bb63-4423-a683-c966e15399e8",
            "ReceveidDate": "2015-04-06T10:13:39.42"
        },
        {
            "PaymentId": "6c1d45c3-a95f-49c1-a626-1e9373feecc2",
            "ReceveidDate": "2014-12-19T20:23:28.847"
        }
    ]
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

### Consulta de Recorrência

A Consulta de Recorrência traz dados sobre o agendamento e sobre o processo de transações que se repetem. A Consulta de Recorrência não retorna dados sobre as transações em si. 

Para obter informações sobre cada transação, faça a [Consulta por PaymentId](https://developercielo.github.io/manual/cielo-ecommerce#consulta-por-paymentid). 

#### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}</span></aside>

```shell
curl
--request GET "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Campo Identificador da Recorrência.|Texto|36|Sim|

#### Resposta

```json
{
    "Customer": {
        "Name": "Fulano da Silva"
    },
    "RecurrentPayment": {
        "RecurrentPaymentId": "c30f5c78-fca2-459c-9f3c-9c4b41b09048",
        "NextRecurrency": "2017-06-07",
        "StartDate": "2017-04-07",
        "EndDate": "2017-02-27",
        "Interval": "Bimonthly",
        "Amount": 15000,
        "Country": "BRA",
        "CreateDate": "2017-04-07T00:00:00",
        "Currency": "BRL",
        "CurrentRecurrencyTry": 1,
        "Provider": "Simulado",
        "RecurrencyDay": 7,
        "SuccessfulRecurrences": 0,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/c30f5c78-fca2-459c-9f3c-9c4b41b09048"
            }
        ],
        "RecurrentTransactions": [
            {
                "PaymentId": "f70948a8-f1dd-4b93-a4ad-90428bcbdb84",
                "PaymentNumber": 0,
                "TryNumber": 1
            }
        ],
        "Status": 1
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Customer": {
        "Name": "Fulano da Silva"
    },
    "RecurrentPayment": {
        "RecurrentPaymentId": "c30f5c78-fca2-459c-9f3c-9c4b41b09048",
        "NextRecurrency": "2017-06-07",
        "StartDate": "2017-04-07",
        "EndDate": "2017-02-27",
        "Interval": "Bimonthly",
        "Amount": 15000,
        "Country": "BRA",
        "CreateDate": "2017-04-07T00:00:00",
        "Currency": "BRL",
        "CurrentRecurrencyTry": 1,
        "Provider": "Simulado",
        "RecurrencyDay": 7,
        "SuccessfulRecurrences": 0,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/c30f5c78-fca2-459c-9f3c-9c4b41b09048"
            }
        ],
        "RecurrentTransactions": [
            {
                "PaymentId": "f70948a8-f1dd-4b93-a4ad-90428bcbdb84",
                "PaymentNumber": 0,
                "TryNumber": 1
            }
        ],
        "Status": 1
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`RecurrentPaymentId`|Campo Identificador da próxima recorrência.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Data da próxima recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`StartDate`|Data do inicio da recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`EndDate`|Data do fim da recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`Interval`|Intervalo entre as recorrência.|Texto|10|/ Monthly / Bimonthly  / Quarterly  / SemiAnnual / Annual |
|`CurrentRecurrencyTry `|Indica o número de tentativa da recorrência atual|Número|1|1|
|`OrderNumber`|Identificado do Pedido na loja|Texto|50|2017051101|
|`Status`|Status do pedido recorrente|Número|1|<br>*1* - Ativo <br>*2* - Finalizado <br>*3*- Desativada pelo Lojista <br> *4* - Desativada por numero de retentativas <BR> *5* - Desativada por cartão de crédito vencido|
|`RecurrencyDay`|O dia da recorrência|Número|2|22|
|`SuccessfulRecurrences`|Quantidade de recorrência realizada com sucesso|Número|2|5|
|`RecurrentTransactions.PaymentId`|Número de identificação do pagamento (que faz parte da recorrência).|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`RecurrentTransactions.TransactionId`|Payment ID da transação gerada na recorrência|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`RecurrentTransactions.PaymentNumber`|Número da Recorrência. A primeira é zero|Número|2|3|
|`RecurrentTransactions.TryNumber`|Número da tentativa atual na recorrência específica|Número|2|1|

## Captura

A **captura** é procedimento exclusivo para transações de cartões de crédito. Há dois tipos de captura:

* Captura automática: é solicitada na mesma [requisição de autorização da transação de crédito]() enviando o `Payment.Capture` como "true".  
* Captura posterior: é solicitada depois do envio da requisição de autorização da transação de crédito.
<br/>
<br/>
**Nesta seção, apresentamos as orientações para fazer a *captura posterior***.

Ao realizar uma captura, o lojista confirma que o valor autorizado no cartão poderá ser cobrado pela instituição financeira emissora do cartão.

**Importante**:

* A captura executa a cobrança do cartão;
* A captura inclui o valor da venda na fatura do comprador;
* O lojista paga à Cielo somente as transações capturadas.

<aside class="notice"><strong>Atenção:</strong> A captura é um processo com prazo de execução padrão de 15 dias. Verifique seu cadastro Cielo para confirmar o limite habilitado para a sua afiliação. Após esse periodo, não é possivel realiza a captura da transação. Se a transação não for capturada, a autorização vai expirar e assim não haverá cobrança no cartão do portador e o limite será liberado.</aside>

### Captura parcial ou total

É possível capturar um valor parcial ou o valor total da transação.

A **captura parcial** é o ato de capturar um valor menor que o valor autorizado. Esse modelo de captura pode ocorrer apenas uma vez por transação. 

**Após a captura, não é possível realizar capturas adicionais no mesmo pedido.**

#### Requisição

* Para **captura parcial**, envie o campo `Amount`na requisição de captura com o valor desejado a capturar;
* Para **captura total**, não envie o campo `Amount`. Será considerado o valor total da autorização.

<aside class="warning">O campo `ServiceTaxAmount` é exclusivo para empresas aéreas.</aside>
<br/>
<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount={Valor}"</span></aside>

```json

https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture

```

```shell
curl
--request PUT "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave pública para Autenticação Dupla na API Cielo E-commerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`PaymentId`|Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.|Guid|36|Sim|
|`Amount`|Valor a ser capturado, em centavos. Se essa campo não for preenchido, o valor da captura será o valor total da autorização. |Número|15|Não|
|`ServiceTaxAmount`|Exclusivo para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.|Número|15|Não|

#### Resposta

```json
{
    "Status": 2,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Status": 2,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
```

| Propriedade             | Descrição                               | Tipo  | Tamanho | Formato            |
|-------------------------|-----------------------------------------|-------|---------|--------------------|
| `Status`                | Status da Transação.                    | Byte  | ---     | 2                  |
| `ProofOfSale`           | Número da autorização, identico ao NSU. | Texto | 6       | Texto alfanumérico |
| `Tid`                   | Id da transação na adquirente.          | Texto | 20      | Texto alfanumérico |
| `AuthorizationCode`     | Código de autorização.                  | Texto | 6       | Texto alfanumérico |
| `ReturnCode`            | Código de retorno da adquirente.        | Texto | 32      | Texto alfanumérico |
| `ReturnMessage`         | Mensagem de retorno da adquirente.      | Texto | 512     | Texto alfanumérico |

<aside class="notice"><strong>Captura de Taxa de embarque</strong> Para realizar a captura da *taxa de embarque*, basta adicionar o valor do ServiveTaxAmount a ser capturado</aside>

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount=xxx</span></aside>

## Cancelamento

O cancelamento é uma funcionalidade que permite ao lojista estornar um pedido de compra. O cancelamento pode ocorrer por insuficiência de estoque ou por desistência da compra pelo consumidor, entre outros motivos.

Na API Cielo E-commerce é possível realizar a requisição de cancelamento para **cartões de débito e crédito**.

* Para **transações autorizadas e não capturadas** (status transacional = 1), o cancelamento pode ser solicitado antes de ocorrer o desfazimento automático da transação.

* Para **transações capturadas** (status transacional = 2), o cancelamento pode ser solicitado 1 dia após a captura e em um prazo de até 360 dias após a autorização da venda. A aprovação dessa ordem de cancelamento é suscetível à avalição de saldo na agenda financeira do lojista no momento da requisição e à aprovação do banco emissor do cartão usado na transação.

Para as solicitações de cancelamento da mesma transação, é necessário aguardar um período de 5 segundos entre uma solicitação e outra, para que sejam realizadas a consulta de saldo, reserva do valor na agenda financeira e sensibilização do saldo, evitando assim duplicidade de cancelamento. Esta regra vale para cancelamentos totais e/ou parciais. Para identificar que as solicitações de cancelamento são da mesma transação, consideramos o número do EC, número da autorização de cancelamento, data da venda, valor da venda e NSU.

> É importante salientar que, para realizar qualquer solicitação de cancelamento, é necessário que o estabelecimento possua saldo suficiente na transação e na agenda.

### Cancelamento total

É possível cancelar uma venda via PaymentID ou MerchantOrderId (numero do pedido).

<aside class="notice"><strong>Atenção:</strong> O cancelamento por MerchantOrderId afeta sempre a transação mais nova, ou seja, caso haja pedidos com o número do pedido duplicado, somente o pedido mais atual será cancelado. O pedido anterior não poderá ser cancelado por esse método.</aside>

#### Requisição

**Cancelamento via PaymentId**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=xxx</span></aside>

ou

**Cancelamento via MerchantOrderId**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/OrderId/{MerchantOrderId}/void?amount=xxx</span></aside>

O exemplo a seguir exibe a requisição de cancelamento via `PaymentId`.

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo E-commerce.|Guid|36|Sim|
|`MerchantKey`|Chave pública para Autenticação Dupla na API Cielo E-commerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`PaymentId`|Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.|Guid|36|Sim|
|`Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Não|

#### Resposta

```json
{
    "Status": 10,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReturnCode": "9",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        }
    ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Status": 10,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReturnCode": "9",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        }
    ]
}
```

| Propriedade             | Descrição                               | Tipo  | Tamanho | Formato            |
|-------------------------|-----------------------------------------|-------|---------|--------------------|
| `Status`                | Status da Transação.                    | Byte  | ---     | 2                  |
| `ProofOfSale`           | Número da autorização, identico ao NSU. | Texto | 6       | Texto alfanumérico |
| `Tid`                   | Id da transação na adquirente.          | Texto | 20      | Texto alfanumérico |
| `AuthorizationCode`     | Código de autorização.                  | Texto | 6       | Texto alfanumérico |
| `ReturnCode`            | Código de retorno da adquirente.        | Texto | 32      | Texto alfanumérico |
| `ReturnMessage`         | Mensagem de retorno da adquirente.      | Texto | 512     | Texto alfanumérico |

### Cancelamento parcial

O **cancelamento  parcial** é o ato de cancelar um valor menor do que o valor total que foi autorizado e capturado. Esse modelo de cancelamento pode ocorrer inúmeras vezes, até que o valor total da transação seja cancelado. 

> O **cancelamento parcial** está disponível apenas para **transações capturadas**.

<aside class="notice"><strong>Atenção:</strong> A API retorna a soma do total de cancelamentos parciais, ou seja, se você fizer três cancelamentos parciais de R$10,00, a API apresentará na resposta um total de R$30,00 cancelados.</aside>

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=XXX </span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void?amount=XXX"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo E-commerce.|Guid|36|Sim|
|`MerchantKey`|Chave pública para Autenticação Dupla na API Cielo E-commerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`PaymentId`|Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.|Guid|36|Sim|
|`Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Não|

#### Resposta

```json
{
    "Status": 2,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8/void"
        }
    ]
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "Status": 2,
    "Tid": "0719094510712",
    "ProofOfSale": "4510712",
    "AuthorizationCode": "693066",
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8/void"
        }
    ]
}
```

| Propriedade             | Descrição                               | Tipo  | Tamanho | Formato            |
|-------------------------|-----------------------------------------|-------|---------|--------------------|
| `Status`                | Status da Transação.                    | Byte  | ---     | 2                  |
| `ProofOfSale`           | Número da autorização, identico ao NSU. | Texto | 6       | Texto alfanumérico |
| `Tid`                   | Id da transação na adquirente.          | Texto | 20      | Texto alfanumérico |
| `AuthorizationCode`     | Código de autorização.                  | Texto | 6       | Texto alfanumérico |
| `ReturnCode`            | Código de retorno da adquirente.        | Texto | 32      | Texto alfanumérico |
| `ReturnMessage`         | Mensagem de retorno da adquirente.      | Texto | 512     | Texto alfanumérico |
| `ProviderReturnCode`    | Código de retorno do Provider.          | Texto | 32      | Texto alfanumérico |
| `ProviderReturnMessage` | Mensagem de retorno do Provider.        | Texto | 512     | Texto alfanumérico |

<aside class="notice"><strong>Cancelamento de Taxa de embarque</strong> Para realizar o cancelamento da *taxa de embarque*, basta adicionar o valor do ServiveTaxAmount a ser cancelado</aside>

```
https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/void?amount={Valor}&serviceTaxAmount=xxx
```

### Códigos de Retorno de Cancelamento

| RETURN CODE | DESCRIÇÃO                                                                                         |
|---|---|
| 6           | Solicitação de cancelamento parcial aprovada com sucesso.                                         |
| 9           | Solicitação de cancelamento total aprovada com sucesso.                                           |
| 72          | Erro: Saldo do lojista insuficiente para cancelamento de venda.                                   |
| 77          | Erro: Venda original não encontrada para cancelamento.                                            |
| 100         | Erro: Forma de pagamento e/ou Bandeira não permitem cancelamento.                                 |
| 101         | Erro: Valor de cancelamento solicitado acima do prazo permitido para cancelar.                    |
| 102         | Erro: Cancelamento solicitado acima do valor da transação original.                               |
| 103         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central  de Cancelamento. |
| 104         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central  de Cancelamento. |
| 105         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central  de Cancelamento. |
| 106         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central  de Cancelamento. |
| 107         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central  de Cancelamento. |
| 108         | Erro:  Número do Estabelecimento (EC) não encontrado. Por favor, verifique o número enviado.      |
| 475         | Falha no processamento. Por favor, tente novamente.                                               |

### Cancelamento via site Cielo

O Cancelamento via Backoffice é a unica opção para realizar o cancelamento de transações de Débito Online. É possivel realizar tanto o cancelamento total quanto o cancelamento parcial.

## Post de Notificação

### Sobre o POST

O **Post de Notificação** é um **webhook** que envia notificações sobre mudanças no status da transação ou sobre criação de pedido recorrente.

Durante seu cadastro na Cielo, você deve configurar um endpoint para que a Cielo envie as notificações e pode também configurar os eventos para os quais deseja receber notificações.

### Eventos Notificados

Os eventos passíveis de notificação por meio de pagamento são:

| Meio de Pagamento            | Eventos que podem ser notificados                                        |
|------------------------------|--------------------------------------------------------------------------|
|**Cartão de Crédito**         | Captura;<br/>Cancelamento;<br/>Sondagem.                                 |
|**Cartão de débito**          | Captura;<br/>Sondagem.                                                   |
|**Boleto**                    | Conciliação;<br/>Cancelamento manual                                     |
|**Transferência eletrônica**  | Confirmadas                                                              |

A notificação ocorre também ocorre em eventos relacionados a **Recorrência Programada Cielo**

| Eventos da Recorrência                                                   |
|--------------------------------------------------------------------------|
| Desabilitado ao atingir número máximo de tentativas (transações negadas) |
| Reabilitação                                                             |
| Finalizado / Data de finalização atingida                                |
| Desativação                                                              |
| Criação da transação de recorrência do pedido recorrente.                |

> Os eventos só são notificados quando se você solicitar o recebimento desse tipo de notificação ao Suporte Cielo.

### Endpoint de Notificação

Você deve informar um endpoint (`URL Status Pagamento`) ao Suporte Cielo, para que o Post de Notificação seja executado. 

Características da `URL Status Pagamento`

* Deve ser **estática**;
* Limite de 255 caracteres.

Características do **Post de notificação** 

* É disparado a cada 30 minutos;
* Em caso de falha, são realizadas três novas tentativas.

> Para aumentar a segurança, é possível cadastrar uma informação para retorno do header para o seu endpoint. Com isso, seu endpoint só vai aceitar a notificação se a Cielo enviar o header. 

Para configurar as informações do header, informe ao Suporte Cielo os itens a seguir:

* `KEY` - Nome do parâmetro 
* `VALUE` - Valor estático a ser retornado

Você pode cadastrar até 3 tipos de informação de retorno no header.

> A **loja deverá retornar** como resposta à notificação: **HTTP Status Code 200 OK**.

O conteúdo da notificação será formado por três campos:

* `RecurrentPaymentId`: identificador que representa um conjunto de transações recorrentes; 
* `PaymentId`: número de identificação do pagamento;
* `ChangeType`: especifica o tipo de notificação.

Com os dados acima, você poderá identificar a transação via `PaymentId` ou `RecurrentPaymentId` e a mudança ocorrida. A partir da notificação, você pode consultar mais detalhes sobre a transação na [Consulta por PaymentId](https://developercielo.github.io/manual/cielo-ecommerce#consulta-por-paymentid) ou na [Consulta de Recorrência](https://developercielo.github.io/manual/cielo-ecommerce#consulta-de-recorr%C3%AAncia).

Veja o exemplo do conteúdo do Post de Notificação:

```json
{
   "RecurrentPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "PaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "ChangeType": "2"
}
```

```shell
curl
--header "key: value"
{
   "RecurrentPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "PaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "ChangeType": "2"
}
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`RecurrentPaymentId`|Identificador que representa o pedido Recorrente (aplicável somente para ChangeType 2 ou 4).|GUID|36|Não|
|`PaymentId`|Número de identificação do pagamento.|GUID|36|Sim|
|`ChangeType`|Especifica o tipo de notificação. Veja a [tabela de Changetype](https://developercielo.github.io/manual/cielo-ecommerce#tabela-de-changetype).|Número|1|Sim|

### Tabela de ChangeType

|ChangeType|Descrição|
|---|---|
|1|Mudança de status do pagamento|
|2|Recorrência criada|
|3|Mudança de status do Antifraude. Exclusivo para clientes integrados ao Antifraude. |
|4|Mudança de status do pagamento recorrente (Ex. desativação automática)|
|5|cancelamento negado|
|7|Notificação de chargeback. Exclusivo para clientes integrados à [Risk Notification API](https://braspag.github.io//manual/risknotification){:target="_blank"}.|
|8|Alerta de fraude|

# Velocity

O **Velocity** é um tipo de mecanismo de prevenção a tentativas de fraude, que analisa a frequência que determinados dados são utilizados numa transação e se esse dados estão inscritos em uma lista de comportamentos passíveis de ações de segurança. 

O Velocity é um aliado na avaliação de comportamentos de compra suspeitos, pois os cálculos são baseados em **elementos de rastreabilidade**.

> Para que suas transações sejam analisadas pelo Velocity, solicite a inclusão desse serviço ao Suporte Cielo.

O Velocity funciona analisando dados enviados na integração padrão da API Cielo E-commerce. Assim, não é necessário incluir nenhum nó adicional na requisição de criação de transação. 

Quando o Velocity está ativo, a resposta da transação trará um nó específico chamado `Velocity`, com os detalhes da análise.

``` json
{
  "MerchantOrderId": "2017051202",
  "Customer": {
    "Name": "Nome do Comprador",
    "Identity": "12345678909",
    "IdentityType": "CPF",
    "Email": "comprador@cielo.com.br",
    "Address": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    },
    "DeliveryAddress": {
      "Street": "Alameda Xingu",
      "Number": "512",
      "Complement": "27 andar",
      "ZipCode": "12345987",
      "City": "São Paulo",
      "State": "SP",
      "Country": "BRA"
    }
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "455187******0181",
      "Holder": "Nome do Portador",
      "ExpirationDate": "12/2027",
      "SaveCard": false,
      "Brand": "Undefined"
    },
    "VelocityAnalysis": {
      "Id": "2d5e0463-47be-4964-b8ac-622a16a2b6c4",
      "ResultMessage": "Reject",
      "Score": 100,
      "RejectReasons": [
        {
          "RuleId": 49,
          "Message": "Bloqueado pela regra CardNumber. Name: Máximo de 3 Hits de Cartão em 1 dia. HitsQuantity: 3\. HitsTimeRangeInSeconds: 1440\. ExpirationBlockTimeInSeconds: 1440"
        }
      ]
    },
    "PaymentId": "2d5e0463-47be-4964-b8ac-622a16a2b6c4",
    "Type": "CreditCard",
    "Amount": 10000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Simulado",
    "ReasonCode": 16,
    "ReasonMessage": "AbortedByFraud",
    "Status": 0,
    "ProviderReturnCode": "BP171",
    "ProviderReturnMessage": "Rejected by fraud risk (velocity)",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/2d5e0463-47be-4964-b8ac-622a16a2b6c4"
      }
    ]
  }
}
```

| Propriedade                              | Descrição                         | Tipo   | Tamanho |
|------------------------------------------|-----------------------------------|--------|---------|
| `VelocityAnalysis.Id`                    | Identificador da análise efetuada | GUID   | 36      |
| `VelocityAnalysis.ResultMessage`         | Accept ou Reject                  | Texto  | 25      |
| `VelocityAnalysis.Score`                 | 100                               | Número | 10      |
| `VelocityAnalysis.RejectReasons.RuleId`  | Código da Regra que rejeitou      | Número | 10      |
| `VelocityAnalysis.RejectReasons.Message` | Descrição da Regra que rejeitou   | Texto  | 512     |

# Recorrência

Pagamentos recorrentes são transações de cartão de crédito que devem se repetir após um determinado periodo de tempo.

São pagamentos normalmente encontrados em **assinaturas**, onde o comprador deseja ser cobrado automaticamente, mas não quer informar novamente os dados do cartão de crédito.

## Tipos de recorrências

A API Cielo Ecommerce funciona com dois tipos de Recorrencia que possuem comportamentos diferentes.

* **Recorrência Própria** - Quando a inteligência da repetição e dados do cartão da recorrência ficam sobre responsabilidade do lojista
* **Recorrência Programada** - Quando a inteligência da repetição e dados do cartão da recorrência ficam sobre responsabilidade da **Cielo**

### Recorrência Própria

Nesse modelo, o lojista é responsavel por criar a inteligência necessaria para:

|Inteligência|Descrição|
|---|---|
|**Salvar os dados da transação**|A loja precisará armazenar a transação e dados do pagamento|
|**Criar repetição transacional**|A loja deverá enviar uma nova transação sempre que necessitar de uma Autorização|
|**Comportamento para transação negada**|Caso uma das transações seja negada, caberá a loja a decisão de "retentar" uma nova autorização|

Em todas as instancias, a recorrencia programada é uma transação padrão para a Cielo, sendo sua unica diferença a necessidade de enviar um a parametro adicional que a define como **Recorrência Própria**

**Paramêtro:** `Payment.Recurrent`= `True`

#### Caso de Uso

Este é um exemplo de como a API Cielo Ecommerce permite a utilização de sistemas externos de recorrência em suas transações

A recorrência própria é uma configuração da API Cielo Ecommerce que permite um lojista utilizar um sistema de recorrência interno especifico as suas necessidades de negócio. 
Nesse modelo, o sistema do lojista é encarregado por definir o período, os dados transacionais, e quando necessário, nos enviar a venda de recorrência.

**Veja um exemplo em uso:**

* Recorrência própria + Cartão Tokenizado

A academia CleverFit possui um sistema de cobrança diferenciado, onde a matricula é cobrada quinzenalmente, mas nunca nos fins de semana.

Por ser um modelo altamente customizado, a CleverFit possui um sistema de recorrência própria, utilizando a API Cielo Ecommerce via dois mecanismos:

1. **Recorrência Própria** - A CleverFit envia os dados da transação como uma venda normal, mas a API identifica que é uma recorrência e aplica regras de autorização diferenciada ao pedido.
1. **Cartão Tokenizado** - A CleverFit mantem os cartões salvos via a tokenização, diminuindo o risco de assegurar os dados  transacionais em seu sistema.

A CleverFit envia a transação quinzenalmente a API Cielo Ecommerce, usando os Tokens salvos na própria API e optando pela Recorrência Própria, que altera a regra de autorização para se adequar a seu modelo de cobrança

### Recorrência Programada

Nesse modelo, a Cielo é responsavel pela inteligência necessaria para executar uma recorrência de maneira automatica.

A **Recorrência Programada** permite que o lojista crie uma transação base, que ao ser enviada para a API Cielo Ecommerce, será salva e executada seguindo as regras definidas pelo lojista. 

Nesse modelo, a API realiza e permite:

|Vantagens|Descrição|
|---|---|
|**Salva dados transacionais**|Salva dados da transação, criando assim um modelo de como serão as proximas Recorrências|
|**Automatiza a recorrência**|Sem atuação da loja, a API cria as transações futuras de acordo com as definições do lojista|
|**Permite atualização de dados**|Caso necessario, a API permite modificações das informações da transação ou do ciclo de recorrência|

A Recorrencia Programada é formada por uma estrutura transacional simples. O Lojista deverá informa na transação os seguintes dados:

``` json
"RecurrentPayment":
{
       "AuthorizeNow":"False",
       "StartDate":"2019-06-01"
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
}
```

Onde podemos definir os dados como:

|Paramêtros|Descrição|
|---|---|
|`AuthorizeNow`|Define que qual o momento que uma recorrencia será criada. Se for enviado como `True`, ela é criada no momento da autorização, se `False`, a recorrencia ficará suspensaaté a data escolhida para ser iniciada.|
|`StartDate`|Define a data que transação da Recorrência Programada será autorizada|
|`EndDate`|Define a data que a Recorrência Programada será encerrada. Se não for enviada, a Recorrência será executada até ser cancelada pelo lojista|
|`Interval`|Intervalo da recorrência.<br /><ul><li>Monthly - Mensal </li><li>Bimonthly - Bimestral </li><li>Quarterly - Trimestral </li><li>SemiAnnual - Semestral </li><li>Annual - Anual </li></ul>|

Quando uma transação é enviada a API Cielo Ecommerce com o nó de Recorrência Programada, o processo de recorrencia passa a ser efetivo quando a transação é considerada **AUTORIZADA**.

Desse ponto em diante, ela passará a ocorre dentro do intervalo definido pelo lojista.

Caracteristicas importantes da **Recorrência Programada**:

|Informação|Descrição|
|---|---|
|**Criação**|A primeira transação é chamada de **"Transação de agendamento"**, todas as transações posteriores serão cópias dessa primeira transação. Ela não precisa ser capturada para que a recorrencia seja criada, basta ser **AUTORIZADA**|
|**Captura**|Transações de Recorrência Programada não precisam ser capturadas. Após a primeira transação, todas as transações de recorrencia são capturadas automaticamente pela API|
|**Identificação**|Transações de Recorrência Programada geram dois tipos de identificação:<br><br>**PAYMENTID**: Identifica 1 transação. É o mesmo identificador das outras transações na API    <br><br>**RECURRENTPAYMENTID**: Identifica Pedido de recorrencia. Um RecurrentPaymentID possui inumeros PaymentID vinculados a ela. Essa é a variavel usada para Cancelar uma Recorrencia Programada|
|**Consultando**|Para consultar, basta usar um dos dois tipos de identificação:<br><br>**PAYMENTID**: Utilizada para consultar UMA TRANSAÇÃO DENTRO DA RECORRÊNCIA    <br><br>**RECURRENTPAYMENTID**: Utilizado para consultar A RECORRÊNCIA.|
|**Cancelamento**|Uma Recorrencia Programada pode ser cancelada de duas maneiras: <br><br>**Lojista**: Solicita o cancelamento da recorrencia. Não cancela transações ja finalizadas antes da ordem de cancelamento da recorrência.  <br><br>**Por cartão invalido**: Caso a API identifique que um cartão salvo está invalido (EX: Expirado) a recorrência será cancelada e não se repetirá, até que o lojista atualize o meio de pagamento. <br><br> **OBS:** Cancelamento de transações dentro da recorrência não encerra o agendamento de transações futuras. Somente o Cancelamento usando o **RecurrentPaymentID** encerra agendamentos futuros.

**Estrutura de um RecurrentPaymentID**

![]({{ site.baseurl_root }}/images/apicieloecommerce/recpaymentid.png)

**Fluxo de uma Recorrência Programada**

![]({{ site.baseurl_root }}/images/apicieloecommerce/fluxosrecprog.png)

#### Caso de uso

Este é um exemplo de como usar as recorrências da API Cielo Ecommerce para elevar suas vendas:

A recorrência é o processo de salvar uma transação e repeti-la em um intervalo de tempo predefinido. Ideal para modelo de assinaturas.

A recorrência programada cielo tem as seguintes características:

* **Intervalos programados:** Mensal, bimestral, trimestral semestral e anual
* **Data de validade:** Permite definir se a recorrência vai se encerrar
* **Retentativa:** se uma transação for negada, vamos retentar a transação até 4x
* **Atualização:** Permite alterar dados da recorrência, como valor, intervalo.

Veja um exemplo em uso:

* **Recorrência Mensal e anual**

A empresa Musicfy oferece um serviço de assinatura de online onde seus clientes pagam para poderem acessar uma biblioteca de músicas e ouvi-las via streaming.

Para captar o máximo de clientes, eles oferecem 2 maneiras de pagamento:

* Mensal por R$19,90 
* Anual (com desconto) de R$180,00 

Como eles executam a cobrança mensal ou anual de seus clientes? 

A MusicFy utiliza a Recorrência programada da API Cielo Ecommerce.

Ao criar uma transação, o Musicfy informa que o pedido em questão deve ser repetir mensalmente ou anualmente e que não há data de termino para a cobrança.

Quais as vantagens de usar a recorrência programada para o MusicFy:

1. **Facilidade:** A cobrança de mensalidade é automática, logo o MusicFy não precisa se preocupar em construir um sistema de cobrança.
    
2. **Usabilidade:** O valor das assinaturas pode ser atualizado sem a necessidade de refazer a transação. Um mês pode ser cancelado ou a recorrência pode ter um delay ( o modelo de 30 dias gratuito) com apenas uma configuração.
    
3. **Segurança:** Não é necessário armazenar dados sensíveis do cartão e do comprador junto a loja.
    
4. **Conversão:** A recorrência programada cielo possui um sistema de retentativa automática. Caso uma das transações seja negada, ela será retentada até 4 vezes, buscando atingir a autorização.

## Criando Recorrências

### Criando uma Recorrência Própria

Para criar uma venda recorrente cuja o processo de recorrência e intervalo serão executados pela propria loja, basta fazer um POST conforme o exemplo.

O paramêtro `Payment.Recurrent`deve ser `true`, caso contrario, a transação será negada.

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador rec propria"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "Recurrent": true,
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
    {
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador rec propria"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "Recurrent": true,
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|6|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Numero de identificação do Pedido.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Sim|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Installments`|Número de Parcelas.|Número|2|Sim|
|`Payment.SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais|Texto|13|Não|
|`Payment.Recurrent`|marcação de uma transação de recorrencia não programada|boolean|5|Não|
|`CreditCard.CardNumber`|Número do Cartão do Comprador.|Texto|19|Sim|
|`CreditCard.Holder`|Nome do Comprador impresso no cartão.|Texto|25|Não|
|`CreditCard.ExpirationDate`|Data de validade impresso no cartão.|Texto|7|Sim|
|`CreditCard.SecurityCode`|Código de segurança impresso no verso do cartão.|Texto|4|Não|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

#### Resposta

```json
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec propria"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": true,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec propria"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": true,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|6|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Numero de identificação do Pedido.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Não|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Installments`|Número de Parcelas.|Número|2|Sim|
|`Payment.SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais|Texto|13|Não|
|`Payment.Recurrent`|marcação de uma transação de recorrencia não programada|boolean|5|Não|
|`CreditCard.CardNumber`|Número do Cartão do Comprador.|Texto|19|Sim|
|`CreditCard.Holder`|Nome do Comprador impresso no cartão.|Texto|25|Não|
|`CreditCard.ExpirationDate`|Data de validade impresso no cartão.|Texto|7|Sim|
|`CreditCard.SecurityCode`|Código de segurança impresso no verso do cartão.|Texto|4|Não|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

### Criando uma Recorrência Programada

Para criar uma venda recorrente cuja a primeira recorrência é autorizada com a forma de pagamento cartão de crédito, basta fazer um POST conforme o exemplo.

<aside class="notice"><strong>Atenção:</strong> Nessa modalidade de recorrência, a primeira transação deve ser capturada. Todas as transações posteriores serão capturadas automaticamente.</aside>

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador rec programada"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
     },
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
    {
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador rec programada"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
     },
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|6|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Numero de identificação do Pedido.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Sim|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Installments`|Número de Parcelas.|Número|2|Sim|
|`Payment.SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais|Texto|13|Não|
|`Payment.RecurrentPayment.EndDate`|Data para termino da recorrência.|Texto|10|Não|
|`Payment.RecurrentPayment.Interval`|Intervalo da recorrência.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|Texto|10|Não|
|`Payment.RecurrentPayment.AuthorizeNow`|Booleano para saber se a primeira recorrência já vai ser Autorizada ou não.|Booleano|---|Sim|
|`CreditCard.CardNumber`|Número do Cartão do Comprador.|Texto|19|Sim|
|`CreditCard.Holder`|Nome do Comprador impresso no cartão.|Texto|25|Não|
|`CreditCard.ExpirationDate`|Data de validade impresso no cartão.|Texto|7|Sim|
|`CreditCard.SecurityCode`|Código de segurança impresso no verso do cartão.|Texto|4|Não|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

#### Resposta

```json
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec programada"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "RecurrentPayment": {
            "RecurrentPaymentId": "61e5bd30-ec11-44b3-ba0a-56fbbc8274c5",
            "NextRecurrency": "2015-11-04",
            "EndDate": "2019-12-01",
            "Interval": "SemiAnnual",
            "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec programada"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "3827556",
        "Tid": "0504043827555",
        "AuthorizationCode": "149867",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "737a8d9a-88fe-4f74-931f-acf81149f4a0",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "RecurrentPayment": {
            "RecurrentPaymentId": "61e5bd30-ec11-44b3-ba0a-56fbbc8274c5",
            "NextRecurrency": "2015-11-04",
            "EndDate": "2019-12-01",
            "Interval": "SemiAnnual",
            "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
            },
            "AuthorizeNow": true
        },
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`RecurrentPaymentId`|Campo Identificador da próxima recorrência.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Data da próxima recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`EndDate`|Data do fim da recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`Interval`|Intervalo entre as recorrência.|Texto|10|/ Monthly / Bimonthly  / Quarterly  / SemiAnnual / Annual |
|`AuthorizeNow`|Booleano para saber se a primeira recorrencia já vai ser Autorizada ou não.|Booleano|---|true ou false|

## Agendando uma Recorrência Programada

Para criar uma venda recorrente cuja a primeira recorrência não será autorizada na mesma data com a forma de pagamento cartão de crédito, basta fazer um POST conforme o exemplo.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador rec programada"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"false",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual",
       "StartDate":"2015-06-01"
     },
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador rec programada"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"false",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual",
       "StartDate":"2015-06-01"
     },
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Não|
|`Customer.Status`|Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude|Texto|255|Não|
|`Customer.Email`|Email do Comprador.|Texto|255|Não|
|`Customer.Birthdate`|Data de nascimento do Comprador.|Date|10|Não|
|`Customer.Identity`|Número do RG, CPF ou CNPJ do Cliente.|Texto|14|Não|
|`Customer.Address.Street`|Endereço do Comprador.|Texto|255|Não|
|`Customer.Address.Number`|Número do endereço do Comprador.|Texto|15|Não|
|`Customer.Address.Complement`|Complemento do endereço do Comprador.|Texto|50|Não|
|`Customer.Address.ZipCode`|CEP do endereço do Comprador.|Texto|9|Não|
|`Customer.Address.City`|Cidade do endereço do Comprador.|Texto|50|Não|
|`Customer.Address.State`|Estado do endereço do Comprador.|Texto|2|Não|
|`Customer.Address.Country`|Pais do endereço do Comprador.|Texto|35|Não|
|`Customer.Address.District`|Bairro do Comprador.|Texto|50|Não|
|`Customer.DeliveryAddress.Street`|Endereço do Comprador.|Texto|255|Não|
|`Customer.DeliveryAddress.Number`|Número do endereço do Comprador.|Texto|15|Não|
|`Customer.DeliveryAddress.Complement`|Complemento do endereço do Comprador.|Texto|50|Não|
|`Customer.DeliveryAddress.ZipCode`|CEP do endereço do Comprador.|Texto|9|Não|
|`Customer.DeliveryAddress.City`|Cidade do endereço do Comprador.|Texto|50|Não|
|`Customer.DeliveryAddress.State`|Estado do endereço do Comprador.|Texto|2|Não|
|`Customer.DeliveryAddress.Country`|Pais do endereço do Comprador.|Texto|35|Não|
|`Customer.DeliveryAddress.District`|Bairro do Comprador.|Texto|50|Não|

### Resposta

```json
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec programada"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "SoftDescriptor":"123456789ABCD",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 20,
        "RecurrentPayment": {
            "RecurrentPaymentId": "0d2ff85e-594c-47b9-ad27-bb645a103db4",
            "NextRecurrency": "2015-06-01",
            "StartDate": "2015-06-01",
            "EndDate": "2019-12-01",
            "Interval": "SemiAnnual",
            "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{PaymentId}"
            },
            "AuthorizeNow": false
        }
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014113245231706",
    "Customer": {
        "Name": "Comprador rec programada"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "SoftDescriptor":"123456789ABCD",
        "Type": "CreditCard",
        "Amount": 1500,
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "ExtraDataCollection": [],
        "Status": 20,
        "RecurrentPayment": {
            "RecurrentPaymentId": "0d2ff85e-594c-47b9-ad27-bb645a103db4",
            "NextRecurrency": "2015-06-01",
            "StartDate": "2015-06-01",
            "EndDate": "2019-12-01",
            "Interval": "SemiAnnual",
            "Link": {
                "Method": "GET",
                "Rel": "recurrentPayment",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{PaymentId}"
            },
            "AuthorizeNow": false
        }
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`RecurrentPaymentId`|Campo Identificador da próxima recorrência.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Data da próxima recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`StartDate`|Data do inicio da recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`EndDate`|Data do fim da recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`Interval`|Intervalo entre as recorrência.|Texto|10|/ Monthly / Bimonthly  / Quarterly  / SemiAnnual / Annual |
|`AuthorizeNow`|Booleano para saber se a primeira recorrencia já vai ser Autorizada ou não.|Booleano|---|true ou false|

## Modificando Recorrências

### Modificando dados do comprador

Para alterar os dados do comprador da Recorrência, basta fazer um Put conforme o exemplo.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Customer</span></aside>

```json
{  
      "Name":"Customer",
      "Email":"customer@teste.com",
      "Birthdate":"1999-12-12",
      "Identity":"22658954236",
      "IdentityType":"CPF",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"174",
         "Complement":"AP 201",
         "ZipCode":"21241140",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
      "DeliveryAddress":{  
         "Street":"Outra Rua Teste",
         "Number":"123",
         "Complement":"AP 111",
         "ZipCode":"21241111",
         "City":"Qualquer Lugar",
         "State":"QL",
         "Country":"BRA",
        "District":"Teste"
      }
}
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Customer"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
      "Name":"Customer",
      "Email":"customer@teste.com",
      "Birthdate":"1999-12-12",
      "Identity":"22658954236",
      "IdentityType":"CPF",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"174",
         "Complement":"AP 201",
         "ZipCode":"21241140",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
      "DeliveryAddress":{  
         "Street":"Outra Rua Teste",
         "Number":"123",
         "Complement":"AP 111",
         "ZipCode":"21241111",
         "City":"Qualquer Lugar",
         "State":"QL",
         "Country":"BRA",
        "District":"Teste"
      }
   }
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Não|
|`Customer.Status`|Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude|Texto|255|Não|
|`Customer.Email`|Email do Comprador.|Texto|255|Não|
|`Customer.Birthdate`|Data de nascimento do Comprador.|Date|10|Não|
|`Customer.Identity`|Número do RG, CPF ou CNPJ do Cliente.|Texto|14|Não|
|`Customer.IdentityType`|Texto|255|Não|Tipo de documento de identificação do comprador (CFP/CNPJ).|
|`Customer.Address.Street`|Endereço do Comprador.|Texto|255|Não|
|`Customer.Address.Number`|Número do endereço do Comprador.|Texto|15|Não|
|`Customer.Address.Complement`|Complemento do endereço do Comprador.|Texto|50|Não|
|`Customer.Address.ZipCode`|CEP do endereço do Comprador.|Texto|9|Não|
|`Customer.Address.City`|Cidade do endereço do Comprador.|Texto|50|Não|
|`Customer.Address.State`|Estado do endereço do Comprador.|Texto|2|Não|
|`Customer.Address.Country`|Pais do endereço do Comprador.|Texto|35|Não|
|`Customer.Address.District`|Bairro do Comprador.|Texto|50|Não|
|`Customer.DeliveryAddress.Street`|Endereço do Comprador.|Texto|255|Não|
|`Customer.DeliveryAddress.Number`|Número do endereço do Comprador.|Texto|15|Não|
|`Customer.DeliveryAddress.Complement`|Complemento do endereço do Comprador.|Texto|50|Não|
|`Customer.DeliveryAddress.ZipCode`|CEP do endereço do Comprador.|Texto|9|Não|
|`Customer.DeliveryAddress.City`|Cidade do endereço do Comprador.|Texto|50|Não|
|`Customer.DeliveryAddress.State`|Estado do endereço do Comprador.|Texto|2|Não|
|`Customer.DeliveryAddress.Country`|Pais do endereço do Comprador.|Texto|35|Não|
|`Customer.DeliveryAddress.District`|Bairro do Comprador.|Texto|50|Não|

#### Resposta

```shell

HTTP Status 200

```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando data final da Recorrência

Para alterar a data final da Recorrência, basta fazer um Put conforme o exemplo.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/EndDate</span></aside>

```json

"2021-01-09"

```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/EndDate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
"2021-01-09"
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`EndDate`|Data para termino da recorrência.|Texto|10|Sim|

#### Resposta

```shell

HTTP Status 200

```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando intevalo da Recorrência

Para alterar o Intervalo da Recorrência, basta fazer um Put conforme o exemplo.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Interval</span></aside>

```json

6

```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Interval"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
6
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`Interval`|Intervalo da recorrência.<br>Monthly = 1 <BR>Bimonthly = 2<BR>Quarterly = 3<BR>SemiAnnual = 6<BR>Annual = 12<BR>|Número|2|Sim|

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificar dia da Recorrência

Para modificar o dia da recorrência, basta fazer um Put conforme o exemplo.

<aside class="notice"><strong>Regra:</strong> Se o novo dia informado for depois do dia atual, iremos atualizar o dia da recorrência com efeito na próxima recorrência Ex.: Hoje é dia 5, e a próxima recorrência é dia 25/05. Quando eu atualizar para o dia 10, a data da próxima recorrência será dia10/05. Se o novo dia informado for antes do dia atual, iremos atualizar o dia da recorrência, porém este só terá efeito depois que a próxima recorrência for executada com sucesso. Ex.: Hoje é dia 5, e a próxima recorrência é dia 25/05. Quando eu atualizar para o dia 3, a data da próxima recorrência permanecerá dia 25/05, e após ela ser executada, a próxima será agendada para o dia 03/06. Se o novo dia informado for antes do dia atual, mas a próxima recorrência for em outro mês, iremos atualizar o dia da recorrência com efeito na próxima recorrência. Ex.: Hoje é dia 5, e a próxima recorrência é dia 25/09. Quando eu atualizar para o dia 3, a data da próxima recorrência será 03/09</aside>

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay</span></aside>

```json
16
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/RecurrencyDay"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
16
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`RecurrencyDay`|Dia da Recorrência.|Número|2|Sim|

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando o valor da Recorrência

Para modificar o valor da recorrência, basta fazer um Put conforme o exemplo.

#### Requsição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Amount</span></aside>

```json
156
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Amount"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
156
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`Payment.Amount`|Valor do Pedido em centavos: 156 equivale a R$ 1,56|Número|15|Sim|

<aside class="warning">Essa alteração só afeta a data de pagamento da próxima recorrência.</aside>

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando data do próximo Pagamento

Para alterar a data do próximo Pagamento, basta fazer um Put conforme o exemplo.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate</span></aside>

```json
"2016-06-15"
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/NextPaymentDate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
"2016-06-15"
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`NextPaymentDate`|Data de pagamento da próxima recorrência.|Texto|10|Sim|

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando dados do Pagamento da Recorrência

Para alterar os dados de pagamento da Recorrência, basta fazer um Put conforme o exemplo.

<aside class="notice"><strong>Atenção:</strong> Essa alteração afeta a todos os dados do nó Payment. Então para manter os dados anteriores você deve informar os campos que não vão sofre alterações com os mesmos valores que já estavam salvos.</aside>

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Payment</span></aside>

```json
{  
   "Type":"CreditCard",
   "Amount":"123",
   "Installments":3,
   "Country":"USA",
   "Currency":"BRL",
   "SoftDescriptor":"123456789ABCD",
   "CreditCard":{  
      "Brand":"Master",
      "Holder":"Teset card",
      "CardNumber":"1234123412341232",
      "ExpirationDate":"12/2030"
   }
}
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Payment"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "Type":"CreditCard",
   "Amount":"123",
   "Installments":3,
   "Country":"USA",
   "Currency":"BRL",
   "SoftDescriptor":"123456789ABCD",
   "CreditCard":{  
      "Brand":"Master",
      "Holder":"Teset card",
      "CardNumber":"1234123412341232",
      "ExpirationDate":"12/2030"
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Installments`|Número de Parcelas.|Número|2|Sim|
|`Payment.SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais|Texto|13|Não|
|`CreditCard.CardNumber`|Número do Cartão do Comprador.|Texto|16|Sim|
|`CreditCard.Holder`|Nome do Comprador impresso no cartão.|Texto|25|Não|
|`CreditCard.ExpirationDate`|Data de validade impresso no cartão.|Texto|7|Sim|
|`CreditCard.SecurityCode`|Código de segurança impresso no verso do cartão.|Texto|4|Não|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Desabilitando um Pedido Recorrente

Para desabilitar um pedido recorrente, basta fazer um Put conforme o exemplo.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Deactivate</span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Deactivate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Reabilitando um Pedido Recorrente

Para Reabilitar um pedido recorrente, basta fazer um Put conforme o exemplo.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Reactivate</span></aside>

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Reactivate"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`RecurrentPaymentId`|Numero de identificação da Recorrência.|Texto|50|Sim|

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

## Renova Fácil

O uso desta funcionalidade permite a substituição automática de um cartão de crédito ou débito vencido. Dessa forma, quando uma transação com marcação de recorrente for submetida para a API e a Cielo identificar que o cartão utilizado foi substituído, sua autorização será negada e serão retornados os dados do novo cartão conforme exemplo.

<aside class="notice"><strong>Atenção:</strong> É necessário solicitar a habilitação desta funcionalidade no cadastro. O Renova Fácil está disponível apenas para cartões de crédito e débito.</aside>

Não é necessário enviar nenhuma informação extra na requisição de autorização, porém a resposta terá o nó `NewCard` tanto para transação de crédito quanto para transação de débito.

Veja a seguir o exemplo de requisição e resposta de uma transação de crédito com Renova Fácil.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador Renova facil"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
     },
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
    {
   "MerchantOrderId":"2014113245231706",
   "Customer":{  
      "Name":"Comprador Renova facil"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":1500,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "RecurrentPayment":{
       "AuthorizeNow":"true",
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
     },
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"262",
         "SaveCard":"false",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|6|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Numero de identificação do Pedido.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Não|
|`Customer.Status`|Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude|Texto|255|Não|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Installments`|Número de Parcelas.|Número|2|Sim|
|`Payment.SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais|Texto|13|Não|
|`Payment.RecurrentPayment.EndDate`|Data para termino da recorrência.|Texto|10|Não|
|`Payment.RecurrentPayment.Interval`|Intervalo da recorrência.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul>|Texto|10|Não|
|`Payment.RecurrentPayment.AuthorizeNow`|Booleano para saber se a primeira recorrência já vai ser Autorizada ou não.|Booleano|---|Sim|
|`CreditCard.CardNumber`|Número do Cartão do Comprador.|Texto|19|Sim|
|`CreditCard.Holder`|Nome do Comprador impresso no cartão.|Texto|25|Não|
|`CreditCard.ExpirationDate`|Data de validade impresso no cartão.|Texto|7|Sim|
|`CreditCard.SecurityCode`|Código de segurança impresso no verso do cartão.|Texto|4|Não|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

### Resposta

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador  Renova facil"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "123412******1231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "10447480685P4611AQ9B",
    "ProofOfSale": "087001",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Cielo",
    "Eci": "0",
    "NewCard": {
       "CardNumber": "40000000000000000",
       "ExpirationDate": "10/2020",
       "SaveCard": false,
        "Brand": "Visa"
    },
    "VelocityAnalysis": {
      "Id": "94f06657-c715-45d2-a563-63f7dbb19e08",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "94f06657-c715-45d2-a563-63f7dbb19e08",
    "Type": "CreditCard",
    "Amount": 1500,
    "ReceivedDate": "2016-12-26 14:14:21",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "KA",
    "ReturnMessage": "Autorizacao negada",
    "Status": 3,
    "RecurrentPayment": {
      "ReasonCode": 7,
      "ReasonMessage": "Denied",
      "EndDate": "2019-12-01",
      "Interval": 6,
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/94f06657-c715-45d2-a563-63f7dbb19e08"
      }
    ]
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador  Renova facil"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "123412******1231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "10447480685P4611AQ9B",
    "ProofOfSale": "087001",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Cielo",
    "Eci": "0",
    "NewCard": {
       "CardNumber": "40000000000000000",
       "ExpirationDate": "10/2020",
       "SaveCard": false,
        "Brand": "Visa"
    },
    "VelocityAnalysis": {
      "Id": "94f06657-c715-45d2-a563-63f7dbb19e08",
      "ResultMessage": "Accept",
      "Score": 0
    },
    "PaymentId": "94f06657-c715-45d2-a563-63f7dbb19e08",
    "Type": "CreditCard",
    "Amount": 1500,
    "ReceivedDate": "2016-12-26 14:14:21",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "KA",
    "ReturnMessage": "Autorizacao negada",
    "Status": 3,
    "RecurrentPayment": {
      "ReasonCode": 7,
      "ReasonMessage": "Denied",
      "EndDate": "2019-12-01",
      "Interval": 6,
      "AuthorizeNow": true
    },
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/94f06657-c715-45d2-a563-63f7dbb19e08"
      }
    ]
  }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`RecurrentPaymentId`|Campo Identificador da próxima recorrência.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`NextRecurrency`|Data da próxima recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`EndDate`|Data do fim da recorrência.|Texto|7|12/2030 (MM/YYYY)|
|`Interval`|Intervalo entre as recorrência.|Texto|10|/ Monthly / Bimonthly  / Quarterly  / SemiAnnual / Annual |
|`AuthorizeNow`|Booleano para saber se a primeira recorrencia já vai ser Autorizada ou não.|Booleano|---|true ou false|

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`NewCard.CardNumber`|Novo número do Cartão do Comprador.|Texto|16|Sim|
|`NewCard.ExpirationDate`|nova data de validade do cartão.|Texto|7|Sim|
|`NewCard.Brand`|Bandeira do cartão.|Texto|10|Sim|
|`NewCard.SaveCard`|Identifica se o cartão gerou Cardtoken durante a transação|Booleano|---|Sim|

### Bandeiras e Emissores Habilitados

Bandeiras e Emissores que já estão com o Renova Fácil habilitados:

|Emissores|VISA|MASTER|ELO|
|---|---|---|---|
|`BRADESCO`|Sim|Sim|Sim|
|`BANCO DO BRASIL`|Sim|---|---|
|`SANTADER`|Sim|---|---|
|`CITI`|Sim|---|---|
|`BANCO PAN`|Sim|---|---|

# Tokenização de cartões

**O que é a *tokenização* de cartões?**

É uma criptografia que permite o armazenamento seguro de dados sensíveis de cartão de crédito. Estes dados são transformados em um código criptografado chamado de *token*, que poderá ser armazenado em banco de dados. Com a tokenização, a loja poderá oferecer recursos como "Compra com um clique” e compras com **recorrência**, sempre preservando a integridade e a confidencialidade das informações.

## Criando um cartão tokenizado antes da autorização

Para salvar um cartão sem autorizar uma transação, basta realizar uma requisição de tokenização com os dados do cartão.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/card/</span></aside>

```json
{
    "CustomerName": "Comprador Teste Cielo",
    "CardNumber":"4532117080573700",
    "Holder":"Comprador T Cielo",
    "ExpirationDate":"12/2030",
    "Brand":"Visa"
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/card/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "CustomerName": "Comprador Teste Cielo",
    "CardNumber":"4532117080573700",
    "Holder":"Comprador T Cielo",
    "ExpirationDate":"12/2030",
    "Brand":"Visa"
}
--verbose
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Name`|Texto|255|Sim|Nome do comprador.|
|`CardNumber`|Texto|16|Sim|Número do cartão do comprador.|
|`Holder`|Texto|25|Sim|Nome do comprador impresso no cartão.|
|`ExpirationDate`|Texto|7|Sim|Data de validade impressa no cartão.|
|`Brand`|Texto|10|Sim|Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover).|

### Resposta

```json
{
  "CardToken": "db62dc71-d07b-4745-9969-42697b988ccb",
  "Links": {
    "Method": "GET",
    "Rel": "self",
    "Href": "https://apiquerydev.cieloecommerce.cielo.com.br/1/card/db62dc71-d07b-4745-9969-42697b988ccb"}
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "CardToken": "db62dc71-d07b-4745-9969-42697b988ccb",
  "Links": {
    "Method": "GET",
    "Rel": "self",
    "Href": "https://apiquerydev.cieloecommerce.cielo.com.br/1/card/db62dc71-d07b-4745-9969-42697b988ccb"}
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`Cardtoken`|Token de identificação do cartão.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Criando um cartão tokenizado durante uma autorização

Para salvar um cartão criando seu token durante a autorização da transação de crédito, envie a requisição padrão de [transação de crédito](https://developercielo.github.io/manual/cielo-ecommerce#cart%C3%A3o-de-cr%C3%A9dito) e no campo `SaveCard` informe o valor "true".

A resposta da requisição retornará o token do cartão no campo `CardToken`. 

## Tokenização de bandeira

Algumas bandeiras de cartão possuem uma solução de tokenização que oferece o armazenamento de cartões em cofres na própria bandeira, de forma criptografada. Essa tokenização de bandeira tem o intuito de melhorar a segurança e qualidade das informações de cartão trafegadas, o que acarreta em possíveis aumentos na conversão de aprovação pelos bancos emissores.

Veja todos os benefícios:
 
* **Maior segurança:** Além da criação de um código (token ou DPAN) para substituir a informação do cartão, as bandeiras também emitem os criptogramas, que funcionam como uma senha ou assinatura da bandeira, única para aquele cartão naquele estabelecimento;
* **Atualização automática de cartões:** Quando um novo cartão é emitido no lugar do cartão anterior, ou quando a data de expiração de um cartão muda, os bancos enviam essas informações para a base da bandeira, e a bandeira automaticamente atualiza os tokens com as novas informações. Ou seja, não tem necessidade de nenhuma ação por parte do estabelecimento;
* **Maior conversão de aprovação:** Por conta da maior segurança com os tokens das bandeiras, os bancos emissores se sentem mais seguros em aprovar as transações. Além disso, com os dados de cartão atualizados automaticamente, mais vendas que poderiam ser negadas por dados de cartão desatualizados podem ser aprovadas.
 
**Como funciona?**
  
As bandeiras participantes disponibilizam APIs para o recebimento e armazenamento do cartão de forma segura para adquirentes, gateways e parceiros, com a criação do token único e exclusivo para aquele cartão naquele estabelecimento.

A Cielo fornece esse serviço para os clientes de duas formas:

* **Integração facilitada:** o estabelecimento se integra com a funcionalidade de tokenização convencional da Cielo, que por trás realiza a tokenização da bandeira, e relaciona esses dois tokens no cofre da Cielo. Dessa forma, os estabelecimentos sempre terão um único token para aquele cartão, mas a Cielo terá os tokens e criptogramas da bandeiras internamente. Para conferir como é a integração com a tokeniação convencional da Cielo, volte para o menu [Tokenização de cartões](https://developercielo.github.io/manual/cielo-ecommerce#tokeniza%C3%A7%C3%A3o-de-cart%C3%B5es).
**Bandeiras disponíveis:** Visa

> Para obter essa funcionalidade, entre em contato com nosso canal de suporte ecommerce solicitando a habilitação: **cieloecommerce@cielo.com.br**

* **Integração por fora:** Se o estabelecimento usa um gateway ou outro parceiro que já oferece a solução de token de bandeira, a Cielo possui os campos para que sejam enviadas as informações do token na transação, para que no processamento a bandeira receba os dados do token. Veja mais detalhes na requisição a seguir.
**Bandeiras disponíveis:** Visa, Master e Elo.

Confira os campos a serem enviados na transação caso a opção escolhida seja a **integração por fora**:

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador Teste",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":15700,
     "Currency":"BRL",
     "Country":"BRA",
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "Cryptogram":"abcdefghijklmnopqrstuvw==",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014111701",
   "Customer":{  
      "Name":"Comprador Teste",
      "Identity":"11225468954",
      "IdentityType":"CPF",
      "Email":"compradorteste@teste.com",
      "Birthdate":"1991-01-02",
      "Address":{  
         "Street":"Rua Teste",
         "Number":"123",
         "Complement":"AP 123",
         "ZipCode":"12345987",
         "City":"Rio de Janeiro",
         "State":"RJ",
         "Country":"BRA"
      },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":15700,
     "ServiceTaxAmount":0,
     "Installments":1,
     "Interest":"ByMerchant",
     "Capture":true,
     "Authenticate":false,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardNumber":"4551870000000183",
         "Holder":"Teste Holder",
         "Cryptogram":"abcdefghijklmnopqrstuvw==",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "SaveCard":"true",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Tipo|Tamanho|Obrigatório|Descrição|
|---|---|---|---|---|
|`Payment.CreditCard.CardNumber`|Texto|19|Sim|Token gerado pela bandeira (DPAN). A indicação de que o `CardNumber` deve ser preenchido com o DPAN para caso de tokenização de bandeira.|
|`Payment.CreditCard.Holder`|Texto|25|Não|Nome do Comprador impresso no cartão.|
|`Payment.CreditCard.Cryptogram`|Texto|28|Não|Criptograma gerado pela bandeira.|
|`Payment.CreditCard.ExpirationDate`|Texto|7|Sim|Data de validade do token gerado pela bandeira.|
|`Payment.CreditCard.SecurityCode`|Texto|4|Não|Código de segurança impresso no verso do cartão - Ver Anexo.|
|`Payment.CreditCard.SaveCard`|Booleano|---|Não (Default false)|Booleano que identifica se o cartão será salvo para gerar o CardToken.|
|`Payment.CreditCard.Brand`|Texto|10|Sim|Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).|

### Resposta

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": true,
            "CardToken": "d37bf475-307d-47be-b50a-8dcc38c5056c",
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste",
        "Identity":"11225468954",
        "IdentityType":"CPF",
        "Email": "compradorteste@teste.com",
        "Birthdate": "1991-01-02",
        "Address": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        },
        "DeliveryAddress": {
            "Street": "Rua Teste",
            "Number": "123",
            "Complement": "AP 123",
            "ZipCode": "12345987",
            "City": "Rio de Janeiro",
            "State": "RJ",
            "Country": "BRA"
        }
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": true,
            "CardToken": "d37bf475-307d-47be-b50a-8dcc38c5056c"
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "Tid": "0305020554239",
        "AuthorizationCode": "123456",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 15700,
        "CapturedAmount": 15700,
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "ReturnCode": "6",
        "ReturnMessage": "Operation Successful",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            }
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Tid`|Id da transação na adquirente.|Texto|20|Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
`SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - nao permite caracteres especiais|Texto|13|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Representa o quão segura é uma transação.|Texto|2|Exemplos: 7|
|`Status`|Status da Transação.|Byte|---|2|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Texto alfanumérico|
|`Cardtoken`|Token de identificação do Cartão.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|

## Criando uma venda com cartão tokenizado

Para criar uma venda de cartão de crédito tokenizado, envie uma requisição de transação de crédito com o `CardToken` conforme o exemplo a seguir.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111706",
   "Customer":{  
      "Name":"Comprador Teste"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":100,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardToken":"6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
         "SecurityCode":"262",
         "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014111706",
   "Customer":{  
      "Name":"Comprador Teste"
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":100,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{  
         "CardToken":"6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
         "SecurityCode":"262",
         "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`CreditCard.CardToken`|Token de identificação do Cartão.|Guid|36|Sim|
|`CreditCard.SecurityCode`|Código de segurança impresso no verso do cartão.|Texto|4|Não|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

### Resposta

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "SaveCard": false,
            "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
            "Brand": "Visa"
        },
        "ProofOfSale": "5036294",
        "Tid": "0310025036294",
        "AuthorizationCode": "319285",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "c3ec8ec4-1ed5-4f8d-afc3-19b18e5962a8",
        "Type": "CreditCard",
        "Amount": 100,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
        {
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "SaveCard": false,
            "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
            "Brand": "Visa"
        },
        "ProofOfSale": "5036294",
        "Tid": "0310025036294",
        "AuthorizationCode": "319285",
        "SoftDescriptor":"123456789ABCD",
        "PaymentId": "c3ec8ec4-1ed5-4f8d-afc3-19b18e5962a8",
        "Type": "CreditCard",
        "Amount": 100,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Tid`|Id da transação na adquirente.|Texto|20|Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
`SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - nao permite caracteres especiais|Texto|13|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Representa o quão segura é uma transação.|Texto|2|Exemplos: 7|
|`Status`|Status da Transação.|Byte|---|2|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Texto alfanumérico|

## Criando uma venda com Cartão Tokenizado na 1.5

Para criar uma venda de cartão de crédito com token do webservice 1.5, é necessário fazer um POST para o recurso Payment conforme o exemplo.

Para uso em Sandbox, é possivel simular transações autorizadas ou negadas via tokens de teste:

|Status|Token|
|---|---|
|Autorizado|6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA|
|Negado|6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeB|

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{  
   "MerchantOrderId":"2014111706",
   "Customer":{  
      "Name":"Comprador token 1.5"     
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":100,
     "Installments":1,
     "CreditCard":{  
        "CardToken":"6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
        "Brand":"Visa"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014111706",
   "Customer":{  
      "Name":"Comprador token 1.5"     
   },
   "Payment":{  
     "Type":"CreditCard",
     "Amount":100,
     "Installments":1,
     "CreditCard":{  
        "CardToken":"6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
        "Brand":"Visa"
     }
   }
}
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja na API Cielo eCommerce.|Guid|36|Sim|
|`MerchantKey`|Chave Publica para Autenticação Dupla na API Cielo eCommerce.|Texto|40|Sim|
|`RequestId`|Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT|Guid|36|Não|
|`MerchantOrderId`|Numero de identificação do Pedido.|Texto|50|Sim|
|`Customer.Name`|Nome do Comprador.|Texto|255|Não|
|`Customer.Status`|Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude|Texto|255|Não|
|`Payment.Type`|Tipo do Meio de Pagamento.|Texto|100|Sim|
|`Payment.Amount`|Valor do Pedido (ser enviado em centavos).|Número|15|Sim|
|`Payment.Installments`|Número de Parcelas.|Número|2|Sim|
|`CreditCard.CardToken`|Token de identificação do Cartão.|Guid|300|Sim|
|`CreditCard.Brand`|Bandeira do cartão.|Texto|10|Sim|

### Resposta

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador token 1.5"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
      "Brand": "Visa"
    },
    "Tid": "0307050140148",
    "ProofOfSale": "140148",
    "AuthorizationCode": "045189",
    "Provider": "Simulado",
    "PaymentId": "8c14cdcf-d5a9-46b0-b040-c0d054cd8f76",
    "Type": "CreditCard",
    "Amount": 100,
    "ReceivedDate": "2017-03-07 17:01:40",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "4",
    "ReturnMessage": "Operation Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/void"
      }
    ]
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador token 1.5"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "SaveCard": false,
      "CardToken": "6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
      "Brand": "Visa"
    },
    "Tid": "0307050140148",
    "ProofOfSale": "140148",
    "AuthorizationCode": "045189",
    "Provider": "Simulado",
    "PaymentId": "8c14cdcf-d5a9-46b0-b040-c0d054cd8f76",
    "Type": "CreditCard",
    "Amount": 100,
    "ReceivedDate": "2017-03-07 17:01:40",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "4",
    "ReturnMessage": "Operation Successful",
    "Status": 1,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/8c14cdcf-d5a9-46b0-b040-c0d054cd8f76/void"
      }
    ]
  }
}

```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`ProofOfSale`|Número da autorização, identico ao NSU.|Texto|6|Texto alfanumérico|
|`Tid`|Id da transação na adquirente.|Texto|20|Texto alfanumérico|
|`AuthorizationCode`|Código de autorização.|Texto|6|Texto alfanumérico|
`SoftDescriptor`|Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - nao permite caracteres especiais|Texto|13|Texto alfanumérico|
|`PaymentId`|Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.|Guid|36|xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`ECI`|Eletronic Commerce Indicator. Representa o quão segura é uma transação.|Texto|2|Exemplos: 7|
|`Status`|Status da Transação.|Byte|---|2|
|`ReturnCode`|Código de retorno da Adquirência.|Texto|32|Texto alfanumérico|
|`ReturnMessage`|Mensagem de retorno da Adquirência.|Texto|512|Texto alfanumérico|

# Consulta Bin

O **Consulta Bin**  é um serviço de **pesquisa de dados do cartão**, seja ele de crédito ou débito, que retorna ao estabelecimento informações que permitem validar os dados preenchidos na tela de pagamento. O serviço retorna os seguintes dados sobre o cartão::

* **Bandeira do cartão:** Nome da Bandeira
* **Tipo de cartão:** Crédito, Débito ou Múltiplo (Crédito e Débito)
* **Nacionalidade do cartão:** Estrangeiro ou Nacional
* **Cartão Corporativo:** Se o cartão é ou não é corporativo
* **Banco Emissor:** Código e Nome
* **Cartão pré-pago::** sim ou não

Essas informações permitem tomar ações no momento do pagamento para melhorar a conversão da loja.

<aside class="warning">O Consulta Bin deve ser habilitado pelo Suporte Cielo. Entre em contato com a equipe de Suporte e solicite a habilitação para sua loja.</aside>

## Caso de Uso

Veja um exemplo de uso: **Consulta BIN + recuperação de carrinho**

O marketplace da empresa Submergível possui uma gama de meios de pagamento disponíveis para que suas lojas ofereçam ao comprador, mas mesmo com toda essa oferta ele continua com uma taxa de conversão baixa.

Conhecendo a função Consulta BIN da API Cielo E-commerce, como ele poderia evitar a perda de carrinhos?

O marketplace da Submergível pode aplicar a Consulta BIN a três cenários:

1. Impedir erros referentes ao tipo de cartão;
2. Oferecer recuperação de carrinhos online;
3. Alertar sobre cartões internacionais.

**Impedir erros referentes ao tipo de cartão**

A Submergível pode usar a Consulta BIN no carrinho para identificar dois dos principais erros no preenchimento de formulários de pagamento:

* **Bandeira errada:** ao preencher o formulário de pagamento, é possível realizar uma consulta e já definir a bandeira correta. Esse é um método muito mais seguro do que se basear em algoritmos no formulário, pois a base de bins consultada é a da bandeira emissora do cartão.

* **Confusões com cartões:** ao preencher o formulário de pagamento, é possível realizar uma consulta e avisar ao consumidor se ele está usando um cartão de débito quando na verdade deveria usar um de crédito.

**Oferecer recuperação de carrinhos online**

* A Submergível pode usar a Consulta BIN no carrinho para oferecer um novo meio de pagamento caso a transação falhe na primeira tentativa.

* Realizando uma consulta no momento de preenchimento do formulário de pagamento, caso o cartão seja múltiplo (crédito e débito), a Submergível pode reter os dados do cartão, e caso a transação de crédito falhe, ela pode oferecer automaticamente ao consumidor uma transação de débito com o mesmo cartão.

**Alertar sobre cartões internacionais**

A Submergível pode usar a Consulta BIN no carrinho para alertar a compradores internacionais que, caso o cartão não esteja habilitado para transacionar no Brasil, a transação será negada.

## Integração

### Request

Basta realizar um `GET` enviado o BIN a nossa URL de consulta:

<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/cardBin/`BIN`</span></aside>

|Campo|Descrição|
|-----|---------|
|`BIN`|9 primeiros dígitos do cartão<br>_Para simular uma consulta em SandBox com retorno `ForeignCard=false`, o terceiro dígito do BIN deve ser 1, e o quinto dígito deve ser diferente de 2 e 3.<br>Exemplos:001040, 501010, 401050_ |

``` json
https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/420020
```

### Response

``` json
{
    "Status": "00",
    "Provider": "MASTERCARD",
    "CardType": "Crédito",
    "ForeignCard": true,
    "CorporateCard": true,
    "Issuer": "Bradesco",
    "IssuerCode": "237"
    "Prepaid":true
}
```

| Paramêtro     | Tipo  | Tamanho | Descrição                                                                                                                                                                                  |
|---------------|-------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Status`      | Texto | 2       | Status da requisição de análise de Bins: <br><br> 00 – Analise autorizada <br> 01 – Bandeira não suportada <br> 02 – Cartão não suportado na consulta de bin <br> 73 – Afiliação bloqueada |
| `Provider`    | Texto | 255     | Bandeira do cartão                                                                                                                                                                         |
| `CardType`    | Texto | 20      | Tipo do cartão em uso : <br><br> Crédito <br> Débito <br>Multiplo                                                                                                                          |
| `ForeingCard` | Booleano | -     | Se o cartão é emitido no exterior (False/True)                                                                                                                                             |
| `CorporateCard` | Booleano | -     | Se o cartão é corporativo (False/True)                                                                                                                                             |
| `Issuer` | Texto | 255     | Nome do emissor do cartão                                                                                                                                        |
| `IssuerCode` | Texto | 255     | Código do emissor do cartão                                                                                                                                           |
| `Prepaid` | Boolean | True ou False     | Retornará "True" caso o cartão seja do tipo pré pago|

> **Atenção**: Em SANDBOX os valores retornados são simulações e não validações reais de BINS. Deve ser considerado apenas o retorno do Request e o seu formato. Para identificação real dos BINS, o ambiente de Produção deverá ser utilizado.

# Zero Auth

O **Zero Auth** é uma ferramenta de validação de cartões da API Cielo. A validação permite que o lojista saiba se o cartão é valido ou não antes de enviar a transação para autorização, antecipando o motivo de uma provável não autorização..

> **Atenção:** Para os casos que seja utilizado algum valor diferente de “0” zero (com valor inferior a 1 dólar seguido do cancelamento da transação), as bandeiras ao identificarem a ação aplicarão tarifas à Cielo, as quais serão repassadas aos estabelecimentos que estiverem em inconformidade. A bandeira Mastercard por exemplo, está cobrando uma tarifa no valor de R$ 0,21 centavos por transação

O **Zero Auth** pode ser usado de 2 maneiras:

1. **Padrão** - Envio de um cartão padrão, sem tokenização ou analises adicionais
2. **Com cartão Tokenizado** - Envio de um TOKEN 3.0 para analise

É importante destacar que o Zero Auth **não retorna ou analisa** os seguintes itens:

1. Limite de crédito do cartão
2. Informações sobre o portador
3. Não aciona a base bancaria (dispara SMS so portador)

O Zero Auth suporta as seguintes bandeiras:

* **Visa**
* **MasterCard**
* **Elo**

> Caso outras bandeiras sejam enviadas, o erro **57-Bandeira inválida** será exibido.

## Caso de uso

Este é um exemplo de como usar o zero auth para melhorar sua conversão de vendas.

O Zero Auth é uma ferramenta da Cielo que permite verificar se um cartão está valido para realizar uma compra antes que o pedido seja finalizado. Ele faz isso simulando uma autorização, mas sem afetar o limite de crédito ou alertar o portados do cartão sobre o teste.

Ela não informa o limite ou características do cartão ou portador, mas simula uma autorização Cielo, validando dados como:

1. Se  o cartão está valido junto ao banco emissor
2. Se o cartão possui limite disponível
3. Se o cartão funciona no Brasil
4. Se o número do cartão está correto
5. Se o CVV é valido

O Zero Auth também funciona com Cartões tokenizados na Api Cielo Ecommerce 

Veja um exemplo de uso: 

**Zero auth como validador de cartão**

Uma empresa de Streaming chamada FlixNet possui um serviço via assinatura, onde além de realizar uma recorrência, ela possui cartões salvos e recebe novas inscrições diariamente. 
Todas essas etapas exigem que transações sejam realizadas para obter acesso a ferramenta, o que eleva o custo da FlixNet caso as transações não sejam autorizadas. 

Como ela poderia reduzir esse custo? Validando o cartão antes de envia-lo a autorizado.

A FlixNet usa o Zero Auth em 2 momento diferente:

* **Cadastro**: é necessário incluir um cartão para ganhar 30 dias grátis no primeiro mês. 

O problema é que ao se encerrar esse período, se o cartão for invalido, o novo cadastro existe, mas não funciona, pois, o cartão salvo é invalido. A Flix Net resolveu esse problema testando o cartão com o Zero Auth no momento do cadastro, assim, ela já sabe se o cartão está valido e libera a criação da conta. Caso não o cartão não seja aceito, a FlixNet pode sugerir o uso de um outro cartão.

* **Recorrência**: todo mês, antes de realizar a cobrança da Assinatura, a Flixnet testa o cartão com o zero auth, assim sabendo se ele será autorizado ou não.  Isso ajuda o FlixNet a prever quais cartões serão negados, já acionando o assinante para atualização do cadastro antes do dia de pagamento.

## Integração

Para realizar a consulta ao Zero Auth, o lojista deverá enviar uma requisição `POST` para a API Cielo Ecommerce, simulando uma transação. O `POST` deverá ser realizado nas seguintes URL: 

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://api.cieloecommerce.cielo.com.br/1/zeroauth</span></aside>

Cada tipo de validação necessita de um contrato tecnico diferente. Eles resultarão em _responses diferenciados_.

### Requisição

#### PADRÃO

``` json
{
    "CardNumber":"1234123412341231",
    "Holder":"Alexsander Rosa",
    "ExpirationDate":"12/2021",
    "SecurityCode":"123",
    "SaveCard":"false",
    "Brand":"Visa",
    "CardOnFile":{
       "Usage":"First",
       "Reason":"Recurring"
    }
}
```

Abaixo, a listagem de campos da Requisição:

| Paramêtro        | Descrição                                                                                                                                                  | Tipo    | Tamanho | Obrigatório |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|---------|:-----------:|
| `CardType`       | *CreditCard*                                                                                                                                                                                                               | Texto   | 255     | Sim         |
| `CardNumber`     | Número do Cartão do Comprador                                                                                                                                                                                                                                                                                                                                                                             | Texto   | 16      | Sim         |
| `Holder`         | Nome do Comprador impresso no cartão.                                                                                                                                                                                                                                                                                                                                                                     | Texto   | 25      | Sim         |
| `ExpirationDate` | Data de e validade impresso no cartão.                                                                                                                                                                                                                                                                                                                                                                    | Texto   | 7       | Sim         |
| `SecurityCode`   | Código de segurança impresso no verso do cartão.                                                                                                                                                                                                                                                                                                                                                          | Texto   | 4       | Sim         |
| `SaveCard`       | Booleano que identifica se o cartão será salvo para gerar o CardToken.                                                                                                                                                                                                                                                                                                                                    | Boolean | ---     | Sim         |
| `Brand`          | Bandeira do cartão: <br><br>Visa<br>Master<br>Elo                                                                                                                                                                                                                                                                                                                                                            | Texto   | 10      | Sim         |
| `CardToken`      | Token do cartão na 3.0                                                                                                                                                                                                                                                                                                                                                                                    | GUID    | 36      | Condicional |
| `Usage`          | **First** se o cartão foi armazenado e é seu primeiro uso.<br>**Used** se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação.                                                                                                                                                                                                                                                | Texto   | ---     | Não         |
| `Reason`         | Indica o propósito de armazenamento de cartões, caso o campo "Usage" for "Used".<BR>**Recurring** - Compra recorrente programada (ex. assinaturas)<br>**Unscheduled** - Compra recorrente sem agendamento (ex. aplicativos de serviços)<br>**Installments** - Parcelamento através da recorrência<br>[Veja Mais](https://developercielo.github.io/faq/faq-api-3-0#pagamento-com-credenciais-armazenadas). | Texto   | ---     | Condicional |

#### COM TOKEN

``` json
{
  "CardToken":"23712c39-bb08-4030-86b3-490a223a8cc9",
  "SaveCard":"false",
  "Brand":"Visa"
}
```

Abaixo, a listagem de campos da Requisição: 

| Paramêtro        | Descrição                                                                                                             | Tipo    | Tamanho | Obrigatório |
|------------------|-----------------------------------------------------------------------------------------------------------------------|---------|---------|:-----------:|
| `Brand`          | Bandeira do cartão: <br><br>Visa<br>Master<br>| Texto   | 10      | não         |
| `CardToken`      | Token do cartão na 3.0                                                                                                | GUID    | 36      | Condicional |

### Resposta

A resposta sempre retorna se o cartão pode ser autorizado no momento. Essa informação apenas significa que o _cartão está valido a transacionar_, mas não necessariamente indica que um determinado valor será autorizado.

Abaixo os campos retornados após a validação:

| Paramêtro              | Descrição                                                                                                                                                                                                                                                                                                        | Tipo    | Tamanho |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|---------|
| `Valid`               | Situação do cartão:<br> **True** – Cartão válido<BR>**False** – Cartão Inválido                                                                                                                                                                                                                                   | Boolean | ---     |
| `ReturnCode`          | Código de retorno                                                                                                                                                                                                                                                                                                 | Texto   | 2       |
| `ReturnMessage`       | Mensagem de retorno                                                                                                                                                                                                                                                                                               | Texto   | 255     |
| `IssuerTransactionId` | Identificado de autenticação do Emissor para transações de débito recorrentes. Este campo deve ser enviado nas transações subsequentes da primeira transação no modelo de recorrência própria. Já no modelo de recorrência programada, a Cielo será a responsável por enviar o campo nas transações subsequentes. | Texto   | 15      |

#### POSITIVA - Cartão Válido

``` json
{
  "Valid": true,
  "ReturnCode": "00",
  "ReturnMessage": "Transacao autorizada",
  "IssuerTransactionId": "580027442382078"
}
```

> Consulte <https://developercielo.github.io/Webservice-3.0/#códigos-de-retorno-das-vendas> para visualizar a descrição dos códigos de retorno. 
> O código de retorno **00 representa sucesso no Zero Auth**, os demais códigos são definidos de acordo com a documentação acima.

#### NEGATIVA - Cartão Inválido

``` json
{
       "Valid": false,
       "ReturnCode": "57",
       "ReturnMessage": "Autorizacao negada",
       "IssuerTransactionId": "580027442382078"
}
```

#### NEGATIVA - Bandeira inválida

``` json
  {    
      "Code": 57,     
      "Message": "Bandeira inválida"   
  }
```

#### NEGATIVA - Restrição Cadastral

``` json
  {    
      "Code": 389,     
      "Message": "Restrição Cadastral"   
  }
```

Caso ocorra algum erro no fluxo, onde não seja possível validar o cartão, o serviço irá retornar erro: 

* 500 – Internal Server Erro
* 400 – Bad Request

# Silent Order Post

Integração que a Cielo oferece aos lojistas, na qual os dados de pagamentos são trafegados de forma segura, mantendo o controle total sobre a experiência de checkout.

Esse método possibilita o envio dos dados do pagamento do seu cliente final de forma segura diretamente em nosso sistema. Os campos de pagamento são guardados do lado da Cielo, que conta com a certificação PCI DSS 3.2.

É ideal para lojistas que exigem um alto nível de segurança, sem perder a identidade de sua página. Esse método permite um alto nível de personalização na sua página de checkout.

## Características

* Captura de dados de pagamento diretamente para os sistemas da Cielo por meio dos campos hospedados na sua página através de um script (javascript);
* Compatibilidade com todos os meios de pagamentos disponibilizados ao Gateway (Nacional e Internacional);
* Autenticação do comprador (disponível);
* Redução do escopo de PCI DSS;
* Permite manter controle total sobre a experiência de checkout e elementos de gestão da sua marca.

## Fluxo de Autorização

### Fluxo Padrão de Autorização

![Fluxo Padrão](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo-padrao-de-autorizacao.jpg)

É preciso que o estabelecimento seja **PCI Compliance** (PCI = Regras de segurança para manipular os dados do cartão)

### Fluxo de Autorização com Silent Order POST

![Fluxo Padrão](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo-de-autorizacao-com-sop.jpg)

O servidor **não trafega os dados do cartão** abertamente.

## Fluxo Transacional

![Fluxo Silent Order Post]( https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/fluxo-silent-order-post-cielo_new.png)

## Integração

### Passo 1

O cliente acaba o checkout, e vai para o processamento do pagamento.

### Passo 2. Obtenção do AccessToken OAuth2

Quando o comprador acessa o checkout, o estabelecimento deve gerar o `AccessToken` a partir da API de autenticação da Cielo (**OAuth2**). Em caso de sucesso, a API retornará um `AccessToken` que deverá ser utilizado na próxima camada de autenticação da ferramenta.

Para obter o `AccessToken` no padrão [OAuth 2.0](https://oauth.net/2/){:target="_blank"}, envie uma requisição utilizando o VERBO HTTP **POST** para a seguinte URL, formada pela "URL base do ambiente + endpoint", no modelo server-to-server:

|Ambiente | URL base + endpoint | Authorization |
|---|---|---|
| **SANDBOX** | https://authsandbox.braspag.com.br/oauth2/token | "Basic *{base64}*"|
| **PRODUÇÃO** | https://auth.braspag.com.br/oauth2/token |"Basic *{base64}*"|

**Nota:** O valor "_{base64}_" para a autorização do tipo "Basic" deve ser obtido da seguinte forma:

1. Concatene o "ClientId" e o "ClientSecret" (`ClientId:ClientSecret`);
2. Codifique o resultado da concatenação em base64;
3. Realize uma requisição ao servidor de autorização utilizando o código alfanumérico gerado.

> Para obter o "ClientID" e o "ClientSecret", envie um e-mail para *cieloecommerce@cielo.com.br* contendo o MerchantId e informando que deseja obter as credenciais "ClientID" e "ClientSecret" para o Silent Order Post.

**Requisição**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">oauth2/token</span></aside>

``` shell
--request POST "https://authsandbox.braspag.com.br/oauth2/token"
--header "Authorization: Basic {base64}"
--header "Content-Type: application/x-www-form-urlencoded" 
--data-binary "grant_type=client_credentials"
```

|Parâmetros|Formato|Envio|
|---|---|---|
|`Authorization`|"Basic *{base64}*"|Envio no header.|
|`Content-Type`|"application/x-www-form-urlencoded"|Envio no header.|
|`grant_type`|"client_credentials"|Envio no body.|

**Resposta**

``` json
{
  "access_token": "faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw",
  "token_type": "bearer",
  "expires_in": 599
}
```

```shell
{
  "access_token": "faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw",
  "token_type": "bearer",
  "expires_in": 599
}
```

|Propriedades da Resposta|Descrição|
|---|---|
|`access_token`|O token de autenticação solicitado. Ele será utilizado no próximo passo.|
|`token_type`|Indica o valor do tipo de token.|
|`expires_in`|Expiração do token de acesso, em segundos. Quando o token expira, é necessário obter um novo.|

### Passo 3. Obtenção do AccessToken SOP

Após a obtenção do AccessToken OAuth2, o estabelecimento deverá realiza um envio de requisição utilizando o VERBO HTTP **POST** para a seguinte URL:

| Ambiente | URL base + endpoint|
| --- | --- |
| Sandbox | https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken|
| Produção | https://transaction.pagador.com.br/post/api/public/v2/accesstoken|

**Requisição**

```shell
--request POST "https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken"
--header "Content-Type: application/json"
--header "MerchantId: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
--header "Authorization: Bearer faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório?|
|-----------|---------|----|-------|-----------|
|`MerchantId`|Identificador da loja na API Cielo E-commerce.|GUID |36 |Sim|
|`Authorization`|Bearer [AccessToken OAuth2]|Texto |36 |Sim|

**Resposta**

Como resposta, o estabelecimento receberá um json ("HTTP 201 Created") contendo, entre outras informações, o token (AccessToken SOP).

```json
{
    "MerchantId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AccessToken": "MzA5YWIxNmQtYWIzZi00YmM2LWEwN2QtYTg2OTZjZjQxN2NkMDIzODk5MjI3Mg==",
    "Issued": "2021-05-05T08:50:04",
    "ExpiresIn": "2021-05-05T09:10:04"
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AccessToken": "MzA5YWIxNmQtYWIzZi00YmM2LWEwN2QtYTg2OTZjZjQxN2NkMDIzODk5MjI3Mg==",
    "Issued": "2021-05-05T08:50:04",
    "ExpiresIn": "2021-05-05T09:10:04"
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|-----------|---------|----|-------|-------|
|`MerchantId`|Identificador da loja na API Cielo E-commerce. |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`AccessToken`|Token de acesso (AccessToken SOP). Por questões de segurança, este token dará permissão para o estabelecimento salvar apenas 1 cartão dentro de um prazo já estipulado na resposta, através do atributo *ExpiresIn* (por padrão, 20 minutos). O que acontecer primeiro invalidará esse mesmo token para impedir um uso futuro.|Texto|--|NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==|
|`Issued`|Data e hora da geração. |Texto|--|AAAA-MM-DDTHH:MM:SS|
|`ExpiresIn`|Data e hora da expiração. |Texto|--|AAAA-MM-DDTHH:MM:SS|

### Passo 4

a) Faça o download do script fornecido pela Cielo, e anexe o script à sua página de checkout. Esse script permitirá à Cielo processar todas as informações de cartão sem intervenção do estabelecimento.

Faça o download do script correspondente ao ambiente desejado, sandbox ou produção:

|AMBIENTE|URL|
|---|---|
|**SANDBOX**|[https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js](https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js){:target="_blank"}|
|**PRODUÇÃO**|[https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js](https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js){:target="_blank"}|

b) Decore seus inputs do formulário com as seguintes classes:

* Para o portador do cartão de crédito/débito: **bp-sop-cardholdername** 
* Para o número do cartão de crédito/débito: **bp-sop-cardnumber** 
* Para a validade do cartão de crédito/débito: **bp-sop-cardexpirationdate** 
* Para o código de segurança do cartão de crédito/débito: **bp-sop-cardcvvc**

#### DEFININDO PARÂMETROS

**Parâmetros do Script**

|Propriedade|Descrição|
|-----------|---------|
|`accessToken`| Token de acesso obtido via API de autenticação da Braspag (AccessToken SOP).|
|`environment`| Tipo de ambiente: "sandbox" / "production".|
|`language`| Idioma: "pt" / "en" / "es". |
|`enableTokenize`| "true" (salva o cartão diretamente no Cartão Protegido, retornando um *cardToken* ao invés de um *paymentToken*) / "false" (caso contrário). |
|`cvvRequired`| "false" (desliga a obrigatoriedade de envio do CVV) / "true" (caso contrário). |

**Retornos do Script**

|Propriedade|Descrição|Condição|
|-----------|---------|---------|
|`PaymentToken`| Token efêmero utilizado para pagamento no formato de um GUID (36). |---|
|`CardToken`| Token permanente utilizado para pagamento no formato de um GUID (36). |Quando *enableTokenize* for "true". |

c) O script fornecido pela Cielo fornece três eventos para manipulação e tratamento por parte do estabelecimento. São eles: 
  
* **onSuccess**, onde será retornado o **“PaymentToken”** após processar os dados do cartão;
* **onError**, caso haja algum erro no consumo dos serviços da Cielo;
* **onInvalid**, onde será retornado o resultado da validação dos inputs.

* Na validação dos inputs, o estabelecimento poderá utilizar toda a camada de validação sobre os dados de cartão realizada pela Cielo e assim simplificar o tratamento no seu formulário de checkout. As mensagens retornadas no resultado da validação são disponibilizadas nos idiomas português (default), inglês e espanhol.

* O **PaymentToken** será o token que representará todos os dados de cartão fornecido pelo comprador. O mesmo será utilizado pelo estabelecimento para não haver necessidade de tratar e processar dados de cartão do seu lado.

``` json
},
    "Payment": {
    "Type": "CreditCard",
    "Amount": 1400,
    "Installments": 1,
        "CreditCard": {
        "PaymentToken": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "Brand": "MASTER"
        }
    }
}
```

**Por questões de segurança esse PaymentToken poderá ser usado apenas para 1 autorização na Cielo 3.0. Após o processamento do token, este será invalidado.**

Exemplo de setup a ser realizado pelo estabelecimento na página de checkout:

![Pagina Checkout]({{ site.baseurl_root }}/images/html-silent-order-post.jpg)

## Autenticação legada do SOP

> Não recomendamos essa forma de autenticação, pois será descontinuada.

**PASSO 1**

O cliente acaba o checkout, e vai para o processamento do pagamento.

**PASSO 2**

a) O estabelecimento deverá solicitar um ticket (server to server) enviando um POST para a seguinte URL:

**SANDBOX:**
**https://transactionsandbox.pagador.com.br/post/api/public/v1/accesstoken?merchantid={mid_loja}**

**PRODUÇÃO:**
**https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid={mid}**

Exemplo: https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid=00000000-0000-0000-0000-000000000000

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v1/accesstoken?merchantid={mid_loja}</span></aside>

```shell
curl
--request POST "https://transaction.cieloecommerce.cielo.com.br/post/api/public/v1/accesstoken?merchantid=00000000-0000-0000-0000-000000000000"
--header "Content-Type: application/json"
--data-binary
--verbose
```

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|-----------|---------|----|-------|-----------|
|`mid_loja`|Identificador da loja na API |Guid |36 |Sim|

### Resposta

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "AccessToken": "NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==",
    "Issued": "2018-07-23T11:09:32",
    "ExpiresIn": "2018-07-23T11:29:32"
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|-----------|---------|----|-------|-------|
|`MerchantId`|Identificador da loja na API |Guid |36 |xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|
|`AccessToken`|Token de Acesso|Texto|--|NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ==|
|`Issued`|Data e hora da geração |Texto|--|AAAA-MM-DDTHH:MM:SS|
|`ExpiresIn`|Data e hora da expiração |Texto|--|AAAA-MM-DDTHH:MM:SS|

b) Para uso este recurso, por questões de segurança, obrigatoriamente será requerido do lado da Cielo, **no mínimo um IP válido do estabelecimento**. Caso contrário a requisição não será autorizada (**HTTP 401 NotAuthorized**).

**PASSO 3**

a) Como resposta, o estabelecimento receberá um json (HTTP 201 Created) contendo entre outras informações o ticket (AccessToken), como por exemplo:

![Response Ticket]({{ site.baseurl_root }}/images/response-ticket-silent-order-post-cielo.jpg)

Por questões de segurança, este ticket dará permissão para o estabelecimento salvar apenas 1 cartão dentro de um prazo de já estipulado na resposta, através do atributo ExpiresIn (por padrão, 20 minutos). O que acontecer primeiro invalidará esse mesmo ticket para um uso futuro.

# Códigos da API

## Sobre os códigos

A Api Cielo e-commerce possui 4 tipos de códigos retornados que representam diferentes momentos da transação.
Abaixo vamos explica-los na ordem em que podem ocorrer:

|Código|Descrição|
|---|---|
|**HTTP Status Code**|São códigos do padrão HTTP. Eles informam se as informações enviadas a API estão de **fato obtendo sucesso ao atingir nossos ENDPOINTs**. Se valores diferentes de 200 ou 201 estejam aparecendo, há algum empecilho com a comunicação com a API<BR><BR> *Retornado no momento da requisição a API*|
|**Erros da API**|Esses códigos são respostas a **validação do conteúdo dos dados enviados**. Se eles estão sendo exibidos, as chamadas a nossa API foram identificadas e estão sendo validadas. Se esse código for exibido, a requisição contem erros (EX: tamanho/condições/erros de cadastro) que impedem a criação da transação<BR><BR>*Retornado no momento da requisição a API*|
|**Status**|Depois de criada a transação, esses códigos serão retornados, informando como se encontra a transação no momento (EX: `Autorizada` > `Capturada` > `Cancelada`)<BR><BR>*Retornado no campo `Status` *|
|**Retorno das Vendas**|Formado por um **código de Retorno** e uma **mensagem**, esses códigos indicam o **motivo** de um determinado `Status` dentro de uma transação. Eles indicam, por exemplo, se uma transação com `status` negada não foi autorizada devido saldo negativo no banco emissor. <BR><BR>*Retornados nos campos `ReturnCode` e `ReturnMessage`*<BR> *Ocorrem somente em Cartões de crédito e Débito*|

> **OBS**: No  antigo **Webservice 1.5 Cielo**, o `ReturnCode` era considerado como *Status da transação*. Na **API CIELO ECOMMERCE**, o campo `Status` possui códigos próprios, sendo assim, o **campo a ser considerado como base de identificação do status de uma transação**

## HTTP Status Code

|HTTP Status Code|Descrição|
|---|---|
|200|OK (Capture/Void/Get) |
|201|OK (Authorization) |
|400|Bad Request|
|404|Resource Not Found|
|500|Internal Server Error|

## Códigos de retorno ABECS

A Associação Brasileira das Empresas de Cartão de Crédito e Serviços (ABECS) estabelece a partir do dia 15 de Julho de 2020 a padronização do código de retorno das autorizações de vendas recusadas tanto para as soluções pagamento do mundo físico e e-commerce do mercado brasileiro.

Essa medida normativa busca trazer benefícios para todo o mercado de pagamentos, proporcionando maior transparência no entendimento do motivo de recusa das transações, além de possibilitar maior assertividade na adoção de estratégias de retentativas de vendas.

A Cielo informa seus clientes que está preparada para processar as transações seguindo esse novo padrão do mercado, segue abaixo a tabela de códigos padronizados pela ABECS.

<aside class="notice">Os códigos da bandeira AMEX sofreram um de/para de modo a manter dois dígitos. Reforçamos que essa medida não altera os motivos de retorno.</aside>

| Mensagem | Tipo de Código | ELO | VISA | MASTERCARD/HIPER | AMEX | AMEX - De/Para Cielo | Mensagem POS/Ecommerce | Houve alteração da ABECS em 2022? |
|---|---|---|---|---|---|---|---|
|GENÉRICA|REVERSÍVEL|5|5|5|100|FA|CONTATE A CENTRAL DO SEU CARTÃO|Não|
|SALDO/LIMITE INSUFICIENTE|REVERSÍVEL|51|51|51|116|A5|NÃO AUTORIZADA|Não|
|SALDO/LIMITE INSUFICIENTE|REVERSÍVEL|51|51|51|121|A5|NÃO AUTORIZADA|Somente na nossa Documentação|
|SENHA INVÁLIDA|REVERSÍVEL|55|55 ou 86|55|117|A6|SENHA INVÁLIDA|Não|
|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO|REVERSÍVEL|-|57|57|200|FD|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO|Sim|
|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO|IREVERSÍVEL|57|-|-|-|-|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE|Novo|
|NÚMERO CARTÃO NÃO PERTENCE AO EMISSOR / NÚMERO CARTÃO INVÁLIDO|IRREVERSÍVEL|14 ou 56|14|14 ou 01|122|8|VERIFIQUE OS DADOS DO CARTÃO|Sim|
|VIOLAÇÃO DE SEGURANÇA|IRREVERSÍVEL|63|63|-|122|8|VERIFIQUE OS DADOS DO CARTÃO|Sim|
|VIOLAÇÃO DE SEGURANÇA|REVERSÍVEL|-|-|63|-|-|VERIFIQUE OS DADOS DO CARTÃO|Novo|
|SUSPEITA DE FRAUDE|REVERSÍVEL|59|59|63|100|FA|CONTATE A CENTRAL DO SEU CARTÃO|Não|
|COMERCIANTE INVÁLIDO|IRREVERSÍVEL|58|3|3|109|DA|TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE|Sim|
|REFAZER A TRANSAÇÃO (EMISSOR SOLICITA RETENTATIVA)|REVERSÍVEL|4|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|REFAZER A TRANSAÇÃO|Sim|
|CONSULTAR CREDENCIADOR|REVERSÍVEL|6|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|LOJISTA, CONTATE O ADQUIRENTE|Sim|
|PROBLEMA NO ADQUIRENTE|IRREVERSÍVEL|19|19|30|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|ERRO NO CARTÃO – NÃO TENTE NOVAMENTE|Não|
|ERRO NO CARTÃO|IRREVERSÍVEL|12|6|SEM CÓDIGO CORRESPONDENTE|115|A2|VERIFIQUE OS DADOS DO CARTÃO|Não|
|ERRO DE FORMATO (MENSAGERIA)|IRREVERSÍVEL|30|12|30|181|A3|ERRO NO CARTÃO - NÃO TENTE NOVAMENTE|Não|
|VALOR DA TRANSAÇÃO INVÁLIDA|IRREVERSÍVEL|13|13|13|110|JB|VALOR DA TRANSAÇÃO NÃO PERMITIDO - NÃO TENTE NOVAMENTE|Não|
|VALOR DA PARCELA INVÁLIDA|IRREVERSÍVEL|23|SEM CÓDIGO CORRESPONDENTE|12|115|A2|PARCELAMENTO INVÁLIDO - NÃO TENTE NOVAMENTE|Não|
|EXCEDIDAS TENTATIVAS DE SENHA / COMPRAS|REVERSÍVEL|38|75|75|106|A4|EXCEDIDAS TENTATIVAS DE SENHA.CONTATE A CENTRAL DO SEU CARTÃO|Não|
|CARTÃO PERDIDO|IRREVERSÍVEL|41|41|41|200|FD|TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE|Não|
|CARTÃO ROUBADO|IRREVERSÍVEL|43|43|43|200|FD|TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE|Não|
|CARTÃO VENCIDO / DT EXPIRAÇÃO INVÁLIDA|IRREVERSÍVEL|54|54|54|101|BV|VERIFIQUE OS DADOS DO CARTÃO|Sim|
|TRANSAÇÃO NÃO PERMITIDA  CAPACIDADE DO TERMINAL|IRREVERSÍVEL|57|58|58|116|A5|TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE|Não|
|VALOR EXCESSO / SAQUE|REVERSÍVEL|61|61 ou N4|61|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|VALOR EXCEDIDO. CONTATE A CENTRAL DO SEU CARTÃO|Não|
|BLOQUEIO TEMPORÁRIO (EX: INADIMPLÊNCIA)|REVERSÍVEL|62|62|57|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO|Novo|
|CARTÃO DOMÉSTICO - TRANSAÇÃO INTERNACIONAL|IRREVERSÍVEL|62|SEM CÓDIGO CORRESPONDENTE|62|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CARTÃO NÃO PERMITE TRANSAÇÃO INTERNACIONAL|Somente na nossa Documentação|
|CARTÃO DOMÉSTICO - TRANSAÇÃO INTERNACIONAL|REVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|62|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CARTÃO NÃO PERMITE TRANSAÇÃO INTERNACIONAL|Somente na nossa Documentação|
|VALOR MÍNIMO DA TRANSAÇÃO INVÁLIDO|IRREVERSÍVEL|64|SEM CÓDIGO CORRESPONDENTE|13|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|VALOR DA TRANSAÇÃO NÃO PERMITIDO - NÃO TENTE NOVAMENTE|Sim|
|QUANT. DE SAQUES EXCEDIDO|REVERSÍVEL|65|65|65|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|QUANTIDADE DE SAQUES EXCEDIDA. CONTATE A CENTRAL DO SEU CARTÃO|Não|
|SENHA VENCIDA / ERRO DE CRIPTOGRAFIA DE SENHA|IRREVERSÍVEL|83|74 ou 81|88|180|A7|SENHA INVÁLIDA - NÃO TENTE NOVAMENTE|Sim|
|EXCEDIDAS TENTATIVAS DE SENHA | SAQUE|REVERSÍVEL|75|75|75|106|A4|EXCEDIDAS TENTATIVAS DE SENHA.CONTATE A CENTRAL DO SEU CARTÃO|Não|
|CONTA DESTINO INVÁLIDA OU INEXISTENTE|IRREVERSÍVEL|76|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTA DESTINO INVÁLIDA - NÃO TENTE NOVAMENTE|Não|
|CONTA ORIGEM INVÁLIDA OU INEXISTENTE|IRREVERSÍVEL|77|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTA ORIGEM INVÁLIDA - NÃO TENTE NOVAMENTE|Não|
|CARTÃO NOVO SEM DESBLOQUEIO|REVERSÍVEL|78|-|57|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|DESBLOQUEIE O CARTÃO|Sim|
|CARTÃO NOVO SEM DESBLOQUEIO|IRREVERSÍVEL|-|78|-|-|-|DESBLOQUEIE O CARTÃO|Novo|
|CARTÃO INVÁLIDO (criptograma)|IRREVERSÍVEL|82|82|88|180|A7|ERRO NO CARTÃO - NÃO TENTE NOVAMENTE|Não|
|EMISSOR FORA DO AR|REVERSÍVEL|91|91|91|912|A1|FALHA DE COMUNICAÇÃO - TENTE MAIS TARDE|Não|
|FALHA DO SISTEMA|REVERSÍVEL|96|96|96|911|AE|FALHA DE COMUNICAÇÃO - TENTE MAIS TARDE|Não|
|DIFERENÇA - PRÉ AUTORIZAÇÃO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|N8|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|VALOR DIFERENTE DA PRÉ AUTORIZAÇÃO - NÃO TENTE NOVAMENTE|Sim|
|FUNÇÃO INCORRETA (DÉBITO)|IRREVERSÍVEL|AB|52 ou 53|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|UTILIZE FUNÇÃO CRÉDITO|Não|
|FUNÇÃO INCORRETA (CRÉDITO)|IRREVERSÍVEL|AC|39|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|UTILIZE FUNÇÃO DÉBITO|Não|
|TROCA DE SENHA / DESBLOQUEIO|IRREVERSÍVEL|P5|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SENHA INVÁLIDA - NÃO TENTE NOVAMENTE|Não|
|NOVA SENHA NÃO ACEITA|REVERSÍVEL|P6|SEM CÓDIGO CORRESPONDENTE|55|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SENHA INVÁLIDA UTILIZE A NOVA SENHA|Sim|
|RECOLHER CARTÃO (NÃO HÁ FRAUDE)|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|4|4|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE|Sim|
|ERRO POR MUDANÇA DE CHAVE DINÂMICA|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|N7|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|ERRO NO CARTÃO - NÃO TENTE NOVAMENTE|Sim|
|FRAUDE CONFIRMADA|IRREVERSÍVEL|57|7|4|200|FD|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE|Não|
|EMISSOR Ñ LOCALIZADO - BIN INCORRETO (negativa do adquirente)|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|15|15|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|DADOS DO CARTÃO INVÁLIDO - NÃO TENTE NOVAMENTE|Não|
|NÃO CUMPRIMENTO PELAS LEIS DE ANTE LAVAGEM DE DINHEIRO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|64|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE|Não|
|REVERSÃO INVÁLIDA|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|76|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE|Não|
|NÃO LOCALIZADO PELO ROTEADOR|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|92|92|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE|Não|
|TRANSAÇÃO NEGADA POR INFRAÇÃO DE LEI|IRREVERSÍVEL|57|93|62|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE|Sim|
|VALOR DO TRACING DATA DUPLICADO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|94|94|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTENOVAMENTE|Não|
|SURCHARGE NÃO SUPORTADO|REVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|B1|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO|Não|
|SURCHARGE NÃO SUPORTADO PELA REDE DE DÉBITO|REVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|B2|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO|Não|
|FORÇAR STIP|REVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|N0|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO|Não|
|SAQUE NÃO DISPONÍVEL|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|N3|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SAQUE NÃO DISPONÍVEL - NÃO TENTE NOVAMENTE|Não|
|SUSPENSÃO DE PAGAMENTO RECORRENTE PARA UM SERVIÇO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|R0|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE|Não|
|SUSPENSÃO DE PAGAMENTO RECORRENTE PARA TODOS SERVIÇO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|R1|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE|Não|
|TRANSAÇÃO NÃO QUALIFICADA PARA VISA PIN|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|R2|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE|Não|
|SUSPENSÃO DE TODAS AS ORDENS DE AUTORIZAÇÃO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|R3|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE|Não|
|NÃO É POSSÍVEL LOCALIZAR O REGISTRO NO ARQUIVO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE|Sim|
|ARQUIVO NÃO DISPONÍVEL PARA ATUALIZAÇÃO|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE|Sim|
|CONTA ENCERRADA|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|46|62|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE|Novo|
|FALHA VALIDAÇÃO DE ID|IRREVERSÍVEL|SEM CÓDIGO CORRESPONDENTE|6P|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|FALHA NA VERIFICAÇÃO DO ID|Novo|
|UTILIZAR O CHIP|IRREVERSÍVEL|FM|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|SEM CÓDIGO CORRESPONDENTE|UTILIZE O CHIP|Novo|

### Outros códigos de retorno

| Código Resposta | Definição                                     | Significado                                                                 | Ação                                                              | Permite Retentativa |
|-----------------|-----------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------|
|0|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Não|
|2|Transação não autorizada. Transação referida.|Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|9|Transação cancelada parcialmente com sucesso.|Transação cancelada parcialmente com sucesso|Transação cancelada parcialmente com sucesso|Não|
|11|Transação autorizada com sucesso para cartão emitido no exterior|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Não|
|21|Cancelamento não efetuado. Transação não localizada.|Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|22|Parcelamento inválido. Número de parcelas inválidas.|Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|24|Quantidade de parcelas inválido.|Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|60|Transação não autorizada.|Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.|Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|67|Transação não autorizada. Cartão bloqueado para compras hoje.|Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.|Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|70|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|72|Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.|Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente. Se o erro persistir, entre em contato com a Cielo.|Cancelamento não efetuado. Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Não|
|79|TRANSAÇÃO MASTERCARD NÃO PERMITIDA PARA O CARTÃO|Transação não autorizada. Não é possível processar a transação devido a erro relacionado ao cartão do portador. Solicite ao portador que entre em contato com o banco emissor.|Entre em contato com o seu banco|Não|
|80|Transação não autorizada. Divergencia na data de transação/pagamento.|Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|82|TRANSAÇÃO MASTERCARD NÃO AUTORIZADA. LIGUE PARA O EMISSOR|Transação não autorizada devido a regras do emissor. Oriente o portador a entrar em contato com o banco emissor.|Entre em contato com o seu banco|Não|
|83|TRANSAÇÃO MASTERCARD SUSPEITA DE FRAUDE|Transação não autorizada. Suspeita de fraude pelo banco emissor.|Entre em contato com o seu banco|Não|
|85|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|89|Erro na transação.|Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.|Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|90|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|97|Valor não permitido para essa transação.|Transação não autorizada. Valor não permitido para essa transação.|Transação não autorizada. Valor não permitido para essa transação.|Não|
|98|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Apenas 4 vezes em 16 dias.|
|475|Timeout de Cancelamento|A aplicação não respondeu dentro do tempo esperado.|Realizar uma nova tentativa após alguns segundos. Persistindo, entrar em contato com o Suporte.|Não|
|999|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde. Pode ser erro no SITEF, favor verificar !|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|AA|Tempo Excedido|Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.|Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.|Apenas 4 vezes em 16 dias.|
|AF|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|AG|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|AH|Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.|Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.|Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.|Não|
|AI|Transação não autorizada. Autenticação não foi realizada.|Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)|Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.|Não|
|AJ|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label.|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação.|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual.|Não|
|AV|Transação não autorizada. Dados Inválidos|Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.|Falha na validação dos dados. Reveja os dados informados e tente novamente.|Apenas 4 vezes em 16 dias.|
|BD|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|BL|Transação não autorizada. Limite diário excedido.|Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.|Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|BM|Transação não autorizada. Cartão Inválido|Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.|Transação não autorizada. Cartão inválido. Refaça a transação confirmando os dados informados.|Não|
|BN|Transação não autorizada. Cartão ou conta bloqueado.|Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com seu banco emissor.|Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com seu banco emissor.|Não|
|BO|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.|Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.|Apenas 4 vezes em 16 dias.|
|BP|Transação não autorizada. Conta corrente inexistente.|Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.|Não|
|BP176|Transação não permitida.|Parceiro deve checar se o processo de integração foi concluído com sucesso.|Parceiro deve checar se o processo de integração foi concluído com sucesso.|—|
|BR|Transação não autorizada. Conta encerrada|A conta do portador está encerrada. Solicite ao portador que entre em contato com seu banco emissor.|A conta do portador está encerrada. Solicite ao portador que entre em contato com seu banco emissor.|Não|
|C1|Transação não permitida. Cartão não pode processar transações de débito.|Troque a modalidade de pagamento ou o cartão utilizado.|Troque a modalidade de pagamento ou o cartão utilizado.|Não|
|C2|Transação não permitida.|Dados incorretos. Favor rever os dados preenchidos na tela de pagamento.|Dados incorretos. Favor rever os dados preenchidos na tela de pagamento.|Não|
|C3|Transação não permitida.|Período inválido para este tipo de transação.|Período inválido para este tipo de transação.|Não|
|CF|Transação não autorizada.C79:J79 Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|CG|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DF|Transação não permitida. Falha no cartão ou cartão inválido.|Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco|Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco|Apenas 4 vezes em 16 dias.|
|DM|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|DQ|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DS|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|EB|Número de parcelas maior que o Permitido.|Transação não autorizada. Entre em contato com a Cielo e verifique se o cadastro possui parcelamento liberado.|Transação não autorizada. Entre em contato com a Cielo e verifique se o cadastro possui parcelamento liberado.|Sim|
|EE|Transação não permitida. Valor da parcela inferior ao mínimo permitido.|Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.|Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.|Não|
|EK|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|FC|Transação não autorizada. Ligue Emissor|Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|FE|Transação não autorizada. Divergencia na data de transação/pagamento.|Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|FF|Cancelamento OK|Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.|Transação de cancelamento autorizada com sucesso|Não|
|FG|Transação não autorizada. Ligue AmEx 08007285090.|Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.|Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090|Não|
|GA|Aguarde Contato|Transação não autorizada. Referida pelo Lynx Online de forma preventiva.|Transação não autorizada. lojista deve aguardar contato por parte da Cielo|Não|
|GF|Transação negada.|Transação não autorizada, verifique se o IP informado está liberado para processar a transação|Transação não permitida. Entre em contato com a Cielo.|Não|
|GD|Transação não permitida.|Transação não permitida. Entre em contato com a Cielo.|Transação não permitida. Entre em contato com a Cielo.|—|
|GT|Transação negada.|Ataque de força bruta.|Transação não permitida. Entre em contato com a Cielo.|Não|
|GK|Transação negada.|Bloqueio temporário por ataque de força bruta.|Transação não permitida. Entre em contato com a Cielo.|Não|
|HJ|Transação não permitida. Código da operação inválido.|Transação não permitida. Código da operação Coban inválido.|Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.|Não|
|IA|Transação não permitida. Indicador da operação inválido.|Transação não permitida. Indicador da operação Coban inválido.|Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.|Não|
|KA|Transação não permitida. Falha na validação dos dados.|Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.|Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|KB|Transação não permitida. Selecionado a opção incorrente.|Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.|Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|KE|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.|Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.|Não|
|NR|Transação não permitida.|Transação não permitida.|Transação não permitida. Retentar a transação após 30 dias|Retentar a transação após 30 dias.|
|RP|Transação não permitida.|Transação não permitida.|Transação não permitida. Retentar a transação após 72h|Retentar a transação após 72 horas.|
|SC|Transação não permitida.|Transação não permitida. Pagamento recorrente, serviço cancelado. Não retentar.|Transação não permitida. Pagamento recorrente, serviço cancelado. Não retentar.|Não.|
|U3|Transação não permitida. Falha na validação dos dados.|Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.|Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|6P|Transação não autorizada. Dados Inválidos|Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.|Falha na validação dos dados. Reveja os dados informados e tente novamente.|Apenas 4 vezes em 16 dias.|

## Status transacional

| Código | Status               | Meio de pagamento | Descrição                                                         |
|--------|----------------------|-------------------|-------------------------------------------------------------------|
| 0      | **NotFinished**      | Todos               | Aguardando atualização de status.                                 |
| 1      | **Authorized**       | Todos                | Pagamento apto a ser capturado ou definido como pago.             |
| 2      | **PaymentConfirmed** | Todos                | Pagamento confirmado e finalizado.                                |
| 3      | **Denied**           |Cartões de crédito e débito (transferência eletrônica) e e-wallets.| Pagamento negado por Autorizador.|
| 10     | **Voided**           | Todos, exceto boleto | Pagamento cancelado.                                              |
| 11     | **Refunded**         | Cartões de crédito e débito e e-wallets.| Pagamento cancelado após 23h59 do dia de autorização. |
| 12     | **Pending**          | Cartões de crédito e débito (transferência eletrônica), e-wallets e pix.| Aguardandoretorno da instituição financeira.|
| 13     | **Aborted**          | Todos                | Pagamento cancelado por falha no processamento ou por ação do Antifraude. |
| 20     | **Scheduled**        | Cartão de crédito e e-wallets.| Recorrência agendada.                                    |

## Erros de integração

> **Erros da API** - Esses códigos são respostas à **validação do conteúdo dos dados enviados no momento da requisição à API**. <br>
> Se um código de erro for exibido, a requisição contém erros (como tamanho, condições ou erros de cadastro etc.) que impedem a criação da transação<BR>

**Exemplo**

``` json
[
    {
        "Code": 126,
        "Message": "Credit Card Expiration Date is invalid"
    }
]
```

| Propriedade | Descrição                                                                                                                              |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `Code`      | Código de Erro da API. [Veja a lista de códigos](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-de-erros-da-api) |
| `Message`   | Descrição do erro. [Veja a lista de códigos](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-de-erros-da-api)     |

### Códigos de Erros da API

Códigos retornados em caso de erro, identificando o motivo do erro e suas respectivas mensagens.

| Código | Mensagem                                                                                                       | Descrição                                                                                     |
|--------|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| 0      | Internal error                                                                                                 | Dado enviado excede o tamanho do campo                                                        |
| 100    | RequestId is required                                                                                          | Campo enviado está vazio ou inválido                                                          |
| 101    | MerchantId is required                                                                                         | Campo enviado está vazio ou inválido                                                          |
| 102    | Payment Type is required                                                                                       | Campo enviado está vazio ou inválido                                                          |
| 103    | Payment Type can only contain letters                                                                          | Caracteres especiais não permitidos                                                           |
| 104    | Customer Identity is required                                                                                  | Campo enviado está vazio ou inválido                                                          |
| 105    | Customer Name is required                                                                                      | Campo enviado está vazio ou inválido                                                          |
| 106    | Transaction ID is required                                                                                     | Campo enviado está vazio ou inválido                                                          |
| 107    | OrderId is invalid or does not exists                                                                          | Campo enviado excede o tamanho ou contem caracteres especiais                                 |
| 108    | Amount must be greater or equal to zero                                                                        | Valor da transação deve ser maior que "0"                                                     |
| 109    | Payment Currency is required                                                                                   | Campo enviado está vazio ou inválido                                                          |
| 110    | Invalid Payment Currency                                                                                       | Campo enviado está vazio ou inválido                                                          |
| 111    | Payment Country is required                                                                                    | Campo enviado está vazio ou inválido                                                          |
| 112    | Invalid Payment Country                                                                                        | Campo enviado está vazio ou inválido                                                          |
| 113    | Invalid Payment Code                                                                                           | Campo enviado está vazio ou inválido                                                          |
| 114    | The provided MerchantId is not in correct format                                                               | O MerchantId enviado não é um GUID                                                            |
| 115    | The provided MerchantId was not found                                                                          | O MerchantID não existe ou pertence a outro ambiente (EX: Sandbox)                            |
| 116    | The provided MerchantId is blocked                                                                             | Loja bloqueada, entre em contato com o suporte Cielo                                          |
| 117    | Credit Card Holder is required                                                                                 | Campo enviado está vazio ou inválido                                                          |
| 118    | Credit Card Number is required                                                                                 | Campo enviado está vazio ou inválido                                                          |
| 119    | At least one Payment is required                                                                               | Nó "Payment" não enviado                                                                      |
| 120    | Request IP not allowed. Check your IP White List                                                               | IP bloqueado por questões de segurança                                                        |
| 121    | Customer is required                                                                                           | Nó "Customer" não enviado                                                                     |
| 122    | MerchantOrderId is required                                                                                    | Campo enviado está vazio ou inválido                                                          |
| 123    | Installments must be greater or equal to one                                                                   | Numero de parcelas deve ser superior a 1                                                      |
| 124    | Credit Card is Required                                                                                        | Campo enviado está vazio ou inválido                                                          |
| 125    | Credit Card Expiration Date is required                                                                        | Campo enviado está vazio ou inválido                                                          |
| 126    | Credit Card Expiration Date is invalid                                                                         | Campo enviado está vazio ou inválido                                                          |
| 127    | You must provide CreditCard Number                                                                             | Numero do cartão de crédito é obrigatório                                                     |
| 128    | Card Number length exceeded                                                                                    | Numero do cartão superiro a 16 digitos                                                        |
| 129    | Affiliation not found                                                                                          | Meio de pagamento não vinculado a loja ou Provider inválido                                   |
| 130    | Could not get Credit Card                                                                                      | ---                                                                                           |
| 131    | MerchantKey is required                                                                                        | Campo enviado está vazio ou inválido                                                          |
| 132    | MerchantKey is invalid                                                                                         | O Merchantkey enviado não é um válido                                                         |
| 133    | Provider is not supported for this Payment Type                                                                | Provider enviado não existe                                                                   |
| 134    | FingerPrint length exceeded                                                                                    | Dado enviado excede o tamanho do campo                                                        |
| 135    | MerchantDefinedFieldValue length exceeded                                                                      | Dado enviado excede o tamanho do campo                                                        |
| 136    | ItemDataName length exceeded                                                                                   | Dado enviado excede o tamanho do campo                                                        |
| 137    | ItemDataSKU length exceeded                                                                                    | Dado enviado excede o tamanho do campo                                                        |
| 138    | PassengerDataName length exceeded                                                                              | Dado enviado excede o tamanho do campo                                                        |
| 139    | PassengerDataStatus length exceeded                                                                            | Dado enviado excede o tamanho do campo                                                        |
| 140    | PassengerDataEmail length exceeded                                                                             | Dado enviado excede o tamanho do campo                                                        |
| 141    | PassengerDataPhone length exceeded                                                                             | Dado enviado excede o tamanho do campo                                                        |
| 142    | TravelDataRoute length exceeded                                                                                | Dado enviado excede o tamanho do campo                                                        |
| 143    | TravelDataJourneyType length exceeded                                                                          | Dado enviado excede o tamanho do campo                                                        |
| 144    | TravelLegDataDestination length exceeded                                                                       | Dado enviado excede o tamanho do campo                                                        |
| 145    | TravelLegDataOrigin length exceeded                                                                            | Dado enviado excede o tamanho do campo                                                        |
| 146    | SecurityCode length exceeded                                                                                   | Dado enviado excede o tamanho do campo                                                        |
| 147    | Address Street length exceeded                                                                                 | Dado enviado excede o tamanho do campo                                                        |
| 148    | Address Number length exceeded                                                                                 | Dado enviado excede o tamanho do campo                                                        |
| 149    | Address Complement length exceeded                                                                             | Dado enviado excede o tamanho do campo                                                        |
| 150    | Address ZipCode length exceeded                                                                                | Dado enviado excede o tamanho do campo                                                        |
| 151    | Address City length exceeded                                                                                   | Dado enviado excede o tamanho do campo                                                        |
| 152    | Address State length exceeded                                                                                  | Dado enviado excede o tamanho do campo                                                        |
| 153    | Address Country length exceeded                                                                                | Dado enviado excede o tamanho do campo                                                        |
| 154    | Address District length exceeded                                                                               | Dado enviado excede o tamanho do campo                                                        |
| 155    | Customer Name length exceeded                                                                                  | Dado enviado excede o tamanho do campo                                                        |
| 156    | Customer Identity length exceeded                                                                              | Dado enviado excede o tamanho do campo                                                        |
| 157    | Customer IdentityType length exceeded                                                                          | Dado enviado excede o tamanho do campo                                                        |
| 158    | Customer Email length exceeded                                                                                 | Dado enviado excede o tamanho do campo                                                        |
| 159    | ExtraData Name length exceeded                                                                                 | Dado enviado excede o tamanho do campo                                                        |
| 160    | ExtraData Value length exceeded                                                                                | Dado enviado excede o tamanho do campo                                                        |
| 161    | Boleto Instructions length exceeded                                                                            | Dado enviado excede o tamanho do campo                                                        |
| 162    | Boleto Demostrative length exceeded                                                                            | Dado enviado excede o tamanho do campo                                                        |
| 163    | Return Url is required                                                                                         | URL de retorno não é valida - Não é aceito paginação ou extenções (EX .PHP) na URL de retorno |
| 166    | AuthorizeNow is required                                                                                       | ---                                                                                           |
| 167    | Antifraud not configured                                                                                       | Antifraude não vinculado ao cadastro do lojista                                               |
| 168    | Recurrent Payment not found                                                                                    | Recorrência não encontrada                                                                    |
| 169    | Recurrent Payment is not active                                                                                | Recorrência não está ativa. Execução paralizada                                               |
| 170    | Cartão Protegido not configured                                                                                | Token não vinculado ao cadastro do lojista                                         |
| 171    | Affiliation data not sent                                                                                      | Falha no processamento do pedido - Entre em contato com o suporte Cielo                       |
| 172    | Credential Code is required                                                                                    | Falha na validação das credenciadas enviadas                                                  |
| 173    | Payment method is not enabled                                                                                  | Meio de pagamento não vinculado ao cadastro do lojista                                        |
| 174    | Card Number is required                                                                                        | Campo enviado está vazio ou inválido                                                          |
| 175    | EAN is required                                                                                                | Campo enviado está vazio ou inválido                                                          |
| 176    | Payment Currency is not supported                                                                              | Campo enviado está vazio ou inválido                                                          |
| 177    | Card Number is invalid                                                                                         | Campo enviado está vazio ou inválido                                                          |
| 178    | EAN is invalid                                                                                                 | Campo enviado está vazio ou inválido                                                          |
| 179    | The max number of installments allowed for recurring payment is 1                                              | Campo enviado está vazio ou inválido                                                          |
| 180    | The provided Card PaymentToken was not found                                                                   | Token não encontrado                                                      |
| 181    | The MerchantIdJustClick is not configured                                                                      | Token bloqueado                                                           |
| 182    | Brand is required                                                                                              | Bandeira do cartão não enviado                                                                |
| 183    | Invalid customer bithdate                                                                                      | Data de nascimento inválida ou futura                                                         |
| 184    | Request could not be empty                                                                                     | Falha no formado da requisição. Verifique o código enviado                                    |
| 185    | Brand is not supported by selected provider                                                                    | Bandeira não suportada pela API Cielo                                                         |
| 186    | The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments) | Meio de pagamento não suporta o comando enviado                                               |
| 187    | ExtraData Collection contains one or more duplicated names                                                     |                                                                                               |
| 188    | Avs with CPF invalid                                                                                           |                                                                                               |
| 189    | Avs with length of street exceeded                                                                             |                                                                                               |
| 190    | Avs with length of number exceeded                                                                             |                                                                                               |
| 191    | Avs with length of district exceeded                                                                           |                                                                                               |
| 192    | Avs with zip code invalid                                                                                      |                                                                                               |
| 193    | Split Amount must be greater than zero                                                                         |                                                                                               |
| 194    | Split Establishment is Required                                                                                | Campo enviado está vazio ou inválido                                                          |
| 195    | The PlataformId is required                                                                                    | Campo enviado está vazio ou inválido                                                          |
| 196    | DeliveryAddress is required                                                                                    | Campo enviado está vazio ou inválido                                                          |
| 197    | Street is required                                                                                             | Campo enviado está vazio ou inválido                                                          |
| 198    | Number is required                                                                                             | Campo enviado está vazio ou inválido                                                          |
| 199    | ZipCode is required                                                                                            | Campo enviado está vazio ou inválido                                                          |
| 200    | City is required                                                                                               | Campo enviado está vazio ou inválido                                                          |
| 201    | State is required                                                                                              | Campo enviado está vazio ou inválido                                                          |
| 202    | District is required                                                                                           | Campo enviado está vazio ou inválido                                                          |
| 203    | Cart item Name is required                                                                                     | Campo enviado está vazio ou inválido                                                          |
| 204    | Cart item Quantity is required                                                                                 | Campo enviado está vazio ou inválido                                                          |
| 205    | Cart item type is required                                                                                     | Campo enviado está vazio ou inválido                                                          |
| 206    | Cart item name length exceeded                                                                                 |                                                                                               |
| 207    | Cart item description length exceeded                                                                          |                                                                                               |
| 208    | Cart item sku length exceeded                                                                                  |                                                                                               |
| 209    | Shipping addressee sku length exceeded                                                                         |                                                                                               |
| 210    | Shipping data cannot be null                                                                                   |                                                                                               |
| 211    | WalletKey is invalid                                                                                           |                                                                                               |
| 212    | Merchant Wallet Configuration not found                                                                        |                                                                                               |
| 213    | Credit Card Number is invalid                                                                                  |                                                                                               |
| 214    | Credit Card Holder Must Have Only Letters                                                                      |                                                                                               |
| 215    | Agency is required in Boleto Credential                                                                        |                                                                                               |
| 216    | Customer IP address is invalid                                                                                 |                                                                                               |
| 300    | MerchantId was not found                                                                                       |                                                                                               |
| 301    | Request IP is not allowed                                                                                      |                                                                                               |
| 302    | Sent MerchantOrderId is duplicated                                                                             |                                                                                               |
| 303    | Sent OrderId does not exist                                                                                    |                                                                                               |
| 304    | Customer Identity is required                                                                                  | Campo enviado está vazio ou inválido                                                          |
| 306    | Merchant is blocked                                                                                            | Merchant está bloqueado                                                                       |
| 307    | Transaction not found                                                                                          |                                                                                               |
| 308    | Transaction not available to capture                                                                           |                                                                                               |
| 309    | Transaction not available to void                                                                              |                                                                                               |
| 310    | Payment method doest not support this operation                                                                |                                                                                               |
| 311    | Refund is not enabled for this merchant                                                                        |                                                                                               |
| 312    | Transaction not available to refund                                                                            |                                                                                               |
| 313    | Recurrent Payment not found                                                                                    |                                                                                               |
| 314    | Invalid Integration                                                                                            |                                                                                               |
| 315    | Cannot change NextRecurrency with pending payment                                                              |                                                                                               |
| 316    | Cannot set NextRecurrency to past date                                                                         |                                                                                               |
| 317    | Invalid Recurrency Day                                                                                         |                                                                                               |                                                                                              |
| 318    | No transaction found                                                                                           |                                                                                               |
| 319    | Smart recurrency is not enabled                                                                                |                                                                                               |
| 320    | Can not Update Affiliation Because this Recurrency not Affiliation saved                                       |                                                                                               |
| 321    | Can not set EndDate to before next recurrency                                                                  |                                                                                               |
| 322    | Zero Dollar Auth is not enabled                                                                                |                                                                                               |
| 323    | Bin Query is not enabled                                                                                       |                                                                                               |

### Códigos de Motivo de Retorno

|Reason Code|Reason Message|
|---|---|
|0|Successful|
|1|AffiliationNotFound|
|2|IssuficientFunds|
|3|CouldNotGetCreditCard|
|4|ConnectionWithAcquirerFailed|
|5|InvalidTransactionType|
|6|InvalidPaymentPlan|
|7|Denied|
|8|Scheduled|
|9|Waiting|
|10|Authenticated|
|11|NotAuthenticated|
|12|ProblemsWithCreditCard|
|13|CardCanceled|
|14|BlockedCreditCard|
|15|CardExpired|
|16|AbortedByFraud|
|17|CouldNotAntifraud|
|18|TryAgain|
|19|InvalidAmount|
|20|ProblemsWithIssuer|
|21|InvalidCardNumber|
|22|TimeOut|
|23|CartaoProtegidoIsNotEnabled|
|24|PaymentMethodIsNotEnabled|
|98|InvalidRequest|
|99|InternalError|
