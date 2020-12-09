import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true); //This is the loading state
  const [data, setData] = useState(null); //This is the fetch data from the server
  const [page, setPage] = useState({
    currentPage: 1, // This is holds the value of the current page displayed
    totalPage: 1 // This holds the value of the total number pages returned from the server
  });

  /**
   * Pagination Items are generated from the total number of pages returned from the server
   */
  let active = page.currentPage;
  let items = [];
  
  for (let number = 1; number <= page.totalPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => setPage({...page, currentPage: number})}>
        {number}
      </Pagination.Item>,
    );
  }

  /**
   * The sorting function
   */
  const sortById = () => {
    let newData = data.sort().reverse()
    setData([...newData]);
  }

  /**
   * This useEffect hook fetches the parent data from the server
   */
  useEffect(() => {
    let url = `http://localhost:4000/api?page=${page.currentPage}`;

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
              setPage({...page, totalPage: res.totalPage});
              setIsLoading(false);
          })
          .catch(error => error)
          .then(res => console.log(res))
  }, [page.currentPage])

  return (
    <Container className="md-container">
      <Head>
        <title>Home - DAOFAB</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1 className="text-center">
          Welcome to Daofab Test App
        </h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => sortById()}>
                ID
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l8 10h-16l8-10zm8 14h-16l8 10 8-10z"/></svg>
                </th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Total Amount</th>
              <th>Total Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data.map((parent, index) =>(
            <tr key={`${index}-${parent}`}>
              <td>{parent.id}</td>
              <td>{parent.sender}</td>
              <td>{parent.receiver}</td>
              <td>{parent.totalAmount}</td>
              <td>{parent.totalPaidAmount != 0 && <Link href="/parents/[id]" as={`/parents/${parent.id}`}><a>{parent.totalPaidAmount}</a></Link>}</td>
            </tr>
            ))}

</tbody>
        </Table>
      </Container>
      <div className="d-flex justify-content-center"><Pagination>{items}</Pagination></div>
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
