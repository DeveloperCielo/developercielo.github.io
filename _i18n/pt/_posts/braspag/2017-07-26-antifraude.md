---
layout: manual
title: Antifraude
description: Integração técnica antifraude
search: true
translated: true
categories: manual
tags:
  - Documentos Braspag
language_tabs:
  json: JSON
---

# Autenticação

Esta página descreve como se autenticar na plataforma Antifraude Gateway, para que seja possivel realizar Análises de transações.

A API do Antifraude Gateway utiliza o protocolo padrão de mercado OAuth 2.0 para autorização de acesso a seus recursos. 

Este documento descreve o fluxo necessário para que aplicações **cliente** obtenham tokens de acesso válidos para uso na plataforma. Caso deseje mais informações sobre o protocolo OAuth 2.0, consulte [https://oauth.net/2/](https://oauth.net/2/){:target="_blank"}.  

## Hosts

* **Test** https://authhomolog.braspag.com.br  
* **Live** https://auth.braspag.com.br

## Fluxo para obtenção do token de acesso  

* O token de acesso é obtido através do fluxo de autorização **Client Credentials**.

![Obtenção de Tokens de Acesso]({{ site.url }}/img/AntifraudeAuthentication.png){: .centerimg }{:title="Fluxo para obtenção do Token de Acesso "}

Fluxo de obtenção do Token de Acesso:

1. A *Aplicação Cliente*, informa à API do *OAuth Braspag* suas credenciais.  

2. O *OAuth Braspag* valida a credencial recebida. Se for válida, retorna o token de acesso para a *Aplicação Cliente*.  

Fluxo de Análise:

3. A *Aplicação Cliente* informa o token de acesso no cabeçalho da requisições HTTP de Análise de Fraude.   

4. Se o token de acesso for válido, a requisição é processada e a resposta de análise é retornada *Aplicação Cliente*.

## Exemplo de requisição HTTP  

### Cenário I: Obtenção de token de acesso  

* Para se autenticar com a API do Antifraude, é necessário que sejam previamente criadas as credenciais **user** e **password**, as quais deverão ser solicitadas à equipe de implantação da Braspag.

* Uma vez em posse dessas credenciais, será necessário "codificá-la" em  Base64, utilizando a convenção **user:password**.  
Exemplo:

    * User: **braspagtestes**
    * Password: **1q2w3e4r**
    * String a ser codificada em Base64: **braspagtestes:1q2w3e4r**
    * Resultado após a codificação: **YnJhc3BhZ3Rlc3RlczoxcTJ3M2U0cg==**

**REQUEST:**  

``` http
POST https://authhomolog.braspag.com.br/oauth2/token HTTP/1.1
Host: https://authhomolog.braspag.com.br
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {Resultado_Da_String_Codificada_Em_Base64}
Scope: AntifraudGatewayApp
Cache-Control: no-cache

grant_type=client_credentials
```

**RESPONSE:**  

``` http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```
``` json
{
  "access_token": "faSYkjfiod8ddJxFTU3vti_rQV9fGvMrBNn0ZIZDqrLadEPKTUjt6ZPJSnNHtvOoJ6KO6gakgeyXNmSxFYHx7Y_-OCf8zgzILTVzCN5G1WTBWOKZHt-RknkmQLOgA882pWhC1gtOIQoq2tFX6-1VhOqsSCrdI3cUa2HolbGkxZWZMTPOl4Jzuy6ejo_USCMBNPqzvinchS0M33Bi8PiWMYwdpAbvwAe_nhIKNGmsAG6s7PTgWc2RksG6DaX8exdjvlGE9CMADq5LeM4JJ-BguZoHAP3yDBVZpe_DzI3JOrAYv0yzToBllPIMmq6CY-V8GJmckWByOGooBKr6COkZ1R9NPg2bvruYEC3g8hzKloUG21CD5r_la-t-0FvGHHY-8L7cKGybLidIYtw5aWOUgO2Aq0YScEnj1byDAsY6ROMnnzLrywkqscsf5xJACJwBmmEggHRyTVMY1-oOzmH6B2GNtC621i2XQ-8U6KVx9qD0R4qdWRn__AFatL7miTthMfO_PO2HWdDX_xD0i0jqcw",
  "token_type": "bearer",
  "expires_in": 599
}
```

* Na resposta é importante ressaltar o campo **expires_in**, com o tempo de expiração to access_token em segundos. Quando o token expirar, é necessário consumir o serviço novamente para obter um novo token.

### Como obter uma credencial?  

> Solicite uma credencial abrindo um ticket através da nossa ferramenta de suporte, enviando o(s) IP(s) de saída dos seus servidores de homologação e produção.  
[Suporte Braspag](https://suporte.braspag.com.br/hc/pt-br)