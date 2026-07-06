import { useDispatch, useSelector } from "react-redux";
import { addToWishlist as addAction, removeFromWishlist as removeAction } from "../store/slices/WishlistSlice";

export function useWishList() {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishlist.items) || [];

  const addToWishlist = (game) => {
    dispatch(addAction(game));
  };

  const removeFromWishlist = (gameId) => {
    dispatch(removeAction(gameId));
  };

  const isInWishlist = (gameId) => {
    return wishList.some((g) => g.id === gameId);
  };

  return { wishList, addToWishlist, removeFromWishlist, isInWishlist, loading: false };
}
