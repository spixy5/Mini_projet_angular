import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMuseumList } from './admin-museum_list';

describe('AdminMuseums', () => {
  let component: AdminMuseumList;
  let fixture: ComponentFixture<AdminMuseumList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMuseumList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMuseumList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
