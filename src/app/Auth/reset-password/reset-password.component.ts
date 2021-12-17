import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      //return if another validator has already found an error on the matchingControl
      return;
    }
    console.log('Control value: ', control.value);
    console.log('Match value: ', matchingControl.value);

    //set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        mustMatch: true
      })
    } else {
      matchingControl.setErrors(null);
    }
  }
}


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  focus;
  focus1;

  //params id
  id: any;
  sub: any;

  //res API
  resetData: any;

  //button name
  buttonName = 'Update';

  //form group
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceAPI: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

    // Initialize form
    this.passwordForm = this.formBuilder.group({
      newPasswordInput: ['',
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_]).{8,}')
        ]
      ],
      retypePasswordInput: ['',
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_]).{8,}')
        ]
      ]
    }, {
      validator: MustMatch('newPasswordInput', 'retypePasswordInput')
    });
  }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    // console.log('Hello spinner')

    // this.spinner.show(undefined,
    //   {
    //     type: 'ball-scale-multiple',
    //     size: 'medium',
    //     bdColor: 'rgba(0, 0, 0, 0.8)',
    //     color: '#fff',
    //     fullScreen: true
    //   });


    if (this.id !== undefined) {

      // setTimeout(() => {
      //   /** spinner ends after 5 seconds */
      //   this.spinner.hide();
      // }, 3000);
      //send to api
      this.verifyResetToken(this.id);

    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Sorry',
        text: 'Cannot identify reset token',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      });

    }

  }

  async verifyResetToken(data) {
    try {

      this.serviceAPI.verifyResetToken(data)
        .subscribe(async (res) => {

          this.resetData = res;
          console.info(this.resetData);

          if (this.resetData.status == true) {

            await Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Success',
              text: 'Successfully verify reset token',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

          } else {

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Invalid token',
              text: 'Please make sure its a valid token',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            this.router.navigate(['login']);
          }
        }, async (error: any) => {

          await Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Internal server error',
            text: error.error.message,
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          });
        })


    } catch (error) {
      console.error('reset-password error: ', error);

    }
  }

  

}
