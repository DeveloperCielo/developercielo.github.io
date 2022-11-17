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

# Mastercard

A Bandeira Mastercard possui o programa Transaction Processing Excellence (TPE), onde engloba 2 categorias:

* **1. Excessive Attempts** – monitora as retentativas de transações negadas, nos ambientes de cartão presente e cartão não presente. Válido tanto para códigos de negadas reversíveis quanto irreversíveis. 

* **2. Merchant Advice Code Transaction Excellence (MAC)**– monitora as retentativas de transações negadas, nos ambientes de cartão não presente e que são irreversíveis. Cobrança somente nos (MAC) 03 e 21.

## 1. Excessive Attempts

São cobranças efetuadas quando o estabelecimento comercial excede as regras de retentativas de transações.

A bandeira também realiza o monitoramento para qualquer autorização de valor nominal, aprovada, com estorno subsequente para transações abaixo de 1 unidade de moeda inteira ou o equivalente a US$ 1. 

A monitoração é aplicada para as retentativas de transações de compras negadas e aprovadas, realizadas em ambiente de cartão presente e cartão não presente.

|Categorias|Códigos|Vigência|Tarifa Doméstica|Tarifa Internacional|Quando Ocorre|Permitido Retentar|
|---|---|
|Cartão presente e Cartão não presente|Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts"|Até 31/01/2023|R$ 2,00 |-|A partir 11ª retentativa|Permitido retentar em 24h.|
|Cartão presente e Cartão não presente|Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts"|Nova regra a partir de 01/02/2023|R$ 2,00 |-|A partir 8ª retentativa|Permitido retentar em 24h.|

* Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, e mesmo número de estabelecimento;
* A Mastercard prorrogou a data de vigência para o dia **01/02/2023** referente as novas regras do programa **(Excessive Attempts)** antes prevista para início do dia 01/11/2022, abaixo as mudanças. 

* 1. O excesso considerado no programa ocorrerá a partir da oitava retentativa dentro do mês de apuração os valores cobrados sofreram alteração. 
* 2. E à Mastercard também está introduzindo um limite de 35 tentativas recusadas no mesmo cartão e mesmo número de estabelecimento por período contínuo de 30 dias. Mesmo se o cliente não ultrapassar o limite de 7 retentativas no período de 24h, mas ultrapassar a quantidade do limite mensal a cobrança será aplicada

> Obs: A regra vigente do programa Excessive Attempts é válida até 31/01/2023 tabela acima, onde é permitido apenas 10 tentativas de aprovar uma mesma transação (no mesmo cartão, e mesmo número de estabelecimento), permitido retentar após 24h.

## 2. Merchant Advice Code Transaction Excellence (MAC)**

São cobranças efetuadas quando o estabelecimento comercial realiza retentativa de envio de autorização para códigos de respostas irreversíveis com um mesmo cartão valido para cartão não presente.

Dentro desse programa de retentativas, há programas que se destinam especificamente ao cenário de **“Não tente esta transação novamente”**. Para esses casos a Mastercard identifica as transações com os seguintes valores: MAC 03 e MAC 21, por exemplo.

O programa MAC comporta alguns valores, porém **somente os MACs 03 e 21 possuem uma cobrança específica**. Os demais MACs não se enquadram nessa cobrança MAC 03/21.

Os outros códigos MACs: 01, 02, 04, 24, 25, 26, 27, 28, 29 e 30 não entram no programa de cobrança do MAC mas entram na cobrança do programa Excessive Attempts, caso exceda os limites.

Desde **14/10/2022** a Mastercard introduziu novos códigos MAC, quando um emissor recusa uma transação com o código de resposta 51 (Fundos Insuficiente) seguido de um dos MAC abaixo, para que o comerciante tome a melhor ação. 

|MAC|Descrição|Descrição|
|---|---|---|
|01|Informações da nova conta disponíveis (ABU)|Necessidade de realizar atualização dos dados da conta que está sendo utilizada na transação, utilizando o ABU, por exemplo.|
|02|Não pode aprovar no momento, tente depois|Devem tentar novamente a transação após 72 horas ou tentar a transação com um método de pagamento diferente.|
|03|Não é permitido retentar|Devem buscar outro meio de garantir o pagamento, evitando custos desnecessários de várias solicitações de autorização que continuarão a resultar em declínios|
|04|Requisitos de token não atendidos para este token modelo|Necessidade de realizar revisão dos requisitos de token, pois não foram atendidos para este token modelo enviado na transação|
|21|Plano cancelado|Cliente realiza cancelamento de plano e mesmo após o cancelamento, estabelecimento continua enviando solicitação de autorização de compra.|
|24|Tente novamente após 1 hora|Válido somente para o código de resposta 51 (Insuficiência de fundos)|
|25|Tente novamente após 24 horas|Válido somente para o código de resposta 51 (Insuficiência de fundos)|
|26|Tente novamente após 2 dias|Válido somente para o código de resposta 51 (Insuficiência de fundos)|
|27|Tente novamente após 4 dias|Válido somente para o código de resposta 51 (Insuficiência de fundos)|
|28|Tente novamente após 6 dias|Válido somente para o código de resposta 51 (Insuficiência de fundos)|
|29|Tente novamente após 8 dias|Válido somente para o código de resposta 51 (Insuficiência de fundos)|
|30|Tente novamente após 10 dias|Válido somente para o código de resposta 51 (Insuficiência de fundos)|

