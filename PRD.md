# Planning Guide

A weekly meal planner that helps users organize their meals and automatically generates consolidated grocery shopping lists from their planned recipes.

**Experience Qualities**:
1. **Effortless** - Planning meals and managing groceries should feel seamless, with minimal friction between adding meals and getting a shopping list
2. **Organized** - Clear visual structure that makes it easy to see the full week at a glance and understand what needs to be purchased
3. **Practical** - Focused on real-world usability with features like ingredient consolidation and checkbox tracking for shopping

**Complexity Level**: Light Application (multiple features with basic state)
This app manages multiple interconnected features (meal planning, recipes, shopping lists) with persistent state, but doesn't require accounts or advanced backend functionality.

## Essential Features

### Weekly Meal Planning Calendar
- **Functionality**: 7-day grid view where users can assign meals to specific days and meal times (breakfast, lunch, dinner)
- **Purpose**: Provides visual overview of the entire week's meal plan for better organization and variety
- **Trigger**: User clicks on a day/meal slot to add a meal
- **Progression**: Click meal slot → Select existing recipe or create new → Meal appears in calendar → Can edit or remove
- **Success criteria**: Users can view all 7 days, add/remove meals, and see meal names clearly in each slot

### Recipe Management
- **Functionality**: Create, edit, and store recipes with names, ingredients (with quantities), and optional instructions
- **Purpose**: Reusable meal templates that form the foundation for meal planning and grocery generation
- **Trigger**: User clicks "Add Recipe" or edits existing recipe from library
- **Progression**: Click add recipe → Enter recipe name → Add ingredients with quantities → Save → Recipe available for meal planning
- **Success criteria**: Recipes persist between sessions, can be edited, deleted, and quickly added to meal plan

### Automatic Grocery List Generation
- **Functionality**: Analyzes all meals planned for the week and consolidates ingredients into a single shopping list with combined quantities
- **Purpose**: Eliminates manual list-making and ensures nothing is forgotten when shopping
- **Trigger**: Automatically updates when meals are added/removed from the weekly plan
- **Progression**: Add meals to weekly plan → System combines duplicate ingredients → Shopping list updates in real-time → Check off items while shopping
- **Success criteria**: Ingredients are properly combined (e.g., "2 cups milk" + "1 cup milk" = "3 cups milk"), list updates instantly, checkboxes track shopping progress

### Shopping List Management
- **Functionality**: Interactive checklist with ability to mark items as purchased and clear completed items
- **Purpose**: Practical in-store shopping companion that tracks what's been collected
- **Trigger**: User views shopping list tab/section
- **Progression**: View generated list → Check off items while shopping → Option to clear all checked items → Fresh list for next week
- **Success criteria**: Checkboxes are persistent during shopping session, items can be manually added, checked items can be cleared in bulk

## Edge Case Handling

- **No meals planned**: Show empty state with helpful prompt to add first recipe and plan meals
- **Recipe without ingredients**: Allow saving but show warning; won't contribute to shopping list
- **Duplicate ingredients with different units**: Display separately in shopping list (e.g., "2 cups flour" and "100g flour" remain separate)
- **Same recipe multiple times**: Properly multiply ingredient quantities (recipe used 3x means 3x ingredients)
- **Mid-week planning**: Allow users to start planning from current day or plan for future weeks
- **Long ingredient lists**: Scrollable shopping list with clear organization by category or alphabetically

## Design Direction

The design should feel clean, practical, and approachable—like a well-organized kitchen notepad brought to digital life. This is a utility tool that should prioritize clarity and efficiency over decorative elements, with a warm, inviting color palette that feels homey rather than clinical. A minimal interface serves the core purpose best, allowing the content (meals and ingredients) to take center stage.

## Color Selection

Analogous warm palette (oranges to yellows) that evokes the warmth of a home kitchen and cooking.

