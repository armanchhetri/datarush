import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../utils/api";

interface LocationState {
  from: Location;
}

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const location = useLocation();

  const { from: redirectLocation }: any = location.state || {
    from: { pathname: "/" },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation<any, AxiosError, HTMLFormElement>(
    ["login"],
    signIn,
    {
      onError: (error) => {
        let message = error.message;
        if (error?.response?.status === 401)
          message = error?.response?.data.detail;
        enqueueSnackbar(message, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users", "me"]);
        navigate(redirectLocation);
      },
    }
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(e.currentTarget);
  };

  return (
    <div>
      <div className="rounded-md shadow-sm p-4 my-4 bg-white">
        <div className="py-6">
          <h2 className="text-4xl font-bold text-[#1174af]">Log In</h2>
        </div>
        <hr />
        <div className="py-8">
          <form
            className="max-w-[450px] mx-auto border rounded-md"
            onSubmit={handleFormSubmit}
          >
            <div className="p-4">
              <div className="py-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="username"
                  id="username"
                  autoComplete="email"
                  autoFocus
                  required
                  className="mt-1 focus:ring-[#1174af]-500 focus:border-[#1174af]-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="py-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 focus:ring-[#1174af]-500 focus:border-[#1174af]-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="pt-4 pb-6 px-4 bg-gray-50">
              <button
                id="login-submit"
                type="submit"
                className="btn bg-[#1174af] text-white"
                disabled={mutation.isLoading}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
