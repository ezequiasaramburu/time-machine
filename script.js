// Get DOM elements
const terminal = document.getElementById('terminal');
const yearInput = document.getElementById('yearInput');
const travelBtn = document.getElementById('travelBtn');
const nextEventBtn = document.getElementById('nextEventBtn');

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
    
    // Disable input and buttons while typing
    yearInput.disabled = true;
    travelBtn.disabled = true;
    nextEventBtn.disabled = true;
    
    // Clear previous text
    clearTerminal();
    
    // Add glitch effect
    terminal.classList.add('glitch');
    
    // Create temporary scrambled text
    const scrambledText = text.split('').map(char => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    
    // Add scrambled text
    const scrambledSpan = document.createElement('span');
    scrambledSpan.textContent = scrambledText;
    terminal.insertBefore(scrambledSpan, cursor);
    
    // Wait for glitch effect
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove glitch effect and scrambled text
    terminal.classList.remove('glitch');
    scrambledSpan.remove();
    
    // Type new text
    for (let i = 0; i < text.length; i++) {
        const char = document.createElement('span');
        char.textContent = text[i];
        terminal.insertBefore(char, cursor);
        await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
    }
    
    // Re-enable input and buttons after typing
    yearInput.disabled = false;
    travelBtn.disabled = false;
    nextEventBtn.disabled = false;
    isTyping = false;
}

// Function to backspace text with animation
async function backspaceText() {
    if (isTyping) return;
    isTyping = true;
    
    // Disable input and buttons while backspacing
    yearInput.disabled = true;
    travelBtn.disabled = true;
    nextEventBtn.disabled = true;
    
    // Remove characters one by one
    while (terminal.childNodes.length > 1) { // Keep cursor
        const lastChar = terminal.childNodes[terminal.childNodes.length - 2];
        lastChar.remove();
        await new Promise(resolve => setTimeout(resolve, BACKSPACE_SPEED));
    }
    
    // Re-enable input and buttons after backspacing
    yearInput.disabled = false;
    travelBtn.disabled = false;
    nextEventBtn.disabled = false;
    isTyping = false;
}

// Function to validate year input
function validateYear(year) {
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    
    if (isNaN(year)) {
        return {
            isValid: false,
            message: 'Please enter a valid number.'
        };
    }
    
    if (year < minYear) {
        return {
            isValid: false,
            message: `Please enter a year after ${minYear}.`
        };
    }
    
    if (year > currentYear) {
        return {
            isValid: false,
            message: `Please enter a year before ${currentYear + 1}.`
        };
    }
    
    return { isValid: true };
}

// Function to find next event
function findNextEvent(currentYear) {
    const years = Object.keys(historicalEvents).map(Number).sort((a, b) => a - b);
    const nextYear = years.find(year => year > currentYear);
    
    if (nextYear) {
        return {
            year: nextYear,
            event: historicalEvents[nextYear]
        };
    }
    
    return null;
}

// Function to handle year selection
async function handleYearSelection() {
    const year = parseInt(yearInput.value);
    const validation = validateYear(year);
    
    if (!validation.isValid) {
        await typeText(validation.message);
        return;
    }
    
    const event = historicalEvents[year];
    if (event) {
        await typeText(event);
    } else {
        await typeText('No data available. Please try another year.');
    }
}

// Function to handle next event
async function handleNextEvent() {
    const currentYear = parseInt(yearInput.value) || 1900;
    const nextEvent = findNextEvent(currentYear);
    
    if (nextEvent) {
        yearInput.value = nextEvent.year;
        await typeText(nextEvent.event);
    } else {
        await typeText('No more events available in the future.');
    }
}

// Add event listeners
travelBtn.addEventListener('click', handleYearSelection);
nextEventBtn.addEventListener('click', handleNextEvent);

// Add input validation on change
yearInput.addEventListener('input', (e) => {
    const year = parseInt(e.target.value);
    if (year) {
        const validation = validateYear(year);
        if (!validation.isValid) {
            yearInput.setCustomValidity(validation.message);
        } else {
            yearInput.setCustomValidity('');
        }
    }
}); 