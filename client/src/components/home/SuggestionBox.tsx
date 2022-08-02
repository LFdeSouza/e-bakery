import { IProduct } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import useImage from "../../hooks/useImage";

interface Props {
  product: IProduct;
}
const SuggestionBox: React.FC<Props> = ({ product }) => {
  const image = useImage(product.id);
  const navigate = useNavigate();

  return (
    <div className="p-4" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="relative group">
        <div className="w-auto overflow-hidden rounded-lg h-72 ">
          <img
            className="object-cover w-full h-full transition-transform duration-500 cursor-pointer hover:scale-125"
            src={image.image}
            alt={product.name}
          />
        </div>
        <p className="rounded-lg bg-white/60 p-1.5 px-4 text-center text-gray-700 group-hover:visible sm:invisible sm:absolute sm:left-1/2 sm:top-5  sm:-translate-x-1/2 sm:text-gray-900">
          {product.name}
        </p>
      </div>
    </div>
  );
};

export default SuggestionBox;
