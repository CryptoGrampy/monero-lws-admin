import { lwsAdmin } from "../lws-admin";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async () => {
  const requests = await lwsAdmin.listRequests();

  return {
    api: {
      serverUrl: runtimeConfig.LWS_ADMIN_URL,
      isConnected: requests !== undefined,
    },
  };
});
