//import libs
import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Stepper from '@material-ui/core/Stepper';
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { ReactComponent as Logo } from "../../../images/blue.svg";

const styles = theme => ({
	flexContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	flexContainerContent: {
		width: 500,
		[theme.breakpoints.down(1280 + theme.spacing(12))]: {
			width: '100%'
		}
	},
	width670: {
		width: 670
	},	
	fixedStepper: {
		width: 500,
		marginLeft: 170 //Icon of content section

	},
	fixedContent: {
		display: 'flex',
		width: '100%',
		marginTop: 74,
		flexDirection: 'column',
		marginBottom: 50
	},
	layout: {
		width: 1280,
		marginLeft: theme.spacing(12),
		[theme.breakpoints.down(1280 + theme.spacing(12))]: {
			width: 'auto',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	mainLogo: {
		marginTop: 28,
		position: 'absolute',
		[theme.breakpoints.down(1280 + theme.spacing(12))]: {
			display: 'none'
		},
	}
});

const withStepper = (WrappedComponent) => {
	const WithStepper = ({ classes, props }) => {
		const stepProps = {};
		const labelProps = {};
		const [activeStep, setActiveStep] = useState(0);


		const handleNext = () => {
			setActiveStep(prevActiveStep => prevActiveStep + 1);
		}

		const setStep = (selectedStep) => {
			setActiveStep(selectedStep);
		}

		return (
			<div className={classes.layout}>
				<Logo className={classes.mainLogo} />
				<div className={classes.flexContainer}>
					<div className={classes.width670}>
						<Stepper activeStep={activeStep} className={classes.fixedStepper} >
							<Step key={1} {...stepProps}>
								<StepLabel {...labelProps}></StepLabel>
							</Step>
							<Step key={2} {...stepProps}>
								<StepLabel {...labelProps}></StepLabel>
							</Step>
							<Step key={3} {...stepProps}>
								<StepLabel {...labelProps}></StepLabel>
							</Step>
							<Step key={4} {...stepProps}>
								<StepLabel {...labelProps}></StepLabel>
							</Step>
							<Step key={5} {...stepProps}>
								<StepLabel {...labelProps}></StepLabel>
							</Step>
						</Stepper>
						<div className={classes.fixedContent}>
							<WrappedComponent nextStep={handleNext} currentStep={activeStep} setStep={setStep} />
						</div>
					</div>
				</div>
			</div>
		);
	}
	return withStyles(styles)(WithStepper);
}

export default withStepper;