import { useEffect, useState } from "react";

const useImage = (fileName: number | undefined) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | any>(null);
  const [image, setImage] = useState<null | any>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../assets/images/${fileName}.jpg`);
        setImage(response.default);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [fileName]);

  return {
    loading,
    error,
    image,
  };
};

export default useImage;
