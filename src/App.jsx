import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import SingleGrocery from "./SingleGrocery";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
    const [groceryItems, setGroceryItems] = useState(
        JSON.parse(localStorage.getItem("grocery-items")) || []
    );
    const [inputValue, setInputValue] = useState("");
    const [editFlag, setEditFlag] = useState(false);
    const [editID, setEditID] = useState(null);

    const deleteItem = (id) => {
        const newGroceryItems = groceryItems.filter(
            (singleGrocery) => singleGrocery.id !== id
        );
        setGroceryItems(newGroceryItems);
        toast.error("Item Removed From List");
        localStorage.setItem("grocery-items", [
            JSON.stringify(newGroceryItems),
        ]);
    };

    const addItem = () => {
        const newSingleGrocery = {
            id: nanoid(),
            text: inputValue,
            checked: false,
        };
        const newGroceryItems = [...groceryItems, newSingleGrocery];
        setGroceryItems(newGroceryItems);
        setInputValue("");
        localStorage.setItem("grocery-items", [
            JSON.stringify(newGroceryItems),
        ]);
    };

    const editItem = () => {
        const newGroceryItems = groceryItems.map((singleGrocery) => {
            if (singleGrocery.id === editID) {
                singleGrocery.text = inputValue;
            }
            return singleGrocery;
        });
        setGroceryItems(newGroceryItems);
        setEditFlag(false);
        setEditID(null);
        setInputValue("");
        localStorage.setItem("grocery-items", [
            JSON.stringify(newGroceryItems),
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editFlag) {
            editItem();
            toast.success("item edited in the list");
        } else {
            addItem();
            toast.success("item added to the list");
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <main>
                <div className="grocery-container">
                    <h2>grocery bud</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(event) =>
                                setInputValue(event.target.value)
                            }
                        />
                        <button className="btn btn-info">
                            {editFlag ? "edit" : "add"}
                        </button>
                    </form>
                    <div className="grocery-items">
                        {groceryItems.map((singleGrocery) => {
                            return (
                                <SingleGrocery
                                    key={singleGrocery.id}
                                    {...singleGrocery}
                                    deleteItem={deleteItem}
                                    setInputValue={setInputValue}
                                    setEditID={setEditID}
                                    setEditFlag={setEditFlag}
                                    groceryItems={groceryItems}
                                    setGroceryItems={setGroceryItems}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
};

export default App;
