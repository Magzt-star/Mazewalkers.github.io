from PIL import Image
import os

# Define input and output folders
input_folder = r"C:\Users\Acer\Pictures\Prideflags"   # Change this to your PNG folder path
output_folder = r"C:\Users\Acer\Pictures\Prideflagsjpg"  # Change this to your JPG output folder

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Convert all PNGs in the input folder to JPG
for filename in os.listdir(input_folder):
    if filename.lower().endswith(".png"):
        png_path = os.path.join(input_folder, filename)
        jpg_filename = os.path.splitext(filename)[0] + ".jpg"
        jpg_path = os.path.join(output_folder, jpg_filename)

        try:
            with Image.open(png_path) as img:
                rgb_img = img.convert("RGB")  # Convert to RGB (JPEG doesn’t support transparency)
                rgb_img.save(jpg_path, "JPEG", quality=90)  # Save as JPG with 90% quality
            print(f"Converted: {filename} → {jpg_filename}")
        except Exception as e:
            print(f"Error converting {filename}: {e}")

print("Batch conversion complete!")
