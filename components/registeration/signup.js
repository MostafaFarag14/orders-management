import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import classes from './signup.module.css'
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SignUpForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
    fetch('api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(() => signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })
      )
      .then(result => {
        setLoading(false)
        if (!result.error) {
          router.replace('/')
        }
      })
  };

  return (
    <Form
      className={classes.SignUpForm}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please enter your name!',
            type: 'string'
          }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Name' />
      </Form.Item>

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
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            min: 6,
            message: 'Please Enter a Password with min 6 characters !',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item className={classes.actions}>
        <Button loading={loading} type="primary" htmlType="submit">
          Register
        </Button>
        <Link href='/login'>Already have an account ?</Link>
      </Form.Item>
    </Form>
  )

};

export default SignUpForm;