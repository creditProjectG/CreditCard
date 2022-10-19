import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    
    render() {
        return (
            <div>
                <header>
                    <nav className="header">
                        <div>Customer Credit Card Management</div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;