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

    // ======== حساب Base Damage لكل 4 ضربات ========
    const baseDamage = energies.reduce((sum, e) => sum + weaponDamage * (e / 100), 0); // 11100

    // ======== تطبيق modifiers ========
    const totalDamagePerMocaccino = baseDamage * rank * (1 + orgBoost / 100) * (1 + poiRegion / 100) * bunker * clothing * nativeBonus * badge;

    // ======== Mocaccino Needed ========
    const mocaccinoNeeded = Math.ceil(targetDamage / totalDamagePerMocaccino);

    // ======== Total Hits الفعلية ========
    const totalHits = mocaccinoNeeded * energies.length;

    // ======== Weapons Needed ========
    const weaponsNeeded = Math.ceil(totalHits / 200);

    // ======== حساب التكلفة ========
    const weaponsCost = weaponsNeeded * weaponPrice;
    const mocaccinoCost = mocaccinoNeeded * mocaccinoPrice;
    const totalCost = weaponsCost + mocaccinoCost;

    // ======== عرض النتائج ========
    const resultText = document.getElementById("mocaccinoResultText");
    if (resultText) {
      resultText.innerHTML =
        `Base Damage (4 hits): ${Math.round(baseDamage)}<br>` +
        `Damage per Mocaccino (with modifiers): ${Math.round(totalDamagePerMocaccino)}<br>` +
        `Mocaccino Needed: ${mocaccinoNeeded}<br>` +
        `Total Hits: ${totalHits}<br>` +
        `Weapons Needed: ${weaponsNeeded}<br>` +
        `Total Cost: ${totalCost.toFixed(2)} Gold`;
    }
  });
});
