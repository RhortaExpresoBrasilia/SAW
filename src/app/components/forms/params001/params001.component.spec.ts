import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Params001Component } from './params001.component';

describe('Params001Component', () => {
  let component: Params001Component;
  let fixture: ComponentFixture<Params001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Params001Component]
    });
    fixture = TestBed.createComponent(Params001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
