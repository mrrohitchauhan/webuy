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
          msg,
          "Info",
          {
            timeOut: 4000,
            closeButton: true,
            positionClass: 'toast-top-right',
          }
        );
        break;
      case 2:
        this.toastr.success(
          msg,
          'Nice',
          {
            timeOut: 4000,
            closeButton: true,
            positionClass: 'toast-top-right',
          }
        );
        break;
      case 3:
        this.toastr.warning(
          msg,
          'Caution',
          {
            timeOut: 4000,
            closeButton: true,
            positionClass: 'toast-top-right',
          }
        );
        break;
      case 4:
        this.toastr.error(
          msg,
          'Opps',
          {
            timeOut: 4000,
            closeButton: true,
            positionClass: 'toast-top-right',
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
            positionClass: 'toast-top-right',
          }
        );
        break;
      default:
        break;
    }
  }
  isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    return !(iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
  }
  isAlphabet(evt) {
    var keyCode = evt.keyCode || evt.which;
    var regex = new RegExp("\^[a-zA-Z ]+$");
    return regex.test(String.fromCharCode(keyCode));
  }
}
