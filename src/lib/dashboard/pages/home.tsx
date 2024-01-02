import { CreateProjectModal } from "../components/ProjectCreateForm"

const HomePage = () => {
    return (
        <div className="w-full pt-10 px-20">
            <h1 className="font-medium text-3xl text-primary">Projects</h1>

            <div className="mt-5">
                <CreateProjectModal />
            </div>
        </div>
    )
}

export default HomePage