import { Recipe, WeekPlan, ShoppingListItem } from './types';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'] as const;

export function generateShoppingList(
  weekPlan: WeekPlan,
  recipes: Recipe[]
): ShoppingListItem[] {
  const ingredientMap = new Map<string, { quantity: number; unit: string }>();

  DAYS.forEach((day) => {
    MEAL_TYPES.forEach((mealType) => {
      const recipeId = weekPlan[day]?.[mealType]?.recipeId;
      if (!recipeId) return;

      const recipe = recipes.find((r) => r.id === recipeId);
      if (!recipe) return;

      recipe.ingredients.forEach((ingredient) => {
        const key = `${ingredient.name.toLowerCase()}|${ingredient.unit.toLowerCase()}`;
        const existingQty = ingredientMap.get(key)?.quantity || 0;
        const newQty = parseFloat(ingredient.quantity) || 0;

        ingredientMap.set(key, {
          quantity: existingQty + newQty,
          unit: ingredient.unit,
        });
      });
    });
  });

  return Array.from(ingredientMap.entries()).map(([key, value]) => {
    const [name] = key.split('|');
    return {
      id: key,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      quantity: value.quantity.toString(),
      unit: value.unit,
      checked: false,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function initializeWeekPlan(): WeekPlan {
  const plan: WeekPlan = {};
  DAYS.forEach((day) => {
    plan[day] = {
      breakfast: { recipeId: null },
      lunch: { recipeId: null },
      dinner: { recipeId: null },
    };
  });
  return plan;
}
