import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    focus2;
    focus3;
    

    isLoading = false;

    isChecked;
    registerData: any = [];

    //button name
    buttonName = 'Create Account';

    //Form group
    signUpForm: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private serviceAPI: AuthService,
        private router: Router,
        private cookieService: CookieService
    ) {

        //Initialize form
        this.signUpForm = this.formBuilder.group({
            nameInput: ['',
                [
                    Validators.required,
                    Validators.maxLength(32),
                    Validators.minLength(3),
                    Validators.pattern(/^\S[a-zA-Z@' ]*$/)
                ]

            ],
            usernameInput: ['',
                [
                    Validators.required,
                    Validators.maxLength(15),
                    Validators.minLength(3)
                ]
            ],
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
                    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_]).{8,}')
                ]
            ]
        })
    }

    async ngOnInit() {

        try {

            if(this.cookieService.get('token') !== '' && this.cookieService.get('user_id') !== '') {
                console.log('Token existed. Deleted!');

                //delete if have any
                this.cookieService.delete('user_id', '/');
                this.cookieService.delete('token', '/');
            } else {
                console.log('No token existed. Can register')
                
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

            if(this.signUpForm) {

                this.buttonName = 'Creating...';
                this.isLoading = true;

                //Retrieve form input
                const getName = this.signUpForm.get('nameInput').value;
                const getUsername = this.signUpForm.get('usernameInput').value;
                const getEmail = this.signUpForm.get('emailInput').value;
                const getPassword = this.signUpForm.get('passwordInput').value;

                //Send input to API service
                this.serviceAPI.signUp({
                    'personName': getName,
                    'username': getUsername,
                    'email': getEmail,
                    'password': getPassword
                }).subscribe(async(res) => {

                    this.registerData = res;

                    //Check API status response
                    if(this.registerData.status === true) {

                        await Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Register success',
                            text: 'Verify your email!',
                            showConfirmButton: false,
                            timer: 3000,
                            allowOutsideClick: false
                        });

                        //navigate to login page
                        this.router.navigate(['/login']);

                    } else {

                        await Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Attention',
                            text: this.registerData.message,
                            showConfirmButton: false,
                            timer: 3000,
                            allowOutsideClick: false
                        });

                        this.buttonName = 'Create Account';
                        this.isLoading = false;
                    }
                }, async (error: any) => {

                    this.buttonName = 'Sign In';
                    this.isLoading = false;

                    console.error('Error abe: ', error)

                    if(error.status === 400) {

                        await Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Register failed',
                            text: error.message,
                            showConfirmButton: false,
                            timer: 3000,
                            allowOutsideClick: false
                        });

                    } else {

                        await Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Internal server error',
                            text: 'Try again later',
                            showConfirmButton: false,
                            timer: 2500,
                            allowOutsideClick: false
                        });
                    }
                })
            } else {

                await Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Register failed',
                    text: 'Invalid form credentials',
                    showConfirmButton: false,
                    timer: 3000,
                    allowOutsideClick: false
                  });
            }

        } catch(error) {
            this.isLoading = false,
            console.log('Sign up error: ', error);
        }
    }

    changed(evt) {
        this.isChecked = evt.target.checked;
        console.log('isCheck: ', this.isChecked);
    }
}
