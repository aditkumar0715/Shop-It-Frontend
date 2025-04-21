import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getProduct } from "../services/productService";
import { addItem } from "../redux/cartSlice";
import ProductLoader from "../components/product/ProductLoader";
import ImageSwiper from "../components/swiper/ImageSwiper";
import SectionCarousel from "../components/product/SectionCarousel";
import ReviewsList from "../components/reviews/ReviewsList";


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      const response = await getProduct(id);
      setProduct(response.data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`);
  };

  if (loading) return <ProductLoader />;

  return (
    <div className="container mx-auto p-4 space-y-8 bg-background text-foreground">
      {/* Top Section: Images + Basic Info */}
      <div className=" product-detail shadow-lg rounded-lg p-6 flex flex-col lg:flex-row gap-8 bg-card text-card-foreground">
        <div className="lg:w-1/3">
          <ImageSwiper images={product.images} />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-muted-foreground mb-4 text-lg">
            {product.description}
          </p>
          <p className="text-xl font-semibold mb-4 text-primary">
            ${product.price.toFixed(2)}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-sm text-muted-foreground">
              Category:{" "}
              <span className="text-foreground">{product.category}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Brand: <span className="text-foreground">{product.brand}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Weight: <span className="text-foreground">{product.weight}kg</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Dimensions:{" "}
              <span className="text-foreground">
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Warranty:{" "}
              <span className="text-foreground">
                {product.warrantyInformation}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Shipping:{" "}
              <span className="text-foreground">
                {product.shippingInformation}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Availability:{" "}
              <span className="text-foreground">
                {product.availabilityStatus}
              </span>
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart bg-primary text-primary-foreground py-2 px-4 rounded mt-6 hover:bg-primary/80 active:scale-95 transition-colors w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsList reviews={product.reviews} />

      {/* More from this Category */}
      <SectionCarousel
        title={product.category}
        category={product.category}
      />

      {/* People Also Like */}
      {/* <SectionCarousel
        title="People Also Like"
        items={[...Array(5)].map((_, i) => ({ id: i }))}
      /> */}
    </div>
  );
}
