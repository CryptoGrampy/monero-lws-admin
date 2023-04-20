import { lwsAdmin } from "../lws-admin"

export default defineEventHandler(async (event) => {
    return {
      api: await lwsAdmin.listAccounts()
    }
  })