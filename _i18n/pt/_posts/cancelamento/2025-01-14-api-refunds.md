---
layout: manual
title: API Refunds
description: API Única de Cancelamento e Cartas 
search: true
categories: manual
sort_order: 1
tags:
  - API Refunds
language_tabs:
  json: JSON
---
    
# Objetivo

O objetivo desta documentação é orientar sobre a integração com a API Única de Cancelamento de vendas Cielo, descrevendo funcionalidade, informações técnicas e etapas para solicitação de acesso.

# Sobre a API Única de Cancelamento

A API Única de Cancelamento é mais uma opção de canal de cancelamento de vendas disponibilizado pela Cielo aos clientes.

Com a API Única de cancelamento, é possível centralizar cancelamentos de vendas de diversas soluções de captura em uma única integração (POS, LIO, TEF e E-commerce) além de permitir consulta de cancelamentos e geração de Cartas de Cancelamentos efetivados.

A integração com a API exige credenciais de acesso que são concedidas por Raiz de CNPJ. Ou seja, todos os Estabelecimentos (ECs) que fazem parte dessa raiz podem ter cancelamentos de vendas solicitados usando uma mesma credencial de acesso em uma única integração.

Principais benefícios da solução da API de Cancelamento
- **Solicitação de cancelamento direta** para o Sistema de Cancelamento Cielo.  
- **Consulta de Status de Cancelamento** com descrição complementar de motivo em caso de rejeição de cancelamento.  
- **Centralização de solicitações de cancelamento** de vendas feitas por variadas soluções de captura usadas pelo cliente (POS, TEF, LIO, E-commerce).  
- **Geração de Carta de Cancelamento** no mesmo dia da efetivação do cancelamento, de forma unitária ou em lote.  
- **Autonomia e autosserviço** no processo de solicitação de cancelamento de vendas.  
- **Simplicidade**: o protocolo utilizado é puramente HTTPS, tecnologia REST, que é padrão de mercado.  
- **Facilidade de testes**: disponibilizamos credenciais de ambiente de homologação e massa de vendas para teste em ambiente de homologação.

# Produtos e Bandeiras suportadas

A versão atual da API Cancelamento Cielo possui **suporte de cancelamento** a **todos os produtos e bandeiras** capturados pela Cielo com **exceção de PIX**, transações de **Voucher** e Pré-autorização.

# Fluxo para acesso API de Cancelamento

O fluxo abaixo mostra  a integração do cliente na API Única de Cancelamento desde o recebimento das credenciais de Homologação produção até o acesso à API em Produção

![Imagem1](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/cancelamento/Imagem1.jpg)

# Solicitação de Credenciais para Produção (client_id e client_secret)

Para obter acesso à API de Cancelamento em Produção, envie os dados abaixo para: **api.cancelamento@cielo.com.br**  

- **Nome**: nome do ponto focal do estabelecimento que fará o gerenciamento das credenciais para acessar a API de Cancelamento.  
- **E-mail**: e-mail do ponto focal do estabelecimento que fará o gerenciamento das credenciais para acessar a API de Cancelamento.  
- **Raiz de CNPJ**: raiz do CNPJ que deseja integrar na API. Caso tenha mais de uma raiz de CNPJ a ser integrada, envie todas.  

> **Nota**: Todos os estabelecimentos que compõem essa raiz de CNPJ poderão ter os cancelamentos de vendas solicitados pela API Única de Cancelamento.

Com esses dados, nosso time Cielo vai solicitar criação de credenciais de acesso para integração em Produção.

Mesmo que a integração do Estabelecimento com a API seja feita através de um terceiro, o e-mail que deve ser enviado deve ser do ponto focal do estabelecimento.

# Cadastro no Portal de Desenvolvedores Cielo 

Após a aprovação da solicitação, um e-mail será enviado ao ponto focal estabelecimento solicitante. 

Acesse o Portal de Desenvolvedores Cielo  https://desenvolvedores.cielo.com.br/api-portal/ e realize seu cadastro.

> **Importante:** O cadastro deve ser realizado com o mesmo e-mail do ponto focal do Estabelecimento enviado no passo 1.

![Imagem2](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/cancelamento/Imagem2.png)

Preencha o e-mail de quem fará o gerenciamento das credenciais para acessar a API de cancelamento e demais dados do Estabelecimento.

![Imagem3](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem3.png)

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

O aplicativo de autenticação de dois fatores será usado durante esta configuração e para gerar códigos durante a autenticação regular. Se o aplicativo for compatível, realize a leitura do código QR Code para obter o código de configuração, caso contrário você poderá inserir manualmente o código de texto.

Link para instalação do app: https://www.microsoft.com/pt-br/security/mobile-authenticator-app

Forneça a senha atual e confirme.

![Imagem9](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem9.png)

O aplicativo de autenticação de dois fatores será usado durante esta configuração e para gerar códigos durante a autenticação regular. Se o aplicativo for compatível, realize a leitura do código QR Code para obter o código de configuração, caso contrário você poderá inserir manualmente o código de texto.

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

