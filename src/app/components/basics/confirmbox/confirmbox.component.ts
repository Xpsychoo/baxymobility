import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss']
})
export class ConfirmboxComponent {
  @Input() confirmText = '';
  @Output() setConfirmBox: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() submitFunc: EventEmitter<any> = new EventEmitter<any>();

}
