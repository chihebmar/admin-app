import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ReferentielSelectComponent } from '../../../shared/components/referentiel-select/referentiel-select.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe,ReferentielSelectComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  @Output() submitForm = new EventEmitter<any>();

  @Input() initialData: any | null = null;
  @Input() readonly = false;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      roleCodeRef: ['ROLE_SUPER_ADMIN', Validators.required],
      statusCodeRef: ['USER_ACTIVE', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] || changes['mode']) {
      this.patchForm();
      this.updatePasswordValidator();
    }

    if (changes['readonly']) {
      this.readonly ? this.form.disable() : this.form.enable();
    }
  }

  private patchForm(): void {
    if (!this.initialData) {
      this.form.reset({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleCodeRef: 'ROLE_SUPER_ADMIN',
        statusCodeRef: 'USER_ACTIVE',
      });
      return;
    }

    this.form.patchValue({
      firstName: this.initialData.firstName,
      lastName: this.initialData.lastName,
      email: this.initialData.email,
      password: '',
      roleCodeRef: this.initialData.roleCodeRef,
      statusCodeRef: this.initialData.statusCodeRef,
    });
  }

  private updatePasswordValidator(): void {
    const passwordControl = this.form.get('password');

    if (!passwordControl) {
      return;
    }

    if (this.mode === 'add') {
      passwordControl.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      passwordControl.clearValidators();
    }

    passwordControl.updateValueAndValidity();
  }

  submit(): void {
    if (this.readonly) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = { ...this.form.value };

    if (this.mode !== 'add' && !value.password) {
      delete value.password;
    }

    this.submitForm.emit(value);
  }
}