---
layout: tutorial
title: Programa de Rententativa das Badeiras
description: Programa de Rententativa das Badeiras
search: true
translated: true
toc_footers: true
categories: tutorial
sort_order: 8
tags:
  - API Pagamento
  - Checkout
  - Webservice 1.5
  - Link de Pagamento
---

# Programa de Retentativa das Bandeiras

**O que são retentativas?** Quando um cliente tenta fazer uma compra com o cartão de crédito no seu negócio, a transação pode ser negada devido uma série de fatores. As tentativas seguintes de concluir a transação usando o mesmo cartão é o que chamamos de retentativa.

**O que mudou?** Cada bandeira de cartão define os valores que serão cobrados por retentativa. A quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira. 

**E no e-commerce?** As bandeiras de cartão definem regras diferentes para transações com cartão presente e não presente, como no caso das vendas feitas pela internet. 

**Qual o impacto para o cliente?** Os clientes que não seguirem as regras serão penalizados com a cobrança de tarifas por transações excedidas.

Visando melhorar a experiência de compra, o mercado de meios de pagamento, em conjunto com a ABECS, promoveu a padronização nos códigos de respostas das transações recusadas feitas por cartão.

Como pode ver no link Códigos de retorno (ABECS), as tentativas foram classificadas como:

* **Irreversível: Nunca realizar retentativa.** Significa, por exemplo, que o cartão está cancelado para uso, foi perdido ou roubado, há uma fraude confirmada, a transação não é permitida para aquele produto, indicando que não há circunstâncias nas quais o emissor concederia uma aprovação. Qualquer tentativa de autorização que antes tenha recebido uma recusa Irreversível sem alteração de algum campo da mensageria não obterá sucesso.

* **Reversível: Permitido realizar retentativa.** Significa que o emissor pode aprovar, mas não pode fazê-lo agora, possivelmente devido a um problema do sistema (inoperante) ou falta de limite, suspeita de fraude ou excedeu número de tentativas de digitação da senha. São decisões de recusas temporárias tomadas pelo emissor que podem mudar com o tempo.

As bandeiras Visa, Mastercard, Elo e Hipercard ajustaram suas regras para limitar a quantidade de tentativas de autorização para uma transação negada. Essas mudanças preveem a cobrança de tarifas para o excesso de tentativas.

# Mastercard

A Bandeira Mastercard possui 2 programas de retentativas de transações?
* **TPE (Transaction Processing Excellence)** - É o programa para monitorar as retentativas de transações, tanto compras aprovadas quanto negadas, valido para cartão presente e cartão não presente. 
* **MAC (Merchant Advice Code Transaction Excellence)** - É o programa para monitorar as retentativas de transações negadas, valido para cartão não presente. São um conjunto de códigos que a Mastercard suporta para que os emissores comuniquem aos comerciantes os motivos para aprovar ou rejeitar uma transação.

###TPE###
O que é? São cobranças efetuadas quando o estabelecimento comercial excede as regras de retentativas de transações. 

|Categorias|Códigos|Tarifa Doméstica|Tarifa Internacional|Quando Ocorre|Permitido Retentar|
|---|---|
|**Cartão presente e Cartão não presente**|Qualquer código de negativa que é permitido retentar|R$2,00|-|A tarifa se aplica à 11ª nova tentativa dentro do período de 24h.|Permitido retentar após 24h.|

*Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, mesma validade, mesmo valor e mesmo número de estabelecimento;
*Serão contabilizadas, também, as retentativas quando a transação já foi aprovada;
*A partir de 01/11/2022, o excesso considerado no programa ocorrerá a partir da sétima retentativa dentro do mês de apuração* e nas condições acima descritas; 

###Transação de consulta de status de conta (ASI - Account Status Inquiry)
**O que é?**São Cobranças efetuadas quando o estabelecimento comercial realiza uma compra no valor de R$1,00 e depois efetua o estorno, para realizar a verificação de status de consta. 
Para tal situação existe um tipo de transação especifica que deve ser utilizada para realizar a consulta de status de conta. Já vigente: 01 de julho 2019

