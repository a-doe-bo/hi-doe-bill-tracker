import _ from 'lodash';

// 'Deputy', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'
export const officeTypes = {
  DEPUTY: 'Deputy',
  OCID: 'OCID',
  OFO: 'OFO',
  OFS: 'OFS',
  OITS: 'OITS',
  OSIP: 'OSIP',
  OSSS: 'OSSS',
  OTM: 'OTM',
};

export const isValidOfficeType = (type) => _.includes(officeTypes, type);
export const getRandomMeasureType = () => {
  const keys = Object.keys(officeTypes);
  return officeTypes[keys[Math.floor(keys.length * Math.random())]];
};
