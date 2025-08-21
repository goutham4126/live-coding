import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();

      if (res.ok) {
        setProducts(data.data);
      } else {
        setError(data.message || "Error fetching products");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (err) {
      toast.error("Server error while deleting product");
    }
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setForm({ name: product.name, price: product.price, image: product.image });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/products/${currentProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, price: Number(form.price) }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setProducts(
          products.map((p) => (p._id === currentProduct._id ? data.data : p))
        );
        setIsEditing(false);
        setCurrentProduct(null);
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (err) {
      toast.error("Server error while updating product");
    }
  };

  if (loading) return <Loading/>
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-3">
      <h2 className="text-2xl mb-4 font-bold">All Products</h2>
      {products.length === 0 ? (
        <div className="flex justify-center items-center h-[400px] gap-4"><p className="font-semibold">No products found.</p>
          <a href="/create" className="text-blue-500 underline"> Create one</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              className="border p-4 rounded shadow hover:shadow-lg transition"
              key={product._id}
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <div className="flex justify-between items-center my-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-700 font-semibold text-sm">₹{product.price}</p>
                </div>
              </Link>
              <div className="flex justify-between mt-2 text-sm font-semibold bg-slate-100 rounded p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => openEditDialog(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            />
            <div className="flex justify-end space-x-2 mt-3 font-semibold text-sm">
              <button
                className="bg-slate-200 text-black px-4 py-1.5 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1.5 rounded"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

