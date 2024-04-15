import React from "react";
import LOGOUT from "./logoutbutton";

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <h1><center>SecureScript</center></h1>
            </div>
            <div className="header-right">
                <LOGOUT />
            </div>
        </header>
    );
}

export default Header;
