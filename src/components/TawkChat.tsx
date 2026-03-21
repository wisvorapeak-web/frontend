import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * TawkChat Component
 * Integrates Tawk.to live chat globally across the application.
 * 
 * Requirements handled:
 * 1. Global injection via App.tsx
 * 2. Asynchronous loading
 * 3. Client-side only (useEffect)
 * 4. User identification (logged-in users)
 * 5. Programmatic control placeholders
 */

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

const TawkChat = () => {
  const { user } = useAuth();

  useEffect(() => {
    const injectTawk = () => {
      // 1. Initialize Tawk_API
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      // 2. Identification & Events
      window.Tawk_API.onLoad = function() {
        if (window.Tawk_API.hideWidget) {
          window.Tawk_API.hideWidget();
        }
        
        const hasOpened = localStorage.getItem('tawk_auto_opened');
        if (!hasOpened && window.Tawk_API.maximize) {
          window.Tawk_API.maximize();
          localStorage.setItem('tawk_auto_opened', 'true');
        }
        
        if (user) {
          window.Tawk_API.setAttributes({
            'name': user.full_name,
            'email': user.email
          }, (error: any) => {
            if (error) console.error('Tawk.to identification error:', error);
          });
        }
      };

      // 3. Inject the Tawk.to script
      const script = document.createElement("script");
      script.async = true;
      const PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID; 
      const WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID;
      script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.body.appendChild(script);
      }
    };

    // Delay injection to prioritize main content
    const handleLoad = () => {
      setTimeout(injectTawk, 2000); // 2 second delay after window load
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [user]); 

  return null; // Side-effect only component
};

export default TawkChat;
