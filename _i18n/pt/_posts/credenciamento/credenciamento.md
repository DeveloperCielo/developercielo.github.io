# Visão geral

O objetivo desta documentação é orientar o desenvolvedor sobre como integrar com a API de Credenciamento da Cielo, descrevendo as funcionalidades, fluxo de execução e métodos a serem utilizados

Nesse manual você encontrará a referência sobre todas as operações disponíveis na API REST de Credenciamento Estas operações devem ser executadas utilizando sua chave específica (Merchant ID e Merchant Key) nos respectivos endpoints dos ambientes:

## O que é

Credenciamento é o processo de afiliação de novo cliente na Cielo (8Estabelecimento Comercial8)

## Como funciona

A integração é realizada através de serviços disponibilizados como Web Services O modelo empregado é bastante simples: Existem duas URLs (endpoint), uma específica operações que causam efeitos colaterais - como autorização, captura e cancelamento de transações, e uma URL específica para operações que não causam efeitos colaterais, como pesquisa de transações Essas duas URLs receberão as mensagens HTTP através dos métodos POST, GET ou PUT Cada tipo de mensagem deve ser enviada para um recurso identificado através do path

|Método|Descrição|
|---|---|
|**POST**|O método HTTP `POST` é utilizado na criação dos recursos ou no envio de informações que serão processadas Por exemplo, criação de uma transação|
|**PUT**|O método HTTP `PUT` é utilizado para atualização de um recurso já existente Por exemplo, captura ou cancelamento de uma transação previamente autorizada|
|**GET**|O método HTTP `GET` é utilizado para consultas de recursos já existentes Por exemplo, consulta de transações|
