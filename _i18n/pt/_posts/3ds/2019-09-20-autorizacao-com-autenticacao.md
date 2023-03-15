---
layout: manual
title: 3. Autorização com Autenticação
description: Manual integração técnica do 3DS 2.0
search: true
translated: true
categories: manual
sort_order: 5
tags:
  - Autenticação 3DS 2.0
language_tabs:
  json: JSON
  shell: cURL
---

# Autorização com Autenticação (API 3.0)

Após autenticação ser concluída, submete-se ao processo de autorização, enviando os dados de autenticação no modelo de &quot;autenticação externa&quot; (nó **ExternalAuthentication** ).
Este procedimento é válido também para estabelecimentos que realizaram a autenticação fora da Cielo (MPI Externo).

Veja exemplo abaixo, descrito o envio dos dados de autenticação da requisição de autorização da API Cielo 3.0:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales</span></aside>

### Request

```json
{
   "MerchantOrderId":"2017051002",
   "Customer":
   {
     (...)
   },
   "Payment":
   {
     (...)
     "Authenticate":true,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
       "Version":"2",
       "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--header "MerchantKey: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--data-binary
--verbose
{
   "MerchantOrderId":"2017051002",
   "Customer":
   {
     (...)
   },
   "Payment":
   {
     (...)
     "Authenticate":true,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Cavv":"AAABB2gHA1B5EFNjWQcDAAAAAAB=",
       "Xid":"Uk5ZanBHcWw2RjRCbEN5dGtiMTB=",
       "Eci":"5",
       "Version":"2",
       "ReferenceId":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6"
     }
   }
}
```

| **Campo**                                  | **Descrição**                                                                                    | **Tipo/Tamanho**         | **Obrigatório**                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------------------------------------------------------- |
| Payment.Authenticate                       | Booleano que define se o comprador será direcionado ao Banco emissor para autenticação do cartão | -                        | Sim, para que a autenticação seja realizada é obrigatório enviar como true |
| Payment.ExternalAuthentication.Cavv        | Assinatura que é retornada nos cenários de sucesso na autenticação                               | Texto                    | Sim, quando a autenticação foi um sucesso                                  |
| Payment.ExternalAuthentication.Xid         | XID retornado no processo de autenticação                                                        | Texto                    | Sim, quando a versão do 3DS for &quot;1&quot;                              |
| Payment.ExternalAuthentication.Eci         | E-Commerce Indicator retornado no processo de autenticação                                       | Numérico [1 posição]     | Sim                                                                        |
| Payment.ExternalAuthentication.Version     | Versão do 3DS utilizado no processo de autenticação                                              | Alfanumérico [1 posição] | Sim, quando a versão do 3DS for &quot;2&quot;                              |
| Payment.ExternalAuthentication.ReferenceId | RequestID retornado no processo de autenticação                                                  | GUID [36 posições]       | Sim, quando a versão do 3DS for &quot;2&quot;                              |

### Response

