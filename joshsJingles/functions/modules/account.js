var common = require('./common');

function fillUserData(req,res,admin){
    common.setupResponse(res);
    common.logIP(req);
    var json = JSON.parse(req.body);
  
    var ref = admin.database().ref("users/" + json.uid);
    ref.set(json.data).then(()=>{
        res.send({"success": true, "error": err});
        return true;
    }).catch((err)=>{
        console.error("Error setting value. " + err);
        res.send({"success": false, "error": err});
        throw err;
    });
}

function makeRoomForNewAccount(req,res,admin){
    //Check if email already has account. If email already has account but does not have their email verified,
    //then delete that account so that a new one can overwrite it.
   
    common.setupResponse(res);
    common.logIP(req);
    var json = JSON.parse(req.body);

    admin.auth().getUserByEmail(json.email).then((userRecord)=>{
       
        if(!userRecord.emailVerified){
            
            admin.auth().deleteUser(userRecord.uid)
            .then(function() {
              res.send(JSON.stringify({"success":true, "error":null}));
              return true;
            })
            .catch(function(error) {
              console.error("Error deleting user:", error);
              res.send(JSON.stringify({"success":false, "error":error}));
              throw error;
            });
        }
        else{
            res.send(JSON.stringify({"success":true, "error":null}));
        }
        return true;
    }).catch((error)=>{
        console.error("Error fetching user data:", error);
        res.send(JSON.stringify({"success":false, "error":error}));
        throw error;
    });
}

exports.fillUserData = fillUserData;
exports.makeRoomForNewAccount = makeRoomForNewAccount;