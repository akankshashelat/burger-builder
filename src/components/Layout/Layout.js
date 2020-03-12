import React, {Component , Fragment} from 'react';
import classes from './Layout.css';
import ToolBar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}/>
          <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerClosedHandler}/>
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }



}

export default Layout;