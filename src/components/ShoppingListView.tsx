import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ShoppingListItem } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

interface ShoppingListViewProps {
  items: ShoppingListItem[];
  onToggleItem: (itemId: string) => void;
  onClearCompleted: () => void;
}

export function ShoppingListView({
  items,
  onToggleItem,
  onClearCompleted,
}: ShoppingListViewProps) {
  const checkedCount = items.filter((item) => item.checked).length;
  const hasCheckedItems = checkedCount > 0;

  if (items.length === 0) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg text-muted-foreground mb-2">No items in shopping list</p>
          <p className="text-sm text-muted-foreground">
            Add meals to your weekly plan to generate a shopping list
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-lg">Shopping List</h3>
            <p className="text-sm text-muted-foreground">
              {items.length} item{items.length !== 1 ? 's' : ''} · {checkedCount} checked
            </p>
          </div>
          {hasCheckedItems && (
            <Button variant="outline" size="sm" onClick={onClearCompleted}>
              Clear Completed
            </Button>
          )}
        </div>

        <Separator className="mb-4" />

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors"
            >
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => onToggleItem(item.id)}
                className="mt-0.5"
              />
              <label
                htmlFor={item.id}
                className="flex-1 cursor-pointer select-none"
              >
                <div className={item.checked ? 'line-through text-muted-foreground' : ''}>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground ml-2 text-sm">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
