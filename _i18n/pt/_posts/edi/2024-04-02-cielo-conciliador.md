---
layout: manual
title: EDI - Cielo Conciliador
description: Instruções EDI
search: true
translated: false
toc_footers: true
categories: manual
sort_order: 1
tags:
  - 6. EDI Cielo
language_tabs:
  json: JSON
  shell: cURL
---

# F360 Finanças

Essa documentação contém todas as API's públicas disponíveis pela plataforma da F360. A URL de produção para todos os endpoints é https://financas.f360.com.br﻿

# 1 - Login

O token é dispobinilizado pela plataforma da F360 ao criar um webservice de API Pública. Segue o link de como criar um token de autenticação na API:

https://f360.zendesk.com/hc/pt-br/articles/360062098714

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PublicLoginAPI/DoLogin</aside>

Body

```json
{ "token": "{{token\_login}}" }
```

Request



```shell
curl --location --globoff '{{URL}}/PublicLoginAPI/DoLogin' \
--header 'Content-Type: application/json' \
--data '{ "token": "{{token\_login}}" }'
```

Response

```json
{

"Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGEwOTEzNDI2Mjk1MzBlZDAyNGU1M2IiLCJjdXN0b21lcklkIjoiNWRhMDg5MzEyNjI5NTMwZWQwMjQ5MDE3Iiwid2Vic2VydmljZUlkIjoiNjBkYjE2MjA4OWQ1OWUwYWVjNWQxYWYxIiwiZW1haWwiOiI0MzRkODUwZC04NzI3LTQwOGEtOTE4OC0xYTQ4Mjk5MGQ0MWZAd2Vic2VydmljZS5jb20iLCJhY2Vzc29Ub3RhbCI6IlRydWUiLCJyb2xlcyI6IiIsIm5iZiI6MTYyNDk3MzMxMywiZXhwIjoxNjI0OTc2OTEzLCJpYXQiOjE2MjQ5NzMzMTN9.8PmneW6TSqEcSdZdr-HF6LR79DbSYNs43jZlyBfmC9M"
}
```

# 2 - Relatórios

Aqui você irá encontrar todos os endpoints disponíveis relacionados a download de relatórios da F360.

## Gerar Relatório para Contabilidade

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PublicRelatorioAPI/GerarRelatorio</span></aside>

Esse método irá gerar um relatório para a contabilidade com base nas informações do módulo F360 Finanças. Os campos obrigatórios estão em negrito:

**Data:** "yyyy-MM-dd"

**ModeloContabil:** "provisao" ou "obrigacao". No modelo de "provisao", iremos exportar os lançamentos pela data de emissão do registro. Já no modelo de "obrigacao", iremos exportar pela data de pagamento.

**ModeloRelatorio:** "tradicional" ou "gerencial". O modelo "tradicional" não virá com o rateio de centros de custos, ou seja, iremos considerar apenas o CNPJ da emissão das despesas/receitas. Já no "gerencial", iremos quebrar os lançamentos pelos centros de custos gerenciais que foram informados na plataforma.

**ExtensaoDeArquivo:** "json" ou "csv".

**DataFim:** "yyyy-MM-dd".

**CNPJEmpresas:** Informar a lista de CNPJ's para a criação do relatório. Caso vazio ou nulo, o relatório irá conter as movimentações de todas as lojas.

**EnviarNotificacaoPorWebbook:** "true" ou "false".

**URLNotificaticao:** Informar a URL que deseja ser notificado após o termino da criação do relatório. Isso é importante pois o processamento do relatório é feito em background em uma fila de mensagens. Quando você informa a URL de notificação, iremos encaminhar para você um aviso assim que o relatório terminar de ser processado e estiver pronto para download.

**Contas:** Números externo das contas em que serão filtradas para a geração do relatório.

Exemplo de notificação do webhook:

https://drive.google.com/file/d/1W709XgD8ZrK4HR3ugf_KtO46wZOAmCEt/view?usp=sharing

Exemplo de arquivo contábil no formato JSON:

https://drive.google.com/file/d/1US40NyNOnEGuznTb0uAgBn4ak7oBkUeo/view?usp=sharing

Exemplo de arquivo contábil no formato CSV:

https://drive.google.com/file/d/1SLCd2_E_7WMwhy3YziCVRpiPTl2YhxsC/view?usp=sharing

Authorization Bearer {{token_jwt}}

```json
{
"Data": "2021-01-01",
"DataFim": "2021-01-17",
"ModeloContabil": "provisao",
"ModeloRelatorio": "gerencial",
"ExtensaoDeArquivo": "json",
"EnviarNotificacaoPorWebhook": false,
"URLNotificacao": "",
"Contas": "\*\*\*\*,\*\*\*\*,\*\*\*\*",
"CNPJEmpresas": []
}
```

Request

```shell
curl --location --globoff '{{URL}}/PublicRelatorioAPI/GerarRelatorio' \
--header 'Content-Type: application/json' \
--data '{
"Data": "2021-01-01",
"DataFim": "2021-01-15",
"ModeloContabil": "provisao",
"ModeloRelatorio": "gerencial",
"ExtensaoDeArquivo": "json",
"EnviarNotificacaoPorWebhook": false,
"URLNotificaticao": "",
"Contas": "\*\*\*\*,\*\*\*\*,\*\*\*\*",
"CNPJEmpresas": []
}'
```

Response

```json
{
"Result": "60db204089d59e0aec5d8756",
"Ok": true
}
```

## Gerar Relatório de Conciliacao de Cartoes

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PublicRelatorioAPI/GerarRelatorioDeConciliacaoDeCartoes</span></aside>

Esse método irá gerar um relatório dos cartões conciliados a partir dos filtros escolhidos e com base nas informações do módulo F360 Finanças. Os campos obrigatórios estão em negrito:

**DataInicio:** "yyyy-MM-dd";

**DataFim:** "yyyy-MM-dd";

**CNPJEmpresas:** Informar a lista de CNPJ's para a criação do relatório. Caso vazio ou nulo, o relatório irá conter as movimentações de todas as lojas;

**EnviarNotificacaoPorWebbook:** "true" ou "false";

**URLNotificaticao:** Informar a URL que deseja ser notificado após o término da criação do relatório. Isso é importante pois o processamento do relatório é feito em background em uma fila de mensagens. Quando você informa a URL de notificação, iremos encaminhar para você um aviso assim que o relatório terminar de ser processado e estiver pronto para download;

**TipoConciliacao:**

“0” ou “Todos”;

“1” ou “Automatica”;

“2” ou “ManualTodos”;

“3” ou “ManualComJustificativa”;

“4” ou “ManualSemJustificativa”.

Caso esse campo não seja informado, por padrão será selecionado “Todos”. Sempre informar, o valor no formato string ("0").

Obs. A DataInicio e DataFim possuem um

