import HashLoader from "react-spinners/HashLoader";
import PropTypes from "prop-types";
import "./loading.css";

export default function Loading({ loading }) {
  return (
    <div id="loading">
      <HashLoader
        color="#b53dff"
        loading={loading}
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
