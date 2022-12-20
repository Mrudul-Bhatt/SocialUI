import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  //if we want to use the functions of a service in html template then we have to make it public
  constructor(private router: Router, public accountService: AccountService) {}

  userName: string = '';

  ngOnInit(): void {}

  loginPage() {
    console.log('login');
    this.router.navigate(['/login']);
  }

  registerPage() {
    console.log('register');
    this.router.navigate(['/register']);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
