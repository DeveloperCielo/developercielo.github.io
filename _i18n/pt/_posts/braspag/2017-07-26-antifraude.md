---
layout: manual
title: Antifraude
description: Integração técnica antifraude
search: true
translated: true
categories: manual
tags:
  - Documentos Braspag
language_tabs:
  json: JSON
---

# Autenticação

Esta página descreve como se autenticar na plataforma Antifraude Gateway, para que seja possivel realizar Análises de transações.

A API do Antifraude Gateway utiliza o protocolo padrão de mercado OAuth 2.0 para autorização de acesso a seus recursos. 

Este documento descreve o fluxo necessário para que aplicações **cliente** obtenham tokens de acesso válidos para uso na plataforma. Caso deseje mais informações sobre o protocolo OAuth 2.0, consulte [https://oauth.net/2/](https://oauth.net/2/){:target="_blank"}.  

## Hosts

* **Test** https://authhomolog.braspag.com.br  
* **Live** https://auth.braspag.com.br

## Fluxo para obtenção do token de acesso  

* O token de acesso é obtido através do fluxo de autorização **Client Credentials**.

![Obtenção de Tokens de Acesso]({{ site.baseurl_root }}/images/braspag/af/antifraudeAuthentication.png){: .centerimg }{:title="Fluxo para obtenção do Token de Acesso "}

Fluxo de obtenção do Token de Acesso:

1. A *Aplicação Cliente*, informa à API do *OAuth Braspag* suas credenciais.  

2. O *OAuth Braspag* valida a credencial recebida. Se for válida, retorna o token de acesso para a *Aplicação Cliente*.  

Fluxo de Análise:

3. A *Aplicação Cliente* informa o token de acesso no cabeçalho da requisições HTTP de Análise de Fraude.   

4. Se o token de acesso for válido, a requisição é processada e a resposta de análise é retornada *Aplicação Cliente*.

## Exemplo de requisição HTTP  

### Cenário I: Obtenção de token de acesso  

* Para se autenticar com a API do Antifraude, é necessário que sejam previamente criadas as credenciais **user** e **password**, as quais deverão ser solicitadas à equipe de implantação da Braspag.

* Uma vez em posse dessas credenciais, será necessário "codificá-la" em  Base64, utilizando a convenção **user:password**.  
Exemplo:

* User: **braspagtestes**
* Password: **1q2w3e4r**
* String a ser codificada em Base64: **braspagtestes:1q2w3e4r**
* Resultado após a codificação: **YnJhc3BhZ3Rlc3RlczoxcTJ3M2U0cg==**

**REQUEST:**  

``` http
POST https://authhomolog.braspag.com.br/oauth2/token HTTP/1.1
Host: https://authhomolog.braspag.com.br
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {Resultado_Da_String_Codificada_Em_Base64}
Scope: AntifraudGatewayApp
Cache-Control: no-cache

grant_type=client_credentials

```

**RESPONSE:**  

``` http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

```

``` json
{
  "access_token": "faSYkjfiod8ddJxFTU3vti_rQV9fGvMrBNn0ZIZDqrLadEPKTUjt6ZPJSnNHtvOoJ6KO6gakgeyXNmSxFYHx7Y_-OCf8zgzILTVzCN5G1WTBWOKZHt-RknkmQLOgA882pWhC1gtOIQoq2tFX6-1VhOqsSCrdI3cUa2HolbGkxZWZMTPOl4Jzuy6ejo_USCMBNPqzvinchS0M33Bi8PiWMYwdpAbvwAe_nhIKNGmsAG6s7PTgWc2RksG6DaX8exdjvlGE9CMADq5LeM4JJ-BguZoHAP3yDBVZpe_DzI3JOrAYv0yzToBllPIMmq6CY-V8GJmckWByOGooBKr6COkZ1R9NPg2bvruYEC3g8hzKloUG21CD5r_la-t-0FvGHHY-8L7cKGybLidIYtw5aWOUgO2Aq0YScEnj1byDAsY6ROMnnzLrywkqscsf5xJACJwBmmEggHRyTVMY1-oOzmH6B2GNtC621i2XQ-8U6KVx9qD0R4qdWRn__AFatL7miTthMfO_PO2HWdDX_xD0i0jqcw",
  "token_type": "bearer",
  "expires_in": 599
}
```

* Na resposta é importante ressaltar o campo **expires_in**, com o tempo de expiração to access_token em segundos. Quando o token expirar, é necessário consumir o serviço novamente para obter um novo token.

### Como obter uma credencial?  

> Solicite uma credencial abrindo um ticket através da nossa ferramenta de suporte, enviando o(s) IP(s) de saída dos seus servidores de homologação e produção.  
[Suporte Braspag](https://suporte.braspag.com.br/hc/pt-br)

# Analise

Esta página descreve os campos do contrato do Antifraude Gateway, além de conter exemplos de requisições HTTP.  

## Hosts

**Test** https://riskhomolog.braspag.com.br  
**Live** https://risk.braspag.com.br

## Atributos do Request

**MerchantOrderId**{:.custom-attrib} `required`{:.custom-tag} `100`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do Pedido da Loja. `required`{:.custom-tag} `100`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Obs.: Para a Cybersource, este mesmo valor deve ser passado na variável SESSIONID do script do fingerprint.  

**TotalOrderAmount**{:.custom-attrib} `required`{:.custom-tag} `long`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Valor total do pedido em centavos. `required`{:.custom-tag} `long`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 150000 (Valor equivalente a R$1.500,00)

**TransactionAmount**{:.custom-attrib} `required`{:.custom-tag} `long`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Valor da transação financeira a ser analisada. `required`{:.custom-tag} `long`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 123456 Valor equivalente a R$1.234,56)

**Currency**{:.custom-attrib} `required`{:.custom-tag} `3`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Moeda. `required`{:.custom-tag} `3`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Mais informações em [ISO 4217 - Currency Codes](https://www.iso.org/iso-4217-currency-codes.html)
Ex.: BRL (Real Brasileiro) | USD(Dólar Americano)

**Provider**{:.custom-attrib} `required`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag}  
Nome do Provedor da Solução de Analise de Fraude.  
Enum.: ReDShield | Cybersource

**OrderDate**{:.custom-attrib} `optional`{:.custom-tag} `datetime`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Data do pedido. `optional`{:.custom-tag} `datetime`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 2016-12-09T19:16:38.155Z  
Obs.: Caso não envie a data do pedido, será gerada uma data pela Braspag.  

**BraspagTransactionId**{:.custom-attrib} `optional`{:.custom-tag} `Guid`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Id da transação no Pagador da Braspag. `optional`{:.custom-tag} `Guid`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: ED3B6646-5B6E-451C-B3CF-4FF5E807CB69  
Obs.: Se o fluxo implementado ao seu negócio for a primeira chamada para fazer a análise de fraude atravpes do Antifraude Gateway e a segunda for a autorização através do Pagador, realizar uma terceira chamada para que as transações do Antifraude Gateway e Pagador sejam vinculadas. Para mais detalhes acessar: **Associar transação Pagador e Antifraude**

**SplitingPaymentMethod**{:.custom-attrib} `default = None`{:.custom-tag} `optional`{:.custom-tag} `23`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Identifica se a autorização da transação é com um ou dois cartões ou com mais de um meio de pagamento, por exemplo, cartão de crédito e boleto bancário.  
Enum:  
None -> Pagamento com um cartão apenas.  
CardSplit -> Pagamento com mais de um cartão.  
MixedPaymentMethodSplit -> Pagamento com mais de um meio de pagamento.  

**IsRetryTransaction**{:.custom-attrib} `default = false`{:.custom-tag} `optional`{:.custom-tag} `bool`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Identifica que é uma retentativa de uma análise. Este campo deve ser enviado com valor igual a TRUE quando o código de retorno na primeira tentativa for igual a BP900, que identifica timeout entre Braspag e o Provedor. Este campo deve ser enviado somente quando Provedor igual a ReDShield.  

**Card.Number**{:.custom-attrib} `required`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do cartão de crédito. `required`{:.custom-tag} `20`{:.custom-tag} `string`{:.custom-tag}. `Cybersource`{:.custom-provider-cyber}  

**Card.Holder**{:.custom-attrib} `required`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Nome do cartão de crédito.  `required`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Card.ExpirationDate**{:.custom-attrib} `required`{:.custom-tag} `7`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Data de expiração do cartão de crédito. `required`{:.custom-tag} `7`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 01/2023

**Card.CVV**{:.custom-attrib} `required`{:.custom-tag} `4`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Código de segurança do cartão de crédito.

**Card.Brand**{:.custom-attrib} `required`{:.custom-tag} `10`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Bandeira do cartão de crédito. `required`{:.custom-tag} `10`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Bandeiras suportadas: Amex | Diners | Discover | JCB | Master | Dankort | Cartebleue | Maestro | Visa | Elo | Hipercard  

**Card.EciThreeDSecure**{:.custom-attrib} `optional`{:.custom-tag} `1`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Código do ECI (Eletronic Commerce Indicator) de autenticação  

**Card.Token**{:.custom-attrib} `optional`{:.custom-tag} `Guid`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Identificador do cartão de crédito salvo no Cartão Protegido. `optional`{:.custom-tag} `Guid`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Obs.: Este campo pode ser enviado no lugar dos campos **Card.Number, Card.Holder, Card.ExpirationDate**, tornando-os assim como não obrigatórios. O sistema irá consumir o Cartão Protegido enviando este campo para preencher os citados.  

**Card.Alias**{:.custom-attrib} `optional`{:.custom-tag} `64`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Alias (apelido) do cartão de crédito salvo no Cartão Protegido. `optional`{:.custom-tag} `64`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Obs.: Este campo pode ser enviado na análise de fraude quando se deseja salvar um cartão no Cartão Protegido, em conjunto com o campo **Card.Save** igual a TRUE.  
Obs2.: Este campo pode ser enviado no lugar dos campos **Card.Number, Card.Holder, Card.ExpirationDate**, tornando-os assim como não obrigatórios. O sistema irá consumir o Cartão Protegido enviando este campo para preencher os citados.  
Obs3.: Este campo perde em prioridade caso o campo **Card.Token** seja enviado também.  

**Card.Save**{:.custom-attrib} `default = false`{:.custom-tag} `optional`{:.custom-tag} `bool`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Indica se os dados do cartão de crédito serão armazenados no Cartão Protegido. `default = false`{:.custom-tag} `optional`{:.custom-tag} `bool`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
O Token gerado na plataforma Cartão Protegido associado aos dados de cartão de crédito, retornará no response da análise de fraude através campo **Card.Token**.  
Obs.: Os seguintes campos serão salvos no Cartão Protegido: **Card.Number, Card.Holder, Card.ExpirationDate**.  
Obs2.: A ação de salvar os dados do cartão de crédito, só será feita se a loja possuir o produto Cartão Protegido contratado.  

**Billing.Street**{:.custom-attrib} `optional`{:.custom-tag} `24`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Logradouro do endereço de cobrança. `required`{:.custom-tag} `54`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Billing.Number**{:.custom-attrib} `optional`{:.custom-tag} `5`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do endereço de cobrança. `required`{:.custom-tag} `5`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Billing.Complement**{:.custom-attrib} `optional`{:.custom-tag} `14`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Complemento do endereço de cobrança. `optional`{:.custom-tag} `14`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Billing.Neighborhood**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Bairro do endereço de cobrança. `optional`{:.custom-tag} `45`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Billing.City**{:.custom-attrib} `optional`{:.custom-tag} `20`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Cidade do endereço de cobrança. `required`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Billing.State**{:.custom-attrib} `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Estado do endereço de cobrança. `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Billing.Country**{:.custom-attrib} `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
País do endereço de cobrança. `required`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui)

**Billing.ZipCode**{:.custom-attrib} `optional`{:.custom-tag} `9`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Código postal do endereço de cobrança. `optional`{:.custom-tag} `9`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Street**{:.custom-attrib} `optional`{:.custom-tag} `24`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Logradouro do endereço de entrega. `optional`{:.custom-tag} `54`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Number**{:.custom-attrib} `optional`{:.custom-tag} `5`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do endereço de entrega. `optional`{:.custom-tag} `5`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Complement**{:.custom-attrib} `optional`{:.custom-tag} `14`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Complemento do endereço de entrega. `optional`{:.custom-tag} `14`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Neighborhood**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Bairro do endereço de entrega. `optional`{:.custom-tag} `45`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.City**{:.custom-attrib} `optional`{:.custom-tag} `20`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Cidade do endereço de entrega. `optional`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.State**{:.custom-attrib} `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Estado do endereço de entrega. `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Country**{:.custom-attrib} `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
País do endereço de entrega. `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui)

**Shipping.ZipCode**{:.custom-attrib} `optional`{:.custom-tag} `9`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Código postal do endereço de entrega. `optional`{:.custom-tag} `9`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Email**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
E-mail do responsável a receber o produto no endereço de entrega.

**Shipping.FirstName**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Primeiro nome do responsável a receber o produto no endereço de entrega. `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.MiddleName**{:.custom-attrib} `optional`{:.custom-tag} `1`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Nome do meio do responsável a receber o produto no endereço de entrega.

**Shipping.LastName**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Último nome do responsável a receber o produto no endereço de entrega. `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Shipping.Phone**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do telefone do responsável a receber o produto no endereço de entrega. `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 552121114700  
55 = Código do País  
21 = DDD do estado  
21114700 = Número do Telefone  

**Shipping.WorkPhone**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do telefone de trabalho do responsável a receber o produto no endereço de entrega.  
Ex.: 552121114701  
55 = Código do País  
21 = DDD do estado  
21114701 = Número do Telefone  

**Shipping.Mobile**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do celular do responsável a receber o produto no endereço de entrega.  
Ex.: 5521988776655  
55 = Código do País  
21 = DDD do estado  
988776655 = Número do Celular  

**Shipping.ShippingMethod**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag}  
Meio de entrega.  
Enum:  
SameDay = Meio de entrega no mesmo dia `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
NextDay = Meio de entrega no próximo dia `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
TwoDay = Meio de entrega em dois dias `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
ThreeDay = Meio de entrega em três dias `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
LowCost = Meio de entrega de baixo custo `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Pickup = Retirada na loja `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
CarrierDesignatedByCustomer = Meio de entrega designada pelo comprador `ReDShield`{:.custom-provider-red}  
International = Meio de entrega internacional `ReDShield`{:.custom-provider-red}  
Military = Meio de entrega militar `ReDShield`{:.custom-provider-red}  
Other = Outro meio de entrega `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
None = Sem meio de entrega, pois é um serviço ou assinatura. `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  

