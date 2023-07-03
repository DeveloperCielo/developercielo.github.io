---
layout: manual
title: Integração Checkout Cielo
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - Checkout
language_tabs:
  json: JSON
  shell: cURL
---

Este manual irá guiar o desenvolvedor na integração com a API do Checkout Cielo. Ao integrar a API do Checkout, você vai conseguir:

* Configurar a sua loja e personalizar sua página de pagamento;
* Criar uma página de pagamento via API;
* Receber notificações de pagamentos.

> Não é desenvolvedor? Você pode usar o Checkout pelo site Cielo ou pelo app Cielo Gestão. Saiba mais [neste tutorial](https://developercielo.github.io/tutorial/checkout-tutoriais){:target="_blank"}.

# Sobre o Checkout Cielo

O Checkout Cielo é indicado para sites com carrinhos de compra, ou seja, quando o consumidor navega pelo site e escolhe um ou mais produtos a fim de finalizar a compra. Ao clicar em **Comprar**, o consumidor é redirecionado para uma página de pagamento online segura da Cielo.

O Checkout Cielo é uma solução que agrega vários serviços de processamento de pagamento e gera uma página de pagamentos que proporciona um alto nível de confiança, seguindo as normas de segurança PCI.

O grande diferencial do Checkout Cielo é a gama de serviços agregados em uma página de pagamento segura e com apenas uma integração técnica via API REST.

**O Checkout possui as seguintes funcionalidades:**

|FUNCIONALIDADE|DESCRIÇÃO|
|---|---|
|**Página de pagamento**|O Checkout Cielo possui uma página de pagamento própria, com um layout otimizado, encurtando os passos no pagamento de suas transações.|
|**Recorrência**|O Checkout Cielo possui a Recorrência Programada. Basta que a loja defina que uma transação deve se repetir, que o Checkout vai executa-la novamente no intervalo definido.
|**Análise de fraude**|O Checkout oferece análise de fraude de transações de crédito sem uma integração adicional.
|**Diversos meios de pagamentos**|O Checkout Cielo possui uma variada gama de meios de pagamento:<br>Cartões de crédito<br>Cartão de débito<br>Boleto Bradesco e Banco do Brasil<br>Pix Cielo, Bradesco e Banco do Brasil|
|**Integração com Botão e QR Code**|Sem integração técnica ou programação, o Checkout disponibiliza uma integração que torna possível realizar a criação de um botão para acesso à página de pagamento. Veja mais no [Tutorial Checkout](https://developercielo.github.io/tutorial/checkout-tutoriais){:target="_blank"}|
|**Relatórios transacionais**|Dentro do site Cielo, é possível gerar relatórios transacionais que facilitam a administração de suas vendas:<br>Relatório de Recorrências<br>Relatório de compradores<br>Extrato de vendas<br>Relatório de vendas|
|**Consulta BIN**| A Consulta BIN é um serviço de pesquisa de dados do cartão, seja ele de crédito ou débito, que identifica as características do cartão com base nos primeiros dígitos: bandeira, tipo, nacionalidade, se é cartão corporativo, emissor e se é cartão pré-pago|

## Meios de pagamento aceitos no Checkout Cielo

A versão atual do Checkout Cielo possui suporte aos seguintes meios de pagamento e bandeiras:

|MEIO DE PAGAMENTO|BANDEIRAS E PROVEDORES|
|---|---|
|Cartão de crédito|Visa, Mastercard, American Express, Elo, Diners Club, Discover, JCB e Hipercard|
|Cartão de débito|Visa, Mastercard e Elo|
|Pix|Cielo, Bradesco e Banco do Brasil|
|Boleto registrado|Bradesco e Banco do Brasil|

> **Observação**: O limite máximo de parcelas do Checkout Cielo é 12 parcelas.

## Pré-requisitos para integração

O Checkout Cielo possui uma lista de requisitos básicos para que o processo de integração seja bem sucedido. A seguir listamos pontos que devem estar prontos antes da integração:

1. O cadastro da loja deve estar **ativo** junto à Cielo;
2. Deve-se definir um **timeout** adequado nas requisições HTTP à Cielo. Recomendamos 30 segundos;
3. O certificado Root da entidade certificadora (CA) de nosso Web Service deve estar cadastrado. Veja a seção [Certificado Extended Validation](#certificado-extended-validation) para mais informações;
4. Recomendamos o uso dos navegadores Chrome e Edge para web e Safari, Chrome e Samsung Internet para mobile, todos sempre em suas versões mais atualizadas.

## Fluxo da API Checkout Cielo

Na API do Checkout Cielo, a loja envia uma requisição de criação da tela de checkout e a API retorna uma URL para acesso à página de pagamento, chamada `CheckoutUrl`.
Confira mais detalhes sobre o funcionamento da API no fluxo a seguir:

![Imagem Fluxo Geral Checkout]({{ site.baseurl_root }}/images/checkout/checkout-images/checkout-fluxo-cinza.png)

1. A pessoa titular do cartão (comprador) escolhe os produtos na loja integrada ao Checkout Cielo e clica em **Comprar**;
2. A loja envia a requisição de criação da página de pagamento para a API Checkout Cielo;
3. A API Checkout Cielo retorna o `CheckoutUrl`, que é a URL da página de pagamento montada com base nos dados enviados pela loja (como dados do comprador, dos produtos, da entrega e outros);
4. A loja redireciona o comprador para a URL retornada pela Cielo (página de pagamento). A tela apresentada é parte do ambiente de pagamento seguro Cielo;
5. O comprador escolhe o meio de pagamento, tipo de frete e endereço de entrega na página de pagamento;
6. O Checkout Cielo redireciona o cliente para a URL de Retorno escolhida pela loja (caso a loja tenha configurado uma URL de Retorno no site Cielo);
7. A loja será notificada sobre a situação da transação (caso a loja tenha configurado uma URL de notificação no site Cielo);
8. A loja processa o pedido de compra utilizando os dados da notificação e, se a transação estiver autorizada, libera o pedido.

> **Importante**: O Checkout Cielo não notifica os compradores a respeito do status da compra. O Checkout Cielo notifica apenas a loja quando há alguma alteração no status do pagamento, permitindo assim que a loja decida quando e como informar aos seus compradores sobre o prazo de entrega e processo de envio. Para receber notificações, é necessário configurar ao menos um tipo de URL de notificação nas **Configurações da Loja.**

## Endpoints

Os endpoints para integração com o Checkout Cielo são apresentados na tabela a seguir:

|API| URL | DESCRIÇÃO|
|---|---|---|
|**API Checkout Cielo** | https://cieloecommerce.cielo.com.br/api/public/v1/orders/| Criação da página de pagamento.|
|**Cielo OAUTH2 Server** | https://cieloecommerce.cielo.com.br/api/public/v2/token | Autenticação para consulta, captura e cancelamento de transações.|
|**API de Controle Transacional** | https://cieloecommerce.cielo.com.br/api/public/v2/ | Consulta de transações.|

> **Importante**: A API do Checkout não possui sandbox, mas você pode criar páginas de pagamento de teste ativando o Modo Teste no site Cielo.

## Autenticação Cielo OAUTH

O Cielo OAUTH é um processo de autenticação das APIs Cielo relacionadas ao e-commerce. O Cielo OAUTH utiliza como segurança o protocolo **[OAUTH2](https://oauth.net/2/){:target="_blank"} **, no qual é necessário primeiro obter um token de acesso utlizando suas credenciais e, posteriormente, enviá-lo à API de Controle Transacional. 

> A autenticação só é necessária para as operações de consulta, captura e cancelamento.

Para utilizar o Cielo OAUTH são necessárias as seguintes credenciais:

| PROPRIEDADE    | DESCRIÇÃO                                                             | TIPO   |
| -------------- | --------------------------------------------------------------------- | ------ |
| `ClientId`     | Identificador chave fornecido pela CIELO                              | GUID   |
| `ClientSecret` | Chave que valida o ClientID. Fornecida pela Cielo junto ao `ClientID` | string |

> Para gerar o `ClientID` e o `ClientSecret`, consulte o tópico de Obtendo as Credenciais, a seguir.

### Obtendo as credenciais

Para obter as credenciais `ClientId` e `ClientSecret`, siga os passos a seguir:

1. Após receber o nº de estabelecimento (EC) com a habilitação para o Checkout, acesse o [site Cielo](https://minhaconta2.cielo.com.br/login/){:target="_blank"} e faça o login;
2. Vá para a aba **Ecommerce** > **Super Link** > **Configurações** > **Dados Cadastrais**;
3. Na seção **Contato técnico**, preencha com os dados de contato da pessoa responsável por receber as chaves da sua loja. *ATENÇÃO: apenas coloque os dados da pessoa que realmente pode ter acesso às chaves da sua loja, que são informações sigilosas de cada estabelecimento*;
4. Clique em **Gerar Credenciais de Acesso às APIs**;
5. O contato técnico receberá um e-mail com as credenciais.

### Obtendo o token de acesso

Para obter acesso a serviços Cielo que utilizam o **Cielo Oauth**, será necessário obter um token de acesso, conforme os passos abaixo:

1. Concatene o `ClientId` e o `ClientSecret`, `**ClientId:ClientSecret**`;
2. Codifique o resultado em **Base64**;
3. Envie a requisição de criação do token, utilizando o método HTTP POST.

**Exemplo da Concatenação**

| Campo                     | Formato                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| **ClientId**              | b521b6b2-b9b4-4a30-881d-3b63dece0006                                                             |
| **ClientSecret**          | 08Qkje79NwWRx5BdgNJsIkBuITt5cIVO                                                                 |
| **ClientId:ClientSecret** | _b521b6b2-b9b4-4a30-881d-3b63dece0006:08Qkje79NwWRx5BdgNJsIkBuITt5cIVO_                          |
| **Base64**                | _YjUyMWI2YjItYjliNC00YTMwLTg4MWQtM2I2M2RlY2UwMDA2OiAwOFFramU3OU53V1J4NUJkZ05Kc0lrQnVJVHQ1Y0lWTw_ |

### Requisição

A requisição dever ser enviada apenas no header.

<aside class="request"><span class="method post">POST</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/token</span></aside>

```json
x-www-form-urlencoded
--header "Authorization: Basic {base64}"  
--header "Content-Type: application/x-www-form-urlencoded"  
grant_type=client_credentials
```

### Resposta

A resposta retornará o `access_token`, que deverá ser usado nas requisições da API de Controle Transacional, para as operações de consulta, captura e cancelamento.

```json
{
  "access_token":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6Ik1ldUNoZWNrb3V0IE1hc3RlciBLZXkiLCJjbGllbnRfaWQiOiJjODlmZGasdasdasdmUyLTRlNzctODA2YS02ZDc1Y2QzOTdkYWMiLCJzY29wZXMiOiJ7XCJTY29wZVwiOlwiQ2hlY2tvdXRBcGlcIixcIkNsYWltc1wiOltdfSIsInJvbGUiOiJasdasdasd291dEFwaSIsImlzc47I6Imh0dHBzOi8vYXV0aGhvbasdasdnJhc3BhZy5jb20uYnIiLCJhdWQiOiJVVlF4Y1VBMmNTSjFma1EzSVVFbk9pSTNkbTl0ZmasdsadQjVKVVV1UVdnPSIsImV4cCI6MTQ5Nzk5NjY3NywibmJmIjoxNDk3OTEwMjc3fQ.ozj4xnH9PA3dji-ARPSbI7Nakn9dw5I8w6myBRkF-uA",
  "token_type": "bearer",
  "expires_in": 1199
}
```

| PROPRIEDADE    | DESCRIÇÃO                                                 | TIPO   |
| -------------- | --------------------------------------------------------- | ------ |
| `Access_token` | Utilizado para acesso aos serviços da API                 | string |
| `Token_type`   | Sempre será do tipo `bearer`                              | texto  |
| `Expires_in`   | Validade do token em segundos. Aproximadamente 20 minutos | int    |

> O token retornado (`access_token`) deverá ser utilizado em toda requisição de consulta, captura e cancelamento como uma chave de autorização. O `access_token` possui uma validade de 20 minutos (1200 segundos) e é necessário gerar um novo token toda vez que a validade expirar.

# Início Rápido

Para iniciar a sua integração com a API do Checkout Cielo, você vai precisar:

1. Solicitar o nº de estabelecimento (EC) para o Checkout Cielo;
2. Definir as configurações da loja (personalização da página, escolha dos meios de pagamento e contrato com os Correios, se houver);
3. Configurar uma URL de notificação e de mudança de status para a sua loja;
4. Instalar o certificado Extended Validation;
5. Enviar a primeira requisição de criação de página de pagamento;
6. Quando houver uma tentativa de pagamento no Checkout Cielo, você receberá uma notificação* com todos os dados preenchidos na página de pagamento;
7. Se a transação mudar de status, você receberá uma notificação* de mudança de status;
8. Para efetuar testes, use o Modo de Teste do Checkout Cielo.

*Desde que tenha configurado a URL de notificação.

# Configurações da loja

Antes das configurações, você precisa habilitar o Checkout Cielo para a sua loja.

## Habilitando o nº de estabelecimento (EC) para o Checkout

* **Se você ainda não é cliente Cielo ou se só usa a maquininha**, acesse o [site Cielo](https://www.cielo.com.br/){:target="_blank"} para habilitar nº do estabelecimento (EC) para o Checkout;
* **Se você já é cliente Cielo E-commerce**, entre em contato com seu gestor comercial ou com o Suporte Cielo.

## Configurando a sua loja

**Acesse as Configurações da loja no site Cielo**

Vá para o [site Cielo](https://minhaconta2.cielo.com.br/login/){:target="_blank"} e faça login. Acesse **E-commerce** > **Super Link** > **Configurações** > **Configurações da loja**.

### 1. Personalize a aparência da página de pagamento

Insira a imagem do logo da sua loja e escolha uma cor de fundo. Clique em **Salvar**.

![Aparência da Página de Pagemento]({{ site.baseurl_root }}/images/checkout/superlink/superlink-aparencia-pagina-pagamento.png)

### 2. Configure o envio de e-mail de finalização para o comprador

Se não desejar que seu cliente final receba um e-mail de finalização do pedido após o pagamento, desabilite essa opção. Depois, clique em **Salvar**.

![E-mail de finalização para o comprador]({{ site.baseurl_root }}/images/checkout/superlink/superlink-email-finalizacao.png)

### 3. Defina os meios de pagamento desejados

Selecione os meios de pagamento que gostaria de disponibilizar aos seus clientes. Para cartão de crédito, escolha também a quantidade máxima de parcelas permitidas. Depois, clique em Salvar.

![Meios de Pagamento Ativos]({{ site.baseurl_root }}/images/checkout/superlink/superlink-meios-de-pagamento.png)

<aside class="notice">Essas configurações servem para todas as páginas de pagamentos criadas pela sua loja.</aside>

> A quantidade de parcelas escolhida por meio de pagamento deve ser a mesma que consta em seu cadastro da Cielo. Consulte o Suporte E-commerce em caso de dúvidas.

#### Cartão de crédito

O Checkout Cielo permite a utilização de Cartões de Crédito das principais bandeiras nacionais e internacionais. Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo, podendo ser utilizado inicialmente com a integração Checkout.

Transações de cartão de crédito serão incluídas no Backoffice Cielo Checkout como PENDENTE, AUTORIZADO, PAGO, NEGADO, EXPIRADO OU CHARGEBACK dependendo do resultado da autorização junto ao Banco.

Os status de cartão de crédito são:

|VALOR|STATUS|DESCRIÇÃO|
|---|---|---|
|1|Pendente|Status original. A transação está ocorrendo, esperando resposta do processo de autorização|
|7|Autorizado / Negado| Resultado do processo de autorização.<br>Autorizado: crédito foi reservado para a compra<br>Negado: cartão não autorizado pelo emissor a continuar a transação|
|2|Pago|Ocorre após a captura. Indica que o crédito reservado no cartão será depositado na conta do lojista.|
|4|Expirado|Ocorre caso a transação não seja capturada em até 15 dias após a autorização. Nessa situação a transação é perdida.|
|8|Chargeback|Status não automático. Caso o lojista seja notificado de chargeback, ele pode marcar esta transação como perdida. Este Status é apenas uma marcação, não afetando processos de pagamento.|

As transações de cartão de crédito precisam ser capturadas de forma automática ou manual - depende do que escolher no passo 5. Configure a captura e Antifraude. 

> **Atenção**
> **Cartões Internacionais**: O Checkout Cielo aceita cartões emitidos fora do Brasil, entretanto esses cartões não possuem a capacidade de pagar vendas parceladas. Essa é uma limitação imposta pelo banco emissor.

#### Cartão de débito

O Checkout Cielo permite a utilização de cartões de débito MasterCard, Visa e Elo. Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo, podendo ser utilizado inicialmente com a integração Checkout.

Transações de cartão de débito serão incluídas no site Cielo como **Pago**, **Não Autorizado** ou **Não Finalizado**, dependendo do resultado da autorização junto ao banco.

Os status de cartão de débito são:

|ORDEM|STATUS|DESCRIÇÃO|
|---|---|---|
|1| **Não Finalizado**| Status intermediário. Neste ponto o Checkout Cielo espera a confirmação do banco sobre o status da autenticação e transação. Caso o comprador abandone o ambiente do banco, o status não se altera|
|2| **Pago**| o comprador finalizou o pagamento com o cartão de débito com sucesso.|
|3| **Não Autorizado**| o comprador não apresentava saldo em conta para finalizar a transação.

#### Pix

O meio de pagamento Pix está disponível para estabelecimentos do tipo CNPJ por meio de dois provedores, Cielo ou Bradesco.

**Habilitando o Pix no portal Cielo**

Para usar o **Pix**, o seu **cadastro deve estar habilitado com o meio de pagamento Pix**. Para confirmar a habilitação, acesse o [portal Cielo](https://www.cielo.com.br/){:target="_blank"}e clique em **Meu Cadastro** > **Autorizações** > **Pix**.

Caso o Pix não esteja habilitado em seu cadastro, será apresentada a tela de adesão caso o seu estabelecimento (EC) seja elegível; após concluir o processo de adesão do Pix, já será possível usar o Pix no Super Link Cielo.

![Adesão ao Pix]({{ site.baseurl_root }}/images/apicieloecommerce/adesao-pix.png)

|VALOR|STATUS|DESCRIÇÃO|
|---|---|---|
|1| **Pendente**| Indica que o pagamento ainda está sendo processado.|
|2| **Pago**| O comprador finalizou o pagamento com sucesso. A transação foi capturada e o dinheiro será depositado em conta.|
|6| **Não Finalizado**| Pagamento esperando Status - Pode indicar erro ou falha de processamento|

#### Boleto

O Checkout Cielo permite a utilização de Boletos do Bradesco e Banco do Brasil. Para disponibilizar o boleto como meio de pagamento, solicite habilitação ao Suporte E-commerce.

A quantidade de parcelas escolhida por meio de pagamento deve ser a mesma que consta em seu cadastro da Cielo. Consulte o Suporte E-commerce em caso de dúvidas.

As transações de boleto serão incluídas no site Cielo como **Não Finalizado** ou **Pago**. Diferentemente de outros meios de pagamento, o boleto não possui atualização de status. A loja deverá acessar o Backoffice site Cielo e modificar o status do boleto manualmente.

Os status de boleto são:

|VALOR|STATUS|DESCRIÇÃO|
|---|---|---|
|6|**Não Finalizado**| status inicial. O boleto é gerado e ainda é valido. Como o Checkout não acessa o ambiente do banco para identificar o pagamento do boleto, esse status continuará efetivo até que o lojista entre no site Cielo e atualize o status manualmente.|
|2| **Pago**| O comprador finalizou o pagamento com sucesso.|

#### QR Code Pay

O [QR Code Pay Cielo](https://www.cielo.com.br/qrcode/?gad=1&gclid=EAIaIQobChMIp9qVhvLZ_wIVKTHUAR0Akws8EAAYASAAEgIVjfD_BwE&gclsrc=aw.ds){:target="_blank"} permite o pagamento através de qualquer carteira digital. Quando o comprador seleciona o QR Code Pay na página de pagamento do Checkout Cielo e clica em **Finalizar compra**, o Checkout apresenta um QR Code para ser escaneado pelo comprador usando a carteira digital de sua preferência.

|VALOR|STATUS|DESCRIÇÃO|
|---|---|---|
| 1 |**Pendente**|O QR Code foi gerado com sucesso e aguarda pagamento.|
| 2 |**Pago**| Quando a transação foi paga.|

### 4. Configure as URLs de retorno, notificação e mudança de status da sua loja

Você deverá preencher as URLs de retorno, notificação e mudança de status. As URLs devem ser criadas e definidas pelo seu estabelecimento. Depois, clique em **Salvar**.

![URLs de Notificação]({{ site.baseurl_root }}/images/checkout/superlink/superlink-urls-notificacao.png)

* **URL de Retorno**: após finalizar o pagamento, o comprador pode ser redirecionado para uma página definida web pela loja. Nenhum dado é trocado ou enviado para essa URL e sua configuração é opcional;
* **[URL de Notificação]**: corresponde à notificação de finalização da transação. É a URL pela qual a sua loja irá receber a notificação com todos os dados do carrinho quando a transação é finalizada;
* **[URL de Mudança de Status]**: corresponde à notificação de mudança de status. É a URL pela qual a sua loja irá receber a notificação quando um pedido tiver seu status alterado. A notificação de mudança de status não contém dados do carrinho, apenas dados de identificação do pedido.

### 5. Configure a captura e Antifraude

Uma transação de cartão de crédito é enviada para a autorização da Cielo (adquirente) e, em seguida, será submetida à análise de fraude. Em seguida, de acordo com o resultado da análise de fraude, a transação poderá ser capturada automaticamente ou manualmente.

![Análise de risco]({{ site.baseurl_root }}/images/checkout/checkout-images/checkout-fluxo-captura-af.png)

Ao acessar as configurações da sua loja, procure a sessão Antifraude e captura automática. Selecione a opção desejada:

|Opção de captura|Descrição|
|---|---|
|*Nunca fazer a Captura Automática*|Para toda transação de cartão de crédito autorizada será necessário que o estabelecimento efetue a captura manual da transação (requisição de captura).|
|*Sempre fazer Captura Automática*|Toda transação de cartão de crédito autorizada de baixo ou médio risco será capturada automaticamente.|
|*Somente fazer captura Automática das transações de Baixo Risco no Antifraude*|Toda transação de cartão de crédito (autorizada) de baixo risco será capturada automaticamente – as transações de médio risco ficarão aguardando a captura manual.|

> Se a análise de fraude classificar a transação como Alto Risco ela será cancelada automaticamente. Não será possível fazer a captura manual.

![Configuração de captura e Antifraude]({{ site.baseurl_root }}/images/checkout/superlink/superlink-captura-e-antifraude.png)

**Análise de Fraude**

Transações de crédito **autorizadas** serão enviadas para análise de fraude. Todas as transações classificadas como alto risco serão automaticamente canceladas, sem exceção.

|STATUS ANTIFRAUDE |DESCRIÇÃO|
|---|---|
|`Baixo Risco`| Baixo risco de ser uma transação fraudulenta.|
|`Médio Risco`| Médio risco de ser uma transação fraudulenta.|
|`Alto Risco`| Alto risco de ser uma transação fraudulenta.|
|`Não finalizado`| Não foi possível finalizar a consulta.|

> Além dos status da tabela acima, é possível que o Antifraude retorne o status N/A. O status N/A pode retornar nas seguintes situações:
> * Quando a transação é autenticada pelo banco - não é passível de análise pelo Antifraude;
> * Quando o meio de pagamento não é passível de análise pelo Antifraude como cartões de débito, boleto e Pix;
> * Quando é uma transação de crédito recorrente posterior a transação de agendamento. Somente o Agendamento é analisado;
> * Quando a venda de cartão de crédito foi negada - não é passível de análise pelo Antifraude.

No site Cielo, a análise será apresentada em **Detalhes do Pedido**:

![Análise de risco]({{ site.baseurl_root }}/images/checkout-cielo-analise-risco.png)

Você pode visualizar o status do Antifraude acessando os detalhes da compra, na aba **Pedidos** e clicando em **+**.

### 6. Configure as opções de frete dos Correios

Se a sua loja trabalha com a entrega de **produtos físicos** (aqueles que precisam de frete), informe seu login e senha dos Correios e selecione os serviços desejados, como os tipos de Sedex e PAC.

Se a sua loja trabalha com materiais digitais, serviços ou pagamentos, ou seja, vendas que não precisam de frete, pule esta etapa.

![Configuração do Frete Correios]({{ site.baseurl_root }}/images/checkout/superlink/superlink-configuracao-frete-correios.png)

### Configurações padrão

Caso você não preencha as Configurações da Loja, o Checkout irá considerar o seguinte padrão:

* A opção de envio de e-mail ao portador estará ativada;
* A opção de aceitar cartões internacionais estará ativada;
* O valor mínimo da parcela será de R$5,00;
* Os meios de pagamento crédito e débito terão 12 parcelas habilitadas (se o seu cadastro Cielo permitir);
* O meio de pagamento QR Code Crédito terá uma parcela habilitada;
* O boleto não terá valor mínimo ou desconto definido (zerado);
* A opção **Sempre fazer Captura Automática** só estará habilitada para transações que não são consideradas de alto risco;
* O login de frete dos Correios estará desabilitado.

# Certificado Extended Validation

## O que é Certificado SSL?

O Certificado SSL para servidor web oferece autenticidade e integridade dos dados de um web site, proporcionando aos clientes das lojas virtuais a garantia de que estão realmente acessando o site que desejam, e não uma um site fraudador.

Empresas especializadas são responsáveis por fazer a validação do domínio e, dependendo do tipo de certificado, também da entidade detentora do domínio.

### Internet Explorer

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

- [Certificado Raiz]({{ site.baseurl }}/attachment/Root.cer)
- [Certificado Intermediário]({{ site.baseurl }}/attachment/Intermediario.cer)
- [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/cieloecommerce.cert-2023-2024.zip)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning">A Cielo não oferece suporte para a instalação do Certificado.</aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

**1º Passo**

Salvar os três arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

- [Certificado Raiz]({{ site.baseurl }}/attachment/Root.cer)
- [Certificado Intermediário]({{ site.baseurl }}/attachment/Intermediario.cer)
- [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/cieloecommerce.cert-2023-2024.zip)

**2º Passo**

No “Internet Explorer”, clique no menu “Ferramentas” e acesse as “Opções da Internet”:

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-1.jpg)

No “Firefox”, clique no menu “Abrir Menu” e acesse “Avançado” e “Opções”:

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-1.jpg)

No “Chrome”, clique no “Personalizar e Controlar o Google Chrome” e acesse “Configurações” e “Mostrar configurações avançadas... “Alterar Configurações de Proxy e “Conteúdo” e Certificados:

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-1.jpg)

**3º Passo**

No Internet Explorer, em “Certificados”, clique em “Importar”.

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-2.jpg)

No Firefox clique em “Ver Certificados”, clique em “Importar”

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-2.jpg)

No Chrome clique em “Gerenciar Certificados”, clique em “Importar”

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-2.jpg)

**4º Passo**

No Internet Explorer e Chrome “Assistente para Importação de Certificados”, clique em “Avançar”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-3.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-4.jpg)

No Firefox “Aba Servidores ”, clique em “Importar”

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-3.jpg)

**5º Passo**

No Chrome e Internet Explorer “Assistente para Importação de Certificados”, clique em “Procurar”, procure a pasta onde estão os arquivos e selecione o arquivo “cieloecommerce.cielo.com.br.crt, clique em “Abrir” e em seguida “Avançar”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-5.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-6.jpg)

