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
    // 1. Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 2. Identification & Events
    window.Tawk_API.onLoad = function() {
      console.log('Tawk.to loaded successfully');
      
      // Hide default widget to use our custom button instead
      if (window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
      
      // Auto-open chat on first visit if not already opened
      const hasOpened = localStorage.getItem('tawk_auto_opened');
      if (!hasOpened && window.Tawk_API.maximize) {
        window.Tawk_API.maximize();
        localStorage.setItem('tawk_auto_opened', 'true');
      }
      
      // Identify logged-in users
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
    
    // IMPORTANT: Replace these placeholders with your actual Tawk.to IDs
    const PROPERTY_ID = '69bd85f28e24561c37e3e2bb'; 
    const WIDGET_ID = '1jk656f9o';
    
    script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // 4. Append to document (before first script tag)
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.body.appendChild(script);
    }

    // 5. Provide programmatic control
    // You can call window.Tawk_API.showWidget() or .hideWidget() anywhere in your code
    // usage: if (window.Tawk_API.hideWidget) window.Tawk_API.hideWidget();

    // Cleanup to prevent duplicate script injection on HMR or re-renders
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Note: Tawk creating its own iframes/elements makes perfect cleanup difficult 
      // without extra logic, but this prevents duplicate <script> tags.
    };
  }, [user]); // Re-run effect when user login state changes to update identity

  return null; // Side-effect only component
};

export default TawkChat;
