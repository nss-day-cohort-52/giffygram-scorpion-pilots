import { getPosts } from "../data/provider.js"

document.addEventListener(
    "click",
    clickevent => {
        if(clickevent.target.id === "fav_iconblank"){
            
                document.getElementById("fav").innerHTML = `<img id="fav_iconyellow" class="fav_iconblank"src="${"./../images/favorite-star-yellow.svg"}" alt="favorite icon" />`
    }
        if(clickevent.target.id === "fav_iconyellow"){
            document.getElementById("fav").innerHTML = `<img id="fav_iconblank" class="fav_iconblank"src="${"./../images/favorite-star-blank.svg"}" alt="favorite icon" />`
        }
    })

export const PostList = () => {

    const posts = getPosts()

    const displayPosts = (post) => {

        //convert timestamp to date
        const getDate = () => {
            const date = new Date(post.timestamp)
            return date.toLocaleDateString('en-US')
        }

        //convert posts data to visible html

        return `
            <div class='post__remark'>
                ${post.title}
            </div>
            <div class='post__image'>
                <img src="${post.imageURL}" alt="" />
            </div>
            <div class='post__tagline'>
                ${post.description}
            </div>
            <div class='post__date'>
                Posted on ${getDate()}
            </div>
            <div id="fav">
            <img id="fav_iconblank" class="faviconblank__${post.id}"src="${"./../images/favorite-star-blank.svg"}" alt="favorite icon" />
            </div>
            `
    }
    
    // Show main main UI
    
    let postsHTML =`
        <section class='post'>
            ${
                posts.map(displayPosts).join("")
            }
        </section>
    `
    return postsHTML
}
