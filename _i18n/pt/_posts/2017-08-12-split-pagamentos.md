---
layout: manual
title: Manual de Integração
description: Manual integração técnica via API Split
search: true
toc_footers: false
categories: manual
sort_order: 3
tags:
  - Split de Pagamentos
---

# Split de Pagamentos

## Introdução

O **Split de Pagamentos** permite a divisão de uma transação entre diferentes participantes de uma venda.

Muito utilizado em Marketplaces, onde **o carrinho é composto por produtos de diferentes fornecedores e o valor total da venda deve ser dividido entre todos os participantes**.

| **Participantes** | **Descrição** |
|-----------|---------- |
| **Marketplace** | Responsável pelo carrinho. <BR> Possui acordos com **Subordinados** que fornecem os produtos presentes no carrinho.<BR> Define as taxas a serem descontadas sobre a venda de cada **Subordinado**.<BR> Pode participar de uma venda fornecendo seus próprios produtos. |
| **Subordinado** | Fornecedor dos produtos que compõem o carrinho.<BR>Recebe parte do valor da venda, descontadas as taxas acordadas com o **Marketplace**.<BR>  |
| **Braspag (Facilitador)** | Responsável pelo fluxo transacional.<BR> Define as taxas a serem descontadas sobre o valor total da venda realizada pelo **Marketplace**.<br> Responsável pela liquidação dos pagamentos para os **Subordinados** e **Marketplace**.|

No Split de Pagamentos o responsável pelo fluxo transacional é o facilitador.

O Marketplace se integra à Braspag para transacionar e informa como será dividida a transação entre cada participante, podendo ser no momento de captura ou em um momento posterior, conhecido como split pós-transacional, desde que seja dentro de um limite de tempo pré-estabelecido.

Com a transação capturada, a Braspag calcula o valor destinado a cada participante e repassa esses valores, no prazo estabelecido de acordo com cada produto (regime de pagamento\*), para cada envolvido na transação.

> **Regime de Pagamento**: Prazo estabelecido para liquidação de acordo com o produto (crédito ou débito) e bandeira.<BR>
> <BR>
> **Crédito**: Em até 31 dias.<BR>
> **Crédito Parcelado**: 1º parcela em até 31 dias, demais a cada 30.<BR>
> **Débito**: Em até 1 dia útil.<BR>

Para utilizar o Split de Pagamentos, o Marketplace deverá se cadastrar na Braspag juntamente com seus Subordinados. Após este processo, tanto o Marketplace quanto seus Subordinados possuirão um identificador único, conhecido como **MerchantId (MID)**, que deverá ser utlizado ao informar as regras de divisão de uma transação.

Na divisão de uma transação, devem ser informados:

* Os **identificadores dos Subordinados**.
* Os **valores de participação de cada Subordinado**. O somatório deverá ser igual ao valor total da transação.
* **Taxas** a serem aplicadas sobre o valor de cada Subordinado destinadas ao Marketplace. Estas deverão ser acordadas previamente entre o Marketplace e o Subordinado.
<BR>
O Marketplace também pode ser um participante da divisão, bastando informar seu identificador, passando o mesmo a ter também o papel de **Subordinado** e ter seus próprios produtos no carrinho.

### Taxas

<BR>
As taxas acordadas entre os participantes, podendo ser um **MDR(%)** e/ou uma **Taxa Fixa(R$)**, devem ser definidas no momento do cadastro do Marketplace e dos seus Subordinados junto à Braspag (Facilitador).

As mesmas poderão ser enviadas no momento transacional (captura) ou pós-transacional. Caso não sejam enviadas, serão consideradas as taxas cadastradas e acordadas previamente entre o participantes.

> **MDR (*Merchant Discount Rate*):** Percentual a ser descontado do valor de uma transação, definido por produto (Crédito / Débito), Bandeira e Faixa de Parcelamento.<BR>
> **Tarifa Fixa:** Valor em centavos a ser cobrado por transação capturada.

#### Braspag (Facilitador)

<BR>
A Braspag acordará um MDR e/ou uma Tarifa Fixa com o Marketplace a serem descontadas do valor total de cada transação.

O Marketplace, de conhecimento destas taxas, negociará também um MDR e/ou uma Tarifa Fixa juntamente com cada Subordinado, embutindo o MDR e/ou Tarifa acordados junto à Braspag (Facilitador).

O desconto da Tarifa Fixa, acordada entre o Marketplace e a Braspag, não é aplicado no valor total da transação, ou seja, a mesma não entra no cálculo da divisão e sim é debitada diretamente do montante que o Marketplace tem para receber junto à Braspag (Facilitador). O MDR entra no cálculo de divisão da transação, já que o mesmo deve estar embutido no MDR acordado entre o Marketplace e seus Subordinados.

> **Custo Marketplace:** MDR Braspag(%) + Tarifa Fixa(R$)

#### Marketplace

<BR>
O Marketplace é responsável por acordar as taxas a serem cobradas dos seus Subordinados, onde deve ser defindo um MDR maior ou igual ao MDR definido entre a Braspag (Facilitador) e o Marketplace, e uma Tarifa Fixa, que é opcional.

> **Custo Subordinado:** MDR Marketplace(%) + Tarifa Fixa(R$), onde o MDR Marketplace(%) considera o MDR Braspag(%).

### Exemplo

<BR>
Uma transação de **R$100,00**, realizada por um **Marketplace** com participação do **Subordinado 01**.

