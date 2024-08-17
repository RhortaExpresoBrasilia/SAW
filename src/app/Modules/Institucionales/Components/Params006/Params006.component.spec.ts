/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Params006Component } from './Params006.component';

describe('Params006Component', () => {
  let component: Params006Component;
  let fixture: ComponentFixture<Params006Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Params006Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Params006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
