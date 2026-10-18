// Verified Institutional Placement & Admissions Database
const collegesData = [
    {
        id: 'tiss',
        name: 'TISS Mumbai',
        isMultiProgram: true,
        image: 'images/tiss_mumbai.png',
        programs: [
            {
                code: 'COQP12',
                name: 'COQP12 - MBA Equivalent & Flagships (HRM, ODCL, Analytics, SE, LSP, DM, DCRAS)',
                rank: 'NIRF Rank #72 (University) | Top 10 B-School Equivalent',
                rankUrl: 'https://tiss.ac.in/NIRF/',
                placementUrl: 'https://tiss.ac.in/placement_tiss/',
                fee: '₹1.85 Lakhs (Tuition) | ₹3.2 Lakhs (with Hostel)',
                safeScore: 235,
                packages: {
                    highest: '66.00 LPA',
                    average: '28.69 LPA',
                    median: '28.00 LPA',
                    lowest: '18.00 LPA'
                },
                roles: 'HR Specialist, OD Consultant, Talent Acquisition Lead, Labour Relations Advisor',
                description: 'Premier institute known for its incredible ROI and flagship COQP12 programs: HRM, ODCL, Social Entrepreneurship, Labour Studies & Practice, Disaster Management, Analytics, and Disaster & Climate Risk Assessment.'
            },
            {
                code: 'COQP11',
                name: 'COQP11 - Social Work, Public Health, MLISc, Education, Regulatory Policy, Urban Policy (20 Streams)',
                rank: 'NIRF Rank #72 (University) | India\'s Premier School of Social Work & Social Sciences',
                rankUrl: 'https://tiss.ac.in/NIRF/',
                placementUrl: 'https://tiss.ac.in/placement_tiss/',
                fee: '₹1.15 Lakhs (Tuition) | ₹2.5 Lakhs (with Hostel)',
                safeScore: 180,
                packages: {
                    highest: '12.00 LPA',
                    average: '7.20 LPA',
                    median: '7.00 LPA',
                    lowest: '5.00 LPA'
                },
                roles: 'CSR Specialist, Public Health Consultant, MLISc Officer, Social Worker, Policy Analyst, Researcher',
                description: 'TISS Mumbai offers highly reputed programs under COQP11, including Master of Arts in Social Work (9 streams), Master of Public Health (3 streams), MLISc, MA in Development Studies, MA in Women\'s Studies, MA in Education, B.Ed-M.Ed, M.Ed, and MA/MSc in Regulatory Policy and Urban Policy.'
            }
        ],
        code: 'COQP11 & COQP12',
        rank: 'NIRF Rank #72 (University) | Top Management & Social Work Program',
        rankUrl: 'https://tiss.ac.in/NIRF/',
        placementUrl: 'https://tiss.ac.in/placement_tiss/',
        fee: '₹1.15L - ₹1.85L (Tuition)',
        safeScore: 180,
        packages: {
            highest: '66.00 LPA',
            average: '7.20L - 28.69L',
            median: '28.00 LPA',
            lowest: '5.00 LPA'
        },
        roles: 'HR, Social Work, CSR, Public Health, Policy, Analytics',
        description: 'TISS Mumbai offers industry-leading management programs through COQP12 and premier social work & social science programs through COQP11, offering unmatched ROI and social impact.'
    },
    {
        id: 'sau',
        name: 'South Asian University',
        isMultiProgram: true,
        image: 'images/south_asian_univ.png',
        programs: [
            {
                code: 'COQP12',
                name: 'COQP12 - MBA Admissions (General Management)',
                rank: 'International SAARC University | Established by 8 SAARC Nations',
                rankUrl: 'https://sau.int/about/accreditation/',
                placementUrl: 'https://sau.int/training_placement_cell/',
                fee: '₹5.88 Lakhs (Tuition & Adm.) | ₹6.61 Lakhs (with Hostel)',
                safeScore: 140,
                packages: {
                    highest: '23.00 LPA',
                    average: '6.00 LPA',
                    median: '5.50 LPA',
                    lowest: '4.00 LPA'
                },
                roles: 'Business Analyst, Operations Manager, Corporate Consultant, Research Analyst',
                description: 'Admission via CUET PG Paper Code COQP12 (MBA / General Management).'
            },
            {
                code: 'COQP10',
                name: 'COQP10 - MBA Admissions (Commerce Stream Route)',
                rank: 'International SAARC University | Established by 8 SAARC Nations',
                rankUrl: 'https://sau.int/about/accreditation/',
                placementUrl: 'https://sau.int/training_placement_cell/',
                fee: '₹5.88 Lakhs (Tuition & Adm.) | ₹6.61 Lakhs (with Hostel)',
                safeScore: 120,
                packages: {
                    highest: '23.00 LPA',
                    average: '6.00 LPA',
                    median: '5.50 LPA',
                    lowest: '4.00 LPA'
                },
                roles: 'Business Analyst, Operations Manager, Corporate Consultant, Research Analyst',
                description: 'Admission via CUET PG Paper Code COQP10.'
            },
            {
                code: 'COQP08',
                name: 'COQP08 - MBA Admissions (Economics Stream Route)',
                rank: 'International SAARC University | Established by 8 SAARC Nations',
                rankUrl: 'https://sau.int/about/accreditation/',
                placementUrl: 'https://sau.int/training_placement_cell/',
                fee: '₹5.88 Lakhs (Tuition & Adm.) | ₹6.61 Lakhs (with Hostel)',
                safeScore: 110,
                packages: {
                    highest: '23.00 LPA',
                    average: '6.00 LPA',
                    median: '5.50 LPA',
                    lowest: '4.00 LPA'
                },
                roles: 'Business Analyst, Operations Manager, Corporate Consultant, Research Analyst',
                description: 'Admission via CUET PG Paper Code COQP08.'
            }
        ],
        code: 'COQP12, COQP10 & COQP08',
        rank: 'International SAARC University | Established by 8 SAARC Nations',
        rankUrl: 'https://sau.int/about/accreditation/',
        placementUrl: 'https://sau.int/training_placement_cell/',
        fee: '₹5.88 Lakhs (Tuition & Adm.) | ₹6.61 Lakhs (with Hostel)',
        safeScore: 140,
        packages: {
            highest: '23.00 LPA',
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
        image: 'images/iiit_lucknow.png',
        rank: 'Institute of National Importance | Top Emerging Tech B-School',
        rankUrl: 'https://iiitl.ac.in/',
        placementUrl: 'https://placements.iiitl.ac.in/',
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
    },
    {
        id: 'tiss_hyd',
        name: 'TISS Hyderabad',
        code: 'COQP11',
        image: 'images/tiss_hyderabad.png',
        rank: 'NIRF Rank #72 (University) | Off-Campus Hyderabad',
        rankUrl: 'https://tiss.ac.in/NIRF/',
        placementUrl: 'https://tiss.ac.in/placement_tiss/',
        fee: '₹1.45 Lakhs (Tuition) | ₹2.8 Lakhs (with Hostel)',
        safeScore: 165,
        packages: {
            highest: '28.00 LPA',
            average: '8.20 LPA',
            median: '8.00 LPA',
            lowest: '5.50 LPA'
        },
        roles: 'Policy Analyst, Development Executive, Education Coordinator, Governance Specialist',
        description: 'TISS Hyderabad campus offers highly reputed courses under COQP11: MA in Education, MA in Public Policy and Law, MA in Cities and Governance, MA in Natural Resources and Governance.'
    },
    {
        id: 'tiss_gwt',
        name: 'TISS Guwahati',
        code: 'COQP11',
        image: 'images/tiss_guwahati.png',
        rank: 'NIRF Rank #72 (University) | Off-Campus Guwahati',
        rankUrl: 'https://tiss.ac.in/NIRF/',
        placementUrl: 'https://tiss.ac.in/placement_tiss/',
        fee: '₹1.05 Lakhs (Tuition) | ₹2.2 Lakhs (with Hostel)',
        safeScore: 155,
        packages: {
            highest: '12.00 LPA',
            average: '6.00 LPA',
            median: '5.80 LPA',
            lowest: '4.50 LPA'
        },
        roles: 'Social Anthropologist, Conservation Specialist, Peace Practitioner, Counsellor, Social Worker',
        description: 'TISS Guwahati offers specialized programs under COQP11 focusing on North-East development: MA in Social Work, MA in Ecology Environment and Sustainable Development, MA in Sociology.'
    },
    {
        id: 'tiss_tjp',
        name: 'TISS Tuljapur',
        code: 'COQP11',
        image: 'images/tiss_tuljapur.png',
        rank: 'NIRF Rank #72 (University) | Off-Campus Tuljapur',
        rankUrl: 'https://tiss.ac.in/NIRF/',
        placementUrl: 'https://tiss.ac.in/placement_tiss/',
        fee: '₹1.10 Lakhs (Tuition) | ₹2.3 Lakhs (with Hostel)',
        safeScore: 150,
        packages: {
            highest: '9.00 LPA',
            average: '4.50 LPA',
            median: '4.20 LPA',
            lowest: '3.50 LPA'
        },
        roles: 'Rural Development Officer, Social Worker, Policy Research Associate',
        description: 'TISS Tuljapur offers the flagship MA in Social Work (Rural Development) under COQP11.'
    }
];

// Percentile Calculation Formula
function getEstimatedPercentile(score, paperCode) {
    const s = Math.max(0, Math.min(300, Number(score) || 0));
    let pct = 0;
    if (s >= 250) pct = 99.0 + ((s - 250) / 50) * 0.99;
    else if (s >= 200) pct = 95.0 + ((s - 200) / 50) * 4.0;
    else if (s >= 150) pct = 82.0 + ((s - 150) / 50) * 13.0;
    else if (s >= 100) pct = 60.0 + ((s - 100) / 50) * 22.0;
    else pct = Math.max(1.0, (s / 100) * 60.0);
    return parseFloat(pct.toFixed(2));
}

// Category Safe Score Threshold Helper
function getCategorySafeScore(baseSafeScore, category) {
    if (typeof baseSafeScore !== 'number') return baseSafeScore;
    switch (category) {
        case 'OBC': return Math.round(baseSafeScore * 0.90);
        case 'EWS': return Math.round(baseSafeScore * 0.91);
        case 'SC':  return Math.round(baseSafeScore * 0.78);
        case 'ST':  return Math.round(baseSafeScore * 0.72);
        default:    return baseSafeScore;
    }
}

// Global State
let allStudents = [];
let filteredStudents = [];
let currentPage = 1;
const pageSize = 15;
let selectedCompare = [];

// DOM Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    // 0. Theme Switcher Sync
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // 1. Render Colleges Grid with Compare check capability
    const collegeGrid = document.getElementById('college-grid');
    if (collegeGrid) {
        collegeGrid.innerHTML = '';
        collegesData.forEach(college => {
            const card = document.createElement('div');
            card.className = 'bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer border border-border-subtle group relative';
            
            const isChecked = selectedCompare.some(c => c.id === college.id) ? 'checked' : '';
            
            card.innerHTML = `
                <div class="w-full h-44 overflow-hidden bg-slate-surface">
                    <img src="${college.image}" alt="${college.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="college-card-compare absolute top-3 right-3 bg-deep-navy/85 backdrop-blur-sm text-canvas-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 z-10 shadow-sm">
                    <input type="checkbox" class="compare-checkbox accent-collegiate-gold cursor-pointer" data-id="${college.id}" id="chk-${college.id}" ${isChecked}>
                    <label for="chk-${college.id}" style="cursor: pointer;">Compare</label>
                </div>
                <div class="p-5 flex flex-col flex-1 justify-between">
                    <div>
                        <h3 class="text-title-lg font-bold text-deep-navy mb-1 group-hover:text-secondary transition-colors">${college.name}</h3>
                        <div class="flex flex-wrap gap-1.5 mb-2">
                            <span class="px-2 py-0.5 rounded bg-primary text-canvas-white text-xs font-bold">${college.code}</span>
                            <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-container text-xs font-bold">Safe: ${college.safeScore}+</span>
                        </div>
                        <p class="text-xs text-on-surface-variant font-medium mb-3 line-clamp-1">${college.rank}</p>
                    </div>
                    <div class="flex items-center justify-between pt-3 border-t border-border-subtle text-sm">
                        <span class="text-on-surface-variant font-medium">Avg: <strong class="text-deep-navy font-bold">${college.packages.average}</strong></span>
                        <span class="text-collegiate-gold font-bold flex items-center gap-0.5">Details &rarr;</span>
                    </div>
                </div>
            `;
            
            const chkContainer = card.querySelector('.college-card-compare');
            if (chkContainer) {
                chkContainer.addEventListener('click', (e) => e.stopPropagation());
            }

            const checkbox = card.querySelector('.compare-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', (e) => handleCompareChange(e.target));
            }

            card.addEventListener('click', () => {
                window.location.href = `college.html#${college.id}`;
            });
            collegeGrid.appendChild(card);
        });
    }

    // 2. Predictor Logic
    const rankForm = document.getElementById('rank-form');
    const scoreInput = document.getElementById('score');
    const resultBox = document.getElementById('result');

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
            
            const attainableColleges = collegesData.filter(c => {
                let safeScore = c.safeScore;
                let code = c.code;
                if (c.isMultiProgram) {
                    const prog = c.programs.find(p => p.code === paperCode);
                    if (prog) safeScore = prog.safeScore;
                }
                const adjustedSafe = getCategorySafeScore(safeScore, category);
                return score >= adjustedSafe;
            });

            let feedbackMsg = '';
            if (score >= 230) {
                feedbackMsg = `Outstanding! You are in the premium safe zone for Category [${category}]. High likelihood of TISS Mumbai flagship admission.`;
            } else if (score >= 180) {
                feedbackMsg = `Excellent score! High likelihood of securing admission to TISS, SAU, or IIIT Lucknow for Category [${category}].`;
            } else if (score >= 140) {
                feedbackMsg = `Great effort! Solid chance at South Asian University, IIIT Lucknow, or subsequent counseling rounds for TISS for Category [${category}].`;
            } else {
                feedbackMsg = `Target category allocations, spot selection lists, or prepare for category merit lists.`;
            }

            let attainableHtml = attainableColleges.length > 0 
                ? `<div class="mt-3 p-3 rounded-lg bg-secondary-fixed text-on-secondary-container text-sm font-semibold">
                     🎯 <strong>Target Safe Zone (${category}):</strong> ${attainableColleges.map(c => c.name).join(', ')}
                   </div>`
                : '';

            resultBox.innerHTML = `
                <div class="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
                    <span class="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Prediction Outcome</span>
                    <span class="px-3 py-0.5 rounded-full text-xs font-bold bg-collegiate-gold text-on-primary">${score >= 200 ? 'HIGH ADMISSION CHANCE' : (score >= 140 ? 'MODERATE REACH' : 'LOW PROBABILITY')}</span>
                </div>
                <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-4 text-center">
                    <div style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 130px; height: 130px;">
                        <svg viewBox="0 0 120 120" style="width: 130px; height: 130px;">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" stroke-width="8"></circle>
                            <circle id="gauge-fill-arc" cx="60" cy="60" r="50" fill="none" stroke="#F3A13E" stroke-width="8"
                                    stroke-dasharray="314.16" stroke-dashoffset="314.16" stroke-linecap="round" transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1s ease-out;"></circle>
                        </svg>
                        <div id="gauge-value-text" style="position: absolute; font-size: 1.5rem; font-weight: 800; color: #0C2340; font-family: 'Source Serif 4', serif;">0%</div>
                    </div>
                    <div class="text-xs uppercase font-bold text-on-surface-variant tracking-wider mt-1">Estimated Percentile</div>
                </div>
                <p class="text-sm text-on-surface-variant leading-relaxed">
                    ${feedbackMsg}
                </p>
                ${attainableHtml}
                <button type="button" onclick="shareResult('${paperCode}', ${score})" class="mt-4 w-full py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
                    📱 Share My Estimate on WhatsApp
                </button>
            `;
            
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                const fillArc = document.getElementById('gauge-fill-arc');
                const textVal = document.getElementById('gauge-value-text');
                if (fillArc) {
                    const offset = 314.16 * (1 - estimatedPercentile / 100);
                    fillArc.style.strokeDashoffset = offset;
                }
                if (textVal) {
                    textVal.textContent = estimatedPercentile.toFixed(2) + "%";
                }
            }, 100);
        });
    }

    // 3. Load Merit List Explorer
    if (document.getElementById('explorer-list')) {
        loadStudentsData();
        setupFilters();
    }

    // 4. Comparison Handlers
    const compareBtn = document.getElementById('compare-btn');
    const clearCompareBtn = document.getElementById('clear-compare-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const compareModal = document.getElementById('compare-modal');

    if (compareBtn) compareBtn.addEventListener('click', openCompareModal);
    if (clearCompareBtn) clearCompareBtn.addEventListener('click', clearComparison);
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (compareModal) {
                compareModal.classList.remove('active');
                compareModal.style.display = 'none';
            }
        });
    }
    if (compareModal) {
        compareModal.addEventListener('click', (e) => {
            if (e.target === compareModal) {
                compareModal.classList.remove('active');
                compareModal.style.display = 'none';
            }
        });
    }

    // 5. Back-to-Top Button
    const bttBtn = document.getElementById('back-to-top-btn');
    if (bttBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) bttBtn.classList.add('visible');
            else bttBtn.classList.remove('visible');
        });
        bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 6. Visitor Counter
    initVisitorCounter();
});

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
        if (selectedCompare.length > 0) drawer.classList.add('active');
        else drawer.classList.remove('active');
    }
}

