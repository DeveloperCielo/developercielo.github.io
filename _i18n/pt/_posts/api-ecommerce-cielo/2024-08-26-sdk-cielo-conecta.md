---
layout: manual
title: SDK Cielo Conecta
description: SDK Cielo Conecta
search: true
translated: true
categories: manual
sort_order: 10
tags:
  - 3. API Cielo Conecta
---

# <a name="_toc173245709"></a>**Documentação para Integração SDK A910/920**
-----
# <a name="_toc173245710"></a>**PayStore Android**
## <a name="_toc173245711"></a>**Documentação da Integração Android da PayStore**
Uma das formas de se integrar com a aplicação de pagamentos da Cielo é via IPC. Para isto, é fornecida uma biblioteca, a payments-api-x.x.x.x.aar, contendo todo o código necessário a ser usado para tais chamadas.

Usando esta API, é possível realizar todo o fluxo de pagamento, ou seja, a confirmação (ou o desfazimento) e o estorno. O pagamento pode ser realizado com um valor pré-definido ou com um valor em aberto, a ser digitado pelo operador do terminal. Além disso, pode-se informar uma lista de tipos de pagamentos (débito, crédito à vista, crédito parcelado, etc.) permitidos.

Ainda que esta integração se dê através de uma API, a aplicação de pagamentos da Cielo pode exibir informações na interface do terminal, tais como mensagens (e.g., "Insira ou passe o cartão"), ou mesmo solicitar informações do operador (e.g., CVV). Assim sendo, durante a realização de qualquer operação, a aplicação que solicitou a operação não deve interagir com a interface do dispositivo até que a operação seja concluída.

A seguir, temos a especificação detalhada das operações disponíveis.

Para integração com a API de pagamentos, é fornecida a interface PaymentClient presente na biblioteca.

![Material for MkDocs](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.005.png)

-----

# <a name="_toc173245712"></a>**Arquitetura**
A Plataforma Android da PayStore é composta por várias aplicações Android com o propósito de prover uma Arquitetura modular que forneça as seguintes capacidades:

● Fácil adição de novos Adquirentes sem comprometer as funcionalidades e certificação dos restantes.

● Fácil customização da identidade visual e funcionalidades básicas de acordo com as necessidades de cada Cliente.

● Controle sobre o uso das funcionalidades de sistema para garantir uma maior segurança dos seus usuários.

● Plataforma de desenvolvimento de aplicações integradas com o sistema de pagamentos.

A figura abaixo ilustra de forma macro a arquitetura da plataforma PayStore em cima dos terminais SmartPOS com sistema operacional Android:

![assets/images/Arquitetura](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.006.jpeg)

-----
# <a name="_toc173245713"></a>**Apks PayStore**
A seguir, temos uma visão geral mostrando os principais tipos de aplicações participantes da plataforma bem como a forma como elas interagem entre si. Em diagramas específicos de cada aplicação, poderá ser visto o que exatamente cada aplicação disponibiliza é responsável por fazer.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.007.jpeg)

-----
## <a name="_toc173245714"></a>**Payments App (Payments.apk)**
Esta aplicação executa como serviço no Android e é a responsável por realizar todas as operações referentes a pagamentos (TEF), seja o pagamento em si, estornos (cancelamentos) ou mesmo consultas a pagamentos já realizados para, por exemplo, a geração de relatórios.

A seguir, temos uma lista com as principais funcionalidades da aplicação:

● Prover interface (API) para outras aplicações executarem operações de pagamento via IPC, Intent e ContentProvider;

● Prover interface gráfica com o usuário para a realização das operações;

● Prover acesso à "calculadora" para a realização de pagamentos;

● Disponibilização de relatórios;

● Interface para seleção de pagamento para realização de estorno;

● Visualização de transações pendentes com possibilidade de resolução manual (confirmação ou desfazimento);

● Re exibição de comprovantes do último pagamento ou de um pagamento selecionado;

● Visualização de informações do Pinpad;

● Visualização de bandeiras disponíveis para pagamento;

● Realização do processo de credenciamento, quando a aplicação é instalada pela primeira vez;

● Acessar o PayStore Server para obter configurações do terminal;

● Enviar ao PayStore Server as informações referentes aos pagamentos efetuados;

● Enviar ao PayStore Server as informações referentes aos pagamentos pendentes;

● Controlar os agendamentos para:

● Envio de informações dos pagamentos para o PayStore Server;

● Execução de processo de resolução de pendência;

● Execução de processo de expurgo de dados.

-----
## <a name="_toc173245715"></a>**Módulos de Payments**
O módulo payments-app é responsável pela geração da aplicação Payments APP, referenciando dependências e fazendo a montagem dos componentes. Os demais são libs utilizadas pela aplicação ou módulos que agrupam funcionalidades que podem ser usadas em outras aplicações.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.008.jpeg)

**payments-api**: Lib disponibilizada para terceiros se integrarem com a plataforma para a realização de operações, tais como pagamento (débito/crédito/voucher), estorno, desfazimento, busca de informações de pagamentos realizados, etc.

-----
## <a name="_toc173245716"></a>**Acquirer Specific App (.apk)**
Esta aplicação executa como serviço no Android e é a responsável por realizar as integrações junto a uma adquirente específica. Assim, para cada adquirente habilitada para um terminal, deverá haver uma aplicação deste tipo executando.

A seguir, temos uma lista com as principais funcionalidades da aplicação:

● Prover interface via IPC para aplicativo de pagamento (Payments App) para as transações com a adquirente;

● Armazenar informações referentes aos pagamentos;

● Prover interface via ContentProvider para acesso às informações dos pagamentos.

-----
## <a name="_toc173245717"></a>**Módulos de Acquirer**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.009.jpeg)

-----
## <a name="_toc173245718"></a>**Platform App (platform.apk)**
Esta é a aplicação principal da plataforma, uma vez que é a responsável por gerenciar o dispositivo (telefone) e exibir as principais telas de interação com o usuário (operador).

Este aplicativo só estará presente em terminais que sejam de propriedade da rede de captura, ou seja, terminais utilizados exclusivamente para serem meios de pagamento.

A seguir, temos uma lista com as principais funcionalidades da aplicação:

● Ser launcher do dispositivo, exibindo tela com aplicações instaladas;

● Gerenciamento de economia de energia do terminal, ativando e desativando dispositivos, como WiFi e Bluetooth quando o terminal estiver em modo ocioso;

● Implementação de barra de tarefas própria;

● Tela para visualização de notificações do terminal;

● Gerenciamento de meio de comunicação (automático ou manual), ativando/desativando WiFi e comunicação por operadora (GPRS, 3G, 4G, etc.);

● Manutenção de operadores do terminal;

● Interface para visualização de informações gerais do terminal;

-----
## <a name="_toc173245719"></a>**Módulos do Plataform**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.010.jpeg)

-----
## <a name="_toc173245720"></a>**Paystore Client App (paystore-client.apk)**
Esta é a aplicação responsável pelo gerenciamento das instalações e atualizações de todas as aplicações da plataforma e de terceiros.

Este aplicativo só estará presente em terminais que sejam de propriedade da rede de captura, ou seja, terminais utilizados exclusivamente para serem meios de pagamento.

A seguir, temos uma lista com as principais funcionalidades da aplicação:

● Listar aplicativos disponíveis na PayStore para instalação;

● Listar aplicativos instalados no terminal;

● Gerenciar atualizações das aplicações, conforme informações da PayStore.

-----
## <a name="_toc173245721"></a>**Módulos do PayStore Client**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.011.jpeg)

Esta aplicação possui um único módulo, ou seja, o paystore-client-app que contém todo o código dessa aplicação.

-----
## <a name="_toc173245722"></a>**Acquirer Receipt Provider App (.apk)**
Esta é a aplicação responsável pelo gerenciamento das impressões dos comprovantes de pagamento. Assim, para cada adquirente habilitada para um terminal, deverá haver uma aplicação deste tipo executando.

Cada adquirente tem o seu layout de impressão, esse aplicativo recebe a solicitação de impressão de uma determinada adquirente e realiza a impressão do comprovante com layout específico daquela adquirente.

A seguir, temos uma lista com as principais funcionalidades da aplicação:

●     Gerenciar o layout do comprovante de cada adquirente;

●     Gerenciar a impressão da via do Cliente;

●     Gerenciar a reimpressão do comprovante.



-----
# <a name="_toc173245723"></a>**Terminais Homologados**

|**Modelo**|**Sistema Operacional**|**Fabricante**|
| :- | :- | :- |
|A920/A910|PayDroid based on Android 5.1|PAX|

-----
# <a name="_toc173245724"></a>**Publicar Aplicativo**
Para publicar um aplicativo, é necessário logar no Portal da PayStore como desenvolvedor. Para exemplificar usaremos o ambiente de desenvolvimento. Após realizar o login, acesse o menu Aplicativos -> Rascunhos.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.012.jpeg)

-----
## <a name="_toc173245725"></a>**Nova versão**
Se for a primeira vez que o aplicativo é publicado, clique no botão Novo Aplicativo. Após isso, será exibida uma tela, conforme mostrado abaixo:

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.013.jpeg)

Forneça as informações sobre o aplicativo. Ao preencher as palavras chaves, pressione **Enter** ao final, e clique em **Salvar rascunho**. Se tudo estiver certo, clique em **Publicar Aplicação**.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.014.png)

<aside class="warning"> Info Alguns fabricantes exigem que o aplicativo seja assinado por eles para que possa ser executado em terminais de produção. Desta forma, garanta que seu aplicativo esteja assinado para a tecnologia (Terminais Compatíveis) em que será utilizado.</aside>

Será exibida uma tela para selecionar qual Facilitador deverá aprovar sua aplicação. Observe que, a cada nova etapa do fluxo de publicação da aplicação, será necessária uma aprovação do Facilitador indicado. A cada mudança de etapa, o desenvolvedor será notificado por email

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.016.jpeg)

Para o Facilitador, o aplicativo estará no menu Aplicativos -> Candidatos. O Facilitador deve aprovar ou reprovar o aplicativo. Em caso de aprovação, o aplicativo segue para a etapa de Homologação.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.017.jpeg)

Uma vez homologado, o aplicativo estará apto para ser publicado. Dessa forma, estará disponível para ser baixado pela rede de terminais do Facilitador. Para publicar a aplicação, selecione-a e clique no botão *Publicar*.

Após publicar a aplicação, será exibida uma tela com os filtros de publicação. São esses filtros que vão definir que terminais irão receber a sua aplicação. Veja imagem abaixo:

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.018.png)

Parabéns, sua aplicação está publicada!

-----
## <a name="_toc173245726"></a>**Atualizar Versão**
Se você possui uma aplicação já publicada e deseja atualizar sua versão, siga as etapas abaixo:

1 - No projeto de sua aplicação, abra o arquivo build.gradle (Modulo App). Em *defaultConfig*, incremente o *VersionCode* e o *versionName*, dessa forma sua aplicação será aceita pelo Portal para substituir a versão já publicada.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.019.jpeg)

2 - Gere o apk da nova versão. Acesse o Portal da PayStore como descrito em Plubicar Aplicativo

3 - Selecione a opção Nova versão do aplicativo, conforme imagem abaixo:

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.020.png)

4 - Faça o upload do novo apk que se deseja publicar e clique em *Publicar Aplicativo*

Os próximos passos são semelhantes ao de publicar uma nova aplicação.

Parabéns, sua versão foi atualizada!



-----
# <a name="_toc173245727"></a>**Temas**
## <a name="_toc173245728"></a>**Customização de Temas**
Através do Portal da PayStore, é possível customizar o tema da aplicação de Pagamento, contudo isso também é possível via programação.
### <a name="_toc173245729"></a>**Métodos**

| **Assinatura** | **Descrição** |
|----------------|---------------|
| **void setTheme(String theme, PaymentCallback paymentCallback)** | Define um tema para a aplicação de pagamentos. |

**setTheme()**
Este método deve ser chamado para definir um tema com padrões de cores para as telas de captura na aplicação de Pagamentos.

### <a name="_toc173245731"></a>**Parâmetros**

| **Nome**   | **Tipo**          | **Obrigatório** | **Descrição**                                                                 |
|------------|-------------------|-----------------|-------------------------------------------------------------------------------|
| **theme**  | **String**         | Sim             | Nome do tema que será definido (*case-sensitive*).                            |
| **callback** | **PaymentCallback** | Sim             | Interface que será executada para notificações de sucesso ou erro.              |

### <a name="_toc173245732"></a>**Detalhe dos parâmetros:**  
### <a name="_toc173245733"></a>*theme*

|![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.021.png)

### <a name="_toc173245734"></a>**Callback**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|||Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|||Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|

**Exemplo**

```java
public class MyActivity extends Activity implements PaymentClient.PaymentCallback {

    private PaymentClient paymentClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment);
        paymentClient = new PaymentClientImpl();
    }

    @Override
    protected void onResume() {
        super.onResume();
        paymentClient.bind(this);
    }

    @Override
    protected void onDestroy() {
        try {
            paymentClient.unbind(this);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
        super.onDestroy();
    }

    public void doExecute() {
        ApplicationInfo appInfo = new ApplicationInfo();
        appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));
        appInfo.setSoftwareVersion("1.0.0.0");
        try {
            paymentClient.setTheme("GreyTheme", this);
        } catch (ClientException e) {
            Log.e(TAG, "Error setting theme", e);
        }
    }

    @Override
    public void onError(Object data) {
        Log.e(TAG, "Error: " + ((ErrorData) data).getResponseMessage());
    }

    @Override
    public void onSuccess(Object data) {
        Log.i(TAG, "Success!");
    }
}
```

| :- |
-----
# <a name="_toc173245735"></a>**Pré-requisitos**
## <a name="_toc173245736"></a>**IDE**
### <a name="_toc173245737"></a>**Android Studio**
Recomendamos a utilização do Android Studio

-----
## <a name="_toc173245738"></a>**Terminal físico**
### <a name="_toc173245739"></a>**Chaves (Desenvolvimento/Produção)**
Para iniciar o desenvolvimento, é necessário um terminal físico com chaves válidas de desenvolvimento ou produção. As chaves utilizadas devem ser de DEV, se o objetivo for o desenvolvimento de aplicativos. As chaves utilizadas devem ser de PROD, se o objetivo for capturar transações com as aplicações já existentes. As chaves devem ser adquiridas junto aos fabricantes dos terminais.

Veja quais terminais estão homologados

|***Warning***|
| :- |
|<h5>**Atualmente não é possível utilizar a integração de pagamento em emuladores Android ou SmartPhones. Essa solução foi desenvolvida para terminais POS (Point Off Service).**</h5>|
-----
## <a name="_toc173245740"></a>**Portal da PayStore**
### <a name="_toc173245741"></a>**Cadastros (Facilitador, Estabelecimento, Terminal)**
É necessário acessar o Portal da PayStore ambiente de desenvolvimento para esse primeiro contato e realizar os cadastros necessários para **inicializar o terminal** pela primeira vez. Nesse processo entre em contato com **a equipe de suporte**.
## <a name="_toc173245742"></a>**APKs PayStore necessários**
### <a name="_toc173245743"></a>**Sequência de Instalação**
Os aplicativos PayStore devem estar instalados no terminal. A instalação deve ser feita na seguinte ordem:

|**Aplicativos**|**Descrição**|
| :- | :- |
|1\.payments (Pagamentos)|Operações de pagamento.|
|2\.platform (Terminal)|Gerenciar terminal|
|3\.receipt (Comprovante)|Impressão|
|4\.acquirer (Adquirente)|Integração com as adquirentes|
|5\.client (Loja)|Loja PayStore|

Para mais informações sobre as aplicações da PayStore, veja Apks PayStore

|![(informação)]**Info**|
| :- |
|<h5>**Com o ADB devidamente instalado e configurado na sua máquina, abra o prompt dentro do diretório com os arquivos, e execute o comando conforme ordem acima:**</h5>|
##### **adb install -r [arquivo]**
Se preferir utilize o programa PayDroid

-----
## <a name="_toc173245744"></a>**Inicializar o terminal**
### <a name="_toc173245745"></a>**Inicialização PayStore**

|***Warning***|
| :- |
|<h5>**Para continuar é importante que, nesse ponto, seu terminal já esteja inicializado com a PayStore. Caso tenha dúvidas sobre esse procedimento, entre em contato com a equipe de suporte**</h5>|
-----
## <a name="_toc173245746"></a>**Tour pela documentação**
## <a name="_toc173245747"></a>**Ler a documentação**
Antes de iniciar de fato, é importante conhecer quais ferramentas estão disponíveis para o desenvolvimento. Por isso deve-se entender a arquitetura, os aplicativos envolvidos e como eles se comunicam. Veja as Referências API e explore todo o poder dessa integração.

-----
## ** 
## <a name="_toc173245748"></a>**App Demo Android**
Para facilitar sua integração, criamos um projeto demo desenvolvido em Android já integrado com app Pagamentos. Explore esse projeto para visualizar a integração em ação.
## <a name="_toc173245749"></a>**App Demo React-Native**
Criamos esse projeto demo para você ter liberdade de escolher qual tecnologia usar no desenvolvimento de sua aplicação. É possível integrar suas aplicações que não foram desenvolvidas, necessariamente em Android com nossas soluções de pagamento.

-----
## <a name="_toc173245750"></a>**Iniciar Integração**
## <a name="_toc173245751"></a>**Parabéns!**
Se você chegou até aqui, é porque já possui todas as informações necessárias de para iniciar o desenvolvimento do seu aplicativo integrado à nossa solução de pagamento. Caso tenha dúvidas, entre em contato com **a equipe de suporte**.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.022.png)

-----

# <a name="_toc173245752"></a>**Configurando Projeto**
## <a name="_toc173245753"></a>**Adicionando lib de Integração ao Projeto**
Entre em <project>\app do seu projeto e crie uma pasta chamada *libs*. Baixe a última versão da lib payments-api-x.x.x.x.aar e copie para a pasta criada no seu projeto.

Após isso, abra o arquivo build.gradle (Module app) e adicione as seguintes dependências em destaque:

|<h5>**implementation fileTree(dir: "libs", include: ["\*.jar", "\*.aar"])</h5><br>implementation 'org.parceler:parceler-api:1.1.12'</h5><br>annotationProcessor 'org.parceler:parceler:1.1.12'</h5><br>implementation 'com.google.code.gson:gson:2.8.5'**</h5>|
| :-: |


![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.023.jpeg)

Pronto! Seu projeto já está configurado e terá acesso às classes disponíveis na lib.
Vide [Referências API](#_referências_api).

Apontamento 3 - esse link aponta pra o fornecedor

-----
## <a name="_toc173245754"></a>**Configurando projeto para debug**
Se o seu aplicativo está sendo desenvolvido para rodar em terminais POS (Point Of Service), é importante que seu aplicativo seja publicado na Paystore o quanto antes, mesmo que ainda esteja no começo.

Isso é necessário para que o terminal não remova o seu aplicativo automaticamente ao identificar que o app não está presente na loja da Paystore. Por isso não perca tempo e faça a publicação do seu app assim que possível. Veja como é simples aqui, caso necessário entre em contato com nosso suporte.



-----
# <a name="_toc173245755"></a>**Telas do Fluxo de Pagamento**
Ao realizar a integração do seu app com a aplicação de pagamento da PayStore e invocar o método que inicia o fluxo de pagamento startPaymentV2(), por exemplo, o fluxo da aplicação passa a ser controlado por payments. Neste processo, algumas telas serão apresentadas para o usuário, conforme a seguir:
## <a name="_toc173245756"></a>**Tela de captura de valor**
Caso o aplicativo que chamou a integração de pagamento não informe o valor, este será solicitado ao usuário. Essa tela também possui uma calculadora integrada para outras operações.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.024.jpeg)
## <a name="_toc173245757"></a>**Tela de seleção de tipo de pagamento**
Essas opções também podem ser configuradas na integração.

![](Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.025.jpeg)
## <a name="_toc173245758"></a>**Tela de seleção de operação de crédito**
Essas opções também podem ser configuradas na integração.



![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.026.jpeg)
## <a name="_toc173245759"></a>**Tela de solicitação de leitura do cartão**
O cliente ou o operador deve inserir ou passar o cartão.

![](Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.027.jpeg)
## <a name="_toc173245760"></a>**Tela de solicitação de digitação da senha do cartão**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.028.jpeg)
## <a name="_toc173245761"></a>**Tela de solicitação para retirar o cartão inserido, se for este o caso**
![](Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.029.jpeg)
## <a name="_toc173245762"></a>**Tela de impressão da Via do Cliente**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.030.jpeg)

Ao final, o fluxo de pagamento será retornado para a aplicação que o chamou através do 
##### **onSuccess() ou onError().**




















-----
# <a name="_toc173245763"></a>**App Demo**

repositório: *App Demo Android*

Aplicativo desenvolvido em Android integrado com a API de Pagamento da PayStore. Através desse aplicativo é possível realizar: Pagamento -> Confirmação ou Desfazimento -> Impressão do comprovante, desfazimento de pagamento ou estorno, Estorno de Pagamento e consultar Pagamento. Seguem algumas observações:
## <a name="_toc173245764"></a>**Tela principal com as opções possíveis do App Demo**
No menu no canto superior direito, é possível definir a adquirente corrente. Os tipos de pagamento serão definidos de acordo com a adquirente selecionada.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.031.jpeg)
### <a name="_toc173245765"></a>**Tela com opções para realizar o pagamento, onde é possível informar as seguintes informações:**
● Digitar o valor do pagamento. Caso o valor não seja digitado será solicitado pela integração;

● Digitar número de parcelas (opcional) para pagamentos parcelados;

● Digitar e-mail para criar token do cartão. Isso é usado para pagamentos recorrentes;

● Selecionar os tipos de pagamento. É possível escolher quais opções serão exibidas pelo App de pagamentos.

Após realizar o pagamento através da opção Fazer Pagamento, é necessário fazer a **confirmação ou o desfazimento**.

A opção Fazer Pagamento de ponta a ponta realiza o fluxo de pagamento completo ou seja pagamento, confirmação e impressão.

![](Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.032.jpeg)![](Ahttps://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/spose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.033.jpeg)
## <a name="_toc173245766"></a>**Tela de seleção de operação de crédito**
E essas opções também podem ser configuradas na integração.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.034.jpeg)
## <a name="_toc173245767"></a>**Tela de confirmação e desfazimento do pagamento**
Lista o pagamento com o *status* de pendente para ser confirmado.

![](Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.035.jpeg)
## <a name="_toc173245768"></a>**Tela de estorno do pagamento**
Lista todos os pagamentos confirmados. O usuário deve selecionar o pagamento que deseja estornar.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.036.jpeg)![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.037.jpeg)
## <a name="_toc173245769"></a>**Tela de desfazimento do estorno**
Lista todos os estornos. O usuário deve selecionar o estorno que deseja realizar o desfazimento.

|**Warning**|
| :-: |
|<h5>**A depender do comportamento de cada adquirente, é possível que não haja desfazimento para a transação de estorno.**</h5>|
![](Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.038.jpeg)
## <a name="_toc173245770"></a>**Listar Pagamentos**
Realiza uma consulta dos pagamentos de acordo com os filtros escolhidos.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.039.jpeg)
## <a name="_toc173245771"></a>**Resolver Pendências**
Realiza a confirmação de todos os pagamentos que estão pendentes.
## <a name="_toc173245772"></a>**Definir Tema da Aplicação**
Define o Tema da aplicação de pagamentos. Dessa maneira, é possível mudar a cor da aplicação. As opções disponíveis são:

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.040.jpeg)
## <a name="_toc173245773"></a>**Definir Aplicação Principal**
Através dessa opção, o Facilitador pode definir o apk desenvolvido por ele como o principal. Dessa forma, quando o terminal for ligado, a aplicação do Facilitador será chamada ao invés da aplicação padrão de pagamento da PayStore.

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.041.jpeg)

-----

# <a name="_toc173245774"></a><a name="_referências_api"></a>**Referências API**
## <a name="_toc173245775"></a>**Credenciais para Integração**
Para realizar a integração entre aplicativos e a solução de pagamento da PayStore, é necessário adquirir algumas credenciais. As credenciais são geradas ao realizar a publicação do aplicativo no Portal da PayStore, através da opção Aplicativos -> Publicados -> Detalhes da aplicação. Serão exibidos o *APLICATION\_ID* e o *SECRET\_TOKEN*. Estas informações devem ser adicionadas ao aplicativo em desenvolvimento que deseja realizar a integração de pagamento.

|**Warning**|
| :-: |
|<h5>**As credenciais para o ambiente de desenvolvimento são**</h5>|
|<h5>**public static final String TEST\_APPLICATION\_ID = "0";</h5><br>public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";**</h5>|


A classe CredentialsUtils.java presente no projeto demo mostra uma forma de implementar as credenciais que serão usadas no request do pagamento através da classe PaymentRequestV2.java que está presente na lib de integração payments-api-x.x.x.x.aar. Para mais detalhes, veja o projeto demo.

-----
<a name="_toc173245776"></a>**Pagamento

