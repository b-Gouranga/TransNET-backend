
// require('dotenv').config();
// const { createClient } = require('@supabase/supabase-js');

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// module.exports = supabase;

require('dotenv').config();

module.exports = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  jwtSecret: process.env.JWT_SECRET,
};
