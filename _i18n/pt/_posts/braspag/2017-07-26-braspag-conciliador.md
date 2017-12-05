---
layout: manual
title: Conciliador
description: Integração técnica
search: true
translated: true
categories: manual
tags:
  - Documentos Braspag
language_tabs:
  xml: XML
---

# Arquivos Fluxo de Caixa 2.0 - XML

## Introdução

Este manual tem como objetivo orientar o desenvolvimento do Arquivo de Fluxo de Caixa da plataforma conciliador no formato XML, e a extração do seu conteúdo através do Webservice

## Legenda para os tipos de formato 

### Tipos de Formato (Tabela II)

| Descritor | Significado                                     | Exemplo                            |
|-----------|-------------------------------------------------|------------------------------------|
| N         | Um ou mais algarismos (0 a 9)                   | 243                                |
| A         | Um ou mais caracteres alfanuméricos             | Texto                              |
| {N}       | Um  único algarismo (0 a 9)                     | 2                                  |
| {A}       | Identificador Único Global (GUID)1              | B                                  |
| G         | Hora em campo data/hora (0 a 23)                | 4749e676-2507-442da1c6c25c08e2d2af |
| DT        | Data e hora, representados no formato ISO 86012 | 2015-06-09T10:08:19.1748259-03:00  |
| D         | Data, representada no formato ISO 86012         | 2015-06-09                         |

1. Um Identificador Único Global ou GUID (do inglês, Globally Unique IDentifier) é um tipo especial de identificador utilizado em aplicações de software para providenciar um número de referência padrão mundial. Como, por exemplo, em uma definição de referência interna para um tipo de ponto de acesso em uma aplicação de software ou para a criação de chaves únicas em um banco de dados. O número total de chaves únicas (2128 ou ~3.4×1038) é tão grande que a probabilidade do mesmo número se repetir é muito pequena. Considerando que o Universo Observável contém 5x1022 estrelas, cada estrela poderia ter ~6.8×1015 dos seus próprios GUIDs. Caso seu sistema não reconheça o formato GUID, poderá trata-lo como texto.

