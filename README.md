## About this project
This is a basic online shop written with [React](https://react.dev). 
The data is stored in an sqlite managed by [Pocketbase](https://pocketbase.io/docs/).
It uses [Redux toolkit](https://redux-toolkit.js.org) for state management. 
For styling I used [Tailwind](https://tailwindcss.com). This was my 2'nd project with it and I find it very comfortable to use.

The online shop is in a bare minimum state.
That means you can view the shop products -> add the product to cart (the cart is saved in DB).
From the cart, you have the list of products and the total price -> go to checkout.
In checkout, you have the list of products, the total and a form for address (the form will autocomplete from DB with user's data, if any)
On checkout submit -> Order success page, cart was emptied.
In account, you can update your billing address and see your orders history.


## What to do with this project
You can use this project however you want.
Contribute, and I will check your PR.
Use it on your own, make something out of it.

If you have questions, let me know.


## Getting started

```
$ yarn install
$ yarn start
```

```
$ cd ./pb
$ ./pocketbase serve
```

You will need to create products from pocketbase to populate the shop. I will probably post a video about that somewhere in this document.

## Building and deploy
-  Read the docs and have fun




