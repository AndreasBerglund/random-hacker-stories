import React, { FunctionComponent } from "react";
import { createRoot } from "react-dom/client";
import LoadingIndicator from "./LoadingIndicator";
import Story from "./Story";
import { useGetStories } from "./useGetStories";

const App: FunctionComponent = () => {
  const { status, stories } = useGetStories();

  return (
    <>
      <header>
        <h1>Random hacker stories</h1>
        <p>Refresh to get 10 new random stories</p>
      </header>
      <main>
        {status === "loading" && <LoadingIndicator />}
        <ul className="cards">
          {stories.map((story) => (
            <Story
              key={story.id}
              id={story.id}
              title={story.title}
              url={story.url}
              score={story.score}
              time={story.time}
              author={story.author}
            />
          ))}
        </ul>
      </main>
      <footer>
        <a
          href="https://github.com/AndreasBerglund/random-hacker-stories"
          target="_blank"
        >
          github repository
        </a>
      </footer>
    </>
  );
};

const root = createRoot(document.getElementById("root") as Element);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
