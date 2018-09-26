import React,{Component, Fragment} from 'react'
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem} from 'reactstrap'
import {connect} from 'react-redux'
import {signOut} from "../actions/AuthenticatedUser"
import {NavLink} from 'react-router-dom'
class NavBar extends Component{
    toggleNavbar = this.toggleNavbar.bind(this);
    state = {
      collapsed: true,
    };
 
    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
    }
    handleLogOut = (e) => {
        e.preventDefault()
        this.props.dispatch(signOut())
    }
    render(){
        
        const { authedUser} = this.props
        return(
          <Fragment>
          
          <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">{`Hello ${authedUser}`}</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/add">Add Question</NavLink>
              </NavItem>
                <NavItem>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                  </NavItem>
                <NavItem>
                <NavLink to="#" onClick={this.handleLogOut}>Sign Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Fragment>
        )
    }
}
function mapStateToProps({authedUser,users}){
    return {
     authedUser: authedUser ? authedUser: ' '
    }
}

export default connect(mapStateToProps)(NavBar)