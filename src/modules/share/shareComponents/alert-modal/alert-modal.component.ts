import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'a15ngrxstore-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent {
  @Input('message') msg: string = '';
  @Output('closeAlert') closeModal = new EventEmitter<void>();

  constructor() {}

  /**
   * onClose
   */
  onClose = () => {
    this.closeModal.emit();
  };
}
