import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cow-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  constructor(
    private router: Router
  ) { }

  handleContinue(): void {
    this.router.navigate(['/auth']);
  }

}
