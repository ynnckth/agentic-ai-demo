/**
 * Audio engine for playing piano sounds using Web Audio API
 */
class AudioEngine {
  private audioContext: AudioContext | null = null;

  /**
   * Initialize the audio context
   * Must be called after user interaction due to browser autoplay policies
   */
  initialize() {
    if (!this.audioContext) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
  }

  /**
   * Play a sound at the specified frequency
   * @param frequency - The frequency in Hz
   */
  playSound(frequency: number) {
    if (!this.audioContext) {
      this.initialize();
    }

    if (!this.audioContext) {
      console.error('Failed to initialize audio context');
      return;
    }

    const audioContext = this.audioContext;
    const now = audioContext.currentTime;

    // Create a more complex sound using multiple oscillators for harmonics
    const fundamental = audioContext.createOscillator();
    const harmonic1 = audioContext.createOscillator();
    const harmonic2 = audioContext.createOscillator();

    // Create gain nodes for each oscillator
    const fundamentalGain = audioContext.createGain();
    const harmonic1Gain = audioContext.createGain();
    const harmonic2Gain = audioContext.createGain();
    const masterGain = audioContext.createGain();

    // Add a filter for warmth
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1;

    // Connect the audio graph: oscillators -> individual gains -> filter -> master gain -> output
    fundamental.connect(fundamentalGain);
    harmonic1.connect(harmonic1Gain);
    harmonic2.connect(harmonic2Gain);

    fundamentalGain.connect(filter);
    harmonic1Gain.connect(filter);
    harmonic2Gain.connect(filter);

    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    // Configure oscillators with different waveforms and frequencies
    fundamental.type = 'triangle'; // Warmer than sine
    fundamental.frequency.value = frequency;

    harmonic1.type = 'sine';
    harmonic1.frequency.value = frequency * 2; // Second harmonic

    harmonic2.type = 'sine';
    harmonic2.frequency.value = frequency * 3; // Third harmonic

    // Mix the oscillators (fundamental louder, harmonics softer)
    fundamentalGain.gain.value = 0.6;
    harmonic1Gain.gain.value = 0.15;
    harmonic2Gain.gain.value = 0.1;

    // Create a realistic piano envelope (ADSR: Attack, Decay, Sustain, Release)
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.25, now + 0.005); // Very quick attack
    masterGain.gain.exponentialRampToValueAtTime(0.15, now + 0.1); // Quick decay
    masterGain.gain.exponentialRampToValueAtTime(0.08, now + 0.5); // Sustain
    masterGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5); // Longer release

    // Start and stop all oscillators
    const stopTime = now + 1.5;
    fundamental.start(now);
    harmonic1.start(now);
    harmonic2.start(now);

    fundamental.stop(stopTime);
    harmonic1.stop(stopTime);
    harmonic2.stop(stopTime);
  }

  /**
   * Close the audio context and release resources
   */
  close() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Export a singleton instance
export const audioEngine = new AudioEngine();
