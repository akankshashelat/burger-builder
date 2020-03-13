import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  //anonymous class
  return class extends Component {

    state = {
      stateError: null
    };

    componentDidMount(){
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({stateError: null});
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({stateError: error});
      });
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
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