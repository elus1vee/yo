import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Cached Payload instance for the Local API (server components, route
 * handlers, the seed script). `getPayload` itself memoizes per config
 * object, so calling this repeatedly across requests is cheap.
 */
export const getCms = () => getPayload({ config });
