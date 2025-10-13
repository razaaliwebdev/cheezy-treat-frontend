import logo from "./images/logo.png";
import hero from './images/heroSlides/hero.jpg';
import heroMb from './images/heroSlides/heroMb.jpg'
import chef2 from './images/chef2.png';

// Daily Special
import crust from './images/crust.jpg';
import fajita from './images/fajita.jpg';
import tandoori from './images/tandoori.jpg';
import bazinga from './images/bazinga.jpg';

// Icons
import delivery from "./images/icons/delivery.png"
import leaf from './images/icons/leaf.png';
import money from './images/icons/money.png';
import heart from './images/icons/heart.png'

export const images = {
  logo,
  hero,
  heroMb,
  chef2
}
// Daily Special
interface DailySpecial {
  id: number,
  name: string,
  image: string,
  description: string
}

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


// FAQs data
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqs: FaqCategory[] = [
  {
    category: "Ordering",
    items: [
      {
        id: 1,
        question: "How do I place an order?",
        answer:
          "Simply browse our menu, add your favorite items to the cart, and proceed to checkout. Then provide your delivery details and select your preferred payment method to confirm your order.",
      },
      {
        id: 2,
        question: "Can I customize my pizza?",
        answer:
          "Yes, you can fully customize your pizza by adding or removing toppings before adding it to your cart.",
      },
      {
        id: 3,
        question: "What are your ordering hours?",
        answer:
          "We accept online orders daily from 11:00 AM to 11:00 PM. Special holiday hours may vary and are announced on our website and social pages.",
      },
    ],
  },
  {
    category: "Delivery",
    items: [
      {
        id: 4,
        question: "What are the delivery charges?",
        answer:
          "Delivery charges depend on your location and order size. You can view the exact delivery fee at checkout before confirming your order.",
      },
      {
        id: 5,
        question: "How long does delivery take?",
        answer:
          "Our average delivery time is around 30–45 minutes depending on traffic, distance, and order volume.",
      },
      {
        id: 6,
        question: "Do you offer contactless delivery?",
        answer:
          "Yes! You can choose the contactless delivery option during checkout. Our rider will leave your order safely at your doorstep and notify you once it’s delivered.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        id: 7,
        question: "What payment methods do you accept?",
        answer:
          "We accept cash on delivery, debit/credit cards, and popular digital wallets like EasyPaisa and JazzCash.",
      },
      {
        id: 8,
        question: "Is online payment secure?",
        answer:
          "Yes, all online payments are processed through secure and encrypted gateways to ensure complete safety of your information.",
      },
    ],
  },
  {
    category: "Menu & Items",
    items: [
      {
        id: 9,
        question: "Do you offer vegetarian or vegan options?",
        answer:
          "Yes, our menu includes several vegetarian and vegan-friendly pizzas, sides, and salads clearly labeled for your convenience.",
      },
      {
        id: 10,
        question: "Can I customize my pizza toppings?",
        answer:
          "Of course! You can add, remove, or swap toppings directly from the pizza customization screen before checkout.",
      },
      {
        id: 11,
        question: "Are nutrition details available?",
        answer:
          "Yes, nutritional and ingredient details are available for most items on our menu. You can view them on each product’s page.",
      },
    ],
  },
];


// Why We Are
interface WhyWeAre {
  id: number,
  title: string,
  description: string,
  image: string
}

export const whyWeAre: WhyWeAre[] = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "We deliver your pizza in 30-45 minutes",
    image: `${delivery}`,
  },
  {
    id: 2,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
    image: `${leaf}`
  },
  {
    id: 3,
    title: "Affordable Prices",
    description: "Affordable PricesQuality groceries at unbeatable prices.",
    image: `${money}`
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    description: "Trusted by thousands of happy customers.",
    image: `${heart}`
  }

]