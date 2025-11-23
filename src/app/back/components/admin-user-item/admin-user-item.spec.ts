import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserItem } from './admin-user-item';

describe('AdminUserItem', () => {
  let component: AdminUserItem;
  let fixture: ComponentFixture<AdminUserItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
