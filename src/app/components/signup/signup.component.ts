import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.signupForm = this.createFormGroup();
  }
  ngOnInit(): void {}

  createFormGroup(): FormGroup {
    return new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.noWhitespaceValidator
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          this.noWhitespaceValidator
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(7),

        ]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  noWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  };

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe(
      () => {
        this.snackBar.open('User registered successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