![SplitSample001](https://developercielo.github.io/images/split/split001.png)

Neste exemplo, foram assumidos os seguintes acordos:

**Taxa Braspag**: 2% MDR + R$0,10 Tarifa Fixa.  
**Taxa Marketplace**: 3,5% MDR (embutindo os 2% do MDR Braspag) + 0,30 Tarifa Fixa.

Após o split, cada participante terá sua agenda sensibilizada com os seguintes eventos:

**Subordinado**:  
Crédito: R$96,20 [Descontados o MDR e a Tarifa Fixa acordados com o Marketplace]

**Marketplace**:  
Crédito: R$1,80 [MDR aplicado sobre o valor do subordinado descontando o MDR acordado com a Braspag (Facilitador)]<BR>
Débito: R$0,10 [Tarifa Fixa acordada com a Braspag (Facilitador)]

**Braspag (Facilitador)**:  
Crédito: R$2,00 [MDR aplicado sobre o valor total da transação] 
Crédito: R$0,10 [Tarifa Fixa acordada com o Marketplace]

## Ambientes

<BR>
O Split de Pagamentos é parte da API Cielo E-Commerce. As operações transacionais continuam sendo realizadas pela API Cielo, sendo necessárias poucas alterações para utlização do Split de Pagamentos.

Para mais informações sobre a API Cielo E-Commerce, consulte o [Manual de Integração](https://developercielo.github.io/manual/cielo-ecommerce){:target="_blank"} da Plataforma.

OBS: Neste manual serão apresentados os contratos de integração da API Cielo E-Commerce, porém o foco da análise será nas operações referentes ao Split de Pagamentos.

### Sandbox

<BR>
**API Cielo E-Commerce**: https://apisandbox.cieloecommerce.cielo.com.br/<BR>
**API Cielo E-Commerce (Consultas)**: https://apiquerysandbox.cieloecommerce.cielo.com.br/<BR>
**API Split**: http://splitsandbox.braspag.com.br/<BR>
**Braspag OAUTH2 Server**: https://authhomolog.braspag.com.br/<BR>

### Produção

<BR>
**API Cielo E-Commerce**: https://api.cieloecommerce.cielo.com.br/<BR>
**API Cielo E-Commerce (Consultas)**: https://apiquery.cieloecommerce.cielo.com.br/<BR>
**API Split**: http://split.braspag.com.br/<BR>
**Braspag OAUTH2 Server**: https://auth.braspag.com.br/<BR>

## Autenticação

<BR>
O Split de Pagamentos utiliza como segurança o protocolo [OAUTH2](https://oauth.net/2/){:target="_blank"}, onde é necessário primeiramente obter um token de acesso, utlizando suas credenciais, que deverá posteriormente ser enviado à API Cielo e-Commerce e à API do Split.

Para obter um token de acesso:

1. Concatene o ClientId e ClientSecret: `ClientId:ClientSecret`.  
2. Codifique o resultado da concatenação em Base64.  
3. Realize uma requisição ao servidor de autorização:  

**Request**  

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{braspag-oauth2-server}/oauth2/token</span></aside>

```x-www-form-urlencoded
--header "Authorization: Basic {base64}"  
--header "Content-Type: application/x-www-form-urlencoded"  
grant_type=client_credentials
```

**Response**

```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbG.....WE1igNAQRuHAs",
    "token_type": "bearer",
    "expires_in": 1199
}
```

> O ClientId é o mesmo utilizado na integração com a API Cielo E-Commerce, conhecido como MerchantId. O ClientSecret deve ser obtido junto à Braspag.

O token retornado (access_token) deverá ser utilizado em toda requisição à API Cielo e-Commerce ou à API Split como uma chave de autorização. O mesmo possui uma validade de 20 minutos e deverá ser obtido um novo token toda vez que o mesmo expirar.  

## Integração

### Autorização  

<BR>
A autorização de uma transação no Split de Pagamentos deve ser realizada através da API Cielo E-Commerce seguindo os mesmos contratos descritos na documentação da plataforma.

Porém, para indentificar que a transação enviada se trata de uma transação de Split de Pagamentos, deve-se modificar o tipo de pagamento utilizado, conforme abaixo:

|                     | **Cartão de Crédito**  | **Cartão de Débito**  |
|---------------------|------------------------|-----------------------|
| **Transação Comum** | CreditCard             | DebitCard             |
| **Transação Split** | SplittedCreditCard     | SplittedDebitCard     |

> Atualmente o Split de Pagamentos está disponivel para os seguintes tipos de pagamento:
> * Cartão de Crédito
> <BR>
> Em breve estarão disponíveis:
> * Cartão de Débito
> * Boleto

Exemplo:

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}" 
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Installments":1,
     "SoftDescriptor":"Marketplace",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

| |

**Response**

```json
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "Comprador"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1209111409162",
        "ProofOfSale": "1409162",
        "AuthorizationCode": "359143",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-09 23:14:06",
        "Status": 1,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "4",
        "PaymentId": "56b0abb3-c3e8-4383-bffd-d99ef81b13a5",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/56b0abb3-c3e8-4383-bffd-d99ef81b13a5"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/56b0abb3-c3e8-4383-bffd-d99ef81b13a5/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/56b0abb3-c3e8-4383-bffd-d99ef81b13a5/void"
            }
        ]
    }
}
```

| |

Ao informar um tipo de pagamento referente ao Split, a API Cielo e-Commerce automaticamente identifica que a transação é referente ao Split de Pagamentos e realiza o fluxo transacional através da Braspag (Facilitador).

Caso a transação enviada seja marcada para captura automática, o nó contendo as regras de divisão deverá ser enviado, caso contrário a transação será dividida entre a Braspag (Facilitador) e o Marketplace. Posteriormente é permitido que o Marketplace envie novas regras de divisão para a transação através da API Split, desde que esteja dentro do período de tempo permitido.

**Exemplo 1)**  

Transação no valor de **R$100,00**, com captura automática, sem o nó contendo as regras de divisão.

**Taxa Braspag**: 2% MDR + R$0,10 Tarifa Fixa.

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Capture":true,
     "Installments":1,
     "SoftDescriptor":"Marketplace",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     }
   }
}
```

| |

**Response**

```json
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "Comprador"
    },
    "Payment": {
        "SplitPayments": [
            {
                "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                "Amount": 10000,
                "Fares": {
                    "Mdr": 2,
                    "Fee": 0
                },
                "Splits": [
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 10000
                    }
                ]
            }
        ],
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "123412******1231",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1209112426777",
        "ProofOfSale": "20171209112426777",
        "AuthorizationCode": "650711",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-09 23:24:24",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-09 23:24:26",
        "Status": 2,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "728e4d86-1806-4a1d-89b1-8139ff0769aa",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "PUT",
                "Rel": "split",
                "Href": "https://splitsandbox.braspag.com.br/api/transactions/728e4d86-1806-4a1d-89b1-8139ff0769aa/split"
            },
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/728e4d86-1806-4a1d-89b1-8139ff0769aa"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/728e4d86-1806-4a1d-89b1-8139ff0769aa/void"
            }
        ]
    }
}
```

| |

Neste caso, o Marketplace recebe o valor da transação descontado o MDR acordado com a Braspag (Facilitador). Como apresentado anteriormente, a Tarifa Fixa acordada entre o Marketplace e a Braspag é sensibilizada diretamente na agenda de ambas as partes.

![SplitSample002](https://developercielo.github.io/images/split/split002.png)

**Exemplo 2)**  

Transação no valor de **R$100,00** com o nó contendo as regras de divisão.

**Taxa Braspag**: 2% MDR + R$0,10 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR (embutindo os 2% do MDR Braspag) + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR (embutindo os 2% do MDR Braspag) + 0,15 Tarifa Fixa.  

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
  "MerchantOrderId":"2014111701",
  "Customer":{
      "Name":"Comprador"
   },
  "Payment":{
      "Type":"SplittedCreditCard",
      "Amount":10000,
      "Installments":1,
      "SoftDescriptor":"Marketplace",
      "Capture": true,
      "CreditCard":{
          "CardNumber":"4551870000000181",
          "Holder":"Teste Holder",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Visa"
      },
      "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
              "Mdr": 5,
              "Fee": 30 
            }
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 4000,
            "Fares": {
              "Mdr": 4,
              "Fee": 15 
            }
        }
    ]
  }
}
```

