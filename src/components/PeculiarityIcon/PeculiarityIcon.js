import React from 'react';
import Garlic from '../../icons/restoranInfo/features/Garlic.svg';
import GlutenFree from '../../icons/restoranInfo/features/Gluten-free.svg';
import NoDairy from '../../icons/restoranInfo/features/No-dairy';
import Spicy from '../../icons/restoranInfo/features/Spicy.svg';
import Vegan from '../../icons/restoranInfo/features/Vegan.svg';

export const PECULIARITIES_MAP = {
  gluten_free: {
    icon: GlutenFree,
    label: 'Gluten free',
  },
  vegan_friendly: {
    icon: Vegan,
    label: 'Vegan',
  },
  spicy: {
    icon: Spicy,
    label: 'Spicy',
  },
  contain_garlic: {
    icon: Garlic,
    label: 'Garlic',
  },
  lactose_free: {
    icon: NoDairy,
    label: 'No dairy',
  },
};

export const PeculiarityIcon = ({ name, width = 32, height = 32 }) => {
  const item = PECULIARITIES_MAP[name];
  if (!item) {
    return null;
  }
  return <item.icon width={width} height={height} />;
};
