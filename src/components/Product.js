import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/outline';

import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectItems } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({
	product: { id, title, price, description, category, image },
}) => {
	const [rating] = useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
	);

	const [hasPrime] = useState(Math.random() < 0.5);

	const dispatch = useDispatch();

	const cartItem = useSelector(selectItems).filter((item) => item.id === id);

	const addItemToBasket = () => {
		const product = {
			id,
			title,
			price,
			description,
			category,
			image,
			hasPrime,
			rating,
		};

		dispatch(addToBasket(product));
	};

	return (
		<div className='relative flex flex-col m-5 bg-white z-30 p-10'>
			<p className='absolute top-2 left-2 text-xs italic text-gray-400'>
				{category}
			</p>

			{cartItem.length > 0 && (
				<span className='absolute top-3 right-3 flex items-center py-2 px-3 bg-yellow-400 rounded-md'>
					<ShoppingCartIcon className='w-6 mr-2' />
					{cartItem[0].count}
				</span>
			)}

			<Image src={image} height={200} width={200} objectFit='contain' />

			<h4 className='my-3'>{title}</h4>

			<div className='flex'>
				{Array(rating)
					.fill()
					.map((_, idx) => (
						<StarIcon key={idx} className='h-5 text-yellow-500' />
					))}
			</div>

			<p className='text-xs my-2 line-clamp-2'>{description}</p>

			<div className='mb-5'>
				<Currency quantity={price} currency='GBP' />
			</div>

			{hasPrime && (
				<div className='flex items-center space-x-2 -mt-5'>
					<img
						src='https://links.papareact.com/fdw'
						alt='prime logo'
						className='w-12'
					/>
					<p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
				</div>
			)}

			<button className='mt-auto button' onClick={addItemToBasket}>
				Add To Basket
			</button>
		</div>
	);
};

export default Product;
