import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: '',
      password: '',
    });
  }

  login() {
    console.log(this.form.value);

    if (this.form.value.userName === '' || this.form.value.password === '') {
      this.toastr.error('Please enter all fields');
      return;
    }

    //In case of http request we dont need to unsubscribe from the observable, but in case of a observable created
    //by us we need to unsubscribe from it. Use async pipe in the template to unsubscribe from the observable

    this.accountService.login(this.form.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      },
    });
    // this.accountService.login(this.form.value);
  }
}
