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

# Introdução

## Objetivo

Esse manual foi feito para garantir uma **melhor**** integração **a você, cliente Cielo, na _** API **_** de **_** Chargeback**_.

Através dela, você pode **aceitar** ou **recusar** contestações, além de consultar contestações pendentes e tratadas, ciclo de vida e todas as informações importantes no processo de _contestação_.

# Integração na API

## Fluxo para integração com API de Chargeback

![](RackMultipart20240105-1-lmnp52_html_82aa0a14a7ff9ea4.png)

## Integração com API de Chargeback

1. Enviar para caixa **Technical Support Chargeback** ([techsupportchargeback@cielo.com.br](mailto:techsupportchargeback@cielo.com.br)) o número do estabelecimento matriz (EC que representa a raiz de CNPJ) da companhia.
  1. Obs. 1: Todos os estabelecimentos para a API de Chargeback estarão abaixo desse estabelecimento, isso não afeta nenhum outro fluxo da Cielo.
  2. Obs. 2: Caso você tenha mais de uma raiz de CNPJ, enviar todas elas.

1. Efetuar o pré-cadastro no Portal de Desenvolvedores.
  1. Link para acesso ao Portal dos Desenvolvedores: [cielomulesoft.my.site.com/desenvolvedores/s/login/](https://cielomulesoft.my.site.com/desenvolvedores/s/login/)
    - Deve ser criado apenas um único login por cliente.
  2. Clicar em "Sign Up" e cadastrar Nome, Sobrenome e E-mail.
  3. Após esse cadastro, enviar um e-mail para a caixa de **Technical Support Chargeback** informando os dados cadastrados.
    - Obs.: esse cadastro é necessário para obter acesso ao Client\_ID e Client\_Secret dos ambientes de Sandbox e Produção.

![Shape1](RackMultipart20240105-1-lmnp52_html_d99122eda5182bab.gif) ![](RackMultipart20240105-1-lmnp52_html_71b1003f3da457aa.png)

![](RackMultipart20240105-1-lmnp52_html_2781ad1d84a11497.png)

1. Criação de uma chave pública e privada para criptografia
  1. É necessário gerar o arquivo da chave pública no formato **.csr**.
    - **Dica** : as chaves podem ser geradas via ferramenta openssl.
    - **Exemplo** : openssl req -out nome\_chave\_publica.csr -new -newkey rsa:2048 -nodes - keyout chave\_privada.key
    - Gerar o.csr da chave pública conforme padrão abaixo:

1. **emailAddress** \<informar o mesmo e-mail cadastrado no Portal dos Desenvolvedores\>

2. **Common Name (CN)** \<nome da empresa\>

3. **Organizational Unit (OU)** \<deve ser cadastrado como "Cielo – chargeback"\>

4. **Organization (O)** \<nome da empresa\>

5. **Locality (L)** \<cidade\>

6. **State (ST)** \<estado\>

7. **Country (C)** \<BR\>

- Exemplo de preenchimento:

emailAddress: [**adm@cliente1.com.br**](mailto:adm@cliente1.com.br)

Common Name (CN): **Cliente 1**

Organizational Unit (OU): **Cielo – chargeback**

Organization (O): **Cliente 1**

Locality (L): **Campinas**

State (ST): **Sao Paulo**

Country (C): **BR**

  1. Compactar o arquivo .csr contendo a chave pública em um o arquivo .zip e enviar para a caixa de **Technical Support Chargeback** para realizar assinatura.
  2. Aguardar retorno do time Cielo com o certificado MTLS assinado.

![Shape2](RackMultipart20240105-1-lmnp52_html_f9ddc71b7b6144cc.gif) **Toda chamada para nosso serviço deve ser passada com a chave MLTS assinada.**

1. Acessar o Portal dos Desenvolvedores e efetuar o cadastro definitivo.
  1. Após o cadastro definitivo, fazer o login no Portal dos Desenvolvedores e coletar as chaves disponíveis do ambiente desejado.
  2. Link para acesso ao Portal dos Desenvolvedores: [cielomulesoft.my.site.com/desenvolvedores/s/login/](https://cielomulesoft.my.site.com/desenvolvedores/s/login/)
  3. _ **Obs.: Para realizar o login, é necessário autenticação do MFA.** _

**Ao finalizar esse processo, você está liberado para acessar o Sandbox da API de Chargeback e iniciar os testes conosco****!**

1. Liberação de acesso para os endpoints da Cielo:
  1. Sandbox: apihml-internet.cielo.com.br/cielo-chargeback-sys-sandbox/
  2. Produção: api-internet.cielo.com.br/cielo-chargeback-sys-external/

# Instruções para uso do Sandbox

Para utilizar o sandbox, passe os cenários abaixo para simular retornos de sucesso (código iniciando com 1) ou erro (código iniciando com 9).

_Obs.: Caso sejam informados dados diferentes do cenário abaixo, os serviços irão retornar sucesso na requisição._

| Código | Nome do serviço | Número do estabelecimento | IdCase | IdChargeback |
| --- | --- | --- | --- | --- |
| 103 | Consulta de contestação pendentes e tratadas | 2222222222 | 4000000 | 40000 |
| 901 | 1111111111 | 3000000 | 30000 |
| 101 | Acate de contestação | 2222222222 |
 | 40000 |
| 901 | 1111111111 |
 | 30000 |
| 102 | Recusa de contestação | 2222222222 |
 | 20000 |
| 901 | 1111111111 |
 | 10000 |
| 104 | Consulta de documento | 2222222222 |
 | 20000 |
| 901 | 1111111111 |
 | 10000 |
| 901 | Pesquisa do ciclo de vida | 1111111111 | 3000000 | 30000 |

Proposta de validação para prosseguirmos com a integração em Produção:

- Validar sucesso (código 103) no serviço de Consulta de contestação pendente
- Validar falha (código 901) no serviço de Consulta de contestação pendente
- Validar sucesso (código 103) no serviço de Consulta de contestação tratada
- Validar falha (código 901) no serviço de Consulta de contestação tratada
- Validar sucesso (código 101) no serviço de Acate de contestação
- Validar falha (código 901) no serviço de Acate de contestação
- Validar sucesso (código 102) no serviço de Recusa de contestação
- Validar falha (código 901) no serviço de Recusa de contestação
- Validar sucesso (código 104) no serviço de Consulta de documento
- Validar falha (código 901) no serviço de Consulta de documento
- Validar falha (código 901) no serviço de Pesquisa do ciclo de vida

# Utilização

## Obtenção do Token

Para fazer a chamada, é preciso obter um token utilizando seu client\_id e client\_secret. Confira um exemplo de requisição:

Sandbox:

![Shape3](RackMultipart20240105-1-lmnp52_html_ccae19c47e75701.gif)

curl --location --request POST

https://apihml-internet.cielo.com.br/cielo-security-sys-web-hml/oauth/v2/MulesoftHML/protocol/openid-connect/token' \

--header 'Content-Type: application/x-www-form-urlencoded' \

--data-urlencode 'client\_id={ **clientId** }' \

--data-urlencode 'client\_secret={ **secret** }' \

--data-urlencode 'grant\_type=client\_credentials'

Produção:

![Shape4](RackMultipart20240105-1-lmnp52_html_e06225160f369d0.gif)

curl --location --request POST

https://api-internet.cielo.com.br/cielo-security-sys-web/oauth/v2/MulesoftPRD/protocol/openid-connect/token' \

--header 'Content-Type: application/x-www-form-urlencoded' \

--data-urlencode 'client\_id={ **clientId** }' \

--data-urlencode 'client\_secret={ **secret** }' \

--data-urlencode 'grant\_type=client\_credentials'

Extraia o campo access\_token do retorno da requisição e passe como header em Authorization:

| **KEY** | **VALUE** |
| --- | --- |
| Authorization | Bearer {access­\_token} |

# Serviços da API

## Fluxo de tratamento de contestações pendentes

Com a API de Chargeback, você consegue tratar suas contestações a partir de dois serviços: o de aceite e o de recusa. Veja como o fluxo funciona:

![](RackMultipart20240105-1-lmnp52_html_9e0d05899f85cc43.png)

## Fluxo de tratamento de contestações tratadas

Depois da tratativa, você pode acompanhar todo o processo consultando o ciclo de vida da disputa. E caso tenha recusado a contestação, você também pode consultar o documento de defesa anexado. Além disso, é possível realizar chamadas obtendo o código e descrição das razões e suas respectivas classificações.

## Lista dos serviços disponíveis

| Descrição | Path | Método HTTP |
| --- | --- | --- |
| Consulta de contestação pendentes e tratadas | v1/chargeback/{status} | POST |
| Pesquisa do ciclo de vida | /v1/chargeback/lifecycle/{idCase} | GET |
| Aceite de contestação | /v1/chargeback/accept | PUT |
| Recusa de contestação | /v1/chargeback/refuse | PUT |
| Pesquisa da razão | /v1/chargeback/Reason/{idBandeira} | GET |
| Consulta de documento | /v1/chargeback/DocumentSupport/ | GET |
| Lista de documentos do emissor | /v1/chargeback/ListIssuerDocuments/{establishmentNumber}/{idChargeback} | GET |
| Download do documento do emissor | /v1/chargeback/DocumentIssuer/{establishmentNumber}/{idDocumento} | GET |

# Detalhamento dos serviços

## Consulta de contestações pendentes ou tratadas

Com esse serviço, você consegue filtrar contestações para visualizar ou tratar por diversos parâmetros, como período, número do EC, entre outros.

![Shape5](RackMultipart20240105-1-lmnp52_html_aedcbf410149d98e.gif)

{ **endpoint** }/v1/chargeback/{status}?page={page}&pageSize={pageSize}

Endpoint da Requisição:

Parâmetros e Path Variables:

| Nome | Descrição | Tipo |
| --- | --- | --- |
| Status | Indica o status desejado, conforme domínios da tabela status | Variável |
| Page | Número da página desejada, considerando que **0** é a primeira | Parâmetro de query |
| pageSize | Tamanho de registros que retornam na página, considerando que o limite é **200** | Parâmetro de query |
| orderBy | Campo de ordenação da pesquisa | receptionDate ou treatmentDeadline |
| Order | Forma de ordenação da pesquisa | asc ou desc |

Corpo da requisição:

| {"startNotificationPeriod": "2022-01-01","endNotificationPeriod": "2022-01-01","cardAssociationCode": null,"process":null,"reason": null,"establishmentNumber": ["2012457511"], "mainCustomer": "", "hierarchyType": 4,"idCase": null,"tid": null,"nsu": null,} |
| --- |

| Campo | Descrição | Conteúdo |
| --- | --- | --- |
| startNotificationPeriod\* | Data inicial da notificação | Texto, formato yyyy-MM-dd |
| endNotificationPeriod\* | Data final da notificação | Texto, formato yyyy-MM-dd |
| cardAssociationCode | Bandeira do cartão | Texto, somente numérico |
| process | Tipo de processo | Lista, texto |
| reason | Id da Razão (ver serviço de consulta da razão) | Lista, texto |
| establishmentNumber\* | Número do Estabelecimento Comercial | Lista, numérico |
| mainCustomer | Número do Estabelecimento Matriz | Lista, numérico |
| hierarchyType | Tipo de hierarquia | Numérico |
| idCase | Id do case do chargeback | Numérico |
| tid | Número TID | Numérico |
| nsu | Número serial único | Texto |

_\*Obrigatório para status DONE._

Domínios

Status

| Código | Descrição |
| --- | --- |
| DONE | Tratada |
| PENDING | Pendente |

CardAssociationCode

| Código | Nome da bandeira |
| --- | --- |
| 1 | Visa |
| 2 | Mastercard |
| 3 | American Express |
| 7 | Elo |
| 40 | Hipercard |

Processo

| Código | Descrição |
| --- | --- |
| 1 | 1º Chargeback |
| 2 | Cobrança amigável |
| 3 | 2º Chargeback |
| 13 | Pré compliance |
| 15 | Arbitragem |
| 16 | Compliance |

Tipo de hierarquia

| Código | Descrição |
| --- | --- |
| 1 | Raiz de CNPJ |
| 2 | Matriz de pagamento |
| 4 | Todos os tipos de hierarquia (fortemente recomendável para clientes integrados na API) |

Retorno da requisição (pendentes e tratadas respectivamente):

| ![](RackMultipart20240105-1-lmnp52_html_36129ce0a2850ee8.gif) ![](RackMultipart20240105-1-lmnp52_html_1e32d4f0af7ca320.gif) |
| --- |

Status de retorno:

| Status | Descrição |
| --- | --- |
| 200 | Ok |
| 400 | Requisição inválida |
| 403 | Sem permissão |
| 412 | Pré-condições inválidas |
| 500 | Erro interno |

## Pesquisa de ciclo de vida

Esse serviço permite consultar o ciclo de vida de uma contestação tratada, isto é, as ações ocorridas na contestação após a tratativa.

Endpoint da Requisição:

![Shape6](RackMultipart20240105-1-lmnp52_html_800872675fd5e863.gif)

{ **endpoint** }/v1/chargeback/lifecycle/{idCase}

Parâmetros e Path Variables:

| ![](RackMultipart20240105-1-lmnp52_html_e7ca2b9ed231f9bc.gif) |
| --- |

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_b8cee4c83c8d2ed2.gif) |
| --- |

Status de retorno:

| Status | Descrição |
| --- | --- |
| 200 | Ok |
| 400 | Requisição inválida |
| 403 | Sem permissão |
| 412 | Pré-condições inválidas |
| 500 | Erro interno |

- **Status Ciclo de Vida**
  - Intermediários:
    - Em análise com o Cliente
    - Em análise com o Emissor
    - Em análise com a Cielo
  - Finais:
    - A favor do Estabelecimento
    - A favor do Emissor

## Aceite de contestação

Serviço de realização do aceite de uma contestação, considerando a venda como inválida e concordando com o estorno pela credenciadora, a Cielo.

Endpoint da Requisição:

![Shape7](RackMultipart20240105-1-lmnp52_html_4de7ed450183a407.gif)

{ **endpoint** }/v1/chargeback/accept

Parâmetros e Path Variables:

| ![](RackMultipart20240105-1-lmnp52_html_f191bc1f8f0c45e7.gif) |
| --- |

_\*Todos os campos são obrigatórios._

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_6fbec1e9d046086c.gif) |
| --- |

