<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Free SAT Study Guide - Mass Tutoring</title>
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

 nav {
 position: fixed;
 top: 0;
 width: 100%;
 background: rgba(255, 255, 255, 0.95);
 backdrop-filter: blur(10px);
 padding: 1rem 5%;
 display: flex;
 justify-content: space-between;
 align-items: center;
 z-index: 1000;
 box-shadow: 0 2px 10px rgba(0,0,0,0.05);
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
 font-weight: 500;
 transition: color 0.3s;
 }

 .nav-links a:hover {
 color: #f59e0b;
 }

 .hero {
 margin-top: 80px;
 padding: 4rem 5% 6rem;
 background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
 color: white;
 text-align: center;
 }

 .hero h1 {
 font-size: 3.5rem;
 font-weight: 900;
 margin-bottom: 1rem;
 }

 .hero p {
 font-size: 1.3rem;
 opacity: 0.9;
 }

 .guide-section {
 padding: 5rem 5%;
 max-width: 1200px;
 margin: 0 auto;
 }

 .guide-intro {
 text-align: center;
 margin-bottom: 4rem;
 }

 .guide-intro h2 {
 font-size: 2rem;
 margin-bottom: 1rem;
 color: #1f2937;
 }

 .guide-intro p {
 font-size: 1.2rem;
 color: #666;
 }

 .resources-section {
 margin-bottom: 4rem;
 }

 .resource-category {
 background: white;
 padding: 2.5rem;
 border-radius: 20px;
 box-shadow: 0 5px 20px rgba(0,0,0,0.08);
 margin-bottom: 2rem;
 }

 .resource-category h3 {
 font-size: 1.8rem;
 margin-bottom: 1.5rem;
 color: #1f2937;
 }

 .resource-category h4 {
 font-size: 1.4rem;
 margin: 1.5rem 0 1rem;
 color: #f59e0b;
 }

 .resource-category ul {
 list-style: none;
 padding-left: 0;
 }

 .resource-category li {
 padding: 0.8rem 0 0.8rem 2rem;
 position: relative;
 font-size: 1.1rem;
 color: #666;
 }

 .resource-category li:before {
 content: "✓";
 position: absolute;
 left: 0;
 color: #f59e0b;
 font-weight: bold;
 font-size: 1.2rem;
 }

 .free-badge {
 display: inline-block;
 background: #10b981;
 color: white;
 padding: 0.3rem 0.8rem;
 border-radius: 20px;
 font-size: 0.9rem;
 font-weight: 700;
 margin-left: 0.5rem;
 }

 .paid-badge {
 display: inline-block;
 background: #f59e0b;
 color: white;
 padding: 0.3rem 0.8rem;
 border-radius: 20px;
 font-size: 0.9rem;
 font-weight: 700;
 margin-left: 0.5rem;
 }

 .study-plan {
 background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
 padding: 3rem;
 border-radius: 20px;
 color: white;
 margin-bottom: 3rem;
 }

 .study-plan h3 {
 font-size: 2rem;
 margin-bottom: 2rem;
 text-align: center;
 }

 .step {
 background: rgba(255, 255, 255, 0.1);
 padding: 2rem;
 border-radius: 15px;
 margin-bottom: 1.5rem;
 }

 .step-number {
 display: inline-block;
 background: #f59e0b;
 color: white;
 width: 40px;
 height: 40px;
 border-radius: 50%;
 text-align: center;
 line-height: 40px;
 font-weight: 900;
 font-size: 1.2rem;
 margin-right: 1rem;
 }

 .step h4 {
 font-size: 1.4rem;
 margin-bottom: 1rem;
 display: inline-block;
 }

 .step p {
 margin: 0.8rem 0;
 padding-left: 3.5rem;
 opacity: 0.9;
 }

 .step ul {
 padding-left: 5.5rem;
 margin-top: 1rem;
 }

 .step li {
 margin: 0.5rem 0;
 opacity: 0.9;
 }

 .vocab-note {
 background: #fef3c7;
 border-left: 4px solid #f59e0b;
 padding: 1.5rem;
 border-radius: 10px;
 margin: 2rem 0;
 color: #1a1a1a;
 }

 .vocab-note strong {
 color: #d97706;
 }

 .cta-section {
 padding: 5rem 5%;
 background: #f8f9fa;
 text-align: center;
 }

 .cta-section h2 {
 font-size: 2.5rem;
 margin-bottom: 2rem;
 color: #1f2937;
 }

 .btn {
 padding: 1rem 2.5rem;
 font-size: 1.1rem;
 font-weight: 700;
 border-radius: 50px;
 text-decoration: none;
 transition: all 0.3s;
 border: none;
 cursor: pointer;
 display: inline-block;
 background: #f59e0b;
 color: white;
 margin: 0.5rem;
 }

 .btn:hover {
 background: #d97706;
 transform: translateY(-3px);
 box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
 }

 footer {
 background: #1a1a1a;
 color: white;
 padding: 3rem 5%;
 text-align: center;
 }

 @media (max-width: 768px) {
 .hero h1 {
 font-size: 2.5rem;
 }
 .nav-links {
 display: none;
 }
 .resource-category {
 padding: 1.5rem;
 }
 .step {
 padding: 1.5rem;
 }
 .step p, .step ul {
 padding-left: 0;
 }
 }
 </style>
