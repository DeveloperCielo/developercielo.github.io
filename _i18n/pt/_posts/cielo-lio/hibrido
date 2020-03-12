# lio_integration

O objetivo dessa documentação é possibilitar o desenvolvimento hibrido com a Cielo LIO, por meio de Deep Link. Através dessa documentação é possivel desenvolver aplicativos em diferentes linguagens.

### Integração Híbrida Pagamento 
 
O processo de integração híbrida é um pouco diferente da integração com o SDK. É necessário definir um contrato de resposta com a LIO 
para que a mesma possa responder após o fluxo de pagamento/cancelamento/impressão. Esse contrato deve ser definido no manifest.xml da 
aplicação conforme o exemplo abaixo: 

```html
<activity android:name=".ResponseActivity">    
<intent-filter>
   <action android:name="android.intent.action.VIEW" />
   <category android:name="android.intent.category.DEFAULT" />
   <data            
      android:host="response"           
      android:scheme="order" />
</intent-filter>
</activity>
```
Os nomes "response" e "order" podem ser substituídos pelo que fizer sentido no seu aplicativo. Lembrando que na hora de fazer a 
chamada de pagamento, você deve informar os mesmos nomes para receber o callback da LIO. Para realizar o pedido de pagamento é preciso criar um json seguindo o formato definido abaixo e converte-lo para BASE64:

```json
{
"accessToken":"Seu Access-token",
"clientID":"Seu Client-id",
"email": "emaildocliente@email.com",
"installments":0,
"items":[
{
"name":"Geral",
"quantity":1,
"sku":"10",
"unitOfMeasure":"unidade",
"unitPrice":10
}
],
"paymentCode":"DEBITO_AVISTA",
"value":"10"
}
```
Como explicado anteriormente, é preciso definir o contrato de resposta (host e scheme), aqui será utilizado essa configuração no parâmetro urlCallback. A chamada de pagamento deve ser feita da seguinte forma:

```java
var base64 = getBase64(jsonString) 
var checkoutUri = "lio://payment?request=$base64&urlCallback=order://response"
```

Após preparar a URI basta realizar a chamada de intent do android utilizando o comando específico da linguagem híbrida. 

```java
var intent = Intent(Intent.ACTION_VIEW, Uri.parse(checkoutUri)) 
intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP) 
startActivity(intent) 
```

Com o pagamento finalizado a LIO retornará para a uri configurada inicialmente um JSON seguindo o formato exemplificado abaixo: 
``` json
{
   "createdAt":"Jun 8, 2018 1:51:58 PM",
   "id":"ba583f85-9252-48b5-8fed-12719ff058b9",
   "items":[
      {
         "description":"",
         "details":"",
         "id":"898e7f40-fa21-42d0-94d4-b4e95c4fd615",
         "name":"cocacola",
         "quantity":2,
         "reference":"",
         "sku":"1234",
         "unitOfMeasure":"unidade",
         "unitPrice":250
      },
      {
         "description":"",
         "details":"",
         "id":"4baea4c2-5499-4783-accc-0f8904970861",
         "name":"pepsi",
         "quantity":2,
         "reference":"",
         "sku":"4321",
         "unitOfMeasure":"unidade",
         "unitPrice":280
      }
   ],
   "notes":"",
   "number":"",
   "paidAmount":1450,
   "payments":[
      {
         "accessKey":"XXXXXXXXXXXXXXX",
         "amount":1450,
         "applicationName":"com.ads.lio.uriappclient",
         "authCode":"140126",
         "brand":"Visa",
         "cieloCode":"799871",
         "description":"",
         "discountedAmount":0,
         "externalId":"6d5f6f86-7870-4aed-b79f-0a26d6c61743",
         "id":"bb9c6305-95e5-4024-8152-503d064c0224",
         "installments":0,
         "mask":"424242-4242",
         "merchantCode":"0000000000000003",
         "paymentFields":{
            "isDoubleFontPrintAllowed":"false",
            "hasPassword":"false",
            "primaryProductCode":"4",
            "isExternalCall":"true",
            "primaryProductName":"CREDITO",
            "receiptPrintPermission":"1",
            "isOnlyIntegrationCancelable":"false",
            "upFrontAmount":"0",
            "creditAdminTax":"0",
            "firstQuotaDate":"0",
            "isFinancialProduct":"true",
            "hasSignature":"true",
            "hasPrintedClientReceipt":"false",
            "hasWarranty":"false",
            "applicationName":"com.ads.lio.uriappclient",
            "interestAmount":"0",
            "changeAmount":"0",
            "serviceTax":"0",
            "cityState":"Barueri - SP",
            "hasSentReference":"false",
            "v40Code":"4",
            "secondaryProductName":"A VISTA",
            "paymentTransactionId":"6d5f6f86-7870-4aed-b79f0a26d6c61743",
            "avaiableBalance":"0",
            "pan":"424242-4242",
            "originalTransactionId":"0",
            "originalTransactionDate":"08/06/18",
            "secondaryProductCode":"204",
            "hasSentMerchantCode":"false",
            "documentType":"J",
            "statusCode":"1",
            "merchantAddress":"Alameda Grajau, 219",
            "merchantCode":"0000000000000003",
            "paymentTypeCode":"1",
            "hasConnectivity":"true",
            "productName":"CREDITO A VISTA - I",
            "merchantName":"POSTO ABC",
            "entranceMode":"141010104080",
            "firstQuotaAmount":"0",
            "cardCaptureType":"1",
            "totalizerCode":"0",
            "requestDate":"1528476655000",
            "boardingTax":"0",
            "applicationId":"cielo.launcher",
            "numberOfQuotas":"0",
            "document":"000000000000000"
         },
         "primaryCode":"4",
         "requestDate":"1528476655000",
         "secondaryCode":"204",
         "terminal":"69000007"
      }
   ],
"pendingAmount":0,
"price":1060,
"reference":"Order",
"status":"ENTERED",
"type”:”9”,  
"updatedAt":"Jun 8, 2018 1:51:58 PM" 
}
```

