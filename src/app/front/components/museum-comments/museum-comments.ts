import { Component, inject, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceMuseum } from '../../../services/service-museum';
import { ServiceUser } from '../../../services/service-user';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-museum-comments',
  imports: [FormsModule],
  templateUrl: './museum-comments.html',
  styleUrl: './museum-comments.css',
})
export class MuseumComments  implements OnInit{
  readonly router:Router=inject(Router);
  readonly route: ActivatedRoute=inject(ActivatedRoute);
  readonly museumService: ServiceMuseum=inject(ServiceMuseum);
  readonly userService: ServiceUser=inject(ServiceUser);
  museum_id!:number;
  comments!:Comment[];
 ngOnInit(): void {
    this.museum_id=Number(this.route.parent?.snapshot.paramMap.get('id'));
        if(this.museum_id){
          this.museumService.getAllComments(this.museum_id).subscribe(
          data => {
         if (data.success) {
           this.comments=data.comments;
      } else {
        console.error('Failed to load comments');
    
      }
      },
   
    );
        }

 }
   message: string = '';
onSubmitComment() {
    if(this.message!=""){
      const userId = localStorage.getItem('userId');
  if (!userId) {
    this.router.navigate(['/login']);
    return;
  }
  const author_name = localStorage.getItem('userName');
  const author_email = localStorage.getItem('userEmail');
  const newComment: Comment = {  
    museum_id: this.museum_id,
    author_name: author_name ?? '',
    author_email: author_email ?? '',
    message: this.message,    
  };

  this.museumService.addComment(newComment).subscribe(
    data => {
      this.comments.push(data.comment);
      if(data.success){
        const userId = Number(localStorage.getItem('userId'));
        this.userService.updateActivity(userId).subscribe()
        this.message='';
      }
    });
    }
    else{
      alert("Veuillez écrire un commentaire avant de publier.")
    }
}
toggleLike(id_comment:number =0){
    if (id_comment==0) return;
   const userId=localStorage.getItem('userId');
  if (!userId) {
    this.router.navigate(['/login']);
    return;
  }
  this.museumService.toggleLike(Number(userId),id_comment).subscribe(
    data=>{
          if(data.success){
            const userId = Number(localStorage.getItem('userId'));
            this.userService.updateActivity(userId).subscribe()
             const comment=this.comments.find(c => c.id==id_comment);
            if(comment)
            comment.like_count=data.like_count
          }
          else{
            console.log('error: '+data.message)
          }
         

    }
  )
}

}
