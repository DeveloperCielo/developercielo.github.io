---
layout: tutorial
title:  Configurando Boletos e Débito Online
search: true
toc_footers: true
categories: tutorial
tags:
  - Documentos Adicionais
---

# Meios de Pagamento

## Sobre este Manual

Este manual tem como objetivo orientar o **LOJISTA** na contratação e configuração do BOLETOs e DÉBITOs ONLINE disponíveis no **CHECKOUT CIELO** e na **API Cielo Ecommerce**

## Sobre Boletos e Cielo

As soluções e-commerce Cielo suportam 2 tipos de Boletos dos Bancos **Bradesco** e **Banco do Brasil**:

| Tipo de boleto            | Banco                      | Descrição                                                                                            | Solução Cielo                         |
|---------------------------|----------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Boleto Registrado**     | Banco do Brasil X Bradesco | São boleto emitidos dentro do ambiente Bancario. A Cielo enviará as informações para o banco emissor. É necessario ter as credenciais fornecidas pelo Banco para utilização da funcionalidade | Api Cielo E-commerce & Checkout Cielo |
| **Boleto Não registrado** | Banco do Brasil X Bradesco | São boletos gerados em Ambiente Cielo. Todos os bancos deixaram de gerar esses boletos até 2020 | Api Cielo E-commerce & Checkout Cielo |

## Sobre Débito online e Cielo

O Débito Online é uma transferência eletronica que ocorre dentro do Ambiente Bancario.
O Comprador acessará via a loja o Ambiente do Banco e realizará uma transferência para a conta da loja onde a transação ocorre.

Para utilizar o Débito Online, é necessario que o banco do lojista permita tal operação para a conta do lojista.

# Boletos

## Bradesco

Os critérios para utilizar o Boleto Bradesco Com. Eletrônico são:

* Ser correntista Bradesco Pessoa Jurídica;
* Contatar o gerente de conta Bradesco para assinar contrato específico do Comércio Eletrônico.

Para solicitar/configurar o Boleto Bradesco, você precisa:

1. Contatar o banco/agência e fazer a solicitação de boleto com registro carteira 26. Esse passo envolve assinatura de contrato com o Banco.
2. Receber um e-mail do Banco (Kit Scopus) com URL do gerenciador, e-mail de login e senha de acesso ao ambiente Bradesco.  Você deve acessar o ambiente Bradesco pela URL do gerenciador. Veja os exemplos enviados no email (Kit Scopus):
  * **URL do gerenciador** - (https://meiosdepagamentobradesco.com.br/gerenciador/login.jsp)
  * **E-mail de Login**
  * **Senha de acesso**

Para configurar o Boleto:

**1.** No ambiente Bradesco, acesse as abas CONFIGURAÇÕES > MEIOS DE PAGAMENTO > BOLETO e preencha os seguintes dados:

* **Habilitar "frase" do boleto**: Inativo
* **Habilitar "referência" do boleto**: Ativo
* **Apresentar Agência e Conta**: Inativo
* **Vencimento**: 5 dias

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-2.png)

<aside class="notice"><strong>Obs:</strong> O vencimento deverá ser o mesmo configurado no Checkout Cielo.</aside>

* **URL de notificação**: https://www.pagador.com.br/post/BoletoBradescoSps/ReceivePost
* No campo **Chave de Segurança** clique em "**Gerar chave de segurança**"
* **Endereço de IP da loja**  (numérico)
* Para os campos de **URL de resposta, URL de falha e URL de redirecionamento**, inserir o seguinte link: `https://www.pagador.com.br/post/BoletoBradescoSps/ReceivePost`

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-3.png)

**2.** Em cada um dos três Paramêtros a seguir, preencher com o Parâmetro de Comunicação abaixo:

