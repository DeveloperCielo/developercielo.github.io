---
layout: manual
title: Cielo Conciliador
description: Instruções EDI
search: true
translated: false
toc_footers: true
categories: manual
sort_order: 9
tags:
  - Cielo Conciliador
language_tabs:
  json: JSON
  shell: cURL
---

# Cielo Conciliador

Essa documentação contém todas as API's públicas disponíveis pela plataforma do Cielo Conciliador. A URL de produção para todos os endpoints é https://financas.f360.com.br﻿

# 1 - Login

O token é dispobinilizado pela plataforma ao criar um webservice de API Pública. Segue o link de como criar um token de autenticação na API:

https://f360.zendesk.com/hc/pt-br/articles/360062098714

<aside class="request"><span class="method post">POST</span> <span class="endpoint">/PublicLoginAPI/DoLogin</span></aside>

Body

```json
{ "token": "{{token_login}}" }
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

Aqui você irá encontrar todos os endpoints disponíveis relacionados a download de relatórios da F360

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
curl --location --globoff '{URL}}/PublicRelatorioAPI/GerarRelatorio' \
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
```

Request

```shell
curl --location --globoff '{URL}/PublicRelatorioAPI/GerarRelatorioDeConciliacaoDeCartoes' \
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
```

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

# 12 - Arquivo de saída

É o arquivo conciliado, também chamado de arquivo de fluxo de caixa, que contém todas as vendas, pagamentos, estornos e cancelamentos, enfim, todos os movimentos que uma loja possui para determinada data.

O arquivo de saída é um meio de integração, e você poderá fazer o upload do arquivo conciliado para o seu ERP ou sistema de gestão para gerar um “contas a receber” e realizar as baixas das contas que receber dentro do seu sistema.

Para liberar o Token utilizado na API para extração dos arquivos de Saída no formato Agiliza, você deve acessar o site Cielo e realizar login. Na Aba **Menu de Cadastro** selecione **Integrações** e clique em **“+CRIAR”** no rodapé da página. 
Após finalizar o preenchimento das informações solicitadas, o token de acesso será disponibilizado e poderá seguir com as próximas etapas.

Selecione o **Webservice API Pública da F360**, indique um nome de identificação para a chave que será criada.
O “Tipo de acesso da API” fica a seu critério, selecionar as permissões dessa chave ou acesso total.
O status deve ser **Ativo**.

> **Ponto de atenção:**  O token só fica visível 1 vez na tela, certifique-se de copiá-lo e guardá-lo.

![Conciliador_API_Publica](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/Conciliador_API_Publica.png)


## Gerar Relatório Formato Agiliza

<aside class="request"><span class="method get">GET</span> <span class="endpoint"> Gerar Relatório Formato Agiliza</span></aside>

```java
{{URL}}/PublicRelatorioAPI/GerarRelatorioFormatoAgiliza?merchantId=&Acquirer=&dateFile=&pageIndex=&pageSize=
```

Esse método gera o relatório com dados de conciliação, conforme descrito nos tópicos abaixo.

**Arquivos Fluxo de Caixa XML**

**Arquivos Fluxo de Caixa CSV**


| **AUTHORIZATION** |                    |
|-------------------|--------------------|
| **Token**         | {{token_jwt}}      |


| **HEADERS**        |                    |
|--------------------|--------------------|
| **Content-Type**   | application/json   |


```shell
curl --location -g '{{URL}}/PublicRelatorioAPI/GerarRelatorioFormatoAgiliza?merchantId=&Acquirer=&dateFile=&pageIndex=&pageSize=' \
--header 'Content-Type: application/json'
```


```json
{
  "pageIndex": 1,
  "pageSize": 100,
  "totalItems": 138,
  "totalPages": 2,
  "merchantId": "",
  "acquirerId": "1",
  "generationDateTime": "2024-09-13T16:23:29.7699612-03:00",
  "startPeriod": "2024-05-02",
  "endPeriod": "2024-05-02",
  "processingTypeId": "1",
  "processingType": "Daily",
  "version": "2.0",
  "conciliatedTransactions": [
    {
      "conciliationTypeId": "1",
      "conciliationType": "Automatic",
      "saleData": {
        "affiliationCode": "",
        "authorizationCode": "682149",
        "saleDate": "2024-05-02",
        "captureDate": "2024-05-02",
        "transactionAmount": "877936",
        "installmentCount": "10",
        "nsu": "139090"
      },
      "acquirerData": {
        "affiliationCode": "",
        "summaryNumber": "4240502",
        "saleDate": "2024-05-02",
        "transactionGrossAmount": "877936",
        "transactionTaxAmount": "25550",
        "transactionNetAmount": "852386",
        "roundingInstallmentGrossAmount": "87799",
        "roundingInstallmentTaxAmount": "2555",
        "roundingInstallmentNetAmount": "85244",
        "installmentsGrossAmount": "87793",
        "installmentsTaxAmount": "2555",
        "installmentsNetAmount": "85238",
        "tax": "291",
        "nsu": "139090",
        "terminalLogicNumber": "",
        "captureDate": "2024-05-02",
        "summaryIdentifierNumber": "4240502",
        "installmentCount": "10",
        "authorizationCode": "682149",
        "captureMethodId": "3",
        "captureMethodDescription": "E-Commerce",
        "cardBrandId": "1",
        "cardBrand": "VISA",
        "cardTypeId": "2",
        "cardType": "Credit",
        "productIdentifierCode": "43",
        "productIdentifierDescription": "Visa Parcelado Loja"
      },
      "accountingEvents": [
        {
          "eventDate": "2024-06-03",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "1",
          "type": "Realized",
          "affiliationCode": "",
          "transactionInstallment": "1",
          "grossAmount": "87799",
          "netAmount": "85244",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2024-07-02",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "1",
          "type": "Realized",
          "affiliationCode": "",
          "transactionInstallment": "2",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2024-08-01",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "1",
          "type": "Realized",
          "affiliationCode": "",
          "transactionInstallment": "3",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2024-09-02",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "4",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2024-10-02",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "5",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2024-11-01",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "6",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2024-12-02",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "7",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2025-01-02",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "8",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2025-02-03",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "9",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        },
        {
          "eventDate": "2025-03-05",
          "categoryId": "4",
          "category": "Pagamento",
          "typeId": "2",
          "type": "Preview",
          "affiliationCode": "",
          "transactionInstallment": "10",
          "grossAmount": "87793",
          "netAmount": "85238",
          "taxAmount": "2555",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01",
          "numeroLote": "4240502"
        }
      ],
      "informationalEvents": [
        {
          "eventDate": "2024-05-02",
          "categoryId": "3",
          "category": "Captura",
          "typeId": "1",
          "type": "Realized",
          "affiliationCode": "",
          "transactionInstallment": "1",
          "grossAmount": "877936",
          "netAmount": "852386",
          "taxAmount": "25550",
          "bank": "33",
          "agency": "2271",
          "account": "13029117",
          "originalPaymentDate": "0001-01-01"
        }
      ]
    }
  ],
  "affiliationAccountingEvents": []
}
```


| **PARAMS**    | **Descrição**                                                   |
|---------------|-----------------------------------------------------------------|
| **merchantId**| É o CNPJ da loja (apenas números)                               |
| **Acquirer**  | Número da adquirente, seguindo os mesmos números da documentação do Agiliza (Ex: Cielo é 1) |
| **dateFile**  | Data do arquivo no formato yyyy-MM-dd                           |
| **pageIndex** | Número da página, iniciando em 1                                |
| **pageSize**  | Tamanho da página, que pode ser até 150                         |


## Solicitar Relatório Agiliza Assincrono

<aside class="request"><span class="method get">POST</span> <span class="endpoint"> Solicitar Relatório Agiliza Assincrono</span></aside>


```java
{{URL}}/PublicRelatorioAPI/SolicitarRelatorioAgilizaAsync
```
Esse método gera o relatório com dados de conciliação, conforme descrito nos tópicos abaixo:

**Arquivos Fluxo de Caixa XML**

**Arquivos Fluxo de Caixa CSV**

É necessário enviar a solicitação através desse endpoint, em que será retornado um id de relatório.

Depois que o relatório estiver pronto, é necessário enviar o id recebido no endpoint de "Obter Relatório" para fazer download do arquivo.

É possível incluir uma URL no body para onde vamos enviar uma notificação assim que o relatório estiver pronto.

Sobre os parâmetros do body:

- merchantId : CNPJ da empresa (apenas números)
- Acquirer : Número da adquirente, seguindo os mesmos números da documentação do Agiliza (Ex: Cielo é 1)
- dateFile : Data do arquivo no formato yyyy-MM-dd
- formato : Formato do arquivo (xml ou csv)
- urlNotificacao : URL que vamos enviar uma notificação assim que o relatório estiver pronto. A mensagem que enviamos é no seguinte formato, em que Id e Filename são o Id e nome do relatório gerado, respectivamente.

```json
{"Service":"relatorio_agiliza_gateway","Value":{"Id":"66e87a81be5b7a52e4641702","FileName":"RelatorioDeSaidaAgilizaGateway.csv"}}
```


```shell
curl --location -g '{{URL}}/PublicRelatorioAPI/SolicitarRelatorioAgilizaAsync' \
--header 'Content-Type: application/json' \
--data '{
    "merchantId": "",
    "Acquirer": 1,
    "dateFile": "2024-05-02",
    "formato" : "csv",
    "urlNotificacao": "http://localhost:5000"
}'
```


```json
{
  "Result": "66e87a81be5b7a52e4641702",
  "Ok": true
}
```


| **AUTHORIZATION** |                    |
|-------------------|--------------------|
| ** Token**        | {{token_jwt}}      |


| **HEADERS**        |                    |
|--------------------|--------------------|
| **Content-Type**   | application/json   |



```json
{
    "merchantId": "",
    "Acquirer": 1,
    "dateFile": "2024-05-02",
    "formato" : "csv",
    "urlNotificacao": "http://localhost:5000"
}
```

# Arquivos Fluxo de Caixa 2.0 - XML

## Introdução

Este manual tem como objetivo orientar o desenvolvimento do Arquivo de Fluxo de Caixa da plataforma conciliador no formato XML, e a extração do seu conteúdo através do Webservice

## Legenda para os tipos de formato

### Tipos de Formato (Tabela II)

| Descritor | Significado                                     | Exemplo                            |
|-----------|-------------------------------------------------|------------------------------------|
| N         | Um ou mais algarismos (0 a 9)                   | 243                                |
| A         | Um ou mais caracteres alfanuméricos             | Texto                              |
| {N}       | Um  único algarismo (0 a 9)                     | 2                                  |
| {A}       | Identificador Único Global (GUID)1              | B                                  |
| G         | Hora em campo data/hora (0 a 23)                | 4749e676-2507-442da1c6c25c08e2d2af |
| DT        | Data e hora, representados no formato ISO 86012 | 2015-06-09T10:08:19.1748259-03:00  |
| D         | Data, representada no formato ISO 86012         | 2015-06-09                         |

1. Um Identificador Único Global ou GUID (do inglês, Globally Unique IDentifier) é um tipo especial de identificador utilizado em aplicações de software para providenciar um número de referência padrão mundial. Como, por exemplo, em uma definição de referência interna para um tipo de ponto de acesso em uma aplicação de software ou para a criação de chaves únicas em um banco de dados. O número total de chaves únicas (2128 ou ~3.4×1038) é tão grande que a probabilidade do mesmo número se repetir é muito pequena. Considerando que o Universo Observável contém 5x1022 estrelas, cada estrela poderia ter ~6.8×1015 dos seus próprios GUIDs. Caso seu sistema não reconheça o formato GUID, poderá trata-lo como texto.