### Recuperando dados do pagamento

Para recuperar os dados de pagamento basta acessar a intent na activity de resposta e no parâmetro data, acessar a uri, da seguinte forma: 

``` java
val responseIntent = intent 
if (Intent.ACTION_VIEW == responseIntent.action) { 
   val uri = responseIntent.data 
   val response = uri.getQueryParameter("response") 
   val data = Base64.decode(response, Base64.DEFAULT) 
   val json = String(data) 
}
```

Lembrando que o parâmetro “response” é o mesmo que foi configurado como resposta na chamada de pagamento. 

### Cancelamento na integração híbrida 

Para realizar o cancelamento é preciso criar um json seguindo o formato definido abaixo e converte-lo para BASE64:

```json
{
   "id":"id da ordem",
   "clientID":"seu client ID",
   "accessToken":"seu access token",
   "cieloCode":"123",
   "authCode":"123",
   "value":1000
}
```

A chamada de cancelamento deve ser feita da seguinte forma. Como explicado anteriormente, é preciso definir o contrato de resposta, aqui será utilizado essa configuração no parâmetro urlCallback: 

```java
var base64 = getBase64(jsonString) 
var checkoutUri ="lio://paymentreversal?request=$base64&urlCallback=order://response" 
```
 
Para recuperar os dados basta acessar a intent na activity de resposta e no parâmetro data, acessar a uri, da seguinte forma: 

```java
val responseIntent = intent 
if (Intent.ACTION_VIEW == responseIntent.action) { 
   val uri = responseIntent.data 
   val response = uri.getQueryParameter("response") 
   val data = Base64.decode(response, Base64.DEFAULT) 
   val json = String(data) 
}
```

### Impressão:

Para realizar a impressão, basta montar uma URL com o seguinte formato:

```java
lio://print?request=$base64&urlCallback=order://response
```

Segue abaixo, alguns exemplos de impressão:

#### Texto:

``` json
{
"operation":"PRINT_TEXT",
"styles":[
{
}
],
"value":[
"teste impressão"
]
}
```

#### Imagem:

```json
{
"operation":"PRINT_IMAGE",
"styles":[
{
}
],
"value":[
"/storage/emulated/0/saved_images/Image-5005.jpg"
]
}
```
#### Multi:

```json
{
"operation":"PRINT_MULTI_COLUMN_TEXT",
"styles":[
{
"key_attributes_align":1,
"key_attributes_textsize":30,
"key_attributes_typeface":0
},
{
"key_attributes_align":0,
"key_attributes_textsize":20,
"key_attributes_typeface":1
},
{
"key_attributes_align":2,
"key_attributes_textsize":15,
"key_attributes_typeface":2
}
],
"value":[
"Texto alinhado à esquerda.\n\n\n",
"Texto centralizado\n\n\n",
"Texto alinhado à direita\n\n\n"
]
}
```

### Observações:

Você pode solicitar as credenciais (client-id/access-token) diretamente via [PORTAL DE DESENVOLVEDORES](https://desenvolvedores.cielo.com.br/api-portal/pt-br/myapps/new)

![fluxo](https://desenvolvedores.cielo.com.br/api-portal/sites/default/files/apis.png)

Disponibilizamos também a lista do campo “paymentCode”:

| PaymentCode            |
|------------------------|
| DEBITO_AVISTA          |
| DEBITO_PREDATADO       |
| CREDITO_AVISTA         |
| CREDITO_PARCELADO_LOJA |
| CREDITO_PARCELADO_ADM  |
| PRE_AUTORIZACAO        |
| VOUCHER_ALIMENTACAO    |
| VOUCHER_REFEICAO       |

> **Atenção**: Para que seja possível integrar de forma híbrida o nosso time de Suporte  a Desenvolvedores precisa enviar o aplicativo UriAppClient para a LIO. Para isso, [Abra um ticket](https://devcielo.zendesk.com/hc/pt-br/requests/new?ticket_form_id=360000201671) em nossa ferramente de atedimento.
