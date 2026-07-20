---
layout: redirect
redirect: https://docs.cielo.com.br/pix-can-cbk/docs/conheca-a-api-unica-de-cancelamento
title: API Refunds
description: API Única de Cancelamento e Cartas 
search: true
categories: manual
sort_order: 1
tags:
  - API Refunds
language_tabs:
  json: JSON
  shell: cURL
---

# IMPORTANTE: NOVO PORTAL DE DOCUMENTAÇÕES

*Junho de 2026*

Nossas documentações estão disponíveis em um novo portal!

[Acesse o novo portal de desenvolvedores](https://docs.cielo.com.br/pix-can-cbk/docs/conheca-a-api-unica-de-cancelamento).

![aviso novo portal](../../../../images/novoportaldoc.jpg)

O novo ambiente foi pensado para facilitar sua jornada como desenvolvedor proporcionando: 

✅ Interface mais intuitiva e moderna; <br/>
✅ Navegação simplificada; <br/>
✅ Referências de API mais completas e estruturadas; <br/>
✅ Maior padronização entre documentações; <br/>
✅ Melhor experiência de leitura, aprendizado e integração. <br/>

<aside style="background-color: #f8d7da; padding: 15px; border-left: 5px solid #dc3545; color: #721c24;margin-top: 20px; margin-bottom: 20px;"> O conteúdo deste portal não é atualizado desde 24/06/2026. </aside>

    
# Objetivo

O objetivo desta documentação é orientar sobre a integração com a API Única de Cancelamento de vendas Cielo, descrevendo funcionalidade, informações técnicas e etapas para solicitação de acesso.

# Sobre a API Única de Cancelamento

A API Única de Cancelamento é mais uma opção de canal de cancelamento de vendas disponibilizado pela Cielo aos clientes.

Com a API Única de cancelamento, é possível centralizar cancelamentos de vendas de diversas soluções de captura em uma única integração (POS, LIO, TEF e E-commerce) além de permitir consulta de cancelamentos e geração de Cartas de Cancelamentos efetivados.

A integração com a API exige **credenciais de acesso** que são concedidas por Raiz de CNPJ. Ou seja, todos os Estabelecimentos que fazem parte dessa raiz podem ter cancelamentos de vendas solicitados usando uma mesma credencial de acesso em uma única integração.

Principais benefícios da solução da API de Cancelamento
- **Solicitação** de cancelamento **direta** para o SistemadeCancelamento Cielo;
- **Consulta de Status de Cancelamento** com descriçãocomplementar de motivo em caso de rejeição de
cancelamento;
- **Centralização de solicitação de cancelamento** de vendasf eitas por variadas soluções de captura usadas pelocliente (POS, TEF, LIO, E-commerce);
- **Geração de Carta de Cancelamento** no mesmo dia daefetivação do cancelamento de forma unitária ou em lote;
- **Autonomia e autosserviço** no processo de solicitação de cancelamento de vendas;
- **Simplicidade**, pois o protocolo utilizado é puramente o HTTPS tecnologia REST, que é padrão de mercado;
- **Facilidade de testes** disponibilizamos credenciais dea mbiente de homologação e massa de vendas para teste em ambiente de homologação;

# Produtos e Bandeiras suportadas

A versão atual da API Cancelamento Cielo possui **suporte de cancelamento** a **todos os produtos e bandeiras** capturados pela Cielo com **exceção de PIX**, transações de **Voucher** e Pré-autorização.

# Fluxo para acesso API de Cancelamento

O fluxo abaixo mostra a integração do cliente na API Única de Cancelamento desde o recebimento das credenciais de Homologação/Produção até o acesso à API em Produção.

![Imagem1](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/cancelamento/Imagem1.jpg)

# Solicitação de Credenciais para Produção (client_id e client_secret)

## Envio de informações para solicitação de credencial

Para obter acesso à API de Cancelamento em Produção, envie os dados abaixo para: **api.cancelamento@cielo.com.br**  

- **Nome** – nome do ponto focal do estabelecimento que fará gerenciamento das credenciais para acessa a API de
Cancelamento.
- **E-mail** – e-mail do ponto focal do estabelecimento que fará gerenciamento das credenciais para acessa a API de
Cancelamento.
- Raiz de CNPJ que deseja integrar na API. Caso tenha maisde uma Raiz de CNPJ a ser integrada, envie todas.

> **Nota**: Todos os estabelecimentos que compõe essa Raiz de CNPJ poderão ter os cancelamentos de vendas solicitados pela API Única de Cancelamento.

Com esses dados, nosso time Cielo vai solicitar criação de credenciais de acesso para integração em Produção.

Mesmo que a integração do Estabelecimento com a API seja feita através de um terceiro, o e-mail que deve ser enviado deve serdo **ponto focal do estabelecimento**.

## Cadastro no Portal de Desenvolvedores Cielo 

Após a aprovação da solicitação, um e-mail será enviado ao ponto focal estabelecimento solicitante. 

Acesse o Portal de Desenvolvedores Cielo  https://desenvolvedores.cielo.com.br/api-portal/ e realize seu cadastro.

> **Importante:** O cadastro deve ser realizado com o mesmo e-mail do ponto focal do Estabelecimento enviado no passo 1.

![Imagem2](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/cancelamento/Imagem2.png)

Preencha o e-mail de quem fará o gerenciamento das credenciais para acessar a API de cancelamento e demais dados do Estabelecimento.

![Imagem3](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem3_0.png)

![Imagem4](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem4.png)

Ao concluir o cadastro, um e-mail de confirmação será enviado. 

![Imagem5](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem5.png)

Acesse o e-mail utilizado no cadastro e acesse o link para validar o primeiro acesso. 

![Imagem6](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem6.png)

Altere a senha inicial e salve as alterações.

![Imagem7](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem7.png)

Para ter mais segurança no acesso às credenciais, clique no botão “Configurar Aplicativo” e instale em seu dispositivo móvel ou desktop aplicativo de duplo fator de autenticação que desejar /preferir.
- Google Authenticator (Android/iPhone/BlackBerry)
- Authy (Android/iPhone)
- Authenticator (Windows Phone)
- FreeOTP (Android)
- GAuth Authenticator (Firefox OS, desktop, outros)

![Imagem8](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem8.png)

O aplicativo de autenticação de dois fatores será usado durante esta configuração e para gerar códigos durante a autenticação regular. Se o aplicativo for compatível, realize a leitura docódigo QR Code para obter o código de configuração, caso contrário você poderá inserir manualmente o código de texto.

Link para instalação do app: https://www.microsoft.com/pt-br/security/mobile-authenticator-app

Forneça a senha atual e confirme.

![Imagem9](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem9.png)

O aplicativo de autenticação de dois fatores será usado duranteesta configuração e para gerar códigos durante a autenticação regular. Se o aplicativo for compatível, realize a leitura docódigo QR Code para obter o código de configuração, caso contrário você poderá inserir manualmente o código de texto.

![Imagem10](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem10.png)

Valide o código fornecido no aplicativo Microsoft Authenticator (é obrigatório).

![Imagem11](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem11.png)

Após concluída a autenticação, a mensagem “Configuração do TFA concluída” será exibida e poderá ter acesso a sua conta conforme dados enviados por e-mail.

![Imagem12](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem12.png)

Acesse Cliente-Ids Cadastrados acessando no menu item *"Perfil” > “Client-Ids Cadastrados”* ou acessando *Client-Ids Cadastrados* no rodapé.

![Imagem13](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem13.png)

![Imagem14](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem14.png)

![Imagem15](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem15.png)

# Criação de uma chave pública e privada para criptografia (Certificado MTLS)

Para conferir maior segurança no uso da API Única de Cancelamento, é necessário uso de certificado assinado pela Cielo.  

Este certificado não tem custo adicional e todas as chamadas aos serviços da API em homologação e produção devem ser feitas com certificado MTLS assinado pela Cielo.

Gere o arquivo da chave pública no formato **.csr** executando o comando abaixo em um terminal como gitbash ou via ferramenta openssl. 

Exemplo:

> openssl req -new -newkey rsa:2048 -nodes -keyout **NomeEmpresa**_Cielo.key -out **NomeEmpresa**_Cielo.csr

Ao executar este comando, preencha as informações solicitadas conforme exemplo abaixo e substituindo os dados sinalizadas na cor **azul em negrito** com o nome da sua empresa:

| Campo                              | Descrição           | Valor  |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------- |
|  `emailAddress`                  | E-mail da área de produtos Cielo responsável pela API | api.cancelamento@cielo.com.br  | 
|   `Common Name`                  | Nome da empresa que está integrando na API Única de Cancelamento | CAN-**EMPRESA**-PRD-MULESOFT-MTLS  | 
|  `Organizational Unit`           | Nome da área de produtos Cielo responsável pela API “squad-cancelamento”  | squad-cancelamento  | 
|  `Organization Name`             | Empresa que está fornecendo a solução API Única de Cancelamento  | Cielo S.A.  | 
|  `Locality`                      | Cidade Cielo | Barueri  | 
|  `State`                         | Estado Cielo | SP  | 
|  `Country`                       | País Cielo | BR  | 

**Exemplo:** 

![Imagem16](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem16.png)

Serão gerados dois arquivos no caminho de diretório em que for executado o comando, um deles .csr e outr .key 

![Imagem17](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem17.png)

- O arquivo “.key” é de uso exclusivo do estabelecimento 
-	Já o arquivo “.csr” deve ser encaminhado para assinatura da Cielo, sendo utilizado o mesmo certificado nos ambientes de Sandbox e Produção.
 
O cliente deve enviar o arquivo .csr por e-mail para geração do certificado assinado. 

Envie o arquivo para: **api.cancelamento@cielo.com.br** e aguarde retorno do time Cielo com o certificado MTLS assinado. 

<aside class="notice"> Após concluir o processo de assinatura do certificado MTLS e obter seu Client_ID e Client_Secret, você estará habilitado a acessar nosso ambiente de homologação e produção. 🚀🚀</aside>

<aside class="warning">Todas as chamadas para nossas APIs (nos ambientes de homologação ou produção) devem ser enviadas com a chave MTLS assinada. </aside>

# Configurações para utilização da API 

## Adicionar certificado MTLS no Postman
 
Nesse tópico serão fornecidas informações sobre como anexar o certificado assinado pela Cielo na API Única de Cancelamentos. 

Na ferramenta do Postman, vá para o ícone de *“ferramentas” > Configurações > Certificados > Anexe o arquivo .crt assinado pela Cielo e o .key.*

**Observação:** Este passo deve ser feito tanto para o ambiente de produção quanto para o de homologação, mas você pode usar o mesmo certificado, apenas alterando o campo "Host".

Acesso aos endpoints da Cielo:

HML/Sandbox: https://apihml-internet.cielo.com.br/refunds-api/v1

PRD/External: https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1 

![nova_imagem_1](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/nova_imagem_1.png)

![Nova_imagem_2](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Nova_imagem_2.png)

# Fluxo de Autenticação de Credenciais do Cliente (Client Credencials flow)

## Obtenção do Token

Para realizar uma solicitação de cancelamento ou consulta na API, é necessário obter o token utilizando seu cliente_id e Cliente_secret

**Homologação**

```curl
curl --location --request POST
https://me.hdevelo.com.br/auth/realms/MulesoftHML/protocol/openid-connect/token\
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client\_id={ **clientId** }' \
--data-urlencode 'client\_secret={ **secret** }' \
--data-urlencode 'grant\_type=client\_credentials'
```

**Produção**

```curl
curl --location --request POST
https://me.cielo.com.br/auth/realms/MulesoftPRD/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client\_id={ **clientId** }' \
--data-urlencode 'client\_secret={ **secret** }' \
--data-urlencode 'grant\_type=client\_credentials'
```

**Exemplo no Postman:**

Header:

<aside class="notice">https://me.hdevelo.com.br/auth/realms/MulesoftHML/protocol/openid-connect/token</aside>

**Body:** 

![Nova_imagem_3](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Nova_imagem_3.png)

(enviar o client_id e o client secret disponibilizado pela Cielo).

## Enviando uma requisição com token 

Extraia o campo access_token do retorno da requisição apresentada no passo anterior e passe como header em “Authorization” quando for realizar requisição.

Exemplo: header ("Authorization", "Bearer " + token)

<aside class="warning">Lembrete: O access_token precisa ser renovado a cada 5 minutos.</aside>

| AMBIENTE | ENDPOINT | 
| ------------------ | ------------------------------------------------------------------------------------| 
| **Homologação** | https://apihml-internet.cielo.com.br/refunds-api/v1/refunds/{refundID}/{merchantID} | 
| **Produção**    | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1/refunds/{refundID}/{merchantID} | 

![Nova_imagem_4](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Nova_imagem_4.png)

# Serviços disponíveis API Única de Cancelamento

| AMBIENTE | ENDPOINT | 
| ------------------ | ------------------------------------------------------------------------------------| 
| **Homologação** | https://apihml-internet.cielo.com.br/refunds-api/v1 | 
| **Produção**    | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1 | 

| DESCRIÇÃO | PATH | MÉTODO HTTP | 
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------------| 
| **Solicitação de Cancelamento (Unitária)** | /v1/refunds | POST | 
| **Solicitação de Cancelamento (Lote)** | /v1/refunds | POST | 
| **Consulta de Cancelamento (Unitária)** |  /v1/refunds/{refundID}/{merchantID} | GET | 
| **Consulta de Cancelamento (Lista)** | /v1/refunds?cancelStartDate={Data inicial}&cancelEndDate={Data final}&rows={linha}&page={pagina}&merchantId={merchantID}&authorizationCode={código de autorização} | GET | 
| **Geração de Carta de Cancelamento (Unitária)** | /v1/refunds/v1/letter-api/pdf | POST |
| **Geração de Carta de Cancelamento (Lote)** | /v1/refunds/v1/letter-api/zip | POST |

# Solicitação de Cancelamento 

Com esse serviço, é possível realizar solicitações de cancelamento individuais ou em lote através de dados da venda como número do EC, data da venda, código de autorização, valor da venda, entre outros.

| AMBIENTE | ENDPOINT | 
| ------------------ | ------------------------------------------------------------------------------------| 
| **Homologação** | https://apihml-internet.cielo.com.br/refunds-api/v1/refunds/  | 
| **Produção**    | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1/refunds/ | 

**Headers:**

No campo “key” digite: Authorization e no campo “value” digite: Bearer + espaço + {access_token}

Em seguida no campo “key digite: Content-Type e no campo “value” digite: application/json.

![Imagem25](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem25.png)

**Corpo da Requisição (Body):** 

Enviando uma solicitação de cancelamento.

![Imagem26](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem26.png)

```json
transactionID = identificador de transação E-commerce.
Nsu = Número sequencial único
cardNumberLast4Digits = os 4 últimos dígitos do cartão
merchantID* = número do EC (estabelecimento comercial)
authorizationCode* = Código de autorização da venda
refundAmount: {
        currency*= tipo de moeda para cancelamento utilizar somente BRL
        value*= Valor para cancelar, pode ser o valor parcial ou total.
      }
saleAmount: {
        currency*= tipo de moeda para cancelamento utilizar somente BRL. 
        value*= valor da venda 
      }
transactionDate* = passar no formato DD-MM-YYYY HH24:MI:SS data da venda (Não é necessário passar a hora exata da venda)
```

**Campos obrigatórios*

**Response da requisição de cancelamento**

![Imagem27](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem27.png)

```json
  "merchantID": número do EC (estabelecimento comercial)
      "authorizationCode": Código de autorização da venda
      "refundAmount": {
        "currency":  tipo de moeda para cancelamento utilizar somente BRL.
        "value": Valor para cancelar, pode ser o valor parcial ou total
      },
      "saleAmount": {
        "currency":  tipo de moeda para cancelamento utilizar somente BRL.
        "value": Valor da venda
      },
      "transactionDate": formato DD-MM-YYYY HH24:MI:SS data da venda
      "controlID": identificador do cancelamento
      "status": {
        "type": Status da solicitação 
      }
    }
  ],
  "refundID": Identificador do lote de cancelamento
  "refundDate": Data da solicitação do cancelamento, formato exemplo: 2019-12-27T19:38:30.547Z
```

# Consultar Cancelamento 

Neste serviço, é possível consultar solicitações de cancelamento e visualizar status de cada requisição através de diversos parâmetros como lote de cancelamento, ID de cancelamento, data ou status.

**Headers**: **(*mesmos headers utilizados na requisição de cancelamento)**

No campo **“key”** digite: **Authorization** e no campo **“value”** digite: **Bearer + espaço + {access_token}** <br/>
Em seguida no campo **“key** digite: Content-Type e no campo **“value”** digite: **application/json.**

| AMBIENTE | MÉTODO |  ENDPOINT | 
| ------------------ | ------------- | ------------------------------------------------------------------------------------| 
| **Homologação** | GET | https://apihml-internet.cielo.com.br/refunds-api/v1/refunds/{refundID}/{merchantID}?limit={limit} &offset={offset}   | 
| **Produção**    | GET | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1/ refunds/{refundID}/{merchantID}?limit={limit} &offset={offset}  | 

**Exemplo de requisição em homologação:**

https://apihml-internet.cielo.com.br/refunds-api/v1/refunds/140426/2005157770

**Request:**

```json
/{refundID}/{merchantID}?limit={limit} &offset={offset} 
refundID = identificador devolvido no response da solicitação de cancelamento. 
merchantID = número do EC (estabelecimento comercial) 
limit = quantidade de solicitações dentro do json 
offset = paginação 
```

**Response:**

```json
{ 
    "refundID": 140426, 
    "refundDate": "2024-10-09T15:31:19.000-0300", 
    "transactions": [ 
        { 
            "transactionID": "20051577703PPIQIJ7FB", 
            "nsu": 515027, 
            "cardNumberLast4Digits": "0034", 
            "merchantID": 2005157770, 
            "authorizationCode": "546441", 
            "refundAmount": { 
                "currency": "BRL", 
                "value": 0.01 
            }, 
            "saleAmount": { 
                "currency": "BRL", 
                "value": 70000.0 
            }, 
            "transactionDate": "2024-07-03T18:13:40.000-0300", 
            "controlID": 26032304382552, 
            "status": { 
                "type": "done", 
                "detail": { 
                    "code": 0, 
                    "message": "Cancelamento aprovado com sucesso." 
                } 
            } 
        } 
    ] 
} 
```

**Descrição dos campos:**

```json
{
"refundID": Identificador do lote de cancelamento
"refundDate": Data da solicitação do cancelamento, formato exemplo: 2019-12-27T19:38:30.547Z
 "transactions": [
        {
transactionID = identificador de transação E-commerce.
Nsu = Número sequencial único.
cardNumberLast4Digits = os 4 últimos dígitos do cartão.
merchantID = número do EC (estabelecimento comercial).
authorizationCode = Código de autorização da venda.
refundAmount: {
        currency = tipo de moeda para cancelamento utilizar somente BRL.
        value = Valor para cancelar, pode ser o valor parcial ou total.
      }
saleAmount: {
        currency = tipo de moeda para cancelamento utilizar somente BRL.
        value = Valor da venda.
      }
transactionDate = no formato DD-MM-YYYY HH24:MI:SS data da venda. "controlID": identificador do cancelamento
      "status": {
        "type": Status da solicitação 
      }


Caso o status seja rejected:
"detail": {
          "code" = Código da rejeição de cancelamento
          "message" = Motivo da rejeição de cancelamento
        }
```

O status pending e approved não tem detail no json.

**Os retornos do tipo rejeição:**

![Imagem28](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem28.png)

## Consultar Cancelamento por timeout na requisição

Essa consulta deve ser executada somente quando houver problemas na comunicação durante a solicitação de cancelamento. Deve ser realizada utilizando como base o código do Estabelecimento, um range de datas (sete dias) e um argumento de pesquisa como o código de autorização.

Essa pesquisa pode ser realizada também para localizar um cancelamento utilizando como base o código do Estabelecimento e um intervalo de datas (range de 7 dias), podendo ser combinado com mais argumentos de pesquisa como:

- Código de autorização (authorizationCode)
- NSU (nsu)
- Valor da Venda (saleAmount)
<br/>

| AMBIENTE | MÉTODO |  ENDPOINT | 
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| **Homologação** | GET | https://apihml-internet.cielo.com.br/refunds-api/v1/refunds?cancelStartDate={DD/MM/YYYY}&cancelEndDate={DD/MM/YYYY}&rows=25&page=1&merchantId={codigo_estabelecimento}&authorizationCode={codigo_autorizacao}  | 
| **Produção**    | GET | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1/refunds?cancelStartDate={DD/MM/YYYY}&cancelEndDate={DD/MM/YYYY}&rows=25&page=1&merchantId={codigo_estabelecimento}&authorizationCode={codigo_autorizacao}  |

**Exemplo Request:**

https://apihml-internet.cielo.com.br/refunds-api/v1/refunds?cancelStartDate=09-10-2024&cancelEndDate=10-10-2024&rows=25&page=1&merchantId=2005157770&authorizationCode=546441 

**Request/Response:**

![Nova_Imagem_5](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Nova_Imagem_5.png)

**Descrição dos campos**

```curl
?cancelStartDate= {Data inicial}&cancelEndDate={Data final}&rows={linha}&page={pagina}&merchantId={Estabelecimento}&authorizationCode={código de autorização}

cancelStartDate = Data inicial da solicitação de cancelamento (formato dd-MM-yyyy)
cancelEndDate = Data final da solicitação de cancelamento (formato dd-MM-yyyy)
rows = Quantidade de linhas
page = Paginação
merchantId = número do EC (estabelecimento comercial)
authorizationCode = Código de autorização da venda.
```

![descriçãocampos](../../../../images/cancelamento/imagem (1).png)


```json
{
"refundID": Identificador do lote de cancelamento
 "refundDate": Data da solicitação do cancelamento, formato exemplo: 2019-12-27T19:38:30.547Z
 "transactions": [
        {
"transactionID" = identificador de transação E-commerce.
"Nsu" = Número sequencial único.
"cardNumberLast4Digits" = os 4 últimos dígitos do cartão.
"merchantID" = número do EC (estabelecimento comercial).
"authorizationCode" = Código de autorização da venda.
"refundAmount": {
        "currency" = tipo de moeda para cancelamento utilizar somente BRL.
        "value" = valor para cancelar, pode ser o valor parcial ou total.
      }
"saleAmount": {
        "currency" = tipo de moeda para cancelamento utilizar somente BRL.
        "value" = Valor da venda.
      }
"transactionDate" = no formato DD-MM-YYYY HH24:MI:SS data da venda.
"controlID": identificador do cancelamento
      "status": {
        "type": Status da solicitação 
      }

Observações:
O status pending e approved não tem detail no json.

Caso o status seja rejected (Rejeição):
"detail": {
          "code" = Código da rejeição de cancelamento
          "message" = Motivo da rejeição de cancelamento
        }
```

# Fluxo de Cancelamento

## Efetivação de Cancelamento

A efetivação dos cancelamentos solicitados pela API é feita de forma assíncrona em processo batch com corte às 18h30 da tarde. O que significa que cancelamentos solicitados antes deste horário e que forem aprovados na validação de regras de negócio de cancelamento serão enviados para efetivação e terão seus status finais retornados na manhã do dia seguinte a partir das 8h (D1).

## Status, Códigos e Mensagens de Retorno

### Status

A API de Cancelamento possui 4 tipos de status de cancelamento retornados.

| TYPE STATUS | DESCRIÇÃO | 
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| ***Pending*** | Este status indica que a requisição foi recebida pelo sistema e está aguardando processamento. Neste caso, não há informação de retorno no campo details | 
| ***Rejected*** | Este status indica que a solicitação de cancelamento não foi aprovada nas validações de regras de negócio de cancelamento. Neste caso, no campo details teremos informações complementares no campo Code e Message.<br>"detail":{<br>"code" = Código da rejeição de cancelamento<br>"message" = Motivo da rejeição de cancelamento<br>}<br>|
| ***Done*** | Este Status indica que a solicitação teve sucesso na efetivação do Cancelamento e o cancelamento já foi liquidado. Neste caso, não há informação de retorno no campo details | 
| ***Failed*** | Este status indica alguma falha de comunicação entre sistemas.  Uma nova tentativa de cancelamento pode ser feita. |

### Códigos e Mensagens de Retorno

Nos cancelamentos com Status Rejected e Failed, temos informações de retorno no campo details. Os retornos possíveis são:

| COD | Descrição | 
| --------- | ---------------------------------------------------------------------------------------------------------------------- | 
| 5 | Erro de efetivação. | 
| 7 | Cancelamento não efetuado. Não foi possivel localizar a venda com a identificação do cancelamento enviada. | 
| 10 | Cancelamento não efetuado. Solicitação pendente com as mesmas informações. | 
| 17 | Saldo da transação insuficiente para cancelamento da venda. | 
| 51 | Cancelamento acima do valor origina da venda | 
| 54 | Cancelamento não efetuado entre em contato com a Central de Atendimento | 
| 56 | Saldo do Lojista Insuficiente para Cancelar | 
| 72 | Saldo na Agenda insuficiente para cancelamento da venda. Ligue para Central ou Seu Gestor | 
| 77 | Venda original não encontrada para cancelamento. | 
| 99 | Falha no processamento. Por favor tente novamente. | 
| 101 | Cancelamento não realizado, por estar acima do prazo permitido pela Bandeira| 
| 102 | Cancelamento solicitado acima do valor da transação original.| 
| 103 | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento.| 
| 104 | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento.| 
| 105 | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento.| 
| 106 | Restrição Cadastral. Cancelamento não permitido. Entre em contato com a Central de Cancelamento.| 
| 108 | Número do Estabelecimento (EC) não encontrado. Por favor verifique o número enviado.| 
| 109 | Produto Débito só permite cancelamento total.| 
| 115 | Requisição inválida.| 
| 120 | Produto da venda não permite cancelamento.| 
| 200 | Cancelamento não efetuado. Não foi possível localizar a venda com os dados enviados do cartão.| 
| 201 | Cancelamento não efetuado. Não foi possível localizar a venda com o NSU enviado.| 
| 203 | Cancelamento não efetuado. Não foi possível localizar a venda com a data enviada.| 
| 206 | Cancelamento não efetuado. Não foi possível localizar a venda com o valor da venda enviado.| 
| 209 | Cancelamento não efetuado. Não foi possível localizar a venda com o produto enviado.| 
| 214 | Cancelamento não efetuado. Não foi possível localizar a venda com o status enviado.| 
| 215 | Cancelamento não efetuado. Não foi possível localizar a venda com a bandeira enviada.| 
| 216 | Cancelamento não efetuado. Não foi possível localizar a venda com os dados enviados do cartão.| 
| 217 | Cancelamento não efetuado. Foi localizado mais de uma venda com os dados enviados.| 
| 218 | Cancelamento não efetuado. Usuário inválido.| 
| 219 | Cancelamento não efetuado. Sistema de liquidação inválido.| 
| 221 | Cancelamento não efetuado. Não foi possível localizar a venda com o valor do cancelamento enviado.| 
| 222 | Cancelamento não efetuado. Não foi possível identificar o canal solicitante.| 
| 223 | Cancelamento não efetuado. Solicitação pendente com as mesmas informações.| 
| 224 | Cancelamento não efetuado. Não foi possivel identificar o ramo de atividade enviado.| 
| 225 | Cancelamento não efetuado. Não foi possivel localizar a venda com o NSU da venda enviado.| 
| 476 | Cancelamento não realizado. Existe um cancelamento para esta venda em processamento.| 
| 477 | Cancelamento não efetivado.| 
| 800 | Operação não permitida. Envio Automático de carta permitido apenas para Cliente.| 
| 801 | Operação não permitida. Parametrização existente.| 
| 802 | Falha ao consultar dados cadastrais.| 
| 803 | Cliente não localizado nos dados cadastrais.| 
| 823 | Solicitação reprovada por decurso de prazo.| 

**Retorno do tipo Failed:**

Neste caso é só fazer uma nova requisição:

![Imagem30](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem30.png)

**Retorno do tipo Done:**

![Imagem31](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem31.png)

# Carta de Cancelamento

## Validações para geração

Só será possível gerar a carta de cancelamento quando o status type for igual a done. Ou seja, só será possível gerar a carta de cancelamento quando a solicitação estiver efetivada. 

É possível solicitar a geração e carta por unidade ou lote.

A geração de carta pode ser gerada no idioma português ou inglês.

Não é possível gerar cartas em lote mesclados nos idiomas português e inglês.

Nas requisições de carta por lote, o limite é de 10 cartas por requisição.

Não é possível gerar um lote de cartas para ECs diferentes, na mesma requisição.

## Solicitação de Carta por unidade 

| AMBIENTE | MÉTODO |  ENDPOINT | 
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| **Homologação** | POST | https://apihml-internet.cielo.com.br/refunds-api/v1/letter-api/pdf  | 
| **Produção**    | POST | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1/letter-api/pdf  |

```json
{
  "merchantId": 0,
  "cancellationId": 0,
  "language": "PT_BR"
}
```

No campo **merchantId** é necessário informar o número do estabelecimento (EC), do tipo number, este campo é obrigatório.

O Campo **cancellationId** é necessário informar o controlId, do tipo number, este campo é obrigatório.

O campo **language** é opcional, mantendo como default o idioma português, podendo também usar como o PT_BR para português ou EN_US para inglês.


**Response em caso de erro:**

```json
{
  "errorCode": 999,
  "errorMessage": "You don't have sufficient credentials to perform this operation",
  "date": "2012-04-23T18:25:43.511Z"
}
```

## Solicitação de Carta por lote

| AMBIENTE | MÉTODO |  ENDPOINT | 
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| **Homologação** | POST | https://apihml-internet.cielo.com.br/refunds-api/v1/letter-api/zip | 
| **Produção**    | POST | https://api-internet.cielo.com.br/cielo-refunds-exp-external/refunds/v1/letter-api/zip  |

```json 
{
  "merchantId": 0,
  "cancellations": [
    0,1,2,3
  ],
  "language": "PT_BR"
}
```

No campo **merchantId** é necessário informar o número do estabelecimento (EC), do tipo number, este campo é obrigatório.

O Campo **cancellationId** é necessário informar uma lista de controlId, separado por virgula (“,”), do tipo number, este campo é obrigatório.

# Suporte Cielo

Caso tenha dúvidas, envie um e-mail para: **api.cancelamento@cielo.com.br**

# FAQ - Perguntas Frequentes

**O que fazer se o token expirar?**

Obtenha um novo token JWT repetindo o processo de autenticação descrito no passo [Fluxo de Autenticação de Credenciais do Cliente](https://developercielo.github.io/manual/api-refunds#fluxo-de-autentica%C3%A7%C3%A3o-de-credenciais-do-cliente-(client-credencials-flow)).

**Como testar sem impactar o ambiente de produção?**

Use a URL de homologação fornecida no passo [Acesso aos endpoints da Cielo](https://developercielo.github.io/manual/api-refunds#configura%C3%A7%C3%B5es-para-utiliza%C3%A7%C3%A3o-da-api).

**Posso reutilizar o mesmo token para múltiplas requisições?**

Sim, desde que ele ainda esteja válido (duração: 5 minutos). Caso expire, gere um novo token.

**Ao integrar na API de Cancelamento, ainda poderei solicitar cancelamento por outros Canais?**

Sim. A API é mais uma opção de canal para solicitar cancelamento de vendas. Os demais canais continuarão disponíveis para solicitação de cancelamento (POS, TEF, e-commerce, Central de Atendimento, Site/APP). 

Atente-se para envio de cancelamentos parciais por 2 canais diferentes. Havendo saldo disponível na transação, as duas solicitações podem ser efetivadas.

**É possível enviar cancelamentos parciais pela API de Cancelamento?**

Sim. É possível enviar um ou mais cancelamentos parciais de uma mesma transação pela API. As solicitações serão efetivadas respeitando o saldo disponível na transação e as regras de cancelamento de cada Bandeira.

Débito Mastercard só permite um cancelamento parcial por transação. Em caso de 2ª solicitação de cancelamento, ela será rejeitada por regra da bandeira.

**Qual o prazo de efetivação de cancelamento solicitado via API de Cancelamento?**

Cancelamentos solicitados no mesmo dia da venda terão o status final disponível a partir das 8h da manhã de D2.

Cancelamentos solicitados após a data da venda, caso solicitados até as 18h30 terão seu status final disponível a partir das 8h da manhã de D1.

**Qual a diferença entre API Única de Cancelamento e a API E-Commerce?**

API Única de Cancelamento e a API E-commerce são soluções diferentes com propósitos e integrações diferentes.

A API E-commerce é uma solução de captura que também permite solicitação de cancelamentos de vendas e-commerce. Só é permitido cancelar vendas e-commerce do EC integrado

A API Única de cancelamento é uma solução cujo objetivo é permitir clientes centralizarem cancelamentos de diversas soluções de captura oferecidas pelas Cielo (TEF, POS, E-commerce, LIO). A integração é por Raiz de CNPJ e é possível cancelar vendas de todos os ECs que compõem essa Raiz. 
