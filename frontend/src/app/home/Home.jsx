import Leftbar from "../../components/letfbar/Leftbar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import Feed from "../../components/feed/Feed";
import Share from "../../components/share/Share";
export default function Home(){
    return (
        <>
        
        <Topbar/>
        <Leftbar/>
        <div className="homeContainer">
        
        
        
        <Feed/>
        

        <Rightbar/>
        
        </div>
        </>
        
    )
}