Veja mais: [https://developercielo.github.io/manual/cielo-ecommerce#resposta](https://developercielo.github.io/manual/cielo-ecommerce#resposta)

# Autorização para transações Data Only (API 3.0)

Após ter sido realizada a etapa de autenticação no modelo data only (enviando o campo bpmpi_auth_notifyonly como true) submete-se ao processo de autorização, enviando os dados de autenticação no modelo de &quot;autenticação externa&quot; (nó **ExternalAuthentication** ).

Veja exemplo abaixo, descrito o envio dos dados de autenticação da requisição de autorização da API Cielo 3.0:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales</span></aside>

### Request

```json
{
   "MerchantOrderId":"2017051002",
   "Customer":
   {
     (...)
   },
   "Payment":
   {
     (...)
     "Authenticate":false,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Eci":"4",
       "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6",
       "dataonly":true
     }
   }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--header "MerchantKey: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--data-binary
--verbose
{
   "MerchantOrderId":"2017051002",
   "Customer":
   {
     (...)
   },
   "Payment":
   {
     (...)
     "Authenticate":false,
     "ReturnUrl":"http://www.loja.com.br",
     "CreditCard":{
         "CardNumber":"4000000000001000",
         "Holder":"Nome do Portador",
         "ExpirationDate":"12/2021",
         "SecurityCode":"123",
         "Brand":"Visa",
         "SaveCard":"false"
     },
     "ExternalAuthentication":{
       "Eci":"4",
       "ReferenceID":"a24a5d87-b1a1-4aef-a37b-2f30b91274e6",
       "dataonly":true
     }
   }
}
```

| **Campo**                                  | **Descrição**                                                                                    | **Tipo/Tamanho**     | **Obrigatório**                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- |
| Payment.Authenticate                       | Booleano que define se o comprador será direcionado ao Banco emissor para autenticação do cartão | -                    | Sim, no caso de transação Data Only é obrigatório enviar como false |
| Payment.ExternalAuthentication.Eci         | E-Commerce Indicator retornado no processo de autenticação                                       | Numérico [1 posição] | Sim                                                                 |
| Payment.ExternalAuthentication.ReferenceId | RequestID retornado no processo de autenticação                                                  | GUID [36 posições]   | Sim                                                                 |
| Payment.ExternalAuthentication.DataOnly    | Booleano que define se é uma transação Data Only                                                 | -                    | Sim, no caso de transação Data Only é obrigatório enviar como true  |

### Response

Veja mais: [https://developercielo.github.io/manual/cielo-ecommerce#resposta](https://developercielo.github.io/manual/cielo-ecommerce#resposta)

# Autorização com Autenticação (Webservice 1.5)

Veja exemplo abaixo, descrito o envio dos dados de autenticação da requisição de autorização da API Cielo 1.5.

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/servicos/ecommwsec.do</span></aside>

### Request

```json
<?xml version="1.0" encoding="UTF-8"?>
<requisicao-transacao xmlns="http://ecommerce.cbmp.com.br" id="1" versao="1.2.1">
   <dados-ec>
   (...)
   </dados-ec>
   <dados-portador>
   (...)
   </dados-portador>
   <dados-pedido>
   (...)
   </dados-pedido>
   <forma-pagamento>
   (...)
   </forma-pagamento>
   <autorizar>3</autorizar>
   <capturar>true</capturar>
   <gerar-token>false</gerar-token>
   <dados-autenticacao-mpi-externa>
      <cavv>A901234A5678A0123A567A90120=</cavv>
      <xid>A90123A45678A0123A567A90123</xid>
      <eci>3</eci>
      <versao>1</versao>
      <dstid>3</dstid>
   </dados-autenticacao-mpi-externa>
</requisicao-transacao>
```

| **Campo** | **Descrição**                                                      | **Tipo/Tamanho**         | **Obrigatório**                               |
| --------- | ------------------------------------------------------------------ | ------------------------ | --------------------------------------------- |
| cavv      | Assinatura que é retornada nos cenários de sucesso na autenticação | Texto                    | Sim, quando a autenticação foi um sucesso     |
| xid       | XID retornado no processo de autenticação                          | Texto                    | Sim, quando a versão do 3DS for &quot;1&quot; |
| eci       | E-Commerce Indicator retornado no processo de autenticação         | Numérico [1 posição]     | Sim                                           |
| versao    | Versão do 3DS utilizado no processo de autenticação                | Alfanumérico [1 posição] | Sim, quando a versão do 3DS for &quot;2&quot; |
| dstid     | RequestID retornado no processo de autenticação                    | GUID [36 posições]       | Sim, quando a versão do 3DS for &quot;2&quot; |

### Response

Veja mais: [https://developercielo.github.io/manual/webservice-1-5#tipos-de-retorno](https://developercielo.github.io/manual/webservice-1-5#tipos-de-retorno)

# Tabela de ECI

| Bandeira      | ECI                      | Significado da Transação                                                                                         |
| ------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Visa/Elo/Amex | 06                       | Autenticada pela bandeira – risco de chargeback passa a ser do emissor.                                          |
| Visa/Elo/Amex | 05                       | Autenticada pelo emissor – risco de chargeback passa a ser do emissor.                                           |
| Visa/Elo/Amex | Diferente de 05 e 06     | Não autenticada – risco de chargeback permanece com o estabelecimento.                                           |
| Mastercard    | 01                       | Autenticada pela bandeira – risco de chargeback passa a ser do emissor.                                          |
| Mastercard    | 02                       | Autenticada pelo emissor – risco de chargeback passa a ser do emissor.                                           |
| Mastercard    | 04                       | Não autenticada, transação caracterizada como _Data Only_ – risco de chargeback permanece com o estabelecimento. |
| Mastercard    | Diferente de 01, 02 e 04 | Não autenticada – risco de chargeback permanece com o estabelecimento.                                           |
