import { PostList } from "./feed/PostList.js"
import { PostEntry } from "./feed/PostEntry.js"
import { Footer } from "./nav/Footer.js"
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
        <section class='footer'>
            ${
                Footer()
            }
        </section>
    `
    return postsHTML
}
