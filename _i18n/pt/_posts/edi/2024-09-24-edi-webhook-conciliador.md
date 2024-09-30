---
layout: manual
title: Webhooks -Cielo Conciliador
description: Instruções EDI
search: true
translated: false
toc_footers: true
categories: manual
sort_order: 10
tags:
  - 6. EDI Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# Integrações do Cielo Conciliador com outras plataformas via webhooks

Os **Webhooks** permitem o envio de notificações via HTTP em tempo real para o Cielo Conciliador, como, por exemplo, notificações para registrar vendas, entradas de cupons, entre outros. Isso elimina a necessidade de preenchimento manual de certas informações, bastando apenas a chamada do Webhook para inserção dos registros, trazendo agilidade ao processo de integração.

# Primeiros Passos

Inicialmente, você deve entrar em contato com o usuário da plataforma Cielo Conciliador e solicitar a URL para a qual as mensagens serão enviadas. Esse processo é importante para garantir a segurança e identificar corretamente cada parceiro.

Na prática, foi desenvolvido um único endpoint para todos os fornecedores de dados que desejam enviar informações via Webhook, onde será possível transmitir todas as informações necessárias. Por isso, as informações abaixo são de extrema importância.

# Como criar uma URL para envio de mensagens

1 - Entre na tela de Webservices do Cielo Conciliador.

2 - Clique no botão Criar localizado no canto inferior esquerdo da tela. 

3 - Selecione a opção de mensagens que deseja permitir o recebimento, atualmente temos a seguinte opção:
- Webhook F360 - PDV

4 - Clique no botão Salvar e aguarde a confirmação da plataforma. 

5 - Agora localize a webservice que você acabou de criar, na coluna 'Outros' encontra-se a URL para a qual seu fornecedor deverá enviar as mensagens via webhook.

# Modelo de endereço disponibilizado:

> webhook.exemplo.com.br/identificador-unico-do-servico/servico-consumido

- **"identificador-unico-do-servico"**: Um ID gerado por nós e enviado mediante solicitação da empresa fornecedora dos dados.
- **"servico-consumido"**: O endereço para o qual as requisições devem ser direcionadas.

# Consulta de Disponibilidade de Serviço

É possível consultar o status de todos os serviços disponíveis utilizando a URL abaixo:

> webhook.exemplo.com.br/IDENTIFICADOR-UNICO-DO-SERVICO/f360-cupom-fiscal

![](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/images/mceclip0.png)

# Criação de Cupons Fiscais - Webhook F360 (PDV)

A request deve ser enviada por meio de uma solicitação HTTP POST. É obrigatório que o corpo da requisição seja um **JSON válido** e contenha todos os dados que descrevem o cupom fiscal ou o período de vendas. Abaixo, detalharemos os campos obrigatórios e opcionais desse corpo.

## Exemplo de Requisição:

A request deve ser enviada por meio de uma solicitação HTTP POST. É obrigatório que o corpo da requisição seja um **JSON válido** e contenha todos os dados que descrevem o cupom fiscal ou o período de vendas. Abaixo, detalharemos os campos obrigatórios e opcionais desse corpo.

