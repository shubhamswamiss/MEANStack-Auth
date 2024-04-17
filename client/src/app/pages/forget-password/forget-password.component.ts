import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export default class ForgetPasswordComponent implements OnInit {

  forgetForm !:FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required,Validators.email])]
    })
  }

  submit(){
  console.log(this.forgetForm.value);
  }
}
