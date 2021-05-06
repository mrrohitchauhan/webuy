import { MenusService } from '../../../../services/menus.service';
import { CommonUtilsService } from '../../../../utils/common-utils.service';
import { ProductsService } from '../../../../services/products.service';
import { Products } from 'src/app/models/product.model';
import { Menus } from '../../../../models/menu.model';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  menus: Menus[] = [];
  product: Products;
  productId: string = null;
  dropdowns = { category: [], subcategory: [] };
  public isUpdate: boolean = false;
  public isView: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private menuService: MenusService,
    private ngZone: NgZone,
    private productService: ProductsService,
    private commonUtils: CommonUtilsService,
    private router: Router
  ) {
    this.productId = this.route.snapshot.paramMap.get('productId');
    if (this.productId) {
      this.getProductDetails();
    }
  }

  ngOnInit(): void {
    this.isUpdate =
      this.route.snapshot.paramMap.get('operationType') == 'update';
    this.isView = this.route.snapshot.paramMap.get('operationType') == 'view';
    this.productForm = this.fb.group({
      name: [{ value: '', disabled: this.isView }, Validators.required],
      menu: [{ value: '', disabled: this.isView }, Validators.required],
      category: [
        { value: '', disabled: !this.isUpdate || this.isView },
        !this.isUpdate ? Validators.required : '',
      ],
      subcategory: [
        { value: '', disabled: !this.isUpdate || this.isView },
        !this.isUpdate ? Validators.required : '',
      ],
      onsale: [{ value: false, disabled: this.isView }, Validators.required],
      isnew: [{ value: true, disabled: this.isView }, Validators.required],
      isActive: [{ value: true, disabled: this.isView }, Validators.required],
      productdetails: this.fb.group({
        description: [{ value: '', disabled: this.isView }],
        f_description: [{ value: '', disabled: this.isView }],
        material: this.fb.array([]),
        size: this.fb.array([]),
      }),
      price: [{ value: 1, disabled: this.isView }, Validators.required],
      productimages: this.fb.array([]),
    });
    this.getMenu();
  }
  onMenuChanges() {
    this.productForm.get('menu').valueChanges.subscribe((selectedOption) => {
      if (selectedOption) {
        this.ngZone.run((_) => {
          this.dropdowns.category = this.menus.find(
            (e) => e.menucode == selectedOption
          ).categories;
        });
        this.productForm.get('category').enable();
      }
    });
  }
  onCatChange() {
    this.productForm
      .get('category')
      .valueChanges.subscribe((selectedOption) => {
        if (selectedOption) {
          this.ngZone.run((_) => {
            this.dropdowns.subcategory = this.menus
              .find((e) => e.menucode == this.productForm.value.menu)
              .categories.find(
                (cat) => cat.name == selectedOption
              ).subcategories;
          });
          this.productForm.get('subcategory').enable();
        }
      });
  }

  getMenu() {
    this.menuService.getmenu().subscribe((menus: any) => {
      menus.forEach((element) => {
        this.menus.push(element.payload.doc.data());
        if (!this.isUpdate && !this.isView) {
          this.onMenuChanges();
          this.onCatChange();
          this.addImage();
        }
      });
    });
  }
  getProductDetails() {
    this.commonUtils.showSpinner();
    this.productService.getProductById(this.productId).subscribe((res: any) => {
      this.product = res.data();
      this.product.productdetails.material.forEach((e) => {
        this.getMaterialArrayControl().push(this.newMaterial());
      });
      this.product.productdetails.size.forEach((e) => {
        this.getSizeArrayControl().push(this.newSize());
      });
      this.product.productimages.forEach((e) => {
        this.getProductImageArrayControl().push(this.newImage());
      });
      console.log(this.product);

      this.productForm.get('menu').setValue(this.product.category);
      this.productForm.patchValue(this.product);
      this.commonUtils.hideSpinner();
    });
  }
  materialControls() {
    return (
      this.productForm.controls['productdetails'].get('material').invalid &&
      this.productForm.controls['productdetails'].get('size').invalid
    );
  }

  getMaterialArrayControl(): FormArray {
    return this.productForm.get('productdetails').get('material') as FormArray;
  }

  newMaterial(): FormGroup {
    return this.fb.group({
      material: [{ value: '', disabled: this.isView }],
    });
  }

  addMaterial() {
    this.getMaterialArrayControl().push(this.newMaterial());
  }
  removeMaterial(index) {
    this.getMaterialArrayControl().removeAt(index);
  }

  getSizeArrayControl(): FormArray {
    return this.productForm.get('productdetails').get('size') as FormArray;
  }

  newSize(): FormGroup {
    return this.fb.group({
      size: [{ value: '', disabled: this.isView }],
    });
  }
  addSize() {
    this.getSizeArrayControl().push(this.newSize());
  }
  removeSize(index) {
    this.getSizeArrayControl().removeAt(index);
  }

  getProductImageArrayControl(): FormArray {
    return this.productForm.get('productimages') as FormArray;
  }
  newImage(): FormGroup {
    return this.fb.group({
      imgtype: [{ value: '', disabled: this.isView }],
      imgurl: [{ value: '', disabled: this.isView }, Validators.required],
    });
  }
  addImage() {
    this.getProductImageArrayControl().push(this.newImage());
  }
  removeImage(index) {
    this.getProductImageArrayControl().removeAt(index);
  }
  sendProduct() {
    this.productForm.value.productimages.forEach((element, index) => {
      element.imgtype = index == 0;
      index++;
    });

    if (this.isUpdate) this.updateProduct();
    else this.addProduct();
    console.log(this.productForm.value);
  }

  updateProduct() {
    this.commonUtils.showSpinner();
    this.productService
      .updateProduct(this.productId, this.productForm.value)
      .then((res) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(2, 'Product has been updated.!');
        this.router.navigateByUrl('/admin/products');
      })
      .catch((err) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(4, err.message);
      });
  }

  addProduct() {
    console.log(this.productForm.value);
    this.commonUtils.showSpinner();
    this.productService
      .addProduct(this.productForm.value)
      .then((res) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(2, 'Product has been added.!');
        this.router.navigateByUrl('/admin/products');
      })
      .catch((err) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(4, err.message);
      });
  }
}
