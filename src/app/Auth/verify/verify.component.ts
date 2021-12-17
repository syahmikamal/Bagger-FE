import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  id: any;
  sub: any;

  verifyData: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceAPI: AuthService,
  ) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    console.log('params: ', this.id);

    if (this.id !== undefined) {

      //send to api 
      this.verifyEmail(this.id);

    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Sorry',
        text: 'Cannot identify verify token',
        showConfirmButton: false,
        timer: 5000,
        allowOutsideClick: false
      }).then(() => {

        //navigat to login pag
        this.router.navigate(['login']);
      })
    }
  }

  verifyEmail(data) {
    try {
      this.serviceAPI.verifyToken(data)
        .subscribe(async (res) => {

          this.verifyData = res;
          console.log('SUccess res: ', this.verifyData);

          if (this.verifyData.status == true) {

            await Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Success',
              text: 'Verify account successful',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            this.router.navigate(['login']);

          } else {

            await Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Invalid token',
              // text: 'Your token is expired',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            this.router.navigate(['login']);


          }



        }, async (error: any) => {

          console.log('Error verify toekn: ', error);

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
      console.log('verify.component-error ', error);
    }
  }



}
