"use client";
import { createNewProject, createNewTask } from "@/lib/api";
import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { Button } from "../Buttons/Button";
import Input from "../Input/Input";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";
import { useToast } from "../ToastContainer/ToastContainer";
import { validateDescription, validateStatus, validateTaskName } from "@/lib/validations";

interface Props {
  projectId: string;
}

Modal.setAppElement("#modal");

const initialFormData = {
    name: '',
    description: '',
    status: '',
}

const initialTouchedState = {
    name: false,
    description: false,
    status: false,
}

const NewProject: React.FC<Props> = ({projectId}) => {
  const {triggerToast} = useToast();
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [formData, setFormData] = useState(initialFormData);

  type FormState = typeof formData;
  type ErrorState = Partial<Record<keyof FormState, string>>;

  const [formErrors, setFormErrors] = useState<ErrorState>(initialFormData);
  const [touched, setTouched] = useState(initialTouchedState);

  const handleBLur = (ev: React.FocusEvent<HTMLInputElement>) => {
    setTouched({...touched, [ev.currentTarget.name]: true})
  }

  const validate = (values: FormState) => {
    let errors: ErrorState = {};

    const nameError = validateTaskName(values.name);
    errors.name = nameError;

    const descriptionError = validateDescription(values.description);
    errors.description = descriptionError;

    const statusError = validateStatus(values.status);
    errors.status = statusError;

    return errors;
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    const name = ev.currentTarget.name;

    setFormData((oldValues) => {
        const updatedValues = {...oldValues, [name]: value};

        const errors = validate(updatedValues);
        setFormErrors(errors);

        return updatedValues;
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const atLeastOneError = Object.values(formErrors).some(value => !!value);
    if (atLeastOneError) {
      triggerToast('You have errors in your form', 5000, 'AlertTriangle');
      return;
    }
    try {
      if (!projectId) {
        triggerToast('A client side error occurred, please refresh the page', 5000, 'AlertTriangle');
        return;
      }
      await createNewTask({...formData, projectId});
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
      <Button onClick={() => openModal()}>New Task</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6 text-center">New Project</h1>
        <form className="flex items-center gap-4 flex-col justify-center" onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="task name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBLur}
          />
          {touched.name && (<span className="text-red-500">{formErrors.name}</span>)}
          <Input
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBLur}
          />
          {touched.description && (<span className="text-red-500">{formErrors.description}</span>)}
          <Input
            name="status"
            placeholder="status"
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBLur}
          />
          {touched.status && (<span className="text-red-500">{formErrors.status}</span>)}
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;