## About this project
This is a basic online shop written with [React](https://react.dev). 

The data is stored in an sqlite managed by [Pocketbase](https://pocketbase.io/docs/).

It uses [Redux toolkit](https://redux-toolkit.js.org) for state management. 

For styling I used [Tailwind](https://tailwindcss.com). This was my 2'nd project with it and I find it very comfortable to use.

---

The online shop is in a bare minimum state.

That means you can view the shop products -> add the product to cart (the cart is saved in DB).

From the cart, you have the list of products and the total price -> go to checkout.

In checkout, you have the list of products, the total and a form for address (the form will autocomplete from DB with user's data, if any)

On checkout submit -> Order success page, cart was emptied.

In account, you can update your billing address and see your orders history.

You can check [IMPROVEMENT_IDEAS](/IMPROVEMENT_IDEAS.md) have a little bit of fun. Here is a list of suggested tasks that can be done for this project. You can check some boxes or even come up with new suggestions.

## Shop walkthrough
[![Watch the video](https://i.vimeocdn.com/video/1926300589-cf5bc284a879f6f5ba31b7e5123c6bbfc367f70d7b7b485004ef8546cea3a326-d?mw=3500&mh=1391&q=70)](https://player.vimeo.com/video/1009153081)

## Populate shop from pocketbase walkthrough
[![Watch the video](https://i.vimeocdn.com/video/1926300444-7a8ce1c3367b7d42db495fa555079e2294505975527bd4b7eb19cfb6585f1367-d?mw=3500&mh=1391&q=70)](https://player.vimeo.com/video/1009153059)

## What to do with this project
You can use this project however you want.

Contribute, and I will check your PR.

Use it on your own, make something out of it.

If you have questions, let me know.


## Getting started
#### Start React App
```
$ yarn install
$ yarn start
```

#### Start Pocketbase
```
$ cd ./pb
$ ./pocketbase serve
```

You will need to create products from pocketbase to populate the shop. I will probably post a video about that somewhere in this document.

## Building and deploy
-  Read the docs and have fun




