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
  xml: XML
---

# Webservice integration 1.5

The purpose of this documentation is to orientate the developer about how to integrate with Cielo Webservice, describing its functionalities, the methods to be used, list information to be sent and received and provide examples.

The integration mechanism with Cielo E-commerce is Yesple, so that are necessary only an intermediate knowledge in programming language for Web, HTTP/HTTP requisitions and handling XML archive to implant Cielo E-commerce solution with success.

Importantly to use this platform, the website must comply with safety rules or use the PCI certification. For questions about web security, please send email to: [Segurança Web](mailto:e-seg@cielo.com.br).

After conclude the registration and receive the instructions, you need to develop the integration using this documentation as a guide. Once the integration is completed, it’s necessary to fill the homologation form fully and then send it to Cielo E-commerce Web Support that will inform the secure key to the establishment.

Finally, after the development, to start the operation on production environment, first, it's necessary start the homologation at Cielo.

<aside class="notice">Look at section <a href="#testing-and-homologation">Testing and homologation</a> to more instruction about the homologation process</aside>

## Cielo Support

After reading this documentation, if you still have questions (technical or not), you can check Cielo technical support 24 hours per day, 7 days of week, in Portuguese and English, in the following contacts:

- +55 4002-9700 – _Capitals and Metropolitan regions_
- +55 0800-570-1700 – _Others localities_
- +55 11 2860-1348 – _International_
  - Option 1: _Technical support_
  - Option 2: _E-commerce credential_
- Email: [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)

## Glossary

To facilitate the understanding, we listed below a small glossary with the main terms related to e-commerce, card market and acquiring services:

- **Authentication**: process to ensure that the buyer is really who says (authentic holder), generally it happens at the issuing bank using the digital token or security key card.
- **Authorization**: process to verify if a purchase can be realized or not with a card. In this moment several verification are done with the card and the holder (Funds availability, blocked account, blockades, etc), It's also in this moment that the card limit is cross-checked with the transaction value.
- **Cancellation**: process to cancel the purchase that has been realized with card.
- **Capture**: process to confirm the authorization that has been realized previously. Only after the capture, the cardholder can check this in his bank statement or invoice.
- **Key access**: it's a specific secure code for each store, created by Cielo, and used to realized an authentication and communication in all messages exchanged with Cielo. It's also known as production key and data key.
- **Buyer**: who effectives the purchase at online store.
- **Emitter** (or Issuing Bank): it's the financial institution that issues credit card, debt or voucher.
- **Commercial establishment or EC**: entity that responses for online store.
- **Payment gateway**: company responsible for technical integration and for processing transactions.
- **Credential number**: it's an identifier number that the retailer receives after registered at Cielo.
- **Holder**: it's the person who carries the card in the moment of purchase.
- **Security Code**: international program of MasterCard to allow the buyer authentication in the moment of purchase in e-commerce environment.
- **TID (Transaction Identifier)**: a code composed by 20 characters that identifies only Cielo E-commerce transactions.
- **Transaction**: it's the purchase order to cardholder at Cielo.
- **VBV (Verified by Visa)**: International Program at Visa that allows the buyer authentication in the moment of purchase in e-commerce environment.

<aside class="notice">Access http://www.mastercard.com.br/securecode to more details about SecureCode</aside>
<aside class="notice">Access http://www.verifiedbyvisa.com.br to more details about VBV</aside>

## Products and Card Issuers supported

The current version of Cielo Webservice has support to the following products and card issuers:

| Card Issuer      | Lump Sum | Credit card installments | Debt | Voucher |
| ---------------- | -------- | ------------------------ | ---- | ------- |
| Visa             | Yes      | Yes                      | Yes  | _No_    |
| Master Card      | Yes      | Yes                      | Yes  | _No_    |
| American Express | Yes      | Yes                      | _No_ | _No_    |
| Elo              | Yes      | Yes                      | _No_ | _No_    |
| Diners Club      | Yes      | Yes                      | _No_ | _No_    |
| Discover         | Yes      | _No_                     | _No_ | _No_    |
| JCB              | Yes      | Yes                      | _No_ | _No_    |
| Aura             | Yes      | Yes                      | _No_ | _No_    |
| Hipercard        | Yes      | Yes                      | _No_ | _No_    |

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

