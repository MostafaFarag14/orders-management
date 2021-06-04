import { MongoClient } from 'mongodb'
import { compare, hash } from 'bcryptjs'

const uri = "mongodb+srv://mostafafarag:Mf.361987@cluster0.ea4jj.gcp.mongodb.net/orders?retryWrites=true&w=majority"

export async function connectToDatabase() {
  const client = await MongoClient.connect(uri)
  return client
}

export async function hashPassword(password) {
  return await hash(password, 12)
}

export async function addUser(user) {
  let client;

  try {
    client = await connectToDatabase()
  }
  catch (error) {
    console.log(error)
    client.close()
    return
  }

  const db = client.db()
  const existingUser = await db.collection('users').findOne({ email: user.email })

  if (existingUser) {
    client.close()
    return { error: 'User already exists!' }
  }

  const result = await db.collection('users').insertOne({
    username: user.username,
    email: user.email,
    password: await hashPassword(user.password)
  })
  client.close()
  return result.insertedId
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword)
}