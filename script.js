// Get DOM elements
const terminal = document.getElementById('terminal');
const yearInput = document.getElementById('yearInput');
const travelBtn = document.getElementById('travelBtn');
const nextEventBtn = document.getElementById('nextEventBtn');

// Secret codes and their messages
const secretCodes = {
    "01000101": {
        message: "SPEEDRUN MODE ACTIVATED\nDisplaying all historical events...",
        isSpeedrun: true
    },
    "9999": {
        message: "WARNING! SYSTEM OVERLOAD\nINITIATING EMERGENCY SHUTDOWN...",
        isSelfDestruct: true
    },
    "1337": {
        message: "H4ck the pl4n3t!",
        ascii: `
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝
    ███████║███████║██║     █████╔╝ 
    ██╔══██║██╔══██║██║     ██╔═██╗ 
    ██║  ██║██║  ██║╚██████╗██║  ██╗
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`
    },
    "42": {
        message: "The answer to life, the universe, and everything.",
        ascii: `
        *    .  *       .    *    .        .  *    *
     .    *    '  .      *     .     *   .    .  *
    .    *        \  ^  /    .     .    *   .     .
        .     *    (o o)        *  .    .     *  .
     *      .     (  v  )  .        .      .        *
       .     *     --^--   *    .       *   .    .
    * * * DON'T PANIC! * * * DEEP THOUGHT * * *`
    },
    "1985": {
        message: "Great Scott! You've discovered the time machine's secret code!",
        ascii: `
            _______________________
           /      _________      /\\
         _/      /  ___   \\    / /\\
      __/       /  /   \\   \\  / / /
     /  \\      /  /     \\   \\/ / /
    /    \\____/__/_______\\___/ / /
    \\    / DMC-12 DELOREAN    \\/
     \\  /    \\___________/     \\
      \\/___________________[O]__\\
           [][][]   [][][]   []
              88 MPH ->->->
    * * * FLUX CAPACITOR ACTIVATED * * *`
    },
    "2001": {
        message: "I'm sorry Dave, I'm afraid I can't do that...",
        ascii: `
              ╭──────────────╮
             ╭│              │╮
            ╭││  [HAL 9000]  ││╮
           ╭│││    ╭────╮    │││╮
          ╭││││    │  ● │    ││││╮
         ╭│││││    ╰────╯    │││││╮
        ╭││││││              ││││││╮
        ╰││││││              ││││││╯
         ╰│││││              │││││╯
          ╰││││              ││││╯
           ╰│││              │││╯
            ╰││              ││╯
             ╰│              │╯
              ╰──────────────╯
            * * * HAL 9000 * * *`
    },
};

// Animation settings
const TYPING_SPEED = 50; // milliseconds per character
const SECRET_TYPING_SPEED = 30; // faster typing speed for secret messages
const BACKSPACE_SPEED = 30; // milliseconds per character
const CURSOR_BLINK_SPEED = 500; // milliseconds

// Sound effects
const clickSound = new Audio('sounds/click.mp3');
const typewriterSound = new Audio('sounds/typewriter.mp3');
typewriterSound.loop = true; // Loop the typewriter sound

// State variables
let isTyping = false;
let currentText = '';
let cursorInterval;
let currentTypewriterSound = null;

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

// Function to stop current typewriter sound
function stopTypewriterSound() {
    if (currentTypewriterSound) {
        currentTypewriterSound.pause();
        currentTypewriterSound.currentTime = 0;
        currentTypewriterSound = null;
    }
}

