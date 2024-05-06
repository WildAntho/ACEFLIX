import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import aceflixLogo from "../../assets/images/aceflixLogo.png";
import "./Footer.css";

export default function Footer({
  setHomeActive,
  setMovieActive,
  setSerieActive,
}) {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
    setHomeActive(true);
    setMovieActive(false);
    setSerieActive(false);
  };

  const handleSeries = () => {
    navigate("/");
    setHomeActive(false);
    setMovieActive(false);
    setSerieActive(true);
    navigate("/filter/tv");
  };

  const handleMovies = () => {
    navigate("/");
    setHomeActive(false);
    setMovieActive(true);
    setSerieActive(false);
    navigate("/filter/movie");
  };

  return (
    <section id="footer">
      <div className="top-footer-wrapper">
        <div className="navigation-wrapper">
          <h1 className="navigation-title">Navigation</h1>
          <a href="#haut-page" aria-label="anker">
            <p
              className="navigation-link"
              role="presentation"
              onClick={handleHome}
            >
              Home
            </p>
          </a>
          <a href="#haut-page" aria-label="anker">
            <p
              className="navigation-link"
              role="presentation"
              onClick={handleMovies}
            >
              Movies
            </p>
          </a>
          <a href="#haut-page" aria-label="anker">
            <p
              className="navigation-link"
              role="presentation"
              onClick={handleSeries}
            >
              Series
            </p>
          </a>
        </div>
        <div className="navigation-wrapper">
          <h1 className="navigation-title">About</h1>
          <div className="about-wrapper">
            <a
              href="https://www.linkedin.com/in/anthony-dufrenot-64275510a/"
              target="blank"
              aria-label="link"
            >
              <FaLinkedinIn id="linkedin" className="logo-link" />
            </a>
            <a
              href="https://github.com/WildAntho"
              target="blank"
              aria-label="link"
            >
              <FaGithub id="github" className="logo-link" />
            </a>
            <a
              href="https://www.instagram.com/anthony.dufrenot/"
              target="blank"
              aria-label="link"
            >
              <FaInstagram id="insta" className="logo-link" />
            </a>
            <a
              href="https://www.facebook.com/adufrenot"
              target="blank"
              aria-label="link"
            >
              <FaFacebook id="facebook" className="logo-link" />
            </a>
          </div>
          <a href="#haut-page" aria-label="anker">
            <img
              className="aceflix-logo-footer"
              src={aceflixLogo}
              alt="Aceflix-Logo"
              role="presentation"
              onClick={handleHome}
            />
          </a>
        </div>
        <div className="navigation-wrapper">
          <h1 className="navigation-title">Services</h1>
          <p className="navigation-link">Exclusive content</p>
          <p className="navigation-link">Community shares</p>
          <p className="navigation-link">Smart navigation</p>
          <p className="navigation-link">Last Trailers</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="footer-wrapper">
        <div className="copyright">
          <p>Copyright ©️ 2024 - Aceflix</p>
          <p className="point-separator">.</p>
          <p>Terms</p>
          <p className="point-separator">.</p>
          <p>Sitemap</p>
          <p className="point-separator">.</p>
          <p>Privacy</p>
          <p className="point-separator">.</p>
          <p>Your Privacy Choices</p>
        </div>
      </div>
      <div className="footer-black">Linter</div>
    </section>
  );
}

Footer.propTypes = {
  setHomeActive: PropTypes.func.isRequired,
  setSerieActive: PropTypes.func.isRequired,
  setMovieActive: PropTypes.func.isRequired,
};
