const PortfolioDetail = ({ id }) => {
  return <h1>Hello {id}</h1>;
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true,
  };
};

export const getStaticProps = ({ params }) => {
  const id = params.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};

export default PortfolioDetail;
