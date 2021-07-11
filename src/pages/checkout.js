import Header from '../components/Header';
import CheckoutProduct from '../components/CheckoutProduct';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {
	selectItems,
	selectTotalCount,
	selectTotalPrice,
} from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';

const Checkout = () => {
	const items = useSelector(selectItems);
	const totalItemsCount = useSelector(selectTotalCount);
	const totalItemsPrice = useSelector(selectTotalPrice);
	const [session] = useSession();
	return (
		<div className='bg-gray-100'>
			<Header />

			<main className='lg:flex max-w-screen-2xl mx-auto'>
				{/* left */}
				<div className='flex-grow m-5 shadow-sm'>
					<Image
						src='https://links.papareact.com/ikj'
						width={1020}
						height={250}
						objectFit='contain'
					/>

					{/*  */}
					<div className='flex flex-col p-5 space-y-10 bg-white'>
						<h2 className='text-3xl border-b pb-4'>
							{items.length === 0 ? 'Your Basket is Empty' : 'Shopping Basket'}
						</h2>

						{items.map((item, idx) => (
							<CheckoutProduct key={item.id} item={item} />
						))}
					</div>
				</div>

				{/* right */}
				<div className='flex flex-col bg-white p-10 shadow-md'>
					{items.length > 0 && (
						<>
							<h2 className='whitespace-nowrap'>
								Sub Total ({totalItemsCount} items):{' '}
								<span className='font-bold'>
									<Currency quantity={totalItemsPrice} currency='GBP' />
								</span>
							</h2>

							<button
								disabled={!session}
								className={`button mt-2 ${
									!session &&
									'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
								}`}
							>
								{!session ? 'Sign in to checkout' : 'Proceed to checkout'}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
};

export default Checkout;
