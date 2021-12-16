import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/security';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { States } from '../../shared/state';
import { Router } from '@angular/router';
import { ApiException } from '../../api/cont-demo-api/api-exception';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'contd-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  readonly States = States;
  state = States.IDLE;
  form: FormGroup | undefined;
  error: ApiException | undefined;

  constructor(
    private fb: FormBuilder,
    private authentication: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authentication.logout();
    this.buildForm();
  }

  login() {
    if (!this.form?.valid) {
      return;
    }
    this.state = States.LOADING;
    const payload = this.form.value;
    this.authentication.authenticate(payload).subscribe({
      next: () => {
        this.router.navigate(['/', 'contacts']);
        this.state = States.IDLE;
      },
      error: (e: HttpErrorResponse) => {
        this.state = States.ERROR;
        this.error = e.error;
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

}
