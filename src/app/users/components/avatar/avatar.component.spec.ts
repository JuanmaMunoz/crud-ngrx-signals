import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IAvatar } from '../../models/interfaces';
import { ImgComponent } from '../img/img.component';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let infoAvatar!: IAvatar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent, NoopAnimationsModule, ImgComponent],
    }).compileComponents();
    infoAvatar = {
      title: 'New User',
      description: 'Insert new user in the system',
      modeRow: true,
    };
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.avatar = infoAvatar;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h4 = compiled.querySelector('h4');
    const h5 = compiled.querySelector('h5');
    const img = compiled.querySelector('app-img');
    expect(h4?.textContent).toContain(infoAvatar.title);
    expect(h5?.textContent).toContain(infoAvatar.description);
    expect(img).toBeTruthy();
  });

  it('should exist these classes in mode row', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const flex = compiled.querySelector('.d-lg-flex');
    const textStart = compiled.querySelector('.text-lg-start');
    const marginStart = compiled.querySelector('.ms-lg-3');
    expect(flex).toBeTruthy();
    expect(textStart).toBeTruthy();
    expect(marginStart).toBeTruthy();
  });

  it('should not exist these classes in mode row', () => {
    infoAvatar = { ...infoAvatar, modeRow: false };
    component.avatar = infoAvatar;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const flex = compiled.querySelector('.d-lg-flex');
    const textStart = compiled.querySelector('.text-lg-start');
    const marginStart = compiled.querySelector('.ms-lg-3');
    expect(flex).toBeFalsy();
    expect(textStart).toBeFalsy();
    expect(marginStart).toBeFalsy();
  });
});
