import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMuseum } from './admin-add-museum';

describe('AdminAddMuseum', () => {
  let component: AdminAddMuseum;
  let fixture: ComponentFixture<AdminAddMuseum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddMuseum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddMuseum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
