import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { DiscProps } from "../../components/Disc";
import { useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const disc = await prisma.disc.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      owner: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: disc,
  };
};

async function publishDisc(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

const Disc: React.FC<DiscProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const discBelongsToUser = session?.user?.email === props.owner?.email;
  let name = props.name;
  if (!props.inBag) {
    name = `${name} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{name}</h2>
        <p>By {props?.owner?.name || "Unknown owner"}</p>
        <ReactMarkdown>{props.manufacturer}</ReactMarkdown>
        {!props.inBag && userHasValidSession && discBelongsToUser && (
          <button onClick={() => publishDisc(props.id)}>Put in bag</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Disc;
