---
layout: tutorial
title: Tutoriais
description:
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Cielo Checkout
---

# Backoffice - Tutorial

The purpose of this document is to guide the retailer about how to access and manipulate the Cielo Checkout Backoffice

## Accessing the Backoffice

In order to access the Cielo Checkout Backoffice, it Is required that the retailer **[Log in to the Cielo Website](https://www.cielo.com.br/minha-conta)**, by inserting his/her Affiliation (establishment number) and User:

![Cielo Backoffice Login]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-login.png)

After that, it is required to insert your Password:

![Cielo Backoffice Password]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-login-senha.png)

On the "Online Sales" area, just click on Cielo Checkout.

![Online sales]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-vendas-online.png)

In case the main website is not available, just access the URL [https://cieloecommerce.cielo.com.br/backoffice](https://cieloecommerce.cielo.com.br/backoffice) and insert your register e-mail and password.

[!Cielo Checkout ]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-cielo.png)

## Cielo Checkout Backoffice Tabs

The Backoffice is made of 6 different Cielo Checkout administration Tabs. They are:

| Tab                    | Description                                                                                                                                                                                       |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **DashBoard**          | Initial page where the information about your account and about the volume and kind of transactions made in your store are presented.                                                                 |
| **Orders**            | This page contains the entire listing of transactions made on Checkout Cielo. Here you can search for a particular order or transaction.                                              |
| **Payments link**     | In this page all the Buttons/Links registered on Cielo Checkout are listed                                                                                                       |
| **Reports**         | In this page it is possible to generate 05 kinds of reports: <br>“Financial report"<br>“Sales detailed”<br>“Clients list”<br>* “Billing Statement”<br>“Recurrence Report”|
| **Manuals**            | This page contains the Cielo Checkout manuals, as well as the FAQ page and "Questions", where the retailer is able to contact the Cielo Checkout support team.                      |
| **Configuration**      | Page where it is possible to make alterations on the Store configurations, its register data and Change your Password.                                                                               |

## DashBoard Tab

Initial Tab where the information about your account and about the volume and kind of transaction your store has been making via Cielo Checkout.

### Kinds of information

In this screen, you can find two kinds of information.

* **Alerts** – Indicates if there are orders to expire on the present date.
* **Financial and transactional volume** - Are interactive charts that show in percentage and in total value, what is the participation of each payment method at the end of the transactions made and the total volume according to the transactions status..

<aside class="warning">For standard, credit transactions expire in 15 days. After that period, they cannot be captured.</aside>

![DashBoard]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-dashboard.png)

## Orders Tab

This tab contains the entire listing of transactions made on Cielo Checkout. Here it is possible to search a given order, through a given search parameter on the fields or unchecking the "Payment methods" or "Payment status" "checkboxes" and pressing the button "Search".
The research result is displayed in the form of a transaction listing that can be exported as an Excel spreadsheet.

Orders Listing

![Orders]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-pedidos.png)

Orders details

![Order details]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-pedidos-detalhes.png)

## Payment Link Tab

In this tab, all links of created payments are presented. These links can be used in different ways to provide a greater sales volume.

To know more about payment links, check::

