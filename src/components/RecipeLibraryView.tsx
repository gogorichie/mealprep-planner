import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash } from '@phosphor-icons/react';
import { Recipe } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

interface RecipeLibraryViewProps {
  recipes: Recipe[];
  onCreateRecipe: () => void;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipeId: string) => void;
}

export function RecipeLibraryView({
  recipes,
  onCreateRecipe,
  onEditRecipe,
  onDeleteRecipe,
}: RecipeLibraryViewProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">No recipes yet</p>
        <Button onClick={onCreateRecipe}>
          <Plus className="mr-2" />
          Create Your First Recipe
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
        </p>
        <Button onClick={onCreateRecipe}>
          <Plus className="mr-2" />
          Add Recipe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-lg leading-tight flex-1">{recipe.name}</h3>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEditRecipe(recipe)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDeleteRecipe(recipe.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Ingredients ({recipe.ingredients.length})
                </p>
                <ul className="space-y-1">
                  {recipe.ingredients.slice(0, 4).map((ingredient) => (
                    <li key={ingredient.id} className="text-sm flex gap-1">
                      <span className="text-muted-foreground">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <li className="text-xs text-muted-foreground italic">
                      +{recipe.ingredients.length - 4} more...
                    </li>
                  )}
                </ul>
              </div>

              {recipe.instructions && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Instructions
                  </p>
                  <p className="text-sm line-clamp-3">{recipe.instructions}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
