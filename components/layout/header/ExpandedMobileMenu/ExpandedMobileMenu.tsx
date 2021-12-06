import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { UIContext } from '@/hooks/context/UIContext';
import Logo from '@/components/layout/header/Logo';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type ExpandedMobileMenuProps = {
	anchor: Anchor,
};

const ExpandedMobileMenu = ({ anchor }: ExpandedMobileMenuProps) => {
	const {
		isMobileMenuOpen,
		dispatch,
		cartItems
	} = React.useContext(UIContext);
	
	const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
		console.log('toggle');
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			console.log('no toggle');
			return;
		}

		dispatch({ type: 'TOGGLE_MOBILE_MENU' });
	};
	
	const list = () => (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			className='mt-4'
		>
			<List className='bg-white'>
				<Link href='/'>
					<a>
						<ListItem button key='Home'>
							<ListItemText primary='Home' />
						</ListItem>
					</a>
				</Link>
				<ListItem button key='Shop by Category'>
					<ListItemText primary='Shop by Category' />
				</ListItem>
				<ListItem button key='Orders'>
					<ListItemText primary='Orders' />
				</ListItem>
				<ListItem button key='Ecomoja Deals'>
					<ListItemText primary='Ecomoja Deals' />
				</ListItem>
				<ListItem button key='My account'>
					<ListItemText primary='My Account' />
				</ListItem>
			</List>
			<Divider />
			<List className='bg-white mt-6'>
				<Link href='/cart'>
					<a>
						<ListItem button key='Cart'>
							<ListItemIcon>
								<ShoppingCartIcon className='text-secondary' />
							</ListItemIcon>
							<ListItemText primary='Cart' />
							{`${cartItems.length} item(s)`}
						</ListItem>
					</a>
				</Link>
				<Link href='/wishlist'>
					<a>
						<ListItem button key='List'>
							<ListItemIcon>
								<FavoriteIcon className='text-red-500' />
							</ListItemIcon>
							<ListItemText primary='List' />
						</ListItem>
					</a>
				</Link>
			</List>
			<Divider />
		</Box>
	);

	return <Drawer
		anchor={anchor}
		open={isMobileMenuOpen}
		onClose={(event) => toggleDrawer(event as React.MouseEvent)}
	>
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={(event) => toggleDrawer(event)}
			onKeyDown={(event) => toggleDrawer(event)}
			className='bg-gray-200 h-full'
		>
			<Box className='bg-white py-1'>
				<Link href='/'>
					<a className='flex items-center'>
						<Logo width={150} height={40} />
					</a>
				</Link>
			</Box>
			<Divider />
			{list()}
		</Box>
	</Drawer>;
};

export default ExpandedMobileMenu;