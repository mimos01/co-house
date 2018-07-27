//import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
/*const corsOptions = {
origin: '*',
allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};*/

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const Mollie = require("mollie-api-node");
const mollie = new Mollie.API.Client;
mollie.setApiKey("test_hfRWrESmaQEafP5FjwE8uWUAS3eGxK");
const querystring = require("querystring");
const fs = require("fs");

exports.pay = functions.https.onRequest((req, res) => {
    //exports.pay = functions.https.onRequest((req, res) => {
    console.log('1. response', res)

    mollie.payments.create({
        amount: 9.99,
      //  method: Mollie.API.Object.Method.IDEAL,
        description: "Betaling voor co-house",
        redirectUrl: "https://co-housedev.firebaseapp.com/#/",
        webhookUrl: "https://us-central1-co-housedev.cloudfunctions.net/paymentsWebhook",
        testmode: true
    },
        (payment) => {
            if (payment.error) {
                console.error('errrr', payment.error);
                return res.end();
            }
            console.log('3. payment.getPaymentUrl()', payment.getPaymentUrl());
                res.redirect(payment.getPaymentUrl());
        });
});

exports.paymentsWebhook = functions.https.onRequest((req, res) => {

    console.log("request.body: ", req.body);
    console.log("request.query: ", req.query);
    mollie.payments.get(req.body.id, function (payment) {
        console.log("payment", payment);
        if (payment.error) {
            console.error('payment error: ', payment.error);
            res.end();
        }
        console.log('4. Payment')
        //checking/processing the payment goes here...
        res.end();
    });
});

