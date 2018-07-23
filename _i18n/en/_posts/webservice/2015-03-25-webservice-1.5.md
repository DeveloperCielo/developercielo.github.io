---
layout: manual
title: Integration Manual
description: O objetivo desta documentação é orientar o desenvolvedor sobre como integrar com a solução Webservice da Cielo, descrevendo as funcionalidades, os métodos a serem utilizados, listando informações a serem enviadas e recebidas, e provendo exemplos.
search: true
translated: true
categories: manual
tags:
  - Webservice 1.5
language_tabs:
  - xml: XML
---

# Webservice integration 1.5

The purpose of this documentation is to orientate the developer about how integrate with Cielo Webservice, describing its functionalities, the methods to be used, list information to be sent and received and provide examples.

The integration mechanism with Cielo E-commerce is simple, so that are necessary only an intermediate knowledge in programming language for Web, HTTP/HTTP requisitions and handling XML archive to implant Cielo E-commerce solution with success.

Importantly to use this platform, the website must comply with safety rules or use the PCI certification. For questions about web security, please send email to: [Segurança Web](mailto:e-seg@cielo.com.br).

After conclude the registration and receive the instructions, you need to develop the integration using this documentation as a guide. Once the integration is completed, it’s necessary to fill the homologation form fully and then send it to Cielo E-commerce Web Support that will inform the secure key to the establishment.

Finally, after the development, to start the operation on production environment, first, it's necessary start the homologation at Cielo.

<aside class="notice">Look at section <a href="#testing-and-homologation">Testing and homologation</a> to more instruction about the homologation process</aside>

## Cielo Support

After reading this documentation, if you still have questions (technical or not), you can check Cielo technical support 24 hours per day, 7 days of week, in Portuguese and English, in the following contacts:

* +55 4002-9700 – *Capitals and Metropolitan regions*
* +55 0800-570-1700 – *Others localities*
* +55 11 2860-1348 – *International*
  * Option 1: *Technical support*
  * Option 2: *E-commerce credential*
* Email: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)

## Glossary

To facilitate the understanding, we listed below a small glossary with the main terms related to e-commerce, card market and acquiring services:

* **Authentication**: process to ensure that the buyer is really who says (authentic holder), generally it happens at the issuing bank using the digital token or security key card.
* **Authorization**: process to verify if a purchase can be realized or not with a card. In this moment several verification are done with the card and the holder (Funds availability, blocked account, blockades, etc), It's also in this moment that the card limit is cross-checked with the transaction value.
* **Cancellation**: process to cancel the purchase that has been realized with card.
* **Capture**: process to confirm the authorization that has been realized previously. Only after the capture, the cardholder can check this in his bank statement or invoice.
* **Key access**: it's a specific secure code for each store, created by Cielo, and used to realized an authentication and communication in all messages exchanged with Cielo. It's also known as production key and data key.
* **Buyer**: who effectives the purchase at online store.
* **Emitter** (or Issuing Bank): it's the financial institution that issues credit card, debt or voucher.
* **Commercial establishment or EC**: entity that responses for online store.
* **Payment gateway**: company responsible for technical integration and for processing transactions.
* **Credential number**: it's an identifier number that the retailer receives after registered at Cielo.
* **Holder**: it's the person who carries the card in the moment of purchase.
* **Security Code**: international program of MasterCard to allow the buyer authentication in the moment of purchase in e-commerce environment.
* **TID (Transaction Identifier)**: a code composed by 20 characters that identifies only Cielo E-commerce transactions.
* **Transaction**: it's the purchase order to cardholder at Cielo.
* **VBV (Verified by Visa)**: International Program at Visa that allows the buyer authentication in the moment of purchase in e-commerce environment.

<aside class="notice">Access http://www.mastercard.com.br/securecode to more details about SecureCode</aside>
<aside class="notice">Access http://www.verifiedbyvisa.com.br to more details about VBV</aside>

## Products and Card Issuers supported

The current version of Cielo Webservice has support to the following products and card issuers:

|Card Issuer|Lump Sum|Credit card installments|Debt|Voucher|
|---|---|---|---|---|
|Visa|Yes|Yes|Yes|*No*|
|Master Card|Yes|Yes|Yes|*No*|
|American Express|Yes|Yes|*No*|*No*|
|Elo|Yes|Yes|*No*|*No*|
|Diners Club|Yes|Yes|*No*|*No*|
|Discover|Yes|*No*|*No*|*No*|
|JCB|Yes|Yes|*No*|*No*|
|Aura|Yes|Yes|*No*|*No*|
|Hipercard|Yes|Yes|*No*|*No*|

# Extended Validation Certificate

## What is SSL Certificate?

The Extended Validation Certificate for web server offers authenticity and integrity of data from a web site, provides customers of virtual stores the guarantee that they are actually accessing the site they want, and not a fraudster site.

Specialized companies are responsible for making domain validation and depending on the type of certificate, also the owner of the domain entity.

## What is EV SSL Certificate?

The EV Certificate was released in the market recently and ensures a higher level of security for customers of online stores.

It is a certificate of greater confidence and when https is accessed, the address bar turns green, giving more reliability to site visitors.

### Internet Explorer:

![Certificado EV Internet Explorer]({{ site.baseurl_root }}/images/certificado-ie.jpg)

### Firefox

![Certificado EV Firefox]({{ site.baseurl_root }}/images/certificado-firefox.jpg)

### Google Chrome

![Certificado EV Google Chrome]({{ site.baseurl_root }}/images/certificado-chrome.jpg)

## How to install the Extended Validation Certificate on the Store server?

Just install the following three files in the server Trustedstore. Cielo does not offer support to the installation of the Certificate. If you are unsure about how to install the EV Certificate, then you should contact your server vendor support.

* [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
* [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
* [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

## Step by Step Installation

### INSTALLATION ON THE SERVER OF ONLINE STORE

To install the EV Certificate you shall contact your server vendor support.

<aside class="warning">Cielo does not support the installation of the certificate.</aside>

### CUSTOMER ACCESS TO ONLINE STORE

Normally, the browser makes a Certificate update automatically, in  case of failure and client contacted you to inform it, follow the steps:

#### 1st STEP:

Save the files below into a new folder, or recall easily to be used later:

* [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
* [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
* [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
* [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

#### 2nd STEP:

In the "Internet Explorer", click on "Tools" menu and access the "Internet Options":

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-1.jpg)

In the "Firefox" browser, click on "Open Menu" and go to "Advanced" and "Options":

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-1.jpg)

In "Chrome", click on  "Customize and control Google Chrome" and go to "Settings" and "Show advanced settings ..." “Change Proxy Settings” and "Content" and Certificates:

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-1.jpg)

#### 3rd STEP:

In Internet Explorer, on "Certificates", click "Import".

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-2.jpg)

In Firefox click "View Certificates", click "Import"

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-2.jpg)

In Chrome click "Manage Certificates", click "Import"

![Instalar GC]({{ site.baseurl_root }}/images/certificado-instalar-gc-2.jpg)

#### 4th STEP:

In Internet Explorer and in Chrome, "Certificate import wizard", click "Next"

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-3.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-4.jpg)

In Firefox "Abba servers," click "Import"

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-3.jpg)

#### 5th STEP:

In Chrome and Internet Explorer "Certificate Import Assistent", click "Browse", find the folder where the files are and select the file "ecommerce.cielo.com.br.crt, click" Open "and then" Advance".

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-5.jpg)

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-6.jpg)

#### 6th STEP:

Select the desired option: add the certificate in a default folder or browse to the folder of your choice.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-7.jpg)

#### 7th STEP:

Click "Finish".

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-8.jpg)

#### 8th STEP:

Click "Ok" to complete the import.

![Instalar IE e GC]({{ site.baseurl_root }}/images/certificado-instalar-ie-gc-9.jpg)

<aside class="notice">At Firefox does not appear the message “Import Successfully”, it just completes the import.</aside>

The certificate can be viewed in the default tab "Others" or chosen by the customer.

#### 9th STEP:

Repeat the same procedure for the 3 uploaded files.

### Questions:

If you have questions at any stage or other technical information, contact the Support Web Cielo e-Commerce in the following channels:

