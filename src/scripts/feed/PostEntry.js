import { sendPostMessage } from "../data/provider.js";


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost_submit") {
        const userPostTitle = document.querySelector("input[name='postTitle']").value
        const userPostURL = document.querySelector("input[name='postURL']").value
        const userPostDescription = document.querySelector("textarea[name='postDescription']").value
        const timestampe = new Date()
        const userIde = parseInt(localStorage.getItem("gg_user"))

        const dataToSendToAPI = {
            title: userPostTitle,
            imageURL: userPostURL,
            description: userPostDescription,
            timestamp: timestampe,
            userId: userIde
        }
        sendPostMessage(dataToSendToAPI)
    }
    if (clickEvent.target.id === "newPost_cancel") {
        document.querySelector("input[name='postTitle']").value = ""
        document.querySelector("input[name='postURL']").value = ""
        document.querySelector("textarea[name='postDescription']").value = ""
    }
} )



export const PostEntry = () => {
    return `        
        <div class="newPost">
            <div>                    
                <input name="postTitle" class="newPost__input" type="text" autofocus placeholder="Title"/>
            </div>
            <div>
                <input name="postURL" class="newPost__input" type="text" placeholder="URL of gif"/>
            </div>
            <textarea name="postDescription" class="newPost__input" placeholder="Story behind your gif..."></textarea>
            
            <button id="newPost_submit">Save</button>
            <button id="newPost_cancel">Cancel</button>
        </div>
        `
    }
    //<div class="miniMode">Have a gif to post?</div>