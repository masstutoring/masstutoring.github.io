<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>S(Ai)T - AI SAT Tutor - Mass Tutoring</title>
    <link rel="icon" type="image/png" href="https://i.imgur.com/4Fl92k3.png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #f8f9fa;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            padding: 1rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-container img {
            height: 60px;
            width: auto;
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1a1a1a;
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            color: #1a1a1a;
            font-weight: 600;
            transition: color 0.3s;
            font-size: 1.05rem;
        }

        .nav-links a:hover {
            color: #f59e0b;
        }

        /* Hero Section */
        .hero {
            margin-top: 80px;
            padding: 4rem 5% 5rem;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
            border-radius: 50%;
        }

        .hero-content {
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 1rem;
        }

        .hero-ai {
            color: #fbbf24;
        }

        .hero p {
            font-size: 1.3rem;
            opacity: 0.95;
            max-width: 700px;
            margin: 0 auto;
        }

        /* Main Content */
        .main-content {
            padding: 3rem 5%;
            max-width: 1400px;
            margin: 0 auto;
        }

        .features-banner {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .feature-badge {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
            transition: all 0.3s;
        }

        .feature-badge:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }

        .feature-badge h3 {
            font-size: 1.2rem;
            color: #1f2937;
            font-weight: 700;
        }

        /* Chat Container */
        .chat-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 5px 30px rgba(0,0,0,0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 600px;
        }

        .chat-header {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 1.5rem;
            text-align: center;
        }

        .chat-header h2 {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .chat-messages {
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
            background: #f8f9fa;
        }

        .message {
            margin-bottom: 1.5rem;
            display: flex;
            gap: 1rem;
            animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1.2rem;
            flex-shrink: 0;
        }

        .user-message {
            flex-direction: row-reverse;
        }

        .user-message .message-avatar {
            background: #f59e0b;
            color: white;
        }

        .ai-message .message-avatar {
            background: #1f2937;
            color: white;
        }

        .message-content {
            max-width: 70%;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            line-height: 1.6;
        }

        .message-content strong {
            font-weight: 700;
            color: #f59e0b;
        }

        .ai-message .message-content strong {
            color: #1f2937;
        }

        .user-message .message-content {
            background: #f59e0b;
            color: white;
        }

        .ai-message .message-content {
            background: white;
            color: #1a1a1a;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .typing-indicator {
            display: none;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            max-width: 70px;
        }

        .typing-indicator.active {
            display: block;
        }

        .typing-dots {
            display: flex;
            gap: 0.3rem;
        }

        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #9ca3af;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }

        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
        }

        /* Input Area */
        .chat-input-area {
            padding: 1.5rem;
            background: white;
            border-top: 2px solid #e5e7eb;
        }

        .quick-prompts {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .quick-prompt-btn {
            padding: 0.5rem 1rem;
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s;
            color: #1f2937;
            font-weight: 500;
        }

        .quick-prompt-btn:hover {
            background: #f59e0b;
            color: white;
            border-color: #f59e0b;
        }

        .input-wrapper {
            display: flex;
            gap: 1rem;
        }

        .chat-input {
            flex: 1;
            padding: 1rem 1.5rem;
            border: 2px solid #e5e7eb;
            border-radius: 25px;
            font-size: 1rem;
            font-family: inherit;
            transition: border-color 0.3s;
        }

        .chat-input:focus {
            outline: none;
            border-color: #f59e0b;
        }

        .send-btn {
            padding: 1rem 2rem;
            background: #f59e0b;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }

        .send-btn:hover {
            background: #d97706;
            transform: translateY(-2px);
        }

        .send-btn:disabled {
            background: #9ca3af;
            cursor: not-allowed;
            transform: none;
        }

        /* Footer */
        footer {
            background: #0f172a;
            color: white;
            padding: 3rem 5%;
            text-align: center;
            margin-top: 3rem;
        }

        footer p {
            opacity: 0.9;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .nav-links {
                display: none;
            }

            .chat-container {
                height: 500px;
            }

            .message-content {
                max-width: 85%;
            }

            .quick-prompts {
                flex-direction: column;
            }

            .input-wrapper {
                flex-direction: column;
            }

            .send-btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="logo-container">
            <img src="https://i.imgur.com/4Fl92k3.png" alt="Mass Tutoring Cat Logo">
            <a href="../index.html" class="logo-text">Mass Tutoring</a>
        </div>
        <ul class="nav-links">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../#testimonials">Testimonials</a></li>
            <li><a href="../mission">Mission</a></li>
            <li><a href="../tutors">Tutors</a></li>
            <li><a href="../guide">Free Guide</a></li>
            <li><a href="../sait">S(Ai)T</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>S(<span class="hero-ai">Ai</span>)T</h1>
            <p>Your free AI-powered SAT tutor. Ask questions, get practice problems, and improve your score.</p>
        </div>
    </section>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Features Banner -->
        <div class="features-banner">
            <div class="feature-badge">
                <div class="feature-icon">💬</div>
                <h3>Ask Any Question</h3>
            </div>
            <div class="feature-badge">
                <div class="feature-icon">📝</div>
                <h3>Get Practice Problems</h3>
            </div>
            <div class="feature-badge">
                <div class="feature-icon">🎯</div>
                <h3>Study Strategy Tips</h3>
            </div>
            <div class="feature-badge">
                <div class="feature-icon">⚡</div>
                <h3>Instant Explanations</h3>
            </div>
        </div>

        <!-- Chat Container -->
        <div class="chat-container">
            <div class="chat-header">
                <h2>Chat with S(Ai)T - Your AI SAT Tutor</h2>
            </div>

            <div class="chat-messages" id="chatMessages">
                <div class="message ai-message">
                    <div class="message-avatar">AI</div>
                    <div class="message-content">
                        Hi! I'm <strong>S(Ai)T</strong>, your AI SAT tutor. I can help you with:
                        <br><br>
                        📚 Answering SAT questions (Math, Reading & Writing)<br>
                        🎯 Creating practice problems for specific topics<br>
                        📖 Study strategies and test-taking tips<br>
                        💡 Explaining concepts you're struggling with<br>
                        <br>
                        What would you like help with today?
                    </div>
                </div>
            </div>

            <div class="chat-input-area">
                <div class="quick-prompts">
                    <button class="quick-prompt-btn" onclick="sendQuickPrompt('Generate 5 SAT math practice problems about algebra')">📐 Algebra Problems</button>
                    <button class="quick-prompt-btn" onclick="sendQuickPrompt('Explain how to use the Desmos calculator effectively on the SAT')">🖩 Desmos Tips</button>
                    <button class="quick-prompt-btn" onclick="sendQuickPrompt('Give me grammar rules for SAT Reading & Writing')">📝 Grammar Rules</button>
                    <button class="quick-prompt-btn" onclick="sendQuickPrompt('Create a study schedule for 2 months before the SAT')">📅 Study Plan</button>
                </div>

                <div class="input-wrapper">
                    <input 
                        type="text" 
                        id="userInput" 
                        class="chat-input" 
                        placeholder="Ask me anything about the SAT..."
                        onkeypress="handleKeyPress(event)"
                    >
                    <button class="send-btn" id="sendBtn" onclick="sendMessage()">Send</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
        <p style="margin-top: 1rem; opacity: 0.8;">Free tutoring by students, for students. Forever.</p>
    </footer>

    <script>
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');

        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
            
            messageDiv.innerHTML = `
                <div class="message-avatar">${isUser ? 'You' : 'AI'}</div>
                <div class="message-content">${content}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai-message';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="message-avatar">AI</div>
                <div class="typing-indicator active">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        async function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            userInput.value = '';

            // Disable input while processing
            sendBtn.disabled = true;
            userInput.disabled = true;
            showTypingIndicator();

            try {
                // Call Claude API
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1000,
                        messages: [{
                            role: 'user',
                            content: `You are S(Ai)T, an AI SAT tutor for Mass Tutoring. You help students with SAT prep by:
1. Answering questions about SAT Math, Reading & Writing
2. Creating practice problems when asked
3. Explaining concepts clearly
4. Providing study strategies and test-taking tips
5. Being encouraging and supportive

IMPORTANT FORMATTING RULES:
- Use **bold text** for key terms, important concepts, and emphasis
- Use emojis liberally to make responses engaging (📚 📝 ✅ 💡 🎯 ⭐ etc.)
- Break up long responses with line breaks for readability
- Use bullet points when listing items
- Number practice problems clearly
- For math problems, format equations clearly
- Use section headers like "**Here's how:**" or "**Key Strategy:**"
- Be warm, encouraging, and use an upbeat tone

Keep responses concise but helpful and visually appealing. When creating practice problems, format them clearly with questions and answer choices if applicable.

Student question: ${message}`
                        }]
                    })
                });

                const data = await response.json();
                removeTypingIndicator();

                // Extract text from response
                const aiResponse = data.content
                    .filter(block => block.type === 'text')
                    .map(block => block.text)
                    .join('\n\n');

                if (aiResponse) {
                    // Format the response with line breaks and bold text
                    let formattedResponse = aiResponse
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Convert **text** to bold
                        .replace(/\n/g, '<br>'); // Convert line breaks
                    
                    addMessage(formattedResponse);
                } else {
                    addMessage('I apologize, but I encountered an error. Please try again!');
                }

            } catch (error) {
                removeTypingIndicator();
                console.error('Error:', error);
                addMessage('Sorry, I encountered an error. Please try again!');
            } finally {
                // Re-enable input
                sendBtn.disabled = false;
                userInput.disabled = false;
                userInput.focus();
            }
        }

        function sendQuickPrompt(prompt) {
            userInput.value = prompt;
            sendMessage();
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Focus input on load
        window.addEventListener('load', () => {
            userInput.focus();
        });
    </script>
</body>
</html>
