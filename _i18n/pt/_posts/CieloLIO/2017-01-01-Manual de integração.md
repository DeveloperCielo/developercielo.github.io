---
layout: manual
title: Manual de integração
description: Integração técnica via API
search: true
translated: true
categories: manual
tags:
  - Cielo LIO
language_tabs:
  json: JSON
---

# Bem-vindo a Cielo!

Nessa documentação você tem acesso a todas as informações sobre as plataformas de desenvolvimento da Cielo bem como suas principais funcionalidades para integrar com seu negócio.

O objetivo dessa documentação é facilitar o processo de desenvolvimento e integração com a Cielo

Caso você deseje ser cliente Cielo e possuir uma de nossas soluções de pagamento, acesse https://www.cielo.com.br/seja-nosso-cliente/ e escolha a solução ideal para você vender muito mais.

## Arquitetura

A plataforma Cielo LIO consiste em:

Dispositivo de ponto de venda baseado em Android.

* Uma loja de aplicativos (Cielo Store) para os desenvolvedores publicarem seus aplicativos e os disponibilizarem para os estabelecimentos comerciais.
* Uma plataforma com arquitetura em nuvem e APIs REST que permite a integração com parceiros. Acesse Documentação da Integração Remota
* Um SDK para desenvolvimento em Android, de forma que aplicativos de parceiros possam se integrar com as funcionalidades de pagamento da Cielo LIO. Acesse * Documentação da Integração Local

O objetivo da Cielo LIO é fornecer uma plataforma de controle e gestão de negócios que vai além de um sistema de pagamentos tradicional. Essa plataforma suporta aplicativos desenvolvidos para sistema Android, incentivando desenvolvedores parceiros a criar aplicativos especializados para determinados segmentos (restaurantes, vestuário, cosméticos, combustível e outros) e, assim, permitindo que esses estabelecimentos escolham o aplicativo que melhor se adapte ao modelo de negócio da empresa.

