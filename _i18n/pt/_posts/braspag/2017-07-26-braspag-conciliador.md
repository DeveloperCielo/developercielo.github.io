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

### Registro de Informação da Adquirente

| Campo                          | Nome                                                               | Tipo                              | Formato | Descrição                                                                                                           |
|--------------------------------|--------------------------------------------------------------------|-----------------------------------|---------|---------------------------------------------------------------------------------------------------------------------|
| TransactionId                  | Identificador Único da Transação no Conciliador                    | Identificador Único Global (GUID) | G       | Identificador Único das Informações da Adquirente1                                                                  |
| AffiliationCode                | Código de Afiliação                                                | Numérico                          | N       | O Código de Afiliação informado na venda do Extrato                                                                 |
| SummaryNumber                  | Número do Lote                                                     | Numérico (Inteiro)                | N       | O número do Lote (Resumo de Vendas) ao qual a transação pertence na Adquirente                                      |
| CardNumber                     | Número do Cartão                                                   | Alfanumérico                      | A       | O número do cartão usado na compra2                                                                                 |
| SaleDate                       | Data da Venda                                                      | Data                              | D       | A data em que a venda foi efetuada, segundo as informações do extrato                                               |
| TransactionGrossAmount         | Valor bruto da Transação                                           | Numérico (Inteiro)                | N       | Valor bruto da transação em centavos                                                                                |
| TransactionTaxAmount           | Valor da taxa de adquirência deduzido da transação                 | Numérico (Inteiro)                | N       | Valor deduzido do valor bruto da transação como taxa de adquirência, em centavos                                    |
| TransactionNetAmount           | Valor líquido da transação                                         | Numérico (Inteiro)                | N       | Valor que será recebido pelo lojista, após a dedução da taxa de Adquirência sobre o valor bruto, em centavos        |
| RoundingInstallmentGrossAmount | Valor bruto da parcela de arredondamento                           | Numérico (Inteiro)                | N       | Valor bruto da parcela de arredondamento, em centavos3                                                              |
| RoundingInstallmentTaxAmount   | Valor da taxa de adquirência deduzido da parcela de arredondamento | Numérico (Inteiro)                | N       | Valor deduzido do valor bruto da parcela de arredondamento como taxa de adquirência, em centavos                    |
| RoundingInstallmentNetAmount   | Valor líquido da parcela de arredondamento                         | Numérico (Inteiro)                | N       | Valor que será recebido pelo lojista como valor da parcela de arredondamento, após a dedução da taxa de adquirência |
| InstallmentsGrossAmount        | Valor bruto das demais parcelas                                    | Numérico (Inteiro)                | N       | Valor bruto das demais parcelas da transação,  em centavos                                                          |
| InstallmentsTaxAmount          | Valor da taxa de adquirência deduzido das demais parcelas          | Numérico (Inteiro)                | N       | Valor deduzido do valor bruto das demais parcelas como taxa de adquirência, em centavos                             |
| InstallmentsNetAmount          | Valor líquido das demais parcelas                                  | Numérico (Inteiro)                | N       | Valor que será recebido pelo lojista como valor das demais parcelas, após a dedução da taxa de  adquirência         |
| Tax                            | Taxa de adquirência                                                | Numérico (Inteiro)                | N       | A taxa de adquirência sobre a transação4                                                                            |
| Tid                            | TID                                                                | Alfanumérico                      | A       | O identificador da transação ecommerce na adquirente Cielo                                                          |
| Nsu                            | NSU                                                                | Numérico (Inteiro)                | N       | O número sequencial da transação na Adquirente                                                                      |
| IataAmount                     | Valor da taxa IATA                                                 | Numérico (Inteiro)                | N       | O valor da taxa IATA (apenas para setor aéreo), cobrado sobre a transação, em centavos                              |
| OrderId                        | Número do Pedido                                                   | Alfanumérico                      | A       | O Número do Pedido recebido pela adquirente durante a concretização da transação                                    |
| TerminalLogicNumber            | Número lógico do Terminal                                          | Alfanumérico                      | A       | O número do terminal utilizado para efetuar a transação                                                             |
| CaptureDate                    | Data de Captura                                                    | Data                              | D       | A data da captura da transação na Adquirente                                                                        |
| SummaryIdentifierNumber        | Identificador Único do Lote                                        | Numérico (Inteiro  Longo)         | N       | O identificador único do Lote (Resumo de Vendas) na adquirente Cielo                                                |
| InstallmentCount               | Quantidade de Parcelas                                             | Númerico (Inteiro)                | N       | A quantidade de parcelas na qual a transação foi dividida na Adquirente                                             |
| AuthorizationCode              | Código de Autorização                                              | Alfanumérico                      | A       | O código de autorização da transação informado pela adquirente                                                      |
| CaptureMethodId                | Identificador do Meio de  Captura                                  | Numérico (Inteiro)                | N       | O identificador do meio tecnológico utilizado para capturar a transação na Adquirente5                              |
| CaptureMethodDescription       | Descrição do Meio de Captura                                       | Alfanumérico                      | A       | A descrição do meio tecnológico utilizado para capturar a transação na   Adquirente5                                |
| CardBrandId                    | Identificador da Bandeira                                          | Numérico (Inteiro)                | N       | O identificador da bandeira do cartão utilizado para efetuar a  transação6                                          |
| CardBrand                      | Nome da Bandeira                                                   | Alfanumérico                      | A       | O nome da bandeira do cartão utilizado para efetuar a transação6                                                    |
| CardTypeId                     | Identificador do tipo do cartão                                    | Numérico (Inteiro)                | N       | O identificador do tipo do cartão: - 1: Debit - 2: Credit                                                           |
| CardType                       | Tipo de cartão                                                     | Alfanumérico                      | A       | O nome do tipo do cartão utilizado para efetuar a transação                                                         |
| ProductIdentifierCode          | Código de Identificação do   Produto na Cielo                      | Numérico (Inteiro)                | N       | O código que identifica o   Produto da Adquirente Cielo utilizado para efetuar a transação7                         |
| ProductIdentifierDescription   | Descrição do Produto na Cielo                                      | Alfanumérico                      | A       | A descrição do Produto na Adquirente Cielo utilizado para efetuar a  transação7                                     |

