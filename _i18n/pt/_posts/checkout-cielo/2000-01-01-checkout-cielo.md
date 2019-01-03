---
layout: manual
title: Manual de integração
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - Checkout Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Sobre o Checkout Cielo.

O Checkout Cielo é uma solução que agrega vários serviços de processamento de pagamento, no qual o consumidor é direcionado para uma página de pagamento online segura da *Cielo*.
A página de pagamentos Cielo proporciona um alto nível de confiança, seguindo as normas de segurança PCI.

O grande diferencial do Checkout Cielo é a gama de serviços agregados em uma tela transacional segura e com apenas uma integração técnica via **API REST**.

O *Checkout* possui as seguintes Funcionalidades:

|Funcionalidade|Descrição|
|---|---|
|**Tela transacional**|O Checkout Cielo possui uma tela transacional própria, com um layout otimizado, encurtando os passos no pagamento de suas transações. |
|**Registro de Compradores**|O Checkout Cielo possui a capacidade de salvar cartões e dados de pagamento de compradores, permitindo que em compras futuras, os dados ja estejam preenchidos na tela transacional|
|**Compra com 1 Clique**|Com o comprador cadastrado, o Checkout permite que a compra seja concluída rapidamente, utilizando os dados de pagamento e endereço favoritos do comprador|
|**Recorrência**|O Checkout Cielo possui a Recorrência Programada disponível na API Cielo Ecommerce. <br> Basta que o lojista defina que uma transação deve se repetir, que o Checkout vai executa-la novamente no intervalo definido|
|**Antifraude**|O Checkout já possui uma integração com o Antifraude da CyberSource, permitindo a análise de transações de crédito sem uma integração adicional|
|**Meios de pagamentos**|O Checkout Cielo possui uma variada gama de meios de pagamento: <br> **Cartões de crédito** <br> **Cartão de Débito**<br>**Débito Online**<br>**Boleto Bradesco e Banco do Brasil**|
|**Backoffice Simplificado**|O Backoffice do Checkout Cielo possui um layout simplificado e dinâmico que permite uma navegação rápida e confortável para que o Lojista possa acompanhar as vendas sem dificuldade|
|**Integração com Botão e QR Code**|Sem integração técnica ou o programação, o Checkout disponibiliza uma integração que torna possível realizar a criação de um link gerador de pedidos apenas com um cadastro de produtos dentro do Backoffice Checkout.|
|**Integração com Plataformas Ecommerce**|. Possui integração com a Loja Virtual Terra e outras plataformas, já estando presente nas principais plataformas ecommerce do mercado brasileiro|
|**Relatórios transacionais**|Dentro do Backoffice, é possível gerar relatórios transnacionais que facilitam a administração de suas vendas: <br> **Relatório de Recorrências** <br> **Relatório de compradores**<br>**Extrato de vendas**<br>**Relatório de vendas**|

O Checkout Cielo é uma funcionalidade indicada para:

* **Sites com Carrinhos de compra**: quando houver um “carrinho de compras”  a ser enviado, ou seja, no caso do consumidor navegar pelo site e escolher 1 ou mais produtos a fim de finalizar a compra.
* **Vendas via Redes sociais**: Com a capacidade de gerar um link ou QR Code para levar o comprador a tela transacional, o Checkout é indicado para realizar vendas via redes sociais de modo simplificado, sem a necessidade de integração técnica.

## Meios de pagamento do Checkout Cielo

A versão atual do Checkout Cielo possui suporte aos seguintes meios de pagamento:

**Cartão de Crédito**

| Bandeira         | Crédito à vista | Crédito parcelado Loja | Débito | Voucher |
|------------------|-----------------|------------------------|--------|---------|
| Visa             | Sim             | Sim                    | Sim    | Não     |
| MasterCard       | Sim             | Sim                    | Sim    | Não     |
| American Express | Sim             | Sim                    | Não    | Não     |
| Elo              | Sim             | Sim                    | Não    | Não     |
| Diners Club      | Sim             | Sim                    | Não    | Não     |
| Discover         | Sim             | Não                    | Não    | Não     |
| JCB              | Sim             | Sim                    | Não    | Não     |
| Aura             | Sim             | Sim                    | Não    | Não     |
| Hipercard        | Sim             | Sim                    | Não    | Não     |

**OBS**: Limite maximo de parcelas do Checkout Cielo é 12X.

**Cartão de Débito**

|Bandeira|Banco|
|---|---|
|Visa|Bradesco<br>Banco do Brasil<br>HSBC<br>Santander<br>Itaú<br>BRB<br>Safra<br>Banco da Amazônia<br>Sicredi<br>Banco do Espirito Santo<br>Banco do Nordeste<br>Mercantil|
|Mastercard|Banco do Brasil<br>Santander<br>Itaú<br>BRB<br>Sicredi<br>Bancoob<br>CitiBank|

**Boleto**

|Banco|Tipo|
|---|---|
|Bradesco|Não registrado|
|Bradesco|Registrado SPS|
|Banco do Brasil|Não registrado|

**Débito Online**

|Banco|
|---|
|Bradesco|
|Banco do Brasil|

## Pré-requisitos para Integração.

O Checkout Cielo  possui uma lista de requisitos básicos para que o processo de integração seja bem sucedido.
Abaixo listamos pontos que devem estar prontos antes da integração:

1. O cadastro da loja deve estar **ativo** junto à Cielo, possuindo ao menos um tipo de **PLANO de pagamento** atrelado a conta.

2. Deve-se definir um **timeout** adequado nas requisições HTTP à Cielo; recomendamos 30 segundos.

