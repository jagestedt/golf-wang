import prisma from "../../lib/prisma";
import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Disc, { DiscProps } from "../components/Disc";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.disc.findMany({
    where: { inBag: true },
    include: {
      owner: {
        select: { name: true },
      },
    },
  });
  console.log(feed);
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: DiscProps[];
};

const Blog: React.FC<Props> = (props) => {
  console.log(props.feed);
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        hej
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Disc post={post} />
              hej
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
