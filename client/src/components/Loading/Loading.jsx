import PropTypes from "prop-types";
import "./loading.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ loading }) {
  return (
    <div id="loading">
      <ClipLoader
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