| |

**Response**

```json
{
    "MerchantOrderId": "2014111701",
    "Customer": {
        "Name": "Comprador"
    },
    "Payment": {
        "SplitPayments": [
            {
                "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                "Amount": 6000,
                "Fares": {
                    "Mdr": 5,
                    "Fee": 30
                },
                "Splits": [
                    {
                        "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                        "Amount": 5670
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 330
                    }
                ]
            },
            {
                "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                "Amount": 4000,
                "Fares": {
                    "Mdr": 4,
                    "Fee": 15
                },
                "Splits": [
                    {
                        "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                        "Amount": 3825
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 175
                    }
                ]
            }
        ],
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "455187******0181",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1210031135775",
        "ProofOfSale": "20171210031135775",
        "AuthorizationCode": "605861",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-10 15:11:34",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-10 15:11:35",
        "Status": 2,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "ef7a7cf9-b66b-4772-b022-052bdcf3e9b0",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "PUT",
                "Rel": "split",
                "Href": "https://splitsandbox.braspag.com.br/api/transactions/ef7a7cf9-b66b-4772-b022-052bdcf3e9b0/split"
            },
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/ef7a7cf9-b66b-4772-b022-052bdcf3e9b0"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/ef7a7cf9-b66b-4772-b022-052bdcf3e9b0/void"
            }
        ]
    }
}
```

| |

Abaixo como ficaram as divisões e como foram as agendas de cada participante foram sensibilizadas.

![SplitSample003](https://developercielo.github.io/images/split/split003.png)

### Modelos de Split

O Split de Pagamentos disponibiliza dois modelos para divisão da transação entre os participantes:

| Tipo                       | Descrição                                                                                                                          |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Split Transacional**     | O **Marketplace** envia na autorização (captura automática) ou no momento de captura as regras de divisão.                         |
| **Split Pós-Transacional** | O **Marketplace** envia as regras de divisão após a captura da transação.

> No Split de Pagamentos a divisão é realizada somente para transações capturadas, ou seja, as regras de divisão só serão consideradas para autorizações com captura automática e no momento da captura de uma transação. Caso seja informado no momento de uma autorização sem captura automática, as regras de divisão serão desconsideradas.

#### Transacional

<BR>
No Split Transacional é necessário que o Marketplace envie um "nó" adicional na integração da API Cielo E-Commerce, como apresentado em exemplos anteriores, informando as regras de divisão da transação.

```json
"SplitPayments":[
    {
        "SubordinateMerchantId" :"MID Subordinate 01",
        "Amount":10000,
        "Fares":{
            "Mdr":5,
            "Fee":0
        }
    }
]
```

| Propriedade                             | Descrição                                                                                               | Tipo    | Tamanho | Obrigatório |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|-------------|
| `SplitPayments.SubordinateMerchantId`   | **MerchantId** (Identificador) do **Subordinado**.                                                      | Guid    | 36      | Sim         |
| `SplitPayments.Amount`                  | Parte do valor total da transação referente a participação do **Subordinado**, em centavos.             | Inteiro | -       | Sim         |
| `SplitPayments.Fares.Mdr`               | **MDR(%)** do **Marketplace** a ser descontado do valor referente a participação do **Subordinado**     | Decimal | -       | Não         |
| `SplitPayments.Fares.Fee`               | **Tarifa Fixa(R$)** a ser descontada do valor referente a participação do **Subordinado**, em centavos. | Inteiro | -       | Não         |

Como resposta, A API Cielo E-Commerce retornará um nó contento as regras de divisão enviadas e os valores a serem recebidos pelo Marketplace e seus Subordinados:

```json
"SplitPayments": [
    {
        "SubordinateMerchantId": "MID Subordinate 01",
        "Amount": 10000,
        "Fares": {
            "Mdr": 5,
            "Fee": 0
        },
        "Splits": [                
            {
                "MerchantId": "MID do Marketplace",
                "Amount": 500,
            },
            {
                "MerchantId": "MID Subordinate 01",
                "Amount": 9500,
            }
        ]
    }
]
```

| Propriedade                                  | Descrição                                                                                   | Tipo   | Tamanho | Obrigatório |
|----------------------------------------------|---------------------------------------------------------------------------------------------|--------|---------|-------------|
| `SplitPayments.Splits.SubordinateMerchantId` | **MerchantId** (Identificador) do **Subordinado** ou **Marketplace**.                       | Guid   | 36      | Sim         |
| `SplitPayments.Splits.Amount`                | Parte do valor calculado da transação a ser recebido pelo **Subordinado** ou **Marketplace**, já descontando todas as taxas (MDR e Tarifa Fixa) | Inteiro | -      | Sim         |

**Exemplo 3)**  

