import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesFormComponent } from './cookies-form.component';

describe('CookiesFormComponent', () => {
  let component: CookiesFormComponent;
  let fixture: ComponentFixture<CookiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
