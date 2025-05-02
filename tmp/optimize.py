import json
import sys
import time
from typing import Dict, List, Union, Optional, MutableSet
import math
import random
import csv
# --- Type Definitions ---

# Use total=False as many fields can be missing depending on the item/recipe type
# and specific mods. Accessing non-existent keys will still cause runtime errors
# if not handled, but this reflects the flexible nature of the data dump.


class IngredientData(dict):
    name: str
    amount: float  # Consistently use float after loading/validation
    type: str  # "item" or "fluid" usually
    # catalyst_amount: float # Less common in standard dumps

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = self['name']
        self.amount = float(self['amount'])
        self.type = self['type']


class ProductData(dict):
    name: str
    amount: float  # Expected average amount (calculated if min/max present)
    amount_min: float
    amount_max: float
    probability: float
    type: str  # "item" or "fluid" usually

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = self['name']
        self.amount = float(self['amount']) if 'amount' in self else None
        self.amount_min = float(
            self['amount_min']) if 'amount_min' in self else None
        self.amount_max = float(
            self['amount_max']) if 'amount_max' in self else None
        self.probability = float(
            self['probability']) if 'probability' in self else None
        self.type = self['type']

    def get_amount(self) -> float:
        """Calculate the expected amount based on min/max or probability."""
        if 'amount' in self:
            return self['amount'] * self.get('probability', 1.0)
        elif 'amount_min' in self and 'amount_max' in self:
            return ((self['amount_min'] + self['amount_max']) / 2)*self.get('probability', 1.0)
        else:
            raise ValueError(
                "Invalid product data: missing amount information")


class RecipeData(dict):
    # Required fields (make these non-optional if always present)
    name: str
    energy: float  # Store as float after loading/validation
    # Use Dict initially, refine after validation
    ingredients: List[Union[IngredientData, Dict]]
    # Use Dict initially, refine after validation
    products: List[Union[ProductData, Dict]]
    category: Optional[str]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.name = self['name']
        self.energy = self['energy']
        self.category = self['category']

        # Convert ingredients and products to the correct types
        self.ingredients = [IngredientData(
            **i) if isinstance(i, dict) else i for i in self['ingredients']]
        self.products = [ProductData(
            **p) if isinstance(p, dict) else p for p in self['products']]
        # Ensure energy is a float
        self.energy = float(self.energy)

    def get_products(self):
        """Calculate and return the products of the recipe."""
        products = []
        for product in self.products:
            name = product['name']
            amount = product.get_amount() / self.energy
            products.append({"name": name, "rate": amount})
        return products

    def get_rates(self) -> Dict[str, float]:
        """Calculate and return the rates of ingredients and products."""
        rates = {}
        for ingredient in self.ingredients:
            name = ingredient.name
            rate = ingredient.amount / self.energy
            rates[name] = rates.get(name, 0) - rate
        for product in self.products:
            name = product.name
            rate = product.get_amount() / self.energy
            rates[name] = rates.get(name, 0) + rate
        return rates


class EntityData():
    name: str
    crafting_speed: float | None
    crafting_categories: List[str] | None
    resource_category: str | None
    mineable_products: List[ProductData] | None

    def __init__(self, **kwargs):
        self.name = kwargs.get('name')

        kw_crafting_speed = kwargs.get('get_crafting_speed', None)
        if kw_crafting_speed is not None:
            self.crafting_speed = kw_crafting_speed[0]
        else:
            self.crafting_speed = None

        kw_crafting_categories = kwargs.get('crafting_categories', None)
        if kw_crafting_categories is not None:
            self.crafting_categories = [
                key for key in kw_crafting_categories.keys() if kw_crafting_categories[key]]
        else:
            self.crafting_categories = None

        kw_resource_category = kwargs.get('resource_category', None)
        if kw_resource_category is not None:
            self.resource_category = kw_resource_category
        else:
            self.resource_category = None

        kw_mineable_properties = kwargs.get('mineable_properties', None)
        if kw_mineable_properties is not None:
            self.mineable_products = [ProductData(
                **product) for product in kw_mineable_properties.get('products', [])]
        else:
            self.mineable_products = None


