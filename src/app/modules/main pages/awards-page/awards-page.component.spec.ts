import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsPageComponent } from './awards-page.component';

describe('AwardsPageComponent', () => {
  let component: AwardsPageComponent;
  let fixture: ComponentFixture<AwardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
