import ChangeCountButton from "../Products/ChangeCountButton";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <div>
      <div className={classes.image}>
        <img src="https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80" />
      </div>
      <div>
        <h2>{props.name}</h2>
      </div>
      <div>
        <h3>{props.price}</h3>
      </div>
      <ChangeCountButton/>
    </div>
  );
};