**Shipping.Comment**{:.custom-attrib} `optional`{:.custom-tag} `160`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Referências do endereço de entrega.

**Customer.MerchantCustomerId**{:.custom-attrib} `required`{:.custom-tag} `16`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número do documento de identificação do comprador. `required`{:.custom-tag} `16`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: CPF | CNPJ | CNH | Passaporte

**Customer.FirstName**{:.custom-attrib} `required`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Primeiro nome do comprador. `required`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Customer.MiddleName**{:.custom-attrib} `optional`{:.custom-tag} `1`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Nome do meio do comprador.

**Customer.LastName**{:.custom-attrib} `required`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Último nome do comprador do comprador. `required`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Customer.BirthDate**{:.custom-attrib} `required`{:.custom-tag} `date`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Data de nascimento do comprador. `required`{:.custom-tag} `date`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 1983-10-01

**Customer.Gender**{:.custom-attrib} `optional`{:.custom-tag} `6`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Sexo do comprador.  
Enum: Male | Female

**Customer.Email**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
E-mail do comprador. `required`{:.custom-tag} `100`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Customer.Ip**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Endereço de IP do comprador. `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**Customer.Phone**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Telefone do comprador. `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 552121114700  
55 = Código do País  
21 = DDD do estado  
21114700 = Número do Telefone  

**Customer.Mobile**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Celular do comprador.  
Ex.: 5521988776655  
55 = Código do País  
21 = DDD do estado  
988776655 = Número do Celular  

**Customer.WorkPhone**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Telefone de trabalho do comprador.  
Ex.: 552121114701  
55 = Código do País  
21 = DDD do estado  
21114701 = Número do Telefone  

**Customer.Status**{:.custom-attrib} `optional`{:.custom-tag} `8`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Status do comprador na loja.  
Enum:  
New = Identifica quando o comprador é novo na loja, nunca fez uma compra.  
Existing = Identifica quando o comprador é existente na loja, já realizou uma compra.  

**Customer.BrowserFingerPrint**{:.custom-attrib} `required`{:.custom-tag} `6005`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Impressão digital de dispositivos e geolocalização real do IP do comprador. `required`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
**Configuração do Fingerprint** 

**Customer.BrowserHostName**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nome do host informado pelo browser do comprador e identificado através do cabeçalho HTTP.  

**Customer.BrowserCookiesAccepted**{:.custom-attrib} `optional`{:.custom-tag} `bool`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Identifica se o browser do comprador aceita cookies ou não.  

**Customer.BrowserEmail**{:.custom-attrib} `optional`{:.custom-tag} `100`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
E-mail registrado no browser do comprador. Pode diferenciar do e-mail cadastrado (Customer.Email).  

**Customer.BrowserType**{:.custom-attrib} `optional`{:.custom-tag} `40`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nome do browser utilizado pelo comprador e identificado através do cabeçalho HTTP.  

**CartItem[n].ProductName**{:.custom-attrib} `optional`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Nome do produto. `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**CartItem[n].Risk**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de risco do produto associado a quantidade de chargebacks.  
Enum:  
Low = Produto associado com pouco chargebacks.  
Normal = Produto associado com a quantidade normal de chargebacks.  
High = Produto associado com muito chargebacks.  

**CartItem[n].UnitPrice**{:.custom-attrib} `optional`{:.custom-tag} `long`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Preço unitário do produto. `required`{:.custom-tag} `long`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Ex.: 10950 (Valor equivalente a R$109,50)  

**CartItem[n].OriginalPrice**{:.custom-attrib} `optional`{:.custom-tag} `long`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Preço original do produto.  
Ex.: 11490 (Valor equivalente a R$114,90)  

**CartItem[n].MerchantItemId**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
ID do produto na loja.

**CartItem[n].Sku**{:.custom-attrib} `optional`{:.custom-tag} `12`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Sku do produto. `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**CartItem[n].Quantity**{:.custom-attrib} `optional`{:.custom-tag} `int`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Quantidade do produto. `optional`{:.custom-tag} `int`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  

**CartItem[n].GiftMessage**{:.custom-attrib} `optional`{:.custom-tag} `160`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Mensagem de presente.

**CartItem[n].Description**{:.custom-attrib} `optional`{:.custom-tag} `76`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Nome do produto.

**CartItem[n].ShippingInstructions**{:.custom-attrib} `optional`{:.custom-tag} `160`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Instruções de entrega do produto.

