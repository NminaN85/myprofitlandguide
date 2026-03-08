function calculateDamage(){
  const weaponPrice = Number(document.getElementById("weaponPrice").value);
  const mochaPrice = Number(document.getElementById("mochaPrice").value);
  const orgBoost = Number(document.getElementById("orgBoost").value);
  const poiRegion = Number(document.getElementById("poiRegion").value);
  const rank = Number(document.getElementById("rank").value);
  const bunker = document.getElementById("bunker").checked ? 0.8 : 1;
  const clothing = document.getElementById("clothing").checked ? 1 : 0.9;
  const nativeBonus = document.getElementById("native").checked ? 1.1 : 1;
  const badge = document.getElementById("badge").checked ? 1.2 : 1;
  const targetDamage = Number(document.getElementById("targetDamage").value);

  const weaponDamage = 3000;
  const orgBonus = 1 + (orgBoost/100);
  const poiBonus = 1 + (poiRegion/100);

  const energies = [100,95,90,85];
  let mochaDamage = 0;

  for(let energy of energies){
    const hit = (energy * weaponDamage * orgBonus * rank * poiBonus /100) 
                * bunker * clothing * nativeBonus * badge;
    mochaDamage += hit;
  }

  const mochaNeeded = Math.ceil(targetDamage / mochaDamage);
  const totalHits = mochaNeeded * 4;
  const weaponHitCost = weaponPrice / 200;
  const totalCost = (mochaNeeded * mochaPrice) + (totalHits * weaponHitCost);

  document.getElementById("result").innerHTML =
    "Damage per Mocha: " + Math.round(mochaDamage) + "<br>" +
    "Mocha Needed: " + mochaNeeded + "<br>" +
    "Total Hits: " + totalHits + "<br>" +
    "Total Cost: " + totalCost.toFixed(2) + " Gold";
}
