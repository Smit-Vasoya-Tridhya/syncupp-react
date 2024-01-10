'use client';

import { RemoveRegionalData } from '@/redux/slices/user/client/clientSlice';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useDispatch } from 'react-redux';

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: '320px',
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);
  const dispatch = useDispatch();

  const openModal = ({
    view,
    customSize,
  }: {
    view: React.ReactNode;
    customSize?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
    });
  };

  const closeModal = () => {
    dispatch(RemoveRegionalData())
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
