//companies page //

const companyInfo = {
  "Coffee Plantation": {
    image: "imgs/coffeeplantation.png",
    desc: "  Coffee Plantation is the most important company in MPL, the company produces coffee beans that are used to make coffee and mocaccino..",
    materials: "electrecity, Water",
    products: "Coffee Beans",
    skill: "Gathering"
  },
  "Wood Cutter": {
    image: "imgs/woodcutter.png",
    desc: " Wood is the most widely used raw material. Vital in weapons industries. A safe market in any given country.",
    materials: "water, electricity",
    products: "Wood ",
    skill: "Gathering"
  },
  "Vineyard": {
    image: "imgs/vineyard.png",
    desc: " Grapes Production company produces Grapes. Grapes are used by the Wine Production companies to produce Wine.",
    materials: "Water, Electricity",
    products: "Grapes",
    skill: "Gathering"
  },
  "Cotton Plantation": {
    image: "imgs/cotton.png",
    desc: " Cotton plantation can produce Cotton. Cotton is used by Fabrics Factory to produce Fabrics.",
    materials: "Water, Electricity",
    products: "Cotton",
    skill: "Gathering"
  },
  "Cereal Farm": {
    image: "imgs/cereal.png",
    desc: " Cereal farm can produce Wheat and Corn. Wheat and Corn are used by Mills to produce Wheat Flour or Corn Flour.",
    materials: "Water, Electricity",
    products: "Corn , Wheat",
    skill: "Gathering"
  },
  "Vegetable Farm": {
    image: "imgs/herbs.png",
    desc: " Vegetable Farm gathers vegetables from the fields. Vegetables are used to produce food and feed pigs from the Pig Farm .",
    materials: "Water, Electricity",
    products: "Vegetables",
    skill: "Gathering"
  },
  "Herbs Plantation": {
    image: "imgs/vegetable.png",
    desc: "Can produce Herbs. Herbs are used by the Botanical Factory to produce extracts .",
    materials: "Water, Electricity",
    products: "Herbs",
    skill: "Gathering"
  },
  "Iron Mine": {
    image: "imgs/iron.png",
    desc: "Iron is, besides wood, the most important raw material. It is used by companies that manufacture weapons, houses and means of transportation.",
    materials: "Water, Electricity",
    products: "Iron",
    skill: "Extracting"
  },
  "Stone Quarry": {
    image: "imgs/iron.png",
    desc: "Stone is needed to produce houses.",
    materials: "Water, Electricity",
    products: "Stone",
    skill: "Extracting"
  },
  "Coal Mine": {
    image: "imgs/iron.png",
    desc: "The coal mine produces coal, used by the foundry to produce steel.",
    materials: "Water, Electricity",
    products: "Coal",
    skill: "Extracting"
  },
  "Oil Extraction": {
    image: "imgs/Oil.png",
    desc: "The Oil Extraction can produce Oil. The Oil is used in Refineries.",
    materials: "Water, Electricity",
    products: "Oil",
    skill: "Extracting"
  },
  "Uranium Mine": {
    image: "imgs/uranium.png",
    desc: "Uranium is very rare and is used to build nuclear weapons.",
    materials: "Water, Electricity",
    products: "Uranium",
    skill: "Extracting"
  },
  "Sand Pit": {
    image: "imgs/sand.png",
    desc: "The Sand Pit extracts sand that is needed by the Glass Factory",
    materials: "Water, Electricity",
    products: "Sand",
    skill: "Extracting"
  },
};

// ===== أكورديون الفئات: فتح واحد فقط =====
document.querySelectorAll(".category h2").forEach(cat => {
  cat.addEventListener("click", () => {
    const allCategories = document.querySelectorAll(".category");
    
    allCategories.forEach(c => {
      const items = c.querySelectorAll(".company-item");
      if (c !== cat.parentElement) {
        // قفل كل الفئات التانية
        items.forEach(item => item.style.display = "none");
      }
    });

    // toggle الفئة اللي اتضغط عليها
    const items = cat.parentElement.querySelectorAll(".company-item");
    items.forEach(item => {
      item.style.display = item.style.display === "block" ? "none" : "block";
    });
  });
});

// ===== Popup عند الضغط على الشركة =====
document.querySelectorAll(".company-name").forEach(comp => {
  comp.addEventListener("click", () => {
    const info = companyInfo[comp.textContent];
    if (!info) return;

    document.getElementById("popupImage").src = info.image;
    document.getElementById("popupName").textContent = comp.textContent;
    document.getElementById("popupDesc").textContent = info.desc;
    document.getElementById("popupMaterials").textContent = info.materials;
    document.getElementById("popupProducts").textContent = info.products;
    document.getElementById("popupSkill").textContent = info.skill;

    document.getElementById("companyPopup").style.display = "block";
  });
});

// ===== اغلاق popup =====
document.getElementById("popupClose").addEventListener("click", () => {
  document.getElementById("companyPopup").style.display = "none";
});

// اغلاق popup عند الضغط على الخلفية (اختياري)
window.addEventListener("click", e => {
  const popup = document.getElementById("companyPopup");
  if (e.target === popup) popup.style.display = "none";
});
