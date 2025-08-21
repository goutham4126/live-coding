import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
     const getProduct = async () => {
        try {
          const res = await fetch(`http://localhost:8000/api/products/${id}`);
          const data = await res.json();
          if (res.ok) {
            setProduct(data.data);
          } else {
            setError(data.message || "Failed to fetch product");
          }
        } catch (err) {
          setError("Server error");
        } finally {
          setLoading(false);
        }
      };
    getProduct();
  }, [id]);

  if (loading) return <Loading/>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <div className="flex justify-center items-center">Product not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4 shadow"
      />
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-600 text-lg mb-4 font-semibold">Price: ₹{product.price}</p>

      <Link
        to="/"
        className="inline-block font-semibold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetails;
