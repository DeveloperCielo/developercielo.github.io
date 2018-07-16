---
layout: tutorial
title:  Manual Boletos
search: true
toc_footers: true
categories: tutorial
tags:
  - Documentos Adicionais
---

# Boletos

## O que são Boletos Registrados?

O Boleto Registrado é um dos meios de pagamentos disponibilizados no E-commerce com o objetivo de mitigar fraudes.
O banco emissor tem conhecimento da emissão do boleto desde sua geração até sua liquidação diferente dos antigos boletos não registrados. O lojista tem a opção de negativar o comprador que gerou e não pagou uma cobrança registrada.

Esta modalidade de cobrança permite que o comprador efetue o pagamento do boleto em qualquer agência bancária mesmo depois do vencimento.

Datas estabelecidas pela Febraban (Federação Brasileira de Bancos) para que boletos Registrados possam ser utilizados.

![Tabela de Prazos]({{ site.baseurl_root }}/images/tutoriais/boletos/b1.png)

# Bradesco

![Logo Bradesco]({{ site.baseurl_root }}/images/tutoriais/boletos/bradesco.jpg)

## Como funciona

### API Cielo E-commerce

1. O comprador, após escolher o produto na loja, seleciona a forma de pagamento Boleto Bradesco;
1. A loja envia para a Cielo uma requisição chamando o meio de pagamento correspondente;
1. A Cielo se comunica com a aplicação do Banco Bradesco solicitando o registro do boleto;
1. Caso o registro seja realizado com sucesso, o Banco responde à solicitação devolvendo os dados de cobrança (código de barras, linha digitável, etc) e a **URL do Boleto**;
1. A Cielo envia no response o link para que a loja possa abrir um pop-up exibindo o boleto;
1. O cliente acessa a URL do boleto (renderização) e então pode realizar o pagamento; 
1. A conciliação do boleto é feita via serviço de consulta da Cielo ao sistema do Bradesco. 
1. Para receber as notificações de pagamento, a loja deve ter cadastrada a URL de Notificação ou  utilizar o serviço de consulta. 

### Checkout Cielo

1. O comprador, após escolher o produto na loja, seleciona a forma de pagamento Boleto Bradesco;
1. O Checkout exibirá a URL do Boleto
1. O cliente acessa a URL do boleto (renderização) e então pode realizar o pagamento; 
1. A conciliação do boleto é feita via serviço de consulta da Cielo ao sistema do Bradesco. 
2. No Backoffice do Checkout, o status do Boleto será atualizado.
1. Para receber as notificações de pagamento, a loja deve ter cadastrada a URL de Notificação ou  utilizar o serviço de consulta. 

![Fluxo do Boleto]({{ site.baseurl_root }}/images/tutoriais/boletos/b2.png) 

## Configurando o Boleto

### Ambiente Bradesco

O lojista precisará realizar configurações dentro do ambiente bancario para que a geração 

#### Painel de controle

O lojista deverá contatar o gerente de relacionamento do Banco Bradesco para solicitar a contratação do Boleto Registrado via Gerenciador API/Painel de controle
A equipe técnica do Banco enviará para o e-mail do solicitante os dados de acesso ao Gerenciador API/Painel de controle.

> **PAINEL DE CONTROLE BRADESCO**: https://meiosdepagamentobradesco.com.br/gerenciadorapi/login.jsp

#### Configurando o boleto

No **painel do Bradesco**, o lojista deverá acessar a aba **“Configurações”** e escolher a opção **“Meios de Pagamento”** e modifique as sequintes configurações.

* **Habilitar "frase" do boleto**: Inativo
* **Habilitar "referência" do boleto**: Ativo
* **Apresentar Agência e Conta**: Inativo
* **Vencimento**: 5 dias

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-2.png)

<aside class="notice"><strong>Obs:</strong> O vencimento pode ser defindo nos produtos Cielo.</aside>

* **URL de notificação**: https://www.pagador.com.br/post/BoletoBradescoSps/ReceivePost
* No campo **Chave de Segurança** clique em "**Gerar chave de segurança**"
* **Endereço de IP da loja**  (numérico)
* Para os campos de **URL de resposta, URL de falha e URL de redirecionamento**, inserir o seguinte link: `https://www.pagador.com.br/post/BoletoBradescoSps/ReceivePost`

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-3.png)

Em cada um dos três Paramêtros a seguir, preencher com o Parâmetro de Comunicação abaixo:

