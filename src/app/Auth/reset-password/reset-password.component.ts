import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
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

  //button name
  buttonName = 'Update';

  //form group
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceAPI: AuthService,
    private router: Router,
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

    console.log('Hello spinner')

    this.spinner.show(undefined,
      {
        type: 'ball-scale-multiple',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

  }

  async onSubmit(){
    try {

    } catch(error) {

    }
  }

}
