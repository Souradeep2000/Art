import React from "react";
import "../designs/searchPage.css";
import Filters from "./Filters";
import { useSelector } from "react-redux";
import IndividualSearchedItem from "./IndividualSearchedItem";
import MessageDiv from "./MessageDiv";

function SeachPage() {
  const searchList = useSelector((state) => state.searchList);
  const { searchedItems } = searchList;

  return (
    <div className="search-page">
      <Filters />

      <div className="individualSearched-item">
        {searchedItems.length > 0 ? (
          searchedItems.map((item) => (
            <IndividualSearchedItem
              key={item._id}
              id={item._id}
              src={item.src}
              title={item.title}
              p={item.p}
              price={item.price}
              star={item.star}
              numReviews={item.numReviews}
            />
          ))
        ) : (
          <MessageDiv status={"danger"}>
            {"your searched item not found"}
          </MessageDiv>
        )}
      </div>
    </div>
  );
}

export default SeachPage;
