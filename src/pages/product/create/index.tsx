import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Container} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '90%',
      margin: 'auto',
			minHeight: '100vh',
		},
		form: {},
		button: {
			marginTop: theme.spacing(1),
			marginRight: theme.spacing(1),
		},
		actionsContainer: {
			marginBottom: theme.spacing(2),
		},
		resetContainer: {
			padding: theme.spacing(3),
		},
	})
);

function getSteps() {
	return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return {
				text: `Product Info`,
				form: <h1>Prodcut Ingo</h1>,
			};
		case 1:
			return {
				text:
					'An ad group contains one or more ads which target a shared set of keywords.',
				form: <h1>some form here to desply</h1>,
			};
		case 2:
			return {
				text: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
				form: <h1>some form here to desply</h1>,
			};
		default:
			return {
				text: 'Unknown step',
				form: <h1>Some form here</h1>,
			};
	}
}

const CreateProduct = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
      <h2>Add New Product</h2>
			<Container>
				<Stepper
					activeStep={activeStep}
					orientation="vertical"
					className={classes.form}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								<Typography>{getStepContent(index).text}</Typography>
								{getStepContent(index).form}
								<div className={classes.actionsContainer}>
									<div>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											className={classes.button}>
											Back
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}>
											{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
										</Button>
									</div>
								</div>
							</StepContent>
						</Step>
					))}
				</Stepper>
			</Container>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button onClick={handleReset} className={classes.button}>
						Reset
					</Button>
				</Paper>
			)}
		</div>
	);
};

export default CreateProduct;