2. O formato ISO 8601 é o formato de data padrão existente na recomendação oficial para Schemas XML 
(http://www.w3.org/TR/xmlschema-2/#dateTime). Ele consiste na representação da data no formato yyyy-MM-dd. Caso o campo também tenha a informação de hora, a data vem seguida da letra “T” para separa-la da hora, no formato HH:mm:ss:mmmmmmm, seguida finalmente pela diferença de fuso horário. Para mais informações da ISO 8601 podem ser consultadas em:

> http://en.wikipedia.org/wiki/ISO_8601.   

## Informações sobre as adquirentes

O principal insumo do Conciliador são os extratos eletrônicos gerados pelas adquirentes. Devido a isso, podem existir particularidades entre cada uma.   
Abaixo a estimativa de dias em que a adquirente envia os eventos no extrato eletrônico: 

### Prazo de registro no extrato eletrônico (Tabela II)

| Adquirente     | Captura                                         | Pagamento       | Observação                                                                                                                                                  |
|----------------|-------------------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cielo          | D+1                                             | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Rede           | D+1                                             | D -1            | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Amex           | Entre D+1 à  D+2                                | Entre D-4 à D-6 | *Desconsiderar do prazo a segunda feira, pois os extratos  não são gerados. Nestes dias o arquivo do Conciliador será disponibilizado somente com o header. |
| Getnet         | D+1                                             | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Ticket         | D+30 ajustada ao dia de recebimento do cliente  | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Sodexo         | D+30 ajustada ao dia de recebimento do cliente  | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Stone          | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Global Collect | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| First Data     | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |

### Registro Header (Tabela III)

| Campo              | Nome                                   | Tipo               | Formato | Descrição                                                                                                                              |
|--------------------|----------------------------------------|--------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------|
| MerchantId         | Identificador da Loja                  | Numérico (Inteiro) | N       | Contém o identificador único da loja no Conciliador                                                                                    |
| AcquirerId         | Identificador da Adquirente            | Numérico (Inteiro) | {N}     | 1 = Cielo<br>2 = Redecard<br>3 = Amex<br>5 = Getnet<br>6 = Ticket<br>7 = Stone<br>8 = Sodexo<br>9 = Global Payments<br>10 = First Data |
| GenerationDateTime | Geração do arquivo                     | Data/Hora          | DT      | Contém a data e a hora da geração do arquivo pelo Conciliador                                                                          |
| StartPeriod        | Período inicial                        | Data               | D       | Data inicial do período de conciliação contemplado pelo arquivo                                                                        |
| EndPeriod          | Período final                          | Data               | D       | Data final do período de conciliação contemplado pelo arquivo                                                                          |
| SequentialNumber   | Número sequencial                      | Numérico (Inteiro) | N       | Número sequencial que indica a ordem de processamento dos arquivos diários                                                             |
| ProcessingTypeId   | Identificador do tipo de processamento | Numérico (Inteiro) | {N}     | 1 = Arquivo diário <br> 2 = Arquivo reprocessado                                                                                       |
| ProcessingType     | Descrição do tipo de processamento     | Alfanumérico       | A       | “Daily” ou “Reprocessed” (Diário ou reprocessado)                                                                                      |
| Version            | Versão do arquivo                      | Alfanumérico       | A       | Versão do arquivo (“2.0”)                                                                                                              |

### Registro de Transação Conciliada (Tabela IV)

| Campo              | Nome                                 | Tipo               | Formato | Descrição                                      |
|--------------------|--------------------------------------|--------------------|---------|------------------------------------------------|
| ConciliationTypeId | Identificador do tipo de conciliação | Numérico (Inteiro) | {N}     | 1   = Automática <br> 2   = Manual             |
| ConciliationType   | Descrição do tipo de conciliação     | Alfanumérico       | A       | “Automatic” ou “Manual” (Automática ou manual) |

### Registro de Conciliação Manual (Tabela V)

| Campo                | Nome                              | Tipo         | Formato | Descrição                                                         |
|----------------------|-----------------------------------|--------------|---------|-------------------------------------------------------------------|
| ConciliationUserName | Usuário da conciliação manual     | Alfanumérico | A       | Login do usuário que efetuou a conciliação manual                 |
| ConciliationDateTime | Data e hora da conciliação manual | Data/Hora    | DT      | Data e hora em que a conciliação manual foi efetuada pelo usuário |

### Registro de Informação de Venda

| Campo                          | Nome                                            | Tipo                               | Formato | Descrição                                                                             |
|--------------------------------|-------------------------------------------------|------------------------------------|---------|---------------------------------------------------------------------------------------|
| TransactionId                  | Identificador Único da  Venda no Conciliador    | Identificador Único  Global (GUID) | G       | Identificador único do Conciliador para as informações de venda1                      |
| ExternalId                     | Identificador da Venda no  Sistema Transacional | Alfanumérico                       | A       | Identificador da Venda obtido a partir do Sistema Transacional no qual a Transação foi processada com a Adquirente-2                               |
| BranchId                       | Identificador da Filial                         | Alfanumérico                       | A       | Identificador da Filial da loja que processou a venda-3                                |
| AffiliationCode                | Código de Afiliação                             | Alfanumérico                       | A       | O código de afiliação da adquirente, informado nos dados da venda do cliente          |
| OrderId                        | Número do Pedido                                | Alfanumérico                       | A       | O número do pedido associado à venda no lojista-4                                      |
| AuthorizationCode              | Código de Autorização                           | Alfanumérico                       | A       | O Código de Autorização da transação que o Lojista recebeu da Adquirente              |
| SaleDate                       | Data da Venda                                   | Data                               | D       | A data em que foi realizada a venda no Lojista                                        |
| CaptureDate                    | Data da Captura                                 | Data                               | D       | A data da captura recebida pelo lojista da Adquirente                                 |
| TransactionAmount              | Valor da transação                              | Numérico (Inteiro)                 | N       | O valor da transação em centavos5                                                     |
| InstallmentCount               | Número de parcelas                              | Numérico (Inteiro)                 | N       | A quantidade de parcelas na qual a transação foi dividida                             |
| CustomerName                   | Nome do comprador                               | Alfanumérico                       | A       | O nome do comprador do produto                                                        |
| CustomerDocument               | Documento do comprador                          | Alfanumérico                       | A       | Documento de identificador do comprador (RG, CPF, etc.)                               |
| CustomerEmail                  | E-mail do comprador                             | Alfanumérico                       | A       | Endereço de e-mail do comprador                                                       |
| CardNumber                     | Número do cartão                                | Alfanumérico                       | A       | Número do cartão (crédito ou débito) utilizado na venda                               |
| Tid                            | TID                                             | Alfanumérico                       | A       | Identificador da transação ecommerce na Cielo, recebido pelo lojista                  |
| Nsu                            | NSU                                             | Número                             | N       | Número sequencial da transação na  Adquirente, recebido pelo lojista                  |
| IataAmount                     | Valor da taxa IATA                              | Número                             | N       | Valor da taxa IATA (apenas para setor aéreo), em centavos                             |
| PaymentMethodName              | Tipo de Integração                              | Alfanumérico                       | A       | Nome do meio de pagamento utilizado no caso da transação efetuada no  gateway Pagador |

1. As informações de venda são as transações enviadas pelo cliente do mundo físico, ou do  gateway/sistema transacional utilizado para efetuar as transações. São a primeira parte da conciliação. O Identificador Único da Venda pode ser utilizado para visualizar a venda no WebSite do Conciliador, preenchendo a URL:   

> https://reconciliation.braspag.com.br/WebSite/Reports/TransactionDetails.aspx?SaleTransactionId=[ID]  

**OBS:**Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   

2. O identificador da Venda no Sistema Transacional é o Identificador da Transação que é utilizado pelo sistema que efetuou a venda, seja ele um Gateway ou Sistema de Caixa/POS. Este valor pode ou não ser fornecido durante a importação da venda para o Conciliador. É de responsabilidade do cliente a decisão de informá-lo ou não.   
3. O identificador da Filial deve ser fornecido pelo cliente toda vez que a importação de uma venda é realizada para o Conciliador. Apesar de não haver restrições para o formato do identificador da filial (campo Alfanumérico), é obrigatório que cada Filial possua um identificador único.   
4. O Gerenciamento do Número do Pedido é de inteira responsabilidade do lojista. O Conciliador apenas armazena esta informação, mas nenhum tipo de validação é feito.   
5. O Valor da Transação não é o valor das parcelas. O valor informado aqui é o valor integral da mesma, da forma como informado pelo cliente/gateway.   