1. As informações da adquirente são os dados da venda que o Conciliador recebe dos extratos eletrônicos, o meio de integração da adquirente com os sistemas externos. São a segunda parte da conciliação. O Identificador Único da Transação pode ser utilizado para visualizar a venda no WebSite do Conciliador, preenchendo a URL:   

> https://reconciliation.braspag.com.br/WebSite/Reports/TransactionDetails.aspx?AcquirerTransactionId=[I D]   

Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   

2. Devido à restrições de segurança, o número do cartão será informado de forma mascarada.   
3. Quando uma transação é dividida em uma quantidade de parcelas onde o valor não pode ser distribuído igualmente entre as parcelas, surge a necessidade de colocar um valor extra em uma parcela específica. Esta parcela é chamada de parcela de arredondamento. Como exemplo, podemos adotar uma transação de R$ 100,00 dividida em três parcelas. Se a primeira parcela for a parcela de arredondamento, ela terá o valor de R$ 33,34 – enquanto as duas outras parcelas terão o valor de R$ 33,33.   
4. A taxa de adquirência normalmente é expressa em porcentagem. O campo demonstra essa porcentagem multiplicada por 100. Portanto, se o valor deste campo for expresso como 275, isto indica uma taxa de adquirência de 2,75%.   
5. Tabelas com os meios de captura informados estão disponíveis no Apêndice do Manual.   
6. Uma tabela com as bandeiras disponíveis está disponível no Apêndice do Manual.   
7. Uma tabela com os tipos de produto está disponível no Apêndice do Manual.   

### Registro de Evento

| Campo                       | Nome                                        | Tipo               | Formato | Descrição                                                                                                             |
|-----------------------------|---------------------------------------------|--------------------|---------|-----------------------------------------------------------------------------------------------------------------------|
| EventId                     | Identficador Único do Evento no Conciliador | Identificador Único Global  (GUID)     | G       | O identificador único do do  Evento no Conciliador2                                               |
| EventDate                   | Data do evento                              | Data               | D       | A data em que o evento está previsto para ser realizado, ou a data em que foi realizado (no caso de evento realizado) |
| CategoryId                  | Identificador da Categoria de  Evento       | Numérico (Inteiro) | N       | O identificador da categoria do evento3                                                                               |
| Category                    | Descrição da Categoria de  Evento           | Alfanumérico       | A       | A descrição da categoria do evento3                                                                                   |
| TypeId                      | Identificador do Tipo de Evento             | Numérico (Inteiro) | {N}     | 1 = Realizado<br>2 = Previsto<br>3 = Pendente                                                                         |
| Type                        | Descrição do Tipo de Evento                 | Alfanumérico       | A       | “Preview”, “Realized” ou “Pending” (Previsto, realizado ou pendente)                                                  |
| AffiliationCode             | Código de Afiliação                         | Numérico           | N       | O código de afiliação do estabelecimento no qual o evento foi executado                                               |
| TransactionInstallment      | Parcela da Transação                        | Numérico           | N       | A parcela da transação a qual o evento se refere4                                                                     |
| GrossAmount                 | Valor Bruto                                 | Numérico           | N       | O valor financeiro do evento contemplado, antes da dedução da taxa de adquirência, em centavos                        |
| NetAmount                   | Valor Líquido                               | Numérico           | N       | O valor líquido do evento, após a redução da taxa de adquirência, em centavos                                         |
| TaxAmount                   | Valor da Taxa                               | Numérico           | N       | O valor da taxa de adquirência sobre o evento, em centavos                                                            |
| Bank                        | Banco                                       | Numérico           | N       | O código do banco do domicílio bancário sobre o qual o evento financeiro é ou será lançado                            |
| Agency                      | Agência                                     | Numérico           | N       | O código da agência do domicílio bancário sobre o qual o evento financeiro é ou será lançado                          |
| Account                     | Número da Conta                             | Alfanumérico       | A       | O número da conta do domicílio bancário sobre o qual o evento financeiro é ou será lançado                            |
| AcquirerAdjustCode          | Código do Ajuste                            | Alfanumérico       | A       | O código que identifica o tipo de ajuste (apenas para eventos de ajustes)                                             |
| AcquirerAdjustDescription   | Descrição do Ajuste                         | Alfanumérico       | A       | A descrição do ajuste (apenas para eventos de ajustes)                                                                |
| AnticipationOperationNumber | Número da Operação de  Antecipação na Cielo | Numérico           | N       | O número da Operação de Antecipação (apenas para eventos derivados de antecipações na Cielo)                          |
| OriginalPaymentDate         | Data original de pagamento                  | Data               | D       | A data original para a qual o evento de pagamento estava previsto (apenas para eventos de antecipações)               |


# Arquivos Fluxo de Caixa 2.0 - CSV

Teste