Transação no valor de **R$100,00** com o nó contendo as regras de divisão e o Marketplace participando da venda.

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR, já embutindo os 2% do MDR Braspag + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR, já embutindo os 2% do MDR Braspag + 0,15 Tarifa Fixa.  

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
  "MerchantOrderId":"2014111701",
  "Customer":{
      "Name":"Comprador"
   },
  "Payment":{
      "Type":"SplittedCreditCard",
      "Amount":10000,
      "Installments":1,
      "SoftDescriptor":"Marketplace",
      "Capture": true,
      "CreditCard":{
          "CardNumber":"4551870000000181",
          "Holder":"Teste Holder",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Visa"
      },
      "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 4500,
            "Fares": {
              "Mdr": 5,
              "Fee": 30 
            }
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 3000,
            "Fares": {
              "Mdr": 4,
              "Fee": 15 
            }
        },
        {
            "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
            "Amount": 2500
        }
    ]
  }
}
```

||

**Response**

```json
{
    "MerchantOrderId": "2014111701",
    "Customer": {
        "Name": "Comprador"
    },
    "Payment": {
        "SplitPayments": [
            {
                "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                "Amount": 4500,
                "Fares": {
                    "Mdr": 5,
                    "Fee": 30
                },
                "Splits": [
                    {
                        "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                        "Amount": 4245
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 255
                    }
                ]
            },
            {
                "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                "Amount": 3000,
                "Fares": {
                    "Mdr": 4,
                    "Fee": 15
                },
                "Splits": [
                    {
                        "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                        "Amount": 2865
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 135
                    }
                ]
            },
            {
                "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                "Amount": 2500,
                "Fares": {
                    "Mdr": 2,
                    "Fee": 0
                },
                "Splits": [
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 2500
                    }
                ]
            }
        ],
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": true,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "455187******0181",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "1210035540764",
        "ProofOfSale": "20171210035540764",
        "AuthorizationCode": "859182",
        "SoftDescriptor": "Marketplace",
        "Provider": "Simulado",
        "Amount": 10000,
        "ReceivedDate": "2017-12-10 15:55:38",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-10 15:55:40",
        "Status": 2,
        "IsSplitted": true,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "6",
        "PaymentId": "34895364-e269-47ad-b779-7e122ed40a9a",
        "Type": "SplittedCreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "PUT",
                "Rel": "split",
                "Href": "https://splitsandbox.braspag.com.br/api/transactions/34895364-e269-47ad-b779-7e122ed40a9a/split"
            },
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/34895364-e269-47ad-b779-7e122ed40a9a"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/34895364-e269-47ad-b779-7e122ed40a9a/void"
            }
        ]
    }
}
```

||

Neste exemplo, onde o Marketplace também participa da venda, não é necessário informar as taxas a serem descontadas sobre o valor da venda referente ao próprio marketplace. O Split indentifica que o valor informado é do próprio Marketplace, através do seu identificador, e realiza os cálculos corretamente.

![SplitSample004](https://developercielo.github.io/images/split/split004.png)

#### Pós-Transacional

<BR>
Neste modelo o Marketplace poderá enviar as regras de divisão da transação após a mesma ser capturada.

A divisão pós-transacional é possível somente para transações com **Cartão de Crédito** e poderá ser realizada dentro de um intervalo de tempo determinado a partir da data de captura da transação.

Para transações com **Cartão de Crédito**, este período é de **25 dias** se o Marketplace possuir um regime padrão de pagamentos. Caso tenha um regime personalizado, o período deverá ser acordado entre as partes (Marketplace e Braspag (Facilitador)).

**Request**  

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-split}/api/transactions/{PaymentId}/split</span></aside>

```json
--header "Authorization: Bearer {access_token}"
[
    {
        "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
        "Amount": 6000,
        "Fares": {
            "Mdr": 5,
            "Fee": 30 
        }
    },
    {
        "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
        "Amount":4000,
        "Fares":{
            "Mdr":4,
            "Fee":15
        }
    }
]
```

||

**Response**

```json
{
    "PaymentId": "c96bf94c-b213-44a7-9ea3-0ee2865dc57e",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            },
            "Splits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Amount": 5670
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 330
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 4000,
            "Fares": {
                "Mdr": 4,
                "Fee": 15
            },
            "Splits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Amount": 3825
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 175
                }
            ]
        }
    ]
}
```

||

O nó referente ao Split no Split Pós-transacional, tanto no contrato de request quanto de response, é o mesmo retornado na divisão no Split Transacional, apresentado anteriormente.

> O Marketplace poderá informar as regras de divisão da transação mais de uma vez desde que esteja dentro do período de tempo permitido, que é de **25 dias** para Cartão de Crédito se estiver enquadrado no regime de pagamento padrão. Para transações com Cartão de Débito a divisão poderá ser realizada somente no momento transacional.

### Consulta

Para consultar uma transação, utilize o próprio serviço de consulta da API Cielo E-Commerce.

**Request**

<aside class="request"><span class="method get">POST</span> <span class="endpoint">{api-cielo-ecommerce-consulta}/1/sales/{PaymentId}</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
    "MerchantOrderId": "2014111701",
    "IsSplitted": true,
    "Customer": {
        "Name": "Comprador",
        "Address": {}
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0181",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2021",
            "Brand": "Visa"
        },
        "ProofOfSale": "20171210061821319",
        "Tid": "1210061821319",
        "AuthorizationCode": "379918",
        "PaymentId": "507821c5-7067-49ff-928f-a3eb1e256148",
        "Type": "SplittedCreditCard",
        "Amount": 10000,
        "ReceivedDate": "2017-12-10 18:18:18",
        "CapturedAmount": 10000,
        "CapturedDate": "2017-12-10 18:18:21",
        "Currency": "BRL",
        "Country": "BRA",
        "Provider": "Simulado",
        "Status": 2,
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/507821c5-7067-49ff-928f-a3eb1e256148"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/507821c5-7067-49ff-928f-a3eb1e256148/void"
            },
            {
                "Method": "PUT",
                "Rel": "sales.split",
                "Href": "https://splitsandbox.braspag.com.br/api/transactions507821c5-7067-49ff-928f-a3eb1e256148/split"
            }
        ],
        "SplitPayments": [
            {
                "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                "Amount": 6000,
                "Fares": {
                    "Mdr": 5,
                    "Fee": 30
                },
                "Splits": [
                    {
                        "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                        "Amount": 5670
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 330
                    }
                ]
            },
            {
                "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                "Amount": 4000,
                "Fares": {
                    "Mdr": 4,
                    "Fee": 15
                },
                "Splits": [
                    {
                        "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                        "Amount": 3825
                    },
                    {
                        "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                        "Amount": 175
                    }
                ]
            }
        ]
    }
}
```

