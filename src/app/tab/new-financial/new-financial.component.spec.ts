import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinancialComponent } from './new-financial.component';

describe('NewFinancialComponent', () => {
  let component: NewFinancialComponent;
  let fixture: ComponentFixture<NewFinancialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFinancialComponent]
    });
    fixture = TestBed.createComponent(NewFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