limite de 90 dias para gerar o relatório.

Exemplo de notificação do webhook: https://drive.google.com/file/d/17dUuyMmcIDXeC58GDUNzv89-s2n3KJAJ/view?usp=sharing

Exemplo de arquivo contábil no formato JSON:  https://drive.google.com/file/d/1sookaW6V1bopgPGl8mABL3w970VbslOT/view?usp=sharing

```json
{
"DataInicio": "2021-11-08",
"DataFim": "2021-11-08",
"TipoConciliacao": "Todos",
"EnviarNotificacaoPorWebhook": false,
"URLNotificacao": "",
"CNPJEmpresas": []
}
```json

Request

```shell
curl --location --globoff '{{URL}}/PublicRelatorioAPI/GerarRelatorioDeConciliacaoDeCartoes' \
--header 'Content-Type: application/json' \
--data '{
"DataInicio": "2021-11-08",
"DataFim": "2021-11-08",
"TipoConciliacao": "Todos",
"EnviarNotificacaoPorWebhook": false,
"URLNotificaticao": "",
"CNPJEmpresas": []
}'
```

Response

```json
{
"Result": "60db204089d59e0aec5d8756",
"Ok": true
}

## Obter Relatório

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PublicRelatorioAPI/Download?id=60db204089d59e0aec5d8756</span></aside>

Este método irá retornar o relatório que foi gerado no endpoint anterior. Lembre-se que a geração do relatório é feito por meio de uma fila de mensagens, ou seja, o processo é feito em background.

Evite fazer polling neste método para saber se o seu relatório foi concluído com sucesso ou não. O melhor cenário é que você configure uma URL de notificação ao gerar o relatório, dessa forma você será notificado assim que terminarmos o processamento.

Authorization Bearer {{token_jwt}}

```shell
curl --location -g '{{URL}}/PublicRelatorioAPI/Download?id=60db204089d59e0aec5d8756' \
--header 'Content-Type: application/json' \
--data ''
```

## Gerar Relatório de Transferencias Entre Contas

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PublicRelatorioAPI/GerarRelatorioTransferenciasEntreContas</span></aside>

Esse método irá gerar um relatório contendo informações das Transferências entre Contas a partir dos filtros escolhidos e com base nas informações do módulo F360 Finanças.

Os campos obrigatórios estão em negrito:

**Mes:** "yyyy-MM";

**ContasOrigem:** Informar a Lista de Contas de Origem para a criação do relatório em forma de Array. Caso o campo não seja enviado, iremos considerar todas as Contas;

**EnviarNotificacaoPorWebbook:** "true" ou "false";

**URLNotificaticao:** Informar a URL que deseja ser notificado após o término da criação do relatório. Isso é importante pois o processamento do relatório é feito em background em uma fila de mensagens. Quando você informa a URL de notificação, iremos encaminhar para você um aviso assim que o relatório terminar de ser processado e estiver pronto para download.

```json
{
"Mes": "2022-02",
"ContasOrigem": [
"nome-conta-1",
"nome-conta-2"
],
"EnviarNotificacaoPorWebhook": false,
"URLNotificacao": ""
}
```

Authorization Bearer {{token_jwt}}

Request

```shell
curl --location --globoff '{{URL}}/PublicRelatorioAPI/GerarRelatorioTransferenciasEntreContas' \
--data '{
"Mes": "2022-02",
"ContasOrigem": [
"nome-conta-1",
"nome-conta-2"
],
"EnviarNotificacaoPorWebhook": false,
"URLNotificacao": ""
}'
```

Response

```json
{
"Result": "60db204089d59e0aec5d8756",
"Ok": true
}
```

# 3 - Planos de Contas

Os planos de contas são as classificações contábeis das despesas e receitas dentro da plataforma da F360. O objetivo desses endpoint é permitir que algumas dessas classificações possam ser feitas por meio de API.

## Listar Planos de Contas

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PlanoDeContasPublicAPI/ListarPlanosContas</span></aside>

Este método irá listar todos os planos de contas disponíveis e as suas classificações contábeis. É importante chamar esse método, pois é por meio dele que você conseguirá obter o identificador dos planos de contas que são necessários para a realização das classificações desejadas.

Authorization Bearer {{token_jwt}}

Request

```shell
curl --location --globoff '{{URL}}/PlanoDeContasPublicAPI/ListarPlanosContas' \
--header 'Content-Type: application/json' \
--data ''
```json

Response

```json
{
"Result": [
{
"PlanoDeContasId": "5da089312629530ed0249022",
"Nome": "Ajustes a Crédito de Cartão",
"Tipo": "A receber"
},
{
"PlanoDeContasId": "5da089312629530ed0249023",
"Nome": "Ajustes a Débito de Cartão",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed024901b",
"Nome": "Aluguel de POS / Outras Taxas",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed024901f",
"Nome": "Descontos sobre Despesas",
"Tipo": "A receber"
},
{
"PlanoDeContasId": "5da089312629530ed024901c",
"Nome": "Descontos sobre Receitas",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed0249024",
"Nome": "Falta de Caixa",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed0249020",
"Nome": "Juros sobre Despesas",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed024901d",
"Nome": "Juros sobre Receitas",
"Tipo": "A receber"
},
{
"PlanoDeContasId": "5da089312629530ed0249021",
"Nome": "Multa sobre Despesas",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed024901e",
"Nome": "Multa sobre Receitas",
"Tipo": "A receber"
},
{
"PlanoDeContasId": "5da089312629530ed0249025",
"Nome": "Sobra de Caixa",
"Tipo": "A receber"
},
{
"PlanoDeContasId": "5da089312629530ed0249019",
"Nome": "Taxa Administrativa de Cartões",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed024901a",
"Nome": "Taxa de Antecipação de Cartões de Crédito",
"Tipo": "A pagar"
},
{
"PlanoDeContasId": "5da089312629530ed0249018",
"Nome": "Vendas de Mercadorias",
"Tipo": "A receber"
}
],
"Ok": true
}
```

## Obter Plano De Contas

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PlanoDeContasPublicAPI/ObterPlanoDeContas/5da089312629530ed0249022</span></aside>

Este método irá obter um Plano de Contas existente do módulo F360 Finanças. É obrigatório informar o Id do Plano de Contas.

Authorization Bearer {{token_jwt}}

Request

```shell
curl --location --globoff '{{URL}}/PlanoDeContasPublicAPI/ObterPlanoDeContas/5da089312629530ed0249022' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": {
"PlanoDeContasId": "5da089312629530ed0249022",
"Nome": "Ajustes a Crédito de Cartão",
"Tipo": "A receber"
},
"Ok": true
}
```

## Listar classificações de produtos

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PlanoDeContasPublicAPI/ListarClassificacaoProdutos</span></aside>

Este método irá listar todas as classificações de produtos disponíveis. Essas classificações são importantes para que o sistema faça o lançamento automático do rateio de plano de contas das despesas provindas de Nota Fiscal de Mercadorias.

Dentro do módulo F360 Finanças, a classificação de uma despesa de Nota Fiscal de Mercadorias é feita da seguinte forma:

Por padrão, utilizamos uma combinação de NCM e CFOP para definir qual o plano de contas que deve ser utilizado. Dessa forma, se na nota fiscal existem 10 produtos no mesmo NCM e CFOP, iremos sugerir a classificação contábil de todos esses produtos para o plano de contas que foi selecionado na parametrização desse NCM e CFOP.

Porém, existem situações onde devemos fazer uma classificação fiscal por código do produto, pois existem casos onde alguns produtos presentes no mesmo NCM e CFOP possuem classificações de planos de contas diferentes. Para essas situações, o sistema irá precisar que seja informado o código do produto, o fornecedor e a identificação do plano de contas.

Authorization Bearer {{token_jwt}}

Request

```shell
curl --location --globoff '{{URL}}/PlanoDeContasPublicAPI/ListarClassificacaoProdutos' \
--header 'Content-Type: application/json' \
--data ''
```

Response

```json
{
"Result": [
{
"NCM": 45154544,
"CFOP": 1234,
"PlanoDeContasId": "5da089312629530ed024901b"
},
{
"NCM": 54546845,
"CFOP": 2154,
"PlanoDeContasId": "5da089312629530ed0249024"
}
],
"Ok": true
}
```

## Adicionar/Editar classificações contábeis no plano de contas

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PlanoDeContasPublicAPI/AdicionarClassificacaoContabeisNoPlanoDeContas</span></aside>

Este método deve ser usado para efetuar as classificações dos planos de contas.

**PlanoDeContasId:** Identificador do plano de contas

**CodigoProvisaoContabil:** Código da provisão contábil do plano de contas

**CodigoObrigacaoContabil:** Código da obrigação contábil do plano de contas

**CodigosPorFornecedor:** Essa é uma lista de códigos de provisão e obrigação contábil quebrada por fornecedor. Dessa forma, caso esse plano de contas tenha algum código de provisão e/ou obrigação que seja diferente para cada fornecedor, essa lista deverá ser preenchida. O sistema sempre dará preferencia em usar essa lista de códigos por fornecedor, onde iremos cruzar o CNPJ do fornecedor da despesa com o CNPJ do fornecedor cadastrado nessa lista. Se existir essa parametrização, ela será prioritária para o sistema. Caso essa parametrização não exista, iremos utilizar os códigos de provisão e obrigação informados na raiz do plano de contas.

```json
{
"PlanoDeContasId": "53f37f16418ada0af08c2220",
"CodigoProvisaoContabil": "4189",
"CodigoObrigacaoContabil": "4456",
"CodigosPorFornecedor": [
{
"CodigoObrigacaoContabil": "544",
"CodigoProvisaoContabil": "4",
"Inscricao": "06.147.451/0025-00"
}
]
}
```

## Adicionar classificações de NCM / CFOP

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PlanoDeContasPublicAPI/AdicionarClassificacaoPorNCM_CFOP</span></aside>

Esse é o endpoint para que seja feita a classificação por NCM e CFOP.

**NCM:** Código do NCM

**CFOP:** Código do CFOP

**PlanoDeContasId:** Identificador do plano de contas que deseja vincular com essa combinação de NCM e CFOP. Caso não seja informado o plano de contas, iremos deixar essa combinação sem nenhum vinculo.

**RemoverClassificacaoPorProduto:** Dentro de uma combinação de NCM e CFOP, existe uma lista de classificação por código de produto. Caso você deseje remover todos os itens dessa lista, basta colocar "true" nessa opção. Caso contrário, o padrão é sempre "false".

Authorization Bearer {{token_jwt}}

```json
{
"NCM": 95030031,
"CFOP": 6102,
"PlanoDeContasId": "53f37f16418ada0af08c2220",
"RemoverClassificacaoPorProduto": false
}
```

## Adicionar classificações de produtos

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PlanoDeContasPublicAPI/AdicionarClassificacaoPorProdutos</span></aside>

Neste endpoint é possível adicionar uma classificação de plano de contas especifica para cada código de produto.

**CodigoProduto:** Informe o código do produto

**InscricaoFornecedor:** Informe o número do CNPJ do fornecedor

**PlanoDeContasId:** Identificador do plano de contas que deseja vincular para esse código de produto. Caso não seja informado o plano de contas, iremos remover a classificação desse código de produto

**NCM:** Informe o NCM desse código de produto caso você tenha essa informação

**CFOP:** Informe o CFOP desse código de produto caso você tenha essa informação

Authorization Bearer {{token_jwt}}

```json
{
"CodigoProduto": "10300",
"InscricaoFornecedor": "06.147.451/0025-00",
"PlanoDeContasId": "53f37f16418ada0af08c2220",
"NCM": "",
"CFOP": ""
}
```

## Criar Plano De Contas

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PlanoDeContasPublicAPI/CriarPlanoDeContas</span></aside>

Este método irá criar um novo Plano de Contas do módulo F360 Finanças. Os campos obrigatórios estão em negrito:

**Nome:** "Nome do plano de contas"

**Tipo:** "No qual é possível colocar para A receber ou A pagar"

Authorization Bearer {{token_jwt}}

```json
{
"Nome": "Teste",
"CodigoObrigacaoContabil": "252",
"CodigoProvisaoContabil": "111",
"FolhasAssociadas": [
{
"SistemaUtilizado": 3,
"Codigo": "3659"
}
],
"Tipo": "A receber",
"CodigosPorFornecedor": [
{
"CodigoObrigacaoContabil": "111",
"CodigoProvisaoContabil": "333",
"Inscricao": "00.000.000/0000-00"
}
]
}
```

## Excluir Plano De Contas

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/PlanoDeContasPublicAPI/ExcluirPlanoDeContas/60b6539d243c1419b084b181</span></aside>

Este método irá excluir um Plano de Contas do módulo F360 Finanças. É obrigatório informar o Id do Plano de Contas.

Authorization Bearer {{token_jwt}}

```shell
curl --location -g --request DELETE '{{URL}}/PlanoDeContasPublicAPI/ExcluirPlanoDeContas/60b6539d243c1419b084b181' \
--header 'Content-Type: application/json'
```

## Editar Plano De Contas

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/PlanoDeContasPublicAPI/EditarPlanoDeContas/60b6539d243c1419b084b181</span></aside>

Este método irá editar um Plano de Contas existente do módulo F360 Finanças. É obrigatório informar o Id do Plano de Contas.

Authorization Bearer {{token_jwt}}

```json
{
"Nome": "Teste",
"CodigoObrigacaoContabil": "252",
"CodigoProvisaoContabil": "111",
"FolhasAssociadas": [
{
"SistemaUtilizado": 3,
"Codigo": "3659"
}
],
"Tipo": "A receber",
"CodigosPorFornecedor": [
{
"CodigoObrigacaoContabil": "111",
"CodigoProvisaoContabil": "333",
"Inscricao": "00.000.000/0000-00"
}
]
}
```

# 4- Pessoas

Aqui poderá ter acesso aos endpoints disponíveis para a área de Clientes e Fornecedores da F360.

## Listar Pessoas

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PessoasPublicAPI/ListarPessoas?pagina=1&definicao=ambos</span></aside>

Aqui poderá ter acesso aos endpoints disponíveis para a área de Clientes e Fornecedores da F360. É opcional informar um CPF ou CNPJ, para buscar uma pessoa por este parâmetro.

Authorization Bearer {{token_jwt}}

**Query Params**

pagina=1

definicao=ambos

cpfCnpj= (opcional) um CPF ou CNPJ que pode ser formatado com ou sem os caracteres '.' , '/' e '-'

Request

```shell
curl --location --globoff '{{URL}}/PessoasPublicAPI/ListarPessoas?pagina=1&definicao=ambos' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": {
"QuantidadeDePessoas": 4,
"Pagina": 1,
"QuantidadeDePaginas": 1,
"Pessoas": [
{
"Id": "60a51476a413311798b4a27e",
"Nome": "DIRECAO GERAL",
"RazaoSocial": "BANCO DO BRASIL SA",
"Telefone": "(61) 3493-9002",
"Email": "teste@teste.com.br",
"CodigoExterno": "",
"PlanoDeContaPadrao": "Ajustes a Débito de Cartão",
"Tipo": "Pessoa Jurídica",
"Definicao": "Fornecedor",
"CpfCnpj": "00.000.000/0001-91",
"Endereco": {
"Logradouro": "SAUN Quadra 5 Lote B Torres I",
"Complemento": "ANDAR 1 A 16 SALA 101 A 1601 ANDAR 1 A 16 SALA 101 A 1601 ANDAR 1 A 16 SALA 101 A 1601",
"Numero": "SN",
"Bairro": "SN",
"Cidade": "Brasília",
"UF": "DF",
"CEP": "70040-912"
},
"IndicadorIE": "ContribuinteICMS",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
},
{
"Id": "5f9ab4159134b21b2ca5bf90",
"Nome": "teste",
"RazaoSocial": "",
"Telefone": "teste",
"Email": "teste@tste.com.br",
"CodigoExterno": "",
"PlanoDeContaPadrao": "Ajustes a Crédito de Cartão",
"Tipo": "Pessoa física",
"Definicao": "Ambos",
"CpfCnpj": "230.633.778-05",
"Endereco": {
"Logradouro": "",
"Complemento": "",
"Numero": "",
"Bairro": "",
"CEP": ""
},
"IndicadorIE": "ContribuinteICMS",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
},
{
"Id": "5da089312629530ed0249027",
"Nome": "VENDAS CHEQUE",
"RazaoSocial": "",
"Telefone": "",
"Email": "",
"CodigoExterno": "",
"PlanoDeContaPadrao": "Vendas de Mercadorias",
"Tipo": "Pessoa física",
"Definicao": "Ambos",
"IndicadorIE": "ContribuinteICMS",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
},
{
"Id": "5da089312629530ed0249026",
"Nome": "VENDAS DINHEIRO",
"RazaoSocial": "",
"Telefone": "",
"Email": "",
"CodigoExterno": "",
"PlanoDeContaPadrao": "Vendas de Mercadorias",
"Tipo": "Pessoa física",
"Definicao": "Ambos",
"IndicadorIE": "ContribuinteICMS",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
}
]
},
"Ok": true
}
```

## Obter Pessoa

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/PessoasPublicAPI/ObterPessoa/60a51476a413311798b4a27e</span></aside>

Neste endpoint poderá ter acesso aos dados de uma Pessoa cadastrada em sua conta da F360. É obrigatório informar o Id da Pessoa.

Authorization Bearer {{token\_jwt}}

Request

```shell
curl --location --globoff '{{URL}}/PessoasPublicAPI/ObterPessoa/60a51476a413311798b4a27e' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": {
"Id": "60a51476a413311798b4a27e",
"Nome": "DIRECAO GERAL",
"RazaoSocial": "BANCO DO BRASIL SA",
"Telefone": "(61) 3493-9002",
"Email": "teste@teste.com.br",
"CodigoExterno": "",
"PlanoDeContaPadrao": "Ajustes a Débito de Cartão",
"Tipo": "Pessoa Jurídica",
"Definicao": "Fornecedor",
"CpfCnpj": "00.000.000/0001-91",
"Endereco": {
"Logradouro": "SAUN Quadra 5 Lote B Torres I",
"Complemento": "ANDAR 1 A 16 SALA 101 A 1601 ANDAR 1 A 16 SALA 101 A 1601 ANDAR 1 A 16 SALA 101 A 1601",
"Numero": "SN",
"Bairro": "SN",
"Cidade": "Brasília",
"UF": "DF",
"CEP": "70040-912"
},
"IndicadorIE": "ContribuinteICMS",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
},
"Ok": true
}
```

## Excluir Pessoa

<aside class="request"><span class="method delete">DELETE</span> <span class="endpoint">/PessoasPublicAPI/ExcluirPessoa/60ba8a6d243c143044040f40</span></aside>

Neste endpoint poderá excluir uma Pessoa cadastrada em sua conta da F360. É obrigatório informar o Id da Pessoa.

Authorization Bearer {{token_jwt}}

Request

```shell
curl --location -g --request DELETE '{{URL}}//PessoasPublicAPI/ExcluirPessoa/60ba8a6d243c143044040f40' \
--header 'Content-Type: application/json'
```

## Criar Pessoa

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PessoasPublicAPI/CriarPessoa</span></aside>

Neste endpoint poderá criar uma nova Pessoa em sua conta da F360. Os campos obrigatórios estão em negrito:

**Nome:** "Nome da Pessoa"

**PlanoDeContaPadrao:** "Nome do plano de contas que essa pessoa deve possuir como padrão"

**Tipo:** "Pessoa física ou Pessoa Jurídica"

**Definicao:** "Cliente, Fornecedor ou Ambos"

Authorization Bearer {{token_jwt}}

```json
{
"Nome": "Teste",
"RazaoSocial": "",
"Telefone": "",
"Email": "",
"CodigoExterno": "",
"PlanoDeContaPadrao": "",
"Tipo": "Pessoa física",
"Definicao": "Ambos",
"CpfCnpj": "",
"Endereco": {
"Logradouro": "",
"Complemento": "",
"Numero": "",
"Bairro": "",
"CEP": ""
},
"IndicadorIE": "",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
}

