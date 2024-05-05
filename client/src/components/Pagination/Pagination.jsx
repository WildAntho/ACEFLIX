import PropTypes from "prop-types";
import "./pagination.css";

export default function Pagination({ page, setPage }) {
  const pagesNumber = 100;

  const generatePage = (pageNumber) => {
    const tab = [];
    for (let i = 0; i < pageNumber; i += 1) {
      tab.push(i + 1);
    }
    return tab;
  };

  const tabPage = generatePage(pagesNumber);

  const handlePageOne = () => {
    setPage(1);
  };

  const handlePageTwo = () => {
    setPage(2);
  };

  const handlePageThree = () => {
    setPage(3);
  };

  const handlePageLast = () => {
    setPage(pagesNumber);
  };

  const handlePagePlus = (button) => {
    setPage(button);
  };

  return (
    <div className="pagination-wrapper-buttons">
      <a href="#top-page">
        <div className="container-pagination">
          <button
            type="button"
            className={
              page === tabPage[0] ? "active-page" : "pagination-numbers"
            }
            aria-label="button-page"
            onClick={handlePageOne}
          >
            {tabPage[0]}
          </button>
          {page <= 3 && (
            <button
              type="button"
              className={
                page === tabPage[1] ? "active-page" : "pagination-numbers"
              }
              aria-label="button-page"
              onClick={handlePageTwo}
            >
              {tabPage[1]}
            </button>
          )}
          {page < 3 && (
            <button
              type="button"
              className={
                page === tabPage[2] ? "active-page" : "pagination-numbers"
              }
              aria-label="button-page"
              onClick={handlePageThree}
            >
              {tabPage[2]}
            </button>
          )}
          {page > 3 && <p className="three-point">...</p>}
          {page > 2 &&
            tabPage.slice(page - 1, page + 1).map((button) => (
              <button
                key={button}
                type="button"
                className={
                  page === button ? "active-page" : "pagination-numbers"
                }
                aria-label="button-page"
                onClick={() => {
                  handlePagePlus(button);
                }}
              >
                {button}
              </button>
            ))}
          {page <= pagesNumber - 3 && <p className="three-point">...</p>}
          {page <= pagesNumber - 2 && (
            <button
              type="button"
              className={
                page === tabPage[pagesNumber - 1]
                  ? "active-page"
                  : "pagination-numbers"
              }
              value={tabPage[pagesNumber - 1]}
              aria-label="button-page"
              onClick={handlePageLast}
            >
              {tabPage[pagesNumber - 1]}
            </button>
          )}
        </div>
      </a>
    </div>
  );
}

Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
