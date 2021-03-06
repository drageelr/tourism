import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavLinks(props) {
    return (
        <Nav className="mr-auto" navbar>
            <Link className="nav-link" to="/home/customer">Trips</Link>
        </Nav>
    );
}


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            link: props.link,
            search: ""
        }
    }
    render() {
        const check = (word) => (window.location.href.indexOf(word) > -1)
        return check("register") || check("login") || check("reset-password") || check("forgot-password")  || check("admin") || check("change-password") ||check("admin") ? null : (
            <div >
                <Navbar className="navbar" expand="md">
                    <NavbarBrand className="title-small" href="/home/customer">BOOK MY TRIP</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <div className="title-small-2">
                            <NavLinks link={window.location.href} />
                        </div>
                        <div className="search">
                            <Nav className="ml-auto">
                                <Form inline nav onSubmit={this.onSubmit}>
                                    
                                    <FormGroup>
                                        <UncontrolledDropdown >
                                            <DropdownToggle className="nav-button">
                                                <FontAwesomeIcon icon={faCog} size="lg" />
                                            </DropdownToggle>
                                            <DropdownMenu className="nav-but-big">
                                                <DropdownItem className="nav-but" onClick={() => {
                                                    this.props.history.push('/change-password/customer');
                                                }}>
                                                    Change Password
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem divider />
                                                <DropdownItem className="nav-but" onClick={() => {
                                                    localStorage.removeItem("token");
                                                    this.props.history.push('/login');
                                                }}>
                                                    Log Out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </FormGroup>
                                </Form>
                            </Nav>
                        </div>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default AppNavbar;