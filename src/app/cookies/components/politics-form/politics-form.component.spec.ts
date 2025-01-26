import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticsFormComponent } from './politics-form.component';

describe('PoliticsFormComponent', () => {
  let component: PoliticsFormComponent;
  let fixture: ComponentFixture<PoliticsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
