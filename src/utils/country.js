import countries from 'world-countries';

const getMaxLengthItem = (a, b) => (a.length > b.length ? a : b);

const getCountryCodes = country => {
  return country.idd.suffixes
    .map(suffix => `${country.idd.root}${suffix.replace(/X/g, '')}`)
    .filter(code => code);
};

export const getCountryByCode = phone => {
  const suitableCountries = countries
    .map(country => {
      const countryCodes = getCountryCodes(country);

      const suitableCodes = countryCodes.filter(code => phone.includes(code));

      if (!suitableCodes.length) {
        return;
      }

      const suitableCode = suitableCodes.reduce(getMaxLengthItem);

      return {
        country,
        code: suitableCode,
      };
    })
    .filter(item => item);

  if (suitableCountries.length) {
    let duplicates = false;
    const res = suitableCountries.reduce((a, b) => {
      if (a.code.length === b.code.length) {
        duplicates = true;
      }
      return a.code.length > b.code.length ? a : b;
    });
    return duplicates ? undefined : res.country;
  }

  return undefined;
};

export const getCountryCode = countryObj => {
  return `${countryObj.idd.root}${
    (countryObj.idd.suffixes.length === 1 && countryObj.idd.suffixes) || ''
  }`;
};

export const getCountryByName = countryName => {
  return countries.find(country => country.name.common === countryName);
};
