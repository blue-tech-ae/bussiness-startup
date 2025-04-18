import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMarketingComponent } from './new-marketing.component';

describe('NewMarketingComponent', () => {
  let component: NewMarketingComponent;
  let fixture: ComponentFixture<NewMarketingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMarketingComponent]
    });
    fixture = TestBed.createComponent(NewMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