Exemplo Request

```shell
curl --location -g '{{URL}}/PessoasPublicAPI/CriarPessoa' \
--header 'Content-Type: application/json' \
--data '{
    "Nome": "Teste",
    "RazaoSocial": "",
    "Telefone": "",
    "Email": "",
    "CodigoExterno": "",
    "PlanoDeContaPadrao": "",
    "Tipo": "Pessoa física",
    "Definicao": "Ambos",
    "CpfCnpj": "",
    "Endereco": {
        "Logradouro": "",
        "Complemento": "",
        "Numero": "",
        "Bairro": "",
        "CEP": ""
    },
    "IndicadorIE": "",
    "InscricaoEstadual": "",
    "InscricaoMunicipal": "",
    "InscricaoSUFRAMA": "",
    "MeioDePagamentoPadrao": "",
    "TipoDeDocumentoPadrao": ""
}'
```

## Editar Pessoa

<aside class="request"><span class="method put">PUT</span> <span class="endpoint">/PessoasPublicAPI/EditarPessoa/60ba9117243c141a14383d29</span></aside>

Neste endpoint poderá editar os dados de uma Pessoa cadastrada em sua conta da F360. É obrigatório informar o Id da Pessoa.

```json
{
"Nome": "Teste",
"RazaoSocial": "",
"Telefone": "",
"Email": "",
"CodigoExterno": "",
"PlanoDeContaPadrao": "",
"Tipo": "Pessoa física",
"Definicao": "Ambos",
"CpfCnpj": "",
"Endereco": {
"Logradouro": "",
"Complemento": "",
"Numero": "",
"Bairro": "",
"CEP": ""
},
"IndicadorIE": "",
"InscricaoEstadual": "",
"InscricaoMunicipal": "",
"InscricaoSUFRAMA": "",
"MeioDePagamentoPadrao": "",
"TipoDeDocumentoPadrao": ""
}
```

