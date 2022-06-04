import React from "react";
import { generateRandomString } from "../ts/generateRandomIndex";

interface GenericListItem {
  text: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

interface GenericListProps {
  list: GenericListItem[];
  As?: "a" | "li" | "button" | "div";
}

const NOOP = () => {};

export const GenericList: React.FC<GenericListProps> = ({
  list,
  As = "li",
}) => {
  return (
    <>
      {list.map(({ text, onClick = NOOP, className, href }) => {
        return (
          <As
            className={className}
            onClick={onClick}
            key={generateRandomString()}
            href={href}
          >
            {text}
          </As>
        );
      })}
    </>
  );
};

export default GenericList;
