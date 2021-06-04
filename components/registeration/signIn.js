import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signin } from 'next-auth/client'

import classes from './signIn.module.css'
import { useState } from 'react';

const SignInForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true)
    const result = await signin('credentials', {
      redirect: false,
      email: values.email,
      password: values.password
    })
    setLoading(false)
    console.log(result)
    if (!result.error) {
      router.replace('/')
    }
  };

  return (
    <Form
      name="normal_login"
      className={classes.SignInForm}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
            type: 'email'
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item className={classes.actions}>
        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link href='/register'>register now!</Link>
      </Form.Item>
    </Form>
  )

};

export default SignInForm;