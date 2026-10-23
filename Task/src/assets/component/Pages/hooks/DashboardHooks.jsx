import { Container, Row, Col, Table } from "react-bootstrap";

const DashboardHooks = () => {
  return (
    <>
      <section className="dash_section">
        <Container>
          <Row>
            <Col md={12}>
              <h6>React Hooks</h6>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Hook</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>useState</td>
                    <td>Manage component state // holing an information</td>
                  </tr>
                  <tr>
                    <td>useLayoutEffect</td>
                    <td>Run effect before browser paints</td>
                  </tr>
                  <tr>
                    <td>useEffect</td>
                    <td>
                      Perform side effects / API calls // React Life cycle
                    </td>
                  </tr>
                  <tr>
                    <td>useContext</td>
                    <td>Access Context data // Read gloabal states</td>
                  </tr>
                  <tr>
                    <td>useRef</td>
                    <td>
                      Store a value / access DOM element // taking element
                      reference
                    </td>
                  </tr>
                  <tr>
                    <td>useMemo</td>
                    <td>
                      Optimize expensive calculations // it is a prevent to
                      memoized value
                    </td>
                  </tr>
                  <tr>
                    <td>useCallback</td>
                    <td>
                      Memoize a function // it is a prevents to memoized
                      function
                    </td>
                  </tr>
                  <tr>
                    <td>useReducer</td>
                    <td>Manage complex state</td>
                  </tr>
                  <tr>
                    <td>useparams</td>
                    <td>getting RoutingParams</td>
                  </tr>
                  <tr>
                    <td>useNavigate</td>
                    <td>helps to button navigations</td>
                  </tr>
                  <tr>
                    <td>useLocation</td>
                    <td>read queryParams</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DashboardHooks;
