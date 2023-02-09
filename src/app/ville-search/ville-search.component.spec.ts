import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleSearchComponent } from './ville-search.component';

describe('VilleSearchComponent', () => {
  let component: VilleSearchComponent;
  let fixture: ComponentFixture<VilleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VilleSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VilleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
