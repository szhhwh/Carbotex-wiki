import { gsap } from "gsap";
// 音效管理器
export class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
    this.initialized = false;
  }

  // 初始化音效（使用Web Audio API生成简单音效）
  init() {
    if (this.initialized) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.audioContext = new AudioContext();
    this.initialized = true;
  }

  // 播放点击音效
  playClick() {
    if (!this.enabled || !this.initialized) return;
    this.playTone(800, 0.1, "sine");
  }

  // 播放行动选择音效
  playAction(type) {
    if (!this.enabled || !this.initialized) return;
    const frequencies = {
      expand: 600,
      maintain: 500,
      reduce: 700,
    };
    this.playTone(frequencies[type] || 500, 0.15, "sine");
  }

  // 播放回合结束音效
  playRoundEnd() {
    if (!this.enabled || !this.initialized) return;
    this.playMelody([440, 554, 659], 0.2);
  }

  // 播放事件触发音效
  playEvent(type) {
    if (!this.enabled || !this.initialized) return;
    if (type === "positive") {
      this.playMelody([523, 659, 784], 0.3);
    } else if (type === "negative") {
      this.playMelody([400, 350, 300], 0.3);
    }
  }

  // 播放交易音效
  playTrade() {
    if (!this.enabled || !this.initialized) return;
    this.playTone(880, 0.2, "sine");
  }

  // 播放崩溃警告音效
  playCollapseWarning() {
    if (!this.enabled || !this.initialized) return;
    this.playMelody([300, 250, 200], 0.5);
  }

  // 播放游戏结束音效
  playGameEnd() {
    if (!this.enabled || !this.initialized) return;
    this.playMelody([523, 659, 784, 1047], 0.4);
  }

  // 基础音色播放
  playTone(frequency, duration, type = "sine") {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // 播放旋律
  playMelody(frequencies, duration) {
    frequencies.forEach((freq, index) => {
      setTimeout(
        () => {
          this.playTone(freq, duration, "sine");
        },
        index * duration * 1000,
      );
    });
  }

  // 启用/禁用音效
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// 震动效果
export class ShakeEffect {
  static apply(element, intensity = 5, duration = 0.3) {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(element, {
        x: `random(-${intensity}, ${intensity})`,
        y: `random(-${intensity}, ${intensity})`,
        duration: 0.05,
        repeat: duration * 20,
        yoyo: true,
        ease: "none",
        onComplete: () => {
          gsap.set(element, { x: 0, y: 0 });
        },
      });
    } else {
      element.style.animation = `shake ${duration}s ease-in-out`;
      setTimeout(() => {
        element.style.animation = "";
      }, duration * 1000);
    }
  }
}

// 闪烁效果
export class FlashEffect {
  static apply(element, color = "rgba(16, 185, 129, 0.3)") {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: absolute;
      inset: 0;
      background: ${color};
      pointer-events: none;
      z-index: 10;
      border-radius: inherit;
    `;

    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }
    element.appendChild(overlay);

    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        overlay,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => overlay.remove(),
        },
      );
    } else {
      overlay.style.transition = "opacity 0.5s ease-out";
      requestAnimationFrame(() => {
        overlay.style.opacity = "0";
      });
      setTimeout(() => overlay.remove(), 500);
    }
  }
}

// 脉冲效果
export class PulseEffect {
  static apply(element, scale = 1.1, duration = 0.3) {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(element, {
        scale: scale,
        duration: duration / 2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    } else {
      element.style.transition = `transform ${duration}s ease-in-out`;
      element.style.transform = `scale(${scale})`;
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, duration * 500);
    }
  }
}
