import os
import glob
import fitz  # PyMuPDF
import io

try:
    import pytesseract
    from PIL import Image
except ImportError:
    print("Missing dependencies! Please run: pip install pytesseract Pillow")
    exit(1)

# ==============================================================================
# IMPORTANT: FOR WINDOWS USERS
# You must download and install the Tesseract OCR engine from:
# https://github.com/UB-Mannheim/tesseract/wiki
# After installation, ensure the path below matches where it was installed.
# ==============================================================================
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def ocr_scanned_pdfs(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    pdf_files = glob.glob(os.path.join(input_folder, '*.pdf'))
    print(f"Found {len(pdf_files)} PDFs in '{input_folder}'. Starting OCR process...")

    for pdf_path in pdf_files:
        filename = os.path.basename(pdf_path)
        txt_filename = filename.replace('.pdf', '.txt')
        txt_path = os.path.join(output_folder, txt_filename)

        # Skip if already processed
        if os.path.exists(txt_path):
            print(f"Skipping {filename} (Already OCR'd)")
            continue

        print(f"Processing {filename}...")
        extracted_text = ""

        try:
            doc = fitz.open(pdf_path)
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                # Render the page to a high-resolution image for better OCR accuracy
                pix = page.get_pixmap(dpi=300)
                img_data = pix.tobytes("png")
                img = Image.open(io.BytesIO(img_data))
                
                # Perform OCR on the image
                text = pytesseract.image_to_string(img)
                extracted_text += text + "\n"
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            continue

        # Save the extracted text to a .txt file
        if extracted_text.strip():
            with open(txt_path, 'w', encoding='utf-8') as f:
                f.write(extracted_text)
            print(f"  -> Saved text to {txt_filename}")
        else:
            print(f"  -> No text found in {filename}")

if __name__ == "__main__":
    # We will process the PDFs in 'tiss' and save text files back to 'tiss'
    ocr_scanned_pdfs('tiss', 'tiss')
    print("\nOCR Complete! You can now run 'python data_extractor.py' to generate the JSON.")