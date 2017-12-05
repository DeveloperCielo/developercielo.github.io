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
### Registro de Informação de Venda
### Registro de Informação da Adquirente
### Registro de Evento

## Meios de Captura
### Cielo
### Amex   
### Rede
### GetNet
### Outros

A tabela abaixo é valida para:

* Stone
* Global Payments
* First Data
* Ticket 
* Sodexo

**Observação:** Para a adquirente Losango o campo é enviado “vazio

## Bandeiras

## Tipos de Produtos
### Cielo
### Getnet
### Stone
### Global Payments
### First Data
### Ticket
### Sodexo

## Categorias de Evento

## Webservice Conciliador    

Webservice é uma solução para integrar aplicações. 
Por meio dele, qualquer sistema pode se conectar para consultar ou inserir dados. Atualmente no Webservice do Conciliador é possível enviar o arquivo de vendas externas e baixar o conteúdo dos Arquivos de Fluxo de Caixa.    

Inicialmente o acesso deverá ser liberado pela equipe de operações, através do e-mail, senha e o cadastro dos IPs informados pelo estabelecimento.    
   
O Webservice está disponível através da URL: 

> https://reconciliation.braspag.com.br/WebServices/ReconciliationFilesWebService.asmx   
   
**Método:** GetExportedFileV2 

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rec="https://reconciliation.braspag.com.br">   
   <soapenv:Header/>   
   <soapenv:Body>   
      <rec:GetReconciliationFile>   
         <rec:request>   
            <rec:RequestId>[Guid aleatório]</rec:RequestId>   
            <rec:RequestingUserName>[Login do usuário da loja]</rec:RequestingUserName>   
            <rec:MerchantId>[Identificador da loja, fornecido pela Braspag]</rec:MerchantId>   
            <rec:AcquirerId>[Identificador da adquirente]</rec:AcquirerId>   
            <rec:RequestingPassword>[Senha do usuário da loja]</rec:RequestingPassword>   
            <rec:ReferenceDate>[Data de referência do arquivo]</rec:ReferenceDate>   
            <rec:FileExtensionType>[Extensão do arquivo]</rec:FileExtensionType>   
            <rec:FileType>[Tipo do arquivo]</rec:FileType>   
         </rec:request>   
      </rec:GetReconciliationFile>   
   </soapenv:Body>  
```
