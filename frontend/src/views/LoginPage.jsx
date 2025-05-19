import LoginForm from "../components/LoginForm";
import CustomerTopBar from "../layout/customerTopbar";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <CustomerTopBar />
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
