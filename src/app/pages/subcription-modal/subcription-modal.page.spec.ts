import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubcriptionModalPage } from './subcription-modal.page';

describe('SubcriptionModalPage', () => {
  let component: SubcriptionModalPage;
  let fixture: ComponentFixture<SubcriptionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcriptionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubcriptionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