Exemplo Request

```shell
curl --location -g --request PUT '{{URL}}/PessoasPublicAPI/EditarPessoa/60ba9117243c141a14383d29' \
--header 'Content-Type: application/json' \
--data '{
    "Nome": "Teste",
    "RazaoSocial": "",
    "Telefone": "",
    "Email": "",
    "CodigoExterno": "",
    "PlanoDeContaPadrao": "",
    "Tipo": "Pessoa física",
    "Definicao": "Ambos",
    "CpfCnpj": "",
    "Endereco": {
        "Logradouro": "",
        "Complemento": "",
        "Numero": "",
        "Bairro": "",
        "CEP": ""
    },
    "IndicadorIE": "",
    "InscricaoEstadual": "",
    "InscricaoMunicipal": "",
    "InscricaoSUFRAMA": "",
    "MeioDePagamentoPadrao": "",
    "TipoDeDocumentoPadrao": ""
}'
```

# 5 - Notas Fiscais

Aqui poderá ter acesso aos endpoints disponíveis para a área de Notas Ficais da F360.

## Listar Notas

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/NFPublicAPI/ListarNotas?pagina=1&registro=NFSe&inicio=2021-05-01&fim=2021-05-11&tipo=Criação&empresas=82.374.240/0001-10,30.733.246/0001-33&clienteFornecedores=10.118.341/0001-10</span></aside>

