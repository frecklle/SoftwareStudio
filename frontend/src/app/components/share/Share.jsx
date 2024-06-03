import "./share.css";

function Share(){
    return (
        <div className="sharePanel">
            <div className="shareWrapper">
                <div className="shareTop">
                    {/*<img className="shareProfileImg" src="/assets/profileimg2.jpg" alt=""/>
                    */}
                    <input placeholder="What do you want to post?"
                    className="shareInput"/>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <img className="image" src="/assets/image.svg" alt=""/>
                            <span className="shareOptionText">Photo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Share;