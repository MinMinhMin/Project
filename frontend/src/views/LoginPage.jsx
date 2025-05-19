import LoginForm from "../components/LoginForm";
import CustomerTopBar from "../layout/customerTopbar"
import "../styles/LoginPage.css"

const LoginPage = ({ setUsername }) => {
  return (
    <div className="login-page">
      <CustomerTopBar />
      <LoginForm setUsername={setUsername} />
    </div>
  );
};

export default LoginPage;
