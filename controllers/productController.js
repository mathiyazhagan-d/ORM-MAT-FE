import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';


// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler( async (req,res) => {
     const pageSize = 9;
    const page = Number(req.query.page) || 1;
    const count = await Product.countDocuments({});
    // const products = await Product.find({})
     const products = await Product.find({}).sort({ rating: -1}).limit(pageSize).skip(pageSize * (page - 1))
     res.json({products, page, totalPages: Math.ceil(count / pageSize)})
    // res.json({products, page})
});


// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});

// @desc Search products
// @route GET /api/products/search/:keyword
// @access Public
export const searchProducts = asyncHandler( async (req,res) => {

    const keyword = req.params.keyword
    const regex = new RegExp(keyword, 'ig')
    const products = await Product.find({$or: [{name: regex}, {description: regex}]});
    res.json(products)
});

// @desc Get products by genre
// @route GET /api/products/genre/:genre
// @access Public
export const getProductsByGenre = asyncHandler( async (req,res) => {

    const genre = req.params.genre
    const products = await Product.find({category : genre });
    res.json(products)
});


// @desc Delete Product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        await product.remove();
        res.json({message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});

// @desc Create Product
// @route POST /api/products/
// @access Private/Admin
export const createProduct = asyncHandler( async (req,res) => {

    const product = new Product({
        name: '',
        price: 0,
        user: req.user._id,
        image: 'add image from your local',
        ingredients: '',
        category: '',
        countInStock: 0,
        numReviews: 0,
        description: ''
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
    
});

export const bulkImport = asyncHandler(async (req, res) => {
    try {
        const products = req.body.products; // Assuming the products are in the request body

        // Loop through each product in the array
        const createdProducts = await Promise.all(products.map(async (productData) => {
            // Create a new product instance using the provided data
            const product = new Product({
                name: productData.name || '',
                price: productData.price || 0,
                // user: req.user._id,
                image: productData.image || 'add image from your local',
                ingredients: productData.ingredients || '',
                category: productData.category || '',
                countInStock: productData.countInStock || 0,
                numReviews: productData.numReviews || 0,
                description: productData.description || ''
            });

            // Save the product to the database
            return await product.save();
        }));

        // Respond with the created products
        res.status(201).json(createdProducts);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// @desc Update Product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler( async (req,res) => {

    const { name, price, description,
    image, ingredients, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){

        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.description = description,
        product.ingredients = ingredients,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct);
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    
});

// @desc Add new review
// @route POST /api/products/:id/reviews
// @access Private
export const addProductReview = asyncHandler( async (req,res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Already Reviewed')
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.numReviews + 1

        product.rating = Number(product.reviews.reduce((acc, item) => ( acc + item.rating), 0) / product.reviews.length).toFixed(2);

        await product.save()
        res.status(201).json({message: 'Review Added'});
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    
});

// @desc Get Top Products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler( async (req,res) => {

    const products = await Product.find({}).sort({ rating: -1}).limit(4);
    res.json(products)
});

//getProducts by its category

export const getProductsByCategory = asyncHandler(async (req, res) => {
    try {
      // Extract the category from the request params
      const { category } = req.params;
  
      // Find all products with the specified category
      const products = await Product.find({ category });
  
      // Return the products in the response
      res.status(200).json(products);
    } catch (error) {
      // Handle errors
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });