---
layout: manual
title: Split Payments - Onboarding
description: Split Payments - Onboarding
search: true
toc_footers: false
categories: manual
sort_order: 3
hub_visible: false
tags:
---

# Split Payments - Onboarding

## Introduction

**Split Payments** provides an API to manage Subordinates on the platform.
The Master must provide Subordinate information in order to use it during the Onboarding process.

Just like the Master, Subordinates also need to go through the KYC (Know Your Customer) process. It is necessary to validate the Subordinate and some documentation is required.

This KYC process is a required action by financial regulatory agencies.

The Subordinate's onboarding process has the following steps:

1. Master requests Subordinate's enrollment.
2. The Subordinate will be created in our system with status "Under Analysis". That means the Subordinate cannot participate in the transaction until the KYC process is finished.
3. After the analysis, Master will be notified about the result of the KYC process and the Subordinate ID.

## Environments

### Sandbox

**Onboarding API**: https://splitonboardingsandbox.cieloecommerce.cielo.com.br

### Production

**Onboarding API**: https://splitonboarding.cieloecommerce.cielo.com.br

## Subordinate's Enrollment

To enroll a Subordinate, **Master** should make a request with the Subordinate's information.

There are two ways to establish agreements between Master and its Subordinates with **Split Payments**:

1. Setting the MDR (Merchant Discount Rate) to be charged for each transaction by Payment Arrangements and installments range.
2. If Master do not set the MDR for each Payment Arrangement and installments range, **Split Payments** will get the same agreements between Master and Acquirer and copy the values to the agreements between Master and Subordinate.

**Example: **

**MDR from Master to Subordinate: 4%**

| Agreement Acquirer vs. Master | Visa  | Master | Elo   | Diners | Amex  | Hiper  |
|----------------------------------|-------|--------|-------|--------|-------|--------|
| Debit                            | 2.00% | 2.00%  | 2.00% |        |       |        |  
| Credit 1x                        | 2.50% | 2.50%  | 2.50% | 2.50%  | 2.50% |  2.50% |
| Credit 2x to 6x                  | 3.00% | 3.00%  | 3.00% | 3.00%  | 3.00% |  3.00% |
| Credit 7x to 12x                 | 3.50% | 3.50%  | 3.50% | 3.50%  | 3.50% |  3.50% |
 
| Agreement Master vs. Subordinate | Visa  | Master | Elo   | Diners | Amex  | Hiper  |
|----------------------------------|-------|--------|-------|--------|-------|--------|
| Debit                            | 4.00% | 4.00%  | 4.00% |        |       |        |  
| Credit 1x                        | 4.00% | 4.00%  | 4.00% | 4.00%  | 4.00% |  4.00% |
| Credit 2x to 6x                  | 4.00% | 4.00%  | 4.00% | 4.00%  | 4.00% |  4.00% |
| Credit 7x to 12x                 | 4.00% | 4.00%  | 4.00% | 4.00%  | 4.00% |  4.00% |

**Request**

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{split-onboarding-api}/api/subordinates</span></aside>

### Setting the MDR by Payment Arrangements and installments range

```json
--header "Authorization: Bearer {access_token}"
{
    "CorporateName":"Subordinate Corp.",
    "FancyName":"Subordinate Fancy Name",
    "DocumentNumber":"96462142000140",
    "DocumentType":"CNPJ",
    "MerchantCategoryCode":"5719",
    "ContactName":"George Silva",
    "ContactPhone":"11987654321",
    "MailAddress":"address@email.com",
    "Website":"https://www.website.com.br",
    "BankAccount": {
        "Bank":"001",
        "BankAccountType":"CheckingAccount",
        "Number":"0002",
        "Operation":"2",
        "VerifierDigit":"2",
        "AgencyNumber":"0002",
        "AgencyDigit":"2",
        "DocumentNumber":"96462142000140",
        "DocumentType":"CNPJ"
    },
    "Address":{  
        "Street":"Jhon st",
        "Number":"55",
        "Complement":"Rm 701",
        "Neighborhood":"Manhattan",
        "City":"New York",
        "State" : "NY",
        "ZipCode": "10038"
    },
    "Agreement":{
        "Fee" : 10,
        "MerchantDiscountRates": [{
            "PaymentArrangement": {
                "Product": "DebitCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 1.5
        },
        {
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 2.0
        },
        {
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 2,
            "FinalInstallmentNumber" : 6,
            "Percent" : 3.0
        },
        {
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 7,
            "FinalInstallmentNumber" : 12,
            "Percent" : 4.0
        }]
    },
    "Notification": {
        "Url": "https://endpoint.com.br/api/subordinates",
        "Headers": [{
            "Key": "key1",
            "Value": "value1"
        },
        {
            "Key": "key2",
            "Value": "value2"
        }]
    },
    "Attachments": [{
        "AttachmentType": "ProofOfBankDomicile",
        "File": {
            "Name": "evidence",
            "FileType": "png",
            "Data": "iVBORw0KGgoAAAANSUhEUgAAAH4AAAAsCAMAAACUu/xGAAAAq1BMVEUAAABlZVJlZVKsrJthYU+zs6Grq5ylpZazs6FlZVJfX01lZVJlZVKsrJurq5urq5xlZVKtrZ1lZVJlZVKvr52zs6GysqCoqJeqqpmzs6Grq5xlZVJgYE6zs6Gnp5mrq5yiopRjY1CRkX2rq5yzs6FlZVKRkX2goJKKineRkX2Pj3yrq5yIiHWRkX2RkX2RkX1lZVKRkX2rq5yzs6GoqJdfX02goJKHh3SHh3VrpzVsAAAAMHRSTlMAQIDHx3+Ax0Ag7qBgIA9AEFCPMLOgMO7bYKBQ24+zYNuzkY9wcAXu0oiocPFBMHYlVbK0AAAD3UlEQVRYw6SW7Y6qMBCGB0IkLfKdnB9ocFmjru7HERL03P+VnXY6bdmWjcF9f2inxjydvjMDcHy99zP693oEpTpQYjBR7W4VmzA81GoZCDn/ycrValVmYOJcKBWL1/4HnUEpupLGxOI47iQmDkfc4GEBEFyNQkClzYDKQQs3VmJBufu6G7zRWNMeUzEHUnLVWs/gy9vg4NNB4wUIPOG2h7e8NcV0HRt7QPDxfzTd4ptleB5F6ro3NtsIc7UnjMKKXyuN30ZS+PuLRMW7PN+l2vlhAZ6yqCZmcrm05stfOrwVpvEBaJWStIOpVk/gC8Rb62tjRj25Fx/fEsgqE27cluKB8GR9hDFzeX44CFbmJb9/Cn8w1ldA5tO9VD/gc8FpveTbxfi1LXWOl10Z80c0Yx7/jpyyjRtd9zuxU8ZL8FEYJjZFpg6yIfOpKsf1FJ+EUkzddKkabQ+o0zCcwMN/vZm+uLh4UmW7nptTCBVq5nUF4Y0CgBaNVip18jsPn370909cfX708/gusF3fkQfrKZHXHh45Wi8meRefvfVCfwGOZ9zx8TZ9TjWY2M6vVf4jm8e3WYrDJ1Vj4N3FHwVd6vKFCxefBMFmq7ub6UI7TMZw0SEv8ryPDVaoxPiWufhL/02zY0cm3ZH1VgxIIYa1U/nIibH/EZjjp4M/9w/x9FijbyuqdzOVH+BbWQJxHMupd4pjINhDPKVH1lslBl9g6OKb73j0wmoBHrMj691nsJ0QLn4l0/09nrIm6wv7nGdQqwjGucvPJSWjN4z8aXyBlkfK+i2gmDI/HENGjXA9uPhsUJ22p2OQFg3daaFx0/9qnWBRbOl9hHlvOw3OW/xs4Hf4rcnYzj+OeFOIHj4dtG7/2y+b3IhBGAqjUiQWQ9JI/ErDpop6gcei9z9ZIXHIhLaLSGRW8zYxIuaTZccxqsGfHDXvH4cf37Z4e3ihxVOTp5bf4E8N2u+3PWB2SP7tXsfsFl80rtOeZX/gvz6//7tmnFFzD2mkxnFgL710ToHH1eCcm/LU2aA9m027v+kBH8ipyHbACxAMWaV5I4v2ZgAzIxkUGXIqkn3xrhw4wVe8hoMmOwBmYJMiJy+lHPriNcSyrvgEgUS2h/vl1BcvSqgcZsPbbABrhgdgvhgvS6hIYsPP8MwTVR5SLZA4573xHMpCV7xGZBFmxyProfR64yNCgKh4hygjXIuvpdcbPyEayA2vsEpRHcgl6gtzr8A9ho0RlgQnBPoK4tV45gBfGQZ6KQBDqzRcjdeAqQwHUfYp+SohcQdc1/Ukm4Gw4dV6vqTkM+uQpRv8E2VPF/sPp9xSb2qlGH4AAAAASUVORK5CYII="
        }
    }]
}
```