function clearComparison() {
    selectedCompare = [];
    updateCompareDrawer();
    document.querySelectorAll('.compare-checkbox').forEach(chk => chk.checked = false);
}

function openCompareModal() {
    const tableHead = document.getElementById('compare-table-head');
    const tableBody = document.getElementById('compare-table-body');
    const compareModal = document.getElementById('compare-modal');
    
    if (!tableHead || !tableBody || !compareModal) return;

    let headHtml = `<tr><th class="p-3 bg-slate-surface text-deep-navy font-bold text-xs uppercase">Comparison Metric</th>`;
    selectedCompare.forEach(c => {
        headHtml += `<th class="p-3 bg-slate-surface text-deep-navy font-bold"><div class="text-base text-deep-navy font-bold">${c.name}</div></th>`;
    });
    headHtml += `</tr>`;
    tableHead.innerHTML = headHtml;

    const attrs = [
        { label: 'Exam Paper Code', key: 'code' },
        { label: 'Rank Credentials', key: 'rank' },
        { label: 'Tuition Fees (Total Program)', key: 'fee' },
        { label: 'Highest Salary Package', key: 'packages.highest' },
        { label: 'Average Salary Package', key: 'packages.average' },
        { label: 'Median Salary Package', key: 'packages.median' },
        { label: 'Key Streams & Roles', key: 'roles' },
        { label: 'General Cutoff Score', key: 'safeScore', suffix: '+' }
    ];

    let bodyHtml = '';
    attrs.forEach(attr => {
        bodyHtml += `<tr class="border-b border-border-subtle"><td class="p-3 font-semibold text-deep-navy">${attr.label}</td>`;
        selectedCompare.forEach(c => {
            let cellVal = '';
            if (attr.key.includes('.')) {
                const keys = attr.key.split('.');
                cellVal = c[keys[0]][keys[1]];
            } else {
                cellVal = c[attr.key];
            }
            bodyHtml += `<td class="p-3 text-on-surface-variant font-medium">${cellVal || ''}${attr.suffix || ''}</td>`;
        });
        bodyHtml += `</tr>`;
    });

    tableBody.innerHTML = bodyHtml;
    compareModal.style.display = 'flex';
    compareModal.classList.add('active');
}

