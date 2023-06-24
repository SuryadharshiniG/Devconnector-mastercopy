import { Component } from '@angular/core';
import { Register } from '../../models/register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: any={};
  
  constructor(private authService:AuthService,
    private router :Router){}
  register : Register=new Register();
  registerSubmit(){
      console.log(this.register);
      this.authService.register(this.register).
      subscribe(
        (res)=>{
          console.log(res);
          this.error = {};
          this.router.navigate(['/dashboard'])
        },
        (err)=>{
          console.log(JSON.stringify(err.error)); //
          this.error = {};
          err.error.errors.forEach((e: any) => {
            this.error = { ...this.error, [e.param]: e.msg };
            console.log(e.msg);
          });
        }

      )
  }

  }
