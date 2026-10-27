// Web Audio API Procedural Luxury Soundscape Engine
// Synthesizes natural ocean surf swell and delicate harmonic chime accents without external audio files

class LuxurySoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private volume: number = 0.35;
  private oceanGain: GainNode | null = null;
  private isOceanRunning: boolean = false;
  private surfInterval: number | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx) {
      if (this.isMuted) {
        this.stopOceanSwell();
      } else {
        this.initContext();
        this.startOceanSwell();
        this.playHarmonicChime(520, 0.15); // soft arrival chime
      }
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.oceanGain && this.ctx) {
      this.oceanGain.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
    }
  }

  // Soft interactive click / selection tick
  public playSubtleTick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(this.volume * 0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.045);
  }

  // Harmonic luxury arrival chime (Pentatonic resonance)
  public playHarmonicChime(freq = 528, duration = 0.8) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Procedural Ocean Waves Swell generator using pink-filtered white noise buffer
  public startOceanSwell() {
    if (this.isOceanRunning || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink noise approximation for warm ocean roar
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate distant ocean surf breaking
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.oceanGain = this.ctx.createGain();
      this.oceanGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.oceanGain);
      this.oceanGain.connect(this.ctx.destination);

      whiteNoise.start();
      this.isOceanRunning = true;

      // Gentle cyclic wave swell modulation
      let swellUp = true;
      const modulate = () => {
        if (!this.oceanGain || !this.ctx || !this.isOceanRunning) return;
        const targetGain = swellUp ? this.volume * 0.22 : this.volume * 0.06;
        const targetFreq = swellUp ? 480 : 220;
        const cycleTime = swellUp ? 4.2 : 5.8;

        this.oceanGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + cycleTime);
        filter.frequency.linearRampToValueAtTime(targetFreq, this.ctx.currentTime + cycleTime);

        swellUp = !swellUp;
      };

      modulate();
      this.surfInterval = window.setInterval(modulate, 5000);
    } catch {
      // Graceful fallback if Web Audio is restricted
    }
  }

  public stopOceanSwell() {
    this.isOceanRunning = false;
    if (this.surfInterval) {
      clearInterval(this.surfInterval);
      this.surfInterval = null;
    }
    if (this.oceanGain && this.ctx) {
      this.oceanGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
    }
  }
}

export const soundEngine = new LuxurySoundEngine();
