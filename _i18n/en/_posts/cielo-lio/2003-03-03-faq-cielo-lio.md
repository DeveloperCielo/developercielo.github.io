---
layout: faq
title: FAQ
description: Answers to frequently asked questions made by the developers during the integration with Cielo LIO.
search: true
categories: faq
sort_order: 2
tags:
  - Cielo LIO
search: true
---

# Platform LIO questions

## If my commercial establishment changes from the LIO V1 to the LIO V2, what does it need to have the application on the new machine?

When getting the new equipment, the customer must ensure that LIO is connected to 3G or Wi-FI and then, request the apps update..

Help -> About Cielo LIO -> Update Cielo LIO apps

After this procedure, all apps that the customer has will then be transferred to the new machine as well.

## Is it required to perform a new certification for my app so that it works on LIO v2?

No, if the app is already certified, then there's no need to certificate it again, except if the developer uses in his app, exclusive LIO v2 methods and/or functionalities. In that case, he'll have to submit his app for certification.

## If the commercial establishment has LIO v1 machines as well as LIO v2, will the partner's app work on both machines?

Yes, the partner's app will work in both LIO models (V1 and V2).

## If my app already works on LIO v1, is it going to work on LIO v2 as well?

Yes, if you already have an app running on the LIO v1, it will also work on LIO v2.

## What do I do to integrate with Cielo LIO?

We have built a portal dedicated to developers to make the integration of your solution to LIO easier:

> http://desenvolvedores.cielo.com.br

In this portal, you are able to:

* Access the complete APIs documentation
* Use the SDKs to make the integration faster
* Create your accounts to receive the access keys (tokens)
* Perform the tests and development so that they can integrate with Cielo: using an emulator or sandbox.

## Can I use printers to connect on Cielo LIO?

Yes, printers with Bluetooth connection can be used by the partner's application that is running on Cielo LIO to perform the printing of any receipt required to the partner's/client's business operation.
There already are partners that are using Bluetooth printers from the Brands Zebra, Datex, Leonardo and others to integrate to Cielo LIO!
All communication protocols and pairing are under the partner's application responsibility.

## What are the Cielo LIO communication ways?

Cielo has a slot to SIM Card that allows performing the communication via 3G mobile network. With fallback to 2G and GPRS respectively.
Besides, it has as communication technology the Wi-fi.

## What are the connections available on Cielo LIO??

The USB slots on Cielo LIO are used exclusively to perform the charging on the device battery.
The Bluetooth from Cielo LIO can be used to perform the communication and exchange of informations with external devices.

## My Cielo LIO machine hasn't been delivered yet. What should I do?

Contact the Call Center and check your Cielo LIO's delivery status.

* 4002 5472 - All location
* 0800 570 8472 - Except capitals and cell phone calls

# Local Integration questions

## What do I need to get my device in production?

If your app has already been certified, you have to promote it on the Production on the Dev Console.

From that moment, it'll be available for all LIOs linked to the Private Store, in case of Private App; or in case of Public App, it'll be available for download on the LIO Store.

## Is there any sample app available??

We provide on GitHub a Sample app in a way that the developer is able to see how the calls to the SDK utilization work.

Sample app download:

> https://github.com/DeveloperCielo/LIO-SDK-Sample-Integracao-Local.

## Do I have to register to perform tests?

Yes, the register on the portal is fundamental so that you can get all access tokens and test your applications.

## Is it required to enter all the order items on the order?

Cielo LIO works with the Order (Order) concept. Thus, the procedure must always be exemplified on the SDK:

1. Create an order with draft status
2. Add items to the order
3. Prepare the order for payment (place order)
4. Perform the checkout.

If you have a variety of products, it is interesting for you to create separate items for report status of the retailer's Cielo LIO.

## Do I need a Cielo LIO machine to perform the local integration tests?

It is not required to have a Cielo LIO machine to perform the tests.

Cielo provides an app that emulates the Cielo LIO environment in any Android device, allowing the developer to perform tests of the SDK methods and debug the application during the development and integration to Cielo LIO Order Manager SDK, without necessarily having a hardware from Cielo LIO.

Emulator download:

> https://s3-sa-east-1.amazonaws.com/cielo-lio-store/apps/lio-emulator/1.0.0/lio-emulator.apk

# Remote Integration questions

