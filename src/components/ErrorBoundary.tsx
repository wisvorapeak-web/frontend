import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong</h1>
            <p className="text-slate-600 mb-8">
              We encountered an unexpected error. Don't worry, our team has been notified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue text-white rounded-lg font-semibold hover:bg-blue/90 transition-all shadow-md"
              >
                <RefreshCcw size={18} />
                Try Again
              </button>
              
              <a
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-all border border-slate-200"
              >
                <Home size={18} />
                Go Home
              </a>
            </div>

            {import.meta.env.DEV && (
              <div className="mt-10 p-4 bg-slate-900 text-red-400 text-left rounded-lg text-xs font-mono overflow-auto max-h-40">
                {this.state.error?.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
