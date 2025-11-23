import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumList } from './museum-list';

describe('MuseumList', () => {
  let component: MuseumList;
  let fixture: ComponentFixture<MuseumList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseumList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
