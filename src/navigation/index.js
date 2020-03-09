// Core
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Routes
import { history } from './history';
import { routes } from './routes';

// Components
import { SignUp, SignIn, Todos, TodoItem } from '../pages';

export const Routes = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
            setToken(savedToken);
            history.push(routes.todo)
        }
    }, [])

    return (
        <Switch>
            <Route
                exact
                path={routes.signIn}
                component={() => <SignIn setToken={setToken} />}
            />
            <Route exact path={routes.signUp} component={SignUp} />
            { token && <Route
                exact
                path={routes.todo}
                component={() => <Todos token={token} />}
            /> }
            { token && <Route
                exact
                path={routes.todoItem}
                component={() => <TodoItem token={token} />}
            /> }
            <Redirect to={routes.signIn} />
        </Switch>
    );
};
