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

# Sobre essa documentação

O objetivo desta documentação é orientar sobre a integração da **API E-commerce Cielo**, descrevendo as funcionalidades e os métodos HTTP, listando informações a serem enviadas e recebidas e provendo exemplos.

**Conhecimentos necessários**: recomendamos conhecimentos intermediários em linguagem de programação para web, requisições HTTP/HTTPS e manipulação de arquivos JSON.

Para executar as operações da API E-commerce Cielo você deverá usar sua chave específica (`MerchantId` e `MerchantKey`) nos respectivos endpoints dos ambientes:

|                  |                       Sandbox                       |                   Produção                    |
| :--------------- | :-------------------------------------------------: | :-------------------------------------------: |
| **Transacional** |   https://apisandbox.cieloecommerce.cielo.com.br    |   https://api.cieloecommerce.cielo.com.br/    |
| **Consultas**    | https://apiquerysandbox.cieloecommerce.cielo.com.br | https://apiquery.cieloecommerce.cielo.com.br/ |

Para executar uma operação, combine a URL base do ambiente com a URL da operação desejada e envie utilizando o verbo HTTP conforme descrito na operação.

> [Faça o download do tutorial]({{ site.baseurl }}/attachment/merchantid-merchantkey-cielo.pdf){:target="\_blank"} para saber como gerar seu **MerchantId** e **MerchantKey** no [portal da Cielo](https://www.cielo.com.br/){:target="\_blank"}.

## Características da solução

A solução **API e-commerce Cielo** foi desenvolvida com a tecnologia REST, que é padrão de mercado e independe da tecnologia utilizada pelo seu e-commerce. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação.

Para obter exemplos dessas linguagens, veja nosso [**Tutorial de conversão Postman**](https://developercielo.github.io/tutorial/postman){:target="\_blank"}.

Entre outras características, os atributos que mais se destacam na plataforma API e-commerce Cielo:

- **Ausência de aplicativos proprietários**: não é necessário instalar aplicativos no ambiente da loja virtual em nenhuma hipótese.
- **Simplicidade**: o protocolo utilizado é puramente o HTTPS.
- **Facilidade de testes**: a plataforma Cielo oferece um ambiente Sandbox publicamente acessível, que permite ao desenvolvedor a criação de uma conta de testes sem a necessidade de credenciamento, facilitando e agilizando o início da integração.
- **Credenciais**: o tratamento das credenciais do cliente, número de afiliação (`MerchantId`)e chave de acesso`(MerchantKey`) trafega no cabeçalho da requisição HTTP da mensagem.
- **Segurança**: a troca de informações se dá sempre entre o Servidor da Loja e da Cielo, ou seja, sem o browser do comprador.
- **Multiplataforma**: a integração é realizada através de Web Service REST.

## Arquitetura da integração

O modelo empregado na integração das APIs é simples e se baseia na utilização de duas URLs:

- URL transacional - específica para operações como autorização, captura e cancelamento de transações.
- URL de consulta - para operações consultivas, como uma pesquisa de transações.

<br/>Para executar uma operação:

1. Combine a **base** da URL do ambiente com o **_endpoint_** da operação desejada. Ex.: https://api.braspag.com.br/*v2/sales/*.
2. Envie a requisição para a URL utilizando o método HTTP adequado à operação.

| Método HTTP | Descrição                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| **GET**     | Retorna recursos já existentes, ex.: consulta de transações.                                         |
| **POST**    | Cria um novo recurso, ex.: criação de uma transação.                                                 |
| **PUT**     | Atualiza um recurso existente, ex.: captura ou cancelamento de uma transação previamente autorizada. |

Todas a operações requerem as credenciais de acesso **`MerchantId`** e **`MerchantKey`**, que devem ser enviadas no cabeçalho (_header_) da requisição.<br>
<br>Cada envio de requisição irá retornar um código de [Status HTTP](https://braspag.github.io//manual/braspag-pagador?json#lista-de-http-status-code), indicando se ela foi realizada com sucesso ou não.

## Glossário

Para facilitar o entendimento, listamos abaixo um pequeno glossário com os principais termos relacionados ao eCommerce, ao mercado de cartões e adquirencia:

| Termo                               | Descrição                                                                                                                                                                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Autenticação**                    | processo para assegurar que o comprador é realmente aquele quem diz ser (portador legítimo), geralmente ocorre no banco emissor com uso de um token digital ou cartão com chaves de segurança.                                                                                           |
| **Autorização**                     | processo para verificar se uma compra pode ou não ser realizada com um cartão. Nesse momento, são feitas diversas verificações com o cartão e com o portador (ex.: adimplência, bloqueios, etc.) É também neste momento que o limite do cartão é sensibilizado com o valor da transação. |
| **Cancelamento**                    | processo para cancelar uma compra realizada com cartão.                                                                                                                                                                                                                                  |
| **Captura**                         | processo que confirma uma autorização que foi realizada previamente. Somente após a captura, é que o portador do cartão poderá visualizá-la em seu extrato ou fatura.                                                                                                                    |
| **Comprador**                       | É aquele que efetua compra na loja virtual.                                                                                                                                                                                                                                              |
| **Emissor (ou banco emissor)**      | É a instituição financeira que emite o cartão de crédito, débito ou voucher.                                                                                                                                                                                                             |
| **Estabelecimento comercial ou EC** | É o número de dez posições que identifica o cadastro da loja na Cielo.                                                                                                                                                                                                                   |
| **Gateway de pagamentos**           | Empresa responsável pelo integração técnica e processamento das transações.                                                                                                                                                                                                              |
| **Portador**                        | É a pessoa que tem o porte do cartão no momento da venda.                                                                                                                                                                                                                                |
| **TID (Transaction Identifier)**    | código composto por 20 caracteres que identificada unicamente uma transação e-commerce Cielo.                                                                                                                                                                                            |

## Produtos e bandeiras suportadas

A versão atual da API e-commerce Cielo possui suporte às seguintes bandeiras e produtos:

| Bandeira         | Crédito à vista | Crédito parcelado Loja | Débito | Voucher | Internacional |
| ---------------- | --------------- | ---------------------- | ------ | ------- | ------------- |
| Visa             | Sim             | Sim                    | Sim    | _Não_   | Sim           |
| Master Card      | Sim             | Sim                    | Sim    | _Não_   | Sim           |
| American Express | Sim             | Sim                    | _Não_  | _Não_   | Sim           |
| Elo              | Sim             | Sim                    | _Não_  | _Não_   | Sim           |
| Diners Club      | Sim             | Sim                    | _Não_  | _Não_   | Sim           |
| Discover         | Sim             | Não                    | _Não_  | _Não_   | Sim           |
| JCB              | Sim             | Sim                    | _Não_  | _Não_   | Sim           |
| Aura             | Sim             | Sim                    | _Não_  | _Não_   | Sim           |
| Hipercard        | Sim             | Sim                    | _Não_  | _Não_   | _Não_         |

<aside class="warning">Cartões emitidos no exterior não possuem permissão de parcelamento.</aside>

## Suporte Cielo

Caso tenha dúvidas envie um e-mail para: **cieloecommerce@cielo.com.br**

Ou, se preferir, entre em contato com a gente pela **Central de Atendimento**:

- Capitais e regiões metropolitanas: **(11) 4002-9700**
- Demais localidades: **0800 570 1700**

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

- [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
- [Certificado Intermediária]({{ site.baseurl }}/attachment/Intermediate1.crt)
- [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/cieloecommerce.cert-2022-2023.zip)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning"><b>A Cielo não oferece suporte para a instalação do Certificado.</b></aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

**1o Passo:**

Salvar os três arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

- [Certificado Raiz]({{ site.baseurl_root }}/attachment/Root.crt)
- [Certificado Intermediária]({{ site.baseurl_root }}/attachment/intermediate1.crt)
- [Certificado E-Commerce Cielo]({{ site.baseurl_root }}/attachment/intermediate2.cer)

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

| INFORMAÇÃO                 | URL                                                                                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Credenciais de acesso      | `MerchantId` e `MerchantKey` obtidos após criação da conta de testes em [**Cadastro do Sandbox**](https://cadastrosandbox.cieloecommerce.cielo.com.br/){:target="\_blank"} |
| Base da URL transacional   | https://apisandbox.cieloecommerce.cielo.com.br                                                                                                                             |
| Base da URL para consultas | https://apiquerysandbox.cieloecommerce.cielo.com.br                                                                                                                        |

**Vantagens de utilizar o Sandbox**

- Não é necessário uma afiliação para utilizar o Sandbox Cielo.
- Basta acessar o [**Cadastro do Sandbox**](https://cadastrosandbox.cieloecommerce.cielo.com.br/){:target="\_blank"} para criar uma conta.

## Ferramenta para Integração

Você pode usar o Postman para testar a sua integração, usando a collection da API e-commerce Cielo.

### Collection

> **Link de importação**: [https://www.postman.com/collections/7313fe78130211f5f009](https://www.postman.com/collections/7313fe78130211f5f009){:target="\_blank"}

| Ambiente | Endpoints                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sandbox  | **Envio de transação**: https://apisandbox.cieloecommerce.cielo.com.br <br> **Consulta transação**: https://apiquerysandbox.cieloecommerce.cielo.com.br/ |
| Produção | **Envio de transação**: https://api.cieloecommerce.cielo.com.br/ <br> **Consulta transação**: https://apiquery.cieloecommerce.cielo.com.br/              |

### Environment

Faça download do arquivo [**Environment Produção e Sandbox**](https://github.com/DeveloperCielo/developercielo.github.io/blob/docs/attachment/postman/apicielo2021.rar){:target="\_blank"} e substitua os MerchantIDs e MerchantKeys pelos os da sua Loja.

## Cartão de crédito - Sandbox

Com esse meio de pagamento é possível simular os fluxos de:

- Autorização;
- Captura parcial e total;
- Cancelamento;
- Consulta.<br/>

Para melhor aproveitar o meio de pagamento Simulado, você pode criar um número de cartão usando um gerador de cartões da internet ou escolhendo números aleatórios; para qualquer opção, os 15 primeiros dígitos do cartão podem ser aleatórios e o último dígito deve ser o número correspondente ao status da transação que deseja testar.

As informações de **Cód.Segurança (CVV)** e validade podem ser aleatórias, mantendo o CVV com 3 dígitos e a validade no formato MM/YYYY.

<aside class="notice">Tokenização: Se o objetivo for testar uma transação na API Cielo E-commerce salvando o número do cartão, recomendamos usar um gerador de cartões para atender a regra do mod10 (Algoritimo de Luhn), que é empregada nos ambientes Sandbox e de Produção.</aside>
<br/>
<aside class="notice">Para simular um cenário de autorização com sucesso de uma solicitação de Zeroauth no sandbox, é necessário enviar a requisição com um número de cartão iniciado com o dígito 5, independente da bandeira (exemplo: **5XXX.XXXX.XXXX.XXX4**).</aside>
<br/>
<aside class="notice">Os <code>status</code> das transações são definidos pelos FINAIS de cada cartão, assim como o <code>ReturnCode</code>.</aside>

| Final do Cartão                                                   | Status da Transação   | Código de Retorno | Mensagem de Retorno               |
| ----------------------------------------------------------------- | --------------------- | ----------------- | --------------------------------- |
| XXXX.XXXX.XXXX.XXX0<br>XXXX.XXXX.XXXX.XXX1<br>XXXX.XXXX.XXXX.XXX4 | Autorizado            | 4/6               | Operação realizada com sucesso    |
| XXXX.XXXX.XXXX.XXX2                                               | Não Autorizado        | 05                | Não Autorizada                    |
| XXXX.XXXX.XXXX.XXX3                                               | Não Autorizado        | 57                | Cartão Expirado                   |
| XXXX.XXXX.XXXX.XXX5                                               | Não Autorizado        | 78                | Cartão Bloqueado                  |
| XXXX.XXXX.XXXX.XXX6                                               | Não Autorizado        | 99                | Time Out                          |
| XXXX.XXXX.XXXX.XXX7                                               | Não Autorizado        | 77                | Cartão Cancelado                  |
| XXXX.XXXX.XXXX.XXX8                                               | Não Autorizado        | 70                | Problemas com o Cartão de Crédito |
| XXXX.XXXX.XXXX.XXX9                                               | Autorização Aleatória | 4 a 99            | Operation Successful / Time Out   |

O cartão de teste **4024.0071.5376.3191**, por exemplo, irá simular o status autorizado.

<aside class="notice"><strong>Atenção:</strong> O ambiente de sandbox avalia o formato e o final do cartão. Caso um cartão real seja enviado, o resultado da operação será idêntico ao descrito na tabela de cartões de teste.</aside>
<br/>
<aside class="warning">Atenção: Os códigos de retorno em Sandbox não são os mesmos disponiveis em produção.</aside>

**Para consultar os retornos em Produção**, veja os [Códigos da API](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-da-api).

## Cartão de débito - Sandbox

Com esse meio de pagamento é possível simular os fluxos de:

- Autorização;
- Cancelamento;
- Consulta.
  <br/>
  A transação de débito precisa passar por uma autenticação:

- **Autenticação via 3DS 2.0**: aprenda a simular a autenticação 3DS 2.0 em sandbox na [documentação do 3DS](https://developercielo.github.io/manual/3ds);
- **URL de Autenticação**: está sendo descontinuada. Nesse tipo de autenticação, o fluxo transacional do cartão de débito funciona com a Resposta da transação retornando uma URL de Autenticação. Na tela de autenticação a opção escolhida define o status da transação:
  <br/>

| Opção           | Status         |
| --------------- | -------------- |
| Autenticado     | Autorizado     |
| Não Autenticado | Negado         |
| Não usar a URL  | Não Finalizado |

<aside class="notice"><strong>Transferência Online:</strong> O mesmo comportamento do Cartão de débito em Sandbox é valido para cartão de débito</aside>

## Outros meios de pagamento - Sandbox

Outros meios de pagamento não possuem cartões ou dados específicos simulados, como no caso do cartão de crédito.
Abaixo especificamos qualquer diferença existente:

| Meio de pagamento        | Orientações para Sandbox                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boleto                   | Para enviar uma transação de boleto no ambiente sandbox você deve colocar o `Provider` como **"Simulado"**.<br>Não há validação bancária. O boleto se comporta como um boleto sem registro. |
| Alelo                    | Use os mesmos valores da requisição do ambiente de produção para [Cartões Alelo](https://developercielo.github.io/manual/cielo-ecommerce#cart%C3%B5es-alelo).                               |
| QR Code                  | Use os mesmos valores da requisição do ambiente de produção para [QR Code](https://developercielo.github.io/manual/cielo-ecommerce#qr-code). Não tem a conciliação bancária.                |
| Carnê                    | Use os mesmos valores da requisição do ambiente de produção para [Carnê](https://developercielo.github.io/manual/cielo-ecommerce#carn%C3%AA).                                               |
| Transferência eletrônica | O `Provider` utilizado deve ser **"Simulado"** <br><br> A URL de redirecionamento para o ambiente do banco será uma tela para escolher o estado da autenticação.                            |

## Renova Fácil – Sandbox

Para simular uma transação com retorno de um novo cartão, atualizado pelo nosso serviço [Renova Fácil]({{ site.baseurl }}https://developercielo.github.io/manual/cielo-ecommerce#renova-f%C3%A1cil){:target="_blank"}, siga as orientações abaixo. Para saber mais como funciona a funcionalidade, acesse o menu “Recorrência” e depois “Renova Fácil”.

Na requisição de autorização, além dos campos já previstos para o meio de pagamento utilizado, é necessário enviar os seguintes:

- No campo `CreditCard.CardNumber`: enviar um cartão com o número final sendo 3 (que simula um cenário de cartão vencido, vide tabela de cartões simulados presente na documentação).
- No campo `CreditCard.ExpirationDate`: enviar uma data de validade já vencida.
- Mandar o campo `Payment.Recurrent` preenchido como true, para marcar a transação como recorrente.

## Consulta BIN - Sandbox

O BIN de um cartão é composto pelos seis primeiros dígitos. Na simulação da Consulta BIN em ambiente sandbox, cada um dos seis primeiros dígitos vai reger um resultado simulado.

É possível montar uma numeração de cartão para teste e observar o retorno esperado de acordo com diferentes cenários.

O BIN de um cartão retorna a bandeira, o tipo, a nacionalidade, se o cartão é corporativo ou não, o retorno da análise de BIN e o emissor do cartão. Para saber mais, leia a seção [**Consulta BIN**](https://developercielo.github.io/manual/cielo-ecommerce#consulta-bin) neste mesmo manual.

| Dígito    | O que indica                      | Retorno                                                                                                                                                                                                        |
| --------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1º dígito | Bandeira.                         | Se for '**3**' retorna "**AMEX**"<br>Se for '**5**' retorna "**MASTERCARD**"<br>Se for '**6**' retorna "**DISCOVER**"<br>Qualquer outro número retorna "**VISA**".                                             |
| 2º dígito | Tipo do cartão.                   | Se for '**3**' retorna "**Débito**"<br>Se for '**5**' retorna "**Crédito**"<br>Se for '**7**' retorna "**Crédito**" e retorna o campo `Prepaid`como "**true**"<br>Qualquer outro número retorna"**Múltiplo**". |
| 3º dígito | Nacionalidade do cartão.          | Se for '**1**' retorna "**true**" (cartão nacional)<br>Qualquer número diferente de '**1**' retorna "**false**" (cartão internacional).                                                                        |
| 4º dígito | Se o cartão é corporativo ou não. | Se for '**1**' retorna "**true**" (é cartão corporativo)<br>Qualquer número diferente de '**1**' retorna "**false**" (não é cartão corporativo).                                                               |
| 5º dígito | Retorno da análise.               | Se for '**2**' retorna "**01 - Bandeira não suportada**"<br>Se for '**3**' retorna "**02 - Voucher - Não suportado na consulta de bins**"<br>Qualquer outro número retorna "**00 - Analise autorizada**"       |
| 6º dígito | Banco emissor.                    | Se for '**1**' retorna "**104**" e "**Caixa**"<br>Se for '**2**' retorna "**001**" e "**Banco do Brasil**"<br>Qualquer outro número retorna "**237**" e "**Bradesco**"                                         |

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

| Conceito         | Descrição                                                                                                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Autenticação** | É um processo de verificação do portador do cartão realizado pelo banco emissor para trazer mais segurança para a venda. Em caso de fraude em transação autenticada, o custo do chargeback é do emissor.                                                                                         |
| **Autorização**  | Etapa em que a Cielo faz a conexão com o sistema do banco emissor e da bandeira para aprovar uma transação de cartão. A pré-autorização apenas sensibiliza o limite do cliente, mas ainda não gera cobrança para o consumidor. Para efetivação da cobrança é necessária a ocorrência da captura. |
| **Captura**      | Após a autorização, para que a venda seja concretizada e a cobrança seja efetivada no cartão, ocorre o movimento de captura.                                                                                                                                                                     |
| **Cancelamento** | O cancelamento acontece quando o estabelecimento não quer mais prosseguir com uma transação. Esse movimento pode ser realizado tanto para transações autorizadas quanto para capturadas.                                                                                                         |

<aside class="warning">IMPORTANTE: O número de identificação do pedido (`MerchantOrderId`) não sofre alteração ao longo do fluxo transacional. Contudo, um número adicional pode ser gerado para o pedido e utilizado durante a transação. Esse número só será diferente em caso de adequação a regras da adquirente ou em caso de números de identificação do pedido (`MerchantOrderId`) repetidos. Para fins de conciliação, use o `TransactionId`.</aside>

#### Criando uma transação de crédito

Para criar uma transação de cartão de crédito, envie uma requisição utilizando o método `POST` conforme o exemplo a seguir. Esse exemplo contempla todos os campos possíveis que você pode enviar; consulte quais campos são ou não obrigatórios na tabela de propriedades da requisição.

> A **captura** da transação da crédito pode ser **automática** ou **posterior**. Para captura automática, envie o campo `Payment.Capture` na requisição como “true”. Para captura posterior, envie o campo como "false" e, posteriormente, faça a [requisição de captura](https://developercielo.github.io/manual/cielo-ecommerce#captura).

<aside class="notice"><strong>Atenção:</strong> Não é possível realizar uma transação com valor (`Amount`) 0.</aside>

<aside class="notice"><strong>Atenção:</strong> No header da requisição, use o Content-Type application/json .</aside>

Saiba como realizar uma transação de crédito com autenticação em [Autenticando uma Transação](https://developercielo.github.io/manual/cielo-ecommerce#cart%C3%A3o-de-cr%C3%A9dito-com-autentica%C3%A7%C3%A3o).

##### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador crédito completo",
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
    }
  },
  "Payment": {
    "Currency": "BRL",
    "Country": "BRA",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": "false",
    "Recurrent": "false",
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "SaveCard": "false",
      "Brand": "Visa",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "Type": "CreditCard",
    "Amount": 15700,
    "AirlineData": {
      "TicketNumber": "AR988983"
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
     "Recurrent":"false",
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

| Propriedade                           | Tipo         | Tamanho | Obrigatório         | Descrição                                                                                                                                                                                                                                                                                          |
| ------------------------------------- | ------------ | ------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`                          | Guid         | 36      | Sim                 | Identificador da loja na Cielo.                                                                                                                                                                                                                                                                    |
| `MerchantKey`                         | Texto        | 40      | Sim                 | Chave pública para autenticação dupla na Cielo.                                                                                                                                                                                                                                                    |
| `Content-Type`                        | Header       | 40      | Sim                 | application/json (envio obrigatório).                                                                                                                                                                                                                                                              |
| `RequestId`                           | Guid         | 36      | Não                 | Identificador da requisição, usado quando o lojista usa diferentes servidores para cada GET/POST/PUT.                                                                                                                                                                                              |
| `MerchantOrderId`                     | Texto        | 50      | Sim                 | Número de identificação do pedido.                                                                                                                                                                                                                                                                 |
| `Customer.Name`                       | Texto        | 255     | Não                 | Nome do comprador.                                                                                                                                                                                                                                                                                 |
| `Customer.Status`                     | Texto        | 255     | Não                 | Status de cadastro do comprador na loja (NEW / EXISTING)                                                                                                                                                                                                                                           |
| `Customer.Identity`                   | Texto        | 14      | Não                 | Número do RG, CPF ou CNPJ do comprador.                                                                                                                                                                                                                                                            |
| `Customer.IdentityType`               | Texto        | 255     | Não                 | Tipo de documento de identificação do comprador (CFP/CNPJ).                                                                                                                                                                                                                                        |
| `Customer.Email`                      | Texto        | 255     | Não                 | E-mail do comprador.                                                                                                                                                                                                                                                                               |
| `Customer.Birthdate`                  | Date         | 10      | Não                 | Data de nascimento do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.Street`             | Texto        | 255     | Não                 | Endereço do comprador.                                                                                                                                                                                                                                                                             |
| `Customer.Address.Number`             | Texto        | 15      | Não                 | Número do endereço do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.Complement`         | Texto        | 50      | Não                 | Complemento do endereço do comprador                                                                                                                                                                                                                                                               |
| `Customer.Address.ZipCode`            | Texto        | 9       | Não                 | CEP do endereço do comprador.                                                                                                                                                                                                                                                                      |
| `Customer.Address.City`               | Texto        | 50      | Não                 | Cidade do endereço do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.State`              | Texto        | 2       | Não                 | Estado do endereço do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.Country`            | Texto        | 35      | Não                 | País do endereço do comprador.                                                                                                                                                                                                                                                                     |
| `Customer.DeliveryAddress.Street`     | Texto        | 255     | Não                 | Endereço do comprador.                                                                                                                                                                                                                                                                             |
| `Customer.Address.Number`             | Texto        | 15      | Não                 | Número do endereço do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.DeliveryAddress.Complement` | Texto        | 50      | Não                 | Complemento do endereço do comprador.                                                                                                                                                                                                                                                              |
| `Customer.DeliveryAddress.ZipCode`    | Texto        | 9       | Não                 | CEP do endereço do comprador.                                                                                                                                                                                                                                                                      |
| `Customer.DeliveryAddress.City`       | Texto        | 50      | Não                 | Cidade do endereço do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.DeliveryAddress.State`      | Texto        | 2       | Não                 | Estado do endereço do comprador.                                                                                                                                                                                                                                                                   |
| `Customer.DeliveryAddress.Country`    | Texto        | 35      | Não                 | País do endereço do comprador.                                                                                                                                                                                                                                                                     |
| `Customer.Billing.Street`             | string       | 24      | não                 | Logradouro do endereço de cobrança.                                                                                                                                                                                                                                                                |
| `Customer.Billing.Number`             | string       | 5       | não                 | Número do endereço de cobrança.                                                                                                                                                                                                                                                                    |
| `Customer.Billing.Complement`         | string       | 14      | não                 | Complemento do endereço de cobrança.                                                                                                                                                                                                                                                               |
| `Customer.Billing.Neighborhood`       | string       | 15      | não                 | Bairro do endereço de cobrança.                                                                                                                                                                                                                                                                    |
| `Customer.Billing.City`               | string       | 20      | não                 | Cidade do endereço de cobrança.                                                                                                                                                                                                                                                                    |
| `Customer.Billing.State`              | string       | 2       | não                 | Estado do endereço de cobrança.                                                                                                                                                                                                                                                                    |
| `Customer.Billing.Country`            | string       | 2       | não                 | País do endereço de cobrança. Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui){:target="\_blank"}                                                                                                                                                                  |
| `Customer.Billing.ZipCode`            | string       | 9       | não                 | Código postal do endereço de cobrança.                                                                                                                                                                                                                                                             |
| `Payment.Type`                        | Texto        | 100     | Sim                 | Tipo do meio de pagamento.                                                                                                                                                                                                                                                                         |
| `Payment.Amount`                      | Número       | 15      | Sim                 | Valor do pedido (ser enviado em centavos).                                                                                                                                                                                                                                                         |
| `Payment.Currency`                    | Texto        | 3       | Não                 | Moeda na qual o pagamento será feito (BRL).                                                                                                                                                                                                                                                        |
| `Payment.Country`                     | Texto        | 3       | Não                 | País na qual o pagamento será feito.                                                                                                                                                                                                                                                               |
| `Payment.Provider`                    | Texto        | 15      | ---                 | Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.                                                                                                                                                                                                                |
| `Payment.ServiceTaxAmount`            | Número       | 15      | Não                 | Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.                                                                                                                       |
| `Payment.SoftDescriptor`              | Texto        | 13      | Não                 | O complemento do nome da loja que aparecerá na fatura do cartão. Não permite caracteres especiais.                                                                                                                                                                                                 |
| `Payment.Installments`                | Número       | 2       | Sim                 | Número de Parcelas.                                                                                                                                                                                                                                                                                |
| `Payment.Interest`                    | Texto        | 10      | Não                 | Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).                                                                                                                                                                                                                                     |
| `Payment.Capture`                     | Booleano     | ---     | Não (Default false) | Booleano que identifica que a autorização deve ser com **captura automática ("true")** ou **[captura posterior](https://developercielo.github.io/manual/cielo-ecommerce#captura) ("false")**.                                                                                                      |
| `Payment.Authenticate`                | Booleano     | ---     | Não (Default false) | Define se o comprador será direcionado ao banco emissor para autenticação do cartão.                                                                                                                                                                                                               |
| `Payment.Recurrent`                   | Booleano     | -       | Não                 | Indica se a transação é do tipo recorrente (“true”) ou não (“false”). O valor “true” não originará uma nova recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. Authenticate deve ser “false” quando Recurrent é “true”.                                |
| `Payment.IsCryptocurrencyNegotiation` | Booleano     | -       | Não (default false) | Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda.                                                                                                                                                                                                |
| `Payment.AirlineData.TicketNumber`    | alfanumérico | 13      | Não                 | Informar o número do principal bilhete aéreo da transação.                                                                                                                                                                                                                                         |
| `CreditCard.CardNumber`               | Texto        | 19      | Sim                 | Número do cartão do comprador.                                                                                                                                                                                                                                                                     |
| `CreditCard.Holder`                   | Texto        | 25      | Não                 | Nome do comprador impresso no cartão. Não aceita caracteres especiais ou acentuação.                                                                                                                                                                                                               |
| `CreditCard.ExpirationDate`           | Texto        | 7       | Sim                 | Data de validade impressa no cartão. Ex. MM/AAAA.                                                                                                                                                                                                                                                  |
| `CreditCard.SecurityCode`             | Texto        | 4       | Não                 | Código de segurança impresso no verso do cartão.                                                                                                                                                                                                                                                   |
| `CreditCard.SaveCard`                 | Booleano     | ---     | Não (Default false) | Booleano que identifica se o cartão será salvo para gerar o `CardToken`.                                                                                                                                                                                                                           |
| `CreditCard.Brand`                    | Texto        | 10      | Sim                 | Bandeira do cartão. Valores possíveis: Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.                                                                                                                                                                            |
| `CreditCard.CardOnFile.Usage`         | Texto        | -       | Não                 | **First** se o cartão foi armazenado e é seu primeiro uso.<br>**Used** se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação                                                                                                                                          |
| `CreditCard.CardOnFile.Reason`        | Texto        | -       | Condicional         | Indica o propósito de armazenamento de cartões, caso o campo "Usage" for "Used".<BR>**Recurring** - Compra recorrente programada (ex. assinaturas)<br>**Unscheduled** - Compra recorrente sem agendamento (ex. aplicativos de serviços)<br>**Installments** - Parcelamento através da recorrência. |

##### Resposta

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
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
      "SaveCard": false,
      "Brand": "Visa",
      "PaymentAccountReference": "92745135160550440006111072222",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "TryAutomaticCancellation": true,
    "ProofOfSale": "674532",
    "Tid": "0305020554239",
    "AuthorizationCode": "123456",
    "SoftDescriptor": "123456789ABCD",
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 15700,
    "CapturedAmount": 15700,
    "Country": "BRA",
    "AirlineData": {
      "TicketNumber": "AR988983"
    },
    "ExtraDataCollection": [],
    "Status": 2,
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "MerchantAdviceCode": "1",
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
        "MerchantAdviceCode":"1",
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

| Propriedade                          | Descrição                                                                                                                                                                                                                                                                                                                                                                                | Tipo         | Tamanho | Formato                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- | ------------------------------------ |
| `ProofOfSale`                        | Número da autorização, identico ao NSU.                                                                                                                                                                                                                                                                                                                                                  | Texto        | 6       | Texto alfanumérico                   |
| `Tid`                                | Id da transação na adquirente.                                                                                                                                                                                                                                                                                                                                                           | Texto        | 20      | Texto alfanumérico                   |
| `AuthorizationCode`                  | Código de autorização.                                                                                                                                                                                                                                                                                                                                                                   | Texto        | 6       | Texto alfanumérico                   |
| `SoftDescriptor`                     | Texto impresso na fatura bancaria do portador. Não permite caracteres especiais.                                                                                                                                                                                                                                                                                                         | Texto        | 13      | Texto alfanumérico                   |
| `PaymentId`                          | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.                                                                                                                                                                                                                                                                           | Guid         | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                                | Eletronic Commerce Indicator. Representa o quão segura é uma transação.                                                                                                                                                                                                                                                                                                                  | Texto        | 2       | Exemplos: 7                          |
| `Status`                             | Status da Transação.                                                                                                                                                                                                                                                                                                                                                                     | Byte         | ---     | 2                                    |
| `ReturnCode`                         | Código de retorno da Adquirência.                                                                                                                                                                                                                                                                                                                                                        | Texto        | 32      | Texto alfanumérico                   |
| `ReturnMessage`                      | Mensagem de retorno da Adquirência.                                                                                                                                                                                                                                                                                                                                                      | Texto        | 512     | Texto alfanumérico                   |
| `MerchantAdviceCode`                 | Código de retorno da bandeira que define período para retentativa. _Válido somente para bandeira Mastercard_. [Veja mais informações sobre Merchant Advice Code aqui](https://developercielo.github.io/manual/3ds){:target="\_blank"}.                                                                                                                                                   | Texto        | 2       | Numérico                             |
| `TryAutomaticCancellation`           | Caso ocorra algum erro durante a autorização (status Não Finalizada - "0"), a resposta incluirá o campo “TryAutomaticCancellation” como true. Neste caso, a transação será consultada automaticamente, e caso tenha sido autorizada será cancelada automaticamente. Esta funcionalidade deverá estar habilitada para loja. Para habilitar, entre em contato com o nosso suporte técnico. | Booleano     | -       | true ou false                        |
| `CreditCard.PaymentAccountReference` | O PAR (Payment Account Reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado.Se for pra transação de débito, colocar o campo dentro do nó de `DebitCard`.                                              | Alfanumérico | 29      | ---                                  |

<aside class="warning">Atenção: Os retornos de autorização estão sujeitos a inserção de novos campos advindos das bandeiras/emissores. Faça sua integração de forma a prever este tipo de comportamento utilizando adequadamente as técnicas de serialização e deserialização de objetos.</aside>

### Cartão de Débito

Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo.

Todas as transações de débito devem ser autenticadas por exigência dos bancos emissores e bandeiras, com o objetivo de promover maior segurança.

Para autenticar uma transação de débito, usamos o protocolo EMV 3DS 2.0; esse protocolo é um script integrado ao seu e-commerce que verifica a identidade do portador do cartão enquanto mantém uma boa experiência de compra ao consumidor e reduz o risco de fraude.

Para integrar o método de autenticação, consulte a [documentação do 3DS 2.0](https://developercielo.github.io/manual/3ds){:target="\_blank"}.

<aside class="warning">IMPORTANTE: A Cielo não disponibiliza mais a primeira versão do protocolo de autenticação (3DS 1.0) já que as bandeiras e emissores estão descontinuando essa solução.</aside>

> **Débito sem autenticação**: ou “débito sem senha”, só pode ser realizada quando o e-commerce tem autorização do banco emissor para dispensa da autenticação. Caso você tenha essa permissão, envie o campo `Authenticate` como "false" na requisição padrão de cartão de débito.

#### Criando uma transação de débito

Para criar uma venda com cartão de débito, chame o método POST conforme o exemplo a seguir. O exemplo contempla o mínimo de campos necessários que devem ser enviados para a autorização.

> Na transação de débito padrão (com autenticação), envie `Authenticate` = "true".

##### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014121201",
  "Customer": {
    "Name": "Comprador Cartão de débito"
  },
  "Payment": {
    "Type": "DebitCard",
    "Authenticate": true,
    "Amount": 15700,
    "DebitCard": {
      "CardNumber": "5551870000000181",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "Brand": "Master"
    },
    "ExternalAuthentication": {
      "Cavv": "AAABB2gHA1B5EFNjWQcDAAAAAAB=",
      "Xid": "Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
      "Eci": "5",
      "Version": "2",
      "ReferenceID": "a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
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
      "Name":"Comprador Cartão de débito"
   },
   "Payment":{
      "Type":"DebitCard",
      "Authenticate":true,
      "Amount":15700,
      "DebitCard":{
         "CardNumber":"5551870000000181",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Master"
      },
      "ExternalAuthentication":{
         "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
         "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
         "Eci":"5",
         "Version":"2",
         "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
      }
   }
}
--verbose
```

| Propriedade                                  | Descrição                                                                                             | Tipo     | Tamanho | Obrigatório         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------- |
| `MerchantId`                                 | Identificador da loja na API Cielo eCommerce.                                                         | Guid     | 36      | Sim                 |
| `MerchantKey`                                | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto    | 40      | Sim                 |
| `RequestId`                                  | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid     | 36      | Não                 |
| `MerchantOrderId`                            | Numero de identificação do Pedido.                                                                    | Texto    | 50      | Sim                 |
| `Customer.Name`                              | Nome do Comprador.                                                                                    | Texto    | 255     | Não                 |
| `Customer.Status`                            | Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude           | Texto    | 255     | Não                 |
| `Payment.Type`                               | Tipo do Meio de Pagamento.                                                                            | Texto    | 100     | Sim                 |
| `Payment.Amount`                             | Valor do Pedido (ser enviado em centavos).                                                            | Número   | 15      | Sim                 |
| `Payment.Authenticate`                       | Define se o comprador será direcionado ao Banco emissor para autenticação do cartão                   | Booleano | ---     | Sim                 |
| `Payment.ReturnUrl`                          | URI para onde o usuário será redirecionado após o fim do pagamento                                    | Texto    | 1024    | Sim                 |
| `Payment.IsCryptocurrencyNegotiation`        | Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda    | Booleano | -       | Não (default false) |
| `DebitCard.CardNumber`                       | Número do Cartão do Comprador.                                                                        | Texto    | 19      | Sim                 |
| `DebitCard.Holder`                           | Nome do Comprador impresso no cartão.                                                                 | Texto    | 25      | Não                 |
| `DebitCard.ExpirationDate`                   | Data de validade impresso no cartão.                                                                  | Texto    | 7       | Sim                 |
| `DebitCard.SecurityCode`                     | Código de segurança impresso no verso do cartão.                                                      | Texto    | 4       | Não                 |
| `DebitCard.Brand`                            | Bandeira do cartão.                                                                                   | Texto    | 10      | Sim                 |
| `Payment.ExternalAuthentication.Eci`         | E-Commerce Indicator retornado no processo de autenticação.                                           | Numérico | 1       | Sim                 |
| `Payment.ExternalAuthentication.ReferenceId` | `RequestID` retornado no processo de autenticação.                                                    | GUID     | 36      | Sim                 |

##### Resposta

```json
{
  "MerchantOrderId": "2014121201",
  "Customer": {
    "Name": "Comprador Cartão de débito"
  },
  "Payment": {
    "DebitCard": {
      "CardNumber": "555187******0181",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SaveCard": false,
      "Brand": "Master",
      "PaymentAccountReference": "IC722LCXBROSHBPIBK7B44MBXO5HF"
    },
    "Provider": "Simulado",
    "AuthorizationCode": "635288",
    "Tid": "0826104754051",
    "ProofOfSale": "132471",
    "Authenticate": true,
    "ExternalAuthentication": {
      "Cavv": "AAABB2gHA1B5EFNjWQcDAAAAAAB=",
      "Xid": "Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
      "Eci": "5",
      "Version": "2",
      "ReferenceId": "a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
    },
    "Recurrent": false,
    "Amount": 15700,
    "ReceivedDate": "2022-08-26 10:47:53",
    "CapturedAmount": 15700,
    "CapturedDate": "2022-08-26 10:47:54",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "PaymentId": "21c9a3e7-23c2-420b-b12d-b514ef271c85",
    "Type": "DebitCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/21c9a3e7-23c2-420b-b12d-b514ef271c85"
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
            "CardNumber": "555187******0181",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Master",
            "PaymentAccountReference": "IC722LCXBROSHBPIBK7B44MBXO5HF"
        },
        "Provider": "Simulado",
        "AuthorizationCode": "635288",
        "Tid": "0826104754051",
        "ProofOfSale": "132471",
        "Authenticate": true,
        "ExternalAuthentication": {
            "Cavv": "AAABB2gHA1B5EFNjWQcDAAAAAAB=",
            "Xid": "Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
            "Eci": "5",
            "Version": "2",
            "ReferenceId": "a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
        },
        "Recurrent": false,
        "Amount": 15700,
        "ReceivedDate": "2022-08-26 10:47:53",
        "CapturedAmount": 15700,
        "CapturedDate": "2022-08-26 10:47:54",
        "Status": 2,
        "IsSplitted": false,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "21c9a3e7-23c2-420b-b12d-b514ef271c85",
        "Type": "DebitCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/21c9a3e7-23c2-420b-b12d-b514ef271c85"
            }
        ]
    }
}
```

| Propriedade                         | Descrição                                                                                                                                                                                                                                                                                                                                     | Tipo         | Tamanho | Formato                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- | ------------------------------------ |
| `AuthenticationUrl`                 | URL para qual o Lojista deve redirecionar o Cliente para o fluxo de Débito.                                                                                                                                                                                                                                                                   | Texto        | 56      | Url de Autenticação                  |
| `Tid`                               | Id da transação na adquirente.                                                                                                                                                                                                                                                                                                                | Texto        | 20      | Texto alfanumérico                   |
| `PaymentId`                         | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.                                                                                                                                                                                                                                | Guid         | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`                         | Url de retorno do lojista. URL para onde o lojista vai ser redirecionado no final do fluxo.                                                                                                                                                                                                                                                   | Texto        | 1024    | http://www.urllogista.com.br         |
| `Status`                            | Status da Transação.                                                                                                                                                                                                                                                                                                                          | Byte         | ---     | 0                                    |
| `ReturnCode`                        | Código de retorno da Adquirência.                                                                                                                                                                                                                                                                                                             | Texto        | 32      | Texto alfanumérico                   |
| `MerchantAdviceCode`                | Código de retorno da bandeira que define período para retentativa. _Válido somente para bandeira Mastercard_. [Veja mais informações sobre Merchant Advice Code aqui](https://developercielo.github.io/manual/3ds){:target="\_blank"}.                                                                                                        | Texto        | 2       | Numérico                             |
| `DebitCard.PaymentAccountReference` | O PAR (Payment Account Reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado. Se for pra transação de crédito, colocar o campo dentro do nó de `CreditCard` | Alfanumérico | 29      | -                                    |

### Autenticando uma transação

A Cielo oferece o serviço do 3DS 2.0, um protocolo de autenticação de transações. A autenticação é opcional para transações de cartão de crédito, e obrigatória para cartão de débito, por determinação das bandeiras e emissores.

Para integrar a autenticação às suas transações:

1. **Integre o script do 3DS 2.0** na sua página de pagamento, conforme [manual do 3DS](https://developercielo.github.io/manual/3ds){:target="\_blank"};
2. Na **requisição das transações** de crédito ou débito, **envie o nó adicional** `ExternalAuthentication`, conforme exemplos a seguir.

<aside class="notice">A autenticação via 3DS 1.0 está sendo descontinuada pelas bandeiras. As novas integrações devem seguir o protocolo 3DS 2.0.</aside>

#### Cartão de crédito com autenticação

##### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador crédito completo",
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
    }
  },
  "Payment": {
    "Currency": "BRL",
    "Country": "BRA",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": "false",
    "Recurrent": "false",
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "SaveCard": "false",
      "Brand": "Visa",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "Type": "CreditCard",
    "Amount": 15700,
    "AirlineData": {
      "TicketNumber": "AR988983"
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
     "Recurrent":"false",
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

| Propriedade                           | Tipo         | Tamanho | Obrigatório         | Descrição                                                                                                                                                                                                                                                                                          |
| ------------------------------------- | ------------ | ------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`                          | Guid         | 36      | Sim                 | Identificador da loja na Cielo.                                                                                                                                                                                                                                                                    |
| `MerchantKey`                         | Texto        | 40      | Sim                 | Chave Publica para Autenticação Dupla na Cielo.                                                                                                                                                                                                                                                    |
| `Content-Type`                        | Header       | 40      | Sim                 | application/json (obrigatório o envio deste).                                                                                                                                                                                                                                                      |
| `RequestId`                           | Guid         | 36      | Não                 | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.                                                                                                                                                                                             |
| `MerchantOrderId`                     | Texto        | 50      | Sim                 | Numero de identificação do Pedido.                                                                                                                                                                                                                                                                 |
| `Customer.Name`                       | Texto        | 255     | Não                 | Nome do Comprador.                                                                                                                                                                                                                                                                                 |
| `Customer.Status`                     | Texto        | 255     | Não                 | Status de cadastro do comprador na loja (NEW / EXISTING)                                                                                                                                                                                                                                           |
| `Customer.Identity`                   | Texto        | 14      | Não                 | Número do RG, CPF ou CNPJ do Cliente.                                                                                                                                                                                                                                                              |
| `Customer.IdentityType`               | Texto        | 255     | Não                 | Tipo de documento de identificação do comprador (CFP/CNPJ).                                                                                                                                                                                                                                        |
| `Customer.Email`                      | Texto        | 255     | Não                 | Email do Comprador.                                                                                                                                                                                                                                                                                |
| `Customer.Birthdate`                  | Date         | 10      | Não                 | Data de nascimento do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.Street`             | Texto        | 255     | Não                 | Endereço do Comprador.                                                                                                                                                                                                                                                                             |
| `Customer.Address.Number`             | Texto        | 15      | Não                 | Número do endereço do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.Complement`         | Texto        | 50      | Não                 | Complemento do endereço do Comprador.br                                                                                                                                                                                                                                                            |
| `Customer.Address.ZipCode`            | Texto        | 9       | Não                 | CEP do endereço do Comprador.                                                                                                                                                                                                                                                                      |
| `Customer.Address.City`               | Texto        | 50      | Não                 | Cidade do endereço do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.State`              | Texto        | 2       | Não                 | Estado do endereço do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.Address.Country`            | Texto        | 35      | Não                 | Pais do endereço do Comprador.                                                                                                                                                                                                                                                                     |
| `Customer.DeliveryAddress.Street`     | Texto        | 255     | Não                 | Endereço do Comprador.                                                                                                                                                                                                                                                                             |
| `Customer.Address.Number`             | Texto        | 15      | Não                 | Número do endereço do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.DeliveryAddress.Complement` | Texto        | 50      | Não                 | Complemento do endereço do Comprador.                                                                                                                                                                                                                                                              |
| `Customer.DeliveryAddress.ZipCode`    | Texto        | 9       | Não                 | CEP do endereço do Comprador.                                                                                                                                                                                                                                                                      |
| `Customer.DeliveryAddress.City`       | Texto        | 50      | Não                 | Cidade do endereço do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.DeliveryAddress.State`      | Texto        | 2       | Não                 | Estado do endereço do Comprador.                                                                                                                                                                                                                                                                   |
| `Customer.DeliveryAddress.Country`    | Texto        | 35      | Não                 | País do endereço do Comprador.                                                                                                                                                                                                                                                                     |
| `Payment.Type`                        | Texto        | 100     | Sim                 | Tipo do Meio de Pagamento.                                                                                                                                                                                                                                                                         |
| `Payment.Amount`                      | Número       | 15      | Sim                 | Valor do Pedido (ser enviado em centavos).                                                                                                                                                                                                                                                         |
| `Payment.Currency`                    | Texto        | 3       | Não                 | Moeda na qual o pagamento será feito (BRL).                                                                                                                                                                                                                                                        |
| `Payment.Country`                     | Texto        | 3       | Não                 | Pais na qual o pagamento será feito.                                                                                                                                                                                                                                                               |
| `Payment.Provider`                    | Texto        | 15      | ---                 | Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.                                                                                                                                                                                                                |
| `Payment.ServiceTaxAmount`            | Número       | 15      | Não                 | Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.                                                                                                                       |
| `Payment.SoftDescriptor`              | Texto        | 13      | Não                 | O complemento do nome da loja que aparecerá na fatura do cartão. Não permite caracteres especiais.                                                                                                                                                                                                 |
| `Payment.Installments`                | Número       | 2       | Sim                 | Número de Parcelas.                                                                                                                                                                                                                                                                                |
| `Payment.Interest`                    | Texto        | 10      | Não                 | Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).                                                                                                                                                                                                                                     |
| `Payment.Capture`                     | Booleano     | ---     | Não (Default false) | Booleano que identifica que a autorização deve ser com captura automática.                                                                                                                                                                                                                         |
| `Payment.Authenticate`                | Booleano     | ---     | Não (Default false) | Define se o comprador será direcionado ao Banco emissor para autenticação do cartão                                                                                                                                                                                                                |
| `Payment.Recurrent`                   | Booleano     | -       | Não                 | Indica se a transação é do tipo recorrente (“true”) ou não (“false”). O valor “true” não originará uma nova recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. Authenticate deve ser “false” quando Recurrent é “true”.                                |
| `Payment.IsCryptocurrencyNegotiation` | Booleano     | -       | Não (default false) | Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda                                                                                                                                                                                                 |
| `Payment.AirlineData.TicketNumber`    | alfanumérico | 13      | Não                 | Informar o número do principal bilhete aéreo da transação.                                                                                                                                                                                                                                         |
| `CreditCard.CardNumber`               | Texto        | 19      | Sim                 | Número do Cartão do Comprador.                                                                                                                                                                                                                                                                     |
| `CreditCard.Holder`                   | Texto        | 25      | Não                 | Nome do Comprador impresso no cartão. Não aceita caracteres especiais ou acentuação.                                                                                                                                                                                                               |
| `CreditCard.ExpirationDate`           | Texto        | 7       | Sim                 | Data de validade impressa no cartão. Ex. MM/AAAA.                                                                                                                                                                                                                                                  |
| `CreditCard.SecurityCode`             | Texto        | 4       | Não                 | Código de segurança impresso no verso do cartão.                                                                                                                                                                                                                                                   |
| `CreditCard.SaveCard`                 | Booleano     | ---     | Não (Default false) | Booleano que identifica se o cartão será salvo para gerar o CardToken.                                                                                                                                                                                                                             |
| `CreditCard.Brand`                    | Texto        | 10      | Sim                 | Bandeira do cartão. Valores possíveis: Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.                                                                                                                                                                            |
| `CreditCard.CardOnFile.Usage`         | Texto        | -       | Não                 | **First** se o cartão foi armazenado e é seu primeiro uso.<br>**Used** se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação                                                                                                                                          |
| `CreditCard.CardOnFile.Reason`        | Texto        | -       | Condicional         | Indica o propósito de armazenamento de cartões, caso o campo "Usage" for "Used".<BR>**Recurring** - Compra recorrente programada (ex. assinaturas)<br>**Unscheduled** - Compra recorrente sem agendamento (ex. aplicativos de serviços)<br>**Installments** - Parcelamento através da recorrência. |

##### Resposta

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador crédito completo",
    "Identity": "11225468954",
    "IdentityType": "CPF",
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
      "SaveCard": false,
      "Brand": "Visa",
      "PaymentAccountReference": "92745135160550440006111072222",
      "CardOnFile": {
        "Usage": "Used",
        "Reason": "Unscheduled"
      }
    },
    "IsCryptoCurrencyNegotiation": true,
    "TryAutomaticCancellation": true,
    "ProofOfSale": "674532",
    "Tid": "0305020554239",
    "AuthorizationCode": "123456",
    "SoftDescriptor": "123456789ABCD",
    "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
    "Type": "CreditCard",
    "Amount": 15700,
    "CapturedAmount": 15700,
    "Country": "BRA",
    "AirlineData": {
      "TicketNumber": "AR988983"
    },
    "ExtraDataCollection": [],
    "Status": 2,
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "MerchantAdviceCode": "1",
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
        "MerchantAdviceCode":"1",
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

| Propriedade                          | Descrição                                                                                                                                                                                                                                                                                                                                                                                | Tipo         | Tamanho | Formato                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- | ------------------------------------ |
| `ProofOfSale`                        | Número da autorização, identico ao NSU.                                                                                                                                                                                                                                                                                                                                                  | Texto        | 6       | Texto alfanumérico                   |
| `Tid`                                | Id da transação na adquirente.                                                                                                                                                                                                                                                                                                                                                           | Texto        | 20      | Texto alfanumérico                   |
| `AuthorizationCode`                  | Código de autorização.                                                                                                                                                                                                                                                                                                                                                                   | Texto        | 6       | Texto alfanumérico                   |
| `SoftDescriptor`                     | Texto impresso na fatura bancaria do portador. Não permite caracteres especiais.                                                                                                                                                                                                                                                                                                         | Texto        | 13      | Texto alfanumérico                   |
| `PaymentId`                          | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.                                                                                                                                                                                                                                                                           | Guid         | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                                | Eletronic Commerce Indicator. Representa o quão segura é uma transação.                                                                                                                                                                                                                                                                                                                  | Texto        | 2       | Exemplos: 7                          |
| `Status`                             | Status da Transação.                                                                                                                                                                                                                                                                                                                                                                     | Byte         | ---     | 2                                    |
| `ReturnCode`                         | Código de retorno da Adquirência.                                                                                                                                                                                                                                                                                                                                                        | Texto        | 32      | Texto alfanumérico                   |
| `ReturnMessage`                      | Mensagem de retorno da Adquirência.                                                                                                                                                                                                                                                                                                                                                      | Texto        | 512     | Texto alfanumérico                   |
| `MerchantAdviceCode`                 | Código de retorno da bandeira que define período para retentativa. _Válido somente para bandeira Mastercard_. [Veja mais informações sobre Merchant Advice Code aqui](https://developercielo.github.io/manual/3ds){:target="\_blank"}.                                                                                                                                                   | Texto        | 2       | Numérico                             |
| `TryAutomaticCancellation`           | Caso ocorra algum erro durante a autorização (status Não Finalizada - "0"), a resposta incluirá o campo “TryAutomaticCancellation” como true. Neste caso, a transação será consultada automaticamente, e caso tenha sido autorizada será cancelada automaticamente. Esta funcionalidade deverá estar habilitada para loja. Para habilitar, entre em contato com o nosso suporte técnico. | Booleano     | -       | true ou false                        |
| `CreditCard.PaymentAccountReference` | O PAR (Payment Account Reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado.Se for pra transação de débito, colocar o campo dentro do nó de `DebitCard`                                               | Alfanumérico | 29      | ---                                  |

#### Cartão de débito com autenticação

A transação de débito com autenticação é o padrão para esse meio de pagamento. Siga os passos de integração do [manual do 3DS](https://developercielo.github.io/manual/3ds){:target="\_blank"} e envie a requisição conforme apresentada em [Criando uma Transação de Débito](https://developercielo.github.io/manual/cielo-ecommerce#criando-uma-transa%C3%A7%C3%A3o-de-d%C3%A9bito).

#### MPI Externo

O Merchant plug-in, conhecido por MPI, é um serviço que permite a realização da chamada de autenticação, integrado e certificado com bandeiras para processamento de autenticação de 3DS. A Cielo permite ao lojista a integração do 3DS através do MPI Interno ou do MPI Externo.

- **MPI Interno**: serviço já integrado a solução de 3DS Cielo, sem necessidade de integração e/ou contratação adicional.

- **MPI Externo**: usado quando o seu e-commerce contrata uma solução de MPI, sem participação da Cielo. Independente da versão do 3DS contratada, siga as orientações do manual [3. Autorização com Autenticação](https://developercielo.github.io/manual/autorizacao-com-autenticacao){:target="\_blank"} para a integração.

## Cartões Alelo

Para criar uma venda que utilizará cartão de Alelo, é use a mesma requisição de uma venda de **cartão de débito**.

**OBS:** Em transações de Cartão ALELO, os seguintes parâmetros devem possuir configurações estáticas:

- `Payment.Authenticate` precisa estar como **`false`"** ou não ser enviado;
- `DebitCard.Brand` precisa ser enviada como **"Elo"**.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014121201",
  "Customer": {
    "Name": "Comprador Cartão de Alelo"
  },
  "Payment": {
    "Type": "DebitCard",
    "Authenticate": false,
    "Amount": 50,
    "ReturnUrl": "http://www.cielo.com.br",
    "DebitCard": {
      "CardNumber": "5080540487508044",
      "Holder": "Comprador Cartão de Alelo",
      "ExpirationDate": "07/2029",
      "SecurityCode": "841",
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

| Propriedade                | Descrição                                                                                                                       | Tipo     | Tamanho | Obrigatório            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------- |
| `MerchantId`               | Identificador da loja na API Cielo eCommerce.                                                                                   | Guid     | 36      | Sim                    |
| `MerchantKey`              | Chave Pública para Autenticação Dupla na API Cielo eCommerce.                                                                   | Texto    | 40      | Sim                    |
| `RequestId`                | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                           | Guid     | 36      | Não                    |
| `MerchantOrderId`          | Número de identificação do Pedido.                                                                                              | Texto    | 50      | Sim                    |
| `Customer.Name`            | Nome do Comprador.                                                                                                              | Texto    | 255     | Não                    |
| `Payment.Authenticate`     | Define se o comprador será direcionado ao Banco emissor para autenticação do cartão. **Valor possível: "false"** ou não enviar. | Booleano | ---     | Não (default ="false") |
| `Payment.Type`             | Tipo do Meio de Pagamento                                                                                                       | Texto    | 100     | Sim                    |
| `Payment.Amount`           | Valor do Pedido (ser enviado em centavos).                                                                                      | Número   | 15      | Sim                    |
| `Payment.ReturnUrl`        | URL de retorno do lojista.                                                                                                      | Texto    | 1024    | Sim                    |
| `Payment.ReturnUrl`        | URL para onde o usuário será redirecionado após o fim do pagamento                                                              | Texto    | 1024    | Sim                    |
| `DebitCard.CardNumber`     | Número do cartão do comprador.                                                                                                  | Texto    | 19      | Sim                    |
| `DebitCard.Holder`         | Nome do comprador impresso no cartão.                                                                                           | Texto    | 25      | Sim                    |
| `DebitCard.ExpirationDate` | Data de validade impressa no cartão. Ex. MM/AAAA.                                                                               | Texto    | 7       | Sim                    |
| `DebitCard.SecurityCode`   | Código de segurança impresso no verso do cartão.                                                                                | Texto    | 4       | Sim                    |
| `DebitCard.Brand`          | Bandeira do cartão. Precisa ser enviada como "ELO".                                                                             | Texto    | 10      | Sim                    |

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

| Propriedade  | Descrição                                                                                   | Tipo  | Tamanho | Formato                              |
| ------------ | ------------------------------------------------------------------------------------------- | ----- | ------- | ------------------------------------ |
| `Tid`        | ID da transação na adquirente.                                                              | Texto | 20      | Texto alfanumérico                   |
| `PaymentId`  | Campo Identificador do Pedido.                                                              | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`  | URL de retorno do lojista. URL para onde o lojista vai ser redirecionado no final do fluxo. | Texto | 1024    | http://www.urllogista.com.br         |
| `Status`     | Status da Transação                                                                         | Byte  | ---     | 0                                    |
| `ReturnCode` | Código de retorno da Adquirência.                                                           | Texto | 32      | Texto alfanumérico                   |

## Pix

No **pix**, a transmissão da ordem de pagamento e a disponibilidade de fundos para o recebedor ocorrem em tempo real, 24 horas por dia e sem a necessidade de intermediários. Sendo assim, é um meio que viabiliza pagamentos rápidos e com menores custos de transação.

Conheça o ciclo de vida de uma transação **pix**:

| SEQUÊNCIA | RESPONSÁVEL | DESCRIÇÃO                                                                                     | STATUS DA TRANSAÇÃO |
| --------- | ----------- | --------------------------------------------------------------------------------------------- | ------------------- |
| 1         | Loja        | Geração do QR code.                                                                           | 12 - Pendente       |
| 2         | Comprador   | Pagamento do QR code.                                                                         | 2 - Pago            |
| 3         | Loja        | Recebimento da notificação de confirmação do pagamento.                                       | 2 - Pago            |
| 4         | Loja        | Consulta ao status da transação.                                                              | 2 - Pago            |
| 5         | Loja        | Liberação do pedido.                                                                          | 2 - Pago            |
| 6         | Loja        | Caso necessário, solicitação da devolução da transação Pix (semelhante ao estorno do cartão). | 2 - Pago            |
| 7         | Loja        | Recebimento da notificação de confirmação de devolução.                                       | 11 - Estornado      |
| 8         | Loja        | Consulta ao status da transação.                                                              | 11 - Estornado      |

> **ATENÇÃO**:<br/> > <br/>
>
> - Para habilitar o pix no ambiente sandbox entre em contato com nosso canal de suporte e-commerce pelo e-mail *cieloecommerce@cielo.com.br*;<br/> > <br/>
> - Antes de usar o Pix em produção, certifique-se de que o pix está liberado em seu cadastro. Para confirmar basta acessar o [portal Cielo](https://www.cielo.com.br/){:target="\_blank"} na área logada em **Meu Cadastro** > **Autorizações** > **PIX** > <br/> > ![Geração do QR Code Pix]({{ site.baseurl_root }}/images/apicieloecommerce/adesao-pix.png)

### Criando uma transação com QR Code Pix

Para gerar um QR code Pix através da API Cielo E-commerce, basta realizar a integração conforme a especificação a seguir.

O campo obrigatório `Payment.Type` deve ser enviado como "Pix". Na resposta da requisição será retornado o _código base64_ da imagem do QR code Pix, que você deverá disponibilizar ao comprador.

Confira a representação do **fluxo transacional** na geração do QR code pix:

![Geração do QR Code Pix]({{ site.baseurl_root }}/images/apicieloecommerce/geracao-qr-code-pix-pt.png)

O comprador então realiza a leitura do QR code através de um dos aplicativos habilitados para o pagamento pix e efetiva o pagamento. Nesta etapa não há participação da loja nem da API E-commerce Cielo, conforme demonstrado no fluxo:

![Pagamento Pix]({{ site.baseurl_root }}/images/apicieloecommerce/pagamento-pix-pt.png)

Veja exemplos de envio de requisição e resposta para a geração do QR code pix:

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2020102601",
  "Customer": {
    "Name": "Nome do Pagador",
    "Identity": "12345678909",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "Pix",
    "Amount": 100
  }
}
```

```shell
--request POST "https://(...)/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2020102601",
   "Customer":{
      "Name":"Nome do Pagador",
      "Identity":"CPF",
      "IdentityType":"12345678909"
   },
   "Payment":{
      "Type":"Pix",
      "Amount":100
   }
}
--verbose
```

| PROPRIEDADE             | DESCRIÇÃO                                                      | TIPO   | TAMANHO | OBRIGATÓRIO? |
| ----------------------- | -------------------------------------------------------------- | ------ | ------- | ------------ |
| `MerchantOrderId`       | Número de identificação do pedido.                             | Texto  | 50      | Sim          |
| `Customer.Name`         | Nome do pagador.                                               | Texto  | 255     | Sim          |
| `Customer.Identity`     | Número do CPF ou CNPJ do cliente.                              | Texto  | 14      | Sim          |
| `Customer.IdentityType` | Tipo de documento de identificação do comprador (CPF ou CNPJ). | Texto  | 255     | Sim          |
| `Payment.Type`          | Tipo do meio de pagamento. Neste caso, "Pix".                  | Texto  | -       | Sim          |
| `Payment.Amount`        | Valor do pedido, em centavos.                                  | Número | 15      | Sim          |

#### Resposta

```json
{
   "MerchantOrderId":"2020102601",
   "Customer":{
      "Name":"Nome do Pagador"
   },
   "Payment":{
      (...)
      "Paymentid":"1997be4d-694a-472e-98f0-e7f4b4c8f1e7",
      "Type":"Pix",
      "AcquirerTransactionId":"86c200c7-7cdf-4375-92dd-1f62dfa846ad",
         "ProofOfSale":"123456",
      "QrcodeBase64Image":"rfhviy64ak+zse18cwcmtg==[...]",
      "QrCodeString":"00020101021226880014br.gov.bcb.pix2566qrcodes-h.cielo.com.br/pix-qr/d05b1a34-ec52-4201-ba1e-d3cc2a43162552040000530398654041.005802BR5918Merchant Teste HML6009Sao Paulo62120508000101296304031C",
      "Amount":100,
      "ReceivedDate":"2020-10-15 18:53:20",
      "Status":12,
      "ReturnCode":"0",
      "ReturnMessage":"Pix gerado com sucesso",
      (...)
   }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2020102601",
   "Customer":{
      "Name":"Nome do Pagador"
   },
   "Payment":{
      (...)
      "PaymentId":"1997be4d-694a-472e-98f0-e7f4b4c8f1e7",
      "Type":"Pix",
      "AcquirerTransactionId":"86c200c7-7cdf-4375-92dd-1f62dfa846ad",
         "ProofOfSale":"123456",
      "QrcodeBase64Image":"rfhviy64ak+zse18cwcmtg==[...]",
      "QrCodeString":"00020101021226880014br.gov.bcb.pix2566qrcodes-h.cielo.com.br/pix-qr/d05b1a34-ec52-4201-ba1e-d3cc2a43162552040000530398654041.005802BR5918Merchant Teste HML6009Sao Paulo62120508000101296304031C",
      "Amount":100,
      "ReceivedDate":"2020-10-15 18:53:20",
      "Status":12,
      "ReturnCode":"0",
      "ReturnMessage":"Pix gerado com sucesso",
      (...)
   }
}
--verbose
```

| PROPRIEDADE                     | DESCRIÇÃO                                                                                                                                                                                                       | TIPO   | TAMANHO  | FORMATO                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------------------------------------ |
| `Payment.PaymentId`             | Campo identificador do pedido.                                                                                                                                                                                  | GUID   | 40       | Texto                                |
| `Payment.AcquirerTransactionId` | Id da transação no provedor de meio de pagamento.                                                                                                                                                               | GUID   | 36       | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `Payment.ProofOfSale`           | NSU Pix.                                                                                                                                                                                                        | Texto  | 20       | Texto alfanumérico                   |
| `Payment.QrcodeBase64Image`     | Código em base64 da imagem do QR code.                                                                                                                                                                          | Texto  | -        | Texto                                |
| `Payment.QrCodeString`          | Texto codificado para o comprador "copiar" e "colar" no campo do internet banking em pagamentos feitos no ambiente mobile.                                                                                      | Texto  | Variável | Texto alfanumérico                   |
| `Payment.Status`                | Status da transação. Em caso de sucesso, o status inicial é “12” (_Pendente_). [Clique aqui](https://braspag.github.io/manual/braspag-pagador#lista-de-status-da-transa%C3%A7%C3%A3o) para ver lista de status. | Número | -        | 12                                   |
| `Payment.ReturnCode`            | Código retornado pelo provedor do meio de pagamento.                                                                                                                                                            | Texto  | 32       | 0                                    |
| `Payment.ReturnMessage`         | Mensagem retornada pelo provedor do meio de pagamento.                                                                                                                                                          | Texto  | 512      | "Pix gerado com sucesso"             |

### Solicitando uma devolução pix

Caso a sua loja precise cancelar uma transferência pix, é possível realizar uma operação chamada de **devolução**. É importante ressaltar que a devolução não é uma operação instantânea, podendo ser acatada ou não pelo provedor pix. Quando uma devolução é acatada, uma [notificação](https://developercielo.github.io/manual/cielo-ecommerce#post-de-notifica%C3%A7%C3%A3o) será enviada para a sua loja.<br/>

> **Importante:**<br/>
>
> - A devolução ocorrerá somente se houver saldo;<br/>
> - O prazo para cancelamento é de 90 dias, conforme especificação do BACEN.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{PaymentId}/void?amount=xxx</span></aside>

```shell
--request PUT "https://(...)/sales/{PaymentId}/void?Amount=xxx"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--verbose
```

| Propriedade   | Descrição                                                                                                                         | Tipo   | Tamanho | Obrigatório |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `MerchantId`  | Identificador da loja na API.                                                                                                     | GUID   | 36      | Sim         |
| `MerchantKey` | Chave pública para autenticação dupla na API.                                                                                     | Texto  | 40      | Sim         |
| `RequestId`   | Identificador do request definido pela loja, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.         | GUID   | 36      | Não         |
| `PaymentId`   | Campo identificador do pedido.                                                                                                    | GUID   | 36      | Sim         |
| `Amount`      | Valor a ser cancelado/estornado, em centavos. Verifique se a adquirente contratada suporta a operação de cancelamento ou estorno. | Número | 15      | Não         |

#### Resposta

```json
{
  "Status": 12,
  "ReasonCode": 0,
  "ReasonMessage": "Successful",
  "ReturnCode": "0",
  "ReturnMessage": "Reembolso solicitado com sucesso",
  "Links": [
    {
      "Method": "GET",
      "Rel": "self",
      "Href": "https://(...)/sales/{PaymentId}"
    }
  ]
}
```

```shell
{
   "Status": 12,
   "ReasonCode": 0,
   "ReasonMessage": "Successful",
   "ReturnCode": "0",
   "ReturnMessage": "Reembolso solicitado com sucesso",
   "Links": [
      {
         "Method": "GET",
         "Rel": "self",
         "Href": "https://(...)/sales/{PaymentId}"
      }
   ]
}
```

| Propriedade     | Descrição                           | Tipo  | Tamanho | Formato            |
| --------------- | ----------------------------------- | ----- | ------- | ------------------ |
| `Status`        | Status da transação.                | Byte  | 2       | Ex.: "1"           |
| `ReasonCode`    | Código de retorno da adquirência.   | Texto | 32      | Texto alfanumérico |
| `ReasonMessage` | Mensagem de retorno da adquirência. | Texto | 512     | Texto alfanumérico |

## Boleto

Para transacionar por boleto, você precisa primeiro contratar esse serviço com o banco. Em seguida, configure o meio de pagamento boleto de acordo com as orientações do manual [Boletos](https://developercielo.github.io/tutorial/manual-boleto){:target="\_blank"}.

> **Observação:** Os boletos do Banco do Brasil não possuem o serviço de conciliação automática.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Teste Boleto",
    "Identity": "1234567890",
    "Address": {
      "Street": "Avenida Marechal Câmara",
      "Number": "160",
      "Complement": "Sala 934",
      "ZipCode": "22750012",
      "District": "Centro",
      "City": "Rio de Janeiro",
      "State": "RJ",
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
    }
  },
  "Payment": {
    "Type": "Boleto",
    "Amount": 15700,
    "Provider": "Bradesco2",
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

| Propriedade                     | Descrição                                                                                                                              | Tipo   | Tamanho                             | Obrigatório |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------- | ----------- |
| `MerchantId`                    | Identificador da loja na API Cielo eCommerce.                                                                                          | Guid   | 36                                  | Sim         |
| `MerchantKey`                   | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                                                          | Texto  | 40                                  | Sim         |
| `RequestId`                     | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                                  | Guid   | 36                                  | Não         |
| `MerchantOrderId`               | Numero de identificação do Pedido.                                                                                                     | Texto  | Bradesco: 27<BR>Banco do Brasil: 50 | Sim         |
| `Customer.Name`                 | Nome do Comprador.                                                                                                                     | Texto  | Bradesco: 34<BR>Banco do Brasil: 60 | Não         |
| `Customer.Status`               | Status de cadastro do comprador na loja(NEW / EXISTING) - Utilizado pela análise de fraude                                             | Texto  | 255                                 | Não         |
| `Customer.Address.ZipCode`      | CEP do endereço do Comprador.                                                                                                          | Texto  | 9                                   | Sim         |
| `Customer.Address.Country`      | Pais do endereço do Comprador.                                                                                                         | Texto  | 35                                  | Sim         |
| `Customer.Address.State`        | Estado do endereço do Comprador.                                                                                                       | Texto  | 2                                   | Sim         |
| `Customer.Address.City`         | Cidade do endereço do Comprador.                                                                                                       | Texto  | Bradesco: 50<BR>Banco do Brasil: 18 | Sim         |
| `Customer.Address.District`     | Bairro do Comprador.                                                                                                                   | Texto  | 50                                  | Sim         |
| `Customer.Address.Street`       | Endereço do Comprador.                                                                                                                 | Texto  | 255                                 | Sim         |
| `Customer.Address.Number`       | Número do endereço do Comprador.                                                                                                       | Texto  | 15                                  | Sim         |
| `Customer.Billing.Street`       | Logradouro do endereço de cobrança                                                                                                     | string | 24                                  | não         |
| `Customer.Billing.Number`       | Número do endereço de cobrança                                                                                                         | string | 5                                   | não         |
| `Customer.Billing.Complement`   | Complemento do endereço de cobrança                                                                                                    | string | 14                                  | não         |
| `Customer.Billing.Neighborhood` | Bairro do endereço de cobrança                                                                                                         | string | 15                                  | não         |
| `Customer.Billing.City`         | Cidade do endereço de cobranças                                                                                                        | tring  | 20                                  | não         |
| `Customer.Billing.State`        | Estado do endereço de cobrança                                                                                                         | string | 2                                   | não         |
| `Customer.Billing.Country`      | País do endereço de cobrança. Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui){:target="\_blank"}      | string | 2                                   | não         |
| `Customer.Billing.ZipCode`      | Código postal do endereço de cobrança                                                                                                  | string | 9                                   | não         |
| `Payment.Type`                  | Tipo do Meio de Pagamento.                                                                                                             | Texto  | 100                                 | Sim         |
| `Payment.Amount`                | Valor do Pedido (ser enviado em centavos).                                                                                             | Número | 15                                  | Sim         |
| `Payment.Provider`              | Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO. Valores possíveis: "Bradesco2" ou "BancoDoBrasil2" | Texto  | 15                                  | Sim         |
| `Payment.Address`               | Endereço do Cedente.                                                                                                                   | Texto  | 255                                 | Não         |
| `Payment.BoletoNumber`          | Número do Boleto enviado pelo lojista. Usado para contar boletos emitidos ("NossoNumero").                                             | Número | Bradesco: 11<BR>Banco do Brasil: 9  | Não         |
| `Payment.Assignor`              | Nome do Cedente.                                                                                                                       | Texto  | 200                                 | Não         |
| `Payment.Demonstrative`         | Texto de Demonstrativo.                                                                                                                | Texto  | 255                                 | Não         |
| `Payment.ExpirationDate`        | Data de expiração do Boleto. Ex. 2020-12-31                                                                                            | Date   | 10                                  | Não         |
| `Payment.Identification`        | Documento de identificação do Cedente.                                                                                                 | Texto  | 14                                  | Não         |
| `Payment.Instructions`          | Instruções do Boleto.                                                                                                                  | Texto  | 255                                 | Não         |

### Resposta

Na resposta da transação de boleto, a API Cielo E-commerce vai enviar a URL do boleto e o código de barras, que o e-commerce deverá exibir para o comprador.

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Boleto Completo",
    "Address": {
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
    }
  },
  "Payment": {
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

| Propriedade      | Descrição                                                                                                      | Tipo   | Tamanho | Formato                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------------------------------------------------------------- |
| `PaymentId`      | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento. | Guid   | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                          |
| `Instructions`   | Instruções do Boleto.                                                                                          | Texto  | 255     | Ex: Aceitar somente até a data de vencimento, após essa data juros de 1% dia. |
| `ExpirationDate` | Data de expiração.                                                                                             | Texto  | 10      | 2014-12-25                                                                    |
| `Url`            | Url do Boleto gerado.                                                                                          | string | 256     | Ex:https://.../pagador/reenvia.asp/8464a692-b4bd-41e7-8003-1611a2b8ef2d       |
| `Number`         | "NossoNumero" gerado.                                                                                          | Texto  | 50      | Ex: 1000000012-8                                                              |
| `BarCodeNumber`  | Representação numérica do código de barras.                                                                    | Texto  | 44      | Ex: 00091628800000157000494250100000001200656560                              |
| `DigitableLine`  | Linha digitável.                                                                                               | Texto  | 256     | Ex: 00090.49420 50100.000004 12006.565605 1 62880000015700                    |
| `Assignor`       | Nome do Cedente.                                                                                               | Texto  | 256     | Ex: Loja Teste                                                                |
| `Address`        | Endereço do Cedente.                                                                                           | Texto  | 256     | Ex: Av. Teste, 160                                                            |
| `Identification` | Documento de identificação do Cedente.                                                                         | Texto  | 14      | CPF ou CNPJ do Cedente sem os caracteres especiais (., /, -)                  |
| `Status`         | Status da Transação.                                                                                           | Byte   | ---     | 1                                                                             |

### Regras Adicionais

Quantidade de caracteres por campo e Provider:

**Bradesco**

| Propriedade                   | Observações                                          | Tamanho   |
| ----------------------------- | ---------------------------------------------------- | --------- |
| `Provider`                    | N/a                                                  | Bradesco2 |
| `MerchantOrderId`             | Apenas Letras, números e caracteres como "\_" e "$". | 27        |
| `Payment.BoletoNumber`        | O dado é validado pelo banco.                        | 11        |
| `Customer.Name`               | A API Cielo trunca automaticamente.                  | 34        |
| `Customer.Address.Street`     | O dado é validado pela API Cielo.                    | 70        |
| `Customer.Address.Number`     | O dado é validado pela API Cielo.                    | 10        |
| `Customer.Address.Complement` | O dado é validado pela API Cielo.                    | 20        |
| `Customer.Address.District`   | O dado é validado pela API Cielo.                    | 50        |
| `Customer.Address.City`       | O dado é validado pela API Cielo.                    | 50        |
| `Payment.Instructions`        | N/a                                                  | 255       |
| `Payment.Demonstrative`       | N/a                                                  | 255       |

**Banco do Brasil**

| Propriedade                   | Observações                                                                                                                                                                                                                                                                                                                                           | Tamanho                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Provider`                    | N/a                                                                                                                                                                                                                                                                                                                                                   | BancoDoBrasil2                                                                                                                                                |
| `MerchantOrderId`             | Não é enviado ao banco.                                                                                                                                                                                                                                                                                                                               | 50                                                                                                                                                            |
| `Payment.BoletoNumber`        | Quando enviado acima de 9 posições, a API Cielo trunca automaticamente, considerando os últimos 9 dígitos.                                                                                                                                                                                                                                            | 9                                                                                                                                                             |
| `Customer.Name`               | **Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras.     | 60                                                                                                                                                            |
| `Customer.Address.Street`     | **Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras      | Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres. |
| `Customer.Address.Number`     | **Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras      | Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres. |
| `Customer.Address.Complement` | **Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras      | Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres. |
| `Customer.Address.District`   | **Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras      | Os campos `Customer.Address.Street`; `Customer.Address.Number`; `Customer.Address.Complement`; `Customer.Address.District` devem totalizar até 60 caracteres. |
| `Customer.Address.City`       | <br>**Caracteres válidos:** <BR> Letras de A a Z - MAIÚSCULAS <BR> **Caracteres especiais:** hífen (-) e apóstrofo (') <BR><BR> Quando utilizados, não pode conter espaços entre as letras; <BR><BR><BR> **Exemplos corretos**: D'EL-REI, D'ALCORTIVO, SANT'ANA.<BR><BR> **Exemplos incorretos**: D'EL - REI; até um espaço em branco entre palavras. | 18 caracteres                                                                                                                                                 |
| `Payment.Instructions`        | N/a                                                                                                                                                                                                                                                                                                                                                   | 255                                                                                                                                                           |

## E-wallets

**O que são e-wallets?**

As _e-wallets_, ou carteiras digitais, são repositórios de cartões e dados de pagamentos para consumidores online. As e-wallets permitem que um consumidor realize o cadastro de seus dados de pagamento na carteira, tornando o processo de compra mais conveniente e seguro.

> Para utilizar e-wallets na API Cielo E-commerce, o lojista deverá ter as **e-wallets integradas em seu checkout**.

Entre em contato com o provedor de sua preferência para maiores informações sobre como contratar o serviço.

### E-wallets disponíveis

A API Cielo E-commerce possui suporte para as seguintes carteiras digitais:

- [_Apple Pay_](https://www.apple.com/br/apple-pay/){:target="\_blank"}
- [_Samsung Pay_](https://www.samsung.com.br/samsungpay/){:target="\_blank"}
- [_Google Pay_](https://pay.google.com/intl/pt-BR_br/about/){:target="\_blank"}

<aside class="notice"><strong>Atenção:</strong> Quando o nó “Wallet” for enviado na requisição, o nó “CreditCard” passa a ser opcional.</aside>

<aside class="notice"><strong>Atenção:</strong> Para o cartão de débito, quando for enviado na requisição o nó “Wallet”, será necessário o nó “DebitCard” contendo a “ReturnUrl”.</aside>

<aside class="notice"><strong>Atenção:</strong>  Devido a necessidade de utilização de chaves efêmeras para realizar operações de crédito, a Recorrência não está disponível para transações de e-wallets. </aside>

### Integração da E-Wallet

Consulte nosso [manual E-Wallets](https://developercielo.github.io/manual/e-wallets-ecommercecielo){:target="\_blank"} e saiba mais detalhes sobre a integração desse meio de pagamento em seu checkout.

Com a e-wallet já totalmente integrada, o seu fluxo transacional de pagamento será o seguinte:

![Fluxo E-wallets]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/e-wallets-cielo-100.png)

## QR Code

### Cartão de crédito via QR Code - Sandbox

Para testar o cenário de autorização com sucesso via QRCode, utilize o cartão **4551.8700.0000.0183**

As informações de **Cód.Segurança (CVV)** e validade podem ser aleatórias, mantendo o formato:

- CVV com 3 dígitos;
- Validade no formato _MM/YYYY_.

### Gerando um QR Code via API

Para criar uma transação que utilizará cartão de crédito, é necessário enviar uma requisição utilizando o método `POST` para o recurso Payment, conforme o exemplo. Esse exemplo contempla o mínimo de campos necessários a serem enviados para a autorização.

<aside class="notice"><strong>Atenção:</strong> Não é possivel realizar uma transação com valor (`Amount`) 0.</aside>

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2019010101",
  "Customer": {
    "Name": "QRCode Test"
  },
  "Payment": {
    "Type": "qrcode",
    "Amount": 100,
    "Installments": 1,
    "Capture": false,
    "Modality": "Credit"
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
     "Capture":false,
     "Modality": "Credit"
   }
}
--verbose
```

| Propriedade            | Tipo     | Tamanho | Obrigatório | Descrição                                                                                               |
| ---------------------- | -------- | ------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `MerchantId`           | Guid     | 36      | Sim         | Identificador da loja na Cielo.                                                                         |
| `MerchantKey`          | Texto    | 40      | Sim         | Chave Publica para Autenticação Dupla na Cielo.                                                         |
| `Content-Type`         | Header   | 40      | Sim         | application/json (obrigatório o envio deste).                                                           |
| `RequestId`            | Guid     | 36      | Não         | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.  |
| `MerchantOrderId`      | Texto    | 50      | Sim         | Numero de identificação do Pedido.                                                                      |
| `Customer.Name`        | Texto    | 255     | Não         | Nome do Comprador.                                                                                      |
| `Payment.Type`         | Texto    | 100     | Sim         | Tipo do Meio de Pagamento. Enviar **qrcode** para uma transação de QRCode.                              |
| `Payment.Amount`       | Número   | 15      | Sim         | Valor do Pedido (ser enviado em centavos).                                                              |
| `Payment.Installments` | Número   | 2       | Sim         | Número de Parcelas.                                                                                     |
| `Payment.Capture`      | Booleano | -       | Não         | Enviar **true** para uma trasação de captura automática.                                                |
| `Payment.Modality`     | Texto    | 10      | Não         | Indica se o pagamento será feito com crédito ou débito. Valores possíveis: "Credit" (padrão) ou "Debit" |

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

| Propriedade         | Descrição                                                                                                                                                                                                                         | Tipo  | Tamanho  | Formato                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- | ------------------------------------ |
| `QrCodeBase64Image` | QRCode codificado na base 64. Por exemplo, a imagem poderá ser apresentada na página utilizando o código HTML como este:<br><pre lang="html">&lt;img src=&quot;data:image/png;base64, código_da_imagem_na_base_64&quot;&gt;</pre> | Texto | variável | Texto alfanumérico                   |
| `PaymentId`         | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.                                                                                                                    | Guid  | 36       | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `Status`            | Status da Transação. No caso de uma transação de geração de QRCode de pagamento, o status inicial é 12 (Pending).                                                                                                                 | Byte  | ---      | 2                                    |
| `ReturnCode`        | Código de retorno da Adquirência.                                                                                                                                                                                                 | Texto | 32       | Texto alfanumérico                   |
| `ReturnMessage`     | Mensagem de retorno da Adquirência.                                                                                                                                                                                               | Texto | 512      | Texto alfanumérico                   |

## Carnê

O **carnê** é uma **transação de débito** utilizada para efetuar o pagamento de uma conta.

> O carnê é um meio de pagamento válido para as bandeiras MasterCard, Visa e Elo.

Essa modalidade pode ser utilizada por lojistas que **emitem carnês próprios e faturas de cartões Private Label**. O produto carnê permite a **separação das vendas** relacionadas à **compra de produtos e pagamento de serviços**, facilitando reporte de valores junto ao Fisco.

Como qualquer transação de débito no e-commerce, as transações de carnê precisam ser autenticadas via protocolo 3DS 2.0. Obtenha mais informações sobre o protocolo de autenticação no [**manual do 3DS 2.0**](https://developercielo.github.io/manual/3ds#autentica%C3%A7%C3%A3o-3ds-2.0){:target="\_blank"}.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111704",
  "Customer": {
    "Name": "Comprador Carnet simples"
  },
  "Payment": {
    "Provider": "CieloSandbox",
    "Authenticate": true,
    "Installments": 1,
    "Amount": 100,
    "Type": "DebitCard",
    "SoftDescriptor": "123456789ABCD",
    "DebitCard": {
      "ExpirationDate": "05/2024",
      "CardNumber": "1234567891234567",
      "Holder": "Test Holder",
      "Brand": "Visa",
      "SecurityCode": "123",
      "CardOnFile": {
        "Reason": "Unscheduled",
        "Usage": "first"
      }
    },
    "ExternalAuthentication": {
      "Eci": "05",
      "Cavv": "AAABAWFlmQAAAABjRWWZEEFgFz+=",
      "Xid": "blNhMmtMUWg4RDFoV2JaM1RRbjA="
    },
    "iscarnetransaction": true
  }
}
```

| Propriedade                  | Tipo     | Tamanho | Obrigatório         | Descrição                                                                                              |
| ---------------------------- | -------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| `Payment.IsCarneTransaction` | Booleano | ---     | Não (default false) | Deve ser enviado com valor “true” caso se trate de uma transação de pagamento de serviço do tipo Carnê |

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

| Parâmetro   | Descrição                               | Valor             | Formato  | Tamanho | Obrigatório |
| ----------- | --------------------------------------- | ----------------- | -------- | ------- | ----------- |
| `QuasiCash` | Identifica uma transação de quase cash. | "true" ou "false" | Booleano | -       | Não         |

### Facilitadores de Pagamento

Todos os clientes de E-Commerce que são **Facilitadores de Pagamento**, por **obrigatoriedade das bandeiras e do Banco Central** devem enviar campos específicos na **mensageria transacional**. A Cielo transmitirá as informações para as bandeiras por meio da mensageria transacional no momento da autorização.

Os campos específicos estão contidos dentro do nó `PaymentFacilitator`. Além dos campos deste nó, os facilitadores também precisam enviar obrigatoriamente o campo `SoftDescriptor` do nó `Payment`. Veja a seguir o exemplo do envio e da resposta.

> **Atenção:** As bandeiras, ao identificarem inconformidade devido ao não envio dos dados obrigatórios na mensageria transacional, aplicarão multas à Cielo as quais serão repassadas ao Facilitador responsável pelo envio dos dados transacionais.

#### Requisição

```json
{
  "MerchantOrderId": "2222222222",
  "Customer": {
    "Name": "Comprador Teste",
    "Identity": "11225468954",
    "IdentityType": "CPF",
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
    "Type": "CreditCard",
    "Amount": 157000,
    "Currency": "BRL",
    "Country": "BRA",
    "Provider": "Cielo",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "4024007197692931",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2021",
      "SecurityCode": "123",
      "SaveCard": "false",
      "Brand": "Visa"
    },
    "PaymentFacilitator": {
      "EstablishmentCode": "1234",
      "SubEstablishment": {
        "EstablishmentCode": "1234",
        "Identity": "11111111000100",
        "Mcc": "1234",
        "Address": "Alameda Grajau, 512",
        "City": "Barueri",
        "State": "SP",
        "CountryCode": "076",
        "PostalCode": "06455914",
        "PhoneNumber": "1155855585"
      }
    }
  }
}
```

| Propriedade                                           | Tipo    | Tamanho | Obrigatório                    | Descrição                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------- | ------- | ------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PaymentFacilitator.EstablishmentCode                  | Texto\* | 11      | Obrigatório para facilitadores | Código do estabelecimento do Facilitador. "Facilitator ID” (Cadastro do facilitador com as bandeiras)<br>O código é diferente por bandeira, podendo variar inclusive o tamanho do campo:<br>Bandeira Mastercard –06 dígitos<br>Bandeira Visa –08 dígitos<br>Bandeira ELO –de 04 à 05 dígitos<br>Bandeira Hipercard –06 dígitos<br>Para demais bandeiras, como Amex e JCB, o campo pode ser preenchido com “0” zeros. |
| PaymentFacilitator.SubEstablishment.EstablishmentCode | Texto\* | 15      | Obrigatório para facilitadores | Código do estabelecimento do sub Merchant. “Sub-Merchant ID” (Cadastro do subcredenciado com o facilitador)                                                                                                                                                                                                                                                                                                          |
| PaymentFacilitator.SubEstablishment.Identity          | Texto\* | 14      | Obrigatório para facilitadores | CNPJ ou CPF do sub-merchant.                                                                                                                                                                                                                                                                                                                                                                                         |
| PaymentFacilitator.SubEstablishment.Mcc               | Texto\* | 4       | Obrigatório para facilitadores | MCC do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                                 |
| PaymentFacilitator.SubEstablishment.Address           | Texto\* | 22      | Obrigatório para facilitadores | Endereço do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                            |
| PaymentFacilitator.SubEstablishment.City              | Texto\* | 13      | Obrigatório para facilitadores | Cidade do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                              |
| PaymentFacilitator.SubEstablishment.State             | Texto\* | 2       | Obrigatório para facilitadores | Estado do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                              |
| PaymentFacilitator.SubEstablishment.PostalCode        | Texto\* | 9       | Obrigatório para facilitadores | Código postal do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                       |
| PaymentFacilitator.SubEstablishment.CountryCode       | Texto\* | 3       | Obrigatório para facilitadores | Código país do sub-merchant com base no ISO 3166<br>Ex: código ISO 3166 do Brasil é o 076. [Lista completa online](https://www.iso.org/obp/ui/#search/code/).                                                                                                                                                                                                                                                        |
| PaymentFacilitator.SubEstablishment.PhoneNumber       | Texto\* | 13      | Obrigatório para facilitadores | Número de telefone do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                  |
| Payment.Softdescriptor                                | Texto\* | 13      | Obrigatório para facilitadores | Texto impresso na fatura bancaria comprador. Deve ser preenchido de acordo com os dados do sub Merchant.                                                                                                                                                                                                                                                                                                             |

\*_Evite utilizar acentos pois eles são considerados como dois caracteres._

<aside class="warning"><b>Atenção: Os campos não devem ser enviados com espaçamento a esquerda. Sujeito a rejeição na liquidação das transações.</b></aside>

#### Resposta

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador Teste",
    "Identity": "11225468954",
    "IdentityType": "CPF",
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
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "402400******2931",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "1223092935684",
    "ProofOfSale": "2935684",
    "AuthorizationCode": "065158",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Simulado",
    "IsQrCode": false,
    "PaymentFacilitator": {
      "EstablishmentCode": "1234",
      "SubEstablishment": {
        "EstablishmentCode": "1234",
        "Identity": "11111111000100",
        "Mcc": "1234",
        "Address": "Alameda Grajau, 512",
        "City": "Barueri",
        "State": "SP",
        "CountryCode": "076",
        "PostalCode": "06455914",
        "PhoneNumber": "1155855585"
      }
    },
    "Amount": 157000,
    "ReceivedDate": "2019-12-23 09:29:34",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "365c3a0d-fd86-480b-9279-4ba3da21333c",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/365c3a0d-fd86-480b-9279-4ba3da21333c/void"
      }
    ]
  }
}
```

| Propriedade                                           | Tipo    | Tamanho | Obrigatório                    | Descrição                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------- | ------- | ------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PaymentFacilitator.EstablishmentCode                  | Texto\* | 11      | Obrigatório para facilitadores | Código do estabelecimento do Facilitador. "Facilitator ID” (Cadastro do facilitador com as bandeiras)<br>O código é diferente por bandeira, podendo variar inclusive o tamanho do campo:<br>Bandeira Mastercard –06 dígitos<br>Bandeira Visa –08 dígitos<br>Bandeira ELO –de 04 à 05 dígitos<br>Bandeira Hipercard –06 dígitos<br>Para demais bandeiras, como Amex e JCB, o campo pode ser preenchido com “0” zeros. |
| PaymentFacilitator.SubEstablishment.EstablishmentCode | Texto\* | 15      | Obrigatório para facilitadores | Código do estabelecimento do sub Merchant. “Sub-Merchant ID” (Cadastro do subcredenciado com o facilitador)                                                                                                                                                                                                                                                                                                          |
| PaymentFacilitator.SubEstablishment.Identity          | Texto\* | 14      | Obrigatório para facilitadores | CNPJ ou CPF do sub-merchant.                                                                                                                                                                                                                                                                                                                                                                                         |
| PaymentFacilitator.SubEstablishment.Mcc               | Texto\* | 4       | Obrigatório para facilitadores | MCC do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                                 |
| PaymentFacilitator.SubEstablishment.Address           | Texto\* | 22      | Obrigatório para facilitadores | Endereço do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                            |
| PaymentFacilitator.SubEstablishment.City              | Texto\* | 13      | Obrigatório para facilitadores | Cidade do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                              |
| PaymentFacilitator.SubEstablishment.State             | Texto\* | 2       | Obrigatório para facilitadores | Estado do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                              |
| PaymentFacilitator.SubEstablishment.PostalCode        | Texto\* | 9       | Obrigatório para facilitadores | Código postal do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                       |
| PaymentFacilitator.SubEstablishment.CountryCode       | Texto\* | 3       | Obrigatório para facilitadores | Código país do sub-merchant com base no ISO 3166.<br>Ex: código ISO 3166 do Brasil é o 076. [Lista completa online](https://www.iso.org/obp/ui/#search/code/)                                                                                                                                                                                                                                                        |
| PaymentFacilitator.SubEstablishment.PhoneNumber       | Texto\* | 13      | Obrigatório para facilitadores | Número de telefone do sub Merchant.                                                                                                                                                                                                                                                                                                                                                                                  |
| Payment.Softdescriptor                                | Texto\* | 13      | Obrigatório para facilitadores | Texto impresso na fatura bancaria comprador. Deve ser preenchido de acordo com os dados do sub Merchant.                                                                                                                                                                                                                                                                                                             |

\*_Evite utilizar acentos pois eles são considerados como dois caracteres._

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
    "IsCustomerBillPaymentService": true,
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

| Propriedade                  | Tipo              | Tamanho | Obrigatório                  | Descrição                                                                                        |
| ---------------------------- | ----------------- | ------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| IsCustomerBillPaymentService | Boolean           | ---     | Não                          | True ou false. Indica se é uma transação CBPS (Serviço de Pagamento de Contas para Consumidores) |
| Wallet.AdditionalData.Mcc    | String (numérico) | 4       | Sim, para transações de CBPS | MCC do estabelecimento (EC) permitido para transações de CBPS                                    |

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
  "MerchantOrderId": "2012345678",
  "Customer": {
    "Name": "Comprador Carteira",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "CARTEIRA*NOMELOJA",
    "CreditCard": {
      "CardNumber": "4532110000001234",
      "Brand": "Visa",
      "SecurityCode": "123"
    },
    "Wallet": {
      "PlatformOperator": "ABC",
      "AdditionalData": {
        "Mcc": "1234"
      }
    }
  }
}
```

| Propriedade                 | Tipo              | Tamanho | Obrigatório                  | Descrição                                                                                                                                                                                                                       |
| --------------------------- | ----------------- | ------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Wallet.PlatformOperator`   | String (texto)    | 3       | Sim, para transações de SDWO | Sigla da carteira que está cadastrada aqui na Cielo como carteira digital (verificar sua sigla com seu gestor comercial)                                                                                                        |
| `Wallet.AdditionalData.Mcc` | String (numérico) | 4       | Sim, para transações de SDWO | MCC do varejista subjacente (pra transações de compra); MCC da carteira digital (para transações de abastecimento de crédito na carteira caso aplicável – no qual é necessária a marcação de cash in também vista nessa sessão) |
| `Customer.Identity`         | Texto             | 14      | Sim, para transações de SDWO | Número do CPF ou CNPJ do comprador.                                                                                                                                                                                             |
| `Customer.IdentityType`     | Texto             | 255     | Sim, para transações de SDWO | Tipo de documento de identificação do comprador (CPF/CNPJ).                                                                                                                                                                     |
| `SoftDescriptor`            | Texto             | 13      | Sim, para transações de SDWO | Texto que será impresso na fatura bancária do portador.<br> Não permite caracteres especiais.<br>Necessário preencher com **Nome da carteira\*nome do lojista**.                                                                |

### Transações Cash In

Uma transação do tipo Cash In é uma operação de adição de créditos em uma carteira digital. Os estabelecimentos que operam com esse tipo de transação devem ser registrados como carteira digital junto as bandeiras e devem estar cadastrados com um dos seguintes **MCCs (Códigos de categoria do estabelecimento)**: **6540** ou **6051**.

Além disso, precisam enviar alguns dados adicionais na transação, para que as bandeiras possam identificar e diferenciar esse tipo de transação. Veja as especificações:

> Além dos campos específicos dessa modalidade, para transações Cash In também é obrigatório o envio do Soft Descriptor (campo `Payment.SoftDescriptor`) e CPF ou CNPJ do portador (campo `Customer.Identity` e campo `Customer.IdentityType`). No caso de Cash In, o campo do Soft Descriptor precisa ser preenchido com **nome da carteira\*nome do portador**. Confira mais detalhes na tabela de campos da requisição.

**Importante:** A marcação de Cash In é apenas aceita para as seguintes modalidades e bandeiras: Visa/Mastercard só crédito; Elo débito e crédito. Não é aceita para cartão estrangeiro.

#### Requisição

```json
{
  "MerchantOrderId": "2012345678",
  "Customer": {
    "Name": "Comprador Carteira",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "CARTEIRA*NOMEPORTADOR",
    "CreditCard": {
      "CardNumber": "4532110000001234",
      "Brand": "Visa",
      "SecurityCode": "123"
    },
    "Wallet": {
      "PlatformOperator": "ABC",
      "AdditionalData": {
        "CashIn": "true"
      }
    }
  }
}
```

| Propriedade                 | Tipo           | Tamanho | Obrigatório                     | Descrição                                                                                                                                                         |
| --------------------------- | -------------- | ------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wallet.PlatformOperator     | String (texto) | 3       | Sim, para transações de Cash In | Sigla da carteira que está cadastrada aqui na Cielo como carteira digital (verificar sua sigla com seu gestor comercial)                                          |
| Wallet.AdditionalData.CshIn | String (texto) | -       | Sim, para transações de Cash In | Enviar como “True” se for uma transação de Cash In                                                                                                                |
| `Customer.Identity`         | Texto          | 14      | Sim, para transações de Cash In | Número do CPF ou CNPJ do comprador.                                                                                                                               |
| `Customer.IdentityType`     | Texto          | 255     | Sim, para transações de Cash In | Tipo de documento de identificação do comprador (CPF/CNPJ).                                                                                                       |
| `SoftDescriptor`            | Texto          | 13      | Sim, para transações de Cash In | Texto que será impresso na fatura bancária do portador.<br> Não permite caracteres especiais.<br>Necessário preencher com **Nome da carteira\*nome do portador**. |

# Tokenização de cartões

**O que é a _tokenização_ de cartões?**

É uma criptografia que permite o armazenamento seguro de dados sensíveis de cartão de crédito. Estes dados são transformados em um código criptografado chamado de _token_, que poderá ser armazenado em banco de dados. Com a tokenização, a loja poderá oferecer recursos como "Compra com um clique” e compras com **recorrência**, sempre preservando a integridade e a confidencialidade das informações.

## Criando um cartão tokenizado antes da autorização

Para salvar um cartão sem autorizar uma transação, basta realizar uma requisição de tokenização com os dados do cartão.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/card/</span></aside>

```json
{
  "CustomerName": "Comprador Teste Cielo",
  "CardNumber": "4532117080573700",
  "Holder": "Comprador T Cielo",
  "ExpirationDate": "12/2030",
  "Brand": "Visa"
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

| Propriedade      | Tipo  | Tamanho | Obrigatório | Descrição                                                                         |
| ---------------- | ----- | ------- | ----------- | --------------------------------------------------------------------------------- |
| `Name`           | Texto | 255     | Sim         | Nome do comprador.                                                                |
| `CardNumber`     | Texto | 16      | Sim         | Número do cartão do comprador.                                                    |
| `Holder`         | Texto | 25      | Sim         | Nome do comprador impresso no cartão.                                             |
| `ExpirationDate` | Texto | 7       | Sim         | Data de validade impressa no cartão.                                              |
| `Brand`          | Texto | 10      | Sim         | Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover). |

### Resposta

```json
{
  "CardToken": "db62dc71-d07b-4745-9969-42697b988ccb",
  "Links": {
    "Method": "GET",
    "Rel": "self",
    "Href": "https://apiquerydev.cieloecommerce.cielo.com.br/1/card/db62dc71-d07b-4745-9969-42697b988ccb"
  }
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

| Propriedade | Descrição                         | Tipo | Tamanho | Formato                              |
| ----------- | --------------------------------- | ---- | ------- | ------------------------------------ |
| `Cardtoken` | Token de identificação do cartão. | Guid | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## Criando um cartão tokenizado durante uma autorização

Para salvar um cartão criando seu token durante a autorização da transação de crédito, envie a requisição padrão de [transação de crédito](https://developercielo.github.io/manual/cielo-ecommerce#cart%C3%A3o-de-cr%C3%A9dito) e no campo `SaveCard` informe o valor "true".

A resposta da requisição retornará o token do cartão no campo `CardToken`.

## Tokenização de bandeira

Algumas bandeiras de cartão possuem uma solução de tokenização que oferece o armazenamento de cartões em cofres na própria bandeira, de forma criptografada. Essa tokenização de bandeira tem o intuito de melhorar a segurança e qualidade das informações de cartão trafegadas, o que acarreta em possíveis aumentos na conversão de aprovação pelos bancos emissores.

Veja todos os benefícios:

- **Maior segurança:** Além da criação de um código (token ou DPAN) para substituir a informação do cartão, as bandeiras também emitem os criptogramas, que funcionam como uma senha ou assinatura da bandeira, única para aquele cartão naquele estabelecimento;
- **Atualização automática de cartões:** Quando um novo cartão é emitido no lugar do cartão anterior, ou quando a data de expiração de um cartão muda, os bancos enviam essas informações para a base da bandeira, e a bandeira automaticamente atualiza os tokens com as novas informações. Ou seja, não tem necessidade de nenhuma ação por parte do estabelecimento;
- **Maior conversão de aprovação:** Por conta da maior segurança com os tokens das bandeiras, os bancos emissores se sentem mais seguros em aprovar as transações. Além disso, com os dados de cartão atualizados automaticamente, mais vendas que poderiam ser negadas por dados de cartão desatualizados podem ser aprovadas.

**Como funciona?**

As bandeiras participantes disponibilizam APIs para o recebimento e armazenamento do cartão de forma segura para adquirentes, gateways e parceiros, com a criação do token único e exclusivo para aquele cartão naquele estabelecimento.

A Cielo fornece esse serviço para os clientes de duas formas:

- **Integração facilitada:** O estabelecimento se integra com a funcionalidade de tokenização convencional da Cielo, que por trás realiza a tokenização da bandeira, e relaciona esses dois tokens no cofre da Cielo. Dessa forma, os estabelecimentos sempre terão um único token para aquele cartão, mas a Cielo terá os tokens e criptogramas da bandeiras internamente. Para conferir como é a integração com a tokeniação convencional da Cielo, volte para o menu [Tokenização de cartões](https://developercielo.github.io/manual/cielo-ecommerce#tokeniza%C3%A7%C3%A3o-de-cart%C3%B5es).
  **Bandeiras disponíveis:** Visa

> Para obter essa funcionalidade, entre em contato com nosso canal de suporte ecommerce solicitando a habilitação: **cieloecommerce@cielo.com.br**

- **Integração por fora:** Se o estabelecimento usa um gateway ou outro parceiro que já oferece a solução de token de bandeira, a Cielo possui os campos para que sejam enviadas as informações do token na transação, para que no processamento a bandeira receba os dados do token. Veja mais detalhes na requisição a seguir.
  **Bandeiras disponíveis:** Visa, Master e Elo.

Confira os campos a serem enviados na transação caso a opção escolhida seja a **integração por fora**:

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111701",
  "Customer": {
    "Name": "Comprador Teste",
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
    "Type": "CreditCard",
    "Amount": 15700,
    "Currency": "BRL",
    "Country": "BRA",
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": "ByMerchant",
    "Capture": true,
    "Authenticate": false,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "Cryptogram": "abcdefghijklmnopqrstuvw==",
      "ExpirationDate": "12/2030",
      "SecurityCode": "123",
      "SaveCard": "true",
      "Brand": "Visa"
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

| Propriedade                         | Tipo     | Tamanho | Obrigatório         | Descrição                                                                                                                                 |
| ----------------------------------- | -------- | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Payment.CreditCard.CardNumber`     | Texto    | 19      | Sim                 | Token gerado pela bandeira (DPAN). A indicação de que o `CardNumber` deve ser preenchido com o DPAN para caso de tokenização de bandeira. |
| `Payment.CreditCard.Holder`         | Texto    | 25      | Não                 | Nome do Comprador impresso no cartão.                                                                                                     |
| `Payment.CreditCard.Cryptogram`     | Texto    | 28      | Não                 | Criptograma gerado pela bandeira.                                                                                                         |
| `Payment.CreditCard.ExpirationDate` | Texto    | 7       | Sim                 | Data de validade do token gerado pela bandeira.                                                                                           |
| `Payment.CreditCard.SecurityCode`   | Texto    | 4       | Não                 | Código de segurança impresso no verso do cartão - Ver Anexo.                                                                              |
| `Payment.CreditCard.SaveCard`       | Booleano | ---     | Não (Default false) | Booleano que identifica se o cartão será salvo para gerar o CardToken.                                                                    |
| `Payment.CreditCard.Brand`          | Texto    | 10      | Sim                 | Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                     |

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

| Propriedade         | Descrição                                                                                                                      | Tipo  | Tamanho | Formato                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | ------------------------------------ |
| `ProofOfSale`       | Número da autorização, identico ao NSU.                                                                                        | Texto | 6       | Texto alfanumérico                   |
| `Tid`               | Id da transação na adquirente.                                                                                                 | Texto | 20      | Texto alfanumérico                   |
| `AuthorizationCode` | Código de autorização.                                                                                                         | Texto | 6       | Texto alfanumérico                   |
| `SoftDescriptor`    | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais | Texto | 13      | Texto alfanumérico                   |
| `PaymentId`         | Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.                         | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Representa o quão segura é uma transação.                                                        | Texto | 2       | Exemplos: 7                          |
| `Status`            | Status da Transação.                                                                                                           | Byte  | ---     | 2                                    |
| `ReturnCode`        | Código de retorno da Adquirência.                                                                                              | Texto | 32      | Texto alfanumérico                   |
| `ReturnMessage`     | Mensagem de retorno da Adquirência.                                                                                            | Texto | 512     | Texto alfanumérico                   |
| `Cardtoken`         | Token de identificação do Cartão.                                                                                              | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## Criando uma venda com cartão tokenizado

Para criar uma venda de cartão de crédito tokenizado, envie uma requisição de transação de crédito com o `CardToken` conforme o exemplo a seguir.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Teste"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
      "SecurityCode": "262",
      "Brand": "Visa"
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

| Propriedade               | Descrição                                        | Tipo  | Tamanho | Obrigatório |
| ------------------------- | ------------------------------------------------ | ----- | ------- | ----------- |
| `CreditCard.CardToken`    | Token de identificação do Cartão.                | Guid  | 36      | Sim         |
| `CreditCard.SecurityCode` | Código de segurança impresso no verso do cartão. | Texto | 4       | Não         |
| `CreditCard.Brand`        | Bandeira do cartão.                              | Texto | 10      | Sim         |

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
    "SoftDescriptor": "123456789ABCD",
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

| Propriedade         | Descrição                                                                                                                      | Tipo  | Tamanho | Formato                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | ------------------------------------ |
| `ProofOfSale`       | Número da autorização, identico ao NSU.                                                                                        | Texto | 6       | Texto alfanumérico                   |
| `Tid`               | Id da transação na adquirente.                                                                                                 | Texto | 20      | Texto alfanumérico                   |
| `AuthorizationCode` | Código de autorização.                                                                                                         | Texto | 6       | Texto alfanumérico                   |
| `SoftDescriptor`    | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - nao permite caracteres especiais | Texto | 13      | Texto alfanumérico                   |
| `PaymentId`         | Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.                         | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Representa o quão segura é uma transação.                                                        | Texto | 2       | Exemplos: 7                          |
| `Status`            | Status da Transação.                                                                                                           | Byte  | ---     | 2                                    |
| `ReturnCode`        | Código de retorno da Adquirência.                                                                                              | Texto | 32      | Texto alfanumérico                   |
| `ReturnMessage`     | Mensagem de retorno da Adquirência.                                                                                            | Texto | 512     | Texto alfanumérico                   |

## Criando uma venda com Cartão Tokenizado na 1.5

<aside class="warning">Essa integração visa atender clientes que estejam migrando da API 1.5 para a API 3.0.</aside>

Para criar uma venda de cartão de crédito com token do webservice 1.5, é necessário fazer um POST para o recurso Payment conforme o exemplo.

Para uso em Sandbox, é possivel simular transações autorizadas ou negadas via tokens de teste:

| Status     | Token                                                            |
| ---------- | ---------------------------------------------------------------- |
| Autorizado | 6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA |
| Negado     | 6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeB |

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador token 1.5"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "CreditCard": {
      "CardToken": "6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA",
      "Brand": "Visa"
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

| Propriedade            | Descrição                                                                                             | Tipo   | Tamanho | Obrigatório |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `MerchantId`           | Identificador da loja na API Cielo eCommerce.                                                         | Guid   | 36      | Sim         |
| `MerchantKey`          | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto  | 40      | Sim         |
| `RequestId`            | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid   | 36      | Não         |
| `MerchantOrderId`      | Numero de identificação do Pedido.                                                                    | Texto  | 50      | Sim         |
| `Customer.Name`        | Nome do Comprador.                                                                                    | Texto  | 255     | Não         |
| `Customer.Status`      | Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude           | Texto  | 255     | Não         |
| `Payment.Type`         | Tipo do Meio de Pagamento.                                                                            | Texto  | 100     | Sim         |
| `Payment.Amount`       | Valor do Pedido (ser enviado em centavos).                                                            | Número | 15      | Sim         |
| `Payment.Installments` | Número de Parcelas.                                                                                   | Número | 2       | Sim         |
| `CreditCard.CardToken` | Token de identificação do Cartão.                                                                     | Guid   | 300     | Sim         |
| `CreditCard.Brand`     | Bandeira do cartão.                                                                                   | Texto  | 10      | Sim         |

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

| Propriedade         | Descrição                                                                                                                      | Tipo  | Tamanho | Formato                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | ------------------------------------ |
| `ProofOfSale`       | Número da autorização, identico ao NSU.                                                                                        | Texto | 6       | Texto alfanumérico                   |
| `Tid`               | Id da transação na adquirente.                                                                                                 | Texto | 20      | Texto alfanumérico                   |
| `AuthorizationCode` | Código de autorização.                                                                                                         | Texto | 6       | Texto alfanumérico                   |
| `SoftDescriptor`    | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - nao permite caracteres especiais | Texto | 13      | Texto alfanumérico                   |
| `PaymentId`         | Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento.                         | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | Eletronic Commerce Indicator. Representa o quão segura é uma transação.                                                        | Texto | 2       | Exemplos: 7                          |
| `Status`            | Status da Transação.                                                                                                           | Byte  | ---     | 2                                    |
| `ReturnCode`        | Código de retorno da Adquirência.                                                                                              | Texto | 32      | Texto alfanumérico                   |
| `ReturnMessage`     | Mensagem de retorno da Adquirência.                                                                                            | Texto | 512     | Texto alfanumérico                   |

# Recorrência

Pagamentos recorrentes são transações de cartão de crédito que devem se repetir após um determinado período de tempo.

São pagamentos normalmente encontrados em **assinaturas**, nas quais o comprador deseja ser cobrado automaticamente mas não quer informar novamente os dados do cartão de crédito.

## Tipos de recorrências

A API E-commerce Cielo funciona com dois tipos de recorrências que possuem comportamentos diferentes:

- **Recorrência Própria**: quando a **loja** cria a própria inteligência de repetição de compra e armazena os dados do cartão;
- **Recorrência Programada**: quando a **Cielo** é responsável pela inteligência da repetição e armazenamento dos dados do cartão.

### Recorrência Própria

Nesse modelo, a loja é responsável por criar a inteligência necessária para:

| Inteligência                            | Descrição                                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Salvar os dados da transação**        | A loja precisará armazenar a transação e dados do pagamento.                                     |
| **Criar repetição transacional**        | A loja deverá enviar uma nova transação sempre que necessitar de uma autorização.                |
| **Comportamento para transação negada** | Caso uma das transações seja negada, caberá a loja a decisão de _retentar_ uma nova autorização. |

> A recorrência própria é uma transação padrão para a Cielo, sendo sua única diferença a necessidade de enviar um parâmetro adicional que a define como **Recorrência Própria**:<br/> > <br/> > **Parâmetro:** `Payment.Recurrent`= "true".

![Fluxo recorrência própria]({{ site.baseurl_root }}/images/apicieloecommerce/recorrencia-cielo-rec-propria.png)

#### Caso de uso

Este é um exemplo de como a API E-commerce Cielo permite a utilização de sistemas externos de recorrência em suas transações.

A recorrência própria é uma configuração da API E-commerce Cielo que permite que uma loja use um sistema de recorrência interno específico às suas necessidades de negócio.

Nesse modelo, o sistema da loja é encarregado por definir o período, os dados transacionais e, quando necessário, nos enviar a transação de recorrência.

**Recorrência Própria + Cartão Tokenizado**

A academia _CleverFit_ possui um sistema de cobrança diferenciado onde a matrícula é cobrada quinzenalmente, mas nunca nos fins de semana.

Por ser um modelo altamente customizado, a _CleverFit_ possui um sistema de recorrência própria, utilizando a API E-commerce Cielo via dois mecanismos:

1. **Recorrência Própria**: a _CleverFit_ envia os dados da transação como uma venda normal, mas a API identifica que é uma recorrência e aplica regras de autorização diferenciada ao pedido;
2. **Cartão Tokenizado**: a _CleverFit_ mantém os cartões salvos de forma tokenizada na Cielo, de acordo com as regras de segurança, evitando armazenar dados de cartões em seu sistema.

A _CleverFit_ envia a transação quinzenalmente para a API E-commerce Cielo, usando os tokens salvos na própria API e optando pela Recorrência Própria, que altera a regra de autorização para se adequar ao seu modelo de cobrança.

### Recorrência Programada

Nesse modelo, a Cielo é a responsável por executar uma recorrência de maneira automática.

A **Recorrência Programada** permite que a loja crie uma transação base que, ao ser enviada para a API E-commerce Cielo, será salva e executada seguindo as regras definidas pela loja.

Nesse modelo, a API realiza e permite:

| Vantagens                      | Descrição                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Salvar dados transacionais** | Salva dados da transação, criando assim um modelo de como serão as próximas recorrências.                                                              |
| **Automatizar a recorrência**  | Sem atuação da loja, a API cria as transações futuras de acordo com as definições da loja.                                                             |
| **Atualizar dados**            | Caso necessário, a API permite modificações das informações da transação (como dados do comprador) ou do ciclo de recorrência (como data e intervalo). |

A Recorrência Programada possui dois fluxos de requisição; a diferença está no parâmetro `AuthorizeNow`.

**Quando a primeira transação deve ser autorizada no momento do agendamento, envie `AuthorizeNow` como "true".**

![Fluxo recorrência programada]({{ site.baseurl_root }}/images/apicieloecommerce/recorrencia-cielo-rec-programada-primeiratransacao.png)

\*Se o Post de Notificação estiver configurado pela loja.

**Quando a primeira transação deve ser autorizada em momento posterior ao agendamento, envie `AuthorizeNow` como "false"; nesse caso, envie também o parâmetro `StartDate`.**

![Fluxo recorrência programada]({{ site.baseurl_root }}/images/apicieloecommerce/recorrencia-cielo-rec-programada-agendamento.png)

\*A transação de agendamento precisa do nó `RecurrentPayment`, da data da transação e do campo `AuthorizeNow` = "false".<br/>
\*\*Se o Post de Notificação estiver configurado pela loja.

Veja o exemplo do trecho com o nó `RecurrentPayment`, que deve ser inserido numa transação de crédito.

```json
"RecurrentPayment":
{
       "AuthorizeNow":"False",
       "StartDate":"2019-06-01"
       "EndDate":"2019-12-01",
       "Interval":"SemiAnnual"
}
```

Podemos definir os dados como:

| Paramêtros     | Descrição                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthorizeNow` | Define qual o momento que uma recorrência será criada. Se for enviado como "true", ela é criada no momento da autorização; se "false", a recorrência ficará suspensa até a data escolhida para ser iniciada (`StartDate`). |
| `StartDate`    | Define a data que transação da Recorrência Programada será autorizada.                                                                                                                                                     |
| `EndDate`      | Define a data que a Recorrência Programada será encerrada. Se não for enviada, a recorrência será executada até ser cancelada pela loja.                                                                                   |
| `Interval`     | Intervalo da recorrência.<br/>Monthly - Mensal;<br/>Bimonthly - Bimestral;<br/>Quarterly - Trimestral;<br/>SemiAnnual - Semestral;<br/>Annual - Anual.                                                                     |

> Quando uma transação é enviada à API E-commerce Cielo com o nó de Recorrência Programada (`RecurrentPayment`), o processo de recorrência passa a ser efetivo quando a transação é considerada **AUTORIZADA**. Desse ponto em diante, a transação passará a ocorrer dentro do intervalo definido pela loja.

Características importantes da **Recorrência Programada**:

| Informação        | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Criação**       | A primeira transação é chamada de **"Transação de agendamento"**. Todas as transações posteriores serão cópias dessa primeira transação. Ela não precisa ser capturada para que a recorrência seja criada, basta ser **AUTORIZADA**.                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Captura**       | Transações de Recorrência Programada não precisam ser capturadas. Após a primeira transação, todas as transações de recorrência são capturadas automaticamente pela API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Identificação** | Transações de Recorrência Programada geram dois tipos de identificação:<br><br>**`PaymentId`**: identifica uma transação. É o mesmo identificador das outras transações na API.<br><br>**`RecurrentPaymentId`**: identifica pedido de recorrência. Um `RecurrentPaymentId` possui inúmeros `PaymentId`s vinculados a ele. Essa é a variável usada para cancelar uma Recorrência Programada.                                                                                                                                                                                                                                             |
| **Consulta**      | Para consultar, basta usar um dos dois tipos de identificação:<br><br>**`PaymentId`**: Utilizada para consultar UMA TRANSAÇÃO DENTRO DA RECORRÊNCIA.<br><br>**`RecurrentPaymentId`**: Utilizado para consultar A RECORRÊNCIA.                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Cancelamento**  | Uma Recorrência Programada pode ser cancelada de duas maneiras: <br><br>_ **Lojista**: Solicita o cancelamento da recorrência. Não cancela transações ja finalizadas antes da ordem de cancelamento da recorrência. <br><br>_ **Por cartão invalido**: Caso a API identifique que um cartão salvo está inválido (ex.: expirado) a recorrência será cancelada e não se repetirá, até que a loja atualize o meio de pagamento. <br><br> **OBS:** Cancelamento de transações dentro da recorrência não encerra o agendamento de transações futuras. Somente o Cancelamento usando o **`RecurrentPaymentId`** encerra agendamentos futuros. |

**Estrutura de um `RecurrentPaymentId`**

![Estrutura RecurrentPaymentId]({{ site.baseurl_root }}/images/apicieloecommerce/recorrencia-cielo-rec-prog-identificacao.png)

#### Caso de uso

Este é um exemplo de como usar as recorrências da API E-commerce Cielo para elevar suas vendas.

A recorrência é o processo de salvar uma transação e repeti-la em um intervalo de tempo pré-definido. É ideal para modelo de assinaturas.

A Recorrência Programada Cielo tem as seguintes características:

- **Intervalos programados:** mensal, bimestral, trimestral, semestral e anual;
- **Data de validade:** permite definir se a recorrência tem data para acabar;
- **Retentativa:** se uma transação for negada, vamos retentar a transação até quatro vezes;
- **Atualização:** permite alterar dados da recorrência, como valor e intervalo.

**Recorrência mensal e anual**

A empresa _Musicfy_ oferece um serviço de assinatura online no qual seus clientes pagam para poderem acessar uma biblioteca de músicas e ouví-las via streaming.

Para captar o máximo de clientes, eles oferecem duas maneiras de pagamento:

- Mensal, por R$19,90;
- Anual (com desconto); por R$180,00.

Como eles executam a cobrança mensal ou anual de seus clientes?

A _MusicFy_ utiliza a Recorrência Programada da API E-commerce Cielo.

Ao criar uma transação, o _Musicfy_ informa que o pedido em questão deve se repetir mensalmente ou anualmente e que não há data de término para a cobrança.

Quais as vantagens de usar a recorrência programada para o _MusicFy_?

1. **Facilidade:** a cobrança de mensalidade é automática, logo o _MusicFy_ não precisa se preocupar em construir um sistema de cobrança;
2. **Usabilidade:** o valor das assinaturas pode ser atualizado sem a necessidade de refazer a transação. Um mês pode ser cancelado ou a recorrência pode ter um _delay_ (o modelo de 30 dias gratuito) com apenas uma configuração;
3. **Segurança:** a _MusicFy_ não precisa armazenar dados sensíveis do cartão e do comprador;
4. **Conversão:** a Recorrência Programada Cielo possui um sistema de retentativa automática. Caso uma das transações seja negada, ela será retentada até quatro vezes, buscando atingir a autorização.

## Criando Recorrências

### Criando uma Recorrência Própria

Para criar uma venda recorrente cuja o processo de recorrência e intervalo serão executados pela própria loja, basta fazer um POST conforme o exemplo.

A requisição segue a estrutura de uma transação de crédito padrão, mas o paramêtro `Payment.Recurrent` deve ser `true`; caso contrário, a transação será negada.

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec propria"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "Recurrent": true,
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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

| Propriedade                 | Descrição                                                                                                                      | Tipo    | Tamanho | Obrigatório |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- | ----------- |
| `MerchantId`                | Identificador da loja na API E-commerce Cielo.                                                                                 | Guid    | 6       | Sim         |
| `MerchantKey`               | Chave Pública para Autenticação Dupla na API E-commerce Cielo.                                                                 | Texto   | 40      | Sim         |
| `RequestId`                 | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                          | Guid    | 36      | Não         |
| `MerchantOrderId`           | Numero de identificação do Pedido.                                                                                             | Texto   | 50      | Sim         |
| `Customer.Name`             | Nome do Comprador.                                                                                                             | Texto   | 255     | Sim         |
| `Payment.Type`              | Tipo do Meio de Pagamento.                                                                                                     | Texto   | 100     | Sim         |
| `Payment.Amount`            | Valor do Pedido (ser enviado em centavos).                                                                                     | Número  | 15      | Sim         |
| `Payment.Installments`      | Número de Parcelas.                                                                                                            | Número  | 2       | Sim         |
| `Payment.SoftDescriptor`    | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais | Texto   | 13      | Não         |
| `Payment.Recurrent`         | marcação de uma transação de recorrencia não programada                                                                        | boolean | 5       | Não         |
| `CreditCard.CardNumber`     | Número do Cartão do Comprador.                                                                                                 | Texto   | 19      | Sim         |
| `CreditCard.Holder`         | Nome do Comprador impresso no cartão.                                                                                          | Texto   | 25      | Não         |
| `CreditCard.ExpirationDate` | Data de validade impresso no cartão.                                                                                           | Texto   | 7       | Sim         |
| `CreditCard.SecurityCode`   | Código de segurança impresso no verso do cartão.                                                                               | Texto   | 4       | Não         |
| `CreditCard.Brand`          | Bandeira do cartão.                                                                                                            | Texto   | 10      | Sim         |

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

| Propriedade                 | Descrição                                                                                                                      | Tipo    | Tamanho | Obrigatório |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- | ----------- |
| `MerchantId`                | Identificador da loja na API E-commerce Cielo.                                                                                 | Guid    | 6       | Sim         |
| `MerchantKey`               | Chave Publica para Autenticação Dupla na API E-commerce Cielo.                                                                 | Texto   | 40      | Sim         |
| `RequestId`                 | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                          | Guid    | 36      | Não         |
| `MerchantOrderId`           | Numero de identificação do Pedido.                                                                                             | Texto   | 50      | Sim         |
| `Customer.Name`             | Nome do Comprador.                                                                                                             | Texto   | 255     | Não         |
| `Payment.Type`              | Tipo do Meio de Pagamento.                                                                                                     | Texto   | 100     | Sim         |
| `Payment.Amount`            | Valor do Pedido (ser enviado em centavos).                                                                                     | Número  | 15      | Sim         |
| `Payment.Installments`      | Número de Parcelas.                                                                                                            | Número  | 2       | Sim         |
| `Payment.SoftDescriptor`    | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais | Texto   | 13      | Não         |
| `Payment.Recurrent`         | marcação de uma transação de recorrencia não programada                                                                        | boolean | 5       | Não         |
| `CreditCard.CardNumber`     | Número do Cartão do Comprador.                                                                                                 | Texto   | 19      | Sim         |
| `CreditCard.Holder`         | Nome do Comprador impresso no cartão.                                                                                          | Texto   | 25      | Não         |
| `CreditCard.ExpirationDate` | Data de validade impresso no cartão.                                                                                           | Texto   | 7       | Sim         |
| `CreditCard.SecurityCode`   | Código de segurança impresso no verso do cartão.                                                                               | Texto   | 4       | Não         |
| `CreditCard.Brand`          | Bandeira do cartão.                                                                                                            | Texto   | 10      | Sim         |

### Criando uma Recorrência Programada

Para criar uma venda recorrente cuja a primeira recorrência é autorizada com a forma de pagamento cartão de crédito, basta fazer um POST conforme o exemplo.

<aside class="warning"><strong>Atenção:</strong> Nessa modalidade de recorrência, a primeira transação deve ser capturada (`AuthorizeNow` = "true"). Todas as transações posteriores serão capturadas automaticamente.</aside>

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec programada"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "RecurrentPayment": {
      "AuthorizeNow": "true",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual"
    },
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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

| Propriedade                             | Descrição                                                                                                                                    | Tipo     | Tamanho | Obrigatório |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- |
| `MerchantId`                            | Identificador da loja na API Cielo eCommerce.                                                                                                | Guid     | 6       | Sim         |
| `MerchantKey`                           | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                                                                | Texto    | 40      | Sim         |
| `RequestId`                             | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                                        | Guid     | 36      | Não         |
| `MerchantOrderId`                       | Numero de identificação do Pedido.                                                                                                           | Texto    | 50      | Sim         |
| `Customer.Name`                         | Nome do Comprador.                                                                                                                           | Texto    | 255     | Sim         |
| `Payment.Type`                          | Tipo do Meio de Pagamento.                                                                                                                   | Texto    | 100     | Sim         |
| `Payment.Amount`                        | Valor do Pedido (ser enviado em centavos).                                                                                                   | Número   | 15      | Sim         |
| `Payment.Installments`                  | Número de Parcelas.                                                                                                                          | Número   | 2       | Sim         |
| `Payment.SoftDescriptor`                | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais               | Texto    | 13      | Não         |
| `Payment.RecurrentPayment.EndDate`      | Data para termino da recorrência.                                                                                                            | Texto    | 10      | Não         |
| `Payment.RecurrentPayment.Interval`     | Intervalo da recorrência.<br /><ul><li>Monthly (Default) </li><li>Bimonthly </li><li>Quarterly </li><li>SemiAnnual </li><li>Annual</li></ul> | Texto    | 10      | Não         |
| `Payment.RecurrentPayment.AuthorizeNow` | Booleano para saber se a primeira recorrência já vai ser Autorizada ou não.                                                                  | Booleano | ---     | Sim         |
| `CreditCard.CardNumber`                 | Número do Cartão do Comprador.                                                                                                               | Texto    | 19      | Sim         |
| `CreditCard.Holder`                     | Nome do Comprador impresso no cartão.                                                                                                        | Texto    | 25      | Não         |
| `CreditCard.ExpirationDate`             | Data de validade impresso no cartão.                                                                                                         | Texto    | 7       | Sim         |
| `CreditCard.SecurityCode`               | Código de segurança impresso no verso do cartão.                                                                                             | Texto    | 4       | Não         |
| `CreditCard.Brand`                      | Bandeira do cartão.                                                                                                                          | Texto    | 10      | Sim         |

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
    "SoftDescriptor": "123456789ABCD",
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

| Propriedade          | Descrição                                                                   | Tipo     | Tamanho | Formato                                                                                 |
| -------------------- | --------------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------- |
| `RecurrentPaymentId` | Campo Identificador da próxima recorrência.                                 | Guid     | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                    |
| `NextRecurrency`     | Data da próxima recorrência.                                                | Texto    | 7       | 12/2030 (MM/YYYY)                                                                       |
| `EndDate`            | Data do fim da recorrência.                                                 | Texto    | 7       | 12/2030 (MM/YYYY)                                                                       |
| `Interval`           | Intervalo entre as recorrências.                                            | Número   | 10      | <br>Monthly = 1 <BR>Bimonthly = 2<BR>Quarterly = 3<BR>SemiAnnual = 6<BR>Annual = 12<BR> |
| `AuthorizeNow`       | Booleano para saber se a primeira recorrência já vai ser autorizada ou não. | Booleano | ---     | true                                                                                    |

### Agendando uma Recorrência Programada

Para criar uma venda recorrente cuja a primeira recorrência não será autorizada na mesma data com a forma de pagamento cartão de crédito, basta fazer um POST conforme o exemplo.

Diferente da recorrência anterior, este exemplo não autoriza imediatamente, mas agenda uma autorização futura. Para programar a primeira transação da série de recorrências, passe o parâmetro `AuthorizeNow` como “false” e adicione o parâmetro `StartDate`.

#### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014113245231706",
  "Customer": {
    "Name": "Comprador rec programada"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1500,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "RecurrentPayment": {
      "AuthorizeNow": "false",
      "EndDate": "2019-12-01",
      "Interval": "SemiAnnual",
      "StartDate": "2015-06-01"
    },
    "CreditCard": {
      "CardNumber": "1234123412341231",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2030",
      "SecurityCode": "262",
      "SaveCard": "false",
      "Brand": "Visa"
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

| Propriedade                           | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`                          | Identificador da loja na API Cielo eCommerce                                                          | Guid  | 36      | Sim         |
| `MerchantKey`                         | Chave Publica para Autenticação Dupla na API Cielo eCommerce                                          | Texto | 40      | Sim         |
| `RequestId`                           | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `RecurrentPaymentId`                  | Numero de identificação da Recorrência.                                                               | Texto | 50      | Sim         |
| `Customer.Name`                       | Nome do Comprador.                                                                                    | Texto | 255     | Não         |
| `Customer.Status`                     | Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude           | Texto | 255     | Não         |
| `Customer.Email`                      | Email do Comprador.                                                                                   | Texto | 255     | Não         |
| `Customer.Birthdate`                  | Data de nascimento do Comprador.                                                                      | Date  | 10      | Não         |
| `Customer.Identity`                   | Número do RG, CPF ou CNPJ do Cliente.                                                                 | Texto | 14      | Não         |
| `Customer.Address.Street`             | Endereço do Comprador.                                                                                | Texto | 255     | Não         |
| `Customer.Address.Number`             | Número do endereço do Comprador.                                                                      | Texto | 15      | Não         |
| `Customer.Address.Complement`         | Complemento do endereço do Comprador.                                                                 | Texto | 50      | Não         |
| `Customer.Address.ZipCode`            | CEP do endereço do Comprador.                                                                         | Texto | 9       | Não         |
| `Customer.Address.City`               | Cidade do endereço do Comprador.                                                                      | Texto | 50      | Não         |
| `Customer.Address.State`              | Estado do endereço do Comprador.                                                                      | Texto | 2       | Não         |
| `Customer.Address.Country`            | Pais do endereço do Comprador.                                                                        | Texto | 35      | Não         |
| `Customer.Address.District`           | Bairro do Comprador.                                                                                  | Texto | 50      | Não         |
| `Customer.DeliveryAddress.Street`     | Endereço do Comprador.                                                                                | Texto | 255     | Não         |
| `Customer.DeliveryAddress.Number`     | Número do endereço do Comprador.                                                                      | Texto | 15      | Não         |
| `Customer.DeliveryAddress.Complement` | Complemento do endereço do Comprador.                                                                 | Texto | 50      | Não         |
| `Customer.DeliveryAddress.ZipCode`    | CEP do endereço do Comprador.                                                                         | Texto | 9       | Não         |
| `Customer.DeliveryAddress.City`       | Cidade do endereço do Comprador.                                                                      | Texto | 50      | Não         |
| `Customer.DeliveryAddress.State`      | Estado do endereço do Comprador.                                                                      | Texto | 2       | Não         |
| `Customer.DeliveryAddress.Country`    | Pais do endereço do Comprador.                                                                        | Texto | 35      | Não         |
| `Customer.DeliveryAddress.District`   | Bairro do Comprador.                                                                                  | Texto | 50      | Não         |

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
    "SoftDescriptor": "123456789ABCD",
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

| Propriedade          | Descrição                                                                                       | Tipo     | Tamanho | Formato                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------- |
| `RecurrentPaymentId` | Campo Identificador da próxima recorrência.                                                     | Guid     | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                    |
| `NextRecurrency`     | Data da próxima recorrência.                                                                    | Texto    | 7       | 12/2030 (MM/YYYY)                                                                       |
| `StartDate`          | Data do inicio da recorrência.                                                                  | Texto    | 7       | 12/2030 (MM/YYYY)                                                                       |
| `EndDate`            | Data do fim da recorrência.                                                                     | Texto    | 7       | 12/2030 (MM/YYYY)                                                                       |
| `Interval`           | Intervalo entre as recorrências.                                                                | Número   | 10      | <br>Monthly = 1 <BR>Bimonthly = 2<BR>Quarterly = 3<BR>SemiAnnual = 6<BR>Annual = 12<BR> |
| `AuthorizeNow`       | Booleano para saber se a primeira recorrência já vai ser autorizada ou se será apenas agendada. | Booleano | ---     | false                                                                                   |

## Modificando Recorrências

### Modificando dados do comprador

Altera dados do comprador da recorrência.

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Customer</span></aside>

```json
{
  "Name": "Customer",
  "Email": "customer@teste.com",
  "Birthdate": "1999-12-12",
  "Identity": "22658954236",
  "IdentityType": "CPF",
  "Address": {
    "Street": "Rua Teste",
    "Number": "174",
    "Complement": "AP 201",
    "ZipCode": "21241140",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BRA"
  },
  "DeliveryAddress": {
    "Street": "Outra Rua Teste",
    "Number": "123",
    "Complement": "AP 111",
    "ZipCode": "21241111",
    "City": "Qualquer Lugar",
    "State": "QL",
    "Country": "BRA",
    "District": "Teste"
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

| Propriedade                           | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------------------------------------------------------- |
| `MerchantId`                          | Identificador da loja na API Cielo eCommerce                                                          | Guid  | 36      | Sim                                                         |
| `MerchantKey`                         | Chave Publica para Autenticação Dupla na API Cielo eCommerce                                          | Texto | 40      | Sim                                                         |
| `RequestId`                           | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não                                                         |
| `RecurrentPaymentId`                  | Numero de identificação da Recorrência.                                                               | Texto | 50      | Sim                                                         |
| `Customer.Name`                       | Nome do Comprador.                                                                                    | Texto | 255     | Não                                                         |
| `Customer.Status`                     | Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude           | Texto | 255     | Não                                                         |
| `Customer.Email`                      | Email do Comprador.                                                                                   | Texto | 255     | Não                                                         |
| `Customer.Birthdate`                  | Data de nascimento do Comprador.                                                                      | Date  | 10      | Não                                                         |
| `Customer.Identity`                   | Número do RG, CPF ou CNPJ do Cliente.                                                                 | Texto | 14      | Não                                                         |
| `Customer.IdentityType`               | Texto                                                                                                 | 255   | Não     | Tipo de documento de identificação do comprador (CFP/CNPJ). |
| `Customer.Address.Street`             | Endereço do Comprador.                                                                                | Texto | 255     | Não                                                         |
| `Customer.Address.Number`             | Número do endereço do Comprador.                                                                      | Texto | 15      | Não                                                         |
| `Customer.Address.Complement`         | Complemento do endereço do Comprador.                                                                 | Texto | 50      | Não                                                         |
| `Customer.Address.ZipCode`            | CEP do endereço do Comprador.                                                                         | Texto | 9       | Não                                                         |
| `Customer.Address.City`               | Cidade do endereço do Comprador.                                                                      | Texto | 50      | Não                                                         |
| `Customer.Address.State`              | Estado do endereço do Comprador.                                                                      | Texto | 2       | Não                                                         |
| `Customer.Address.Country`            | Pais do endereço do Comprador.                                                                        | Texto | 35      | Não                                                         |
| `Customer.Address.District`           | Bairro do Comprador.                                                                                  | Texto | 50      | Não                                                         |
| `Customer.DeliveryAddress.Street`     | Endereço do Comprador.                                                                                | Texto | 255     | Não                                                         |
| `Customer.DeliveryAddress.Number`     | Número do endereço do Comprador.                                                                      | Texto | 15      | Não                                                         |
| `Customer.DeliveryAddress.Complement` | Complemento do endereço do Comprador.                                                                 | Texto | 50      | Não                                                         |
| `Customer.DeliveryAddress.ZipCode`    | CEP do endereço do Comprador.                                                                         | Texto | 9       | Não                                                         |
| `Customer.DeliveryAddress.City`       | Cidade do endereço do Comprador.                                                                      | Texto | 50      | Não                                                         |
| `Customer.DeliveryAddress.State`      | Estado do endereço do Comprador.                                                                      | Texto | 2       | Não                                                         |
| `Customer.DeliveryAddress.Country`    | Pais do endereço do Comprador.                                                                        | Texto | 35      | Não                                                         |
| `Customer.DeliveryAddress.District`   | Bairro do Comprador.                                                                                  | Texto | 50      | Não                                                         |

#### Resposta

```shell

HTTP Status 200

```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando data final da recorrência

Altera a data final da recorrência.

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

| Propriedade          | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid  | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                               | Texto | 50      | Sim         |
| `EndDate`            | Data para termino da recorrência.                                                                     | Texto | 10      | Sim         |

#### Resposta

```shell

HTTP Status 200

```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando intevalo da Recorrência

Altera o intervalo da Recorrência.

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

| Propriedade          | Descrição                                                                                                        | Tipo   | Tamanho | Obrigatório |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                                    | Guid   | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                                    | Texto  | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT            | Guid   | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                                          | Texto  | 50      | Sim         |
| `Interval`           | Intervalo da recorrência.<br>Monthly = 1 <BR>Bimonthly = 2<BR>Quarterly = 3<BR>SemiAnnual = 6<BR>Annual = 12<BR> | Número | 2       | Sim         |

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificar dia da recorrência

Altera o dia da recorrência.

Ao efetuar a alteração do dia da recorrência, considere as seguintes regras para execução da atualização na API:

1. Se o novo dia informado for depois do dia atual, iremos atualizar o dia da recorrência com efeito na próxima recorrência.
   Ex.: Hoje é dia 05/05 e a próxima recorrência é dia 25/05. Quando atualizado para o dia 10, a data da próxima recorrência será dia 10/05.

2. Se o novo dia informado for antes do dia atual, iremos atualizar o dia da recorrência, mas este só terá efeito depois que a próxima recorrência for executada com sucesso.
   Ex.: Hoje é dia 05/05 e a próxima recorrência é dia 25/05. Quando atualizado para o dia 03, a data da próxima recorrência permanecerá dia 25/05. Após sua execução, a recorrência seguinte será agendada para o dia 03/06.

3. Se o novo dia informado for antes do dia atual, mas a próxima recorrência for em outro mês, iremos atualizar o dia da recorrência com efeito na próxima recorrência.
   Ex.: Hoje é dia 05/05 e a próxima recorrência é dia 25/09. Quando atualizado para o dia 03, a data da próxima recorrência será 03/09.

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

| Propriedade          | Descrição                                                                                             | Tipo   | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid   | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto  | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid   | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                               | Texto  | 50      | Sim         |
| `RecurrencyDay`      | Dia da Recorrência.                                                                                   | Número | 2       | Sim         |

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando o valor da recorrência

Altera o valor da recorrência.

#### Requsição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Amount</span></aside>

```json
156
```

```shell
curl
--request PUT "https://apisandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}/Amount"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
156
--verbose
```

| Propriedade          | Descrição                                                                                             | Tipo   | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid   | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto  | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid   | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                               | Texto  | 50      | Sim         |
| `Payment.Amount`     | Valor do Pedido em centavos: 156 equivale a R$ 1,56                                                   | Número | 15      | Sim         |

<aside class="warning">Essa alteração só afeta a data de pagamento da próxima recorrência.</aside>

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando data do próximo pagamento

Altera a data do próximo pagamento.

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

| Propriedade          | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid  | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                               | Texto | 50      | Sim         |
| `NextPaymentDate`    | Data de pagamento da próxima recorrência.                                                             | Texto | 10      | Sim         |

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Modificando dados do pagamento da recorrência

Alterar os dados de pagamento da recorrência.

<aside class="notice"><strong>Atenção:</strong> Essa alteração afeta a todos os dados do nó Payment. Então para manter os dados anteriores você deve informar os campos que não vão sofre alterações com os mesmos valores que já estavam salvos.</aside>

#### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/RecurrentPayment/{RecurrentPaymentId}/Payment</span></aside>

```json
{
  "Type": "CreditCard",
  "Amount": "123",
  "Installments": 3,
  "Country": "USA",
  "Currency": "BRL",
  "SoftDescriptor": "123456789ABCD",
  "CreditCard": {
    "Brand": "Master",
    "Holder": "Teset card",
    "CardNumber": "1234123412341232",
    "ExpirationDate": "12/2030"
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

| Propriedade                 | Descrição                                                                                                                      | Tipo   | Tamanho | Obrigatório |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------ | ------- | ----------- |
| `MerchantId`                | Identificador da loja na API Cielo eCommerce.                                                                                  | Guid   | 36      | Sim         |
| `MerchantKey`               | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                                                  | Texto  | 40      | Sim         |
| `RequestId`                 | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                          | Guid   | 36      | Não         |
| `RecurrentPaymentId`        | Numero de identificação da Recorrência.                                                                                        | Texto  | 50      | Sim         |
| `Payment.Type`              | Tipo do Meio de Pagamento.                                                                                                     | Texto  | 100     | Sim         |
| `Payment.Amount`            | Valor do Pedido (ser enviado em centavos).                                                                                     | Número | 15      | Sim         |
| `Payment.Installments`      | Número de Parcelas.                                                                                                            | Número | 2       | Sim         |
| `Payment.SoftDescriptor`    | Texto que será impresso na fatura bancaria do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais | Texto  | 13      | Não         |
| `CreditCard.CardNumber`     | Número do Cartão do Comprador.                                                                                                 | Texto  | 16      | Sim         |
| `CreditCard.Holder`         | Nome do Comprador impresso no cartão.                                                                                          | Texto  | 25      | Não         |
| `CreditCard.ExpirationDate` | Data de validade impresso no cartão.                                                                                           | Texto  | 7       | Sim         |
| `CreditCard.SecurityCode`   | Código de segurança impresso no verso do cartão.                                                                               | Texto  | 4       | Não         |
| `CreditCard.Brand`          | Bandeira do cartão.                                                                                                            | Texto  | 10      | Sim         |

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Desabilitando um pedido recorrente

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

| Propriedade          | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid  | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                               | Texto | 50      | Sim         |

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

### Reabilitando um pedido recorrente

Reabilita um pedido recorrente.

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

| Propriedade          | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid  | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `RecurrentPaymentId` | Numero de identificação da Recorrência.                                                               | Texto | 50      | Sim         |

#### Resposta

```shell
HTTP Status 200
```

Veja o Anexo [HTTP Status Code](#http-status-code) para a lista com todos os códigos de status HTTP possivelmente retornados pela API.

## Renova Fácil

O Renova Fácil é um serviço desenvolvido pela Cielo em conjunto com os emissores, cujo objetivo é aumentar a taxa de conversão de vendas recorrentes com cartão de crédito e débito.

O uso desta funcionalidade permite a substituição automática de um cartão de crédito ou débito que foi substituído pelo banco emissor por algum motivo (vencimento atingido, troca etc). Dessa forma, quando uma transação com marcação de recorrência for submetida para a API e a Cielo identificar que o cartão enviado foi substituído, sua autorização será negada e a API retornará os dados do novo cartão nó `NewCard`.

<aside class="notice">Para usar o Renova Fácil, é necessário habilitar o serviço na Cielo. Nenhuma informação extra é enviada na requisição de autorização, porém a resposta terá o nó `NewCard`, tanto para transação de crédito quanto para transação de débito.</aside>

Veja a seguir o exemplo de resposta de uma transação de crédito.

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

| Propriedade          | Descrição                                                                   | Tipo     | Tamanho | Formato                                                 |
| -------------------- | --------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------- |
| `RecurrentPaymentId` | Campo Identificador da próxima recorrência.                                 | Guid     | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                    |
| `NextRecurrency`     | Data da próxima recorrência.                                                | Texto    | 7       | 12/2030 (MM/YYYY)                                       |
| `EndDate`            | Data do fim da recorrência.                                                 | Texto    | 7       | 12/2030 (MM/YYYY)                                       |
| `Interval`           | Intervalo entre as recorrência.                                             | Texto    | 10      | / Monthly / Bimonthly / Quarterly / SemiAnnual / Annual |
| `AuthorizeNow`       | Booleano para saber se a primeira recorrencia já vai ser Autorizada ou não. | Booleano | ---     | true ou false                                           |

| Propriedade              | Descrição                                                  | Tipo     | Tamanho | Obrigatório |
| ------------------------ | ---------------------------------------------------------- | -------- | ------- | ----------- |
| `NewCard.CardNumber`     | Novo número do Cartão do Comprador.                        | Texto    | 16      | Sim         |
| `NewCard.ExpirationDate` | nova data de validade do cartão.                           | Texto    | 7       | Sim         |
| `NewCard.Brand`          | Bandeira do cartão.                                        | Texto    | 10      | Sim         |
| `NewCard.SaveCard`       | Identifica se o cartão gerou Cardtoken durante a transação | Booleano | ---     | Sim         |

### Bandeiras e emissores habilitados

Bandeiras e emissores que já habilitaram o Renova Fácil:

| Emissores         | VISA | MASTER | ELO | Amex |
| ----------------- | ---- | ------ | --- | ---- |
| `BRADESCO`        | Sim  | Sim    | Sim | Sim  |
| `BANCO DO BRASIL` | Sim  | ---    | --- | ---  |
| `SANTANDER`       | Sim  | ---    | --- | ---  |
| `CITI`            | Sim  | ---    | --- | ---  |
| `BANCO PAN`       | Sim  | ---    | --- | ---  |

# Consulta, Captura e Cancelamento

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

| Propriedade   | Descrição                                                                                                      | Tipo  | Tamanho | Obrigatório |
| ------------- | -------------------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`  | Identificador da loja na API e-commerce Cielo.                                                                 | Guid  | 36      | Sim         |
| `MerchantKey` | Chave pública para Autenticação Dupla na API e-commerce Cielo.                                                 | Texto | 40      | Sim         |
| `RequestId`   | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT          | Guid  | 36      | Não         |
| `PaymentId`   | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento. | Texto | 36      | Sim         |

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

| Propriedade                          | Descrição                                                                                                                                                                                                                                                                                                                                | Tipo               | Tamanho | Formato                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- | ------------------------------------ |
| `MerchantOrderId`                    | Número de identificação do pedido.                                                                                                                                                                                                                                                                                                       | Texto              | 50      | Texto alfanumérico                   |
| `AcquirerOrderId`                    | Id da transação enviado ao autorizador, caso o MerchantOrderId seja maior que 20 caracteres ou tenha símbolos.                                                                                                                                                                                                                           | Texto              | 50      | Texto alfanumérico                   |
| `AuthorizationCode`                  | Código de autorização.                                                                                                                                                                                                                                                                                                                   | Texto              | 6       | Texto alfanumérico                   |
| `PaymentId`                          | Campo Identificador do Pedido.                                                                                                                                                                                                                                                                                                           | Guid               | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `Status`                             | Status da Transação.                                                                                                                                                                                                                                                                                                                     | Byte               | —       | 2                                    |
| `Customer.Name`                      | Nome do Comprador.                                                                                                                                                                                                                                                                                                                       | Texto              | 255     | Texto                                |
| `Customer.Status`                    | Status de cadastro do comprador na loja (NEW / EXISTING)                                                                                                                                                                                                                                                                                 | Texto              | 255     | Texto                                |
| `Payment.ProofOfSale`                | Número da autorização, identico ao NSU.                                                                                                                                                                                                                                                                                                  | Texto alfanumérico | 6       | Texto alfanumérico                   |
| `Payment.Tid`                        | Id da transação no provedor do meio de pagamento.                                                                                                                                                                                                                                                                                        | Texto alfanumérico | 40      | Texto alfanumérico                   |
| `Payment.Type`                       | Tipo do Meio de Pagamento.                                                                                                                                                                                                                                                                                                               | Texto              | 100     | Texto                                |
| `Payment.Amount`                     | Valor do Pedido (ser enviado em centavos).                                                                                                                                                                                                                                                                                               | Número             | 15      | 10000                                |
| `Payment.ReceivedDate`               | Data em que a transação foi recebida.                                                                                                                                                                                                                                                                                                    | Texto              | 19      | AAAA-MM-DD HH:mm:SS                  |
| `Payment.CapturedAmount`             | Valor capturado.                                                                                                                                                                                                                                                                                                                         | Número             | 15      | 10000                                |
| `Payment.CapturedDate`               | Data da captura.                                                                                                                                                                                                                                                                                                                         | Texto              | 19      | AAAA-MM-DD HH:mm:SS                  |
| `Payment.VoidedAmount`               | Valor cancelado/estornado, em centavos.                                                                                                                                                                                                                                                                                                  | Número             | 15      | 10000                                |
| `Payment.VoidedDate`                 | Data do cancelamento/estorno.                                                                                                                                                                                                                                                                                                            | Texto              | 19      | AAAA-MM-DD HH:mm:SS                  |
| `Payment.Provider`                   | Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.                                                                                                                                                                                                                                                      | Texto              | 15      | Texto                                |
| `CreditCard.CardNumber`              | Número do Cartão do Comprador.                                                                                                                                                                                                                                                                                                           | Texto              | 19      | Texto                                |
| `CreditCard.Holder`                  | Nome do Comprador impresso no cartão.                                                                                                                                                                                                                                                                                                    | Texto              | 25      | Texto                                |
| `CreditCard.ExpirationDate`          | Data de validade impresso no cartão.                                                                                                                                                                                                                                                                                                     | Texto              | 7       | MM/AAAA                              |
| `CreditCard.SecurityCode`            | Código de segurança impresso no verso do cartão - Ver Anexo.                                                                                                                                                                                                                                                                             | Texto              | 4       | Texto                                |
| `CreditCard.Brand`                   | Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                                                                                                                                                                                    | Texto              | 10      | Texto                                |
| `CreditCard.PaymentAccountReference` | O PAR(payment account reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado. Se for pra transação de débito, colocar o campo dentro do nó de DebitCard | Alfanumérico       | 29      | Alfanumérico                         |

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

| Propriedade       | Descrição                                                                                                      | Tipo  | Tamanho | Obrigatório |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`      | Identificador da loja na API e-commerce Cielo.                                                                 | Guid  | 36      | Sim         |
| `MerchantKey`     | Chave pública para Autenticação Dupla na API e-commerce Cielo.                                                 | Texto | 40      | Sim         |
| `RequestId`       | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT          | Guid  | 36      | Não         |
| `AcquirerOrderId` | Id da transação enviado ao autorizador, caso o MerchantOrderId seja maior que 20 caracteres ou tenha símbolos. | Texto | 50      | Sim         |
| `Tid`             | Numero de identificação do pagamento na adquirente.                                                            | Texto | 36      | Sim         |

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

| Propriedade                          | Descrição                                                                                                                                                                                                                                                                                                                                | Tipo               | Tamanho | Formato                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- | ------------------------------------ |
| `MerchantOrderId`                    | Número de identificação do pedido.                                                                                                                                                                                                                                                                                                       | Texto              | 50      | Texto alfanumérico                   |
| `AcquirerOrderId`                    | Id da transação enviado ao autorizador, caso o MerchantOrderId seja maior que 20 caracteres ou tenha símbolos.                                                                                                                                                                                                                           | Texto              | 50      | Texto alfanumérico                   |
| `AuthorizationCode`                  | Código de autorização.                                                                                                                                                                                                                                                                                                                   | Texto              | 6       | Texto alfanumérico                   |
| `PaymentId`                          | Campo Identificador do Pedido.                                                                                                                                                                                                                                                                                                           | Guid               | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `Status`                             | Status da Transação.                                                                                                                                                                                                                                                                                                                     | Byte               | —       | 2                                    |
| `Customer.Name`                      | Nome do Comprador.                                                                                                                                                                                                                                                                                                                       | Texto              | 255     | Texto                                |
| `Customer.Status`                    | Status de cadastro do comprador na loja (NEW / EXISTING)                                                                                                                                                                                                                                                                                 | Texto              | 255     | Texto                                |
| `Payment.ProofOfSale`                | Número da autorização, identico ao NSU.                                                                                                                                                                                                                                                                                                  | Texto alfanumérico | 6       | Texto alfanumérico                   |
| `Payment.Tid`                        | Id da transação no provedor do meio de pagamento.                                                                                                                                                                                                                                                                                        | Texto alfanumérico | 40      | Texto alfanumérico                   |
| `Payment.Type`                       | Tipo do Meio de Pagamento.                                                                                                                                                                                                                                                                                                               | Texto              | 100     | Texto                                |
| `Payment.Amount`                     | Valor do Pedido (ser enviado em centavos).                                                                                                                                                                                                                                                                                               | Número             | 15      | 10000                                |
| `Payment.ReceivedDate`               | Data em que a transação foi recebida.                                                                                                                                                                                                                                                                                                    | Texto              | 19      | AAAA-MM-DD HH:mm:SS                  |
| `Payment.CapturedAmount`             | Valor capturado.                                                                                                                                                                                                                                                                                                                         | Número             | 15      | 10000                                |
| `Payment.CapturedDate`               | Data da captura.                                                                                                                                                                                                                                                                                                                         | Texto              | 19      | AAAA-MM-DD HH:mm:SS                  |
| `Payment.VoidedAmount`               | Valor cancelado/estornado, em centavos.                                                                                                                                                                                                                                                                                                  | Número             | 15      | 10000                                |
| `Payment.VoidedDate`                 | Data do cancelamento/estorno.                                                                                                                                                                                                                                                                                                            | Texto              | 19      | AAAA-MM-DD HH:mm:SS                  |
| `Payment.Provider`                   | Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO PARA CRÉDITO.                                                                                                                                                                                                                                                      | Texto              | 15      | Texto                                |
| `CreditCard.CardNumber`              | Número do Cartão do Comprador.                                                                                                                                                                                                                                                                                                           | Texto              | 19      | Texto                                |
| `CreditCard.Holder`                  | Nome do Comprador impresso no cartão.                                                                                                                                                                                                                                                                                                    | Texto              | 25      | Texto                                |
| `CreditCard.ExpirationDate`          | Data de validade impresso no cartão.                                                                                                                                                                                                                                                                                                     | Texto              | 7       | MM/AAAA                              |
| `CreditCard.SecurityCode`            | Código de segurança impresso no verso do cartão - Ver Anexo.                                                                                                                                                                                                                                                                             | Texto              | 4       | Texto                                |
| `CreditCard.Brand`                   | Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                                                                                                                                                                                    | Texto              | 10      | Texto                                |
| `CreditCard.PaymentAccountReference` | O PAR(payment account reference) é o número que associa diferentes tokens a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação o campo não será retornado. Se for pra transação de débito, colocar o campo dentro do nó de DebitCard | Alfanumérico       | 29      | Alfanumérico                         |

### Consulta por MerchantOrderId

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

| Propriedade       | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`      | Identificador da loja na API Cielo eCommerce.                                                         | Guid  | 36      | Sim         |
| `MerchantKey`     | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto | 40      | Sim         |
| `RequestId`       | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `MerchantOrderId` | Campo identificador do pedido na loja.                                                                | Texto | 36      | Sim         |

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

| Propriedade | Descrição                                                                                                      | Tipo | Tamanho | Formato                              |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ---- | ------- | ------------------------------------ |
| `PaymentId` | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento. | Guid | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

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

| Propriedade          | Descrição                                                                                             | Tipo  | Tamanho | Obrigatório |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ------- | ----------- |
| `MerchantId`         | Identificador da loja na API Cielo eCommerce.                                                         | Guid  | 36      | Sim         |
| `MerchantKey`        | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto | 40      | Sim         |
| `RequestId`          | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid  | 36      | Não         |
| `RecurrentPaymentId` | Campo Identificador da Recorrência.                                                                   | Texto | 36      | Sim         |

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

| Propriedade                           | Descrição                                                            | Tipo   | Tamanho | Formato                                                                                                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RecurrentPaymentId`                  | Campo Identificador da próxima recorrência.                          | Guid   | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                                                                       |
| `NextRecurrency`                      | Data da próxima recorrência.                                         | Texto  | 7       | 12/2030 (MM/YYYY)                                                                                                                                                          |
| `StartDate`                           | Data do inicio da recorrência.                                       | Texto  | 7       | 12/2030 (MM/YYYY)                                                                                                                                                          |
| `EndDate`                             | Data do fim da recorrência.                                          | Texto  | 7       | 12/2030 (MM/YYYY)                                                                                                                                                          |
| `Interval`                            | Intervalo entre as recorrência.                                      | Texto  | 10      | / Monthly / Bimonthly / Quarterly / SemiAnnual / Annual                                                                                                                    |
| `CurrentRecurrencyTry `               | Indica o número de tentativa da recorrência atual                    | Número | 1       | 1                                                                                                                                                                          |
| `OrderNumber`                         | Identificado do Pedido na loja                                       | Texto  | 50      | 2017051101                                                                                                                                                                 |
| `Status`                              | Status do pedido recorrente                                          | Número | 1       | <br>_1_ - Ativo <br>_2_ - Finalizado <br>_3_- Desativada pelo Lojista <br> _4_ - Desativada por numero de retentativas <BR> _5_ - Desativada por cartão de crédito vencido |
| `RecurrencyDay`                       | O dia da recorrência                                                 | Número | 2       | 22                                                                                                                                                                         |
| `SuccessfulRecurrences`               | Quantidade de recorrência realizada com sucesso                      | Número | 2       | 5                                                                                                                                                                          |
| `RecurrentTransactions.PaymentId`     | Número de identificação do pagamento (que faz parte da recorrência). | Guid   | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                                                                       |
| `RecurrentTransactions.TransactionId` | Payment ID da transação gerada na recorrência                        | Guid   | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                                                                       |
| `RecurrentTransactions.PaymentNumber` | Número da Recorrência. A primeira é zero                             | Número | 2       | 3                                                                                                                                                                          |
| `RecurrentTransactions.TryNumber`     | Número da tentativa atual na recorrência específica                  | Número | 2       | 1                                                                                                                                                                          |

## Captura

A **captura** é procedimento exclusivo para transações de cartões de crédito. Há dois tipos de captura:

- Captura automática: é solicitada na mesma [requisição de autorização da transação de crédito]() enviando o `Payment.Capture` como "true".
- Captura posterior: é solicitada depois do envio da requisição de autorização da transação de crédito.
  <br/>
  <br/>
  **Nesta seção, apresentamos as orientações para fazer a _captura posterior_**.

Ao realizar uma captura, o lojista confirma que o valor autorizado no cartão poderá ser cobrado pela instituição financeira emissora do cartão.

**Importante**:

- A captura executa a cobrança do cartão;
- A captura inclui o valor da venda na fatura do comprador;
- O lojista paga à Cielo somente as transações capturadas.

<aside class="notice"><strong>Atenção:</strong> A captura é um processo com prazo de execução padrão de 15 dias. Verifique seu cadastro Cielo para confirmar o limite habilitado para a sua afiliação. Após esse periodo, não é possivel realiza a captura da transação. Se a transação não for capturada, a autorização vai expirar e assim não haverá cobrança no cartão do portador e o limite será liberado.</aside>

### Captura parcial ou total

É possível capturar um valor parcial ou o valor total da transação.

A **captura parcial** é o ato de capturar um valor menor que o valor autorizado. Esse modelo de captura pode ocorrer apenas uma vez por transação.

**Após a captura, não é possível realizar capturas adicionais no mesmo pedido.**

#### Requisição

- Para **captura parcial**, envie o campo `Amount`na requisição de captura com o valor desejado a capturar;
- Para **captura total**, não envie o campo `Amount`. Será considerado o valor total da autorização.

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

| Propriedade        | Descrição                                                                                                                                                             | Tipo   | Tamanho | Obrigatório |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `MerchantId`       | Identificador da loja na API Cielo eCommerce.                                                                                                                         | Guid   | 36      | Sim         |
| `MerchantKey`      | Chave pública para Autenticação Dupla na API Cielo E-commerce.                                                                                                        | Texto  | 40      | Sim         |
| `RequestId`        | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT                                                                 | Guid   | 36      | Não         |
| `PaymentId`        | Número de identificação do pagamento, necessário para futuras operações como Consulta, Captura e Cancelamento.                                                        | Guid   | 36      | Sim         |
| `Amount`           | Valor a ser capturado, em centavos. Se essa campo não for preenchido, o valor da captura será o valor total da autorização.                                           | Número | 15      | Não         |
| `ServiceTaxAmount` | Exclusivo para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização. | Número | 15      | Não         |

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

| Propriedade         | Descrição                               | Tipo  | Tamanho | Formato            |
| ------------------- | --------------------------------------- | ----- | ------- | ------------------ |
| `Status`            | Status da Transação.                    | Byte  | ---     | 2                  |
| `ProofOfSale`       | Número da autorização, identico ao NSU. | Texto | 6       | Texto alfanumérico |
| `Tid`               | Id da transação na adquirente.          | Texto | 20      | Texto alfanumérico |
| `AuthorizationCode` | Código de autorização.                  | Texto | 6       | Texto alfanumérico |
| `ReturnCode`        | Código de retorno da adquirente.        | Texto | 32      | Texto alfanumérico |
| `ReturnMessage`     | Mensagem de retorno da adquirente.      | Texto | 512     | Texto alfanumérico |

<aside class="notice"><strong>Captura de Taxa de embarque</strong> Para realizar a captura da *taxa de embarque*, basta adicionar o valor do ServiveTaxAmount a ser capturado</aside>

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/1/sales/{paymentId}/capture?amount={Valor}&serviceTaxAmount=xxx</span></aside>

## Cancelamento

O cancelamento é uma funcionalidade que permite ao lojista estornar um pedido de compra. O cancelamento pode ocorrer por insuficiência de estoque ou por desistência da compra pelo consumidor, entre outros motivos.

Na API Cielo E-commerce é possível realizar a requisição de cancelamento para **cartões de débito e crédito**.

- Para **transações autorizadas e não capturadas** (status transacional = 1), o cancelamento pode ser solicitado antes de ocorrer o desfazimento automático da transação.

- Para **transações capturadas** (status transacional = 2), o cancelamento pode ser solicitado 1 dia após a captura e em um prazo de até 360 dias após a autorização da venda. A aprovação dessa ordem de cancelamento é suscetível à avalição de saldo na agenda financeira do lojista no momento da requisição e à aprovação do banco emissor do cartão usado na transação.

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

| Propriedade   | Descrição                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------ | ------- | ----------- |
| `MerchantId`  | Identificador da loja na API Cielo E-commerce.                                                         | Guid   | 36      | Sim         |
| `MerchantKey` | Chave pública para Autenticação Dupla na API Cielo E-commerce.                                         | Texto  | 40      | Sim         |
| `RequestId`   | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT  | Guid   | 36      | Não         |
| `PaymentId`   | Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento. | Guid   | 36      | Sim         |
| `Amount`      | Valor do Pedido (ser enviado em centavos).                                                             | Número | 15      | Não         |

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

| Propriedade         | Descrição                               | Tipo  | Tamanho | Formato            |
| ------------------- | --------------------------------------- | ----- | ------- | ------------------ |
| `Status`            | Status da Transação.                    | Byte  | ---     | 2                  |
| `ProofOfSale`       | Número da autorização, identico ao NSU. | Texto | 6       | Texto alfanumérico |
| `Tid`               | Id da transação na adquirente.          | Texto | 20      | Texto alfanumérico |
| `AuthorizationCode` | Código de autorização.                  | Texto | 6       | Texto alfanumérico |
| `ReturnCode`        | Código de retorno da adquirente.        | Texto | 32      | Texto alfanumérico |
| `ReturnMessage`     | Mensagem de retorno da adquirente.      | Texto | 512     | Texto alfanumérico |

### Cancelamento parcial

O **cancelamento parcial** é o ato de cancelar um valor menor do que o valor total que foi autorizado e capturado. Esse modelo de cancelamento pode ocorrer inúmeras vezes, até que o valor total da transação seja cancelado.

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

| Propriedade   | Descrição                                                                                              | Tipo   | Tamanho | Obrigatório |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------ | ------- | ----------- |
| `MerchantId`  | Identificador da loja na API Cielo E-commerce.                                                         | Guid   | 36      | Sim         |
| `MerchantKey` | Chave pública para Autenticação Dupla na API Cielo E-commerce.                                         | Texto  | 40      | Sim         |
| `RequestId`   | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT  | Guid   | 36      | Não         |
| `PaymentId`   | Número de identificação do pagamento, necessário para operações como Consulta, Captura e Cancelamento. | Guid   | 36      | Sim         |
| `Amount`      | Valor do Pedido (ser enviado em centavos).                                                             | Número | 15      | Não         |

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
| ----------------------- | --------------------------------------- | ----- | ------- | ------------------ |
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

| RETURN CODE | DESCRIÇÃO                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------ |
| 6           | Solicitação de cancelamento parcial aprovada com sucesso.                                        |
| 9           | Solicitação de cancelamento total aprovada com sucesso.                                          |
| 72          | Erro: Saldo do lojista insuficiente para cancelamento de venda.                                  |
| 77          | Erro: Venda original não encontrada para cancelamento.                                           |
| 100         | Erro: Forma de pagamento e/ou Bandeira não permitem cancelamento.                                |
| 101         | Erro: Valor de cancelamento solicitado acima do prazo permitido para cancelar.                   |
| 102         | Erro: Cancelamento solicitado acima do valor da transação original.                              |
| 103         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento. |
| 104         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento. |
| 105         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento. |
| 106         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento. |
| 107         | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento. |
| 108         | Erro: Número do Estabelecimento (EC) não encontrado. Por favor, verifique o número enviado.      |
| 475         | Falha no processamento. Por favor, tente novamente.                                              |

### Cancelamento via site Cielo

É possivel realizar tanto o cancelamento total quanto o cancelamento parcial via site Cielo.

# Post de Notificação

O **Post de Notificação** é um **webhook** que envia notificações sobre mudanças no status da transação ou sobre criação de pedido recorrente.

Durante seu cadastro na Cielo, você deve configurar um endpoint para que a Cielo envie as notificações e pode também configurar os eventos para os quais deseja receber notificações.

### Eventos Notificados

Os eventos passíveis de notificação por meio de pagamento são:

| Meio de Pagamento            | Eventos que podem ser notificados        |
| ---------------------------- | ---------------------------------------- |
| **Cartão de Crédito**        | Captura;<br/>Cancelamento;<br/>Sondagem. |
| **Cartão de débito**         | Captura;<br/>Sondagem.                   |
| **Boleto**                   | Conciliação;<br/>Cancelamento manual     |
| **Transferência eletrônica** | Confirmadas                              |

A notificação ocorre também ocorre em eventos relacionados a **Recorrência Programada Cielo**

| Eventos da Recorrência                                                   |
| ------------------------------------------------------------------------ |
| Desabilitado ao atingir número máximo de tentativas (transações negadas) |
| Reabilitação                                                             |
| Finalizado / Data de finalização atingida                                |
| Desativação                                                              |
| Criação da transação de recorrência do pedido recorrente.                |

> Os eventos só são notificados quando se você solicitar o recebimento desse tipo de notificação ao Suporte Cielo.

### Endpoint de Notificação

Você deve informar um endpoint (`URL Status Pagamento`) ao Suporte Cielo, para que o Post de Notificação seja executado.

Características da `URL Status Pagamento`

- Deve ser **estática**;
- Limite de 255 caracteres.

Características do **Post de notificação**

- É disparado a cada 30 minutos;
- Em caso de falha, são realizadas três novas tentativas.

> Para aumentar a segurança, é possível cadastrar uma informação para retorno do header para o seu endpoint. Com isso, seu endpoint só vai aceitar a notificação se a Cielo enviar o header.

Para configurar as informações do header, informe ao Suporte Cielo os itens a seguir:

- `KEY` - Nome do parâmetro
- `VALUE` - Valor estático a ser retornado

Você pode cadastrar até 3 tipos de informação de retorno no header.

> A **loja deverá retornar** como resposta à notificação: **HTTP Status Code 200 OK**.

O conteúdo da notificação será formado por três campos:

- `RecurrentPaymentId`: identificador que representa um conjunto de transações recorrentes;
- `PaymentId`: número de identificação do pagamento;
- `ChangeType`: especifica o tipo de notificação.

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

| Propriedade          | Descrição                                                                                                                                      | Tipo   | Tamanho | Obrigatório |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------- |
| `RecurrentPaymentId` | Identificador que representa o pedido Recorrente (aplicável somente para ChangeType 2 ou 4).                                                   | GUID   | 36      | Não         |
| `PaymentId`          | Número de identificação do pagamento.                                                                                                          | GUID   | 36      | Sim         |
| `ChangeType`         | Especifica o tipo de notificação. Veja a [tabela de Changetype](https://developercielo.github.io/manual/cielo-ecommerce#tabela-de-changetype). | Número | 1       | Sim         |

### Tabela de ChangeType

| ChangeType | Descrição                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1          | Mudança de status do pagamento                                                                                                                                  |
| 2          | Recorrência criada                                                                                                                                              |
| 3          | Mudança de status do Antifraude. Exclusivo para clientes integrados ao Antifraude.                                                                              |
| 4          | Mudança de status do pagamento recorrente (Ex. desativação automática)                                                                                          |
| 5          | cancelamento negado                                                                                                                                             |
| 7          | Notificação de chargeback. Exclusivo para clientes integrados à [Risk Notification API](https://braspag.github.io//manual/risknotification){:target="\_blank"}. |
| 8          | Alerta de fraude                                                                                                                                                |

# Consulta BIN

A **Consulta BIN** é um serviço de **pesquisa de dados do cartão**, seja ele de crédito ou débito, que identifica características do cartão com base nos primeiros dígitos e retorna informações que permitem validar os dados preenchidos na tela de pagamento.

A Consulta BIN retorna os seguintes dados sobre o cartão:

- **Bandeira do cartão:** nome da bandeira;
- **Tipo de cartão:** crédito, débito ou múltiplo (crédito e débito);
- **Nacionalidade do cartão:** estrangeiro ou nacional;
- **Cartão Corporativo:** se o cartão é ou não é corporativo;
- **Banco Emissor:** código e nome do emissor;
- **Cartão pré-pago:** se o cartão é ou não é pré-pago.
  <br/>
  <br/>
  Essas informações permitem tomar ações no momento do pagamento para melhorar a conversão da loja.

<aside class="warning">Para habilitar a Consulta Bin, entre em contato com a equipe de suporte da Cielo.</aside>

## Casos de Uso

Com base no resultado da Consulta BIN você pode desenvolver funcionalidades no seu checkout para melhorar a usabilidade para quem está comprando e, assim, ajudar na recuperação de carrinhos e na melhor conversão da sua loja.

**1. Evitar erros referentes à bandeira ou ao tipo de cartão**:

- A consulta BIN retorna a **bandeira correta** do cartão uma vez que está associada à base de BINS das bandeiras; esse é um método muito mais seguro do que se basear em algoritmos no formulário;

- No checkout da sua loja, você pode criar uma mensagem para avisar ao consumidor se ele está usando um cartão de débito quando na verdade deveria usar um de crédito.

**2. Oferecer recuperação de carrinhos online**

Você pode desenvolver um fluxo no seu checkout para que, caso um cartão informado na tela de pagamento seja múltiplo (crédito e débito), a sua loja pode reter os dados do cartão e, caso a transação de crédito falhe, oferecer automaticamente ao consumidor uma transação de débito com o mesmo cartão.

**3. Alertar sobre cartões internacionais ou pré-pagos**

A Consulta BIN no carrinho pode indicar a tentativa de uso de um cartão internacional ou pré-pago. Se a sua loja não deseja receber pagamentos internacionais ou de cartões pré-pagos, você pode configurar o seu checkout para informar ao consumidor que a loja não aceita o cartão informado.

## Integração

### Requisição

Basta realizar um `GET` enviando o BIN à nossa URL de consulta:

<aside class="request"><span class="method get">GET</span><span class="endpoint">/1/cardBin/`BIN`</span></aside>

| Campo | Descrição                                        |
| ----- | ------------------------------------------------ |
| `BIN` | São os seis ou nove primeiros dígitos do cartão. |

```json
https://apiquerysandbox.cieloecommerce.cielo.com.br/1/cardBin/420020
```

### Resposta

```json
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

| Paramêtro       | Tipo     | Tamanho       | Descrição                                                                                                                                                                                  |
| --------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Status`        | Texto    | 2             | Status da requisição de análise de Bins: <br><br> 00 – Análise autorizada <br> 01 – Bandeira não suportada <br> 02 – Cartão não suportado na consulta de bin <br> 73 – Afiliação bloqueada |
| `Provider`      | Texto    | 255           | Bandeira do cartão.                                                                                                                                                                        |
| `CardType`      | Texto    | 20            | Tipo do cartão em uso : <br><br> Crédito <br> Débito <br>Multiplo                                                                                                                          |
| `ForeingCard`   | Booleano | -             | Se o cartão é emitido no exterior (False/True).                                                                                                                                            |
| `CorporateCard` | Booleano | -             | Se o cartão é corporativo (False/True).                                                                                                                                                    |
| `Issuer`        | Texto    | 255           | Nome do emissor do cartão.                                                                                                                                                                 |
| `IssuerCode`    | Texto    | 255           | Código do emissor do cartão.                                                                                                                                                               |
| `Prepaid`       | Boolean  | True ou False | Retornará "True" caso o cartão seja do tipo pré pago.                                                                                                                                      |

> **Atenção**: Em [**sandbox**](https://developercielo.github.io/manual/cielo-ecommerce#consulta-bin-sandbox) os valores retornados são simulações e não validações reais de BINS. Considere apenas o retorno da requisição e o seu formato. Para identificação real dos bins, use o ambiente de produção.

# Zero Auth

O **Zero Auth** é uma ferramenta da Cielo que permite verificar se um cartão está válido para realizar uma compra antes que o pedido seja finalizado. O Zero Auth simula uma autorização sem afetar o limite de crédito ou alertar o portador do cartão sobre o teste.

> O Zero Auth não informa o limite ou características do cartão ou do portador, apenas simula uma autorização Cielo.

O Zero Auth é a forma correta de validar cartões de acordo com as recomendações das bandeiras e bancos. Antes da criação do Zero Auth, as lojas costumavam criar transações de valores baixos, como um real ou um dólar, e fazer o cancelamento em seguida; é importante saber que essa prática hoje é penalizada pelas bandeiras.

> **Atenção:** Na ocorrência de transações com valor diferente de _zero_ e inferior a _um dólar_, seguidas do cancelamento da transação, as bandeiras aplicarão tarifas à Cielo, que serão repassadas aos estabelecimentos que estiverem em inconformidade. A bandeira Mastercard por exemplo, está cobrando uma tarifa no valor de R$ 0,21 centavos por transação.

O **ZeroAuth** faz a validação de **cartões abertos ou tokenizados** (envio do `CardToken` criado na API Cielo E-commerce).

**Bandeiras suportadas**

O Zero Auth suporta as bandeiras **Visa, Master** e **Elo** tanto para cartões de crédito quanto de débito.

Caso outras bandeiras sejam enviadas, haverá um erro com o retorno "**57-Bandeira inválida**".

## Integração

Para realizar a consulta ao Zero Auth, o lojista deverá enviar uma requisição `POST` para a API Cielo Ecommerce, simulando uma transação.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/zeroauth</span></aside>

A validação de um cartão aberto necessita de um contrato técnico diferente da validação de um cartão tokenizado. Confira os exemplos de requisição a seguir:

#### Cartão aberto

```json
{
  "CardNumber": "1234123412341231",
  "Holder": "Alexsander Rosa",
  "ExpirationDate": "12/2021",
  "SecurityCode": "123",
  "SaveCard": "false",
  "Brand": "Visa",
  "CardOnFile": {
    "Usage": "First",
    "Reason": "Recurring"
  }
}
```

A seguir, a listagem de campos da Requisição:

| Paramêtro        | Descrição                                                                                                                                                                                                                                                                                                                                                                                                 | Tipo    | Tamanho | Obrigatório |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :---------: |
| `CardType`       | _Creditcard ou DebitCard_                                                                                                                                                                                                                                                                                                                                                                                 | Texto   | 255     |     Sim     |
| `CardNumber`     | Número do Cartão do Comprador                                                                                                                                                                                                                                                                                                                                                                             | Texto   | 16      |     Sim     |
| `Holder`         | Nome do Comprador impresso no cartão.                                                                                                                                                                                                                                                                                                                                                                     | Texto   | 25      |     Sim     |
| `ExpirationDate` | Data de e validade impresso no cartão.                                                                                                                                                                                                                                                                                                                                                                    | Texto   | 7       |     Sim     |
| `SecurityCode`   | Código de segurança impresso no verso do cartão.                                                                                                                                                                                                                                                                                                                                                          | Texto   | 4       |     Sim     |
| `SaveCard`       | Booleano que identifica se o cartão será salvo para gerar o CardToken.                                                                                                                                                                                                                                                                                                                                    | Boolean | ---     |     Sim     |
| `Brand`          | Bandeira do cartão: <br><br>Visa<br>Master<br>Elo                                                                                                                                                                                                                                                                                                                                                         | Texto   | 10      |     Sim     |
| `CardToken`      | Token do cartão na 3.0                                                                                                                                                                                                                                                                                                                                                                                    | GUID    | 36      | Condicional |
| `Usage`          | **First** se o cartão foi armazenado e é seu primeiro uso.<br>**Used** se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação.                                                                                                                                                                                                                                                | Texto   | ---     |     Não     |
| `Reason`         | Indica o propósito de armazenamento de cartões, caso o campo "Usage" for "Used".<BR>**Recurring** - Compra recorrente programada (ex. assinaturas)<br>**Unscheduled** - Compra recorrente sem agendamento (ex. aplicativos de serviços)<br>**Installments** - Parcelamento através da recorrência<br>[Veja Mais](https://developercielo.github.io/faq/faq-api-3-0#pagamento-com-credenciais-armazenadas). | Texto   | ---     | Condicional |

#### Cartão tokenizado

```json
{
  "CardToken": "23712c39-bb08-4030-86b3-490a223a8cc9",
  "SaveCard": "false",
  "Brand": "Visa"
}
```

A seguir, a listagem de campos da Requisição:

| Paramêtro   | Descrição                                      | Tipo  | Tamanho | Obrigatório |
| ----------- | ---------------------------------------------- | ----- | ------- | :---------: |
| `Brand`     | Bandeira do cartão: <br><br>Visa<br>Master<br> | Texto | 10      |     não     |
| `CardToken` | Token do cartão na 3.0                         | GUID  | 36      | Condicional |

### Resposta

A resposta sempre retorna se o cartão pode ser autorizado no momento. Essa informação apenas significa que o _cartão está válido para transacionar_, mas não indica que um determinado valor será autorizado.

Os campos retornados na resposta dependem do resultado da validação. A tabela a seguir apresenta todos os campos possíveis; depois da tabela, confira os exemplos de cada tipo de resposta.

| Paramêtro             | Descrição                                                                                                                                                                                                                                                                                                          | Tipo    | Tamanho |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- |
| `Valid`               | Situação do cartão:<br> **True** – Cartão válido<BR>**False** – Cartão Inválido                                                                                                                                                                                                                                    | Boolean | ---     |
| `ReturnCode`          | Código de retorno                                                                                                                                                                                                                                                                                                  | Texto   | 2       |
| `ReturnMessage`       | Mensagem de retorno                                                                                                                                                                                                                                                                                                | Texto   | 255     |
| `IssuerTransactionId` | Identificador de autenticação do emissor para transações de débito recorrentes. Este campo deve ser enviado nas transações subsequentes da primeira transação no modelo de recorrência própria. Já no modelo de recorrência programada, a Cielo será a responsável por enviar o campo nas transações subsequentes. | Texto   | 15      |

#### POSITIVA - Cartão válido

```json
{
  "Valid": true,
  "ReturnCode": "00",
  "ReturnMessage": "Transacao autorizada",
  "IssuerTransactionId": "580027442382078"
}
```

> Consulte <https://developercielo.github.io/Webservice-3.0/#códigos-de-retorno-das-vendas> para visualizar a descrição dos códigos de retorno.
> O código de retorno **00 representa sucesso no Zero Auth**, os demais códigos são definidos de acordo com a documentação acima.

#### NEGATIVA - Cartão inválido

```json
{
  "Valid": false,
  "ReturnCode": "57",
  "ReturnMessage": "Autorizacao negada",
  "IssuerTransactionId": "580027442382078"
}
```

#### NEGATIVA - Bandeira inválida

```json
{
  "Code": 57,
  "Message": "Bandeira inválida"
}
```

#### NEGATIVA - Restrição cadastral

```json
{
  "Code": 389,
  "Message": "Restrição Cadastral"
}
```

Caso ocorra algum erro no fluxo e não seja possível validar o cartão, o serviço irá retornar os erros:

- _500 – Internal Server Error_
- _400 – Bad Request_

# Silent Order Post

Com o Silent Order Post, os dados de pagamentos são trafegados de forma segura, mantendo o controle total sobre a experiência de checkout.

Esse método possibilita o envio dos dados do pagamento do comprador de forma segura diretamente em nosso sistema. Os campos de pagamento são armazenados pela Cielo, que conta com a certificação PCI DSS 3.2.

É ideal para lojistas que exigem um alto nível de segurança, sem perder a identidade de sua página.

## Características

- Captura de dados de pagamento diretamente para os sistemas da Cielo por meio dos campos hospedados na sua página através de um script (JavaScript);
- Compatibilidade com todos os meios de pagamentos disponibilizados ao Gateway (Nacional e Internacional);
- Redução do escopo de PCI DSS;
- Controle total sobre a experiência de checkout e elementos de gestão da sua marca.

> O **PCI Data Security Standard** (PCI DSS) é um padrão global de segurança de dados de cartões, e compreende um conjunto mínimo de requisitos para
> proteger os dados do titular do cartão.

## Fluxo de Autorização

A seguir, apresentamos como funciona um fluxo de autorização padrão e um fluxo de autorização com o Silent Order Post.

### Fluxo de Autorização Padrão

No fluxo de autorização padrão, a loja virtual recebe os dados de pagamento do comprador e, por isso, precisa estar em conformidade com o PCI DSS.

![Fluxo Padrão](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo-padrao-de-autorizacao.jpg)

### Fluxo de Autorização com Silent Order POST

Com o Silent Order Post, o servidor da loja virtual **não trafega os dados do cartão** abertamente.

![Fluxo Padrão](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/fluxo-de-autorizacao-com-sop.jpg)

1. A loja configura o JavaScript na tela de checkout. Na finalização da compra, o script envia os dados de pagamento diretamente para a API E-Commerce Cielo, sem passar pelo seu servidor;
2. A API armazena os dados do cartão para aquela compra e cria um código criptografado (`PaymentToken`, válido apenas para uma compra) ou armazena os dados do cartão e cria um código criptografado para o cartão (`CardToken`, que pode ser usado em outras compras);
3. A loja envia o token do script para o próprio servidor;
4. A loja, por meio do seu servidor, envia a requisição de autorização com o token e os demais campos obrigatórios para uma transação.

## Integração

### Passo 1. Obtendo dos tokens de acesso

Para que possa usar o Silent Order Post, você vai precisar de dois tokens:

- Token de autenticação OAuth2 (`access_token`);
- Token de autenticação do Silent Order Post (`AccessToken`).

#### Token de autenticação OAuth2

Obtenha o `access_token` a partir da API de autenticação da Cielo (**OAuth2**). Em caso de sucesso, a API retornará um `access_token` que deverá ser utilizado na próxima camada de autenticação da ferramenta.

Para obter o `access_token` no padrão [OAuth 2.0](https://oauth.net/2/){:target="\_blank"}, envie uma requisição utilizando o VERBO HTTP **POST** para a URL da tabela a seguir, formada pela "URL base do ambiente + endpoint", conforme o ambiente desejado:

| Ambiente     | URL base + endpoint                             | Authorization      |
| ------------ | ----------------------------------------------- | ------------------ |
| **SANDBOX**  | https://authsandbox.braspag.com.br/oauth2/token | "Basic _{base64}_" |
| **PRODUÇÃO** | https://auth.braspag.com.br/oauth2/token        | "Basic _{base64}_" |

**Nota:** O valor "_{base64}_" para a autorização do tipo "Basic" deve ser obtido da seguinte forma:

1. Concatene o "ClientId" e o "ClientSecret" (`ClientId:ClientSecret`);
2. Codifique o resultado da concatenação em base64;
3. Realize uma requisição ao servidor de autorização utilizando o código alfanumérico gerado.

> Para obter o "ClientID" e o "ClientSecret", envie um e-mail para *cieloecommerce@cielo.com.br* contendo o `MerchantId` e informando que deseja obter as credenciais "ClientID" e "ClientSecret" para o Silent Order Post.

**Requisição**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">oauth2/token</span></aside>

```shell
--request POST "https://authsandbox.braspag.com.br/oauth2/token"
--header "Authorization: Basic {base64}"
--header "Content-Type: application/x-www-form-urlencoded"
--data-binary "grant_type=client_credentials"
```

| Parâmetros      | Formato                             | Envio            |
| --------------- | ----------------------------------- | ---------------- |
| `Authorization` | "Basic _{base64}_"                  | Envio no header. |
| `Content-Type`  | "application/x-www-form-urlencoded" | Envio no header. |
| `grant_type`    | "client_credentials"                | Envio no body.   |

**Resposta**

```json
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

| Propriedades da Resposta | Descrição                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `access_token`           | O token de autenticação solicitado. Ele será utilizado no próximo passo.                      |
| `token_type`             | Indica o valor do tipo de token.                                                              |
| `expires_in`             | Expiração do token de acesso, em segundos. Quando o token expira, é necessário obter um novo. |

#### Token de autenticação do Silent Order Post

Após a obtenção do token de autenticação OAuth2, envie uma requisição utilizando o VERBO HTTP **POST** para a URL da tabela a seguir conforme o ambiente desejado:

| Ambiente | URL base + endpoint                                                      |
| -------- | ------------------------------------------------------------------------ |
| Sandbox  | https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken |
| Produção | https://transaction.pagador.com.br/post/api/public/v2/accesstoken        |

**Requisição**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">api/public/v2/accesstoken</span></aside>

```shell
--request POST "https://transactionsandbox.pagador.com.br/post/api/public/v2/accesstoken"
--header "Content-Type: application/json"
--header "MerchantId: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
--header "Authorization: Bearer faSYkjfiod8ddJxFTU3vti_ ... _xD0i0jqcw"
--data-binary
--verbose
```

| Propriedade     | Descrição                                      | Tipo  | Tamanho | Obrigatório? |
| --------------- | ---------------------------------------------- | ----- | ------- | ------------ |
| `MerchantId`    | Identificador da loja na API Cielo E-commerce. | GUID  | 36      | Sim          |
| `Authorization` | Bearer [AccessToken OAuth2]                    | Texto | 36      | Sim          |

**Resposta**

Como resposta, a loja receberá um json ("HTTP 201 Created") contendo, entre outras informações, o `AccessToken` do Silent Order Post.

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

| Propriedade   | Descrição                                                                                                                                                     | Tipo  | Tamanho | Formato                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ---------------------------------------------------------------- |
| `MerchantId`  | Identificador da loja na API Cielo E-commerce.                                                                                                                | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                             |
| `AccessToken` | Token de acesso (`AccessToken` do Silent Order Post). O `AccessToken` obtido permitirá a realização de uma tentativa de autorização no período de 20 minutos. | Texto | --      | NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ== |
| `Issued`      | Data e hora da geração.                                                                                                                                       | Texto | --      | AAAA-MM-DDTHH:MM:SS                                              |
| `ExpiresIn`   | Data e hora da expiração.                                                                                                                                     | Texto | --      | AAAA-MM-DDTHH:MM:SS                                              |

### Passo 2. Implementando o script

Faça o download do script fornecido pela Cielo, e anexe o script à sua página de checkout. Esse script permitirá à Cielo processar todas as informações de cartão sem intervenção do estabelecimento.

Faça o download do script correspondente ao ambiente desejado, sandbox ou produção:

| AMBIENTE     | URL do script                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SANDBOX**  | [https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js](https://transactionsandbox.pagador.com.br/post/scripts/silentorderpost-1.0.min.js){:target="\_blank"}             |
| **PRODUÇÃO** | [https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js](https://transaction.cieloecommerce.cielo.com.br/post/scripts/silentorderpost-1.0.min.js){:target="\_blank"} |

Em seguida, faça a configuração do formulário com as seguintes classes:

- Para o portador do cartão de crédito/débito: **bp-sop-cardholdername**
- Para o número do cartão de crédito/débito: **bp-sop-cardnumber**
- Para a validade do cartão de crédito/débito: **bp-sop-cardexpirationdate**
- Para o código de segurança do cartão de crédito/débito: **bp-sop-cardcvvc**

Além disso, defina os parâmetros a seguir:

**Parâmetros do Script**

| Propriedade      | Descrição                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessToken`    | Token de acesso obtido via API de autenticação da Braspag (AccessToken SOP).                                                                 |
| `environment`    | Tipo de ambiente: "sandbox" / "production".                                                                                                  |
| `language`       | Idioma: "pt" / "en" / "es".                                                                                                                  |
| `enableTokenize` | "true" (salva o cartão diretamente no Cartão Protegido, retornando um _cardToken_ ao invés de um _paymentToken_) / "false" (caso contrário). |
| `cvvRequired`    | "false" (desliga a obrigatoriedade de envio do CVV) / "true" (caso contrário).                                                               |

Exemplo de setup a ser realizado pela loja virtual na página de checkout:

![Pagina Checkout]({{ site.baseurl_root }}/images/html-silent-order-post.jpg)

**Retornos do Script**

O script fornecido pela Cielo fornece três eventos para manipulação e tratamento por parte do estabelecimento. São eles:

- **onSuccess**, retorna o **“PaymentToken”** após processar os dados do cartão;
- **onError**, caso haja algum erro no consumo dos serviços da Cielo;
- **onInvalid**, retorna o resultado da validação dos inputs.

Na validação dos inputs, o estabelecimento poderá utilizar toda a camada de validação sobre os dados de cartão realizada pela Cielo e assim simplificar o tratamento no seu formulário de checkout. As mensagens retornadas no resultado da validação são disponibilizadas nos idiomas português (padrão), inglês e espanhol.

| Propriedade    | Descrição                                                             | Condição                            |
| -------------- | --------------------------------------------------------------------- | ----------------------------------- |
| `PaymentToken` | Token efêmero utilizado para pagamento no formato de um GUID (36).    | ---                                 |
| `CardToken`    | Token permanente utilizado para pagamento no formato de um GUID (36). | Quando _enableTokenize_ for "true". |

> - O `PaymentToken` ou o `CardToken` representarão todos os dados de cartão fornecido pelo comprador. O token será usado pelo estabelecimento para que não precise tratar e processar dados de cartão em seu servidor.<br/>
> - Por questões de segurança o `PaymentToken` poderá ser usado apenas para uma autorização na API E-commerce Cielo. Após o processamento do token, ele será invalidado.

### Passo 3. Requisição de autorização com o token

#### Requisição com PaymentToken

Envie a requisição de autorização com o `PaymentToken` no nó `CreditCard` (para transação com cartão de crédito) ou no nó `DebitCard` (para transação cmo cartão de débito).

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
},
    "Payment": {
    "Type": "CreditCard",
    "Amount": 1400,
    "Installments": 1,
    "CreditCard": {
        "PaymentToken": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "Brand": "Master"
        }
    }
}
```

Para consultar os campos obrigatórios da requisição e a resposta, veja as requisições padrão das transações de [crédito](https://developercielo.github.io/manual/'?json#criando-uma-transa%C3%A7%C3%A3o-de-cr%C3%A9dito){:target="\_blank"} ou [débito](https://developercielo.github.io/manual/'?json#criando-uma-transa%C3%A7%C3%A3o-de-d%C3%A9bito){:target="\_blank"}.

**Por questões de segurança o `PaymentToken` poderá ser usado apenas para uma autorização na API E-commerce Cielo. O token será processado e, em seguida, invalidado.**

#### Requisição com CardToken

Envie a requisição de autorização com o `CardToken` no nó `CreditCard` (para transação com cartão de crédito) ou no nó `DebitCard` (para transação cmo cartão de débito).

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111706",
  "Customer": {
    "Name": "Comprador Teste"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
      "CardToken": "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
      "SecurityCode": "262",
      "Brand": "Visa"
    }
  }
}
```

Para consultar os campos obrigatórios da requisição e a resposta, veja as requisições padrão das transações de [crédito](https://developercielo.github.io/manual/'?json#criando-uma-transa%C3%A7%C3%A3o-de-cr%C3%A9dito){:target="\_blank"} ou [débito](https://developercielo.github.io/manual/'?json#criando-uma-transa%C3%A7%C3%A3o-de-d%C3%A9bito){:target="\_blank"}.

## Autenticação legada do SOP

> Não recomendamos essa forma de autenticação, pois será descontinuada.

**PASSO 1**

a) A loja deverá solicitar um ticket (server to server) enviando um POST para a seguinte URL:

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

| Propriedade | Descrição                    | Tipo | Tamanho | Obrigatório |
| ----------- | ---------------------------- | ---- | ------- | ----------- |
| `mid_loja`  | Identificador da loja na API | Guid | 36      | Sim         |

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

| Propriedade   | Descrição                    | Tipo  | Tamanho | Formato                                                          |
| ------------- | ---------------------------- | ----- | ------- | ---------------------------------------------------------------- |
| `MerchantId`  | Identificador da loja na API | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                             |
| `AccessToken` | Token de Acesso              | Texto | --      | NjBhMjY1ODktNDk3YS00NGJkLWI5YTQtYmNmNTYxYzhlNjdiLTQwMzgxMjAzMQ== |
| `Issued`      | Data e hora da geração       | Texto | --      | AAAA-MM-DDTHH:MM:SS                                              |
| `ExpiresIn`   | Data e hora da expiração     | Texto | --      | AAAA-MM-DDTHH:MM:SS                                              |

b) Para uso este recurso, por questões de segurança, obrigatoriamente a Cielo irá solicitar, no mínimo, **um IP válido do estabelecimento**. Caso contrário a requisição não será autorizada (**HTTP 401 NotAuthorized**).

**PASSO 2**

a) Como resposta, a loja receberá um JSON (HTTP 201 Created) contendo, entre outras, informações o ticket (AccessToken), como por exemplo:

![Response Ticket]({{ site.baseurl_root }}/images/response-ticket-silent-order-post-cielo.jpg)

Por questões de segurança, este ticket dará permissão para a loja salvar apenas **um cartão** dentro de um prazo de já estipulado na resposta, através do atributo `ExpiresIn` (por padrão, 20 minutos). O que acontecer primeiro invalidará o ticket para um uso futuro.

# Velocity

O **Velocity** é um tipo de mecanismo de prevenção a tentativas de fraude, que analisa a frequência que determinados dados são utilizados numa transação e se esse dados estão inscritos em uma lista de comportamentos passíveis de ações de segurança.

O Velocity é um aliado na avaliação de comportamentos de compra suspeitos, pois os cálculos são baseados em **elementos de rastreabilidade**.

> Para que suas transações sejam analisadas pelo Velocity, solicite a inclusão desse serviço ao Suporte Cielo.

O Velocity funciona analisando dados enviados na integração padrão da API Cielo E-commerce. Assim, não é necessário incluir nenhum nó adicional na requisição de criação de transação.

Quando o Velocity está ativo, a resposta da transação trará um nó específico chamado `Velocity`, com os detalhes da análise.

```json
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
          "Message": "Bloqueado pela regra CardNumber. Name: Máximo de 3 Hits de Cartão em 1 dia. HitsQuantity: 3. HitsTimeRangeInSeconds: 1440. ExpirationBlockTimeInSeconds: 1440"
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
| ---------------------------------------- | --------------------------------- | ------ | ------- |
| `VelocityAnalysis.Id`                    | Identificador da análise efetuada | GUID   | 36      |
| `VelocityAnalysis.ResultMessage`         | Accept ou Reject                  | Texto  | 25      |
| `VelocityAnalysis.Score`                 | 100                               | Número | 10      |
| `VelocityAnalysis.RejectReasons.RuleId`  | Código da Regra que rejeitou      | Número | 10      |
| `VelocityAnalysis.RejectReasons.Message` | Descrição da Regra que rejeitou   | Texto  | 512     |

# Códigos da API

## Sobre os códigos

A Api Cielo e-commerce possui 4 tipos de códigos retornados que representam diferentes momentos da transação.
Abaixo vamos explica-los na ordem em que podem ocorrer:

| Código                 | Descrição                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTTP Status Code**   | São códigos do padrão HTTP. Eles informam se as informações enviadas a API estão de **fato obtendo sucesso ao atingir nossos ENDPOINTs**. Se valores diferentes de 200 ou 201 estejam aparecendo, há algum empecilho com a comunicação com a API<BR><BR> _Retornado no momento da requisição a API_                                                                                            |
| **Erros da API**       | Esses códigos são respostas a **validação do conteúdo dos dados enviados**. Se eles estão sendo exibidos, as chamadas a nossa API foram identificadas e estão sendo validadas. Se esse código for exibido, a requisição contem erros (EX: tamanho/condições/erros de cadastro) que impedem a criação da transação<BR><BR>_Retornado no momento da requisição a API_                            |
| **Status**             | Depois de criada a transação, esses códigos serão retornados, informando como se encontra a transação no momento (EX: `Autorizada` > `Capturada` > `Cancelada`)<BR><BR>_Retornado no campo `Status` _                                                                                                                                                                                          |
| **Retorno das Vendas** | Formado por um **código de Retorno** e uma **mensagem**, esses códigos indicam o **motivo** de um determinado `Status` dentro de uma transação. Eles indicam, por exemplo, se uma transação com `status` negada não foi autorizada devido saldo negativo no banco emissor. <BR><BR>_Retornados nos campos `ReturnCode` e `ReturnMessage`_<BR> _Ocorrem somente em Cartões de crédito e Débito_ |

> **OBS**: No antigo **Webservice 1.5 Cielo**, o `ReturnCode` era considerado como _Status da transação_. Na **API CIELO ECOMMERCE**, o campo `Status` possui códigos próprios, sendo assim, o **campo a ser considerado como base de identificação do status de uma transação**

## HTTP Status Code

| HTTP Status Code | Descrição             |
| ---------------- | --------------------- |
| 200              | OK (Capture/Void/Get) |
| 201              | OK (Authorization)    |
| 400              | Bad Request           |
| 404              | Resource Not Found    |
| 500              | Internal Server Error |

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

Para acessar o programa de retentativa das bandeira acesse esse [Link](https://developercielo.github.io/manual/cielo-ecommerce#programa-de-retentativa-das-bandeiras)

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

### Outros códigos de retorno

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

## Status transacional

| Código | Status               | Meio de pagamento                                                        | Descrição                                                                 |
| ------ | -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 0      | **NotFinished**      | Todos                                                                    | Aguardando atualização de status.                                         |
| 1      | **Authorized**       | Todos                                                                    | Pagamento apto a ser capturado ou definido como pago.                     |
| 2      | **PaymentConfirmed** | Todos                                                                    | Pagamento confirmado e finalizado.                                        |
| 3      | **Denied**           | Cartões de crédito e débito (transferência eletrônica) e e-wallets.      | Pagamento negado por Autorizador.                                         |
| 10     | **Voided**           | Todos, exceto boleto                                                     | Pagamento cancelado.                                                      |
| 11     | **Refunded**         | Cartões de crédito e débito e e-wallets.                                 | Pagamento cancelado após 23h59 do dia de autorização.                     |
| 12     | **Pending**          | Cartões de crédito e débito (transferência eletrônica), e-wallets e pix. | Aguardandoretorno da instituição financeira.                              |
| 13     | **Aborted**          | Todos                                                                    | Pagamento cancelado por falha no processamento ou por ação do Antifraude. |
| 20     | **Scheduled**        | Cartão de crédito e e-wallets.                                           | Recorrência agendada.                                                     |

## Erros de integração

> **Erros da API** - Esses códigos são respostas à **validação do conteúdo dos dados enviados no momento da requisição à API**. <br>
> Se um código de erro for exibido, a requisição contém erros (como tamanho, condições ou erros de cadastro etc.) que impedem a criação da transação<BR>

**Exemplo**

```json
[
  {
    "Code": 126,
    "Message": "Credit Card Expiration Date is invalid"
  }
]
```

| Propriedade | Descrição                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Code`      | Código de Erro da API. [Veja a lista de códigos](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-de-erros-da-api) |
| `Message`   | Descrição do erro. [Veja a lista de códigos](https://developercielo.github.io/manual/cielo-ecommerce#c%C3%B3digos-de-erros-da-api)     |

### Códigos de Erros da API

Códigos retornados em caso de erro, identificando o motivo do erro e suas respectivas mensagens.

| Código | Mensagem                                                                                                       | Descrição                                                                                     |
| ------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --- |
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
| 170    | Cartão Protegido not configured                                                                                | Token não vinculado ao cadastro do lojista                                                    |
| 171    | Affiliation data not sent                                                                                      | Falha no processamento do pedido - Entre em contato com o suporte Cielo                       |
| 172    | Credential Code is required                                                                                    | Falha na validação das credenciadas enviadas                                                  |
| 173    | Payment method is not enabled                                                                                  | Meio de pagamento não vinculado ao cadastro do lojista                                        |
| 174    | Card Number is required                                                                                        | Campo enviado está vazio ou inválido                                                          |
| 175    | EAN is required                                                                                                | Campo enviado está vazio ou inválido                                                          |
| 176    | Payment Currency is not supported                                                                              | Campo enviado está vazio ou inválido                                                          |
| 177    | Card Number is invalid                                                                                         | Campo enviado está vazio ou inválido                                                          |
| 178    | EAN is invalid                                                                                                 | Campo enviado está vazio ou inválido                                                          |
| 179    | The max number of installments allowed for recurring payment is 1                                              | Campo enviado está vazio ou inválido                                                          |
| 180    | The provided Card PaymentToken was not found                                                                   | Token não encontrado                                                                          |
| 181    | The MerchantIdJustClick is not configured                                                                      | Token bloqueado                                                                               |
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
| 317    | Invalid Recurrency Day                                                                                         |                                                                                               |     |
| 318    | No transaction found                                                                                           |                                                                                               |
| 319    | Smart recurrency is not enabled                                                                                |                                                                                               |
| 320    | Can not Update Affiliation Because this Recurrency not Affiliation saved                                       |                                                                                               |
| 321    | Can not set EndDate to before next recurrency                                                                  |                                                                                               |
| 322    | Zero Dollar Auth is not enabled                                                                                |                                                                                               |
| 323    | Bin Query is not enabled                                                                                       |                                                                                               |

### Códigos de Motivo de Retorno

| Reason Code | Reason Message               |
| ----------- | ---------------------------- |
| 0           | Successful                   |
| 1           | AffiliationNotFound          |
| 2           | IssuficientFunds             |
| 3           | CouldNotGetCreditCard        |
| 4           | ConnectionWithAcquirerFailed |
| 5           | InvalidTransactionType       |
| 6           | InvalidPaymentPlan           |
| 7           | Denied                       |
| 8           | Scheduled                    |
| 9           | Waiting                      |
| 10          | Authenticated                |
| 11          | NotAuthenticated             |
| 12          | ProblemsWithCreditCard       |
| 13          | CardCanceled                 |
| 14          | BlockedCreditCard            |
| 15          | CardExpired                  |
| 16          | AbortedByFraud               |
| 17          | CouldNotAntifraud            |
| 18          | TryAgain                     |
| 19          | InvalidAmount                |
| 20          | ProblemsWithIssuer           |
| 21          | InvalidCardNumber            |
| 22          | TimeOut                      |
| 23          | CartaoProtegidoIsNotEnabled  |
| 24          | PaymentMethodIsNotEnabled    |
| 98          | InvalidRequest               |
| 99          | InternalError                |

### Códigos e Mensagens de Erro - Pix

| CÓDIGO | EVENTO       | MENSAGEM                                       | DESCRIÇÃO/AÇÃO                                                                     |
| ------ | ------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| 422    | Autorização  | Error on Merchant Integration                  | Verifique se o Pix consta habilitado em seu cadastro                               |
| 422    | Autorização  | Error on bki service integration for charge    | Erro Transação Pix Bancos, entre em contato com Suporte E-commerce                 |
| BP904  | Autorização  | O json informado não é válido                  | Entre em contato com Suporte E-commerce para avaliar o motivo.                     |
| BP901  | Autorização  | Falha na operação                              | Refaça o pagamento, caso persista entre em contato com suporte e-commerce          |
| 422    | Cancelamento | Error on pix service integration for moneyback | Não é possível cancelar a transação, A devolução ocorrerá somente se houver saldo. |
| 422    | Cancelamento | Merchant bank for moneyback is not Cielo       | Transação Pix Banco não permite operações de cancelamento                          |