2. O formato ISO 8601 é o formato de data padrão existente na recomendação oficial para Schemas XML
[http://www.w3.org/TR/xmlschema-2/#dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime){:target="_blank"}.  Ele consiste na representação da data no formato yyyy-MM-dd. Caso o campo também tenha a informação de hora, a data vem seguida da letra “T” para separa-la da hora, no formato HH:mm:ss:mmmmmmm, seguida finalmente pela diferença de fuso horário. Para mais informações da ISO 8601 podem ser consultadas em:

> [http://en.wikipedia.org/wiki/ISO_8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"}.   

## Informações sobre as adquirentes

O principal insumo do Conciliador são os extratos eletrônicos gerados pelas adquirentes. Devido a isso, podem existir particularidades entre cada uma.   
Abaixo a estimativa de dias em que a adquirente envia os eventos no extrato eletrônico:

### Prazo de registro no extrato eletrônico (Tabela II)

| Adquirente     | Captura                                         | Pagamento       | Observação                                                                                                                                                  |
|----------------|-------------------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cielo          | D+1                                             | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Rede           | D+1                                             | D -1            | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Amex           | Entre D+1 à  D+2                                | Entre D-4 à D-6 | *Desconsiderar do prazo a segunda feira, pois os extratos  não são gerados. Nestes dias o arquivo do Conciliador será disponibilizado somente com o header. |
| Getnet         | D+1                                             | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Ticket         | D+30 ajustada ao dia de recebimento do cliente  | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Sodexo         | D+30 ajustada ao dia de recebimento do cliente  | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Stone          | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Global Collect | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| First Data     | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |

### Registro Header (Tabela III)

| Campo              | Nome                                   | Tipo               | Formato | Descrição                                                                                                                              |
|--------------------|----------------------------------------|--------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------|
| MerchantId         | Identificador da Loja                  | Numérico (Inteiro) | N       | Contém o identificador único da loja no Conciliador                                                                                    |
| AcquirerId         | Identificador da Adquirente            | Numérico (Inteiro) | {N}     | 1 = Cielo<br>2 = Redecard<br>3 = Amex<br>5 = Getnet<br>6 = Ticket<br>7 = Stone<br>8 = Sodexo<br>9 = Global Payments<br>10 = First Data |
| GenerationDateTime | Geração do arquivo                     | Data/Hora          | DT      | Contém a data e a hora da geração do arquivo pelo Conciliador                                                                          |
| StartPeriod        | Período inicial                        | Data               | D       | Data inicial do período de conciliação contemplado pelo arquivo                                                                        |
| EndPeriod          | Período final                          | Data               | D       | Data final do período de conciliação contemplado pelo arquivo                                                                          |
| SequentialNumber   | Número sequencial                      | Numérico (Inteiro) | N       | Número sequencial que indica a ordem de processamento dos arquivos diários                                                             |
| ProcessingTypeId   | Identificador do tipo de processamento | Numérico (Inteiro) | {N}     | 1 = Arquivo diário <br> 2 = Arquivo reprocessado                                                                                       |
| ProcessingType     | Descrição do tipo de processamento     | Alfanumérico       | A       | “Daily” ou “Reprocessed” (Diário ou reprocessado)                                                                                      |
| Version            | Versão do arquivo                      | Alfanumérico       | A       | Versão do arquivo (“2.0”)                                                                                                              |

### Registro de Transação Conciliada (Tabela IV)

| Campo              | Nome                                 | Tipo               | Formato | Descrição                                      |
|--------------------|--------------------------------------|--------------------|---------|------------------------------------------------|
| ConciliationTypeId | Identificador do tipo de conciliação | Numérico (Inteiro) | {N}     | 1   = Automática <br> 2   = Manual             |
| ConciliationType   | Descrição do tipo de conciliação     | Alfanumérico       | A       | “Automatic” ou “Manual” (Automática ou manual) |

### Registro de Conciliação Manual (Tabela V)

| Campo                | Nome                              | Tipo         | Formato | Descrição                                                         |
|----------------------|-----------------------------------|--------------|---------|-------------------------------------------------------------------|
| ConciliationUserName | Usuário da conciliação manual     | Alfanumérico | A       | Login do usuário que efetuou a conciliação manual                 |
| ConciliationDateTime | Data e hora da conciliação manual | Data/Hora    | DT      | Data e hora em que a conciliação manual foi efetuada pelo usuário |

### Registro de Informação de Venda

| Campo                          | Nome                                            | Tipo                               | Formato | Descrição                                                                             |
|--------------------------------|-------------------------------------------------|------------------------------------|---------|---------------------------------------------------------------------------------------|
| TransactionId                  | Identificador Único da  Venda no Conciliador    | Identificador Único  Global (GUID) | G       | Identificador único do Conciliador para as informações de venda1                      |
| ExternalId                     | Identificador da Venda no  Sistema Transacional | Alfanumérico                       | A       | Identificador da Venda obtido a partir do Sistema Transacional no qual a Transação foi processada com a Adquirente-2                               |
| BranchId                       | Identificador da Filial                         | Alfanumérico                       | A       | Identificador da Filial da loja que processou a venda-3                                |
| AffiliationCode                | Código de Afiliação                             | Alfanumérico                       | A       | O código de afiliação da adquirente, informado nos dados da venda do cliente          |
| OrderId                        | Número do Pedido                                | Alfanumérico                       | A       | O número do pedido associado à venda no lojista-4                                      |
| AuthorizationCode              | Código de Autorização                           | Alfanumérico                       | A       | O Código de Autorização da transação que o Lojista recebeu da Adquirente              |
| SaleDate                       | Data da Venda                                   | Data                               | D       | A data em que foi realizada a venda no Lojista                                        |
| CaptureDate                    | Data da Captura                                 | Data                               | D       | A data da captura recebida pelo lojista da Adquirente                                 |
| TransactionAmount              | Valor da transação                              | Numérico (Inteiro)                 | N       | O valor da transação em centavos5                                                     |
| InstallmentCount               | Número de parcelas                              | Numérico (Inteiro)                 | N       | A quantidade de parcelas na qual a transação foi dividida                             |
| CustomerName                   | Nome do comprador                               | Alfanumérico                       | A       | O nome do comprador do produto                                                        |
| CustomerDocument               | Documento do comprador                          | Alfanumérico                       | A       | Documento de identificador do comprador (RG, CPF, etc.)                               |
| CustomerEmail                  | E-mail do comprador                             | Alfanumérico                       | A       | Endereço de e-mail do comprador                                                       |
| CardNumber                     | Número do cartão                                | Alfanumérico                       | A       | Número do cartão (crédito ou débito) utilizado na venda                               |
| Tid                            | TID                                             | Alfanumérico                       | A       | Identificador da transação ecommerce na Cielo, recebido pelo lojista                  |
| Nsu                            | NSU                                             | Número                             | N       | Número sequencial da transação na  Adquirente, recebido pelo lojista                  |
| IataAmount                     | Valor da taxa IATA                              | Número                             | N       | Valor da taxa IATA (apenas para setor aéreo), em centavos                             |
| PaymentMethodName              | Tipo de Integração                              | Alfanumérico                       | A       | Nome do meio de pagamento utilizado no caso da transação efetuada no  gateway Pagador |

1. As informações de venda são as transações enviadas pelo cliente do mundo físico, ou do  gateway/sistema transacional utilizado para efetuar as transações. São a primeira parte da conciliação. O Identificador Único da Venda pode ser utilizado para visualizar a venda no WebSite do Conciliador, preenchendo a URL:

> https://reconciliation.braspag.com.br/WebSite/Reports/TransactionDetails.aspx?SaleTransactionId=[ID]  

**OBS:**Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   

2. O identificador da Venda no Sistema Transacional é o Identificador da Transação que é utilizado pelo sistema que efetuou a venda, seja ele um Gateway ou Sistema de Caixa/POS. Este valor pode ou não ser fornecido durante a importação da venda para o Conciliador. É de responsabilidade do cliente a decisão de informá-lo ou não.   
3. O identificador da Filial deve ser fornecido pelo cliente toda vez que a importação de uma venda é realizada para o Conciliador. Apesar de não haver restrições para o formato do identificador da filial (campo Alfanumérico), é obrigatório que cada Filial possua um identificador único.   
4. O Gerenciamento do Número do Pedido é de inteira responsabilidade do lojista. O Conciliador apenas armazena esta informação, mas nenhum tipo de validação é feito.   
5. O Valor da Transação não é o valor das parcelas. O valor informado aqui é o valor integral da mesma, da forma como informado pelo cliente/gateway.

### Registro de Informação da Adquirente

| Campo                          | Nome                                                               | Tipo                              | Formato | Descrição                                                                                                           |
|--------------------------------|--------------------------------------------------------------------|-----------------------------------|---------|---------------------------------------------------------------------------------------------------------------------|
| TransactionId                  | Identificador Único da Transação no Conciliador                    | Identificador Único Global (GUID) | G       | Identificador Único das Informações da Adquirente1                                                                  |
| AffiliationCode                | Código de Afiliação                                                | Numérico                          | N       | O Código de Afiliação informado na venda do Extrato                                                                 |
| SummaryNumber                  | Número do Lote                                                     | Numérico (Inteiro)                | N       | O número do Lote (Resumo de Vendas) ao qual a transação pertence na Adquirente                                      |
| CardNumber                     | Número do Cartão                                                   | Alfanumérico                      | A       | O número do cartão usado na compra2                                                                                 |
| SaleDate                       | Data da Venda                                                      | Data                              | D       | A data em que a venda foi efetuada, segundo as informações do extrato                                               |
| TransactionGrossAmount         | Valor bruto da Transação                                           | Numérico (Inteiro)                | N       | Valor bruto da transação em centavos                                                                                |
| TransactionTaxAmount           | Valor da taxa de adquirência deduzido da transação                 | Numérico (Inteiro)                | N       | Valor deduzido do valor bruto da transação como taxa de adquirência, em centavos                                    |
| TransactionNetAmount           | Valor líquido da transação                                         | Numérico (Inteiro)                | N       | Valor que será recebido pelo lojista, após a dedução da taxa de Adquirência sobre o valor bruto, em centavos        |
| RoundingInstallmentGrossAmount | Valor bruto da parcela de arredondamento                           | Numérico (Inteiro)                | N       | Valor bruto da parcela de arredondamento, em centavos3                                                              |
| RoundingInstallmentTaxAmount   | Valor da taxa de adquirência deduzido da parcela de arredondamento | Numérico (Inteiro)                | N       | Valor deduzido do valor bruto da parcela de arredondamento como taxa de adquirência, em centavos                    |
| RoundingInstallmentNetAmount   | Valor líquido da parcela de arredondamento                         | Numérico (Inteiro)                | N       | Valor que será recebido pelo lojista como valor da parcela de arredondamento, após a dedução da taxa de adquirência |
| InstallmentsGrossAmount        | Valor bruto das demais parcelas                                    | Numérico (Inteiro)                | N       | Valor bruto das demais parcelas da transação,  em centavos                                                          |
| InstallmentsTaxAmount          | Valor da taxa de adquirência deduzido das demais parcelas          | Numérico (Inteiro)                | N       | Valor deduzido do valor bruto das demais parcelas como taxa de adquirência, em centavos                             |
| InstallmentsNetAmount          | Valor líquido das demais parcelas                                  | Numérico (Inteiro)                | N       | Valor que será recebido pelo lojista como valor das demais parcelas, após a dedução da taxa de  adquirência         |
| Tax                            | Taxa de adquirência                                                | Numérico (Inteiro)                | N       | A taxa de adquirência sobre a transação4                                                                            |
| Tid                            | TID                                                                | Alfanumérico                      | A       | O identificador da transação ecommerce na adquirente Cielo                                                          |
| Nsu                            | NSU                                                                | Numérico (Inteiro)                | N       | O número sequencial da transação na Adquirente                                                                      |
| IataAmount                     | Valor da taxa IATA                                                 | Numérico (Inteiro)                | N       | O valor da taxa IATA (apenas para setor aéreo), cobrado sobre a transação, em centavos                              |
| OrderId                        | Número do Pedido                                                   | Alfanumérico                      | A       | O Número do Pedido recebido pela adquirente durante a concretização da transação                                    |
| TerminalLogicNumber            | Número lógico do Terminal                                          | Alfanumérico                      | A       | O número do terminal utilizado para efetuar a transação                                                             |
| CaptureDate                    | Data de Captura                                                    | Data                              | D       | A data da captura da transação na Adquirente                                                                        |
| SummaryIdentifierNumber        | Identificador Único do Lote                                        | Numérico (Inteiro  Longo)         | N       | O identificador único do Lote (Resumo de Vendas) na adquirente Cielo                                                |
| InstallmentCount               | Quantidade de Parcelas                                             | Númerico (Inteiro)                | N       | A quantidade de parcelas na qual a transação foi dividida na Adquirente                                             |
| AuthorizationCode              | Código de Autorização                                              | Alfanumérico                      | A       | O código de autorização da transação informado pela adquirente                                                      |
| CaptureMethodId                | Identificador do Meio de  Captura                                  | Numérico (Inteiro)                | N       | O identificador do meio tecnológico utilizado para capturar a transação na Adquirente5                              |
| CaptureMethodDescription       | Descrição do Meio de Captura                                       | Alfanumérico                      | A       | A descrição do meio tecnológico utilizado para capturar a transação na   Adquirente5                                |
| CardBrandId                    | Identificador da Bandeira                                          | Numérico (Inteiro)                | N       | O identificador da bandeira do cartão utilizado para efetuar a  transação6                                          |
| CardBrand                      | Nome da Bandeira                                                   | Alfanumérico                      | A       | O nome da bandeira do cartão utilizado para efetuar a transação6                                                    |
| CardTypeId                     | Identificador do tipo do cartão                                    | Numérico (Inteiro)                | N       | O identificador do tipo do cartão: - 1: Debit - 2: Credit                                                           |
| CardType                       | Tipo de cartão                                                     | Alfanumérico                      | A       | O nome do tipo do cartão utilizado para efetuar a transação                                                         |
| ProductIdentifierCode          | Código de Identificação do   Produto na Cielo                      | Numérico (Inteiro)                | N       | O código que identifica o   Produto da Adquirente Cielo utilizado para efetuar a transação7                         |
| ProductIdentifierDescription   | Descrição do Produto na Cielo                                      | Alfanumérico                      | A       | A descrição do Produto na Adquirente Cielo utilizado para efetuar a  transação7                                     |
| PixId | ID Pix | Alfanumérico | A | O identificador inicial gerado no momento da transação. |
| OriginalPixId | ID Pix Original | Alfanumérico | A | Gerado para identificar a transação original. |

1. As informações da adquirente são os dados da venda que o Conciliador recebe dos extratos eletrônicos, o meio de integração da adquirente com os sistemas externos. São a segunda parte da conciliação. O Identificador Único da Transação pode ser utilizado para visualizar a venda no WebSite do Conciliador, preenchendo a URL:   

> https://reconciliation.braspag.com.br/WebSite/Reports/TransactionDetails.aspx?AcquirerTransactionId=[ID]   

Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   

2. Devido à restrições de segurança, o número do cartão será informado de forma mascarada.   
3. Quando uma transação é dividida em uma quantidade de parcelas onde o valor não pode ser distribuído igualmente entre as parcelas, surge a necessidade de colocar um valor extra em uma parcela específica. Esta parcela é chamada de parcela de arredondamento. Como exemplo, podemos adotar uma transação de R$ 100,00 dividida em três parcelas. Se a primeira parcela for a parcela de arredondamento, ela terá o valor de R$ 33,34 – enquanto as duas outras parcelas terão o valor de R$ 33,33.   
4. A taxa de adquirência normalmente é expressa em porcentagem. O campo demonstra essa porcentagem multiplicada por 100. Portanto, se o valor deste campo for expresso como 275, isto indica uma taxa de adquirência de 2,75%.   
5. Tabelas com os meios de captura informados estão disponíveis no Apêndice do Manual.   
6. Uma tabela com as bandeiras disponíveis está disponível no Apêndice do Manual.   
7. Uma tabela com os tipos de produto está disponível no Apêndice do Manual.   

### Registro de Evento

| Campo                       | Nome                                        | Tipo               | Formato | Descrição                                                                                                             |
|-----------------------------|---------------------------------------------|--------------------|---------|-----------------------------------------------------------------------------------------------------------------------|
| EventId                     | Identficador Único do Evento no Conciliador | Identificador Único Global  (GUID)     | G       | O identificador único do do  Evento no Conciliador2                                               |
| EventDate                   | Data do evento                              | Data               | D       | A data em que o evento está previsto para ser realizado, ou a data em que foi realizado (no caso de evento realizado) |
| CategoryId                  | Identificador da Categoria de  Evento       | Numérico (Inteiro) | N       | O identificador da categoria do evento3                                                                               |
| Category                    | Descrição da Categoria de  Evento           | Alfanumérico       | A       | A descrição da categoria do evento3                                                                                   |
| TypeId                      | Identificador do Tipo de Evento             | Numérico (Inteiro) | {N}     | 1 = Realizado<br>2 = Previsto<br>3 = Pendente                                                                         |
| Type                        | Descrição do Tipo de Evento                 | Alfanumérico       | A       | “Preview”, “Realized” ou “Pending” (Previsto, realizado ou pendente)                                                  |
| AffiliationCode             | Código de Afiliação                         | Numérico           | N       | O código de afiliação do estabelecimento no qual o evento foi executado                                               |
| TransactionInstallment      | Parcela da Transação                        | Numérico           | N       | A parcela da transação a qual o evento se refere4                                                                     |
| GrossAmount                 | Valor Bruto                                 | Numérico           | N       | O valor financeiro do evento contemplado, antes da dedução da taxa de adquirência, em centavos                        |
| NetAmount                   | Valor Líquido                               | Numérico           | N       | O valor líquido do evento, após a redução da taxa de adquirência, em centavos                                         |
| TaxAmount                   | Valor da Taxa                               | Numérico           | N       | O valor da taxa de adquirência sobre o evento, em centavos                                                            |
| Bank                        | Banco                                       | Numérico           | N       | O código do banco do domicílio bancário sobre o qual o evento financeiro é ou será lançado                            |
| Agency                      | Agência                                     | Numérico           | N       | O código da agência do domicílio bancário sobre o qual o evento financeiro é ou será lançado                          |
| Account                     | Número da Conta                             | Alfanumérico       | A       | O número da conta do domicílio bancário sobre o qual o evento financeiro é ou será lançado                            |
| AcquirerAdjustCode          | Código do Ajuste                            | Alfanumérico       | A       | O código que identifica o tipo de ajuste (apenas para eventos de ajustes)                                             |
| AcquirerAdjustDescription   | Descrição do Ajuste                         | Alfanumérico       | A       | A descrição do ajuste (apenas para eventos de ajustes)                                                                |
| AnticipationOperationNumber | Número da Operação de  Antecipação na Cielo | Numérico           | N       | O número da Operação de Antecipação (apenas para eventos derivados de antecipações na Cielo)                          |
| OriginalPaymentDate         | Data original de pagamento                  | Data               | D       | A data original para a qual o evento de pagamento estava previsto (apenas para eventos de antecipações)               |
| PixId | ID PIX | Alfanumérico | A | O identificador inicial gerado no momento da transação. |
| OriginalPixId | ID PIX Original | Alfanumérico | A | Gerado para identificar a transação original. |

## Meios de Captura

### Cielo

| Código/Identificador | Descrição           |
|----------------------|---------------------|
| 1                    | POS                 |
| 2                    | PDV/TEF             |
| 3                    | E-Commerce          |
| 4                    | EDI                 |
| 5                    | ADP/BSP             |
| 6                    | Manual              |
| 7                    | URA/CVA             |
| 8                    | Mobile              |
| 9                    | Moedeiro Eletrônico |

### Amex

| Código/Identificador | Descrição                           |
|----------------------|-------------------------------------|
| 1                    | Rede AE – Manual                    |
| 2                    | Rede AE – EDI                       |
| 3                    | Rede AE – BSP                       |
| 4                    | Rede AE – TEF                       |
| 11                   | Cielo – POS                         |
| 12                   | Cielo – TEF                         |
| 13                   | Cielo – Autorização Manual          |
| 14                   | Cielo – URA                         |
| 15                   | Cielo – EDI                         |
| 16                   | Cielo – GDS                         |
| 17                   | Cielo – E-Commerce                  |
| 18                   | Cielo – Mobile                      |
| 99                   | Legado – Versão anterior do extrato |

### Rede

| Código/Identificador | Descrição        |
|----------------------|------------------|
| 1                    | Manual           |
| 2                    | POS              |
| 3                    | PDV              |
| 4                    | TO               |
| 5                    | Internet         |
| 6                    | Leitor de Trilha |
| 9                    | Outros           |

### GetNet

| Código/Identificador | Descrição |
|----------------------|-----------|
| 0                    | TEF       |
| 1                    | POS       |
| 2                    | Manual    |
| 3                    | Internet  |

### Outros

A tabela abaixo é valida para:

* Stone
* Global Payments
* First Data
* Ticket
* Sodexo

**Observação:** Para a adquirente Losango o campo é enviado “vazio"

| Código/Identificador | Descrição  |
|----------------------|------------|
| 0                    | N/D        |
| 1                    | N/A        |
| 2                    | POS        |
| 3                    | PDV/TEF    |
| 4                    | E-Commerce |
| 5                    | EDI        |
| 6                    | Manual     |
| 7                    | Mobile     |
| 8                    | Outros     |

## Bandeiras

| Código/Identificador | Descrição               |
|----------------------|-------------------------|
| 0                    | Desconhecido/Indefinido |
| 1                    | VISA                    |
| 2                    | Mastercard              |
| 3                    | ELO                     |
| 4                    | Diners                  |
| 5                    | Cabal                   |
| 6                    | Hipercard               |
| 7                    | Amex                    |
| 8                    | Sicred                  |
| 9                    | Cup                     |
| 10                   | Agiplan                 |
| 11                   | Banesecard              |
| 12                   | SoroCred                |
| 13                   | CredSystem              |
| 14                   | Esplanada               |
| 15                   | CredZ                   |
| 16                   | Losango                 |
| 17                   | AVista                  |
| 18                   | Hiper                   |
| 19                   | JCB                     |
| 20                   | Aura                    |
| 21                   | Alelo                   |
| 22                   | Ticket                  |
| 23                   | Sodexo                  |

## Tipos de Produtos

### Cielo

| Código/Identificador | Descrição                          |
|----------------------|------------------------------------|
| 1                    | Agiplan crédito à vista            |
| 2                    | Agiplan parcelado loja             |
| 3                    | Banescard crédito à vista          |
| 4                    | Banescard parcelado loja           |
| 5                    | Esplanada crédito à vista          |
| 6                    | CredZ crédito à vista              |
| 7                    | Esplanada parcelado loja           |
| 8                    | Credz parcelado loja               |
| 9                    | Elo Crediário                      |
| 10                   | MasterCard crédito à vista         |
| 11                   | Maestro                            |
| 12                   | MasterCard parcelado loja          |
| 13                   | Elo Construcard                    |
| 14                   | Elo Agro Débito                    |
| 15                   | Elo Agro Custeio                   |
| 16                   | Elo Agro Investimento              |
| 17                   | Elo Agro Custeio + Débito          |
| 18                   | Elo Agro Investimento + Débito     |
| 19                   | Discover crédito à vista           |
| 20                   | Diners crédito à vista             |
| 21                   | Diners parcelado loja              |
| 22                   | Agro Custeio + Electron            |
| 23                   | Agro Investimento + Electron       |
| 24                   | FCO Investimento                   |
| 25                   | Agro Electron                      |
| 26                   | Agro Custeio                       |
| 27                   | Agro Investimento                  |
| 28                   | FCO Giro                           |
| 29                   | Visa crediário no crédito          |
| 30                   | Visa parcelado cliente             |
| 31                   | Pré-pago Visa Débito               |
| 32                   | Pré-pago Visa Crédito              |
| 33                   | JCB                                |
| 35                   |Pré-pago Visa Carnê                 |
| 36                   | Saque com cartão de Débito VISA    |
| 37                   | Flex Car Visa Vale                 |
| 38                   | CredSystem crédito à vista         |
| 39                   | CredSystem parcelado loja          |
| 40                   | Visa Crédito à Vista               |
| 41                   | Visa Electron Débito à Vista       |
| 42                   | Visa Pedágio                       |
| 43                   | Visa Parcelado Loja                |
| 44                   | Visa Electron Pré-Datado           |
| 45                   | Alelo Refeição (Bandeira Visa/Elo) |
| 46                   |Alelo Alimentação (Visa)            |
| 58                   | Alelo Multibenefícios              |
| 59                   | Alelo Auto                         |
| 60                   | Sorocred débito à vista            |
| 61                   | Sorocred crédito à vista           |
| 62                   | Sorocred parcelado loja            |
| 64                   | Visa Crediário                     |
| 65                   | Alelo Refeição (Elo)               |
| 66                   | Alelo Alimentação (Elo)            |
| 67                   | Visa Capital de Giro               |
| 68                   | Visa Crédito Imobiliário           |
| 69                   | Alelo Cultura                      |
| 70                   | Elo crédito a vista                |
| 71                   | Elo débito à vista                 |
| 72                   | Elo parcelado loja                 |
| 73                   | Pré-pago Visa Cash                 |
| 79                   | Pagamento Carnê Visa Electron      |
| 80                   | Visa Crédito Conversor de Moeda    |
| 81                   | Mastercard Crédito Especializado (*)|
| 82                   | Amex crédito à vista               |
| 83                   | Amex parcelado loja                |
| 84                   | Amex parcelado banco               |
| 89                   | Elo Crédito Imobiliário            |
| 91                   | Elo Crédito Especializado (*)      |
| 94                   | Banescard Débito                   |
| 96                   | Cabal crédito à vista              |
| 97                   | Cabal débito à vista               |
| 98                   | Cabal parcelado loja               |
| 107                  | Pré-pago Master Carnê              |
| 110                  | Pré-pago Master Crédito            |
| 111                  | Pré-pago Master Débito             |
| 161                  | Hiper crédito à vista              |
| 162                  | Hiper débito à vista               |
| 163                  | Hiper parcelado loja|
| 164                  | Hipercard crédito à vista|
| 165                  | Hipercard parcelado loja|
| 200                  | Verdecard crédito a vista|
| 201                  | Verdecard parcelado loja|
| 202                  | Nutricash Alimentação|
| 203                  | Nutricash Refeição|
| 204                  | Nutricash Multibenefícios|
| 205                  | Nutricash Combustível|
| 206                  | Ben Alimentação|
| 207                  | Ben Refeição|
| 269                  | Pré-pago Elo Carnê|
| 270                  | Pré-pago Elo Crédito|
| 271                  | Pré-pago Elo Débito|
| 314                  | Ourocard Agro débito|
| 315                  | Ourocard Agro custeio|
| 316                  | Ourocard Agro investimento|
| 317                  | Ourocard Agro custeio + débito|
| 318                  | Ourocard Agro investimento + débito|
| 321                  | Mastercard crediário no crédito|
| 322                  | Mastercard parcelado cliente|
| 324                  | Elo parcelado cliente|
| 330                  | Elo crediário no crédito|
| 342                  | Mastercard Pedágio|
| 377                  | Elo Carnê|
| 378                  | Mastercard Carnê|
| 380                  | Mastercard Crédito Conversor de Moeda|
| 433                  | JCB parcelado loja|

### Getnet

| Código/Identificador | Descrição                        |
|----------------------|----------------------------------|
| 1                    | Título                           |
| 2                    | Convênio                         |
| 3                    | Crédito Digital                  |
| 9 | Elo crediário |
| 11 | Mastercard débito |
| 12 | Mastercard crédito |
| 41 | Visa débito |
| 43 | Visa crédito |
| 64 | Visa crediário |
| 71 | Elo débito |
| 72 | Elo crédito |
| 83 | Amex crédito |
| 165 | Hiper/Hipercard crédito |
| 321 | Mastercard crediário |
| 378 | Mastercard débito - Pagamento carnê |
| 507 | Hiper/Hipercard crediário |
| 509 | Visa débito - Pagamento carnê |
| 510 | Elo débito - Pagamento carnê |
| 511 | Mastercard crédito BNDES |
| 512 | Visa crédito BNDES |
| 513 | Amex crediário |
| 10074 | Titulo |
| 10075 | Convênio |
| 10076 | Crédito Digital |
| 10077 | Cupom Eletrônico |
| 10078 | Cupom Papel |
| 10079 | Pagamento Recorrente|
| 00/CE                | Cupom Eletrônico                 |
| CP                   | Cupom Papel                      |
| SM                   | Cartão de Crédito MASTERCARD     |
| SV                   | Cartão de Crédito VISA           |
| SR                   | Cartão de Débito MAESTRO         |
| SE                   | Cartão de Débito VISA ELECTRON   |
| PV                   | Pagamento Carnê – Débito VISAELECTRON |
| PM                   | Pagamento Carnê – Débito MAESTRO |
| PR                   | Pagamento Recorrente             |

### Redecard

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 3 | EEVC Banescard crédito à vista |
| 3 | EEFI Banescard crédito à vista |
| 4 | EEVC Banescard parcelado loja |
| 4 | EEFI Banescard parcelado loja |
| 6 | EEVC Credz crédito à vista |
| 6 | EEFI Credz crédito à vista |
| 8 | EEVC Credz parcelado loja |
| 8 | EEFI Credz parcelado loja |
| 10 | EEFI Mastercard crédito à vista |
| 10 | EEVC Mastercard crédito à vista |
| 11 | EEVD Maestro débito |
| 11 | EEVD Maestro |
| 12 | EEFI Mastercard parcelado loja |
| 12 | EEVC Mastercard parcelado loja |
| 20 | EEVC Diners crédito à vista |
| 20 | EEFI Diners crédito à vista |
| 21 | EEFI Diners parcelado loja |
| 21 | EEVC Diners parcelado loja |
| 33 | EEFI JCB |
| 33 | EEVD JCB |
| 33 | EEVC JCB |
| 38 | EEVC Credsystem crédito à vista |
| 38 | EEFI Credsystem crédito à vista |
| 39 | EEVC Credsystem parcelado loja |
| 39 | EEFI Credsystem parcelado loja |
| 40 | EEFI Visa crédito à vista |
| 40 | EEVC Visa crédito à vista |
| 41 | EEVD Visa débito |
| 42 | EEFI Visa parcelado loja |
| 43 | EEVC Visa parcelado loja |
| 60 | EEVC Sorocred crédito à vista |
| 60 | EEFI Sorocred crédito à vista |
| 62 | EEVC Sorocred parcelado loja |
| 62 | EEFI Sorocred parcelado loja |
| 70 | EEVC Elo crédito a vista |
| 70 | EEFI Elo crédito a vista |
| 71 | EEVD Elo débito à vista |
| 72 | EEVC Elo parcelado loja |
| 72 | EEFI Elo parcelado loja |
| 82 | EEVC Amex crédito à vista |
| 82 | EEFI Amex crédito à vista |
| 83 | EEVC Amex parcelado loja |
| 83 | EEFI Amex parcelado loja |
| 94 | EEVD Banescard Débito |
| 96 | EEFI Cabal crédito à vista |
| 96 | EEVC Cabal crédito à vista |
| 97 | EEVD Cabal débito |
| 98 | EEVC Cabal parcelado loja |
| 98 | EEFI Cabal parcelado loja |
| 161 | EEVC Hiper crédito à vista |
| 161 | EEFI Hiper crédito à vista |
| 162 | EEVD Hiper débito à vista |
| 163 | EEVC Hiper parcelado loja |
| 163 | EEFI Hiper parcelado loja |
| 164 | EEFI Hipercard crédito à vista |
| 164 | EEVC Hipercard crédito à vista |
| 165 | EEVC Hipercard parcelado loja |
| 165 | EEFI Hipercard parcelado loja |
| 433 | EEFI JCB |
| 433 | EEVC JCB |
| 501 | EEVD Hipercard débito |
| 506 | EEVD Diners débito |

### Stone

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 1                    | Crédito Visa       |
| 2                    | Crédito Master     |
| 4                    | Crédito Elo        |
| 10                   | Mastercard crédito à vista |
| 11                   | Mastercard débito |
| 12                   | Mastercard crédito parcelado |
| 15                   | Crédito Hipercard  |
| 29                   | Visa Crediário
| 30                   | Visa parcelado cliente
| 35                   | Mastercard Maestro |
| 36                   | Visa Electron      |
| 38                   | Débito Elo         |
| 39                   | Débito Hipercard   |
| 40                   | Visa crédito à vista |
| 41                   | Visa débito |
| 43                   | Visa crédito parcelado |
| 70                   | Elo crédito à vista |
| 71                   | Elo débito |
| 72                   | Elo crédito parcelado |
| 82                   | Amex crédito à vista |
| 83                   | Amex crédito parcelado |
| 84                   | Amex parcelado banco |
| 96                   | Cabal crédito à vista |
| 97                   | Cabal débito |
| 98                   | Cabal crédito parcelado |
| 164                  | Hipercard crédito à vista |
| 165                  | Hipercard crédito parcelado |
| 321                  | Mastercard crediário |
| 322                  | Mastercard parcelado cliente |
| 324                  | Elo parcelado cliente |
| 330                  | Elo Crediário |
| 501                  | Hipercard débito |
| 502                  | Amex débito |
| 503                  | Cabal débito |
| 504                  | Cabal crédito parcelado |
| 505                  | Cabal crédito à vista |
| 507                  | Hipercard crediário |
| 513                  | Amex crediário |

### Global Payments

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 1                    | Crédito Visa       |
| 2                    | Crédito Master     |
| 35                   | Mastercard Maestro |
| 36                   | Visa Electron      |

### First Data

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 1                    | Crédito Visa       |
| 2                    | Crédito Master     |
| 4                    | Crédito Elo        |
| 11                   | Crédito Cabal      |
| 35                   | Mastercard Maestro |
| 36                   | Visa Electron      |
| 37                   | Débito Cabal       |
| 38                   | Débito Elo         |

### Ticket

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 24                   | Ticket Refeição    |
| 25                   | Ticket Alimentação |
| 26                   | Ticket Parceiro    |
| 27                   | Ticket Cultura     |

### Sodexo

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 28                   | Sodexo Refeição    |
| 29                   | Sodexo Alimentação |
| 30                   | Sodexo Gift        |
| 31                   | Sodexo Premium     |
| 32                   | Sodexo Cultura     |

## Categorias de Evento

|Identificador| Descrição|
|:-----------:|---|
|1| Ajuste|
|2| POS|
|3| Captura|
|4| Pagamento|
|5| Pgto. Lote|
|6| Aceleração|
|7| Desagendamento|
|8| Estorno|
|9| Chargeback|
|10| Antecipação|
|11| Antecip. Lote|
|12| Ajuste Lote|
|13| Reagendamento|
|14| Custo de Operação de Antecipação|
|15| Valor Retido|
|16| Pagamento de Valor Retido|
|17| Débito de Valor Retido|
|18| Ajustes Antecipados|
|19| Arredondamento de Parcelas|
|20| Estorno Antecipado|
|21| Ajuste Indefinido|
|22| Débito Acumulado|
|23| Pagamento de Vendas Antecipadas|
|24| Débito de Antecipação de Vendas|
|25| Pagamento de Aceleração Antecipada|
|26| Débito de Antecipação de Aceleração|
|27| Credit Voucher|
|28| Antecipação de Credit Voucher|
|29| Antecipação de Chargeback|
|30| Antecipação de Aluguel de POS|
|31| Antecipação de Ajustes Lote|
|32| Antecipação de Estornos Lote|
|33| Antecipação de Chargeback Lote|
|34| Débito de Cessão|
|35| Débito de Gravame|
|36| Cessão fumaça|
|37| Crédito de Cessão|
|38| Débito/crédito compensação de valores|
|39| Estorno débito/crédito de cessão|
|40| Estorno débito/crédito de gravame|
|41| Débito/crédito compensação cancelamento de transação em operação|
|42| Débito/crédito de penhora|
|43| Estorno de crédito/débito de penhora|
|44| Débito/crédito compensação cancelamento em operação|
|45| Crédito de Gravame|

## Webservice Conciliador    

Webservice é uma solução para integrar aplicações.
Por meio dele, qualquer sistema pode se conectar para consultar ou inserir dados. Atualmente no Webservice do Conciliador é possível enviar o arquivo de vendas externas e baixar o conteúdo dos Arquivos de Fluxo de Caixa.    

Inicialmente o acesso deverá ser liberado pela equipe de operações, através do e-mail, senha e o cadastro dos IPs informados pelo estabelecimento.    

O Webservice está disponível através da URL:

> https://reconciliation.braspag.com.br/WebServices/ReconciliationFilesWebService.asmx   

**Método:** GetExportedFileV2

### Request

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rec="https://reconciliation.braspag.com.br">   
   <soapenv:Header/>   
   <soapenv:Body>   
      <rec:GetReconciliationFile>   
         <rec:request>   
            <rec:RequestId>[Guid aleatório]</rec:RequestId>   
            <rec:RequestingUserName>[Login do usuário da loja]</rec:RequestingUserName>   
            <rec:MerchantId>[Identificador da loja, fornecido pela Braspag]</rec:MerchantId>   
            <rec:AcquirerId>[Identificador da adquirente]</rec:AcquirerId>   
            <rec:RequestingPassword>[Senha do usuário da loja]</rec:RequestingPassword>   
            <rec:ReferenceDate>[Data de referência do arquivo]</rec:ReferenceDate>   
            <rec:FileExtensionType>[Extensão do arquivo]</rec:FileExtensionType>   
            <rec:FileType>[Tipo do arquivo]</rec:FileType>   
         </rec:request>   
      </rec:GetReconciliationFile>   
   </soapenv:Body>  
```

| Descritor          | Significado                                | Exemplo                                              |
|--------------------|--------------------------------------------|------------------------------------------------------|
| RequestId          | Identificador Único Global (GUID)          | 4749e676-2507-442da1c6c25c08e2d2af                   |
| RequestingUserName | Login do usuário da loja                   | user@braspag.com.br                                  |
| MerchantId         | Identificador da loja no Conciliador       | 123                                                  |
| AcquirerId         | Identificador da adquirente                | 1=Cielo<br>2=Rede<br>3=Amex<br>4=Losango<br>5=Getnet |
| RequestingPassword | Senha do usuário da loja                   | Braspag@2015                                         |
| ReferenceDate      | Data de referência do Arquivo (yyyy-mm-dd) | 12/06/2015                                           |
| FileExtensionType  | Formato do Arquivo                         | 1=CSV <br> 2=XML                                     |
| FileType           | Tipo de Arquivo                            | 1=Arquivo de Conciliação                             |

### Response

``` xml

--Bem sucedido

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">    <soap:Body>   
      <GetReconciliationFileResponse xmlns="https://reconciliation.braspag.com.br">   
         <GetReconciliationFileResult>   
            <CorrelatedId>124be5db-a809-47e1-b456-1f2e103caa17</CorrelatedId>   
            <Success>true</Success>               <ErrorReportCollection/>   
            <FileContent> QXJxdWl2byBkZSB0ZXN0ZSBjb25jaWxpYWRvcg==</FileContent>   
         </GetReconciliationFileResult>   
      </GetReconciliationFileResponse>   
   </soap:Body>   
</soap:Envelope>   
```

``` xml

-- Mal Sucedida   

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">    <soap:Body>   
      <GetReconciliationFileResponse xmlns="https://reconciliation.braspag.com.br">   
         <GetReconciliationFileResult>   
            <CorrelatedId>124be5db-a809-47e1-b456-1f2e103caa17</CorrelatedId>   
            <Success>false</Success>   
            <ErrorReportCollection>   
               <ErrorReport>   
                  <Code>44</Code>   
                  <Message>Acesso não autorizado do IP para a loja fornecida na requisição.</Message></ErrorReport>   
            </ErrorReportCollection>   
         </GetReconciliationFileResult>   
      </GetReconciliationFileResponse>   
   </soap:Body>   
</soap:Envelope>   
```

| Descritor             | Descrição                                                                                      | Exemplo                                                                                                                               |
|-----------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| CorrelatedId          | GUID enviado na requisição                                                                     | 4749e676-2507-442d-a1c6-c25c08e2d2af                                                                                                  |
| Success               | Indica se a operação foi concluída.                                                            | false/true                                                                                                                            |
| ErrorReportCollection | Coleção de erros que será  retornada em caso de Sucess="false"                                 | ErrorReport.Code = 39,ErrorReport.Message  = “Erro interno do sistema”.                                                               |
| ErrorReport.Code      | Código de erros para  Sucess="false"                                                           | 39/44/46                                                                                                                              |
| ErrorReport.Message   | Mensagem de erro correspondente ao código informado                                            | 39 - Erro interno do sistema.<br>44 - Acesso não autorizado, IP não cadastrado<br>46 - Usuário incorreto, e/ou não tem acesso a loja. |
| FileContent           | Para requisições com Sucess="true", será enviado o conteúdo binário codificado na base64 UTF-8 | QXJxdWl2byBkZSB0ZXN0ZSBjb25jaWxpYWRvcg==                                                                                              |

## Apêndice

### Utilizando o arquivo de Schema Definition (XSD)   

Uma forma de integração com o Arquivo de Fluxo de Caixa do Conciliador no formato XML de maneira programada ou automática, é feita através do arquivo de definição de esquema, ou `XML Schema Definition File`.   

O XML Schema é uma linguagem baseada no formato XML para definição de regras de validação ("esquemas") em documentos no formato XML. Foi a primeira linguagem de esquema para XML que obteve recomendação por parte do **W3C**. Esta linguagem é uma alternativa ao **DTD**, cuja sintaxe não é baseada no formato XML.   
Foi amplamente utilizado para desenvolvimento da NF-e (Nota Fiscal Eletrônica) Brasileira.   

Um arquivo contendo as definições na linguagem XML Schema é chamado de **XSD (XML Schema Definition)**, este descreve a estrutura de um documento XML.   

O conciliador possui arquivos XSD para cada um de seus arquivos em XML. Desta forma, é possível, programaticamente compreender a estrutura do XML, supondo que o arquivo XSD seja corretamente interpretado pela ferramenta.   

Neste manual, não serão citadas todas as formas de se trabalhar com o arquivo, entretanto, podemos demonstrar, através da utilização de uma ferramenta provida pela IDE de desenvolvimento Visual Studio, como gerar, programaticamente uma Classe em código-fonte que pode representar o conteúdo do arquivo.   

Desta forma, será possível deserializar o conteúdo de qualquer arquivo dentro desta classe, e com isto utilizar os arquivos de conciliação em um sistema com código orientado a objetos.   

Criando a classe do arquivo por meio do arquivo de definição de esquema   
Com os arquivos de definição de esquema, você deverá utilizar uma ferramenta que pode ser acessada à partir da linha de comando da IDE do Visual Studio (Visual Studio Command Prompt). O nome do executável é “xsd” (sem aspas).   

O executável possui uma série de parâmetros para customizar a geração da sua classe a partir do arquivo de definição de esquema. Caso você queira ver todas as opções, consulte a URL https://msdn.microsoft.com/en-us/library/x6c1kb0s(v=VS.100).aspx.   
No exemplo abaixo, utilizamos o comando para gerar a classe da forma mais básica. Acesse o diretório onde os arquivos de esquemas estão salvos(normalmente são dois arquivos, “ConciliationFile.xsd” e “Guid.xsd”), usando o comando CD do DOS.   Uma vez dentro deste diretório, basta executar o comando conforme abaixo:
xsd  

ConciliationFile.xsd Guid.xsd /classes   

Um exemplo do efeito disto na linha de commando é demonstrado na imagem abaixo. A classe gerada terá o nome
**“ConciliationFile_Guid.cs”**.
Esta classe pode ser inserida em um projeto na linguagem C#, e com algumas alterações pode representar o conteúdo do arquivo por meio de deserialização.   
Consulte o suporte de sua linguagem de desenvolvimento para verificar se a mesma possui algum tipo de automatização para interpretar a leitura do arquivo em XML. Isto pode facilitar seu processo de desenvolvimento e aprendizado do layout do mesmo

![xml20](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/xml20.png)

# Arquivos Fluxo de Caixa 2.0 - CSV
Este manual tem como objetivo orientar o desenvolvimento do Arquivo de Fluxo de Caixa da plataforma conciliador no formato CSV, e a extração do seu conteúdo através do Webservice.

## Legenda para os tipos de formato

| Descritor | Significado                         | Exemplo                              |
|-----------|-------------------------------------|--------------------------------------|
| N         | Um ou mais algarismos (0 a 9)       | 243                                  |
| A         | Um ou mais caracteres alfanuméricos | Texto                                |
| {N}       | Um  único algarismo (0 a 9)         | 2                                    |
| {A}       | Um único caractere alfanumérico     | B                                    |
| HH        | Hora em campo data/hora (0 a 23)    | 22                                   |
| mm        | Minuto em campo data/hora (0 a 59)  | 23                                   |
| ss        | Segundo em campo data/hora (0 a 59) | 35                                   |
| dd        | Dia em campo data/hora (1 a 31)     | 28                                   |
| MM        | Mês em campo data/hora (1 a 12)     | 10                                   |
| yyyyy     | Ano em campo data/hora              | 2015                                 |
| G         | Identificador Único Global (GUID)1  | 4749e676-2507-442d-a1c6-c25c08e2d2af |

1. Um Identificador Único Global ou GUID (do inglês, Globally Unique IDentifier) é um tipo especial de identificador utilizado em aplicações de software para providenciar um número de referência padrão mundial. Como, por exemplo, em uma definição de referência interna para um tipo de ponto de acesso em uma aplicação de software ou para a criação de chaves únicas em um banco de dados. O número total de chaves únicas (2128 ou ~3.4×1038) é tão grande que a probabilidade do mesmo número se repetir é muito pequena. Considerando que o Universo Observável contém 5x1022 estrelas, cada estrela poderia ter ~6.8×1015 dos seus próprios GUIDs. Caso seu sistema não reconheça o formato GUID, poderá trata-lo como texto

## Informações sobre as adquirentes

O principal insumo do Conciliador são os extratos eletrônicos gerados pelas adquirentes. Devido a isso, podem existir particularidades entre cada uma.      
Abaixo a estimativa de dias em que a adquirente envia os eventos no extrato eletrônico.    

### Prazo de registro no extrato eletrônico (Tabela II)

| Adquirente    | Captura                                         | Pagamento       | Observação                                                                                                                                                  |
|---------------|-------------------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cielo         | D+1                                             | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Rede          | D+1                                             | D -1            | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Amex          | Entre D+1 à  D+2                                | Entre D-4 à D-6 | *Desconsiderar do prazo a segunda feira, pois os extratos  não são gerados. Nestes dias o arquivo do Conciliador será disponibilizado somente com o header. |
| GetNet        | D+1                                             | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Ticket        | D+30 ajustada ao dia de recebimento do cliente  | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Sodexo        | D+30 ajustada ao dia de recebimento do cliente  | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| Stone         | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| GlobalCollect | Cartão de Débito: D+1 - Cartão de Crédito: D+30 |                 | Pagamentos são realizados de Segunda à Sexta                                                                                                                |
| FirstData     | Cartão de Débito: D+1 - Cartão de Crédito: D+30 | D               | Pagamentos são realizados de Segunda à Sexta                                                                                                                |

### Registro Header (Tabela III)   

| Campo                                  | Tipo               | Formato        | Descrição                                                                                                                              |
|----------------------------------------|--------------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Identificador do Registro              | Numérico (Inteiro) | N              | Constante com valor 1                                                                                                                  |
| Identificador da Loja                  | Numérico (Inteiro) | N              | Contém o identificador único da loja no Conciliador                                                                                    |
| Identificador da Adquirente            | Numérico (Inteiro) | {N}            | 1 = Cielo<br>2 = Redecard<br>3 = Amex<br>5 = Getnet<br>6 = Ticket<br>7 = Stone<br>8 = Sodexo<br>9 = Global Payments<br>10 = First Data |
| Geração do arquivo                     | Data/Hora          | ddMMyyyyHHmmss | Contém a data e a hora da geração do arquivo pelo Conciliador                                                                          |
| Período inicial                        | Data               | ddMMyyyy       | Data inicial do período de conciliação contemplado pelo arquivo                                                                        |
| Período final                          | Data               | ddMMyyyy       | Data final do período de conciliação contemplado pelo arquivo                                                                          |
| Número sequencial                      | Numérico (Inteiro) | N              | Número sequencial que indica a ordem de processamento dos arquivos diários                                                             |
| Identificador do tipo de processamento | Numérico (Inteiro) | {N}            | 1 = Arquivo diário  <br> 2 = Arquivo reprocessado                                                                                      |
| Descrição do tipo de processamento     | Alfanumérico       | A              | “Daily” ou “Reprocessed” (Diário ou reprocessado)                                                                                      |
| Versão do arquivo                      | Alfanumérico       | A              | Versão do arquivo (“2.0”)                                                                                                              |

### Registro de Transação Conciliada (Tabela IV)

| Campo                                | Tipo               | Formato | Descrição                          |
|--------------------------------------|--------------------|---------|------------------------------------|
| Identificador do Registro            | Numérico (Inteiro) | N       | Constante com valor  2             |
| Identificador do tipo de conciliação | Numérico (Inteiro) | {N}     | 1   = Automática  <br>2   = Manual |
| Descrição do tipo de conciliação     | Alfanumérico       | A       | “Automatic” ou  “Manual”           |

### Registro de Conciliação Manual (Tabela V)

| Campo                                | Tipo               | Formato | Descrição                          |
|--------------------------------------|--------------------|---------|------------------------------------|
| Identificador do Registro            | Numérico (Inteiro) | N       | Constante com valor  9             |
| Usuario de conciliação manual        | Alfanumérico)      | A       | Login do usuario que efetuou a conciliação manual |
| Data e hora da conciliação manual    | Data/hora          | ddmmyyyyhhmmss       | Data e hora sm que a conciliação manual foi efeturada pelo usuário  |

### Registro de Informação de Venda (Tabela VI)

| Campo                                           | Tipo                               | Formato  | Descrição                                                                                                           |
|-------------------------------------------------|------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| Identificador do Registro                       | Numérico (Inteiro)                 | N        | Constante com valor 3                                                                                               |
| Identificador Único da  Venda no Conciliador    | Identificador Único  Global (GUID) | G        | Identificador único do Conciliador para as informações de venda1                                                    |
| Identificador da Venda no  Sistema Transacional | Alfanumérico                       | A        | Identificador da Venda obtido a partir do Sistema transacional no qual a transação foi processada com a Adquirente² |
| Identificador da Filial                         | Alfanumérico                       | A        | Identificador da Filial da loja que processou a venda3                                                              |
| Código de Afiliação                             | Alfanumérico                       | A        | O código de afiliação da adquirente, informado nos dados da venda do cliente                                        |
| Número do Pedido                                | Alfanumérico                       | A        | O número do pedido associado à venda no lojista4                                                                    |
| Código de Autorização                           | Alfanumérico                       | A        | O Código de Autorização da transação que o Lojista recebeu da Adquirente                                            |
| Data da Venda                                   | Data                               | ddMMyyyy | A data em que foi realizada a venda no lojista                                                                      |
| Data da Captura                                 | Data                               | ddMMyyyy | A data da captura recebida pelo lojista                                                                             |
| Valor da transação                              | Numérico (Inteiro)                 | N        | O valor da transação em centavos5                                                                                   |
| Número de parcelas                              | Numérico (Inteiro)                 | N        | A quantidade de parcelas na qual a transação foi dividida                                                           |
| Nome do comprador                               | Alfanumérico                       | A        | O nome do comprador do produto                                                                                      |
| Documento do comprador                          | Alfanumérico                       | A        | Documento de identificador do comprador (RG, CPF, etc.)                                                             |
| E-mail do comprador                             | Alfanumérico                       | A        | Endereço de e-mail do comprador                                                                                     |
| Número do cartão                                | Alfanumérico                       | A        | Número do cartão (crédito ou débito) utilizado na venda                                                             |
| TID                                             | Alfanumérico                       | A        | Identificador da transação e-commerce na Cielo, recebido pelo lojista                                               |
| NSU                                             | Número                             | N        | Número sequencial da transação na  Adquirente, recebido pelo lojista                                                |
| Valor da taxa IATA                              | Número                             | N        | Valor da taxa IATA (apenas para setor aéreo), em centavos                                                           |
| Tipo de Integração                              | Alfanumérico                       | A        | Nome do meio de pagamento utilizado no caso da transação efetuada no  gateway Pagador                               |

1. As informações de venda são as transações enviadas pelo cliente do mundo físico, ou do  gateway/sistema transacional utilizado para efetuar as transações. São a primeira parte da conciliação. O Identificador Único da Venda pode ser utilizado para visualizar a venda no WebSite do Conciliador, preenchendo a URL:   

> https://reconciliation.braspag.com.br/WebSite/Reports/TransactionDetails.aspx?SaleTransactionId=[ID]

Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   

2. O identificador da Venda no Sistema Transacional é o Identificador da Transação que é utilizado pelo sistema que efetuou a venda, seja ele um Gateway ou Sistema de Caixa/POS. Este valor pode ou não ser fornecido durante a importação da venda para o Conciliador. É de responsabilidade do cliente a decisão de informá-lo ou não.   
3. O identificador da Filial deve ser fornecido pelo cliente toda vez que a importação de uma venda é realizada para o Conciliador. Apesar de não haver restrições para o formato do identificador da filial (campo Alfanumérico), é obrigatório que cada Filial possua um identificador único.   
4. O Gerenciamento do Número do Pedido é de inteira responsabilidade do lojista. O Conciliador apenas armazena esta informação, mas nenhum tipo de validação é feito.   
5. O Valor da Transação não é o valor das parcelas. O valor informado aqui é o valor integral da mesma, da forma como informado pelo cliente/gateway.   

### Registro de Informação da Adquirente (Tabela VII)

| Campo                                                              | Tipo                               | Formato  | Descrição                                                                                                            |
|--------------------------------------------------------------------|------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| Identificador do Registro                                          | Numérico (Inteiro)                 | N        | Constante com valor 4                                                                                                |
| Identificador Único da  Transação no Conciliador                   | Identificador Único  Global (GUID) | G        | Identificador Único das  informações da Adquirente                                                                   |
| Código de Afiliação                                                | Numérico                           | N        | O Código de Afiliação informado na venda do Extrato.                                                                 |
| Número do Lote                                                     | Numérico (Inteiro)                 | N        | O número do Lote (Resumo de Vendas) ao qual a transação pertence na Adquirente.                                      |
| Número do Cartão                                                   | Alfanumérico                       | A        | O número do cartão usado na compra2                                                                                  |
| Data da Venda                                                      | Data                               | ddMMyyyy | A data em que a venda foi efetuada, segundo as informações do extrato.                                               |
| Valor bruto da Transação                                           | Numérico (Inteiro)                 | N        | Valor bruto da transação em centavos.                                                                                |
| Valor da taxa de adquirência deduzido da transação                 | Numérico (Inteiro)                 | N        | Valor deduzido do valor bruto da transação como taxa de adquirência, em centavos.                                    |
| Valor líquido da transação                                         | Numérico (Inteiro)                 | N        | Valor que será recebido pelo lojista, após a dedução da taxa de Adquirência sobre o valor bruto, em centavos.        |
| Valor bruto da parcela de arredondamento                           | Numérico (Inteiro)                 | N        | Valor bruto da parcela de arredondamento, em centavos3                                                               |
| Valor da taxa de adquirência deduzido da parcela de arredondamento | Numérico (Inteiro)                 | N        | Valor deduzido do valor bruto da parcela de arredondamento como taxa de adquirência, em centavos.                    |
| Valor líquido da parcela de arredondamento                         | Numérico (Inteiro)                 | N        | Valor que será recebido pelo lojista como valor da parcela de arredondamento, após a dedução da taxa de adquirência. |
| Valor bruto das demais parcelas                                    | Numérico (Inteiro)                 | N        | Valor bruto das demais parcelas da transação, em centavos.                                                           |
| Valor da taxa de adquirência deduzido das demais parcelas          | Numérico (Inteiro)                 | N        | Valor deduzido do valor bruto das demais parcelas como taxa de adquirência, em centavos.                             |
| Valor líquido das demais parcelas                                  | Numérico (Inteiro)                 | N        | Valor que será recebido pelo lojista como valor das demais parcelas, após a dedução da taxa de adquirência.          |
| Taxa de adquirência                                                | Numérico (Inteiro)                 | N        | A taxa de adquirência sobre a transação                                                                              |
| TID                                                                | Alfanumérico                       | A        | O identificador da transação ecommerce na adquirente Cielo.                                                          |
| NSU                                                                | Numérico (Inteiro)                 | N        | O número sequencial da transação na Adquirente                                                                       |
| Valor da taxa IATA                                                 | Numérico (Inteiro)                 | N        | O valor da taxa IATA (apenas para setor aéreo), cobrado sobre a transação, em centavos.                              |
| Número do Pedido                                                   | Alfanumérico                       | A        | O Número do Pedido recebido pela adquirente durante a concretização da transação.                                    |
| Número lógico do Terminal                                          | Alfanumérico                       | A        | O número do terminal utilizado para efetuar a transação.                                                             |
| Data de Captura                                                    | Data                               | ddMMyyyy | A data da captura da transação na Adquirente.                                                                        |
| Identificador Único do Lote                                        | Numérico (Inteiro  Longo)          | N        | O identificador único do Lote (Resumo de Vendas) na adquirente Cielo                                                 |
| Quantidade de Parcelas                                             | Númerico (Inteiro)                 | N        | A quantidade de parcelas na qual a transação foi dividida na Adquirente.                                             |
| Código de Autorização                                              | Alfanumérico                       | A        | O código de autorização da transação informado pela adquirente.                                                      |
| Identificador do Meio de  Captura                                  | Numérico (Inteiro)                 | N        | O identificador do meio  tecnológico utilizado para capturar a transação na   Adquirente5                            |
| Descrição do Meio de Captura                                       | Alfanumérico                       | A        | A descrição do meio tecnológico utilizado para capturar a transação na  Adquirente5                                  |
| Identificador da Bandeira                                          | Numérico (Inteiro)                 | N        | O identificador da bandeira do cartão utilizado para efetuar a transação6                                            |
| Nome da Bandeira                                                   | Alfanumérico                       | A        | O nome da bandeira do cartão utilizado para efetuar a transação6                                                     |
| Identificador do tipo de cartão                                    | Numérico (Inteiro)                 | N        | O identificador do tipo do cartão: - 1: Debit  - 2: Credit                                                           |
| Nome do tipo de cartão                                             | Tipo de cartão                     | A        | O nome do tipo do cartão utilizado para efetuar a transação                                                          |
| Código de Identificação do  Produto na Cielo                       | Numérico (Inteiro)                 | N        | O código que identifica o   Produto da Adquirente Cielo utilizado para efetuar a transação7                          |
| Descrição do Produto na Cielo                                      | Alfanumérico                       | A        | A descrição do Produto na Adquirente Cielo utilizado para efetuar a transação7                                       |
| Identificador PIX | Alfanumérico | A | O identificador inicial gerado no momento da transação. |
| Identificador PIX Original | Alfanumérico | A | Gerado para identificar a transação original. |

1. As informações da adquirente são os dados da venda que o Conciliador recebe dos extratos eletrônicos, o meio de integração da adquirente com os sistemas externos. São a segunda parte da conciliação. O Identificador Único da Transação pode ser utilizado para visualizar a venda no WebSite do Conciliador, preenchendo a URL:   

> https://reconciliation.braspag.com.br/WebSite/Reports/TransactionDetails.aspx?AcquirerTransactionId=[ID]   

Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   

2. Devido à restrições de segurança, o número do cartão será informado de forma mascarada.   
3. Quando uma transação é dividida em uma quantidade de parcelas onde o valor não pode ser distribuído igualmente entre as parcelas, surge a necessidade de colocar um valor extra em uma parcela específica. Esta parcela é chamada de parcela de arredondamento. Como exemplo, podemos adotar uma transação de R$ 100,00 dividida em três parcelas. Se a primeira parcela for a parcela de arredondamento, ela terá o valor de R$ 33,34 – enquanto as duas outras parcelas terão o valor de R$ 33,33.   
4. A taxa de adquirência normalmente é expressa em porcentagem. O campo demonstra essa porcentagem multiplicada por 100. Portanto, se o valor deste campo for expresso como 275, isto indica uma taxa de adquirência de 2,75%.   
5. Tabelas com os meios de captura informados estão disponíveis no Apêndice do Manual.   
6. Uma tabela com as bandeiras disponíveis está disponível no Apêndice do Manual.   
7. Uma tabela com os tipos de produto está disponível no Apêndice do Manual.  

### Registro de Evento

| Campo                                         | Tipo                               | Formato  | Descrição                                                                                                                                                          |
|-----------------------------------------------|------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Identificador do Registro                     | Numérico (Inteiro)                 | N        | 5 = Evento Financeiro de Transação <br> 6 = Evento Informativo de Transação <br> 7 = Eventos financeiros de Afiliação <br> 8 = Eventos  informativos de Afiliação1 |
| Identificador Único do Evento no  Conciliador | Identificador Único  Global (GUID) | G        | O identificador único do do  Evento no Conciliador2                                                                                                                |
| Data do evento                                | Data                               | ddMMyyyy | A data em que o evento está previsto para ser realizado, ou a data em que foi realizado (no caso de evento realizado)                                              |
| Identificador da Categoria de Evento          | Numérico (Inteiro)                 | N        | O identificador da categoria do evento3                                                                                                                            |
| Descrição da Categoria de Evento              | Alfanumérico                       | A        | A descrição da categoria do evento3                                                                                                                                |
| Identificador do Tipo de Evento               | Numérico (Inteiro)                 | {N}      | 1   = Realizado <br> 2 = Previsto <br> 3 = Pendente                                                                                                                |
| Descrição do Tipo de Evento                   | Alfanumérico                       | A        | “Preview”, “Realized” ou “Pending”                                                                                                                                 |
| Código de Afiliação                           | Numérico                           | N        | O código de afiliação do estabelecimento no qual o evento foi executado                                                                                            |
| Parcela da Transação                          | Numérico                           | N        | A parcela da transação a qual o evento se refere4                                                                                                                  |
| Valor Bruto                                   | Numérico                           | N        | O valor financeiro do evento contemplado, antes da dedução da taxa de adquirência, em centavos.                                                                    |
| Valor Líquido                                 | Numérico                           | N        | O valor líquido do evento, após a redução da taxa de adquirência, em centavos.                                                                                     |
| Valor da Taxa                                 | Numérico                           | N        | O valor da taxa de adquirência sobre o evento, em centavos                                                                                                         |
| Banco                                         | Numérico                           | N        | O código do banco do domicílio bancário sobre o qual o evento financeiro é ou será lançado                                                                         |
| Agência                                       | Numérico                           | N        | O código da agência do domicílio bancário sobre o qual o evento financeiro é ou será lançado                                                                       |
| Número da Conta                               | Alfanumérico                       | A        | O número da conta do domicílio bancário sobre o qual o evento financeiro é ou será lançado                                                                         |
| Código do Ajuste                              | Alfanumérico                       | A        | O código que identifica o tipo de ajuste (apenas para eventos de ajustes)                                                                                          |
| Descrição do Ajuste                           | Alfanumérico                       | A        | A descrição do ajuste (apenas para eventos de ajustes)                                                                                                             |
| Número da Operação de Antecipação na Cielo    | Numérico                           | N        | O número da Operação de Antecipação (apenas para eventos derivados de antecipações na Cielo)                                                                       |
| Data original de pagamento                    | Data                               | ddMMyyyy | A data original para a qual o evento de pagamento estava previsto (apenas para eventos de antecipações)                                                            |
|Número do Lote                                 | Numérico                           | N        | O número do Lote (Resumo de Vendas) ao qual o evento pertence (Somente disponível no CSV a partir do dia 16/04/2018)|
| Identificador PIX | Alfanumérico | A | O identificador inicial gerado no momento da transação. |
| Identificador PIX Original | Alfanumérico | A | Gerado para identificar a transação original. |

1. Os eventos são divididos em 2 tipos: Eventos financeiros são eventos que informam cobranças ou pagamentos na agenda financeira da adquirente com o lojista. Eventos informacionais são avisos de alterações na agenda (reagendamentos de eventos financeiros) ou outras informações não financeiras (captura de transação). Além disso, eles podem estar ligados à transações ou não. Caso estejam ligados à transações, eles aparecerão logo abaixo dos registros de transações aos quais se referem. Caso contrário, serão mencionados no final do arquivo. Utilize corretamente o identificador do registro para saber como tratar estes eventos pela sua ligação.   
2. O Identificador Único do Evento pode ser utilizado para visualizar os dados do evento no WebSite do Conciliador, preenchendo a URL:  https://reconciliation.braspag.com.br/WebSite/Reports/EventDetails.aspx?Id=[ID] Onde o texto [ID] deve ser substituído pelo identificador informado no registro.   
3. Uma tabela com as categorias de evento está disponível no apêndice do Manual.   
4. Certos eventos podem não se referir à uma parcela da transação, como Estornos ou Chargebacks.   
Nesses casos, o campo Parcela da Transação ficará vazio.   

## Meios de Captura

### Cielo

| Código/Identificador | Descrição           |
|----------------------|---------------------|
| 1                    | POS                 |
| 2                    | PDV/TEF             |
| 3                    | E-Commerce          |
| 4                    | EDI                 |
| 5                    | ADP/BSP             |
| 6                    | Manual              |
| 7                    | URA/CVA             |
| 8                    | Mobile              |
| 9                    | Moedeiro Eletrônico |

### Amex

| Código/Identificador | Descrição                           |
|----------------------|-------------------------------------|
| 1                    | Rede AE – Manual                    |
| 2                    | Rede AE – EDI                       |
| 3                    | Rede AE – BSP                       |
| 4                    | Rede AE – TEF                       |
| 11                   | Cielo – POS                         |
| 12                   | Cielo – TEF                         |
| 13                   | Cielo – Autorização Manual          |
| 14                   | Cielo – URA                         |
| 15                   | Cielo – EDI                         |
| 16                   | Cielo – GDS                         |
| 17                   | Cielo – E-Commerce                  |
| 18                   | Cielo – Mobile                      |
| 99                   | Legado – Versão anterior do extrato |

### Rede

| Código/Identificador | Descrição        |
|----------------------|------------------|
| 1                    | Manual           |
| 2                    | POS              |
| 3                    | PDV              |
| 4                    | TO               |
| 5                    | Internet         |
| 6                    | Leitor de Trilha |
| 9                    | Outros           |

### GetNet

| Código/Identificador | Descrição |
|----------------------|-----------|
| 0                    | TEF       |
| 1                    | POS       |
| 2                    | Manual    |
| 3                    | Internet  |

### Outros

A tabela abaixo é valida para:

* Stone
* Global Payments
* First Data
* Ticket
* Sodexo

**Observação:** Para a adquirente Losango o campo é enviado “vazio"

| Código/Identificador | Descrição  |
|----------------------|------------|
| 0                    | N/D        |
| 1                    | N/A        |
| 2                    | POS        |
| 3                    | PDV/TEF    |
| 4                    | E-Commerce |
| 5                    | EDI        |
| 6                    | Manual     |
| 7                    | Mobile     |
| 8                    | Outros     |

## Bandeiras

| Código/Identificador | Descrição               |
|----------------------|-------------------------|
| 0                    | Desconhecido/Indefinido |
| 1                    | VISA                    |
| 2                    | Mastercard              |
| 3                    | ELO                     |
| 4                    | Diners                  |
| 5                    | Cabal                   |
| 6                    | Hipercard               |
| 7                    | Amex                    |
| 8                    | Sicred                  |
| 9                    | Cup                     |
| 10                   | Agiplan                 |
| 11                   | Banesecard              |
| 12                   | SoroCred                |
| 13                   | CredSystem              |
| 14                   | Esplanada               |
| 15                   | CredZ                   |
| 16                   | Losango                 |
| 17                   | AVista                  |
| 18                   | Hiper                   |
| 19                   | JCB                     |
| 20                   | Aura                    |
| 21                   | Alelo                   |
| 22                   | Ticket                  |
| 23                   | Sodexo                  |

## Tipos de Produtos

### Cielo

| Código/Identificador | Descrição                          |
|----------------------|------------------------------------|
| 1                    | Agiplan crédito à vista            |
| 2                    | Agiplan parcelado loja             |
| 3                    | Banescard crédito à vista          |
| 4                    | Banescard parcelado loja           |
| 5                    | Esplanada crédito à vista          |
| 6                    | CredZ crédito à vista              |
| 7                    | Esplanada parcelado loja           |
| 8                    | Credz parcelado loja               |
| 9                    | Elo Crediário                      |
| 10                   | MasterCard crédito à vista         |
| 11                   | Maestro                            |
| 12                   | MasterCard parcelado loja          |
| 13                   | Elo Construcard                    |
| 14                   | Elo Agro Débito                    |
| 15                   | Elo Agro Custeio                   |
| 16                   | Elo Agro Investimento              |
| 17                   | Elo Agro Custeio + Débito          |
| 18                   | Elo Agro Investimento + Débito     |
| 19                   | Discover crédito à vista           |
| 20                   | Diners crédito à vista             |
| 21                   | Diners parcelado loja              |
| 22                   | Agro Custeio + Electron            |
| 23                   | Agro Investimento + Electron       |
| 24                   | FCO Investimento                   |
| 25                   | Agro Electron                      |
| 26                   | Agro Custeio                       |
| 27                   | Agro Investimento                  |
| 28                   | FCO Giro                           |
| 29                   | Visa crediário no crédito          |
| 30                   | Visa parcelado cliente             |
| 31                   | Pré-pago Visa Débito               |
| 32                   | Pré-pago Visa Crédito              |
| 33                   | JCB                                |
| 35                   |Pré-pago Visa Carnê                 |
| 36                   | Saque com cartão de Débito VISA    |
| 37                   | Flex Car Visa Vale                 |
| 38                   | CredSystem crédito à vista         |
| 39                   | CredSystem parcelado loja          |
| 40                   | Visa Crédito à Vista               |
| 41                   | Visa Electron Débito à Vista       |
| 42                   | Visa Pedágio                       |
| 43                   | Visa Parcelado Loja                |
| 44                   | Visa Electron Pré-Datado           |
| 45                   | Alelo Refeição (Bandeira Visa/Elo) |
| 46                   |Alelo Alimentação (Visa)            |
| 58                   | Alelo Multibenefícios              |
| 59                   | Alelo Auto                         |
| 60                   | Sorocred débito à vista            |
| 61                   | Sorocred crédito à vista           |
| 62                   | Sorocred parcelado loja            |
| 64                   | Visa Crediário                     |
| 65                   | Alelo Refeição (Elo)               |
| 66                   | Alelo Alimentação (Elo)            |
| 67                   | Visa Capital de Giro               |
| 68                   | Visa Crédito Imobiliário           |
| 69                   | Alelo Cultura                      |
| 70                   | Elo crédito a vista                |
| 71                   | Elo débito à vista                 |
| 72                   | Elo parcelado loja                 |
| 73                   | Pré-pago Visa Cash                 |
| 79                   | Pagamento Carnê Visa Electron      |
| 80                   | Visa Crédito Conversor de Moeda    |
| 81                   | Mastercard Crédito Especializado (*)|
| 82                   | Amex crédito à vista               |
| 83                   | Amex parcelado loja                |
| 84                   | Amex parcelado banco               |
| 89                   | Elo Crédito Imobiliário            |
| 91                   | Elo Crédito Especializado (*)      |
| 94                   | Banescard Débito                   |
| 96                   | Cabal crédito à vista              |
| 97                   | Cabal débito à vista               |
| 98                   | Cabal parcelado loja               |
| 107                  | Pré-pago Master Carnê              |
| 110                  | Pré-pago Master Crédito            |
| 111                  | Pré-pago Master Débito             |
| 161                  | Hiper crédito à vista              |
| 162                  | Hiper débito à vista               |
| 163                  | Hiper parcelado loja|
| 164                  | Hipercard crédito à vista|
| 165                  | Hipercard parcelado loja|
| 200                  | Verdecard crédito a vista|
| 201                  | Verdecard parcelado loja|
| 202                  | Nutricash Alimentação|
| 203                  | Nutricash Refeição|
| 204                  | Nutricash Multibenefícios|
| 205                  | Nutricash Combustível|
| 206                  | Ben Alimentação|
| 207                  | Ben Refeição|
| 269                  | Pré-pago Elo Carnê|
| 270                  | Pré-pago Elo Crédito|
| 271                  | Pré-pago Elo Débito|
| 314                  | Ourocard Agro débito|
| 315                  | Ourocard Agro custeio|
| 316                  | Ourocard Agro investimento|
| 317                  | Ourocard Agro custeio + débito|
| 318                  | Ourocard Agro investimento + débito|
| 321                  | Mastercard crediário no crédito|
| 322                  | Mastercard parcelado cliente|
| 324                  | Elo parcelado cliente|
| 330                  | Elo crediário no crédito|
| 342                  | Mastercard Pedágio|
| 377                  | Elo Carnê|
| 378                  | Mastercard Carnê|
| 380                  | Mastercard Crédito Conversor de Moeda|
| 433                  | JCB parcelado loja|

### Getnet

| Código/Identificador | Descrição                        |
|----------------------|----------------------------------|
| 1                    | Título                           |
| 2                    | Convênio                         |
| 3                    | Crédito Digital                  |
| 9 | Elo crediário |
| 11 | Mastercard débito |
| 12 | Mastercard crédito |
| 41 | Visa débito |
| 43 | Visa crédito |
| 64 | Visa crediário |
| 71 | Elo débito |
| 72 | Elo crédito |
| 83 | Amex crédito |
| 165 | Hiper/Hipercard crédito |
| 321 | Mastercard crediário |
| 378 | Mastercard débito - Pagamento carnê |
| 507 | Hiper/Hipercard crediário |
| 509 | Visa débito - Pagamento carnê |
| 510 | Elo débito - Pagamento carnê |
| 511 | Mastercard crédito BNDES |
| 512 | Visa crédito BNDES |
| 513 | Amex crediário |
| 10074 | Titulo |
| 10075 | Convênio |
| 10076 | Crédito Digital |
| 10077 | Cupom Eletrônico |
| 10078 | Cupom Papel |
| 10079 | Pagamento Recorrente|
| 00/CE                | Cupom Eletrônico                 |
| CP                   | Cupom Papel                      |
| SM                   | Cartão de Crédito MASTERCARD     |
| SV                   | Cartão de Crédito VISA           |
| SR                   | Cartão de Débito MAESTRO         |
| SE                   | Cartão de Débito VISA ELECTRON   |
| PV                   | Pagamento Carnê – Débito VISA ELECTRON |
| PM                   | Pagamento Carnê – Débito MAESTRO |
| PR                   | Pagamento Recorrente             |

### Redecard

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 3 | EEVC Banescard crédito à vista |
| 3 | EEFI Banescard crédito à vista |
| 4 | EEVC Banescard parcelado loja |
| 4 | EEFI Banescard parcelado loja |
| 6 | EEVC Credz crédito à vista |
| 6 | EEFI Credz crédito à vista |
| 8 | EEVC Credz parcelado loja |
| 8 | EEFI Credz parcelado loja |
| 10 | EEFI Mastercard crédito à vista |
| 10 | EEVC Mastercard crédito à vista |
| 11 | EEVD Maestro débito |
| 11 | EEVD Maestro |
| 12 | EEFI Mastercard parcelado loja |
| 12 | EEVC Mastercard parcelado loja |
| 20 | EEVC Diners crédito à vista |
| 20 | EEFI Diners crédito à vista |
| 21 | EEFI Diners parcelado loja |
| 21 | EEVC Diners parcelado loja |
| 33 | EEFI JCB |
| 33 | EEVD JCB |
| 33 | EEVC JCB |
| 38 | EEVC Credsystem crédito à vista |
| 38 | EEFI Credsystem crédito à vista |
| 39 | EEVC Credsystem parcelado loja |
| 39 | EEFI Credsystem parcelado loja |
| 40 | EEFI Visa crédito à vista |
| 40 | EEVC Visa crédito à vista |
| 41 | EEVD Visa débito |
| 42 | EEFI Visa parcelado loja |
| 43 | EEVC Visa parcelado loja |
| 60 | EEVC Sorocred crédito à vista |
| 60 | EEFI Sorocred crédito à vista |
| 62 | EEVC Sorocred parcelado loja |
| 62 | EEFI Sorocred parcelado loja |
| 70 | EEVC Elo crédito a vista |
| 70 | EEFI Elo crédito a vista |
| 71 | EEVD Elo débito à vista |
| 72 | EEVC Elo parcelado loja |
| 72 | EEFI Elo parcelado loja |
| 82 | EEVC Amex crédito à vista |
| 82 | EEFI Amex crédito à vista |
| 83 | EEVC Amex parcelado loja |
| 83 | EEFI Amex parcelado loja |
| 94 | EEVD Banescard Débito |
| 96 | EEFI Cabal crédito à vista |
| 96 | EEVC Cabal crédito à vista |
| 97 | EEVD Cabal débito |
| 98 | EEVC Cabal parcelado loja |
| 98 | EEFI Cabal parcelado loja |
| 161 | EEVC Hiper crédito à vista |
| 161 | EEFI Hiper crédito à vista |
| 162 | EEVD Hiper débito à vista |
| 163 | EEVC Hiper parcelado loja |
| 163 | EEFI Hiper parcelado loja |
| 164 | EEFI Hipercard crédito à vista |
| 164 | EEVC Hipercard crédito à vista |
| 165 | EEVC Hipercard parcelado loja |
| 165 | EEFI Hipercard parcelado loja |
| 433 | EEFI JCB |
| 433 | EEVC JCB |
| 501 | EEVD Hipercard débito |
| 506 | EEVD Diners débito |

### Stone

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 1                    | Crédito Visa       |
| 2                    | Crédito Master     |
| 4                    | Crédito Elo        |
| 10                   | Mastercard crédito à vista |
| 11                   | Mastercard débito |
| 12                   | Mastercard crédito parcelado |
| 15                   | Crédito Hipercard  |
| 29                   | Visa Crediário
| 30                   | Visa parcelado cliente
| 35                   | Mastercard Maestro |
| 36                   | Visa Electron      |
| 38                   | Débito Elo         |
| 39                   | Débito Hipercard   |
| 40                   | Visa crédito à vista |
| 41                   | Visa débito |
| 43                   | Visa crédito parcelado |
| 70                   | Elo crédito à vista |
| 71                   | Elo débito |
| 72                   | Elo crédito parcelado |
| 82                   | Amex crédito à vista |
| 83                   | Amex crédito parcelado |
| 84                   | Amex parcelado banco |
| 96                   | Cabal crédito à vista |
| 97                   | Cabal débito |
| 98                   | Cabal crédito parcelado |
| 164                  | Hipercard crédito à vista |
| 165                  | Hipercard crédito parcelado |
| 321                  | Mastercard crediário |
| 322                  | Mastercard parcelado cliente |
| 324                  | Elo parcelado cliente |
| 330                  | Elo Crediário |
| 501                  | Hipercard débito |
| 502                  | Amex débito |
| 503                  | Cabal débito |
| 504                  | Cabal crédito parcelado |
| 505                  | Cabal crédito à vista |
| 507                  | Hipercard crediário |
| 513                  | Amex crediário |

### Global Payments

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 1                    | Crédito Visa       |
| 2                    | Crédito Master     |
| 35                   | Mastercard Maestro |
| 36                   | Visa Electron      |

### First Data

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 1                    | Crédito Visa       |
| 2                    | Crédito Master     |
| 4                    | Crédito Elo        |
| 11                   | Crédito Cabal      |
| 35                   | Mastercard Maestro |
| 36                   | Visa Electron      |
| 37                   | Débito Cabal       |
| 38                   | Débito Elo         |

### Ticket

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 24                   | Ticket Refeição    |
| 25                   | Ticket Alimentação |
| 26                   | Ticket Parceiro    |
| 27                   | Ticket Cultura     |

### Sodexo

| Código/Identificador | Descrição          |
|----------------------|--------------------|
| 28                   | Sodexo Refeição    |
| 29                   | Sodexo Alimentação |
| 30                   | Sodexo Gift        |
| 31                   | Sodexo Premium     |
| 32                   | Sodexo Cultura     |

## Categorias de Evento

|Identificador| Descrição|
|:-----------:|---|
|1| Ajuste|
|2| POS|
|3| Captura|
|4| Pagamento|
|5| Pgto. Lote|
|6| Aceleração|
|7| Desagendamento|
|8| Estorno|
|9| Chargeback|
|10| Antecipação|
|11| Antecip. Lote|
|12| Ajuste Lote|
|13| Reagendamento|
|14| Custo de Operação de Antecipação|
|15| Valor Retido|
|16| Pagamento de Valor Retido|
|17| Débito de Valor Retido|
|18| Ajustes Antecipados|
|19| Arredondamento de Parcelas|
|20| Estorno Antecipado|
|21| Ajuste Indefinido|
|22| Débito Acumulado|
|23| Pagamento de Vendas Antecipadas|
|24| Débito de Antecipação de Vendas|
|25| Pagamento de Aceleração Antecipada|
|26| Débito de Antecipação de Aceleração|
|27| Credit Voucher|
|28| Antecipação de Credit Voucher|
|29| Antecipação de Chargeback|
|30| Antecipação de Aluguel de POS|
|31| Antecipação de Ajustes Lote|
|32| Antecipação de Estornos Lote|
|33| Antecipação de Chargeback Lote|
|34| Débito de Cessão|
|35| Débito de Gravame|
|36| Cessão fumaça|
|37| Crédito de Cessão|
|38| Débito/crédito compensação de valores|
|39| Estorno débito/crédito de cessão|
|40| Estorno débito/crédito de gravame|
|41| Débito/crédito compensação cancelamento de transação em operação|
|42| Débito/crédito de penhora|
|43| Estorno de crédito/débito de penhora|
|44| Débito/crédito compensação cancelamento em operação|
|45| Crédito de Gravame|

## Webservice Conciliador    

Webservice é uma solução para integrar aplicações.
Por meio dele, qualquer sistema pode se conectar para consultar ou inserir dados. Atualmente no Webservice do Conciliador é possível enviar o arquivo de vendas externas e baixar o conteúdo dos Arquivos de Fluxo de Caixa.    

Inicialmente o acesso deverá ser liberado pela equipe de operações, através do e-mail, senha e o cadastro dos IPs informados pelo estabelecimento.    

O Webservice está disponível através da URL:

> https://reconciliation.braspag.com.br/WebServices/ReconciliationFilesWebService.asmx   

**Método:** GetExportedFileV2

### Request

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rec="https://reconciliation.braspag.com.br">   
   <soapenv:Header/>   
   <soapenv:Body>   
      <rec:GetReconciliationFile>   
         <rec:request>   
            <rec:RequestId>[Guid aleatório]</rec:RequestId>   
            <rec:RequestingUserName>[Login do usuário da loja]</rec:RequestingUserName>   
            <rec:MerchantId>[Identificador da loja, fornecido pela Braspag]</rec:MerchantId>   
            <rec:AcquirerId>[Identificador da adquirente]</rec:AcquirerId>   
            <rec:RequestingPassword>[Senha do usuário da loja]</rec:RequestingPassword>   
            <rec:ReferenceDate>[Data de referência do arquivo]</rec:ReferenceDate>   
            <rec:FileExtensionType>[Extensão do arquivo]</rec:FileExtensionType>   
            <rec:FileType>[Tipo do arquivo]</rec:FileType>   
         </rec:request>   
      </rec:GetReconciliationFile>   
   </soapenv:Body>  
```

| Descritor          | Significado                                | Exemplo                                              |
|--------------------|--------------------------------------------|------------------------------------------------------|
| RequestId          | Identificador Único Global (GUID)          | 4749e676-2507-442da1c6c25c08e2d2af                   |
| RequestingUserName | Login do usuário da loja                   | user@braspag.com.br                                  |
| MerchantId         | Identificador da loja no Conciliador       | 123                                                  |
| AcquirerId         | Identificador da adquirente                | 1=Cielo<br>2=Rede<br>3=Amex<br>4=Losango<br>5=Getnet |
| RequestingPassword | Senha do usuário da loja                   | Braspag@2015                                         |
| ReferenceDate      | Data de referência do Arquivo (yyyy-mm-dd) | 12/06/2015                                           |
| FileExtensionType  | Formato do Arquivo                         | 1=CSV <br> 2=XML                                     |
| FileType           | Tipo de Arquivo                            | 1=Arquivo de Conciliação                             |

### Response

``` xml

--Bem sucedido

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">    <soap:Body>   
      <GetReconciliationFileResponse xmlns="https://reconciliation.braspag.com.br">   
         <GetReconciliationFileResult>   
            <CorrelatedId>124be5db-a809-47e1-b456-1f2e103caa17</CorrelatedId>   
            <Success>true</Success>               <ErrorReportCollection/>   
            <FileContent> QXJxdWl2byBkZSB0ZXN0ZSBjb25jaWxpYWRvcg==</FileContent>   
         </GetReconciliationFileResult>   
      </GetReconciliationFileResponse>   
   </soap:Body>   
</soap:Envelope>   
```

``` xml

-- Mal Sucedida   

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">    <soap:Body>   
      <GetReconciliationFileResponse xmlns="https://reconciliation.braspag.com.br">   
         <GetReconciliationFileResult>   
            <CorrelatedId>124be5db-a809-47e1-b456-1f2e103caa17</CorrelatedId>   
            <Success>false</Success>   
            <ErrorReportCollection>   
               <ErrorReport>   
                  <Code>44</Code>   
                  <Message>Acesso não autorizado do IP para a loja fornecida na requisição.</Message></ErrorReport>   
            </ErrorReportCollection>   
         </GetReconciliationFileResult>   
      </GetReconciliationFileResponse>   
   </soap:Body>   
</soap:Envelope>   
```

| Descritor             | Descrição                                                                                      | Exemplo                                                                                                                               |
|-----------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| CorrelatedId          | GUID enviado na requisição                                                                     | 4749e676-2507-442d-a1c6-c25c08e2d2af                                                                                                  |
| Success               | Indica se a operação foi concluída.                                                            | false/true                                                                                                                            |
| ErrorReportCollection | Coleção de erros que será  retornada em caso de Sucess="false"                                 | ErrorReport.Code = 39,ErrorReport.Message  = “Erro interno do sistema”.                                                               |
| ErrorReport.Code      | Código de erros para  Sucess="false"                                                           | 39/44/46                                                                                                                              |
| ErrorReport.Message   | Mensagem de erro correspondente ao código informado                                            | 39 - Erro interno do sistema.<br>44 - Acesso não autorizado, IP não cadastrado<br>46 - Usuário incorreto, e/ou não tem acesso a loja. |
| FileContent           | Para requisições com Sucess="true", será enviado o conteúdo binário codificado na base64 UTF-8 | QXJxdWl2byBkZSB0ZXN0ZSBjb25jaWxpYWRvcg== | |

## Apêndice:

### Utilizando o arquivo de Schema Definition (XSD)   

Uma forma de integração com o Arquivo de Fluxo de Caixa do Conciliador no formato XML de maneira programada ou automática, é feita através do arquivo de definição de esquema, ou `XML Schema Definition File`.   

O XML Schema é uma linguagem baseada no formato XML para definição de regras de validação ("esquemas") em documentos no formato XML. Foi a primeira linguagem de esquema para XML que obteve recomendação por parte do **W3C**. Esta linguagem é uma alternativa ao **DTD**, cuja sintaxe não é baseada no formato XML.   
Foi amplamente utilizado para desenvolvimento da NF-e (Nota Fiscal Eletrônica) Brasileira.   

Um arquivo contendo as definições na linguagem XML Schema é chamado de **XSD (XML Schema Definition)**, este descreve a estrutura de um documento XML.   

O conciliador possui arquivos XSD para cada um de seus arquivos em XML. Desta forma, é possível, programaticamente compreender a estrutura do XML, supondo que o arquivo XSD seja corretamente interpretado pela ferramenta.   

Neste manual, não serão citadas todas as formas de se trabalhar com o arquivo, entretanto, podemos demonstrar, através da utilização de uma ferramenta provida pela IDE de desenvolvimento Visual Studio, como gerar, programaticamente uma Classe em código-fonte que pode representar o conteúdo do arquivo.   

Desta forma, será possível deserializar o conteúdo de qualquer arquivo dentro desta classe, e com isto utilizar os arquivos de conciliação em um sistema com código orientado a objetos.   

Criando a classe do arquivo por meio do arquivo de definição de esquema   
Com os arquivos de definição de esquema, você deverá utilizar uma ferramenta que pode ser acessada à partir da linha de comando da IDE do Visual Studio (Visual Studio Command Prompt). O nome do executável é “xsd” (sem aspas).   

O executável possui uma série de parâmetros para customizar a geração da sua classe a partir do arquivo de definição de esquema. Caso você queira ver todas as opções, consulte a URL https://msdn.microsoft.com/en-us/library/x6c1kb0s(v=VS.100).aspx.   
No exemplo abaixo, utilizamos o comando para gerar a classe da forma mais básica. Acesse o diretório onde os arquivos de esquemas estão salvos(normalmente são dois arquivos, “ConciliationFile.xsd” e “Guid.xsd”), usando o comando CD do DOS.   Uma vez dentro deste diretório, basta executar o comando conforme abaixo:
xsd  

ConciliationFile.xsd Guid.xsd /classes   

Um exemplo do efeito disto na linha de commando é demonstrado na imagem abaixo. A classe gerada terá o nome
**“ConciliationFile_Guid.cs”**.
Esta classe pode ser inserida em um projeto na linguagem C#, e com algumas alterações pode representar o conteúdo do arquivo por meio de deserialização.   
Consulte o suporte de sua linguagem de desenvolvimento para verificar se a mesma possui algum tipo de automatização para interpretar a leitura do arquivo em XML. Isto pode facilitar seu processo de desenvolvimento e aprendizado do layout do mesmo

![xml20](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/xml20.png)