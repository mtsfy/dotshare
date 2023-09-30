export {default} from "next-auth/middleware";

export const config = {
    matcher: [
        "/edit/profile",
        "/friends",
        "/likes",
        "/post",
        "/saved",
    ]
}