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

      this.allPost = [
        {
          'post_content': "Part 1: How I got into web development, from childhood through university",
          'post_title': "My developer journey - School and University",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T04:30:38.000Z",
          'header_image': "./assets/img/post/um.jpg"
        },
        {
          'post_content': "The world's tallest mountain ranges form when pieces of Earth's crust—called plates—smash against each other in a process called plate tectonics, and buckle up like the hood of a car in a head-on collision.",
          'post_title': "How Are Mountains Formed?",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T04:27:15.000Z",
          'header_image': "./assets/img/post/mountain.jpg"
        },
        {
          'post_content':"Static? Server? Aaaaagh! With the modernisation of the web, it can be hard to know which approach is right for your website. Here's how to choose.",
          'post_title': "When to use a static website vs server-side websites",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T04:24:43.000Z",
          'header_image': "./assets/img/post/network.jpg"
        },
        {
          'post_content':"Despite having rebuilt my portfolio already this year, it was still a good idea for me to do another build from scratch. Here's why.",
          'post_title': "Why I rebuilt my portfolio website ... again",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T04:17:18.000Z",
          'header_image': "./assets/img/post/coding2.jpg"
        },
        {
          'post_content': "Don't waste time creating the same idea over and over again. Here's how I work smart, not hard, by reusing ideas across many projects.",
          'post_title': "Reusing ideas to supercharge your projects",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T04:16:12.000Z",
          'header_image': "./assets/img/post/post2.jpg"
        },
        {
          'post_content': "It's been a tough year filled with lots of emotions. Here's how the year has been for me - special thanks to all those who helped me through it.",
          'post_title': "2021 - The good. The bad. The ugly.",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T04:12:02.000Z",
          'header_image': "./assets/img/post/post4.jpg"
        },
        {
          'post_content': "Stop creating generic images for your blog post social media cards. Instead, let's automate them!",
          'post_title': "Generating a social image with Node.js",
          'name': "Syahmi Kamal",
          'time_posted': "2022-01-12T03:38:16.000Z",
          'header_image': "./assets/img/post/post1.jpg"
        }
      ]

      this.serviceAPI.viewListPost().subscribe(async(res)=> {
        this.postData = res;

        if(this.postData.status === true) {

         
          
          // for (var i in this.postData.data.listPost) {
          //   this.allPost.push({
          //     'post_content': this.postData.data.listPost[i].post_content,
          //     'post_title': this.postData.data.listPost[i].post_title,
          //     'name': this.postData.data.listPost[i].name,
          //     'time_posted': this.postData.data.listPost[i].created_at,
          //     'header_image': this.postData.data.listPost[i].header_image
          //   })
          // }

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
