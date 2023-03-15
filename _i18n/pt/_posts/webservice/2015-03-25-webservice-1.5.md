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

- +55 4002-9700 – _Capitais e Regiões Metropolitanas_
- +55 0800-570-1700 – _Demais Localidades_
- +55 11 2860-1348 – _Internacionais_
  - Opção 1 – _Suporte técnico;_
  - Opção 2 – _Credenciamento eCommerce._
- Email: [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)

## Glossário

Para facilitar o entendimento, listamos abaixo um pequeno glossário com os principais termos relacionados ao eCommerce, ao mercado de cartões e adquirencia:

- **Autenticação**: processo para assegurar que o comprador é realmente aquele quem diz ser (portador legítimo), geralmente ocorre no banco emissor com uso de um token digital ou cartão com chaves de segurança.
- **Autorização**: processo para verificar se uma compra pode ou não ser realizada com um cartão. Nesse momento, são feitas diversas verificações com o cartão e com o portador (ex.: adimplência, bloqueios, etc.) É também neste momento que o limite do cartão é sensibilizado com o valor da transação.
- **Cancelamento**: processo para cancelar uma compra realizada com cartão.
- **Captura**: processo que confirma uma autorização que foi realizada previamente. Somente após a captura, é que o portador do cartão poderá visualizá-la em seu extrato ou fatura.
- **Chave de acesso**: é um código de segurança específico de cada loja, gerado pela Cielo, usada para realizar a autenticação e comunicação em todas as mensagens trocadas com a Cielo. Também conhecido como chave de produção e key data.
- **Comprador**: é o aquele que efetua compra na loja virtual.
- **Emissor (ou banco emissor)**: É a instituição financeira que emite o cartão de crédito, débito ou voucher.
- **Estabelecimento comercial ou EC**: Entidade que responde pela loja virtual.
- **Gateway de pagamentos**: Empresa responsável pelo integração técnica e processamento das transações.
- **Número de credenciamento**: é um número identificador que o lojista recebe após seu credenciamento junto à Cielo.
- **Portador**: é a pessoa que tem o porte do cartão no momento da venda.
- **SecureCode**: programa internacional da Mastercard para possibilitar a autenticação do comprador no momento de uma compra em ambiente eCommerce.
- **TID (Transaction Identifier)**: código composto por 20 caracteres que identificada unicamente uma transação Cielo eCommerce.
- **Transação**: é o pedido de compra do portador do cartão na Cielo.
- **VBV (Verified by Visa)**: Programa internacional da Visa que possibilita a autenticação do comprador no momento de uma compra em ambiente eCommerce.

<aside class="notice">Acesse http://www.mastercard.com.br/securecode para mais detalhes sobre o SecureCode.</aside>

<aside class="notice">Acesse http://www.verifiedbyvisa.com.br para mais detalhes sobre o VBV.</aside>

## Produtos e Bandeiras suportadas

A versão atual do Webservice Cielo possui suporte às seguintes bandeiras e produtos:

| Bandeira         | Crédito à vista | Crédito parcelado Loja | Débito | Voucher |
| ---------------- | --------------- | ---------------------- | ------ | ------- |
| Visa             | Sim             | Sim                    | Sim    | _Não_   |
| Master Card      | Sim             | Sim                    | Sim    | _Não_   |
| American Express | Sim             | Sim                    | _Não_  | _Não_   |
| Elo              | Sim             | Sim                    | _Não_  | _Não_   |
| Diners Club      | Sim             | Sim                    | _Não_  | _Não_   |
| Discover         | Sim             | _Não_                  | _Não_  | _Não_   |
| JCB              | Sim             | Sim                    | _Não_  | _Não_   |
| Aura             | Sim             | Sim                    | _Não_  | _Não_   |
| Hipercard        | Sim             | Sim                    | _Não_  | _Não_   |

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