Status de retorno:

| Status | Descrição |
| --- | --- |
| 200 | Ok |
| 400 | Requisição inválida |
| 403 | Sem permissão |
| 412 | Pré-condições inválidas |
| 500 | Erro interno |

## Recusa de contestação

Com esse serviço, você pode se defender de uma contestação apresentando uma evidência na forma de imagem ou documento, além de um breve texto justificando a posição.

Endpoint da Requisição:

![Shape8](RackMultipart20240105-1-lmnp52_html_800872675fd5e863.gif)

{ **endpoint** }/v1/chargeback/refuse

Parâmetros e Path Variables:

| ![](RackMultipart20240105-1-lmnp52_html_673a3e76ece5d9ad.gif) |
| --- |

\*_Todos os campos são obrigatórios._

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_6240ecc334eca282.gif) |
| --- |

Status de retorno:

| Status | Descrição |
| --- | --- |
| 200 | Ok |
| 400 | Requisição inválida |
| 403 | Sem permissão |
| 412 | Pré-condições inválidas |
| 500 | Erro interno |

## Pesquisa de razão

Serviço que provê a lista de todas as razões, por cada bandeira, para ser utilizada no filtro do serviço " **Consulta de contestação pendentes e tratadas"**.

Endpoint da Requisição:

![Shape9](RackMultipart20240105-1-lmnp52_html_b3706b3a71948116.gif)

