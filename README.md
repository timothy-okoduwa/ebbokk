# 📚 E-Book Store - Next.js with Paystack

A modern, serverless e-book store built with Next.js 14 (App Router), Tailwind CSS, and Paystack payment integration. No backend or database required!

## ✨ Features

- 📖 **Book Catalog** : Browse e-books from a JSON file
- 💳 **Paystack Integration** : Secure payments in NGN
- 📥 **Instant Downloads** : Unlock downloads after successful payment
- 🔒 **Client-side Security** : LocalStorage-based purchase tracking
- 📱 **Responsive Design** : Modern UI with Tailwind CSS
- ⚡ **Fast Performance** : Built on Next.js 14 App Router

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Paystack account ([Sign up here](https://paystack.com/))

### Installation

1. **Clone and navigate to the project**

   ```bash
   cd ebook
   ```

2. **Install dependencies** (already done)

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

4. **Add your Paystack public key to `.env.local`**

   ```env
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
   ```

   Get your key from: https://dashboard.paystack.com/#/settings/developer

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
ebook/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with Paystack script
│   ├── page.tsx             # Home page (book listing)
│   ├── books/[id]/          # Dynamic book detail pages
│   ├── checkout/            # Checkout page
│   └── success/             # Payment success page
├── components/              # Reusable React components
│   ├── BookCard.tsx         # Book display card
│   ├── Button.tsx           # Styled button component
│   ├── PaystackButton.tsx   # Paystack payment integration
│   └── DownloadSection.tsx  # Download UI for purchased books
├── lib/                     # Utility functions
│   ├── books.ts             # Book data helpers
│   └── payment.ts           # Payment & localStorage helpers
├── data/                    # Static data
│   └── books.json           # E-book catalog
├── types/                   # TypeScript definitions
│   └── index.ts             # Type definitions
└── public/                  # Static assets
    └── covers/              # Book cover images (placeholders)
```

## 🔧 Configuration

### Adding Books

Edit `data/books.json` to add or modify books:

```json
{
  "id": "7",
  "title": "Your Book Title",
  "author": "Author Name",
  "price": 5000,
  "description": "Book description...",
  "coverImage": "/covers/book7.jpg",
  "fileUrl": "https://example.com/downloads/your-book.pdf",
  "category": "Programming"
}
```

### Paystack Configuration

1. **Test Mode** (for development):
   - Use `pk_test_...` key
   - Use test cards from [Paystack docs](https://paystack.com/docs/payments/test-payments)
2. **Live Mode** (for production):
   - Use `pk_live_...` key
   - Ensure your Paystack account is activated
   - Update the env variable:
     ```env
     NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_key
     ```

### Test Cards (Paystack Test Mode)

| Card Number         | CVV | PIN  | Status  |
| ------------------- | --- | ---- | ------- |
| 4084084084084081    | 408 | 0000 | Success |
| 5060666666666666666 | 123 | 1234 | Success |

## 💻 Key Components

### PaystackButton Component

Handles payment initialization and callbacks:

```tsx
<PaystackButton book={book} email={email} />
```

Features:

- Email validation
- Amount conversion to kobo
- Success/failure callbacks
- Error handling

### DownloadSection Component

Shows download button for purchased books:

```tsx
<DownloadSection bookId={book.id} fileUrl={book.fileUrl} />
```

Features:

- Checks localStorage for purchase
- Shows purchase details
- Enables secure download

## 🔐 Security Considerations

This is a **demo/POC application** with client-side purchase tracking. For production:

1. **Backend Verification** : Verify Paystack transactions on a secure backend
2. **Secure Downloads** : Use signed URLs or authentication
3. **Database** : Store purchases in a database, not localStorage
4. **Webhook** : Implement Paystack webhooks for payment verification

### Recommended Production Flow:

```
1. User clicks "Pay Now"
2. Paystack handles payment
3. Paystack webhook hits your backend
4. Backend verifies transaction
5. Backend stores purchase in database
6. Backend generates secure download link
7. User receives download access
```

## 🎨 Customization

### Styling

The app uses Tailwind CSS. Customize colors in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // Change primary color
    }
  }
}
```

### Book Cover Images

Replace emoji placeholders with actual images:

1. Add images to `public/covers/`
2. Update `coverImage` paths in `books.json`
3. Use Next.js `<Image>` component for optimization

## 📦 Build for Production

```bash
npm run build
npm start
```

Or deploy to Vercel:

```bash
vercel deploy
```

## 🐛 Troubleshooting

### Paystack not loading

**Error** : `PaystackPop is not defined`

**Solution** : Ensure the Paystack script is loaded:

- Check `app/layout.tsx` includes the script tag
- Wait for script to load before calling `PaystackPop.setup()`

### Payment not completing

**Error** : Payment window closes without success

**Solution** :

- Verify your Paystack public key is correct
- Check browser console for errors
- Ensure test mode cards are used in test environment

### Download not showing

**Error** : Download button not appearing after payment

**Solution** :

- Check localStorage has the purchase record
- Verify `bookId` matches between purchase and book
- Clear localStorage and try again: `localStorage.clear()`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Paystack API Documentation](https://paystack.com/docs/api)
- [Paystack Inline JS Documentation](https://paystack.com/docs/payments/accept-payments#popup)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🎯 Next Steps

To make this production-ready:

1. Add a backend (Next.js API routes, Node.js, etc.)
2. Implement Paystack webhook verification
3. Use a database (PostgreSQL, MongoDB, etc.)
4. Add user authentication
5. Implement secure file hosting and delivery
6. Add email notifications
7. Create an admin dashboard
8. Add analytics and monitoring

---

Built with ❤️ using Next.js, Tailwind CSS, and Paystack
