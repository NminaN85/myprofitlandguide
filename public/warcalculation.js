document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mocaccinoCalcBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    // القيم من المستخدم
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

    // الضرر الأساسي لكل ضربة (طاقات مختلفة)
    const energies = [100, 95, 90, 85];
    let baseDamage = 0;

    energies.forEach((energy, index) => {
      let weaponHit = 3000 - index * 150; // 3000, 2850, 2700, 2550
      weaponHit *= (energy / 100); // طاقة
      baseDamage += weaponHit;
    });

    // نطبق البوانص بعد حساب مجموع الضربات
    let totalDamagePerMocaccino = baseDamage;
    totalDamagePerMocaccino *= rank;                 // رانك لو موجود
    totalDamagePerMocaccino *= 1 + orgBoost / 100;   // Organisation Boost
    totalDamagePerMocaccino *= 1 + poiRegion / 100;  // POI Region
    totalDamagePerMocaccino *= bunker * clothing * nativeBonus * badge;

    // عدد Mocaccino المطلوبة
    const mocaccinoNeeded = Math.ceil(targetDamage / totalDamagePerMocaccino);
    const totalHits = mocaccinoNeeded * energies.length;
    const weaponHitCost = weaponPrice / 200;
    const totalCost = mocaccinoNeeded * mocaccinoPrice + totalHits * weaponHitCost;

    // عرض النتائج
    const resultText = document.getElementById("mocaccinoResultText");
    if (resultText) {
      resultText.innerHTML =
        `Base Damage (4 hits): ${Math.round(baseDamage)}<br>` +
        `Damage per Mocaccino (with modifiers): ${Math.round(totalDamagePerMocaccino)}<br>` +
        `Mocaccino Needed: ${mocaccinoNeeded}<br>` +
        `Total Hits: ${totalHits}<br>` +
        `Total Cost: ${totalCost.toFixed(2)} Gold`;
    }
  });
});
