import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ReferentielResponse,
  ReferentielService,
} from '../../../core/services/referentiel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-referentiel-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './referentiel-select.component.html',
  styleUrl: './referentiel-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReferentielSelectComponent),
      multi: true,
    },
  ],
})
export class ReferentielSelectComponent implements OnInit, ControlValueAccessor {
  @Input() codeRefType!: string;
  @Input() label = '';
  @Input() placeholder = 'COMMON.SELECT';

  private referentielService = inject(ReferentielService);
  translate = inject(TranslateService);

  options: ReferentielResponse[] = [];
  value = '';
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.referentielService.getByType(this.codeRefType).subscribe({
      next: (data) => {
        this.options = data;
      },
      error: (error) => {
        console.error('Error loading referentiels:', error);
      },
    });
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
  }

  getOptionLabel(option: ReferentielResponse): string {
  return this.translate.currentLang === 'en'
    ? option.labelEn
    : option.labelFr;
}
}