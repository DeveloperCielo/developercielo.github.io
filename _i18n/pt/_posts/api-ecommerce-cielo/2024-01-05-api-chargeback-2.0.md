---
layout: manual
title: API de Chargeback
description: API de Chargeback
search: true
translated: true
categories: manual
sort_order: 4
tags:
  - 1. API E-commerce
---

# Manual do cliente – API Chargeback

# Introdução

## Objetivo

Esse manual foi feito para garantir uma **melhor integração**  a você, cliente Cielo, na ***API de Chargeback***.

Através da API de Chargeback você pode **aceitar** ou **recusar** contestações, **consultar** contestações pendentes e tratadas, **visualizar o ciclo de vida** e acessar todas as informações importantes no processo de contestação. 
Além disso, existem funcionalidades para facilitar o dia a dia, como o **download de documentos do emissor** ou **de documentos anexados na defesa** e a configuração de mais de um webhook para receber notificações de novas contestações e atualizações sobre o status da disputa. **Tudo online**. 🚀

# Integração na API de Chargeback

<aside class="warning">

Prezado cliente,

A seguir, forneceremos todas as informações necessárias para que você possa realizar a integração conosco. Pedimos que leia atentamente todo o material antes de iniciar a integração na API de Chargeback.

É importante ressaltar que a caixa de atendimento techsupportchargeback@cielo.com.br destina-se exclusivamente a questões relacionadas à integração na API de Chargeback, não oferecendo suporte para outros assuntos relacionados a contestações de vendas. Caso necessite de assistência nesse sentido, solicitamos que entre em contato com o seu gestor comercial, que poderá auxiliá-lo no direcionamento correto.

Agradecemos a compreensão.</aside>

## 1. Geração e acesso às credenciais

Para começar, vamos conferir o fluxo abaixo. Ele representa a integração do cliente na API de Chargeback, desde o recebimento das credenciais até a disponibilização na Produção.

![API Chargeback Imagem 1](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_1.png)

> Encaminhe os passos 1 e 2 descritos abaixo **_juntos no mesmo e-mail_** para a caixa de atendimento [techsupportchargeback@cielo.com.br](mailto:techsupportchargeback@cielo.com.br) e aguarde o SLA de 2 dias úteis (48 horas corridas).  
> _Obs.: Em caso de ausência ou inconsistência dos dados, entraremos em contato para notificá-lo e solicitar os ajustes necessários._ 
> **Não se esqueça de incluir o seu gestor comercial no thread para apoio e acompanhamento!**

Para realizar o cadastro, siga esses passos:

1. Enviar um e-mail para a caixa de atendimento com as seguintes informações:

    a. **Número do Estabelecimento Comercial da Matriz** (EC Cielo, que representa o CNPJ da matriz) – Caso haja mais de uma matriz, por favor envie o EC de todas.

    b. **Raiz do CNPJ do Estabelecimento Comercial**.

    c. Se estiver interessado no Webhook de notificação e/ou ciclo de vida, por favor, informe a **URL dos serviços para parametrização na Produção**. Caso não esteja, desconsidere esse passo.

    d. Informe o **e-mail de acesso ao Portal dos Desenvolvedores** para o qual devemos conceder acesso.

        I. Além disso, efetue o cadastro no Portal dos Desenvolvedores através do link: https://desenvolvedores.cielo.com.br/api-portal/.
<small>Obs.: Lembrando que deve ser criado apenas um login por cliente. Siga o exemplo a seguir.</small>

Então, clique no botão **“cadastre-se”** e informe os dados da sua empresa.

![API Chargeback Imagem 2](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_2.png)
![API Chargeback Imagem 3](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_3.png)

Após concluído o cadastro, será exibida uma mensagem sobre um envio de e-mail. Aguarde e **_certifique-se que recebeu esse e-mail_**.

![API Chargeback Imagem 4](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_4.png)
![API Chargeback Imagem 4b](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_4_2.png)

Clique no link fornecido no e-mail e redefina sua senha.

![API Chargeback Imagem 5](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_5.png)

Após redefinir a senha, clique no botão **“Configurar aplicativo”** e instale o aplicativo de código de autenticação em seu dispositivo móvel ou desktop. Pode ser qualquer um desses abaixo:

    Google Authenticator (Android/iPhone/BlackBerry)
    Authy (Android/iPhone)
    Authenticator (Windows Phone)
    FreeOTP (Android)
    GAuth Authenticator (Firefox OS, desktop, outros)

O aplicativo de autenticação de dois fatores será usado durante esta configuração e para gerar códigos durante a autenticação regular. Se o aplicativo for compatível, realize a leitura do código **QR Code** para obter o código de configuração, caso contrário você poderá inserir manualmente o código de texto.

![API Chargeback Imagem 6](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_6.png)

Após concluída a autenticação, a mensagem **“Configuração do TFA concluída”** será exibida e poderá ter acesso a sua conta conforme dados enviados por e-mail.

Serão enviados **dois e-mails**: um informando ativação da sua conta e outro confirmando que autenticação foi finalizada com sucesso.

![API Chargeback Imagem 7](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_7.png)
![API Chargeback Imagem 8](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_8.png)
![API Chargeback Imagem 9](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_9.png)

<aside class="warning">Suas credenciais serão liberadas por completo após a finalização dos passos 1 e 2 e a confirmação do time Cielo, combinado? 😉 </aside>

## 2. Geração do certificado MTLS

### Para começar, envie o certificado MTLS para assinatura, conforme as instruções a seguir, por favor.

<aside class="warning"> Todas as chamadas aos nossos serviços devem ser feitas com o certificado MTLS assinado pela Cielo.</aside>

a. Execute o comando a seguir em um prompt de comando de sua preferência, substituindo as informações **NomeEmpresa** pelos seus respectivos dados.

        > openssl req -new -newkey rsa:2048 -nodes -keyout NomeEmpresa_Cielo.key -out NomeEmpresa_Cielo.csr

b. Ao executar este comando, preencha as informações solicitadas, substituindo os respectivos dados sinalizadas **em negrito** no exemplo abaixo.

