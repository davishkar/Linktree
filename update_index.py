import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update body
text = re.sub(
    r'<body[^>]*class="[^"]*"[^>]*>',
    r'<body class="min-h-screen bg-[#F8F9FA] transition-all duration-500 font-sans text-[#1F2937]">',
    text
)

# 2. Update background elements
bg_html = '''    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute -top-20 -right-20 w-96 h-96 bg-[#1E3A8A] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F59E0B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style="animation-delay: 2s;"></div>
    </div>'''
text = re.sub(
    r'<div class="fixed inset-0 overflow-hidden pointer-events-none">.*?</div>\s*</div>\s*</div>',
    bg_html,
    text,
    flags=re.DOTALL
)

# 3. Update Header (Remove theme toggle, update share button)
header_pattern = r'<header class="fixed top-0 right-0 z-50 p-4">.*?</header>'
new_header = '''    <header class="fixed top-0 right-0 z-50 p-4">
        <div class="flex items-center gap-4">
            <!-- Share Button -->
            <button id="shareBtn" aria-label="Share this page"
                class="w-12 h-12 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-[#1E3A8A] hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.6464 3.85347L11 4.20702L11.7071 3.49992L11.3536 3.14636L8.35355 0.146362H7.64645L4.64645 3.14636L4.29289 3.49992L5 4.20702L5.35355 3.85347L7.5 1.70702V9.49992V9.99992H8.5V9.49992V1.70702L10.6464 3.85347ZM1 5.49994L1.5 4.99994H4V5.99994H2V14.9999H14V5.99994H12V4.99994H14.5L15 5.49994V15.4999L14.5 15.9999H1.5L1 15.4999V5.49994Z">
                    </path>
                </svg>
            </button>
        </div>
    </header>'''
text = re.sub(header_pattern, new_header, text, flags=re.DOTALL)

# 4. Profile Card
text = text.replace(
    'class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center"',
    'class="bg-white rounded-3xl p-8 pb-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 text-center relative z-10 mx-4 mt-6 mb-6"'
)
text = text.replace(
    'class="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 animate-glow mx-auto"',
    'class="w-28 h-28 rounded-full overflow-hidden border-4 border-[#1E3A8A] shadow-[0_0_20px_rgba(30,58,138,0.2)] mx-auto relative z-10 transition-transform duration-300 hover:scale-105"'
)
text = re.sub(
    r'<img src="https://res.cloudinary.com/dtrmjjphv/[^"]*"\s*srcset="[^"]*"\s*sizes="[^"]*"',
    r'<img src="avatar.jpg" onerror="this.src=\'https://res.cloudinary.com/dtrmjjphv/image/upload/w_400,h_400,c_fill,q_auto,f_auto/v1744211702/Avishkar_Avatar_xqwduw.webp\'"',
    text
)
text = text.replace(
    'class="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-50 -z-10"',
    'class="absolute -inset-2 bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] rounded-full animate-pulse opacity-20 -z-10"'
)

text = text.replace(
    'class="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2"',
    'class="text-3xl font-extrabold text-[#1E3A8A] mb-1 tracking-tight"'
)
text = text.replace(
    'class="text-gray-300 text-lg mb-8"',
    'class="text-[#6B7280] font-medium mb-8"'
)

# 5. Link Containers
text = text.replace(
    'class="group relative flex items-center w-full p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10 hover:border-white/20 overflow-hidden"',
    'class="group relative flex items-center w-full p-4 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#F59E0B]/30 overflow-hidden"'
)

text = text.replace(
    'class="text-white font-medium flex-grow text-left"',
    'class="text-[#1F2937] font-semibold flex-grow text-left"'
)

text = text.replace(
    'bg-gradient-to-r from-transparent via-white/5 to-transparent',
    'bg-gradient-to-r from-transparent via-[#F59E0B]/10 to-transparent'
)

# Note: The version block has a slightly different pattern for the icon.
text = text.replace(
    'class="icon flex items-center justify-center w-10 h-10 mr-4 flex-shrink-0"',
    'class="flex items-center justify-center w-12 h-12 bg-[#1E3A8A]/10 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300 rounded-xl mr-4 flex-shrink-0"'
)

text = re.sub(
    r'class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[a-z0-9-]+ to-[a-z0-9-]+ rounded-xl mr-4 flex-shrink-0"',
    r'class="flex items-center justify-center w-12 h-12 bg-[#1E3A8A]/10 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300 rounded-xl mr-4 flex-shrink-0"',
    text
)

# And fix the space error for Twitter block
text = re.sub(
    r'class="flex items-center justify-center w-10 h-10 bg -gradient-to-r from-gray-900 to-black rounded-xl mr-4 flex-shrink-0"',
    r'class="flex items-center justify-center w-12 h-12 bg-[#1E3A8A]/10 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300 rounded-xl mr-4 flex-shrink-0"',
    text
)

text = text.replace('class="w-5 h-5 text-white"', 'class="w-5 h-5"')

text = text.replace(
    'class="share-link-btn opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-white/10 rounded-lg"',
    'class="share-link-btn opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-gray-100 rounded-lg text-[#6B7280] hover:text-[#1E3A8A]"'
)

text = text.replace('class="w-4 h-4 text-gray-300"', 'class="w-4 h-4 fill-current"')

# Write the file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("HTML script update complete.")