**6º Passo**

Selecionar a opção desejada: adicionar o Certificado em uma pasta padrão ou procurar a pasta de sua escolha.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-7.jpg)

**7º Passo**

Clique em “Concluir”.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-8.jpg)

**8º Passo**

Clique em “Ok” para concluir a importação.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">No Firefox não consta a mensagem de Importação com Êxito, apenas conclui a importação.</aside>

O Certificado poderá ser visualizado na aba padrão “Outras Pessoas” ou na escolhida pelo cliente.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-10.jpg)

**9º Passo**

Repita o mesmo procedimento para os 3 arquivos enviados.

# Modo de teste do Checkout Cielo

O modo de teste Checkout Cielo é uma ferramenta que permite testar a integração do seu site com a plataforma. Com o modo teste, você pode realizar transações a medida que evolui com a integração e consegue simular cenários para testar diferentes meios de pagamento.

## Ativação do Modo de Teste

O modo de teste pode ser ativado na aba **Configurações**, onde existe um caixa de seleção que, quando marcada, habilitará o modo de teste do Checkout Cielo. O modo teste somente se iniciará quando a seleção for salva.

![Ativando Modo de teste]({{ site.baseurl_root }}/images/checkout/tm01.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}){:target="_blank"} e na tela transacional do Checkout Cielo.

