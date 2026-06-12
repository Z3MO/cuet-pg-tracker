document.addEventListener('DOMContentLoaded', async () => {
    // Theme Switcher Sync for College Detail Page
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
    } else {
        document.body.classList.add('dark-mode');
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (isDark) {
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            } else {
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            }
        });
    }

    // 1. Safe access to shared globals with local fallbacks
    const collegesData = window.collegesData || [];
    const getEstimatedPercentile = window.getEstimatedPercentile || ((score) => {
        // Fallback simple percentile formula if app.js is not loaded
        if (score >= 250) return 99.85;
        if (score >= 210) return 98.94;
        if (score >= 170) return 95.60;
        if (score >= 104) return 73.20;
        return (score / 300) * 100;
    });

    const params = new URLSearchParams(window.location.search);
    const collegeId = params.get('id') || window.location.hash.substring(1);

    if (!collegeId) {
        window.location.href = 'index.html';
        return;
    }

    const college = collegesData.find(c => c.id === collegeId);
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

    setElementText('cat-gen-cutoff', `${college.safeScore}+`);
    setElementText('cat-obc-cutoff', `${getCatCutoff(college.safeScore, 'OBC')}+`);
    setElementText('cat-ews-cutoff', `${getCatCutoff(college.safeScore, 'EWS')}+`);
    setElementText('cat-sc-cutoff', `${getCatCutoff(college.safeScore, 'SC')}+`);
    setElementText('cat-st-cutoff', `${getCatCutoff(college.safeScore, 'ST')}+`);

    let collegeStudents = []; // Store loaded list locally for filtering

    // 3. Helper function to render table rows safely
    function renderStudentTable(list) {
        const tbody = document.getElementById('student-list');
        const table = document.querySelector('.modern-table');
        const noStudents = document.getElementById('no-students');
        
        if (tbody) tbody.innerHTML = '';
        
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
                    const percentileVal = getEstimatedPercentile(student.score, college.code);

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
                        <td style="font-weight: 700; color: var(--accent);">${percentileVal.toFixed(2)} %ile</td>
                    `;
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

    // 4. Load the admitted student data
    try {
        let data = window.admittedStudents;
        
        if (!data) {
            // Fallback to fetch if window.admittedStudents is not defined (e.g. CGI/CORS limitations)
            const response = await fetch('admitted_students.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            data = await response.json();
        }
        
        collegeStudents = data[college.id] || [];
        
        if (collegeStudents.length > 0) {
            // Sort by score descending (highest marks first)
            collegeStudents.sort((a, b) => b.score - a.score);

            // Compute dynamic statistics
            const scores = collegeStudents.map(s => s.score);
            const maxScore = Math.max(...scores);
            const minScore = Math.min(...scores);
            const avgScore = Math.round(scores.reduce((sum, val) => sum + val, 0) / scores.length);
            
            setElementText('stat-max', maxScore);
            setElementText('stat-avg', avgScore);
            setElementText('stat-min', minScore);
            setElementText('stat-count', collegeStudents.length);

            // Render table
            renderStudentTable(collegeStudents);

            // Setup Search bar listener safely
            const searchInput = document.getElementById('student-search');
            if (searchInput) {
                searchInput.addEventListener('input', () => {
                    const query = searchInput.value.toLowerCase().trim();
                    const filtered = collegeStudents.filter(student => 
                        String(student.name || '').toLowerCase().includes(query) || 
                        String(student.app || '').includes(query)
                    );
                    renderStudentTable(filtered);
                });
            }

            // Setup WhatsApp share button safely
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', () => {
                    const text = encodeURIComponent(`Check out the CUET PG admitted student list & cutoff insights for ${college.name} (${college.code})! Highest score is ${maxScore}, average is ${avgScore}, and cutoff is ${minScore}. View more on the Tracker! 🎓🚀`);
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
        
        // Handle fetch failures (like CORS or network errors) gracefully by showing empty states
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
});