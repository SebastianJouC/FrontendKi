import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticsListComponent } from './politics-list.component';

describe('PoliticsListComponent', () => {
  let component: PoliticsListComponent;
  let fixture: ComponentFixture<PoliticsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
