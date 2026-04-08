import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      message: '',
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'Something went wrong.',
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error captured by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-xl w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Application Error</p>
            <h1 className="text-3xl md:text-4xl font-bold">Unexpected crash in the explorer</h1>
            <p className="text-slate-300">{this.state.message}</p>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
