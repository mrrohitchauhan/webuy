import { CommonUtilsService } from '../../../../utils/common-utils.service';
import { MenuList } from '../../../../models/menu.model';
import { MenusService } from '../../../../services/menus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  menus: MenuList[] = [];
  searchtext: string = "";
  constructor(
    private menuService: MenusService,
    private commonUtils: CommonUtilsService
  ) {}

  ngOnInit(): void {
    this.getMenus();
  }
  getMenus() {
    this.commonUtils.showSpinner();
    this.menuService.getmenu().subscribe((res) => {
      this.menuService.getmenu().subscribe((res: any) => {
        this.menus = [];
        res.forEach((element) => {
          let menu: MenuList = {
            menu: element.payload.doc.data().menu,
            menuId: element.payload.doc.id,
            active: element.payload.doc.data().isActive
          };
          this.menus.push(menu);
        });
        this.commonUtils.hideSpinner();
      });
    });
  }
}
