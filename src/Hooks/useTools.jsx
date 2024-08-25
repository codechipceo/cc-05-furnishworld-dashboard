import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useTools = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    dispatch,
    useSelector,
    navigate,
  };
};
