import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMuseumItem } from './admin-museum-item';

describe('AdminMuseumItem', () => {
  let component: AdminMuseumItem;
  let fixture: ComponentFixture<AdminMuseumItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMuseumItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMuseumItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