{ **endpoint** }/api/v1/chargeback/Reason/{idBandeira}

Parâmetros e Path Variables:

| Nome | Descrição | Tipo |
| --- | --- | --- |
| idBandeira | Indica a bandeira desejada, conforme tabela abaixo | Variável |

| Código | Nome |
| --- | --- |
| 1 | Visa |
| 2 | Mastercard |
| 3 | Amex |
| 7 | Elo |
| 40 | Hipercard |

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_ca215cfbe1e9f24e.gif) |
| --- |

## Consulta de documento

No caso de recusa da contestação, esse serviço retorna o documento de defesa anexado para consulta.

![Shape10](RackMultipart20240105-1-lmnp52_html_8bc871ec7b6d2f5e.gif)

{ **endpoint** }v1/chargeback/DocumentSupport/{establishmentNumber}/{idChargeback}

Endpoint da Requisição:

Parâmetros e Path Variables:

| Nome | Descrição | Tipo |
| --- | --- | --- |
| establishmentNumber\* | Número do estabelecimento comercial | Variável |
| idChargeback\* | Id do chargeback | Variável |

\*_Todos os campos são obrigatórios._

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_4294c5acdd2dd198.gif) |
| --- |

## Lista de documentos do emissor

Esse serviço retorna os nomes e os códigos dos documentos enviados pelo emissor para apoio na tratativa de contestação.

