import React, { FunctionComponent, useEffect } from "react";
import { IItem, IStory, IUser } from "./Types";
import RabbitImage from "./rabbit.png";
import moment from "moment";

type StoryProps = IStory & {
  setStories: React.Dispatch<
    React.SetStateAction<{
      [key: string]: IStory;
    }>
  >;
};

const Story: FunctionComponent<StoryProps> = ({
  id,
  title,
  url,
  score,
  time,
  author,
  status,
  setStories,
}) => {
  useEffect(() => {
    (async () => {
      //Fetch item
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const item: IItem = await res.json();

      //Fetch author
      const res_author = await fetch(
        `https://hacker-news.firebaseio.com/v0/user/${item.by}.json`
      );
      const author: IUser = await res_author.json();

      setStories((stories) => {
        return {
          ...stories,
          [id]: {
            ...stories[id],
            score: item.score,
            title: item.title,
            time: item.time,
            url: item.url,
            author: author,
            status: "loaded",
          },
        };
      });
    })();
  }, []);
  return (
    <li
      id={id.toString()}
      className={`card ${status !== "loaded" ? "loading" : ""}`}
    >
      {url && <a href={url} target="_blank"></a>}
      <div className="score">{score}</div>
      <div className="image-container">
        <img src={"https://picsum.photos/400/240?p=" + id} alt="card image" />
      </div>
      <div className="title-container">
        <h3>{title}</h3>
      </div>
      <div className="author-container">
        <div className="karma">{convertToK(author.karma)}</div>
        <div className="author">
          <span>
            By <strong>{author.id}</strong>
          </span>
          <span>{moment.unix(time).format("DD.MM.YYYY")}</span>
        </div>
        <div className="cta">{url && <img src={RabbitImage} />}</div>
      </div>
    </li>
  );
};

export default Story;

/**
 * A utility for formatting numbers above 1000 to 2000 = "2K"
 * @param number a positive number
 * @returns string
 */
function convertToK(number: number): string {
  if (number < 1000) {
    return number.toString();
  } else {
    return Math.round(number / 1000) + "K";
  }
}
