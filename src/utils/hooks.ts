import type { AppDispatch, RootState } from '../redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();