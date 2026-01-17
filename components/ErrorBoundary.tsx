import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface ErrorFallbackUIProps {
  error: Error | null;
  onRetry: () => void;
}

const ErrorFallbackUI: React.FC<ErrorFallbackUIProps> = ({ error, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">{t('error.title')}</h2>
        <p className="text-slate-600 mb-6">{t('error.message')}</p>
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t('error.tryAgain')}
          </button>
          <a
            href={`tel:${t('contact.phone').replace(/[^0-9+]/g, '')}`}
            className="block w-full text-center text-primary-600 hover:text-primary-700 font-medium py-2"
          >
            {t('error.callUs')}
          </a>
        </div>
        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-3 bg-slate-100 rounded-lg text-xs text-red-600 overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

// React 19 has stricter types for class components - suppress known issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ErrorBoundary extends (Component as any)<Props, State> {
  state: State = { hasError: false, error: null };

  constructor(props: Props) {
    super(props);
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry(): void {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallbackUI error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
