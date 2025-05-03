import React from "react";
import { BsStarFill } from "react-icons/bs";

const RatingQContainer = ({ questionDetails, ratingClientName }) => {
  // console.log("ttttttt", questionDetails?.Description);
  // console.log("t", questionDetails);
  return (
    <>
      <div className="rating-quetions-container-head">
        <h5>
          <span>Client Name:</span>{ratingClientName}
        </h5>
        <span className="rating_gap">
          {Array(questionDetails?.Rating)
            .fill(0)
            .map((_, i) => (
              
              <BsStarFill className="rating_star" key={i}/>

            ))}
        </span>
      </div>
     
      <div className="rating-quetions-container-may">
       
        {questionDetails?.Description}
        
      </div>
      <div className="rating-quetions-container-quiz">
        <div className="rating-quiz-row">
          <div className="rating-quiz-row-text">
            <p>Was the service agent polite ?</p>
          </div>
          <div className="rating-quiz-row-buttons">
            <button
              style={{
                background: questionDetails?.Questions?.Question1
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: !questionDetails?.Questions?.Question1
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              No
            </button>
          </div>
        </div>

        <div className="rating-quiz-row">
          <div className="rating-quiz-row-text">
            <p>Was the service agent wearing clean cloths ?</p>
          </div>
          <div className="rating-quiz-row-buttons">
            <button
              style={{
                background: questionDetails?.Questions?.Question2
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: !questionDetails?.Questions?.Question2
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              No
            </button>
          </div>
        </div>

        <div className="rating-quiz-row">
          <div className="rating-quiz-row-text">
            <p>Was the service agent polite professional ?</p>
          </div>
          <div className="rating-quiz-row-buttons">
            <button
              style={{
                background: questionDetails?.Questions?.Question3
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: !questionDetails?.Questions?.Question3
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              No
            </button>
          </div>
        </div>

        <div className="rating-quiz-row">
          <div className="rating-quiz-row-text">
            <p>Well all the issues resolved ?</p>
          </div>
          <div className="rating-quiz-row-buttons">
            <button
              style={{
                background: questionDetails?.Questions?.Question4
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: !questionDetails?.Questions?.Question4
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              No
            </button>
          </div>
        </div>

        <div className="rating-quiz-row">
          <div className="rating-quiz-row-text">
            <p>Would you recommend us ?</p>
          </div>
          <div className="rating-quiz-row-buttons">
            <button
              style={{
                background: questionDetails?.Questions?.Question5
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: !questionDetails?.Questions?.Question5
                  ? "#F8AC1D"
                  : "transparent",
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingQContainer;
