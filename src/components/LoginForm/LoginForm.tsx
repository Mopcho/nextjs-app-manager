"use client";
import { signin } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "../Card/Card";
import { Button } from "../Buttons/Button";
import Input from "../Input/Input";
import {validateEmail, validateFirstName, validateLastName, validatePassword} from '@/lib/validations'
import {getErrorMessage} from '@/lib/utils';
import { AlertTriangle } from "react-feather";

const initial = { email: "", password: "", firstName: "", lastName: "" };
const initialTouched = { email: false, password: false, firstName: false, lastName: false };

export default function LoginForm() {
  const [formState, setFormState] = useState({ ...initial });

  type FormState = typeof formState;
  type ErrorState = Partial<Record<keyof FormState, string>>;

  const [formErrors, setFormErrors] = useState<ErrorState>({...initial});
  const [touched, setTouched] = useState(initialTouched);
  const [apiError, setApiError] = useState("");

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formErrors.email || formErrors.firstName || formErrors.lastName || formErrors.password) {
        return;
      }

      try {
        await signin(formState);
        router.replace("/home");
      } catch (e: unknown) {
        const errorWithMessage = getErrorMessage(e);
        setApiError(errorWithMessage);
      } finally {
        setFormState({ ...initial });
      }
    },
    [formState, router]
  );

  const validate = (values: FormState) => {
    let errors: ErrorState = {};

    const firstNameError = validateFirstName(values.firstName);
    if (firstNameError) {
      errors.firstName = firstNameError;
    }

    const lastNameError = validateLastName(values.lastName);
    if (lastNameError) {
      errors.lastName = lastNameError;
    }

    const emailError = validateEmail(values.email);
    if (emailError) {
      errors.email = emailError;
    }

    const passwordError = validatePassword(values.password);
    if (passwordError) {
      errors.password = passwordError;
    }

    return errors;
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    const name = ev.currentTarget.name;

    setFormState((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      return updatedValues;
    });
  }

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [ev.currentTarget.name]: true });
  };

  useEffect(() => {
    if (apiError) {
      setTimeout(() => {
        setApiError('');
      }, 5000);
    }
  }, [apiError]);

  return (
    <Card className="">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">Welcome Back</h2>
          <p className="tex-lg text-black/25">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-8">
            <label htmlFor="email" className="block text-lg mb-4 ml-2 text-black/50">Email</label>
            <Input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="username"
              aria-required
            />
            {touched.email ? <span className="text-red-500 max-w-[99%] block">{formErrors.email}</span> : null}
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg mb-4 ml-2 text-black/50">Password</label>
            <Input
              value={formState.password}
              required
              type="password"
              name="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete='current-password'
              aria-required
            />
            {touched.password ? <span className="text-red-500 max-w-[99%] block">{formErrors.password}</span> : null}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href="/register"
                  className="text-blue-600 font-bold"
                >
                  Don&apos;t have an account?
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                Sign In
              </Button>
            </div>
          </div>
          {apiError ? (<div className="flex justify-center items-center w-full p-5 slide-from-left">
            <span className="border-2 border-black text-white bg-red-500 rounded-lg w-full text-center p-3 flex justify-center items-center gap-3"><AlertTriangle />{apiError}</span>
          </div>) : null}
        </form>
      </div>
    </Card>
  );
}