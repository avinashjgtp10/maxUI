import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWaterComponentPage } from './add-water-component.page';

describe('AddWaterComponentPage', () => {
  let component: AddWaterComponentPage;
  let fixture: ComponentFixture<AddWaterComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWaterComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWaterComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
