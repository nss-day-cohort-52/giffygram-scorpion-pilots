import { getPosts, deletePosts } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("blockPost")) {
        const [,postId] = click.target.id.split("--")
        deletePosts(parseInt(postId))
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
            <img id="blockPost--${post.id}" class="actionIcon" src="https://bit.ly/30liC6T">
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
