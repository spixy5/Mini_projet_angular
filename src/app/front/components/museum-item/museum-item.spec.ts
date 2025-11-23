import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumItem } from './museum-item';

describe('MuseumItem', () => {
  let component: MuseumItem;
  let fixture: ComponentFixture<MuseumItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseumItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
