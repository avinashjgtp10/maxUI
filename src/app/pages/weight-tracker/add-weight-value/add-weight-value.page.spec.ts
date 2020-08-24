import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWeightValuePage } from './add-weight-value.page';

describe('AddWeightValuePage', () => {
  let component: AddWeightValuePage;
  let fixture: ComponentFixture<AddWeightValuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightValuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightValuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
