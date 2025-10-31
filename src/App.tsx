import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Book, ShoppingCart } from '@phosphor-icons/react';
import { Recipe, WeekPlan, ShoppingListItem } from '@/lib/types';
import { generateShoppingList, initializeWeekPlan } from '@/lib/helpers';
import { RecipeDialog } from '@/components/RecipeDialog';
import { MealPlanView } from '@/components/MealPlanView';
import { RecipeLibraryView } from '@/components/RecipeLibraryView';
import { ShoppingListView } from '@/components/ShoppingListView';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [recipes, setRecipes] = useKV<Recipe[]>('recipes', []);
  const [weekPlan, setWeekPlan] = useKV<WeekPlan>('weekPlan', initializeWeekPlan());
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>(undefined);

  useEffect(() => {
    const newList = generateShoppingList(weekPlan || initializeWeekPlan(), recipes || []);
    setShoppingList((currentList) => {
      const checkedMap = new Map(currentList.map((item) => [item.id, item.checked]));
      return newList.map((item) => ({
        ...item,
        checked: checkedMap.get(item.id) || false,
      }));
    });
  }, [weekPlan, recipes]);

  const handleSaveRecipe = (recipe: Recipe) => {
    setRecipes((current) => {
      const recipeList = current || [];
      const existingIndex = recipeList.findIndex((r) => r.id === recipe.id);
      if (existingIndex >= 0) {
        const updated = [...recipeList];
        updated[existingIndex] = recipe;
        toast.success('Recipe updated successfully');
        return updated;
      } else {
        toast.success('Recipe created successfully');
        return [...recipeList, recipe];
      }
    });
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes((current) => (current || []).filter((r) => r.id !== recipeId));
    setWeekPlan((current) => {
      const plan = current || initializeWeekPlan();
      const updated = { ...plan };
      Object.keys(updated).forEach((day) => {
        Object.keys(updated[day]).forEach((mealType) => {
          if (updated[day][mealType as keyof typeof updated[typeof day]].recipeId === recipeId) {
            updated[day][mealType as keyof typeof updated[typeof day]].recipeId = null;
          }
        });
      });
      return updated;
    });
    toast.success('Recipe deleted');
  };

  const handleAddMeal = (day: string, mealType: string, recipeId: string) => {
    setWeekPlan((current) => {
      const plan = current || initializeWeekPlan();
      return {
        ...plan,
        [day]: {
          ...plan[day],
          [mealType]: { recipeId },
        },
      };
    });
  };

  const handleRemoveMeal = (day: string, mealType: string) => {
    setWeekPlan((current) => {
      const plan = current || initializeWeekPlan();
      return {
        ...plan,
        [day]: {
          ...plan[day],
          [mealType]: { recipeId: null },
        },
      };
    });
  };

  const handleToggleShoppingItem = (itemId: string) => {
    setShoppingList((current) =>
      (current || []).map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClearCompleted = () => {
    setShoppingList((current) => (current || []).map((item) => ({ ...item, checked: false })));
    toast.success('Cleared completed items');
  };

  const handleCreateRecipe = () => {
    setEditingRecipe(undefined);
    setRecipeDialogOpen(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setRecipeDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Meal Planner</h1>
          <p className="text-muted-foreground mt-2">
            Plan your weekly meals and generate shopping lists
          </p>
        </header>

        <Tabs defaultValue="plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="plan" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Meal Plan</span>
              <span className="sm:hidden">Plan</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="gap-2">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Recipes</span>
              <span className="sm:hidden">Recipes</span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Shopping</span>
              <span className="sm:hidden">List</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-4">
            <MealPlanView
              weekPlan={weekPlan || initializeWeekPlan()}
              recipes={recipes || []}
              onAddMeal={handleAddMeal}
              onRemoveMeal={handleRemoveMeal}
            />
          </TabsContent>

          <TabsContent value="recipes" className="space-y-4">
            <RecipeLibraryView
              recipes={recipes || []}
              onCreateRecipe={handleCreateRecipe}
              onEditRecipe={handleEditRecipe}
              onDeleteRecipe={handleDeleteRecipe}
            />
          </TabsContent>

          <TabsContent value="shopping" className="space-y-4">
            <ShoppingListView
              items={shoppingList}
              onToggleItem={handleToggleShoppingItem}
              onClearCompleted={handleClearCompleted}
            />
          </TabsContent>
        </Tabs>
      </div>

      <RecipeDialog
        open={recipeDialogOpen}
        onOpenChange={setRecipeDialogOpen}
        onSave={handleSaveRecipe}
        recipe={editingRecipe}
      />

      <Toaster />
    </div>
  );
}

export default App;