import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    unit: { type: String },
    tax: { type: String },
    currency: { type: String },
    price: { type: Number },
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;