Neste endpoint poderá ter uma lista tendo uma paginação de até 75 Notas fiscais com uma paginação da pesquisa da F360, o período de pesquisa não pode ultrapassar 31 dias. Os parâmetros obrigatórios estão em negrito:

**registro:** "O tipo de registro das Notas ficais, podendo ser NFe, NFSe e NotaDeDebito"

**inicio:** "Data de inicio para Pesquisa 2021-06-01"

**fim:** "Data de final para Pesquisa 2021-06-30"

**tipo:** "Filtro para dentro dos períodos das datas, podendo ser Emissão ou Criação"

Obs:

Para os campos não obrigatórios:

**empresas:** "Pode se passar o CNPJ de uma ou mais empresas"

**clienteFornecedores:** "Pode se passar o CPF/CNPJ de uma ou mais pessoas"

Authorization Bearer {{token_jwt}}

Query Params

pagina=1

registro=NFSe

inicio =2021-05-01

fim=2021-05-11

tipo=Criação

empresas=82\.374.240/0001-10,30.733.246/0001-33

clienteFornecedores=10\.118.341/0001-10

Authorization Bearer {{token_jwt}}

Exemplo Request:

```shell
curl --location -g '{{URL}}/NFPublicAPI/ListarNotas?pagina=1&registro=NFSe&inicio=2021-05-01&fim=2021-05-11&tipo=Cria%C3%A7%C3%A3o&empresas=82.374.240%2F0001-10%2C30.733.246%2F0001-33&clienteFornecedores=10.118.341%2F0001-10' \
--header 'Content-Type: application/json'
```

## Obter Danfe

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/NFPublicAPI/ObterDanfe/60be13ca243c1322b4f726cb</span></aside>

Neste endpoint poderá ter acesso ao arquivo XML em base64 de uma Nota Fiscal da F360. É obrigatório informar o Id da Nota Fiscal.

Authorization Bearer {{token_jwt}}

Exemplo Request:

```shell
curl --location -g '{{URL}}/NFPublicAPI/ObterDanfe/60be13ca243c1322b4f726cb' \
--header 'Content-Type: application/json'
```

## Obter XML

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/NFPublicAPI/ObterXML/60be13ca243c1322b4f726cb</span></aside>

Neste endpoint poderá ter acesso ao arquivo DANFE em base64 de uma Nota Fiscal da F360. É obrigatório informar o Id da Nota Fiscal.

Authorization Bearer {{token_jwt}}

Exemplo Request

```shell
curl --location -g '{{URL}}/NFPublicAPI/ObterXML/60be13ca243c1322b4f726cb' \
--header 'Content-Type: application/json'
```

# 6 - Parcelas de Título

Aqui poderá ter acesso aos endpoints de Parcela de Títulos da F360.

## Listar Parcelas De Titulos

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/ParcelasDeTituloPublicAPI/ListarParcelasDeTitulos?pagina=1&tipo=Despesa&inicio=2021-06-01&fim=2021-06-30&tipoDatas=Emissão</span></aside>

Neste endpoint iremos listar as parcelas de títulos de forma paginada (100 itens por requisição). O período de pesquisa não poderá ultrapassar 31 dias. Segue os parâmetros da pesquisa (em negrito são os itens obrigatórios):

**tipo:** "Escolha o tipo de registro entre: 'Despesa', 'Receita' ou 'Ambos'"

**inicio:** "Data de inicio para a pesquisa (yyyy-MM-dd)"

**fim:** "Data final para a pesquisa (yyyy-MM-dd)"

**tipoDatas:** "Escolha o tipo de data da pesquisa, entre as opções: 'Emissão', 'Competência', 'Vencimento', 'Liquidação' ou 'Atualização'"

