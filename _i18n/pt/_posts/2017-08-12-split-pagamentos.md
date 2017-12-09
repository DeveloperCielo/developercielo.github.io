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
language_tabs:
  json: JSON
---

# Split de Pagamentos

## Introdução

### Definição

<BR>
O **Split de Pagamentos** permite a divisão de uma transação entre diferentes participantes de uma venda.

Muito utilizado em Marketplaces, onde **o carrinho é composto por produtos de diferentes fornecedores e o valor total da venda deve ser dividido entre os todos participantes**.

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
O Marketplace é responsável por acordar as taxas a serem cobradas dos seus Subordinados, onde deve ser defindo um MDR maior ou igual ao MDR definido entre a Braspag (Facilitador) e o Marketplace e uma Tarifa Fixa, que é opcional.

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
Crédito: R$1,80 [MDR aplicado sobre o valor do subordinado descontando o MDR acordado com a Braspag (Facilitador)]
Débito: R$0,10 [Tarifa Fixa acordada com a Braspag (Facilitador)]

**Braspag (Facilitador)**:  
Crédito: R$2,00 [MDR aplicado sobre o valor total da transação] 
Crédito: R$0,10 [Tarifa Fixa acordad com o Marketplace]

A Tarifa Fixa acordada entre o Marketplace e o Subordinado é calculada diretamente sobre os valores que cada um tem a receber, ou seja, a tarifa é descontada após o cálculo do percentual acordado entre as duas partes. Já a Tarifa Fixa acordada entre a Braspag (Facilitador) e o Marketplace não é descontada do valor da transação, a mesma é sensibilizada na agenda de ambas as partes com um crédito e um débito, respectivamente.  

## Integração

<BR>
O Split de Pagamentos é parte da API Cielo E-Commerce, desenvolvida utilizando a arquitetura REST e JSON como mensageria. Para mais informações sobre a API Cielo E-Commerce, consulte o [Manual de Integração](https://developercielo.github.io/Webservice-3.0/#criando-uma-transação-simples){:target="_blank"} da Plataforma.

OBS: Neste manual serão apresentados os contratos de integração da API Cielo E-Commerce, porém o foco da análise será nas operações referentes ao Split de Pagamentos.

### Ambientes

> **SANDBOX**
>
> **API Cielo E-Commerce**:  
> https://apisandbox.cieloecommerce.cielo.com.br/
>
> **API Cielo E-Commerce (Consulta)**:  
> https://apiquerysandbox.cieloecommerce.cielo.com.br/
>
> **API Split**:  
> http://splitsandbox.braspag.com.br/
>
> **OAUTH2 Server**:  
> https://authhomolog.braspag.com.br/

### Autorização  

A autorização de uma transação no Split de Pagamentos deve ser realizada através da API Cielo E-Commerce seguindo os mesmos contratos descritos na documentação da plataforma.

Porém, para indentificar que a transação enviada se trata de uma transação de Split de Pagamentos, deve-se modificar o tipo de pagamento utilizado, conforme abaixo:

|=                     | **Cartão de Crédito** | **Cartão de Débito**  |
|---------------------|------------------------|-----------------------|
| **Transação Comum** | CreditCard             | DebitCard             |
| **Transação Split** | SplittedCreditCard     | SplittedDebitCard     |

> Atualmente o Split de Pagamentos está disponivel para os seguintes tipos de pagamento:
> * Cartão de Crédito  
> Em breve estarão disponíveis:
> * Cartão de Débito
> * Boleto

Exemplo:

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
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

Ao informar um tipo de pagamento referente ao Split, a API Cielo e-Commerce automaticamente identifica que a transação é referente ao Split de Pagamentos e realiza o fluxo transacional pela Braspag (Facilitador).

Caso a transação enviada seja marcada para captura automática, o nó contendo as regras de divisão deverá ser enviado, caso contrário a transação será dividida entre a **Braspag** e o **Marketplace**. Posteriormente é permitido que o **Marketplace** envie novas regras de divisão para a transação através da API de divisão pós-transacional, desde que esteja dentro do período de tempo permitido.

**Exemplo 1)**  

Transação no valor de **R$100,00** sem o nó contendo as regras de divisão.

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Capture":true,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
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

