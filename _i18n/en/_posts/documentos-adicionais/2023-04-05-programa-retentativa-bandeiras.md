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

When a shopper tries to make a card purchase at your business, a transaction can be declined due to a number of factors. The next attempts to complete the transaction using the same card is called retrying.

> **Important**: Card transactions (both card present or not-present) and [Zero Auth](https://developercielo.github.io/en/manual/cielo-ecommerce#zero-auth){:target="_blank"} (card validation) are also subject to the card brand rules for retrying.

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

# Mastercard

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

## 2. Merchant Advice Code Transaction Excellence (MAC)

These are charges made when the establishment re-attempts to send authorization for irreversible response codes with the same valid card for a card not present.

Within this retry program, there are programs that are specifically designed for the **“Do not try this transaction again”** scenario. For these cases, Mastercard identifies transactions with the following values: MAC 03 and MAC 21, for example.

The MAC program accepts a few values, however **only MACs 03 and 21 have a specific charge**. The other MACs do not fall under this MAC 03/21 charge.

The other MAC codes (01, 02, 04, 24, 25, 26, 27, 28, 29, 30, 40 and 41) are not included the MAC billing program but are included in the Excessive Attempts program billing if you exceed the limits.

Since **10/14/2022** Mastercard has introduced new MAC codes 24, 25, 26, 27, 28, 29 and 30, when an issuer declines a transaction with the response code 51 (Insufficient Funds) followed by one of the MACs below, for the merchant to take the best action.

**MACs codes table**

|MAC|Description|Note|
|---|---|---|
|01|New account information available (ABU)|Need to update the data of the account being used in the transaction, using the ABU, for example.|
|02|Cannot be approved at this time, try again later|Must retry the transaction after 72 hours or try the transaction with a different payment method.|
|03|Retry is not allowed|Must seek another method of guaranteeing payment, avoiding unnecessary costs of multiple authorization requests that will continue to result in declines|
|04|Token requirements not met for this model token|Need to review the token requirements, as they were not met for the model token sent in the transaction|
|21|Plan cancelled|Customer cancels plan and even after cancellation, the establishment continues to send purchase authorization request.|
|24|Try again after 1 hour|Only valid for response code 51 (Insufficient Funds).|
|25|Try again after 24 hours|Only valid for response code 51 (Insufficient Funds).|
|26|Try again after 2 days|Only valid for response code 51 (Insufficient Funds).|
|27|Try again after 4 days|Only valid for response code 51 (Insufficient Funds).|
|28|Try again after 6 days|Only valid for response code 51 (Insufficient Funds).|
|29|Try again after 8 days|Only valid for response code 51 (Insufficient Funds).|
|30|Try again after 10 days|Only valid for response code 51 (Insufficient Funds)|
|40|Retry is not allowed | Consumers non-reloadable prepaid card. |
|41|Retry is not allowed | Consumers single-use virtual card. |

Some return codes will no longer be sent:

* 04 (Capture Card)
* 14 (Invalid card number)
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

# Visa

Visa may allow a certain number of new attempts to approve a transaction depending on the refusal code returned after the first declined attempt.

The goal is to create balance in the transactions ecosystem so to guarantee that both acquirers and merchants provide accurate information about retrying transactions and decrease unnecessary attempts.

Visa demands that issuers present the correct and non-generic codes to make it easier to identify the reason why a transaction was declined.

Visa classifies those codes in reversible and irreversible, both for card present and card not present transactions:

* **Reversible codes**: Visa allows up to 15 attempts to approve the same transaction (with the same card, transaction, expiration date, amount and merchant) within 30 days. After 30 days, from the first attempt, any retry will be charged.

* **Irreversible codes**: Visa allows only the first attempt to approve the transaction (with the same card, transaction, expiry date, amount and merchant). From the second attempt, every retry will be charged, at any period of time.

<br>
<br>

> **Fess**: when the attempts limit for Visa is reached, every excessive attempt will be charged:
>
> - **Brazilian card**: USD 0,10 + 13,83% taxes;
> - **Foreign card**: USD 0,25 + 13,83% taxes.

<br>
\* *Fees have been charged since April, 2021.*
<br>
<br>

Visa grouped the response codes into four categories:

* **Category 1: issuer will never approve**

    The card was cancelled or never existed or the refusal is the result of a permanent restriction or error that prevents an approval in the future.

* **Category 2: the issuer cannot approve at the moment**

    The refusal is the result of a temporary condition such as credit risk, issuers velocity controls or other card restrictions that may allow the transaction authorization when retried. In some cases, the refusal requires an action from the cardholder or the issuer to remove the restriction before authorization is granted.

* **Category 3: data quality**

    When a data error is identified by the issuer, the transaction is declined. The merchant must check the payment data before retrying the transaction. Merchants and acquirers must monitor the refusal codes due to potential exposure to frauds.

        > **Warning**: category 3 has a cumulative limit. A merchant can perform up to 25,000 transactions within 30 days (considering the merchant number and refusal codes). If the limit is surpassed, all declined transactions due to a category 3 response code will be charged.

* **Category 4: generic response codes**

    Category 4 includes all the refusal codes not included in categories 1, 2, or 3, because it is possible that a specific condition does not present a response code. Issuer may use other response codes defined in especifications.


Issuers must use response codes that reflect more precisely the refusal reason.

**Table with rules and refusal codes (action codes) for Visa:**

The rules presented in the table below are valid for both sale and Zero Auth transactions:


| **Category**   | **Type**     | **Codes**    | **Rules**   |
|-----------|--------------|-------------|-------------|
| **Category 1**<br> **Issuer will never approve new attempts**   | **Irreversible** | 04 - Pick up card <br>07 - Pick up card, special condition <br>12 - Invalid transaction  <br>14* - Invalid account number<br>15 - No such issuer<br> 41 - Lost card, pick up <br>  43 - Stolen card, pick up  <br>  46 - Closed account  <br> 57 - Transaction not permitted to cardholder    <br> R0 - Stop Payment Order   <br>  R1 - Revocation of authorization order  <br>  R3 - Revocation of all authorizations order  <br>   | Fees are charged from the second attempt. |
| **Category 2**<br> **Issuer will not approve at the moment; retries allowed** | **Reversible**   | 03 - Invalid merchant <br> 19 - Re-enter transaction   <br>  39** - No credit account  <br>  51 - Not sufficient funds  <br>  52** - No checking account  <br>  53** - No savings account  <br>  59 - Suspected fraud  <br>   61 - Exceeds approval amount limit <br>  62 - Restricted card (card invalid in this region or country)  <br>   65 - Exceeds withdrawal frequency limit  <br>  75 - Allowable number of PIN entry tries exceeded    <br>  78 - “Blocked, first used”—Transaction from new cardholder, and card not properly unblocked  <br>  86 - Cannot verify PIN; for example, no PVV  <br>  91 - Issuer or switch inoperative  <br>  93 - Transaction cannot be completed - violation of law  <br>  96 - System malfunction  <br>   N3 - Cash service not available   <br>  N4 - Cash request exceeds issuer or approved limit   <br>   Z5*** - Valid account, amount not supported  <br> |The merchant can retry the same transaction 15 times.<br> Fees will be charged from the 16th attempt for the same transaction (with the same card, transaction, expiration date, amount and merchant) within a period of 30 consecutive days (from the 1st attempt). After the initial 30 days (from the 1st attempt) any retry of the same transaction will be charged.|
| **Category 3** <br>**Data quality** | **Reversible**   | 54 - Expired card  <br>   55 - Incorrect PIN  <br>    70 - PIN data required (only Europe)    <br>   82 - Negative CAM, dCVV, iCVV, or CVV results  <br>    1A - Additional customer authentication required (only Europe)    <br>  6P - Verification data failed (cardholder identification dos not correspond to issuer records) <br>    N7 - Decline for CVV2 failure (Visa) |The merchant can retry the same transaction 15 times.<br> Fees will be charged from the 16th attempt for the same transaction (with the same card, transaction, expiration date, amount and merchant) within a period of 30 consecutive days (from the 1st attempt). After the initial 30 days (from the 1st attempt) any retry of the same transaction will be charged.|
| **Category 4**<br>**Generic response codes**  | **Reversible**   | Generic response codes not listed in categories 1,2, or 3 |The merchant can retry the same transaction 15 times.<br> Fees will be charged from the 16th attempt for the same transaction (with the same card, transaction, expiration date, amount and merchant) within a period of 30 consecutive days (from the 1st attempt). After the initial 30 days (from the 1st attempt) any retry of the same transaction will be charged.|

\* *Code **14** will be reclassified from 04/24/24, but remains on category 1*.

\** *Codes **39, 52, and 53** will migrate from category 4 to category 2*.

\*** *Code **Z5** is a new code and is in category 2*.

> **Important**:<br>
> Since April, 2023, the limit for the total of declines for category 3 went from 10,000 to 25,000 declines in a 30-day billing cycle.

# Elo

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

# Other brands

* **Reversible codes:** New attempts will be allowed for the same customer and card. There is no limit and pre-established period;

> **Important: you should follow the guidance received in the response to the transaction denied, before making a new attempt.**

* **Irreversible Codes:** Authorizations will not be allowed for the same card or establishment, after receiving the 1st refusal response from the issuer.
