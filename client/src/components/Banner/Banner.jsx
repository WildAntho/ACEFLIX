/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./banner.css";
import { Autoplay } from "swiper/modules";
import useFetch from "../../useFetch";
import BannerCard from "./BannerCard/BannerCard";

export default function Banner() {
  const theApiKey = import.meta.env.VITE_API_KEY;
  const cinemaURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${theApiKey}`;

  const {
    data: cinemaContent,
    loading: loadingCinema,
    error: errorCinema,
  } = useFetch(cinemaURL);

  if (loadingCinema) {
    return <h1>LOADING ...</h1>;
  }

  if (errorCinema) {
    console.info("Error");
  }

  let newCinema = [];
  if (cinemaContent) {
    for (const value of cinemaContent) {
      if (value.backdrop_path) {
        newCinema.push(value);
      }
    }
    newCinema = newCinema.slice(0, 7);
  }

  return (
    <div className="cinema-swipper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        direction="vertical"
        centeredSlides
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          1439: {
            direction: "vertical",
          },
          200: {
            direction: "horizontal",
          },
        }}
        className="swipper-cinema-content"
      >
        {newCinema?.map((content) => (
          <SwiperSlide key={content.id}>
            <BannerCard
              overview={content.overview}
              title={content.original_title}
              id={content.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
