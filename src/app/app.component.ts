import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

interface User {
  id: number,
  userName: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>("https://localhost:7044/api/Users").subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
