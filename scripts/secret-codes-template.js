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
    }
}; 