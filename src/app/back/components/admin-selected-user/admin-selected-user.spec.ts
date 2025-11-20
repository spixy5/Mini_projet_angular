import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectedUser } from './admin-selected-user';

describe('AdminSelectedUser', () => {
  let component: AdminSelectedUser;
  let fixture: ComponentFixture<AdminSelectedUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSelectedUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSelectedUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
