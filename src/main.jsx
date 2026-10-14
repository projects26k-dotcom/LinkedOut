import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ClerkProvider } from '@clerk/react';
import { dark } from '@clerk/themes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env.local file.');
}

function ClerkProviderWrapper({ children }) {
  const { isDark } = useTheme();

  // If the user has not replaced the placeholder yet, show a helpful setup guide instead of crashing
  if (PUBLISHABLE_KEY === 'your_key_here') {
    return (
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-lg border border-coral-200 dark:border-coral-900 space-y-4">
          <div className="w-14 h-14 bg-coral-100 dark:bg-coral-950/60 text-coral-500 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            🔑
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Clerk Publishable Key Required
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Your <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-coral-600 font-mono text-[11px]">.env.local</code> file currently contains the placeholder value:
          </p>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl font-mono text-xs text-gray-700 dark:text-gray-300 text-left border border-gray-200 dark:border-gray-700">
            VITE_CLERK_PUBLISHABLE_KEY=your_key_here
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Please replace <code className="text-coral-500">your_key_here</code> with your actual publishable key (starts with <code className="font-mono text-coral-500">pk_test_...</code>) from your <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:underline font-semibold">Clerk Dashboard</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: {
          colorPrimary: '#FF6B4A',
          colorTextOnPrimaryBackground: '#ffffff',
          borderRadius: '0.75rem',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        },
        elements: {
          card: isDark 
            ? 'bg-gray-900 border border-gray-800 shadow-2xl text-white' 
            : 'bg-white border border-gray-200 shadow-2xl',
          formButtonPrimary: 'bg-coral-500 hover:bg-coral-600 text-white font-bold transition-all shadow-md shadow-coral-500/20',
          footerActionLink: 'text-coral-500 hover:text-coral-600 font-semibold',
          userButtonPopoverCard: isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200',
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ClerkProviderWrapper>
        <App />
      </ClerkProviderWrapper>
    </ThemeProvider>
  </StrictMode>,
);
