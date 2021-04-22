import React from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Markup } from 'interweave';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: any) => ({
	root: {
		marginTop: 10,
		width: '75%',
		margin: '0 auto',
	}
}));

const displayContent = (blog: any) => {

	for (let i = 0; i <= blog.length; i++) {
		if (blog[i].type === "MembersOnly") {
			console.log(blog[i].type)
			return onlyMembers();
		} else {
			switch (blog[i].type) {
				case "Embed":
					return (
						<iframe
							width="90%"
							height="400"
							src={blog[i].data.embed}
							style={{ margin: '0 auto' }}
						/>
					)
				case "List":
					if (blog[i].data.style === "ordered") {
						return (
							<ol>
								{
									blog[i].data.items.map((item: any) => {
										return <li style={{ padding: 5 }}><Markup content={item} /></li>
									})
								}
							</ol>
						)
					} else {
						return (
							<ul>
								{
									blog[i].data.items.map((item: any, i: number) => {
										return <li key={i} style={{ padding: 5 }}><Markup content={item} /></li>
									})
								}
							</ul>
						)
					}
				case "Delimiter":
					return <Typography variant="h3" style={{ alignSelf: 'center' }}>* * *</Typography>
				case "Header":
					return <Typography variant="h4"><Markup content={blog[i].data.text} /></Typography>
				case "Image":
					return <img
						src={blog[i].data.file.url}
						width="100%"
						style={{ margin: '0 auto', padding: 5 }}
					/>
				default:
					return <Markup content={blog[i].data.text} />
			}
		}
	}
}

const onlyMembers = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="center"
		>
			<p
				style={{
					fontWeight: 'bolder',
					fontSize: 20,
					fontFamily: 'monospace',
					color: '#534F4F'
				}}
			>
				YOU NEED TO LOGIN TO SEE MORE
            </p>
			<Button
				variant="contained"
				color="primary"
			>
				Login
            </Button>
		</Grid>
	)
}

const RenderContent = (props: any) => {
	const classes = useStyles();
	const [blog, setBlog] = useState<any[]>([]);

	useEffect(() => {
		console.log(props.blog)
		setBlog(props.blog.blocks);
	}, []);

	return (
		<Grid style={{ marginBottom: '10%' }}>
			<>
				{
					blog.length ? <Grid
						container
						direction="column"
						className={classes.root}
					>
						<>
							{displayContent(blog)}
						</>
					</Grid> : null
				}
			</>
		</Grid>
	)
};

export default RenderContent;