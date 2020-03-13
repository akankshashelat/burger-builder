import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  //anonymous class
  return class extends Component {

    state = {
      stateError: null
    };

    componentDidMount(){
      axios.interceptors.request.use(req => {
        this.setState({stateError: null});
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        this.setState({stateError: error});
      });
    }

    errorConfirmHandler = () =>{
      this.setState({stateError: null});
    }

    render(){
      return (
        <Fragment>
          <Modal
            show={this.state.stateError}
            modalClosed={this.errorConfirmHandler}>
            {this.state.stateError ? this.state.stateError.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Fragment>
      );
    }
  }
}

export default withErrorHandler;