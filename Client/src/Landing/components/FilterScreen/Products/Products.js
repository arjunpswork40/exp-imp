import "./Product.css";
import Card from "../../Generals/Card";

const Products = ({ result }) => {
  return (
    <>
      {/* <section className="card-container"><div class="card-row">{result}</div></section> */}
      <section className="card-container">
        {result}
        </section>

    </>
  );
};

export default Products;
