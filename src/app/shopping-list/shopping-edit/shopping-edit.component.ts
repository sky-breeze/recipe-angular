import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f')
  slForm!: NgForm;
  @ViewChild('nameInput')
  nameInputRef!: ElementRef;
  @ViewChild('amountInput')
  numberInputRef!: ElementRef;
  editMode:boolean = false;
  editedItemIndex:number=0;
  editedItem!:Ingredient

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.slService.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index)
      this.slForm.setValue({
        name:this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onAddItem(form:NgForm){
    const value = form.value
    const ingName = value.name;
    const ingNumber = value.amount;
    const ingredient = new Ingredient(ingName,ingNumber)
    console.log('onAddItem Called',ingredient)
    // this.ingredientAdded.emit(ingredient)
    if(this.editMode){
      this.slService.updateIngredients(this.editedItemIndex,ingredient)
    }else{
      this.slService.addIngredient(ingredient);   
    }
    this.editMode = false;
    form.reset()
    
    
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }


  handleDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

}
