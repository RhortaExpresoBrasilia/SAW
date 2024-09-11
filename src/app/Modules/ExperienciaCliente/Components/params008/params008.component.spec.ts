/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Params008Component } from './params008.component';

describe('Params008Component', () => {
  let component: Params008Component;
  let fixture: ComponentFixture<Params008Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Params008Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Params008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
