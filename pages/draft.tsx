import Head from 'next/head';
import { Button } from '@components/Button';
import { MysticModal } from '../compositions/MysticModal';
import { useModal } from '@utils/useModal';

const Draft = () => {
  const { openModal } = useModal();

  const openModalHadler = () => {
    openModal(MysticModal);
  };

  return (
    <>
      <Head>
        <title>Draft</title>
      </Head>
      <Button onClick={openModalHadler}>Что-то сделать</Button>
    </>
  );
};

export default Draft;
