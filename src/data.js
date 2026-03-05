// Mock data for restaurants and menu items

export const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    type: "veg",
    cuisine: "North Indian",
    rating: 4.5,
    deliveryTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    description: "Authentic vegetarian delights from the heart of India"
  },
  {
    id: 2,
    name: "The Grill House",
    type: "non-veg",
    cuisine: "Continental",
    rating: 4.7,
    deliveryTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    description: "Premium grills and steaks cooked to perfection"
  },
  {
    id: 3,
    name: "Green Bowl",
    type: "veg",
    cuisine: "Healthy",
    rating: 4.3,
    deliveryTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    description: "Fresh salads and wholesome vegan options"
  },
  {
    id: 4,
    name: "Tandoori Nights",
    type: "non-veg",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    description: "Smoky tandoori specialties and rich curries"
  },
  {
    id: 5,
    name: "Lotus Garden",
    type: "veg",
    cuisine: "Asian",
    rating: 4.4,
    deliveryTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    description: "Delicate Asian flavors in every vegetarian bite"
  },
  {
    id: 6,
    name: "Ocean Basket",
    type: "non-veg",
    cuisine: "Seafood",
    rating: 4.8,
    deliveryTime: "40-45 min",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
    description: "Fresh catches from the ocean daily"
  },
  {
    id: 7,
    name: "Punjabi Rasoi",
    type: "veg",
    cuisine: "Punjabi",
    rating: 4.5,
    deliveryTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400",
    description: "Traditional Punjabi vegetarian home-style cooking"
  },
  {
    id: 8,
    name: "BBQ Nation",
    type: "non-veg",
    cuisine: "BBQ",
    rating: 4.6,
    deliveryTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
    description: "Unlimited grills and barbecue feast"
  }
];

