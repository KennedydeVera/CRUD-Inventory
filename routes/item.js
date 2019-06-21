const fs = require('fs');

module.exports = {
    addItemPage: (req, res) => {
        res.render('add-item.ejs', {
            title: "Welcome to Inventory | Add a new item"
            ,message: ''
        });
    },
    addItem: (req, res) => {
		

        let message = '';
        let name = req.body.name;
        let quantity = req.body.quantity;
        let amount = req.body.amount;
        let number = req.body.number;
        let username = req.body.username;
        // let uploadedFile = req.files.image;
        // let image_name = uploadedFile.name;
        // let fileExtension = uploadedFile.mimetype.split('/')[1];
        // image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `items` WHERE name = '" + name + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('add-item.ejs', {
                    message,
                    title: "Welcome to Inventory | Add a new item"
                });
            } 
			
			 // send the item's details to the database
                        let query = "INSERT INTO `items`(name, quantity, amount) VALUES ('" +
                            name + "', '" + quantity + "',  '" + amount + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
        });
    },
	
	
    editItemPage: (req, res) => {
        let itemId = req.params.id;
        let query = "SELECT * FROM `items` WHERE id = '" + itemId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-item.ejs', {
                title: "Edit  Item"
                ,item: result[0]
                ,message: ''
            });
        });
    },
    editItem: (req, res) => {
        let itemId = req.params.id;
        let name = req.body.name;
        let quantity = req.body.quantity;
        let amount = req.body.amount;
        let number = req.body.number;

        let query = "UPDATE `items` SET `name` = '" + name + "', `quantity` = '" + quantity + "', `amount` = '" + amount + "' WHERE `items`.`id` = '" + itemId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteItem: (req, res) => {
        let itemId = req.params.id;
		//let getImageQuery = 'SELECT image from `items` WHERE id = "' + itemId + '"';
        let deleteUserQuery = 'DELETE FROM items WHERE id = "' + itemId + '"';

       

        
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
           
      
    }
};
