import * as React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from 'src/types/error-boundary';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // console.warn(error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, errorInfo, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            {errorInfo && errorInfo.componentStack}
          </details>
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
