---
layout: faq
title: FAQ
description: Respostas para dúvidas comuns sobre Webservice 1.5
search: true
toc_footers: true
categories: faq
sort_order: 3
tags:
  - Webservice 1.5
---

# Dúvidas frequentes

<aside class="warning">O Webservice 1.5 foi descontinuado. O documento abaixo existe como base de conhecimento para clientes ja integrados. Novos cadastros não serão realizados pelo atendimento Cielo</aside>

> Para novas integrações, veja [API Cielo E-commerce](https://developercielo.github.io/manual/cielo-ecommerce)

## Como funciona a solução do Webservice 1.5 da Cielo?

A solução **Webservice** da plataforma Cielo E-commerce foi desenvolvida com tecnologia XML, que é padrão de mercado e independe da tecnologia utilizada por nossos clientes. Dessa forma, é possível integrar-se utilizando as mais variadas linguagens de programação, tais como: ASP, ASP. Net, Java, PHP, Ruby, Python, etc.

## É preciso algum software proprietário, como DLLs, para fazer a integração?

Não. A ausência de aplicativos proprietários é uma das características da solução: Não é necessário instalar aplicativos no ambiente da loja virtual **em nenhuma hipótese**.

## Que tipo de conteúdo é enviado na integração?

A integração é realizada através de serviços disponibilizados como Web Services. O modelo empregado é bastante simples: há uma única URL (endpoint) que recebe os POSTs via HTTPs e, dependendo do formato do XML enviado, uma determinada operação é realizada.

## Como o Webservice da Cielo sabe que a requisição é da minha loja?

Todas as requisições a Web Service da Cielo **devem conter o nó de autenticação do lojista**, composto pelo número de credenciamento e chave de acesso fornecidos pela Cielo no momento da afiliação.

# Dúvidas sobre Integração

## O que é uma transação?

O elemento central do Cielo E-commerce é a transação, criada a partir de uma requisição HTTP ao Webservice da Cielo. A identificação única de uma transação na Cielo é feita através do campo **TID**, que está presente no retorno das mensagens de autorização. Esse campo é essencial para realizar consultas, capturas e cancelamentos.

## Quais tipos de erros podem ocorrer durante a integração?

Quando a transação é inválida, podemos classificar os erros em dois tipos:

* **Erros sintáticos**: ocorrem quando a mensagem XML não respeita as regras definidas no arquivo ecommerce.xsd. Por exemplo, uma letra em um campo numérico, ou a ausência de um valor obrigatório;
* **Erros semânticos**: ocorrem quando uma requisição solicita uma operação não suportada para determinada transação. Por exemplo, tentar capturar uma transação não autorizada, ou ainda, cancelar uma transação já cancelada.

As mensagens de erro sempre trazem informações adicionais que facilitam o troubleshooting.

## Como faço uma autorização direta?

A autorização direta caracteriza-se por ser uma transação onde não há a autenticação do portador, seja por opção (e risco) do lojista, seja porque a bandeira ou emissor não tem suporte. A autorização direta pode ser feita de duas formas: tradicional (com os dados do cartão) ou através de um token.

## Como faço uma autorização recorrente?

A autorização recorrente pode ser feita de duas formas: através do envio de um token previamente cadastrado, ou através de um cartão. A transação recorrente é praticamente igual à transação tradicional, as mudanças consistem nas regras que o emissor e a bandeira utilizam para autorizar ou negar uma transação. Outra diferença está relacionada ao Renova Fácil.

## É possível fazer uma captura em um momento após a autorização?

Uma transação autorizada somente gera o crédito para o estabelecimento comercial caso ela seja capturada. Por isso, toda venda que o lojista queira efetivar será preciso realizar a captura (ou confirmação) da transação.

Para vendas na modalidade de Crédito, essa confirmação pode ocorrer em dois momentos:

* Imediatamente após a autorização (captura total);
* Posterior à autorização (captura total ou parcial).

No primeiro caso, não é necessário enviar uma requisição de captura, pois ela é feita automaticamente pela Cielo após a autorização da transação. Para tanto, é preciso configurar a requisição de transação definindo-se o valor “true” para a TAG <capturar>, conforme visto na seção “Criando uma transação”.

Já no segundo caso, é preciso fazer uma “captura posterior”, através de uma nova requisição ao Webservice da Cielo para confirmar a transação e receber o valor da venda.

<aside class="warning"><strong>Atenção!</strong>: Na modalidade de débito não existe essa opção: toda transação de débito autorizada é capturada automaticamente.</aside>

## É possível cancelar uma transação?

O cancelamento é utilizado quando o lojista decide não efetivar um pedido de compra, seja por insuficiência de estoque, por desistência da compra pelo consumidor, ou qualquer outro motivo. Seu uso faz-se necessário principalmente se a transação estiver capturada, pois haverá débito na fatura do portador, caso ela não seja cancelada.

<aside class="notice">Se a transação estiver apenas autorizada e a loja queira cancelá-la, o pedido de cancelamento não é necessário, pois após o prazo de captura expirar, ela será cancelada automaticamente pelo sistema.</aside>

## Existe um ambiente para testar a integração?

Os testes de integração deverão ser realizados antes do início da homologação, durante o desenvolvimento (codificação) da solução. Para isso, deve-se considerar o seguinte ambiente como EndPoint do Webservice: [https://qasecommerce.cielo.com.br/servicos/ecommwsec.do](https://qasecommerce.cielo.com.br/servicos/ecommwsec.do)

Para facilitar o desenvolvimento disponibilizamos duas chaves para testes, uma para cada modalidade de integração. Com base nas configurações iniciais feitas durante o seu credenciamento, escolha os dados corretos para realizar os testes:

|Número estabelecimento comercial|Chave de testes                                                   |
|--------------------------------|------------------------------------------------------------------|
|`1006993069`                    |`25fbb99741c739dd84d7b06ec78c9bac718838630f30b112d033ce2e621b34f3`|

<aside class="notice">O ambiente de testes só deve ser utilizado pelos estabelecimentos de testes listados no quadro acima. O uso de dados originais do estabelecimento gerará transações não possíveis de rastreamento, gerando resultados incorretos. No ambiente de testes, use as credenciais para testes, no ambiente de produção, use os dados originais do estabelecimento.</aside>

## Existe alguma regra para leitura de cartões?

A leitura dos dados do cartão no ambiente próprio é controlada por regras definidas pelo programa de segurança imposto pelas bandeiras de cartões.

Para a Visa, esse programa é o conhecido como AIS (Account Information Security) PCI. Para maiores informações acesse: [https://www.cielo.com.br](https://www.cielo.com.br) > Serviços > Serviços de Segurança > AIS – Programa de Segurança da Informação , ou entre em contato conosco.

Para a Mastercard o programa de segurança é o SDP (Site Data Protection) PCI. Para maiores informações acesse: [http://www.mastercard.com/us/sdp/index.html](http://www.mastercard.com/us/sdp/index.html), ou entre em contato conosco.

Ademais, atendidos os requisitos, no momento do credenciamento E-commerce deve ser mencionada a escolha por leitura do cartão na própria loja.
