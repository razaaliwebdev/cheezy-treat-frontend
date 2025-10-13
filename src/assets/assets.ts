import logo from "./images/logo.png";
import hero from './images/heroSlides/hero.jpg';
import heroMb from './images/heroSlides/heroMb.jpg'

// Daily Special
import crust from './images/crust.jpg';
import fajita from './images/fajita.jpg';
import tandoori from './images/tandoori.jpg';
import bazinga from './images/bazinga.jpg';

export const images = {
  logo,
  hero,
  heroMb
}

interface DailySpecial {
  id: number,
  name: string,
  image: string,
  description: string
}

// Daily Special
export const dailySpecial: DailySpecial[] = [
  {
    id: 1,
    name: "Crown Crust Pizza",
    image: `${crust}`,
    description: "A royal delight topped with cheesy crust rings and rich flavors."
  },
  {
    id: 2,
    name: "Fajita Pizza",
    image: `${fajita}`,
    description: "A spicy blend of chicken fajita, peppers, and melted mozzarella."
  },
  {
    id: 3,
    name: "Tandoor Pizza",
    image: `${tandoori}`,
    description: "Smoky tandoori chicken with creamy sauce and bold desi spices."
  },
  {
    id: 4,
    name: "Bazinga Pizza",
    image: `${bazinga}`,
    description: "A spicy blend of chicken, peppers, and melted mozzarella."
  }
];
