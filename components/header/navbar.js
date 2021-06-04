import { Avatar, Button, Menu } from 'antd';
import Title from 'antd/lib/typography/Title';
import { getSession, signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classes from './navbar.module.css'

function NavBar() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        setUser(session.user)
      }
    })
  }, [router])

  return (
    <div className={classes.header}>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link href='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href='/orders'>Orders</Link>
        </Menu.Item>
      </Menu>
      {user &&
        <div className={classes.rightMenu}>
          <Title level={5}>Welcome, {user.name}</Title>
          <Avatar className={classes.avatar}>{user.name[0].toUpperCase()}</Avatar>
          <Button onClick={signOut}>Log out</Button>
        </div>
      }
    </div>
  )
}

export default NavBar