Gere o arquivo da chave pública no formato .csr executando o comando abaixo em um terminal como gitbash ou via ferramenta openssl. 

Exemplo:

> openssl req -new -newkey rsa:2048 -nodes -keyout **NomeEmpresa**_Cielo.key -out **NomeEmpresa**_Cielo.csr

Ao executar este comando, preencha as informações solicitadas conforme exemplo abaixo e substituindo os dados sinalizadas na cor **azul em negrito** com o nome da sua empresa:

| Campo                              | Descrição           | Valor  |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------- |
|  `emailAddress`                  | E-mail da área de produtos Cielo responsável pela API | api.cancelamento@cielo.com.br  | 
|   `Common Name`                  | Nome da empresa que está integrando na API Única de Cancelamento | **Informe nome da sua empresa**  | 
|  `Organizational Unit`           | Nome da área de produtos Cielo responsável pela API “squad-cancelamento”  | squad-cancelamento  | 
|  `Organization Name`             | Empresa que está fornecendo a solução API Única de Cancelamento  | Cielo S.A.  | 
|  `Locality`                      | Cidade Cielo | Barueri  | 
|  `State`                         | Estado Cielo | SP  | 
|  `Country`                       | País Cielo | BR  | 

**Exemplo:** 

![Imagem16](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem16.png)

Serão gerados dois arquivos no caminho de diretório em que for executado o comando, um deles .csr e outr .key 
- O arquivo “.key” é de uso exclusivo do estabelecimento 

![Imagem17](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem17.png)

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

Homologação: 	https://apihml-corp.cielo.com.br/cielo-refunds-exp-hml/refunds/v1/refunds
Produção: 	  https://api-corp.cielo.com.br/cielo-refunds-exp/refunds/v1/refunds

![Imagem18](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem18.png)

![Imagem19](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem19.png)

# Fluxo de Autenticação de Credenciais do Cliente (Client Credencials flow)

## Obtenção do Token

Para realizar uma solicitação de cancelamento ou consulta na API, é necessário obter o token utilizando seu cliente_id e Cliente_secret

**Homologação**

> curl --location --request POST
> https://apihml-corp.cielo.com.br/cielo-security-sys-hml/oauth/v2/MulesoftHML/protocol/openid-connect/token\
>
>
> --header 'Content-Type: application/x-www-form-urlencoded' \
> --data-urlencode 'client\_id={ **clientId** }' \
> --data-urlencode 'client\_secret={ **secret** }' \
> --data-urlencode 'grant\_type=client\_credentials'


**Produção**

> curl --location --request POST
> https://api-corp.cielo.com.br/cielo-security-sys-web/oauth/v2/MulesoftPRD/protocol/openid-connect/token' \
> 
> 
> --header 'Content-Type: application/x-www-form-urlencoded' \
> --data-urlencode 'client\_id={ **clientId** }' \
> --data-urlencode 'client\_secret={ **secret** }' \
> --data-urlencode 'grant\_type=client\_credentials'


**Exemplo no Postman:**

Header:

<aside class="notice">https://apihml-corp.cielo.com.br/cielo-security-sys-hml/oauth/v2/MulesoftHML/protocol/openid-connect/token</aside>

Body: 

(enviar o client_id e o client secret disponibilizado pela Cielo)

![Imagem20](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem20.png)

![Imagem21](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem21.png)

## Enviando uma requisição com token 

Extraia o campo access_token do retorno da requisição apresentada no passo anterior e passe como header em “Authorization” quando for realizar requisição.

Exemplo: header ("Authorization", "Bearer " + token)

<aside class="warning">Lembrete: O access_token precisa ser renovado a cada 5 minutos.</aside>

| AMBIENTE | ENDPOINT | 
| ------------------ | ------------------------------------------------------------------------------------| 
| **Homologação** | https://apihml-corp.cielo.com.br/cielo-refunds-exp-hml/refunds/v1/refunds | 
| **Produção**    | https://api-corp.cielo.com.br/cielo-refunds-exp/refunds/v1/refunds | 

![Imagem22](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem22.png)

![Imagem23](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem23.png)

![Imagem24](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Imagem24.png)

# Serviços disponíveis API Única de Cancelamento

| AMBIENTE | ENDPOINT | 
| ------------------ | ------------------------------------------------------------------------------------| 
| **Homologação** | https://apihml-corp.cielo.com.br/cielo-refunds-exp-hml/refunds/v1/refunds | 
| **Produção**    | https://api-corp.cielo.com.br/cielo-refunds-exp/refunds/v1/refunds | 

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
| **Homologação** | https://apihml-corp.cielo.com.br/cielo-refunds-exp-hml/refunds/v1/refunds | 
| **Produção**    | https://api-corp.cielo.com.br/cielo-refunds-exp/refunds/v1/refunds | 

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





























