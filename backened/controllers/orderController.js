const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middleware/catchAsyncError");

//Create new Order
exports.newOrder = catchAsyncErros(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Single Order
exports.getSingleOrder = catchAsyncErros(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//GET LOGGED IN USER
exports.myOrder = catchAsyncErros(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//GET ALL ORDER -- ADMIN
exports.getAllOrder = catchAsyncErros(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//UPDATE ORDER STATUS --ADMNIN
exports.updateOrder = catchAsyncErros(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  if (orders.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }

  if (req.body.status === "Shipped") {
    orders.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  orders.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    orders.deliveryAt = Date.now();
  }

  await orders.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete order
exports.deleteOrder = catchAsyncErros(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
