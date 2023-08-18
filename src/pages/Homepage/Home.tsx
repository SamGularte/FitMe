import React, { useState, useEffect } from "react";
import RestaurantCard from "../../components/RestaurantCard";

//css
import styles from "./Home.module.css";

//router
import { NavLink } from "react-router-dom";

//axios
import axios from "axios";

//context
import { useBoolContext } from "../../context/BoolContext";

//imgs
import banana from "../../imgs/banana.png";
import apple from "../../imgs/apple.png";
import placeholder from "../../imgs/placeholderHome.png";
import placeholder2 from "../../imgs/placeholderHome2.png";

type Props = {};

export interface Restaurants {
  name: string;
  location: string;
  rating: number;
  deliveryTime: string;
  isexpensive: boolean;
  topDishes: string[];
  objectId: string;
}

const Home = (props: Props) => {
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);

  const { booleanValue, setBooleanValue } = useBoolContext();

  setBooleanValue(true);

  useEffect(() => {
    axios
      .get("https://parseapi.back4app.com/classes/FitMe", {
        headers: {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        },
      })
      .then((response) => {
        const results = response.data.results;
        setRestaurants(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(restaurants);

  return (
    <div>
      <div className={styles.homeHero}>
        <div>
          <h1 className={styles.homeHeroParagraphTitle}>
            Premium <span className={styles.orange}>quality</span>
          </h1>
          <h1 className={styles.homeHeroParagraphTitleWI}>
            Food for your
            <div className={styles.bananaContainer}>
              <img src={banana} />
            </div>
            <span className={styles.orange}>healthy</span>
          </h1>
          <h1 className={styles.homeHeroParagraphTitleWI}>
            <div className={styles.appleContainer}>
              <img src={apple} />
            </div>
            <span className={styles.orange}>& Daily life</span>
          </h1>
          <p className={styles.homeHeroParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
            voluptates beatae id inventore fugiat nisi reprehenderit nesciunt
            eaque, repellendus sed quibusdam, facere tempore? Hic maxime
            voluptatibus quam quidem non quibusdam.
          </p>
        </div>
        <div className={styles.homeHeroImgs}>
          <img
            src={placeholder}
            className={styles.homeHeroImg1}
            alt="dish image"
          />
          <img
            src={placeholder2}
            className={styles.homeHeroImg2}
            alt="dish image"
          />
        </div>
      </div>
      <div className={styles.homeContainer}>
        <h3 className={styles.restaurantsTittle}>Restaurants</h3>
        <div className={styles.restaurantsContainer}>
          {restaurants.length > 0 &&
            restaurants.map((res) => (
              <NavLink
                to={`/restaurant/${res.name}/${res.location}/${res.rating}/${res.deliveryTime}`}
                key={res.objectId}
                className={styles.restaurantLink}
              >
                <RestaurantCard restaurant={res} />
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
