import React, { FunctionComponent, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import LoadingIndicator from "./LoadingIndicator";
import { IStory } from "./Types";
import Story from "./Story";

const initialStory: IStory = {
  id: 0,
  title: "No title",
  url: undefined,
  score: 0,
  time: 0,
  author: {
    id: 0,
    score: 0,
  },
  status: "unloaded",
};

const App: FunctionComponent = () => {
  const [stories, setStories] = useState({} as { [key: string]: IStory }); // initialize with list of ten IStories

  // Get list of ten stories
  const getXTopStories = async (n: number) => {
    if (n > 500 || n < 1) return;

    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    ); //returns html
    const topstories: number[] = await res.json(); //convert to json
    const chosen_stories: { [key: string]: IStory } = {};
    while (Object.keys(chosen_stories).length < n) {
      const randomIndex = Math.floor(Math.random() * (topstories.length - 1));
      const randomId = topstories[randomIndex];
      if (chosen_stories.hasOwnProperty(randomId)) continue;
      chosen_stories[randomId] = { ...initialStory, id: randomId };
    }
    setStories(chosen_stories);
  };

  useEffect(() => {
    getXTopStories(10);
  }, []);

  return (
    <>
      <header>
        <h1>Random hacker stories</h1>
        <p>Refresh to get 10 new random stories</p>
      </header>
      <main>
        {status === "loading" && <LoadingIndicator />}
        <ul className="cards">
          {Object.keys(stories).map((storyKey) => (
            <Story
              key={stories[storyKey].id}
              id={stories[storyKey].id}
              title={stories[storyKey].title}
              url={stories[storyKey].url}
              score={stories[storyKey].score}
              time={stories[storyKey].time}
              author={stories[storyKey].author}
              status={stories[storyKey].status}
              setStories={setStories}
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
root.render(<App />);
