document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mocaccinoCalcBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {

      weaponPrice = Number(document.getElementById("weaponPrice")?.value || 0);
    const mocaccinoPrice = Number(document.getElementById("mochaPrice")?.value || 0);
    const orgBoost = Number(document.getElementById("orgBoost")?.value || 0);
    const poiRegion = Number(document.getElementById("poiRegion")?.value || 0);
    const rank = Number(document.getElementById("rank")?.value || 1); // No Rank = 1
    const bunker = document.getElementById("bunker")?.checked ? 0.8 : 1;
    const clothing = document.getElementById("clothing")?.checked ? 1 : 0.9;
    const nativeBonus = document.getElementById("native")?.checked ? 1.2 : 1;
    const badge = document.getElementById("badge")?.checked ? 1.2 : 1;
    const targetDamage = Number(document.getElementById("targetDamage")?.value || 0);


    const energies = [100, 95, 90, 85];
    const weaponDamagePerHit = 3000; // ثابت لكل ضربة
    let baseDamage = 0;

    energies.forEach(energy => {
      baseDamage += weaponDamagePerHit * (energy / 100);
    });
    // baseDamage الآن = 11100


    let totalDamagePerMocaccino = baseDamage;
    totalDamagePerMocaccino *= rank;                 // Rank
    totalDamagePerMocaccino *= 1 + orgBoost / 100;   // Organisation Boost
    totalDamagePerMocaccino *= 1 + poiRegion / 100;  // POI Region
    totalDamagePerMocaccino *= bunker * clothing * nativeBonus * badge;


    const mocaccinoNeeded = Math.ceil(targetDamage / totalDamagePerMocaccino);
    const totalHits = mocaccinoNeeded * energies.length;
    const weaponHitCost = weaponPrice / 200; // تكلفة كل ضربة من السلاح
    const totalCost = mocaccinoNeeded * mocaccinoPrice + totalHits * weaponHitCost;


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
