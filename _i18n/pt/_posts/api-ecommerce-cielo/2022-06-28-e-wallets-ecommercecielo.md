---
layout: manual
title: Manual E-Wallets (Carteiras Digitais)
description: Manual integração técnica via API
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 8
tags:
  - API Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# E-Wallet (carteira digital)

E-wallets são cofres (repositórios) de cartões e dados de pagamento destinados a consumidores do e-commerce e do mundo físico. As carteiras digitais permitem que um consumidor realize o cadastro de seus dados de pagamento tornando o processo de compra mais conveniente e seguro.

<aside class="warning">Para utilizar carteiras na API E-commerce Cielo, o lojista deverá possuir as carteiras integradas em seu checkout.</aside>

Entre em contato com o provedor de sua preferência para maiores informações sobre como contratar o serviço.

## E-Wallets Disponíveis

API Cielo E-commerce possui suporte para as seguintes carteiras digitais:

- [_Apple Pay_](https://www.apple.com/br/apple-pay/){:target="\_blank"}
- [_Samsung Pay_](https://www.samsung.com.br/samsungpay/){:target="\_blank"}
- [_Google Pay_](https://pay.google.com/intl/pt-BR_br/about/){:target="\_blank"}
- [_Masterpass_](https://masterpass.com/pt-br/){:target="\_blank"}

<aside class="warning">Quando o nó “Wallet” é enviado na requisição, o nó “CreditCard” passa a ser opcional.</aside>
<aside class="warning">Quando o nó "Wallet" é enviado na requisição, para o cartão de débito é necessário o envio do nó “DebitCard” contendo a “ReturnUrl”.</aside>

## Integração da E-Wallet

Veja abaixo a representação de um **fluxo transacional** padrão na integração de uma e-wallet:

![Fluxo E-wallets]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/e-wallets-cielo-100.png)

A seguir, um exemplo de requisição padrão para integração da e-wallet:

### Requisição

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "Exemplo Wallet Padrão",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 100,
    "Installments": 1,
    "Currency": "BRL",
    "Wallet": {
      "Type": "TIPO DE WALLET",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
      "AdditionalData": {
        "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
      }
    }
  }
}
```

```shell
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId": "2014111708",
   "Customer": {
      "Name": "Exemplo Wallet Padrão",
      "Identity": "11225468954",
      "IdentityType": "CPF"
   },
   "Payment": {
      "Type": "CreditCard",
      "Amount": 100,
      "Installments": 1,
      "Currency": "BRL",
      "Wallet": {
         "Type": "TIPO DE WALLET",
         "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
         "AdditionalData": {
            "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
         }
      }
   }
}
```

| Propriedade                                | Descrição                                                                                                                                                                               | Tipo   | Tamanho | Obrigatório?            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------- |
| `MerchantId`                               | Identificador da loja na Cielo.                                                                                                                                                         | GUID   | 36      | Sim (envio no _header_) |
| `MerchantKey`                              | Chave pública para autenticação dupla na Cielo.                                                                                                                                         | Texto  | 40      | Sim (envio no _header_) |
| `RequestId`                                | Identificador do request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.                                                                                  | GUID   | 36      | Não (envio no _header_) |
| `MerchantOrderId`                          | Número de identificação do pedido.                                                                                                                                                      | Texto  | 50      | Sim                     |
| `Customer.Name`                            | Nome do comprador.                                                                                                                                                                      | Texto  | 255     | Não                     |
| `Customer.Status`                          | Status de cadastro do comprador na loja ("NEW" / "EXISTING").                                                                                                                           | Texto  | 255     | Não                     |
| `Payment.Type`                             | Tipo do meio de pagamento.                                                                                                                                                              | Texto  | 100     | Sim                     |
| `Payment.Amount`                           | Valor do pedido, em centavos.                                                                                                                                                           | Número | 15      | Sim                     |
| `Payment.Installments`                     | Número de parcelas.                                                                                                                                                                     | Número | 2       | Sim                     |
| `Wallet.Type`                              | Tipo de carteira: "ApplePay" / "SamsungPay" / "GooglePay" / "VisaCheckout" / "Masterpass".                                                                                              | Texto  | --      | Sim                     |
| `Wallet.WalletKey`                         | Chave criptográfica que identifica lojas nas wallets. Consultar a tabela [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey) para mais informações. | Texto  | --      | Sim                     |
| `Wallet.AdditionalData.EphemeralPublicKey` | Token retornado pela wallet. Deve ser enviado em integrações **ApplePay**.                                                                                                              | Texto  | --      | Sim                     |
| `Wallet.AdditionalData.CaptureCode`        | Código informado pela **Masterpass** ao lojista.                                                                                                                                        | Texto  | --      | Sim                     |
| `Wallet.AdditionalData.Signature`          | Token retornado pela wallet. Deve ser enviado em integrações **GooglePay**.                                                                                                             | Texto  | --      | Sim                     |

#### WalletKey

WalletKey é o identificador utilizado pela Cielo para descriptografar payloads retornados pela wallet.

Os formatos de `WalletKey` que devem ser repassados à API Cielo E-commerce são:

| Carteira      | Exemplo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| _Apple Pay_   | 9zcCAciwoTS+qBx8jWb++64eHT2QZTWBs6qMVJ0GO+AqpcDVkxGPNpOR/D1bv5AZ62+5lKvucati0+eu7hdilwUYT3n5swkHuIzX2KO80Apx/SkhoVM5dqgyKrak5VD2/drcGh9xqEanWkyd7wl200sYj4QUMbeLhyaY7bCdnnpKDJgpOY6J883fX3TiHoZorb/QlEEOpvYcbcFYs3ELZ7QVtjxyrO2LmPsIkz2BgNm5f+JaJUSAOectahgLZnZR+easdhghrsa/E9A6DwjMd0fDYnxjj0bQDfaZpBPeGGPFLu5YYn1IDc                                                                                                                                                                                                                                                                                                                                                                                                                       |
| _Samsung Pay_ | eyJhbGciOiJSU0ExXzUiLCJraWQiOiIvam1iMU9PL2hHdFRVSWxHNFpxY2VYclVEbmFOUFV1ZUR5M2FWeHBzYXVRPSIsInR5cCI6IkpPU0UiLCJjaGFubmVsU2VjdXJpdHlDb250ZXh0IjoiUlNBX1BLSSIsImVuYyI6IkExMjhHQ00ifQ.cCsGbqgFdzVb1jhXNR--gApzoXH-fdafddfa-Bo_utsmDN_DuGm69Kk2_nh6txa7ML9PCI59LFfOMniAf7ZwoZUBDCY7Oh8kx3wsZ0kxNBwfyLBCMEYzET0qcIYxePezQpkNcaZ4oogmdNSpYY-KbZGMcWpo1DKhWphDVp0lZcLxA6Q25K78e5AtarR5whN4HUAkurQ.CFjWpHkAVoLCG8q0.NcsTuauebemJXmos_mLMTyLhEHL-p5Wv6J88WkgzyjAt_DW7laiPMYw2sqRXkOiMJLwhifRzbSp8ZgJBM25IX05dKKSS4XfFjJQQjOBHw6PYtEF5pUDMLHML3jcddCrX07abfef_DuP41PqOQYsjwesLZ8XsRj-R0TH4diOZ_GQop8_oawjRIo9eJr9Wbtho0h8kAzHYpfuhamOPT718EaGAY6SSrR7t6nBkzGNkrKAmHkC7aRwe.AbZG53wRqgF0XRG3wUK_UQ                                                      |     |
| _Google Pay_  | {\"encryptedMessage\":\"0mXBb94Cy9JZhMuwtrBhMjXb8pDslrNsN5KhcEqnowOINqJgjXHD36KcCuzpQQ4cDAe64ZLmk2N3UBGXsN9hMMyeMakXlidVmteE+QMaNZIor048oJqlUIFPD54B/ic8zCdqq3xnefUmyKQe0I03x57TcEA9xAT/E4x3rYfyqLFUAEtu2lT0GwTdwgrsT8pKoTldHIgP+wVNTjrKvJrB4xM/Bhn6JfcSmOzFyI6w37mBU71/TK761nYOSxt7z1bNWSLZ4b8xBu1dlRgen2BSlqdafuQjV3UZjr6ubSvaJ8NiCh5FD/X013kAwLuLALMS2uAFS9j8cZ6R6zNIi13fK6Fe4ACbFTHwLzSNZjQiaRDb6MlMnY8/amncPIOXzpirb5ScIz8EZUL05xd+3YWVTVfpqgFo1eaaS+wZdUyRG0QEgOsr6eLBoH8d5lfV9Rx6XdioorUuT7s1Yqc0OJZO+fhBt6X0izE9hBGTexdZyg\\u003d\\u003d\",\"ephemeralPublicKey\":\"BMdwrkJeEgCOtLevYsN3MbdP8xbOItXiTejoB6vXy0Kn0ZM10jy4Aasd6jTSxtoxoTpFydLhj5kzoOhbw2OzZu0\\u003d\",\"tag\":\"yAQIjWZ0VuCC7SWyYwc4eXOzpSUKhZduF9ip0Ji+Gj8\\u003d\"} |
| _Masterpass_  | a561da1c18a89cfdafas875f9d43fc46cd9bf3e1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### EphemeralPublicKey

Formato de `EphemeralPublicKey` que deve ser repassado à API Cielo E-commerce:

| Carteira    | Exemplo                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| _Apple Pay_ | MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoedz1NqI6hs9hEO6dBsnn0X0xp5/DKj3gXirjEqxNIJ8JyhGxVB3ITd0E+6uG4W6Evt+kugG8gOhCBrdUU6JwQ== |

#### Signature

Formato de `Signature` que deve ser repassado à API Cielo E-commerce:

| Carteira     | Exemplo                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| _Google Pay_ | MEUCIQCGQLOmwxe5eFMSuTcr4EcwSZu35fB0KlCWcVop6ZxxhgIgbdtNHThSlynOopfxMIxkDs0cLh2NFh5es+J5uDmaViA\u003d |

### Respostas

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******1521",
      "Holder": "BJORN IRONSIDE",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "TIPO DE WALLET",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
      "Eci": 0,
      "AdditionalData": {
        "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
      }
    },
    "SoftDescriptor": "123456789ABCD",
    "Amount": 100,
    "ReceivedDate": "2018-03-19 16:08:16",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
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

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "[Guest]"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "453211******1521",
            "Holder": "BJORN IRONSIDE",
            "ExpirationDate": "08/2020",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "0319040817883",
        "ProofOfSale": "817883",
        "AuthorizationCode": "027795",
        "Wallet": {
            "Type": "TIPO DE WALLET",
            "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
            "Eci": 0,
            "AdditionalData": {
                "EphemeralPublicKey": "TOKEN INFORMADO PELA WALLET"
            },
        },
        "SoftDescriptor": "123456789ABCD",
        "Amount": 100,
        "ReceivedDate": "2018-03-19 16:08:16",
        "Status": 1,
        "IsSplitted": false,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "4",
        "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
        "Type": "CreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
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

| Propriedade                         | Descrição                                                                                                                                                                              | Tipo  | Tamanho | Formato                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `ProofOfSale`                       | Número da autorização, idêntico ao NSU.                                                                                                                                                | Texto | 6       | Texto alfanumérico                                                                                                   |
| `Tid`                               | Id da transação na adquirente.                                                                                                                                                         | Texto | 20      | Texto alfanumérico                                                                                                   |
| `AuthorizationCode`                 | Código de autorização.                                                                                                                                                                 | Texto | 6       | Texto alfanumérico                                                                                                   |
| `SoftDescriptor`                    | Texto que será impresso na fatura bancária do portador. Disponível apenas para VISA/MASTER - não permite caracteres especiais.                                                         | Texto | 13      | Texto alfanumérico                                                                                                   |
| `PaymentId`                         | Campo identificador do pedido.                                                                                                                                                         | GUID  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                 |
| `ECI`                               | _Electronic Commerce Indicator_. Representa o quão segura é uma transação.                                                                                                             | Texto | 2       | Ex.: 7                                                                                                               |
| `Status`                            | Status da transação.                                                                                                                                                                   | Byte  | 2       | Ex.: 1                                                                                                               |
| `ReturnCode`                        | Código de retorno da adquirência.                                                                                                                                                      | Texto | 32      | Texto alfanumérico                                                                                                   |
| `ReturnMessage`                     | Mensagem de retorno da adquirência.                                                                                                                                                    | Texto | --      | Texto alfanumérico                                                                                                   |
| `Type`                              | Tipo de carteira: "ApplePay" / "SamsungPay" / "GooglePay" / "VisaCheckout" / "Masterpass".                                                                                             | Texto | --      | Texto alfanumérico                                                                                                   |
| `WalletKey`                         | Chave criptográfica que identifica lojas nas wallets. Consulte a tabela [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey) para mais informações. | Texto | --      | Ver tabela [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey)                   |
| `AdditionalData.EphemeralPublicKey` | Token retornado pela wallet. Deve ser enviado em Integrações: "ApplePay".                                                                                                              | Texto | --      | Ver tabela [EphemeralPublicKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#ephemeralpublickey) |
| `AdditionalData.CaptureCode`        | Código informado pela **Masterpass** ao lojista.                                                                                                                                       | Texto | --      | 3                                                                                                                    |
| `AdditionalData.Signature`          | Token retornado pela wallet. Deve ser enviado em Integrações: "GooglePay".                                                                                                             | Texto | --      | Ver tabela [Signature](https://developercielo.github.io/manual/e-wallets-ecommercecielo#signature)                   |

# Exemplos de Integração

A seguir, veja alguns exemplos de integração com as principais e-wallets disponíveis no mercado.

# Apple Pay ™

O Apple Pay é uma carteira virtual. Ele permite que o comprador realize pagamentos em lojas virtuais e apps utilizando, de forma prática e segura, seus cartões de crédito e débito armazenados em suas contas e dispositivos Apple.

## Pré-Requisitos

Para utilização do Apple Pay, é necessário que a loja já esteja cadastrada no programa AppleID. Além disso, você deve:

1. Realizar o cadastro, acessando [esta URL](https://developer.apple.com/programs/enroll/) e seguindo todos os passos requeridos pela Apple;
2. Seguir os passos dessa documentação para completar a integração junto à Apple;
3. Contratar a API E-commerce Cielo;
4. Contratar a Cielo 3.0 como adquirência;
5. Integrar com a [API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce).

## ETAPA 1 - Configuração do Merchant Identifier

Nesta etapa inicial, você deverá criar um **merchant identifier** para sua loja. Após criado, o merchant identifier deverá ser enviado à Cielo em solicitação a um **certificado ".CSR"**. O certificado ".CSR" criado pela Cielo deverá ser utilizado na criação de um novo certificado junto à Apple, o **certificado ".CER"**, que irá servir no seguimento para a segunda etapa do processo.

### Passo 1 - Criar o Merchant Identifier

A criação do merchant identifier deve ser feita através do [Portal de Desenvolvedores da Apple](https://developer.apple.com/account/resources), da seguinte maneira:

1. Na seção **"Certificates, Identifiers & Profiles"**, selecione **"Identifiers"** no menu lateral, e então clique no botão `(+)` ao lado do título:
   ![Step1.1]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay01.png)
2. Selecione a opção **"Merchant IDs"** e então clique em `Continue`:
   ![Step1.2]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay02.png)
3. Coloque um valor nos campos **"Description"** e **"Identifier"**, seguindo suas especificações, e clique em `Continue`:
   ![Step1.3]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay03.png)
4. Para finalizar, clique em `Register`:
   ![Step1.4]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay04.png)

### Passo 2 - Solicitar o Certificado ".CSR"

Para solicitar à Cielo a geração do certificado no formato ".CSR", entre em contato com o nosso [Time de Atendimento](https://devcielo.zendesk.com/hc/pt-br#suporte){:target="\_blank"} e informe:

1. O **Merchant Identifier** criado no "Passo 1";
2. O **Merchant ID** de sua loja na Cielo em produção.

Nossa equipe irá retornar com o arquivo ".CSR" em até 48 horas úteis.

### Passo 3 - Criar o Certificado ".CER"

Para criar um certificado de processamento de pagamento (".CER"), que será utilizado em sua loja virtual ou aplicativo, é necessário acessar o [Portal de Desenvolvedores da Apple](https://developer.apple.com/account/resources){:target="\_blank"} e seguir os passos abaixo:

1. Na seção **"Certificates, Identifiers & Profiles"**, selecione **"Identifiers"**, no menu lateral.
2. Utilizando o filtro localizado à direita superior (**"App IDs"**), encontre o item **"Merchant IDs"**:
   ![Step2.1]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay05.png)
3. Selecione o identifier criado anteriormente:
   ![Step2.2]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay06.png)
4. No bloco **"Apple Pay Payment Processing Certificate"**, clique no botão `Create Certificate` ao final do texto explicativo:
   ![Step2.3]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay07.png)
5. Escolha a opção **"No"** em **"Edit or Configure Merchant ID"**:
   ![Step2.4]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay08.png)
6. Na caixa de diálogo, clique em `Choose File` e escolha o certificado ".CSR" enviado pela Cielo:
   ![Step2.5]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay09.png)
7. Clique em `Continue`:
   ![Step2.6]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay10.png)
8. Clique em `Download` para baixar o arquivo ".CER":
   ![Step2.7]({{ site.baseurl_root }}/images/apicieloecommerce/e-wallets/applepay11.png)

Para mais detalhes, acesse a [Developer Account Help](https://help.apple.com/developer-account/#/devb2e62b839){:target="\_blank"} da Apple.

## ETAPA 2. Integração com Apple Pay

Boa parte do processo para disponibilização do botão "Pagar com Apple Pay" no seu app ou site será realizado na sua integração junto à wallet. Por isso, recomendamos que siga as orientações disponíveis no site de [Documentação da Apple](https://developer.apple.com/documentation){:target="\_blank"} para a implementação, que é totalmente self-service.

Ao final do processo realizado na API da Apple, você receberá um JSON contendo dois campos importantes que deverão ser utilizados na "ETAPA 3". São os campos `paymentData.data` e `ephemeralPublicKey.header.EphemeralPublicKey`.

```json
{
  "applePayData": {
    "paymentData": {
      "version": "EC_v1",
      "data": "as01vRj+n9crY2vome7zc+u7Tz0+qg2La/8IUHpJIjFN6ThhUqLnSrskQHTrEbcYPiMksFK0+ddo9sZu70uJQJH1I+44N6PrVhilNDem97vOXq2VYDXiVJ27F/Q9wGQDgZBeGcZ6Pml9SIelHqUauBcQoOatrlnWPUL8kbdpT8WqgzXyaCh7oeTz=z6++rp/ofjvSjnGtOqAUsnrzvw4uzkcyKUSsfROdJ6B/Xzgu/T9fMIr5UxXD2DPF1SNh3ydEJABKz4HFjDW7ObvbQeua4GYxJdpQLpI3NgUbJy91E/LOyb/+PcCtO+0=a41tBrfnTTF9qsPuCIw8HWIEEKSRofn27NTofxev/i+nHEfqEtqNrN/epIvhzceD/gDiGetfiLKMzf94ARmpWUAMC==",
      "signature": "(…)",
      "header": {
        "ephemeralPublicKey": "MFkwEwZJKoZIzj0CAQYIKo12zj0DAQcDQgAEo+ReGClSmQ4hDJD1yh9nci3V4l7kPm2AQtKZMMvuNS0iK5sn/1A9l3kw1B1xCqOycZmnPSng7p5hpTvrei1BCA==",
        "publicKeyHash": "KXN06+BtJu6yEfF9zDhr7f4M/2HwVybnx0FGfC520gB=",
        "transactionId": "71c5b61c3791546e94d2b4893a6c69aaac2ab86b5c113c83a7d89057906a9b5f"
      }
    },
    "paymentMethod": {
      "displayName": "MasterCard 1212",
      "network": "MasterCard",
      "type": "credit"
    },
    "transactionIdentifier": "81C5B61C3791646E94D2B4893A6C69BBBC2AB86B5C363C83A7D89057906A9BAC"
  },
  "x_document": "24562608994",
  "x_name": "João da Silva"
}
```

### Nota Importante

<aside class="warning">Durante a implementação da Apple, haverá uma referência ao certificado ".CER", gerado durante a ETAPA 1, para criptografar os dados durante a comunicação com a Apple. No fluxo de integração NÃO implemente o processo de descriptografia dos dados retornados pela Apple pois esse trabalho é feito pela API E-commerce Cielo.</aside>

## ETAPA 3. Integração com a API E-commerce Cielo (descriptografia e autorização)

A autorização com o token do Apple Pay acontece da mesma forma que a autorização padrão de um cartão de crédito. Porém, ao invés de se fornecer os dados do cartão abertamente, deverá ser fornecido o token recebido pelo Apple Pay, conforme o exemplo abaixo:

### Requisição

```json
{
   "MerchantOrderId": "2017051002",
   "Customer": {
     (…)
   },
   "Payment": {
      "Type": "CreditCard",
      "Amount": 1000,
      "Installments": 1,
      "Currency": "BRL",
      "Wallet": {
         "Type": "ApplePay",
         "WalletKey":"['paymentData.data']",
         "AdditionalData": {
            "EphemeralPublicKey": "['ephemeralPublicKey.header.EphemeralPublicKey']"
         }
      }
   }
}
```

| Parâmetros do Header | Descrição                                      | Tipo e Tamanho |
| -------------------- | ---------------------------------------------- | -------------- |
| `MerchantId`         | ID do estabelecimento na API E-commerce Cielo. | GUID (36)      |
| `MerchantKey`        | Chave da API para a API E-commerce Cielo.      | String (24)    |

| Parâmetro                                          | Descrição                                                                                                   | Tipo e Tamanho                                                                                                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MerchantOrderId`                                  | Número de identificação do pedido.                                                                          | String (50)                                                                                                                                                              |
| `Customer`                                         | Nó com dados do comprador.                                                                                  | Consulte o manual da [API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce#criando-uma-transa%C3%A7%C3%A3o-de-cr%C3%A9dito){:target="\_blank"}. |
| `Payment.Type`                                     | Tipo do meio de pagamento. Possibilidades: "CreditCard" / "DebitCard".                                      | String (100)                                                                                                                                                             |
| `Payment.Amount`                                   | Valor do pedido, em centavos.                                                                               | Número (15)                                                                                                                                                              |
| `Payment.Installments`                             | Número de parcelas.                                                                                         | Número (2)                                                                                                                                                               |
| `Payment.Wallet.Type`                              | Nome do provedor do meio de pagamento. Para transações Apple Pay, utilize "ApplePay".                       | String (15)                                                                                                                                                              |
| `Payment.Wallet.WalletKey`                         | Preencher com o valor do parâmetro `paymentData.data` retornado pelo Apple Pay.                             | String                                                                                                                                                                   |
| `Payment.Wallet.AdditionalData.EphemeralPublicKey` | Preencher com o valor do parâmetro `ephemeralPublicKey.header.EphemeralPublicKey` retornado pelo Apple Pay. | String                                                                                                                                                                   |

### Resposta

```json
{
    "MerchantOrderId": "2017051002",
    "Customer": {(…)
    },
    "Payment": {
        (…)
        "CreditCard": {
            (…)
        },
        (…)
        "Wallet": {
            "Type": "ApplePay",
            "WalletKey": "as01vRj+n9crY2vome7zc+u7Tz0+qg2La/8IUHpJIjFN6ThhUqLnSrskQHTrEbcYPiMksFK0+ddo9sZu70uJQJH1I+44N6PrVhilNDem97vOXq2VYDXiVJ27F/Q9wGQDgZBeGcZ6Pml9SIelHqUauBcQoOatrlnWPUL8kbdpT8WqgzXyaCh7oeTz=z6++rp/ofjvSjnGtOqAUsnrzvw4uzkcyKUSsfROdJ6B/Xzgu/T9fMIr5UxXD2DPF1SNh3ydEJABKz4HFjDW7ObvbQeua4GYxJdpQLpI3NgUbJy91E/LOyb/+PcCtO+0=a41tBrfnTTF9qsPuCIw8HWIEEKSRofn27NTofxev/i+nHEfqEtqNrN/epIvhzceD/gDiGetfiLKMzf94ARmpWUAMC==",
            "AdditionalData": {
                "EphemeralPublicKey": "MFkwEwZJKoZIzj0CAQYIKo12zj0DAQcDQgAEo+ReGClSmQ4hDJD1yh9nci3V4l7kPm2AQtKZMMvuNS0iK5sn/1A9l3kw1B1xCqOycZmnPSng7p5hpTvrei1BCA=="
            }
        },
        (…)
        "Links": [
            (…)
        ]
    }
}
```

A resposta de autorização da wallet terá os mesmos campos apresentados na documentação da [API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce#resposta32){:target="\_blank"}, porém com a adição do nó `Payment.Wallet` repetindo os mesmos campos utilizados na autorização, como descrito acima.

# Google Pay ™

O Google Pay é uma carteira virtual. Ele permite que os compradores realizem pagamentos em lojas virtuais e apps utilizando, de forma prática e segura, seus cartões de crédito e débito armazenados em suas contas "Google Account" e dispositivos Android.

## Pré-Requisitos

Para utilização do Google Pay, é necessário que a loja já possua cadastro e integração Google Pay. Além disso, você deve:

1. Concordar com os termos de serviço do Google Pay;
2. Seguir os passos dessa documentação para completar a integração junto à [Google Pay](https://developers.google.com/pay/api/android/overview){:target="\_blank"};
3. Contratar a API E-commerce Cielo;
4. Contratar o Cielo 3.0 como adquirência;
5. Integrar com a [API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce){:target="\_blank"}.

## ETAPA 1: Integração com Google Pay

Nesta etapa inicial, você deverá configurar seu projeto e implementar o Google Pay em seu aplicativo Android.

### Passo 1 - Configuração do Projeto

Para configurar seu projeto, siga as instruções descritas no [Guia de Configuração](https://developers.google.com/pay/api/android/guides/setup) do Google Pay.<br>
Neste passo, você deverá **adicionar dependências** importando a biblioteca do Google Play Services ou então escolhendo as APIs que deseja compilar. E então, para ativar o Google Pay no seu aplicativo Android, você deverá **modificar o arquivo _"AndroidManifest.xml"_** do seu projeto de acordo com as instruções dadas na página.

### Passo 2 - Implementação do Google Pay

Para integrar o Google Pay em seu aplicativo, siga todos os passos indicados no [Tutorial de Implementação](https://developers.google.com/pay/api/android/guides/tutorial) do Google Pay.
<br/><br/>
Para a correta integração do Google Pay via Cielo, é necessário se atentar aos pontos abaixo:

#### Definição do Gateway

No passo _"Step 2: Request a payment token for your payment provider"_, siga o modelo indicado como "GATEWAY" e atribua o valor "PAYMENT_GATEWAY" ao parâmetro `type` e o valor "cielo" ao parâmetro `gateway`, conforme o exemplo dado:

```json
private static JSONObject getTokenizationSpecification() {
  JSONObject tokenizationSpecification = new JSONObject();
  tokenizationSpecification.put("type", "PAYMENT_GATEWAY");
  tokenizationSpecification.put(
      "parameters",
      new JSONObject()
          .put("gateway", "cielo")
          .put("gatewayMerchantId", "exampleMerchantId"));
  return tokenizationSpecification;
}
```

Preencha o parâmetro `gatewayMerchantId` com o identificador de sua loja, gerado pelo gateway. O identificador da loja segue o formato "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" (tipo _GUID_ / tamanho _36_).

#### Definição das Bandeiras

No passo _"Step 3: Define supported payment card networks"_, configure conforme as bandeiras aceitas pela _wallet_.

#### Definição do Ambiente

No passo _"Step 5: Create a PaymentsClient instance"_, utilize o valor "WalletConstants.ENVIRONMENT_TEST" para o ambiente de testes.

#### Definição dos Dados de Compra

No passo _"Step 7: Create a PaymentDataRequest object"_, utilize o valor "BRL" para o parâmetro `currencyCode`. O campo `merchantName` é o nome que o comprador visualizará durante o pagamento com Google Pay e recomenda-se, desta forma, colocar-se um nome amigável e reconhecido.

#### Recuperação dos Dados de Pagamento

No passo _"Step 9: Handle the response object"_, está descrito o evento `Activity.RESULT_OK`, onde é retornado um objeto com todos os dados referentes ao dados de pagamento, inclusive o token de pagamento.

A partir do `PaymentData`, obtém-se o objeto `PaymentMethodToken`, através da chamada do método `getPaymentMethodToken()`. [Clique aqui](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentData) para mais informações.

Na sequência, deve-se obter a _string_ que contém tokens de pagamento a partir do método `GetToken()` do objeto `PaymentMethodToken`. [Clique aqui](https://developers.google.com/android/reference/com/google/android/gms/wallet/PaymentMethodToken) para mais informações.

A _string_ obtida no passo anterior possui uma estrutura como a mostrada a seguir. [Clique aqui](https://developers.google.com/pay/api/android/guides/resources/payment-data-cryptography) para mais informações.

```json
{
  "protocolVersion": "ECv1",
  "signature": "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "signedMessage": "{\"encryptedMessage\":
  \"ZW5jcnlwdGVkTWVzc2FnZQ==\",\"ephemeralPublicKey\":
  \"ZXBoZW1lcmFsUHVibGljS2V5\",\"tag\": \"c2lnbmF0dXJl\"}"
}
```

| Parâmetro       | Type   | Descrição               |
| --------------- | ------ | ----------------------- |
| `signedMessage` | string | Mensagem assinada.      |
| `signature`     | string | Assinatura da mensagem. |

Guarde os dados `signedMessage` e `signature`, que serão requisitados na autorização via API E-commerce Cielo na ETAPA 2, descrita a seguir.

## ETAPA 2: Autorização com Token

A autorização com o token do Google Pay acontece da mesma forma que a autorização padrão de um cartão de crédito. Porém, ao invés de se fornecer os dados do cartão abertamente, deverá ser fornecido o token recebido pelo Google Pay, conforme o exemplo abaixo:

### Request

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

| Parâmetros do Header | Descrição                                                                                                | Tipo e tamanho |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| `MerchantId`         | ID do estabelecimento na Cielo 3.0. Para ambiente Sandbox, utilize 63D6ACCB-2734-4236-AB5D-843A9DAC44C7. | GUID (36)      |
| `MerchantKey`        | Chave da API para Cielo 3.0. Para ambiente Sandbox, utilize ZCVHDJWKTGOZXADDYJFURIDIKHEMRYQAQDYEJMQK.    | String (24)    |

| Parâmetro                                 | Descrição                                                                                | Tipo e tamanho                                                                                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MerchantOrderId`                         | Número de identificação do pedido.                                                       | String (50)                                                                                                                                                              |
| `Customer`                                | Nó com dados do comprador.                                                               | Consulte o manual da [API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce#criando-uma-transa%C3%A7%C3%A3o-de-cr%C3%A9dito){:target="\_blank"}. |
| `Payment.Type`                            | Tipo do meio de pagamento. Possibilidades: "CreditCard" / "DebitCard".                   | String (100)                                                                                                                                                             |
| `Payment.Amount`                          | Valor do pedido, em centavos.                                                            | Número (15)                                                                                                                                                              |
| `Payment.Installments`                    | Número de parcelas.                                                                      | Número (2)                                                                                                                                                               |
| `Payment.Wallet.Type`                     | Nome do provedor de meio de pagamento. Para transações Google Pay, utilize "AndroidPay". | String (15)                                                                                                                                                              |
| `Payment.Wallet.WalletKey`                | Preencher com o valor do parâmetro `signedMessage` retornado pelo Google Pay.            | String                                                                                                                                                                   |
| `Payment.Wallet.AdditionalData.Signature` | Preencher com o valor do parâmetro `signature` retornado pelo Google Pay.                | String                                                                                                                                                                   |

Para mais informações, consulte o manual da API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce#criando-uma-transa%C3%A7%C3%A3o-de-cr%C3%A9dito){:target="_blank"}.

### Resposta

A resposta de autorização da wallet terá os mesmos campos apresentados em nossa documentação do API E-commerce Cielo](https://developercielo.github.io/manual/cielo-ecommerce#resposta32){:target="_blank"}, porém com a adição do nó `Payment.Wallet` repetindo os mesmos campos utilizados na autorização, como descrito acima.

## ETAPA 3: Solicitação de Dados de Produção

Para finalizar o processo, é necessário **validar os passos** das etapas anteriores e então **solicitar as credenciais de acesso** para entrar em produção.

### Passo 1 - Branding Guideline

Verifique se todas as diretrizes de branding foram seguidas conforme descrito no [Guia Diretrizes de Marca](https://developers.google.com/pay/api/android/guides/brand-guidelines){:target="\_blank"}.

### Passo 2 - Checklist e Solicitação de Credenciais

Verifique se todos os itens do [checklist de integração](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist){:target="\_blank"} foram atendidos. Após tudo validado, solicite os dados de acesso produtivos.

# Masterpass™

Para utilizar o Masterpass é necessária a contratação do serviço através do contato diretamente com a Mastercard, selecionando a Cielo como _service provider_.

## Requisição

Exemplo de requisição padrão Masterpass:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "Comprador Masterpass"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "Wallet": {
      "Type": "Masterpass",
      "WalletKey": "a561da1c18a89cfdafas875f9d43fc46cd9bf3e1",
      "AdditionalData": {
        "CaptureCode": "103"
      }
    }
  }
}
```

```shell
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"2014111708",
   "Customer":{
      "Name":"Comprador Masterpass"
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":15700,
      "Installments":1,
      "Wallet":{
         "Type":"Masterpass",
         "WalletKey":"a561da1c18a89cfdafas875f9d43fc46cd9bf3e1",
         "AdditionalData":{
            "CaptureCode": "103"
         }
      }
   }
}
```

| Propriedade             | Descrição                                                                                                                                                                                | Tipo   | Tamanho | Obrigatório?            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------- |
| `MerchantId`            | Identificador da loja na Cielo.                                                                                                                                                          | GUID   | 36      | Sim (envio no _header_) |
| `MerchantKey`           | Chave pública para autenticação dupla na Cielo.                                                                                                                                          | Texto  | 40      | Sim (envio no _header_) |
| `RequestId`             | Identificador do request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.                                                                                   | GUID   | 36      | Não (envio no _header_) |
| `MerchantOrderId`       | Número de identificação do pedido.                                                                                                                                                       | Texto  | 50      | Sim                     |
| `Customer.Name`         | Nome do comprador.                                                                                                                                                                       | Texto  | 255     | Não                     |
| `Customer.Status`       | Status de cadastro do comprador na loja ("NEW" / "EXISTING").                                                                                                                            | Texto  | 255     | Não                     |
| `Payment.Type`          | Tipo do meio de pagamento.                                                                                                                                                               | Texto  | 100     | Sim                     |
| `Payment.Amount`        | Valor do pedido, em centavos.                                                                                                                                                            | Número | 15      | Sim                     |
| `Payment.Installments`  | Número de parcelas.                                                                                                                                                                      | Número | 2       | Sim                     |
| `Wallet.Type`           | Tipo de carteira: "Masterpass".                                                                                                                                                          | Texto  | 255     | Sim                     |
| `Wallet.WalletKey`      | Chave criptográfica que representa os dados do cartão. Consultar a tabela [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey) para mais informações. | Texto  | 255     | Sim                     |
| `Wallet.AdditionalData` | Instância para dados extras informados pela **Masterpass**. Obs.: Obrigatório apenas para `Wallet.Type` "Masterpass"                                                                     | ---    | ---     | ---                     |
| `Wallet.CaptureCode`    | Código informado pela **Masterpass** ao lojista.                                                                                                                                         | Texto  | 255     | Sim                     |

## Resposta

```json
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "comprador Masterpass"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******3703",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2016",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0915052536103",
    "Wallet": {
      "Type": "Masterpass",
      "Eci": 0,
      "AdditionalData": {
        "CaptureCode": "103"
      }
    },
    "PaymentId": "689da793-fc99-4900-89f1-9e7fdaa06ef8",
    "Type": "CreditCard",
    "Amount": 15700,
    "ReceivedDate": "2016-09-15 17:25:35",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "57",
    "ReturnMessage": "Card Expired",
    "Status": 3,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      }
    ]
  }
}
```

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
  "MerchantOrderId": "2014111708",
  "Customer": {
    "Name": "comprador Masterpass"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******3703",
      "Holder": "Teste Holder",
      "ExpirationDate": "12/2016",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0915052536103",
    "Wallet": {
      "Type": "Masterpass",
      "Eci": 0,
      "AdditionalData": {
        "CaptureCode": "103"
      }
    },
    "PaymentId": "689da793-fc99-4900-89f1-9e7fdaa06ef8",
    "Type": "CreditCard",
    "Amount": 15700,
    "ReceivedDate": "2016-09-15 17:25:35",
    "Currency": "BRL",
    "Country": "BRA",
    "ReturnCode": "57",
    "ReturnMessage": "Card Expired",
    "Status": 3,
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      }
    ]
  }
}
```

| Propriedade         | Descrição                                                                                                                           | Tipo  | Tamanho | Formato                              |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ------------------------------------ |
| `ProofOfSale`       | Número da autorização, idêntico ao NSU.                                                                                             | Texto | 6       | Texto alfanumérico                   |
| `Tid`               | Identificador da transação na adquirente.                                                                                           | Texto | 20      | Texto alfanumérico                   |
| `AuthorizationCode` | Código de autorização.                                                                                                              | Texto | 6       | Texto alfanumérico                   |
| `SoftDescriptor`    | Texto que será impresso na fatura bancária do portador. Obs.: Não permite caracteres especiais. Disponível apenas para VISA/MASTER. | Texto | 13      | Texto alfanumérico                   |
| `PaymentId`         | Campo identificador do pedido.                                                                                                      | GUID  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`               | _Electronic Commerce Indicator_. Representa o quão segura é uma transação.                                                          | Texto | 2       | Ex.: 7                               |
| `Status`            | Status da transação.                                                                                                                | Byte  | 2       | Ex.: 1                               |
| `ReturnCode`        | Código de retorno da adquirência.                                                                                                   | Texto | 32      | Texto alfanumérico                   |
| `ReturnMessage`     | Mensagem de retorno da adquirência.                                                                                                 | Texto | 512     | Texto alfanumérico                   |
| `Type`              | Tipo de carteira: "VisaCheckout" / "Masterpass".                                                                                    | Texto | 255     | Sim                                  |
| `CaptureCode`       | Código informado pela **Masterpass** ao lojista.                                                                                    | Texto | 255     | Sim                                  |

# Samsung Pay™

Abaixo segue o pré-requisito para utilizar o Samsung Pay e também um exemplo de requisição para disponibilizá-lo em sua loja.

<aside class="warning">É necessário que a loja já possua cadastro e integração Samsung Pay, caso contrário não será possível a integração com a API.</aside>

## Requisição

Exemplo de requisição padrão Samsung Pay:

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/1/sales/</span></aside>

```json
{
  "MerchantOrderId": "6242-642-723",
  "Customer": {
    "Name": "Exemplo Wallet Padrão",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1,
    "Installments": 1,
    "Currency": "BRL",
    "Wallet": {
      "Type": "SamsungPay",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET"
    }
  }
}
```

```shell
curl
--request POST "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"
--header "Content-Type: application/json"
--header "MerchantId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--header "MerchantKey: 0123456789012345678901234567890123456789"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
   "MerchantOrderId":"6242-642-723",
   "Customer":{
      "Name":"Exemplo Wallet Padrão",
      "Identity":"11225468954",
      "IdentityType":"CPF"
   },
   "Payment":{
      "Type":"CreditCard",
      "Amount":1,
      "Installments":1,
      "Currency":"BRL",
      "Wallet":{
         "Type":"SamsungPay",
         "WalletKey":"IDENTIFICADOR DA LOJA NA WALLET"
      }
   }
}
```

| Propriedade            | Descrição                                                                                                                                                                                | Tipo   | Tamanho | Obrigatório?            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----------------------- |
| `MerchantId`           | Identificador da loja na Cielo.                                                                                                                                                          | GUID   | 36      | Sim (envio no _header_) |
| `MerchantKey`          | Chave pública para autenticação dupla na Cielo.                                                                                                                                          | Texto  | 40      | Sim (envio no _header_) |
| `RequestId`            | Identificador do request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.                                                                                   | GUID   | 36      | Não (envio no _header_) |
| `MerchantOrderId`      | Número de identificação do pedido.                                                                                                                                                       | Texto  | 50      | Sim                     |
| `Customer.Name`        | Nome do comprador.                                                                                                                                                                       | Texto  | 255     | Não                     |
| `Customer.Status`      | Status de cadastro do comprador na loja ("NEW" / "EXISTING").                                                                                                                            | Texto  | 255     | Não                     |
| `Payment.Type`         | Tipo do meio de pagamento.                                                                                                                                                               | Texto  | 100     | Sim                     |
| `Payment.Amount`       | Valor do pedido, em centavos.                                                                                                                                                            | Número | 15      | Sim                     |
| `Payment.Installments` | Número de parcelas.                                                                                                                                                                      | Número | 2       | Sim                     |
| `Wallet.Type`          | Tipo de carteira: "ApplePay" / "SamsungPay" / "GooglePay" / "VisaCheckout" / "Masterpass".                                                                                               | Texto  | 255     | Sim                     |
| `Wallet.WalletKey`     | Chave criptográfica que representa os dados do cartão. Consultar a tabela [WalletKey](https://developercielo.github.io/manual/e-wallets-ecommercecielo#walletkey) para mais informações. | Texto  | 255     | Sim                     |

## Resposta

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******1521",
      "Holder": "BJORN IRONSIDE",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "SamsungPay",
      "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
      "Eci": 0
    },
    "SoftDescriptor": "123456789ABCD",
    "Amount": 100,
    "ReceivedDate": "2018-03-19 16:08:16",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
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

```shell
--header "Content-Type: application/json"
--header "RequestId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
--data-binary
{
    "MerchantOrderId": "2014111703",
    "Customer": {
        "Name": "[Guest]"
    },
    "Payment": {
        "ServiceTaxAmount": 0,
        "Installments": 1,
        "Interest": 0,
        "Capture": false,
        "Authenticate": false,
        "Recurrent": false,
        "CreditCard": {
            "CardNumber": "453211******1521",
            "Holder": "BJORN IRONSIDE",
            "ExpirationDate": "08/2020",
            "SaveCard": false,
            "Brand": "Visa"
        },
        "Tid": "0319040817883",
        "ProofOfSale": "817883",
        "AuthorizationCode": "027795",
        "Wallet": {
            "Type": "SamsungPay",
            "WalletKey": "IDENTIFICADOR DA LOJA NA WALLET",
            "Eci": 0
        },
        "SoftDescriptor": "123456789ABCD",
        "Amount": 100,
        "ReceivedDate": "2018-03-19 16:08:16",
        "Status": 1,
        "IsSplitted": false,
        "ReturnMessage": "Operation Successful",
        "ReturnCode": "4",
        "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
        "Type": "CreditCard",
        "Currency": "BRL",
        "Country": "BRA",
        "Links": [
            {
                "Method": "GET",
                "Rel": "self",
                "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}"
            },
            {
                "Method": "PUT",
                "Rel": "capture",
                "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{paymentId}/capture"
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

| Propriedade         | Descrição                                                                                                                                                                                         | Tipo  | Tamanho | Formato                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `ProofOfSale`       | Número da autorização, idêntico ao NSU.                                                                                                                                                           | Texto | 6       | Texto alfanumérico                                                                                                  |
| `Tid`               | Identificador da transação na adquirente.                                                                                                                                                         | Texto | 20      | Texto alfanumérico                                                                                                  |
| `AuthorizationCode` | Código de autorização.                                                                                                                                                                            | Texto | 6       | Texto alfanumérico                                                                                                  |
| `SoftDescriptor`    | Texto que será impresso na fatura bancária do portador. Obs.: Não permite caracteres especiais. Disponível apenas para VISA/MASTER.                                                               | Texto | 13      | Texto alfanumérico                                                                                                  |
| `PaymentId`         | Campo identificador do pedido.                                                                                                                                                                    | GUID  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                                                                |
| `ECI`               | _Electronic Commerce Indicator_. Representa o quão segura é uma transação.                                                                                                                        | Texto | 2       | Ex.: 7                                                                                                              |
| `Status`            | Status da transação.                                                                                                                                                                              | Byte  | 2       | Ex.: 1                                                                                                              |
| `ReturnCode`        | Código de retorno da adquirência.                                                                                                                                                                 | Texto | 32      | Texto alfanumérico                                                                                                  |
| `ReturnMessage`     | Mensagem de retorno da adquirência.                                                                                                                                                               | Texto | 512     | Texto alfanumérico                                                                                                  |
| `Type`              | Tipo de carteira: "ApplePay" / "SamsungPay" / "GooglePay" / "VisaCheckout" / "Masterpass.                                                                                                         | Texto | 255     | Texto alfanumérico                                                                                                  |
| `WalletKey`         | Chave criptográfica que representa os dados do cartão. Consulte a tabela [WalletKey](https://developercielo.github.io/manual/cielo-ecommerce#walletkey){:target="\_blank"} para mais informações. | Texto | 255     | Consulte a tabela [WalletKey](https://developercielo.github.io/manual/cielo-ecommerce#walletkey){:target="\_blank"} |

# Autorização com cartão descriptografado

Se o próprio lojista descriptografar o payload recebido da wallet e enviar por conta própria para a API Cielo E-commerce para processamento e autorização, deve usar o modelo de requisição a seguir:

## Requisição

```json
-- Envio de cartão
{
  "MerchantOrderId": "6242-642-723",
  "Customer": {
    "Name": "Guilherme Gama",
    "Identity": "11225468954",
    "IdentityType": "CPF"
  },
  "Payment": {
    "Type": "CreditCard",
    "Amount": 1100,
    "Provider": "Cielo",
    "Installments": 1,
    "CreditCard": {
      "CardNumber":"4532********6521",
      "Holder":"Guilherme Gama",
          "ExpirationDate":"12/2021",
          "SecurityCode":"123",
          "Brand":"Master"
    },
    "Wallet": {
      "Type": "Tipo de wallet",
      "Eci":"7",
      "Cavv":"AM1mbqehL24XAAa0J04CAoABFA=="
    }
  }
}
```

| Propriedade               | Tipo   | Tamanho | Obrigatório | Descrição                                                                                                                                                                         |
| ------------------------- | ------ | ------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MerchantId`              | Guid   | 36      | Sim         | Identificador da loja na Cielo.                                                                                                                                                   |
| `MerchantKey`             | Texto  | 40      | Sim         | Chave Pública para Autenticação Dupla na Cielo.                                                                                                                                   |
| `RequestId`               | Guid   | 36      | Não         | Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.                                                                            |
| `MerchantOrderId`         | Texto  | 50      | Sim         | Número de identificação do pedido.                                                                                                                                                |
| `Customer.Name`           | Texto  | 255     | Não         | Nome do comprador.                                                                                                                                                                |
| `Customer.Status`         | Texto  | 255     | Não         | Status de cadastro do comprador na loja (NEW / EXISTING)                                                                                                                          |
| `Payment.Type`            | Texto  | 100     | Sim         | Tipo do Meio de Pagamento.                                                                                                                                                        |
| `Payment.Amount`          | Número | 15      | Sim         | Valor do Pedido (ser enviado em centavos).                                                                                                                                        |
| `Payment.Installments`    | Número | 2       | Sim         | Número de Parcelas.                                                                                                                                                               |
| `CreditCard.CardNumber.`  | Texto  | 19      | Sim         | Número do Cartão do Comprador                                                                                                                                                     |
| `CreditCard.SecurityCode` | Texto  | 4       | Não         | Código de segurança impresso no verso do cartão - Ver Anexo.                                                                                                                      |
| `CreditCard.Brand`        | Texto  | 10      | Sim         | Bandeira do cartão (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).                                                                             |
| `Wallet.Type`             | Texto  | 255     | Sim         | Indica qual o tipo de carteira: `AndroidPay` / `ApplePay` / `SamsungPay`                                                                                                          |
| `Wallet.Walletkey`        | Texto  | 255     | Sim         | Chave criptografica que identifica lojas nas Wallets - Ver tabela WalletKey para mais informações                                                                                 |
| `Wallet.Eci`              | Texto  | 3       | Sim         | O ECI (Eletronic Commerce Indicator) representa o quão segura é uma transação. Esse valor deve ser levado em consideração pelo lojista para decidir sobre a captura da transação. |
| `Wallet.Cavv`             | Texto  | 255     | Sim         | Campo de validação retornado pela Wallet e utilizado como base de autorização                                                                                                     |

## Respostas

```json
{
  "MerchantOrderId": "2014111703",
  "Customer": {
    "Name": "[Guest]"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": false,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "453211******1521",
      "Holder": "Gama Gama",
      "ExpirationDate": "08/2020",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0319040817883",
    "ProofOfSale": "817883",
    "AuthorizationCode": "027795",
    "Wallet": {
      "Type": "TIPO DE WALLET",
      "Eci": 0
    },
    "SoftDescriptor": "123456789ABCD",
    "Amount": 100,
    "ReceivedDate": "2018-03-19 16:08:16",
    "Status": 1,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "4",
    "PaymentId": "e57b09eb-475b-44b6-ac71-01b9b82f2491",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491"
      },
      {
        "Method": "PUT",
        "Rel": "capture",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491/capture"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491/void"
      }
    ]
  }
}
```

| Propriedade                  | Descrição                                                                                                                      | Tipo  | Tamanho | Formato                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | ------------------------------------ |
| `ProofOfSale`                | Número da autorização, idêntico ao NSU.                                                                                        | Texto | 6       | Texto alfanumérico                   |
| `Tid`                        | Id da transação na adquirente.                                                                                                 | Texto | 20      | Texto alfanumérico                   |
| `AuthorizationCode`          | Código de autorização.                                                                                                         | Texto | 6       | Texto alfanumérico                   |
| `SoftDescriptor`             | Texto que será impresso na fatura bancária do portador - Disponivel apenas para VISA/MASTER - não permite caracteres especiais | Texto | 13      | Texto alfanumérico                   |
| `PaymentId`                  | Campo Identificador do Pedido.                                                                                                 | Guid  | 36      | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| `ECI`                        | Eletronic Commerce Indicator. Representa o quão segura é uma transação.                                                        | Texto | 2       | Exemplos: 7                          |
| `Status`                     | Status da Transação.                                                                                                           | Byte  | ---     | 2                                    |
| `ReturnCode`                 | Código de retorno da Adquirência.                                                                                              | Texto | 32      | Texto alfanumérico                   |
| `ReturnMessage`              | Mensagem de retorno da Adquirência.                                                                                            | Texto | 512     | Texto alfanumérico                   |
| `Type`                       | Indica qual o tipo de carteira: `VisaCheckout`/ `Masterpass` / `ApplePay` / `SamsungPay`                                       | Texto | 255     | Texto alfanumérico                   |
| `Walletkey`                  | Chave criptografica que identifica lojas nas Wallets - Ver tabela WalletKey para mais informações                              | Texto | 255     | Ver tabela `WalletKey`               |
| `AdditionalData.capturecode` | Código informado pela `MasterPass` ao lojista                                                                                  | Texto | 255     | 3                                    |

# ANEXO

## Lista de Status da Transação

Lista de status retornados pela API:

| Código | Status do Pagamento | Meio de pagamento                                                        | Descrição                                                                                                                                                                                                                                                                                                                                                                              |
| ------ | ------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | NotFinished         | Todos                                                                    | **Falha ao processar o pagamento**.<br>Possíveis causas: dados incorretos, erro na requisição, _timeout_ da adquirente, alguma instabilidade no processamento.<br>Em caso de transação de débito, o comprador pode ter abandonado a compra.                                                                                                                                            |
| 1      | Authorized          | Todos                                                                    | **Meio de pagamento apto a ser capturado ou pago (boleto)**.<br>Para transação de boleto, significa que o boleto foi gerado com sucesso.<br>Para transação com cartão, significa que houve a aprovação pelo banco emissor. Contudo, isso não significa que a transação foi concluída - para isso, é necessário uma segunda etapa, a captura da transação ou a efetivação do pagamento. |
| 2      | PaymentConfirmed    | Todos                                                                    | Pagamento confirmado e finalizado.                                                                                                                                                                                                                                                                                                                                                     |
| 3      | Denied              | Cartões de crédito e débito (transferência eletrônica) e e-wallets.      | **Pagamento negado por autorizador**. <br>Possíveis causas: limite insuficiente, falta de pagamento do cartão, bandeira indisponível, bloqueio por fraude, entre outros.<br>Para saber o real motivo da negação é necessário olhar o código de retorno gerado durante a transação.                                                                                                     |
| 10     | Voided              | Todos, exceto boleto.                                                    | **Pagamento cancelado**.<br>É a suspensão da transação, isentando de taxa ou valores cobrados. As transações pré-autorizadas podem ser canceladas mesmo após às 23h59 da data de autorização. Já as transações capturadas podem ser canceladas até às 23h59 do mesmo dia da autorização, após esse horário o valor será estornado.                                                     |
| 11     | Refunded            | Cartões de crédito e débito e e-wallets.                                 | **Pagamento cancelado/estornado**.<br>Significa que foi solicitado o cancelamento da transação, podendo ocorrer a partir das 0h00 do dia após a criação da transação. Independentemente do valor, só é possível realizar uma solicitação de estorno por transação. Isso pode acontecer por conta de dados incorretos ou por solicitação do comprador.                                  |
| 12     | Pending             | Cartões de crédito e débito (transferência eletrônica), e-wallets e pix. | **Esperando retorno da instituição financeira**. <br>Significa que a transação foi enviada para a Cielo em processo de pré-autorização, esperando uma resposta do banco emissor para validá-la.                                                                                                                                                                                        |
| 13     | Aborted             | Todos                                                                    | **Pagamento cancelado por falha no processamento**.<br>Significa que a transação foi cancelada por falha de processamento. Também pode ser abortada, caso o Antifraude negue a transação antes da autorização.                                                                                                                                                                         |
| 20     | Scheduled           | Cartão de crédito e e-wallets.                                           | **Recorrência agendada**.<br>Significa que a transação terá uma recorrência agendada, ou seja, o valor da compra será recolhido no dia em que foi agendado pela loja.                                                                                                                                                                                                                  |