</head>
<body>
 <nav>
 <a href="index.html" class="logo-text">Mass Tutoring</a>
 <ul class="nav-links">
 <li><a href="index.html">Home</a></li>
 <li><a href="index.html#problem">The Problem</a></li>
 <li><a href="index.html#testimonials">Testimonials</a></li>
 <li><a href="mission.html">Mission</a></li>
 <li><a href="guide.html">Free Guide</a></li>
 </ul>
 </nav>

 <section class="hero">
 <h1>Ultimate SAT Study Guide</h1>
 <p>Everything you need to ace the SAT, completely free</p>
 </section>

 <section class="guide-section">
 <div class="guide-intro">
 <h2>Master the SAT Without Breaking the Bank</h2>
 <p>This comprehensive guide contains all the resources and strategies you need to achieve your target score.</p>
 </div>

 <div class="resources-section">
 <div class="resource-category">
 <h3>Free Resources <span class="free-badge">$0</span></h3>
 <p style="color: #666; margin-bottom: 1.5rem;">Everything in this section costs literally $0. As long as you can make an account, everything here is accessible to anyone with access to the internet.</p>

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
 <p style="color: #666; margin-bottom: 1.5rem;">Some can be pirated for free, but we recommend supporting the authors if possible.</p>

 <h4>Recommended Books</h4>
 <ul>
 <li>Princeton Review</li>
 <li>Erica Meltzer (We HIGHLY suggest for Reading & Writing)</li>
 <li>Kaplan</li>
 </ul>
 </div>
 </div>

 <div class="study-plan">
 <h3>Example Study Plan</h3>

 <div class="step">
 <span class="step-number">1</span>
 <h4>Schedule Your Test</h4>
 <p>Find a high school nearby and schedule your test date.</p>
 <ul>
 <li>Trust me, you do not want to be driving 1 hour or more to your exam Saturday morning</li>
 <li>Try to find somewhere close by and at a good date</li>
 </ul>
 </div>

 <div class="step">
 <span class="step-number">2</span>
 <h4>Start 3 Months Before</h4>
 <p>Begin studying around 3 months before your actual test.</p>
 <ul>
 <li>This differs person-to-person and how much effort you put in per day</li>
 <li>3 months gives you plenty of time to improve significantly</li>
 </ul>
 </div>

 <div class="step">
 <span class="step-number">3</span>
 <h4>Take a Diagnostic Test</h4>
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
 <span class="step-number">4</span>
 <h4>Drill Your Weaknesses</h4>
 <p>Start drilling the types of questions you got wrong using books (ex: Erica Meltzer for grammar) or Khan Academy/Miyagi Labs.</p>
 <ul>
 <li>The best way to improve your score is working on your weaknesses</li>
 <li>Target specific question types: graphing or trigonometry for Math, summary or rhetorical analysis for R&W</li>
 </ul>

 <div class="vocab-note">
 <strong>A NOTE ON VOCABULARY PROBLEMS:</strong> This is the one section that almost everyone says you can't study for, and we agree. Unless you start studying vocab at least 6 months before or read consistently for a year, vocabulary is partially out of your control. If you're getting more than 3-5 vocab questions wrong, try using SAT Vocab lists online with Quizlet.
 </div>
 </div>

 <div class="step">
 <span class="step-number">5</span>
 <h4>Take Regular Practice Tests</h4>
 <p>Every 2-3 weeks, take another full practice test to track your progress.</p>
 <ul>
 <li>This helps you see if your studying is working</li>
 <li>Adjust your study plan based on results</li>
 <li>Don't waste all 10 Blue Book tests - save some for closer to test day</li>
 </ul>
 </div>

 <div class="step">
 <span class="step-number">6</span>
 <h4>Review and Repeat</h4>
 <p>Continue the cycle: practice, review mistakes, drill weaknesses, test again.</p>
 <ul>
 <li>Focus on understanding WHY you got questions wrong</li>
 <li>Learn the patterns in SAT questions</li>
 <li>Stay consistent with your study schedule</li>
 </ul>
 </div>
 </div>
 </section>

 <section class="cta-section">
 <h2>Need Personalized Help?</h2>
 <p style="font-size: 1.2rem; color: #666; margin-bottom: 2rem;">Get free one-on-one tutoring from experienced high schoolers who scored 1530+</p>
 <a href="https://forms.gle/your-student-form" class="btn">Get Free Tutoring</a>
 <a href="https://forms.gle/your-tutor-form" class="btn">Become a Tutor</a>
 </section>

 <footer>
 <p>&copy; 2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
 <p style="margin-top: 1rem; opacity: 0.7;">Free tutoring by students, for students. Forever.</p>
 </footer>
</body>
</html>
