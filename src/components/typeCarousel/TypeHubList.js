import React, { useEffect, useState } from 'react';
import { ImageTypeData } from './ImageTypeData';
import { TypeHubItem } from './TypeHubItem';
import { ArtworkApi } from '../../api/Api';

export const TypeHubList = () => {
  const [artworkTypes, setArtworkTypes] = useState([])
  useEffect(() => {
    ArtworkApi.GetAllArtworkType().then(res => {
      console.log(res.data)
      setArtworkTypes(res.data)
    }).catch(e => console.error(e))
  }, [])

  return (
    <div className='typehub-list flex gap-[50px]'>
      {artworkTypes.length > 0 && ImageTypeData.map((item, index) => {
        return (
          <TypeHubItem
            key={index}
            image={item.image}
            type={artworkTypes.filter(type => type.id === item.id)[0].name}
          />
        )
      })}
    </div>
  );
};

export default TypeHubList;