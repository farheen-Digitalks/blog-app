const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
        />

        <button className="bg-black text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;