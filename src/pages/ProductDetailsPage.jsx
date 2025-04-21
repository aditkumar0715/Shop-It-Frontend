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
import RatingBadge from "../components/product/RatingBadge";

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
        <div className="flex-1 flex flex-col">
          <h1 className=" order-1 text-3xl font-bold mb-4">{product.title}</h1>
          <p className=" order-2 text-muted-foreground mb-4 text-lg">
            {product.description}
          </p>
          <div className="order-3 flex items-baseline gap-2 mb-4">
            <p className="text-xl font-bold text-primary mb-1">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage && (
              <div className="flex space-x-2">
                <p className="text-base text-muted-foreground line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
                <p className="text-base text-success font-semibold">
                  {product.discountPercentage}% off
                </p>
              </div>
            )}
          </div>
          <div className="order-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-base text-muted-foreground">
              Category:{" "}
              <span className="text-foreground">{product.category}</span>
            </p>
            <p className="text-base text-muted-foreground">
              Brand:{" "}
              <span className="text-foreground">
                {product.brand || "Unknown"}
              </span>
            </p>
            <p className="text-base text-muted-foreground">
              Weight:{" "}
              <span className="text-foreground">{product.weight}kg</span>
            </p>
            <p className="text-base text-muted-foreground">
              Dimensions:{" "}
              <span className="text-foreground">
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth}
              </span>
            </p>
            <p className="text-base text-muted-foreground">
              Warranty:{" "}
              <span className="text-foreground">
                {product.warrantyInformation}
              </span>
            </p>
            <p className="text-base text-muted-foreground">
              Shipping:{" "}
              <span className="text-foreground">
                {product.shippingInformation}
              </span>
            </p>
            <p className="text-base text-muted-foreground">
              Availability:{" "}
              <span className="text-foreground">
                {product.availabilityStatus}
              </span>
            </p>
            <p className="inline-flex items-center gap-2 text-base text-muted-foreground">
              Rating:
              <div className="text-foreground scale-75 origin-left">
                <RatingBadge rating={product.rating} />
              </div>
              
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart order-4 md:order-6 self-end bg-primary text-primary-foreground py-2 px-4 rounded mb-6 md:mt-6 hover:bg-primary/80 active:scale-95 transition-colors w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsList reviews={product.reviews} rating={product.rating} />

      {/* More from this Category */}
      <SectionCarousel title={product.category} category={product.category} />

      {/* People Also Like */}
      {/* <SectionCarousel
        title="People Also Like"
        items={[...Array(5)].map((_, i) => ({ id: i }))}
      /> */}
    </div>
  );
}