3. O certificado Root da entidade certificadora (CA) de nosso Web Service deve estar cadastrado na Truststore a ser utilizada. Como nossa certificadora é de ampla aceitação no mercado, é provável que ela já esteja registrada na Truststore do próprio sistema operacional. Veja a seção [Certificado Extended Validation](#certificado-extended-validation) para mais informações.

4. O Checkout funciona de forma eficiente apenas nos navegadores suportados:

|Navegador|Versão|
|---|---|
|Chrome|V40.0 ou posterior|
|FireFox|V34.0.5 ou posterior|
|Internet Explorer|10 ou superior|
|Safari (MAC/iOS)|7 ou posterior|
|Opera|V26 ou posterior|

**OBS**: Para que compradores e lojistas obtenham a melhor experiência do Checkout Cielo, recomendamos baixar a última versão dos navegadores mencionados acima.

Confira este [**site**](http://browsehappy.com/) para visualizar as últimas versões dos navegadores.

**Observação:** navegadores antigos podem negar acesso ao Checkout Cielo e alguns recursos não funcionarão como desejado. Navegadores mais recentes também oferecem melhores recursos de encriptação e privacidade.

Se um recurso ainda não funcionar como esperado:

* Tente utilizar outro navegador como solução temporária para o problema.
* Se você utiliza o Internet Explorer, tente desativar o modo de compatibilidade.

Se você já tentou essas soluções, mas continua a ter problemas, entre em contato conosco pelo [Suporte Cielo](#suporte-cielo) e forneça as seguintes informações:

* Uma explicação geral do problema.
* O navegador e a versão que estão sendo utilizados.
* O sistema operacional e a versão utilizada no computador.
* Uma captura de tela do problema.

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
* [Certificado Intermediária 1]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Certificado Intermediária 2]({{ site.baseurl }}/attachment/intermediate2.cer)
* [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/servercertificate.cer)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning">A Cielo não oferece suporte para a instalação do Certificado.</aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

**1º Passo**

Salvar os três arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

* [Certificado Raiz]({{ site.baseurl }}/attachment/Root.crt)
* [Certificado Intermediária 1]({{ site.baseurl }}/attachment/intermediate1.crt)
* [Certificado Intermediária 2]({{ site.baseurl }}/attachment/intermediate2.crt)
* [Certificado E-Commerce Cielo]({{ site.baseurl }}/attachment/servercertificate.cer)

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

# Integrando o Checkout Cielo

Nesta documentação estão descritas todas as funcionalidades da integração da API Checkout Cielo, os parâmetros técnicos e principalmente os códigos de exemplos para facilitar o seu desenvolvimento.

Existem duas maneiras de realizar a integração:

|Tipo|Descrição|
|---|---|
|`API`|É utilizada uma Integração via API que permite o lojista enviar o **"Carrinho de compras"** do seu site com todos os dados que ele deseja apresentar na tela transacional. <br> Neste tipo de integração o lojista possui maior controle sobre como o pedido será gerado.|
|`Botão / QR Code / Link`|Dentro do Backoffice do Checkout Cielo, é possível registrar um produto ou grupo de produtos que vão gerar um Link capaz de criar várias telas de pagamento. Esse modelo é usado para pagamentos por redes sociais, campanhas promocionais ou Vendas via QR Code. Nessa categoria o lojista possui menos controle sobre como os pedidos serão apresentados ou gerados na tela transacional|

## Fluxo de integração

Durante a integração com o Checkout Cielo, uma seguencia de troca de informações e redirecionamentos serão executados para que a uma transação seja criada e executada.

Veja o fluxo abaixo:

**Fluxo de integração Checkout Cielo** - Diagrama sequêncial
![Fluxo de integração Checkout Cielo]({{ site.baseurl_root }}/images/checkout/fluxobasico.svg)

**Fluxo de integração Checkout Cielo** - Fluxograma
![Fluxo de integração Checkout Cielo]({{ site.baseurl_root }}/images/checkout/fluxocheckoutbasico.png)

Após o portador do cartão (consumidor) selecionar suas compras e apertar o botão “Comprar” de uma loja já integrada ao Checkout Cielo, o fluxo nesta ordem:

1. A API da Cielo retorna o **CheckoutURL**, que é a URL da tela transacional montada com base nos dados enviados pelo Lojista/Botão.
2. A loja redireciona o cliente para a URL retornada pela Cielo. A tela apresentada é parte do **Ambiente de pagamento seguro Cielo**.
3. O portador escolhe: Meio de pagamento, tipo de frete e endereço de entrega na tela transacional
4. O Checkout Cielo redireciona o cliente para a **URL de Retorno** escolhida pela loja, configurada no [Backoffice Checkout Cielo]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) ou enviada pela integração via API.
5. Se a loja possui uma **URL de notificação**, ela será notificada sobre a situação da transação.
5. A loja avisa ao cliente que o processo foi concluído e que ele receberá mais informações sobre a compra e o pagamento por e-mail.e
7. A loja processa o pedido de compra utilizando os dados do POST de notificação e, se a transação estiver autorizada, libera o pedido.

**OBS:** O Checkout Cielo não notifica os compradores a respeito do status de compra, apenas ao lojista. Isso ocorre pois permite ao lojista decidir quando e como informar aos seus consumidores sobre o prazo de entrega e processo de envio

## Modo de teste do Checkout Cielo

O modo de teste Checkout Cielo é uma ferramenta que permite testar a integração do seu site com a plataforma. Com o modo teste, você pode realizar transações a medida que evolui com a integração e consegue simular cenários para testar diferentes meios de pagamento.

### Ativação do Modo de Teste.

O modo de teste pode ser ativado na aba **Configurações**, onde existe um caixa de seleção, que quando marcada, habilitará o modo de teste do Checkout Cielo. O modo somente se iniciará quando a seleção for salva.

![Ativando Modo de teste]({{ site.baseurl_root }}/images/checkout/tm01.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) e na tela transacional do Checkout Cielo.

Essa tarja indica que a sua loja Checkout Cielo está agora operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

|Backoffice|Transacional|
|---|---|
|![Tarja vermelha - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png)|![Tarja vermelha - Transacional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png)|

### Como transacionar no Modo de teste.

A realização de transações no modo de teste ocorre de forma normal. As informações da transação são enviadas via POST ou API, utilizando os parâmetros como descrito no tópico [Integração por API](#integração-por-api), entretanto, os meios de pagamentos a serem usados serão meios simulados.

Para realizar transações de teste com diferentes meios de pagamento, siga as seguintes regras:

**A - Transações com Cartão de crédito:**

Para testar cartões de crédito é necessário que dois dados importantes sejam definidos, o status da autorização do cartão e o retorno da analise de fraude.

**Status da Autorização do Cartão de Crédito**

|Status da Transação|Cartões para realização dos testes|
|---|---|---|---|
|Autorizado|0000.0000.0000.0000 / 0000.0000.0000.0004|
|Não Autorizado|0000.0000.0000.0005 / 0000.0000.0000.0009|

**Exemplo:** 540443424293010**0** = **Autorizado**

**B - Boleto Bancário**

Basta realizar o processo de compra normalmente sem nenhuma alteração no procedimento.
O boleto gerado no modo de teste sempre será um boleto simulado.

**C - Debito online**

É necessário informa o status da transação de Debito online para que seja retornado o status desejado. Esse processo ocorre como no antifraude do cartão de crédito descrito acima, com a alteração do nome do comprador.

**Status do Débito**

|Sobre nome do cliente|Status|
|---|---|
|Pago|Pago|
|Qualquer nome.|Não autorizado|

* **Exemplo:** Status não Autorizado.
* **Nome do Cliente:** Maria Pereira

**D - Transações de teste**

Todas as transações realizadas no modo de teste serão exibidas como transações normais na aba Pedidos do Checkout Cielo, entretanto, elas serão marcadas como transações de teste e não serão contabilizadas em conjunto com as transações realizadas fora do ambiente de teste.

![Transações de teste]({{ site.baseurl_root }}/images/checkout-cielo-modo-teste-transacoes-de-teste.png)

Essas transações terão o símbolo de teste as diferenciando de suas outras transações. Elas podem ser capturadas ou canceladas utilizando os mesmos procedimentos das transações reais.

![Transações de teste]({{ site.baseurl_root }}/images/checkout-cielo-modo-teste-transacoes-de-teste-cancelamento.png)

<aside class="notice">É muito importante que ao liberar sua loja para a realização de vendas para seus clientes que **ela não esteja em modo de teste**. Transações realizadas nesse ambiente poderão ser finalizadas normalmente, mas **não serão descontadas do cartão do cliente** e não poderão ser “transferidas” para o ambiente de venda padrão.</aside>

## SDKs e POSTMAN

O Checkout Cielo possui uma coleção POSTMAN de testes exclusiva com todos os parametros e opções descritas neste manual.
Basta acessar nosso [Tutorial](https://developercielo.github.io/tutorial/postman) para obter informações sobre a utilização da ferramenta.

No postman é possivel criar exemplos de sua integração em:

* PHP
* RUBY
* C#
* JAVA
* PYTHON
* SHELL

## Integração por API

Este tipo de integração deve ser usada sempre que  houver  um  “carrinho  de  compras”  a  ser  enviado,  ou  seja,  no  caso  do consumidor navegar pelo site e escolher 1 ou mais produtos para adicionar a um carrinho e depois então finalizar a venda.

Se você não possui um carrinho de compras implementado, veja a seção de **Integração via botão** Checkout Cielo.

Abaixo, é demonstrado como o fluxo de compra ocorre na integração via API:

![Integração Via API]({{site.baseurl_root}}/images/checkout/int-api.png)

### Criando o Carrinho

Na integração via API, a tela transacional é "montada" com bases em dados enviados que formam um **Carrinho de compras**.
Esses dados são separados nos seguintes "nós principais":

|Nó|Descrição|
|---|---|
|`Cart`|Contem dados dos produtos a serem vendidos.|
|`Shipping`|Contem dados do tipo de frete a ser cobrado. É influenciado pelo nó `Cart`|
|`Payment`|Contem informações que influenciam o valor cobrado. **Não contem informações sobre meios de pagamento**|
|`Customer`|Possui dados o comprador. Não obrigatório na integração, mas exigido na tela de pagamentos. Sugerimos que seja enviado para acelerar o processo de compra|
|`Options`|Controla features opcionais do Checkout. Nó não obrigatório|

Após o envio dos dados do carrinho, o Checkout enviará um Response contendo um **LINK para a tela de pagamento**

**IMPORTANTE**: Uma chamada a API Checkout **NÃO CRIA UMA TRANSAÇÃO**. O Link retornado é apenas uma "pré-ordem" indicando que uma tela transacional está pronta para ser utilizada. A Transação é criada apenas quando o comprador clica em "FINALIZAR"

### Request

Endpoint é a URL para onde as requisições com os dados do carrinho serão enviadas. Todas as requisições deverão ser enviadas utilizando o método HTTP POST, para o endpoint:

**Produção** `https://cieloecommerce.cielo.com.br/api/public/v1/orders`.

**Exemplo de uma requisição**

```json
{  
   "OrderNumber":"Pedido01",
   "SoftDescriptor":"Exemplo",
   "Cart":{  
      "Discount":{  
         "Type":"Percent",
         "Value":00
      },
      "Items":[  
         {  
            "Name":"Produto01",
            "Description":"ProdutoExemplo01",
            "UnitPrice":100,
            "Quantity":1,
            "Type":"Asset",
            "Sku":"ABC001",
            "Weight":500
         },
        ]
   },
   "Shipping":{  
      "SourceZipCode":"20020080",
      "TargetZipCode":"21911130",
      "Type":"FixedAmount",
      "Services":[  
         {  
            "Name":"Motoboy",
            "Price":1,
            "Deadline":15,
            "Carrier":null
         },
         {  
            "Name":"UPS Express",
            "Price":1,
            "Deadline":2,
            "Carrier":null
         }
      ],
      "Address":{  
         "Street":"Rua Cambui",
         "Number":"92",
         "Complement":"Apto 201",
         "District":"Freguesia",
         "City":"Rio de Janeiro",
         "State":"RJ"
      }
   },
   "Payment":{  
      "BoletoDiscount":15,
      "DebitDiscount":10,
      "Installments":null,
      "MaxNumberOfInstallments": null
   },
   "Customer":{  
      "Identity":"84261300206",
      "FullName":"Test de Test",
      "Email":"test@cielo.com.br",
      "Phone":"21987654321"
   },
   "Options":{  
     "AntifraudEnabled":true,
     "ReturnUrl": "http://www.cielo.com.br"
   },
   "Settings":null
}
```

**Header/Cabeçalho**

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`MerchantId`|Guid|Sim|36|Identificador único da loja. **Formato:** 00000000-0000-0000-0000-000000000000|
|`Content-type`|Alphanumeric|Sim|n/a|Tipo do conteúdo da mensagem a ser enviada. **Utilizar:** "application/json"|

**Cabeçalho e Autenticação** - Todas as requisições enviadas para a Cielo deverão ser autenticadas pela loja. A autenticação consiste no envio do `MerchantID`, que é o identificador único da loja fornecido pela Cielo após a afiliação da loja. A autenticação da loja deverá ser feita através do envio do campo de cabeçalho HTTP `MerchandId`, como ilustrado abaixo e ao lado:

**Body - Detalhado**

|Campo|Tipo|Obrigatório|Tamanho|Descrição|Condicional|
|---|---|---|---|---|---|
|`OrderNumber`|Alphanumeric|Opcional|64|Número do pedido da loja.||
|`SoftDescriptor`|Alphanumeric|Opcional|13|Texto exibido na fatura do comprador. Sem caracteres especiais ou espaços. EX: `Loja_ABC_1234`||
|`Cart.Discount.Type`|Alphanumeric|Condicional|255|Tipo do desconto a ser aplicado: `Amount` ou `Percent`.|Obrigatório caso Cart.Discount.Value for maior ou igual a zero.|
|`Cart.Discount.Value`|Numeric|Condicional|18|Valor do desconto a ser aplicado: Valor ou Percentual|Obrigatório caso Cart.Discount.Type for `Amount` ou `Percent`.|
|`Cart.Items.Name`|Alphanumeric|Sim|128|Nome do item no carrinho.||
|`Cart.Items.Description`|Alphanumeric|Opcional|256|Descrição do item no carrinho.||
|`Cart.Items.UnitPrice`|Numeric|Sim|18|Preço unitário do produto em centavos. Ex: R$ 1,00 = 100||
|`Cart.Items.Quantity`|Numeric|Sim|9|Quantidade do item no carrinho.||
|`Cart.Items.Type`|Alphanumeric|Sim|255|Tipo do item no carrinho: <br>`Asset`<br>`Digital`<br>`Service`<br>`Payment`||
|`Cart.Items.Sku`|Alphanumeric|Opcional|32|Sku do item no carrinho.||
|`Cart.Items.Weight`|Numeric|Condicional|9|Peso em gramas do item no carrinho.|Necessário caso Shipping.Type for "Correios".|
|`Payment.BoletoDiscount`|Numeric|Condicional|3|Desconto, em porcentagem, para pagamentos a serem realizados com boleto.||
|`Payment.DebitDiscount`|Numeric|Condicional|3|Desconto, em porcentagem, para pagamentos a serem realizados com débito online.||
|`FirstInstallmentDiscount`|Numeric|Condicional|3|Desconto, em porcentagem, para pagamentos a serem realizados com crédito a vista.||
|`MaxNumberOfInstallments`|Numeric|Condicional|2|Define valor máximo de parcelas apresentadas no transacional, ignorando configuração do Backoffice||
|`Customer.Identity`|Numeric|Condicional|14|CPF ou CNPJ do comprador.|Não obrigatório na API, mas obrigatório na tela transacional|
|`Customer.FullName`|Alphanumeric|Condicional|288|Nome completo do comprador.|Não obrigatório na API, mas obrigatório na tela transacional|
|`Customer.Email`|Alphanumeric|Condicional|64|Email do comprador.|Não obrigatório na API, mas obrigatório na tela transacional|
|`Customer.Phone`|Numeric|Condicional|11|Telefone do comprador.|Não obrigatório na API, mas obrigatório na tela transacional|
|`Options.AntifraudEnabled`|Boolean|Condicional|n/a|Habilitar ou não a análise de fraude para o pedido: true ou false.||
|`Options.ReturnUrl`|Strin|Condicional|255|Define para qual url o comprador será enviado após finalizar a compra.|Uma URL fixa pode ser registrada no Backoffice Checkout|

### Responses

Devido ao seu fluxo de venda ser dividido em duas etapas, sendo a primeira, a criação da tela transacional e a segunda, a finalização do pagamento; O Checkout possui duas respostas para uma transação:

* **Response - Tela transacional** - É o Response retornado com dados para enviar o comprador para a tela transacional
* **Response - Transação Finalizada** - Contém dados sobre o resultado da transação, após o comprador clica em "Finalizar" na tela transacional. **É retornado apenas via Notificação**

**Resultado/Status da transação:** Para obter o retorno do status da transação, é necessário definir uma URL de NOTIFICAÇÃO. Veja a sessão de notificação para maiores informações.

**Response - Tela transacional**

Existem apenas duas opções de resposta na integração da API: Sucesso / Erro

**Sucesso** - Em caso de sucesso, o response será o conteúdo do Request mais o Link que direciona a tela transacional

```json
{
    "Settings": {
        "CheckoutUrl": "https://cieloecommerce.cielo.com.br/transacional/order/index?id=123",
        "Profile": "CheckoutCielo",
        "Version": 1
    }
}
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`CheckoutUrl`|String|Sim|255|URL da tela transacional. O Comprador **deve ser direcionado a esse ambiente para finalizar a transação**|
|`Profile`|String|Sim|16|Perfil do lojista: fixo “CheckoutCielo”.|
|`Version`|String|Sim|1|Versão do serviço de criação de pedido (versão: 1).|

**Erro** - Em caso de erro, a mensagem abaixo será retornada.

```json
{
    "message":"An error has occurred."
}
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`Message`|String|Sim|254|Mensagem descritiva do erro|

**Importante** - O Checkout Cielo não possui erros numerados, apenas uma mensagem genérica. Veja a sessão "Identificando erros de Integração" para maiores informações

### Funcionalidades Adicionais

Nos items a seguir, será explicado o comportamento de algumas das funcionalidades da integração via API. Essas funcionalidades possuem regras especificas para utilização e não estão disponíveis na integração via Botão.

* **Tipos de "Desconto"**
* **Tipos de "Frete"**

#### Tipos de "Desconto"

O Checkout Cielo permite que o lojista aplique descontos específicos tanto para o carrinho quanto para meios de pagamento.
Os descontos disponíveis no Checkout Cielo são:

|Desconto|Aplicação|Descrição|
|---|---|---|
|`Carrinho`|API|Quando enviado, aplica o desconto sobre todo o carrinho, independente do meio de pagamento|
|`Boleto`|API e Backoffice|Quando enviado, o desconto é aplicado somente caso o Boleto seja o meio de pagamento escolhido|
|`Débito Online`|API e Backoffice|Quando enviado, o desconto é aplicado somente caso o Débito online seja o meio de pagamento escolhido|
|`A vista`|API|Quando enviado, o desconto é aplicado quando Cartão de crédito a vista é o meio de pagamento escolhido|

> **OBS:** Descontos podem ser enviados na API ou definidos no Backoffice. Caso um Valor de desconto seja enviado na API, esse será o valor considerado, mesmo que o Backoffice possua outro valor registrado

**Carrinho**

Para enviar um Desconto sobre o `Carrinho` basta enviar o nó abaixo dentro do nó `Cart`

```json
      {
       "Discount": {  
         "Type":"Percent",
         "Value":00
       },
      }
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|Condicional|
|---|---|---|---|---|---|
|`Cart.Discount.Type`|Alphanumeric|Condicional|255|Tipo do desconto a ser aplicado: `Amount` ou `Percent`.|Obrigatório caso Cart.Discount.Value for maior ou igual a zero.|
|`Cart.Discount.Value`|Numeric|Condicional|18|Valor do desconto a ser aplicado: Valor ou Percentual|Obrigatório caso Cart.Discount.Type for `Amount` ou `Percent`.|

Abaixo, como o efeito do desconto são apresentados no Carrinho:

|Percentual|Valor|
|---|---|
|![Percentual]({{ site.baseurl_root }}/images/checkout/checkout-discount-percent.png)|![Valor]({{ site.baseurl_root }}/images/checkout/checkout-discount-amount.png)|

**Boleto & Débito Online**

Para enviar um Desconto sobre o `Boleto` e `Débito online` basta enviar dentro do nó Payment os campos abaixo:

```json
      {
      "Payment": {  
        "BoletoDiscount":15,
        "DebitDiscount":10,
        "FirstInstallmentDiscount":90
        },
      }
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`Payment.BoletoDiscount`|Numeric|Condicional|3|Desconto, em porcentagem, para pagamentos a serem realizados com boleto.|
|`Payment.DebitDiscount`|Numeric|Condicional|3|Desconto, em porcentagem, para pagamentos a serem realizados com débito online.|
|`Payment.FirstInstallmentDiscount`|Numeric|Condicional|3|Desconto, em porcentagem, para pagamentos a vista no Cartão de crédito|

Abaixo, como o efeito do desconto são apresentados no Carrinho:

|Tela transacional|
|---|
|![Meios de pagamento]({{ site.baseurl_root }}/images/checkout/checkout-discount-mp.png)|

#### Tipos de "Frete"

O Checkout cielo possui diferentes tipos de frete.

|Campo|Descrição|
|---|---|
|`FixedAmount`|Valor fixo enviado pelo lojista. Utilizado caso o Lojista possua um método de entrega próprio|
|`Free`|Não realiza calculo de frete e exibe na tela transacional "Frete Grátis"|
|`WithoutShippingPickUp`|Considerado "Retirada na loja"|
|`WithoutShipping`|Sem cobrança de frete (aplicável para serviços e produtos digitais).|
|`Correios`|Utiliza a API dos correios para realizar o calculo do custo. O valor do calculo dependerá o contrato utilizado (Escolhido no Backoffice do checkout) e do tipo de integração para calculo: **Frete com Volume** ou **Frete sem Volume**|

 Abaixo, como cada opção é demonstrada na tela transacional

|Tipo de frete|Transacional|
|---|---|
|`FixedAmount`|![FixedAmount]({{ site.baseurl_root }}/images/checkout/fixedamount.png)|
|`Free`|![Free]({{ site.baseurl_root }}/images/checkout/free.png)|
|`WithoutShippingPickUp`|![WithoutShippingPickUp]({{ site.baseurl_root }}/images/checkout/withoutshippingpickup.png)|
|`WithoutShipping`|![WithoutShipping]({{ site.baseurl_root }}/images/checkout/withoutshippingpickup.png)|
|`Correios`|![Correios]({{ site.baseurl_root }}/images/checkout/correios.png)|

 **OBS:** As opções para múltiplos fretes na categoria `Correios` devem ser selecionadas dentro do Backoffice Cielo.        

Os nós que formam as informações de frete abaixo:

* **Shipping** - Nó base. É obrigatório na integração via API. Ele define os tipos de frete a serem utilizados

|Campo|Tipo|Obrigatório|Tamanho|Descrição|Condicional|
|---|---|---|---|---|---|
|`Shipping.Type`|Alphanumeric|Sim|255|Tipo do frete: <br>`Correios`<br>`FixedAmount`<br>`Free`<br>`WithoutShippingPickUp`<br>`WithoutShipping`||
|`Shipping.SourceZipCode`|Numeric|Condicional|8|CEP de origem do carrinho de compras.|Obrigatório caso Shipping.Type for "Correios".|
|`Shipping.TargetZipCode`|Numeric|Opcional|8|CEP do endereço de entrega do comprador.||

**Shipping.Address** - Informações de endereço de entrega. **Não obrigatório no contrato da API, mas obrigatório na tela transacional**. Sugerimos que esses dados sejam enviados, se ja foram recolhidos dentro do ambiente da loja.

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`Shipping.Address.Street`|Alphanumeric|Sim|256|Rua, avenida, travessa, etc, do endereço de entrega do comprador.|
|`Shipping.Address.Number`|Alphanumeric|Sim|8|Número do endereço de entrega do comprador.|
|`Shipping.Address.Complement`|Alphanumeric|Opcional|14|Complemento do endereço de entrega do comprador.|
|`Shipping.Address.District`|Alphanumeric|Sim|64|Bairro do endereço de entrega do comprador.|
|`Shipping.Address.City`|Alphanumeric|Sim|64|Cidade do endereço de entrega do comprador.|
|`Shipping.Address.State`|Alphanumeric|Sim|2|Estado (UF) do endereço de entrega do comprador.|

**Shipping.Services**

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
`Shipping.Services.Name`|Alphanumeric|Sim|128|Nome do serviço de frete.|
`Shipping.Services.Price`|Numeric|Sim|18|Preço do serviço de frete em centavos. Ex: R$ 1,00 = 100.|
`Shipping.Services.Deadline`|Numeric|Condicional|9|Prazo de entrega (em dias).|

O Frete Correios pode ser calculado de 2 maneiras:

* **Frete com Volume** - Utiliza a API dos correios, mas exige que a loja envie as dimensões do pacote a ser enviado com as mercadorias
* **Frete sem Volume** - Utiliza a API dos correios, mas considera apenas o peso do carrinho como base de cálculo para a entrega.

Para utilizar o frete volumétrico, basta enviar o nó `Shipping.Measures`, seguindo as regras de integração via API REST.

**Shipping.Measures**

|Campo|Tipo|Obrigatório|Tamanho|Descrição|Condicional|
|---|---|---|---|---|---|
|`Shipping.Package`|Alphanumeric|Obrigatório|Inteiro|Tipo de pacote: <br>`BOX`- Caixa <br> `ROL` - Cilindro ou ENVELOPE||
|`Shipping.Lenght`|Numeric|Obrigatório|Inteiro|Comprimento do pacote||
|`Shipping.Height`|Numeric|Condicional|Inteiro|Altura do pacote enviado|Obrigatório caso Shipping.Package como BOX|
|`Shipping.Width`|Numeric|Condicional|Inteiro|Largura do pacote.|Obrigatório caso Shipping.Package como BOX ou ENVELOPE|
|`Shipping.Diameter`|Numeric|Condicional|Inteiro|Diâmetro do pacote.|Obrigatório caso Shipping.Package como ROL|

Para realizar o cálculo de frete via Correios é necessário respeitar as medidas definidas pelo contrato utilizado pelo lojista. Para maiores informações sobre as dimensões e pesos permitidos, sugerimos que valide o contrato da loja no link abaixo:

[Limites e dimensões para entregas do correio](http://www.correios.com.br/para-voce/precisa-de-ajuda/limites-de-dimensoes-e-de-peso)

### Identificando Erros de integração

Devido a estrutura do checkout Cielo, onde o comprador é redirecionado para um ambiente separado para completa a transação, existem possibilidades de erros e falhas de integração em diferentes momentos do fluxo de pagamento.
Durante a integração é importante
Há dois tipos de erro que poderão ocorrer durante o processo de integração com o Checkout Cielo. São eles:

|Tipo de frete|Transacional|
|---|---|
|**Pré-Tela transacional**|Significa que houve algum dado errado no envio da transação. Dados obrigatórios podem estar faltando ou no formato invalido. Aqui o lojista sempre vai receber um e-mail informando o que deu errado|
|**Pós-Tela transacional**|Significa que há algum impedimento de cadastro que limita a venda. Coisas como afiliação bloqueada, erro nos dados salvos no cadastro ou até problemas no próprio checkout|

Caso algum erro ocorra após a finalização da transação, entre em contato com o Suporte Cielo.

## Integração por BOTÃO

**Integração via Botão, QR CODE ou LINK** é um método de compra usada sempre que não houver um “carrinho de compras” em sua loja.
Esse tipo de integração é realizado via o cadastro de um conjunto de itens a ser vendido on backoffice do Checkout Cielo.

O botão gera um do 3 tipos diferentes de métodos de acesso a **mesma tela transacional**:

|Método|Nome|Descrição|
|---|:--:|---|
|![Botão]({{ site.baseurl_root }}/images/checkout/botao.png)|**Botão**|É um código HTML que ao ser colado em um site, vai direcionar o comprador a tela transacional - Ideal para uso em **hotSites** ou **E-mail Marketing**|
|![QRCODE]({{ site.baseurl_root }}/images/checkout/qrcode.png)|**QRCODE**|Código interpretável por Smartphones e Tablets - Ideal para uso em **Marketing impressos** ou **Digital**|
|`http://bit.ly/2tRkSxZ`|**LINK**|é um link compartilhável, ideal para uso em **Redes Sociais** ou **Messengers Mobile**|

Este modelo de integração é utilizado para:

* Associar uma compra rápida direta a um produto como uma promoção numa homepage pulando a etapa do carrinho.
* Enviar um e-mail marketing, ou uma cobrança via e-mail.
* Adicionar o botão (HTML) referente ao produto/serviço a ser comprado/pago.
* Realizar envio de pagamentos por aplicativos mobile
* Sempre que se deseja disponibilizar uma venda rápida.

Para utilizar este recurso, é necessário cadastrar o produto que se deseja vender, suas informações, e depois simplesmente copiar o código fonte gerado para este botão. A inclusão dos produtos é feita dentro do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}), no menu de Produtos/Cadastrar Produto.

### Características do Botão

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter à compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}), e valerão os dados do cadastro.

