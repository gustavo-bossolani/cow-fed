import { Component, Input } from '@angular/core';

@Component({
  selector: 'cow-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent {
  @Input()
  type: 'small'| 'default' = 'default'
}