**CartItem[n].ShippingMethod**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Meio de entrega do produto.  
Enum:  
SameDay = Meio de entrega no mesmo dia  
NextDay = Meio de entrega no próximo dia  
TwoDay = Meio de entrega em dois dias  
ThreeDay = Meio de entrega em três dias  
LowCost = Meio de entrega de baixo custo  
Pickup = Retirada na loja  
CarrierDesignatedByCustomer = Meio de entrega designada pelo comprador  
International = Meio de entrega internacional  
Military = Meio de entrega militar  
Other = Outro meio de entrega  
None = Sem meio de entrega, pois é um serviço ou assinatura.  

**CartItem[n].ShippingTranckingNumber**{:.custom-attrib} `optional`{:.custom-tag} `19`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Número de rastreamento do produto.  

**CartItem[n].AddressRiskVerify**{:.custom-attrib} `default = No`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Identifica que avaliará os endereços de cobrança e entrega para diferentes cidades, estados ou países.  
Enum:  
Yes = Em caso de divergência entre endereços de cobrança e entrega, atribui risco baixo ao pedido.  
No = Em caso de divergência entre endereços de cobrança e entrega, atribui risco alto ao pedido.  
Off = Diferenças entre os endereços de cobrança e entrega não afetam a pontuação.  

**CartItem[n].HostHedge**{:.custom-attrib} `default = Normal`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de importância dos endereços de IP e e-mail do comprador na análise de fraude.  
Enum:  
Low = Baixa  
Normal = Média  
High = Alta  
Off = Não irão afetar o score da análise de fraude.  

**CartItem[n].NonSensicalHedge**{:.custom-attrib} `default = Normal`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de importância das verificações sobre os dados do comprador sem sentido na análise de fraude.  
Enum:  
Low = Baixa  
Normal = Média  
High = Alta  
Off = Não irão afetar o score da análise de fraude.

**CartItem[n].ObscenitiesHedge**{:.custom-attrib} `default = Normal`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de importância das verificações sobre os dados do comprador com obscenidade na análise de fraude.  
Enum:  
Low = Baixa  
Normal = Média  
High = Alta  
Off = Não irão afetar o score da análise de fraude.

**CartItem[n].TimeHedge**{:.custom-attrib} `default = Normal`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de importância da hora do dia na análise de fraude que o comprador realizou o pedido.  
Enum:  
Low = Baixa  
Normal = Média  
High = Alta  
Off = Não irá afetar o score da análise de fraude.  

**CartItem[n].PhoneHedge**{:.custom-attrib} `default = Normal`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de importância das verificações sobre os números de telefones do comprador na análise de fraude.  
Enum:  
Low = Baixa  
Normal = Média  
High = Alta  
Off = Não irão afetar o score da análise de fraude.  

**CartItem[n].VelocityHedge**{:.custom-attrib} `default = Normal`{:.custom-tag} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível de importância da frequência de compra do comprador na análise de fraude dentros dos 15 minutos anteriores.  
Enum:  
Low = Baixa  
Normal = Média  
High = Alta  
Off = Não irá afetar o score da análise de fraude.  

**CartItem[n].Passenger.FirstName**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Primeiro nome do passageiro.

<!--**CartItem[n].Passenger.MiddleName**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nome do meio do passageiro.-->

**CartItem[n].Passenger.LastName**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Último nome do comprador do passageiro.  

**CartItem[n].Passenger.DateOfBirth**{:.custom-attrib} `optional`{:.custom-tag} `date`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Data de nascimento do passageiro.  
Ex.: 1985-07-22

**CartItem[n].Passenger.PassangerId**{:.custom-attrib} `optional`{:.custom-tag} `32`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
ID do passageiro a quem o passageiro foi emitido.  

**CartItem[n].Passenger.Status**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Classificação da empresa aérea.  
Enum.: Standard | Gold | Platinum  

**CartItem[n].Passenger.PassengerType**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Tipo do passageiro.  
Enum:  
Adult = Adulto  
Child = Criança  
Infant = Infantil  
Youth = Adolescente  
Student = Estudante  
SeniorCitizen = Idoso  
Military = Militar  

**CartItem[n].Passenger.Email**{:.custom-attrib} `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
E-mail do passageiro.

**CartItem[n].Passenger.Phone**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Telefone do passageiro.
Ex.: 552121114700  
55 = Código do País  
21 = DDD do estado  
21114700 = Número do Telefone  

<!--**CustomerConfigurationData.ServiceId**{:.custom-attrib}  `optional`{:.custom-tag} `50`{:.custom-tag} `string`{:.custom-tag}  
Id do serviço no sistema de risco. Esse campo geralmente é definido por alguma configuração, mas em algumas situações, você pode querer usar a opção baseada em solicitação dinâmica.
Para o ReDShield isso define qual serviço de triagem de fraude deve ser usado.-->

<!--**CustomerConfiguration.RiskBrand**{:.custom-attrib}  `optional`{:.custom-tag} `50`{:.custom-tag} `long`{:.custom-tag}  
Bandeira de risco do pedido.  -->

**CustomerConfiguration.Website**{:.custom-attrib} `optional`{:.custom-tag} `60`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Website da loja.

**CustomerConfiguration.Comments**{:.custom-attrib} `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Comentários que a loja poderá associar a análise de fraude.  

**CustomerConfiguration.ScoreThreshold**{:.custom-attrib} `optional`{:.custom-tag} `int`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nível aceitável de risco para cada produto.  

<!--**CustomerConfigurationData.AccessTokenS**{:.custom-attrib}  `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag}  -->

**MerchantDefinedData.Key**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Campo definido junto ao provedor de antifraude.

**MerchantDefinedData.Value**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag} `ReDShield`{:.custom-provider-red}  
Campo definido junto ao provedor de antifraude.  

Obs.: Entre os 15 campos disponíveis para customização, 5 são de tamanho de 256 caracteres alphanuméricos e 10 são de tamanho de 32 caracteres alphanuméricos.  
Obs2.: Já existem 2 campos além dos 15 disponíveis, que a loja poderá enviar, que são:  
     - Segment = Código do segmento do lojista (MCC). Caso o mesmo se encaixe em mais de um segmento, enviar o código do segmento principal que a loja atua.  
     - MerchantId = Identificador da loja no lojista. Este identificar não é o identificador da loja no antifraude na Braspag. Exemplo de envio, quando a loja trabalha com marketplace, onde poderá enviar o identificador da loja vendedora (Seller).  

**Travel.CompleteRoute**{:.custom-attrib} `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Rota completa da viagem. Concatenação das pernas (código do aeroporto) de origem e destino da viagem no formato, ORIG1-DEST1:ORIG2-DEST2.  
Ex.: SFO-JFK:JFK-LHR:LHR-CDG

**Travel.DepartureTime**{:.custom-attrib} `optional`{:.custom-tag} `datetime`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Data de partida do vôo.  
Ex.: 2017-03-01T15:10:15.258Z

