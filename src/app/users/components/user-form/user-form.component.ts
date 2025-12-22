import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fadeIn } from '../../../common/animations/animations';
import { ErrorComponent } from '../../../common/components/error/error.component';
import { InputDateComponent } from '../../../common/components/input-date/input-date.component';
import { InputNumberComponent } from '../../../common/components/input-number/input-number.component';
import { InputTextComponent } from '../../../common/components/input-text/input-text.component';
import { TypeInput } from '../../../common/models/enum';
import { IInput, IInputNumber } from '../../../common/models/interfaces';
import { IAvatar, IUserDetail } from '../../models/interfaces';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    AvatarComponent,
    ErrorComponent,
  ],
  animations: [fadeIn()],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() userDetail!: Signal<IUserDetail | null>;
  @Input() loading!: Signal<boolean>;
  @Input() error!: Signal<HttpErrorResponse | null>;
  @Output() actionCancel: EventEmitter<null> = new EventEmitter();
  @Output() actionSave: EventEmitter<IUserDetail> = new EventEmitter();
  public formUser!: FormGroup;
  public nameControl!: FormControl;
  public lastNameControl!: FormControl;
  public emailControl!: FormControl;
  public dateControl!: FormControl;
  public positionControl!: FormControl;
  public salaryControl!: FormControl;
  public coworkerControl!: FormControl;
  public hardworkingControl!: FormControl;
  public knowledgeControl!: FormControl;
  public proactivityControl!: FormControl;
  public productivityControl!: FormControl;
  private validationErrors = {
    required: 'The field is required',
    minlength: 'The min length is 2',
    maxlength: 'The max length is 50',
    emailExist: 'The email is already in use.',
    min: 'The min value is 600',
    max: 'The max value is $100,000',
    email: 'The email format is invalid',
  };

  public infoAvatar: IAvatar = {
    title: 'New User',
    description: 'Insert new user in the system',
    modeRow: true,
  };

  public inputName: WritableSignal<IInput> = signal({
    type: TypeInput.TEXT,
    control: {} as FormControl,
    placeholder: 'Insert name',
    label: 'Name',
    validationErrors: this.validationErrors,
    focus: true,
  });

  public inputLastName: WritableSignal<IInput> = signal({
    type: TypeInput.TEXT,
    control: {} as FormControl,
    placeholder: 'Insert lastname',
    label: 'Lastname',
    validationErrors: this.validationErrors,
  });

  public inputEmail: WritableSignal<IInput> = signal({
    type: TypeInput.TEXT,
    control: {} as FormControl,
    placeholder: 'Insert email',
    label: 'Email',
    validationErrors: this.validationErrors,
  });

  public inputDate: WritableSignal<IInput> = signal({
    type: TypeInput.TEXT,
    control: {} as FormControl,
    placeholder: 'Insert date',
    label: 'Incorporation date',
    validationErrors: this.validationErrors,
  });

  public inputPosition: WritableSignal<IInput> = signal({
    type: TypeInput.TEXT,
    control: {} as FormControl,
    placeholder: 'Insert position',
    label: 'Position',
    validationErrors: this.validationErrors,
  });

  public inputSalary: WritableSignal<IInput> = signal({
    type: TypeInput.TEXT,
    control: {} as FormControl,
    placeholder: 'Insert salary',
    label: 'Salary',
    validationErrors: this.validationErrors,
    mask: '000999',
  });

  public inputCoworker: WritableSignal<IInputNumber> = signal({
    type: TypeInput.NUMBER,
    control: {} as FormControl,
    placeholder: 'Insert coworker',
    label: 'Coworker',
    validationErrors: this.validationErrors,
    min: 1,
    max: 10,
  });

  public inputHardworking: WritableSignal<IInputNumber> = signal({
    type: TypeInput.NUMBER,
    control: {} as FormControl,
    placeholder: 'Insert hardworking',
    label: 'Hardworking',
    validationErrors: this.validationErrors,
    min: 1,
    max: 10,
  });

  public inputKnowledge: WritableSignal<IInputNumber> = signal({
    type: TypeInput.NUMBER,
    control: {} as FormControl,
    placeholder: 'Insert knowledge',
    label: 'Knowledge',
    validationErrors: this.validationErrors,
    min: 1,
    max: 10,
  });

  public inputProactivity: WritableSignal<IInputNumber> = signal({
    type: TypeInput.NUMBER,
    control: {} as FormControl,
    placeholder: 'Insert proactivity',
    label: 'Proactivity',
    validationErrors: this.validationErrors,
    min: 1,
    max: 10,
  });

  public inputProductivity: WritableSignal<IInputNumber> = signal({
    type: TypeInput.NUMBER,
    control: {} as FormControl,
    placeholder: 'Insert productivity',
    label: 'Productivity',
    validationErrors: this.validationErrors,
    min: 1,
    max: 10,
  });

  constructor() {
    effect(() => {
      if (this.error()) {
        if (this.error()?.error.code === 'USER_EMAIL_ALREADY_EXISTS') {
          this.emailControl.setErrors({ emailExist: 'error' });
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadForm();
    if (this.userDetail()) this.setInfoAvatar(this.userDetail()!);
  }

  loadForm(): void {
    this.formUser = new FormGroup({
      name: new FormControl(this.userDetail()?.info.name ?? '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl(this.userDetail()?.info.lastName ?? '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl(this.userDetail()?.info.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      date: new FormControl(
        this.userDetail()?.info.date
          ? new Date(this.userDetail()?.info.date!).toISOString().split('T')[0]
          : '',
        [Validators.required],
      ),
      position: new FormControl(this.userDetail()?.info.position ?? '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      salary: new FormControl(this.userDetail()?.info.salary ?? '', [
        Validators.required,
        Validators.min(600),
        Validators.max(100000),
      ]),
      coworker: new FormControl(this.userDetail()?.statistics.coworker ?? 5, [Validators.required]),
      hardworking: new FormControl(this.userDetail()?.statistics.hardworking ?? 5, [
        Validators.required,
      ]),
      knowledge: new FormControl(this.userDetail()?.statistics.knowledge ?? 5, [
        Validators.required,
      ]),
      proactivity: new FormControl(this.userDetail()?.statistics.proactivity ?? 5, [
        Validators.required,
      ]),
      productivity: new FormControl(this.userDetail()?.statistics.productivity ?? 5, [
        Validators.required,
      ]),
    });

    this.nameControl = this.formUser.get('name') as FormControl;
    this.lastNameControl = this.formUser.get('lastName') as FormControl;
    this.emailControl = this.formUser.get('email') as FormControl;
    this.dateControl = this.formUser.get('date') as FormControl;
    this.positionControl = this.formUser.get('position') as FormControl;
    this.salaryControl = this.formUser.get('salary') as FormControl;
    this.coworkerControl = this.formUser.get('coworker') as FormControl;
    this.hardworkingControl = this.formUser.get('hardworking') as FormControl;
    this.knowledgeControl = this.formUser.get('knowledge') as FormControl;
    this.proactivityControl = this.formUser.get('proactivity') as FormControl;
    this.productivityControl = this.formUser.get('productivity') as FormControl;

    this.inputName.update((params) => ({ ...params, control: this.nameControl }));
    this.inputLastName.update((params) => ({ ...params, control: this.lastNameControl }));
    this.inputEmail.update((params) => ({ ...params, control: this.emailControl }));
    this.inputDate.update((params) => ({ ...params, control: this.dateControl }));
    this.inputPosition.update((params) => ({ ...params, control: this.positionControl }));
    this.inputSalary.update((params) => ({ ...params, control: this.salaryControl }));
    this.inputCoworker.update((params) => ({ ...params, control: this.coworkerControl }));
    this.inputHardworking.update((params) => ({ ...params, control: this.hardworkingControl }));
    this.inputKnowledge.update((params) => ({ ...params, control: this.knowledgeControl }));
    this.inputProactivity.update((params) => ({ ...params, control: this.proactivityControl }));
    this.inputProductivity.update((params) => ({ ...params, control: this.productivityControl }));
  }

  public saveUser(): void {
    const userDetail: IUserDetail = {
      info: {
        name: this.nameControl.getRawValue(),
        lastName: this.lastNameControl.getRawValue(),
        position: this.positionControl.getRawValue(),
        date: new Date(this.dateControl.getRawValue()).getTime(),
        salary: this.salaryControl.getRawValue(),
        email: this.emailControl.getRawValue(),
      },
      statistics: {
        email: this.emailControl.getRawValue(),
        proactivity: this.proactivityControl.getRawValue(),
        productivity: this.productivityControl.getRawValue(),
        hardworking: this.hardworkingControl.getRawValue(),
        coworker: this.coworkerControl.getRawValue(),
        knowledge: this.knowledgeControl.getRawValue(),
      },
    };

    this.actionSave.emit(userDetail);
  }

  public cancel(): void {
    this.actionCancel.emit();
  }

  private setInfoAvatar(user: IUserDetail): void {
    this.infoAvatar = {
      title: `${user.info.name} ${user.info.lastName}`,
      description: `${user.info.email}`,
      modeRow: true,
    };
  }
}
