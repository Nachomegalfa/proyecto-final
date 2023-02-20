import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' | 'date' | 'number' = 'text';
  @Input()
  maxLength!: number;
  @Input()
  pattern = '';

  get formControl() {
    return this.control as FormControl;
  }

  ngOnInit(): void {}
}
