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

const Disc: React.FC<{ disc: DiscProps }> = ({ disc }) => {
  const ownerName = disc.owner ? disc.owner.name : "the woods";
  return (
    <div onClick={() => Router.push("/disc/[id]", `/disc/${disc.id}`)}>
      <h2>{disc.name}</h2>
      <small>Belongs to {ownerName}</small>
      <ReactMarkdown>{disc.manufacturer}</ReactMarkdown>
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