||

### Captura

<BR>
Ao capturar uma transação do Split de Pagamentos, deve-se informar as regras de divisão da transação. Caso as regras não sejam informadas, o Split interpretará que todo o valor é referente ao próprio Marketplace. 

#### Captura Total

<BR>
Na captura total de uma transação, o somatório dos valores de participação de cada subordinado deverá ser igual ao valor total da transação enviado no momento da autorização.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture</span></aside>

```json
--header "Authorization: Bearer {access_token}" 
{
    "SplitPayments":[
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30 
            }
        },
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
}
```

||

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 6000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            },
            "Splits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Amount": 5670
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 330
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 4000,
            "Fares": {
                "Mdr": 4,
                "Fee": 15
            },
            "Splits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Amount": 3825
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 175
                }
            ]
        }
    ],
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/db14bf98-5ebd-43b5-8ba6-205c30ec1c16"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/db14bf98-5ebd-43b5-8ba6-205c30ec1c16/void"
        }
    ]
}
```

||

#### Captura Parcial

<BR>
Na captura parcial de uma transação, o somatório dos valores de participação de cada subordinado deverá ser igual ao valor total a ser capturado. Caso nenhuma divisão seja informada, o Split interpretará que todo o valor é referente ao próprio Marketplace.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture?amount={amount}</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

O exemplo abaixo captura parcialmente o valor de R$80,00 de uma transação realizada no valor de R$100,00.

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture?amount=8000</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
    "SplitPayments":[
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 5000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30 
            }
        },
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount":3000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
}
```

||

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Amount": 5000,
            "Fares": {
                "Mdr": 5,
                "Fee": 30
            },
            "Splits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Amount": 4720
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 280
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "Amount": 3000,
            "Fares": {
                "Mdr": 4,
                "Fee": 15
            },
            "Splits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Amount": 2865
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 135
                }
            ]
        }
    ],
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/7bd7fc3a-4385-45cf-8a45-ec0349716b68"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/7bd7fc3a-4385-45cf-8a45-ec0349716b68/void"
        }
    ]
}
```

||

Como explicitado anteriormente, se realizada uma captura total ou parcial sem informar as regras de divisão, o Split interpreta que todo o valor é destinado ao próprio Marketplace.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}/1/sales/{PaymentId}/capture?amount=8000</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "6",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments": [
        {
            "SubordinateMerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
            "Amount": 8000,
            "Fares": {
                "Mdr": 2,
                "Fee": 0
            },
            "Splits": [
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Amount": 8000
                }
            ]
        }
    ],
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/ee849761-d758-4f12-80bf-6ceae3a751ec"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/ee849761-d758-4f12-80bf-6ceae3a751ec/void"
        }
    ]
}
```

||

### Cancelamento

<BR>
Ao cancelar uma transação do Split de Pagamentos o Marketplace deve informar, para um cancelamento parcial, qual o valor deve ser cancelado de cada participante da transação. Para um cancelamento total, esta informação não é necessária, já que será cancelado o valor total e consequentemente o valor total de cada Subordinado.

#### Cancelamento Total

<BR>
No cancelamento total de uma transação, será cancelado o valor total da transação e consequentemente o valor total de cada Subordinado.

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}https://{API Cielo E-Commerce}/1/sales/{PaymentId}/void</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "Status": 10,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/019efd18-c69a-4107-b5d7-e86564460cc4"
        }
    ],
    "VoidSplitPayments": [
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount": 4000,
            "VoidedSplits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "VoidedAmount": 3825
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 175
                }
            ]
        },
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "VoidedAmount": 6000,
            "VoidedSplits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "VoidedAmount": 5670
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 330
                }
            ]
        }
    ]
}
```

||

#### Cancelamento Parcial

<BR>
No cancelamento parcial, o somatório dos valores cancelados definidos para cada Subordinado deve ser igual ao valor do cancelamento parcial. 

**Request**

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}https://{API Cielo E-Commerce}/1/sales/{PaymentId}/void?amount={amount}</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

No exempo abaixo é cancelado o valor de R$25,00 de uma transação capturada no valor de R$100,00.

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">{api-cielo-ecommerce}https://{API Cielo E-Commerce}/1/sales/{PaymentId}/void?amount=2500</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "VoidedAmount": 1500
        },
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount":1000
        }
     ]
}
```

