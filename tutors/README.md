<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meet the Tutors - Mass Tutoring</title>
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
            margin-bottom: 1rem;
        }

        .hero-subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
            color: #fbbf24;
        }

        /* Intro Section */
        .intro-section {
            padding: 5rem 5% 3rem;
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
        }

        .intro-section h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: #1f2937;
            font-weight: 800;
        }

        .intro-section p {
            font-size: 1.2rem;
            color: #4b5563;
            line-height: 1.8;
        }

        /* Tutors Section */
        .tutors-section {
            padding: 3rem 5% 6rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .tutor-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            margin-bottom: 3rem;
            overflow: hidden;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .tutor-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
            border-color: #f59e0b;
        }

        .tutor-content {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 3rem;
            padding: 3rem;
            align-items: center;
        }

        .tutor-image-container {
            position: relative;
        }

        .tutor-image {
            width: 100%;
            height: 300px;
            border-radius: 15px;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 4rem;
            font-weight: 900;
            border: 4px solid #f59e0b;
        }

        .sat-score-badge {
            position: absolute;
            top: -15px;
            right: -15px;
            background: #f59e0b;
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 50px;
            font-weight: 900;
            font-size: 1.1rem;
            box-shadow: 0 5px 15px rgba(245, 158, 11, 0.4);
            border: 3px solid white;
        }

        .tutor-info {
            padding: 1rem 0;
        }

        .tutor-info h3 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: #1f2937;
            font-weight: 700;
        }

        .tutor-title {
            color: #f59e0b;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }

        .tutor-bio {
            font-size: 1.15rem;
            color: #4b5563;
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        .tutor-highlights {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-top: 1.5rem;
        }

        .highlight-tag {
            background: #f3f4f6;
            color: #1f2937;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 600;
        }

        /* Alternate Layout */
        .tutor-card:nth-child(even) .tutor-content {
            grid-template-columns: 1fr 300px;
        }

        .tutor-card:nth-child(even) .tutor-image-container {
            order: 2;
        }

        .tutor-card:nth-child(even) .sat-score-badge {
            right: auto;
            left: -15px;
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
            margin-bottom: 1rem;
            font-weight: 800;
        }

        .cta-section p {
            font-size: 1.3rem;
            margin-bottom: 2.5rem;
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
        @media (max-width: 968px) {
            .tutor-content,
            .tutor-card:nth-child(even) .tutor-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .tutor-image-container,
            .tutor-card:nth-child(even) .tutor-image-container {
                order: 1;
            }

            .tutor-info {
                order: 2;
            }

            .sat-score-badge {
                top: 10px;
                right: 10px;
            }

            .tutor-card:nth-child(even) .sat-score-badge {
                left: auto;
                right: 10px;
            }
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .nav-links {
                display: none;
            }

            .tutor-content {
                padding: 2rem;
            }

            .tutor-image {
                height: 250px;
            }

            .intro-section h2 {
                font-size: 2rem;
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
            <h1>Meet the Tutors</h1>
            <p class="hero-subtitle">High-scoring students passionate about helping you succeed</p>
        </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section">
        <h2>Learn from the Best</h2>
        <p>Our tutors are all high school students who recently took the SAT and scored 1530+. They know exactly what it takes to succeed on the test and are excited to share their knowledge with you—completely free.</p>
    </section>

    <!-- Tutors Section -->
    <section class="tutors-section">
        <!-- Alec Liu -->
        <div class="tutor-card">
            <div class="tutor-content">
                <div class="tutor-image-container">
                    <div class="tutor-image">AL</div>
                    <div class="sat-score-badge">1540</div>
                </div>
                <div class="tutor-info">
                    <h3>Alec Liu</h3>
                    <div class="tutor-title">Junior at BB&N</div>
                    <p class="tutor-bio">
                        Hi, I'm Alec Liu and I'm a junior at BB&N. I have taken a 1540 on the SAT. My favorite subject in school is history. I like soccer, tennis, video games, and cooking.
                    </p>
                    <div class="tutor-highlights">
                        <span class="highlight-tag">⚽ Soccer</span>
                        <span class="highlight-tag">🎾 Tennis</span>
                        <span class="highlight-tag">🎮 Video Games</span>
                        <span class="highlight-tag">🍳 Cooking</span>
                        <span class="highlight-tag">📚 History Enthusiast</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Andreas Bai -->
        <div class="tutor-card">
            <div class="tutor-content">
                <div class="tutor-image-container">
                    <div class="tutor-image">AB</div>
                    <div class="sat-score-badge">1570</div>
                </div>
                <div class="tutor-info">
                    <h3>Andreas Bai</h3>
                    <div class="tutor-title">Junior at BB&N • Quiz Show Captain</div>
                    <p class="tutor-bio">
                        Andreas Bai is a current junior at BB&N, who achieved a 1570 (770 R&W, 800 M) on the June 2025 SAT, as well as a 1500 (740 R&W, 760 M) on the October 2024 PSAT. He is currently the captain of BB&N's trivia team, having led them to a 2nd place finish out of more than 60 schools in GBH's High School Quiz Show. Aside from this, he also plays bassoon for Boston Youth Symphony Orchestras, composes, volunteers at JS US Taekwondo in Belmont, and rows. In his free time, he enjoys reading random articles on Wikipedia and doing crosswords.
                    </p>
                    <div class="tutor-highlights">
                        <span class="highlight-tag">🧠 Trivia Captain</span>
                        <span class="highlight-tag">🎵 Bassoon Player</span>
                        <span class="highlight-tag">🥋 Taekwondo Volunteer</span>
                        <span class="highlight-tag">🚣 Rowing</span>
                        <span class="highlight-tag">📰 Wikipedia Reader</span>
                        <span class="highlight-tag">🧩 Crossword Enthusiast</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alex Hu -->
        <div class="tutor-card">
            <div class="tutor-content">
                <div class="tutor-image-container">
                    <div class="tutor-image">AH</div>
                    <div class="sat-score-badge">1540</div>
                </div>
                <div class="tutor-info">
                    <h3>Alex Hu</h3>
                    <div class="tutor-title">Junior at BB&N • Science Olympiad Leader</div>
                    <p class="tutor-bio">
                        Hi, I'm Alex Hu, and I'm a junior attending BB&N. I have taken the SAT 4 times, with scores of 1410, 1500, 1510, and 1540. I also play basketball, chess, and I run the Science Olympiad Club with fellow tutor Albert. I also have 2 cats, and I play a plethora of video games.
                    </p>
                    <div class="tutor-highlights">
                        <span class="highlight-tag">🏀 Basketball</span>
                        <span class="highlight-tag">♟️ Chess</span>
                        <span class="highlight-tag">🔬 Science Olympiad</span>
                        <span class="highlight-tag">🐱 Cat Lover</span>
                        <span class="highlight-tag">🎮 Video Games</span>
                        <span class="highlight-tag">📈 Persistent Improver</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="cta-content">
            <h2>Ready to Work with Our Tutors?</h2>
            <p>Get personalized, one-on-one SAT tutoring completely free</p>
            <div class="cta-buttons">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd_44AwF3K59YjrAs7FtT8zBMCg3I9nET6Kx6Pfw5EAg9bphw/viewform" class="btn btn-primary">Get Free Tutoring</a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKoQbKU6eqq6AaF3wdkfqWPHH0u3a5ggu-5eNA_uPe2h3lWg/viewform" class="btn btn-secondary">Become a Tutor</a>
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
