document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mocaccinoCalcBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    // ======== القيم من المستخدم ========
    const weaponPrice = Number(document.getElementById("weaponPrice")?.value || 0);
    const mocaccinoPrice = Number(document.getElementById("mochaPrice")?.value || 0);
    const orgBoost = Number(document.getElementById("orgBoost")?.value || 0);
    const poiRegion = Number(document.getElementById("poiRegion")?.value || 0);
    const rank = Number(document.getElementById("rank")?.value || 1); // No Rank = 1
    const bunker = document.getElementById("bunker")?.checked ? 0.8 : 1;
    const clothing = document.getElementById("clothing")?.checked ? 1 : 0.9;
    const nativeBonus = document.getElementById("native")?.checked ? 1.2 : 1;
    const badge = document.getElementById("badge")?.checked ? 1.2 : 1;
    const targetDamage = Number(document.getElementById("targetDamage")?.value || 0);

    // ======== إعداد الضربات لكل Mocaccino ========
    const energies = [100, 95, 90, 85];
    const weaponDamage = 3000; // ثابت لكل ضربة

    // ======== حساب كل ضربة على حدة ========
    let accumulatedDamage = 0;
    let hitsCount = 0;

    while (accumulatedDamage < targetDamage) {
      for (let energy of energies) {
        let hitDamage = weaponDamage * (energy / 100);
        hitDamage *= rank * (1 + orgBoost / 100) * (1 + poiRegion / 100) * bunker * clothing * nativeBonus * badge;

        accumulatedDamage += hitDamage;
        hitsCount++;

        if (accumulatedDamage >= targetDamage) break;
      }
    }

    // ======== حساب Mocaccino Needed ========
    const mocaccinoNeeded = hitsCount / energies.length; // بدون تقريب

    // ======== Weapons Needed ========
    const weaponsNeeded = hitsCount / 200; // بدون تقريب، ممكن تستخدم Math.ceil إذا عايز عدد أسلحة كامل

    // ======== حساب التكلفة ========
    const weaponsCost = weaponsNeeded * weaponPrice;
    const mocaccinoCost = mocaccinoNeeded * mocaccinoPrice;
    const totalCost = weaponsCost + mocaccinoCost;

    // ======== حساب الضرر لكل Mocaccino مع modifiers ========
    const baseDamage = energies.reduce((sum, e) => sum + weaponDamage * (e / 100), 0);
    const totalDamagePerMocaccino = baseDamage * rank * (1 + orgBoost / 100) * (1 + poiRegion / 100) * bunker * clothing * nativeBonus * badge;

    // ======== عرض النتائج ========
    const resultText = document.getElementById("mocaccinoResultText");
    if (resultText) {
      resultText.innerHTML =
        `Damage per Mocaccino : ${Math.round(totalDamagePerMocaccino)}<br>` +
        `Mocaccino Needed: ${mocaccinoNeeded.toFixed(2)}<br>` +
        `Total Hits: ${hitsCount}<br>` +
        `Weapons Needed: ${weaponsNeeded.toFixed(2)}<br>` +
        `Total Cost: ${totalCost.toFixed(2)} Gold`;
    }
  });
});