export const menuItems = {
  1: { // Spice Garden - Veg
    appetizers: [
      { id: 101, name: "Paneer Tikka", price: 250, type: "veg", description: "Cottage cheese marinated in spices", image: "🧀" },
      { id: 102, name: "Hara Bhara Kabab", price: 200, type: "veg", description: "Spinach and potato patties", image: "🥬" },
      { id: 103, name: "Veg Spring Rolls", price: 180, type: "veg", description: "Crispy rolls with fresh vegetables", image: "🥟" }
    ],
    mainCourse: [
      { id: 104, name: "Shahi Paneer", price: 320, type: "veg", description: "Cottage cheese in rich gravy", image: "🍛" },
      { id: 105, name: "Dal Makhani", price: 280, type: "veg", description: "Creamy black lentils", image: "🥘" },
      { id: 106, name: "Veg Biryani", price: 300, type: "veg", description: "Fragrant rice with mixed vegetables", image: "🍚" },
      { id: 107, name: "Palak Paneer", price: 300, type: "veg", description: "Spinach and cottage cheese curry", image: "🥬" }
    ],
    breads: [
      { id: 108, name: "Butter Naan", price: 50, type: "veg", description: "Soft flatbread with butter", image: "🫓" },
      { id: 109, name: "Garlic Naan", price: 60, type: "veg", description: "Naan topped with garlic", image: "🫓" }
    ],
    desserts: [
      { id: 110, name: "Gulab Jamun", price: 100, type: "veg", description: "Sweet milk dumplings", image: "🍡" },
      { id: 111, name: "Rasmalai", price: 120, type: "veg", description: "Cottage cheese in sweetened milk", image: "🥛" }
    ]
  },
  2: { // The Grill House - Non-Veg
    appetizers: [
      { id: 201, name: "Chicken Wings", price: 350, type: "non-veg", description: "Spicy buffalo wings", image: "🍗" },
      { id: 202, name: "Prawn Cocktail", price: 450, type: "non-veg", description: "Fresh prawns with tangy sauce", image: "🍤" },
      { id: 203, name: "Chicken Satay", price: 380, type: "non-veg", description: "Grilled chicken skewers", image: "🍢" }
    ],
    mainCourse: [
      { id: 204, name: "Grilled Steak", price: 850, type: "non-veg", description: "Prime beef steak grilled to perfection", image: "🥩" },
      { id: 205, name: "BBQ Chicken", price: 550, type: "non-veg", description: "Half chicken in BBQ sauce", image: "🍗" },
      { id: 206, name: "Fish & Chips", price: 500, type: "non-veg", description: "Crispy battered fish with fries", image: "🐟" },
      { id: 207, name: "Lamb Chops", price: 950, type: "non-veg", description: "Tender grilled lamb chops", image: "🍖" }
    ],
    sides: [
      { id: 208, name: "Garlic Bread", price: 120, type: "veg", description: "Toasted bread with garlic butter", image: "🍞" },
      { id: 209, name: "French Fries", price: 150, type: "veg", description: "Crispy golden fries", image: "🍟" }
    ],
    desserts: [
      { id: 210, name: "Chocolate Lava Cake", price: 250, type: "veg", description: "Warm chocolate cake", image: "🍰" }
    ]
  },
  3: { // Green Bowl - Veg
    salads: [
      { id: 301, name: "Caesar Salad", price: 280, type: "veg", description: "Romaine lettuce with Caesar dressing", image: "🥗" },
      { id: 302, name: "Greek Salad", price: 300, type: "veg", description: "Fresh vegetables with feta cheese", image: "🥗" },
      { id: 303, name: "Quinoa Bowl", price: 350, type: "veg", description: "Nutritious quinoa with veggies", image: "🥙" }
    ],
    bowls: [
      { id: 304, name: "Buddha Bowl", price: 380, type: "veg", description: "Mixed grains and roasted vegetables", image: "🥙" },
      { id: 305, name: "Falafel Bowl", price: 320, type: "veg", description: "Crispy falafels with hummus", image: "🧆" },
      { id: 306, name: "Tofu Stir Fry Bowl", price: 340, type: "veg", description: "Pan-fried tofu with vegetables", image: "🥘" }
    ],
    smoothies: [
      { id: 307, name: "Green Detox", price: 180, type: "veg", description: "Spinach, apple, and ginger", image: "🥤" },
      { id: 308, name: "Berry Blast", price: 200, type: "veg", description: "Mixed berries smoothie", image: "🥤" }
    ],
    desserts: [
      { id: 309, name: "Vegan Brownie", price: 150, type: "veg", description: "Rich chocolate brownie", image: "🍫" }
    ]
  },
  4: { // Tandoori Nights - Non-Veg
    appetizers: [
      { id: 401, name: "Chicken Tikka", price: 320, type: "non-veg", description: "Boneless chicken in tandoor", image: "🍗" },
      { id: 402, name: "Seekh Kabab", price: 350, type: "non-veg", description: "Minced meat skewers", image: "🍢" },
      { id: 403, name: "Fish Tikka", price: 400, type: "non-veg", description: "Marinated fish chunks", image: "🐟" }
    ],
    mainCourse: [
      { id: 404, name: "Butter Chicken", price: 450, type: "non-veg", description: "Creamy tomato chicken curry", image: "🍛" },
      { id: 405, name: "Chicken Biryani", price: 380, type: "non-veg", description: "Aromatic rice with chicken", image: "🍚" },
      { id: 406, name: "Rogan Josh", price: 500, type: "non-veg", description: "Kashmiri lamb curry", image: "🍖" },
      { id: 407, name: "Tandoori Chicken", price: 420, type: "non-veg", description: "Half chicken marinated and grilled", image: "🍗" }
    ],
    breads: [
      { id: 408, name: "Tandoori Roti", price: 40, type: "veg", description: "Whole wheat flatbread", image: "🫓" },
      { id: 409, name: "Butter Naan", price: 50, type: "veg", description: "Soft leavened bread", image: "🫓" }
    ],
    desserts: [
      { id: 410, name: "Kheer", price: 100, type: "veg", description: "Rice pudding with nuts", image: "🍮" }
    ]
  },
  5: { // Lotus Garden - Veg
    appetizers: [
      { id: 501, name: "Veg Dumplings", price: 220, type: "veg", description: "Steamed vegetable dumplings", image: "🥟" },
      { id: 502, name: "Crispy Tofu", price: 250, type: "veg", description: "Golden fried tofu cubes", image: "🍲" },
      { id: 503, name: "Veg Spring Rolls", price: 200, type: "veg", description: "Crispy Asian spring rolls", image: "🥟" }
    ],
    mainCourse: [
      { id: 504, name: "Veg Fried Rice", price: 280, type: "veg", description: "Wok-tossed rice with vegetables", image: "🍚" },
      { id: 505, name: "Veg Hakka Noodles", price: 300, type: "veg", description: "Stir-fried noodles", image: "🍜" },
      { id: 506, name: "Thai Green Curry", price: 350, type: "veg", description: "Coconut curry with vegetables", image: "🍛" },
      { id: 507, name: "Veg Manchurian", price: 280, type: "veg", description: "Vegetable balls in tangy sauce", image: "🥘" }
    ],
    soups: [
      { id: 508, name: "Hot & Sour Soup", price: 150, type: "veg", description: "Spicy tangy soup", image: "🍲" },
      { id: 509, name: "Tom Yum Soup", price: 180, type: "veg", description: "Thai aromatic soup", image: "🍲" }
    ],
    desserts: [
      { id: 510, name: "Mango Sticky Rice", price: 180, type: "veg", description: "Sweet rice with mango", image: "🥭" }
    ]
  },
  6: { // Ocean Basket - Non-Veg
    appetizers: [
      { id: 601, name: "Calamari Rings", price: 450, type: "non-veg", description: "Crispy fried squid rings", image: "🦑" },
      { id: 602, name: "Garlic Prawns", price: 550, type: "non-veg", description: "Prawns in garlic butter", image: "🍤" },
      { id: 603, name: "Fish Fingers", price: 380, type: "non-veg", description: "Breaded fish strips", image: "🐟" }
    ],
    mainCourse: [
      { id: 604, name: "Grilled Salmon", price: 850, type: "non-veg", description: "Fresh Atlantic salmon", image: "🐟" },
      { id: 605, name: "Seafood Platter", price: 1200, type: "non-veg", description: "Assorted seafood delicacies", image: "🦞" },
      { id: 606, name: "Fish Curry", price: 500, type: "non-veg", description: "Coastal style fish curry", image: "🍛" },
      { id: 607, name: "Lobster Thermidor", price: 1500, type: "non-veg", description: "Baked lobster in cream sauce", image: "🦞" }
    ],
    sides: [
      { id: 608, name: "Garlic Bread", price: 120, type: "veg", description: "Buttery garlic bread", image: "🍞" },
      { id: 609, name: "Coleslaw", price: 100, type: "veg", description: "Fresh cabbage salad", image: "🥗" }
    ],
    desserts: [
      { id: 610, name: "Tiramisu", price: 280, type: "veg", description: "Italian coffee dessert", image: "🍰" }
    ]
  },
  7: { // Punjabi Rasoi - Veg
    appetizers: [
      { id: 701, name: "Aloo Tikki", price: 150, type: "veg", description: "Crispy potato patties", image: "🥔" },
      { id: 702, name: "Paneer Pakora", price: 200, type: "veg", description: "Deep fried cottage cheese fritters", image: "🧀" },
      { id: 703, name: "Samosa", price: 100, type: "veg", description: "Crispy pastry with potato filling", image: "🥟" }
    ],
    mainCourse: [
      { id: 704, name: "Chole Bhature", price: 250, type: "veg", description: "Chickpea curry with fried bread", image: "🍛" },
      { id: 705, name: "Rajma Chawal", price: 220, type: "veg", description: "Kidney beans with rice", image: "🍚" },
      { id: 706, name: "Paneer Butter Masala", price: 320, type: "veg", description: "Cottage cheese in buttery gravy", image: "🍛" },
      { id: 707, name: "Sarson ka Saag", price: 280, type: "veg", description: "Mustard greens curry", image: "🥬" }
    ],
    breads: [
      { id: 708, name: "Makki ki Roti", price: 40, type: "veg", description: "Corn flour flatbread", image: "🫓" },
      { id: 709, name: "Paratha", price: 50, type: "veg", description: "Layered wheat flatbread", image: "🫓" }
    ],
    desserts: [
      { id: 710, name: "Gajar Halwa", price: 120, type: "veg", description: "Carrot pudding with nuts", image: "🥕" }
    ]
  },
  8: { // BBQ Nation - Non-Veg
    appetizers: [
      { id: 801, name: "Chicken Tikka", price: 300, type: "non-veg", description: "Grilled chicken chunks", image: "🍗" },
      { id: 802, name: "Mutton Seekh", price: 400, type: "non-veg", description: "Minced mutton kebabs", image: "🍖" },
      { id: 803, name: "Fish Tikka", price: 380, type: "non-veg", description: "Marinated grilled fish", image: "🐟" }
    ],
    mainCourse: [
      { id: 804, name: "BBQ Platter", price: 800, type: "non-veg", description: "Assorted grilled meats", image: "🍖" },
      { id: 805, name: "Tandoori Prawns", price: 650, type: "non-veg", description: "Grilled jumbo prawns", image: "🍤" },
      { id: 806, name: "Chicken Steak", price: 500, type: "non-veg", description: "Grilled chicken breast", image: "🍗" },
      { id: 807, name: "Mutton Rogan Josh", price: 550, type: "non-veg", description: "Spicy mutton curry", image: "🍛" }
    ],
    sides: [
      { id: 808, name: "Grilled Vegetables", price: 180, type: "veg", description: "Assorted grilled veggies", image: "🥗" },
      { id: 809, name: "Garlic Naan", price: 60, type: "veg", description: "Garlic flavored bread", image: "🫓" }
    ],
    desserts: [
      { id: 810, name: "Ice Cream", price: 100, type: "veg", description: "Assorted flavors", image: "🍨" }
    ]
  }
};
