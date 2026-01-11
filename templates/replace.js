module.exports = (el, template) => {
  let tmp = template.replace(/{%PRODUCTNAME%}/g, el.productName);
  tmp = tmp.replace(/{%IMAGE%}/g, el.image);
  tmp = tmp.replace(/{%FROM%}/g, el.from);
  tmp = tmp.replace(/{%QUANTITY%}/g, el.quantity);
  tmp = tmp.replace(/{%PRICE%}/g, el.price);
  tmp = tmp.replace(/{%DESCRIPTION%}/g, el.description);
  tmp = tmp.replace(/{%NUTRIENTS%}/g, el.nutrients);
  tmp = tmp.replace(/{%ID%}/g, el.id);
  if (!el.organic) tmp = tmp.replace('/{%NOT_ORGANIC%}/g', 'not-organic');
  return tmp;
};
