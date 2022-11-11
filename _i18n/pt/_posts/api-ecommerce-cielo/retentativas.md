---
layout: manual
title: Manual Programa de Retentativas v2
description: API para integração de vendas no físico e OnLine
search: true
translated: true
toc_footers: true
categories: manual
sort_order: 1
tags:
  - API Pagamento
language_tabs:
  json: JSON
  shell: cURL
---

# Programa de Retentativa das Bandeiras

**O que são retentativas?**
Quando um cliente tenta fazer uma compra com o cartão no seu negócio, a transação pode ser negada devido uma série de fatores. As tentativas seguintes de concluir a transação usando o mesmo cartão é o que chamamos de retentativa.

**O que mudou?**
Cada bandeira de cartão define os valores que serão cobrados por retentativa. A quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira. 

**E no e-commerce?**
As bandeiras de cartão definem regras diferentes para transações com cartão presente e não presente, como no caso das vendas feitas pela internet. 

**Qual o impacto para o cliente?** 
Os clientes que não seguirem as regras serão penalizados com a cobrança de tarifas por transações excedidas, de acordo com cada programa das bandeiras.

Visando melhorar a experiência de compra, o mercado de meios de pagamento, em conjunto com a ABECS, promoveu a padronização nos códigos de respostas das transações recusadas feitas por cartão.
As tentativas foram classificadas como:

* **Irreversível: Nunca realizar retentativa.**
Significa, por exemplo, que o cartão está cancelado para uso, foi perdido ou roubado, há uma fraude confirmada, a transação não é permitida para aquele produto, indicando que não há circunstâncias nas quais o emissor concederia uma aprovação. Qualquer tentativa de autorização que antes tenha recebido uma recusa Irreversível sem alteração de algum campo da mensageria não obterá sucesso. 

* **Reversível: Permitido realizar retentativa.**
Significa que o emissor pode aprovar, mas não pode fazê-lo agora, possivelmente devido a um problema do sistema (inoperante) ou falta de limite, suspeita de fraude ou excedeu número de tentativas de digitação da senha. São decisões de recusas temporárias tomadas pelo emissor que podem mudar com o tempo.
As bandeiras Visa, Mastercard, Elo e Hipercard ajustaram suas regras para limitar a quantidade de tentativas de autorização para uma transação negada. Essas mudanças preveem a cobrança de tarifas para o excesso de tentativas. Abaixo as regras de cada bandeira. 

## Mastercard

A Bandeira Mastercard possui o programa Transaction Processing Excellence (TPE), onde engloba 2 categorias:

* **1. Excessive Attempts** – monitora as retentativas de transações negadas, nos ambientes de cartão presente e cartão não presente. Válido tanto para códigos de negadas reversíveis quanto irreversíveis. 

* **2. Merchant Advice Code Transaction Excellence (MAC)**– monitora as retentativas de transações negadas, nos ambientes de cartão não presente e que são irreversíveis. Cobrança somente nos (MAC) 03 e 21.

**1. Excessive Attempts**
    
São cobranças efetuadas quando o estabelecimento comercial excede as regras de retentativas de transações.

A bandeira também realiza o monitoramento para qualquer autorização de valor nominal, aprovada, com estorno subsequente para transações abaixo de 1 unidade de moeda inteira ou o equivalente a US$ 1. 

A monitoração é aplicada para as retentativas de transações de compras negadas e aprovadas, realizadas em ambiente de cartão presente e cartão não presente.

|Categorias|Códigos|Vigência|Tarifa Doméstica|Tarifa Internacional|Quando Ocorre|Permitido Retentar|
|---|---|
|Cartão presente e Cartão não presente|Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts"|Até 31/01/2023|R$ 2,00 |-|A partir 11ª retentativa|Permitido retentar em 24h.|
|Cartão presente e Cartão não presente|Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts"|Nova regra a partir de 01/02/2023|R$ 2,00 |-|A partir 8ª retentativa|Permitido retentar em 24h.|

* Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, e mesmo número de estabelecimento;
* A Mastercard prorrogou a data de vigência para o dia 01/02/2023 referente as novas regras do programa (Excessive Attempts) antes prevista para início do dia 01/11/2022, abaixo as mudanças. 
