import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <div className="not-found">
      <h1>Page Not Found!!!</h1>
      <div>
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
};

export default NotFound;
