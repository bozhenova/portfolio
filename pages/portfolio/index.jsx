import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import PortfolioCard from '@/components/portfolios/PortfolioCard';

const fetchPortfolios = () => {
  const query = `query Portfolios {
    portfolios {
    _id,
    title,
    company,
    companyWebsite,
    location,
    jobTitle,
    description
    startDate
    endDate
    }
  }`;
  return axios.post('http://localhost:3000/graphql', { query }).then((res) => {
    return res.data.data.portfolios;
  });
};

const createNewPortfolio = () => {
  const query = `
    mutation CreatePortfolio {
    createPortfolio(input: {
    title: "Job in Netcentric"
      company: "Netcentric"
      companyWebsite: "www.google.com"
      location: "Spain, Barcelona"
      jobTitle: "Engineer"
      description: "Doing something, programing...."
      startDate: "01/01/2014"
      endDate: "01/01/2016"
    }) {
    _id,
    title,
    company,
    companyWebsite,
    location,
    jobTitle,
    description
    startDate
    endDate
    }
  }`;
  return axios.post('http://localhost:3000/graphql', { query }).then((res) => {
    return res.data.data.createPortfolio;
  });
};

const editPortfolio = (id) => {
  const query = `
    mutation UpdatePortfolio {
    updatePortfolio(id: "${id}", input: {
    title: "Job in google"
      company: "google"

    }) {
    _id,
    title,
    company,
    companyWebsite,
    location,
    jobTitle,
    description
    startDate
    endDate
    }
  }`;
  return axios.post('http://localhost:3000/graphql', { query }).then((res) => {
    return res.data.data.updatePortfolio;
  });
};

const removePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
    deletePortfolio(id: "${id}")
  }`;
  return axios.post('http://localhost:3000/graphql', { query }).then((res) => {
    return res.data.data.deletePortfolio;
  });
};

const Portfolio = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await createNewPortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  };

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await editPortfolio(id);
    const index = portfolios.findIndex((p) => p._id === id);
    const newPortfolios = [...portfolios];
    newPortfolios[index] = updatedPortfolio;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const index = await removePortfolio(id);
    const newPortfolios = [...portfolios];
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  };

  return (
    <>
      <section className='section-title'>
        <div className='px-2'>
          <div className='pt-5 pb-4'>
            <h1>Portfolio</h1>
          </div>
        </div>
        <button className='btn btn-primary' onClick={createPortfolio}>
          Create Portfolio
        </button>
      </section>
      <section className='pb-5'>
        <div className='row'>
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className='col-md-4'>
              <Link href={`/portfolio/${portfolio._id}`}>
                <a className='card-link'>
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <button
                className='btn btn-warning'
                onClick={() => updatePortfolio(portfolio._id)}>
                Update portfolio
              </button>
              <button
                className='btn btn-danger'
                onClick={() => deletePortfolio(portfolio._id)}>
                Delete portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
      <a href='' className='btn btn-main bg-blue ttu'>
        See More Portfolios
      </a>
    </>
  );
};

Portfolio.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default Portfolio;
