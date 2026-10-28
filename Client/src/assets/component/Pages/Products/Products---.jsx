import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getApiCall(`https://fakestoreapi.com/products/${id}`);
    } else {
      getApiCall("https://fakestoreapi.com/products");
    }
  }, [id]);

  const getApiCall = async (url) => {
    try {
      let response = await fetch(url);
      let responseData = await response.json();
      if (Array.isArray(responseData)) {
        setProducts(responseData);
      } else {
        setProduct(responseData);
      }
    } catch (error) {
      console.log("Error::::", error);
    }
  };

  return (
    <div>
      <h3 class="text-center text-primary"> Our Products </h3>

      <div className="d-flex gap-3 flex-wrap">
        {!id ? (
          products.map((value, key) => {
            return (
              <div className="card" style={{ width: "200px" }}>
                <img
                  src={value?.image}
                  alt="product-image"
                  class="card-img-top"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <div className="card-title">{value.title}</div>
                  <div className="card-text">{value.price}</div>
                  <div>
                    <Link to={`/products/${value.id}`}>View Full info</Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <Link to={"/products"}>Back</Link>
            <div className="card mt-5">
              <div class="d-flex gap-5">
                <div className="card-image">
                  <img src={product?.image} alt="product-image" />
                </div>
                <div class="m-5">
                  <div className="card-title pt-3">{product?.title}</div>
                  <div className="card-text pt-3">{product?.price}</div>
                  <div className="card-text pt-3">{product?.description}</div>
                  <button>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
