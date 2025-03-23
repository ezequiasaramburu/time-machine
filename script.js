// Get DOM elements
const terminal = document.getElementById('terminal');
const yearInput = document.getElementById('yearInput');
const travelBtn = document.getElementById('travelBtn');
const backToTimelineBtn = document.getElementById('backToTimelineBtn');

// Initialize visitor counter
const visitorCounter = document.getElementById('visitor-counter');
let visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
visitorCount++;
localStorage.setItem('visitorCount', visitorCount.toString());

// Create slot machine style counter
const counterHTML = `
    <div class="visitor-count">
        <span class="counter-label">You are visitor</span>
        <div class="digit-slot">0</div>
        <div class="digit-slot">0</div>
        <div class="digit-slot">0</div>
        <div class="digit-slot">0</div>
        <div class="digit-slot">0</div>
        <div class="digit-slot">0</div>
    </div>
`;
visitorCounter.innerHTML = counterHTML;

// Animate the counter
function animateCounter(targetNumber) {
    const slots = document.querySelectorAll('.digit-slot');
    const targetStr = targetNumber.toString().padStart(6, '0');
    
    slots.forEach((slot, index) => {
        const targetDigit = parseInt(targetStr[index]);
        let currentDigit = 0;
        
        const animate = () => {
            if (currentDigit === targetDigit) {
                slot.textContent = currentDigit;
                return;
            }
            
            currentDigit = (currentDigit + 1) % 10;
            slot.textContent = currentDigit;
            setTimeout(animate, 50);
        };
        
        animate();
    });
}

// Start the animation
animateCounter(visitorCount);

