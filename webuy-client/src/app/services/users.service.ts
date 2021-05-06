import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { UserTransaction } from './../models/user.transaction.model';
import { GlobalService } from './global.service';
import { IUser } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userData: IUser;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private globalService: GlobalService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserById(user.uid).subscribe((res: any) => {
          let user: any = {
            uid: res.payload.data().uid,
            displayName: res.payload.data().displayName,
            email: res.payload.data().email,
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.globalService.userData.next(user);
          this.userData = user;
        });
      } else {
        this.removeUsers();
      }
    });
  }
  getUserById(uid) {
    return this.afs.collection('users').doc(uid).snapshotChanges();
  }
  // Sign up with email/password
  signUp(user) {
    return this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  // Sign in with email/password
  signIn(user) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  /* Sign out */
  signOut() {
    this.afAuth.signOut().then((res) => {
      this.removeUsers();
      window.location.href = '/';
    });
  }
  removeUsers(){
    this.globalService.userData.next({});
    this.userData = null;
    localStorage.setItem('user', null);
    JSON.parse(localStorage.getItem('user'));
  }
  get isLoggedIn(): boolean {
    return !!JSON.parse(localStorage.getItem('user'));
  }
  setUserData(user, name) {
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      createdOn: new Date().toString(),
    };
    return this.afs.collection('users').doc(user.uid).set(userData);
  }

  updateUserPersonalDetails(personalDetails) {
    return this.afs
      .collection('users')
      .doc(this.userData.uid)
      .update({ personalDetails: personalDetails });
  }

  getUSerPersonalDetails() {
    return this.afs.collection('users').doc(this.userData.uid).get();
  }

  addUserTransaction(transactions: UserTransaction) {
    return this.afs.collection('transactions').add(transactions);
  }

  getUserTransaction() {
    return this.afs
      .collection('transactions')
      .ref.where('userId', '==', this.globalService.getUserId);
  }

  getUserTransactionDetails(transactionsId) {
    return this.afs
      .collection('transactions')
      .ref.where('transactionId', '==', transactionsId);
  }

}
