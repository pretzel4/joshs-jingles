const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
var cors = require('cors');
var order = require('./modules/orders');
var common = require('./modules/common');
var account = require('./modules/account');
var multer  = require('multer');
var bodyParser = require('body-parser');
const path = require('path');
var compression = require('compression')

admin.initializeApp(
    functions.config().firebase
)
const app = express();

//Middleware
// use it before all route definitions
app.use(cors({origin: ['http://localhost:4200', 'https://joshsjingles.com']}));
//Allow usage of json format.
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

//Static directories
app.use("/menu", express.static(__dirname + '/menu'));



/**
 * Tells if the shop is currently open or not.
 */
app.get('/isShopOpen', (request, response)=>{
    if(common.checkWhiteList(request)){
       
        response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        var ref = admin.database().ref("globalValues/isShopOpen");
        ref.once('value').then((value)=>{
            
            response.send(value.val());
            return value;
        }).catch((err)=>{
            console.error("Error getting value. " + err);
            response.send("Error " + err);
            throw err;
        });
    }
});

app.get('/ping', (req,res)=>{
    if(common.checkWhiteList(req)){
        console.log("User pinged server.");
        res.send("pong");
    }
    
})
app.post('/fillUserData', (req,res)=>{
    if(common.checkWhiteList(req))
    account.fillUserData(req,res,admin);
});

app.post('/makeRoomForNewAccount', (req,res)=>{
    if(common.checkWhiteList(req))
    account.makeRoomForNewAccount(req,res,admin);
});

app.post('/addOrder', (req,res)=>{
    if(common.checkWhiteList(req))
    order.addOrder(req,res,admin);
});

app.delete('/removeOrder', (req,res)=>{
    if(common.checkWhiteList(req))
    order.removeOrder(req,res,admin);
});

app.put('/updateOrder', (req,res)=>{
    if(common.checkWhiteList(req))
    order.updateOrder(req,res,admin);
});

app.get('/requestOrders', (req,res)=>{
    if(common.checkWhiteList(req))
    order.requestOrders(req,res,admin);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
