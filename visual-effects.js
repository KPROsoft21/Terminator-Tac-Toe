/* Terminator Theme Visual Effects */

document.addEventListener('DOMContentLoaded', () => {
    // Add scanning line animation
    const container = document.querySelector('.container');
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    container.appendChild(scanLine);
    
    // Add circuit background overlay
    const circuitOverlay = document.createElement('div');
    circuitOverlay.classList.add('circuit-overlay');
    document.body.appendChild(circuitOverlay);
    
    // Add terminator eye glow effect
    const terminatorEye = document.querySelector('.terminator-eye');
    setInterval(() => {
        terminatorEye.classList.add('pulse');
        setTimeout(() => {
            terminatorEye.classList.remove('pulse');
        }, 1000);
    }, 5000);
    
    // Add cell hover effects
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                cell.classList.add('hover-effect');
            }
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.classList.remove('hover-effect');
        });
    });
    
    // Add glitch text effect to AI messages
    const aiMessage = document.querySelector('.ai-message');
    
    function applyGlitchEffect() {
        aiMessage.classList.add('glitch-text');
        setTimeout(() => {
            aiMessage.classList.remove('glitch-text');
        }, 2000);
    }
    
    // Apply glitch effect periodically
    setInterval(applyGlitchEffect, 10000);
    
    // Add visual feedback for player and AI moves
    const gameBoard = document.querySelector('.game-board');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const addedNode = mutation.addedNodes[0];
                if (addedNode.classList.contains('cell')) {
                    addedNode.addEventListener('mouseenter', () => {
                        if (!addedNode.classList.contains('x') && !addedNode.classList.contains('o')) {
                            addedNode.classList.add('hover-effect');
                        }
                    });
                    
                    addedNode.addEventListener('mouseleave', () => {
                        addedNode.classList.remove('hover-effect');
                    });
                }
            }
        });
    });
    
    observer.observe(gameBoard, { childList: true });
});
