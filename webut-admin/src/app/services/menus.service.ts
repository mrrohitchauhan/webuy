import { Menus } from './../models/menu.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  constructor(private firestore: AngularFirestore) {}
  getmenu() {
    return this.firestore.collection('menus').snapshotChanges();
  }
  getMenuById(menuId){
    return this.firestore.collection('menus').doc(menuId).get();
  }
  updateMenu(menuId, menu) {
    return this.firestore.collection('menus').doc(menuId).update(menu);
  }
  addMenu(menu) {
    return this.firestore.collection('menus').add(menu);
  }
  removeProduct(menuId) {
    return this.firestore.collection('menus').doc(menuId).delete();
  }
}
