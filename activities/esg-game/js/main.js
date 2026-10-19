import { storage } from "../../shared/js/storage.js";
import { initActivityI18n } from "../../shared/js/i18n.js";
import "../../shared/js/accessibility.js";
import "../../shared/css/accessibility.css";
import "../../shared/css/language-switcher.css";
import { mountActivityLegalFooter } from "../../shared/js/activity-footer.js";

import { GameEngine } from "./core/GameEngine.js";
import { GameScreen } from "./ui/GameScreen.js";
import { GameHints } from "./ui/GameHints.js";
import { Tutorial } from "./ui/Tutorial.js";

mountActivityLegalFooter();

document.addEventListener("DOMContentLoaded", () => {
  // 初始化游戏
  const engine = new GameEngine();
  engine.startGame();
  const screen = new GameScreen(engine);
  const unlockAudio = () => {
    screen.audio.init();
    screen.audio.audioContext?.resume().catch(() => {});
  };
  document.addEventListener("pointerdown", unlockAudio, { once: true });
  document.addEventListener("keydown", unlockAudio, { once: true });
  window.addEventListener("pagehide", () => {
    screen.audio.audioContext?.close().catch(() => {});
  });

  // 初始化游戏提示
  const hints = new GameHints(engine);

  // 启动新手指引（首次访问）
  let activeTutorial = new Tutorial();
  setTimeout(() => activeTutorial.start(), 1000);

  // English is the default; the switcher keeps the current round untouched.
  initActivityI18n({
    switcher: "[data-lang-switcher-host]",
    onChange: () => {
      screen.refreshLocale();
      hints.refreshLocale();
      activeTutorial.refreshLocale();
    },
  });
  // Static translations also touch the event labels; restore the live values.
  screen.refreshLocale();

  const tools = document.createElement("div");
  tools.className = "game-tools";
  tools.append(
    document.getElementById("audio-btn"),
    document.getElementById("help-btn"),
  );
  document.querySelector(".game-meta").append(tools);

  // 帮助按钮点击重新开始指引
  document.getElementById("help-btn").addEventListener("click", () => {
    storage.removeItem("esg-game-tutorial-completed");
    activeTutorial = new Tutorial();
    activeTutorial.start();
  });

  // 音效按钮
  document.getElementById("audio-btn").addEventListener("click", () => {
    const isEnabled = screen.audio.toggle();
    document.getElementById("audio-btn").textContent = isEnabled ? "🔊" : "🔇";
  });
});
