import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase, verifyPassword } from '../../../helpers/db-utils'

async function authorize(credentials) {
  let client
  try {
    client = await connectToDatabase()
  }
  catch (error) {
    throw new Error("Couldn't connect to database")
  }
  const db = client.db()
  const existingUser = await db.collection('users').findOne({ email: credentials.email })

  if (!existingUser) {
    client.close()
    throw new Error('No user found with this email')
  }

  const verified = await verifyPassword(credentials.password, existingUser.password)
  if (!verified) {
    client.close()
    throw new Error("Coudn't log you in")
  }
  client.close()
  return {
    email: existingUser.email,
    name: existingUser.username
  }
}

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      authorize
    })
  ]
})