$(document).ready(function () {
	$.getJSON('products.json', function (data) {
		renderProducts(data);
		$('.storeItems').slick({
			dots: true,
			infinite: true,
			speed: 1000,
			autoplay: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
						dots: true,
					},
				},
				{
					breakpoint: 830,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		});
	}).fail(function () {
		console.log('Error occured when attempting to load data!');
	});

	function renderProducts(products) {
		for (const product of products) {
			const itemWrapper = document.createElement('li');
			itemWrapper.classList.add('storeItem');

			const itemImg = document.createElement('img');
			itemImg.classList.add('storeItem_img');
			itemImg.src = product.imageMain;
			itemImg.style.width = '80%';
			itemImg.classList.add('mt-4');
			itemImg.classList.add('mx-auto');
			itemImg.style.opacity = 1;
			itemImg.addEventListener('mouseover', () => {
				const imageChange = setInterval(() => {
					itemImg.style.opacity -= 0.25;
					if (itemImg.src == product.imageAlt) {
						clearInterval(imageChange);
						itemImg.style.opacity = 1;
					}
				}, 100);
				setTimeout(() => {
					itemImg.src = product.imageAlt;
				}, 300);
			});
			itemImg.addEventListener('mouseout', () => {
				itemImg.src = product.imageMain;
			});

			const itemDesc = document.createElement('div');
			itemDesc.classList.add('storeItem_desc');
			itemDesc.classList.add('mx-4');

			const item_category = document.createElement('h6');
			item_category.classList.add('storeItem_category');
			item_category.classList.add('text-xs');
			item_category.classList.add('text-gray-500');
			item_category.classList.add('my-2');

			item_category.textContent = product.category;

			const item_name = document.createElement('h3');
			item_name.textContent = product.productName;
			item_name.classList.add('font-semibold');
			item_name.classList.add('mb-2');
			item_name.classList.add('text-sm');

			itemDesc.append(item_category, item_name);

			const item_buySection = document.createElement('div');
			item_buySection.classList.add('storeItem_buySection');
			item_buySection.classList.add('flex');
			item_buySection.classList.add('justify-between');
			item_buySection.classList.add('mb-4');
			item_buySection.classList.add('mx-4');

			const item_price = document.createElement('p');
			item_price.classList.add('storeItem_price');
			item_price.textContent = `$${product.price}`;
			item_price.classList.add('text-sm');

			const item_buyButton = document.createElement('button');
			item_buyButton.classList.add('storeItem_buyButton');
			item_buyButton.textContent = 'Buy Now';

			item_buySection.append(item_price, item_buyButton);

			itemWrapper.append(itemImg, itemDesc, item_buySection);

			$('.storeItems').append(itemWrapper);
		}
	}
});
