import { addUser } from "../../../helpers/db-utils";


async function handler(req, res) {
  const user = req.body
  const result = await addUser(user)
  if (result.error) {
    res.status(422).json({ message: result.error })
    return
  }
  res.status(200).json({ message: `user added: ${result}` })
}

export default handler;