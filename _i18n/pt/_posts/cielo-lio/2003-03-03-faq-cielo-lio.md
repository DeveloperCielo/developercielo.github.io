---
layout: faq
title: FAQ
description: Respostas para perguntas frequentes feitas pelos desenvolvedores durante a integração com a Cielo LIO.
search: true
categories: faq
sort_order: 2
tags:
  - Cielo LIO
search: true
---

# Dúvidas Plataforma LIO

## Se o estabelecimento comercial trocar a LIO v1 pela LIO v2, o que ele precisa fazer para ter o aplicativo na nova máquina?

Ao receber o novo equipamento, o cliente deve garantir que a LIO esteja conectada no 3G ou no Wi-Fi e então solicitar para atualizar aplicativos.

Ajuda -> Sobre Cielo LIO -> Atualizar Aplicativos Cielo LIO

Após esse procedimento todos os aplicativos que o cliente possui serão transferidos também para a nova máquina.

## É necessário fazer uma nova certificação do meu aplicativo para que ele funcione na LIO v2?

Não, se o aplicativo já foi certificado não tem a necessidade de certificar novamente, exceto no caso de o desenvolvedor utilizar em seu aplicativo métodos e/ou funcionalidades exclusivas da LIO V2. Então ele deverá submeter o aplicativo para certificação.

## Se o estabelecimento comercial possui máquinas LIO v1 como também LIO v2, o aplicativo do parceiro vai funcionar em ambas?

Sim, o aplicativo do parceiro irá funcionar em ambos os modelos de LIO (V1 e V2).

## Se meu aplicativo já funciona na LIO v1, ele vai funcionar também na LIO v2?

Sim, se você já tem um aplicativo rodando na LIO V1, ele também funcionará na LIO V2.

## Como faço para integrar com a Cielo LIO?

Construimos um portal dedicado aos desenvolvedores para facilitar a integração da sua solução com a Lio:

> http://desenvolvedores.cielo.com.br

Nesse portal você pode:

* Acessar documentação completa das APIs
* Utilizar os SDK´s para tornar a integração mais ágil
* Criar suas contas para receber as chaves (tokens) de acesso
* Realizar os testes e desenvolvimentos para se integrarem com a Cielo: usando emulador ou sandbox.

## Posso utilizar impressoras para conectar na Cielo LIO?

Sim. Impressoras com conexão via Bluetooth podem ser usadas pelo aplicativo do parceiro que está rodando na Cielo LIO para realizar a impressão de algum comprovante ou recibo necessário para a operação do negócio do parceiro/cliente.
Já existem parceiros que estão utilizando impressoras Bluetooth das marcas Zebra, Datex, Leopardo e outras para se integrar com a Cielo LIO!
Todos os protocolos de comunicação e pareamento ficam sob responsabilidade do aplicativo do parceiro.

## Quais são as formas de comunicação da Cielo LIO?

A Cielo LIO possui entrada para um SIM Card que permite realizar a comunicação via rede móvel 3G. Com fall-back para 2G e GPRS respectivamente.
Além disso, ela possui como tecnologia de comunicação o Wi-Fi.

## Quais são as conexões disponíveis na Cielo LIO?

As entradas USB da Cielo LIO são utilizadas única e exclusivamente para realizar o carregamento na bateria do aparelho.
O Bluetooth da Cielo LIO pode ser utilizado para realizar a comunicação e a troca de informações com dispositivos externos.

## A minha máquina Cielo LIO não chegou. O que devo fazer?

Entre em contato com a Central de Atendimento e verifique o status de entrega de sua Cielo LIO.

* 4002 5472 - Todas as localidades
* 0800 570 8472 - Exceto capitais e ligações pelo celular

# Dúvidas Integração Local

## O que eu preciso para colocar meu aplicativo em produção?

Se seu aplicativo já foi certificado, você deve promovê-lo Produção no Dev Console.

