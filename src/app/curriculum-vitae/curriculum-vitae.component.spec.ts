import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumVitaeComponent } from './curriculum-vitae.component';

describe('CurriculumVitaeComponent', () => {
  let component: CurriculumVitaeComponent;
  let fixture: ComponentFixture<CurriculumVitaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumVitaeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumVitaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