Neste caso o **Marketplace** recebe o valor da transação descontado o MDR acordado com a **Braspag**. Como apresentado anteriormente, a Tarifa Fixa acordada entre o **Marketplace** e a **Braspag** é sensibilizada diretamente na agenda.

![Split](https://docsbraspag.github.io/SplitBraspag/images/Split/Split001.PNG)

**Exemplo 2)**  

Transação no valor de **R$100,00** com o nó contendo as regras de divisão.

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR, já embutindo os 2% do MDR Braspag + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR, já embutindo os 2% do MDR Braspag + 0,15 Tarifa Fixa.  

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Capture":true,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "SplitPayments":[
        {
            "SubordinateMerchantId" :"MID Subordinate 01",
            "Amount":6000,
            "Fares":{
                "Mdr":5,
                "Fee":30
            }
        },
        {
            "SubordinateMerchantId" :"MID Subordinate 02",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
   }
}
```

Neste caso o cálculos do Split são realizados sobre cada regra de divisão informada. No próximo tópico serão explicados as propriedades que compõem o nó do Split de Pagamentos.

![Split](https://docsbraspag.github.io/SplitBraspag/images/Split/Split003.PNG)

### Modelos de Split

O Split de Pagamentos possui dois modelos básicos de integração:

| Tipo                 | Descrição                                                                                                                          |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Split Transacional**     | O **Marketplace** envia na autorização (captura automática) ou no momento de captura as regras de divisão.                                             |
| **Split Pós-Transacional** | O **Marketplace** envia as regras de divisão após a captura da transação.

> O Split de Pagamentos só é realizado para transações capturadas, ou seja, o mesmo só será considerado para autorizações com captura automática e no momento da captura de uma transação. Caso seja informado no momento de uma autorização sem captura automática, as regras de divisão serão desconsideradas.

<BR>

#### Split Transacional

<BR>
Este modelo exige que o **Marketplace** envie um "nó" adicional na integração da API Cielo E-Commerce, como apresentado em exemplos anteriores, informando as regras de divisão da transação.

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

| Propriedade                             | Descrição                                                                                   | Tipo   | Tamanho | Obrigatório |
|-----------------------------------------|---------------------------------------------------------------------------------------------|--------|---------|-------------|
| `SplitPayments.SubordinateMerchantId`   | **MerchantId** (Identificador) do **Subordinado**.                                                           | Guid   | 36      | Sim         |
| `SplitPayments.Amount`                  | Parte do valor total da transação referente a participação do **Subordinado**, em centavos.              | Inteiro | -      | Sim         |
| `SplitPayments.Fares.Mdr`               | **MDR(%)** do **Marketplace** a ser descontado do valor referente a participação do **Subordinado** | Decimal | -       | Sim         |
| `SplitPayments.Fares.Fee`               | **Tarifa Fixa(R$)** a ser descontada do valor referente a participação do **Subordinado**, em centavos.  | Inteiro | -      | Sim         |

Como resposta, A API Cielo E-Commerce retornará na resposta um nó contento as regras de divisão enviadas e os valores a serem recebidos pelo **Marketplace** e seus **Subordinados**:

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
                "amount": 500,
            },
            {
                "MerchantId": "MID Subordinate 01",
                "amount": 9500,
            }
        ]
    }
]
```

| Propriedade                             | Descrição                                                                                   | Tipo   | Tamanho | Obrigatório |
|-----------------------------------------|---------------------------------------------------------------------------------------------|--------|---------|-------------|
| `SplitPayments.Splits.SubordinateMerchantId` | **MerchantId** (Identificador) do **Subordinado** ou **Marketplace**.                                            | Guid   | 36      | Sim         |
| `SplitPayments.Splits.Amount`            | Parte do valor calculado da transação a ser recebido pelo **Subordinado** ou **Marketplace**, já descontando todas as taxas (MDR e Tarifa Fixa) | Inteiro | -      | Sim         |

**Exemplo**  

Transação no valor de **R$100,00** com o nó contendo as regras de divisão.

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR, já embutindo os 2% do MDR Braspag + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR, já embutindo os 2% do MDR Braspag + 0,15 Tarifa Fixa.  

`REQUEST`

```json
{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"SplittedCreditCard",
     "Amount":10000,
     "Capture":true,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa"
     },
     "SplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "Amount":6000,
            "Fares":{
                "Mdr":5,
                "Fee":30
            }
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
   }
}
```

