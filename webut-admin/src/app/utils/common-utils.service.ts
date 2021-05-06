import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilsService {
  constructor(
    private modalService: NgbModal,
    private snipper: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  openModal(component) {
    this.modalService.open(component, { ariaLabelledBy: 'modal-basic-title' });
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  showSpinner() {
    this.snipper.show();
  }
  hideSpinner() {
    this.snipper.hide();
  }
  showNotification(type, msg) {
    switch (type) {
      case 1:
        this.toastr.info(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-info alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case 2:
        this.toastr.success(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case 3:
        this.toastr.warning(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-warning alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case 4:
        this.toastr.error(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
          '',
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case 5:
        this.toastr.show(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-primary alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      default:
        break;
    }
  }
}
