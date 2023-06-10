'use client'

import { FormEvent, useState } from "react";
import { Button } from "../Buttons/Button";
import Modal from "react-modal";
import Input from "../Input/Input";
import { Trash } from "react-feather";
import { deleteProject } from "@/lib/api";
import { useToast } from "../ToastContainer/ToastContainer";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

interface Props {
    projectId: string;
    projectName: string;
}

const DeleteProject: React.FC<Props> = ({ projectId, projectName }) => {
    const [confirmation, setConfirmation] = useState('');
    const [formError, setFormError] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const {triggerToast} = useToast();
    const router = useRouter()

    const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (confirmation !== projectName) {
            setFormError('Confirmation text does not match the name');
            return;
        }

        try {
            await deleteProject({projectId});
            closeModal();
            triggerToast('Successfully deleted project', 5000, 'CheckCircle');
            router.replace('/home');
        } catch(err) {
            console.log()
            closeModal();
            const errorMessage = getErrorMessage(err);
            triggerToast(errorMessage, 5000, 'AlertTriangle');
            return;
        }
    }
    return (
        <div>
            <Button intent={'delete'} onClick={() => openModal()} className="flex gap-2">
                <Trash></Trash> Delete Project
            </Button>
            <Modal 
                onRequestClose={closeModal} 
                isOpen={modalIsOpen}         
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-3/4 bg-white rounded-xl p-8 flex flex-col items-center gap-3"
            >
                <h1 className="text-2xl">Delete Project</h1>
                <p>In orderto delete this project you need to confirm it by writing down the name of the project: &quot;{projectName}&quot;</p>
                <form onSubmit={onSubmit} className="flex flex-col items-center gap-3">
                    <Input value={confirmation} onChange={(ev) => setConfirmation(ev.currentTarget.value)}></Input>
                    {formError && (<span className="text-red-400">{formError}</span>)}
                    <Button intent={'delete'} className="flex items-center gap-2">
                        <Trash></Trash> Delete Project
                    </Button>
                </form> 
            </Modal>
        </div>
);
};

export default DeleteProject;