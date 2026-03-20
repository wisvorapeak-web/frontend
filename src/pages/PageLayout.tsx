import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

import { type ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {title && (
        <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm font-semibold text-blue max-w-2xl mx-auto opacity-60">
                {subtitle}
              </p>
            )}
          </div>
        </section>
      )}
      <main className={title ? 'py-12' : ''}>
        {children}
      </main>
      <Footer />

    </div>
  );
}
