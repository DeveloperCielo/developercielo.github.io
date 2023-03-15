---
layout: manual
title: Prevenção contra Fraudes e Chargeback
description: Manual de prevenção contra fraudes e chargebacks
search: true
translated: false
toc_footers: true
categories: manual
sort_order: 5
tags:
  - API Pagamento
---

# Prevenção contra fraudes e chargebacks

O volume de fraudes e chargebacks causam impacto cada vez maior para o comércio, seja no ambiente de transações digitais ou físicas.

As bandeiras de cartões de crédito monitoram os índices de fraudes e chargebacks dos estabelecimentos e aplicam penalidades conforme o nível de risco identificado. Por isso, é fundamental que a sua loja adote medidas de prevenção a fraudes e chargebacks.

Os produtos Cielo têm soluções integradas que podem ser usadas para mitigação de riscos nas suas transações. Além disso, a Cielo tem uma equipe de consultoria de risco que acompanha os índices de fraudes e chargebacks e oferece orientações de prevenção.

Tendo em vista o cenário, desenvolvemos este material como guia de orientações e boas práticas, para que você saiba quais ações a sua loja pode tomar para melhorar os processos de gestão de risco.

# Fraudes

Uma fraude é identificada a partir do momento que o portador não reconhece ou não autorizou a transação em seu cartão de crédito.

O tipo de fraude que ocorre com maior frequência são aqueles cometidos via e-commerce. O número elevado de casos muitas vezes é decorrente da maioria das transações não exigir informações acerca do comprador. As fraudes crescem na mesma medida que as vendas pela internet. Com isso, muitas lojas virtuais assumem prejuízos consideráveis, o que pode resultar no encerramento de suas operações.

O desafio é permitir que as lojas virtuais cresçam em vendas e que suas fraudes sejam controladas. Para isso, é importante entender as possíveis tentativas de fraudes e como minimizá-las. Conhecer o seu segmento no mercado e entender o perfil das fraudes podem auxiliar nas medidas preventivas para mitigar as tentativas de fraudes.

## Dicas para vender de forma segura pela Internet

Realize ações preventivas: a checagem interna pode auxiliar na prevenção de fraudes.

- **Conferência de CPF**: verifique se o CPF cadastrado na compra confere com o nome do cliente;
- **E-mail**: verifique o provedor de e-mail. Fraudadores normalmente utilizam provedores de e-mail gratuitos pela facilidade de criarem e-mails falsos para utilizarem na compra;
- **UF/CEP de entrega**: pesquise e faça análises sobre entregas em áreas de risco, e verifique se há pedidos diferentes para entrega no mesmo endereço. Na entrega, solicite documentos e compare com os dados fornecidos no momento da compra;
- **Registro de compras**: analise se o cliente tem muitas compras sucessivas em curto período de tempo;
- **Pedidos urgentes**: normalmente os fraudadores têm pressa em receber o produto adquirido;
- **Forma de pagamento**: analise se o mesmo cliente tem várias compras utilizando cartões de créditos diferentes (não mostra preocupação com o valor);
- **Busca Google**: em compras duvidosas, procure por informações e registros online. Confira os dados para validação;
- **Histórico do cliente**: mantenha um banco de dados com informações e registros de compra e forma de pagamento dos clientes. Armazene não apenas compras realizadas e pagamentos efetivados, mas também transações não efetivadas e, principalmente, por qual motivo. É importante armazenar os dados dos clientes que efetuaram fraudes (nome, CPF, endereço, CEP, e-mail etc.);
- **Crie e utilize Lista Negativa**: crie uma lista negativa. Essas informações auxiliam na construção do perfil fraudador e servem de alerta para outros pedidos, realizados com os mesmos dados;
- **Treine seus colaboradores**: treine sua equipe a identificar atitudes suspeitas e avaliar os riscos e decidir se a transação é segura antes de efetivá-la.

## Prevenção contra fraudes nos produtos e serviços Cielo

Confira as funcionalidades dos produtos Cielo que podem ajudar a mitigar riscos nas suas transações.

### API E-commerce Cielo

