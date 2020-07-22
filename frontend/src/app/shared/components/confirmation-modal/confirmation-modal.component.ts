import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  headerHtml: any;
  bodyHtml: any;
  okButtonText: string;
  cancelButtonText: string;
  active: boolean;
  body: string;
  title: string;
  onClose: Subject<boolean>;

  constructor(
    private sanitizer: DomSanitizer,
    public modalRef: BsModalRef

  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showConfirmationModal(
    title: string, body: string,
    okButtonText: string = 'Ok',
    cancelButtonText: string = 'Cancel'): void {
    this.active = true;
    this.title = title;
    this.okButtonText = okButtonText;
    this.cancelButtonText = cancelButtonText;
    this.bodyHtml = this.sanitizer.bypassSecurityTrustHtml(body);

    console.log('[on showConfirmationModal]');

  }

  public onConfirm(): void {
    this.active = false;
    this.modalRef.hide();
    this.onClose.next(true);
  }

  public onCancel(): void {
    this.active = false;
    this.modalRef.hide();
    this.onClose.next(false);
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.modalRef.hide();
    this.onClose.next(null);
  }

}
