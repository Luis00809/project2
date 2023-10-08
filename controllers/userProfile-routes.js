const router = require('express').Router();   // import express
const User = require('../models/User');       // import user model
const Form = require('../models/Form');       // import form model
const Review = require ('../models/Review');  // import review model

// get all users and their form data
router.get('/', async (req, res) => {
    try {


        const userData = await User.findAll({
             include: [{ model: Form }, { model: Review }],
            // if "this.formKey doesn't work in handlebars then include attributes from Form model"
            });

        const users = userData.map((data) => data.get({ plain: true }));
        res.render('userProfile', {
             users
        })

        // need to render only using this for insomnia
        // res.status(200).json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




// get specific user
router.get('/user/:id', async (req, res) => {
    try {
        
        const userData = await User.findByPk(req.params.id, {
            where: {
                id: req.params.id,
                // userForm: req.params.id
            },
            include: [{ 
                model: Form,
                attributes: ['languages', 'bio', "contact_method",'partner_pronouns','personality_type', 'operating_system', 'hobbies'],
              
             }, { model: Review,
                attributes: ['Review_text']
             }
            ],
        });
    
        if (!userData) {
          return res.status(404).send('User not found');
        }
    
        
        const user = userData.get({ plain: true });
        res.render('userProfile', {
          user,
          reviews: user.reviews.Review_text,
          loggedIn: req.session.loggedIn 
        });
    
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;    // Export Router

