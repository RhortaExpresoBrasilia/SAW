import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpButtonComponent } from './http-button.component';

describe('HttpButtonComponent', () => {
  let component: HttpButtonComponent;
  let fixture: ComponentFixture<HttpButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpButtonComponent]
    });
    fixture = TestBed.createComponent(HttpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
