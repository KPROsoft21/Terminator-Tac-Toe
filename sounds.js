// Sound effects for Terminator-themed Tic Tac Toe
// Using Web Audio API to generate sounds programmatically

document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    // Sound effect functions
    const sounds = {
        // Player move sound - light mechanical click
        playerMove: () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        },
        
        // AI move sound - heavier mechanical sound with robotic whir
        aiMove: () => {
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator1.type = 'sawtooth';
            oscillator1.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator1.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2);
            
            oscillator2.type = 'square';
            oscillator2.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator2.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator1.start();
            oscillator2.start();
            oscillator1.stop(audioContext.currentTime + 0.3);
            oscillator2.stop(audioContext.currentTime + 0.3);
        },
        
        // Board expansion sound - mechanical transformation with hydraulic elements
        boardExpand: () => {
            // Hydraulic sound
            const hydraulic = audioContext.createOscillator();
            const hydraulicGain = audioContext.createGain();
            
            hydraulic.type = 'sawtooth';
            hydraulic.frequency.setValueAtTime(100, audioContext.currentTime);
            hydraulic.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
            
            hydraulicGain.gain.setValueAtTime(0.3, audioContext.currentTime);
            hydraulicGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            // Mechanical transformation sound
            const mechanical = audioContext.createOscillator();
            const mechanicalGain = audioContext.createGain();
            
            mechanical.type = 'square';
            mechanical.frequency.setValueAtTime(200, audioContext.currentTime);
            mechanical.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.2);
            mechanical.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.4);
            
            mechanicalGain.gain.setValueAtTime(0.2, audioContext.currentTime);
            mechanicalGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
            mechanicalGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            // Metal clank sound
            const clank = audioContext.createOscillator();
            const clankGain = audioContext.createGain();
            
            clank.type = 'triangle';
            clank.frequency.setValueAtTime(600, audioContext.currentTime + 0.4);
            clank.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.5);
            
            clankGain.gain.setValueAtTime(0, audioContext.currentTime);
            clankGain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.4);
            clankGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            hydraulic.connect(hydraulicGain);
            mechanical.connect(mechanicalGain);
            clank.connect(clankGain);
            
            hydraulicGain.connect(audioContext.destination);
            mechanicalGain.connect(audioContext.destination);
            clankGain.connect(audioContext.destination);
            
            hydraulic.start();
            mechanical.start();
            clank.start();
            
            hydraulic.stop(audioContext.currentTime + 0.5);
            mechanical.stop(audioContext.currentTime + 0.5);
            clank.stop(audioContext.currentTime + 0.5);
        },
        
        // Player win sound - resistance victory
        playerWin: () => {
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.2);
            oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.4);
            
            oscillator2.type = 'triangle';
            oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator2.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.2);
            oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.4);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.25, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.4);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator1.start();
            oscillator2.start();
            oscillator1.stop(audioContext.currentTime + 0.6);
            oscillator2.stop(audioContext.currentTime + 0.6);
        },
        
        // AI win sound - Terminator theme motif
        aiWin: () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sawtooth';
            
            // Simplified Terminator theme motif
            oscillator.frequency.setValueAtTime(110, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(110, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(116.54, audioContext.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(110, audioContext.currentTime + 0.7);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.7);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1.0);
        },
        
        // Button click sound
        buttonClick: () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.05);
        }
    };
    
    // Export sounds to global scope
    window.terminatorSounds = sounds;
});
