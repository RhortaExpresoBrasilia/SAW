/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Params004Component } from './params004.component';

describe('Params004Component', () => {
  let component: Params004Component;
  let fixture: ComponentFixture<Params004Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Params004Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Params004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
