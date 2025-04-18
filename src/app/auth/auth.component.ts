import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignIn = true; // للتبديل بين واجهتي تسجيل الدخول والتسجيل
  isLoading = false;
  errorMessage = '';
  
  showResetPopup = false;
  resetEmail = '';
  
  signInForm = {
    email: '',
    password: ''
  };

  signUpForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(
    private apisService: ApisService,
    private router: Router
  ) {}

  toggleForm() {
    this.isSignIn = !this.isSignIn;
    this.errorMessage = '';
  }
  openResetPopup() {
    this.showResetPopup = true;
  }

  closeResetPopup() {
    this.showResetPopup = false;
    this.resetEmail = '';
  }
  sendResetEmail() {
     if (!this.resetEmail) {
      this.errorMessage = 'Please enter your email';
       return;
    }
    const formData={
      "email":this.resetEmail
    }
    
    this.apisService.resetPassword(formData).subscribe({
      next: (response) => {
        alert('Password reset email sent successfully!');
        this.closeResetPopup();
      },
      error: (error) => {
        this.errorMessage ='Failed to send reset email.';
        // error.error.message || 
      }
    });
  }

  onSignIn() {
    this.isLoading = true;
    this.errorMessage = '';

    this.apisService.login(this.signInForm).subscribe({
      next: (response) => {
        this.isLoading = false;
       // console.log('Login response:', response); // إضافة لوج للتحقق من الاستجابة
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem("isLoggedIn","true")

         // console.log('Token stored:', response.access_token); // إضافة لوج للتأكد من تخزين التوكن
          this.router.navigate(['/landing-page']);
        } else {
        //  console.error('No access_token in response');
          this.errorMessage = 'Login failed: No access token received';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Login failed. Please check your credentials and try again.';
      }
    });
  }

  onSignUp() {
    if (this.signUpForm.password !== this.signUpForm.password_confirmation) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.apisService.register(this.signUpForm).subscribe({
      next: (response) => {
        this.isLoading = false;
       // console.log('Registration response:', response); // إضافة لوج للتحقق من الاستجابة
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem("isLoggedIn","true")
        //  console.log('Token stored:', response.access_token); // إضافة لوج للتأكد من تخزين التوكن
          this.router.navigate(['/landing-page']);
        } else {
        //  console.error('No access_token in response');
          this.errorMessage = 'Registration failed: No access token received';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
      }
    });
  }
}
