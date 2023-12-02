import { useState, useEffect } from 'react';
import { Blocks } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from 'utils/api';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

const AppStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    async function getPictures() {
      const queryString = query.slice(query.indexOf('/') + 1);

      if (queryString !== '') {
        try {
          setIsLoading(true);
          const fetchedImages = await fetchImages(queryString, page);

          setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
          setLoadMore(page < Math.ceil(fetchedImages.totalHits / 12));
        } catch (error) {
          toast.error('Something went wrong! Please, try again :(  ');
        } finally {
          setIsLoading(false);
        }
      }
    }

    getPictures();
  }, [query, page]);

  const handleSubmit = query => {
    //Якщо рядок порожній, то викидаємо повідомлення користувачу
    if (!query.trim()) {
      return toast.error('Enter something to search');
    }

    // При обробці самбіту обнуляємо массив зображень в стейті
    // та сторінку до першої
    setImages([]);
    setQuery(`${Date.now()}/${query}`);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div style={AppStyle}>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      )}
      {images.length > 0 && <ImageGallery imagesList={images} />}
      {loadMore && <Button handleClick={handleLoadMore} />}
      <Toaster />
    </div>
  );
};
