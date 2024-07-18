import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Params002Component } from './params002.component';

describe('Params002Component', () => {
  let component: Params002Component;
  let fixture: ComponentFixture<Params002Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Params002Component]
    });
    fixture = TestBed.createComponent(Params002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
