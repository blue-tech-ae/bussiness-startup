import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }
}