|Característica|Explicação|
|---|---|
|**Específico**|Cada botão gerado serve somente para um determinado produto ou grupo de produtos. A quantidade e volume de produtos vendido é definido no cadastro do Botão, não sendo possível altera a quantidade na tela transacional <br>**Exemplo:** Será necessário criar Um botão para vender 1 camisa. Se o comprador desejar 2 camisas, ele precisará usar o botão 2X ou O lojista deverá criar um botão com 2 camisas|
|**Número do Pedido do Checkout**|O botão não permite o cadastro do número de pedido do Lojista. Como será a Cielo a acionar o próprio Checkout, será gerado um número de pedido (um `GUID`) único. O Lojista receberá esse número de pedido como link a venda realizada|
|**Criação de pedidos**|Um botão gera vários pedidos independentes, ou seja, para limitar a quantidade de pedidos gerados por um botão, QRCODE ou Link criado, é necessario definir uma quantidade minimas de itens em "estoque" no momento de cadastro. O Botão é um método de chamadas à API Checkout. Cada vez que ele é acionado, uma nova requisição é feita a API, criando assim um novo pedido|

 **Abaixo, o fluxo de pagamento via Botão:**

![Fluxo de integração Checkout Cielo Botão]({{ site.baseurl_root }}/images/checkout/intbt.png)

### Criando o Botão

Para utilizar este recurso, é necessário cadastrar o produto que se deseja vender, suas informações, e depois simplesmente copiar o código fonte gerado para este botão. A inclusão dos produtos é feita dentro do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}), no menu de Produtos/Cadastrar Produto.

**Tela de Cadastro:**

![Cadastro de Botão]({{ site.baseurl_root }}/images/checkout/btcadastro.png)

**Botão Cadastrado:**

![Cadastro de Botão]({{ site.baseurl_root }}/images/checkout/btcadastro2.png)

Abaixo a listagem de itens que devem ser cadastrados para a criação do botão:

| Campos            | Descrição                                                                                                                                      | Tamanho Min. | Tamanho Máx. | Obrigatório |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------|-------------|
| `Tipo do Produto` | Indique se está vendendo um bem Material, um Serviço ou um bem Digital. Para bens Digitais, não será apresentada a opção de tipo de Frete.     | n/a          | n/a          | Sim         |
| `SKU`             | Código de identificação do produto                                                                                                             | 1            | 50           | Não         |
| `Título`          | Titulo do Produto                                                                                                                              | 1            | 50           | Sim         |
| `Descrição`       | Descrição do Produto                                                                                                                           | 1            | 255          | Sim         |
| `Preço`           | Valor total do pedido **em centavos** (ex.: R$1,00 =100).                                                                                      | 11           | 14           | Sim         |
| `Frete`           | Escolher dentre uma das opções de Frete (Correios, Frete Fixo, Frete Grátis, Retirar na loja, Sem Cobrança).                                   | n/a          | n/a          | Sim         |
| `CEP de Origem`   | Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o CEP de onde vai partir a mercadoria para fins de cálculo de frete. | 9            | 9            | Sim         |
| `Peso(kg)`        | Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o peso do produto em kg para fins de cálculo de frete                | n/a          | n/a          | Sim         |
| `Valor do Frete`  | Esse campo só aparece para o frete tipo Frete Fixo, e deve ser preenchido com o valor que o lojista especificar para seus produtos.            | n/a          | n/a          | Sim         |
| `Método de envio` | Esse campo só aparece para Tipo Produto igual a Material Físico e Tipo de Frete igual a Frete Fixo.                                            | n/a          | n/a          | Sim         |
| `URL`             | Esse campo só aparece para Tipo Produto igual a Digital.                                                                                       | n/a          | n/a          | Sim         |
| `Quantidade`      | Define a quantidade maxima de pedidos que o Botão pode gerar. Se não definido, o botão poderá gerar um numero infinito de pedidos              | n/a          | n/a          | Não         |

<aside class="warning">**imitação de Pedidos Gerados** Durante o processo de cadastro do botão, o item "Quantidade" definirá quantos pedidos poderão ser gerados pelo Botão. Essa "quantidade" diz respeito ao numero de de Itens em estoque/vendas são desejadas pelo lojista. Uma vez esgotadas, o Checkout passará a apresentar uma tela de erro quando o Botão/Link de pagamentos for acionado. **A "quantidade" não está disponivel para vendas Recorrentes.**</aside>

### Exemplo de Botão:

Abaixo é possível ver como o cadastro de um botão gera os 3 métodos de para acesso a tela transacional.

* **Botão** - Será criado um código HTML como o abaixo:

``` xml 
<form method='post' action='https://cieloecommerce.cielo.com.br/transactional/Checkout/BuyNow' target='blank'>
    <input type='hidden' name='id' value=00000000-0000-0000-000000000000/><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br /BackOffice/Content{{ site.baseurl_root }}/images/botao_comprar_3.jpg' />
</form>
```

**Exemplo de um botão Funcional:**

<form method='post' action='https://cieloecommerce.cielo.com.br/transactionalvnext/order/buynow' target='blank'><input type='hidden' name='id' value='937874c6-a4d7-477e-9272-a4cb8b0c5f79' /><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br/backoffice/Content/img/buttons/button-5-1.png'/></form>

* **QR CODE E LINK** - O link e o QRCODE tem o mesmo comportamento do botão, levando a mesma tela transacional.