## Do I have to register to perform tests?

Yes, the register on the portal is fundamental so that you can get the access tokens and tests your applications.

## What do I need to get the integration into production?

If you have already performed all tests in Sandbox and wish to send orders to Cielo LIO, contact through the Cielo Developers Portal form with the subject: "Cielo LIO Remote Integration - Tokens and information for Production", and fill the required information to get the production tokens.

# Questions about Cielo Store

## What is the Cielo Store?

It is the marketplace - app store from Cielo LIO, In the store, the customers will be able to access Cielo Store through Cielo LIO and download apps that better attend their the business model and that have the purporse of making the management and sales control easier, improve their relationship with the costumers and boost their sales.

To access and perform the upload of apps on Cielo Store, access:

> https://www.cieloliostore.com.br

## I made my register! What do I do now?

The developer will have to choose according to his app distribution purpose, between:

* Private App or Private Store 
* Public App on Cielo Store

In case you opt for Private Apps on Private Store, send a ticket on the Developers Portal and choose on the subject: "Private Store Creation" and fill the required fields.
In case you decide for Public App on Cielo Store, you'll be able to upload your app and sent it to Certification.

## What are the recommended Browsers for Uploading an app on Cielo Store?

We recommend using Google Chrome or Mozilla Firefox, preferably, to perform the apps upload on Cielo Store.

## What do I do to register as CE on Cielo?

After the approval of the app certification, when you send it for production on the Dev Console, there will be a form that must be filled and you will automatically become a CE.

## Do I have to be registered on Cielo to receive the payment of the apps?

Yes! Since the payment is performed in financial agenda, you have to register as a commercial establishment (CE).

## How do I get the payment of the apps?

The payment will be made in financial agenda.

## If my app isn't free, does Cielo Store get a portion from the sale amount?

Yes! Cielo Store acts as a 70/30 charging model, that is, 70% of the sale amount or monthly payment is directed to the developer and 30% to Cielo.

## Do I have any cost to male my app available on Cielo Store??

No! The integration to Cielo LIO is free.

## What are the existing phases on Cielo Store to publish my app?

|Phases |Description |
|-------|----------|
|**Development Phase**| In this phase, the app integration to the Cielo LIO occurs and the developer is responsible for performing this integration so that the app consumes the Cielo LIO platform functionalities. In case your app doesn't need to be integrated to the platform's functionalities, just follow to the publishing phase.|
|**Tests Phase**| Cielo provides an app that emulates the Cielo LIO environment in any Android device, allowing the developer to perform tests of the SDK methods and debug the application during the development and integration to Cielo LIO Order Manager SDK, without necessarily having a hardware from Cielo LIO. The Emulator download is made accessing the Local Integration documentation on the Developers Portal.|
|**Publishing Phase**| Create your account on Cielo Store (Dev Console) and publish your app (apk file) on Cielo Store. Cielo recommends that the developer generates the apk file using Android Studio to ensure the upload success on Cielo Store.|
|**Certification Phase**| On the Dev Console, the app published will be able to be promoted for certification. The certification team will perform security tests, functional, and business validations to ensure the integrity of the app fluxes.|
|**Production Phase**| On the Dev Console, as soon as the certification is approved, the developer will be notified and will be able to promote the app to the production status.|

## How do I change my app name?

It is required to create a new app with a different package name and follow the usual app upload process on Cielo Store.

## Is it possible to edit the information about my already published app on Cielo Store?

Yes! Just send an email to our Developers Portal support and "Send your question", requesting the edition of your app information.

## What do I do to download the apps on Cielo LIO?

On Cielo LIO, click on the Help tab -> About Cielo LIO -> Update Cielo LIO Apps.

From this moment, all apps made available for this LIO can be downloaded and installed on Cielo LIO and will be visible on the Apps tab.

## What is the max upload size limit to an app on Cielo Store?

The application must have a maximum of 100Mb so that the upload to Cielo Store is performed successfully.

## What's the difference between Public Store and Private Store?

On Public Store, the app will be available on Cielo Store for all customers that have LIO.

On the Private Store, the distribution model consists in a developer (or a group of developers), being related to a private store. This model seeks the selected app distribution, given that it is only installed in LIOs registered for that specfic store. The app that is available on the Private Store will not be available on the Public Store.
