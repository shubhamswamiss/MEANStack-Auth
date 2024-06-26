import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export default class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  token!: string;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
    })
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      });

  }

  reset() {
    let resetObj = {
        token: this.token,
        password: this.resetForm.value.password
    };
    this.authService.resetPasswordService(resetObj).subscribe({
      next:(res)=>{
          alert(res.message);
          this.resetForm.reset();
          this.router.navigate(['login'])
      },
      error: (err)=>{
        alert(err.error.message);
      }
    })
  }
}
