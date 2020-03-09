import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Row, Col, Card, Select } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

// Instruments
import { api } from '../../api';

import { routes } from '../../navigation/routes';
import { history } from '../../navigation/history';

//Styles
import style from '../../pages/style';
const { layout, tailLayout } = style;

export const TodoItem = ({ token }) => {
    const { id: todoId } = useParams();
    const [todo, setTodo] = useState({});

    const onFinish = async (values) => {
        try {
            await api.updateTodo(todoId, token, values);
            history.push(routes.todo);
        } catch ({ message }) {
            console.error(message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };    
    
    const remove = async () => {
        try {
          await api.removeTodo(todoId, token);
          history.push(routes.todo);
        } catch ({ message }) {
          console.error(message);
        }
    };

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await api.readTodos(token);
                const sourceTodo = data.find(({ id }) => id === todoId);
                console.log('---sourceTodo', sourceTodo);

                setTodo({ ...sourceTodo, dd: moment(sourceTodo.dd) });
            } catch ({ message }) {
                console.log(message);
            }
        };

        if (!token) {
            history.push(routes.signIn);
        } else {
            loadTodos();
        }
    }, [todoId, token]);

  return todo.id ? (
    <Row style={{ marginTop: "10vh" }}>
      <Col span={12} offset={6}>
        <Card title="Edit Task">
          <Form
            {...layout}
            name="basic"
            initialValues={todo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!"
                }
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
                  message: "Please input your description!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              label="Select"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please input your description!"
                }
              ]}
            >
              <Select>
                <Select.Option value="new">New</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Due date"
              name="dd"
              rules={[
                {
                  required: true,
                  message: "Please input your due date!"
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Save and Back
              </Button>
              <Button type="primary" htmlType="button" danger onClick = { remove }>
                Delete
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  ) : null;
};
