// pages/newDiscs.tsx

import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Disc, { DiscProps } from "../components/Disc";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { newDiscs: [] } };
  }

  const newDiscs = await prisma.disc.findMany({
    where: {
      owner: { email: session.user.email },
      inBag: false,
    },
    include: {
      owner: {
        select: { name: true },
      },
    },
  });
  return {
    props: { newDiscs },
  };
};

type Props = {
  newDiscs: DiscProps[];
};

const NewDiscs: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Discs</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>New discs</h1>
        <main>
          {props.newDiscs.map((disc) => (
            <div key={disc.id} className="disc">
              <Disc disc={disc} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .disc {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .disc:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .disc + .disc {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default NewDiscs;

// https://vercel.com/guides/nextjs-prisma-postgres#step-10.-add-publish-functionality
