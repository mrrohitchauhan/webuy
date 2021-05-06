import { Menus } from './../models/menu.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  constructor(private firestore: AngularFirestore) {}

  createMenu() {
    let menus: Menus = {
      menu: 'Men',
      menucode: 'men',
      categories: [
        {
          name: 'Clothing',
          subcategories: [
            {
              menu: 'T-Shirts',
              menucode: 'tshirt',
              isActive: true,
            },
            {
              menu: 'Shirt',
              menucode: 'shirt',
              isActive: true,
            },
          ],
          isActive: true,
        },
        {
          name: 'Footwear',
          subcategories: [
            {
              menu: 'Shoes',
              menucode: 'shoes',
              isActive: true,
            },
            {
              menu: 'Sandals',
              menucode: 'sandals',
              isActive: true,
            },
          ],
          isActive: true,
        },
      ],
      isActive: true,
    };

    return this.firestore.collection('menus').add(menus);
  }

  getmenu() {
    return this.firestore.collection('menus').snapshotChanges();
  }
}
