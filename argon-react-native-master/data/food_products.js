export default [
    {
        name:"Ground Beef",
        category:"meat",
        footprint:100,
        points:-10,
        image: require("../data/images/01.jpg"),
        nutrition: {
            unit: "4 ounces",
            calories: 285,
            fat: "6.5g",
            protien:"31.7g"
        },
        alternatives: ["Ground Plant-based Protein", "Ground Turkey"]
    },
    {
        name:"Ground Turkey",
        footprint:50,
        category:"meat",
        points:-5,
        image: require("../data/images/02.jpg"),
        nutrition: {
            unit: "4 ounces",
            calories: 267,
            fat: "8.0g",
            protien:"26.0g"
        },
        alternatives: ["Ground Plant-based Protein", "Ground Beef"]
    },
    {
        name:"Ground Plant-based Protein",
        footprint:20,
        category:"meat",
        points:10,
        image: require("../data/images/03.jpg"),
        nutrition: {
            unit: "4 ounces",
            calories: 220,
            fat: "2.5g",
            protien:"25.0g"
        },
        alternatives: ["Ground Turkey", "Ground Beef"]
    },
    {
        name:"White Buns",
        category:"bread",
        footprint:12,
        points:-2,
        image: require("../data/images/04.jpg"),
        nutrition: {
            unit: "1 set",
            calories: 140,
            fat: "1.5g",
        },
        alternatives: ["Whole Wheat Buns", "Whole Grains Buns"]
    },
    {
        name:"Whole Wheat Buns",
        category:"bread",
        footprint:8,
        points:3,
        image: require("../data/images/05.jpg"),
        nutrition: {
            unit: "1 set",
            calories: 160,
            fat: "2.5g",
        },
        alternatives: ["Whole Grains Buns", "White Buns"]
    },
    {
        name:"Whole Grains Buns",
        category:"bread",
        footprint:10,
        points:1,
        image: require("../data/images/06.jpg"),
        nutrition: {
            unit: "1 set",
            calories: 165,
            fat: "2.5g",
        },
        alternatives: ["Whole Wheat Buns", "White Buns"]
    },
    {
        name:"Steak",
        category:"meat",
        footprint:30,
        points:-10,
        image: require("../data/images/09.jpg"),
        nutrition: {
            unit: "4 ounces",
            calories: 185,
            fat: "5.5g",
            protien:"31.7g"
        },
        alternatives: ["Salmon", "Chicken", "Shrimp"]
    },
    {
        name:"Salmon",
        category:"meat",
        footprint:20,
        points:5,
        image: require("../data/images/10.jpg"),
        nutrition: {
            unit: "4 ounces",
            calories: 223.75,
            fat: "9.5g",
            protein:"32.5g"
        },
        alternatives: ["Steak", "Chicken", "Shrimp"]
    },
    {
        name:"Chicken",
        category:"meat",
        footprint:18,
        points:4,
        image: require("../data/images/11.jpg"),
        nutrition: {
            unit: "4 ounces",
            calories: 239,
            fat: "13.4g",
            protein:"24g"
        },
        alternatives: ["Steak", "Salmon", "Shrimp"]
    },
    {
        name:"Dark Chocolate",
        category:"Sweets",
        footprint:19,
        points:4,
        image: require("../data/images/23.jpg"),
        nutrition: {
            unit: "1 ounce",
            calories: 170,
            fat: "13g",
            protein:"2g"
        },
        alternatives: ["Milk Chocolate"]
    },

    {
        name:"Milk Chocolate",
        category:"Sweets",
        footprint:17,
        points:2,
        image: require("../data/images/12.jpg"),
        nutrition: {
            unit: "1 ounce",
            calories: 128,
            fat: "8g",
            protein:"1.3g"
        },
        alternatives: ["Dark Chocolate"]
    },
    {
        name:"Eggs",
        category:"Dairy",
        footprint:15,
        points:4,
        image: require("../data/images/14.jpg"),
        nutrition: {
            unit: "1 egg, boiled",
            calories: 78,
            fat: "5g",
            protein:"6g"
        },
        alternatives: ["Cheese", "Tofu"]
    },
    {
        name:"Cheese",
        category:"Dairy",
        footprint:16,
        points:3,
        image: require("../data/images/16.jpg"),
        nutrition: {
            unit: "1 slice",
            calories: 98,
            fat: "7g",
            protein:"7g"
        },
        alternatives: ["Eggs", "Tofu"]
    },
    {
        name:"Tofu",
        category:"Dairy",
        footprint:9,
        points:10,
        image: require("../data/images/18.jpg"),
        nutrition: {
            unit: "0.5cup",
            calories: 94,
            fat: "6g",
            protein:"10g"
        },
        alternatives: ["Eggs", "Cheese"]
    },
    {
        name:"Shrimp",
        category:"meat",
        footprint:25,
        points:-5,
        image: require("../data/images/15.jpg"),
        nutrition: {
            unit: "100g",
            calories: 99,
            fat: "0.3g",
            protein:"24g"
        },
        alternatives: ["Steak", "Salmon", "Chicken"]
    },
    {
        name:"Coffee",
        category:"Beverage",
        footprint:11,
        points:5,
        image: require("../data/images/13.jpg"),
        nutrition: {
            unit: "1 cup",
            calories: 1,
            fat: "0g",
            protein:"0g"
        },
        alternatives: ["Beer"]
    },
    {
        name:"Beer",
        category:"Beverage",
        footprint:16,
        points:-5,
        image: require("../data/images/17.jpg"),
        nutrition: {
            unit: "1 can",
            calories: 154,
            fat: "0g",
            protein:"1.6g"
        },
        alternatives: ["Coffee"]
    },
    {
        name:"Potatoes",
        category:"Carbs",
        footprint:2,
        points:12,
        image: require("../data/images/20.jpg"),
        nutrition: {
            unit: "1 Medium Potato",
            calories: 163,
            fat: "0.2g",
            protein:"4.3g"
        },
        alternatives: ["Rice"]
    },
    {
        name:"Rice",
        category:"Carbs",
        footprint:10,
        points:5,
        image: require("../data/images/21.jpg"),
        nutrition: {
            unit: "1 cup cooked",
            calories: 206,
            fat: "0.4g",
            protein:"4.3g"
        },
        alternatives: ["Potatoes"]
    },
  ];