Além disso, alguns códigos de retorno deixarão de ser enviados:

* 04 (Cartão de Captura)
* 14 (Número de cartão inválido)
* 41 (Cartão Perdido)
* 43 (Cartão Roubado)
* 54 (Cartão Expirado)
* 57 (Transação Não Permitida)
* 62 (Cartão Restrito)
* 63 (Violação de Segurança)

**Categorização de retornos Mastercard**

A Mastercard poderá consolidar alguns códigos de respostas dos emissores, que muitas vezes podem não indicar ao comerciante se pode ou não retentar, em 3 de uso exclusivo Mastercard:

* 79 (Ciclo de vida)
* 82 (Política)
* 83 (Fraude/ Segurança)

Os códigos originais serão substituídos pelo Merchant Advice Code (MAC), que acompanharão os códigos 79, 82 e 83 para determinar se a transação pode ou não ser retentada.

**Por exemplo:**

|Quando|Então|E o código de resposta|
|---|---|
|O emissor recusar a transação usando o código de resposta 54 (Cartão Expirado)|A Mastercard substituirá o código 54 para o código 79 (Recusa por ciclo de vida)|Acompanha o devido Merchant Advice Code (MAC)|

## Programa de retentativas MAC 03 e MAC 21

**Forma de apuração:**

* Serão consideradas as transações de cartão não presente;
* São consideradas como retentativas todas as transações de pagamento no mesmo cartão e mesmo número de estabelecimento; 
* São contabilizadas as retentativas no programa MAC com os valores MAC 03 e MAC 21;
* Valido para qualquer código de resposta,
* O excesso contabilizado no programa ocorrerá a partir da 1ª retentativa dentro do mês de apuração;
* O contador é zerado após o período de 30 dias;
* As retentativas podem ser cobradas nos MACs 03/21 e no Excessive Attempts caso ultrapasse o limite de cada programa;
* Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de 01 de janeiro de 2023, como listado abaixo;

**Tabela de valores:**

|Número de retentativa|Regra|
|---|---|
|A partir 1ª rententativa|R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª|

# Visa

**O que é?**

Um programa instituído pela Bandeira Visa que gera cobranças quando o estabelecimento comercial excede as regras de retentativas.

* Valido para transações com cartão presente e cartão não presente;
* **Códigos reversíveis:** Permitido até 15 tentativas de aprovar uma mesma transação (mesmo cartão, mesmo estabelecimento e valor) no período de 30 dias. Após os 30 dias iniciais (a contar da 1ª tentativa), qualquer retentativa será cobrada. 
* **Códigos irreversíveis:** Permitido apenas 01 tentativa de aprovar uma mesma transação (mesmo cartão, mesmo estabelecimento), na 2 tentativa será cobrado.
* Após uma transação aprovada o contador é zerado.

**Tarifas**: Ao ultrapassar os limites de tentativas estabelecidos pela bandeira, haverá uma cobrança de tarifa para cada transação excedente.

* Doméstico: USD 0,10 + 13,83% de Imposto
* Estrangeiro: USD 0,25 + 13,83% de Imposto

Regras de autorização já vigentes. A cobrança de tarifas é aplicada desde abril de 2021.

**A Visa agrupou os códigos de retorno em 4 Categorias.**

**Categoria 1 - Emissor nunca aprovará.**

Para essa categoria, indica que o cartão foi cancelado ou nunca existiu ou que a negativa é resultado de uma restrição permanente ou condição de erro que impedirá uma aprovação futura.

**Categoria 2 - Emissor não pode aprovar neste momento.**

Indicam que a negativa é resultado de uma condição temporária tal como risco de crédito, controles de velocidade do emissor ou outras restrições do cartão que podem permitir uma retentativa da transação ser aprovada. Em alguns casos, a negativa requer uma ação do portador ou emissor para remover a restrição antes que uma aprovação possa ser obtida.

