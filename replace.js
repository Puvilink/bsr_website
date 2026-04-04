const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'tariff.html', 'contact.html'];

const schemaGaBlock = `
    <!-- Google Analytics (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>

    <!-- LocalBusiness Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "BSR Travels",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Guru Chandra Nagar, 1st Street, Thevazhi",
        "addressLocality": "Gummidipundi",
        "addressRegion": "TN",
        "postalCode": "601201"
      },
      "telephone": "+919444666502",
      "priceRange": "$$",
      "image": "https://bsrtravels.com/logo.png",
      "description": "Premium corporate transport and travel service provider ensuring comfort, safety, and reliability across Gummidipundi & Sri City SEZ."
    }
    </script>
</head>`;

const footerRepBlock = `
    <!-- Floating WhatsApp Button (All Devices) -->
    <a href="https://wa.me/919444666502?text=Hello%20BSR%20Travels,%20I%20need%20transport%20service%20details." target="_blank" class="whatsapp-link fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-glow text-white hover:scale-105 transition-transform" aria-label="WhatsApp Us">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    <!-- Sticky Mobile Bottom Bar (Mobile Only) -->
    <div class="md:hidden fixed bottom-0 left-0 w-full bg-navy-900 border-t border-white/10 flex items-center z-40 justify-around p-2 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <a href="tel:9444666502" class="flex flex-col items-center justify-center text-gray-300 hover:text-accent-blue py-1 text-xs font-medium w-1/3 border-r border-white/5">
        <svg class="w-6 h-6 mb-1 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
        Call Now
      </a>
      <a href="https://wa.me/919444666502?text=Hello%20BSR%20Travels,%20I%20need%20transport%20service%20details." class="whatsapp-link flex flex-col items-center justify-center text-gray-300 hover:text-[#25D366] py-1 text-xs font-medium w-1/3 border-r border-white/5">
        <svg class="w-6 h-6 mb-1 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
        WhatsApp
      </a>
      <a href="contact.html" class="flex flex-col items-center justify-center text-accent-cyan hover:text-white py-1 text-xs font-bold w-1/3">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        Get Quote
      </a>
    </div>

    <script type="module" src="/src/main.js"></script>
</body>`;

for (const fname of files) {
  let content = fs.readFileSync(fname, 'utf-8');
  if (!content.includes('LocalBusiness')) {
    content = content.replace('</head>', schemaGaBlock);
  }
  
  // Replace anything between "Mobile Sticky Call Button" and "</body>"
  content = content.replace(/<!-- Mobile Sticky Call Button -->[\s\S]*?<\/body>/, footerRepBlock);
  
  fs.writeFileSync(fname, content, 'utf-8');
  console.log('Updated ' + fname);
}
