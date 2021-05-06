import { MenusService } from '../../../../services/menus.service';
import { CommonUtilsService } from '../../../../utils/common-utils.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menus } from 'src/app/models/menu.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
})
export class EditMenuComponent implements OnInit {
  menuForm: FormGroup;
  menuId: string;
  menuDetails: Menus;
  public isUpdate: boolean = false;
  public isView: boolean = false;
  constructor(
    private commonUtils: CommonUtilsService,
    private menuService: MenusService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUpdate =
      this.route.snapshot.paramMap.get('operationType') == 'update';
    this.isView = this.route.snapshot.paramMap.get('operationType') == 'view';
    this.menuForm = this.fb.group({
      isActive: [true, Validators.required],
      menu: [{value: '', disabled: this.isView}, Validators.required],
      menucode: [{value: '', disabled: this.isView}, Validators.required],
      categories: this.fb.array([]),
    });
    this.isUpdate || this.isView ? '' : this.addCategory();
    if (this.isUpdate || this.isView) this.getMenuDetails();
  }
  getMenuDetails() {
    this.commonUtils.showSpinner();
    this.menuId = this.route.snapshot.paramMap.get('menuId');
    this.menuService.getMenuById(this.menuId).subscribe((res: any) => {
      this.menuDetails = res.data();
      this.setMenuData(this.menuDetails);
      this.commonUtils.hideSpinner();
    });
  }

  setMenuData(menuDetails: Menus) {
    menuDetails.categories.forEach((e) => {
      let category: FormGroup = this.newCategory();
      this.getCategoriesArrayControl().push(category);

      e.subcategories.forEach((r) => {
        let subCategory = this.newSubCategory();
        (category.get('subcategories') as FormArray).push(subCategory);
      });
    });
    this.menuForm.patchValue(menuDetails);
  }
  //For dynamic Category
  getCategoriesArrayControl(): FormArray {
    return this.menuForm.get('categories') as FormArray;
  }
  newCategory(): FormGroup {
    return this.fb.group({
      isActive: [{value: true, disabled: this.isView}, Validators.required],
      name:[{value: '', disabled: this.isView}, Validators.required],
      subcategories: this.fb.array([]),
    });
  }
  addCategory() {
    this.getCategoriesArrayControl().push(this.newCategory());
    this.addSubCategory(this.getCategoriesArrayControl().length - 1);
  }
  removeCategory(index) {
    this.getCategoriesArrayControl().removeAt(index);
  }

  //For dynamic SubCategory
  getSubCategoriesArrayControl(categoryIndex: number): FormArray {
    return this.getCategoriesArrayControl()
      .at(categoryIndex)
      .get('subcategories') as FormArray;
  }
  newSubCategory(): FormGroup {
    return this.fb.group({
      isActive:[{value: true, disabled: this.isView}, Validators.required],
      menu: [{value: '', disabled: this.isView}, Validators.required],
      menucode: [{value: '', disabled: this.isView}, Validators.required],
    });
  }
  addSubCategory(categoryIndex: number) {
    this.getSubCategoriesArrayControl(categoryIndex).push(
      this.newSubCategory()
    );
  }
  removeSubCategory(categoryIndex: number, subcatIndex) {
    this.getSubCategoriesArrayControl(categoryIndex).removeAt(subcatIndex);
  }

  sendMenu() {
    if (this.isUpdate) this.updateMenu();
    else this.addMenu();
  }

  updateMenu() {
    this.commonUtils.showSpinner();
    this.menuService
      .updateMenu(this.menuId, this.menuForm.value)
      .then((res) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(2, 'Menu has been updated.!');
        this.router.navigateByUrl('/admin/menus');
      })
      .catch((err) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(4, err.message);
      });
  }
  addMenu() {
    console.log(this.menuForm.value);
    this.commonUtils.showSpinner();
    this.menuService
      .addMenu(this.menuForm.value)
      .then((res) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(2, 'Menu has been added.!');
        this.router.navigateByUrl('/admin/menus');
      })
      .catch((err) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(4, err.message);
      });
  }
}
