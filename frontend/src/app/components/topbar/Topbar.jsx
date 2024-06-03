import "./topbar.css";
 function Topbar(){
    return (
        <nav className="topbar">
            <img src="/assets/logo.png" alt="logo" width={28} height={28} />
            <p className="appName">Prosper.Net</p>
        </nav>
    )
}
export default Topbar;