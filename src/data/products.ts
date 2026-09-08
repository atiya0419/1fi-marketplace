export const products = [
    {
        id: "1",
        name: "iPhone 16",
        brand: "Apple",
        price: "₹79,900",
        originalPrice: "89,900",
        discount: "11% OFF",
        category: "Marketplace",
        rating: 4.8,
        reviews: 1245,
        details: ["Storage: 128 GB",
            "Display: 6.1-inch high-quality immersive display for streaming, browsing, gaming, and everyday use.",
            "Rear Camera: Advanced camera system designed for high-quality photos and videos.",
            "Front Camera: High-quality front camera suitable for selfies and video calls.",
            "Processor: Powerful processor for smooth multitasking and responsive performance.",
            "Operating System: iOS with a smooth and secure user experience.",
            "Connectivity: Modern wireless connectivity for everyday convenience.",
            "Battery: Designed to provide reliable all-day usage."],
        variants: ["128GB", "256GB", "512GB"],
        emiPlans: [
            {
                months: 3, amount: "₹26,633/month"
            },
            { months: 6, amount: "₹13,316/month" },
            { months: 12, amount: "₹6,658/month" },

        ],

        images: [
            require("1fi-marketplace/images/iphn1.webp"),
            require("1fi-marketplace/images/iphn.webp"),
            require("1fi-marketplace/images/iphn2.webp"),
            require("1fi-marketplace/images/iphn3.webp"),
            require("1fi-marketplace/images/iphn4.webp"),
            require("1fi-marketplace/images/iphn5.webp"),
            require("1fi-marketplace/images/iphn6.webp"),
        ],
    },
    {
        id: "2",
        name: "Galaxy S25",
        brand: "Samsung",
        price: "₹74,999",
        originalPrice: "84,999",
        discount: "12% OFF",
        category: "Marketplace",
        rating: 4.7,
        reviews: 980,
        details: ["Storage: 128 GB",
            "Display: Bright and immersive display designed for entertainment and productivity.",
            "Rear Camera: Advanced multi-camera system for detailed photos and videos.",
            "Front Camera: High-quality camera for selfies and video calls.",
            "Processor: Powerful processor designed for smooth multitasking and gaming.",
            "Operating System: Modern Android experience with useful everyday features.",
            "Connectivity: Fast wireless connectivity for browsing, streaming, and communication.",
            "Battery: Reliable battery designed to support everyday usage."],
        variants: ["128GB", "256GB", "512GB"],
        emiPlans: [
            {
                months: 3, amount: "₹26,633/month"
            },
            { months: 6, amount: "₹13,316/month" },
            { months: 12, amount: "₹6,658/month" },

        ],
        images: [
            require("1fi-marketplace/images/1.jpg"),
            require("1fi-marketplace/images/2.webp"),

            require("1fi-marketplace/images/3.webp"),
            require("1fi-marketplace/images/4.webp"),

        ],
    },
    {
        id: "3",
        name: "Nike Shoes",
        brand: "Nike",
        price: "₹6,999",
        originalPrice: "8,999",
        discount: "22% OFF",
        category: "Marketplace",
        rating: 4.5,
        reviews: 756,
        details: ["Material: Durable and comfortable material designed for regular use.",
            "Type: Suitable for casual wear, walking, and everyday activities.",
            "Cushioning: Comfortable cushioning for improved support during movement.",
            "Fit: Available in multiple sizes for a comfortable fit.",
            "Closure: Secure lace-up design.",
            "Design: Stylish and lightweight design suitable for everyday wear.",
            "Usage: Suitable for casual, walking, and light active use."],
        variants: ["Size 7", "Size 8", "Size 9", "Size 10"],
        emiPlans: [
            {
                months: 3, amount: "₹26,633/month"
            },
            { months: 6, amount: "₹13,316/month" },
            { months: 12, amount: "₹6,658/month" },

        ],
        images: [
            require("1fi-marketplace/images/s1.webp"),
            require("1fi-marketplace/images/s2.webp"),

            require("1fi-marketplace/images/s3.webp"),
            require("1fi-marketplace/images/s4.webp"),
            require("1fi-marketplace/images/s5.webp"),

        ],
    },
    {
        id: "4",
        name: "Sony Headphones",
        brand: "Sony",
        price: "₹12,999",
        originalPrice: "15,999",
        discount: "19% OFF",
        category: "Marketplace",
        rating: 4.6,
        reviews: 1120,
        details: ["Audio: High-quality and balanced sound for music and entertainment.",
            "Connectivity: Wireless connectivity for convenient everyday use.",
            "Comfort: Comfortable design suitable for extended listening sessions.",
            "Microphone: Built-in microphone for clear calls.",
            "Battery: Long-lasting battery designed for extended usage.",
            "Usage: Suitable for music, calls, travel, work, and entertainment.",
            "Design: Modern and lightweight design for everyday convenience.",],
        variants: ["Black", "White", "Blue"],
        emiPlans: [
            {
                months: 3, amount: "₹26,633/month"
            },
            { months: 6, amount: "₹13,316/month" },
            { months: 12, amount: "₹6,658/month" },

        ],
        images: [
            require("1fi-marketplace/images/h1.webp"),
            require("1fi-marketplace/images/h2.webp"),

            require("1fi-marketplace/images/h3.webp"),
            require("1fi-marketplace/images/h4.webp"),
            require("1fi-marketplace/images/h5.webp"),
            require("1fi-marketplace/images/h6.webp"),
        ],
    },
];