/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./top10.css";
import Card from "../Card/Card";
import useFetch from "../../useFetch";
import "swiper/css/free-mode";

export default function Top10({ status, uniqueTop }) {
  // URL des Movies et Series les mieux notés
  const theApiKey = import.meta.env.VITE_API_KEY;
  const moviesFetchURL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${theApiKey}`;
  const seriesFetchURL = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${theApiKey}`;

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: TopMovies,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(moviesFetchURL);
  const {
    data: TopSeries,
    loading: loadingSeries,
    error: errorSeries,
  } = useFetch(seriesFetchURL);

  // Fonction permettant de concaténer 2 tableaux
  const concat = (arr1, arr2) => {
    const newArray = arr1.concat(arr2);
    return newArray;
  };

  // Concaténation des tableaux contenant les movies et series classés par note (ordre decroissant)
  let TopContent = [];
  if (TopMovies && TopSeries) {
    TopContent = concat(TopMovies.slice(0, 10), TopSeries.slice(0, 10))
      .sort((a, b) => a.vote_average - b.vote_average)
      .reverse()
      .slice(0, 10);
  }
  if (loadingMovies || loadingSeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorMovies || errorSeries) {
    console.info("Error");
  }

  return (
    <section className="slider-top10">
      <h1 className="main-title">TOP 10</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={10}
          slidesPerView={6}
          freeMode
          centeredSlides={false}
          breakpoints={{
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            750: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            280: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
          navigation
          className="mySwiper"
        >
          {status
            ? uniqueTop?.map((content, index) => (
                <SwiperSlide key={content.id}>
                  <p className="test-top">{index + 1}</p>
                  <Card card={content} />
                </SwiperSlide>
              ))
            : TopContent?.map((content, index) => (
                <SwiperSlide key={content.id}>
                  <p className="test-top">{index + 1}</p>
                  <Card card={content} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}

Top10.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueTop: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
};
