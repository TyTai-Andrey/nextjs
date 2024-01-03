import { Button } from '@components/Button';
import { MysticModal } from '../compositions/MysticModal';
import { useModal } from '@utils/useModal';

const Draft = () => {
  const { openModal } = useModal();

  const openModalHadler = () => {
    openModal(MysticModal);
  };

  return <Button onClick={openModalHadler}>Что-то сделать</Button>;
};

export default Draft;
