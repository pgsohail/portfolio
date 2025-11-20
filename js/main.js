const messages = [
    { content: "👋 Hey I am Sohail Sadiq, hope you're doing well", delay: 1000 },
    { content: "Full-Stack & Blockchain Developer based in London, UK", delay: 1500 },
    { content: "Skilled in Python, Rust, JavaScript, and Salesforce Marketing Cloud. Expert in AI, UI/UX design, and cloud platforms (AWS, Azure, GCP)", delay: 2000 },
    { content: "🎓 Currently pursuing Masters in AI at University of East London. Graduated with BSc Software Engineering from COMSATS University and completed App Academy bootcamp", delay: 2500 },
    { content: "Currently working at Philanthrify developing Rust smart contracts. Previously built apps with 10,000+ downloads and optimized backends by 60%", delay: 2500 },
    { content: "Open source contributor, GitHub Pro, and passionate about building scalable solutions with a focus on security and performance", delay: 2000 },
    { content: "Let's build together 🚀\n\nClick on below to contact me or find my projects", delay: 1500 }
];

const socialLinks = [
    { text: "GitHub", url: "https://github.com/pgsohail", icon: "github" },
    { text: "LinkedIn", url: "https://www.linkedin.com/in/sohail-sadiq-4320611a6/", icon: "linkedin" },
    { text: "WhatsApp", url: "https://wa.me/447361244143", icon: "whatsapp" },
    { text: "Spotify", url: "https://open.spotify.com/user/313nk6642wkojkahsxakz5ry5e2y?si=iksQT_W4TjyUh5BWkrpUQQ&utm_source=copy-link&nd=1&dlsi=626dd1362b1b4f44", icon: "spotify" },
    { text: "Telegram", url: "https://t.me/pgsohail", icon: "telegram" },
    { text: "X (Twitter)", url: "https://x.com/helll0fri3nd", icon: "twitter" },
    { text: "Email", url: "mailto:ssohailssadiq@gmail.com", icon: "email" }
];

let currentIndex = 0;
let isTyping = false;
let audioEnabled = false;

// Audio elements
let messageAudioTemplate = null;

// Initialize audio files
function initAudio() {
    try {
        // Create audio template for message sounds
        messageAudioTemplate = new Audio('audio/iphone_msg_sent.mp3');
        messageAudioTemplate.volume = 0.6;
        messageAudioTemplate.preload = 'auto';
        
        // Enable audio immediately - always try to play
        audioEnabled = true;
        
        // Aggressively try to unlock audio on page load
        const unlockAudio = async () => {
            try {
                // Try multiple times to unlock audio
                for (let i = 0; i < 3; i++) {
                    const testAudio = new Audio('audio/iphone-keyboard-typing-sound-effect-336778.mp3');
                    testAudio.volume = 0.01;
                    try {
                        await testAudio.play();
                        testAudio.pause();
                        testAudio.currentTime = 0;
                        break; // Success, stop trying
                    } catch (e) {
                        // Continue trying
                    }
                }
            } catch (e) {
                // Ignore errors
            }
        };
        
        // Try to unlock immediately multiple times
        unlockAudio();
        setTimeout(unlockAudio, 200);
        setTimeout(unlockAudio, 500);
        
        // Also unlock on any user interaction (as backup)
        const unlockOnInteraction = () => {
            unlockAudio();
        };
        document.addEventListener('click', unlockOnInteraction, { once: true });
        document.addEventListener('touchstart', unlockOnInteraction, { once: true });
    } catch (e) {
        console.log('Audio not supported');
    }
}


// Play message sent sound (play only a short segment)
function playMessageSound() {
    try {
        // Create new audio instance each time for reliable playback
        const audio = new Audio('audio/iphone_msg_sent.mp3');
        audio.volume = 0.6;
        
        // Set up to play only first 0.3 seconds
        audio.currentTime = 0;
        
        // Always try to play - don't wait for user interaction
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Stop after 0.3 seconds
                setTimeout(() => {
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                    } catch (e) {}
                }, 300);
            }).catch((err) => {
                // If play fails, keep trying - don't give up
                setTimeout(() => {
                    try {
                        audio.play().then(() => {
                            setTimeout(() => {
                                try {
                                    audio.pause();
                                    audio.currentTime = 0;
                                } catch (e) {}
                            }, 300);
                        }).catch(() => {});
                    } catch (e) {}
                }, 100);
            });
        } else {
            // Fallback: stop after 0.3 seconds
            setTimeout(() => {
                try {
                    audio.pause();
                    audio.currentTime = 0;
                } catch (e) {}
            }, 300);
        }
    } catch (e) {
        // Audio error, continue silently
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    startMessages();
});

