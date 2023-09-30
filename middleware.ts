export {default} from "next-auth/middleware";

export const config = {
    matcher: [
        "/:userId/followers",
        "/:userId/following",
        "/:userId/followers",
        "/edit/profile",
        "/friends",
        "/likes",
        "/post/:postId",
        "/post/:postId/edit",
        "/saved",
    ]
}