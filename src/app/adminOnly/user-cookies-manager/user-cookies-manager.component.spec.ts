import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCookiesManagerComponent } from './user-cookies-manager.component';

describe('UserCookiesManagerComponent', () => {
  let component: UserCookiesManagerComponent;
  let fixture: ComponentFixture<UserCookiesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCookiesManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCookiesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
