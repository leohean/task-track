import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEntityFoundComponent } from './no-entity-found.component';

describe('NoEntityFoundComponent', () => {
  let component: NoEntityFoundComponent;
  let fixture: ComponentFixture<NoEntityFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoEntityFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoEntityFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
