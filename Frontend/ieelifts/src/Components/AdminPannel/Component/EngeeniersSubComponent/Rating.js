import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import { fetchEnggRatingData } from "../../../../ReduxSetup/Actions/AdminActions";
import RatingQContainer from "./RatingQContainer";
import RatingCardHead from "./RatingCardHead";


const Rating = (engID) => {
  // console.log("ttt", engID.engID);
  // console.log("rajjjjjjjjjjjjjj", enggRatingData.rating?.length);
  
  const [isClick, setIsClick] = useState(false);
  const [enggRatingData, setEnggRatingData] = useState([]);
  const [questionDetails, setQuestionDetails] = useState();
  const [ratingClientName, setRatingClientName] = useState();

  useEffect(() => {
    const getData = async () => {
      const getEnggRating = await fetchEnggRatingData(engID.engID);
      // console.log("getEnggRating", getEnggRating);

      setEnggRatingData(getEnggRating);
    };
    getData();
  }, []);


  const handleChange = (details,clientName) => {
    setIsClick(true)
    setQuestionDetails(details)
    setRatingClientName(clientName)
  }

  return (
    <div className="ratings">
      <div
        className="sub-ratings"
        style={{ gridTemplateColumns: isClick ? "1fr 1fr" : "1fr" }}
      >
        <div className="rating-card-container">
          <RatingCardHead questionDetails={enggRatingData?.averageRating} clients={enggRatingData?.rating?.length} />
          <div
            className="rating-sub-card-container Yello_Scrollbar"
            style={{
              gridTemplateColumns: isClick ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
            }}
          >
            {enggRatingData?.rating?.map((item) => (
              <RatingCard
                isClick={isClick}
                setIsClick={setIsClick}
                clientName={item.clientName}
                clientAddress={item.clientAddress}
                ClientRating={item.ClientRating.Rating}
                slots={item.slots}
                handleChange={handleChange}
                ratingDetails={item.ClientRating}
              />
            ))}
          </div>
        </div>

        <div
          className="rating-quetions-container"
          style={{ display: isClick ? "" : "none" }}
        >
          <RatingQContainer questionDetails={questionDetails} ratingClientName={ratingClientName}/>
        </div>
      </div>
    </div>
  );
};

export default Rating;
