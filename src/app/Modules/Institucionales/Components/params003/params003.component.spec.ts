/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Params003Component } from './params003.component';

describe('Params003Component', () => {
  let component: Params003Component;
  let fixture: ComponentFixture<Params003Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Params003Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Params003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
