import React, { useState, useEffect } from 'react';
import {
    List,
    Form,
    Input,
    Button,
    DatePicker,
    Row,
    Col,
    Card,
    Checkbox,
} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Instruments
import { api } from '../../api';

import { routes } from '../../navigation/routes';
import { history } from '../../navigation/history';

//Styles
import style from '../../pages/style';
const { layout, tailLayout } = style;

export const Todos = ({ token }) => {
    const [todos, setTodos] = useState([]);

    const onFinish = async (values) => {
        try {
            const todo = await api.createTodo(token, values);
            setTodos((todos) => [todo, ...todos]);
        } catch ({ message }) {
            console.error(message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const logout = () => {
        localStorage.removeItem('token');
        history.push(routes.signIn);
    };

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await api.readTodos(token);
                setTodos(data);
                console.log('---data', data);
            } catch ({ message }) {
                console.log(message);
            }
        };

        if (!token) {
            history.push(routes.signIn);
        } else {
            loadTodos();
        }
    }, [token]);

    return (
        <>
            <Row>
                <Col style={{ marginTop: '15px' }} span={4} offset={20}>
                    <Button onClick={logout}>Logout</Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '15px' }}>
                <Col span={18} offset={3}>
                    <Card title="Todo List">
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your description!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Due date"
                                name="dd"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your due date!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Create Todo
                                </Button>
                            </Form.Item>
                        </Form>
                        <List
                            itemLayout="horizontal"
                            dataSource={todos}
                            renderItem={({
                                id,
                                name,
                                description,
                                dd,
                                status,
                            }) => (
                                <Link to={`/${id}`}>
                                    <List.Item>
                                        {'Completed: '}
                                        <Checkbox
                                            style={{ marginRight: '5px' }}
                                            onChange={() => {}}
                                            checked={status === 'completed'}
                                        />
                                        <List.Item.Meta style={{fontWeight:'bold'}}
                                            description={name}
                                        />
                                        <List.Item.Meta
                                            description={description}
                                        />
                                        <List.Item.Meta
                                            description={moment(dd).format(
                                                'LLLL',
                                            )}
                                        />
                                    </List.Item>
                                </Link>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};
