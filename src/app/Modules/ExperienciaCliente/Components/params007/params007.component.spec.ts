/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Params007Component } from './params007.component';

describe('Params007Component', () => {
  let component: Params007Component;
  let fixture: ComponentFixture<Params007Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Params007Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Params007Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
