import "./newUser.css"

export default function NewUser() {
    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="Username"/>
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="text" placeholder="Email"/>
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="text" placeholder="Password"/>
                </div>
                <div className="newUserItem">
                    <label>Role</label>
                    <select name="role" id="role" className="newUserRole">
                        <option value="ADMIN">Administrator</option>
                        <option value="MODERATOR">Moderator</option>
                        <option value="USER">User</option>
                    </select>
                </div>
                <button className="newUserButton">Create User</button>
            </form>
        </div>
    )
}
