import { useState, useEffect } from "react";
import { IItem, IStory, IUser } from "./Types";

/**
 * Hook for fetching 10 random stories
 * 1: Get topstories response
 * 2: Select 10 stories at random
 * 3: Get item info for all 10 stories
 * 4: Get author info for all 10 stories
 * 5: Return stories
 * Not doing caching, because random...
 *
 */
export type Status = "unloaded" | "loading" | "loaded";

export const useGetStories = () => {
  const [status, setStatus] = useState("unloaded" as Status);
  const [stories, setStories] = useState([] as IStory[]);

  useEffect(() => {
    (async () => {
      setStatus("loading");

      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      ); //returns html
      const topstories = (await res.json()) as number[]; //convert to json

      //Select 10 random stories, we expect topstories to be string[] with length 500
      const randomStories = [] as IStory[];

      for (let i = 0; i < 10; i++) {
        //Choose random index in topstories array
        const randomIndex = Math.floor(Math.random() * (topstories.length - 1));

        //Get the item id
        const randomId = topstories[randomIndex];

        //Remove this ID from the array so it cannot be chosen again
        //todo: Possible optimization, ie remove splice operation
        topstories.splice(randomIndex, 1);

        //Fetch item
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${randomId}.json`
        );
        const item: IItem = await res.json();

        //Fetch author
        const res_author = await fetch(
          `https://hacker-news.firebaseio.com/v0/user/${item.by}.json`
        );
        const author: IUser = await res_author.json();

        randomStories.push({
          id: randomId,
          title: item.title || "No title",
          url: item.url, // we can set this because url is of type string | undefined
          score: item.score || 0,
          time: item.time || 0,
          author: {
            id: author.id,
            score: author.karma,
          },
        });
      }

      // Sort the array ascending by score and set in state!
      setStories(
        randomStories.sort((a, b) => {
          return a.score - b.score;
        })
      );
      setStatus("loaded");
    })();
  }, []);

  return { status, stories };
};
