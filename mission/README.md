<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Our Mission - Mass Tutoring</title>
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

 .mission-section {
 padding: 5rem 5%;
 max-width: 1200px;
 margin: 0 auto;
 }

 .mission-intro {
 text-align: center;
 margin-bottom: 4rem;
 }

 .mission-intro p {
 font-size: 1.3rem;
 color: #666;
 max-width: 800px;
 margin: 1.5rem auto;
 line-height: 1.8;
 }

 .founder-name {
 font-weight: 700;
 color: #f59e0b;
 }

 .mission-grid {
 display: grid;
 gap: 3rem;
 margin-top: 4rem;
 }

 .mission-card {
 background: white;
 padding: 3rem;
 border-radius: 20px;
 box-shadow: 0 5px 20px rgba(0,0,0,0.08);
 }

 .mission-card h2 {
 font-size: 2rem;
 margin-bottom: 1rem;
 color: #1f2937;
 }

 .mission-card p {
 font-size: 1.2rem;
 color: #666;
 line-height: 1.8;
 }

 .highlight-stat {
 display: inline-block;
 background: #f59e0b;
 color: white;
 padding: 0.5rem 1rem;
 border-radius: 10px;
 font-weight: 700;
 margin: 0.5rem 0;
 }

 .founder-section {
 padding: 5rem 5%;
 background: #f8f9fa;
 }

 .founder-content {
 max-width: 900px;
 margin: 0 auto;
 text-align: center;
 }

 .founder-content h2 {
 font-size: 2.5rem;
 margin-bottom: 3rem;
 color: #1f2937;
 }

 .founders-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 gap: 3rem;
 margin-bottom: 3rem;
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
 }

 .founder-card h3 {
 font-size: 1.8rem;
 margin-bottom: 0.5rem;
 color: #1f2937;
 }

 .founder-card .score {
 font-size: 1.2rem;
 color: #f59e0b;
 font-weight: 700;
 margin-bottom: 1rem;
 }

 .founder-content p {
 font-size: 1.2rem;
 color: #666;
 line-height: 1.8;
 margin-bottom: 1.5rem;
 text-align: left;
 }

 .cta-section {
 padding: 5rem 5%;
 background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
 color: white;
 text-align: center;
 }

 .cta-section h2 {
 font-size: 2.5rem;
 margin-bottom: 2rem;
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
 .mission-card {
 padding: 2rem;
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
 </ul>
 </nav>

 <section class="hero">
 <h1>Our Mission</h1>
 </section>

 <section class="mission-section">
 <div class="mission-intro">
 <p><span class="founder-name">Ethan Moran</span> and <span class="founder-name">Albert Wen</span>, students at Buckingham Browne & Nichols School in Cambridge, Massachusetts, founded Mass Tutoring with one mission: make SAT prep simple, accessible, and free for every student.</p>
 </div>

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

 <p style="text-align: center; margin-top: 2rem;"><strong>Your goals are our goals too.</strong></p>
 <p style="text-align: center;">With care,<br><span class="founder-name">Ethan Moran & Albert Wen</span></p>
 </div>
 </section>

 <section class="cta-section">
 <h2>Ready to start your SAT journey?</h2>
 <a href="https://forms.gle/your-student-form" class="btn">Get Free Tutoring</a>
 <a href="https://forms.gle/your-tutor-form" class="btn">Become a Tutor</a>
 </section>

 <footer>
 <p>&copy; 2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
 <p style="margin-top: 1rem; opacity: 0.7;">Free tutoring by students, for students. Forever.</p>
 </footer>
</body>
</html>
