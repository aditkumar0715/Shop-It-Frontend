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
    <div className="bg-background text-foreground container mx-auto space-y-8 p-4">
      {/* Top Section: Images + Basic Info */}
      <div className="product-detail bg-card text-card-foreground flex flex-col gap-8 rounded-lg p-6 shadow-lg lg:flex-row">
        <div className="lg:w-1/3">
          <ImageSwiper images={product.images} />
        </div>
        <div className="flex flex-1 flex-col">
          <h1 className="order-1 mb-4 text-3xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground order-2 mb-4 text-lg">
            {product.description}
          </p>
          <div className="order-3 mb-4 flex items-baseline gap-2">
            <p className="text-primary mb-1 text-xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage && (
              <div className="flex space-x-2">
                <p className="text-muted-foreground text-base line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
                <p className="text-success text-base font-semibold">
                  {product.discountPercentage}% off
                </p>
              </div>
            )}
          </div>
          <div className="order-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <p className="text-muted-foreground text-base">
              Category:{" "}
              <span className="text-foreground">{product.category}</span>
            </p>
            <p className="text-muted-foreground text-base">
              Brand:{" "}
              <span className="text-foreground">
                {product.brand || "Unknown"}
              </span>
            </p>
            <p className="text-muted-foreground text-base">
              Weight:{" "}
              <span className="text-foreground">{product.weight}kg</span>
            </p>
            <p className="text-muted-foreground text-base">
              Dimensions:{" "}
              <span className="text-foreground">
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth}
              </span>
            </p>
            <p className="text-muted-foreground text-base">
              Warranty:{" "}
              <span className="text-foreground">
                {product.warrantyInformation}
              </span>
            </p>
            <p className="text-muted-foreground text-base">
              Shipping:{" "}
              <span className="text-foreground">
                {product.shippingInformation}
              </span>
            </p>
            <p className="text-muted-foreground text-base">
              Availability:{" "}
              <span className="text-foreground">
                {product.availabilityStatus}
              </span>
            </p>
            <p className="text-muted-foreground inline-flex items-center gap-2 text-base">
              Rating:
              <div className="text-foreground origin-left scale-75">
                <RatingBadge rating={product.rating} />
              </div>
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart bg-primary text-primary-foreground hover:bg-primary/80 order-4 mb-6 w-full self-end rounded px-4 py-2 transition-colors active:scale-95 md:order-6 md:mt-6 md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsList reviews={product.reviews} rating={product.rating} />

      {/* More from this Category */}
      <SectionCarousel
        title={`More in ${product.category}`}
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
