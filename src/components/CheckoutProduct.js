import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

const CheckoutProduct = ({ item }) => {
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		dispatch(addToBasket(item));
	};

	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id: item.id }));
	};
	return (
		<div className='grid grid-cols-5'>
			<Image src={item.image} height={200} width={200} objectFit='contain' />

			{/* middle section */}

			<div className='col-span-3 mx-5'>
				<p>{item.title}</p>

				{/* stars */}
				<div className='flex'>
					{Array(item.rating)
						.fill()
						.map((_, idx) => {
							return <StarIcon key={idx} className='h-5 text-yellow-500' />;
						})}
				</div>

				{/* description */}
				<p className='text-xs my-2 line-clamp-3'>{item.description}</p>

				<Currency quantity={item.price} currency='GBP' />

				{item.hasPrime && (
					<div className='flex items-center space-x-2'>
						<img
							loading='lazy'
							className='w-12'
							src='https://links.papareact.com/fdw'
							alt=''
						/>
						<p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
					</div>
				)}
			</div>

			{/* Right */}
			<div className='flex flex-col space-y-2 my-auto justify-self-end'>
				<button className='button' onClick={addItemToBasket}>
					Add to Basket
				</button>
				<button className='button' onClick={removeItemFromBasket}>
					Remove from Basket
				</button>

				<div className='text-center py-2 border'>{item.count}</div>
			</div>
		</div>
	);
};

export default CheckoutProduct;
