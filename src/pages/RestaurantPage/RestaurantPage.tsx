import React, { useState, useEffect } from "react";

//router
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

//axios
import axios from "axios";

//css
import styles from "./RestaurantPage.module.css";

//context
import { useBoolContext } from "../../context/BoolContext";

//imgs
import placeholderRestaurant from "../../imgs/placeholderRestaurant.png";
import percentage from "../../imgs/percentage.png";
import greenStar from "../../imgs/gStar.png";

type Props = {};

export interface Dish {
  price: number;
  name: string | undefined;
  description: string | undefined;
}

export interface Cart {
  resName: string | undefined;
  dishName: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
}

const RestaurantPage = (props: Props) => {
  const { name, location, rating, delivery } = useParams<{
    name: string;
    location: string;
    rating: string;
    delivery: string;
  }>();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  const { booleanValue, setBooleanValue } = useBoolContext();

  setBooleanValue(true);

  useEffect(() => {
    axios
      .get("https://parseapi.back4app.com/classes/Dish", {
        headers: {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        },
        params: {
          keys: JSON.stringify(["price", "name", "description"]),
        },
      })
      .then((response) => {
        const fetchedDishes: Dish[] = response.data.results;
        setDishes(fetchedDishes);
      })
      .catch((error) => {
        console.error("Erro ao buscar pratos:", error);
      });
  }, []);

  const handleAddButtonClick = (dish: Dish) => {
    let price: number = dish.price;
    setSubtotal(Math.floor((subtotal + price) * 100) / 100);
    setCart((prevCartItems) => [
      ...prevCartItems,
      {
        resName: name,
        dishName: dish.name,
        price: dish.price,
        quantity: 1,
      },
    ]);
  };

  return (
    <div>
      <div className={styles.restaurantHeader}>
        <div className={styles.restaurantHeaderImgCont}>
          <img
            className={styles.restaurantHeaderImgContImg}
            src={placeholderRestaurant}
          />
          <div>
            <h2 className={styles.restaurantHeaderResName}>{name}</h2>
            <p className={styles.restaurantHeaderResLocation}>{location}</p>
            <div className={styles.restaurantHeaderResLilBoxes}>
              <div>
                <p className={styles.restaurantHeaderResStar}>
                  <img src={greenStar}></img>
                  {rating}
                </p>
                <p>100+ ratings</p>
              </div>
              <div className={styles.restaurantHeaderWhiteBars}>
                <p>{delivery}</p>
                <p>Delivery Time</p>
              </div>
              <div>
                <p>$200</p>
                <p>Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.restaurantHeaderOffbox}>
          <div className={styles.restaurantHeaderOffers}>
            <h4 className={styles.restaurantHeaderOffersTIttle}>Offers</h4>
            <p>
              <img src={percentage} />
              50% off up to 100% | use code TRYNEW
            </p>
            <p>
              <img src={percentage} /> 20% off | use code PARTY
            </p>
          </div>
        </div>
      </div>
      <div className={styles.restaurantContent}>
        <div className={styles.restaurantContentOptions}>
          <p>Recommended</p>
          <p>Breakfast Box</p>
          <p>Lunch Box</p>
          <p>Combo Box</p>
          <p>Biriyani Box</p>
        </div>
        <div className={styles.cartCard}>
          {dishes.slice(0, 3).map((dish, index) => (
            <div key={index} className={styles.restaurantContentOptionsDish}>
              <div>
                <h2>{dish.name}</h2>
                <p className={styles.restaurantContentOptionsDishPrice}>
                  $ {dish.price}
                </p>
                <p>{dish.description}</p>
                <button
                  className={styles.restaurantContentOptionsDishAddBtn}
                  onClick={() => handleAddButtonClick(dish)}
                >
                  Add +
                </button>
              </div>
              <div className={styles.restaurantContentOptionsDishImg}>
                <img src={placeholderRestaurant} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.restaurantContentCart}>
          <div>
            <div className={styles.restaurantContentCartHeader}>
              <h3 className={styles.restaurantContentCartTittle}>Cart</h3>
              <p>{cart.length} items</p>
            </div>
            {cart.length === 0 ? (
              <h1 className={styles.restaurantContentCartempty}>Empty Cart</h1>
            ) : (
              cart.map((car, index) => (
                <div
                  key={index}
                  className={styles.restaurantContentCarResConatiner}
                >
                  <h4>
                    From{" "}
                    <span className={styles.restaurantContentCarResName}>
                      {car.resName}
                    </span>
                  </h4>
                  <div>
                    <div className={styles.restaurantContentCardishLCard}>
                      <div>
                        <p className={styles.restaurantContentCardishName}>
                          {car.dishName}
                        </p>
                        <p className={styles.restaurantContentCarprice}>
                          $ {car.price}
                        </p>
                      </div>
                      <div className={styles.restaurantContentCarCounter}>
                        - 1 +
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {cart.length > 0 && (
              <div>
                <div className={styles.restaurantContentCarFooter}>
                  <h4 className={styles.restaurantContentCarSubtotal}>
                    Subtotal
                  </h4>
                  <h4 className={styles.restaurantContentCarSubtotal}>
                    $ {subtotal}
                  </h4>
                </div>
                <p className={styles.restaurantContentCarExtra}>
                  Extra charges may apply
                </p>
              </div>
            )}
            <button className={styles.restaurantContentCartButton}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