|Parâmetros|Dados|
|----------|------|
|**Notificação**|`numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`|
|**Confirmação**|`numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`|
|**Falha**|`numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`|
|**Comunicação**|`numOrder=[%lid_m%]&merchantid=[%merchantid%]&cod=[%errorcod%]&cctype=[%cctype%]&ccname=[%ccname%]&ccemail=[%ccemail%]&numparc=[%numparc%]&valparc=[%valparc%]&valtotal=[%valtotal%]&prazo=[%prazo%]&comb=[%comb%]&assinatura=[%assinatura%]&`|

![Boleto Bradesco]({{ site.baseurl_root }}/images/boleto-bradesco-passo-4.png)

<aside class="notice"><strong>Obs:</strong> Não podem existir espaços ou quebras de texto nos parâmetros expostos acima.</aside>

Clique no botão "**Gravar todas as configurações realizadas**"

#### Configurando credenciais

1. No **painel do Bradesco**, o lojista deverá acessar a aba **“Configurações”** e escolher a opção **“Meios de Pagamento”**
2. O campo **“Palavra-secreta”** deve ser preenchido com uma senha. A operação é confirmada clicando em **“Gerar nova chave de segurança”**
1. Ainda no [**Painel do Bradesco**](https://meiosdepagamentobradesco.com.br/gerenciadorapi/login.jsp), o cliente deve criar um Usuário de Consulta para atualizações de status.

![Tela Bradesco]({{ site.baseurl_root }}/images/tutoriais/boletos/b3.png)

#### Suporte Bradesco

Para obter ajuda com os passos acima, entre em contato com o suporte Bradesco: 

* kit@scopus.com.br
* homologacao@scopus.com.br
* com.eletronico@bradesco.com.br
* comerciobradesco@scopus.com.br 

### Ambiente Cielo

#### Dados de cadastro

O Lojista precisará informar ao suporte Cielo os sequintes dados:

| Dados                       | Descrição                              | Formato    | OBS                                                                                                                                                        |
|-----------------------------|----------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Agência**                 | Código agência                         | 4 Dígitos  | com  ou sem Hifen                                                                                                                                          |
| **Conta:**                  | Conta corrente                         | 7 Dígitos  | com Hifen                                                                                                                                                  |
| **Carteira:**               | **Não é necessário boleto Registrado** | 2 dígitos  | N/A                                                                                                                                                        |
| **Conciliação**             | Número do convênio de cobrança         | 7 Dígitos  | Informado dentro [Painel do Bradesco](https://meiosdepagamentobradesco.com.br/gerenciadorapi/login.jsp)                                                    |
| **Convênio**                | Convênio de comércio eletrônico        | 6 Dígitos  | Valida com o banco se é necessario Preenchimento para a carteira                                                                                           |
| **Nosso Numero**            | Contador incremental                   | 5 Dígitos  | **Opcional** - Numero de controle que a cada emissão dp boleto  aumenta em +1                                                                              |
| **Vencimento**              | Prazo de validade do boleto            | 6 Dígitos  | é o valor padrão, se nenhum outro valor for enviado via API                                                                                                |
| **Assinatura de Afiliação** | Chave de segurança do **Bradesco**     | 50 Dígitos | Informado dentro [Painel do Bradesco](https://meiosdepagamentobradesco.com.br/gerenciadorapi/login.jsp)                                                    |

Serão necessarias as credenciais do Bradesco:

> Essas credenciais são usadas para que a Cielo possa consultar o status do Boleto.

|Credenciais|Descrição|Exemplo|
|-----------|---------|-------|
|**Usuário**| E-mail usado no acesso do [Painel do Bradesco](https://meiosdepagamentobradesco.com.br/gerenciadorapi/login.jsp)|**cielo@cielo.com**|
|**Senha/Chave de Segurança**| Chave de segurança criada dentro do [Painel do Bradesco](https://meiosdepagamentobradesco.com.br/gerenciadorapi/login.jsp). <BR> **Não é a senha de acesso ao Painel Bradesco**|**qcnmFA-Y2rGm4meWLzrEzSpdPARBsmblZSqfKLwq7DM**|

#### Suporte Cielo

Em caso de dúvidas em qualquer etapa ou outras informações técnicas, entre em contato com o Suporte Web do Cielo e-Commerce nos seguintes canais:

* **E-mail:** cieloeCommerce@cielo.com.br
* **Capitais:** 4002-9700
* **Demais Cidades:** 0800 570 1700
* ***Horário de atendimento:** 24h por dia, 7 dias por semana.

### Atualização de Status

Para o meio de pagamento Boleto Registrado Bradesco a atualização de status é feita via sondagem em lote: 

* Essa sondagem ocorre pela manhã: **4h, 6h, 8h, 10h e 12h**.

<br> 

Para receber as notificações de pagamento, a loja deve ter cadastrada a URL de Notificação em conjunto com a realização de GETs

> **OBS:** Hoje, a sonda considera transações que estejam com a data de vencimento dentro do intervalo de 30 dias anteriores e 30 dias posteriores à data de Sondagem. 

## Conciliação Manual de Boletos

Para conciliar o boleto de forma manual, basta localizar o pedido no site Cielo e dentro dos Detalhes da Transação localizar o botão “Conciliar”. Desta forma o pedido terá o status alterado de “Não Pago" para “Pago”.

-------------------------------------------------------------------

# Banco do Brasil

![]({{ site.baseurl_root }}/images/tutoriais/boletos/bancodobrasil.jpg)

## Como funciona

### API Cielo E-commerce

1. O comprador, após escolher o produto na loja, seleciona a forma de pagamento Boleto Registrado Banco do Brasil.
1. A loja envia para a Cielo uma requisição chamando o meio de pagamento correspondente.
1. A cielo retornará uma URL contendo a imagem do Boleto. 

![]({{ site.baseurl_root }}/images/tutoriais/boletos/fluxobb.png)

### Checkout Cielo

1. O comprador, após escolher o produto na loja, seleciona a forma de pagamento Boleto Bando do Brasil;
1. O Checkout exibirá a URL do Boleto
1. O cliente acessa a URL do boleto (renderização) e então pode realizar o pagamento;
1. A conciliação de status não está disponivel para Checkout Cielo.
2. O Lojista precisará conciliar manualment o pagamento do Boleto

## Configurando o boleto

### Ambiente BB

O lojista deverá contatar o gerente de relacionamento do Banco do Brasil para solicitar a habilitação do produto Boleto Registrado.
O formulário a seguir deve ser preenchido e entregue ao gerente.

|Dado|Formato|
|-|-|
|**URL (site) retorno à loja**| https://www.pagador.com.br|
| **Formato arquivo Retorno**| (X) CBR643|
| **Meio de retorno**| {X) Mainframe – para empresa com sistema próprio, que não usam o GFN.|

![]({{ site.baseurl_root }}/images/tutoriais/boletos/regbb00.png)
![]({{ site.baseurl_root }}/images/tutoriais/boletos/regbb01.png)

Ao final do credenciamento, o lojista receberá um documento com como o que segue abaixo

![]({{ site.baseurl_root }}/images/tutoriais/boletos/regbb02.jpg)

### Ambiente Cielo

#### Dados de cadastro

O Lojista precisará informar ao suporte Cielo os sequintes dados:

| Dados            | Descrição                              | Formato    | OBS                                                                                                               |
|------------------|----------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------|
| **Agência**      | Código agência                         | 4 Dígitos  | Hifen Obrigátório - Não pode haver espaços antes ou depois d agência                                              |
| **Conta:**       | Conta corrente                         | 7 Dígitos  | Hifen Obrigátório                                                                                                 |
| **Carteira:**    | **Não é necessário boleto Registrado** | 2 dígitos  | N/A                                                                                                               |
| **Conciliação**  | Número do convênio de cobrança         | 7 Dígitos  | inserir o *Convênio de cobrança* fornecido pelo banco                                                             |
| **Convênio**     | Convênio de comércio eletrônico        | 6 Dígitos  | inserir o *Convênio de Comercio Eletrônico* fornecido pelo banco                                                  |
| **Nosso Numero** | Contador incremental                   | 5 Dígitos  | Inserir "10000" -  A cada emissão de boleto esse numero aumenta em +1                                             |
| **Vencimento**   | Prazo de validade do boleto            | 6 Dígitos  | é o valor padrão, se nenhum outro valor for enviado via API                                                       |
| **Instruções**   | Informações exibidas no boleto         | 50 Dígitos | Somente numeros e letras de A-Z, não pode haver caractéres especiais ou mais de um espaçamento entre cada palavra |

> *OBS*: A loja deverá obrigatóriamente enviar no contrato da API os dados (nome do comprador, CPF e endereço completo).

## Conciliação de boletos

> **NO MOMENTO, O BOLETO REGISTRADO BANCO DO BRASIL NÃO REALIZA ATUALIZAÇÃO DE STATUS AUTOMÁTICA**
