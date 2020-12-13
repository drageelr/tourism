import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';


import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavLinks(props) {
    return (
        <Nav className="mr-auto" navbar>
            <Link className="nav-link" to="/home/admin">Trips</Link>
            <span className="separator"></span>
            <Link className="nav-link" to="/view-finances/admin">Finance</Link>
            <span className="separator"></span>
            <Link className="nav-link" to="/view/admin">Admins</Link>
            <span className="separator"></span>
            <Link className="nav-link" to="/view-promo/admin">Promos</Link>
        </Nav>
    );
}

class AppNavbar extends Component {
    state = {
        isOpen: false,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const check = (word) => (window.location.href.indexOf(word) > -1)
        return check("register") || check("login") || check("reset-password") || check("forgot-password") || check("change-password") || check("add-user") || check("customer") ? null : (
            <div >
                <Navbar className="navbar" expand="md">
                    <NavbarBrand className="title-small" href="/home/admin">BOOK MY TRIP</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <div className="title-small-2">
                            <NavLinks />
                        </div>
                        <div className="search">
                            <Nav className="ml-auto">
                                <Form inline nav>
                                    <FormGroup>
                                        <p></p>
                                    </FormGroup>
                                    <FormGroup>
                                        <UncontrolledDropdown >
                                            <DropdownToggle className="nav-button">
                                                <FontAwesomeIcon icon={faCog} size="lg" />
                                            </DropdownToggle>
                                            <DropdownMenu className="nav-but-big">
                                                <DropdownItem className="nav-but" onClick={() => {
                                                    this.props.history.push('/change-password/admin');
                                                }}>
                                                    Change Password
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <Link to="/add-user/admin">
                                                    <DropdownItem className="nav-but" onClick={() => {
                                                        this.props.history.push('/adduser');
                                                    }}>
                                                        Add User
                                                </DropdownItem>
                                                </Link>
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