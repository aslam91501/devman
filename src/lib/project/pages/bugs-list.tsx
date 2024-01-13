import CustomTitle from "../../shared/components/CustomTitle"
import { CreateBugModal } from "../components/BugCreateForm"
import { BugsTable } from "../components/BugsTable"

const BugsIndexPage = () => {
    return <>
    <div className="h-full w-full pt-14 px-20">
        <h1 className="text-2xl font-medium">Bugs</h1>

        <div className="mt-4">
            <CreateBugModal />
        </div>

        <div className="mt-4">
            <BugsTable />
        </div>
    </div>
    </>
}

export default BugsIndexPage