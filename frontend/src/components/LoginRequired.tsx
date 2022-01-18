import { Link, useLocation } from "react-router-dom";

const LoginRequired = () => {
  const location = useLocation();
  return (
    <div className="py-2">
      <div className="py-8 text-center">
        <div className="p-8 bg-slate-100 rounded-full w-min mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-16 h-16 text-slate-600"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          </svg>
        </div>
        <p className="mt-6">This is a protected route.</p>
        <p>
          You need to{" "}
          <Link
            className="text-blue-600"
            to="/login"
            state={{ from: location }}
          >
            Log In
          </Link>{" "}
          to continue.
        </p>
      </div>
    </div>
  );
};

export default LoginRequired;