|QR Code|Link|
|---|---|
|<img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCADIAMgDASIAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAAAAYHBQQDAgj/xABJEAABAgUCAgQKBggGAgEFAAABAgMABAUREgYTFCEVMTZRBxYiQVVhdIOy0iQylKOz0RclQ0VxgZHCI1RlkqTiJlInN0RGYqH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AQW21uuJbbQpa1kJSlIuVE9QAju6CrHoqe+zr/KDT/aGme1tfGItE/PS9Ok3Jucc22G7ZKxJtcgDkOfWRARfoKseip77Ov8oOgqx6Knvs6/yioeO2nfSH3LnyweO2nfSH3LnywEv6CrHoqe+zr/KOFxtbTim3EKQtBKVJULFJHWCIu0hPS9Rk25uTc3GHL4qxIvYkHkefWDEX1B2hqftbvxmAuEeb77Msyp6YdbZaT9ZbiglI83MmPSF/XfZCe93+ImAxfCJUpCcoTDcpOyz6xMpUUtOpUQMVc7A+uPHwV/vT3X98JdMpc7V5hUvIM7zqUFZTkE8rgX5kd4h00r/4dxXjD9D4vDZ/aZ45ZfUva2SevvgHaaqUhJuBubnZZhZGQS66lJI77E+qJjq2QnKnqObnKfKPzcq5hg8w2XEKshINlDkbEEfyjz11VJKr1lmYkHt5pMulBViU88lG3MDvEPmhOyEj7z8RUByuVKQa0SqTcnZZE0inFpTCnUhaVhuxSU3ve/K3XeEXRb7MtqmSemHW2Wk55LcUEpHkKHMmOPUHaGp+1u/GY55CRmKjONykm3uPuXxTkBewJPM8uoGAomun2azRmZelOtz76ZhK1Nyqg6oJxULkJubXIF/WI49AfqTj+l/1fvbe3xf+FnbK9srXtcdXeI9NC6dqtIrL0xPyuy0qXUgK3Eq55JNuRPcY7Nf0So1ngOj5fe2tzPy0ptfG3WR3GAapWblpxsuSkw0+gHEqaWFAHuuP4x7Qj6YnpfSNOckK85wk046XkoxLl0EAA3RcdaT/AEhwkJ6XqMm3Nybm4w5fFWJF7Eg8jz6wYDoiAttrdcS22hS1rISlKRcqJ6gBF+iH6f7Q0z2tr4xAHQVY9FT32df5QdBVj0VPfZ1/lFon56Xp0m5Nzjm2w3bJWJNrkAchz6yIx/HbTvpD7lz5YCX9BVj0VPfZ1/lB0FWPRU99nX+UVDx2076Q+5c+WNiQnpeoybc3JubjDl8VYkXsSDyPPrBgIS42tpxTbiFIWglKkqFikjrBEEd2oO0NT9rd+MwQBp/tDTPa2vjEVDXfZCe93+ImJfp/tDTPa2vjEVDXfZCe93+ImAj8EEEBYNCdkJH3n4iol+oO0NT9rd+MxUNCdkJH3n4iol+oO0NT9rd+MwFwjL1LTXqvQpmRl1NpddxxLhITyUDzsD3R2VCa4KnTM3hnsNLcxvbLEE2v/KFeg666ZrDEh0ds7uXl7+VrJJ6sR3QHzo7Sc/Qaq7NTb0stC2C2A0pRNypJ84HdHD4VP3X73+yKBC/qrTHjHwv0zhuHz/ZZ5ZY+sW+rAR+LBoTshI+8/EVE31PQvF+otynE8Rm0HMsMLXJFrXPdGxQdddDUdiQ6O3trLy9/G91E9WJ74DFqksuc1dOSrZSFvz620lXUCXCBf+sMUhpuc0jON1yoOMOysrfNDCipZyBQLAgDrUPPC/T5rjdZS03hhv1BDmN745OA2v8Azika77IT3u/xEwGf+kej/wCWnv8AYj5o2NP6kk9QcRwbb6NjHLdSBfK9rWJ7jEv0xQvGCouSnE8Pg0XMsM72IFrXHfFI0rpjxc4r6ZxPEYfssMccvWb/AFoDN1jpOfr1VampR6WQhDAbIdUoG4Uo+YHvje01TXqRQpaRmFNqdayyLZJTzUTyuB3xl6n1h4v1FuU4HiM2g5lvYWuSLWxPdGP+k3/SP+T/ANICgRD9P9oaZ7W18Yi0U+a42nS03hhvtIcxvfHIA2v/ADiL6f7Q0z2tr4xAVDXfZCe93+ImI/Fg132Qnvd/iJiPwBFg0J2QkfefiKiPxYNCdkJH3n4ioCX6g7Q1P2t34zBBqDtDU/a3fjMEAaf7Q0z2tr4xFon5GXqMm5KTje4w5bJORF7EEcxz6wIhLbi2nEuNrUhaCFJUk2KSOogx3dO1j0rPfaF/nAVDxJ076P8AvnPmg8SdO+j/AL5z5ol/TtY9Kz32hf5wdO1j0rPfaF/nAWiQkZenSbcpJt7bDd8U5E2uSTzPPrJiL6g7Q1P2t34zB07WPSs99oX+ccLji3XFOOLUtayVKUo3KieskwF6mGG5mXdl3k5NOoKFpva4IsRyhTr1Ep2nKO/VqRL8NPS+O27mpeOSgk8lEg8lEcxDFXHFtUKoONrUhaJZxSVJNikhJsQYmukp+cqeo5STqE2/NyrmebL7hcQqyFEXSeRsQD/KA5/HbUXpD7lv5YcNAVuo1nj+kJje2tvDyEptfK/UB3COXwiU2Qk6Ew5KSUswszKUlTTSUkjFXK4Hqjx8Ff7091/fAZ/hO7Qy/sifjXCfDh4Tu0Mv7In41wyaLpNNmdLST0xT5R51WeS3GUqUfLUOZIgOeX07SpbSrVXZlcZ5qSEyh3cUbOBGQVYm3Xzta0YdBrdR1HWGKTV5jiZGYy3GsEoyxSVDmkAjmkHkY5+PnPHLo7i3+B6Q2OG3Dtbe5jhj1Y25W6rQ4atkJOmacm5ynyjEpNN4YPMNhtabrSDZQ5i4JH84DP1PIy+kac3P0FvhJpx0MqXkXLoIJIsu460j+kK/jtqL0h9y38samhX3qzWXpequuT7CZdS0tzSi6kKySLgKuL2JF/WY9PCVIScl0bwcoxL57uW02EZWwte38TAKdTqk7V5hMxPvbzqUBAViE8rk25Ad5h80lpajVHTkpNzknuPuZ5K3Vi9lqA5A26gI+fB3TZCcoT7k3JSz6xMqSFOtJUQMU8rkeuMHVs/OUzUc3J0+bflJVvDBlhwtoTdCSbJHIXJJ/nAVSXYblpdqXZTi00gIQm97ACwHOInp/tDTPa2vjEWKhuLdoVPccWpa1yzalKUblRKRckxD23FtOJcbWpC0EKSpJsUkdRBgLtPyMvUZNyUnG9xhy2SciL2II5jn1gRj+JOnfR/3znzRL+nax6VnvtC/zg6drHpWe+0L/OAqHiTp30f98580bEhIy9Ok25STb22G74pyJtcknmefWTEX6drHpWe+0L/ODp2selZ77Qv84A1B2hqftbvxmCOFxxbrinHFqWtZKlKUblRPWSYIC/R5vvsyzKnph1tlpP1luKCUjzcyYw/HbTvpD7lz5Yx9W6po1R05NyknObj7mGKdpYvZaSeZFuoGAaOnaP6VkftCPzjolJ+Tnc+Dm2JjC2W04F436r2/gYg8UDwV/vT3X98BQI4XK1SmnFNuVOTQtBKVJU+kFJHWCLx3RK6xo+uzNZnphmRyadmHFoVvIFwVEg81QDtXK1SnaFUG26nJrWuWcSlKX0kqJSbAC8R2CCAII7KZS52rzCpeQZ3nUoKynIJ5XAvzI7xGp4k6i9H/AHzfzQC/Fg0J2QkfefiKiV1OlztImEy8+zsuqQFhOQVyuRfkT3GKpoTshI+8/EVAT2uUWqu12oON0ycWhcy4pKksKIUCo2INozX6TUpZlT0xT5tlpP1luMqSkebmSIrnjTRukeA4z6Vu7OG0v697Wva3XHPrvshPe7/ETAJ/gx7QzHsivjRFIm5+TksOMm2JfO+O64EZW67X/iIm/gx7QzHsivjRGh4VP3X73+yAcOnaP6VkftCPzjsYfZmWUvS7rbzSvqrbUFJPm5ERF6Zp2q1eXVMSErvNJWUFW4lPOwNuZHeIfKDW6dpyjsUmrzHDT0vluNYKXjkoqHNIIPJQPIwDE5WqU04ptypyaFoJSpKn0gpI6wReButUp1xLbdTk1rWQlKUvpJUT1AC8TWoaWrNTqMzPyUnuys06t5le6hOSFElJsTcXBHXBT9LVmmVGWn52T2pWVdQ88vdQrFCSCo2BubAHqgKo++zLMqemHW2Wk/WW4oJSPNzJjzlJ+Tnc+Dm2JjC2W04F436r2/gYT9W6po1R05NyknObj7mGKdpYvZaSeZFuoGMfQFbp1G4/pCY2d3bw8hSr2yv1A94gKhBC/wCO2nfSH3LnyxsSE9L1GTbm5NzcYcvirEi9iQeR59YMB0QRhzGsKFLTDsu9PYutLKFp2VmxBsRyTBAJf6OKx/mZH/ev5Y46toqpUimuz0w/KKaatkG1qKuZA5XSO+K5C/rvshPe7/ETAR+KB4K/3p7r++FfTFC8YKi5KcTw+DRcywzvYgWtcd8UjSumPFzivpnE8Rh+ywxxy9Zv9aAYIVZzX1Kk51+Vcl5wrYcU2opQmxINjbyvVDVCPUPB5xtRmZvpTDfdW5jw98ciTa+XrgJvHZSaa9V6k1Iy6m0uu3xLhITyBPOwPdHnT5XjajLSmeG+6hvK18ciBe384ePFjxO/X/GcZwn7Da288vI+tc2tlfq80B3aO0nP0GquzU29LLQtgtgNKUTcqSfOB3Rtag1JJ6f4fjG317+WO0kG2Nr3uR3iFf8ASb/pH/J/6Qf/AFG/07gPfbmf+21sPX1wC7rGty1eqrU1KIdQhDAbIdABuFKPmJ743tNa1ptIoUtIzDE2p1rLItoSU81E8rqHfHp+jL/V/wDjf94P0Zf6v/xv+8Ap9JM+NXSmLmxxvEY2GWOeVuu17euHSf1JJ6uk3KHT232pqatgt9ISgYkLNyCT1JPmjn/Rl/q//G/7weLHid+v+M4zhP2G1t55eR9a5tbK/V5oDzplNe0HMKqlVU28w6gy6UypKlBRIVc5BItZB8/dGXrXUknqDguDbfRsZ5bqQL5Y2tYnuMGp9YeMFOblOB4fB0OZb2d7Ai1sR3wrwDlo7VkhQaU7KzbMyta3y4C0lJFilI85HdGDqWpM1euzM9LpcS07jiHAArkkDnYnujU0xo/xgpzk3x3D4OlvHZzvYA3vkO+MevUzoasPyG9vbWPl443ukHque+AdqXr6lSdKk5VyXnCthhDailCbEhIBt5Xqj2mNa02sy7tLlmJtD86gy7anEJCQpYxBNlE2ue4xM4pFP8HnBVGWm+lM9h1DmPD2yxINr5eqAW6toqpUimuz0w/KKaatkG1qKuZA5XSO+FuLBrvshPe7/ETEfgN6haTn69JLmpR6WQhDhbIdUoG4APmB74apDUknpGTbodQbfdmpW+a2EhSDkSsWJIPUoeaOjwY9npj2tXwIgr2hemaw/P8ASOzu4+RsZWskDryHdAYcxoqpVmYdqks/KIYnVmYbS4tQUErOQBski9j3mCOzx66E/VPR2/wP0bd38c8PJytibXte1zBAeNL19VZyqycq5LyYQ++htRShVwCoA28r1w9Vams1emuyMwpxLTtsi2QFciDyuD3RD5d9yWmGphlWLrSwtCrXsQbg843PHbUXpD7lv5YChULSchQZ1c1KPTK1rbLZDqkkWJB8wHdHLrXUk5p/guDbYXv55bqSbY42tYjvMZehdRVWr1l6Xn5reaTLqWE7aU88ki/IDvMNlVolOrO10hL721fDy1Jte1+ojuEB56aqT1XoUtPTCW0uu5ZBsEJ5KI5XJ7oTapr6qydVnJVuXkyhh9baSpCrkBRAv5Xqjlr1bqOnKw/SaRMcNIy+O21gleOSQo81Ak81E8zDRT9LUap06Wn52T3ZqaaQ88vdWnJagCo2BsLknqgJbJzK5OdYmmwkrYcS4kK6iQbi/wDSN6ra1qVXprsjMMSiWnbZFtCgrkQeV1HuhwrGj6FLUaemGZHF1qXcWhW8s2ISSDzVCHpKRl6jqOUlJxvcYczyTkReyFEcxz6wID20dRJavVV2Vm1uoQhguAtEA3Ckjzg98MVV/wDj/a6I/wAfjr7nF+VbC1rY4/8Aueu/mjo1PIy+kac3P0FvhJpx0MqXkXLoIJIsu460j+kI9VrdRrO10hMb21fDyEpte1+oDuEAwfpHrH+Wkf8AYv5oP0j1j/LSP+xfzR2aF07SqvRnpifld51MwpAVuKTyxSbciO8wt6tkZenajm5STb22G8MU5E2uhJPM8+smAqnST3ir0pi3v8FxGNjjlhlbrva/rib1bWtSq9NdkZhiUS07bItoUFciDyuo90UijsNzOlZGXeTk07JNoWm9rgoAI5Rx+JOnfR/3znzQE90dRJavVV2Vm1uoQhguAtEA3Ckjzg98dWtdNyen+C4Nx9e/nluqBtjja1gO8wwankZfSNObn6C3wk046GVLyLl0EEkWXcdaR/SEeq1uo1na6QmN7avh5CU2va/UB3CA7qFqyfoMkuVlGZZaFuFwl1KibkAeYjujNq1Seq9SdnphLaXXbZBsEJ5ADlcnujjikaS0tRqjpyUm5yT3H3M8lbqxey1AcgbdQEBN4/QEL/iTp30f98580T/x21F6Q+5b+WAqlWprNXprsjMKcS07bItkBXIg8rg90TPWum5PT/BcG4+vfzy3VA2xxtawHeY0NJaprNR1HKSk5ObjDmeSdpAvZCiOYF+sCOjwqfuv3v8AZALtC1ZP0GSXKyjMstC3C4S6lRNyAPMR3RpfpHrH+Wkf9i/mhPikaS0tRqjpyUm5yT3H3M8lbqxey1AcgbdQEBPZyZXOTr804Ehb7inFBPUCTc2/rBHtWGG5asz0uynFpqYcQhN72AUQBzggCj7PTMjxO3scQ3ublscche9+VrRWGGNKzLyWZdqjPOq+qhtLSlHz8gInfiTqL0f98380aFBolR05WGKtV5fhpGXy3Hc0rxySUjkkknmoDkICjStNkJNwuSklLMLIxKmmkpJHdcD1R1Qv+O2nfSH3LnyweO2nfSH3LnywCXrSk1KZ1TOvS9Pm3mlYYrbZUpJ8hI5ECOFtvVrTaW20VtCEAJSlIdASB1ACKF47ad9IfcufLB47ad9IfcufLAS/pasTX0fpCee3fI295as78rWvzv1Wg4CsUz6Zwk9Kbf7bbW3jfl9bzXvb+cblH0fXZasyMw9I4tNTDa1q3kGwCgSeSodNd9kJ73f4iYBT0K+9Way9L1V1yfYTLqWluaUXUhWSRcBVxexIv6zD50FR/RUj9nR+UTPQtUkqRWXpife2WlS6kBWJVzySbcge4xTKVW6dWd3o+Y3tq2fkKTa97dYHcYBD10+9RqyzL0p1yQYVLpWpuVUWklWShchNhewAv6hGxpp+gzNClnqy7TXp5WW6ubU2p0+UQMirn1WtfzWjn11p2q1esszEhK7zSZdKCrcSnnko25kd4hb8SdRej/vm/mgKJUKtTehpmXptQlN/h1ol25d5OWWJCQgA3vewAEJ+mn69LV2WerLtSZkU5bq5tTiWh5JAyKuXXa1/PaOOn6WrNMqMtPzsntSsq6h55e6hWKEkFRsDc2APVDBq3VNGqOnJuUk5zcfcwxTtLF7LSTzIt1AwDRv0es/R92Rn8fL28kO2817c++1/XB0FR/RUj9nR+UTPQtUkqRWXpife2WlS6kBWJVzySbcge4w+eO2nfSH3LnywCnrqhPdMs9FUpzY4dOXCy5xyyV14i17W/wD5GOwxqqWZSzLtVllpP1UNpdSkefkBFE8dtO+kPuXPlg8dtO+kPuXPlgNSj73Q0jxO5v8ADt7m5fLLEXvfne8RmhtodrtPbcQlaFzLaVJULhQKhcERUvHbTvpD7lz5YR6fpas0yoy0/Oye1KyrqHnl7qFYoSQVGwNzYA9UA6alpLMtQpl6jU9tmeTjtLlGQl0eUAcSkX6r3t5rxM6r0x/hdL8d59vi8/Ve2X8ur1RUPHbTvpD7lz5YT9f1unVngOj5je2tzPyFJtfG3WB3GA1vB3TZCcoT7k3JSz6xMqSFOtJUQMU8rkeuHZhhmWZSzLtNstJ+qhtISkefkBCn4Mez0x7Wr4EQ4QEdrlFqrtdqDjdMnFoXMuKSpLCiFAqNiDaCKNMawoUtMOy709i60soWnZWbEGxHJMEBrTkyiTkn5pwKKGG1OKCesgC5t/SE2f1JJ6uk3KHT232pqatgt9ISgYkLNyCT1JPmjn8eum/1T0dscd9G3d/LDPycrYi9r3tcRoUHQvQ1YYn+kd7ay8jYxvdJHXke+ATa7pOfoMkiam3pZaFuBsBpSibkE+cDujBioeE7s9L+1p+BcJ+ldMeMfFfTOG4fD9lnlll6xb6sB6UnRVSq9Nanpd+US07fEOLUFciRzsk90dn6OKx/mZH/AHr+WKBQaZ0NR2JDe3trLy8cb3UT1XPfCvUPCHwVRmZTovPYdW3lxFssSRe2PqgHiF/XfZCe93+ImMen+EPjajLSnReG+6hvLiL45EC9sfXGxrvshPe7/ETAR+KB4K/3p7r++FfTFC8YKi5KcTw+DRcywzvYgWtcd8UjSumPFzivpnE8Rh+ywxxy9Zv9aAYIW6trWm0ipOyMwxNqdatkW0JKeYB5XUO+GSI/rvtfPe7/AA0wFKqkyic0jOTTYUEPyC3EhXWAWyRf+sRWHDx6/wDHuiejv/tOG3d//wDTHK2P87XhPgNKhUSZr06uVlFtIWhsuEukgWBA8wPfHtqDTc5p/h+McYXv5Y7SibY2ve4HeI2PBj2hmPZFfGiNDwqfuv3v9kBP4ZKToqpVemtT0u/KJadviHFqCuRI52Se6PTTGj/GCnOTfHcPg6W8dnO9gDe+Q74pFBpnQ1HYkN7e2svLxxvdRPVc98BFZyWXJzr8q4UlbDim1FPUSDY2/pFq1B2eqfsjvwGFeoeDzjajMzfSmG+6tzHh745Em18vXHP49dN/qno7Y476Nu7+WGfk5WxF7Xva4gEuk016r1JqRl1NpddviXCQnkCedge6OzUGm5zT/D8Y4wvfyx2lE2xte9wO8Q8UHQvQ1YYn+kd7ay8jYxvdJHXke+NDVWmPGPhfpnDcPn+yzyyx9Yt9WAz/AAY9npj2tXwIhwif9J/o/wD1Ts9Ib30ndy2rX8nG1lf+l7388OFBqfTNHYn9nZ3cvIyytZRHXYd0Ak1TQNVnKrOTTcxJhD763EhS1XAKiRfyfXBFGggFWT0DSpOdYmm5icK2HEuJClpsSDcX8n1RralqT1IoUzPS6W1OtY4hwEp5qA52I746Kw+5LUaemGVYutS7i0KtexCSQecSOf1TWajJuSk5ObjDlsk7SBexBHMC/WBAMlMqT2vJhVLqqW2WGkGYSqVBSoqBCbHIqFrLPm7obNP6bk9P8Rwbj69/HLdUDbG9rWA7zEjplUnaRMKmJB7ZdUgoKsQrlcG3MHuEanjtqL0h9y38sAyal1rUqRXZmRl2JRTTWOJcQoq5pB52UO+OiX0VTazLtVSZfm0PzqBMOJbWkJCljIgXSTa57zE7n56YqM45Nzjm4+5bJWIF7AAchy6gI1JfWFdlpdqXZnsWmkBCE7KDYAWA5pgHCY0VTaNLu1SWfm1vySDMNpcWkpKkDIA2SDa47xCvVta1Kr012RmGJRLTtsi2hQVyIPK6j3R6U/VNZqdRlpCdnN2VmnUMvI2kJyQogKFwLi4J6oYNW6Wo1O05NzcnJ7b7eGKt1ZtdaQeRNuomASaFW5mgzq5qUQ0ta2y2Q6CRYkHzEd0UbRWpJzUHG8Y2wjYwx2kkXyyve5PcIS9C0uSq9Zel59neaTLqWE5FPPJIvyI7zFMpVEp1G3ej5fZ3bZ+WpV7Xt1k95gF3WOrJ+g1VqVlGZZaFsBwl1KiblSh5iO6PGQ03J6uk265UHH2pqavmhhQSgYkoFgQT1JHnjH8J3aGX9kT8a4cNCdkJH3n4ioCU1SWRJ1WclWyooYfW2kq6yAogX/pHVpqms1euy0jMKcS07lkWyArkknlcHujomGG5nXTsu8nJp2plC03tcF2xHKHSvUSnaco79WpEvw09L47bual45KCTyUSDyURzEBpULSchQZ1c1KPTK1rbLZDqkkWJB8wHdHtqDTcnqDh+McfRsZY7SgL5Wve4PcIW9C6iqtXrL0vPzW80mXUsJ20p55JF+QHeYfICd1OpPaDmE0ulJbeYdQJhSpoFSgokpsMSkWsgebvjj/SPWP8ALSP+xfzQ+VPTtKq8wmYn5XedSgICtxSeVybciO8xK9WyMvTtRzcpJt7bDeGKcibXQknmefWTAbH6R6x/lpH/AGL+aFWTmVyc6xNNhJWw4lxIV1Eg3F/6R4wQFE01rWpVeuy0jMMSiWncsi2hQVySTyuo90amtdSTmn+C4Nthe/nlupJtjja1iO8xL5CemKdONzcm5tvt3xViDa4IPI8uomHjSv8A5jxXjD9M4TDZ/Z4ZZZfUte+KevugFGu1uZr06iam0NIWhsNgNAgWBJ85PfGlSda1KkU1qRl2JRTTV8S4hRVzJPOyh3wa6pclSKyzLyDOy0qXSspyKueShfmT3CFuAu1LmVzlKk5pwJC32EOKCeoEpBNv6wRJZfWFdlpdqXZnsWmkBCE7KDYAWA5pggLE42h1tTbiErQsFKkqFwoHrBEcPQVH9FSP2dH5REW21uuJbbQpa1kJSlIuVE9QAju6CrHoqe+zr/KAsHQVH9FSP2dH5QdBUf0VI/Z0flEf6CrHoqe+zr/KDoKseip77Ov8oCwdBUf0VI/Z0flB0FR/RUj9nR+UR/oKseip77Ov8o4XG1tOKbcQpC0EpUlQsUkdYIgLFWKTTZWjT0xLU+UZfal3FtuNspSpCgkkEEC4IPO8Sd+rVKZZUzMVCbeaV9ZDjylJPn5gmLNXG1u0KoNtoUta5ZxKUpFyolJsAImukpCcpmo5ScqEo/KSreebz7ZbQm6FAXUeQuSB/OAXZWbmZNwuSkw6wsjEqaWUkjuuP4RQvBrPzk70lxk2/MYbWO64V43zva/8BHz4RKlITlCYblJ2WfWJlKilp1KiBirnYH1xOYC7TVNkJxwOTclLPrAxCnWkqIHdcj1xMdWz85TNRzcnT5t+UlW8MGWHC2hN0JJskchckn+cb3g7qUhJ0J9ubnZZhZmVKCXXUpJGKedifVCrrR9mZ1TOvS7rbzSsMVtqCknyEjkRAPnASfib0jwjHHdH7/E7Y3dzbyzy68r879d4T9JT85U9RyknUJt+blXM82X3C4hVkKIuk8jYgH+UK8EBTNdMM0ajMzFKabkH1TCUKclUhpRTio2JTY2uAbeoR5+DWfnJ3pLjJt+Yw2sd1wrxvne1/wCAjH8GPaGY9kV8aIqEARH9d9r573f4aY2vCJTZ+crrDkpJTL6BLJSVNNKUAclcrgeuEl9h6WeUzMNOMup+shxJSoefmDAV6h0WlO0KnuOUyTWtcs2pSlMJJUSkXJNo7ugqP6Kkfs6Pyg0/2epnsjXwCJbQ6LVWq7T3HKZOIQiZbUpSmFAJAULkm0A7a0pNNltLTr0vT5Rl1OGK22UpUPLSORAiZyk/OSWfBzb8vnbLacKMrdV7fxMVjXfZCe93+ImF/wAFf7091/fAdmhWGazRnpiqtNz76ZhSEuTSQ6oJxSbAqubXJNvWYZOgqP6Kkfs6PyhJ8IlNn5yusOSklMvoEslJU00pQByVyuB64Vegqx6Knvs6/wAoD5rjaGq7UG20JQhEy4lKUiwSAo2AEEVaj1amytGkZeZqEoy+1LtocbceSlSFBIBBBNwQeVoICV6f7Q0z2tr4xFon56Xp0m5Nzjm2w3bJWJNrkAchz6yIi+n+0NM9ra+MRUNd9kJ73f4iYA8dtO+kPuXPlg8dtO+kPuXPliPwQF4kJ6XqMm3Nybm4w5fFWJF7Eg8jz6wYi+oO0NT9rd+MxUNCdkJH3n4iol+oO0NT9rd+MwFwhf132Qnvd/iJjYqE1wVOmZvDPYaW5je2WIJtf+UI/jP44/qDg+D4v9vu7mGPl/VsL3xt1+eAn8EUD9GX+r/8b/vC/qrTHi5wv0zieIz/AGWGOOPrN/rQHHTNO1Wry6piQld5pKygq3Ep52BtzI7xHZ4k6i9H/fN/NDh4Mez0x7Wr4EQV7XXQ1YfkOjt7ax8vfxvdIPVie+Am/AzHSPAbf0rd2cMh9e9rX6uuNCf0tWadJuTc5J7bDdslbqDa5AHIG/WRDR4sf/lfGf6lwu17zDO/8r29doPGfxx/UHB8Hxf7fd3MMfL+rYXvjbr88Bn+DHtDMeyK+NEUCq1unUba6QmNndvh5ClXta/UD3iMfTGj/F+ouTfHcRm0W8dnC1yDe+R7ox/Cp+6/e/2QDpTKpJVeXVMSD280lZQVYlPOwNuYHeIleu+1897v8NMOHgx7PTHtavgRBXtC9M1h+f6R2d3HyNjK1kgdeQ7oD0o+sKFLUaRl3p7F1qXbQtOys2ISARyTHZ47ad9IfcufLEnqErwVRmZTPPYdW3la2WJIvb+UPH6Mv9X/AON/3gOjVuqaNUdOTcpJzm4+5hinaWL2WknmRbqBjH0BW6dRuP6QmNnd28PIUq9sr9QPeIK9oXoajvz/AEjvbWPkbGN7qA68j3wnwFg8dtO+kPuXPljYkJ6XqMm3Nybm4w5fFWJF7Eg8jz6wYg8OFB110NR2JDo7e2svL38b3UT1YnvgF/UHaGp+1u/GYIcPEXpv9bdI7HHfSdrYywz8rG+Qva9r2EEAn6f7Q0z2tr4xFQ132Qnvd/iJiX6f7Q0z2tr4xFon5GXqMm5KTje4w5bJORF7EEcxz6wICDwRYPEnTvo/75z5oPEnTvo/75z5oA0J2QkfefiKiX6g7Q1P2t34zFokJGXp0m3KSbe2w3fFORNrkk8zz6yYi+oO0NT9rd+MwFg1B2eqfsjvwGJfoTtfI+8/DVFcmGG5mXdl3k5NOoKFpva4IsRyjLkNLUanTjc3Jye2+3fFW6s2uCDyJt1EwHjrGtzNBpTU1KIaWtb4bIdBIsUqPmI7oXaV/wDIG70v/gcDbb4Tyb53vfLL/wBB1W88OlTpclV5dMvPs7zSVhYTkU87EX5Ed5jzpVEp1G3ej5fZ3bZ+WpV7Xt1k95gEup1J7Qcwml0pLbzDqBMKVNAqUFElNhiUi1kDzd8J9WqT1XqTs9MJbS67bINghPIAcrk90MnhO7Qy/sifjXGxpLS1GqOnJSbnJPcfczyVurF7LUByBt1AQGLS9WT843J0FxmWEq+ESalpSrMINkEg3tex7rX80N1J0VTaRUmp6Xfm1OtXxDi0lPMEc7JHfHnUNLUamU6Zn5KT2pqVaW8yvdWrFaQSk2JsbEDrhf0lqms1HUcpKTk5uMOZ5J2kC9kKI5gX6wIBq1jW5mg0pqalENLWt8NkOgkWKVHzEd0LtK/+QN3pf/A4G23wnk3zve+WX/oOq3nh0qdLkqvLpl59neaSsLCcinnYi/IjvMedKolOo270fL7O7bPy1Kva9usnvMAl1OpPaDmE0ulJbeYdQJhSpoFSgokpsMSkWsgebvhw01UnqvQpaemEtpddyyDYITyURyuT3Qh+E7tDL+yJ+NcOGhOyEj7z8RUByzmgaVOTr805MTgW+4pxQStNgSbm3k+uGqJXWNYV2WrM9Lsz2LTUw4hCdlBsAogDmmCj6wrszWZGXensmnZhtC07KBcFQBHJMBSKtTWavTXZGYU4lp22RbICuRB5XB7ometdNyen+C4Nx9e/nluqBtjja1gO8xQNWz0xTtOTc3Jubb7eGKsQbXWkHkeXUTEnqtbqNZ2ukJje2r4eQlNr2v1AdwgGLR2k5CvUp2am3plC0PlsBpSQLBKT5we+N79HFH/zM9/vR8sHgx7PTHtavgRGPq3VNZp2o5uUk5zbYbwxTtINroSTzIv1kwHnMa1qVGmHaXLMSi2JJZl21OIUVFKDiCbKAvYdwghkp+lqNU6dLT87J7s1NNIeeXurTktQBUbA2FyT1QQEpbcW04lxtakLQQpKkmxSR1EGO7p2selZ77Qv84IIA6drHpWe+0L/ADg6drHpWe+0L/OCCAOnax6VnvtC/wA44XHFuuKccWpa1kqUpRuVE9ZJgggL9GHrR96W0tOvS7rjLqcMVtqKVDy0jkRBBAKvg7qU/OV19ubnZl9AllKCXXVKAOSedifXFGgggJf4Tu0Mv7In41wtsVapSzKWZeoTbLSfqobeUlI8/IAwQQH05Wqq62ptypzi0LBSpKn1EKB6wReOVh96WeS9LuuMup+qttRSoebkRBBAdnTtY9Kz32hf5wdO1j0rPfaF/nBBAcs1NzM44HJuYdfWBiFOrKiB3XP8Y9mKtUpZlLMvUJtlpP1UNvKSkefkAYIICsUek02ao0jMTNPlHn3ZdtbjjjKVKWopBJJIuSTzvBWKTTZWjT0xLU+UZfal3FtuNspSpCgkkEEC4IPO8EEAh6Sn5yp6jlJOoTb83KuZ5svuFxCrIURdJ5GxAP8AKNDwlSEnJdG8HKMS+e7ltNhGVsLXt/EwQQCjK1Kfk2y3KTsywgnIpadUkE99gfVHi++9MvKemHXHnVfWW4oqUfNzJgggLZp/s9TPZGvgEEEEB//Z'>|`http://bit.ly/2tRkSxZ`|

