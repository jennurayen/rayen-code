import React, { useEffect, useRef, useState } from "react";
import Card from "./main/ContainerCard/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import LoaderCardPage from "./extra/LoaderCardPage";
import NoPostAvl from "./extra/NoPostAvl";

function PostList() {
  const [postListData, setPostListData] = useState([]);
  const [noOfPost, setNoOfPost] = useState(0);

  const [notPostFound, setNotPostFound] = useState(false);

  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  let category = useSelector((s) => s.AsideSliceStore);
  let param = useParams();

  useEffect(() => {
    param.category ? "" : (category = false);
    setPage(1);
    setLoader(true);
    axios
      .get(
        `http://localhost/rayencode/api/category.php?${
          param.category ? "category=" + category + "&" : ""
        }page=1`
      )
      .then((res) => {
        setPostListData(res.data);
        setLoader(false);
        if (res.data.error) {
          setNotPostFound(true);
        } else {
          setNotPostFound(false);
        }
      });

    axios
      .get(
        `http://localhost/rayencode/api/numberpost.php?${
          category ? "category=" + category : ""
        }`
      )
      .then((res) => {
        setNoOfPost(res.data.page);
      });
  }, [category]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(
        `http://localhost/rayencode/api/category.php?${
          param.category ? "category=" + category + "&" : ""
        }page=${page}`
      )
      .then((res) => {
        setPostListData(res.data);
        setLoader(false);
        if (res.data.error) {
          setNotPostFound(true);
        } else {
          setNotPostFound(false);
        }
      });
  }, [page]);

  function prevPage() {
    console.log("prev");
    setPage(page - 1);
  }
  function nextPage() {
    console.log("next");
    setPage(page + 1);
  }

  return (
    <>
      <div className="card-container">
        {loader ? (
          <LoaderCardPage />
        ) : notPostFound ? (
          <NoPostAvl />
        ) : (
          postListData.map((data, index) => {
            return <Card key={index} codevalue={data}></Card>;
          })
        )}
      </div>

      {loader ? (
        ""
      ) : (
        <Pagination
          prev={prevPage}
          next={nextPage}
          current={page}
          pageNo={noOfPost}
        ></Pagination>
      )}
    </>
  );
}

export default PostList;
