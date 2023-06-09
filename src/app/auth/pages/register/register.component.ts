import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import Swall from 'sweetalert2';

import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['test4', [Validators.required]],
    email: ['test4@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  registro() {
    const { name, email, password } = this.miFormulario.value;

    this.authService.registro(name, email, password)
      .subscribe(ok => {
        if (ok === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swall.fire('Error', ok, 'error');
        }
      })
  }

}