Adicionando o botão na sua página, você deve copiar o código HTML do botão criado e inclui-lo no HTML de seu site, conforme o exemplo abaixo.

<aside class="notice">O código deve ser inserido dentro da área adequada no seu HTML.</aside>

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter a compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}), e valerão os dados do cadastro.

## Fluxos Meios de pagamento

### Cartão de Crédito

O Checkout Cielo permite a utilização de Cartões de Crédito das principais bandeiras nacionais e internacionais. Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo, podendo ser utilizado inicialmente com a integração Checkout.

Transações de cartão de crédito serão incluídas no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como PENDENTE, AUTORIZADO, PAGO, NEGADO, EXPIRADO OU CHARGEBACK dependendo do resultado da autorização junto ao Banco.

**Cartão de Crédito** Ordem de Status:

|Ordem|Status|Explicação|
|---|---|---|
|1|**PENDENTE**|Status original. A transação está ocorrendo, esperando resposta do processo de autorização|
|2|**AUTORIZADO / NEGADO**|Resultado do processo de autorização. <br>**AUTORIZADO** - Crédito foi reservado para a compra <br> **NEGADO** - Cartão não autorizado pelo emissor a continuar a transação|
|3|**PAGO**|Ocorre pós captura. Indica que o crédito reservado no cartão será depositado na conta do lojista|
|N/A|**EXPIRADO**|Ocorre caso a transação não seja capturada em 15 dias pós autorização. Nessa situação a transação é perdida.|
|N/A|**CHARGEBACK**|Status não automatico. Caso o lojista seja notificado de ChargeBack, ele pode marcar esta transação como perdida.<br> Este Status é apenas uma marcação, não afetando processos de pagamento|

