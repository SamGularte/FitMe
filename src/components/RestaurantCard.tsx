import React from "react";

//interface
import { Restaurants } from "../pages/Homepage/Home";

//css
import styles from "./RestaurantCard.module.css";

//imgs
import placeholder from "../imgs/placeholder.png";
import placeholder2 from "../imgs/placeholder2.png";
import placeholder3 from "../imgs/placeholder3.png";
import placeholder4 from "../imgs/placeholder4.png";
import delivery from "../imgs/deliveryTime.png";
import yellowStar from "../imgs/yStar.png";
import greenStar from "../imgs/gStar.png";

interface Props {
  restaurant: Restaurants;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <div>
      <div className={styles.dishCard}>
        <div>
          {(restaurant.objectId === "Z1EriGZCyW" ||
            restaurant.objectId === "A0OMMIWDSo") && (
            <img
              src={placeholder}
              alt="Footer logo"
              className={styles.restaurantImage}
            />
          )}
          {(restaurant.objectId === "IC8BxyRL2y" ||
            restaurant.objectId === "GVHG4jZjO6") && (
            <img
              src={placeholder2}
              alt="Footer logo"
              className={styles.restaurantImage}
            />
          )}
          {(restaurant.objectId === "Wa0jkW2EnG" ||
            restaurant.objectId === "fHlatYL0Qx") && (
            <img
              src={placeholder3}
              alt="Footer logo"
              className={styles.restaurantImage}
            />
          )}
          {(restaurant.objectId === "EZklVuYg5A" ||
            restaurant.objectId === "WKITnCtFxE") && (
            <img
              src={placeholder4}
              alt="Footer logo"
              className={styles.restaurantImage}
            />
          )}
        </div>
        <h3 className={styles.resName}>{restaurant.name}</h3>
        <div className={styles.locRating}>
          <p className={styles.resLocation}>{restaurant.location} </p>
          <div className={styles.resRating}>
            <div className={styles.resRatingImgCont}>
              {restaurant.rating >= 4 && <img src={greenStar}></img>}
              {restaurant.rating < 4 && <img src={yellowStar}></img>}
            </div>
            <p className={styles.resRatingParagraph}> {restaurant.rating}</p>
          </div>
        </div>
        <div className={styles.delivery}>
          <div className={styles.deliveryicon}>
            <img src={delivery} alt="delivery icon" />
          </div>
          <p>{restaurant.deliveryTime}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
