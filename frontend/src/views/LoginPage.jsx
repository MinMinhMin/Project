import LoginForm from "../components/LoginForm";
import CustomerTopBar from "../layout/customerTopbar";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <CustomerTopBar />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