| Campo | Descrição | Valor |
| :--- | :--- | :--- |
| **emailAddress** | Nome da área de produtos Cielo | techsupportchargeback@cielo.com.br |
| **Common Name (CN)** | Sigla-ambiente-serviço-mtls | STC-PRD-Informe sua empresa-MULESOFT-MTLS |
| **Organizational Unit (OU)** | Nome da área de produtos Cielo | Chargeback |
| **Organization (O)** | Cielo S/A | Cielo S/A |
| **Locality (L)** | Cidade | Informe sua cidade |
| **State (ST)** | Estado | Informe seu estado |
| **Country (C)** | País | Informe seu país |


![API Chargeback Imagem 10](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_10.png)

c. Após a execução e preenchimento dos dados, conforme apresentado acima, serão gerados dois arquivo:  **chave pública (extensão “.csr”) e a chave privada  (extensão “.key”)**.

       I. O arquivo “.key” é de uso exclusivo de vocês e nunca deve ser compartilhado com terceiros.

       II. Já o arquivo “.csr” deve ser encaminhado para assinatura da Cielo, sendo utilizado o mesmo certificado nos ambientes de Sandbox e Produção.

![API Chargeback Imagem 11](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_11.png)

<aside class="notice"> Após a confirmação da liberação das credenciais e a assinatura do certificado, você estará liberado para acessar o Sandbox da API de Chargeback e começar a fazer testes conosco! 🚀 </aside>

# Configurações para utilização da API Chargeback

## 1. Adicionar certificado MTLS no Postman

Nesse tópico você vai saber como **anexar o certificado assinado pela Cielo** na **API de Chargeback**.
Vamos lá? 

Na ferramenta do Postman, vá para o ícone de **“ferramentas”** ➡️ Configurações ➡️ Certificados ➡️ Anexe o arquivo .crt assinado pela Cielo e o .key.

<small>Obs.: Este passo deve ser feito tanto para o ambiente de Produção quanto para o de Sandbox, mas você pode usar o mesmo certificado, apenas alterando o campo "Host"</small>

Os endpoints da Cielo estão aqui:

      > a. Sandbox: https://apihml-internet.cielo.com.br/cielo-chargeback-sys-sandbox/chargeback/v1/
      > b. Produção: https://api-internet.cielo.com.br/cielo-chargeback-sys-external/chargeback/v1/

![API Chargeback Imagem 12](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_12.png)
![API Chargeback Imagem 13](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_13.png)

## 2. Obtenção do token

Para fazer a chamada, é preciso obter um token utilizando seu **client_id** e **client_secret**. Confira um exemplo de requisição:

**Sandbox:**

```java
curl --location --request POST 
https://apihml-internet.cielo.com.br/cielo-security-sys-web-hml/oauth/v2/MulesoftHML/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={clientId}' \
--data-urlencode 'client_secret={secret}' \
--data-urlencode 'grant_type=client_credentials'
```

Exemplo:
![API Chargeback Imagem 14](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_14.png)
![API Chargeback Imagem 15](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_15.png)

**Produção:**

```java
curl --location --request POST
https://api-internet.cielo.com.br/cielo-security-sys-web/oauth/v2/MulesoftPRD/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client\_id={ **clientId** }' \
--data-urlencode 'client\_secret={ **secret** }' \
--data-urlencode 'grant\_type=client\_credentials'
```

Ao executar o comando, extraia o campo access_token do retorno da requisição e passe como header em Authorization em todos os serviços:
**Lembrando que a duração do token é de no máximo 5 minutos.**

**Depois desse período é necessário gerar um novo token e substituir nas requisições.**

| **KEY** | **VALUE** |
| --- | --- |
| Authorization | Bearer {access­\_token} |

<aside class="warning"> Atenção: Se você receber o erro abaixo, volte para a seção de “adicionar o certificado MTLS na API”, pois o erro indica ausência do certificado assinado. </aside>

![API Chargeback Imagem 16](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_16.png)

# Instruções para uso do Sandbox

O **"sandbox"** é um ambiente de teste seguro e isolado, onde você pode experimentar e desenvolver sem afetar o ambiente de produção. É como um playground para testar novas funcionalidades, integrações e alterações sem impactar as operações em execução. Ele ajuda a garantir que tudo funcione corretamente antes de implementar as mudanças no ambiente real. Em resumo, o sandbox é como um laboratório seguro para testar e aprimorar suas soluções antes de colocá-las em uso ativo.

Nesta seção há informações sobre a Collection do ambiente de Sandbox da API de Chargeback que é disponibilizada, já com todas as configurações para os testes a seguir. Basta clicar em **“Exemplos”** na Collection e todos os casos de sucesso e falha estarão incluídos, é só executar! Não é incrível? 😉

![API Chargeback Imagem 17](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_17.png)

No entanto, se preferir parametrizar individualmente, aqui estão os dados para você incluir no serviço ao usar o Sandbox. Utilize os cenários a seguir para simular retornos de **sucesso** (código iniciando com 1) ou **erro** (código iniciando com 9).

<small> Obs.: Se forem fornecidos dados diferentes dos cenários abaixo, os serviços retornarão sucesso na requisição. 😉🛠️ </small>

