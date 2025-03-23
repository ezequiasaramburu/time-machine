export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { code } = req.body;

    // Secret codes object
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

    const result = secretCodes[code];

    if (result) {
        return res.status(200).json({
            isValid: true,
            message: result.message,
            ascii: result.ascii,
            isSelfDestruct: result.isSelfDestruct
        });
    }

    return res.status(200).json({
        isValid: false,
        message: 'Invalid code. Please try again.'
    });
} 