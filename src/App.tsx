import { NextUIProvider } from "@nextui-org/react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from "./lib/auth/pages/login";
import HomePage from "./lib/dashboard/pages/home";
import Layout from "./lib/shared/layout";
import FeatureListPage from "./lib/project/pages/feature-list";
import ProjectLayout from "./lib/project/layout";
import ProjectIndexPage from "./lib/project/pages/project-index";
import SubFeatureLayout from "./lib/project/layout/subfeature";
import BugsIndexPage from "./lib/project/pages/bugs-list";
import BugDetailPage from "./lib/project/pages/bug-detail";
import AllItemsListPage from "./lib/project/pages/items-list";

function App() {
	const navigate = useNavigate();

	return (
		<>
		<NextUIProvider navigate={navigate}>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/p/:pid" element={<ProjectLayout />}>
						<Route index element={<ProjectIndexPage />} />
						<Route path="s" element={<ProjectIndexPage />} />
						<Route path="b" element={<BugsIndexPage />} />
						<Route path="b/:bid" element={<BugDetailPage />} />
						<Route path="f" element={<FeatureListPage />} />
						<Route path="f/:fid" element={<FeatureListPage />}>
							<Route path="sf/:sfid" element={<SubFeatureLayout />} />
						</Route>
						<Route path="l" element={<AllItemsListPage />} />
					
					</Route>

					<Route path="/home" element={<HomePage />} />

				</Route>
				<Route>
					<Route path="/login" element={<LoginPage />} />
				</Route>

				<Route path="/" element={<Navigate to={'/home'} />} />
			</Routes>
			<ToastContainer />
		</NextUIProvider>
		</>
		)
	}
	
	export default App
