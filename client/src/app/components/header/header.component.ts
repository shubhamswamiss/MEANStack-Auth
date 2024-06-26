import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn:boolean = false;
 
  ngOnInit(): void{
    this.authService.isLoggedIn$.subscribe(res =>{
      this.isLoggedIn = this.authService.isLoggedIn();
    })
  }

  logout(){
    localStorage.removeItem("user_id");
    this.router.navigate(['login']);
    this.authService.isLoggedIn$.next(false);
  }
}
