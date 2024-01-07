import getProjetById from "../hooks/getProjectById"

const ProjectIndexPage = () => {
    const { project, loading, error } = getProjetById();

    if (loading) return <>Loading...</>
    if (error) return <>Something went wrong</>

    return <>
        <div className="p-10">
            <h1 className="font-medium text-xl">{project.title}</h1>
            <p className="mt-3">{project.description}</p>
        </div>
    </>
}

export default ProjectIndexPage