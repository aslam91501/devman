import CustomTitle from "../../shared/components/CustomTitle"
import { CreateProjectModal } from "../components/ProjectCreateForm"
import { ProjectsTable } from "../components/ProjectsTable"

const HomePage = () => {
    return <>
        <CustomTitle title="Projects" />
        <div className="w-full pt-10 px-20">
            <h1 className="font-medium text-3xl text-primary">Projects</h1>

            <div className="mt-5">
                <CreateProjectModal />
            </div>

            <div className="mt-5">
                <ProjectsTable />
            </div>
        </div>
    </>
}

export default HomePage