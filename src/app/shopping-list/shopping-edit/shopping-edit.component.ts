import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')
  nameInputRef!: ElementRef;
  @ViewChild('amountInput')
  numberInputRef!: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(){
    alert("Clicked")
    // console.log(this.)
    const ingName = this.nameInputRef.nativeElement.value;
    const ingNumber = this.numberInputRef.nativeElement.value;
    const ingredient = new Ingredient(ingName,ingNumber)
    console.log('onAddItem Called',ingredient)
    this.ingredientAdded.emit(ingredient)
  }

}