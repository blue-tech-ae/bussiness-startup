import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchPreprationComponent } from './launch-prepration.component';

describe('LaunchPreprationComponent', () => {
  let component: LaunchPreprationComponent;
  let fixture: ComponentFixture<LaunchPreprationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchPreprationComponent]
    });
    fixture = TestBed.createComponent(LaunchPreprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
