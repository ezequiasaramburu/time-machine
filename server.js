const express = require('express');
const path = require('path');
const app = express();

// Secret codes stored securely on the server
const secretCodes = {
    [process.env.NEXT_PUBLIC_SECRET_CODE_1]: {
        message: "WARNING! SYSTEM OVERLOAD\nINITIATING EMERGENCY SHUTDOWN...",
        isSelfDestruct: true
    },
    [process.env.NEXT_PUBLIC_SECRET_CODE_2]: {
        message: "H4ck the pl4n3t!",
        ascii: `
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝
    ███████║███████║██║     █████╔╝ 
    ██╔══██║██╔══██║██║     ██╔═██╗ 
    ██║  ██║██║  ██║╚██████╗██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`
    },
    [process.env.NEXT_PUBLIC_SECRET_CODE_3]: {
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
    [process.env.NEXT_PUBLIC_SECRET_CODE_4]: {
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
    [process.env.NEXT_PUBLIC_SECRET_CODE_5]: {
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
    }
};

// API endpoint to validate codes
app.post('/api/validate-code', express.json(), (req, res) => {
    const { code } = req.body;
    const secretCode = secretCodes[code];
    
    if (secretCode) {
        res.json({
            isValid: true,
            isSecretCode: true,
            isSelfDestruct: secretCode.isSelfDestruct,
            message: secretCode.message,
            ascii: secretCode.ascii
        });
    } else {
        res.json({
            isValid: false,
            message: 'Invalid code'
        });
    }
});

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 