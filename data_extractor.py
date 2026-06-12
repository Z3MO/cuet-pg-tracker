import fitz
import re
import json
import os
import glob

def extract_data():
    # 1. Parse CUET MBA RANKING to get AppNo -> {Name, Score, Roll}
    print("Parsing CUET MBA Ranking...")
    ranking_text = ''
    try:
        doc = fitz.open('CUET MBA RANKING.pdf')
        for page in doc:
            ranking_text += page.get_text() + '\n'
    except Exception as e:
        print(f"Error opening ranking: {e}")
        return

    lines = [L.strip() for L in ranking_text.split('\n') if L.strip()]
    app_data = {}
    
    for i, line in enumerate(lines):
        if line.isdigit() and len(line) == 12: # App No
            app_no = line
            try:
                roll_no = lines[i+1]
                name = lines[i+2]
                
                # find score ahead
                score = None
                for j in range(i+3, min(i+10, len(lines))):
                    if lines[j].isdigit() and 0 < int(lines[j]) <= 300:
                        score = int(lines[j])
                        break
                
                if score is not None:
                    app_data[app_no] = {
                        "name": name,
                        "roll": roll_no,
                        "score": score
                    }
            except IndexError:
                pass

    print(f"Extracted {len(app_data)} records from Rankings.")

    # 2. Parse IIITL lists and map candidates
    iiitl_students = []
    iiitl_files = [
        'IIITL/IITL LIST1.pdf', 
        'IIITL/IIITL LIST2.pdf', 
        'IIITL/IIITL LIST3.pdf'
    ]
    
    for f in iiitl_files:
        if not os.path.exists(f):
            print(f"Warning: {f} not found!")
            continue
        try:
            doc = fitz.open(f)
            for page in doc:
                text = page.get_text()
                apps = re.findall(r'\b2535\d{8}\b', text)
                for app in apps:
                    if app in app_data and app not in [s['app'] for s in iiitl_students]:
                        iiitl_students.append({
                            "app": app,
                            "name": app_data[app]['name'],
                            "score": app_data[app]['score'],
                            "course": "MBA (Digital Business)"
                        })
        except Exception as e:
            print(f"Error reading {f}: {e}")

    # Sort students by score descending
    iiitl_students.sort(key=lambda x: x['score'], reverse=True)
    print(f"Found {len(iiitl_students)} admitted students for IIITL.")

    # 3. Parse TISS lists and map candidates
    tiss_students = []
    tiss_files = glob.glob(os.path.join('TISS', '*.pdf')) + glob.glob(os.path.join('TISS', '*.txt'))
    
    # Create name to app mapping for TISS cross-reference.
    # If a name has multiple entries in the rankings list, map to the one with the highest score.
    temp_name_map = {}
    for k, v in app_data.items():
        name_upper = v['name'].strip().upper()
        score = v['score']
        if name_upper not in temp_name_map:
            temp_name_map[name_upper] = (k, score)
        else:
            existing_app, existing_score = temp_name_map[name_upper]
            if score > existing_score:
                temp_name_map[name_upper] = (k, score)
                
    name_to_app = {name: app for name, (app, score) in temp_name_map.items()}
    
    for f in tiss_files:
        # We only parse the OCR text files because the PDFs are scanned images
        if not f.endswith('.txt'):
            continue
            
        basename = os.path.basename(f)
        
        # Identify course specialization from file name prefix
        if basename.startswith('ANLT'):
            course = "MA/MSc. in Analytics"
        elif basename.startswith('DM'):
            course = "Master of Arts / Master of Science in Disaster Management"
        elif basename.startswith('LSP'):
            course = "Master of Arts in Labour Studies and Practice"
        elif basename.startswith('SE'):
            course = "Master of Arts in Social Entrepreneurship"
        else:
            print(f"Skipping unknown TISS file: {basename}")
            continue

        try:
            with open(f, 'r', encoding='utf-8') as txt_file:
                text = txt_file.read()

            if not text.strip():
                continue
                
            # Method 1: Find application numbers
            apps = re.findall(r'\b2535\d{8}\b', text)
            for app in apps:
                if app in app_data and app not in [s['app'] for s in tiss_students]:
                    tiss_students.append({
                        "app": app,
                        "name": app_data[app]['name'],
                        "score": app_data[app]['score'],
                        "course": course
                    })
                    
            # Method 2: Match TISS Registration Patterns
            lines = text.split('\n')
            for line in lines:
                if 'TISS' in line and not line.startswith('http'):
                    match = re.search(r'TISS[O0]?\d+\s*[-|]?\s*\d*\s*[-|]?\s*(.+)', line)
                    if match:
                        raw_name = match.group(1).strip()
                        raw_name = re.sub(r'[^A-Z ]', '', raw_name).strip()
                        if raw_name in name_to_app:
                            app = name_to_app[raw_name]
                            if app not in [s['app'] for s in tiss_students]:
                                tiss_students.append({
                                    "app": app,
                                    "name": app_data[app]['name'],
                                    "score": app_data[app]['score'],
                                    "course": course
                                })
        except Exception as e:
            print(f"Error reading {f}: {e}")

    # Sort students by score descending
    tiss_students.sort(key=lambda x: x['score'], reverse=True)
    print(f"Found {len(tiss_students)} admitted/waitlisted students for TISS.")

    # Load existing SAU and DAV data from js/students_data.js to preserve it
    sau_students = []
    dav_students = []
    
    try:
        if os.path.exists('js/students_data.js'):
            with open('js/students_data.js', 'r', encoding='utf-8') as ex_f:
                content = ex_f.read().strip()
                if content.startswith('window.admittedStudents ='):
                    content = content[len('window.admittedStudents ='):].strip()
                if content.endswith(';'):
                    content = content[:-1].strip()
                existing_data = json.loads(content)
                sau_students = existing_data.get("sau", [])
                dav_students = existing_data.get("dav", [])
                print("Loaded and preserved SAU and DAV student records from js/students_data.js.")
    except Exception as e:
        print(f"Warning: Could not preserve SAU/DAV data: {e}")

    # Combined output data
    output_data = {
        "iiitl": iiitl_students,
        "tiss": tiss_students,
        "sau": sau_students,
        "dav": dav_students
    }

    # Save to admitted_students.json
    with open('admitted_students.json', 'w', encoding='utf-8') as out:
        json.dump(output_data, out, indent=4)
    print("Saved to admitted_students.json")

    # Save to js/students_data.js
    output_js = f"window.admittedStudents = {json.dumps(output_data, indent=4)};"
    with open('js/students_data.js', 'w', encoding='utf-8') as out_js:
        out_js.write(output_js)
    print("Saved to js/students_data.js")
    
    print("\nData extraction complete! Database has been successfully updated.")

if __name__ == "__main__":
    extract_data()