[DEPRECATED] Integração com Pagamentos V1**
===========================================
Uma das formas de se integrar com a aplicação de pagamentos da Cielo é via [IPC](https://developer.android.com/guide/components/aidl.html). Para isto, é fornecida uma biblioteca, a [payments-api-x.x.x.x.aar](https://github.com/paystore/paystore-api-demo/tree/master/app/aars), contendo todo o código necessário a ser usada para tais chamadas.

Usando esta API, é possível realizar todo o fluxo de pagamento, ou seja, a confirmação (ou o desfazimento) e o estorno. O pagamento pode ser realizado com um valor pré-definido ou com um valor em aberto, a ser digitado pelo operador do terminal. Além disso, pode-se informar uma lista de tipos de pagamentos (débito, crédito à vista, crédito parcelado, etc.) permitidos.

Ainda que esta integração se dê através de uma API, a aplicação de pagamentos pode exibir informações na interface do terminal, tais como mensagens (e.g., "Insira ou passe o cartão"), ou mesmo solicitar informações do operador (e.g., CVV). Assim sendo, durante a realização de qualquer operação, a aplicação que solicitou a operação não deve interagir com a interface do dispositivo até que a operação seja concluída.

A seguir, temos a especificação detalhada das operações disponíveis.

Para integração com a API de pagamentos, é fornecida a interface PaymentClient.

|**Warning**|
| :-: |
|<h5>**O método PaymentClient.Bind(\_callback) deve ser chamado, obrigatoriamente, antes de chamar qualquer método da Integração de Pagamento. O bind é assíncrono, ou seja, a próxima linha após o bind() será executada antes de receber a sua resposta, por isso, garanta que, antes de chamar os métodos de integração, o bind esteja conectado.**</h5>|
## <a name="_toc173245777"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void startPayment(PaymentRequest paymentRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de autorização de pagamento. (DEPRECATED: Utilizar startPaymentV2)|
|<h5>**void confirmPayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Confirma uma autorização de pagamento realizada anteriormente.|
|<h5>**void cancelPayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Desfaz uma autorização de pagamento realizada anteriormente.|
#### **startPayment() (DEPRECATED: Utilizar startPaymentV2)**
Este método deve ser chamado quando se deseja fazer uma solicitação de autorização de pagamento. Durante sua execução, os dados do pagamento serão validados, informações adicionais serão solicitadas ao operador (e.g. senha e CVV), e a autorização junto à adquirente será feita.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**PaymentRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do pagamento. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de pagamento.|

**Detalhe dos Parâmetros**
#### ***request (PaymentRequest)***

|<h5>**Nome**</h5>|<h5>**Tipo**</h5>|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor do pagamento solicitado. Caso não seja preenchido (null), a interface solicitará o valor ao operador.|
|<h5>**paymentTypes**</h5>|<h5>**List<PaymentType>**</h5>|**Não**|Tipos de pagamentos (Débito, Crédito, Voucher, etc.) permitidos para este pagamento. Caso seja vazio, ou seja, null, significa que todos os tipos são permitidos. Caso contenha apenas um, este tipo será o utilizado (se possível) e não será perguntado nada ao operador.|
|<h5>**installments**</h5>|<h5>**Integer**</h5>|**Não**|Quantidade de parcelas. Usado apenas para tipos de pagamentos que suportem parcelamento e neste caso é obrigatório. Valor deve ser entre 2 e 99.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação integrada. O Identificador referido é aquele utilizado na aplicação que originou a solicitação de pagamento. Não deve se repetir.|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**showReceiptView (DEPRECATED)**</h5>|<h5>**Boolean**</h5>|**Não**|A Solução sempre irá imprimir o comprovante depois que a [confirmação](#_confirmpayment\(\)) for executada.|
#### ***callback (PaymentCallback)***

|<h5>**Nome**</h5>|<h5>**Tipo**</h5>|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**Payment.value**</h5>|<h5>**BigDecimal**</h5>|**Sim**|Valor do pagamento. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**Payment.paymentType**</h5>|<h5>**PaymentType**</h5>|**Sim**|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**Payment.installments**</h5>|<h5>**Integer**</h5>|**Não**|Quantidade de parcelas do pagamento.|
|<h5>**Payment.acquirer**</h5>|<h5>**String**</h5>|**Sim**|Adquirente que autorizou o pagamento.|
|<h5>**Payment.paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**Payment.brand**</h5>|<h5>**String**</h5>|**Sim**|Bandeira do cartão.|
|<h5>**Payment.bin**</h5>|<h5>**String**</h5>|**Sim**|BIN do cartão.|
|<h5>**Payment.panLast4Digits**</h5>|<h5>**String**</h5>|**Sim**|Últimos 4 dígitos do PAN do cartão.|
|<h5>**Payment.captureType**</h5>|<h5>**CaptureType**</h5>|**Sim**|Forma de captura do cartão.|
|<h5>**Payment.paymentStatus**</h5>|<h5>**PaymentStatus**</h5>|**Sim**|Situação do pagamento. No caso de solicitações retornadas com sucesso, esta informação sempre será PENDING, requerendo uma confirmação ou desfazimento para a sua conclusão definitiva.|
|<h5>**Payment.paymentDate**</h5>|<h5>**Date**</h5>|**Sim**|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**Payment.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**Payment.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da adquirente.|
|<h5>**Payment.acquirerResponseDate**</h5>|<h5>**String**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**Payment.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número da autorização fornecido pela adquirente (consta no comprovante do Portador do Cartão).|
|<h5>**Payment.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente.|
|<h5>**Payment.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento.|
|<h5>** </h5>|<h5>** </h5>|** | |
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
#### **confirmPayment()**
Este método deve ser chamado para confirmar uma transação que o terminal conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para uma transação já confirmada, ou seja, em que já se executou o método **confirmPayment()** anteriormente.

Este método **não** deve ser chamado para uma transação já desfeita, ou seja, em que já se executou o método **cancelPayment()** anteriormente.

Este método **não** deve ser chamado para uma transação que foi negada pelo Autorizador, ou seja, a transação precisa ter sido autorizada pelo Autorizador.

Após a execução desta confirmação, a transação só poderá ser cancelada através de uma operação de estorno. O estorno é a operação executada pelo menu CANCELAMENTO do terminal.

Caso o App consumidor desta API tenha finalizado o seu processo de negócio com êxito, porém não tenha chamado o método **confirmPayment()**, a transação permanecerá com o seguinte *status*: Situação PayStore = "Pendente". Resolução no Adquirente = "Pendente".

Como resultado, poderemos ter uma inconsistência transacional, visto que, na virada do dia, algumas redes adquirentes confirmam automaticamente as transações que não receberam a perna de confirmação. Outras redes adquirentes trabalham apenas com duas pernas, sem a necessidade de perna de confirmação. Neste caso, se houver algum problema na conclusão da transação no lado do terminal, é imperativo que a solução de captura execute o método **cancelPayment()**, a fim de desfazer a transação no adquirente e evitar cobrança para o cliente Portador do Cartão.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será confirmada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**
#### ***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
#### **cancelPayment()**
Este método deve ser sempre chamado para desfazer uma transação que o terminal não conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para uma transação já confirmada, ou seja, em que já se executou o método **confirmPayment()** anteriormente.

Este método **não** deve ser chamado para desfazer uma transação já desfeita, ou seja, em que já se executou o método **cancelPayment()** anteriormente.

Este método **não** deve ser chamado para uma transação que foi negada pelo Autorizador.

Este método **não** é um estorno. O estorno é a operação executada pelo menu CANCELAMENTO do terminal. O estorno é executado em transações que foram concluídas com êxito, ou seja, foram confirmadas.

Após a execução do desfazimento, **cancelPayment()**, a transação não poderá ser mais confirmada pela aplicação do terminal, ou seja, não se pode mais executar o método **confirmPayment()**.

Caso o App consumidor desta API não tenha finalizado o seu processo de negócio com êxito, é imprescindível a chamada do método **cancelPayment()**. A consequência de não cancelar uma transação que não teve seu processo de negócio concluído é semelhante à consequência de não confirmar. Porém, nesse caso, com um agravante, pois provavelmente o cliente não levará o produto/serviço associado à transação financeira, ou uma nova tentativa de venda poderá ser feita, resultando em uma cobrança em duplicidade para o cliente Portador do Cartão.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será desfeita. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**
#### ***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245778"></a>**Exemplo do fluxo de Pagamento**

|<p><h5>**package com.example.appmanoel;**</h5></p><p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;</h5><br>import br.com.phoebus.android.payments.api.ErrorData;</h5><br>import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentRequest;</h5><br>import br.com.phoebus.android.payments.api.exception.ClientException;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener, PaymentClient.PaymentCallback<Payment> {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";</h5><br> </h5><br>`    `@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`        `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `PaymentRequest request = new PaymentRequest();</h5><br>`        `request.setValue(new BigDecimal(50));</h5><br>`        `request.setAppTransactionId("123456");**</h5></p><p><h5>`        `**Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`       `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**request.setAppInfo(applicationInfo);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.startPayment(request, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error starting payment", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>**@Override</h5><br>`    `public void onSuccess(Payment payment) {</h5><br>`        `Log.i(TAG, payment.toString());**</h5></p><p><h5>`        `**doConfirmPayment(payment);</h5><br>`        `/\*</h5><br>`          `Se, na sua regra de negócio, for preciso desfazer a transação por algum motivo,</h5><br>`          `chame o método doCancelPayment()</h5><br>`        `\*\*/</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`       `Log.e(TAG, errorData.getResponseMessage());</h5><br>`        `Toast.makeText(this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`    `}**</h5></p><p><h5>`    `**private void doConfirmPayment(Payment payment) {</h5><br>`        `try {</h5><br>`            `paymentClient.confirmPayment(payment.getPaymentId(),</h5><br>`                    `new PaymentClient.PaymentCallback<Payment>() {**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onError(ErrorData errorData) {</h5><br>`                            `Log.e(TAG, errorData.getResponseMessage());</h5><br>`                            `Toast.makeText(MainActivity.this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                        `}**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onSuccess(Payment payment) {</h5><br>`                            `Log.i(TAG, payment.toString());</h5><br>`                        `}**</h5></p><p><h5>`                    `**});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error confirmPayment", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private void doCancelPayment(Payment payment) {</h5><br>`        `try {</h5><br>`            `paymentClient.cancelPayment(payment.getPaymentId(),</h5><br>`                    `new PaymentClient.PaymentCallback<Payment>() {**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onError(ErrorData errorData) {</h5><br>`                           `Log.e(TAG, errorData.getResponseMessage());</h5><br>`                            `Toast.makeText(MainActivity.this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                        `}**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onSuccess(Payment payment) {</h5><br>`                            `Log.i(TAG, payment.toString());</h5><br>`                        `}</h5><br>`                    `});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error cancelPayment", e);</h5><br>`        `}</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245779"></a>**Integração com Pagamentos V2**
Uma das formas de se integrar com a aplicação de pagamentos da Cielo é via [IPC](https://developer.android.com/guide/components/aidl.html). Para isto, é fornecida uma biblioteca, a [payments-api-x.x.x.x.aar](https://github.com/paystore/paystore-api-demo/tree/master/app/aars), contendo todo o código necessário a ser usado para tais chamadas.

Usando esta API, é possível realizar todo o fluxo de pagamento, ou seja, a confirmação (ou o desfazimento) e o estorno. O pagamento pode ser realizado com um valor pré-definido ou com um valor em aberto, a ser digitado pelo operador do terminal. Além disso, pode-se informar uma lista de tipos de pagamentos (débito, crédito à vista, crédito parcelado, etc.) permitidos.

Ainda que esta integração se dê através de uma API, a aplicação de pagamentos da Cielo pode exibir informações na interface do terminal, tais como mensagens (e.g., "Insira ou passe o cartão"), ou mesmo solicitar informações do operador (e.g., CVV). Assim sendo, durante a realização de qualquer operação, a aplicação que solicitou a operação não deve interagir com a interface do dispositivo até que a operação seja concluída.

A seguir, temos a especificação detalhada das operações disponíveis.

Para integração com a API de pagamentos, é fornecida a interface PaymentClient presente na biblioteca.

|**Warning**|
| :-: |
|<h5>**O método PaymentClient.Bind(\_callback) deve ser chamado, obrigatoriamente, antes de chamar qualquer método da Integração de Pagamento. O bind é assíncrono, ou seja, a próxima linha após o bind() será executada antes de receber a sua resposta, por isso garanta que, antes de chamar os métodos de integração, o bind esteja conectado.**</h5>|
## <a name="_toc173245780"></a>**Fluxo de Pagamento**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.042.jpeg)



|**Passos**|**Sucesso**|**Erro**|
| :- | :- | :- |
|1\.Solicitação de pagamento|O pagamento foi realizado e seu status é Pendente|O pagamento não foi realizado. A resposta contém informações do erro.|
|2\.Resposta solicitação de pagamento|A resposta contém informações do pagamento realizado.|A resposta contém informações do erro da solicitação.|
|3\.Solicitação de confirmação|Confirmação realizada, seu status é Confirmada, não pode ser desfeita.|Confirmação não realizada. A resposta contém informações do erro.|
|4\.Resposta da confirmação|A resposta contém informações da confirmação realizada. Impressão do Comprovante|A resposta contém informações do erro da solicitação. Nesse ponto pode ser enviado o desfazimento.|
|5\.Solicitação de desfazimento|Desfazimento realizado, seu status é Desfeita. Não pode ser confirmada.|A resposta contém informações do erro da solicitação. O status continua Pendente.|
|6\.Resposta do desfazimento|A resposta contém informações do desfazimento realizado.|A resposta contém informações do erro da solicitação.|

O pagamento só é finalizado quando existe uma confirmação ou um cancelamento (desfazimento). Em caso de confirmação, o comprovante estará disponível para impressão ou envio por SMS/e-mail, dependendo das funcionalidades do terminal.

**A partir da versão 3.1.4.3**

Quando uma transação é feita e o app solicita sua confirmação (confirmPayment()) ou desfazimento (cancelPayment()), a resposta solicitação será enviada ao app assim que a transação for resolvida localmente pelo terminal, eliminando a necessidade de o app esperar a resolução com o autorizador para dar continuidade ao fluxo.

Após isto, o terminal tentará resolver a transação com o autorizador. Isto pode ocorrer imediatamente ao finalizar a transação, ou posteriormente, na resolução de pendências.
## <a name="_toc173245781"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void startPaymentV2(PaymentRequestV2 paymentRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de autorização de pagamento.|
|<h5>**void confirmPayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Confirma uma autorização de pagamento realizada anteriormente.|
|<h5>**void cancelPayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Desfaz uma autorização de pagamento realizada anteriormente.|
|<h5>**void getPayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Realiza consulta dos dados de uma transação diretamente no servidor connecta.|

-----
### <a name="_toc173245782"></a>**startPaymentV2()**
Este método deve ser chamado quando se deseja fazer uma solicitação de autorização de pagamento. Durante sua execução, os dados do pagamento serão validados, informações adicionais serão solicitadas ao operador (e.g. senha e CVV), e a autorização junto à adquirente será feita.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**PaymentRequestV2**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do pagamento. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de pagamento.|

**Detalhe dos Parâmetros** *request (**PaymentRequestV2**)*



|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|<p>Valor do pagamento solicitado. Caso não seja preenchido (null), a interface solicitará o valor ao operador.</p><p>O valor deverá ser formatado com duas casas decimais.</p>|
|<h5>**additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|**Não**|Tipo de valor adicional (Cashback, TIP, etc.). Se não estiver preenchido (nulo), deve-se ignorar o campo "additionalValue". ‘AdditionalValueType’ deve admitir, para FastTrack, apenas o valor CASHBACK. Depois de ler o cartão, se o AdditionalValueType informado não for compatível com produto banner do Cartão, o terminal exibe um erro na tela e finaliza a transação. Para evitar que esse erro ocorra, é recomendado usar este campo apenas junto com um "productShortName", que deve ser preenchido cmo um produto que suporta o uso do tipo de valor adicional em questão. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1|
|<h5>**additionalValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor adicionado ao valor da transação. Se "additionalValueType" for relatado e "additionalValue" não foi preenchido (nulo) ou é igual a 0 (zero), a interface irá pedir ao operador o valor adicional. Se "additionalValueType" for preenchido e "additionalValue" tiver um valor mais alto do que 0 (zero), a interface não pedirá ao operador o valor adicional. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1|
|<h5>**paymentTypes**</h5>|<h5>**List<PaymentType>**</h5>|**Não**|Tipos de pagamentos (Débito, Crédito, Voucher, etc.) permitidos para este pagamento. Caso seja vazio, ou seja, null, significa que todos os tipos são permitidos. Caso contenha apenas um, este tipo será o utilizado (se possível) e não será perguntado nada ao operador. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1|
|<h5>**installments**</h5>|<h5>**Integer**</h5>|**Não**|Quantidade de parcelas. Usado apenas para tipos de pagamentos que suportem parcelamento e neste caso é obrigatório. Valor deve ser entre 2 e 99.|
|<h5>**accountTypeId**</h5>|<h5>**String**</h5>|**Não**|Tipo de conta. Se não for preenchido (nulo), a interface pode perguntar ao operador o tipo de conta, dependendo da configuração do produto principal associado ao cartão usado na transação. Depois de ler o cartão, se o accountTypeId inserido não existir na cnofiguração do produto de bandeira do Cartão, o terminal exibe um erro na tela e finaliza a transação. Para evitar que esse erro ocorra, é recomendado usar este campo apenas junto com um "productShortName", onde deve constar um produto que suporta o uso do tipo de conta. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1|
|<h5>**planId**</h5>|<h5>**String**</h5>|**Não**|Identificação do plano de pagamento. Pode ter um ou dois caracteres, a depender da regra da adquirente selecionada. Se não for preenchido (nulo), a interface pode solicitar o plano para a operadora, de acordo com a configuração do produto de bandeira associado ao cartão usado na transação. Depois de ler o cartão, se o planId relatado não for compatível com o número de parcelas (capturado no terminal ou informado no parâmetro "Parcelas") e com a configuração do produto de bandeira do cartão (observando as configurações planCondition, planType e planList), o terminal mostra um erro na tela e finaliza a transação. A fim de evitar que esse erro ocorra, é recomendado usar este campo apenas junto com um "productShortName", onde deve constar um produto que apóia o plano referido. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação integrada para o software. O Identificador referido é aquele utilizado na aplicação que originou a solicitação de pagamento. Não deve se repetir.|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**showReceiptView (DEPRECATED)**</h5>|<h5>**Boolean**</h5>|**Não**|A Solução irá utilizar o valor dos parâmetros printMerchantReceipt e printCustomerReceipt para executar a impressão depois que a [confirmação](#_confirmpayment\(\)) for executada.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não depois da [confirmação](#_confirmpayment\(\)) da transação. O valor padrão é *true*, isto é, o comprovante é impresso.|
|<h5>**printCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do cliente deve ser impresso ou não depois da [confirmação](#_confirmpayment\(\)) da transação. O valor padrão é *true*, isto é, o comprovante é impresso.|
|<h5>**tokenizeCard**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se deve ser feita ou não a tokenização do cartão após a aprovação do pagamento ou não. O valor padrão é false, isto é, não será feita a tokenização.|
|<h5>**tokenizeEmail**</h5>|<h5>**String**</h5>|**Se tokenizeCard for true, sim, caso contrário, não.**|E-mail do portador do cartão. Se “tokenizeCard” for false, este parâmetro é ignorado.|
|<h5>**tokenizeNationalDocument**</h5>|<h5>**String**</h5>|**Não**|CPF ou CNPJ do portador do cartão. Se “tokenizeCard” for false, este parâmetro é ignorado. Se for true, mas não for informado esse parâmetro, então a chamada à API de criação de token no e-commerce também não o utilizará.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Identificação resumida do produto de bandeira do cartão. Depois de ler o cartão e identificar o produto de bandeira, se ele não corresponder ao productShortName referido, o terminal exibe um erro na tela e finaliza a transação. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1, o terminal exibe um erro caso o campo seja informado e este valor corresponda a um produto cujo campo acquirerParams.allowQRCode seja false; Ou o campo acquirerParams.qrPaymentMethodId não esteja configurado; Ou se o produto existir, mas não estiver habilitado no terminal.|
|<h5>**note**</h5>|<h5>**String**</h5>|**Não**|Texto adicional que é inserido como Nota. (pode ser o número da fatura)|
|<h5>**dni**</h5>|<h5>**String**</h5>|**Não**|Número do Documento. Para pagamentos de QRCode estático não considerar este parâmetro quando operationMethodAllowed = 1|
|<h5>**operationMethodAllowed**</h5>|<h5>**Integer**</h5>|**Sim**|Indica o método de operação de pagamento, anulação e devolução. Admita os seguintes valores: 0 - Apenas com cartão físico (lido ou digitado); 1 - Somente com QRCode.|
|<h5>**allowBenefit (OBSOLETO)**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o QRCode deve ser gerado com as opções do produto associadas aos benefícios. O valor padrão é 'verdadeiro', ou seja, os benefícios serão adicionados.|
|<h5>**previewMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do estabelecimento deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**previewCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do cliente deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
#### ***callback (PaymentCallback)***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**Payment.value**</h5>|<h5>**BigDecimal**</h5>|**Sim**|Valor do pagamento. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**Payment.additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|**Não**|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**Payment.additionalValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**Payment.paymentType**</h5>|<h5>**PaymentType**</h5>|**Sim**|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**Payment.installments**</h5>|<h5>**Integer**</h5>|**Não**|Quantidade de parcelas do pagamento.|
|<h5>**Payment.accountTypeId**</h5>|<h5>**String**</h5>|**Não**|Presente apenas quando existe um tipo de conta no contexto da transação executada.|
|<h5>**Payment.planId**</h5>|<h5>**String**</h5>|**Não**|Presente apenas quando existe um plano no contexto da transação executada.|
|<h5>**Payment.productShortName**</h5>|<h5>**String**</h5>|**Sim**|Corresponde ao productShortName correspondente ao produto principal no contexto da transação.|
|<h5>**Payment.ticketNumber**</h5>|<h5>**String**</h5>|**Não**|ticketNumber gerado pelo terminal para a transação.|
|<h5>**Payment.batchNumber**</h5>|<h5>**String**</h5>|**Sim**|Número de lote.|
|<h5>**Payment.nsuTerminal**</h5>|<h5>**String**</h5>|**Sim**|NSU gerado pelo terminal para a transação.|
|<h5>**Payment.acquirer**</h5>|<h5>**String**</h5>|**Sim**|Adquirente que autorizou o pagamento.|
|<h5>**Payment.paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**Payment.brand**</h5>|<h5>**String**</h5>|**Sim**|Bandeira do cartão.|
|<h5>**Payment.bin**</h5>|<h5>**String**</h5>|**Sim**|BIN do cartão.|
|<h5>**Payment.panLast4Digits**</h5>|<h5>**String**</h5>|**Sim**|Últimos 4 dígitos do PAN do cartão.|
|<h5>**Payment.captureType**</h5>|<h5>**CaptureType**</h5>|**Sim**|Forma de captura do cartão.|
|<h5>**Payment.paymentStatus**</h5>|<h5>**PaymentStatus**</h5>|**Sim**|Situação do pagamento. No caso de solicitações retornadas com sucesso, esta informação sempre será *PENDING*, requerendo uma confirmação ou desfazimento para a sua conclusão definitiva.|
|<h5>**Payment.paymentDate**</h5>|<h5>**Date**</h5>|**Sim**|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**Payment.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma,é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**Payment.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da adquirente.|
|<h5>**Payment.acquirerResponseDate**</h5>|<h5>**String**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**Payment.acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem adicional enviada pela adquirente na resposta da transação|
|<h5>**Payment.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**Payment.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente.|
|<h5>**Payment.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**Payment.cardToken**</h5>|<h5>**String**</h5>|**Não**|Token do cartão utilizado na transação.|
|<h5>**Payment.cardholderName**</h5>|<h5>**String**</h5>|**Não**|Nome do portador do cartão.|
|<h5>**Payment.terminalId**</h5>|<h5>**String**</h5>|**Sim**|Identificação do terminal.|
|<h5>**Payment.note**</h5>|<h5>**String**</h5>|**Sim**|Valor adicional que é inserido como Nota. (pode ser o número da fatura) Este campo só virá na resposta caso tenha sido preenchido na requisição do pagamento pela api; Caso seja capturado pelo comprovante, não é possível retornar, pois como o comprovante é exibido depois da confirmação, nessa altura a resposta do pagamento já tem sido enviada para o app.|
|<h5>**Payment.dni**</h5>|<h5>**String**</h5>|**Sim**|Número do Documento. Este campo só virá na resposta caso tenha sido preenchido na requisição do pagamento pela api; Caso seja capturado pelo comprovante, não é possível retornar, pois como o comprovante é exibido depois da confirmação, nessa altura a resposta do pagamento já tem sido enviada para o app.|
|<h5>**Payment.qrId**</h5>|<h5>**String**</h5>|**Não**|Identificador QrCode gerado pelo terminal de captura.|
|<h5>**Payment.originalValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor orginal da venda. Presente em pagamentos com QRCode, cujo benefício foi aplicado ao valor da venda.|
|<h5>**Payment.acquirerNsu**</h5>|<h5>**String**</h5>|**Não**|NSU Adquirente para consulta e identificação de transações.|
|<h5>** </h5>|<h5>** </h5>|** | |
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
|<h5>**ErrorData.acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|<p>Mensagem adicional enviada pela adquirente na</p><p>resposta da transação.</p>|

-----
### <a name="_toc173245783"></a><a name="_confirmpayment()"></a>**confirmPayment()**
Este método deve ser chamado para confirmar uma transação que o terminal conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para uma transação já confirmada, ou seja, em que já se executou o método **confirmPayment()** anteriormente.

Este método **não** deve ser chamado para uma transação já desfeita, ou seja, em que já se executou o método **cancelPayment()** anteriormente.

Este método **não** deve ser chamado para uma transação que foi negada pelo Autorizador, ou seja, a transação precisa ter sido autorizada pelo Autorizador.

Após a execução desta confirmação, a transação só poderá ser cancelada através de uma operação de estorno (o estorno é a operação executada pelo menu CANCELAMENTO do terminal).

Caso o App consumidor desta API tenha finalizado o seu processo de negócio com êxito, porém não tenha chamado o método **confirmPayment()**, a transação permanecerá com o seguinte *status*: Situação PayStore = "Pendente". Resolução no Adquirente = "Pendente".

Como resultado, poderemos ter uma inconsistência transacional, visto que, na virada do dia, algumas redes adquirentes confirmam automaticamente as transações que não receberam a perna de confirmação. Outras redes adquirentes trabalham apenas com duas pernas, sem a necessidade de perna de confirmação. Neste caso, se houver algum problema na conclusão da transação no lado do terminal, é imperativo que a solução de captura execute o método **cancelPayment()**, a fim de desfazer a transação no adquirente e evitar cobrança para o cliente Portador do Cartão.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será confirmada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**
#### ***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245784"></a>**cancelPayment()**
Este método deve ser sempre chamado para desfazer uma transação que o terminal não conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para uma transação já confirmada, ou seja, em que já se executou o método **confirmPayment()** anteriormente.

Este método **não** deve ser chamado para desfazer uma transação já desfeita, ou seja, em que já se executou o método **cancelPayment()** anteriormente

Este método **não** deve ser chamado para uma transação que foi negada pelo Autorizador.

Este método **não** é um estorno. O estorno é a operação executada pelo menu CANCELAMENTO do terminal. O estorno é executado em transações que foram concluídas com êxito, ou seja, foram confirmadas.

Após a execução do desfazimento, **cancelPayment()**, a transação não poderá ser mais confirmada pela aplicação do terminal, ou seja, não se pode mais executar o método **confirmPayment()**.

Caso o App consumidor desta API não tenha finalizado o seu processo de negócio com êxito, é imprescindível a chamada do método **cancelPayment()**. A consequência de não cancelar uma transação que não teve seu processo de negócio concluído é semelhante à consequência de não confirmar. Porém, nesse caso, com um agravante, pois provavelmente o cliente não levará o produto/serviço associado à transação financeira, ou uma nova tentativa de venda poderá ser feita, resultando em uma cobrança em duplicidade para o cliente Portador do Cartão.





**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será desfeita. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>|** |Método para notificação em caso de sucesso.|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245785"></a>**Campo adicional api\_pending**
Além dos métodos para resolução de pagamentos (confirmPayment e cancelPayment), há a possibilidade de se configurar um **campo adicional** no Portal Paystore para realizar esta resolução automaticamente, em determinado tempo. Para isto, deve ser criado um campo adicional no Portal Paystore com o tipo JSON e a chave api\_pending.

**Valor do campo**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**confirmationTime**</h5>|<h5>**String**</h5>|**Sim**|Intervalo, em minutos, para resolução das pendências.|
|<h5>**transactionConfirmation**</h5>|<h5>**String**</h5>|**Sim**|Ação a ser tomada. Permite os valores CONFIRM (Confirma a transação) ou UNDO (Desfaz a transação).|

|<h5>**{</h5><br>`    `"confirmationTime": "10",</h5><br>`    `"transactionConfirmation": "CONFIRM"</h5><br>}**</h5>|
| :-: |
` `**EXEMPLO DO FLUXO DE PAGAMENTO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;</h5><br>import br.com.phoebus.android.payments.api.ErrorData;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentRequestV2;</h5><br>import br.com.phoebus.android.payments.api.PaymentV2;</h5><br>import br.com.phoebus.android.payments.api.exception.ClientException;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener, PaymentClient.PaymentCallback<PaymentV2> {</h5><br>`    `Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`        `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `PaymentRequestV2 request = new PaymentRequestV2();</h5><br>`        `BigDecimal value = BigDecimal.valueOf(5000).movePointLeft(2);</h5><br>`        `request.setValue(value);</h5><br>`        `request.setAppTransactionId("123456");</h5><br> </h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`       `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`       `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**request.setAppInfo(applicationInfo);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.startPaymentV2(request, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error starting payment", e);</h5><br>`        `}</h5><br>`    `}</h5><br> </h5><br>`    `@Override</h5><br>`    `public void onSuccess(PaymentV2 paymentV2) {</h5><br>`        `Log.i(TAG, paymentV2.toString());**</h5></p><p><h5>`        `**doConfirmPayment(paymentV2);</h5><br>`        `/\*</h5><br>`          `Se, na sua regra de negócio, for preciso desfazer a transação por algum motivo,</h5><br>`          `chame o método doCancelPayment(paymentV2)</h5><br>`        `\*\*/</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, errorData.getResponseMessage());</h5><br>`        `Toast.makeText(this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`    `}**</h5></p><p><h5>`    `**private void doConfirmPayment(PaymentV2 paymentV2) {</h5><br>`        `try {</h5><br>`            `paymentClient.confirmPayment(paymentV2.getPaymentId(),</h5><br>`                    `new PaymentClient.PaymentCallback<PaymentV2>() {**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onError(ErrorData errorData) {</h5><br>`                            `Log.e(TAG, errorData.getResponseMessage());</h5><br>`                            `Toast.makeText(MainActivity.this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                        `}**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onSuccess(PaymentV2 payment) {</h5><br>`                            `Log.i(TAG, payment.toString());</h5><br>`                        `}</h5><br>`                    `});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error confirmPayment", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private void doCancelPayment(PaymentV2 paymentV2) {</h5><br>`        `try {</h5><br>`            `paymentClient.cancelPayment(paymentV2.getPaymentId(),</h5><br>`                    `new PaymentClient.PaymentCallback<PaymentV2>() {**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onError(ErrorData errorData) {</h5><br>`                            `Log.e(TAG, errorData.getResponseMessage());</h5><br>`                            `Toast.makeText(MainActivity.this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                        `}**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onSuccess(PaymentV2 payment) {</h5><br>`                            `Log.i(TAG, payment.toString());</h5><br>`                        `}</h5><br>`                    `});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error cancelPayment", e);</h5><br>`        `}</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
### <a name="_toc173245786"></a>**getPayment()** 
Este método é usado para obter as informações de uma transação. Durante sua execução, os dados serão solicitados via API do ***connecta***, sendo obrigatório a conexão com a internet. 

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será localizada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>|** |Método para notificação em caso de sucesso.|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|||||
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não localizado.|
#### **Exemplo de chamada de**

|<p><h6>private fun doGetPayment(payment: Payment, callback: (Boolean) -> Unit) {</h6><br>try {</h6><br>paymentClient.getPayment(payment.paymentId, object : PaymentCallback<Any?> {</h6><br>override fun onSuccess(data: Any?) {</h6><br>val toast: Toast = Toast.makeText(</h6><br>this@MainActivity,</h6><br>"Dados retornardo com sucesso",</h6><br>Toast.LENGTH\_SHORT</h6><br>)</h6><br>toast.show()</h6><br>callback(true)</h6><br>}</h6></p><p>`        `**override fun onError(errorData: ErrorData) {**</p><p>`            `**val toast: Toast = Toast.makeText(**</p><p>`                `**this@MainActivity,**</p><p>`                `**R.string.payment\_not\_get,**</p><p>`                `**Toast.LENGTH\_SHORT**</p><p>`            `**)**</p><p>`            `**toast.show()**</p><p>`            `**callback(true)**</p><p>`        `**}**</p><p>`    `**})**</p><p>**} catch (e: Exception) {**</p><p>`    `**Toast.makeText(**</p><p>`        `**this@MainActivity,**</p><p>`        `**e.message,**</p><p>`        `**Toast.LENGTH\_LONG**</p><p>`    `**).show()**</p><p>`    `**callback(true)**</p><p>**}**</p><p>**}**</p>|
| :- |
#### **Exemplo do retorno de dados getPayment()**

|<p><h5>**{</h5><br>"MerchantOrderId": "20180204",</h5><br>"Customer": {</h5><br>"Name": "[Guest]"</h5><br>},</h5><br>"Payment": {</h5><br>"Installments": 1,</h5><br>"Interest": "ByMerchant",</h5><br>"CreditCard": {</h5><br>"ExpirationDate": "12/2020",</h5><br>"BrandId": 1,</h5><br>"IssuerId": 2,</h5><br>"TruncateCardNumberWhenPrinting": true,</h5><br>"InputMode": "Emv",</h5><br>"AuthenticationMethod": "OnlineAuthentication",</h5><br>"EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",</h5><br>"PinBlock": {</h5><br>"EncryptedPinBlock": "2280F6BDFD0C038D",</h5><br>"EncryptionType": "Dukpt3Des",</h5><br>"KsnIdentification": "1231vg31fv231313123"</h5><br>}</h5><br>},</h5><br>"PaymentDateTime": "2019-04-15T12:00:00Z",</h5><br>"ServiceTaxAmount": 0,</h5><br>"SoftDescriptor": "Description",</h5><br>"ProductId": 1,</h5><br>"PinPadInformation": {</h5><br>"TerminalId": "10000001",</h5><br>"SerialNumber": "ABC123",</h5><br>"PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",</h5><br>"ReturnDataInfo": "00"</h5><br>},</h5><br>"Amount": 15798,</h5><br>"ReceivedDate": "2019-04-15T12:00:00Z",</h5><br>"CapturedAmount": 15798,</h5><br>"Provider": "Cielo",</h5><br>"ConfirmationStatus": 0,</h5><br>"InitializationVersion": 1558708320029,</h5><br>"EmvResponseData": "123456789ABCD1345DEA",</h5><br>"Status": 2,</h5><br>"IsSplitted": false,</h5><br>"ReturnCode": 0,</h5><br>"ReturnMessage": "Successful",</h5><br>"PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",</h5><br>"Type": "PhysicalDebitCard",</h5><br>"Currency": "BRL",</h5><br>"Country": "BRA",** </h5></p><p>**"Links": [** </p><p>** </p><p>`  `**{** </p><p>`    `**"Method": "GET",** </p><p>`    `**"Rel": "self",** </p><p>`    `**"Href": "<https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702>"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Method": "DELETE",** </p><p>`    `**"Rel": "self",** </p><p>`    `**"Href": "<https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702>"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Method": "PUT",** </p><p>`    `**"Rel": "self",** </p><p>`    `**"Href": "<https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation>"** </p><p>`  `**}** </p><p>**],** </p><p>** </p><p>**"PrintMessage": [** </p><p>`  `**{** </p><p>`    `**"Position": "Top",** </p><p>`    `**"Message": "Transação autorizada"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Position": "Bottom",** </p><p>`    `**"Message": "Obrigado e volte sempre!"** </p><p>`  `**}** </p><p>**],** </p><p>** </p><p>**"ReceiptInformation": [** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_NAME",** </p><p>`    `**"Label": "NOME DO ESTABELECIMENTO",** </p><p>`    `**"Content": "Estabelecimento"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_ADDRESS",** </p><p>`    `**"Label": "ENDEREÇO DO ESTABELECIMENTO",** </p><p>`    `**"Content": "Rua Sem Saida, 0"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_CITY",** </p><p>`    `**"Label": "CIDADE DO ESTABELECIMENTO",** </p><p>`    `**"Content": "Cidade"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_STATE",** </p><p>`    `**"Label": "ESTADO DO ESTABELECIMENTO",** </p><p>`    `**"Content": "WA"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_CODE",** </p><p>`    `**"Label": "COD.ESTAB.",** </p><p>`    `**"Content": 1234567890123456** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "TERMINAL",** </p><p>`    `**"Label": "POS",** </p><p>`    `**"Content": 12345678** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "NSU",** </p><p>`    `**"Label": "DOC",** </p><p>`    `**"Content": 123456** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "DATE",** </p><p>`    `**"Label": "DATA",** </p><p>`    `**"Content": "01/01/20"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "HOUR",** </p><p>`    `**"Label": "HORA",** </p><p>`    `**"Content": "01:01"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "ISSUER\_NAME",** </p><p>`    `**"Label": "EMISSOR",** </p><p>`    `**"Content": "NOME DO EMISSOR"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "CARD\_NUMBER",** </p><p>`    `**"Label": "CARTÃO",** </p><p>`    `**"Content": 5432123454321234** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "TRANSACTION\_TYPE",** </p><p>`    `**"Label": "TIPO DE TRANSAÇÃO",** </p><p>`    `**"Content": "VENDA A CREDITO"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "AUTHORIZATION\_CODE",** </p><p>`    `**"Label": "AUTORIZAÇÃO",** </p><p>`    `**"Content": 123456** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "TRANSACTION\_MODE",** </p><p>`    `**"Label": "MODO DA TRANSAÇÃO",** </p><p>`    `**"Content": "ONL"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "INPUT\_METHOD",** </p><p>`    `**"Label": "MODO DE ENTRADA",** </p><p>`    `**"Content": "X"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "VALUE",** </p><p>`    `**"Label": "VALOR",** </p><p>`    `**"Content": "1,23"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "SOFT\_DESCRIPTOR",** </p><p>`    `**"Label": "SOFT DESCRIPTOR",** </p><p>`    `**"Content": "Simulado"** </p><p>`  `**}** </p><p>**],** </p><p>** </p><p>**"Receipt": {** </p><p>`  `**"MerchantName": "Estabelecimento",** </p><p>`  `**"MerchantAddress": "Rua Sem Saida, 0",** </p><p>`  `**"MerchantCity": "Cidade",** </p><p>`  `**"MerchantState": "WA",** </p><p>`  `**"MerchantCode": 1234567890123456,** </p><p>`  `**"Terminal": 12345678,** </p><p>`  `**"Nsu": 123456,** </p><p>`  `**"Date": "01/01/20",** </p><p>`  `**"Hour": "01:01",** </p><p>`  `**"IssuerName": "NOME DO EMISSOR",** </p><p>`  `**"CardNumber": 5432123454321234,** </p><p>`  `**"TransactionType": "VENDA A CREDITO",** </p><p>`  `**"AuthorizationCode": 123456,** </p><p>`  `**"TransactionMode": "ONL",** </p><p>`  `**"InputMethod": "X",** </p><p>`  `**"Value": "1,23",** </p><p>`  `**"SoftDescriptor": "Simulado"** </p><p>**}** </p><p>**}<br>}**</p>|
| :- |

-----

### <a name="_toc173245787"></a>**getPaymentByMerchantOrderId()**
Este método é usado para obter as informações de uma transação. Durante sua execução, os dados serão solicitados via API do Connecta, sendo obrigatório a conexão com a internet.  

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**merchantOrderId**</h5>|<h5>**String**</h5>|**Sim**|ID Externo do pagamento gerado pelo usuário no formato string de 15 posições.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|
**




**Detalhe dos parâmetros**



***Call-back***
\*


|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>|** |Método para notificação em caso de sucesso.|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não localizado.|


#### **Exemplo de chamada de getPaymentByMerchantOrderId()**

|<p>**paymentClient.getPaymentByMerchantOrderId("123456", new PaymentCallback<Any?>() {**</p><p>`    `**@Override**</p><p>`    `**public void onSuccess(Any? data) {**</p><p>`        `**Toast toast = Toast.makeText(this@MainActivity, "Dados retornados com sucesso", Toast.LENGTH\_SHORT);**</p><p>`        `**toast.show();**</p><p>`        `**callback(true);**</p><p>`    `**}**</p><p>** </p><p>`    `**@Override**</p><p>`    `**public void onError(ErrorData errorData) {**</p><p>`        `**Toast toast = Toast.makeText(this@MainActivity, R.string.payment\_not\_get, Toast.LENGTH\_SHORT);**</p><p>`        `**toast.show();**</p><p>`        `**callback(false);**</p><p>`    `**}**</p><p>**});**</p><p><h4>** </h4></p>|
| :- |
#### ** 
#### **Exemplo do retorno de dados getPaymentMerchantOrderId()**

|<p><h5>**{</h5><br>"MerchantOrderId": "20180204",</h5><br>"Customer": {</h5><br>"Name": "[Guest]"</h5><br>},</h5><br>"Payment": {</h5><br>"Installments": 1,</h5><br>"Interest": "ByMerchant",</h5><br>"CreditCard": {</h5><br>"ExpirationDate": "12/2020",</h5><br>"BrandId": 1,</h5><br>"IssuerId": 2,</h5><br>"TruncateCardNumberWhenPrinting": true,</h5><br>"InputMode": "Emv",</h5><br>"AuthenticationMethod": "OnlineAuthentication",</h5><br>"EmvData": "112233445566778899011AABBC012D3456789E0123FF45678AB901234C5D112233445566778800",</h5><br>"PinBlock": {</h5><br>"EncryptedPinBlock": "2280F6BDFD0C038D",</h5><br>"EncryptionType": "Dukpt3Des",</h5><br>"KsnIdentification": "1231vg31fv231313123"</h5><br>}</h5><br>},</h5><br>"PaymentDateTime": "2019-04-15T12:00:00Z",</h5><br>"ServiceTaxAmount": 0,</h5><br>"SoftDescriptor": "Description",</h5><br>"ProductId": 1,</h5><br>"PinPadInformation": {</h5><br>"TerminalId": "10000001",</h5><br>"SerialNumber": "ABC123",</h5><br>"PhysicalCharacteristics": "PinPadWithChipReaderWithSamModule",</h5><br>"ReturnDataInfo": "00"</h5><br>},</h5><br>"Amount": 15798,</h5><br>"ReceivedDate": "2019-04-15T12:00:00Z",</h5><br>"CapturedAmount": 15798,</h5><br>"Provider": "Cielo",</h5><br>"ConfirmationStatus": 0,</h5><br>"InitializationVersion": 1558708320029,</h5><br>"EmvResponseData": "123456789ABCD1345DEA",</h5><br>"Status": 2,</h5><br>"IsSplitted": false,</h5><br>"ReturnCode": 0,</h5><br>"ReturnMessage": "Successful",</h5><br>"PaymentId": "f15889ea-5719-4e1a-a2da-f4e50d5bd702",</h5><br>"Type": "PhysicalDebitCard",</h5><br>"Currency": "BRL",</h5><br>"Country": "BRA",** </h5></p><p>**"Links": [** </p><p>** </p><p>`  `**{** </p><p>`    `**"Method": "GET",** </p><p>`    `**"Rel": "self",** </p><p>`    `**"Href": "<https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702>"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Method": "DELETE",** </p><p>`    `**"Rel": "self",** </p><p>`    `**"Href": "<https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702>"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Method": "PUT",** </p><p>`    `**"Rel": "self",** </p><p>`    `**"Href": "<https://api.cieloecommerce.cielo.com.br/1/physicalSales/f15889ea-5719-4e1a-a2da-f4e50d5bd702/confirmation>"** </p><p>`  `**}** </p><p>**],** </p><p>** </p><p>**"PrintMessage": [** </p><p>`  `**{** </p><p>`    `**"Position": "Top",** </p><p>`    `**"Message": "Transação autorizada"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Position": "Bottom",** </p><p>`    `**"Message": "Obrigado e volte sempre!"** </p><p>`  `**}** </p><p>**],** </p><p>** </p><p>**"ReceiptInformation": [** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_NAME",** </p><p>`    `**"Label": "NOME DO ESTABELECIMENTO",** </p><p>`    `**"Content": "Estabelecimento"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_ADDRESS",** </p><p>`    `**"Label": "ENDEREÇO DO ESTABELECIMENTO",** </p><p>`    `**"Content": "Rua Sem Saida, 0"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_CITY",** </p><p>`    `**"Label": "CIDADE DO ESTABELECIMENTO",** </p><p>`    `**"Content": "Cidade"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_STATE",** </p><p>`    `**"Label": "ESTADO DO ESTABELECIMENTO",** </p><p>`    `**"Content": "WA"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "MERCHANT\_CODE",** </p><p>`    `**"Label": "COD.ESTAB.",** </p><p>`    `**"Content": 1234567890123456** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "TERMINAL",** </p><p>`    `**"Label": "POS",** </p><p>`    `**"Content": 12345678** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "NSU",** </p><p>`    `**"Label": "DOC",** </p><p>`    `**"Content": 123456** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "DATE",** </p><p>`    `**"Label": "DATA",** </p><p>`    `**"Content": "01/01/20"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "HOUR",** </p><p>`    `**"Label": "HORA",** </p><p>`    `**"Content": "01:01"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "ISSUER\_NAME",** </p><p>`    `**"Label": "EMISSOR",** </p><p>`    `**"Content": "NOME DO EMISSOR"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "CARD\_NUMBER",** </p><p>`    `**"Label": "CARTÃO",** </p><p>`    `**"Content": 5432123454321234** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "TRANSACTION\_TYPE",** </p><p>`    `**"Label": "TIPO DE TRANSAÇÃO",** </p><p>`    `**"Content": "VENDA A CREDITO"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "AUTHORIZATION\_CODE",** </p><p>`    `**"Label": "AUTORIZAÇÃO",** </p><p>`    `**"Content": 123456** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "TRANSACTION\_MODE",** </p><p>`    `**"Label": "MODO DA TRANSAÇÃO",** </p><p>`    `**"Content": "ONL"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "INPUT\_METHOD",** </p><p>`    `**"Label": "MODO DE ENTRADA",** </p><p>`    `**"Content": "X"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "VALUE",** </p><p>`    `**"Label": "VALOR",** </p><p>`    `**"Content": "1,23"** </p><p>`  `**},** </p><p>** </p><p>`  `**{** </p><p>`    `**"Field": "SOFT\_DESCRIPTOR",** </p><p>`    `**"Label": "SOFT DESCRIPTOR",** </p><p>`    `**"Content": "Simulado"** </p><p>`  `**}** </p><p>**],** </p><p>** </p><p>**"Receipt": {** </p><p>`  `**"MerchantName": "Estabelecimento",** </p><p>`  `**"MerchantAddress": "Rua Sem Saida, 0",** </p><p>`  `**"MerchantCity": "Cidade",** </p><p>`  `**"MerchantState": "WA",** </p><p>`  `**"MerchantCode": 1234567890123456,** </p><p>`  `**"Terminal": 12345678,** </p><p>`  `**"Nsu": 123456,** </p><p>`  `**"Date": "01/01/20",** </p><p>`  `**"Hour": "01:01",** </p><p>`  `**"IssuerName": "NOME DO EMISSOR",** </p><p>`  `**"CardNumber": 5432123454321234,** </p><p>`  `**"TransactionType": "VENDA A CREDITO",** </p><p>`  `**"AuthorizationCode": 123456,** </p><p>`  `**"TransactionMode": "ONL",** </p><p>`  `**"InputMethod": "X",** </p><p>`  `**"Value": "1,23",** </p><p>`  `**"SoftDescriptor": "Simulado"** </p><p>**}** </p><p>**}<br>}**</p>|
| :- |




# <a name="_toc173245788"></a>**Estorno**
# <a name="_toc173245789"></a>**[DEPRECATED] Integração com Estorno V1**
Uma das formas de se integrar com a aplicação de pagamentos da Cielo é via [IPC](https://developer.android.com/guide/components/aidl.html). Para isto, é fornecida uma biblioteca, a [payments-api-x.x.x.x.aar](https://github.com/paystore/paystore-api-demo/tree/master/app/aars), contendo todo o código necessário a ser usado para tais chamadas.

Usando esta API, é possível realizar todo o fluxo de pagamento, ou seja, a confirmação (ou o desfazimento) e o estorno. O pagamento pode ser realizado com um valor pré-definido ou com um valor em aberto, a ser digitado pelo operador do terminal. Além disso, pode-se informar uma lista de tipos de pagamentos (débito, crédito à vista, crédito parcelado, etc.) permitidos.

Ainda que esta integração se dê através de uma API, a aplicação de pagamentos pode exibir informações na interface do terminal, tais como mensagens (e.g., "Insira ou passe o cartão"), ou mesmo solicitar informações do operador (e.g., CVV). Assim sendo, durante a realização de qualquer operação, a aplicação que solicitou a operação não deve interagir com a interface do dispositivo até que a operação seja concluída.

A seguir, temos a especificação detalhada das operações disponíveis.

Para integração com a API de pagamentos, é fornecida a interface PaymentClient.

|**Warning**|
| :-: |
|<h5>**O método PaymentClient.Bind(\_callback) deve ser chamado obrigatoriamente, antes de chamar qualquer método da Integração de Pagamento. O bind é assíncrono, ou seja, a próxima linha após o bind() será executada antes de receber a sua resposta, por isso garanta que antes de chamar os métodos de integração, o bind esteja conectado.**</h5>|
-----
## <a name="_toc173245790"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void reversePayment(ReversePaymentRequest paymentRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de estorno de pagamento. (DEPRECATED: Utilizar reversePaymentV2)|
|<h5>**void cancelReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Desfaz uma solicitação de estorno de pagamento.|
### <a name="_toc173245791"></a>**reversePayment() (DEPRECATED: Utilizar reversePaymentV2)**
Este método deve ser chamado quando se deseja fazer uma solicitação de estorno de pagamento. Durante sua execução, os dados do estorno serão validados, informações adicionais serão solicitadas ao operador (e.g. cartão) e a autorização junto à adquirente será feita.

**Note que a transação de estorno não possui confirmação, mas apenas desfazimento.** Assim, a confirmação ocorrerá naturalmente com o não envio do desfazimento, a depender do comportamento de cada adquirente.

Também a depender do comportamento de cada adquirente, é possível que não haja desfazimento para a transação de estorno. Neste caso, estornos aprovados retornarão o valor *false* no campo "ReversePayment.cancelable". Além disto, caso seja chamado o método cancelReversePayment(), um erro específico será retornado informando que não é possível executar tal operação (vide [Códigos de Resposta](#_códigos_de_resposta)).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**ReversePaymentRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do estorno do pagamento. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**ReversePaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de estorno.|

**Detalhe dos parâmetros**

*request (**ReversePaymentRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor da transação a ser estornada. Caso não seja preenchido (null), a interface solicitará o valor ao operador. Esta informação é utilizada para validar a integridade da transação que está sendo estornada.|
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será estornada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação integrada. O Identificador referido é o da aplicação que originou a solicitação de estorno. Deve ser o mesmo valor enviado na transação de pagamento.|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**showReceiptView (DEPRECATED)**</h5>|<h5>**Boolean**</h5>|**Não**|A Solução sempre irá imprimir o comprovante.|

*callback (**ReversePaymentCallback**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**ReversePayment.paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação de estorno para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**ReversePayment.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação de estorno para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do estorno com a transação integrada.|
|<h5>**ReversePayment.cancelable**</h5>|<h5>**Boolean**</h5>|**Sim**|*True*, caso esta transação possa ser desfeita; *False*, caso contrário.|
|<h5>**ReversePayment.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da adquirente.|
|<h5>**ReversePayment.acquirerResponseDate**</h5>|<h5>**String**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**ReversePayment.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**ReversePayment.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente.|
|<h5>**ReversePayment.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245792"></a>**cancelReversePayment()**
Este método deve ser chamado para desfazer uma transação de estorno anteriormente autorizada. Esta transação deve não ter sido desfeita ainda e deve ter sido autorizada (não negada) previamente.

Como dito na descrição de[reversePayment()](#_realiza_o_processo), é possível que não haja desfazimento para a transação de estorno para uma determinada adquirente. Assim, o método cancelReversePayment() pode retornar um erro específico informando que não é possível executar tal operação (vide [Códigos de Resposta](#_códigos_de_resposta)).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será desfeita. O Identificador referido é aquele utilizado pela aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245793"></a>**Exemplo do fluxo de Estorno**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Credentials;</h5><br>import br.com.phoebus.android.payments.api.ErrorData;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.ReversePayment;</h5><br>import br.com.phoebus.android.payments.api.ReversePaymentRequest;</h5><br>import br.com.phoebus.android.payments.api.exception.ClientException;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener, PaymentClient.PaymentCallback<ReversePayment> {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`        `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}</h5><br> </h5><br>`    `public void doExecute(){</h5><br>`        `ReversePaymentRequest request = new ReversePaymentRequest();</h5><br>`        `request.setValue(new BigDecimal(50));</h5><br>`        `request.setAppTransactionId("123456");</h5><br>`        `request.setPaymentId("999999");</h5><br>`        `request.setShowReceiptView(true);</h5><br> </h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**request.setCredentials(credentials);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.reversePayment(request, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error reversePayment", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(ReversePayment  reversePayment) {</h5><br>`        `Log.i(TAG, reversePayment.toString());</h5><br>`        `/\*</h5><br>`         `Se, na sua regra de negócio, for preciso desfazer a transação por algum motivo,</h5><br>`          `chame o método cancelReversePayment()</h5><br>`        `\*\*/</h5><br>`        `//doCancelReversePayment(reversePayment);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, errorData.getResponseMessage());</h5><br>`        `Toast.makeText(this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`    `}**</h5></p><p><h5>`    `**private void doCancelReversePayment(ReversePayment reversePayment) {</h5><br>`        `try {</h5><br>`            `paymentClient.cancelReversePayment(reversePayment.getPaymentId(),</h5><br>`                    `new PaymentClient.PaymentCallback<ReversePayment>() {**</h5></p><p><h5>`                        `**@Override</h5><br>`                        `public void onError(ErrorData errorData) {</h5><br>`                            `Log.e(TAG, errorData.getResponseMessage());</h5><br>`                            `Toast.makeText(MainActivity.this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                        `}**</h5></p><p><h5>`                       `**@Override</h5><br>`                        `public void onSuccess(ReversePayment reversePayment) {</h5><br>`                            `Log.i(TAG, reversePayment.toString());</h5><br>`                        `}</h5><br>`                    `});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error cancelReversePayment", e);</h5><br>`        `}</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245794"></a>**Integração com Estorno V2**
Apontamento 5 - links payments-api-xxx aponta para repositório do fornecedor.

Uma das formas de se integrar com a aplicação de pagamentos da Cielo é via [IPC](https://developer.android.com/guide/components/aidl.html). Para isto, é fornecida uma biblioteca, a [payments-api-x.x.x.x.aar](https://github.com/paystore/paystore-api-demo/tree/master/app/aars), contendo todo o código necessário a ser usado para tais chamadas.

Usando esta API, é possível realizar todo o fluxo de pagamento, ou seja, a confirmação (ou o desfazimento) e o estorno. O pagamento pode ser realizado com um valor pré-definido ou com um valor em aberto, a ser digitado pelo operador do terminal. Além disso, pode-se informar uma lista de tipos de pagamentos (débito, crédito à vista, crédito parcelado, etc.) permitidos.

Ainda que esta integração se dê através de uma API, a aplicação de pagamentos pode exibir informações na interface do terminal, tais como mensagens (e.g., "Insira ou passe o cartão"), ou mesmo solicitar informações do operador (e.g., CVV). Assim sendo, durante a realização de qualquer operação, a aplicação que solicitou a operação não deve interagir com a interface do dispositivo até que a operação seja concluída.

A seguir, temos a especificação detalhada das operações disponíveis.

Para integração com a API de pagamentos, é fornecida a interface PaymentClient.
## <a name="_toc173245795"></a>**Fluxo de Estorno**
![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.043.jpeg)

|**Passos**|**Sucesso**|**Erro**|
| :- | :- | :- |
|1\.Solicitação de estorno do pagamento|O estorno do pagamento foi realizado e seu status é Estornado|O estorno do pagamento não foi realizado. A resposta contém informações do erro.|
|2\.Resposta solicitação de estorno do pagamento|A resposta contém informações do estorno do pagamento realizado.|A resposta contém informações do erro da solicitação.|
|3\.Solicitação de desfazimento do estorno|Desfazimento realizado, seu status é Desfeita.|A resposta contém informações do erro da solicitação.|
|4\.Resposta do desfazimento do estorno|A resposta contém informações do desfazimento realizado.|A resposta contém informações do erro da solicitação.|

O estorno só é finalizado quando existe uma confirmação ou um desfazimento. Em caso de confirmação, o comprovante será impresso.

|**Warning**|
| :-: |
|O método PaymentClient.Bind(\_callback) deve ser chamado, obrigatoriamente, antes de chamar qualquer método da Integração de Pagamento. O **bind é assíncrono**, ou seja, a próxima linha após o bind() será executada antes de receber a sua resposta, por isso garanta que, antes de chamar os métodos de integração, o bind esteja **conectado**.|
## <a name="_toc173245796"></a>**A partir da versão 3.1.5.0**
Quando uma transação é feita, anteriormente, poderia ser confirmado realizando sua impressão (ou via printReceipt), ou ao realizar uma nova transação. Agora, o estorno também pode ser confirmado ao usar o novo parâmetro autoconfiram - indicando se deve ou não confirmar independente da impressão - ou utilizando o novo método confirmReversePayment().

-----
## <a name="_toc173245797"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void reversePaymentV2(ReversePaymentRequestV2 paymentRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de estorno de pagamento.|
|<h5>**void confirmReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Confirma uma autorização de estorno de pagamento realizada anteriormente.|
|<h5>**void cancelReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Desfaz uma solicitação de estorno de pagamento.|
### <a name="_toc173245798"></a>**reversePaymentV2()**
Este método deve ser chamado quando se deseja fazer uma solicitação de estorno de pagamento. Durante sua execução, os dados do estorno serão validados, informações adicionais serão solicitadas ao operador (e.g. cartão) e a autorização junto à adquirente será feita.

**Note que a transação de estorno não possui confirmação, mas apenas desfazimento**. Assim, a confirmação ocorrerá naturalmente com o não envio do desfazimento, a depender do comportamento de cada adquirente. Caso haja impressão do comprovante do estorno, quando for passado algum dos parâmetros printMerchantReceipt ou printCustomerReceipt com valor *true*, o estorno será confirmado automaticamente. Neste caso, o desfazimento não será permitido.

Também a depender do comportamento de cada adquirente, é possível que não haja desfazimento para a transação de estorno. Neste caso, estornos aprovados retornarão o valor *false* no campo "ReversePayment.cancelable". Além disto, caso seja chamado o método cancelReversePayment(), um erro específico será retornado informando que não é possível executar tal operação (vide [Códigos de Resposta](#_códigos_de_resposta)).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**ReversePaymentRequestV2**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do estorno do pagamento. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**ReversePaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de estorno.|

**Detalhe dos parâmetros**

*request (**ReversePaymentRequestV2**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|<p>Valor da transação a ser estornada. Caso não seja preenchido (null), a interface solicitará o valor ao operador. Esta informação é utilizada para validar a integridade da transação que está sendo estornada.</p><p>O valor deverá ser formatado com duas casas decimais.</p>|
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será estornada. O identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação integrada. O identificador referidoé o da aplicação que originou a solicitação de estorno. Deve ser o mesmo valor enviado na transação de pagamento.|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**showReceiptView (DEPRECATED)**</h5>|<h5>**Boolean**</h5>|**Não**|A Solução irá utilizar o valor dos parâmetros printMerchantReceipt e printCustomerReceipt para executar a impressão.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não. O valor padrão é false, isto é, o comprovante não é impresso.|
|<h5>**printCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do cliente deve ser impresso ou não. O valor padrão é false, isto é, o comprovante não é impresso.|
|<h5>**previewMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do estabelecimento deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**previewCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do cliente deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**autoConfirm (v3.1.5.0)**</h5>|<h5>**Boolean**</h5>|**Não**|<p>Indica se a transação deve ser confirmada automaticamente.</p><p>Valores possíveis:</p><p>1\.      null (padrão) : confirma automaticamente caso ocorra a impressão do comprovante.</p><p>2\.      true : confirma automaticamente independente da regra de impressão.</p><p>3\.      false : não confirma automaticamente, ficando pendente aguardando confirmação.</p>|

*callback (**ReversePaymentCallback**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>|** |Método para notificação em caso de sucesso|
|<h5>**ReversePayment.paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação de estorno. O Identificador referido é aquele utilizado na aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**ReversePayment.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação de estorno para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar, a conciliação do estorno com a transação integrada.|
|<h5>**ReversePayment.cancelable**</h5>|<h5>**Boolean**</h5>|**Sim**|True, caso esta transação possa ser desfeita; False, caso contrário.|
|<h5>**ReversePayment.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da adquirente.|
|<h5>**ReversePayment.acquirerResponseDate**</h5>|<h5>**String**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**ReversePayment.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**ReversePayment.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente.|
|<h5>**ReversePayment.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**ReversePayment.acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**ReversePayment.ticketNumber**</h5>|<h5>**String**</h5>|**Não**|Número do cupom gerado pelo terminal para a transação.|
|<h5>**ReversePayment.batchNumber**</h5>|<h5>**String**</h5>|**Sim**|Número do Lote.|
|<h5>**ReversePayment.nsuTerminal**</h5>|<h5>**String**</h5>|**Sim**|NSU gerado pelo terminal para a transação.|
|<h5>**ReversePayment.cardholderName**</h5>|<h5>**String**</h5>|**Não**|Nome do portador do cartão.|
|<h5>**ReversePayment.cardBin**</h5>|<h5>**String**</h5>|**Sim**|Seis primeiros dígitos do cartão.|
|<h5>**ReversePayment.panLast4Digits**</h5>|<h5>**String**</h5>|**Sim**|Quatro últimos dígitos do cartão.|
|<h5>**ReversePayment.terminalId**</h5>|<h5>**String**</h5>|**Sim**|Identificação do terminal.|
|<h5>** </h5>|<h5>** </h5>|** | |
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245799"></a>**confirmReversePayment()**
Este método deve ser chamado para confirmar um estorno que o terminal conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para um estorno já confirmado, ou seja, em que já se executou o método **confirmReversePayment()** anteriormente.

Este método **não** deve ser chamado para um estorno já desfeito, ou seja, em que já se executou o método **cancelReversePayment()** anteriormente.

Este método **não** deve ser chamado para um estorno que foi negada pelo Autorizador, ou seja, a transação precisa ter sido autorizada pelo Autorizador.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será confirmada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245800"></a>**cancelReversePayment()**
Este método deve ser chamado para desfazer uma transação de estorno anteriormente autorizada. Esta transação deve não ter sido desfeita ainda e deve ter sido autorizada (não negada) previamente.

Como dito na descrição de[reversePayment()](#_realiza_o_processo), é possível que não haja desfazimento para a transação de estorno para uma determinada adquirente. Assim, o método cancelReversePayment() pode retornar um erro específico informando que não é possível executar tal operação (vide [Códigos de Resposta](#_códigos_de_resposta)).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será desfeita. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|<h4>**Nome**</h4>|<h4>**Tipo**</h4>|<h4>**Obrigatório**</h4>|<h4>**Descrição**</h4>|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245801"></a>**Exemplo do fluxo de Estorno**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Credentials;</h5><br>import br.com.phoebus.android.payments.api.ErrorData;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.ReversePayment;</h5><br>import br.com.phoebus.android.payments.api.ReversePaymentRequestV2;</h5><br>import br.com.phoebus.android.payments.api.exception.ClientException;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener, PaymentClient.PaymentCallback<ReversePayment> {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`    `}</h5><br> </h5><br>`    `@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`        `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ReversePaymentRequestV2 request = new ReversePaymentRequestV2();</h5><br>`        `BigDecimal value = BigDecimal.valueOf(5000).movePointLeft(2);</h5><br>`        `request.setValue(value);</h5><br>`        `request.setAppTransactionId("123456");**</h5></p><p><h5>`        `**request.setPaymentId("999999");</h5><br>`        `request.setPrintCustomerReceipt(true);</h5><br>`        `request.setPrintMerchantReceipt(true);**</h5></p><p><h5>`        `**Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);</h5><br> </h5><br>`        `request.setCredentials(credentials);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.reversePaymentV2(request, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error reversePaymentV2", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`   `public void onSuccess(ReversePayment  reversePayment) {</h5><br>`        `Log.i(TAG, reversePayment.toString());</h5><br>`        `/\*</h5><br>`          `Se, na sua regra de negócio, for preciso desfazer a</h5><br>`          `transação por algum motivo, chame o método</h5><br>`          `cancelReversePayment()</h5><br>`        `\*\*/</h5><br>`        `//doCancelReversePayment(reversePayment);</h5><br>`    `}</h5><br> </h5><br>`    `@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, errorData.getResponseMessage());</h5><br>`        `Toast.makeText(this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`    `}**</h5></p><p><h5>`    `**private void doCancelReversePayment(ReversePayment reversePayment) {</h5><br>`        `try {</h5><br>`            `paymentClient.cancelReversePayment(reversePayment.getPaymentId(),</h5><br>`                    `new PaymentClient.PaymentCallback<ReversePayment>() {</h5><br> </h5><br>`                        `@Override</h5><br>`                        `public void onError(ErrorData errorData) {</h5><br>`                            `Log.e(TAG, errorData.getResponseMessage());</h5><br>`                            `Toast.makeText(MainActivity.this, errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                        `}**</h5></p><p><h5>`                       `**@Override</h5><br>`                        `public void onSuccess(ReversePayment reversePayment) {</h5><br>`                            `Log.i(TAG, reversePayment.toString());</h5><br>`                        `}</h5><br>`                    `});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error cancelReversePayment", e);</h5><br>`        `}</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |


-----
# <a name="_toc173245802"></a>**Enums**
# <a name="_toc173245803"></a>**Status de Pagamento**

|**Código**|**Nome**|**Descrição**|
| :-: | :- | :- |
|**1**|**PENDING**|Pagamento pendente|
|**2**|**CONFIRMED**|Pagamento confirmado|
|**3**|**CANCELLED**|Desfeita/Cancelada|
|**4**|**REVERSED**|Pagamento estornado|
|**5**|**PROCESSING**|Pagamento em processamento|
|**6**|**DENIED**|Pagamento negado|
|**7**|**UNREACHABLE**|Transação substituída (pré-autorização)|
|**8**|**WAITING\_VALIDATION**|Aguardando validação|
|**9**|**WAITING\_CAPTURE**|Aguardando captura|
|**10**|**REFUNDED\_DEVOLUTION**|Devolução não referenciada|
|**11**|**REFUNDED**|Devolvida|
|**12**|**APPROVED**|Pagamento aprovado|

-----
# <a name="_toc173245804"></a>**Status de Estorno**

|**Código**|**Nome**|**Descrição**|
| :- | :- | :- |
|**1**|**PROCESSING**|Estorno em processamento|
|**2**|**PENDING**|Estorno pendente, pode não ter havido resposta, ou ter a resposta aprovada, mas sem impressão de comprovante, inibida da chamada de reversePaymentV2|
|**3**|**CONFIRMED**|Estorno aprovado|
|**4**|**CANCELLED**|Estorno negado|

-----
# <a name="_toc173245805"></a>**Tipos de Pagamento**

|**Código**|**Nome**|**Descrição**|
| :- | :- | :- |
|**1**|**CREDIT**|Crédito à vista|
|**2**|**DEBIT**|Débito|
|**3**|**CREDIT\_STORE**|Crédito parcelado sem juros|
|**4**|**CREDIT\_ADMIN**|Crédito parcelado com juros|
|**5**|**PRE\_AUTHORIZATION**|Pré-autorização|
|**6**|**PRE\_AUTHORIZATION\_CONFIRMATION**|Confirmação de pré-autorização|
|**7**|**PRE\_AUTHORIZATION\_CREDIT\_STORE**|Pré autorização sem Juros|
|**8**|**PRE\_AUTHORIZATION\_CREDIT\_ADMIN**|Pré autorização com Juros|
|**9**|**PRE\_AUTHORIZATION\_SUBSTITUTIVE**|Pré autorização substitutiva|
|**10**|**DEBIT\_POSTDATED**|Débito pré datado|
|**11**|**VOUCHER**|Vale|
|**12**|**VOUCHER\_MEAL**|Vale refeição|
|**13**|**VOUCHER\_FEED**|Vale alimentação|
|**14**|**VOUCHER\_FLEET**|Vale Frota|
|**15**|**PRIVATE\_LABEL**|Bandeira privada|
|**16**|**PRIVATE\_LABEL\_QUERY**|Bandeira privada|
|**17**|**PARCELED\_CREDIT**|Crédito parcelado |

-----
# <a name="_toc173245806"></a>**Tipos de Captura**

|**Código**|**Nome**|**Descrição**|
| :- | :- | :- |
|**1**|**MANUAL**|Manual|
|**2**|**MAGNETIC\_STRIP**|Tarja|
|**3**|**CHIP**|Chip|
|**4**|**FALLBACK\_MANUAL**|Fallback digitado|
|**5**|**FALLBACK\_MAGNETIC\_STRIP**|Fallback de tarja|
|**6**|**CHIP\_CONTACTLESS**|Chip sem contato|
|**7**|**MAGNETIC\_STRIP\_CONTACTLESS**|Tira magnética sem contato|
|**8**|**QR\_CODE**|QR Code|



-----
# <a name="_toc173245807"></a>**Consultas**
# <a name="_toc173245808"></a><a name="_estruturas_de_dados"></a>**Estruturas de dados retornada**
## <a name="_toc173245809"></a>**Payments**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**id**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor do pagamento. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**paymentType**</h5>|<h5>**PaymentType**</h5>|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**installments**</h5>|<h5>**Integer**</h5>|Quantidade de parcelas do pagamento.|
|<h5>**acquirerName**</h5>|<h5>**String**</h5>|Adquirente que autorizou o pagamento.|
|<h5>**cardBrand**</h5>|<h5>**String**</h5>|Bandeira do cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**cardPanLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**acquirerId**</h5>|<h5>**String**</h5>|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerResponseDate**</h5>|<h5>**String**</h5>|Data/hora retornada pela adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**clientVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**merchantVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**additionalValue**</h5>|<h5>**BigDecimal**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**accountTypeId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um tipo de conta no contexto da transação executada.|
|<h5>**planId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um plano no contexto da transação executada.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardHolderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'falso' caso contrário.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**originalValue**</h5>|<h5>**BigDecimal**</h5>|Valor original da venda. Presente em pagamentos com QrCode, cujo beneficio foi aplicado ao valor da venda.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|ticketNumber gerado pelo terminal para a transação.|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**note**</h5>|<h5>**String**</h5>|Texto adicional que é inserido como Nota. (pode ser o número da fatura)|
|<h5>**dni**</h5>|<h5>**String**</h5>|Número do Documento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|Identificador QrCode gerado pelo terminal de captura.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245810"></a>**Reversal**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**cancelable**</h5>|<h5>**Boolean**</h5>|Indica 'true', caso esta transação possa ser desfeita e 'false' caso contrário.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**Receipt.clientVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**Receipt.merchantVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|ticketNumber gerado pelo terminal para a transação.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardholderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**panLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor da transação. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**additionalValue**</h5>|<h5>**BigDecimal**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'false' caso contrário.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245811"></a>**Refund**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**id**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor da transação. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**paymentType**</h5>|<h5>**PaymentType**</h5>|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**acquirerName**</h5>|<h5>**String**</h5>|Adquirente que autorizou o pagamento.|
|<h5>**cardBrand**</h5>|<h5>**String**</h5>|Bandeira do cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**cardPanLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**acquirerId**</h5>|<h5>**String**</h5>|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerResponseDate**</h5>|<h5>**String**</h5>|Data/hora retornada pela adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**clientVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**merchantVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**accountTypeId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um tipo de conta no contexto da transação executada.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardholderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'false' caso contrário.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|

-----
# <a name="_toc173245812"></a>**Consulta de Devolução não referenciada via API**
Esta é uma consulta via *Content Provider* que possibilita que outros aplicativos possam consultar informações sobre devoluções não referenciadas, sendo possível realizar filtros e obter diversos dados das devoluções não referenciadas, conforme objeto de retorno.
## <a name="_toc173245813"></a>**Integração com Aplicação de Pagamentos via *Content Provider***
Só será permitido listar pagamentos feitos pela própria aplicação que está realizando a consulta.

Declare essa permissão no AndroidManifest.xml do seu Aplicativo para ter acesso ao *Content Provider*.
#### **<uses-permission android:name="br.com.phoebus.android.payments.provider.READ\_PERMISSION"/>**
***content://br.com.phoebus.android.payments.provider/payments/refunds***

URI (Uniform Resource Identifier) para obtenção de informações de devoluções não referenciadas.

Para realizar o request da consulta de pagamento por período entre datas é necessário adicionar essa dependência.
#### **implementation 'com.jakewharton.threetenabp:threetenabp:1.0.3'**

### <a name="_toc173245814"></a>**Parâmetros de entrada**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação da aplicação que está realizando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso da aplicação que está realizando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
## <a name="_toc173245815"></a><a name="_filtros"></a>**Filtros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**status**</h5>|<h5>**ReversalStatus**</h5>|**Não**|Filtra as devoluções não referenciadas cuja situação está na lista passada (aceita mais de um valor).|
|<h5>**startDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra as devoluções não referenciadas cuja data seja maior ou igual ao valor passado.|
|<h5>**finishDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra as devoluções não referenciadas cuja data seja menor ou igual ao valor passado.|
|<h5>**lastUpdateQuery**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a consulta será feita com base na data e hora da devolução não referenciada (caso esse campo não seja preenchido ou receba 'false') ou na data e hora da última atualização da devolução não referenciada (caso esse campo receba 'true').|
|<h5>**startValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra as devoluções não referenciadas cujo valor seja maior ou igual ao valor passado.|
|<h5>**finishValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra as devoluções não referenciadas cujo valor seja menor ou igual ao valor passado.|
|<h5>**refundId**</h5>|<h5>**String**</h5>|**Não**|Filtra as devoluções não referenciadas cujo identificador para a aplicação de pagamentos seja o valor passado.|
|<h5>**lastDigits**</h5>|<h5>**String**</h5>|**Não**|Filtra as devoluções não referenciadas cujos últimos 4 dígitos do PAN do cartão usado na transação seja igual ao valor passado.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Identificador de produto, retorna apenas as devoluções não referenciadas feitas com um produto específico.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|ticketNumber gerado pelo terminal para a devolução.|
|<h5>**batchPend**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra as devoluções não referenciadas que ainda estão estão no lote pendente (devoluções novas).|
|<h5>**lastBatch**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra as devoluções não referenciadas do último lote fechado.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|**Não**|Filtra as devoluções não referenciadas de um lote com número específico (fechado ou aberto).|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Filtra as devoluções não referenciadas com base no código de resposta do host.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Filtra as devoluções não referenciadas com um Identificador especifico, informado pelo app integrado em reversePaymentV2(), no campo appTransactionId.|
## <a name="_toc173245816"></a>**Retorno**
A consulta de devolução não referenciada, retorna as devoluções não referenciadas que obedecerem aos [filtros](#_filtros) informados.

Os filtros informados são aplicados apenas aos campos das devoluções não referenciadas.

A lista de devoluções não referenciadas retornadas deve estar ordenada de forma ascendente pelo campo date.

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**id**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor da transação. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**paymentType**</h5>|<h5>**PaymentType**</h5>|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**acquirerName**</h5>|<h5>**String**</h5>|Adquirente que autorizou o pagamento.|
|<h5>**cardBrand**</h5>|<h5>**String**</h5>|Bandeira do cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**cardPanLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**acquirerId**</h5>|<h5>**String**</h5>|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerResponseDate**</h5>|<h5>**String**</h5>|Data/hora retornada pela adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**clientVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**merchantVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**accountTypeId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um tipo de conta no contexto da transação executada.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardholderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'false' caso contrário.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245817"></a>**EXEMPLO DE RETORNO**
A estrutura "refund" é a mesma usada na consulta de [última transação aprovada e confirmada](#_consulta_da_última);

●     Quando 2 devoluções obedecem aos critérios informados:

|<h5>**{</h5><br>`  `[</h5><br>`     `{</h5><br>`        `"refund": {</h5><br>            ...</h5><br>`        `}</h5><br>`     `},</h5><br>`     `{</h5><br>`        `"refund": {</h5><br>            ...</h5><br>`        `}</h5><br>`     `}</h5><br>`  `]</h5><br>}**</h5>|
| :- |


|![(informação)]**Info**|
| :-: |

Para facilitar o uso, são disponibilizadas classes de acesso ao provider:
#### **● RefundProviderRequest**
● PaymentProviderApi
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");</h5><br> </h5><br>`       `//criando objeto de request para o payment content provider</h5><br>`        `RefundProviderRequest request = createRequest(applicationInfo);**</h5></p><p><h5>`        `**try {</h5><br>`            `//solicitando a lista de devolução não referenciada</h5><br>`            `List<RefundProviderResponse> refundList = PaymentProviderApi.create(this).findAllRefunds(request);</h5><br>`            `//\*\*\*\*\*\*\*\*\* Outra forma de realizar a consulta \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*</h5><br>`            `// Cursor cursor = getApplicationContext().getContentResolver().query(request.getUriBuilder().build(), null, null, null, null);</h5><br>`            `// List<RefundProviderResponse> refundList = RefundProviderResponse.fromCursor(cursor);</h5><br>`            `//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***</h5></p><p><h5>`            `**Toast.makeText(this, paymentsList.size()+"", Toast.LENGTH\_LONG).show();**</h5></p><p><h5>`        `**} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private RefundProviderRequest createRequest(ApplicationInfo appInfo) {**</h5></p><p><h5>`        `**RefundProviderRequest refundRequest = new RefundProviderRequest();</h5><br>`        `refundRequest.setApplicationInfo(appInfo);</h5><br> </h5><br>`       `//filtrando pelo refundId</h5><br>`        `refundRequest.setRefundId("000000000");**</h5></p><p><h5>`        `**//filtrando por período</h5><br>`        `SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `Date dateStart = isoFormat.parse("2020-04-06T00:00:00.000");</h5><br>`            `Date dateFinish =isoFormat.parse("2020-04-06T23:59:59.000");</h5><br>`            `refundRequest.setStartDate(dateStart);</h5><br>`            `refundRequest.setFinishDate(dateFinish);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}**</h5></p><p><h5>`        `**//filtrando por faixa de valores de pagamento</h5><br>`        `refundRequest.setStartValue(new BigDecimal("0.00"));</h5><br>`        `refundRequest.setFinishValue(new BigDecimal("1000.00"));**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `refundRequest.setLastDigits("9636");**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `List<ReversalStatus> status = Arrays.asList(new ReversalStatus[]{</h5><br>`                     `ReversalStatus.PENDING,</h5><br>`                     `ReversalStatus.PROCESSING,</h5><br>`                     `ReversalStatus.CONFIRMED,</h5><br>`                     `ReversalStatus.CANCELLED</h5><br>`             `});</h5><br>`        `return refundRequest;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245818"></a>**Consulta de Estornos via API**
Esta é uma consulta via *Content Provider* que possibilita que outros aplicativos possam consultar informações sobre os estornos, sendo possível realizar filtros e obter diversos dados dos estornos conforme objeto de retorno.
## <a name="_toc173245819"></a>**Integração com Aplicação de Pagamentos via *Content Provider***
Só será permitido listar pagamentos feitos pela própria aplicação que está realizando a consulta.

Declare essa permissão no AndroidManifest.xml do seu Aplicativo para ter acesso ao *Content Provider*.
##### **<uses-permission android:name="br.com.phoebus.android.payments.provider.READ\_PERMISSION"/>**
***content://br.com.phoebus.android.payments.provider/payments/reversals***

URI (Uniform Resource Identifier) para obtenção de informações de estornos.

Para realizar o request da consulta por período entre datas é necessário adicionar essa dependência.
##### **implementation 'com.jakewharton.threetenabp:threetenabp:1.0.3'**

### <a name="_toc173245820"></a>**Parâmetros de entrada**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação da aplicação que está realizando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso da aplicação que está realizando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
### <a name="_toc173245821"></a>**Filtros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**status**</h5>|<h5>**ReversalStatus**</h5>|**Não**|Filtra os estornos cuja situação está na lista passada (aceita mais de um valor).|
|<h5>**startDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os estornos cuja data seja maior ou igual ao valor passado.|
|<h5>**finishDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os estornos cuja data seja menor ou igual ao valor passado.|
|<h5>**lastUpdateQuery**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a consulta será feita com base na data e hora do estorno (caso esse campo não seja preenchido ou receba 'false') ou na data e hora da última atualização do estorno (caso esse campo receba “TRUE”).|
|<h5>**startValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra os estornos cujo valor seja maior ou igual ao valor passado.|
|<h5>**finishValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra os estornos cujo valor seja menor ou igual ao valor passado.|
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Não**|Filtra os estornos cujo identificador do pagamento para a aplicação de pagamentos seja o valor passado.|
|<h5>**lastDigits**</h5>|<h5>**String**</h5>|**Não**|Filtra os estornos cujos últimos 4 dígitos do PAN do cartão seja igual ao valor passado.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Identificador de produto, retorna apenas estornos feitos com um produto específico.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|ticketNumber gerado pelo terminal para o estorno.|
|<h5>**batchPend**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra os estornos que ainda estão estão no lote pendente (estornos novos).|
|<h5>**lastBatch**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra os estornos do último lote fechado.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|**Não**|Filtra os estornos de um lote com número específico (fechado ou aberto).|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Filtra estornos com base no código de resposta do host.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Filtra estornos com um Identificador especifico, informado pelo app integrado em reversePaymentV2(), no campo appTransactionId.|
### <a name="_toc173245822"></a>**Retorno**
A consulta de estornos, retorna os estornos referenciados que obedecerem aos [filtros](#_filtros) informados, e os seus pagamentos associados.

Não retorna estornos que não obedecem aos filtros informados.

Os filtros informados são aplicados apenas aos campos dos estornos.

A lista de pagamentos retornados deve estar ordenada de forma ascendente pelo campo date do pagamento.

Em cada pagamento, a lista de estornos retornados deve estar ordenada de forma ascendente pelo campo date do estorno. Não retorna devoluções não referenciadas.

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**cancelable**</h5>|<h5>**Boolean**</h5>|Indica 'true', caso esta transação possa ser desfeita e 'false' caso contrário.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**Receipt.clientVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**Receipt.merchantVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|ticketNumber gerado pelo terminal para a transação.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardholderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**panLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor da transação. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**additionalValue**</h5>|<h5>**BigDecimal**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'false' caso contrário.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
##### **EXEMPLO DE RETORNO**
As estruturas "payment" e "reversals" são as mesmas usadas na consulta de [última transação aprovada e confirmada](#_consulta_da_última);

●     Quando dois estornos de um pagamento, e um estorno de outro pagamento obedecem aos critérios informados (por exemplo, filtro com status = CANCELLED):

|<h5>**[</h5><br>` `{</h5><br>`    `"payment": {</h5><br>        ...</h5><br>`    `},</h5><br>`    `"reversals": [</h5><br>`      `{</h5><br>         ...</h5><br>`      `},</h5><br>`      `{</h5><br>         ...</h5><br>`      `}</h5><br>`    `]</h5><br>` `},</h5><br>` `{</h5><br>`    `"payment": {</h5><br>        ...</h5><br>`    `},</h5><br>`    `"reversals": [</h5><br>`      `{</h5><br>         ...</h5><br>`      `}</h5><br>`    `]</h5><br>` `}</h5><br>]**</h5>|
| :- |

|![(informação)]**Info**|
| :-: |

Para facilitar o uso, são disponibilizadas classes de acesso ao provider:
##### **● ReversalProviderRequest**
##### **● PaymentProviderApi**
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;</h5><br> </h5><br>import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");</h5><br> </h5><br>`        `//criando objeto de request para o payment content provider</h5><br>`        `ReversalProviderRequest request = createRequest(applicationInfo);**       </h5></p><p><h5>`        `**try {</h5><br>`            `//solicitando a lista de estornos          </h5><br>`            `List<TransactionProviderResponse> transactionsList = PaymentProviderApi.create(this).findAllReversals(request);</h5><br>`            `//\*\*\*\*\*\*\*\*\* Outra forma de realizar a consulta \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*</h5><br>`            `// Cursor cursor = getApplicationContext().getContentResolver().query(request.getUriBuilder().build(), null, null, null, null);</h5><br>`            `// List<TransactionProviderResponse> transactionsList = TransactionProviderResponse.fromCursor(cursor);</h5><br>`            `//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***</h5></p><p><h5>`            `**Toast.makeText(this, transactionsList.size()+"", Toast.LENGTH\_LONG).show();**</h5></p><p><h5>`        `**} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private ReversalProviderRequest createRequest(ApplicationInfo appInfo) {</h5><br> </h5><br>`        `ReversalProviderRequest reversalRequest = new ReversalProviderRequest();</h5><br>`        `reversalRequest.setApplicationInfo(appInfo);**</h5></p><p><h5>`        `**//filtrando pelo paymentId</h5><br>`        `reversalRequest.setPaymentId("000000000");**</h5></p><p><h5>`        `**//filtrando por período</h5><br>`        `SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `Date dateStart = isoFormat.parse("2020-04-06T00:00:00.000");</h5><br>`            `Date dateFinish =isoFormat.parse("2020-04-06T23:59:59.000");</h5><br>`            `reversalRequest.setStartDate(dateStart);</h5><br>`            `reversalRequest.setFinishDate(dateFinish);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br> </h5><br>`        `//filtrando por faixa de valores de pagamento</h5><br>`        `reversalRequest.setStartValue(new BigDecimal("0.00"));</h5><br>`        `reversalRequest.setFinishValue(new BigDecimal("1000.00"));**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `reversalRequest.setLastDigits("9636");**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `List<ReversalStatus> status = Arrays.asList(new ReversalStatus[]{</h5><br>`                `ReversalStatus.PENDING,</h5><br>`                `ReversalStatus.PROCESSING,</h5><br>`                `ReversalStatus.CONFIRMED,</h5><br>`                `ReversalStatus.CANCELLED</h5><br>`        `});</h5><br>`        `return reversalRequest;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |


-----
# <a name="_toc173245823"></a>**Consulta de Lotes via API**
Esta é uma consulta via *Content Provider* que possibilita que outros aplicativos possam consultar informações sobre os lotes, sendo possível realizar filtros exclusivos e obter diversos dados dos lotes conforme objeto de retorno (vide [Fechamento de lote](http://177.69.97.18:6655/tabs/referencias/close_batch/)).
## <a name="_toc173245824"></a>**Integração com Aplicação de Pagamentos via *Content Provider***
Só será permitido listar pagamentos feitos pela própria aplicação que está realizando a consulta.

Declare essa permissão no AndroidManifest.xml do seu Aplicativo para ter acesso ao *Content Provider*.
##### **<uses-permission android:name="br.com.phoebus.android.payments.provider.READ\_PERMISSION"/>**
*content://br.com.phoebus.android.payments.provider/periodBatch* *content://br.com.phoebus.android.payments.provider/batchNumber* *content://br.com.phoebus.android.payments.provider/currentBatch*

URI (Uniform Resource Identifier) para obtenção de informações de lote.

Para realizar o request da consulta por período entre datas é necessário adicionar essa dependência.

implementation 'com.jakewharton.threetenabp:threetenabp:1.0.3'


### <a name="_toc173245825"></a>**Filtros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**batchFilter**</h5>|<h5>**BatchFilter**</h5>|**Sim**|Informa qual o tipo de filtro de lote é solicitado.|
|<h5>**startDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os lotes cuja data seja maior ou igual ao valor passado, necessário quando BatchFilter.TIME\_BATCH.|
|<h5>**finishDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os lotes cuja data seja menor ou igual ao valor passado, necessário quando BatchFilter.TIME\_BATCH.|
|<h5>**batchNumber**</h5>|<h5>**Long**</h5>|**Não**|Filtra os lotes por número específico, campo necessário quando BatchFilter.NUMBER\_BATCH.|
### <a name="_toc173245826"></a>**BatchFilter**

|**Nome**|**Descrição**|
| :- | :- |
|<h5>**CURRENT\_BATCH**</h5>|Lote atual.|
|<h5>**LAST\_CLOSED\_BATCH**</h5>|Último lote fechado.|
|<h5>**BATCH\_NUMBER**</h5>|Número do lote específico.|
|<h5>**PERIOD\_BATCH**</h5>|Lote por data e hora inicial e data/hora final.|
### <a name="_toc173245827"></a>**Retorno**
O objeto de resposta é o List<SettlementCallbackV2> (vide [Fechamento de lote](http://177.69.97.18:6655/tabs/referencias/close_batch/)).

|![(informação)]**Info**|
| :-: |

Para facilitar o uso, são disponibilizadas classes de acesso ao provider:
##### **● BatchProviderRequest**
##### **● BatchProviderApi**
##### **● BatchContract**
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;</h5><br> </h5><br>import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**//criando objeto de request para o batch content provider</h5><br>`        `BatchProviderRequest request = createRequest(applicationInfo);**</h5></p><p><h5>`        `**//selecionando propriedades retornadas</h5><br>`        `String[] columns = new String[]{</h5><br>`               `BatchContract.column.batchData              </h5><br>`        `};**</h5></p><p><h5>`        `**try {</h5><br>`            `//solicitando a lista de lotes</h5><br>`            `request.setColumns(columns);**</h5></p><p><h5>`            `**List<SettleRequestResponseV2> batchList = BatchProviderApi.create(this).findAll(request);**</h5></p><p><h5>`            `**//\*\*\*\*\*\*\*\*\* Outra forma de realizar a consulta \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*</h5><br>`            `// Cursor cursor = getApplicationContext().getContentResolver().query(request.getUriBuilder().build(), columns, null, null, null);</h5><br>`            `// List<SettleRequestResponseV2> batchList = SettleRequestResponseV2.fromCursor(cursor);</h5><br>`            `//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***</h5></p><p><h5>`            `**Toast.makeText(this, batchList.size()+"", Toast.LENGTH\_LONG).show();**</h5></p><p><h5>`        `**} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private BatchProviderRequest createRequest(ApplicationInfo appInfo) {</h5><br> </h5><br>`        `BatchProviderRequest batchRequest = new BatchProviderRequest();</h5><br>`        `batchRequest.setApplicationInfo(appInfo);**</h5></p><p><h5>`        `**//filtrando por período</h5><br>`        `SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `batchRequest.setBatchFilter(BatchFilter.PERIOD\_BATCH);</h5><br>`            `Date dateStart = isoFormat.parse("2020-04-06T00:00:00.000");</h5><br>`            `Date dateFinish =isoFormat.parse("2020-04-06T23:59:59.000");</h5><br>`            `batchRequest.setStartDate(dateStart);</h5><br>`            `batchRequest.setFinishDate(dateFinish);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`        `return batchRequest;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245828"></a>**Consulta de Pagamentos via API**
Uma das formas de se integrar com a aplicação de pagamentos da Cielo é via [IPC](https://developer.android.com/guide/components/aidl.html). Para isto, é fornecida uma biblioteca, a [payments-api-x.x.x.x.aar](https://github.com/paystore/paystore-api-demo/tree/master/app/aars), contendo todo o código necessário para realizar as chamadas de integração.

Usando esta API, é possível realizar todo o fluxo de pagamento, ou seja, a confirmação (ou o desfazimento). Além disso, pode-se informar uma lista de tipos de pagamentos (débito, crédito à vista, crédito parcelado, etc.) permitidos.

Ainda que esta integração se dê através de uma API, a aplicação de pagamentos pode exibir informações na interface do terminal, tais como mensagens (e.g., "Insira ou passe o cartão"), ou mesmo solicitar informações do operador (e.g., CVV). Assim sendo, durante a realização de qualquer operação, a aplicação que solicitou a operação não deve interagir com a interface do dispositivo até que a operação seja concluída.

A seguir, temos a especificação detalhada das operações disponíveis.

Para integração com a API de pagamentos, é fornecida a interface PaymentClient.
## <a name="_toc173245829"></a>**Integração com Aplicação de Pagamentos via *Content Provider***
A integração via *Content Provider* possibilita que outros aplicativos possam consultar informações a respeito de pagamentos efetuados, sendo possível realizar filtros e obter diversos dados dos pagamentos, inclusive sua situação.

Só será permitido listar pagamentos feitos pela própria aplicação que está realizando a consulta.

Declare essa permissão no AndroidManifest.xml do seu Aplicativo para ter acesso ao *Content Provider*.
##### **<uses-permission android:name="br.com.phoebus.android.payments.provider.READ\_PERMISSION"/>**
*content://br.com.phoebus.android.payments.provider/payments*

URI (Uniform Resource Identifier) para obtenção de informações de pagamentos.

Para realizar o request da consulta de pagamento por período entre datas é necessário adicionar essa dependência.
##### **implementation 'com.jakewharton.threetenabp:threetenabp:1.0.3'**

### <a name="_toc173245830"></a>**Filtros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|**Não**|Filtra os pagamentos cuja situação está na lista passada (aceita mais de um valor).|
|<h5>**startDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os pagamentos cuja data seja maior ou igual ao valor passado.|
|<h5>**finishDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os pagamentos cuja data seja menor ou igual ao valor passado.|
|<h5>**lastUpdateQuery**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a consulta será feita com base na data e hora da transação (caso esse campo não seja preenchido ou receba 'false') ou na data e hora da última atualização dela (caso esse campo receba 'true').|
|<h5>**startValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra os pagamentos cujo valor seja maior ou igual ao valor passado.|
|<h5>**finishValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra os pagamentos cujo valor seja menor ou igual ao valor passado.|
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Não**|Filtra os pagamentos cujo identificador da transação para a aplicação de pagamentos seja o valor passado.|
|<h5>**lastDigits**</h5>|<h5>**String**</h5>|**Não**|Filtra os pagamentos cujos últimos 4 dígitos do PAN do cartão usado na transação seja igual ao valor passado.|
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação da aplicação que está realizando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso da aplicação que está realizando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|ticketNumber gerado pelo terminal para a transação.|
|<h5>**batchPend**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra as transações que ainda estão estão no lote pendente (transações novas).|
|<h5>**lastBatch**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra as transações do último lote fechado.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|**Não**|Filtra as transações de um lote.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Filtra transações com base no código de resposta do host.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra a última transação aprovada.|
|<h5>**trxType**</h5>|<h5>**String**</h5>|**Não**|Filtra as transações por tipo ("1" - Venda, "2" - Devolução não Referenciada).|
|<h5>**note**</h5>|<h5>**String**</h5>|**Não**|Texto adicional que é inserido como Nota. (pode ser o número da fatura)|
|<h5>**dni**</h5>|<h5>**String**</h5>|**Não**|Número do Documento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|**Não**|Identificador QrCode gerado pelo terminal de captura.|
|<h5>**operationMethod**</h5>|<h5>**Integer**</h5>|**Não**|Filtra transações segundo a forma de operação. Admita os seguintes valores: 0 - Apenas com cartão físico (ler ou datilografado); 1 - Somente com QRCode.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Identificador da transação integrada para o software. O Identificador referido é aquele utilizado na aplicação que originou a solicitação de pagamento.|
### <a name="_toc173245831"></a>**Retorno**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**id**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor do pagamento. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**paymentType**</h5>|<h5>**PaymentType**</h5>|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**installments**</h5>|<h5>**Integer**</h5>|Quantidade de parcelas do pagamento.|
|<h5>**acquirerName**</h5>|<h5>**String**</h5>|Adquirente que autorizou o pagamento.|
|<h5>**cardBrand**</h5>|<h5>**String**</h5>|Bandeira do cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**cardPanLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**acquirerId**</h5>|<h5>**String**</h5>|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerResponseDate**</h5>|<h5>**String**</h5>|Data/hora retornada pela adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**receiptClient**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**receiptMerchant**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**additionalValue**</h5>|<h5>**BigDecimal**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**accountTypeId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um tipo de conta no contexto da transação executada.|
|<h5>**planId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um plano no contexto da transação executada.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardholderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'falso' caso contrário.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**originalValue**</h5>|<h5>**BigDecimal**</h5>|Valor orginal da venda. Presente em pagamentos com QRCode, cujo beneficio foi aplicado ao valor da venda.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|

|![(informação)]**Info**|
| :-: |

É possível customizar quais informações estarão presentes na resposta. Para isso, deve ser passado um array de Strings com as colunas desejadas para o método query() do Content Resolver. Caso use a API de acesso ao provider, pode utilizar o método setColumns() do PaymentProviderRequest.

|![(informação)]**Info**|
| :-: |

Para facilitar o uso, são disponibilizadas classes de acesso ao provider:
##### **● PaymentProviderRequest**
##### **● PaymentProviderApi**
##### **● PaymentContract**
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);</h5><br> </h5><br>`        `ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**//criando objeto de request para o payment content provider</h5><br>`        `PaymentProviderRequest request = createRequest(applicationInfo);**</h5></p><p><h5>`        `**//selecionando propriedades retornadas</h5><br>`        `String[] columns = new String[]{</h5><br>`                `PaymentContract.column.ID,</h5><br>`                `PaymentContract.column.VALUE,</h5><br>`                `PaymentContract.column.PAYMENT\_STATUS,</h5><br>`                `PaymentContract.column.PAYMENT\_DATE,</h5><br>`                `PaymentContract.column.CARD\_BRAND,</h5><br>`        `};</h5><br> </h5><br>`        `try {</h5><br>`            `//solicitando a lista de pagamentos</h5><br>`            `request.setColumns(columns);</h5><br>`            `List<Payment> paymentsList = PaymentProviderApi.create(this).findAll(request);</h5><br>`            `//\*\*\*\*\*\*\*\*\* Outra forma de realizar a consulta \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*</h5><br>`            `// Cursor cursor = getApplicationContext().getContentResolver().query(request.getUriBuilder().build(), columns, null, null, null);</h5><br>`            `// List<Payment> paymentsList = Payment.fromCursor(cursor);</h5><br>`            `//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***</h5></p><p><h5>`            `**Toast.makeText(this, paymentsList.size()+"", Toast.LENGTH\_LONG).show();**</h5></p><p><h5>`        `**} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private PaymentProviderRequest createRequest(ApplicationInfo appInfo) {**</h5></p><p><h5>`        `**PaymentProviderRequest paymentRequest = new PaymentProviderRequest();</h5><br>`        `paymentRequest.setApplicationInfo(appInfo);**</h5></p><p><h5>`        `**//filtrando pelo paymentId</h5><br>`        `paymentRequest.setPaymentId("000000000");**</h5></p><p><h5>`        `**//filtrando por período</h5><br>`        `SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `Date dateStart = isoFormat.parse("2020-04-06T00:00:00.000");</h5><br>`           `Date dateFinish =isoFormat.parse("2020-04-06T23:59:59.000");</h5><br>`            `paymentRequest.setStartDate(dateStart);</h5><br>`            `paymentRequest.setFinishDate(dateFinish);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}**</h5></p><p><h5>`        `**//filtrando por faixa de valores de pagamento</h5><br>`        `paymentRequest.setStartValue(new BigDecimal("0.00"));</h5><br>`        `paymentRequest.setFinishValue(new BigDecimal("1000.00"));**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `paymentRequest.setLastDigits("9636");**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `List<PaymentStatus> status = Arrays.asList(new PaymentStatus[]{</h5><br>`                `PaymentStatus.PENDING,</h5><br>`                `PaymentStatus.CONFIRMED,</h5><br>`                `PaymentStatus.CANCELLED,</h5><br>`                `PaymentStatus.REVERSED</h5><br>`        `});</h5><br>`        `return paymentRequest;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245832"></a>**Consulta de Pagamentos V2 via API**
Esta é uma consulta via *Content Provider* que possibilita que outros aplicativos possam consultar informações sobre os pagamentos efetuados, sendo possível realizar filtros e obter diversos dados dos pagamentos, inclusive sua situação.
## <a name="_toc173245833"></a>**Integração com Aplicação de Pagamentos via *Content Provider***
Só será permitido listar pagamentos feitos pela própria aplicação que está realizando a consulta.

Declare essa permissão no AndroidManifest.xml do seu Aplicativo para ter acesso ao *Content Provider*.
##### **<uses-permission android:name="br.com.phoebus.android.payments.provider.READ\_PERMISSION"/>**
*content://br.com.phoebus.android.payments.provider/payments/transactions*

URI (Uniform Resource Identifier) para obtenção de informações de pagamentos.

Para realizar o request da consulta de pagamento por período entre datas é necessário adicionar essa dependência.
##### **implementation 'com.jakewharton.threetenabp:threetenabp:1.0.3'**

### <a name="_toc173245834"></a>**Parâmetros de entrada**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação da aplicação que está realizando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso da aplicação que está realizando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
### <a name="_toc173245835"></a>**Filtros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|**Não**|Filtra os pagamentos cuja situação está na lista passada (aceita mais de um valor).|
|<h5>**startDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os pagamentos cuja data seja maior ou igual ao valor passado.|
|<h5>**finishDate**</h5>|<h5>**Date**</h5>|**Não**|Filtra os pagamentos cuja data seja menor ou igual ao valor passado.|
|<h5>**lastUpdateQuery**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a consulta será feita com base na data e hora da transação (caso esse campo não seja preenchido ou receba 'false') ou na data e hora da última atualização dela (caso esse campo receba 'true').|
|<h5>**startValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra os pagamentos cujo valor seja maior ou igual ao valor passado.|
|<h5>**finishValue**</h5>|<h5>**BigDecimal**</h5>|**Não**|Filtra os pagamentos cujo valor seja menor ou igual ao valor passado.|
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Não**|Filtra os pagamentos cujo identificador da transação para a aplicação de pagamentos seja o valor passado.|
|<h5>**lastDigits**</h5>|<h5>**String**</h5>|**Não**|Filtra os pagamentos cujos últimos 4 dígitos do PAN do cartão usado na transação seja igual ao valor passado.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|ticketNumber gerado pelo terminal para a transação.|
|<h5>**batchPend**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra as transações que ainda estão estão no lote pendente (transações novas).|
|<h5>**lastBatch**</h5>|<h5>**Boolean**</h5>|**Não**|Filtra as transações do último lote fechado.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|**Não**|Filtra as transações de um lote.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Filtra transações com base no código de resposta do host.|
|<h5>**note**</h5>|<h5>**String**</h5>|**Não**|Texto adicional que é inserido como Nota. (pode ser o número da fatura)|
|<h5>**dni**</h5>|<h5>**String**</h5>|**Não**|Número do Documento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|**Não**|Identificador QrCode gerado pelo terminal de captura.|
|<h5>**operationMethod**</h5>|<h5>**Integer**</h5>|**Não**|Filtra transações segundo a forma de operação. Admita os seguintes valores: 0 - Apenas com cartão físico (ler ou datilografado); 1 - Somente com QrCode.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Identificador da transação integrada para o software. O Identificador referido é aquele utilizado na aplicação que originou a solicitação de pagamento.|
### <a name="_toc173245836"></a>**Retorno**
A consulta de pagamentos, retorna os pagamentos que obedecerem aos [filtros](http://177.69.97.18:6655/tabs/referencias/queries/query_payments_v2/#filtros) informados, e os estornos associados a eles (inclusive estornos negados).

Os filtros informados são aplicados apenas aos campos dos pagamentos.

A lista de pagamentos retornados deve estar ordenada de forma ascendente pelo campo date do pagamento.

Em cada pagamento, a lista de estornos retornados deve estar ordenada de forma ascendente pelo campo date do estorno. Não retorna devoluções não referenciadas.

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**id**</h5>|<h5>**String**</h5>|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Valor do pagamento. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados.|
|<h5>**paymentType**</h5>|<h5>**PaymentType**</h5>|Tipo de pagamento (Débito, Crédito, Voucher, etc.).|
|<h5>**installments**</h5>|<h5>**Integer**</h5>|Quantidade de parcelas do pagamento.|
|<h5>**acquirerName**</h5>|<h5>**String**</h5>|Adquirente que autorizou o pagamento.|
|<h5>**cardBrand**</h5>|<h5>**String**</h5>|Bandeira do cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|BIN do cartão.|
|<h5>**cardPanLast4Digits**</h5>|<h5>**String**</h5>|Últimos 4 dígitos do PAN do cartão.|
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|Forma de captura do cartão.|
|<h5>**status**</h5>|<h5>**PaymentStatus**</h5>|Situação do pagamento.|
|<h5>**date**</h5>|<h5>**Date**</h5>|Data/hora do pagamento para a aplicação de pagamentos.|
|<h5>**acquirerId**</h5>|<h5>**String**</h5>|Identificador da transação para a adquirente. Este é o identificador que consta no arquivo que a adquirente fornece (EDI). Desta forma, é possível realizar a conciliação do pagamento com a transação integrada.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|Código de resposta da adquirente.|
|<h5>**acquirerResponseDate**</h5>|<h5>**String**</h5>|Data/hora retornada pela adquirente.|
|<h5>**acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**clientVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do cliente.|
|<h5>**merchantVia**</h5>|<h5>**String**</h5>|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**additionalValueType**</h5>|<h5>**AdditionalValueType**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**additionalValue**</h5>|<h5>**BigDecimal**</h5>|Presente apenas quando existe um valor adicional no contexto da transação executada.|
|<h5>**accountTypeId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um tipo de conta no contexto da transação executada.|
|<h5>**planId**</h5>|<h5>**String**</h5>|Presente apenas quando existe um plano no contexto da transação executada.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|Identificador de produto, retorna apenas transações de um produto.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|Número de lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|NSU gerado pelo terminal para a transação.|
|<h5>**cardHolderName**</h5>|<h5>**String**</h5>|Nome do cliente no cartão.|
|<h5>**lastTrx**</h5>|<h5>**Boolean**</h5>|Indica 'true' se é a última transação aprovada, e 'falso' caso contrário.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|Identificação do terminal.|
|<h5>**originalValue**</h5>|<h5>**BigDecimal**</h5>|Valor original da venda. Presente em pagamentos com QrCode, cujo beneficio foi aplicado ao valor da venda.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador de transação para o aplicativo de pagamento. Esta é a informação que será usada para confirmar e desfazer o pagamento.|
|<h5>**acquirerNsu**</h5>|<h5>**String**</h5>|NSU Adquirente para consulta e identificação de transações.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|ticketNumber gerado pelo terminal para a transação.|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**note**</h5>|<h5>**String**</h5>|Texto adicional que é inserido como Nota. (pode ser o número da fatura)|
|<h5>**dni**</h5>|<h5>**String**</h5>|Número do Documento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|Identificador QrCode gerado pelo terminal de captura.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
##### **EXEMPLO DE RETORNO QUANDO DOIS PAGAMENTOS OBEDECEM AOS CRÍTERIOS INFORMADOS**
As estruturas "payment" e "reversals" são as mesmas usadas na consulta de [última transação aprovada e confirmada](#_consulta_da_última);

|<h5>**[</h5><br>` `{</h5><br>`    `"payment": {</h5><br>       ...</h5><br>`    `},</h5><br>`    `"reversals": [ </h5><br>`      `{</h5><br>         ...</h5><br>`      `},</h5><br>`      `{</h5><br>         ...</h5><br>`      `},</h5><br>`      `{</h5><br>         ...</h5><br>`      `}</h5><br>`    `]</h5><br>` `},</h5><br>` `{</h5><br>`    `"payment": {</h5><br>        ...</h5><br>`    `},</h5><br>`    `"reversals": [ </h5><br>`      `{</h5><br>         ...</h5><br>`      `},</h5><br>`      `{</h5><br>         ...</h5><br>`      `},</h5><br>`      `{</h5><br>         ...</h5><br>`      `}</h5><br>`    `]</h5><br>` `}  </h5><br>]**</h5>|
| :- |


|![(informação)]**Info**|
| :-: |

É possível customizar quais informações estarão presentes na resposta. Para isso, deve ser passado um array de Strings com as colunas desejadas para o método query() do Content Resolver. Caso use a API de acesso ao provider, pode utilizar o método setColumns() do PaymentProviderRequest.

|![(informação)]**Info**|
| :-: |

Para facilitar o uso, são disponibilizadas classes de acesso ao provider:
##### **● PaymentProviderRequest**
##### **● PaymentProviderApi**
##### **● PaymentContract**
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;**</h5></p><p><h5>**import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;</h5><br> </h5><br>import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {</h5><br> </h5><br>`    `Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}</h5><br>`    `public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");</h5><br> </h5><br>`       `//criando objeto de request para o payment content provider</h5><br>`        `PaymentProviderRequest request = createRequest(applicationInfo);**</h5></p><p><h5>`        `**//selecionando propriedades retornadas</h5><br>`        `String[] columns = new String[]{</h5><br>`                `PaymentContract.column.ID,</h5><br>`                `PaymentContract.column.VALUE,</h5><br>`                `PaymentContract.column.PAYMENT\_STATUS,</h5><br>`                `PaymentContract.column.PAYMENT\_DATE,</h5><br>`                `PaymentContract.column.CARD\_BRAND,</h5><br>`        `};**</h5></p><p><h5>`        `**try {</h5><br>`            `//solicitando a lista de pagamentos</h5><br>`            `request.setColumns(columns);</h5><br>`            `List<Payment> paymentsList = PaymentProviderApi.create(this).findAllTransactions(request);</h5><br>`            `//\*\*\*\*\*\*\*\*\* Outra forma de realizar a consulta \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*</h5><br>`            `// Cursor cursor = getApplicationContext().getContentResolver().query(request.getUriBuilder().build(), columns, null, null, null);</h5><br>`            `// List<Payment> paymentsList = Payment.fromCursor(cursor);</h5><br>`            `//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***</h5></p><p><h5>`            `**Toast.makeText(this, paymentsList.size()+"", Toast.LENGTH\_LONG).show();</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**private PaymentProviderRequest createRequest(ApplicationInfo appInfo) {</h5><br>`        `PaymentProviderRequest paymentRequest = new PaymentProviderRequest();</h5><br>`        `paymentRequest.setApplicationInfo(appInfo);</h5><br> </h5><br>`        `//filtrando pelo paymentId</h5><br>`        `paymentRequest.setPaymentId("000000000");**</h5></p><p><h5>`        `**//filtrando por período</h5><br>`        `SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `Date dateStart = isoFormat.parse("2020-04-06T00:00:00.000");</h5><br>`            `Date dateFinish =isoFormat.parse("2020-04-06T23:59:59.000");</h5><br>`            `paymentRequest.setStartDate(dateStart);</h5><br>`            `paymentRequest.setFinishDate(dateFinish);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br> </h5><br>`        `//filtrando por faixa de valores de pagamento</h5><br>`       `paymentRequest.setStartValue(new BigDecimal("0.00"));</h5><br>`        `paymentRequest.setFinishValue(new BigDecimal("1000.00"));**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `paymentRequest.setLastDigits("9636");**</h5></p><p><h5>`        `**//filtrando pelos 4 últimos dígitos do cartão</h5><br>`        `List<PaymentStatus> status = Arrays.asList(new PaymentStatus[]{</h5><br>`                `PaymentStatus.PENDING,</h5><br>`                `PaymentStatus.CONFIRMED,</h5><br>`                `PaymentStatus.CANCELLED,</h5><br>`                `PaymentStatus.REVERSED</h5><br>`        `});</h5><br>`        `return paymentRequest;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245837"></a><a name="_consulta_da_última"></a>**Consulta da Última transação aprovada via API**
Esta é uma consulta via *Content Provider* que possibilita que outros aplicativos possam consultar informações sobre a última transação aprovada.

A última transação confirmada pode ser um pagamento, um estorno ou uma devolução não referenciada. Não possui filtros. Retorna a estrutura completa de pagamentos + estornos (aprovados ou negados). Pode retornar vazia se não houver transações aprovadas no terminal.
## <a name="_toc173245838"></a>**Integração com Aplicação de Pagamentos via *Content Provider***
Só será permitido listar pagamentos feitos pela própria aplicação que está realizando a consulta.

Declare essa permissão no AndroidManifest.xml do seu Aplicativo para ter acesso ao *Content Provider*.

*content://br.com.phoebus.android.payments.provider/payments/lastTransactions*

URI (Uniform Resource Identifier) para obtenção de informações da última transação aprovada.

Para realizar o request da consulta por período entre datas é necessário adicionar essa dependência.
##### **implementation 'com.jakewharton.threetenabp:threetenabp:1.0.3'**

### <a name="_toc173245839"></a>**Parâmetros de entrada**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação da aplicação que está realizando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso da aplicação que está realizando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
### <a name="_toc173245840"></a>**Estrutura Retornada**
●     Quando a Última transação aprovada é um pagamento, é retornado o objeto de pagamento e a lista de todos os estornos associados a ele;

●     Quando a Última transação aprovada é um estorno, é retornado o objeto de estorno, o pagamento associado a esse estorno, e, caso existam, outros estornos associados ao mesmo pagamento;

●     Quando a Última transação aprovada é uma devolução não referenciada, é retornado o objeto Refund.

A estrutura retornada segue conforme os exemplos abaixo:
#### **Exemplo quando a última transação é um pagamento**
Todos Campos de retorno dos objetos estão disponíveis na [estrutura retornada](#_estruturas_de_dados). O último pagamento confirmado será identificado através do campo "lastTrx": true.

|<h5>**{</h5><br>`   `"payment":{</h5><br>`      `"id":"",</h5><br>`      `"value":50,</h5><br>`      `"captureType":"MANUAL",</h5><br>`      `"status":"CONFIRMED",</h5><br>`      `"date":"01/06/2023 10:45",</h5><br>`      `"nsuTerminal":123,</h5><br>`      `"lastTrx":true</h5><br>        ...</h5><br>`   `},</h5><br>`   `"reversals":[</h5><br>`      `{</h5><br>         ...</h5><br>`      `}</h5><br>`   `]</h5><br>}**</h5>|
| :- |

#### **Exemplo quando a última transação é um estorno**
Todos Campos de retorno dos objetos estão disponíveis na [estrutura retornada](#_estruturas_de_dados).

O último estorno confirmado será identificado através do campo "lastTrx": true.

|<h5>**{</h5><br>`   `"payment":{</h5><br>      ...</h5><br>`   `},</h5><br>`   `"reversals":[</h5><br>`      `{</h5><br>`         `"paymentId":"",</h5><br>`         `"value":50,</h5><br>`         `"captureType":"MANUAL",</h5><br>`         `"status":"CONFIRMED",</h5><br>`         `"date":"01/06/2023 10:45",</h5><br>`         `"lastTrx":true</h5><br>         ...</h5><br>`      `}</h5><br>`   `]</h5><br>}**</h5>|
| :- |

#### **Exemplo quando a última transação é uma devolução não referenciada**
Todos Campos de retorno dos objetos estão disponíveis na [estrutura retornada](#_estruturas_de_dados).

A último Devolução não referenciada confirmado será identificado através do campo "lastTrx": true.

|<h5>**{</h5><br>`   `"refund":{</h5><br>`      `"id":"",</h5><br>`      `"value":50,</h5><br>`      `"captureType":"MANUAL",</h5><br>`      `"status":"CONFIRMED",</h5><br>`      `"date":"01/06/2023 10:45",</h5><br>`      `"nsuTerminal":123,</h5><br>`      `"lastTrx":true,</h5><br>       ...</h5><br>`   `}</h5><br>}**</h5>|
| :- |


|![(informação)]**Info**|
| :-: |

Para facilitar o uso, são disponibilizadas classes de acesso ao provider:

●     PaymentProviderApi
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;</h5><br>import java.math.BigDecimal;</h5><br> </h5><br>import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {**</h5></p><p><h5>`    `**Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`       `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**try {</h5><br>`            `//solicitando a última transação          </h5><br>`            `ProviderResponse lastTransaction = PaymentProviderApi.create(this).findLastTransaction(applicationInfo);**</h5></p><p><h5>`            `**Toast.makeText(this, lastTransaction.size()+"", Toast.LENGTH\_LONG).show();**</h5></p><p><h5>`        `**} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245841"></a>**Consultar Informações do Terminal**
A PayStore também disponibiliza um recurso para consultar as informações de um determinado ponto de venda (POS), como id do terminal, id do lojista, entre outros.

A classe TerminalInfoContract é responsável por prover essas informações.
### <a name="_toc173245842"></a>**Retorno**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|**merchantId**|<h5>**String**</h5>|Identificador do lojista|
|**merchantName**|<h5>**String**</h5>|Nome do lojista|
|**merchantCommercialName**|<h5>**String**</h5>|Razão Social do lojista|
|**nationalId**|<h5>**String**</h5>|Identificador do lojista (CPF, CNPJ)|
|**terminalId**|<h5>**String**</h5>|Identificador do terminal|
|**postalCode**|<h5>**String**</h5>|Código postal do lojista|
|**street**|<h5>**String**</h5>|Logradouro do lojista|
|**city**|<h5>**String**</h5>|Cidade do lojista|
|**state**|<h5>**String**</h5>|Estado do lojista|
|**stateAbbreviation**|<h5>**String**</h5>|Abreviação do nome do estado do lojista|
|**country**|<h5>**String**</h5>|País do lojista|
|**complement**|<h5>**String**</h5>|Complemento de endereço do lojista|
|**neighbourhood**|<h5>**String**</h5>|Bairro do lojista|
|**addressNumber**|<h5>**String**</h5>|Número do endereço do lojista|
|**merchantWebsite**|<h5>**String**</h5>|Site do lojista|
|**merchantEmail**|<h5>**String**</h5>|Endereço de e-mail do lojista|
|**merchantPhone**|<h5>**String**</h5>|Número de telefone do lojista|
|**merchantCategoryCode**|<h5>**String**</h5>|Código de categoria do lojista (MCCs)|
|**merchantNationalType**|<h5>**String**</h5>|Tipo de Lojista|
### <a name="_toc173245843"></a>**Segue, abaixo, um exemplo de sua implementação:**

|<p><h5>**package com.myapplication.controller;**</h5></p><p><h5>**import android.content.ContentResolver;</h5><br>import android.content.Context;</h5><br>import android.database.Cursor;</h5><br>import android.net.Uri;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.provider.TerminalInfoContract;**</h5></p><p><h5>**public class TerminalInfoController {</h5><br>`    `private Context context;</h5><br>`     `public TerminalInfoController(Context context) {</h5><br>`        `this.context = context;</h5><br>`    `}**</h5></p><p><h5>`    `**public TerminalInfo getTerminalInfo() {</h5><br>`        `Uri.Builder uriBuilder = TerminalInfoContract.getUriBuilder();</h5><br>`        `ContentResolver resolver = context.getContentResolver();**</h5></p><p><h5>`        `**try  {</h5><br>`            `Cursor query = resolver.query(uriBuilder.build(), null, null, null, null);</h5><br>`            `if (query != null && query.moveToFirst()) {</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MERCHANT\_ID)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MERCHANT\_NAME)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MERCHANT\_COMMERCIAL\_NAME)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.NATIONAL\_ID)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.TERMINAL\_ID)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_POSTAL\_CODE)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_STREET)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_CITY)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_STATE)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_STATE\_ABBREVIATION)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_COUNTRY)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_COMPLEMENT)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_NEIGHBOURHOOD)));</h5><br>`              `Log.d(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC\_ADDRESS\_NUMBER)));</h5><br>`              `query.close();</h5><br>`            `}</h5><br>`        `} catch (Exception e) {</h5><br>`            `e.printStackTrace();</h5><br>`        `}</h5><br>`        `return terminalInfo;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245844"></a>**Consultar Campos Adicionais da PayStore**
A PayStore utiliza um poderoso recurso de passagem de parâmetros cadastrados no Servidor para serem utilizados pelos terminais, sem que seja necessário alterar a mensageria de Inicialização. Isso traz uma enorme flexibilidade para criação de novas funcionalidades nos apps.

Os Campos Adicionais (também chamados de Parâmetros) são informações que podem ser cadastradas no Portal da PayStore, podendo ser configurados para todos os lojistas e terminais do Facilitador, para um grupo de lojistas específico, para um lojista (afeta todos os terminais daquele lojista) ou para um terminal específico. Essas informações podem ser lidas por um aplicativo através de *Providers*.

A classe *ConfigurationStoreContract* é responsável por prover essas informações. Segue, abaixo, um exemplo de sua implementação:

|<p><h5>**import android.content.ContentResolver;</h5><br>import android.content.Context;</h5><br>import android.database.Cursor;</h5><br>import android.net.Uri;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.provider.ConfigurationStoreContract;**</h5></p><p><h5>**public class ConfigController {**</h5></p><p><h5>`  `**private Context context;</h5><br>`  `public ConfigController(Context context) {</h5><br>`    `this.context = context;</h5><br>`  `}**</h5></p><p><h5>`  `**public String getProperty(String key) {**</h5></p><p><h5>`    `**Uri.Builder uriBuilder = ConfigurationStoreContract.getUriBuilder();</h5><br>`    `uriBuilder.appendQueryParameter(ConfigurationStoreContract.column.KEY, key);</h5><br>`    `ContentResolver resolver = this.context.getContentResolver();**</h5></p><p><h5>`    `**String value = null;</h5><br>`    `try (Cursor query = resolver.query(uriBuilder.build(), null, null, null, null)) {**</h5></p><p><h5>`      `**if (query != null && query.moveToFirst()) {</h5><br>`        `value = query.getString(query.getColumnIndex(ConfigurationStoreContract.column.VALUE));</h5><br>`      `}</h5><br>`    `}</h5><br>`    `return value;</h5><br>`  `}</h5><br>}**</h5></p>|
| :- |


Para utilizar essa classe, basta usar a chave definida previamente nos Campos Adicionais como parâmetro, conforme abaixo:

|<h5>**ConfigController config = new ConfigController(mContext);</h5><br>String conteudoCampoAdicional = config.getProperty("sua\_chave");**</h5>|
| :-: |
-----
<a name="_broadcast"></a>
**<a name="_toc173245845"></a>Broadcast**
=========================================
# <a name="_toc173245846"></a>**Integração com Aplicação de Pagamentos via *Broadcast***
Diferente das outras integrações, na integração via broadcast, outras aplicações podem receber notificações de que um pagamento ou um estorno foi efetuado. Esta informação é enviada pela aplicação de pagamentos via [*Broadcasts*](https://developer.android.com/guide/components/broadcasts.html) que podem ser recebidos por quaisquer aplicações que tenham interesse em saber da ocorrência de pagamentos ou estornos.
## <a name="_toc173245847"></a>***Actions***

|**Action**|**Extra**|
| :- | :- |
|<h5>**Intents.action.ACTION\_AFTER\_PAYMENT (br.com.phoebus.android.payments.AFTER\_PAYMENT\_FINISHED)**</h5>|Intents.extra.EXTRA\_PAYMENT\_RETURN: Payment (vide [startPaymentV2()](#_broadcast) ou documentação da classe.)|
|<h5>**Intents.action.ACTION\_AFTER\_REVERSAL (br.com.phoebus.android.payments.AFTER\_PAYMENT\_REVERSAL\_FINISHED)**</h5>|Intents.extra.EXTRA\_PAYMENT\_RETURN: ReversePayment (vide [reversePaymentV2()](#_broadcast) ou documentação da classe.)|
|<h5>**Intents.action.ACTION\_AFTER\_SETTLEMENT (br.com.phoebus.android.payments.ACTION\_AFTER\_SETTLEMENT)**</h5>|Intents.extra.EXTRA\_SETTLEMENT\_RETURN : [SettlementBroadcastResponse](#_fechamento_de_lote), EXTRA\_SETTLEMENT\_RETURN\_V2 : [SettlementBroadcastResponse](#_fechamento_de_lote) (ou vide [documentação da classe](#_resposta_broadcast_fechamento).)|
## <a name="_toc173245848"></a>**Exemplo**

|<p><h5>**public class MyBroadcastReceiver extends BroadcastReceiver {**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onReceive(Context context, Intent intent) {</h5><br>`        `if (intent.getAction().equals(Intents.action.ACTION\_AFTER\_PAYMENT)) {</h5><br>`            `Payment payment = DataUtils.fromBundle(Payment.class, intent.getExtras(), Intents.extra.EXTRA\_PAYMENT\_RETURN);**</h5></p><p><h5>`            `**// Do something!**</h5></p><p><h5>`        `**} else if (intent.getAction().equals(Intents.action.ACTION\_AFTER\_REVERSAL)) {</h5><br>`            `ReversePayment reversePayment = DataUtils.fromBundle(ReversePayment.class, intent.getExtras(), Intents.extra.EXTRA\_PAYMENT\_RETURN);</h5><br> </h5><br>`            `// Do something!**</h5></p><p><h5>`        `**} else if (intent.getAction().equals(Intents.action.ACTION\_AFTER\_SETTLEMENT)) {</h5><br>`            `SettlementBroadcastResponse settlementBroadcastResponse = DataUtils.fromBundle(SettlementBroadcastResponse.class, intent.getExtras(), Intents.extra.EXTRA\_SETTLEMENT\_RETURN);</h5><br>`            `SettlementBroadcastResponseV2 settlementBroadcastResponseV2 = SettlementBroadcastResponseV2.fromBundle(intent.getBundleExtra(Intents.extra.EXTRA\_SETTLEMENT\_RETURN\_V2));</h5><br> </h5><br>`            `// Do something!</h5><br>`        `}</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245849"></a><a name="_resposta_broadcast_fechamento"></a>**Resposta Broadcast Fechamento de Lote**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**succeeded**</h5>|<h5>**Boolean**</h5>|**Sim**|Indica se houve êxito no fechamento de lote. Onde retorna false se houve erro no fechamento de lote e true se obteve sucesso no mesmo.|
|<h5>**response**</h5>|<h5>**SettleRequestResponse (DEPRECATED)**</h5>|**Não**|Objeto de resposta para casos de sucesso no fechamento de lote. Note que em casos de erro, o mesmo não será retornado. (vide [closeBatch()](#_resposta_broadcast_fechamento) ou documentação da classe.)|
|<h5>**responseV2**</h5>|<h5>**SettleRequestResponseV2**</h5>|**Não**|Objeto de resposta para casos de sucesso no fechamento de lote. Note que em casos de erro, o mesmo não será retornado. (vide [closeBatch()](#_resposta_broadcast_fechamento) ou documentação da classe.)|
|<h5>**error**</h5>|<h5>**ErrorData**</h5>|**Não**|Objeto de resposta para casos de erro no fechamento de lote. Note que em casos de sucesso, o mesmo não será retornado. (vide [closeBatch()](#_resposta_broadcast_fechamento) ou documentação da classe.)|

-----
# <a name="_toc173245850"></a>**Resposta Broadcast de Erros**
Toda vez que ocorrer um erro no terminal o SDK Android envia um broadcast com as informações, o APP Diagnóstico processa e envia para o backend. O acesso a esses dados será realizado pelo servico de mensagens kafka pelo **Tópico** terminal-errors. Os endereços de brokers pode variar entre os ambientes, solicitar url para setor de operações.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|**Tamanho máximo dos campos**|
| :- | :- | :- | :- | :- |
|<h5>**paymentsAppVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão do app suite de pagamentos.|10 Caracteres|
|<h5>**timestamp**</h5>|<h5>**Date**</h5>|**Sim**|Data e hora do erro.| |
|<h5>**errorType**</h5>|<h5>**ErrorType**</h5>|**Sim**|Tipo de erro (ErrorType).| |
|<h5>**serial**</h5>|<h5>**string**</h5>|**Sim**|Número de serie do terminal.| |
|<h5>**errorCode**</h5>|<h5>**String**</h5>|**Não**|Código de erro (prefixo + identificador).|6 Caracteres|
|<h5>**errorMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem do erro.|255 Caracteres|
|<h5>**breadcrumbs**</h5>|<h5>**String**</h5>|**Não**|Caminho de ações acionadas pelo usuário da tela inicial até o momento do erro.|4096 Caracteres|
|<h5>**subAcquirerId**</h5>|<h5>**String**</h5>|**Não**|Código do facilitador Paystore ao qual o terminal está associado.|32 Caracteres|
|<h5>**merchantPaystore**</h5>|<h5>**String**</h5>|**Não**|Lojista na PayStore.|32 Caracteres|
|<h5>**terminalID**</h5>|<h5>**String**</h5>|**Não**|Número lógico do terminal.|8 Caracteres|
|<h5>**bCReturnCode**</h5>|<h5>**String**</h5>|**Não**|Código de erro da BC.|4 Caracteres|
|<h5>**stackTrace**</h5>|<h5>**String**</h5>|**Não**|Lista as chamadas de método que levam ao lançamento da exceção, junto com os nomes de arquivo e números de linha em que as chamadas ocorreram.|255 Caracteres|
|<h5>**bcCommands**</h5>|<h5>**List<BCCommand>**</h5>|**Não**|Lista os Comandos da BC.| |
|<h5>**bin**</h5>|<h5>**String**</h5>|**Não**|BIN do cartão.|6 Caracteres|
|<h5>**aid**</h5>|<h5>**String**</h5>|**Não**|Identificador da Aplicação do Cartão.|32 Caracteres|
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor da transação.| |
|<h5>**installments**</h5>|<h5>**Integer**</h5>|**Não**|Quantidade de parcelas do pagamento.| |
|<h5>**captureType**</h5>|<h5>**CaptureType**</h5>|**Não**|Forma de captura do cartão.| |
|<h5>**cardServiceCode**</h5>|<h5>**String**</h5>|**Não**|Código de Serviço do Cartão.| |
|<h5>**productId**</h5>|<h5>**Integer**</h5>|**Não**|Identificador do produto.| |
|<h5>**paymentType**</h5>|<h5>**PaymentType**</h5>|**Não**|Tipo de pagamento (Débito, Crédito, Voucher, etc.).| |
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|Número do cupom gerado pelo terminal para a transação.|4 Caracteres|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|**Não**|Número do lote.|3 Caracteres|
|<h5>**endpoint**</h5>|<h5>**String**</h5>|**Não**|Último endpoint utilizado pelo terminal antes do erro ocorrer.|2048 Caracteres|
|<h5>**sdkMethod**</h5>|<h5>**String**</h5>|**Não**|Método do SDK utilizado quando o erro ocorreu.|255 Caracteres|
|<h5>**applicationName**</h5>|<h5>**String**</h5>|**Não**|Nome da aplicação que usou o SDK.|255 Caracteres|
|<h5>**httpStatusCode**</h5>|<h5>**String**</h5>|**Não**|Código de erro HTTP.|3 Caracteres|
|<h5>**transactionUuid**</h5>|<h5>**String**</h5>|**Não**|UUID da transação.|36 Caracteres|
|<h5>**devicdeName**</h5>|<h5>**String**</h5>|**Não**|Modelo terminal.| |
|<h5>**lastBootDate**</h5>|<h5>**String**</h5>|**Não**|Hora (timestamp) em que o terminal foi ligado.| |
|<h5>**batteryLevel**</h5>|<h5>**String**</h5>|**Não**|Nível atual da bateria.| |
|<h5>**connectionType**</h5>|<h5>**String**</h5>|**Não**|Tipo de conexão com a internet.| |
|<h5>**wifiLevel**</h5>|<h5>**String**</h5>|**Não**|Intensidade do sinal Wi-fi.| |
|<h5>**isCharging**</h5>|<h5>**boolean**</h5>|**Não**|Informa se o disponsitivo esta conectado e carregando.| |
|<h5>**osVersion**</h5>|<h5>**String**</h5>|**Não**|Versão do sistema operacional.| |
|<h5>**kernelVersion**</h5>|<h5>**String**</h5>|**Não**|Versão do kernel.| |

-----
### <a name="_toc173245851"></a>**ErrorType**

|**Código**|**Nome**|**Descrição**|
| :- | :- | :- |
|1|SCREEN\_ERROR|Erros de tela|
|2|FATAL\_EXCEPTION|FatalException|
|3|COMM\_SERVER\_ERROR|Falhas de comunicação ou servidor|

-----
### <a name="_toc173245852"></a>**BCCommandType**

|**Código**|**Nome**|**Descrição**|
| :- | :- | :- |
|**1**|<h5>**GET\_CARD**</h5>|Retorno do método getCard da BC|
|**2**|<h5>**GO\_ON\_CHIP**</h5>|Retorno do método getOnChip da BC|
|**3**|<h5>**FINISH\_CHIP**</h5>|Retorno do método finishChip da BC|

-----
### <a name="_toc173245853"></a>**BCCommand**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|**Tamanho Máximo dos campos**|
| :- | :- | :- | :- | :- |
|<h5>**type**</h5>|<h5>**BCCommandType**</h5>|**Não**|Tipo de comando (getCard, goOnChip ou finishChip) da BC.| |
|<h5>**input**</h5>|<h5>**String**</h5>|**Não**|Entrada do comando (getCard, goOnChip ou finishChip) da BC.|2048 Caracteres|
|<h5>**output**</h5>|<h5>**String**</h5>|**Não**|Saída do comando (getCard, goOnChip ou finishChip) da BC.|-|

-----
# <a name="_toc173245854"></a>**Realizar Inicialização**
# <a name="_toc173245855"></a>**Inicia o processo de inicialização com a PayStore e com a Adquirente**
Esse método deve ser chamado para fazer a inicialização do terminal com a Paystore e com a(s) adquirente(s) instalada(s).
## <a name="_toc173245856"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void startInitialization(String activityAction, PaymentCallback paymentCallback)**</h5>|Inicia o processo de inicialização com a Paystore e com a Adquirente.|
|<h5>**void startInitialization(InitializationRequest initializationRequest, PaymentCallback paymentCallback)**</h5>|Inicia o processo de inicialização com a Paystore e com a Adquirente, utilizando InitializationRequest.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**activityAction**</h5>|<h5>**String**</h5>|**Sim**|Action da activity da aplicação externa que deve ser chamada após a inicialização ser concluída.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|
|<h5>**initializationRequest**</h5>|<h5>**InitializationRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da inicialização.|
|<h5>**paymentCallback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|

*request (**InitializationRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**activityAction**</h5>|<h5>**String**</h5>|**Não**|Action da aplicação externa que deve ser chamada após a inicialização ser concluída.|
|<h5>**installToken**</h5>|<h5>**String**</h5>|**Não**|Token de Instalação para credenciamento do terminal na Paystore. Este parâmetro só será considerado na primeira inicialização do terminal.|
## <a name="_toc173245857"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;</h5><br>`    `private String action = "br.com.phoebus.payments.demo.ACTION\_INITIALIZE";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `InitializationRequest request = new InitializationRequest();</h5><br>`        `request.setInstallToken("1a2b3cdef");</h5><br>`        `request.setActivityAction("123456abcde");</h5><br> </h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`        `try {</h5><br>`            `paymentClient.startInitialization(request, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while initialization.", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Object data) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245858"></a>**Enviar Pagamentos**
# <a name="_toc173245859"></a>**Faz o envio dos pagamentos para a Paystore**
Esse método deve ser chamado para enviar os pagamentos do terminal para a Paystore.
## <a name="_toc173245860"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|void startPushPayments(PaymentCallback paymentCallback)|Faz o envio dos pagamentos para a Paystore.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245861"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`   `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`       `try {</h5><br>`            `paymentClient.startPushPayments(this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while sending payments to Paystore.", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Object data) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
<a name="_toc173245862"></a>**Checagem de Notificações

Verifica se há notificações na Paystore.**
======================================================
Esse método deve ser chamado para checar se há alguma notificação pendente da Paystore para o terminal.
## <a name="_toc173245863"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void getNotifications(PaymentCallback paymentCallback)**</h5>|Verifica se há notificações na Paystore.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

***callback***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245864"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.getNotifications(this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while checking notifications.", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(Object data) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Object data) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
<a name="_toc173245865"></a><a name="_fechamento_de_lote"></a>**Fechamento de Lote

[DEPRECATED] Sincroniza as transações e fecha o lote atual.**
==================================================================================
Esse método deve ser chamado para executar o fechamento de lote e envio do mesmo.
## <a name="_toc173245866"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void closeBatch(SettlementRequest settlementRequest, PaymentCallback paymentCallback)**</h5>|Sincroniza as transações e fecha o lote atual.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**SettlementRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do fechamento de lote. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de fechamento de lote.|

**Detalhe dos parâmetros** *request (**SettlementRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não.|

**(DEPRECATED: Utilizar SettlementCallbackV2)**
#### ***callback (SettlementCallback)***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso.|
|<h5>**Settlement.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Sim**|Retorna um comprovante da adquirente com as informações do fechamento de lote.|
|<h5>**Settlement.BatchNumber**</h5>|<h5>**String**</h5>|**Sim**|Número de lote.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta do host.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|**Sim**|Identificação do terminal|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem enviada no campo 63 de resposta EPS, para ser impressa ou exibida no final do fluxo transacional. O aplicativo de pagamentos permanece responsável por exibir na tela ou verificar o conteúdo presente neste campo, mas também deve enviar o valor recebido para a aplicação integrada para que ela possa aplicar suas regras de negócios baseadas no conteúdo deste campo.|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de falha.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Observe que apenas este erro será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem enviada no campo 63 de resposta EPS, para ser impressa ou exibida no final do fluxo transacional. O aplicativo de pagamentos permanece responsável por exibir na tela ou verificar o conteúdo presente neste campo, mas também deve enviar o valor recebido para a aplicação integrada para que ela possa aplicar suas regras de negócios baseadas no conteúdo deste campo.|
## <a name="_toc173245867"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`       `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");**</h5></p><p><h5>`        `**SettlementRequest settlementRequest = new SettlementRequest();</h5><br>`        `settlementRequest.setApplicationInfo(appInfo);</h5><br>`        `settlementRequest.setPrintMerchantReceipt(true);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.closeBatch(settlementRequest, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while closing batch.", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`       `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Settlement settlement) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245868"></a>**Sincroniza as transações e fecha o lote atual.**
Esse método deve ser chamado para executar o fechamento de lote e envio do mesmo.
## <a name="_toc173245869"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void closeBatchV2(SettlementRequest settlementRequest, PaymentCallbackV2 paymentCallbackV2)**</h5>|Sincroniza as transações e fecha o lote atual.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**SettlementRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do fechamento de lote. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallbackV2**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de fechamento de lote.|

**Detalhe dos parâmetros** *request (**SettlementRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não.|

**(Disponível a partir da versão(.aar) v3.1.4.0)**
#### ***callback (SettlementCallbackV2)***

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso.|
|<h5>**Settlement.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Sim**|Retorna um comprovante da adquirente com as informações do fechamento de lote.|
|<h5>**Settlement.BatchNumber**</h5>|<h5>**String**</h5>|**Sim**|Número de lote.|
|<h5>**acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta do host.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|**Sim**|Identificação do terminal|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem enviada no campo 63 de resposta EPS, para ser impressa ou exibida no final do fluxo transacional. O aplicativo de pagamentos permanece responsável por exibir na tela ou verificar o conteúdo presente neste campo, mas também deve enviar o valor recebido para a aplicação integrada para que ela possa aplicar suas regras de negócios baseadas no conteúdo deste campo.|
|<h5>**batchClosureDate**</h5>|<h5>**Date**</h5>|**Não**|Data e hora do fechamento de lote.|
|<h5>**batchReports**</h5>|<h5>**List<BatchReport>**</h5>|**Não**|Lista de transações por adquirentes.|
|<h5>**totalReportInfos**</h5>|<h5>**List<BatchReportInfo>**</h5>|**Não**|Lista com os dados de pagamentos totais.|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de falha.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro que ocorreu. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Observe que apenas este erro será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Se a transação foi negada pela adquirente, conterá a mensagem retornada pela adquirente.|
|<h5>**ErrorData.acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem enviada no campo 63 de resposta EPS, para ser impressa ou exibida no final do fluxo transacional. O aplicativo de pagamentos permanece responsável por exibir na tela ou verificar o conteúdo presente neste campo, mas também deve enviar o valor recebido para a aplicação integrada para que ela possa aplicar suas regras de negócios baseadas no conteúdo deste campo.|
|<h5>**ErrorDataV2.errorMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem descritiva da causa da não autorização. Este campo é exclusivo para a mensagem de erro|
### <a name="_toc173245870"></a>**BatchReport**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**transactionReportInfo**</h5>|<h5>**List<BatchReportInfo>**</h5>|Lista com agrupamento das transações.|
|<h5>**parcelReportInfo**</h5>|<h5>**List<BatchReportInfo>**</h5>|Lista com agrupamento das transações por parcela.|
### <a name="_toc173245871"></a>**BatchReportInfo**

|**Nome**|**Tipo**|**Descrição (Transaction)**|**Descrição (Parcel)**|
| :- | :- | :- | :- |
|<h5>**item**</h5>|<h5>**String**</h5>|Tipo de transação <br>0 - Compra; <br>1 - Devolução; <br>2 - Anulação de compra; <br>3 - Extração; <br>4 - Anulação de Extração.|Quantidade de parcelas.|
|<h5>**quantity**</h5>|<h5>**Integer**</h5>|Quantidade de transações pelo tipo de transação.|Quantidade de transações da mesma parcela.|
|<h5>**installments**</h5>|<h5>**Integer**</h5>| | |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|Soma dos valores do tipo de transação.|Soma dos valores da mesma parcela.|
## <a name="_toc173245872"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`       `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");**</h5></p><p><h5>`        `**SettlementRequest settlementRequest = new SettlementRequest();</h5><br>`        `settlementRequest.setApplicationInfo(appInfo);</h5><br>`        `settlementRequest.setPrintMerchantReceipt(true);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.closeBatchV2(settlementRequest, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while closing batch.", e);</h5><br>`        `}</h5><br>`   `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorDataV2 errorDataV2) {</h5><br>`        `Log.e(TAG, "Error: " + errorDataV2.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Settlement settlement) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245873"></a>**Devolução não Referenciada**
# <a name="_toc173245874"></a>**[DEPRECATED] Realiza o processo de devolução não referenciada.**
Esse método deve ser chamado para executar a devolução não referenciada.
## <a name="_toc173245875"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void refundPayment(RefundRequest settlementRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de devolução não referenciada. (DEPRECATED: Utilizar refundPaymentV2)|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**RefundRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da devolução não referenciada. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de devolução.|

**Detalhe dos parâmetros** *request (**RefundRequest**)* 
**(DEPRECATED: Utilizar RefundRequestV2)**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor da devolução não referenciada. Caso não seja preenchido (null), ou seja preenchido com 0 (zero), o App de Pagamento deve solicitar o valor ao operador.|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Não**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não. O valor padrão é **false**, isto é, o comprovante não é impresso.|
|<h5>**printCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do cliente deve ser impresso ou não. O valor padrão é **false**, isto é, o comprovante não é impresso.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Quando preenchido, após a leitura do cartão e identificação do produto de bandeira, caso não corresponda a productShortName do produto em questão, o terminal deve exibir um erro em tela e encerrar a transação. Exemplos: VI=VISA, MC=MASTERCARD, AX=AMEX|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Identificador da transação integrada para o software. O Identificador referido é aquele utilizado na aplicação que originou a solicitação de devolução. Não deve se repetir.|

*callback (**RefundCallback**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**Refund.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|ID da adquirente.|
|<h5>**Refund.refundId**</h5>|<h5>**String**</h5>|**Sim**|ID da devolução.|
|<h5>**Refund.productShortName**</h5>|<h5>**String**</h5>|**Sim**|Corresponde ao productShortName correspondente ao produto de bandeira do contexto da transação.|
|<h5>**Refund.batchNumber**</h5>|<h5>**String**</h5>|**Sim**|ID do lote ao qual a transação pertence.|
|<h5>**Refund.nsuTerminal**</h5>|<h5>**String**</h5>|**Sim**|NSU gerado pelo terminal para a transação. Os 4 dígitos mais à direita correspondem ao Ticket Number. Esse NSU é informado pelo terminal para o PhAST no parâmetro “merchantTransactionId”.|
|<h5>**Refund.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da adquirente.|
|<h5>**Refund.acquirerResponseDate**</h5>|<h5>**Date**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**Refund.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**Refund.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento. Cópia lojista|
|<h5>**Refund.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente. Cópia cliente|
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|
## <a name="_toc173245876"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {</h5><br>`    `private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`        `RefundRequest refundRequest = new RefundRequest();</h5><br>`        `refundRequest.setApplicationInfo(appInfo);</h5><br>`        `refundRequest.setPrintMerchantReceipt(true);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.refundPayment(refundRequest, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error starting devolution", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`   `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Refund refund) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245877"></a><a name="_realiza_o_processo"></a>**Realiza o processo de devolução não referenciada**
Esse método deve ser chamado para executar a devolução não referenciada.

**A partir da versão 3.1.5.0**

Quando uma transação é feita, anteriormente, poderia ser confirmado realizando sua impressão (ou via printReceipt), ou ao realizar uma nova transação. Agora, o estorno também pode ser confirmado ao usar o novo parâmetro autoConfirm - indicando se deve ou não confirmar independente da impressão - ou utilizando o novo método confirmReversePayment().
## <a name="_toc173245878"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void refundPaymentV2(RefundRequestV2 settlementRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de devolução não referenciada.|
|<h5>**void confirmReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Confirma uma autorização de devolução não autorizada realizada anteriormente.|
|<h5>**void cancelReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Desfaz uma solicitação devolução não referenciada.|
### <a name="_toc173245879"></a>**refundPaymentV2()**
**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**RefundRequestV2**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da devolução não referenciada. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de devolução.|

**Detalhe dos parâmetros** *request (**RefundRequestV2**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|<p>Valor da devolução não referenciada. Caso não seja preenchido (null), ou seja preenchido com 0 (zero), o App de Pagamento deve solicitar o valor ao operador.</p><p>O valor deverá ser formatado com duas casas decimais.</p>|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Não**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não. O valor padrão é **false**, isto é, o comprovante não é impresso.|
|<h5>**printCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do cliente deve ser impresso ou não. O valor padrão é **false**, isto é, o comprovante não é impresso.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Quando preenchido, após a leitura do cartão e identificação do produto de bandeira, caso não corresponda a productShortName do produto em questão, o terminal deve exibir um erro em tela e encerrar a transação. Exemplos: VI=VISA, MC=MASTERCARD, AX=AMEX|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Identificador da transação integrada para o software. O Identificador referido é aquele utilizado na aplicação que originou a solicitação de devolução. Não deve se repetir.|
|<h5>**previewMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do estabelecimento deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**previewCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do cliente deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**autoConfirm (v3.1.5.0)**</h5>|<h5>**Boolean**</h5>|**Não**|<p>Indica se a transação deve ser confirmada automaticamente.</p><p>**Valores possíveis:**</p><p>1\.      null (padrão) : confirma automaticamente caso ocorra a impressão do comprovante.</p><p>2\.      true : confirma automaticamente independente da regra de impressão.</p><p>3\.      false : não confirma automaticamente, ficando pendente aguardando confirmação.</p>|

*callback (**RefundCallback**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**Refund.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|ID da adquirente.|
|<h5>**Refund.refundId**</h5>|<h5>**String**</h5>|**Sim**|ID da devolução.|
|<h5>**Refund.productShortName**</h5>|<h5>**String**</h5>|**Sim**|Corresponde ao productShortName correspondente ao produto de bandeira do contexto da transação.|
|<h5>**Refund.batchNumber**</h5>|<h5>**String**</h5>|**Sim**|ID do lote ao qual a transação pertence.|
|<h5>**Refund.nsuTerminal**</h5>|<h5>**String**</h5>|**Sim**|NSU gerado pelo terminal para a transação. Os 4 dígitos mais à direita correspondem ao Ticket Number. Esse NSU é informado pelo terminal para o PhAST no parâmetro “merchantTransactionId”.|
|<h5>**Refund.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da adquirente.|
|<h5>**Refund.acquirerResponseDate**</h5>|<h5>**Date**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**Refund.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número da autorização fornecido pela adquirente (consta no comprovante do cliente Portador do Cartão).|
|<h5>**Refund.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento. Cópia lojista|
|<h5>**Refund.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente. Cópia cliente|
|<h5>** </h5>|<h5>** </h5>|** | |
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|
### <a name="_toc173245880"></a>**confirmReversePayment()**
Este método deve ser chamado para confirmar uma devolução não referenciada que o terminal conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para uma devolução não referenciada já confirmado, ou seja, em que já se executou o método **confirmReversePayment()** anteriormente.

Este método **não** deve ser chamado para uma devolução não referenciada já desfeito, ou seja, em que já se executou o método **cancelReversePayment()** anteriormente.

Este método **não** deve ser chamado para uma devolução não referenciada que foi negada pelo Autorizador, ou seja, a transação precisa ter sido autorizada pelo Autorizador.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será confirmada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245881"></a>**cancelReversePayment()**
Este método deve ser chamado para desfazer uma devolução não referenciada anteriormente autorizada. Esta transação deve não ter sido desfeita ainda e deve ter sido autorizada (não negada) previamente.

Como dito na descrição de [reversePayment()](#_realiza_o_processo), é possível que não haja desfazimento para uma devolução não referenciada para uma determinada adquirente. Assim, o método cancelReversePayment() pode retornar um erro específico informando que não é possível executar tal operação (vide [Códigos de Resposta](#_códigos_de_resposta)).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será desfeita. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245882"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`        `RefundRequestV2 refundRequestV2 = new RefundRequestV2();</h5><br>`       `refundRequestV2.setApplicationInfo(appInfo);</h5><br>`        `refundRequestV2.setPrintMerchantReceipt(true);**</h5></p><p><h5>`        `**try {</h5><br>`           `paymentClient.refundPaymentV2(refundRequestV2, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error starting devolution", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Refund refund) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
<a name="_toc173245883"></a>**Devolução Referência sem Payment

Realiza o processo de anulação/devolução referenciada sem paymentId**
=====================================================================
Esse método deve ser chamado para executar a anulação/devolução referenciada sem paymentId.

**A partir da versão 3.1.5.0**

Quando uma transação é feita, anteriormente, poderia ser confirmado realizando sua impressão (ou via printReceipt), ou ao realizar uma nova transação. Agora, o estorno também pode ser confirmado ao usar o novo parâmetro autoConfirm - indicando se deve ou não confirmar independente da impressão - ou utilizando o novo método confirmReversePayment().
## <a name="_toc173245884"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void reversePaymentWithFilter(ReversePaymentFilterRequest settlementRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de anulação/devolução referenciada sem paymentId.|
|<h5>**void confirmReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Confirma uma autorização de estorno de pagamento realizada anteriormente.|
|<h5>**void cancelReversePayment(String paymentId, PaymentCallback paymentCallback)**</h5>|Desfaz uma solicitação de estorno de pagamento.|
### <a name="_toc173245885"></a>**reversePaymentWithFilter()**
**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**ReversePaymentFilterRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da anulação/devolução referenciada sem paymentId. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de anulação/devolução.|

**Detalhe dos parâmetros** *request (**ReversePaymentFilterRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**value**</h5>|<h5>**BigDecimal**</h5>|**Não**|Valor da transação a ser devolvida. Caso não seja preenchido (null), ou seja preenchido com 0 (zero), o App de Pagamento deve solicitar o valor ao operador.|
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não. O valor padrão é false, isto é, o comprovante não é impresso.|
|<h5>**printCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do cliente deve ser impresso ou não. O valor padrão é false, isto é, o comprovante não é impresso.|
|<h5>**operationMethod**</h5>|<h5>**Integer**</h5>|**Não**|Indica o método de operação (QR ou Card) usado para o pagamento original. Admita o seguintes valores: 0 - Apenas com cartão físico (ler ou datilografado); 1 - Somente com QRCode; Se não for relatado, modos de disponível no terminal capturar.|
|<h5>**productShortName**</h5>|<h5>**String**</h5>|**Não**|Quando preenchido, após a leitura do cartão e identificação do produto de bandeira, caso não corresponda a productShortName do produto em questão, o terminal deve exibir um erro em tela e encerrar a transação. Exemplos: VI=VISA, MC=MASTERCARD, AX=AMEX|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|Indica o número do cupom, após a transação de pagamento realizada com um cartão físico.|
|<h5>**originalQRId**</h5>|<h5>**String**</h5>|**Não**|Identificador QrCode gerado pelo terminal de captura. Quando a transação de pagamento é realizada através de Código QR|
|<h5>**Payment.paymentDate**</h5>|<h5>**Date**</h5>|**Não**|Indica a data/hora de pagamento para o App de Pagamentos. Quando a transação de pagamento não é conhecido pelo terminal de captura, ou seja, foi feito em outro terminal.|
|<h5>**previewMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do estabelecimento deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**previewCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do cliente deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**autoConfirm (v3.1.5.0)**</h5>|<h5>**Boolean**</h5>|**Não**|<p>Indica se a transação deve ser confirmada automaticamente.</p><p>**Valores possíveis:**</p><p>1\.      null (padrão) : confirma automaticamente caso ocorra a impressão do comprovante.</p><p>2\.      true : confirma automaticamente independente da regra de impressão.</p><p>3\.      false : não confirma automaticamente, ficando pendente aguardando confirmação.</p>|

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**ReversePayment.paymentId**</h5>|<h5>**String**</h5>|**Sim**|ID da transação de reversão.|
|<h5>**ReversePayment.acquirerId**</h5>|<h5>**String**</h5>|**Sim**|ID da Adquirente.|
|<h5>**ReversePayment.cancelable**</h5>|<h5>**Boolean**</h5>|**Sim**|Retorna se a transação pode ser desfeita(true) ou não(false).|
|<h5>**ReversePayment.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta da Adquirente.|
|<h5>**ReversePayment.acquirerResponseDate**</h5>|<h5>**String**</h5>|**Sim**|Data/hora retornada pela adquirente.|
|<h5>**ReversePayment.acquirerAuthorizationNumber**</h5>|<h5>**String**</h5>|**Sim**|Número de autorização fornecido pela adquirente (consta no comprovante do cliente portador do cartão).|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem adicional enviada pela adquirente na resposta da transação.|
|<h5>**ReversePayment.Receipt.clientVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do cliente.|
|<h5>**ReversePayment.Receipt.merchantVia**</h5>|<h5>**String**</h5>|**Não**|Conteúdo do comprovante - via do estabelecimento.|
|<h5>**batchNumber**</h5>|<h5>**String**</h5>|**Sim**|Número do lote.|
|<h5>**nsuTerminal**</h5>|<h5>**String**</h5>|**Sim**|NSU gerado pelo terminal para a transação. Os 4 dígitos mais à direita correspondem ao Ticket Number.|
|<h5>**cardholderName**</h5>|<h5>**String**</h5>|**Sim**|Nome do cliente no cartão.|
|<h5>**cardBin**</h5>|<h5>**String**</h5>|**Sim**|Primeros 6 dígitos do cartão.|
|<h5>**panLast4Digits**</h5>|<h5>**String**</h5>|**Sim**|Últimos 4 dígitos do cartão.|
|<h5>**terminalId**</h5>|<h5>**String**</h5>|**Sim**|Identificador do terminal.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|**Não**|Identificador QrCode gerado pelo terminal de captura.|
|<h5>** </h5>|<h5>** </h5>|** | |
|<h5>**onError**</h5>|<h5>** </h5>|** |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|
|<h5>**acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem adicional enviada pela adquirente na resposta da transação.|
### <a name="_toc173245886"></a>**confirmReversePayment()**
Este método deve ser chamado para confirmar um estorno que o terminal conseguiu processar completamente a perna de autorização enviada pelo Autorizador.

Este método **não** deve ser chamado para um estorno já confirmado, ou seja, em que já se executou o método **confirmReversePayment()** anteriormente.

Este método **não** deve ser chamado para um estorno já desfeito, ou seja, em que já se executou o método **cancelReversePayment()** anteriormente.

Este método **não** deve ser chamado para um estorno que foi negada pelo Autorizador, ou seja, a transação precisa ter sido autorizada pelo Autorizador.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será confirmada. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>** </h5>|<h5>** </h5>| | |
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
### <a name="_toc173245887"></a>**cancelReversePayment()**
Este método deve ser chamado para desfazer uma transação de estorno anteriormente autorizada. Esta transação deve não ter sido desfeita ainda e deve ter sido autorizada (não negada) previamente.

Como dito na descrição de [reversePayment()](#_realiza_o_processo), é possível que não haja desfazimento para a transação de estorno para uma determinada adquirente. Assim, o método cancelReversePayment() pode retornar um erro específico informando que não é possível executar tal operação (vide [Códigos de Resposta](#_códigos_de_resposta)).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação que será desfeita. O Identificador referido é aquele utilizado na aplicação de pagamentos.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>** </h5>|<h5>** </h5>| | |
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Sim|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|Não|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Sim|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
## <a name="_toc173245888"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {</h5><br>`    `private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`        `ReversePaymentFilterRequest request = new ReversePaymentFilterRequest();</h5><br>`        `request.setApplicationInfo(appInfo);</h5><br>`        `request.setPrintMerchantReceipt(true);**</h5></p><p><h5>`        `**try {</h5><br>`            `paymentClient.reversePaymentWithFilter(request, this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error starting devolution", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`   `**@Override</h5><br>`    `public void onError(ErrorData errorData) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Refund refund) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245889"></a>**Reimpressão**
### <a name="_toc173245890"></a>**reprint()**
**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**ReprintRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do pagamento. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de pagamento.|

**Detalle de los Parámetros**

*request (**ReprintRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**ticketNumber**</h5>|<h5>**String**</h5>|**Não**|Número do cupom. Se não for informado, será considerado o comprovante do último pagamento autorizado.|
|<h5>**Payment.paymentDate**</h5>|<h5>**Date**</h5>|**Não**|Data/hora do pagamento para a aplicação de [pagamentos.Se](http://pagamentos.Se) não for informado, será considerado o comprovante do último pagamento autorizado.|

*callback (**PaymentCallback**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>** </h5>|<h5>** </h5>| | |
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|Sim|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|Não|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|Sim|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|



-----
# <a name="_toc173245891"></a>**Impressão de comprovante**
### <a name="_toc173245892"></a>**printReceipt()**
Esse método deve ser chamado para realizar impressão do comprovante quando a transação for confirmada. Uma vez solicitado a impressão do comprovante com sucesso, só é permitido reimpressão.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**PrintReceiptRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição do pagamento. Note que nem todos os parâmetros são obrigatórios.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de pagamento.|

**Detalhe dos Parâmetros**

*request (**PrintReceiptRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**ApplicationInfo.credentials**</h5>|<h5>**Credentials**</h5>|**Sim**|Credenciais da aplicação que está solicitando a operação, conforme cadastro na PayStore. Basicamente, trata-se da identificação da aplicação e o token de acesso.|
|<h5>**ApplicationInfo.softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando o pagamento.|
|<h5>**paymentId**</h5>|<h5>**String**</h5>|**Sim**|Identificador da transação para a aplicação de pagamentos. Esta é a informação a ser usada para a confirmação e desfazimento.|
|<h5>**printMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do estabelecimento deve ser impresso ou não.|
|<h5>**printCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se o comprovante do cliente deve ser impresso ou não.|
|<h5>**previewMerchantReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do estabelecimento deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|
|<h5>**previewCustomerReceipt**</h5>|<h5>**Boolean**</h5>|**Não**|Indica se a tela de pré-visualização do comprovante do cliente deve ser exibida após a confirmação da transação. O valor padrão é true, o que significa que o comprovante será exibido.|

*callback (**PaymentCallback**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>** </h5>|<h5>** </h5>| | |
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.acquirerResponseCode**</h5>|<h5>**String**</h5>|**Não**|Código de resposta para o erro ocorrido retornado pela adquirente. Note que este erro só será retornado se a transação não for autorizada pela adquirente.|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa da não autorização. Caso a transação tenha sido negada pela adquirente, conterá a mensagem retornada pela adquirente.|
|<h5>**ErrorData.acquirerAdditionalMessage**</h5>|<h5>**String**</h5>|**Não**|Mensagem adicional enviada pela adquirente na resposta da transação.|



-----
# <a name="_toc173245893"></a><a name="_códigos_de_resposta"></a>**Códigos de Resposta da Integração**

|**Código**|**Descrição**|**Operações**|
| :- | :- | :- |
|**01**|**Transação negada pela adquirente.**|<h5>**startPayment e startPaymentV2**</h5>|
|**02**|**Transação negada pelo cartão.**|<h5>**startPayment e startPaymentV2**</h5>|
|**03**|**Operação cancelada pelo operador.**|<h5>**startPayment, startPaymentV2, reversePayment e reversePaymentV2**</h5>|
|**04**|**Pagamento não encontrado.**|<h5>**confirmPayment, cancelPayment, reversePayment, reversePaymentV2 e cancelReversePayment**</h5>|
|**05**|**Operação não disponível na adquirente.**|<h5>**cancelReversePayment**</h5>|
|**06**|**Problema na comunicação com o aplicativo de pagamento.**|<h5>**startPayment, startPaymentV2, reversePayment, reversePaymentV2, cancelPayment e confirmPayment**</h5>|
|**07**|**Problema de comunicação com a adquirente.**|<h5>**Todas**</h5>|
|**08**|**Credenciais Inválidas.**|<h5>**startPayment, startPaymentV2, reversePayment e reversePaymentV2**</h5>|
|**09**|**Aplicativo de Pagamentos não possui permissões para continuar.**|<h5>**startPayment,startPaymentV2, reversePayment e reversePaymentV2**</h5>|
|**10**|**Terminal Bloqueado.**|<h5>**startPayment, startPaymentV2, reversePayment e reversePaymentV2**</h5>|
|**11**|**Pagamento bloqueado, pois existe transação pendente.**|<h5>**startPayment, startPaymentV2, reversePayment e reversePaymentV2**</h5>|
|**12**|**Tema inválido**|<h5>**setTheme**</h5>|
|**13**|**SERVIÇO OCUPADO, AGUARDE**|<h5>**confirmPayment cancelPayment**</h5>|
|**14**|**Erro ao definir aplicativo principal**|<h5>**setMainApp**</h5>|
|**15**|**A aplicação principal já está definida por campos adicionais**|<h5>**setMainApp**</h5>|
|**16**|**Pagamento habilitado apenas via API**|<h5>**terminalFilterPayment**</h5>|
|**17**|**Houve um problema ao extrair ou carregar os dados.**|<h5>**startExtraction**</h5>|
|**18**|**Inicialização falhou.**|<h5>**startInitialization**</h5>|
|**19**|**Um erro ocorreu ao checar as notificações.**|<h5>**getNotifications**</h5>|
|**20**|**Houve um problema ao realizar o teste de comunicação.**|<h5>**startEchoTest**</h5>|
|**21**|**Ocorreu um erro durante o fechamento de lote.**|<h5>**closeBatche closeBatchV2**</h5>|
|**22**|**Operação não permitida.**|<h5>**Todas**</h5>|
|**24**|**Transação com QRCode está pendente**|<h5>**startPayment, startPaymentV2, reversePayment e reversePaymentV2**</h5>|
|**25**|**Ocorre quando o comprovante da transação foi impresso e/ou visualizado**|<h5>**printReceipt()**</h5>|
|**99**|**ERRO INTERNO.**|<h5>**Todas**</h5>|
-----
# <a name="_toc173245894"></a>**Extração de Dados**
Esse método deve ser chamado para fazer a extração dos dados do Payments e das adquirentes sendo utilizadas e enviá-los para a AWS (Amazon Web Services).

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**callback**</h5>|<h5>**PaymentCallBack**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|
## <a name="_toc173245895"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {**</h5></p><p><h5>`    `**private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplciationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`        `try {</h5><br>`            `paymentClient.startExtraction(this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while uploading data.", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(Object data) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Object data) {</h5><br>`        `Log.i(TAG, "Success!");</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245896"></a>**Echo Test**
# <a name="_toc173245897"></a>**Inicia o processo para realizar os testes de comunicação**
Esse método deve ser chamado quando se deseja realizar testes de comunicação com os servidores que o terminal se comunica. Ao fim da execução será retornado o objeto EchoTestResults, contendo informações de cada teste executado.
## <a name="_toc173245898"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void startEchoTest(PaymentCallback paymentCallback)**</h5>|Inicia o processo para realizar os testes de comunicação.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|
## <a name="_toc173245899"></a>**Exemplo**

|<p><h5>**public class MyActivity extends Activity implements PaymentClient.PaymentCallback {</h5><br>`    `private PaymentClient paymentClient;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`       `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_payment);</h5><br>`        `paymentClient = new PaymentClientImpl();</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onResume() {</h5><br>`        `super.onResume();</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onDestroy() {</h5><br>`         `try {</h5><br>`            `paymentClient.unbind(this);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Log.e(TAG, e.getMessage());</h5><br>`        `}</h5><br>`        `super.onDestroy();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute(){</h5><br>`        `ApplicationInfo appInfo = new ApplicationInfo();</h5><br>`        `appInfo.setCredentials(new Credentials("demo-app", "TOKEN-KEY-DEMO"));</h5><br>`        `appInfo.setSoftwareVersion("1.0.0.0");</h5><br> </h5><br>`        `try {</h5><br>`            `paymentClient.startEchoTest(this);</h5><br>`        `} catch (ClientException e) {</h5><br>`            `Log.e(TAG, "Error while doing the test", e);</h5><br>`        `}</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onError(Object data) {</h5><br>`        `Log.e(TAG, "Error: " + errorData.getResponseMessage());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onSuccess(Object data) {</h5><br>`        `CommTestResults results = (CommTestResults) data;</h5><br>`        `Log.i(TAG, results.toString());</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |

### <a name="_toc173245900"></a>**Retorno**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**isConnectedNetwork**</h5>|<h5>**boolean**</h5>|Identifica se está conectado a alguma rede, seja ela Wi-Fi ou Chip de Dados.|
|<h5>**networkLevel**</h5>|<h5>**int**</h5>|Nível de sinal da rede conectada.|
|<h5>**isPaystoreInit**</h5>|<h5>**boolean**</h5>|Indica se a Inicialização com a Paystore está disponível.|
|<h5>**isStoreStatus**</h5>|<h5>**boolean**</h5>|Indica se a Loja de Apps está disponível.|
|<h5>**storeResponseTime**</h5>|<h5>**Long**</h5>|Tempo de resposta da Loja de Apps.|
|<h5>**acquirerResults**</h5>|<h5>**List<AcquirerCommTestResults>**</h5>|Lista com resultados dos testes de comunicação com as adquirentes.|
|<h5>**serverName**</h5>|<h5>**String**</h5>|Nome do servidor.|
|<h5>**serverStatus**</h5>|<h5>**boolean**</h5>|Indica se o servidor está disponível.|
|<h5>**serverMeanResponseTime**</h5>|<h5>**Long**</h5>|Média do tempo de resposta dos testes com o servidor (no caso de ter mais de um adquirente, esse tempo é a média de todos os adquirentes instalados).|
##### **ACQUIRERCOMMTESTRESULTS**

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**acquirerName**</h5>|<h5>**String**</h5>|Nome do adquirente.|
|<h5>**acquirerStatus**</h5>|<h5>**CommTestStatus**</h5>|Indica se a comunicação com o adquirente está disponível.|
|<h5>**acquirerResponseTime**</h5>|<h5>**Long**</h5>|Tempo de resposta do teste com o adquirente.|
|<h5>**serverName**</h5>|<h5>**String**</h5>|Nome do servidor.|
|<h5>**serverStatus**</h5>|<h5>**CommTestStatus**</h5>|Indica se o servidor está disponível.|
|<h5>**serverResponseTime**</h5>|<h5>**Long**</h5>|Tempo de resposta dos testes com o servidor.|
##### **COMMTESTSTATUS**

|**Nome**|**Descrição**|
| :- | :- |
|**NONE**|Não há comunicação.|
|**ONLINE**|Comunicação está Online.|
|**OFFLINE**|Comunicação está Offline|

-----
# <a name="_toc173245901"></a>**Customizar a aplicação principal**
Através dessa opção o Facilitador pode definir seu apk como principal. Assim que o terminal for ligado a aplicação configurada será chamada ao invés da aplicação padrão de pagamento PayStore.

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**packageName**</h5>|<h5>**String**</h5>|**Sim**|Nome do pacote da aplicação|
|<h5>**callback**</h5>|<h5>**PaymentCallBack**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro.|

**Detalhe dos parâmetros**

*callback*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**onSuccess**</h5>|<h5>** </h5>| |Método para notificação em caso de sucesso|
|<h5>**onError**</h5>|<h5>** </h5>| |Método para notificação em caso de erro.|
|<h5>**ErrorData.paymentsResponseCode**</h5>|<h5>**String**</h5>|**Sim**|Código de resposta para o erro ocorrido. Vide [Códigos de Resposta](#_códigos_de_resposta)|
|<h5>**ErrorData.responseMessage**</h5>|<h5>**String**</h5>|**Sim**|Mensagem descritiva da causa do erro.|
## <a name="_toc173245902"></a>**Exemplo**

|<p><h5>**import android.os.Bundle;</h5><br>import android.support.v7.app.AppCompatActivity;</h5><br>import android.view.View;</h5><br>import android.widget.EditText;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ErrorData;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.exception.ClientException;**</h5></p><p><h5>**public class SetMainAppActivity extends AppCompatActivity {</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `private EditText packageNameEdt;**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `this.setTitle(R.string.setMainApp);</h5><br>`        `setContentView(R.layout.activity\_set\_main\_app);**</h5></p><p><h5>`        `**this.packageNameEdt = ((EditText) this.findViewById(R.id.packageNameEdt));</h5><br>`        `this.packageNameEdt.setText("br.com.phoebus.payments.demo");</h5><br>`      `this.paymentClient = new PaymentClient();</h5><br>`        `this.paymentClient.bind(this.getApplicationContext());</h5><br>`    `}**</h5></p><p><h5>`    `**public void doSetMainApp(View view) {</h5><br>`        `if (!isDataValid()) return;**</h5></p><p><h5>`        `**try {</h5><br>`            `this.paymentClient.setMainApp(packageNameEdt.getText().toString(), new PaymentClient.PaymentCallback() {**</h5></p><p><h5>`                `**@Override</h5><br>`                `public void onSuccess(Object data) {</h5><br>`                    `Toast.makeText(SetMainAppActivity.this, "App principal definido!", Toast.LENGTH\_SHORT).show();</h5><br>`                `}**</h5></p><p><h5>`                `**@Override</h5><br>`                `public void onError(ErrorData errorData) {</h5><br>`                    `Toast.makeText(SetMainAppActivity.this, "Erro ao definir app principal: " + errorData.getPaymentsResponseCode() +</h5><br>`                            `" = " + errorData.getResponseMessage(), Toast.LENGTH\_LONG).show();</h5><br>`                `}</h5><br>`            `});</h5><br>`        `} catch (ClientException e) {</h5><br>`            `e.printStackTrace();</h5><br>`            `Toast.makeText(SetMainAppActivity.this, "Falha na chamada do serviço: " + e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`        `}</h5><br>`    `}</h5><br> </h5><br>`    `private boolean isDataValid() {</h5><br>`        `boolean ret = true;</h5><br>`        `if ("".equals(this.packageNameEdt.getText().toString())) {</h5><br>`            `this.packageNameEdt.setError(getString(R.string.requieredFieldError));</h5><br>`            `ret = false;</h5><br>`       `}</h5><br>`        `return ret;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245903"></a>**Resolução de Pendências QRCode (Pagamento Específico)**
# <a name="_toc173245904"></a>**[\*\*DEPRECATED] Realiza o processo de resolução de pendências QR Code - Pagamento Específico\*\***
Esse método deve ser chamado para executar a resolução de pendências QR Code - Pagamento específico.
## <a name="_toc173245905"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void resolveQRCodePendencies(QRCodePendencyRequest settlementRequest, PaymentCallback paymentCallback)**</h5>|Realiza o processo de resolução de pendência QR Code para pagamento específico.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**QRCodePendencyRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da resolução de pendências para pagamento específico QR Code.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de resolução de pendências para pagamento específico QR Code.|

**Detalhe dos parâmetros** *request (**QRCodePendencyRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação do aplicativo que está solicitando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso do aplicativo que está solicitando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
|<h5>**date**</h5>|<h5>**Date**</h5>|**Sim**|Data / hora do pagamento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|**Sim**|Identificador QRCode gerado pelo terminal de captura.|

*response (**QRCodePendencyResponse**)*

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**status**</h5>|<h5>**QRCodeIntentStatus**</h5>|Indica a situação da transação com QR.|
|<h5>**type**</h5>|<h5>**QRCodeIntentType**</h5>|Tipo de QR (venda, anulação, devolução).|
|<h5>**payment**</h5>|<h5>**PaymentV2**</h5>|Objeto que representa os dados do pagamento.|
|<h5>**reversePayment**</h5>|<h5>**ReversePayment**</h5>|Objeto que representa os dados do estorno.|
##### **QRCODEINTENTSTATUS**

|**Nome**|**Id**|**Descrição**|
| :- | :- | :- |
|**CREATED**|**1**|Transação criada.|
|**PENDING**|**2**|Transação pendente.|
|**WAITING**|**3**|Transação em espera.|
|**PROCESSING**|**4**|Transação em processamento.|
|**PROCESSED**|**5**|Transação processada.|
|**CONFIRMED**|**6**|Solicitação confirmada.|
|**CANCELED**|**7**|Transação cancelada.|
|**REVERSED**|**8**|Transação estornada.|
|**DENIED**|**9**|Transação Negada.|
|**EXPIRED**|**10**|Transação expirada.|
|**UNREACHABLE**|**11**|Transação inacessível.|
##### **QRCODEINTENTTYPE**

|**Nome**|**Id**|**Descrição**|
| :- | :- | :- |
|**PAYMENT**|**0**|Indica que o tipo de QR é um pagamento.|
|**REVERSAL**|**1**|Indica que o tipo de QR é um estorno.|
|**DEVOLUTION**|**2**|Indica que o tipo de QR é uma devolução.|
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;</h5><br>import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {</h5><br>`    `Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**//criando objeto de request para o payment</h5><br>`        `QRCodePendencyRequest request = createRequest(applicationInfo);</h5><br>`    `}**</h5></p><p><h5>`    `**private QRCodePendencyRequest createRequest(ApplicationInfo appInfo) {</h5><br>`        `QRCodePendencyRequest request = new QRCodePendencyRequest();</h5><br>`        `request.setApplicationInfo(appInfo);**</h5></p><p><h5>`        `**request.setSecretToken(appInfo.getCredentials());</h5><br>`        `request.setApplicationId(appInfo.getCredentials());</h5><br>`        `request.setSoftwareVersion(appInfo.getSoftwareVersion());</h5><br>`        `request.setQrId("123");**</h5></p><p><h5>`        `**SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `Date date = isoFormat.parse("2021-07-27T00:00:00.000");</h5><br>`            `request.setDate(date);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`        `return request;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245906"></a>**Realiza o processo de resolução de pendências QR Code - Pagamento Específico**
Esse método deve ser chamado para executar a resolução de pendências QR Code - Pagamento específico. Para utilizá-lo, ao menos um identificador do pagamento deve ser fornecido, seja o qrId ou o appTransactionId.
## <a name="_toc173245907"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void resolveQRCodePendencyV2(QRCodePendencyRequestV2 request, PaymentCallback paymentCallback)**</h5>|Realiza o processo de resolução de pendência QR Code para pagamento específico.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**QRCodePendencyRequestV2**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da resolução de pendências para pagamento específico QR Code.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de resolução de pendências para pagamento específico QR Code.|

**Detalhe dos parâmetros** - *request (**QRCodePendencyRequestV2**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação do aplicativo que está solicitando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso do aplicativo que está solicitando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|
|<h5>**date**</h5>|<h5>**Date**</h5>|**Sim**|Data / hora do pagamento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|**Não**|Identificador QrCode gerado pelo terminal de captura.|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|**Não**|Identificador da transação integrada.|

*response (**QRCodePendencyResponse**)*

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**status**</h5>|<h5>**QRCodeIntentStatus**</h5>|Indica a situação da transação com QR.|
|<h5>**type**</h5>|<h5>**QRCodeIntentType**</h5>|Tipo de QR (venda, anulação, devolução).|
|<h5>**payment**</h5>|<h5>**PaymentV2**</h5>|Objeto que representa os dados do pagamento.|
|<h5>**reversePayment**</h5>|<h5>**ReversePayment**</h5>|Objeto que representa os dados do estorno.|
##### **QRCODEINTENTSTATUS**

|**Nome**|**Id**|**Descrição**|
| :- | :- | :- |
|**CREATED**|**1**|Transação criada.|
|**PENDING**|**2**|Transação pendente.|
|**WAITING**|**3**|Transação em espera.|
|**PROCESSING**|**4**|Transação em processamento.|
|**PROCESSED**|**5**|Transação processada.|
|**CONFIRMED**|**6**|Solicitação confirmada.|
|**CANCELED**|**7**|Transação cancelada.|
|**REVERSED**|**8**|Transação estornada.|
|**DENIED**|**9**|Transação Negada.|
|**EXPIRED**|**10**|Transação expirada.|
|**UNREACHABLE**|**11**|Transação inacessível.|
##### **QRCODEINTENTTYPE**

|**Nome**|**Id**|**Descrição**|
| :- | :- | :- |
|**PAYMENT**|**0**|Indica que o tipo de QR é um pagamento.|
|**REVERSAL**|**1**|Indica que o tipo de QR é um estorno.|
|**DEVOLUTION**|**2**|Indica que o tipo de QR é uma devolução.|
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;</h5><br>import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {</h5><br>`    `Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`        `paymentClient.bind(this);</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}</h5><br>`    `public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**//criando objeto de request para o payment</h5><br>`        `QRCodePendencyRequestV2 request = createRequest(applicationInfo);</h5><br>`        `paymentClient.resolveQRCodePendencyV2(request, new PaymentClient.PaymentCallback<QRCodePendencyResponse>() {**</h5></p><p><h5>`            `**@Override</h5><br>`            `public void onSuccess(QRCodePendencyResponse response) {</h5><br>`                `Log.d("Pendencia resolvida");</h5><br>`            `}**</h5></p><p><h5>`            `**@Override</h5><br>`            `public void onError(ErrorData errorData) {</h5><br>`                `Log.d("Algo deu errado!");</h5><br>`            `}</h5><br>`        `}</h5><br>`    `}</h5><br>`    `private QRCodePendencyRequestV2 createRequest(ApplicationInfo appInfo) {</h5><br>`        `QRCodePendencyRequestV2 request = new QRCodePendencyRequestV2();</h5><br>`        `request.setApplicationInfo(appInfo);**</h5></p><p><h5>`       `**request.setSecretToken(appInfo.getCredentials());</h5><br>`        `request.setApplicationId(appInfo.getCredentials());</h5><br>`        `request.setSoftwareVersion(appInfo.getSoftwareVersion());</h5><br>`        `request.setAppTransactionId("123456");**</h5></p><p><h5>`        `**SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");</h5><br>`        `isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));**</h5></p><p><h5>`        `**try {</h5><br>`            `Date date = isoFormat.parse("2021-07-27T00:00:00.000");</h5><br>`           `request.setDate(date);</h5><br>`        `} catch (Exception e) {</h5><br>`            `Toast.makeText(this, e.getMessage(), Toast.LENGTH\_LONG).show();</h5><br>`            `Log.e(TAG, e.getMessage(), e);</h5><br>`        `}</h5><br>`        `return request;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245908"></a>**Realiza o processo de resolução de pendências QR Code - Lista de pagamentos**
Esse método deve ser chamado para executar a resolução de pendências QR Code - Lista de pagamentos.
## <a name="_toc173245909"></a>**Métodos**

|**Assinatura**|**Descrição**|
| :- | :- |
|<h5>**void resolveQRCodePendencies(QRCodePendenciesRequest request, PaymentCallback paymentCallback)**</h5>|Realiza o processo de resolução de pendência QR Code para lista de pagamentos.|

**Parâmetros**

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**request**</h5>|<h5>**QRCodePendenciesRequest**</h5>|**Sim**|Objeto de transferência de dados que conterá as informações da requisição da resolução de pendências para lista de pagamentos QR Code.|
|<h5>**callback**</h5>|<h5>**PaymentCallback**</h5>|**Sim**|Interface que será executada para notificações de sucesso ou erro do processo de resolução de pendências para lista de pagamentos QR Code.|

**Detalhe dos parâmetros** *request (**QRCodePendenciesRequest**)*

|**Nome**|**Tipo**|**Obrigatório**|**Descrição**|
| :- | :- | :- | :- |
|<h5>**applicationId**</h5>|<h5>**Credentials**</h5>|**Sim**|Identificação do aplicativo que está solicitando a consulta.|
|<h5>**secretToken**</h5>|<h5>**Credentials**</h5>|**Sim**|Token de acesso do aplicativo que está solicitando a consulta.|
|<h5>**softwareVersion**</h5>|<h5>**String**</h5>|**Sim**|Versão da aplicação que está solicitando a consulta.|

***response***

|**Nome**|**Tipo**|**Descrição**|
| :- | :- | :- |
|<h5>**Value**</h5>|<h5>**BigDecimal**</h5>|Valor do pagamento. Este é o valor que foi aprovado pela adquirente. Deve ser validado sempre na resposta, ainda que tenha sido passado como parâmetro, pois há adquirentes que, para algumas situações, aprovam valores diferentes dos solicitados|
|<h5>**QRType**</h5>|<h5>**QRCodeIntentType**</h5>|Tipo de QR (venda, anulação, devolução).|
|<h5>**appTransactionId**</h5>|<h5>**String**</h5>|Identificador da transação integrada. O Identificador referido é o da aplicação que originou a solicitação de pagamento. Não deve se repetir.|
|<h5>**Date**</h5>|<h5>**String**</h5>|Data / hora do pagamento.|
|<h5>**qrId**</h5>|<h5>**String**</h5>|Identificador QRCode gerado pelo terminal de captura.|
##### **EXEMPLO**

|<p><h5>**import androidx.appcompat.app.AppCompatActivity;**</h5></p><p><h5>**import android.content.Intent;</h5><br>import android.database.Cursor;</h5><br>import android.os.Bundle;</h5><br>import android.util.Log;</h5><br>import android.view.View;</h5><br>import android.widget.Button;</h5><br>import android.widget.Toast;**</h5></p><p><h5>**import com.jakewharton.threetenabp.AndroidThreeTen;</h5><br>import java.math.BigDecimal;**</h5></p><p><h5>**import java.text.SimpleDateFormat;</h5><br>import java.util.Arrays;**</h5></p><p><h5>**import java.util.Date;</h5><br>import java.util.List;</h5><br>import java.util.TimeZone;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.ApplicationInfo;</h5><br>import br.com.phoebus.android.payments.api.Credentials;**</h5></p><p><h5>**import br.com.phoebus.android.payments.api.Payment;</h5><br>import br.com.phoebus.android.payments.api.PaymentClient;</h5><br>import br.com.phoebus.android.payments.api.PaymentStatus;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentContract;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;</h5><br>import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;**</h5></p><p><h5>**public class MainActivity extends AppCompatActivity implements View.OnClickListener {</h5><br>`    `Button bt\_start;</h5><br>`    `private PaymentClient paymentClient;</h5><br>`    `public static final String TEST\_APPLICATION\_ID = "0";</h5><br>`    `public static final String TEST\_SECRET\_TOKEN = "000000000000000000000000";</h5><br>`    `public static final String TAG = "TAG\_DEMO";**</h5></p><p><h5>`    `**@Override</h5><br>`    `protected void onCreate(Bundle savedInstanceState) {</h5><br>`        `super.onCreate(savedInstanceState);</h5><br>`        `setContentView(R.layout.activity\_main);</h5><br>`        `bt\_start = (Button) this.findViewById(R.id.button);</h5><br>`        `bt\_start.setOnClickListener(this);</h5><br>`        `paymentClient = new PaymentClient();</h5><br>`        `AndroidThreeTen.init(getApplication());</h5><br>`    `}**</h5></p><p><h5>`    `**@Override</h5><br>`    `public void onClick(View view) {</h5><br>`        `doExecute();</h5><br>`    `}**</h5></p><p><h5>`    `**public void doExecute() {</h5><br>`        `//definindo as credenciais</h5><br>`        `Credentials credentials = new Credentials();</h5><br>`        `credentials.setApplicationId(TEST\_APPLICATION\_ID);</h5><br>`        `credentials.setSecretToken(TEST\_SECRET\_TOKEN);**</h5></p><p><h5>`        `**ApplicationInfo applicationInfo = new ApplicationInfo();</h5><br>`        `applicationInfo.setCredentials(credentials);</h5><br>`        `applicationInfo.setSoftwareVersion("1.0");**</h5></p><p><h5>`        `**//criando objeto de request para o payment</h5><br>`        `QRCodePendenciesRequest request = createRequest(applicationInfo);</h5><br>`    `}**</h5></p><p><h5>`    `**private QRCodePendenciesRequest createRequest(ApplicationInfo appInfo) {</h5><br>`        `QRCodePendenciesRequest request = new QRCodePendenciesRequest();</h5><br>`        `request.setApplicationInfo(appInfo);</h5><br>`       `request.setSecretToken(appInfo.getCredentials());</h5><br>`        `request.setApplicationId(appInfo.getCredentials());</h5><br>`        `request.setSoftwareVersion(appInfo.getSoftwareVersion());</h5><br>`        `return request;</h5><br>`    `}</h5><br>}**</h5></p>|
| :- |
-----
# <a name="_toc173245910"></a>**Algoritmo recomendado para Aplicações integradas**
A aplicação de Pagamentos registra o status da transação que pode ser consultado posteriormente, para que o app que se integra via SDK tenha conhecimento do estado atual da transação e tome alguma ação, caso necessário.

Durante o fluxo transacional podem ocorrer falhas inesperadas, como o desligamento do terminal ou fechamento repentino da aplicação devido a algum erro não tratado. Isto pode gerar inconsistências na resolução da transação, sendo preciso que em alguns momentos o app que se integra via SDK realize algumas ações para resolver essa inconsistência.

O diagrama abaixo descreve o fluxo dos status da aplicação e em seguida são apresentadas sugestões de como corrigir possíveis erros.



Em situações de falha inesperada (fechamento da aplicação pelo operador do terminal, por exemplo, ou Fatal Exception), tanto na aplicação de Pagamentos quanto na aplicação que se integra via SDK, recomendamos adotar algumas estratégias para garantir que as pendências sejam resolvidas e as transações sejam processadas de forma consistente:

1\.      Imediatamente antes de chamar startPaymentV2() (ou outras funções do SDK), a aplicação deve registrar de forma persistente o horário atual e os dados que possui da transação a ser iniciada,

**appTransactionId**, bem como um status que indique que irá chamar startPaymentV2();

1\.      Imediatamente ao receber o callback (onSuccess ou onError), a aplicação deve registrar de forma persistente o horário atual, os dados retornados, e um status que indique que recebeu o callback;

2\.      Caso ocorra interrupção do fluxo em um pagamento, os métodos de callbacks (onSuccess ou onError) não serão chamados. a. A aplicação que chamou startPaymentV2() pode identificar este caso de duas formas: i. Quando a Aplicação iniciar sua execução, deve verificar se existir registro de chamada de startPaymentV2(), sem que tenha havido registro do callback correspondente. Nesse caso pode ter havido interrupção inesperada da própria aplicação, podendo ou não ter havido também interrupção inesperada de Payments;ii. Ao detectar um longo tempo (por exemplo, 10 minutos) após a chamada de startPaymentV2(), sem que tenha havido o callback. Nesse caso pode ter havido interrupção inesperada de Payments; b. Nesses casos,

**para transações de pagamento com cartão** o comportamento recomendado é o seguinte: i. Realizar uma consulta (Vide Consulta), passando o **appTransactionId** da transação;
ii. Caso o **paymentStatus** seja igual a CANCELLED, a transação foi desfeita por Payments e já está finalizada. A aplicação deve considerar que a transação não foi realizada. Não é necessária nenhuma ação para resolver pendências com Payments;
iii. Caso o **paymentStatus** seja igual a PENDING, a Aplicação deve solicitar desfazimento através do método cancelPayment(). Se a identificação da situação ocorreu da forma descrita em “i”, pode ser que Payments não tenha sido interrompida e ainda esteja executando o pagamento, por isso o App deve esperar pelo menos 10 minutos (desde o tempo registrado em “1”) antes de chamar cancelPayment();
iv. Caso o **paymentStatus** seja igual a UNREACHABLE ou PROCESSING, a transação foi interrompida antes mesmo de ser enviada ao autorizador. A aplicação deve considerar que a transação não foi realizada. Não é necessária nenhuma ação para resolver pendências com Payments; v. Caso o **paymentStatus** seja igual a DENIED, a transação foi negada. A aplicação deve considerar que a transação não foi realizada. Não é necessária nenhuma ação para resolver pendências com Payments; c. Nesses casos, **para transações de pagamento com QR** o comportamento recomendado é o seguinte: i. Chamar o método resolveQRCodePendencyV2(), passando o **appTransactionId** da intenção; ii. Caso o **qrCodeIntentStatus** seja igual a PENDING ou CREATED, o app deve continuar consultando (chamando resolveQRCodePendencyV2()) até receber um status final; iii. Caso o **qrCodeIntentStatus** seja igual a CANCELLED, EXPIRED ou DENIED, a aplicação deve considerar que a transação não foi realizada. Não é necessária nenhuma ação para resolver pendências com Payments; iv. Caso o **qrCodeIntentStatus** seja igual a APPROVED, a aplicação receberá os dados da transação e deverá processá-los. A aplicação deve considerar que a transação foi realizada. Não é necessária nenhuma ação para resolver pendências com Payments.



|**Responsável**|**Data:**|**Alterações**|
| :-: | :-: | :-: |
|Fabricio Camargo|26\.04.2024|Versão inicial|
|Ederson Silveira|03\.07.2024|Ajuste exemplos de uso do SDK|
|Ederson Silveira|30\.07.2024|Adicionada consulta transação via *merchantOrderId*|
| | | |
# <a name="_toc173245911"></a>Revisão

[(informação)]: Aspose.Words.c887f4b5-085c-45fe-8850-cdf33ec8ac16.015.png
