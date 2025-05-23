import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessSetupComponent } from './new-business-setup.component';

describe('NewBusinessSetupComponent', () => {
  let component: NewBusinessSetupComponent;
  let fixture: ComponentFixture<NewBusinessSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBusinessSetupComponent]
    });
    fixture = TestBed.createComponent(NewBusinessSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
