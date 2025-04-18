import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvpDevelopmentComponent } from './mvp-development.component';

describe('MvpDevelopmentComponent', () => {
  let component: MvpDevelopmentComponent;
  let fixture: ComponentFixture<MvpDevelopmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MvpDevelopmentComponent]
    });
    fixture = TestBed.createComponent(MvpDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
