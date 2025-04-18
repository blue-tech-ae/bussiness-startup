import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessSetupComponent } from './bussiness-setup.component';

describe('BussinessSetupComponent', () => {
  let component: BussinessSetupComponent;
  let fixture: ComponentFixture<BussinessSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BussinessSetupComponent]
    });
    fixture = TestBed.createComponent(BussinessSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
