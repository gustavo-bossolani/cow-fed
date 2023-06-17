import { Component, Input } from '@angular/core';

@Component({
  selector: 'cow-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.sass']
})
export class SectionTitleComponent {

  @Input()
  mainSection: string = '';

  @Input()
  subSection: string = '';
}