_Obs.: É necessário primeiro listar o documento, para após isso, realizar o download._

![Shape11](RackMultipart20240105-1-lmnp52_html_8bc871ec7b6d2f5e.gif)

{ **endpoint** }/api/v1/chargeback/ListIssuerDocuments/{establishmentNumber}/{idChargeback}

Endpoint da Requisição:

Parâmetros e Path Variables:

| Nome | Descrição | Tipo |
| --- | --- | --- |
| establishmentNumber\* | Número do estabelecimento comercial | Variável |
| idChargeback\* | Id do chargeback | Variável |

\*_Todos os campos são obrigatórios._

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_6c95ca40585a06a1.gif) |
| --- |

## Download de documentos do emissor

Este serviço disponibiliza o documento enviado pelo emissor para download.

![Shape12](RackMultipart20240105-1-lmnp52_html_8bc871ec7b6d2f5e.gif)

{ **endpoint** }/api/v1/chargeback/DocumentIssuer/{establishmentNumber}/{idDocumento}

Endpoint da Requisição:

Parâmetros e Path Variables:

| Nome | Descrição | Tipo |
| --- | --- | --- |
| establishmentNumber\* | Número do estabelecimento comercial | Variável |
| idDocumento\* | Número do documento obtido através do serviço "Lista de documentos do emissor" | Variável |

