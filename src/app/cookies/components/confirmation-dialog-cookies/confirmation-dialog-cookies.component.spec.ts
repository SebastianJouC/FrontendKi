import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogCookiesComponent } from './confirmation-dialog-cookies.component';

describe('ConfirmationDialogCookiesComponent', () => {
  let component: ConfirmationDialogCookiesComponent;
  let fixture: ComponentFixture<ConfirmationDialogCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogCookiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