- **Captura posterior**: permite que a loja virtual analise as transações antes de capturá-las. Caso identifique uma transação fraudulenta, permite não realizar a captura;
- **Tokenização**: é processo que transforma o número do cartão em um código criptografado que auxilia a evitar vazamentos de dados no site e exposição de dados dos cartões de clientes;
- **3DS 2.0**: o comprador virtual é autenticado pelo banco para concluir a transação mediante a análise de dados pelo banco ou desafio feito pelo comprador.

### Antifraude

No e-commerce, o Antifraude tem um papel importantíssimo para avaliar se as transações que passam pela loja virtual são potencialmente seguras ou fraudulentas.

A análise de fraude com o Antifraude Gateway pode acontecer em dois momentos:

- **Antes da autorização (AnalyseFirst)**: todas as transações são primeiro submetidas à análise do Antifraude e, se aceitas, seguem para o processo de autorização da adquirente;
- **Depois da autorização (AuthorizeFirst)**: todas as transações são primeiro submetidas à autorização na adquirente e, se autorizadas, são enviadas para a análise do Antifraude.
  <br/>
  <br>
  Confira os principais recursos que um bom Antifraude pode oferecer:

- Informações detalhadas sobre a transação;
- Origem da transação, como endereço de IP e geolocalização;
- Verificação de dados importantes da transação por rede neural;
- Aplicação de regras de mercado para gestão de fraude de acordo com o perfil da loja;
- Permite que a loja virtual crie suas próprias regras de segurança para facilitar o gerenciamento.