```curl
curl --location --request POST 'https://webhook.exemplo.com.br/identificador-unico-do-servico/f360-cupom-fiscal' \
--header 'Content-Type: application/json' \
--data-raw '{
    "NomeSistema": "Meu PDV",
    "Values": [
        {
            "NumeroCupom": "123456",
            "CNPJEmitente": "01234567000199",
            "Cliente": {
                "Nome": "João da Silva",
                "Cpf": "123.456.789-10"
            },
            "MeioPagamento": [
                {
                    "FormaPagamento": "Dinheiro",
                    "Valor": 71.12,
                    "Bandeira": "",
                    "Autorizacao": "",
                    "NSU": "",
                    "QtdParcelas": "1",
                    "Vencimento": "2022-05-26T15:08:26"
                }
            ],
            "Data": "2022-05-26T15:08:26"
        },
        {
            "NumeroCupom": "123457",
            "CNPJEmitente": "01234567000199",
            "Cliente": {
                "Nome": "Jorge da Silva",
                "Cpf": "456.807.789-10"
            },
            "MeioPagamento": [
                {
                    "FormaPagamento": "Cartao Parcelado",
                    "Valor": 38.40,
                    "Bandeira": "",
                    "Autorizacao": "A25V87",
                    "NSU": "123456",
                    "QtdParcelas": "2",
                    "Parcelas": [
                        {
                            "DataDeApresentacao": "2022-05-26",
                            "Valor": 19.2,
                            "NumeroDaParcela": "1",
                            "Vencimento": "2022-06-26"
                        },
                        {
                            "DataDeApresentacao": "2022-05-26",
                            "Valor": 19.2,
                            "NumeroDaParcela": "2",
                            "Vencimento": "2022-07-26"
                        }
                    ]
                },
                {
                    "FormaPagamento": "Cartao Debito",
                    "Valor": 21.50,
                    "Bandeira": "",
                    "Autorizacao": "",
                    "NSU": "789654",
                    "QtdParcelas": "1",
                    "Vencimento": "2022-05-27T15:08:26"
                }
            ],
            "Data": "2022-05-26T15:08:26",
            "VendaCancelada": true,
            "ValorFrete": 10.21
        }
    ]
}'
```

Por se tratar de uma requisição assíncrona, não retornamos o status da operação realizada no Cielo Conciliador. Logo, o processamento da informação enviada na requisição deve ser verificado na própria plataforma do Cielo Conciliador. Caso o sistema não localize a ‘CNPJEmitente’ cadastrado, o sistema irá descartar a mensagem.

**Atenção:** Apesar de aceitarmos mais de um cupom fiscal no mesmo corpo da request, é importante observar que o ‘CNPJEmitente’ e o dia das datas das vendas devem ser únicos dentro da mesma request. Já a informação da hora da venda (que complementa o campo ‘Data’) pode ser diferente dentre os cupons fiscais.

Lançamentos pertencentes ao mesmo cupom fiscal devem ser enviados em uma única request, para evitar que esses registros sejam interpretados como vendas duplicadas, o que resultaria na não inserção dessas vendas.

## Detalhamento dos campos

- **NumeroCupom (long):** Número do cupom da venda.

- **CNPJEmitente (string):** Número do CNPJ da loja cadastrado no Cielo Conciliador e deve ser apresentado sem traço e sem pontos.

- **Cliente (object):** Nesse campo devem ser informados Nome e CPF do cliente do cupom.

- **Data (string, formato: “yyyy-MM-ddTHH:mm:ss”):** Data em que a venda foi realizada.

- **VendaCancelada (bool):** O campo deve ser preenchido com um valor booleano (true/false) e, caso não seja preenchido, o valor será considerado como false. Se o valor for preenchido como true, então a venda será buscada no sistema e depois será cancelada. Se a venda não for encontrada, ela não será cancelada.

- **ValorFrete (double, '0.00'):** O campo é opcional e pode ser preenchido com o valor do frete relacionado à venda, para que esta informação possa ser usada no sistema.

- **MeioPagamento (array):** Nesse campo deve ser detalhado as diversas formas de pagamento do cupom fiscal, ele é um array que deve conter os campos abaixo.

    - **FormaPagamento (string):** Forma com que foi efetuado o pagamento.

    - **Valor (double, ‘0.00’):** Valor líquido pago naquela forma de pagamento; nas vendas em dinheiro, é comum ter troco, sendo o resultado depois do valor recebido menos o troco, descrito no campo acima.

    - **Bandeira (string):** Bandeira do cartão utilizado para pagamento, ver ‘Tabela 1’.

    - **Autorizacao (string):** Informação que comprova a autenticidade do pagamento e é gerada pela adquirente contratada do cliente.

    - **NSU (long):** Código de rastreio do pagamento, gerado pela adquirente contratada do cliente.

    - **QtdParcelas (int):** Quantidade de parcelas em que a forma de pagamento foi efetuada. Caso essa informação não esteja presente no arquivo, iremos considerar o valor de 1 parcela.

    - **Vencimento (string, formato: “yyyy-MM-ddTHH:mm:ss”):** Data de vencimento do pagamento.