// Function to type text with animation
async function typeText(text, isSecret = false, ascii = null) {
    if (isTyping) return;
    isTyping = true;
    
    // Stop any existing typewriter sound
    stopTypewriterSound();
    
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
    
    // Start typewriter sound
    currentTypewriterSound = typewriterSound.cloneNode();
    currentTypewriterSound.play();
    
    // If there's ASCII art, display it first
    if (ascii) {
        const asciiDiv = document.createElement('div');
        asciiDiv.style.textAlign = 'center';
        asciiDiv.style.whiteSpace = 'pre';
        asciiDiv.style.fontFamily = 'monospace';
        asciiDiv.style.marginBottom = '20px';
        asciiDiv.style.color = 'cyan';
        asciiDiv.style.textShadow = '0px 0px 5px cyan';
        asciiDiv.textContent = ascii;
        terminal.insertBefore(asciiDiv, cursor);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Type new text with appropriate speed and styling
    const typingSpeed = isSecret ? SECRET_TYPING_SPEED : TYPING_SPEED;
    for (let i = 0; i < text.length; i++) {
        const char = document.createElement('span');
        char.textContent = text[i];
        if (isSecret) {
            char.classList.add('secret-message');
        }
        terminal.insertBefore(char, cursor);
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
    
    // Stop typewriter sound
    stopTypewriterSound();
    
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
    
    // Stop any existing typewriter sound
    stopTypewriterSound();
    
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

// Function to handle self-destruct sequence
async function handleSelfDestruct() {
    // Disable all inputs
    yearInput.disabled = true;
    travelBtn.disabled = true;
    nextEventBtn.disabled = true;
    
    // Clear terminal
    clearTerminal();
    
    // Add self-destruct class to body instead of terminal
    document.body.classList.add('self-destruct');
    
    // Display warning message
    const warningDiv = document.createElement('div');
    warningDiv.className = 'self-destruct-message';
    warningDiv.style.whiteSpace = 'pre';
    warningDiv.textContent = "WARNING! SYSTEM OVERLOAD\nINITIATING EMERGENCY SHUTDOWN...";
    terminal.insertBefore(warningDiv, cursor);
    
    // Add countdown timer
    const countdownDiv = document.createElement('div');
    countdownDiv.className = 'countdown-timer';
    terminal.insertBefore(countdownDiv, cursor);
    
    // Countdown from 5
    for (let i = 3; i > 0; i--) {
        countdownDiv.textContent = i;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Show final message
    countdownDiv.textContent = "SYSTEM DESTROYED";
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove self-destruct class and add shutdown class
    document.body.classList.remove('self-destruct');
    document.body.classList.add('shutdown');
    
    // Wait for 2 seconds in black screen
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Remove shutdown class
    document.body.classList.remove('shutdown');
    
    // Clear terminal
    clearTerminal();
    
    // Re-enable inputs
    yearInput.disabled = false;
    travelBtn.disabled = false;
    nextEventBtn.disabled = false;
    
    // Reset input value
    yearInput.value = '';
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
    
    // Check for secret codes first, using the original input string
    const inputString = yearInput.value;
    if (secretCodes[inputString]) {
        const secretCode = secretCodes[inputString];
        return {
            isValid: true,
            isSecretCode: true,
            isSelfDestruct: secretCode.isSelfDestruct,
            isSpeedrun: secretCode.isSpeedrun,
            message: typeof secretCode === 'string' ? secretCode : secretCode.message,
            ascii: typeof secretCode === 'string' ? null : secretCode.ascii
        };
    }
    
    // For regular year validation, use the parsed number
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

// Function to handle speedrun mode
async function handleSpeedrunMode() {
    // Clear terminal
    clearTerminal();
    
    // Display speedrun activation message
    await typeText("SPEEDRUN MODE ACTIVATED\nDisplaying all historical events...", 50);
    
    // Create speedrun container
    const speedrunContainer = document.createElement('div');
    speedrunContainer.className = 'speedrun-mode';
    
    // Sort events by year
    const sortedYears = Object.keys(historicalEvents)
        .map(Number)
        .sort((a, b) => a - b);
    
    // Add each event to the container
    sortedYears.forEach(year => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'speedrun-item';
        
        // Add dot
        const dot = document.createElement('span');
        dot.className = 'speedrun-dot';
        dot.textContent = '•';
        eventDiv.appendChild(dot);
        
        // Add content
        const content = document.createElement('div');
        content.className = 'speedrun-content';
        
        // Add year
        const yearDiv = document.createElement('div');
        yearDiv.className = 'speedrun-year';
        yearDiv.textContent = year;
        content.appendChild(yearDiv);
        
        // Add event
        const eventText = document.createElement('div');
        eventText.className = 'speedrun-event';
        eventText.textContent = historicalEvents[year];
        content.appendChild(eventText);
        
        eventDiv.appendChild(content);
        speedrunContainer.appendChild(eventDiv);
    });
    
    // Add the container to the terminal
    terminal.insertBefore(speedrunContainer, cursor);
    
    // Wait for 10 seconds
    await new Promise(resolve => setTimeout(resolve, 25000));
    
    // Clear terminal and show deactivation message
    clearTerminal();
    await typeText("SPEEDRUN MODE DEACTIVATED\nReturning to normal operation...", 50);
    
    // Wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear terminal one final time
    clearTerminal();
    
    // Clear the input field
    yearInput.value = '';
}

// Add counter for next event button
let nextEventUsageCount = 0;
const MAX_NEXT_EVENT_USES = 5;

// Function to handle next event
async function handleNextEvent() {
    // Check if we've reached the maximum uses
    if (nextEventUsageCount >= MAX_NEXT_EVENT_USES) {
        await typeText('Maximum consecutive uses reached. Please enter a new year to continue.');
        return;
    }

    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play();
    
    const currentYear = parseInt(yearInput.value) || 1900;
    const nextEvent = findNextEvent(currentYear);
    
    if (nextEvent) {
        yearInput.value = nextEvent.year;
        
        // Add CRT flicker effect
        terminal.classList.add('crt-flicker');
        await new Promise(resolve => setTimeout(resolve, 100));
        terminal.classList.remove('crt-flicker');
        
        // Fade out current content
        terminal.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Clear terminal
        clearTerminal();
        terminal.classList.remove('fade-out');
        terminal.classList.add('fade-in');
        
        // Show the next event
        await typeText(nextEvent.event);
        
        // Increment usage counter
        nextEventUsageCount++;
    } else {
        await typeText('No more events available.');
    }
}

// Function to handle year selection
async function handleYearSelection() {
    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play();
    
    const year = parseInt(yearInput.value);
    const validation = validateYear(year);
    
    if (!validation.isValid) {
        // Add shake effect to input
        yearInput.classList.add('shake');
        setTimeout(() => yearInput.classList.remove('shake'), 300);
        
        await typeText(validation.message);
        return;
    }
    
    // Handle self-destruct sequence
    if (validation.isSelfDestruct) {
        await handleSelfDestruct();
        return;
    }
    
    // Handle speedrun mode
    if (validation.isSpeedrun) {
        await handleSpeedrunMode();
        return;
    }
    
    // Reset next event usage counter when a valid year is entered
    if (historicalEvents[year]) {
        nextEventUsageCount = 0;
    }
    
    // Add CRT flicker effect
    terminal.classList.add('crt-flicker');
    await new Promise(resolve => setTimeout(resolve, 100));
    terminal.classList.remove('crt-flicker');
    
    // Fade out current content
    terminal.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Clear terminal
    clearTerminal();
    terminal.classList.remove('fade-out');
    terminal.classList.add('fade-in');
    
    // Show the appropriate message
    if (validation.isSecretCode) {
        await typeText(validation.message, true, validation.ascii);
    } else {
        const event = historicalEvents[year];
        if (event) {
            await typeText(event);
        } else {
            await typeText('No data available. Please try another year.');
        }
    }
}

// Add event listeners
travelBtn.addEventListener('click', handleYearSelection);
nextEventBtn.addEventListener('click', handleNextEvent);

// Add input validation on change
yearInput.addEventListener('input', (e) => {
    const year = parseInt(e.target.value);
    const validation = validateYear(year);
    
    // Disable next event button if input is empty or invalid
    nextEventBtn.disabled = !e.target.value || !validation.isValid;
    
    if (year) {
        if (!validation.isValid) {
            yearInput.setCustomValidity(validation.message);
        } else {
            yearInput.setCustomValidity('');
        }
    }
});

// Set initial disabled state of next event button
nextEventBtn.disabled = true;

// Cryptic hints system
const crypticHints = [
    "Some secrets are hidden in numbers...",
    "Some years holds special meaning...",
    "Emergency protocols can be triggered...",
    "Certain numbers unlock hidden messages...",
    "The past holds many secrets...",
    "Time travel isn't the only mystery...",
    "Some codes are more destructive than others...",
    "Numbers can be more than just years...",
    "The future isn't the only destination...",
    "Hidden messages await discovery..."
];

let hintTimeout;
let currentHint = null;

function showRandomHint() {
    // Clear any existing hint
    if (currentHint) {
        currentHint.remove();
    }
    
    // Create new hint element
    const hint = document.createElement('div');
    hint.className = 'cryptic-hint';
    hint.textContent = crypticHints[Math.floor(Math.random() * crypticHints.length)];
    document.body.appendChild(hint);
    currentHint = hint;
    
    // Show hint with fade in
    setTimeout(() => hint.classList.add('visible'), 100);
    
    // Hide hint after 5 seconds
    setTimeout(() => {
        hint.classList.remove('visible');
        setTimeout(() => hint.remove(), 500);
    }, 5000);
}

function scheduleNextHint() {
    // Random delay between 15-20 seconds for testing
    const delay = Math.floor(Math.random() * (20000 - 15000) + 15000);
    hintTimeout = setTimeout(() => {
        showRandomHint();
        scheduleNextHint();
    }, delay);
}

// Start the hint system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initial delay before first hint (10 seconds for testing)
    const initialDelay = 10000;
    setTimeout(() => {
        showRandomHint();
        scheduleNextHint();
    }, initialDelay);
}); 