import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTicketMuseum } from './pay-ticket-museum';

describe('PayTicketMuseum', () => {
  let component: PayTicketMuseum;
  let fixture: ComponentFixture<PayTicketMuseum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayTicketMuseum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayTicketMuseum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