| Código | Nome do serviço                                 | Número do estabelecimento | IdCase  | IdChargeback |
| ------ | ----------------------------------------------- | ------------------------- | ------- | ------------ |
| 103    | Consulta de contestação pendentes e tratadas (GetChargebackByStatus)    | 2222222222                | 4000000 |              |
| 901    | Consulta de contestação pendentes e tratadas (GetChargebackByStatus)   | 1111111111                | 4000000 |              |
| 101    | Acate de contestação (UpdateChargebackToRefused)                           | 2222222222                |         | 40000        |
| 901    | Acate de contestação (UpdateChargebackToRefused)                           | 1111111111                |         | 30000        |
| 102    | Recusa de contestação (UpdateChargebackToRefused)                          | 2222222222                |         | 20000        |
| 901    | Recusa de contestação (UpdateChargebackToRefused)                          | 1111111111                |         | 10000        |
| 104    | Consulta de documento (GetDocumentSupport)                          | 2222222222                |         | 20000        |
| 901    | Consulta de documento (GetDocumentSupport)                          | 1111111111                |         | 10000        |
| 104    | Lista de documentos do emissor (GetDocumentIssuer)                         | 2012457538                |         | 12345        |
| 901    | Lista de documentos do emissor (GetDocumentIssuer)                         | 1111111111                |         | 80000        |
|  -  | Download do documento do emissor (GetListIssuerDocuments)                       | 1111111111                |  | 40000        |
| 901    | Download do documento do emissor (GetListIssuerDocuments)                       | 1111111111                |  | 30000        |
|  -   | Pesquisa do ciclo de vida (GetLifecycle)                      |               |  | 7777777        |
| 901    | Pesquisa do ciclo de vida (GetLifecycle)                      |                 |  | 30000        |

**Vamos deixar aqui uma sugestão de validação no ambiente de Sandbox com base em cenários de teste para avançarmos com a integração em Produção:**

* Cenário 1:
Validar **sucesso** ✅(código 103) no serviço de Consulta de contestação pendente
* Cenário 2: 
Validar **falha** ❌(código 901) no serviço de Consulta de contestação pendente
* Cenário 3:
Validar **sucesso** ✅(código 103) no serviço de Consulta de contestação tratada
* Cenário 4:
Validar **falha** ❌(código 901) no serviço de Consulta de contestação tratada
* Cenário 5:
Validar **sucesso** ✅(código 101) no serviço de Acate de contestação
* Cenário 6: 
Validar **falha** ❌(código 901) no serviço de Acate de contestação
* Cenário 7:
Validar **sucesso** ✅(código 102) no serviço de Recusa de contestação
* Cenário 8:
Validar **falha** ❌(código 901) no serviço de Recusa de contestação
* Cenário 9:
Validar **sucesso** ✅(código 104) no serviço de Consulta de documento
* Cenário 10: 
Validar **falha** ❌(código 901) no serviço de Consulta de documento
* Cenário 11:
Validar **sucesso** ✅(código 104) no serviço de Lista de documentos do emissor
* Cenário 12:
Validar **falha** ❌(código 901) no serviço de Lista de documentos do emissor
* Cenário 13
Validar **sucesso** ✅(id do documento) no serviço de Download do documento do emissor
* Cenário 14
Validar **falha** ❌(código 901) no serviço de Download do documento do emissor
* Cenário 15 
Validar **sucesso** ✅(atualização da ação) no serviço de Pesquisa do ciclo de vida
* Cenário 16
Validar **falha** ❌(código 901) no serviço de Pesquisa do ciclo de vida

<aside class="warning"> Importante: Não temos ambiente de Sandbox para Webhook, mas todos os demais serviços estão contemplados nesse ambiente. </aside>

# Serviços da API de Chargeback

## 1. Fluxo de tratamento de contestações

Na **API de Chargeback**, você pode lidar com suas contestações usando dois serviços: o de **aceite** e o de **recusa**. Vamos explicar melhor como funciona esse fluxo:

![API Chargeback Imagem 18](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/img_18.png)

Após o tratamento, é possível acompanhar todo o processo, consultando o ciclo de vida da disputa. Se a contestação for recusada, você também pode consultar o documento de defesa anexado. Além disso, é possível verificar se o documento foi enviado através do emissor. E não se esqueça da funcionalidade dos webhooks para notificações sobre abertura de novos chargebacks e atualizações no ciclo de vida.

## 2. Lista dos serviços disponíveis

| Descrição | Path | Método HTTP |
| --- | --- | --- |
| Consulta de contestação pendentes e tratadas | /chargeback/v1/{status}?page={page}&pageSize={pageSize} | `POST` |
| Pesquisa do ciclo de vida | /chargeback/v1/lifecycle/{idCase} | `GET` |
| Aceite de contestação | /chargeback/v1/laccept | `PUT` |
| Recusa de contestação | /chargeback/v1/refuse | `PUT` |
| Consulta de documento | /chargeback/v1/supportDocument/{establishmentNumber}/{idChargeback} | `GET` |
| Lista de documentos do emissor | /chargeback/v1/ListIssuerDocuments/{establishmentNumber}/{idChargeback} | `GET` |
| Download do documento do emissor | /chargeback/v1/DocumentIssuer/{establishmentNumber}/{idDocumento} | `GET` |

## 3. Detalhamento dos serviços

### a. Consulta de contestações pendentes ou tratadas

Com esse serviço, você pode filtrar contestações para visualizar ou tratar com base em diversos parâmetros, como período, número do EC, e outros.

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/{status}?page={page}&pageSize={pageSize}

<aside class="warning"> Sempre iniciar a paginação pelo 0, exemplo page=0 </aside>

**Parâmetros e Path Variables:**

| Nome | Descrição | Tipo |
| --- | --- | --- |
| `Status` | Indica o status desejado, conforme domínios da tabela status | Variável |
| `Page` | Número da página desejada, considerando que **0** é a primeira | Parâmetro de query |
| `pageSize` | Tamanho de registros que retornam na página, considerando que o limite é **200** | Parâmetro de query |
| `orderBy` | Campo de ordenação da pesquisa | receptionDate ou treatmentDeadline |
| `Order` | Forma de ordenação da pesquisa | asc ou desc |

**Corpo da requisição:**

```json
{
    "startNotificationPeriod": "2022-01-01",
    "endNotificationPeriod": "2022-01-01",
    "cardAssociationCode": [],
    "process": [],
    "reason": [],
    "establishmentNumber": [],
    “mainCustomer”: “1024162076”,
    “hierarchyType”: 4,
    "idCase": “”,
    "tid": “”,
    "nsu": “”,
}
```   
<aside class="warning"> IMPORTANTE: Ao utilizar o campo "mainCustomer", é necessário também utilizar o "hierarchyType". Se utilizar o campo "establishmentNumber", não utilize os campos "mainCustomer" e "hierarchyType", pois serão desconsiderados. </aside>


