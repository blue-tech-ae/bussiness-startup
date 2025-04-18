import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvpComponent } from './mvp.component';

describe('MvpComponent', () => {
  let component: MvpComponent;
  let fixture: ComponentFixture<MvpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MvpComponent]
    });
    fixture = TestBed.createComponent(MvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
