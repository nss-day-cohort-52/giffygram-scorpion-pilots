import { PostList } from "./feed/PostList.js"

export const GiffyGram = () => {


    let postsHTML =`
        <h1>Giffygram</h1>
        <section class='postList'>
            ${
                PostList()
            }
        </section>
    `
    return postsHTML
}