* **[Integration via Button/Payments link](https://developercielo.github.io/manual/checkout-cielo#integração-por-botão)**
* **[Payments link - Tutorial](https://developercielo.github.io/tutorial/checkout-tutoriais#Tutorial-LinkdePagamentos)**

On the Payments Link menu, there are the areas: **Register Payment Link** e **Listar Links de Pagamento Registrados**.

### List Payments Link Registered

![Registered products]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-listar-link-de-pagamentos.png)

By clicking on the Title or product SKU, you'll be redirected to page of Product informations, where all the product characteristics are informed and where you can set a standard to the Button  (in case your integration is based on Cielo Checkout Button) to be used in the sale of the product.

The integration via Button is better explained on the item **[Integration via Button/Payments link](https://developercielo.github.io/manual/checkout-cielo#integração-por-botão)**.

### Register Payments Link

In this page it is possible to register your products based on the kind of product itself. Each registered product will generate different payment Links.
Cielo Checkout considers 5 kinds of products: Physical material, Digital, Service, Recurrence and Payments.

* **Physical material** – Physical Products that require being sent by the retailers. Example: Clothes, Toys, etc.
* **Digital** –  Digital goods sold on the internet. Example: Software, Games, Music, etc.
* **Service** – Services to be rendered. Example: Delivery, projects and estimates.
* **Recurrence** - Transactions that repeat on a given interval of time. Example: Subscriptions, tuitions, etc.
* **Payments** - Unique payments or value transfers. Example: debt settlements, etc

![Register payments Link]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-cadastrar-link-de-pagamentos.png)

<aside class="notice">Physical materials require that a kind of freight is registered.</aside>

<aside class="notice">The field “SoftDescriptor” allows that the retailer inserts a message that will be displayed on the buyer's credit card invoice. This functionality is indicated to stores that have the fantasy name too different in comparison to the social name.</aside>

<aside class="notice">The message included on the “SoftDescriptor” field must be limited to *13 letters* and cannot contain spaces.</aside>

<aside class="notice">The products register is not mandatory for retailers that use the integration via cart</aside>

After registering the product/Payment link, the following store will be displayed:

![Product details]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-detalhes-link-de-pagamentos.png)

The payment Link is displayed in **3 ways:**

* **Button** - An HTML code like the one below will be created:

``` html
<form method='post' action='https://cieloecommerce.cielo.com.br/transactional/Checkout/BuyNow' target='blank'>
    <input type='hidden' name='id' value=00000000-0000-0000-000000000000/><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br /BackOffice/Content{{ site.baseurl_root }}/images/botao_comprar_3.jpg' />
</form>
```

**Example of a Functional button:**

<form method='post' action='https://cieloecommerce.cielo.com.br/transactionalvnext/order/buynow' target='blank'><input type='hidden' name='id' value='937874c6-a4d7-477e-9272-a4cb8b0c5f79' /><input type='image' name='submit' alt='Comprar' src='https://cieloecommerce.cielo.com.br/backoffice/Content/img/buttons/button-5-1.png'/></form>

* **QR CODE AND LINK** - The link and the QRCODE have the same behavior as the button, leading the same transactional screen.

|QR Code|Link|
|---|---|
|<img src='data:image/jpeg;base64,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'>|`http://bit.ly/2tRkSxZ`|

## Reports Tab

In this page it is possible to generate 05 kinds of reports: “Financial Report”, “Detailed of sales”, “Clients Listing”, “Billing Statement” e “Recurrence Report”.

### Financial Report

This report presents the sales paid in given period of time, being sorted by payment method. By selectimg the period and payment method, after pressing "Search", the result will be presented.

![Financial report]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-relatorio-financeiro.png)

### Detailed of Sales Report

This report informs the value of each order as well as the data about the product and buyer. The report only informs data from the orders considered with **“PAID”** status.

<aside class="notice">Orders made on Test Mode are not presented in this report, even if they have a “PAID” status</aside>

![Detailed sales report]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-relatorio-detalhado-vendas.png)

### Clients listing

The clients listing generates an Excel file containing the data of the clients that made the buying in your store.

#### The presented data are:

| Buyer data         | Shipping data or Billing   |
|:------------------:|:--------------------------:|
|        Name        |           Address          |
|       E-mail       |           Number           |
|       Phone        |         Complement         |
|      CPF/CNPJ      |          District          |
|                    |            City            |
|                    |            State           |
|                    |           Zip Code         |

### Billing statement

The list of the value charged by the services provided by Cielo is presented in this report. All plans data and transaction costs will be presented here:

![Billing statement]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-extrato-cobranca.png)

### Recurrence Report

