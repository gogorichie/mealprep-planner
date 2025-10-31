import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from '@phosphor-icons/react';
import { Recipe, Ingredient } from '@/lib/types';

interface RecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (recipe: Recipe) => void;
  recipe?: Recipe;
}

export function RecipeDialog({ open, onOpenChange, onSave, recipe }: RecipeDialogProps) {
  const [name, setName] = useState(recipe?.name || '');
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients || [{ id: crypto.randomUUID(), name: '', quantity: '', unit: '' }]
  );
  const [instructions, setInstructions] = useState(recipe?.instructions || '');

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: crypto.randomUUID(), name: '', quantity: '', unit: '' }]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(
      ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim()
    );

    const newRecipe: Recipe = {
      id: recipe?.id || crypto.randomUUID(),
      name: name.trim(),
      ingredients: validIngredients,
      instructions: instructions.trim() || undefined,
    };

    onSave(newRecipe);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setIngredients([{ id: crypto.randomUUID(), name: '', quantity: '', unit: '' }]);
    setInstructions('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe ? 'Edit Recipe' : 'Create New Recipe'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipe-name">Recipe Name</Label>
            <Input
              id="recipe-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Spaghetti Carbonara"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Ingredients</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddIngredient}
              >
                <Plus className="mr-2" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, 'quantity', e.target.value)
                      }
                    />
                    <Input
                      placeholder="Unit (cups, tsp, etc)"
                      value={ingredient.unit}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, 'unit', e.target.value)
                      }
                    />
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, 'name', e.target.value)
                      }
                      className="sm:col-span-1"
                    />
                  </div>
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter cooking instructions..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name.trim()}>
              {recipe ? 'Update Recipe' : 'Save Recipe'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
