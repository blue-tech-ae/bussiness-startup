import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesStrategyComponent } from './sales-strategy.component';

describe('SalesStrategyComponent', () => {
  let component: SalesStrategyComponent;
  let fixture: ComponentFixture<SalesStrategyComponent>;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      declarations: [SalesStrategyComponent]
    });
    fixture = TestBed.createComponent(SalesStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
