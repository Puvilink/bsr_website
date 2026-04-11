import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-Menu-Btn');
    const mobileMenu = document.getElementById('mobile-Menu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky header with glassmorphism on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-black/40', 'backdrop-blur-md', 'shadow-glass', 'border-b', 'border-white/10');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-black/40', 'backdrop-blur-md', 'shadow-glass', 'border-b', 'border-white/10');
                header.classList.add('bg-transparent');
            }
        });
    }

    // --- Google Analytics Custom Event Tracking ---
    const trackEvent = (eventName, eventParams) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
      } else {
        console.log('Mock GA Event:', eventName, eventParams);
      }
    };

    // Track Phone Clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('phone_click', {
          event_category: 'Contact',
          event_label: link.href
        });
      });
    });

    // Track WhatsApp Clicks
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    whatsappLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          event_category: 'Contact',
          event_label: 'WhatsApp Chat'
        });
      });
    });

    // Track Get Quote Clicks (Links)
    const quoteLinks = document.querySelectorAll('a[href*="contact.html"]');
    quoteLinks.forEach(link => {
      // Avoid tracking navbar navigation to contact as a strong primary quote click if it's just top nav, 
      // but let's track buttons with the specific class
      if(link.classList.contains('btn-primary')) {
        link.addEventListener('click', () => {
          trackEvent('get_quote_click', {
            event_category: 'Navigation',
            event_label: 'Get Quote Button'
          });
        });
      }
    });

    // Form Handling with Validation, Loading State, and Success Message
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Basic Validation check
        if(!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline max-w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Sending...
        `;

        // Track Form Submission Event
        trackEvent('form_submission', {
          event_category: 'Lead',
          event_label: form.action
        });

        // Submit Form Data
        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            // Success Message State
            submitBtn.innerHTML = `
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Message Sent Success
            `;
            submitBtn.classList.remove('bg-accent-blue');
            submitBtn.classList.add('bg-green-500', 'text-white');
            form.reset();
            
            // Success Popup
            const notification = document.createElement('div');
            notification.textContent = "Thank you! Your transport request has been received. Our team will contact you within 30–60 minutes.";
            Object.assign(notification.style, {
              position: 'fixed',
              top: '24px',
              right: '24px',
              backgroundColor: '#111',
              color: '#fff',
              padding: '16px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: '9999',
              maxWidth: '320px',
              fontSize: '14px',
              fontFamily: 'sans-serif',
              opacity: '0',
              transition: 'opacity 0.4s ease'
            });
            document.body.appendChild(notification);
            setTimeout(() => notification.style.opacity = '1', 10);
            setTimeout(() => {
              notification.style.opacity = '0';
              setTimeout(() => notification.remove(), 400);
            }, 4000);
            
            setTimeout(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
              submitBtn.classList.add('bg-accent-blue');
              submitBtn.classList.remove('bg-green-500', 'text-white');
            }, 3000);
          } else {
             throw new Error('Network response was not ok');
          }
        } catch (error) {
          submitBtn.innerHTML = `Error. Try Again.`;
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }
      });
    });
});
