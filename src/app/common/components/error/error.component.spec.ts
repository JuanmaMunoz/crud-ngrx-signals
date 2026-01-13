import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IMessageState } from '../../models/interfaces';
import { setInitialStateMessage } from '../../store/actions/message.action';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialStateMessage: IMessageState = {
    message: null,
  };

  const initialState = {
    message: initialStateMessage,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const message = 'Test error message';
    store.setState({
      message: { message },
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h4 = compiled.querySelector('h4');
    const p = compiled.querySelector('p');
    expect(h4?.textContent).toContain('Error:');
    expect(p?.textContent).toContain(message);
  });

  it('should dispatch setInitialStateMessage when setTimeout runs', fakeAsync(() => {
    const message = 'Test error message';
    const timeDuration = 3000;
    store.setState({
      message: { message },
    });
    fixture.detectChanges();
    tick(timeDuration + 2000);
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateMessage());
  }));
});