**Categoria 3 - Qualidade de dados/revisar dados.**

Quando um erro de dados é identificado pelo emissor essa transação é declinada como consequência. Os estabelecimentos devem revalidar dados de pagamentos antes de retentar. Estabelecimentos e Credenciadores devem monitorar estes códigos de negativas devido a exposição potencial a fraudes.

> Atenção: A categoria 3 tem além dos limites considerados na categoria 2 um limite diferente, onde ele é cumulativo. Um estabelecimento pode realizar até 10.000 transações em um período de 30 dias (neste caso considerando apenas o número do estabelecimento e códigos de negadas). Se ultrapassar o limite, todas as transações recusadas por categoria 3 serão tarifadas.

**Categoria 4 - Códigos de respostas genéricos.**

A categoria 4 inclui todos os outros códigos de resposta de recusa, muitos dos quais fornecem pouco ou nenhum valor para Adquirentes/Comerciantes como parte de sua estratégia de nova tentativa. O uso do emissor deve permanecer mínimo.

A maioria das condições de recusa tem códigos de resposta descritivos nas Categorias 1, 2 e 3 para indicar o motivo da recusa. No entanto, pode haver circunstâncias em que não haja valor de código de resposta para uma condição de declínio específica. Emissores pode usar outros valores de códigos de resposta definidos nas Especificações Técnicas VisaNet; no entanto, o uso deve permanecer mínimo. 

Os emissores devem usar códigos de resposta que reflitam com mais precisão o motivo das recusas. Categorias 1 (o emissor nunca aprovar), 2 (o emissor não pode aprovar neste momento) e 3 (Qualidade dos dados) devem ser usados, e os emissores devem limitar o uso de Categoria 4 (Código de Resposta Genérico) para transações onde nenhum outro valor se aplica. A taxa do Código de Resposta Genérico é cobrada para garantir que não mais do que a porcentagem aprovada regionalmente2 do total de recusas do emissor sejam categorizadas como Categoria 4. Os emissores que excederem o limite definido regionalmente receberão a Taxa de Código de Resposta Genérica por base de transação para cada declínio em excesso do limite definido.

**Tabela com as regras e códigos de recusa.**

![VISA](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/retentativa_visa.png)

**Obs:** O código de resposta 14 aparece nas categorias 1 e 3 porem a contabilização é a seguinte:

Na categoria 1 o EC é tarifado a partir da 2ª tentativa para o (mesmo estabelecimento e mesmo cartão) **não permitido retentar.** 

Na categoria 3 compõe o grupo de códigos para contabilização das 10.001 transações, após o EC atingir 10.000 retentativas com o este grupo de códigos, qualquer transação será contabilizada independente do Cartão.

**Exemplo:** Tivemos 10.000 transações negadas em um EC com os códigos de categoria 3, se a transação 10.001 for no código 14 ou em qualquer código do grupo de categoria 3 ele será tarifado independente do cartão.

# Elo

**O que é?**

Trata-se de um programa instituído pela Bandeira ELO que gera cobranças quando o estabelecimento comercial excede as regras de retentativas de transações com um mesmo cartão. 

**Formas de Apuração**

* Retentativas: todas transações de pagamento no mesmo - cartão, validade, valor, Merchant ID (MID) - dentro de 30 dias
* Códigos contabilizados: todos de negativas​
* Excesso: a partir da 16ª retentativa no mês​*
* Tarifa: R$ 0,80 (oitenta centavos) por retentativa, a partir da 16º
* Cobrança: A cobrança só será feita em casos de recorrência, sendo assim, o estabelicimento tem que estar pelo menos 2 meses consecutivos no programa.
* Contabilização do excesso: É baseado nos controles internos da Elo. 1º ao último dia corrido do mês

**A tabela abaixo exemplifica como será feito a cobrança pela bandeira.**

|Mês|Cenário|Cobrança|
|---|---|---|
|1º (agosto)|EC Excede limites|Advertência|
|2º (setembro)|EC Não excede Limites|Não gera cobrança|
|3º (outubro)|EC Excede limites|Neste caso será advertido novamente. A cobrança só será feita em caso de recorrência.|
|4º (novembro)|EC Excede limites|Aplicação da multa|
|5º (dezembro)|EC Excede limites|Aplicação da multa|
|6º (janeiro)|EC Não excede Limites|Não gera cobrança|
|7º (fevereiro)|EC Excede limites|Será advertido novamente.|

**Início de vigência: 1º de agosto de 2022**

**Relação de códigos de recusa:**

Os códigos de respostas abaixo, estão listados conforme manual de autorização da bandeira. 
