import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  listPost: any = [];

  constructor() { }

  async ngOnInit() {
    try {

      this.listPost = [
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
            }
      ]

    } catch(error) {

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