| Campo | Descrição | Conteúdo |
| --- | --- | --- |
| `startNotificationPeriod`\* | Data inicial da notificação | Texto, formato yyyy-MM-dd |
| `endNotificationPeriod`\* | Data final da notificação | Texto, formato yyyy-MM-dd |
| `cardAssociationCode` | Bandeira do cartão | Texto, somente numérico |
| `process` | Tipo de processo | Lista, texto |
| `reason` | Id da razão do chargeback | Lista, texto |
| `establishmentNumber`\* | Número do estabelecimento comercial individual | Lista, numérico |
| `mainCustomer` | Número do estabelecimento comercial matriz | Lista, numérico |
| `hierarchyType` | Tipo de hierarquia | Numérico |
| `idCase` | Id do case do chargeback | Numérico |
| `tid` | Número TID | Numérico |
| `nsu` | Número serial único | Texto |

_\*Obrigatório para status DONE._

### Domínios

**Status**

| Código  | Descrição |
| ------- | --------- |
| DONE    | Tratada   |
| PENDING | Pendente  |

**Card Association Code**

| Código | Nome da bandeira |
| ------ | ---------------- |
| 1      | Visa             |
| 2      | Mastercard       |
| 3      | American Express |
| 7      | Elo              |
| 40     | Hipercard        |

**Process**

| Código | Descrição         |
| ------ | ----------------- |
| 1      | 1º Chargeback     |
| 2      | Cobrança amigável |
| 3      | 2º Chargeback     |
| 13     | Pré compliance    |
| 15     | Arbitragem        |
| 16     | Compliance        |  

**Hyerarchy Type**

| Código | Descrição |
| ------ | --------- |
| 1      | Raiz de CNPJ |
| 2      | Matriz de pagamento |
| 4      | Todos os tipos de hierarquia (fortemente recomendável para clientes integrados na API de Chargeback) |

### Retorno da requisição (pendente e tratado respectivamente)

Exemplo de requisição do status **pendente**:

``` JSON
{
  "content": [
    {
      "treatmentDeadline": "2024-12-20",
      "idCase": 49701065,
      "idChargeback": 20451,
      "establishmentNumber": 1024162076,
      "process": "PRE_ARBITRAGEM",
      "lifecycle": {},
      "transactionAmount": 100.0,
      "transactionDetails": {
        "transactionDate": "2024-12-01",
        "authorization": "2032089286",
        "cardAssociation": 2,
        "cardAssociationName": "Teste",
        "productCode": 1,
        "productDescription": "Teste",
        "issuerSenderCode": "0237",
        "issuerSenderDescription": "teste",
        "truncatedCard": "816799******1808",
        "currency": "REAL",
        "referenceNumber": "31670530295011332758320",
        "nsu": 96207,
        "ro": "22774287",
        "terminal": "7792753766",
        "tid": "",
        "establishmentName": "Ec Fake. - 22215"
      },
      "chargebackDetails": {
        "reasonCode": "54190",
        "reasonDescription": "Message Mock 4819",
        "tpReason": 1,
        "receptionDate": "2024-12-09",
        "issuerDocument": [
          {
            "idDocumento": 1,
            "nameFile": "Teste"
          }
        ]
      },
      "remainingDaysToTreat": 6
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": false,
  "totalElements": 123,
  "totalPages": 12,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "first": true,
  "numberOfElements": 1,
  "size": 10,
  "empty": true
}

```

Exemplo de requisição com status **tratado**:

``` JSON
{
  "content": [
    {
      "idCase": 4000000,
      "idChargeback": 8146,
      "establishmentNumber": 1234567890,
      "process": "PRIMEIRO_CHARGEBACK",
      "lifecycle": {
        "action": "Em análise com Cielo",
        "actionDate": "2024-12-14"
      },
      "transactionAmount": 100.0,
      "actionTakenCode": "RECUSADO",
      "transactionDetails": {
        "transactionDate": "2024-11-02",
        "authorization": "0579411473",
        "cardAssociation": 2,
        "cardAssociationName": "Teste",
        "productCode": 1,
        "productDescription": "Teste",
        "issuerSenderCode": "0237",
        "issuerSenderDescription": "teste",
        "truncatedCard": "962071******0573",
        "currency": "REAL",
        "referenceNumber": "38362859784948798112996",
        "nsu": 2947,
        "ro": "70737848",
        "terminal": "5731575069",
        "tid": "",
        "establishmentName": "Ec Fake. - 70992"
      },
      "chargebackDetails": {
        "reasonCode": "79979",
        "reasonDescription": "Message Mock 9916",
        "tpReason": 1,
        "reasonMessage": "teste",
        "receptionDate": "2024-12-07",
        "replyDate": "2024-12-11",
        "rapidDisputeResolution": "true",
        "issuerDocument": [
          {
            "idDocumento": 1,
            "nameFile": "Teste"
          }
        ]
      }
    }
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": false,
  "totalElements": 123,
  "totalPages": 12,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "first": true,
  "numberOfElements": 1,
  "size": 10,
  "empty": true
}

```

Status de retorno:

| Status | Descrição |
| ------ | --------- |
| 200    | Ok        |
| 400    | Requisição inválida |
| 403    | Sem permissão |
| 412    | Pré-condições inválidas |
| 500    | Erro interno |

### b. Pesquisa de ciclo de vida

Esse serviço permite consultar o ciclo de vida de uma contestação tratada, ou seja, as ações que ocorreram na contestação após o tratamento.

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/lifecycle/{idCase}

**Retorno da requisição:**

```json
[
    {
    "action": "Em análise com Cielo",
    "actionDate": "2024-12-14",
    }
]
```  

**Status de retorno:**

| Status | Descrição |
| ------ | --------- |
| 200    | Ok        |
| 400    | Requisição inválida |
| 403    | Sem permissão |
| 412    | Pré-condições inválidas |
| 500    | Erro interno |

- **Status Ciclo de Vida**
  - Intermediários:
      - Em análise com o Cliente
      - Em análise com o Emissor
      - Em análise com a Cielo
  - Finais:
      - A favor do Estabelecimento
      - A favor do Emissor

