import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliar from '../Auxiliar/Auxiliar';

const withErrorHandler = (WrappedCompoent, axios) => {
    return class extends Component {
        
        state = {
            error: null
        }

        componentWillMount(){
            
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render (){
            return (
                <Auxiliar>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedCompoent {...this.props} />
                </Auxiliar>
            );
        }
    }
}


export default withErrorHandler;