import { useState } from "react";
import Container from "@/components/layouts/Container";
import { TextInput } from "@/components/layouts/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Forge, Forger, useForge } from "@/lib/forge";
import { useLoginMutation } from "@/services";
import { useNavigate } from "react-router-dom";
import { useSetToken, useSetUser } from "@/store/authSlice";
import { ApiResponseError } from "@/types";
import logoSvg from "@/assets/logo.svg";
import { useToastHandlers } from "@/hooks/useToaster";

/**
 * Login
 *
 * Pixel-accurate implementation of the Login page UI using the shared input components.
 * Wired to the Forge form library for state management and validation.
 *
 * @returns JSX.Element - The rendered Login page
 */
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setToken = useSetToken();
  const setUser = useSetUser();
  const toastHandlers = useToastHandlers();
  const loginMutation = useLoginMutation();

  /**
   * Login form data shape
   */
  type LoginForm = {
    email: string;
    password: string;
  };

  // Initialize Forge form control
  const { control } = useForge<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  /**
   * Handle form submission
   * @param data The complete and validated login form data
   */
  const onSubmit = async (data: LoginForm) => {
    try {
    const response = await  loginMutation.mutateAsync(data) 
      if (response?.status) {
        
        setToken(response.data.access);
        setUser({...response.data.user, organization:response?.data?.organization});
        navigate("/dashboard");
      }
    } catch (error) {
      const err = error as ApiResponseError

      console.log(err?.response?.data)
      toastHandlers.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container
      display="flex"
      direction="col"
      className="w-full h-full items-center justify-center pb-10"
    >
      {/* Zentrova Logo */}
      <div className="mb-6">
        <div className="text-center">
          <img
            src={logoSvg}
            alt="Zentrova Logo"
            className="h-20 contain mb-4"
          />
        </div>
      </div>

      <div className="w-full max-w-md bg-transparent">
        <h1 className="text-2xl font-bold text-secondary text-center">
          Login
        </h1>
        <p className="text-xs text-secondary text-center mt-1">
          Login to your Zentrova Account
        </p>

        <Forge control={control} onSubmit={onSubmit} className="mt-8 space-y-5">
          <Forger
            component={TextInput}
            name="email"
            label="Email Address"
            placeholder="example@company.com"
            rules={{ required: "Email address is required" }}
          />

          <Forger
            component={TextInput}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            endAdornment={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((p) => !p)}
                className="text-slate-600 hover:text-slate-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            rules={{ required: "Password is required" }}
          />

          <div className="flex justify-end">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl "
            isLoading={loginMutation.isPending}
          >
            Login
          </Button>
        </Forge>
      </div>
    </Container>
  );
};

export default Login;