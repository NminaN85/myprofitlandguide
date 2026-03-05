const products = {
    wheat: {
        workHours: 0.6,
        licenceUses: 1000,
        ingredients: { water: 0.15, electricity: 0.03 }
    },
    corn: {
        workHours: 0.6,
        licenceUses: 1000,
        ingredients: { water: 0.15, electricity: 0.03 }
    },
    bread: {
        workHours: 0.5,
        licenceUses: 600,
        ingredients: { WheatFlour: 0.1, water: 0.1, electricity: 0.05 }
    },
    coffeebeans: {
        workHours: 1.4,
        licenceUses: 100,
        ingredients: { water: 0.083, electricity: 0.2 }
    },
    cotton: {
        workHours: 4,
        licenceUses: 350,
        ingredients: { water: 1.5, electricity: 0.3 }
    },
    coffee: {
        workHours: 0.4,
        licenceUses: 2500,
        ingredients: { coffeebeans: 0.04, water: 0.07, electricity: 0.07 }
    },
    milkjug: {
        workHours: 0.3,
        licenceUses: 1800,
        ingredients: { Porcessedmilk: 0.2, water: 0.07, electricity: 0.07 }
    },
    mocaccino: {
        workHours: 1,
        licenceUses: 1000,
        ingredients: { Chocco: 0.5, Porcessedmilk: 0.1, coffeebeans: 0.04, water: 0.07, electricity: 0.07 }
    },
    herbs: {
        workHours: 0.6,
        licenceUses: 500,
        ingredients: { water: 0.07, electricity: 0.05 }
    },
    vegetables: {
        workHours: 0.6,
        licenceUses: 1000,
        ingredients: { water: 0.15, electricity: 0.03 }
    },
    grapes: {
        workHours: 0.5,
        licenceUses: 450,
        ingredients: { water: 0.06, electricity: 0.02 }
    },
    wood: {
        workHours: 1,
        licenceUses: 500,
        ingredients: { water: 0.07, electricity: 0.14 }
    },
    weapons: {
        workHours: 2.9,
        licenceUses: 25,
        ingredients: { water: 0.6, electricity: 2.5, steel: 2, wood: 0.6 }
    },
    steel: { 
        workHours: 0.7, 
        licenceUses: 450,
        ingredients: { coal: 0.4, iron: 0.4, electricity: 0.45, water: 0.1 } 
    },
    mansion: { 
        workHours: 150, 
        licenceUses: 5,
        ingredients: { steel: 80, wood: 70, stone: 160 , housewindow: 6, sand: 40, electricity: 50, water: 50 } 
    },
     smallhouse: { 
        workHours: 50, 
        licenceUses: 60,
        ingredients: { steel: 40, wood: 30, stone: 100 , housewindow: 2, sand: 20, electricity: 23, water: 23 } 
    },
   niceappartment: { 
        workHours: 100, 
        licenceUses: 9,
        ingredients: { steel: 60, wood: 50, stone: 130 , housewindow: 4, sand: 30, electricity: 36, water: 36 } 
    },
     houserepaire: { 
        workHours: 2, 
        licenceUses: 200,
        ingredients: { wood: 1, stone: 4 , housewindow: 0.2, sand: 5, electricity: 2, water: 10 } 
    },
    
};

document.addEventListener("DOMContentLoaded", () => {

    const weeklyBoostCheck = document.getElementById("weeklyBoostCheck");
    if (weeklyBoostCheck) {
        weeklyBoostCheck.addEventListener("change", function () {
            const boostInputs = document.getElementById("boostInputs");
            if (boostInputs) {
                boostInputs.style.display = this.checked ? "block" : "none";
            }
        });
    }

    document.querySelectorAll('input[name="upgrade"]').forEach(radio => {
        radio.addEventListener('click', function () {
            if (this.wasChecked) {
                this.checked = false;
            }
            document.querySelectorAll('input[name="upgrade"]').forEach(r => r.wasChecked = r.checked);
        });
    });

    const btn = document.getElementById("calcBtn");
    if (btn) {
        btn.addEventListener("click", () => {
            const resultText = document.getElementById("resultText");
            if (resultText) {
                resultText.textContent = calculateCostForPage();
            }
        });
    }

});

