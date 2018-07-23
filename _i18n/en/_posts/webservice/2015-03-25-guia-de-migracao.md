---
layout: tutorial
title: Tutorial - Migration Guide
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Webservice 1.5
---

# Cielo migration guide

<aside class="warning">The Webservice 1.5 was discontinued. The document below exists based on the knowledge for already integrated customers. New registers won't be performed by the Cielo attendance.</aside>

> For new integrations, check [Cielo E-commerce API](https://developercielo.github.io/manual/cielo-ecommerce)

This guide has the purpose of making the integration between the Web Service 1.5 and the API 3.0 solutions easier. Before reading this guide, it is highly recommended that you have read the integration manual from the solution in which you intend to migrate your current integration. The manuals can be found in:

* [Webservice 1.5 solution](https://developercielo.github.io/Webservice-1.5)
* [API 3.0 solution](https://developercielo.github.io/Webservice-3.0)

## Overview

In general, the first big difference between the two solutions, is on the send of commercial establishments credentials. On Webservice 1.5, the credentials are only send on the `dados-ec` node, through the `number` and `key` elements; On the API 3.0, the credentials are sent using the HTTP headers, through the `MerchantId` and `MerchantKey` fields.

A segunda grande diferença entre as duas soluções está no envio dos dados relacionados ao comprador; como na solução Webservice 1.5 esses dados não são enviados na integração, a loja poderá precisar implementar essa coleta de dados caso queira enviá-los.

The second big difference between the two solutions is on the AVS;  since the API 3.0 doesn't suuport AVS yet, there isn't on the platform, a way to send them.

### Environments from 3.0

Besides those differences, the HTTP requisitions are also made in different environments using HTTP methods specified for each requisition; they are:

**Production Rnvironemnt**

* Transaction requisition: https://api.cieloeCommerce.cielo.com.br/
* Transaction query: https://apiquery.cieloeCommerce.cielo.com.br/

**Sandbox Environment**

* Transaction requisition: https://apisandbox.cieloeCommerce.cielo.com.br
* Transaction query: https://apiquerysandbox.cieloeCommerce.cielo.com.br

### HTTP methods from 3.0

#### Sales creation

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://api.cieloeCommerce.cielo.com.br/1/sales/</span></aside>

#### Sales capture or cancellation

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">https://api.cieloeCommerce.cielo.com.br/1/sales/{PaymentId}/capture</span></aside>

#### Sales query

<aside class="request"><span class="method get">GET</span> <span class="endpoint">https://apiquery.cieloeCommerce.cielo.com.br/1/sales/{PaymentId}</span></aside>

### Comparative tables

The comparative tables sections shows, field by field, each specificity of the solutions in each case of use; the `GUIDE BY` columns are used to set the focus to one of the solutions.

#### Compare Solutions:

In case your current integration uses a Webservice 1.5 solution and you want to make a comparison with the API 3.0 or vice versa, just view the tables below:

# Integration with credit card

## Credit Requisition Table

In this section, you will be able to analyse, field by field, each specificity of the solutions on the scenario of a requisition of a credit sale.

| solution 3.0                           | solution 1.5                     | Notes                                                                                                             |
|---------------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| "--Header.MerchantId"                 | dados-ec.numero                 | The 1.5 gets CE on the request field and the 3.0 gets the Merchant Id on the header. These fields don't have the same value.       |
| "--Header.MerchantKey"                | dados-ec.chave                  | The 1.5 gets the Key on the request body and the 3.0 gets the MerchantKey on the header. These fields don't have the same value. |
| "--Header.RequestId"                  | --                              | The 1.5 gets the Key on the request body and the 3.0 gets the MerchantKey on the header. These fields don't have the same value.                                                                  |
| MerchantOrderId                       | dados-pedido.numero             |                                                                                                                         |
| Customer.Name                         | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Email                        | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Birthdate                    | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.Street               | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.Number               | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.Complement           | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.ZipCode              | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.City                 | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.State                | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.Address.Country              | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.Street       | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.Number       | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.Complement   | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.ZipCode      | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.City         | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.State        | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Customer.DeliveryAddress.Country      | --                              | The 1.5 doesn't get data related to the buyer                                                                        |
| Payment.Type                          | forma-pagamento.produto         | On the 3.0, the payment way (Credit and Debit) and the type of interest that are set in different fields.                      |
| Payment.Amount                        | dados-pedido.valor              |                                                                                                                         |
| Payment.Currency                      | dados-pedido.moeda              |                                                                                                                         |
| Payment.Country                       | --                              |                                                                                                                         |
| Payment.Provider                      | --                              | The 1.5 doesn't provide other payment ways that aren't on Cielo. The 3.0 does, besides Cielo, Bradesco and BB  |
| Payment.SeviceTaxAmount               | dados-pedido.taxa-embarque      |                                                                                                                         |
| Payment.Installments                  | forma-pagamento.parcelas        |                                                                                                                         |
| Payment.Interest                      | forma-pagamento.produto         | On the 3.0, the payment way (Credit and Debit) and the type of interest are set in different fields.                      |
| Payment.Capture                       | capturar                        |                                                                                                                         |
| Payment.SoftDescriptor                | dados-pedido.soft-descriptor    |                                                                                                                         |
| Payment.ReturnUrl                     | url-retorno                     |                                                                                                                         |
| Payment.ExtraData[]                   | campo-livre                     | On 1.5 is a string, and on the 3.0 is a key/value collection                                                            |
| Payment.Authenticate                  | autorizar                       |                                                                                                                         |
| Payment.CreditCard.CardNumber         | dados-portador.numero           |                                                                                                                         |
| Payment.CreditCard.Holder             | --                              |                                                                                                                         |
| Payment.CreditCard.ExpirationDate     | dados-portador.validade         |                                                                                                                         |
| Payment.CreditCard.SecurityCode       | dados-portador.codigo-seguranca |                                                                                                                         |
| Payment.CreditCard.CardToken          | dados-portador.token            |                                                                                                                         |
| Payment.CreditCard.SaveCard           | gerar-token                     |                                                                                                                         |
| Payment.CreditCard.Brand              | forma-pagamento.bandeira        |                                                                                                                         |
| Payment.RecurrentPayment.EndDate      | --                              | The 1.5 uses a different way of recurrence                                                                            |
| Payment.RecurrentPayment.Interval     | --                              |                                                                                                                         |
| Payment.RecurrentPayment.AuthorizeNow | --                              |                                                                                                                         |
| --                                    | dados-portador.indicador        | On 3.0 there isn't a field to inform the CVV send.                                                                   |
| --                                    | dados-pedido.data-hora          |                                                                                                                         |
| --                                    | dados-pedido.descricao          |                                                                                                                         |
| --                                    | dados-pedido.idioma             |                                                                                                                         |
| --                                    | bin                             |                                                                                                                         |
| --                                    | avs.dados-avs.endereco          | The 3.0 doesn't support AVS yet                                                                                             |
| --                                    | avs.dados-avs.complemento       | The 3.0 doesn't support AVS yet                                                                                             |
| --                                    | avs.dados-avs.numero            | The 3.0 doesn't support AVS yet                                                                                             |
| --                                    | avs.dados-avs.bairro            | The 3.0 doesn't support AVS yet                                                                                             |
| --                                    | avs.dados-avs.cep               | The 3.0 doesn't support AVS yet                                                                                             |

## Table of the Credit Answer

In this section, you'll be able to analyse, field by field, each specificity of the solutions on the answer scenario of a credit sale requisition.

| solution 3.0                           | solution 1.5                | Note                                            |
|---------------------------------------|----------------------------|--------------------------------------------------------|
| --Header.MerchantId                   | --                         | The 1.5 doesn't return the request data on the response      |
| --Header.MerchantKey                  | --                         | The 1.5 doesn't return the request data on the response      |
| --Header.RequestId                    | --                         |                                                        |
| MerchantOrderId                       | dados-pedido.numero        |                                                        |
| Customer.Name                         | --                         |                                                        |
| Customer.Email                        | --                         |                                                        |
| Customer.Birthdate                    | --                         |                                                        |
| Customer.Address.Street               | --                         |                                                        |
| Customer.Address.Number               | --                         |                                                        |
| Customer.Address.Complement           | --                         |                                                        |
| Customer.Address.ZipCode              | --                         |                                                        |
| Customer.Address.City                 | --                         |                                                        |
| Customer.Address.State                | --                         |                                                        |
| Customer.Address.Country              | --                         |                                                        |
| Customer.DeliveryAddress.Street       | --                         |                                                        |
| Customer.DeliveryAddress.Number       | --                         |                                                        |
| Customer.DeliveryAddress.Complement   | --                         |                                                        |
| Customer.DeliveryAddress.ZipCode      | --                         |                                                        |
| Customer.DeliveryAddress.City         | --                         |                                                        |
| Customer.DeliveryAddress.State        | --                         |                                                        |
| Customer.DeliveryAddress.Country      | --                         |                                                        |
| Payment.Type                          | forma-pagamento.produto    |                                                        |
| Payment.Amount                        | dados-pedido.valor         |                                                        |
| Payment.Amount                        | autenticacao.valor         |                                                        |
| Payment.Amount                        | autorizacao.valor          |                                                        |
| Payment.CapturedAmount                | captura.valor              |                                                        |
| Payment.Currency                      | dados-pedido.moeda         |                                                        |
| Payment.Country                       | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.Provider                      | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.SeviceTaxAmount               | dados-pedido.taxa-embarque |                                                        |
| Payment.Installments                  | forma-pagamento.parcelas   |                                                        |
| Payment.Interest                      | forma-pagamento.produto    |                                                        |
| Payment.Capture                       | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.SoftDescriptor                | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.ReturnUrl                     | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.ExtraData[]                   | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.Authenticate                  | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.Tid                           | tid                        |                                                        |
| Payment.ProofOfSale                   | autorizacao.nsu            |                                                        |
| Payment.AuthorizationCode             | autorizacao.arp            |                                                        |
| Payment.Status                        | status                     | The values returned by the applications are different  |
| Payment.ReturnCode                    | autenticacao.codigo        | On 3.0 there's only one field for the return codeo   |
| Payment.ReturnCode                    | autorizacao.lr             | On 3.0 there's only one field for the return code   |
| Payment.ReturnCode                    | captura.codigo             | On 3.0 there's only one field for the return code   |
| Payment.ReturnMessage                 | autenticacao.mensagem      | On 3.0 there's only one field for the return code |
| Payment.ReturnMessage                 | autorizacao.mensagem       | On 3.0 there's only one field for the return code |
| Payment.ReturnMessage                 | captura.mensagem           | On 3.0 there's only one field for the return code |
| Payment.ReceivedDate                  | dados-pedido.data-hora     |                                                        |
| Payment.CapturedDate                  | captura.data-hora          |                                                        |
| Payment.Eci                           | autenticacao.eci           |                                                        |
| Payment.CreditCard.CardNumber         | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.CreditCard.Holder             | --                         |                                                        |
| Payment.CreditCard.ExpirationDate     | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.CreditCard.SecurityCode       | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.CreditCard.CardToken          | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.CreditCard.SaveCard           | --                         | The 1.5 doesn't return the request data on the response      |
| Payment.CreditCard.Brand              | forma-pagamento.bandeira   |                                                        |
| Payment.RecurrentPayment.EndDate      | --                         | The recurrence works differently on the APIs     |
| Payment.RecurrentPayment.Interval     | --                         | The recurrence works differently on the APIs     |
| Payment.RecurrentPayment.AuthorizeNow | --                         | The recurrence works differently on the APIs     |
| Payment.Links[].Method                | --                         | The 1.5 doesn't support HATEOAS                              |
| Payment.Links[].Rel                   | --                         | The 1.5 doesn't support HATEOAS                              |
| Payment.Links[].Href                  | --                         | The 1.5 doesn't support HATEOAS                              |
| --                                    | pan                        |                                                        |
| --                                    | dados-pedido.descricao     |                                                        |
| --                                    | dados-pedido.idioma        |                                                        |
| --                                    | autenticacao.data-hora     |                                                        |
| --                                    | autorizacao.data-hora      |                                                        |
| --                                    | autorizacao.codigo         |                                                        |

# Integration with debit card

## Table of Debit Requisition

In this section, you'll be able to analyse, field by field, each specificity from the solutions on the answer scenario of a debit sale requisition.

|Guide by|solution 3.0|   |Guide by|solution 1.5|Notes|
|-------|-------------------|---|-------|----------------|-----------|
|  1|--Header.MerchantId|   |  1|dados-ec.numero|The 1.5 gets CE on the request body and the 3.0 gets the MerchantId on the header. These fields don't have the same value|
|  2|--Header.MerchantKey|   |  2|dados-ec.chave|The 1.5 gets the Key on the request body and the 3.0 gets the MerchantId on the header. These fields don't have the same value|
|  3|--Header.RequestId|   | 30| --|On the 1.5, there's no field with the Request identifier|
|  4|MerchantOrderId|   | 11|dados-pedido.numero|
|  5|Customer.Name|   | 31| --|The 1.5 doesn't get data related to the buyer|
|  6|Customer.Email|   | 32| --|The 1.5 doesn't get data related to the buyer|
|  7|Customer.Birthdate|   | 33| --|The 1.5 doesn't get data related to the buyer|
|  8|Customer.Address.Street|   | 34| --|The 1.5 doesn't get data related to the buyer|
|  9|Customer.Address.Number|   | 35| --|The 1.5 doesn't get data related to the buyer|
| 10|Customer.Address.Complement|   | 36| --|The 1.5 doesn't get data related to the buyer|
| 11|Customer.Address.ZipCode|   | 37| --|The 1.5 doesn't get data related to the buyer|
| 12|Customer.Address.City|   | 38| --|The 1.5 doesn't get data related to the buyer|
| 13|Customer.Address.State|   | 39| --|The 1.5 doesn't get data related to the buyer|
| 14|Customer.Address.Country|   | 40| --|The 1.5 doesn't get data related to the buyer|
| 15|Customer.DeliveryAddress.Street|   | 41| --|The 1.5 doesn't get data related to the buyer|
| 16|Customer.DeliveryAddress.Number|   | 42| --|The 1.5 doesn't get data related to the buyer|
| 17|Customer.DeliveryAddress.Complement|   | 43| --|The 1.5 doesn't get data related to the buyer|
| 18|Customer.DeliveryAddress.ZipCode|   | 44| --|The 1.5 doesn't get data related to the buyer|
| 19|Customer.DeliveryAddress.City|   | 45| --|The 1.5 doesn't get data related to the buyer|
| 20|Customer.DeliveryAddress.State|   | 46| --|The 1.5 doesn't get data related to the buyer|
| 21|Customer.DeliveryAddress.Country|   | 47| --|The 1.5 doesn't get data related to the buyer|
| 22|Payment.Type|   |  9|forma-pagamento.produto|On 3.0, the payment way (Credit or Debit) and the interest type are set in different fields|
| 23|Payment.Amount|   | 12|dados-pedido.valor|
| 24|Payment.Currency|   | 13|dados-pedido.moeda|
| 25|Payment.Country|   | 48| --|
| 26|Payment.Provider|   | 49| --|The 1.5 doesn't provide other payment ways that aren't on Cielo. The 3.0 does, besides Cielo, Bradesco and BB|
| 27|Payment.SoftDescriptor|   | 18|dados-pedido.soft-descriptor|
| 28|Payment.ReturnUrl|   | 19|url-retorno|
| 29|Payment.ExtraData[]|   | 21|campo-livre|
| 30|Payment.DebitCard.CardNumber|   |  3|dados-portador.numero|On 3.0, the payment way (Credit or Debit) and the interest type are set in different fields|
| 31|Payment.DebitCard.Holder|   | 50| --|
| 32|Payment.DebitCard.ExpirationDate|   |  4|dados-portador.validade|On 3.0 there's no field to inform the CVV send.|
| 33|Payment.DebitCard.SecurityCode|   |  6|dados-portador.codigo-seguranca|
| 34|Payment.DebitCard.CardToken|   |  7|dados-portador.token|On 1.5 is a string, and on the 3.0 is a key/value collection|
| 35|Payment.DebitCard.SaveCard|   | 24|gerar-token|
| 36|Payment.DebitCard.Brand|   |  8|forma-pagamento.bandeira|
| 37| --|   | 17|dados-pedido.taxa-embarque|
| 38| --|   | 10|forma-pagamento.parcelas|
| 39| --|   |  9|forma-pagamento.produto|
| 40| --|   | 20|capturar|
| 41| --|   | 23|autorizar|
| 42| --|   |  5|dados-portador.indicador|
| 43| --|   | 14|dados-pedido.data-hora|
| 44| --|   | 15|dados-pedido.descricao|
| 45| --|   | 16|dados-pedido.idioma|
| 46| --|   | 22|bin|
| 47| --|   | 25|avs.dados-avs.endereco|The 3.0 doesn't support AVS yet|
| 48| --|   | 26|avs.dados-avs.complemento|The 3.0 doesn't support AVS yet|
| 49| --|   | 27|avs.dados-avs.numero|The 3.0 doesn't support AVS yet|
| 50| --|   | 28|avs.dados-avs.bairro|The 3.0 doesn't support AVS yet|
| 51| --|   | 29|avs.dados-avs.cep|The 3.0 doesn't support AVS yet|

## Table of Debit answer

In this section, you'll be able to analyse, field by field, each specificity from the solutions on the answer scenario of a debit sale requisition.

|Guide by|solution 3.0|   |Guide by|solution 1.5|Notes|
|-------|-------------------|---|-------|----------------|-----------|
|  1|--Header.MerchantId|   | 30| --|The 1.5 doesn't return the request data on the response|
|  2|--Header.MerchantKey|   | 31| --|The 1.5 doesn't return the request data on the response|
|  3|--Header.RequestId|   | 32| --|
|  4|MerchantOrderId|   |  3|dados-pedido.numero|
|  5|Customer.Name|   | 33| --|
|  6|Customer.Email|   | 34| --|
|  7|Customer.Birthdate|   | 35| --|
|  8|Customer.Address.Street|   | 36| --|
|  9|Customer.Address.Number|   | 37| --|
| 10|Customer.Address.Complement|   | 38| --|
| 11|Customer.Address.ZipCode|   | 39| --|
| 12|Customer.Address.City|   | 40| --|
| 13|Customer.Address.State|   | 41| --|
| 14|Customer.Address.Country|   | 42| --|
| 15|Customer.DeliveryAddress.Street|   | 43| --|
| 16|Customer.DeliveryAddress.Number|   | 44| --|
| 17|Customer.DeliveryAddress.Complement|   | 45| --|
| 18|Customer.DeliveryAddress.ZipCode|   | 46| --|
| 19|Customer.DeliveryAddress.City|   | 47| --|
| 20|Customer.DeliveryAddress.State|   | 48| --|
| 21|Customer.DeliveryAddress.Country|   | 49| --|
| 22|Payment.Type|   | 11|forma-pagamento.produto|
| 23|Payment.Amount|   |  4|dados-pedido.valor|
| 23|Payment.Amount|   | 17|autenticacao.valor|
| 23|Payment.Amount|   | 22|autorizacao.valor|
| 24|CapturedAmount|   | 29|captura.valor|
| 25|Payment.Currency|   |  5|dados-pedido.moeda|
| 26|Payment.Country|   | 50| --|The 1.5 doesn't return the request data on the response|
| 27|Payment.Provider|   | 51| --|The 1.5 doesn't return the request data on the response|
| 28|Payment.SoftDescriptor|   | 53| --|The 1.5 doesn't return the request data on the response|
| 29|Payment.ReturnUrl|   | 54| --|The 1.5 doesn't return the request data on the response|
| 30|Payment.ExtraData[]|   | 55| --|The 1.5 doesn't return the request data on the response|
| 31|Payment.Tid|   |  1|tid|
| 32|Payment.ProofOfSale|   | 25|autorizacao.nsu|
| 33|Payment.AuthorizationCode|   | 19|autorizacao.arp|
| 34|Payment.Status|   | 13|status|The values returned by the applications are different|
| 35|Payment.ReturnCode|   | 14|autenticacao.codigo|On 3.0 there's just one field to the return code|
| 35|Payment.ReturnCode|   | 23|autorizacao.lr|On 3.0 there's just one field to the return code|
| 35|Payment.ReturnCode|   | 26|captura.codigo|On 3.0 there's just one field to the return code|
| 36|Payment.ReturnMessage|   | 15|autenticacao.mensagem|On 3.0 there's just one field to the return message|
| 36|Payment.ReturnMessage|   | 20|autorizacao.mensagem|On 3.0 there's just one field to the return message|
| 36|Payment.ReturnMessage|   | 27|captura.mensagem|On 3.0 there's just one field to the return message|
| 37|Payment.ReceivedDate|   |  6|dados-pedido.data-hora|
| 38|CapturedDate|   | 28|captura.data-hora|
| 39|Payment.Eci|   | 18|autenticacao.eci|
| 40|Payment.DebitCard.CardNumber|   | 57| --|The 1.5 doesn't return the request data on the response|
| 41|Payment.DebitCard.Holder|   | 58| --|
| 42|Payment.DebitCard.ExpirationDate|   | 59| --|The 1.5 doesn't return the request data on the response|
| 43|Payment.DebitCard.SecurityCode|   | 60| --|The 1.5 doesn't return the request data on the response|
| 44|Payment.DebitCard.CardToken|   | 61| --|The 1.5 doesn't return the request data on the response|
| 45|Payment.DebitCard.SaveCard|   | 62| --|The 1.5 doesn't return the request data on the response|
| 46|Payment.DebitCard.Brand|   | 10|forma-pagamento.bandeira|
| 47|Payment.Links[].Method|   | 66| --|The 1.5 doesn't support HATEOAS|
| 48|Payment.Links[].Rel|   | 67| --|The 1.5 doesn't support HATEOAS|
| 49|Payment.Links[].Href|   | 68| --|The 1.5 doesn't support HATEOAS|
| 50| --|   |  2|pan|
| 51| --|   |  7|dados-pedido.descricao|
| 52| --|   |  8|dados-pedido.idioma|
| 53| --|   | 16|autenticacao.data-hora|
| 54| --|   | 21|autorizacao.data-hora|
| 55| --|   | 24|autorizacao.codigo|
| 56| --|   | 12|forma-pagamento.parcelas|
| 57| --|   | 11|forma-pagamento.produto|
| 58| --|   |  9|dados-pedido.taxa-embarque|

## Glossary

To make the understanding easier, we've listed below a little glossary with the main terms related to e-Commerce, cards market and acquiring:

* **Authentication**: process to ensure that the buyer really is the one he claims to be (legit holder), generally occurs on the issuing bank with the use of a digital token or card with security keys.
* **Authorization**: process to verify if a purchase may or not be performed with a card. At this moment, several verifications are made with the card and the holder (example: compliance, blockings, etc.) Also on this moment that the card limit is sensitized with the transaction amount.
* **Cancellation**: process to cancel a purchase performed with card.
* **Capture**: process that confirms an authorization that was previously performed . Only after the capture, is that the card holder will be able to view it in his statement or invoice.
* **Access Key**: is a security code specific from each store, generated by Cielo, used to perform the authentication and communication in all messages exchanged with Cielo. Also known as production key and key data.
* **Buyer**: The one that effects the buying on the virtual store.
* **Issuer (issuing bank)**: Is the financial institution that emits the credit card, debit or voucher.
* **Commercial Establishment or CE**: Entity that responds for the virtual store.
* **Gateway of payments**: Company responsible for the technical integration and transactions processing.
* **Accreditation Number**: it's an identifier number that the retailer gets after his accreditation along with Cielo.
* **Holder**: It's the card holder at the moment of the sale.
* **SecureCode**: international program from MasterCard to make possible the authentication of the buyer at the moment of a purchase in e-Commerce environment.
* **TID (Transaction Identifier)**: code composed by 20 characters that identifies uniquely a Cielo e-Commerce transaction.
* **Transaction**: is the purchase request by the holder of the card on Cielo.
* **VBV (Verified by Visa)**: International Visa program that allows the authentication of the buyer at the moment of a purchase in e-Commerce environment.
