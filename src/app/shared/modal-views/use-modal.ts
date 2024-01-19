'use client';

import { RemoveClientData, RemoveRegionalData } from '@/redux/slices/user/client/clientSlice';
import { RemoveTeamMemberData } from '@/redux/slices/user/team-member/teamSlice';
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
    dispatch(RemoveClientData())
    dispatch(RemoveTeamMemberData())
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
