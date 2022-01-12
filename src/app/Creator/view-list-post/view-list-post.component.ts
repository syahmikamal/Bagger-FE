import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { ServiceApiService } from 'src/app/service/service-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-list-post',
  templateUrl: './view-list-post.component.html',
  styleUrls: ['./view-list-post.component.css']
})
export class ViewListPostComponent implements OnInit {

  postData: any = [];
  allPost: any = [];

  constructor(
    private serviceAPI: ServiceApiService
  ) { }

  async ngOnInit() {
    try {

      this.serviceAPI.viewListPost().subscribe(async(res)=> {
        this.postData = res;

        if(this.postData.status === true) {
          
          for (var i in this.postData.data.listPost) {
            this.allPost.push({
              'post_content': this.postData.data.listPost[i].post_content,
              'post_title': this.postData.data.listPost[i].post_title,
              'name': this.postData.data.listPost[i].name,
              'time_posted': this.postData.data.listPost[i].created_at,
              'header_image': this.postData.data.listPost[i].header_image
            })
          }

          console.log('html data: ', this.postData)
        } else {
          console.log('fail list post: ', this.postData)
        }
      })
       
    } catch (error) {

      await Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Something is not right',
        text: 'Please try again later',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      })
    }

  }

}