**Atenção - Cartões Internacionais:** O Checkout Cielo aceita cartões emitidos fora do Brasil, entretanto esses cartões não possuem a capacidade de pagar vendas parceladas. Essa é uma limitação imposta pelo banco emissor.

**Atenção - TRANSAÇÕES EXPIRADAS:** Por padrão, lojas Checkout Cielo possuem 15 dias para realizarem a captura da transação de Crédito. Se não capturadas, essas transações serão PERDIDAs.

### Análise de Fraude

Transações de crédito **“AUTORIZADAS”** serão enviadas para análise da ferramenta de antifraude caso o parametro `Options.AntifraudEnabled` esteja definido como `TRUE`.
O Antifraude possui o conceito de `Status` e `SubStatus`, onde o primeiro representa o nivel de risco que uma transação possui de ser uma fraude, e o segundo, uma informação adicional sobre a transação.
A análise indicará um grau de **RISCO**, especificado pelo `Status`, para a venda em questão.
Esse grau de risco é o que deve guiar a decisão do lojista de capturar ou cancelar a venda.

 Para que as transações sejam analisadas pelo antifraude, é necessario que a loja Checkout possua:
 * Enviar via contrato `Options.AntifraudEnabled` como `true`
 * Valor da compra deve ser MAIOR que o valor mínimo configurado - Ver em Tutotial Backoffice Checkout
 * Possuir um Plano que inclua a ferramenta de analise.
 * A transação de crédito deve ser AUTORIZADA

|Status Antifraude|Substatus|Descrição|
|---|---|---|
|`Baixo Risco`|Baixo Risco|Baixo risco de ser uma transação fraudulenta|
|`Médio Risco`|Médio Risco|Médio risco de ser uma transação fraudulenta|
|`Alto Risco`|Alto Risco|Alto risco de ser uma transação fraudulenta|
|`Não finalizado`|Não finalizado|Não foi possível finalizar a consulta|
|`N/A`|Autenticado|Transações autenticadas pelo banco - **Não são analisáveis pelo AF**|
|`N/A`|AF Não contratado|Antifraude não habilitado no plano do lojista - **Não são analisáveis pelo AF**|
|`N/A`|AF Dispensado|Antifraude dispensado via contrato ou inferior ao valor mínimo de antifrade parametrizado backoffice no lojista|
|`N/A`|Não aplicável|Meio de pagamento não analisável como cartões de débito, boleto e débito online|
|`N/A`|Transação de recorrência|Transação de crédito seja posterior a transação de agendamento. **Somente o Agendamento é analisado**|
|`N/A`|Transação negada|Venda a crédito foi negada - **Não são analisáveis pelo AF**|

A analise será apresentada no “Detalhes do Pedido”, como abaixo:

![Análise de risco]({{ site.baseurl_root }}/images/checkout-cielo-analise-risco.png)

Você pode visualizar o status do antifraude acessando o detalhe da compra, na aba Pedidos e clicando no (+)

![Status Antifraude]({{ site.baseurl_root }}/images/checkout-status-antifraude.png)

### Cartão de Débito

O Checkout Cielo permite a utilização de Cartões de débito MasterCard e Visa. Esse meio de pagamento é liberado automaticamente junto a afiliação de Cielo, podendo ser utilizado inicialmente com a integração Checkout.

Bancos Suportados:

|Mastercard|Visa|
|---|---|
|Bradesco|Bradesco|
|Banco do Brasil|Banco do Brasil|
|Santander|Santander|
|Itaú|Itaú|
|CitiBank|CitiBank|
|BRB|N/A|
|Caixa|N/A|
|BancooB|N/A|

Ao Acessar a tela transacional, o comprador obterá pelo pagamento via Cartão de débito, e será redirecionado ao ambiente bancário para Autenticação e Autorização.

Transações de cartão de débito serão incluídas no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como PENDENTE, PAGO, NÃO AUTORIZADO ou NÃO FINALIZADO, dependendo do resultado da autorização junto ao Banco.

**Cartão de Débito** - Ordem de Status

1. **Pendente** - Status original. A transação está ocorrendo, esperando resposta do banco para envio do comprador ao ambiente de autenticação
2. **Não Finalizado** - Status intermediário. Neste ponto o Checkout Cielo espera a confirmação do Banco sobre o status da autenticação e transação. Caso o comprador abandone o ambiente do banco, o status não se altera.
3. **Pago** - Comprador finalizou o pagamento com o cartão de débito com sucesso.
4. **Não Autorizado** - O Comprador não apresentava saldo em conta para finalizar a transação.

**OBS**: A opção **Cancelar** dentro do backoffice, vai modificar o status da transação de PAGO/NÃO PAGO para CANCELADO, mas não terá efeito sobre a movimentação bancaria. Caberá ao lojista retornar o valor ao comprador

### Boleto

O Checkout Cielo permite a utilização de Boletos do Bradesco (Carteira 26 e SPS) e Banco do Brasil (Carteira 18).
Esse meio de pagamento precisa ser cadastrado pelo Suporte Cielo para que seja disponibilizado no Backoffice Checkout.

Bancos Suportados:

|Bancos|
|---|
|Bradesco|
|Banco do Brasil|

Ao Acessar a tela transacional, o comprador obterá pelo pagamento via Boleto.

Transações de boleto  serão incluídas no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como NÃO FINALIZADO ou PAGO.
Diferentemente de outros meios de pagamento, o boleto não possui atualização de Status. Caberá ao Lojista acessar o Backoffice e modificar o status do boleto manualmente.

**Boleto** - Ordem de Status

1. **Não Finalizado** - Status inicial. O Boleto é gerado, e ainda é valido. Como o Checkout **não** acessa o ambiente do banco para identificar o pagamento do boleto, esse status continuará efetivo até que o lojista entre no backoffice o atualize.
2. **Pago** - Comprador finalizou o pagamento com o cartão de débito com sucesso.

**OBS**: A opção **Cancelar** dentro do backoffice, vai modificar o status da transação de PAGO/NÃO FINALIZADO para CANCELADO, mas não terá efeito sobre a movimentação bancaria. Caberá ao lojista retornar o valor ao comprador

### Débito Online

O Checkout Cielo permite a utilização de Débito Online (Transferência entre contas bancarias) para compradores que possuam contas nos bancos Bradesco e Banco do Brasil.
Esse meio de pagamento é liberado via cadastro junto ao Suporte Cielo.

Ao acessar a tela transacional, o comprador obterá pelo pagamento via Débito online, e será redirecionado ao ambiente bancário para Autenticação e Autorização.

Transações de Débito online serão incluídos no [Backoffice Cielo Checkout]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) como PENDENTE, PAGO, NÃO AUTORIZADO ou NÃO FINALIZADO, dependendo do resultado da autorização junto ao Banco.

**Débito online** - Ordem de Status

* **Pendente** - Status original. A transação está ocorrendo, esperando resposta do banco  para envio do comprador ao ambiente de autenticação
* **Não Finalizado** - Status intermediário. Neste ponto o Checkout Cielo espera a confirmação do Banco sobre o status da autenticação e transação. Caso o comprador abandone o ambiente do banco, o status não se altera.
* **Pago** - Comprador finalizou o pagamento do débito com sucesso.
* **Não Autorizado** - O Comprador não apresentava saldo em conta para finalizar a transação.

**OBS**: A opção **Cancelar** dentro do backoffice, vai modificar o status da transação de PAGO/NÃO PAGO para CANCELADO, mas não terá efeito sobre a movimentação bancaria. Caberá ao lojista retornar o valor ao comprador

# Notificações de Pagamento

O processo de notificação transacional no Checkout Cielo ocorre via a inclusão de uma URL para onde serão direcionados dados das transações realizadas na plataforma.
Vale destacar que o Checkout realiza a notificação somente quando uma transação é considerada finalizada ou seja, o comprador preencheu todos os dados da tela de pagamento e clicou em "Finalizar".

## Tipos de notificação

O Checkout Cielo possui dois tipos de notificações que o lojista pode utilizar de acordo com suas necessidades:

|Tipo|Descrição|
|---|---|
|`POST`|Notificação onde o lojista é passivo. Dois `POST HTTP` são disparados, um informando dados da venda e outra mudança de Status da transação|
|`JSON`|Notificação onde o lojista realiza uma consulta. Um `POST` contendo informações para a realização de uma consulta (`GET`) as transações checkout|

Para utilizar ambos os modelos, o lojista necessitará acessar o Backoffice cielo e configurar tanto a `URL de NOTIFICAÇÃO` quando a `URL de MUDANÇA de STATUS`.

## Tipos de URL de Notificação

O Checkout possui 3 tipos de URL que podem impactar o processo de notificação.

|Tipo|Descrição|Observação|
|---|---|---|
|`URL de Retorno`|Página web na qual o comprador será redirecionado ao fim da compra. <br>Nenhum dado é trocado ou enviado para essa URL.<br> Essa URL apenas leva o comprador, após finalizar a compra, a uma página definida pela loja.|Caso o Lojista deseje, ele pode configurar essa página para ser sensibilizada por tráfego, assim identificando que a transação foi finalizada no Checkout Cielo <br> Pode ser enviada via API - Ver "Integração por API"|
|`URL de Notificação`|Ao finalizar uma transação é enviado um POST HTTP com todos os dados da venda para a URL de Notificação.<br> O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do **status da transação**|Utilizada na Notificação via `POST`e `JSON`|
|`URL de Mudança de Status`|Quando um pedido tiver seu status alterado, será enviando um post HTTP para a URL de Mudança de Status.<br> O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido|Utilizada somente na Notificação via `POST`|

**OBS:** Caso uma `URL de retorno` seja enviada vai API, ela terá prioridade sobre a URL cadastrada no Backoffice / Na integração Checkout Cielo `via Botão`, só é possível usar a opção de URL de retorno via backoffice.

**Características das URLs**

Todas as 3 URLs devem possuir as seguintes características:

* Devem ser URLs estáticas
* Devem possuir menos de 255 caracteres
* Caracteres especiais não são suportados

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

**IMPORTANTE** Se a `URL de Notificação` cadastrada retornar algum erro/estiver indisponível, serão realizadas **3 novas tentativas, com intervalo de 1 hora entre cada POST*.

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

|Parâmetro|Descrição|Tipo do Campo|
|---|---|---|
|`URL`|URL com os dados necessários para realizar a busca dos dados da transação.|String|
|`MerchantId`|Identificador da loja no Checkout Cielo; consta no Backoffice no menu Configuração/Dados Cadastrais.|Alfanumérico (GUID)|
|`MerchantOrderNumber`|Número do pedido da loja; se não for enviado, o Checkout Cielo gerará um número, que será visualizado pelo Consumidor.|Alfanumérico|

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

|Propriedade|Descrição|Tipo|Tamanho|Obrigatório|
|---|---|---|---|---|
|`MerchantId`|Identificador da loja|Guid|36|Sim|

**RESPONSE**

