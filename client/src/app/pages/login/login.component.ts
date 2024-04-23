import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm !:FormGroup;

  ngOnInit():void{
    this.loginForm = this.fb.group({
     email: ['',Validators.compose([Validators.required, Validators.email])],
     password: ['',Validators.required],
    });
 }

 login(){
   this.authService.loginService(this.loginForm.value).subscribe({
    next: (res)=>{
      alert("Login is Success!");
      localStorage.setItem('user_id',res.data._id);
      this.authService.isLoggedIn$.next(true);
      this.router.navigate(['home']);
      this.loginForm.reset();
    },
    error: (err)=>{
      console.log(err);
      alert(err.error.message); 
    }
   })
 }
}
