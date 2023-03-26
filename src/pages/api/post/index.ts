import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

// POST /api/post
// Required fields in body: name
// Optional fields in body: notes
export default async function handle(req, res) {
  const { name, notes } = req.body;

  const session = await getSession({ req });
  const result = await prisma.disc.create({
    data: {
      name: name,
      notes: notes,
      owner: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