**status:** "Escolha o status da parcela, podendo ser: 'Todos', 'Aberto', 'AbertoAVencer', 'AbertoVencidos', 'Liquidado', 'Baixado', 'Aprovados', 'PendentesDeAprovacao', 'Renegociados', 'LiquidadoConciliado', 'Agendado', 'AbertoNaoAgendados', 'NaoVinculadoComDDA' e 'LiquidadoPendente'"

**empresas:** "Informe o CNPJ das empresas separado por vírgula"

**contas:** "Informe o nome das contas separado por vírgula"

Authorization Bearer {{token_jwt}}

**Query Params**

pagina=1

tipo=Despesa

inicio=2021-06-01

fim=2021-06-30

tipoDatas=Emissão

Request

```shell
curl --location --globoff '{{URL}}/ParcelasDeTituloPublicAPI/ListarParcelasDeTitulos?pagina=1&tipo=Despesa&inicio=2021-06-01&fim=2021-06-30&tipoDatas=Emiss%C3%A3o' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": {
"QuantidadeDeParcelas": 2,
"Pagina": 1,
"QuantidadeDePaginas": 1,
"DataMaisRecente": "2022-06-01",
"Parcelas": [
{
"Registro": "Parcela de título",
"Tipo": "Despesa",
"ParcelaId": "62bc4ab19a25ae25d806b06f",
"Numero": "1",
"ConciliadaComExtrato": false,
"Cancelada": false,
"Vencimento": "2022-07-01",
"Liquidacao": "",
"ValorBruto": 108.02,
"Conta": "",
"MeioDePagamento": "Débito Automático",
"Status": "Aberto (Vencido)",
"DadosDoTitulo": {
"NumeroDoTitulo": "1",
"TituloId": "62bc4ab19a25ae25d806b06e",
"Emissao": "2022-06-01",
"TipoDeDocumento": "Outros",
"TotalDeParcelas": 2,
"Valor": 216.04,
"Observacao": "",
"Empresa": {
"Nome": "",
"Inscricao": "00.000.000/0000-00"
},
"ClienteFornecedor": {
"Nome": "",
"Inscricao": "00.000.000/0000-00"
}
},
"Rateio": [
{
"CentroDeCusto": "",
"PlanoDeContas": "ADMINISTRATIVO DE MARKETING",
"Competencia": "2022-06",
"Valor": 108.02,
"Tipo": "Despesa"
}
],
"TipoDeDocumento": "Outros",
"NumeroDaParcela": 1,
"Parcelamento": "1/2"
},
{
"Registro": "Parcela de título",
"Tipo": "Despesa",
"ParcelaId": "62bc4ab19a25ae25d806b071",
"Numero": "1",
"ConciliadaComExtrato": false,
"Cancelada": false,
"Vencimento": "2022-08-01",
"Liquidacao": "",
"ValorBruto": 108.02,
"ValorLiquido": 108.02,
"Conta": "",
"MeioDePagamento": "Débito Automático",
"Status": "Aberto (A Vencer)",
"DadosDoTitulo": {
"NumeroDoTitulo": "1",
"TituloId": "62bc4ab19a25ae25d806b06e",
"Emissao": "2022-06-01",
"TipoDeDocumento": "Outros",
"TotalDeParcelas": 2,
"Valor": 216.04,
"Observacao": "",
"Empresa": {
"Nome": "",
"Inscricao": "00.000.000/0000-00"
},
"ClienteFornecedor": {
"Nome": "",
"Inscricao": "00.000.000/0000-00"
}
},
"Rateio": [
{
"CentroDeCusto": "",
"PlanoDeContas": "ADMINISTRATIVO DE MARKETING",
"Competencia": "2022-06",
"Valor": 216.04,
"Tipo": "Despesa"
}
],
"TipoDeDocumento": "Outros",
"NumeroDaParcela": 2,
"Parcelamento": "2/2"
}
]
},
"Ok": true
}
```

# 7 - Parcelas de Cartões

Aqui poderá ter acesso aos endpoints de Parcela de Cartões da F360.

## Listar Parcelas De Cartões

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/ParcelasDeCartoesPublicAPI/ListarParcelasDeCartoes?pagina=1&tipo=ambos&inicio=2021-03-01&fim=2021-03-30&tipoDatas=emissao</span></aside>

Neste endpoint iremos listar as parcelas de cartões de forma paginada (100 itens por requisição). O período de pesquisa não poderá ultrapassar 31 dias. Segue os parâmetros da pesquisa (em negrito são os itens obrigatórios):

**tipo:** "Escolha o tipo entre: 'Despesa', 'Receita' ou 'Ambos'"

**inicio:** "Data de inicio para a pesquisa (yyyy-MM-dd)"

**fim:** "Data final para a pesquisa (yyyy-MM-dd)"

**tipoDatas:** "Escolha o tipo de data da pesquisa, entre as opções: 'Emissão', 'Venda', 'Competência', 'Vencimento', 'Liquidação' ou 'Atualização' "

**status:** "Escolha o status da parcela, podendo ser: 'Todos', 'Cancelados', 'Estornados', 'PendentesConciliacaoPDV\_TEF', 'PendentesConciliacaoExtrato', 'ConciliadosPDV\_TEF', 'AntecipadosTodos', 'LiquidadosTodos', 'ConciliadosExtrato', 'Baixados', 'AbertosTodos', 'AbertosAVencer', 'AbertosVencidos', 'LiquidadosPendentes', 'AntecipadosConciliados', 'AntecipadosPendentes' e 'DivergenciaDeTaxa'"

**empresas:** "Informe o CNPJ das empresas separado por vírgula"

**contas:** "Informe o nome das contas separado por vírgula"

Authorization Bearer {{token_jwt}}

**Query Params**

pagina=1

tipo=ambos

inicio=2021-03-01

fim=2021-03-30

tipoDatas=emissao

Request

