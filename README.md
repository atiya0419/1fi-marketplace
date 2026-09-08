# 1Fi Marketplace

A React Native marketplace application built with Expo and TypeScript. The application allows users to browse products, view detailed product information, select product variants, choose EMI plans, and manage different sections such as EMI dues, spending limits, and profile.

## Features

### 🏠 Home
- Welcome screen for users
- Quick navigation to the marketplace
- Introduction to shopping with EMI options

### 🛍️ Marketplace
- Browse available products
- Product data loaded using an API service
- Loading state while products are being fetched
- Error handling for failed product requests
- Retry option for loading products again
- Marketplace tab navigation

### 📦 Product Details
- View detailed product information
- View product name and brand
- View product price
- View original price and discount information
- View product ratings and reviews
- View product specifications and details

### 🖼️ Product Images
- View product images
- Multiple product image support
- Image thumbnails
- Selected image highlighting
- Full-screen image viewer
- Swipeable images in full-screen mode
- Image counter

### 🎨 Product Variants
- Select different product variants
- Selected variant is visually highlighted
- Variant selection validation before proceeding

### 💳 EMI Plans
- View available EMI plans
- Select an EMI duration
- Selected EMI plan is visually highlighted
- Validation before proceeding
- Confirmation message after selecting a variant and EMI plan

### 📅 EMI Dues
- View upcoming EMI payment information
- View EMI payment amount
- View EMI due date
- Information about future EMI payments

### 💰 Spending Limit
- View available shopping limit
- View used limit information
- Information about using the 1Fi shopping limit

### 👤 Profile
- Profile overview
- Personal details option
- Settings option

### 🧭 Navigation

The application includes a bottom navigation bar with:

- Home
- Shop
- EMI Dues
- Limit
- Profile

## Tech Stack

- React Native
- Expo
- TypeScript
- React Hooks
- React Native Safe Area Context
- Expo Vector Icons


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/atiya0419/1fi-marketplace.git
```

### 2. Navigate to the project folder

```bash
cd 1fi-marketplace
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Expo development server

```bash
npx expo start
```

### 5. Run the application

You can run the application using:

1. Expo Go on a mobile device
2. Android Emulator
3. iOS Simulator
4. Web browser

## Application Flow

1. The user opens the application.
2. The user can navigate between Home, Shop, EMI Dues, Limit, and Profile.
3. Products are loaded through the product service.
4. The user can browse available products in the Marketplace.
5. The user selects a product to view its details.
6. The user can view multiple product images.
7. The user selects a product variant.
8. The user selects an EMI plan.
9. The application validates the selections.
10. A confirmation message is displayed after successful selection.

## Key Functionality

1. Product loading using an API service
2. Loading and error handling
3. Product detail view
4. Multiple product images
5. Full-screen image viewer
6. Swipeable product images
7. Product variant selection
8. EMI plan selection
9. Input validation
10. Bottom tab navigation
11. Responsive React Native UI

## Author

**Atiya Aymen**


