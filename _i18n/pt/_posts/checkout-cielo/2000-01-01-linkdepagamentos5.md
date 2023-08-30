---
layout: manual
title: API Link de Pagamento Cielo
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 2
tags:
  - Link de Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# Link de Pagamento Cielo

# Sobre esta documentação

Este manual irá guiar o desenvolvedor na integração com a API Link de Pagamento Cielo. Ao integrar a API do Link de Pagamento, você vai conseguir:

* Configurar a sua loja e personalizar seus links de pagamentos;
* Criar e editar links de pagamento via API;
* Receber notificações de pagamentos;
* Consultar pagamentos.

> Você também pode usar o Link de Pagamento pelo [site Cielo](https://www.cielo.com.br/){:target="_blank"} ou pelo app [Cielo Gestão](https://play.google.com/store/apps/details?id=br.com.mobicare.cielo&hl=pt_BR&gl=US){:target="_blank"}.

# Sobre o Link de Pagamento Cielo

O **Link de Pagamento** permite que você envie um **link de pagamento de um pedido** para seus clientes pelas redes sociais ou pelo canal que preferir. Ao abrir o link de pagamento, a pessoa compradora vai ver uma página personalizada com o logo da sua loja e as opções de pagamento.

Você pode vender diferentes tipos de produtos:

* **Material físico**: qualquer produto físico que precise de entrega via frete, como roupas, eletrônicos, cosméticos, móveis etc;
* **Digital**: qualquer produto digital que não precise de entrega via frete, como mídia ou jogo online, softwares etc.;
* **Serviço**: qualquer serviço que não precise de entrega via frete, como serviços de manutenção e delivery ou consulta odontológica, entre outros;
* **Pagamento**: pagamentos únicos;
* **Recorrência**: vendas que se repetem dentro de uma determinada periodicidade, como mensalidade de academia ou aulas de idiomas.

## Como criar um Link de Pagamento?

Você pode criar um Link de Pagamento pelo site Cielo, app Cielo Gestão ou pela API Link de Pagamento. Neste manual, vamos tratar da integração da API do Link de Pagamento.

## Quem pode usar o Link de Pagamento?

Qualquer loja que deseje vender online pode criar um link de pagamento e compartilhar esse link pelas redes sociais. Você não precisa ter um e-commerce para usar o Link de Pagamento.

# API do Link de Pagamento Cielo

A **API do Link de Pagamento** é uma API REST que permite **criar, editar e consultar links de pagamentos**. A principal vantagem da API é permitir que lojas possam criar links de pagamento (por botões ou QR Codes) através de seus próprios sistemas e compartilhar o Link de Pagamento com seus clientes, sem a necessidade de acessar o site Cielo.

A imagem a seguir representa o fluxo geral do funcionamento da API do Link de Pagamento:

![Imagem Fluxo Geral Super Link]({{ site.baseurl_root }}/images/checkout/superlink/link-geral-pt.png)

1. A loja envia requisição de criação do link de pagamento para a API do Link de Pagamento;
2. A API do Link de Pagamento retorna a URL do link de pagamento e o ID do link;
3. A loja compartilha o link de pagamento com o comprador;
4. O comprador efetua o pagamento;
5. A Cielo (como adquirência) autoriza o pagamento e envia confirmação para o Link de Pagamento;
6. A API do Link de Pagamento envia a notificação de finalização da transação ou a notificação de mudança de status para a loja. Se desejar, a loja pode desenvolver um processo para disparo de e-mail de confirmação ao comprador (não disponível pela API do Link de Pagamento).

## Meios de pagamento e bandeiras

No Link de Pagamento você pode vender seus produtos e serviços pelos principais meios de pagamento, como cartões de crédito e débito ou carteiras digitais.

| MEIO DE PAGAMENTO | BANDEIRAS E PROVIDERS|
|---|---|
|Cartão de crédito (à vista e parcelado)| Visa, Mastercard, Elo, Diners, Hipercard, JCB, American Express, Aura e Discover|
|Cartão de débito | Visa, Mastercard e Elo|
|Carteiras digitais | QR Code Pay (crédito e débito)|
|Pix | Cielo|

# Início Rápido

Para iniciar a sua integração com a API do Link de Pagamento, você vai precisar:

1. Solicitar o [nº de estabelecimento (EC) para o Link de Pagamento](https://developercielo.github.io/manual/linkdepagamentos5#configura%C3%A7%C3%B5es-da-loja)
2. Definir as [configurações da loja](https://developercielo.github.io/manual/linkdepagamentos5#configura%C3%A7%C3%B5es-da-loja) (personalização da página, escolha dos meios de pagamento e contrato com os Correios, se houver);
3. Configurar uma [URL de notificação e de mudança de status](https://developercielo.github.io/manual/linkdepagamentos5#configura%C3%A7%C3%B5es-da-loja) para a sua loja;
4. Obter as [credenciais de acesso à API](https://developercielo.github.io/manual/linkdepagamentos5#autentica%C3%A7%C3%A3o-cielo-oauth) (`ClientId` e `Client Secret`);
5. Solicitar um token de acesso via API usando as [credenciais](https://developercielo.github.io/manual/linkdepagamentos5#autentica%C3%A7%C3%A3o-cielo-oauth);
6. Com o token, [criar um link de pagamento](https://developercielo.github.io/manual/linkdepagamentos5#criar-link);
7. Quando houver uma tentativa de pagamento no link, você receberá uma [notificação](https://developercielo.github.io/manual/linkdepagamentos5#notifica%C3%A7%C3%B5es-da-transa%C3%A7%C3%A3o)* com todos os dados preenchidos no checkout;
8. Se a transação mudar de status, você receberá uma [notificação](https://developercielo.github.io/manual/linkdepagamentos5#notifica%C3%A7%C3%B5es-da-transa%C3%A7%C3%A3o)* de mudança de status;
9. Para efetuar testes, use o [Modo de Teste](https://developercielo.github.io/manual/linkdepagamentos5#modo-teste) do Link de Pagamento.

*_Desde que tenha configurado a URL de notificação._

# Configurações da loja

Antes das configurações, você precisa habilitar o Link de Pagamento para a sua loja.

## Habilitando o nº de estabelecimento (EC) para o Link de Pagamento

* **Se você ainda não é cliente Cielo ou se só usa a maquininha**, acesse o [site Cielo](https://www.cielo.com.br/){:target="_blank"} para habilitar nº do estabelecimento (EC) para o Link de Pagamento;
* **Se você já é cliente Cielo E-commerce**, entre em contato com seu gestor comercial ou com o Suporte Cielo.

## Configurando a sua loja

**Acesse as Configurações da loja no site Cielo**

Vá para o [site Cielo](https://minhaconta2.cielo.com.br/login/){:target="_blank"} e faça login. Acesse **E-commerce** > **Link de Pagamento** > **Configurações** > **Configurações da loja**.

### 1. Personalize a aparência da página de pagamento

Insira a imagem do logo da sua loja e escolha uma cor de fundo. Clique em **Salvar**.

![Aparência da Página de Pagemento]({{ site.baseurl_root }}/images/checkout/superlink/superlink-aparencia-pagina-pagamento.png)

### 2. Configure o envio de e-mail de finalização para o comprador

Se não desejar que seu cliente final receba um e-mail de finalização do pedido após o pagamento, desabilite essa opção. Depois, clique em **Salvar**.

![E-mail de finalização para o comprador]({{ site.baseurl_root }}/images/checkout/superlink/superlink-email-finalizacao.png)

### 3. Defina os meios de pagamento desejados

Selecione os meios de pagamento que gostaria de disponibilizar aos seus clientes. Para cartão de crédito, escolha também a quantidade máxima de parcelas permitidas. Depois, clique em Salvar.

![Meios de Pagamento Ativos]({{ site.baseurl_root }}/images/checkout/superlink/superlink-meios-de-pagamento.png)

<aside class="notice">Essas configurações servem para todos os links criados em sua loja.</aside>

> **Atenção**<br>
> * Para usar boleto, solicite a habilitação para o Suporte E-commerce;
> * A quantidade de parcelas escolhida por meio de pagamento deve ser a mesma que consta em seu cadastro da Cielo. Consulte o Suporte E-commerce em caso de dúvidas.

>**Habilitando o Pix no portal Cielo**<br>
> Para usar o **Pix**, o seu **cadastro deve estar habilitado com o meio de pagamento Pix**. Para confirmar a habilitação, acesse o [portal Cielo](https://www.cielo.com.br/){:target="_blank"}  e clique em **Meu Cadastro** > **Autorizações** > **Pix**.<br>
> Caso o Pix não esteja habilitado em seu cadastro, será apresentada a tela de adesão caso o seu estabelecimento (EC) seja elegível; após concluir o processo de adesão do Pix, já será possível usar o Pix no Link de Pagamento Cielo.<br>
> ![Adesão ao Pix]({{ site.baseurl_root }}/images/apicieloecommerce/adesao-pix.png)

Para mais detalhes veja o [tutorial Link de Pagamento e Checkout Cielo](https://developercielo.github.io/tutorial/checkout-tutoriais){:target="_blank"}.

### 4. Configure as URLs de retorno, notificação e mudança de status da sua loja

Você deverá preencher as URLs de retorno, notificação e mudança de status. As URLs devem ser criadas e definidas pelo seu estabelecimento. Depois, clique em **Salvar**.

![URLs de Notificação]({{ site.baseurl_root }}/images/checkout/superlink/superlink-urls-notificacao.png)

* **URL de Retorno**: após finalizar o pagamento, o comprador pode ser redirecionado para uma página definida web pela loja. Nenhum dado é trocado ou enviado para essa URL e sua configuração é opcional;
* **[URL de Notificação](https://developercielo.github.io/manual/linkdepagamentos5#notifica%C3%A7%C3%B5es-da-transa%C3%A7%C3%A3o)**: é a URL pela qual a sua loja irá receber a notificação com todos os dados do carrinho quando a transação é finalizada;
* **[URL de Mudança de Status](https://developercielo.github.io/manual/linkdepagamentos5#notifica%C3%A7%C3%B5es-da-transa%C3%A7%C3%A3o)**: é a URL pela qual a sua loja irá receber a notificação quando um pedido tiver seu status alterado. A notificação de mudança de status não contém dados do carrinho, apenas dados de identificação do pedido.

### 5. Configure a captura e Antifraude

Ao acessar as configurações da sua loja, procure a sessão Antifraude e captura automática. Selecione a opção desejada:

* *Nunca fazer a Captura Automática*;
* *Sempre fazer Captura Automática*;
* *Somente fazer captura Automática das transações de Baixo Risco no Antifraude.*

![Configuração de captura e Antifraude]({{ site.baseurl_root }}/images/checkout/superlink/superlink-captura-e-antifraude.png)

### 6. Configure as opções de frete dos Correios

Se a sua loja trabalha com a entrega de **produtos físicos** (aqueles que precisam de frete), informe seu login e senha dos Correios e selecione os serviços desejados, como os tipos de Sedex e PAC.

Se a sua loja trabalha com materiais digitais, serviços ou pagamentos, ou seja, vendas que não precisam de frete, pule esta etapa.

![Configuração do Frete Correios]({{ site.baseurl_root }}/images/checkout/superlink/superlink-configuracao-frete-correios.png)

### Configurações padrão

Caso você não preencha as Configurações da Loja, o Link de Pagamento irá considerar o seguinte padrão:

* A opção de envio de e-mail ao portador estará ligada;
* A opção de aceitar cartões internacionais estará ligada;
* O valor mínimo da parcela será de R$5,00;
* Os meios de pagamento crédito e débito terão 12 parcelas habilitadas (se o seu cadastro Cielo permitir);
* O meio de pagamento QR Code Crédito terá uma parcela habilitada;
* O boleto não terá valor mínimo ou desconto definido (zerado);
* A opção **Sempre fazer Captura Automática** só estará habilitada para transações que não são consideradas de alto risco;
* O login de frete dos Correios estará desabilitado.

# Modo Teste

## Sandbox

Por se tratar de uma chamada não financeira, a API do Link de Pagamento não possui um sandbox para testar a criação de links. Os links devem ser criados a partir de um cadastro de produção. O credenciamento pode ser feito através do site Cielo ou por meio de uma solicitação do Gestor comercial do estabelecimento.

**Suporte Cielo E-commerce**

cieloecommerce@cielo.com.br

+55 11 4002-5472

0800 570 8472

Os testes financeiros podem ser executados a partir da ativação do modo teste nas configurações da sua loja.

## Ativação do Modo Teste

O modo de teste pode ser ativado na aba Configurações, ao habilitar a caixa de seleção do Modo Teste. O modo teste somente se iniciará quando a seleção for salva.

![Modo Teste Ativo selecionado]({{ site.baseurl_root }}/images/checkout/superlink/superlink-modotesteativo.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do Link de Pagamento.

Essa tarja indica que a sua loja está agora operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

![Modo Teste Ativo Tarja Vermelha]({{ site.baseurl_root }}/images/checkout/superlink/superlink-modoteste-tarjavermelha.png)

## Transações de teste

Todas as transações realizadas no modo de teste serão exibidas como transações normais na aba **Pedidos**, entretanto, elas serão marcadas como transações de teste e não serão contabilizadas em conjunto com as transações realizadas fora do ambiente de teste.

![Lista de Transações no Modo Teste]({{ site.baseurl_root }}/images/checkout/superlink/superlink-transacoes-modoteste.png)

Essas transações terão o símbolo de teste as diferenciando de suas outras transações. Elas podem ser capturadas ou canceladas utilizando os mesmos procedimentos das transações reais.

> **IMPORTANTE**: Ao liberar sua loja para a realização de vendas para seus clientes, certifique-se de que o Modo Teste está desabilitado.<br>
> As transações realizadas no Modo Teste poderão ser finalizadas normalmente, mas não serão descontadas do cartão do cliente e não poderão ser “transferidas” para o ambiente de venda padrão.

## Como transacionar no modo teste

Após ativar o modo teste, a realização de transações ocorre de forma normal. A criação do link pode ser feita usando os mesmos parâmetros do ambiente de produção, entretanto, os meios de pagamentos a serem usados serão meios simulados.

Para realizar transações de teste com diferentes meios de pagamento, siga as seguintes regras:

### Transações com cartão de crédito ou débito

Para testar cartões de crédito ou débito é necessário usar um cartão que siga o algoritmo de Luhn e cujo número final corresponda ao status desejado da autorização do cartão (veja detalhes na tabela a seguir).

**Status da autorização do cartão de crédito ou débito**

|STATUS DESEJADO DA TRANSAÇÃO | CARTÕES PARA REALIZAÇÃO DOS TESTES|
|---|---|
|Autorizado |Cartões com final 0 a 4.<br>Ex.:<br>XXXXXXXXXXXXXXX0<br>XXXXXXXXXXXXXXX1<br>XXXXXXXXXXXXXXX2<br>XXXXXXXXXXXXXXX3<br>XXXXXXXXXXXXXXX4|
|Não Autorizado | Cartões com final 5 a 9.<br>Ex.:<br>XXXXXXXXXXXXXXX5<br>XXXXXXXXXXXXXXX6<br>XXXXXXXXXXXXXXX7<br>XXXXXXXXXXXXXXX8<br>XXXXXXXXXXXXXXX9|

**Exemplo**: 5404434242930100 = **Autorizado**

### Boleto Bancário

Basta realizar o processo de compra normalmente sem nenhuma alteração no procedimento. O boleto gerado no modo de teste sempre será um boleto simulado.

# Endpoints

Os endpoints para integração com o Link de Pagamento são apresentados na tabela a seguir:

|API| URL | DESCRIÇÃO|
|---|---|---|
|Cielo OAUTH2 Server | https://cieloecommerce.cielo.com.br/api/public/v2/token | Autenticação|
|API Link de Pagamento | https://cieloecommerce.cielo.com.br/api/public/v1/products/| Criação, consulta e exclusão de links de pagamento.|
|API de Controle Transacional | https://cieloecommerce.cielo.com.br/api/public/v2/orders/ | Consulta de transações.|

> Importante: A API do Link de Pagamento não possui sandbox, mas você pode criar links de teste ativando o Modo Teste no site Cielo.

As transações criadas com o Modo Teste ativado podem ser consultadas pela API de Controle Transacional.

# Autenticação Cielo OAUTH

O Cielo OAUTH é um processo de autenticação das APIs Cielo relacionadas ao e-commerce. O Cielo OAUTH utiliza como segurança o protocolo **[OAUTH2](https://oauth.net/2/){:target="_blank"} **, no qual é necessário primeiro obter um token de acesso utlizando suas credenciais e, posteriormente, enviá-lo à API do Link de Pagamento.

Para utilizar o Cielo OAUTH são necessarias as seguintes credenciais:

| PROPRIEDADE    | DESCRIÇÃO                                                             | TIPO   |
| -------------- | --------------------------------------------------------------------- | ------ |
| `ClientId`     | Identificador chave fornecido pela CIELO                              | guid   |
| `ClientSecret` | Chave que valida o ClientID. Fornecida pela Cielo junto ao `ClientID` | string |

> Para gerar o `ClientID` e o `ClientSecret`, consulte o tópico de Obtendo as Credenciais, a seguir.

## Obtendo as credenciais

Para obter as credenciais `ClientId` e `ClientSecret` para autenticação na API do Link de Pagamento, siga os passos a seguir:

1. Após receber o nº de estabelecimento (EC) com a habilitação para o Link de Pagamento, acesse o [site Cielo](https://minhaconta2.cielo.com.br/login/){:target="_blank"} e faça o login;
2. Vá para a aba **Ecommerce** > **Link de Pagamento** > **Configurações** > **Dados Cadastrais**;
3. Na seção **Contato técnico**, preencha com os dados de contato da pessoa responsável por receber as chaves da sua loja. *ATENÇÃO: apenas coloque os dados da pessoa que realmente pode ter acesso às chaves da sua loja, que são informações sigilosas de cada estabelecimento*;
4. Clique em **Gerar Credenciais de Acesso às APIs**;
5. Você receberá um e-mail com as credenciais

## Obtendo o token de acesso

Para obter acesso a serviços Cielo que utilizam o **Cielo Oauth**, será necessário obter um token de acesso, conforme os passos abaixo:

1. Concatene o `ClientId` e o `ClientSecret`, `**ClientId:ClientSecret**`
2. Codifique o resultado em **Base64**
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

A resposta retornará o `access_token`, que deverá ser usado nas requisições da API do Link de Pagamento.

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

> O token retornado (`access_token`) deverá ser utilizado em toda requisição à API do Link de Pagamento como uma chave de autorização. O `access_token` possui uma validade de 20 minutos (1200 segundos) e é necessário gerar um novo token toda vez que a validade expirar.

# Link de pagamento

## Criar Link

Para criar um link de pagamento, envie um POST com os dados do produto ou serviço.

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/</span></aside>

Header: `Authorization:` `Bearer {access_token}`

```json
{
  "type": "Digital",
  "name": "Pedido",
  "description": "teste description",
  "price": "1000000",
  "weight": 2000000,
  "expirationDate": "2027-06-19",
  "maxNumberOfInstallments": "1",
  "quantity": 2,
  "sku": "teste",
  "shipping": {
    "type": "WithoutShipping",
    "name": "teste",
    "price": "1000000000"
  },
  "recurrent": {
    "interval": "Monthly",
    "endDate": "2024-02-06"
  },
  "softDescriptor": "Pedido1234"
}
```

**Dados do produto**

|PROPRIEDADE | DESCRIÇÃO | TIPO | TAMANHO | OBRIGATÓRIO|
|---|---|---|---|---|
|`type`|Tipo de venda a ser realizada através do link de pagamento:<br>Asset – Material Físico<br>Digital – Produto Digital<br>Service – Serviço<br>Payment – Pagamentos Simples<br>Recurrent – Pagamento Recorrente|String|255|Sim|
|`name`|Nome do produto|String|128|Sim|
|`description`|Descrição do produto que será exibida na tela de pagamento caso a opção show_description seja verdadeira. É permitido usar o caracter pipe `|` caso seja desejável quebrar a linha ao apresentar a descrição na tela de pagamento.|String|512|Não|
|`showDescription`|Flag indicando se a descrição deve ou não ser exibida na tela de pagamento.|String|–|Não|
|`price`|Valor do produto em centavos.|Int|1000000|Sim|
|`expirationDate`|Data de expiração do link. Caso uma data seja informada, o link se torna indisponível na data informada. Se nenhuma data for informada, o link não expira.|String (YYYY-MM-DD)|10|Não|
|`weight`|Peso do produto em gramas.|String|2000000|Não|
|`softDescriptor`|Descrição a ser apresentada na fatura do cartão de crédito do portador.|String|13|Não|
|`maxNumberOfInstallments`|Número máximo de parcelas que o comprador pode selecionar na tela de pagamento. Se não informado, será utilizada as configurações da loja. Atenção: não envie esse campo se o tipo de produto (`type`) for igual a “Recurrent”.|int|até 2 caracteres (1 a 12 parcelas)|Não|
|`quantity`|Número de transações restantes até que o link deixe de funcionar.|int|2|Não|
|`sku`|Código de identificação do produto.|String|32|Não|

> Dentro de `description` você pode usar o caracter pipe `|` caso precise quebrar a linha ao apresentar a descrição na tela do link de pagamento.

**Dados do Frete**

Os dados que devem ser preenchidos com relação à frete estão no nó `shipping`.

|PROPRIEDADE|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO|
|---|---|---|---|---|
|`shipping.name`|Nome do frete. Obrigatório para frete tipo “FixedAmount”|string|128|Sim|
|`shipping.price`|O valor do frete. Obrigatório para frete tipo “FixedAmount”|int|100000|Sim|
|`shipping.originZipCode`|CEP de origem da encomenda. Obrigatório para frete tipo “Correios”. Deve conter apenas números.|string|8|Não|
|`shipping.type`|Tipo de frete. Correios – Entrega pelos correios.<br>FixedAmount – Valor Fixo<br>Free - Grátis<br>WithoutShippingPickUp – Sem entrega com retirada na loja<br>WithoutShipping – Sem entrega<br>Se o tipo de produto escolhido for “Asset”, os tipos permitidos de frete são: “Correios, FixedAmount ou Free”.<br>Se o tipo produto escolhido for “Digital” ou “Service”, os tipos permitidos de frete são: “WithoutShipping, WithoutShippingPickUp”.<br>Se o tipo produto escolhido for “Recurrent” o tipo de frete permitido é: “WithoutShipping”.|string|255|Sim|

**Dados da Recorrência**  

O nó `recurrent` contém informações da recorrência do pagamento. Pode ser informado caso o tipo do produto (`type`) seja “Recurrent”.

|PROPRIEDADE|DESCRIÇÃO|TIPO|TAMANHO|OBRIGATÓRIO|
|---|---|---|---|---|
|`recurrent.interval`|Intervalo de cobrança da recorrência.<br>“Monthly” - Mensal<br>“Bimonthly” - Bimensal<br>“Quarterly” - Trimestral<br>“SemiAnnual” - Semestral<br>“Annual” - Anual|string|128|Não*<br>Se não for enviado, será considerado o intervalo mensal.|
|`recurrrent.endDate`|Data de encerramento da recorrência. Se não enviado, a recorrência se encerra somente se cancelada.|Formato YYYY-MM-DD.|string|10|Não|

### Resposta

A resposta irá retornar o link de pagamento no campo `shortUrl` e o `id` do link, que pode ser usado para consultar, atualizar ou excluir o link.

`“HTTP Status”: 201 – Created`

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00",
  "showDescription": false,
  "price": 8000,
  "weight": 4500,
  "shipping": {
    "type": "Correios",
    "originZipcode": "06455030"
  },
  "recurrent": {
    "interval": "Monthly",
    "endDate": "2024-02-06"
  },
  "softDescriptor": "Nome da Loja",
  "expirationDate": "2024-06-30T00:00:00",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/product/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

Os dados retornados na resposta contemplam todos os enviados na requisição e dados adicionais referentes a criação do link.

|PROPRIEDADE|TIPO|DESCRIÇÃO|
|---|---|---|
|`id`|guid|Identificador único do link de pagamento. Pode ser utilizado para consultar, atualizar ou excluir o link.|
|`shortUrl`|string|Representa o link de pagamento que ao ser aberto, em um browser, apresentará a tela do Link de Pagamento Cielo.|
|`links`|object|Apresenta as operações disponíveis e possíveis (RESTful hypermedia) de serem efetuadas após a criação ou atualização do link.|

## Consultar Link

Para consultar um link existente basta realizar um GET informando o `id` do link.

> **Importante**: A resposta da consulta contém o link em si (`shortUrl`) e os mesmos dados retornados na criação do link.<br>
> **O link ainda não é a transação**. Uma transação só será iniciada quando o comprador fizer a tentativa de pagamento e pode ou não ser autorizada.<br>
> Para consultar uma transação, veja a seção [Consulta de Transações](https://developercielo.github.io/manual/linkdepagamentos5#consulta-de-transa%C3%A7%C3%B5es).

### Requisição

<aside class="request"><span class="method get">GET</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside> 

Header: `Authorization`: `Bearer {access_token}`

### Resposta

`HTTP Status: 200 – OK`

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00",
  "showDescription": false,
  "price": 8000,
  "weight": 4500,
  "shipping": {
    "type": "Correios",
    "originZipcode": "06455030"
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2024-06-30",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        " https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

|PROPRIEDADE|TIPO|DESCRIÇÃO|
|---|---|---|
|`id`|guid|Identificador único do link de pagamento.Pode ser utilizado para consultar, atualizar ou excluir o link.|
|`shortUrl`|string|Representa o link de pagamento que ao ser aberto, em um browser, apresentará a tela do Link de Pagamento Cielo.|
|`links`|object|Apresenta as operações disponíveis e possíveis (RESTful hypermedia) de serem efetuadas após a criação ou atualização do link.|

## Atualizar Link

Para atualizar um link existente basta realizar uma chamada do tipo `PUT` informando o `id` do link.

> Você pode atualizar um link para alterar a forma de pagamento, inserir um novo item no pedido, alterar a descrição do pedido ou alterar o tipo de recorrência, por exemplo.

### Requisição

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside> 

Header: `Authorization`: `Bearer {access_token}`

```json
{
  "Type": "Asset",
  "name": "Pedido ABC",
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "price": 9000,
  "expirationDate": "2024-06-30",
  "weight": 4700,
  "sku": "abc123456",  
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "SoftDescriptor": "Pedido1234",
  "maxNumberOfInstallments": 2
}
```

### Resposta

`HTTP Status: 200 – OK`

```json
{
  "id": "529aca91-2961-4976-8f7d-9e3f2fa8a0c9",
  "shortUrl": "http://bit.ly/2smqdhD",
  "type": "Asset",
  "name": "Pedido ABC",
  "description":
    "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00",
  "showDescription": false,
  "sku": "abc123456",
  "price": 9000,
  "weight": 4700,
  "shipping": {
    "type": "FixedAmount",
    "name": "Entrega Rápida",
    "price": 1000
  },
  "softDescriptor": "Pedido1234",
  "expirationDate": "2024-06-30",
  "maxNumberOfInstallments": 2,
  "links": [
    {
      "method": "GET",
      "rel": "self",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "PUT",
      "rel": "update",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    },
    {
      "method": "DELETE",
      "rel": "delete",
      "href":
        "https://cieloecommerce.cielo.com.br/Api/public/v1/products/529aca91-2961-4976-8f7d-9e3f2fa8a0c9"
    }
  ]
}
```

|PROPRIEDADE|TIPO|DESCRIÇÃO|
|---|---|---|
|`id`|guid|Identificador único do link de pagamento. Pode ser utilizado para consultar, atualizar ou excluir o link.|
|`shortUrl`|string|Representa o link de pagamento que ao ser aberto, em um browser, apresentará a tela do Link de Pagamento Cielo.|
|`links`|object|Apresenta as operações disponíveis e possíveis (RESTful hypermedia) de serem efetuadas após a criação ou atualização do link.|

> Atenção: A resposta da consulta contém os mesmos dados retornados na criação do link.

## Excluir Link

Para excluir um link existente basta realizar um DELETE informando o `Id` do link.

### Requisição

<aside class="request"><span class="method delete">DELETE</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}</span></aside>

Header: `Authorization`: `Bearer {access_token}`

### Resposta

`HTTP Status: 204 – No Content`

# Notificações da transação

O processo de notificação transacional ocorre em duas etapas, que são a notificação de finalização da transação e a notificação de mudança de status.

|ETAPA|TIPO DE URL*|DESCRIÇÃO|CONTEÚDO|FORMATO|
|---|---|---|---|---|
|**Notificação de finalização da transação**|`URL de Notificação`|É enviada após o comprador clicar em Finalizar, gerando a transação.Essa notificação é enviada apenas no momento que a transação é finalizada, independentemente se houve alteração do status, ou seja, não significa que a transação foi paga.|Contém todos os dados da venda.|POST ou JSON|
|**Notificação de mudança de status**|`URL de Mudança de Status`|É enviada quando há mudança de status na transação.<br>O status pode ser alterado de “Pendente” para “Pago”, “Cancelada” ou “Não Finalizada”, entre outros. Veja a lista completa de status na tabela [Payment_status].|Contém   os dados de identificação do pedido (não tem os dados do carrinho).|POST|

*As notificações são enviadas para as URLs definidas pelo estabelecimento nas [**Configurações da Loja**](https://developercielo.github.io/manual/linkdepagamentos5#configura%C3%A7%C3%B5es-da-loja){:target="_blank"} e contêm os dados das transações realizadas no Link de Pagamento.

Vale destacar que o Link de Pagamento realiza a notificação somente quando uma transação é considerada finalizada, ou seja, o comprador preencheu todos os dados da tela de pagamento e clicou em **Finalizar**.

**Exemplo**: *O comprador acessa o link de pagamento e escolhe pagar via Pix. Ao clicar em Finalizar, o Link de Pagamento gera a chave Pix e envia para a loja a notificação de finalização da transação, que estará com o status “Pendente”. Quando o comprador fizer o pagamento via Pix, a transação ficará com o status “Pago” e o Link de Pagamento enviará a notificação de mudança de status.*

## Características das notificações

As URLs para notificação são webhooks que podem receber uma notificação via POST ou via JSON:

|TIPO|DESCRIÇÃO|
|----|---|
|**POST**|Notificação onde a loja é passiva.|
|**JSON**|Notificação onde a loja realiza uma consulta.|

**Formato das notificações**

Nas notificações suportadas pela API do Link de Pagamento o formato enviado é *Form Data*, discriminado pelo header `Content-Type` ‘x-www-form-urlencoded’.

**Retorno esperado**

O servidor da loja deve enviar o retorno `HTTPStatus = 200 (OK)` para a API do Link de Pagamento, indicando que a notificação foi recebida e processada com sucesso.

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

A notificação via JSON é um método mais seguro e flexível para realizar uma consulta no Link de Pagamento Cielo. Nessa modalidade a loja recebe o `MerchantId` e o `MerchantOrderNumber` e uma URL para realizar uma consulta (GET) junto à base de dados do Link de Pagamento Cielo e acessar os detalhes da transação.

**Conteúdo da notificação via JSON**

```json
MerchantId: "799g0de8-89c3-5d17-c670-6b29d7f00175", 
MerchantOrderNumber: "1db9226geg8b54e6b2972e9b745b89c7", 
Url: "https://cieloecommerce.cielo.com.br/api/public/v1/orders/799g0de8-89c3-5d17-c670-6b29d7f00175 /1db9226geg8b54e6b2972e9b745b89c7"
```

|PARÂMETRO|DESCRIÇÃO|TIPO DO CAMPO|
|---|---|---|
|`URL`|URL com os dados necessários para realizar a busca dos dados da transação.|String|
|`MerchantId`|Identificador da loja no Link de Pagamento; consta no site Cielo no menu Configuração > Dados Cadastrais.|Alfanumérico (guid)|
|`MerchantOrderNumber`|Número do pedido da loja; se não for enviado, o Link de Pagamento Cielo gerará um número, que será visualizado pelo Consumidor.|Alfanumérico|

*O servidor da loja deve enviar o retorno `HTTP Status = 200 (OK)` para a API do Link de Pagamento, indicando que a notificação foi recebida e processada com sucesso.*

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
|`checkout_cielo_order_number`|Identificador único gerado pelo Link de Pagamento Cielo.|Alfanumérico|32|
|`amount`|Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)|Número|10|
|`order_number`|Número do pedido enviado pela loja|Alfanumérico|32|
|`created_date`|Data da criação do pedido - dd-MM-yyyy HH:mm:ss|Alfanumérico|20|
|`customer_name`|Nome do consumidor. Se enviado, esse valor já vem preenchido na tela do Link de Pagamento Cielo|Alfanumérico|289|
|`customer_identity`|Identificação do consumidor (CPF ou CNPJ) Se enviado, esse valor já vem preenchido na tela do Link de Pagamento Cielo|Alfanumérico|14|
|`customer_email`|E-mail do consumidor. Se enviado, esse valor já vem preenchido na tela do Link de Pagamento Cielo|Alfanumérico|64|
|`customer_phone`|Telefone do consumidor. Se enviado, esse valor já vem preenchido na tela do Link de Pagamento Cielo|Número|11|
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

O Link de Pagamento possui status próprios, diferente do site Cielo ou da API E-commerce Cielo. Veja a seguir a lista completa.

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

O Link de Pagamento permite apenas um tipo de Boleto por estabelecimento, sendo assim a notificação não retorna se o provedor usado foi Bradesco ou Banco do Brasil, pois apenas um deles estará ativo na afiliação.

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
|`checkout_cielo_order_number`|Identificador único gerado pelo Link de Pagamento Cielo.|Alfanumérico|32|
|`amount`|Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)|Número|10|
|`order_number`|Número do pedido enviado pela loja.|Alfanumérico|32|
|`payment_method_brand`|Bandeira- somente para transações com meio de pagamento cartão de crédito. [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_brand) |Número|20|
|`payment_status`|Status da transação. [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#status-e-c%C3%B3digos)|Número|1|
|`test_transaction`|Indica se a transação foi gerada com o Modo de teste ativado|Boolean|32|
|`nsu`|NSU - Número sequencial único da transação.|Alfanumérico|6|
|`authorization_code`|Código de autorização.|Alfanumérico|8|

# Consulta de transações

A consulta de transações via API pode ser feita até 45 dias após a venda ter sido realizada.

O controle dos pedidos oriundos de link de pagamento pode ser feito por meio da **API de Controle Transacional**. A consulta de pedidos pode ser feita de três formas distintas:

* Por `order_number`;
* Por `checkout_cielo_order_number`;
* Por `id` do link de pagamento.

## Por order_number

A consulta de transações por `order_number` retorna uma lista de transações com o mesmo número de pedidos; isso ocorre pois o Link de Pagamento não impede a duplicação de `order_number`s por parte da loja. A resposta retornará o `checkout_cielo_order_number`, que deverá ser usado na consulta de uma transação específica.

### Requisição

Para consultar uma transação pelo `order_number`, faça um `GET`.

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/merchantOrderNumber/{ordernumber}</span></aside>

### Resposta

``` json
[
    {
        "$id": "1",
        "checkoutOrderNumber": "a58995ce24fd4f1cb025701e95a51478",
        "createdDate": "2023-03-30T12:09:33.57",
        "links": [
            {
                "$id": "2",
                "method": "GET",
                "rel": "self",
                "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/a58995ce24fd4f1cb025701e95a51478"
            }
        ]
    },
    {
        "$id": "3",
        "checkoutOrderNumber": "438f3391860a4bedbae9a868180dda6e",
        "createdDate": "2023-03-30T12:05:41.317",
        "links": [
            {
                "$id": "4",
                "method": "GET",
                "rel": "self",
                "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e"
            }
        ]
    }
]
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`$id`|Id do nó.|Número|-|Exemplo: 1|
|`checkoutOrderNumber`|Código de pedido gerado pelo Link de Pagamento Cielo.|Texto|32|Exmeplo: a58995ce24fd4f1cb025701e95a51478|
|`createdDate`|Data de criação do pedido |Data|-|AAAA-MM-DDTHH:mm:SS.ss|
|`links.$id`|Id do nó.|Número|-|Exemplo: 1|
|`links.method`|Método para consumo da operação.|Texto|10|Exemplos: GET, POST ou PUT.|
|`links.rel`|Relação para consumo da operação.|Texto|10|Exemplo: self|
|`links.href`|Endpoint para consumo da operação.|Texto|512|Exemplo: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e|

## Por Checkout_Cielo_Order_Number

### Requisição

Para consultar uma transação pelo `Checkout_Cielo_Order_Number`, basta realizar um `GET`.

Header: `Authorization`: `Bearer {access_token}`

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v2/orders/{checkout_cielo_order_number}</span></aside>

### Resposta

``` json
{ 
    "merchantId": "c89fdfbb-dbe2-4e77-806a-6d75cd397dac", 
    "orderNumber": "054f5b509f7149d6aec3b4023a6a2957", 
    "softDescriptor": "Pedido1234", 
    "cart": { 
        "items": [ 
            { 
                "name": "Pedido ABC", 
                "description": "50 canetas - R$30,00 | 10 cadernos - R$50,00 | 10 Borrachas - R$10,00", 
                "unitPrice": 9000, 
                "quantity": 1, 
                "type": "1" 
            } 
        ] 
    }, 
    "shipping": { 
        "type": "FixedAmount", 
        "services": [ 
            { 
              "name": "Entrega Rápida", 
                "price": 2000 
            } 
        ], 
        "address": { 
            "street": "Alameda Xingu", 
            "number": "512", 
            "complement": "21 andar", 
            "district": "Alphaville", 
            "city": "Barueri", 
            "state": "SP" 
        } 
    }, 
    "payment": { 
        "status": "Paid", 
        "tid": "10127355487AK2C3EOTB",
        "nsu": "149111",
        "authorizationCode": "294551",
        "numberOfPayments": 1,
        "createdDate": "2023-03-02T14:29:43.767",
        "finishedDate": "2023-03-02T14:29:46.117",
        "cardMaskedNumber": "123456******2007",
        "brand": "Visa",
        "type": "creditCard",
        "errorcode": "00",
        "antifraud": { 
            "antifraudeResult": 1,
            "description": "Risco Baixo" 
        } 
    }, 
    "customer": { 
        "identity": "12345678911", 
        "fullName": "Nome do comprador", 
        "email": "exemplo@email.com.br", 
        "phone": "11123456789" 
    }, 
    "links": [ 
        { 
            "method": "GET", 
            "rel": "self", 
            "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/054f5b509f7149d6aec3b4023a6a2957" 
        }, 
        { 
            "method": "PUT", 
            "rel": "void", 
            "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/054f5b509f7149d6aec3b4023a6a2957/void" 
        } 
    ] 
}
```

|PROPRIEDADE|Tipo|Tamanho|Descrição|Formato|
|---|---|---|---|---|
|`merchantId`|GUID|36|Id da Loja no Link de Pagamento Cielo.|Exemplo: c89fdfbb-dbe2-4e77-806a-6d75cd397dac|
|`orderNumber`|Texto|32|Número do pedido da loja.|Exemplo: 123456|
|`softDescriptor`|Texto|13|Nome fantasia da loja exibido na fatura do comprador. Sem caracteres especiais ou espaços.|Exemplo: `Loja_ABC_1234`|
|`cart.discount.type`|Texto|10|Tipo de desconto aplicado.|Valores possíveis: Amount ou Percent|
|`cart.discount.value`|Número|18|Valor ou porcentagem de desconto aplicado.|Exemplo: Se `discount.type` for Amount, então 1000 = R$10,00. Se `discount.type` for Percent, o valor estará entre 0 e 100.|
|`cart.items.name`|Texto|128|Nome do item no carrinho.|Exemplo: Pedido ABC|
|`cart.items.sku` | Texto | 32 | Identificador do produto. | Existirá se fornecido, ex: abc123456789|
|`cart.items.weight` | Número | 10 | Peso do produto. | Existirá se fornecido, ex: 2
|`cart.items.description`|Texto|256|Descrição do item no carrinho.|Exemplo: 50 canetas - R$30,00|
|`cart.items.unitPrice`|Número|18|Preço unitário do produto em centavos|Exemplo: R$ 1,00 = 100|
|`cart.items.quantity`|Número|9|Quantidade do item no carrinho.|Exemplo: 1|
|`cart.items.type`|Texto|255|Tipo do item no carrinho|`Asset`<br>`Digital`<br>`Service`<br>`Payment`|
|`shipping.type`|Número|36|Modalidade de frete.|Exemplo: 1|
|`shipping.services.name`|Texto|128|Modalidade de frete.|Exemplo: Casa Principal|
|`shipping.services.price`|Número|10|Valor do serviço de frete, em centavos.|Exemplo: R$ 10,00 = 1000|
|`shipping.services.deadline` | Numérico | 10 | Prazo de entrega para o pedido em dias | Exemplo: 10|
|`shipping.services.carrier` | Numérico | 1 | Código do tipo de entrega, segue a tabela Shipping_Type | Exemplo: 1|
|`shipping.address.street`|Texto|256|Endereço de entrega.|Exemplo: Rua João da Silva|
|`shipping.address.number`|Número|8|Número do endereço de entrega.|Exemplo: 123|
|`shipping.address.complement`|Texto|64|Complemento do endereço de entrega.|Exemplo: Casa|
|`shipping.address.district`|Texto|64|Bairro do endereço de entrega.|Exemplo: Alphaville|
|`shipping.address.city`|Texto|64|Cidade do endereço de entrega.|Exemplo: São Paulo|
|`shipping.address.state`|Texto|2|Estado de endereço de entrega.|Exemplo: SP|
|`Payment.status`|Texto|10|Status da transação|Exemplo: Paid [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status)|
|`Payment.tid`|Texto|32|TID Cielo gerado no momento da autorização da transação.|Exemplo: 10127355487AK2C3EOTB|
|`Payment.nsu`|Texto|6|NSU Cielo gerado no momento da autorização da transação.|Exemplo: 123456|
|`Payment.authorizationCode`|Texto|3|Código de autorização.|Exemplo: 456789|
|`Payment.numberOfPayments`|Número|6|Número de Parcelas.|Exemplo: 123456|
|`Payment.createdDate`|Texto|22|Data de criação da transação.|Exemplo: AAAA-MM-DDTHH:mm:SS.ss|
|`Payment.finishedDate`|Texto|22|Data de finalização da transação.|Exemplo: AAAA-MM-DDTHH:mm:SS.ss|
|`Payment.cardMaskedNumber`|Texto|19|Número do cartão mascarado.|Exemplo: 123456******2007|
|`Payment.brand`|Texto|10|Bandeira do cartão.|Exemplo: Visa [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_brand)|
|`Payment.antifraud.antifraudeResult`|Número|1|Status do antifraude|Exemplo: 1|
|`Payment.antifraud.description`|Texto|256|Descrição do status do antifraude|Exemplo: Lojista optou não realizar a análise do antifraude|
|`Payment.type`|Texto|11|Tipo de meio de pagamento|Exemplo: CreditCard [lista completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_method_type)|
|`Payment.errorcode`|Número|2|Código de retorno|Exemplo: 00, 51, 57, etc [lista completa](https://developercielo.github.io/manual/linkdepagamentos5#c%C3%B3digos-de-retorno-abecs)|
|`Customer.Identity`|Número|14|CPF ou CNPJ do comprador.|Exemplo: 12345678909|
|`Customer.FullName`|Texto|256|Nome completo do comprador.|Exemplo: Fulano da Silva|
|`Customer.Email`|Texto|64|Email do comprador.|Exemplo: exemplo@email.com.br|
|`Customer.Phone`|Número|11|Telefone do comprador.|Exemplo: 11123456789|

## Por Id do link de pagamento

### Requisição

Para consultar uma transação pelo `id`, basta realizar um `GET`.

Header: `Authorization`: `Bearer {access_token}`

<aside class="request"><span class="method get">GET</span><span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/products/{id}/payments</span></aside>

### Resposta

``` json
{
   "$id": "1",
   "productId": "9487e3a9-f204-4188-96c5-a5a3013b2517",
   "createdDate": "2023-02-11T10:35:04.947",
   "orders": [
       {
           "$id": "2",
           "orderNumber": "b74df3e3c1ac49ccb7ad89fde2d787f7",
           "createdDate": "2023-02-11T10:37:23.447",
           "payment": {
               "$id": "3",
               "price": 11500,
               "numberOfPayments": 6,
               "createdDate": "2023-02-11T10:37:23.447",
               "status": "Denied"
           },
           "links": [
               {
                   "$id": "4",
                   "method": "GET",
                   "rel": "self",
                   "href": "https://cieloecommerce.cielo.com.br/api/public/v2/orders/b74df3e3c1ac49ccb7ad89fde2d787f7"
               }
           ]
       }
   ]
}
```

|Propriedade|Descrição|Tipo|Tamanho|Formato|
|---|---|---|---|---|
|`$id`|Id do nó.|Número|-|Exemplo: 1|
|`productId`|Id do link de pagamento.|GUID|36|Exemplo: 9487e3a9-f204-4188-96c5-a5a3013b2517|
|`createdDate`|Data de criação do link de pagamento. |Data|-|AAAA-MM-DDTHH:mm:SS.ss|
|`orders.$id`|Id do nó.|Número|-|Exemplo: 1|
|`orders.orderNumber`|Id pedido gerado pelo Link de Pagamento Cielo.|Texto|32|Exemplo: b74df3e3c1ac49ccb7ad89fde2d787f7|
|`orders.createdDate`|Data de criação do pedido. |Data|-|AAAA-MM-DDTHH:mm:SS.ss|
|`orders.payment.$id`|Id do nó.|Número|-|Exemplo: 1|
|`orders.payment.price`|Valor da pedido, sem pontuação.|Número|-|Exemplo: R$ 1,00 = 100|
|`orders.payment.numberOfPayments`|Número de parcelas.|-|Exemplo: 3|
|`orders.payment.createdDate`|Data da transação (pagamento). |Data|-|AAAA-MM-DDTHH:mm:SS.ss|
|`orders.payment.status`|Status da Transação.|Texto|-|Exemplo: Denied [Lista Completa](https://developercielo.github.io/manual/linkdepagamentos5#payment_status)|
|`links.$id`|Id do nó.|Número|-|Exemplo: 1|
|`links.method`|Método para consumo da operação.|Texto|10|Exmeplos: GET, POST, PUT|
|`links.rel`|Relação para consumo da operação.|Texto|10|Exemplo: self|
|`links.href`|Endpoint para consumo da operação.|Texto|512|Exemplo: https://cieloecommerce.cielo.com.br/api/public/v2/orders/438f3391860a4bedbae9a868180dda6e|

Para realizar o as consultas via API de Controle Transacional no Link de Pagamento Cielo é obrigatório que a loja tenha configurado um dos dois modelos de notificação:

* URL de Notificação da transação via **POST** ou
* URL de Notificação da transação via **JSON**.

É obrigatório ter fornecido uma URL de notificação de transação pois os dados para consulta da transação serão enviados no conteúdo da notificação.

O `Checkout_Cielo_Order_Number` é gerado apenas quando o pagamento é finalizado na tela transacional. Ele é enviado apenas pela URL de Notificação e não pela Resposta da criação da tela transacional.

# Status e Códigos

O **Link de Pagamento** possui status próprios, diferente do site Cielo ou da API Cielo E-commerce. Veja abaixo a lista completa.

|VALOR|STATUS DE TRANSAÇÃO|MEIOS DE PAGAMENTO|DESCRIÇÃO|
|---|---|---|---|
|1|Pendente|Boleto, Pix e QR Code|Indica que o pagamento ainda está sendo processado ou está pendente de alguma etapa por parte do portador.<br>Exemplo: uma transação de boleto com status *Pendente* indica que o boleto não teve o status alterado pelo comprador.|
|2|Pago|Todos os meios de pagamento|A transação foi capturada e o dinheiro será depositado em conta.|
|3|Negado|Cartão de crédito e débito|Transação não autorizada pelo responsável do meio de pagamento.|
|4|Expirado|Cartão de crédito, débito e boleto|**Cartão de crédito e débito:** a transação deixa de ser válida para captura 15 dias após autorização.<br>**Boleto:** o boleto expira após data de expiração configurada pelo time de Suporte Cielo E-commerce conforme solicitação do estabelecimento.|
|5|Cancelado|Cartão de crédito e débito|Transação cancelada pela loja.|
|6|Não Finalizado|Todos os meios de pagamento|Pagamento esperando novo Status.Pode indicar erro ou falha de processamento. Entre em contato com o Suporte Cielo E-commerce.|
|7|Autorizado|Cartão de crédito e débito|Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta (por padrão, a transação pode ser capturada até 15 dias após autorização).|

## Programa de Retentativa das Bandeiras

Quando uma pessoa tenta fazer uma compra com cartão no e-commerce a transação pode ser negada devido a uma série de fatores. As **tentativas seguintes de concluir a transação** usando o **mesmo cartão** são o que chamamos de **retentativa**.

**Como funciona?**

As transações negadas são classificadas como:

* **Irreversíveis**: quando a retentativa não é permitida;
* **Reversíveis**: quando a retentativa é permitida mediante as regras de cada bandeira.

<br/>
As retentativas podem ser cobradas pela bandeira e a quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira.

> Para ver as regras de retentativa de cada bandeira, acesse o manual [Programa de Retentativa das Bandeiras](https://developercielo.github.io/tutorial/programa-retentativa-bandeiras){:target="_blank"}

## Códigos de retorno ABECS

A Associação Brasileira das Empresas de Cartão de Crédito e Serviços (ABECS) é responsável pela padronização do **código de retorno das autorizações de vendas negadas** tanto para as soluções pagamento do mundo físico quanto de e-commerce do mercado brasileiro.

> Para ver a relação completa dos códigos de retorno das transações negadas, acesse a tabela [Códigos de retorno ABECS](https://developercielo.github.io/tutorial/abecs-e-outros-codigos){:target="_blank"}

## Status do Antifraude

| Campo | Definição                |
|:-----:|--------------------------|
| **0** | N\A                      |
| **1** | Risco baixo              |
| **2** | Risco Alto               |
| **3** | Não finalizada           |
| **4** | Risco Moderado           |
| **5** | Autenticado              |
| **6** | Não contratado           |
| **7** | Dispensado               |
| **8** | Não Aplicável            |
| **9** | Transações de Recorrência |
