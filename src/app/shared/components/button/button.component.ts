import { Component, Input } from '@angular/core';


@Component({
  selector: 'cow-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input()
  type: 'primary' | 'secondary' = 'primary';

  @Input()
  disabled = false;

}
