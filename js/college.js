document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Theme Switcher Sync for College Detail Page
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
    
    if (themeToggleBtn && !window.themeToggleInitialized) {
        window.themeToggleInitialized = true;
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // 1. Safe access to shared globals with local fallbacks
    const colleges = window.collegesData || (typeof collegesData !== 'undefined' ? collegesData : []);
    const getEstimatedPercentile = window.getEstimatedPercentile || ((score, paperCode) => {
        let estimatedPercentile = 0;
        const code = (paperCode || '').toUpperCase().trim();
        
        if (code === 'COQP11') {
            // Data-driven evaluation derived from the CUET General Ranking baseline (N=27,084)
            if (score >= 250) {
                estimatedPercentile = 99.90 + ((score - 250) / 17) * 0.09;
            } else if (score >= 235) {
                estimatedPercentile = 99.50 + ((score - 235) / 15) * 0.40;
            } else if (score >= 225) {
                estimatedPercentile = 99.00 + ((score - 225) / 10) * 0.50;
            } else if (score >= 214) {
                estimatedPercentile = 98.00 + ((score - 214) / 11) * 1.00;
            } else if (score >= 196) {
                estimatedPercentile = 95.60 + ((score - 196) / 18) * 2.40;
            } else if (score >= 180) {
                estimatedPercentile = 90.00 + ((score - 180) / 16) * 5.60;
            } else if (score >= 150) {
                estimatedPercentile = 75.00 + ((score - 150) / 30) * 15.00;
            } else if (score >= 118) {
                estimatedPercentile = 50.00 + ((score - 118) / 32) * 25.00;
            } else {
                estimatedPercentile = (score / 118) * 50.00;
            }
        } else if (code === 'COQP10') {
            // Data-driven evaluation derived from COQP10 baseline (N=15,231)
            if (score >= 203) {
                estimatedPercentile = 99.90 + ((score - 203) / 28) * 0.09;
            } else if (score >= 186) {
                estimatedPercentile = 99.50 + ((score - 186) / 17) * 0.40;
            } else if (score >= 174) {
                estimatedPercentile = 99.00 + ((score - 174) / 12) * 0.50;
            } else if (score >= 161) {
                estimatedPercentile = 98.00 + ((score - 161) / 13) * 1.00;
            } else if (score >= 137) {
                estimatedPercentile = 95.00 + ((score - 137) / 24) * 3.00;
            } else if (score >= 112) {
                estimatedPercentile = 90.00 + ((score - 112) / 25) * 5.00;
            } else if (score >= 75) {
                estimatedPercentile = 75.00 + ((score - 75) / 37) * 15.00;
            } else if (score >= 46) {
                estimatedPercentile = 50.00 + ((score - 46) / 29) * 25.00;
            } else {
                estimatedPercentile = (score / 46) * 50.00;
            }
        } else if (code === 'COQP08') {
            // Data-driven evaluation derived from COQP08 baseline (N=11,689)
            if (score >= 204) {
                estimatedPercentile = 99.90 + ((score - 204) / 14) * 0.09;
            } else if (score >= 186) {
                estimatedPercentile = 99.50 + ((score - 186) / 18) * 0.40;
            } else if (score >= 173) {
                estimatedPercentile = 99.00 + ((score - 173) / 13) * 0.50;
            } else if (score >= 159) {
                estimatedPercentile = 98.00 + ((score - 159) / 14) * 1.00;
            } else if (score >= 139) {
                estimatedPercentile = 95.00 + ((score - 139) / 20) * 3.00;
            } else if (score >= 122) {
                estimatedPercentile = 90.00 + ((score - 122) / 17) * 5.00;
            } else if (score >= 93) {
                estimatedPercentile = 75.00 + ((score - 93) / 29) * 15.00;
            } else if (score >= 65) {
                estimatedPercentile = 50.00 + ((score - 65) / 28) * 25.00;
            } else {
                estimatedPercentile = (score / 65) * 50.00;
            }
        } else if (code === 'COQP12') {
            // Data-driven evaluation derived from the CUET MBA Ranking baseline (N=49,593, representing COQP12)
            if (score >= 250) {
                estimatedPercentile = 99.85 + ((score - 250) / 50) * 0.15;
            } else if (score >= 210) {
                estimatedPercentile = 98.94 + ((score - 210) / 40) * 0.91;
            } else if (score >= 170) {
                estimatedPercentile = 95.60 + ((score - 170) / 40) * 3.34;
            } else if (score >= 104) {
                estimatedPercentile = 73.20 + ((score - 104) / 66) * 22.40;
            } else {
                estimatedPercentile = (score / 104) * 73.20;
            }
        } else if (code === 'SCQP09') {
            // Data-driven evaluation derived from SCQP09 baseline (N=32,215)
            if (score >= 225) {
                estimatedPercentile = 99.90 + ((score - 225) / 40) * 0.09;
            } else if (score >= 200) {
                estimatedPercentile = 99.50 + ((score - 200) / 25) * 0.40;
            } else if (score >= 186) {
                estimatedPercentile = 99.00 + ((score - 186) / 14) * 0.50;
            } else if (score >= 168) {
                estimatedPercentile = 98.00 + ((score - 168) / 18) * 1.00;
            } else if (score >= 141) {
                estimatedPercentile = 95.00 + ((score - 141) / 27) * 3.00;
            } else if (score >= 118) {
                estimatedPercentile = 90.00 + ((score - 118) / 23) * 5.00;
            } else if (score >= 86) {
                estimatedPercentile = 75.00 + ((score - 86) / 32) * 15.00;
            } else if (score >= 60) {
                estimatedPercentile = 50.00 + ((score - 60) / 26) * 25.00;
            } else {
                estimatedPercentile = (score / 60) * 50.00;
            }
        } else if (code === 'HUQP18') {
            // Data-driven evaluation derived from HUQP18 baseline (N=27,947)
            if (score >= 246) {
                estimatedPercentile = 99.90 + ((score - 246) / 19) * 0.09;
            } else if (score >= 230) {
                estimatedPercentile = 99.50 + ((score - 230) / 16) * 0.40;
            } else if (score >= 221) {
                estimatedPercentile = 99.00 + ((score - 221) / 9) * 0.50;
            } else if (score >= 210) {
                estimatedPercentile = 98.00 + ((score - 210) / 11) * 1.00;
            } else if (score >= 190) {
                estimatedPercentile = 95.00 + ((score - 190) / 20) * 3.00;
            } else if (score >= 168) {
                estimatedPercentile = 90.00 + ((score - 168) / 22) * 5.00;
            } else if (score >= 125) {
                estimatedPercentile = 75.00 + ((score - 125) / 43) * 15.00;
            } else if (score >= 84) {
                estimatedPercentile = 50.00 + ((score - 84) / 41) * 25.00;
            } else {
                estimatedPercentile = (score / 84) * 50.00;
            }
        } else if (code === 'HUQP22') {
            // Data-driven evaluation derived from HUQP22 baseline (N=7,485)
            if (score >= 235) {
                estimatedPercentile = 99.90 + ((score - 235) / 15) * 0.09;
            } else if (score >= 220) {
                estimatedPercentile = 99.50 + ((score - 220) / 15) * 0.40;
            } else if (score >= 215) {
                estimatedPercentile = 99.00 + ((score - 215) / 5) * 0.50;
            } else if (score >= 205) {
                estimatedPercentile = 98.00 + ((score - 205) / 10) * 1.00;
            } else if (score >= 187) {
                estimatedPercentile = 95.00 + ((score - 187) / 18) * 3.00;
            } else if (score >= 167) {
                estimatedPercentile = 90.00 + ((score - 167) / 20) * 5.00;
            } else if (score >= 130) {
                estimatedPercentile = 75.00 + ((score - 130) / 37) * 15.00;
            } else if (score >= 85) {
                estimatedPercentile = 50.00 + ((score - 85) / 45) * 25.00;
            } else {
                estimatedPercentile = (score / 85) * 50.00;
            }
        } else if (code.startsWith('HUQP')) {
            // Generalized Humanities curve approximation
            if (score >= 220) {
                estimatedPercentile = 99.90 + ((score - 220) / 30) * 0.09;
            } else if (score >= 190) {
                estimatedPercentile = 99.50 + ((score - 190) / 30) * 0.40;
            } else if (score >= 175) {
                estimatedPercentile = 99.00 + ((score - 175) / 15) * 0.50;
            } else if (score >= 160) {
                estimatedPercentile = 98.00 + ((score - 160) / 15) * 1.00;
            } else if (score >= 140) {
                estimatedPercentile = 95.00 + ((score - 140) / 20) * 3.00;
            } else if (score >= 120) {
                estimatedPercentile = 90.00 + ((score - 120) / 20) * 5.00;
            } else if (score >= 95) {
                estimatedPercentile = 75.00 + ((score - 95) / 25) * 15.00;
            } else if (score >= 70) {
                estimatedPercentile = 50.00 + ((score - 70) / 25) * 25.00;
            } else {
                estimatedPercentile = (score / 70) * 50.00;
            }
        } else if (code === 'COQP14') {
            // LL.M curve approximation (Highly competitive)
            if (score >= 240) {
                estimatedPercentile = 99.90 + ((score - 240) / 60) * 0.09;
            } else if (score >= 215) {
                estimatedPercentile = 99.50 + ((score - 215) / 25) * 0.40;
            } else if (score >= 200) {
                estimatedPercentile = 99.00 + ((score - 200) / 15) * 0.50;
            } else if (score >= 185) {
                estimatedPercentile = 98.00 + ((score - 185) / 15) * 1.00;
            } else if (score >= 160) {
                estimatedPercentile = 95.00 + ((score - 160) / 25) * 3.00;
            } else if (score >= 140) {
                estimatedPercentile = 90.00 + ((score - 140) / 20) * 5.00;
            } else if (score >= 110) {
                estimatedPercentile = 75.00 + ((score - 110) / 30) * 15.00;
            } else if (score >= 80) {
                estimatedPercentile = 50.00 + ((score - 80) / 30) * 25.00;
            } else {
                estimatedPercentile = (score / 80) * 50.00;
            }
        } else if (code.startsWith('SCQP') || ['COQP09', 'COQP03', 'COQP15', 'COQP16', 'COQP19', 'COQP22', 'SCQP04', 'SCQP27', 'SCQP09'].includes(code)) {
            // Science & specialized papers curve approximation
            if (score >= 230) {
                estimatedPercentile = 99.90 + ((score - 230) / 70) * 0.09;
            } else if (score >= 205) {
                estimatedPercentile = 99.50 + ((score - 205) / 25) * 0.40;
            } else if (score >= 190) {
                estimatedPercentile = 99.00 + ((score - 190) / 15) * 0.50;
            } else if (score >= 175) {
                estimatedPercentile = 98.00 + ((score - 175) / 15) * 1.00;
            } else if (score >= 150) {
                estimatedPercentile = 95.00 + ((score - 150) / 25) * 3.00;
            } else if (score >= 130) {
                estimatedPercentile = 90.00 + ((score - 130) / 20) * 5.00;
            } else if (score >= 100) {
                estimatedPercentile = 75.00 + ((score - 100) / 30) * 15.00;
            } else if (score >= 75) {
                estimatedPercentile = 50.00 + ((score - 75) / 25) * 25.00;
            } else {
                estimatedPercentile = (score / 75) * 50.00;
            }
        } else {
            // Default fallback using COQP12 MBA baseline
            if (score >= 250) {
                estimatedPercentile = 99.85 + ((score - 250) / 50) * 0.15;
            } else if (score >= 210) {
                estimatedPercentile = 98.94 + ((score - 210) / 40) * 0.91;
            } else if (score >= 170) {
                estimatedPercentile = 95.60 + ((score - 170) / 40) * 3.34;
            } else if (score >= 104) {
                estimatedPercentile = 73.20 + ((score - 104) / 66) * 22.40;
            } else {
                estimatedPercentile = (score / 104) * 73.20;
            }
        }
        
        return Math.min(99.99, Math.max(0, estimatedPercentile));
    });

    const params = new URLSearchParams(window.location.search);
    const collegeId = params.get('id') || window.location.hash.substring(1);

    if (!collegeId) {
        window.location.href = 'index.html';
        return;
    }

    const college = colleges.find(c => c.id === collegeId);
    if (!college) {
        window.location.href = 'index.html';
        return;
    }

    // 2. Safe DOM text setting helper to prevent script crashes on missing elements
    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    // Populate static UI elements safely
    setElementText('c-name', college.name);
    setElementText('c-code', college.code);
    setElementText('c-desc', college.description);
    setElementText('c-rank', college.rank);
    
    // Set College Banner Image
    const collegeImage = document.getElementById('c-image');
    if (collegeImage) {
        collegeImage.src = college.image || 'images/tiss_mumbai.png';
        collegeImage.alt = college.name;
    }
    
    // Set Rank Link if available
    const rankLinkContainer = document.getElementById('c-rank-link-container');
    if (rankLinkContainer) {
        if (college.rankUrl) {
            rankLinkContainer.innerHTML = `<a href="${college.rankUrl}" target="_blank" style="color: var(--accent); font-size: 0.85rem; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.2rem;">Verify Rank Source 🔗</a>`;
        } else {
            rankLinkContainer.innerHTML = '';
        }
    }

    setElementText('c-fee', college.fee);
    setElementText('c-score', `${college.safeScore}+`);

    // Set Placement Package details
    setElementText('pkg-highest', college.packages ? college.packages.highest : 'Soon');
    setElementText('pkg-median', college.packages ? college.packages.median : 'Soon');
    setElementText('pkg-avg', college.packages ? college.packages.average : 'Soon');
    setElementText('pkg-lowest', college.packages ? college.packages.lowest : 'Soon');
    setElementText('placed-roles', college.roles || 'Soon');

    // Set Placement Link
    const placementLink = document.getElementById('c-placement-link');
    if (placementLink) {
        if (college.placementUrl) {
            placementLink.href = college.placementUrl;
            placementLink.style.display = 'inline-block';
        } else {
            placementLink.style.display = 'none';
        }
    }

    // Set Category Safe Cutoffs
    const getCatCutoff = window.getCategorySafeScore || ((base, cat) => {
        if (cat === 'OBC') return Math.round(base * 0.92);
        if (cat === 'EWS') return Math.round(base * 0.95);
        if (cat === 'SC') return Math.round(base * 0.85);
        if (cat === 'ST') return Math.round(base * 0.80);
        return base;
    });
    let collegeStudents = []; // Store loaded list locally for filtering
    let currentFilteredStudents = []; // Store active list after both course and paper filtering

    // Course selector elements
    const courseSelectorContainer = document.getElementById('course-selector-container');
    const courseSelectDropdown = document.getElementById('course-select-dropdown');

    // Exam Paper Code selector elements
    const paperSelectorContainer = document.getElementById('paper-selector-container');
    const paperSelectDropdown = document.getElementById('paper-select-dropdown');

    // TISS Mumbai COQP12 courses
    const tissMumbaiCoqp12Courses = [
        'MA/MSc. in Analytics',
        'Master of Arts / Master of Science in Disaster Management',
        'Master of Arts / Master of Science in Disaster and Climate Risk Assessment for Sustainability',
        'Master of Arts in Labour Studies and Practice',
        'Master of Arts in Social Entrepreneurship'
    ];

    // Mappings of Course Eligibility
    const courseEligiblePapers = {
        // TISS Mumbai (COQP12 stream)
        "MA/MSc. in Analytics": ["COQP12", "SCQP27", "SCQP09", "COQP10"],
        "Master of Arts / Master of Science in Disaster Management": ["COQP12", "COQP11", "COQP09"],
        "Master of Arts / Master of Science in Disaster and Climate Risk Assessment for Sustainability": ["COQP12"],
        "Master of Arts in Labour Studies and Practice": ["COQP12", "HUQP06", "HUQP22", "COQP10", "HUQP21"],
        "Master of Arts in Social Entrepreneurship": ["COQP12", "COQP10", "HUQP21", "HUQP22"],

        // TISS Mumbai (COQP11 stream)
        "MA in Social Work (Children and Families)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Community Organisation and Development Practice)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Criminology and Justice)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Dalit and Tribal Studies and Action)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Disability Studies and Action)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Livelihoods and Social Entrepreneurship)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Mental Health)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Public Health)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "MA in Social Work (Women-Centred Practice)": ["COQP11", "HUQP21", "HUQP18", "HUQP22", "HUQP20"],
        "Master of Public Health (Health Administration)": ["COQP11", "COQP19", "COQP22"],
        "Master of Public Health (Social Epidemiology)": ["COQP11", "COQP19"],
        "Master of Public Health (Health Policy, Economics and Finance)": ["COQP11", "COQP19", "COQP10"],
        "Master of Library and Information Science (MLISc)": ["COQP11"],
        "MA in Development Studies": ["COQP11", "COQP10", "HUQP02", "HUQP08", "HUQP09", "HUQP16", "HUQP18", "HUQP22"],
        "MA in Women's Studies": ["COQP11", "COQP10", "HUQP02", "HUQP08", "HUQP09", "HUQP16", "HUQP18", "HUQP22"],
        "MA in Education": ["COQP11", "COQP16", "COQP03"],
        "Bachelor of Education - Master of Education (B.Ed-M.Ed)": ["COQP11", "COQP03", "COQP16", "COQP04", "COQP06", "COQP07"],
        "Master of Education (M.Ed)": ["COQP11", "COQP15", "COQP16"],
        "MA / MSc in Regulatory Policy and Governance": ["COQP10", "COQP11", "COQP14", "HUQP18", "SCQP13"],
        "MA / MSc in Urban Policy and Governance": ["COQP11", "SCQP04", "HUQP22", "COQP10", "HUQP08"],

        // TISS Hyderabad
        "Integrated MA in Public Policy and Governance and LLM in Law and Social Policy (Self-Financed Programme)": ["COQP14"],
        "MA in Public Policy and Law (Self-Financed Programme)": ["COQP10", "COQP11", "HUQP18", "HUQP22"],
        "Master of Arts in Cities and Governance (Self-Financed Programme)": ["COQP10", "COQP11", "HUQP22", "HUQP18"],
        "Master of Arts in Education": ["COQP11", "COQP03", "COQP15"],
        "Master of Arts in Livelihoods Gender and Development": ["COQP11", "HUQP06", "HUQP22", "HUQP18"],
        "Master of Arts in Livelihoods Rural Development": ["COQP11", "HUQP06", "HUQP22", "HUQP18"],
        "Master of Arts in Natural Resources and Governance": ["COQP10", "COQP11", "HUQP22", "HUQP18"],
        "Master of Arts in Public Policy and Governance": ["COQP10", "COQP11", "HUQP22", "HUQP18"],

        // TISS Guwahati
        "Master of Arts in Ecology, Environment and Sustainable Development": ["COQP11", "SCQP11", "COQP09"],
        "Master of Arts in Peace and Conflict Studies": ["HUQP18", "COQP11", "HUQP22"],
        "Master of Arts in Social Work (Community Organisation and Development Practice)": ["HUQP21", "COQP11", "HUQP18"],
        "Master of Arts in Social Work (Counselling)": ["HUQP21", "COQP11", "HUQP20"],
        "Master of Arts in Social Work (Livelihoods and Social Entrepreneurship)": ["HUQP21", "COQP11", "HUQP18"],
        "Master of Arts in Social Work (Public Health)": ["HUQP21", "COQP11", "HUQP20"],
        "Master of Arts in Sociology and Social Anthropology": ["HUQP22", "COQP11", "HUQP18"],

        // TISS Tuljapur
        "Master of Arts in Social Work (Rural Development)": ["HUQP21", "HUQP22", "HUQP20"],

        // South Asian University
        "MBA": ["COQP12", "COQP10", "COQP08"],

        // IIIT Lucknow
        "MBA (Digital Business)": ["COQP12"]
    };

    // Populate dynamic paper options based on selected course
    function updatePaperDropdown() {
        if (!paperSelectDropdown) return;
        const courseVal = courseSelectDropdown.value;
        
        let eligiblePapers = [];
        if (courseVal === 'all') {
            eligiblePapers = [...new Set(collegeStudents.map(s => s.collegePaperCode).filter(Boolean))].sort();
        } else {
            eligiblePapers = courseEligiblePapers[courseVal] || [];
        }
        
        if (eligiblePapers.length > 1) {
            if (paperSelectorContainer) paperSelectorContainer.classList.remove('hidden');
            
            const prevValue = paperSelectDropdown.value;
            let optionsHtml = '<option value="all">All Exam Papers</option>';
            eligiblePapers.forEach(p => {
                optionsHtml += `<option value="${p}">${p}</option>`;
            });
            paperSelectDropdown.innerHTML = optionsHtml;
            
            if (eligiblePapers.includes(prevValue)) {
                paperSelectDropdown.value = prevValue;
            } else {
                paperSelectDropdown.value = 'all';
            }
        } else {
            if (paperSelectorContainer) paperSelectorContainer.classList.add('hidden');
            paperSelectDropdown.innerHTML = '<option value="all">All Exam Papers</option>';
            paperSelectDropdown.value = 'all';
        }
    }

    // Apply course and paper level filters and render stats/table
    function applyCourseFilter() {
        const courseVal = courseSelectDropdown ? courseSelectDropdown.value : 'all';
        const paperVal = paperSelectDropdown ? paperSelectDropdown.value : 'all';
        
        let filtered = [...collegeStudents];
        if (courseVal !== 'all') {
            filtered = filtered.filter(s => s.course === courseVal);
        }
        if (paperVal !== 'all') {
            filtered = filtered.filter(s => s.collegePaperCode === paperVal);
        }
        
        currentFilteredStudents = filtered;
        
        // Compute dynamic stats based on currently visible subset
        const numericScores = currentFilteredStudents.map(s => s.score).filter(s => typeof s === 'number');
        const maxScore = numericScores.length > 0 ? Math.max(...numericScores) : 'N/A';
        const minScore = numericScores.length > 0 ? Math.min(...numericScores) : 'N/A';
        const avgScore = numericScores.length > 0 ? Math.round(numericScores.reduce((sum, val) => sum + val, 0) / numericScores.length) : 'N/A';
        
        setElementText('stat-max', maxScore);
        setElementText('stat-avg', avgScore);
        setElementText('stat-min', minScore);
        setElementText('stat-count', currentFilteredStudents.length);
        
        // Render table
        renderStudentTable(currentFilteredStudents);
        
        // Update static dashboard info dynamically
        updateCollegeUI();
    }

    function updateCollegeUI() {
        const courseVal = courseSelectDropdown ? courseSelectDropdown.value : 'all';
        const paperVal = paperSelectDropdown ? paperSelectDropdown.value : 'all';
        
        // 1. TISS Mumbai
        if (college.id === 'tiss') {
            let activeData = college;
            let streamCode = 'all';
            if (courseVal !== 'all') {
                streamCode = tissMumbaiCoqp12Courses.includes(courseVal) ? 'COQP12' : 'COQP11';
                activeData = college.programs.find(p => p.code === streamCode);
            }
            
            setElementText('c-code', activeData.code);
            setElementText('c-desc', activeData.description);
            setElementText('c-rank', activeData.rank);
            
            const rankLinkContainer = document.getElementById('c-rank-link-container');
            if (rankLinkContainer) {
                if (activeData.rankUrl) {
                    rankLinkContainer.innerHTML = `<a href="${activeData.rankUrl}" target="_blank" style="color: var(--accent); font-size: 0.85rem; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.2rem;">Verify Rank Source 🔗</a>`;
                } else {
                    rankLinkContainer.innerHTML = '';
                }
            }

            setElementText('c-fee', activeData.fee);
            
            if (streamCode === 'all') {
                setElementText('c-score', '180+ (COQP11) / 235+ (COQP12)');
                setElementText('cat-gen-cutoff', '180+ (COQP11) / 235+ (COQP12)');
                setElementText('cat-obc-cutoff', '166+ (COQP11) / 216+ (COQP12)');
                setElementText('cat-ews-cutoff', '171+ (COQP11) / 223+ (COQP12)');
                setElementText('cat-sc-cutoff', '153+ (COQP11) / 200+ (COQP12)');
                setElementText('cat-st-cutoff', '144+ (COQP11) / 188+ (COQP12)');
            } else {
                setElementText('c-score', `${activeData.safeScore}+`);
                setElementText('cat-gen-cutoff', `${activeData.safeScore}+`);
                setElementText('cat-obc-cutoff', `${getCatCutoff(activeData.safeScore, 'OBC')}+`);
                setElementText('cat-ews-cutoff', `${getCatCutoff(activeData.safeScore, 'EWS')}+`);
                setElementText('cat-sc-cutoff', `${getCatCutoff(activeData.safeScore, 'SC')}+`);
                setElementText('cat-st-cutoff', `${getCatCutoff(activeData.safeScore, 'ST')}+`);
            }
            
            setElementText('pkg-highest', activeData.packages ? activeData.packages.highest : 'Soon');
            setElementText('pkg-median', activeData.packages ? activeData.packages.median : 'Soon');
            setElementText('pkg-avg', activeData.packages ? activeData.packages.average : 'Soon');
            setElementText('pkg-lowest', activeData.packages ? activeData.packages.lowest : 'Soon');
            setElementText('placed-roles', activeData.roles || 'Soon');
            
            const placementLink = document.getElementById('c-placement-link');
            if (placementLink) {
                if (activeData.placementUrl) {
                    placementLink.href = activeData.placementUrl;
                    placementLink.style.display = 'inline-block';
                } else {
                    placementLink.style.display = 'none';
                }
            }
        }
        // 2. SAU
        else if (college.id === 'sau') {
            let activeData = college;
            if (paperVal !== 'all') {
                activeData = college.programs.find(p => p.code === paperVal) || college;
            }
            
            setElementText('c-code', activeData.code);
            setElementText('c-desc', activeData.description);
            setElementText('c-rank', activeData.rank);
            
            const rankLinkContainer = document.getElementById('c-rank-link-container');
            if (rankLinkContainer) {
                if (activeData.rankUrl) {
                    rankLinkContainer.innerHTML = `<a href="${activeData.rankUrl}" target="_blank" style="color: var(--accent); font-size: 0.85rem; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.2rem;">Verify Rank Source 🔗</a>`;
                } else {
                    rankLinkContainer.innerHTML = '';
                }
            }

            setElementText('c-fee', activeData.fee);
            
            if (paperVal === 'all') {
                setElementText('c-score', '140+ (COQP12) / 120+ (COQP10) / 110+ (COQP08)');
                setElementText('cat-gen-cutoff', '140+ (COQP12) / 120+ (COQP10) / 110+ (COQP08)');
                setElementText('cat-obc-cutoff', '129+ (COQP12) / 110+ (COQP10) / 101+ (COQP08)');
                setElementText('cat-ews-cutoff', '133+ (COQP12) / 114+ (COQP10) / 105+ (COQP08)');
                setElementText('cat-sc-cutoff', '119+ (COQP12) / 102+ (COQP10) / 94+ (COQP08)');
                setElementText('cat-st-cutoff', '112+ (COQP12) / 96+ (COQP10) / 88+ (COQP08)');
            } else {
                if (activeData.safeScore === 'N/A') {
                    setElementText('c-score', 'N/A');
                    setElementText('cat-gen-cutoff', 'N/A');
                    setElementText('cat-obc-cutoff', 'N/A');
                    setElementText('cat-ews-cutoff', 'N/A');
                    setElementText('cat-sc-cutoff', 'N/A');
                    setElementText('cat-st-cutoff', 'N/A');
                } else {
                    setElementText('c-score', `${activeData.safeScore}+`);
                    setElementText('cat-gen-cutoff', `${activeData.safeScore}+`);
                    setElementText('cat-obc-cutoff', `${getCatCutoff(activeData.safeScore, 'OBC')}+`);
                    setElementText('cat-ews-cutoff', `${getCatCutoff(activeData.safeScore, 'EWS')}+`);
                    setElementText('cat-sc-cutoff', `${getCatCutoff(activeData.safeScore, 'SC')}+`);
                    setElementText('cat-st-cutoff', `${getCatCutoff(activeData.safeScore, 'ST')}+`);
                }
            }
            
            setElementText('pkg-highest', activeData.packages ? activeData.packages.highest : 'Soon');
            setElementText('pkg-median', activeData.packages ? activeData.packages.median : 'Soon');
            setElementText('pkg-avg', activeData.packages ? activeData.packages.average : 'Soon');
            setElementText('pkg-lowest', activeData.packages ? activeData.packages.lowest : 'Soon');
            setElementText('placed-roles', activeData.roles || 'Soon');
            
            const placementLink = document.getElementById('c-placement-link');
            if (placementLink) {
                if (activeData.placementUrl) {
                    placementLink.href = activeData.placementUrl;
                    placementLink.style.display = 'inline-block';
                } else {
                    placementLink.style.display = 'none';
                }
            }
        }
        // 3. Other Colleges
        else {
            setElementText('c-code', college.code);
            setElementText('c-desc', college.description);
            setElementText('c-rank', college.rank);
            setElementText('c-fee', college.fee);
            
            if (college.safeScore === 'N/A') {
                setElementText('c-score', 'N/A');
                setElementText('cat-gen-cutoff', 'N/A');
                setElementText('cat-obc-cutoff', 'N/A');
                setElementText('cat-ews-cutoff', 'N/A');
                setElementText('cat-sc-cutoff', 'N/A');
                setElementText('cat-st-cutoff', 'N/A');
            } else {
                setElementText('c-score', `${college.safeScore}+`);
                setElementText('cat-gen-cutoff', `${college.safeScore}+`);
                setElementText('cat-obc-cutoff', `${getCatCutoff(college.safeScore, 'OBC')}+`);
                setElementText('cat-ews-cutoff', `${getCatCutoff(college.safeScore, 'EWS')}+`);
                setElementText('cat-sc-cutoff', `${getCatCutoff(college.safeScore, 'SC')}+`);
                setElementText('cat-st-cutoff', `${getCatCutoff(college.safeScore, 'ST')}+`);
            }
            
            setElementText('pkg-highest', college.packages ? college.packages.highest : 'Soon');
            setElementText('pkg-median', college.packages ? college.packages.median : 'Soon');
            setElementText('pkg-avg', college.packages ? college.packages.average : 'Soon');
            setElementText('pkg-lowest', college.packages ? college.packages.lowest : 'Soon');
            setElementText('placed-roles', college.roles || 'Soon');
        }
    }

    // 3. Helper function to render table rows safely
    function renderStudentTable(list) {
        const tbody = document.getElementById('student-list');
        const table = document.querySelector('.modern-table');
        const noStudents = document.getElementById('no-students');
        
        if (tbody) tbody.innerHTML = '';
        
        // Dynamic table header adjustment for multi-program colleges (TISS, SAU)
        const thead = document.querySelector('.modern-table thead tr');
        const isMulti = ['tiss', 'tiss_hyd', 'tiss_gwt', 'tiss_tjp', 'sau'].includes(college.id);
        if (thead) {
            if (isMulti) {
                thead.innerHTML = `
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Specialization / Course</th>
                    <th class="hide-mobile">Application No</th>
                    <th>Exam Code</th>
                    <th>CUET Score</th>
                    <th>Percentile</th>
                `;
            } else {
                thead.innerHTML = `
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Specialization / Course</th>
                    <th class="hide-mobile">Application No</th>
                    <th>CUET Score</th>
                    <th>Percentile</th>
                `;
            }
        }
        
        if (list.length > 0) {
            if (table) table.classList.remove('hidden');
            if (noStudents) noStudents.classList.add('hidden');
            
            if (tbody) {
                list.forEach((student, index) => {
                    const tr = document.createElement('tr');
                    const initial = String(student.name || '').trim().charAt(0) || '?';
                    const nameVal = student.name || 'Candidate';
                    const appVal = student.app || 'N/A';
                    const scoreVal = student.score !== undefined ? student.score : '-';
                    const isUnmatched = student.score === 'N/A';
                    const percentileVal = isUnmatched ? 'N/A' : getEstimatedPercentile(student.score, student.collegePaperCode || college.code);
                    const percentileText = (isUnmatched || percentileVal === 'N/A') ? 'N/A' : `${percentileVal.toFixed(2)}%`;
                    
                    if (isMulti) {
                        // Style program tags nicely
                        let paperBadgeClass = 'tag-sau';
                        if (student.collegePaperCode === 'COQP12') paperBadgeClass = 'tag-sau-coqp12';
                        else if (student.collegePaperCode === 'COQP10') paperBadgeClass = 'tag-sau-coqp10';
                        else if (student.collegePaperCode === 'COQP08') paperBadgeClass = 'tag-sau-coqp08';
                        else if (student.collegePaperCode === 'COQP11') paperBadgeClass = 'tag-tiss-coqp11';
                        else if (student.collegePaperCode === 'SAU-ET') paperBadgeClass = 'tag-sau-et';
                        else if (student.collegePaperCode === 'SCQP09') paperBadgeClass = 'tag-scqp09';
                        else if (student.collegePaperCode === 'HUQP18') paperBadgeClass = 'tag-huqp18';
                        else if (student.collegePaperCode === 'HUQP22') paperBadgeClass = 'tag-huqp22';
                        
                        tr.innerHTML = `
                            <td>#${index + 1}</td>
                            <td>
                                <div class="student-profile">
                                    <div class="student-avatar">${initial}</div>
                                    <span style="font-weight: 600;">${nameVal}</span>
                                </div>
                            </td>
                            <td style="font-weight: 500; color: var(--text-main); font-size: 0.9rem;">${student.course || 'General'}</td>
                            <td class="hide-mobile" style="color: var(--text-muted); font-family: monospace; font-size: 0.9rem;">${appVal}</td>
                            <td><span class="tag ${paperBadgeClass}" style="font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 4px;">${student.collegePaperCode}</span></td>
                            <td><span class="score-badge">${scoreVal}</span></td>
                            <td style="font-weight: 600; color: var(--accent);">${percentileText}</td>
                        `;
                    } else {
                        tr.innerHTML = `
                            <td>#${index + 1}</td>
                            <td>
                                <div class="student-profile">
                                    <div class="student-avatar">${initial}</div>
                                    <span style="font-weight: 600;">${nameVal}</span>
                                </div>
                            </td>
                            <td style="font-weight: 500; color: var(--text-main); font-size: 0.9rem;">${student.course || 'General'}</td>
                            <td class="hide-mobile" style="color: var(--text-muted); font-family: monospace; font-size: 0.9rem;">${appVal}</td>
                            <td><span class="score-badge">${scoreVal}</span></td>
                            <td style="font-weight: 600; color: var(--accent);">${percentileText}</td>
                        `;
                    }
                    tbody.appendChild(tr);
                });
            }
        } else {
            if (table) table.classList.add('hidden');
            if (noStudents) {
                noStudents.classList.remove('hidden');
                noStudents.innerHTML = `<div class="no-data-illustration"><div class="emoji">🔍</div><h3>No candidates match search</h3><p>Try refining your query.</p></div>`;
            }
        }
    }

    // Sync filter selects
    function syncFilters(trigger) {
        if (trigger === 'course') {
            updatePaperDropdown();
        }
        applyCourseFilter();
    }

    // Setup course selector change listener
    if (courseSelectDropdown) {
        courseSelectDropdown.addEventListener('change', () => {
            syncFilters('course');
            const searchInput = document.getElementById('student-search');
            if (searchInput) searchInput.value = '';
        });
    }

    // Setup paper selector change listener
    if (paperSelectDropdown) {
        paperSelectDropdown.addEventListener('change', () => {
            syncFilters('paper');
            const searchInput = document.getElementById('student-search');
            if (searchInput) searchInput.value = '';
        });
    }

    // 4. Load the admitted student data
    try {
        let data = window.admittedStudents;
        
        if (!data) {
            const response = await fetch('admitted_students.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            data = await response.json();
        }
        
        // Merge TISS programs if needed
        if (college.id === 'tiss') {
            const coqp12Students = (data['tiss'] || []).map(s => ({ ...s, admissionStream: 'COQP12', collegePaperCode: s.paperCode || 'COQP12' }));
            const coqp11Students = (data['tiss_coqp11'] || []).map(s => ({ ...s, admissionStream: 'COQP11', collegePaperCode: s.paperCode || 'COQP11' }));
            collegeStudents = [...coqp12Students, ...coqp11Students];
        } else if (college.id === 'sau') {
            collegeStudents = (data['sau'] || []).map(s => ({ ...s, admissionStream: s.paperCode || 'COQP12', collegePaperCode: s.paperCode || 'COQP12' }));
        } else {
            collegeStudents = (data[college.id] || []).map(s => ({ ...s, admissionStream: s.paperCode || college.code, collegePaperCode: s.paperCode || college.code }));
        }
        
        if (collegeStudents.length > 0) {
            // Sort by score descending (highest marks first), placing N/A at the bottom
            collegeStudents.sort((a, b) => {
                const scoreA = typeof a.score === 'number' ? a.score : -1;
                const scoreB = typeof b.score === 'number' ? b.score : -1;
                return scoreB - scoreA;
            });

            // Populate course select options dynamically from unique courses
            if (courseSelectDropdown) {
                const uniqueCourses = [...new Set(collegeStudents.map(s => s.course).filter(Boolean))].sort();
                if (uniqueCourses.length > 1) {
                    if (courseSelectorContainer) courseSelectorContainer.classList.remove('hidden');
                    let courseHtml = '<option value="all">All Specializations (Merged View)</option>';
                    uniqueCourses.forEach(c => {
                        courseHtml += `<option value="${c}">${c}</option>`;
                    });
                    courseSelectDropdown.innerHTML = courseHtml;
                } else {
                    if (courseSelectorContainer) courseSelectorContainer.classList.add('hidden');
                    courseSelectDropdown.innerHTML = '<option value="all">All Specializations (Merged View)</option>';
                }
            }

            // Sync/update paper dropdown based on initially selected course (all)
            updatePaperDropdown();

            // Check if both selectors are hidden, hide the selector card
            const showCourse = courseSelectorContainer && !courseSelectorContainer.classList.contains('hidden');
            const showPaper = paperSelectorContainer && !paperSelectorContainer.classList.contains('hidden');
            const unifiedCard = document.getElementById('unified-selector-card');
            if (unifiedCard) {
                if (!showCourse && !showPaper) {
                    unifiedCard.style.display = 'none';
                } else {
                    unifiedCard.style.display = 'block';
                }
            }

            // Initialize filters & render
            applyCourseFilter();

            // Setup Search bar listener safely on filtered students
            const searchInput = document.getElementById('student-search');
            if (searchInput) {
                searchInput.addEventListener('input', () => {
                    const query = searchInput.value.toLowerCase().trim();
                    const filtered = currentFilteredStudents.filter(student => 
                        String(student.name || '').toLowerCase().includes(query) || 
                        String(student.app || '').includes(query) ||
                        String(student.course || '').toLowerCase().includes(query)
                    );
                    renderStudentTable(filtered);
                });
            }

            // Setup WhatsApp share button safely
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', () => {
                    const numericScores = currentFilteredStudents.map(s => s.score).filter(s => typeof s === 'number');
                    const maxScore = numericScores.length > 0 ? Math.max(...numericScores) : 'N/A';
                    const minScore = numericScores.length > 0 ? Math.min(...numericScores) : 'N/A';
                    const avgScore = numericScores.length > 0 ? Math.round(numericScores.reduce((sum, val) => sum + val, 0) / numericScores.length) : 'N/A';

                    const text = encodeURIComponent(`Check out the CUET PG admitted student list & cutoff insights for ${college.name}! Highest score is ${maxScore}, average is ${avgScore}, and cutoff is ${minScore}. View more on the Tracker! 🎓🚀`);
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                });
            }
        } else {
            // Set dynamic stats to empty/default
            setElementText('stat-max', '-');
            setElementText('stat-avg', '-');
            setElementText('stat-min', '-');
            setElementText('stat-count', '0');
            
            const table = document.querySelector('.modern-table');
            const noStudents = document.getElementById('no-students');
            if (table) table.classList.add('hidden');
            if (noStudents) {
                noStudents.classList.remove('hidden');
                noStudents.innerHTML = `We are still gathering official student lists for <strong>${college.name}</strong>.`;
            }

            // Default share button behavior
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', () => {
                    const text = encodeURIComponent(`Explore cutoffs and counseling merit lists for ${college.name} on the CUET PG Tracker! 🎓🚀`);
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                });
            }
        }

    } catch (e) {
        console.error("Could not load student data", e);
        
        setElementText('stat-max', '-');
        setElementText('stat-avg', '-');
        setElementText('stat-min', '-');
        setElementText('stat-count', '0');
        
        const table = document.querySelector('.modern-table');
        const noStudents = document.getElementById('no-students');
        if (table) table.classList.add('hidden');
        if (noStudents) {
            noStudents.classList.remove('hidden');
            noStudents.innerHTML = `<div class="no-data-illustration"><div class="emoji">⚠️</div><h3>Connection Error</h3><p>Could not load candidate scores from the database. Please reload or test using a local web server.</p></div>`;
        }
    }

    // 5. Always hide loader and display content, regardless of fetch outcome
    const loader = document.getElementById('loading');
    const content = document.getElementById('college-content');
    if (loader) loader.classList.add('hidden');
    if (content) content.classList.remove('hidden');
    } catch (err) {
        console.error("Uncaught runtime error inside college.js:", err);
        const loadingDiv = document.getElementById('loading');
        if (loadingDiv) {
            loadingDiv.innerHTML = `
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 1.5rem; text-align: left; max-width: 600px; margin: 0 auto; color: var(--text-main);">
                    <h3 style="color: #ef4444; margin-top: 0; display: flex; align-items: center; gap: 0.5rem; font-family: sans-serif;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Runtime Error Detected
                    </h3>
                    <p style="margin-bottom: 0.5rem; font-family: monospace; font-size: 0.9rem;"><strong>Message:</strong> ${err.message}</p>
                    <p style="margin-bottom: 0.5rem; font-family: monospace; font-size: 0.9rem; white-space: pre-wrap;"><strong>Stack Trace:</strong>\n${err.stack || 'N/A'}</p>
                </div>
            `;
        }
    }
});