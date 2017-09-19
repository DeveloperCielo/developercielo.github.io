---
layout: manual
title: Manual Checkout Cielo
description: O objetivo desta documentação é orientar o desenvolvedor sobre o método de integração da API Checkout Cielo, solução simplificada na qual o consumidor é direcionado para uma página de pagamento online segura da Cielo, proporcionando um alto nível de confiança, dentro das mais rígidas normas de segurança (PCI).
search: true
translated: true
categories: manual
tags:
  - Checkout Cielo
language_tabs:
  json: JSON
  shell: Shell
  php: PHP
  ruby: Ruby
  python: Python
  java: Java
  csharp: C#
toc_footers:
  - <a href='/Habilitacao-meios-de-pagamento/'>Manual de Boleto e débito online</a>
  - <a href='/Checkout-Backoffice/'>Backoffice Cielo (Acesso lojista)</a>
  - <a href='/Checkout-FAQ/'>FAQ</a>
---

# Manual Checkout Cielo

O objetivo desta documentação é orientar o desenvolvedor sobre o método de integração da API Checkout Cielo, solução simplificada na qual o consumidor é direcionado para uma página de pagamento online segura da Cielo, proporcionando um alto nível de confiança, dentro das mais rígidas normas de segurança (PCI). Em linhas gerais, o Checkout Cielo é uma solução de pagamento projetada para aumentar a conversão das vendas, simplificar o processo de compra, reduzir fraudes e custos operacionais.
Nesta documentação estão descritas todas as funcionalidades desta integração, os parâmetros técnicos e principalmente os códigos de exemplos para facilitar o seu desenvolvimento.

