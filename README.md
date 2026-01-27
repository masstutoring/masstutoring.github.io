<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mass Tutoring - Free SAT Prep by Students, For Students</title>
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
            padding: 5rem 5% 7rem;
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

        .hero-cat {
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        .hero .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.95;
            color: #fbbf24;
            font-weight: 600;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto 3rem;
            opacity: 0.95;
        }

        .cta-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 1.2rem 3rem;
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            display: inline-block;
        }

        .btn-primary {
            background: #f59e0b;
            color: white;
        }

        .btn-primary:hover {
            background: #d97706;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
        }

        .btn-secondary {
            background: transparent;
            color: white;
            border: 2px solid #f59e0b;
        }

        .btn-secondary:hover {
            background: #f59e0b;
            color: white;
            transform: translateY(-3px);
        }

        /* The Problem Section */
        .problem-section {
            padding: 6rem 5%;
            background: #f8f9fa;
        }

        .section-title {
            text-align: center;
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }

        .section-subtitle {
            text-align: center;
            font-size: 1.3rem;
            color: #666;
            margin-bottom: 4rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .problem-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .problem-card {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .problem-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
            border-color: #f59e0b;
        }

        .problem-icon {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }

        .problem-card h3 {
            font-size: 1.6rem;
            margin-bottom: 1rem;
            color: #e63946;
            font-weight: 700;
        }

        .price-highlight {
            font-size: 2.8rem;
            font-weight: 900;
            color: #e63946;
            margin: 1rem 0;
        }

        .problem-card p {
            color: #4b5563;
            line-height: 1.7;
        }

        /* Impact Stats */
        .stats-section {
            padding: 6rem 5%;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .stats-section::before {
            content: '';
            position: absolute;
            bottom: -50%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            max-width: 1000px;
            margin: 3rem auto 0;
            position: relative;
            z-index: 1;
        }

        .stat {
            padding: 2rem;
        }

        .stat-number {
            font-size: 4rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
            color: #fbbf24;
        }

        .stat-label {
            font-size: 1.2rem;
            opacity: 0.95;
        }

        /* Testimonials Section */
        .testimonials-section {
            padding: 6rem 5%;
            background: white;
            overflow: hidden;
        }

        .testimonials-container {
            display: flex;
            gap: 2rem;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding: 2rem 0;
            scrollbar-width: thin;
            scrollbar-color: #f59e0b #f8f9fa;
        }

        .testimonials-container::-webkit-scrollbar {
            height: 10px;
        }

        .testimonials-container::-webkit-scrollbar-track {
            background: #f8f9fa;
            border-radius: 10px;
        }

        .testimonials-container::-webkit-scrollbar-thumb {
            background: #f59e0b;
            border-radius: 10px;
        }

        .testimonial-card {
            min-width: 350px;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            position: relative;
        }

        .testimonial-quote {
            font-size: 1.2rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-style: italic;
        }

        .testimonial-author {
            font-weight: 700;
            color: #fbbf24;
            font-size: 1.1rem;
        }

        .quote-icon {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 3rem;
            color: rgba(245, 158, 11, 0.2);
        }

        /* Why Us Section */
        .why-us-section {
            padding: 6rem 5%;
            background: #f8f9fa;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2.5rem;
            max-width: 1200px;
            margin: 3rem auto 0;
        }

        .feature-card {
            text-align: center;
            padding: 2.5rem;
            border-radius: 20px;
            transition: all 0.3s;
            background: white;
            box-shadow: 0 3px 15px rgba(0,0,0,0.05);
        }

        .feature-card:hover {
            background: white;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .feature-icon {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #f59e0b;
            font-weight: 700;
        }

        .feature-card p {
            color: #4b5563;
            line-height: 1.7;
        }

        /* Services Section */
        .services-section {
            padding: 6rem 5%;
            background: white;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2.5rem;
            max-width: 1200px;
            margin: 3rem auto 0;
        }

        .service-card {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            transition: all 0.3s;
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .service-card h3 {
            font-size: 2rem;
            margin-bottom: 2rem;
            color: #fbbf24;
            font-weight: 700;
        }

        .service-card ul {
            list-style: none;
            padding-left: 0;
        }

        .service-card li {
            padding: 0.9rem 0;
            padding-left: 2.5rem;
            position: relative;
            font-size: 1.1rem;
            color: rgba(255,255,255,0.95);
        }

        .service-card li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 1.4rem;
        }

        /* Social Media Section */
        .social-section {
            padding: 6rem 5%;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            text-align: center;
        }

        .social-links {
            display: flex;
            gap: 2rem;
            justify-content: center;
            margin-top: 3rem;
            flex-wrap: wrap;
        }

        .social-link {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem 3rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            text-decoration: none;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .social-link:hover {
            background: rgba(245, 158, 11, 0.2);
            transform: translateY(-5px);
            border-color: #f59e0b;
        }

        .social-icon {
            font-size: 2rem;
        }

        /* Footer */
        footer {
            background: #0f172a;
            color: white;
            padding: 3rem 5%;
            text-align: center;
        }

        footer p {
            opacity: 0.9;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .hero .subtitle {
                font-size: 1.2rem;
            }

            .nav-links {
                display: none;
            }

            .section-title {
                font-size: 2.2rem;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }

            .social-links {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="logo-container">
            <img src="https://i.imgur.com/4Fl92k3.png" alt="Mass Tutoring Cat Logo">
            <span class="logo-text">Mass Tutoring</span>
        </div>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="#problem">The Problem</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="mission">Mission</a></li>
            <li><a href="guide">Free Guide</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <img src="https://i.imgur.com/4Fl92k3.png" alt="Mass Tutoring Cat" class="hero-cat">
            <h1>Free SAT Tutoring.<br>By Students, For Students.</h1>
            <p class="subtitle">Quality test prep shouldn't cost $10,000</p>
            <p>Get personalized SAT tutoring from high-scoring students (1530+) who just took the test and know exactly what works—completely free.</p>
           
            <div class="cta-buttons">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd_44AwF3K59YjrAs7FtT8zBMCg3I9nET6Kx6Pfw5EAg9bphw/viewform" class="btn btn-primary">Get Free Tutoring</a>
                <a href="guide" class="btn btn-secondary">Free SAT Guide</a>
            </div>
        </div>
    </section>

    <!-- The Problem -->
    <section id="problem" class="problem-section">
        <h2 class="section-title">The SAT Tutoring Industry is Broken</h2>
        <p class="section-subtitle">Expensive tutoring creates an unfair advantage for wealthy families</p>

        <div class="problem-grid">
            <div class="problem-card">
                <div class="problem-icon">💸</div>
                <h3>Insane Pricing</h3>
                <p class="price-highlight">$200+/hour</p>
                <p>Companies like Princeton Review charge over $200 per hour for SAT tutoring. That's $10,000+ for a full prep course.</p>
            </div>

            <div class="problem-card">
                <div class="problem-icon">📊</div>
                <h3>Wealth = Higher Scores</h3>
                <p>There's a clear correlation between family income and SAT scores. Students from families earning $200k+ score on average 200+ points higher than those from families earning under $40k.</p>
            </div>

            <div class="problem-card">
                <div class="problem-icon">🚫</div>
                <h3>Only for the Top 1%</h3>
                <p>Premium tutoring is only accessible to the wealthiest families, leaving 99% of students without affordable help—even though the SAT can determine your college future.</p>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
        <h2 class="section-title" style="color: white;">We're Changing the Game</h2>
        <div class="stats-grid">
            <div class="stat">
                <div class="stat-number">$0</div>
                <div class="stat-label">Cost Per Hour</div>
            </div>
            <div class="stat">
                <div class="stat-number">1530+</div>
                <div class="stat-label">Tutor SAT Scores</div>
            </div>
            <div class="stat">
                <div class="stat-number">100%</div>
                <div class="stat-label">Free Forever</div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="testimonials-section">
        <h2 class="section-title">What Students Say</h2>
        <p class="section-subtitle">Real results from real students</p>

        <div class="testimonials-container">
            <div class="testimonial-card">
                <div class="quote-icon">"</div>
                <p class="testimonial-quote">Mass Tutoring helped me with the Reading and Writing section and I'm doing better on the SAT now!</p>
                <p class="testimonial-author">— Pierce Seth</p>
            </div>

            <div class="testimonial-card">
                <div class="quote-icon">"</div>
                <p class="testimonial-quote">I am so much better at Desmos Math after I met with a tutor!</p>
                <p class="testimonial-author">— Langan Fisher</p>
            </div>

            <div class="testimonial-card">
                <div class="quote-icon">"</div>
                <p class="testimonial-quote">My practice Math scores increased 30 points after I met with Mass Tutoring!</p>
                <p class="testimonial-author">— Jack Reinfeld</p>
            </div>
        </div>
    </section>

    <!-- Why Us -->
    <section id="why-us" class="why-us-section">
        <h2 class="section-title">Why Students Make Better Tutors</h2>
        <p class="section-subtitle">We just took the test. We know what actually works.</p>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3>Recent Experience</h3>
                <p>Our tutors just took the digital SAT. They know the latest question formats, timing strategies, and what actually appears on test day.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🤝</div>
                <h3>Relatable Teaching</h3>
                <p>We remember what it's like to struggle with the SAT. We explain concepts in ways that actually make sense to students, not adults.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">💯</div>
                <h3>Proven Results</h3>
                <p>All our tutors scored 1530+ on the SAT. They know the strategies and shortcuts that lead to top scores—and they share them for free.</p>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section id="services" class="services-section">
        <h2 class="section-title">What We Offer</h2>
        <p class="section-subtitle">Comprehensive SAT prep, completely free</p>

        <div class="services-grid">
            <div class="service-card">
                <h3>📐 SAT Math Section</h3>
                <ul>
                    <li>Mastering the Desmos calculator</li>
                    <li>Algebra and geometry fundamentals</li>
                    <li>Time management strategies</li>
                    <li>Practice with real test questions</li>
                    <li>Test-taking tactics that work</li>
                </ul>
            </div>

            <div class="service-card">
                <h3>📚 SAT Reading & Writing</h3>
                <ul>
                    <li>Grammar rules that actually matter</li>
                    <li>Transition word strategies</li>
                    <li>Rhetorical analysis techniques</li>
                    <li>Reading comprehension shortcuts</li>
                    <li>Time management and pacing</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Social Media -->
    <section id="social" class="social-section">
        <h2 class="section-title" style="color: white;">Learn SAT Strategies on Social Media</h2>
        <p class="section-subtitle" style="color: rgba(255,255,255,0.9);">Follow us for free tutorials, practice problems, and test-taking tips</p>

        <div class="social-links">
            <a href="https://www.instagram.com/masstutoring/" target="_blank" class="social-link">
                <span class="social-icon">📸</span>
                <span>Follow on Instagram</span>
            </a>
            <a href="https://www.youtube.com/channel/UC7RMZB6gyNhiVdx7XAJ7NCQ" target="_blank" class="social-link">
                <span class="social-icon">▶️</span>
                <span>Subscribe on YouTube</span>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
        <p style="margin-top: 1rem; opacity: 0.8;">Free tutoring by students, for students. Forever.</p>
    </footer>
</body>
</html>
