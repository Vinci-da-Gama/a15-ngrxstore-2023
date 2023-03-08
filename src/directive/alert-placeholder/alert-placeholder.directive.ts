import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[a15ngrxstoreAlertPlaceholder]',
})
export class AlertPlaceholderDirective {
  constructor(public vcRef: ViewContainerRef) {}
}