```shell
curl --location --globoff '{{URL}}/ParcelasDeCartoesPublicAPI/ListarParcelasDeCartoes?pagina=1&tipo=ambos&inicio=2021-03-01&fim=2021-03-30&tipoDatas=emissao' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": {
"QuantidadeDeParcelas": 2,
"Pagina": 1,
"QuantidadeDePaginas": 1,
"DataMaisRecente": "2021-02-26",
"Parcelas": [
{
"Registro": "Parcela de Cartão",
"Tipo": "Receita",
"ParcelaId": "603cfba6sa45d2f9cee4559c",
"Numero": 1,
"ConciliadaComExtrato": true,
"Cancelada": false,
"Vencimento": "2021-02-26",
"Liquidacao": "2021-02-26",
"ValorBruto": 90.6,
"ValorLiquido": 90.6,
"Taxa": 0,
"ApuracaoTaxas": {
"PercentualTaxaAcordo": 0,
"PercentualTaxaRealizado": 0,
"DifTaxa": 0
},
"Conta": "Conta 01",
"Modalidade": "PIX",
"Observacoes": "",
"DadosDoCartao": {
"CartaoId": "603cfba6sa45d2f9cee4559b",
"DataDaVenda": "2021-02-26",
"DataDeApresentacao": "2021-02-26",
"CodigoDoEstabelecimento": 99999,
"ConciliadoComPDV": "true",
"Cancelado": "false",
"Adquirente": "PIX",
"Bandeira": "PIX",
"MeioDeCaptura": "POS",
"TipoDeTransacao": "Venda",
"TotalDeParcelas": 1,
"Valor": 90.6,
"Empresa": {
"Nome": "Loja 01",
"Inscricao": "00.000.000/0001-88"
},
"Vendas": [
{
"NSU": 0,
"CodigoAutorizacao": "a5468255-0mb6-4120-b052-503c83048d2b",
"DataDaVenda": "2021-02-26",
"ValorBruto": 90.6,
"VendaCancelada": "false"
}
],
"NumeroPedido": "204060",
"Status": "Conciliados com PDV/TEF"
},
"Rateio": [
{
"CentroDeCusto": "Loja 01",
"PlanoDeContas": "Vendas de Mercadorias",
"Competencia": "2021-02",
"Valor": 90.6,
"Tipo": "Receita"
}
],
"Status": "Conciliados com Extrato"
},
{
"Registro": "Parcela de Cartão",
"Tipo": "Receita",
"ParcelaId": "603cfba6sa45d2f9cee4559b",
"Numero": 1,
"ConciliadaComExtrato": true,
"Cancelada": false,
"Vencimento": "2021-02-26",
"Liquidacao": "2021-02-26",
"ValorBruto": 108.9,
"ValorLiquido": 108.9,
"Taxa": 0,
"ApuracaoTaxas": {
"PercentualTaxaAcordo": 0,
"PercentualTaxaRealizado": 0,
"DifTaxa": 0
},
"Conta": "Conta 02",
"Modalidade": "PIX",
"Observacoes": "",
"DadosDoCartao": {
"CartaoId": "603cfba6sa45d2f9cee4559c",
"DataDaVenda": "2021-02-26",
"DataDeApresentacao": "2021-02-26",
"CodigoDoEstabelecimento": 88888,
"ConciliadoComPDV": "true",
"Cancelado": "false",
"Adquirente": "PIX",
"Bandeira": "PIX",
"MeioDeCaptura": "POS",
"TipoDeTransacao": "Venda",
"TotalDeParcelas": 1,
"Valor": 108.9,
"Empresa": {
"Nome": "Loja 02",
"Inscricao": "00.000.000/0001-99"
},
"Vendas": [
{
"NSU": 0,
"CodigoAutorizacao": "83993941-8592-4f38-8592-2bf0b04f42e0    ",
"DataDaVenda": "2021-02-26",
"ValorBruto": 108.9,
"VendaCancelada": "false"
}
],
"NumeroPedido": "204068",
"Status": "Conciliados com PDV/TEF"
},
"Rateio": [
{
"CentroDeCusto": "Loja 02",
"PlanoDeContas": "Vendas de Mercadorias",
"Competencia": "2021-02",
"Valor": 108.9,
"Tipo": "Receita"
}
],
"Status": "Conciliados com Extrato"
}
]
},
"Ok": true
}
```

# 8 - Gerar Movimentos de Cartões

Aqui você poderá enviar os dados de movimento de cartão para serem inseridos na plataforma.

## Gerar Movimentos de Cartão

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/CartaoPublicAPI/GerarMovimentoDeCartao</span></aside>

Neste endpoint você poderá criar um ou mais movimentos de cartão.

**BODY PARAMS**

**CodigoEstabelecimento:** Código de Estabelecimento, Informe o código utilizado. para identificar a empresa que o cartão deverá ser inserido.

**DataDaVenda:** Informe a data da venda no formato {DD/MM/YYYY},

**TipoDeLancamento:** Informe o tipo de lançamento. Ex.: Débito, Crédito

**TipoDeTransacao:** Informe o Tipo da Transação. Ex.: Venda

**TipoDeRegistro:** Informe o tipo de registro. Ex.: Venda,

**DescricaoBandeira:** Informe a bandeira do cartão. Ex.: Visa,

**DescricaoOperadora:** Informe o nome da operadora,

**NSU:** Informe o Número Sequencial Único,

**CodigoAutorizacao:** Informe o código de autorização,

**ResumoDeOperacoes:** Informe o resumo de operações,

**TotalDeParcelas:** Número total de parcelas,

**Parcelas:** Informe cada parcela com suas respectivas informações.

```json
{
NumeroParcela: Informe o número da parcela,
ValorBruto: Informe o Valor bruto da parcela,
ValorLiquido: Informe o Valor Liquido da parcela,
Desconto: Informe o valor de desconto da parcela,
DataVencimento: Informe o vencimento da parcela no formato “DD/MM/YYYY”,
DataLiquidacao: Informe a data de Liquidação da parcela no formato “DD/MM/YYYY”
},
```

**ValorBruto:** Informe o Valor bruto total da compra

Authorization Bearer {{token_jwt}}

Request

```json
{
"FileType": "Modelo de Importação dos Registros de Adquirente - Modelo Json 1.0",
"Cartoes": [
{
"CodigoEstabelecimento": "1234567890001",
"DataDaVenda": "17/01/2022",
"TipoDeLancamento": "Débito",
"TipoDeTransacao": "Venda",
"TipoDeRegistro": "Venda",
"DescricaoBandeira": "Visa",
"DescricaoOperadora": "Teste",
"NSU": 123456789,
"CodigoAutorizacao": "ABCDE",
"ResumoDeOperacoes": "ABCDE",
"TotalDeParcelas": 1,
"Parcelas": [
{
"NumeroParcela": 1,
"ValorBruto": 99.99,
"ValorLiquido": 98.99,
"Desconto": 1,
"DataVencimento": "18/01/2022",
"DataLiquidacao": null
}
],
"ValorBruto": 99.99
},
{
"CodigoEstabelecimento": "1234567890001",
"DataDaVenda": "17/01/2022",
"TipoDeLancamento": "Débito",
"TipoDeTransacao": "Venda",
"TipoDeRegistro": "Venda",
"DescricaoBandeira": "Visa",
"DescricaoOperadora": "Teste",
"NSU": 123456789,
"CodigoAutorizacao": "ABCDE",
"ResumoDeOperacoes": "ABCDE",
"TotalDeParcelas": 1,
"Parcelas": [
{
"NumeroParcela": 1,
"ValorBruto": 99.99,
"ValorLiquido": 98.99,
"Desconto": 1,
"DataVencimento": "18/01/2022",
"DataLiquidacao": null
}
],
"ValorBruto": 99.99
}
]
}
```