A partir desse momento ele estará disponível para todas as LIOs vinculadas à Loja Privada, em caso de Aplicativo Privado; ou em caso de Aplicativo Público ele estará disponível para download na LIO Store.

## Existe algum aplicativo de exemplo disponível?

Disponibilizamos no GitHub um aplicativo Sample de forma que o desenvolvedor consiga ver como funciona as chamadas para utilização do SDK.

Download do aplicativo Sample:

> https://github.com/DeveloperCielo/LIO-SDK-Sample-Integracao-Local.

## Preciso me cadastrar para realizar testes?

Sim, é fundamental o cadastro no portal para que você possa obter os tokens de acesso e testar as suas aplicações.

## É necessário colocar todos os itens do pedido na order?

A Cielo LIO funciona com o conceito de Pedido (Order). Assim, o procedimento deve ser sempre o exemplificado no SDK:

1. Criar uma ordem com status draft
2. Adicionar itens à ordem
3. Preparar a ordem para pagamento (place order)
4. Executar o checkout.

Se você tem uma variedade de produtos, é interessante criar itens separados para status de relatório na Cielo LIO do lojista.

## Preciso de uma máquina Cielo LIO para realizar os testes de integração local?

Não é necessário ter uma máquina Cielo LIO para realizar os testes.

A Cielo disponibiliza um aplicativo que simula o ambiente da Cielo LIO em qualquer dispositivo Android, permitindo que o desenvolvedor realize os testes nos métodos do SDK e faça o debug da sua aplicação durante o desenvolvimento e a integração com o Cielo LIO Order Manager SDK, sem a necessidade de possuir um hardware da Cielo LIO.

Download do Emulador:

> https://s3-sa-east-1.amazonaws.com/cielo-lio-store/apps/lio-emulator/1.0.0/lio-emulator.apk

# Dúvidas Integração Remota

## Preciso me cadastrar para realizar testes?

Sim, é fundamental o cadastro no portal para que você possa obter os tokens de acesso e testar as suas aplicações.

## O que eu preciso para colocar a integração em produção?

Se você já realizou todos os testes em Sandbox e deseja enviar pedidos para a Cielo LIO, entre em contato através do formulário do Portal de Desenvolvedores da Cielo com o assunto “Integração Remota Cielo LIO - Tokens e informações para Produção” e preencha os dados necessários para receber os tokens de produção

# Dúvidas Cielo Store

## O que é a Cielo Store?

É o marketplace - a loja de aplicativos da Cielo LIO. Na loja, os clientes poderão acessar a Cielo Store por meio da Cielo LIO e fazer download dos aplicativos que melhor atendem seu modelo de negócio e que têm por objetivo facilitar a gestão e controle de suas vendas, melhorar o relacionamento deles com seus clientes e impulsionar suas vendas.

Para acessar e realizar o upload de aplicativos na Cielo Store, acesse:

> https://www.cieloliostore.com.br

## Fiz meu cadastro! O que devo fazer agora?

O desenvolvedor deverá escolher de acordo com o propósito de distribuição de seu aplicativo entre:

* Aplicativo Privado na Loja Privada
* Aplicativo Público na Cielo Store

Caso decida por Aplicativo Privado na Loja Privada, envie um ticket no Portal de Desenvolvedores e escolha no assunto: “Criação Loja Privada” e preenche os campos necessários.
Caso decida por Aplicativo Público na Cielo Store, você já consegue fazer o upload do aplicativo e enviá-lo para Certificação.

## Quais são os Browsers/Navegadores recomendados para Upload de aplicativo na Cielo Store?

Recomendamos utilizar o Google Chrome ou Mozilla Firefox preferencialmente para realizar o upload de aplicativos na Cielo Store.

## Como faço para me cadastrar como um EC na Cielo?

Após a aprovação da certificação do aplicativo, quando você envia-lo para produção no Dev Console, haverá um formulário que deverá ser preenchido e automaticamente você se tornará um EC.

