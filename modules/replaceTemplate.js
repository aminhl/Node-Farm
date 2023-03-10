// Function that replace the placeholders in the card template with the real data from the data json file
module.exports = (template, product) => {
  let output = template
    .toString()
    .replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.toString().replace(/{%IMAGE%}/g, product.image);
  output = output.toString().replace(/{%PRICE%}/g, product.price);
  output = output.toString().replace(/{%FROM%}/g, product.from);
  output = output.toString().replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.toString().replace(/{%QUANTITY%}/g, product.quantity);
  output = output.toString().replace(/{%DESCRIPTION%}/g, product.description);
  output = output.toString().replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