In this report it is possible to search the recurrence set and your transactions based on your ID or by Status and occurrence Interval.

![Recurrences Report]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-relatorio-recorrencia.png)

When clicking on the “+” icon, the Recurrence Details screen is opened:

![Recurrence Details]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-detalhes-da-recorrencia.png)

The recurrence details inform the cart and the scheduled transactions history. When clicking on “+Details” the retailer is directed to the Orders details screen (Check item “ORDERS”)

It is possible to perform 3 kinds of modifications on the recurrence:

* **Deactivate the Recurrence** - Ends the automatic charge process. Deactivation cannot be undone.
* **Change the Interval** - Changes the current recurrence interval to one of the other options (Bimonthly, semiannual and annual)
* **Change the scheduling day** - Modifies the day in which the recurrence transaction will occur.

## Manuals Tab

This page contains the Cielo Checkout manuals, as well as the FAQ page and “Questions”, where the retailer is able to get in touch with the Cielo Checkout support team.

![Questions]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-suporte.png)

In this page it is possible to make contact regarding Operational, technical and Commercial questions and to access the Cielo Checkout technical and support documents.

* **Developer Manual** – Contains the procedures and the Cielo Checkout integration guidelines to your website.
* **FAQ** – Most common questions regarding Cielo Checkout. Contains information about Commercial, Technical and Operational questions and regarding the Test Mode.

## Store configurations Tab

In this page it is possible to perform configurations in different mechanisms within Cielo Checkout. This area is divided in 4 different parts: Display, Payments, Anti fraud, Courier freight and services.

### Display

Here it is possible to change the available payment method logo available in your store and website background color through the options box or typing the code related to the selected color (The colors are in RGB standard).

![Display configuration]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-configuracoes-loja.png)

<aside class="notice">The logo of your store will be displayed on the Checkout screen centralized.</aside>

### Payments

In this screen it is possible to change the available payment methods configurations in your store, setting them as active or not, and to configure the Return URL, notification and Status Change.

![Display configuration]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-configuracoes-pagamento.png)

#### Cielo Checkout Test Mode

The Cielo Checkout test mode is a tool that allows testing your website's integration. With the test mode, you can perform transactions as you evolve with the integration and you're able to simulate scenarios to test different payment methods.

Test mode can be activated by checking the selection box:

![Activating Test Mode]({{ site.baseurl_root }}/images/checkout/tm01.png)

When the option is saved, a red stripe will be displayed on the superior part of the screen. It'll be displayed in all Backoffice's screens and on the Cielo Checkout transactional screen.

This stripe indicates that your Cielo Checkout store is now operating in a test environment, that is, the entire performed transaction in this mode will be considered a test.

|Backoffice|Transactional|
|---|---|
|![Red Stripe - Backoffice]({{ site.baseurl_root }}/images/checkout/tmbackoffice.png)|![Red Stripe - Transactional]({{ site.baseurl_root }}/images/checkout/tmtransacional.png)|

#### Kinds of Notification

Cielo Checkout has two kinds of notifications that the retailer is able to use according to his/her needs:

|Kind|Description|
|---|---|
|`POST`|Notification where the retailer is passive. Two `POST HTTP` are triggered, one informing the sale data and the other transaction Status change|
|`JSON`|Notification where the retailer performs a query. A `POST` containing information to perform a (`GET`) query on the Checkout transactions||

In order to use both models, the retailer will have to access the Cielo Backoffice and configure both the `NOTIFICATION URL` and the `STATUS CHANGE URL`.

