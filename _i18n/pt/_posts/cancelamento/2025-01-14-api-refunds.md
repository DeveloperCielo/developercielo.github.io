---
layout: manual
title: API Refunds
description: API Única de Cancelamento e Cartas 
search: true
categories: manual
sort_order: 1
tags:
  - API Refunds
language_tabs:
  json: JSON
---
    
# Objetivo

O objetivo desta documentação é orientar sobre a integração com a API Única de Cancelamento de vendas Cielo, descrevendo funcionalidade, informações técnicas e etapas para solicitação de acesso.

# Sobre a API Única de Cancelamento

A API Única de Cancelamento é mais uma opção de canal de cancelamento de vendas disponibilizado pela Cielo aos clientes.

Com a API Única de cancelamento, é possível centralizar cancelamentos de vendas de diversas soluções de captura em uma única integração (POS, LIO, TEF e E-commerce) além de permitir consulta de cancelamentos e geração de Cartas de Cancelamentos efetivados.

A integração com a API exige credenciais de acesso que são concedidas por Raiz de CNPJ. Ou seja, todos os Estabelecimentos (ECs) que fazem parte dessa raiz podem ter cancelamentos de vendas solicitados usando uma mesma credencial de acesso em uma única integração.

Principais benefícios da solução da API de Cancelamento
- **Solicitação de cancelamento direta** para o Sistema de Cancelamento Cielo.  
- **Consulta de Status de Cancelamento** com descrição complementar de motivo em caso de rejeição de cancelamento.  
- **Centralização de solicitações de cancelamento** de vendas feitas por variadas soluções de captura usadas pelo cliente (POS, TEF, LIO, E-commerce).  
- **Geração de Carta de Cancelamento** no mesmo dia da efetivação do cancelamento, de forma unitária ou em lote.  
- **Autonomia e autosserviço** no processo de solicitação de cancelamento de vendas.  
- **Simplicidade**: o protocolo utilizado é puramente HTTPS, tecnologia REST, que é padrão de mercado.  
- **Facilidade de testes**: disponibilizamos credenciais de ambiente de homologação e massa de vendas para teste em ambiente de homologação.

# Produtos e Bandeiras suportadas

A versão atual da API Cancelamento Cielo possui **suporte de cancelamento** a **todos os produtos e bandeiras** capturados pela Cielo com **exceção de PIX**, transações de **Voucher** e Pré-autorização.

# Fluxo para acesso API de Cancelamento

O fluxo abaixo mostra  a integração do cliente na API Única de Cancelamento desde o recebimento das credenciais de Homologação produção até o acesso à API em Produção

![Imagem1](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/cancelamento/Imagem1.jpg)

# Solicitação de Credenciais para Produção (client_id e client_secret)

Para obter acesso à API de Cancelamento em Produção, envie os dados abaixo para: **api.cancelamento@cielo.com.br**  

- **Nome**: nome do ponto focal do estabelecimento que fará o gerenciamento das credenciais para acessar a API de Cancelamento.  
- **E-mail**: e-mail do ponto focal do estabelecimento que fará o gerenciamento das credenciais para acessar a API de Cancelamento.  
- **Raiz de CNPJ**: raiz do CNPJ que deseja integrar na API. Caso tenha mais de uma raiz de CNPJ a ser integrada, envie todas.  

> **Nota**: Todos os estabelecimentos que compõem essa raiz de CNPJ poderão ter os cancelamentos de vendas solicitados pela API Única de Cancelamento.

Com esses dados, nosso time Cielo vai solicitar criação de credenciais de acesso para integração em Produção.

Mesmo que a integração do Estabelecimento com a API seja feita através de um terceiro, o e-mail que deve ser enviado deve ser do ponto focal do estabelecimento.

# Cadastro no Portal de Desenvolvedores Cielo 

Após a aprovação da solicitação, um e-mail será enviado ao ponto focal estabelecimento solicitante. 

Acesse o Portal de Desenvolvedores Cielo  https://desenvolvedores.cielo.com.br/api-portal/ e realize seu cadastro.

> **Importante:** O cadastro deve ser realizado com o mesmo e-mail do ponto focal do Estabelecimento enviado no passo 1.

![Imagem2](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/cancelamento/Imagem2.png)
