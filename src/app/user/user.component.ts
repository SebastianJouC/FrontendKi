import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { trigger,style,transition,query, animate } from '@angular/animations';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations:[
    trigger('routerFadeIn',[
      transition('* <=> *',[
        query(':enter',[
          style({opacity:0}),
          animate('1s ease-in-out',style({opacity:1}))
        ],{optional:true}),
      ]),
    ])
  ]
})
export class UserComponent {
  private context = inject(ChildrenOutletContexts)

  getRouteUrl(){
    return this.context.getContext('primary')?.route?.url;
  }
}
