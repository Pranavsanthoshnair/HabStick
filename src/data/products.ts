export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  imageUrl: string;
  category?: string;
};

// Mock data for products
export const productData: Product[] = [
  {
    id: "habstick-pro",
    name: "HabStick Pro",
    description: "The HabStick Pro is an advanced navigation aid that combines cutting-edge technology with intuitive design to help visually impaired individuals navigate with confidence.",
    price: 5000,
    features: [
      "Advanced obstacle detection up to 10 feet away",
      "Voice navigation with customizable settings",
      "Emergency alert system with GPS tracking",
      "Water-resistant design (IP67 rated)",
      "12-hour battery life",
      "Lightweight design (2.6 lbs)"
    ],
    imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/140617170019-ultracane-handle.jpg?q=w_3684,h_2832,x_0,y_0,c_fill",
    category: "premium"
  },
  {
    id: "habstick-max",
    name: "HabStick Max",
    description: "Our most advanced model with extended range detection and enhanced features for maximum independence and safety in all environments.",
    price: 10000,
    features: [
      "Enhanced obstacle detection up to 15 feet away",
      "Advanced AI-powered environment recognition",
      "Voice navigation with natural language processing",
      "Emergency alert system with automatic fall detection",
      "Fully waterproof design (IP68 rated)",
      "Extended 24-hour battery life",
      "Built-in cellular connectivity"
    ],
    imageUrl: "https://pub.mdpi-res.com/inventions/inventions-06-00058/article_deploy/html/images/inventions-06-00058-g008.png?1630409775",
    category: "premium"
  },
  {
    id: "habstick-lite",
    name: "HabStick Lite",
    description: "A lighter, more affordable version of our flagship product, perfect for everyday use with essential navigation features.",
    price: 3000,
    features: [
      "Obstacle detection up to 6 feet away",
      "Basic voice feedback",
      "Water-resistant design (IP65 rated)",
      "8-hour battery life",
      "Ultra-lightweight design (1.8 lbs)"
    ],
    imageUrl: "https://v6co.com/assests/Images/products2/medical-grade.png",
    category: "standard"
  },
  {
    id: "habstick-mini",
    name: "HabStick Mini",
    description: "Our most compact model, designed for quick trips and urban environments where portability is key.",
    price: 1500,
    features: [
      "Compact design for easy storage and travel",
      "Obstacle detection up to 4 feet away",
      "Simple haptic feedback system",
      "6-hour battery life",
      "Ultra-compact design (1.2 lbs)",
      "Fast 30-minute quick charging"
    ],
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e52d4080227907.5cdb2f93276b7.jpg",
    category: "standard"
  }
];