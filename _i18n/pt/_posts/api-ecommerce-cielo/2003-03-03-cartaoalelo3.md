---
layout: manual
title: Cartões Alelo
description: Manual integração para Pilotos
translated: true
toc_footers: true
categories: manual
sort_order: 3
tags:
  - API e-Commerce Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Cartões Alelo

Para criar uma venda que utilizará cartão de Alelo, é necessário fazer um `POST` para o recurso Payment utilizando o contrato técnico de uma venda de `Cartão de Débito`.

> Para mais informações sobre a integração de cartão de Débito via API Cielo Ecommerce, acesse o [Manual de integração](https://developercielo.github.io/manual/cielo-ecommerce#criando-uma-venda-simplificada)

**OBS:** Em transações de Cartão ALELO, os seguintes parametros devem possuir configurações estáticas

|Parametro             |Padrão ALELO                 |
|----------------------|-----------------------------|
|`Payment.Authenticate`| **FALSE** ou não enviado    |
|`DebitCard.Brand`     | Precisa ser enviado como ELO| 

### Requisição

EndPoints de Produção

> **Requisição de transação**: https://api.cieloecommerce.cielo.com.br/
> **Consulta transação**: https://apiquery.cieloecommerce.cielo.com.br/

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{  
   "MerchantOrderId":"2014121201",
   "Customer":{  
      "Name":"Comprador Cartão de Alelo"
   },
   "Payment":{  
     "Type":"DebitCard",
     "Authenticate":false,
     "Amount":50,
     "ReturnUrl":"http://www.cielo.com.br",
     "DebitCard":{  
         "CardNumber":"5080540487508044",
         "Holder":"Comprador Cartão de Alelo",
         "ExpirationDate":"07/2029",
         "SecurityCode":"841",
         "brand": "Elo"
     }
   }
}

--verbose
```

| Propriedade                | Descrição                                                                                             | Tipo   | Tamanho | Obrigatório |
|----------------------------|-------------------------------------------------------------------------------------------------------|--------|---------|-------------|
| `MerchantId`               | Identificador da loja na API Cielo eCommerce.                                                         | Guid   | 36      | Sim         |
| `MerchantKey`              | Chave Publica para Autenticação Dupla na API Cielo eCommerce.                                         | Texto  | 40      | Sim         |
| `RequestId`                | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT | Guid   | 36      | Não         |
| `MerchantOrderId`          | Numero de identificação do Pedido.                                                                    | Texto  | 50      | Sim         |
| `Customer.Name`            | Nome do Comprador.                                                                                    | Texto  | 255     | Não         |
| `Customer.Status`          | Status de cadastro do comprador na loja (NEW / EXISTING) - Utilizado pela análise de fraude           | Texto  | 255     | Não         |
| `Payment.Authenticate`     | Define se o comprador será direcionado ao Banco emissor para autenticação do cartão                   | Booleano|        |Não (Default false)
| `Payment.Type`             | Tipo do Meio de Pagamento.                                                                            | Texto  | 100     | Sim         |
| `Payment.Amount`           | Valor do Pedido (ser enviado em centavos).                                                            | Número | 15      | Sim         |
| `Payment.ReturnUrl`        | Url de retorno do lojista.                                                                            | Texto  | 1024    | Sim         |
| `Payment.ReturnUrl`        | URI para onde o usuário será redirecionado após o fim do pagamento                                    | Texto  | 1024    | Sim         |
| `DebitCard.CardNumber`     | Número do Cartão do Comprador.                                                                        | Texto  | 19      | Sim         |
| `DebitCard.Holder`         | Nome do Comprador impresso no cartão.                                                                 | Texto  | 25      | Não         |
| `DebitCard.ExpirationDate` | Data de validade impresso no cartão.                                                                  | Texto  | 7       | Sim         |
| `DebitCard.SecurityCode`   | Código de segurança impresso no verso do cartão.                                                      | Texto  | 4       | **Sim**         |

### Resposta

``` shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
{
    "MerchantOrderId": "2014121201",
    "Customer": {
        "Name": "Comprador Cartão de Alelo"
    },
    "Payment": {
        "DebitCard": {
            "CardNumber": "508054******8044",
            "Holder": "Comprador Cartão de Alelo",
            "ExpirationDate": "07/2029",
            "SaveCard": false,
            "Brand": "Elo"
        },
        "Provider": "Cielo",
        "AuthorizationCode": "803247",
        "Eci": "7",
        "Tid": "107703563079N41O9DJB",
        "ProofOfSale": "770857",
        "Authenticate": false,
        "Recurrent": false,
        "Amount": 50,
        "ReceivedDate": "2018-01-30 15:00:24",
        "CapturedAmount": 50,
        "CapturedDate": "2018-01-30 15:00:25",
        "ReturnUrl": "http://www.cielo.com.br",
        "Status": 2,
        "IsSplitted": false,
        "ReturnMessage": "Transacao capturada com sucesso",
        "ReturnCode": "00",
        "PaymentId": "f8504766-4ae4-4a1f-811f-035964b6c4ee",
        "Type": "DebitCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquery.cieloecommerce.cielo.com.br/1/sales/f8504766-4ae4-4a1f-811f-035964b6c4ee"
            }
        ]
    }
}
```

| Propriedade         | Descrição                                                                                   | Tipo  | Tamanho | Formato                              |
|---------------------|---------------------------------------------------------------------------------------------|-------|---------|--------------------------------------|
| `AuthenticationUrl` | URL para qual o Lojista deve redirecionar o Cliente para o fluxo de Débito.                 | Texto | 56      | Url de Autenticação                  |
| `Tid`               | Id da transação na adquirente.                                                              | Texto | 20      | Texto alfanumérico                   |
| `PaymentId`         | Campo Identificador do Pedido.                                                              | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ReturnUrl`         | Url de retorno do lojista. URL para onde o lojista vai ser redirecionado no final do fluxo. | Texto | 1024    | http://www.urllogista.com.br         |
| `Status`            | Status da Transação.                                                                        | Byte  | ---     | 0                                    |
| `ReturnCode`        | Código de retorno da Adquirência.                                                           | Texto | 32      | Texto alfanumérico                   |
