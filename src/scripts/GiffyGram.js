import { PostList } from "./feed/PostList.js"
import { PostEntry } from "./feed/PostEntry.js"
import { Footer } from "./nav/Footer.js"

export const GiffyGram = () => {


    let postsHTML =`
        <h1>Giffygram</h1>
        ${PostEntry()}
        <section class='postList'>
            ${
                PostList()
            }
        </section>
        <section class='footer'>
            ${
                Footer()
            }
        </section>
    `
    return postsHTML
}