O Checkout Cielo utiliza uma tecnologia REST que deve ser usada quando houver um *“carrinho de compras”* a ser enviado, ou seja, no caso do consumidor navegar pelo site e escolher 1 ou mais produtos para adicionar ao carrinho e depois, então, finalizar a compra. Há também opção de [integração via botão](#botão-de-produto) usada sempre que não houver um *“carrinho de compras”* em sua loja ou quando se deseja associar uma compra rápida direta a um produto.

Durante a integração com o Checkout Cielo, alguns passos e alguns redirecionamentos ocorrerão. A imagem abaixo ilustra esse fluxo:

![Fluxo de integração Checkout Cielo](/images/fluxo-checkout.svg)

Após o portador do cartão (consumidor) selecionar suas compras e apertar o botão “Comprar” da loja virtual já integrada ao Checkout Cielo, o fluxo segue desta forma:

1. A API da Cielo retorna o **CheckoutURL**, que deverá ser utilizado pela loja para redirecionar o cliente ao ambiente seguro de pagamento da Cielo (página do Checkout Cielo)
2. A loja redireciona o cliente para a URL retornada pela Cielo
3. O portador do cartão digita os dados de pagamento e conclui a compra
4. O Checkout Cielo redireciona o cliente para a URL de Retorno escolhida pela loja, configurada no [Backoffice Checkout Cielo](/Checkout-Backoffice/) desta solução, ou para a URL de Retorno, configurada através da integração via API.
5. A loja avisa ao cliente que o processo foi concluído e que ele receberá mais informações sobre a compra e o pagamento por e-mail.
6. O Checkout Cielo envia o POST de notificação para a URL de Notificação, configurada no Backoffice
7. A loja processa o pedido de compra utilizando os dados do POST de notificação e, se a transação estiver autorizada, libera o pedido.

# Certificado Extended Validation

## O que é Certificado SSL?

O Certificado SSL para servidor web oferece autenticidade e integridade dos dados de um web site, proporcionando aos clientes das lojas virtuais a garantia de que estão realmente acessando o site que desejam, e não uma um site fraudador.

Empresas especializadas são responsáveis por fazer a validação do domínio e, dependendo do tipo de certificado, também da entidade detentora do domínio.

### Internet Explorer:

![Certificado EV Internet Explorer](./images/certificado-ie.jpg)

### Firefox

![Certificado EV Firefox](./images/certificado-firefox.jpg)

### Google Chrome

![Certificado EV Google Chrome](./images/certificado-chrome.jpg)

## O que é Certificado EV SSL?

O Certificado EV foi lançado no mercado recentemente e garante um nível de segurança maior para os clientes das lojas virtuais.

Trata-se de um certificado de maior confiança e quando o https for acessado a barra de endereço ficará verde, dando mais confiabilidade aos visitantes do site.

## Como instalar o Certificado Extended Validation no servidor da Loja?

Basta instalar os três arquivos a seguir na Trustedstore do servidor. A Cielo não oferece suporte para a instalação do Certificado. Caso não esteja seguro sobre como realizar a instalação do Certificado EV, então você deverá ser contatado o suporte do fornecedor do seu servidor.

* [Certificado Raiz](./attachment/root.crt)
* [Certificado Intermediária](./attachment/intermediaria.crt)
* [Certificado E-Commerce Cielo](./attachment/ecommerce.cielo.com.br.crt)

## Passo a Passo para a Instalação

### Instalação no Servidor da Loja Virtual

O passo a passo para a instalação do Certificado EV deverá ser contatado o suporte do fornecedor do seu servidor.

<aside class="warning">A Cielo não oferece suporte para a instalação do Certificado.</aside>

### Acesso do Cliente à Loja Virtual

Normalmente, o browser faz a atualização do Certificado automaticamente, caso não o faça e o cliente entre em contato deverá ser informado os seguintes passos:

#### 1o Passo:

Salvar os três arquivos abaixo em uma pasta nova, ou que relembre facilmente, pois será utilizada posteriormente:

* [Certificado Raiz](./attachment/root.crt)
* [Certificado Intermediária](./attachment/intermediaria.crt)
* [Certificado E-Commerce Cielo](./attachment/ecommerce.cielo.com.br.crt)

#### 2o Passo:

No “Internet Explorer”, clique no menu “Ferramentas” e acesse as “Opções da Internet”:

![Instalar IE](./images/certificado-instalar-ie-1.jpg)

No “Firefox”, clique no menu “Abrir Menu” e acesse “Avançado” e “Opções”:

![Instalar FF](./images/certificado-instalar-ff-1.jpg)

No “Chrome”, clique no “Personalizar e Controlar o Google Chrome” e acesse “Configurações” e “Mostrar configurações avançadas... “Alterar Configurações de Proxy e “Conteúdo” e Certificados:

![Instalar GC](./images/certificado-instalar-gc-1.jpg)

#### 3o Passo:

No Internet Explorer, em “Certificados”, clique em “Importar”.

![Instalar IE](./images/certificado-instalar-ie-2.jpg)

No Firefox clique em “Ver Certificados”, clique em “Importar”

![Instalar FF](./images/certificado-instalar-ff-2.jpg)

No Chrome clique em “Gerenciar Certificados”, clique em “Importar”

![Instalar GC](./images/certificado-instalar-gc-2.jpg)

#### 4o Passo:

No Internet Explorer e Chrome “Assistente para Importação de Certificados”, clique em “Avançar”.

![Instalar IE e GC](./images/certificado-instalar-ie-gc-3.jpg)

![Instalar IE e GC](./images/certificado-instalar-ie-gc-4.jpg)

No Firefox “Aba Servidores ”, clique em “Importar”

![Instalar FF](./images/certificado-instalar-ff-3.jpg)

#### 5o Passo:

No Chrome e Internet Explorer “Assistente para Importação de Certificados”, clique em “Procurar”, procure a pasta onde estão os arquivos e selecione o arquivo “cieloecommerce.cielo.com.br.crt, clique em “Abrir” e em seguida “Avançar”.

![Instalar IE e GC](./images/certificado-instalar-ie-gc-5.jpg)

![Instalar IE e GC](./images/certificado-instalar-ie-gc-6.jpg)

#### 6o Passo:

Selecionar a opção desejada: adicionar o Certificado em uma pasta padrão ou procurar a pasta de sua escolha.

![Instalar IE e GC](./images/certificado-instalar-ie-gc-7.jpg)

#### 7o Passo:

Clique em “Concluir”.

![Instalar IE e GC](./images/certificado-instalar-ie-gc-8.jpg)

#### 8o Passo:

Clique em “Ok” para concluir a importação.

![Instalar IE e GC](./images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">No Firefox não consta a mensagem de Importação com Êxito, apenas conclui a importação.</aside>

O Certificado poderá ser visualizado na aba padrão “Outras Pessoas” ou na escolhida pelo cliente.

![Instalar IE e GC](./images/certificado-instalar-ie-gc-10.jpg)

#### 9o Passo:

Repita o mesmo procedimento para os 3 arquivos enviados.

## Dúvidas

Em caso de dúvidas em qualquer etapa ou outras informações técnicas, entre em contato com o Suporte Web do Cielo e-Commerce nos seguintes canais:

* **Email:** [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
* **Capitais:** 4002-9700
* **Demais Cidades:** 0800 570 1700

Horário de atendimento: 24h por dia, 7 dias por semana.

# Visão Geral

Neste manual será apresentada uma visão geral do Checkout Cielo e o mecanismo tecnológico da integração com carrinho ou com botão. Para todo pedido de compra, a meta é revertê-lo em uma venda. Uma venda com cartão pode ser caracterizada por uma transação autorizada e capturada.

<aside class="warning">Uma transação autorizada somente gera o crédito para o lojista se ela for capturada (ou confirmada).</aside>

Após a conclusão da etapa de integração com o Checkout Cielo, é fundamental que o lojista ou administrador da loja online tenha conhecimento dos processos funcionais que farão parte do cotidiano da loja, como o acompanhamento das movimentações financeiras, status de cada venda, tomada de ações  (captura e cancelamento) com relação às vendas,  extrato de cobrança, entre outros. Veja o material complementar sobre o [BackOffice Checkout Cielo](http://developercielo.github.io/Checkout-Backoffice/).

## Considerações sobre a integração

* O cadastro da loja deve estar ativo junto à Cielo.
* Deve-se definir um timeout adequado nas requisições HTTP à Cielo; recomendamos 30 segundos.
* O certificado Root da entidade certificadora (CA) de nosso Web Service deve estar cadastrado na Truststore a ser utilizada. Como nossa certificadora é de ampla aceitação no mercado, é provável que ela já esteja registrada na Truststore do próprio sistema operacional. Veja a seção [Certificado Extended Validation](#certificado-extended-validation) para mais informações.
* Os valores monetários são sempre tratados como valores inteiros, sem representação das casas decimais, sendo que os dois últimos dígitos são considerados como os centavos. Exemplo: R$ 1.286,87 é representado como 128687; R$ 1,00 é representado como 100.

<aside class="notice">Veja a seção <a href="#certificado-extended-validation">Certificado Extended Validation</a> para informações sobre os certificados Cielo</aside>

## Navegadores suportados

Suportamos as versões dos seguintes navegadores:
* Chrome - V40.0 ou posterior
* FireFox -  V34.0.5 ou posterior
* Internet Explorer - 10 ou superior
* Safari (MAC/iOS) - 7 ou posterior  
* Opera - V26 ou posterior

Para que os compradores obtenham a melhor experiência do Checkout Cielo, recomendamos baixar a última versão dos navegadores mencionados acima.

Confira este site [link para http://browsehappy.com/] para visualizar as últimas versões dos navegadores.

Observação: navegadores antigos podem negar acesso ao Checkout Cielo e alguns recursos não funcionarão como desejado. Navegadores mais recentes também oferecem melhores recursos de encriptação e privacidade.

Se um recurso ainda não funcionar como esperado:
* Tente utilizar outro navegador como solução temporária para o problema.
* Se você utiliza o Internet Explorer, tente desativar o modo de compatibilidade.

Se você já tentou essas soluções, mas continua a ter problemas, entre em contato conosco pelo [Suporte Cielo](#suporte-cielo) e forneça as seguintes informações:

* Uma explicação geral do problema.
* O navegador e a versão que estão sendo utilizados.
* O sistema operacional e a versão utilizada no computador.
* Uma captura de tela do problema.

## Histórico de versões

* **Versão 1.9** - 22/02/2016
    - Notificação via JSON
* **Versão 1.8** - 19/01/2016
    - Inclusão do Cálculo próprio de parcelamento com juros
    - Inclusão do Frete Cubado.
    - Atualização da Recorrência.
* **Versão 1.7** - 03/11/2015
    - Alteração dos Status de pagamento,
* **Versão 1.6** - 04/11/2015
    - Inclusão do ChargeBack nos status da transação
    - Inclusão dos navegadores suportados.
* **Versão 1.5** - 27/08/2015
    - Inclusão do Botão Recorrente.
* **Versão 1.4** - 14/07/2015
    - Nó de Recorrência na API
    - Inclusão de dados sobre Recorrência no item 11 do manual.
* **Versão 1.3** - 21/01/2015
    - Troca de nomes – Solução Integrada para Checkout Cielo
* **Versão 1.2** - 09/01/2015
    - Inclusão dos seguintes parâmetros no Post de notificação: `discount_amount`, `shipping_address_state`, `payment_boleto`, `number`, `tid`;
    - Alteração do parâmetro numero do pedido no Post de Mudança de Status
* **Versão 1.1** - 08/01/2015
    - Alinhamento dos fluxos de pagamento; inclusão de informações sobre os meios de pagamento; inclusão da tela de configurações do [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/)
* **Versão 1.0** - 24/11/2014
    - Versão inicial

## Produtos e serviços

A versão atual do Checkout Cielo possui suporte às seguintes bandeiras e produtos:

|Bandeira|Crédito à vista|Crédito parcelado Loja|Débito|Voucher|
|---|---|---|---|---|
|Visa|Sim|Sim|Sim|Não|
|Master Card|Sim|Sim|Sim|Não|
|American Express|Sim|Sim|Não|Não|
|Elo|Sim|Sim|Não|Não|
|Diners Club|Sim|Sim|Não|Não|
|Discover|Sim|Não|Não|Não|
|JCB|Sim|Sim|Não|Não|
|Aura|Sim|Sim|Não|Não|

## Suporte Cielo

Após a leitura deste manual, caso ainda persistam dúvidas (técnicas ou não), a Cielo disponibiliza o suporte técnico 24 horas por dia, 7 dias por semana em idiomas (Português e Inglês), nos seguintes contatos:

* +55 4002-9700 – *Capitais e Regiões Metropolitanas*
* +55 0800-570-1700 – *Demais Localidades*
* +55 11 2860-1348 – *Internacionais*
  * Opção 1 – *Suporte técnico;*
  * Opção 2 – *Credenciamento E-commerce.*
* Email: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)

## Modo de teste do Checkout Cielo

O modo de teste Checkout Cielo é uma ferramenta que permite testar a integração do seu site com a plataforma. Com o modo teste, você pode realizar transações a medida que evolui com a integração e consegue simular cenários para testar diferentes meios de pagamento.

### Ativação do Modo de Teste.

O modo de teste pode ser ativado na aba Configurações:

![Modo de teste](/images/checkout-cielo-modo-teste.png)

Nessa área há um caixa de seleção, que quando marcada, habilitará o modo de teste do Checkout Cielo. O modo somente se iniciará quando a seleção for salva.

![Ativação Modo de teste](/images/checkout-cielo-modo-teste-ativacao.png)

Quando a opção for salva, uma tarja vermelha será exibida na parte superior da tela. Ela será exibida em todas as telas do [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) e na tela de checkout do Checkout Cielo.

Essa tarja indica que a sua loja Checkout Cielo está agora operando em ambiente de teste, ou seja, toda a transação realizada nesse modo será considerada como teste.

![Modo de teste ativado](/images/checkout-cielo-modo-teste-ativado.png)

### Como transacionar no Modo de teste.

A realização de transações no modo de teste ocorre de forma normal. As informações da transação são enviadas via POST ou API, utilizando os parâmetros como descrito no tópico [Integração com carrinho](#integração-carrinho-de-compras), entretanto, os meios de pagamentos a serem usados serão meios simulados.

Para realizar transações de teste com diferentes meios de pagamento, siga as seguintes regras:

**a - Transações com Cartão de crédito:**

Para testar cartões de crédito é necessário que dois dados importantes sejam definidos, o status da autorização do cartão e o retorno da analise de fraude.

**Status da Autorização do Cartão de Crédito**

|Status da Transação|Cartões para realização dos testes|Código de Retorno|Mensagem de Retorno|
|---|---|---|---|
|Autorizado|0000.0000.0000.0001 / 0000.0000.0000.0004|4|Operação realizada com sucesso|
|Não Autorizado|0000.0000.0000.0002|2|Não Autorizada|
|Autorização Aleatória|0000.0000.0000.0009|4 / 99|Operation Successful / Time Out|
|Não Autorizado|0000.0000.0000.0007|77|Cartão Cancelado|
|Não Autorizado|0000.0000.0000.0008|70|Problemas com o Cartão de Crédito|
|Não Autorizado|0000.0000.0000.0005|78|Cartão Bloqueado|
|Não Autorizado|0000.0000.0000.0003|57|Cartão Expirado|
|Não Autorizado|0000.0000.0000.0006|99|Time Out|

* **Exemplo:** Transação autorizada, Alto Risco;
* **Numero do Cartão de credito:** 5404434242930107
* **Nome do Cliente:** Maria Alto

**b - Boleto Bancario**

Basta realizar o processo de compra normalmente sem nenhuma alteração no procedimento. O boleto gerado no modo de teste sempre será um boleto simulado.

**c - Debito online**

É necessário informa o status da transação de Debito online para que seja retornado o status desejado. Esse processo ocorre como no antifraude do cartão de crédito descrito acima, com a alteração do nome do comprador.

**Status do Débito**
|Sobre nome do cliente|Status|
|---|---|
|Pago|Pago|
|Qualquer nome.|Não autorizado|

* **Exemplo:** Status não Autorizado.
* **Nome do Cliente:** Maria Pereira

**d - Transações de teste**

Todas as transações realizadas no modo de teste serão exibidas como transações normais na aba Pedidos do Checkout Cielo, entretanto, elas serão marcadas como transações de teste e não serão contabilizadas em conjunto com as transações realizadas fora do ambiente de teste.

![Transações de teste](/images/checkout-cielo-modo-teste-transacoes-de-teste.png)

Essas transações terão o simbolo de teste as diferenciando de suas outras transações. Elas podem ser capturadas ou canceladas utilizando os mesmos procedimentos das transações reais.

![Transações de teste](/images/checkout-cielo-modo-teste-transacoes-de-teste-cancelamento.png)

<aside class="notice">É muito importante que ao liberar sua loja para a realização de vendas para seus clientes que ela não esteja em modo de teste. Transações realizadas nesse ambiente poderão ser finalizadas normalmente, mas não serão descontadas do cartão do cliente e não poderão ser “transferidas” para o ambiente de venda padrão.</aside>

# Fluxo de integração

O Checkout Cielo utiliza uma tecnologia REST que deve ser usada quando houver um “carrinho de compras” a ser enviado, ou seja, no caso do consumidor navegar pelo site e escolher 1 ou mais produtos para adicionar ao carrinho e depois, então, finalizar a compra. Há também opção de integração via botão usada sempre que não houver um “carrinho de compras” em sua loja ou quando se deseja associar uma compra rápida direta a um produto.

Durante a integração com o Checkout Cielo, alguns passos e alguns redirecionamentos ocorrerão. A imagem abaixo ilustra esse fluxo:

![Fluxo de integração Checkout Cielo](/images/fluxo-checkout.svg)

Após o portador do cartão (consumidor) selecionar suas compras e apertar o botão “Comprar” da loja virtual já integrada ao Checkout Cielo, o fluxo segue desta forma:

1. A API da Cielo retorna o **CheckoutURL**, que deverá ser utilizado pela loja para redirecionar o cliente ao ambiente seguro de pagamento da Cielo (página do Checkout Cielo)
2. A loja redireciona o cliente para a URL retornada pela Cielo
3. O portador do cartão digita os dados de pagamento e conclui a compra
4. O Checkout Cielo redireciona o cliente para a URL de Retorno escolhida pela loja, configurada no [Backoffice Checkout Cielo](/Checkout-Backoffice/) desta solução, ou para a URL de Retorno, configurada através da integração via API.
5. A loja avisa ao cliente que o processo foi concluído e que ele receberá mais informações sobre a compra e o pagamento por e-mail.
6. O Checkout Cielo envia o POST de notificação para a URL de Notificação, configurada no Backoffice
7. A loja processa o pedido de compra utilizando os dados do POST de notificação e, se a transação estiver autorizada, libera o pedido.

## URLs do Checkout Cielo

A loja deve configurar as três URLs (notificação, retorno e status) em seu [Backoffice Checkout Cielo](/Checkout-Backoffice/), na aba “Configurações”. Veja a tela abaixo:

![Configurações da loja](/images/checkout-configuracoes-loja.png)

* **URL de Retorno** – Página web na qual o comprador será redirecionado ao fim da compra. Nenhum dado é trocado ou enviado para essa URL. Essa URL apenas leva o comprador, após finalizar a compra, a uma página definida pela loja. Essa página deve ser configurada no [Backoffice Checkout Cielo](/Checkout-Backoffice/), aba “Configurações”
* **URL de Notificação** – Ao finalizar uma transação é enviado um POST HTTP com todos os dados da venda para a URL de Notificação, previamente cadastrada no [Backoffice Checkout Cielo](/Checkout-Backoffice/). **O POST de notificação é enviado apenas no momento que a transação é finalizada, independentemente se houve alteração do status da transação**. A URL deve conter uma página preparada para o receber os parâmetros  nos formatos definidos na tabela [Parâmetros para integração com POST de notificação](#parâmetros-para-integração-com-post-de-notificação) via a linguagem/modulo com o qual seu site foi desenvolvido, que receberá o POST HTTP.
* **URL de Mudança de Status** – Quando um pedido tiver seu status alterado, será enviando um post HTTP para a URL de Mudança de Status, previamente cadastrada no [Backoffice Checkout Cielo](/Checkout-Backoffice/). O POST de mudança de status não contem dados do carrinho, apenas dados de identificação do pedido. A URL deve conter uma pagina preparada para o receber os parâmetros  nos formatos definidos na tabela [Parâmetros para integração com o POST de Mudança de Status](#parâmetros-para-integração-com-post-de-mudança-de-status) via a linguagem/modulo com o qual seu site foi desenvolvido.

## URL de Retorno

Ao finalizar uma transação, o comprador final poderá ser redirecionado para a URL de retorno. Ao clicar no botão “VOLTAR” na tela de comprovante de vendas, o comprador será direcionando para a URL de retorno previamente cadastrada no Backoffice ou enviada via contrato na API, ou seja, o Checkout Cielo disponibiliza duas opções para configurar a URL de retorno:

* via Backoffice: a URL de retorno é fixa para todas as compras.
* via Contrato técnico: a URL de retorno pode ser parametrizada a cada compra, ou seja, é flexível.

### Via Backoffice

Via Backoffice, a url é cadastrada pelo próprio lojista, no site da Cielo, área restrita no item Vendas Online > Checkout Cielo > Configurações da loja.

### Via contrato técnico na API

Para utilizar a url de retorno via contrato técnico (na API), segue o parâmetro que deve ser enviado ao Checkout via contrato técnico:

```json
"Options": {
  "ReturnUrl": "http://url-de-retorno"
}
```

#### Características

* A URL de Retorno via contrato está disponível apenas na integração via API.
* Caso uma URL de retorno seja enviada vai API, ela terá prioridade sobre a URL cadastrada no Backoffice.
* Na integração Checkout Cielo via Botão, só é possível usar a opção de URL de retorno via backoffice.

## URL de Notificação

 A URL de Notificação é a que a Cielo utilizará para enviar os dados da transação, do carrinho e da autorização ao fim do fluxo de integração. Ao receber a notificação, a loja terá todas as informações sobre o carrinho, pedido e poderá utilizar essas informações para alimentar seu sistema.

### Parâmetros para integração com POST de notificação

|Parâmetro|Descrição|Tipo do campo|Tamanho mínimo|Tamanho máximo|
|---|---|---|---|---|
|checkout_cielo_order_number|Identificador único gerado pelo CHECKOUT CIELO|Alfanumérico|1|32|
|amount|Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)|Numérico|1|10|
|order_number|Número do pedido enviado pela loja|Alfanumérico|1|32|
|created_date|Data da criação do pedido (dd/MM/yyyy HH:mm:ss)|Alfanumérico|1|20|
|customer_name|Nome do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO|Alfanumérico|1|289|
|customer_identity|Identificação do consumidor (CPF ou CNPJ) Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO|Alfanumérico|1|14|
|customer_email|E-mail do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO|Alfanumérico|1|64|
|customer_phone|Telefone do consumidor. Se enviado, esse valor já vem preenchido na tela do CHECKOUT CIELO|Numérico|1|11|
|discount_amount|Valor do desconto fornecido (enviado somente se houver desconto)|Numérico|1|10|
|shipping_type|Modalidade de frete|Numérico|1|1|
|shipping_name|Nome do frete|Alfanumérico|1|128|
|shipping_price|Valor do serviço de frete, em centavos (ex: R$ 10,00 = 1000)|Numérico|1|10|
|shipping_address_zipcode|CEP do endereço de entrega|Numérico|1|8|
|shipping_address_district|Bairro do endereço de entrega|Texto|1|64|
|shipping_address_city|Cidade do endereço de entrega|Alfanumérico|1|64|
|shipping_address_state|Estado de endereço de entrega|Alfanumérico|1|64|
|shipping_address_line1|Endereço de entrega|Alfanumérico|1|256|
|shipping_address_line2|Complemento do endereço de entrega|Alfanumérico|1|256|
|shipping_address_number|Número do endereço de entrega|Numérico|1|8|
|[payment_method_type](#payment_method_type|Cód. do tipo de meio de pagamento|Numérico|1|1|
|[payment_method_brand](#payment_method_brand)|Bandeira (somente para transações com meio de pagamento cartão de crédito)|Numérico|1|1|
|[payment_method_bank](#payment_method_bank)|Banco emissor (Para transações de Boleto e Débito Automático)|Numérico|1|1|
|payment_maskedcredicard|Cartão Mascarado (Somente para transações com meio de pagamento cartão de crédito)|Alfanumérico|1|20|
|payment_installments|Número de parcelas|Numérico|1|1|
|payment_antifrauderesult|Status das transações de cartão de Crédito no Antifraude|Numérico|1|1|
|payment_boletonumber|Numero do boleto gerado|String|||
|payment_boletoexpirationdate|Data de vencimento para transações realizadas com boleto bancário|Numérico|1|10|
|payment_status|Status da transação|Numérico|1|1|
|tid|TID Cielo gerado no momento da autorização da transação|Alfanumérico|1|32|

#### payment_method_type

|Valor|Descrição|
|---|---|
|1|Cartão de Crédito|
|2|Boleto Bancário|
|3|Débito Online|
|4|Cartão de Débito|

#### payment_method_brand

|Valor|Descrição|
|---|---|
|1|Visa|
|2|Mastercad|
|3|AmericanExpress|
|4|Diners|
|5|Elo|
|6|Aura|
|7|JCB|

#### payment_method_bank
|Valor|Descrição|
|---|---|
|1|Banco do Brasil|
|2|Bradesco|

<aside class="notice">A página destino do POST de Notificação deve seguir a formatação dos parâmetros com todos os nomes em MINUSCULO</aside>

## Notificação de transação

O processo de notificação de transação e mudança de status descritos nos itens 6 e 7 deste manual também podem ser realizados via notificação e consulta em nossa base. Esse método pode ser utilizado apenas para integração via API.

Nesse método, o post de notificação passa a conter os seguintes campos:

|Parâmetro|Descrição|Tipo do Campo|
|---|---|---|
|URL|URL com os dados necessários para realizar a busca dos dados da transação.|URL|
|MerchantId|Identificador da loja no Checkout Cielo; consta no Backoffice no menu Configuração/Dados Cadastrais.|Alfanumérico (GUID)|
|MerchantOrderNumber|Número do pedido da loja; se não for enviado, o Checkout Cielo gerará um número, que será visualizado pelo Consumidor.|Alfanumérico|

Esse post será enviado tanto para a URL de notificação quanto de mudança de Status. Ao receber essa notificação, o lojista poderá consumir (Realizar um GET) a URL enviada, onde constam os dados necessários para que o Checkout libere a consulta.

O resultado da consulta será todo o conteúdo descrito na tabela do item 7, que já inclui o status da transação.

Se a URL de notificação cadastrada retornar algum erro serão realizadas 3 novas tentativas, **com intervalo de 1 hora** entre cada `POST`. Caso a confirmação não ocorra, novos POSTs não serão realizadas para a mesma transação.

Retorno aguardado para o envio da notificação:
HttpStatus = 200 (OK) (Post recebido e processado com sucesso) (edited)

Obs.: Caso a loja envie o retorno diferente de sucesso o Checkout Cielo realiza 3 novas tentativas de envio da notificação com intervalo de 1 hora. Caso a confirmação não ocorra, novos POSTs não serão realizadas para a mesma transação.

## Mudança de status via consulta

Para utilizar essa opção de notificação, você precisa configurá-la no Backoffice do Checkout Cielo. Para isso, basta acessar o site da Cielo > Checkout Cielo > Configurações, e definir a opção de notificação como “JSON”, conforme tela abaixo.

![Notificação](/images/notificacao.jpg)

<aside class="notice">Nesse modo de notificação, não há diferença entre os posts de notificação e mudança de Status.</aside>

![Fluxo JSON](/images/fluxo-json.jpg)

## URL de Mudança de Status

A URL de Mudança de Status é a que a Cielo utilizará para notificar a loja sobre as mudanças de status das transações. Uma mudança de status, de Autorizado para Cancelado, por exemplo, pode ocorrer a qualquer momento. Se o administrador da loja cancelar um pedido no Backoffice Cielo, então a Cielo enviará para a URL de Mudança de Status uma notificação semelhante a enviada para a URL de notificação. A única diferença dessa notificação é que não conterá os dados do carrinho, mas apenas do pedido e o novo status da autorização.

<aside class="warning">A URL de mudança de status é fornecida pelo lojista. Nessa URL serão postadas as informações de todos os pedidos que tiverem seu status alterado.</aside>

### Parâmetros para integração com POST de Mudança de Status

|Parâmetro|Descrição|Tipo do campo|Tamanho mínimo|Tamanho máximo|
|---|---|---|---|---|
|checkout_cielo_order_number|Identificador único gerado pelo CHECKOUT CIELO.|Alfanumérico|1|32|
|amount|Preço unitário do produto, em centavos (ex: R$ 1,00 = 100)|Numérico|1|10|
|order_number|Número do pedido enviado pela loja|Alfanumérico|1|32|
|payment_status|Status da transação|Numérico|1|1|

#### payment_status

O parâmetro `payment_status` poderá vir com um dos seguintes valores:

|Valor|Descrição|
|---|---|
|1|Pendente (Para todos os meios de pagamento)|
|2|Pago (Para todos os meios de pagamento)|
|3|Negado (Somente para Cartão Crédito)|
|4|Expirado (Cartões de Crédito e Boleto)|
|5|Cancelado (Para cartões de crédito)|
|6|Não Finalizado (Todos os meios de pagamento)|
|7|Autorizado (somente para Cartão de Crédito)|
|8|Chargeback (somente para Cartão de Crédito)|

<aside class="notice">Na tela de pedidos, dentro de cada transação, há a opção de reenvio do POST de mudança de status. Basta clicar nos botões azuis, marcados na imagem abaixo</aside>

![Reenvio de notificação](/images/checkout-reenviar-notificacao.png)

# Integração para vendas de produtos ou serviços

## Carrinho de Compras

Este  tipo  de  integração deve  ser  usada sempre  que  houver  um  “carrinho  de  compras”  a  ser  enviado,  ou  seja,  no  caso  do consumidor navegar pelo site e escolher 1 ou mais produtos para adicionar a um carrinho e depois então finalizar a venda. Se você não possui um carrinho de compras implementado, veja a seção de [integração via botão](#botão-de-produto) Checkout Cielo.

### Endpoint

Endpoint é a URL para onde as requisições com os dados do carrinho serão enviadas. Todas as requisições deverão ser enviadas utilizando o método HTTP POST, para o endpoint `https://cieloecommerce.cielo.com.br/api/public/v1/orders`.

### Autenticação da loja

```shell
-H "MerchantId: 00000000-0000-0000-0000-000000000000" \
```

```php
<?php
curl_setopt($curl, CURLOPT_HTTPHEADER, array('MerchantId: 00000000-0000-0000-0000-000000000000'));
```

```ruby
headers  = {:content_type => "application/json",:merchantid => "00000000-0000-0000-0000-000000000000"}
```

```python
headers = {"Content-Type": "application/json", "MerchantId": "00000000-0000-0000-0000-000000000000"}
```

```java
connection.addRequestProperty("MerchantId", "0000000-0000-0000-0000-000000000000");
```

```csharp
request.Headers["MerchantId"] = "00000000-0000-0000-0000-000000000000";
```

Por se tratar de transações, todas as requisições enviadas para a Cielo deverão ser autenticadas pela loja. A autenticação consiste no envio do Merchant Id, que é o identificador único da loja fornecido pela Cielo após a afiliação da loja. A autenticação da loja deverá ser feita através do envio do campo de cabeçalho HTTP `MerchandId`, como ilustrado abaixo e ao lado:

`MerchantId: 00000000-0000-0000-0000-000000000000`

<aside class="notice">
Lembre-se de substituir `00000000-0000-0000-0000-000000000000` pelo seu MerchantId.
</aside>

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
        "DebitDiscount": 10
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

```shell
curl -X POST "https://cieloecommerce.cielo.com.br/api/public/v1/orders" \
     -H "MerchantId: 00000000-0000-0000-0000-000000000000" \
     -H "Content-Type: application/json" \
     -d '{
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
                  "DebitDiscount": 10
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
         }'
```

```php
<?php
$order = new stdClass();
$order->OrderNumber = '1234';
$order->SoftDescriptor = 'Nome que aparecerá na fatura';
$order->Cart = new stdClass();
$order->Cart->Discount = new stdClass();
$order->Cart->Discount->Type = 'Percent';
$order->Cart->Discount->Value = 10;
$order->Cart->Items = array();
$order->Cart->Items[0] = new stdClass();
$order->Cart->Items[0]->Name = 'Nome do produto';
$order->Cart->Items[0]->Description = 'Descrição do produto';
$order->Cart->Items[0]->UnitPrice = 100;
$order->Cart->Items[0]->Quantity = 2;
$order->Cart->Items[0]->Type = 'Asset';
$order->Cart->Items[0]->Sku = 'Sku do item no carrinho';
$order->Cart->Items[0]->Weight = 200;
$order->Shipping = new stdClass();
$order->Shipping->Type = 'Correios';
$order->Shipping->SourceZipCode = '14400000';
$order->Shipping->TargetZipCode = '11000000';
$order->Shipping->Address = new stdClass();
$order->Shipping->Address->Street = 'Endereço de entrega';
$order->Shipping->Address->Number = '123';
$order->Shipping->Address->Complement = '';
$order->Shipping->Address->District = 'Bairro da entrega';
$order->Shipping->Address->City = 'Cidade da entrega';
$order->Shipping->Address->State = 'SP';
$order->Shipping->Services = array();
$order->Shipping->Services[0] = new stdClass();
$order->Shipping->Services[0]->Name = 'Serviço de frete';
$order->Shipping->Services[0]->Price = 123;
$order->Shipping->Services[0]->DeadLine = 15;
$order->Payment = new stdClass();
$order->Payment->BoletoDiscount = 0;
$order->Payment->DebitDiscount = 10;
$order->Customer = new stdClass();
$order->Customer->Identity = 11111111111;
$order->Customer->FullName = 'Fulano Comprador da Silva';
$order->Customer->Email = 'fulano@email.com';
$order->Customer->Phone = '11999999999';
$order->Options = new stdClass();
$order->Options->AntifraudEnabled = false;

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, 'https://cieloecommerce.cielo.com.br/api/public/v1/orders');
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($order));
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'MerchantId: 00000000-0000-0000-0000-000000000000',
    'Content-Type: application/json'
));

$response = curl_exec($curl);

curl_close($curl);

$json = json_decode($response);
```

```python
from urllib2 import Request, urlopen
from json import dumps

json = dumps({
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
        "DebitDiscount": 10
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
})

headers = {"Content-Type": "application/json", "MerchantId": "00000000-0000-0000-0000-000000000000"}
request = Request("https://cieloecommerce.cielo.com.br/api/public/v1/orders", data=json, headers=headers)
response = urlopen(request).read()

print response
```

```ruby
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest-client'
require 'json'

request = JSON.generate({
    "OrderNumber" => "12344",
    "SoftDescriptor" => "Nome que aparecerá na fatura",
    "Cart" => {
        "Discount" => {
            "Type" => "Percent",
            "Value" => 10
        },
        "Items" => [
            {
                "Name" => "Nome do produto",
                "Description" => "Descrição do produto",
                "UnitPrice" => 100,
                "Quantity" => 2,
                "Type" => "Asset",
                "Sku" => "Sku do item no carrinho",
                "Weight" => 200
            }
        ]
    },
    "Shipping" => {
        "Type" => "Correios",
        "SourceZipCode" => "14400000",
        "TargetZipCode" => "11000000",
        "Address" => {
            "Street" => "Endereço de entrega",
            "Number" => "123",
            "Complement" => "",
            "District" => "Bairro da entrega",
            "City" => "Cidade de entrega",
            "State" => "SP"
        },
        "Services" => [
            {
                "Name" => "Serviço de frete",
                "Price" => 123,
                "Deadline" => 15
            }
        ]
    },
    "Payment" => {
        "BoletoDiscount" => 0,
        "DebitDiscount" => 10
    },
    "Customer" => {
        "Identity" => 11111111111,
        "FullName" => "Fulano Comprador da Silva",
        "Email" => "fulano@email.com",
        "Phone" => "11999999999"
    },
    "Options" => {
        "AntifraudEnabled" => false
    }
})

headers  = {:content_type => "application/json",:merchantid => "00000000-0000-0000-0000-000000000000"}
response = RestClient.post "https://cieloecommerce.cielo.com.br/api/public/v1/orders", request, headers

puts response
```

```java
String json = "{"
            + "    \"OrderNumber\": \"12344\","
            + "    \"SoftDescriptor\": \"Nome que aparecerá na fatura\","
            + "    \"Cart\": {"
            + "        \"Discount\": {"
            + "            \"Type\": \"Percent\","
            + "            \"Value\": 10"
            + "        },"
            + "        \"Items\": ["
            + "            {"
            + "                \"Name\": \"Nome do produto\","
            + "                \"Description\": \"Descrição do produto\","
            + "                \"UnitPrice\": 100,"
            + "                \"Quantity\": 2,"
            + "                \"Type\": \"Asset\","
            + "                \"Sku\": \"Sku do item no carrinho\","
            + "                \"Weight\": 200"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Shipping\": {"
            + "        \"Type\": \"Correios\","
            + "        \"SourceZipCode\": \"14400000\","
            + "        \"TargetZipCode\": \"11000000\","
            + "        \"Address\": {"
            + "            \"Street\": \"Endereço de entrega\","
            + "            \"Number\": \"123\","
            + "            \"Complement\": \"\","
            + "            \"District\": \"Bairro da entrega\","
            + "            \"City\": \"Cidade de entrega\","
            + "            \"State\": \"SP\""
            + "        },"
            + "        \"Services\": ["
            + "            {"
            + "                \"Name\": \"Serviço de frete\","
            + "                \"Price\": 123,"
            + "                \"Deadline\": 15"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Payment\": {"
            + "        \"BoletoDiscount\": 0,"
            + "        \"DebitDiscount\": 10"
            + "     },"
            + "     \"Customer\": {"
            + "         \"Identity\": 11111111111,"
            + "         \"FullName\": \"Fulano Comprador da Silva\","
            + "         \"Email\": \"fulano@email.com\","
            + "         \"Phone\": \"11999999999\""
            + "     },"
            + "     \"Options\": {"
            + "         \"AntifraudEnabled\": false"
            + "     }"
            + "}";

URL url;
HttpURLConnection connection;
BufferedReader bufferedReader;

try {
    url = new URL("https://cieloecommerce.cielo.com.br/api/public/v1/orders");

    connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("POST");
    connection.addRequestProperty("MerchantId", "0000000-0000-0000-0000-000000000000");
    connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
    connection.setDoOutput(true);

    DataOutputStream jsonRequest = new DataOutputStream(
                connection.getOutputStream());

    jsonRequest.writeBytes(json);
    jsonRequest.flush();
    jsonRequest.close();

    bufferedReader = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));

    String responseLine;
    StringBuffer jsonResponse = new StringBuffer();

    while ((responseLine = bufferedReader.readLine()) != null) {
        jsonResponse.append(responseLine);
    }

    bufferedReader.close();

    connection.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```

```csharp
HttpWebRequest request = (HttpWebRequest)
                         WebRequest.Create("https://cieloecommerce.cielo.com.br/api/public/v1/orders");

request.Method = "POST";
request.Headers["Content-Type"] = "text/json";
request.Headers["MerchantId"] = "06eadc0b-2e32-449b-be61-6fd4f1811708";

string json = "{"
            + "    \"OrderNumber\": \"12344\","
            + "    \"SoftDescriptor\": \"Nome que aparecerá na fatura\","
            + "    \"Cart\": {"
            + "        \"Discount\": {"
            + "            \"Type\": \"Percent\","
            + "            \"Value\": 10"
            + "        },"
            + "        \"Items\": ["
            + "            {"
            + "                \"Name\": \"Nome do produto\","
            + "                \"Description\": \"Descrição do produto\","
            + "                \"UnitPrice\": 100,"
            + "                \"Quantity\": 2,"
            + "                \"Type\": \"Asset\","
            + "                \"Sku\": \"Sku do item no carrinho\","
            + "                \"Weight\": 200"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Shipping\": {"
            + "        \"Type\": \"Correios\","
            + "        \"SourceZipCode\": \"14400000\","
            + "        \"TargetZipCode\": \"11000000\","
            + "        \"Address\": {"
            + "            \"Street\": \"Endereço de entrega\","
            + "            \"Number\": \"123\","
            + "            \"Complement\": \"\","
            + "            \"District\": \"Bairro da entrega\","
            + "            \"City\": \"Cidade de entrega\","
            + "            \"State\": \"SP\""
            + "        },"
            + "        \"Services\": ["
            + "            {"
            + "                \"Name\": \"Serviço de frete\","
            + "                \"Price\": 123,"
            + "                \"Deadline\": 15"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Payment\": {"
            + "        \"BoletoDiscount\": 0,"
            + "        \"DebitDiscount\": 10"
            + "     },"
            + "     \"Customer\": {"
            + "         \"Identity\": 11111111111,"
            + "         \"FullName\": \"Fulano Comprador da Silva\","
            + "         \"Email\": \"fulano@email.com\","
            + "         \"Phone\": \"11999999999\""
            + "     },"
            + "     \"Options\": {"
            + "         \"AntifraudEnabled\": false"
            + "     }"
            + "}";

using (var writer = new StreamWriter(request.GetRequestStream()))
{
    writer.Write(json);
	writer.Close();
}

HttpWebResponse response = (HttpWebResponse) request.GetResponse();
```

#### Cabeçalho HTTP

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|MerchantId|Guid|Sim|36|Identificador único da loja. **Formato:** 00000000-0000-0000-0000-000000000000|
|Content-type|Alphanumeric|Sim|n/a|Tipo do conteúdo da mensagem a ser enviada. **Utilizar:** "application/json"|

#### Objeto raiz da requisição

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|OrderNumber|Alphanumeric|Opcional|0..64|Número do pedido da loja.Não enviar caracter especial|
|SoftDescriptor|Alphanumeric|Opcional|0..13|Texto para ser exibido na fatura do portador, após o nome do estabelecimento comercial.|
|Cart|[Cart](#cart)|Sim|n/a|Informações sobre o carrinho de compras.|
|Shipping|[Shipping](#shipping)|Sim|n/a|Informações sobre a entrega do pedido."|
|Payment|[Payment](#payment)|Conditional|n/a|Informações sobre o pagamento do pedido.|
|Customer|[Customer](#customer)|Condicional|n/a|Informações sobre dados pessoais do comprador.|
|Options|[Options](#options)|Conditional|n/a|Informações sobre opções configuráveis do pedido.|

### Resposta

### Em caso de sucesso

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
|Settings|[Settings](#settings)|Sim|n/a|Informações da resposta sobre a criação do pedido.|

### Em caso de erro

```json
{
    "message":"An error has occurred."
}
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Message|String|Sim|1..254|Mensagem descritiva do erro|

### Erros de integração

Há dois tipos de erro que poderão ocorrer durante o processo de integração com o Checkout Cielo. São eles:

* **Antes da exibição da tela de Checkout** - Significa que houve algum dado erra do no envio da transação. Dados obrigatórios podem estar faltando ou no formato invalido. Aqui o lojista sempre vai receber um e-mail informando o que deu errado;
* **Depois da Exibição da tela de Checkout (quando a venda é finalizada)** - Significa que há algum impedimento de cadastro que limita a venda. Coisas como afiliação bloqueada, erro nos dados salvos no cadastro ou até problemas no próprio checkout.

## Botão de Produto

Integração via Botão é um método de compra usada sempre que não houver um “carrinho de compras” em sua loja ou quando se deseja associar uma compra rápida direta a um produto, como uma promoção numa homepage pulando a etapa do carrinho.

A integração via botão também pode ser usada para enviar um e-mail marketing, ou uma cobrança via e-mail, ou seja, adicionando o botão (HTML) referente ao produto/serviço a ser comprado/pago. Ou sempre que desejar disponibilizar uma venda rápida.

Para utilizar este recurso, é necessário cadastrar o produto que deseja vender, suas informações, e depois simplesmente copiar o código fonte gerado para este botão. A inclusão dos produtos é feita dentro do [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/), no menu de Produtos/Cadastrar Produto.

A inclusão dos produtos é feita dentro do [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/), no menu de Produtos/Cadastrar Produto.

![Integração com botão](/images/checkout-cielo-integracao-botao.png)

### Características do Botão

* Cada botão gerado serve somente para um determinado produto.
* O preço do produto não pode ser alterado na tela de Checkout
* Não é necessário o desenvolvimento de um carrinho
* O cadastro do produto é obrigatório para a criação do botão.

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter à compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/), e valerão os dados do cadastro.

### Parâmetros para cadastro de produto

Abaixo seguem as informações necessárias para cadastrar um produto.

|Parâmetro|Descrição|Tamanho Min.|Tamanho Máx.|Obrigatório|
|---|---|---|---|---|
|Tipo do Produto|Indique se está vendendo um bem Material, um Serviço ou um bem Digital. Para bens Digitais, não será apresentada a opção de tipo de Frete.|n/a|n/a|Sim|
|SKU|Código de identificação do produto|1|50|Não|
|Título|Titulo do Produto|1|50|Sim|
|Descrição|Descrição do Produto|1|255|Sim|
|Preço|Valor total do pedido **em centavos** (ex.: R$1,00 =100).|11|14|Sim|
|Frete|Escolher dentre uma das opções de Frete (Correios, Frete Fixo, Frete Grátis, Retirar na loja, Sem Cobrança).|n/a|n/a|Sim|
|CEP de Origem|Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o CEP de onde vai partir a mercadoria para fins de cálculo de frete.|9|9|Sim|
|Peso(kg)|Esse campo só aparece para o frete tipo Correios, deve ser preenchido com o peso do produto em kg para fins de cálculo de frete|n/a|n/a|Sim|
|Valor do Frete|Esse campo só aparece para o frete tipo Frete Fixo, e deve ser preenchido com o valor que o lojista especificar para seus produtos.|n/a|n/a|Sim|
|Método de envio|Esse campo só aparece para Tipo Produto igual a Material Físico e Tipo de Frete igual a Frete Fixo.|n/a|n/a|Sim|
|URL|Esse campo só aparece para Tipo Produto igual a Digital.|n/a|n/a|Sim|

#### Exemplo de Botão:

```html
<form method='post' action='https://cieloecommerce.cielo.com.br/transactional/Checkout/BuyNow' target='blank'>
    <input type='hidden' name='id' value=00000000-0000-0000-000000000000/><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br /BackOffice/Content/images/botao_comprar_3.jpg' />
</form>
```

Adicionando o botão na sua página HTML você deve copiar o código HTML do botão criado e colocar no código HTML do seu site, conforme o exemplo abaixo.

<aside class="notice">O código deve ser inserido dentro da área adequada no seu HTML.</aside>

Cada botão possui um código único que só permite comprar aquele determinado produto nas condições de preço e frete cadastrado. Portanto, um fraudador não consegue alterar nenhuma destas informações na hora de submeter a compra, pois o Checkout Cielo vai buscar todos os dados do produto no cadastro do [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/), e valerão os dados do cadastro.

# Integração com Recorrência Programada

A Recorrência é um processo de agendamento automático de transações de crédito, ou seja, é uma transação que se repetirá automaticamente, sem a necessidade do comprador acessar a tela transacional, de acordo com as regras definidas no momento do agendamento.

<aside class="notice">Caso uma das transações não seja autorizada, o Checkout Cielo executa a retentativa automaticamente; para mais detalhes sobre a retentativa automática, veja a seção <a href="#retentativa">Retentativa</a>.</aside>

Transações recorrentes são ideais para modelos de negócios que envolvam o conceito de assinatura, plano ou mensalidade na sua forma de cobrança. Alguns exemplos de negócios são: escolas, academias, editoras, serviços de hospedagem, entre outros.

Diferença entre transações recorrentes e parceladas:

* **Parceladas**: Se trata de uma transação dividida em vários meses. O valor total da venda compromete o limite do cartão de crédito do comprador independentemente do valor da parcela inicial (ver exemplo abaixo). O lojista recebe o valor da venda parceladamente e não corre o risco de uma das parcelas ser negada.
    * **EX**: Venda de R$1.000,00 parcelado em 2 vezes. Apesar de o comprador pagar apenas R$500,00 na primeira parcela, o valor do limite de crédito consumido é o integral, ou seja, R$1.000,00. Se o limite do cartão for inferior ou o montante não estiver liberado, a R$1.000,00 a transação será negada
* **Recorrentes**: São transações diferentes realizadas no mesmo cartão em momentos previamente agendados. A primeira venda agenda as futuras vendas a partir de um intervalo de tempo pré definido (ver exemplo abaixo).  A cada intervalo haverá uma cobrança no cartão de crédito. O pagamento recorrente bloqueia do limite do cartão apenas o valor debitado na data da primeira venda recorrente e do valor total da venda.
    * **EX**: Venda de R$ 1.000,00 em 15/01/2015, com recorrência mensal e data final em 01/06/2015. Todo dia 15 haverá uma nova cobrança de R$1.000,00 no cartão do comprador, se repetindo até 15/05/2015, última data válida antes da data final.

## Pagamento Recorrente Programado

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

```shell
curl -X POST "https://cieloecommerce.cielo.com.br/api/public/v1/orders" \
     -H "MerchantId: 00000000-0000-0000-0000-000000000000" \
     -H "Content-Type: application/json" \
     -d '{
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
         }'
```

```php
<?php
$order = new stdClass();
$order->OrderNumber = '1234';
$order->SoftDescriptor = 'Nome que aparecerá na fatura';
$order->Cart = new stdClass();
$order->Cart->Discount = new stdClass();
$order->Cart->Discount->Type = 'Percent';
$order->Cart->Discount->Value = 10;
$order->Cart->Items = array();
$order->Cart->Items[0] = new stdClass();
$order->Cart->Items[0]->Name = 'Nome do produto';
$order->Cart->Items[0]->Description = 'Descrição do produto';
$order->Cart->Items[0]->UnitPrice = 100;
$order->Cart->Items[0]->Quantity = 2;
$order->Cart->Items[0]->Type = 'Asset';
$order->Cart->Items[0]->Sku = 'Sku do item no carrinho';
$order->Cart->Items[0]->Weight = 200;
$order->Shipping = new stdClass();
$order->Shipping->Type = 'Correios';
$order->Shipping->SourceZipCode = '14400000';
$order->Shipping->TargetZipCode = '11000000';
$order->Shipping->Address = new stdClass();
$order->Shipping->Address->Street = 'Endereço de entrega';
$order->Shipping->Address->Number = '123';
$order->Shipping->Address->Complement = '';
$order->Shipping->Address->District = 'Bairro da entrega';
$order->Shipping->Address->City = 'Cidade da entrega';
$order->Shipping->Address->State = 'SP';
$order->Shipping->Services = array();
$order->Shipping->Services[0] = new stdClass();
$order->Shipping->Services[0]->Name = 'Serviço de frete';
$order->Shipping->Services[0]->Price = 123;
$order->Shipping->Services[0]->DeadLine = 15;
$order->Payment = new stdClass();
$order->Payment->BoletoDiscount = 0;
$order->Payment->DebitDiscount = 0;
$order->Payment->RecurrentPayment = new stdClass();
$order->Payment->RecurrentPayment->Interval = 'Monthly';
$order->Payment->RecurrentPayment->EndDate = '2015-12-31';
$order->Customer = new stdClass();
$order->Customer->Identity = 11111111111;
$order->Customer->FullName = 'Fulano Comprador da Silva';
$order->Customer->Email = 'fulano@email.com';
$order->Customer->Phone = '11999999999';
$order->Options = new stdClass();
$order->Options->AntifraudEnabled = false;

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, 'https://cieloecommerce.cielo.com.br/api/public/v1/orders');
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($order));
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'MerchantId: 00000000-0000-0000-0000-000000000000',
    'Content-Type: application/json'
));

$response = curl_exec($curl);

curl_close($curl);

$json = json_decode($response);
```

```python
from urllib2 import Request, urlopen
from json import dumps

json = dumps({
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
})

headers = {"Content-Type": "application/json", "MerchantId": "00000000-0000-0000-0000-000000000000"}
request = Request("https://cieloecommerce.cielo.com.br/api/public/v1/orders", data=json, headers=headers)
response = urlopen(request).read()

print response
```

```ruby
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest-client'
require 'json'

request = JSON.generate({
    "OrderNumber" => "12344",
    "SoftDescriptor" => "Nome que aparecerá na fatura",
    "Cart" => {
        "Discount" => {
            "Type" => "Percent",
            "Value" => 10
        },
        "Items" => [
            {
                "Name" => "Nome do produto",
                "Description" => "Descrição do produto",
                "UnitPrice" => 100,
                "Quantity" => 2,
                "Type" => "Asset",
                "Sku" => "Sku do item no carrinho",
                "Weight" => 200
            }
        ]
    },
    "Shipping" => {
        "Type" => "Correios",
        "SourceZipCode" => "14400000",
        "TargetZipCode" => "11000000",
        "Address" => {
            "Street" => "Endereço de entrega",
            "Number" => "123",
            "Complement" => "",
            "District" => "Bairro da entrega",
            "City" => "Cidade de entrega",
            "State" => "SP"
        },
        "Services" => [
            {
                "Name" => "Serviço de frete",
                "Price" => 123,
                "Deadline" => 15
            }
        ]
    },
    "Payment" => {
        "BoletoDiscount" => 0,
        "DebitDiscount" => 0,
        "RecurrentPayment" => {
            "Interval" => "Monthly",
            "EndDate" => "2015-12-31"
        }
    },
    "Customer" => {
        "Identity" => 11111111111,
        "FullName" => "Fulano Comprador da Silva",
        "Email" => "fulano@email.com",
        "Phone" => "11999999999"
    },
    "Options" => {
        "AntifraudEnabled" => false
    }
})

headers  = {:content_type => "application/json",:merchantid => "00000000-0000-0000-0000-000000000000"}
response = RestClient.post "https://cieloecommerce.cielo.com.br/api/public/v1/orders", request, headers

puts response
```

```java
String json = "{"
            + "    \"OrderNumber\": \"12344\","
            + "    \"SoftDescriptor\": \"Nome que aparecerá na fatura\","
            + "    \"Cart\": {"
            + "        \"Discount\": {"
            + "            \"Type\": \"Percent\","
            + "            \"Value\": 10"
            + "        },"
            + "        \"Items\": ["
            + "            {"
            + "                \"Name\": \"Nome do produto\","
            + "                \"Description\": \"Descrição do produto\","
            + "                \"UnitPrice\": 100,"
            + "                \"Quantity\": 2,"
            + "                \"Type\": \"Asset\","
            + "                \"Sku\": \"Sku do item no carrinho\","
            + "                \"Weight\": 200"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Shipping\": {"
            + "        \"Type\": \"Correios\","
            + "        \"SourceZipCode\": \"14400000\","
            + "        \"TargetZipCode\": \"11000000\","
            + "        \"Address\": {"
            + "            \"Street\": \"Endereço de entrega\","
            + "            \"Number\": \"123\","
            + "            \"Complement\": \"\","
            + "            \"District\": \"Bairro da entrega\","
            + "            \"City\": \"Cidade de entrega\","
            + "            \"State\": \"SP\""
            + "        },"
            + "        \"Services\": ["
            + "            {"
            + "                \"Name\": \"Serviço de frete\","
            + "                \"Price\": 123,"
            + "                \"Deadline\": 15"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Payment\": {"
            + "        \"BoletoDiscount\": 0,"
            + "        \"DebitDiscount\": 0",
            + "        \"RecurrentPayment\": {"
            + "            \"Interval\": \"Monthly\","
            + "            \"EndDate\": \"2015-12-31\""
            + "         }"
            + "     },"
            + "     \"Customer\": {"
            + "         \"Identity\": 11111111111,"
            + "         \"FullName\": \"Fulano Comprador da Silva\","
            + "         \"Email\": \"fulano@email.com\","
            + "         \"Phone\": \"11999999999\""
            + "     },"
            + "     \"Options\": {"
            + "         \"AntifraudEnabled\": false"
            + "     }"
            + "}";

URL url;
HttpURLConnection connection;
BufferedReader bufferedReader;

try {
    url = new URL("https://cieloecommerce.cielo.com.br/api/public/v1/orders");

    connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("POST");
    connection.addRequestProperty("MerchantId", "0000000-0000-0000-0000-000000000000");
    connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
    connection.setDoOutput(true);

    DataOutputStream jsonRequest = new DataOutputStream(
                connection.getOutputStream());

    jsonRequest.writeBytes(json);
    jsonRequest.flush();
    jsonRequest.close();

    bufferedReader = new BufferedReader(new InputStreamReader(
                connection.getInputStream()));

    String responseLine;
    StringBuffer jsonResponse = new StringBuffer();

    while ((responseLine = bufferedReader.readLine()) != null) {
        jsonResponse.append(responseLine);
    }

    bufferedReader.close();

    connection.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```

```csharp
HttpWebRequest request = (HttpWebRequest)
                         WebRequest.Create("https://cieloecommerce.cielo.com.br/api/public/v1/orders");

request.Method = "POST";
request.Headers["Content-Type"] = "text/json";
request.Headers["MerchantId"] = "06eadc0b-2e32-449b-be61-6fd4f1811708";

string json = "{"
            + "    \"OrderNumber\": \"12344\","
            + "    \"SoftDescriptor\": \"Nome que aparecerá na fatura\","
            + "    \"Cart\": {"
            + "        \"Discount\": {"
            + "            \"Type\": \"Percent\","
            + "            \"Value\": 10"
            + "        },"
            + "        \"Items\": ["
            + "            {"
            + "                \"Name\": \"Nome do produto\","
            + "                \"Description\": \"Descrição do produto\","
            + "                \"UnitPrice\": 100,"
            + "                \"Quantity\": 2,"
            + "                \"Type\": \"Asset\","
            + "                \"Sku\": \"Sku do item no carrinho\","
            + "                \"Weight\": 200"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Shipping\": {"
            + "        \"Type\": \"Correios\","
            + "        \"SourceZipCode\": \"14400000\","
            + "        \"TargetZipCode\": \"11000000\","
            + "        \"Address\": {"
            + "            \"Street\": \"Endereço de entrega\","
            + "            \"Number\": \"123\","
            + "            \"Complement\": \"\","
            + "            \"District\": \"Bairro da entrega\","
            + "            \"City\": \"Cidade de entrega\","
            + "            \"State\": \"SP\""
            + "        },"
            + "        \"Services\": ["
            + "            {"
            + "                \"Name\": \"Serviço de frete\","
            + "                \"Price\": 123,"
            + "                \"Deadline\": 15"
            + "            }"
            + "        ]"
            + "    },"
            + "    \"Payment\": {"
            + "        \"BoletoDiscount\": 0,"
            + "        \"DebitDiscount\": 0,"
            + "        \"RecurrentPayment\": {"
            + "            \"Interval\": \"Monthly\","
            + "            \"EndDate\": \"2015-12-31\""
            + "         }"
            + "     },"
            + "     \"Customer\": {"
            + "         \"Identity\": 11111111111,"
            + "         \"FullName\": \"Fulano Comprador da Silva\","
            + "         \"Email\": \"fulano@email.com\","
            + "         \"Phone\": \"11999999999\""
            + "     },"
            + "     \"Options\": {"
            + "         \"AntifraudEnabled\": false"
            + "     }"
            + "}";

using (var writer = new StreamWriter(request.GetRequestStream()))
{
    writer.Write(json);
	writer.Close();
}

HttpWebResponse response = (HttpWebResponse) request.GetResponse();
```

Uma transação de recorrência no Checkout Cielo possui duas configurações: “Intervalo” e “Data de encerramento”.

* **Intervalo** – padrão de repetição e intervalo de tempo entre cada transação. Esse intervalo temporal entre as transações podem ser: Mensal, Bimestral, Trimestral, Semestral e Anual.
* **Data de encerramento** – Data que o processo de recorrência deixa de ocorrer.

Os dados do cartão de crédito do comprador ficam armazenados de forma segura dentro do Checkout Cielo, permitindo sua reutilização em uma transação recorrente. Esses dados não são acessados pelo lojista e essa inteligência é controlada pelo Checkout Cielo.

### Requisição

Exceto o objeto `Payment` que contém um novo elemento específico para a recorrência chamado `RecurrentPayment`, todos os outros objetos são iguais à integração com o Carrinho.

#### Objeto Payment da Recorrência

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|BoletoDiscount|Numeric|Condicional|0..3|Desconto, em porcentagem, para pagamentos a serem realizados com boleto.|
|DebitDiscount|Numeric|Condicional|0..3|Desconto, em porcentagem, para pagamentos a serem realizados com débito online.|
|**RecurrentPayment**|[RecurrentPayment](#recurrentpayment)|Condicional|Objeto necessário para pagamentos recorrentes|

### Resposta

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

#### Erro na recorrência

**Exemplo**: Bem Físico

Como a recorrência só existe na API, se o desenvolvedor mandar como Bem Físico, a API obriga o envio do tipo de frete. Se no contrato técnico tiver o nó da recorrência, ele só pode mandar “Sem frete”, que não é um tipo válido para bens físicos (produtos). Sendo assim ele receberá a seguinte  resposta:

## Botão de recorrência

Uma maneira de realizar a recorrência dentro do Checkout é criar um botão recorrente.

Basta cadastrar o produto, incluindo um intervalo de cobrança e uma data para encerramento (Opcional), como no exemplo abaixo:

![Botão recorrência](/images/checkout-botao-recorrencia.png)

<aside class="warning">Caso um botão seja utilizado após a “Data final” cadastrada, a transação apresentará um erro exibindo “Oppss” na tela transacional. Data pode ser editada na tela de edição do botão dentro de “Detalhes do Produto”</aside>

# Opções de parcelamento do Checkout Cielo

O Checkout Cielo disponibiliza dois métodos de parcelamento:

## Parcelamento via backoffice

* O parcelamento disponível como opção de pagamento da loja deve ser configurado pelo lojista no backoffice do Checkout, localizado no site da Cielo.
* A parametrização das parcelas será aplicada em todas as vendas.

### Características

* Disponível nas integrações do Checkout Cielo via POST, REST ou Botão;
* O valor total dos itens do carrinho é somado e dividido pela quantidade de parcelas do lojista;
* O valor da compra é sempre o mesmo, independentemente da quantidade de parcelas escolhida pelo comprador;
* O valor do frete é somado ao valor do parcelamento;
* A opção “à vista” está disponível ao comprador.

## Parcelamento via contrato (por venda)

* Nesta opção, o lojista pode configurar a quantidade de parcelas por venda, especificado via contrato técnico (integração json) no momento de envio do pedido de venda.
* Nesta opção, o parcelamento é simplificado, sem aplicação de juros, pois o Checkout realiza o cálculo das parcelas considerando valor total e quantidade de parcelas enviadas.

<aside class="notice"><strong>ATENÇÃO:</strong> na opção de parcelamento via contrato só pode ser enviada uma quantidade de parcelas inferior ao que está cadastrado no backoffice. </aside>

### Características

* Disponível apenas na integração do Checkout Cielo via REST;
* O lojista envia a quantidade máxima de parcelas que deseja exibir ao comprador;
* O valor do frete é somado ao valor do parcelamento.

<aside class="warning"><strong>Importante:</strong> o campo MaxNumberOfInstallments indica a quantidade máxima de parcelas. Caso o campo não seja enviado, o Checkout Cielo seguirá o parcelamento configurado via Backoffice.</aside>

## Exemplos de Integração/Pagamentos

Abaixo, segue os parâmetros que devem ser enviados ao Checkout via contrato técnico, limitando a quantidade máxima de parcelas disponíveis ao comprador por venda:

### Parcelamento via contrato (por venda)

```json
"Payment": {
  "MaxNumberOfInstallments": 3
}
```

<aside class="warning"><strong>Importante:</strong> O valor informado no campo `MaxNumberOfInstallments` não pode ser maior que o valor configurado no backoffice. </aside>

### Desconto para pagamento à vista com cartão de crédito

* Disponível na integração do Checkout Cielo via REST;
* O valor do desconto vai ser aplicado somente para a primeira parcela;
* O desconto é aplicado no valor do carrinho para depois ser somado o frete.

<aside class="warning"><strong>Importante:</strong> O valor informado para o campo `FirstInstallmentDiscount` vai ser sempre o valor de uma porcentagem de desconto. Exemplo: 5 equivale a 5% de desconto.</aside>

### Desconto para 1ª parcela no cartão de credito

```json
"Payment": {
  "FirstInstallmentDiscount": 5
}
```

# Parâmetros de integração

## Cart

```json
{
    "Discount": {},
    "Items": []
}
```

Parâmetro de requisição com informações sobre o carrinho de compras. Veja também o parâmetro [Item](#item)

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Discount|[Discount](#discount)|Opcional|n/a|Informações do desconto sobre o carrinho de compras.|
|Items|[Item[]](#item)|Sim|n/a|Lista de itens do carrinho de compras *(deve conter no mínimo 1 item)*.|

### Discount

```json
{
    "Type": "Percent",
    "Value": 10
}
```

Parâmetro de requisição com informações sobre descontos.

<aside class="notice">Independentemente do tipo do desconto, ele deverá ser calculado antes da soma do valor do frete.</aside>

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Type|Alphanumeric|Condicional|n/a|Tipo do desconto a ser aplicado: "Amount", "Percent". Obrigatório caso `Value` for maior ou igual a zero.|
|Value|Numeric|Condicional|0..18|Valor do desconto a ser aplicado *(pode ser valor absoluto ou percentual)*. Obrigatório caso `Type` for "Amount" ou "Percent".|

#### Discount.Type = Amount

Caso o tipo de desconto escolhido seja o “Valor”, deverá ser inserido o valor em centavos. Ex.: 100 = 1,00 e no recibo da transação será exibido da seguinte forma:

![Amount](/images/checkout-discount-amount.png)

#### Discount.Type Percent

Caso o tipo de desconto escolhido seja o “Percentual”, deverá ser inserido o valor em número inteiro. Ex.: 10 = 10% e no recibo da transação será exibido da seguinte forma:

![Percent](/images/checkout-discount-percent.png)

### Item

```json
{
    "Name": "Nome do produto",
    "Description": "Descrição do produto",
    "UnitPrice": 100,
    "Quantity": 2,
    "Type": "Asset",
    "Sku": "Sku do item no carrinho",
    "Weight": 200
}
```

Parâmetro de requisição com informações sobre o item do carrinho de compras. Veja também o parâmetro [Cart](#cart)

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Name|Alphanumeric|Sim|1..128|Nome do item no carrinho.|
|Description|Alphanumeric|Opcional|0.256|Descrição do item no carrinho.|
|UnitPrice|Numeric|Sim|1..18|Preço unitário do item no carrinho *(**em centavos.** Ex: R$ 1,00 = 100)*.|
|Quantity|Numeric|Sim|1..9|Quantidade do item no carrinho.|
|Type|Alphanumeric|Sim|n/a|Tipo do item no carrinho.|
|Sku|Alphanumeric|Opcional|0..32|Sku do item no carrinho.|
|Weight|Numeric|Condicional|0..9|Peso em gramas do item no carrinho.|

#### Tipos de item

|Tipo|Descrição|
|---|---|
|Asset|Material Físico|
|Digital|Produtos Digitais|
|Service|Serviços|
|Payment|Outros pagamentos|

## Shipping

```json
{
    "Type": "Correios",
    "SourceZipCode": "14400000",
    "TargetZipCode": "11000000",
    "Measures": {
        "Package": "BOX",
        "Lenght": 30,
        "Height": 5,
        "Width": 10,
    },
    "Address": {},
    "Services": []
}
```

Parâmetro de requisição com informações sobre endereço e serviço de entrega dos produtos.

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Type|Alphanumeric|Sim|n/a|Tipo do frete: "Correios", "FixedAmount", "Free", "WithoutShippingPickUp", "WithoutShipping".|
|SourceZipCode|Numeric|Condicional|8|CEP de origem do carrinho de compras.|
|TargetZipCode|Numeric|Opcional|8|CEP do endereço de entrega do comprador.|
|Address|[Address](#address)|Opcional|n/a|Informações sobre o endereço de entrega do comprador.|
|Services|[Service[]](#service)|Condicional|n/a|Lista de serviços de frete.|
|Measures|[Measures](#measures)|Opcional|n/a|Informações para cálculo de frete volumétrico do carrinho.|

### Tipos de fretes

|Tipo de frete|Descrição|
|---|---|
|Correios|Serviços de Correios como Sedex, PAC e e-Sedex. É necessário uma configuração prévia no Backoffice.|
|FixedAmount|Frete com valor fixo|
|Free|Frete Grátis|
|WithoutShippingPickUp|Retirada na loja|
|WithoutShipping|Sem cobrança de frete (aplicável para serviços e produtos digitais).|

O Frete Correios pode ser calculado de 2 maneiras: Frete com ou sem Volume. Para utilizar o frete volumétrico, basta enviar o nó Shipping.Measures, seguindo as regras de integração via API REST.

Para realizar o cálculo de frete via Correios é necessário respeitar as medidas definidas pelo contrato utilizado pelo lojista. Para maiores informações sobre as dimensões e pesos permitidos, sugerimos que valide o contrato da loja no link abaixo:

1. http://www.correios.com.br/para-voce/precisa-de-ajuda/limites-de-dimensoes-e-de-peso

### Measures

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Package|Alphanumeric|Obrigatório|n/a|Tipo de pacote: BOX (Caixa), ROL (Cilindro) ou ENVELOPE|
|Lenght|Numeric|Obrigatório|n/a|Comprimento do pacote|
|Height|Numeric|Condicional|n/a|Altura do pacote enviado|Obrigatório caso Shipping.Package como BOX|
|Width|Numeric|Condicional|n/a|Largura do pacote.|Obrigatório caso Shipping.Package como BOX ou ENVELOPE|
|Diameter|Numeric|Condicional|n/a|Diâmetro do pacote. Obrigatório caso Shipping.Package como ROL|

O Frete Correios pode ser calculado de 2 maneiras: Frete Volumétrico ou Frete sem Volume.

Para utilizar o Frete Volumétrico, basta enviar o nó Shipping.Measures, seguindo as regras de integração via API REST.

<aside class="notice">Para realizar o cálculo de frete via Correios é necessário respeitar as medidas definidas pelo contrato utilizado pelo lojista. Para maiores informações sobre as dimensões e pesos permitidos, sugerimos que valide o contrato da loja no link: http://www.correios.com.br/para-voce/precisa-de-ajuda/limites-de-dimensoes-e-de-peso</aside>

### Address

```json
{
    "Street": "Endereço de entrega",
    "Number": "123",
    "Complement": "",
    "District": "Bairro da entrega",
    "City": "Cidade de entrega",
    "State": "SP"
}
```

Parâmetro de requisição com informações sobre o endereço do comprador. Veja também o parâmetro [Customer](#customer)

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Street|Alphanumeric|Sim|1..256|Rua, avenida, travessa, etc, do endereço de entrega do comprador.|
|Number|Alphanumeric|Sim|1..8|Número do endereço de entrega do comprador.|
|Complement|Alphanumeric|Opcional|0..256|Complemento do endereço de entrega do comprador.|
|District|Alphanumeric|Sim|1..64|Bairro do endereço de entrega do comprador.|
|City|Alphanumeric|Sim|1..64|Cidade do endereço de entrega do comprador.|
|State|Alphanumeric|Sim|2|Estado (UF) do endereço de entrega do comprador.|

### Service

```json
{
    "Name": "Serviço de frete",
    "Price": 123,
    "Deadline": 15
}
```

Parâmetro de requisição com informações sobre o serviço de frete que será utilizado.

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Name|Alphanumeric|Sim|1..128|Nome do serviço de frete.|
|Price|Numeric|Sim|1..18|Preço do serviço de frete (em centavos. Ex: R$ 1,00 = 100).|
|Deadline|Numeric|Condicional|0..9|Prazo de entrega (em dias).|

## Payment

```json
{
    "BoletoDiscount": 0,
    "DebitDiscount": 10,
    "RecurrentPayment": {
        "Interval": "Monthly",
        "EndDate": "2015-12-31"
    }
}
```

Parâmetro de requisição com informações sobre o desconto para pagamento via boleto ou débito online.

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|BoletoDiscount|Numeric|Condicional|0..3|Desconto, em porcentagem, para pagamentos a serem realizados com boleto.|
|DebitDiscount|Numeric|Condicional|0..3|Desconto, em porcentagem, para pagamentos a serem realizados com débito online.|
|RecurrentPayment|[RecurrentPayment](#recurrentpayment)|Condicional|Objeto necessário para pagamentos recorrentes|

## RecurrentPayment

```json
{
    "Interval": "Monthly",
    "EndDate": "2015-12-31"
}
```

Parâmetro de requisição com informações sobre a recorrência.

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Interval|Alphanumeric|Sim|n/a|Tipo de intervalo de recorrência; Veja a tabela [Intervalo de Recorrência](#intervalo-de-recorrência)|
|EndDate|Date|Não|n/a|Data final da recorrência no formado YYYY-MM-DD|

### Intervalo de Recorrência

|Valor|Descrição|
|---|---|
|Monthly|Transações mensais.|
|Bimonthly|Transações bimestrais.|
|Quarterly|Transações trimestrais.|
|SemiAnnual|Transações semestrais.|
|Annual|Transações anuais.|

## Customer

```json
{
    "Identity": 11111111111,
    "FullName": "Fulano Comprador da Silva",
    "Email": "fulano@email.com",
    "Phone": "11999999999"
}
```

Parâmetro de requisição com informações sobre o comprador. Veja também o parâmetro [Address](#address)

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|Identity|Numeric|Condicional|0..14|CPF ou CNPJ do comprador.|
|FullName|Alphanumeric|Condicional|0..288|Nome completo do comprador.|
|Email|Alphanumeric|Condicional|0..64|Email do comprador.|
|Phone|Numeric|Condicional|0..11|Telefone do comprador.|

## Options

```json
{
    "AntifraudEnabled": false
}
```

Parâmetro de requisição para configurar o sistema de anti-fraude para a transação.

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|AntifraudEnabled|Boolean|Conditional|n/a|Habilitar ou não a análise de fraude para o pedido.|

## Settings

Parâmetro de resposta, recebido em caso de sucesso.

```json
{
    "CheckoutUrl": "https://cieloecommerce.cielo.com.br/transacional/order/index?id=123",
    "Profile": "CheckoutCielo",
    "Version": 1
}
```

|Campo|Tipo|Obrigatório|Tamanho|Descrição|
|---|---|---|---|---|
|CheckoutUrl|Alphanumeric|Sim|1..128|URL de checkout do pedido. **Formato:** `https://cieloecommerce.cielo.com.br/transacional/order/index?id={id}`|
|Profile|Alphanumeric|Sim|1..16|Perfil do lojista: fixo "CheckoutCielo".|
|Version|Alphanumeric|Sim|1|Versão do serviço de criação de pedido *(versão: 1)*.|

# Configurações de Pagamento

## Cartão de Crédito

O Checkout Cielo aceita as principais bandeiras de crédito do Brasil e do mundo. São elas: Visa, MasterCard, American Express (Amex), Elo, Diners, Discover, JCB e Aura.

### Recebendo uma Venda de Cartão de Crédito

A partir da criação de uma transação, ela pode assumir diversos status. As transições de status podem ser realizadas através da troca de mensagens entre a loja e a Cielo, ou de forma automática, por exemplo, quando o prazo para a captura de transação autorizada expirar.

Pedidos por meio de cartão de crédito serão incluídos no [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) como **“AUTORIZADO”** ou **“NÃO AUTORIZADO”**, dependendo do resultado da autorização na Cielo. Caso haja algum problema no processamento deste pedido (consumidor fechou a tela, por exemplo), ele constará como **“NÃO FINALIZADO”**.

### Status de transação

|Status de transação|Descrição|
|---|---|
|Pendente (Para todos os meios de pagamento)|Indica que o pagamento ainda está sendo processado; OBS: Boleto - Indica que o boleto não teve o status alterado pelo lojista|
|Pago (Para todos os meios de pagamento)|Transação capturada e o dinheiro será depositado em conta.|
|Negado (Somente para Cartão Crédito)|Transação não autorizada pelo responsável do meio de pagamento|
|Expirado (Cartões de Crédito e Boleto)|Transação deixa de ser válida.|
|Cancelado (Para cartões de crédito)|Transação foi cancelada pelo lojista|
|Autorizado (somente para Cartão de Crédito)|Transação autorizada pelo emissor do cartão. Deve ser capturada para que o dinheiro seja depositado em conta|
|Chargeback (somente para Cartão de Crédito)|Transação cancelada pelo consumidor junto ao emissor do cartão. O Dinheiro não será depositado em conta.|

### Análise de Fraude

Pedidos **“AUTORIZADOS”** serão enviados online, ou seja, no ato da venda, para análise da ferramenta de antifraude, quando  este desenvolvimento estiver devidamente padronizado na integração. O resultado desta análise será traduzido no campo **“Indicação AF”** no Relatório de Pedido, para cada pedido.

Esta análise indicará um **“BAIXO RISCO”** ou “ALTO RISCO” para a venda em questão. Esta sugestão é o que deve guiar a decisão de se confirmar  ou cancelar a venda. A analise será apresentada no “Detalhes do Pedido”, como abaixo:

![Análise de risco](/images/checkout-cielo-analise-risco.png)

### Status do antifraude

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

## Pagamento Recorrente Programado

A Recorrência é um processo de agendamento automático de transações de crédito, ou seja, é uma transação que se repetirá automaticamente, sem a necessidade do comprador acessar a tela transacional, de acordo com as regras definidas no momento do agendamento.

### Retentativa

Caso uma das transações não seja autorizada, o Checkout Cielo executa a retentativa automaticamente, considerando:

* Intervalo de tempo entre as tentativas: 1 dia
* Quantidade de retentativas: 3 (três), uma por dia, por 3 dias corridos a partir do dia seguinte da transação original não autorizada.

<aside class="notice">Essa regra da retentativa não pode ser modificada pelo lojista.</aside>

#### Notificações ao Lojista

Todas as notificações/respostas de cada pedido de compra feito na loja podem ser enviados ao lojista. Para isso, basta que:

* Seja configurada a URL de notificação e URL de Status no backoffice do lojista
* A mudança de Status da retentativa será notificada pela Url de Mudança de Status.

### Consultando transações

As transações de Recorrência ficam disponíveis no Backoffice Checkout Cielo como as outras vendas de sua loja na aba “PEDIDOS” (veja imagem abaixo).

A primeira transação da recorrência é uma transação normal, seguindo as regras e preferências definidas pelo lojista no Backoffice.

<aside class="warning"><strong>IMPORTANTE</strong>: O valor e data de cobrança das transações recorrentes serão sempre os mesmos da transação inicial. O agendamento passa a funcionar automaticamente a partir da data em que a primeira transação for autorizada.</aside>

![Consultando transações](/images/checkout-consulta-recorrencia.png)

Esta tela mostra a que a 1° transação da recorrência foi autorizada e deverá ser capturada manualmente.  As demais transações da recorrência sempre serão capturadas automaticamente, independente se primeira transação foi capturada ou cancelada. Se o Cliente tiver configurado Captura automática, a captura da recorrência também será automática.

<aside class="warning"><strong>IMPORTANTE</strong>: Somente a 1° transação é submetida a análise do antifraude</aside>

### Cancelamento de Recorrência no Checkout Cielo.

O cancelamento da recorrência ocorre dentro do Backoffice do Checkout Cielo, também na aba “PEDIDOS”.  Basta acessar uma transação de recorrência (marcada com o símbolo “Recorrente”), entrar em Detalhes (o símbolo de “+”)

![Cancelamento de recorrência](/images/checkout-cancelar-recorrencia.png)

Na tela acima, há duas opções de Cancelamento pelos botões:

* **Cancelar** – cancela a transação em questão, sem efetuar o cancelamento das futuras transações de recorrência.
* **Cancelar Recorrência** -  cancela o agendamento de futuras transações como um todo, encerrando a recorrência. Não cancela a transação atual nem as que já ocorreram.

<aside class="warning">A Recorrência ocorre somente para Cartões de crédito e para produtos tipo “SERVIÇO” e “BENS DIGITAIS”.</aside>
<aside class="warning">A Recorrência é iniciada no momento da AUTORIZAÇAO, NÃO NA CAPTURA. Se a recorrência não tiver uma data para ser finalizada, ela se repetirá automaticamente até ser cancelada manualmente.</aside>
<aside class="warning">A Recorrência deve ser habilitada em sua Afiliação, do contrario, as transações agendadas serão negadas. </aside>

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

## Boleto

Todo boleto gerado (emitido) aparece com o status de “PENDENTE” no Relatório de Pedidos. Sua troca de status vai depender de ações manuais do proprio lojista. Para isso, acesse o [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) (incluir link do manual) na seção Pedidos

### Possiveis Status do Boleto

* **PENDENTE** – boleto emitido pelo processo de transação. Status continua até alteração manual pelo lojista.
* **PAGO** – Status usado quando o botão "Conciliar” é ativado pelo lojista. Esse status pode ser revertido para pendente utiliando o Botão “Desfazer conciliação”.
* **EXPIRADO** – Status ativo após 10 dias da criação do boleto, caso esse não tenha sito conciliado nesse periodo. Boletos com status “EXPIRADO” podem ser conciliados.

### Conciliando um Boleto

Cabe ao lojista através de uma Conciliação Manual com seu extrato bancário, confirmar o pagamento do mesmo.

![Conciliando um boleto](/images/checkout-cielo-conciliar-boleto.png)

Para realizar a Conciliação você deve:

1. Acessar o relatório de pedidos no [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/);
2. Filtrar os pedidos por Meio de Pagamento “Boleto” e status “PENDENTE” e identificar o boleto em questão pelo Valor;
3. Clicar no sinal de + no final da linha para acessar a página de “Detalhes”;
4. Clicar no botão de “ Confirmar Pagamento ” e informar a data de pagamento, para seu futuro controle;

O pedido passa para status **PAGO**.

O Comprador também verá o pedido como **PAGO** no “Backoffice do Comprador”

Desfazendo a conciliação (pagamento) de um Boleto. Caso a conciliação tenha sido feito errada, basta:

1. Encontrar o Pedido;
2. Entrar no seu detalhe e clicar no botão “Desfazer Pagamento”;
3. O Pedido voltará para o Status de “PENDENTE”.

### Boletos Expirados

Se o boleto não for conciliado dentro de um prazo de 10 dias após seu vencimento, seu Status será alterado para **“EXPIRADO”**, para um melhor controle dos boletos vencidos. Boletos EXPIRADOS podem ser conciliados.

<aside class="notice">Validade do Boleto – Caso o boleto expire em um dia não útil, como Sábado, ele será valido até o próximo dia útil.</aside>

![Boleto](/images/checkout-cielo-boleto.png)

## Débito Online

Pedidos vendidos por meio de Débito online serão incluídos no [Backoffice Cielo Checkout](http://developercielo.github.io/Checkout-Backoffice/) como PENDENTE, PAGO, NÃO AUTORIZADO ou NÃO FINALIZADO, dependendo do resultado da autorização junto ao Banco.

* **Pendente** - Corresponde quando o comprador ao finalizar o pedido e não obtem resposta por parte do Banco, ou seja, não conseguir nem carregar a página do Banco para inserir os dados para o Débito.
* **Pago** - Corresponde quando o comprador conseguir realizar o pagamento do débito com sucesso.
* **Não Autorizado** - Apresentado para o Lojista quando o comprador tentar realizar uma transação via débito e não ter saldo para a transação.
* **Não Finalizado** - Apresentado para o Lojista caso o comprador tenha algum problema para finalizar o pagamento do meio Débito, seja fechando a janela do banco ou simplesmente nem chegando à tela do banco.

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