function calculateCostForPage() {

    const checkedProducts = Array.from(
        document.querySelectorAll(".productCheck:checked")
    ).map(el => el.value);

    if (checkedProducts.length === 0)
        return "Please select at least one product!";

    const HourlyWage = parseFloat(document.getElementById("HourlyWage")?.value) || 0;
    const WageTax = parseFloat(document.getElementById("WageTax")?.value) || 0;

    const WaterCost = parseFloat(document.getElementById("WaterCost")?.value) || 0;
    const ElectricityCost = parseFloat(document.getElementById("ElectricityCost")?.value) || 0;
    const WheatFlourCost = parseFloat(document.getElementById("WheatFlourCost")?.value) || 0;
    const CoffeebeansCost = parseFloat(document.getElementById("CoffeebeansCost")?.value) || 0;
    const ProcessedmilkCost = parseFloat(document.getElementById("PorcessedmilkCost")?.value) || 0;
    const ChoccoCost = parseFloat(document.getElementById("ChoccoCost")?.value) || 0;
    const woodCost = parseFloat(document.getElementById("woodCost")?.value) || 0;
    const steelCost = parseFloat(document.getElementById("steelCost")?.value) || 0;
    const coalCost = parseFloat(document.getElementById("coalCost")?.value) || 0;
    const ironCost = parseFloat(document.getElementById("ironCost")?.value) || 0;
    const stoneCost = parseFloat(document.getElementById("stoneCost")?.value) || 0;
    const sandCost = parseFloat(document.getElementById("sandCost")?.value) || 0;
    const housewindowCost = parseFloat(document.getElementById("housewindowCost")?.value) || 0;




    const LicenceForm = parseFloat(document.getElementById("LicenceForm")?.value) || 0;
    const LocalGold = parseFloat(document.getElementById("LocalGold")?.value) || 1;
    const EuroGold = parseFloat(document.getElementById("EuroGold")?.value) || 0;

    const upgradeLevel =
        parseInt(document.querySelector('input[name="upgrade"]:checked')?.value) || 0;

    const weeklyBoost =
        document.getElementById("weeklyBoostCheck")?.checked || false;

    const BoostCost =
        parseFloat(document.getElementById("BoostCost")?.value) || 0;

    const WeeklyProduction =
        parseFloat(document.getElementById("WeeklyProduction")?.value) || 0;

    const productionMultiplier =
        1 + (upgradeLevel * 0.10);

    let results = [];

    checkedProducts.forEach(key => {

        const product = products[key];
        if (!product) return;

        const producedQuantity = 1 * productionMultiplier;

        const netHourlyWage =
            product.workHours * HourlyWage * (1 + WageTax / 100);

        const totalWage =
            netHourlyWage / LocalGold;

        const LicenceGoldPerProduct =
            (LicenceForm / product.licenceUses) +
            (EuroGold / product.licenceUses);

        const totalLicence =
            LicenceGoldPerProduct * producedQuantity;

        // =======================
        // INGREDIENTS (Dynamic)
        // =======================

        const costMap = {
            water: WaterCost,
            electricity: ElectricityCost,
            WheatFlour: WheatFlourCost,
            coffeebeans: CoffeebeansCost,
            Chocco: ChoccoCost,
            Porcessedmilk: ProcessedmilkCost,
            steel: steelCost,
            wood: woodCost,
            coal: coalCost,
            iron: ironCost,
            sand: sandCose,
            stone: stoneCose,
            housewindow: housewindowCost,
        };

        let totalIngredients = 0;

        for (const ingredient in product.ingredients) {
            const quantity = product.ingredients[ingredient];
            const cost = costMap[ingredient] || 0;
            totalIngredients += cost * quantity * producedQuantity;
        }

        let totalCost =
            totalWage +
            totalLicence +
            totalIngredients;

        let finalCost;

        if (weeklyBoost) {

            if (WeeklyProduction <= 0) {
                results.push(`${key}: Enter weekly production!`);
                return;
            }

            const effectiveQuantity =
                WeeklyProduction * 0.8;

            const costFor80Percent =
                totalCost * (effectiveQuantity / producedQuantity);

            const totalWithBoost =
                costFor80Percent + BoostCost;

            finalCost =
                totalWithBoost / WeeklyProduction;

            results.push(`${key}: ${finalCost.toFixed(4)} Gold (with boost)`);

        } else {

            finalCost =
                totalCost / producedQuantity;

            results.push(`${key}: ${finalCost.toFixed(4)} Gold`);
        }

    });

    return results.join("\n");
}