| Propriedade                                 | Descrição                                                                                               | Tipo    | Tamanho | Obrigatório |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|-------------|
| `VoidSplitPayments.SubordinateMerchantId`   | **MerchantId** (Identificador) do **Subordinado**.                                                      | Guid    | 36      | Sim         |
| `VoidedAmount.Amount`                       | Total ou parte do valor destinado ao **Subordinado** a ser cancelado, em centavos.                      | Inteiro | -       | Sim         |

**Response**

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/c10ee5e5-6179-424c-bbf2-1a2319a8f7c3"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/c10ee5e5-6179-424c-bbf2-1a2319a8f7c3/void"
        }
    ],
    "VoidSplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "VoidedAmount": 1500,
            "VoidedSplits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "VoidedAmount": 1417
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 83
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount": 1000,
            "VoidedSplits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "VoidedAmount": 956
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "VoidedAmount": 44
                }
            ]
        }
    ]
}
```

||

Não é obrigatório informar todos os Subordinados no cancelamento parcial. Pode-se informar apenas os subordinados para os quais se deseja cancelar totalmente ou parte do valor destinado aos mesmos na transação. No exemplo acima poderia ser informado, por exemplo, apenas o segundo subordinado, conforme exemplo abaixo:

```json
{
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId" :"2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "VoidedAmount":1000
        }
     ]
}
```

||

> Ao cancelar parcialmente parte de um valor destinado a um Subordinado, é cancelada proporcionalmente também a Tarifa Fixa que o Marketplace tem a receber.

## Agenda Financeira

<BR>
No Split de Pagamentos, o responsável por realizar o repasse dos valores (liquidação) a cada um dos participantes de uma venda é a Braspag (Facilitador).

A Braspag irá gerar uma agenda financeira que poderá ser consultada a qualquer momento pelo Marketplace e/ou Subordinados.

A agenda é composta por eventos de Crédito e Débito que são gerados de acordo com as operações efetuadas e o regime de pagamento acordado.

Eventos de Crédito:

| Evento             | Descrição                                                                                               | 
|--------------------|---------------------------------------------------------------------------------------------------------|
| `Credit`           | Lançamento de crédito das parcelas de uma transação.                                                    |
| `FeeCredit`        | Lançamento de crédito da Tarifa Fixa acordada entre o Marketplace e a Braspag (Facilitador).            |
| `AdjustmentCredit` | Lançamento de um crédito como ajuste                                                                    |

Eventos de Débito:

| Evento            | Descrição                                                                                               | 
|-------------------|---------------------------------------------------------------------------------------------------------|
| `FeeDebit`        | Lançamento de débito da Tarifa Fixa acordada entre o Marketplace e a Braspag (Facilitador).             |
| `RefundDebit`     | Lançamento de débito de um cancelamento.                                                                |
| `ChargebackDebit` | Lançamento de débito de um chargeback.                                                                  |
| `AdjustmentDebit` | Lançamento de um débito como ajuste.                                                                    |

### Consultar Transações

<BR>
O Split de Pgamentos permite consultar a agenda financeira de várias transações ou de uma transação específica.

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{{apiSplit}}/schedules/transactions?initialDate={initialDate}&finalDate={finalDate}&pageIndex={pageIndex}&pageSize={pageSize}&scheduleStatus={scheduleStatus}&merchantIds={merchantId}</span></aside>

| Parâmetro        | Descrição                                                                     | Tipo    | Formato    | Obrigatório | Valor Padrão
|------------------|-------------------------------------------------------------------------------|---------|------------|-------------|
| `InitialDate`    | Data inicial a ser consultada, considerando a data de captura das transações. | Data    | YYYY-MM-DD | Não         | CurrentDate
| `FinalDate`      | Data final a ser consultada, considerando a data de captura das transações.   | Data    | YYYY-MM-DD | Não         | CurrentDate
| `PageIndex`      | Página a ser consultada.                                                      | Inteiro | -          | Não         | 1
| `PageSize`       | Tamanho da página.                                                            | Inteiro | -          | Não         | 25
| `ScheduleStatus` | Status do evento. Vide status possíveis abaixo.                               | String  | -          | Não         | Scheduled
| `MerchantIds`    | Lojas a seren consideradas na consulta.                                       | Guid    | -          | Não         | -

Para informar várias lojas na consulta, basta repetir o parâmetro "merchantIds". Caso não seja informada nenhuma loja, será considerada a loja utilizada na autenticação à API Split.

Um evento poderá estar em um dos seguintes status na agenda financeira:

* **Scheduled**: Agendado 
* **Pending**: Aguardando confirmação de liquidação
* **Settled**: Liquidado
* **Error**: Erro de liquidação na instituição financeira

<BR>
**Request**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{{api-split}}/schedules/transactions?initialDate=2017-12-01&finalDate=2017-12-31&merchantIds=e4db3e1b-985f-4e33-80cf-a19d559f0f60&merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"  
```

**Response**

```json
{
    "PageCount": 1,
    "PageSize": 25,
    "PageIndex": 1,
    "Transactions": [
        {
            "PaymentId": "24afaaaf-f2a1-40a5-bb25-f914fa623c4c",
            "CapturedDate": "2017-12-01",
            "Schedules": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Date": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 24357,
                    "InstallmentNumber": 1,
                    "Event": "Credit",
                    "EventDescription": "Credit"
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Date": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 1450,
                    "InstallmentNumber": 1,
                    "Event": "Credit",
                    "EventDescription": "Credit"
                },
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Date": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 38480,
                    "InstallmentNumber": 1,
                    "Event": "Credit",
                    "EventDescription": "Credit"
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "Date": "2017-12-21",
                    "Installments": 2,
                    "InstallmentAmount": 5,
                    "InstallmentNumber": 1,
                    "Event": "FeeDebit",
                    "EventDescription": "FeeDebit"
                },
            ]
        }
    ]
}
```

