/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadBondListComponent } from './Upload-bond-list.component';

describe('UploadBondListComponent', () => {
  let component: UploadBondListComponent;
  let fixture: ComponentFixture<UploadBondListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBondListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBondListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
