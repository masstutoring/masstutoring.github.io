<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free SAT Study Guide - Mass Tutoring</title>
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

        .hero p {
            font-size: 1.4rem;
            opacity: 0.95;
            color: #fbbf24;
        }

        /* Guide Section */
        .guide-section {
            padding: 6rem 5%;
            max-width: 1200px;
            margin: 0 auto;
        }

        .guide-intro {
            text-align: center;
            margin-bottom: 5rem;
        }

        .guide-intro h2 {
            font-size: 2.8rem;
            margin-bottom: 1rem;
            color: #1f2937;
            font-weight: 800;
        }

        .guide-intro p {
            font-size: 1.3rem;
            color: #4b5563;
            max-width: 800px;
            margin: 0 auto;
        }

        /* Resources Section */
        .resources-section {
            margin-bottom: 5rem;
        }

        .resource-category {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            margin-bottom: 2.5rem;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .resource-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
            border-color: #f59e0b;
        }

        .resource-category h3 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #1f2937;
            font-weight: 700;
        }

        .resource-category > p {
            color: #4b5563;
            margin-bottom: 2rem;
            font-size: 1.1rem;
            line-height: 1.7;
        }

        .resource-category h4 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
            color: #f59e0b;
            font-weight: 700;
        }

        .resource-category ul {
            list-style: none;
            padding-left: 0;
        }

        .resource-category li {
            padding: 0.9rem 0 0.9rem 2.5rem;
            position: relative;
            font-size: 1.15rem;
            color: #4b5563;
            line-height: 1.6;
        }

        .resource-category li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 1.4rem;
        }

        .free-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            margin-left: 1rem;
        }

        .paid-badge {
            display: inline-block;
            background: #f59e0b;
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            margin-left: 1rem;
        }

        /* Study Plan */
        .study-plan {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            padding: 4rem 3rem;
            border-radius: 20px;
            color: white;
            margin-bottom: 4rem;
            position: relative;
            overflow: hidden;
        }

        .study-plan::before {
            content: '';
            position: absolute;
            bottom: -50%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }

        .study-plan-content {
            position: relative;
            z-index: 1;
        }

        .study-plan h3 {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            text-align: center;
            font-weight: 800;
        }

        .step {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2.5rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            transition: all 0.3s;
        }

        .step:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateX(10px);
        }

        .step-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }

        .step-number {
            display: inline-block;
            background: #f59e0b;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
            font-weight: 900;
            font-size: 1.4rem;
            margin-right: 1.5rem;
            flex-shrink: 0;
        }

        .step h4 {
            font-size: 1.6rem;
            margin: 0;
            color: #fbbf24;
            font-weight: 700;
        }

        .step p {
            margin: 1rem 0;
            opacity: 0.95;
            font-size: 1.1rem;
            line-height: 1.7;
        }

        .step ul {
            padding-left: 2rem;
            margin-top: 1rem;
        }

        .step li {
            margin: 0.7rem 0;
            opacity: 0.95;
            font-size: 1.05rem;
            line-height: 1.6;
        }

        .step li:before {
            content: "•";
            color: #fbbf24;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }

        .vocab-note {
            background: #fef3c7;
            border-left: 5px solid #f59e0b;
            padding: 1.8rem;
            border-radius: 10px;
            margin: 2rem 0;
            color: #1a1a1a;
        }

        .vocab-note strong {
            color: #d97706;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .vocab-note p {
            color: #1a1a1a !important;
            opacity: 1 !important;
            margin: 0 !important;
        }

        /* CTA Section */
        .cta-section {
            padding: 6rem 5%;
            background: #f8f9fa;
            text-align: center;
        }

        .cta-section h2 {
            font-size: 2.8rem;
            margin-bottom: 1rem;
            color: #1f2937;
            font-weight: 800;
        }

        .cta-section > p {
            font-size: 1.3rem;
            color: #4b5563;
            margin-bottom: 3rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
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
            color: #1f2937;
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

            .resource-category {
                padding: 2rem;
            }

            .step {
                padding: 1.8rem;
            }

            .step-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .step-number {
                margin-bottom: 1rem;
            }

            .step ul {
                padding-left: 1.5rem;
            }

            .study-plan {
                padding: 2.5rem 1.5rem;
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
            <li><a href="../index.html#problem">The Problem</a></li>
            <li><a href="../index.html#testimonials">Testimonials</a></li>
            <li><a href="../index.html#services">Services</a></li>
            <li><a href="../mission">Mission</a></li>
            <li><a href="../guide">Free Guide</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Ultimate SAT Study Guide</h1>
            <p>Everything you need to ace the SAT, completely free</p>
        </div>
    </section>

    <!-- Guide Section -->
    <section class="guide-section">
        <div class="guide-intro">
            <h2>Master the SAT Without Breaking the Bank</h2>
            <p>This comprehensive guide contains all the resources and strategies you need to achieve your target score.</p>
        </div>

        <!-- Resources Section -->
        <div class="resources-section">
            <div class="resource-category">
                <h3>Free Resources <span class="free-badge">$0</span></h3>
                <p>Everything in this section costs literally $0. As long as you can make an account, everything here is accessible to anyone with access to the internet.</p>

                <h4>Practice Questions</h4>
                <ul>
                    <li>Queue Bank (use non-active questions only)</li>
                    <li>Khan Academy</li>
                    <li>Miyagi Labs (very powerful)</li>
                </ul>

                <h4>Video Lessons</h4>
                <ul>
                    <li>Khan Academy</li>
                </ul>

                <h4>Practice Tests</h4>
                <ul>
                    <li>Blue Book (Official College Board - only 10, so use wisely)</li>
                    <li>Princeton Review (Get at least 1 for free when you sign up)</li>
                    <li>Miyagi Labs</li>
                </ul>
            </div>

            <div class="resource-category">
                <h3>Paid Resources <span class="paid-badge">OPTIONAL</span></h3>
                <p>Some can be pirated for free, but we recommend supporting the authors if possible.</p>

                <h4>Recommended Books</h4>
                <ul>
                    <li>Princeton Review</li>
                    <li>Erica Meltzer (We HIGHLY suggest for Reading & Writing)</li>
                    <li>Kaplan</li>
                </ul>
            </div>
        </div>

        <!-- Study Plan -->
        <div class="study-plan">
            <div class="study-plan-content">
                <h3>Example Study Plan</h3>

                <div class="step">
                    <div class="step-header">
                        <span class="step-number">1</span>
                        <h4>Schedule Your Test</h4>
                    </div>
                    <p>Find a high school nearby and schedule your test date.</p>
                    <ul>
                        <li>Trust me, you do not want to be driving 1 hour or more to your exam Saturday morning</li>
                        <li>Try to find somewhere close by and at a good date</li>
                    </ul>
                </div>

                <div class="step">
                    <div class="step-header">
                        <span class="step-number">2</span>
                        <h4>Start 3 Months Before</h4>
                    </div>
                    <p>Begin studying around 3 months before your actual test.</p>
                    <ul>
                        <li>This differs person-to-person and how much effort you put in per day</li>
                        <li>3 months gives you plenty of time to improve significantly</li>
                    </ul>
                </div>

                <div class="step">
                    <div class="step-header">
                        <span class="step-number">3</span>
                        <h4>Take a Diagnostic Test</h4>
                    </div>
                    <p>The very first thing to do is take a full, timed, no-help practice test on Blue Book.</p>
                    <ul>
                        <li>This step is CRITICAL - everyone is different but here you get a benchmark/starting point</li>
                        <li>Don't worry if your first practice test isn't great</li>
                        <li>If you don't know what you need to learn, how are you going to study?</li>
                        <li>Examine the results - not so much the score, but your strengths and weaknesses</li>
                        <li>Look at Reading & Writing vs. Math, and specific subjects within each (grammar, geometry, etc.)</li>
                    </ul>
                </div>

                <div class="step">
                    <div class="step-header">
                        <span class="step-number">4</span>
                        <h4>Drill Your Weaknesses</h4>
                    </div>
                    <p>Start drilling the types of questions you got wrong using books (ex: Erica Meltzer for grammar) or Khan Academy/Miyagi Labs.</p>
                    <ul>
                        <li>The best way to improve your score is working on your weaknesses</li>
                        <li>Target specific question types: graphing or trigonometry for Math, summary or rhetorical analysis for R&W</li>
                    </ul>

                    <div class="vocab-note">
                        <strong>A NOTE ON VOCABULARY PROBLEMS:</strong>
                        <p>This is the one section that almost everyone says you can't study for, and we agree. Unless you start studying vocab at least 6 months before or read consistently for a year, vocabulary is partially out of your control. If you're getting more than 3-5 vocab questions wrong, try using SAT Vocab lists online with Quizlet.</p>
                    </div>
                </div>

                <div class="step">
                    <div class="step-header">
                        <span class="step-number">5</span>
                        <h4>Take Regular Practice Tests</h4>
                    </div>
                    <p>Every 2-3 weeks, take another full practice test to track your progress.</p>
                    <ul>
                        <li>This helps you see if your studying is working</li>
                        <li>Adjust your study plan based on results</li>
                        <li>Don't waste all 10 Blue Book tests - save some for closer to test day</li>
                    </ul>
                </div>

                <div class="step">
                    <div class="step-header">
                        <span class="step-number">6</span>
                        <h4>Review and Repeat</h4>
                    </div>
                    <p>Continue the cycle: practice, review mistakes, drill weaknesses, test again.</p>
                    <ul>
                        <li>Focus on understanding WHY you got questions wrong</li>
                        <li>Learn the patterns in SAT questions</li>
                        <li>Stay consistent with your study schedule</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <h2>Need Personalized Help?</h2>
        <p>Get free one-on-one tutoring from experienced high schoolers who scored 1530+</p>
        <div class="cta-buttons">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd_44AwF3K59YjrAs7FtT8zBMCg3I9nET6Kx6Pfw5EAg9bphw/viewform" class="btn btn-primary">Get Free Tutoring</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKoQbKU6eqq6AaF3wdkfqWPHH0u3a5ggu-5eNA_uPe2h3lWg/viewform" class="btn btn-secondary">Become a Tutor</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
        <p style="margin-top: 1rem; opacity: 0.8;">Free tutoring by students, for students. Forever.</p>
    </footer>
</body>
</html>
