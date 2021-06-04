import { getSession } from 'next-auth/client'

function OrdersPage() {
  return (
    <div>
      Here are your orders
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default OrdersPage