* **Parâmetro de notificação**:
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`
* **Parâmetro de confirmação**:
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`
* **Parâmetro de falha**:
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`
* **Paramêtro de Comunicação**
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-4.png)

<aside class="notice"><strong>Obs:</strong> Não podem existir espaços ou quebras de texto nos parâmetros expostos acima.</aside>

**3.** Clique no botão "**Gravar todas as configurações realizadas**"

**Concluída essa etapa, você deve:**

**1.** Encaminhar um e-mail para Cielo e-Commerce [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br) com os seguintes dados:

* **Agência**: 0000
* **Conta**: 0000000 (7 dígitos sem o dígito verificador, mantendo os zeros à esquerda conforme exemplo: 0001111
* **Convênio**: 000000
* **Carteira**: 26 – COM REGISTRO
* **Vencimento** (contado em dias):
* **Conciliação** (Afiliação do Bradesco):
  * Exemplo de Conciliação: 004601478
* **Chave de Segurança** (Bradesco):
  * Exemplo de Chave de Segurança: `ZDE50B48D41D59BDD1562CC2A48546454ZC149308CBD283E0E49210C57958A6A38A068A3ZZA8B075095A1B9E1DEAZB64BF1682C5610ZC8285DC8630FA6E300FA00B9D43054C84ACA958ZCFB435CF5A27ZC440637777EBAFEED1BCZDCA82D5778B266B3BB4E90774302D56A0C7EDZZ1A532A51F7A889DA83AEFA08CA4E91A08Z2`

<aside class="notice"><strong>Obs:</strong> A afiliação do Bradesco está localizada no topo do gerenciador web.</aside>

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-5.png)

**2.** O Cielo e-Commerce confirmará, em até 3 dias, a inclusão do boleto como forma de pagamento da sua loja online.

## Banco do Brasil

Os critérios para habilitar a opção de Boleto Banco do Brasil são:

* Ser correntista Banco do Brasil Pessoa Jurídica;

Para solicitar o Boleto Banco do Brasil, você precisa:

1. Contatar o banco/agência e fazer a solicitação de boleto sem registro carteira 18. Esse passo envolve assinatura de contrato com o Banco
2. Encaminhar um e-mail para Cielo e-Commerce [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br) com os seguintes dados:
  * **Agência**: 0000
  * **Conta Corrente**: 00000-0
  * **Convênio**: 0000000
  * **Vencimento** (contado em dias):
  * **Carteira**: 18 - SEM REGISTRO

<aside class="notice">**Validade do Boleto** – Caso o boleto expire em um dia não útil, como sábado, ele será válido até o próximo dia útil</aside>

# Débito online

## Bradesco

1. Solicitar ao seu gerente a liberação do débito online do Bradesco (SPS Bradesco). A afiliação será enviada pelo Bradesco no padrão:
  * **Convênio de homologação**: 101xx1
  * **login**: dm_cm132
  * **senha**: 12345678
  * **Assinatura**: `8EA7657E-6373-667D-0229-A82E842A3A1A`

2. Ao receber estas informações o lojista deverá Solicitar a habilitação do meio de pagamento para Cielo.

3. Cadastrar no MUP Teste (sistema do Bradesco, o e-mail de com os dados do Bradesco virá com a URL para acesso). Cadastrar as informações abaixo:
  * **Endereço IP da loja**: 209.134.48.121
  * Em “*Página de confirmação de compra*” e “*Página de falha no pagamento*”: https://www.pagador.com.br/pagador/recebe.asp
  * Em “*URL para notificação p/ Cartões Bradesco*”: https://www.pagador.com.br/pagador/bradesco/setTransacao.asp
  * Nos Campos “*Post a ser enviado para a loja na notificação*”, “*Post a ser enviado para a loja na confirmação de compra*” e “*Post a ser enviado para a loja na falha da autorização*”:
        * **Adicionar**: `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&tipopagto=[%tipopagto%]&assinatura=[%assinatura%]`
  * Em “*URL de entrada na loja*”: endereço do site
  * Em “*URL do gerenciador da loja*”: https://www.pagador.com.br/admin/login.asp
  * Na última opção:  `capture now (1001)`.

4. Enviar o e-mail abaixo para a Scopus solicitando a homologação
  * **Para**: [homologacao@scopus.com.br](mailto:homologacao@scopus.com.br); [kit@scopus.com.br](mailto:kit@scopus.com.br)
  * **Assunto**: Dados do ambiente de produção Débito SPS
  * **Corpo do email**:<br />Prezados,<br /><br />Favor liberar o cliente abaixo no ambiente de produção:<br /><br />Razão Social: XXXXX<br />CNPJ: XXXX<br />Nome da loja: XXXXX<br />Número da loja: XXXXX<br />Manager: XXXXX<br />Senha: XXXXXXX<br />URL da Loja: https://www.XXXXXXXXX<br />Meio de Pagamento para Homologar: Débito em Conta<br />

5. Receber os dados de produção:
  * A afiliação será enviada pelo Bradesco no padrão:
        * **Convênio de Produção**: 101xx1
        * **login**: dm_cm132
        * **senha**: 12345678
        * **URL para teste**: http://mup.comercioeletronico.com.br/sepsManager/senha.asp?loja=XXXX

6. Cadastrar no MUP Produção, as mesmas informações do Passo 3.

7. Solicitar à Cielo para atualizar o número de Convênio para número de produção que recebeu no passo 5.

## Banco do Brasil

Solicite ao seu gerente do banco a liberação do convênio do débito online via internet (**Comércio eletrônico Banco do Brasil - BBPAG**) e o cadastramento da URL de comunicação com a Cielo.

* **URL de Comunicação**: [https://www.pagador.com.br/](https://www.pagador.com.br/)

A URL deve ser cadastrada pelo **Gerente no ato da liberação do convênio**.

<aside class="warning">Se o cadastro não ocorre, a transação não será viavel.</aside>

* **Exemplo de convênio**: Convênio: 000000
