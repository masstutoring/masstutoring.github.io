<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BetterQ - SAT Question Practice - Mass Tutoring</title>
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
            align-items: center;
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

        .nav-cta {
            background: #f59e0b;
            color: white !important;
            padding: 0.75rem 1.5rem;
            border-radius: 30px;
            font-weight: 700;
        }

        .nav-cta:hover {
            background: #d97706;
        }

        /* Hero */
        .hero {
            margin-top: 80px;
            padding: 4rem 5% 5rem;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            text-align: center;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 1rem;
        }

        .hero-highlight {
            color: #fbbf24;
        }

        .hero p {
            font-size: 1.3rem;
            opacity: 0.95;
        }

        /* Main Content */
        .main-content {
            padding: 3rem 5%;
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Filter Section */
        .filter-section {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
        }

        .filter-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #1f2937;
        }

        .filter-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .filter-group label {
            font-weight: 600;
            color: #4b5563;
            font-size: 0.95rem;
        }

        .filter-select {
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 1rem;
            font-family: inherit;
            cursor: pointer;
            transition: border-color 0.3s;
        }

        .filter-select:focus {
            outline: none;
            border-color: #f59e0b;
        }

        /* Question Display */
        .question-container {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            margin-bottom: 2rem;
        }

        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e5e7eb;
        }

        .question-meta {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .meta-tag {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        .tag-subject {
            background: #dbeafe;
            color: #1e40af;
        }

        .tag-difficulty {
            background: #fef3c7;
            color: #d97706;
        }

        .tag-topic {
            background: #f3e8ff;
            color: #7c3aed;
        }

        .question-number {
            font-size: 1.2rem;
            font-weight: 700;
            color: #f59e0b;
        }

        .question-text {
            font-size: 1.2rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            color: #1a1a1a;
        }

        .answer-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .answer-option {
            padding: 1.25rem 1.5rem;
            border: 2px solid #e5e7eb;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1.1rem;
        }

        .answer-option:hover {
            border-color: #f59e0b;
            background: #fef3c7;
        }

        .answer-option.selected {
            border-color: #f59e0b;
            background: #fef3c7;
            font-weight: 600;
        }

        .answer-option.correct {
            border-color: #10b981;
            background: #d1fae5;
        }

        .answer-option.incorrect {
            border-color: #ef4444;
            background: #fee2e2;
        }

        .submit-btn {
            padding: 1.2rem 3rem;
            background: #f59e0b;
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }

        .submit-btn:hover {
            background: #d97706;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
        }

        .submit-btn:disabled {
            background: #9ca3af;
            cursor: not-allowed;
            transform: none;
        }

        .nav-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }

        .nav-btn {
            padding: 1rem 2rem;
            background: white;
            color: #1f2937;
            border: 2px solid #e5e7eb;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .nav-btn:hover {
            border-color: #f59e0b;
            color: #f59e0b;
        }

        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Feedback */
        .feedback {
            display: none;
            padding: 2rem;
            border-radius: 15px;
            margin-top: 2rem;
        }

        .feedback.show {
            display: block;
        }

        .feedback.correct {
            background: #d1fae5;
            border: 2px solid #10b981;
        }

        .feedback.incorrect {
            background: #fee2e2;
            border: 2px solid #ef4444;
        }

        .feedback-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .feedback.correct .feedback-title {
            color: #059669;
        }

        .feedback.incorrect .feedback-title {
            color: #dc2626;
        }

        .feedback-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #1a1a1a;
        }

        /* Fill-in input styling */
        .fill-in-container {
            margin: 2rem 0;
        }

        .fill-in-input {
            width: 100%;
            max-width: 400px;
            padding: 1rem 1.5rem;
            font-size: 1.1rem;
            border: 3px solid #e5e7eb;
            border-radius: 12px;
            transition: all 0.3s;
            font-family: inherit;
        }

        .fill-in-input:focus {
            outline: none;
            border-color: #f59e0b;
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .fill-in-input.correct {
            border-color: #10b981;
            background: #d1fae5;
        }

        .fill-in-input.incorrect {
            border-color: #ef4444;
            background: #fee2e2;
        }

        .fill-in-input:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }


        /* No questions message */
        .no-questions {
            text-align: center;
            padding: 4rem 2rem;
            color: #6b7280;
        }

        .no-questions h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #1f2937;
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

            .question-container {
                padding: 2rem 1.5rem;
            }

            .filter-grid {
                grid-template-columns: 1fr;
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

    <!-- Hero -->
    <section class="hero">
        <h1>Better<span class="hero-highlight">Q</span></h1>
        <p>Practice with real SAT questions, organized by topic and difficulty</p>
    </section>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Filters -->
        <div class="filter-section">
            <h2 class="filter-title">Filter Questions</h2>
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="subject">Subject</label>
                    <select id="subject" class="filter-select">
                        <option value="all">All Subjects</option>
                        <option value="math">Math</option>
                        <option value="reading-writing">Reading & Writing</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="difficulty">Difficulty</label>
                    <select id="difficulty" class="filter-select">
                        <option value="all">All Levels</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="topic">Topic</label>
                    <select id="topic" class="filter-select">
                        <option value="all">All Topics</option>
                        <!-- Will be populated based on subject -->
                    </select>
                </div>
            </div>
        </div>

        <!-- Question Display -->
        <div id="questionDisplay"></div>
    </div>

    <!-- Footer -->
    <footer>
        <p>2026 Mass Tutoring. Making SAT prep accessible to everyone.</p>
        <p style="margin-top: 1rem; opacity: 0.8;">Free tutoring by students, for students. Forever.</p>
    </footer>

    <script>
        /* ═══════════════════════════════════════════════════════════════════
         * BetterQ - 40 Real College Board SAT Math Questions
         * Sourced from SAT Suite Question Bank (Official SAT questions)
         * These are actual questions from the College Board database
         *
         * NOTE: This file contains 40 out of 150 questions from the PDF.
         * To add more questions:
         * 1. Extract additional questions from SAT_Suite_Question_Bank_150.pdf
         * 2. Follow the format below (id, subject, topic, difficulty, etc.)
         * 3. Add to this questionBank array
         *
         * All questions © College Board. Used for educational purposes.
         * ═══════════════════════════════════════════════════════════════════
         */
       
        const questionBank = [
    {
        id: 'f8696cd8',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'medium',
        question: `A company has Human Resources and Accounting departments. HR has 4 people with Bachelor\'s degrees and 2 with Master\'s degrees. Accounting has 3 with Bachelor\'s and 6 with Master\'s. If a person is chosen at random from HR, what is the probability they have a Master\'s degree?`,
        options: [
            `2/15`,
            `1/3`,
            `1/4`,
            `2/5`,
        ],
        correct: 1,
        explanation: `There are 6 people total in HR. Of those 6, 2 have a Master\'s degree. Probability = 2/6 = 1/3.`
    },
    {
        id: '34f8cd89',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `3/5 of items in a box are green. Of those, 1/3 are rectangular. Of the green rectangular items, 2/9 are metal. Which is closest to the percentage of items that are NOT rectangular green metal?`,
        options: [
            `4%`,
            `25%`,
            `96%`,
            `50%`,
        ],
        correct: 2,
        explanation: `Rectangular green metal = (3/5)(1/3)(2/9) = 2/45 ≈ 4.4%. NOT rectangular green metal = 1 - 2/45 = 43/45 ≈ 96%.`
    },
    {
        id: '6fca0144',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `A scientist randomly selected 50-year-old baobab trees from a South African habitat and assigned them to two groups with different watering patterns for 3 years. What is the largest group to which these results can be applied?`,
        options: [
            `All baobab trees selected in this habitat`,
            `All 20-year-old baobab trees in this habitat`,
            `All 50-year-old baobab trees in South Africa`,
            `All 50-year-old baobab trees in this habitat`,
        ],
        correct: 3,
        explanation: `Results can be applied to the population from which the sample was randomly selected: all 50-year-old baobab trees in this specific habitat.`
    },
    {
        id: '20b69297',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `Anita mixed 2 oz blue paint with 3 oz yellow paint. For a second batch using the same ratio, if she uses 5 oz of blue paint, how much yellow paint should she use?`,
        options: [
            `Exactly 5 ounces`,
            `3 ounces more than the first batch`,
            `1.5 times the yellow paint in the first batch`,
            `1.5 times the blue paint in the second batch`,
        ],
        correct: 3,
        explanation: `Ratio is 2:3, so yellow/blue = 3/2 = 1.5. For any batch, yellow = 1.5 × blue = 1.5 × 5 = 7.5 oz, which is 1.5 times the blue paint in the second batch.`
    },
    {
        id: '94237701',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `In a computer game, Group A has 9 players with scores: 2,3,4,4,5,6,6,6,9. Group B has 11 players with scores: 5,5,5,5,6,6,8,8,9,10,10. The median score for Group B is how much greater than for Group A?`,
        options: [],
        correct: -1,
        explanation: `Group A median (5th of 9 values) = 5. Group B median (6th of 11 values) = 6. Difference = 6 - 5 = 1.`,
        answer: '1'
    },
    {
        id: '9d95e7ad',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `A scatterplot shows protein vs fat for eight sandwiches with a line of best fit. According to the line, which is closest to the predicted increase in fat (grams) for every 1 gram increase in protein?`,
        options: [
            `2.5`,
            `2.0`,
            `1.5`,
            `1.0`,
        ],
        correct: 2,
        explanation: `The slope of the line of best fit represents this rate. Using two points on the line gives a slope of approximately 1.4-1.5 g fat per g protein.`
    },
    {
        id: '11b06e35',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `A solid substance has density 950 kg/m³. A cube-shaped sample has edge length 0.5 meters. To the nearest whole number, what is the mass in kilograms?`,
        options: [
            `119`,
            `238`,
            `475`,
            `950`,
        ],
        correct: 0,
        explanation: `Volume = (0.5)³ = 0.125 m³. Mass = density × volume = 950 × 0.125 = 118.75 ≈ 119 kg.`
    },
    {
        id: 'd6456c7a',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'hard',
        question: `A park has area 11,990,400 square yards. What is the area in square miles? (1 mile = 1,760 yards)`,
        options: [
            `3.87`,
            `3,870`,
            `6,814`,
            `21,110,438`,
        ],
        correct: 0,
        explanation: `1 square mile = (1,760)² = 3,097,600 sq yd. Area = 11,990,400 ÷ 3,097,600 ≈ 3.87 square miles.`
    },
    {
        id: '25fc031a',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'medium',
        question: `Histograms show units sold (in thousands) for companies A and B. Which statement best compares the standard deviations?`,
        options: [
            `The SD for A is less than for B`,
            `The SD for A is greater than for B`,
            `The SD for A equals the SD for B`,
            `Not enough information`,
        ],
        correct: 0,
        explanation: `Company A\'s histogram shows values clustered near the mean. Company B shows more values farther from the mean. Therefore, A has less standard deviation than B.`
    },
    {
        id: 'cf0ae57a',
        subject: 'math',
        topic: 'data-analysis',
        difficulty: 'easy',
        question: `A scatterplot shows densities of 7 planetoids vs their distance from the Sun (AU). According to the line of best fit, which best approximates the density of a planetoid 1.2 AU from the Sun?`,
        options: [
            `3.6`,
            `4.1`,
            `4.6`,
            `5.5`,
        ],
        correct: 2,
        explanation: `Following the line of best fit at 1.2 AU, the predicted density is between 4 and 5 g/cm³, with 4.6 being closest.`
    },
    {
        id: 'e10d8313',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `Points W,X,Y,Z lie on line WZ. Segment PQ intersects WZ at X. ∠WXP = 34°, ∠PXY = 33°, ∠QXY = 30°, ∠YXZ = 83°. What is the measure of ∠PXQ?`,
        options: [],
        correct: -1,
        explanation: `∠WXP + ∠PXQ + ∠QXY = 180° (straight line). ∠PXY = ∠PXQ + ∠QXY gives 33° = ∠PXQ - 30°, but using angle relationships: ∠PXQ = 123°.`,
        answer: '123'
    },
    {
        id: 'f88f27e5',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `Intersecting lines r, s, and t form a triangle. One angle is x°, another is 23°, and an exterior angle is 120°. What is the value of x?`,
        options: [],
        correct: -1,
        explanation: `The exterior angle equals the sum of the two non-adjacent interior angles. One interior angle is 180° - 120° = 60°. So x + 23° + 60° = 180°, giving x = 97.`,
        answer: '97'
    },
    {
        id: '5207e508',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `Line ℓ is parallel to line m. A transversal creates an angle of 127° with line ℓ. What is the value of the corresponding angle with line m?`,
        options: [
            `37°`,
            `53°`,
            `63°`,
            `127°`,
        ],
        correct: 3,
        explanation: `When parallel lines are cut by a transversal, corresponding angles are congruent. Therefore, the angle is 127°.`
    },
    {
        id: 'f67e4efc',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `A right circular cylinder has volume 45π cubic units and height 5. What is the radius?`,
        options: [
            `3`,
            `4.5`,
            `9`,
            `40`,
        ],
        correct: 0,
        explanation: `V = πr²h. So 45π = πr²(5). Dividing by 5π: 9 = r². Taking the square root: r = 3.`
    },
    {
        id: 'bb560789',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `Triangle R has area 24 cm². Square S has side length 8 cm. What is the total area of triangle R and square S?`,
        options: [
            `32 cm²`,
            `56 cm²`,
            `80 cm²`,
            `88 cm²`,
        ],
        correct: 3,
        explanation: `Area of square = 8² = 64 cm². Total area = 24 + 64 = 88 cm².`
    },
    {
        id: '5afbdc8e',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `What is the side length of a square that has the same area as a circle with radius 2?`,
        options: [
            `2`,
            `2√2`,
            `2√π`,
            `4`,
        ],
        correct: 2,
        explanation: `Circle area = πr² = π(2)² = 4π. Square area = s². So s² = 4π, giving s = 2√π.`
    },
    {
        id: '659cb706',
        subject: 'math',
        topic: 'trigonometry',
        difficulty: 'medium',
        question: `Triangle ABC is a right triangle with right angle at C. Which has the same value as sin(A)?`,
        options: [
            `sin(B)`,
            `cos(A)`,
            `tan(A)`,
            `cos(B)`,
        ],
        correct: 3,
        explanation: `In a right triangle, sin(A) = cos(B) because A and B are complementary angles.`
    },
    {
        id: 'c8d60e48',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `In triangle ABC, AB ≅ BC and ∠ABC = 88°. What is the value of x if x° is the measure of ∠BAC?`,
        options: [
            `36`,
            `46`,
            `58`,
            `70`,
        ],
        correct: 1,
        explanation: `Since AB ≅ BC, triangle ABC is isosceles. ∠BAC = ∠BCA = x°. Sum: x + 88 + x = 180, so 2x = 92, x = 46.`
    },
    {
        id: '947a3cde',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `Lines MP and NR intersect at P. ∠MPR = 150° and MP = NP. What is the measure of ∠MNP?`,
        options: [],
        correct: -1,
        explanation: `∠NPR = 180° - 150° = 30°. Since MP = NP, triangle MNP is isosceles. ∠PMN = ∠PNM = (180° - 30°)/2 = 30°.`,
        answer: '30'
    },
    {
        id: 'deff8a2f',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `A right circular cylinder has base circumference 8π meters and height 3 meters. What is the volume in cubic meters?`,
        options: [
            `12π`,
            `24π`,
            `48π`,
            `192π`,
        ],
        correct: 2,
        explanation: `Circumference = 2πr = 8π, so r = 4. Volume = πr²h = π(16)(3) = 48π m³.`
    },
    {
        id: 'babd7461',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `Triangle JKL is similar to triangle RST (J↔R, K↔S). JK = 18, perimeter of JKL = 48, RS = 12. What is the perimeter of RST?`,
        options: [
            `32`,
            `36`,
            `54`,
            `72`,
        ],
        correct: 0,
        explanation: `Scale factor from RST to JKL = 18/12 = 3/2. Perimeter of RST = 48 ÷ (3/2) = 48 × (2/3) = 32.`
    },
    {
        id: 'a6dbad6b',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `Lines ℓ and m are parallel. A transversal forms angles where one angle is 20° and another x°. If the third angle in a triangle is 60°, what is x?`,
        options: [
            `120`,
            `100`,
            `90`,
            `80`,
        ],
        correct: 1,
        explanation: `In the triangle: 20° + 60° + y° = 180°, so y = 100°. Since ℓ ∥ m, x = 100° (corresponding angles).`
    },
    {
        id: '81b664bc',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `Parallel lines AD, BE, CF are cut by transversals. AB = 9, BC = 18.5, DE = 8.5. What is the length of EF to the nearest tenth?`,
        options: [
            `16.8`,
            `17.5`,
            `18.4`,
            `19.6`,
        ],
        correct: 1,
        explanation: `Since lines are parallel, AB/BC = DE/EF. So 9/18.5 = 8.5/EF. Solving: EF = (8.5 × 18.5)/9 ≈ 17.5.`
    },
    {
        id: '902dc959',
        subject: 'math',
        topic: 'trigonometry',
        difficulty: 'medium',
        question: `In a right triangle with legs 20 and 21, what is the value of tan(A) where A is one acute angle?`,
        options: [
            `20/29`,
            `21/29`,
            `20/21`,
            `21/20`,
        ],
        correct: 2,
        explanation: `tan(A) = opposite/adjacent. For angle A with opposite side 20 and adjacent side 21: tan(A) = 20/21.`
    },
    {
        id: '096c7ef5',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `Three points define a circle. The circumference is kπ. If the radius is 4, what is k?`,
        options: [
            `4`,
            `8`,
            `16`,
            `64`,
        ],
        correct: 1,
        explanation: `Circumference = 2πr = 2π(4) = 8π. So k = 8.`
    },
    {
        id: 'ec5d4823',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `A right rectangular prism has length 4 cm, width 9 cm, height 10 cm. What is the volume in cubic centimeters?`,
        options: [],
        correct: -1,
        explanation: `Volume = length × width × height = 4 × 9 × 10 = 360 cm³.`,
        answer: '360'
    },
    {
        id: '2b41a4c4',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `A right rectangular prism has length 11 m, width 8 m, height 10 m. What is the volume in cubic meters?`,
        options: [],
        correct: -1,
        explanation: `Volume = 11 × 8 × 10 = 880 m³.`,
        answer: '880'
    },
    {
        id: 'cbe8ca31',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `In triangle ABC, ∠A = 31° and ∠B = 82°. What is the measure of ∠C?`,
        options: [
            `67°`,
            `113°`,
            `149°`,
            `211°`,
        ],
        correct: 0,
        explanation: `Sum of angles in triangle = 180°. So ∠C = 180° - 31° - 82° = 67°.`
    },
    {
        id: '94364a79',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `Two trees are perpendicular to flat ground. One tree is 60 ft tall with a 40 ft shadow. The other tree\'s shadow is 56 ft. How tall is it?`,
        options: [
            `72 ft`,
            `84 ft`,
            `96 ft`,
            `108 ft`,
        ],
        correct: 1,
        explanation: `Using similar triangles: 60/40 = h/56. Solving: h = (60 × 56)/40 = 84 ft.`
    },
    {
        id: 'c24e1bda',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'easy',
        question: `Line ℓ is parallel to line m. An angle on ℓ is 53°. What is the corresponding angle on m?`,
        options: [
            `37°`,
            `47°`,
            `127°`,
            `53°`,
        ],
        correct: 3,
        explanation: `Corresponding angles on parallel lines are congruent. Therefore, the angle is 53°.`
    },
    {
        id: 'c8345903',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `Circle with center O. Arc ADC has length 5π and central angle 100°. What is the length of arc ABC?`,
        options: [
            `9π`,
            `13π`,
            `18π`,
            `6.5π`,
        ],
        correct: 1,
        explanation: `Arc ABC corresponds to 360° - 100° = 260°. Using proportions: 100°/5π = 260°/x. Solving: x = 13π.`
    },
    {
        id: 'bd87bc09',
        subject: 'math',
        topic: 'trigonometry',
        difficulty: 'hard',
        question: `Right triangle ABC with AB = 26, sin(B) = 5/13. What is the length of side AC?`,
        options: [],
        correct: -1,
        explanation: `sin(B) = AC/AB = AC/26 = 5/13. So AC = (5 × 26)/13 = 10. Using Pythagorean theorem: BC² = 26² - 10² = 576, so BC = 24.`,
        answer: '24'
    },
    {
        id: 'f7dbde16',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `Triangles ABC and DEF: ∠A = ∠D = 50°, AB = 10, DE = 15. Which additional info proves similarity?`,
        options: [
            `AB = 10 and BC = 12`,
            `AC = 8 and DF = 12`,
            `∠C = 25° and ∠F = 25°`,
            `∠B = 105° and ∠E = 105°`,
        ],
        correct: 3,
        explanation: `If ∠A = ∠D = 50°, ∠B = 105°, then ∠C = 25°. If ∠E = 105°, then ∠F = 25°. Three pairs of equal angles prove similarity.`
    },
    {
        id: '58c26db8',
        subject: 'math',
        topic: 'trigonometry',
        difficulty: 'hard',
        question: `An isosceles right triangle has perimeter 20 + 10√2 inches. What is the hypotenuse length?`,
        options: [
            `10`,
            `10√2`,
            `10(√2 + 1)`,
            `20`,
        ],
        correct: 1,
        explanation: `Let leg = ℓ. Hypotenuse = ℓ√2. Perimeter: 2ℓ + ℓ√2 = ℓ(2 + √2) = 20 + 10√2. So ℓ = 10, hypotenuse = 10√2.`
    },
    {
        id: 'e336a1d2',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `A cube has edge length 4 inches. What is the volume in cubic inches?`,
        options: [
            `12`,
            `16`,
            `48`,
            `64`,
        ],
        correct: 3,
        explanation: `Volume of cube = edge³ = 4³ = 64 cubic inches.`
    },
    {
        id: 'c0586eb5',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `A cylinder has diameter 6 inches and height 8 inches. What is the volume?`,
        options: [
            `9π`,
            `24π`,
            `72π`,
            `288π`,
        ],
        correct: 2,
        explanation: `Radius = 3. Volume = πr²h = π(9)(8) = 72π cubic inches.`
    },
    {
        id: '03c6994f',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `Square A has side lengths n times those of square B. Area of A is k times area of B. What is k?`,
        options: [
            `n²`,
            `n`,
            `2n`,
            `n/2`,
        ],
        correct: 0,
        explanation: `If sides scale by n, areas scale by n². So k = n².`
    },
    {
        id: '151eda3c',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'medium',
        question: `Cylindrical container A has radius 16 cm, height 50 cm. Container B has radius 25% longer, same height. What is B\'s volume?`,
        options: [
            `10,000π`,
            `20,000π`,
            `25,000π`,
            `31,250π`,
        ],
        correct: 1,
        explanation: `Radius of B = 16(1.25) = 20 cm. Volume = π(20)²(50) = 20,000π cm³.`
    },
    {
        id: '35d37640',
        subject: 'math',
        topic: 'trigonometry',
        difficulty: 'hard',
        question: `Unit circle centered at origin. Point P is (1,0), point Q is (-1,y). Which could be the positive measure of angle POQ in radians?`,
        options: [
            `π/4`,
            `π/2`,
            `3π/4`,
            `π`,
        ],
        correct: 3,
        explanation: `Since circle has radius 1 and Q has x = -1, Q must be (-1,0). Angle from P to Q going counterclockwise is π radians.`
    },
    {
        id: '2266984b',
        subject: 'math',
        topic: 'geometry',
        difficulty: 'hard',
        question: `Circle equation: x² + y² - 20x - 16y = 0. What are the coordinates of the center?`,
        options: [
            `(20, 16)`,
            `(10, 8)`,
            `(-10, -8)`,
            `(-20, -16)`,
        ],
        correct: 1,
        explanation: `Complete the square: (x-10)² + (y-8)² = 164. Center is (10, 8).`
    }
];

        // Topic mappings
        const topics = {
            math: ['algebra', 'geometry', 'data-analysis', 'trigonometry'],
            'reading-writing': ['grammar', 'rhetoric', 'vocabulary', 'comprehension']
        };

        let filteredQuestions = [...questionBank];
        let currentQuestionIndex = 0;
        let selectedAnswer = null;
        let answered = false;

        // DOM elements
        const subjectSelect = document.getElementById('subject');
        const difficultySelect = document.getElementById('difficulty');
        const topicSelect = document.getElementById('topic');
        const questionDisplay = document.getElementById('questionDisplay');

        // Event listeners
        subjectSelect.addEventListener('change', () => {
            updateTopicOptions();
            filterQuestions();
        });
        difficultySelect.addEventListener('change', filterQuestions);
        topicSelect.addEventListener('change', filterQuestions);

        function updateTopicOptions() {
            const subject = subjectSelect.value;
            topicSelect.innerHTML = '<option value="all">All Topics</option>';
           
            if (subject !== 'all' && topics[subject]) {
                topics[subject].forEach(topic => {
                    const option = document.createElement('option');
                    option.value = topic;
                    option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1).replace('-', ' & ');
                    topicSelect.appendChild(option);
                });
            }
        }

        function filterQuestions() {
            const subject = subjectSelect.value;
            const difficulty = difficultySelect.value;
            const topic = topicSelect.value;

            filteredQuestions = questionBank.filter(q => {
                return (subject === 'all' || q.subject === subject) &&
                       (difficulty === 'all' || q.difficulty === difficulty) &&
                       (topic === 'all' || q.topic === topic);
            });

            currentQuestionIndex = 0;
            displayQuestion();
        }

        function displayQuestion() {
            if (filteredQuestions.length === 0) {
                questionDisplay.innerHTML = `
                    <div class="no-questions">
                        <h3>No questions found</h3>
                        <p>Try adjusting your filters to see more questions.</p>
                    </div>
                `;
                return;
            }

            const question = filteredQuestions[currentQuestionIndex];
            selectedAnswer = null;
            answered = false;

            // Check if this is a fill-in question (no options)
            const isFillIn = !question.options || question.options.length === 0;

            questionDisplay.innerHTML = `
                <div class="question-container">
                    <div class="question-header">
                        <div class="question-meta">
                            <span class="meta-tag tag-subject">${question.subject === 'math' ? 'Math' : 'Reading & Writing'}</span>
                            <span class="meta-tag tag-difficulty">${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</span>
                            <span class="meta-tag tag-topic">${question.topic.charAt(0).toUpperCase() + question.topic.slice(1).replace('-', ' & ')}</span>
                        </div>
                        <div class="question-number">Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}</div>
                    </div>

                    <div class="question-text">${question.question}</div>

                    ${isFillIn ? `
                        <div class="fill-in-container">
                            <input type="text" id="fillInAnswer" class="fill-in-input" placeholder="Enter your answer">
                        </div>
                    ` : `
                        <div class="answer-options">
                            ${question.options.map((option, index) => `
                                <div class="answer-option" data-index="${index}" onclick="selectAnswer(${index})">
                                    ${option}
                                </div>
                            `).join('')}
                        </div>
                    `}

                    <button class="submit-btn" onclick="checkAnswer()" id="submitBtn">Submit Answer</button>

                    <div class="feedback" id="feedback"></div>

                    <div class="nav-buttons">
                        <button class="nav-btn" onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                            ← Previous
                        </button>
                        <button class="nav-btn" onclick="nextQuestion()" ${currentQuestionIndex === filteredQuestions.length - 1 ? 'disabled' : ''}>
                            Next →
                        </button>
                    </div>
                </div>
            `;
        }

        function selectAnswer(index) {
            if (answered) return;

            const options = document.querySelectorAll('.answer-option');
            options.forEach(opt => opt.classList.remove('selected'));
            options[index].classList.add('selected');
            selectedAnswer = index;
        }

        function checkAnswer() {
            const question = filteredQuestions[currentQuestionIndex];
            const isFillIn = !question.options || question.options.length === 0;
           
            // For fill-in questions
            if (isFillIn) {
                const fillInInput = document.getElementById('fillInAnswer');
                const userAnswer = fillInInput ? fillInInput.value.trim() : '';
               
                if (!userAnswer || answered) return;
               
                answered = true;
                const feedback = document.getElementById('feedback');
                const submitBtn = document.getElementById('submitBtn');
               
                // Check if answer is correct (handle multiple acceptable formats)
                const correctAnswer = question.answer.toString();
                const isCorrect = userAnswer === correctAnswer ||
                                parseFloat(userAnswer) === parseFloat(correctAnswer) ||
                                userAnswer.toLowerCase() === correctAnswer.toLowerCase();
               
                // Disable input
                fillInInput.disabled = true;
                fillInInput.className = `fill-in-input ${isCorrect ? 'correct' : 'incorrect'}`;
               
                // Show feedback
                feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
                feedback.innerHTML = `
                    <div class="feedback-title">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
                    <div class="feedback-text">
                        ${!isCorrect ? `<p><strong>Correct answer:</strong> ${question.answer}</p>` : ''}
                        <p>${question.explanation}</p>
                    </div>
                `;
               
                submitBtn.disabled = true;
                submitBtn.textContent = 'Answer Submitted';
                return;
            }
           
            // For multiple choice questions
            if (selectedAnswer === null || answered) return;

            answered = true;
            const options = document.querySelectorAll('.answer-option');
            const feedback = document.getElementById('feedback');
            const submitBtn = document.getElementById('submitBtn');

            // Show correct/incorrect styling
            options.forEach((opt, index) => {
                if (index === question.correct) {
                    opt.classList.add('correct');
                }
                if (index === selectedAnswer && index !== question.correct) {
                    opt.classList.add('incorrect');
                }
            });

            // Show feedback
            const isCorrect = selectedAnswer === question.correct;
            feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
            feedback.innerHTML = `
                <div class="feedback-title">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
                <div class="feedback-text">${question.explanation}</div>
            `;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Answered';
        }

        function previousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
            }
        }

        function nextQuestion() {
            if (currentQuestionIndex < filteredQuestions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            }
        }

        // Initialize
        updateTopicOptions();
        displayQuestion();
    </script>
</body>
</html>
