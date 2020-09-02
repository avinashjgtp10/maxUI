import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkOutVideoPage } from './work-out-video.page';

describe('WorkOutVideoPage', () => {
  let component: WorkOutVideoPage;
  let fixture: ComponentFixture<WorkOutVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOutVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkOutVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
