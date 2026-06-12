// Verified Institutional Placement & Admissions Database
const collegesData = [
    {
        id: 'tiss',
        name: 'TISS Mumbai',
        code: 'COQP12',
        rank: 'NIRF Rank #72 (University) | Top 10 B-School Equivalent',
        rankUrl: 'https://www.nirfindia.org/',
        placementUrl: 'https://hr.tiss.edu/',
        fee: '₹1.85 Lakhs (Tuition) | ₹3.2 Lakhs (with Hostel)',
        safeScore: 235,
        packages: {
            highest: '66.00 LPA',
            average: '28.69 LPA',
            median: '28.00 LPA',
            lowest: '18.00 LPA'
        },
        roles: 'HR Specialist, OD Consultant, Talent Acquisition Lead, Labour Relations Advisor',
        description: 'Premier institute known for its incredible ROI and flagship COQP12 programs: Social Entrepreneurship, Labour Studies & Practice, Disaster Management, and Analytics. Extremely competitive.'
    },
    {
        id: 'sau',
        name: 'South Asian University',
        code: 'COQP12',
        rank: 'Intergovernmental SAARC University | Top 20 Indian Universities (IIRF)',
        rankUrl: 'https://sau.int/',
        placementUrl: 'https://sau.int/academics/faculties/faculty-of-management/',
        fee: '₹3.20 Lakhs (Tuition) | ₹4.0 Lakhs (with Hostel)',
        safeScore: 210,
        packages: {
            highest: '12.00 LPA',
            average: '6.00 LPA',
            median: '5.50 LPA',
            lowest: '4.00 LPA'
        },
        roles: 'Business Analyst, Operations Manager, Corporate Consultant, Research Analyst',
        description: 'International SAARC university in New Delhi. Known for multicultural exposure, highly subsidized international-standard education, and strong foundation in research and management.'
    },
    {
        id: 'iiitl',
        name: 'IIIT Lucknow',
        code: 'COQP12',
        rank: 'Institute of National Importance | Top Emerging Tech B-School',
        rankUrl: 'https://iiitl.ac.in/',
        placementUrl: 'https://iiitl.ac.in/placements/',
        fee: '₹3.02 Lakhs (Tuition) | ₹4.64 Lakhs (with Hostel)',
        safeScore: 161,
        packages: {
            highest: '24.00 LPA',
            average: '12.00 LPA',
            median: '11.00 LPA',
            lowest: '8.00 LPA'
        },
        roles: 'Digital Product Manager, IT Consultant, FinTech Strategy Lead, Business Analyst',
        description: 'Fast-growing premier technology institute. Official merit lists show admitted scores from 104 to 253 (Average: 161).'
    }
];

// Helper to calculate estimated percentile based on raw score
function getEstimatedPercentile(score, paperCode) {
    let estimatedPercentile = 0;
    
    // Data-driven evaluation derived from the CUET MBA Ranking baseline (N=49,593)
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
    
    return Math.min(99.99, Math.max(0, estimatedPercentile));
}

// Adjust safe score dynamically based on category
function getCategorySafeScore(baseScore, category) {
    if (category === 'OBC') return Math.round(baseScore * 0.92);
    if (category === 'EWS') return Math.round(baseScore * 0.95);
    if (category === 'SC') return Math.round(baseScore * 0.85);
    if (category === 'ST') return Math.round(baseScore * 0.80);
    return baseScore; // GEN
}