- **Parcelas (array):** O campo não é obrigatório, mas é possível informar os detalhes de cada parcela separadamente, desde que as informações sejam consistentes. Caso o campo não seja preenchido, o parcelamento da venda será calculado automaticamente através do valor, vencimento e quantidade de parcelas informadas. Os campos do objeto de parcela são os seguintes:

    - **DataDeApresentacao (string, formato: “yyyy-MM-dd”):** Data de apresentação da parcela.

    - **Valor (double, ‘0.00’):** Valor da parcela.

    - **NumeroDaParcela (int):** Número da parcela.

    - **Vencimento (string, formato: “yyyy-MM-ddTHH:mm:ss”):** Data de vencimento da parcela.

**Campos marcados com * são campos obrigatórios, porém o envio das informações adicionais traz benefícios à conciliação e rastreabilidade dos cupons fiscais.**

# Criação de Títulos (Contas a pagar/receber) - (Webhook F360 - Títulos)

A request deve ser enviada por meio de solicitação HTTP POST e é obrigatório que o corpo da requisição seja um JSON válido, e contenha todos os dados que descrevem os títulos. Detalharemos mais à frente os campos obrigatórios e opcionais desse corpo.

Tanto contas a pagar quanto a receber são tratados como Títulos no sistema, então este webhook pode ser usado para envio de ambos.

Esta operação pode ser utilizada apenas para inserir novos registros. Não é possível realizar operação de "alteração" ou "exclusão" nesta integração.

