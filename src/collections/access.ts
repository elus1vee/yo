import type { Access } from "payload";

/** Public reads only see published documents; signed-in editors see everything. */
export const publishedOrEditor: Access = ({ req: { user } }) =>
  user ? true : { status: { equals: "published" } };

export const isEditor: Access = ({ req: { user } }) => Boolean(user);
