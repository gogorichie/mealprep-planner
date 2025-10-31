export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions?: string;
}

export interface MealSlot {
  recipeId: string | null;
}

export interface DayMeals {
  breakfast: MealSlot;
  lunch: MealSlot;
  dinner: MealSlot;
}

export interface WeekPlan {
  [day: string]: DayMeals;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  checked: boolean;
}
