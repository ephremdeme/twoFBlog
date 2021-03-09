import React, {useEffect, useRef, useCallback} from 'react';
import {useNode, useEditor} from '@craftjs/core';
import ReactDOM from 'react-dom';
import {ROOT_NODE} from '@craftjs/utils';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import {ArrowUpward, Delete, MoveToInbox} from '@material-ui/icons';
import './RenderNode.css';

const RenderNode = ({render}: any) => {
	const {actions, query, selected, connectors} = useEditor((state, query) => {
		let selected;

		const currentNodeId = state.events.selected;

		if (currentNodeId) {
			selected = {
				id: currentNodeId,
				name: state.nodes[currentNodeId].data.name,
				settings:
					state.nodes[currentNodeId].related &&
					state.nodes[currentNodeId].related.settings,
				isDeletable: query.node(currentNodeId).isDeletable(),
			};
		}

		return {
			selected,
		};
	});

	const {
		id,
		isActive,
		isHover,
		dom,
		name,
		moveable,
		deletable,
		connectors: {drag},
		parent,
	} = useNode((node) => ({
		isActive: node.events.selected,
		isHover: node.events.hovered,
		dom: node.dom,
		name: node.data.custom.displayName || node.data.displayName,
		moveable: query.node(node.id).isDraggable(),
		deletable: query.node(node.id).isDeletable(),
		parent: node.data.parent,
		props: node.data.props,
	}));

	const currentRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		if (dom) {
			if (isActive || isHover) dom.classList.add('component-selected');
			else dom.classList.remove('component-selected');
		}
	}, [dom, isActive, isHover]);

	const getPos = useCallback((dom: HTMLElement | null) => {
		const {top, left, bottom} = dom
			? dom.getBoundingClientRect()
			: {top: 0, left: 0, bottom: 0};
		return {
			top: `${top > 0 ? top : bottom}px`,
			left: `${left}px`,
		};
	}, []);

	const scroll = useCallback(() => {
		const {current: currentDOM} = currentRef;

		if (!currentDOM) return;
		const {top, left} = getPos(dom);
		currentDOM.style.top = top;
		currentDOM.style.left = left;
	}, [dom]);

	useEffect(() => {
		const renderer = document.querySelector('.craftjs-renderer');
		if (renderer) renderer.addEventListener('scroll', scroll);

		return () => {
			if (renderer) renderer.removeEventListener('scroll', scroll);
		};
	}, [scroll]);

	return (
		<>
			{isActive || isHover
				? ReactDOM.createPortal(
						<div
							ref={currentRef}
							className="indicator"
							style={{
								left: getPos(dom).left,
								top: getPos(dom).top,
								zIndex: 9999,
							}}>
							{moveable ? (
								<button className="btn btn-move" ref={drag}>
									<ControlCameraIcon />
								</button>
							) : null}
							{id !== ROOT_NODE && (
								<button
									className="btn btn-cursor"
									onClick={() => {
										actions.selectNode(parent);
									}}>
									<ArrowUpward />
								</button>
							)}

							{isActive &&
								selected &&
								selected.settings &&
								React.createElement(selected.settings)}

							{deletable ? (
								<button
									className="btn-cursor"
									onMouseDown={(e: React.MouseEvent) => {
										e.stopPropagation();
										actions.delete(id);
									}}>
									<Delete />
								</button>
							) : null}
						</div>,
						document.body
				  )
				: null}
			{render}
		</>
	);
};

export default RenderNode;
