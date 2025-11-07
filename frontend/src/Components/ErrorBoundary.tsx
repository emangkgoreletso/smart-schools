import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error | null };

export default class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, fontFamily: "sans-serif" }}>
          <h2 style={{ color: "crimson" }}>🚨 Something crashed</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#444" }}>
            {this.state.error?.message}
          </pre>
          <p>Check the browser console for the full stack trace.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
