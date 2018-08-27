import React from 'react'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import FooterComponent from '../components/global/FooterComponent'
import requireAuth from '../utils/requireAuth'
import {
	App,
	LoginContainer,
	RegistrationContainer,
	ConfirmContainer,
	ForgotContainer,
	ResetContainer,
	HomeContainer,
	HeaderContainer,
	ProfileContainer,
	NotFoundPageContainer
} from '../containers'

const Root = ({ store, history }) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<div className="container-fluid containerFluid">
					<App />
					<HeaderContainer />
					<Switch>
						<Route exact path="/" component={HomeContainer} />
						<Route path="/login/" component={LoginContainer} />
						<Route path="/registration/" component={RegistrationContainer} />
						<Route path="/confirm/:token/" component={ConfirmContainer} exact />
						<Route path="/forgot-password/" component={ForgotContainer} exact />
						<Route path="/forgot-password/:token/" component={ResetContainer} exact />
						<Route path="/users/profile/" component={requireAuth(ProfileContainer)} exact />
						<Route component={NotFoundPageContainer} />
					</Switch>
				</div>
				<FooterComponent />
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root
