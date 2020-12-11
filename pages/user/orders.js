import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { getSession } from 'next-auth/client';
import useUser from '~/lib/hooks/useUser';
import Sidebar from '~/components/public/user/Sidebar';
import { Card, Col, Row, CardBody, Spinner } from 'reactstrap';

const Orders = ({}) => {
  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Row>
          <Col md="3">
            <Sidebar url="orders" />
          </Col>
          <Col>
            <Card className="shadow-sm">
              <CardBody>
                <small className="text-muted">No orders found.</small>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const session = await getSession(context);
  if (!session) {
    console.log("We've lost the session");
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}

export default Orders;
