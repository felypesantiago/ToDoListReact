
import React from 'react';

export const handleResult = ({ error, isLoaded }, onSuccess) => {
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return onSuccess();
      }
}
