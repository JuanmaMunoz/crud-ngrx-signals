import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCrudComponent } from './info-crud.component';

describe('InfoCrudComponent', () => {
  let component: InfoCrudComponent;
  let fixture: ComponentFixture<InfoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
