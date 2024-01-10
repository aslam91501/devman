import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import getBugById from "../hooks/getBugById"
import useBugsMutation from "../hooks/bugsMutation";
import { useRef } from "react";
import { bugsPhotosUrl } from "../../shared/config/vars";
import useMultiModal from "../../shared/hooks/useMultiModal";
import { BugPhotoModal } from "../components/BugPhotoModal";
import { EditBugModal } from "../components/EditBugForm.tsx";
import { BugStatusModal } from "../components/BugStatusModal";
import { BugDeleteModal } from "../components/BugDeleteModal.tsx";

const BugDetailPage = () => {
    const { bug, error, loading  } = getBugById();
    const { managePhoto } = useBugsMutation({});

    const { isOpen: photoModalOpen, toggle: togglePhotoModal } = useMultiModal();
    const { isOpen: popverOpen, toggle: togglePopover } = useMultiModal();

    const { isOpen: editOpen, onClose: editOnClose, onOpen: editToggleOpen } = useDisclosure()
    const { isOpen: statusOpen, onClose: statusOnClose, onOpen: statusToggleOpen } = useDisclosure()
    const { isOpen: deleteOpen, onClose: deleteOnClose, onOpen: deleteToggleOpen } = useDisclosure()

    const fileUploadRef = useRef<HTMLInputElement>(null);


    if (loading) return <>Loading...</>;
    if (error) return <>Could not fetch data</>;

    return <>
    <div className="h-full w-full pt-14 px-20">
        <h1 className="text-2xl font-medium">{ bug.title }</h1>
        <p className="mt-2">{ bug.description }</p>
        

        <div className="flex flex-row gap-3 mt-5">
            <Button color="primary" className="w-fit"
                onClick={() => fileUploadRef.current?.click() }>
                    Upload Photo
            </Button>

            <Button color="default" className="w-fit"
                onClick={() => editToggleOpen() }>
                    Update Details
            </Button>

            <Button color="default" className="w-fit capitalize"
                onClick={() => statusToggleOpen() }>
                    Status: { bug.status }
            </Button>

            <Button color="danger" className="w-fit"
                onClick={() => deleteToggleOpen() }>
                    Delete
            </Button>
        </div>
       
        <EditBugModal data={bug} isOpen={editOpen} onClose={editOnClose}/>
        <BugStatusModal data={bug} isOpen={statusOpen} onClose={statusOnClose}  />
        <BugDeleteModal data={bug} isOpen={deleteOpen} onClose={deleteOnClose}  />

        <input type="file" accept="image/*" onChange={(e) => managePhoto({ id: bug.id,action: 'add', file: e.target.files![0] })} 
            className="hidden" ref={fileUploadRef} />

        <div className="mt-6 flex gap-2 flex-wrap">
        { bug.photos ? bug.photos?.map((photo, index) => {
            return <>
                <BugPhotoModal 
                    url={`${bugsPhotosUrl}/${bug.id}/${photo}`}
                    onClose={() => togglePhotoModal(index.toString())}
                    isOpen={photoModalOpen.get(index.toString()) ?? false}
                />
                <Popover placement="right" key={index} isOpen={popverOpen.get(index.toString())}>
                    <PopoverTrigger>
                        <img key={index} src={`${bugsPhotosUrl}/${bug.id}/${photo}`} 
                            className="h-48 hover:cursor-pointer"
                            onClick={() =>  togglePopover(index.toString())}
                            />
                    </PopoverTrigger>
                    <PopoverContent className="z-10">
                        <div className="px-3 py-3">
                            <div className="font-bold">Actions</div>
                            <Button color="default" className="mt-2"
                                onClick={() => { togglePhotoModal(index.toString()); togglePopover(index.toString())}}>
                                    View
                            </Button>
                            <Button color="danger" className="mt-2 ml-2"
                                onClick={() => managePhoto({ id: bug.id, action: 'remove', file: photo })}>Delete</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </>
        }) : <></>}
        </div>

    </div>
    </>
}

export default BugDetailPage