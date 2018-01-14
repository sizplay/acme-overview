//instructions
//write the 4 functions below
//no third party libraries
//try not to use any forEach
//each function should be short and some functions can depend on other functions (hint no function should be more than 10 lines)

//list of products
var products = [
  {
    id: 1,
    price: 5,
    name: 'foo'
  },
  {
    id: 2,
    price: 3,
    name: 'bar'
  },
  {
    id: 3,
    price: 9,
    name: 'bazz'
  }
];

//list of line items
var lineItems = [
   {
     productId: 1,
     quantity: 1
   },
   {
     productId: 1,
     quantity: 1
   },
   {
     productId: 2,
     quantity: 1
   },
   {
     productId: 3,
     quantity: 1
   },
];
//returns an object
//keys are the ids of products
//the values are the products themselves
function generateProductsMap(products){
  return products.reduce(function(obj, prod){
    obj[prod.id] = prod;
    return obj;
  }, {});
}

//returns an object
//keys are the ids of products
//value is the total revenue for that product
function salesByProduct(products, lineItems){
  var arr = [];
  var salesProd = products.reduce(function(obj, prod) {
    lineItems.map(function (product) {
      if (prod.id === product.productId) {
        if (arr[prod.id]) {
          arr[prod.id] += product.quantity;
        } else {
          arr[prod.id] = product.quantity;
        }
      }
    });
    obj[prod.id] = prod.price * arr[prod.id];
    return obj;
  }, {});
  return salesProd;
}

// //return the total revenue for all products
function totalSales(products, lineItems){
  // var arr = [], sum = 0;
  // var salesProd = products.reduce(function (obj, prod) {
  //   lineItems.map(function (product) {
  //     if (prod.id === product.productId) {
  //       if (arr[prod.id]) {
  //         arr[prod.id] += product.quantity;
  //       } else {
  //         arr[prod.id] = product.quantity;
  //       }
  //     }
  //   });
  //   sum += prod.price * arr[prod.id];
  //   return sum;
  // }, {});
  // return salesProd;
  var obj = salesByProduct(products, lineItems);
  var sum = 0;
  for (var key in obj){
    sum += obj[key];
  }
  return sum;
}

// //return the product responsible for the most revenue
function topSellerByRevenue(products, lineItems){
  var obj = salesByProduct(products, lineItems);
  var compare = 0, index = 0;
  for (var key in obj){
    if (compare < obj[key]) {
    compare = obj[key];
    index = key;
    }
  }
  return products[index-1].name;
}

console.log(`generates product map - should be
{
  1:{
    id: 1,
    name: "foo",
    price: 5
  },
  2:{
    id: 2,
    name: "bar",
    price: 3
  },
  3:{
    id: 3,
    name: "bazz",
    price: 9
  }
}

`, generateProductsMap(products));
console.log(`sales by product - should be
  {
    1: 10,
    2: 3,
    3: 9
}`, salesByProduct( products, lineItems));
console.log('total sales - should be 22', totalSales( products, lineItems));
console.log('top seller by revenue', topSellerByRevenue(products, lineItems ));
