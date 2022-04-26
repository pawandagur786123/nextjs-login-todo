import React from "react";
import LazyLoad from "react-lazyload";

export default function VisibilityChild(props) {
  if (!props.children) {
    throw new Error("You must pass children in visibility child component");
    return false;
  }

  return (
    <LazyLoad height={"200px"} offset={100}>
      {props.children}
    </LazyLoad>
  );
}
