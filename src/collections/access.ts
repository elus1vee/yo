import type { Access } from "payload";

/**
 * Public reads only see the published version of a document (collections
 * below have `versions.drafts` enabled, so every doc carries `_status`);
 * signed-in editors see drafts too — needed for Live Preview.
 */
export const publishedOrEditor: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: "published" } };

export const isEditor: Access = ({ req: { user } }) => Boolean(user);