**Forma de apuração:**
*Serão consideradas as transações de cartão não presente;
*Serão consideradas todas as transações de pagamento feitas no valor de R$1,00 e realizado o estorno logo em seguida; 
*Tarifa se aplica imediatamente quando identificado o estorno desse tipo de transação;
*A contabilização do excesso de retentativas será baseado nos controles internos da Mastercard. 

(*) 1º ao último dia corrido do mês

|Número de Retentativas|Regra|
|---|---|
|**1ª transação indevida**|**R$ 0,21 por transação**|

###MAC###

**O que é?**São cobranças efetuadas quando o estabelecimento comercial realiza retentativa de envio de autorização para códigos de respostas irreversíveis com um mesmo cartão valido para cartão não presente.
Dentro desse programa de retentativas, há programas que se destinam especificamente ao cenário de “Não tente esta transação novamente”. Para esses casos a Mastercard identifica as transações com os seguintes valores: MAC 03 e MAC 21, por exemplo.

O programa MAC comporta os seguintes valores: MAC 01, MAC 02, MAC 03, MAC 04 e MAC 21.

* **MAC 01** – Novas informações de conta disponíveis 
* **MAC 02** – Não é possível aprovar no momento tente mais tarde
* **MAC 03** – Não tente novamente
* **MAC 04** – Requisitos de token não atendidos para este tipo de token
* **MAC 21** – Cancelamento de pagamento

A partir de 14/10/2022 a Mastercard vai introduzir novos códigos MAC, quando um emissor recusa uma transação com o código de resposta 51 (Fundos Insuficiente) seguido de um dos MAC abaixo, para que o comerciante tome a melhor ação. 

|MAC|Descrição|
|---|---|
|24|Tente novamente após 1 hora|
|25|Tente novamente após 24 horas|
|26|Tente novamente após 2 dias|
|27|Tente novamente após 4 dias|
|28|Tente novamente após 6 dias|
|29|Tente novamente após 8 dias|
|30|Tente novamente após 10 dias|

**Categorização de retornos Mastercard**
A Mastercard poderá consolidar alguns códigos de respostas dos emissores, que muitas vezes podem não indicar ao comerciante se pode ou não retentar, em 3 de uso exclusivo Mastercard:

* 79 (Ciclo de vida)
* 82 (Política)
* 83 (Fraude/ Segurança)

Os códigos originais serão substituídos pelo Merchant Advice Code (MAC), que acompanharão os códigos 79, 82 e 83 para determinar se a transação pode ou não ser retentada.

**Por exemplo:**
|Quando|Então|E o código da resposta|
|---|---|
|O emissor recusar a transação usando o código de resposta 54 (Cartão Expirado)|A Mastercard substituirá o código 54 para o código 79 (Recusa por ciclo de vida)|Acompanha o devido Merchant Advice Code (MAC)|

**A tabela abaixo detalha como ocorrerá a combinação do código de resposta e do MAC:**
|Quando o código de resposta é...|E o MAC é...|A descrição do MAC será|
|---|---|
|79 ou 82|01|Verifique se há novas informações antes de tentar novamente.|
|79 ou 82|03|Não foram encontradas credenciais atualizadas. Não tente novamente.|
|83|01|Autenticação pode aumentar a probabilidade de aprovação. Tente novamente usando autenticação (Ex: 3DS).|
|83|03|Suspeita de fraude. Não tente novamente.|
|79,82 ou 83|02|Repita a transação mais tarde.|

**Programa de retentativas MAC 01**
Início de vigência da regra: Já vigente
Início de vigência da tarifa: 01 de janeiro de 2023

