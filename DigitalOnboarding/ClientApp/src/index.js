//import libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import registerServiceWorker from './registerServiceWorker';

//import layout
import Content from "./pages/layout/content";
import Footer from "./pages/layout/footer";

//import theme
import theme from "./styles/themes/ti8mTheme";

//entry point
//import "./App";

//automatically created by .NET Boilerplate, dunno why
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
	<React.Fragment>
		<CssBaseline />
		<MuiThemeProvider theme={theme}>
			<BrowserRouter basename={baseUrl}>
				<Content />
				<Footer />
			</BrowserRouter>
		</MuiThemeProvider>
	</React.Fragment>,
	document.getElementById("root")
);

//ToDo: needs to be checked if it can be removed, project was created by .NET Boilerplate, which uses create react app
//It would be nice to create a project without create react app, since it creates an overhead and hides a lot of logic
//bootstrap libs are still part of the project and need to be removed along with create react app
registerServiceWorker();
