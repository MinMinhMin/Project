import LoginForm from "../components/LoginForm";

const LoginPage = ({ setUsername }) => {
  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <LoginForm setUsername={setUsername} />
    </div>
  );
};

export default LoginPage;
