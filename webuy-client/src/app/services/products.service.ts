import { Products } from './../models/product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private afs: AngularFirestore) {}

  createMenu() {
    let products: Products;

    return this.afs.collection('products').add(products);
  }

  getProducts(cat: string, subCat: string) {
    return this.afs.collection('products').snapshotChanges();
  }

  getProductById(productId) {
    return this.afs.collection('products').doc(productId).get();
  }
  addReviewsToProduct(productId, comment) {
    return this.afs.collection('reviews').doc(productId).collection('users').add(comment);
  }
  getReviewsForProduct(productId) {
    return this.afs.collection('reviews').doc(productId).collection('users').snapshotChanges();
  }
  addUserQueries(queries) {
    return this.afs.collection('queries').add(queries);
  }
}
