import { lwsAdmin } from "../lws-admin";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (body.address !== undefined && body.key !== undefined) {
      return {
        api: await lwsAdmin.addAccount(body.address, body.key),
      };
    } else {
      throw new Error("address is undefined");
    }
  } catch (e) {
    return {
      api: {
        error: e,
      },
    };
  }
});