- [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
- [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
- [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
- [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ecommerce.cielo.com.br.cer.zip)

## Step by Step Installation

### INSTALLATION ON THE SERVER OF ONLINE STORE

To install the EV Certificate you shall contact your server vendor support

<aside class="warning">Cielo does not support the installation of the certificate.</aside>

### CUSTOMER ACCESS TO ONLINE STORE

Normally, the browser makes a Certificate update automatically, in case of failure and client contacted you to inform it, follow the steps:

#### 1st STEP:

Save the files below into a new folder, or recall easily to be used later:

- [Root Certificate]({{ site.baseurl }}/attachment/Root.crt)
- [Intermediate 1 certificate]({{ site.baseurl }}/attachment/Intermediate1.crt)
- [Intermediate 2 certificate]({{ site.baseurl }}/attachment/Intermediate2.crt)
- [E-Commerce Cielo certificate]({{ site.baseurl }}/attachment/ServerCertificate.crt)

#### 2nd STEP:

In the "Internet Explorer", click on "Tools" menu and access the "Internet Options":

![Instalar IE]({{ site.baseurl_root }}/images/certificado-instalar-ie-1.jpg)

In the "Firefox" browser, click on "Open Menu" and go to "Advanced" and "Options":

![Instalar FF]({{ site.baseurl_root }}/images/certificado-instalar-ff-1.jpg)

In "Chrome", click on "Customize and control Google Chrome" and go to "Settings" and "Show advanced settings ..." “Change Proxy Settings” and "Content" and Certificates:

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

- **Email:** [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br)
- **Metropolitan region:** 4002-9700
- **Other Cities:** 0800 570 1700

Hours: 24 hours a day, 7 days a week.

# Overview

In this documentation we will be present an overview of Cielo E-commerce and the technical mechanism of Webservice integration format (named in the previous version as "Buy Page Loja").

To more information about integration at Checkout Cielo format (named in the previous versions as Buy Page Cielo or Integrated Solution) access: [https://www.cielo.com.br/ecommerce](https://www.cielo.com.br/ecommerce).

For all purchase orders, the purpose is convert it in a sale. A sale using a card can be characterized as an authorized and captured transaction.

<aside class="warning">An authorized transaction only creates credit to the retailer if it can be captured (or confirmed).</aside>

## Solutions characteristics:

The Webservice solution at Cielo E-commerce platform has been developed based on XML technology, a market pattern and independent of technologies used by our customers. In this way, it's possible to integrate it by using the various programing languages, like: ASP, ASP.NEt, Java, PHP, Ruby, Python, etc.

Among others characteristics, the most highlighted attributes of Cielo E-commerce platform are:

- **No proprietary application**: it's not necessary to install application at online store environment in any case.
- **Yesplicity**: the protocol used is purely HTTP, without necessity of using SOAP.
- **Registering facility**: the customer's credential information (affiliation number and access key) transits in common fields of XML, without necessity of special attributes, as SOAP Header.
- **Security**: the information exchange always happens between the Store Server and Cielo, in other words, without the buyer’s browser.

## Consideration about integration

- All the Web Service requests at Cielo must contain a retailer's link authentication, composed by credential number and access key.
- The store registration must be active on Cielo.
- You must define appropriate deadline ton HTTP requests to Cielo, we recommend 30 seconds.
- The Root certificate of certifier entity (CA) of our Web Service must be registered on Truststore that will be used. Because our certifier has a wider market acceptance, probably this is already registered on Truststore of own operational system.
- We make available the ecommerce.xsd archive on integration kit to make easier the validation format restriction, size field, types and data domains.
- In all messages of data/hour you have to follow the format: yyyy=MM=ddTHH24:mm:ss. Example: 2011-12-21T11:32:45.
- The monetary value is always handled as intire values, without representation of decimals place, in such case the last two digits are considered as “centavos”. Example: R$ 1.286,87 is represented as 128687; R$ 1,00 is represented as 100.

<aside class="notice">Look the Digital Certificate to information about Cielo Certificates:</aside>

## Architecture

The integration is realized through the available services as Web Services. The model employed is quite Yesple: there is an unique URL (endpoint) that receives the POSTs via HTTPs and, depending of XML format sent, a specific operation is realized.

The Web Service request is summarized for:

- The message in XML format, defined according to the functionality.
- The destiny (testing environment or production).
- The return on XML format, can be: `<transacao/>`, `<retorno-token>` or `<erro/>`.

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

## Mandatory Updates

### Payment Facilitators

All E-Commerce customers who are **Payment Facilitators, as required by the flags and Central Bank** must submit new fields in **transactional messaging**. Cielo will transmit the information to the flags through transactional messaging at the time of authorization.

The new fields are contained within the **&lt;subcredenciador&gt;** tag. In addition to the fields in this new node, facilitators will also have to send the **&lt;soft-descriptor&gt;** tag. Below is an example of sending and reply.

<aside class="warning"><b>Attention: We emphasize that information shouldn't be submitted before February 20, 2020, as there is a risk of losing transactions.</b></aside>

#### Request

```xml
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>2000000001</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</chave>
        <subcredenciador>
            <numero>12345678901</numero>
            <sub-ec>
                <numero>2000130733</numero>
                <mcc>5542</mcc>
                <endereco>Alameda Xingu, 512</endereco>
                <cidade>Barueri</cidade>
                <estado>SP</estado>
                <codigo-postal>06537085</codigo-postal>
                <telefone>11978962345</telefone>
                <documento>53976428000130</documento>
                <codigo-pais>076</codigo-pais>
            </sub-ec>
        </subcredenciador>
    </dados-ec>
    <dados-portador>
        <numero>518605152xxxxxx5923</numero>
        <validade>aaaamm</validade>
        <indicador>1</indicador>
        <codigo-seguranca>xxx</codigo-seguranca>
        <nome-portador>Jose Luis</nome-portador>
        <token/>
    </dados-portador>
    <dados-pedido>
        <numero>54583</numero>
        <valor>10000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>lojinha</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
</requisicao-transacao>
```

<aside class="warning"><b>Attention: Fields mustn't be sent with spacing to the left. Subject to rejection in the settlement of transactions.</b></aside>

#### Response

<aside class="notice">Note: In response from 1.5, no facilitator data is returned.</aside>

```xml
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<transacao id="a97ab62a-7956-41ea-b03f-c2e9f612c293" versao="1.2.1" xmlns=http://ecommerce.cbmp.com.br>
    <tid>10069930691VE920A57C</tid>
    <pan>LtEYby/oCSWVqxTgWTU8T3Lq642xUUiNI+Ue38kiQK0=</pan>
    <dados-pedido>
        <numero>178148599</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2011-12-07T11:43:37</data-hora>
        <descricao>[origem:10.50.54.156]</descricao>
        <idioma>PT</idioma>
        <criptomoeda>true</criptomoeda>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <status>4</status>
    <autenticacao>
        <codigo>4</codigo>
        <mensagem>Transacao sem autenticacao</mensagem>
        <data-hora>2022-06-29T14:31:37.769-03:00</data-hora>
        <valor>1000</valor>
        <eci>7</eci>
    </autenticacao>
    <autorizacao>
        <codigo>4</codigo>
        <mensagem>Transacao autorizada</mensagem>
        <data-hora>2022-06-29T14:31:37.769-03:00</data-hora>
        <valor>1000</valor>
        <lr>00</lr>
        <arp>163940</arp>
        <nsu>687251</nsu>
    </autorizacao>
</transacao>
```

| Property                     | Type         | Size | Required                  | Description                                                                                                                                          |
| ---------------------------- | ------------ | ---- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| subcredenciador.numero       | Number       | 11   | Required for facilitators | Facilitator's establishment code. “Facilitator ID” (Registration of the facilitator with the card brands)                                            |
| sub-ec.numero                | Number       | 15   | Required for facilitators | Sub Merchant establishment code. “Sub-Merchant ID” (Registration of sub-accredited with the facilitator)                                             |
| sub-ec.mcc                   | Number       | 4    | Required for facilitators | MCC do sub Merchant.                                                                                                                                 |
| sub-ec.endereco              | Alphanumeric | 22   | Required for facilitators | Sub Merchant Address.                                                                                                                                |
| sub-ec.cidade                | Alphanumeric | 13   | Required for facilitators | City of the sub Merchant.                                                                                                                            |
| sub-ec.estado                | Alphanumeric | 2    | Required for facilitators | State do sub Merchant.                                                                                                                               |
| sub-ec.codigo-postal         | Number       | 9    | Required for facilitators | Sub Merchant Postcode.                                                                                                                               |
| sub-ec.telefone              | Number       | 13   | Required for facilitators | Sub Merchant Phone Number.                                                                                                                           |
| sub-ec.documento             | Number       | 14   | Required for facilitators | CNPJ or CPF of the Sub Merchant.                                                                                                                     |
| sub-ec.codigo-pais           | Number       | 3    | Required for facilitators | Sub Merchant country code based on ISO 3166.<br>Ex: Brazil's ISO 3166 code is 076. [Complete list online](https://www.iso.org/obp/ui/#search/code/). |
| dados.pedido.soft-descriptor | Text         | 13   | Required for facilitators | Text printed on buyer bank invoice. Must be completed according to the data of the sub Merchant.                                                     |

### CBPS Transactions

Entities that operate as CBPS (in Portuguese, Bill Payment Service for Consumers) are companies that offer consolidated payment services for
cardholder accounts. CBPS Marking is a Visa-specific option and provides more visibility and accuracy in transactions.

Establishments that operate with this service must be registered with Visa and to operate as such, they must submit some additional information through the
messaging, which are required by the flag. See below:

#### Request

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>xxxxxxxxxx</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxx</chave>
        <mcc-dinamico>xxxx</mcc-dinamico>
    </dados-ec>
    <dados-portador>
        <numero>518605152xxxxxx5923</numero>
        <validade>aaaamm/validade>
        <indicador>1</indicador>
        <codigo-seguranca>***</codigo-seguranca>
        <nome-portador>Teste Cashin</nome-portador>
        <token/>
    </dados-portador>
    <dados-pedido>
        <numero>xxxxx</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2021-11-26T10:00:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>CART*LOJAABCDE</soft-descriptor>
<pagamento-conta>true</pagamento-conta>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
</requisicao-transacao>
```

| Property                     | Type         | Size | Required                                                          | Description                                                                                                  |
| ---------------------------- | ------------ | ---- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| subcredenciador.numero       | Numeric      | 11   | Required for facilitators                                         | Facilitator establishment code. "Facilitator ID” (Registration of the facilitator with the flags)            |
| sub-ec.numero                | Numeric      | 15   | Required for facilitators                                         | Sub Merchant establishment code. “Sub-Merchant ID” (Registration of the sub-accredited with the facilitator) |
| sub-ec.mcc                   | Numeric      | 4    | Required for facilitators                                         | Sub Merchant MCC.                                                                                            |
| sub-ec.endereco              | Alphanumeric | 22   | Required for facilitators                                         | Sub Merchant address.                                                                                        |
| sub-ec.cidade                | Alphanumeric | 13   | Required for facilitators                                         | Sub Merchant city.                                                                                           |
| sub-ec.estado                | Alphanumeric | 2    | Required for facilitators                                         | Sub Merchant state.                                                                                          |
| sub-ec.codigo-postal         | Numeric      | 9    | Required for facilitators                                         | Sub Merchant zip code.                                                                                       |
| sub-ec.telefone              | Numeric      | 13   | Required for facilitators                                         | Sub Merchant phone number.                                                                                   |
| sub-ec.documento             | Numeric      | 14   | Mandatory for facilitators                                        | CNPJ or CPF of the sub Merchant.                                                                             |
| sub-ec.codigo-pais           | Numeric      | 3    | Required for facilitators                                         | Sub Merchant country code based on ISO 3166.                                                                 |
| ados.pedido.soft-descriptor  | Text         | 13   | Required for facilitators                                         | Text printed on the buyer's bank invoice. Must be filled in according to Sub Merchant data.                  |
| dados.pedido.pagamento-conta | Boolean      | ---  | Yes, for an establishment registered as CBPS with the flag        | True or false. Indicates whether it is a CBPS (Consumer Bill Payment Service) transaction                    |
| dados.ec.mcc-dinamico        | Numeric      | 4    | Yes, for a merchant registered as a CBPS with the merchant's flag | MCC (EC) allowed for CBPS transactions                                                                       |

MCC Permissions for CBPS:

|4814 (Telecommunication Services)
|4899 (Cable TV, Satellite and other Television/Radio Services)
|4900 (Public Services - Electricity, Gas, Water, Sewage)
|6012 Financial Institutions - Goods, Services and Debt Repayment
|6051 - CASAS CAMB/TRAVELEE (Non-Financial Institutions - Foreign Currency, Non-Fiduciary Currency (for example: Cryptocurrency)
|6300 (Insurance Sales, Subscription and Premiums)
|6513 (Property Agents and Managers - Rentals)
|8011 Doctors (not classified elsewhere)
|8050 (Personal Care or Nursing Facilities)
|8062 Hospitals
|8099 Medical and Health Professional Services (Not Classified Elsewhere)
|8211 (1st and 2nd Grade Schools)
|8220 (Colleges, Universities, Vocational Schools and Short-Term Colleges)
|8241 (Schools by Correspondence)
|8244 (Business and Secretarial Schools)
|8249 (Vocational Education/Professional Training)
|8299 (School and Educational Services [Not Classified Anywhere Else])
|8351 (Nursery Services)
|9311 (Payment of Taxes)

### Quasi cash

Quasi Cash Transactions are those transactions referring to purchases of chips for online games, purchases of lottery tickets or related. Only a few MCCs (Actuation Category Codes) that can process transactions of this model. Consult the Cielo team to understand if your business fits this model.

All E-commerce customers who transact **quasi cash**, must use the request for a debit and/or credit transaction (depending on the type of payment chosen) and additionally forward the tag quasi-cash as the following example:

#### Request

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>xxxxxxxxxx</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </chave>
    </dados-ec>
    <dados-portador>
        <numero>xxxxxxxxxxxxxxxxx</numero>
        <validade>xxxxxx</validade>
        <indicador>1</indicador>
        <codigo-seguranca>123</codigo-seguranca>
        <nome-portador>TESTE</nome-portador>
        <token/>
    </dados-portador>
    <dados-pedido>
        <numero>79346</numero>
        <valor>35000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>soft teste</soft-descriptor>
        <quasi-cash>true</quasi-cash>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>A</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>false</capturar>
    <gerar-token>false</gerar-token>
   </requisicao-transacao>
```

| Property                | Type    | Size | Required                                                     | Description                                                              |
| ----------------------- | ------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Dados-pedido.quasi-cash | Boolean | -    | Yes, for merchants that operate with Quasi-cash transactions | True or false. If true, Indicates whether it is a quasi-cash transaction |

### SDWO Transactions

It is categorized as an SDWO (Staged Digital Wallet Operators) a company that offers digital wallet/wallet services, that is, that allows the holder to pay for the purchase of a product or service through its own platform, either with card registration credit or debit, or QR code generation.

To transact as SDWO, the establishment needs to register with the flags. For this, contact your Cielo commercial manager for more information.

In the case of ecommerce transactions of an SDWO with a credit or debit card (not originated by a QR Code), it is necessary for the wallet to send some additional data in the transaction, so that the brands can identify and differentiate this type of transaction. See the specifications below:

> In addition to the specific fields of this modality, for SDWO transactions it is also mandatory to send the Soft Descriptor (field `dados-pedido.soft-descriptor`) and CPF/CNPJ of the bearer (field `data-portador.cnpj-cpf-portador` ). See more details about these fields in the requisition properties table.

To carry out tests, it is only necessary to follow the guidelines in the [Testing and Homologation] menu (https://developercielo.github.io/manual/webservice-1-5#testes-e-homologa%C3%A7%C3%A3o)

To send the retailer's MCC in the SDWO transaction, the market orientation is to use the ABECS (Brazilian Association of Credit Card and Services Companies) table that performs the de-to of CNAEs for the MCCS of the entire industry. This table is constantly updated and is available online on the Abecs website at the following link:[ABECS](https://www.abecs.org.br/consulta-mcc-individual)

**Important:** SDWO marking is only accepted for the following modalities and brands: Visa/Elo-credit and debit; Mastercard - credit only. Accepts foreign cards.

#### Request

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>xxxxxxxxxx</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxx</chave>
        <mcc-dinamico>xxxx</mcc-dinamico>
    </dados-ec>
    <dados-portador>
        <numero>xxxxxxxxxxxxxx</numero>
        <validade>******</validade>
        <indicador>1</indicador>
        <codigo-seguranca>***</codigo-seguranca>
        <nome-portador>Teste Cashin</nome-portador>
        <token/>
        <carteira>
           <tipo>MASTERPASS</tipo>
        </carteira>
    </dados-portador>
    <dados-pedido>
        <numero>xxxxx</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2021-11-26T10:00:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>CART*LOJAABCDE</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
</requisicao-transacao>
```

| Property                           | Type    | Size | Required                                                                                                                       | Description                                                                                                                                                                                               |
| ---------------------------------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dados-ec.mcc-dinamico              | Numeric | 4    | Yes, for underlying retailer SDWO                                                                                              | MCC transactions (for purchase transactions); MCC of the digital wallet (for credit supply transactions in the wallet, if applicable – in which the cash in markup also seen in this session is required) |
| Carteira.tipo                      | Text    | 3    | Acronym of the portfolio that is registered here at Cielo as a digital wallet (check its acronym with your commercial manager) |
| `dados-portador.cnpj-cpf-portador` | Numeric | 14   | Yes, for SDWO transactions                                                                                                     | Customer's CPF or CNPJ number.                                                                                                                                                                            |
| `Dados-pedido.soft-descriptor`     | Text    | 13   | Yes, for SDWO transactions                                                                                                     | Text that will be printed on the bearer's bank statement.<br>No special characters allowed.<br>Must be filled in with **Wallet name\*shopkeeper name**                                                    |

### CASH IN Transactions

A Cash In transaction is an operation to add credits to a digital wallet. Establishments that operate with this type of transaction must be registered as a digital wallet with the brands and must be registered with one of the following MCCs (Establishment Category Codes): 6540 or 6051.

In addition, they need to send some additional data in the transaction, so that the brands can identify and differentiate this type of transaction. See the specifications below:

**Important:** Cashin booking is only accepted for the following modalities and brands: Visa/Master credit only; Link debit and credit. It is not accepted for foreign card.

#### Request

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>xxxxxxxxxx</numero>
        <chave>xxxxxxxxxxxxxxxxxxxxxxxxx</chave>
    </dados-ec>
    <dados-portador>
        <numero>xxxxxxxxxxxxxx</numero>
        <validade>******</validade>
        <indicador>1</indicador>
        <codigo-seguranca>***</codigo-seguranca>
        <nome-portador>NOME DO PORTADOR</nome-portador>
        <token/>
        <carteira>
           <tipo>MASTERPASS</tipo>
        </carteira>
    </dados-portador>
    <dados-pedido>
        <numero>xxxxx</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2021-11-26T10:00:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>CART*LOJAABCDE</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>mastercard</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>true</capturar>
    <gerar-token>false</gerar-token>
    <cash-in>true</cash-in>
</requisicao-transacao>
```

| Property      | Type    | Size | Required                                   | Description                                                                                                                 |
| ------------- | ------- | ---- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Carteira.tipo | Text    | 3    | Yes, for SDWO transactions                 | Acronym of the wallet that is registered here at Cielo as a digital wallet (check its acronym with your commercial manager) |
| Cash-in       | Boolean | -    | Yes, for Cash In transactions from an SDWO | True or false. If true, it indicates if it is an SDWO cash in transaction.                                                  |

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
    <taxa-embarque/>
    <soft-descriptor/>
    <numero-bilhete>123456</numero-bilhete>
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

## ROOT Node

| Element                             | Type         | Mandatory | Size    | Description                                                                                                                                                                                                               |
| ----------------------------------- | ------------ | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dados-ec](#dados-ec)               | n/a          | Yes       | n/a     | Establishment data                                                                                                                                                                                                        |
| [dados-portador](#dados-portador)   | n/a          | Yes       | n/a     | Holder data                                                                                                                                                                                                               |
| [dados-pedido](#dados-pedido)       | n/a          | Yes       | n/a     | Order data                                                                                                                                                                                                                |
| [forma-pagamento](#forma-pagamento) | n/a          | Yes       | n/a     | Payment-method                                                                                                                                                                                                            |
| url-retorno                         | alphanumeric | Yes       | 1..1024 | URL of return's page. This page is that one used by Cielo to direct the browser in the end of authentication or authorized. It's not only mandatory for a direct authorization, but the field must be inserted as `null`. |
| capturar                            | Boolean      | Yes       | n/a     | `true` or `false`. Define if a transaction will be captured automatically in case of being authorized.                                                                                                                    |
| campo-livre                         | alphanumeric | optional  | 0..128  | Free field available to the establishment.                                                                                                                                                                                |
| bin                                 | numeric      | optional  | 6       | Six first card numbers.                                                                                                                                                                                                   |
| gerar-token                         | Boolean      | optional  | n/a     | `true` ou `false`. Define if the current transaction must create an associate token to card.                                                                                                                              |
| avs#avs                             | alphanumeric | optional  | n/a     | String containing a XML block, encapsulated by CDATA, containing required information to realized a service consult.                                                                                                      |

## data-ec

| Element | Type         | Mandatory | Size   | Description                             |
| ------- | ------------ | --------- | ------ | --------------------------------------- |
| numero  | numeric      | Yes       | 1..20  | Affiliation number of Store with Cielo. |
| chave   | alphanumeric | Yes       | 1..100 | Store's access key attributed by Cielo. |

## data-bearer

| Element          | Type            | Mandatory   | Size   | Description                                                                                                                                                              |
| ---------------- | --------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| numero           | numeric         | Yes         | 19     | Card number                                                                                                                                                              |
| validade         | Numénumericrico | Yes         | 6      | Card validity of format: yyyymm. Example: 201212 (dec/2012).                                                                                                             |
| indicador        | numeric         | Yes         | 1      | Card validity of Secure Code Sending: **0** - Not informed, **1**- informed, **2**-illegible, **9**- Inexistent                                                          |
| codigo-seguranca | numeric         | Condicional | 3..4   | Security code is required when indicator is **1**                                                                                                                        |
| nome-portador    | alphanumeric    | Optional    | 0..50  | Holder name                                                                                                                                                              |
| token            | Alfanumeric     | Conditional | 0..100 | Token must be used in replacement to card data to direct authorization or recurrent. It's not allowed to send a token with the card information in the same transaction. |

## order-data

| Element         | Type         | Mandatory | Size    | Description                                                                                                                                                                                    |
| --------------- | ------------ | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| numero          | Alphanumeric | Yes       | 1..20   | Order number of store. **We recommend just one number per order.**                                                                                                                             |
| valor           | Numeric      | Yes       | 1..12   | Amount to be charged on the order (must be also included shipping costs, package, extras costs, boarding fees, etc). This amount will be charged from customer.                                |
| moeda           | Numeric      | Yes       | 3       | Numeric code of currency at norm ISO 4217. **For "Real", the code is 986.**                                                                                                                    |
| data-hora       | Alphanumeric | Yes       | 19      | Data hour of order. **Format**: yyyy-MM-ddTHH24:mm:ss                                                                                                                                          |
| descricao       | Alphanumeric | Optional  | 0..1024 | Order description                                                                                                                                                                              |
| idioma          | Alphanumeric | Optional  | 2       | Order language: PT (Portuguese), EN (English) or ES (Spanish). Based on this information the language is defined used on Cielo' screens. **If it won't be sent, the system will assume "PT".** |
| taxa-embarque   | Numeric      | Optional  | 1..9    | Amount of authorization value that must be destined to boarding fee.                                                                                                                           |
| soft-descriptor | Alphanumeric | Optional  | 0..13   | Text until 13 characters that will be shown on holder's invoice, after the Commercial Establishment name.                                                                                      |
| numero-bilhete  | Alphanumeric | Optional  | 13      | Notify the main air ticket number of the transaction.                                                                                                                                          |
| cryptocurrency  | Boolean      | Optional  |         | Not Apply                                                                                                                                                                                      | true or false. Defines if the current transaction was in cryptocurrency. |

<aside class="notice">The customer register will be enable to transact only with REAL currency, in case you need more information, contact the service center, commercial manager or Cielo E-commerce Web Support</aside>

## payment-method

| Element  | Type         | Mandatory | Size | Description                                                                                                                |
| -------- | ------------ | --------- | ---- | -------------------------------------------------------------------------------------------------------------------------- |
| bandeira | Alphanumeric | Yes       | n/a  | NomeCard issuer's name (minuscule): "visa", "mastercard", "diners", "discover", "elo", "amex", "jcb", "aura", "hipercard". |
| produto  | Alphanumeric | Yes       | 1    | Product code: **1**- Repayable on demand, **2**- Credit card installments on store, **A**- Debt                            |
| parcelas | Numeric      | Yes       | 1..2 | Installments number. **To repayable on demand or debt, use 1.**                                                            |

<aside class="warning">The result of order division by installments number don't must be lower than R$ 5,00. Otherwise the transaction will be deny.</aside>

## Integration flux and redirection

After creating a transaction, the browsing flux can be directed to Cielo environment, if the retailer requests the authentication on XML message.

In this situation, the retailer' system will obtain the amount of TAG of XML <url-autenticacao> returned to realize a redirection on customer browser and continues the process. The redirecting must be realized in "Full Screen" mode. In the other words, there is no more support to the pop up window. This way, from a checkout screen must be realized a redirecting to URL returned at transaction's creation.

<aside class="notice">This redirection can be done through Http Redirect (as in the code Model) or through a Javascript.</aside>

After the authentication process, the flux is returned to the retailer through the present information on TAG, sent in the first request to Cielo.

The diagram below makes easier the view of complete flux of browsing:

![fluxo]({{ site.baseurl_root }}/images/fluxo.png)

<aside class="notice">Generally, the URL of return follow this format: https://minhaloja.com.br/pedido?id=12345678. This page must use the order number to internally search TID that was returned by Cielo. With this information, the page must realize a request of Consult via TID to Cielo's Web Service and interpret the result to show to customer.</aside>

In the other hand, when there is no authentication, doesn't exist the context exchange or redirections and the integration is more Yesple:

![fluxo-Yesples]({{ site.baseurl_root }}/images/fluxo-Yesples.png)

## Return types

There are three types of return that can be created on WebService response:

1. `<transacao>`
2. `<retorno-token>`
3. `<erro>`

To operations related to a transaction (consults, authorization, capture and cancellation) in case of success the response is always a XML of type `<transacao>`. In case of an exclusive request to create a token, the response expected is `<retorno-token>`.

The next example shows the more reduced way of a message of return such <transaction>. Basically, it's composed by order data and data from transaction's configuration.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<transacao versao="1.6.2" id="af32f93c-5e9c-4f44-9478-ccc5aca9319e" xmlns="http://ecommerce.cbmp.com.br">
    <tid>100699306908642F1001</tid>
    <pan>uv9yI5tkhX9jpuCt+dfrtoSVM4U3gIjvrcwMBfZcadE=</pan>
    <dados-pedido>
        <numero>2132385784</numero>
        <valor>1000</valor>
        <moeda>986</moeda>
        <data-hora>2013-02-18T16:51:30.852-03:00</data-hora>
        <descricao>[origem:0:0:0:0:0:0:0:1]</descricao>
        <idioma>PT</idioma>
        <taxa-embarque>0</taxa-embarque>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <status>4</status>
    <autenticacao>
        <codigo>4</codigo>
        <mensagem>Transacao sem autenticacao</mensagem>
        <data-hora>2013-02-18T16:51:31.158-03:00</data-hora>
        <valor>1000</valor>
        <eci>7</eci>
    </autenticacao>
    <autorizacao>
        <codigo>4</codigo>
        <mensagem>Transação autorizada</mensagem>
        <data-hora>2013-02-18T16:51:31.460-03:00</data-hora>
        <valor>1000</valor>
        <lr>00</lr>
        <arp>123456</arp>
        <nsu>549935</nsu>
        <par>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</par>
    </autorizacao>
</transacao>
```

The more important information are:

- **TID**: it's the link between purchase order of online store and Cielo's transaction.
- **URL de autenticação**: indicates the page that starts the authentication (when requested).
- **Status**: it's the base information to store control the transaction.

The table below details TAGS from basic-XML of return, identified by source node `<transacao>`:

| Element          | Type         | Size   | Description                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tid              | Alphanumeric | 1..40  | Transaction identifier                                                                                                                                                                                                                                                                                                                                    |
| dados-pedido     |              |        | identical to source sent by store on the creation of transaction.                                                                                                                                                                                                                                                                                         |
| forma-pagamento  |              |        | identical to source sent by store on creation of transaction.                                                                                                                                                                                                                                                                                             |
| status           | Numeric      | 12     | code of transaction. Look the appendix to a list of contacts.                                                                                                                                                                                                                                                                                             |
| url-autenticacao | Alphanumeric | 1..256 | URL of redirection to Cielo.                                                                                                                                                                                                                                                                                                                              |
| par              | Numeric      | 29     | The pair will only be returned for transactions sent in xml version 1.6.2. The PAR (payment account reference) is the number that associates different tokens with the same card. It will be returned by the Master and Visa brands and passed on to Cielo e-commerce customers. If the flag doesn't send the information the field will not be returned. |

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

- **Syntatic error**: it happens when a XML message doesn't respect the rules defined by ecommerce.xsd archive. For example, a letter in numeric field, or an absence of a mandatory amount.
- **Semantic error**: it happens when a request asks an operation that is not supported for a specific transaction. For example, try to capture a transaction unauthorized, or even, cancel a transaction that is already cancelled.

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
1. access (url-authentication) - the holder's browser is redirected to Cielo environment. Thereby, the Cielo's page is accessed, it automatically is directed to an issuer bank (3.1). This redirect is so fast that is practically imperceptible.
1. authenticate (token, cpf) - the holder will be on bank environment and will use some mechanism provided by his/her own issuer to realize the authentication of the transaction (generally token, "bingo card"/security card, cpf, electronic sign, etc).
1. resultAuthentication ()- the issuer bank redirects the flux to Cielo with the result of authentication. Then, the flux backs to normal, according to item "2.3 Architecture of integration".
   1.process () - Cielo system process the return of authentication and submit to authorization and, optionally, to automatic capture.
1. sendRedirect(url-return) - Cielo system send a redirection to customer browser to the address specificated on URL of return, provided on the first request (`<requisicao-transacao>`)
1. access (url-return) - the holder's browser access the URL on store environment, where we recommend that you have a consult request via TID to Cielo Web Service.

### Notes

- Only on first redirection (1.2: send Redirect()) is Online Store responsability.
- The buyer is redirected on bank issuer only if the authentication is available. Otherwise, the transaction will progress to authorization automatically (excepting if the authentication has been just requested).

<aside class="notice">Consult products and card issuers supported on item 1.6. “Product and card issuers supported”.</aside>

The prerequisites for a transaction to be certified are listed below:

- Bank and card issuer should be participating in the authentication program;
- The BIN card must be participant in authentication program;
- Setting the // <allow> is 0, 1 or 2.

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

| Elemento  | Tipo        | Tamanho | Descrição                                                                      |
| --------- | ----------- | ------- | ------------------------------------------------------------------------------ |
| codigo    | Numeric     | 1.2     | Código do processamento                                                        |
| mensagem  | Alfanumeric | 1..100  | Detalhe do processamento                                                       |
| data-hora | Alfanumeric | 19      | Data e hora do processamento                                                   |
| valor     | Numeric     | 1..12   | Valor do processamento sem pontuação. Os dois últimos dígitos são os centavos. |
| eci       | Numeric     | 2       | Nível de segurança.                                                            |

The ECI field (Eletronic Commerce Indicator) represents how safety is a transaction. This amount must be considered for the retailer to decide about transaction capture.

<aside class="warning">The ECI indicator is very important, because it's what defines the Chargeback's rules.</aside>

# Consulta BIN

The **Consulta Bin** is a **research service for card data**, whether credit or debit, which returns information to the establishment that allows validating the data filled in on the payment screen. The service returns the following data about the card:

- **Card Flag:** Flag Name
- **Type of card:** Credit, Debit or Multiple (Credit and Debit)
- **Nationality of the card:** Foreign or National
- **Corporate Card:** Whether or not the card is corporate
- **Issuing Bank:** Code and Name
- **Prepaid Card::** yes or no

This information allows you to take actions at checkout to improve store conversion.

<aside class="warning">Query Bin must be enabled by Cielo Support. Please contact the Support team and request authorization for your store.</aside>>

## Integration

### Request

```xml

<?xml version="7.0" encoding="ISO-8859-1"?>
<requisicao-consulta-bin id="a387cb68-b33a-4113-b7c4-9b7dfde871ec" versao="2.2.0"
    xmlns="http://ecommerce.cbmp.com.br">
    <dados-ec>
        <numero>XXXXXXXXXX
        </numero>
        <chave>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</chave
    </dados-ec>
    <bin>506708</bin>
</requisicao-consulta-bin>
```

### Return

XML return example:

```xml

<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<retorno-consulta-bin id="a387cb68-b33a-4113-b7c4-9b7dfde871ec" versao="2.2.0" xmlns="http://ecommerce.cbmp.com.br">
<bin>506708</bin>
<resultado>
<id>8d4d7aaf898bd43d1057f9627ae81003</id>
<status>00</status>
<dados-bin>
    <bandeira>ELO</bandeira>
    <produto>Crédito</produto>
    <emissor>Informação não disponivel</emissor>
    <cartao-estrangeiro>Não</cartao-estrangeiro>
    <cartao-corporativo>Não</cartao-corporativo>
    <codigo-emissor>950</codigo-emissor>
    <pre-pago>Sim</pre-pago>

</dados-bin>
      </resultado>
</retorno-consulta-bin>

```

| Property                  | Type    | size | description                                                            |
| ------------------------- | ------- | ---- | ---------------------------------------------------------------------- |
| `result.id`               | Text    | 30   | Requisition identification ID at Cielo                                 |
| `result.status`           | Text    | 2    | Query status (00-Success; 01-unsupported flag; 02-unsupported product) |
| `data-bin.flag`           | Text    | 20   | Card Banner Name                                                       |
| `data-bin.product`        | Text    | 20   | Card Product Type, Credit Debit or Multiple                            |
| `data-bin.emitter`        | Text    | 20   | Name of bank that issued the card                                      |
| `data-bin.foreign-card`   | Boolean | 3    | "Yes" or "No", indicates whether the card is foreign                   |
| `data-bin.corporate-card` | Boolean | 3    | "Yes" or "No", indicates whether the card is corporate                 |
| `bin-data.emitter-code`   | Numeric | 3    | Issuer code that issued the card                                       |
| `data-bin.prepaid`        | Boolean | 3    | "Yes" or "No", indicates whether the card is prepaid                   |

# Reply Codes Catalog

## Authorization Codes LR

Below are the response codes that account for 99% of the returns generated in the authorization process. The other existing codes are not listed as rarely occur or in specific cases. For these cases must be assumed that they are not likely to retry.

If you have a high amount of return codes that are not listed below, please contact the Cielo Web Support E-commerce.

<aside class="warning"> The descriptions below are exclusively for internal use of the merchant and should not be disclosed to the cardholder. </aside>

<aside class="notice"> Except the AA codes, CA and GA, all others are generated by issuers. </aside>

## Card Brands Retry Program

**What are transaction retries?**

When a shopper tries to make a card purchase at your business, a transaction can be declined due to a number of factors. The next attempts to complete the transaction using the same card is retrying.

**What has changed?**

Each card brand defines the amount that will be charged for retrying. The number of times a transaction will be retried also varies by brand.

**Are transaction retries allowed in e-commerce?**

Card brands define different rules for present and non-present card transactions, like in online sales.

**What is the impact for the merchant?**

Merchants who do not follow the rules will be penalized by charging fees for exceeded transactions, in accordance with each brand program.

Aiming to improve the shopping experience, the payment methods industry, together with ABECS, promoted the standardization of the response codes for rejected transactions made by card.

Attempts are classified as:

> - <p>&#10060; **Irreversible: never retry**</p><br>
>   <br>
>   It means, for example, that the card was canceled for use, has been lost or stolen, there is confirmed fraud, the transaction is not allowed for that product, indicating that there are no circumstances in which the issuer would grant an approval. Any authorization attempt that has previously received an irreversible refusal without any changes in the message will not be successful.
>   <br>
> - <p>&#9989; **Reversible: retry allowed**</p><br>
>   <br>
>   It means that the issuer can approve, but cannot do so now, possibly due to a system issue (down) or lack of limit, suspected fraud or exceeded number of password attempts. These are temporary opt-out decisions made by the issuer that may change over time.
>   The Visa, Mastercard, Elo and Hipercard brands adjusted their rules to limit the number of authorization attempts for a denied transaction. These changes provide for the charging of fees for excessive attempts. Below are the rules for each brand.

### Mastercard

The Mastercard brand has the Transaction Processing Excellence (TPE) program, which includes two categories:

- **Excessive Attempts** – monitors the attempts of denied transactions, in card present and not present environments. Valid for both reversible and irreversible denial codes.

- **Merchant Advice Code Transaction Excellence (MAC)**– monitors transaction retries that are denied, in card-not-present environments that are irreversible. Billing only on (MAC) 03 and 21.

#### 1. Excessive Attempts

These are charges made when the merchant exceeds the rules for retrying transactions.

The brand also performs monitoring for any approved nominal value authorization, with subsequent reversal for transactions below 1 unit of whole currency or the equivalent of US$ 1.

Monitoring is applied to retry transactions for denied and approved purchases, carried out in a present and non-present card environment.

**Table: Excessive Attempts**

| Categories                        | Codes                                                                                                                                  | Validity                 | Domestic Rate | International Rate | When Occurs                 | Retry Allowed                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------- | ------------------ | --------------------------- | ------------------------------ |
| Card present and Card not present | Any denial code that is not assigned to MAC 03 and 21. And also MAC codes if you do not respect the "Excessive Attempts" limits        | Until 01/31/2023         | BRL 2.00      | -                  | From the 11th retry onwards | Retry allowed within 24 hours. |
| Card present and Card not present | Any denial code that is not assigned to MAC 03 and 21. And also the MAC codes if you do not respect the limits of "Excessive Attempts" | New rule from 02/01/2023 | R $2.00       | -                  | From the 8th retry onwards  | Retry allowed within 24 hours. |

- All payment transactions using the same card and the same merchant number will be considered as retries;
- Mastercard has extended the effective date to **01/02/2023** regarding the new program rules **(Excessive Attempts)** previously scheduled for the beginning of 01/11/2022. These are the changes:

1. The excess considered in the program will occur from the eighth attempt within the calculation month. The amount charged has changed.
2. Mastercard is also introducing a limit of 35 failed attempts on the same card and merchant number per continuous 30-day period. Even if the shopper does not exceed the limit of 7 retries in a 24-hour period, but exceeds the monthly limit, the charge will be applied

> Note: The current rule of the Excessive Attempts program is valid until 01/31/2023 (see Table Excessive Attempts), where only 10 attempts to approve the same transaction are allowed (on the same card, and same merchant number), with retry allowed after 24 hours.

#### 2. Merchant Advice Code Transaction Excellence (MAC)

These are charges made when the establishment re-attempts to send authorization for irreversible response codes with the same valid card for a card not present.

Within this retry program, there are programs that are specifically designed for the **“Do not try this transaction again”** scenario. For these cases, Mastercard identifies transactions with the following values: MAC 03 and MAC 21, for example.

The MAC program accepts a few values, however **only MACs 03 and 21 have a specific charge**. The other MACs do not fall under this MAC 03/21 charge.

The other MAC codes: 01, 02, 04, 24, 25, 26, 27, 28, 29 and 30 aren't included the MAC billing program but are included in the Excessive Attempts program billing if you exceed the limits.

Since **10/14/2022** Mastercard has introduced new MAC codes 24, 25, 26, 27, 28, 29 and 30, when an issuer declines a transaction with the response code 51 (Insufficient Funds) followed by one of the MACs below, for the merchant to take the best action.

**Table: MACs**

| MAC | Description                                      | Note                                                                                                                                                     |
| --- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | New account information available (ABU)          | Need to update the data of the account being used in the transaction, using the ABU, for example.                                                        |
| 02  | Cannot be approved at this time, try again later | Must retry the transaction after 72 hours or try the transaction with a different payment method.                                                        |
| 03  | Retry is not allowed                             | Must seek another method of guaranteeing payment, avoiding unnecessary costs of multiple authorization requests that will continue to result in declines |
| 04  | Token requirements not met for this model token  | Need to review the token requirements, as they were not met for the model token sent in the transaction                                                  |
| 21  | Plan cancelled                                   | Customer cancels plan and even after cancellation, the establishment continues to send purchase authorization request.                                   |
| 24  | Try again after 1 hour                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 25  | Try again after 24 hours                         | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 26  | Try again after 2 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 27  | Try again after 4 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 28  | Try again after 6 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 29  | Try again after 8 days                           | Only valid for response code 51 (Insufficient Funds)                                                                                                     |
| 30  | Try again after 10 days                          | Only valid for response code 51 (Insufficient Funds)                                                                                                     |

Some return codes will no longer be sent:

- 04 (Capture Card)
- 14 (Invalid card number)
- 41 (Lost Card)
- 43 (Stolen Card)
- 54 (Expired Card)
- 57 (Transaction Not Allowed)
- 62 (Card Restricted)
- 63 (Security Breach)
  <br>
  <br>

**Categorization of Mastercard returns**

Mastercard may consolidate some issuer response codes, which often may not indicate to the merchant whether or not to retry, into 3 codes for Mastercard exclusive use:

- **79** (Life cycle)
- **82** (Politics)
- **83** (Fraud/Security)
  <br>
  <br>

The original codes will be replaced by the Merchant Advice Code (MAC), which will accompany codes 79, 82 and 83 to determine whether or not the transaction can be re-attempted.

**For example:**

| When                                                                      | Then                                                             | And the response code                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| The issuer declines the transaction using response code 54 (Expired Card) | Mastercard will replace code 54 with code 79 (Lifecycle Decline) | Accompany appropriate Merchant Advice Code (MAC) |

**MAC 03 and MAC 21 retry program**

**Method of calculation:**

- Card not present transactions will be considered;
- All payment transactions using the same card and merchant number are considered retries;
- Retries in the MAC program with values ​​MAC 03 and MAC 21 count;
- Valid for any response code,
- The excess accounted for in the program will occur from the 1st attempt within the calculation month;
- The counter is reset after a period of 30 days;
- Retries may be charged for MACs 03/21 and Excessive Attempts if you exceed the limit for each program;
- Currently, the tariff value of BRL 1.25 is applied and this value will change from January 1, 2023, as shown on the table;

**Table of values:**

| Number of retries     | Rule                                                            |
| --------------------- | --------------------------------------------------------------- |
| As of the 1st attempt | BRL 2.50 (two reais and fifty cents) per attempt, as of the 1st |

### Visa

**What is it?**

A program instituted by the Visa Brand that generates charges when the merchant exceeds the retry rules.

- Valid for transactions with a present card and a non-present card;
- **Reversible codes:** Allows up to 15 attempts to approve the same transaction (same card, same establishment and amount) within 30 days. After the initial 30 days (from the 1st attempt), any retry will be charged.
- **Irreversible codes:** Only 01 attempt to approve the same transaction is allowed (same card, same establishment), the 2nd attempt will be charged.
- After an approved transaction, the counter is reset.

> **Fees**: When you exceed the attempt limits established by the brand, a fee will be charged for each transaction that exceeds it.<br> ><br>
>
> - **Domestic**: USD 0.10 + 13.83% Tax.<br>
> - Foreign: USD 0.25 + 13.83% Tax.
>   <br>
>   <br>

Authorization rules already in force. Fee charges apply from April 2021.

**Visa has grouped return codes into 4 Categories.**

**Category 1 - Issuer will never approve.**

For this category, it indicates that the card was canceled or never existed or that the non-approval is the result of a permanent restriction or error condition that will prevent future approval.

**Category 2 - Issuer cannot approve at this time.**

Indicates that the denial is the result of a temporary condition such as credit risk, issuer speed controls, or other card restrictions that may allow a retry transaction to be approved. In some cases, denial requires action by the shopper or issuer to remove the restriction before an approval can be obtained.

**Category 3 - Data Quality/Review Data.**

When a data error is identified by the issuer, this transaction is declined accordingly. Merchants must revalidate payment data before retrying. Merchants and Acquirers should monitor these negative codes due to potential exposure to fraud.

> Attention: Category 3 has, in addition to the limits considered in category 2, a different limit, where it is cumulative. An establishment can carry out up to 10,000 transactions in a period of 30 days (in this case, considering only the establishment number and denial codes). If you exceed the limit, all category 3 declined transactions will be charged.

**Category 4 - Generic Response Codes.**

Category 4 includes all other decline response codes, many of which provide little or no value to Acquirers/Merchants as part of their retry strategy. Issuer usage should remain minimal.

Most non-approval conditions have descriptive response codes in Categories 1, 2, and 3 to indicate the reason for denying. However, there may be circumstances where there is no response code value for a specific denial condition. Issuers may use other response code values ​​defined in the VisaNet Technical Specifications; however, usage should remain minimal.

Issuers should use response codes that more accurately reflect the reason for denials. Categories 1 (issuer never approves), 2 (issuer cannot approve at this time), and 3 (Data Quality) should be used, and issuers should limit the use of Category 4 (Generic Response Code) to transactions where none another value applies. The Generic Response Code Fee is charged to ensure that no more than the regionally approved percentage of the issuer's total denials are categorized as Category 4. Issuers exceeding the regionally defined threshold will receive the Generic Response Code Fee per base of transaction for each decline in excess of the defined limit.

**Table with rules and refusal codes.**

![Tabela Retentativa Visa]({{ site.baseurl }}/images/apicieloecommerce/retentativa-visa-en.png)

**Note:** Response code 14 appears in categories 1 and 3, but the accounting is as follows:

In category 1, EC is charged from the 2nd attempt to (same establishment and same card) **retry not allowed.**

Category 3 comprises the group of codes for accounting for 10,001 transactions, after the EC reaches 10,000 retries with this group of codes, any transaction will be accounted for independently of the card.

**Example:** We had 10,000 transactions denied in a CE with category 3 codes, if transaction 10,001 is in code 14 or in any category 3 group code, it will be charged regardless of the card.

### ELO

**What is it?**

This is a program instituted by ELO that generates charges when the merchant exceeds the rules for retrying transactions with the same card.

**Forms of Calculation**

- **Retries**: all payment transactions on the same card, validity, value, Merchant ID (MID) - within 30 days
- **Accounted codes**: all negatives​
- **Excess**: from the 16th retry in the month​\*
- **Fee**: BRL 0.80 (eighty cents) per retry, starting from the 16th
- **Excess accounting**: It is based on Elo's internal controls. 1st to last calendar day of the month
  <br>
  <br>

<aside class="notice">Effective date: August 1, 2022.</aside>

**List of Elo refusal codes:**

The response codes below are listed according to the brand's authorization manual.

| CODES       | DESCRIPTION                                 | WHEN THE ISSUER SHOULD USE THE RESPONSE CODE                                                                                                                                                                                                                                                                                                                                                                                                            | RETRY        |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 4           | REDO THE TRANSACTION                        | This code must be used by the Issuer to request that the owner of the card/EC perform the transaction again if the issuer detects failure in capturing the transaction information or if it is necessary to update the password, denying the 1st transaction                                                                                                                                                                                            | Reversible   |
| 5           | GENERICAL                                   | The brand may use this code for other dealings (generic).                                                                                                                                                                                                                                                                                                                                                                                               | Reversible   |
| 6           | CONSULT ACQUIRER                            | This reason must be used by the Acquirer when it identifies internal problems that do not require changes in the message for the transaction to follow the correct flow.                                                                                                                                                                                                                                                                                | Reversible   |
| 12          | CARD ERROR                                  | - This code must be used by the Issuer when it identifies a failure in the CAVV validation of 3DS or tokenized transactions.<br>- This code must be used by the issuer when it identifies an incorrect/invalid service code for cards <br>- This code must be used by the issuer for problems identified in the token<br>- This code must be used to deny reversals and reversal notices where the original transaction is not located by the issuer.   | Irreversible |
| 13          | INVALID TRANSACTION AMOUNT                  | - This code must be used by the issuer when it identifies that the transaction amount is invalid according to the issuer's parameters.                                                                                                                                                                                                                                                                                                                  | Irreversible |
| 14          | INVALID CARD NUMBER                         | - This code must be used by the issuer for invalid/incorrect card number.<br>- The brand may use this code for other dealings.                                                                                                                                                                                                                                                                                                                          | Irreversible |
| 19          | ACQUIRER PROBLEMS                           | - This code must be used by the acquirer when it identifies internal problems that require changes in the message so that the transaction follows the correct flow.                                                                                                                                                                                                                                                                                     | Irreversible |
| 23          | INVALID INSTALLMENT AMOUNT                  | - This code must be used by the issuer when the installment amount is outside the limit established. This code must be used when the issuer does not accept the Elo Parcelado Loja product (product 072) with the number of installments less than 12.                                                                                                                                                                                                  | Irreversible |
| 30          | MESSAGE FORMAT ERROR                        | - This code must be used by the issuer when it identifies a format error in the message (mandatory field, domains, formats, size not present or different from the specification).                                                                                                                                                                                                                                                                      | Irreversible |
| 38          | PURCHASE/EXCEEDED PASSWORD ATTEMPTS         | - This code must be used by the issuer when the number of permitted password attempts is exceeded (used only for purchases).                                                                                                                                                                                                                                                                                                                            | Reversible   |
| 41          | LOST CARD                                   | - This code must be used by the issuer for a card with definitive blocking for the reason "LOST".                                                                                                                                                                                                                                                                                                                                                       | Irreversible |
| 43          | STOLEN CARD                                 | - This code must be used by the issuer for a card with definitive blocking for the reason "STOLEN".                                                                                                                                                                                                                                                                                                                                                     | Irreversible |
| 51          | LIMIT/INSUFFICIENT BALANCE                  | - This code must be used by the issuer for a card that is temporarily without enough balance or limit to carry out the transaction.<br>- Withdrawal/advance 2 without track 2<br>- Purchase with change not supported.<br>- Address verification not supported (only when process code is "13" with no purchase value). \* Card account verification not supported (only when process code is "18" with no purchase amount).                            | Reversible   |
| 54          | CARD EXPIRATION DATE                        | - This code must be used by the issuer for a physical card or token with validity/expired or invalid.                                                                                                                                                                                                                                                                                                                                                   | Irreversible |
| 55          | INVALID PASSWORD / NOT SENT                 | - This code must be used by the Issuer when the password typed by the customer does not match, it's invalid/incorrect.<br>- This code must be used by the issuer when the password is not sent in the message and is required for transaction approval.                                                                                                                                                                                                 | Reversible   |
| 56          | WITHOUT CARD REGISTRATION                   | <br>1. Card number does not belong to the issuer<br>2. Card number is not valid                                                                                                                                                                                                                                                                                                                                                                         | Irreversible |
| 57          | TRANSACTION NOT ALLOWED FOR THIS CARD       | - This code must be used by the Issuer when the card is definitively blocked, except for blocking for loss and theft that already have specific codes (eg death, confirmed fraud, definitive cancellation at the customer's request , etc).<br>- This code must be used for products and services not supported by the card issuer.<br>- This code can be used for invalid/suspended/inactive token.<br>- This code must be used to negate the fallback |
| input mode. | Irreversible                                |
| 58          | INVALID MERCHANT                            | - This code must be used by the Issuer when the merchant's MCC is not registered to obtain a token from the Issuer.                                                                                                                                                                                                                                                                                                                                     | Irreversible |
| 59          | FRAUD SUSPECT                               | - This code must be used by the issuer when prevention rules suspect fraud, requiring contact between the cardholder and the issuer to release the card and carry out a new transaction.<br>- This code must be entered used by the issuer to deny transactions due to the absence of the travel notice that must be carried out by the cardholder before traveling abroad or in some cases before carrying out transactions on international websites. | Reversible   |
| 61          | MAXIMUM WITHDRAWAL/PURCHASE VALUE EXCEEDED  | - This code must be used by the Issuer when the withdrawal/purchase amount exceeds the limit allowed by it.                                                                                                                                                                                                                                                                                                                                             | Reversible   |
| 62          | TEMPORARY BILLING BLOCK                     | - This code must be used by the issuer for cards with temporary billing block.                                                                                                                                                                                                                                                                                                                                                                          | Reversible   |
| 63          | SECURITY VIOLATION                          | - This code must be used by the Issuer when the card security code (CVE2) is incorrect/invalid or invalid MST (token).                                                                                                                                                                                                                                                                                                                                  | Irreversible |
| 64          | MINIMUM TRANSACTION AMOUNT - INVALID        | - This code must be used by the issuer when the transaction amount is below the minimum allowed by the Issuer                                                                                                                                                                                                                                                                                                                                           | Irreversible |
| 65          | QUALITY OF WITHDRAWALS EXCEEDED             | - This code must be used by the issuer when the withdrawal quantity limit is exceeded                                                                                                                                                                                                                                                                                                                                                                   | Reversible   |
| 75          | WITHDRAWAL/ PASSWORD ATTEMPTS EXCEEDED      | - This code must be used by the Issuer when the number of password attempts stipulated by the Issuer is exceeded (used only for withdrawls)                                                                                                                                                                                                                                                                                                             | Reversible   |
| 76          | INVALID OR NON-EXISTENT DESTINATION ACCOUNT | - This code must be used by the issuer when the account "PARA" (destination) in BIT 3 is invalid or non-existent and exclusively for Funds Transfer transactions                                                                                                                                                                                                                                                                                        | Irreversible |
| 77          | INVALID OR NON-EXISTENT ORIGINAL ACCOUNT    | - This code must be used by the issuer when the "DE" (origin) account in BIT 3 is invalid or non-existent and exclusively for Funds Transfer transactions.                                                                                                                                                                                                                                                                                              | Irreversible |
| 78          | NEW CARD WITHOUT UNLOCKING / CARD BLOCKED   | - This code must be used by the issuer when the new card has not yet been unlocked (activated) by the cardholder with the Issuer or when the cardholder, through autonomy, wishes to temporarily block the card through the issuer application.                                                                                                                                                                                                         | Reversible   |
| 82          | INVALID CARD (internal data)                | - This code must be used by the issuer when the card's internal data does not match (eg invalid cryptogram, invalid ATC etc.)                                                                                                                                                                                                                                                                                                                           | Irreversible |
| 83          | IT IS NOT POSSIBLE TO VALIDATE THE PASSWORD | - This code must be used by the Issuer and will be used by Elo when it is not possible to validate or decrypt the password.                                                                                                                                                                                                                                                                                                                             | Irreversible |
| 91          | ISSUER OUT OF AIR                           | - This code will be used by the brand when the issuer is temporarily unavailable to authorize the transaction or the issuer's response was not received within the established time.                                                                                                                                                                                                                                                                    | Reversible   |
| 96          | SYSTEM FAILURE                              | - This code will be used by the brand or the issuer due to problems processing the transaction.                                                                                                                                                                                                                                                                                                                                                         | Reversible   |
| AB          | INCORRECT FUNCTION (DEBIT)                  | - This code will be used by the issuer to signal the establishment that it requested authorization in the debit function, but the card does not have this function active.                                                                                                                                                                                                                                                                              | Irreversible |
| AC          | INCORRECT FUNCTION (CREDIT)                 | - This code will be used by the Issuer to signal the establishment that he requested authorization in the credit function, but the card does not have this function active.                                                                                                                                                                                                                                                                             | Irreversible |
| FM          | USE THE CHIP                                | - This code will be used by the issuer to inform the merchant that the contactless transaction will not be successful and that the cardholder must use the chip (contact).                                                                                                                                                                                                                                                                              | Irreversible |
| P5          | PASSWORD CHANGE / UNLOCKING FAILURE         | - This code will be used by the issuer when there is a password change or unlocking failure.                                                                                                                                                                                                                                                                                                                                                            | Irreversible |
| P6          | NEW PASSWORD NOT ACCEPTED                   | - This code will be used by the issuer when the new password chosen by the customer does not meet the minimum criteria established by the Issuer.                                                                                                                                                                                                                                                                                                       | Reversible   |

### Hipercard

**What is it?**

Charges made when a merchant exceeds the Retry rules for denied transactions with the same card, same date or monthly period, same amount and same number of merchant, as follows:

| Program                               | Gift Card – CP                                                                                                                                 | Card not present – ​​CNP                                                                                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Excessive Retries​                    | BRL 1.85 per retries from the 9th denied response - same card and same day (item 2)                                                            | R$ 1.85 per retries from the 9th denied response - same card and same month of reference (item 3)                                                             |
| **ASI Transaction Retry** (Zero Auth) | BRL 0.15 per ASI Transaction Retry after issuer refusal - same card, same day (item 2)                                                         | BRL 0.15 per ASI Transaction Retry after negative from the issuer - same card and same reference month (item 3)                                               |
| Irreversible transaction retry        | 0.03% of the transaction value per retry​<br>Minimum BRL 0.15<br>Maximum BRL 0.80<br>Same card and same day after reply with irreversible code | 0.03% of the transaction amount per retry​<br>Minimum BRL 0.15<br>Maximum BRL 0.80<br>Same card and same month after response with irreversible code (item 3) |

**Rules:**

1. **ASI transactions**: these are Account Status Inquiry transactions, that is, transactions carried out to query the status of a card (check that it is active). For this purpose, financial transactions should not be used, but specific transactions.​
2. **Attempts per day (item 2)**: consider for purposes of Hipercard's Retry program from 00:00 to 23:59​
3. **Reference month (item 3)**: for purposes of the Hipercard Retry program, consider the 01st to the 30th or 31st of the month in which the transaction took place. The charge will be sent after the close of the subsequent month.​
4. **Transaction codes** considered **irreversible by the issuer** were categorized by the ABECS payments and self-regulation industry, through current Regulation 21. See [Return codes (ABECS)](https://developercielo.github.io/en/manual/cielo-ecommerce#return-codes-abecs).
5. **Codes not mentioned in the ABECS manual are considered reversible**.

<aside class="notice">Effective date: September 15, 2022.</aside>

### Other brands

- **Reversible codes:** New attempts will be allowed for the same customer and card. There is no limit and pre-established period;

> **Important: you should follow the guidance received in the response to the transaction denied, before making a new attempt.**

- **Irreversible Codes:** Authorizations will not be allowed for the same card or establishment, after receiving the 1st refusal response from the issuer.

## Return codes (ABECS)

To access the Card Brands Retry Program, access this [Link](https://developercielo.github.io/en/manual/webservice-1-5#flag-retry-program)

The Brazilian Association of Credit Card and Services Companies (ABECS) establishes as of July 15, 2020, the standardization of the return code of refused sales authorizations for both the physical payment and e-commerce solutions of the Brazilian market .

This normative measure seeks to bring benefits to the entire payment market, providing greater transparency in the understanding of the reason for the refusal of transactions, in addition to enabling greater assertiveness in the adoption of sales retentive strategies.

Cielo informs its customers that it's prepared to process transactions following this new market standard, below is the table of codes standardized by ABECS.

<aside class="notice">The AMEX flag codes have undergone a to/from in order to maintain two digits. We reinforce that this measure does not change the reasons for return.</aside>

| Message                                                                     | Code Type    | ELO                        | VISA                       | MASTERCARD/HIPER           | AMEX                       | AMEX - From/To Cielo       | Message POS/Ecommerce                                    |
| --------------------------------------------------------------------------- | ------------ | -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------------------------------------- |
| GENERIC                                                                     | REVERSIBLE   | 05                         | 05                         | 05                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                 |
| INSUFFICIENT BALANCE/LIMIT                                                  | REVERSIBLE   | 51                         | 51                         | 51                         | 116                        | A5                         | NOT ALLOWED                                              |
| INVALID PASSWORD                                                            | REVERSIBLE   | 55                         | 55 ou 86                   | 55                         | 117                        | A6                         | INVALID PASSWORD                                         |
| TRANSACTION NOT ALLOWED FOR CARD                                            | REVERSIBLE   | 57                         | 57                         | 57                         | 200                        | FD                         | TRANSACTION NOT ALLOWED FOR CARD                         |
| CARD NUMBER DOESN'T BELONG TO THE ISSUER \| INVALID CARD NUMBER             | IRREVERSIBLE | 14 ou 56                   | 06                         | 14 ou 01                   | 122                        | 08                         | CHECK THE CARD DATA                                      |
| SECURITY BREACH                                                             | IRREVERSIBLE | 63                         | 06                         | 14                         | 122                        | 08                         | CHECK THE CARD DATA                                      |
| SUSPECTED FRAUD                                                             | REVERSIBLE   | 59                         | 59                         | 63                         | 100                        | FA                         | CONTACT YOUR CARD CENTER                                 |
| INVALID MERCHANT                                                            | IRREVERSIBLE | 58                         | 03                         | 03                         | 109                        | DA                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| REDOING THE TRANSACTION (ISSUER REQUESTS RETENTATIVE)                       | REVERSIBLE   | 4                          | WITHOUT CORRESPONDING CODE | SE                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | REDOING THE TRANSACTION                                  |
| CONSULT ACCREDITATOR                                                        | REVERSIBLE   | 6                          | WITHOUT CORRESPONDING CODE | SE                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | MERCHANT, CONTACT THE PURCHASER                          |
| PROBLEM IN THE PURCHASER                                                    | IRREVERSIBLE | 19                         | 19                         | 30                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD ERROR - DON'T TRY AGAIN                             |
| CARD ERROR                                                                  | IRREVERSIBLE | 12                         | 06                         | WITHOUT CORRESPONDING CODE | 115                        | A2                         | CHECK THE CARD DATA                                      |
| FORMAT ERROR (MESSAGE)                                                      | IRREVERSIBLE | 30                         | 12                         | 30                         | 181                        | A3                         | CARD ERROR - DON'T TRY AGAIN                             |
| VALUE OF THE INVALID TRANSACTION                                            | IRREVERSIBLE | 13                         | 13                         | 13                         | 110                        | JB                         | TRANSACTION VALUE NOT ALLOWED - DON'T TRY AGAIN          |
| VALUE OF INVALID PARCEL                                                     | IRREVERSIBLE | 23                         | WITHOUT CORRESPONDING CODE | 12                         | 115                        | A2                         | INVALID INSTALLMENT - DON'T TRY AGAIN                    |
| PASSWORD ATTEMPTS EXCEEDED \| SHOPPING                                      | REVERSIBLE   | 38                         | 75                         | 75                         | 106                        | A4                         | PASSWORD TRYING EXCEEDED. CONTACT YOUR CARD CENTER       |
| LOST CARD                                                                   | IRREVERSIBLE | 41                         | 41                         | 41                         | 200                        | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| STOLEN CARD                                                                 | IRREVERSIBLE | 43                         | 43                         | 43                         | 200                        | FD                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| EXPIRED CARD / INVALID EXPIRATION DATE                                      | IRREVERSIBLE | 54                         | 06                         | 54                         | 101                        | BV                         | CHECK THE CARD DATA                                      |
| TRANSACTION NOT ALLOWED \| TERMINAL CAPACITY                                | IRREVERSIBLE | 57                         | 58                         | 58                         | 116                        | A5                         | TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN               |
| EXCESS VALUE \| WITHDRAW                                                    | REVERSIBLE   | 61                         | 61 ou N4                   | 61                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | EXCEEDED VALUE. CONTACT YOUR CARD CENTER                 |
| DOMESTIC CARD - INTERNATIONAL TRANSACTION                                   | IRREVERSIBLE | 62                         | 62                         | 62                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD DOESN'T ALLOW INTERNATIONAL TRANSACTION             |
| MINIMUM TRANSACTION VALUE INVALID                                           | IRREVERSIBLE | 64                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION VALUE NOT ALLOWED - DON'T TRY AGAIN          |
| AMOUNT OF WITHDRAWALS EXCEEDED                                              | REVERSIBLE   | 65                         | 65                         | 65                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | AMOUNT OF WITHDRAWALS EXCEEDED. CONTACT YOUR CARD CENTER |
| PASSWORD EXPIRED / PASSWORD CRYPTOGRAPHY ERROR                              | IRREVERSIBLE | 74                         | 74 ou 81                   | 88                         | 180                        | A7                         | INVALID PASSWORD - DON'T TRY AGAIN                       |
| PASSWORD ATTEMPTS EXCEEDED \| WITHDRAW                                      | REVERSIBLE   | 75                         | 75                         | 75                         | 106                        | A4                         | PASSWORD TRYING EXCEEDED. CONTACT YOUR CARD CENTER       |
| INVALID OR NON-EXISTING DESTINATION ACCOUNT                                 | IRREVERSIBLE | 76                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID DESTINATION ACCOUNT - DON'T TRY AGAIN            |
| ACCOUNT INVALID OR NON-EXISTING                                             | IRREVERSIBLE | 77                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID ORIGIN ACCOUNT - DON'T TRY AGAIN                 |
| NEW CARD WITHOUT UNLOCKING                                                  | REVERSIBLE   | 78                         | 78                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | UNLOCK THE CARD                                          |
| INVALID CARD (cryptogram)                                                   | IRREVERSIBLE | 82                         | 82                         | 88                         | 180                        | A7                         | CARD ERROR - DON'T TRY AGAIN                             |
| EMITTER OUT OF AIR                                                          | REVERSIBLE   | 91                         | 91                         | 91                         | 912                        | A1                         | COMMUNICATION FAILURE - TRY LATER                        |
| SYSTEM FAILURE                                                              | REVERSIBLE   | 96                         | 96                         | 96                         | 911                        | AE                         | COMMUNICATION FAILURE - TRY LATER                        |
| DIFFERENCE - PRE-AUTHORIZATION                                              | IRREVERSIBLE | 99                         | N8                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | DIFFERENT VALUE OF PRE-AUTHORIZATION - DON'T TRY AGAIN   |
| INCORRECT FUNCTION (DEBIT)                                                  | IRREVERSIBLE | AB                         | 52 ou 53                   | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | USE CREDIT FUNCTION                                      |
| INCORRECT FUNCTION (CREDIT)                                                 | IRREVERSIBLE | AC                         | 39                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | USE DEBIT FUNCTION                                       |
| PASSWORD EXCHANGE / UNLOCKING                                               | IRREVERSIBLE | P5                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID PASSWORD - DON'T TRY AGAIN                       |
| NEW PASSWORD NOT ACCEPTED                                                   | REVERSIBLE   | P6                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID PASSWORD USE THE NEW PASSWORD                    |
| COLLECT CARD (THERE IS NO FRAUD)                                            | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 04                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| DYNAMIC KEY CHANGE ERROR                                                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 06                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CARD ERROR - DON'T TRY AGAIN                             |
| CONFIRMED FRAUD                                                             | IRREVERSIBLE | 57                         | 07                         | 04                         | 200                        | FD                         | TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN       |
| ISSUER NOT LOCATED - INCORRECT BIN                                          | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 15                         | 15                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | INVALID CARD DATA - DON'T TRY AGAIN                      |
| (buyer’s negative) FAILURE TO COMPLY WITH THE LAWS OF ANTE MONEY LAUNDERING | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 64                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| INVALID REVERSION                                                           | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 76                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| NOT LOCATED BY ROUTER                                                       | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 92                         | 92                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| TRANSACTION DENIED FOR INFRINGEMENT OF LAW                                  | IRREVERSIBLE | 57                         | 93                         | 57                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN       |
| DUPLICATE DATE OF TRACING DATE                                              | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | 94                         | 94                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| SURCHARGE NOT SUPPORTED                                                     | REVERSIBLE   | WITHOUT CORRESPONDING CODE | B1                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                 |
| SURCHARGE NOT SUPPORTED BY THE DEBIT NETWORK                                | REVERSIBLE   | WITHOUT CORRESPONDING CODE | B2                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                 |
| FORCE STIP                                                                  | REVERSIBLE   | WITHOUT CORRESPONDING CODE | N0                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER                                 |
| WITHDRAWAL NOT AVAILABLE                                                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | N3                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHDRAWAL NOT AVAILABLE - DON'T TRY AGAIN               |
| RECURRENT PAYMENT SUSPENSION FOR A SERVICE                                  | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R0                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN   |
| RECURRENT PAYMENT SUSPENSION FOR ALL SERVICES                               | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R1                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN   |
| TRANSACTION NOT QUALIFIED FOR VISA PIN                                      | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R2                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN       |
| SUSPENSION OF ALL AUTHORIZATION ORDERS                                      | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | R3                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN   |
| IT'S NOT POSSIBLE TO LOCATE THE REGISTRATION IN THE FILE                    | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | 25                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |
| FILE NOT AVAILABLE FOR UPDATE                                               | IRREVERSIBLE | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | 28                         | WITHOUT CORRESPONDING CODE | WITHOUT CORRESPONDING CODE | CONTACT YOUR CARD CENTER - DON'T TRY AGAIN               |

## Other return codes

| Response Code | Definitio                                                                                                                                             | Meaning                                                                                                                                                                                                                                                                        | Action                                                                                                                                                                                                 | Allows Retry                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| 00            | Successfully authorized transaction.                                                                                                                  | Successfully authorized transaction.                                                                                                                                                                                                                                           | Successfully authorized transaction.                                                                                                                                                                   | No                                                                                                             |
| 02            | Unauthorized transaction. Referred transaction.                                                                                                       | Unauthorized transaction. Referred (suspected fraud) by the issuing bank.                                                                                                                                                                                                      | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | No                                                                                                             |
| 11            | Successfully authorized transaction for card issued abroad                                                                                            | Successfully authorized transaction.                                                                                                                                                                                                                                           | Successfully authorized transaction.                                                                                                                                                                   | No                                                                                                             |
| 21            | Cancellation not done. Non-localized transaction.                                                                                                     | Cancellation was not processed. If the error persists, contact Cielo.                                                                                                                                                                                                          | Cancellation was not processed. Try again later. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| 22            | Invalid installment. Invalid number of installments.                                                                                                  | Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.                                                                                                                                                                           | Could not process transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.                                                     | No                                                                                                             |
| 24            | Invalid number of installments.                                                                                                                       | Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.                                                                                                                                                                           | Could not process transaction. Invalid number of installments. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.                                    | No                                                                                                             |
| 60            | Unauthorized transaction.                                                                                                                             | Unauthorized transaction. Try again. If the error persists the carrier should contact the issuing bank.                                                                                                                                                                        | Could not process transaction. Try again later. If the error persists, contact your issuing bank.                                                                                                      | Only 4 times in 16 days.                                                                                       |
| 67            | Unauthorized transaction. Card locked for shopping today.                                                                                             | Unauthorized transaction. Card locked for shopping today. Blocking may be due to excessive invalid attempts. Card will be automatically unlocked at midnight.                                                                                                                  | Unauthorized transaction. Card locked temporarily. Contact your issuing bank.                                                                                                                          | From the following day, only 4 times in 16 days.                                                               |
| 70            | Unauthorized transaction. Limit exceeded/no balance.                                                                                                  | Unauthorized transaction. Limit exceeded/no balance.                                                                                                                                                                                                                           | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | From the following day, only 4 times in 16 days.                                                               |
| 72            | Cancellation not done. Not enough available balance for cancellation.                                                                                 | Cancellation not done. Not enough available balance for cancellation. If the error persists, contact Cielo.                                                                                                                                                                    | Cancellation not done. Try again later. If the error persists, contact the virtual store..                                                                                                             | No                                                                                                             |
| 79            | Transaction not allowed / Mastercard                                                                                                                  | Unauthorized transaction. Unable to process transaction due to error related to cardholder. Ask the bearer to contact the issuing bank.                                                                                                                                        | Contact your bank                                                                                                                                                                                      | No                                                                                                             |
| 80            | Unauthorized transaction. Divergence on transaction/payment date.                                                                                     | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                      | Unauthorized transaction. Redo the transaction confirming data.                                                                                                                                        | No                                                                                                             |
| 82            | Transaction not allowed / Mastercard                                                                                                                  | Transaction not authorized due to issuer rules. Instruct the cardholder to contact the issuing bank.                                                                                                                                                                           | Contact your bank                                                                                                                                                                                      | No                                                                                                             |
| 83            | Transaction not allowed / Mastercard                                                                                                                  | Unauthorized transaction. Suspicion of fraud by the issuing bank.                                                                                                                                                                                                              | Contact your bank                                                                                                                                                                                      | No                                                                                                             |
| 85            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| 89            | Transaction error.                                                                                                                                    | Unauthorized transaction. Transaction error. The carrier must try again and if the error persists, contact the issuing bank.                                                                                                                                                   | Unauthorized transaction. Transaction error. Try again and if the error persists, contact your issuing bank.                                                                                           | Only 4 times in 16 days.                                                                                       |
| 90            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| 97            | Value not allowed for this transaction.                                                                                                               | Unauthorized transaction. Value not allowed for this transaction.                                                                                                                                                                                                              | Unauthorized transaction. Value not allowed for this transaction.                                                                                                                                      | No                                                                                                             |
| 98            | System/communication unavailable.                                                                                                                     | There was no request response within the set time.                                                                                                                                                                                                                             | The transaction may have been processed. To confirm, check the transaction by the store order number and evaluate whether it was actually processed.                                                   | Retry only after reviewing the original transaction by the order number and confirm that it was not processed. |
| 999           | System/communication unavailable.                                                                                                                     | Unauthorized transaction. Issuer system without communication. Try later. Can be error in SITEF, please check!                                                                                                                                                                 | Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.                                                                                              | From the following day, only 4 times in 16 days.                                                               |
| AA            | Time Exceeded                                                                                                                                         | Time exceeded in communication with the issuing bank. Orient the carrier to try again, if the error persists it will be necessary for the carrier to contact their issuing bank.                                                                                               | Time exceeded in their communication with the issuing bank, try again later. If the error persists, contact your bank.                                                                                 | Only 4 times in 16 days.                                                                                       |
| AF            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| AG            | Transação não permitida. Falha da operação.                                                                                                           | Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.                              | Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.                                                                               | Não                                                                                                            |
| AH            | Transaction not allowed. Credit card being used as debit. Use the credit function.                                                                    | Transaction not allowed. Credit card being used as debit. Ask the carrier to select the Credit Card payment option.                                                                                                                                                            | Unauthorized transaction. Try again by selecting the credit card payment option.                                                                                                                       | No                                                                                                             |
| AI            | Unauthorized transaction. Authentication was not performed.                                                                                           | Unauthorized transaction. Authentication was not performed. The carrier did not complete the authentication. Ask the carrier to review the data and try again. If the error persists, contact Cielo informing the BIN (6 first digits of the card)                             | Unauthorized transaction. Authentication failed. Try again and correctly enter the requested data. If the error persists, contact the merchant.                                                        | No                                                                                                             |
| AJ            | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again by selecting the Private Label option. | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Ask the carrier to try again by selecting the Private Label option. If not available the Private Label option check in Cielo if your establishment allows this operation. | Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again and select the Private Label option. In case of a new error, contact the virtual store. | No                                                                                                             |
| AV            | Unauthorized transaction. Invalid data                                                                                                                | Validation of transaction data failed. Guide the carrier to review the data and try again.                                                                                                                                                                                     | Data validation failed. Review the reported data and try again.                                                                                                                                        | Only 4 times in 16 days.                                                                                       |
| BD            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.                                           | Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.                                                                                                     | No                                                                                                             |
| BL            | Unauthorized transaction. Daily limit exceeded.                                                                                                       | Unauthorized transaction. Daily limit exceeded. Ask the carrier to contact their issuing bank.                                                                                                                                                                                 | Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.                                                                                                                             | From the following day, only 4 times in 16 days.                                                               |
| BM            | Unauthorized transaction. Invalid card                                                                                                                | Unauthorized transaction. Invalid card. It may be card locking at the issuing bank or incorrect data. Try to use the Lhum Algorithm (Mod 10) to avoid unauthorized transactions for this reason.                                                                               | Unauthorized transaction. Invalid card. Redo the transaction confirming the reported data.                                                                                                             | No                                                                                                             |
| BN            | Unauthorized transaction. Card or account locked.                                                                                                     | Unauthorized transaction. Carrier's card or account is locked. Ask the carrier to contact their issuing bank.                                                                                                                                                                  | Unauthorized transaction. Carrier's card or account is locked. Contact your issuing bank.                                                                                                              | No                                                                                                             |
| BO            | Transaction not allowed. Operation failed.                                                                                                            | Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if the error persists, contact the issuing bank.                                                                                                                             | Transaction not allowed. There was a processing error. Re-enter card data, if error persists, contact issuing bank.                                                                                    | Only 4 times in 16 days.                                                                                       |
| BP            | Unauthorized transaction. Non-existent checking account.                                                                                              | Unauthorized transaction. The transaction could not be processed due to an error related to the carrier's card or account. Ask the carrier to contact the issuing bank.                                                                                                        | Unauthorized transaction. Could not process the transaction due to an error related to the carrier's card or account. Contact the issuing bank.                                                        | No                                                                                                             |
| C1            | Transaction not allowed. Card can't process debit transactions.                                                                                       | Change the payment method or card used.                                                                                                                                                                                                                                        | Change the payment method or card used.                                                                                                                                                                | No                                                                                                             |
| C2            | Transaction not allowed.                                                                                                                              | Incorrect data. Please review the data on the payment screen.                                                                                                                                                                                                                  | Incorrect data. Please review the data on the payment screen.                                                                                                                                          | No                                                                                                             |
| C3            | Transaction not allowed.                                                                                                                              | Invalid period for this type of transaction.                                                                                                                                                                                                                                   | Invalid period for this type of transaction.                                                                                                                                                           | No                                                                                                             |
| CF            | Unauthorized transaction.C79:J79 Data validation failed.                                                                                              | Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.                                                                                                                                                                                 | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                            | No                                                                                                             |
| CG            | Unauthorized transaction. Data validation failed.                                                                                                     | Unauthorized transaction. Data validation faileds. Ask the carrier to contact the issuing bank.                                                                                                                                                                                | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                            | No                                                                                                             |
| DF            | Transaction not allowed. Invalid card or card failure.                                                                                                | Transaction not allowed. Invalid card or card failure. Ask the carrier to re-enter the card data, if the error persists, contact the bank                                                                                                                                      | Transaction not allowed. Invalid card or card failure. Re-enter card data, if error persists, contact bank                                                                                             | Only 4 times in 16 days.                                                                                       |
| DM            | Unauthorized transaction. Limit exceeded/no balance.                                                                                                  | Unauthorized transaction. Limit exceeded/no balance.                                                                                                                                                                                                                           | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | From the following day, only 4 times in 16 days.                                                               |
| DQ            | Unauthorized transaction. Data validation failed.                                                                                                     | Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.                                                                                                                                                                                 | Unauthorized transaction. Data validation failed. Contact the issuing bank.                                                                                                                            | No                                                                                                             |
| DS            | Transaction not allowed for the card                                                                                                                  | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | Only 4 times in 16 days.                                                                                       |
| EB            | Number of installments greater than Allowed.                                                                                                          | Unauthorized transaction. Contact Cielo and check if the registration has released installments.                                                                                                                                                                               | Unauthorized transaction. Contact Cielo and check if the registration has been released in installments.                                                                                               | Yes                                                                                                            |
| EE            | Transaction not allowed. Installment value below the minimum allowed.                                                                                 | Transaction not allowed. Installment value below the minimum allowed. It is not permitted installments lower than R$5,00. It is necessary to revise the calculation for installments.                                                                                          | Transaction not allowed. Installment value is below the minimum allowed. Contact the virtual store.                                                                                                    | No                                                                                                             |
| EK            | Transaction not allowed for the card                                                                                                                  | Unauthorized transaction. Transaction not allowed for the card.                                                                                                                                                                                                                | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | Only 4 times in 16 days.                                                                                       |
| FC            | Unauthorized transaction. Call the Issuer                                                                                                             | Unauthorized transaction. Guide the carrier to contact the issuing bank.                                                                                                                                                                                                       | Unauthorized transaction. Contact your issuing bank.                                                                                                                                                   | No                                                                                                             |
| FE            | Unauthorized transaction. Divergence on transaction/payment date.                                                                                     | Unauthorized transaction. Invalid transaction date or first payment date.                                                                                                                                                                                                      | Unauthorized transaction. Redo the transaction confirming data.                                                                                                                                        | No                                                                                                             |
| FF            | Cancellation OK                                                                                                                                       | Cancellation transaction authorized successfully. WARNING: This return is for cases of cancellations and not for cases of authorizations.                                                                                                                                      | Transação de cancelamento autorizada com sucesso                                                                                                                                                       | No                                                                                                             |
| FG            | Unauthorized transaction. Call AmEx 08007285090.                                                                                                      | Unauthorized transaction. Guide the carrier to contact AmEx Call Center.                                                                                                                                                                                                       | Unauthorized transaction. Contact the AmEx Call Center at the phone number 08007285090                                                                                                                 | No                                                                                                             |
| GA            | Wait for contact                                                                                                                                      | Unauthorized transaction. Referred by Lynx Online in a preventive way.                                                                                                                                                                                                         | Unauthorized transaction. Contact the merchant.                                                                                                                                                        | No                                                                                                             |
| GD            | Transaction not allowed.                                                                                                                              | Transaction can not be processed in the establishment. Contact Cielo for more details.                                                                                                                                                                                         | Transaction not allowed. Contact the virtual store                                                                                                                                                     | No                                                                                                             |
| HJ            | Transaction not allowed. Invalid operation code.                                                                                                      | Transaction not allowed. Invalid Coban operation code.                                                                                                                                                                                                                         | Transaction not allowed. Invalid Coban operation code. Contact the merchant.                                                                                                                           | No                                                                                                             |
| IA            | Transaction not allowed. Invalid operation indicator.                                                                                                 | Transaction not allowed. Invalid Coban operation indicator.                                                                                                                                                                                                                    | Transaction not allowed. Invalid Coban operation indicator. Contact the merchant.                                                                                                                      | No                                                                                                             |
| KA            | Transaction not allowed. Data validation failed.                                                                                                      | Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                             | Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.                                             | No                                                                                                             |
| KB            | Transaction not allowed. Incurred option selected.                                                                                                    | Transaction not allowed. Wrong option selected. Ask the carrier to review the data and try again. If the error persists, the communication between virtual store and Cielo must be checked.                                                                                    | Transaction not allowed. Wrong option selected. Try again. If the error persists, contact the Virtual Store.                                                                                           | No                                                                                                             |
| KE            | Unauthorized transaction. Data validation failed.                                                                                                     | Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the carrier.                                                                                                                                                  | Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the virtual store.                                                                                           | No                                                                                                             |
| N7            | Unauthorized transaction. Invalid security code.                                                                                                      | Unauthorized transaction. Invalid security code. Guide the carrier to correct the data and try again.                                                                                                                                                                          | Unauthorized transaction. Review the data and enter again.                                                                                                                                             | No                                                                                                             |
| U3            | Transaction not allowed. Data validation failed.                                                                                                      | Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.                                                                             | Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.                                             | No                                                                                                             |

## Error Codes

The errors that may appear in the XML message through the TAG '<error>' are arranged as follows:

### Table integration errors

| Code | Message                                              | Description                                                                                                             | Action                                                                                                     |
| ---- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1    | Invalid message                                      | The XML message is off the format specified by ecommerce.xsd file                                                       | Review the information sent in front XML message specifications                                            |
| 2    | Invalid Credentials                                  | Inability to authenticate a virtual store request.                                                                      | Check if the number of accreditation and the key are correct                                               |
| 3    | Nonexistent transaction                              | There is no transaction to the informed identifier                                                                      | Reviewing the application                                                                                  |
| 8    | Invalid Security Code                                | The security code entered in the message is invalid.                                                                    | Review the card information sent in the XML message                                                        |
| 10   | Inconsistency in sending the card                    | The transaction, with or without card, is divergent with the permission of sending this information                     | Reviewing the Store Registration allows sending the card or not                                            |
| 11   | Not enabled mode                                     | The transaction is configured with a non-authorized payment method to the store                                         | Review the payment method requested                                                                        |
| 12   | Number of invalid portions                           | The number of shares requested exceeds the maximum allowed                                                              | Review the payment method                                                                                  |
| 13   | Automatic authorization flag                         | Flag automatic authorization incompatible with the invalid payment method requested                                     | Review the rules for using the flag                                                                        |
| 14   | Invalid Direct Authorization                         | The Direct authorization request is invalid                                                                             | Review the rules for using the Direct Authorization                                                        |
| 15   | Direct authorization without card                    | The direct authorization request is without a card                                                                      | Review the rules for using the Direct Authorization                                                        |
| 16   | Identifier, TID, invalid                             | The supplied TID is duplicated                                                                                          | Reviewing the application                                                                                  |
| 17   | Missing security code                                | The card security code is not sent (this information is compulsory for Amex)                                            | Reviewing the application                                                                                  |
| 18   | Security Code indicator inconsistent                 | Incorrect use of the security code indicator                                                                            | Review the card information sent in the XML message                                                        |
| 19   | Return URL not supplied                              | The Return URL is mandatory, except for recurrence and direct authorization.                                            | Review the information sent in the XML message                                                             |
| 20   | Status does not allow authorization                  | You may not engage authorization for the transaction status                                                             | Revise authorization rules                                                                                 |
| 21   | Deadline authorization expired                       | It’s not allowed to perform authorization, as the term is expired                                                       | Revise authorization rules                                                                                 |
| 22   | Invalid number of installments                       | It’s not allowed to perform authorization for this number of installments                                               | Revise authorization rules                                                                                 |
| 25   | Forward to authorization is not allowed              | The result of the transaction authentication does not allow the authorization request                                   | Revise authorization rules                                                                                 |
| 30   | Invalid status to capture                            | The status of the transaction does not allow capture                                                                    | Review the capture rules                                                                                   |
| 31   | Capture deadline defeated                            | The capture can not be performed because the time for capture is overdue                                                | Review the capture rules                                                                                   |
| 32   | Invalid capture value                                | The amount requested for capture is not valid                                                                           | Review the capture rules                                                                                   |
| 33   | Failed to capture                                    | Could not perform the capture                                                                                           | Perform retry. Persisting, contact the E-commerce support and inform the transaction TID.                  |
| 34   | Mandatory departure tax value                        | The amount of the departure tax is required if the catch is partial and authorization has been made with departure tax. | Send again capturing request tagged.                                                                       |
| 35   | invalid issuer for use boarding fee                  | The card issuer used in the transaction does not support the boarding rate.                                             | Remove the rate of shipment, or use a card that supports this feature: Visa or Mastercard.                 |
| 36   | Invalid product for use boarding fee                 | The chosen product is not supported on the departure tax.                                                               | Change the product.                                                                                        |
| 40   | Cancellation deadline defeated                       | Cancellations can not be performed because the term has expired                                                         | Review the cancellation rules.                                                                             |
| 42   | Failure to cancel                                    | It was not possible to cancel                                                                                           | Perform retry. Persisting, you should contact the E-commerce support and inform the transaction TID.       |
| 43   | Cancellation value is higher than the allowed value. | The value that is trying to cancel exceeds the total value of the transaction captured.                                 | Review the value of partial cancellation, it may not be larger than the captured value of the transaction. |
| 51   | Invalid recurrence                                   | The transaction settings do not allow the successful performance of the applicant transaction.                          | Make sure to choose "Lump Sum"; Make sure you are sending only the token or only credit card               |
| 52   | Invalid Token                                        | The token provided in the authorization request is not valid or is blocked.                                             | Ensure that the Token is correct. If it persists, contact support.                                         |
| 53   | Recurrence not enabled                               | Registration the shopkeeper does not allow sending recurring transactions.                                              | Contact support for enable the recurrence to register.                                                     |
| 54   | Transaction with invalid Token                       | The transaction settings do not allow the direct authorization to use Token is successfully made.                       | Make sure to choose "Lump Sum"; Make sure you are only sending the token or only credit card.              |
| 55   | Card number not supplied                             | It was requested the creation of Token, but the credit card number was not provided.                                    | Review the information sent on XML message in front of specifications                                      |
| 56   | Card validity not supplied                           | It was requested the creation of Token, but the validity of the credit card has not been provided.                      | Review the information sent in the message across XML specifications.                                      |
| 57   | Unexpected error generating Token                    | System failure occurred at the time of generation of the Token.                                                         | Try again. If it persists, contact Support.                                                                |
| 61   | Invalid Recurring Transaction                        | The recurring transaction settings are invalid.                                                                         | Make sure the product is Lump Sum if the token or card were sent in the message.                           |
| 77   | XID not supplied                                     | authorization with external authentication was requested, but the XID field was not provided.                           | Review the information sent in the message across XML specifications.                                      |
| 78   | CAVV not supplied                                    | authorization with external authentication was requested, but CAVV field was not provided.                              | Review the information sent in the message across XML specifications.                                      |
| 86   | XID and CAVV not provided                            | authorization with external authentication was requested, but the CAVV and XID fields were not provided.                | Review the information sent in the message across XML specifications.                                      |
| 87   | CAVV with divergent size                             | authorization with external authentication was requested, but CAVV field has a divergent size.                          | Review the information sent in the message across XML specifications.                                      |
| 88   | XID with differing size                              | authorization with external authentication was requested, but the XID field has a divergent size.                       | Review the information sent in the message across XML specifications.                                      |
| 89   | ECI with divergent size                              | authorization with external authentication was requested, but the ECI field possesses a divergent size.                 | Review the information sent in the message across XML specifications.                                      |
| 90   | ECI invalid                                          | authorization with external authentication was requested, but the ECI field has an invalid value.                       | Review the information sent in the message across XML specifications.                                      |
| 95   | Internal error authentication                        | Failure in system                                                                                                       | If it persists, contact the support and tell the transaction TID.                                          |
| 97   | Unavailable System                                   | System failure                                                                                                          | If it persists, contact support.                                                                           |
| 98   | Timeout                                              | The application did not respond within 25 seconds                                                                       | If it persists, contact support.                                                                           |
| 99   | Unexpected Error                                     | System failure                                                                                                          | If it persists, contact the support and tell the transaction TID.                                          |

## Status of transactions

| Status                        | Code |
| ----------------------------- | ---- |
| Built Transaction             | 0    |
| Transaction in Progress       | 1    |
| Transaction Authenticated     | 2    |
| Transaction Not Authenticated | 3    |
| Authorized Transaction        | 4    |
| Unauthorized Transaction      | 5    |
| Captured Transaction          | 6    |
| Transaction Cancelled         | 9    |
| Transaction Authentication    | 10   |
| Transaction in Cancellation   | 12   |

## ECI

| Log Results                                                                            | Visa | Mastercard | Aura  | Other |
| -------------------------------------------------------------------------------------- | ---- | ---------- | ----- | ----- |
| Successfully authenticated carrier.                                                    | 5    | 2          | n / a | n / a |
| Carrier not authenticated because the issuer didn’t provide authentication mechanisms. | 6    | 1          | n / a | n / a |
| Carrier not authenticated successfully as an unexpected technical error.               | 7    | 1          | n / a | n / a |
| Carrier not authenticated successfully.                                                | 7    | 0          | n / a | n / a |
| The store chose to allow bypassing the authentication.                                 | 7    | 0          | 0     | 7     |

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

- **Purpose** - Submit a direct transaction using a credit card.
- **Rules**
  - The online store register must be enable to send card data.
  - Send a TAG <authorize> with the value "3".
  - Valid only for credit.
  - The retailer must pay attention on sending card rules.
  - In direct authorization, the security level of transaction (ECI) is defined as:
    - "7" for Visa, Diners, Discover, Elo and JCB.
    - "0" for Mastercard, Aura and Hipercard.

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

The recurrent authorization must be done in two ways: sending a token previously registered, or using a card. The recurrent transaction is very Yesilar than traditional transaction, the changes consist on the rules that emitter and card issuer use to authorize or deny a transaction. Another difference is related to "Renova Fácil" (Easy Renew).

<aside class="notice">To know if your store is eligible to use a recurrent authorization, check with our service center or Cielo E-commerce Web Support.</aside>

<aside class="notice">All the messages must be formatted correctly, according specified on <a href="{{ site.baseurl }}/attachment/ecommerce.xsd">XML Schema eCommerce.xsd</a></aside>

### Recurrent authorization with card

- **Purpose** - Submit a recurrent transaction using a credit card.\*\*
- **Rules**
  - Send a TAG '<autorizar>' with value "4".
  - Valid just for lump sum.

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

| Element         | Type         | Mandatory | Size   | Description                           |
| --------------- | ------------ | --------- | ------ | ------------------------------------- |
| tid             | Alphanumeric | Yes       | 20     | transaction identifier                |
| dados-ec.numero | Numeric      | Yes       | 1..20  | affiliation store number with Cielo.  |
| dados-ec.chave  | Alphanumeric | Yes       | 1..100 | store access key attributed by Cielo. |

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

- **Purpose** - Request the creation of a token associated to a credit card to help the transaction sending without card.
- **Rules**
  - The Token is unique to a specific [Card+Commercial Establishment]. So, a card can be "tokenized" in more than a store and each one will has different codes.
  - If more than one request has been sent with the same data, the token returned will be always the same.
  - The creation of token is independent of a transaction result (approved/declined).

<aside class="warning">Transactions via token don't dispense the retailer from sending card issuer information, however is necessary that retailer system (or gateway) that will hold tokens also hold card issuers that have been tokenized.</aside>

<aside class="notice">A token that is not used for more than a year will be automatically removed from Cielo data banking. It's possible to block a specific token to don’t be more used. The block of token must be requested to Cielo E-commerce Web Support.</aside>

| Element                      | Type        | Mandatory | Size   | Description                                                |
| ---------------------------- | ----------- | --------- | ------ | ---------------------------------------------------------- |
| dados-ec.numero              | Numeric     | Yes       | 1..20  | Store affiliation number with Cielo                        |
| dados-ec.chave               | Alfanumeric | Yes       | 1..100 | Store access key assigned by Cielo.                        |
| daods-portador               | n/a         | Optional  | n/a    | Node with card data                                        |
| dados-portador.numero        | Numeric     | Yes       | 19     | Card number                                                |
| dados-portador.validade      | Numeric     | Yes       | 6      | Card validity on yyyymm format. Example: 201212 (dec/2012) |
| dados-portador.nome-portador | Alfanumeric | Optional  | 0..50  | Name printed as in the card                                |

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

| Element                | Type        | Size  | Description                            |
| ---------------------- | ----------- | ----- | -------------------------------------- |
| codigo-token           | Alfanumeric | 100   | Code of token created                  |
| status                 | Numeric     | 1     | Token Status: 0 – Locked, 1 – Unlocked |
| numero-cartao-truncado | Alfanumeric | 1..16 | truncated-card-number                  |

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

- **Purpose** - To submit a direct transaction (without authentication) using a token previously registered.
- **Rules**
  - To send a TAG <autorizar> with the value "3".
  - Token must be unlocked
  - Valid just for lump sum.

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

- **Purpose** - To submit a recurrent transaction using a token previously registered.\*\* - Submeter uma transação recorrente com o uso de um token previamente cadastrado.
- **Rules**
  - To send a TAG <autorizar> with the value "4".
  - Token must be unlocked.
  - Valid just for lump sum.

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

- **Purpose** - Beyond the specific message to creation of a token, described in a transaction with token, it's possible to employ an authorization request to ask a creation of token, adding the information <gerar-token> in the node of request of a transaction.
- **Rules**
  - In case of a card being submitted more than once for the same retailer, the Token created will be the same.

### Card On File

The cardholder may allow his card data to be stored securely for future transactions at the Merchant.

Below are the situations to identify if it's the first or subsequent transaction through the first transaction TAG:

- **Situation 1:** - **THERE IS** card date storage and **IT'S** first transaction.

```xml
<credencial-armazenada>
  <primeira-transacao>S</primeira-transacao>
</credencial-armazenada>
```

- **Situation 2:** - **THERE IS** card date storage and **IT ISN'T** first transaction.

```xml
<credencial-armazenada>
  <primeira-transacao>N</primeira-transacao>
</credencial-armazenada>
```

- **Situation 3:** - **THERE ISN'T** storage of card data, the establishment Yesply does not send this tag.

#### Request

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
  <dados-ec>
    <numero>2000019700</numero>
    <chave>65d156641f765861451c7c1270a4c09a617863b031b2e4b0c4a09cd390783c82</chave>
  </dados-ec>
  <dados-portador>
    <numero>4096031111110011</numero>
    <validade>201712</validade>
    <indicador>1</indicador>
    <codigo-seguranca>123</codigo-seguranca>
    <nome-portador>TESTE CUCUMBER</nome-portador>
  </dados-portador>
  <dados-pedido>
    <numero>77115</numero>
    <valor>315000</valor>
    <moeda>986</moeda>
    <data-hora>2016-02-16T13:45:05</data-hora>
    <descricao>Compra Online</descricao>
    <idioma>PT</idioma>
    <soft-descriptor>soft cucumber</soft-descriptor>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>visa</bandeira>
    <produto>1</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <url-retorno>http://www.cielo.com.br</url-retorno>
  <autorizar>3</autorizar>
  <capturar>false</capturar>
  <credencial-armazenada>
    <primeira-transacao>S</primeira-transacao>
  </credencial-armazenada>
  <gerar-token>false</gerar-token>
</requisicao-transacao>
```

| Element                                  | Type        | Mandatory   | Size    | Description                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ----------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| dados-ec.numero                          | Numeric     | Yes         | 1..20   | Store affiliation number with Cielo.                                                                                                                                                                                                                                           |
| dados-ec.chave                           | Alfanumeric | Yes         | 1..100  | Store access key assigned by Cielo.                                                                                                                                                                                                                                            |
| dados-portador.numero                    | Numeric     | Yes         | 19      | Card number.                                                                                                                                                                                                                                                                   |
| dados-portador.validade                  | Numeric     | Yes         | 1       | Card validity in aaaamm format. Example: 201212 (dec/2012).                                                                                                                                                                                                                    |
| dados-portador.indicador                 | Numeric     | Yes         | 1       | Security Code submission indicator: 0 - not reported, 1 - reported, 2 - unreadable, 9 - nonexistent                                                                                                                                                                            |
| dados-portador.codigo-seguranca          | Numeric     | Conditional | 3..4    | Required if indicator is 1.                                                                                                                                                                                                                                                    |
| dados-portador.nome-portador             | Alfanumeric | Optional    | 0..100  | Name as printed on card.                                                                                                                                                                                                                                                       |
| dados-pedido.numero                      | Alfanumeric | Yes         | 1..20   | Store order number. It is recommended to be a single value per order.                                                                                                                                                                                                          |
| dados-pedido.valor                       | Numeric     | Yes         | 1..12   | Amount to be charged for the order (must already include freight, wrapping, extra costs, shipping fee, etc.). This amount is what will be charged to the consumer.                                                                                                             |
| dados-pedido.moeda                       | Numeric     | Yes         | 3       | Numeric currency code in ISO 4217. For Real, the code is 986.                                                                                                                                                                                                                  |
| dados-pedido.data-hora                   | Alfanumeric | Yes         | 19      | Date time of order. Format: aaaa-MM-ddTHH24:mm:ss                                                                                                                                                                                                                              |
| dados-pedido.descricao                   | Alfanumeric | Optional    | 0..1024 | Order description                                                                                                                                                                                                                                                              |
| dados-pedido.idioma                      | Alfanumeric | Optional    | 2       | Order language: PT (Portuguese), EN (English) or ES (Spanish). Based on this information, the language to be used on Cielo's screens is defined. If not sent, the system will assume “PT”.                                                                                     |
| dados-pedido.soft-descriptor             | Alfanumeric | Optional    | 0..13   | Text of up to 13 characters will be displayed on the carrier invoice after the name of the merchant.                                                                                                                                                                           |
| forma-pagamento.bandeira                 | Alfanumeric | Yes         | n/a     | Flag Name (lowercase): “visa”, “mastercard”, “diners”, “discover”, “link”, “amex”, “jcb”, “aura”, “hypercard”                                                                                                                                                                  |
| forma-pagamento.produto                  | Alfanumeric | Yes         | 1       | Product code: 1 - Cash Credit, 2 - Installment store, A - Debit.                                                                                                                                                                                                               |
| forma-pagamento.parcelas                 | Numeric     | Yes         | 1..2    | Number of installments. For cash credit or debit, use 1.                                                                                                                                                                                                                       |
| url-retorno                              | Alfanumeric | Yes         | 1..1024 | Return page URL. This is where Cielo will direct the browser to end authentication or authorization. It isn't only required for direct authorization, but the field must be entered as null.                                                                                   |
| autorizar                                | Alfanumeric | Yes         | 1       | Defines whether the transaction authorization type is authentication. <br> 0 - Do not authorize <br> 1 - Authorize only if authenticated <br> 2 - Authorize unauthenticated and authenticated <br> 3 - Only authorize (do not authenticate) ) <br> 4 - recurring authorization |
| capturar                                 | Boolean     | Yes         | n/a     | true or false. Defines whether the transaction will be automatically captured if it's authorized.                                                                                                                                                                              |
| credencial-armazenada.primeira-transacao | Alfanumeric | Optional    | 1       | Stored cardholder data. <br> Defines whether this is the first transaction (S) or subsequent transaction (N).                                                                                                                                                                  |
| gerar-token                              | Boolean     | Optional    | n/a     | true or false. Defines whether the current transaction should generate a token associated with the card.                                                                                                                                                                       |

#### Response

```xml
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0" xmlns="http://ecommerce.cbmp.com.br">
  <tid>20000197008CTDEP7DHC</tid>
  <pan>iwcdiV9SLhtb/dsQNXRHT426+tgjcLtMzchw5YggfP8=</pan>
  <dados-pedido>
    <numero>77115</numero>
    <valor>315000</valor>
    <moeda>986</moeda>
    <data-hora>2016-02-16T13:45:05</data-hora>
    <descricao>Compra Online</descricao>
    <idioma>PT</idioma>
  </dados-pedido>
  <forma-pagamento>
    <bandeira>elo</bandeira>
    <produto>A</produto>
    <parcelas>1</parcelas>
  </forma-pagamento>
  <status>6</status>
  <autenticacao>
    <codigo>6</codigo>
    <mensagem>Autenticada com sucesso</mensagem>
    <data-hora>2019-08-28T13:45:43.959-03:00</data-hora>
    <valor>315000</valor>
    <eci>5</eci>
  </autenticacao>
  <autorizacao>
    <codigo>6</codigo>
    <mensagem>Transacao autorizada</mensagem>
    <data-hora>2019-08-28T13:45:43.959-03:00</data-hora>
    <valor>315000</valor>
    <lr>00</lr>
    <arp>882114</arp>
    <nsu>248001</nsu>
  </autorizacao>
  <captura>
    <codigo>6</codigo>
    <mensagem>Transacao capturada com sucesso</mensagem>
    <data-hora>2019-08-28T13:45:43.959-03:00</data-hora>
    <valor>315000</valor>
  </captura>
</transacao>
```

| Element                  | Type        | Mandatory | Size    | Description                                                                                                                                                                                |
| ------------------------ | ----------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tid                      | Alfanumeric | Yes       | 1..40   | Transaction identifier.                                                                                                                                                                    |
| pan                      | Alfanumeric | Yes       | n/a     |
| dados-pedido.numero      | Alfanumeric | Yes       | 1..20   | Store order number. It's recommended to be a single value per order.                                                                                                                       |
| dados-pedido.valor       | Numeric     | Yes       | 1..12   | Amount to be charged for the order (must already include freight, wrapping, extra costs, shipping fee, etc.). This amount is what will be charged to the consumer.                         |
| dados-pedido.moeda       | Numeric     | Yes       | 3       | Numeric currency code in ISO 4217. For Real, the code is 986.                                                                                                                              |
| dados-pedido.data-hora   | Alfanumeric | Yes       | 19      | Date time of order. Format: aaaa-MM-ddTHH24:mm:ss                                                                                                                                          |
| dados-pedido.descricao   | Alfanumeric | Optional  | 0..1024 | Order description                                                                                                                                                                          |
| dados-pedido.idioma      | Alfanumeric | Optional  | 2       | Order language: PT (Portuguese), EN (English) or ES (Spanish). Based on this information, the language to be used on Cielo's screens is defined. If not sent, the system will assume “PT”. |
| forma-pagamento.bandeira | Alfanumeric | Yes       | n/a     | Flag Name (lowercase): “visa”, “mastercard”, “diners”, “discover”, “link”, “amex”, “jcb”, “aura”, “hypercard”                                                                              |
| forma-pagamento.produto  | Alfanumeric | Yes       | 1       | Product code: 1 - Cash Credit, 2 - Installment store, A - Debit.                                                                                                                           |
| forma-pagamento.parcelas | Numeric     | Yes       | 1..2    | Number of installments. For cash credit or debit, use 1.                                                                                                                                   |
| autenticacao.codigo      | Numeric     | Yes       | 1.2     | Processing code                                                                                                                                                                            |
| autenticacao.mensagem    | Alfanumeric | Yes       | 1..100  | Message with the response about transaction processing.                                                                                                                                    |
| autenticacao.data-hora   | Alfanumeric | Yes       | 19      | Processing date and time                                                                                                                                                                   |
| autenticacao.valor       | Numeric     | Yes       | 1..12   | Processing value without punctuation. The last two digits are the cents.                                                                                                                   |
| autenticacao.eci         | Numeric     | Yes       | 2       | Security level.                                                                                                                                                                            |
| autorizacao.codigo       | Numeric     | Yes       | 1.2     | Processing code                                                                                                                                                                            |
| autorizacao.mensagem     | Alfanumeric | Yes       | n/a     | Message with the response about transaction processing.                                                                                                                                    |
| autorizacao.data-hora    | Alfanumeric | Yes       | 19      | Processing date and time                                                                                                                                                                   |
| autorizacao.valor        | Numeric     | Yes       | 1..12   | Processing value without punctuation. The last two digits are the cents.                                                                                                                   |
| autorizacao.lr           | Alfanumeric | Yes       | 4       | Literal code of authorization.                                                                                                                                                             |
| autorizacao.arp          | Alfanumeric | Yes       | 6       | Authorization ARP.                                                                                                                                                                         |
| autorizacao.nsu          | Alfanumeric | Yes       | 6       | Authorization NSU                                                                                                                                                                          |
| captura.codigo           | Numeric     | Yes       | 1.2     | Processing code                                                                                                                                                                            |
| captura.mensagem         | Alfanumeric | Yes       | n/a     | Message with the response about transaction processing.                                                                                                                                    |
| captura.data-hora        | Alfanumeric | Yes       | 19      | Processing date and time                                                                                                                                                                   |
| captura.valor            | Numeric     | Yes       | 1..12   | Processing value without punctuation. The last two digits are the cents.                                                                                                                   |

### Flag Tokenization

Customers who card tokenize along with the flags can send the information to Cielo in the transactional flow.

#### Request

```xml
<?xml version="1.0"?>
<requisicao-transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0">
    <dados-ec>
        <numero>2000019700</numero>
        <chave>65d156641f765861451c7c1270a4c09a617863b031b2e4b0c4a09cd390783c82</chave>
    </dados-ec>
    <dados-portador>
        <numero>4084359300407900</numero>
        <validade>201712</validade>
        <indicador>1</indicador>
        <codigo-seguranca>123</codigo-seguranca>
        <nome-portador>TESTE CUCUMBER</nome-portador>
        <token/>
        <carteira>
            <tipo>MERCHANT</tipo>
            <codigo-captura/>
            <cavv>A901234A5678A0123A567A90120=</cavv>
            <eci>4</eci>
        </carteira>
    </dados-portador>
    <dados-pedido>
        <numero>86785</numero>
        <valor>315000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
        <soft-descriptor>soft cucumber</soft-descriptor>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <url-retorno>http://www.cielo.com.br</url-retorno>
    <autorizar>3</autorizar>
    <capturar>false</capturar>
    <gerar-token>false</gerar-token>
    <avs>
        <![CDATA[<dados-avs><endereco>Rua Credito</endereco><complemento>Apto 504</complemento><numero>745</numero><bairro>Vila Cucumber</bairro><cep>13040-144</cep><cpf>30652698501</cpf></dados-avs>]]>
    </avs>
</requisicao-transacao>
```

| Property      | Type        | Size |
| ------------- | ----------- | ---- |
| carteira.eci  | Numeric     | 1    |
| carteira.cavv | Alfanumeric | 29   |
| carteira.tipo | Fixed       |      |

#### Response

```xml
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<transacao id="1abd5a36-fba5-4a92-9341-7c9e9d44aa1a" versao="1.3.0" xmlns="http://ecommerce.cbmp.com.br">
    <tid>2000019700008C730BOC</tid>
    <pan>Ma7WOe2ciLGucTokmn5mX2mkpeVJGkqVTavqR42Pm5k=</pan>
    <dados-pedido>
        <numero>86785</numero>
        <valor>315000</valor>
        <moeda>986</moeda>
        <data-hora>2016-02-16T13:45:05</data-hora>
        <descricao>Compra Online</descricao>
        <idioma>PT</idioma>
    </dados-pedido>
    <forma-pagamento>
        <bandeira>visa</bandeira>
        <produto>1</produto>
        <parcelas>1</parcelas>
    </forma-pagamento>
    <status>4</status>
    <autenticacao>
        <codigo>4</codigo>
        <mensagem>Nao autenticada</mensagem>
        <data-hora>2020-01-09T11:28:39.732-03:00</data-hora>
        <valor>315000</valor>
        <eci>4</eci>
    </autenticacao>
    <autorizacao>
        <codigo>4</codigo>
        <mensagem>Transacao autorizada</mensagem>
        <data-hora>2020-01-09T11:28:39.732-03:00</data-hora>
        <valor>315000</valor>
        <lr>00</lr>
        <arp>144716</arp>
        <nsu>549201</nsu>
        <codigo-avs-cep>C</codigo-avs-cep>
        <mensagem-avs-cep>Confere</mensagem-avs-cep>
        <codigo-avs-end>C</codigo-avs-end>
        <mensagem-avs-end>Confere</mensagem-avs-end>
    </autorizacao>
</transacao>
```

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

- **Purpose** - Make eligible the transaction for authentication.
- **Rules**
  - To send a flag `autorizar` according to the domain below, to try:
    - 0 - Only authenticate a transaction
    - 1- Submit to authorization only if the transaction be authenticated.
    - 2- Submit to authorization if the transaction be authenticated or not.
  - For debit, send the product "A" at XML.
  - The request to authorization of a transaction that has been just authenticated can be done in until 90 days after the initial date.

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

- **Purpose** - Allows the retailer to send a text with until 13 characters that will be printed on holder invoice, next to store identification, respecting the card issuers length:
  - **Visa**: 25 characters
  - **Mastercard**: 11 characters
- **Rules**
  - Maximum size: 13 characters
  - Available only for Visa and Mastercard issuers.
  - Exclusive use of Yesple characters.

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

- **Purpose** - The automatic capture allows a request of authorization to be captured immediately after its approval. So it's not necessary realize a `<requisicao-captura>`.
- **Rules**
  - Just approved authorizations can be captured automatically.

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

- **Purpose**: the boarding fee is the informative field that defines the total amount of transaction (informed on tag data-order//value) that must be destined to payment of Infraero tax.
  - The boarding fee is not accumulated to authorization value. For example, in a airplane ticket sale of R$ 200,00 with boarding fee of R$ 25,00 you have to send the field `<valor>22500</valor>` and `<taxa-embarque>2500</taxa-embarque>`.
- **Rules**
  - Available just for Visa and Mastercard issuers.
  - The boarding fee is not added to authorization value, in other words, it's just informative.

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

- **Purpose**: AVS is a service to card transaction not presencial where is realized a register validation through numeric data of address informed by holder (shipping/delivery address on invoice) at online store, with register data of emitter.
  - AVS is a service that helps to reduce risks of lack of recognition at online shopping. It's a establishment tool to analyze your sales, before decide for transaction capture and product shipping or service.
- **Rules**
  - Available just for Visa, Mastercard and Amex issuers.
  - Products allowed: only credit.
  - The consult returned to AVS is separated in two itens: CEP and address.
  - Each one can have the values following:
    - C- Check;
    - N- Not check;
    - U - unavailable
    - T - Temporarily unavailable
    - X - Service doesn’t supported by this card issuer
    - E - There are some error on data sent. Check if all fields were sent.
  - The node containing the XML of AVS must be encapsulated by "CDATA" term, to avoid problems with the parter of request.
  - All fields contained AVS node must be filled.
  - When some field is not relevant, the tag must be sent with NULL or N/A.
  - It's necessary enable the option AVS on the register. To enable an option AVS on the register or consult the participant banks please, contact Cielo E-commerce Web Support..

<aside class="warning">According contract, this additional service is subjected to charge from the moment of the request for consulting AVS. For more information, please, contact our service center, commercial manager or Cielo E-commerce Web Support.</aside>

## Capture

An authorized transaction only creates the credit for a commercial establishment in case being captured. **That's why all sales that the retailer want effective must be necessary realize the capture (or confirmation).**

For sales on Credit modality, this confirmation happens in two moments:

- Immediately after the authorization (total capture);
- After the authorization (total capture or partial).

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

- **Purpose**: realize total and partial capture of a transaction previously authorized.
- **Rules**
  - Available only to transaction on the timeout maximum of capture.
  - In case of the amount doesn't be informed, the system will assume the capture of total value.
  - The capture value must be lower or equal to authorization value.
  - In case of failure, new capture tries can be done.
  - In case of success, the status is chaged to "6 - Captured".
  - **Transaction with boarding fees:**
    - On the request capture, the boarding fee indicates the total of amount that will be captured that must be destined to this purpose.
    - It's mandatory in case of partial capture.
    - In case of total capture, the system will consider the value of boarding fee informed to request of authorization (`<requisicao-transacao>`).

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

| Element               | Type        | Size   | Description                                                           |
| --------------------- | ----------- | ------ | --------------------------------------------------------------------- |
| captura               |             |        | Node with capture data in case that it has been passed for this step. |
| captura.codigo        | Numeric     | 1..2   | Processing code                                                       |
| captura.mensagem      | Alfanumeric | 1..100 | Processing details                                                    |
| captura.datahora      | Alfanumeric | 19     | Date and time of processing.                                          |
| captura.valor         | Numeric     | 1..12  | Processing value without points. The last two numbers are “centavos”  |
| captura.taxa-embarque | Numeric     | 1..9   | Montante declarado como taxa de embarque que foi capturado.           |

## Cancellation

The cancellation is used when the retailer decides for don't effective a purchase order, because the stock is not enough, because the customer gave up, ot any other reason. Its usage is necessary especially if the transaction has been captured, because there will be a debit on holder's invoice if it won't be cancelled.

<aside class="notice">If the transaction is just authorized and the store want to cancel it, the cancellation order it's not necessary, because after the timeout of capture expires, it will be cancelled automatically by the system.</aside>

For cancellation requests for the same transaction, it is necessary to wait a period of 5 seconds between one request and another, so that the balance inquiry is carried out, the amount is reserved in the financial agenda and the balance is sensitized. Thus avoiding duplicate cancellation. This rule applies to total and/or partial cancellations.

To identify that cancellation requests are from the same transaction, we consider the EC number, cancellation authorization number, date of sale, sale amount, and NSU.

It is important to note that in order to make any cancellation request, it is necessary that the establishment has sufficient balance in the transaction/on the schedule

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

- **Purpose**: Realize the cancellation of total or partial value of a transaction.
- **Rules**
  - The total cancellation is valid for captured transaction, and also for authorized ones, the partial is valid just to the captured ones.
  - The cancellation timeout is until 120 current days to credit modality and D+0 to debt.
  - The total cancellation, when realized with success changes the transaction status to "9-Cancelled", while the partial doesn't change the transaction status, keeping it as "6-Captured".
  - In case of XML version 1.6.1 (this version is only for cancellation), the status of partial cancellation will be different: If cancellation OK, the code of status will be 9. In case of error on partial cancellation, the code of status will be 6. This rules are only for partial cancellation
  - Do not use the version 1.6.1 to send transactions. This versions is only to cancellation.
  - If the TAG `<valor>` doesn't be provided, the system will assume the total cancellation.
  - Partial cancellation is available for all flags supported in e-Commerce.
  - To debit modality, doesn't exist the possibility of effective the partial cancellation.
  - **Transaction with boarding fees:**
    - Captured transactions with the same authorization value (in other words, total capture), have the same treatment for total and partial cancellation, because the boarding fee value is fully cancelled.

| Element         | Type        | Mandatory | Size   | Description                                                                        |
| --------------- | ----------- | --------- | ------ | ---------------------------------------------------------------------------------- |
| tid             | Alfanumeric | Yes       | 1..40  | Transaction identifier                                                             |
| dados-ec.numero | Numeric     | Yes       | 1..10  | Store credential number                                                            |
| dados-ec.chave  | Alfanumeric | Yes       | 1..100 | Store access key assigned by Cielo                                                 |
| valor           | Numeric     | Optional  | 1..12  | Value to be cancelled. **If not being informed, it will be a total concellation.** |

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

The integrating tests must be realized before the homologation starts, during the development (codification) of solution. For this purpose, you must considered an enviroment like EndPoint to Webservice: [https://sandbox1-5.hdevelo.com.br/sandsky/xml](https://sandbox1-5.hdevelo.com.br/sandsky/xml)

<aside class="warning">All the connections to Cielo services must be done through the URL mentioned on this documentation. Cielo strongly recommend you don't  use the direct connection via IP, because it can vary without previously notice.</aside>

## Testing data

The data gross to realize the tests on this environment will be displayed on table below:

| Card issuer          | Authentication | Testing number card | Validity | Secure code - - CVC |
| -------------------- | -------------- | ------------------- | -------- | ------------------- |
| Visa                 | Sim            | 4012001037141112    | 202405   | 123                 |
| Mastercard           | Sim            | 5453010000066167    | 202405   | 123                 |
| Visa                 | Não            | 4012001038443335    | 202405   | 123                 |
| Mastercard           | Não            | 5453010000066167    | 202405   | 123                 |
| Amex                 | Não            | 376449047333005     | 202405   | 1234                |
| Diners               | Não            | 36490102462661      | 202405   | 123                 |
| Elo                  | Não            | 6362970000457013    | 202405   | 123                 |
| Elo (Corona Voucher) | Não            | 5067220000000000    | 202405   | 123                 |
| Discover             | Não            | 6011020000245045    | 202405   | 123                 |
| JCB                  | Não            | 3566007770004971    | 202405   | 123                 |
| Aura                 | Não            | 5078601912345600019 | 202405   | 123                 |

## Testing key

To make easier the development we provided two key for tests, one for each modality of integration. Based on initial configurations done on your registration, choose the correct data to realize the tests:

| Commercial establishment number | Testing key                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| 2000019700                      | 8c08a0d0f00b73dedd2673a06fa725b0bd8edbf71c4c7dd0614bf408e4d16120 |

<aside class="warning">The order value, besides to follow the format without points or decimal commas, must finish on "00", otherwise, the authorization will be always declined. Example: R$15,00 must be formated as "1500".</aside>

<aside class="notice">The testing environment must be used by testing establishments listed on the board above. The data usage of the establishment will create transaction impossible to track, creating incorrect results. On testing environment, use the credential for tests, on production environment, use the original data from establishment.</aside>

After conclude the development, the Homologation step will ensure that the implementation was appropriate and the customer solution is ready to interact with production environment of Cielo. It's always happens after the development has been finished and tested. It's composed by the next steps:

![fluxo testes]({{ site.baseurl_root }}/images/fluxo-testes.png)

1. Conclusion of Registration: at this stage, the customer must send an email to [cieloecommerce@cielo.com.br](mailto:cieloecommerce@cielo.com.br), requesting a production key. The message will contain the next information, that will complete the registration:

- Definitive URL of website (production environment).
- Name of responsible company by the development of integration.
- Name and technical email (responsible developer) by integration.
- Credential number (at Cielo) of online store.
- Legal name and fictitious name of online store.
- User and password to perform testing purchases.
- URL of store logo on GIF format and size of 112X25 pixels.

<aside class="notice">The logo image must be hosted in a safety environment (HTTP), otherwise the customer will receive security notification that can culminate on shopping abandonment.</aside>

In response, Cielo will return the valid key on production environment. Therefore, the store will be enable to realize tests on this environment. It starts the second step. It's important that the tests be realized to cover the next topics:

- Webservice interact: tests with the connection that you use.
- Visual integration: round trip of Cielo flow (an alternative flow must be considered).
- Correct payment modalities: tests with possible combination of payment.
- Payment methods: testing with the possible combination of payment.

At this moment, you have to consider the environment: [https://ecommerce.cielo.com.br/servicos/ecommwsec.do](https://ecommerce.cielo.com.br/servicos/ecommwsec.do)

<aside class="notice">The online store integration must be done always through the URL above and never for IP. </aside>

Production tests have to be done with card that belongs to the store or which holder authorized its usage, once in this environment exists a financial commitment about transaction realized.

At the end, a new request must be sent to cieloecommerce@cielo.com.br, to Cielo realize the homologation, indeed. The mass of tests will be executed to approve or deny the transactions.

The result "homologated" will be sent by e-mail. If there is any point that doesn't allow the conclusion of homologation, the information will be also sent by e-mail requesting the corrections that are necessary.

# Final considerations

## Reading rules to store's card

The reading of card data on own environment is controlled by rules defined by security program imposed by card issuers.

For Visa, this program is known as AIS (Account Information Security) PCI. To more information, access: [https://www.cielo.com.br](https://www.cielo.com.br) > Service > Security Service > AIS - Information Security Program or contact us.

For Mastercard, the security program is SDP (Site Data Protection) PCI. For more information, access: [http://www.mastercard.com/us/sdp/index.html](http://www.mastercard.com/us/sdp/index.html), or contact us.

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

International Program of Visa allows the customer authentication at the purchase moment on e-commerce environment. Visit: http://www.verifiedbyvisa.com.br/ to more information.

Secure Code Program (Mastercard)

International Program of Mastercard allows the customer authentication at the purchase moment on e-commerce environment. Visit: [http://www.verifiedbyvisa.com.br/](http://www.verifiedbyvisa.com.br/) to more information.
