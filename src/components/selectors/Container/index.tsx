import React from 'react';
import {Resizer} from '../Resizer';
import {ContainerSettings} from './ContainerSettings';

export type Container = {
	background: Record<'r' | 'g' | 'b' | 'a', number>;
	color: Record<'r' | 'g' | 'b' | 'a', number>;
	flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch';
	justifyContent:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around';
	fillSpace: string;
	width: string;
	height: string;
	className: string;
	padding: string[];
	margin: string[];
	marginTop: number;
	marginLeft: number;
	marginBottom: number;
	marginRight: number;
	shadow: number;
	children: React.ReactNode;
	radius: number;
	float: string | null;
	id?: string;
};

const defaultProps = {
	flexDirection: '',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	fillSpace: 'no',
	padding: ['0', '0', '0', '0'],
	margin: ['0', '0', '0', '0'],
	shadow: 0,
	radius: 0,
	width: '100%',
	height: 'max-content',
	className: 'controled-width container-tag',
};

export const Container = (props: Partial<Container>) => {
	const {
		flexDirection,
		alignItems,
		justifyContent,
		fillSpace,
		background,
		color,
		padding,
		margin,
		shadow,
		radius,
		className,
		children,
		id,
	} = {
		...defaultProps,
		...props,
	};

	return (
		<Resizer
			propKey={{width: 'width', height: 'height'}}
			className={className}
			id={id}
			style={{
				justifyContent,
				minHeight: 'max-content',
				maxHeight: '100%',
				flexDirection: flexDirection,
				alignItems: alignItems,
				background: `rgba(${Object.values(background ? background : {})})`,
				color: `rgba(${Object.values(color ? color : {})})`,
				padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
				margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
				boxShadow:
					shadow === 0
						? 'none'
						: `0px 4px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,

				borderRadius: `${radius}px`,
				flexGrow: fillSpace === 'yes' ? 1 : 'unset',
				display: 'flex',
				maxWidth: '100%',
				minWidth: '20%',
			}}>
			{children}
		</Resizer>
	);
};

Container.craft = {
	displayName: 'Container',
	props: defaultProps,
	rules: {
		canDrag: () => true,
	},
	related: {
		settings: ContainerSettings,
	},
};
