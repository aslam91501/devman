import { AllItemsTable } from "../components/AllItemsTable";

const AllItemsListPage = () => {
    return <>
    <div className="h-full w-full pt-14 px-20">
        <h1 className="text-2xl font-medium">All Items</h1>

        <div className="mt-4">
            <AllItemsTable />
        </div>
    </div>
    </>
}

export default AllItemsListPage;