- **Primary Color**: oklch(0.55 0.15 45) - Warm terracotta orange that communicates warmth, appetite, and home cooking
- **Secondary Colors**: oklch(0.85 0.08 75) - Soft peachy background for cards; oklch(0.95 0.03 85) - Very light cream for page background
- **Accent Color**: oklch(0.45 0.18 35) - Deep burnt orange for CTAs and important actions like "Generate List" buttons
- **Foreground/Background Pairings**:
  - Background (Cream oklch(0.95 0.03 85)): Dark brown text oklch(0.25 0.02 45) - Ratio 8.7:1 ✓
  - Card (Peachy oklch(0.85 0.08 75)): Dark brown text oklch(0.25 0.02 45) - Ratio 6.2:1 ✓
  - Primary (Terracotta oklch(0.55 0.15 45)): White text oklch(1 0 0) - Ratio 5.1:1 ✓
  - Secondary (Light peach oklch(0.92 0.05 75)): Dark brown text oklch(0.25 0.02 45) - Ratio 7.8:1 ✓
  - Accent (Burnt orange oklch(0.45 0.18 35)): White text oklch(1 0 0) - Ratio 6.8:1 ✓
  - Muted (Light tan oklch(0.88 0.04 65)): Medium brown text oklch(0.45 0.03 45) - Ratio 4.9:1 ✓

## Font Selection

Typography should feel friendly and readable, with a modern sans-serif that's clean without being sterile—suggesting approachability and everyday utility.

**Primary Font**: Inter (Google Fonts) - Modern, highly readable, works well at all sizes from ingredient lists to headers

- **Typographic Hierarchy**:
  - H1 (App Title/Page Headers): Inter SemiBold/32px/tight letter spacing (-0.02em)
  - H2 (Day Names, Section Headers): Inter Medium/20px/normal spacing
  - H3 (Meal Names, Recipe Titles): Inter Medium/16px/normal spacing
  - Body (Ingredients, Instructions): Inter Regular/15px/relaxed line height (1.6)
  - Small (Quantities, Labels): Inter Regular/13px/normal spacing
  - Button Text: Inter Medium/14px/slight letter spacing (0.01em)

## Animations

Subtle, functional animations that provide feedback and guide attention without slowing down the workflow—think smooth check-offs and gentle confirmations rather than flashy transitions.

- **Purposeful Meaning**: Quick micro-interactions (checkbox checks, item additions) that confirm actions; smooth transitions when switching between calendar and shopping list views
- **Hierarchy of Movement**: 
  - Primary: Checkbox state changes (immediate, satisfying)
  - Secondary: Card hover states and meal slot interactions
  - Tertiary: Page transitions and list updates

## Component Selection

- **Components**:
  - **Card**: Recipe cards, day containers in weekly calendar, shopping list container
  - **Button**: Add recipe, add to meal plan, clear completed items - using primary variant for main CTAs
  - **Dialog**: Creating/editing recipes with form inputs
  - **Checkbox**: Shopping list items with satisfying check-off interaction
  - **Tabs**: Switch between "Meal Plan", "Recipes", and "Shopping List" views
  - **Input/Textarea**: Recipe name, ingredient entry, quantities, instructions
  - **ScrollArea**: Long shopping lists and ingredient lists
  - **Badge**: Meal type indicators (breakfast/lunch/dinner) with subtle color coding
  - **Separator**: Visual division between days, between sections in shopping list

- **Customizations**:
  - Custom meal slot component (clickable card that shows meal or empty state)
  - Custom ingredient input component with quantity + unit + name fields
  - Grouped shopping list items with category headers

- **States**:
  - Buttons: Hover shows subtle scale (1.02) and shadow increase; active shows slight depression
  - Meal slots: Empty shows dashed border + hover shows primary border; filled shows solid card with hover lift
  - Checkboxes: Smooth check animation with strikethrough on label when checked
  - Inputs: Focus shows primary color ring; error shows destructive color with message

- **Icon Selection**:
  - Plus (add recipe, add ingredient)
  - Calendar (meal planning view)
  - ShoppingCart (shopping list view)
  - Book (recipe library)
  - Trash (delete recipe/meal)
  - Check (completed items)
  - Pencil (edit recipe)
  - X (close dialog, remove item)

- **Spacing**:
  - Container padding: p-6 (24px)
  - Card padding: p-4 (16px)
  - Section gaps: gap-6 (24px)
  - Element gaps: gap-3 (12px)
  - Tight grouping: gap-2 (8px)
  - Button padding: px-4 py-2

- **Mobile**:
  - Meal calendar switches from 7-column grid to vertical list of days (one per row)
  - Tabs become full-width at bottom of screen for thumb access
  - Recipe dialogs become full-screen sheets on mobile
  - Shopping list items get larger touch targets (min 44px)
  - Side-by-side layouts stack vertically (ingredient quantity + name)
  - Reduce container padding to p-4 on mobile screens
