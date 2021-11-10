import { PostList } from "./feed/PostList.js"
import { PostEntry } from "./feed/PostEntry.js"

export const GiffyGram = () => {


    let postsHTML =`
        <h1>Giffygram</h1>
        ${PostEntry()}
        <section class='postList'>
            ${
                PostList()
            }
        </section>
    `
    return postsHTML
}
