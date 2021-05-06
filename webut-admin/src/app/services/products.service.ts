import { Products } from './../models/product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) {}

  getProducts() {
    return this.firestore.collection('products').get();
  }

  getProductById(productId) {
    return this.firestore.collection('products').doc(productId).get();
  }

  updateProduct(productId, product) {
    return this.firestore.collection('products').doc(productId).update(product);
  }
  addProduct(product) {
    return this.firestore.collection('products').add(product);
  }
  removeProduct(productId) {
    return this.firestore.collection('products').doc(productId).delete();
  }
  getQueries(){
    return this.firestore.collection('queries').ref.orderBy("solved","asc");
  }
  updateQueries(queryId){
    return this.firestore.collection('queries').doc(queryId).update({solved: true});
  }
}
