import { lwsAdmin } from "../../lws-admin";

export default defineEventHandler(async (event) => {
  if (
    event &&
    event.context &&
    event.context.params &&
    event.context.params.address !== undefined
  ) {
    return {
      api: await lwsAdmin.acceptRequest(event.context.params.address),
    };
  } else {
    throw new Error("address is undefined");
  }
});
