const spider = require('../index');

let urls = [];
for(let i = 1; i<= 10; i++) {
	urls.push('https://www.brandos.no/sko?p='+i);
}

const options = {
	urls,
	limit: 2,
	fileName: './data.txt',
	operate: ($) => {
		let links = [];

	  $(".productInfo > a.productCardLink").each(function(index,item){
      links.push({
      	src: $(item).find('div.img > img').attr("data-original"),
      	brand: $(item).find('div.card > div.brand').text(),
      	name: $(item).find('div.card > div.name').text(),
      	discount: $(item).find('div.card > div.price.discount').text(),
      	ordinaryPrice: $(item).find('div.card > div.ordinary-price').text(),
      })
    })

    return links;
	}
}

spider(options);