| Propriedade                                      | Descrição                                                                                               | Tipo    | Tamanho | 
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `Transactions[].PaymentId`                       | Identificador da transação.                                                                             | Guid    | 36      |
| `Transactions[].CaptureDate`                     | Data de captura da transação.                                                                           | Data    | -       |
| `Transactions[].Schedules[].MerchantId`          | Identificador da loja.                                                                                  | Guid    | 36      |
| `Transactions[].Schedules[].Date`                | Data de liquidação prevista.                                                                            | Data    | -       |
| `Transactions[].Schedules[].Installments`        | Número de parcelas a liquidar.                                                                          | Inteiro | -       |
| `Transactions[].Schedules[].InstallmentsAmount`  | Valor da parcela a liquidar.                                                                            | Inteiro | -       |
| `Transactions[].Schedules[].InstallmentNumber`   | Número da parcela a liquidar.                                                                           | Inteiro | -       |
| `Transactions[].Schedules[].Event`               | Identificador do evento.                                                                                | Inteiro | -       |
| `Transactions[].Schedules[].EventDescription`    | Descrição do evento.                                                                                    | String  | -       |

Para consultar a agenda de uma transação específica basta informar o identificador da transação na requisição.

**Request**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{api-split}/schedules/transactions/{PaymentId}?merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"
```

**Response**

```json
{
    "PageCount": 1,
    "PageSize": 25,
    "PageIndex": 1,
    "Transactions": [
        {
            "PaymentId": "cd2309d3-3fec-4816-aec7-bcb6d51a0988",
            "CapturedDate": "2017-12-11",
            "Schedules": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "Date": "2018-01-11",
                    "Installments": 1,
                    "InstallmentAmount": 5790,
                    "InstallmentNumber": 1,
                    "Event": 1,
                    "EventDescription": "Credit"
                },
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "Date": "2018-01-11",
                    "Installments": 1,
                    "InstallmentAmount": 3790,
                    "InstallmentNumber": 1,
                    "Event": 1,
                    "EventDescription": "Credit"
                }
            ]
        }
    ]
}
```

||

### Consultar Eventos 

<BR>
A API Split permite consultar o que uma loja tem a receber dentro de um intervalo de datas.

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{{apiSplit}}/schedules?initialDate={initialDate}&finalDate={finalDate}&pageIndex={pageIndex}&pageSize={pageSize}&scheduleStatus={scheduleStatus}&merchantIds={merchantId}</span></aside>

| Parâmetro        | Descrição                                                                            | Tipo    | Formato    | Obrigatório | Valor Padrão
|------------------|--------------------------------------------------------------------------------------|---------|------------|-------------|
| `InitialDate`    | Data inicial a ser consultada, considerando a data prevista de liquidação do evento. | Data    | YYYY-MM-DD | Não         | CurrentDate
| `FinalDate`      | Data final a ser consultada, considerando a data prevista de liquidação do evento.   | Data    | YYYY-MM-DD | Não         | CurrentDate
| `PageIndex`      | Página a ser consultada. Valores possíveis: 25, 50, 100.                             | Inteiro | -          | Não         | 1
| `PageSize`       | Tamanho da página.                                                                   | Inteiro | -          | Não         | 25
| `ScheduleStatus` | Status do evento. Vide status possíveis abaixo.                                      | String  | -          | Não         | Scheduled
| `MerchantIds`    | Lojas a seren consideradas na consulta.                                              | Guid    | -          | Não         | -

**Resquest**

<aside class="request"><span class="method get">GET</span> <span class="endpoint">{{apiSplit}}/schedules/transactions?initialDate=2017-12-01&finalDate=2018-12-31&merchantIds=e4db3e1b-985f-4e33-80cf-a19d559f0f60&merchantIds=7c7e5e7b-8a5d-41bf-ad91-b346e077f769&merchantIds=2b9f5bea-5504-40a0-8ae7-04c154b06b8b</span></aside>

```x-www-form-urlencoded
--header "Authorization: Bearer {access_token}"
```

**Response**

```json
{
    "PageCount": 14,
    "PageSize": 5,
    "PageIndex": 1,
    "Schedules": [
        {
            "PaymentId": "41606b10-9698-4cd3-b0bd-ffa94d385acf",
            "MerchantId": "2b8e9c38-0d9e-4f30-adac-fef3601632e4",
            "Date": "2018-01-01",
            "Installments": 10,
            "InstallmentAmount": 1,
            "InstallmentNumber": 4,
            "Event": 4,
            "EventDescription": "FeeDebit"
        },
        {
            "PaymentId": "1129bb06-38d6-4978-93a0-fff4659032f4",
            "MerchantId": "2b8e9c38-0d9e-4f30-adac-fef3601632e4",
            "Date": "2018-01-01",
            "Installments": 1,
            "InstallmentAmount": 10,
            "InstallmentNumber": 1,
            "Event": 4,
            "EventDescription": "FeeDebit"
        },
        {
            "PaymentId": "41606b10-9698-4cd3-b0bd-ffa94d385acf",
            "MerchantId": "2b8e9c38-0d9e-4f30-adac-fef3601632e4",
            "Date": "2018-01-01",
            "Installments": 10,
            "InstallmentAmount": 20,
            "InstallmentNumber": 4,
            "Event": 1,
            "EventDescription": "Credit"
        },
        {
            "PaymentId": "1129bb06-38d6-4978-93a0-fff4659032f4",
            "MerchantId": "2b8e9c38-0d9e-4f30-adac-fef3601632e4",
            "Date": "2018-01-01",
            "Installments": 1,
            "InstallmentAmount": 1548,
            "InstallmentNumber": 1,
            "Event": 1,
            "EventDescription": "Credit"
        },
        {
            "PaymentId": "24afaaaf-f2a1-40a5-bb25-f914fa623c4c",
            "MerchantId": "2b8e9c38-0d9e-4f30-adac-fef3601632e4",
            "Date": "2018-01-01",
            "Installments": 2,
            "InstallmentAmount": 5,
            "InstallmentNumber": 2,
            "Event": 4,
            "EventDescription": "FeeDebit"
        }
    ]
}
```

| Propriedade                       | Descrição                                                                                               | Tipo    | Tamanho | 
|-----------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `Schedules[].PaymentId`           | Identificador da transação.                                                                             | Guid    | 36      |
| `Schedules[].MerchantId`          | Identificador da loja.                                                                                  | Guid    | 36      |
| `Schedules[].Date`                | Data de liquidação prevista.                                                                            | Data    | -       |
| `Schedules[].Installments`        | Número de parcelas a liquidar.                                                                          | Inteiro | -       |
| `Schedules[].InstallmentsAmount`  | Valor da parcela a liquidar.                                                                            | Inteiro | -       |
| `Schedules[].InstallmentNumber`   | Número da parcela a liquidar.                                                                           | Inteiro | -       |
| `Schedules[].Event`               | Identificador do evento.                                                                                | Inteiro | -       |
| `Schedules[].EventDescription`    | Descrição do evento.                                                                                    | String  | -       |

### Ajustes

<BR>
A API do Split permite que sejam lançados ajustes à crédito e à débito nas agendas dos Subordinados.

Quando lançado um ajuste à Crédito para um Subordinado, automaticamente é lançado um ajuste à Débito para o Marketplace na mesma data, e vice-versa.

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-cielo-ecommerce}/schedules/adjustment/</span></aside>

```json
--header "Authorization: Bearer {access_token}"
{
    "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
    "Amount": 10000,
    "Event": "AdjustmentDebit",
    "Date": "2017-12-20" 
}
```

| Propriedade                       | Descrição                                                                                               | Tipo    | Tamanho | 
|-----------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `SubordinateMerchantId`           | Identificador do Subordinado.                                                                           | Guid    | 36      |
| `Amount`                          | Valor do ajuste, em centavos.                                                                           | Inteiro | -       |
| `Event`                           | AdjustmentDebit (Débito) ou AdjustamentCredit (Crédito).                                                | String  | -       |
| `Date`                            | Data prevista de liquidação.                                                                            | Data    | -       |

**Response**

```json
{
    "Schedules" : [
        {
            "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "Date": "2017-12-20",
            "Installments": 1,
            "InstallmentAmount": 10000,
            "InstallmentNumber": 1,
            "Event": 12,
            "EventDescription": "AdjustmentDebit"
        },
        {
            "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
            "Date": "2017-12-20",
            "Installments": 1,
            "InstallmentAmount": 10000,
            "InstallmentNumber": 1,
            "Event": 11,
            "EventDescription": "AdjustmentCredit"
        }
    ]
}
```

||

## Chargeback

<BR>
No Split de Pagamentos o Marketplace pode definir se assumirá o chargeback ou o repassará para seus Subordinados, desde que acordado previamente entre as partes.

Se o Marketplace optar por repassar para os Subordinados, o Chargeback Total é sensibilizado automaticamente na agenda dos mesmos. Caso contrário o chargeback será sensibilizado automaticamente na agenda do Marketplace, como acontece com um Charback Parcial.

O Marketplace pode decidir ainda repassar o Chargeback para seus subordinados. Para isso A API Split disponibiliza um serviço onde o Marketplace pode informar como dividir o valor do chargeback entre os subordinados, caso seja um Chargeback Parcial.  

No exemplo abaixo ocorreu um Chargeack Parcial no valor de R$60,00 de uma transação com valor capturado de R$100,00.

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{api-split}/api/chargebacks/{ChargebackId}/split</span></aside>

```json
[
  {
    "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
    "ChargebackAmount": 4000
  },
  {
    "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
    "ChargebackAmount": 2000
  }
]

