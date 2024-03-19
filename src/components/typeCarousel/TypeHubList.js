import React from 'react';
import { ImageTypeData } from './ImageTypeData';
import { TypeHubItem } from './TypeHubItem';

export const TypeHubList = () => {
  return (
    <div className='typehub-list flex gap-[50px]'>
      {ImageTypeData.map((item, index) => {
        return (
          <TypeHubItem
            key={index}
            image={item.image}
            />
        )
      })}
    </div>
  );
};

export default TypeHubList;