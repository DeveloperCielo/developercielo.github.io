---
layout: manual
title: Integração VTEX
description: Integração VTEX
search: true
translated: true
categories: manual
sort_order: 1
tags:
  - Módulos
---

# Integração VTEX

A Cielo desenvolveu um conector na plataforma de e-commerce VTEX para realização do pagamento através das APIs de pagamento online da Cielo.  A usabilidade da plataforma deve ser consultada no [tutorial da VTEX](https://help.vtex.com/tutorial/){:target="_blank"}. Abaixo reforçaremos as informações necessárias para utilização do conector.

# Configuração

Para a configuração estar completa é preciso cadastrar **Afiliação de pagamento** para posteriormente vincular a uma **Condição de pagamento**.

Para mais informações, visite os artigos de suporte da VTEX: [Cadastrar afiliações de gateway](https://help.vtex.com/pt/tutorial/afiliacoes-de-gateway--tutorials_444){:target="_blank"} e [Configurar condições de pagamento](https://help.vtex.com/pt/tutorial/condicoes-de-pagamento--tutorials_455){:target="_blank"}.

## Afiliação de Pagamento

### 1. Acessando o Painel VTEX

Acesse o painel **ADMIN VTEX** (https://*nomedaloja*.myvtex.com/admin) e comece a navegação por **Transações** > **Pagamentos** > **Configurações** > **Afiliações de gateways** > **+**

![Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/00-afiliacao.png)

### 2. Selecionando o Conector

Selecione o conector **CieloEcommerce** e insira as informações conforme recebidas após a contratação das soluções desejadas. 
 
![CieloEcommerce]({{ site.baseurl_root }}/images/modulos/vtex/01-cieloecommerce.jpeg)

É preciso configurar o mesmo conector quantas vezes necessárias de acordo com o tipo de pagamento desejado, por isso fique atento ao Nome da Afiliação utilizada. Sugerimos incluir no nome e o provedor configurado.

### 3. Escolhendo o Nome da Afiliação

Insira o Nome da Afiliação:

![Nome da Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/02-nome-afiliacao-ticket.jpeg)

#### Exemplos de Nome da Afiliação

|Exemplo|Definição|
|-|-|
|CieloEcommerce - Ticket|Nesse exemplo o título relembra que qualquer condição de pagamento que utilizar essa afiliação vai utilizar Ticket como o provider.|
|CieloEcommerce - Cielo30 c/ 3DS c/ SPLIT|Nesse exemplo o título relembra que qualquer condição de pagamento que utilizar essa afiliação vai utilizar Cielo30 como o provider, fazer a autenticação com 3DS (se compatível) e realizar SPLIT de pagamento (se compatível).

### 4. Preenchendo Dados Necessários

Preencha os campos com os dados requisitados:

![1Dados Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/03a-dados.jpg)
![2Dados Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/03b-dados.jpg)

|Campo|Descrição|
|-|-|
|**Nome da Afiliação**|Insira nome identificador da afiliação.|
|**Application Key**|Insira o MerchantID.| 
|**Application Token**|Insira o MerchantKey.|
|**Integration**|Selecione **Adquirência** se o seu contrato é somente com a adquirência Cielo. <br>Selecione **Gateway** se o seu contrato é para utilização de outros provedores.|
|**Provider**|Selecione o provedor  que deseja configurar a afiliação conforme o tipo de pagamento. <br>Exemplo: Se o seu provedor de Boleto é o Bradesco e o seu provedor de Crédito, Débito e Pix é o Cielo será necessário adicionar duas afiliações. <br>O provedor **Simulado** deve ser utilizado para transaçãoes de teste.<br>O provedor **Cielo** deve ser configurado para Integração **Adquirência**. <br>O provedor **Cielo30** deve ser configurado para Integração **Gateway**.|
|**UseSPLIT**|Insira “Sim” ou “Não” se deseja utilizar o SPLIT de pagamentos. Disponível para os tipos de pagamento Crédito, Débito e Boleto.|
|**UseMPI**|Insira “Sim” ou “Não” se deseja utilizar a Autenticação de 3DS2.0. Este campo é obrigatório para o tipo de pagamento Débito.|
|**MpiClientId**|ID do MPI, disponibilizado para o cliente pela Cielo.|
|**MpiClientSecret**|Chave secreta do MPI, disponibilizada para o cliente pela Cielo.
|**MpiMerchantName**|Nome da loja, disponibilizado pela Cielo.|
|**MpiMCC**|Merchant Category Code da loja, disponibilizado pela Cielo.|
|**MpiEstablishmentCode**|Código de estabelecimento da loja, disponibilizado pela Cielo.|

Após salvar o conector ele irá aparecer na lista **Processar com afiliação** da tela de configuração da **Condição de Pagamento**. 

## Condição de Pagamento

### 1. Adicionando Nova Condição de Pagamento

Acesse **Transações** > **Configurações** > **Condições de Pagamento** > **+**

![Condições de pagamento]({{ site.baseurl_root }}/images/modulos/vtex/04-condicao.jpeg)

### 2. Configurando o Tipo de Pagamento

Selecione o tipo de pagamento que deseja configurar e insira as informações necessárias:

![Nome Condição]({{ site.baseurl_root }}/images/modulos/vtex/05-nome-condicao.jpeg)
 
|Campo|Descrição|
|-|-|
|Nome da Condição|Insira nome identificador da condição de pagamento. |
|Processar com a afiliação|Selecione a afiliação existente na lista conforme previamente cadastrada na seção Afiliação de Pagamento.|
|Usar solução antifraude|Esta opção apenas será exibida se houver Antifraude previamente cadastrado Afiliação de Pagamento.|

Da mesma forma que a Afiliação de Pagamento, é preciso configurar a condição de pagamento quantas vezes necessárias de acordo com o tipo de pagamento desejado, por isso fique atento ao Nome da Condição utilizada. O nome do conector é exibido e o tipo de pagamento também. Então sugerimos inserir somente as soluções que foram configuradas na afiliação selecionada.

### Exemplos de Nome da Condição

|Exemplo|Definição|
|-|-|
|Ticket|Nesse exemplo o título relembra que a condição de pagamento vai utilizar a afiliação configurada com Ticket como provider.|
|Cielo30 c/ 3DS c/ SPLIT|Nesse exemplo o título relembra que qualquer condição de pagamento vai utilizar a afiliação configurada com Cielo30 como provider, fazer a autenticação com 3DS (se compatível) e realizará SPLIT de Pagamento (se compatível)|

Após essas duas etapas concluídas com todas as condições de pagamento criadas, as opções de pagamento serão exibidas na tela de checkout da loja.

<aside class="notice">A VTEX  agenda a solicitação de captura para 4 dias após a autorização para o tipo de pagamento ‘Crédito’, quando não há configuração do tempo de captura.</aside>

<aside class="notice">A VTEX possui apenas cadastramento de seller do tipo pessoa ‘Jurídica’.</aside>

## Meios de Pagamento

### Crédito e Débito

Selecione a Condição de Pagamento desejada e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

### Voucher

Este meio de pagamento deve seguir a seção de [Pagamentos Customizados](https://braspag.github.io//tutorial/integracao-vtex#pagamentos-customizados) para que a opção seja exibida na Condição de Pagamento. Posteriormente, selecione a Condição de Pagamento desejada e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

## Pagamentos Customizados

Para configurar pagamentos customizados, acesse **Transações** > **Configurações** > **Pagamentos Customizados** > **Cartão da Loja – Bandeira Própria** > **Configurar**

Nesta seção configure os dados para Private Label e Ticket:

![1Pagamento Customizado]({{ site.baseurl_root }}/images/modulos/vtex/06a-pagamento-customizado.jpg)
![2Pagamento Customizado]({{ site.baseurl_root }}/images/modulos/vtex/06b-pagamento-customizado.jpg)

|Campo|Descrição|
|-|-|
|**Name**|**Valores Possíveis:** <br>Carrefour<br>Credz<br>CredSystem<br>DMCard<br>Ticket|
|**Descrição**|**Valores Possíveis:** <br>Carrefour<br>Credz<br>CredSystem<br>DMCard<br>Ticket|
|**Intervalos de BIN**|100000-999999|
|**Código de pagamento do adquirente**|**Valores Possíveis:** <br>580<br>565<br>550<br>564<br>634|
|**Usar nome do titular do cartão**|Sim|
|**Quantidade de dígitos do CVV**|[1]999|
|**Usar data de validade do cartão?**|Não|
|**Usar endereço de cobrança?**|Não|
|**Máscara do cartão**|9999 9999 9999 9999|
|**Validade do pagamento**|Não|
|**Autorizar automaticamente**|Não|
|**Ativar divisão de pagamento**|Não|

## 3DS

As credenciais recebidas para utilização da solução devem ser inseridas conforme em [Afiliação de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#afilia%C3%A7%C3%A3o-de-pagamento)

## Split de Pagamentos

Para que o Split seja utilizado corretamente, os sellers de um marketplace devem estar previamente cadastrados na plataforma VTEX e deve ser informado ao time de implantação fielmente ao cadastro da VTEX juntamente com o CNPJ. Uma vez editada essa informação na VTEX, o time Cielo deve ser informado dos novos dados.

Para fazer o cadastro de um seller, acesse **Marketplace** > **Sellers** > **Gerenciamento**:

![Split1]({{ site.baseurl_root }}/images/modulos/vtex/07a-split.jpg)
![Split2]({{ site.baseurl_root }}/images/modulos/vtex/07b-split.jpg)

## Antifraude

Para que as transações sejam validadas pelo Antifraude é necessário que o conector de Antifraude **Braspag** esteja configurado previamente em Afiliação de Pagamento antes da etapa de Condição de Pagamento.

Para configurar, acesse **Transações** > **Configurações** > **Afiliações de gateways** > **+**

Selecione o conector **Braspag** (Soluções Antifraude) e insira as informações conforme recebidas após a contratação das soluções desejadas.

![Antifraude]({{ site.baseurl_root }}/images/modulos/vtex/08-antifraude.jpg)

|Campo|Descrição|
|-|-|
|**Id do Merchant**|Merchant ID do antifraude, disponibilizado pela Cielo.|
|**FingerPrint_OrgId**|Fingerprint Org ID, disponibilizado pela Cielo para validação na Cybersource.<br>Indica o ambiente na Threatmetrix: Sandbox ou Produção.|
|**FingerPrint_MerchantId**|Fingerprint Merchant ID, disponibilizado pela Cielo para validação na Cybersource.<br>Identificador da sua loja ou operação.<br> **É diferente do MerchantId**.
É diferente do MerchantId.|
|**Moeda**|Selecionar a moeda da transação Brasil Real (BRL)|
|**Versão de dados definidos da loja**|Utilizar sempre Retail_V4|
|**Enviar transações autenticadas**|Sim|
