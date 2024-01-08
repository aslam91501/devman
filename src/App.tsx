import { NextUIProvider } from "@nextui-org/react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from "./lib/auth/pages/login";
import HomePage from "./lib/dashboard/pages/home";
import Layout from "./lib/shared/layout";
import FeatureListPage from "./lib/project/pages/feature-list";
import ProjectLayout from "./lib/project/layout";
import ProjectIndexPage from "./lib/project/pages/project-index";
import SubFeatureLayout from "./lib/project/layout/subfeature";

function App() {
	const navigate = useNavigate();

	return (
		<>
		<NextUIProvider navigate={navigate}>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/p/:pid" element={<ProjectLayout />}>
						<Route index element={<ProjectIndexPage />} />
						<Route path="f" element={<FeatureListPage />} />
						<Route path="f/:fid" element={<FeatureListPage />}>
							<Route path="sf/:sfid" element={<SubFeatureLayout />} />
						</Route>
					</Route>

					<Route path="/home" element={<HomePage />} />

				</Route>
				<Route>
					<Route path="/login" element={<LoginPage />} />
				</Route>
			</Routes>
			<ToastContainer />
		</NextUIProvider>
		</>
		)
	}
	
	export default App