### c. Aceite de contestação

Serviço para realizar o aceite de uma contestação, considerando a venda como inválida e concordando com o estorno pela credenciadora Cielo.

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/accept

**Parâmetros e Path Variables:**

```json
{
    "updateChargeback": [
    {
    "establishmentNumber": "2005158504",
    "idChargeback": "57772"
    },
     {
    "establishmentNumber": "2005158504",
    "idChargeback": "77777"
    }
  ],
    "userName": "user"
}
```  

_*Todos os campos são obrigatórios._

**Retorno da requisição:**

```json
 [
    {
    "establishmentNumber": "2012457511",
    "idChargeback": "32325",
    "code": "101",
    "message": "Chargeback acatado com sucesso!"
   },
   {
    "establishmentNumber": "2012457511",
    "idChargeback": "32325",
    "code": "101",
    "message": "Chargeback acatado com sucesso!"
    }
]
```

**Status de retorno:**

| Status | Descrição |
| ------ | --------- |
| 200    | Ok        |
| 400    | Requisição inválida |
| 403    | Sem permissão |
| 412    | Pré-condições inválidas |
| 500    | Erro interno |

### d. Recusa de contestação

Com esse serviço, você pode se defender de uma contestação apresentando uma evidência na forma de imagem ou documento, juntamente com um breve texto justificando a posição.

<aside class="warning"> IMPORTANTE: Anexar a documentação dentro do padrão formatos .TIF, .TIFF, .PDF ou .JPEG, contendo 8MB, máximo de 10 páginas e resolução máxima de 8,64 x 14 polegadas (aplicável para .TIF, .TIFF e .JPEG). Sendo que o nome do documento deve ser o mesmo nome do IdCase. </aside>

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/refuse

**Parâmetros e Path Variables:**

```json
{
    "establishmentNumber": "2222222222",
    "idChargeback": "20000",
    "reasonToRefuse": "Validação Sandbox - API de Chargeback",
     “file”: “multipart/form-data”,
     “userName”: “user”
}
```   

*_Todos os campos são obrigatórios._

**Retorno da requisição:**

```json
{
   "code":"102",
   "message":"Chargeback recusado com sucesso!"
}
```

**Status de retorno:**  

| Status | Descrição |
| ------ | --------- |
| 200    | Ok        |
| 400    | Requisição inválida |
| 403    | Sem permissão |
| 412    | Pré-condições inválidas |
| 500    | Erro interno |

### e. Consulta de documento

Caso a contestação seja recusada, este serviço disponibiliza o documento de defesa anexado para consulta.

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/supportDocument/{establishmentNumber}/{idChargeback}

**Parâmetros e Path Variables:**

| Nome | Descrição | Tipo |
| ---- | --------- | ---- |
| establishmentNumber* | Número do estabelecimento comercial | Variável |
| idChargeback* | Id do chargeback | Variável |

*_Todos os campos são obrigatórios._

**Retorno da requisição:**

```json
[
  {
  "dateInclusion": "2024-12-14",
  "nameFile": "PTEXT",
  "codigo": 104,
  "mensagem": "Download realizado com sucesso do documento de apoio!",
  "file": "4E/QlOo6aRCi2AgAKzAwnQ=="
  }
]
```

### f. Listar documentos do emissor

Esse serviço fornece os nomes e os códigos dos documentos enviados pelo emissor para apoiar na tratativa de contestação.

<aside class="notice"> Não é obrigatório o envio do documento do emissor para você, cliente, mas sempre que o emissor enviar essa documentação, podendo ser 1 ou mais documentos, estará disponível na API de Chargeback para listagem e download. </aside>

_Obs.: Primeiro é necessário listar o documento neste serviço e, em seguida, realizar o download do documento do emissor no serviço apresentado no próximo tópico deste documento._

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/ListIssuerDocuments/{establishmentNumber}/{idChargeback}

**Parâmetros e Path Variables:**

| Nome | Descrição | Tipo |
| ---- | --------- | ---- |
| establishmentNumber* | Número do estabelecimento comercial | Variável |
| idChargeback* | Id do chargeback | Variável |

*_Todos os campos são obrigatórios._

**Retorno da requisição:**

```json
[
    {
        "idDocumento": 1571,
        "nameFile": "5219062.tif"
    }
]
```

### g. Download de documentos do emissor

Este serviço permite o download do documento enviado pelo emissor.

<aside class="notice"> Não é obrigatório o envio do documento do emissor para você, cliente, mas sempre que o emissor enviar essa documentação, podendo ser 1 ou mais documentos, estará disponível na API de Chargeback para listagem e download. </aside>

_Obs.: Primeiro é necessário listar o documento no tópico deste documento apresentado acima e, em seguida, realizar o download do documento do emissor nesse serviço._

**Endpoint da requisição:**

> {endpoint}/chargeback/v1/DocumentIssuer/{establishmentNumber}/{idDocumento}

**Parâmetros e Path Variables:**

| Nome | Descrição | Tipo |
| ---- | --------- | ---- |
| establishmentNumber* | Número do estabelecimento comercial | Variável |
| idDocumento* | Número do documento obtido através do serviço "Lista de documentos do emissor" | Variável |

*_Todos os campos são obrigatórios._

**Retorno da requisição:**

```json
{
    "dateInclusion": "2024-12-14",
    "nameFile": "987654321.png",
    "returncode": 105,
    "returnMessage": "Download realizado com sucesso do documento de apoio!",
    "file": "4E/QlOo6aRCi2AgAKzAwnQ==”
}
```

### h. Webhooks

Webhooks são **URLs personalizadas** que recebem notificações automáticas e em tempo real de eventos específicos que ocorrem em um determinado sistema. Eles são úteis para manter os sistemas **atualizados e sincronizados**, permitindo que ações sejam desencadeadas em resposta a eventos como a atualização de um status ou a ocorrência de uma nova notificação. Em resumo, os webhooks permitem que **diferentes sistemas se comuniquem entre si de forma eficiente e automatizada**. Para promover a integração na API de Chargeback, você tem a opção de usar 2 webhooks.