> Conheça mais sobre a nossa solução de análise de fraude na documentação do [Antifraude Gateway](https://braspag.github.io//manual/antifraude){:target="\_blank"}.

### Como a Cielo ajuda a prevenir fraudes em seu estabelecimento

Além das funcionalidades dos produtos, a Cielo adota algumas práticas e oferece serviços que visam minimizar ao máximo os riscos das lojas virtuais em suas vendas pela internet.

A equipe de consultoria de risco oferece a Cesta de Serviços de Segurança, conforme as movimentações e nível de risco observado pela Cielo, e efetua reuniões periódicas com lojistas para acompanhamento das ações e apresentação dos resultados.

**Cesta de Serviços de Segurança**

- **Monitoria Online**: além do uso da Lynx para todas as transações, ainda é possível personalizar as regras de risco para a realidade do seu estabelecimento;
- **Cielo Alerta**: alerta a loja assim que uma venda é contestada pelo portador, antes de o emissor notificar como chargeback; assim, a loja pode cancelar uma venda contestada antes de gerar o chargeback e evitar a entrada no programa de monitoria das bandeiras (evitando penalizações);
- **Pré-Chargeback**: é uma ferramenta para disputa de chargeback pelo próprio site Cielo. Nela você consegue acompanhar também o ciclo de vida do chargeback;
- **Serviços de PCI**: dependendo da necessidade do estabelecimento, a Cielo pode auxiliar na certificação PCI;
- **Tratamentos de Incidentes**: monitoria e resolução de incidentes de fraude;
- **Monitoria Preventiva**: é a notificação de incidentes de fraude para o estabelecimento;
- **Velocity**: monitoramento e mitigação de testes de rajada de cartão.
  <br/>
  <br>

**Acompanhamento da consultoria de risco Cielo**

Nosso time de relacionamento:

- Envia relatório das transações reportadas como fraude pelos bancos emissores para análise e providências;
- Identifica e orienta sobre os procedimentos de segurança realizados pelo estabelecimento no momento da venda;
- Monitora e reporta os índices de fraude e chargeback, auxiliando na tomada de ações preventivas.

# Chargebacks

O chargeback é a contestação de uma venda feita com cartão de débito ou crédito, que pode acontecer por três razões:

- **Fraude**: o portador do cartão não reconhece a compra;
- **Desacordo comercial**: o portador do cartão reconhece a compra, porém alega que algum termo da venda não foi cumprido (mercadoria não entregue ou serviço não prestado, transação recorrente cancelada, mercadoria com defeito ou não confere com a descrição, crédito não processado);
- **Erro de processamento**: o portador do cartão identifica algum erro na cobrança (apresentação tardia, número de cartão inexistente, valor da transação ou número de cartão incorretos, duplicidade de processamento, pagamento por outros meios, transação processada sem autorização ou negada).
  <br/>
  Conforme as regras estabelecidas pelo mercado de pagamentos eletrônicos (bandeiras de cartões) o chargeback segue as normas de cartão não presente para operações realizadas no comércio eletrônico. Com base nestas regras, a loja pode iniciar o processo de disputa caso não concorde com o chargeback; para realizar a disputa, a loja deve enviar documentos que comprovem a sua defesa.

> A aceitação ou disputa de chargeback podem ser feitas via API, pela [Risk Notification API](https://braspag.github.io//manual/risknotification){:target="\_blank"}.

## Fluxo do chargeback

O fluxo do chargeback inicia quando a pessoa titular do cartão contesta uma compra com o emissor. A partir daí, o banco analisa se a contestação realmente é um chargeback e, em caso positivo, a adquirente notifica a loja e abre o prazo para disputa. Se a loja não apresentar sua defesa dentro do prazo, o chargeback é debitado na agenda financeira ao término do prazo da disputa:

![Fluxo de chargeback]({{ site.baseurl_root }}/images/apicieloecommerce/prevencao-fraudes-chargeback/prevencao-fraudes-chgbk-fluxo-chargeback.png)

## Como evitar chargebacks

- Atuar na prevenção a fraudes;
- Positivar o portador;
- Usar uma ferramenta de análise de fraude, como o [Antifraude Gateway](https://braspag.github.io//manual/antifraude){:target="\_blank"};
- Ter estrutura de backoffice para prevenção de fraudes e chargebacks;
- Usar a API Cielo E-commerce e as funcionalidades destinadas ao controle de chargebacks, como o **SoftDescriptor** e a **autenticação 3DS 2.0**.

## Como a Cielo ajuda a prevenir os chargebacks em seu estabelecimento

A Cielo oferece melhores práticas para minimizar as ocorrências de chargebacks:

- **SoftDescriptor** e **Autenticação 3DS 2.0** na API E-commerce Cielo:

> - **Soft Descriptor**: exibe o nome fantasia da sua loja na fatura do cartão de crédito do comprador, evitando contestações por não reconhecimento da compra;<br/>
> - **Autenticação 3DS 2.0**: as transações autenticadas transferem a responsabilidade de chargeback para o banco.

- Ferramentas de segurança;
- Dicas ao estabelecimento sobre as melhores práticas no mercado;
- Aderência às regras da bandeira;
- Monitoria dos índices de chargebacks e comunicação quanto ao excesso;
- Equipe para tratar questionamentos e prevenção a fraudes.

# Programa de monitoria de chargebacks e fraudes das bandeiras

Cada bandeira estabelece suas próprias regras de aplicação de chargeback, conforme o motivo.

O programa de monitoria é o processo de monitoramento realizado pelas bandeiras que consiste na identificação dos estabelecimentos que apresentam elevados índices de chargebacks e fraudes domésticos e internacionais.

As regras e métricas são previamente estabelecidas pelas bandeiras. Os resultados apurados geram reportes às credenciadoras (como a Cielo) que, por sua vez, notificam os estabelecimentos.

Caso a sua loja receba uma notificação por índice elevado de fraudes e chargebacks, a Cielo irá auxiliar na criação do plano de ação a ser apresentado para a bandeira.

## Programa de Monitoria Visa para fraudes e chargebacks

![Monitoria Visa]({{ site.baseurl_root }}/images/apicieloecommerce/prevencao-fraudes-chargeback/monitoria-visa-fraudechgbk.png)

## Programa de Monitoria Mastercard para fraudes

![Monitoria MasterCard Fraude]({{ site.baseurl_root }}/images/apicieloecommerce/prevencao-fraudes-chargeback/monitoria-mastercard-fraude.png)

## Programa de Monitoria Mastercard para chargebacks

![Monitoria MasterCard Chargeback]({{ site.baseurl_root }}/images/apicieloecommerce/prevencao-fraudes-chargeback/monitoria-mastercard-chgbk.png)

## Programa de Monitoria Elo para fraudes

![Monitoria Elo Fraude]({{ site.baseurl_root }}/images/apicieloecommerce/prevencao-fraudes-chargeback/monitoria-elo-fraude.png)

## Programa de Monitoria Elo para chargebacks

![Monitoria Elo Chargeback]({{ site.baseurl_root }}/images/apicieloecommerce/prevencao-fraudes-chargeback/monitoria-elo-chgbk.png)
