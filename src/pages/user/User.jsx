import { CalendarToday, MailOutline, PermIdentity, Publish } from "@material-ui/icons"
import "./user.css"
import { Link } from "react-router-dom"

export default function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://image.flaticon.com/icons/png/512/147/147140.png" alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Jan Kowalski</span>
                            <span className="userShowUserRole">User</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">Jan Kowalski</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">jKowalski@wp.pl</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">10.08.2021</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder="Jan Kowalski" className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder="jKowalski@wp.pl" className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Password</label>
                                <input type="text" placeholder="Change password" className="userUpdateInput" />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src="https://image.flaticon.com/icons/png/512/147/147140.png" alt="" className="userUpdateImg" />
                                <label htmlFor="file"><Publish className="userUpdateIcon"/></label>
                                <input type="file" id="file" style={{display: "none"}}/>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
