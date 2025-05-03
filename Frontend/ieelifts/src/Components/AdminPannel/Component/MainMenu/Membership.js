// // <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import MembershipCard from "../MembershipSubComponent/MembershipCard";
import {
  changeLayout,
  membershipLayoutButton,
  requestGetMemberShipDataAction,
} from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";

const Membership = () => {
  const dispatch = useDispatch();
  const [setClick, click] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [cards, setCards] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    dispatch(requestGetMemberShipDataAction());
  }, [dispatch]);

  const membershipJon = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipDataActionReducer
    ) {
      return state?.AdminRootReducer?.requestGetMemberShipDataActionReducer;
    } else {
      return null;
    }
  });

  const membershipLayout = useSelector(
    (state) =>
      state?.AdminRootReducer?.ChangeLayoutReducer?.initialLayout
        ?.membershipLayout
  );
  useLayoutEffect(() => {
    if (
      membershipJon &&
      membershipJon.membershipDetail &&
      membershipJon.membershipDetail.data
    ) {
      setCards([
        {
          DemoData: {
            dataType: "Warrenty",
            Data: membershipJon.membershipDetail.data[0],
          },
          order: 1,
          toggleOrder: 2,
          id: 1,
        },
        {
          DemoData: {
            dataType: "Platinum",
            Data: membershipJon.membershipDetail.data[1],
          },
          order: 2,
          toggleOrder: 1,
          id: 2,
        },
        {
          DemoData: {
            dataType: "Gold",
            Data: membershipJon.membershipDetail.data[3],
          },
          order: 3,
          toggleOrder: 1,
          id: 3,
        },
        {
          DemoData: {
            dataType: "Silver",
            Data: membershipJon.membershipDetail.data[2],
          },
          order: 4,
          toggleOrder: 1,
          id: 4,
        },
        { DemoData: "", order: 5, toggleOrder: 1, id: 5 },
      ]);
      dispatch(membershipLayoutButton(false));
    } else {
      setCards([]);
    }
  }, [membershipJon]);

  const handleGoingBack = () => {
    if (membershipJon) {
      const updatedCards = [...cards];
      updatedCards.map((card, index) => {
        if (card.order === 1 && index !== 0) {
          const toggleNumber = card.toggleOrder;
          card.toggleOrder = card.order;
          card.order = toggleNumber;
        }
        if (index === 0 && card.order !== 1) {
          card.order = 1;
          card.toggleOrder = 2;
        }
        return card;
      });
      setCards(updatedCards);
      if (clickCount === 1) {
        setClickCount(0);
      } else {
        setClickCount(1);
      }
      click(!setClick);
      dispatch(membershipLayoutButton(false));
    }
  };

  useEffect(() => {
    if (membershipLayout && !isInitialMount.current) {
      handleGoingBack();
    }
    isInitialMount.current = false;
  }, [membershipLayout]);

  const handleDoubleClick = (id) => {
    const clickedIndex = cards.findIndex((card) => card.id === id);
    const orderOneIndex = cards.findIndex((card) => card.order === 1);

    const updatedCards = [...cards];

    if (
      clickedIndex !== -1 &&
      orderOneIndex !== -1 &&
      orderOneIndex !== clickedIndex
    ) {
      const clickedToggleIndex = updatedCards[clickedIndex].order;
      updatedCards[clickedIndex].order = updatedCards[clickedIndex].toggleOrder;
      updatedCards[clickedIndex].toggleOrder = clickedToggleIndex;

      const orderOneIndexToggle = updatedCards[orderOneIndex].order;
      updatedCards[orderOneIndex].order =
        updatedCards[orderOneIndex].toggleOrder;
      updatedCards[orderOneIndex].toggleOrder = orderOneIndexToggle;
    }
    if (clickCount === 0) {
      dispatch(membershipLayoutButton(true));
    }
    setCards(updatedCards);
  };

  return (
    <div className="main-container">
      <div
        className={`membershipCards ${
          setClick ? `membershipCards_expand ` : "non_expand_gap"
        } `}
      >
        {cards &&
          cards.map((items, index) => {
            if (index === cards.length - 1) return null;

            return (
              <MembershipCard
                key={index}
                DemoData={items.DemoData || {}}
                order={items.order}
                setClick={setClick}
                clickCount={clickCount}
                itemClick={() => {
                  handleDoubleClick(index + 1);
                  setClickCount(1);
                  click(true);
                }}
              />
            );
          })}
        {setClick && cards[4] && (
          <MembershipCard
            clickCount={clickCount}
            DemoData={cards[4].DemoData}
            order={cards[4].order}
            setClick={setClick}
            itemClick={() => {
              handleDoubleClick(5);
              setClickCount(1);
              click(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Membership;
