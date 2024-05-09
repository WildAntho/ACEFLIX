import "./final.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import VideoContext from "../../components/ContextVideo";
import FinalBanner from "../../components/FinalBanner/FinalBanner";
import Actors from "../../components/Actors/Actors";
import Comments from "../../components/Comments/Comments";
import Video from "../../components/Video/Video";
import Suggest from "../../components/Suggest/Suggest";

export default function Final() {
  const { type, id } = useParams();
  const { blackScreen } = useContext(VideoContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [error, setError] = useState(null);
  const theKey = import.meta.env.VITE_API_KEY;
  const fetchUrlBanner = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${theKey}`;
  const fetchComment = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1&api_key=${theKey}`;
  const actorsFetchURL = `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US&page=1&api_key=${theKey}`;

  const [bannerInfo, setBannerInfo] = useState(null);

  const [comments, setComments] = useState(null);

  useEffect(() => {
    setLoadingBanner(true);
    fetch(fetchUrlBanner)
      .then((res) => res.json())
      .then((res) => setBannerInfo(res))
      .catch((err) => console.error(err))
      .finally(() => setLoadingBanner(false));

    fetch(fetchComment)
      .then((res) => res.json())
      .then((res) => setComments(res.results))
      .catch((err) => console.error(err));
  }, [fetchUrlBanner, fetchComment]);

  useEffect(() => {
    fetch(actorsFetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((response) => {
        setData(response.cast);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [actorsFetchURL]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      id="top-page"
    >
      {blackScreen && <Video />}
      {loadingBanner && (
        <div id="FinalBanner">
          <ClipLoader
            color="#b53dff"
            loading={loadingBanner}
            size={65}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {bannerInfo && !loadingBanner && (
        <FinalBanner
          bannerInfo={bannerInfo}
          type={type}
          loadingBanner={loadingBanner}
        />
      )}
      {data && (
        <Actors
          data={data}
          loading={loading}
          error={error}
          bannerInfo={bannerInfo}
        />
      )}
      {bannerInfo?.vote_average && (
        <Suggest id={id} type={type} bannerInfo={bannerInfo} />
      )}
      {comments && <Comments comments={comments} setComments={setComments} />}
    </motion.div>
  );
}
