import { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import VideoContext from "../ContextVideo";
import "./video.css";

export default function Videos() {
  const [video, setVideo] = useState(null);
  const { urlVideo, setBlackScreen } = useContext(VideoContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(urlVideo)
      .then((response) => response.json())
      .then((response) => setVideo(response.results))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [urlVideo]);

  const urlTab = [];
  if (video) {
    video.forEach((element) => {
      if (element.type === "Trailer" || element.type === "Opening Credits") {
        urlTab.push(element.key);
      }
    });

    if (urlTab.length === 0 && video.length > 0) {
      urlTab.push(video[0].key);
    }
  }

  if (error) {
    console.info(error);
  }

  const handleClose = () => {
    setBlackScreen(false);
    document.body.classList.remove("active");
  };

  return (
    <div className="black-screen">
      {urlTab?.length > 0 ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="video-container"
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${urlTab[0]}`}
            controls
            playing
            width="100%"
            height="100%"
          />
        </motion.div>
      ) : (
        <div className="video-container-empty">
          {!loading ? (
            <h1 className="no-video">Video not available"</h1>
          ) : (
            <ClipLoader
              color="#b53dff"
              loading={loading}
              size={65}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      )}
      <IoMdClose
        className="close-mark"
        onClick={handleClose}
        role="presentation"
      />
    </div>
  );
}
