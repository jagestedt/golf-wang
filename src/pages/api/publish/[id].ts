// pages/api/publish/[id].ts

import prisma from "../../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  const post = await prisma.disc.update({
    where: { id: postId },
    data: { inBag: true },
  });
  res.json(post);
}
