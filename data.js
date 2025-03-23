const historicalEvents = {
    1936: {
        date: "05/28/1936",
        title: "Alan Turing publishes 'On Computable Numbers' introducing the Turing Machine concept.",
        impact: "This paper laid the theoretical foundation for modern computing and artificial intelligence."
    },
    1946: {
        date: "02/14/1946",
        title: "ENIAC, the first general-purpose electronic computer, is unveiled at the University of Pennsylvania.",
        impact: "Weighed 30 tons and could perform 5,000 calculations per second, revolutionizing computing."
    },
    1947: {
        date: "12/23/1947",
        title: "William Shockley, John Bardeen, and Walter Brattain invent the transistor at Bell Labs.",
        impact: "Replaced vacuum tubes, making computers smaller, faster, and more reliable."
    },
    1950: {
        date: "10/15/1950",
        title: "Alan Turing proposes the Turing Test in his paper 'Computing Machinery and Intelligence'.",
        impact: "Established a benchmark for measuring machine intelligence that remains relevant today."
    },
    1951: {
        date: "06/14/1951",
        title: "UNIVAC I becomes the first commercial computer to be sold in the United States.",
        impact: "Marked the beginning of the commercial computer industry and business computing."
    },
    1952: {
        date: "07/01/1952",
        title: "Grace Hopper develops the first compiler, A-0, for the UNIVAC I.",
        impact: "Pioneered the concept of programming languages and automated translation."
    },
    1953: {
        date: "09/13/1953",
        title: "IBM introduces the first magnetic hard drive, the IBM 350 Disk Storage Unit.",
        impact: "Revolutionized data storage with 5MB capacity and random access capabilities."
    },
    1954: {
        date: "10/15/1954",
        title: "FORTRAN, the first high-level programming language, is developed by IBM.",
        impact: "Made programming more accessible and efficient for scientific computing."
    },
    1955: {
        date: "09/01/1955",
        title: "First computer to use transistors, the TX-0, is built at MIT.",
        impact: "Demonstrated the practical advantages of transistor-based computing."
    },
    1956: {
        date: "07/18/1956",
        title: "The term 'Artificial Intelligence' is coined at the Dartmouth Conference.",
        impact: "Launched the field of AI research and established its core concepts."
    },
    1957: {
        date: "10/04/1957",
        title: "Sputnik 1 launch leads to the creation of ARPA (later DARPA) and increased computer research funding.",
        impact: "Accelerated technological development and led to the creation of the Internet."
    },
    1958: {
        date: "09/12/1958",
        title: "Jack Kilby and Robert Noyce independently invent the integrated circuit.",
        impact: "Enabled the miniaturization of electronic devices and the rise of modern computing."
    },
    1959: {
        date: "12/09/1959",
        title: "First computer to be sold with a keyboard and monitor, the PDP-1, is released by DEC.",
        impact: "Introduced interactive computing and made computers more user-friendly."
    },
    1960: {
        date: "04/28/1960",
        title: "COBOL programming language is developed for business applications.",
        impact: "Standardized business computing and remains in use in legacy systems."
    },
    1961: {
        date: "02/01/1961",
        title: "First computer game, Spacewar!, is created by Steve Russell at MIT.",
        impact: "Pioneered interactive entertainment and computer graphics."
    },
    1962: {
        date: "12/09/1962",
        title: "First computer mouse is demonstrated by Douglas Engelbart.",
        impact: "Revolutionized human-computer interaction and remains essential today."
    },
    1963: {
        date: "06/17/1963",
        title: "ASCII (American Standard Code for Information Interchange) is published.",
        impact: "Standardized text encoding and enabled universal text communication."
    },
    1964: {
        date: "04/07/1964",
        title: "IBM System/360, the first family of computers with compatible software, is announced.",
        impact: "Created the concept of computer compatibility and software portability."
    },
    1965: {
        date: "04/19/1965",
        title: "Moore's Law is published by Gordon Moore, predicting transistor density doubling every two years.",
        impact: "Became a driving force in semiconductor industry development."
    },
    1966: {
        date: "12/09/1966",
        title: "First computer mouse is demonstrated by Douglas Engelbart.",
        impact: "Introduced the concept of pointing devices for computer interaction."
    },
    1967: {
        date: "03/29/1967",
        title: "First handheld calculator is developed by Texas Instruments.",
        impact: "Made computing power portable and accessible to the general public."
    },
    1968: {
        date: "12/09/1968",
        title: "Douglas Engelbart demonstrates the first computer mouse, hypertext, and video conferencing.",
        impact: "Introduced fundamental concepts of modern computing interfaces."
    },
    1969: {
        date: "10/29/1969",
        title: "ARPANET, the precursor to the Internet, is established between UCLA and Stanford.",
        impact: "Created the foundation for the modern Internet and global connectivity."
    },
    1970: {
        date: "01/01/1970",
        title: "UNIX operating system is created by Ken Thompson and Dennis Ritchie at Bell Labs.",
        impact: "Became the foundation for modern operating systems and open-source software."
    },
    1971: {
        date: "11/15/1971",
        title: "Intel releases the first microprocessor, the Intel 4004.",
        impact: "Enabled the development of personal computers and embedded systems."
    },
    1972: {
        date: "01/01/1972",
        title: "C programming language is created by Dennis Ritchie at Bell Labs.",
        impact: "Became one of the most influential programming languages in history."
    },
    1973: {
        date: "03/01/1973",
        title: "Xerox PARC develops the Alto, the first computer with a graphical user interface.",
        impact: "Introduced modern desktop computing concepts and GUI elements."
    },
    1974: {
        date: "12/19/1974",
        title: "First personal computer kit, the Altair 8800, is released.",
        impact: "Sparked the personal computer revolution and home computing."
    },
    1975: {
        date: "04/04/1975",
        title: "Microsoft is founded by Bill Gates and Paul Allen.",
        impact: "Became the world's largest software company and shaped modern computing."
    },
    1976: {
        date: "04/01/1976",
        title: "Apple Computer is founded by Steve Jobs and Steve Wozniak.",
        impact: "Revolutionized personal computing with user-friendly design."
    },
    1977: {
        date: "06/10/1977",
        title: "Apple II, the first mass-produced personal computer, is released.",
        impact: "Made personal computing accessible to the general public."
    },
    1978: {
        date: "05/03/1978",
        title: "First spam email is sent by Gary Thuerk to 400 ARPANET users.",
        impact: "Introduced the concept of unsolicited commercial messaging."
    },
    1979: {
        date: "10/17/1979",
        title: "First spreadsheet program, VisiCalc, is released for the Apple II.",
        impact: "Revolutionized business computing and data analysis."
    },
    1980: {
        date: "05/22/1980",
        title: "Pac-Man arcade game is released, becoming a cultural phenomenon.",
        impact: "Popularized video gaming and created the first gaming mascot."
    },
    1981: {
        date: "08/12/1981",
        title: "IBM introduces the IBM PC, setting the standard for personal computers.",
        impact: "Established the PC standard and created the modern computer industry."
    },
    1982: {
        date: "08/01/1982",
        title: "Commodore 64 is released, becoming the best-selling computer model of all time.",
        impact: "Made home computing affordable and popularized computer gaming."
    },
    1983: {
        date: "01/01/1983",
        title: "TCP/IP becomes the standard protocol for ARPANET, marking the birth of the modern Internet.",
        impact: "Enabled the global expansion of the Internet and network communication."
    },
    1984: {
        date: "01/24/1984",
        title: "Apple releases the Macintosh, the first successful mass-market personal computer with a GUI.",
        impact: "Popularized graphical user interfaces and mouse-based computing."
    },
    1985: {
        date: "10/14/1985",
        title: "C++ programming language is created by Bjarne Stroustrup.",
        impact: "Became one of the most widely used programming languages."
    },
    1986: {
        date: "01/19/1986",
        title: "First computer virus, Brain, is created in Pakistan.",
        impact: "Introduced the concept of malicious software and cybersecurity."
    },
    1987: {
        date: "12/18/1987",
        title: "Perl programming language is created by Larry Wall.",
        impact: "Became essential for system administration and web development."
    },
    1988: {
        date: "11/02/1988",
        title: "First major computer worm, the Morris Worm, affects the early Internet.",
        impact: "Highlighted the need for network security and cybersecurity measures."
    },
    1989: {
        date: "03/12/1989",
        title: "Tim Berners-Lee invents the World Wide Web at CERN.",
        impact: "Created the foundation for the modern web and online communication."
    },
    1990: {
        date: "02/20/1990",
        title: "Python programming language is created by Guido van Rossum.",
        impact: "Became one of the most popular and versatile programming languages."
    },
    1991: {
        date: "09/17/1991",
        title: "Linus Torvalds releases the first version of Linux.",
        impact: "Revolutionized open-source software and server computing."
    },
    1992: {
        date: "12/03/1992",
        title: "First text message is sent by Neil Papworth.",
        impact: "Started the mobile messaging revolution and modern communication."
    },
    1993: {
        date: "04/22/1993",
        title: "Mosaic, the first popular web browser, is released by NCSA.",
        impact: "Made the World Wide Web accessible to the general public."
    },
    1994: {
        date: "07/05/1994",
        title: "Amazon.com is founded by Jeff Bezos.",
        impact: "Revolutionized e-commerce and online retail."
    },
    1995: {
        date: "05/23/1995",
        title: "JavaScript is created by Brendan Eich at Netscape.",
        impact: "Enabled interactive web pages and modern web applications."
    },
    1996: {
        date: "09/04/1996",
        title: "Google is founded by Larry Page and Sergey Brin.",
        impact: "Revolutionized internet search and online information access."
    },
    1997: {
        date: "05/11/1997",
        title: "Deep Blue defeats world chess champion Garry Kasparov.",
        impact: "Demonstrated the potential of artificial intelligence in complex tasks."
    },
    1998: {
        date: "12/20/1998",
        title: "PayPal is founded, revolutionizing online payments.",
        impact: "Created the foundation for modern digital payments and e-commerce."
    },
    1999: {
        date: "09/30/1999",
        title: "Wi-Fi standard is introduced, enabling wireless networking.",
        impact: "Enabled wireless internet access and mobile computing."
    },
    2000: {
        date: "01/01/2000",
        title: "Y2K bug concerns lead to major software updates worldwide.",
        impact: "Highlighted the importance of software maintenance and testing."
    },
    2001: {
        date: "01/15/2001",
        title: "Wikipedia is launched by Jimmy Wales and Larry Sanger.",
        impact: "Revolutionized knowledge sharing and collaborative content creation."
    },
    2002: {
        date: "11/01/2002",
        title: "First camera phone is released by Sharp.",
        impact: "Started the mobile photography revolution and social media sharing."
    },
    2003: {
        date: "08/29/2003",
        title: "Skype is launched, revolutionizing voice and video communication.",
        impact: "Enabled free global communication and video conferencing."
    },
    2004: {
        date: "02/04/2004",
        title: "Facebook is founded by Mark Zuckerberg at Harvard.",
        impact: "Transformed social networking and online communication."
    },
    2005: {
        date: "02/14/2005",
        title: "YouTube is founded by Chad Hurley, Steve Chen, and Jawed Karim.",
        impact: "Revolutionized video sharing and online content creation."
    },
    2006: {
        date: "03/14/2006",
        title: "Amazon launches AWS, pioneering cloud computing.",
        impact: "Created the foundation for modern cloud services and infrastructure."
    },
    2007: {
        date: "06/29/2007",
        title: "Apple releases the iPhone, revolutionizing mobile computing.",
        impact: "Transformed mobile phones into powerful computing devices."
    },
    2008: {
        date: "10/31/2008",
        title: "Bitcoin, the first cryptocurrency, is introduced by Satoshi Nakamoto.",
        impact: "Created the foundation for blockchain technology and digital currencies."
    },
    2009: {
        date: "02/24/2009",
        title: "WhatsApp is founded by Jan Koum and Brian Acton.",
        impact: "Revolutionized mobile messaging and global communication."
    },
    2010: {
        date: "10/06/2010",
        title: "Instagram is founded by Kevin Systrom and Mike Krieger.",
        impact: "Transformed social media and mobile photography sharing."
    },
    2011: {
        date: "02/16/2011",
        title: "IBM's Watson defeats human champions on Jeopardy!",
        impact: "Demonstrated advanced natural language processing and AI capabilities."
    },
    2012: {
        date: "02/29/2012",
        title: "Raspberry Pi, the first affordable single-board computer, is released.",
        impact: "Made computing education and DIY electronics accessible."
    },
    2013: {
        date: "06/06/2013",
        title: "Edward Snowden reveals global surveillance programs.",
        impact: "Raised awareness about digital privacy and government surveillance."
    },
    2014: {
        date: "09/15/2014",
        title: "Microsoft acquires Minecraft for $2.5 billion.",
        impact: "Highlighted the value of gaming and creative platforms."
    },
    2015: {
        date: "11/09/2015",
        title: "TensorFlow, Google's open-source machine learning framework, is released.",
        impact: "Democratized AI development and machine learning applications."
    },
    2016: {
        date: "03/15/2016",
        title: "AlphaGo defeats world champion Lee Sedol in Go.",
        impact: "Demonstrated AI's ability to master complex strategic games."
    },
    2017: {
        date: "12/17/2017",
        title: "Bitcoin reaches $20,000 for the first time.",
        impact: "Brought cryptocurrency into mainstream financial awareness."
    },
    2018: {
        date: "06/04/2018",
        title: "GitHub is acquired by Microsoft for $7.5 billion.",
        impact: "Highlighted the importance of open-source development platforms."
    },
    2019: {
        date: "10/23/2019",
        title: "Google achieves quantum supremacy with their 53-qubit processor.",
        impact: "Marked a milestone in quantum computing development."
    },
    2020: {
        date: "03/11/2020",
        title: "COVID-19 pandemic accelerates digital transformation worldwide.",
        impact: "Forced rapid adoption of remote work and digital services."
    },
    2021: {
        date: "03/11/2021",
        title: "NFTs become mainstream with record-breaking sales.",
        impact: "Popularized digital ownership and blockchain-based assets."
    },
    2022: {
        date: "11/30/2022",
        title: "ChatGPT is released by OpenAI, revolutionizing AI interaction.",
        impact: "Transformed public perception and adoption of AI technology."
    },
    2023: {
        date: "06/05/2023",
        title: "Apple Vision Pro is announced, marking a new era in spatial computing.",
        impact: "Introduced mainstream mixed reality and spatial computing."
    },
    2024: {
        date: "02/15/2024",
        title: "Google's Gemini Ultra AI model achieves human-level performance across multiple domains.",
        impact: "Demonstrated advanced AI capabilities across various tasks."
    },
    2025: {
        date: "01/01/2025",
        title: "First commercial quantum computer with over 1000 qubits becomes available.",
        impact: "Marked the beginning of practical quantum computing applications."
    }
}; 