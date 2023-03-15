---
layout: tutorial
title:  Configuring Boletos and Online Debit
search: true
toc_footers: true
categories: tutorial
tags:
  - Additional documents
---

# Payment methods

## About this manual

This manual has the purpose of orienting the **RETAILER** on the BOLETOs and ONLINE DEBITs hiring and configuration available on the **CIELO CHECKOUT** and on the **Cielo Ecommerce API**

## About Boletos and Cielo

The Cielo e-Commerce solutions support two types of Boletos from the **Bradesco** and **Banco do Brasil** banks:

| Boleto type            | Bank                      | Description                                                                                            | Cielo solution                         |
|---------------------------|----------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Registered Boleto**     | Banco do Brasil X Bradesco | Are boletos emitted inside the Banking environment. Cielo will send the information to the emitting bank. It is required to have the credentials provided by the Bank for the functionality use. | Cielo E-commerce Api & Cielo Checkout  |
| **Non-registered Boleto** | Banco do Brasil X Bradesco | Are boletos generated within Cielo Environment. All banks will no longer generate these boletos until 2020 | Api Cielo E-commerce & Checkout Cielo |

## About Online debit and Cielo

Online Debit is an online transfer that occurs inside the Banking Environment.
The Buyer will access via store the Bank Environment and will perform a transfer to the store account where the transfer occurs.

In order to use the Online Debit, it is required that the retailer bank allows such operation to the retailer account.

# Boletos

## Bradesco

The criteria to use the Bradesco Boleto Electronic Com. are:

* Being a Bradesco Legal Person accountholder;
* To contact the Bradesco account manager to sign specific contract with Electronic Commerce.

To request/configure the Bradesco Boleto, you’ll have to:

1. Contact the bank/agency to perform the boleto solicitation with wallet 26 register. This step involves contract signature with the Bank.
2. Receiving an e-mail from the Bank (Kit Scopus) containing the manager URL, login e-mail and Bradesco environment access password. You must access the Bradesco environment through the manager URL. Check the examples sent on the e-mail (Kit Scopus):
  * **Manager URL** - (https://meiosdepagamentobradesco.com.br/gerenciador/login.jsp)
  * **Login E-mail**
  * **Access Password**

To configure the Boleto:

**1.** On Bradesco environment, access the tabs CONFIGURAÇÕES > MEIOS DE PAGAMENTO > BOLETO and fill the following data:

* **Enable boleto "phrase"**: Inactive
* **Enable boleto "reference"**: Active
* **To present Agency and Account**: Inactive
* **Expiration**: 5 days

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-2.png)

<aside class="notice"><strong>Observation:</strong> The expiration will have to be the same configured on Cielo Checkout.</aside>

* **Notification URL**: https://www.pagador.com.br/post/BoletoBradescoSps/ReceivePost
* On the field **Security Key** click on "**Generate Security Key**"
* **Store's IP Address**  (numeric)
* For the **answer URL, failure URL and redirectioning URL** fields, insert the following link: `https://www.pagador.com.br/post/BoletoBradescoSps/ReceivePost`

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-3.png)

**2.** In each of the following three parameters, fill up with the Communication Parameter below:

* **Notification Parameter**:
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`
* **Confirmation parameter**:
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`
* **Failure parameter**:
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`
* **Communication parameter**
  * `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-4.png)

<aside class="notice"><strong>Observation:</strong> There can be no spaces or text breaks on the parameters exposed above.</aside>

**3.** Click on the button "**Save all configuration made**"

**Once you have finished this stage, you must:**

**1.** Forward an e-mail to Cielo e-Commerce [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br) with the following data:

* **Agency**: 0000
* **Account**: 0000000 (7 digits without the verifying digit, keeping the zeros to the left like on the example: 0001111
* **Agreement**: 000000
* **Wallet**: 26 – WITH REGISTER
* **Expiration** (counted in days):
* **Conciliation** (Bradesco Affiliation):
  * Conciliation example: 004601478
* **Security Key** (Bradesco):
  * Security Key example: `ZDE50B48D41D59BDD1562CC2A48546454ZC149308CBD283E0E49210C57958A6A38A068A3ZZA8B075095A1B9E1DEAZB64BF1682C5610ZC8285DC8630FA6E300FA00B9D43054C84ACA958ZCFB435CF5A27ZC440637777EBAFEED1BCZDCA82D5778B266B3BB4E90774302D56A0C7EDZZ1A532A51F7A889DA83AEFA08CA4E91A08Z2`

<aside class="notice"><strong>Observation:</strong> Bradesco affiliation is located on the top of the web manager.</aside>

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-5.png)

