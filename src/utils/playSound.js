export const playZoomSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // Create two sine wave oscillators for a smooth, airy "hologram" chord
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    
    // A perfect fifth interval creates a very spacey, open, sci-fi atmosphere
    osc1.frequency.value = 440; // Root note
    osc2.frequency.value = 659.25; // Fifth
    
    // A lowpass filter sweeping down creates a "whoosh" or "warp" feeling
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.6);
    
    // Soft, airy volume envelope with a fading tail
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05); // soft fade in
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6); // long fading echo
    
    // Connect everything
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Play the sound for 600ms
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
    
  } catch (err) {
    console.warn("Audio play failed:", err);
  }
};

export const playServoSound = () => {
  try {
    const audio = new Audio('/servo.mp3');
    audio.volume = 0.4; // Slightly reduce volume so it's not ear-piercing
    audio.play();
  } catch(err) {
    console.warn("Servo sound play failed:", err);
  }
};