// Data loading from memory or json
async function loadStudentsData() {
    try {
        let data = window.admittedStudents;
        if (!data) {
            try {
                const response = await fetch('admitted_students.json');
                if (response.ok) data = await response.json();
            } catch (err) {
                console.warn("Fetch fallback notice:", err);
            }
        }
        if (!data) return;
        
        allStudents = [];
        
        for (const collegeId in data) {
            let targetCollegeId = collegeId;
            if (collegeId === 'tiss_mumbai' || collegeId === 'tiss_coqp11') targetCollegeId = 'tiss';
            
            const college = collegesData.find(c => c.id === targetCollegeId) || { name: collegeId, code: 'COQP12' };
            const list = data[collegeId] || [];

            list.forEach(s => {
                const isUnmatched = s.score === 'N/A';
                const paperCode = s.paperCode || (collegeId.includes('coqp11') ? 'COQP11' : (s.course && s.course.includes('MBA') ? 'COQP12' : college.code.split(',')[0]));
                
                allStudents.push({
                    app: s.app || s.token || 'N/A',
                    name: s.name || 'Candidate',
                    score: s.score,
                    course: s.course || 'Admitted Program',
                    collegeId: targetCollegeId,
                    collegeName: college.name,
                    paperCode: paperCode,
                    percentile: isUnmatched ? 0 : getEstimatedPercentile(s.score, paperCode)
                });
            });
        }

        allStudents.sort((a, b) => {
            const numA = typeof a.score === 'number' ? a.score : -1;
            const numB = typeof b.score === 'number' ? b.score : -1;
            return numB - numA;
        });

        filteredStudents = [...allStudents];
        
        const countEl = document.getElementById('stat-verified-count');
        if (countEl) countEl.textContent = allStudents.length.toLocaleString();

        renderExplorer();
    } catch (e) {
        console.error("Failed to load student merit list database", e);
    }
}