```json
{
    "order_number": "Pedido01",
    "amount": 101,
    "discount_amount": 0,
    "checkout_cielo_order_number": "65930e7460bd4a849502ed14d7be6c03",
    "created_date": "12/09/2017 14:38:56",
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

**IMPORTANTE** Se a `URL de Notificação` cadastrada retornar algum erro/estiver indisponível, serão realizadas **3 novas tentativas, com intervalo de 1 hora entre cada POST*.

Caso o POST não seja recebido, é possível reenvia-lo manualmente, basta acessar o pedido em questão pelo Backoffice e clicar no Ícone de envio:

![Reenvio de notificação]({{ site.baseurl_root }}/images/checkout/reenvipost.png)

## Conteúdo da Notificação

Tanto na Notificação via POST HTTP ou POST JSON, o conteúdo dos dados retornados é o mesmo.
Abaixo são descritos todos os campos retornados, assim como suas definições e tamanhos:

**Conteúdo do POST de NOTIFICAÇÃO:**

| Parâmetro                            | Descrição                                                                                                    | Tipo do campo | Tamanho máximo |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------|---------------|----------------|
| `checkout_cielo_order_number`        | Identificador único gerado pelo CHECKOUT CIELO                                                               | Alfanumérico  | 32             |
| `amount`                             | Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)                                                   | Numérico      | 10             |
| `order_number`                       | Número do pedido enviado pela loja                                                                           | Alfanumérico  | 32             |
| `created_date`                       | Data da criação do pedido - `dd/MM/yyyy HH:mm:ss`                                                            | Alfanumérico  | 20             |
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
| `shipping_address_line2`             | Complemento do endereço de entrega                                                                           | Alfanumérico  | 14            |
| `shipping_address_number`            | Número do endereço de entrega                                                                                | Numérico      | 8              |
| `payment_method_type`                | Cód. do tipo de meio de pagamento                                                                            | Numérico      | 1              |
| `payment_method_brand`               | Bandeira (somente para transações com meio de pagamento cartão de crédito)                                   | Numérico      | 1              |
| `payment_method_bank`                | Banco emissor (Para transações de Boleto e Débito Automático)                                                | Numérico      | 1              |
| `payment_maskedcredicard`            | Cartão Mascarado (Somente para transações com meio de pagamento cartão de crédito)                           | Alfanumérico  | 20             |
| `payment_installments`               | Número de parcelas                                                                                           | Numérico      | 1              |
| `payment_antifrauderesult`           | Status das transações de cartão de Crédito no Antifraude                                                     | Numérico      | 1              |
| `payment_boletonumber`               | número do boleto gerado                                                                                      | String        | 1              |
| `payment_boletoexpirationdate`       | Data de vencimento para transações realizadas com boleto bancário                                            | Numérico      | 10             |
| `payment_status`                     | Status da transação                                                                                          | Numérico      | 1              |
| `tid`                                | TID Cielo gerado no momento da autorização da transação                                                      | Alfanumérico  | 32             |
| `test_transaction`                   | Indica se a transação foi gerada com o `Modo de teste` ativado                                               | Boolean       | 32             |
| `product_id`                         | Identificador do Botão/Link de pagamento que gerou a transação                                               | Alfanumérico  | 32             |
| `product_type`                       | Tipo de Botão que gerou o pedido (Ver tabela de ProductID)                                                   | Alfanumérico  | 32             |
| `product_sku`                        | Identificador do produto cadastro no link de pagamento                                                       | texto         | 16             |
| `product_max_number_of_installments` | Numero de parcelas liberado pelo lojistas para o link de pagamento                                           | Numérico      | 2              |
| `product_expiration_date`            | Data de validade do botão/Link de pagamento                                                                  | Alfanumérico  | 12             |
| `product_quantity`                   | Numero de transações restantes até que o link deixe de funcionar                                             | Alfanumérico  | 2              |
| `product_description`                | Descrição do link de pagamentos registrada pelo lojista                                                      | texto         | 256            |

**Tipos de productID**

|Tipo de Link de pagamento|Enun|
|-|-|
|Material físico|1|
|Digital|2|
|Serviço|3|
|Pagamento|4|
|Recorrência|5|

**Payment_status**

O Checkout possui um Status próprios, diferente do SITE CIELO ou da API Cielo ecommerce. Veja abaixo a lista completa.

|Valor|Status de transação|Meios de pagamento|Descrição|
|---|---|---|---|
|1|`Pendente`|Para todos os meios de pagamento|Indica que o pagamento ainda está sendo processado; OBS: Boleto - Indica que o boleto não teve o status alterado pelo lojista|
|2|`Pago`|Para todos os meios de pagamento|Transação capturada e o dinheiro será depositado em conta.|
|3|`Negado`|Somente para Cartão Crédito|Transação não autorizada pelo responsável do meio de pagamento|
|4|`Expirado`|Cartões de Crédito e Boleto|Transação deixa de ser válida para captura - **15 dias pós Autorização**|
|5|`Cancelado`|Para cartões de crédito|Transação foi cancelada pelo lojista|
|6|`Não Finalizado`|Todos os meios de pagamento|Pagamento esperando Status - Pode indicar erro ou falha de processamento. Entre em contato com o Suporte cielo|
|7|`Autorizado`|somente para Cartão de Crédito|Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta|
|8|`Chargeback`|somente para Cartão de Crédito|Transação cancelada pelo consumidor junto ao emissor do cartão. O Dinheiro não será depositado em conta.|

**Payment_antifrauderesult**

O Antifraude possui o conceito de `Status` e `SubStatus`, onde o primeiro representa o nível de risco que uma transação possui de ser uma fraude, e o segundo, uma informação adicional sobre a transação.

|Valor|Status Antifraude|Substatus|Descrição|
|---|---|---|---|
|1|`Baixo Risco`|Baixo Risco|Baixo risco de ser uma transação fraudulenta|
|3|`Médio Risco`|Médio Risco|Médio risco de ser uma transação fraudulenta|
|2|`Alto Risco`|Alto Risco|Alto risco de ser uma transação fraudulenta|
|4|`Não finalizado`|Não finalizado|Não foi possível finalizar a consulta|
|N/A|`N/A`|Autenticado|Transações autenticadas pelo banco - **Não são analisaveis pelo AF**|
|N/A|`N/A`|AF Não contratado|Antifraude não habilitado no plano do lojista - **Não são analisaveis pelo AF**|
|N/A|`N/A`|AF Dispensado|Antifraude dispensado via contrato ou inferior ao valor mínimo de antifrade parametrizado backoffice no lojista|
|N/A|`N/A`|Não aplicável|Meio de pagamento não analisável como cartões de débito, boleto e débito online|
|N/A|`N/A`|Transação de recorrência|Transação de crédito seja posterior a transação de agendamento. **Somente o Agendamento é analisado**|
|N/A|`N/A`|Transação negada|Venda a crédito foi negada - **Não são analisaveis pelo AF**|

**Payment_method_type**

O Checkout permite apenas um tipo de `Boleto` ou `Débito Online` por lojista, sendo assim não é retornado se o método usado foi Bradesco ou Banco do Brasil, pois apenas um deles estará ativado na afiliação.

|Valor|Descrição|
|---|---|
|1|Cartão de Crédito|
|2|Boleto Bancário|
|3|Débito Online|
|4|Cartão de Débito|

**Payment_method_brand**

|Valor|Descrição|
|---|---|
|1|Visa|
|2|Mastercad|
|3|AmericanExpress|
|4|Diners|
|5|Elo|
|6|Aura|
|7|JCB|
|8|Discover|
|9|Hipercard|

**Payment_method_bank**

|Valor|Descrição|
|---|---|
|1|Banco do Brasil|
|2|Bradesco|

**Shipping_type**

|Valor|Descrição|
|---|---|
|1|Correios|
|2|Frete fixo|
|3|Frete grátis|
|4|Retirar em mãos/loja|
|5|Sem cobrança de frete (serviços ou produtos digitais)|

# Parcelamentos do Checkout Cielo

## Tipo de Parcelamento

O Checkout Cielo permite que o lojista realize transações de crédito parceladas em até 12 vezes.
Existem dois métodos de parcelamento:

* **Parcelamento via backoffice** - é o método padrão de parcelamento do Checkout. Cada bandeira possui uma configuração de parcelamento até 12X. O Valor do Carrinho (Produtos + Frete) é dividido igualmente pelo número de parcelas.
* **Parcelamento via API** - O Lojista limita o número de parcelas a serem apresentadas no backoffice

**OBS:** O Checkout é limitado a parcelamentos de 12X, mesmo que sua afiliação cielo suporte valores superiores. Caso o valor apresentando em seu backoffice seja menor que 12, entre em cotato com o Suporte Cielo e verifique a configuração de sua Afiliação.

## Parcelamento via backoffice

Neste modo, o lojista controla o limite máximo de parcelas que a loja realizará pelo Backoffice Checkout. O Valor das parcelas é definido acessando a aba **Configurações** e alterando a sessão **Pagamentos**

 ![Seleção de Parcelas]({{ site.baseurl_root }}/images/checkout/parcelamento.png)

**OBS:** O Check Box deve estar marcado para que o meio de pagamento seja exibido na tela transacional.

**Características**

* Disponível nas integrações do Checkout Cielo via API ou Botão;
* O valor total dos itens do carrinho é somado e dividido pela quantidade de parcelas do lojista;
* O valor da compra é sempre o mesmo, independentemente da quantidade de parcelas escolhida pelo comprador (Não há cobrança de Juros);
* O valor do frete é somado ao valor do parcelamento;
* A opção “à vista” sempre está disponível ao comprador.
* Todas as transações possuirão as mesmas opções de parcelamento.

## Parcelamento via API

Nesta opção, o lojista pode configurar a quantidade de parcelas por venda, especificado via request da API no momento de envio da transação.
O Checkout realiza o cálculo das parcelas considerando valor total e limite parcelas enviadas via API.

**ATENÇÃO:** Nesta opção de parcelamento, o número de parcelas desejadas deve ser inferior a quantidade que está cadastrada no backoffice Checkout.

**Características**

* O lojista envia a quantidade máxima de parcelas que deseja exibir ao comprador.
* O valor do frete é somado ao valor do parcelamento.

O Parcelamento via API é realizado enviando o campo `MaxNumberOfInstallments` dentro do nó Payment. Isso forçará o Checkout a recalcular o valor do parcelamento.
Abaixo, um exemplo do Nó

```json
"Payment": {
  "MaxNumberOfInstallments": 3
}
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`MaxNumberOfInstallments`|Numeric|Condicional|2|Define valor máximo de parcelas apresentadas no transacional, ignorando configuração do Backoffice|

# Recorrência do Checkout Cielo

A Recorrência é um processo de agendamento automático de transações de crédito, ou seja, é uma transação que se repetirá automaticamente, sem a necessidade do comprador acessar a tela transacional, de acordo com as regras definidas no momento do agendamento.

<aside class="notice">Caso uma das transações não seja autorizada, o Checkout Cielo executa a retentativa automaticamente; para mais detalhes sobre a retentativa automática, veja a seção <a href="#retentativa-de-recorrências">Retentativa</a>.</aside>

Transações recorrentes são ideais para modelos de negócios que envolvam o **conceito de assinatura, plano ou mensalidade** na sua forma de **cobrança**.
Alguns exemplos de negócios são:

* Escolas
* Academias
* Editoras
* Serviços de hospedagem

**Diferença entre transações recorrentes e parceladas:**

|Tipo|Descrição|
|---|---|
|**Parceladas**|Se trata de **uma transação dividida em vários meses**. <br>O valor total da venda compromete o limite do cartão de crédito do comprador independentemente do valor da parcela inicial.<br> O lojista recebe o valor da venda parceladamente e não corre o risco de uma das parcelas ser negada.<br> **EX**: Venda de R$1.000,00 parcelado em 2 vezes. Apesar de o comprador pagar apenas R$500,00 na primeira parcela, o valor do limite de crédito consumido é o integral, ou seja, R$1.000,00. Se o limite do cartão for inferior ou o montante não estiver liberado, a R$1.000,00 a transação será negada|
|**Recorrentes**|São **transações diferentes realizadas no mesmo cartão em momentos previamente agendados**.<br> A primeira venda agenda as futuras vendas a partir de um intervalo de tempo pré definido.<br>  A cada intervalo haverá uma cobrança no cartão de crédito. <br> O pagamento recorrente bloqueia do limite do cartão apenas o valor debitado na data da primeira venda recorrente e do valor total da venda.<br> **EX**: Venda de R$ 1.000,00 em 15/01/2015, com recorrência mensal e data final em 01/06/2015. Todo dia 15 haverá uma nova cobrança de R$1.000,00 no cartão do comprador, se repetindo até 15/05/2015, última data válida antes da data final.|

## Recorrência por API

Uma transação de recorrência no Checkout Cielo possui duas configurações: `Intervalo` e `Data de encerramento`.

* **Intervalo** – padrão de repetição e intervalo de tempo entre cada transação. Esse intervalo temporal entre as transações podem ser: Mensal, Bimestral, Trimestral, Semestral e Anual.
* **Data de encerramento** – Data que o processo de recorrência deixa de ocorrer.

```json
"Payment": {
        "RecurrentPayment": {
            "Interval": "Monthly",
            "EndDate": "2018-12-31"
        }
```

**Payment.RecurrentPayment**

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|`Payment.RecurrentPayment.Interval`|Alphanumeric|Sim|10|Intervalo entre cada transação da recorrencia|
|`Payment.RecurrentPayment.EndDate`|YYYY-MM-DD|Não|255|Data onde a Recorrência se encerrará; Se não enviado a recorrência se encerra somente se cancelada|