**Forma de apuração:**
*Serão consideradas as transações de cartão não presente;
*Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, mesma validade, mesmo valor e mesmo número de estabelecimento;
*São contabilizadas as retentativas no programa MAC com os valores MAC 01;
*São contabilizados os códigos de resposta negada diferentes de: 79, 82 e 83;
*Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de janeiro/2023, como listado abaixo;
*A contabilização do excesso de retentativas será baseado nos controles internos da Mastercard.
(*) 1º ao último dia corrido do mês

**Tabela de valores:**
|Número de Retentativa|Regra|
|---|---|
|**A partir 1ª rententativa**|R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª nova tentativa dentro do período de 24h.|

**Programa de retentativas MAC 02**
Início de vigência da regra: Já vigente
Início de vigência da tarifa: 01 de janeiro de 2023

**Forma de apuração:**
*Serão consideradas as transações de cartão não presente;
*Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, mesma validade, mesmo valor e mesmo número de estabelecimento;
*São contabilizadas as retentativas no programa MAC com os valores MAC 02;
*São contabilizados os códigos de resposta negada diferentes de: 79, 82 e 83;
*Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de janeiro/2023, como listado abaixo;
*A contabilização do excesso de retentativas será baseado nos controles internos da Mastercard.
(*) 1º ao último dia corrido do mês

**Tabela de valores:**
|Número de Retentativa|Regra|
|---|---|
|**A partir 1ª rententativa**|R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª nova tentativa dentro do período de 72h.|

**Programa de retentativas MAC 03 e MAC 21**
Início de vigência da regra: Já vigente
Início de vigência da tarifa: 01 de janeiro de 2023

**Forma de apuração:**
*Serão consideradas as transações de cartão não presente;
*São consideradas como retentativas todas as transações de pagamento no mesmo cartão, mesma validade, mesmo valor e mesmo número de estabelecimento;
*São contabilizadas as retentativas no programa MAC com os valores MAC 03 e MAC 21;
*São contabilizados qualquer código de resposta negada, exceto os códigos 00, 08, 10, 79, 82, 83, 85 e 87;
*O excesso contabilizado no programa ocorrerá a partir da primeira retentativa dentro do mês de apuração* e nas condições acima descritas; 
*Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de janeiro/23, como listado abaixo;
*A contabilização do excesso de retentativas será baseado nos controles internos da Mastercard. 
(*) 1º ao último dia corrido do mês

**Tabela de valores:**
|Número de Retentativa|Regra|
|---|---|
|**A partir 1ª rententativa**|R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª|

**Programa de retentativas MAC 01, 02 e MAC 03 – Códigos de respostas 79, 82 e 83**
Início de vigência da regra e tarifa: 03 de outubro de 2022

**Forma de apuração:**
*Serão consideradas as transações de cartão não presente;
*Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, mesma validade, mesmo valor e mesmo número de estabelecimento;
*São contabilizadas as retentativas no programa MAC com os valores MAC 01, MAC 02 e MAC 03;
*São contabilizados os códigos de resposta negada: 79, 82 e 83;
*A partir de 03/10/2022, o excesso considerado no programa ocorrerá a partir da primeira retentativa dentro do mês de apuração* e nas condições acima descritas; 
*A contabilização do excesso de retentativas será baseado nos controles internos da Mastercard. 
(*) 1º ao último dia corrido do mês

**Tabela de valores:**
|Número de Retentativa|Regra|
|---|---|
|**A partir 1ª rententativa**|3.4 bps com valor mínimo R$0.00160 e máximo R$ 0.7700R$ por retentativa, a partir da 1ª |

#VISA

**O que é?**

Um programa instituído pela Bandeira Visa que gera cobranças quando o estabelecimento comercial excede as regras de retentativas.

*Valido para transações com cartão presente e cartão não presente;
*Códigos reversíveis: Permitido até 15 tentativas de aprovar uma mesma transação (mesmo cartão e mesmo estabelecimento) no período de 30 dias;
*Códigos irreversíveis: Permitido apenas 01 tentativa de aprovar uma mesma transação (mesmo cartão e mesmo estabelecimento) no período de 30 dias.

