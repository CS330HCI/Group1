# Techo 


## High-Fidelity Prototyping

### Task 1

Robert is an undergraduate student at Northwestern. He wants to have a burger for dinner tonight but he doesn’t have any ingredients at home. Before his shopping trip, Robert wants to make sure that he is making environmentally conscious decisions when purchasing the ingredients. So he turns to our app for help. 

For this task we implemented a **Home Page**, where users can select which component they want to navigate to easily after launching the app. Without having to open the sidebar, the users can quickly choose which component of the app they want to access. The home page will have four buttons: search, my points, my shopping list, and my daily trivia. Clicking each button will navigate the users to the corresponding components. 
![Homepage](readme_img/homepage.jpeg)

We also implemented a **Search Page**, where users can search food by name (e.g. beef) or category (e.g. meat) to look up how much carbon footprint the food has. Each food card displays its picture, name, carbon footprint, points given if selected for purchase, and an add to cart button. Clicking the add to cart button will add the food item into the cart and navigate the users to the shopping cart component. For the first task, Robert wants to learn more about the ingredients for a burger. He would go to the search page of our app and search for buns and ground meat. Below are screenshots of the options he gets from our app. 
![Homepage](readme_img/search_buns.jpeg)
![Homepage](readme_img/search_ground_meat.jpeg)

Lastly we implemented a **Shopping Cart**, where users can navigate to the shopping cart through the introduction page or the app sidebar when they swipe left to right. The shopping cart displays all the products that the user selected through searches, along with the points associated with each product in the cart. A point total is calculated at the end of the cart. Users can choose to add more items to the cart, record the point total of the products in the cart, or empty the cart. 
![Homepage](readme_img/task1_cart.jpeg)

### Task 2
James is having dinner at a restaurant with his friends. James is struggling to decide between steak or salmon, as he does not know which option is the more environmentally-friendly and/or healthy option. James decides to use our app to help him out. 

For this task we implemented an **Item Page**. After searching food items by name (e.g. beef or salmon) or category (e.g. meat or fruit), users will encounter a list of food cards. Selecting a food card will navigate the user to the item page, which contains detailed information about that specific food option. Each food card contains information about nutrition, such as serving size, calories, and macros, as well as a carbon footprint value and point value. There will also be food cards of alternative options below the selected food card.
![Homepage](readme_img/steak_info.jpeg)
![Homepage](readme_img/salmon_info.jpeg)

In this round of prototype we added modifications to our Shopping Cart component. Now users can now delete individual food selections from their shopping cart as well as clearing the entire shopping cart. To delete an individual food item from the shopping cart, users can press the “minus” button on each food card. To clear the entire shopping cart, users can press “clear cart” on the bottom of the page. 
![Homepage](readme_img/task1_cart.jpeg)
![Homepage](readme_img/empty_cart.jpeg)

### Task 3
James is a new user who likes to play games and wants to learn more about the carbon footprints of different food products. He wants to try out the trivia section of our app.

For task 3 we implemented a new component called **Trivia**. Users can play a trivia game and test their knowledge of the environmental impact of common foods. Users are presented with two food pictures and asked “Which one [food] is better for the environment?”. Users select the food that they think is correct; if they are correct, they get a “correct” prompt, and if they are incorrect, they get an “incorrect” prompt. Users are also shown the carbon footprints of the respective foods in the prior round. Users can select the “next round” button to proceed to the next round. This satisfies the Gamification component requirement.
![Homepage](readme_img/trivia.jpeg)
![Homepage](readme_img/trivia_correct.jpeg)
![Homepage](readme_img/trivia_wrong.jpeg)










