document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mocaccinoCalcBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const weaponPrice = Number(document.getElementById("weaponPrice")?.value || 0);
    const mocaccinoPrice = Number(document.getElementById("mochaPrice")?.value || 0);
    const orgBoost = Number(document.getElementById("orgBoost")?.value || 0);
    const poiRegion = Number(document.getElementById("poiRegion")?.value || 0);
    const rank = Number(document.getElementById("rank")?.value || 1);
    const bunker = document.getElementById("bunker")?.checked ? 0.8 : 1;
    const clothing = document.getElementById("clothing")?.checked ? 1 : 0.9;
    const nativeBonus = document.getElementById("native")?.checked ? 1.2 : 1;
    const badge = document.getElementById("badge")?.checked ? 1.2 : 1;
    const targetDamage = Number(document.getElementById("targetDamage")?.value || 0);

    const weaponDamage = 3000;
    const orgBonus = 1 + orgBoost / 100;
    const poiBonus = 1 + poiRegion / 100;

    // كل Mocaccino فيها 4 ضربات، الطاقة تبدأ 100 وتنقص 5 لكل ضربة
    const energies = [100, 95, 90, 85];
    let damagePerMocaccino = 0;

    for (let energy of energies) {
      const hitDamage =
        (weaponDamage * (energy / 100) * orgBonus * rank * poiBonus) *
        bunker *
        clothing *
        nativeBonus *
        badge;
      damagePerMocaccino += hitDamage;
    }

    const mocaccinoNeeded = Math.ceil(targetDamage / damagePerMocaccino);
    const totalHits = mocaccinoNeeded * energies.length;
    const weaponHitCost = weaponPrice / 200;
    const totalCost = mocaccinoNeeded * mocaccinoPrice + totalHits * weaponHitCost;

    const resultText = document.getElementById("mocaccinoResultText");
    if (resultText) {
      resultText.innerHTML =
        `Damage per Mocaccino: ${Math.round(damagePerMocaccino)}<br>` +
        `Mocaccino Needed: ${mocaccinoNeeded}<br>` +
        `Total Hits: ${totalHits}<br>` +
        `Total Cost: ${totalCost.toFixed(2)} Gold`;
    }
  });
});
