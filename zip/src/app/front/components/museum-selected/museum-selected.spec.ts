import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumSelected } from './museum-selected';

describe('MuseumSelected', () => {
  let component: MuseumSelected;
  let fixture: ComponentFixture<MuseumSelected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumSelected]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseumSelected);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
