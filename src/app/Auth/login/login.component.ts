import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Router, Route } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  secureFlag = environment.cookie_secure_flag;

  isLoading = false;
  loading = false;

  //Form group
  loginForm: FormGroup;

  buttonName = 'Sign In';

  //res
  loginData: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceAPI: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { 

    //Initialize form
    this.loginForm = this.formBuilder.group({
      emailInput: ['', 
      [
        Validators.required, 
        Validators.maxLength(256), 
        Validators.pattern('^[a-z0-9._+-]+@[a-z0-9.-]+\\.[a-z]{1,}$')
      ]
    ],
      passwordInput: ['', 
      [
        Validators.required, 
        Validators.maxLength(18), 
        Validators.minLength(8), 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_]).{8,}')]]
    });

  }

  async ngOnInit() {
    console.log('Hello world');

    try {
      if(this.cookieService.get('token') !== '' && this.cookieService.get('user_id') !== '') {
        //decode JWT token
        const tokenPayload = jwtDecode(this.cookieService.get('token'));

        this.router.navigate(['/home']);
        
      } else {
        //delete if have any
        this.cookieService.delete('user_id', '/');
        this.cookieService.delete('token', '/');
      }
    } catch (error) {

      
      this.cookieService.delete('user_id', '/');
      this.cookieService.delete('token', '/');

      await Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Something is not right',
        text: 'Please try again later',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      });

    }


  }

  async onSubmit() {
    try {

      // this.loading = true;

      if(this.loginForm) {

        this.buttonName = 'Signing In';
        this.isLoading = true;

        //Retrieve form input
        const getPassword = this.loginForm.get('passwordInput').value;
        const getEmail = this.loginForm.get('emailInput').value;

        //Send input to API
        this.serviceAPI.signIn({ 'email': getEmail, 'password': getPassword }).subscribe(async(res)=> {

          this.loginData = res;
          console.log('Res api: ', this.loginData);

          //Check API response
          if(this.loginData.status === true) {

            await Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login success',
              text: 'Welcome ' + this.loginData.data.name,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            //delete existence cookies
            this.cookieService.delete('user_id', '/');
            this.cookieService.delete('token', '/');

            //set cookies
            this.cookieService.set('user_id', this.loginData.data.email, 0, '/', '', this.secureFlag, 'Strict');
            this.cookieService.set('token', this.loginData.data.jwtToken.token, 0, '/', '', this.secureFlag, 'Strict');

            this.router.navigate(['/home']);


          } else if (this.loginData.message == 'Email does not exist') {

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Please register first',
              text: 'This email does not exist',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false

            });

            this.buttonName = 'Sign In';
            this.isLoading = false;

          } else if (this.loginData.message == 'Unverified user') {

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Check your email',
              text: 'Please verify your account first',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            this.buttonName = 'Sign In';
            this.isLoading = false;

          } else {
            //Wrong password
            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Check your credentials',
              text: 'Wrong password',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            this.buttonName = 'Sign In';
            this.isLoading = false;

          }
        }, async (error: any) => {

          this.buttonName = 'Sign In';
          this.isLoading = false;

          if(error.status === 400) {

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Login failed',
              text: error.message,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

          }
        })

      } else {

        await Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Login failed',
          text: 'Invalid form credentials',
          showConfirmButton: false,
          timer: 3000,
          allowOutsideClick: false
        });

        this.buttonName = 'Sign In';
        this.isLoading = false;
      }

    } catch(error) {
      this.isLoading = false;
      console.error('Login error: ', error);
    }
  }

}