Algumas informações cadastradas no sistema, como Plano de Contas e Centro de Custo, podem ser consultadas em nossa API pública, cada uma em seu respectivo endpoint, conforme descrito na documentação, disponível no link a seguir: [Visão geral do Cielo Conciliador](https://developercielo.github.io/manual/edi-cielo-conciliador).

Abaixo há um exemplo de requisição para o webhook de títulos. A URL contém campos que variam para cada cadastro do webhook, realizado na tela de webservice. Os campos variáveis estão envolvidos por `{}`. A URL completa é obtida na tela de webservices, após a criação do webservice deste webhook.

```curl
curl --location 'https://webhook.exemplo.com.br/{identificador-unico-do-servico}/f360-{id}-titulos/' \
--header 'Content-Type: application/json' \
--data '{
    "titulos": [
        {
            "cnpj": "00.000.000/0000-00",
            "tipoTitulo": "receber",
            "numeroTitulo": "123456",
            "clienteFornecedor": "João da Silva",
            "emissao": "2023-02-14",
            "valor": 150,
            "tipoDocumento": "boleto",
            "contaBancaria": "nome da conta bancária",
            "meioPagamento": "boleto",
            "historico": "",
            "remessaCnab": false,
            "receitaDeCaixa": false,
            "parcelas": [{
                "vencimento": "2023-03-14",
                "valor": 150,
                "numeroParcela": 1,
                "liquidacao": null,
                "codigoDeBarras": null
            }],
            "rateio": [{
                "competencia": "03-2022",
                "centroDeCusto": "centro de custo",
                "planoDeContas": "vendas de mercadorias",
                "numeroParcela": 1,
                "valor": 150
            }]
        }
    ]
}'
```

## Detalhamento dos campos

Campos marcados com (*) são de preenchimento obrigatório e caso não sejam preenchidos o registro será ignorado.

### Objeto Titulo

- **cnpj** (string): Deve ser preenchido com o CNPJ da empresa.

- **tipoTitulo** (string): Deve ser preenchido com uma das seguintes opções:
  - Pagar
  - Receber

- **numeroTitulo** (string): Deve ser preenchido com o número do título.

- **clienteFornecedor** (string): Deve ser preenchido com o CPF/CNPJ ou nome do fornecedor em contas a pagar, ou cliente em contas a receber. Caso a pessoa não exista no sistema, ela será criada.

- **emissao** (string, formato “yyyy-MM-dd”): Deve ser preenchido com a data de emissão do título.

- **valor** (double, formato “0.00”): Deve ser preenchido com o valor total do título.

- **tipoDocumento** (string): Deve ser preenchido com uma das opções abaixo:
  - Duplicata
  - Boleto
  - Nota Fiscal
  - Nota De Débito
  - Conta De Consumo
  - Cupom Fiscal
  - Outros
  - Previsão

- **contaBancaria** (string): Deve ser preenchido com o nome de uma conta bancária já cadastrada no sistema.

- **meioPagamento** (string): Deve ser preenchido com uma das opções abaixo:
  - Boleto
  - Dinheiro
  - Cheque
  - DDA
  - DOC/TED
  - Depósito em Conta
  - Transferência Bancária
  - Débito Automático
  - Cartão de Crédito / Débito
  - Outros

- **historico** (string): Esta informação é opcional, e se trata de uma descrição que pode ser adicionada ao título.

- **remessaCnab** (boolean): Este campo é opcional e está relacionado com a origem do título, podendo ser da importação comum de títulos (false) ou gerado pelo CNAB (true). Caso não seja preenchido no body, o valor do campo será false.

- **receitaDeCaixa** (boolean): Este campo é opcional e está relacionado ao título ser mostrado ou não na tela de fechamento de caixa. Caso não seja preenchido no body, o valor do campo será false.

- **parcelas** (array de objetos): Deve ser preenchido com os detalhes de cada parcela do título, no formato do “Objeto Parcela” descrito neste artigo. Qualquer título, mesmo que não seja parcelado, terá pelo menos uma parcela, com número “1”, para que seja informado o vencimento, e a possível liquidação.

- **rateios** (array de objetos): Deve ser preenchido com os detalhes do rateio do título, no formato “Objeto Rateio” descrito neste artigo. Qualquer título, mesmo que não seja rateado, terá

### Objeto Parcela

- **vencimento** (string, formato “yyyy-MM-dd”): Deve ser preenchido com a data de vencimento da parcela.

- **valor** (double, formato “0.00”): Deve ser preenchido com o valor da parcela.

- **numeroParcela** (short): Deve ser preenchido com o número da parcela.

- **liquidacao** (string, formato “yyyy-MM-dd”): O campo é opcional. Caso não seja preenchido, a parcela será considerada como não liquidada, mas caso seja preenchido, a parcela será liquidada, com a data informada.

- **codigoDeBarras** (string): O campo é opcional.

### Objeto Rateio

- **competencia** (string, formato “MM-dd”): Deve ser preenchido com a data de competência deste rateio.

- **centroDeCusto** (string): Deve ser preenchido com o nome do centro de custo cadastrado no sistema, que será relacionado ao rateio. Caso o campo não seja preenchido, será utilizado o centro de custo padrão. Os centros de custo disponíveis podem ser obtidos na API pública, no seguinte endpoint da documentação: [Visão geral do Cielo Conciliador](https://developercielo.github.io/manual/edi-cielo-conciliador).

- **planoDeContas** (string): Deve ser preenchido com um plano de contas cadastrado no sistema, que será relacionado ao rateio. Os planos de contas disponíveis podem ser obtidos na API pública, no seguinte endpoint da documentação: [Visão geral do Cielo Conciliador](https://developercielo.github.io/manual/edi-cielo-conciliador).

- **numeroParcela** (short): Deve ser preenchido com o número da parcela à qual este rateio faz referência.

- **valor** (double, formato “0.00”): Deve ser preenchido com o valor do rateio.

# Regras de Leitura

- Todo título deve ter pelo menos uma parcela e um rateio.
- O rateio deve corresponder a uma parcela que foi preenchida.
- A soma do valor das parcelas deve corresponder ao valor do título.
- A soma dos valores dos rateios da mesma parcela deve corresponder ao valor da parcela.

# Resposta

Caso o envio seja bem-sucedido, o status HTTP 200 será retornado com um ID de rastreio do evento. Este ID poderá ser utilizado para consultar o status do processamento da mensagem. Porém, caso algum problema ocorra ao recebermos a mensagem, o status HTTP 500 será retornado.

## Exemplo HTTP 200

```json
{
    "rastreioId": "5737a24e-8eef-4090-9c8d-6c168af2c8a4"
}
```

## Exemplo HTTP 500

```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
    "title": "An error occurred while processing your request.",
    "status": 500,
    "traceId": "00-92255f294a1a8995227eac28b180a0a7-91d42cfdc65d5e99-00"
}
```

# Tabela 1 - Bandeiras de Cartão

- 99 Food
- Cabal
- Garantido ABC
- Abastece Aí
- Cabal Alimentação
- Gift Card
- Acqio
- CalCard
- Goias Card
- Adiq
- Card System
- Golden Farma
- Adyen
- Cartao
- Good Card Plus
- Agiplan
- Cartão Confiança
- Goodcard
- Alelo
- Cartão SupCard
- Grand Card
- Alelo Alimentação
- Chefmio
- Granito
- Alelo Cultura
- Chilli Match
- GreenCard
- Alelo Refeição
- Cispay
- Hiper
- Ame Digital
- CompreMax
- Hipercard
- Amex
- Compro Card
- IBI Card
- ASCIPAM
- Convenios Card
- IdealCard
- Asu
- CooperCred
- IFood
- Aura
- CornershopApp
- JamesDelivery
- Avancard
- CrediShop
- JCB
- BandCard
- CredNosso
- King Pay
- Banescard
- Crednova
- Kredit
- Banese Card
- CredPar
- Lagoacred
- Banpara
- Credshop
- Libercard
- Banquet
- CredSystem
- Linx Pay
- Banri Card
- Credz
- Linx S.A.
- BanriCompras
- Cros Card
- Losango
- Banrisul
- DaCasa
- Maestro
- Banrisul Cultura
- Delivery Center
- Magalu
- Barra Cred
- Delivery Direto
- Mais
- BCard
- Diners
- MasterCard
- Ben Visa Vale
- Dinheiro
- Masterfarma
- BigCard
- Discovery
- Maxxivan
- Blu
- ECX Card
- Mercado Pago
- BNBClube
- Electron
- Money Plus
- Bônus CBA
- Elo
- Mooz Boleto
- Bônus Cred
- Esplanada
- Mooz Omnichannel
- Borba Net
- Expers
- Mooz Omnichannel Boleto
- BR Card
- Fininvest
- Moreira Card
- Bradesco
- FitCard - Prime
- Movile Pay
- Brasil Card (.net)
- FitCard Link Benefícios
- MultMais Card
- BrasilCard
- FitCard Neo Benefícios
- NutriCash
- Braspag
- Flexocard
- Nutricash Cultura
- Braspag Boleto
- FortBrasil
- Omni
- C6 Pay
- Fortcard
- Pagar Me
- PagarMe - Track&Field
- Sindcred
- ValeMulti
- PagarMe Boleto
- Sipag
- Valorem Pay
- PagoLivre
- Sodexo
- Vegas Card
- Pagseguro Boleto
- Sodexo Alimentação
- VerdeCard
- PagueLogo
- Sodexo Combustível
- Verocard
- Pão de Açúcar
- Sodexo Cultura
- VeroCheque
- Payly
- Sodexo Gift
- Vinhecard
- PayPal
- Sodexo Premium
- Visa
- Personal Card
- Sodexo Refeição
- Visa Electron
- Picpay
- Softcred
- Visa Vale
- PitCard
- Solucard
- VR
- PIX
- SoroCred
- VR Alimentação
- PlanVale
- Stone
- VR Auto
- PlanVale Alimentação
- Sysdata
- VR Cultura
- PlanVale Combustível
- SysproCard
- VR Refeição
- PlanVale Cultura
- System Farma
- Vuon Card
- PlanVale Farmácia
- Tecard
- Westwing
- PlanVale Refeição
- TerCRED
- Wirecard
- PoliCard
- Ticket
- Wizeo
- Policard
- Ticket Alimentação
- Zoop - Opatech
- Quero2Pay
- Ticket Cultura
- Rappi
- Ticket Parceiro
- Rappi App Varejo
- Ticket Refeição
- Redconv
- Ticket Restaurante
- RedeMed
- TKS (Global Payments)
- RedeShop
- ToNoLucro
- Regicred
- Tricard Mais
- Repom
- Uber Eats
- Repom Abastecimento
- Unica
- Repom Saque
- UnionPay
- Resgate Fácil
- Up Brasil
- SafraDigital
- USA Card
- Sapore
- Usecred
- Sem Parar
- UVE
- Senff
- Vale Fácil
- Sertão Card
- Vale Mais
- Shippi Delivery
- ValeCard
- Sicredi
- ValeCard Cultura
- SideCard
- ValeConcard
- Sin Card
- ValeFrota
