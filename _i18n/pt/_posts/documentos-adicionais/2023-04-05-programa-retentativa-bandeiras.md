---
layout: tutorial
title: Programa de Retentativa das Bandeiras
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Documentos Adicionais
---

# Programa de Retentativa das Bandeiras

**O que são retentativas?**

Quando uma pessoa tenta fazer uma compra com cartão na sua loja, a transação pode ser negada devido a uma série de fatores. As **tentativas seguintes de concluir a transação** usando o mesmo cartão é o que chamamos de **retentativa**.

> **Importante**: As transações de compra com cartão (presente e não presente) e [Zero Auth](https://developercielo.github.io/manual/cielo-ecommerce#zero-auth){:target="_blank"} (validação do cartão) estão sujeitas às regras das bandeiras para retentativas.

**O que mudou?**

Cada bandeira de cartão define os valores que serão cobrados por retentativa. A quantidade de vezes que uma transação pode ser retentada antes da cobrança também varia de acordo com a bandeira.

**E no e-commerce?**

As bandeiras de cartão definem regras diferentes para transações com cartão presente e não presente, como no caso das vendas feitas pela internet.

**Qual o impacto para a loja?**

Os e-commerces que não seguirem as regras serão penalizados com a cobrança de tarifas por transações excedidas, de acordo com o programa de cada bandeira.

Visando melhorar a experiência de compra, o mercado de meios de pagamento, em conjunto com a ABECS, promoveu a padronização nos códigos de respostas das transações recusadas feitas por cartão. As tentativas foram classificadas em dois tipos:

> - <p>&#10060; **Irreversível: nunca realizar retentativa**</p><br>
>   <br>
>   Significa, por exemplo, que o cartão está cancelado para uso, foi perdido ou roubado, há uma fraude confirmada ou a transação não é permitida para aquele produto, indicando que não há circunstâncias nas quais o emissor concederia uma aprovação. Qualquer tentativa de autorização que, após uma recusa **irreversível**, não tenha alterado nenhum campo da mensageria, não obterá sucesso.<br>
>   <br>
> - <p>&#9989; **Reversível: permitido realizar retentativa**</p><br>
>   <br>
>   Significa que o emissor pode aprovar a transação, mas não pode fazê-lo agora, possivelmente devido a um problema do sistema (inoperante) ou falta de limite, suspeita de fraude ou excesso de número de tentativas de digitação da senha. São decisões de recusas temporárias tomadas pelo emissor que podem mudar com o tempo.

As bandeiras Visa, Mastercard e Elo ajustaram suas regras para limitar a quantidade de tentativas de autorização para uma transação negada. Essas mudanças preveem a cobrança de tarifas para o excesso de tentativas. Confira a seguir as regras de cada bandeira.

* [Mastercard](https://developercielo.github.io/tutorial/programa-retentativa-bandeiras#mastercard){:target="_blank"};
* [Visa](https://developercielo.github.io/tutorial/programa-retentativa-bandeiras#visa){:target="_blank"};
* [Elo](https://developercielo.github.io/tutorial/programa-retentativa-bandeiras#elo){:target="_blank"};
* [Demais bandeiras](https://developercielo.github.io/tutorial/programa-retentativa-bandeiras#demais-bandeiras){:target="_blank"}.

# Mastercard

A bandeira Mastercard possui o programa Transaction Processing Excellence (TPE), que engloba duas categorias:

**1. Excessive Attempts**: monitora as retentativas de transações negadas nos ambientes de cartão presente e cartão não presente. Válido tanto para códigos de negadas reversíveis quanto irreversíveis.

**2. Merchant Advice Code Transaction Excellence (MAC)**: monitora as retentativas de transações negadas, nos ambientes de cartão não presente e que são irreversíveis. Haverá cobrança somente nos MACs 03 e 21.

## 1. Excessive Attempts

São cobranças efetuadas quando o estabelecimento comercial excede as regras de retentativas de transações.

A bandeira também realiza o monitoramento para qualquer autorização de valor nominal, aprovada, com estorno subsequente para transações abaixo de 1 unidade de moeda inteira ou o equivalente a US$ 1.

O monitoramento é aplicado para as retentativas de transações de compras negadas e aprovadas, realizadas em ambiente de cartão presente e cartão não presente.

**Tabela Excessive Attempts**

| Categorias                            | Códigos                                                                                                                                         | Vigência                          | Tarifa Doméstica | Tarifa Internacional | Quando Ocorre            | Permitido Retentar         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------- | -------------------- | ------------------------ | -------------------------- |
| Cartão presente e cartão não presente | Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts" | Até 31/01/2023                    | R$ 2,00          | -                    | A partir 11ª retentativa | Permitido retentar em 24h. |
| Cartão presente e cartão não presente | Qualquer código de negativa que não está atribuído ao MAC 03 e 21. E também os códigos MAC caso não respeite os limites do “Excessive Attempts" | Nova regra a partir de 01/02/2023 | R$ 2,00          | -                    | A partir 8ª retentativa  | Permitido retentar em 24h. |

- Serão consideradas como retentativas todas as transações de pagamento no mesmo cartão, e mesmo número de estabelecimento;
- A Mastercard prorrogou a data de vigência para o dia **01/02/2023** referente as novas regras do programa **(Excessive Attempts)** antes prevista para início do dia 01/11/2022. Confira as mudanças:

1. O excesso considerado no programa ocorrerá a partir da oitava retentativa dentro do mês de apuração; os valores cobrados sofreram alteração.
2. E a Mastercard também está introduzindo um limite de 35 tentativas negadas no mesmo cartão e mesmo número de estabelecimento por período contínuo de 30 dias. Mesmo se a loja não ultrapassar o limite de sete retentativas no período de 24h, mas ultrapassar a quantidade do limite mensal, a cobrança será aplicada.

> **Observação**: A regra vigente do programa Excessive Attempts é válida até 31/01/2023 (tabela Excessive Attempts), permitindo apenas 10 tentativas de aprovar uma mesma transação (no mesmo cartão, e mesmo número de estabelecimento), e é permitido retentar após 24 horas.

## 2. Merchant Advice Code Transaction Excellence (MAC)

São cobranças efetuadas quando o estabelecimento comercial realiza retentativa de envio de autorização para códigos de respostas irreversíveis com um mesmo cartão valido para cartão não presente.

Dentro desse programa de retentativas, há programas que se destinam especificamente ao cenário de **“Não tente esta transação novamente”**. Para esses casos, a Mastercard identifica as transações com os valores MAC 03 e MAC 21, por exemplo.

O programa MAC comporta alguns valores, porém **somente os MACs 03 e 21 possuem uma cobrança específica**. Os demais MACs não se enquadram nessa cobrança.

Os outros códigos MAC (01, 02, 04, 24, 25, 26, 27, 28, 29, 30, 40 e 41) não entram no programa de cobrança do MAC mas entram na cobrança do programa Excessive Attempts, caso exceda os limites.

Desde **14/10/2022** a Mastercard introduziu novos códigos MAC (24, 25, 26, 27, 28, 29 e 30) quando um emissor recusa uma transação com o código de resposta 51 (insuficiência de fundos) seguido de um dos MAC da tabela a seguir, para que o comerciante tome a melhor ação.

**Tabela com toda relação de MACs**

| MAC | Descrição                                                | Observação                                                                                                                                               |
| --- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Informações da nova conta disponíveis (ABU)              | Necessidade de realizar atualização dos dados da conta que está sendo utilizada na transação, usando o ABU, por exemplo.                                 |
| 02  | Não pode aprovar no momento, tente depois                | Tente novamente a transação após 72 horas ou tente a transação com um método de pagamento diferente.                                                     |
| 03  | Não é permitido retentar                                 | Busque outro meio de garantir o pagamento, evitando custos desnecessários de várias solicitações de autorização que continuarão a resultar em declínios. |
| 04  | Requisitos de token não atendidos para este token modelo | Há necessidade de revisar os requisitos de token, pois os requisitos não foram atendidos para este token modelo enviado na transação.                    |
| 21  | Plano cancelado                                          | Comprador realiza cancelamento de plano e mesmo após o cancelamento, estabelecimento continua enviando solicitação de autorização de compra.             |
| 24  | Tente novamente após 1 hora                              | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                    |
| 25  | Tente novamente após 24 horas                            | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                    |
| 26  | Tente novamente após 2 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                   |
| 27  | Tente novamente após 4 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                    |
| 28  | Tente novamente após 6 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                    |
| 29  | Tente novamente após 8 dias                              | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                    |
| 30  | Tente novamente após 10 dias                             | Válido somente para o código de resposta 51 (insuficiência de fundos).                                                                                    |
| 40  | Não é permitido retentar                                 | Cartão pré pago não recarregável para consumo.|
| 41  | Não é permitido retentar                                 | Cartão virtual de uso único do consumidor. |

Além disso, alguns códigos de retorno deixarão de ser enviados:

- 04 (Cartão de Captura)
- 14 (Número de cartão inválido)
- 43 (Cartão Roubado)
- 54 (Cartão Expirado)
- 57 (Transação Não Permitida)
- 62 (Cartão Restrito)
- 63 (Violação de Segurança)
  <br>
  <br>

**Categorização de retornos Mastercard**

A Mastercard poderá consolidar alguns códigos de respostas dos emissores, que muitas vezes não indicam ao comerciante se pode ou não retentar, em três códigos de uso exclusivo Mastercard:

- **79** (Ciclo de vida);
- **82** (Política);
- **83** (Fraude/ Segurança).
  <br>
  <br>

Os códigos originais serão substituídos pelo Merchant Advice Code (MAC), que acompanharão os códigos 79, 82 e 83 para determinar se a transação pode ou não ser retentada.

**Por exemplo:**

|                                     Quando                                     |                                      Então                                       |            E o código de resposta             |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :-------------------------------------------: |
| O emissor recusar a transação usando o código de resposta 54 (Cartão Expirado) | A Mastercard substituirá o código 54 para o código 79 (recusa por ciclo de vida) | Acompanha o devido Merchant Advice Code (MAC) |

**Programa de retentativas MAC 03 e MAC 21**

**Forma de apuração:**

- Serão consideradas as transações de cartão não presente;
- São consideradas como retentativas todas as transações de pagamento no mesmo cartão e mesmo número de estabelecimento;
- São contabilizadas as retentativas no programa MAC com os valores MAC 03 e MAC 21;
- Valido para qualquer código de resposta;
- O excesso contabilizado no programa ocorrerá a partir da 1ª retentativa dentro do mês de apuração;
- O contador é zerado após o período de 30 dias;
- As retentativas podem ser cobradas nos MACs 03/21 e no Excessive Attempts caso ultrapasse o limite de cada programa;
- Atualmente é aplicado o valor de tarifa de R$1,25 e esse valor será alterado a partir de 01 de janeiro de 2023, como listado a seguir.
  <br>
  <br>

**Tabela de valores:**

| Número de retentativa    | Regra                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| A partir 1ª rententativa | R$ 2,50 (dois reais e cinquenta centavos) por retentativa, a partir da 1ª retentativa. |

# Visa

O programa de retentativas instituído pela bandeira Visa gera cobranças quando o estabelecimento comercial excede as regras de retentativas. 

O objetivo é criar um equilíbrio no ecossistema de transações a fim de garantir que os credenciadores e estabelecimentos forneçam informações precisas sobre as retentativas e diminuam novas tentativas desnecessárias. 

A bandeira exige que os emissores usem códigos de resposta corretos e não genéricos, para facilitar a identificação do motivo da recusa de uma transação.

A Visa divide esses códigos em reversíveis e irreversíveis, sendo válido tanto para transações com cartão presente e cartão não presente:

* **Códigos reversíveis**: são permitidas até 15 tentativas de aprovar uma mesma transação (com mesmo cartão, transação, validade, valor e estabelecimento) no período de 30 dias. Após os 30 dias, a contar da primeira tentativa, qualquer retentativa será cobrada. Passado o período de 30 dias, o envio de uma retentativa da mesma transação, a cobrança já será aplicada.
  Dessa forma, a regra de 15 tentativas deixa de ser válida, passando a ser válido o período de 30 dias corridos.
* **Códigos irreversíveis**: é permitida apenas a 1ª tentativa de aprovar a transação (com mesmo cartão, transação, validade, valor e estabelecimento). Na segunda tentativa, a transação já será cobrada, independente do período em que for realizada.

> **Tarifas**: Ao ultrapassar os limites de tentativas estabelecidos pela bandeira, haverá uma cobrança de tarifa para cada transação excedente.
>
> - **Doméstico**: USD 0,10 + 13,83% de imposto;
> - **Estrangeiro**: USD 0,25 + 13,83% de imposto.

<br>
A cobrança de tarifas é aplicada desde abril de 2021.
<br>
<br>

A Visa agrupou os códigos de retorno em quatro categorias:

* **Categoria 1: emissor nunca aprovará**

    Indica que o cartão foi cancelado ou nunca existiu ou que a negativa é resultado de uma restrição permanente ou condição de erro que impedirá uma aprovação futura.

* **Categoria 2: emissor não pode aprovar no momento**

    Indica que a negativa é resultado de uma condição temporária tal como risco de crédito, controles de velocidade do emissor ou outras restrições do cartão que podem permitir uma retentativa da transação ser aprovada. Em alguns casos, a negativa requer uma ação do portador ou emissor para remover a restrição antes que uma aprovação possa ser obtida.

* **Categoria 3: qualidade de dados**

    Quando um erro de dados é identificado pelo emissor essa transação é declinada como consequência. Os estabelecimentos devem revalidar dados de pagamentos antes de retentar. Estabelecimentos e credenciadores devem monitorar estes códigos de negativas devido a exposição potencial a fraudes.

    > **Atenção**: A categoria 3 tem, além dos limites considerados na categoria 2, um limite diferente que é cumulativo. Um estabelecimento pode realizar até 25.000 transações em um período de 30 dias (neste caso considerando apenas o número do estabelecimento e códigos de negadas). Se ultrapassar o limite, todas as transações recusadas por categoria 3 serão tarifadas.

* **Categoria 4: códigos de respostas genéricos**

    A categoria 4 inclui todos os demais códigos de resposta de recusa que não estão nas categorias 1, 2 e 3, pois pode haver circunstâncias em que não haja valor de código de resposta para uma condição de recusa específica. Emissores podem usar outros valores de códigos de resposta definidos nas Especificações Técnicas VisaNet; no entanto, o uso deve permanecer mínimo.

Os emissores devem usar códigos de resposta que reflitam com mais precisão o motivo das recusas. Ou seja, focar nas categorias 1 (o emissor nunca aprovar), 2 (o emissor não pode aprovar neste momento) e 3 (qualidade dos dados) e evitar usar a 4 (código de resposta genérico). Os emissores devem limitar dessa categoria ao máximo. A taxa da Categoria 4 é cobrada para garantir que não mais do que a porcentagem aprovada regionalmente do total de recusas do emissor sejam categorizadas como Categoria 4. Os emissores que excederem o limite definido regionalmente receberão a Taxa de Código de Resposta Genérica por base de transação para cada declínio em excesso do limite definido.

**Tabela com as regras e códigos de recusa**:

As regras da tabela a seguir são válidas tanto para transações de compra, quanto para transações Zero Auth.

| **Categoria**   | **Tipo**     | **Códigos**    | **Regras**   |
|-----------|--------------|-------------|-------------|
| **Categoria 1**<br> **Emissor não aprovará novas tentativas**   | **Irreversível** | 04 - Reter cartão <br>07 - Reter cartão, condições especiais<br>12 - Transação inválida  <br>14* - Número de conta inválido<br>15 - Emissor não existe<br> 41 -Reter cartão (cartão perdido) <br>  43 - Reter cartão (cartão roubado)  <br>  46 - Conta encerrada   <br> 57 - Transação não permitida ao portador de cartão    <br> R0 - Parar ordem de pagamento   <br>  R1 - Revogação do pedido de autorização  <br>  R3 - Revogação de todos os pedidos de autorização  <br>   | Cobrança de tarifa a partir da 2ª tentativa. |
| **Categoria 2**<br> **Emissor não aprovará no momento; novas tentativas são permitidas** | **Reversível**   | 03 - Comerciante inválido <br> 19 - Redigitar a transação   <br>  39** - Sem conta de crédito  <br>  51 - Insuficiência de fundos  <br>  52** - Sem conta corrente  <br>  53** - Sem conta poupança  <br>  59 - Suspeita de fraude  <br>   61 - Excede os limites de valor de retiradas <br>  62 - Cartão restrito (cartão inválido na região ou país)  <br>   65 - Excede a frequência de retiradas  <br>  75 - Excedeu o número permitido de tentativas de digitação de senha    <br>  78 - Bloqueado, usado pela primeira vez ou condição especial (a conta está temporariamente bloqueada)  <br>  86 - Mal funcionamento no caixa eletrônico  <br>  91 - Emissor ou switch inoperante  <br>  93 - A transação não pode ser concluída (violação da lei)  <br>  96 - Mal funcionamento do sistema  <br>   N3 - Serviço de saque indisponível   <br>  N4 - Solicitação de dinheiro excede o limite do emissor   <br>   Z5*** - Conta válida, mas valor não suportado  <br> |Cobrança de tarifa a partir da 16ª tentativa: o estabelecimento pode retentar a mesma transação 15 vezes.<br> A partir da  16ª tentativa (com mesmo cartão, transação, validade, valor e estabelecimento) num período de 30 dias corridos a partir da 1ª tentativa, a transação será tarifada. Passado o período de 30 dias, a Visa não permite nenhuma nova tentativa. Então, caso haja envio de uma tentativa dessa mesma transação, a cobrança já será aplicada para essa retentativa enviada (daí, a regra de 15 tentativas deixa de ser válida, passado a ser válido o período de 30 dias corridos).|
| **Categoria 3** <br>Qualidade de dados  | **Reversível**   | 54 - Cartão vencido  <br>   55 - Senha incorreta  <br>    70 - Dados de PIN necessários (somente na região da Europa)    <br>   82 - Os resultados de CAM,2 dCVV,3 iCVV4 ou CVV on-line foram negativos  <br>    1A - Autenticação de cliente adicional necessária (somente na região da Europa)    <br>  6P - Falha na verificação (a identificação do titular do cartão não corresponde aos registros do emissor)    <br>    N7 - Recusa decorrente de falha do CVV2 (Visa)    |Cobrança de tarifa a partir da 16ª tentativa: o estabelecimento pode retentar a mesma transação 15 vezes.<br> A partir da  16ª tentativa (com mesmo cartão, transação, validade, valor e estabelecimento) num período de 30 dias corridos a partir da 1ª tentativa, a transação será tarifada. Passado o período de 30 dias, a Visa não permite nenhuma nova tentativa. Então, caso haja envio de uma tentativa dessa mesma transação, a cobrança já será aplicada para essa retentativa enviada (daí, a regra de 15 tentativas deixa de ser válida, passado a ser válido o período de 30 dias corridos).|
| **Categoria 4**<br>**Códigos de respostas genéricos**  | **Reversível**   | Códigos de respostas genéricos não listados nas categorias 1,2,3 |Cobrança de tarifa a partir da 16ª tentativa: o estabelecimento pode retentar a mesma transação 15 vezes.<br> A partir da  16ª tentativa (com mesmo cartão, transação, validade, valor e estabelecimento) num período de 30 dias corridos a partir da 1ª tentativa, a transação será tarifada. Passado o período de 30 dias, a Visa não permite nenhuma nova tentativa. Então, caso haja envio de uma tentativa dessa mesma transação, a cobrança já será aplicada para essa retentativa enviada (daí, a regra de 15 tentativas deixa de ser válida, passado a ser válido o período de 30 dias corridos).|

\* *O código **14** será reclassificado a partir de 24/04/2024, mas permanece na categoria 1*.

\** *Os códigos **39, 52 e 53** irão migrar da categoria 4 para a categoria 2*.

\*** *O código **Z5** é um código novo e está na categoria 2*.

> **Importante**:<br>
> Desde abril de 2023 o limite permitido da contagem total de recusas para a categoria 3, passou de 10.000 para 25.000 recusas em um ciclo de faturamento de 30 dias.

# Elo

**O que é?**

Trata-se de um programa instituído pela bandeira ELO que gera cobranças quando o estabelecimento comercial excede as regras de retentativas de transações com um mesmo cartão.

**Formas de Apuração**

- **Retentativas**: todas transações de pagamento no mesmo cartão, validade, valor e Merchant ID (MID) dentro de 30 dias;
- **Códigos contabilizados**: todos de negativas​;
- **Excesso**: a partir da 16ª retentativa no mês​\*;
- **Tarifa**: R$ 0,80 (oitenta centavos) por retentativa, a partir da 16ª;
- **Contabilização do excesso**: é baseada nos controles internos da Elo. 1º ao último dia corrido do mês.
  <br>
  <br>

<aside class="notice">Início de vigência: 1º de agosto de 2022.</aside>

**Relação de códigos de recusa Elo:**

Os códigos de respostas abaixo estão listados conforme manual de autorização da bandeira.

| CÓDIGOS | DESCRIÇÃO                                      | QUANDOO EMISSOR DEVE UTILIZAR O CÓDIGO DE RESPOSTA                                                                                                                                                                                                                                                                                                                                                                                                                                                           | RETENTATIVA  |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| 4       | REFAZER A TRANSAÇÃO                            | Esse código deve ser usado pelo Emissor para solicitar que o portador/EC realize novamente a transação caso ele (Emissor) detecte falha na captura das informações da transação ou caso seja necessário atualização da senha negando a 1ª transação                                                                                                                                                                                                                                                          | Reversível   |
| 5       | GENÉRICA                                       | A Bandeira poderá utilizar esse código para outras tratativas (genérica).                                                                                                                                                                                                                                                                                                                                                                                                                                    | Reversível   |
| 6       | CONSULTAR CREDENCIADOR                         | Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que não necessitem de mudanças na mensageria para que a transação siga o fluxo correto.                                                                                                                                                                                                                                                                                                                           | Reversível   |
| 12      | ERRO NO CARTÃO                                 | - Esse código deve ser usado pelo Emissor quando ele identificar falha na validação do CAVV de transações 3DS ou tokenizada.<br>- Esse código deve ser usado pelo Emissor quando identificar CÓDIGO DE SERVIÇO incorreto/inválido para cartões físicos.<br>- Esse código deve ser usado pelo Emissor para problemas identificados no TOKEN<br>- Este código deve ser utilizado para negar reversões e avisos de reversão onde a transação original não é localizada pelo Emissor.                            | Irreversível |
| 13      | VALOR DA TRANSAÇÃO INVÁLIDA                    | - Esse código deve ser usado pelo Emissor quando identificar que o valor da transação é inválido de acordo com os parâmetros do Emissor.                                                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 14      | NÚMERO DO CARTÃO INVÁLIDA                      | - Esse código deve ser utilizado pelo Emissor para Nº DO CARTÃO INVÁLIDO/INCORRETO.<br>- A Bandeira poderá utilizar esse código para outras tratativas.                                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| 19      | PROBLEMAS ADQUIRENTE                           | - Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que necessitem de mudanças na mensageria para que a transação siga o fluxo correto.                                                                                                                                                                                                                                                                                                                             | Irreversível |
| 23      | VALOR DA PARCELA INVÁLIDO                      | - Esse código deve ser utilizado pelo Emissor quando o VALOR DA PARCELA ESTÁ FORA DOS LIMITES estabelecidos por ele. Esse código deve ser utilizado quando o emissor não aceitar o produto Elo Parcelado Loja (produto 072) com o número de parceladas menor que 12.                                                                                                                                                                                                                                         | Irreversível |
| 30      | ERRO DE FORMATO DA MENSAGEM                    | - Esse código deve ser usado pelo Emissor quando ele identificar ERRO DE FORMATO NA MENSAGERIA (campo obrigatório, domínios, formatos, tamanho não presentes ou divergentes da especificação).                                                                                                                                                                                                                                                                                                               | Irreversível |
| 38      | COMPRA/EXCEDIDAS TENTATIVAS SENHA              | - Esse código deve ser utilizado pelo Emissor quando for EXCEDIDO O Nº DE TENTATIVAS PERMITIDAS DE DIGITAÇÃO DA SENHA (utilizado apenas para compras).                                                                                                                                                                                                                                                                                                                                                       | Reversível   |
| 41      | CARTÃO PERDIDO                                 | - Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "PERDA".                                                                                                                                                                                                                                                                                                                                                                                                       | Irreversível |
| 43      | CARTÃO ROUBADO                                 | - Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "ROUBO".                                                                                                                                                                                                                                                                                                                                                                                                       | Irreversível |
| 51      | LIMITE/SALDO INSUFICIENTE                      | - Esse código deve ser utilizado pelo Emissor para CARTÃO que está TEMPORARIAMENTE SEM SALDO OU LIMITE SUFICIENTE para realizar a transação.<br>- Saque/advance 2 sem trilha 2<br>- Compra com Troco não suportada.<br>- Verificação de endereço não suportada (somente quando o código de processo for "13" sem valor de compra). \* Verificação de conta de cartão não suportada (somente quando o código de processo for "18" sem valor de compra).                                                       | Reversível   |
| 54      | DATA DE VALIDADE DO CARTÃO                     | - Esse código deve ser utilizado pelo Emissor para CARTÃO FÍSICO ou TOKEN COM VALIDADE / EXPIRAÇÃO VENCIDA ou INVÁLIDA.                                                                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| 55      | SENHA INVÁLIDA / NÃO ENVIADA                   | - Esse código deve ser utilizado pelo Emissor quando a SENHA DIGITADA PELO CLIENTE NÃO CONFERE, ESTÁ INVÁLIDA/INCORRETA.<br>- Esse código deve ser utilizado pelo Emissor quando a SENHA NÃO FOR ENVIADA NA MENSAGERIA E A MESMA É EXIGIDA PARA APROVAÇÃO DA TRANSAÇÃO.                                                                                                                                                                                                                                      | Reversível   |
| 56      | SEM REGISTRO DO CARTÃO                         | <br>1. Nº do cartão não pertence ao Emissor<br>2. Nº do cartão não é válido                                                                                                                                                                                                                                                                                                                                                                                                                                  | Irreversível |
| 57      | TRANSAÇÃO NÃO PERMITIDA PARA ESSE CARTÃO       | - Esse código deve ser utilizado pelo Emissor quando o cartão estiver com BLOQUEIO DEFINITIVO, exceto bloqueio perda e roubo que já possuem códigos específicos (ex: falecimento, fraude confirmada, cancelamento definitivo a pedido do cliente, etc).<br>- Esse código deve ser utilizado para PRODUTOS E SERVIÇOS NÃO SUPORTADOS pelo emissor do cartão.<br>- Esse código pode ser usado para TOKEN INVÁLIDO / SUSPENSO / INATIVO.<br>- Esse código deve ser usado para negar o modo de entrada FALLBACK. | Irreversível |
| 58      | COMERCIANTE INVÁLIDO                           | - Esse código deve ser utilizado pelo Emissor quando o MCC do estabelecimento não estiver cadastrado para obtenção de token junto ao Emissor.                                                                                                                                                                                                                                                                                                                                                                | Irreversível |
| 59      | SUSPEITA DE FRAUDE                             | - Esse código deve ser utilizado pelo Emissor quando regras de prevenção SUSPEITAM DE FRAUDE, sendo necessário o contato do portador com o Emissor para liberação do cartão e realização de nova transação.<br>- Esse código deve ser utilizado pelo Emissor para negar transações por ausência do AVISO VIAGEM que deve ser realizado pelo portador do cartão antes de viagens ao exterior ou em alguns casos antes de realizar transações em sites internacionais.                                         | Reversível   |
| 61      | VALOR MÁXIMO SAQUE/COMPRAS EXCEDIDO            | - Esse código deve ser utilizado pelo Emissor quando o valor do saque/compras exceder o limite permitido por ele.                                                                                                                                                                                                                                                                                                                                                                                            | Reversível   |
| 62      | BLOQUEIO TEMPORÁRIO DE COBRANÇA                | - Esse código deve ser utilizado pelo Emissor para cartões com BLOQUEIO TEMPORÁRIO DE COBRANÇA.                                                                                                                                                                                                                                                                                                                                                                                                              | Reversível   |
| 63      | VIOLAÇÃO DE SEGURANÇA                          | - Esse código deve ser utilizado pelo Emissor quando o CÓDIGO DE SEGURANÇA DO CARTÃO (CVE2) estiver INCORRETO / INVÁLIDO ou MST inválido (token).                                                                                                                                                                                                                                                                                                                                                            | Irreversível |
| 64      | VALOR MÍNIMO DA TRANSAÇÃO - INVÁLIDO           | - Esse código deve ser utilizado pelo Emissor quando o VALOR DA TRANSAÇÃO ESTIVER ABAIXO DO MÍNIMO permitido pelo Emissor                                                                                                                                                                                                                                                                                                                                                                                    | Irreversível |
| 65      | QUANTIDADE DE SAQUES EXCEDIDOS                 | - Esse código deve ser utilizado pelo Emissor quando o limite de quantidade de saques estiver excedido                                                                                                                                                                                                                                                                                                                                                                                                       | Reversível   |
| 75      | SAQUE/ EXCEDIDAS TENTATIVAS SENHA              | - Esse código deve ser utilizado pelo Emissor quando for excedida a quantidade de tentativas de digitação de senha estipuladas pelo Emissor (utilizado apenas para SAQUES)                                                                                                                                                                                                                                                                                                                                   | Reversível   |
| 76      | CONTA DESTINO INVÁLIDA OU INEXISTENTE          | - Esse código deve ser utilizado pelo Emissor quando conta "PARA" (destino) no BIT 3 é inválida ou inexistente e exclusivamente para transações de Transferência de Fundos                                                                                                                                                                                                                                                                                                                                   | Irreversível |
| 77      | CONTA ORIGEM INVÁLIDA OU INEXISTENTE           | - Esse código deve ser utilizado pelo Emissor quando conta "DE" (origem) no BIT 3 é inválida ou inexistente e exclusivamente para transações de Transferência de Fundos.                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 78      | CARTÃO NOVO SEM DESBLOQUEIO / CARTÃO BLOQUEADO | - Esse código deve ser utilizado pelo Emissor quando o cartão novo ainda não foi desbloqueado (ativado) pelo portador junto ao Emissor ou quando o Portador, mediante autonomia, desejar bloquear temporariamente o cartão através do aplicativo do Emissor.                                                                                                                                                                                                                                                 | Reversível   |
| 82      | CARTÃO INVÁLIDO (dados internos)               | - Esse código deve ser utilizado pelo Emissor quando dados internos do cartão não conferem (ex: criptograma inválido, ATC inválido etc.)                                                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| 83      | NÃO É POSSÍVEL VALIDAR A SENHA                 | - Esse código deve ser utilizado pelo Emissor e será utilizado pela Elo quando não for possível validar ou descriptografar a senha.                                                                                                                                                                                                                                                                                                                                                                          | Irreversível |
| 91      | EMISSOR FORA DO AR                             | - Esse código será utilizado pela Bandeira quando o Emissor está temporariamente indisponível para autorizar a transação ou não foi recebida a resposta do Emissor no tempo estabelecido.                                                                                                                                                                                                                                                                                                                    | Reversível   |
| 96      | FALHA DO SISTEMA                               | - Esse código será utilizado pela Bandeira ou pelo Emissor por problemas no processamento da transação.                                                                                                                                                                                                                                                                                                                                                                                                      | Reversível   |
| AB      | FUNÇÃO INCORRETA (DÉBITO)                      | - Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função DÉBITO, mas o cartão não possui essa função ativa.                                                                                                                                                                                                                                                                                                                                      | Irreversível |
| AC      | FUNÇÃO INCORRETA (CRÉDITO)                     | - Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função CRÉDITO, mas o cartão não possui essa função ativa.                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| FM      | UTILIZAR O CHIP                                | - Esse código será utilizado pelo Emissor para informar ao estabelecimento que a transação contactless não terá sucesso e que o portador deve utilizar o chip (contato).                                                                                                                                                                                                                                                                                                                                     | Irreversível |
| P5      | TROCA DE SENHA / FALHA NO DESBLOQUEIO          | - Esse código será utilizado pelo Emissor quando ocorreu falha na troca de senha ou falha no desbloqueio.                                                                                                                                                                                                                                                                                                                                                                                                    | Irreversível |
| P6      | NOVA SENHA NÃO ACEITA                          | - Esse código será utilizado pelo Emissor quando a nova senha que o cliente escolheu não atende os critérios mínimos estabelecidos pelo Emissor.                                                                                                                                                                                                                                                                                                                                                             | Reversível   |

# Demais bandeiras

- **Códigos reversíveis:** serão permitidas novas retentativas para o mesmo cliente e cartão. Não há limite e período pré-estabelecido;

  > **Importante**: antes de realizar uma nova tentativa, siga a orientação recebida na resposta da transação negada.

- **Códigos Irreversíveis:** não serão permitidas autorizações para o mesmo cartão ou estabelecimento, depois de receber 1ª resposta de recusa do emissor.
