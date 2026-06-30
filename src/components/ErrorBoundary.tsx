import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere below it so one broken chapter or
 * note doesn't take down the whole window. The message stays calm and
 * actionable per the interface voice rules — no stack traces, no blame.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Foundry HQ render error:", error, info.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto mt-16 px-4">
          <Card className="p-6 text-center">
            <p className="font-display text-xl text-ink">
              That didn't load quite right.
            </p>
            <p className="text-sm mt-1 text-soft">
              Nothing was lost — your notes are saved. Give it another try.
            </p>
            <Button onClick={this.handleRetry} className="mt-4 mx-auto">
              <RefreshCw size={14} strokeWidth={2} /> Try again
            </Button>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }
}
