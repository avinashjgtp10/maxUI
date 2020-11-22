import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkOutCompletePage } from './work-out-complete.page';

describe('WorkOutCompletePage', () => {
  let component: WorkOutCompletePage;
  let fixture: ComponentFixture<WorkOutCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOutCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkOutCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
