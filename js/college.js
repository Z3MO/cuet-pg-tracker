document.addEventListener('DOMContentLoaded', async () => {
    try {
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

        const colleges = window.collegesData || (typeof collegesData !== 'undefined' ? collegesData : []);
        const getEstimatedPercentile = window.getEstimatedPercentile || ((score, paperCode) => {
            const s = Math.max(0, Math.min(300, Number(score) || 0));
            let pct = 0;
            if (s >= 250) pct = 99.0 + ((s - 250) / 50) * 0.99;
            else if (s >= 200) pct = 95.0 + ((s - 200) / 50) * 4.0;
            else if (s >= 150) pct = 82.0 + ((s - 150) / 50) * 13.0;
            else if (s >= 100) pct = 60.0 + ((s - 100) / 50) * 22.0;
            else pct = Math.max(1.0, (s / 100) * 60.0);
            return parseFloat(pct.toFixed(2));
        });

        async function initCollegePage() {
            const params = new URLSearchParams(window.location.search);
            let collegeId = params.get('id') || window.location.hash.substring(1) || 'tiss';

            let college = colleges.find(c => c.id === collegeId);
            if (!college) college = colleges[0] || { id: 'tiss', name: 'TISS Mumbai', code: 'COQP12', description: 'Tata Institute of Social Sciences' };

            // Highlight active picker button
            document.querySelectorAll('#college-picker-bar a').forEach(a => {
                const targetHash = a.getAttribute('href').split('#')[1];
                if (targetHash === college.id) {
                    a.className = 'px-4 py-2 rounded-lg font-bold text-label-md bg-deep-navy text-canvas-white shadow-sm';
                } else {
                    a.className = 'px-4 py-2 rounded-lg font-bold text-label-md bg-slate-surface text-on-surface hover:bg-surface-container';
                }
            });

            const setElementText = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            };

            setElementText('c-name', college.name);
            setElementText('c-code', college.code);
            setElementText('c-desc', college.description || `${college.name} admission benchmarks and verified student allotments.`);
            setElementText('c-rank', college.rank || 'N/A');
            setElementText('c-safescore', `${college.safeScore || 180}+`);
            setElementText('c-median', `₹${college.packages ? college.packages.median : '7.00 LPA'}`);
            setElementText('c-fee', college.feeDisplay || college.fee || '₹1.85 Lakhs');

            const collegeImage = document.getElementById('c-image');
            if (collegeImage) {
                collegeImage.src = college.image || 'images/tiss_mumbai.png';
                collegeImage.alt = college.name;
            }

            // Load student list for this college
            let collegeStudents = [];
            const courseSelectDropdown = document.getElementById('course-select-dropdown');
            const tbody = document.getElementById('student-list');

            try {
                let data = window.admittedStudents;
                if (!data) {
                    const response = await fetch('admitted_students.json');
                    if (response.ok) data = await response.json();
                }

                if (data) {
                    if (college.id === 'tiss') {
                        const m12 = (data['tiss'] || []).map(s => ({ ...s, paperCode: s.paperCode || 'COQP12' }));
                        const m11 = (data['tiss_coqp11'] || []).map(s => ({ ...s, paperCode: s.paperCode || 'COQP11' }));
                        collegeStudents = [...m12, ...m11];
                    } else if (college.id === 'sau') {
                        collegeStudents = (data['sau'] || []).map(s => ({ ...s, paperCode: s.paperCode || 'COQP12' }));
                    } else {
                        collegeStudents = (data[college.id] || []).map(s => ({ ...s, paperCode: s.paperCode || college.code }));
                    }
                }
            } catch (err) {
                console.warn("Fetch failed, rendering fallback list:", err);
            }

            // Populate course selector
            if (courseSelectDropdown) {
                const uniqueCourses = [...new Set(collegeStudents.map(s => s.course).filter(Boolean))].sort();
                let courseHtml = '<option value="all">All Specializations (Merged View)</option>';
                uniqueCourses.forEach(c => {
                    courseHtml += `<option value="${c}">${c}</option>`;
                });
                courseSelectDropdown.innerHTML = courseHtml;

                courseSelectDropdown.onchange = () => {
                    renderTable();
                };
            }

            function renderTable() {
                if (!tbody) return;
                const selCourse = courseSelectDropdown ? courseSelectDropdown.value : 'all';
                const filtered = selCourse === 'all' 
                    ? collegeStudents 
                    : collegeStudents.filter(s => s.course === selCourse);

                if (filtered.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="6" class="p-space-lg text-center text-on-surface-variant font-semibold">No student records match the selected course filter.</td></tr>`;
                    return;
                }

                tbody.innerHTML = '';
                filtered.slice(0, 50).forEach((s, idx) => {
                    const isNum = typeof s.score === 'number';
                    const pct = isNum ? getEstimatedPercentile(s.score, s.paperCode) : 0;
                    const tr = document.createElement('tr');
                    tr.className = `${idx % 2 === 1 ? 'bg-surface-bright' : ''} hover:bg-slate-surface transition-colors`;
                    
                    tr.innerHTML = `
                        <td class="p-3 font-bold text-deep-navy">#${idx + 1}</td>
                        <td class="p-3 font-semibold text-deep-navy">${s.name || 'Candidate'}</td>
                        <td class="p-3">${s.course || 'General'}</td>
                        <td class="p-3"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-container font-bold text-label-sm">${s.paperCode || 'COQP12'}</span></td>
                        <td class="p-3 text-secondary font-bold">${isNum ? pct + ' %ile' : 'N/A'}</td>
                        <td class="p-3 text-right font-bold text-deep-navy">${isNum ? s.score + ' / 300' : 'N/A'}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }

            renderTable();

            const loader = document.getElementById('loading');
            const content = document.getElementById('college-content');
            if (loader) loader.classList.add('hidden');
            if (content) content.classList.remove('hidden');
        }

        window.addEventListener('hashchange', () => {
            initCollegePage();
        });

        initCollegePage();
    } catch (err) {
        console.error("Error in college.js:", err);
    }
});