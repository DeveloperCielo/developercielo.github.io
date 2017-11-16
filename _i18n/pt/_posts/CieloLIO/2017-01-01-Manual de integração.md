# Integração Local

## Apresentação

O objetivo da Integração Local da Cielo LIO é permitir que o aplicativo desenvolvido em Android se integre com o módulo de pedidos e pagamentos da Cielo LIO através do Cielo LIO Order Manager SDK.

Nesse modelo de integração, toda a gestão do estabelecimento comercial e da arquitetura da solução fica sob responsabilidade do aplicativo que irá utilizar o SDK nas operações de pagamento.

![modelo de integração](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/diagrama-apresentacao-images.png)

* O aplicativo do parceiro rodando na Cielo envia informações para o Cielo LIO Order Manager SDK.
* O Cielo LIO Order Manager SDK executa os fluxos para pagamento.
* O aplicativo do parceiro recebe as informações do pagamento e continua sua execução.