**_Notificação ao receber novos chargebacks_**

Este serviço fornece informações em tempo real sempre que houver novos chargebacks.

**Retorno da requisição:**
*_É exatamente o mesmo do serviço de Consulta de Contestações Pendentes apresentado nesse manual anteriormente._

```json
{
  "treatmentDeadline": "2024-12-20",
  "idCase": 49701065,
  "idChargeback": 20451,
  "establishmentNumber": 1024162076,
  "process": "PRIMEIRO_CHARGEBACK",
  "lifecycle": {},
  "transactionAmount": 100.0,
  "transactionDetails": {
    "transactionDate": "2024-12-01",
    "authorization": "2032089286",
    "cardAssociation": 2,
    "cardAssociationName": "Teste",
    "productCode": 1,
    "productDescription": "Teste",
    "issuerSenderCode": "0237",
    "issuerSenderDescription": "teste",
    "truncatedCard": "816799******1808",
    "currency": "REAL",
    "referenceNumber": "31670530295011332758320",
    "nsu": 96207,
    "ro": "22774287",
    "terminal": "7792753766",
    "tid": "12043402495ERJ76EGDF",
    "establishmentName": "Ec Fake. - 22215"
  },
  "chargebackDetails": {
    "reasonCode": "54190",
    "reasonDescription": "Message Mock 4819",
    "tpReason": 1,
    "receptionDate": "2024-12-09",
    "issuerDocument": [
      {
        "idDocumento": 1,
        "nameFile": "Teste"
      }
    ]
  },
  "remainingDaysToTreat": 6
}

```

**_Notificação sobre atualizações no status do ciclo de vida_**

Este serviço fornece informações em tempo real sempre que houver atualizações de novos status no ciclo de vida para chargebacks tratados.

**Retorno da requisição:**
*_É exatamente o mesmo do serviço de Ciclo de Vida apresentado nesse manual anteriormente._

```json
{
  "establishmentNumber": 2312054625,
  "caseId": 6035477,
  "message": "A favor do Estabelecimento",
  "executionDate": "2024-12-22",
  "ActionCicleDate": "2024-12-22"
}

```
<aside class="notice"> Por favor, tenha em mente que a utilização dos webhooks é opcional, permitindo que você usufrua de ambos ou opte por apenas um deles.
Para iniciar a utilização do webhook, é necessário enviar os dados solicitados no início deste manual (passo 1. C. no tópico de Integração na API de Chargeback). </aside>

# Dúvidas ou problemas na API de Chargeback 🤔

Caso encontre algum erro ou possua dúvidas sobre o processo de integração à API de Chargeback, direcione um e-mail para _techsupportchargeback@cielo.com.br_ com todas as informações solicitadas abaixo:

* URL
* Tipo de método (Get, Post, etc.)
* Corpo da requisição (se aplicável)
* Resposta recebida pela API

*_Obs.: Nosso SLA de atendimento é de 2 dias úteis._

Para que possamos analisar a dúvida ou falha e realizar a tratativa da maneira mais eficiente possível, é necessário que **todas as informações** mencionadas acima sejam enviadas.

# Detalhamento dos campos de serviços

| Nome do campo             | Tamanho   | Tipo   | Descrição do campo                                      |
|---------------------------|-----------|--------|----------------------------------------------------------|
| `action`                    | 50        | String | Descrição da ação dada para o chargeback                |
| `actionDate`                | -         | Data   | Data da ação dada                                       |
| `actionTakenCode`           | 1         | String | Código da ação dada para o Chargeback                   |
| `authorization`             | 6         | String | Código de autorização                                   |
| `cardAssociation`           | 10        | Number | Código da bandeira                                      |
| `cardAssociationName`       | 50        | String | Nome da bandeira                                        |
| `cdReason`                  | 4         | Number | Código da razão                                         |
| `chargebackMessage`         | 100       | String | Mensagem do chargeback                                  |
| `code`                      | 3         | Number | Código da mensagem de status                            |
| `codigo`                    | 3         | Number | Indica se o arquivo foi trafegado com sucesso           |
| `currency`                  | 64        | String | Moeda da contestação                                    |
| `dateInclusion`             | -         | Data   | Data da inclusão                                        |
| `dcReason`                  | 57        | String | Descrição da razão                                      |
| `establishmentName`         | 100       | String | Nome do estabelecimento comercial                       |
| `establishmentNumber`       | 10        | Number | Número de estabelecimentos específicos                  |
| `mainCustomer`              | 10        | String | Número do estabelecimento matriz                        |
| `file`                      | -         | array de bytes /blob| Arquivo base64                             |
| `nameFile`                  | 50        | Number | Nome do arquivo                                         |
| `hierarchyType`             | 1         | String | Código para identificar o tipo de hierarquia            |
| `idCase`                    | 20        | String | Identificador do case                                   |
| `idChargeback`              | 20        | Number | Identificador da contestação                            |
| `idDocumento`               | 20        | Number | Identificador do documento do emissor                   |
| `issuerSenderCode`          | 10        | String | Código do emissor                                       |
| `issuerSenderDescription`   | 60        | String | Descrição do emissor                                    |
| `mensagem`                  | 60        | String | Mensagem do status do tráfego do arquivo                |
| `message`                   | 60        | String | Mensagem de retorno da requisição                       |
| `nameFile`                  | 50        | String | Nome do arquivo                                         |
| `nsu`                       | 9         | Number | Número serial único                                     |
| `process`                   | 50        | String | Código do processo                                      |
| `productCode`               | 10        | String | Código do produto                                       |
| `productDescription`        | 60        | String | Descrição do produto                                    |
| `rapidDisputeResolution`    | 5         | String | Indicador de resolução rápida de disputas               |
| `reasonCode`                | 4         | String | Código da razão                                         |
| `reasonDescription`         | 1000      | String | Descrição da razão                                      |
| `reasonMessage`             | 100       | String | Mensagem da razão                                       |
| `reasonToRefuse`            | 100       | String | Texto contendo o motivo da recusa                       |
| `receptionDate`             | -         | Data   | Data de recepção da contestação                         |
| `referenceNumber`           | 23        | String | Número de referência                                    |
| `remainingDaysToTreat`      | 4         | Number | Dias pendentes para tratamento                          |
| `replyDate`                 | -         | Data   | Data do tratamento                                      |
| `ro`                        | 7         | String | Número RO                                               |
| `terminal`                  | 8         | String | Número do terminal                                      |
| `tid`                       | 40        | String | Número TID                                              |
| `tpReason`                  | 1         | Number | Tipo da razão                                           |
| `transactionAmount`         | 15,2      | Number | Valor da transação da contestação                       |
| `transactionDate`           | -         | Data   | Data da transação da contestação                        |
| `treatmentDeadline`         | -         | Data   | Data limite de tratamento                               |
| `truncatedCard`             | 19        | String | Número de cartão truncado                               |
| `userName`                  | 256       | String | E-mail do responsável pela tratativa                    |

