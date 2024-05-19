import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js';
import {isAdmin, protectRoute} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protectRoute, isAdmin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protectRoute , getUserProfile).put(protectRoute , updateUserProfile);
router.route('/:id').delete(protectRoute, isAdmin, deleteUser)


export default router;




/*
{
    "products": [
        {
            "rating": 5,
            "numReviews": 1,
            "price": 10,
            "countInStock": 40,
            "name": "Banana Milk",
            "image": "/uploads\\1680854448956--banana-shake.jpg",
            "ingredients": " Ripe bananas, milk, honey (optional)",
            "category": "milk",
            "description": "A creamy and naturally sweet milkshake made with ripe bananas, milk, and a drizzle of honey (if desired). It's a great way to use up ripe bananas and create a delicious and wholesome drink.",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 5,
                    "comment": "Great one Must try!\n",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-15T17:09:04.432Z",
                    "updatedAt": "2023-04-15T17:09:04.432Z"
                }
            ],
            "__v": 1
        },
        {
            "rating": 5,
            "numReviews": 2,
            "price": 7,
            "countInStock": 25,
            "name": "Orange Juice",
            "image": "/uploads\\1680781830398--glass-orange-juice-person-squeezing-orange-it.jpg",
            "ingredients": "Freshly squeezed orange juice",
            "category": "juice",
            "description": "A refreshing and tangy citrus juice made with freshly squeezed oranges. It is a natural source of vitamin C and is often enjoyed as a breakfast or brunch beverage",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 5,
                    "comment": "Summer treat!",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-07T05:47:46.513Z",
                    "updatedAt": "2023-04-07T05:47:46.513Z"
                },
                {
                    "name": "gona",
                    "rating": 5,
                    "comment": "Good",
                    "user": "64cd3387fe6a99004df6cdaf",
                    "createdAt": "2023-08-04T17:28:20.949Z",
                    "updatedAt": "2023-08-04T17:28:20.949Z"
                }
            ],
            "__v": 2
        },
        {
            "rating": 5,
            "numReviews": 1,
            "price": 25,
            "countInStock": 15,
            "name": " Herbal Tea",
            "image": "/uploads\\1680783019410--istockphoto-1303878838-170667a.jpg",
            "ingredients": " Various herbs (such as chamomile, peppermint, or lavender)",
            "category": "tea",
            "description": "A type of tea made from the infusion of various herbs, known for their soothing and calming properties. Herbal teas come in a wide range of flavors and can be enjoyed hot or iced.",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 5,
                    "comment": "natural\n",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-09T20:19:26.334Z",
                    "updatedAt": "2023-04-09T20:19:26.334Z"
                }
            ],
            "__v": 1
        },
        {
            "rating": 5,
            "numReviews": 1,
            "price": 10,
            "countInStock": 30,
            "name": " Earl Grey Tea",
            "image": "/uploads\\1680779834751--cup-tea-tea-herbs-background-top-view.jpg",
            "ingredients": " Black tea leaves, bergamot oil",
            "category": "tea",
            "description": " A classic tea made with black tea leaves scented with the citrusy aroma of bergamot oil. It is a flavorful and aromatic tea that is often enjoyed with a slice of lemon.",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 5,
                    "comment": "Good",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2024-02-09T10:59:30.397Z",
                    "updatedAt": "2024-02-09T10:59:30.397Z"
                }
            ],
            "__v": 1
        },
        {
            "rating": 4.67,
            "numReviews": 3,
            "price": 10,
            "countInStock": 50,
            "name": " Coconut Water",
            "image": "/uploads\\1680782764403--istockphoto-598054528-612x612.jpg",
            "ingredients": " Fresh coconut water",
            "category": "juice",
            "description": " A hydrating and refreshing drink made with the clear liquid extracted from young green coconuts. It is naturally sweet and packed with electrolytes, making it a popular choice for post-workout hydration.",
            "reviews": [
                {
                    "name": "gobi",
                    "rating": 5,
                    "comment": "Healtheee....",
                    "user": "642508a43d20f31700bde654",
                    "createdAt": "2023-04-08T05:12:39.128Z",
                    "updatedAt": "2023-04-08T05:12:39.128Z"
                },
                {
                    "name": "chegoa",
                    "rating": 5,
                    "comment": "nature beauty",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-11T04:03:32.604Z",
                    "updatedAt": "2023-04-11T04:03:32.604Z"
                },
                {
                    "name": "gona",
                    "rating": 4,
                    "comment": "Good",
                    "user": "64cd3387fe6a99004df6cdaf",
                    "createdAt": "2023-08-04T17:27:26.069Z",
                    "updatedAt": "2023-08-04T17:27:26.069Z"
                }
            ],
            "__v": 3
        },
        {
            "rating": 4.5,
            "numReviews": 2,
            "price": 12,
            "countInStock": 35,
            "name": " Latte",
            "image": "/uploads\\1680781226150--coffee-latte-with-cookies-coffiee-beans.jpg",
            "ingredients": "Espresso, steamed milk",
            "category": "coffee",
            "description": "A popular coffee drink made with a shot of espresso and steamed milk, topped with a small layer of frothed milk. It is a creamy and mellow coffee beverage that can be customized with various flavors and syrups.",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 5,
                    "comment": "perfect one ! must try....",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-07T19:00:25.050Z",
                    "updatedAt": "2023-04-07T19:00:25.050Z"
                },
                {
                    "name": "gobi",
                    "rating": 4,
                    "comment": "Quality is out standing!",
                    "user": "642508a43d20f31700bde654",
                    "createdAt": "2023-04-07T19:01:19.881Z",
                    "updatedAt": "2023-04-07T19:01:19.881Z"
                }
            ],
            "__v": 2
        },
        {
            "rating": 4,
            "numReviews": 1,
            "price": 20,
            "countInStock": 20,
            "name": "Iced Mocha",
            "image": "/uploads\\1680789484755--Iced-Mocha-db3c51a.jpg",
            "ingredients": " Espresso, chocolate syrup, milk, ice, whipped cream",
            "category": "coffee",
            "description": " A chilled version of the mocha, made with espresso, chocolate syrup, milk, and ice, topped with whipped cream. It is a refreshing and indulgent coffee drink that is perfect for hot summer days.",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 4,
                    "comment": "tastefully!",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-07T06:37:48.637Z",
                    "updatedAt": "2023-04-07T06:37:48.637Z"
                }
            ],
            "__v": 1
        },
        {
            "rating": 4,
            "numReviews": 1,
            "price": 20,
            "countInStock": 20,
            "name": "Mocha",
            "image": "/uploads\\1680782510464--the_perfect_mocha_coffee_29100_16x9.jpg",
            "ingredients": "Espresso, chocolate syrup, steamed milk, whipped cream",
            "category": "coffee",
            "description": "A delicious combination of coffee and chocolate, made with a shot of espresso, chocolate syrup, and steamed milk, topped with whipped cream. It is a sweet and indulgent coffee drink that is perfect for chocolate lovers.",
            "reviews": [
                {
                    "name": "chegoa",
                    "rating": 4,
                    "comment": "Great One!",
                    "user": "64250986327fae7710fee504",
                    "createdAt": "2023-04-06T18:18:39.135Z",
                    "updatedAt": "2023-04-06T18:18:39.135Z"
                }
            ],
            "__v": 1
        },
        {
            "rating": 0,
            "numReviews": 0,
            "price": 15,
            "countInStock": 30,
            "name": "Vanilla Milkshake",
            "image": "/uploads\\1680789612761--vanilla-milkshake-photo.jpg",
            "ingredients": "Vanilla ice cream, milk, vanilla extract, whipped cream",
            "category": "milk",
            "description": "A classic milkshake made with creamy vanilla ice cream, milk, and a hint of vanilla extract, blended to a thick and creamy consistency. It is often topped with whipped cream and a sprinkle of cinnamon or nutmeg",
            "reviews": [],
            "__v": 0
        }
    ],
    "page": 1,
    "totalPages": 3
}
*/  