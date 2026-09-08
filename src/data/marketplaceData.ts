export type EMIPlan = {
    id: string;
    tenure: number;
    monthlyEMI: number;
    totalAmount: number;
    interestRate: string;
};

export type ProductVariant = {
    id: string;
    name: string;
    value: string;
};

export type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    discount: string;
    rating: number;
    reviews: number;
    description: string;
    image: string;
    variants: ProductVariant[];
    emiPlans: EMIPlan[];
};

export const products: Product[] = [
    {
        id: "iphone-16",
        name: "iPhone 16",
        brand: "Apple",
        price: 79900,
        originalPrice: 84900,
        discount: "₹5,000 OFF",
        rating: 4.8,
        reviews: 1240,
        description:
            "Experience a powerful smartphone with an advanced camera, excellent performance and a premium design.",
        image: "📱",
        variants: [
            {
                id: "iphone-16-black",
                name: "Color",
                value: "Black",
            },
            {
                id: "iphone-16-blue",
                name: "Color",
                value: "Blue",
            },
            {
                id: "iphone-16-pink",
                name: "Color",
                value: "Pink",
            },
        ],
        emiPlans: [
            {
                id: "iphone-3",
                tenure: 3,
                monthlyEMI: 26633,
                totalAmount: 79900,
                interestRate: "No Cost EMI",
            },
            {
                id: "iphone-6",
                tenure: 6,
                monthlyEMI: 13317,
                totalAmount: 79900,
                interestRate: "No Cost EMI",
            },
            {
                id: "iphone-9",
                tenure: 9,
                monthlyEMI: 8878,
                totalAmount: 79900,
                interestRate: "No Cost EMI",
            },
            {
                id: "iphone-12",
                tenure: 12,
                monthlyEMI: 6658,
                totalAmount: 79900,
                interestRate: "No Cost EMI",
            },
        ],
    },

    {
        id: "macbook-air",
        name: "MacBook Air",
        brand: "Apple",
        price: 99900,
        originalPrice: 109900,
        discount: "₹10,000 OFF",
        rating: 4.7,
        reviews: 856,
        description:
            "A lightweight and powerful laptop designed for work, study and everyday productivity.",
        image: "💻",
        variants: [
            {
                id: "macbook-8gb",
                name: "Memory",
                value: "8GB",
            },
            {
                id: "macbook-16gb",
                name: "Memory",
                value: "16GB",
            },
        ],
        emiPlans: [
            {
                id: "macbook-3",
                tenure: 3,
                monthlyEMI: 33300,
                totalAmount: 99900,
                interestRate: "No Cost EMI",
            },
            {
                id: "macbook-6",
                tenure: 6,
                monthlyEMI: 16650,
                totalAmount: 99900,
                interestRate: "No Cost EMI",
            },
            {
                id: "macbook-9",
                tenure: 9,
                monthlyEMI: 11100,
                totalAmount: 99900,
                interestRate: "No Cost EMI",
            },
            {
                id: "macbook-12",
                tenure: 12,
                monthlyEMI: 8325,
                totalAmount: 99900,
                interestRate: "No Cost EMI",
            },
        ],
    },

    {
        id: "galaxy-s25",
        name: "Galaxy S25",
        brand: "Samsung",
        price: 74999,
        originalPrice: 79999,
        discount: "₹5,000 OFF",
        rating: 4.6,
        reviews: 932,
        description:
            "A premium smartphone with powerful performance, an advanced display and versatile cameras.",
        image: "📲",
        variants: [
            {
                id: "galaxy-black",
                name: "Color",
                value: "Black",
            },
            {
                id: "galaxy-silver",
                name: "Color",
                value: "Silver",
            },
            {
                id: "galaxy-blue",
                name: "Color",
                value: "Blue",
            },
        ],
        emiPlans: [
            {
                id: "galaxy-3",
                tenure: 3,
                monthlyEMI: 25000,
                totalAmount: 74999,
                interestRate: "No Cost EMI",
            },
            {
                id: "galaxy-6",
                tenure: 6,
                monthlyEMI: 12500,
                totalAmount: 74999,
                interestRate: "No Cost EMI",
            },
            {
                id: "galaxy-9",
                tenure: 9,
                monthlyEMI: 8333,
                totalAmount: 74999,
                interestRate: "No Cost EMI",
            },
            {
                id: "galaxy-12",
                tenure: 12,
                monthlyEMI: 6250,
                totalAmount: 74999,
                interestRate: "No Cost EMI",
            },
        ],
    },

    {
        id: "sony-headphones",
        name: "Sony Headphones",
        brand: "Sony",
        price: 24990,
        originalPrice: 29990,
        discount: "₹5,000 OFF",
        rating: 4.5,
        reviews: 621,
        description:
            "Premium wireless headphones with immersive sound and comfortable all-day listening.",
        image: "🎧",
        variants: [
            {
                id: "sony-black",
                name: "Color",
                value: "Black",
            },
            {
                id: "sony-white",
                name: "Color",
                value: "White",
            },
        ],
        emiPlans: [
            {
                id: "sony-3",
                tenure: 3,
                monthlyEMI: 8330,
                totalAmount: 24990,
                interestRate: "No Cost EMI",
            },
            {
                id: "sony-6",
                tenure: 6,
                monthlyEMI: 4165,
                totalAmount: 24990,
                interestRate: "No Cost EMI",
            },
            {
                id: "sony-9",
                tenure: 9,
                monthlyEMI: 2777,
                totalAmount: 24990,
                interestRate: "No Cost EMI",
            },
            {
                id: "sony-12",
                tenure: 12,
                monthlyEMI: 2083,
                totalAmount: 24990,
                interestRate: "No Cost EMI",
            },
        ],
    },
];