# Tabela dos status de retorno

| Código | Descrição |
|--------|-----------|
| 101    | Chargeback acatado com sucesso! |
| 102    | Chargeback recusado com sucesso! |
| 103    | Não há registros a serem exibidos a partir da busca realizada. |
| 104    | Download do documento de apoio realizado com sucesso! |
| 105    | Download realizado com sucesso do documento do emissor! |
| 138    | Limite máximo de itens por página deve ser até 200 registros. |
| 901    | Não foi possível concluir a requisição. Tente mais tarde! |
| 902    | Não foi possível concluir a requisição. Case informado não condiz com o número do estabelecimento! |
| 903    | Anexar a documentação dentro do padrão: formatos .TIF, .TIFF, .PDF ou .JPEG, contendo 8MB, máximo de 10 páginas e resolução máxima de 8,64 x 14 polegadas (aplicável para .TIF, .TIFF e .JPEG). |
| 904    | Necessário adicionar um documento para recusar. |
| 905    | Motivo de rejeição ultrapassou o limite de 100 caracteres. |
| 906    | O limite de período para a consulta é de 180 dias. |
| 907    | O campo período de notificação aceita somente caracteres numéricos e no formato AAAA-MM-DD. |
| 908    | Necessário informar a bandeira para buscar por razão. |
| 909    | Obrigatório o preenchimento do campo “número do estabelecimento” ou informar o número da matriz |
| 910    | O campo “número do estabelecimento” aceita somente caracteres numéricos. |
| 911    | O campo “número do case” aceita somente caracteres numéricos. |
| 912    | O campo “bandeira” aceita somente caracteres numéricos. |
| 913    | O campo “mensagem de chargeback” é preenchido apenas nas razões de fraude. |
| 914    | O campo “TID” é alfanumérico, portanto, não aceita caracteres especiais. |
| 915    | O campo “TID” deve conter até 20 caracteres. |
| 916    | O campo “page” deve ser maior ou igual a 0. |
| 917    | O campo “pageSize” deve ser igual ou maior que 1. |
| 918    | Não foi possível conectar à base de dados. |
| 919    | O campo “status” é obrigatório. |
| 920    | O campo “período de notificação” é obrigatório. |
| 921    | O campo “data inicial do período de notificação” é obrigatório. |
| 922    | O campo “data final do período de notificação” é obrigatório. |
| 923    | A data inicial do período de notificação deve ser menor que data final. |
| 924    | O campo “processo” aceita somente caracteres numéricos. |
| 925    | O campo “razão” aceita somente caracteres numéricos. |
| 926    | O campo “id do chargeback” é obrigatório. |
| 927    | Não foi possível concluir a requisição. Case informado não possui documentação de apoio atrelada! |
| 928    | O campo “id do chargeback” aceita somente caracteres numéricos. |
| 929    | Não foi possível concluir a requisição. O nome do documento deve ser o número do case! |
| 930    | O campo “motivo de recusa” é obrigatório. |
| 931    | Não foi possível concluir a requisição. Chargeback já tratado anteriormente! |
| 932    | O campo “idBandeira” não é válido. |
| 933    | O campo “Orderby” não é válido. |
| 934    | O campo “Order” não é válido. |
| 935    | O campo “NSU” aceita somente caracteres numéricos. |
| 936    | O campo “número da matriz” aceita somente caracteres numéricos. |
| 938    | Não foi possível concluir a requisição. Case informado não possui documentação do emissor atrelado! |
| 939    | O campo id do documento aceita somente caracteres numéricos |
| 941    | Não foi possível concluir a requisição. Id do chargeback informado não condiz com o número do estabelecimento! |

# Dúvidas frequentes

**1. O que é uma contestação?**

É quando o titular do cartão identifica algum problema na transação, como suspeita de fraude ou desacordo com o lojista. Então, ele entra em contato com o Banco Emissor do cartão para relatar o ocorrido e é iniciado o processo de disputa. Além de contestação, esse processo também é chamado de Chargeback. E todo o fluxo de disputa é regulamentado pelas bandeiras dos cartões, que determinam as regras de disputa, como quem ganha e quem perde, por exemplo.

**2. Como eu posso me defender dessas contestações?**

É simples! Quando uma compra é contestada, você tem 2 opções:

* Aceitar e permitir o estorno do valor da venda;
* Defender-se e evitar que o valor seja estornado.

Suas ações durante o processo de chargeback são chamadas de tratativas. A tratativa pode ser realizada dentro do App Cielo Gestão, do Site Cielo ou através da **API de Chargeback Cielo**, que é o tema deste documento.

**3. Para dar início ao processo de integração com API de Chargeback, quais informações devo passar e para quem devo solicitar o cadastro?**

Para iniciar a integração, você precisa apenas seguir o passo a passo que está no item **Integração com API de Chargeback**.

**4. Caso eu esteja integrado com a API da Braspag/Risk Notification, posso migrar para API de Chargeback da Cielo?**

