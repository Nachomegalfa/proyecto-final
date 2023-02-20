import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
})
export class DefaultButtonComponent implements OnInit {
  @Input()
  type: 'submit' | 'button' = 'submit';

  @Input()
  text: string = 'Enviar';

  @Input()
  bgColor = '#b7569a';

  @Input()
  color = 'white';

  @Input()
  fontSizeRem = 1.3;

  @Input()
  widthRem = 12;

  @Output()
  onClick = new EventEmitter();

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
