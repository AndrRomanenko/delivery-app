import React, { useState } from 'react';
import ImageBase from 'react-native-fast-image';

import Default from '../../icons/restaurantPage/DefaultLogo.png';

const Image = ({ source, renderError, style, resizeMode, ...props }) => {
  const [error, setError] = useState(false);

  const hasUri = source.uri && !error;

  const src = hasUri ? source : Default;
  const resize = hasUri ? resizeMode : 'contain';

  const onError = e => {
    console.warn('Image load error.', e.nativeEvent.error);
    props.onError?.(e);
    setError(true);
  };

  return (
    <ImageBase
      source={src}
      resizeMode={resize}
      style={style}
      {...props}
      onError={onError}
    />
  );
};

export default Image;
