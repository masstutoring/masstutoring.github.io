<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Mission - Mass Tutoring</title>
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
            padding: 5rem 5% 6rem;
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
            margin-bottom: 0.5rem;
        }

        .hero-subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
            color: #fbbf24;
        }

        /* Mission Section */
        .mission-section {
            padding: 6rem 5%;
            max-width: 1200px;
            margin: 0 auto;
        }

        .mission-intro {
            text-align: center;
            margin-bottom: 5rem;
        }

        .mission-intro p {
            font-size: 1.3rem;
            color: #4b5563;
            max-width: 900px;
            margin: 1.5rem auto;
            line-height: 1.9;
        }

        .founder-name {
            font-weight: 700;
            color: #f59e0b;
        }

        .mission-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 2.5rem;
            margin-top: 4rem;
        }

        .mission-card {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .mission-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
            border-color: #f59e0b;
        }

        .mission-card h2 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: #1f2937;
            font-weight: 700;
        }

        .mission-card p {
            font-size: 1.15rem;
            color: #4b5563;
            line-height: 1.8;
        }

        .highlight-stat {
            display: inline-block;
            background: #f59e0b;
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            margin: 0.3rem 0;
        }

        /* Founder Section */
        .founder-section {
            padding: 6rem 5%;
            background: #f8f9fa;
        }

        .founder-content {
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
        }

        .founder-content h2 {
            font-size: 2.8rem;
            margin-bottom: 4rem;
            color: #1f2937;
            font-weight: 800;
        }

        .founders-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 4rem;
            margin-bottom: 4rem;
        }

        .founder-card {
            text-align: center;
        }

        .founder-image-placeholder {
            width: 200px;
            height: 200px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 4rem;
            font-weight: 900;
            border: 5px solid #f59e0b;
            transition: all 0.3s;
        }

        .founder-card:hover .founder-image-placeholder {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }

        .founder-card h3 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            color: #1f2937;
            font-weight: 700;
        }

        .founder-card .score {
            font-size: 1.3rem;
            color: #f59e0b;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .founder-content > p {
            font-size: 1.2rem;
            color: #4b5563;
            line-height: 1.9;
            margin-bottom: 2rem;
            text-align: left;
        }

        .founder-signature {
            text-align: center;
            margin-top: 3rem;
            font-size: 1.2rem;
        }

        .founder-signature strong {
            font-size: 1.3rem;
            color: #1f2937;
        }

        /* CTA Section */
        .cta-section {
            padding: 6rem 5%;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .cta-section::before {
            content: '';
            position: absolute;
            bottom: -50%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }

        .cta-content {
            position: relative;
            z-index: 1;
        }

        .cta-section h2 {
            font-size: 2.8rem;
            margin-bottom: 2.5rem;
            font-weight: 800;
        }

        .cta-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }

        .btn {
            padding: 1.2rem 3rem;
            font-size: 1.15rem;
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

            .nav-links {
                display: none;
            }

            .mission-grid {
                grid-template-columns: 1fr;
            }

            .mission-card {
                padding: 2rem;
            }

            .founder-content h2 {
                font-size: 2.2rem;
            }

            .cta-buttons {
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
            <a href="../" class="logo-text">Mass Tutoring</a>
        </div>
        <ul class="nav-links">
            <li><a href="../">Home</a></li>
            <li><a href="../#testimonials">Testimonials</a></li>
            <li><a href="../mission">Mission</a></li>
            <li><a href="../tutors">Tutors</a></li>
            <li><a href="../guide">Free Guide</a></li>
            <li><a href="../betterq" class="nav-cta">BetterQ</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Our Mission</h1>
            <p class="hero-subtitle">Breaking down barriers to quality SAT prep</p>
        </div>
    </section>

    <!-- Mission Introduction -->
    <section class="mission-section">
        <div class="mission-intro">
            <p><span class="founder-name">Ethan Moran</span> and <span class="founder-name">Albert Wen</span>, students at Buckingham Browne & Nichols School in Cambridge, Massachusetts, founded Mass Tutoring with one mission: make SAT prep simple, accessible, and free for every student.</p>
        </div>

        <!-- Mission Cards -->
        <div class="mission-grid">
            <div class="mission-card">
                <h2>💸 Test prep is expensive.</h2>
                <p>The average cost of SAT tutoring is <span class="highlight-stat">$200+/hour</span>. Companies like Princeton Review charge upwards of $10,000 for complete prep programs. This pricing model makes quality test prep accessible only to wealthy families.</p>
            </div>

            <div class="mission-card">
                <h2>✅ You don't need to overpay to get a good score.</h2>
                <p>Our founders scored 1550 and 1560 on the SAT without any tutoring through effective study methods and dedication. We built Mass Tutoring based on the strategies that actually worked for us—not expensive gimmicks.</p>
            </div>

            <div class="mission-card">
                <h2>📚 Don't over-complicate studying for this exam.</h2>
                <p>Many students search for a "magic strategy," but the answer is straightforward: a solid study plan, consistent practice, and personalized guidance. This is the core of what we provide to each student, completely free.</p>
            </div>

            <div class="mission-card">
                <h2>🤝 Learn from tutors and peers.</h2>
                <p>We make sure each student has access to a high-scoring tutor who just took the test themselves. Our tutors know what works because they recently succeeded using these exact methods.</p>
            </div>

            <div class="mission-card">
                <h2>🎯 The SAT matters more than ever.</h2>
                <p>With many universities reinstating SAT requirements, a strong score is crucial for standing out. The average SAT score for top colleges is around <span class="highlight-stat">1500</span>, and we're here to help you reach that goal.</p>
            </div>

            <div class="mission-card">
                <h2>🌍 Economics shouldn't limit opportunity.</h2>
                <p>There's a direct correlation between family income and SAT scores—not because wealthier students are smarter, but because they can afford expensive tutoring. We're working to eliminate that gap by providing free, quality tutoring to everyone.</p>
            </div>
        </div>
    </section>

    <!-- Founder Section -->
    <section class="founder-section">
        <div class="founder-content">
            <h2>Meet the Founders</h2>

            <div class="founders-grid">
                <div class="founder-card">
                    <div class="founder-image-placeholder">EM</div>
                    <h3>Ethan Moran</h3>
                    <p class="score">SAT Superscore: 1550</p>
                </div>

                <div class="founder-card">
                    <div class="founder-image-placeholder">AW</div>
                    <h3>Albert Wen</h3>
                    <p class="score">SAT Superscore: 1560</p>
                </div>
            </div>

            <p>Hi, we're <span class="founder-name">Ethan Moran</span> and <span class="founder-name">Albert Wen</span>. In every student's journey, standardized testing plays a vital role. While the SAT definitely isn't a measure of intelligence, it is important for college admissions and can significantly impact your future opportunities.</p>

            <p>The major problem? Access to tutoring. With companies charging over $200 per hour, quality test prep simply isn't accessible to most families. When you look at the data, there's a clear trend: wealthier students score higher—not because they're smarter, but because they can afford expensive tutoring.</p>

            <p>We created Mass Tutoring to break this cycle. Both of us achieved high scores (1550 and 1560) without any paid tutoring, using effective self-study methods. By connecting experienced high school tutors (who scored 1530+ on the SAT) with students who need help, we're making quality test prep accessible to everyone, regardless of family income.</p>

            <p>Both tutors and students benefit: students get the help they need to reach their academic goals, while tutors gain valuable teaching experience, give back to their community, and help level the playing field.</p>

            <div class="founder-signature">
                <p><strong>Your goals are our goals too.</strong></p>
                <p>With care,<br><span class="founder-name">Ethan Moran & Albert Wen</span></p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="cta-content">
            <h2>Ready to start your SAT journey?</h2>
            <div class="cta-buttons">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd_44AwF3K59YjrAs7FtT8zBMCg3I9nET6Kx6Pfw5EAg9bphw/viewform" class="btn btn-primary">Get Free Tutoring</a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKoQbKU6eqq6AaF3wdkfqWPHH0u3a5ggu-5eNA_uPe2h3lWg/viewform class="btn btn-secondary">Become a Tutor</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
        <p style="margin-top: 1rem; opacity: 0.8;">Free tutoring by students, for students. Forever.</p>
    </footer>
</body>
</html>
