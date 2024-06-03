import Share from "../share/Share";
import "./feed.css";
import { NavLink} from 'react-router-dom';

function Feed(){
    return(
        <>
            <nav className="feed">
                <div className="feedWrapper">
                    <Share/>
                </div>
            </nav>
        </>
    )
}

export default Feed;