// Secret codes and their messages
const secretCodes = {
    [window.APP_CONFIG.secretCodes.code1]: {
        message: "WARNING! SYSTEM OVERLOAD\nINITIATING EMERGENCY SHUTDOWN...",
        isSelfDestruct: true
    },
    [window.APP_CONFIG.secretCodes.code2]: {
        message: "H4ck the pl4n3t!",
        ascii: `
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝
    ███████║███████║██║     █████╔╝ 
    ██╔══██║██╔══██║██║     ██╔═██╗ 
    ██║  ██║██║  ██║╚██████╗██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`
    },
    [window.APP_CONFIG.secretCodes.code3]: {
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
    [window.APP_CONFIG.secretCodes.code4]: {
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
    [window.APP_CONFIG.secretCodes.code5]: {
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


// State variables
let isTyping = false;
let currentText = '';
let cursorInterval;
let isTimelineView = true; // Track if we're showing the timeline

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

// Function to update back button visibility
function updateBackButtonVisibility() {
    backToTimelineBtn.style.display = isTimelineView ? 'none' : 'block';
}

// Function to clear terminal
function clearTerminal() {
    terminal.innerHTML = '';
    terminal.appendChild(cursor);
    isTimelineView = true;
    updateBackButtonVisibility();
}


// Function to type text with animation
async function typeText(text, isSecret = false, ascii = null) {
    if (isTyping) return;
    isTyping = true;
    
    
    // Disable input and buttons while typing
    yearInput.disabled = true;
    travelBtn.disabled = true;
    
    // Clear previous text
    clearTerminal();
    
    // Update timeline view state for secret messages
    if (isSecret) {
        isTimelineView = false;
        updateBackButtonVisibility();
    }
    
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
    
    // Re-enable input and buttons after typing
    yearInput.disabled = false;
    travelBtn.disabled = false;
    isTyping = false;
}

// Function to backspace text with animation
async function backspaceText() {
    if (isTyping) return;
    isTyping = true;
    
    // Disable input and buttons while backspacing
    yearInput.disabled = true;
    travelBtn.disabled = true;
    
    // Remove characters one by one
    while (terminal.childNodes.length > 1) { // Keep cursor
        const lastChar = terminal.childNodes[terminal.childNodes.length - 2];
        lastChar.remove();
        await new Promise(resolve => setTimeout(resolve, BACKSPACE_SPEED));
    }
    
    // Re-enable input and buttons after backspacing
    yearInput.disabled = false;
    travelBtn.disabled = false;
    isTyping = false;
}

// Function to handle self-destruct sequence
async function handleSelfDestruct() {
    // Disable all inputs
    yearInput.disabled = true;
    travelBtn.disabled = true;
    
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
    
    // Reset input value
    yearInput.value = '';
    
    // Show the complete list of events again
    displayEventsList();
}

// Function to validate year input
function validateYear(year) {
    const currentYear = new Date().getFullYear();
    const minYear = 1936;
    
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
            message: typeof secretCode === 'string' ? secretCode : secretCode.message,
            ascii: typeof secretCode === 'string' ? null : secretCode.ascii
        };
    }
    
    // For regular year validation, use the parsed number
    if (year < minYear) {
        return {
            isValid: false,
            message: `Please enter a year after ${minYear - 1}.`
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

// Function to display the complete list of events
async function displayEventsList() {
    // Create container for events
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'events-list';
    
    // Sort events by year
    const sortedYears = Object.keys(historicalEvents)
        .map(Number)
        .sort((a, b) => a - b);
    
    // Add each event to the container
    sortedYears.forEach(year => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.onclick = () => showEventDetails(year);
        
        // Add dot
        const dot = document.createElement('span');
        dot.className = 'event-dot';
        dot.textContent = '•';
        eventDiv.appendChild(dot);
        
        // Add content
        const content = document.createElement('div');
        content.className = 'event-content';
        
        // Add year
        const yearDiv = document.createElement('div');
        yearDiv.className = 'event-year';
        yearDiv.textContent = year;
        content.appendChild(yearDiv);
        
        // Add event date and title
        const eventText = document.createElement('div');
        eventText.className = 'event-text';
        eventText.textContent = `${historicalEvents[year].date} - ${historicalEvents[year].title}`;
        content.appendChild(eventText);
        
        eventDiv.appendChild(content);
        eventsContainer.appendChild(eventDiv);
    });
    
    // Add the container to the terminal
    terminal.insertBefore(eventsContainer, cursor);
    isTimelineView = true;
    updateBackButtonVisibility();
}

async function showEventDetails(year) {
    const event = historicalEvents[year];
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'event-details';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'event-details-header';
    header.innerHTML = `
        <div class="event-details-year">${year}</div>
        <div class="event-details-date">${event.date}</div>
    `;
    detailsContainer.appendChild(header);
    
    // Create title
    const title = document.createElement('div');
    title.className = 'event-details-title';
    title.textContent = event.title;
    detailsContainer.appendChild(title);
    
    // Create impact section
    const impact = document.createElement('div');
    impact.className = 'event-details-impact';
    impact.innerHTML = `
        <div class="impact-label">Impact:</div>
        <div class="impact-text">${event.impact}</div>
    `;
    detailsContainer.appendChild(impact);
    
    // Clear terminal and show details
    clearTerminal();
    terminal.insertBefore(detailsContainer, cursor);
    isTimelineView = false;
    updateBackButtonVisibility();
}

// Function to handle year selection
async function handleYearSelection() {
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
        isTimelineView = false;
        updateBackButtonVisibility();
        await typeText(validation.message, true, validation.ascii);
    } else {
        const event = historicalEvents[year];
        if (event) {
            await showEventDetails(year);
        } else {
            await typeText('No data available. Please try another year.');
            isTimelineView = false;
            updateBackButtonVisibility();
        }
    }
}

// Add event listeners
travelBtn.addEventListener('click', handleYearSelection);
backToTimelineBtn.addEventListener('click', () => {
    clearTerminal();
    displayEventsList();
    yearInput.value = ''; // Clear the input field
});

// Add input validation on change
yearInput.addEventListener('input', (e) => {
    const year = parseInt(e.target.value);
    const validation = validateYear(year);
    
    if (year) {
        if (!validation.isValid) {
            yearInput.setCustomValidity(validation.message);
        } else {
            yearInput.setCustomValidity('');
        }
    }
});

// Display events list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayEventsList();
});