## Preciso ser cadastrado na Cielo para receber o pagamento dos aplicativos?

Sim! Como o pagamento é realizado em agenda financeira, você precisa se cadastrar como um estabelecimento comercial (EC).

## Como recebo o pagamento dos aplicativos?

O pagamento será feito em agenda financeira.

## Caso meu aplicativo não seja gratuito, a Cielo Store fica com parte do valor de venda?

Sim! A Cielo Store atua com o modelo de cobrança 70/30, ou seja, 70% do valor de venda ou mensalidade do aplicativo é direcionado para o desenvolvedor e 30% para Cielo.

## Tenho algum custo para colocar meu aplicativo na Cielo Store?

Não! A integração com a Cielo LIO é gratuita.

## Quais as etapas existentes na Cielo Store para meu publicar meu aplicativo?

|Etapas |Descrição |
|-------|----------|
|**Etapa de Desenvolvimento**|Nessa etapa ocorre a integração do aplicativo com a Cielo LIO e o desenvolvedor é responsável por realizar essa integração para que seu aplicativo consuma as funcionalidades da plataforma Cielo LIO. Caso seu aplicativo não precise estar integrado as funcionalidades da plataforma, basta seguir para a etapa de publicação.|
|**Etapa de Testes**| A Cielo disponibiliza um aplicativo que simula o ambiente da Cielo LIO em qualquer dispositivo Android, permitindo que o desenvolvedor realize os testes nos métodos do SDK e faça o debug da sua aplicação durante o desenvolvimento e a integração com o Cielo LIO Order Manager SDK, sem a necessidade de possuir um hardware da Cielo LIO. O download do Emulador é feito acessando a documentação da Integração Local no Portal de Desenvolvedores.|
|**Etapa de Publicação**|Crie sua conta na Cielo Store (Dev Console) e faça a publicação do aplicativo (arquivo apk) na Cielo Store.A Cielo recomenda que o desenvolvedor faça a geração do arquivo apk utilizando o Android Studio para garantir sucesso no upload do aplicativo na Cielo Store.|
|**Etapa de Certificação**|No próprio Dev Console, o aplicativo publicado poderá ser promovido para certificação. O time de certificação realizará testes de segurança, funcionais e validações de negócio para garantir a integridade nos fluxos do aplicativo.|
|**Etapa de Produção**|No próprio Dev Console, assim que a certificação for aprovada, o desenvolvedor será notificado e poderá promover o aplicativo para o status de produção.|

## Como faço para mudar o nome do meu aplicativo?

É necessário criar um novo aplicativo com package name diferente e seguir o processo normal de upload de aplicativo na Cielo Store.

## É possível editar as informações do meu aplicativo já publicado na Cielo Store?

Sim! Basta enviar um e-mail pelo nosso suporte do Portal de Desenvolvedores em "Envie a sua pergunta", solicitando a edição das informações de seu aplicativo.

## Como faço para baixar aplicativos na Cielo LIO?

Na Cielo LIO clique na aba Ajuda -> Sobre Cielo LIO -> Atualizar Aplicativos Cielo LIO.

A partir desse momento todos os aplicativos disponibilizados para essa LIO serão baixados e instalados na Cielo LIO e ficarão visíveis na aba Apps.

## Qual o limite máximo de tamanho do aplicativo para upload Cielo Store?

O aplicativo deve possuir no máximo 100Mb para que o upload na Cielo Store seja realizado com sucesso.

## Qual a diferença entre Loja Pública e Loja Privada?

Na Loja Pública, o aplicativo ficara disponível na Cielo Store para todos os clientes que possuem LIO.

Na Loja Privada o modelo de distribuição consiste em um desenvolvedor (ou grupo de desenvolvedores), estando relacionado a uma loja privada. Esse modelo visa a distribuição seletiva do aplicativo, dado que ele só é instalado em LIOs cadastradas para aquela loja específica. O aplicativo que está na Loja Privada não estará disponível na Loja Pública.
