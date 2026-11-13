# Meea's Bakery

A responsive storefront for Meea's Bakery. The site presents the bakery catalogue, highlights popular savoury and sweet products, and lets customers prepare an order enquiry that opens directly in WhatsApp.

## Features

- Responsive catalogue with locally stored product photography
- Product-specific “Order this” shortcuts
- WhatsApp ordering with pre-filled customer and order details
- Direct WhatsApp contact links for `+234 811 741 0004`
- Accessible labels, image alternative text, mobile navigation, and reduced visual motion
- Lightweight static implementation with no build step

## Run locally

The project is a static website. Start any local web server from the repository root, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The Tailwind browser CDN is used by `index.html`, so an internet connection is required for styles during local development.

## Project structure

```text
.
├── assets/products/     Product photography and image-source notes
├── app.js               Navigation and WhatsApp order behaviour
├── index.html           Page content and catalogue
├── styles.css           Small custom style layer
└── tailwind-config.js   Brand colours and typography configuration
```

## WhatsApp ordering

The order form does not collect payment or submit customer information to a backend. On submission, `app.js` builds a message from the form fields and opens WhatsApp using a `wa.me` link.

To change the bakery number, update every occurrence of `2348117410004` in `index.html` and `app.js`. The number must use international format without spaces or a leading `+`.

## Managing products

Product cards and the order-form product list are maintained in `index.html`. When adding or renaming a product:

1. Add or update its catalogue card.
2. Keep the card's `data-order-product` value aligned with the matching `<option>`.
3. Store its optimized image in `assets/products/`.
4. Add the image source and licence details to `assets/products/README.md`.
5. Use descriptive alternative text on the product image.

## Image credits

Product images are stored locally to avoid runtime hotlinking. Sources and reuse notes are documented in [assets/products/README.md](assets/products/README.md). Review the original provider's terms before redistributing or replacing an image.
