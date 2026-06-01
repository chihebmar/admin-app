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

@Component({
  selector: 'app-partner-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    ReferentielSelectComponent,
  ],
  templateUrl: './partner-form.component.html',
  styleUrl: './partner-form.component.scss',
})
export class PartnerFormComponent implements OnChanges {
  @Input() initialData: any | null = null;
  @Input() readonly = false;
  @Input() forcedTypeCodeRef = '';

  @Output() submitForm = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      address: [''],
      typeCodeRef: ['', Validators.required],
      statusCodeRef: ['PARTNER_STATUS_ACTIVE', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] || changes['forcedTypeCodeRef']) {
      this.patchForm();
    }

    if (changes['readonly']) {
      this.readonly ? this.form.disable() : this.enableForm();
    }
  }

  private patchForm(): void {
    if (!this.initialData) {
      this.form.reset({
        code: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        typeCodeRef: this.forcedTypeCodeRef,
        statusCodeRef: 'PARTNER_STATUS_ACTIVE',
      });

      this.lockTypeField();
      return;
    }

    this.form.patchValue({
      code: this.initialData.code,
      name: this.initialData.name,
      email: this.initialData.email,
      phone: this.initialData.phone,
      address: this.initialData.address,

      typeCodeRef:
        this.forcedTypeCodeRef || this.initialData.typeCodeRef,

      statusCodeRef:
        this.initialData.statusCodeRef ||
        'PARTNER_STATUS_ACTIVE',
    });

    this.lockTypeField();
  }

  private lockTypeField(): void {
    const typeControl = this.form.get('typeCodeRef');

    if (!typeControl) {
      return;
    }

    typeControl.enable();

    if (this.forcedTypeCodeRef) {
      typeControl.setValue(this.forcedTypeCodeRef);

      setTimeout(() => {
        typeControl.disable();
      });
    }
  }

  private enableForm(): void {
    this.form.enable();
    this.lockTypeField();
  }

  submit(): void {
    if (this.readonly) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue());
  }
}