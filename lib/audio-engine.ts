// Procedural Web Audio Synth & Custom MP3 Audio Engine
// Supports custom audio file (e.g. public/audio/song.mp3) with automatic procedural fallback

import { siteConfig } from "@/lib/site";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private muted: boolean = false;
  private masterGain: GainNode | null = null;
  private ambientInterval: NodeJS.Timeout | null = null;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();
  private isUsingCustomAudio: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public subscribe(fn: (playing: boolean, muted: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying, this.muted);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.muted));
  }

  public async startMusic(): Promise<void> {
    this.init();
    if (this.isPlaying) return;

    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.notify();

    // 1. Try playing custom audio file if specified (e.g. /audio/song.mp3)
    if (siteConfig.audio && typeof window !== "undefined") {
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio(siteConfig.audio);
          this.audioElement.loop = true;
          this.audioElement.volume = this.muted ? 0 : 0.45;
        }
        await this.audioElement.play();
        this.isUsingCustomAudio = true;
        return;
      } catch (err) {
        // Fallback to procedural synth if file not found or autoplay error
        this.isUsingCustomAudio = false;
      }
    }

    // 2. Procedural Synth Soundscape Fallback
    this.playAmbientDrone();
    this.ambientInterval = setInterval(() => {
      if (this.isPlaying && !this.muted && !this.isUsingCustomAudio) {
        this.playAmbientDrone();
      }
    }, 8000);
  }

  public stopMusic(): void {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.notify();
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    
    // Custom audio element volume
    if (this.audioElement) {
      this.audioElement.volume = this.muted ? 0 : 0.45;
    }

    // Web Audio master gain
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(
        this.muted ? 0 : 0.35,
        this.ctx.currentTime + 0.3
      );
    }
    this.notify();
    return this.muted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.muted;
  }

  // Futuristic Ambient Synth Drone (Cyber Magenta chord progression)
  private playAmbientDrone() {
    if (!this.ctx || !this.masterGain || this.muted) return;
    const t = this.ctx.currentTime;

    const chords = [
      [87.31, 130.81, 174.61, 261.63], // F2, C3, F3, C4
      [116.54, 174.61, 233.08, 349.23], // Bb2, F3, Bb3, F4
      [103.83, 155.56, 207.65, 311.13], // Ab2, Eb3, Ab3, Eb4
      [77.78, 116.54, 155.56, 233.08], // Eb2, Bb2, Eb3, Bb3
    ];
    const chord = chords[Math.floor(Math.random() * chords.length)];

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * (1 + (Math.random() * 0.01 - 0.005)), t + 7.5);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450 + idx * 250, t);
      filter.frequency.exponentialRampToValueAtTime(1400, t + 4);
      filter.frequency.exponentialRampToValueAtTime(350, t + 8);
      filter.Q.setValueAtTime(3, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), t + 3);
      gain.gain.linearRampToValueAtTime(0.001, t + 7.9);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 8);
    });
  }

  // Gateway Enter SFX
  public playGatewaySound() {
    this.init();
    if (!this.ctx || !this.masterGain || this.muted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.6);
    osc.frequency.exponentialRampToValueAtTime(220, t + 1.2);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(2500, t + 0.5);
    filter.frequency.exponentialRampToValueAtTime(600, t + 1.2);
    filter.Q.setValueAtTime(6, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 1.2);
  }

  // UI Hover Micro-Sound
  public playHoverSound() {
    if (!this.ctx || !this.masterGain || this.muted || !this.isPlaying) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.04);

      gain.gain.setValueAtTime(0.015, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // safe
    }
  }

  // UI Click Sound
  public playClickSound() {
    if (!this.ctx || !this.masterGain || this.muted || !this.isPlaying) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.08);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // safe
    }
  }
}

export const audioEngine = new AudioEngine();