- [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
- [Certificado Intermediária 1]({{ site.baseurl }}/attachment/intermediate1.crt)
- [Certificado Intermediária 2]({{ site.baseurl }}/attachment/intermediate2.crt)
- [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/ecommerce.cielo.com.br.cer.zip)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning">A Cielo não oferece suporte para a instalação do Certificado.</aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

#### 1o Passo:

Salvar os arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

- [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
- [Certificado Intermediária 1]({{ site.baseurl }}/attachment/intermediate1.crt)
- [Certificado Intermediária 2]({{ site.baseurl }}/attachment/intermediate2.crt)
- [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/servercertificate.cer)

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

- **Email:** [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br)
- **Capitais:** 4002-9700
- **Demais Cidades:** 0800 570 1700

Horário de atendimento: 24h por dia, 7 dias por semana.

# Visão Geral

Neste manual será apresentado uma visão geral do Cielo eCommerce e o mecanismo tecnológico no formato de integração Webservice (chamado nas versões anteriores de Buy Page Loja).

Para informações sobre a integração no formato do Checkout Cielo (chamado nas versões anteriores de Buy Page Cielo ou Solução Integrada) acesse: [https://www.cielo.com.br/eCommerce](https://www.cielo.com.br/eCommerce).

Para todo pedido de compra, a meta é efetivá-la em uma venda. Uma venda com cartão pode ser caracterizado em uma transação autorizada e capturada.

<aside class="warning">Uma transação autorizada somente gera o crédito para o lojista se ela for capturada (ou confirmada).</aside>

## Características da solução

A solução Webservice da plataforma Cielo eCommerce foi desenvolvida com tecnologia XML, que é padrão de mercado e independe da tecnologia utilizada por nossos clientes. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação, tais como: ASP, ASP. Net, Java, PHP, Ruby, Python, etc.

Entre outras características, os atributos que mais se destacam na plataforma Cielo eCommerce:

- **Ausência de aplicativos proprietários**: não é necessário instalar aplicativos no ambiente da loja virtual em nenhuma hipótese.
- **Simplicidade**: o protocolo utilizado é puramente o HTTPS, sem necessidade do uso de SOAP.
- **Facilidade de credenciamento**: o tratamento das credenciais do cliente (número de afiliação e chave de acesso) trafega na mensagem, em campos comuns do XML, sem necessidade de atributos especiais, como por exemplo, SOAP Header.
- **Segurança**: a troca de informações se dá sempre entre o Servidor da Loja e da Cielo, ou seja, sem o browser do comprador.
- **Multiplataforma**: a integração é realizada através de Web Service, em um único Endpoint.

## Considerações sobre a integração

- Todas as requisições a Web Service da Cielo devem conter o nó de autenticação do lojista, composto pelo número de credenciamento e chave de acesso.
- O cadastro da loja deve estar ativo junto à Cielo.
- Deve-se definir um timeout adequado nas requisições HTTP à Cielo; recomendamos 30 segundos.
- O certificado Root da entidade certificadora (CA) de nosso Web Service deve estar cadastrado na Truststore a ser utilizada. Como nossa certificadora é de ampla aceitação no mercado, é provável que ela já esteja registrada na Truststore do próprio sistema operacional.
- Disponibilizamos no kit de integração o arquivo eCommerce.xsd para facilitar a validação das restrições de formato, tamanho dos campos, tipos e domínios de dados.
- Em todas as mensagens a data/hora deverá seguir o formato: `aaaa-MM-ddTHH24:mm:ss`. Exemplo: 2011-12-21T11:32:45.
- Os valores monetários são sempre tratados como valores inteiros, sem representação das casas decimais, sendo que os dois últimos dígitos são considerados como os centavos. Exemplo: R$ 1.286,87 é representado como 128687; R$ 1,00 é representado como 100.

<aside class="notice">Veja a seção Certificado Digital para informações sobre os certificados Cielo</aside>

## Arquitetura

A integração é realizada através de serviços disponibilizados como Web Services. O modelo empregado é bastante simples: há uma única URL (endpoint) que recebe os POSTs via HTTPs e, dependendo do formato do XML enviado, uma determinada operação é realizada.

A chamada ao Web Service é resumida por:

- A mensagem em formato XML, definida de acordo com a funcionalidade.
- O destino (ambiente de teste ou de produção).
- O retorno em formato XML, que pode ser: `<transacao/>`, `<retorno-token>` ou `<erro/>`.

```xml
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

## Atualizações Mandatórias

### Facilitadores de Pagamento

Todos os clientes de E-Commerce que são **Facilitadores de Pagamento, por obrigatoriedade das bandeiras e do Banco Central** deverão enviar novos campos na **mensageria transacional**. A Cielo transmitirá as informações para as bandeiras por meio da mensageria transacional no momento da autorização.

Os novos campos estão contidos dentro da tag **&lt;subcredenciador&gt;**. Além dos campos deste novo nó, os facilitadores terão também de enviar obrigatoriamente a tag **&lt;soft-descriptor&gt;**. Segue abaixo exemplo do envio e da resposta.

#### Requisição

```xml
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>2000019700</numero>
        <chave>8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120</chave>
        <subcredenciador>
            <numero>12345678901</numero>
            <sub-ec>
                <numero>2000130733</numero>
                <mcc>5542</mcc>
                <endereco>Alameda Xingu, 512</endereco>
                <cidade>Barueri</cidade>
                <estado>SP</estado>
                <codigo-postal>06537085</codigo-postal>
                <telefone>11978962345</telefone>
                <documento>53976428000130</documento>
                <codigo-pais>076</codigo-pais>
            </sub-ec>
        </subcredenciador>
    </dados-ec>
    <dados-portador>
        <numero>5453010000066167</numero>
        <validade>202405</validade>
        <indicador>1</indicador>
        <codigo-seguranca>123</codigo-seguranca>
        <nome-portador>Jose Luis</nome-portador>
        <token/>
    </dados-portador>
    <dados-pedido>
        <numero>54583</numero>
        <valor>10000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>lojinha</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
</requisicao-transacao>

```

<aside class="warning"><b>Atenção: Os campos não devem ser enviados com espaçamento a esquerda. Sujeito a rejeição na liquidação das transações.</b></aside>

#### Resposta

<aside class="notice">Obs: No response do 1.5 não são retornados os dados de facilitador.</aside>

```xml
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1" xmlns=http://ecommerce.cbmp.com.br>
    <tid>10069930691VE920A57C</tid>
    <pan>LtEYby/oCSWVqxTgWTU8T3Lq642xUUiNI+Ue38kiQK0=</pan>
    <dados-pedido>
        <numero>178148599</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2011-12-07T11:43:37</data-hora>
        <descricao>[origem:10.50.54.156]</descricao>
        <idioma>PT</idioma>
        <criptomoeda>true</criptomoeda>
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
        <data-hora>2022-06-29T14:31:37.769-03:00</data-hora>
        <valor>1000</valor>
        <eci>7</eci>
    </autenticacao>
    <autorizacao>
        <codigo>4</codigo>
        <mensagem>Transacao autorizada</mensagem>
        <data-hora>2022-06-29T14:31:37.769-03:00</data-hora>
        <valor>1000</valor>
        <lr>00</lr>
        <arp>163940</arp>
        <nsu>687251</nsu>
    </autorizacao>
</transacao>
```

| Propriedade                  | Tipo         | Tamanho | Obrigatório                    | Descrição                                                                                                                                                      |
| ---------------------------- | ------------ | ------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subcredenciador.numero       | Numérico     | 11      | Obrigatório para facilitadores | Código do estabelecimento do Facilitador. "Facilitator ID” (Cadastro do facilitador com as bandeiras)                                                          |
| sub-ec.numero                | Numérico     | 15      | Obrigatório para facilitadores | Código do estabelecimento do sub Merchant. “Sub-Merchant ID” (Cadastro do subcredenciado com o facilitador)                                                    |
| sub-ec.mcc                   | Numérico     | 4       | Obrigatório para facilitadores | MCC do sub Merchant.                                                                                                                                           |
| sub-ec.endereco              | Alfanumérico | 22      | Obrigatório para facilitadores | Endereço do sub Merchant.                                                                                                                                      |
| sub-ec.cidade                | Alfanumérico | 13      | Obrigatório para facilitadores | Cidade do sub Merchant.                                                                                                                                        |
| sub-ec.estado                | Alfanumérico | 2       | Obrigatório para facilitadores | Estado do sub Merchant.                                                                                                                                        |
| sub-ec.codigo-postal         | Numérico     | 9       | Obrigatório para facilitadores | Código postal do sub Merchant.                                                                                                                                 |
| sub-ec.telefone              | Numérico     | 13      | Obrigatório para facilitadores | Número de telefone do sub Merchant.                                                                                                                            |
| sub-ec.documento             | Numérico     | 14      | Obrigatório para facilitadores | CNPJ ou CPF do sub Merchant.                                                                                                                                   |
| sub-ec.codigo-pais           | Numérico     | 3       | Obrigatório para facilitadores | Código país do sub Merchant com base no ISO 3166. <br>Ex: código ISO 3166 do Brasil é o 076. [Lista completa online](https://www.iso.org/obp/ui/#search/code/) |
| dados.pedido.soft-descriptor | Texto        | 13      | Obrigatório para facilitadores | Texto impresso na fatura bancaria comprador. Deve ser preenchido de acordo com os dados do sub Merchant.                                                       |

### Transações CBPS

Entidades que operam como CBPS (em português, Serviço de Pagamento de Contas para Consumidores) são empresas que oferecem serviços consolidados de pagamento de
contas ao portador de cartão. A Marcação de CBPS é uma opção específica para a bandeira Visa e fornece mais visibilidade e precisão nas transações.

Os estabelecimentos que operam com esse serviço devem ser registrados junto a Visa e para operar como tal, devem enviar algumas informações adicionais através da
mensageria, que são exigidas pela bandeira. Veja abaixo:

#### Requisição

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>2000019700</numero>
        <chave>8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120</chave>
        <mcc-dinamico>4900</mcc-dinamico>
    </dados-ec>
    <dados-portador>
        <numero>4084359300407900</numero>
        <validade>202405</validade>
        <indicador>1</indicador>
        <codigo-seguranca>123</codigo-seguranca>
        <nome-portador>Teste Cashin</nome-portador>
        <token/>
    </dados-portador>
    <dados-pedido>
        <numero>12345</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2021-11-26T10:00:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>CART*LOJA</soft-descriptor>
<pagamento-conta>true</pagamento-conta>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>Visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
</requisicao-transacao>

```

| Propriedade                  | Tipo         | Tamanho | Obrigatório                                                        | Descrição                                                                                                   |
| ---------------------------- | ------------ | ------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| subcredenciador.numero       | Numérico     | 11      | Obrigatório para facilitadores                                     | Código do estabelecimento do Facilitador. "Facilitator ID” (Cadastro do facilitador com as bandeiras)       |
| sub-ec.numero                | Numérico     | 15      | Obrigatório para facilitadores                                     | Código do estabelecimento do sub Merchant. “Sub-Merchant ID” (Cadastro do subcredenciado com o facilitador) |
| sub-ec.mcc                   | Numérico     | 4       | Obrigatório para facilitadores                                     | MCC do sub Merchant.                                                                                        |
| sub-ec.endereco              | Alfanumérico | 22      | Obrigatório para facilitadores                                     | Endereço do sub Merchant.                                                                                   |
| sub-ec.cidade                | Alfanumérico | 13      | Obrigatório para facilitadores                                     | Cidade do sub Merchant.                                                                                     |
| sub-ec.estado                | Alfanumérico | 2       | Obrigatório para facilitadores                                     | Estado do sub Merchant.                                                                                     |
| sub-ec.codigo-postal         | Numérico     | 9       | Obrigatório para facilitadores                                     | Código postal do sub Merchant.                                                                              |
| sub-ec.telefone              | Numérico     | 13      | Obrigatório para facilitadores                                     | Número de telefone do sub Merchant.                                                                         |
| sub-ec.documento             | Numérico     | 14      | Obrigatório para facilitadores                                     | CNPJ ou CPF do sub Merchant.                                                                                |
| sub-ec.codigo-pais           | Numérico     | 3       | Obrigatório para facilitadores                                     | Código país do sub Merchant com base no ISO 3166.                                                           |
| dados.pedido.soft-descriptor | Texto        | 13      | Obrigatório para facilitadores                                     | Texto impresso na fatura bancaria comprador. Deve ser preenchido de acordo com os dados do sub Merchant.    |
| dados.pedido.pagamento-conta | Boolean      | ---     | Sim, para um estabelecimento cadastrado como CBPS junto a bandeira | True ou false. Indica se é uma transação CBPS (Serviço de Pagamento de Contas para Consumidores)            |
| dados.ec.mcc-dinamico        | Numérico     | 4       | Sim, para um estabelecimento cadastrado como CBPS junto a bandeira | MCC do estabelecimento (EC) permitido para transações de CBPS                                               |

MCC’s permitidos para CBPS:

|4814 (Serviços de Telecomunicação)
|4899 (TV à cabo, Satélite e outros Serviços de Televisão/Rádio)
|4900 (Serviços Públicos – Eletricidade, Gás, Água, Esgoto)
|6012 Instituições Financeiras - Mercadorias, Serviços e Reembolso de Dívidas
|6051 - CASAS CAMB/TRAVELEE ( Instituições Não Financeiras - Moeda Estrangeira, Moeda Não-Fiduciária (por exemplo: Criptomoeda)
|6300 (Vendas de Seguros, Subscrição e Prêmios)
|6513 (Agentes e Gerentes de Imóveis – Aluguéis)
|8011 Médicos (não classificados em outro lugar)
|8050 (Instalações de Cuidados Pessoais ou de Enfermagem)
|8062 Hospitais
|8099 Serviços Médicos e Profissionais de Saúde (Não Classificados em Outros Lugares)
|8211 (Escolas de 1º e 2º Graus)
|8220 (Faculdades, Universidades, Escolas Profissionais e Faculdades de Curta Duração)
|8241 (Escolas por Correspondência)
|8244 (Escolas de Negócios e Secretariado)
|8249 (Ensino Profissionalizante/Formação Profissional)
|8299 (Serviços Escolares e Educacionais [Não Classificados em Nenhum Outro Lugar])
|8351 (Serviços de Creche)
|9311 (Pagamento de Impostos)

### Quasi cash

Transações Quasi Cash são aquelas transações referentes a compras de fichas para jogos online, compras de bilhete de lotéricas ou relacionados. Apenas alguns MCCs (Códigos de categoria de atuação) que podem processar transações desse modelo. Consulte o time Cielo para entender se o seu negócio entra nesse modelo.

Todos os clientes de E-commerce que transacionarem **quasi cash**, devem usar a requisição de uma transação de débito e/ou crédito (dependendo do tipo de pagamento escolhido) e encaminhar adicionalmente a tag quase-cash conforme exemplo a seguir:

#### Requisição

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>2000019700</numero>
        <chave>8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120</chave>
    </dados-ec>
    <dados-portador>
        <numero>4084359300407900</numero>
        <validade>202405</validade>
        <indicador>1</indicador>
        <codigo-seguranca>123</codigo-seguranca>
        <nome-portador>TESTE</nome-portador>
        <token/>
    </dados-portador>
    <dados-pedido>
        <numero>79346</numero>
        <valor>35000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>soft teste</soft-descriptor>
        <quasi-cash>true</quasi-cash>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>false</capturar>
    <gerar-token>false</gerar-token>
   </requisicao-transacao>

```

| Propriedade             | Tipo    | Tamanho | Obrigatório                                                    | Descrição                                                    |
| ----------------------- | ------- | ------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| Dados-pedido.quasi-cash | Boolean | -       | Sim, pra estabelecimentos que operam com transações Quasi-cash | True ou false. Se true, Indica se é uma transação quasi-cash |

### Transações SDWO

Se categoriza como uma SDWO (Staged Digital Wallet Operators) uma empresa que oferece serviços de carteira digital/wallet, ou seja, que permite que o portador pague a aquisição de um produto ou serviço por meio de sua própria plataforma, seja com cadastro de cartões de crédito ou debito, ou geração de QR code.

Para transacionar como SDWO, o estabelecimento precisa se registrar junto as bandeiras. Para isso, procure seu gestor comercial Cielo para mais informações.

No caso de transações de ecommerce de uma SDWO com cartão de crédito ou débito (não originadas por um QR Code), é necessário que a carteira mande alguns dados adicionais na transação, para que as bandeiras possam identificar e diferenciar esse tipo de transação. Veja abaixo as especificações:

> Além dos campos específicos dessa modalidade, para transações SDWO também é obrigatório o envio do Soft Descriptor (campo `dados-pedido.soft-descriptor`) e CPF/CNPJ do portador (campo `dados-portador.cnpj-cpf-portador`). Confira mais detalhes desses campos na tabela de propriedades da requisição.

Para efetuar testes, é necessário apenas seguir as orientações do menu [Testes e Homologação](https://developercielo.github.io/manual/webservice-1-5#testes-e-homologa%C3%A7%C3%A3o)

Para enviar o MCC do varejista na transação de SDWO, a orientação do mercado é utilizar a tabela da ABECS (Associação Brasileira das Empresas de cartões de crédito e Serviços) que realiza o de-para de CNAEs para os MCCS de toda a indústria. Essa tabela é atualizada constantemente e está disponível online no site da Abecs no seguinte link:[ABECS](https://www.abecs.org.br/consulta-mcc-individual)

**Importante:** A marcação de SDWO é apenas aceita para as seguintes modalidades e bandeiras: Visa/Elo- crédito e débito; Mastercard - apenas crédito. Aceita cartões estrangeiros.

#### Requisição

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>xxxxxxxxxx</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxx</chave>
        <mcc-dinamico>xxxx</mcc-dinamico>
    </dados-ec>
    <dados-portador>
        <numero>xxxxxxxxxxxxxx</numero>
        <validade>******</validade>
        <indicador>1</indicador>
        <codigo-seguranca>***</codigo-seguranca>
        <nome-portador>NOME DO PORTADOR</nome-portador>
        <cnpj-cpf-portador>12345678901</cnpj-cpf-portador>
        <token/>
        <carteira>
           <tipo>MASTERPASS</tipo>
        </carteira>
    </dados-portador>
    <dados-pedido>
        <numero>xxxxx</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2021-11-26T10:00:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>CART*LOJAABCDE</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
</requisicao-transacao>
```

| Propriedade                        | Tipo     | Tamanho | Obrigatório                  | Descrição                                                                                                                                                      |
| ---------------------------------- | -------- | ------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Dados-ec.mcc-dinamico`            | Numérico | 4       | Sim, para transações de SDWO | MCC do varejista subjacente (pra transações de compra)                                                                                                         |
| `Carteira.tipo`                    | Texto    | 3       | Sim, para transações de SDWO | Sigla da carteira que está cadastrada aqui na Cielo como carteira digital (verificar sua sigla com seu gestor comercial)                                       |
| `dados-portador.cnpj-cpf-portador` | Numérico | 14      | Sim, para transações de SDWO | Número do CPF ou CNPJ do cliente.                                                                                                                              |
| `Dados-pedido.soft-descriptor`     | Texto    | 13      | Sim, para transações de SDWO | Texto que será impresso na fatura bancária do portador.<br>Não permite caracteres especiais.<br>Necessário preencher com **Nome da carteira\*nome do lojista** |

### Transações Cash In

Uma transação do tipo Cash In é uma operação de adição de créditos em uma carteira digital. Os estabelecimentos que operam com esse tipo de transação devem ser registrados como carteira digital junto as bandeiras e devem estar cadastrados com um dos seguintes MCCs (Códigos de categoria do estabelecimento): 6540/6051 Master ou VISA, a bandeira ELO só opera com o MCC 6540.

A massa de dados para realizar os testes neste ambiente está disposta na tabela abaixo:

| Bandeira | Número do Cartão | Validade | Código de Segurança |
| -------- | ---------------- | -------- | ------------------- |
| Visa     | 4084359300407900 | 202405   | 123                 |
| Elo      | 5067269300407900 | 202405   | 123                 |
| Master   | 5496220000066160 | 202405   | 123                 |

| EC         | Chave                                                            | MCC       | Bandeiras Aceitas |
| ---------- | ---------------------------------------------------------------- | --------- | ----------------- |
| 2000019700 | 8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120 | 6051/6540 | Master e Visa     |
| 2000019853 | 8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120 | 6540      | Elo               |

Além disso, precisam enviar alguns dados adicionais na transação, para que as bandeiras possam identificar e diferenciar esse tipo de transação. Veja abaixo as especificações:

> Além dos campos específicos dessa modalidade, para transações Cash in também é obrigatório o envio do Soft Descriptor (`campo dados-pedido.soft-descriptor`) e CPF/CNPJ do portador (campo `dados-portador.cnpj-cpf-portador`). No caso de Cash In, o campo do soft descriptor precisa ser preenchido com **nome da carteira\*nome do portador**. Confira mais detalhes desses campos na tabela de propriedades da requisição.

**Importante:** A marcação de Cash In é apenas aceita para as seguintes modalidades e bandeiras: Visa/Mastercard só crédito; Elo débito e crédito. Não é aceita para cartão estrangeiro.

#### Requisição

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>xxxxxxxxxx</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxx</chave>
    </dados-ec>
    <dados-portador>
        <numero>xxxxxxxxxxxxxx</numero>
        <validade>******</validade>
        <indicador>1</indicador>
        <codigo-seguranca>***</codigo-seguranca>
        <nome-portador>NOME DO PORTADOR</nome-portador>
        <cnpj-cpf-portador>12345678901</cnpj-cpf-portador>
        <token/>
        <carteira>
           <tipo>MASTERPASS</tipo>
        </carteira>
    </dados-portador>
    <dados-pedido>
        <numero>xxxxx</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2021-11-26T10:00:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>CARTEIRA*NOMEPORTADOR</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
    <cash-in>true</cash-in>
</requisicao-transacao>
```

| Propriedade                        | Tipo     | Tamanho | Obrigatório                             | Descrição                                                                                                                                                        |
| ---------------------------------- | -------- | ------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Carteira.tipo`                    | Texto    | 3       | Sim, para transações de SDWO            | Sigla da carteira que está cadastrada aqui na Cielo como carteira digital (verificar sua sigla com seu gestor comercial)                                         |
| `Cash-in`                          | Boolean  | -       | Sim, pra transações Cash In de uma SDWO | True ou false. Se true, Indica se é uma transação de cash in da SDWO.                                                                                            |
| `dados-portador.cnpj-cpf-portador` | Numérico | 14      | Sim, para transações de Cash in         | Número do CPF ou CNPJ do Cliente.                                                                                                                                |
| `Dados-pedido.soft-descriptor`     | Texto    | 13      | Sim, para transações de Cash in         | Texto que será impresso na fatura bancária do portador.<br>Não permite caracteres especiais.<br>Necessário preencher com **Nome da carteira\*nome do portador**. |

# Criando transações

Todas as transações no Cielo eCommerce iniciam-se através de um POST (HTTPS) ao Web Service da Cielo com uma mensagem XML `<requisicao-transacao>`, cujo conjunto de TAGS determinam as configurações de uma transação.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4084359300407900</numero>
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
    <soft-descriptor/>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>3</autorizar>
  <capturar>false</capturar>
  <gerar-token>false</gerar-token>
</requisicao-transacao>


```

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

## raiz

| Elemento                            | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                                                                                                                                   |
| ----------------------------------- | ------------ | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dados-ec](#dados-ec)               | n/a          | Sim         | n/a     | Dados do estabelecimento comercial                                                                                                                                                                                          |
| [dados-portador](#dados-portador)   | n/a          | Sim         | n/a     | Dados do cartão                                                                                                                                                                                                             |
| [dados-pedido](#dados-pedido)       | n/a          | Sim         | n/a     | Dados do pedido                                                                                                                                                                                                             |
| [forma-pagamento](#forma-pagamento) | n/a          | Sim         | n/a     | Forma de pagamento                                                                                                                                                                                                          |
| url-retorno                         | Alfanumérico | Sim         | 1..1024 | URL da página de retorno. É para essa página que a Cielo vai direcionar o browser ao fim da autenticação ou da autorização. Não é obrigatório apenas para autorização direta, porém o campo dever ser inserido como `null`. |
| capturar                            | Boolean      | Sim         | n/a     | `true` ou `false`. Define se a transação será automaticamente capturada caso seja autorizada.                                                                                                                               |
| gerar-token                         | Boolean      | Opcional    | n/a     | `true` ou `false`. Define se a transação atual deve gerar um token associado ao cartão.                                                                                                                                     |

## dados-ec

| Elemento | Tipo         | Obrigatório | Tamanho | Descrição                                     |
| -------- | ------------ | ----------- | ------- | --------------------------------------------- |
| numero   | Numérico     | Sim         | 1..20   | Número de afiliação da loja com a Cielo.      |
| chave    | AlfaNumérico | Sim         | 1..100  | Chave de acesso da loja atribuída pela Cielo. |

## dados-portador

| Elemento         | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                                                                                                                   |
| ---------------- | ------------ | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numero           | Numérico     | Sim         | 19      | Número do cartão.                                                                                                                                                                                           |
| validade         | Numérico     | Sim         | 6       | Validade do cartão no formato aaaamm. Exemplo: 201212 (dez/2012).                                                                                                                                           |
| indicador        | Numérico     | Sim         | 1       | Indicador sobre o envio do Código de segurança: **0** – não informado, **1** – informado, **2** – ilegível, **9** – inexistente                                                                             |
| codigo-seguranca | Numérico     | Condicional | 3..4    | Obrigatório se o indicador for **1**                                                                                                                                                                        |
| nome-portador    | Alfanumérico | Opcional    | 0..50   | Nome como impresso no cartão                                                                                                                                                                                |
| token            | Alfanumérico | Condicional | 0..100  | Token que deve ser utilizado em substituição aos dados do cartão para uma autorização direta ou uma transação recorrente. Não é permitido o envio do token junto com os dados do cartão na mesma transação. |

## dados-pedido

| Elemento        | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                                                                                                             |
| --------------- | ------------ | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numero          | Alfanumérico | Sim         | 1..20   | Número do pedido da loja. **Recomenda-se que seja um valor único por pedido.**                                                                                                                        |
| valor           | Numérico     | Sim         | 1..12   | Valor a ser cobrado pelo pedido (já deve incluir valoresde frete, embrulho, custos extras, taxa de embarque, etc). Esse valor é o que será debitado do consumidor.                                    |
| moeda           | Numérico     | Sim         | 3       | Código numérico da moeda na norma ISO 4217. **Para o Real, o código é 986**.                                                                                                                          |
| data-hora       | Alfanumérico | Sim         | 19      | Data hora do pedido. **Formato**: `aaaa-MM-ddTHH24:mm:ss`                                                                                                                                             |
| descricao       | Alfanumérico | Opcional    | 0..1024 | Descrição do pedido                                                                                                                                                                                   |
| idioma          | Alfanumérico | Opcional    | 2       | Idioma do pedido: PT (português), EN (inglês) ou ES (espanhol). Com base nessa informação é definida a língua a ser utilizada nas telas da Cielo. **Caso não seja enviado, o sistema assumirá “PT”**. |
| soft-descriptor | Alfanumérico | Opcional    | 0..13   | Texto de até 13 caracteres que será exibido na fatura do portador, após o nome do Estabelecimento Comercial.                                                                                          |
| Criptomoeda     | Boolean      | Opcional    | N/A     | True ou false. Define se a transação atual foi em criptomoeda.                                                                                                                                        |

<aside class="notice">O cadastro do cliente está habilitado para transacionar apenas com a moeda REAL, caso necessite de mais informações, contate a central de relacionamento, seu gerente comercial ou o Suporte Web Cielo eCommerce.</aside>

## forma-pagamento

| Elemento | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                           |
| -------- | ------------ | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| bandeira | Alfanumérico | Sim         | n/a     | Nome da bandeira (minúsculo): “visa”, “mastercard”, “diners”, “discover”, “elo”, “amex”, “jcb”, “aura”, “hipercard” |
| produto  | Alfanumérico | Sim         | 1       | Código do produto: **1** – Crédito à Vista, **2** – Parcelado loja, **A** – Débito.                                 |
| parcelas | Numérico     | Sim         | 1..2    | Número de parcelas. **Para crédito à vista ou débito, utilizar 1.**                                                 |

<aside class="warning">Observação: O Valor mínimo da parcela é de R$ 1,00.</aside>

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

## Tipo de retorno

Há três tipos de retorno que podem ser gerados na resposta do Web Service:

1. `<transacao>`
2. `<retorno-token>`
3. `<erro>`

Para as operações relacionadas a uma transação (consultas, autorização, captura e cancelamento), a resposta, em caso de sucesso, é sempre um XML do tipo `<transacao>`. No caso de uma requisição exclusiva para criação de token, a resposta esperada é `<retorno-token>`.

O exemplo ao lado ilustra a forma mais reduzida de uma mensagem de retorno tipo `<transacao>`. Basicamente, ela é composta pelos dados do pedido e dados da configuração da transação.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao versao="1.6.2" id="af32f93c-5e9c-4f44-9478-ccc5aca9319e" xmlns="http://ecommerce.cbmp.com.br">
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
        <par>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</par>
    </autorizacao>
</transacao>
```

As informações mais importantes são:

- **TID**: é o elo entre o pedido de compra da loja virtual e a transação na Cielo.
- **URL de autenticação**: aponta à página que dá início à autenticação (quando solicitada).
- **Status**: é a informação base para a loja controlar a transação.

A tabela abaixo detalha as TAGS do XML básico de retorno, identificado pelo nó raiz `<transação>`:

| Elemento         | Tipo                                                      | Tamanho | Descrição                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tid              | Alfanumérico                                              | 1..40   | Identificador da transação                                                                                                                                                                                                                                                                                                                  |
| dados-pedido     | Idêntico ao nó enviado pela loja na criação da transação. |
| forma-pagamento  | Idêntico ao nó enviado pela loja na criação da transação. |
| status           | Numérico                                                  | 12      | Código de status da transação. Veja o apêndice para a lista de status                                                                                                                                                                                                                                                                       |
| url-autenticacao | Alfanumérico                                              | 1..256  | URL de redirecionamento à Cielo.                                                                                                                                                                                                                                                                                                            |
| par              | Numérico                                                  | 29      | O retorno do par só será feito para transações enviadas no xml versão 1.6.2. O PAR(payment account reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado. |

Por fim, há outro tipo de retorno que é empregado toda vez que uma requisição não pode ser executada, seja porque era inválida ou por ter ocorrido falha no seu processamento. Nesse cenário o nó raiz do XML de resposta é do tipo `<erro>`.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<erro xmlns="http://ecommerce.cbmp.com.br">
  <codigo>001</codigo>
  <mensagem><![CDATA[O XML informado nao e valido:- string value '' does not match pattern for type of valor element in DadosPedido in namespace http://ecommerce.cbmp. com.br: '<xml-fragment/>]]>
  </mensagem>
</erro>
```

Quando a transação é inválida, podemos classificar os erros em dois tipos:

- **Erros sintáticos**: ocorrem quando a mensagem XML não respeita as regras definidas no arquivo eCommerce.xsd. Por exemplo, uma letra em um campo numérico, ou a ausência de um valor obrigatório;
- **Erros semânticos**: ocorrem quando uma requisição solicita uma operação não suportada para determinada transação. Por exemplo, tentar capturar uma transação não autorizada, ou ainda, cancelar uma transação já cancelada.

<aside class="notice">As mensagens de erro sempre trazem informações adicionais que facilitam o troubleshooting. A tabela que consta no item “Anexos - 6.2. Catálogo de Erros” possui a lista completa com os códigos de erros e suas descrições que devem ser consideradas no desenvolvimento da integração. https://developercielo.github.io/manual/webservice-1-5#c%C3%B3digos-de-erros</aside>

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
1. acessar(url-atenticacao) – o browser do portador é redirecionado ao ambiente da Cielo. Assim que a página da Cielo é acessada, automaticamente ela já é direcionada para o banco emissor (3.1). Esse redirect é tão rápido que é praticamente imperceptível.
1. autenticar(token, cpf) – o portador estará no ambiente do banco e utilizará algum mecanismo provido pelo próprio emissor para realizar a autenticação da transação (geralmente token, cartão de bingo, cpf, assinatura eletrônica, etc).
1. resultadoAutenticacao() – o banco emissor redireciona o fluxo para a Cielo com o resultado da autenticação. A partir daí, o fluxo volta ao normal, conforme disposto no item “2.3 Arquitetura de integração”.
   1.processar() – o sistema da Cielo processa o retorno da autenticação e submete á autorização e, opcionalmente, à captura automática.
1. enviarRedirect(url-retorno) – o sistema da Cielo envia um redirect ao browser do cliente para o endereço especificado na URL de retorno, fornecida na primeira requisição (`<requisicao-transacao>`)
1. acessar(url-retorno) – o browser do portador acessar a URL no ambiente da loja, onde recomendamos que exista uma requisição de consulta via TID ao Web Service da Cielo.

### Observações

- Somente o primeiro redirecionamento (1.2: enviarRedirect()) é de responsabilidade da loja virtual.
- O comprador é redirecionado ao site do Banco Emissor somente se a autenticação estiver disponível. Caso contrário, a transação prosseguirá à autorização automaticamente (exceto se foi apenas solicitada autenticação).

<aside class="notice">Consulte os produtos e bandeiras suportadas no item 1.6 Produtos e Bandeiras suportadas.</aside>

Os pré-requisitos para que uma transação seja autenticada estão relacionados abaixo:

- Banco e Bandeira devem ser participantes do programa de autenticação;
- O BIN do cartão deve ser participante do programa de autenticação;
- A configuração da <requisicao-transacao>//<autorizar> deve ser 0, 1 ou 2.

Observando o diagrama da seção [Transação](#transação), é possível observar que todas as transações passarão pelo status “Autenticada” ou “Não autenticada”. Por consequência, todas receberão o nó `<autenticacao>` no XML de resposta ao lojista. Abaixo, o XML com o nó de autenticação:

```xml
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

| Elemento  | Tipo         | Tamanho | Descrição                                                                      |
| --------- | ------------ | ------- | ------------------------------------------------------------------------------ |
| codigo    | Numérico     | 1.2     | Código do processamento                                                        |
| mensagem  | Alfanumérico | 1..100  | Detalhe do processamento                                                       |
| data-hora | Alfanumérico | 19      | Data e hora do processamento                                                   |
| valor     | Numérico     | 1..12   | Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos. |
| eci       | Numérico     | 2       | Nível de segurança.                                                            |

O campo ECI (Eletronic Commerce Indicator) representa o quão segura é uma transação. Esse valor deve ser levado em consideração pelo lojista para decidir sobre a captura da transação.

<aside class="warning">O indicador ECI é muito importante, pois é ele que determina as regras de Chargeback.</aside>

> A transação autenticada passa por uma validação do emissor e da bandeira, em momento de autorização, podendo refletir na alteração do ECI (Eletronic Commerce Indicator), que é utilizado para determinar quem será o responsável em caso de chargeback nas modalidades fraude.

# Consulta BIN

O **Consulta Bin** é um serviço de **pesquisa de dados do cartão**, seja ele de crédito ou débito, que retorna ao estabelecimento informações que permitem validar os dados preenchidos na tela de pagamento. O serviço retorna os seguintes dados sobre o cartão:

- **Bandeira do cartão:** Nome da Bandeira
- **Tipo de cartão:** Crédito, Débito ou Múltiplo (Crédito e Débito)
- **Nacionalidade do cartão:** Estrangeiro ou Nacional
- **Cartão Corporativo:** Se o cartão é ou não é corporativo
- **Banco Emissor:** Código e Nome
- **Cartão pré-pago::** sim ou não

Essas informações permitem tomar ações no momento do pagamento para melhorar a conversão da loja.

<aside class="warning">O Consulta Bin deve ser habilitado pelo Suporte Cielo. Entre em contato com a equipe de Suporte e solicite a habilitação para sua loja.</aside>

## Integração

### Requisição

```xml

<?xml version="7.0" encoding="ISO-8859-1"?>
<requisicao-consulta-bin id="a387cb68-b33a-4113-b7c4-9b7dfde871ec" versao="2.2.0"
    xmlns="http://ecommerce.cbmp.com.br">
    <dados-ec>
        <numero>XXXXXXXXXX
        </numero>
        <chave>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</chave
    </dados-ec>
    <bin>506708</bin>
</requisicao-consulta-bin>
```

### Retorno

Exemplo XMl de retorno:

```xml

<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<retorno-consulta-bin id="a387cb68-b33a-4113-b7c4-9b7dfde871ec" versao="2.2.0" xmlns="http://ecommerce.cbmp.com.br">
<bin>506708</bin>
<resultado>
<id>8d4d7aaf898bd43d1057f9627ae81003</id>
<status>00</status>
<dados-bin>
    <bandeira>ELO</bandeira>
    <produto>Crédito</produto>
    <emissor>Informação não disponivel</emissor>
    <cartao-estrangeiro>Não</cartao-estrangeiro>
    <cartao-corporativo>Não</cartao-corporativo>
    <codigo-emissor>950</codigo-emissor>
    <pre-pago>Sim</pre-pago>

</dados-bin>
      </resultado>
</retorno-consulta-bin>

```

| Propriedade                    | Tipo     | tamanho | descrição                                                                            |
| ------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------ |
| `resultado.id`                 | Texto    | 30      | ID de identificação da requisição na Cielo                                           |
| `resultado.status`             | Texto    | 2       | Status da consulta (00-Sucesso; 01-bandeira não suportada; 02-produto não suportado) |
| `dados-bin.bandeira`           | Texto    | 20      | Nome da bandeira do cartão                                                           |
| `dados-bin.produto`            | Texto    | 20      | Tipo do produto do cartão, crédito débito ou múltiplo                                |
| `dados-bin.emissor`            | Texto    | 20      | Nome do banco que emitiu o cartão                                                    |
| `dados-bin.cartao-estrangeiro` | Boolean  | 3       | "Sim" ou "Não", indica se o cartão é estrangeiro                                     |
| `dados-bin.cartao-corporativo` | Boolean  | 3       | "Sim" ou "Não", indica se o cartão é corporativo                                     |
| `dados-bin.codigo-emissor`     | Numérico | 3       | Código do emissor que emitiu o cartão                                                |
| `dados-bin.pre-pago`           | Boolean  | 3       | "Sim" ou "Não", indica se o cartão é pré pago                                        |

# Catálogo de códigos de resposta

## Códigos de Autorização LR

A seguir estão os códigos de resposta que respondem por 99% dos retornos gerados no processo de autorização. Os demais códigos existentes não estão listados pois ocorrem raramente ou em casos específicos. Para estes casos deve-se assumir que eles não são passíveis de retentativa.

Caso tenha uma quantidade elevada de códigos de retorno que não está listado abaixo, entre em contato com o Suporte Web Cielo eCommerce.

<aside class="warning">As descrições abaixo são exclusivas para uso interno do estabelecimento comercial e não devem ser divulgadas para o portador do cartão.</aside>

<aside class="notice">Exceto os códigos AA, AC e GA, todos os outros são gerados pelos emissores/bandeiras.</aside>

## Programa de Retentativa das Bandeiras

**O que são retentativas?**

Quando uma pessoa tenta fazer uma compra com cartão na sua loja, a transação pode ser negada devido a uma série de fatores. As tentativas seguintes de concluir a transação usando o mesmo cartão é o que chamamos de retentativa.

**O que mudou?**

Cada bandeira de cartão define os valores que serão cobrados por retentativa. A quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira.

**E no e-commerce?**

As bandeiras de cartão definem regras diferentes para transações com cartão presente e não presente, como no caso das vendas feitas pela internet.

**Qual o impacto para a loja?**

Os e-commerces que não seguirem as regras serão penalizados com a cobrança de tarifas por transações excedidas, de acordo com o programa de cada bandeira.

Visando melhorar a experiência de compra, o mercado de meios de pagamento, em conjunto com a ABECS, promoveu a padronização nos códigos de respostas das transações recusadas feitas por cartão. As tentativas foram classificadas em dois tipos:

> - <p>&#10060; **Irreversível: nunca realizar retentativa**</p><br>
>   <br>
>   Significa, por exemplo, que o cartão está cancelado para uso, foi perdido ou roubado, há uma fraude confirmada ou a transação não é permitida para aquele produto, indicando que não há circunstâncias nas quais o emissor concederia uma aprovação. Qualquer tentativa de autorização que, após uma recusa **irreversível**, não tenha alterado nenhum campo da mensageria, não obterá sucesso.<br>
>   <br>
> - <p>&#9989; **Reversível: permitido realizar retentativa**</p><br>
>   <br>
>   Significa que o emissor pode aprovar a transação, mas não pode fazê-lo agora, possivelmente devido a um problema do sistema (inoperante) ou falta de limite, suspeita de fraude ou excesso de número de tentativas de digitação da senha. São decisões de recusas temporárias tomadas pelo emissor que podem mudar com o tempo.

As bandeiras Visa, Mastercard, Elo e Hipercard ajustaram suas regras para limitar a quantidade de tentativas de autorização para uma transação negada. Essas mudanças preveem a cobrança de tarifas para o excesso de tentativas. Confira a seguir as regras de cada bandeira.

### Mastercard

A bandeira Mastercard possui o programa Transaction Processing Excellence (TPE), que engloba duas categorias:

**1. Excessive Attempts**: monitora as retentativas de transações negadas nos ambientes de cartão presente e cartão não presente. Válido tanto para códigos de negadas reversíveis quanto irreversíveis.

**2. Merchant Advice Code Transaction Excellence (MAC)**: monitora as retentativas de transações negadas, nos ambientes de cartão não presente e que são irreversíveis. Haverá cobrança somente nos MACs 03 e 21.

#### 1. Excessive Attempts

São cobranças efetuadas quando o estabelecimento comercial excede as regras de retentativas de transações.

A bandeira também realiza o monitoramento para qualquer autorização de valor nominal, aprovada, com estorno subsequente para transações abaixo de 1 unidade de moeda inteira ou o equivalente a US$ 1.

O monitoramento é aplicado para as retentativas de transações de compras negadas e aprovadas, realizadas em ambiente de cartão presente e cartão não presente.

**Tabela Excessive Attempts**

| Categorias                            | Códigos                                                                                                                                         | Vigência                          | Tarifa Doméstica | Tarifa Internacional | Quando Ocorre            | Permitido Retentar         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------- | -------------------- | ------------------------ | -------------------------- |
| Cartão presente e cartão não presente | Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts" | Até 31/01/2023                    | R$ 2,00          | -                    | A partir 11ª retentativa | Permitido retentar em 24h. |
| Cartão presente e cartão não presente | Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts" | Nova regra a partir de 01/02/2023 | R$ 2,00          | -                    | A partir 8ª retentativa  | Permitido retentar em 24h. |

- Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, e mesmo número de estabelecimento;
- A Mastercard prorrogou a data de vigência para o dia **01/02/2023** referente as novas regras do programa **(Excessive Attempts)** antes prevista para início do dia 01/11/2022. Confira as mudanças:

1. O excesso considerado no programa ocorrerá a partir da oitava retentativa dentro do mês de apuração; os valores cobrados sofreram alteração.
2. E a Mastercard também está introduzindo um limite de 35 tentativas negadas no mesmo cartão e mesmo número de estabelecimento por período contínuo de 30 dias. Mesmo se a loja não ultrapassar o limite de sete retentativas no período de 24h, mas ultrapassar a quantidade do limite mensal, a cobrança será aplicada.

> Obs: A regra vigente do programa Excessive Attempts é válida até 31/01/2023 (tabela Excessive Attempts), permitindo apenas 10 tentativas de aprovar uma mesma transação (no mesmo cartão, e mesmo número de estabelecimento), e é permitido retentar após 24h.

#### 2. Merchant Advice Code Transaction Excellence (MAC)

São cobranças efetuadas quando o estabelecimento comercial realiza retentativa de envio de autorização para códigos de respostas irreversíveis com um mesmo cartão valido para cartão não presente.

Dentro desse programa de retentativas, há programas que se destinam especificamente ao cenário de **“Não tente esta transação novamente”**. Para esses casos, a Mastercard identifica as transações com os valores MAC 03 e MAC 21, por exemplo.

O programa MAC comporta alguns valores, porém **somente os MACs 03 e 21 possuem uma cobrança específica**. Os demais MACs não se enquadram nessa cobrança.

Os outros códigos MAC (01, 02, 04, 24, 25, 26, 27, 28, 29 e 30) não entram no programa de cobrança do MAC mas entram na cobrança do programa Excessive Attempts, caso exceda os limites.

Desde **14/10/2022** a Mastercard introduziu novos códigos MAC (24, 25, 26, 27, 28, 29 e 30) quando um emissor recusa uma transação com o código de resposta 51 (insuficiência de fundos) seguido de um dos MAC da tabela a seguir, para que o comerciante tome a melhor ação.

**Tabela com toda relação de MACs**

| MAC | Descrição                                                | Observação                                                                                                                                               |
| --- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Informações da nova conta disponíveis (ABU)              | Necessidade de realizar atualização dos dados da conta que está sendo utilizada na transação, usando o ABU, por exemplo.                                 |
| 02  | Não pode aprovar no momento, tente depois                | Tente novamente a transação após 72 horas ou tente a transação com um método de pagamento diferente.                                                     |
| 03  | Não é permitido retentar                                 | Busque outro meio de garantir o pagamento, evitando custos desnecessários de várias solicitações de autorização que continuarão a resultar em declínios. |
| 04  | Requisitos de token não atendidos para este token modelo | Há necessidade de revisar os requisitos de token, pois os requisitos não foram atendidos para este token modelo enviado na transação.                    |
| 21  | Plano cancelado                                          | Comprador realiza cancelamento de plano e mesmo após o cancelamento, estabelecimento continua enviando solicitação de autorização de compra.             |
| 24  | Tente novamente após 1 hora                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 25  | Tente novamente após 24 horas                            | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 26  | Tente novamente após 2 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 27  | Tente novamente após 4 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 28  | Tente novamente após 6 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 29  | Tente novamente após 8 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |
| 30  | Tente novamente após 10 dias                             | Válido somente para o código de resposta 51 (insuficiência de fundos)                                                                                    |

Além disso, alguns códigos de retorno deixarão de ser enviados:

- 04 (Cartão de Captura)
- 14 (Número de cartão inválido)
- 41 (Cartão Perdido)
- 43 (Cartão Roubado)
- 54 (Cartão Expirado)
- 57 (Transação Não Permitida)
- 62 (Cartão Restrito)
- 63 (Violação de Segurança)
  <br>
  <br>

**Categorização de retornos Mastercard**

A Mastercard poderá consolidar alguns códigos de respostas dos emissores, que muitas vezes não indicam ao comerciante se pode ou não retentar, em três códigos de uso exclusivo Mastercard:

- **79** (Ciclo de vida);
- **82** (Política);
- **83** (Fraude/ Segurança).
  <br>
  <br>

Os códigos originais serão substituídos pelo Merchant Advice Code (MAC), que acompanharão os códigos 79, 82 e 83 para determinar se a transação pode ou não ser retentada.

**Por exemplo:**

|                                     Quando                                     |                                      Então                                       |            E o código de resposta             |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :-------------------------------------------: |
| O emissor recusar a transação usando o código de resposta 54 (Cartão Expirado) | A Mastercard substituirá o código 54 para o código 79 (recusa por ciclo de vida) | Acompanha o devido Merchant Advice Code (MAC) |

**Programa de retentativas MAC 03 e MAC 21**

**Forma de apuração:**

- Serão consideradas as transações de cartão não presente;
- São consideradas como retentativas todas as transações de pagamento no mesmo cartão e mesmo número de estabelecimento;
- São contabilizadas as retentativas no programa MAC com os valores MAC 03 e MAC 21;
- Valido para qualquer código de resposta;
- O excesso contabilizado no programa ocorrerá a partir da 1ª retentativa dentro do mês de apuração;
- O contador é zerado após o período de 30 dias;
- As retentativas podem ser cobradas nos MACs 03/21 e no Excessive Attempts caso ultrapasse o limite de cada programa;
- Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de 01 de janeiro de 2023, como listado a seguir.
  <br>
  <br>

**Tabela de valores:**

| Número de retentativa    | Regra                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| A partir 1ª rententativa | R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª retentativa. |

### Visa

**O que é?**

Um programa instituído pela bandeira Visa que gera cobranças quando o estabelecimento comercial excede as regras de retentativas.

- Válido para transações com cartão presente e cartão não presente;
- **Códigos reversíveis:** são permitidas até 15 tentativas de aprovar uma mesma transação (mesmo cartão, mesmo estabelecimento e valor) no período de 30 dias. Após os 30 dias iniciais (a contar da primeira tentativa), qualquer retentativa será cobrada;
- **Códigos irreversíveis:** é permitido apenas UMA tentativa de aprovar uma mesma transação (mesmo cartão, mesmo estabelecimento), na segunda tentativa será cobrado;
- Após uma transação ser aprovada, o contador é zerado.
  <br>

> **Tarifas**: Ao ultrapassar os limites de tentativas estabelecidos pela bandeira, haverá uma cobrança de tarifa para cada transação excedente.<br> > <br>
>
> - **Doméstico**: USD 0,10 + 13,83% de imposto;
> - **Estrangeiro**: USD 0,25 + 13,83% de imposto
>   <br>
>   <br>

Regras de autorização já vigentes. A cobrança de tarifas é aplicada desde abril de 2021.

**A Visa agrupou os códigos de retorno em quatro categorias:**

- **Categoria 1: emissor nunca aprovará**

Para essa categoria, indica que o cartão foi cancelado ou nunca existiu ou que a negativa é resultado de uma restrição permanente ou condição de erro que impedirá uma aprovação futura.

- **Categoria 2: emissor não pode aprovar neste momento**

Indicam que a negativa é resultado de uma condição temporária tal como risco de crédito, controles de velocidade do emissor ou outras restrições do cartão que podem permitir uma retentativa da transação ser aprovada. Em alguns casos, a negativa requer uma ação do portador ou emissor para remover a restrição antes que uma aprovação possa ser obtida.

- **Categoria 3: qualidade de dados/revisar dados**

Quando um erro de dados é identificado pelo emissor essa transação é declinada como consequência. Os estabelecimentos devem revalidar dados de pagamentos antes de retentar. Estabelecimentos e Credenciadores devem monitorar estes códigos de negativas devido a exposição potencial a fraudes.

> **Atenção**: A categoria 3 tem, além dos limites considerados na categoria 2, um limite diferente que é cumulativo. Um estabelecimento pode realizar até 10.000 transações em um período de 30 dias (neste caso considerando apenas o número do estabelecimento e códigos de negadas). Se ultrapassar o limite, todas as transações recusadas por categoria 3 serão tarifadas.

- **Categoria 4: códigos de respostas genéricos**

A categoria 4 inclui todos os outros códigos de resposta de recusa, muitos dos quais fornecem pouco ou nenhum valor para Adquirentes/Comerciantes como parte de sua estratégia de nova tentativa. O uso do emissor deve permanecer mínimo.

A maioria das condições de recusa tem códigos de resposta descritivos nas Categorias 1, 2 e 3 para indicar o motivo da recusa. No entanto, pode haver circunstâncias em que não haja valor de código de resposta para uma condição de declínio específica. Emissores pode usar outros valores de códigos de resposta definidos nas Especificações Técnicas VisaNet; no entanto, o uso deve permanecer mínimo.

Os emissores devem usar códigos de resposta que reflitam com mais precisão o motivo das recusas. Categorias 1 (o emissor nunca aprovar), 2 (o emissor não pode aprovar neste momento) e 3 (qualidade dos dados) devem ser usados, e os emissores devem limitar o uso de Categoria 4 (Código de Resposta Genérico) para transações onde nenhum outro valor se aplica. A taxa do Código de Resposta Genérico é cobrada para garantir que não mais do que a porcentagem aprovada regionalmente do total de recusas do emissor sejam categorizadas como Categoria 4. Os emissores que excederem o limite definido regionalmente receberão a Taxa de Código de Resposta Genérica por base de transação para cada declínio em excesso do limite definido.

**Tabela com as regras e códigos de recusa:**

![VISA](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/retentativa_visa.png)

**Observação:** O código de resposta 14 aparece nas categorias 1 e 3 porém a contabilização é a seguinte:

- Na categoria 1 o EC é tarifado a partir da 2ª tentativa para o (mesmo estabelecimento e mesmo cartão) **não permitido retentar.**

- Na categoria 3 compõe o grupo de códigos para contabilização das 10.001 transações, após o EC atingir 10.000 retentativas com o este grupo de códigos, qualquer transação será contabilizada independente do cartão.

**Exemplo:** Tivemos 10.000 transações negadas em um EC com os códigos de categoria 3, se a transação 10.001 for no código 14 ou em qualquer código do grupo de categoria 3 ele será tarifado independente do cartão.

### Elo

**O que é?**

Trata-se de um programa instituído pela bandeira ELO que gera cobranças quando o estabelecimento comercial excede as regras de retentativas de transações com um mesmo cartão.

**Formas de Apuração**

- **Retentativas**: todas transações de pagamento no mesmo cartão, validade, valor e Merchant ID (MID) dentro de 30 dias;
- **Códigos contabilizados**: todos de negativas​;
- **Excesso**: a partir da 16ª retentativa no mês​\*;
- **Tarifa**: R$ 0,80 (oitenta centavos) por retentativa, a partir da 16ª;
- **Contabilização do excesso**: é baseada nos controles internos da Elo. 1º ao último dia corrido do mês.
  <br>
  <br>

<aside class="notice">Início de vigência: 1º de agosto de 2022.</aside>

**Relação de códigos de recusa Elo:**

Os códigos de respostas abaixo estão listados conforme manual de autorização da bandeira.

| CÓDIGOS | DESCRIÇÃO                                      | QUANDOO EMISSOR DEVE UTILIZAR O CÓDIGO DE RESPOSTA                                                                                                                                                                                                                                                                                                                                                                                                                                                           | RETENTATIVA  |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| 4       | REFAZER A TRANSAÇÃO                            | Esse código deve ser usado pelo Emissor para solicitar que o portador/EC realize novamente a transação caso ele (Emissor) detecte falha na captura das informações da transação ou caso seja necessário atualização da senha negando a 1ª transação                                                                                                                                                                                                                                                          | Reversível   |
| 5       | GENÉRICA                                       | A Bandeira poderá utilizar esse código para outras tratativas (genérica).                                                                                                                                                                                                                                                                                                                                                                                                                                    | Reversível   |
| 6       | CONSULTAR CREDENCIADOR                         | Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que não necessitem de mudanças na mensageria para que a transação siga o fluxo correto.                                                                                                                                                                                                                                                                                                                           | Reversível   |
| 12      | ERRO NO CARTÃO                                 | - Esse código deve ser usado pelo Emissor quando ele identificar falha na validação do CAVV de transações 3DS ou tokenizada.<br>- Esse código deve ser usado pelo Emissor quando identificar CÓDIGO DE SERVIÇO incorreto/inválido para cartões físicos.<br>- Esse código deve ser usado pelo Emissor para problemas identificados no TOKEN<br>- Este código deve ser utilizado para negar reversões e avisos de reversão onde a transação original não é localizada pelo Emissor.                            | Irreversível |
| 13      | VALOR DA TRANSAÇÃO INVÁLIDA                    | - Esse código deve ser usado pelo Emissor quando identificar que o valor da transação é inválido de acordo com os parâmetros do Emissor.                                                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 14      | NÚMERO DO CARTÃO INVÁLIDA                      | - Esse código deve ser utilizado pelo Emissor para Nº DO CARTÃO INVÁLIDO/INCORRETO.<br>- A Bandeira poderá utilizar esse código para outras tratativas.                                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| 19      | PROBLEMAS ADQUIRENTE                           | - Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que necessitem de mudanças na mensageria para que a transação siga o fluxo correto.                                                                                                                                                                                                                                                                                                                             | Irreversível |
| 23      | VALOR DA PARCELA INVÁLIDO                      | - Esse código deve ser utilizado pelo Emissor quando o VALOR DA PARCELA ESTÁ FORA DOS LIMITES estabelecidos por ele. Esse código deve ser utilizado quando o emissor não aceitar o produto Elo Parcelado Loja (produto 072) com o número de parceladas menor que 12.                                                                                                                                                                                                                                         | Irreversível |
| 30      | ERRO DE FORMATO DA MENSAGEM                    | - Esse código deve ser usado pelo Emissor quando ele identificar ERRO DE FORMATO NA MENSAGERIA (campo obrigatório, domínios, formatos, tamanho não presentes ou divergentes da especificação).                                                                                                                                                                                                                                                                                                               | Irreversível |
| 38      | COMPRA/EXCEDIDAS TENTATIVAS SENHA              | - Esse código deve ser utilizado pelo Emissor quando for EXCEDIDO O Nº DE TENTATIVAS PERMITIDAS DE DIGITAÇÃO DA SENHA (utilizado apenas para compras).                                                                                                                                                                                                                                                                                                                                                       | Reversível   |
| 41      | CARTÃO PERDIDO                                 | - Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "PERDA".                                                                                                                                                                                                                                                                                                                                                                                                       | Irreversível |
| 43      | CARTÃO ROUBADO                                 | - Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "ROUBO".                                                                                                                                                                                                                                                                                                                                                                                                       | Irreversível |
| 51      | LIMITE/SALDO INSUFICIENTE                      | - Esse código deve ser utilizado pelo Emissor para CARTÃO que está TEMPORARIAMENTE SEM SALDO OU LIMITE SUFICIENTE para realizar a transação.<br>- Saque/advance 2 sem trilha 2<br>- Compra com Troco não suportada.<br>- Verificação de endereço não suportada (somente quando o código de processo for "13" sem valor de compra). \* Verificação de conta de cartão não suportada (somente quando o código de processo for "18" sem valor de compra).                                                       | Reversível   |
| 54      | DATA DE VALIDADE DO CARTÃO                     | - Esse código deve ser utilizado pelo Emissor para CARTÃO FÍSICO ou TOKEN COM VALIDADE / EXPIRAÇÃO VENCIDA ou INVÁLIDA.                                                                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| 55      | SENHA INVÁLIDA / NÃO ENVIADA                   | - Esse código deve ser utilizado pelo Emissor quando a SENHA DIGITADA PELO CLIENTE NÃO CONFERE, ESTÁ INVÁLIDA/INCORRETA.<br>- Esse código deve ser utilizado pelo Emissor quando a SENHA NÃO FOR ENVIADA NA MENSAGERIA E A MESMA É EXIGIDA PARA APROVAÇÃO DA TRANSAÇÃO.                                                                                                                                                                                                                                      | Reversível   |
| 56      | SEM REGISTRO DO CARTÃO                         | <br>1. Nº do cartão não pertence ao Emissor<br>2. Nº do cartão não é válido                                                                                                                                                                                                                                                                                                                                                                                                                                  | Irreversível |
| 57      | TRANSAÇÃO NÃO PERMITIDA PARA ESSE CARTÃO       | - Esse código deve ser utilizado pelo Emissor quando o cartão estiver com BLOQUEIO DEFINITIVO, exceto bloqueio perda e roubo que já possuem códigos específicos (ex: falecimento, fraude confirmada, cancelamento definitivo a pedido do cliente, etc).<br>- Esse código deve ser utilizado para PRODUTOS E SERVIÇOS NÃO SUPORTADOS pelo emissor do cartão.<br>- Esse código pode ser usado para TOKEN INVÁLIDO / SUSPENSO / INATIVO.<br>- Esse código deve ser usado para negar o modo de entrada FALLBACK. | Irreversível |
| 58      | COMERCIANTE INVÁLIDO                           | - Esse código deve ser utilizado pelo Emissor quando o MCC do estabelecimento não estiver cadastrado para obtenção de token junto ao Emissor.                                                                                                                                                                                                                                                                                                                                                                | Irreversível |
| 59      | SUSPEITA DE FRAUDE                             | - Esse código deve ser utilizado pelo Emissor quando regras de prevenção SUSPEITAM DE FRAUDE, sendo necessário o contato do portador com o Emissor para liberação do cartão e realização de nova transação.<br>- Esse código deve ser utilizado pelo Emissor para negar transações por ausência do AVISO VIAGEM que deve ser realizado pelo portador do cartão antes de viagens ao exterior ou em alguns casos antes de realizar transações em sites internacionais.                                         | Reversível   |
| 61      | VALOR MÁXIMO SAQUE/COMPRAS EXCEDIDO            | - Esse código deve ser utilizado pelo Emissor quando o valor do saque/compras exceder o limite permitido por ele.                                                                                                                                                                                                                                                                                                                                                                                            | Reversível   |
| 62      | BLOQUEIO TEMPORÁRIO DE COBRANÇA                | - Esse código deve ser utilizado pelo Emissor para cartões com BLOQUEIO TEMPORÁRIO DE COBRANÇA.                                                                                                                                                                                                                                                                                                                                                                                                              | Reversível   |
| 63      | VIOLAÇÃO DE SEGURANÇA                          | - Esse código deve ser utilizado pelo Emissor quando o CÓDIGO DE SEGURANÇA DO CARTÃO (CVE2) estiver INCORRETO / INVÁLIDO ou MST inválido (token).                                                                                                                                                                                                                                                                                                                                                            | Irreversível |
| 64      | VALOR MÍNIMO DA TRANSAÇÃO - INVÁLIDO           | - Esse código deve ser utilizado pelo Emissor quando o VALOR DA TRANSAÇÃO ESTIVER ABAIXO DO MÍNIMO permitido pelo Emissor                                                                                                                                                                                                                                                                                                                                                                                    | Irreversível |
| 65      | QUANTIDADE DE SAQUES EXCEDIDOS                 | - Esse código deve ser utilizado pelo Emissor quando o limite de quantidade de saques estiver excedido                                                                                                                                                                                                                                                                                                                                                                                                       | Reversível   |
| 75      | SAQUE/ EXCEDIDAS TENTATIVAS SENHA              | - Esse código deve ser utilizado pelo Emissor quando for excedida a quantidade de tentativas de digitação de senha estipuladas pelo Emissor (utilizado apenas para SAQUES)                                                                                                                                                                                                                                                                                                                                   | Reversível   |
| 76      | CONTA DESTINO INVÁLIDA OU INEXISTENTE          | - Esse código deve ser utilizado pelo Emissor quando conta "PARA" (destino) no BIT 3 é inválida ou inexistente e exclusivamente para transações de Transferência de Fundos                                                                                                                                                                                                                                                                                                                                   | Irreversível |
| 77      | CONTA ORIGEM INVÁLIDA OU INEXISTENTE           | - Esse código deve ser utilizado pelo Emissor quando conta "DE" (origem) no BIT 3 é inválida ou inexistente e exclusivamente para transações de Transferência de Fundos.                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 78      | CARTÃO NOVO SEM DESBLOQUEIO / CARTÃO BLOQUEADO | - Esse código deve ser utilizado pelo Emissor quando o cartão novo ainda não foi desbloqueado (ativado) pelo portador junto ao Emissor ou quando o Portador, mediante autonomia, desejar bloquear temporariamente o cartão através do aplicativo do Emissor.                                                                                                                                                                                                                                                 | Reversível   |
| 82      | CARTÃO INVÁLIDO (dados internos)               | - Esse código deve ser utilizado pelo Emissor quando dados internos do cartão não conferem (ex: criptograma inválido, ATC inválido etc.)                                                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 83      | NÃO É POSSÍVEL VALIDAR A SENHA                 | - Esse código deve ser utilizado pelo Emissor e será utilizado pela Elo quando não for possível validar ou descriptografar a senha.                                                                                                                                                                                                                                                                                                                                                                          | Irreversível |
| 91      | EMISSOR FORA DO AR                             | - Esse código será utilizado pela Bandeira quando o Emissor está temporariamente indisponível para autorizar a transação ou não foi recebida a resposta do Emissor no tempo estabelecido.                                                                                                                                                                                                                                                                                                                    | Reversível   |
| 96      | FALHA DO SISTEMA                               | - Esse código será utilizado pela Bandeira ou pelo Emissor por problemas no processamento da transação.                                                                                                                                                                                                                                                                                                                                                                                                      | Reversível   |
| AB      | FUNÇÃO INCORRETA (DÉBITO)                      | - Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função DÉBITO, mas o cartão não possui essa função ativa.                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| AC      | FUNÇÃO INCORRETA (CRÉDITO)                     | - Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função CRÉDITO, mas o cartão não possui essa função ativa.                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| FM      | UTILIZAR O CHIP                                | - Esse código será utilizado pelo Emissor para informar ao estabelecimento que a transação contactless não terá sucesso e que o portador deve utilizar o chip (contato).                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| P5      | TROCA DE SENHA / FALHA NO DESBLOQUEIO          | - Esse código será utilizado pelo Emissor quando ocorreu falha na troca de senha ou falha no desbloqueio.                                                                                                                                                                                                                                                                                                                                                                                                    | Irreversível |
| P6      | NOVA SENHA NÃO ACEITA                          | - Esse código será utilizado pelo Emissor quando a nova senha que o cliente escolheu não atende os critérios mínimos estabelecidos pelo Emissor.                                                                                                                                                                                                                                                                                                                                                             | Reversível   |

### Hipercard

**O que é?**

Cobranças efetuadas quando um Estabelecimento Comercial excede as regras de retentativas de transações negadas com um mesmo cartão, mesma data ou período mensal, mesmo valor e mesmo número de Estabelecimento Comercial, conforme abaixo:

| Programa                                     | Cartão Presente                                                                                                                                   | Cartão não presente                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Excesso de Retentativa                       | R$ 1,85 por retentativa a partir da 9ª resposta negada – mesmo cartão e mesmo dia (regra 2)                                                       | R$ 1,85 por Retentativas a partir da 9ª resposta negada – mesmo cartão e mesmo mês de referência (regra 3)                                                  |
| Retentativa de transação **ASI** (Zero Auth) | R$ 0,15 por retentativa de transação ASI após negativa do emissor – mesmo cartão e mesmo dia (item 2)                                             | R$ 0,15 por retentativa de transação ASI após negativa do emissor – mesmo cartão e mesmo mês de referência (regra 3)                                        |
| Retentativa de transação irreversível        | 0,03% do valor da transação por retentativa<br>Mínimo R$ 0,15<br>Máximo R$ 0,80<br>Mesmo cartão e mesmo dia após resposta com código irreversível | 0,03% do valor da transação por retentativa<br>Mínimo R$ 0,15<br>Máximo R$ 0,80<br>Mesmo cartão e mesmo mês após resposta com código irreversível (regra 3) |

**Regras:**

1. **Transações ASI**: são transações Account Status Inquiry, ou seja, são as transações efetuadas para consultar o status de um cartão (verificar se está ativo). Para esse fim, não devem ser usadas transações financeiras e sim transações específicas;
2. **Tentativas por dia**: considerar para efeito do programa de Retentativas da Hipercard de 00h00 a 23h59;
3. **Mês de referência**: considerar para efeito do programa de Retentativas da Hipercard dia 01 a 30 ou 31 do mês em que ocorreu a transação. A cobrança será enviada após o fechamento do mês subsequente;
4. **Os códigos de transações** consideradas **irreversíveis pelo emissor** foram categorizados pela indústria de pagamentos e autorregulação da ABECS, por meio do Normativo 21 vigente. Veja os [Códigos de retorno (ABECS)](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-de-retorno-abecs){:target="\_blank"};
5. **Os códigos não citados no manual da ABECS são considerados como reversíveis**.

<aside class="notice">Início de vigência: 15 de setembro de 2022.</aside>

### Demais bandeiras

- **Códigos reversíveis:** serão permitidas novas retentativas para o mesmo cliente e cartão. Não há limite e período pré-estabelecido;

> **Importante**: antes de realizar uma nova tentativa, siga a orientação recebida na resposta da transação negada.

- **Códigos Irreversíveis:** não serão permitidas autorizações para o mesmo cartão ou estabelecimento, depois de receber 1ª resposta de recusa do emissor.

## Códigos de retorno ABECS

Para acessar o programa de retentativa das bandeira acesse esse [Link](https://developercielo.github.io/manual/webservice-1-5#programa-de-retentativa-das-bandeiras)

A Associação Brasileira das Empresas de Cartão de Crédito e Serviços (ABECS) estabelece a partir do dia 15 de Julho de 2020 a padronização do código de retorno das autorizações de vendas recusadas tanto para as soluções pagamento do mundo físico e e-commerce do mercado brasileiro.

Essa medida normativa busca trazer benefícios para todo o mercado de pagamentos, proporcionando maior transparência no entendimento do motivo de recusa das transações, além de possibilitar maior assertividade na adoção de estratégias de retentativas de vendas.

A Cielo informa seus clientes que está preparada para processar as transações seguindo esse novo padrão do mercado, segue abaixo a tabela de códigos padronizados pela ABECS.

<aside class="notice">Os códigos da bandeira AMEX sofreram um de/para de modo a manter dois dígitos. Reforçamos que essa medida não altera os motivos de retorno.</aside>

| Mensagem                                                       | Tipo de Código | ELO                       | VISA                      | MASTERCARD/HIPER          | AMEX                      | AMEX - De/Para Cielo      | Mensagem POS/Ecommerce                                               | Houve alteração da ABECS em 2022?                             |
| -------------------------------------------------------------- | -------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | --- |
| GENÉRICA                                                       | REVERSÍVEL     | 5                         | 5                         | 5                         | 100                       | FA                        | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| SALDO/LIMITE INSUFICIENTE                                      | REVERSÍVEL     | 51                        | 51                        | 51                        | 116                       | A5                        | NÃO AUTORIZADA                                                       | Não                                                           |
| SALDO/LIMITE INSUFICIENTE                                      | REVERSÍVEL     | 51                        | 51                        | 51                        | 121                       | A5                        | NÃO AUTORIZADA                                                       | Somente na nossa Documentação                                 |
| SENHA INVÁLIDA                                                 | REVERSÍVEL     | 55                        | 55 ou 86                  | 55                        | 117                       | A6                        | SENHA INVÁLIDA                                                       | Não                                                           |
| TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO                          | REVERSÍVEL     | -                         | 57                        | 57                        | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO                                | Sim                                                           |
| TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO                          | IREVERSÍVEL    | 57                        | -                         | -                         | -                         | -                         | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Novo                                                          |
| NÚMERO CARTÃO NÃO PERTENCE AO EMISSOR / NÚMERO CARTÃO INVÁLIDO | IRREVERSÍVEL   | 14 ou 56                  | 14                        | 14 ou 01                  | 122                       | 8                         | VERIFIQUE OS DADOS DO CARTÃO                                         | Sim                                                           |
| VIOLAÇÃO DE SEGURANÇA                                          | IRREVERSÍVEL   | 63                        | 63                        | -                         | 122                       | 8                         | VERIFIQUE OS DADOS DO CARTÃO                                         | Sim                                                           |
| VIOLAÇÃO DE SEGURANÇA                                          | REVERSÍVEL     | -                         | -                         | 63                        | -                         | -                         | VERIFIQUE OS DADOS DO CARTÃO                                         | Novo                                                          |
| SUSPEITA DE FRAUDE                                             | REVERSÍVEL     | 59                        | 59                        | 63                        | 100                       | FA                        | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| COMERCIANTE INVÁLIDO                                           | IRREVERSÍVEL   | 58                        | 3                         | 3                         | 109                       | DA                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Sim                                                           |
| REFAZER A TRANSAÇÃO (EMISSOR SOLICITA RETENTATIVA)             | REVERSÍVEL     | 4                         | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | REFAZER A TRANSAÇÃO                                                  | Sim                                                           |
| CONSULTAR CREDENCIADOR                                         | REVERSÍVEL     | 6                         | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | LOJISTA, CONTATE O ADQUIRENTE                                        | Sim                                                           |
| PROBLEMA NO ADQUIRENTE                                         | IRREVERSÍVEL   | 19                        | 19                        | 30                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | ERRO NO CARTÃO – NÃO TENTE NOVAMENTE                                 | Não                                                           |
| ERRO NO CARTÃO                                                 | IRREVERSÍVEL   | 12                        | 6                         | SEM CÓDIGO CORRESPONDENTE | 115                       | A2                        | VERIFIQUE OS DADOS DO CARTÃO                                         | Não                                                           |
| ERRO DE FORMATO (MENSAGERIA)                                   | IRREVERSÍVEL   | 30                        | 12                        | 30                        | 181                       | A3                        | ERRO NO CARTÃO - NÃO TENTE NOVAMENTE                                 | Não                                                           |
| VALOR DA TRANSAÇÃO INVÁLIDA                                    | IRREVERSÍVEL   | 13                        | 13                        | 13                        | 110                       | JB                        | VALOR DA TRANSAÇÃO NÃO PERMITIDO - NÃO TENTE NOVAMENTE               | Não                                                           |
| VALOR DA PARCELA INVÁLIDA                                      | IRREVERSÍVEL   | 23                        | SEM CÓDIGO CORRESPONDENTE | 12                        | 115                       | A2                        | PARCELAMENTO INVÁLIDO - NÃO TENTE NOVAMENTE                          | Não                                                           |
| EXCEDIDAS TENTATIVAS DE SENHA / COMPRAS                        | REVERSÍVEL     | 38                        | 75                        | 75                        | 106                       | A4                        | EXCEDIDAS TENTATIVAS DE SENHA.CONTATE A CENTRAL DO SEU CARTÃO        | Não                                                           |
| CARTÃO PERDIDO                                                 | IRREVERSÍVEL   | 41                        | 41                        | 41                        | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Não                                                           |
| CARTÃO ROUBADO                                                 | IRREVERSÍVEL   | 43                        | 43                        | 43                        | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Não                                                           |
| CARTÃO VENCIDO / DT EXPIRAÇÃO INVÁLIDA                         | IRREVERSÍVEL   | 54                        | 54                        | 54                        | 101                       | BV                        | VERIFIQUE OS DADOS DO CARTÃO                                         | Sim                                                           |
| TRANSAÇÃO NÃO PERMITIDA CAPACIDADE DO TERMINAL                 | IRREVERSÍVEL   | 57                        | 58                        | 58                        | 116                       | A5                        | TRANSAÇÃO NÃO PERMITIDA - NÃO TENTE NOVAMENTE                        | Não                                                           |
| VALOR EXCESSO / SAQUE                                          | REVERSÍVEL     | 61                        | 61 ou N4                  | 61                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | VALOR EXCEDIDO. CONTATE A CENTRAL DO SEU CARTÃO                      | Não                                                           |
| BLOQUEIO TEMPORÁRIO (EX: INADIMPLÊNCIA)                        | REVERSÍVEL     | 62                        | 62                        | 57                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Novo                                                          |
| CARTÃO DOMÉSTICO - TRANSAÇÃO INTERNACIONAL                     | IRREVERSÍVEL   | 62                        | SEM CÓDIGO CORRESPONDENTE | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CARTÃO NÃO PERMITE TRANSAÇÃO INTERNACIONAL                           | Somente na nossa Documentação                                 |
| CARTÃO DOMÉSTICO - TRANSAÇÃO INTERNACIONAL                     | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CARTÃO NÃO PERMITE TRANSAÇÃO INTERNACIONAL                           | Somente na nossa Documentação                                 |
| VALOR MÍNIMO DA TRANSAÇÃO INVÁLIDO                             | IRREVERSÍVEL   | 64                        | SEM CÓDIGO CORRESPONDENTE | 13                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | VALOR DA TRANSAÇÃO NÃO PERMITIDO - NÃO TENTE NOVAMENTE               | Sim                                                           |
| QUANT. DE SAQUES EXCEDIDO                                      | REVERSÍVEL     | 65                        | 65                        | 65                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | QUANTIDADE DE SAQUES EXCEDIDA. CONTATE A CENTRAL DO SEU CARTÃO       | Não                                                           |
| SENHA VENCIDA / ERRO DE CRIPTOGRAFIA DE SENHA                  | IRREVERSÍVEL   | 83                        | 74 ou 81                  | 88                        | 180                       | A7                        | SENHA INVÁLIDA - NÃO TENTE NOVAMENTE                                 | Sim                                                           |
| EXCEDIDAS TENTATIVAS DE SENHA                                  | SAQUE          | REVERSÍVEL                | 75                        | 75                        | 75                        | 106                       | A4                                                                   | EXCEDIDAS TENTATIVAS DE SENHA.CONTATE A CENTRAL DO SEU CARTÃO | Não |
| CONTA DESTINO INVÁLIDA OU INEXISTENTE                          | IRREVERSÍVEL   | 76                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTA DESTINO INVÁLIDA - NÃO TENTE NOVAMENTE                         | Não                                                           |
| CONTA ORIGEM INVÁLIDA OU INEXISTENTE                           | IRREVERSÍVEL   | 77                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTA ORIGEM INVÁLIDA - NÃO TENTE NOVAMENTE                          | Não                                                           |
| CARTÃO NOVO SEM DESBLOQUEIO                                    | REVERSÍVEL     | 78                        | -                         | 57                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | DESBLOQUEIE O CARTÃO                                                 | Sim                                                           |
| CARTÃO NOVO SEM DESBLOQUEIO                                    | IRREVERSÍVEL   | -                         | 78                        | -                         | -                         | -                         | DESBLOQUEIE O CARTÃO                                                 | Novo                                                          |
| CARTÃO INVÁLIDO (criptograma)                                  | IRREVERSÍVEL   | 82                        | 82                        | 88                        | 180                       | A7                        | ERRO NO CARTÃO - NÃO TENTE NOVAMENTE                                 | Não                                                           |
| EMISSOR FORA DO AR                                             | REVERSÍVEL     | 91                        | 91                        | 91                        | 912                       | A1                        | FALHA DE COMUNICAÇÃO - TENTE MAIS TARDE                              | Não                                                           |
| FALHA DO SISTEMA                                               | REVERSÍVEL     | 96                        | 96                        | 96                        | 911                       | AE                        | FALHA DE COMUNICAÇÃO - TENTE MAIS TARDE                              | Não                                                           |
| DIFERENÇA - PRÉ AUTORIZAÇÃO                                    | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | N8                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | VALOR DIFERENTE DA PRÉ AUTORIZAÇÃO - NÃO TENTE NOVAMENTE             | Sim                                                           |
| FUNÇÃO INCORRETA (DÉBITO)                                      | IRREVERSÍVEL   | AB                        | 52 ou 53                  | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | UTILIZE FUNÇÃO CRÉDITO                                               | Não                                                           |
| FUNÇÃO INCORRETA (CRÉDITO)                                     | IRREVERSÍVEL   | AC                        | 39                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | UTILIZE FUNÇÃO DÉBITO                                                | Não                                                           |
| TROCA DE SENHA / DESBLOQUEIO                                   | IRREVERSÍVEL   | P5                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SENHA INVÁLIDA - NÃO TENTE NOVAMENTE                                 | Não                                                           |
| NOVA SENHA NÃO ACEITA                                          | REVERSÍVEL     | P6                        | SEM CÓDIGO CORRESPONDENTE | 55                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SENHA INVÁLIDA UTILIZE A NOVA SENHA                                  | Sim                                                           |
| RECOLHER CARTÃO (NÃO HÁ FRAUDE)                                | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 4                         | 4                         | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Sim                                                           |
| ERRO POR MUDANÇA DE CHAVE DINÂMICA                             | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | N7                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | ERRO NO CARTÃO - NÃO TENTE NOVAMENTE                                 | Sim                                                           |
| FRAUDE CONFIRMADA                                              | IRREVERSÍVEL   | 57                        | 7                         | 4                         | 200                       | FD                        | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Não                                                           |
| EMISSOR Ñ LOCALIZADO - BIN INCORRETO (negativa do adquirente)  | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 15                        | 15                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | DADOS DO CARTÃO INVÁLIDO - NÃO TENTE NOVAMENTE                       | Não                                                           |
| NÃO CUMPRIMENTO PELAS LEIS DE ANTE LAVAGEM DE DINHEIRO         | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 64                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Não                                                           |
| REVERSÃO INVÁLIDA                                              | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 76                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Não                                                           |
| NÃO LOCALIZADO PELO ROTEADOR                                   | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 92                        | 92                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Não                                                           |
| TRANSAÇÃO NEGADA POR INFRAÇÃO DE LEI                           | IRREVERSÍVEL   | 57                        | 93                        | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Sim                                                           |
| VALOR DO TRACING DATA DUPLICADO                                | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 94                        | 94                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTENOVAMENTE                 | Não                                                           |
| SURCHARGE NÃO SUPORTADO                                        | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | B1                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| SURCHARGE NÃO SUPORTADO PELA REDE DE DÉBITO                    | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | B2                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| FORÇAR STIP                                                    | REVERSÍVEL     | SEM CÓDIGO CORRESPONDENTE | N0                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO                                      | Não                                                           |
| SAQUE NÃO DISPONÍVEL                                           | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | N3                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SAQUE NÃO DISPONÍVEL - NÃO TENTE NOVAMENTE                           | Não                                                           |
| SUSPENSÃO DE PAGAMENTO RECORRENTE PARA UM SERVIÇO              | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R0                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE | Não                                                           |
| SUSPENSÃO DE PAGAMENTO RECORRENTE PARA TODOS SERVIÇO           | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R1                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE | Não                                                           |
| TRANSAÇÃO NÃO QUALIFICADA PARA VISA PIN                        | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R2                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Não                                                           |
| SUSPENSÃO DE TODAS AS ORDENS DE AUTORIZAÇÃO                    | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | R3                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SUSPENSÃO DE PAGAMENTO RECORRENTE PARA SERVIÇO - NÃO TENTE NOVAMENTE | Não                                                           |
| NÃO É POSSÍVEL LOCALIZAR O REGISTRO NO ARQUIVO                 | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Sim                                                           |
| ARQUIVO NÃO DISPONÍVEL PARA ATUALIZAÇÃO                        | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | CONTATE A CENTRAL DO SEU CARTÃO - NÃO TENTE NOVAMENTE                | Sim                                                           |
| CONTA ENCERRADA                                                | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 46                        | 62                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | TRANSAÇÃO NÃO PERMITIDA PARA O CARTÃO - NÃO TENTE NOVAMENTE          | Novo                                                          |
| FALHA VALIDAÇÃO DE ID                                          | IRREVERSÍVEL   | SEM CÓDIGO CORRESPONDENTE | 6P                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | FALHA NA VERIFICAÇÃO DO ID                                           | Novo                                                          |
| UTILIZAR O CHIP                                                | IRREVERSÍVEL   | FM                        | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | SEM CÓDIGO CORRESPONDENTE | UTILIZE O CHIP                                                       | Novo                                                          |

## Outros códigos de retorno

| Código Resposta | Definição                                                                                                                                                     | Significado                                                                                                                                                                                                                                                                                            | Ação                                                                                                                                                                                                                      | Permite Retentativa                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 0               | Transação autorizada com sucesso.                                                                                                                             | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                      | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 2               | Transação não autorizada. Transação referida.                                                                                                                 | Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.                                                                                                                                                                                                                            | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| 9               | Transação cancelada parcialmente com sucesso.                                                                                                                 | Transação cancelada parcialmente com sucesso                                                                                                                                                                                                                                                           | Transação cancelada parcialmente com sucesso                                                                                                                                                                              | Não                                                  |
| 11              | Transação autorizada com sucesso para cartão emitido no exterior                                                                                              | Transação autorizada com sucesso.                                                                                                                                                                                                                                                                      | Transação autorizada com sucesso.                                                                                                                                                                                         | Não                                                  |
| 21              | Cancelamento não efetuado. Transação não localizada.                                                                                                          | Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                                                          | Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.                                                                                          | Não                                                  |
| 22              | Parcelamento inválido. Número de parcelas inválidas.                                                                                                          | Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                               | Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                                    | Não                                                  |
| 24              | Quantidade de parcelas inválido.                                                                                                                              | Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                            | Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.                                   | Não                                                  |
| 60              | Transação não autorizada.                                                                                                                                     | Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.                                                                                                                                                                                  | Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.                                                                                          | Apenas 4 vezes em 16 dias.                           |
| 67              | Transação não autorizada. Cartão bloqueado para compras hoje.                                                                                                 | Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.                                                                                                                 | Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.                                                                                                                       | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 70              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                   | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| 72              | Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.                                                                                   | Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente. Se o erro persistir, entre em contato com a Cielo.                                                                                                                                                                         | Cancelamento não efetuado. Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                                          | Não                                                  |
| 79              | TRANSAÇÃO MASTERCARD NÃO PERMITIDA PARA O CARTÃO                                                                                                              | Transação não autorizada. Não é possível processar a transação devido a erro relacionado ao cartão do portador. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                         | Entre em contato com o seu banco                                                                                                                                                                                          | Não                                                  |
| 80              | Transação não autorizada. Divergencia na data de transação/pagamento.                                                                                         | Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.                                                                                                                                                                                                                    | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| 82              | TRANSAÇÃO MASTERCARD NÃO AUTORIZADA. LIGUE PARA O EMISSOR                                                                                                     | Transação não autorizada devido a regras do emissor. Oriente o portador a entrar em contato com o banco emissor.                                                                                                                                                                                       | Entre em contato com o seu banco                                                                                                                                                                                          | Não                                                  |
| 83              | TRANSAÇÃO MASTERCARD SUSPEITA DE FRAUDE                                                                                                                       | Transação não autorizada. Suspeita de fraude pelo banco emissor.                                                                                                                                                                                                                                       | Entre em contato com o seu banco                                                                                                                                                                                          | Não                                                  |
| 85              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 89              | Erro na transação.                                                                                                                                            | Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.                                                                                                                                                            | Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.                                                                                               | Apenas 4 vezes em 16 dias.                           |
| 90              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| 97              | Valor não permitido para essa transação.                                                                                                                      | Transação não autorizada. Valor não permitido para essa transação.                                                                                                                                                                                                                                     | Transação não autorizada. Valor não permitido para essa transação.                                                                                                                                                        | Não                                                  |
| 98              | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.                                                                                                                                                                               | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | Apenas 4 vezes em 16 dias.                           |
| 475             | Timeout de Cancelamento                                                                                                                                       | A aplicação não respondeu dentro do tempo esperado.                                                                                                                                                                                                                                                    | Realizar uma nova tentativa após alguns segundos. Persistindo, entrar em contato com o Suporte.                                                                                                                           | Não                                                  |
| 999             | Sistema/comunicação indisponível.                                                                                                                             | Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde. Pode ser erro no SITEF, favor verificar !                                                                                                                                                                              | Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.                                                                                              | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| AA              | Tempo Excedido                                                                                                                                                | Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.                                                                                                                                | Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.                                                                                   | Apenas 4 vezes em 16 dias.                           |
| AF              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| AG              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| AH              | Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.                                                                      | Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.                                                                                                                                                          | Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.                                                                                                                            | Não                                                  |
| AI              | Transação não autorizada. Autenticação não foi realizada.                                                                                                     | Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)                                       | Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.                                    | Não                                                  |
| AJ              | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label. | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação. | Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual. | Não                                                  |
| AV              | Transação não autorizada. Dados Inválidos                                                                                                                     | Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.                                                                                                                                                                                                     | Falha na validação dos dados. Reveja os dados informados e tente novamente.                                                                                                                                               | Apenas 4 vezes em 16 dias.                           |
| BD              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                                                      | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                                                  | Não                                                  |
| BL              | Transação não autorizada. Limite diário excedido.                                                                                                             | Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                                     | Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.                                                                                                                                 | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| BM              | Transação não autorizada. Cartão Inválido                                                                                                                     | Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.                                                                                           | Transação não autorizada. Cartão inválido. Refaça a transação confirmando os dados informados.                                                                                                                            | Não                                                  |
| BN              | Transação não autorizada. Cartão ou conta bloqueado.                                                                                                          | Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                             | Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com seu banco emissor.                                                                                                         | Não                                                  |
| BO              | Transação não permitida. Falha da operação.                                                                                                                   | Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.                                                                                                                      | Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.                                                                  | Apenas 4 vezes em 16 dias.                           |
| BP              | Transação não autorizada. Conta corrente inexistente.                                                                                                         | Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                    | Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.                                                                | Não                                                  |
| BP176           | Transação não permitida.                                                                                                                                      | Parceiro deve checar se o processo de integração foi concluído com sucesso.                                                                                                                                                                                                                            | Parceiro deve checar se o processo de integração foi concluído com sucesso.                                                                                                                                               | —                                                    |
| BR              | Transação não autorizada. Conta encerrada                                                                                                                     | A conta do portador está encerrada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                                                                                                   | A conta do portador está encerrada. Solicite ao portador que entre em contato com seu banco emissor.                                                                                                                      | Não                                                  |
| C1              | Transação não permitida. Cartão não pode processar transações de débito.                                                                                      | Troque a modalidade de pagamento ou o cartão utilizado.                                                                                                                                                                                                                                                | Troque a modalidade de pagamento ou o cartão utilizado.                                                                                                                                                                   | Não                                                  |
| C2              | Transação não permitida.                                                                                                                                      | Dados incorretos. Favor rever os dados preenchidos na tela de pagamento.                                                                                                                                                                                                                               | Dados incorretos. Favor rever os dados preenchidos na tela de pagamento.                                                                                                                                                  | Não                                                  |
| C3              | Transação não permitida.                                                                                                                                      | Período inválido para este tipo de transação.                                                                                                                                                                                                                                                          | Período inválido para este tipo de transação.                                                                                                                                                                             | Não                                                  |
| CF              | Transação não autorizada.C79:J79 Falha na validação dos dados.                                                                                                | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                 | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| CG              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                 | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DF              | Transação não permitida. Falha no cartão ou cartão inválido.                                                                                                  | Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco                                                                                                                           | Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco                                                                       | Apenas 4 vezes em 16 dias.                           |
| DM              | Transação não autorizada. Limite excedido/sem saldo.                                                                                                          | Transação não autorizada. Limite excedido/sem saldo.                                                                                                                                                                                                                                                   | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | A partir do dia seguinte, apenas 4 vezes em 16 dias. |
| DQ              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.                                                                                                                                                                                 | Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.                                                                                                                             | Não                                                  |
| DS              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                       | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| EB              | Número de parcelas maior que o Permitido.                                                                                                                     | Transação não autorizada. Entre em contato com a Cielo e verifique se o cadastro possui parcelamento liberado.                                                                                                                                                                                         | Transação não autorizada. Entre em contato com a Cielo e verifique se o cadastro possui parcelamento liberado.                                                                                                            | Sim                                                  |
| EE              | Transação não permitida. Valor da parcela inferior ao mínimo permitido.                                                                                       | Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.                                                                                                                                         | Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.                                                                                                         | Não                                                  |
| EK              | Transação não permitida para o cartão                                                                                                                         | Transação não autorizada. Transação não permitida para o cartão.                                                                                                                                                                                                                                       | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Apenas 4 vezes em 16 dias.                           |
| FC              | Transação não autorizada. Ligue Emissor                                                                                                                       | Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.                                                                                                                                                                                                                  | Transação não autorizada. Entre em contato com seu banco emissor.                                                                                                                                                         | Não                                                  |
| FE              | Transação não autorizada. Divergencia na data de transação/pagamento.                                                                                         | Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.                                                                                                                                                                                                                    | Transação não autorizada. Refazer a transação confirmando os dados.                                                                                                                                                       | Não                                                  |
| FF              | Cancelamento OK                                                                                                                                               | Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.                                                                                                                                                                | Transação de cancelamento autorizada com sucesso                                                                                                                                                                          | Não                                                  |
| FG              | Transação não autorizada. Ligue AmEx 08007285090.                                                                                                             | Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.                                                                                                                                                                                                    | Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090                                                                                                                      | Não                                                  |
| GA              | Aguarde Contato                                                                                                                                               | Transação não autorizada. Referida pelo Lynx Online de forma preventiva.                                                                                                                                                                                                                               | Transação não autorizada. lojista deve aguardar contato por parte da Cielo                                                                                                                                                | Não                                                  |
| GF              | Transação negada.                                                                                                                                             | Transação não autorizada, verifique se o IP informado está liberado para processar a transação                                                                                                                                                                                                         | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | Não                                                  |
| GD              | Transação não permitida.                                                                                                                                      | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                                                                                                 | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | —                                                    |
| GT              | Transação negada.                                                                                                                                             | Ataque de força bruta.                                                                                                                                                                                                                                                                                 | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | Não                                                  |
| GK              | Transação negada.                                                                                                                                             | Bloqueio temporário por ataque de força bruta.                                                                                                                                                                                                                                                         | Transação não permitida. Entre em contato com a Cielo.                                                                                                                                                                    | Não                                                  |
| HJ              | Transação não permitida. Código da operação inválido.                                                                                                         | Transação não permitida. Código da operação Coban inválido.                                                                                                                                                                                                                                            | Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.                                                                                                                               | Não                                                  |
| IA              | Transação não permitida. Indicador da operação inválido.                                                                                                      | Transação não permitida. Indicador da operação Coban inválido.                                                                                                                                                                                                                                         | Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.                                                                                                                            | Não                                                  |
| KA              | Transação não permitida. Falha na validação dos dados.                                                                                                        | Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.                                                                                                   | Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                   | Não                                                  |
| KB              | Transação não permitida. Selecionado a opção incorrente.                                                                                                      | Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.                                                                                                  | Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                                                         | Não                                                  |
| KE              | Transação não autorizada. Falha na validação dos dados.                                                                                                       | Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.                                                                                                                                                        | Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.                                                                                       | Não                                                  |
| NR              | Transação não permitida.                                                                                                                                      | Transação não permitida.                                                                                                                                                                                                                                                                               | Transação não permitida. Retentar a transação após 30 dias                                                                                                                                                                | Retentar a transação após 30 dias.                   |
| RP              | Transação não permitida.                                                                                                                                      | Transação não permitida.                                                                                                                                                                                                                                                                               | Transação não permitida. Retentar a transação após 72h                                                                                                                                                                    | Retentar a transação após 72 horas.                  |
| SC              | Transação não permitida.                                                                                                                                      | Transação não permitida. Pagamento recorrente, serviço cancelado. Não retentar.                                                                                                                                                                                                                        | Transação não permitida. Pagamento recorrente, serviço cancelado. Não retentar.                                                                                                                                           | Não.                                                 |
| U3              | Transação não permitida. Falha na validação dos dados.                                                                                                        | Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.                                                                                                   | Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.                                                   | Não                                                  |
| 6P              | Transação não autorizada. Dados Inválidos                                                                                                                     | Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.                                                                                                                                                                                                     | Falha na validação dos dados. Reveja os dados informados e tente novamente.                                                                                                                                               | Apenas 4 vezes em 16 dias.                           |

## Códigos de Erros

Os erros que podem ser apresentados na mensagem XML, através da TAG `<erro>`, estão dispostos a seguir:

### Tabela de erros de integração

| Código | Mensagem                                              | Descrição                                                                                                                 | Ação                                                                                                                  |
| ------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 001    | Mensagem inválida                                     | A mensagem XML está fora do formato especificado pelo arquivo eCommerce.xsd                                               | Revisar as informações enviadas na mensagem XML frente às especificações                                              |
| 002    | Credenciais inválidas                                 | Impossibilidade de autenticar uma requisição daloja virtual.                                                              | Verificar se o número de credenciamento e a chave estão corretos                                                      |
| 003    | Transação inexistente                                 | Não existe transação para o identificador informado                                                                       | Rever a aplicação                                                                                                     |
| 008    | Código de Segurança Inválido                          | O código de segurança informado na mensagem é inválido.                                                                   | Revisar as informações de cartão enviadas na mensagem XML                                                             |
| 010    | Inconsistência no envio do cartão                     | A transação, com ou sem cartão, está divergente com a permissão de envio dessa informação                                 | Rever se o cadastro da loja permite o envio do cartão ou não                                                          |
| 011    | Modalidade não habilitada                             | A transação está configurada com uma modalidade de pagamento não habilitada para a loja                                   | Rever a modalidade de pagamento solicitada                                                                            |
| 012    | Número de parcelas inválido                           | O número de parcelas solicitado ultrapassa o máximo permitido                                                             | Rever a forma de pagamento                                                                                            |
| 013    | Flag de autorização automática                        | Flag de autorização automática incompatível com a inválida forma de pagamento solicitada                                  | Rever as regras de utilização da flag                                                                                 |
| 014    | Autorização Direta inválida                           | A solicitação de Autorização Direta está inválida                                                                         | Rever as regras de utilização da Autorização Direta                                                                   |
| 015    | Autorização Direta sem Cartão                         | A solicitação de Autorização Direta está sem cartão                                                                       | Rever as regras de utilização da Autorização Direta                                                                   |
| 016    | Identificador, TID, inválido                          | O TID fornecido está duplicado                                                                                            | Rever a aplicação                                                                                                     |
| 017    | Código de segurança ausente                           | O código de segurança do cartão não foi enviado (essa informação é sempre obrigatória para Amex)                          | Rever a aplicação                                                                                                     |
| 018    | Indicador de código de segurança inconsistente        | Uso incorreto do indicador de código de segurança                                                                         | Revisar as informações de cartão enviadas na mensagem XML                                                             |
| 019    | URL de Retorno não fornecida                          | A URL de Retorno é obrigatória, exceto para recorrência e autorização direta.                                             | Revisar as informações enviadas na mensagem XML                                                                       |
| 020    | Status não permite autorização                        | Não é permitido realizar autorização para o status da transação                                                           | Rever as regras de autorização                                                                                        |
| 021    | Prazo de autorização vencido                          | Não é permitido realizar autorização, pois o prazo está vencido                                                           | Rever as regras de autorização                                                                                        |
| 022    | Número de parcelas inválido                           | Não é permitido realizar autorização para este número de parcelas                                                         | Rever as regras de autorização                                                                                        |
| 025    | Encaminhamento a autorização não permitido            | O resultado da Autenticação da transação não permite a solicitação de Autorização                                         | Rever as regras de autorização                                                                                        |
| 030    | Status inválido para captura                          | O status da transação não permite captura                                                                                 | Rever as regras de captura                                                                                            |
| 031    | Prazo de captura vencido                              | A captura não pode ser realizada, pois o prazo para captura está vencido                                                  | Rever as regras de captura                                                                                            |
| 032    | Valor de captura inválido                             | O valor solicitado para captura não é válido                                                                              | Rever as regras de captura                                                                                            |
| 033    | Falha ao capturar                                     | Não foi possível realizar a captura                                                                                       | Realizar nova tentativa. Persistindo, entrar em contato com o Suporte eCommerce e informar o TID da transação.        |
| 034    | Valor da taxa de embarque obrigatório                 | O valor da taxa de embarque é obrigatório se a captura for parcial e a autorização tiver sido feita com taxa de embarque. | Envie novamente a requisição de captura com a tag .                                                                   |
| 035    | Bandeira inválida para utilização da Taxa de Embarque | A bandeira utilizada na transação não tem suporte à taxa de embarque.                                                     | Remova a taxa de embarque ou utilize um cartão que suporte esta funcionalidade: Visa ou Mastercard.                   |
| 036    | Produto inválido para utilização da Taxa de Embarque  | O produto escolhido não tem suporte à taxa de embarque.                                                                   | Altere o produto.                                                                                                     |
| 040    | Prazo de cancelamento vencido                         | O cancelamento não pode ser realizado, pois o prazo está vencido                                                          | Rever as regras de cancelamento.                                                                                      |
| 042    | Falha ao cancelar                                     | Não foi possível realizar o cancelamento                                                                                  | Realizar nova tentativa. Persistindo, entrar em contato com o Suporte eCommerce e informar o TID da transação.        |
| 043    | Valor de cancelamento é maior que valor autorizado.   | O valor que está tentando cancelar supera o valor total capturado da transação.                                           | Revisar o valor do cancelamento parcial, pois não pode ser maior que o valor capturado da transação.                  |
| 051    | Recorrência Inválida                                  | As configurações da transação não permitem que a transação recorrente seja efetuada com sucesso.                          | Verifique se escolheu “Crédito à vista”; Verifique se está enviando somente o token ou somente o cartão de crédito    |
| 052    | Token Inválido                                        | O token fornecido na requisição de autorização não é válido ou está bloqueado.                                            | Verifique se o Token está correto. Persistindo, entrar em contato com o Suporte.                                      |
| 053    | Recorrência não habilitada                            | O cadastro do lojista não permite o envio de transações recorrentes.                                                      | Entre em contato com suporte para saber como habilitar a recorrência no cadastro.                                     |
| 054    | Transação com Token inválida                          | As configurações da transação não permitem que a autorização direta com uso de Token seja efetuada com sucesso.           | Verifique se escolheu “Crédito à vista”; Verifique se está enviando somente o token ou somente o cartão de crédito.   |
| 055    | Número do cartão não fornecido                        | Foi solicitado criação de Token, porém o número do cartão de crédito não foi fornecido.                                   | Revisar as informações enviadas na mensagem XML frente às especificações                                              |
| 056    | Validade do cartão não fornecido                      | Foi solicitado criação de Token, porém a validade do cartão de crédito não foi fornecida.                                 | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 057    | Erro inesperado gerando Token                         | Falha no sistema ocorrida no momento da geração do Token.                                                                 | Tentar novamente. Persistindo, entrar em contato com o Suporte.                                                       |
| 061    | Transação Recorrente Inválida                         | As configurações da transação recorrente estão inválidas.                                                                 | Verifique se o produto é Crédito à vista, se o token ou o cartão foram enviados na mensagem.                          |
| 077    | XID não fornecido                                     | Foi solicitado uma autorização com autenticação externa, porém o campo XID não foi fornecido.                             | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 078    | CAVV não fornecido                                    | Foi solicitado uma autorização com autenticação externa, porém o campo CAVV não foi fornecido.                            | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 086    | XID e CAVV não fornecidos                             | Foi solicitado uma autorização com autenticação externa, porém os campos CAVV e XID não foram fornecidos.                 | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 087    | CAVV com tamanho divergente                           | Foi solicitado uma autorização com autenticação externa, porém o campo CAVV possue um tamanho divergente.                 | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 088    | XID com tamanho divergente                            | Foi solicitado uma autorização com autenticação externa, porém o campo XID possue um tamanho divergente.                  | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 089    | ECI com tamanho divergente                            | Foi solicitado uma autorização com autenticação externa, porém o campo ECI possue um tamanho divergente.                  | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 090    | ECI inválido                                          | Foi solicitado uma autorização com autenticação externa, porém o campo ECI possue um valor inválido.                      | Revisar as informações enviadas na mensagem XML frente às especificações.                                             |
| 095    | Erro interno de autenticação                          | Falha no sistema                                                                                                          | Persistindo, entrar em contato com o Suporte e informar o TID da transação.                                           |
| 097    | Sistema indisponível                                  | Falha no sistema                                                                                                          | Persistindo, entrar em contato com o Suporte.                                                                         |
| 098    | Timeout                                               | A aplicação não respondeu dentro do tempo esperado.                                                                       | Consultar a transação e avaliar o status antes de submeter a transação. Persistindo, entrar em contato com o Suporte. |
| 099    | Erro inesperado                                       | Falha no sistema                                                                                                          | Persistindo, entrar em contato com o Suporte e informar o TID da transação.                                           |

## Status das transações

| Status                    | Código |
| ------------------------- | ------ |
| Transação Criada          | 0      |
| Transação em Andamento    | 1      |
| Transação Autenticada     | 2      |
| Transação não Autenticada | 3      |
| Transação Autorizada      | 4      |
| Transação não Autorizada  | 5      |
| Transação Capturada       | 6      |
| Transação Cancelada       | 9      |
| Transação em Autenticação | 10     |
| Transação em Cancelamento | 12     |

## ECI

| Resultado da Autenticação                                                              | Visa | Mastercard | Aura | Demais |
| -------------------------------------------------------------------------------------- | ---- | ---------- | ---- | ------ |
| Portador autenticado com sucesso.                                                      | 5    | 2          | n/d  | n/d    |
| Portador não fez autenticação, pois o emissor não forneceu mecanismos de autenticação. | 6    | 1          | n/d  | n/d    |
| Portador não se autenticou com sucesso, pois ocorreu um erro técnico inesperado.       | 7    | 1          | n/d  | n/d    |
| Portador não se autenticou com sucesso.                                                | 7    | 0          | n/d  | n/d    |
| A loja optou por autorizar sem passar pela autenticação.                               | 7    | 0          | 0    | 7      |

# Operações e configurações

## Criação da Transação de Autorização

A requisição de autorização é a principal operação do Cielo eCommerce, pois é através dela que uma venda pode ser concretizada e finalizar o processo de venda. A autorização possui uma série de configurações que podem ser customizadas, além de funcionalidades que agregam valor ao lojista e seus consumidores.

<aside class="notice">Para os códigos de resposta da autorização consulte o Catálogo de Códigos de Resposta da Autorização (LR)</aside>

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

## Autorização Direta

```xml
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

- **Objetivo** - Submeter uma transação direta com o uso de um cartão de crédito.
- **Regras**
  - O cadastro da loja virtual deve estar habilitado para envio dos dados do cartão.
  - Enviar a TAG `<autorizar>` com o valor “3”.
  - Somente válido para Crédito.
  - O lojista deve estar atento às regras para envio do cartão.
  - Na autorização direta, o nível de segurança da transação (ECI) é definido como:
    - “7” para Visa, Diners, Discover, Elo e JCB.
    - “0” para Mastercard, Aura e Hipercard.

## Autorização Recorrente

```XML
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

- **Objetivo** - Submeter uma transação recorrente com o uso de um cartão de crédito.
- **Regras**
  - Enviar a TAG `<autorizar>` com o valor “4”.
  - Somente válido para crédito à vista.

### Renova Fácil

```xml
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
  </dados-portador>
</transacao>
```

Essa funcionalidade facilita a identificação de um cartão que tenha sido substituído por outro no banco emissor. Dessa forma, quando uma transação recorrente é submetida ao Web Service e a Cielo identifica que o cartão utilizado está desatualizado, o sistema terá o seguinte comportamento:

1. Caso a transação recorrente tenha sido enviada através de um cartão, sua autorização será negada e serão retornados os dados do novo cartão, conforme o diagrama abaixo:

![remova fácil]({{ site.baseurl_root }}/images/remova-facil.png)

<aside class="notice">O Renova Fácil só está disponível para transações recorrentes. A efetividade do Renova Fácil depende do uso correto das transações recorrentes devidamente sinalizadas como tal. Consulte os bancos e bandeiras participantes com o Suporte Web Cielo eCommerce.</aside>

<aside class="notice">Todas as mensagens devem estar formatadas corretamente segundo especificado no <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### Autorização de uma transação previamente gerada

```xml
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

| Elemento        | Tipo         | Obrigatório | Tamanho | Descrição                                     |
| --------------- | ------------ | ----------- | ------- | --------------------------------------------- |
| tid             | Alfanumérico | Sim         | 20      | Identificador da transação                    |
| dados-ec.numero | Numérico     | Sim         | 1..20   | Número de afiliação da loja com a Cielo.      |
| dados-ec.chave  | Alfanumérico | Sim         | 1..100  | Chave de acesso da loja atribuída pela Cielo. |

## Transação com Token

```xml
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

- **Objetivo** - Solicitar a criação de um token associada a um cartão de crédito, para viabilizar o envio de transações sem o cartão.
- **Regras**
  - O Token é único para um determinado [Cartão + Estabelecimento Comercial]. Dessa forma, um cartão pode estar “tokenizado” em mais de uma loja e em cada uma possuirá códigos diferentes.
  - Caso seja enviada mais de uma solicitação com os mesmos dados, o token retornado será sempre o mesmo.
  - A criação do token é independente do resultado da autorização (aprovada/negada).

<aside class="warning">A transação feita via token não isenta o lojista do envio da informação de bandeira, portanto é necessário que o sistema do lojista (ou gateway) que armazenará os tokens também armazene a bandeira do cartão que foi tokenizado.</aside>

<aside class="notice">Um token não utilizado por mais de um ano será automaticamente removido do banco de dados da Cielo. É possível realizar o bloqueio de um token específico para que este não seja mais usado. O bloqueio do token deve ser solicitado ao Suporte Web Cielo eCommerce.</aside>

| Elemento                     | Tipo         | Obrigatório | Tamanho | Descrição                                                         |
| ---------------------------- | ------------ | ----------- | ------- | ----------------------------------------------------------------- |
| dados-ec.numero              | Numérico     | Sim         | 1..20   | Número de afiliação da loja com a Cielo.                          |
| dados-ec.chave               | Alfanumérico | Sim         | 1..100  | Chave de acesso da loja atribuída pela Cielo.                     |
| daods-portador               | n/a          | Opcional    | n/a     | Nó com os dados do cartão.                                        |
| dados-portador.numero        | Numérico     | Sim         | 19      | Número do cartão                                                  |
| dados-portador.validade      | Numérico     | Sim         | 6       | Validade do cartão no formato aaaamm. Exemplo: 201212 (dez/2012). |
| dados-portador.nome-portador | Alfanumérico | Opcional    | 0..50   | Nome impresso no cartão                                           |

### Retorno

```xml
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

| Elemento               | Tipo         | Tamanho | Descrição                                                |
| ---------------------- | ------------ | ------- | -------------------------------------------------------- |
| codigo-token           | Alfanumérico | 100     | Código do token gerado                                   |
| status                 | Numérico     | 1       | Status do Token: **0** – Bloqueado, **1** – Desbloqueado |
| numero-cartao-truncado | Alfanumérico | 1..16   | Número do cartão truncado.                               |

### Autorização Direta via Token

```xml
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

- **Objetico** - Submeter uma transação direta (sem autenticação) com o uso de um token previamente cadastrado
- **Regras**
  - Enviar a TAG `<autorizar>` com o valor “3”.
  - O token deve estar desbloqueado.
  - Válido somente para crédito.

### Autorização recorrente com Token

```xml
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

- **Objetivo** - Submeter uma transação recorrente com o uso de um token previamente cadastrado.
- **Regras**
  - Enviar a TAG `<autorizar>` com o valor “4”.
  - O token deve estar desbloqueado.
  - Somente válido para crédito à vista.

### Renova Fácil com Token

```xml
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

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.0">
  <!-- ... -->
  <gerar-token>true</gerar-token>
</requisicao-transacao>
```

<aside class="warning">este serviço adicional está sujeito a cobrança a partir do momento em que a geração de token é solicitada.</aside>

- **Objetivo** - Além da mensagem específica para criação de um token, descrita em Transação com Token, é possível aproveitar uma requisição de autorização para solicitar a geração do token, acrescentando a informação `<gerar-token>` no nó de requisição de transação.
- **Regras**
  - Caso um cartão seja submetido mais de uma vez pelo mesmo lojista, o Token gerado será sempre o mesmo.

### Credencial Armazenado - Card On File

O portador do cartão poderá permitir que os dados de seu cartão, sejam armazenados de forma segura, para transações futuras no Estabelecimento Comercial.

Abaixo seguem as situações para identificar se é a primeira transação ou subsequente, através da TAG primeira transação:

- **Situação 1:** - **HÁ** armazenamento de dados do cartão e **É** primeira transação.

```xml
<credencial-armazenada>
  <primeira-transacao>S</primeira-transacao>
</credencial-armazenada>
```

- **Situação 2:** - **HÁ** armazenamento de dados do cartão e **NÃO É** primeira transação.

```xml
<credencial-armazenada>
  <primeira-transacao>N</primeira-transacao>
</credencial-armazenada>
```

- **Situação 3:** - **NÃO HÁ** armazenamento de dados do cartão, o estabelecimento simplesmente não envia esta tag.

#### Requisição

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
  <dados-ec>
    <numero>2000019700</numero>
    <chave>65d156641f765861451c7c1270a4c09a617863b031b2e4b0c4a09cd390783c82</chave>
  </dados-ec>
  <dados-portador>
    <numero>4096031111110011</numero>
    <validade>201712</validade>
    <indicador>1</indicador>
    <codigo-seguranca>123</codigo-seguranca>
    <nome-portador>TESTE CUCUMBER</nome-portador>
  </dados-portador>
  <dados-pedido>
    <numero>77115</numero>
    <valor>315000</valor>
    <moeda>986</moeda>
    <data-hora>2016-02-16T13:45:05</data-hora>
    <descricao>Compra Online</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>soft cucumber</soft-descriptor>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://www.cielo.com.br</url-retorno>
  <autorizar>3</autorizar>
  <capturar>false</capturar>
  <credencial-armazenada>
    <primeira-transacao>S</primeira-transacao>
  </credencial-armazenada>
  <gerar-token>false</gerar-token>
</requisicao-transacao>
```

| Elemento                                 | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                                                                                                                                                                     |
| ---------------------------------------- | ------------ | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dados-ec.numero                          | Numérico     | Sim         | 1..20   | Número da afiliação da loja com a Cielo.                                                                                                                                                                                                                      |
| dados-ec.chave                           | Alfanumérico | Sim         | 1..100  | Chave de acesso da loja atribuída pela Cielo.                                                                                                                                                                                                                 |
| dados-portador.numero                    | Numérico     | Sim         | 19      | Número do cartão.                                                                                                                                                                                                                                             |
| dados-portador.validade                  | Numérico     | Sim         | 1       | Validade do cartão no formato aaaamm. Exemplo: 201212 (dez/2012).                                                                                                                                                                                             |
| dados-portador.indicador                 | Numérico     | Sim         | 1       | Indicador sobre o envio do Código de segurança: 0 – não informado, 1 – informado, 2 – ilegível, 9 – inexistente                                                                                                                                               |
| dados-portador.codigo-seguranca          | Numérico     | Condiciona  | 3..4    | Obrigatório se o indicador for 1                                                                                                                                                                                                                              |
| dados-portador.nome-portador             | Alfanumérico | Opcional    | 0..100  | Nome como impresso no cartão                                                                                                                                                                                                                                  |
| dados-pedido.numero                      | Alfanumérico | Sim         | 1..20   | Número do pedido da loja. Recomenda-se que seja um valor único por pedido.                                                                                                                                                                                    |
| dados-pedido.valor                       | Numérico     | Sim         | 1..12   | Valor a ser cobrado pelo pedido (já deve incluir valores de frete, embrulho, custos extras, taxa de embarque, etc). Esse valor é o que será debitado do consumidor.                                                                                           |
| dados-pedido.moeda                       | Numérico     | Sim         | 3       | Código numérico da moeda na norma ISO 4217. Para o Real, o código é 986.                                                                                                                                                                                      |
| dados-pedido.data-hora                   | Alfanumérico | Sim         | 19      | Data hora do pedido. Formato: aaaa-MM-ddTHH24:mm:ss                                                                                                                                                                                                           |
| dados-pedido.descricao                   | Alfanumérico | Opcional    | 0..1024 | Descrição do pedido                                                                                                                                                                                                                                           |
| dados-pedido.idioma                      | Alfanumérico | Opcional    | 2       | Idioma do pedido: PT (português), EN (inglês) ou ES (espanhol). Com base nessa informação é definida a língua a ser utilizada nas telas da Cielo. Caso não seja enviado, o sistema assumirá “PT”.                                                             |
| dados-pedido.soft-descriptor             | Alfanumérico | Opcional    | 0..13   | Texto de até 13 caracteres que será exibido na fatura do portador, após o nome do Estabelecimento Comercial.                                                                                                                                                  |
| forma-pagamento.bandeira                 | Alfanumérico | Sim         | n/a     | Nome da bandeira (minúsculo): “visa”, “mastercard”, “diners”, “discover”, “elo”, “amex”, “jcb”, “aura”, “hipercard”                                                                                                                                           |
| forma-pagamento.produto                  | Alfanumérico | Sim         | 1       | Código do produto: 1 – Crédito à Vista, 2 – Parcelado loja, A – Débito.                                                                                                                                                                                       |
| forma-pagamento.parcelas                 | Numérico     | Sim         | 1..2    | Número de parcelas. Para crédito à vista ou débito, utilizar 1.                                                                                                                                                                                               |
| url-retorno                              | Alfanumérico | Sim         | 1..1024 | URL da página de retorno. É para essa página que a Cielo vai direcionar o browser ao fim da autenticação ou da autorização. Não é obrigatório apenas para autorização direta, porém o campo dever ser inserido como null.                                     |
| autorizar                                | Alfanumérico | Sim         | 1       | Define se o tipo de autorização da transação e a autenticação.<br>0 - Nao autorizar<br>1 - Autorizar somente se autenticada<br>2 - Autorizar nao-autenticada e autenticada<br>3 - Somente autorizar (nao realizar autenticacao)<br>4 - autorizacao recorrente |
| capturar                                 | Boolean      | Sim         | n/a     | true ou false. Define se a transação será automaticamente capturada caso seja autorizada.                                                                                                                                                                     |
| credencial-armazenada.primeira-transacao | Alfanumérico | Opcional    | 1       | Dados do cartão do portador armazenado.<br>Define se é a primeira transação (S) ou transação subsequente (N).                                                                                                                                                 |
| gerar-token                              | Boolean      | Opcional    | n/a     | true ou false. Define se a transação atual deve gerar um token associado ao cartão.                                                                                                                                                                           |

#### Resposta

```xml
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0" xmlns="http://ecommerce.cbmp.com.br">
  <tid>20000197008CTDEP7DHC</tid>
  <pan>iwcdiV9SLhtb/dsQNXRHT426+tgjcLtMzchw5YggfP8=</pan>
  <dados-pedido>
    <numero>77115</numero>
    <valor>315000</valor>
    <moeda>986</moeda>
    <data-hora>2016-02-16T13:45:05</data-hora>
    <descricao>Compra Online</descricao>
    <idioma>PT</idioma>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>elo</bandeira>
    <produto>A</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <status>6</status>
  <autenticacao>
    <codigo>6</codigo>
    <mensagem>Autenticada com sucesso</mensagem>
    <data-hora>2019-08-28T13:45:43.959-03:00</data-hora>
    <valor>315000</valor>
    <eci>5</eci>
  </autenticacao>
  <autorizacao>
    <codigo>6</codigo>
    <mensagem>Transacao autorizada</mensagem>
    <data-hora>2019-08-28T13:45:43.959-03:00</data-hora>
    <valor>315000</valor>
    <lr>00</lr>
    <arp>882114</arp>
    <nsu>248001</nsu>
  </autorizacao>
  <captura>
    <codigo>6</codigo>
    <mensagem>Transacao capturada com sucesso</mensagem>
    <data-hora>2019-08-28T13:45:43.959-03:00</data-hora>
    <valor>315000</valor>
  </captura>
</transacao>
```

| Elemento                 | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                                                                                                         |
| ------------------------ | ------------ | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tid                      | Alfanumérico | Sim         | 1..40   | Identificador da transação.                                                                                                                                                                       |
| pan                      | Alfanumérico | Sim         | n/a     |
| dados-pedido.numero      | Alfanumérico | Sim         | 1..20   | Número do pedido da loja. Recomenda-se que seja um valor único por pedido.                                                                                                                        |
| dados-pedido.valor       | Numérico     | Sim         | 1..12   | Valor a ser cobrado pelo pedido (já deve incluir valoresde frete, embrulho, custos extras, taxa de embarque, etc). Esse valor é o que será debitado do consumidor.                                |
| dados-pedido.moeda       | Numérico     | Sim         | 3       | Código numérico da moeda na norma ISO 4217. Para o Real, o código é 986.                                                                                                                          |
| dados-pedido.data-hora   | Alfanumérico | Sim         | 19      | Data hora do pedido. Formato: aaaa-MM-ddTHH24:mm:ss                                                                                                                                               |
| dados-pedido.descricao   | Alfanumérico | Opcional    | 0..1024 | Descrição do pedido                                                                                                                                                                               |
| dados-pedido.idioma      | Alfanumérico | Opcional    | 2       | Idioma do pedido: PT (português), EN (inglês) ou ES (espanhol). Com base nessa informação é definida a língua a ser utilizada nas telas da Cielo. Caso não seja enviado, o sistema assumirá “PT”. |
| forma-pagamento.bandeira | Alfanumérico | Sim         | n/a     | Nome da bandeira (minúsculo): “visa”, “mastercard”, “diners”, “discover”, “elo”, “amex”, “jcb”, “aura”, “hipercard”                                                                               |
| forma-pagamento.produto  | Alfanumérico | Sim         | 1       | Código do produto: 1 – Crédito à Vista, 2 – Parcelado loja, A – Débito.                                                                                                                           |
| forma-pagamento.parcelas | Numérico     | Sim         | 1..2    | Número de parcelas. Para crédito à vista ou débito, utilizar 1.                                                                                                                                   |
| autenticacao.codigo      | Numérico     | Sim         | 1.2     | Código do processamento                                                                                                                                                                           |
| autenticacao.mensagem    | Alfanumérico | Sim         | 1..100  | Mensagem com a resposta sobre o processamento da transação.                                                                                                                                       |
| autenticacao.data-hora   | Alfanumérico | Sim         | 19      | Data e hora do processamento                                                                                                                                                                      |
| autenticacao.valor       | Numérico     | Sim         | 1..12   | Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos.                                                                                                                    |
| autenticacao.eci         | Numérico     | Sim         | 2       | Nível de segurança.                                                                                                                                                                               |
| autorizacao.codigo       | Numérico     | Sim         | 1.2     | Código do processamento                                                                                                                                                                           |
| autorizacao.mensagem     | Alfanumérico | Sim         | n/a     | Mensagem com a resposta sobre o processamento da transação.                                                                                                                                       |
| autorizacao.data-hora    | Alfanumérico | Sim         | 19      | Data e hora do processamento                                                                                                                                                                      |
| autorizacao.valor        | Numérico     | Sim         | 1..12   | Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos.                                                                                                                    |
| autorizacao.lr           | Alfanumérico | Sim         | 4       | Código da Literal da Autorização.                                                                                                                                                                 |
| autorizacao.arp          | Alfanumérico | Sim         | 6       | ARP da Autorização.                                                                                                                                                                               |
| autorizacao.nsu          | Alfanumérico | Sim         | 6       | NSU da Autorização                                                                                                                                                                                |
| captura.codigo           | Numérico     | Sim         | 1.2     | Código do processamento                                                                                                                                                                           |
| captura.mensagem         | Alfanumérico | Sim         | n/a     | Mensagem com a resposta sobre o processamento da transação.                                                                                                                                       |
| captura.data-hora        | Alfanumérico | Sim         | 19      | Data e hora do processamento                                                                                                                                                                      |
| captura.valor            | Numérico     | Sim         | 1..12   | Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos.                                                                                                                    |

### Tokenização de Bandeira

Clientes que fazem tokenização do cartão junto com as bandeiras poderão enviar as informações para a Cielo no fluxo transacional.

#### Requisição

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>2000019700</numero>
        <chave>65d156641f765861451c7c1270a4c09a617863b031b2e4b0c4a09cd390783c82</chave>
    </dados-ec>
    <dados-portador>
        <numero>4084359300407900</numero>
        <validade>201712</validade>
        <indicador>1</indicador>
        <codigo-seguranca>123</codigo-seguranca>
        <nome-portador>TESTE CUCUMBER</nome-portador>
        <token/>
        <carteira>
            <tipo>MERCHANT</tipo>
            <codigo-captura/>
            <cavv>A901234A5678A0123A567A90120=</cavv>
            <eci>4</eci>
        </carteira>
    </dados-portador>
    <dados-pedido>
        <numero>86785</numero>
        <valor>315000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>soft cucumber</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>false</capturar>
    <gerar-token>false</gerar-token>
    <avs>
        <![CDATA[<dados-avs><endereco>Rua Credito</endereco><complemento>Apto 504</complemento><numero>745</numero><bairro>Vila Cucumber</bairro><cep>13040-144</cep><cpf>30652698501</cpf></dados-avs>]]>
    </avs>
</requisicao-transacao>
```

| Propriedade   | Tipo         | Tamanho |
| ------------- | ------------ | ------- |
| carteira.eci  | Numérico     | 1       |
| carteira.cavv | Alfanumérico | 29      |
| carteira.tipo | Fixo         |         |

#### Resposta

```xml
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0" xmlns="http://ecommerce.cbmp.com.br">
    <tid>2000019700008C730BOC</tid>
    <pan>Ma7WOe2ciLGucTokmn5mX2mkpeVJGkqVTavqR42Pm5k=</pan>
    <dados-pedido>
        <numero>86785</numero>
        <valor>315000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <status>4</status>
    <autenticacao>
        <codigo>4</codigo>
        <mensagem>Nao autenticada</mensagem>
        <data-hora>2020-01-09T11:28:39.732-03:00</data-hora>
        <valor>315000</valor>
        <eci>4</eci>
    </autenticacao>
    <autorizacao>
        <codigo>4</codigo>
        <mensagem>Transacao autorizada</mensagem>
        <data-hora>2020-01-09T11:28:39.732-03:00</data-hora>
        <valor>315000</valor>
        <lr>00</lr>
        <arp>144716</arp>
        <nsu>549201</nsu>
        <codigo-avs-cep>C</codigo-avs-cep>
        <mensagem-avs-cep>Confere</mensagem-avs-cep>
        <codigo-avs-end>C</codigo-avs-end>
        <mensagem-avs-end>Confere</mensagem-avs-end>
    </autorizacao>
</transacao>
```

## Funcionalidades Agregadas

### Autenticação e Transações com Cartões de Débito

```xml
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

- **Objetivo** - Tornar elegível uma transação para autenticação.
- **Regras**
  - Enviar a flag <autorizar> de acordo com o domínio abaixo, para tentar:
    - 0 – Somente autenticar a transação.
    - 1 – Submeter à autorização somente se a transação for autenticada.
    - 2 – Submeter à autorização se a transação for autenticada ou não.
  - Para débito, enviar o produto “A” no XML.
  - A solicitação da autorização de uma transação que foi somente autenticada pode ser feita em até 90 dias após a data inicial.

<aside class="notice">Tendo em vista que a autenticação não depende exclusivamente desta flag, recomendamos sempre verificar o campo eci para verificar o resultado da autenticação.</aside>

### Permite que o lojista envie um texto (Soft Descriptor)

```xml
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

- **Objetivo** - Permite que o lojista envie um texto de até 13 caracteres que será impresso na fatura do portador, ao lado da identificação da loja, respeitando o comprimento das bandeiras:
  - **Visa**: 25 caracteres
  - **Mastercard**: 22 caracteres
- **Regras**
  - Tamanho máximo: 13 caracteres.
  - Disponível apenas para as bandeiras Visa e MasterCard.
  - Uso exclusivo de caracteres simples.

<aside class="notice">Para conhecer e/ou alterar o nome da loja que será impresso na fatura do portador entre em contato com nossa central de relacionamento</aside>

### Captura Automática

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <capturar>true</capturar>
  <!-- ... -->
</requisicao-transacao>
```

- **Objetivo** - A captura automática permite que uma requisição de autorização seja capturada imediatamente após sua aprovação. Dessa forma, não é preciso realizar uma `<requisicao-captura>`.
- **Regras**
  - Somente autorizações aprovadas serão capturadas automaticamente.

### Taxa de embarque

```xml
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
    <taxa-embarque>1000</taxa-embarque>
    <soft-descriptor>softdescriptor</soft-descriptor>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

- **Objetivo** A taxa de embarque é um campo informativo que define o montante do total da transação (informado na tag dados-pedido//valor) que deve ser destinado ao pagamento da taxa à Infraero.
  - O valor da taxa de embarque não é acumulado ao valor da autorização. Por exemplo, em uma venda de passagem aérea de R$ 200,00 com taxa de embarque de R$ 25,00 deve-se enviar o campo `<valor>22500</valor>` e `<taxa-embarque>2500</taxa-embarque>`.
- **Regras**
  - Disponível apenas para as bandeiras Visa e Mastercard.
  - O valor da taxa de embarque não é somado ao valor da autorização, ou seja, é apenas informativo.

<aside class="notice">Existem regras específicas para a requisição de captura com taxa de embarque, disponíveis no item Captura Total e Parcial.</aside>

### AVS (Address Verification Service)

```xml
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
    <taxa-embarque>1000</taxa-embarque>
    <soft-descriptor>softdescriptor</soft-descriptor>
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

- **Objetivo** - O AVS é um serviço para transações de cartão não presente onde é realizada uma validação cadastral através do batimento dos dados numéricos do endereço informado pelo portador (endereço de entrega da fatura) na loja virtual, com os dados cadastrais do emissor.
  - O AVS é um serviço que auxilia na redução do risco de não reconhecimento de compras online. É uma ferramenta que o estabelecimento utilizará para a análise de suas vendas, antes de decidir pela captura da transação e a entrega do produto ou serviço.
- **Regras**
  - Disponível apenas para as bandeiras Visa, Mastercard e AmEx.
  - Produtos permitidos: somente crédito.
  - O retorno da consulta ao AVS é separado em dois itens: CEP e endereço.
  - Cada um deles pode ter os seguintes valores:
    - C – Confere;
    - N – Não confere;
    - I – Indisponível;
    - T – Temporariamente indisponível;
    - X – Serviço não suportado para esta Bandeira.
    - E - Dados enviados incorretos. Verificar se todos os campos foram enviados
  - O nó contendo o XML do AVS deve estar encapsulado pelo termo “CDATA”, para evitar problemas com o parser da requisição.
  - É necessário que todos os campos contidos no nó AVS sejam preenchidos.
  - Quando o campo não for aplicável (exemplo: complemento), a tag deve ser enviada preenchia com NULL ou N/A
  - Necessário habilitar a opção do AVS no cadastro. Para habilitar a opção AVS no cadastro ou consultar os bancos participantes, entre em contato com o Suporte Web Cielo eCommerce.

<aside class="warning">Conforme contrato, este serviço adicional está sujeito a cobrança a partir do momento em que a consulta de AVS for solicitada. Para maiores informações, favor entrar em contato com a central de atendimento, seu gerente de contas ou o Suporte Web Cielo eCommerce.</aside>

## Consulta

A operação de consulta é essencial na integração, pois ela que garantirá a situação atual de uma transação. Ela deve ser executada ao término do processo de autorização, no momento em que a Loja Virtual recebe o fluxo de execução na URL informada na primeira requisição (através da TAG <url-retorno>). O E-commerce pode levar até 25 segundos para processar completamente uma transação.

### Consulta por TID

- **Objetivo** - Realizar a consulta de uma transação através do TID informado.
- **Regras**
  - Somente transações dos últimos 365 dias estão disponíveis.
  - Não há mudança de status da transação.

#### Requisição

```xml
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

| TAG             | Tipo         | Obrig. | Tam.   | Descrição                                     |
| --------------- | ------------ | ------ | ------ | --------------------------------------------- |
| dados-ec.numero | Numérico     | Sim    | 1..20  | Número de afiliação da loja com a Cielo.      |
| dados-ec.chave  | Alfanumérico | Sim    | 1..100 | Chave de acesso da loja atribuída pela Cielo. |
| Tid             | Alfanumérico | Sim    | 1..40  | Identificador da transação                    |

### Consulta por Número do Pedido

- **Objetivo** - Realizar a consulta de uma transação através do número do pedido, fornecido pela loja no momento da requisição de transação.
- **Regras**:
  - Somente transações dos últimos 365 dias estão disponíveis.
  - Caso seja encontrada mais de uma transação para o mesmo número do pedido, a Cielo enviará a transação mais recente.
  - Não há mudança de status da transação.

<aside class="notice"><strong>INFORMAÇÃO</strong>: A consulta por Número do Pedido deve ser usada apenas como contingência à Consulta por TID, pois esta pode não garantir unicidade da transação, tendo em vista que este campo é enviado pela loja virtual e apenas acatado pela Cielo.</aside>

#### Requisição

```xml
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

| TAG             | Tipo         | Obrig. | Tam.   | Descrição                                     |
| --------------- | ------------ | ------ | ------ | --------------------------------------------- |
| dados-ec.numero | Numérico     | Sim    | 1..20  | Número de afiliação da loja com a Cielo.      |
| dados-ec.chave  | Alfanumérico | Sim    | 1..100 | Chave de acesso da loja atribuída pela Cielo. |
| Numero          | Alfanumérico | Sim    | 1..20  | Número do pedido associado a uma transação.   |

## Captura

Uma transação autorizada somente gera o crédito para o estabelecimento comercial caso ela seja capturada. Por isso, **toda venda que o lojista queira efetivar será preciso realizar a captura (ou confirmação) da transação**.

Para vendas na modalidade de Crédito, essa confirmação pode ocorrer em dois momentos:

- Imediatamente após a autorização (captura total);
- Posterior à autorização (captura total ou parcial).

No primeiro caso, não é necessário enviar uma requisição de captura, pois ela é feita automaticamente pela Cielo após a autorização da transação. Para tanto, é preciso configurar a requisição de transação definindo-se o valor “true” para a TAG `<capturar>`, conforme visto na seção “Criando uma transação”.

Já no segundo caso, é preciso fazer uma “captura posterior”, através de uma nova requisição ao Webservice da Cielo para confirmar a transação e receber o valor da venda.

<aside class="warning">O prazo máximo para realizar a captura posterior é de 5 dias corridos após a data da autorização. Por exemplo, se uma autorização ocorreu em 10/12 às 15h20m45s, o limite para captura será às 15h20m45s do dia 15/12.</aside>

<aside class="notice">Na modalidade de débito não existe essa opção: toda transação de débito autorizada é capturada automaticamente.</aside>

### Captura Total e Parcial

```xml
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

- **Objetivo** - Realizar a captura total e parcial de uma transação previamente autorizada.
- **Regras**
  - Disponível somente para transações dentro do prazo máximo de captura.
  - Caso o valor não seja informado, o sistema assumirá a captura do valor total.
  - O valor da captura deve ser menor ou igual ao valor da autorização.
  - Em caso de falha, novas tentativas de captura poderão ser feitas.
  - Em caso de sucesso, o status é alterado para “6 – Capturada”.
  - **Transações com Taxa de embarque:**
    - Na requisição de captura, o valor da taxa de embarque indica o montante do total que será capturado que deve ser destinado a esse fim.
    - Obrigatório caso seja captura parcial.
    - Caso a captura seja total, o sistema irá considerar o valor da taxa de embarque informado no requisição de autorização (`<requisicao-transacao>`).

### Retorno

```xml
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

| Elemento              | Tipo                                                       | Tamanho | Descrição                                                                      |
| --------------------- | ---------------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| captura               | Nó com dados da captura caso tenha passado por essa etapa. |
| captura.codigo        | Numérico                                                   | 1..2    | Código do processamento                                                        |
| captura.mensagem      | Alfanumérico                                               | 1..100  | Detalhe do processamento.                                                      |
| captura.datahora      | Alfanumérico                                               | 19      | Data hora do processamento.                                                    |
| captura.valor         | Numérico                                                   | 1..12   | Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos. |
| captura.taxa-embarque | Numérico                                                   | 1..9    | Montante declarado como taxa de embarque que foi capturado.                    |

## Cancelamento

O cancelamento é utilizado quando o lojista decide não efetivar um pedido de compra, seja por insuficiência de estoque, por desistência da compra pelo consumidor, ou qualquer outro motivo. Seu uso faz-se necessário principalmente se a transação estiver capturada, pois haverá débito na fatura do portador, caso ela não seja cancelada.

<aside class="notice">Se a transação estiver apenas autorizada e a loja queira cancelá-la, o pedido de cancelamento não é necessário, pois após o prazo de captura expirar, ela será cancelada automaticamente pelo sistema.</aside>
  
Para as solicitações de cancelamento da mesma transação, é necessário aguardar um período de 5 segundos entre uma solicitação e outra, para que seja realizada a consulta de saldo, reserva do valor na agenda financeira e sensibilizado o saldo. Evitando assim duplicidade de cancelamento. Esta regra vale para cancelamentos totais e/ou parciais.

Para identificar que as solicitações de cancelamento são da mesma transação, consideramos o número do EC, número da autorização de cancelamento, data da venda, valor da venda e NSU.

Importante salientar que para realizar qualquer solicitação de cancelamento, é necessário que o estabelecimento possua saldo suficiente na transação/em agenda

### Cancelamento Total e Parcial

```xml
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

- **Objetivo** - Realizar o cancelamento do valor total ou parcial de uma transação.
- **Regras**
  - O cancelamento total é válido tanto para transações capturadas, como autorizadas; o parcial é válido apenas para as capturadas.
  - O prazo de cancelamento é de até 300 dias para a modalidade crédito e D+0 para débito.
  - O cancelamento total, quando realizado com sucesso, altera o status da transação para “9 – Cancelada”, enquanto que o parcial não altera o status da transação, mantendo-a como “6 – Capturada”.
  - Em caso de cancelamento na versão 1.6.1 (esta versão é exclusiva para cancelamento), o status de cancelamento parcial será diferente, ou seja: se cancelado com sucesso, retorna status 9; caso ocorra um erro no cancelamento parcial, o código de status será 6. Estas regras aplicam-se apenas para o cancelamento parcial.
  - Caso a TAG `<valor>` não seja fornecida, o sistema assumirá um cancelamento total.
  - O cancelamento parcial está disponível para todas as bandeiras suportadas no e-Commerce.
  - Para a modalidade débito, não existe a possibilidade de efetuar cancelamento parcial.
  - **Transações com Taxa de embarque:**
    - Transações capturadas com o mesmo valor da autorização (ou seja, captura total) possuem o mesmo tratamento para cancelamentos parciais e totais, pois o valor da taxa de embarque é cancelado integralmente.

| Elemento        | Tipo         | Obrigatório | Tamanho | Descrição                                                                       |
| --------------- | ------------ | ----------- | ------- | ------------------------------------------------------------------------------- |
| tid             | Alfanumérico | Sim         | 1..40   | Identificador da transação.                                                     |
| dados-ec.numero | Numérico     | Sim         | 1..10   | Número de credenciamento da loja com a Cielo.                                   |
| dados-ec.chave  | Alfanumérico | Sim         | 1..100  | Chave de acesso da loja atribuída pela Cielo.                                   |
| valor           | Numérico     | Opcional    | 1..12   | Valor a ser cancelado. **Caso não seja informado, será um cancelamento total.** |

#### Retorno

```xml
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

- a) Prefixo – obrigatoriamente deve iniciar com “ECOMM”;
- b) N.o Afiliação EC – número de afiliação do Estabelecimento Comercial, com a Cielo, deverá conter dez dígitos;
- c) Tipo de operação – deverá conter dois dígitos e para o código do tipo de operação vide tabela acima;
- d) Data de geração do arquivo – data em que o arquivo foi gerado, deve ser no formato yyyymmdd;
- e) Numero do lote – número do lote deverá ser sequencial e conter dez dígitos preenchidos com zeros à esquerda;
- f) Extensão do arquivo – deve ser XML obrigatoriamente.

## Mensagens

### Mensagem de Upload de Arquivo

```xml
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

```xml
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

| Elemento     | Tipo | Obrigatoriedade | Tamanho | Descrição                                                                                      |
| ------------ | ---- | --------------- | ------- | ---------------------------------------------------------------------------------------------- |
| data-envio   | n/a  | n/a             | n/a     | Data e horário de envio da mensagem de upload de arquivo pelo Estabelecimento Comercial        |
| data-retorno | n/a  | n/a             | n/a     | Data e horário que a Cielo respondeu para o Estabelecimento Comercial o recebimento do arquivo |
| mensagem     | n/a  | n/a             | n/a     | Mensagem de resposta enviado pela Cielo                                                        |
| numero-lote  | N    | Sim             | 1..10   | Número do lote que foi solicitado o upload                                                     |

Ao receber esta mensagem, a plataforma Cielo eCommerce verificará se o lote está processado e o se o arquivo está gerado no outbox, com as validações positivas, o arquivo de retorno é devolvido para o Estabelecimento Comercial, caso contrário, será retornado um XML cuja mensagem informa em qual etapa o processo está pendente.

Caso o arquivo tenha sido gerado, porem não está no outbox, pode ter ocorrido limpeza do storage, neste caso, automaticamente, ocorre um evento que solicita a segunda via do arquivo. O Estabelecimento Comercial será informado através de uma mensagem XML retorno, que uma nova requisição deverá ser feita mais tarde, para que um novo arquivo seja gerado.

## Anexo

### Tipos de operações do transacional online

| Tipo de operação | Código |
| ---------------- | ------ |
| Autorização      | 02     |
| Cancelamento     | 03     |
| Captura          | 04     |
| Tokenização      | 05     |
| Consulta         | 06     |
| ConsultaChSeq    | 07     |
| AutorizaçãoTid   | 08     |

### Códigos de resposta

Os erros que podem ser apresentados na mensagem XML, através da TAG <erro>, estão dispostos a seguir:

| Código | Erro                                           | Descrição                                                                     | Ação                                                        |
| ------ | ---------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 071    | Inconsistência no formato do arquivo           | Lote inválido, arquivo não é um XML com formato inválido                      | Rever a formatação do arquivo                               |
| 072    | Este arquivo já foi enviado para processamento | Lote duplicado, já existe um lote com o mesmo numero para o EC                | Rever a sequência numérica dos lotes                        |
| 073    | Tipo de transação inválido                     | Mais de um único tipo de operação no lote                                     | Rever os tipos de transações que estão contemplados no lote |
| 074    | Arquivo inexistente                            | Arquivo não consta na plataforma Cielo eCommerce                              | Rever informações do arquivo enviado anteriormente          |
| 075    | Formatação do XML inválida                     | Erro de parse do arquivo, formatação do xml no arquivo inválida               | Rever a formatação do xml                                   |
| 076    | Nomenclatura incorreta                         | Nomenclatura do arquivo incorreta                                             | Rever estrutura do nome do arquivo                          |
| 079    | Erro inesperado                                | Falha no Sistema                                                              | Persistindo, entrar em contato com o Suporte.               |
| 080    | Inconsistência no conteúdo e nomenclatura      | Tipos diferentes de operações presentes no conteúdo arquivo e na nomenclatura | Rever conteúdo e nomenclatura do arquivo                    |
| 081    | Lote em processamento                          | Lote ainda não processado                                                     | Enviar nova requisição mais tarde                           |
| 082    | Arquivo expirado                               | Arquivo de lote expirado                                                      | Enviar nova requisição mais tarde                           |
| 083    | Numero de lote inválido                        | Numero de lote inválido                                                       | Rever número de lote                                        |
| 084    | Número de EC Inválido                          | Número de EC Inválido                                                         | Rever número do EC                                          |
| 085    | Credenciais inválidas                          | Credenciais inválidas                                                         | Rever credenciais                                           |

### Arquivo ECM-LOTE.XSD

```xml
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

Os testes de integração deverão ser realizados antes do início da homologação, durante o desenvolvimento (codificação) da solução. Para isso, deve-se considerar o seguinte ambiente como EndPoint do Webservice: [https://sandbox1-5.hdevelo.com.br/sandsky/xml](https://sandbox1-5.hdevelo.com.br/sandsky/xml)

<aside class="warning">Toda a conexão aos serviços da Cielo deve ser feita através das URL’s divulgadas neste manual. A Cielo desaconselha fortemente a conexão direta via IP, uma vez que estes podem variar sem aviso prévio.</aside>

## Dados para testes

A massa de dados para realizar os testes neste ambiente está disposta na tabela abaixo:

| Bandeira             | Autenticação | Número do cartão de teste | Validade | Código de segurança - CVC |
| -------------------- | ------------ | ------------------------- | -------- | ------------------------- |
| Visa                 | Sim          | 4012001037141112          | 202405   | 123                       |
| Mastercard           | Sim          | 5453010000066167          | 202405   | 123                       |
| Visa                 | Não          | 4012001038443335          | 202405   | 123                       |
| Mastercard           | Não          | 5453010000066167          | 202405   | 123                       |
| Amex                 | Não          | 376449047333005           | 202405   | 1234                      |
| Diners               | Não          | 36490102462661            | 202405   | 123                       |
| Elo                  | Não          | 6362970000457013          | 202405   | 123                       |
| Elo (Corona Voucher) | Não          | 5067220000000000          | 202405   | 123                       |
| Discover             | Não          | 6011020000245045          | 202405   | 123                       |
| JCB                  | Não          | 3566007770004971          | 202405   | 123                       |
| Aura                 | Não          | 5078601912345600019       | 202405   | 123                       |

## Chave de testes

Para facilitar o desenvolvimento disponibilizamos duas chaves para testes, uma para cada modalidade de integração. Com base nas configurações iniciais feitas durante o seu credenciamento, escolha os dados corretos para realizar os testes:

| Número estabelecimento comercial | Chave de testes                                                  |
| -------------------------------- | ---------------------------------------------------------------- |
| 2000019700                       | 8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120 |

<aside class="warning">O valor do pedido além de seguir o formato sem pontos ou vírgulas decimais, deve terminar em “00”, caso contrário, a autorização será sempre negada. Exemplo: R$ 15,00 deve ser formatado como “1500”.</aside>

<aside class="notice">O ambiente de testes só deve ser utilizado pelos estabelecimentos de testes listados no quadro acima. O uso de dados originais do estabelecimento gerará transações não possíveis de rastreamento, gerando resultados incorretos. No ambiente de testes, use as credenciais para testes, no ambiente de produção, use os dados originais do estabelecimento.</aside>

Após a conclusão do desenvolvimento, a etapa de Homologação garantirá que a implementação foi adequada e a solução do Cliente está apta para interagir no ambiente produtivo da Cielo. Ela sempre acontece depois que o desenvolvimento foi finalizado e testado. É composta pelas seguintes etapas:

![fluxo testes]({{ site.baseurl_root }}/images/fluxo-testes.png)

1. Finalização do Cadastro: nesta etapa o Cliente deve enviar um email para [cieloeCommerce@cielo.com.br](mailto:cieloeCommerce@cielo.com.br), solicitando a Chave de Produção. A mensagem deve conter as
   seguintes informações, que irão completar o cadastro:

- URL Definitiva do site (ambiente de produção).
- Nome da empresa responsável pelo desenvolvimento da integração.
- Nome e e-mail do técnico (desenvolvedor) responsável pela integração.
- Número de credenciamento (junto à Cielo) da loja virtual.
- Razão social e nome fantasia da loja virtual.
- Um usuário e senha na loja virtual para efetuar compras de testes.
- URL do logotipo da loja no formato GIF e tamanho de 112X25 pixels.

<aside class="notice">A imagem do logotipo deve estar hospedada em ambiente seguro (HTTPS), caso contrário o consumidor receberá notificações de segurança que podem culminar no abandono da compra.</aside>

Em resposta, a Cielo retornará uma chave válida no ambiente de produção. Logo, a loja está habilitada a realizar seus testes nesse ambiente. Inicia-se a segunda etapa. É importante que testes sejam realizados para cobrir os seguintes tópicos:

- Interação com o Webservice: testes com a conexão utilizada.
- Integração visual: a ida e a volta do fluxo a Cielo (fluxos alternativos devem ser
- considerados).
- Aplicação correta da marca da bandeira.
- Modalidades de pagamento: testes com as combinações possíveis de pagamento.

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
