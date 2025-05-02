import json
from collections import defaultdict

# Load the recipe data
with open("./recipe.json", "r") as file:
    recipes = json.load(file)

# Data structures
class Node:
    def __init__(self, recipe, multiplier):
        self.recipe = recipe
        self.multiplier = multiplier

class Edge:
    def __init__(self, from_node, to_node, item, rate):
        self.from_node = from_node
        self.to_node = to_node
        self.item = item
        self.rate = rate

def get_product_amount(product):
    if "amount_min" in product and "amount_max" in product:
        return (product["amount_min"] + product["amount_max"]) / 2
    if "amount" in product:
        return product["amount"]
    raise ValueError(f"Product {product['name']} has no amount defined.")

class ProductionGraph:
    def __init__(self, recipes):
        self.recipes = {r["name"]: r for r in recipes}
        self.output_index = defaultdict(list)
        self.nodes = []
        self.edges = []
        self.waste = defaultdict(float)
        self._index_outputs()

    def _index_outputs(self):
        for recipe in self.recipes.values():
            for product in recipe["products"]:
                self.output_index[product["name"]].append(recipe)

    def ignore_recipe(self, recipe):
        return "barrel" in recipe["name"]

    def choose_best_recipe(self, item):
        candidates = [r for r in self.output_index[item] if not self.ignore_recipe(r)]
        candidates.sort(key=lambda r: (len(r["products"]), r["energy"]))
        return candidates[0] if candidates else None

    def build_chain(self, target_item, rate_needed, visited=None, building=None):
        if visited is None:
            visited = {}
        if building is None:
            building = set()

        if target_item in building:
            print(f"[CYCLE DETECTED] Circular dependency on {target_item}")
            self.waste[target_item] += rate_needed
            return None
        building.add(target_item)

        recipe = self.choose_best_recipe(target_item)
        if not recipe:
            self.waste[target_item] += rate_needed
            building.remove(target_item)
            return None

        product = next((p for p in recipe["products"] if p.get("name") == target_item), None)
        if not product:
            self.waste[target_item] += rate_needed
            building.remove(target_item)
            return None

        out_per_sec = (get_product_amount(product) * product.get("probability", 1)) / recipe["energy"]
        multiplier = rate_needed / out_per_sec

        node_id = (recipe["name"], round(multiplier, 3))
        if node_id in visited:
            building.remove(target_item)
            return visited[node_id]

        node = Node(recipe, multiplier)
        self.nodes.append(node)
        visited[node_id] = node

        for ing in recipe["ingredients"]:
            ing_rate = ing["amount"] * multiplier / recipe["energy"]
            child = self.build_chain(ing["name"], ing_rate, visited, building)
            if child:
                self.edges.append(Edge(child, node, ing["name"], ing_rate))

        for prod in recipe["products"]:
            if prod["name"] != target_item:
                rate = get_product_amount(prod) * multiplier / recipe["energy"]
                self.waste[prod["name"]] += rate

        building.remove(target_item)
        return node

    def summarize(self):
        return {
            "nodes": [(n.recipe["name"], round(n.multiplier, 2)) for n in self.nodes],
            "edges": [(e.from_node.recipe["name"], e.to_node.recipe["name"], e.item, round(e.rate, 2)) for e in self.edges],
            "waste": {k: round(v, 2) for k, v in self.waste.items()}
        }

# Run the graph builder for three science packs
graph = ProductionGraph(recipes)
for science_pack in ["automation-science-pack", "py-science-pack-1", "logistic-science-pack"]:
    print(f"\n🔬 Building for: {science_pack} @ 60/sec")
    graph.build_chain(science_pack, 60)

# Print a summarized result
summary = graph.summarize()
print("\n🔧 NODES:")
for node in summary["nodes"][:10]:
    print(f"  - {node[0]} x{node[1]}")

print("\n🔗 EDGES:")
for edge in summary["edges"][:10]:
    print(f"  - {edge[0]} → {edge[1]} [{edge[2]}] @ {edge[3]}/s")

print("\n🗑️ WASTE:")
for waste_item, rate in list(summary["waste"].items())[:10]:
    print(f"  - {waste_item}: {rate}/s")