def load_recipes(path: str) -> Dict[str, RecipeData]:
    print(f"📥 Loading recipes from {path}...")
    try:
        with open(path, "r") as f:
            recipes = json.load(f)
        print(f"✔️  Loaded {len(recipes)} total recipes")
        recipes_map = {r['name']: RecipeData(
            **r) for r in recipes if 'name' in r}
        return recipes_map
    except FileNotFoundError:
        print(f"❌ ERROR: Recipe file not found at {path}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"❌ ERROR: Could not decode JSON from {path}")
        sys.exit(1)


def load_entities(path: str) -> Dict[str, EntityData]:
    print(f"📥 Loading entities from {path}...")
    try:
        with open(path, "r") as f:
            entities = json.load(f)
        print(f"✔️  Loaded {len(entities)} total entities")
        entities_map = {e['name']: EntityData(
            **e) for e in entities if 'name' in e}
        return entities_map
    except FileNotFoundError:
        print(f"❌ ERROR: Entity file not found at {path}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"❌ ERROR: Could not decode JSON from {path}")
        sys.exit(1)


def simple_production_solver(recipes, targets):
    # Initialize
    inventory = {}
    recipe_usage = {}
    for item, rate in targets.items():
        inventory[item] = -rate  # deficits are negative

    while True:
        # Find the most negative item
        needed = [(item, amt)
                  for item, amt in inventory.items() if amt < -1e-6]
        if not needed:
            break  # All deficits covered

        # Sort by how bad the deficit is
        needed.sort(key=lambda x: x[1])
        item, deficit = needed[0]

        # Find recipes that produce this
        candidates = [r for r in recipes if any(
            p['name'] == item for p in r.get_products())]
        if not candidates:
            raise ValueError(f"No recipe produces {item}")

        # Pick the "best" recipe: least waste, best efficiency
        def score(recipe):
            product_amount = sum(p['amount']
                                 for p in recipe.get_products() if p['name'] == item)
            waste = sum(p['amount']
                        for p in recipe.get_products() if p['name'] != item)
            return (waste, -product_amount)  # lower waste, higher yield

        best = sorted(candidates, key=score)[0]

        # How much does this recipe produce per use?
        output_per = sum(p['amount']
                         for p in best.get_products() if p['name'] == item)
        multiplier = math.ceil(abs(deficit) / output_per)

        # Apply the recipe
        for p in best.get_products():
            if p['name'] not in inventory:
                inventory[p['name']] = 0.0
            inventory[p['name']] += p['amount'] * multiplier
        for ing in best['ingredients']:
            if ing['name'] not in inventory:
                inventory[ing['name']] = 0.0
            amount = ing['amount'] * multiplier
            if amount > 1e100:  # Adjust this if needed
                print(
                    f"⚠️ Ingredient amount too large: {ing['name']} x {amount} (multiplier = {multiplier}) from {best['name']}")
                raise OverflowError(
                    "Suspiciously large value; check recipe graph.")
            inventory[ing['name']] -= ing['amount'] * multiplier

        if best['name'] not in recipe_usage:
            recipe_usage[best['name']] = 0.0
        recipe_usage[best['name']] += multiplier

    return recipe_usage, dict(inventory)


def get_plan_rates(recipes_map, recipe_plan):
    rates = {'space-science-pack': -15.0}
    for recipe, multiplier in recipe_plan.items():
        for item, rate in recipes_map[recipe].get_rates().items():
            if item not in rates:
                rates[item] = 0.0
            rates[item] += rate*multiplier
    return rates


def get_plan_score(recipes_map, recipe_plan):
    score = 0.0
    for rate in get_plan_rates(recipes_map, recipe_plan).values():
        score += abs(rate)
    return score


def get_plan_deficits(recipes_map, recipe_plan, resources, blocked_items):
    deficits = []

    for item, rate in get_plan_rates(recipes_map, recipe_plan).items():
        if rate < 0.0 and resources.isdisjoint([item]) and blocked_items.isdisjoint([item]):
            deficits.append((item, rate))
    return deficits


def find_best_recipe_for_item(recipes_map, recipes_by_product, recipes_to_ignore, recipe_plan, item: str, target_rate: float) -> Optional[tuple[str, float]]:
    """
    Finds the recipe with the least number of ingredients to produce the given item
    and calculates the multiplier needed to meet the target rate.

    Args:
        item (str): The name of the item to produce.
        target_rate (float): The desired production rate of the item.

    Returns:
        Optional[tuple[str, float]]: A tuple containing the recipe name and the multiplier,
                                        or None if no recipe produces the item.
    """
    if item not in recipes_by_product:
        print(f"No recipe found for {item}")
        return None

    candidates = []
    for recipe_name in recipes_by_product[item]:
        if recipes_to_ignore.isdisjoint([recipe_name]) and recipe_name not in recipe_plan:
            candidates.append(recipes_map[recipe_name])

    if not candidates:
        return None  # No recipe produces the item

    # Sort candidates by the number of ingredients (ascending)
    candidates.sort(key=lambda r: len(r.ingredients))

    # Select the best recipe (most number of ingredients)
    best_recipe = candidates[-1]

    # Calculate the multiplier to meet the target rate
    output_rate = sum(
        product.get_amount() / best_recipe.energy
        for product in best_recipe.products if product.name == item
    )
    multiplier = target_rate / output_rate

    return best_recipe.name, multiplier


if __name__ == "__main__":
    recipes_map = load_recipes("../src/assets/recipe.json")
    entities_map = load_entities("./entity.json")

    category_to_crafters: Dict[str, Dict[str, float]] = {}
    resources: MutableSet[str] = set()

    for entity in entities_map.values():
        if entity.resource_category is not None:
            recipes_map[f"{entity.name}_{entity.resource_category}"] = RecipeData(
                name=f"{entity.name}_{entity.resource_category}",
                energy=1,
                ingredients=[],
                products=entity.mineable_products,
                category=f"{entity.resource_category}-pseudorecipe",
            )
            for product in entity.mineable_products:
                resources.add(product.name)
        if entity.crafting_categories is not None:
            for category in entity.crafting_categories:
                if category not in category_to_crafters:
                    category_to_crafters[category] = {}
                category_to_crafters[category][entity.name] = entity.crafting_speed

    recipes_to_ignore: MutableSet[str] = set()
    recipes_by_ingredient: Dict[str, List[str]] = {}
    recipes_by_product: Dict[str, List[str]] = {}

    for name, recipe in recipes_map.items():
        for ingredient in recipe.ingredients:
            if recipes_by_ingredient.get(ingredient.name) is None:
                recipes_by_ingredient[ingredient.name] = []
            recipes_by_ingredient[ingredient.name].append(recipe.name)
        for product in recipe.products:
            if recipes_by_product.get(product.name) is None:
                recipes_by_product[product.name] = []
            recipes_by_product[product.name].append(recipe.name)

    # Find pairs of recipes where all products of one are ingredients of the other
    # visited_recipes: Dict[str, Dict[str, bool]] = {}

    start_time = time.time()

    print("Checking redundant recipes...")
    recipes = list(recipes_map.values())
    recipe_products = {recipe.name: {
        product.name for product in recipe.products} for recipe in recipes}
    recipe_ingredients = {recipe.name: {
        ingredient.name for ingredient in recipe.ingredients} for recipe in recipes}

    for recipe_a_index, recipe_a in enumerate(recipes[:-1]):
        product_names_a = recipe_products[recipe_a.name]
        ingredient_names_a = recipe_ingredients[recipe_a.name]

        for recipe_b in recipes[recipe_a_index+1:]:
            product_names_b = recipe_products[recipe_b.name]
            ingredient_names_b = recipe_ingredients[recipe_b.name]

            if product_names_a == ingredient_names_b and product_names_b == ingredient_names_a:
                recipes_to_ignore.add(recipe_a.name)
                recipes_to_ignore.add(recipe_b.name)

    print("Finished! Now making a recipe plan.")

    recipe_plan: Dict[str, float] = {}
    blocked_items: MutableSet[str] = set()

    start_time = time.time()

    while len(get_plan_deficits(recipes_map, recipe_plan, resources, blocked_items)) > 0:
        if time.time() - start_time > 10:
            print('Breaking for time')
            break
        for item, rate in get_plan_deficits(recipes_map, recipe_plan, resources, blocked_items):
            outcome = find_best_recipe_for_item(
                recipes_map, recipes_by_product, recipes_to_ignore, recipe_plan, item, -1.0*rate)
            if (outcome is None):
                blocked_items.add(item)
            else:
                recipe_name, multi = outcome
                recipe_plan[recipe_name] = multi
                print(f"added {recipe_name}")

    start_time = time.time()
    log_time = start_time
    current_score = get_plan_score(recipes_map, recipe_plan)
    last_log_score = current_score

    while (time.time() - start_time < 80):
        if time.time() - log_time >= 2:
            print(f"{last_log_score} --> {current_score}")
            log_time = time.time()
            last_log_score = current_score

        new_plan = {}
        for recipe, multi in recipe_plan.items():
            if recipe != 'space-science-pack':
                new_plan[recipe] = multi * (1 + (random.random()-0.5)/2)
            else:
                new_plan[recipe] = multi
        new_score = get_plan_score(recipes_map, new_plan)
        if new_score < current_score:
            recipe_plan = new_plan
            current_score = new_score

    # Dump recipe_plan to a CSV file
    with open("./recipe_plan.csv", "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Recipe", "Multiplier"])
        for recipe, multiplier in recipe_plan.items():
            writer.writerow([recipe, multiplier])

    # Dump the output of get_plan_rates to a CSV file
    plan_rates = get_plan_rates(recipes_map, recipe_plan)
    with open("./plan_rates.csv", "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Item", "Rate"])
        for item, rate in plan_rates.items():
            writer.writerow([item, rate])
