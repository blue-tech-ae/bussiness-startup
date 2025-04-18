import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlaningComponent } from './financial-planing.component';

describe('FinancialPlaningComponent', () => {
  let component: FinancialPlaningComponent;
  let fixture: ComponentFixture<FinancialPlaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialPlaningComponent]
    });
    fixture = TestBed.createComponent(FinancialPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