For more information about the notifications model, visit the **[Integration manual](https://developercielo.github.io/manual/checkout-cielo#notificações-de-pagamento)**

#### Main Cielo Checkout URLs

The URLs described in this area of the tab have the function of means of communication between the Checkout and the integrated retailer system. Below there's description of each of the URLs.

* **Return URL** - When finishing the transaction, the final buyer will be able to be redirected to the return URL. By clicking on the ''BACK'' button on the sales receipt screen, the buyer will be redirected to the Return URL previously registered on the Backoffice.

* **Notification URL** - When finishing a transaction, it is sent a post with all sale data to the Notification URL, previously registered on the Backoffice. The notification POST is sent only at the moment that the transaction is finished, independent if there was a transaction status change.

* **Status Change URL** - When an order has its status changed, it will be sent a post to the Status Change URL, previously registered on the Backoffice. The POST of status change does not have cart data,only the order identification data.

On the orders screen, within each transaction, there is an option to resend the status change POST. Just click the blue buttons, marked in the image below:

![Order details]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-detalhe-pedidos.png)

<aside class="notice">The ''Cielo Land Virtual Store'' Retailers have the
Notification, Status Change and Return URLs updated automatically. It is not required to these retailers to change the mentioned URLs.</aside>

For more information about the Checkout notifications, visit the **[Integration manual](https://developercielo.github.io/manual/checkout-cielo#notificações-de-pagamento)**

#### Minimum Values and Discounts

In this part of the configuration tab, it is possible to configure 4 minimum values and discounts per payment methods:

![Minimum installment value]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-configuracoes-de-valores-minimos.png)

| Kind | Description|
|-----|------|
|**Minimum installment value**| In case the value of the purchase installment is less than the minimum, Checkout will only display the installment higher than the minimum <br> **Example:** A minimum installment of R$5,00, in a R$10,00 purchase, it won't be displayed the 3x installment option, only 2x.|
|**Minimum payment value for boleto**|Minimum value for the boleto option to be displayed|
|**Discount for payment using boleto**| Sets a % value for discount in case the Boleto is the payment method selected.|
|**Discount for online debit payment**|Sets a % for discount in case Online Debit is the payment method selected|

<aside class="warning">If the buying value is inferior, in case there's no other payment method, there won't be the option to the buyer, forcing him to return to the store and and create a cart with the value above the minimum. To avoid this situation, we suggest:<br /><br><ul><li>In case your store does not have other payment methods, inform the buyer about the minimum value when using boleto.</li><li>Get other payment methods such as Credit cards (procedure performed by Cielo Checkout) or online debit.</li></ul></aside>

<aside class="warning">The minimum value for boleto does not work in case of retailer defined discounts. If the retailer sets a minimum boleto value of R$100,00 and a discount of 10%, a R$90.00 boleto will be generated (inferior to the minimum).</aside>

**About Minimum Value:**

**Example**: In case the minimum installment value is R$10,00, a purchase of R$100,00 can be split in up to 10x, even if in the store configuration the 12x installment is enabled.

<aside class="warning">The maximum number of the store installments depends on the limit set on the Affiliation. By standard, every affiliation is released with a 12 installments limit.</aside>

<aside class="warning">The minimum installment value is mandatorily R$5,00.</aside>

<aside class="warning">The credit cards authentication only occurs to Visa and Mastercard. This feature must be enabled in your affiliation.</aside>

#### Active Payment Methods

Just check the selection box of the card that you want to make available at the moment of the payment. To disable it, just uncheck the selection box.

![Configuring Payment methods]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-cards.png)

The installment is defined by card brand. The maximum number of installments available for each card is set by the retailer.

Cielo Checkout allows installment in up to 12 times without interest. The number of installments displayed on the transactional depends on the minimum installment value configured by the store.

<aside class="warning"><b>About Transactions Authentication:</b> The checkbox forces all Visa and Master cards to be directed to the banking environment for security validation. Only must be activated in case Cielo Affiliation is ready to perform the flux, otherwise the transactions will be declined.</aside>

### Anti fraud and Automatic Capture

Here it is possible to set the automation of the capture processes and orders cancelling based on the anti fraud analysis result and to set a minimum start value that a transaction must be analysed.

