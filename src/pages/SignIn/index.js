// Core
import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  notification,
  Checkbox
} from "antd";

// Instruments
import { api } from "../../api";
import { routes } from "../../navigation/routes";
import { history } from "../../navigation/history";

//Styles
import style from "../../pages/style";
const { layout, tailLayout } = style;

export const SignIn = props => {
  const onFinish = async values => {
    try {
      const token = await api.signIn(values);

      if (values.remember) {
        localStorage.setItem("token", token);
      }

      props.setToken(token);
      history.push(routes.todo);
    } catch ({ message }) {
      console.error(message);
      notification.open({
        message: "Error",
        description: message
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ marginTop: "35vh" }}>
      <Col span={12} offset={6}>
        <Card title="Log in">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                style={{ marginRight: "10px" }}
                type="primary"
                htmlType="submit"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  history.push(routes.signUp);
                }}
                // style={{ marginLeft: "10px" }}
                type={"default"}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
