// Core
import React from "react";
import { Form, Input, Button, Row, Col, Card, notification } from "antd";
import { routes } from "../../navigation/routes";
import { history } from "../../navigation/history";

// Instruments
import { api } from "../../api";

//Styles
import style from "../../pages/style";
const { layout, tailLayout, border } = style;

export const SignUp = props => {
  const onFinish = async values => {
    try {
      await api.signUp(values);
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
        <Card style={border} title="Log in">
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
              label="First name"
              name="fname"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lname"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!"
                }
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  history.push(routes.signIn);
                }}
                style={{ marginLeft: "10px" }}
                type={"default"}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
