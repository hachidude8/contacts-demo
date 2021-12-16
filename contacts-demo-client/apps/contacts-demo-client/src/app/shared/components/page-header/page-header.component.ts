import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../security';
import { Router } from '@angular/router';

@Component({
  selector: 'contd-page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {

  @Input() heading: string | undefined;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
  ) {
  }

  logout() {
    this.authentication.logout();
    this.router.navigate(['/', 'login']);
  }

}
