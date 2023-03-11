import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type DiscProps = {
  id: string;
  name: string;
  owner: {
    name: string;
    email: string;
  } | null;
  manufacturer: string;
  inBag: boolean;
};

const Disc: React.FC<{ post: DiscProps }> = ({ post }) => {
  const ownerName = post.owner ? post.owner.name : "the woods";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.name}</h2>
      <small>Belongs to {ownerName}</small>
      <ReactMarkdown>{post.manufacturer}</ReactMarkdown>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Disc;
