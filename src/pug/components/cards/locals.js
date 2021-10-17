function parsePrice(_price, locale = 'ru', currency = 'RUB') {
  const price = parseInt(_price, 10);
  const localePrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumSignificantDigits: 1,
  }).formatToParts(price);

  const noLiteralPrice = localePrice.filter((item) => item.type !== 'literal');
  return noLiteralPrice.map((item) => item.value).join('');
}

export default parsePrice;
