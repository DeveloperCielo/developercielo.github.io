---
layout: tutorial
title: ABECS Return Codes
search: true
toc_footers: true
categories: tutorial
sort_order: 1
tags:
  - Additional Documents
---

# Return codes ABECS

> You can access information about the card brand rules for retrying transactions at [Card Brands Retry Program](){:target="_blank"}.

The **Brazilian Association of Credit Card and Services Companies (ABECS)** establishes as of July 15, 2020, the standardization of the return code of refused sales authorizations for both the physical payment and e-commerce solutions of the Brazilian market .

This normative measure seeks to bring benefits to the entire payment market, providing greater transparency in the understanding of the reason for the refusal of transactions, in addition to enabling greater assertiveness in the adoption of sales retentive strategies.

Cielo informs its customers that it's prepared to process transactions following this new market standard, below is the table of codes standardized by ABECS.

<aside class="notice">The AMEX flag codes have undergone a to/from in order to maintain two digits. We reinforce that this measure does not change the reasons for return.</aside>

|Message|Code Type|ELO|VISA|MASTERCARD/HIPER|AMEX|AMEX - From/To Cielo|Message POS/Ecommerce|Did ABECS change anything in 2022?|
|---|---|:---:|:---:|:---:|:---:|-|-|-|
|GENERIC|REVERSIBLE|5|5|5|100|FA|CONTACT YOUR CARD CENTER|No|   
|INSUFFICIENT BALANCE/LIMIT|REVERSIBLE|51|51|51|116| 5|NOT AUTHORIZED|No|
|INSUFFICIENT BALANCE/LIMIT|REVERSIBLE|51|51|51|121|A5|NOT AUTHORIZED|Only in our documentation|
|INVALID PASSWORD|REVERSIBLE|55|55 or 86|55|117|A6|INVALID PASSWORD|No|
|TRANSACTION NOT ALLOWED FOR CARD|REVERSIBLE |-|-|57|-|FD| TRANSACTION NOT ALLOWED FOR CARD|Yes|
|TRANSACTION NOT ALLOWED FOR CARD|IRREVERSIBLE|57|57|-|200|-| TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN|New|
|CARD NUMBER DOESN'T BELONG TO THE ISSUER / INVALID CARD NUMBER|IRREVERSIBLE|14 ou 56|14|14 or 1|122|8|CHECK THE CARD DATA|Yes|
|SECURITY BREACH|IRREVERSIBLE|63|N7|-|122|8|CHECK THE CARD DATA|Yes|
|SECURITY BREACH|REVERSIBLE|-|-|63|-|-|CHECK THE CARD DATA|New|
|SUSPECTED FRAUD/TRAVEL WARNING|REVERSIBLE|59|59|63|100|FA|CONTACT YOUR CARD CENTER|No|
|INVALID MERCHANT|IRREVERSIBLE|58|3|3|109|DA|TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN|Yes|
|REDO THE TRANSACTION (ISSUER REQUESTS RETRY)|REVERSIBLE|4|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|REDO THE TRANSACTION|Yes|
|CONSULT ACCREDITATOR|REVERSIBLE|6|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE| MERCHANT, CONTACT THE ACQUIRER|
|PROBLEM IN THE ACQUIRER|IRREVERSIBLE|19|19|30|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CARD ERROR - DON'T TRY AGAIN|No|
|CARD ERROR|IRREVERSIBLE|12|06|NO CORRESPONDING CODE|115|A2|CHECK THE CARD DATA|No|
|FORMAT ERROR (MESSAGE)|IRREVERSIBLE|30|12|30|181|A3|CARD ERROR - DON'T TRY AGAIN|No|
|TRANSACTION AMOUNT INVALD|IRREVERSIBLE|13|13|13|110|JB| TRANSACTION VALUE NOT ALLOWED - DON'T TRY AGAIN|No|
|VALUE OF INVALID PARCEL|IRREVERSIBLE|23|NO CORRESPONDING CODE|12|115|A2|INVALID INSTALLMENT - DON'T TRY AGAIN|No|
|PASSWORD ATTEMPTS EXCEEDED / SHOPPING|REVERSIBLE|38|75|75|106|A4|PASSWORD TRYING EXCEEDED. CONTACT YOUR CARD CENTER|
|LOST CARD|IRREVERSIBLE|41|41|41|200|FD|TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN|No
|STOLEN CARD|IRREVERSIBLE|43|43|43|200|FD|TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN|No|
| EXPIRED CARD / INVALID EXPIRATION DATE|IRREVERSIBLE|54|54|54|101|BV|CHECK THE CARD DATA|Yes|
| TRANSACTION NOT ALLOWED/TERMINAL CAPACITY|IRREVERSIBLE|57|58|58|116|A5|TRANSACTION NOT ALLOWED - DO NOT TRY AGAIN|No|
| EXCESS VALUE/WITHDRAW|REVERSIBLE|61|61 or N4|61|NO CORRESPONDING CODE|NO CORRESPONDING CODE| EXCEEDED VALUE. CONTACT YOUR CARD CENTER|No|
|TEMPORARY BLOCK (EX: NON-COMPLIANCE)|REVERSIBLE|62|62|57|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER|New|
|DOMESTIC CARD - INTERNATIONAL TRANSACTION|IRREVERSIBLE|62|NO CORRESPONDING CODE|62|WITHOUT CORRESPONDING CODE|NO CORRESPONDING CODE|CARD DOESN'T ALLOW INTERNATIONAL TRANSACTION|Only in our documentation|
|DOMESTIC CARD - INTERNATIONAL TRANSACTION|REVERSIBLE|NO CORRESPONDING CODE|62|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CARD DOESN'T ALLOW INTERNATIONAL TRANSACTION|Only in our documentation|
|MINIMUM TRANSACTION VALUE INVALID|IRREVERSIBLE|64|NO CORRESPONDING CODE|13|NO CORRESPONDING CODE|NO CORRESPONDING CODE|TRANSACTION VALUE NOT ALLOWED - DON'T TRY AGAIN|Yes|
|AMOUNT OF WITHDRAWALS EXCEEDED|REVERSIBLE|65|65|65|NO CORRESPONDING CODE|NO CORRESPONDING CODE|AMOUNT OF WITHDRAWALS EXCEEDED. CONTACT YOUR CARD CENTER|No|
|PASSWORD EXPIRED / PASSWORD CRYPTOGRAPHY ERROR|IRREVERSIBLE|83|74 or 81|88|180|A7|INVALID PASSWORD - DON'T TRY AGAIN|Yes|
|PASSWORD ATTEMPTS EXCEEDED/ WITHDRAW|REVERSIBLE|75|75|75|106|A4|PASSWORD TRIES EXCEEDED. CONTACT YOUR CARD CENTER|No|
|INVALID OR NON-EXISTING DESTINATION ACCOUNT|IRREVERSIBLE|76|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|INVALID DESTINATION ACCOUNT - DON'T TRY AGAIN|No|
| ACCOUNT INVALID OR NON-EXISTING|IRREVERSIBLE|77|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE| INVALID ORIGIN ACCOUNT - DON'T TRY AGAIN|No|
|NEW CARD WITHOUT UNLOCKING (INCLUDES CARD BLOCKED BY THE CLIENT ON THE APP)|REVERSIBLE|78|78|57|NO CORRESPONDING CODE|NO CORRESPONDING CODE|UNLOCK THE CARD|Yes|
|INVALID CARD (cryptogram)|IRREVERSIBLE|82|82|88|180|A7|CARD ERROR - DON'T TRY AGAIN|No|
|ISSUER DOWN|REVERSIBLE|91|91|91|912|A1|COMMUNICATION FAILURE - TRY LATER|No|
|SYSTEM FAILURE|REVERSIBLE|96|96|96|911|AE|COMMUNICATION FAILURE - TRY LATER|No|
|DIFFERENCE - PRE-AUTHORIZATION|IRREVERSIBLE|NO CORRESPONDING CODE|N8|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|DIFFERENT VALUE OF PRE-AUTHORIZATION - DON'T TRY AGAIN|Yes|
|INCORRECT FUNCTION (DEBIT)|REVERSIBLE|AB|52 or 53|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|USE CREDIT FUNCTION|No|
|INCORRECT FUNCTION (CREDIT)|REVERSIBLE|AC|39|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|USE DEBIT FUNCTION|No|
|PASSWORD CHANGE / UNLOCKING|IRREVERSIBLE|P5|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|INVALID PASSWORD - DON'T TRY AGAIN|No|
|NEW PASSWORD NOT ACCEPTED|REVERSIBLE|P6|NO CORRESPONDING CODE|55|NO CORRESPONDING CODE|NO CORRESPONDING CODE|INVALID PASSWORD USE THE NEW PASSWORD|Sim|
|COLLECT CARD (THERE IS NO FRAUD)|IRREVERSIBLE|NO CORRESPONDING CODE|4|4|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|Yes|
|DYNAMIC KEY CHANGE ERROR|IRREVERSIBLE|NO CORRESPONDING CODE|N7|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CARD ERROR - DON'T TRY AGAIN|Yes|
|CONFIRMED FRAUD|IRREVERSIBLE|57|7|4|200|FD|TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN|No|
|ISSUER NOT LOCATED - INCORRECT BIN (acquirer negative)|IRREVERSIBLE |NO CORRESPONDING CODE|15|15|NO CORRESPONDING CODE|NO CORRESPONDING CODE|INVALID CARD DATA - DON'T TRY AGAIN|No|
|FAILURE TO COMPLY WITH THE LAWS OF ANTI MONEY LAUNDERING| IRREVERSIBLE|NO CORRESPONDING CODE|64|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|No|
|INVALID REVERSION|IRREVERSIBLE|NO CORRESPONDING CODE|76|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|No|
| NOT LOCATED BY ROUTER|IRREVERSIBLE|NO CORRESPONDING CODE|92|92|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|No|
|TRANSACTION DENIED FOR INFRINGEMENT OF LAW|IRREVERSIBLE|57|93|57|NO CORRESPONDING CODE|NO CORRESPONDING CODE|TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN|Yes|
|DUPLICATE DATE OF TRACING DATE|IRREVERSIBLE|NO CORRESPONDING CODE|94|94|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|No|
|SURCHARGE NOT SUPPORTED|REVERSIBLE|NO CORRESPONDING CODE|B1|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER|No|
|SURCHARGE NOT SUPPORTED BY THE DEBIT NETWORK|REVERSIBLE|NO CORRESPONDING CODE|B2|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER|No|
|FORCE STIP|REVERSIBLE|NO CORRESPONDING CODE|N0|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER|No|
|WITHDRAWAL NOT AVAILABLE|IRREVERSIBLE|NO CORRESPONDING CODE| N3|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|WITHDRAWAL NOT AVAILABLE - DON'T TRY AGAIN|No|
|RECURRENT PAYMENT SUSPENSION FOR A SERVICE|IRREVERSIBLE|NO CORRESPONDING CODE|R0|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN|No|
|RECURRENT PAYMENT SUSPENSION FOR ALL SERVICES|IRREVERSIBLE| NO CORRESPONDING CODE|R1|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN|No|
|TRANSACTION NOT QUALIFIED FOR VISA PIN|IRREVERSIBLE|NO CORRESPONDING CODE|R2|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|TRANSACTION NOT ALLOWED FOR CARD - DON'T TRY AGAIN|No|
|SUSPENSION OF ALL AUTHORIZATION ORDERS|IRREVERSIBLE|NO CORRESPONDING CODE|R3|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|RECURRING SERVICE PAYMENT SUSPENSION - DON'T TRY AGAIN|No|
|IT'S NOT POSSIBLE TO LOCATE THE REGISTRATION IN THE FILE|IRREVERSIBLE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|25|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|Yes|
|FILE NOT AVAILABLE FOR UPDATE|IRREVERSIBLE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|28|NO CORRESPONDING CODE|NO CORRESPONDING CODE|CONTACT YOUR CARD CENTER - DON'T TRY AGAIN|Yes|
|CLOSED ACCOUNT|IRREVERSIBLE|46|46|62|NO CORRESPONDING CODE|NO CORRESPONDING CODE| TRANSACTION NOT PERMITTED TO CARD - DO NOT TRY AGAIN|New|
|ID VALIDATION FAILURE|IRREVERSIBLE|NO CORRESPONDING CODE|6P|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|ID VERIFICATION FAILED|New|
|USE THE CHIP|IRREVERSIBLE|FM|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|NO CORRESPONDING CODE|USE THE CHIP|New|

