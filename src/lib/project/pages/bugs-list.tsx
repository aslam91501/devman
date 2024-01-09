import { CreateBugModal } from "../components/BugCreateForm"

const BugsIndexPage = () => {
    return <>
    <div className="h-full w-full pt-14 px-20">
        <h1 className="text-2xl font-medium">Bugs</h1>

        <div className="mt-4">
            <CreateBugModal />
        </div>
    </div>
    </>
}

export default BugsIndexPage