import React from "react";

function Pagination({ prev, next, current, pageNo }) {
  return (
    <>
      <div className="pagination">
        {current == 1 ? (
          <span></span>
        ) : (
          <button className="prevpage page-btn" onClick={prev}>
            <i className="fa-solid fa-arrow-left-long"></i> Prev
          </button>
        )}

        <div className="currentpage">
          Page: {current}/{Math.ceil(pageNo / 10)}
        </div>

        {current * 10 < pageNo ? (
          <button className="nextpage page-btn" onClick={next}>
            Next <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}

export default Pagination;
