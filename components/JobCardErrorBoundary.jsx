import React, { Component } from 'react';
// Removed ErrorInfo, ReactNode

// Removed interface Props
// Removed interface State

class JobCardErrorBoundary extends Component { // Removed <Props, State>
  state = { // Removed : State
    hasError: false,
  };

  static getDerivedStateFromError(_) { // Removed _: Error and : State
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) { // Removed error: Error, errorInfo: ErrorInfo
    // You can also log the error to an error reporting service
    console.error("Uncaught error in JobCard:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="h-[24rem] bg-slate-700 text-red-400 rounded-xl shadow-lg p-5 flex flex-col justify-center items-center font-sans border border-red-500/50">
            <h3 className="text-lg font-bold">Something went wrong.</h3>
            <p className="text-sm text-slate-400 mt-2">This job posting could not be displayed.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export { JobCardErrorBoundary };
