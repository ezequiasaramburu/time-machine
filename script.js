// Get DOM elements
const terminal = document.getElementById('terminal');
const yearInput = document.getElementById('yearInput');
const travelBtn = document.getElementById('travelBtn');

// Animation settings
const TYPING_SPEED = 50; // milliseconds per character
const BACKSPACE_SPEED = 30; // milliseconds per character
const CURSOR_BLINK_SPEED = 500; // milliseconds

// State variables
let isTyping = false;
let currentText = '';
let cursorInterval;

// Add cursor element
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.className = 'cursor';
terminal.appendChild(cursor);

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .cursor {
        display: inline-block;
        animation: blink 1s infinite;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Function to clear terminal
function clearTerminal() {
    terminal.innerHTML = '';
    terminal.appendChild(cursor);
}

// Function to type text with animation
async function typeText(text) {
    if (isTyping) return;
    isTyping = true;
    
    // Disable input while typing
    yearInput.disabled = true;
    travelBtn.disabled = true;
    
    // Clear previous text
    clearTerminal();
    
    // Type new text
    for (let i = 0; i < text.length; i++) {
        const char = document.createElement('span');
        char.textContent = text[i];
        terminal.insertBefore(char, cursor);
        await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
    }
    
    // Re-enable input after typing
    yearInput.disabled = false;
    travelBtn.disabled = false;
    isTyping = false;
}

// Function to backspace text with animation
async function backspaceText() {
    if (isTyping) return;
    isTyping = true;
    
    // Disable input while backspacing
    yearInput.disabled = true;
    travelBtn.disabled = true;
    
    // Remove characters one by one
    while (terminal.childNodes.length > 1) { // Keep cursor
        const lastChar = terminal.childNodes[terminal.childNodes.length - 2];
        lastChar.remove();
        await new Promise(resolve => setTimeout(resolve, BACKSPACE_SPEED));
    }
    
    // Re-enable input after backspacing
    yearInput.disabled = false;
    travelBtn.disabled = false;
    isTyping = false;
}

// Function to handle year selection
async function handleYearSelection() {
    const year = parseInt(yearInput.value);
    
    if (year < 1900 || year > 2024) {
        await typeText('Please enter a year between 1900 and 2024.');
        return;
    }
    
    const event = historicalEvents[year];
    if (event) {
        await typeText(event);
    } else {
        await typeText(`No significant computer science events found for ${year}.`);
    }
}

// Add event listeners
travelBtn.addEventListener('click', handleYearSelection);
yearInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleYearSelection();
    }
}); 