function renderExplorer() {
    const listContainer = document.getElementById('explorer-list');
    const prevBtn = document.getElementById('explorer-prev');
    const nextBtn = document.getElementById('explorer-next');
    const infoSpan = document.getElementById('explorer-info');
    const noData = document.getElementById('explorer-no-data');
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    if (filteredStudents.length === 0) {
        if (noData) noData.classList.remove('hidden');
        if (infoSpan) infoSpan.textContent = 'Showing 0 of 0 candidates';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
    }
    
    if (noData) noData.classList.add('hidden');
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredStudents.length);
    const pageStudents = filteredStudents.slice(startIndex, endIndex);
    
    pageStudents.forEach((student, index) => {
        const absoluteRank = startIndex + index + 1;
        const tr = document.createElement('tr');
        
        const isUnmatched = student.score === 'N/A';
        const percentileText = isUnmatched ? 'N/A' : `${student.percentile.toFixed(2)}%`;

        tr.innerHTML = `
            <td class="font-bold text-collegiate-gold">#${absoluteRank}</td>
            <td class="font-semibold text-deep-navy">${student.name}</td>
            <td><span class="college-tag">${student.collegeName}</span></td>
            <td class="text-xs font-medium">${student.course}</td>
            <td class="hidden md:table-cell"><span class="px-2 py-0.5 rounded bg-primary text-canvas-white font-bold text-xs">${student.paperCode}</span></td>
            <td class="hidden md:table-cell font-bold text-secondary">${percentileText}</td>
            <td class="hidden md:table-cell font-mono text-xs text-on-surface-variant">${student.app}</td>
            <td><span class="score-chip">${student.score}</span></td>
        `;
        listContainer.appendChild(tr);
    });
    
    if (infoSpan) infoSpan.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${filteredStudents.length.toLocaleString()} candidates`;
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = endIndex >= filteredStudents.length;
}

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
        const collegeVal = collegeSelect ? collegeSelect.value : 'all';
        const paperVal = paperSelect ? paperSelect.value : 'all';
        const scoreVal = scoreSelect ? scoreSelect.value : 'all';
        
        filteredStudents = allStudents.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(query) || 
                                  student.app.includes(query) ||
                                  student.course.toLowerCase().includes(query);
            const matchesCollege = collegeVal === 'all' || student.collegeId === collegeVal;
            const matchesPaper = paperVal === 'all' || student.paperCode.includes(paperVal);
            
            let matchesScore = true;
            if (scoreVal !== 'all') {
                const scoreThreshold = parseInt(scoreVal, 10);
                matchesScore = typeof student.score === 'number' && student.score >= scoreThreshold;
            }
            
            return matchesSearch && matchesCollege && matchesPaper && matchesScore;
        });
        
        currentPage = 1;
        renderExplorer();
    };
    
    searchInput.addEventListener('input', applyFilters);
    if (collegeSelect) collegeSelect.addEventListener('change', applyFilters);
    if (paperSelect) paperSelect.addEventListener('change', applyFilters);
    if (scoreSelect) scoreSelect.addEventListener('change', applyFilters);
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderExplorer();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxPage = Math.ceil(filteredStudents.length / pageSize);
            if (currentPage < maxPage) {
                currentPage++;
                renderExplorer();
            }
        });
    }
}

window.shareResult = function(code, score) {
    const text = encodeURIComponent(`I evaluated my CUET PG admission odds! My score: ${score}/300 (${code}). Check your safe score on CUET PG Tracker! 🎓🚀 https://cuetpgtracker.me/`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

async function initVisitorCounter() {
    const counterEl = document.getElementById('visitor-count');
    if (!counterEl) return;

    const baseline = 1240;
    try {
        let url = 'https://counterapi.com/api/v1/cuetpgtracker_me';
        if (!sessionStorage.getItem('visited_global_session')) {
            url = 'https://counterapi.com/api/v1/cuetpgtracker_me/up';
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();

        if (data && typeof data.value === 'number') {
            if (url.endsWith('/up')) sessionStorage.setItem('visited_global_session', 'true');
            const totalVisits = data.value + baseline;
            counterEl.textContent = `${totalVisits.toLocaleString('en-IN')}+`;
        } else {
            counterEl.textContent = '1,840+';
        }
    } catch (e) {
        counterEl.textContent = '1,840+';
    }
}
