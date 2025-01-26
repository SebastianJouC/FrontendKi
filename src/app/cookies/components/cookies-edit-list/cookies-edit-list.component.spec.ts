import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesEditListComponent } from './cookies-edit-list.component';

describe('CookiesEditListComponent', () => {
  let component: CookiesEditListComponent;
  let fixture: ComponentFixture<CookiesEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesEditListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
