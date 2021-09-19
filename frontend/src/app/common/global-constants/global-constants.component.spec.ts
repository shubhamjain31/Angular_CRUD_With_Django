import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConstantsComponent } from './global-constants.component';

describe('GlobalConstantsComponent', () => {
  let component: GlobalConstantsComponent;
  let fixture: ComponentFixture<GlobalConstantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalConstantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalConstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