function startMessages() {
    if (currentIndex >= messages.length) {
        // All messages done, show links
        renderSocialLinks();
        return;
    }

    const message = messages[currentIndex];
    
    // Show date stamp for first message
    if (currentIndex === 0) {
        createDateStamp();
    }
    
    // Show typing indicator first
    showTypingIndicator(() => {
        // After typing completes, hide indicator and show message
        hideTypingIndicator();
        displayMessage(message);
        currentIndex++;
        
        // Wait before starting next message
        setTimeout(() => {
            startMessages();
        }, message.delay || 1000);
    });
}

function createDateStamp() {
    const container = document.getElementById('messagesContainer');
    const dateEl = document.createElement('div');
    dateEl.className = 'date-stamp';
    dateEl.textContent = getDateString();
    container.appendChild(dateEl);
}

function showTypingIndicator(callback) {
    if (isTyping) return;
    isTyping = true;
    
    const container = document.getElementById('messagesContainer');
    const typingEl = document.createElement('div');
    typingEl.className = 'message received';
    typingEl.id = 'typing-indicator';
    
    const typingBubble = document.createElement('div');
    typingBubble.className = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingBubble.appendChild(dot);
    }
    
    typingEl.appendChild(typingBubble);
    container.appendChild(typingEl);
    
    // Scroll to bottom
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
        
    // Show typing for longer time (2-3 seconds) to make it realistic
    const typingDuration = 2000 + Math.random() * 1000; // 2-3 seconds
    setTimeout(() => {
        if (callback) callback();
    }, typingDuration);
}

function hideTypingIndicator() {
    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) {
        typingEl.remove();
    }
    isTyping = false;
}

function displayMessage(message) {
    const container = document.getElementById('messagesContainer');
    createTextMessage(message.content, container);
        
        // Scroll to bottom
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
}

function createTextMessage(content, container) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message received';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = getCurrentTime();
    
    bubble.appendChild(timestamp);
    messageEl.appendChild(bubble);
    container.appendChild(messageEl);
    
    // Play message sound immediately when message appears
    setTimeout(() => {
        playMessageSound();
    }, 50);
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
}

function getDateString() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    return `${day}, ${month} ${date}, ${year}`;
}

function getIconSVG(iconType) {
    const icons = {
        github: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        linkedin: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        email: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
        spotify: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.419.34-.78.78-.66 4.56.96 7.8 1.86 10.98 3.42.42.18.72.78.66 1.26zm1.44-3.3c-.3.42-.84.6-1.32.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.2-1.26 9.6-.66 13.38 1.62.42.18.6.78.42 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.6.3.84 1.02.54 1.62-.3.42-1.02.6-1.62.3z"/></svg>',
        telegram: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.84 8.678c-.135.608-.481.758-.978.473l-2.7-1.99-1.303 1.253c-.15.15-.275.275-.563.275l.198-2.79 5.002-4.52c.217-.19-.048-.295-.336-.108l-6.18 3.894-2.664-.835c-.578-.18-.594-.578.12-.875l10.35-3.99c.48-.18.9.112.75.69z"/></svg>',
        twitter: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        whatsapp: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
    };
    return icons[iconType] || '';
}

function renderSocialLinks() {
    const container = document.getElementById('messagesContainer');
    if (!container) return;
    
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    
    socialLinks.forEach(link => {
        const linkEl = document.createElement('a');
        linkEl.href = link.url;
        linkEl.target = '_blank';
        linkEl.rel = 'noopener noreferrer';
        linkEl.className = 'social-link';
        linkEl.innerHTML = getIconSVG(link.icon) + '<span>' + link.text + '</span>';
        linksContainer.appendChild(linkEl);
    });
    
    container.appendChild(linksContainer);
    
    // Scroll to bottom
    setTimeout(() => {
    container.scrollTop = container.scrollHeight;
    }, 100);
}
