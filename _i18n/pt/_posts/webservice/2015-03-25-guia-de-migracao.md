---
layout: tutorial
title: Tutorial - Guia de Migração
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Webservice 1.5
---

# Guia de migração Cielo

<aside class="warning">O Webservice 1.5 foi descontinuado. O documento abaixo existe como base de conhecimento para clientes ja integrados. Novos cadastros não serão realizados pelo atendimento Cielo</aside>

> Para novas integrações, veja [API Cielo E-commerce](https://developercielo.github.io/manual/cielo-ecommerce)

Esse guia tem como propósito facilitar a migração da integração entre as soluções Webservice 1.5 e API 3.0. Antes de ler esse guia, é altamente recomentado que você tenha lido o manual de integração da solução para qual pretende migrar sua integração atual. Os manuais podem ser encontrados em:

* [Solução Webservice 1.5](https://developercielo.github.io/Webservice-1.5)
* [Solução API 3.0](https://developercielo.github.io/Webservice-3.0)

## Visão Geral

De forma geral, a primeira grande diferença entre as duas soluções está no envio das credenciais do estabelecimento comercial. No Webservice 1.5, as credenciais eram enviadas no nó `dados-ec`, através dos elementos `numero` e `chave`; na API 3.0, as credenciais são enviadas utilizando cabeçalhos HTTP, através dos campos de cabeçalho `MerchantId` e `MerchantKey`.

A segunda grande diferença entre as duas soluções está no envio dos dados relacionados ao comprador; como na solução Webservice 1.5 esses dados não são enviados na integração, a loja poderá precisar implementar essa coleta de dados caso queira enviá-los.

A terceira grande diferença entre as duas soluções está no AVS; como a API 3.0 ainda não suporta AVS, não há, na API, uma forma para enviá-los.

### Ambientes da 3.0

Além dessas diferenças, as requisições HTTP também são feitas em ambientes diferentes utilizado métodos HTTP específicos para cada tipo de requisição; são eles:

**Ambiente Produção**

* Requisição de transação: https://api.cieloeCommerce.cielo.com.br/
* Consulta transação: https://apiquery.cieloeCommerce.cielo.com.br/

**Ambiente Sandbox**

* Requisição de transação: https://apisandbox.cieloeCommerce.cielo.com.br
* Consulta transação: https://apiquerysandbox.cieloeCommerce.cielo.com.br

### Métodos HTTP da 3.0

#### Criação de vendas

<aside class="request"><span class="method post">POST</span> <span class="endpoint">https://api.cieloeCommerce.cielo.com.br/1/sales/</span></aside>

#### Captura ou cancelamento de vendas

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">https://api.cieloeCommerce.cielo.com.br/1/sales/{PaymentId}/capture</span></aside>

#### Consulta de vendas

<aside class="request"><span class="method get">GET</span> <span class="endpoint">https://apiquery.cieloeCommerce.cielo.com.br/1/sales/{PaymentId}</span></aside>

### Tabelas comparativas

A seção das tabelas comparativas mostra, campo a campo, cada especificidade das soluções em cada caso de uso; as colunas `GUIAR POR` são utilizadas para colocar o foco em uma das soluções.

#### Comparar Soluções:

Caso sua integração atual utilize a solução Webservice 1.5 e você queira fazer a comparação com a API 3.0 ou vice versa, basta visulizar as tabelas abaixo

# Integração com cartão de crédito

## Tabela da Requisição de Crédito

Nessa seção você poderá analisar, campo a campo, cada especificidade das soluções no cenário de uma requisição de venda por crédito.

| solução 3.0                           | solução 1.5                     | Observações                                                                                                             |
|---------------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| "--Header.MerchantId"                 | dados-ec.numero                 | O 1.5 recebe EC no corpo do request e o 3.0 recebe o MerchantId no header. Estes campos não possuem o mesmo valor       |
| "--Header.MerchantKey"                | dados-ec.chave                  | O 1.5 recebe a Chave no corpo do request e o 3.0 recebe o MerchantKey no header. Estes campos não possuem o mesmo valor |
| "--Header.RequestId"                  | --                              | No 1.5 não existe campo com o identificador do Request                                                                  |
| MerchantOrderId                       | dados-pedido.numero             |                                                                                                                         |
| Customer.Name                         | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Email                        | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Birthdate                    | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.Street               | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.Number               | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.Complement           | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.ZipCode              | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.City                 | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.State                | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.Address.Country              | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.Street       | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.Number       | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.Complement   | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.ZipCode      | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.City         | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.State        | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Customer.DeliveryAddress.Country      | --                              | O 1.5 não recebe dados relacionados ao comprador                                                                        |
| Payment.Type                          | forma-pagamento.produto         | No 3.0 a forma de pagamento (Crédito e Débito) e o tipo de juros são definidos em campos distintos                      |
| Payment.Amount                        | dados-pedido.valor              |                                                                                                                         |
| Payment.Currency                      | dados-pedido.moeda              |                                                                                                                         |
| Payment.Country                       | --                              |                                                                                                                         |
| Payment.Provider                      | --                              | O 1.5 não dispobiliza outras formas de pagamento que não seja Cielo. O 3.0 dispobibiliza, além da Cielo, Bradesco e BB  |
| Payment.SeviceTaxAmount               | dados-pedido.taxa-embarque      |                                                                                                                         |
| Payment.Installments                  | forma-pagamento.parcelas        |                                                                                                                         |
| Payment.Interest                      | forma-pagamento.produto         | No 3.0 a forma de pagamento (Crédito e Débito) e o tipo de juros são definidos em campos distintos                      |
| Payment.Capture                       | capturar                        |                                                                                                                         |
| Payment.SoftDescriptor                | dados-pedido.soft-descriptor    |                                                                                                                         |
| Payment.ReturnUrl                     | url-retorno                     |                                                                                                                         |
| Payment.ExtraData[]                   | campo-livre                     | No 1.5 é uma string e no 3.0 é uma coleção chave/valor                                                                  |
| Payment.Authenticate                  | autorizar                       |                                                                                                                         |
| Payment.CreditCard.CardNumber         | dados-portador.numero           |                                                                                                                         |
| Payment.CreditCard.Holder             | --                              |                                                                                                                         |
| Payment.CreditCard.ExpirationDate     | dados-portador.validade         |                                                                                                                         |
| Payment.CreditCard.SecurityCode       | dados-portador.codigo-seguranca |                                                                                                                         |
| Payment.CreditCard.CardToken          | dados-portador.token            |                                                                                                                         |
| Payment.CreditCard.SaveCard           | gerar-token                     |                                                                                                                         |
| Payment.CreditCard.Brand              | forma-pagamento.bandeira        |                                                                                                                         |
| Payment.RecurrentPayment.EndDate      | --                              | O 1.5 utiliza uma outra forma de recorrência                                                                            |
| Payment.RecurrentPayment.Interval     | --                              |                                                                                                                         |
| Payment.RecurrentPayment.AuthorizeNow | --                              |                                                                                                                         |
| --                                    | dados-portador.indicador        | No 3.0 não existe campo para informar o envio do CVV.                                                                   |
| --                                    | dados-pedido.data-hora          |                                                                                                                         |
| --                                    | dados-pedido.descricao          |                                                                                                                         |
| --                                    | dados-pedido.idioma             |                                                                                                                         |
| --                                    | bin                             |                                                                                                                         |
| --                                    | avs.dados-avs.endereco          | O 3.0 ainda não suporta AVS                                                                                             |
| --                                    | avs.dados-avs.complemento       | O 3.0 ainda não suporta AVS                                                                                             |
| --                                    | avs.dados-avs.numero            | O 3.0 ainda não suporta AVS                                                                                             |
| --                                    | avs.dados-avs.bairro            | O 3.0 ainda não suporta AVS                                                                                             |
| --                                    | avs.dados-avs.cep               | O 3.0 ainda não suporta AVS                                                                                             |

## Tabela da Resposta de Crédito

Nessa seção você poderá analisar, campo a campo, cada especificidade das soluções no cenário da resposta de uma requisição de venda por crédito.

| solução 3.0                           | solução 1.5                | Observações                                            |
|---------------------------------------|----------------------------|--------------------------------------------------------|
| --Header.MerchantId                   | --                         | O 1.5 não retorna os dados de request no response      |
| --Header.MerchantKey                  | --                         | O 1.5 não retorna os dados de request no response      |
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
| Payment.Country                       | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.Provider                      | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.SeviceTaxAmount               | dados-pedido.taxa-embarque |                                                        |
| Payment.Installments                  | forma-pagamento.parcelas   |                                                        |
| Payment.Interest                      | forma-pagamento.produto    |                                                        |
| Payment.Capture                       | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.SoftDescriptor                | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.ReturnUrl                     | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.ExtraData[]                   | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.Authenticate                  | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.Tid                           | tid                        |                                                        |
| Payment.ProofOfSale                   | autorizacao.nsu            |                                                        |
| Payment.AuthorizationCode             | autorizacao.arp            |                                                        |
| Payment.Status                        | status                     | Os valores retornados pelas aplicações são diferentes  |
| Payment.ReturnCode                    | autenticacao.codigo        | No 3.0 existe apenas um campo para código de retorno   |
| Payment.ReturnCode                    | autorizacao.lr             | No 3.0 existe apenas um campo para código de retorno   |
| Payment.ReturnCode                    | captura.codigo             | No 3.0 existe apenas um campo para código de retorno   |
| Payment.ReturnMessage                 | autenticacao.mensagem      | No 3.0 existe apenas um campo para mensagem de retorno |
| Payment.ReturnMessage                 | autorizacao.mensagem       | No 3.0 existe apenas um campo para mensagem de retorno |
| Payment.ReturnMessage                 | captura.mensagem           | No 3.0 existe apenas um campo para mensagem de retorno |
| Payment.ReceivedDate                  | dados-pedido.data-hora     |                                                        |
| Payment.CapturedDate                  | captura.data-hora          |                                                        |
| Payment.Eci                           | autenticacao.eci           |                                                        |
| Payment.CreditCard.CardNumber         | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.CreditCard.Holder             | --                         |                                                        |
| Payment.CreditCard.ExpirationDate     | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.CreditCard.SecurityCode       | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.CreditCard.CardToken          | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.CreditCard.SaveCard           | --                         | O 1.5 não retorna os dados de request no response      |
| Payment.CreditCard.Brand              | forma-pagamento.bandeira   |                                                        |
| Payment.RecurrentPayment.EndDate      | --                         | A recorrência funciona de forma diferente nas APIs     |
| Payment.RecurrentPayment.Interval     | --                         | A recorrência funciona de forma diferente nas APIs     |
| Payment.RecurrentPayment.AuthorizeNow | --                         | A recorrência funciona de forma diferente nas APIs     |
| Payment.Links[].Method                | --                         | O 1.5 não suporta HATEOAS                              |
| Payment.Links[].Rel                   | --                         | O 1.5 não suporta HATEOAS                              |
| Payment.Links[].Href                  | --                         | O 1.5 não suporta HATEOAS                              |
| --                                    | pan                        |                                                        |
| --                                    | dados-pedido.descricao     |                                                        |
| --                                    | dados-pedido.idioma        |                                                        |
| --                                    | autenticacao.data-hora     |                                                        |
| --                                    | autorizacao.data-hora      |                                                        |
| --                                    | autorizacao.codigo         |                                                        |

# Integração com cartão de débito

## Tabela da Requisição de Débito

Nessa seção você poderá analisar, campo a campo, cada especificidade das soluções no cenário de uma requisição de venda por débito.

|Guiar por|solução 3.0|   |Guiar por|solução 1.5|Observações|
|-------|-------------------|---|-------|----------------|-----------|
|  1|--Header.MerchantId|   |  1|dados-ec.numero|O 1.5 recebe EC no corpo do request e o 3.0 recebe o MerchantId no header. Estes campos não possuem o mesmo valor|
|  2|--Header.MerchantKey|   |  2|dados-ec.chave|O 1.5 recebe a Chave no corpo do request e o 3.0 recebe o MerchantKey no header. Estes campos não possuem o mesmo valor|
|  3|--Header.RequestId|   | 30| --|No 1.5 não existe campo com o identificador do Request|
|  4|MerchantOrderId|   | 11|dados-pedido.numero|
|  5|Customer.Name|   | 31| --|O 1.5 não recebe dados relacionados ao comprador|
|  6|Customer.Email|   | 32| --|O 1.5 não recebe dados relacionados ao comprador|
|  7|Customer.Birthdate|   | 33| --|O 1.5 não recebe dados relacionados ao comprador|
|  8|Customer.Address.Street|   | 34| --|O 1.5 não recebe dados relacionados ao comprador|
|  9|Customer.Address.Number|   | 35| --|O 1.5 não recebe dados relacionados ao comprador|
| 10|Customer.Address.Complement|   | 36| --|O 1.5 não recebe dados relacionados ao comprador|
| 11|Customer.Address.ZipCode|   | 37| --|O 1.5 não recebe dados relacionados ao comprador|
| 12|Customer.Address.City|   | 38| --|O 1.5 não recebe dados relacionados ao comprador|
| 13|Customer.Address.State|   | 39| --|O 1.5 não recebe dados relacionados ao comprador|
| 14|Customer.Address.Country|   | 40| --|O 1.5 não recebe dados relacionados ao comprador|
| 15|Customer.DeliveryAddress.Street|   | 41| --|O 1.5 não recebe dados relacionados ao comprador|
| 16|Customer.DeliveryAddress.Number|   | 42| --|O 1.5 não recebe dados relacionados ao comprador|
| 17|Customer.DeliveryAddress.Complement|   | 43| --|O 1.5 não recebe dados relacionados ao comprador|
| 18|Customer.DeliveryAddress.ZipCode|   | 44| --|O 1.5 não recebe dados relacionados ao comprador|
| 19|Customer.DeliveryAddress.City|   | 45| --|O 1.5 não recebe dados relacionados ao comprador|
| 20|Customer.DeliveryAddress.State|   | 46| --|O 1.5 não recebe dados relacionados ao comprador|
| 21|Customer.DeliveryAddress.Country|   | 47| --|O 1.5 não recebe dados relacionados ao comprador|
| 22|Payment.Type|   |  9|forma-pagamento.produto|No 3.0 a forma de pagamento (Crédito e Débito) e o tipo de juros são definidos em campos distintos|
| 23|Payment.Amount|   | 12|dados-pedido.valor|
| 24|Payment.Currency|   | 13|dados-pedido.moeda|
| 25|Payment.Country|   | 48| --|
| 26|Payment.Provider|   | 49| --|O 1.5 não dispobiliza outras formas de pagamento que não seja Cielo. O 3.0 dispobibiliza, além da Cielo, Bradesco e BB|
| 27|Payment.SoftDescriptor|   | 18|dados-pedido.soft-descriptor|
| 28|Payment.ReturnUrl|   | 19|url-retorno|
| 29|Payment.ExtraData[]|   | 21|campo-livre|
| 30|Payment.DebitCard.CardNumber|   |  3|dados-portador.numero|No 3.0 a forma de pagamento (Crédito e Débito) e o tipo de juros são definidos em campos distintos|
| 31|Payment.DebitCard.Holder|   | 50| --|
| 32|Payment.DebitCard.ExpirationDate|   |  4|dados-portador.validade|No 3.0 não existe campo para informar o envio do CVV.|
| 33|Payment.DebitCard.SecurityCode|   |  6|dados-portador.codigo-seguranca|
| 34|Payment.DebitCard.CardToken|   |  7|dados-portador.token|No 1.5 é uma string e no 3.0 é uma coleção chave/valor|
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
| 47| --|   | 25|avs.dados-avs.endereco|O 3.0 ainda não suporta AVS|
| 48| --|   | 26|avs.dados-avs.complemento|O 3.0 ainda não suporta AVS|
| 49| --|   | 27|avs.dados-avs.numero|O 3.0 ainda não suporta AVS|
| 50| --|   | 28|avs.dados-avs.bairro|O 3.0 ainda não suporta AVS|
| 51| --|   | 29|avs.dados-avs.cep|O 3.0 ainda não suporta AVS|

## Tabela da Resposta de Débito

Nessa seção você poderá analisar, campo a campo, cada especificidade das soluções no cenário da resposta de uma requisição de venda por débito.

|Guiar por|solução 3.0|   |Guiar por|solução 1.5|Observações|
|-------|-------------------|---|-------|----------------|-----------|
|  1|--Header.MerchantId|   | 30| --|O 1.5 não retorna os dados de request no response|
|  2|--Header.MerchantKey|   | 31| --|O 1.5 não retorna os dados de request no response|
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
| 26|Payment.Country|   | 50| --|O 1.5 não retorna os dados de request no response|
| 27|Payment.Provider|   | 51| --|O 1.5 não retorna os dados de request no response|
| 28|Payment.SoftDescriptor|   | 53| --|O 1.5 não retorna os dados de request no response|
| 29|Payment.ReturnUrl|   | 54| --|O 1.5 não retorna os dados de request no response|
| 30|Payment.ExtraData[]|   | 55| --|O 1.5 não retorna os dados de request no response|
| 31|Payment.Tid|   |  1|tid|
| 32|Payment.ProofOfSale|   | 25|autorizacao.nsu|
| 33|Payment.AuthorizationCode|   | 19|autorizacao.arp|
| 34|Payment.Status|   | 13|status|Os valores retornados pelas aplicações são diferentes|
| 35|Payment.ReturnCode|   | 14|autenticacao.codigo|No 3.0 existe apenas um campo para código de retorno|
| 35|Payment.ReturnCode|   | 23|autorizacao.lr|No 3.0 existe apenas um campo para código de retorno|
| 35|Payment.ReturnCode|   | 26|captura.codigo|No 3.0 existe apenas um campo para código de retorno|
| 36|Payment.ReturnMessage|   | 15|autenticacao.mensagem|No 3.0 existe apenas um campo para mensagem de retorno|
| 36|Payment.ReturnMessage|   | 20|autorizacao.mensagem|No 3.0 existe apenas um campo para mensagem de retorno|
| 36|Payment.ReturnMessage|   | 27|captura.mensagem|No 3.0 existe apenas um campo para mensagem de retorno|
| 37|Payment.ReceivedDate|   |  6|dados-pedido.data-hora|
| 38|CapturedDate|   | 28|captura.data-hora|
| 39|Payment.Eci|   | 18|autenticacao.eci|
| 40|Payment.DebitCard.CardNumber|   | 57| --|O 1.5 não retorna os dados de request no response|
| 41|Payment.DebitCard.Holder|   | 58| --|
| 42|Payment.DebitCard.ExpirationDate|   | 59| --|O 1.5 não retorna os dados de request no response|
| 43|Payment.DebitCard.SecurityCode|   | 60| --|O 1.5 não retorna os dados de request no response|
| 44|Payment.DebitCard.CardToken|   | 61| --|O 1.5 não retorna os dados de request no response|
| 45|Payment.DebitCard.SaveCard|   | 62| --|O 1.5 não retorna os dados de request no response|
| 46|Payment.DebitCard.Brand|   | 10|forma-pagamento.bandeira|
| 47|Payment.Links[].Method|   | 66| --|O 1.5 não suporta HATEOAS|
| 48|Payment.Links[].Rel|   | 67| --|O 1.5 não suporta HATEOAS|
| 49|Payment.Links[].Href|   | 68| --|O 1.5 não suporta HATEOAS|
| 50| --|   |  2|pan|
| 51| --|   |  7|dados-pedido.descricao|
| 52| --|   |  8|dados-pedido.idioma|
| 53| --|   | 16|autenticacao.data-hora|
| 54| --|   | 21|autorizacao.data-hora|
| 55| --|   | 24|autorizacao.codigo|
| 56| --|   | 12|forma-pagamento.parcelas|
| 57| --|   | 11|forma-pagamento.produto|
| 58| --|   |  9|dados-pedido.taxa-embarque|

## Glossário

Para facilitar o entendimento, listamos abaixo um pequeno glossário com os principais termos relacionados ao eCommerce, ao mercado de cartões e adquirencia:

* **Autenticação**: processo para assegurar que o comprador é realmente aquele quem diz ser (portador legítimo), geralmente ocorre no banco emissor com uso de um token digital ou cartão com chaves de segurança.
* **Autorização**: processo para verificar se uma compra pode ou não ser realizada com um cartão. Nesse momento, são feitas diversas verificações com o cartão e com o portador (ex.: adimplência, bloqueios, etc.) É também neste momento que o limite do cartão é sensibilizado com o valor da transação.
* **Cancelamento**: processo para cancelar uma compra realizada com cartão.
* **Captura**: processo que confirma uma autorização que foi realizada previamente. Somente após a captura, é que o portador do cartão poderá visualizá-la em seu extrato ou fatura.
* **Chave de acesso**: é um código de segurança específico de cada loja, gerado pela Cielo, usada para realizar a autenticação e comunicação em todas as mensagens trocadas com a Cielo. Também conhecido como chave de produção e key data.
* **Comprador**: é o aquele que efetua compra na loja virtual.
* **Emissor (ou banco emissor)**: É a instituição financeira que emite o cartão de crédito, débito ou voucher.
* **Estabelecimento comercial ou EC**: Entidade que responde pela loja virtual.
* **Gateway de pagamentos**: Empresa responsável pelo integração técnica e processamento das transações.
* **Número de credenciamento**: é um número identificador que o lojista recebe após seu credenciamento junto à Cielo.
* **Portador**: é a pessoa que tem o porte do cartão no momento da venda.
* **SecureCode**: programa internacional da Mastercard para possibilitar a autenticação do comprador no momento de uma compra em ambiente eCommerce.
* **TID (Transaction Identifier)**: código composto por 20 caracteres que identificada unicamente uma transação Cielo eCommerce.
* **Transação**: é o pedido de compra do portador do cartão na Cielo.
* **VBV (Verified by Visa)**: Programa internacional da Visa que possibilita a autenticação do comprador no momento de uma compra em ambiente eCommerce.