\*_Todos os campos são obrigatórios._

Retorno da requisição:

| ![](RackMultipart20240105-1-lmnp52_html_1a0ba8debff29d8a.gif) |
| --- |

# Tabela de descrição de campos

| Nome do campo | Descrição do campo |
| --- | --- |
| action | Descrição da ação dada para o chargeback |
| actionDate | Data da ação dada |
| actionTakenCode | Código da ação dada para o Chargeback |
| authorization | Código de autorização |
| cardAssociation | Código da bandeira |
| cardAssociationName | Nome da bandeira |
| cdReason | Código da razão |
| chargebackMessage | Mensagem do chargeback |
| code | Código da mensagem de status |
| codigo | Indica se o arquivo foi trafegado com sucesso |
| currency | Moeda da contestação |
| dateInclusion | Data da inclusão |
| dcReason | Descrição da razão |
| establishmentName | Nome do estabelecimento comercial |
| establishmentNumber | Número de estabelecimentos específicos |
| mainCustomer | Número do estabelecimento matriz |
| file | Arquivo base64 |
| nameFile | Nome do arquivo |
| hierarchyType | Código para identificar o tipo de hierarquia |
| idCase | Identificador do case |
| idChargeback | Identificador da contestação |
| idDocumento | Identificador do documento do emissor |
| issuerSenderCode | Código do emissor |
| issuerSenderDescription | Descrição do emissor |
| mensagem | Mensagem do status do tráfego do arquivo |
| message | Mensagem de retorno da requisição |
| nameFile | Nome do arquivo |
| nsu | Número serial único |
| process | Código do processo |
| productCode | Código do produto |
| productDescription | Descrição do produto |
| rapidDisputeResolution | Indicador de resolução rápida de disputas |
| reasonCode | Código da razão |
| reasonDescription | Descrição da razão |
| reasonMessage | Mensagem da razão |
| reasonToRefuse | Texto contendo o motivo da recusa |
| receptionDate | Data de recepção da contestação |
| referenceNumber | Número de referência |
| remainingDaysToTreat | Dias pendentes para tratamento |
| replyDate | Data do tratamento |
| ro | Número RO |
| terminal | Número do terminal |
| tid | Número TID |
| tpReason | Tipo da razão |
| transactionAmount | Valor da transação da contestação |
| transactionDate | Data da transação da contestação |
| treatmentDeadline | Data limite de tratamento |
| truncatedCard | Número de cartão truncado |
| userName | E-mail do responsável pela tratativa |

# Tabela dos status de retorno

