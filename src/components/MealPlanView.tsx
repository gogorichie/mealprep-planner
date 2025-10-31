import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash } from '@phosphor-icons/react';
import { WeekPlan, Recipe } from '@/lib/types';
import { DAYS, MEAL_TYPES } from '@/lib/helpers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MealPlanViewProps {
  weekPlan: WeekPlan;
  recipes: Recipe[];
  onAddMeal: (day: string, mealType: string, recipeId: string) => void;
  onRemoveMeal: (day: string, mealType: string) => void;
}

export function MealPlanView({ weekPlan, recipes, onAddMeal, onRemoveMeal }: MealPlanViewProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-muted-foreground mb-2">No recipes yet</p>
        <p className="text-sm text-muted-foreground">
          Create some recipes first to start planning your meals
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {DAYS.map((day) => (
        <Card key={day} className="p-4">
          <h3 className="font-medium text-lg mb-4">{day}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MEAL_TYPES.map((mealType) => {
              const recipeId = weekPlan[day]?.[mealType]?.recipeId;
              const recipe = recipeId ? recipes.find((r) => r.id === recipeId) : null;

              return (
                <div key={mealType} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="capitalize">
                      {mealType}
                    </Badge>
                  </div>

                  {recipe ? (
                    <Card className="p-3 bg-secondary border-border">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{recipe.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {recipe.ingredients.length} ingredient
                            {recipe.ingredients.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={() => onRemoveMeal(day, mealType)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    <Select onValueChange={(value) => onAddMeal(day, mealType, value)}>
                      <SelectTrigger className="border-dashed">
                        <SelectValue placeholder="Add meal" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipes.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
