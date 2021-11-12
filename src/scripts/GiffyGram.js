import { PostList } from "./feed/PostList.js"
import { PostEntry } from "./feed/PostEntry.js"
import { Footer } from "./nav/Footer.js"
import { NavBar } from "./nav/NavBar.js"
import { getFeed, getMessages, getPosts, getUsers } from "./data/provider.js"
import { newMessage } from "./message/MessageForm.js"

document.addEventListener(
    "click",
    clickevent => {
        if (clickevent.target.id.startsWith("profile")) {
            const [, userId] = clickevent.target.id.split("--")
            const users = getUsers()
            const posts = getPosts()
            const messages = getMessages()
            const userLocal = parseInt(localStorage.getItem("gg_user"))
            
            for (const user of users){
                if (user.id === parseInt(userId)){
                    const userspost = posts.filter((post)=>{ return parseInt(userId) === post.userId})
                    let countofposts = 0 
                    userspost? countofposts = userspost.length : countofposts = 0

                    const messagesforthem = messages.filter( (message)=> message.userId === userLocal && message.recipientId === parseInt(userId) || message.userId === parseInt(userId) && message.recipientId === userLocal)
                    const sortedmessages = messagesforthem.sort(function(a, b){return b.id - a.id})

                    let setProfileHTMLs = `${user.name} has ${countofposts} posts. There are ${sortedmessages.length}  messages between you and ${user.name}: <ul>${sortedmessages.map((message)=> `<li>${message.text}</li>`).join("")}</ul> <br><br><br> <a href="./index.html">Back to Main Page</a>`

                            localStorage.setItem("profile", setProfileHTMLs)

                }
            }
        }
    })



export const GiffyGram = () => {
    const feed = getFeed()
    const setProfileHTMLs = localStorage.getItem("profile")

        let postsHTML = ""
    if (setProfileHTMLs === null || setProfileHTMLs === undefined){
        postsHTML = `
        ${NavBar()}
        <br>
        <br>
        <br>
        ${feed.newMessage? newMessage() : ""}
        ${PostEntry()}
        <section id="postList" class='postList'>
            ${PostList()
        }
        </section>
        <section class='footer'>
            ${
                Footer()
            }
        </section>
    `
    } else {
        postsHTML = `
        ${NavBar()}
        <br>
        <br>
        <br>
        ${newMessage()}
        ${PostEntry()}
        <section class="authorprofile">
            ${setProfileHTMLs}
        </section>`
    }

    localStorage.removeItem("profile")
    return postsHTML
}
