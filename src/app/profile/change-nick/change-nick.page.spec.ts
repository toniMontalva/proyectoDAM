import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeNickPage } from './change-nick.page';

describe('ChangeNickPage', () => {
  let component: ChangeNickPage;
  let fixture: ComponentFixture<ChangeNickPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeNickPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeNickPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
