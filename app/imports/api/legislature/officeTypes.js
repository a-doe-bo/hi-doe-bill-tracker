import _ from 'lodash';

export const officeTypes = {
  HB: 'hb',
  SB: 'sb',
  HR: 'hr',
  SR: 'sr',
  HCR: 'hcr',
  SCR: 'scr',
  GM: 'gm',
};

export const isValidOfficeType = (type) => _.includes(officeTypes, type);
export const getRandomMeasureType = () => {
  const keys = Object.keys(officeTypes);
  return officeTypes[keys[Math.floor(keys.length * Math.random())]];
};
