import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Params001DetailComponent } from './params001-detail.component';

describe('Params001DetailComponent', () => {
  let component: Params001DetailComponent;
  let fixture: ComponentFixture<Params001DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Params001DetailComponent]
    });
    fixture = TestBed.createComponent(Params001DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
