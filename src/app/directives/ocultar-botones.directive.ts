import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appOcultarBotones]'
})
export class OcultarBotonesDirective implements OnInit {

  @Input("appOcultarBotones") claimReq!: Function;

  constructor(private authService: AuthService,
    private elementRef: ElementRef,) { }

  ngOnInit(): void {
    const claims = this.authService.getClaims();
    if(!this.claimReq(claims))
      this.elementRef.nativeElement.style.display = "none";
  }

}
