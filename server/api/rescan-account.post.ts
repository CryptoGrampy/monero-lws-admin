import { lwsAdmin } from "../lws-admin";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.address !== undefined && body.height !== undefined) {
        return {
            api: await lwsAdmin.rescanAccount(body.address, Number(body.height)),
        }
    } else {
        throw new Error("address is undefined")
    }
})