| Property                                                        | Type    | Size    | Required    | Description                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------|---------|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CorporateName`                                                 | Guid    | 36      | Yes         | Corporate Name                                                                                                                                                                                                                                                                                              |
| `FancyName`                                                     | String  | 50      | Yes         | Fancy Name                                                                                                                                                                                                                                                                                                  |
| `DocumentNumber`                                                | String  | 14      | Yes         | Document number (digits only)                                                                                                                                                                                                                                                                               |     
| `DocumentType`                                                  | String  | -       | Yes         | Document Type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                                  |
| `MerchantCategoryCode`                                          | String  | 4       | Yes         | A Merchant Category Code (MCC) is a four-digit number listed in ISO 18245 for retail financial services. MCC is used to classify the business by the type of goods or services it provides. [List of MCC codes](https://www.web-payment-software.com/online-merchant-accounts/mcc-codes/){:target="_blank"} |
| `ContactName`                                                   | String  | 100     | Yes         | Name of the Merchant representative                                                                                                                                                                                                                                                                         |
| `ContactPhone`                                                  | String  | 11      | Yes         | Merchant Representative's phone number (digits only)                                                                                                                                                                                                                                                        |
| `MailAddress`                                                   | String  | 50      | Yes         | e-mail address                                                                                                                                                                                                                                                                                              |
| `Website`                                                       | String  | 200     | No          | Website address                                                                                                                                                                                                                                                                                             |
| `BankAccount.Bank`                                              | String  | 3       | Yes         | Bank code. [Bank codes in Brazil](https://www.bcb.gov.br/Fis/CODCOMPE/Tabela.pdf){:target="_blank"}                                                                                                                                                                                                         |
| `BankAccount.BankAccountType`                                   | String  | -       | Yes         | Account type. Accepted values: `CheckingAccount`, `SavingsAccount`                                                                                                                                                                                                                                          |
| `BankAccount.Number`                                            | String  | 20      | Yes         | Account Number                                                                                                                                                                                                                                                                                              |
| `BankAccount.Operation`                                         | String  | 10      | No          | Operation code. Some bank institutions have a special code to identify the profile of its client                                                                                                                                                                                                            |
| `BankAccount.VerifierDigit`                                     | Char    | 1       | Yes         | Check digit of the account number                                                                                                                                                                                                                                                                           |
| `BankAccount.AgencyNumber`                                      | String  | 15      | Yes         | Agency number                                                                                                                                                                                                                                                                                               |
| `BankAccount.AgencyDigit`                                       | Char    | 1       | Yes         | Check digit of agency number. Set `0` when n/a                                                                                                                                                                                                                                                              |
| `BankAccount.DocumentNumber`                                    | String  | 14      | Yes         | Account holder document number (digits only)                                                                                                                                                                                                                                                                |
| `BankAccount.DocumentType`                                      | String  | -       | Yes         | Account holder document type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                   | 
| `Address.Street`                                                | String  | 100     | Yes         | Street name                                                                                                                                                                                                                                                                                                 |
| `Address.Number`                                                | String  | 15      | Yes         | The number from street address                                                                                                                                                                                                                                                                              |
| `Address.Complement`                                            | String  | 80      | No          | Additional information of the address                                                                                                                                                                                                                                                                       |
| `Address.Neighborhood`                                          | String  | 50      | Yes         | Neighborhood                                                                                                                                                                                                                                                                                                |
| `Address.City`                                                  | String  | 50      | Yes         | City                                                                                                                                                                                                                                                                                                        |
| `Address.State`                                                 | String  | 2       | Yes         | State postal abbreviation                                                                                                                                                                                                                                                                                   |
| `Address.ZipCode`                                               | String  | 9       | Yes         | Zip code (digits only)                                                                                                                                                                                                                                                                                      |
| `Agreement.Fee`                                                 | Int     | -       | Yes         | Fixed fee for each transaction. Value in cents. Ex: BRL 1.00 = `"Fee" : 100`                                                                                                                                                                                                                                 |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Product`  | String  | -       | Yes         | Payment arrangement product of subordinate MDR. Accepted values: `CreditCard`, `DebitCard`                                                                                                                                                                                                                  |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Brand`    | String  | -       | Yes         | Payment arrangement brand of subordinate MDR. Accepted values: `Visa`, `Master`, `Amex`, `Elo`, `Diners`, `Discover`, `Hipercard`                                                                                                                                                                           |
| `Agreement.MerchantDiscountRates[].InitialInstallmentNumber`    | Int     | -       | Yes         | The start number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                       |
| `Agreement.MerchantDiscountRates[].FinalInstallmentNumber`      | Int     | -       | Yes         | The end number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                         |
| `Agreement.MerchantDiscountRates[].Percent`                     | Decimal | -       | Yes         | Subordinate discount rate. Value with up to two decimal places.                                                                                                                                                                                                                                             |
| `Notification.Url`                                              | String  | 200     | Yes         | Notification URL for KYC process status change                                                                                                                                                                                                                                                              |
| `Notification.Headers[].Key`                                    | String  | 100     | Yes         | Notification request header key for KYC process status change                                                                                                                                                                                                                                               |
| `Notification.Headers[].Value`                                  | String  | 100     | Yes         | Notification request header value for KYC process status change                                                                                                                                                                                                                                             |
| `Attachments[].AttachmentType`                                  | String  | -       | Yes         | Type of Subordinate's document to be attached. Accepted values are: `ProofOfBankDomicile` (Evidence of bank domiciliation), `ModelOfAdhesionTerm` (Acceptance terms template)                                                                                                                               |
| `Attachments[].File.Name`                                       | String  | 50      | Yes         | Name of Subordinate's document to be attached                                                                                                                                                                                                                                                               |
| `Attachments[].File.FileType`                                   | String  | -       | Yes         | Format of Subordinate's document to be attached. Accepted values are: `pdf`, `png`, `jpg`, `jpeg`                                                                                                                                                                                                           |
| `Attachments[].File.Data`                                       | String  | -       | Yes         | Document in **Base64** format                                                                                                                                                                                                                                                                               |

**Response**

```json
--header "Authorization: Bearer {access_token}"
{
    "MasterMerchantId": "665a33c5-0022-4a40-a0bd-daad04eb3236",
    "MerchantId": "b8ccc729-a874-4b51-a5a9-ffeb5bd98878",
    "CorporateName":"Subordinate Corp.",
    "FancyName":"Subordinate Fancy Name",
    "DocumentNumber":"96462142000140",
    "DocumentType":"CNPJ",
    "MerchantCategoryCode":"5719",
    "ContactName":"George Silva",
    "ContactPhone":"11987654321",
    "MailAddress":"address@email.mail.com",
    "Website":"https://www.website.com.br",
    "Blocked": true,
    "Analysis": {
        "Status": "UnderAnalysis"
    },
    "BankAccount": {
        "Bank":"001",
        "BankAccountType":"CheckingAccount",
        "Number":"0002",
        "Operation":"2",
        "VerifierDigit":"2",
        "AgencyNumber":"0002",
        "AgencyDigit":"2",
        "DocumentNumber":"96462142000140",
        "DocumentType":"CNPJ"
    },
    "Address":{  
        "Street":"Jhon st",
        "Number":"55",
        "Complement":"Rm 701",
        "Neighborhood":"Manhattan",
        "City":"New York",
        "State" : "NY",
        "ZipCode": "10038"
    },
    "Agreement":{
        "Fee" : 10,
        "MerchantDiscountRates": [{
            "MerchantDiscountRateId": "662e340f-07f2-4827-816d-b1878eb03eae",
            "PaymentArrangement": {
                "Product": "DebitCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 1.5
        },
        {
            "MerchantDiscountRateId": "eb9d6357-7ad1-4fe0-90fe-364cff7ff0fd",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 2.0
        },
        {
            "MerchantDiscountRateId": "d09fe9d3-98c7-4c37-9bd3-7c1c91ee15de",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 2,
            "FinalInstallmentNumber" : 6,
            "Percent" : 3.0
        },
        {
            "MerchantDiscountRateId": "e2515c24-fd73-4b8e-92ad-cfe2b95239de",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 7,
            "FinalInstallmentNumber" : 12,
            "Percent" : 4.0
        }]
    },
    "Notification": {
        "Url": "https://endpoint.com.br/api/subordinates",
        "Headers": [{
            "Key": "key1",
            "Value": "value1"
        },
        {
            "Key": "key2",
            "Value": "value2"
        }]
    },
    "Attachments": [{
        "AttachmentType": "ProofOfBankDomicile",
        "File": {
            "Name": "evidence",
            "FileType": "png"
        }
    }]
}
```

| Property                                                        | Type    | Size    | Required    | Description                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------|---------|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MasterMerchantId`                                              | Guid    | 36      | Yes         | ID of Subordinate's master                                                                                                                                                                                                                                                                                  |
| `MerchantId`                                                    | Guid    | 36      | Yes         | Subordinate ID                                                                                                                                                                                                                                                                                              |
| `CorporateName`                                                 | Guid    | 36      | Yes         | Corporate Name                                                                                                                                                                                                                                                                                              |
| `FancyName`                                                     | String  | 50      | Yes         | Fancy Name                                                                                                                                                                                                                                                                                                  |
| `DocumentNumber`                                                | String  | 14      | Yes         | Document number                                                                                                                                                                                                                                                                                             |
| `DocumentType`                                                  | String  | -       | Yes         | Document Type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                                  |
| `MerchantCategoryCode`                                          | String  | 4       | Yes         | A Merchant Category Code (MCC) is a four-digit number listed in ISO 18245 for retail financial services. MCC is used to classify the business by the type of goods or services it provides. [List of MCC codes](https://www.web-payment-software.com/online-merchant-accounts/mcc-codes/){:target="_blank"} |
| `ContactName`                                                   | String  | 100     | Yes         | Name of the Merchant representative                                                                                                                                                                                                                                                                         |
| `ContactPhone`                                                  | String  | 11      | Yes         | Merchant Representative's phone number (digits only)                                                                                                                                                                                                                                                        |
| `MailAddress`                                                   | String  | 50      | Yes         | e-mail address                                                                                                                                                                                                                                                                                              |
| `Website`                                                       | String  | 200     | No          | Website address                                                                                                                                                                                                                                                                                             |
| `Blocked`                                                       | Boolean | -       | Yes         | A flag to indicate if the Subordinate is blocked to participate in the transaction                                                                                                                                                                                                                          |
| `Analysis.Status`                                               | String  | -       | Yes         | KYC process status. Values may be: `Approved`, `ApprovedWithRestriction`, `Rejected`                                                                                                                                                                                                                        |
| `BankAccount.Bank`                                              | String  | 3       | Yes         | Bank code. [Bank codes in Brazil](https://www.bcb.gov.br/Fis/CODCOMPE/Tabela.pdf){:target="_blank"}                                                                                                                                                                                                         |
| `BankAccount.BankAccountType`                                   | String  | -       | Yes         | Account type. Accepted values: `CheckingAccount`, `SavingsAccount`                                                                                                                                                                                                                                          |
| `BankAccount.Number`                                            | String  | 20      | Yes         | Account Number                                                                                                                                                                                                                                                                                              |
| `BankAccount.Operation`                                         | String  | 10      | No          | Operation code. Some bank institutions have a special code to identify the profile of its client                                                                                                                                                                                                            |
| `BankAccount.VerifierDigit`                                     | Char    | 1       | Yes         | Check digit of the account number                                                                                                                                                                                                                                                                           |
| `BankAccount.AgencyNumber`                                      | String  | 15      | Yes         | Agency number                                                                                                                                                                                                                                                                                               |
| `BankAccount.AgencyDigit`                                       | Char    | 1       | Yes         | Check digit of agency number. Set `0` when n/a                                                                                                                                                                                                                                                              |
| `BankAccount.DocumentNumber`                                    | String  | 14      | Yes         | Account holder document number (digits only)                                                                                                                                                                                                                                                                |
| `BankAccount.DocumentType`                                      | String  | -       | Yes         | Account holder document type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                   | 
| `Address.Street`                                                | String  | 100     | Yes         | Street name                                                                                                                                                                                                                                                                                                 |
| `Address.Number`                                                | String  | 15      | Yes         | The number from street address                                                                                                                                                                                                                                                                              |
| `Address.Complement`                                            | String  | 80      | No          | Additional information of the address                                                                                                                                                                                                                                                                       |
| `Address.Neighborhood`                                          | String  | 50      | Yes         | Neighborhood                                                                                                                                                                                                                                                                                                |
| `Address.City`                                                  | String  | 50      | Yes         | City                                                                                                                                                                                                                                                                                                        |
| `Address.State`                                                 | String  | 2       | Yes         | State postal abbreviation                                                                                                                                                                                                                                                                                   |
| `Address.ZipCode`                                               | String  | 9       | Yes         | Zip code                                                                                                                                                                                                                                                                                                    |
| `Agreement.Fee`                                                 | Int     | -       | Yes         | Fixed fee for each transaction. Value in cents. Ex: BRL 1.00 = `"Fee" : 100`                                                                                                                                                                                                                                 |
| `Agreement.MerchantDiscountRates[].MerchantDiscountRateId`      | Guid    | 36      | Yes         | MDR ID                                                                                                                                                                                                                                                                                                      |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Product`  | String  | -       | Yes         | Payment arrangement product of subordinate MDR. Accepted values: `CreditCard`, `DebitCard`                                                                                                                                                                                                                  |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Brand`    | String  | -       | Yes         | Payment arrangement brand of subordinate MDR. Accepted values: `Visa`, `Master`, `Amex`, `Elo`, `Diners`, `Discover`, `Hipercard`                                                                                                                                                                           |
| `Agreement.MerchantDiscountRates[].InitialInstallmentNumber`    | Int     | -       | Yes         | The start number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                       |
| `Agreement.MerchantDiscountRates[].FinalInstallmentNumber`      | Int     | -       | Yes         | The end number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                         |
| `Agreement.MerchantDiscountRates[].Percent`                     | Decimal | -       | Yes         | Subordinate discount rate. Value with up to two decimal places.                                                                                                                                                                                                                                             |
| `Notification.Url`                                              | String  | 200     | Yes         | Notification URL for KYC process status change                                                                                                                                                                                                                                                              |
| `Notification.Headers[].Key`                                    | String  | 100     | Yes         | Notification request header key for KYC process status change                                                                                                                                                                                                                                               |
| `Notification.Headers[].Value`                                  | String  | 100     | Yes         | Notification request header value for KYC process status change                                                                                                                                                                                                                                             |
| `Attachments[].AttachmentType`                                  | String  | -       | Yes         | Type of Subordinate's document to be attached. Accepted values are: `ProofOfBankDomicile` (Evidence of bank domiciliation), `ModelOfAdhesionTerm` (Acceptance terms template)                                                                                                                               |
| `Attachments[].File.Name`                                       | String  | 50      | Yes         | Name of Subordinate's document to be attached                                                                                                                                                                                                                                                               |
| `Attachments[].File.FileType`                                   | String  | -       | Yes         | Format of Subordinate's document to be attached. Accepted values are: `pdf`, `png`, `jpg`, `jpeg`                                                                                                                                                                                                           |

### Setting the same MDR for all agreements

```json
--header "Authorization: Bearer {access_token}"
{
    "CorporateName":"Subordinate Corp.",
    "FancyName":"Subordinate Fancy Name",
    "DocumentNumber":"96462142000140",
    "DocumentType":"CNPJ",
    "MerchantCategoryCode":"5719",
    "ContactName":"George Silva",
    "ContactPhone":"11987654321",
    "MailAddress":"address@email.mail.com",
    "Website":"https://www.website.com.br",
    "BankAccount": {
        "Bank":"001",
        "BankAccountType":"CheckingAccount",
        "Number":"0002",
        "Operation":"2",
        "VerifierDigit":"2",
        "AgencyNumber":"0002",
        "AgencyDigit":"2",
        "DocumentNumber":"96462142000140",
        "DocumentType":"CNPJ"
    },
    "Address":{  
        "Street":"Jhon st",
        "Number":"55",
        "Complement":"Rm 701",
        "Neighborhood":"Manhattan",
        "City":"New York",
        "State" : "NY",
        "ZipCode": "10038"
    },
    "Agreement":{
        "Fee" : 10,
        "MdrPercentage": 4.00
    },
    "Notification": {
        "Url": "https://endpoint.com.br/api/subordinates",
        "Headers": [{
            "Key": "key1",
            "Value": "value1"
        },
        {
            "Key": "key2",
            "Value": "value2"
        }]
    },
    "Attachments": [{
        "AttachmentType": "ProofOfBankDomicile",
        "File": {
            "Name": "evidence",
            "FileType": "png",
            "Data": "iVBORw0KGgoAAAANSUhEUgAAAH4AAAAsCAMAAACUu/xGAAAAq1BMVEUAAABlZVJlZVKsrJthYU+zs6Grq5ylpZazs6FlZVJfX01lZVJlZVKsrJurq5urq5xlZVKtrZ1lZVJlZVKvr52zs6GysqCoqJeqqpmzs6Grq5xlZVJgYE6zs6Gnp5mrq5yiopRjY1CRkX2rq5yzs6FlZVKRkX2goJKKineRkX2Pj3yrq5yIiHWRkX2RkX2RkX1lZVKRkX2rq5yzs6GoqJdfX02goJKHh3SHh3VrpzVsAAAAMHRSTlMAQIDHx3+Ax0Ag7qBgIA9AEFCPMLOgMO7bYKBQ24+zYNuzkY9wcAXu0oiocPFBMHYlVbK0AAAD3UlEQVRYw6SW7Y6qMBCGB0IkLfKdnB9ocFmjru7HERL03P+VnXY6bdmWjcF9f2inxjydvjMDcHy99zP693oEpTpQYjBR7W4VmzA81GoZCDn/ycrValVmYOJcKBWL1/4HnUEpupLGxOI47iQmDkfc4GEBEFyNQkClzYDKQQs3VmJBufu6G7zRWNMeUzEHUnLVWs/gy9vg4NNB4wUIPOG2h7e8NcV0HRt7QPDxfzTd4ptleB5F6ro3NtsIc7UnjMKKXyuN30ZS+PuLRMW7PN+l2vlhAZ6yqCZmcrm05stfOrwVpvEBaJWStIOpVk/gC8Rb62tjRj25Fx/fEsgqE27cluKB8GR9hDFzeX44CFbmJb9/Cn8w1ldA5tO9VD/gc8FpveTbxfi1LXWOl10Z80c0Yx7/jpyyjRtd9zuxU8ZL8FEYJjZFpg6yIfOpKsf1FJ+EUkzddKkabQ+o0zCcwMN/vZm+uLh4UmW7nptTCBVq5nUF4Y0CgBaNVip18jsPn370909cfX708/gusF3fkQfrKZHXHh45Wi8meRefvfVCfwGOZ9zx8TZ9TjWY2M6vVf4jm8e3WYrDJ1Vj4N3FHwVd6vKFCxefBMFmq7ub6UI7TMZw0SEv8ryPDVaoxPiWufhL/02zY0cm3ZH1VgxIIYa1U/nIibH/EZjjp4M/9w/x9FijbyuqdzOVH+BbWQJxHMupd4pjINhDPKVH1lslBl9g6OKb73j0wmoBHrMj691nsJ0QLn4l0/09nrIm6wv7nGdQqwjGucvPJSWjN4z8aXyBlkfK+i2gmDI/HENGjXA9uPhsUJ22p2OQFg3daaFx0/9qnWBRbOl9hHlvOw3OW/xs4Hf4rcnYzj+OeFOIHj4dtG7/2y+b3IhBGAqjUiQWQ9JI/ErDpop6gcei9z9ZIXHIhLaLSGRW8zYxIuaTZccxqsGfHDXvH4cf37Z4e3ihxVOTp5bf4E8N2u+3PWB2SP7tXsfsFl80rtOeZX/gvz6//7tmnFFzD2mkxnFgL710ToHH1eCcm/LU2aA9m027v+kBH8ipyHbACxAMWaV5I4v2ZgAzIxkUGXIqkn3xrhw4wVe8hoMmOwBmYJMiJy+lHPriNcSyrvgEgUS2h/vl1BcvSqgcZsPbbABrhgdgvhgvS6hIYsPP8MwTVR5SLZA4573xHMpCV7xGZBFmxyProfR64yNCgKh4hygjXIuvpdcbPyEayA2vsEpRHcgl6gtzr8A9ho0RlgQnBPoK4tV45gBfGQZ6KQBDqzRcjdeAqQwHUfYp+SohcQdc1/Ukm4Gw4dV6vqTkM+uQpRv8E2VPF/sPp9xSb2qlGH4AAAAASUVORK5CYII="
        }
    }]
}
```

| Property                                                        | Type    | Size    | Required    | Description                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------|---------|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CorporateName`                                                 | Guid    | 36      | Yes         | Corporate Name                                                                                                                                                                                                                                                                                              |
| `FancyName`                                                     | String  | 50      | Yes         | Fancy Name                                                                                                                                                                                                                                                                                                  |
| `DocumentNumber`                                                | String  | 14      | Yes         | Document number (digits only)                                                                                                                                                                                                                                                                               |     
| `DocumentType`                                                  | String  | -       | Yes         | Document Type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                                  |
| `MerchantCategoryCode`                                          | String  | 4       | Yes         | A Merchant Category Code (MCC) is a four-digit number listed in ISO 18245 for retail financial services. MCC is used to classify the business by the type of goods or services it provides. [List of MCC codes](https://www.web-payment-software.com/online-merchant-accounts/mcc-codes/){:target="_blank"} |
| `ContactName`                                                   | String  | 100     | Yes         | Name of the Merchant representative                                                                                                                                                                                                                                                                         |
| `ContactPhone`                                                  | String  | 11      | Yes         | Merchant Representative's phone number (digits only)                                                                                                                                                                                                                                                        |
| `MailAddress`                                                   | String  | 50      | Yes         | e-mail address                                                                                                                                                                                                                                                                                              |
| `Website`                                                       | String  | 200     | No          | Website address                                                                                                                                                                                                                                                                                             |
| `BankAccount.Bank`                                              | String  | 3       | Yes         | Bank code. [Bank codes in Brazil](https://www.bcb.gov.br/Fis/CODCOMPE/Tabela.pdf){:target="_blank"}                                                                                                                                                                                                         |
| `BankAccount.BankAccountType`                                   | String  | -       | Yes         | Account type. Accepted values: `CheckingAccount`, `SavingsAccount`                                                                                                                                                                                                                                          |
| `BankAccount.Number`                                            | String  | 20      | Yes         | Account Number                                                                                                                                                                                                                                                                                              |
| `BankAccount.Operation`                                         | String  | 10      | No          | Operation code. Some bank institutions have a special code to identify the profile of its client                                                                                                                                                                                                            |
| `BankAccount.VerifierDigit`                                     | Char    | 1       | Yes         | Check digit of the account number                                                                                                                                                                                                                                                                           |
| `BankAccount.AgencyNumber`                                      | String  | 15      | Yes         | Agency number                                                                                                                                                                                                                                                                                               |
| `BankAccount.AgencyDigit`                                       | Char    | 1       | Yes         | Check digit of agency number. Set `0` when n/a                                                                                                                                                                                                                                                              |
| `BankAccount.DocumentNumber`                                    | String  | 14      | Yes         | Account holder document number (digits only)                                                                                                                                                                                                                                                                |
| `BankAccount.DocumentType`                                      | String  | -       | Yes         | Account holder document type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                   | 
| `Address.Street`                                                | String  | 100     | Yes         | Street name                                                                                                                                                                                                                                                                                                 |
| `Address.Number`                                                | String  | 15      | Yes         | The number from street address                                                                                                                                                                                                                                                                              |
| `Address.Complement`                                            | String  | 80      | No          | Additional information of the address                                                                                                                                                                                                                                                                       |
| `Address.Neighborhood`                                          | String  | 50      | Yes         | Neighborhood                                                                                                                                                                                                                                                                                                |
| `Address.City`                                                  | String  | 50      | Yes         | City                                                                                                                                                                                                                                                                                                        |
| `Address.State`                                                 | String  | 2       | Yes         | State postal abbreviation                                                                                                                                                                                                                                                                                   |
| `Address.ZipCode`                                               | String  | 9       | Yes         | Zip code (digits only)                                                                                                                                                                                                                                                                                      |
| `Agreement.Fee`                                                 | Int     | -       | Yes         | Fixed fee for each transaction. Value in cents. Ex: BRL 1.00 = `"Fee" : 100`                                                                                                                                                                                                                                 |
| `Agreement.MdrPercentage`                                       | Decimal | -       | Yes         | Subordinate discount rate applied to all agreements between Master and Subordinate. Value with up to two decimal places                                                                                                                                                                                     |
| `Notification.Url`                                              | String  | 200     | Yes         | Notification URL for KYC process status change                                                                                                                                                                                                                                                              |
| `Notification.Headers[].Key`                                    | String  | 100     | Yes         | Notification request header key for KYC process status change                                                                                                                                                                                                                                               |
| `Notification.Headers[].Value`                                  | String  | 100     | Yes         | Notification request header value for KYC process status change                                                                                                                                                                                                                                             |
| `Attachments[].AttachmentType`                                  | String  | -       | Yes         | Type of Subordinate's document to be attached. Accepted values are: `ProofOfBankDomicile` (Evidence of bank domiciliation), `ModelOfAdhesionTerm` (Acceptance terms template)                                                                                                                               |
| `Attachments[].File.Name`                                       | String  | 50      | Yes         | Name of Subordinate's document to be attached                                                                                                                                                                                                                                                               |
| `Attachments[].File.FileType`                                   | String  | -       | Yes         | Format of Subordinate's document to be attached. Accepted values are: `pdf`, `png`, `jpg`, `jpeg`                                                                                                                                                                                                           |
| `Attachments[].File.Data`                                       | String  | -       | Yes         | Document in **Base64** format                                                                                                                                                                                                                                                                               |

**Response**

```json
--header "Authorization: Bearer {access_token}"
{
    "MasterMerchantId": "665a33c5-0022-4a40-a0bd-daad04eb3236",
    "MerchantId": "b8ccc729-a874-4b51-a5a9-ffeb5bd98878",
    "CorporateName":"Subordinate Corp.",
    "FancyName":"Subordinate Fancy Name",
    "DocumentNumber":"96462142000140",
    "DocumentType":"CNPJ",
    "MerchantCategoryCode":"5719",
    "ContactName":"George Silva",
    "ContactPhone":"11987654321",
    "MailAddress":"address@email.mail.com",
    "Website":"https://www.website.com.br",
    "Blocked": true,
    "Analysis": {
        "Status": "UnderAnalysis"
    },
    "BankAccount": {
        "Bank":"001",
        "BankAccountType":"CheckingAccount",
        "Number":"0002",
        "Operation":"2",
        "VerifierDigit":"2",
        "AgencyNumber":"0002",
        "AgencyDigit":"2",
        "DocumentNumber":"96462142000140",
        "DocumentType":"CNPJ"
    },
    "Address":{  
        "Street":"Jhon st",
        "Number":"55",
        "Complement":"Rm 701",
        "Neighborhood":"Manhattan",
        "City":"New York",
        "State" : "NY",
        "ZipCode": "10038"
    },
    "Agreement":{
        "Fee" : 10,
        "MerchantDiscountRates": [{
            "MerchantDiscountRateId": "662e340f-07f2-4827-816d-b1878eb03eae",
            "PaymentArrangement": {
                "Product": "DebitCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 4
        },
        {
            "MerchantDiscountRateId": "eb9d6357-7ad1-4fe0-90fe-364cff7ff0fd",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 4
        },
        {
            "MerchantDiscountRateId": "d09fe9d3-98c7-4c37-9bd3-7c1c91ee15de",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 2,
            "FinalInstallmentNumber" : 6,
            "Percent" : 4
        },
        {
            "MerchantDiscountRateId": "e2515c24-fd73-4b8e-92ad-cfe2b95239de",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 7,
            "FinalInstallmentNumber" : 12,
            "Percent" : 4
        }]
    },
    "Notification": {
        "Url": "https://endpoint.com.br/api/subordinates",
        "Headers": [{
            "Key": "key1",
            "Value": "value1"
        },
        {
            "Key": "key2",
            "Value": "value2"
        }]
    },
    "Attachments": [{
        "AttachmentType": "ProofOfBankDomicile",
        "File": {
            "Name": "evidence",
            "FileType": "png"
        }
    }]
}
```

| Property                                                        | Type    | Size    | Required    | Description                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------|---------|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MasterMerchantId`                                              | Guid    | 36      | Yes         | ID of Subordinate's master                                                                                                                                                                                                                                                                                  |
| `MerchantId`                                                    | Guid    | 36      | Yes         | Subordinate ID                                                                                                                                                                                                                                                                                              |
| `CorporateName`                                                 | Guid    | 36      | Yes         | Corporate Name                                                                                                                                                                                                                                                                                              |
| `FancyName`                                                     | String  | 50      | Yes         | Fancy Name                                                                                                                                                                                                                                                                                                  |
| `DocumentNumber`                                                | String  | 14      | Yes         | Document number                                                                                                                                                                                                                                                                                             |
| `DocumentType`                                                  | String  | -       | Yes         | Document Type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                                  |
| `MerchantCategoryCode`                                          | String  | 4       | Yes         | A Merchant Category Code (MCC) is a four-digit number listed in ISO 18245 for retail financial services. MCC is used to classify the business by the type of goods or services it provides. [List of MCC codes](https://www.web-payment-software.com/online-merchant-accounts/mcc-codes/){:target="_blank"} |
| `ContactName`                                                   | String  | 100     | Yes         | Name of the Merchant representative                                                                                                                                                                                                                                                                         |
| `ContactPhone`                                                  | String  | 11      | Yes         | Merchant Representative's phone number (digits only)                                                                                                                                                                                                                                                        |
| `MailAddress`                                                   | String  | 50      | Yes         | e-mail address                                                                                                                                                                                                                                                                                              |
| `Website`                                                       | String  | 200     | No          | Website address                                                                                                                                                                                                                                                                                             |
| `Blocked`                                                       | Boolean | -       | Yes         | A flag to indicate if the Subordinate is blocked to participate in the transaction                                                                                                                                                                                                                          |
| `Analysis.Status`                                               | String  | -       | Yes         | KYC process status. Values may be: `Approved`, `ApprovedWithRestriction`, `Rejected`                                                                                                                                                                                                                        |
| `BankAccount.Bank`                                              | String  | 3       | Yes         | Bank code. [Bank codes in Brazil](https://www.bcb.gov.br/Fis/CODCOMPE/Tabela.pdf){:target="_blank"}                                                                                                                                                                                                         |
| `BankAccount.BankAccountType`                                   | String  | -       | Yes         | Account type. Accepted values: `CheckingAccount`, `SavingsAccount`                                                                                                                                                                                                                                          |
| `BankAccount.Number`                                            | String  | 20      | Yes         | Account Number                                                                                                                                                                                                                                                                                              |
| `BankAccount.Operation`                                         | String  | 10      | No          | Operation code. Some bank institutions have a special code to identify the profile of its client                                                                                                                                                                                                            |
| `BankAccount.VerifierDigit`                                     | Char    | 1       | Yes         | Check digit of the account number                                                                                                                                                                                                                                                                           |
| `BankAccount.AgencyNumber`                                      | String  | 15      | Yes         | Agency number                                                                                                                                                                                                                                                                                               |
| `BankAccount.AgencyDigit`                                       | Char    | 1       | Yes         | Check digit of agency number. Set `0` when n/a                                                                                                                                                                                                                                                              |
| `BankAccount.DocumentNumber`                                    | String  | 14      | Yes         | Account holder document number (digits only)                                                                                                                                                                                                                                                                |
| `BankAccount.DocumentType`                                      | String  | -       | Yes         | Account holder document type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                   | 
| `Address.Street`                                                | String  | 100     | Yes         | Street name                                                                                                                                                                                                                                                                                                 |
| `Address.Number`                                                | String  | 15      | Yes         | The number from street address                                                                                                                                                                                                                                                                              |
| `Address.Complement`                                            | String  | 80      | No          | Additional information of the address                                                                                                                                                                                                                                                                       |
| `Address.Neighborhood`                                          | String  | 50      | Yes         | Neighborhood                                                                                                                                                                                                                                                                                                |
| `Address.City`                                                  | String  | 50      | Yes         | City                                                                                                                                                                                                                                                                                                        |
| `Address.State`                                                 | String  | 2       | Yes         | State postal abbreviation                                                                                                                                                                                                                                                                                   |
| `Address.ZipCode`                                               | String  | 9       | Yes         | Zip code                                                                                                                                                                                                                                                                                                    |
| `Agreement.Fee`                                                 | Int     | -       | Yes         | Fixed fee for each transaction. Value in cents. Ex: BRL 1.00 = `"Fee" : 100`                                                                                                                                                                                                                                 |
| `Agreement.MerchantDiscountRates[].MerchantDiscountRateId`      | Guid    | 36      | Yes         | MDR ID                                                                                                                                                                                                                                                                                                      |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Product`  | String  | -       | Yes         | Payment arrangement product of subordinate MDR. Accepted values: `CreditCard`, `DebitCard`                                                                                                                                                                                                                  |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Brand`    | String  | -       | Yes         | Payment arrangement brand of subordinate MDR. Accepted values: `Visa`, `Master`, `Amex`, `Elo`, `Diners`, `Discover`, `Hipercard`                                                                                                                                                                           |
| `Agreement.MerchantDiscountRates[].InitialInstallmentNumber`    | Int     | -       | Yes         | The start number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                       |
| `Agreement.MerchantDiscountRates[].FinalInstallmentNumber`      | Int     | -       | Yes         | The end number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                         |
| `Agreement.MerchantDiscountRates[].Percent`                     | Decimal | -       | Yes         | Subordinate discount rate. Value with up to two decimal places.                                                                                                                                                                                                                                             |
| `Notification.Url`                                              | String  | 200     | Yes         | Notification URL for KYC process status change                                                                                                                                                                                                                                                              |
| `Notification.Headers[].Key`                                    | String  | 100     | Yes         | Notification request header key for KYC process status change                                                                                                                                                                                                                                               |
| `Notification.Headers[].Value`                                  | String  | 100     | Yes         | Notification request header value for KYC process status change                                                                                                                                                                                                                                             |
| `Attachments[].AttachmentType`                                  | String  | -       | Yes         | Type of Subordinate's document to be attached. Accepted values are: `ProofOfBankDomicile` (Evidence of bank domiciliation), `ModelOfAdhesionTerm` (Acceptance terms template)                                                                                                                               |
| `Attachments[].File.Name`                                       | String  | 50      | Yes         | Name of Subordinate's document to be attached                                                                                                                                                                                                                                                               |
| `Attachments[].File.FileType`                                   | String  | -       | Yes         | Format of Subordinate's document to be attached. Accepted values are: `pdf`, `png`, `jpg`, `jpeg`                                                                                                                                                                                                           |

## Fetching Subordinates

Split Payments Onboarding API provides an endpoint to get a Subordinate by its ID.

<aside class="request"><span class="method post">GET</span> <span class="endpoint">{split-onboarding-api}/api/subordinates/{subordinate-merchant-id}</span></aside>

**Response**

```json
--header "Authorization: Bearer {access_token}"
{
    "MasterMerchantId": "665a33c5-0022-4a40-a0bd-daad04eb3236",
    "MerchantId": "b8ccc729-a874-4b51-a5a9-ffeb5bd98878",
    "CorporateName":"Subordinate Corp.",
    "FancyName":"Subordinate Fancy Name",
    "DocumentNumber":"96462142000140",
    "DocumentType":"CNPJ",
    "MerchantCategoryCode":"5719",
    "ContactName":"George Silva",
    "ContactPhone":"11987654321",
    "MailAddress":"address@email.mail.com",
    "Website":"https://www.website.com.br",
    "Blocked": false,
    "Analysis": {
        "Status": "Approved",
        "Score": 89,
        "DenialReason": null
    },
    "BankAccount": {
        "Bank":"001",
        "BankAccountType":"CheckingAccount",
        "Number":"0002",
        "Operation":"2",
        "VerifierDigit":"2",
        "AgencyNumber":"0002",
        "AgencyDigit":"2",
        "DocumentNumber":"96462142000140",
        "DocumentType":"CNPJ"
    },
    "Address":{  
        "Street":"Jhon st",
        "Number":"55",
        "Complement":"Rm 701",
        "Neighborhood":"Manhattan",
        "City":"New York",
        "State" : "NY",
        "ZipCode": "10038"
    },
    "Agreement":{
        "Fee" : 10,
        "MerchantDiscountRates": [{
            "MerchantDiscountRateId": "662e340f-07f2-4827-816d-b1878eb03eae",
            "PaymentArrangement": {
                "Product": "DebitCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 1.5
        },
        {
            "MerchantDiscountRateId": "eb9d6357-7ad1-4fe0-90fe-364cff7ff0fd",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 1,
            "FinalInstallmentNumber" : 1,
            "Percent" : 2.0
        },
        {
            "MerchantDiscountRateId": "d09fe9d3-98c7-4c37-9bd3-7c1c91ee15de",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 2,
            "FinalInstallmentNumber" : 6,
            "Percent" : 3.0
        },
        {
            "MerchantDiscountRateId": "e2515c24-fd73-4b8e-92ad-cfe2b95239de",
            "PaymentArrangement": {
                "Product": "CreditCard",
                "Brand": "Master"
            },
            "InitialInstallmentNumber" : 7,
            "FinalInstallmentNumber" : 12,
            "Percent" : 4.0
        }]
    },
    "Notification": {
        "Url": "https://endpoint.com.br/api/subordinates",
        "Headers": [{
            "Key": "key1",
            "Value": "value1"
        },
        {
            "Key": "key2",
            "Value": "value2"
        }]
    },
    "Attachments": [{
        "AttachmentType": "ProofOfBankDomicile",
        "File": {
            "Name": "evidence",
            "FileType": "png"
        }
    }]
}
```

| Property                                                        | Type    | Size    | Required    | Description                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------|---------|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MasterMerchantId`                                              | Guid    | 36      | Yes         | ID of Subordinate's master                                                                                                                                                                                                                                                                                  |
| `MerchantId`                                                    | Guid    | 36      | Yes         | Subordinate ID                                                                                                                                                                                                                                                                                              |
| `CorporateName`                                                 | Guid    | 36      | Yes         | Corporate Name                                                                                                                                                                                                                                                                                              |
| `FancyName`                                                     | String  | 50      | Yes         | Fancy Name                                                                                                                                                                                                                                                                                                  |
| `DocumentNumber`                                                | String  | 14      | Yes         | Document number                                                                                                                                                                                                                                                                                             |
| `DocumentType`                                                  | String  | -       | Yes         | Document Type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                                  |
| `MerchantCategoryCode`                                          | String  | 4       | Yes         | A Merchant Category Code (MCC) is a four-digit number listed in ISO 18245 for retail financial services. MCC is used to classify the business by the type of goods or services it provides. [List of MCC codes](https://www.web-payment-software.com/online-merchant-accounts/mcc-codes/){:target="_blank"} |
| `ContactName`                                                   | String  | 100     | Yes         | Name of the Merchant representative                                                                                                                                                                                                                                                                         |
| `ContactPhone`                                                  | String  | 11      | Yes         | Merchant Representative's phone number (digits only)                                                                                                                                                                                                                                                        |
| `MailAddress`                                                   | String  | 50      | Yes         | e-mail address                                                                                                                                                                                                                                                                                              |
| `Website`                                                       | String  | 200     | No          | Website address                                                                                                                                                                                                                                                                                             |
| `Blocked`                                                       | Boolean | -       | Yes         | A flag to indicate if the Subordinate is blocked to participate in the transaction                                                                                                                                                                                                                          |
| `Analysis.Status`                                               | String  | -       | Yes         | KYC process status. Values may be: `Approved`, `ApprovedWithRestriction`, `Rejected`                                                                                                                                                                                                                        |
| `Analysis.Score`                                                | Int     | -       | No          | KYC process analysis score. Range from 1 to 100                                                                                                                                                                                                                                                             |
| `Analysis.DenialReason`                                         | String  | -       | No          | Reason why Subordinate has failed in the KYC process, when applicable                                                                                                                                                                                                                                       |
| `BankAccount.Bank`                                              | String  | 3       | Yes         | Bank code. [Bank codes in Brazil](https://www.bcb.gov.br/Fis/CODCOMPE/Tabela.pdf){:target="_blank"}                                                                                                                                                                                                         |
| `BankAccount.BankAccountType`                                   | String  | -       | Yes         | Account type. Accepted values: `CheckingAccount`, `SavingsAccount`                                                                                                                                                                                                                                          |
| `BankAccount.Number`                                            | String  | 20      | Yes         | Account Number                                                                                                                                                                                                                                                                                              |
| `BankAccount.Operation`                                         | String  | 10      | No          | Operation code. Some bank institutions have a special code to identify the profile of its client                                                                                                                                                                                                            |
| `BankAccount.VerifierDigit`                                     | Char    | 1       | Yes         | Check digit of the account number                                                                                                                                                                                                                                                                           |
| `BankAccount.AgencyNumber`                                      | String  | 15      | Yes         | Agency number                                                                                                                                                                                                                                                                                               |
| `BankAccount.AgencyDigit`                                       | Char    | 1       | Yes         | Check digit of agency number. Set `0` when n/a                                                                                                                                                                                                                                                              |
| `BankAccount.DocumentNumber`                                    | String  | 14      | Yes         | Account holder document number (digits only)                                                                                                                                                                                                                                                                |
| `BankAccount.DocumentType`                                      | String  | -       | Yes         | Account holder document type. Valid values: `Cpf`, `Cnpj`                                                                                                                                                                                                                                                   | 
| `Address.Street`                                                | String  | 100     | Yes         | Street name                                                                                                                                                                                                                                                                                                 |
| `Address.Number`                                                | String  | 15      | Yes         | The number from street address                                                                                                                                                                                                                                                                              |
| `Address.Complement`                                            | String  | 80      | No          | Additional information of the address                                                                                                                                                                                                                                                                       |
| `Address.Neighborhood`                                          | String  | 50      | Yes         | Neighborhood                                                                                                                                                                                                                                                                                                |
| `Address.City`                                                  | String  | 50      | Yes         | City                                                                                                                                                                                                                                                                                                        |
| `Address.State`                                                 | String  | 2       | Yes         | State postal abbreviation                                                                                                                                                                                                                                                                                   |
| `Address.ZipCode`                                               | String  | 9       | Yes         | Zip code                                                                                                                                                                                                                                                                                                    |
| `Agreement.Fee`                                                 | Int     | -       | Yes         | Fixed fee for each transaction. Value in cents. Ex: BRL 1.00 = `"Fee" : 100`                                                                                                                                                                                                                                 |
| `Agreement.MerchantDiscountRates[].MerchantDiscountRateId`      | Guid    | 36      | Yes         | MDR ID                                                                                                                                                                                                                                                                                                      |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Product`  | String  | -       | Yes         | Payment arrangement product of subordinate MDR. Accepted values: `CreditCard`, `DebitCard`                                                                                                                                                                                                                  |
| `Agreement.MerchantDiscountRates[].PaymentArrangement.Brand`    | String  | -       | Yes         | Payment arrangement brand of subordinate MDR. Accepted values: `Visa`, `Master`, `Amex`, `Elo`, `Diners`, `Discover`, `Hipercard`                                                                                                                                                                           |
| `Agreement.MerchantDiscountRates[].InitialInstallmentNumber`    | Int     | -       | Yes         | The start number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                       |
| `Agreement.MerchantDiscountRates[].FinalInstallmentNumber`      | Int     | -       | Yes         | The end number of the installments range of subordinate MDR. This number must be **between 1 and 12 (>0 and <=12)**                                                                                                                                                                                         |
| `Agreement.MerchantDiscountRates[].Percent`                     | Decimal | -       | Yes         | Subordinate discount rate. Value with up to two decimal places.                                                                                                                                                                                                                                             |
| `Notification.Url`                                              | String  | 200     | Yes         | Notification URL for KYC process status change                                                                                                                                                                                                                                                              |
| `Notification.Headers[].Key`                                    | String  | 100     | Yes         | Notification request header key for KYC process status change                                                                                                                                                                                                                                               |
| `Notification.Headers[].Value`                                  | String  | 100     | Yes         | Notification request header value for KYC process status change                                                                                                                                                                                                                                             |
| `Attachments[].AttachmentType`                                  | String  | -       | Yes         | Type of Subordinate's document to be attached. Accepted values are: `ProofOfBankDomicile` (Evidence of bank domiciliation), `ModelOfAdhesionTerm` (Acceptance terms template)                                                                                                                               |
| `Attachments[].File.Name`                                       | String  | 50      | Yes         | Name of Subordinate's document to be attached                                                                                                                                                                                                                                                               |
| `Attachments[].File.FileType`                                   | String  | -       | Yes         | Format of Subordinate's document to be attached. Accepted values are: `pdf`, `png`, `jpg`, `jpeg`                                                                                                                                                                                                           |

## Notification

Once the KYC process has finished, Master will receive a notification with the process result. A request will be sent using the URL and headers provided at the creation of the Subordinate

<aside class="request"><span class="method post">POST</span> <span class="endpoint">{notification-url}</span></aside>

```json
{
    "MerchantId": "b8ccc729-a874-4b51-a5a9-ffeb5bd98878",
    "Status": "Approved",
    "Score": 89,
    "DenialReason": null
}
```

| Property                    | Type    | Size    | Required    | Description                                                                                                                                                                                                                          |
|-----------------------------|---------|---------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MerchantId`                | Guid    | 36      | Yes         | Subordinate ID                                                                                                                                                                                                                       |
| `Analysis.Status`           | String  | -       | Yes         | KYC process status. Values may be: `Approved`, `ApprovedWithRestriction`, `Rejected`                                                                                                                                                 |
| `Analysis.Score`            | Int     | -       | No          | KYC process analysis score. Range from 1 to 100                                                                                                                                                                                      |
| `Analysis.DenialReason`     | String  | -       | No          | Reason why Subordinate has failed in the KYC process, when applicable                                                                                                                                                                |