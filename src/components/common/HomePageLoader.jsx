import React from "react";

const HomePageLoader = () => {
  return (
    <div className="homepage bg-background grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground p-4">
      {[...Array(2)].map((_, sectionIndex) => (
        <div
          key={sectionIndex}
          className="bg-card text-card-foreground space-y-4 rounded-lg p-4 shadow"
        >
          <div className="h-6 bg-muted-foreground rounded w-1/3 mb-4"></div>
          <div className="hide-scrollbar flex gap-4 overflow-x-auto py-2">
            {[...Array(4)].map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-muted w-32 flex-shrink-0 rounded-lg p-3 shadow animate-pulse"
              >
                <div className="bg-card mb-2 h-24 overflow-hidden rounded"></div>
                <div className="h-4 bg-muted-foreground rounded mb-2"></div>
                <div className="h-4 bg-muted-foreground rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted-foreground rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageLoader;