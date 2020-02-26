export default [
    {
        name:"Ground Beef",
        category:"meat",
        footprint:100,
        points:-10,
        image: require("../data/images/01.jpg"),
        alternatives: ["Ground Plant-based Protein", "Ground Turkey"]
    },
    {
        name:"Ground Turkey",
        footprint:50,
        category:"meat",
        points:-5,
        image: require("../data/images/02.jpg"),
        alternatives: ["Ground Plant-based Protein", "Ground Beef"]
    },
    {
        name:"Ground Plant-based Protein",
        footprint:20,
        category:"meat",
        points:10,
        image: require("../data/images/03.jpg"),
        alternatives: ["Ground Turkey", "Ground Beef"]
    },
    {
        name:"White Buns",
        category:"bread",
        footprint:15,
        points:-2,
        image: require("../data/images/04.jpg"),
        alternatives: ["Whole Wheat Buns", "Whole Grains Buns"]
    },
    {
        name:"Whole Wheat Buns",
        category:"bread",
        footprint:8,
        points:3,
        image: require("../data/images/05.jpg"),
        alternatives: ["Whole Grains Buns", "White Buns"]
    },
    {
        name:"Whole Grains Buns",
        category:"bread",
        footprint:10,
        points:1,
        image: require("../data/images/06.jpg"),
        alternatives: ["Whole Wheat Buns", "White Buns"]
    },
    {
        name:"Steak",
        category:"meat",
        footprint:30,
        points:-10,
        image: require("../data/images/09.jpg"),
        alternatives: ["salmon"]
    },
    {
        name:"Salmon",
        category:"meat",
        footprint:30,
        points:5,
        image: require("../data/images/10.jpg"),
        alternatives: ["Steak"]
    }
  ];