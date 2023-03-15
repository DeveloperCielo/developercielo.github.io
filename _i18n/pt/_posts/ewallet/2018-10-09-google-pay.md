---
layout: manual
title: Manual de integração Google Pay
description: Integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - E-Wallet
language_tabs:
  json: JSON
---

# Google Pay ™

Google Pay é uma carteira virtual. Ele permite que os compradores realizem pagamentos em lojas virtuais e apps utilizando de forma prática e segura, seus cartões de crédito e débito armazenados em suas contas "Google Account" e dispositivos Android.

# Requisitos

1. Concordar com os termos do Google Pay
2. Integrar com o Google Pay em seu site ou app ([https://developers.google.com/pay/api/android/overview](https://developers.google.com/pay/api/android/overview))
3. Contratar o Cielo 3.0 como adquirência
4. Integrar com o Pagador API REST ([https://developercielo.github.io/manual/cielo-ecommerce](https://developercielo.github.io/manual/cielo-ecommerce))

# Etapa 1: Integrando Google Pay em seu aplicativo Android

## Passo 1 - Configuração do Projeto

[https://developers.google.com/pay/api/android/guides/setup](https://developers.google.com/pay/api/android/guides/setup)

Nestes passos, os seguintes pontos devem ser atendidos:

- Configuração do Projeto
- Modificação do arquivo _Manifest_

## Passo 2 - Implementação do Google Pay

Para integrar o Google Pay sem seu aplicativo, siga todos os passos indicados na documentação do Google Pay:

[https://developers.google.com/pay/api/android/guides/tutorial](https://developers.google.com/pay/api/android/guides/tutorial)

Para a correta integração do Google Pay via Cielo 3.0, é necessário se atentar aos pontos abaixo:

### Definição do Gateway

No passo "_Step 2: Choose a payment tokenization method_", siga o modelo indicado como "GATEWAY" e preencha o valor para parâmetro "type" como " **PAYMENT_GATEWAY**" e o parâmetro " **gateway**" como " **cielo**", conforme o exemplo ao lado:

```json
private static JSONObject getTokenizationSpecification() {
  JSONObject tokenizationSpecification = new JSONObject();
  tokenizationSpecification.put("type", "PAYMENT_GATEWAY");
  tokenizationSpecification.put(
      "parameters",
      new JSONObject()
          .put("gateway", "cielo")
          .put("gatewayMerchantId", "MerchantId"));
  return tokenizationSpecification;
}
```

No parâmetro " **gatewayMerchantId**", preencha o identificador de sua loja gerado pela Cielo. O identificador da loja tem o formato XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX (i.e. GUID(36)).

### Definição das Bandeiras aceitas

No passo "_Step 3: Define supported payment card networks_", seguir com as bandeiras: "VISA", "MASTERCARD", "AMEX", "DISCOVER" E "JCB"

### Definição do ambiente

No passo "_Step 5: Create a PaymentsClient instance_", utilize o valor "WalletConstants.ENVIRONMENT_TEST" para utilizar o ambiente de teste.

### Definição dos dados de compra

No passo "_Step 7: Create a PaymentDataRequest object_", utilize o valor "BRL" para parâmetro " **currencyCode**". O campo " **merchantName**" é o nome que o comprador visualizará durante o pagamento com Google Pay, desta forma, recomenda-se colocar um nome amigável e reconhecido.

### Recuperação dos dados pagamento

No passo "_Step 9: Handle the response object_", está descrito o evento "Activity.RESULT_OK", onde é retornado um objeto com todos os dados referente ao dados de pagamento, inclusive o token de pagamento.

A partir do _PaymentData,_ obtém-se o objeto _PaymentMethodToken_, através da chamada do método **getPaymentMethodToken()**.

(vide mais informações em: [https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentData](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentData))

Na sequência, deve-se obter a _string_ que contém tokens de pagamento a partir do método **GetToken()** do objeto _PaymentMethodToken_.

(vide mais informações em: [https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentMethodToken](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentMethodToken))

O token obtido no passo anterior, possui uma estrutura descrita abaixo:

```json
{
  "protocolVersion": "ECv1",
  "signature": "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "signedMessage": "{\"encryptedMessage\":
  \"ZW5jcnlwdGVkTWVzc2FnZQ==\",\"ephemeralPublicKey\":
  \"ZXBoZW1lcmFsUHVibGljS2V5\",\"tag\": \"c2lnbmF0dXJl\"}"
}
```

| **Parâmetro** | **Type** | **Descrição**           |
| ------------- | -------- | ----------------------- |
| signedMessage | string   | Mensagem asssinada.     |
| signature     | string   | Assinatura da mensagem. |

(vide mais informações em: [https://developers.google.com/pay/api/android/guides/resources/payment-data-cryptography](https://developers.google.com/pay/api/android/guides/resources/payment-data-cryptography))

Guarde os dados "_signedMessage_" e "_signature_", que serão requisitados na autorização via Cielo 3.0 na próxima etapa (Etapa 2: Autorização com token do Google Pay)

# Etapa 2: Autorização com o token do Google Pay

A autorização com o token do Google Pay acontece da mesma forma que uma autorização padrão de um cartão de crédito, porém, ao invés de fornecer os dados do cartão abertos, deverá fornecer o token recebido pelo Google Pay, confore o exemplo abaixo:

## Request

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    (…)
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "Wallet": {
      "Type": "AndroidPay",
      "WalletKey": "{\"encryptedMessage\": \"ZW5jcnlwdGVkTWVzc2FnZQ==\",\"ephemeralPublicKey\": \"ZXBoZW1lcmFsUHVibGljS2V5\",\"tag\": \"c2lnbmF0dXJl\"}",
      "AdditionalData": {
        "Signature": "ZXBoZW1lcmFsUHVibGljS2V5"
      }
    }
  }
}
```

| **Parâmetros do Header** | **Type**   | **Descrição**                                                                                           |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------- |
| MerchantID               | GUID(36)   | ID do estabelecimento na Cielo 3.0. Para ambiente Sandbox, utilize fecd2b61-3f0e-4e49-8b4f-eb382fa4da56 |
| MerchantKey              | String(24) | Chave da API para Cielo 3.0. Para ambiente Sandbox, utilize WSCIKUJBVHFPPPAWFPJGRYXRDNGQTMZAGBJSZZBV    |

| **Parâmetros do Body**                  | **Type**                  | **Descrição**                                                                                                                                                                     |
| --------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MerchantOrderId                         | String (50)               | Número de identificação do Pedido                                                                                                                                                 |
| Customer                                | Nó com dados do comprador | Vide [https://developercielo.github.io/manual/cielo-ecommerce#transa%C3%A7%C3%A3o-completa](https://developercielo.github.io/manual/cielo-ecommerce#transa%C3%A7%C3%A3o-completa) |
| Payment.Type                            | String (100)              | Tipo do Meio de Pagamento. Possibilidades: "CreditCard" ou "DebitCard"                                                                                                            |
| Payment.Amount                          | Número (15)               | Valor do Pedido (ser enviado em centavos)                                                                                                                                         |
| Payment.Installments                    | Número (2)                | Número de Parcelas                                                                                                                                                                |
| Payment.Wallet.Type                     | String (15)               | Nome da provedora de Meio de Pagamento. Para transações Google Pay, utilize "AndroidPay"                                                                                          |
| Payment.Wallet.WalletKey                | String                    | Preencher com o valor do parâmetro "signedMessage" retornado pelo Google Pay                                                                                                      |
| Payment.Wallet.AdditionalData.Signature | String                    | Preencher com o valor do parâmetro "signature" retornado pelo Google Pay                                                                                                          |

Para mais informações, acesse [https://developercielo.github.io/manual/cielo-ecommerce](https://developercielo.github.io/manual/cielo-ecommerce)

## Response

Vide [https://developercielo.github.io/manual/cielo-ecommerce#resposta](https://developercielo.github.io/manual/cielo-ecommerce#resposta)

# Etapa 3: Solicitação de dados de produção

## Passo 1 - Branding Guideline

Verifique se todas as diretrizes de branding foram seguidas conforme o link: [https://developers.google.com/pay/api/android/guides/brand-guidelines](https://developers.google.com/pay/api/android/guides/brand-guidelines)

## Passo 2 - Checklist e solicitação de credenciais de produção

Verifique se todos os itens do checklist foram atendidos. Quando estiver tudo validado, solicite os dados de acesso produtivos. O checklist está disponível em: [https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)
