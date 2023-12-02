import { useState } from 'react';

import { Modal } from 'components/Modal/Modal';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImageItem onClick={openModal}>
        <Image src={webformatURL} alt="This is result of your search" />
      </ImageItem>
      {isModalOpen && (
        <Modal
          imageUrl={largeImageURL}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
