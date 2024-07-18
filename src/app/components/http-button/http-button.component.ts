import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-http-button',
  templateUrl: './http-button.component.html',
  styleUrls: ['./http-button.component.css']
})
export class HttpButtonComponent {

  @Input()
  text !: string;

  @Input()
  color: string ='primary';
  
  @Input()
  disabled: boolean = false;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  onClickHandler(): void {
    this.onClick.emit();
  }
}
