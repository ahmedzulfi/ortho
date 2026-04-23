import os
import re

root = r'd:\work\ahmed work\development studio\ortho\src\pages\blog'

def cleanup_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 1. Remove "Triples" blocks - extremely flexible regex
        content = re.sub(r'<div[^>]*class="[^"]*p-6 bg-\[#D1FC71\]/10[^"]*"[^>]*>.*?</div>', '', content, flags=re.DOTALL)
        
        # 2. Simplify "The Stack" and other feature cards
        # We want to remove the wrapper div and its specific classes but keep the content if it's not a triple.
        
        # Pattern for Moat-style cards (big cards with blur)
        # We'll replace the div with a simple div and remove the blur child
        content = re.sub(r'<div[^>]*class="[^"]*bg-white border border-black/10 rounded-\[40px\][^"]*"[^>]*>', '<div class="w-full">', content, flags=re.DOTALL)
        content = re.sub(r'<div[^>]*class="[^"]*absolute top-0 right-0 w-64 h-64 bg-\[#D1FC71\]/20 blur-\[100px\][^"]*"[^>]*>.*?</div>', '', content, flags=re.DOTALL)

        # Pattern for Stack-style cards
        content = re.sub(r'<div[^>]*class="[^"]*bg-white p-8 rounded-\[30px\][^"]*"[^>]*>', '<div class="w-full">', content, flags=re.DOTALL)
        
        # Simplify the headings inside these cards
        content = re.sub(r'<h4[^>]*class="[^"]*uppercase tracking-widest text-\[#D1FC71\][^"]*"[^>]*>', '<h3 class="text-2xl font-bold mb-4">', content, flags=re.DOTALL)
        
        # Clean up the grid container
        content = re.sub(r'<div[^>]*class="[^"]*grid grid-cols-1 md:grid-cols-2 gap-12 items-start[^"]*"[^>]*>', '<div class="w-full flex flex-col gap-10">', content, flags=re.DOTALL)

        if content:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Final surgical cleanup on {path}")
            
    except Exception as e:
        print(f"Error processing {path}: {e}")

for r, d, files in os.walk(root):
    for f in files:
        if f.endswith('.astro'):
            cleanup_file(os.path.join(r, f))
