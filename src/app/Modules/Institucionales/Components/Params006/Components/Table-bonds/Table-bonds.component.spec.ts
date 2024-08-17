/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableBondsComponent } from './Table-bonds.component';

describe('TableBondsComponent', () => {
  let component: TableBondsComponent;
  let fixture: ComponentFixture<TableBondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
