const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'tariff.html', 'contact.html'];

const footerBadgeBlock = `
        <div class="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-gray-500 text-sm">© 2026 BSR Travels. All rights reserved.</p>
          <div class="flex items-center gap-4 text-xs font-medium text-gray-400">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent-blue"></span> 24/7 Service Available</span>
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span> Experienced Drivers</span>
          </div>
        </div>
      </div>
    </footer>`;

for (const fname of files) {
  let content = fs.readFileSync(fname, 'utf-8');

  // Regex to match the existing pt-6 border-t block
  content = content.replace(/<div class="pt-6 border-t border-white\/10 text-center">([\s\S]*?)<\/footer>/, footerBadgeBlock);

  fs.writeFileSync(fname, content, 'utf-8');
  console.log('Updated footer in ' + fname);
}
