import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[] = [
    // new Ingredient('Apples', 5),
    // new Ingredient('Tomatoes', 10),
  ];
  subscription: Subscription = new Subscription;

  constructor(private slService: ShoppingListService) { }
  

  ngOnInit() {
    this.ingredients =  this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe((ingredient:Ingredient[])=>{
      this.ingredients= ingredient;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index)
  }


}