Sim! Nós recomendamos que essa migração ocorra, justamente porque a API de Chargeback da Cielo oferece mais benefícios em relação a API da Braspag. Veja como a migração vale a pena:

* Um aumento de prazo no tratamento das contestações em 3 dias. Ou seja, a API Braspag tem 7 dias e a Cielo 10 dias;
* Um leque maior de formatos de documentos aceitos. A API Braspag aceita apenas .tiff, enquanto a Cielo aceita pdf e jpeg também;
* A consulta do status da contestação (serviço ciclo de vida), dando maior visibilidade e capacidade de gestão das contestações tratadas;
* A consulta do documento adicionado na defesa (serviço consulta de documento);
* A consulta do documento enviado pelo emissor.

Para realizar a migração, solicite ao seu Gerente de Negócios o descadastramento da API da Braspag e a integração com a API de Chargeback Cielo. Durante o período de integração com API de Chargeback Cielo (desde o momento do descadastro da API Braspag até o momento da integração com a nova API), você deverá administrar seus chargebacks pelo Site Cielo.

**5. Como consultar uma contestação na API?**

É bem simples! No serviço **Consulta de contestações pendentes ou tratadas**, você consegue visualizar tanto as contestações que estão pendentes (status PENDING) quanto as que já foram tratadas (status DONE).

Para visualizar as contestações que estão pendentes de tratamento, basta informar o número do estabelecimento que deseja consultar, e para as já tratadas, você também deve especificar um período.

**6. Posso realizar uma consulta para todos os estabelecimentos abaixo da minha matriz?**

Sim, nós recomendamos que você consulte sempre pelo seu estabelecimento matriz, pois dessa forma você visualiza todas as contestações dos demais estabelecimentos abaixo daquela matriz selecionada. Na API, o número do estabelecimento individual que recebeu a contestação é representado pelo campo `establishmentNumber` e o número do estabelecimento matriz é o `mainCustomer`. Então, no serviço de consulta, você só precisa preencher o campo `mainCustomer`, assim você vai obter todas as contestações abaixo da sua hierarquia de Raiz de CNPJ. Caso queira visualizar as contestações abaixo de um outro tipo de hierarquia, como por exemplo um Grupo de Pagamento, você deverá preencher também o campo `hierarchyType` para especificar o tipo de matriz a ser consultada.

**7. Como realizar uma tratativa na API?**

No serviço **Aceite de contestação**, você realiza o aceite informando o número do estabelecimento que recebeu a contestação e o ID do Chargeback.

No serviço **Recusa de contestação**, você realiza a recusa informando, além do número do estabelecimento que recebeu a contestação e do ID do Chargeback, uma breve descrição da razão de recusa (máximo 100 caracteres) e um documento que comprove que a venda foi legítima, isto é, que foi feita pela pessoa titular do cartão ou com o consentimento dela e que ambos cumpriram suas obrigações no momento da compra.

**8. Enviei a documentação solicitada, como saber qual o status do meu caso. Eu ganhei ou perdi esta contestação?**

Você pode consultar o andamento da sua contestação no serviço **Pesquisa Ciclo de Vida da API**, informando o número do case que deseja visualizar.

**9. Com que frequência devo consultar as contestações?**

As bandeiras atualizam as contestações uma vez por dia, por isso, você pode verificar suas contestações diariamente.

**10. Qual é a diferença entre "mainCustomer", "establishmentNumber" e "hierarchyType"?** 

O campo `mainCustomer` deve ser utilizado para inserir o número do estabelecimento comercial que representa a matriz. Sempre que utilizar esse campo, é obrigatório também preencher o campo `hierarchyType` para indicar o tipo de hierarquia, sendo o código 4 recomendado para clientes que utilizam a API.

Por outro lado, temos o campo `establishmentNumber`, que consulta múltiplos estabelecimentos comerciais específicos individualmente.
Nunca preencha os campos `mainCustomer` e `hierarchyType` em conjunto com o `establishmentNumber`, pois somente o que está sendo informado no `establishmentNumber` será considerado.

**11. É necessário usar certificado MTLS tanto no ambiente de Sandbox quanto no de Produção?**

Sim, o mesmo certificado deve ser usado em ambos os ambientes de Sandbox e Produção, independentemente se você, cliente, realizará tratativas ou apenas consultas de contestações.

**12. Com que frequência é necessário renovar o certificado MTLS?**

A cada 2 anos, precisamos que você, cliente, gere um novo certificado, envie para a Cielo para que possamos realizar a assinatura. Próximo à data de vencimento, entraremos em contato!

**13. Qual é a diferença entre o Site Cielo, o App Cielo e a API de Chargeback para consultar e tratar contestações?**

A jornada de chargeback tem origem na API de Chargeback, ou seja, **as informações apresentadas no Site ou App Cielo são exatamente as mesmas da API de Chargeback**.

Sendo assim, a integração com a API é opcional, pois todas as informações da API estão disponíveis no Site e App Cielo. O **diferencial da API são as opções de Webhook** para notificação de novos chargebacks e atualizações do status do ciclo de vida do chargeback.

Mas você, cliente, consegue consultar e tratar seus chargebacks através dos canais digitais sem a necessidade de desenvolvimento do seu lado, já que a integração com API é opcional.

# Mais informações

Ficou com dúvida? Acesse a página: [blog da Cielo](https://blog.cielo.com.br/dicas-e-historias-de-sucesso/o-que-e-chargeback/)

# Contato para dúvidas

E-mail para suporte técnico: [techsupportchargeback@cielo.com.br](mailto:techsupportchargeback@cielo.com.br)

<aside class="warning"> Importante ressaltar que a caixa de atendimento pode ser acionada antes ou depois da conclusão da integração. No entanto, reforçamos que o e-mail "techsupportchargeback@cielo.com.br" destina-se exclusivamente a questões relacionadas à integração na API de Chargeback, não oferecendo suporte para outros assuntos relacionados a contestações de vendas. </aside>

Caso precise de alguma ajuda, você pode entrar em contato diretamente com seu Gerente de Negócios, que estará pronto para te atender da melhor forma!

**Conte conosco!**
