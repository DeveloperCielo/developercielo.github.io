---
layout: redirect
redirect: https://docs.cielo.com.br/conectores/docs/nuvemshop
title: Integração Nuvemshop
description: Integração Nuvemshop
search: true
translated: true
categories: manual
sort_order: 6
tags:
  - 1. API E-commerce
---

<aside class="warning"> O conteúdo deste manual foi descontinuado e não é atualizado desde 14/08/2024. Acesse o novo portal.</aside>

# As documentações do conector para Nuvemshop estão em um novo portal

[![Novo portal de desenvolvedores e-commerce Braspag e Cielo]({{ site.baseurl_root }}/images/apicieloecommerce/novo-docs.cielo.com.br.png)](https://docs.cielo.com.br/conectores/docs/nuvemshop)

Acesse o novo portal de desenvolvedores E-commerce **[docs.cielo.com.br](https://docs.cielo.com.br)**.

> **Atenção**: O conteúdo desta página está sendo descontinuado e não receberá atualizações a partir de 14/08/2024. Visite a nova documentação em [docs.cielo.br](https://docs.cielo.com.br/conectores/docs/nuvemshop).

--------------------------------------------------------------------------------------------------------------------------

<aside class="warning"> O conteúdo a seguir não é atualizado desde 14/08/2024.</aside>

# Integração Nuvemshop

A Cielo desenvolveu um conector na plataforma **Nuvemshop** para realização do pagamento através da API Ecommerce Cielo. A usabilidade da plataforma deve ser consultada no portal da [Nuvemshop](https://atendimento.nuvemshop.com.br/){:target="_blank"}.

Para usar o conector, é necessário ter um contrato com a [Cielo](https://minhaconta2.cielo.com.br/site/login){:target="_blank"} e assegure que você possui os dados **MerchantID** e **MerchantKey**, que foram fornecidos no momento do seu cadastro. Se ainda não possuir contrato com a Cielo, acesse [Lojista sem cadastro Cielo](https://developercielo.github.io/manual/integracao-nuvemshop#lojista-sem-cadastro-cielo).

Caso necessite recuperar essas informações, consulte [esse documento](https://developercielo.github.io/attachment/merchantid-merchantkey-cielo-2023.pdf){:target="_blank"}. 

# Configuração

Acesse a página de administração da sua loja (https://*NomeLoja*.lojavirtualnuvem.com.br/admin) e comece a navegação por **Potencializar** > **Meus aplicativos** > **Ver todos os aplicativos** > Navegue na página até Cielo e clique em **Instalar**. Você também pode usar um caminho alternativo, começando por **Configuração** > **Meios de Pagamento** > Navegue na página até Cielo e clique em **Configurar**.

Para editar o aplicativo Cielo, siga os mesmos passos acima e clique em **Editar**.

## Cadastro

Se não possui cadastro Cielo, siga as instruções para fazer o cadastro. Se já possui, faça login.

![Tela inicial de cadastro]({{ site.baseurl_root }}/images/modulos/nuvemshop/01inicial.png)

### Lojista sem cadastro Cielo

Se ainda não possui cadastro Cielo, selecione a opção **Ainda não é cliente Cielo?**. Na página seguinte selecione a opção **Criar Agora** e preencha os dados requisitados.

Entre em contato com a nossa central para continuar o onboarding e forneça informações de cadastro para Pessoa Física ou Pessoa Jurídica.

### Lojista com cadastro Cielo

Se já possui cadastro Cielo, selecione a opção **Já é cliente Cielo?**. Na página seguinte selecione **Ative Aqui** e **Faça login na Nuvemshop**.

Ao fazer login na plataforma Nuvemshop, a tela de configuração do aplicativo será exibida.

![Cadastrados Cielo]({{ site.baseurl_root }}/images/modulos/nuvemshop/02clientecielo.png)

![Login Cielo]({{ site.baseurl_root }}/images/modulos/nuvemshop/03login.png)

## Preenchendo os dados da integração

Informe as credenciais `MerchantID` e `MerchantKey`. Caso necessite recuperar essas informações, consulte [esse documento](https://developercielo.github.io/attachment/merchantid-merchantkey-cielo-2023.pdf){:target="_blank"}.

![Dados integração]({{ site.baseurl_root }}/images/modulos/nuvemshop/04integracao.png)

|CAMPO|DESCRIÇÃO|
|--|--|
|`MerchantID`|Identificador da loja na API E-commerce Cielo.|
|`MerchantKey`|Chave da loja para acesso à API E-commerce Cielo.|

## Meios de pagamento

Ative os meios de pagamento que deseja exibir como opções possíveis na tela de checkout.

### Boleto

Para que nossa integração atualize os status do pagamento, siga as orientações do [Manual Boletos](https://developercielo.github.io/tutorial/manual-boleto#concilia%C3%A7%C3%A3o-manual-de-boletos){:target="_blank"}.

Solicite ao nosso atendimento a inclusão da URL de notificação da seguinte forma:

**Destinatário**: cieloecommerce@cielo.com.br<br>
**Assunto**: [Nuvemshop] Atualizar URL de notificação<br>
**Texto**: [insira o texto abaixo]

> Favor atualizar na loja EC (insira número EC da loja) a seguinte URL: https://cielo-nuvemshop.herokuapp.com/api/v1/webhooks/cielo/orders<br>Habilitar a notificação para: <br> - Transações de cartão (crédito ou débito) capturadas <br> - Transações de cartão (crédito ou débito) canceladas <br> - Transações de boleto conciliadas <br> - Transações de Pix atualizadas

<aside class="notice">A inclusão de URL de notificação também se aplica aos outros meios de pagamento e Pix pode ser solicitado uma única vez.</aside>

#### Conciliação manual de boletos

Para conciliar o boleto de forma manual, localize o pedido no site Cielo e dentro dos **Detalhes da Transação** localize o botão **Conciliar**.

Desta forma o pedido terá o status alterado de **Não Pago** para **Pago**.

### Cartão de crédito

A opção Cartão de Crédito vem selecionada e não será possível retirar esse meio de pagamento do checkout. 

|CAMPO|DESCRIÇÃO|
|-|-|
|Quantidade de Parcelas|Número de parcelas que deseja aceitar no pedido. Insira 1 se não deseja habilitar parcelas.|
|Valor mínimo da Parcela|Valor mínimo em que o pedido pode ser dividido em cada parcela.|
|Nome da Loja (exibido na fatura)|Informação apresentada na fatura do cartão do comprador. Não aceita caracteres especiais. Apenas 13 caracteres.|

<aside class="notice">O pagamento com cartão de crédito só é possível para pedidos a partir de R$1,00. Se o valor for inferior, o pagamento deve ser realizado com boleto ou pix.</aside>

### Pix

Solicite ao nosso atendimento inclusão URL de notificação da seguinte forma: 

**Destinatário**: cieloecommerce@cielo.com.br<br>
**Assunto**: [Nuvemshop] Atualizar URL de notificação<br>
**Texto**: [insira o texto abaixo]

> Favor atualizar na loja EC (insira número EC da loja) a seguinte URL: https://cielo-nuvemshop.herokuapp.com/api/v1/webhooks/cielo/orders<br>Habilitar a notificação para: <br> - Transações de cartão (crédito ou débito) capturadas <br> - Transações de cartão (crédito ou débito) canceladas <br> - Transações de boleto conciliadas <br> - Transações de Pix atualizadas

<aside class="notice">A inclusão de URL de notificação também se aplica aos outros meios de pagamento e Pix pode ser solicitado uma única vez.</aside>

<aside class="warning">A Cielo não permite contratação de Pix Pessoa Física.</aside>
