import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessIdeaComponent } from './bussiness-idea.component';

describe('BussinessIdeaComponent', () => {
  let component: BussinessIdeaComponent;
  let fixture: ComponentFixture<BussinessIdeaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BussinessIdeaComponent]
    });
    fixture = TestBed.createComponent(BussinessIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
