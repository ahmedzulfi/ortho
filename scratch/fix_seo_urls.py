import os
import re

root = r'd:\work\ahmed work\development studio\ortho\src'
pattern = re.compile(r'https?://validmvps\.com')
replacement = 'https://validmvps.vercel.app'

for r, d, files in os.walk(root):
    for f in files:
        if f.endswith(('.astro', '.jsx', '.tsx', '.ts', '.js', '.json', '.xml', '.html')):
            path = os.path.join(r, f)
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                if 'validmvps.com' in content:
                    new_content = content.replace('https://validmvps.com', 'https://validmvps.vercel.app')
                    new_content = new_content.replace('http://validmvps.com', 'https://validmvps.vercel.app')
                    
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f"Updated {path}")
            except Exception as e:
                print(f"Error processing {path}: {e}")
