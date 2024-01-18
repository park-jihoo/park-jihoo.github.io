"use client";
import mermaid from "mermaid";
import { useEffect } from "react";

export const Mermaid = ({ code }) => {
  useEffect(() => {
    mermaid.run();
  });
  return (
    <>
      <div className="mermaid">{code}</div>
    </>
  );
};
