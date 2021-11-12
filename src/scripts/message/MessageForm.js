import {getUsers, sendMessage, setNewMessageState } from "../data/provider.js"

document.addEventListener("click", clickevent => {
    if(clickevent.target.id === "directMessageIcon"){
        setNewMessageState()
    }
    if(clickevent.target.id === "newMessage_submit"){
        const userIde = parseInt(localStorage.getItem("gg_user"))
        const recipientId = document.querySelector("#users").value
        const message = document.querySelector("textarea[name='message']").value

        
        const MessageToAPI = {
            userId: userIde,
            recipientId: parseInt(recipientId),
            text: message,
            read: false 
        }

        sendMessage(MessageToAPI)
        window.alert("Message Sent")
    }
    if(clickevent.target.id === "newMessage_cancel"){
        setNewMessageState()
    }
})

const userList = (user) => {
    return `<option name="user" value="${user.id}">${user.name}</option>`
}

export const newMessage = () => {
    const users = getUsers()

    return `<div id="newMessage" class"newMessageForm">
    
    <button class="exit"></button>
    <h2>Direct Message</h2>
    <div class="userDropdown">
    <label class="label" for="users">Recipient: </label>
        <select name="users" id="users">
                <option value="default"> Choose a recipient...</option>
                ${users.map((user) => userList(user)).join("")}
        </select>
    </div>
    <div class="messageText">
        <div class="field">
            <label class="label" for="message">Message: </label>
            <textarea type="text" name="message" class="input"></textarea>
        </div>
    </div>
    <button id="newMessage_submit">Save</button>
    <button id="newMessage_cancel">Cancel</button>
    </div>`
}