|Intervalo|Descrição|
|---|---|
|`Monthly`|Mensal|
|`Bimonthly`|Bimestral|
|`Quarterly`|Trimestral|
|`SemiAnnual`|Semestral|
|`Annual`|Anual|

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
    },
    "Options": {
        "AntifraudEnabled": false
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

* **Intervalo de tempo entre as tentativas:** 1 dia
* **Quantidade de retentativas:** 3 (três), uma por dia, por 3 dias corridos a partir do dia seguinte da transação original não autorizada.

**OBS**: Esse processo visa manter obter uma resposta positiva do processo de autorização, impedindo o lojista de perder a venda. O Processo de retentativa gera pedidos duplicados dentro do Backoffice, pois o pedido original, negado, será apresentado na lista de Pedidos, junto com a nova transação autorizada

**ATENÇÃO:**A regra da retentativa não pode ser modificada pelo lojista.

## Consultando transações

As transações de Recorrência ficam disponíveis no Backoffice Checkout Cielo como as outras vendas de sua loja na aba “PEDIDOS” (veja imagem abaixo).

A primeira transação da recorrência é uma transação normal, seguindo as regras e preferências definidas pelo lojista no Backoffice.

**ATENÇÃO:** O valor e data de cobrança das transações recorrentes serão sempre os mesmos da transação inicial. O agendamento passa a funcionar automaticamente a partir da data em que a primeira transação for autorizada.

![Consultando transações]({{ site.baseurl_root }}/images/checkout-consulta-recorrencia.png)

Esta tela mostra a data que a 1° transação da recorrência foi autorizada e deverá ser capturada manualmente. **As demais transações da recorrência sempre serão capturadas automaticamente**, independente se primeira transação foi capturada ou cancelada. Se o Cliente tiver configurado Captura automática, a captura da recorrência também será automática.

**ATENÇÃO:** Somente a 1° transação é submetida a análise do antifraude

## Cancelamento de Recorrência no Checkout Cielo.

O cancelamento da recorrência ocorre dentro do Backoffice do Checkout Cielo, também na aba “PEDIDOS”. Basta:

1. Acessar uma transação de recorrência (marcada com o símbolo “Recorrente”)
2. Entrar em Detalhes (o símbolo de “+”)

![Pedido de recorrência]({{ site.baseurl_root }}/images/checkout-cancelar-recorrencia.png)

![Cancelamento de recorrência]({{ site.baseurl_root }}/images/checkout/pedidoreccance.png)

Tela de detalhes da Recorrência

Na tela acima, há duas opções de Cancelamento pelos botões:

* **Cancelar** – Cancela a transação, sem efetuar o cancelamento das futuras transações de recorrência.
* **Cancelar Recorrência** - Cancela o agendamento de futuras transações, encerrando a recorrência. Não cancela a transação atual nem as que já ocorreram. Essas necessitam ser canceladas manualmente.

**ATENÇÃO:**
* A Recorrência ocorre somente para Cartões de crédito e para produtos tipo “SERVIÇO” e “BENS DIGITAIS”.
* A Recorrência é iniciada no momento da AUTORIZAÇAO, NÃO NA CAPTURA. Se a recorrência não tiver uma data para ser finalizada, ela se repetirá automaticamente até ser cancelada manualmente.
* Sua afiliação Cielo deve ser habilitada para transacionar sem CVV ou Em recorrência, do contrário, todas as transações recorrentes serão negadas.

## Edição da Recorrência

O Checkout Cielo permite que o lojista modifique 3 dados da recorrencia:

* **Ativação** - Uma recorrência pode ser ativada ou desativada. EX: Suspensão de uma assinatura por um periodo de 3 meses; Basta definir a Recorrência como inativa.
* **Intervalo** - É possivel modificar o intervalo de execução.
* **Dia de ocorrência** - É possivel modificar o dia de execução da transação recorrente.

A atualização é feita exclusivamente via o Backoffice Cielo. Acesso o [**Tutorial do Backoffice Checkout Cielo**]({{ site.baseurl_root }}{% post_url 2000-01-01-checkout-tutoriais%}) para mais informações.

# Wallets

## O que são Wallets

São repositorios de cartões e dados de pagamentos para consumidores online. As Carteiras digitais permitem que um consumidor realizar o cadastro de seus dados de pagamento, assim agilizando o processo de compra em lojas habilitadas.

### Wallets Disponiveis

O Checkout Cielo possui integração com:

| Carteira                                                           |Descrição|Observação|
|:------------------------------------------------------------------:|---------||
| [**VisaCheckout**](https://vaidevisa.visa.com.br/site/visa-checkout) |Wallet da bandeira Visa, permite que o comprador salve cartões e endereços e os utilize no Checkout |Necessita que o lojista solicite ativação pela [**Cielo**](https://developercielo.github.io/manual/checkout-cielo#suporte-cielo)|
| [**Compre Rápido by Cielo**](https://cieloecommerce.cielo.com.br/backoffice)|Wallet do proprio Checkout Cielo. Permite que o comprador salve dados de endereço e cartão de credito para que seja utilizados entre lojas Checkout|Habilitado automaticamente para lojas Checkout|

## Wallets no Checkout Cielo

No Checkout Cielo as wallets são utilizadas para evitar que o comprador preencha todos os dados de pagamento, assim tornando o processo de finalização de compra mais fluido

<aside class="warning">Os cartões salvos são propriedade das respectivas wallets. Não é possivel resgata-los ou vincula-los a lojas especificas dentro do Checkout</aside>

### Utilização

O Checkout Cielo ja é integrado as Wallets, sendo assim não há necessidade por parte dos lojsitas de:

* Adaptação na integração
* Adaptação na estrutura de notificação
* Mudança de fluxos de Captura
* Mudança de fluxos de Cancelamento

<br>

As Wallets serão apresentadas na tela transacional e o comprador realizará os passos a sequir:

**1º Passo:** <BR> 
Na tela transacional, o comprador escolherá a qual wallet deseja utilizar:

Imagem 01

![]({{ site.baseurl_root }}/images/checkout/wallet1.png)

**2º Passo:** <BR>
O comprador fará o login:

|Compra Rápido By Cielo|Visa Checkout|
|-|-|
|![]({{ site.baseurl_root }}/images/checkout/wallet2.png)|![]({{ site.baseurl_root }}/images/checkout/wallet3.png)|

**3º Passo:** <BR>
Com os dados inclusos na tela, o comprador pode finalizar a transação

|Compra Rápido By Cielo|Visa Checkout|
|-|-|
|![]({{ site.baseurl_root }}/images/checkout/wallet4.png)|![]({{ site.baseurl_root }}/images/checkout/wallet5.png)|

# Códigos de Retorno das Vendas

 Os códigos de retorno são os motivos para uma transação ser não autorizada no Checkout Cielo
 
| Código Resposta | Definição                                     | Significado                                                                 | Ação                                                              | Permite Retentativa |
|-----------------|-----------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------|
| 00              | Transação autorizada com sucesso.             | Transação autorizada com sucesso.                                           | Transação autorizada com sucesso.                                 | Não                 |
| 000             | Transação autorizada com sucesso.             | Transação autorizada com sucesso.                                           | Transação autorizada com sucesso.                                 | Não                 |
| 01              | Transação não autorizada. Transação referida. | Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor. | Transação não autorizada. Entre em contato com seu banco emissor. | Não                 |
| 02              | Transação não autorizada. Transação referida. | Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor. | Transação não autorizada. Entre em contato com seu banco emissor. | Não                 |
|03|Transação não permitida. Erro no cadastramento do código do estabelecimento no arquivo de configuração do TEF|Transação não permitida. Estabelecimento inválido. Entre com contato com a Cielo.|Não foi possível processar a transação. Entre com contato com a Loja Virtual.|Não|
|04|Transação não autorizada. Cartão bloqueado pelo banco emissor.|Transação não autorizada. Cartão bloqueado pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|05|Transação não autorizada. Cartão inadimplente (Do not honor).|Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|06|Transação não autorizada. Cartão cancelado.|Transação não autorizada. Não foi possível processar a transação. Cartão cancelado permanentemente pelo banco emissor.|Não foi possível processar a transação. Entre em contato com seu banco emissor.|Não|
|07|Transação negada. Reter cartão condição especial|Transação não autorizada por regras do banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor|Não|
|08|Transação não autorizada. Código de segurança inválido.|Transação não autorizada. Código de segurança inválido. Oriente o portador a corrigir os dados e tentar novamente.|Transação não autorizada. Dados incorretos. Reveja os dados e informe novamente.|Não|
|11|Transação autorizada com sucesso para cartão emitido no exterior|Transação autorizada com sucesso.|Transação autorizada com sucesso.|Não|
|12|Transação inválida, erro no cartão.|Não foi possível processar a transação. Solicite ao portador que verifique os dados do cartão e tente novamente.|Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.|Não|
|13|Transação não permitida. Valor da transação Inválido.|Transação não permitida. Valor inválido. Solicite ao portador que reveja os dados e novamente. Se o erro persistir, entre em contato com a Cielo.|Transação não autorizada. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|14|Transação não autorizada. Cartão Inválido|Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor, dados incorretos ou tentativas de testes de cartão. Use o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo. Consulte www.cielo.com.br/desenvolvedores para implantar o Algoritmo de Lhum.|Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.|Não|
|15|Banco emissor indisponível ou inexistente.|Transação não autorizada. Banco emissor indisponível.|Não foi possível processar a transação. Entre em contato com seu banco emissor.|Não|
|19|Refaça a transação ou tente novamente mais tarde.|Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir entre em contato com a loja virtual.|Apenas 4 vezes em 16 dias.|
|21|Cancelamento não efetuado. Transação não localizada.|Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|22|Parcelamento inválido. Número de parcelas inválidas.|Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|23|Transação não autorizada. Valor da prestação inválido.|Não foi possível processar a transação. Valor da prestação inválido. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Valor da prestação inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|24|Quantidade de parcelas inválido.|Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.|Não|
|25|Pedido de autorização não enviou número do cartão|Não foi possível processar a transação. Solicitação de autorização não enviou o número do cartão. Se o erro persistir, verifique a comunicação entre loja virtual e Cielo.|Não foi possível processar a transação. reveja os dados informados e tente novamente. Persistindo o erro, entrar em contato com a loja virtual.|Apenas 4 vezes em 16 dias.|
|28|Arquivo temporariamente indisponível.|Não foi possível processar a transação. Arquivo temporariamente indisponível. Reveja a comunicação entre Loja Virtual e Cielo. Se o erro persistir, entre em contato com a Cielo.|Não foi possível processar a transação. Entre com contato com a Loja Virtual.|Apenas 4 vezes em 16 dias.|
|30|Transação não autorizada. Decline Message|Não foi possível processar a transação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação com a Cielo esta sendo feita corretamente|Não foi possível processar a transação. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a loja|Não|
|39|Transação não autorizada. Erro no banco emissor.|Transação não autorizada. Erro no banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|41|Transação não autorizada. Cartão bloqueado por perda.|Transação não autorizada. Cartão bloqueado por perda.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|43|Transação não autorizada. Cartão bloqueado por roubo.|Transação não autorizada. Cartão bloqueado por roubo.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|51|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|52|Cartão com dígito de controle inválido.|Não foi possível processar a transação. Cartão com dígito de controle inválido.|Transação não autorizada. Reveja os dados informados e tente novamente.|Não|
|53|Transação não permitida. Cartão poupança inválido|Transação não permitida. Cartão poupança inválido.|Não foi possível processar a transação. Entre em contato com seu banco emissor.|Não|
|54|Transação não autorizada. Cartão vencido|Transação não autorizada. Cartão vencido.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|55|Transação não autorizada. Senha inválida|Transação não autorizada. Senha inválida.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|57|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|58|Transação não permitida. Opção de pagamento inválida.|Transação não permitida. Opção de pagamento inválida. Reveja se a opção de pagamento escolhida está habilitada no cadastro|Transação não autorizada. Entre em contato com sua loja virtual.|Não|
|59|Transação não autorizada. Suspeita de fraude.|Transação não autorizada. Suspeita de fraude.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|60|Transação não autorizada.|Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.|Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|61|Banco emissor indisponível.|Transação não autorizada. Banco emissor indisponível.|Transação não autorizada. Tente novamente. Se o erro persistir, entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|62|Transação não autorizada. Cartão restrito para uso doméstico|Transação não autorizada. Cartão restrito para uso doméstico.|Transação não autorizada. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|63|Transação não autorizada. Violação de segurança|Transação não autorizada. Violação de segurança.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|64|Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.|Não|
|65|Transação não autorizada. Excedida a quantidade de transações para o cartão.|Transação não autorizada. Excedida a quantidade de transações para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|67|Transação não autorizada. Cartão bloqueado para compras hoje.|Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.|Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|70|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
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
|89|Erro na transação.|Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.|Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|90|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|91|Transação não autorizada. Banco emissor temporariamente indisponível.|Transação não autorizada. Banco emissor temporariamente indisponível.|Transação não autorizada. Banco emissor temporariamente indisponível. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|92|Transação não autorizada. Tempo de comunicação excedido.|Transação não autorizada. Tempo de comunicação excedido.|Transação não autorizada. Comunicação temporariamente indisponível. Entre em contato com a loja virtual.|Apenas 4 vezes em 16 dias.|
|93|Transação não autorizada. Violação de regra - Possível erro no cadastro.|Transação não autorizada. Violação de regra - Possível erro no cadastro.|Sua transação não pode ser processada. Entre em contato com a loja virtual.|Não|
|96|Falha no processamento.|Não foi possível processar a transação. Falha no sistema da Cielo. Se o erro persistir, entre em contato com a Cielo.|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Apenas 4 vezes em 16 dias.|
|97|Valor não permitido para essa transação.|Transação não autorizada. Valor não permitido para essa transação.|Transação não autorizada. Valor não permitido para essa transação.|Não|
|98|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|Apenas 4 vezes em 16 dias.|
|99|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde.  Pode ser erro no SITEF, favor verificar !|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|999|Sistema/comunicação indisponível.|Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde.  Pode ser erro no SITEF, favor verificar !|Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|AA|Tempo Excedido|Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.|Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.|Apenas 4 vezes em 16 dias.|
|AC|Transação não permitida. Cartão de débito sendo usado com crédito. Use a função débito.|Transação não permitida. Cartão de débito sendo usado com crédito. Solicite ao portador que selecione a opção de pagamento Cartão de Débito.|Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de débito.|Não|
|AE|Tente Mais Tarde|Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.|Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.|Apenas 4 vezes em 16 dias.|
|AF|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|AG|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|AH|Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.|Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.|Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.|Não|
|AI|Transação não autorizada. Autenticação não foi realizada.|Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)|Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.|Não|
|AJ|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label.|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação.|Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual.|Não|
|AV|Transação não autorizada. Dados Inválidos|Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.|Falha na validação dos dados. Reveja os dados informados e tente novamente.|Apenas 4 vezes em 16 dias.|
|BD|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.|Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.|Não|
|BL|Transação não autorizada. Limite diário excedido.|Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.|Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|BM|Transação não autorizada. Cartão Inválido|Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.|Transação não autorizada. Cartão inválido.  Refaça a transação confirmando os dados informados.|Não|
|BN|Transação não autorizada. Cartão ou conta bloqueado.|Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com  seu banco emissor.|Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com  seu banco emissor.|Não|
|BO|Transação não permitida. Falha da operação.|Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.|Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.|Apenas 4 vezes em 16 dias.|
|BP|Transação não autorizada. Conta corrente inexistente.|Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.|Não|
|BV|Transação não autorizada. Cartão vencido|Transação não autorizada. Cartão vencido.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|CF|Transação não autorizada.C79:J79 Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|CG|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DA|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DF|Transação não permitida. Falha no cartão ou cartão inválido.|Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco|Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco|Apenas 4 vezes em 16 dias.|
|DM|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Limite excedido/sem saldo.|Transação não autorizada. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|DQ|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.|Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.|Não|
|DS|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|EB|Transação não autorizada. Limite diário excedido.|Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.|Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.|A partir do dia seguinte, apenas 4 vezes em 16 dias.|
|EE|Transação não permitida. Valor da parcela inferior ao mínimo permitido.|Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.|Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.|Não|
|EK|Transação não permitida para o cartão|Transação não autorizada. Transação não permitida para o cartão.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|FA|Transação não autorizada.|Transação não autorizada AmEx.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|FC|Transação não autorizada. Ligue Emissor|Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor.|Não|
|FD|Transação negada. Reter cartão condição especial|Transação não autorizada por regras do banco emissor.|Transação não autorizada. Entre em contato com seu banco emissor|Não|
|FE|Transação não autorizada. Divergencia na data de transação/pagamento.|Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.|Transação não autorizada. Refazer a transação confirmando os dados.|Não|
|FF|Cancelamento OK|Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.|Transação de cancelamento autorizada com sucesso|Não|
|FG|Transação não autorizada. Ligue AmEx.|Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.|Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090|Não|
|FG|Ligue 08007285090|Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.|Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090|Não|
|GA|Aguarde Contato|Transação não autorizada. Referida pelo Lynx Online de forma preventiva. A Cielo entrará em contato com o lojista sobre esse caso.|Transação não autorizada. Entre em contato com o lojista.|Não|
|HJ|Transação não permitida. Código da operação inválido.|Transação não permitida. Código da operação Coban inválido.|Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.|Não|
|IA|Transação não permitida. Indicador da operação inválido.|Transação não permitida. Indicador da operação Coban inválido.|Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.|Não|
|JB|Transação não permitida. Valor da operação inválido.|Transação não permitida. Valor da operação Coban inválido.|Transação não permitida. Valor da operação Coban inválido. Entre em contato com o lojista.|Não|
|KA|Transação não permitida. Falha na validação dos dados.|Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.|Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|KB|Transação não permitida. Selecionado a opção incorrente.|Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.|Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|KE|Transação não autorizada. Falha na validação dos dados.|Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.|Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.|Não|
|N7|Transação não autorizada. Código de segurança inválido.|Transação não autorizada. Código de segurança inválido. Oriente o portador corrigir os dados e tentar novamente.|Transação não autorizada. Reveja os dados e informe novamente.|Não|
|R1|Transação não autorizada. Cartão inadimplente (Do not honor).|Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.|Transação não autorizada. Entre em contato com seu banco emissor.|Apenas 4 vezes em 16 dias.|
|U3|Transação não permitida. Falha na validação dos dados.|Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.|Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.|Não|
|GD|Transação não permitida|Transação não permitida|Transação não é possível ser processada no estabelecimento. Entre em contato com a Cielo para obter mais detalhes Transação|Não|

# Suporte Cielo

Após a leitura deste manual, caso ainda persistam dúvidas (técnicas ou não), a Cielo disponibiliza o suporte técnico 24 horas por dia, 7 dias por semana em idiomas (Português e Inglês), nos seguintes contatos:

* +55 4002-9700 – *Capitais e Regiões Metropolitanas*
* +55 0800-570-1700 – *Demais Localidades*
* +55 11 2860-1348 – *Internacionais*
  * Opção 1 – *Suporte técnico;*
  * Opção 2 – *Credenciamento E-commerce.*
* Email: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
