import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumComments } from './museum-comments';

describe('MuseumComments', () => {
  let component: MuseumComments;
  let fixture: ComponentFixture<MuseumComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseumComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
