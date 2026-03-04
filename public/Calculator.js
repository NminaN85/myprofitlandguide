// =======================
// PRODUCTS & INGREDIENTS
// =======================
const products = {
    wheat: { workHours: 0.6, licenceUses: 1000, ingredients: { water: 0.15, electricity: 0.03 } },
    corn: { workHours: 0.6, licenceUses: 1000, ingredients: { water: 0.15, electricity: 0.03 } },
    bread: { workHours: 0.5, licenceUses: 600, ingredients: { WheatFlour: 0.1, water: 0.1, electricity: 0.05 } },
    coffeebeans: { workHours: 1.4, licenceUses: 100, ingredients: { water: 0.083, electricity: 0.2 } },
    cotton: { workHours: 4, licenceUses: 350, ingredients: { water: 1.5, electricity: 0.3 } },
    coffee: { workHours: 0.4, licenceUses: 2500, ingredients: { coffeebeans: 0.04, water: 0.07, electricity: 0.07 } },
    milkjug: { workHours: 0.3, licenceUses: 1800, ingredients: { Porcessedmilk: 0.2, water: 0.07, electricity: 0.07 } },
    mocaccino: { workHours: 1, licenceUses: 1000, ingredients: { Chocco: 0.5, Porcessedmilk: 0.1, coffeebeans: 0.04, water: 0.07, electricity: 0.07 } },
    herbs: { workHours: 0.6, licenceUses: 500, ingredients: { water: 0.07, electricity: 0.05 } },
    vegetables: { workHours: 0.6, licenceUses: 1000, ingredients: { water: 0.15, electricity: 0.03 } },
    grapes: { workHours: 0.5, licenceUses: 450, ingredients: { water: 0.06, electricity: 0.02 } },
    wood: { workHours: 1, licenceUses: 500, ingredients: { water: 0.07, electricity: 0.14 } },
    weapons: { workHours: 2.9, licenceUses: 25, ingredients: { water: 0.6, electricity: 2.5, steel: 2, wood: 0.6 } },
    steel: { workHours: 0.7, licenceUses: 450, ingredients: { coal: 0.4, iron: 0.4, electricity: 0.45, water: 0.1 } }
};

// =======================
// DOM & EVENTS
// =======================
document.addEventListener("DOMContentLoaded", () => {

    // Weekly boost toggle
    const weeklyBoostCheck = document.getElementById("weeklyBoostCheck");
    if (weeklyBoostCheck) {
        weeklyBoostCheck.addEventListener("change", function () {
            const boostInputs = document.getElementById("boostInputs");
            if (boostInputs) boostInputs.style.display = this.checked ? "block" : "none";
        });
    }

    // Upgrade toggle behavior
    document.querySelectorAll('input[name="upgrade"]').forEach(radio => {
        radio.addEventListener('click', function () {
            if (this.wasChecked) this.checked = false;
            document.querySelectorAll('input[name="upgrade"]').forEach(r => r.wasChecked = r.checked);
        });
    });

    // Calculate button
    const btn = document.getElementById("calcBtn");
    if (btn) {
        btn.addEventListener("click", () => {
            const resultText = document.getElementById("resultText");
            if (resultText) resultText.textContent = calculateCostForPage();
        });
    }
});

// =======================
// CALCULATION FUNCTION
// =======================
function calculateCostForPage() {

    const checkedProducts = Array.from(
        document.querySelectorAll(".productCheck:checked")
    ).map(el => el.value);

    if (checkedProducts.length === 0) return "Please select at least one product!";

    // ===== Inputs =====
    const HourlyWage = parseFloat(document.getElementById("HourlyWage")?.value) || 0;
    const WageTax = parseFloat(document.getElementById("WageTax")?.value) || 0;
    const LicenceForm = parseFloat(document.getElementById("LicenceForm")?.value) || 0;
    const LocalGold = parseFloat(document.getElementById("LocalGold")?.value) || 1;
    const EuroGold = parseFloat(document.getElementById("EuroGold")?.value) || 0;
    const upgradeLevel = parseInt(document.querySelector('input[name="upgrade"]:checked')?.value) || 0;
    const weeklyBoost = document.getElementById("weeklyBoostCheck")?.checked || false;
    const BoostCost = parseFloat(document.getElementById("BoostCost")?.value) || 0;
    const WeeklyProduction = parseFloat(document.getElementById("WeeklyProduction")?.value) || 0;
    const productionMultiplier = 1 + (upgradeLevel * 0.10);

    // ===== Cost map for dynamic ingredients =====
    const ingredientInputs = [
        "water", "electricity", "WheatFlour", "coffeebeans",
        "Chocco", "Porcessedmilk", "wood", "steel",
        "coal", "iron"
    ];

    let costMap = {};
    ingredientInputs.forEach(name => {
        costMap[name] = parseFloat(document.getElementById(name + "Cost")?.value) || 0;
    });

    // ===== Calculate =====
    let results = [];

    checkedProducts.forEach(key => {
        const product = products[key];
        if (!product) return;

        const producedQuantity = 1 * productionMultiplier;

        // Wage
        const netHourlyWage = product.workHours * HourlyWage * (1 + WageTax / 100);
        const totalWage = netHourlyWage / LocalGold;

        // License
        const LicenceGoldPerProduct = (LicenceForm / product.licenceUses) + (EuroGold / product.licenceUses);
        const totalLicence = LicenceGoldPerProduct * producedQuantity;

        // Ingredients (dynamic)
        let totalIngredients = 0;
        for (const ingredient in product.ingredients) {
            const quantity = product.ingredients[ingredient];
            const cost = costMap[ingredient] || 0;
            totalIngredients += cost * quantity * producedQuantity;
        }

        const totalCost = totalWage + totalLicence + totalIngredients;

        // Weekly boost
        let finalCost;
        if (weeklyBoost) {
            if (WeeklyProduction <= 0) {
                results.push(`${key}: Enter weekly production!`);
                return;
            }
            const effectiveQuantity = WeeklyProduction * 0.8;
            const costFor80Percent = totalCost * (effectiveQuantity / producedQuantity);
            const totalWithBoost = costFor80Percent + BoostCost;
            finalCost = totalWithBoost / WeeklyProduction;
            results.push(`${key}: ${finalCost.toFixed(4)} Gold (with boost)`);
        } else {
            finalCost = totalCost / producedQuantity;
            results.push(`${key}: ${finalCost.toFixed(4)} Gold`);
        }
    });

    return results.join("\n");
}
