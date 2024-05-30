const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../config/config');

const supabase = createClient(supabaseUrl, supabaseKey);

class User {
  static async create(username, password) {
    try {
      console.log('Creating user:', username);
  
      const { data: existingUsers, error: selectError } = await supabase
        .from('User')
        .select('id')
        .eq('Username', username);
  
      if (selectError) {
        console.error('Error checking existing users:', selectError);
        throw new Error('Error checking existing users. Please try again.');
      }
  
      if (existingUsers.length > 0) {
        throw new Error('Username already exists. Please choose a different username.');
      }
  
      const { data, error } = await supabase
        .from('User')
        .insert([{ id: uuidv4(), Username: username, Password: password }]);
  
      if (error) {
        throw new Error('Error creating user. Please try again.');
      }
  
      console.log('New user data:', data);
      return data;
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  
  

//   static async create(username, password) {
//     //Check if the username already exists
//       const { data: existingUsers, error: selectError } = await supabase
//         .from('User')
//         .select('id')
//         .eq('Username', username);
  
//       if (selectError) {
//         console.error('Error checking existing users:', selectError);
//         throw new Error(selectError.message);
//       }
  
//       //console.log('Existing users:', existingUsers);
  
//       if (existingUsers.length > 0) {
//         throw new Error('Username already exists. Please choose a different username.');
//       }
//     const { data, error } = await supabase
//       .from('User')
//       .insert([{ id: uuidv4(), Username: username, Password: password }]);

//     if (error) {
//       throw new Error(error.message);
//     }

   return data;
  }
 
  
  static async findByUsername(username) {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('Username', username)
        .limit(1)
        .maybeSingle();
  
      if (error) {
        throw new Error(error.message);
      }
  
      if (!data) {
        throw new Error('User not exist.Would you like to register?' );
      }
  
      return data;
    } catch (error) {
      console.error('Error in User.findByUsername:', error);
      throw error;
    }
  }
  
}

module.exports = User;
