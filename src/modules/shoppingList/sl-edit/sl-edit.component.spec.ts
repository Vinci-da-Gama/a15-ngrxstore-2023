import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlEditComponent } from './sl-edit.component';

describe('SlEditComponent', () => {
  let component: SlEditComponent;
  let fixture: ComponentFixture<SlEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
