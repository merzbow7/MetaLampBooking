function parsePrice(price_, locale = 'ru', currency = 'RUB') {
  const price = parseInt(price_, 10);
  const localePrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumSignificantDigits: 1,
  }).format(price);
  return localePrice.slice(0, -2) + localePrice.slice(-1);
}

export default parsePrice;