<aside class="notice">If the retailer does not have the anti fraud enabled in his register along with Cielo or does not send on the POST the fraud analysis solicitation, the automatic capture wont be performed in case it is configured to be performed based on the risk analysis status.
It will be up to the retailer the manual order capture.</aside>

![Anti fraud]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-anti-fraude.png)

AF analysis minimum value field:

![Minimum anti fraud value]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-anti-fraude-valor-minimo.png)

#### Anti fraud status table

|Anti fraud status|Substatus|Description|
|---|---|---|
|Low Risk|Low Risk|Low risk of being a fraudulent transaction|
|Medium Risk|Medium Risk|Medium risk of being a fraudulent transaction|
|Not finalized|Not finalized|It was not possible to finalize the query|
|N/A|Authenticated|Transactions authenticated by the bank|
|N/A|AF Not hired|Anti fraud not enabled on the retailer's plan|
|N/A|AF Dispensed|Anti fraud dispensed via contract or inferior to the minimum parameterized anti fraud value on the retailer back office|
|N/A|Not appliable|Not analyzable payment methods such as debit card, boleto and online debit.|
|N/A|Recurrence transaction|Credit transaction be posterior to the scheduling transaction|
|N/A|Transaction declined|Credit sale was declined|

You can view the anti-fraud status by going to the purchase detail in the Orders tab and clicking the (+) icon.

![Anti fraud status]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-status-antifraude.png)

### Courier Freight and Services

In this area you can configure the available freight options in your Store. On the Information section about Freight, there's an explanation more detailed about the kinds of available freights on the Cielo Checkout. There's also on the Courier freight area, a freight calculator for queries (this calculator displays the freight value of each kind of freight registered for a given weight and locality)

![Courier Freight]({{ site.baseurl_root }}/images/checkout/tutoriais-checkout/checkout-frete-correios.png)

# Tutorial - Payment Link

## About the Payment Link

**The Button, QR CODE or LINK** is a purchase method always used when there is no "shopping cart" in your store.
This kind of integration is is performed via the register of a set of items to be sold on the Cielo Checkout backoffice.

The button generates one of the 3 different kinds of access methods to the **same transactional screen**:

|Method|Name|Description|
|---|:--:|---|
|![Button]({{ site.baseurl_root }}/images/checkout/botao.png)|**Button**|It is an HTML code that when pasted on a website, will direct the buyer to the transactional screen - Ideal to **hotSites** or **E-mail Marketing** usage|
|![QRCODE]({{ site.baseurl_root }}/images/checkout/qrcode.png)|**QRCODE**|Código interpretável por Smartphones e Tablets - Ideal to **Printed Marketing** or **Digital** usage|
|`http://bit.ly/2tRkSxZ`|**LINK**|a compatible link, ideal to **Social Media** or **Mobile Messengers** usage|

This integration model is used to:

* Associate a quick purchase straight to a product with a promotion on a homepage, skipping the cart step.
* Send an e-mail marketing, or a charge via e-mail.
* Add the button (HTML) referred to the product/service to be bought/paid.
* Perform the sending of payments by mobile applications.
* Always when it is desired to provide a quick purchase.

In order to use this feature, it is required to register the product that you want to sell, its informations, and after that, simply copy the source code generated to this button.

## Button characteristics

Each button has an unique code that only allows buying that given product on the price conditions and registered freight. Therefore,a fraudster is not able to change any of these informations when submitting the purchase, because Cielo Checkout will search for every product data on the Cielo Checkout Backoffice register.

|Characteristic|Explanation|
|---|---|
|**Specific**|Each generated button works only for a given product or group of products. The quantity and volume of produts sold is set on the Button register, not being possible to change the quantity on the transactional screen <br>**Example:** It will be required to create a button to sell 1 shirt. If the buyer wants two t-shirts, he'll have use the button 2X or the retailer will have to create a button with 2 t-shirts.|
|**Checkout Order Number**|The button does not allow the Retailer order number register. As Cielo will be the one responsible to activate the own Checkout, it will be generated an order number (a `GUID`) unique. The retailer will get this order number as a link to the sale performed.|
|**Orders creation**|A button generates several independent orders, that is, to limit the number of requests generated by a button, QRCODE or created Link,  it is required to set a minimum amount of items in "stock" at the moment of registration. The Button is a method of calls to the Checkout API. Each time it is triggered, a new requisition is made to the API, thus creating a new order|

