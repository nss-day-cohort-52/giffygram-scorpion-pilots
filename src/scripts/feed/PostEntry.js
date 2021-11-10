

export const LoginForm = () => {
    return `
        <div class="loginForm">
            <form>
                <fieldset>
                    <label for="title"></label>
                    <input type="title" name="title" autofocus placeholder="Title" />
                </fieldset>
                <fieldset>
                    <label for="url"></label>
                    <input type="url" name="url" placeholder="URL of gif" />
                </fieldset>
                <fieldset>
                    <label for="gifStory"></label>
                    <input type="gifStory" name="gifStory" placeholder="Story behind your gif..." />
                </fieldset>
            </form>
            <button id="saveButton">Save</button>
            <button id="cancelButton">Cancel</button>
        </div>
    `
}