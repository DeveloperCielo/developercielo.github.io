---
layout: tutorial
title: Card Brands Retry Program
search: true
toc_footers: true
categories: tutorial
sort_order: 2
tags:
  - Additional Documents
---

# Card Brands Retry Program

**What are transaction retries?**

When a shopper tries to make a card purchase at your business, a transaction can be declined due to a number of factors. The next attempts to complete the transaction using the same card is retrying.

**What has changed?**

Each card brand defines the amount that will be charged for retrying. The number of times a transaction will be retried also varies by brand.

**Are transaction retries allowed in e-commerce?**

Card brands define different rules for present and non-present card transactions, like in online sales.

**What is the impact for the merchant?**

Merchants who do not follow the rules will be penalized by charging fees for exceeded transactions, in accordance with each brand program.

Aiming to improve the shopping experience, the payment methods industry, together with ABECS, promoted the standardization of the response codes for rejected transactions made by card. Attempts are classified as:

* **Irreversible: Never retry.**

It means, for example, that the card was canceled for use, has been lost or stolen, there is confirmed fraud, the transaction is not allowed for that product, indicating that there are no circumstances in which the issuer would grant an approval. Any authorization attempt that has previously received an irreversible refusal without any changes in the message will not be successful.

* **Reversible: Retry allowed.**

It means that the issuer can approve, but cannot do so now, possibly due to a system issue (down) or lack of limit, suspected fraud or exceeded number of password attempts. These are temporary opt-out decisions made by the issuer that may change over time.

The Visa, Mastercard and Elo brands adjusted their rules to limit the number of authorization attempts for a denied transaction. These changes provide for the charging of fees for excessive attempts. Below are the rules for each brand.

