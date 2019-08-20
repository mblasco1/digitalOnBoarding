import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
	},
	status: {
		danger: 'orange',
	},
	overrides: {
		MuiStepIcon: {
			root: {
				width: '1.5em',
				height: '1.5em',
				'&$active': {
					color: '#002650',
				},
				'&$completed': {
					color: '#8EC8C7',
				},
			},
			
		},
		MuiSvgIcon: {
			colorPrimary: {
				color: 'white'
			}
		},
		MuiInputLabel: {
			formControl: {
				transform: 'translate(0, 1.5px) scale(0.75)',
				transformOrigin: 'top left'
			}
		},
		MuiFab: {
			root: {
				height: 72,
				width: 72,
				marginTop: 40,
				backgroundImage: 'linear-gradient(180deg, #004D9F 0%, #0EC8C8 100%)',
				boxShadow: '0 0 16px 0 rgba(255, 255, 255, 0.2)'
			}
		},
		MuiMenuItem: {
			root: {
				opacity: 100
			}
		},
		MuiCircularProgress: {
			colorPrimary: {
				color: '#002650'
			}
		}
	},
	typography: {
		useNextVariants: true,
		fontFamily: 'Roboto',
		letterSpacing: 'normal',
		lineHeight: 1.3,
		h1: {
			fontSize: 40,
			fontWeight: 500
		},
		subtitle1: {
			opacity: 0.3,
			fontSize: 16
		}
	}
});
export default theme