// Helper to highlight search query text matches
function highlightSearchText(text, searchWord) {
    if (!searchWord) return text;
    const regex = new RegExp(`(${searchWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return String(text).replace(regex, '<span class="highlight-text">$1</span>');
}

// Attach to window for global access across scripts
window.collegesData = collegesData;
window.getEstimatedPercentile = getEstimatedPercentile;
window.getCategorySafeScore = getCategorySafeScore;

// Global data holders
let allStudents = [];
let filteredStudents = [];
let selectedCompare = [];
let currentPage = 1;
const pageSize = 15;

document.addEventListener('DOMContentLoaded', () => {
    const rankForm = document.getElementById('rank-form');
    const resultBox = document.getElementById('result-box');
    const scoreInput = document.getElementById('score');
    const collegeGrid = document.getElementById('college-grid');

    // Theme Switcher Logic
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

    // 1. Setup Colleges Grid with Compare check capability
    function renderColleges() {
        if (!collegeGrid) return;
        collegeGrid.innerHTML = '';
        collegesData.forEach(college => {
            const card = document.createElement('div');
            card.className = 'college-card';
            
            // Check if already checked
            const isChecked = selectedCompare.some(c => c.id === college.id) ? 'checked' : '';
            
            card.innerHTML = `
                <!-- Comparison Checkbox -->
                <div class="college-card-compare">
                    <input type="checkbox" class="compare-checkbox" data-id="${college.id}" id="chk-${college.id}" ${isChecked}>
                    <label for="chk-${college.id}" style="cursor: pointer; margin-left: 0.2rem;">Compare</label>
                </div>
                <h3>${college.name}</h3>
                <div style="margin-bottom: 0.75rem;">
                    <span class="tag tag-${college.id}">${college.code}</span>
                    <span class="tag tag-success">Safe: ${college.safeScore}+</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.5rem;">${college.rank}</p>
                <div class="college-card-footer">
                    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">Avg Pkg: ${college.packages.average}</span>
                    <span class="college-link">Details &rarr;</span>
                </div>
            `;
            
            // Prevent general card click routing when clicking compare box
            const chkContainer = card.querySelector('.college-card-compare');
            chkContainer.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            const checkbox = card.querySelector('.compare-checkbox');
            checkbox.addEventListener('change', (e) => {
                handleCompareChange(e.target);
            });

            card.addEventListener('click', () => {
                window.location.href = `college.html#${college.id}`;
            });
            collegeGrid.appendChild(card);
        });
    }

    renderColleges();

    // 2. Rank & Safe Zone Predictor Logic (Category Aware)
    if (rankForm) {
        rankForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const paperCode = document.getElementById('paper-code').value;
            const category = document.getElementById('category').value;
            const score = parseInt(scoreInput.value, 10);

            if (isNaN(score) || score < 0 || score > 300) {
                alert('Please enter a valid expected score out of 300.');
                return;
            }

            const estimatedPercentile = getEstimatedPercentile(score, paperCode);
            let feedbackMsg = '';
            
            // Adjust Safe cutoffs dynamically for categories
            const attainableColleges = collegesData.filter(c => {
                const adjustedSafe = getCategorySafeScore(c.safeScore, category);
                return c.code === paperCode && score >= adjustedSafe;
            });
            
            const missedColleges = collegesData.filter(c => {
                const adjustedSafe = getCategorySafeScore(c.safeScore, category);
                return c.code === paperCode && score < adjustedSafe;
            }).sort((a,b) => {
                return getCategorySafeScore(a.safeScore, category) - getCategorySafeScore(b.safeScore, category);
            });
            
            if (score >= 250) {
                feedbackMsg = `Outstanding! You are in the top 0.15% safe zone for Category [${category}]. Admission to TISS Mumbai is highly probable.`;
            } else if (score >= 210) {
                feedbackMsg = `Excellent score! High likelihood of securing admission to TISS Mumbai, SAU, or IIIT Lucknow for Category [${category}].`;
            } else if (score >= 170) {
                feedbackMsg = `Great effort! You stand a solid chance at SAU, IIIT Lucknow, or subsequent counseling lists for TISS Mumbai for Category [${category}].`;
            } else if (score >= 104) {
                feedbackMsg = `Decent score! Monitor subsequent cutoff rounds or spot rounds for SAU or IIIT Lucknow for Category [${category}].`;
            } else {
                feedbackMsg = `Safe option: target category allocations, spot selection lists, or prepare for category merit lists.`;
            }

            let attainableHtml = attainableColleges.length > 0 
                ? `<div style="margin-top: 1rem; color: var(--success-text); font-size: 0.95rem; text-align: left; padding: 0.75rem; background: var(--success-bg); border-radius: 8px;">
                     <strong>🎯 Target Safe Zone (${category}):</strong> ${attainableColleges.map(c => c.name).join(', ')}
                   </div>`
                : '';
                
            let bridgeHtml = missedColleges.length > 0
                ? `<div style="margin-top: 0.75rem; color: var(--warning-text); font-size: 0.95rem; text-align: left; padding: 0.75rem; background: rgba(245, 158, 11, 0.15); border-radius: 8px;">
                     <strong>🚀 Target Safe Score:</strong> Add ${getCategorySafeScore(missedColleges[0].safeScore, category) - score} more marks to secure <strong>${missedColleges[0].name}</strong> (${category} Cutoff)
                   </div>`
                : '';

            resultBox.innerHTML = `
                <h3>Estimated Standing (${paperCode} | ${category})</h3>
                
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 1.5rem 0;">
                    <div class="percentile-gauge-wrapper" style="position: relative; display: flex; align-items: center; justify-content: center; width: 140px; height: 140px;">
                        <svg class="gauge" viewBox="0 0 120 120" style="width: 140px; height: 140px;">
                            <circle class="gauge-bg" cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" stroke-width="8"></circle>
                            <circle class="gauge-fill" id="gauge-fill-arc" cx="60" cy="60" r="50" fill="none" stroke="url(#gauge-grad)" stroke-width="8"
                                    stroke-dasharray="314.16" stroke-dashoffset="314.16" stroke-linecap="round" transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1s ease-out;"></circle>
                            <defs>
                                <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="var(--accent)" />
                                    <stop offset="100%" stop-color="var(--accent-gold)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div id="gauge-value-text" style="position: absolute; font-size: 1.75rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit', sans-serif;">0%</div>
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.75rem; color: var(--text-main); font-family: 'Outfit';">Estimated Percentile</div>
                </div>

                <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">
                    ${feedbackMsg}
                </p>
                ${attainableHtml}
                ${bridgeHtml}
                
                <button type="button" onclick="shareResult(${estimatedPercentile.toFixed(2)}, '${paperCode}', ${score})" class="share-btn" style="margin-top: 1.5rem; width: 100%; background: #25D366; display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: white; border: none; border-radius: 8px; font-weight: 700; padding: 0.75rem; cursor: pointer;">
                    <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.817 9.817 0 0 0 12.04 2zm5.82 12.92c-.25.7-1.46 1.37-2.02 1.44-.49.06-1.12.08-3.26-.8-2.73-1.12-4.5-3.9-4.64-4.08-.13-.19-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.32.25-.26.66-.37.98-.37.1 0 .2 0 .28.01.25.01.5.02.73.55.27.65.92 2.24 1 2.4.08.17.13.36.01.59-.12.23-.27.37-.4.52-.14.16-.3.34-.13.62.33.56.74 1.02 1.25 1.48.66.59 1.22.78 1.54.95.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.2-.29.41-.24.69-.14.28.1 1.78.84 2.09.99.31.15.52.23.6.36.08.14.08.81-.17 1.51z"/>
                    </svg>
                    Share My Estimate on WhatsApp
                </button>
            `;
            
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Animate SVG Gauge Fill and Number Counter
            setTimeout(() => {
                const fillArc = document.getElementById('gauge-fill-arc');
                const textVal = document.getElementById('gauge-value-text');
                if (fillArc) {
                    const offset = 314.16 * (1 - estimatedPercentile / 100);
                    fillArc.style.strokeDashoffset = offset;
                }
                if (textVal) {
                    let start = 0;
                    const end = estimatedPercentile;
                    const duration = 1000;
                    const startTime = performance.now();
                    
                    function updateNum(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const current = start + progress * (end - start);
                        textVal.textContent = current.toFixed(1) + "%";
                        if (progress < 1) {
                            requestAnimationFrame(updateNum);
                        } else {
                            textVal.textContent = end.toFixed(2) + "%";
                        }
                    }
                    requestAnimationFrame(updateNum);
                }
            }, 100);
        });
    }

    // 3. Load Merit List Explorer
    if (document.getElementById('explorer-list')) {
        loadStudentsData();
        setupFilters();
    }

    // 4. Comparison State Handlers
    const compareBtn = document.getElementById('compare-btn');
    const clearCompareBtn = document.getElementById('clear-compare-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const compareModal = document.getElementById('compare-modal');

    if (compareBtn) {
        compareBtn.addEventListener('click', openCompareModal);
    }
    if (clearCompareBtn) {
        clearCompareBtn.addEventListener('click', clearComparison);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            compareModal.classList.remove('active');
        });
    }

    function handleCompareChange(checkbox) {
        const id = checkbox.dataset.id;
        const college = collegesData.find(c => c.id === id);

        if (checkbox.checked) {
            if (selectedCompare.length >= 4) {
                alert("You can compare a maximum of 4 programs side-by-side.");
                checkbox.checked = false;
                return;
            }
            selectedCompare.push(college);
        } else {
            selectedCompare = selectedCompare.filter(c => c.id !== id);
        }

        updateCompareDrawer();
    }

    function updateCompareDrawer() {
        const drawer = document.getElementById('compare-drawer');
        const countSpan = document.getElementById('compare-count');
        if (drawer && countSpan) {
            countSpan.textContent = selectedCompare.length;
            if (selectedCompare.length > 0) {
                drawer.classList.add('active');
            } else {
                drawer.classList.remove('active');
            }
        }
    }

    function clearComparison() {
        selectedCompare = [];
        updateCompareDrawer();
        document.querySelectorAll('.compare-checkbox').forEach(chk => {
            chk.checked = false;
        });
    }

    function openCompareModal() {
        const tableHead = document.getElementById('compare-table-head');
        const tableBody = document.getElementById('compare-table-body');
        
        if (!tableHead || !tableBody || !compareModal) return;

        // Render Head Headers
        let headHtml = `<tr><th>Comparison Metric</th>`;
        selectedCompare.forEach(c => {
            headHtml += `<th>
                <div style="font-size: 1.15rem; color: var(--accent); font-weight: 800;">${c.name}</div>
            </th>`;
        });
        headHtml += `</tr>`;
        tableHead.innerHTML = headHtml;

        // Attributes configuration
        const attrs = [
            { label: 'Exam Paper Code', key: 'code', tag: true },
            { label: 'Rank Credentials', key: 'rank', link: true },
            { label: 'Tuition Fees (Total Program)', key: 'fee' },
            { label: 'Highest Salary Package', key: 'packages.highest' },
            { label: 'Average Salary Package', key: 'packages.average' },
            { label: 'Median Salary Package', key: 'packages.median', boldSuccess: true },
            { label: 'Lowest Salary Package', key: 'packages.lowest' },
            { label: 'Key Streams & Placed Roles', key: 'roles' },
            { label: 'Approx. ROI Index score *', key: 'roi', roiText: true },
            { label: 'General Cutoff Score (2025)', key: 'safeScore', suffix: '+' }
        ];

        let bodyHtml = '';
        attrs.forEach(attr => {
            bodyHtml += `<tr><td><strong>${attr.label}</strong></td>`;
            selectedCompare.forEach(c => {
                let cellVal = '';
                if (attr.key === 'roi') {
                    // Calculate ROI Score
                    const medVal = parseFloat(c.packages.median);
                    // TISS: 1.85, IIITL: 3.02, SAU: 3.20 tuition fee
                    const feeVal = c.id === 'tiss' ? 1.85 : (c.id === 'sau' ? 3.20 : 3.02);
                    cellVal = ((medVal / feeVal) * 10).toFixed(1) + " / 10";
                } else if (attr.key.includes('.')) {
                    const keys = attr.key.split('.');
                    cellVal = c[keys[0]][keys[1]];
                } else {
                    cellVal = c[attr.key];
                }

                if (attr.tag) {
                    bodyHtml += `<td><span class="tag tag-${c.id}">${cellVal}</span></td>`;
                } else if (attr.link) {
                    bodyHtml += `<td><a href="${c.rankUrl}" target="_blank" style="color: var(--accent); font-weight: 600; text-decoration: underline;">${cellVal} 🔗</a></td>`;
                } else if (attr.boldSuccess) {
                    bodyHtml += `<td><strong style="color: var(--success-text); font-size: 1.05rem;">${cellVal}</strong></td>`;
                } else if (attr.roiText) {
                    bodyHtml += `<td><strong style="color: var(--accent); font-size: 1.1rem; text-shadow: 0 0 10px rgba(255,122,0,0.15);">${cellVal}</strong></td>`;
                } else {
                    bodyHtml += `<td>${cellVal}${attr.suffix || ''}</td>`;
                }
            });
            bodyHtml += `</tr>`;
        });

        tableBody.innerHTML = bodyHtml;
        compareModal.classList.add('active');
    }

    // 5. Back-to-Top Button trigger
    const bttBtn = document.getElementById('back-to-top-btn');
    if (bttBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                bttBtn.classList.add('visible');
            } else {
                bttBtn.classList.remove('visible');
            }
        });
        bttBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Initialize Live Visitor Counter
    initVisitorCounter();
});