* **Email:** [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
* **Metropolitan region:** 4002-9700
* **Other Cities:** 0800 570 1700

Hours: 24 hours a day, 7 days a week.

# Overview

In this documentation we will be present an overview of Cielo E-commerce and the technical mechanism of Webservice integration format (named in the previous version as "Buy Page Loja").

To more information about integration at Checkout Cielo format (named in the previous versions as Buy Page Cielo or Integrated Solution) access: [https://www.cielo.com.br/ecommerce](https://www.cielo.com.br/ecommerce).

For all purchase orders, the purpose is convert it in a sale. A sale using a card can be characterized as an authorized and captured transaction.

<aside class="warning">An authorized transaction only creates credit to the retailer if it can be captured (or confirmed).</aside>

## Solutions characteristics:

The Webservice solution at Cielo E-commerce platform has been developed based on XML technology, a market pattern and independent of technologies used by our customers. In this way, it's possible to integrate it by using the various programing languages, like: ASP, ASP.NEt, Java, PHP, Ruby, Python, etc.

Among others characteristics, the most highlighted attributes of Cielo E-commerce platform are:

* **No proprietary application**: it's not necessary to install application at online store environment in any case.
* **Simplicity**: the protocol used is purely HTTP, without necessity of using SOAP.
* **Registering facility**: the customer's credential information (affiliation number and access key) transits in common fields of XML, without necessity of special attributes, as SOAP Header.
* **Security**: the information exchange always happens between the Store Server and Cielo, in other words, without the buyer’s browser.

## Consideration about integration

* All the Web Service requests at Cielo must contain a retailer's link authentication, composed by credential number and access key.
* The store registration must be active on Cielo.
* You must define appropriate deadline ton HTTP requests to Cielo, we recommend 30 seconds.
* The Root certificate of certifier entity (CA) of our Web Service must be registered on Truststore that will be used. Because our certifier has a wider market acceptance, probably this is already registered on Truststore of own operational system.
* We make available the ecommerce.xsd archive on integration kit to make easier the validation format restriction, size field, types and data domains.
* In all messages of data/hour you have to follow the format: yyyy=MM=ddTHH24:mm:ss. Example: 2011-12-21T11:32:45.
* The monetary value is always handled as intire values, without representation of decimals place, in such case the last two digits are considered as “centavos”. Example: R$ 1.286,87 is represented as 128687; R$ 1,00 is represented as 100.

<aside class="notice">Look the Digital Certificate to information about Cielo Certificates:</aside>

## Architecture

The integration is realized through the available services as Web Services. The model employed is quite simple: there is an unique URL (endpoint) that receives the POSTs via HTTPs and, depending of XML format sent, a specific operation is realized.

The Web Service request is summarized for:

* The message in XML format, defined according to the functionality.
* The destiny (testing environment or production).
* The return on XML format, can be: `<transacao/>`, `<retorno-token>` or `<erro/>`.

```
POST /servicos/ecommwsec.do HTTP/1.1
Host: ecommerce.cielo.com.br
Content-Type: application/x-www-form-urlencoded
Content-Length: length
mensagem=<?xml version="1.0" encoding="ISO-8859-1"?><requisicao-captura id="3e22bdd0-2017-4756-80b7-35a532e6c973" versao="1.2.1"><tid>10069930690101012005</tid><dados-ec><numero>1006993069</numero><chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave></dados-ec><valor>3880</valor></requisicao-captura>
```

## Transaction

The main element on Cielo E-commerce is the transaction, created from a HTTP request to Cielo Webservice. The unique identification of Cielo transactions is done through TID field, that is present at message's return of authorization. This field is essential to realize inquires, captures and cancellations.

From transaction creation, it can assume the following status:

![status transações]({{ site.baseurl_root }}/images/status.png)

The transition of status can be realized through the message exchange between the store and Cielo, or automatically, for example, when an authorized transaction capture deadline expires.

# Creating transactions

Every transaction on Cielo E-commerce starts through a POST (HTTPS) to Webservice at Cielo with a XML message `<requisicao-transacao>`, which group of TAGS defines a transaction configuration:

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <indicador>1</indicador>
    <codigo-seguranca>973</codigo-seguranca>
    <token/>
  </dados-portador>
  <dados-pedido>
    <numero>178148599</numero>
    <valor>1000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor/>
    <taxa-embarque/>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>A</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>1</autorizar>
  <capturar>false</capturar>
  <campo-livre>Informações extras</campo-livre>
  <bin>455187</bin>
  <gerar-token>false</gerar-token>
  <avs>
  <![CDATA[
    <dados-avs>
      <endereco>Rua Teste AVS</endereco>
      <complemento>Casa</complemento>
      <numero>123</numero>
      <bairro>Vila AVS</bairro>
      <cep>12345-123</cep>
      <cpf>11111111111</cpf>
    </dados-avs>
  ]]>
  </avs>
</requisicao-transacao>
```

<aside class="notice">All messages must be formatted correctly according to specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema ecommerce.xsd</a></aside>

### ROOT Node

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|[dados-ec](#dados-ec)|n/a|Yes|n/a|Establishment data|
|[dados-portador](#dados-portador)|n/a|Yes|n/a|Holder data|
|[dados-pedido](#dados-pedido)|n/a|Yes|n/a|Order data|
|[forma-pagamento](#forma-pagamento)|n/a|Yes|n/a|Payment-method|
|url-retorno|alphanumeric|Yes|1..1024|URL of return's page. This page is that one used by Cielo to direct the browser in the end of authentication or authorized. It's not only mandatory  for a direct authorization, but the field must be inserted as `null`.|
|capturar|Boolean|Yes|n/a|`true` or `false`. Define if a transaction will be captured automatically in case of being authorized.|
|campo-livre|alphanumeric|optional|0..128|Free field available to the establishment.|
|bin|numeric|optional|6|Six first card numbers.|
|gerar-token|Boolean|optional|n/a|`true` ou `false`. Define if the current transaction must create an associate token to card.|
|avs#avs|alphanumeric|optional|n/a|String containing a XML block, encapsulated by CDATA, containing required information to realized a service consult.|

### dados-ec

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|numero|numeric|Yes|1..20|Affiliation number of Store with Cielo.|
|chave|alphanumeric|Yes|1..100|Store's access key attributed by Cielo.|

### dados-portador

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|numero|numeric|Sim|19|Card number|
|validade|Numénumericrico|Sim|6|Card validity of format: yyyymm. Example: 201212 (dec/2012).|
|indicador|numeric|Sim|1|Card validity of Secure Code Sending: **0** - Not informed, **1**- informed, **2**-illegible, **9**- Inexistent|
|codigo-seguranca|numeric|Condicional|3..4|Security code is required when indicator is **1**|
|nome-portador|alphanumeric|Opcional|0..50|Holder name|
|token|Alfanumérico|Conditional|0..100|Token must be used in replacement to card data to direct authorization or recurrent. It's not allowed to send a token with the card information in the same transaction.|

### dados-pedido

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|numero|Alphanumeric|Yes|1..20|Order number of store. **We recommend just one number per order.**|
|valor|Numeric|Yes|1..12|Amount to be charged on the order (must be also included shipping costs, package, extras costs, boarding fees, etc). This amount will be charged from customer.|
|moeda|Numeric|Yes|3|Numeric code of currency at norm ISO 4217. **For "Real", the code is 986.**|
|data-hora|Alphanumeric|Yes|19|Data hour of order. **Format**: yyyy-MM-ddTHH24:mm:ss|
|descricao|Alphanumeric|Optional|0..1024|Order description|
|idioma|Alphanumeric|Optional|2|Order language: PT (Portuguese), EN (English) or ES (Spanish). Based on this information the language is defined used on Cielo' screens. **If it won't be sent, the system will assume "PT".**|
|taxa-embarque|Numeric|Optional|1..9|Amount of authorization value that must be destined to boarding fee.|
|soft-descriptor|Alphanumeric|Optional|0..13|Text until 13 characters that will be shown on holder's invoice, after the Commercial Establishment name.|

<aside class="notice">The customer register will be enable to transact only with REAL currency, in case you need more information, contact the service center, commercial manager or Cielo E-commerce Web Support</aside>

### forma-pagamento

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|bandeira|Alphanumeric|Yes|n/a|NomeCard issuer's name (minuscule): "visa", "mastercard", "diners", "discover", "elo", "amex", "jcb", "aura", "hipercard".|
|produto|Alphanumeric|Yes|1|Product code: **1**- Repayable on demand, **2**- Credit card installments on store, **A**- Debt|
|parcelas|Numeric|Sim|1..2|Installments number. **To repayable on demand or debt, use 1.**|

<aside class="warning">The result of order division by installments number don't must be lower than R$ 5,00. Otherwise the transaction will be deny.</aside>

## Integration flux and redirection

After creating a transaction, the browsing flux can be directed to Cielo environment, if the retailer requests the authentication on XML message.

In this situation, the retailer' system will obtain the amount of TAG of XML <url-autenticacao> returned to realize a redirection on customer browser and continues the process. The redirecting must be realized in "Full Screen" mode. In the other words, there is no more support to the pop up window. This way, from a checkout screen must be realized a redirecting to URL returned at transaction's creation.

<aside class="notice">This redirection can be done through Http Redirect (as in the code Model) or through a Javascript.</aside>

After the authentication process, the flux is returned to the retailer through the present information on TAG, sent in the first request to Cielo.

The diagram below makes easier the view of complete flux of browsing:

![fluxo]({{ site.baseurl_root }}/images/fluxo.png)

<aside class="notice">Generally, the URL of return follow this format: https://minhaloja.com.br/pedido?id=12345678. This page must use the order number to internally search TID that was returned by Cielo. With this information, the page must realize a request of Consult via TID to Cielo's Web Service and interpret the result to show to customer.</aside>

In the other hand, when there is no authentication, doesn't exist the context exchange or redirections and the integration is more simple:

![fluxo-simples]({{ site.baseurl_root }}/images/fluxo-simples.png)

## Return types

There are three types of return that can be created on WebService response:

1. `<transacao>`
2. `<retorno-token>`
3. `<erro>`

To operations related to a transaction (consults, authorization, capture and cancellation) in case of success the response is always a XML of type `<transacao>`. In case of an exclusive request to create a token, the response expected is `<retorno-token>`.

The next example shows the more reduced way of a message of return such <transaction>. Basically, it's composed by order data and data from transaction's configuration.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transaction version="1.3.0" id="af32f93c-5e9c-4f44-9478-ccc5aca9319e" xmlns="http://ecommerce.cbmp.com.br">
  <tid>10017348980735271001</tid>
  <dados-pedido>
    <numero>1130006436</numero>
    <valor>1000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-05T16:01:28.655-02:00</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <status>0</status>
  <url-autenticacao>https://ecommerce.cielo.com.br/web/index.cbmp?id=a783251</url-autenticacao>
</transacao>
```

The more important information are:

* **TID**: it's the link between purchase order of online store and Cielo's transaction.
* **URL de autenticação**: indicates the page that starts the authentication (when requested).
* **Status**: it's the base information to store control the transaction.

The table below details TAGS from basic-XML of return, identified by source node `<transacao>`:

|Element|Type|Size|Description|
|---|---|---|---|
|tid|Alphanumeric|1..40|Transaction identifier|
|dados-pedido|||identical to source sent by store on the creation of transaction.|
|forma-pagamento|||identical to source sent by store on creation of transaction.|
|status|Numeric|12|code of transaction. Look the appendix to a list of contacts.|
|url-autenticacao|Alphanumeric|1..256|URL of redirection to Cielo.|

Finally, there is another type of return which is employed every time a request can't be executed, because it's invalid or for some failure in its process. In this scenario, root node of XML response is like this `<erro>`.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<erro xmlns="http://ecommerce.cbmp.com.br">
  <codigo>001</codigo>
  <messagem><![CDATA[O XML informado nao e valido:- string value '' does not match pattern for type of valor element in DadosPedido in namespace http://ecommerce.cbmp. com.br: '<xml-fragment/>]]>
  </mensagem>
</erro>
```

When the transaction is invalid, we can classify the error in two types:

* **Syntatic error**: it happens when a XML message doesn't respect the rules defined by ecommerce.xsd archive. For example, a letter in numeric field, or an absence of a mandatory amount.
* **Semantic error**: it happens when a request asks an operation that is not supported for a specific transaction. For example, try to capture a transaction unauthorized, or even, cancel a transaction that is already cancelled.

<aside class="notice">The error messages always brings additional information that make easier the troubleshooting. The table in item "Attachment - 6.2. Error catalog" has a complete list with the error codes and its descriptions that must be considered to the integration development.</aside>

## Security level and authentication

Depending of card issuer, the transaction of Cielo E-commerce platform can be configured to be authenticated on card bank issuer (holder), in order to ensure the mayor level of security to the retailer.

The authentication isn't done automatically between systems, so it's necessary the customer interaction in the process, according the following explanation:

This happens always on the bank website (Internet Banking), using mechanisms and technologies independently from Cielo. In this way, it's possible for bank use an electronic token and password meanwhile another uses the password cards or CPF [c]to authenticate a transaction.

As shown previously, the mechanic of redirection is obtained through a tag `<url-autenticacao>` that is returned by Cielo on XML <transação> in the moment of a request of authorization to Web Service.

The authentication is mandatory for debt transactions and optional for credit. Nowadays only Visa and MasterCard support this functionality and consequently, only these two card issuers have the debt product.

<aside class="notice">Consult products and card issuers supported on item 1.6. “Product and card issuers supported”.</aside>

When there is authentication, the flux to execute an authorization happens in two steps, according to the diagram below:

![fluxo-autenticacao]({{ site.baseurl_root }}/images/fluxo-autenticacao.png)

1. finishOrder() - it happens when a cardholder finishes the order and starts the payment purchase.
  1. createTransaction (authenticated) - the retailer system send a XML request `<requisicao-transacao>` requesting an authenticated transaction, in other words, the TAG <autorizar> will be 0,1 or 2. After this, Cielo will inform at XML returned a field <url-autenticacao> with the address which the holder must be redirected for.
2. access (url-authentication) - the holder's browser is redirected to Cielo environment. Thereby, the Cielo's page is accessed, it automatically is directed to an issuer bank (3.1). This redirect is so fast that is practically imperceptible.
3. authenticate (token, cpf) - the holder will be on bank environment and will use some mechanism provided by his/her own issuer to realize the authentication of the transaction (generally token, "bingo card"/security card, cpf, electronic sign, etc).
  1. resultAuthentication ()- the issuer bank redirects the flux to Cielo with the result of authentication. Then, the flux backs to normal, according to item "2.3 Architecture of integration".
    1.process () - Cielo system process the return of authentication and submit to authorization and, optionally, to automatic capture.
    2. sendRedirect(url-return) - Cielo system send a redirection to customer browser to the address specificated on URL of return, provided on the first request (`<requisicao-transacao>`)
      1. access (url-return) - the holder's browser access the URL on store environment, where we recommend that you have a consult request via TID to Cielo Web Service.

### Notes

* Only on first redirection (1.2: send Redirect()) is Online Store responsability.
* The buyer is redirected on bank issuer only if the authentication is available. Otherwise, the transaction will progress to authorization automatically (excepting if the authentication has been just requested).

<aside class="notice">Consult products and card issuers supported on item 1.6. “Product and card issuers supported”.</aside>

The prerequisites for a transaction to be certified are listed below:

* Bank and card issuer should be participating in the authentication program;
* The BIN card must be participant in authentication program;
* Setting the // <allow> is 0, 1 or 2.

Looking at the diagram of section [Transaction](#transaction), you can see that all transactions will pass through status "Authenticated" or "not authenticated". Consequently, all receive the node `<autenticacao>` in the merchant response XML. Below the XML with the authentication node:

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao versao="1.3.0" id="5e445904-963e-4fa1-95cd-55ef88c289cc" xmlns="http://ecommerce.cbmp.com.br">
  <tid>1001734898073E931001</tid>
  <pan>IqVz7P9zaIgTYdU41HaW/OB/d7Idwttqwb2vaTt8MT0=</pan>
  <dados-pedido>
    <numero>1196683550</numero>
    <valor>1000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-08T10:44:24.244-02:00</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <taxa-embarque>1000</taxa-embarque>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <status>2</status>
  <autenticacao>
    <codigo>2</codigo>
    <mensagem>Autenticada com sucesso</mensagem>
    <data-hora>2011-12-08T10:44:47.311-02:00</data-hora>
    <valor>1000</valor>
    <eci>5</eci>
  </autenticacao>
</transacao>
```

Just the "node" fields `<autenticacao>` are listed on the table below:

|Elemento|Tipo|Tamanho|Descrição|
|---|---|---|---|
|codigo|Numérico|1.2|Código do processamento|
|mensagem|Alfanumérico|1..100|Detalhe do processamento|
|data-hora|Alfanumérico|19|Data e hora do processamento|
|valor|Numérico|1..12|Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos.|
|eci|Numérico|2|Nível de segurança.|

The ECI field (Eletronic Commerce Indicator) represents how safety is a transaction. This amount must be considered for the retailer to decide about transaction capture.

<aside class="warning">The ECI indicator is very important, because it's what defines the Chargeback's rules.</aside>

# Reply Codes Catalog

## Authorization Codes LR

Below are the response codes that account for 99% of the returns generated in the authorization process. The other existing codes are not listed as rarely occur or in specific cases. For these cases must be assumed that they are not likely to retry.

If you have a high amount of return codes that are not listed below, please contact the Cielo Web Support E-commerce.

<aside class="warning"> The descriptions below are exclusively for internal use of the merchant and should not be disclosed to the cardholder. </aside>

<aside class="notice"> Except the AA codes, CA and GA, all others are generated by issuers. </aside>

|Response Code LR|Definition|Meaning|Action|Allows retry|
|---|---|---|---|---|
|00|Successfull authorized Transaction.|TSuccessfull authorized Transaction|Successfull authorized Transaction|No|
|000|Successfull authorized Transaction.|TSuccessfull authorized Transaction|Successfull authorized Transaction|No|
|01|Unauthorized transaction. Transaction referred|Unauthorised Transaction. Referred (Suspected fraud) by the issuing bank.|Unauthorised Transaction. Contact your issuing bank.|No|
|02|Unauthorized transaction. Transaction referred|Unauthorised Transaction. Referred (Suspected fraud) by the issuing bank.|Unauthorised Transaction. Contact your issuing bank.|No|
|03|Transaction not allowed. Error in registering the property code in the configuration file TEF|Transaction not allowed. Invalid establishment. Contact Cielo|We could not process the transaction. Get all the Merchant.|No|
|04|Unauthorised Transaction. Card blocked by the issuer bank.|Unauthorised Transaction. Card blocked by the issuer bank.|Unauthorised Transaction. Contact your issuing bank.|No|
|05|Unauthorised Transaction. Defaulter card (Do not honor)|Unauthorised Transaction. Unable to process the transaction. Issues related to security, default or carrier limit|Unauthorised Transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|06|Unauthorised Transaction. Card canceled.|Unauthorised Transaction. Unable to process the transaction. Card permanently canceled by the issuing bank.|We could not process the transaction. Contact your issuing bank.|No|
|07|Transaction declined. Retain special status card|Transaction not authorized by the rules of the issuing bank.|Unauthorised Transaction. Contact your issuing bank|No|
|08|Unauthorised Transaction. Invalid security code.|Unauthorised Transaction. Security code is invalid. Ask to the carrier to correct the data and try again.|Unauthorised Transaction. Incorrect data. Review the data and enter again.|No|
|11|successfully authorized transaction for cards issued abroad|authorized Transaction successfully.|Successfully authorized Transaction.|No|
|12|invalid transaction, error on the card.|We could not process the transaction. Ask the carrier to check the card data and try again.|We could not process the transaction. review the reported data and try again. If the error persists, please contact your issuing bank.|No|
|13|Transaction not allowed. Invalid transaction value|Transaction not allowed. Invalid value. Ask the carrier to review the data and again. If the error persists, contact Cielo|Transaction not authorized. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the merchant|No|
|14|Unauthorised Transaction. Invalid Card|Transaction not authorized. Invalid card. You can lock the card with the bank, incorrect data or attempts card tests. Use the Lhum algorithm (Mod 10) to prevent unauthorized transactions for that reason. See www.cielo.com.br/desenvolvedores to deploy Lhum algorithm|Unable to process the transaction. review the reported data and try again. If the error persists, please contact your issuing bank|No|
|15|Bank issuer unavailable or nonexistent.|Unauthorized transaction. Issuing bank available|Unable to process the transaction. Contact your issuing bank.|No|
|19|Redo the transaction or try again later.|We could not process the transaction. Redo the transaction or try again later. If the error persists, contact Cielo|We could not process the transaction. Redo the transaction or try again later. If the error persists contact the merchant|Only 4 times in 16 days.|
|21|Cancellation not made. Transaction not found.|We could not process the cancellation. If the error persists, contact Cielo|We could not process the cancellation. Try again later. If the error persists, contact the merchant.|No|
|22|invalid Installment. Number of invalid installments.|Could not process the transaction. Number of installments invalid. If the error persists, contact Cielo|We could not process the transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the merchant|No|
|23|Unauthorised Transaction. Value of the invalid provision.|Unable to process the transaction. Value of the invalid provision. If the error persists, contact Cielo|We could not process the transaction. Value of the invalid provision. Redo the transaction confirming the reported data. If the error persists, contact the merchant|No|
|24|Number of installments invalid|Unable to process the transaction. Number of installments invalid. If the error persists, contact Cielo|We could not process the transaction. Number of installments invalid. Redo the transaction confirming the reported data. If the error persists, contact the shop.|No|
|25|Application for authorization did not send the card number|Unable to process the transaction. authorization request did not send the card number. If the error persists, check the communication between virtual and Cielo store.|We could not process the transaction. review the reported data and try again. If the error persists, contact the shop|Only 4 times in 16 days.|
|28|Archive temporarily unavailable.|We could not process the transaction. File unavailable. Review the communication between Virtual Store and Cielo. If the error persists, contact Cielo|We could not process the transaction. Enter contact Virtual Store|Only 4 times in 16 days|
|39|Unauthorised Transaction. Error in issuing bank.|Unauthorised Transaction. Error in issuing bank.|Unauthorised Transaction. Contact your issuing bank.|No|
|41|Unauthorised Transaction. Locked for Card lost|Unauthorised Transaction. Locked Card lost|Unauthorised Transaction. Contact your issuing bank.|No|
|43|Unauthorised Transaction. Blocked because of theft|Unauthorised Transaction. Blocked because of theft|Unauthorised Transaction. Contact your issuing bank.|No|
|51|Unauthorised Transaction. exceeded limit/no balance.|Unauthorised Transaction. exceeded limit/no balance.|Unauthorised Transaction. Contact your issuing bank|From the next day, only 4 times in 16 days.|
|52|card with invalid digit control.|We could not process the transaction. Card digit invalid control|Unauthorised Transaction. Review the reported data and try again.|No|
|53|Transaction not allowed. Invalid savings card|Transaction not allowed. Invalid card savings.|Could not process the transaction. Contact your issuing bank.|No|
|54|Unauthorised Transaction. expired card|Unauthorised Transaction. expired card|Unauthorised Transaction. Redo the transaction confirming data.|No|
|55|Unauthorised Transaction. Invalid password|Unauthorised Transaction. Invalid password.|Unauthorised Transaction. Contact your issuing bank.|No|
|57|Transaction not allowed for the card|unauthorized transaction.Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|58|Transaction not allowed. Invalid payment option|Transaction not allowed. Invalid payment option. Review if the chosen payment option is enabled in the register|Unauthorised Transaction. Contact your store.|No|
|59|Unauthorised Transaction. Suspected fraud|Transaction not authorized. Suspected fraud|Transaction not authorized. Contact your issuing bank.|No|
|60|Unauthorised Transaction|Unauthorised Transaction. Try again. If the error persists, the holder should contact the issuing bank.|We could not process the transaction. Try again later. If the error persists, please contact your issuing bank.|Only 4 times in 16 days.|
|61|Bank issuer unavailable|Unauthorised Transaction. Issuing bank unavailable|Unauthorised Transaction. Try again. If the error persists, please contact your issuing bank.|Only 4 times in 16 days.|
|62|Unauthorised Transaction. restricted card, home|unauthorized transaction. restricted card, home|Unauthorised Transaction. Contact your issuing bank|From the next day, only 4 times in 16 days.|
|63|Unauthorised Transaction. security breach|Transaction unauthorized. security breach.|Unauthorised Transaction. Contact your issuing bank.|No|
|64|Unauthorised Transaction. Value below the minimum required by the issuing bank.|Unauthorised Transaction. Contact your issuing bank.|Unauthorised Transaction. Value below the minimum required by the issuing bank.|No|
|65|Unauthorised Transaction. Exceeded the number of transactions for the card.|Transaction not authorized. Exceeded the number of transactions for the card.|Transaction not authorized. Contact your issuing bank.|Only 4 times in 16 days.|
|67|Unauthorised Transaction. Locked card for purchases today|Unauthorised Transaction. Locked card for shopping today. Blocking may be due to excessive invalid attempts. The card will be automatically unlocked at midnight.|Unauthorised Transaction. Card locked temporarily. Contact your issuing bank|From the next day, only 4 times in 16 days.|
|70|Unauthorised Transaction. exceeded limit/no balance.|Unauthorised Transaction. exceeded limit/no balance.|Unauthorised Transaction. Contact your issuing bank|. From the next day, only 4 times in 16 days.|
|72|Cancellation not made. Balance available for insufficient cancellation.|Cancellation not made. Balance available for insufficient cancellation. If the error persists, contact Cielo|Cancellation not made. Try again later. If the error persists, contact the merchant.|No|
|74|Unauthorised Transaction. The password has expired.|Unauthorised Transaction. The password has expired.|Unauthorised Transaction. Contact your issuing bank.|No|
|75|Password locked. Exceeded card attempts.|Transaction not authorized|Your transaction may not be processed. Contact the Issuer of your card.|No|
|76|Cancellation not made. Issuing bank did not locate the original transaction|Cancellation not made. Issuing bank did not locate the original transaction|Cancellation not made. Contact the merchant.|No|
|77|Cancellation not made. It was located the original transaction|Cancellation not made. It was located the original transaction|Cancellation not made. Contact the merchant|No|
|78|Unauthorised Transaction. Card locked, first use|Unauthorised Transaction. Card locked, first use. Ask your carrier to unlock the card directly with your issuing bank.|Unauthorised Transaction. Contact your issuing bank and request the unlock card|No|
|80|Unauthorised Transaction. Divergence on the date of transaction/payment|Unauthorised Transaction. Transaction date or date of the first invalid payment|Unauthorised Transaction. Redo the transaction confirming data.|No|
|82|Unauthorised Transaction. Invalid Card|Unauthorised Transaction. Invalid Card. Ask the carrier to review the data and try again.|Unauthorised Transaction. Redo the transaction confirming the data. If the error persists, please contact your issuing bank.|No|
|83|Unauthorised Transaction. Error in control passwords|unauthorized transaction. Error in control passwords|unauthorized transaction. Redo the transaction confirming the data. If the error persists, please contact your issuing bank.|No|
|85|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processamento. Ask to carrier retype data on the card, if the error persists there may be a problem in the merchant's terminal, then the merchant should contact Cielo|Transaction not allowed. Report card data again. If the error persists, contact the shop|No|
|86|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processamento. Ask to carrier retype data on the card, if the error persists there may be a problem in the merchant's terminal, then the merchant should contact Cielo|Transaction not allowed. Report card data again. If the error persists, contact the merchant|No|
|89|Error in the transaction.|Unauthorised Transaction. Error in the transaction. The carrier must try again and if the error persists, contact the issuing bank.|Unauthorised Transaction. Error in the transaction. Try again and if the error persists, please contact your issuing bank.|Only 4 times in 16 days.|
|90|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processamento. Ask to carrier retype data on the card, if the error persists there may be a problem in the merchant's terminal, then the merchant should contact Cielo|Transaction not allowed. Report card data again. If the error persists, contact the merchant|No|
|91|Unauthorised Transaction. Issuing bank temporarily unavailable.|Unauthorised Transaction. Issuing bank temporarily unavailable.|Unauthorised Transaction. Issuing bank temporarily unavailable. Contact your issuing bank.|Only 4 times in 16 days.|
|92|Unauthorised Transaction. Exceeded communication time|Unauthorised Transaction. Exceeded communication time|Unauthorised Transaction. Temporarily unavailable communication. Contact the merchant|Only 4 times in 16 days.|
|93|Unauthorised Transaction. Rule violation - Possible error in the register|Unauthorised Transaction.Rule violation - Possible error in the record|Your transaction can not be processed. Contact the merchant.|No|
|96|processing failed.|Unable to process the transaction. Failure Cielo system. If the error persists, contact Cielo|Your transaction may not be processed, please try again later. If the error persists, contact the shop|Only 4 times in 16 days.|
|97|value not allowed for this transaction.|Unauthorised Transaction. not allowed value for this transaction.|Unauthorised Transaction. not allowed value for this transaction.|No|
|98|System/communication not available|Unauthorised Transaction. Without communication system transmitter. If general, check SITEF, GATEWAY and/or connectivity.|Your Transaction can not be processed, please try again later. If the error persists, contact the shop|Only 4 times in 16 days.|
|99|System/communication not available|Unauthorised Transaction. Without communication system transmitter. Try later. Can be error in SITEF, please check|Your transaction may not be processed, please try again later. If the error persists, contact the shop|From the next day, only 4 times in 16 days.|
|475|Cancellation Timeout|The application did not answer within expeted time.|Try again after a few seconds. If the error persists, contact the shop.|Yes.|
|999|System/communication available|Unauthorised Transaction. Without communication system transmitter. Try later. Can be error in SITEF, please check|Your transaction may not be processed, please try again later. If the error persists, contact the shop|From the next day, only 4 times in 16 days.|
|AA|Timeout|Timeout in communication with the issuing bank. East carrier to try again, if the error persists is necessary that the carrier contact your issuing bank.|ime Exceeded in its communication with the issuing bank, try again later. If the error persists, contact your bank.|Only 4 times in 16 days.|
|AC|Transaction not allowed. debit card being used with credit. Use the debit function|Transaction not allowed. debit card being used with credit. Ask the carrier to select the Debit Card payment option|Unauthorised Transaction. Try again by selecting the debit card payment option.|No|
|AE|Try Later|Timeout in communication with the issuing bank. East carrier to try again, if the error persists is necessary that the carrier contact your issuing bank.|Time Exceeded in its communication with the issuing bank, try again later. If the error persists, contact your bank.|Only 4 times in 16 days.|
|AF|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processamento. Ask to carrier retype data on the card, if the error persists there may be a problem in the merchant's terminal, then the tenant should contact Cielo|Transaction not allowed. Report card data again. If the error persists, contact the shop.|No|
|AG|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processamento.Solicite to carrier retype data on the card, if the error persists there may be a problem in the merchant's terminal, then the tenant should contact Cielo|. Transaction not allowed. Report card data again. If the error persists, contact the shop.|No|
|AH|Transaction not allowed. Credit card being used with debt. Use the credit function.|Transaction not allowed. Credit card being used with debt. Ask the carrier to select the Credit Card payment option|Unauthorised Transaction. Try again by selecting the option of credit card payment.|No|
|AI|Unauthorised Transaction. Authentication was not performed.|Unauthorized transaction. Authentication is not performed. The carrier has not completed authentication. Ask the carrier to review the data and try again. If the error persists, contact Cielo informing the BIN (first 6 digits of the card)|Unauthorised Transaction. Authentication was not successful. Try again and correctly enter the data requested. If the error persists, contact the shopkeeper.|No|
|AJ|Transaction not allowed. credit or debit transaction in an operation that only allows Private Label. Try again by selecting the Private Label option|Transaction not allowed. credit or debit transaction in an operation that only allows Private Label. Ask the carrier to try again by selecting the Private Label option. If not available the Private Label option check in Cielo is your property allows this operation.|Transaction not allowed. credit or debit transaction in an operation that only allows Private Label. Try again and select the Private Label option. If a new error contact the shop.|No|
|AV|Unauthorised Transaction. Invalid Data|failed validation of transaction data. Ask to carrier to review the data and try again.|Failed validation. Review the reported data and try again.|Only 4 times in 16 days.|
|BD|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processamento. Ask to carrier retype data on the card, if the error persists there may be a problem in the merchant's terminal, then the tenant should contact Cielo|Transaction not allowed. Report card data again. If the error persists, contact the shop.|No|
|BL|Unauthorised Transaction. Daily limit exceeded|Unauthorised Transaction. exceeded the daily limit. Ask the carrier to contact your issuing bank.|Unauthorised Transaction. exceeded the daily limit. Contact your issuing bank|From the next day, only 4 times in 16 days.|
|BM|Unauthorised Transaction. Invalid Card|Transaction not authorized. Invalid card. Can be card lock on the issuing bank or incorrect data. Try using the algorithm Lhum (Mod 10) to prevent unauthorized transactions for that reason.|Unauthorised Transaction. Invalid card. Redo the transaction confirming the reported data.|No|
|BN|Unauthorised Transaction. Card or account locked.|Unauthorized transaction. The card holder or account is locked. Ask the carrier to contact your issuing bank.|Unauthorised Transaction. The card holder or account is locked. Contact your issuing bank.|No|
|BO|Transaction not allowed. Failure of the operation.|Transaction not allowed. There was an error processing. Ask the carrier to retype data on the card, if the error persists, contact the issuing bank.|Transaction not allowed. There was an error processing. Re-enter the card data, if the error persists, contact the issuing bank.|Only 4 times in 16 days.|
|BP|Unauthorised Transaction. Account nonexistent current|. Unauthorised Transaction. Not process the transaction by an error related to the card holder or account. Ask the carrier to contact the issuing bank.|Unauthorised Transaction. Not process the transaction by an error related to the card holder or account. Contact the issuing bank.|No|
|BV|Unauthorised Transaction. expired card|Unauthorised Transaction. expired card|Unauthorised Transaction. Redo the transaction confirming data.|No|
|CF|Transaction Not autorizada.C79: J79 failed data validation|Unauthorised Transaction.Failure to validate the data. Ask the carrier to contact the issuing bank.|Unauthorised Transaction. Failure to validate the data. Contact the issuing bank.|No|
|CG|Unauthorised Transaction. Failure to validate the data.|Transaction unauthorized. Failure to validate the data. Ask the carrier to contact the issuing bank.|Unauthorised Transaction. Failure to validate the data. Contact the issuing bank.|No|
|DA|Unauthorised Transaction. Failure to validate the data.|Transaction unauthorized. Failure to validate the data. Ask the carrier to contact the issuing bank.|Unauthorised Transaction. Failure to validate the data. Contact the issuing bank.|No|
|DF|Transaction not allowed. Failure on the card or invalid card|. Transaction not allowed. Failure on the card or invalid card. Ask the carrier to retype data on the card, if the error persists, contact the bank|Transaction not allowed. Failure on the card or invalid card. Re-enter the card data, if the error persists, contact the bank|Only 4 times in 16 days.|
|DM|Unauthorised Transaction. exceeded limit/no balance.|Unauthorised Transaction. exceeded limit/no balance.|Unauthorised Transaction. Contact your issuing bank|From the next day, only 4 times in 16 days.|
|DQ|Unauthorised Transaction. Failure to validate the data.|Transaction unauthorized. Failure to validate the data. Ask the carrier to contact the issuing bank.|Unauthorised Transaction. Failure to validate the data. Contact the issuing bank.|No|
|DS|Transaction not allowed for the card|unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|EB|Unauthorised Transaction. Daily limit exceeded|Unauthorised Transaction. exceeded the daily limit. Ask the carrier to contact your issuing bank.|Unauthorised Transaction. exceeded the daily limit. Contact your issuing bank|From the next day, only 4 times in 16 days.|
|EE|Transaction not allowed. share of value less than the minimum allowed.|Transaction not allowed. share of value less than the minimum allowed. It is not permitted lower installments R$ 5. Necessary to revise the calculation for installments|. Transaction not allowed. The value of the share is below the minimum allowed. Contact the shop.|No|
|EK|Transaction not allowed for the card|unauthorized transaction.Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|FA|Unauthorised Transaction.|Unauthorized transaction AmEx|Unauthorised Transaction. Contact your issuing bank.|No|
|FC|Unauthorised Transaction. Call Issuer|Unauthorized transaction. Ask to the carrier to contact the issuing bank.|Unauthorised Transaction. Contact your issuing bank.|No|
|FD|Transaction declined. Retain special status card|Transaction not authorized by the rules of the issuing bank.|Unauthorised Transaction. Contact your issuing bank|No|
|FE|Unauthorised Transaction. Divergence on the date of transaction/payment|Unauthorised Transaction. Transaction date or date of the first invalid payment|Unauthorised Transaction. Redo the transaction confirming data.|No|
|FF|Cancellation OK|Cancellation Transaction authorized successfully. ATTENTION: This return is for cases of cancellations and not to cases of authorizations|Cancellation Transaction authorized successfully|No|.
|FG|Unauthorised Transaction. Call AmEx|Unauthorised Transaction. Orient the carrier to contact AmEx Call Center|Unauthorised Transaction. Contact AmEx Call Center at telephone 08007285090|No|
|FG|Call 08007285090|Unauthorised Transaction. Ask to the carrier to contact AmEx Call Center|Unauthorised Transaction. Contact AmEx Call Center at telephone 08007285090|No|
|GA|Wait for contacting|Unauthorised Transaction. Referred by Lynx Online preventively. Cielo will contact the merchant about this case|Unauthorised Transaction. Contact the shopkeeper.|No|
|HJ|Transaction not allowed. Code Invalid operation.|Transaction not allowed. Invalid code Coban operation|Transaction not allowed. Coban operation code invalid. Contact the shopkeeper.|No|
|IA|Transaction not allowed. Invalid operation indicator|Transaction not allowed. Indicator Invalid Coban operation|. Transaction not allowed. Indicator invalid Coban operation. Contact the shopkeeper.|No|
|JB|Transaction not allowed. Value Invalid operation.|Transaction not allowed. Coban operation invalid value|Transaction not allowed. Coban operation value invalid. Contact the shopkeeper.|No|
|KA|Transaction not allowed. Failure to validate the data.|Transaction not allowed. There was a failure to validate the data. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual and Cielo shop|Transaction not allowed. There was a failure to validate the data. review the reported data and try again. If the error persists contact the merchant|No|
|KB|Transaction not allowed. Selected wrong option|Transaction not allowed. Selected the wrong option. Ask the carrier to review the data and try again. If the error persists must be verified communication between shop and Cielo|Transaction not allowed. Selected the wrong option. Try again. If the error persists contact the merchant.|No|
|KE|Unauthorised Transaction. Failure to validate the data.|Transaction unauthorized. Failure to validate the data. selected option is not enabled. Check the options available to the carrier.|Unauthorized transaction. Failure to validate the data. selected option is not enabled. Contact the shop.|No|
|N7|Unauthorised Transaction. Invalid security code.|Unauthorised Transaction. Security code is invalid. Ask to the carrier correct the data and try again.|Unauthorised Transaction. Review the data and enter again.|No|
|R1|Unauthorised Transaction. defaulter card (Do not honor)|Unauthorised Transaction. Unable to process the transaction. Issues related to security, default or carrier limit|Unauthorised Transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|U3|Transaction not allowed. Failure to validate the data.|Transaction not allowed. There was a failure to validate the data. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual and Cielo shop|Transaction not allowed. There was a failure to validate the data. review the reported data and try again. If the error persists contact the merchant|No|

## Error Codes

The errors that may appear in the XML message through the TAG '<error>' are arranged as follows:

### Table integration errors

|Code|Message|Description|Action|
|---|---|---|---|
|1|Invalid message|The XML message is off the format specified by ecommerce.xsd file|Review the information sent in front XML message specifications|
|2|Invalid Credentials|Inability to authenticate a virtual store request.|Check if the number of accreditation and the key are correct|
|3|Nonexistent transaction|There is no transaction to the informed identifier|Reviewing the application|
|8|Invalid Security Code|The security code entered in the message is invalid.|Review the card information sent in the XML message|
|10|Inconsistency in sending the card|The transaction, with or without card, is divergent with the permission of sending this information|Reviewing the Store Registration allows sending the card or not|
|11|Not enabled mode|The transaction is configured with a non-authorized payment method to the store|Review the payment method requested|
|12|Number of invalid portions|The number of shares requested exceeds the maximum allowed|Review the payment method|
|13|Automatic authorization flag|Flag automatic authorization incompatible with the invalid payment method requested|Review the rules for using the flag|
|14|Invalid Direct Authorization|The Direct authorization request is invalid|Review the rules for using the Direct Authorization|
|15|Direct authorization without card|The direct authorization request is without a card|Review the rules for using the Direct Authorization|
|16|Identifier, TID, invalid|The supplied TID is duplicated|Reviewing the application|
|17|Missing security code|The card security code is not sent (this information is compulsory for Amex)|Reviewing the application|
|18|Security Code indicator inconsistent|Incorrect use of the security code indicator|Review the card information sent in the XML message|
|19|Return URL not supplied|The Return URL is mandatory, except for recurrence and direct authorization.|Review the information sent in the XML message|
|20|Status does not allow authorization|You may not engage authorization for the transaction status|Revise authorization rules|
|21|Deadline authorization expired|It’s not allowed to perform authorization, as the term is expired|Revise authorization rules|
|22|Invalid number of installments|It’s not allowed to perform authorization for this number of installments|Revise authorization rules|
|25|Forward to authorization is not allowed|The result of the transaction authentication does not allow the authorization request|Revise authorization rules|
|30|Invalid status to capture|The status of the transaction does not allow capture|Review the capture rules|
|31|Capture deadline defeated|The capture can not be performed because the time for capture is overdue|Review the capture rules|
|32|Invalid capture value|The amount requested for capture is not valid|Review the capture rules|
|33|Failed to capture|Could not perform the capture|Perform retry. Persisting, contact the E-commerce support and inform the transaction TID.|
|34|Mandatory departure tax value|The amount of the departure tax is required if the catch is partial and authorization has been made with departure tax.|Send again capturing request tagged.|
|35|invalid issuer for use boarding fee|The card issuer used in the transaction does not support the boarding rate.|Remove the rate of shipment, or use a card that supports this feature: Visa or Mastercard.|
|36|Invalid product for use boarding fee|The chosen product is not supported on the departure tax.|Change the product.|
|40|Cancellation deadline defeated|Cancellations can not be performed because the term has expired|Review the cancellation rules.|
|42|Failure to cancel|It was not possible to cancel|Perform retry. Persisting, you should contact the E-commerce support and inform the transaction TID.|
|43|Cancellation value is higher than the allowed value.|The value that is trying to cancel exceeds the total value of the transaction captured.|Review the value of partial cancellation, it may not be larger than the captured value of the transaction.|
|51|Invalid recurrence|The transaction settings do not allow the successful performance of the applicant transaction.|Make sure to choose "Lump Sum"; Make sure you are sending only the token or only credit card|
|52|Invalid Token|The token provided in the authorization request is not valid or is blocked.|Ensure that the Token is correct. If it persists, contact support.|
|53|Recurrence not enabled|Registration the shopkeeper does not allow sending recurring transactions.|Contact support for enable the recurrence to register.|
|54|Transaction with invalid Token|The transaction settings do not allow the direct authorization to use Token is successfully made.|Make sure to choose "Lump Sum"; Make sure you are only sending the token or only credit card.|
|55|Card number not supplied|It was requested the creation of Token, but the credit card number was not provided.|Review the information sent on XML message in front of specifications|
|56|Card validity not supplied|It was requested the creation of Token, but the validity of the credit card has not been provided.|Review the information sent in the message across XML specifications.|
|57|Unexpected error generating Token|System failure occurred at the time of generation of the Token.|Try again. If it persists, contact Support.|
|61|Invalid Recurring Transaction|The recurring transaction settings are invalid.|Make sure the product is Lump Sum if the token or card were sent in the message.|
|77|XID not supplied|authorization with external authentication was requested, but the XID field was not provided.|Review the information sent in the message across XML specifications.|
|78|CAVV not supplied|authorization with external authentication was requested, but CAVV field was not provided.|Review the information sent in the message across XML specifications.|
|86|XID and CAVV not provided|authorization with external authentication was requested, but the CAVV and XID fields were not provided.|Review the information sent in the message across XML specifications.|
|87|CAVV with divergent size|authorization with external authentication was requested, but CAVV field has a divergent size.|Review the information sent in the message across XML specifications.|
|88|XID with differing size|authorization with external authentication was requested, but the XID field has a divergent size.|Review the information sent in the message across XML specifications.|
|89|ECI with divergent size|authorization with external authentication was requested, but the ECI field possesses a divergent size.|Review the information sent in the message across XML specifications.|
|90|ECI invalid|authorization with external authentication was requested, but the ECI field has an invalid value.|Review the information sent in the message across XML specifications.|
|95|Internal error authentication|Failure in system|If it persists, contact the support and tell the transaction TID.|
|97|Unavailable System|System failure|If it persists, contact support.|
|98|Timeout|The application did not respond within 25 seconds|If it persists, contact support.|
|99|Unexpected Error|System failure|If it persists, contact the support and tell the transaction TID.|

## Status of transactions

|Status|Code|
|---|---|
|Built Transaction|0|
|Transaction in Progress|1|
|Transaction Authenticated|2|
|Transaction Not Authenticated|3|
|Authorized Transaction|4|
|Unauthorized Transaction|5|
|Captured Transaction|6|
|Transaction Cancelled|9|
|Transaction Authentication|10|
|Transaction in Cancellation|12|

## ECI

|Log Results|Visa|Mastercard|Aura|Other|
|---|---|---|---|---|
|Successfully authenticated carrier.|5|2|n / a|n / a|
|Carrier not authenticated because the issuer didn’t provide authentication mechanisms.|6|1|n / a|n / a|
|Carrier not authenticated successfully as an unexpected technical error.|7|1|n / a|n / a|
|Carrier not authenticated successfully.|7|0|n / a|n / a|
|The store chose to allow bypassing the authentication.|7|0|0|7|

# Operations and configurations

## Creating an authorization of transaction

The request for an authorization is the main operation of Cielo E-commerce, because it's through it, that a sale can be concreted and the sale process can be finished. The authorization has a sequence of configuration that can be customized, besides the functionalities that have value to customer and retailers.

<aside class="notice">For the response codes of the authorization, consult the Directory of Response Codes of Authorization  os códigos de resposta da autorização consulte o Catálogo de Códigos de Resposta da Autorização (LR)</aside>

<aside class="notice">All the messages must be formatted correctly, according specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

## Direct authorization

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <indicador>1</indicador>
    <codigo-seguranca>973</codigo-seguranca>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>3</autorizar>
  <capturar>false</capturar>
</requisicao-transacao>
```

The direct authorization is characterized for being a transaction without authentication from holder, because it's a retailer option (and risk), or because the card issuer or emitter don't have support. The direct authorization can be done in two ways: traditional (with card data) or using a token.

### Traditional

* **Purpose** - Submit a direct transaction using a credit card.
* **Rules**
  * The online store register must be enable to send card data.
  * Send a TAG <authorize> with the value "3".
  * Valid only for credit.
  * The retailer must pay attention on sending card rules.
  * In direct authorization, the security level of transaction (ECI) is defined as:
    * "7"  for Visa, Diners, Discover, Elo and JCB.
    * "0" for Mastercard, Aura and Hipercard.

## Recurrent authorization

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <indicador>1</indicador>
    <codigo-seguranca>973</codigo-seguranca>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>4</autorizar>
  <capturar>false</capturar>
</requisicao-transacao>
```

The recurrent authorization must be done in two ways: sending a token previously registered, or using a card. The recurrent transaction is very similar than traditional transaction, the changes consist on the rules that emitter and card issuer use to authorize or deny a transaction. Another difference is related to "Renova Fácil" (Easy Renew).

<aside class="notice">To know if your store is eligible to use a recurrent authorization, check with our service center or Cielo E-commerce Web Support.</aside>

<aside class="notice">All the messages must be formatted correctly, according specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### Recurrent authorization with card

* **Purpose** - Submit a recurrent transaction using a credit card.**
* **Rules**
  * Send a TAG '<autorizar>' with value "4".
  * Valid just for lump sum.

### EASY RENEW (Renova Fácil):

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="d35b67189442">
  <tid>10069930690362461001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <!-- ... -->
  </forma-pagamento>
  <status>5</status>
  <!-- ... -->
  <autorizacao>
    <codigo>5</codigo>
    <mensagem>Autorização negada</mensagem>
    <data-hora>2011-12-09T10:58:45.847-02:00</data-hora>
    <valor>1000</valor>
    <lr>57</lr>
    <nsu>221766</nsu>
  </autorizacao>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <codigo-seguranca/>
  </dados-portador>
</transacao>
```

This functionality makes easier to identify a card which has been replaced for another at emitter bank. In this way, when a recurrent transaction is submitted to Web Service and Cielo identifies that the card used is outdated, the system will behave like that:

1. If the recurrent transaction has been send through a card, the authorization will be declined and it will returned the data of new card, according to the diagram below:

![remova fácil]({{ site.baseurl_root }}/images/remova-facil.png)

<aside class="notice">The "Renova Fácil" (Easy Renew) is only available on recurrent transactions. The Easy Renew effectiveness depends of correct usage of recurrent transactions properly signalized. Consult banks and card issuers participants with Cielo E-commerce Web Support.</aside>

<aside class="notice">All messages must be formatted correctly according to specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema ecommerce.xsd</a></aside>

<aside class="notice">All the messages must be formatted correctly, according specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### Authorization of a transaction previously created

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-autorizacao-tid id="0000000000" versao="1.2.0">
  <tid>1006993069990BCAA001</tid>
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
</requisicao-autorizacao-tid>
```

To the establishments that use the authentication process of authentication it's possible to request an authorization of transaction that stopped after the execution of this process. The message to perform this operation is "requisicao-autorizacao-tid", as described below:

<aside class="notice">Requests to transactions that weren't submit to the authentication process or have been interrupted, because the holder made a mistake on the password won't be accepted.</aside>

<aside class="notice">All messages must be formatted correctly according to specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|tid|Alphanumeric|Yes|20|transaction identifier|
|dados-ec.numero|Numeric|Yes|1..20|affiliation store number with Cielo.|
|dados-ec.chave|Alphanumeric|Yes|1..100|store access key attributed by Cielo.|

## Transaction with token

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-token id="8fc889c7-004f-42f1-963a-31aa26f75e5c" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <numero>4012001038443335</numero>
    <validade>201508</validade>
    <nome-portador>FULANO DA SILVA</nome-portador>
  </dados-portador>
</requisicao-token>
```

* **Purpose** - Request the creation of a token associated to a credit card to help the transaction sending without card.
* **Rules**
  * The Token is unique to a specific [Card+Commercial Establishment]. So, a card can be "tokenized" in more than a store and each one will has different codes.
  * If more than one request has been sent with the same data, the token returned will be always the same.
  * The creation of token is independent of a transaction result (approved/declined).

<aside class="warning">Transactions via token don't dispense the retailer from sending card issuer information, however is necessary that retailer system (or gateway) that will hold tokens also hold card issuers that have been tokenized.</aside>

<aside class="notice">A token that is not used for more than a year will be automatically removed from Cielo data banking. It's possible to block a specific token to don’t be more used. The block of token must be requested to Cielo E-commerce Web Support.</aside>

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|dados-ec.numero|Numérico|Sim|1..20|Store affiliation number with Cielo|
|dados-ec.chave|Alfanumérico|Sim|1..100|Store access key assigned by Cielo.|
|daods-portador|n/a|Opcional|n/a|Node with card data|
|dados-portador.numero|Numérico|Sim|19|Card number|
|dados-portador.validade|Numérico|Sim|6|Card validity on yyyymm format. Example: 201212 (dec/2012)|
|dados-portador.nome-portador|Alfanumérico|Opcional|0..50|Name printed as in the card|

### Response

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<retorno-token xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="57239017">
  <token>
    <dados-token>
      <codigo-token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</codigo-token>
      <status>1</status>
      <numero-cartao-truncado>455187******0183</numero-cartao-truncado>
    </dados-token>
  </token>
</retorno-token>
```

The return will be like: <retorno-token> when a request has been concluded with success, or in case of failure <error>.

|Element|Type|Size|Description|
|---|---|---|---|
|codigo-token|Alfanumérico|100|Code of token created|
|status|Numérico|1|Token Status: 0 – Locked, 1 – Unlocked|
|numero-cartao-truncado|Alfanumérico|1..16|truncated-card-number|

### Direct Authorization via TOKEN

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</token>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>3</autorizar>
  <capturar>true</capturar>
</requisicao-transacao>
```

* **Purpose** - To submit a direct transaction (without authentication) using a token previously registered.
* **Rules**
  * To send a TAG <autorizar> with the value "3".
  * Token must be unlocked
  * Valid just for lump sum.

### Recurrent Authorization with TOKEN

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb997438630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <dados-portador>
    <token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</token>
  </dados-portador>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://localhost/lojaexemplo/retorno.jsp</url-retorno>
  <autorizar>4</autorizar>
  <capturar>true</capturar>
</requisicao-transacao>

```

* **Purpose** - To submit a recurrent transaction using a token previously registered.** - Submeter uma transação recorrente com o uso de um token previamente cadastrado.
* **Rules**
  * To send a TAG <autorizar> with the value "4".
  * Token must be unlocked.
  * Valid just for lump sum.

### Easy Renew with TOKEN

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="d35b67189442">
  <tid>10069930690362461001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <dados-pedido>
    <!-- ... -->
  </dados-pedido>
  <forma-pagamento>
    <!-- ... -->
  </forma-pagamento>
  <status>5</status>
  <!-- ... -->
  <autorizacao>
    <codigo>5</codigo>
    <mensagem>Autorização negada</mensagem>
    <data-hora>2011-12-09T10:58:45.847-02:00</data-hora>
    <valor>1000</valor>
    <lr>57</lr>
    <nsu>221766</nsu>
  </autorizacao>
  <token>
    <dados-token>
      <codigo-token>TuS6LeBHWjqFFtE7S3zR052Jl/KUlD+tYJFpAdlA87E=</codigo-token>
      <status>1</status>
      <numero-cartao-truncado>455187******0183</numero-cartao-truncado>
    </dados-token>
  </token>
</transacao>
```

This functionality makes easier to identify a card which has been replaced for another in emitter bank. So, when a recurrent transaction is submitted to Web Service and Cielo identifies a card in use outdated, the system will behave like that:

1. In case of recurrent transaction had been sent through a token, the authorization will be declined and a new token will return to be used, according to the diagram below:

![remova fácil com token]({{ site.baseurl_root }}/images/remova-facil-token.png)

### Creating TOKEN

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.0">
  <!-- ... -->
  <gerar-token>true</gerar-token>
</requisicao-transacao>
```

<aside class="warning">This additional service is subjected to a charge from the moment of a token create request.</aside>

* **Purpose** - Beyond the specific message to creation of a token, described in a transaction with token, it's possible to employ an authorization request to ask a creation of token, adding the information <gerar-token> in the node of request of a transaction.
* **Rules**
  * In case of a card being submitted more than once for the same retailer, the Token created will be the same.

## Aggregated functionality

### Authentication and transaction with debit card

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>A</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <!-- ... -->
  <autorizar>1</autorizar>
</requisicao-transacao>
```

The authenticated transaction will ensure an extra security for the retailer against Chargebacks, however, according to presented on chapter "2.5 - Authentication and security level", neither all card issuers and emitters make this kind of service available.

The debit product mandatorily requires an authenticated transaction, otherwise, the transaction won't be authorized.

* **Purpose** - Make eligible the transaction for authentication.
* **Rules**
  * To send a flag `autorizar` according to the domain below, to try:
    * 0 - Only authenticate a transaction
    * 1- Submit to authorization only if the transaction be authenticated.
    * 2- Submit to authorization if the transaction be authenticated or not.
  * For debit, send the product "A" at XML.
  * The request to authorization of a transaction that has been just authenticated can be done in until 90 days after the initial date.

<aside class="notice">Considering that the authentication doesn't depend exclusively of this flag, we recommend that you always verify the field to check the result of authentication.</aside>

### Allows the retailer to send a text (Soft Descriptor)

```xml
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <dados-pedido>
    <numero>178148599</numero>
    <valor>1000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>soft-descriptor</soft-descriptor>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

* **Purpose** - Allows the retailer to send a text with until 13 characters that will be printed on holder invoice, next to store identification, respecting the card issuers length:
  * **Visa**: 25 characters
  * **Mastercard**: 11 characters
* **Rules**
  * Maximum size: 13 characters
  * Available only for Visa and Mastercard issuers.
  * Exclusive use of simple characters.

<aside class="notice">To know and/or change the name of store that will be printed on holder's invoice, please, contact our service center.</aside>

### Automatic Capture

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <capturar>true</capturar>
  <!-- ... -->
</requisicao-transacao>
```

* **Purpose** - The automatic capture allows a request of authorization to be captured immediately after its approval. So it's not necessary realize a `<requisicao-captura>`.
* **Rules**
  * Just approved authorizations can be captured automatically.

### Boarding fee

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <dados-pedido>
    <numero>178148599</numero>
    <valor>10000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>softdescriptor</soft-descriptor>
    <taxa-embarque>1000</taxa-embarque>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

* **Purpose**: the boarding fee is the informative field that defines the total amount of transaction  (informed on tag data-order//value) that must be destined to payment of Infraero tax.
  * The boarding fee is not accumulated to authorization value. For example, in a airplane ticket sale of R$ 200,00 with boarding fee of R$ 25,00 you have to send the field `<valor>22500</valor>` and `<taxa-embarque>2500</taxa-embarque>`.
* **Rules**
  * Available just for Visa and Mastercard issuers.
  * The boarding fee is not added to authorization value, in other words, it's just informative.

<aside class="notice">There are specific rules to request a capture with boarding fee, available on item "Total capture and partial"</aside>

### AVS (Address Verification Service)

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1">
  <!-- ... -->
  <dados-pedido>
    <numero>178148599</numero>
    <valor>10000</valor>
    <moeda>986</moeda>
    <data-hora>2011-12-07T11:43:37</data-hora>
    <descricao>[origem:10.50.54.156]</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>softdescriptor</soft-descriptor>
    <taxa-embarque>1000</taxa-embarque>
    <avs>
  <![CDATA[
      <dados-avs>
        <endereco>Rua Teste AVS</endereco>
        <complemento>Casa</complemento>
        <numero>123</numero>
        <bairro>Vila AVS</bairro>
        <cep>12345-123</cep>
        <cpf>11111111111</cpf>
      </dados-avs>
  ]]>
    </avs>
  </dados-pedido>
  <!-- ... -->
</requisicao-transacao>
```

* **Purpose**: AVS is a service to card transaction not presencial where is realized a register validation through numeric data of address informed by holder (shipping/delivery address on invoice) at online store, with register data of emitter.
  * AVS is a service that helps to reduce risks of lack of recognition at online shopping. It's a establishment tool to analyze your sales, before decide for transaction capture and product shipping or service.
* **Rules**
  * Available just for Visa, Mastercard and Amex issuers.
  * Products allowed: only credit.
  * The consult returned to AVS is separated in two itens: CEP and address.
  * Each one can have the values following:
    * C- Check;
    * N- Not check;
    * U - unavailable
    * T - Temporarily unavailable
    * X - Service doesn’t supported by this card issuer
    * E - There are some error on data sent. Check if all fields were sent.
  * The node containing the XML of AVS must be encapsulated by "CDATA" term, to avoid problems with the parter of request.
  * All fields contained AVS node must be filled.
  * When some field is not relevant, the tag must be sent with NULL or N/A.
  * It's necessary enable the option AVS on the register. To enable an option AVS on the register or consult the participant banks please, contact Cielo E-commerce Web Support..

<aside class="warning">According contract, this additional service is subjected to charge from the moment of the request for consulting AVS. For more information, please, contact our service center, commercial manager or Cielo E-commerce Web Support.</aside>

## Capture

An authorized transaction only creates the credit for a commercial establishment in case being captured. **That's why all sales that the retailer want effective must be necessary realize the capture (or confirmation).**

For sales on Credit modality, this confirmation happens in two moments:

* Immediately after the authorization (total capture);
* After the authorization (total capture or partial).

In the first case, it's not necessary to send a request to capture, because it's done automatically by Cielo after the authorization of transaction. For this purpose, it's necessary configure the request of transaction defining the value "true" for a TAG <capturar>, according to section "Creating a transaction".

In the second case, it's necessary to do a "later capture", through the new request to Cielo Webservice to confirm the transaction and receive the sale value.

<aside class="warning">The maximum time to realize the later capture is 5 continuous days after the authorization date. For example, if an authorization happens on 10/12 at 15h20m45s, the limit for a capture will be at 15h20m45s on 15/12.</aside>

<aside class="notice">This option doesn’t exist for debit modality: all debit transaction authorized is captured automatically.</aside>

### Total and Partial Capture

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-captura id="0374f305-0e23-4aad-82a2-055788c8cf4d" versao="1.2.1">
  <tid>10069930690360EF1001</tid>
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3</chave>
  </dados-ec>
  <valor>10000</valor>
  <taxa-embarque>1000</taxa-embarque>
</requisicao-captura>

```

* **Purpose**: realize total and partial capture of a transaction previously authorized.
* **Rules**
  * Available only to transaction on the timeout maximum of capture.
  * In case of the amount doesn't be informed, the system will assume the capture of total value.
  * The capture value must be lower or equal to authorization value.
  * In case of failure, new capture tries can be done.
  * In case of success, the status is chaged to "6 - Captured".
  * **Transaction with boarding fees:**
    * On the request capture, the boarding fee indicates the total of amount that will be captured that must be destined to this purpose.
    * It's mandatory in case of partial capture.
    * In case of total capture, the system will consider the value of boarding fee informed to request of authorization (`<requisicao-transacao>`).

### Return

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="0378c8cf4d">
  <tid>10069930690360EF1001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <!-- ... -->
  <captura>
    <codigo>6</codigo>
    <mensagem>Transacao capturada com sucesso</mensagem>
    <data-hora>2011-12-08T14:23:08.779-02:00</data-hora>
    <valor>900</valor>
    <taxa-embarque>900</taxa-embarque>
  </captura>
</transacao>
```

The field of node `<captura>` are detailed below:

|Element|Type|Size|Description|
|---|---|---|---|
|captura|||Node with capture data in case that it has been passed for this step.|
|captura.codigo|Numérico|1..2|Processing code|
|captura.mensagem|Alfanumérico|1..100|Processing details|
|captura.datahora|Alfanumérico|19|Date and time of processing.|
|captura.valor|Numérico|1..12|Processing value without points. The last two numbers are “centavos”|
|captura.taxa-embarque|Numérico|1..9|Montante declarado como taxa de embarque que foi capturado.|

## Cancellation

The cancellation is used when the retailer decides for don't effective a purchase order, because the stock is not enough, because the customer gave up, ot any other reason. Its usage is necessary especially if the transaction has been captured, because there will be a debit on holder's invoice if it won't be cancelled.

<aside class="notice">If the transaction is just authorized and the store want to cancel it, the cancellation order it's not necessary, because after the timeout of capture expires, it will be cancelled automatically by the system.</aside>

### Total and Partial Cancellation

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<requisicao-cancelamento id="13368079-dedc-4cdf-9140-84473faf83d4" versao="1.2.1">
  <tid>100699306903613D1001</tid>
  <dados-ec>
    <numero>1006993069</numero>
    <chave>25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3
</chave>
  </dados-ec>
  <valor>200</valor>
</requisicao-cancelamento>
```

* **Purpose**: Realize the cancellation of total or partial value of a transaction.
* **Rules**
  * The total cancellation is valid for captured transaction, and also for authorized ones, the partial is valid just to the captured ones.
  * The cancellation timeout is until 120 current days to credit modality and D+0 to debt.
  * The total cancellation, when realized with success changes the transaction status to "9-Cancelled", while the partial doesn't change the transaction status, keeping it as "6-Captured".
  * In case of XML version 1.6.1 (this version is only for cancellation), the status of partial cancellation will be different: If cancellation OK, the code of status will be 9. In case of error on partial cancellation, the code of status will be 6. This rules are only for partial cancellation
  * Do not use the version 1.6.1 to send transactions. This versions is only to cancellation.
  * If the TAG `<valor>` doesn't be provided, the system will assume the total cancellation.
  * To Amex issuer it's available just the total cancellation.
  * To debit modality, doesn't exist the possibility of effective the partial cancellation.
  * **Transaction with boarding fees:**
    * Captured transactions with the same authorization value (in other words, total capture), have the same treatment for total and partial cancellation, because the boarding fee value is fully cancelled.

|Element|Type|Mandatory|Size|Description|
|---|---|---|---|---|
|tid|Alfanumérico|Sim|1..40|Transaction identifier|
|dados-ec.numero|Numérico|Sim|1..10|Store credential number|
|dados-ec.chave|Alfanumérico|Sim|1..100|Store access key assigned by Cielo|
|valor|Numérico|Opcional|1..12|Value to be cancelled. **If not being informed, it will be a total concellation.**|

#### Return

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao xmlns="http://ecommerce.cbmp.com.br" versao="1.2.1" id="2c18f00a-3ff6-4c85-8865-a4fde599b2b2">
  <tid>100699306903613E1001</tid>
  <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
  <!-- ... -->
  <cancelamentos>
    <cancelamento>
      <codigo>9</codigo>
      <mensagem>Transacao cancelada com sucesso</mensagem>
      <data-hora>2011-12-08T16:46:35.109-02:00</data-hora>
      <valor>1000</valor>
    </cancelamento>
  </cancelamentos>
</transacao>
```

<aside class="notice">The cancellations (partial or total) of transaction with boarding fee and partial capture are not be accepted automatically by the system.</aside>

# Testing and homologation

## Endpoint

The integrating tests must be realized before the homologation starts, during the development (codification) of solution. For this purpose, you must considered an enviroment like EndPoint to Webservice: [https://qasecommerce.cielo.com.br/servicos/ecommwsec.do](https://qasecommerce.cielo.com.br/servicos/ecommwsec.do)

<aside class="warning">All the connections to Cielo services must be done through the URL mentioned on this documentation. Cielo strongly recommend you don't  use the direct connection via IP, because it can vary without previously notice.</aside>

## Testing data

The data gross to realize the tests on this environment will be displayed on table below:

|Card issuer|Authentication|Testing number card|Validity|Secure code - - CVC|
|---|---|---|---|---|
|Visa|Yes|4012001037141112|05/2018|123|
|Mastercard|Yes|5453010000066167|05/2018|123|
|Visa|No|4012001038443335|05/2018|123|
|Mastercard|No|5453010000066167|05/2018|123|
|Amex|No|376449047333005|05/2018|123|
|Elo|No|6362970000457013|05/2018|123|
|Diners|No||
|Discover|No|6011020000245045|05/2018|123|
|JCB|No|3566007770004971|05/2018|123|
|Aura|No|5078601912345600019|05/2018|123|

## Testing key

To make easier the development we provided two key for tests, one for each modality of integration. Based on initial configurations done on your registration, choose the correct data to realize the tests:

|Commercial establishment number|Testing key|
|---|---|
|1006993069|25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3|

<aside class="warning">The order value, besides to follow the format without points or decimal commas, must finish on "00", otherwise, the authorization will be always declined. Example: R$15,00 must be formated as "1500".</aside>

<aside class="notice">The testing environment must be used by testing establishments listed on the board above. The data usage of the establishment will create transaction impossible to track, creating incorrect results. On testing environment, use the credential for tests, on production environment, use the original data from establishment.</aside>

After conclude the development, the Homologation step will ensure that the implementation was appropriate and the customer solution is ready to interact with production environment of Cielo. It's always happens after the development has been finished and tested. It's composed by the next steps:

![fluxo testes]({{ site.baseurl_root }}/images/fluxo-testes.png)

1. Conclusion of Registration: at this stage, the customer must send an email to [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br), requesting a production key. The message will contain the next information, that will complete the registration:
  * Definitive URL of website (production environment).
  * Name of responsible company by the development of integration.
  * Name and technical email (responsible developer) by integration.
  * Credential number (at Cielo) of online store.
  * Legal name and fictitious name of online store.
  * User and password to perform testing purchases.
  * URL of store logo on GIF format and size of 112X25 pixels.

<aside class="notice">The logo image must be hosted in a safety environment (HTTP), otherwise the customer will receive security notification that can culminate on shopping abandonment.</aside>

In response, Cielo will return the valid key on production environment. Therefore, the store will be enable to realize tests on this environment. It starts the second step. It's important that the tests be realized to cover the next topics:

* Webservice interact: tests with the connection that you use.
* Visual integration: round trip of Cielo flow (an alternative flow must be considered).
* Correct payment modalities: tests with possible combination of payment.
* Payment methods: testing with the possible combination of payment.

At this moment, you have to consider the environment: [https://ecommerce.cielo.com.br/servicos/ecommwsec.do](https://ecommerce.cielo.com.br/servicos/ecommwsec.do)

<aside class="notice">The online store integration must be done always through the URL above and never for IP. </aside>

Production tests have to be done with card that belongs to the store or which holder authorized its usage, once in this environment exists a financial commitment about transaction realized.

At the end, a new request must be sent to cieloecommerce@cielo.com.br, to Cielo realize the homologation, indeed. The mass of tests will be executed to approve or deny the transactions.

The result "homologated" will be sent by e-mail. If there is any point that doesn't allow the conclusion of homologation, the information will be also sent by e-mail requesting the corrections that are necessary.

# Final considerations

## Reading rules to store's card

The reading of card data on own environment is controlled by rules defined by security program imposed by card issuers.

For Visa, this program is known as AIS (Account Information Security) PCI. To more information, access: [https://www.cielo.com.br](https://www.cielo.com.br) > Service > Security Service > AIS - Information Security Program or contact us.

For Mastercard, the security program is SDP (Site Data Protection) PCI. For more information, access:  [http://www.mastercard.com/us/sdp/index.html](http://www.mastercard.com/us/sdp/index.html), or contact us.

Moreover, once requests are attended, at the credential (register) on e-commerce website, must be mentioned the option for reading the card from your own store.

## Digital Certificate

In some environment is necessary extract the Digital Certificate that the Cielo E-commerce application uses to be installed on TrustStore of customer, specially in Java and PHP environments.

o obtain the certificate, please, open a browser and access: [http://ecommerce.cielo.com.br](http://ecommerce.cielo.com.br); click on the icon that displays the information about the certificate:

**Google Chrome**:

![Certificado no Google Chrome]({{ site.baseurl_root }}/images/certificado-chrome.png)

**Mozilla Firefox**:

![Certificado no Mozilla Firefox]({{ site.baseurl_root }}/images/certificado-firefox.png)

**Internet Explorer**:

![Certificado no Internet Explorer]({{ site.baseurl_root }}/images/certificado-ie.png)

Verified Program by Visa (Visa)

International Program of Visa allows the customer authentication at the purchase moment on e-commerce environment. Visit: http://www.verifiedbyvisa.com.br/  to more information.

Secure Code Program (Mastercard)

International Program of Mastercard allows the customer authentication at the purchase moment on e-commerce environment. Visit: [http://www.verifiedbyvisa.com.br/](http://www.verifiedbyvisa.com.br/) to more information.
