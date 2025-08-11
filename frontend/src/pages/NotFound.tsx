import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-orbitron font-black mb-6">
          <span className="bg-gradient-quantum bg-clip-text text-transparent">404</span>
        </div>
        <h1 className="text-2xl font-orbitron font-bold mb-4 text-foreground">
          Page Not Found
        </h1>
        <p className="text-muted-foreground font-exo mb-8">
          The page you're looking for doesn't exist in our quantum realm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="quantum">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" onClick={() => window.history.back()}>
            <button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
