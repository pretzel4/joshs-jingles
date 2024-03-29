import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth
 ){}

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doRegisterWithName(value, ifFail: (error)=>void=null){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then((user) => {
        user.user.updateProfile({"displayName": value.displayName, "photoURL": value.phoneNumber}).then((result)=>{
          resolve(user);
        }).catch((error)=>{if(ifFail!==null)ifFail(error)});
      }).catch((error)=>{if(ifFail!==null)ifFail(error)});
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }


}
