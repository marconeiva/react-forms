import React from 'react';
import { Form, Button, FormField, Label} from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component{
    state={
        data:{
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange = e => 
    this.setState({
        data: {...this.state.data, [e.target.name] : e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email address";
        if (!data.password) errors.password = "Cannot be empty";
        return errors;
    }
    render() {
    return(
        <Form onSubmit={this.onSubmit}>
            <FormField error={!!this.state.errors.email}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="yourmail@mail.com"
                    value={this.state.data.email}
                    onChange={this.onChange}
                />
                {this.state.errors.email && <InlineError text={this.state.errors.email}/>}
            </FormField>
            <FormField error={!!this.state.errors.password}>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"password 
                    id="password" 
                    name="password" 
                    placeholder="make it secure with alphanumeric characters"
                    value={this.state.data.password}
                    onChange={this.onChange}
                />
                {this.state.errors.password && <InlineError text={this.state.errors.password}/>}
            </FormField>
            <Button primary>Login</Button>
        </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;