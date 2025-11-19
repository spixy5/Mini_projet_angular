import { Component, inject, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceMuseum } from '../../../services/service-museum';
@Component({
  selector: 'app-museum-comments',
  imports: [],
  templateUrl: './museum-comments.html',
  styleUrl: './museum-comments.css',
})
export class MuseumComments implements OnInit{
  private router:Router=inject(Router);
   @Input() museumId!: number;
  comments: Comment[]=[]; 
  private route: ActivatedRoute=inject(ActivatedRoute);
    private museumService: ServiceMuseum=inject(ServiceMuseum);
  ngOnInit(): void {
    if(this.museumId)
  { this.museumService.getAllComments(this.museumId).subscribe(
      data => {
         if (data.success) {
           this.comments=data.comments;
      } else {
        console.error('Failed to load comments');
    
      }
      },
   
    );}
  }
onSubmitComment(comment :string) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    this.router.navigate(['/login']);
    return;
  }
  const author_name = localStorage.getItem('userName');
  const author_email = localStorage.getItem('userEmail');
  const newComment: Comment = {  
    museum_id: this.museumId,
    author_name: author_name ?? '',
    author_email: author_email ?? '',
    comment: comment,    
  };

  this.museumService.addComment(newComment).subscribe(
    data => {
      console.log(data);
      this.comments.push(data);
    });
}

}
