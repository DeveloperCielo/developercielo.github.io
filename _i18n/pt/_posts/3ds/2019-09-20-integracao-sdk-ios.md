---
layout: manual
title: 2.3. SDK IOS
description: Integração técnica E-Commerce Cielo
search: true
translated: true
categories: manual
sort_order: 4
tags:
  - Autenticação 3DS 2.0
---

# O que é 3DS 2.0?

Para maiores detalhes sobre o 3DS 2.0, acesse: [https://developercielo.github.io/manual/3ds](https://developercielo.github.io/manual/3ds)

<aside class="warning">Atenção: Este SDK foi descontinuado. Não oferecemos suporte para o desenvolvimento e implementação deste SDK.</aside>

# Passo 1 - Solicitação de Token de Acesso

A solução é composta pelo passo de solicitação de token de acesso via API e solicitação de autenticação a partir do APP.

| Ambiente     | Endpoint                          | Authorization                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SANDBOX**  | https://mpisandbox.braspag.com.br | **Basic _(Authorization)_**<br><br>O valor do Authorization deve ser obtido concatenando-se o valor do "ClientID", sinal de dois-pontos (":") e "ClientSecret"<br><br>Ex. dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e:D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=<br><br>e na sequência, codificar o resultado na base 64. <br>Com isso, será gerado um código alphanumérico que será utilizado na requisição de access token. Para efeitos de teste, utilize os dados abaixo:<br><br>ClientID: **dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e**<br>ClientSecret: **D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=** |
| ---          | ---                               |
| **PRODUÇÃO** | https://mpi.braspag.com.br        | Solicite os dados "ClientID" e "ClientSecret" à equipe de suporte após concluir o desenvolvimento em sandbox.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Request

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/v2/auth/token</span></aside>

```json
{
  "EstablishmentCode": "1006993069",
  "MerchantName": "Loja Exemplo Ltda",
  "MCC": "5912"
}
```

| **Campo**         | **Descrição**                                     | **Tipo/Tamanho**               |
| ----------------- | ------------------------------------------------- | ------------------------------ |
| EstablishmentCode | Código do Estabelecimento do Cielo E-Commerce 3.0 | Numérico [10 posições]         |
| MerchantName      | Nome do estabelecimento registrado na Cielo       | Alfanumérico [até 25 posições] |
| MCC               | Código de Categoria do estabelecimento            | Numérico [4 posições]          |

### Response

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6IlFBXzNEU19BdXRoZW50aWNhdG9yIiwiY2xpZW50X2lkIjoiZGJhM2E4ZGItZmE1NC00MGUwLThiYWItN2JmYjliNmYyZTJlIiwic2NvcGVzIjoie1wiU2NvcGVcIjpcIjNEU0F1dGhlbnRpY2F0b3JcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudE5hbWVcIixcIlZhbHVlc1wiOFwiVmFsdWVzXCI6W1wiNTU1NVwiXX0se1wiTmFtZVwiOlwiUmVmZXJlbmNlSWRcIixcIlZhbHVlc1wiOltcImY3MjE1YmQ3LWM0OTQtNGQ5Yi1NzEyfQ.daMqXko3dZOV0TzNFQ2vSsVSKqOsrwuswg7RB82ecAASSSSSSSSSSSSFFFFFFFFFFFFFGGGGGGGGGGGGGGGGGGGGGGGG",
  "token_type": "barear",
  "expires_in": "2018-07-23T11:29:32"
}
```

| **Campo**    | **Descrição**                                  | **Tipo/Tamanho**                |
| ------------ | ---------------------------------------------- | ------------------------------- |
| access_token | Token necessário para realizar a autenticação. | Alfanumérico [tamanho variável] |
| token_type   | Fixo &quot;bearer&quot;                        | Alfanumérico                    |
| expires_in   | Tempo em minutos para expirar o token          | Numérico                        |

# Passo 2 - Utilizando o SDK

Para utilizar o SDK é necessário realizar a importação do módulo Braspag3dsSdk:

```swift
import Braspag3dsSdk
```

Em seguida é necessário passar para o lado cliente(APP) o _access_token_ gerado no passo anterior:

```swift
let braspag3ds = Braspag3ds(accessToken: "<<Access_Token gerado no passo 1>>", environment: Environment.production)
```

Em seguida é necessário utilizar o método `authenticate`, informando os dados do comprador e o _callback_ que receberá a resposta:

```swift
braspag3ds.authenticate(orderData: OrderData(...),
                        cardData: CardData(...),
                        authOptions: OptionsData(...),
                        billToData: BillToData(...),
                        shipToData: ShipToData(...),
                        cart: [CartItemData(...),
                        deviceData: DeviceData(...),
                        userData: UserData(...),
                        airlineData: AirlineData(...),
                        mdd: MddData(...),
                        recurringData: RecurringData(...),
                        deviceIpAddress: "0.0.0.0"){ (status, authenticationResponse) in

                        switch(status){
                        case .success:
                          ...
                        case .unenrolled:
                          ...
                        case failure:
                          ...
                        case error:
                          ...
                        case unsupportedBrand:
                          ...
                        }
  }
```

## Parâmetros de entrada do método _authenticate_

| **Campo**       | **Tipo**        | **Descrição**                               | **Obrigatório** |
| --------------- | --------------- | ------------------------------------------- | --------------- |
| orderData       | OrderData       | Dados do pedido de pagamento                | Sim             |
| cardData        | CardData        | Dados do cartão                             | Sim             |
| authOptions     | OptionsData?    | Configurações adicionais ao processo de 3DS | Não             |
| billToData      | BillToData?     | Dados de cobrança do portador               | Não             |
| shipToData      | ShipToData?     | Dados da entrega                            | Não             |
| cart            | [CartItemData]? | Array com itens do carrinho                 | Não             |
| deviceData      | [DeviceData]?   | Configurações adicionais ao processo de 3DS | Não             |
| userData        | UserData?       | Dados do usuário na sua loja                | Não             |
| airlineData     | AirlineData?    | Dados da passagem aérea                     | Não             |
| mdd             | MddData?        | Dados extras enviados pelo lojista          | Não             |
| recurringData   | RecurringData?  | Dados da recorrência                        | Não             |
| deviceIpAddress | String?         | Endereço IP do dispositivo                  | Não             |

## Descrição dos Status do Callback

| **Status**       | **Descrição**                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| success          | É retornado quando o cartão é elegível e teve o processo de autenticação finalizado com sucesso. Neste caso, as variáveis CAVV, XID e ECI serão retornados. Estes dados devem ser enviados na requisição no momento da autorização. Neste cenário, se a transação é autorizada, o liability shift é transferido ao emissor.                                                                |
| unenrolled       | É retornado quando o cartão não é elegível, ou seja, o portador e/ou emissor não participam do programa de autenticação. Neste caso, somente a variável ECI será retornado. Caso haja a decisão de seguir com a autorização mesmo assim, o ECI deverá ser enviado no momento da requisição. Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento. |
| failure          | É retornado quando o cartão é elegível, porém não teve o processo de autenticação falhou por algum motivo. Neste caso, somente a variável ECI será retornado. Caso haja a decisão de seguir com a autorização mesmo assim, o ECI deverá ser enviado no momento da requisição. Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento.               |
| error            | É retornado quando o processo de autenticação recebeu um erro sistêmico. Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento.                                                                                                                                                                                                                    |
| unsupportedBrand | É retornado quando a bandeira do cartão não é suportado pelo 3DS 2.0                                                                                                                                                                                                                                                                                                                       |

## Descrição dos campos do _AuthenticationResponse_

| **Saída**     | **Descrição**                                                              | **Tipo/Tamanho**                           |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| cavv          | Dado que representa assinatura da autenticação                             | Texto                                      |
| xid           | ID que representa a requisição da autenticação                             | Texto                                      |
| eci           | Código indicador do e-commerce, que representa o resultado da autenticação | Numérico [até 2 posições]                  |
| version       | Versão do 3DS aplicado                                                     | Numérico [1 posição]1 – 3DS 1.02 – 3DS 2.0 |
| referenceID   | ID que representa a requisição de autenticação                             | GUID [36 posições]                         |
| returnCode    | Código de retorno da requisição de autenticação                            | Alfanumérico [até 5 posições]              |
| returnMessage | Mensagem de retorno da requisição de autenticação                          | Alfanumérico [varivável]                   |

Nota: No caso de uma transação submetida como Data Only (bpmpi_auth_notifyonly como true), mesmo que bem-sucedida, não serão retornados os campos CAVV e XID (campos não necessários para uma transação no modelo Data Only).

# Detalhamento dos objetos da requisição

Para facilitar o uso somente daquilo que o lojista precisa enviar, a requisição é separada em diversos objetos com contexto de dados bem definido conforme a tabela dos parâmetros de entrada do authenticate mostra. Abaixo vamos detalhar cada um dos objetos utilziados.

<aside class="warning">Quanto maior a quantidade de campos parametrizados, é maior a chance de ter uma autenticação transparente, pois o emissor terá maior subsídio para a análise de risco</aside>

## OptionsData

| **Propriedade**   | **Descrição**                                                                                                                                                                                                                                                 | **Tipo/Tamanho**                                                                          | **Obrigatório** |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------- |
| notifyonly        | Booleano que indica se a transação com cartão será submetida no modo "somente notificação" - **Data Only**. Neste modo, o processo de autenticação não será acionado, porém, os dados serão submetidos à bandeira. **VÁLIDO SOMENTE PARA CARTÕES MASTERCARD** | Booleano: <br>true – modo somente notificação; <br>false – modo com autenticação          | Não             |
| suppresschallenge | Booleano que indica se ignora ou não o desafio quando houver. Se uma transação autorizada após ignorar o desafio, o liability permanece com o estabelecimento.                                                                                                | Booleano: <br>true – ignorar desafios se houver; <br>false – apresentar desafio se houver | Não             |

## OrderData

| **Propriedade**         | **Descrição**                                                                                                  | **Tipo/Tamanho**                                                                                                                                                                                                     | **Obrigatório** |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| orderNumber             | Código do pedido no estabelecimento                                                                            | Alphanumérico [até 50 posições]                                                                                                                                                                                      | Sim             |
| currencyCode            | Código da moeda                                                                                                | Fixo &quot;BRL&quot;                                                                                                                                                                                                 | Sim             |
| totalAmount             | Valor total da transação, enviado em centavos                                                                  | Numérico [até 15 posições]                                                                                                                                                                                           | Sim             |
| paymentMethod           | Tipo do cartão a ser autenticado. No caso do cartão múltiplo, deverá especificar um dos tipos, Credit ou Debit | _PaymentMethod_ <br><br>credit – Cartão de Crédito<br>debit – Cartão de Débito                                                                                                                                       | Sim             |
| installments            | Número de parcelas da transação                                                                                | Numérico [até 2 posições]                                                                                                                                                                                            | Sim             |
| recurrence              | Indica se é um pedido que gera recorrências futuras                                                            | Booleano<br>true<br>false                                                                                                                                                                                            | Não             |
| productCode             | Tipo da compra                                                                                                 | _ProductCode_<br><br>goodsPurchase: compra de mercadorias<br>checkAcceptance: Check acceptance<br>financeAccount: Financiamento de conta<br>quasiMoneyTransaction: Transação quase-dinheiro<br>recharge: recarga<br> | Sim             |
| countLast24Hours        | Quantidade de pedidos efetuados por este comprador nas últimas 24h                                             | Numérico [até 3 posições]                                                                                                                                                                                            | Não             |
| countLast6Months        | Quantidade de pedidos efetuados por este comprador nos últimos 6 meses                                         | Numérico [até 4 posições]                                                                                                                                                                                            | Não             |
| countLast1Year          | Quantidade de pedidos efetuados por este comprador no último ano                                               | Numérico [até 3 posições]                                                                                                                                                                                            | Não             |
| cardAttemptsLast24Hours | Quantidade de transações com o mesmo cartão nas últimas 24h                                                    | Numérico [até 3 posições]                                                                                                                                                                                            | Não             |
| marketingOptIn          | Indica se o comprador aceitou receber ofertas de marketing                                                     | Booleano<br>true – sim<br>false – não                                                                                                                                                                                | Não             |
| marketingSource         | Identifica a origem da campanha de marketing                                                                   | Alfanumérico [até 40 posições]                                                                                                                                                                                       | Não             |
| transactionMode         | Identifica o canal que originou a transação                                                                    | M: MOTO<br>R: Varejo<br>S: E-Commerce<br>P: Mobile<br>T: Tablet                                                                                                                                                      | Não             |
| merchantUrl             | Endereço do site do estabelcimento                                                                             | Alphanumérico [100] Exemplo: http://www.exemplo.com.br                                                                                                                                                               | Sim             |

## CardData

| **Propriedade**    | **Descrição**                                   | **Tipo/Tamanho**                      | **Obrigatório** |
| ------------------ | ----------------------------------------------- | ------------------------------------- | --------------- |
| number             | Número do Cartão                                | Numérico [até 19 posições]            | Sim             |
| expirationMonth    | Mês do vencimento do cartão                     | Numérico [2 posições]                 | Sim             |
| cardexpirationYear | Ano do vencimento do cartão                     | Numérico [4 posições]                 | Sim             |
| cardAlias          | Alias do cartão                                 | Alphanumérico [até 128 posições]      | Não             |
| defaultCard        | Indica se é um cartão padrão do cliente na loja | Booleano<br>true - sim<br>false - não | Não             |

## BillToData

| **Propriedade** | **Descrição**                                | **Tipo/Tamanho**                                                               | **Obrigatório** |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | --------------- |
| customerId      | Identifica o CPF/CNPJ do comprador           | Numérico [11 a 14 posições]<br>99999999999999                                  | Não             |
| contactName     | Nome do contato do endereço de cobrança      | Alfanumérico [até 120]                                                         | Sim             |
| phoneNumber     | Telefone de contato do endereço de cobrança  | Numérico [até 15 posições], no formato: 5511999999999                          | Sim             |
| email           | E-mail do contato do endereço de cobrança    | Alfanumérico [até 255], no formato [nome@exemplo.com](mailto:nome@exemplo.com) | Sim             |
| street1         | Logradouro e Número do endereço de cobrança  | Alfanumérico [até 60]                                                          | Sim             |
| street2         | Complemento e bairro do endereço de cobrança | Alfanumérico [até 60]                                                          | Sim             |
| city            | Cidade do endereço de cobrança               | Alfanumérico [até 50]                                                          | Sim             |
| state           | Sigla do estado do endereço de cobrança      | Texto [2 posições]                                                             | Sim             |
| zipCode         | CEP do endereço de cobrança                  | Alfanumérico [até 8 posições], no formato: 99999999                            | Sim             |
| country         | País do endereço de cobrança                 | Texto [2 posições] Ex. BR                                                      | Sim             |

## ShipToData

| **Propriedade** | **Descrição**                                                              | **Tipo/Tamanho**                                                                                                                                                                                                                                  | **Obrigatório** |
| --------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| sameAsBillTo    | Indica se utiliza o mesmo endereço fornecido para endereço de cobrança     | Booleano<br>true<br>false                                                                                                                                                                                                                         | Não             |
| addressee       | Nome do contato do endereço de entrega                                     | Alfanumérico [até 60]                                                                                                                                                                                                                             | Não             |
| phoneNumber     | Telefone de contato do endereço de entrega                                 | Numérico [até 15 posições], no formato: 5511999999999                                                                                                                                                                                             | Não             |
| email           | E-mail do contato do endereço de entrega                                   | Alfanumérico [até 255], no formato [nome@exemplo.com](mailto:nome@exemplo.com)                                                                                                                                                                    | Não             |
| street1         | Logradouro e Número do endereço de entrega                                 | Alfanumérico [até 60]                                                                                                                                                                                                                             | Não             |
| street2         | Complemento e bairro do endereço de entrega                                | Alfanumérico [até 60]                                                                                                                                                                                                                             | Não             |
| city            | Cidade do endereço de entrega                                              | Alfanumérico [até 50]                                                                                                                                                                                                                             | Não             |
| state           | Sigla do estado do endereço de entrega                                     | Texto [2 posições]                                                                                                                                                                                                                                | Não             |
| zipCode         | CEP do endereço de entrega                                                 | Alfanumérico [até 8 posições], no formato: 99999999                                                                                                                                                                                               | Não             |
| country         | País do endereço de cobrança                                               | Texto [2 posições] Ex. BR                                                                                                                                                                                                                         | Não             |
| shippingMethod  | Tipo do método de envio                                                    | _ShippingMethodEnum_<br><br>lowcost: envio econômico<br>sameday: envio no mesmo dia<br>oneday: envio no dia seguinte<br>twoday: envio em dois dias<br>threeday: envio em três dias<br>pickup: retirada na loja<br>other: outrosnone: não há envio | Não             |
| firstUsageDate  | Indica a data de quando houve a primeira utilização do endereço de entrega | Texto<br>AAAA-MM-DD – data da criação                                                                                                                                                                                                             | Não             |

## CartItemData

| **Propriedade** | **Descrição**                                  | **Tipo/Tamanho**                | **Obrigatório** |
| --------------- | ---------------------------------------------- | ------------------------------- | --------------- |
| description     | Descrição do item                              | Alfanumérico [até 255 posições] | Não             |
| name            | Nome do item                                   | Alfanumérico [até 255 posições] | Sim             |
| sku             | SKU do item                                    | Alfanumérico [até 255 posições] | Não             |
| quantity        | Quantidade do item no carrinho                 | Numérico [até 10 posições]      | Não             |
| unitprice       | Valor unitário do item do carrinho em centavos | Numérico [até 10 posições]      | Não             |

## DeviceData

| **Propriedade** | **Descrição**                           | **Tipo/Tamanho**                                                  | **Obrigatório** |
| --------------- | --------------------------------------- | ----------------------------------------------------------------- | --------------- |
| fingerprint     | Id retornado pelo Device Finger Print   | Alfanumérico [sem limitação]                                      | Não             |
| provider        | Nome do provedor do Device Finger Print | Alfanumérico [até 32 posições] cardinal<br>inauth<br>threatmetrix | Não             |

## UserData

| **Propriedades**        | **Descrição**                                                            | **Tipo/Tamanho**                                                                                                                                                                                            | **Obrigatório** |
| ----------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| guest                   | Indica se o comprador é um comprador sem login (guest)                   | Booleano<br>true – sim<br>false – não                                                                                                                                                                       | Não             |
| createdDate             | Indica a data de quando houve a criação da conta do comprador            | Texto<br>AAAA-MM-DD – data da criação                                                                                                                                                                       | Não             |
| changedDate             | Indica a data de quando houve a última alteração na conta do comprador   | Texto<br>AAAA-MM-DD – data da última alteração                                                                                                                                                              | Não             |
| passwordChangedDate     | Indica a data de quando houve a alteração de senha da conta do comprador | Texto<br>AAAA-MM-DD – data da última alteração de senha                                                                                                                                                     | Não             |
| authenticationMethod    | Método de autenticação do comprador na loja                              | _AuthenticationMethod_ <br> noAuthentication - Não houve autenticação<br>ownStoreLogin - Login da própria loja<br>federatedLogin - Login com ID federado<br>fidoAuthenticator - Login com autenticador FIDO | Não             |
| authenticationProtocol  | Dado que representa o protocolo de login efetuado na loja                | Alfanumérico [até 2048 posições]                                                                                                                                                                            | Não             |
| authenticationTimestamp | A data e hora que o login foi efetuado na loja                           | Texto [19 posições] _YYYY-MM-ddTHH:mm:SS_                                                                                                                                                                   | Não             |
| newCustomer             | Identifica se um comprador novo na loja                                  | Booleano<br>true – sim<br>false – não                                                                                                                                                                       | Não             |

## AirlineData

| **Propriedades**      | **Descrição**                                                       | **Tipo/Tamanho**           | **Obrigatório** |
| --------------------- | ------------------------------------------------------------------- | -------------------------- | --------------- |
| numberOfPassengers    | Número de passageiros                                               | Numérico [3 posições]      | Não             |
| billToPassportCountry | Código do país que emitiu o passaporte (ISO Standard Country Codes) | Texto [2 posições]         | Não             |
| billtoPassportNumber  | Número do passaporte                                                | Alfanumérico [40 posições] | Não             |
| travelLeg             | Trecho da viagem                                                    | TravelLeg                  | Não             |
| passenger             | Dados do passageiro                                                 | Passenger                  | Não             |

## TravelLeg

| **Propriedades** | **Descrição**                       | **Tipo/Tamanho**          | **Obrigatório** |
| ---------------- | ----------------------------------- | ------------------------- | --------------- |
| carrier          | Código IATA para o trecho           | Alfanumérico [2 posições] | Não             |
| departureDate    | Data de partida                     | Texto<br>AAAA-MM-DD       | Não             |
| origin           | Código IATA do aeroporto de origem  | Alfanumérico [5 posições] | Não             |
| destination      | Código IATA do aeroporto de destino | Alfanumérico [5 posições] | Não             |

## Passenger

| **Propriedades** | **Descrição**                   | **Tipo/Tamanho**                                          | **Obrigatório** |
| ---------------- | ------------------------------- | --------------------------------------------------------- | --------------- |
| name             | Nome do passageiro              | Alfanumérico [até 60 posições]                            | Não             |
| ticketPrice      | O valor da passagem em centavos | Numérico [até 15 posições],<br>exemplo: R$ 125,54 = 12554 | Não             |

## MDD

| **Proriedades** | **Descrição**                    | **Tipo/Tamanho**                | **Obrigatório** |
| --------------- | -------------------------------- | ------------------------------- | --------------- |
| mdd1            | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| mdd2            | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| mdd3            | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| mdd4            | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| mdd5            | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |

## RecurringData

| **Proriedades**      | **Descrição**                                                | **Tipo/Tamanho**                                                                                    | **Obrigatório** |
| -------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | --------------- |
| endDate              | Identifica a data de término da recorrência                  | Texto (AAAA-MM-DD)                                                                                  | Não             |
| frequency            | Indica a frequência da recorrência                           | _RecurringFrequencyEnum_ <br><br>MonthlyBimonthly<br>Quarterly<br>Triannual<br>SemiAnnual<br>Yearly | Não             |
| originalPurchaseDate | Identifica a data da 1ª transação que originou a recorrência | Texto (AAAA-MM-DD)                                                                                  | Não             |

## Demais parâmetros

| **Proriedades** | **Descrição**                       | **Tipo/Tamanho**      | **Obrigatório** |
| --------------- | ----------------------------------- | --------------------- | --------------- |
| ipAddress       | Endereço IP da máquina do comprador | Alfanumérico [até 45] | Não             |

# ECI (E-commerce Indicator)

E-Commerce Indicator (ECI) é retornado no processo de autenticação. Este código é um indicador do que exatamente ocorreu no processo de autenticação da transação.

Por meio do ECI, pode-se verificar se a transação foi autenticada e quem foi o agente responsável por aquela autenticação. Confira a [tabela de ECI](https://developercielo.github.io/manual/autorizacao-com-autenticacao#tabela-de-eci){:target="\_blank"}.

# Cartões de Teste

Utilize os cartões de **teste** abaixo para simular diversos cenários no ambiente de **SANDBOX**.

## Cartões de Teste com Desafio

| **CARTÃO**                                               | **BANDEIRA**          | **RESULTADO** | **DESCRIÇÃO**                                              |
| -------------------------------------------------------- | --------------------- | ------------- | ---------------------------------------------------------- |
| 4000000000001091<br>5200000000001096<br>6505050000001091 | VISA<br>MASTER<br>ELO | SUCCESS       | Autenticação com desafio e portador autenticou com sucesso |
| 4000000000001109<br>5200000000001104<br>6505050000001109 | VISA<br>MASTER<br>ELO | FAILURE       | Autenticação com desafio e portador autenticou com falha   |
| 4000000000001117<br>5200000000001112<br>6505050000001117 | VISA<br>MASTER<br>ELO | UNENROLLED    | Autenticação com desafio indisponível no momento           |
| 4000000000001125<br>5200000000001120<br>6505050000001125 | VISA<br>MASTER<br>ELO | UNENROLLED    | Erro de sistema durante a etapa de autenticação            |

## Cartões de Teste sem Desafio

| **CARTÃO**                                               | **BANDEIRA**          | **RESULTADO** | **DESCRIÇÃO**                                              |
| -------------------------------------------------------- | --------------------- | ------------- | ---------------------------------------------------------- |
| 4000000000001000<br>5200000000001005<br>6505050000001000 | VISA<br>MASTER<br>ELO | SUCCESS       | Autenticação sem desafio e portador autenticou com sucesso |
| 4000000000001018<br>5200000000001013<br>6505050000001018 | VISA<br>MASTER<br>ELO | FAILURE       | Autenticação sem desafio e portador autenticou com falha   |

## Autorização com Autenticação

Após autenticação ser concluída, submete-se ao processo de autorização, enviando os dados de autenticação no modelo de &quot;autenticação externa&quot; (nó **ExternalAuthentication** ).
Veja maiores detalhes em: [https://developercielo.github.io/manual/autorizacao-com-autenticacao](https://developercielo.github.io/manual/autorizacao-com-autenticacao)

# Últimas atualizações

Para visualizar as últimas atualizações do manual, [clique aqui](https://github.com/DeveloperCielo/developercielo.github.io/commits/docs/_i18n/pt/_posts/3ds/2019-09-20-integracao-sdk-ios.md)
