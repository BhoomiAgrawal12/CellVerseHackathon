declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }

  namespace YT {
    interface Player {
      // Define any methods and properties you need for the YT player
      playVideo(): void;
      pauseVideo(): void;
      // Add other methods as needed
    }
    interface PlayerEvent {
      data: number; // Event data (e.g., play, pause, etc.)
      target: YT.Player; // The player instance that triggered the event
      // You can add more properties based on specific events like onStateChange, etc.
    }
    interface PlayerOptions {
      height?: string;
      width?: string;
      videoId: string;
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
      };

    }



  }
}

// This ensures the file is treated as a module for TypeScript
export {};