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

# Sobre essa documentação

Este manual irá guiar o desenvolvedor na integração com a API do Checkout Cielo. Ao integrar a API do Checkout, você vai conseguir:

* Configurar a sua loja e personalizar sua página de pagamento;
* Criar uma página de pagamento via API;
* Receber notificações de pagamentos;
* Consultar, capturar e cancelar transações.

> Você também pode usar o Checkout pelo site Cielo ou pelo app Cielo Gestão. Para usar o Checkout pelo site Cielo, consulte [este tutorial](https://developercielo.github.io/tutorial/checkout-tutoriais){:target="_blank"}.

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

**Os meios de pagamento e bandeiras aceitos no Checkout Cielo são:**

|MEIO DE PAGAMENTO|BANDEIRAS E PROVEDORES|
|---|---|
|Cartão de crédito|Visa, Mastercard, American Express, Elo, Diners Club, Discover, JCB e Hipercard|
|Cartão de débito|Visa, Mastercard e Elo|
|Pix|Cielo, Bradesco e Banco do Brasil|
|Boleto registrado|Bradesco e Banco do Brasil|

**Observação**: O limite máximo de parcelas do Checkout Cielo é 12 parcelas.

## Pré-requisitos para integração

O Checkout Cielo possui uma lista de requisitos básicos para que o processo de integração seja bem sucedido. A seguir listamos pontos que devem estar prontos antes da integração:

1. O cadastro da loja deve estar **ativo** junto à Cielo;
2. Deve-se definir um **timeout** adequado nas requisições HTTP à Cielo. Recomendamos 30 segundos;
3. O certificado Root da entidade certificadora (CA) de nosso Web Service deve estar cadastrado. Veja a seção [Certificado Extended Validation](#certificado-extended-validation) para mais informações;
4. Recomendamos o uso dos navegadores Chrome e Edge para web e Safari, Chrome e Samsung Internet para mobile, todos sempre em suas versões mais atualizadas.

# Fluxo da API Checkout Cielo

Na API do Checkout Cielo, a loja envia uma requisição de criação da tela de checkout e a API retorna uma URL para acesso à página de pagamento, chamada `CheckoutUrl`.
Confira mais detalhes sobre o funcionamento da API no fluxo a seguir:

![Imagem Fluxo Geral Checkout]({{ site.baseurl_root }}/images/checkout/checkout-images/checkout-fluxo.png)

1. A pessoa titular do cartão (comprador) escolhe os produtos na loja integrada ao Checkout Cielo e clica em **Comprar**;
2. A loja envia a requisição de criação da página de pagamento para a API Checkout Cielo;
3. A API Checkout Cielo retorna o `CheckoutUrl`, que é a URL da página de pagamento montada com base nos dados enviados pela loja (como dados do comprador, dos produtos, da entrega e outros);
4. A loja redireciona o comprador para a URL retornada pela Cielo (página de pagamento). A tela apresentada é parte do ambiente de pagamento seguro Cielo;
5. O comprador escolhe o meio de pagamento, tipo de frete e endereço de entrega na página de pagamento;
6. O Checkout Cielo redireciona o cliente para a URL de Retorno escolhida pela loja (caso a loja tenha configurado uma URL de Retorno no site Cielo);
7. A loja será notificada sobre a situação da transação (caso a loja tenha configurado uma URL de notificação no site Cielo);
8. A loja processa o pedido de compra utilizando os dados da notificação e, se a transação estiver autorizada, libera o pedido.

> **Importante**: O Checkout Cielo não notifica os compradores a respeito do status da compra. O Checkout Cielo notifica apenas a loja quando há alguma alteração no status do pagamento, permitindo assim que a loja decida quando e como informar aos seus compradores sobre o prazo de entrega e processo de envio. Para receber notificações, é necessário configurar ao menos um tipo de URL de notificação nas **Configurações da Loja.**

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

# Endpoints

Os endpoints para integração com o Checkout Cielo são apresentados na tabela a seguir:

|API| URL | DESCRIÇÃO|
|---|---|---|
|**API Checkout Cielo** | https://cieloecommerce.cielo.com.br/api/public/v1/orders/| Criação da página de pagamento.|
|**Cielo OAUTH2 Server** | https://cieloecommerce.cielo.com.br/api/public/v2/token | Autenticação para consulta, captura e cancelamento de transações.|
|**API de Controle Transacional** | https://cieloecommerce.cielo.com.br/api/public/v2/ | Consulta de transações.|

> **Importante**: A API do Checkout não possui sandbox, mas você pode criar páginas de pagamento de teste ativando o Modo Teste no site Cielo.

# Autenticação Cielo OAUTH

O Cielo OAUTH é um processo de autenticação das APIs Cielo relacionadas ao e-commerce. O Cielo OAUTH utiliza como segurança o protocolo **[OAUTH2](https://oauth.net/2/){:target="_blank"} **, no qual é necessário primeiro obter um token de acesso utlizando suas credenciais e, posteriormente, enviá-lo à API de Controle Transacional. 

> A autenticação só é necessária para as operações de consulta, captura e cancelamento.

Para utilizar o Cielo OAUTH são necessárias as seguintes credenciais:

| PROPRIEDADE    | DESCRIÇÃO                                                             | TIPO   |
| -------------- | --------------------------------------------------------------------- | ------ |
| `ClientId`     | Identificador chave fornecido pela CIELO                              | GUID   |
| `ClientSecret` | Chave que valida o ClientID. Fornecida pela Cielo junto ao `ClientID` | string |

> Para gerar o `ClientID` e o `ClientSecret`, consulte o tópico de Obtendo as Credenciais, a seguir.

## Obtendo as credenciais

Para obter as credenciais `ClientId` e `ClientSecret`, siga os passos a seguir:

1. Após receber o nº de estabelecimento (EC) com a habilitação para o Checkout, acesse o [site Cielo](https://minhaconta2.cielo.com.br/login/){:target="_blank"} e faça o login;
2. Vá para a aba **Ecommerce** > **Super Link** > **Configurações** > **Dados Cadastrais**;
3. Na seção **Contato técnico**, preencha com os dados de contato da pessoa responsável por receber as chaves da sua loja. *ATENÇÃO: apenas coloque os dados da pessoa que realmente pode ter acesso às chaves da sua loja, que são informações sigilosas de cada estabelecimento*;
4. Clique em **Gerar Credenciais de Acesso às APIs**;
5. O contato técnico receberá um e-mail com as credenciais.

## Obtendo o token de acesso

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

# Criando o carrinho

Na integração via API, a tela transacional é "montada" com bases em dados enviados que formam um **Carrinho de compras**.
Esses dados são separados nos seguintes "nós principais":

| Nó         | Descrição                                                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cart`     | Contém dados dos produtos a serem vendidos.                                                                                                               |
| `Shipping` | Contém dados do tipo de frete a ser cobrado. É influenciado pelo nó `Cart`.                                                                                |
| `Payment`  | Contém informações que influenciam o valor cobrado. **Não contém informações sobre meios de pagamento**.                                                   |
| `Customer` | Contém os dados o comprador. Não obrigatório na integração, mas exigido na tela de pagamentos. Sugerimos que seja enviado para acelerar o processo de compra. |
| `Options`  | Controla features opcionais do Checkout. Não é obrigatório.                                                                                               |

Após o envio dos dados do carrinho, o Checkout enviará uma resposta contendo um **link para a tela de pagamento** no campo `CheckoutUrl`.

**Importante**: A requisição de criação do carrinho **não cria uma transação**. A URL retornada (`CheckoutUrl`) é apenas uma "pré-ordem" indicando que uma tela transacional está pronta para ser utilizada. A transação é criada apenas quando o comprador clica em Finalizar na tela do **Checkout**.

## Requisição

Confira um exemplo de requisição de criação do carrinho (tela transacional) no Checkout Cielo.

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://cieloecommerce.cielo.com.br/api/public/v1/orders</span></aside>

```json
{
  "OrderNumber": "Pedido01",
  "SoftDescriptor": "Exemplo",
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
    "DebitDiscount": 10,
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

**Header/Cabeçalho**

| Campo          | Tipo         | Obrigatório | Tamanho | Descrição                                                                      |
| -------------- | ------------ | ----------- | ------- | ------------------------------------------------------------------------------ |
| `MerchantId`   | Guid         | Sim         | 36      | Identificador único da loja. **Formato:** 00000000-0000-0000-0000-000000000000 |
| `Content-type` | Alphanumeric | Sim         | n/a     | Tipo do conteúdo da mensagem a ser enviada. **Utilizar:** "application/json"   |

**Cabeçalho e Autenticação** - Todas as requisições enviadas para a Cielo deverão ser autenticadas pela loja. A autenticação consiste no envio do `MerchantId`, que é o identificador único da loja fornecido pela Cielo após a afiliação da loja. A autenticação da loja deverá ser feita através do envio do campo de cabeçalho HTTP `MerchantId`:

**Body - Detalhado**

| Campo                      | Tipo         | Obrigatório | Tamanho | Condicional                                                     |
| -------------------------- | ------------ | ----------- | ------- | --------------------------------------------------------------- |
| `OrderNumber`              | Alphanumeric | Opcional    | 64      |                                                                 |
| `SoftDescriptor`           | Alphanumeric | Opcional    | 13      |                                                                 |
| `Cart.Discount.Type`       | Alphanumeric | Condicional | 255     | Obrigatório caso Cart.Discount.Value for maior ou igual a zero. |
| `Cart.Discount.Value`      | Numeric      | Condicional | 18      | Obrigatório caso Cart.Discount.Type for `Amount` ou `Percent`.  |
| `Cart.Items.Name`          | Alphanumeric | Sim         | 128     |                                                                 |
| `Cart.Items.Description`   | Alphanumeric | Opcional    | 256     |                                                                 |
| `Cart.Items.UnitPrice`     | Numeric      | Sim         | 18      |                                                                 |
| `Cart.Items.Quantity`      | Numeric      | Sim         | 9       |                                                                 |
| `Cart.Items.Type`          | Alphanumeric | Sim         | 255     |                                                                 |
| `Cart.Items.Sku`           | Alphanumeric | Opcional    | 32      |                                                                 |
| `Cart.Items.Weight`        | Numeric      | Condicional | 9       | Necessário caso Shipping.Type for "Correios".                   |
| `Payment.BoletoDiscount`   | Numeric      | Condicional | 3       |                                                                 |
| `Payment.DebitDiscount`    | Numeric      | Condicional | 3       |                                                                 |
| `FirstInstallmentDiscount` | Numeric      | Condicional | 3       |                                                                 |
| `MaxNumberOfInstallments`  | Numeric      | Condicional | 2       |                                                                 |
| `Customer.Identity`        | Numeric      | Condicional | 14      | Não obrigatório na API, mas obrigatório na tela transacional.   |
| `Customer.FullName`        | Alphanumeric | Condicional | 288     | Não obrigatório na API, mas obrigatório na tela transacional.   |
| `Customer.Email`           | Alphanumeric | Condicional | 64      | Não obrigatório na API, mas obrigatório na tela transacional.   |
| `Customer.Phone`           | Numeric      | Condicional | 11      | Não obrigatório na API, mas obrigatório na tela transacional.   |
| `Options.ReturnUrl`        | Strin        | Condicional | 255     | Uma URL fixa pode ser registrada no Backoffice Checkout.        |

## Respostas

Devido ao seu fluxo de venda ser dividido em duas etapas, sendo a primeira, a criação da tela transacional e a segunda, a finalização do pagamento, o Checkout possui duas respostas para uma transação:

- **Response - Tela transacional** - é a resposta retornada com dados para enviar o comprador para a tela transacional;
- **Response - Transação Finalizada** - contém dados sobre o resultado da transação, após o comprador clica em **Finalizar** na tela transacional. **É retornado apenas via Notificação**

**Resultado/Status da transação:** Para obter o retorno do status da transação, é necessário definir uma URL de NOTIFICAÇÃO. Veja a sessão de notificação para maiores informações.

**Response - Tela transacional**

Existem apenas duas opções de resposta na integração da API: sucesso ou erro.

**Sucesso**: em caso de sucesso, a resposta será o conteúdo da requisição mais o link que direciona a tela transacional (`CheckoutUrl`):

```json
{
  "Settings": {
    "CheckoutUrl": "https://cieloecommerce.cielo.com.br/transacional/order/index?id=123",
    "Profile": "CheckoutCielo",
    "Version": 1
  }
}
```

| Campo         | Tipo   | Obrigatório | Tamanho | Descrição                                                                                                 |
| ------------- | ------ | ----------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `CheckoutUrl` | String | Sim         | 255     | URL da tela transacional. O Comprador **deve ser direcionado para esse ambiente para finalizar a transação** |
| `Profile`     | String | Sim         | 16      | Perfil do lojista: fixo “CheckoutCielo”.                                                                  |
| `Version`     | String | Sim         | 1       | Versão do serviço de criação de pedido (versão: 1).                                                       |

**Erro** - Em caso de erro, a mensagem abaixo será retornada.

```json
{
  "message": "An error has occurred."
}
```

| Campo     | Tipo   | Obrigatório | Tamanho | Descrição                   |
| --------- | ------ | ----------- | ------- | --------------------------- |
| `Message` | String | Sim         | 254     | Mensagem descritiva do erro |

> **Importante**: O Checkout Cielo não possui erros numerados, apenas uma mensagem genérica. Veja a sessão "Identificando erros de Integração" para mais informações.

## Funcionalidades adicionais

O Checkout Cielo possui funcionalidades adicionais que seguem regras específicas para utilização e não estão disponíveis na integração via botão.

- **Tipos de Desconto**
- **Tipos de Frete**

### Tipos de Desconto

O Checkout Cielo permite que o lojista aplique descontos específicos tanto para o carrinho quanto para meios de pagamento.
Os descontos disponíveis no Checkout Cielo são:

| Desconto        | Aplicação        | Descrição                                                                                              |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Carrinho**      | API              | Quando enviado, aplica o desconto sobre todo o carrinho, independente do meio de pagamento.             |
| **Boleto**        | API e Backoffice | Quando enviado, o desconto é aplicado somente caso o boleto seja o meio de pagamento escolhido.         |
| **Débito Online** | API e Backoffice | Quando enviado, o desconto é aplicado somente caso o débito online seja o meio de pagamento escolhido.  |
| **À vista**       | API              | Quando enviado, o desconto é aplicado quando cartão de crédito à vista é o meio de pagamento escolhido. |

> **Observação**: Descontos podem ser enviados na API ou definidos no Backoffice. Caso um valor de desconto seja enviado na API, esse será o valor considerado, mesmo que o Backoffice possua outro valor registrado.

**Carrinho**

Para enviar um desconto sobre o **carrinho** basta enviar o nó `Discount` dentro do nó `Cart`:

```json
{
  "Discount": {
    "Type": "Percent",
    "Value": 00
  }
}
```

| Campo                 | Tipo         | Obrigatório | Tamanho | Descrição                                               | Condicional                                                     |
| --------------------- | ------------ | ----------- | ------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| `Cart.Discount.Type`  | Alphanumeric | Condicional | 255     | Tipo do desconto a ser aplicado: `Amount` ou `Percent`. | Obrigatório caso Cart.Discount.Value for maior ou igual a zero. |
| `Cart.Discount.Value` | Numeric      | Condicional | 18      | Valor do desconto a ser aplicado: Valor ou Percentual   | Obrigatório caso Cart.Discount.Type for `Amount` ou `Percent`.  |

Veja o desconto apresentado no carrinho:

| Percentual                                                                           | Valor                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| ![Percentual]({{ site.baseurl_root }}/images/checkout/checkout-discount-percent.png) | ![Valor]({{ site.baseurl_root }}/images/checkout/checkout-discount-amount.png) |

**Boleto e cartão de crédito**

Para enviar um desconto sobre o **boleto**, **débito online** e/ou **cartão de crédito à vista** envie dentro do nó Payment o campo correspondente:

* `BoletoDiscount` para boleto;
* `FirstInstallmentDiscount` para cartão de crédito à vista.

**Exemplo**

```json
{
  "Payment": {
    "BoletoDiscount": 15,
    "DebitDiscount": 10,
    "FirstInstallmentDiscount": 90
  }
}
```

| Campo                              | Tipo    | Obrigatório | Tamanho | Descrição                                                                       |
| ---------------------------------- | ------- | ----------- | ------- | ------------------------------------------------------------------------------- |
| `Payment.BoletoDiscount`           | Numeric | Condicional | 3       | Desconto, em porcentagem, para pagamentos a serem realizados com boleto.        |
| `Payment.FirstInstallmentDiscount` | Numeric | Condicional | 3       | Desconto, em porcentagem, para pagamentos à vista no cartão de crédito.          |

AVeja o desconto apresentado no carrinho:

| Tela transacional                                                                       |
| --------------------------------------------------------------------------------------- |
| ![Meios de pagamento]({{ site.baseurl_root }}/images/checkout/checkout-discount-mp.png) |

### Tipos de Frete

O Checkout cielo possui diferentes tipos de frete.

| Campo                   | Descrição                                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FixedAmount`           | Valor fixo enviado pelo lojista. Utilizado caso o Lojista possua um método de entrega próprio.                                                                                                                                           |
| `Free`                  | Não realiza cálculo de frete e exibe na tela transacional "Frete Grátis".                                                                                                                                                                |
| `WithoutShippingPickUp` | Considerado **Retirada na loja**.                                                                                                                                                                                                          |
| `WithoutShipping`       | Sem cobrança de frete (aplicável para serviços e produtos digitais).                                                                                                                                                                    |
| `Correios`              | Utiliza a API dos correios para realizar o cálculo do custo. O valor do cálculo dependerá o contrato utilizado (escolhido no Backoffice do checkout) e do tipo de integração para cálculo: **Frete com Volume** ou **Frete sem Volume** |

Abaixo, como cada opção é demonstrada na tela transacional:

| Tipo de frete           | Transacional                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `FixedAmount`           | ![FixedAmount]({{ site.baseurl_root }}/images/checkout/fixedamount.png)                     |
| `Free`                  | ![Free]({{ site.baseurl_root }}/images/checkout/free.png)                                   |
| `WithoutShippingPickUp` | ![WithoutShippingPickUp]({{ site.baseurl_root }}/images/checkout/withoutshippingpickup.png) |
| `WithoutShipping`       | ![WithoutShipping]({{ site.baseurl_root }}/images/checkout/withoutshippingpickup.png)       |
| `Correios`              | ![Correios]({{ site.baseurl_root }}/images/checkout/correios.png)                           |

**Observação:** As opções para múltiplos fretes na categoria `Correios` devem ser selecionadas dentro do Backoffice Cielo.

Os nós que formam as informações de frete abaixo:

- **Shipping** - Nó base. É obrigatório na integração via API. Ele define os tipos de frete a serem utilizados

| Campo                    | Tipo         | Obrigatório | Tamanho | Descrição                                                                                                | Condicional                                    |
| ------------------------ | ------------ | ----------- | ------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `Shipping.Type`          | Alphanumeric | Sim         | 255     | Tipo do frete: <br>`Correios`<br>`FixedAmount`<br>`Free`<br>`WithoutShippingPickUp`<br>`WithoutShipping` |                                                |
| `Shipping.SourceZipCode` | Numeric      | Condicional | 8       | CEP de origem do carrinho de compras.                                                                    | Obrigatório caso Shipping.Type for "Correios". |
| `Shipping.TargetZipCode` | Numeric      | Opcional    | 8       | CEP do endereço de entrega do comprador.                                                                 |                                                |

**Shipping.Address** - Informações de endereço de entrega. **Não obrigatório no contrato da API, mas obrigatório na tela transacional**. Sugerimos que esses dados sejam enviados, se já foram recolhidos dentro do ambiente da loja.

| Campo                         | Tipo         | Obrigatório | Tamanho | Descrição                                                         |
| ----------------------------- | ------------ | ----------- | ------- | ----------------------------------------------------------------- |
| `Shipping.Address.Street`     | Alphanumeric | Sim         | 256     | Rua, avenida, travessa, etc, do endereço de entrega do comprador. |
| `Shipping.Address.Number`     | Alphanumeric | Sim         | 8       | Número do endereço de entrega do comprador.                       |
| `Shipping.Address.Complement` | Alphanumeric | Opcional    | 14      | Complemento do endereço de entrega do comprador.                  |
| `Shipping.Address.District`   | Alphanumeric | Sim         | 64      | Bairro do endereço de entrega do comprador.                       |
| `Shipping.Address.City`       | Alphanumeric | Sim         | 64      | Cidade do endereço de entrega do comprador.                       |
| `Shipping.Address.State`      | Alphanumeric | Sim         | 2       | Estado (UF) do endereço de entrega do comprador.                  |

**Shipping.Services**

| Campo                        | Tipo         | Obrigatório | Tamanho | Descrição                                                 |
| ---------------------------- | ------------ | ----------- | ------- | --------------------------------------------------------- |
| `Shipping.Services.Name`     | Alphanumeric | Sim         | 128     | Nome do serviço de frete.                                 |
| `Shipping.Services.Price`    | Numeric      | Sim         | 18      | Preço do serviço de frete em centavos. Ex: R$ 1,00 = 100. |
| `Shipping.Services.Deadline` | Numeric      | Condicional | 9       | Prazo de entrega (em dias).                               |

O Frete Correios pode ser calculado de 2 maneiras:

- **Frete com Volume** - Utiliza a API dos correios, mas exige que a loja envie as dimensões do pacote a ser enviado com as mercadorias
- **Frete sem Volume** - Utiliza a API dos correios, mas considera apenas o peso do carrinho como base de cálculo para a entrega.

Para utilizar o frete volumétrico, basta enviar o nó `Shipping.Measures`, seguindo as regras de integração via API REST.

**Shipping.Measures**

| Campo               | Tipo         | Obrigatório | Tamanho | Descrição                                                          | Condicional                                            |
| ------------------- | ------------ | ----------- | ------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `Shipping.Package`  | Alphanumeric | Obrigatório | Inteiro | Tipo de pacote: <br>`BOX`- Caixa <br> `ROL` - Cilindro ou ENVELOPE |                                                        |
| `Shipping.Lenght`   | Numeric      | Obrigatório | Inteiro | Comprimento do pacote                                              |                                                        |
| `Shipping.Height`   | Numeric      | Condicional | Inteiro | Altura do pacote enviado                                           | Obrigatório caso Shipping.Package como BOX             |
| `Shipping.Width`    | Numeric      | Condicional | Inteiro | Largura do pacote.                                                 | Obrigatório caso Shipping.Package como BOX ou ENVELOPE |
| `Shipping.Diameter` | Numeric      | Condicional | Inteiro | Diâmetro do pacote.                                                | Obrigatório caso Shipping.Package como ROL             |

Para realizar o cálculo de frete via Correios é necessário respeitar as medidas definidas pelo contrato utilizado pelo lojista. Para maiores informações sobre as dimensões e pesos permitidos, sugerimos que valide o contrato da loja no link abaixo:

[Limites e dimensões para entregas do correio](http://www.correios.com.br/para-voce/precisa-de-ajuda/limites-de-dimensoes-e-de-peso)

### Identificando Erros de integração

Devido a estrutura do checkout Cielo, onde o comprador é redirecionado para um ambiente separado para completa a transação, existem possibilidades de erros e falhas de integração em diferentes momentos do fluxo de pagamento.
Durante a integração é importante
Há dois tipos de erro que poderão ocorrer durante o processo de integração com o Checkout Cielo. São eles:

| Tipo de frete             | Transacional                                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pré-Tela transacional** | Significa que houve algum dado errado no envio da transação. Dados obrigatórios podem estar faltando ou no formato invalido. Aqui o lojista sempre vai receber um e-mail informando o que deu errado |
| **Pós-Tela transacional** | Significa que há algum impedimento de cadastro que limita a venda. Coisas como afiliação bloqueada, erro nos dados salvos no cadastro ou até problemas no próprio checkout                           |

Caso algum erro ocorra após a finalização da transação, entre em contato com o Suporte Cielo.
                                                                                                                                                                                                                             
## Fluxos Meios de pagamento

### Cartão de Crédito

O Checkout Cielo permite a utilização de Cartões de Crédito das principais bandeiras nacionais e internacionais. Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo, podendo ser utilizado inicialmente com a integração Checkout.

Transações de cartão de crédito serão incluídas no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como PENDENTE, AUTORIZADO, PAGO, NEGADO, EXPIRADO OU CHARGEBACK dependendo do resultado da autorização junto ao Banco.

**Cartão de Crédito** Ordem de Status:

| Ordem | Status                  | Explicação                                                                                                                                                                                   |
| ----- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **PENDENTE**            | Status original. A transação está ocorrendo, esperando resposta do processo de autorização                                                                                                   |
| 2     | **AUTORIZADO / NEGADO** | Resultado do processo de autorização. <br>**AUTORIZADO** - Crédito foi reservado para a compra <br> **NEGADO** - Cartão não autorizado pelo emissor a continuar a transação                  |
| 3     | **PAGO**                | Ocorre pós captura. Indica que o crédito reservado no cartão será depositado na conta do lojista                                                                                             |
| N/A   | **EXPIRADO**            | Ocorre caso a transação não seja capturada em 15 dias pós autorização. Nessa situação a transação é perdida.                                                                                 |
| N/A   | **CHARGEBACK**          | Status não automático. Caso o lojista seja notificado de ChargeBack, ele pode marcar esta transação como perdida.<br> Este Status é apenas uma marcação, não afetando processos de pagamento |

**Atenção - Cartões Internacionais:** O Checkout Cielo aceita cartões emitidos fora do Brasil, entretanto esses cartões não possuem a capacidade de pagar vendas parceladas. Essa é uma limitação imposta pelo banco emissor.

**Atenção - TRANSAÇÕES EXPIRADAS:** Por padrão, lojas Checkout Cielo possuem 15 dias para realizarem a captura da transação de Crédito. Se não capturadas, essas transações serão PERDIDAs.

#### Análise de Fraude

Transações de crédito **“AUTORIZADAS”** serão enviadas para análise da ferramenta de antifraude. Todas as transações classificadas como alto risco serão automaticamente canceladas, sem exceção.
O Antifraude possui o conceito de `Status` e `SubStatus`, onde o primeiro representa o nível de risco que uma transação possui de ser uma fraude, e o segundo, uma informação adicional sobre a transação.
A análise indicará um grau de **RISCO**, especificado pelo `Status`, para a venda em questão.

Esse grau de risco é o que deve guiar a decisão do lojista de capturar ou cancelar a venda.

| Status Antifraude | Substatus                | Descrição                                                                                             |
| ----------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `Baixo Risco`     | Baixo Risco              | Baixo risco de ser uma transação fraudulenta                                                          |
| `Médio Risco`     | Médio Risco              | Médio risco de ser uma transação fraudulenta                                                          |
| `Alto Risco`      | Alto Risco               | Alto risco de ser uma transação fraudulenta                                                           |
| `Não finalizado`  | Não finalizado           | Não foi possível finalizar a consulta                                                                 |
| `N/A`             | Autenticado              | Transações autenticadas pelo banco - **Não são analisáveis pelo AF**                                  |
| `N/A`             | Não aplicável            | Meio de pagamento não analisável como cartões de débito, boleto e débito online                       |
| `N/A`             | Transação de recorrência | Transação de crédito seja posterior a transação de agendamento. **Somente o Agendamento é analisado** |
| `N/A`             | Transação negada         | Venda a crédito foi negada - **Não são analisáveis pelo AF**                                          |

A analise será apresentada no “Detalhes do Pedido”, como abaixo:

![Análise de risco]({{ site.baseurl_root }}/images/checkout-cielo-analise-risco.png)

Você pode visualizar o status do antifraude acessando o detalhe da compra, na aba Pedidos e clicando no (+)

![Status Antifraude]({{ site.baseurl_root }}/images/checkout-status-antifraude.png)

### Cartão de Débito

O Checkout Cielo permite a utilização de Cartões de débito MasterCard e Visa. Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo, podendo ser utilizado inicialmente com a integração Checkout.

Bancos Suportados:

| Mastercard      | Visa            |
| --------------- | --------------- |
| Bradesco        | Bradesco        |
| Banco do Brasil | Banco do Brasil |
| Santander       | Santander       |
| Itaú            | Itaú            |
| CitiBank        | CitiBank        |
| BRB             | N/A             |
| Caixa           | N/A             |
| BancooB         | N/A             |

Ao acessar a tela transacional, o comprador obterá pelo pagamento via Cartão de débito, e será redirecionado ao ambiente bancário para Autenticação e Autorização.

Transações de cartão de débito serão incluídas no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como PENDENTE, PAGO, NÃO AUTORIZADO ou NÃO FINALIZADO, dependendo do resultado da autorização junto ao Banco.

**Cartão de Débito** - Ordem de Status

1. **Pendente** - Status original. A transação está ocorrendo, esperando resposta do banco para envio do comprador ao ambiente de autenticação
2. **Não Finalizado** - Status intermediário. Neste ponto o Checkout Cielo espera a confirmação do Banco sobre o status da autenticação e transação. Caso o comprador abandone o ambiente do banco, o status não se altera.
3. **Pago** - Comprador finalizou o pagamento com o cartão de débito com sucesso.
4. **Não Autorizado** - O Comprador não apresentava saldo em conta para finalizar a transação.

**OBS**: A opção **Cancelar** dentro do backoffice, vai modificar o status da transação de PAGO/NÃO PAGO para CANCELADO, mas não terá efeito sobre a movimentação bancária. Caberá ao lojista retornar o valor ao comprador.

### Pix

O Pix é o pagamento instantâneo brasileiro, criado pelo Banco Central (BC), no qual os recursos são transferidos entre contas em poucos segundos, a qualquer hora ou dia (inclusive feriados e finais de semana).

Além de aumentar a velocidade dos pagamentos, o Pix na Cielo oferece diversos benefícios:

* Melhora o índice de conversão de vendas;
* Aumenta a segurança nas transações;
* É integrado ao Checkout Cielo, versátil e fácil.

#### Como usar o Pix no Checkout Cielo?

Você deve **habilitar** o meio de pagamento Pix no seu cadastro no **site Cielo** e nas **configurações da sua loja**. Na integração por API não é necessário enviar parâmetros adicionais.

#### Habilitando o Pix no portal Cielo

Para usar o **Pix**, o seu **cadastro deve estar habilitado com o meio de pagamento Pix**. Para confirmar a habilitação, acesse o [portal Cielo](https://www.cielo.com.br/){:target="_blank"}  e clique em **Meu Cadastro** > **Autorizações** > **Pix**.

Caso o Pix não esteja habilitado em seu cadastro, será apresentada a tela de adesão caso o seu estabelecimento (EC) seja elegível; após concluir o processo de adesão do Pix, já será possível usar o Pix no Checkout Cielo.

![Adesão Pix]({{ site.baseurl_root }}/images/apicieloecommerce/adesao-pix.png)

#### Habilitando o Pix nas configurações da loja

Certifique-se também que o Pix está liberado nas configurações da sua loja. Para isso, acesse **E-commerce** > **Checkout Cielo** > **Acessar** > **Configurações** > **Configurações da Loja**. Ao rolar a página para baixo será apresentado os meios de pagamentos disponíveis em seu cadastro:

![Adesão Pix]({{ site.baseurl_root }}/images/checkout/meiospgto-checkout.png)

Feito isso, o seu e-commerce já poderá receber transações com Pix no Checkout Cielo.

### Boleto

O Checkout Cielo permite a utilização de Boletos do Bradesco (Carteira 26 e SPS) e Banco do Brasil (Carteira 17).
Esse meio de pagamento precisa ser cadastrado pelo Suporte Cielo para que seja disponibilizado no Backoffice Checkout.

Bancos Suportados:

| Bancos          |
| --------------- |
| Bradesco        |
| Banco do Brasil |

Ao acessar a tela transacional, o comprador obterá pelo pagamento via Boleto.

Transações de boleto serão incluídas no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como NÃO FINALIZADO ou PAGO.
Diferentemente de outros meios de pagamento, o boleto não possui atualização de Status. Caberá ao Lojista acessar o Backoffice e modificar o status do boleto manualmente.

**Boleto** - Ordem de Status

1. **Não Finalizado** - Status inicial. O Boleto é gerado, e ainda é valido. Como o Checkout **não** acessa o ambiente do banco para identificar o pagamento do boleto, esse status continuará efetivo até que o lojista entre no backoffice o atualize.
2. **Pago** - Comprador finalizou o pagamento com o cartão de débito com sucesso.

**OBS**: A opção **Cancelar** dentro do backoffice, vai modificar o status da transação de PAGO/NÃO FINALIZADO para CANCELADO, mas não terá efeito sobre a movimentação bancaria. Caberá ao lojista retornar o valor ao comprador

# Notificações de Pagamento

O processo de notificação transacional no Checkout Cielo ocorre via a inclusão de uma URL para onde serão direcionados dados das transações realizadas na plataforma.
Vale destacar que o Checkout realiza a notificação somente quando uma transação é considerada finalizada ou seja, o comprador preencheu todos os dados da tela de pagamento e clicou em "Finalizar".

## Tipos de notificação

O Checkout Cielo possui dois tipos de notificações que o lojista pode utilizar de acordo com suas necessidades:

| Tipo   | Descrição                                                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | Notificação onde o lojista é passivo. Dois `POST HTTP` são disparados, um informando dados da venda e outra mudança de Status da transação       |
| `JSON` | Notificação onde o lojista realiza uma consulta. Um `POST` contendo informações para a realização de uma consulta (`GET`) as transações checkout |

Para utilizar ambos os modelos, o lojista necessitará acessar o Backoffice cielo e configurar tanto a `URL de NOTIFICAÇÃO` quando a `URL de MUDANÇA de STATUS`.

## Tipos de URL de Notificação

O Checkout possui 3 tipos de URL que podem impactar o processo de notificação.

| Tipo                       | Descrição                                                                                                                                                                                                                                                    | Observação                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `URL de Retorno`           | Página web na qual o comprador será redirecionado ao fim da compra. <br>Nenhum dado é trocado ou enviado para essa URL.<br> Essa URL apenas leva o comprador, após finalizar a compra, a uma página definida pela loja.                                      | Caso o Lojista deseje, ele pode configurar essa página para ser sensibilizada por tráfego, assim identificando que a transação foi finalizada no Checkout Cielo <br> Pode ser enviada via API - Ver "Integração por API" |
| `URL de Notificação`       | Ao finalizar uma transação é enviado um POST HTTP com todos os dados da venda para a URL de Notificação.<br> O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do **status da transação** | Utilizada na Notificação via `POST`e `JSON`                                                                                                                                                                              |
| `URL de Mudança de Status` | Quando um pedido tiver seu status alterado, será enviando um post HTTP para a URL de Mudança de Status.<br> O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido                                                | Utilizada somente na Notificação via `POST`                                                                                                                                                                              |

**OBS:** Caso uma `URL de retorno` seja enviada vai API, ela terá prioridade sobre a URL cadastrada no Backoffice / Na integração Checkout Cielo `via Botão`, só é possível usar a opção de URL de retorno via backoffice.

**Características das URLs**

Todas as 3 URLs devem possuir as seguintes características:

- Devem ser URLs estáticas
- Devem possuir menos de 255 caracteres
- Caracteres especiais não são suportados

**Configurando as URLs**

1. Basta acessar dentro do **Backoffice** as Abas **Configurações**
2. Em **Configurações da Loja**, Vá a sessão de **Pagamentos**
3. Cadastre as URLS e escolhe o tipo de Notificação desejado

![Cadastro de URLS]({{ site.baseurl_root }}/images/checkout/urls.png)

## Notificação: POST

A notificação via POST é baseada no envio de um `POST HTTP` quando uma transação é realizada. Ela é realizada em duas etapas:

1. `POST de NOTIFICAÇÃO` - Ocorre quando a transação é finalizada. Esse POST possui todos os dados do pedido, incluindo o STATUS inicial da transação.
2. `POST de MUDANÇA DE STATUS` - Ocorre quando uma transação possui seu STATUS alterado - **EX:** "Autorizado" > > > "Pago"

Este fluxo é utilizado por lojas que ainda não realizam transações via API.

Abaixo o Fluxo de uma Notificação POST

![Fluxo N.POST]({{ site.baseurl_root }}/images/checkout/npost.png)

**Retorno aguardado para o envio da notificação:** `HttpStatus = 200 (OK)` - Post recebido e processado com sucesso

**IMPORTANTE** Se a `URL de Notificação` cadastrada retornar algum erro/estiver indisponível, serão realizadas \*_3 novas tentativas, com intervalo de 1 hora entre cada POST_.

Caso o POST não seja recebido, é possível reenvia-lo manualmente, basta acessar o pedido em questão pelo Backoffice e clicar no Ícone de envio:

![Reenvio de notificação]({{ site.baseurl_root }}/images/checkout/reenvipost.png)

Veja a descrição dos itens de notificação na sessão **"Conteúdo do POST de NOTIFICAÇÃO"**

## Notificação: JSON

A notificação vai JSON é um método mais seguro e flexível para o lojista de realizar uma consulta no Chekcout Cielo.
Essa modalidade de notificação é baseada em um `POST JSON`, onde o lojista recebe credenciais para que uma consulta (`GET`) possa ser realizado junto a base de dados Checkout Cielo.

Ela é realizada em duas etapas:

1. `POST de NOTIFICAÇÃO` - Ocorre quando a transação é finalizada. Possui as Credenciais necessárias consultas transacionais.
2. `CONSULTA TRANSACIONAL` - Com as credenciais de consulta, o lojista busca dados da venda junto ao Checkout Cielo

Na Notificação de JSON, não há diferença entre o `POST de Notificação` e `Mudança de Status`. Sempre que algo ocorrer na transação, o lojista receberá um `POST de Notificação`

Abaixo o Fluxo de uma Notificação JSON (Criação da transação + Mudança de status)

![Fluxo N.JSON]({{ site.baseurl_root }}/images/checkout/njson.png)

**Conteúdo do POST de NOTIFICAÇÃO JSON:**

| Parâmetro             | Descrição                                                                                                              | Tipo do Campo       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `URL`                 | URL com os dados necessários para realizar a busca dos dados da transação.                                             | String              |
| `MerchantId`          | Identificador da loja no Checkout Cielo; consta no Backoffice no menu Configuração/Dados Cadastrais.                   | Alfanumérico (GUID) |
| `MerchantOrderNumber` | Número do pedido da loja; se não for enviado, o Checkout Cielo gerará um número, que será visualizado pelo Consumidor. | Alfanumérico        |

**Exemplo de uma consulta:**

**REQUEST**

```shell
curl
--request GET https://cieloecommerce.cielo.com.br/api/public/v1/orders/{merchantId}/{merchantOrderNumber}"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
--verbose
```

| Propriedade  | Descrição             | Tipo | Tamanho | Obrigatório |
| ------------ | --------------------- | ---- | ------- | ----------- |
| `MerchantId` | Identificador da loja | Guid | 36      | Sim         |

**RESPONSE**

```json
{
  "order_number": "Pedido01",
  "amount": 101,
  "discount_amount": 0,
  "checkout_cielo_order_number": "65930e7460bd4a849502ed14d7be6c03",
  "created_date": "12-09-2017 14:38:56",
  "customer_name": "Test Test",
  "customer_phone": "21987654321",
  "customer_identity": "84261300206",
  "customer_email": "test@cielo.com.br",
  "shipping_type": 1,
  "shipping_name": "Motoboy",
  "shipping_price": 1,
  "shipping_address_zipcode": "21911130",
  "shipping_address_district": "Freguesia",
  "shipping_address_city": "Rio de Janeiro",
  "shipping_address_state": "RJ",
  "shipping_address_line1": "Rua Cambui",
  "shipping_address_line2": "Apto 201",
  "shipping_address_number": "92",
  "payment_method_type": 1,
  "payment_method_brand": 1,
  "payment_maskedcreditcard": "471612******7044",
  "payment_installments": 1,
  "payment_status": 3,
  "tid": "10447480686J51OH8BPB",
  "test_transaction": "False"
}
```

Veja a descrição dos itens de notificação na sessão **"Conteúdo do POST de NOTIFICAÇÃO"**

**Retorno aguardado para o envio da notificação:** `HttpStatus = 200 (OK)` - Post recebido e processado com sucesso

**IMPORTANTE** Se a `URL de Notificação` cadastrada retornar algum erro/estiver indisponível, serão realizadas \*_3 novas tentativas, com intervalo de 1 hora entre cada POST_.

Caso o POST não seja recebido, é possível reenvia-lo manualmente, basta acessar o pedido em questão pelo Backoffice e clicar no Ícone de envio:

![Reenvio de notificação]({{ site.baseurl_root }}/images/checkout/reenvipost.png)

## Conteúdo da Notificação

Tanto na Notificação via POST HTTP ou POST JSON, o conteúdo dos dados retornados é o mesmo.
Abaixo são descritos todos os campos retornados, assim como suas definições e tamanhos:

### Conteúdo do POST de NOTIFICAÇÃO

| Parâmetro                            | Descrição                                                                                                    | Tipo do campo | Tamanho máximo |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------- | -------------- |
| `checkout_cielo_order_number`        | Identificador único gerado pelo CHECKOUT CIELO                                                               | Alfanumérico  | 32             |
| `amount`                             | Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)                                                   | Numérico      | 10             |
| `order_number`                       | Número do pedido enviado pela loja                                                                           | Alfanumérico  | 32             |
| `created_date`                       | Data da criação do pedido - `dd-MM-yyyy HH:mm:ss`                                                            | Alfanumérico  | 20             |
| `customer_name`                      | Nome do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO                       | Alfanumérico  | 289            |
| `customer_identity`                  | Identificação do consumidor (CPF ou CNPJ) Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO | Alfanumérico  | 14             |
| `customer_email`                     | E-mail do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO                     | Alfanumérico  | 64             |
| `customer_phone`                     | Telefone do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO                   | Numérico      | 11             |
| `discount_amount`                    | Valor do desconto fornecido (enviado somente se houver desconto)                                             | Numérico      | 10             |
| `shipping_type`                      | Modalidade de frete                                                                                          | Numérico      | 1              |
| `shipping_name`                      | Nome do frete                                                                                                | Alfanumérico  | 128            |
| `shipping_price`                     | Valor do serviço de frete, em centavos (ex: R$ 10,00 = 1000)                                                 | Numérico      | 10             |
| `shipping_address_zipcode`           | CEP do endereço de entrega                                                                                   | Numérico      | 8              |
| `shipping_address_district`          | Bairro do endereço de entrega                                                                                | Texto         | 64             |
| `shipping_address_city`              | Cidade do endereço de entrega                                                                                | Alfanumérico  | 64             |
| `shipping_address_state`             | Estado de endereço de entrega                                                                                | Alfanumérico  | 64             |
| `shipping_address_line1`             | Endereço de entrega                                                                                          | Alfanumérico  | 256            |
| `shipping_address_line2`             | Complemento do endereço de entrega                                                                           | Alfanumérico  | 14             |
| `shipping_address_number`            | Número do endereço de entrega                                                                                | Numérico      | 8              |
| `payment_method_type`                | Cód. do tipo de meio de pagamento                                                                            | Numérico      | 1              |
| `payment_method_brand`               | Bandeira (somente para transações com meio de pagamento cartão de crédito)                                   | Numérico      | 1              |
| `payment_method_bank`                | Banco emissor (Para transações de Boleto e Débito Automático)                                                | Numérico      | 1              |
| `payment_maskedcreditcard`           | Cartão Mascarado (Somente para transações com meio de pagamento cartão de crédito)                           | Alfanumérico  | 20             |
| `payment_installments`               | Número de parcelas                                                                                           | Numérico      | 1              |
| `payment_antifrauderesult`           | Status das transações de cartão de Crédito no Antifraude                                                     | Numérico      | 1              |
| `payment_boletonumber`               | número do boleto gerado                                                                                      | String        | 1              |
| `payment_boletoexpirationdate`       | Data de vencimento para transações realizadas com boleto bancário                                            | Numérico      | 10             |
| `payment_status`                     | Status da transação                                                                                          | Numérico      | 1              |
| `tid`                                | TID Cielo gerado no momento da autorização da transação                                                      | Alfanumérico  | 20             |
| `test_transaction`                   | Indica se a transação foi gerada com o `Modo de teste` ativado                                               | Boolean       | 32             |
| `product_id`                         | Identificador do Botão/Link de pagamento que gerou a transação                                               | Alfanumérico  | 32             |
| `product_type`                       | Tipo de Botão que gerou o pedido (Ver tabela de ProductID)                                                   | Alfanumérico  | 32             |
| `product_sku`                        | Identificador do produto cadastro no link de pagamento                                                       | texto         | 16             |
| `product_max_number_of_installments` | Numero de parcelas liberado pelo lojistas para o link de pagamento                                           | Numérico      | 2              |
| `product_expiration_date`            | Data de validade do botão/Link de pagamento                                                                  | Alfanumérico  | 12             |
| `product_quantity`                   | Numero de transações restantes até que o link deixe de funcionar                                             | Alfanumérico  | 2              |
| `product_description`                | Descrição do link de pagamentos registrada pelo lojista                                                      | texto         | 256            |
| `nsu`                                | NSU - Número sequencial único da transação.                                                                  | Alfanumérico  | 6              |
| `authorization_code`                 | Código de autorização.                                                                                       | Alfanumérico  | 8              |

### Tipos de productID

| Tipo de Link de pagamento | Enun |
| ------------------------- | ---- |
| Material físico           | 1    |
| Digital                   | 2    |
| Serviço                   | 3    |
| Pagamento                 | 4    |
| Recorrência               | 5    |

### Payment_status

O Checkout possui um Status próprios, diferente do SITE CIELO ou da API Cielo ecommerce. Veja abaixo a lista completa.

| Valor | Status de transação | Transaction Status | Meios de pagamento               | Descrição                                                                                                                     |
| ----- | ------------------- | ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1     | `Pendente`          | Pending            | Para todos os meios de pagamento | Indica que o pagamento ainda está sendo processado; OBS: Boleto - Indica que o boleto não teve o status alterado pelo lojista |
| 2     | `Pago`              | Paid               | Para todos os meios de pagamento | Transação capturada e o dinheiro será depositado em conta.                                                                    |
| 3     | `Negado`            | Denied             | Somente para Cartão Crédito      | Transação não autorizada pelo responsável do meio de pagamento                                                                |
| 4     | `Expirado`          | Expired            | Cartões de Crédito e Boleto      | Transação deixa de ser válida para captura - **15 dias pós Autorização**                                                      |
| 5     | `Cancelado`         | Voided             | Para cartões de crédito          | Transação foi cancelada pelo lojista                                                                                          |
| 6     | `Não Finalizado`    | NotFinalized       | Todos os meios de pagamento      | Pagamento esperando Status - Pode indicar erro ou falha de processamento. Entre em contato com o Suporte Cielo                |
| 7     | `Autorizado`        | Authorized         | somente para Cartão de Crédito   | Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta                  |
| 8     | `Chargeback`        | Chargeback         | somente para Cartão de Crédito   | Transação cancelada pelo consumidor junto ao emissor do cartão. O Dinheiro não será depositado em conta.                      |

Obs: Para consultas de pedido, o campo payment.status será retornado no formato texto, sempre em inglês (coluna Transaction Status).

### Payment_antifrauderesult

O Antifraude possui o conceito de `Status` e `SubStatus`, onde o primeiro representa o nível de risco que uma transação possui de ser uma fraude, e o segundo, uma informação adicional sobre a transação.

| Valor | Status Antifraude | Substatus                | Descrição                                                                                             |
| ----- | ----------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| 1     | `Baixo Risco`     | Baixo Risco              | Baixo risco de ser uma transação fraudulenta                                                          |
| 3     | `Médio Risco`     | Médio Risco              | Médio risco de ser uma transação fraudulenta                                                          |
| 2     | `Alto Risco`      | Alto Risco               | Alto risco de ser uma transação fraudulenta                                                           |
| 4     | `Não finalizado`  | Não finalizado           | Não foi possível finalizar a consulta                                                                 |
| N/A   | `N/A`             | Autenticado              | Transações autenticadas pelo banco - **Não são analisáveis pelo AF**                                  |
| N/A   | `N/A`             | Não aplicável            | Meio de pagamento não analisável como cartões de débito, boleto e débito online                       |
| N/A   | `N/A`             | Transação de recorrência | Transação de crédito seja posterior a transação de agendamento. **Somente o Agendamento é analisado** |
| N/A   | `N/A`             | Transação negada         | Venda a crédito foi negada - **Não são analisáveis pelo AF**                                          |

### Payment_method_type

O Checkout permite apenas um tipo de `Boleto` ou `Débito Online` por lojista, sendo assim não é retornado se o método usado foi Bradesco ou Banco do Brasil, pois apenas um deles estará ativado na afiliação.

| Valor | Descrição         | Description |
| ----- | ----------------- | ----------- |
| 1     | Cartão de Crédito | CreditCard  |
| 2     | Boleto Bancário   | Boleto      |
| 3     | Débito Online     | OnlineDebit |
| 4     | Cartão de Débito  | DebitCard   |
| 5     | QR Code           | QrCode      |
| 6     | Pix               | Pix         |

OBS: Para consultas o Type é retornado no campo Payment.Type e vem preenchida com o valor literal (Description)

### Payment_method_brand

| Valor | Descrição       |
| ----- | --------------- |
| 1     | Visa            |
| 2     | Master          |
| 3     | AmericanExpress |
| 4     | Diners          |
| 5     | Elo             |
| 6     | Aura            |
| 7     | JCB             |
| 8     | Discover        |
| 9     | HiperCard       |

OBS: Para consultas a Brand é retornado no campo Payment.Brand e vem preenchida com o valor literal.

### Payment_method_bank

| Valor | Descrição       |
| ----- | --------------- |
| 1     | Banco do Brasil |
| 2     | Bradesco        |

### Shipping_type

| Valor | Descrição                                             |
| ----- | ----------------------------------------------------- |
| 1     | Correios                                              |
| 2     | Frete fixo                                            |
| 3     | Frete grátis                                          |
| 4     | Retirar em mãos/loja                                  |
| 5     | Sem cobrança de frete (serviços ou produtos digitais) |

### Mudança de status

| Parâmetro                     | Descrição                                                                                                                                                               | Tipo do Campo | Tamanho Máximo |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- |
| `checkout_cielo_order_number` | Identificador único gerado pelo CHECKOUT CIELO                                                                                                                          | Alfanumérico  | 32             |
| `amount`                      | Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)                                                                                                              | Numérico      | 10             |
| `order_number`                | Número do pedido enviado pela loja                                                                                                                                      | Alfanumérico  | 32             |
| `payment_method_brand`        | Bandeira- somente para transações com meio de pagamento cartão de crédito.[Lista Completa](https://developercielo.github.io/manual/checkout-cielo#payment_method_brand) | Numérico      | 1              |
| `payment_status`              | Status da transação.[Lista Completa](https://developercielo.github.io/manual/checkout-cielo#payment_status)                                                             | Numérico      | 1              |
| `test_transaction`            | Indica se a transação foi gerada com o Modo de teste ativado                                                                                                            | Boolean       | 32             |
| `nsu`                         | NSU - Número sequencial único da transação.                                                                                                                             | Alfanumérico  | 6              |
| `authorization_code`          | Código de autorização.                                                                                                                                                  | Alfanumérico  | 8              |

# Parcelamentos do Checkout Cielo

## Tipo de Parcelamento

O Checkout Cielo permite que o lojista realize transações de crédito parceladas em até 12 vezes.
Existem dois métodos de parcelamento:

- **Parcelamento via backoffice** - é o método padrão de parcelamento do Checkout. Cada bandeira possui uma configuração de parcelamento até 12X. O Valor do Carrinho (Produtos + Frete) é dividido igualmente pelo número de parcelas.
- **Parcelamento via API** - O Lojista limita o número de parcelas a serem apresentadas no backoffice

**OBS:** O Checkout é limitado a parcelamentos de 12X, mesmo que sua afiliação Cielo suporte valores superiores. Caso o valor apresentando em seu backoffice seja menor que 12, entre em contato com o Suporte Cielo e verifique a configuração de sua Afiliação.

## Parcelamento via backoffice

Neste modo, o lojista controla o limite máximo de parcelas que a loja realizará pelo Backoffice Checkout. O Valor das parcelas é definido acessando a aba **Configurações** e alterando a sessão **Pagamentos**

![Seleção de Parcelas]({{ site.baseurl_root }}/images/checkout/parcelamento.png)

**OBS:** O Check Box deve estar marcado para que o meio de pagamento seja exibido na tela transacional.

**Características**

- Disponível nas integrações do Checkout Cielo via API ou Botão;
- O valor total dos itens do carrinho é somado e dividido pela quantidade de parcelas do lojista;
- O valor da compra é sempre o mesmo, independentemente da quantidade de parcelas escolhida pelo comprador (Não há cobrança de Juros);
- O valor do frete é somado ao valor do parcelamento;
- A opção “à vista” sempre está disponível ao comprador.
- Todas as transações possuirão as mesmas opções de parcelamento.

## Parcelamento via API

Nesta opção, o lojista pode configurar a quantidade de parcelas por venda, especificado via request da API no momento de envio da transação.
O Checkout realiza o cálculo das parcelas considerando valor total e limite parcelas enviadas via API.

**ATENÇÃO:** Nesta opção de parcelamento, o número de parcelas desejadas deve ser inferior a quantidade que está cadastrada no backoffice Checkout.

**Características**

- O lojista envia a quantidade máxima de parcelas que deseja exibir ao comprador.
- O valor do frete é somado ao valor do parcelamento.

O Parcelamento via API é realizado enviando o campo `MaxNumberOfInstallments` dentro do nó Payment. Isso forçará o Checkout a recalcular o valor do parcelamento.
Abaixo, um exemplo do Nó

```json
"Payment": {
  "MaxNumberOfInstallments": 3
}
```

| Campo                     | Tipo    | Obrigatório | Tamanho | Descrição                                                                                          |
| ------------------------- | ------- | ----------- | ------- | -------------------------------------------------------------------------------------------------- |
| `MaxNumberOfInstallments` | Numeric | Condicional | 2       | Define valor máximo de parcelas apresentadas no transacional, ignorando configuração do Backoffice |

# Recorrência do Checkout Cielo

A Recorrência é um processo de agendamento automático de transações de crédito, ou seja, é uma transação que se repetirá automaticamente, sem a necessidade do comprador acessar a tela transacional, de acordo com as regras definidas no momento do agendamento.

<aside class="notice">Caso uma das transações não seja autorizada, o Checkout Cielo executa a retentativa automaticamente; para mais detalhes sobre a retentativa automática, veja a seção <a href="#retentativa-de-recorrências">Retentativa</a>.</aside>

Transações recorrentes são ideais para modelos de negócios que envolvam o **conceito de assinatura, plano ou mensalidade** na sua forma de **cobrança**.
Alguns exemplos de negócios são:

- Escolas
- Academias
- Editoras
- Serviços de hospedagem

**Diferença entre transações recorrentes e parceladas:**

| Tipo            | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Parceladas**  | Se trata de **uma transação dividida em vários meses**. <br>O valor total da venda compromete o limite do cartão de crédito do comprador independentemente do valor da parcela inicial.<br> O lojista recebe o valor da venda parceladamente e não corre o risco de uma das parcelas ser negada.<br> **EX**: Venda de R$1.000,00 parcelado em 2 vezes. Apesar de o comprador pagar apenas R$500,00 na primeira parcela, o valor do limite de crédito consumido é o integral, ou seja, R$1.000,00. Se o limite do cartão for inferior ou o montante não estiver liberado, a R$1.000,00 a transação será negada                                                |
| **Recorrentes** | São **transações diferentes realizadas no mesmo cartão em momentos previamente agendados**.<br> A primeira venda agenda as futuras vendas a partir de um intervalo de tempo pré definido.<br> A cada intervalo haverá uma cobrança no cartão de crédito. <br> O pagamento recorrente bloqueia do limite do cartão apenas o valor debitado na data da primeira venda recorrente e do valor total da venda.<br> **EX**: Venda de R$ 1.000,00 em 15/01/2015, com recorrência mensal e data final em 01/06/2015. Todo dia 15 haverá uma nova cobrança de R$1.000,00 no cartão do comprador, se repetindo até 15/05/2015, última data válida antes da data final. |

## Recorrência por API

Uma transação de recorrência no Checkout Cielo possui duas configurações: `Intervalo` e `Data de encerramento`.

- **Intervalo** – padrão de repetição e intervalo de tempo entre cada transação. Esse intervalo temporal entre as transações podem ser: Mensal, Bimestral, Trimestral, Semestral e Anual.
- **Data de encerramento** – Data que o processo de recorrência deixa de ocorrer.

```json
"Payment": {
        "RecurrentPayment": {
            "Interval": "Monthly",
            "EndDate": "2018-12-31"
        }
```

**Payment.RecurrentPayment**

| Campo                               | Tipo         | Obrigatório | Tamanho | Descrição                                                                                          |
| ----------------------------------- | ------------ | ----------- | ------- | -------------------------------------------------------------------------------------------------- |
| `Payment.RecurrentPayment.Interval` | Alphanumeric | Sim         | 10      | Intervalo entre cada transação da recorrência                                                      |
| `Payment.RecurrentPayment.EndDate`  | YYYY-MM-DD   | Não         | 255     | Data onde a Recorrência se encerrará; Se não enviado a recorrência se encerra somente se cancelada |

| Intervalo    | Descrição  |
| ------------ | ---------- |
| `Monthly`    | Mensal     |
| `Bimonthly`  | Bimestral  |
| `Quarterly`  | Trimestral |
| `SemiAnnual` | Semestral  |
| `Annual`     | Anual      |

Os dados do cartão de crédito do comprador ficam armazenados de forma segura dentro do Checkout Cielo, permitindo sua reutilização em uma transação recorrente. Esses dados não são acessados pelo lojista e essa inteligência é controlada pelo Checkout Cielo.

Exceto o objeto `Payment` que contém um novo elemento específico para a recorrência chamado `RecurrentPayment`, todos os outros objetos são iguais à integração com o Carrinho.

### Request

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

**Exemplo**: Bem Físico

Se o tipo de produto for `Bem Físico`, a **API obriga o envio do tipo de frete**.
Se no contrato técnico existir o nó da recorrência, fica obrigatório o tipo `WithoutShipping`, caso contrário, a seguinte resposta será apresentada:

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

**IMPORTANTE:** A Recorrência é criada apenas se a transação for **AUTORIZADA**. Independente de captura ou não, uma vez autorizada, o processo de recorrência se inicia.

## Recorrência por Botão

Uma maneira de realizar a recorrência dentro do Checkout é criar um botão recorrente.

Basta cadastrar o produto, incluindo um intervalo de cobrança e uma data para encerramento (Opcional), como no exemplo abaixo:

![Botão recorrência]({{ site.baseurl_root }}/images/checkout-botao-recorrencia.png)

**ATENÇÃO:** Caso um botão seja utilizado após a “Data final” cadastrada, a transação apresentará um erro exibindo **Oppss** na tela transacional. A Data pode ser editada na tela de edição do botão dentro de “Detalhes do Produto”

## Retentativa de Recorrências

Caso uma das transações da recorrência não seja autorizada, o Checkout Cielo executa a retentativa automaticamente, o envio de uma nova transação, considerando:

- **Intervalo de tempo entre as tentativas:** 4 dias
- **Quantidade de retentativas:** 4 (quatro), uma por dia, por 4 dias corridos a partir do dia seguinte da transação original não autorizada.

**OBS**: Esse processo visa manter obter uma resposta positiva do processo de autorização, impedindo o lojista de perder a venda. O Processo de retentativa gera pedidos duplicados dentro do Backoffice, pois o pedido original, negado, será apresentado na lista de Pedidos, junto com a nova transação autorizada

**ATENÇÃO:** A regra da retentativa não pode ser modificada pelo lojista.

## Consultando transações

As transações de Recorrência ficam disponíveis no Backoffice Checkout Cielo como as outras vendas de sua loja na aba “PEDIDOS” (veja imagem abaixo).

A primeira transação da recorrência é uma transação normal, seguindo as regras e preferências definidas pelo lojista no Backoffice.

**ATENÇÃO:** O valor e data de cobrança das transações recorrentes serão sempre os mesmos da transação inicial. O agendamento passa a funcionar automaticamente a partir da data em que a primeira transação for autorizada.

![Consultando transações]({{ site.baseurl_root }}/images/checkout-consulta-recorrencia.png)

Esta tela mostra a data que a 1° transação da recorrência foi autorizada e deverá ser capturada manualmente. **As demais transações da recorrência sempre serão capturadas automaticamente**, independente se primeira transação foi capturada ou cancelada. Se o Cliente tiver configurado Captura automática, a captura da recorrência também será automática.

**ATENÇÃO:** Somente a 1° transação é submetida a análise do antifraude

## Cancelamento de Recorrência no Checkout Cielo

O cancelamento da recorrência ocorre dentro do Backoffice do Checkout Cielo, também na aba “PEDIDOS”. Basta:

1. Acessar uma transação de recorrência (marcada com o símbolo “Recorrente”)
2. Entrar em Detalhes (o símbolo de “+”)

![Pedido de recorrência]({{ site.baseurl_root }}/images/checkout-cancelar-recorrencia.png)

![Cancelamento de recorrência]({{ site.baseurl_root }}/images/checkout/pedidoreccance.png)

Tela de detalhes da Recorrência

Na tela acima, há duas opções de Cancelamento pelos botões:

- **Cancelar** – Cancela a transação, sem efetuar o cancelamento das futuras transações de recorrência.
- **Cancelar Recorrência** - Cancela o agendamento de futuras transações, encerrando a recorrência. Não cancela a transação atual nem as que já ocorreram. Essas necessitam ser canceladas manualmente.

**ATENÇÃO:**

- A Recorrência ocorre somente para Cartões de crédito e para produtos tipo “SERVIÇO” e “BENS DIGITAIS”.
- A Recorrência é iniciada no momento da AUTORIZAÇAO, NÃO NA CAPTURA. Se a recorrência não tiver uma data para ser finalizada, ela se repetirá automaticamente até ser cancelada manualmente.
- Sua afiliação Cielo deve ser habilitada para transacionar sem CVV ou Em recorrência, do contrário, todas as transações recorrentes serão negadas.

## Edição da Recorrência

O Checkout Cielo permite que o lojista modifique 3 dados da recorrência:

- **Ativação** - Uma recorrência pode ser ativada ou cancelada.
- **Intervalo** - É possivel modificar o intervalo de execução.
- **Dia de ocorrência** - É possivel modificar o dia de execução da transação recorrente.

A atualização é feita exclusivamente via o Backoffice Cielo. Acesso o [**Tutorial do Backoffice Checkout Cielo**]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) para mais informações.

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
