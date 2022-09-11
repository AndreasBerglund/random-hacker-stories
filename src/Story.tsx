import React, { FunctionComponent } from "react";
import { IStory } from "./Types";
import RabbitImage from "./rabbit.png";
import moment from "moment";

const Story: FunctionComponent<IStory> = ({
  id,
  title,
  url,
  score,
  time,
  author,
}) => {
  return (
    <li id={id.toString()} className="card">
      {url && <a href={url} target="_blank"></a>}
      <div className="score">{score}</div>
      <div className="image-container">
        <img src={"https://picsum.photos/400/240?p=" + id} alt="card image" />
      </div>
      <div className="title-container">
        <h3>{title}</h3>
      </div>
      <div className="author-container">
        <div className="karma">{convertToK(author.score)}</div>
        <div className="author">
          <span>
            By <strong>{author.id}</strong>
          </span>
          <span>{moment.unix(time).format("DD.MM.YYYY")}</span>
        </div>
        <div className="cta">
          <img src={RabbitImage} />
        </div>
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
