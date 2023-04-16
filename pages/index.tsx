import * as React from 'react';
import Head from 'next/head';
import Catalogue from '@/components/layout/Catalogue';
import {UIContext} from '@/hooks/context/UIContext';
import {Banner} from '@/components/layout';
import FeaturedPartners from '@/components/core/FeaturedPartners';
import {Product} from '@/types/AppTypes';

const slideImages: { id: string; image: string }[] = [
	{
		id: 'home-page1',
		image: '/assets/HomePage_1.png',
	},
	{
		id: 'home-pag2',
		image: '/assets/HomePage_2.png',
	},
	{
		id: 'home-page3',
		image:
			'https://images.unsplash.com/photo-1564419320408-38e24e038739?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
	},
	{
		id: 'home-page4',
		image:
			'https://images.pexels.com/photos/4792666/pexels-photo-4792666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	},
];

export default function Home() {
	const {
		dispatch,
		layoutProp,
	} = React.useContext(UIContext);

	React.useEffect(
		() => {
			dispatch({
				type: 'SET_SHOP_BY_CATEGORY',
				payload: true,
			});

			if (layoutProp != null && !(layoutProp.showHeader || layoutProp.showFooter)) {
				dispatch({
					type: 'UPDATE_LAYOUT',
					payload: {
						...layoutProp,
						showHeader: true,
						showFooter: true,
					},
				});
			}
		},
		[dispatch],
	);

	const [products, setProducts] = React.useState<Product[]>([]);

	React.useEffect(
		() => {
			fetch('http://localhost:1337/api/products?populate=*')
				.then((res) => res.json())
				.then((resBody) => {

					const generatedProducts: Product[] = [];

					resBody.data.forEach((productItem) => {
						generatedProducts.push({
							id: productItem.id,
							name: productItem.attributes.name,
							description: productItem.attributes.description,
							image: productItem.attributes.images.data[0].attributes.formats.thumbnail.url,
							currentPrice: productItem.attributes.price,
							oldPrice: productItem.attributes.oldPrice,
							rating: 4,
							numberOfVotes: 90,
							categories: ['Gardening'],
							vendor: 'CMK',
							isInStock: productItem.attributes.isInStock,
							getCustomTypeName: () => 'Product',
						});

						setProducts(generatedProducts);
					})
				})
				.catch(error => console.error(error));
		},
		[]);

	return (
		<>
			<Head>
				<title>Ecomoja | Shopping | Home</title>
			</Head>
			<Banner slides={slideImages}/>
			<Catalogue catalogue={products} title="Groceries"/>
			<FeaturedPartners/>
		</>
	);
}