Essa tarja indica que a sua loja Checkout Cielo está agora operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

| Backoffice                                                                               | Transacional                                                                                 |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![Tarja vermelha - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png) | ![Tarja vermelha - Transacional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png) |

## Como transacionar no Modo de teste

A realização de transações no modo de teste ocorre de forma normal. As informações da transação são enviadas via POST ou API, utilizando os parâmetros como descrito no tópico [Integração por API](#integração-por-api), entretanto, os meios de pagamentos a serem usados serão meios simulados.

Para realizar transações de teste com diferentes meios de pagamento, siga as seguintes regras:

### Transações com cartão de crédito

Para testar cartões de crédito é necessário que dois dados importantes sejam definidos o status da autorização do cartão e o retorno da análise de fraude.

**Status da Autorização do cartão de crédito**

| Status da Transação | Cartões para realização dos testes        |
| ------------------- | ----------------------------------------- |
| Autorizado          | 0000.0000.0000.0000 / 0000.0000.0000.0004 |
| Não Autorizado      | 0000.0000.0000.0005 / 0000.0000.0000.0009 |

**Exemplo:** 540443424293010**0** = **Autorizado**

### Boleto bancário

Basta realizar o processo de compra normalmente sem nenhuma alteração no procedimento.
O boleto gerado no modo de teste sempre será um boleto simulado.

### Transações de teste

Todas as transações realizadas no modo de teste serão exibidas como transações normais na aba Pedidos do Checkout Cielo, entretanto, elas serão marcadas como transações de teste e não serão contabilizadas em conjunto com as transações realizadas fora do ambiente de teste.

![Transações de teste]({{ site.baseurl_root }}/images/checkout-cielo-modo-teste-transacoes-de-teste.png)

Essas transações terão o símbolo de teste as diferenciando de suas outras transações. Elas podem ser capturadas ou canceladas utilizando os mesmos procedimentos das transações reais.

![Transações de teste]({{ site.baseurl_root }}/images/checkout-cielo-modo-teste-transacoes-de-teste-cancelamento.png)

<aside class="notice">É muito importante que, ao liberar sua loja para a realização de vendas para seus clientes, **a loja não esteja em modo de teste**. Transações realizadas nesse ambiente poderão ser finalizadas normalmente, mas **não serão descontadas do cartão do cliente** e não poderão ser “transferidas” para o ambiente de venda padrão.</aside>

# Criando a página de pagamento

Na integração via API, a página de pagamento é montada com bases em dados enviados que formam um carrinho de compras. Esses dados são separados nos seguintes nós principais:

|NÓ|DESCRIÇÃO|
|---|---|
|`Cart`|Contém dados dos produtos a serem vendidos.|
|`Shipping`|Contém dados do tipo de frete a ser cobrado. É influenciado pelo nó `Cart`.|
|`Payment`|Contém informações que influenciam o valor cobrado. Não contém informações sobre meios de pagamento.|
|`Customer`|Contém os dados do comprador. Não obrigatório na integração, mas exigido na tela de pagamentos. Sugerimos que seja enviado para acelerar o processo de compra.|
|`Options`|Controla features opcionais do Checkout. Não é obrigatório.|

Após o envio dos dados do carrinho, o Checkout enviará uma resposta contendo um link para a página de pagamento no campo `CheckoutUrl`.

> **Importante**: A requisição de criação da página de pagamento não cria uma transação. A URL retornada (`CheckoutUrl`) é apenas uma “pré-ordem” indicando que a página de pagamento está pronta para ser utilizada. A transação é criada apenas quando o comprador clica em **Finalizar** na tela do Checkout.

## Requisição

Confira um exemplo de requisição de criação da página de pagamento no Checkout Cielo.

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/orders</span></aside>

**Parâmetros no cabeçalho (header)**

Todas as requisições enviadas para a Cielo deverão ser autenticadas pela loja. A autenticação para a criação da página de pagamento consiste no envio do `MerchantId` no header da requisição:

|PARÂMETRO|TIPO|OBRIGATÓRIO|TAMANHO|DESCRIÇÃO|
|---|---|---|---|---|
|`MerchantId`|GUID|Sim|36|Identificador único da loja fornecido pela Cielo após a afiliação da loja. Formato: 00000000-0000-0000-0000-000000000000|
|`Content-type`|alfanumérico|Sim|n/a|Tipo do conteúdo da mensagem a ser enviada. Utilizar: “application/json”|

```json
{
  "OrderNumber": "Pedido01",
  "SoftDescriptor": "Nomefantasia",
  "Cart": {
    "Discount": {
      "Type": "Percent",
      "Value": 00
    },
    "Items": [
      {
        "Name": "Produto01",
        "Description": "ProdutoExemplo01",
        "UnitPrice": 100,
        "Quantity": 1,
        "Type": "Asset",
        "Sku": "ABC001",
        "Weight": 500
      }
    ]
  },
  "Shipping": {
    "SourceZipCode": "20020080",
    "TargetZipCode": "21911130",
    "Type": "FixedAmount",
    "Services": [
      {
        "Name": "Motoboy",
        "Price": 1,
        "Deadline": 15,
        "Carrier": null
      },
      {
        "Name": "UPS Express",
        "Price": 1,
        "Deadline": 2,
        "Carrier": null
      }
    ],
    "Address": {
      "Street": "Rua Cambui",
      "Number": "92",
      "Complement": "Apto 201",
      "District": "Freguesia",
      "City": "Rio de Janeiro",
      "State": "RJ"
    }
  },
  "Payment": {
    "BoletoDiscount": 15,
    "Installments": null,
    "MaxNumberOfInstallments": null
  },
  "Customer": {
    "Identity": "84261300206",
    "FullName": "Test de Test",
    "Email": "test@cielo.com.br",
    "Phone": "21987654321"
  },
  "Settings": null
}
```

**Parâmetros no corpo (body)**

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|---|---|---|---|---|
|`OrderNumber`|Número do pedido enviado pela loja.|alfanumérico|64|Não|
|`SoftDescriptor`|Descrição a ser apresentada na fatura do cartão de crédito do portador.|alfanumérico|13|Não|
|`Cart.Discount.Type`|Obrigatório caso `Cart.Discount.Value` for maior ou igual a zero.|alfanumérico|255|Condicional|
|`Cart.Discount.Value`|Obrigatório caso `Cart.Discount.Type` for Amount ou Percent.|número|18|Condicional|
|`Cart.Items.Name`|Nome do item no carrinho.Exemplo: Pedido ABC.|alfanumérico|128|Sim|
|`Cart.Items.Description`|Descrição do item no carrinho. Exemplo: 50 canetas - R$30,00|alfanumérico|256|Não|
|`Cart.Items.UnitPrice`|Preço unitário do produto em centavos. Exemplo: R$ 1,00 = 100|número|18|Sim|
|`Cart.Items.Quantity`|Quantidade do item no carrinho. Exemplo: 1.|número|9|Sim|
|`Cart.Items.Type`|Tipo do item no carrinho.<br>Ex.:<br>Asset<br>Digital<br>Service<br>Payment|alfanumérico|255|Sim|
|`Cart.Items.Sku`|Identificador do produto.|alfanumérico|32|Não|
|`Cart.Items.Weight`|Peso do produto.|número|9|Necessário caso `Shipping.Type` for “Correios”.|Condicional|
|`Payment.BoletoDiscount`|Desconto, em porcentagem, para pagamentos a serem realizados com boleto.|número|3|Não|
|`FirstInstallmentDiscount`|Desconto, em porcentagem, para pagamentos à vista no cartão de crédito.|número|3|Não|
|`MaxNumberOfInstallments`|Define número máximo de parcelas apresentadas na página de pagamento.|número|2|Não|
|`Customer.Identity`|Identificação do comprador (CPF ou CNPJ). Se enviado, esse valor já vem preenchido na tela do Checkout Cielo. *Não obrigatório na API, mas obrigatório na tela transacional*.|número|14|Não|
|`Customer.FullName`|Nome completo do comprador. *Não obrigatório na API, mas obrigatório na tela transacional*.|alfanumérico|288|Não|
|`Customer.Email`|E-mail do comprador. Se enviado, esse valor já vem preenchido na tela do Checkout Cielo. *Não obrigatório na API, mas obrigatório na tela transacional*.|alfanumérico|64|Não|
|`Customer.Phone`|Telefone do comprador. Se enviado, esse valor já vem preenchido na tela do Checkout Cielo. *Não obrigatório na API, mas obrigatório na tela transacional*.|número|11|Não|
|`Options.ReturnUrl`|URL fixa definida pela loja que pode ser registrada no backoffice Checkout. Após finalizar o pagamento, o comprador pode ser redirecionado para uma página definida web pela loja.|string|255|Não|
|`Shipping.Type`|Tipo do frete:<br>Correios<br>FixedAmount<br>Free<br>WithoutShippingPickUp<br>WithoutShipping|alfanumérico|255|Sim|
|`Shipping.SourceZipCode`|CEP de origem do carrinho de compras. Obrigatório caso `Shipping.Type` seja “Correios”.|número|8|Condicional|
|`Shipping.TargetZipCode`|CEP do endereço de entrega do comprador.|número|8|Não|
|`Shipping.Address.Street`|Rua, avenida, travessa, etc, do endereço de entrega do comprador.|alfanumérico|256|Não*|
|`Shipping.Address.Number`|Número do endereço de entrega do comprador.|alfanumérico|8|Não*|
|`Shipping.Address.Complement`|Complemento do endereço de entrega do comprador.|alfanumérico|14|Não|
|`Shipping.Address.District`|Bairro do endereço de entrega do comprador.|alfanumérico|64|Não*|
|`Shipping.Address.City`|Cidade do endereço de entrega do comprador.|alfanumérico|64|Não*|
|`Shipping.Address.State`|Estado (UF) do endereço de entrega do comprador.|alfanumérico|2|Não*|
|`Shipping.Services.Name`|Nome do serviço de frete.|alfanumérico|128|Sim|
|`Shipping.Services.Price`|Preço do serviço de frete em centavos. Ex: R$ 1,00 = 100.|número|18|Sim|
|`Shipping.Services.Deadline`|Prazo de entrega (em dias).|número|9|Não|
|`Shipping.Package`|Tipo de pacote:<br>"Box": caixa<br>"Rol": cilindro ou envelope. Saiba mais em [Cálculo do frete dos Correios](#### Cálculo do frete dos Correios)|alfanumérico|Inteiro|Sim|
|`Shipping.Length`|Comprimento do pacote. Saiba mais em [Cálculo do frete dos Correios](#### Cálculo do frete dos Correios).|número|Inteiro|Sim|
|`Shipping.Height`|Altura do pacote enviado. Obrigatório caso `Shipping.Package` como "Box"|número|Inteiro|Condicional|
|`Shipping.Width`|Largura do pacote. Obrigatório caso `Shipping.Package` seja "Box" ou "Envelope".Saiba mais em [Cálculo do frete dos Correios](#### Cálculo do frete dos Correios).|número|Inteiro|Condicional|
|`Shipping.Diameter`|Diâmetro do pacote.Obrigatório caso `Shipping.Package` como "Rol".Saiba mais em [Cálculo do frete dos Correios](#### Cálculo do frete dos Correios).|número|Inteiro|Condicional|

/* Não é obrigatório, mas recomendamos enviar.

> Veja mais informações sobre o nó `Shipping` em [Definindo o frete](###Definindo o frete).

## Resposta

Existem apenas duas opções de resposta na integração da API: sucesso ou erro.

> **Importante**: A requisição de criação da página de pagamento não cria uma transação, mas sim a URl da página de pagamento (`CheckoutUrl`). A resposta de sucesso ou erro se refere a criação da página de pagamento, e não tem relação com a transação.

&#9989; **Sucesso**: em caso de sucesso, a resposta será o conteúdo da requisição mais o link que direciona a tela transacional (`CheckoutUrl`):

```json
{
  "Settings": {
    "CheckoutUrl": "https://cieloecommerce.cielo.com.br/transacional/order/index?id=123",
    "Profile": "CheckoutCielo",
    "Version": 1
  }
}
```

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|
|---|---|---|---|
|`CheckoutUrl`|URL da tela transacional. O Comprador deve ser direcionado para esse ambiente para finalizar a transação|String|255|
|`Profile`|Perfil do lojista: fixo “CheckoutCielo”.|String|16|
|`Version`|Versão do serviço de criação de pedido (versão: 1).|String|Sim|1|

&#10060; **Erro**: em caso de erro, a API retornará a mensagem:

```json
{
  "message": "An error has occurred."
}
```

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|
|---|---|---|---|
|`Message`|Mensagem descritiva do erro|String|254|

## Criando pagamento parcelado

O **Checkout Cielo** permite que o lojista realize transações de crédito parceladas em até 12 vezes.

> **Importante**: O Checkout é limitado a parcelamentos em até 12 vezes, mesmo que sua afiliação Cielo suporte valores superiores. Caso o valor apresentado nas **Configurações da loja** no site Cielo seja menor que 12, entre em contato com o Suporte Cielo e verifique a configuração de sua Afiliação.

Nesta opção, a loja pode configurar a quantidade de parcelas por venda. O Checkout realiza o cálculo das parcelas considerando valor total e limite de parcelas enviadas via API.

> **Atenção**: O número de parcelas desejadas deve ser inferior a quantidade que está cadastrada nas **Configurações da Loja** no site Cielo.

**Características**

* O lojista envia a quantidade máxima de parcelas que deseja exibir ao comprador;
 O valor do frete é somado ao valor do parcelamento.

O Parcelamento via API é realizado enviando o campo `MaxNumberOfInstallments` dentro do nó `Payment`. Isso forçará o Checkout a recalcular o valor do parcelamento. Abaixo, um exemplo do nó

```json
"Payment": {
  "MaxNumberOfInstallments": 3
}
```

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|---|---|---|---|---|
|`MaxNumberOfInstallments`|Define número máximo de parcelas apresentadas na página de pagamento.|número|2|Não|

## Aplicando descontos

O Checkout Cielo permite que a loja aplique descontos específicos tanto para o carrinho quanto para meios de pagamento. Os descontos disponíveis no Checkout Cielo são:

|DESCONTO|DESCRIÇÃO|
|---|---|
|**Carrinho**|Aplica o desconto sobre todo o carrinho, independente do meio de pagamento.|
|**Meio de pagamento - boleto**|Aplica o desconto quando o meio de pagamento escolhido é boleto.|
|**Meio de pagamento - crédito à vista**|Aplica o desconto quando o meio de pagamento escolhido é cartão de crédito à vista.|

> **Observação**: Você pode aplicar descontos via API ou site Cielo. Caso um valor de desconto seja enviado na API, esse será o valor considerado, mesmo que o site Cielo possua outro valor registrado.

#### Desconto no carrinho

Para enviar um desconto sobre o carrinho basta enviar o nó `Discount` dentro do nó `Cart`:

```json
{
  "Discount": {
    "Type": "Percent",
    "Value": 00
  }
}
```

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|---|---|---|---|---|---|
|`Cart.Discount.Type`|Tipo do desconto a ser aplicado: "Amount" (valor) ou "Percent" (percentual).<br>Obrigatório caso `Cart.Discount.Value` for maior ou igual a zero.|alfanumérico|255|Não|
|`Cart.Discount.Value`|Valor do desconto a ser aplicado: "Amount" (valor) ou "Percent" (percentual).|Obrigatório caso `Cart.Discount.Type` for "Amount" ou "Percent".|número|18|Não|

#### Desconto por meio de pagamento

Para enviar um desconto sobre o **boleto e/ou cartão de crédito à vista** envie dentro do nó `Payment` o campo correspondente:

* `BoletoDiscount` para boleto;
* `FirstInstallmentDiscount` para cartão de crédito à vista.

**Exemplo**

```json
{
  "Payment": {
    "BoletoDiscount": 15,
    "FirstInstallmentDiscount": 90
  }
}
```

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|---|---|---|---|---|
|`Payment.BoletoDiscount`|Desconto, em porcentagem, para pagamentos a serem realizados com boleto.|número|3|Não|
|`Payment.FirstInstallmentDiscount`|Desconto, em porcentagem, para pagamentos à vista no cartão de crédito.|número|3|Não|

## Definindo o frete

O Checkout Cielo permite definir cinco opções de frete no parâmetro `Shipping.Type`.

|TIPO DE FRETE|VALOR DO PARÂMETRO `Shipping.Type`|DESCRIÇÃO|
|---|---|---|
|**Frete fixo**| "FixedAmount"|Valor fixo enviado pelo lojista. Utilizado caso o Lojista possua um método de entrega próprio.|
|**Frete grátis**|"Free"|Não realiza cálculo de frete e exibe na tela transacional “Frete Grátis”.|
|**Retirada na loja**|"WithoutShippingPickUp"|Considerado **_Retirada na loja_**.|
|**Não tem frete**| "WithoutShipping"|Sem cobrança de frete (aplicável para serviços e produtos digitais).|
|**Correios**|"Correios"|Utiliza a API dos Correios para realizar o cálculo do custo. O valor do cálculo dependerá o contrato utilizado (informado nas Configurações da Loja) e do tipo de integração para cálculo.|

> **Observação**: As opções para múltiplos fretes na categoria Correios devem ser selecionadas dentro das **Configurações da Loja** no site Cielo.

Confira os nós que formam as informações de frete abaixo:

* `Shipping`: nó base. É obrigatório na integração via API. Ele define os tipos de frete a serem utilizados

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|----|---|---|---|---|
|`Shipping.Type`|Tipo do frete:<br>Correios<br>FixedAmount<br>Free<br>WithoutShippingPickUp<br>WithoutShipping|alfanumérico|255|Sim|
|`Shipping.SourceZipCode`|CEP de origem do carrinho de compras. Obrigatório caso `Shipping.Type` seja “Correios”.|número|8|Condicional|
|`Shipping.TargetZipCode`|CEP do endereço de entrega do comprador.|número|8|Não|

* `Shipping.Address`: informações de endereço de entrega. Não obrigatório no contrato da API, mas sugerimos que esses dados sejam enviados se já foram recolhidos dentro do ambiente da loja. Se não foram recolhidos, a página de pagamento exibirá os campos de endereço para preenchimento pelo comprador.

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|----|---|---|---|---|
|`Shipping.Address.Street`|Rua, avenida, travessa, etc, do endereço de entrega do comprador.|alfanumérico|256|Não*|
|`Shipping.Address.Number`|Número do endereço de entrega do comprador.|alfanumérico|8|Não*|
|`Shipping.Address.Complement`|Complemento do endereço de entrega do comprador.|alfanumérico|14|Não|
|`Shipping.Address.District`|Bairro do endereço de entrega do comprador.|alfanumérico|64|Não*|
|`Shipping.Address.City`|Cidade do endereço de entrega do comprador.|alfanumérico|64|Não*|
|`Shipping.Address.State`|Estado (UF) do endereço de entrega do comprador.|alfanumérico|2|Não*|

*Não é obrigatório, mas recomendamos enviar.

* `Shipping.Services`: usado para frete fixo, como serviços de frete cfontratados pela loja.

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|----|---|---|---|---|
|`Shipping.Services.Name`|Nome do serviço de frete.|alfanumérico|128|Sim|
|`Shipping.Services.Price`|Preço do serviço de frete em centavos. Ex: R$ 1,00 = 100.|número|18|Sim|
|`Shipping.Services.Deadline`|Prazo de entrega (em dias).|número|9|Não|

### Cálculo do frete dos Correios

O cálculo do frete é feito pela API dos Correios e pode ser de dois tipos:

* **Frete com Volume**: exige que a loja informe as dimensões do pacote que será enviado com as mercadorias;
* **Frete sem Volume**: considera apenas o peso do carrinho como base de cálculo para a entrega.

Para usar o frete com volume, envie o nó `Shipping.Measures`, seguindo as regras de integração via API REST.

* `Shipping.Measures`: indica as medidas do pacote.

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|----|---|---|---|---|
|`Shipping.Package`|Tipo de pacote:<br>"Box": caixa<br>"Rol": cilindro ou envelope.|alfanumérico|Inteiro|Sim|
|`Shipping.Length`|Comprimento do pacote|número|Inteiro|Sim|
|`Shipping.Height`|Altura do pacote enviado. Obrigatório caso `Shipping.Package` como "Box".|número|Inteiro|Condicional|
|`Shipping.Width`|Largura do pacote. Obrigatório caso `Shipping.Package` seja "Box" ou "Rol".|número|Inteiro|Condicional|
|`Shipping.Diameter`|Diâmetro do pacote.Obrigatório caso `Shipping.Package` como "Rol".|número|Inteiro|Condicional|

> Para realizar o cálculo de frete via Correios é necessário respeitar as medidas definidas pelo contrato utilizado pelo lojista. Para mais informações sobre as dimensões e pesos permitidos, sugerimos que valide o contrato da loja em [Termo de Condições de Prestação de Serviços de Encomendas Nacionais dos Correios](https://www.correios.com.br/enviar/precisa-de-ajuda/arquivos/contratos-formalizados-ate-fevereiro-de-2020/18-termo-de-condicoes-de-prestacao-de-servicos-de-encomendas-nacio-ns-sedex-e-pac.pdf/view){:target="_blank"}

# Recorrência do Checkout Cielo

A **recorrência** é um processo de agendamento automático de transações de crédito, ou seja, é uma transação que se repetirá automaticamente, sem a necessidade do comprador acessar a tela transacional, de acordo com as regras definidas no momento do agendamento.

> Caso uma das transações não seja autorizada, o Checkout Cielo executa a retentativa automaticamente; para mais detalhes sobre a retentativa automática, veja a seção [Retentativa de Recorrências](https://developercielo.github.io/manual/checkout-cielo#retentativa-de-recorr%C3%AAncias).

Transações recorrentes são ideais para modelos de negócios que envolvam o **conceito de assinatura, plano ou mensalidade** na sua forma de **cobrança**, como:

* Escolas;
* Academias;
* Editoras;
* Serviços de hospedagem.

> A transação recorrente não é uma transação parcelada. O valor total da venda compromete o limite do cartão de crédito do comprador independentemente do valor da parcela inicial.

## Criando pagamento recorrente

Uma transação de recorrência no Checkout Cielo possui duas configurações: `Intervalo` e `Data de encerramento`.

* **Intervalo**: padrão de repetição e intervalo de tempo entre cada transação. Esse intervalo temporal entre as transações podem ser mensal, bimestral, trimestral, semestral e anual;
* **Data de encerramento**: data que o processo de recorrência deixa de ocorrer.

```json
"Payment": {
        "RecurrentPayment": {
            "Interval": "Monthly",
            "EndDate": "2018-12-31"
        }
}
```

**Payment.RecurrentPayment**

|PARÂMETRO|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO?|
|---|---|---|---|---|
| `Payment.RecurrentPayment.Interval` | Intervalo entre cada transação da recorrência|"Monthly" para mensal;<br>"Bimonthly" para bimestral<br>"Quarterly" para trimestral<br>"SemiAnnual" para semestral<br>"Annual" para anual|alfanumérico | 10 |Não|
| `Payment.RecurrentPayment.EndDate`  | Data de encerramento da recorrência. Se não enviado, a recorrência se encerra somente se cancelada. | data (formato YYYY-MM-DD)   |  255 | Não |

Os dados do cartão de crédito do comprador ficam armazenados de forma segura dentro do Checkout Cielo, permitindo sua reutilização em uma transação recorrente. Esses dados não são acessados pelo lojista e essa inteligência é controlada pelo Checkout Cielo.

### Requisição

```json
{
  "OrderNumber": "12344",
  "SoftDescriptor": "Nome que aparecerá na fatura",
  "Cart": {
    "Discount": {
      "Type": "Percent",
      "Value": 10
    },
    "Items": [
      {
        "Name": "Nome do produto",
        "Description": "Descrição do produto",
        "UnitPrice": 100,
        "Quantity": 2,
        "Type": "Asset",
        "Sku": "Sku do item no carrinho",
        "Weight": 200
      }
    ]
  },
  "Shipping": {
    "Type": "Correios",
    "SourceZipCode": "14400000",
    "TargetZipCode": "11000000",
    "Address": {
      "Street": "Endereço de entrega",
      "Number": "123",
      "Complement": "",
      "District": "Bairro da entrega",
      "City": "Cidade de entrega",
      "State": "SP"
    },
    "Services": [
      {
        "Name": "Serviço de frete",
        "Price": 123,
        "Deadline": 15
      }
    ]
  },
  "Payment": {
    "BoletoDiscount": 0,
    "DebitDiscount": 0,
    "RecurrentPayment": {
      "Interval": "Monthly",
      "EndDate": "2015-12-31"
    }
  },
  "Customer": {
    "Identity": 11111111111,
    "FullName": "Fulano Comprador da Silva",
    "Email": "fulano@email.com",
    "Phone": "11999999999"
  }
}
```

**Exemplo**: bem físico

Se o tipo de produto for material físico (`Cart.Items.Type` = "Asset"), a **API obriga o envio do tipo de frete** (`Shipping.Type`).

Se no contrato técnico existir o nó da recorrência, é obrigatório enviar o tipo `WithoutShipping`, caso contrário, a seguinte resposta será apresentada:

```json
{
  "message": "The request is invalid.",
  "modelState": {
    "[Shipping.Type]": [
      "[Shipping.Type] pedidos com recorrência devem possuir o Shipping.Type 'WithoutShipping'."
    ]
  }
}
```

> **Importante:** A recorrência é criada apenas se a transação for **autorizada**. Independente de captura ou não, uma vez autorizada, o processo de recorrência se inicia.

## Retentativa de Recorrências

Caso uma das transações da recorrência não seja autorizada, o Checkout Cielo executa a retentativa automaticamente, o envio de uma nova transação, considerando:

* **Intervalo de tempo entre as tentativas**: quatro dias;
* **Quantidade de retentativas**: quatro retentativas, uma por dia, por quatro dias corridos a partir do dia seguinte da transação original não autorizada.

**OBS**: Esse processo visa manter obter uma resposta positiva do processo de autorização, impedindo o lojista de perder a venda. O Processo de retentativa gera pedidos duplicados dentro do Backoffice, pois o pedido original, negado, será apresentado na lista de Pedidos, junto com a nova transação autorizada

**ATENÇÃO:** A regra da retentativa não pode ser modificada pelo lojista.

> É possível consultar e cancelar transações recorrentes no site Cielo.

## Alterando dados da Recorrência

A API do Checkout permite a desativação da recorrência. Além disso, no **site Cielo** é possível alterar:

* **Ativação**: uma recorrência pode ser ativada ou cancelada;
* **Intervalo**: é possivel modificar o intervalo de execução;
* **Dia de ocorrência**: é possivel modificar o dia de execução da transação r6ecorrente.

Acesse o [Tutorial do Backoffice Checkout Cielo](https://developercielo.github.io/tutorial/checkout-tutoriais) para mais informações.

# Notificações da transação

O processo de notificação transacional ocorre em duas etapas, que são a notificação de finalização da transação e a notificação de mudança de status.

|ETAPA|TIPO DE URL*|DESCRIÇÃO|CONTEÚDO|FORMATO|
|---|---|---|---|---|
|**Notificação de finalização da transação**|`URL de Notificação`|É enviada após o comprador clicar em **Finalizar**, gerando a transação.Essa notificação é enviada apenas no momento que a transação é finalizada, independentemente se houve alteração do status, ou seja, não significa que a transação foi paga.|Contém todos os dados da venda.|POST ou JSON|
|**Notificação de mudança de status**|`URL de Mudança de Status`|É enviada quando há mudança de status na transação.<br>O status pode ser alterado de “Pendente” para “Pago”, “Cancelada” ou “Não Finalizada”, entre outros. Veja a lista completa de status na tabela [Payment_status].|Contém   os dados de identificação do pedido (não tem os dados do carrinho).|POST|

*As notificações são enviadas para as URLs definidas pelo estabelecimento nas **Configurações da Loja** e contêm os dados das transações realizadas no Checkout.

Vale destacar que o Checkout realiza a notificação somente quando uma transação é considerada finalizada, ou seja, o comprador preencheu todos os dados da tela de pagamento e clicou em **Finalizar**.

**Exemplo**: *O comprador acessa o link de pagamento e escolhe pagar via Pix. Ao clicar em Finalizar, o Checkout gera a chave Pix e envia para a loja a notificação de finalização da transação, que estará com o status “Pendente”. Quando o comprador fizer o pagamento via Pix, a transação ficará com o status “Pago” e o Checkout enviará a notificação de mudança de status.*

## Características das notificações

As URLs para notificação são webhooks que podem receber uma notificação via POST ou via JSON:

|TIPO|DESCRIÇÃO|
|----|---|
|**POST**|Notificação onde a loja é passiva.|
|**JSON**|Notificação onde a loja realiza uma consulta.|

**Formato das notificações**

Nas notificações suportadas pela API do Checkout o formato enviado é *Form Data*, discriminado pelo header `Content-Type` ‘x-www-form-urlencoded’.

**Retorno esperado**

O servidor da loja deve enviar o retorno `HTTPStatus = 200 (OK)` para a API do Checkout, indicando que a notificação foi recebida e processada com sucesso.

> **IMPORTANTE**: Se a URL cadastrada retornar algum erro ou estiver indisponível, serão realizadas três novas tentativas, com intervalo de uma hora entre cada POST.

Caso a notificação não seja recebida, é possível solicitar o reenvio manualmente   nos **Detalhes do pedido**, clicando no ícone da seta.

## Notificação de finalização da transação

É a notificação enviada para a URL de Notificação e pode ser no formato POST ou JSON.

### Notificação via POST

Contém todos os dados da transação, inclusive o `merchant_order_number` e o `checkout_cielo_order_number`, que poderão ser usados para a [consulta de transações](https://developercielo.github.io/manual/linkdepagamentos5#consulta-de-transa%C3%A7%C3%B5es).

**Exemplo:**

```json
order_number: "40e00eefbf094763a147af713fa07ece",
amount: "5000",
checkout_cielo_order_number: "b9ab1956738d45cc88edf51d7d03b13e",
created_date: "02/02/2023 17:01:35", 
customer_name: "nome do cliente", 
customer_phone: "2222222222", 
customer_identity: "12312312344", 
customer_email: "nome@email.com.br", 
shipping_type: "5", 
shipping_price: "0", 
payment_method_type: "6", 
payment_installments: "1", 
payment_status: "1", 
test_transaction: "False", 
product_id: "0f48e580-d0a2-4e3b-a748-6704927f1725", 
product_type: "3", 
product_description: "123", 
nsu: "00339922"
```

Veja a descrição dos detalhes da transação na sessão [Conteúdo das notificações](https://developercielo.github.io/manual/linkdepagamentos5#conte%C3%BAdo-das-notifica%C3%A7%C3%B5es).

### Notificação via JSON

A notificação via JSON é um método mais seguro e flexível para realizar uma consulta no Checkout Cielo. Nessa modalidade a loja recebe o `MerchantId` e o `MerchantOrderNumber` e uma URL para realizar uma consulta (GET) junto à base de dados do Checkout Cielo e acessar os detalhes da transação.

**Conteúdo da notificação via JSON**

```json
MerchantId: "799g0de8-89c3-5d17-c670-6b29d7f00175", 
MerchantOrderNumber: "1db9226geg8b54e6b2972e9b745b89c7", 
Url: "https://cieloecommerce.cielo.com.br/api/public/v1/orders/799g0de8-89c3-5d17-c670-6b29d7f00175 /1db9226geg8b54e6b2972e9b745b89c7"
```

|PARÂMETRO|DESCRIÇÃO|TIPO DO CAMPO|
|---|---|---|
|`URL`|URL com os dados necessários para realizar a busca dos dados da transação.|String|
|`MerchantId`|Identificador da loja no Checkout; consta no site Cielo no menu Configuração > Dados Cadastrais.|Alfanumérico (guid)|
|`MerchantOrderNumber`|Número do pedido da loja; se não for enviado, o Checkout Cielo gerará um número, que será visualizado pelo Consumidor.|Alfanumérico|

*O servidor da loja deve enviar o retorno `HTTP Status = 200 (OK)` para a API do Checkout, indicando que a notificação foi recebida e processada com sucesso.*

**Exemplo de uma consulta à URL retornada via JSON**

**Resposta**

```json
{
    "order_number": "1db9226geg8b54e6b2972e9b745b89c7",
    "amount": 101,
    "discount_amount": 0,
    "checkout_cielo_order_number": "65930e7460bd4a849502ed14d7be6c03",
    "created_date": "10-03-2023 14:38:56",
    "customer_name": "Test Test",
    "customer_phone": "11987654321",
    "customer_identity": "445556667",
    "customer_email": "shopper@email.com.br",
    "shipping_type": 1,
    "shipping_name": "Motoboy",
    "shipping_price": 1,
    "shipping_address_zipcode": "06455-030",
    "shipping_address_district": "Alphaville",
    "shipping_address_city": "Barueri",
    "shipping_address_state": "SP",
    "shipping_address_line1": "Alameda Xingu",
    "shipping_address_line2": "Apto 25",
    "shipping_address_number": "512",
    "payment_method_type": 1,
    "payment_method_brand": 1,
    "payment_maskedcreditcard": "482852******6856",
    "payment_installments": 1,
    "payment_status": 3,
    "tid": "10558590697J62OH9BPB",
    "test_transaction": "False"
}
```

Veja a descrição dos detalhes da venda na sessão [Conteúdo das notificações](https://developercielo.github.io/manual/linkdepagamentos5#conte%C3%BAdo-das-notifica%C3%A7%C3%B5es).

### Conteúdo das notificações

Tanto na notificação via POST ou via JSON, o conteúdo dos dados retornados é o mesmo. A seguir são descritos todos os campos retornados, assim como suas definições e tamanhos:

|PARÂMETRO|DESCRIÇÃO|TIPO DO CAMPO|TAMANHO MÁXIMO|
|---|---|---|---|
|`checkout_cielo_order_number`|Identificador único gerado pelo Checkout Cielo.|Alfanumérico|32|
|`amount`|Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)|Número|10|
|`order_number`|Número do pedido enviado pela loja|Alfanumérico|32|
|`created_date`|Data da criação do pedido - dd-MM-yyyy HH:mm:ss|Alfanumérico|20|
|`customer_name`|Nome do consumidor. Se enviado, esse valor já vem preenchido na tela do Checkout Cielo|Alfanumérico|289|
|`customer_identity`|Identificação do consumidor (CPF ou CNPJ) Se enviado, esse valor já vem preenchido na tela do Checkout Cielo|Alfanumérico|14|
|`customer_email`|E-mail do consumidor. Se enviado, esse valor já vem preenchido na tela do Checkout Cielo|Alfanumérico|64|
|`customer_phone`|Telefone do consumidor. Se enviado, esse valor já vem preenchido na tela do Checkout Cielo|Número|11|
|`discount_amount`|Valor do desconto fornecido (enviado somente se houver desconto)|Número|10|
|`shipping_type`|Modalidade de frete|Número|1|
|`shipping_name`|Nome do frete|Alfanumérico|128|
|`shipping_price`|Valor do serviço de frete, em centavos (ex: R$ 10,00 = 1000)|Número|10|
|`shipping_address_zipcode`|CEP do endereço de entrega|Número|8|
|`shipping_address_district`|Bairro do endereço de entrega|Texto|64|
|`shipping_address_city`|Cidade do endereço de entrega|Alfanumérico|64|
|`shipping_address_state`|Estado de endereço de entrega|Alfanumérico|64|
|`shipping_address_line1`|Endereço de entrega|Alfanumérico|256|
|`shipping_address_line2`|Complemento do endereço de entrega|Alfanumérico|14
|`shipping_address_number`|Número do endereço de entrega|Número|8
|`payment_method_type`|Cód. do tipo de meio de pagamento|Número|1
|`payment_method_brand`|Bandeira (somente para transações com meio de pagamento cartão de crédito)|Número|1|
|`payment_method_bank`|Banco emissor (Para transações de Boleto e Débito Automático)|Número|1|
|`payment_maskedcreditcard`|Cartão Mascarado (Somente para transações com meio de pagamento cartão de crédito)|Alfanumérico|20|
|`payment_installments`|Número de parcelas|Número|1|
|`payment_antifrauderesult`|Status das transações de cartão de Crédito no Antifraude|Número|1|
|`payment_boletonumber`|número do boleto gerado|String|1|
|`payment_boletoexpirationdate`|Data de vencimento para transações realizadas com boleto bancário|Número|10|
|`payment_status`|Status da transação|Número|1|
|`tid`|TransactionId Cielo gerado no momento da autorização da transação|Alfanumérico|20|
|`test_transaction`|Indica se a transação foi gerada com o Modo de teste ativado|Boolean|32
|`product_id`|Identificador do Botão/Link de pagamento que gerou a transação|Alfanumérico|32|
|`product_type`|Tipo de Botão que gerou o pedido (Ver tabela de ProductID)|Alfanumérico|32|
|`product_sku`|Identificador do produto cadastro no link de pagamento|texto|16|
|`product_max_number_of_installments`|Número de parcelas liberado pelo lojistas para o link de pagamento|Número|2|
|`product_expiration_date`|Data de validade do botão/Link de pagamento|Alfanumérico|12|
|`product_quantity`|Número de transações restantes até que o link deixe de funcionar|Alfanumérico|2|
|`product_description`|Descrição do link de pagamentos registrada pelo lojista|texto|256|
|`nsu`|NSU - Número sequencial único da transação.|Alfanumérico|6|
|`authorization_code`|Código de autorização.|Alfanumérico|8|

#### Tipos de productID

|TIPO DE LINK DE PAGAMENTO|ENUN|
|---|---|
|Material físico|1|
|Digital|2|
|Serviço|3|
|Pagamento|4|
|Recorrência|5|

#### Payment_status

O Checkout possui status próprios, diferente do site Cielo ou da API E-commerce Cielo. Veja a seguir a lista completa.

|VALOR|STATUS DA TRANSAÇÃO|TRANSACTION STATUS|MEIOS DE PAGAMENTO|DESCRIÇÃO|
|---|---|---|---|---|
|1|Pendente|Pending|Para todos os meios de pagamento|Indica que o pagamento ainda está sendo processado; OBS: Boleto - Indica que o boleto não teve o status alterado pelo lojista|
|2|Pago|Paid|Para todos os meios de pagamento|Transação capturada e o dinheiro será depositado em conta.|
|3|Negado|Denied|Somente para Cartão Crédito|Transação não autorizada pelo responsável do meio de pagamento|
|4|Expirado|Expired|Cartões de Crédito e Boleto|Transação deixa de ser válida para captura - **15 dias após a autorização**|
|5|Cancelado|Voided|Para cartões de crédito|Transação foi cancelada pelo lojista
|6|Não Finalizado|NotFinalized|Todos os meios de pagamento|Pagamento esperando Status - Pode indicar erro ou falha de processamento. Entre em contato com o Suporte Cielo|
|7|Autorizado|Authorized|Somente para Cartão de Crédito|Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta|
|8|Chargeback|Chargeback|somente para Cartão de Crédito|Transação cancelada pelo consumidor junto ao emissor do cartão. O Dinheiro não será depositado em conta.|

> **Observação**: Para consultas de pedido, o campo `payment.status` será retornado no formato texto, sempre em inglês (coluna Transaction Status).

#### Payment_antifrauderesult

O Antifraude possui o conceito de Status e SubStatus, onde o primeiro representa o nível de risco que uma transação possui de ser uma fraude, e o segundo, uma informação adicional sobre a transação.

|VALOR|STATUS ANTIFRAUDE|SUBSTATUS|DESCRIÇÃO|
|---|---|---|---|
|1|Baixo Risco|Baixo Risco|Baixo risco de ser uma transação fraudulenta.|
|2|Alto Risco|Alto Risco|Alto risco de ser uma transação fraudulenta. São canceladas automaticamente.|
|4|Não finalizado|Não finalizado|Não foi possível finalizar a consulta.|
|N/A|N/A|Não aplicável|Transação de cartão de débito que foi autenticada pelo 3ds 2.0, por isso não é elegível a análise de antifraude.|
|N/A|N/A|N/A|Meio de pagamento não analisável como boleto, Pix, QR Code, e transação de cartão de crédito que foi negada pelo emissor.|
|N/A|N/A|Transação de recorrência|Para casos de recorrência, após a primeira transação paga, as próximas transações de uma recorrência não são analisadas pelo antifraude. Somente a primeira transação é analisada.|

#### Payment_method_type

O Checkout permite apenas um tipo de Boleto por estabelecimento, sendo assim a notificação não retorna se o provedor usado foi Bradesco ou Banco do Brasil, pois apenas um deles estará ativo na afiliação.

|VALOR|DESCRIÇÃO|DESCRIPTION|
|---|---|---|
|1|Cartão de Crédito|CreditCard|
|2|Boleto Bancário|Boleto|
|4|Cartão de Débito|DebitCard|
|5|QR Code Crédito|QrCode|
|6|Pix|Pix|
|7|QRCode Débito|QrCodeDebit|

> **Observação**: Para consultas o Type é retornado no campo `Payment.Type` e vem preenchida com o valor literal (`Description`).

#### Payment_method_brand

É a bandeira do cartão.

|VALOR|DESCRIÇÃO|
|---|---|
|1|Visa|
|2|Master|
|3|AmericanExpress|
|4|Diners|
|5|Elo|
|6|Aura|
|7|JCB|
|8|Discover|
|9|HiperCard|

Nas consultas a bandeira do cartão é retornada no campo `Payment.Brand` e vem preenchida com o valor literal.

#### Payment_method_bank

|VALOR|DESCRIÇÃO|
|---|---|
|1|Banco do Brasil|
|2|Bradesco|

#### Shipping_type

|VALOR|DESCRIÇÃO|
|---|---|
|1|Correios|
|2|Frete fixo|
|3|Frete grátis|
|4|Retirar em mãos/loja|
|5|Sem cobrança de frete (serviços ou produtos digitais)|

## Notificação de mudança de status

É enviada para a URL de mudança de status e contém o `checkout_cielo_order_number`, o novo status e alguns dados da transação.

Para saber mais detalhes da transação, faça uma consulta usando o `checkout_cielo_order_number`.

O formato da notificação de mudança de status é POST (form data).

```json
checkout_cielo_order_number: "b918afea483d4c6c8615d8a8e19803c1",
amount: "134",
order_number: "024f77ac98cb493b86d8c818eb6e79cd",
payment_status: "3",
test_transaction: "False",
brand: "Visa",
nsu: "000001",
authorization_code: "01234567"
```

|PARÂMETRO|DESCRIÇÃO|TIPO DO CAMPO|TAMANHO MÁXIMO|
|---|---|---|---|
|`checkout_cielo_order_number`|Identificador único gerado pelo Checkout Cielo.|Alfanumérico|32|
|`amount`|Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)|Número|10|
|`order_number`|Número do pedido enviado pela loja.|Alfanumérico|32|
|`payment_method_brand`|Bandeira- somente para transações com meio de pagamento cartão de crédito. [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_brand) |Número|20|
|`payment_status`|Status da transação. [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#status-e-c%C3%B3digos)|Número|1|
|`test_transaction`|Indica se a transação foi gerada com o Modo de teste ativado|Boolean|32|
|`nsu`|NSU - Número sequencial único da transação.|Alfanumérico|6|
|`authorization_code`|Código de autorização.|Alfanumérico|8|

# Programa de Retentativa das Bandeiras

Quando uma pessoa tenta fazer uma compra com cartão no e-commerce a transação pode ser negada devido a uma série de fatores. As **tentativas seguintes de concluir a transação** usando o **mesmo cartão** são o que chamamos de **retentativa**.

**Como funciona?**

As transações negadas são classificadas como:

* **Irreversíveis**: quando a retentativa não é permitida;
* **Reversíveis**: quando a retentativa é permitida mediante as regras de cada bandeira.

<br/>
As retentativas podem ser cobradas pela bandeira e a quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira.

> Para ver as regras de retentativa de cada bandeira, acesse o manual [Programa de Retentativa das Bandeiras](https://developercielo.github.io/tutorial/programa-retentativa-bandeiras){:target="_blank"}.

# Códigos de retorno ABECS

A Associação Brasileira das Empresas de Cartão de Crédito e Serviços (ABECS) é responsável pela padronização do **código de retorno das autorizações de vendas negadas** tanto para as soluções pagamento do mundo físico quanto de e-commerce do mercado brasileiro.

> Para ver a relação completa dos códigos de retorno das transações negadas, acesse a tabela [Códigos de retorno ABECS](https://developercielo.github.io/tutorial/abecs-e-outros-codigos){:target="_blank"}.

# Suporte Cielo

Após a leitura deste manual, caso ainda persistam dúvidas (técnicas ou não), a Cielo disponibiliza o suporte técnico 24 horas por dia, 7 dias por semana em idiomas (Português e Inglês), nos seguintes contatos:

- +55 4002-5472 – _Capitais e Regiões Metropolitanas_
- +55 0800 570 8472 – _Demais Localidades_
- +55 11 2860-1348 – _Internacionais_
- Opção 5 – _Suporte E-commerce;_
- E-mail: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
