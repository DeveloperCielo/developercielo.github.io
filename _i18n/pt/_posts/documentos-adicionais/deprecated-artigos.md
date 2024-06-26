---
layout: tutorial
title: Artigos e informações
description:
search: true
toc_footers: true
categories: tutorial
sort_order: 5
tags:
  - Documentos Adicionais
---

# Como usar Azure Kubernetes Services

## Sobre o Autor:

|**Tiago Rosendo**| Desenvolvedor na Braspag e Cielo, backend de coração e apaixonado pelo frontend, entusiasta de JS e Docker e nas horas vagas não dispensa uma jogatina online.|
||**LinkedIn:** https://www.linkedin.com/in/trosendo / **E-mail:** trosendo@braspag.com.br|

## Introdução

Vamos falar um pouco sobre o Azure Kubernetes Services, vulgo AKS.
O utilizamos para realizar deploys em nossas principais aplicações, desde as mais básicas as mais complexas tudo com alta disponibilidade!

Rodar containers Docker em um computador local é muito simples, basta um comando `docker run nginx` e pronto, você tem seu container lindo rodando, porém quando você tem a necessidade de rodar esse mesmo container em um ambiente de nuvem a história muda...
Você tem que montar seu cluster, configurar o auto-scale, configurar o load balance... MEU DEUS QUANTA COISA!
Um certo dia, parei para pesquisar uma solução que poupasse meu tempo, logo, pensei comigo:

> "não é possível que ninguém tenha feito algo para simplificar esse processo repetitivo"

Uma das soluções encontradas foi o **Azure Kubernetes Services**, ele te permite montar um cluster de Kubernetes com 1 único comando, com isso sobra tempo pra focar na sua aplicação e não na configuração de máquinas

**Mas o que é Kubernetes?** Falando por alto, Kubernetes é uma ferramenta de orquestração para containers, você monta seu container com o Docker e o Kubernetes faz todo o trabalho de deploy, auto scale, service discovery e muito mais.
Caso queira saber mais sobre o Kubernetes segue o link da documentação deles:

> https://kubernetes.io/docs/tutorials/kubernetes-basics/

## Montando um Cluster em Kubernetes

Estou levando em consideração que você já tenha o `Azure CLI` configurado na sua máquina, caso não tenha segue um tutorial de configuração:

> https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest

Para montar um cluster utilizando o AKS basta um único comando:

```
"az aks create -n NomeDoSeuCluster -g NomeDoGrupoDeRecursos --generate-ssh-keys"
```

Substitua o `NomeDoSeuCluster` pelo nome do seu cluster.

Substitua o `NomeDoGrupoDeRecursos` pelo nome do grupo de recursos onde o seu cluster irá ser provisionado, este grupo de recursos precisa existir na sua conta do Azure.

Após alguns minutos você terá o seu cluster montado como pode ser visto na imagem abaixo:

![](https://i.imgur.com/CFwO4Jz.png)

Após montar nosso cluster vamos resgaras as credenciais de acesso com o comando:

```
"az aks get-credentials -n NomeDoSeuCluster -g NomeDoGrupoDeRecursos"
```

Caso tudo dê certo você irá receber a seguinte mensagem:

![](https://i.imgur.com/oLSo4j4.png)

Vamos agora configurar o Kubectl CLI, este será utilizado para se comunicar diretamente com o Kubernetes, para fazer isso basta executar o seguinte comando:

```
"az aks install-cli"
```

Se tudo ocorreu bem será exibido a seguinte mensagem:

![](https://i.imgur.com/pihYQw1.png)

Vamos verificar agora qual o estado das máquinas do nosso cluster, para isso utilizaremos o comando:

```
"kubectl get nodes"
```

![](https://i.imgur.com/Qyygi8y.png)

Finalmente vamos subir nossa primeira aplicação dentro do nosso cluster!!! Para isso vamos utilizar o comando `run`:

```
"kubectl run meu-nginx --image=nginx --replicas=1 --port=80"
```

![](https://i.imgur.com/gGNYlk2.png)

Vamos chamar o `get pods` para verificar se nossa aplicação foi deployada com sucesso:

![](https://i.imgur.com/IxKDQJ8.png)

Como vimos na imagem acima nossa aplicação foi "deployada", porém ela ainda não está disponivel na internet
Para disponibilizar nossa aplicação na internet vamos utilizar o comando `expose`:

```
"kubectl expose deployment meu-nginx --port=80 --type=LoadBalancer"
```

![](https://i.imgur.com/JVJH82V.png)

Agora basta chamar o comando `get services` para descobrir qual o IP que nossa aplicação recebeu, essa etapa pode demorar alguns minutos:

```
"kubectl get services --watch"
```

![](https://i.imgur.com/DaKu0HU.png)

Como podemos ver nossa aplicação recebeu o IP: 52.179.85.102
Por fim, vamos acessar o IP da nossa aplicação para ver se deu tudo certo!

![](https://i.imgur.com/5Uvpr0e.png)

E não é que funciona mesmo? 😊

## Conclusão:

Por hoje é isso galera, espero que tenham gostado, essa foi uma pequena demonstração de como o AKS/Kubernetes pode nos ajudar na orquestração de nossos containers,pretendo fazer uma parte 2 deste artigo explicando sobre como utilizar o Azure Container Instance junto com o Kubernetes, deixo logo abaixo alguns links interessantes para quem quer se aprofundar no assunto:

## Bibliografia:

- Introducing AKS (managed Kubernetes) and Azure Container Registry improvements
- https://azure.microsoft.com/en-us/blog/introducing-azure-container-service-aks-managed-kubernetes-and-azure-container-registry-geo-replication/

- Kubernetes.io
- https://kubernetes.io/docs/tutorials/kubernetes-basics/

- Explore Multicloud Deployments with Microsoft’s ACI Connector for Kubernetes
- https://thenewstack.io/explore-multicloud-deployments-aci-connector-kubernetes/

# Boas Práticas eCommerce

Seja por curiosidade, seja por necessidade, você já deve ter se perguntado sobre como é definido o número de um cartão de crédito. Algumas pessoas chegam a achar que são números aleatórios, ou sequênciais, atribuídos pelas bandeiras ou pelos bancos emissores, mas a realidade é que o número do cartão segue um padrão especificado e que é possível saber qual é a bandeira, tipo do cartão e a conta do portador, apenas observando o número do cartão; em alguns casos, de fato, é possível saber até o país de origem do cartão, apenas observando seu número.

Com o objetivo de contribuir para a redução as transações negadas pelo código 14 – cartão inválido, a Cielo recomenda o uso do algoritmo de Luhn para verificação da sequência de números dos cartões de credito e débito utilizados na sua loja. A partir desta medida, o lojista conseguirá evitar que uma transação com o cartão digitado incorretamente seja enviado para processamento.

Por isso, a Cielo recomenda que, no momento que o portador digitar o número do cartão e o algoritmo de Luhn detectar que a digitação está incorreta, o lojista deverá exibir a informação clara para o portador, solicitando que o cartão seja digitado novamente ou tente outro cartão”

## Números de cartões

![Cartão Visa]({{ site.baseurl }}/images/cartao.png)

Basicamente, o número do cartão é composto por três partes:

1. **Bin ou Inn** - Bank identification number, ou Issuer identification number, é o número que identifica o banco emissor das bandeiras Visa, Mastercard, Amex, entre outras, por meio dos primeiros dígitos do cartão. No caso do cartão de exemplo acima, o Bin é 4, que é o identificador da Visa.
2. **Conta do cliente** - Após o bin, os próximos dígitos identificam o número da conta do portador no banco emissor. Logo após o Bin, os próximos 14 dúgitos são o identificador da conta do cliente: **012 0010 3714 111**.
3. **Dígito de verificação** - Esse último dígito é utilizado para verificar se o número do cartão de crédito é válido. Para se chegar no dígito verificador é utilizado um algorítimo chamado Luhn. No caso do cartão de exemplo acima, o dígito verificador é **2**.

## Informações de cartões

Após validar que o número do cartão é válido através do dígito verificador obtido através do algoritmo Luhn, podemos verificar se o número do cartão está correto segundo a bandeira escolhida. A Cielo não recomenda que se faça uma validação de bandeiras através do BIN - primeiros dígitos do cartão; essa recomendação é importante porque pode haver colisão de mesmo número de BINs para bandeiras diferentes. Algumas bandeiras possuem 13, 15 ou 16 dígitos e o CVV possui 3 ou 4 dígitos. A tabela abaixo mostra a quantidade de dígitos de cada bandeira e seus respectivos CVV. Utilize essa informação em conjunto com o algoritmo Luhn para uma validação completa do número do cartão do cliente.

| Bandeira                  | Número de dígitos | Dígitos do CVV |
| ------------------------- | ----------------- | -------------- |
| Visa                      | 13 ou 16 dígitos  | 3 dígitos      |
| Mastercard                | 16 dígitos        | 3 dígitos      |
| Amex                      | 15 dígitos        | 4 dígitos      |
| Diners Club International | 14 dígitos        | 3 dígitos      |
| JCB                       | 16 dígitos        | 3 dígitos      |
| ELO                       | 16 dígitos        | 3 dígitos      |

# Validação dos números do cartão

<aside class="warning">A Cielo não realiza suporte ou se responsabiliza pelo atendimento desse tipo de implementação. Esse tutorial é meramente informativo, com o propósito de ajudar o lojista a diminuir o número de transações negadas com o código 14.</aside>

## Validação dos números do cartão

A validação do número de cartão da maioria das bandeiras em todo o mundo é feita através de um algorítimo chamado Luhn, também conhecido como módulo 10. Vamos supor que o cliente tenha informado o seguinte número de cartão de crédito: 4012001037141112.

O primeiro passo é remover temporariamente o último dígito, no caso o dígito 2. O novo número vai ficar assim: 401200103714111.

| Posição          | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  |
| ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Número do cartão | 4   | 0   | 1   | 2   | 0   | 0   | 1   | 0   | 3   | 7   | 1   | 4   | 1   | 1   | 1   | _x_ |

O segundo passo é multiplicar, iniciando do primeiro dígito, todos os dígitos que estão em posição par por 2 e todos os dígitos em posição impar por 1:

| Posição          | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  |
| ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Número do cartão | 4   | 0   | 1   | 2   | 0   | 0   | 1   | 0   | 3   | 7   | 1   | 4   | 1   | 1   | 1   | -   |
| Multiplicações   | x2  | x1  | x2  | x1  | x2  | x1  | x2  | x1  | x2  | x1  | x2  | x1  | x2  | x1  | x2  |     |
| Resultados       | 8   | 0   | 2   | 2   | 0   | 0   | 2   | 0   | 6   | 7   | 2   | 4   | 2   | 1   | 2   |     |

O terceiro passo é pegar os resultados das multiplicações e somar todos os dígitos:

| Dígitos         | Cálculo                       | Resultado |
| --------------- | ----------------------------- | --------- |
| 802200206724212 | 8+0+2+2+0+0+2+0+6+7+2+4+2+1+2 | 38        |

O quarto passo é obter o resto da divisão euclidiana do resultado do terceiro passo por 10: 38 / 10 = 3, com resto 8. O quinto passo é subtrair o resto de 10: 10 - 8 = 2.

| Cálculo IV | Quociente | Resto | Cálculo V | Resultado |
| ---------- | --------- | ----- | --------- | --------- |
| 38/10      | 3         | 8     | 10-8      | 2         |

O número 2 é o dígito de verificação; se o resultado da subtração no passo 4 for 10, então o dígito de verificação será 0. Para verificar se o número do cartão informado pelo cliente é válido, basta verificar o número do primeiro passo + o dígito de verificação é igual ao número de cartão informado pelo cliente.

Um outro exemplo do cálculo, dessa vez com um cartão Martercard:

| Cartão  | 5   | 4   | 5   | 3   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 6   | 6   | 1   | 6   | 7     | Resultado |
| ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --------- |
| Passo 1 | 5   | 4   | 5   | 3   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 6   | 6   | 1   | 6   |       |           |
| Passo 2 | 10  | 4   | 10  | 3   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 6   | 12  | 1   | 12  |       |           |
| Passo 3 | 1+0 | 4   | 1+0 | 3   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 6   | 1+2 | 1   | 1+2 |       | 23        |
| Passo 4 |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     | 23%10 | 3         |
| Passo 5 |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     | 10-3  | **7**     |

## Validação no backend

Porém, mesmo tendo o plugin verificador no frontend, é fundamental, até por considerações de segurança, que uma validação de fato ocorra no backend. Para isso, a função abaixo irá ajudá-lo a fazer essa validação:

```php
<?php
function cardIsValid($cardNumber)
{
    $number = substr($cardNumber, 0, -1);
    $doubles = [];

    for ($i = 0, $t = strlen($number); $i < $t; ++$i) {
        $doubles[] = substr($number, $i, 1) * ($i % 2 == 0? 2: 1);
    }

    $sum = 0;

    foreach ($doubles as $double) {
        for ($i = 0, $t = strlen($double); $i < $t; ++$i) {
            $sum += (int) substr($double, $i, 1);
        }
    }

    return substr($cardNumber, -1, 1) == (10-$sum%10)%10;
}
```

Para utilizá-la, basta testar o número do cartão enviado pelo cliente:

```php
if (cardIsValid($customerCardNumber)) {
  // o cartão é válido e podemos dar andamento na integração
}
```