Quer conhecer mais sobre o produto Cielo LIO? Acesse: *[http://cielolio.com.br](http://cielolio.com.br)*

### Modelos de integração com a plataforma Cielo LIO

**Integração Remota | Cielo LIO Order Manager**

Conjunto de APIs que permitem que o cliente continue utilizando sua solução de PDV/Automação Comercial com todas as funcionalidades. No momento de realizar o pagamento, ocorre a integração com o gerenciador de pedidos (Order Manager) da Cielo LIO, de forma rápida, simples e segura.

**Integração Local | Cielo LIO Order Manager SDK**

A Cielo disponibiliza um SDK com base na Cielo LIO Order Manager API que permite ao desenvolvedor e parceiro Cielo LIO integrar em sua aplicação as funcionalidades de pagamento do Order Manager da Cielo LIO

### Funcionalidades nativas da Cielo LIO

A Cielo LIO possui algumas funcionalidades que são nativas da plataforma:

* Calculadora integrada
* Pagamentos parciais
* Relatório de vendas
* Comprovantes digitais
* Catálogo de produtos e serviços
* Gerenciador de pedidos
* Loja de aplicativos (Cielo Store)
* Comprovantes físicos (LIO V2)
* Pagamento com NFC (LIO V2)

### Diferenças LIO V1 e LIO V2
 
A Cielo LIO V2, foi um hardware também desenvolvido pela Cielo pensando em atender as necessidades específicas de alguns clientes.

A LIO V2 foi concebida com um tamanho maior do que a LIO V1 e com isso leva aos nossos clientes um design recomendado para utilização em balcões de forma mais estática e com algumas funcionalidades adicionais à LIO V1.

### Funcionalidades exclusivas LIO V2
 
A LIO V2 possui todas as funcionalidades presentes na LIO V1 e também:

Impressora térmica
Com a LIO V2, o cliente poderá ter a 1ª e 2ª via impressa após o pagamento realizado. Além disso, as aplicações parceiras poderão utilizar os métodos disponíveis da impressora para imprimir dados importantes ou necessários para o negócio do cliente.
NFC
Na LIO V2 colocamos o NFC como uma outra alternativa de pagamento. Portanto pagamentos poderão ser feitos utilizando cartão ou via contactless.

### Serviços periféricos
 
A Cielo LIO também se integra com os seguintes periféricos de hardware:

Impressoras Bluetooth (normalmente utilizadas para realizar a impressão de recibos).
Já existem parceiros que estão utilizando impressoras Bluetooth das marcas Zebra, Datex, Leopardo e outras para se Integrar com a Cielo LIO!
Todos os protocolos de comunicação e pareamento ficam sob responsabilidade do aplicativo do parceiro.

### Guia para desenvolvedores
 
O guia abaixo fornece as informações necessárias para ajudar os desenvolvedores a integrar ou desenvolver seus aplicativos na plataforma Cielo LIO da melhor maneira possível, de modo a oferecer uma experiência excelente para os estabelecimentos comerciais.

### Hardware
 
A Cielo oferece a plataforma Cielo LIO com o próprio software baseado em Android..

Confira abaixo a tabela com as especificações técnicas da Cielo LIO:
**Especificações Técnicas**
| Versão               | LIO v1                                      | LIO v2                                      |
|----------------------|---------------------------------------------|---------------------------------------------|
| Sistema operacional  | Android OS Cielo 5.1.1                      | Android OS Cielo 6.0 (Marshmallow)          |
| Memória              | 2GB LPDDR3                                  | 1GB LPDDR3                                  |
| Dual Chip            | Dual SIM Stand-by                           | Dual SIM Stand-by                           |
| Tipo do SIM Card     | micro SIM (3FF)                             | micro SIM (3FF)                             |
| Frequência GSM Mhz   | Quad-Band 850/900/1800/1900                 | Quad Band 850/900/1800/1900                 |
| Tamanho em polegadas | 5"                                          | 5.5"                                        |
| Tipo de tela         | AMOLED                                      | AMOLED                                      |
| Resolução da tela    | 720 x 1280 pixels                           | 720 x 1280 pixels                           |
| Densidade de pixels  | 293 ppi                                     | 267 ppi                                     |
| Câmera               | 12,8 Mega Pixels                            | 13 Mega Pixels                              |
| Resolução da câmera  | 4128 x 3096 pixels                          | 4160 x 3120 pixels                          |
| Flash                | Flash LED                                   | Flash LED                                   |
| USB                  | USB 2.0 Micro-B (Micro-USB) Somente Energia | USB 2.0 Micro-B (Micro-USB) Somente Energia |
| Bluetooth            | Versão 4.0 com A2DP                         | Versão 4.0 com A2DP/LE                      |
| WiFi           | 802.11 a/b/g/n                           | 802.11 b/g/n                             |
| Memória        | 2GB LPDDR3                               | 1GB LPDDR3                               |
| GPS            | A-GPS, GeoTagging                        | A-GPS                                    |
| Sensores       | Acelerômetro, Proximidade e Luminosidade | Acelerômetro, Proximidade e Luminosidade |
| Saída de áudio | Audio Jack 3,5mm                         | Audio Jack 3,5mm                         |

### Práticas gerais recomendadas

* Crie uma conta no Portal de Desenvolvedores e acesse a documentação de acordo com a necessidade do seu desenvolvimento de integração com a plataforma da Cielo LIO.
* Se estiver desenvolvendo um aplicativo para a Cielo LIO, ao término do desenvolvimento e/ou integração com o SDK Order Manager, crie uma conta na Cielo Store para submeter seu apk para certificação e, na sequência, disponibilizá-lo na Cielo LIO. Leia e aceite nossos Termos de Uso para fazer o envio do seu aplicativo.
* O aplicativo deve atender às necessidades dos estabelecimentos comerciais da Cielo.
* Teste completamente seu aplicativo antes da submissão. Aplicativos que não funcionam como esperado serão rejeitados na etapa de certificação.
* Certifique-se de que todos os dados gerados externamente e todas as operações estão sendo realizadas corretamente com a plataforma Cielo LIO.
* Seu aplicativo deve ter uma boa experiência de ponta a ponta. Aplicativos que não têm uma quantidade significativa e razoável de funcionalidade podem ser rejeitados durante o processo de revisão.
* O aplicativo em produção deve se autenticar com a Cielo LIO utilizando os tokens de acesso (Client-Id e Access-Tokens), ambos gerados no Portal de Desenvolvedores.

### Uso da API

**Segurança**

Proteja os dados confidenciais de clientes e funcionários. Não exponha publicamente nomes, endereços ou números de telefone.
Nunca exponha tokens de autenticação ou senhas de qualquer tipo.

**Rate Limiting**

As solicitações da Automação Comercial ou PDV devem ser escalonadas o máximo possível para evitar rajadas de alto volume de tráfego.
“Cache” seus próprios dados quando você precisar armazenar valores especializados ou revisar rapidamente conjuntos de dados muito grandes.

**Melhores práticas**

Não crie multithread com chamadas POST, pois esse comportamento pode criar atrasos sistêmicos devido a deadlocks.
Minimize o uso de dados. Os comerciantes podem estar utilizando conexão com dados móveis limitados.

### Android (Cielo OS)

**Melhores práticas**

* Recomendamos aos desenvolvedores que integrem algum tipo de utilitário de relatório de falhas em seus produtos Android. Isso ajudará você a manter a consciência operacional do seu produto.
* Os desenvolvedores podem coletar métricas sobre o uso do seu aplicativo. Isso irá ajudá-los a construir melhores produtos e aumentar a conscientização a respeito de quaisquer questões impactantes.

**Código de Qualidade**

Seu aplicativo deve estar em conformidade com as práticas de programação Java e Android convencionais:

* Diretrizes para desenvolvedores do Android.
* Princípios de Design Orientado a Objetos (S.O.L.I.D.).
* Diretrizes de estilo Java.
* Entenda a diferença entre compileSdkVersion, targetSdkVersion, e minSdkVersion.
* Aproveite os botões nativos do Android, como os botões “Voltar” e “Início”.

**Rotações do dispositivo**
O recurso de rotação de exibição na Cielo LIO (ambas versões) é desativado.

Pode ser utilizado o método setRequestedOrientation passando a orientação desejada para alterar a orientação, e o getRequestedOrientation() para obter a orientação atual da tela.

### Design

**Recursos de imagem**

* Os ícones dos aplicativos devem ser recursos do mipmap.
* Os ícones devem estar em conformidade com o dimensionamento padrão do Android (você pode usar geradores de ícones de terceiros para redimensionar seu logotipo): 192 × 192 (xxxhdpi).

**Design gráfico**

Se o seu aplicativo incluir um componente voltado para o cliente, seu projeto refletirá sobre o negócio usando seu aplicativo. Essas interfaces devem ser agradáveis e profissionais.

**Usabilidade**

* Seu aplicativo será usado em condições de trabalho de ritmo rápido e dinâmico. Esforce-se para obter fluxos de trabalho claros, fáceis de usar e robustos, com o mínimo de passos possível.
* O design deve enfatizar clareza e acessibilidade – alto contraste, fontes legíveis, texto grande e entradas.
* Se você estiver adaptando um aplicativo desenvolvido para outra plataforma, verifique se ele só inclui recursos e botões relevantes para o usuário da Cielo LIO.

### Publicação

**Detalhes da aplicação | Envio para certificação**

As seguintes informações são necessárias no momento de enviar seu aplicativo para certificação:

* Uma descrição clara e detalhada da finalidade do app.
* Uma listagem com as funcionalidades do app.
* As funções do SDK utilizadas e as APIs utilizadas pelo app.
* Possíveis casos de uso da aplicação.
* Alterações relativas à última versão.
* Dados para acesso. Por exemplo: login e senha relevantes. Caso seja necessário, descreva outro hardware ou os recursos necessários para analisar seu aplicativo.
* Versão do SDK utilizada.
* Versão Cielo OS utilizada.
* Screenshots das telas do app.

Certifique-se de que seu aplicativo não infringe os direitos de propriedade intelectual de terceiros, incluindo a marca Cielo, por exemplo. Não use Cielo ou qualquer outra marca registrada no nome do seu aplicativo para implicar a propriedade ou incluir a marca Cielo no domínio do seu site de ajuda.
