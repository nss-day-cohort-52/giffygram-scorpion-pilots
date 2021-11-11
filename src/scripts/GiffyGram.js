import { PostList } from "./feed/PostList.js"
import { PostEntry } from "./feed/PostEntry.js"
import { NavBar } from "./nav/NavBar.js"

//<h1>Giffygram</h1>
export const GiffyGram = () => {


    let postsHTML =`
        ${NavBar()}
        <br>
        <br>
        <br>
        ${PostEntry()}
        <section class='postList'>
            ${
                PostList()
            }
        </section>
    `
    return postsHTML
}
