import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from './user.model';
@Injectable()
export class UserService {

  //user: FirebaseUserModel = new FirebaseUserModel();
  user = null;
  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
  ){}

  sendEmailVerification(onFinish: ()=>void=null, onFail: (error)=>void=null){
    var self = this;
    self.getCurrentUser().then((user)=>{
      if(user){
        user.sendEmailVerification().then(function() {
          // Email sent.
            console.log("Email has been sent to " + user.email);
            onFinish();
         }).catch(function(error) {
          console.log(error);

          // An error happened.
          onFail(error);
         });
      }
    });
  }

  getCurrentUser(){
    var self = this;
    return new Promise<any>((resolve, reject) => {
      console.log(self.user);
      if(self.user === null){
        var user = firebase.auth().onAuthStateChanged(function(user){
          if (user) {
            console.log("Setting user...");
            self.user = user;
            resolve(user);
          } else {
            reject('No user logged in');
          }
        })
      }
      else{
        resolve(self.user);
      }
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
