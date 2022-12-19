import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router, public accountService: AccountService) {}

  ngOnInit(): void {}

  loginPage() {
    console.log('login');
    this.router.navigate(['/login']);
  }

  registerPage() {
    console.log('register');
    this.router.navigate(['/register']);
  }
}
