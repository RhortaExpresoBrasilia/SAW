import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-Template-email',
  templateUrl: './Template-email.component.html',
  styleUrls: ['./Template-email.component.css']
})
export class TemplateEmailComponent implements OnInit {
  @ViewChild('templateContent', { static: false }) templateContent!: ElementRef;
  @Input() url!: string;
  @Input() eps!: string;
  @Input() contrato!: string;
  constructor() { }

  ngOnInit() {
  }

  getTemplateHtml(): string {
    return this.templateContent.nativeElement.innerHTML;
  }
}
