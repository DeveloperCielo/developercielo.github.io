---
layout: manual
title: Integração VTEX
description: Integração VTEX
search: true
translated: true
categories: manual
sort_order: 5
tags:
  - 1. API E-commerce
---

# Integração VTEX

A Cielo desenvolveu um novo conector na plataforma de e-commerce VTEX para utilização dos meios de pagamento e recursos disponíveis através das APIs de pagamento online da Cielo.  A usabilidade da plataforma deve ser consultada no [tutorial da VTEX](https://help.vtex.com/tutorial/){:target="_blank"}.

# Configuração

Para a configuração estar completa é preciso cadastrar **Afiliação de pagamento** para posteriormente vincular a uma **Condição de pagamento**.

Para mais informações, visite os artigos de suporte da VTEX: [Cadastrar afiliações de gateway](https://help.vtex.com/pt/tutorial/afiliacoes-de-gateway--tutorials_444){:target="_blank"} e [Configurar condições de pagamento](https://help.vtex.com/pt/tutorial/condicoes-de-pagamento--tutorials_455){:target="_blank"}.

## Afiliação de Pagamento

### 1. Acessando o Painel VTEX

Acesse o painel **ADMIN VTEX** (https://*nomedaloja*.myvtex.com/admin) e comece a navegação por **Configurações da loja** > **Pagamentos** > **Configurações** > **Afiliações de gateways** > **+**

![Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/00-afiliacao-21-02-24.jpg)

### 2. Selecionando o Conector

> Apenas o conector CieloEcommerce receberá manutenção e atualização. Não será possível a configuração com outros conectores. [Veja como migrar entre conectores](https://suporte.braspag.com.br/hc/pt-br/articles/18072079824155-Como-fazer-a-migra%C3%A7%C3%A3o-entre-conectores-VTEX-){:target="_blank"}

<aside class="notice">O número do pedido que é exibido na tela do comprador é registrado na VTEX como informação "orderId" para o conector CieloEcommerce e como "reference" para o conector Braspag. Portanto, preste atenção ao migrar de um conector para o outro.</aside>

Selecione o conector **CieloEcommerce** e insira as informações conforme recebidas após a contratação da solução.
 
![CieloEcommerce]({{ site.baseurl_root }}/images/modulos/vtex/01-cieloecommerce-21-02-2024.jpg)

[Veja as diferenças entre conectores legados e o novo conector **CieloEcommerce**](https://developercielo.github.io/manual/integracao-vtex#diferen%C3%A7as-entre-os-conectores-descontinuados-e-o-atual).

### 3. Escolhendo o Nome da Afiliação

Insira o Nome da Afiliação:

> É preciso configurar o mesmo conector com cada tipo de pagamento desejado, por isso preste atenção ao Nome da Afiliação utilizado. Sugerimos incluir no nome o provedor e meio de pagamento configurado, para facilitar o reconhecimento. Veja o exemplo:

![Nome da Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/02-nome-afiliacao-21-02-2024.jpg)

#### Exemplos de Nome da Afiliação

|Exemplo|Definição|
|-|-|
|CieloEcommerce - Alelo|Nesse exemplo o título relembra que qualquer condição de pagamento que utilizar essa afiliação vai utilizar Alelo como o provider.|
|CieloEcommerce - Cielo30 c/ 3DS c/ SPLIT|Nesse exemplo o título relembra que qualquer condição de pagamento que utilizar essa afiliação vai utilizar Cielo30 como o provider, fazer a autenticação com 3DS (se compatível) e realizar SPLIT de pagamento (se compatível).

### 4. Preenchendo Dados Necessários

Preencha os campos com os dados requisitados. A imagem a seguir é um **exemplo** do preenchimento para o conector **CieloEcommerce**; consulte a tabela [Dados da Afiliação](https://developercielo.github.io/manual/integracao-vtex#dados-da-afilia%C3%A7%C3%A3o) para verificar quais são os campos correspondentes ao conector desejado.

> Se o seu contrato é para vários provedores, sua integração será **Gateway**. Caso o seu contrato seja somente com a Cielo, sua integração será **Cielo**.

![1Dados Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/03a-dados-21-02-2024.jpg)
![2Dados Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/03b-dados-21-02-2024.jpg)
![3Dados Afiliação]({{ site.baseurl_root }}/images/modulos/vtex/03c-dados-22-03-2024.jpg)

#### Dados da Afiliação

|Campo|Descrição|
|-|-|
|**Chave de aplicação**|Insira o `MerchantID`.|
|**Token de aplicação**|Insira o `MerchantKey`.|
|**Nome**|Insira o nome identificador da afiliação.|
|**Integration**|Selecione **Adquirência** se a sua integração atual é **diretamente com a Cielo**. <br>Selecione **Gateway** se a sua integração atual é para utilização de **outros provedores via Pagador** (Gateway Braspag).|
|**Provider**|Selecione o provedor  que deseja configurar a afiliação conforme o tipo de pagamento. <br>Exemplo: Se o seu provedor de Boleto é o Bradesco e o seu provedor de Crédito, Débito e Pix é o Cielo será necessário adicionar duas afiliações. <br>O provedor **Simulado** deve ser utilizado para transações de teste.<br>O provedor **Cielo** deve ser configurado para Integração **Adquirência**. <br>O provedor **Cielo30** deve ser configurado para Integração **Gateway**.|
|**IsSplit**|Insira “Sim” ou “Não” se deseja utilizar o SPLIT de pagamentos. Disponível para os tipos de pagamento crédito, débito e boleto.|
|**UseMPI**|Insira “Sim” ou “Não” se deseja utilizar a **Autenticação 3DS 2.0**. Este campo é **obrigatório para o tipo de pagamento débito**.|
|**MpiClientId**|ID do MPI, disponibilizado para o cliente pela Cielo. *Campo relacionado à autenticação 3DS* *.|
|**MpiClientSecret**|Chave secreta do MPI, disponibilizada para o cliente pela Cielo. *Campo relacionado à autenticação 3DS* *.|
|**MpiMerchantName**|Nome da loja, disponibilizado pela Cielo. *Campo relacionado à autenticação 3DS* *.|
|**MpiMCC**|Merchant Category Code da loja, disponibilizado pela Cielo. *Campo relacionado à autenticação 3DS* *.|
|**MpiEstablishmentCode**|Código de estabelecimento da loja, disponibilizado pela Cielo. *Campo relacionado à autenticação 3DS* *.|
|**SoftDescriptor**|Valor que será concatenado com o valor de cadastro na adquirente para identificação na fatura. Permite no máximo 13 caracteres.|
|**AntifraudProvider**|**[Em homologação]** <br>Selecionar o provedor de Antifraude escolhido, caso tenha contratado o serviço com o comercial do Gateway ou da Cielo.|
|**Antifraud**|**[Em homologação]** <br>Selecionar o fluxo utilizado pelo serviço de antifraude, podendo optar pelo fluxo de análise antes da transação ser autorizada, **AnalyseFirst**, ou após a autorização, **AuthorizeFirst**.|
|**AntifraudSequenceCriteria**|**[Em homologação]** <br>Selecionar a sequência do fluxo de antifraude de acordo com a escolha da análise:<br>- Caso o fluxo escolhido tenha sido **AuthorizeFirst**, o lojista pode optar por sequenciar sempre, **Always** ou somente em casos de sucesso, **On Success**.<br>- Caso o fluxo escolhido tenha sido **AnalyseFirst**, a sequência sempre será **Always**.|
|**Captura**|Tempo em horas em que será enviada a solicitação de captura. Em **Padrão** ou **Desativado**, a captura será será realizada 4 dias após a autorização. Em **Imediatamente** a captura será realizada imediatamente após a autorização. Não configura Capture = ‘True’.|
|**UseVerifyCard**|Selecionar caso haja interesse em utilizar o serviço de [VerifyCard](https://developercielo.github.io/manual/integracao-vtex#verifycard). <br> Antes de configurar, confira se essa funcionalidade está habilitada em sua loja/EC.|
|**AcceptInternationalCard**|**[Exige VerifyCard]** <br> Selecionar se a loja aceitará cartões internacionais via VerifyCard.|
|**AcceptPrepaidCard**|**[Exige VerifyCard]** <br> Selecionar se a loja aceitará cartões pré-pagos via VerifyCard.|
|**SaveCard**|Selecionar caso a loja queira disponibilizar a opção de salvar cartão para futuras compras. <br> Antes de configurar, confira se a funcionalidade [Cartão Protegido](https://developercielo.github.io/manual/integracao-vtex#cart%C3%A3o-protegido) está habilitada em sua loja/EC.|
|**CancelRefundType**|Permite que o lojista escolha o fluxo de cancelamento/estorno de pedidos:<br>- **Automático sempre que possível**: autoriza o cancelamento e estorno de forma automática (fluxo padrão);<br>- **Manual de acordo com a loja (notificação por e-mail)**: todos os pedidos de cancelamento e estorno não são autorizados de forma automática e o lojista é notificado via e-mail.|
|**CieloLIOClientId**|Campo configurado apenas para a utilização do **SalesApp**. Caso use o conector exclusivamente para e-commerce, esse campo deverá ficar em branco.|

*O preenchimento dos campos relacionados ao MPI é opcional; você pode escolher preencher os dados de MPI e deixar a opção **UseMpi** desativada ("No") e, mais tarde, caso deseje ativar o 3DS para esta afiliação, apenas altere a opção **UseMpi** para "Yes".

Após salvar o conector, ele irá aparecer na lista **Processar com afiliação** da tela de configuração da **Condição de Pagamento**.

## Condição de Pagamento

### 1. Adicionando Nova Condição de Pagamento

Acesse **Transações** > **Configurações** > **Condições de Pagamento** > **+**

![Condições de pagamento]({{ site.baseurl_root }}/images/modulos/vtex/04-condicao.jpeg)

### 2. Configurando o Tipo de Pagamento

Selecione o tipo de pagamento que deseja configurar e insira as informações necessárias:

![Nome Condição]({{ site.baseurl_root }}/images/modulos/vtex/05-nome-condicao.jpeg)
 
|Campo|Descrição|
|-|-|
|Nome da Condição|Insira nome identificador da condição de pagamento. |
|Processar com a afiliação|Selecione a afiliação existente na lista conforme previamente cadastrada na seção Afiliação de Pagamento.|
|Usar solução antifraude|Esta opção apenas será exibida se houver Antifraude previamente cadastrado Afiliação de Pagamento.|

Da mesma forma que a Afiliação de Pagamento, é preciso configurar a condição de pagamento quantas vezes necessárias de acordo com o tipo de pagamento desejado, por isso fique atento ao Nome da Condição utilizada. O nome do conector é exibido e o tipo de pagamento também. Então sugerimos inserir somente as soluções que foram configuradas na afiliação selecionada.

### Exemplos de Nome da Condição

|Exemplo|Definição|
|-|-|
|Ticket|Nesse exemplo o título relembra que a condição de pagamento vai utilizar a afiliação configurada com Ticket como provider.|
|Cielo30 c/ 3DS c/ SPLIT|Nesse exemplo o título relembra que qualquer condição de pagamento vai utilizar a afiliação configurada com Cielo30 como provider, fazer a autenticação com 3DS (se compatível) e realizará SPLIT de Pagamento (se compatível)|

Após essas duas etapas concluídas com todas as condições de pagamento criadas, as opções de pagamento serão exibidas na tela de checkout da loja.

<aside class="notice">A VTEX  agenda a solicitação de captura para 4 dias após a autorização para o tipo de pagamento ‘Crédito’, quando não há configuração do tempo de captura.</aside>

<aside class="notice">A VTEX possui apenas cadastramento de seller do tipo pessoa ‘Jurídica’.</aside>

## Meios de Pagamento

### Boleto

Selecione a Condição de Pagamento desejada e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

### Crédito

Selecione a Condição de Pagamento desejada e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

### Débito

Selecione a Condição de Pagamento desejada e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

### Pix

Selecione a Condição de Pagamento desejada e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

> Caso o pagamento seja realizado em tempo superior a 60 segundos após a geração do QRCode, o status do pagamento será atualizado na plataforma VTEX a cada três horas.

### Voucher

Este meio de pagamento deve seguir a seção de [Pagamentos Customizados](https://braspag.github.io//tutorial/integracao-vtex#pagamentos-customizados) para que a opção seja exibida na Condição de Pagamento. Posteriormente, selecione a Condição de Pagamento com o nome escolhido anteriormente e configure conforme o passo a passo em [Condição de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#condi%C3%A7%C3%A3o-de-pagamento).

## Pagamentos Customizados

Para configurar pagamentos customizados, acesse **Transações** > **Configurações** > **Pagamentos Customizados** > **Cartão da Loja – Bandeira Própria** > **Configurar**

Nesta seção configure os dados para Private Label, Ticket e Alelo:

![1Pagamento Customizado]({{ site.baseurl_root }}/images/modulos/vtex/06a-pagamento-customizado.jpg)
![2Pagamento Customizado]({{ site.baseurl_root }}/images/modulos/vtex/06b-pagamento-customizado.jpg)

|Campo|Descrição|
|-|-|
|**Name**|**Valores Possíveis:** <br>Carrefour<br>Credz<br>CredSystem<br>DMCard<br>Ticket|
|**Descrição**|**Valores Possíveis:** <br>Carrefour<br>Credz<br>CredSystem<br>DMCard<br>Ticket|
|**Intervalos de BIN**|100000-999999|
|**Código de pagamento do adquirente**|**Valores Possíveis:** <br>580<br>565<br>550<br>564<br>634|
|**Usar nome do titular do cartão**|Sim|
|**Quantidade de dígitos do CVV**|[1]999|
|**Usar data de validade do cartão?**|Não|
|**Usar endereço de cobrança?**|Não|
|**Máscara do cartão**|9999 9999 9999 9999|
|**Validade do pagamento**|Não|
|**Autorizar automaticamente**|Não|
|**Ativar divisão de pagamento**|Não|

## 3DS

As credenciais recebidas para utilização da solução devem ser inseridas conforme o tópico [Afiliação de Pagamento](https://braspag.github.io//tutorial/integracao-vtex#afilia%C3%A7%C3%A3o-de-pagamento).

Para utilizar esta solução, é necessário instalar o aplicativo 3DS. Com o usuário logado, acesse a seguinte URL e substitua o *{nome_da_loja}* pelo nome de sua loja.

<aside class="notice">https://{nome_da_loja}.myvtex.com/admin/apps/braspag.braspag-3ds-payment-app@4.0.4/setup/</aside>

> O aplicativo deve ser instalado na loja que transacionará com o 3DS. Se mais de uma loja usará a solução, instale o app individualmente em cada uma das lojas.

Ao concluir a instalação, verifique se o aplicativo aparece em **Aplicativos** > **Meus Aplicativos**:

![3DS]({{ site.baseurl_root }}/images/modulos/vtex/09-3ds.png)

> Caso não use a solução 3DS, selecione o campo **UseMpi** como "No" em [Preenchendo os Dados Necessários](https://braspag.github.io//tutorial/integracao-vtex#4.-preenchendo-dados-necess%C3%A1rios).

## Split de Pagamentos

Para que o Split seja utilizado corretamente, os sellers de um marketplace devem estar previamente cadastrados na plataforma VTEX e deve ser informado ao time de implantação os dados de cadastro da VTEX juntamente com o CNPJ. Caso essa informação seja editada na VTEX, o time Cielo deve ser informado dos novos dados.

<aside class="notice">A plataforma VTEX não possui cadastramento de seller do tipo pessoa física. </aside>

> Para ativação do recurso Split abra um chamado no [suporte Cielo](https://suporte.braspag.com.br/hc/pt-br){:target="_blank"} e informe ao time de implantação os dados de seller cadastrados na plataforma VTEX. 

Para fazer o cadastro de um seller, acesse **Marketplace** > **Sellers** > **Gerenciamento**:

![Split1]({{ site.baseurl_root }}/images/modulos/vtex/07a-split.jpg)
![Split2]({{ site.baseurl_root }}/images/modulos/vtex/07b-split.jpg)

## Antifraude

Para que as transações sejam validadas pelo Antifraude é necessário que o conector de Antifraude **Braspag** esteja configurado previamente em Afiliação de Pagamento antes da etapa de Condição de Pagamento.

Para configurar, acesse **Transações** > **Configurações** > **Afiliações de gateways** > **+**

Selecione o conector **Braspag** (Soluções Antifraude) e insira as informações conforme recebidas após a contratação das soluções desejadas.

![Antifraude]({{ site.baseurl_root }}/images/modulos/vtex/08-antifraude.jpg)

|Campo|Descrição|
|-|-|
|**Id do Merchant**|Merchant ID do antifraude, disponibilizado pela Cielo.|
|**FingerPrint_OrgId**|Fingerprint Org ID, disponibilizado pela Cielo para validação na Cybersource.<br>Indica o ambiente na Threatmetrix: Sandbox ou Produção.|
|**FingerPrint_MerchantId**|Fingerprint Merchant ID, disponibilizado pela Cielo para validação na Cybersource.<br>Identificador da sua loja ou operação.<br> **É diferente do MerchantId**.|
|**Moeda**|Selecionar a moeda da transação Brasil Real (BRL)|
|**Versão de dados definidos da loja**|Utilizar sempre Retail_V4|
|**Enviar transações autenticadas**|Sim|

## VerifyCard

<aside class="warning">Essa funcionalidade está em homologação e não deve ser preenchida no momento.</aside>

O **VerifyCard** é composto por dois serviços: **Zero Auth** e **Consulta BIN**.

### Zero Auth

Antes de enviar um pagamento para autorização junto ao banco emissor, o serviço verifica se o cartão é válido ou não, sem comprometer nenhum valor na futura do seu cliente.

### Consulta BIN

Com a Consulta BIN, você consegue validar os cartões preenchidos pelo cliente no momento da compra, como: bandeira, banco, tipo do cartão, se é cartão estrangeiro, se é pessoa jurídica com física. Assim, você pode decidir seguir com a venda ou não.

## Cartão Protegido

<aside class="warning">Essa funcionalidade está em homologação e não deve ser preenchida no momento.</aside>

O **Cartão Protegido** é uma plataforma que permite o armazenamento seguro de cartões de crédito e débito. Contamos com ambiente totalmente certificado pelo respeitado conselho de padrão de segurança *PCI Security Standards Council*.

# Anexos

## Migração para novo conector

O novo conector CieloEcommerce será o único conector disponível a partir de **31 de janeiro de 2024**. O prazo para migração é **31 de março de 2024**. Todos os outros conectores serão descontinuados.

As seguintes mudanças acontecerão em comparação com os conectores que serão descontinuados:

### Cielo (legado)

Nesta tabela você pode conferir o que os campos representam no novo conector CieloEcommerce em comparação com o que representavam no conector Cielo, que foi descontinuado.

| CAMPO | CIELOECOMMERCE (NOVO) | CIELO (LEGADO) |
|---|---|---|
|`MerchantOrderId`|Número de identificação do pedido.<br>**Cielo:** MerchantOrderId|Campo permanece o mesmo.|Campo permanece o mesmo.|
|`Tid`|Id da transação no provedor de meio de pagamento.<br>**Cielo:** AcquirerTransactionID / Tid|Campo permanece o mesmo.|
|`Returncode`|Código de retorno da operação.<br>**Cielo:** ReasonCode / ProviderReturnCode / ReturnCode|Campo permanece o mesmo.|
|`Message`|Código de autorização.<br>**Cielo:** AuthorizationCode|Campo permanece o mesmo.|
|`authId`|Código de autorização.<br>**Cielo:** AuthorizationCode |Campo permanece o mesmo.|
|`nsu`|Número do comprovante de venda. <br>**Cielo:** ProofOfSale|Campo permanece o mesmo.|
|`metadados`|Campo adicional com `Name` e `Value`. <br>Informar:<br>**Name:**`paymentIdApi`;<br>**Name:** NSU_rede2captura;<br>**Name:** NSU_rede2cancelamento.|n/a|

### Cielo V3 (legado)

Nesta tabela você pode conferir o que os campos representam no novo conector CieloEcommerce em comparação com o que representavam no conector Cielo V3, que foi descontinuado.

| CAMPO | CIELOECOMMERCE (NOVO) | CIELO V3 (LEGADO) |
|---|---|---|
|`MerchantOrderId`|Número de identificação do pedido.<br>**Cielo:** MerchantOrderId|Campo permanece o mesmo.|
|`Tid`|Id da transação no provedor de meio de pagamento.<br>**Cielo:** AcquirerTransactionID / Tid|Campo permanece o mesmo.|
|`Returncode`|Código de retorno da operação.<br>**Cielo:** ReasonCode / ProviderReturnCode / ReturnCode|Campo permanece o mesmo.|
|`Message`|Código de autorização.<br>**Cielo:** AuthorizationCode|Campo permanece o mesmo.|
|`authId`|Código de autorização.<br>**Cielo:** AuthorizationCode |Campo permanece o mesmo.|
|`nsu`|Número do comprovante de venda. <br>**Cielo:** ProofOfSale|Campo permanece o mesmo.|
|`metadados`|Campo adicional com `Name` e `Value`. <br>Informar:<br>**Name:**`paymentIdApi`;<br>**Name:** NSU_rede2captura;<br>**Name:** NSU_rede2cancelamento.|n/a|

### Braspag (legado)

Nesta tabela você pode conferir o que os campos representam no novo conector CieloEcommerce em comparação com o que representavam no conector Braspag, que foi descontinuado.

| CAMPO | CIELOECOMMERCE (NOVO) | BRASPAG (LEGADO) |
|---|---|---|
|`MerchantOrderId`|Número de identificação do pedido.<br>**Cielo:** MerchantOrderId| Neste campo era utilizada a informação `reference` da VTEX e agora será utilizada a `orderId` da VTEX.|
|`Tid`|Id da transação no provedor de meio de pagamento.<br>**Cielo:** AcquirerTransactionID / Tid|O `PaymentId` que era informado neste campo agora será informado no metadados `paymentIdApi`.|
|`Returncode`|Código de retorno da operação.<br>**Cielo:** ReasonCode / ProviderReturnCode / ReturnCode|Campo permanece o mesmo.|
|`Message`|Código de autorização.<br>**Cielo:** AuthorizationCode|Campo permanece o mesmo.|
|`authId`|Código de autorização.<br>**Cielo:** AuthorizationCode |O `AcquirerTransactionID` que era informado aqui agora será informado no campo `Tid`. <br>Este campo refere-se ao que era informado no campo `AuthorizationCode`.|
|`nsu`|Número do comprovante de venda. <br>**Cielo:** ProofOfSale|O `AcquirerTransactionID` que era informado aqui agora será informado no campo `Tid`. Este campo refere-se ao que era informado no campo `proofOfSale`.|
|`metadados`|Campo adicional com `Name` e `Value`. <br>Informar:<br>**Name:**`paymentIdApi`;<br>**Name:** NSU_rede2captura;<br>**Name:** NSU_rede2cancelamento.|O `paymentIdApi` refere-se ao que era informado no `braspagTransactionID`.|

### Braspag V2, Cielo V4 e CieloEcommerce (legado)

Nesta tabela você pode conferir o que os campos representam no novo conector CieloEcommerce em comparação com o que representavam nos conectores Braspag V2, Cielo V4 e CieloEcommerce (legado), que foram descontinuados.

| CAMPO | CIELOECOMMERCE (NOVO) | BRASPAG V2 / CIELO V4 / CIELO ECOMMERCE (ATUAL) |
|---|---|---|
|`MerchantOrderId`|Número de identificação do pedido.<br>**Cielo:** MerchantOrderId|Campo permanece o mesmo.|
|`Tid`|Id da transação no provedor de meio de pagamento.<br>**Cielo:** AcquirerTransactionID / Tid|Campo permanece o mesmo.|
|`Returncode`|Código de retorno da operação.<br>**Cielo:** ReasonCode / ProviderReturnCode / ReturnCode|Campo permanece o mesmo.|
|`Message`|Código de autorização.<br>**Cielo:** AuthorizationCode|Campo permanece o mesmo.|
|`authId`|Código de autorização.<br>**Cielo:** AuthorizationCode |O `PaymentId` que era informado aqui agora será informado no metadados `paymentIdApi`.|
|`nsu`|Número do comprovante de venda. <br>**Cielo:** ProofOfSale|Os campos concatenados AuthorizationCode - Proofsale que eram informados aqui agora estão nos campos de referência `authId` e `proofOfSale`.|
|`metadados`|Campo adicional com `Name` e `Value`. <br>Informar:<br>**Name:**`paymentIdApi`;<br>**Name:** NSU_rede2captura;<br>**Name:** NSU_rede2cancelamento.|O `paymentIdApi` refere-se ao que era informado no `authId`.|

## Diferenças entre os conectores descontinuados e o atual

|Meios de Pagamento|Braspag|Braspag V2|Cielo V3|Cielo V4|CieloEcommerce|
|-|-|-|-|-|-|
|Boleto|**Gateway**:<br>- BancoDoBrasil2<br>- Bradesco2|Não se aplica|**Adquirência**:<br>- BancoDoBrasil2<br>- Bradesco2|Não se aplica|Não se aplica|
|Boleto Registrado|**Gateway**:<br>- BancoDoBrasil2<br>- Bradesco2|Não se aplica|**Adquirência**:<br>- BancoDoBrasil2<br>- Bradesco2|Não se aplica|**Adquirência**:<br>- Bradesco2<br>- BancoDoBrasil2<br>- BancoDoBrasil3<br>**Gateway**:<br>- Bradesco2<br>- BancoDoBrasil2<br>- BancoDoBrasil3<br>- Braspag<br> - ItauShopline<br>- Caixa2 <br>- CitiBank2<br>- Santander2|
|Crédito|**Gateway**:<br>- Banorte<br>- Redecard<br>- Ditef<br>- Amex 2P <br>- PagosOnLine<br>- PayVision<br>- Sitef<br>- GetNet <br>- Credibanco<br>- E-rede2<br>- E-rede<br>- SafraPay| **Gateway**:<br>- Cielo30<br>- Rede2|**Adquirência**:<br> - Cielo|**Adquirência**:<br>- Cielo|**Adquirência**:<br>- Cielo<br> **Gateway**:<br>- Cielo30<br>- Getnet<br>- Rede2 <br>- Safra2<br>- Banorte<br>- Credibanco2<br>- FirstData<br>- GlobalPayment<br>- Stone<br>- Transbank2<br>- Banese* <br> - BrasilCard* <br>- Carrefour* <br>- CredSystem* <br>- Credz* <br>- Dmcard*|
|Débito|**Gateway**:<br>- Cielo3.0<br>- GetNet<br>- Rede2|**Gateway**:<br>- Cielo3.0<br>- Rede2|**Gateway**:<br>- Cielo|**Gateway**:<br>- Cielo|**Adquirência**:<br>- Cielo<br>**Gateway**:<br>- Cielo30<br>- FirstData<br>- Getnet<br>- GlobalPayment<br>- Rede2<br>- Safra2|
|Pix|Não se aplica|Não se aplica|Não se aplica|Não se aplica|**Adquirência**:<br>- Bradesco2<br>- Cielo <br>**Gateway**:<br> - Cielo30<br>- Bradesco2|
|Voucher|Não se aplica|**Gateway**:<br>- Ticket|**Adquirência**:<br>- Alelo|Não se aplica|**Adquirência**:<br> - Alelo<br>**Gateway**:<br>- Ticket<br>- Alelo|

*Bandeira própria

> * A solução **Antifraude Braspag** é oferecida por todos os conectores.<br>
> * As soluções **3DS 2.0** e **Split de Pagamentos** são oferecidas apenas pelo conector CieloEcommerce.
