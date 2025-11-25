import React, { useState } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback: React.FC<Props> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  // If no src provided or error occurred, show placeholder
  const imageSrc = error || !src ? 'https://picsum.photos/500/500?grayscale&blur=2' : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};