// Load student records and flatten into a searchable array
async function loadStudentsData() {
    try {
        let data = window.admittedStudents;
        
        if (!data) {
            const response = await fetch('admitted_students.json');
            data = await response.json();
        }
        
        allStudents = [];
        
        // Loop through each college
        for (const collegeId in data) {
            const college = collegesData.find(c => c.id === collegeId);
            if (!college) continue;
            
            const studentsList = data[collegeId];
            studentsList.forEach(student => {
                const isSAUET = student.score === 'N/A';
                allStudents.push({
                    name: student.name,
                    app: student.app,
                    score: student.score,
                    course: student.course || 'General',
                    collegeId: collegeId,
                    collegeName: college.name,
                    paperCode: isSAUET ? 'SAU-ET' : college.code,
                    percentile: isSAUET ? 0 : getEstimatedPercentile(student.score, college.code)
                });
            });
        }
        
        // Sort by score descending, placing N/A at the bottom
        allStudents.sort((a, b) => {
            const scoreA = typeof a.score === 'number' ? a.score : -1;
            const scoreB = typeof b.score === 'number' ? b.score : -1;
            return scoreB - scoreA;
        });
        
        // Copy to active filtered list
        filteredStudents = [...allStudents];
        
        // Render Density distribution chart
        renderDensityChart();
        
        // Initial draw explorer list
        renderExplorer();
    } catch (e) {
        console.error("Failed to load student merit list database", e);
        const container = document.getElementById('explorer-list');
        if (container) {
            container.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--accent);">Failed to load students merit list. Check console.</td></tr>`;
        }
    }
}

