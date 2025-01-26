import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesPoliticsComponent } from './cookies-politics.component';

describe('CookiesPoliticsComponent', () => {
  let component: CookiesPoliticsComponent;
  let fixture: ComponentFixture<CookiesPoliticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesPoliticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesPoliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
