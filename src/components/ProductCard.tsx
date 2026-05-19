import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types/supabase';
import { useState, useEffect, memo } from 'react';
import { useCartStore } from '../store/cartStore';
import { CartState } from '../types/cart';
import { formatARS } from '../lib/currency';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const cartItems = useCartStore((state: CartState) => state.items);
  const [isInCart, setIsInCart] = useState(false);
  
  useEffect(() => {
    // Check if product is in cart
    const cartItem = cartItems.find((item: { product_id: string }) => item.product_id === product.id);
    setIsInCart(!!cartItem);
  }, [cartItems, product.id]);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if product is already in cart
    const existingItem = cartItems.find((item: { product_id: string }) => item.product_id === product.id);
    if (existingItem) {
      // If already in cart, increment quantity by 1
      const newQuantity = existingItem.quantity + 1;
      useCartStore.getState().updateQuantity(existingItem.id, newQuantity);
    } else {
      // If not in cart, add it
      onAddToCart(product);
    }
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div 
      onClick={handleQuickView}
      className="bg-black/55 backdrop-blur-sm border border-primary/30 rounded-lg shadow-md overflow-hidden h-full flex flex-col will-change-transform cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-500 ease-in-out transform hover:-translate-y-1"
    >
      <div className="relative group">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <div className="absolute top-3 left-3 bg-primary/20 border border-primary/60 text-primary px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest">
          {product.stock > 0 ? 'Disponible' : 'Sin stock'}
        </div>
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-black/50 rounded-full shadow-sm hover:bg-black/70 transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-200 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
          />
        </button>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-md text-xs font-medium">
            Quedan {product.stock}
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
              Sin stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[11px] uppercase tracking-[0.25em] text-primary mb-1">
          {product.category}
        </p>
        <h3 className="text-2xl font-black text-white leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-300 mt-2 flex-grow line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3">
          <p className="text-4xl font-black text-[#C026FF] drop-shadow-[0_0_8px_rgba(192,38,255,0.55)] leading-none">
            {formatARS(Math.round(product.price))}
          </p>
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
              product.stock > 0
                ? 'bg-primary text-white hover:bg-violet-700 shadow-md hover:shadow-lg'
                : 'bg-gray-500/60 text-gray-300 cursor-not-allowed'
            }`}
            aria-label={product.stock > 0 ? (isInCart ? "Actualizar carrito" : "Agregar al carrito") : "Sin stock"}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{product.stock > 0 ? (isInCart ? 'Actualizar carrito' : 'Agregar al carrito') : 'Sin stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;


