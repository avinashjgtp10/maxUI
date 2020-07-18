import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageProPage } from './manage-pro.page';

describe('ManageProPage', () => {
  let component: ManageProPage;
  let fixture: ComponentFixture<ManageProPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
