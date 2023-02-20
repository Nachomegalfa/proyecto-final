import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Campo obligatorio',
  email: 'Email inválido',
  minlength: 'Longitud mínima no cumplida',
  notMatch: 'Las contraseñas no coinciden',
};

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
export class InputValidationComponent implements OnChanges, OnInit {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;

  errorMessages: string[] = [];

  constructor() {}
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  checkValidation() {
    const errors = this.control.errors;

    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