### Other return codes

| Response Code   | Definition                                     | Meaning                                                                     | Action                                                            | Allows Retry |
|-----------------|-----------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------|
|0               |Successfully authorized transaction.|Successfully authorized transaction.|Successfully authorized transaction.|No|
|2|Unauthorized transaction. Referred transaction.|Unauthorized transaction. Referred (suspected fraud) by the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|9|Transaction partially canceled successfully.| Transaction partially canceled successfully.| Transaction partially canceled successfully.| No |
|11|Successfully authorized transaction for card issued abroad|Successfully authorized transaction.|Successfully authorized transaction.|No|
|21|Cancellation not done. Non-localized transaction.|Cancellation was not processed. If the error persists, contact Cielo.|Cancellation was not processed. Try again later. If the error persists, contact the virtual store.|No|
|22|Invalid installment. Invalid number of installments.|Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.|Could not process transaction. Invalid value. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|24|Invalid number of installments.|Could not process transaction. Invalid number of installments. If the error persists, contact Cielo.|Could not process transaction. Invalid number of installments. Redo the transaction confirming the reported data. If the error persists, contact the virtual store.|No|
|60|Unauthorized transaction.|Unauthorized transaction. Try again. If the error persists the carrier should contact the issuing bank.|Could not process transaction. Try again later. If the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|67|Unauthorized transaction. Card locked for shopping today.|Unauthorized transaction. Card locked for shopping today. Blocking may be due to excessive invalid attempts. Card will be automatically unlocked at midnight.|Unauthorized transaction. Card locked temporarily. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|70|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|72|Cancellation not done. Not enough available balance for cancellation.|Cancellation not done. Not enough available balance for cancellation. If the error persists, contact Cielo.|Cancellation not done. Try again later. If the error persists, contact the virtual store..|No|
| 79 | Transaction not allowed / Mastercard | Unauthorized transaction. Unable to process transaction due to error related to cardholder. Ask the bearer to contact the issuing bank. | Contact your bank | No |
|80|Unauthorized transaction. Divergence on transaction/payment date.|Unauthorized transaction. Invalid transaction date or first payment date.|Unauthorized transaction. Redo the transaction confirming data.|No|
| 82 | Transaction not allowed / Mastercard | Transaction not authorized due to issuer rules. Instruct the cardholder to contact the issuing bank. | Contact your bank | No|
| 83 | Transaction not allowed / Mastercard | Unauthorized transaction. Suspicion of fraud by the issuing bank.| Contact your bank | No |
|85|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|89|Transaction error.|Unauthorized transaction. Transaction error. The carrier must try again and if the error persists, contact the issuing bank.|Unauthorized transaction. Transaction error. Try again and if the error persists, contact your issuing bank.|Only 4 times in 16 days.|
|90|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|97|Value not allowed for this transaction.|Unauthorized transaction. Value not allowed for this transaction.|Unauthorized transaction. Value not allowed for this transaction.|No|
|98|System/communication unavailable.|There was no request response within the set time.|The transaction may have been processed. To confirm, check the transaction by the store order number and evaluate whether it was actually processed.|Retry only after reviewing the original transaction by the order number and confirm that it was not processed.|
|475|Cancellation Timeout|The application did't respond within the expected time.|Try again after a few seconds. If you persist, contact Support.|No|
|999|System/communication unavailable.|Unauthorized transaction. Issuer system without communication. Try later. Can be error in SITEF, please check!|Your Transaction can not be processed, try again later. If the error persists, contact the virtual store.|From the following day, only 4 times in 16 days.|
|AA|Time Exceeded|Time exceeded in communication with the issuing bank. Orient the carrier to try again, if the error persists it will be necessary for the carrier to contact their issuing bank.|Time exceeded in their communication with the issuing bank, try again later. If the error persists, contact your bank.|Only 4 times in 16 days.|
|AF|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|AG|Transaction not allowed. Operation failure.|Transaction not allowed. There was an error in processing. Ask the cardholder to re-enter the card data, if the error persists there may be a problem in the merchant's terminal, in which case the merchant must contact Cielo..|Transaction not allowed. Enter the card details again. If the error persists, contact the virtual store|No|
|AH|Transaction not allowed. Credit card being used as debit. Use the credit function.|Transaction not allowed. Credit card being used as debit. Ask the carrier to select the Credit Card payment option.|Unauthorized transaction. Try again by selecting the credit card payment option.|No|
|AI|Unauthorized transaction. Authentication was not performed.|Unauthorized transaction. Authentication was not performed. The carrier did not complete the authentication. Ask the carrier to review the data and try again. If the error persists, contact Cielo informing the BIN (6 first digits of the card)|Unauthorized transaction. Authentication failed. Try again and correctly enter the requested data. If the error persists, contact the merchant.|No|
|AJ|Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again by selecting the Private Label option.|Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Ask the carrier to try again by selecting the Private Label option. If not available the Private Label option check in Cielo if your establishment allows this operation.|Transaction not allowed. Credit or debit transaction in an operation that allows only Private Label. Try again and select the Private Label option. In case of a new error, contact the virtual store.|No|
|AV|Unauthorized transaction. Invalid data|Validation of transaction data failed. Guide the carrier to review the data and try again.|Data validation failed. Review the reported data and try again.|Only 4 times in 16 days.|
|BD|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if there is a persistent error there may be a problem at the merchant's terminal, in which case the merchant should contact Cielo.|Transaction not allowed. Re-enter the card data. If the error persists, contact the virtual store.|No|
|BL|Unauthorized transaction. Daily limit exceeded.|Unauthorized transaction. Daily limit exceeded. Ask the carrier to contact their issuing bank.|Unauthorized transaction. Daily limit exceeded. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|BM|Unauthorized transaction. Invalid card|Unauthorized transaction. Invalid card. It may be card locking at the issuing bank or incorrect data. Try to use the Lhum Algorithm (Mod 10) to avoid unauthorized transactions for this reason.|Unauthorized transaction. Invalid card. Redo the transaction confirming the reported data.|No|
|BN|Unauthorized transaction. Card or account locked.|Unauthorized transaction. Carrier's card or account is locked. Ask the carrier to contact their issuing bank.|Unauthorized transaction. Carrier's card or account is locked. Contact your issuing bank.|No|
|BO|Transaction not allowed. Operation failed.|Transaction not allowed. There was a processing error. Ask the carrier to re-enter the card data, if the error persists, contact the issuing bank.|Transaction not allowed. There was a processing error. Re-enter card data, if error persists, contact issuing bank.|Only 4 times in 16 days.|
|BP|Unauthorized transaction. Non-existent checking account.|Unauthorized transaction. The transaction could not be processed due to an error related to the carrier's card or account. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Could not process the transaction due to an error related to the carrier's card or account. Contact the issuing bank.|No|
|BP176|Transaction not allowed.|Partner should check if the onboarding process has been completed successfully.|Partner should check if the onboarding process has been completed successfully.|---|
|BR|Transaction not authorized. Account closed|The carrier's account is closed. Ask the carrier to contact his issuing bank.|The carrier's account is closed. Ask the carrier to contact his issuing bank.|No|
|C1|Transaction not allowed. Card can't process debit transactions.|Change the payment method or card used.|Change the payment method or card used.|No|
|C2|Transaction not allowed.|Incorrect data. Please review the data on the payment screen.|Incorrect data. Please review the data on the payment screen.|No|
|C3|Transaction not allowed.|Invalid period for this type of transaction.|Invalid period for this type of transaction.|No|
|CF|Unauthorized transaction.C79:J79 Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|CG|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation faileds. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DF|Transaction not allowed. Invalid card or card failure.|Transaction not allowed. Invalid card or card failure. Ask the carrier to re-enter the card data, if the error persists, contact the bank|Transaction not allowed. Invalid card or card failure. Re-enter card data, if error persists, contact bank|Only 4 times in 16 days.|
|DM|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Limit exceeded/no balance.|Unauthorized transaction. Contact your issuing bank.|From the following day, only 4 times in 16 days.|
|DQ|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Ask the carrier to contact the issuing bank.|Unauthorized transaction. Data validation failed. Contact the issuing bank.|No|
|DS|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|EB|Number of installments greater than Allowed.|Unauthorized transaction. Contact Cielo and check if the registration has released installments.|Unauthorized transaction. Contact Cielo and check if the registration has been released in installments.|Yes|
|EE|Transaction not allowed. Installment value below the minimum allowed.|Transaction not allowed. Installment value below the minimum allowed. It is not permitted installments lower than R$5,00. It is necessary to revise the calculation for installments.|Transaction not allowed. Installment value is below the minimum allowed. Contact the virtual store.|No|
|EK|Transaction not allowed for the card|Unauthorized transaction. Transaction not allowed for the card.|Unauthorized transaction. Contact your issuing bank.|Only 4 times in 16 days.|
|FC|Unauthorized transaction. Call the Issuer|Unauthorized transaction. Guide the carrier to contact the issuing bank.|Unauthorized transaction. Contact your issuing bank.|No|
|FE|Unauthorized transaction. Divergence on transaction/payment date.|Unauthorized transaction. Invalid transaction date or first payment date.|Unauthorized transaction. Redo the transaction confirming data.|No|
|FF|Cancellation OK|Cancellation transaction authorized successfully. WARNING: This return is for cases of cancellations and not for cases of authorizations.|Transação de cancelamento autorizada com sucesso|No|
|FG|Unauthorized transaction. Call AmEx 08007285090.|Unauthorized transaction. Guide the carrier to contact AmEx Call Center.|Unauthorized transaction. Contact the AmEx Call Center at the phone number 08007285090|No|
|GA|Wait for contact|Unauthorized transaction. Referred by Lynx Online in a preventive way.|Unauthorized transaction. Contact the merchant.|No|
|GF|Transaction denied.|Transaction not authorized, check if the informed IP is released to process the transaction|Transaction not allowed. Contact Cielo.|No|
|GD|Transaction not allowed.|Transaction can not be processed in the establishment. Contact Cielo for more details.|Transaction not allowed. Contact the virtual store|No|
|GT|Transaction denied.|Brute force attack.|Transaction not allowed. Contact Cielo.|No|
|GK|Transaction denied.|Temporary blocking due to brute force attack.|Transaction not allowed. Contact Cielo.|No|
|HJ|Transaction not allowed. Invalid operation code.|Transaction not allowed. Invalid Coban operation code.|Transaction not allowed. Invalid Coban operation code. Contact the merchant.|No|
|IA|Transaction not allowed. Invalid operation indicator.|Transaction not allowed. Invalid Coban operation indicator.|Transaction not allowed. Invalid Coban operation indicator. Contact the merchant.|No|
|KA|Transaction not allowed. Data validation failed.|Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.|Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.|No|
|KB|Transaction not allowed. Incurred option selected.|Transaction not allowed. Wrong option selected. Ask the carrier to review the data and try again. If the error persists, the communication between virtual store and Cielo must be checked.|Transaction not allowed. Wrong option selected. Try again. If the error persists, contact the Virtual Store.|No|
|KE|Unauthorized transaction. Data validation failed.|Unauthorized transaction. Data validation failed. Selected option is not enabled. Check the options available to the carrier.|Unauthorized transaction. Data validation failed. Selected option is not enabled. Contact the virtual store.|No|
|NR|Transaction not allowed.|Transaction not allowed.|Transaction not allowed. Retry the transaction after 30 days|Retry the transaction after 30 days.|
|RP|Transaction not allowed.|Transaction not allowed.|Transaction not allowed. Retry the transaction after 72h|Retry the transaction after 72 hours.|
|SC|Transaction not allowed.|Transaction not allowed. Recurring payment, canceled service. Do not retry.|Transaction not allowed. Recurring payment, canceled service. Do not retry.|No.|
|U3|Transaction not allowed. Data validation failed.|Transaction not allowed. There was a failure in data validation. Ask the carrier to review the data and try again. If the error persists, check the communication between virtual store and Cielo.|Transaction not allowed. There was a failure in data validation. Review the reported data and try again. If the error persists, contact the Virtual Store.|No|
|6P|Transaction not authorized. Invalid Data|Failed to validate transaction data. Instruct the cardholder to review the data and try again.|Data validation failed. Review the entered data and try again.|Only 4 times in 16 days.|