#### Payment Link Flux

![Cielo Checkout Button integration flux]({{ site.baseurl_root }}/images/checkout/intbt.png)

## Creating a Payment Link

To use this feature, it is required to register the product that you want to sell, its information, and then simply copy the source code generated to this button. The products inclusion is made within the [Cielo Checkout Backoffice](https://developercielo.github.io/tutorial/checkout-tutoriais#cadastrar-de-link-de-pagamentos), on the Products/Register Products menu.

It is possible to create 5 different kinds of Payment Links:

* **Physical Material** – Physical Products that require being sent by the retailers. Example: Clothes, Toys, etc.
* **Digital** –  Digital goods sold on the internet. Example: Software, Games, Music, etc.
* **Service** – Services to be rendered. Example: Delivery, projects and estimates.
* **Recurrence** - Transactions that repeat on a given interval of time. Example: Subscriptions, tuitions, etc.
* **Payments** - Unique payments or value transfers. Example: debt settlements, etc.

**Register Screen**

![Button Registration]({{ site.baseurl_root }}/images/checkout/btcadastro.png)

**Register Button:**

![Button Registration]({{ site.baseurl_root }}/images/checkout/btcadastro2.png)

Below the listing of items that must be registered for the button creation:

| Fields           | Description                                                                                                                                     | Minimum Size | Maximum Size | Mandatory |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------|-------------|
| `Product Kind` | Indicates if it's selling a physical material, a service or a digital good. For digital goods, the Freight kind option will no be displayed.                  | n/a          | n/a          | Yes         |
| `SKU`             | Product identification code                                                                                                             | 1            | 50           | No         |
| `Title`          | Product title                                                                                                                              | 1            | 50           | Yes         |
| `Description`       | Product Description                                                                                                                           | 1            | 255          | Yes         |
| `Price`           | Total order value **in cents** (example: R$1,00 =100).                                                                                      | 11           | 14           | Yes         |
| `Freight`           | Choose between one of the Freight options (Courier, Withdraw at the store, Free).                                   | n/a          | n/a          | Yes         |
| `Origin Zip Code`   | This field only appears to the Courier Freight kind, must be filled with the zip code where the merchandise will depart from for freight calculus purpose. | 9            | 9            | Yes         |
| `Weight (kg)`        | This field only appears to the Courier Freight kind, and it must be filled with the product weight in Kg for freight calculus purpose.                | n/a          | n/a          | Yes         |
| `Freight Cost`  | This field only appears to the Fix Freight, and should be filled with the cost that the retailer specifies for his products.            | n/a          | n/a          | Yes         |
| `Shipping method` | Esse campo só aparece para Tipo Produto igual a Material Físico e Tipo de Frete igual a Frete Fixo.                                            | n/a          | n/a          | Yes         |
| `URL`             | This field only appears to the Kind of Product like the Digital.                                                                                       | n/a          | n/a          | Yes         |
| `Amount`      | Sets the maximum amount of orders that the Button is able to generate. If not set, the button will be able to generate an infinite number of products.             | n/a          | n/a          | No         |

**Adding the button to your page, you'll have to copy the button HTML code created and include it on your website's HTML, as the example below.**

<aside class="notice">The code must be inserted within the adequate area of your HTML.</aside>

Each button has a unique code that only allows to buy that particular product in the conditions of price and registered freight. Therefore, a fraudster can not change any of this information when submitting to the purchase, because Checkout Cielo will collect all the product data in the register of the Backoffice Cielo Checkout, and will be worth the register data.