// Render dynamic candidate score density chart
function renderDensityChart() {
    const barsContainer = document.getElementById('density-chart-bars');
    if (!barsContainer) return;
    
    // Count students per band
    const bands = [
        { id: '250', label: '250+ Marks', count: 0 },
        { id: '200', label: '200 - 249', count: 0 },
        { id: '150', label: '150 - 199', count: 0 },
        { id: '100', label: '< 150 Marks', count: 0 }
    ];
    
    allStudents.forEach(s => {
        if (s.score >= 250) bands[0].count++;
        else if (s.score >= 200) bands[1].count++;
        else if (s.score >= 150) bands[2].count++;
        else bands[3].count++;
    });
    
    const maxCount = Math.max(...bands.map(b => b.count)) || 1;
    
    barsContainer.innerHTML = '';
    bands.forEach(b => {
        const percentage = (b.count / maxCount) * 100;
        const row = document.createElement('div');
        row.className = 'chart-row';
        row.dataset.band = b.id;
        
        row.innerHTML = `
            <div class="chart-row-label">${b.label}</div>
            <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: 0%;"></div>
            </div>
            <div class="chart-row-val">${b.count} candidates</div>
        `;
        
        // Animate bars
        setTimeout(() => {
            const fill = row.querySelector('.chart-bar-fill');
            if (fill) fill.style.width = `${percentage}%`;
        }, 100);
        
        // Click to filter Table
        row.addEventListener('click', () => {
            const scoreSelect = document.getElementById('explorer-score');
            if (!scoreSelect) return;
            
            const isActive = row.classList.contains('active');
            
            document.querySelectorAll('.chart-row').forEach(r => r.classList.remove('active'));
            
            if (isActive) {
                scoreSelect.value = 'all';
            } else {
                row.classList.add('active');
                scoreSelect.value = b.id;
            }
            
            scoreSelect.dispatchEvent(new Event('change'));
        });
        
        barsContainer.appendChild(row);
    });
}

