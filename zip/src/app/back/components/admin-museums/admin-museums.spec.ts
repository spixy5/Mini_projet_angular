import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMuseums } from './admin-museums';

describe('AdminMuseums', () => {
  let component: AdminMuseums;
  let fixture: ComponentFixture<AdminMuseums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMuseums]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMuseums);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