* [Mastercard](https://developercielo.github.io/en/tutorial/programa-retentativa-bandeiras#mastercard){:target="_blank"};
* [Visa](https://developercielo.github.io/en/tutorial/programa-retentativa-bandeiras#visa){:target="_blank"};
* [Elo](https://developercielo.github.io/en/tutorial/programa-retentativa-bandeiras#elo){:target="_blank"};
* [Demais bandeiras](https://developercielo.github.io/en/tutorial/programa-retentativa-bandeiras#other-brands){:target="_blank"}.

## Mastercard

The Mastercard brand has the Transaction Processing Excellence (TPE) program, which includes two categories:

* **Excessive Attempts** – monitors the attempts of denied transactions, in card present and not present environments. Valid for both reversible and irreversible denial codes.

* **Merchant Advice Code Transaction Excellence (MAC)**– monitors transaction retries that are denied, in card-not-present environments that are irreversible. Billing only on (MAC) 03 and 21.

### **1. Excessive Attempts**

These are charges made when the merchant exceeds the rules for retrying transactions.

The brand also performs monitoring for any approved nominal value authorization, with subsequent reversal for transactions below 1 unit of whole currency or the equivalent of US$ 1.

Monitoring is applied to retry transactions for denied and approved purchases, carried out in a present and non-present card environment.

**Excessive Attempts Table** 

|Categories|Codes|Validity|Domestic Rate|International Rate|When Occurs|Retry Allowed|
|---|---|---|---|---|---|---|
|Card present and Card not present|Any denial code that is not assigned to MAC 03 and 21. And also MAC codes if you do not respect the "Excessive Attempts" limits|Until 01/31/2023|BRL 2.00 |-|From the 11th retry onwards|Retry allowed within 24 hours.|
|Card present and Card not present|Any denial code that is not assigned to MAC 03 and 21. And also the MAC codes if you do not respect the limits of "Excessive Attempts"|New rule from 02/01/2023|R $2.00 |-|From the 8th retry onwards|Retry allowed within 24 hours.|

* All payment transactions using the same card and the same merchant number will be considered as retries;
* Mastercard has extended the effective date to **01/02/2023** regarding the new program rules **(Excessive Attempts)** previously scheduled for the beginning of 01/11/2022. These are the changes:

* 1. The excess considered in the program will occur from the eighth attempt within the calculation month. The amount charged has changed.
* 2. Mastercard is also introducing a limit of 35 failed attempts on the same card and merchant number per continuous 30-day period. Even if the shopper does not exceed the limit of 7 retries in a 24-hour period, but exceeds the monthly limit, the charge will be applied

> Note: The current rule of the Excessive Attempts program is valid until 01/31/2023, where only 10 attempts to approve the same transaction are allowed (on the same card, and same merchant number), with retry allowed after 24 hours.

### 2. Merchant Advice Code Transaction Excellence (MAC)

These are charges made when the establishment re-attempts to send authorization for irreversible response codes with the same valid card for a card not present.

Within this retry program, there are programs that are specifically designed for the **“Do not try this transaction again”** scenario. For these cases, Mastercard identifies transactions with the following values: MAC 03 and MAC 21, for example.

The MAC program accepts a few values, however **only MACs 03 and 21 have a specific charge**. The other MACs do not fall under this MAC 03/21 charge.

The other MAC codes: 01, 02, 04, 24, 25, 26, 27, 28, 29 and 30 aren't included the MAC billing program but are included in the Excessive Attempts program billing if you exceed the limits.

Since **10/14/2022** Mastercard has introduced new MAC codes 24, 25, 26, 27, 28, 29 and 30, when an issuer declines a transaction with the response code 51 (Insufficient Funds) followed by one of the MACs below, for the merchant to take the best action.

**MACs codes table**

|MAC|Description|Note|
|---|---|---|
|01|New account information available (ABU)|Need to update the data of the account being used in the transaction, using the ABU, for example.|
|02|Cannot be approved at this time, try again later|Must retry the transaction after 72 hours or try the transaction with a different payment method.|
|03|Retry is not allowed|Must seek another method of guaranteeing payment, avoiding unnecessary costs of multiple authorization requests that will continue to result in declines|
|04|Token requirements not met for this model token|Need to review the token requirements, as they were not met for the model token sent in the transaction|
|21|Plan cancelled|Customer cancels plan and even after cancellation, the establishment continues to send purchase authorization request.|
|24|Try again after 1 hour|Only valid for response code 51 (Insufficient Funds)|
|25|Try again after 24 hours|Only valid for response code 51 (Insufficient Funds)|
|26|Try again after 2 days|Only valid for response code 51 (Insufficient Funds)|
|27|Try again after 4 days|Only valid for response code 51 (Insufficient Funds)|
|28|Try again after 6 days|Only valid for response code 51 (Insufficient Funds)|
|29|Try again after 8 days|Only valid for response code 51 (Insufficient Funds)|
|30|Try again after 10 days|Only valid for response code 51 (Insufficient Funds)|

Some return codes will no longer be sent:

* 04 (Capture Card)
* 14 (Invalid card number)
* 41 (Lost Card)
* 43 (Stolen Card)
* 54 (Expired Card)
* 57 (Transaction Not Allowed)
* 62 (Card Restricted)
* 63 (Security Breach)
<br>
<br>

**Categorization of Mastercard returns**

Mastercard may consolidate some issuer response codes, which often may not indicate to the merchant whether or not to retry, into 3 codes for Mastercard exclusive use:

* **79** (Life cycle)
* **82** (Policy)
* **83** (Fraud/Security)
<br>
<br>

The original codes will be replaced by the Merchant Advice Code (MAC), which will accompany codes 79, 82 and 83 to determine whether or not the transaction can be re-attempted.

**For example:**

|When|Then|And the response code|
|---|---|---|---|
|The issuer declines the transaction using response code 54 (Expired Card)|Mastercard will replace code 54 with code 79 (Lifecycle Decline)|Accompany appropriate Merchant Advice Code (MAC)|

**MAC 03 and MAC 21 retry program**

**Method of calculation:**

* Card not present transactions will be considered;
* All payment transactions using the same card and merchant number are considered retries;
* Retries in the MAC program with values ​​MAC 03 and MAC 21 count;
* Valid for any response code,
* The excess accounted for in the program will occur from the 1st attempt within the calculation month;
* The counter is reset after a period of 30 days;
* Retries may be charged for MACs 03/21 and Excessive Attempts if you exceed the limit for each program;
* Currently, the tariff value of BRL 1.25 is applied and this value will change from January 1, 2023, as shown on the table;
<br>
<br>

**Table of values:**

| Number of retries | Rule |
|--|--|
| As of the 1st attempt | BRL 2.50 (two reais and fifty cents) per attempt, as of the 1st |

## Visa

**What is it?**

A program instituted by the Visa Brand that generates charges when the merchant exceeds the retry rules.

* Valid for transactions with a present card and a non-present card;
* **Reversible codes:** Allows up to 15 attempts to approve the same transaction (same card, same establishment and amount) within 30 days. After the initial 30 days (from the 1st attempt), any retry will be charged.
* **Irreversible codes:** Only 01 attempt to approve the same transaction is allowed (same card, same establishment), the 2nd attempt will be charged.
* After an approved transaction, the counter is reset.
<br>

> **Fees**: When you exceed the attempt limits established by the brand, a fee will be charged for each transaction that exceeds it.<br>
> <br>
> * **Domestic**: USD 0.10 + 13.83% Tax
> * **Foreign**: USD 0.25 + 13.83% Tax
<br>
<br>

Authorization rules already in force. Fee charges apply from April 2021.

**Visa has grouped return codes into 4 Categories.**

* **Category 1 - Issuer will never approve.**

For this category, it indicates that the card was canceled or never existed or that the non-approval is the result of a permanent restriction or error condition that will prevent future approval.

* **Category 2 - Issuer cannot approve at this time.**

Indicates that the denial is the result of a temporary condition such as credit risk, issuer speed controls, or other card restrictions that may allow a retry transaction to be approved. In some cases, denial requires action by the shopper or issuer to remove the restriction before an approval can be obtained.

* **Category 3 - Data Quality/Review Data.**

When a data error is identified by the issuer, this transaction is declined accordingly. Merchants must revalidate payment data before retrying. Merchants and Acquirers should monitor these negative codes due to potential exposure to fraud.

> **Attention**: Category 3 has, in addition to the limits considered in category 2, a different limit, where it is cumulative. An establishment can carry out up to 10,000 transactions in a period of 30 days (in this case, considering only the establishment number and denial codes). If you exceed the limit, all category 3 declined transactions will be charged.

* **Category 4 - Generic Response Codes.**

Category 4 includes all other decline response codes, many of which provide little or no value to Acquirers/Merchants as part of their retry strategy. Issuer usage should remain minimal.

Most non-approval conditions have descriptive response codes in Categories 1, 2, and 3 to indicate the reason for denying. However, there may be circumstances where there is no response code value for a specific denial condition. Issuers may use other response code values ​​defined in the VisaNet Technical Specifications; however, usage should remain minimal.

Issuers should use response codes that more accurately reflect the reason for denials. Categories 1 (issuer never approves), 2 (issuer cannot approve at this time), and 3 (Data Quality) should be used, and issuers should limit the use of Category 4 (Generic Response Code) to transactions where none another value applies. The Generic Response Code Fee is charged to ensure that no more than the regionally approved percentage of the issuer's total denials are categorized as Category 4. Issuers exceeding the regionally defined threshold will receive the Generic Response Code Fee per base of transaction for each decline in excess of the defined limit.

**Table with rules and refusal codes.**

![Tabela Retentativa Visa]({{ site.baseurl }}/images/apicieloecommerce/retentativa-visa-en.png)

**Note:** Response code 14 appears in categories 1 and 3, but the accounting is as follows:

In category 1, EC is charged from the 2nd attempt to (same establishment and same card) **retry not allowed.**

Category 3 comprises the group of codes for accounting for 10,001 transactions, after the EC reaches 10,000 retries with this group of codes, any transaction will be accounted for independently of the card.

**Example:** We had 10,000 transactions denied in a CE with category 3 codes, if transaction 10,001 is in code 14 or in any category 3 group code, it will be charged regardless of the card.

## Elo

**What is it?**

This is a program instituted by ELO that generates charges when the merchant exceeds the rules for retrying transactions with the same card.

**Forms of Calculation**

* **Retries**: all payment transactions on the same card, validity, value, Merchant ID (MID) - within 30 days
* **Accounted codes**: all negatives​
* **Excess**: from the 16th retry in the month​*
* **Fee**: BRL 0.80 (eighty cents) per retry, starting from the 16th
* **Billing**: The billing will only be done in cases of recurrence, therefore, the establishment must be at least 2 consecutive months in the program.
* **Excess accounting**: It is based on Elo's internal controls. 1st to last calendar day of the month.
<br>
<br>

**Table of retries for the Elo brand**

The following table exemplifies how the brand will be charged:

|Month|Scenario|Billing|
|---|---|---|---|
|1st (August)|EC exceeds limits|Warning|
| 2nd (September) | EC does not exceed limits | Does not generate charges |
|3rd (October)|EC exceeds limits|In this case you will be warned again. The charge will only be made in case of recurrence.|
| 4th (November) | EC exceeds limits | Application of the fine |
| 5th (December) | EC exceeds limits | Application of the fine |
| 6th (January) | EC does not exceed limits | Does not generate charges |
|7th (February)|EC exceeds limits|You will be warned again.|

<aside class="notice">Effective date: August 1st 2022.</aside>

**List of refusal codes:**

The response codes below are listed according to the brand's authorization manual.

|CODES|DESCRIPTION|WHEN THE ISSUER SHOULD USE THE RESPONSE CODE|RETRY|
|----|----|----|----|
|4|REDO THE TRANSACTION|This code must be used by the Issuer to request that the owner of the card/EC perform the transaction again if the issuer detects failure in capturing the transaction information or if it is necessary to update the password, denying the 1st transaction| Reversible|
|5|GENERICAL|The brand may use this code for other dealings (generic).|Reversible|
|6|CONSULT ACQUIRER|This reason must be used by the Acquirer when it identifies internal problems that do not require changes in the message for the transaction to follow the correct flow.|Reversible|
|12|CARD ERROR|- This code must be used by the Issuer when it identifies a failure in the CAVV validation of 3DS or tokenized transactions.<br>- This code must be used by the issuer when it identifies an incorrect/invalid service code for cards <br>- This code must be used by the issuer for problems identified in the token<br>- This code must be used to deny reversals and reversal notices where the original transaction is not located by the issuer.|Irreversible|
|13|INVALID TRANSACTION AMOUNT|- This code must be used by the issuer when it identifies that the transaction amount is invalid according to the issuer's parameters.|Irreversible|
|14|INVALID CARD NUMBER|- This code must be used by the issuer for invalid/incorrect card number.<br>- The brand may use this code for other dealings.|Irreversible|
|19|ACQUIRER PROBLEMS|- This code must be used by the acquirer when it identifies internal problems that require changes in the message so that the transaction follows the correct flow.|Irreversible|
|23|INVALID INSTALLMENT AMOUNT|- This code must be used by the issuer when the installment amount is outside the limit established. This code must be used when the issuer does not accept the Elo Parcelado Loja product (product 072) with the number of installments less than 12.|Irreversible|
|30|MESSAGE FORMAT ERROR|- This code must be used by the issuer when it identifies a format error in the message (mandatory field, domains, formats, size not present or different from the specification).|Irreversible|
|38|PURCHASE/EXCEEDED PASSWORD ATTEMPTS|- This code must be used by the issuer when the number of permitted password attempts is exceeded (used only for purchases).|Reversible|
|41|LOST CARD|- This code must be used by the issuer for a card with definitive blocking for the reason "LOST".|Irreversible|
|43|STOLEN CARD|- This code must be used by the issuer for a card with definitive blocking for the reason "STOLEN".|Irreversible|
|51|INSUFFICIENT BALANCE/LIMIT|- This code must be used by the issuer for a card that is temporarily without enough balance or limit to carry out the transaction.<br>- Withdrawal/advance 2 without track 2<br>- Purchase with change not supported.<br>- Address verification not supported (only when process code is "13" with no purchase value). * Card account verification not supported (only when process code is "18" with no purchase amount).|Reversible|
|54|CARD EXPIRATION DATE|- This code must be used by the issuer for a physical card or token with validity/expired or invalid.|Irreversible|
|55|INVALID PASSWORD / NOT SENT|- This code must be used by the Issuer when the password typed by the customer does not match, it's invalid/incorrect.<br>- This code must be used by the issuer when the password is not sent in the message and is required for transaction approval.|Reversible|
|56|CARD WITHOUT REGISTRATION|<br>1. Card number does not belong to the issuer<br>2. Card number is not valid|Irreversible|
|57|TRANSACTION NOT ALLOWED FOR THIS CARD|- This code must be used by the Issuer when the card is definitively blocked, except for blocking for loss and theft that already have specific codes (eg death, confirmed fraud, definitive cancellation at the customer's request , etc).<br>- This code must be used for products and services not supported by the card issuer.<br>- This code can be used for invalid/suspended/inactive token.<br>- This code must be used to negate the fallback input mode.|Irreversible|
|58|INVALID MERCHANT|- This code must be used by the Issuer when the merchant's MCC is not registered to obtain a token from the Issuer.|Irreversible|
|59|FRAUD SUSPECT|- This code must be used by the issuer when prevention rules suspect fraud, requiring contact between the cardholder and the issuer to release the card and carry out a new transaction.<br>- This code must be entered used by the issuer to deny transactions due to the absence of the travel notice that must be carried out by the cardholder before traveling abroad or in some cases before carrying out transactions on international websites.|Reversible|
|61|MAXIMUM WITHDRAWAL/PURCHASE VALUE EXCEEDED|- This code must be used by the Issuer when the withdrawal/purchase amount exceeds the limit allowed by it.|Reversible|
|62|TEMPORARY BILLING BLOCK|- This code must be used by the issuer for cards with temporary billing block.|Reversible|
|63|SECURITY VIOLATION|- This code must be used by the Issuer when the card security code (CVE2) is incorrect/invalid or invalid MST (token).|Irreversible|
|64|MINIMUM TRANSACTION AMOUNT - INVALID|- This code must be used by the issuer when the transaction amount is below the minimum allowed by the Issuer|Irreversible|
|65|QUALITY OF WITHDRAWALS EXCEEDED|- This code must be used by the issuer when the withdrawal quantity limit is exceeded|Reversible|
| 75 | WITHDRAWAL/ PASSWORD ATTEMPTS EXCEEDED |- This code must be used by the Issuer when the number of password attempts stipulated by the Issuer is exceeded (used only for withdrawls) | Reversible |
|76|INVALID OR NON-EXISTENT DESTINATION ACCOUNT|- This code must be used by the issuer when the account "PARA" (destination) in BIT 3 is invalid or non-existent and exclusively for Funds Transfer transactions|Irreversible|
|77|INVALID OR NON-EXISTENT ORIGINAL ACCOUNT|- This code must be used by the issuer when the "DE" (origin) account in BIT 3 is invalid or non-existent and exclusively for Funds Transfer transactions.|Irreversible|
|78|NEW CARD WITHOUT UNLOCKING / CARD BLOCKED|- This code must be used by the issuer when the new card has not yet been unlocked (activated) by the cardholder with the Issuer or when the cardholder, through autonomy, wishes to temporarily block the card through the issuer application.|Reversible|
|82|INVALID CARD (internal data)|- This code must be used by the issuer when the card's internal data does not match (eg invalid cryptogram, invalid ATC etc.)|Irreversible|
|83|IT IS NOT POSSIBLE TO VALIDATE THE PASSWORD|- This code must be used by the Issuer and will be used by Elo when it is not possible to validate or decrypt the password.|Irreversible|
|91|ISSUER OUT OF AIR|- This code will be used by the brand when the issuer is temporarily unavailable to authorize the transaction or the issuer's response was not received within the established time.|Reversible|
|96|SYSTEM FAILURE|- This code will be used by the brand or the issuer due to problems processing the transaction.|Reversible|
|AB|INCORRECT FUNCTION (DEBIT)|- This code will be used by the issuer to signal the establishment that it requested authorization in the debit function, but the card does not have this function active.|Irreversible|
|AC|INCORRECT FUNCTION (CREDIT)|- This code will be used by the Issuer to signal the establishment that he requested authorization in the credit function, but the card does not have this function active.|Irreversible|
|FM|USE THE CHIP|- This code will be used by the issuer to inform the merchant that the contactless transaction will not be successful and that the cardholder must use the chip (contact).|Irreversible|
|P5|PASSWORD CHANGE / UNLOCKING FAILURE|- This code will be used by the issuer when there is a password change or unlocking failure.|Irreversible|
|P6|NEW PASSWORD NOT ACCEPTED|- This code will be used by the issuer when the new password chosen by the customer does not meet the minimum criteria established by the Issuer.|Reversible|

## Other brands

* **Reversible codes:** New attempts will be allowed for the same customer and card. There is no limit and pre-established period;

> **Important: you should follow the guidance received in the response to the transaction denied, before making a new attempt.**

* **Irreversible Codes:** Authorizations will not be allowed for the same card or establishment, after receiving the 1st refusal response from the issuer.
