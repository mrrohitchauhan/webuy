import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) {}

  singin(userDetails) {
    return this.afs
      .collection('admin')
      .ref.where('userId', '==', userDetails.userid)
      .where('password', '==', userDetails.password)
      .get();
  }

  signOut() {
    localStorage.setItem('userid', null);
    window.location.href = '/';
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userid');
  }

  getUsersOrderList() {
    return this.afs.collection('transactions').snapshotChanges();
  }

  getOrderById(docId) {
    return this.afs.collection('transactions').doc(docId).snapshotChanges();
  }

  updateOrderStatus(orderStatus, docId) {
    return this.afs
      .collection('transactions')
      .doc(docId)
      .update({ status: orderStatus });
  }
}
