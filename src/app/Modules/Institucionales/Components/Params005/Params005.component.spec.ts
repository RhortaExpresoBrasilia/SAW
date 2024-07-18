/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Params005Component } from './Params005.component';

describe('Params005Component', () => {
  let component: Params005Component;
  let fixture: ComponentFixture<Params005Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Params005Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Params005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