**2.** Cielo e-Commerce will confirm, in up to 3 days, the inclusion of boleto as a payment method on your store.

## Banco do Brasil

To criteria to enable the Banco do Brasil Boleto option are::

* Being a Banco do Brasil Legal Person accountant;

To request the Branco do Brasil Boleto, you’ll have to:

1. Contact the bank/agency and perform the boleto solicitation without wallet 18 register. This step involves contract signature with the Bank.
2. Forward an e-mail to Cielo e-Commerce [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br) with the following data:
  * **Agency**: 0000
  * **Current Account**: 00000-0
  * **Agreement**: 0000000
  * **Expiration** (counted in days):
  * **Wallet**: 18 - WITHOUT REGISTER

<aside class="notice">**Boleto expiration** – In case the boleto expires in a non-business day, like Saturday, it will be valid until the next business day</aside>

# Online Debit

## Bradesco

1. Requesting to your manager the release of Bradesco online debit (SPS Bradesco). The affiliation will be send through Bradesco on the standard:
  * **Homologation Agreement**: 101xx1
  * **login**: dm_cm132
  * **password**: 12345678
  * **Signature**: `8EA7657E-6373-667D-0229-A82E842A3A1A`

2. When receiving these information, the retailer will have to Request the enabling of the payment method to Cielo.

3. Register on MUP Test (sistema do Bradesco, the e-mail containing the Bradesco data will come with the URL for access). Register the information below:
  * **Store IP address**: 209.134.48.121
  * On “*Página de confirmação de compra*” and “*Página de falha no pagamento*”: https://www.pagador.com.br/pagador/recebe.asp
  * On “*URL para notificação p/ Cartões Bradesco*”: https://www.pagador.com.br/pagador/bradesco/setTransacao.asp
  * On the “*Post a ser enviado para a loja na notificação*”, “*Post a ser enviado para a loja na confirmação de compra*” and “*Post a ser enviado para a loja na falha da autorização*” Fields:
        * **Add**: `numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&tipopagto=[%tipopagto%]&assinatura=[%assinatura%]`
  * In “*URL de entrada na loja*”: website address
  * In “*URL do gerenciador da loja*”: https://www.pagador.com.br/admin/login.asp
  * On the last option:  `capture now (1001)`.

4. Send the e-mail below to Scopus requesting the homologation 
  * **To**: [homologacao@scopus.com.br](mailto:homologacao@scopus.com.br); [kit@scopus.com.br](mailto:kit@scopus.com.br)
  * **Subject**: Dados do ambiente de produção Débito SPS
  * **e-mail Body**:<br />Dear,<br /><br />Please release the client below on the production environment:<br /><br />Social Name: XXXXX<br />CNPJ: XXXX<br />Store name: XXXXX<br />Store number: XXXXX<br />Manager: XXXXX<br />Password: XXXXXXX<br />Store URL: https://www.XXXXXXXXX<br />Payment Method to Homologate: Debit in account<br />

5. Receive the production data:
  * The affiliation will be sent through Bradesco on the standard:
        * **Production Agreement**: 101xx1
        * **login**: dm_cm132
        * **password**: 12345678
        * **URL for test**: http://mup.comercioeletronico.com.br/sepsManager/senha.asp?loja=XXXX

6. Register on Production MUP, the same information of Step 3.

7. Request Cielo to update the Agreement number for the production number received on step 5.

## Banco do Brasil

Request your bank manager the releasing of the online debit via Internet agreement (**Banco do Brasil Electronic commerce - BBPAG**) And the registering of the communication URL with Cielo.

* **Communication URL**: [https://www.pagador.com.br/](https://www.pagador.com.br/)

The URL must be registered by the **Manager on the act of agreement releasing**.

<aside class="warning">If the register does not occur, the transaction won’t be viable.</aside>

* **Agreement example**: Agreement: 000000
