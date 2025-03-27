# SecureMarket - A Modern Fullstack E-Commerce Marketplace for Digital Products

<img src="./public/hippo-email-sent.png" alt="SecureMarket" width="400"/>

SecureMarket is a fully functional and feature-rich e-commerce marketplace built using Next.js 14, tRPC, TypeScript, Payload, and Tailwind CSS. It provides a seamless experience for users to buy and sell digital products with a modern and intuitive UI.

<mark><b>NOTE :</b></mark> It's a learning project focused on self-hosting in Next.js without using the Next.js server and integrating Payload with tRPC.

## 🚀 Features

- **🛠️ Built from Scratch** - A complete e-commerce marketplace developed using Next.js 14.
- **💻 Stunning UI** - Fully designed landing page and product pages.
- **🎨 Custom Artwork** - Unique design elements tailored for SecureMarket.
- **💳 Admin Dashboard** - Manage products, users, and transactions effortlessly.
- **🛍️ Sell & Purchase** - Users can upload, sell, and buy digital products.
- **🛒 Shopping Cart** - Locally persisted cart for a smooth shopping experience.
- **🔑 Authentication** - Secure login system powered by Payload CMS.
- **🖥️ Self-Hosting** - Learn how to deploy Next.js applications efficiently.
- **🌟 Modern UI** - Built with Tailwind CSS and ShadCN UI components.
- **✉️ Transactional Emails** - Beautiful emails for signups and purchases.
- **✅ Product Verification** - Admins ensure high-quality digital products.
- **⌨️ 100% TypeScript** - Fully typed codebase for better maintainability.
- **🎁 More Features** - Continuous updates with new functionalities!

---

## 📸 UI Reference

| UI Preview                                                                                                                                                                                                                         |                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Image 1](https://media.licdn.com/dms/image/v2/D562DAQG6ovqOGdNdDQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1724317918428?e=1743354000&v=beta&t=6u73l6CRz-BlA1GEijcOhMQwfs9LKD0tQoEtQyi4Gwc) | ![Image 2](https://media.licdn.com/dms/image/v2/D562DAQGRxz5_pQz5IA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1724318028840?e=1743354000&v=beta&t=OHJnXksQsbmj29vCl59KuXIJzWaO3d8zOJDN0FFOzmU) |
| ![Image 3](https://media.licdn.com/dms/image/v2/D562DAQEC8T8qiwj8sw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1724317996813?e=1743354000&v=beta&t=e23wMa4iXA5dnYArVNeBsHQEO-2yaTTan_fJqNaJDfw) | ![Image 4](https://media.licdn.com/dms/image/v2/D562DAQGYKtBhvMvzaw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1724318018493?e=1743354000&v=beta&t=qKz2l_eawYbt_SLdFRAeg2sO3bVx6QVqS-oA9i0uyHY) |

---

## 🔄 Workflow

1. **Product Upload**: Sellers upload digital products (files) to the marketplace.
2. **Admin Approval**: Admin reviews and approves the uploaded product.
3. **Product Listing**: Approved products become visible to buyers on the website.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Payload CMS, tRPC, Express.js
- **Database**: MongoDB (via PayloadCMS)
- **Authentication**: Payload CMS Auth
- **Payments**: Stripe
- **State Management**: Zustand, React Query
- **Email Service**: Resend, Nodemailer

---

## 📂 Installation & Setup

### Prerequisites

- Node.js & npm/yarn
- MongoDB instance
- Stripe API keys
- Resend API keys

### Steps to Run Locally

```sh
# Clone the repository
git clone https://github.com/devwithfarshi/Secure-market.git
cd Secure-market

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Update .env with correct values

# Run the development server
yarn dev
```

---

## 📜 Scripts

```json
{
  "dev": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts nodemon",
  "generate:types": "payload generate:types",
  "build": "yarn build:payload && yarn build:server && yarn copyfiles && yarn build:next",
  "start": "node dist/server.js"
}
```

---

🚀 **Built with ❤️ by MD Salman Farshi**