```

| Propriedade                       | Descrição                                                                                               | Tipo    | Tamanho | 
|-----------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `SubordinateMerchantId`           | Identificador do Subordinado.                                                                           | Guid    | 36      |
| `ChargebackAmount`                | Valor do chargeback que deverá ser repassado ao Subordinado, em centavos.                               | Inteiro | -       |

**Response**

```json
{
    "ChargebackSplitPayments": [
        {
            "SubordinateMerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
            "ChargebackAmount": 4000,
            "ChargebackSplits": [
                {
                    "MerchantId": "7c7e5e7b-8a5d-41bf-ad91-b346e077f769",
                    "ChargebackAmount": 3780 
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "ChargebackAmount": 220
                }
            ]
        },
        {
            "SubordinateMerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
            "ChargebackAmount": 2000,
            "ChargebackSplits": [
                {
                    "MerchantId": "2b9f5bea-5504-40a0-8ae7-04c154b06b8b",
                    "ChargebackAmount": 1912 
                },
                {
                    "MerchantId": "e4db3e1b-985f-4e33-80cf-a19d559f0f60",
                    "ChargebackAmount": 88
                }
            ]
        }
    ]
}
```

| Propriedade                                | Descrição                                                                                               | Tipo    | Tamanho | 
|--------------------------------------------|---------------------------------------------------------------------------------------------------------|---------|---------|
| `ChargebackSplitPayments.ChargebackSplits` | Lista contendo a divisão do chargeback para cada participante.                                          | Guid    | 36      |

## Notificação

<BR>
**Em breve** será disponibilizado o serviço de notificação que informará os eventos que ocorrem em uma transação de Split:

* Geração de agenda
* Chargeback
* Liquidação

<BR>
Para ser notificado com relação ao status de uma transação, utilize o [serviço de notificação](https://developercielo.github.io/manual/cielo-ecommerce#post-de-notificação) da API Cielo E-Commerce.
