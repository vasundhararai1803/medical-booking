require('dotenv').config();
const mongoose = require('mongoose');

async function fixAllLaminates() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const Treatment = mongoose.connection.collection('treatments');
  
  // Update laminates
  await Treatment.updateOne(
    { title: /Laminates/i }, 
    { $set: { imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800' } }
  );
  console.log('Fixed Laminates');

  // Let's also check if there are any other treatments with 1598256989800 or 1522849696084
  const res = await Treatment.updateMany(
    { imageUrl: { $in: [
      'https://images.unsplash.com/photo-1598256989800-fea5c1c84f1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522849696084-818b92644246?auto=format&fit=crop&q=80&w=800'
    ]}},
    { $set: { imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800' } }
  );

  console.log(`Fixed ${res.modifiedCount} other broken images`);
  
  console.log('Done!');
  process.exit(0);
}

fixAllLaminates();