| Código | Descrição |
| --- | --- |
| 101 | Chargeback acatado com sucesso! |
| 102 | Chargeback recusado com sucesso! |
| 103 | Não há registros a serem exibidos a partir da busca realizada. |
| 104 | Download do documento de apoio realizado com sucesso! |
| 105 | Download realizado com sucesso do documento do emissor! |
| 138 | Limite máximo de itens por página deve ser até 200 registros. |
| 901 | Não foi possível concluir a requisição. Tente mais tarde! |
| 902 | Não foi possível concluir a requisição. Case informado não condiz com o número do estabelecimento! |
| 903 | Anexar a documentação dentro do padrão estabelecido, nos formatos .TIF, .TIFF, .PDF e .JPEG, contendo 8 MB de tamanho e até 10 páginas. |
| 904 | Necessário adicionar um documento para recusar. |
| 905 | Motivo de rejeição ultrapassou o limite de 100 caracteres. |
| 906 | O limite de período para a consulta é de 180 dias. |
| 907 | O campo período de notificação aceita somente caracteres numéricos e no formato AAAA-MM-DD. |
| 908 | Necessário informar a bandeira para buscar por razão. |
| 909 | Obrigatório o preenchimento do campo "número do estabelecimento" ou informar o número da matriz |
| 910 | O campo "número do estabelecimento" aceita somente caracteres numéricos. |
| 911 | O campo "número do case" aceita somente caracteres numéricos. |
| 912 | O campo "bandeira" aceita somente caracteres numéricos. |
| 913 | O campo "mensagem de chargeback" é preenchido apenas nas razões de fraude. |
| 914 | O campo "TID" é alfanumérico, portanto, não aceita caracteres especiais. |
| 915 | O campo "TID" deve conter até 20 caracteres. |
| 916 | O campo "page" deve ser maior ou igual a 0. |
| 917 | O campo "pageSize" deve ser igual ou maior que 1. |
| 918 | Não foi possível conectar à base de dados. |
| 919 | O campo "status" é obrigatório. |
| 920 | O campo "período de notificação" é obrigatório. |
| 921 | O campo "data inicial do período de notificação" é obrigatório. |
| 922 | O campo "data final do período de notificação" é obrigatório. |
| 923 | A data inicial do período de notificação deve ser menor que data final. |
| 924 | O campo "processo" aceita somente caracteres numéricos. |
| 925 | O campo "razão" aceita somente caracteres numéricos. |
| 926 | O campo "id do chargeback" é obrigatório. |
| 927 | Não foi possível concluir a requisição. Case informado não possui documentação de apoio atrelada! |
| 928 | O campo "id do chargeback" aceita somente caracteres numéricos. |
| 929 | Não foi possível concluir a requisição. O nome do documento deve ser o número do case! |
| 930 | O campo "motivo de recusa" é obrigatório. |
| 931 | Não foi possível concluir a requisição. Chargeback já tratado anteriormente! |
| 932 | O campo "idBandeira" não é válido. |
| 933 | O campo "Orderby" não é válido. |
| 934 | O campo "Order" não é válido. |
| 935 | O campo "NSU" aceita somente caracteres numéricos. |
| 936 | O campo "número da matriz" aceita somente caracteres numéricos. |
| 938 | Não foi possível concluir a requisição. Case informado não possui documentação do emissor atrelado! |
| 939 | O campo id do documento aceita somente caracteres numéricos |

# Dúvidas frequentes

1. **O que é uma contestação?**

É quando o titular do cartão identifica algum problema na transação, como suspeita de fraude ou desacordo com o lojista. Então, ele entra em contato com o Banco Emissor do cartão para relatar o ocorrido e é iniciado o processo de disputa. Além de contestação, esse processo também é chamado de Chargeback. E todo o fluxo de disputa é regulamentado pelas bandeiras dos cartões, que determinam as regras de disputa, como quem ganha e quem perde, por exemplo.

1. **Como eu posso me defender dessas contestações?**

Quando uma compra é contestada, você tem 2 opções:

- Aceitar e permitir o estorno do valor da venda;
- Se defender e evitar que o valor seja estornado.

Suas ações durante o processo de chargeback são chamadas de tratativas. A tratativa pode ser realizada dentro do App Cielo Gestão, Site Cielo ou através da API de Chargeback Cielo, que é o tema deste documento.