// Render student list based on pagination and filters
function renderExplorer() {
    const listContainer = document.getElementById('explorer-list');
    const prevBtn = document.getElementById('explorer-prev');
    const nextBtn = document.getElementById('explorer-next');
    const infoSpan = document.getElementById('explorer-info');
    const noData = document.getElementById('explorer-no-data');
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    if (filteredStudents.length === 0) {
        noData.classList.remove('hidden');
        infoSpan.textContent = 'Showing 0 to 0 of 0 students';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }
    
    noData.classList.add('hidden');
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredStudents.length);
    const pageStudents = filteredStudents.slice(startIndex, endIndex);
    
    const searchQuery = document.getElementById('explorer-search').value.toLowerCase().trim();
    
    pageStudents.forEach((student, index) => {
        const absoluteRank = startIndex + index + 1;
        const tr = document.createElement('tr');
        
        // Highlight top performers
        let rankBadgeClass = '';
        if (absoluteRank === 1) rankBadgeClass = 'style="color: #d97706; font-weight:800;"';
        else if (absoluteRank === 2) rankBadgeClass = 'style="color: #475569; font-weight:800;"';
        else if (absoluteRank === 3) rankBadgeClass = 'style="color: #b45309; font-weight:800;"';

        // Apply text query highlighting
        const highlightedName = searchQuery ? highlightSearchText(student.name, searchQuery) : student.name;
        const highlightedApp = searchQuery ? highlightSearchText(student.app, searchQuery) : student.app;
        const highlightedCourse = searchQuery ? highlightSearchText(student.course, searchQuery) : student.course;

        tr.innerHTML = `
            <td ${rankBadgeClass}>#${absoluteRank}</td>
            <td>
                <div class="student-profile">
                    <div class="student-avatar">${student.name.trim().charAt(0)}</div>
                    <span style="font-weight: 600; font-size: 0.95rem;">${highlightedName}</span>
                </div>
            </td>
            <td><span class="tag tag-${student.collegeId}">${student.collegeName}</span></td>
            <td style="font-weight: 500; color: var(--text-main); font-size: 0.9rem;">${highlightedCourse}</td>
            <td class="hide-mobile"><span class="tag tag-success" style="font-size: 0.75rem;">${student.paperCode}</span></td>
            <td class="hide-mobile" style="font-family: monospace; color: var(--text-muted); font-size: 0.9rem;">${highlightedApp}</td>
            <td><span class="score-badge">${student.score}</span></td>
            <td style="font-weight: 700; color: var(--accent);">${student.score === 'N/A' ? 'N/A' : student.percentile.toFixed(2) + ' %ile'}</td>
        `;
        listContainer.appendChild(tr);
    });
    
    infoSpan.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${filteredStudents.length} candidates`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= filteredStudents.length;
}

// Setup searching and dropdown filtering listeners
function setupFilters() {
    const searchInput = document.getElementById('explorer-search');
    const collegeSelect = document.getElementById('explorer-college');
    const paperSelect = document.getElementById('explorer-paper');
    const scoreSelect = document.getElementById('explorer-score');
    
    const prevBtn = document.getElementById('explorer-prev');
    const nextBtn = document.getElementById('explorer-next');
    
    if (!searchInput) return;
    
    const applyFilters = () => {
        const query = searchInput.value.toLowerCase().trim();
        const collegeVal = collegeSelect.value;
        const paperVal = paperSelect.value;
        const scoreVal = scoreSelect.value;
        
        filteredStudents = allStudents.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(query) || 
                                  student.app.includes(query) ||
                                  student.course.toLowerCase().includes(query);
            const matchesCollege = collegeVal === 'all' || student.collegeId === collegeVal;
            const matchesPaper = paperVal === 'all' || student.paperCode === paperVal;
            
            let matchesScore = true;
            if (scoreVal !== 'all') {
                const scoreThreshold = parseInt(scoreVal, 10);
                matchesScore = student.score >= scoreThreshold;
            }
            
            return matchesSearch && matchesCollege && matchesPaper && matchesScore;
        });
        
        // Sync score density active state row highlights
        document.querySelectorAll('.chart-row').forEach(row => {
            if (row.dataset.band === scoreVal) {
                row.classList.add('active');
            } else {
                row.classList.remove('active');
            }
        });
        
        currentPage = 1;
        renderExplorer();
    };
    
    searchInput.addEventListener('input', applyFilters);
    collegeSelect.addEventListener('change', applyFilters);
    paperSelect.addEventListener('change', applyFilters);
    scoreSelect.addEventListener('change', applyFilters);
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderExplorer();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxPage = Math.ceil(filteredStudents.length / pageSize);
        if (currentPage < maxPage) {
            currentPage++;
            renderExplorer();
        }
    });
}

// Social Sharing function
window.shareResult = function(percentile, code, score) {
    const text = encodeURIComponent(`I just checked my CUET PG expected percentile standing! I got a score of ${score}/300 (${code}), estimating around the ${percentile}th percentile. Verify yours and compare top university cutoffs! 🎓🚀`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

// Live Visitor Counter
async function initVisitorCounter() {
    const counterEl = document.getElementById('visitor-count');
    if (!counterEl) return;

    // Use a fresh new key to start count from 0 on the server
    const apiKey = 'cuet-pg-tracker-fresh-v1';
    const baseline = 999; // baseline offset so first hit displays 1000

    const fallbackCount = () => {
        let visits = localStorage.getItem('cuet_pg_visits_v2');
        if (!visits) {
            visits = 1000; // Baseline visits
        }
        // Only increment local storage count once per session
        if (!sessionStorage.getItem('visited_local_session')) {
            visits = parseInt(visits, 10) + 1;
            localStorage.setItem('cuet_pg_visits_v2', visits);
            sessionStorage.setItem('visited_local_session', 'true');
        } else {
            visits = parseInt(visits, 10);
        }
        counterEl.textContent = visits.toLocaleString('en-IN');
    };

    try {
        let url = `https://api.counterapi.dev/v1/names/${apiKey}`;
        
        // If the user hasn't visited in this browser session, increment the global counter
        if (!sessionStorage.getItem('visited_global_session')) {
            url += '/up';
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('API failure');
        const data = await response.json();
        
        // Show counter
        const count = data.value || data.count;
        if (count !== undefined) {
            // Set session visited flag after a successful API fetch/increment
            if (url.endsWith('/up')) {
                sessionStorage.setItem('visited_global_session', 'true');
            }
            const displayCount = count + baseline;
            counterEl.textContent = displayCount.toLocaleString('en-IN');
        } else {
            fallbackCount();
        }
    } catch (err) {
        console.warn("Visitor API unavailable, using local fallback counter", err);
        fallbackCount();
    }
}
