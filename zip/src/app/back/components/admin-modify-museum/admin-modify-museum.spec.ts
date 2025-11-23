import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyMuseum } from './admin-modify-museum';

describe('AdminModifyMuseum', () => {
  let component: AdminModifyMuseum;
  let fixture: ComponentFixture<AdminModifyMuseum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModifyMuseum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModifyMuseum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
