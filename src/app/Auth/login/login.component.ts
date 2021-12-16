import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Router, Route } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

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
  isSending = false;
  loading = false;

  //Form group
  loginForm: FormGroup;
  resetForm: FormGroup; //reset password form

  buttonName = 'Sign In';
  buttonMail = 'Update';

  closeResult: string;

  //res
  loginData: any = [];
  resetEmailData: any;

  constructor(
    private formBuilder: FormBuilder,
    private serviceAPI: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
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

    this.resetForm = this.formBuilder.group({
      emailInput: ['',
      [
        Validators.required,
        Validators.maxLength(256),
        Validators.pattern('^[a-z0-9._+-]+@[a-z0-9.-]+\\.[a-z]{1,}$')
      ]
    ],
    })

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

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, {
        windowClass: 'modal-mini',
        size: 'sm',
        centered: true,
        backdrop: 'static',
        keyboard: false
      }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {

        this.resetForm.reset()

        this.closeResult = 'Dismissed $this.getDismiss(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, {
        windowClass: 'modal-danger',
        centered: true,
        backdrop: 'static',
        keyboard: false
      }).result.then((result) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)'
      });
    } else {
      this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {

        this.resetForm.reset();
      })
    }
  }

  private getDismissReason(reason: any): string {
    if(reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK)  {
      return 'by clicking on a backdrop';
    } else {
      return 'with: $reason';
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

  mailSubmit() {
    if (this.resetForm.valid) {

      this.isSending = true;
      this.buttonMail = 'Updating'

      const email = this.resetForm.get('emailInput').value;

      console.log('email: ', email)

      // this.spinner.show(undefined,
      //   {
      //     type: 'ball-scale-multiple',
      //     size: 'medium',
      //     bdColor: 'rgba(0, 0, 0, 0.8)',
      //     color: '#fff',
      //     fullScreen: true
      //  });
  

      this.serviceAPI.resetEmail({'resetEmail': email})
        .subscribe(async (res) => {

          //retrieve API response
          this.resetEmailData = res;

          this.isSending = false;
          this.buttonMail = 'Update';

          if (this.resetEmailData.status === true) {

            this.modalService.dismissAll();

            await Swal.fire({
              icon: 'success',
              position: 'center',
              title: 'Success',
              text: 'Email successfully sent',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

          } else {

            this.modalService.dismissAll();

            await Swal.fire({
              icon: 'warning',
              position: 'center',
              title: 'Warning',
              text: this.resetEmailData.message,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            //refresh page
            this.ngOnInit();

          }
        }, async (error: any) => {

          if(error.status === 400) {

            this.modalService.dismissAll();
            this.isLoading = false;

            console.log('error: ', error.error.message)

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Sent email failed',
              text: error.error.message,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });
          } else {

            this.modalService.dismissAll();
            this.isLoading = false;

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Internal server error',
              text: error.error.message,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });
          }

          this.isSending = false;
        })
    }
  }

}