# 9 - Extrato Bancário

Aqui você terá acesso aos endpoints disponíveis para obtenção do Extrato Bancário.

## Obter Extrato Bancário

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/ExtratoBancarioPublicAPI/ObterExtratoBancario</span></aside>

Aqui você pode obter o Extrato Bancário de forma paginada. Os resultados são uma réplica do relatório que pode ser gerado pela tela de "Contas Movimento", aba "Extrato Bancário".

Segue os parâmetros da pesquisa (Parâmetros devem ser enviados no Body da requisição):

\*\* Os itens em negrito são obrigatórios \*\*

EndFragment

**DataInicio:** Data de inicio para a pesquisa (yyyy-MM-dd).

**DataFim:** Data final para a pesquisa (yyyy-MM-dd).

**Status:** Escolha o status entre: 'Todos', 'Conciliados' ou 'Nao Conciliados'.

**ModeloRelatorio:** Escolha o status entre: 'Sintetico' ou 'Analitico'.

ExibirDetalhesConciliacao: Escolha entre 'true' ou 'false' ou omita para que seja 'false'. Esta opção está disponível apenas no modelo ****Sintético** e em registros com status **Conciliado**. Ela adiciona ao campo "DetalhesConciliacao" todos os registros vinculados e valores por CNPJ.

Contas: Informar a lista de Ids de contas criação do extrato.

CNPJEmpresas: Informar a lista de CNPJ's para a criação do relatório. Serão consideradas todas as contas que tenham no campo **Cnpj** o(s) valor(es) fornecido(s).

Pagina: Identificador da página a ser buscada, caso não fornecido será considerado o valor 1.

É necessário ao menos um Id de Conta Bancária ou CNPJ para ser gerado o Extrato Bancário.

Authorization Bearer {{token_jwt}}

```json
{
"DataInicio": "2022-08-22",
"DataFim": "2022-08-22",
"Status": "Todos",
"ModeloRelatorio": "Sintetico",
"Contas": ["3604cd42b874ab1940a81b5f"],
"ExibirDetalhesConciliacao": false
}
```

Request

```shell
curl --location --globoff '{{URL}}/ExtratoBancarioPublicAPI/ObterExtratoBancario' \
--header 'Content-Type: application/json' \
--data '{
"DataInicio": "2022-08-22",
"DataFim": "2022-08-22",
"Status": "Todos",
"ModeloRelatorio": "Sintetico",
"Contas": ["3604cd42b874ab1940a81b5f"]
}'
```

Response

```json
{
"Result": {
"Pagina": 1,
"QuantidadeDePaginas": 1,
"Filtros": {
"DataInicio": "2022-08-22",
"DataFim": "2022-08-22",
"Contas": [
"3604cd42b874ab1940a81b5f"
],
"Status": "Todos",
"ModeloRelatorio": "Sintetico"
},
"Extratos": [
{
"Data": "2022-08-22",
"Conta": "CONTA BANCARIA EXEMPLO",
"Valor": 100.00,
"Historico": "DEB.AUTOR.",
"Complemento": "",
"Documento": "3751",
"Empresa": "",
"DetalhesConciliacao":{
"Extratos": [
{
"id": "640744c79f2ad94617fa6a04",
"Valor": 100.00
}
],
"Transferencias": [],
"ResultadoConciliacao": [
{
"Cnpj": "96901111000148",
"Valor": 100.00
}
]
},
"Origem": "OFX",
"Status": "Conciliado",
"TipoDeConciliacao": "Parcelas de Títulos"
},
{
"Data": "2022-08-22",
"Conta": "CONTA BANCARIA EXEMPLO",
"Valor": 100.00,
"Historico": "CRED TED",
"Complemento": "",
"Documento": "33",
"Empresa": "",
"DetalhesConciliacao":{
"Extratos": [
{
"id": "640745fbb0c0f5248cd9059b",
"Valor": 100.00
},
{
"id": "6407460c33b369af5c817339",
"Valor": 100.00
}
],
"Transferencias": [],
"ResultadoConciliacao": [
{
"Cnpj": "96901111000148",
"Valor": 200.00
}
]
},
"Origem": "OFX",
"Status": "Conciliado",
"TipoDeConciliacao": "Transferência entre Contas"
},
{
"Data": "2022-08-22",
"Conta": "CONTA BANCARIA EXEMPLO",
"Valor": 250.00,
"Historico": "Banco Exemplo",
"Complemento": "",
"Documento": "54",
"Empresa": "",
"DetalhesConciliacao":{
"Extratos": [
{
"id": "640746bf0b4b164879ae9f37",
"Valor": 250.00
}
],
"Transferencias": [
{
"Id": "640746c65f32118635834ee6",
"Valor": 250.00
}
],
"ResultadoConciliacao": []
},
"Origem": "OFX",
"Status": "Conciliado",
"TipoDeConciliacao": "Parcelas de Títulos"
}
]
},
"Ok": true
}
```

# 10 - Centros de Custo

Aqui você terá acesso aos endpoints disponíveis para consultar os Centros de Custo.

## Listar Centros de Custo

<aside class="request"><span class="method get">GET</span> <span class="endpoint">/CentroDeCustoPublicAPI/ListarCentrosDeCusto</span></aside>

Este método irá listar todos os centros de custo disponíveis.

Authorization Bearer {{token_jwt}}

Request

```shell
curl --location --globoff '{{URL}}/CentroDeCustoPublicAPI/ListarCentrosDeCusto' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": [
{
"CentroDeCustoId": "6407488d348b87f955141da5",
"Nome": "TESTE1"
},
{
"CentroDeCustoId": "640748915e4e442569840e37",
"Nome": "TESTE2"
},
{
"CentroDeCustoId": "6407489685062763fb31f143",
"Nome": "TESTE3"
}
],
"Ok": true
}
```

# 11 - Conta Bancária

Aqui você terá acesso aos endpoints disponíveis para consultar as Contas Bancárias.

## Listar Contas Bancárias

<aside class="request"><span class="method get">GET</span> <span class="endpoint">ContaBancariaPublicAPI/ListarContasBancarias</span></aside>

Este método irá listar todas as contas bancárias disponíveis.

Authorization Bearer {{token_jwt}}

Exemplo Request

```shell
curl --location --globoff '{{URL}}/ContaBancariaPublicAPI/ListarContasBancarias' \
--header 'Content-Type: application/json'
```

Response

```json
{
"Result": [
{
"Id": "454061eb0d9a9413f8067ad6",
"Nome": "NOME DA CONTA TESTE",
"TipoDeConta": "Conta Corrente",
"Carteira": "0",
"Agencia": "1234",
"Conta": "1234567",
"DigitoConta": "12",
"NumeroBanco": 33
}
],
"Ok": true
}
```