1.   **Para dar início ao processo de integração com API de Chargeback, quais informações devo passar e para quem devo solicitar o cadastro?**

Seguir o passo a passo descrito no item Integração com API de Chargeback.

1. **Caso eu esteja integrado com a API da Braspag, posso migrar para API de Chargeback da Cielo?**

Sim, nós recomendamos que essa migração ocorra, justamente porque a API de Chargeback da Cielo oferece benefícios em relação a API da Braspag. Entre eles, podemos listar:

- Um aumento de prazo no tratamento das contestações em 3 dias. Ou seja, a API Braspag tem 7 dias e a Cielo 10 dias.
- Um leque maior de formatos de documentos aceitos. A API Braspag aceita apenas .tiff, enquanto a Cielo aceita pdf e jpeg também.
- A consulta do status da contestação (serviço ciclo de vida), dando maior visibilidade e capacidade de gestão das contestações tratadas.
- A consulta do documento adicionado na defesa (serviço consulta de documento).
- A consulta do documento enviado pelo Emissor.

Para realizar a migração, solicite ao seu Gerente de Negócios o descadastramento da API da Braspag e a integração com a API de Chargeback Cielo. Durante o período de integração com API de Chargeback Cielo (desde o momento do descadastro da API Braspag até o momento da integração com a nova API), você deverá administrar seus chargebacks pelo Site Cielo.

1. **Como consultar uma contestação na API?**

No serviço Consulta de contestações pendentes ou tratadas, você consegue visualizar tanto as contestações que estão pendentes (status PENDING) quanto as que já foram tratadas (status DONE).

Para visualizar as contestações que estão pendentes de tratamento, basta informar o número do estabelecimento que deseja consultar, e para as já tratadas, você também deve especificar um período.

1. **Posso realizar uma consulta para todos os estabelecimentos abaixo da minha matriz?**

Sim, nós recomendamos que você consulte sempre pelo seu estabelecimento matriz, pois dessa forma você visualiza todas as contestações dos demais estabelecimentos abaixo daquela matriz selecionada. Na API, o número do estabelecimento individual que recebeu a contestação é representado pelo campo establishmentNumber e o número do estabelecimento matriz é o mainCustomer. Então, no serviço de consulta, você só precisa preencher o campo mainCustomer, assim você vai obter todas as contestações abaixo da sua hierarquia de Raiz de CNPJ. Caso queira visualizar as contestações abaixo de um outro tipo de hierarquia, como por exemplo um Grupo de Pagamento, você deverá preencher também o campo hierarchyType para especificar o tipo de matriz a ser consultada.

1. **Como realizar uma tratativa na API?**

No serviço Aceite de contestação, você realiza o aceite informando o número do estabelecimento que recebeu a contestação e o ID do Chargeback.

No serviço Recusa de contestação, você realiza a recusa informando, além do número do estabelecimento que recebeu a contestação e do ID do Chargeback, uma breve descrição da razão de recusa (máximo 100 caracteres) e um documento que comprove que a venda foi legítima, isto é, que foi feita pela pessoa titular do cartão ou com o consentimento dela e que ambos cumpriram suas obrigações no momento da compra.

1. **Enviei a documentação solicitada, como saber qual o status do meu caso. Eu ganhei ou perdi esta contestação?**

Você pode consultar o andamento da sua contestação no serviço Pesquisa Ciclo de Vida da API, informando o número do case que deseja visualizar.

1. **Com que frequência devo consultar as contestações?**

As bandeiras atualizam as contestações uma vez por dia, por isso, você pode verificar suas contestações diariamente.

# Mais informações

Para mais informações, acesse as páginas:

Cielo no Blog:

[/blog.cielo.com.br/dicas-e-historias-de-sucesso/o-que-e-chargeback/](https://blog.cielo.com.br/dicas-e-historias-de-sucesso/o-que-e-chargeback/)

# Contato para dúvidas

E-mail para suporte técnico:

[techsupportchargeback@cielo.com.br](mailto:techsupportchargeback@cielo.com.br)

Caso precise de alguma ajuda, você pode entrar em contato diretamente com seu Gerente de Negócios, que estará pronto para te atender da melhor forma!

Conte com a gente!
