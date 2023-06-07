"use client";
import { createNewProject } from "@/lib/api";
import { useState } from "react";
import Modal from "react-modal";
import { Button } from "../Buttons/Button";
import Input from "../Input/Input";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";
import { useToast } from "../ToastContainer/ToastContainer";

Modal.setAppElement("#modal");

const NewProject = () => {
  const {triggerToast} = useToast();
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await createNewProject(name);
      closeModal();
      triggerToast('Created successfully', 5000, 'CheckCircle');
      router.refresh();
    } catch(err) {
      closeModal();
      const errorMessage = getErrorMessage(err);
      setApiError(errorMessage);
      triggerToast(errorMessage, 5000, 'AlertTriangle');
    }
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;