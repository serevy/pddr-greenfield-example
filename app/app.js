const STORAGE_KEY = "pddr-pocket-garden:bamboo-plot:v1";

const stages = [
  {
    name: "竹の子",
    visual: ["🌱"],
    aria: "植えたばかりの竹の子",
    message: "竹の子を植えました。まずは水をあげてみましょう。"
  },
  {
    name: "水をもらった竹の子",
    visual: ["🌱", "💧"],
    aria: "水をもらった竹の子",
    message: "土がしっとりしました。竹の子はまだ小さいままです。"
  },
  {
    name: "若竹",
    visual: ["🎋"],
    aria: "少し育った若竹",
    message: "少し伸びました。ここから先をどう育てるかは、次の判断です。"
  },
  {
    name: "元気な竹",
    visual: ["🎋", "🎋"],
    aria: "元気に育った竹",
    message: "Phase 1ではここまで。竹林化はスコープ外です。"
  }
];

function initialState() {
  return {
    waterCount: 0,
    plantedAt: new Date().toISOString()
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialState();
    }

    const parsed = JSON.parse(raw);
    const waterCount = Number.isInteger(parsed.waterCount)
      ? Math.max(0, Math.min(parsed.waterCount, stages.length - 1))
      : 0;

    return {
      waterCount,
      plantedAt: typeof parsed.plantedAt === "string"
        ? parsed.plantedAt
        : new Date().toISOString()
    };
  } catch {
    return initialState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render(state) {
  const stageIndex = Math.min(state.waterCount, stages.length - 1);
  const stage = stages[stageIndex];

  document.querySelector("#garden-title").textContent = stage.name;
  const bambooVisual = document.querySelector("#bamboo-visual");
  bambooVisual.dataset.stage = String(stageIndex);
  bambooVisual.setAttribute("aria-label", stage.aria);
  bambooVisual.replaceChildren(...stage.visual.map((glyph) => {
    const span = document.createElement("span");
    span.className = glyph === "💧" ? "watering-drop" : "bamboo-glyph";
    span.textContent = glyph;
    span.setAttribute("aria-hidden", "true");
    return span;
  }));
  document.querySelector("#garden-message").textContent = stage.message;
  document.querySelector("#water-count").textContent = String(state.waterCount);

  const waterButton = document.querySelector("#water-button");
  const isComplete = state.waterCount >= stages.length - 1;
  waterButton.disabled = isComplete;
  waterButton.textContent = isComplete ? "Phase 1 完了 🎋" : "💧 水をやる";
}

let state = loadState();
saveState(state);
render(state);

document.querySelector("#water-button").addEventListener("click", () => {
  if (state.waterCount >= stages.length - 1) {
    return;
  }

  state = {
    ...state,
    waterCount: state.waterCount + 1
  };

  saveState(state);
  render(state);
});

document.querySelector("#reset-button").addEventListener("click", () => {
  state = initialState();
  saveState(state);
  render(state);
});
