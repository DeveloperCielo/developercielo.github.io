---
layout: manual
title: 2.1. Integração via Javascript
description: Manual integração técnica do 3DS 2.0
search: true
translated: true
categories: manual
sort_order: 2
tags:
  - Autenticação 3DS 2.0
language_tabs:
  json: JSON
  shell: cURL
---

# O que é 3DS 2.0?

Para maiores detalhes sobre o 3DS 2.0, acesse: [https://developercielo.github.io/manual/3ds](https://developercielo.github.io/manual/3ds)

# Passo 1 - Solicitação de Token de Acesso

A solução é composta pelo passo de solicitação de token de acesso via API e solicitação de autenticação via Java Script.

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

```shell
curl
--request POST "https://mpisandbox.braspag.com.br/v2/auth/token"
--header "Content-Type: application/json"
--header "Authorization: Basic xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
--data-binary
--verbose
{
     "EstablishmentCode":"1006993069",
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

```shell
--header "Content-Type: application/json"
--data-binary
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

# Passo 2 - Implementação do script

Neste passo, é implementado o _script_ e o mapeamento de _classes_ responsáveis pela comunicação com as plataformas de autenticação das bandeiras e emissor. Siga o exemplo abaixo, que demonstra a implementação básica. Recomenda-se que o trecho seja colocado no final do código HTML de seu checkout:

> Para baixar o código, [Acesse aqui](https://github.com/DeveloperCielo/developercielo.github.io/blob/docs/_i18n/pt/_posts/3ds/exemplo.html)

![Fluxo 3DS 2.0]({{ site.baseurl_root }}/images/exemplo-html.jpg)

Descrição dos Eventos

| **Evento**         | **Descrição**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onReady            | É acionado quando todos os procedimentos de carregamento do script da solução foram concluídos com sucesso, o que incluir a validação do token de acesso, indicando que o checkout está pronto para iniciar a autenticação                                                                                                                                                                                                                                                                                        |
| onSuccess          | É acionado quando o cartão é elegível e teve o processo de autenticação finalizado com sucesso. Neste caso, as variáveis CAVV, XID e ECI serão retornados. Estes dados devem ser enviados na requisição no momento da autorização. Neste cenário, se a transação é autorizada, o liability shift é transferido ao emissor.                                                                                                                                                                                        |
| onFailure          | É acionado quando o cartão é elegível, porém não teve o processo de autenticação falhou por algum motivo. Neste caso, somente a variável ECI será retornado. Caso haja a decisão de seguir com a autorização mesmo assim, o ECI deverá ser enviado no momento da requisição. Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento.                                                                                                                                       |
| onUnenrolled       | É acionado quando o cartão não é elegível, ou seja, o portador e/ou emissor não participam do programa de autenticação. Neste caso, orientar o comprador a verificar junto ao emissor se o cartão está habilitado para realizar autenticação no e-commerce. Somente a variável ECI será retornado. Caso haja a decisão de seguir com a autorização mesmo assim, o ECI deverá ser enviado no momento da requisição. Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento. |
| onDisabled         | É acionado quando o estabelecimento optou por não submeter o portador ao processo de autenticação (classe &quot;bpmpi_auth&quot; como false). Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento.                                                                                                                                                                                                                                                                      |
| onError            | É acionado quando o processo de autenticação recebeu um erro sistêmico. Neste cenário, se a transação é autorizada, o liability shift permanece com o estabelecimento.                                                                                                                                                                                                                                                                                                                                            |
| onUnsupportedBrand | É acionado quando a bandeira do cartão não é suportado pelo 3DS 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Descrição dos Parâmetros de entrada

| **Parâmetro** | **Descrição**                                                                                                                         | **Tipo/Tamanho**                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Environment   | Indica o ambiente a ser utilizado (Sandbox ou Produção)                                                                               | SDB – Sandbox (ambiente de teste)PRD – Produção (ambiente de produção) |
| Debug         | Booleano que indica se o modo debug é ativado ou não. Quando true, a plataforma emitirá o relatório no mecanismo de debug do browser. | Booleanotrue – modo debug ativadofalse – modo debug desativado         |

**IMPORTANTE!**

O arquivo JavaScript deve ser salvo no servidor onde está a aplicação da loja. Para baixar o arquivo no Sandbox, acesse:

[https://bit.ly/2CSOp2n](https://bit.ly/2CSOp2n)

Descrição das saídas

| **Saída**     | **Descrição**                                                              | **Tipo/Tamanho**                           |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| Cavv          | Dado que representa assinatura da autenticação                             | Texto                                      |
| Xid           | ID que representa a requisição da autenticação                             | Texto                                      |
| Eci           | Código indicador do e-commerce, que representa o resultado da autenticação | Numérico [até 2 posições]                  |
| Version       | Versão do 3DS aplicado                                                     | Numérico [1 posição]1 – 3DS 1.02 – 3DS 2.0 |
| ReferenceId   | ID que representa a requisição de autenticação                             | GUID [36 posições]                         |
| ReturnCode    | Código de retorno da requisição de autenticação                            | Alfanumérico [até 5 posições]              |
| ReturnMessage | Mensagem de retorno da requisição de autenticação                          | Alfanumérico [varivável]                   |

Nota: No caso de uma transação submetida como Data Only (bpmpi_auth_notifyonly como true), mesmo que bem-sucedida, não serão retornados os campos CAVV e XID (campos não necessários para uma transação no modelo Data Only).

# Passo 3 - Mapeamento de classes

A solução disponibiliza dezenas de classes que devem ser mapeadas em seu código HTML.

Uma vez que a classe é mapeada em determinado campo, o script é capaz de recuperar o valor contido no campo e submetê-lo para compor a requisição de autenticação.

<aside class="warning">Quanto maior a quantidade de campos parametrizados, é maior a chance de ter uma autenticação transparente, pois o emissor terá maior subsídio para a análise de risco</aside>

<aside class="notice">o caracter # indicados no campo deve ser substituído por número que representa o índice do item. Exemplo: bpmpi_item_1_productName representa o nome do item 1 do carrinho</aside>

| **Dados de Parametrização**  | **Descrição**                                                                                                                                                                                                                                                 | **Tipo/Tamanho**                                                                          | **Obrigatório** |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------- |
| bpmpi_auth                   | Booleano que indica se a transação é submetida o não para o processo de autenticação                                                                                                                                                                          | Booleano:<br>true – submeter à autenticação<br>false – não submeter à autenticação        | Sim             |
| bpmpi_auth_notifyonly        | Booleano que indica se a transação com cartão será submetida no modo "somente notificação" - **Data Only**. Neste modo, o processo de autenticação não será acionado, porém, os dados serão submetidos à bandeira. **VÁLIDO SOMENTE PARA CARTÕES MASTERCARD** | Booleano: <br>true – modo somente notificação; <br>false – modo com autenticação          | Não             |
| bpmpi_auth_suppresschallenge | Booleano que indica se ignora ou não o desafio quando houver. Se uma transação autorizada após ignorar o desafio, o liability permanece com o estabelecimento.                                                                                                | Booleano: <br>true – ignorar desafios se houver; <br>false – apresentar desafio se houver | Não             |
| bpmpi_accesstoken            | Token gerado pela API de Token de Acesso (etapa 1)                                                                                                                                                                                                            | Alfanumérico (variável)                                                                   | Sim             |
| bpmpi_challenge_window_size  | Parametrização do tamanho da janela do desafio                                                                                                                                                                                                                | string<br>**Valores aceitos:**<br>250x400<br>390x400<br>500x600<br>600x400<br>FullPage    | Não             |

| **Dados de Pedido**       | **Descrição**                                                                                                  | **Tipo/Tamanho**                                       | **Obrigatório** |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------- |
| bpmpi_ordernumber         | Código do pedido no estabelecimento                                                                            | Alphanumérico [até 50 posições]                        | Sim             |
| bpmpi_currency            | Código da moeda                                                                                                | Fixo &quot;BRL&quot;                                   | Sim             |
| bpmpi_totalamount         | Valor total da transação, enviado em centavos                                                                  | Numérico [até 15 posições]                             | Sim             |
| bpmpi_installments        | Número de parcelas da transação                                                                                | Numérico [até 2 posições]                              | Sim             |
| bpmpi_paymentmethod       | Tipo do cartão a ser autenticado. No caso do cartão múltiplo, deverá especificar um dos tipos, Credit ou Debit | Credit – Cartão de Crédito<br>Debit – Cartão de Débito | Sim             |
| bpmpi_cardnumber          | Número do Cartão                                                                                               | Numérico [até 19 posições]                             | Sim             |
| bpmpi_cardexpirationmonth | Mês do vencimento do cartão                                                                                    | Numérico [2 posições]                                  | Sim             |
| bpmpi_cardexpirationyear  | Ano do vencimento do cartão                                                                                    | Numérico [4 posições]                                  | Sim             |
| bpmpi_cardalias           | Alias do cartão                                                                                                | Alphanumérico [até 128 posições]                       | Não             |
| bpmpi_default_card        | Indica se é um cartão padrão do cliente na loja                                                                | Booleano<br>true - sim<br>false - não                  | Não             |

| **Dados das características do pedido** | **Descrição**                                                          | **Tipo/Tamanho**                                                                                                                                            | **Obrigatório** |
| --------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| bpmpi_recurring_enddate                 | Identifica a data de término da recorrência                            | Texto (AAAA-MM-DD)                                                                                                                                          | Não             |
| bpmpi_recurring_frequency               | Indica a frequência da recorrência                                     | Número<br>1 - Mensal<br>2 - Bimestral<br>3 - Trimestral<br>4 - Quadrimestral<br>6 - Semestral<br>12 - Anual                                                 | Não             |
| bpmpi_recurring_originalpurchasedate    | Identifica a data da 1ª transação que originou a recorrência           | Texto (AAAA-MM-DD)                                                                                                                                          | Não             |
| bpmpi_order_recurrence                  | Indica se é um pedido que gera recorrências futuras                    | Booleano<br>true<br>false                                                                                                                                   | Não             |
| bpmpi_order_productcode                 | Tipoda compra                                                          | **PHY**: compra de mercadorias<br>**CHA**: Check acceptance<br>**ACF**: Financiamento de conta<br>**QCT**: Transação quase-dinheiro<br>**PAL**: recarga<br> | Sim             |
| bpmpi_order_countlast24hours            | Quantidade de pedidos efetuados por este comprador nas últimas 24h     | Numérico [até 3 posições]                                                                                                                                   | Não             |
| bpmpi_order_countlast6months            | Quantidade de pedidos efetuados por este comprador nos últimos 6 meses | Numérico [até 4 posições]                                                                                                                                   | Não             |
| bpmpi_order_countlast1year              | Quantidade de pedidos efetuados por este comprador no último ano       | Numérico [até 3 posições]                                                                                                                                   | Não             |
| bpmpi_order_cardattemptslast24hours     | Quantidade de transações com o mesmo cartão nas últimas 24h            | Numérico [até 3 posições]                                                                                                                                   | Não             |
| bpmpi_order_marketingoptin              | Indica se o comprador aceitou receber ofertas de marketing             | Booleano<br>true – sim<br>false – não                                                                                                                       | Não             |
| bpmpi_order_marketingsource             | Identifica a origem da campanha de marketing                           | Alfanumérico [até 40 posições]                                                                                                                              | Não             |
| bpmpi_transaction_mode                  | Identifica o canal que originou a transação                            | M: MOTO<br>R: Varejo<br>S: E-Commerce<br>P: Mobile<br>T: Tablet                                                                                             | Não             |
| bpmpi_merchant_url                      | Endereço do site do estabelcimento                                     | Alphanumérico [100] Exemplo: http://www.exemplo.com.br                                                                                                      | Sim             |

| **Dados específicos para cartões Gift Card (pré-pago)** | **Descrição**                                                                   | **Tipo/Tamanho**                                          | **Obrigatório** |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------- |
| bpmpi_giftcard_amount                                   | O total do valor da compra para cartões-presente pré-pagos em valor arredondado | Numérico [até 15 posições],<br>exemplo: R$ 125,54 = 12554 | Não             |
| bpmpi_giftcard_currency                                 | Código da moeda da transação paga com cartão do tipo pré-pago                   | Fixo &quot;BRL&quot;                                      | Não             |

| **Dados de endereço de cobrança** | **Descrição**                                | **Tipo/Tamanho**                                                               | **Obrigatório** |
| --------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | --------------- |
| bpmpi_billto_customerid           | Identifica o CPF/CNPJ do comprador           | Numérico [11 a 14 posições]<br>99999999999999                                  | Não             |
| bpmpi_billto_contactname          | Nome do contato do endereço de cobrança      | Alfanumérico [até 120]                                                         | Sim             |
| bpmpi_billTo_phonenumber          | Telefone de contato do endereço de cobrança  | Numérico [até 15 posições], no formato: 5511999999999                          | Sim             |
| bpmpi_billTo_email                | E-mail do contato do endereço de cobrança    | Alfanumérico [até 255], no formato [nome@exemplo.com](mailto:nome@exemplo.com) | Sim             |
| bpmpi_billTo_street1              | Logradouro e Número do endereço de cobrança  | Alfanumérico [até 60]                                                          | Sim             |
| bpmpi_billTo_street2              | Complemento e bairro do endereço de cobrança | Alfanumérico [até 60]                                                          | Sim             |
| bpmpi_billTo_city                 | Cidade do endereço de cobrança               | Alfanumérico [até 50]                                                          | Sim             |
| bpmpi_billTo_state                | Sigla do estado do endereço de cobrança      | Texto [2 posições]                                                             | Sim             |
| bpmpi_billto_zipcode              | CEP do endereço de cobrança                  | Alfanumérico [até 8 posições], no formato: 99999999                            | Sim             |
| bpmpi_billto_country              | País do endereço de cobrança                 | Texto [2 posições] Ex. BR                                                      | Sim             |

| **Dados de endereço de entrega** | **Descrição**                                                              | **Tipo/Tamanho**                                                                                                                                                                                                      | **Obrigatório** |
| -------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| bpmpi_shipto_sameasbillto        | Indica se utiliza o mesmo endereço fornecido para endereço de cobrança     | Booleano<br>true<br>false                                                                                                                                                                                             | Não             |
| bpmpi_shipto_addressee           | Nome do contato do endereço de entrega                                     | Alfanumérico [até 60]                                                                                                                                                                                                 | Não             |
| bpmpi_shipTo_phonenumber         | Telefone de contato do endereço de entrega                                 | Numérico [até 15 posições], no formato: 5511999999999                                                                                                                                                                 | Não             |
| bpmpi_shipTo_email               | E-mail do contato do endereço de entrega                                   | Alfanumérico [até 255], no formato [nome@exemplo.com](mailto:nome@exemplo.com)                                                                                                                                        | Não             |
| bpmpi_shipTo_street1             | Logradouro e Número do endereço de entrega                                 | Alfanumérico [até 60]                                                                                                                                                                                                 | Não             |
| bpmpi_shipTo_street2             | Complemento e bairro do endereço de entrega                                | Alfanumérico [até 60]                                                                                                                                                                                                 | Não             |
| bpmpi_shipTo_city                | Cidade do endereço de entrega                                              | Alfanumérico [até 50]                                                                                                                                                                                                 | Não             |
| bpmpi_shipTo_state               | Sigla do estado do endereço de entrega                                     | Texto [2 posições]                                                                                                                                                                                                    | Não             |
| bpmpi_shipto_zipcode             | CEP do endereço de entrega                                                 | Alfanumérico [até 8 posições], no formato: 99999999                                                                                                                                                                   | Não             |
| bpmpi_shipto_country             | País do endereço de cobrança                                               | Texto [2 posições] Ex. BR                                                                                                                                                                                             | Não             |
| bpmpi_shipTo_shippingmethod      | Tipo do método de envio                                                    | lowcost: envio econômico<br>sameday: envio no mesmo dia<br>oneday: envio no dia seguinte<br>twoday: envio em dois dias<br>threeday: envio em três dias<br>pickup: retirada na loja<br>other: outrosnone: não há envio | Não             |
| bpmpi_shipto_firstusagedate      | Indica a data de quando houve a primeira utilização do endereço de entrega | Texto<br>AAAA-MM-DD – data da criação                                                                                                                                                                                 | Não             |

| **Dados do carrinho de compras** | **Descrição**                                  | **Tipo/Tamanho**                | **Obrigatório** |
| -------------------------------- | ---------------------------------------------- | ------------------------------- | --------------- | --- |
| bpmpi*cart*#\_description        | Descrição do item                              | Alfanumérico [até 255 posições] | Não             |
| bpmpi*cart*#\_name               | Nome do item                                   | Alfanumérico [até 255 posições] | Não             | Sim |
| bpmpi*cart*#\_sku                | SKU do item                                    | Alfanumérico [até 255 posições] | Não             |
| bpmpi*cart*#\_quantity           | Quantidade do item no carrinho                 | Numérico [até 10 posições]      | Não             |
| bpmpi*cart*#\_unitprice          | Valor unitário do item do carrinho em centavos | Numérico [até 10 posições]      | Não             |

| **Dados do usuário**                      | **Descrição**                                                            | **Tipo/Tamanho**                                                                                                        | **Obrigatório** |
| ----------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------- |
| bpmpi_useraccount_guest                   | Indica se o comprador é um comprador sem login (guest)                   | Booleano<br>true – sim<br>false – não                                                                                   | Não             |
| bpmpi_useraccount_createddate             | Indica a data de quando houve a criação da conta do comprador            | Texto<br>AAAA-MM-DD – data da criação                                                                                   | Não             |
| bpmpi_useraccount_changeddate             | Indica a data de quando houve a última alteração na conta do comprador   | Texto<br>AAAA-MM-DD – data da última alteração                                                                          | Não             |
| bpmpi_useraccount_passwordchangeddate     | Indica a data de quando houve a alteração de senha da conta do comprador | Texto<br>AAAA-MM-DD – data da última alteração de senha                                                                 | Não             |
| bpmpi_useraccount_authenticationmethod    | Método de autenticação do comprador na loja                              | 01- Não houve autenticação<br>02- Login da própria loja<br>03- Login com ID federado<br>04- Login com autenticador FIDO | Não             |
| bpmpi_useraccount_authenticationprotocol  | Dado que representa o protocolo de login efetuado na loja                | Alfanumérico [até 2048 posições]                                                                                        | Não             |
| bpmpi_useraccount_authenticationtimestamp | A data e hora que o login foi efetuado na loja                           | Texto [19 posições] _YYYY-MM-ddTHH:mm:SS_                                                                               | Não             |
| bpmpi_merchant_newcustomer                | Identifica se um comprador novo na loja                                  | Booleano<br>true – sim<br>false – não                                                                                   | Não             |

| **Dados do dispositivo utilizado para compra** | **Descrição**                           | **Tipo/Tamanho**                                                  | **Obrigatório** |
| ---------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------- | --------------- |
| bpmpi_device_ipaddress                         | Endereço IP da máquina do comprador     | Alfanumérico [até 45]                                             | Não             |
| bpmpi*device*#\_fingerprint                    | Id retornado pelo Device Finger Print   | Alfanumérico [sem limitação]                                      | Não             |
| bpmpi*device*#\_provider                       | Nome do provedor do Device Finger Print | Alfanumérico [até 32 posições] cardinal<br>inauth<br>threatmetrix | Não             |

| **Dados específicos para companhias aéreas** | **Descrição**                                                                             | **Tipo/Tamanho**               | **Obrigatório** |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------ | --------------- |
| bpmpi*airline_travelleg*#\_carrier           | Código IATA para o trecho                                                                 | Alfanumérico [2 posições]      | Não             |
| bpmpi*airline_travelleg*#\_departuredate     | Data de partida                                                                           | Texto<br>AAAA-MM-DD            | Não             |
| bpmpi*airline_travelleg*#\_origin            | Código IATA do aeroporto de origem                                                        | Alfanumérico [5 posições]      | Não             |
| bpmpi*airline_travelleg*#\_destination       | Código IATA do aeroporto de destino                                                       | Alfanumérico [5 posições]      | Não             |
| bpmpi*airline_passenger*#\_name              | Nome do passageiro                                                                        | Alfanumérico [até 60 posições] | Não             |
| bpmpi*airline_passenger*#\_ticketprice       | O valor da passagem em centavos Numérico [até 15 posições],<br>exemplo: R$ 125,54 = 12554 | Não                            |
| bpmpi_airline_numberofpassengers             | Número de passageiros                                                                     | Numérico [3 posições]          | Não             |
| bpmpi_airline_billto_passportcountry         | Código do país que emitiu o passaporte (ISO Standard Country Codes)                       | Texto [2 posições]             | Não             |
| bpmpi_airline_billto_passportnumber          | Número do passaporte                                                                      | Alfanumérico [40 posições]     | Não             |

| **Dados extras do estabelecimento (caso aplicável)** | **Descrição**                    | **Tipo/Tamanho**                | **Obrigatório** |
| ---------------------------------------------------- | -------------------------------- | ------------------------------- | --------------- |
| bpmpi_mdd1                                           | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| bpmpi_mdd2                                           | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| bpmpi_mdd3                                           | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| bpmpi_mdd4                                           | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |
| bpmpi_mdd5                                           | Dado Extra definido pelo lojista | Alfanumérico [até 255 posições] | Não             |

# Passo 4 - Implementação da chamada ao evento de autenticação

O evento &quot;**bpmpi_Authenticate()**&quot; deve chamado no momento de finalização do checkout (finalização da compra). Vide exemplo abaixo:

&lt;input type=&quot;button&quot;onclick=&quot;bpmpi_authenticate()&quot; /&gt;

# ECI (E-commerce Indicator)

O E-Commerce Indicator (ECI) é retornado no processo de autenticação. Este código é um indicador do que exatamente ocorreu no processo de autenticação da transação.

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

Para visualizar as últimas atualizações do manual, [clique aqui](https://github.com/DeveloperCielo/developercielo.github.io/commits/docs/_i18n/pt/_posts/3ds/2019-09-20-integracao-javascript.md)
