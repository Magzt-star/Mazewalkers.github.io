from flask import Flask, request, render_template, send_file
from PIL import Image
import os
import zipfile
import io

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "converted"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("bulk_converter.html")

@app.route("/convert", methods=["POST"])
def convert():
    uploaded_files = request.files.getlist("images")
    if not uploaded_files:
        return "No files uploaded.", 400

    converted_files = []
    
    for file in uploaded_files:
        if file.filename.lower().endswith(".png"):
            img = Image.open(file)
            rgb_img = img.convert("RGB")
            jpg_filename = os.path.splitext(file.filename)[0] + ".jpg"
            jpg_path = os.path.join(OUTPUT_FOLDER, jpg_filename)
            rgb_img.save(jpg_path, "JPEG", quality=90)
            converted_files.append(jpg_path)

    # Create a zip file of all converted images
    zip_filename = "converted_images.zip"
    zip_buffer = io.BytesIO()
    
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for file_path in converted_files:
            zip_file.write(file_path, os.path.basename(file_path))

    zip_buffer.seek(0)

    return send_file(zip_buffer, as_attachment=True, download_name=zip_filename, mimetype="application/zip")

if __name__ == "__main__":
    app.run(debug=True)