`RESPONSE`

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador crédito simples"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": true,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "Tid": "0305023644309",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 10000,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 1,
        "ReturnCode": "4",
        "ReturnMessage": "Operation Successful",
        "SplitPayments":[
            {
                "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
                "Amount":6000,
                "Fares":{
                    "Mdr":5,
                    "Fee":30
                },
                "Splits": [
                    {
                        "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                        "amount": 210,    
                    },
                    {
                        "MerchantId": "0f377932-5668-4c72-8b5b-2b43760ebd38",
                        "amount": 5670,    
                    }
                ]
            },
            {
                "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
                "Amount":4000,
                "Fares":{
                    "Mdr":4,
                    "Fee":15
                },
                "Splits": [
                    {
                        "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                        "amount": 95,    
                    },
                    {
                        "MerchantId": "98430463-7c1e-413b-b13a-0f613af594d8",
                        "amount": 3825,    
                    }
                ]
            }
        ],
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

Neste exemplo os cálculos do Split foram realizados sobre cada regra de divisão informada e na resposta retornaram os valores a serem recebidos pelo **Marketplace** e seus **Subordinados**.

![Split](https://docsbraspag.github.io/SplitBraspag/images/Split/Split003.PNG)

Divisão do valor do Subordinado **0f377932-5668-4c72-8b5b-2b43760ebd38**:

**Marketplace**: R$2,10  
**Subordinado**: R$56,70  

Divisão do valor do Subordinado **98430463-7c1e-413b-b13a-0f613af594d8**:

**Marketplace**: R$0,95  
**Subordinado**: R$38,25  

#### Split Pós-Transacional

<BR>
Neste modelo o **Marketplace** poderá enviar as regras de divisão da transação após a mesma ser capturada.

A divisão pós-transacional é possível somente para transações com **Cartão de Crédito** e poderá ser realizada dentro de um intervalo de tempo a partir da data de captura da transação.

Para transações com **Cartão de Crédito**, este período é de **25 dias** se o **Marketplace** possuir um regime padrão de pagamentos. Caso tenha um regime personalizado, o período deverá ser acordado entre as partes (**Marketplace** e **Braspag**).

A API de divisão pós-transacional utiliza como segurança o protocolo [OAUTH2](https://oauth.net/2/){:target="_blank"}, onde é necessário primeiramente obter um token utlizando suas credenciais, que deverá posteriormente ser enviado à API do Split para realização da divisão pós-transacional.

Para obter um token de acesso:

1. Concatene o ClientId e ClientSecret: `ClientId:ClientSecret`.  
2. Codifique o resultado da concatenação em Base64.  
3. Realize uma requisição ao servidor de autorização:  

`REQUEST`  

```json
POST https://{OAUTH2 Server}/oauth2/token  
--header "Authorization: Basic {base64}"  
--header "Content-Type: application/x-www-form-urlencoded"  
grant_type=client_credentials
```

`RESPONSE`

```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbG.....WE1igNAQRuHAs",
    "token_type": "bearer",
    "expires_in": 1199
}
```

> O ClientId é o mesmo utilizado na integração com a API Cielo E-Commerce, conhecido como MerchantId. O ClientSecret deve ser obtido junto à Braspag.

O token retornado (access_token) deverá ser utilizado em toda requisição à API do Split como uma chave de autorização. O mesmo possui uma validade de 20 minutos e deverá ser obtido um novo token toda vez que o mesmo expirar.  

Com o token de acesso, é possível realizar um requisição à API do Split para enviar as regras de divisão de uma transação.  

`REQUEST`  

```json
PUT https://{API Split}/api/transactions/{PaymentId}/split
--header "Authorization: Bearer {token}"
```

```json
[
    {
        "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
        "Amount":6000,
        "Fares":{
            "Mdr":5,
            "Fee":30
        }
    },
    {
        "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
        "Amount":4000,
        "Fares":{
            "Mdr":4,
            "Fee":15
        }
    }
]
```

RESPONSE

```json
[
    {
        "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
        "Amount":6000,
        "Fares":{
            "Mdr":5,
            "Fee":30
        },
        "Splits": [
            {
                "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                "amount": 210,    
            },
            {
                "MerchantId": "0f377932-5668-4c72-8b5b-2b43760ebd38",
                "amount": 5670   
            }
        ]
    },
    {
        "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
        "Amount":4000,
        "Fares":{
            "Mdr":4,
            "Fee":0.15
        },
        "Splits": [
            {
                "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                "amount": 95,    
            },
            {
                "MerchantId": "98430463-7c1e-413b-b13a-0f613af594d8",
                "amount": 3825    
            }
        ]
    }
]
```

Exemplo considerando transação no valor de **R$100,00** e as seguinte taxas:

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR, já embutindo os 2% do MDR Braspag + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR, já embutindo os 2% do MDR Braspag + 0,15 Tarifa Fixa.  

O nó de Split de Pagamentos da API pós-transacional, no contrato de request e response, é o mesmo retornado na divisão no momento transacional, apresentado anteriormente.

> O **Marketplace** poderá informar as regras de divisão da transação mais de uma vez desde que esteja dentro do período de tempo permitido, que é de **25 dias** para Cartão de Crédito. Para transações com Cartão de Débito a divisão poderá ser realizada somente no momento transacional.

### Consulta

Para consultar uma transação, utilize o próprio serviço de consulta da API Cielo E-Commerce.

`REQUEST`

```json
GET https://{API Cielo E-Commerce (consulta)}/1/sales/{PaymentId}
```

`RESPONSE`

```json
{
    "MerchantOrderId": "2014111706",
    "Customer": {
        "Name": "Comprador Teste"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": "ByMerchant",
        "Capture": false,
        "Authenticate": false,
        "CreditCard": {
            "CardNumber": "455187******0183",
            "Holder": "Teste Holder",
            "ExpirationDate": "12/2030",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "ProofOfSale": "674532",
        "AuthorizationCode": "123456",
        "PaymentId": "24bc8366-fc31-4d6c-8555-17049a836a07",
        "Type": "CreditCard",
        "Amount": 1000,
        "Currency": "BRL",
        "Country": "BRA",
        "ExtraDataCollection": [],
        "Status": 2,
        "SplitPayments":[
            {
                "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
                "Amount":6000,
                "Fares":{
                    "Mdr":5,
                    "Fee":30
                },
                "Splits": [
                    {
                        "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                        "amount": 210,    
                    },
                    {
                        "MerchantId": "0f377932-5668-4c72-8b5b-2b43760ebd38",
                        "amount": 5670,    
                    }
                ]
            },
            {
                "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
                "Amount":4000,
                "Fares":{
                    "Mdr":4,
                    "Fee":15
                },
                "Splits": [
                    {
                        "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                        "amount": 95,    
                    },
                    {
                        "MerchantId": "98430463-7c1e-413b-b13a-0f613af594d8",
                        "amount": 3825,    
                    }
                ]
            }
        ],
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture"
            },
            {
                "Method": "PUT",
                "Rel": "void",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
            }
        ]
    }
}
```

### Captura

Ao capturar uma transação do Split de Pagamentos o **Marketplace** deve informar as regras de divisão da mesma. Caso não informe, será gerada a divisão da transação entre o **Marketplace** e a **Braspag**, tanto para **captura do valor total** quanto para **captura de um valor parcial**.

#### Captura Total

Na captura total de uma transação, o somatório dos valores de participação de cada subordinado deverá ser igual ao valor total da transação enviado no momento da autorização.

`REQUEST`

```json
PUT https://{API Cielo E-Commerce}/1/sales/{PaymentId}/capture
{
    "SplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "Amount":6000,
            "Fares":{
                "Mdr":5,
                "Fee":30
            }
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
}
```

`RESPONSE`

```json
{
    "Status": 2,
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "Amount":6000,
            "Fares":{
                "Mdr":5,
                "Fee":30
            },
            "Splits": [
                {
                    "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                    "amount": 210,    
                },
                {
                    "MerchantId": "0f377932-5668-4c72-8b5b-2b43760ebd38",
                    "amount": 5670,    
                }
            ]
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            },
            "Splits": [
                {
                    "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                    "amount": 95,    
                },
                {
                    "MerchantId": "98430463-7c1e-413b-b13a-0f613af594d8",
                    "amount": 3825,    
                }
            ]
        }
    ]
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
```

Exemplo considerando transação no valor de **R$100,00** e as seguinte taxas:

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR, já embutindo os 2% do MDR Braspag + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR, já embutindo os 2% do MDR Braspag + 0,15 Tarifa Fixa.

#### Captura Parcial

Na captura parcial de uma transação, o somatório dos valores de participação de cada subordinado deverá ser igual ao valor total a ser capturado.

`REQUEST`

```json
PUT https://{API Cielo E-Commerce}/1/sales/{PaymentId}/capture?amount=8000
{
    "SplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "Amount":4000,
            "Fares":{
                "Mdr":5,
                "Fee":30
            }
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":15
            }
        }
     ]
}
```

`RESPONSE`

```json
{
    "Status": 2,
    "ReturnCode": "6",
    "ReturnMessage": "Operation Successful",
    "SplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "Amount":4000,
            "Fares":{
                "Mdr":5,
                "Fee":30
            },
            "Splits": [
                {
                    "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                    "amount": 150,    
                },
                {
                    "MerchantId": "0f377932-5668-4c72-8b5b-2b43760ebd38",
                    "amount": 3770,    
                }
            ]
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "Amount":4000,
            "Fares":{
                "Mdr":4,
                "Fee":0.15
            },
            "Splits": [
                {
                    "MerchantId": "cd16ab8e-2173-4a16-b037-36cd04c07950",
                    "amount": 95,    
                },
                {
                    "MerchantId": "98430463-7c1e-413b-b13a-0f613af594d8",
                    "amount": 3825,    
                }
            ]
        }
    ]
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        },
        {
            "Method": "PUT",
            "Rel": "void",
            "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void"
        }
    ]
}
```

Exemplo considerando transação no valor de **R$100,00**, captura parcial de **R$80,00** e as seguintes taxas:

**Taxa Braspag**: 2% MDR + R$0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 01**: 5% MDR, já embutindo os 2% do MDR Braspag + 0,30 Tarifa Fixa.  
**Taxa Marketplace com o Subordinado 02**: 4% MDR, já embutindo os 2% do MDR Braspag + 0,15 Tarifa Fixa.

### Cancelamento

Ao cancelar uma transação do Split de Pagamentos o **Marketplace** deve informar, para um cancelamento parcial, qual o valor deve ser cancelado de cada **Subpordinado** que participa da transação. Para um cancelamento total esta informação não é necessária, já que será cancelado o valor total e consequentemente o valor total de cada **Subpordinado**.

#### Cancelamento Total

<BR>
No cancelamento total de uma transação, será cancelado o valor total da transação e consequentemente o valor total de cada **Subordinado**.

`REQUEST`

```
PUT https://{API Cielo E-Commerce}/1/sales/{PaymentId}/void
```

`RESPONSE`

```json
{
    "Status": 10,
    "ReturnCode": "9",
    "ReturnMessage": "Operation Successful",
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "VoidAmount":1500,
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "VoidAmount":500,
        }
    ]
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        }
    ]
}
```

#### Cancelamento Parcial

<BR>
No cancelamento parcial, o somatório dos valores cancelados definidos para cada **Subordinado** não poderão ultrapassar o valor total do cancelamento parcial.  

Os valores cancelados serão sensibilizados nas respectivas agendas dos **Subordinados**.

`REQUEST`

```json
PUT https://{API Cielo E-Commerce}/1/sales/{PaymentId}/void?amount=2000
{
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "VoidAmount":1500,
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "VoidAmount":500,
        }
     ]
}
```

`RESPONSE`

```json
{
    "Status": 2,
    "ReasonCode": 0,
    "ReasonMessage": "Successful",
    "ProviderReturnCode": "0",
    "ProviderReturnMessage": "Operation Successful",
    "ReturnCode": "0",
    "ReturnMessage": "Operation Successful",
    "VoidSplitPayments":[
        {
            "SubordinateMerchantId" :"0f377932-5668-4c72-8b5b-2b43760ebd38",
            "VoidAmount":1500,
        },
        {
            "SubordinateMerchantId" :"98430463-7c1e-413b-b13a-0f613af594d8",
            "VoidAmount":500,
        }
    ],
    "Links": [
        {
            "Method": "GET",
            "Rel": "self",
            "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
        }
    ]
}
```

## Agenda

> Em breve disponibilizaremos a API de Agenda onde será possível consultar a agenda do **Markectplace** e seus **Subordinados**.