**Travel.JourneyType**{:.custom-attrib} `optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Tipo de viagem.  
Enum.:  
OneWayTrip = Viagem somente de ida.  
RoundTrip = Viagem de ida e volta.  

**Travel.TravelLeg[n].Origin**{:.custom-attrib} `optional`{:.custom-tag} `3`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Código do aeroporto de origem da viagem.  
Ex.: SFO

**Travel.TravelLeg[n].Destination**{:.custom-attrib} `optional`{:.custom-tag} `3`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Código do aeroporto de destino da viagem.  
Ex.: JFK  

**Bank.Address**{:.custom-attrib} `optional`{:.custom-tag} `255`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Endereço do banco do comprador.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Bank.Code**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Código do banco do comprador.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Bank.Agency**{:.custom-attrib} `optional`{:.custom-tag} `15`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Agência do banco do comprador.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Bank.City**{:.custom-attrib} `optional`{:.custom-tag} `35`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Cidade onde está localizado o banco do comprador. Caso este campo não seja enviado, será considerado a cidade do banco enviada através do campo **Billing.City**. E como alguns bancos validam as informações da conta bancária, é muito importante enviar este campo caso a cidade não seja a mesma informada no campo **Billing.City**.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Bank.Country**{:.custom-attrib} `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
País onde está localizado o banco do comprador.  
Mais informações em [ISO 2-Digit Alpha Country Code](https://www.iso.org/obp/ui)
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Bank.Name**{:.custom-attrib} `optional`{:.custom-tag} `40`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nome do banco do comprador.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Bank.SwiftCode**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Código identificador único do banco do comprador. A sigla SWIFT significa Society for Worldwide Interbank Financial Telecommunication.  
Este campo é obrigatório para pagamentos em outros países.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**FundTransfer.AccountName**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Nome vinculado a conta bancária.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**FundTransfer.AccountNumber**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Número da conta bancária do comprador.  
Este campo é obrigatório se não tem ou não é autorizado a fornecer o IBAN.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  
Este campo não deve ser preenchido com o IBAN, para isso use o campo **FundTransfer.Iban**.  

**FundTransfer.BankCheckDigit**{:.custom-attrib} `optional`{:.custom-tag} `2`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Código utilizado para validar a conta bancária do comprador.  
Este campo é obrigatório se não tem ou não é autorizado a fornecer o IBAN.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**FundTransfer.Iban**{:.custom-attrib} `optional`{:.custom-tag} `30`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Número internacional da conta bancária (IBAN).  
Este campo pode ser enviado no lugar das informações tradicionais da conta bancária caso tenha ou é autorizado a fornecer.  
Este campo poderá ser usado somente quando for transações com meio de pagamento transferência.  

**Invoice.IsGift**{:.custom-attrib} `optional`{:.custom-tag} `bool`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Indica se o pedido realizado pelo comprador é para presente ou não.  

**Invoice.ReturnsAccepted**{:.custom-attrib} `optional`{:.custom-tag} `bool`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Indica se o pedido realizado pelo comprador pode ser desvolvido ou não a loja.  

**Invoice.Tender**{:.custom-attrib} `default = Consumer`{:.custom-tag}`optional`{:.custom-tag} `string`{:.custom-tag} `Cybersource`{:.custom-provider-cyber}  
Forma de pagamento utilizada pelo comprador.  
Enum:  
Consumer = Cartão de crédito pessoal.  
Corporate = Cartão de crédito corporativo.  
Debit = Cartão de débito.  
CollectDelivery = Cobrança na entrega.  
EletronicCheck = Cheque eletrônico.  
PaymentP2P = Pagamento de pessoa para pessoa.  
PrivateLabel = Pagamento com cartão de crédito privado.  
Other = Pagamentos com outros métodos.  

## Atributos do Response

**Id** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Id da transação no Antifraude Gateway Braspag.  

**Analysis.Score** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Score gerado pelo provedor.  

**AnalysisResult.Status** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Status da transação no Antifraude Gateway Braspag após a análise.  
Enum:  
Started = Transação recebida pela Braspag.  
Accept = Transação aceita após análise de fraude.  
Review = Transação em revisão após análise de fraude.  
Reject = Transação rejeitada após análise de fraude.  
Unfinished = Transação não finalizada por algum erro interno no sistema.  
ProviderError = Transação com erro no provedor de antifraude.  

**AnalysisResult.Message** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Mensagem de retorno do provedor.  

**AnalysisResult.ProviderCode** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Código de retorno do provedor.  

**AnalysisResult.ProviderTransactionId** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Id da transação no provedor.  

**AnalysisResult.ProviderRequestTransactionId** `Cybersource`{:.custom-provider-cyber} `ReDShield`{:.custom-provider-red}  
Id do request da transação no provedor.  

**AnalysisResult.ScoreModelUsed** `Cybersource`{:.custom-provider-cyber}  
Nome do modelo de score utilizado. Caso não tenha nenhum modelo definido, o modelo padrão da Cybersource foi o utilizado.

**AnalysisResult.CardScheme** `Cybersource`{:.custom-provider-cyber}  
Tipo da bandeira.  
Possíveis Valores: Maestro Internacional | Maestro UK Domestic | Mastercard Credit | Mastercard Debit | Visa Credit | Visa Debit | Visa Electron  

**AnalysisResult.CasePriority** `Cybersource`{:.custom-provider-cyber}  
Define o nível de prioridade das regras ou perfis do lojista.  
Este campo somente será retornado se a loja for assinante do Enhanced Case Management.  
O nível de prioridade varia de 1 (maior) a 5 (menor) e o valor padrão é 3, e este será atribuído caso não tenha definido a prioridade das regras ou perfis.  

**AnalysisResult.SuspiciousCode** `Cybersource`{:.custom-provider-cyber}  
Sequência de códigos que indicam que o comprador informou dados suspeitos.  
Este campo pode conter um ou mais códigos, separados por carets (^), por exemplo: BAD-FP^OBS-EM^RISK-DEV  
Possíveis Valores:  
BAD-FP = O dispositivo é arriscado.  
INTL-BIN = O cartão de crédito foi emitido fora dos U.S.  
MM-TZTLO = Fuso horário do dispositivo é incompatível com os fusos horários do país.  
MUL-EM = O cliente tem usado mais de quatro endereços de e-mail diferentes.  
NON-BC = A cidade de cobrança é um desconhecida.  
NON-FN = O primeiro nome do cliente é desconhecido.  
NON-LN = O último nome do cliente é desconhecido.  
OBS-BC = A cidade de cobrança contem obscenidades.  
OBS-EM = O endereço de e-mail contem obscenidades.  
RISK-AVS = O resultado do teste combinado AVS e endereço de cobrança normalizado são arriscados, o resultado AVS indica uma correspondência exata, mas o endereço de cobrança não é entrega normalizada.  
RISK-BC = A cidade de cobrança possui caracteres repetidos.  
RISK-BIN = No passado, este BIN do cartão de crédito (os seis primeiros dígitos do número do cartão) mostrou uma elevada incidência de fraude.  
RISK-DEV = Algumas das características do dispositivo são arriscadas.  
RISK-FN = Nome e sobrenome do cliente contêm combinações de letras improváveis.  
RISK-LN = Nome do meio ou o sobrenome do cliente contém combinações de letras improváveis.  
RISK-PIP = O endereço IP do proxy é arriscado.  
RISK-SD = A inconsistência nos países de cobrança e entrega é arriscado.  
RISK-TB = O dia e a hora da ordem associada ao endereço de cobrança é arriscado.  
RISK-TIP = O verdadeiro endereço IP é arriscado.  
RISK-TS = O dia e a hora da ordem associada ao endereço de entrega é arriscado.  

**AnalysisResult.InternetCode** `Cybersource`{:.custom-provider-cyber}  
Indica um problema com o endereço de e-mail, IP ou o endereço de cobrança do comprador.  
Este campo pode conter um ou mais códigos, separados por carets (^), por exemplo: FREE-EM^MM-IPBC^UNV-NID  
Possíveis Valores:  
FREE-EM = O endereço de e-mail do cliente é de um provedor de e-mail gratuito.  
INTL-IPCO = O país do endereço de e-mail do cliente é fora do U.S.  
INV-EM O = endereço de e-mail do cliente é inválido.  
MM-EMBCO = O domínio do endereço de e-mail do cliente não é consistente com o país do endereço de cobrança.  
MM-IPBC = O endereço de e-mail do cliente não é consistente com a cidade do endereço de cobrança.  
MM-IPBCO = O endereço de e-mail do cliente não é consistente com a país do endereço de cobrança.  
MM-IPBST = O endereço IP do cliente não é consistente com o estado no endereço de cobrança. No entanto, este código de informação não pode ser devolvido quando a inconsistência é entre estados imediatamente adjacentes.  
MM-IPEM = O endereço de e-mail do cliente não é consistente com o endereço IP.  
RISK-EM = O domínio do e-mail do cliente (por exemplo, mail.example.com) está associada com alto risco.  
UNV-NID = O endereço IP do cliente é de um proxy anônimo. Estas entidades escondem completamente informações sobre o endereço de IP.  
UNV-RI400SK = O endereço IP é de origem de risco.  
UNV-EMBCO = O país do endereço do cliente de e-mail não corresponde ao país do endereço de cobrança.  

**AnalysisResult.FactorCode** `Cybersource`{:.custom-provider-cyber}  
Combinação de códigos que indicam o score do pedido.  
Este campo pode conter um ou mais códigos, separados por carets (^), por exemplo: B^Y.  
Possíveis Valores:  
A = Mudança de endereço excessiva. O cliente mudou o endereço de cobrança duas ou mais vezes nos últimos seis meses.  
B = BIN do cartão ou autorização de risco. Os fatores de risco estão relacionados com BIN de cartão de crédito e/ou verificações de autorização do cartão.  
C = Elevado números de cartões de créditos. O cliente tem usado mais de seis números de cartões de créditos nos últimos seis meses.  
D = Impacto do endereço de e-mail. O cliente usa um provedor de e-mail gratuito ou o endereço de email é arriscado.  
E = Lista positiva. O cliente está na sua lista positiva.  
F = Lista negativa. O número da conta, endereço, endereço de e-mail ou endereço IP para este fim aparece sua lista negativa.  
G = Inconsistências de geolocalização. O domínio do cliente de e-mail, número de telefone, endereço de cobrança, endereço de envio ou endereço IP é suspeito.  
H = Excessivas mudanças de nome. O cliente mudou o nome duas ou mais vezes nos últimos seis meses.  
I = Inconsistências de internet. O endereço IP e de domínio de e-mail não são consistentes com o endereço de cobrança.  
N = Entrada sem sentido. O nome do cliente e os campos de endereço contém palavras sem sentido ou idioma.  
O = Obscenidades. Dados do cliente contém palavras obscenas.  
P = Identidade morphing. Vários valores de um elemento de identidade estão ligados a um valor de um elemento de identidade diferentes. Por exemplo, vários números de telefone estão ligados a um número de conta única.  
Q = Inconsistências do telefone. O número de telefone do cliente é suspeito.  
R = Ordem arriscada. A transação, o cliente e o lojista mostram informações correlacionadas de alto risco.  
T = Cobertura Time. O cliente está a tentar uma compra fora do horário esperado.  
U = Endereço não verificável. O endereço de cobrança ou de entrega não pode ser verificado.  
V = Velocity. O número da conta foi usado muitas vezes nos últimos 15 minutos.  
W = Marcado como suspeito. O endereço de cobrança ou de entrega é semelhante a um endereço previamente marcado como suspeito.  
Y = O endereço, cidade, estado ou país dos endereços de cobrança e entrega não se correlacionam.  
Z = Valor inválido. Como a solicitação contém um valor inesperado, um valor padrão foi substituído. Embora a transação ainda possa ser processada, examinar o pedido com cuidado para detectar anomalias.  

**AnalysisResult.VelocityCode** `Cybersource`{:.custom-provider-cyber}  
Sequência de códigos que indicam que o comprador tem uma frequência de compras elevada.  
Este campo pode conter um ou mais códigos, separados por carets (^), por exemplo: B^Y.  
Possíveis Valores:  
VEL-ADDR = Diferente estados de faturamento e/ou o envio (EUA e Canadá apenas) têm sido usadas várias vezes com o número do cartão de crédito e/ou endereço de email.  
VEL-CC = Diferentes números de contas foram usados várias vezes com o mesmo nome ou endereço de email.  
VEL-NAME = Diferentes nomes foram usados várias vezes com o número do cartão de crédito e/ou endereço de email.  
VELS-CC = O número de conta tem sido utilizado várias vezes durante o intervalo de controle curto.  
VELI-CC = O número de conta tem sido utilizado várias vezes durante o intervalo de controle médio.  
VELL-CC = O número de conta tem sido utilizado várias vezes durante o intervalo de controle longo.  
VELV-CC = O número de conta tem sido utilizado várias vezes durante o intervalo de controle muito longo.  
VELS-EM = O endereço de e-mail tem sido utilizado várias vezes durante o intervalo de controle curto.  
VELI-EM = O endereço de e-mail tem sido utilizado várias vezes durante o intervalo de controle médio.  
VELL-EM = O endereço de e-mail tem sido utilizado várias vezes durante o intervalo de controle longo.  
VELV-EM = O endereço de e-mail tem sido utilizado várias vezes durante o intervalo de controle muito longo.  
VELS-FP = O device fingerprint tem sido utilizado várias vezes durante um intervalo curto.  
VELI-FP = O device fingerprint tem sido utilizado várias vezes durante um intervalo médio.  
VELL-FP = O device fingerprint tem sido utilizado várias vezes durante um intervalo longo.  
VELV-FP = O device fingerprint tem sido utilizado várias vezes durante um intervalo muito longo.  
VELS-IP = O endereço IP tem sido utilizado várias vezes durante o intervalo de controle curto.  
VELI-IP = O endereço IP tem sido utilizado várias vezes durante o intervalo de controle médio.  
VELL-IP = O endereço IP tem sido utilizado várias vezes durante o intervalo de controle longo.  
VELV-IP = O endereço IP tem sido utilizado várias vezes durante o intervalo de controle muito longo.  
VELS-SA = O endereço de entrega tem sido utilizado várias vezes durante o intervalo de controle curto.  
VELI-SA = O endereço de entrega tem sido utilizado várias vezes durante o intervalo de controle médio.  
VELL-SA = O endereço de entrega tem sido utilizado várias vezes durante o intervalo de controle longo.  
VELV-SA = O endereço de entrega tem sido utilizado várias vezes durante o intervalo de controle muito longo.  
VELS-TIP = O endereço IP verdadeiro tem sido utilizado várias vezes durante o intervalo de controle curto.  
VELI-TIP = O endereço IP verdadeiro tem sido utilizado várias vezes durante o intervalo de controle médio.  
VELL-TIP = O endereço IP verdadeiro tem sido utilizado várias vezes durante o intervalo de controle longo.  

**AnalysisResult.VelocityCodeDetail** `Cybersource`{:.custom-provider-cyber}  
Lista de identificadores das regras que foram gerados no momento do cadastro das mesmas.  

**AnalysisResult.DeviceFingerprint.CookiesEnabled** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o browser do comprador estava habilitado para armazenar cookies temporariamente no momento da compra.  

**AnalysisResult.DeviceFingerprint.FlashEnabled** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o browser do comprador habilitado a execução de conteúdos em Flash no momento da compra.  

**AnalysisResult.DeviceFingerprint.Hash** `Cybersource`{:.custom-provider-cyber}  
Hash gerado a partir dos dados coletados pelo script de fingerprint.  

**AnalysisResult.DeviceFingerprint.ImagesEnabled** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o browser do comprador estava com cache de imagens habilitado no momento da compra.  

**AnalysisResult.DeviceFingerprint.JavascriptEnabled** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o browser do comprador estava com a execução de sripts em Javascript habilitada no momento da compra.  

**AnalysisResult.DeviceFingerprint.TrueIpAddress** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o IP do comprador é real.  

**AnalysisResult.DeviceFingerprint.TrueIpAddressCity** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o IP do comprador é de fato da cidade que deveria ser mesmo.  

**AnalysisResult.DeviceFingerprint.TrueIpAddressCountry** `Cybersource`{:.custom-provider-cyber}  
Flag identificando que o IP do comprador é de fato do país que deveria ser mesmo.  

<!--**AnalysisResult.DeviceFingerprint.SmartId** `Cybersource`{:.custom-provider-cyber}  

**AnalysisResult.DeviceFingerprint.SmartIdConfidencial** `Cybersource`{:.custom-provider-cyber}  -->

**AnalysisResult.DeviceFingerprint.ScreenResolution** `Cybersource`{:.custom-provider-cyber}  
Resolução da tela do comprador no momento da compra.

**AnalysisResult.DeviceFingerprint.BrowseLanguage** `Cybersource`{:.custom-provider-cyber}  
Linguagem do browser utilizado pelo comprador no momento da compra.  

<a style="float: right;" href="##atributos-do-request"><i class="fa fa-angle-double-up fa-fw"></i></a>

<a name="http_operations"></a>

## Operações HTTP

`POST`{:.http-post} [https://riskhomolog.braspag.com.br/Analysis/](#post_analise){:.custom-attrib}  
Análise da transação  

`GET`{:.http-get} [https://riskhomolog.braspag.com.br/Analysis/{Id}](#get_analise){:.custom-attrib}  
Obter detalhes da análise da transação  

<a style="float: right;" href="#http_operations"><i class="fa fa-angle-double-up fa-fw"></i></a>

<a name="post_analise"></a>

#### `POST`{:.http-post} Análise da Transação 

**REQUEST - REDSHIELD**  

``` http
POST https://riskhomolog.braspag.com.br/Analysis/ HTTP/1.1
Host: {antifraude endpoint}
Authorization: Bearer {access_token}
Content-Type: application/json
MerchantId: {Id da Loja no Antifraude Gateway}
```

``` json
{
  "MerchantOrderId": "4493d42c-8732-4b13-aadc-b07e89732c26",
  "TotalOrderAmount": 1500,
  "TransactionAmount": 1000,
  "Currency": "BRL",
  "Provider": "RedShield",
  "OrderDate": "2016-12-09 12:35:58.852",
  "BraspagTransactionId":"a3e08eb2-2144-4e41-85d4-61f1befc7a3b",
  "SplitingPaymentMethod": "None",
  "IsRetryTransaction": false,
  "Card": {
    "Number" : "4000111231110112",
    "Holder": "Holder Name",
    "ExpirationDate": "12/2023",
    "Cvv": "999",
    "Brand": "VISA",
    "EciThreeDSecure": "5"
  },
  "Billing": {
    "Street": "Rua Neturno",
    "Number": "12345",
    "Complement": "Sala 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "20080123"
  },
  "Shipping": {
    "Street": "Rua Saturno",
    "Number": "30000",
    "Complement": "sl 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "123456789",
    "Email": "emailentrega@dominio.com.br",
    "FirstName": "João",
    "MiddleName": "P",
    "LastName": "Silvao",
    "ShippingMethod": "SameDay",
    "Phone": "552121114700",
    "WorkPhone": "552121114721",
    "Mobile": "5521998765432",
    "Comment": "Em frente ao 322"
  },
  "Customer": {
    "MerchantCustomerId": "10050665740",
    "FirstName": "João",
    "MiddleName": "P",
    "LastName": "Silva",
    "BirthDate": "2016-12-09",
    "Gender": "Male",
    "Email": "emailcomprador@dominio.com.br",
    "Phone": "552121114700",
    "WorkPhone": "552121114721",
    "Mobile": "5521998765432",
    "Ip": "127.0.0.1",
    "BrowserFingerprint": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
    "Status": "NEW"
  },
  "CartItems": [
    {
      "ProductName": "Mouse",
      "UnitPrice": "12000",
      "MerchantItemId": "4",
      "Sku": "abc123",
      "Quantity": 1,
      "OriginalPrice": "12000",
      "GiftMessage": "Te amo!",
      "Description": "Uma description do Mouse",
      "ShippingInstructions": "Proximo ao 546",
      "ShippingMethod": "SameDay",
      "ShippingTrackingNumber": "123456"
    },
    {
      "ProductName": "Teclado",
      "UnitPrice": "96385",
      "MerchantItemId": "3",
      "Sku": "abc456",
      "Quantity": 1,
      "OriginalPrice": "96385",
      "GiftMessage": "Te odeio!",
      "Description": "Uma description do Teclado",
      "ShippingInstructions": "Proximo ao 123",
      "ShippingMethod": "SameDay",
      "ShippingTrackingNumber": "987654"
    }
  ],
  "CustomConfiguration": {
    "MerchantWebsite": "www.test.com"
  },
  "MerchantDefinedData": [
    {
      "Key": "USER_DATA4",
      "Value": "Valor definido com o Provedor a ser enviado neste campo."
    },
    {
      "Key": "Segment",
      "Value": "8999"
    },
    {
      "Key": "MerchantId",
      "Value": "Seller123456"
    }
  ]
}
```

**RESPONSE - REDSHIELD**  

* Quando a transação tiver a análise realizada.  

``` http
HTTP/1.1 201 Created
Content-Type: application/json;charset=UTF-8
```

``` json
{
  "Id": "22b5e829-edf1-e611-9414-0050569318a7",
  "AnalysisResult": {
    "Status": "Review",
    "Message": "Payment void and transaction challenged by ReD Shield",
    "ProviderCode": "100.400.148",
    "ProviderTransactionId": "487931363026",
    "ProviderRequestTransactionId": "8a8394865a353cc4015a37947c5f7e35"
  },
  "MerchantOrderId": "4493d42c-8732-4b13-aadc-b07e89732c26",
  "TotalOrderAmount": 1500,
  "TransactionAmount": 1000,
  "Currency": "BRL",
  "Provider": "RedShield",
  "OrderDate": "2016-12-09 12:35:58.852",
  "BraspagTransactionId":"a3e08eb2-2144-4e41-85d4-61f1befc7a3b",
  "SplitingPaymentMethod": "None",
  "IsRetryTransaction": false,
  "Card": {
    "Number" : "4000111231110112",
    "Holder": "Holder Name",
    "ExpirationDate": "12/2023",
    "Cvv": "999",
    "Brand": "VISA",
    "EciThreeDSecure": "5"
  },
  "Billing": {
    "Street": "Rua Neturno",
    "Number": "12345",
    "Complement": "Sala 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "20080123"
  },
  "Shipping": {
    "Street": "Rua Saturno",
    "Number": "30000",
    "Complement": "sl 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "123456789",
    "Email": "emailentrega@dominio.com.br",
    "FirstName": "João",
    "MiddleName": "P",
    "LastName": "Silvao",
    "ShippingMethod": "SameDay",
    "Phone": "552121114700",
    "WorkPhone": "552121114721",
    "Mobile": "5521998765432",
    "Comment": "Em frente ao 322"
  },
  "Customer": {
    "MerchantCustomerId": "10050665740",
    "FirstName": "João",
    "MiddleName": "P",
    "LastName": "Silva",
    "BirthDate": "2016-12-09",
    "Gender": "Male",
    "Email": "emailcomprador@dominio.com.br",
    "Phone": "552121114700",
    "WorkPhone": "552121114721",
    "Mobile": "5521998765432",
    "Ip": "127.0.0.1",
    "BrowserFingerprint": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
    "Status": "NEW"
  },
  "CartItems": [
    {
      "ProductName": "Mouse",
      "UnitPrice": "12000",
      "MerchantItemId": "4",
      "Sku": "abc123",
      "Quantity": 1,
      "OriginalPrice": "12000",
      "GiftMessage": "Te amo!",
      "Description": "Uma description do Mouse",
      "ShippingInstructions": "Proximo ao 546",
      "ShippingMethod": "SameDay",
      "ShippingTrackingNumber": "123456"
    },
    {
      "ProductName": "Teclado",
      "UnitPrice": "96385",
      "MerchantItemId": "3",
      "Sku": "abc456",
      "Quantity": 1,
      "OriginalPrice": "96385",
      "GiftMessage": "Te odeio!",
      "Description": "Uma description do Teclado",
      "ShippingInstructions": "Proximo ao 123",
      "ShippingMethod": "SameDay",
      "ShippingTrackingNumber": "987654"
    }
  ],
  "CustomConfiguration": {
    "MerchantWebsite": "www.test.com"
  },
  "MerchantDefinedData": [
    {
      "Key": "USER_DATA4",
      "Value": "Valor definido com o Provedor a ser enviado neste campo."
    },
    {
      "Key": "Segment",
      "Value": "8999"
    },
    {
      "Key": "MerchantId",
      "Value": "Seller123456"
    }
  ]
}
```

**REQUEST - CYBERSOURCE**

``` json
{
  "MerchantOrderId": "4493d42c-8732-4b13-aadc-b07e89732c26",
  "TotalOrderAmount": 1500,
  "TransactionAmount": 1000,
  "Currency": "BRL",
  "Provider": "Cybersource",
  "OrderDate": "2016-12-09 12:35:58.852",
  "BraspagTransactionId":"a3e08eb2-2144-4e41-85d4-61f1befc7a3b",
  "Card": {
    "Number" : "4000111231110112",
    "Holder": "Holder Name",
    "ExpirationDate": "12/2023",
    "Cvv": "999",
    "Brand": "VISA"
  },
  "Billing": {
    "Street": "Rua Saturno",
    "Number": "12345",
    "Complement": "Sala 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "20080123"
  },
  "Shipping": {
    "Street": "Rua Neturno",
    "Number": "30000",
    "Complement": "sl 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "123456789",
    "FirstName": "João",
    "LastName": "Silva",
    "ShippingMethod": "SameDay",
    "Phone": "552121114700"
  },
  "Customer": {
    "MerchantCustomerId": "10050665740",
    "FirstName": "João",
    "LastName": "Silva",
    "BirthDate": "2016-12-09",
    "Email": "emailcomprador@dominio.com.br",
    "Phone": "552121114700",
    "Ip": "127.0.0.1",
    "BrowserHostName":"www.dominiobrowsercomprador.com.br",
    "BrowserCookiesAccepted":true,
    "BrowserEmail":"emailbrowsercomprador@dominio.com.br",
    "BrowserType":"Chrome 58 on Windows 10"
  },
  "CartItems": [
    {
      "ProductName": "Mouse",
      "UnitPrice": "12000",
      "Sku": "abc123",
      "Quantity": 1,
      "Risk":"Low",
      "Passenger": {
        "FirstName": "João",
        "LastName": "Silva",
        "PassengerId": "1",
        "Status": "NEW",
        "PassengerType": "Adult",
        "Email": "emailpassageiro@dominio.com.br",
        "Phone" : "552121114700",
        "DateOfBirth": "1982-04-30"
      },
      "AddressRiskVerify":"No",
      "HostHedge":"Low",
      "NonSensicalHedge":"Normal",
      "ObscenitiesHedge":"High",
      "TimeHedge":"Low",
      "PhoneHedge":"Normal",
      "VelocityHedge":"High"
    },
    {
      "ProductName": "Teclado",
      "UnitPrice": "96385",
      "MerchantItemId": "3",
      "Sku": "abc456",
      "Quantity": 1,
      "Risk": "High"
    }
  ],
  "MerchantDefinedData": [
    {
      "Key": "USER_DATA4",
      "Value": "Valor definido com o Provedor a ser enviado neste campo."
    },
    {
      "Key": "Segment",
      "Value": "8999"
    },
    {
      "Key": "MerchantId",
      "Value": "Seller123456"
    }
  ],
  "Travel": {
    "CompleteRoute": "GIG-CGH-EZE:EZE-CGH-GIG",
    "DepartueTime": "2016-12-10 11:31:00.000",
    "JourneyType": "OneWayTrip",
    "TravelLegs": [
      {
        "Origin": "GIG",
        "Destination": "CGH"
      },
      {
        "Origin": "CGH",
        "Destination": "EZE"
      }
    ]
  },
  "Bank":{
    "Address": "Rua Marte, 29",
    "Code": "237",
    "Agency": "987654",
    "City": "Rio de Janeiro",
    "Country": "BR",
    "Name": "Bradesco",
    "SwiftCode": "789"
  },
  "FundTransfer":{
    "AccountNumber":"159753",
    "AccountName":"Conta particular",
    "BankCheckDigit":"51",
    "Iban":"123456789"
  },
  "Invoice":{
    "IsGift": false,
    "ReturnsAccept": true,
    "Tender": "Consumer"
  }  
}
```

**RESPONSE - CYBERSOURCE**  

``` http
HTTP/1.1 201 Created
Content-Type: application/json;charset=UTF-8
```

```json
{
  "AnalysisResult": {
    "Id": "0c72cb49-985d-e711-93ff-000d3ac03bed",
    "Status": "Reject",
    "Score": "99",
    "ProviderCode": "481",
    "ProviderTransactionId": "4988294363046705503011",
    "SuspiciousCode": "RISK-SD",
    "ScoreModelUsed": "travel",
    "FactorCode": "F^I^P^Y^Z",
    "VelocityCodeDetail": "GVEL-R7^GVEL-R2^GVEL-R6",
    "CasePriority": "3"
  },
  "MerchantOrderId": "4493d42c-8732-4b13-aadc-b07e89732c26",
  "TotalOrderAmount": 1500,
  "TransactionAmount": 1000,
  "Currency": "BRL",
  "Provider": "Cybersource",
  "OrderDate": "2016-12-09 12:35:58.852",
  "BraspagTransactionId":"a3e08eb2-2144-4e41-85d4-61f1befc7a3b",
  "Card": {
    "Number" : "4000111231110112",
    "Holder": "Holder Name",
    "ExpirationDate": "12/2023",
    "Cvv": "999",
    "Brand": "VISA"
  },
  "Billing": {
    "Street": "Rua Saturno",
    "Number": "12345",
    "Complement": "Sala 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "20080123"
  },
  "Shipping": {
    "Street": "Rua Neturno",
    "Number": "30000",
    "Complement": "sl 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "123456789",
    "FirstName": "João",
    "LastName": "Silva",
    "ShippingMethod": "SameDay",
    "Phone": "552121114700"
  },
  "Customer": {
    "MerchantCustomerId": "10050665740",
    "FirstName": "João",
    "LastName": "Silva",
    "BirthDate": "2016-12-09",
    "Email": "emailcomprador@dominio.com.br",
    "Phone": "552121114700",
    "Ip": "127.0.0.1",
    "BrowserHostName":"www.dominiobrowsercomprador.com.br",
    "BrowserCookiesAccepted":true,
    "BrowserEmail":"emailbrowsercomprador@dominio.com.br",
    "BrowserType":"Chrome 58 on Windows 10"
  },
  "CartItems": [
    {
      "ProductName": "Mouse",
      "UnitPrice": "12000",
      "Sku": "abc123",
      "Quantity": 1,
      "Risk":"Low",
      "Passenger": {
        "FirstName": "João",
        "LastName": "Silva",
        "PassengerId": "1",
        "Status": "NEW",
        "PassengerType": "Adult",
        "Email": "emailpassageiro@dominio.com.br",
        "Phone" : "552121114700",
        "DateOfBirth": "1982-04-30"
      },
      "AddressRiskVerify":"No",
      "HostHedge":"Low",
      "NonSensicalHedge":"Normal",
      "ObscenitiesHedge":"High",
      "TimeHedge":"Low",
      "PhoneHedge":"Normal",
      "VelocityHedge":"High"
    },
    {
      "ProductName": "Teclado",
      "UnitPrice": "96385",
      "MerchantItemId": "3",
      "Sku": "abc456",
      "Quantity": 1,
      "Risk": "High"
    }
  ],
  "MerchantDefinedData": [
    {
      "Key": "USER_DATA4",
      "Value": "Valor definido com o Provedor a ser enviado neste campo."
    },
    {
      "Key": "Segment",
      "Value": "8999"
    },
    {
      "Key": "MerchantId",
      "Value": "Seller123456"
    }
  ],
  "Travel": {
    "CompleteRoute": "GIG-CGH-EZE:EZE-CGH-GIG",
    "DepartueTime": "2016-12-10 11:31:00.000",
    "JourneyType": "OneWayTrip",
    "TravelLegs": [
      {
        "Origin": "GIG",
        "Destination": "CGH"
      },
      {
        "Origin": "CGH",
        "Destination": "EZE"
      }
    ]
  },
  "Bank":{
    "Address": "Rua Marte, 29",
    "Code": "237",
    "Agency": "987654",
    "City": "Rio de Janeiro",
    "Country": "BR",
    "Name": "Bradesco",
    "SwiftCode": "789"
  },
  "FundTransfer":{
    "AccountNumber":"159753",
    "AccountName":"Conta particular",
    "BankCheckDigit":"51",
    "Iban":"123456789"
  },
  "Invoice":{
    "IsGift": false,
    "ReturnsAccept": true,
    "Tender": "Consumer"
  }  
}
```

**RESPONSE - Quando request for inválido para qualquer provedor.**  

* Quando os dados enviados para análise tiver alguma inconformidade nos valores, tamanhos permitidos e/ou tipos dos campos conforme especificação do manual.  

**Message**  
Mensagem para um requisição inválida.  

**ModelState**  
Caso algum campo não esteja de acordo com o tipo ou domínio especificado no manual.  

**ModelState.FraudAnalysisRequestError**  
Caso algum campo não esteja de acordo com o tamanho especificado no manual.  

``` http
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8
```

``` json
{
  "Message": "The request is invalid.",
  "ModelState": {
    "request.Customer.Gender": [
      "Error converting value \"M\" to type 'Antifraude.Domain.Enums.GenderType'. Path 'Customer.Gender', line 51, position 17."
    ],
    "FraudAnalysisRequestError": [
      "The Card.EciThreeDSecure lenght is gratter than 1",
      "The Shipping.Complement lenght is gratter than 14",
      "The Shipping.MiddleName lenght is gratter than 1",
      "The Customer.MerchantCustomerId lenght is gratter than 16",
      "The Customer.MiddleName lenght is gratter than 1"
    ]
  }
}
```

<a style="float: right;" href="#http_operations"><i class="fa fa-angle-double-up fa-fw"></i></a>
  
<a name="get_analise"></a>

#### `GET`{:.http-get} Obtenção dos Detalhes da Análise

**PARÂMETROS:**  

``` csharp
Id: Guid  // Id da Transação no Antifraude

```

**REQUEST:**  

``` http
GET https://riskhomolog.braspag.com.br/Analysis/{Id} HTTP/1.1
Host: riskhomolog.braspag.com.br
Authorization: Bearer {access_token}
Content-Type: application/json
```

**RESPONSE:**  

* Quando a transação não for encontrada na base de dados.  

``` http
HTTP/1.1 404 Not Found
Content-Type: application/json;charset=UTF-8
```

* Quando a transação for encontrada na base de dados.

**REDSHIELD**

``` http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```

``` json
{
  "Id": "22b5e829-edf1-e611-9414-0050569318a7",
  "AnalysisResult": {
    "Status": "Review",
    "Message": "Payment void and transaction challenged by ReD Shield",
    "ProviderCode": "100.400.148",
    "ProviderTransactionId": "487931363026",
    "ProviderRequestTransactionId": "8a8394865a353cc4015a37947c5f7e35"
  },
  "MerchantOrderId": "4493d42c-8732-4b13-aadc-b07e89732c26",
  "TotalOrderAmount": 1500,
  "TransactionAmount": 1000,
  "Currency": "BRL",
  "Provider": "RedShield",
  "OrderDate": "2016-12-09 12:35:58.852",
  "BraspagTransactionId":"a3e08eb2-2144-4e41-85d4-61f1befc7a3b",
  "SplitingPaymentMethod": "None",
  "IsRetryTransaction": false,
  "Card": {
    "Number" : "4000111231110112",
    "Holder": "Holder Name",
    "ExpirationDate": "12/2023",
    "Cvv": "999",
    "Brand": "VISA",
    "EciThreeDSecure": "5"
  },
  "Billing": {
    "Street": "Rua Neturno",
    "Number": "12345",
    "Complement": "Sala 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "20080123"
  },
  "Shipping": {
    "Street": "Rua Saturno",
    "Number": "30000",
    "Complement": "sl 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "123456789",
    "Email": "emailentrega@dominio.com.br",
    "FirstName": "João",
    "MiddleName": "P",
    "LastName": "Silvao",
    "ShippingMethod": "SameDay",
    "Phone": "552121114700",
    "WorkPhone": "552121114721",
    "Mobile": "5521998765432",
    "Comment": "Em frente ao 322"
  },
  "Customer": {
    "MerchantCustomerId": "10050665740",
    "FirstName": "João",
    "MiddleName": "P",
    "LastName": "Silva",
    "BirthDate": "2016-12-09",
    "Gender": "Male",
    "Email": "emailcomprador@dominio.com.br",
    "Phone": "552121114700",
    "WorkPhone": "552121114721",
    "Mobile": "5521998765432",
    "Ip": "127.0.0.1",
    "BrowserFingerprint": "04003hQUMXGB0poNf94lis1ztuLYRFk+zJ17aP79a9O8mWOBmEnKs6ziAo94ggAtBvKEN6/FI8Vv2QMAyHLnc295s0Nn8akZzRJtHwsEilYx1P+NzuNQnyK6+7x2OpjJZkl4NlfPt7h9d96X/miNlYT65UIY2PeH7sUAh9vKxMn1nlPu2MJCSi12NBBoiZbfxP1Whlz5wlRFwWJi0FRulruXQQGCQaJkXU7GWWZGI8Ypycnf7F299GIR12G/cdkIMFbm6Yf0/pTJUUz1vNp0X2Zw8QydKgnOIDKXq4HnEqNOos1c6njJgQh/4vXJiqy0MXMQOThNipDmXv9I185O+yC2f3lLEO0Tay66NZEyiLNePemJKSIdwO9O5ZtntuUkG6NTqARuHStXXfwp8cyGF4MPWLuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOihQxRh4qp+NANqYKBTl3v6fQJAEKikeSQVeBN8sQqAL0BZFaIMzbrnMivi6m6JRQUIdvEt+MbJEPFc0LjRycC5ApUmJO+Aoo9VKL1B8ftMSQ1iq1uTKn16ZOmDpzZrZhMPbH83aV0rfB2GDXcjpghm9klVFOw7EoYzV7IDBIIRtgqG9KZ+8NH/z6D+YNUMLEUuK1N2ddqKbS5cKs2hplVRjwSv7x8lMXWE7VDaOZWB8+sD1cMLQtEUC0znzxZ4bpRaiSy4dJLxuJpQYAFUrDlfSKRv/eHV3QiboXLuw9Lm6xVBK8ZvpD5d5olGQdc+NgsqjFnAHZUE+OENgY4kVU9wB84+POrI4MkoD4iHJ5a1QF8AZkZDFo1m1h9Bl+J2Ohr6MkBZq8DG5iVaunHfxUdHou5GL7lS1H7r+8ctfDXi8AfOPjzqyODJQ74Aiel35TKTOWG8pq1WO6yzJ1GNmMuMWZBamlGXoG/imnjwHY9HQtQzpGfcm0cR8X2Fd1ngNFGLDGZlWOX0jWtOwU6XVGT37JFD9W/cx4kzI+mPNi65X5WFPYlDG9N0Lbh5nOj3u3DXqRCiKCUrsEkMt8z9fxO9pLLGVQUKIYR2wTw53CiWK96FOpPevDWtH2XR0QkfOd02D73n81x6hEMCy0s3hRLn08Th9FlNHDMJBqLj+Tz8rG2TtNki3mJC7Ass1MT2qnKBI77n6vsQkAp59TfbZm/tBXwAoYdLJXge8F/numhd5AvQ+6I8ZHGJfdN3qWndvJ2I7s5Aeuzb8t9//eNsm73fIa05XreFsNyfOq1vG2COftC6EEsoJWe5h5Nwu1x6PIKuCaWxLY+npfWgM0dwJPmSgPx7TNM31LyVNS65m83pQ+qMTRH6GRVfg7HAcS5fnS/cjdbgHxEkRmgkRq1Qs48sbX9QC8nOTD0ntb6FcJyEOEOVzmJtDqimkzDq+SXR1/63AYe4LEj+ogRgN+Z8HAFhGFzd/m6snVviELfRqJ4LLQIk9Y/fzqnsF6I5OGxfdT2sxxK2Vokpi3jWhCcEknw7dYlHYpOnCHZO7QVgjQTngF2mzKf4GeOF4ECFsWTgLy6HFEitfauYJt1Xh1NfZZerBMwXLFzdhzoTQxGlcXc8lZIoEG1BLYv/ScICf8Ft9PEtpEa+j0cDSlU99UoH2xknwR1W9MRGc5I/euE63/IMJTqguZ3YcnJpjSVnAGSpyz/0gKjypJ3L86rHFRGXt0QbmaXtSl2UmmjI0p0LCCdx7McatCFEVI6FwPpPV0ZSMv/jM75eBid1X/lTV4XNzjowzR/iFlKYMzHZtVO9hCBPKlTwblRXNn4MlvNm/XeSRQ+Mr0YV5w5CL5Z/tGyzqnaLPj/kOVdyfj8r2m5Bcrz4g/ieUIo8qRFv2T2mET46ydqaxi27G4ZYHj7hbiaIqTOxWaE07qMCkJw==",
    "Status": "NEW"
  },
  "CartItems": [
    {
      "ProductName": "Mouse",
      "UnitPrice": "12000",
      "MerchantItemId": "4",
      "Sku": "abc123",
      "Quantity": 1,
      "OriginalPrice": "12000",
      "GiftMessage": "Te amo!",
      "Description": "Uma description do Mouse",
      "ShippingInstructions": "Proximo ao 546",
      "ShippingMethod": "SameDay",
      "ShippingTrackingNumber": "123456"
    },
    {
      "ProductName": "Teclado",
      "UnitPrice": "96385",
      "MerchantItemId": "3",
      "Sku": "abc456",
      "Quantity": 1,
      "OriginalPrice": "96385",
      "GiftMessage": "Te odeio!",
      "Description": "Uma description do Teclado",
      "ShippingInstructions": "Proximo ao 123",
      "ShippingMethod": "SameDay",
      "ShippingTrackingNumber": "987654"
    }
  ],
  "CustomConfiguration": {
    "MerchantWebsite": "www.test.com"
  },
  "MerchantDefinedData": [
    {
      "Key": "USER_DATA4",
      "Value": "Valor definido com o Provedor a ser enviado neste campo."
    },
    {
      "Key": "Segment",
      "Value": "8999"
    },
    {
      "Key": "MerchantId",
      "Value": "Seller123456"
    }
  ]
}
```

**CYBERSOURCE**

``` http
HTTP/1.1 201 Created
Content-Type: application/json;charset=UTF-8
```

```json
{
  "AnalysisResult": {
    "Id": "0c72cb49-985d-e711-93ff-000d3ac03bed",
    "Status": "Reject",
    "Score": "99",
    "ProviderCode": "481",
    "ProviderTransactionId": "4988294363046705503011",
    "SuspiciousCode": "RISK-SD",
    "ScoreModelUsed": "travel",
    "FactorCode": "F^I^P^Y^Z",
    "VelocityCodeDetail": "GVEL-R7^GVEL-R2^GVEL-R6",
    "CasePriority": "3"
  },
  "MerchantOrderId": "4493d42c-8732-4b13-aadc-b07e89732c26",
  "TotalOrderAmount": 1500,
  "TransactionAmount": 1000,
  "Currency": "BRL",
  "Provider": "Cybersource",
  "OrderDate": "2016-12-09 12:35:58.852",
  "BraspagTransactionId":"a3e08eb2-2144-4e41-85d4-61f1befc7a3b",
  "Card": {
    "Number" : "4000111231110112",
    "Holder": "Holder Name",
    "ExpirationDate": "12/2023",
    "Cvv": "999",
    "Brand": "VISA"
  },
  "Billing": {
    "Street": "Rua Saturno",
    "Number": "12345",
    "Complement": "Sala 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "20080123"
  },
  "Shipping": {
    "Street": "Rua Neturno",
    "Number": "30000",
    "Complement": "sl 123",
    "Neighborhood": "Centro",
    "City": "Rio de Janeiro",
    "State": "RJ",
    "Country": "BR",
    "ZipCode": "123456789",
    "FirstName": "João",
    "LastName": "Silva",
    "ShippingMethod": "SameDay",
    "Phone": "552121114700"
  },
  "Customer": {
    "MerchantCustomerId": "10050665740",
    "FirstName": "João",
    "LastName": "Silva",
    "BirthDate": "2016-12-09",
    "Email": "emailcomprador@dominio.com.br",
    "Phone": "552121114700",
    "Ip": "127.0.0.1",
    "BrowserHostName":"www.dominiobrowsercomprador.com.br",
    "BrowserCookiesAccepted":true,
    "BrowserEmail":"emailbrowsercomprador@dominio.com.br",
    "BrowserType":"Chrome 58 on Windows 10"
  },
  "CartItems": [
    {
      "ProductName": "Mouse",
      "UnitPrice": "12000",
      "Sku": "abc123",
      "Quantity": 1,
      "Risk":"Low",
      "Passenger": {
        "FirstName": "João",
        "LastName": "Silva",
        "PassengerId": "1",
        "Status": "NEW",
        "PassengerType": "Adult",
        "Email": "emailpassageiro@dominio.com.br",
        "Phone" : "552121114700",
        "DateOfBirth": "1982-04-30"
      },
      "AddressRiskVerify":"No",
      "HostHedge":"Low",
      "NonSensicalHedge":"Normal",
      "ObscenitiesHedge":"High",
      "TimeHedge":"Low",
      "PhoneHedge":"Normal",
      "VelocityHedge":"High"
    },
    {
      "ProductName": "Teclado",
      "UnitPrice": "96385",
      "MerchantItemId": "3",
      "Sku": "abc456",
      "Quantity": 1,
      "Risk": "High"
    }
  ],
  "MerchantDefinedData": [
    {
      "Key": "USER_DATA4",
      "Value": "Valor definido com o Provedor a ser enviado neste campo."
    },
    {
      "Key": "Segment",
      "Value": "8999"
    },
    {
      "Key": "MerchantId",
      "Value": "Seller123456"
    }
  ],
  "Travel": {
    "CompleteRoute": "GIG-CGH-EZE:EZE-CGH-GIG",
    "DepartueTime": "2016-12-10 11:31:00.000",
    "JourneyType": "OneWayTrip",
    "TravelLegs": [
      {
        "Origin": "GIG",
        "Destination": "CGH"
      },
      {
        "Origin": "CGH",
        "Destination": "EZE"
      }
    ]
  },
  "Bank":{
    "Address": "Rua Marte, 29",
    "Code": "237",
    "Agency": "987654",
    "City": "Rio de Janeiro",
    "Country": "BR",
    "Name": "Bradesco",
    "SwiftCode": "789"
  },
  "FundTransfer":{
    "AccountNumber":"159753",
    "AccountName":"Conta particular",
    "BankCheckDigit":"51",
    "Iban":"123456789"
  },
  "Invoice":{
    "IsGift": false,
    "ReturnsAccept": true,
    "Tender": "Consumer"
  }  
}
```

# Post de notificação 

Esta página descreve o serviço de POST de Notificação, que envia uma notificação para a loja, caso haja alguma alteração de Status na Transação de revisão para aceita/rejeita.

Serviço que envia um **post de notificação** ao cliente caso haja alguma alteração de status

* É necessário solicitar ao Time de Implementação ([implantacao.operacoes@braspag.com.br](mailto:implantacao.operacoes@braspag.com.br)) o cadastramento da URL de mudança de status.
Quando estimulada pelo servidor da Braspag, enviando um POST, a URL cadastrada para receber a notificação da mudança de status da transação, deverá retornar o código HTTP 200 (OK), indicando que a mensagem foi recebida e processada com sucesso pelo servidor da loja.  

* Se a URL de mudança de status da loja for acessada pelo servidor da Braspag e não retornar o código de confirmação HTTP 200 (OK) ou ocorrer uma falha na conexão, serão realizadas mais 3 tentativas de envio.  

* A URL de mudança de status somente pode utilizar a porta 80 (padrão para http) ou a porta 443 (padrão para https). Recomendamos que a loja trabalhe sempre com SSL para esta URL, ou seja, sempre HTTPS.  

* Após a loja receber a notificação de mudança de status, deverá realizar um GET através da URL https://riskhomolog.braspag.com.br/Analysis/{Id}, enviando Id da transação que foi recebido na notficação da mudança de status.  
Para maior detalhes de como realizar o GET, consultar em Análise a sessão **Obtenção dos Detalhes da Análise**

![Notificação de Mudança de Status]({{ site.baseurl_root }}/images/braspag/af/postnotification.png)

## Hosts

**Test** https://riskhomolog.braspag.com.br  
**Live** https://risk.braspag.com.br

#### `POST`{:.http-post} Notificação de Mudança de Status 

Abaixo exemplo de mensagem que o servidor da Braspag enviará à URL cadastrada, e como deve ser a resposta enviada em caso de sucesso.

**REQUEST:**  

``` http
POST https://urlcadastrada.loja.com.br/Notification/ HTTP/1.1
Host: urlcadastrada.loja.com.br
Content-Type: application/json
```

``` json
{  
   "Id":"9004ba26-f1f1-e611-9400-005056970d6f"
}
```

**RESPONSE:**  

``` http
HTTP/1.1 200 Ok
```