- Tarifas: Ao ultrapassar os limites de tentativas estabelecidos pela bandeira, haverá uma cobrança de tarifa para cada transação excedente.

*Cartões domésticos: USD 0,10 (dólar) para cada transação doméstica excedente.
*Cartões internacionais: USD 0,25 (dólar) para cada transação internacional excedente.
*Regras de autorização estão vigentes. A cobrança de tarifas será aplicada a partir de abril de 2021.

#Elo

**O que é?**

Trata-se de um programa instituído pela Bandeira ELO que gera cobranças quando o estabelecimento comercial excede as regras de retentativas de transações com um mesmo cartão. 

**Formas de Apuração**
*Retentativas: todas transações de pagamento no mesmo - cartão, validade, valor, Merchant ID (MID) - dentro de 30 dias
*Códigos contabilizados: todos de negativas
*Excesso: a partir da 16ª retentativa no mês
*Contabilização do excesso: é baseado nos controles internos da Elo.
(*) 1º ao último dia corrido do mês

**Tabela de valores:**
|Período|Valores|
|---|---|
|**1º**|**Advertência**|
|A partir do 2º mês|R$ 0,80 (oitenta centavos) por retentativa, a partir da 16º|
Início de vigência: 1º de agosto de 2022

#Hipercard

**O que é?**

Cobranças efetuadas quando um Estabelecimento Comercial excede as regras de Retentativas de transações negadas com um mesmo cartão, mesma data ou período mensal, mesmo valor e mesmo número de Estabelecimento comercial, conforme abaixo:​ 

|Programa|Cartão Presente - CP|Cartão não Presente - CNP|
|---|---|
|Excesso de Retentativa​|R$ 1,85 por Retentativas a partir da 9ª resposta negada – mesmo cartão e mesmo dia2|R$ 1,85 por Retentativas a partir da 9ª resposta negada – mesmo cartão e mesmo mês3 de referência|
|Retentativa de transação ASI1 (Zero Auth)|R$ 0,15 por retentativa de transação ASI após negativa do emissor – mesmo cartão e mesmo dia2|R$ 0,15 por retentativa de transação ASI após negativa do emissor – mesmo cartão e mesmo mês3 de referência|
|Retentativa de transação irreversível|0,03% do valor da transação por retentativa​ Mínimo R$ 0,15​ Máximo R$ 0,80​ Mesmo cartão e mesmo dia2 após resposta com código irreversível|0,03% do valor da transação por retentativa​ Mínimo R$ 0,15​ Máximo R$ 0,80​ Mesmo cartão e mesmo mês3 após resposta com código irreversível|

###PED: Programa de Excesso de Disputas###
**Detalhes:

*Transações ASI1: são transações Account Status Inquiry, ou seja, são as transações efetuadas para consultar o status de um cartão (verificar se está ativo). Para esse fim, não devem ser usadas transações financeiras e sim transações específicas.​
*Tentativas por dia2: considerar para efeito do programa de Retentativas da Hipercard de 00h00 a 23h59​
*Mês de referência3: considerar para efeito do programa de Retentativas da Hipercard dia 01 a 30 ou 31 do mês em que ocorreu a transação. A cobrança será enviada após o fechamento do mês subsequente.​
*Os códigos de transações consideradas irreversíveis pelo emissor foram categorizados pela indústria de pagamentos e autorregulação da ABECS, por meio do Normativo 21 vigente. Códigos de retorno (ABECS)

###Demais bandeiras

Códigos reversíveis: serão permitidas novas retentativas para o mesmo cliente e cartão. Não há limite e período pré-estabelecido;

Importante que você siga a orientação recebida na resposta da transação negada, antes de realizar uma nova tentativa.

Códigos Irreversíveis: não serão permitidas autorizações para o mesmo cartão ou estabelecimento, depois de receber 1º resposta de recusa do emissor.
