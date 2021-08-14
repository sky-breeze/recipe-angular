import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appNewDropdownMenu]'
})
export class NewDropdownMenuDirective {

  @HostBinding('class.show') isOpen:boolean = false;

  constructor() { }

  @HostListener('click') toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

}
