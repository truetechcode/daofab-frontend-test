import Head from 'next/head'
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Card, Button, Table } from 'react-bootstrap'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null)
  
  useEffect(() => {
    let id = Router.query.id;
    let url = `http://localhost:4000/api/${id}`;

    const queryParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    };

    fetch(url, queryParams)    
          .then(res => {
              if (res.ok) {
                  return res.json()
              } else {
                  throw res.json()
              }
          })
          .then(res => res)
          .then(res => {
              setData(res.data);
              setIsLoading(false)
          })
          .catch(error => error)
          .then(e => console.log(e))
          .finally(() => setIsLoading(false))
  }, [])

  return (
    <Container className="md-container">
      <Head>
        <title>Child - DAOFAB</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1 className="text-center">
          Daofab Child Pages
        </h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data.map((child, index) =>(
              <tr key={`${index}-${child}`}>
              <td>{child.id}</td>
              <td>{child.sender}</td>
              <td>{child.receiver}</td>
              <td>{child.totalAmount}</td>
              <td>{child.paidAmount}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Container>
            <Button onClick={() => Router.back()}>Back</Button>
      </Container>

      <footer className="cntr-footer">
        <a
          href="https://github.com/truetechcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by TrueTechCode
        </a>
      </footer>
    </Container>
  )
}
