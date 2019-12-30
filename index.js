const momo = require("mtn-momo");
require('dotenv').config();

const { Collections } = momo.create({
  callbackHost: 'example.com'
});

const collections = Collections({
  userSecret: process.env.USER_SECRET,
  userId: process.env.USER_ID,
  primaryKey: process.env.PRIMARY_KEY
});

// Request to pay
collections
  .requestToPay({
    amount: "50",
    currency: "EUR",
    externalId: "123456",
    payer: {
      partyIdType: momo.PayerType.MSISDN,
      partyId: "256789566944"
    },
    payerMessage: "CRITERIA CAKES",
    payeeNote: "hello"
  })
  .then(transactionId => {
    console.log({ transactionId });

    // Get transaction status
    return collections.getTransaction(transactionId);
  })
  .then(transaction => {
    console.log({ transaction });

    // Get account balance
    return collections.getBalance();
  })
  .then(accountBalance => console.log({ accountBalance }))
  .catch(error => {
    console.log('The error:' + error);
  });